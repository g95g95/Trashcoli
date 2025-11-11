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
- Se ospiti l’app su un dominio radice, imposta anche `VITE_BASE_PATH="/"` prima della build o come variabile d’ambiente.

### GitHub Pages

L’app è completamente static e può essere pubblicata tramite GitHub Pages.

1. La build di default utilizza `base="/Trashcoli/"`, adatta a GitHub Pages per questo repository. Se pubblichi altrove, imposta una base personalizzata prima della build:

   ```bash
   VITE_BASE_PATH="/nome-repo" npm run build
   ```

2. Pubblica il contenuto della cartella `dist/` nel branch `gh-pages` (puoi usare [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages) oppure uno script basato su `gh-pages`).

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
