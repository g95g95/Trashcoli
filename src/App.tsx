import { useEffect, useMemo, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import PasswordModal from './components/PasswordModal';
import LocationForm, { LocationFormState } from './components/LocationForm';
import { initialLocations } from './data/locations';
import { UrbexLocation } from './types';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD ?? 'Mellon';

const createSlug = (value: string) =>
  value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const App = () => {
  const [locations, setLocations] = useState<UrbexLocation[]>(initialLocations);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingLocation, setEditingLocation] = useState<UrbexLocation | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const centre = useMemo(() => ({ lat: 42.85, lng: 13.58 }), []);

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timeout = setTimeout(() => setToastMessage(null), 4000);

    return () => clearTimeout(timeout);
  }, [toastMessage]);

  const handlePasswordCheck = (password: string) => {
    const success = password === adminPassword;

    if (success) {
      setIsAuthenticated(true);
      setShowPasswordModal(false);
      setToastMessage('Modalità curatore attiva. Puoi aggiornare e aggiungere location.');
    }

    return success;
  };

  const closeForms = () => {
    setShowCreateForm(false);
    setEditingLocation(null);
  };

  const handleCreateLocation = (values: LocationFormState) => {
    const slugBase = values.name ? createSlug(values.name) : `location-${Date.now()}`;
    const uniqueSlug = slugBase || `location-${Date.now()}`;
    const { id: _ignoredId, ...rest } = values;
    const newLocation: UrbexLocation = {
      id: uniqueSlug,
      ...rest
    };

    setLocations((previous) => [...previous, newLocation]);
    setToastMessage(`${values.name} aggiunta alla mappa.`);
    closeForms();
  };

  const handleUpdateLocation = (values: LocationFormState) => {
    if (!editingLocation) {
      return;
    }

    const { id: _ignoredId, ...rest } = values;
    const updated: UrbexLocation = {
      id: editingLocation.id,
      ...rest
    };

    setLocations((previous) =>
      previous.map((location) => (location.id === editingLocation.id ? updated : location))
    );
    setToastMessage(`${values.name} è stata aggiornata.`);
    closeForms();
  };

  return (
    <div className="app-shell">
      <PasswordModal isOpen={showPasswordModal} onValidate={handlePasswordCheck} />
      <header className="app-header">
        <div>
          <p className="badge">Provincia di Ascoli Piceno</p>
          <h1>Trashcoli · Atlante Urbex</h1>
          <p className="subtitle">
            Una mappa viva di spazi dimenticati, per esploratori urbani che amano le storie raccontate
            dalle rovine.
          </p>
        </div>
        {isAuthenticated ? (
          <button className="btn primary" onClick={() => setShowCreateForm(true)}>
            + Aggiungi location
          </button>
        ) : null}
      </header>
      <main className="app-main">
        <section className="map-panel">
          <MapContainer center={centre} zoom={12} className="urbex-map" scrollWheelZoom>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((location) => (
              <Marker key={location.id} position={location.coordinates}>
                <Popup>
                  <div className="popup-content">
                    <header>
                      <h3>{location.name}</h3>
                      <p className="popup-metadata">
                        {location.municipality} · Livello abbandono: {location.abandonmentLevel}
                      </p>
                    </header>
                    <p>{location.description}</p>
                    <p className="popup-access">
                      <strong>Accesso:</strong> {location.accessInfo}
                    </p>
                    <p>
                      <strong>Uso originario:</strong> {location.originUse || '—'}
                    </p>
                    {location.tips ? (
                      <p className="popup-tips">
                        <strong>Consigli:</strong> {location.tips}
                      </p>
                    ) : null}
                    {location.photoGallery.length ? (
                      <div className="popup-gallery">
                        {location.photoGallery.map((photo, index) => (
                          <img key={photo + index.toString()} src={photo} alt={`Scatto da ${location.name}`} />
                        ))}
                      </div>
                    ) : null}
                    {isAuthenticated ? (
                      <button
                        className="btn ghost full"
                        onClick={() => setEditingLocation(location)}
                      >
                        Aggiorna questa scheda
                      </button>
                    ) : (
                      <p className="popup-note">Richiedi la password ai curatori per proporre aggiornamenti.</p>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </section>
        <aside className="info-panel">
          <section>
            <h2>Come funziona</h2>
            <p>
              Ogni segnalino raccoglie storie, percorsi e avvertenze sui luoghi in abbandono della
              provincia. Con la password condivisa tra gli esploratori puoi aggiornare le schede esistenti
              o inserirne di nuove con foto, coordinate e suggerimenti.
            </p>
            <ul className="feature-list">
              <li>Curata selezione di spot urbex autentici.</li>
              <li>Indicazioni pratiche su accessi, rischi e livello di degrado.</li>
              <li>Gallerie fotografiche per valutare gli ambienti prima dell’uscita.</li>
              <li>Gestione collaborativa con password condivisa tra i contributori.</li>
            </ul>
          </section>
          <section>
            <h2>Ultime coordinate inserite</h2>
            <ul className="location-list">
              {locations.slice(-3).map((location) => (
                <li key={location.id}>
                  <h3>{location.name}</h3>
                  <p>{location.municipality}</p>
                  <p className="location-badge">{location.abandonmentLevel}</p>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2>Modalità curatore</h2>
            <p>
              Con l’accesso autenticato puoi pubblicare nuove location, aggiornare descrizioni, aggiungere
              gallerie fotografiche e segnalare criticità di accesso. Ricorda di verificare sempre la
              sicurezza prima di condividere dettagli.
            </p>
          </section>
        </aside>
      </main>
      {showCreateForm ? (
        <LocationForm
          isOpen={showCreateForm}
          mode="create"
          onCancel={closeForms}
          onSubmit={handleCreateLocation}
        />
      ) : null}
      {editingLocation ? (
        <LocationForm
          isOpen={Boolean(editingLocation)}
          mode="edit"
          initialValue={editingLocation}
          onCancel={closeForms}
          onSubmit={handleUpdateLocation}
        />
      ) : null}
      {toastMessage ? <div className="toast">{toastMessage}</div> : null}
    </div>
  );
};

export default App;
