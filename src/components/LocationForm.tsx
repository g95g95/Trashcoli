import { FormEvent, useEffect, useMemo, useState } from 'react';
import { UrbexLocation } from '../types';

export type LocationFormState = Omit<UrbexLocation, 'id'> & { id?: string };

type LocationFormProps = {
  isOpen: boolean;
  mode: 'create' | 'edit';
  initialValue?: UrbexLocation;
  onCancel: () => void;
  onSubmit: (values: LocationFormState) => void;
};

const abandonmentLevels = ['Lieve', 'Moderato', 'Avanzato', 'Estremo'];

const LocationForm = ({ isOpen, mode, initialValue, onCancel, onSubmit }: LocationFormProps) => {
  const [name, setName] = useState(initialValue?.name ?? '');
  const [municipality, setMunicipality] = useState(initialValue?.municipality ?? '');
  const [originUse, setOriginUse] = useState(initialValue?.originUse ?? '');
  const [description, setDescription] = useState(initialValue?.description ?? '');
  const [accessInfo, setAccessInfo] = useState(initialValue?.accessInfo ?? '');
  const [abandonmentLevel, setAbandonmentLevel] = useState(initialValue?.abandonmentLevel ?? 'Moderato');
  const [photoGallery, setPhotoGallery] = useState((initialValue?.photoGallery ?? []).join('\n'));
  const [tips, setTips] = useState(initialValue?.tips ?? '');
  const [latitude, setLatitude] = useState(
    initialValue ? initialValue.coordinates[0].toString() : ''
  );
  const [longitude, setLongitude] = useState(
    initialValue ? initialValue.coordinates[1].toString() : ''
  );
  const [error, setError] = useState<string | null>(null);

  const title = useMemo(() => (mode === 'create' ? 'Nuova location urbex' : 'Aggiorna location'), [mode]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (initialValue) {
      setName(initialValue.name ?? '');
      setMunicipality(initialValue.municipality ?? '');
      setOriginUse(initialValue.originUse ?? '');
      setDescription(initialValue.description ?? '');
      setAccessInfo(initialValue.accessInfo ?? '');
      setAbandonmentLevel(initialValue.abandonmentLevel ?? 'Moderato');
      setPhotoGallery((initialValue.photoGallery ?? []).join('\n'));
      setTips(initialValue.tips ?? '');
      setLatitude(initialValue.coordinates[0].toString());
      setLongitude(initialValue.coordinates[1].toString());
    } else if (mode === 'create') {
      setName('');
      setMunicipality('');
      setOriginUse('');
      setDescription('');
      setAccessInfo('');
      setAbandonmentLevel('Moderato');
      setPhotoGallery('');
      setTips('');
      setLatitude('');
      setLongitude('');
    }
    setError(null);
  }, [initialValue, isOpen, mode]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const latitudeValue = parseFloat(latitude.replace(',', '.'));
    const longitudeValue = parseFloat(longitude.replace(',', '.'));

    if (Number.isNaN(latitudeValue) || Number.isNaN(longitudeValue)) {
      setError('Inserisci coordinate valide in formato decimale.');
      return;
    }

    if (!name.trim() || !municipality.trim()) {
      setError('Nome e comune sono campi obbligatori.');
      return;
    }

    const payload: LocationFormState = {
      id: initialValue?.id,
      name: name.trim(),
      municipality: municipality.trim(),
      originUse: originUse.trim(),
      description: description.trim(),
      accessInfo: accessInfo.trim(),
      abandonmentLevel: abandonmentLevel.trim(),
      photoGallery: photoGallery
        .split(/\n|,/)
        .map((url) => url.trim())
        .filter(Boolean),
      tips: tips.trim() || undefined,
      coordinates: [latitudeValue, longitudeValue]
    };

    onSubmit(payload);
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card large">
        <header className="modal-header">
          <h2>{title}</h2>
          <p>Completa i campi per arricchire l’atlante degli spazi dimenticati.</p>
        </header>
        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            Nome del luogo
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Es. Centrale idroelettrica di Valle"
              required
            />
          </label>
          <label>
            Comune
            <input
              type="text"
              value={municipality}
              onChange={(event) => setMunicipality(event.target.value)}
              placeholder="Es. Ascoli Piceno"
              required
            />
          </label>
          <label>
            Coordinate latitudine
            <input
              type="text"
              value={latitude}
              onChange={(event) => setLatitude(event.target.value)}
              placeholder="42.85"
              required
            />
          </label>
          <label>
            Coordinate longitudine
            <input
              type="text"
              value={longitude}
              onChange={(event) => setLongitude(event.target.value)}
              placeholder="13.57"
              required
            />
          </label>
          <label className="span-2">
            Destinazione originale
            <input
              type="text"
              value={originUse}
              onChange={(event) => setOriginUse(event.target.value)}
              placeholder="Es. Opificio, residenza, cinema..."
            />
          </label>
          <label className="span-2">
            Racconto del luogo
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              placeholder="Cosa resta, cosa si percepisce, quali atmosfere ritrovare"
            />
          </label>
          <label className="span-2">
            Modalità di accesso
            <textarea
              value={accessInfo}
              onChange={(event) => setAccessInfo(event.target.value)}
              rows={3}
              placeholder="Passaggi, varchi, attenzioni da avere"
            />
          </label>
          <label>
            Livello di abbandono
            <select
              value={abandonmentLevel}
              onChange={(event) => setAbandonmentLevel(event.target.value)}
            >
              {abandonmentLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </label>
          <label className="span-2">
            Link foto (una per riga o separati da virgola)
            <textarea
              value={photoGallery}
              onChange={(event) => setPhotoGallery(event.target.value)}
              rows={3}
              placeholder="https://..."
            />
          </label>
          <label className="span-2">
            Note extra e consigli
            <textarea
              value={tips}
              onChange={(event) => setTips(event.target.value)}
              rows={2}
              placeholder="Dettagli da non perdere, rischi, attrezzatura suggerita"
            />
          </label>
          {error ? <p className="form-error span-2">{error}</p> : null}
          <div className="form-actions span-2">
            <button type="button" className="btn ghost" onClick={onCancel}>
              Annulla
            </button>
            <button type="submit" className="btn primary">
              {mode === 'create' ? 'Salva location' : 'Aggiorna scheda'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LocationForm;
