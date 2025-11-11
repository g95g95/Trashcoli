# Trashcoli · Atlante Urbex

Applicazione web in React per esplorare, curare e aggiornare una mappa collaborativa dei luoghi di urbex della provincia di Ascoli Piceno.

## Caratteristiche principali

- 🌍 **Mappa interattiva** basata su OpenStreetMap con marker dedicati ai punti di interesse urbex.
- 🖼️ **Schede ricche di contenuti**: descrizione, livello di abbandono, indicazioni di accesso, consigli e mini gallerie fotografiche.
- 🔐 **Modalità curatore protetta da password** per aggiungere nuove location o aggiornare quelle esistenti direttamente dalla mappa.
- 🧭 **Esperienza responsive** con interfaccia moderna, pensata per funzionare sia su desktop che su mobile.

## Configurazione rapida

1. Installa le dipendenze (Node.js 18+ consigliato):

   ```bash
   npm install
   ```

2. Imposta la password di amministrazione creando un file `.env` o esportando la variabile d’ambiente prima di avviare il progetto:

   ```bash
   # .env
   VITE_ADMIN_PASSWORD="la-tua-password-segreta"
   ```

   Senza configurazione, l’app utilizza il valore predefinito `Mellon`.

3. Avvia l’ambiente di sviluppo:

   ```bash
   npm run dev
   ```

   L’applicazione sarà disponibile all’indirizzo [`http://localhost:5173`](http://localhost:5173).

   > 💡 Se vedi l’errore `vite is not recognized as an internal or external command`, assicurati di aver eseguito prima
   > `npm install`: il comando installa Vite e rende disponibile lo script locale.

4. Genera la build di produzione:

   ```bash
   npm run build
   ```

   Il risultato viene prodotto nella cartella `dist/`.

## Deployment

### Render

- **Build command**: `npm run build`
- **Start command**: `npm run start`
- Imposta l’`Environment` su `Node`, aggiungi la variabile `VITE_ADMIN_PASSWORD` con il valore desiderato e assicurati che la porta di pubblicazione sia `10000` (Render reindirizza automaticamente).
- La configurazione di default usa percorsi **relativi**, quindi funziona automaticamente anche su GitHub Pages o altri host in
  sottocartelle.
- Se ospiti l’app su un dominio radice, imposta `VITE_BASE_PATH="/"` prima della build o come variabile d’ambiente.

### GitHub Pages

Il repository include un workflow GitHub Actions (`Deploy to GitHub Pages`) che compila automaticamente il progetto e pubblica il risultato sul branch `gh-pages` a ogni push su `main`.

1. Apri le impostazioni del repository su GitHub e, nella sezione **Pages**, seleziona come sorgente il branch `gh-pages` con cartella `/(root)`.
2. Attendi il completamento del workflow: la prima esecuzione avviene subito dopo il push e richiede pochi minuti.
3. L’URL pubblico sarà `https://<tuo-utente>.github.io/Trashcoli/`. Se vuoi ospitare il sito in un percorso diverso, imposta `VITE_BASE_PATH` con il percorso desiderato (es. `/mio-sottosito/`) prima della build.

Per pubblicazioni manuali o su fork personali puoi comunque eseguire la build locale e distribuire la cartella `dist/`:

```bash
npm run build
```

## Struttura del progetto

```
├── public/
│   └── favicon.svg
├── src/
│   ├── App.tsx
│   ├── components/
│   │   ├── LocationForm.tsx
│   │   └── PasswordModal.tsx
│   ├── data/
│   │   └── locations.ts
│   ├── styles/
│   │   └── global.css
│   ├── types.ts
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Contributi futuri

- Collegare le chiamate a un backend (es. Firebase/Hasura/Supabase) per salvare le location in modo persistente.
- Aggiungere una gestione media più avanzata (upload immagini, tagging, stato di moderazione).
- Integrare notifiche in tempo reale per gli aggiornamenti di nuove schede urbex.

Buona esplorazione e rispetta sempre i luoghi che visiti! 🏚️
