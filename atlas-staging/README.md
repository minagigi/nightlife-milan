# ATLAS 🌐

**Toolkit ecommerce internazionale** — landing page, automazioni WordPress/Elementor e generazione asset.

## Struttura

| Cartella | Contenuto |
|---|---|
| `elementor-templates/` | Template landing page in JSON, importabili in Elementor (WordPress → Modelli → Modelli salvati → Importa) |
| `wordpress-connector/` | Plugin WordPress con endpoint REST sicuri: Claude crea/aggiorna pagine Elementor da remoto |
| `scripts/` | Automazioni: push su WordPress (`wp-push.mjs`), browser Google Flow locale (`flow-browser.mjs`) e remoto via tunnel (`flow-remote.mjs`) |
| `index.html` | Pagina placeholder del progetto (deploy Vercel) |

## Flusso di lavoro

1. **Landing**: Claude genera il template JSON → import in Elementor o push diretto via connettore
2. **Immagini**: Google Flow pilotato via browser (abbonamento Google AI Pro, zero costi API) oppure Magnific AI
3. **Pubblicazione**: `scripts/wp-push.mjs` carica pagina e media sul WordPress di destinazione

## Setup rapido

```bash
npm i --no-save playwright                    # per i driver browser
export WP_URL=https://tuosito.it
export WP_USER=admin
export WP_APP_PASSWORD='xxxx xxxx xxxx xxxx'
node scripts/wp-push.mjs ping                 # test connessione WordPress
```

Dettagli nei README delle singole cartelle.

## Template disponibili

| Template | Descrizione |
|---|---|
| `airabreeze-landing.json` | Landing DTC prodotto singolo (stile getairabreeze.com): 12 sezioni, solo widget Elementor Free, testi IT |
