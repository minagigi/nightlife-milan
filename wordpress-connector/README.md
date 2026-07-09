# Claude Elementor Connector

Mini-plugin WordPress che permette a Claude (da questa sessione) di **creare e aggiornare pagine Elementor direttamente sul sito**, senza passare da import manuali.

## Setup (una volta sola, ~3 minuti)

1. **Installa il plugin**: WordPress admin → Plugin → Aggiungi nuovo → Carica plugin → `claude-elementor-connector.zip` → Attiva.
2. **Crea una Application Password**: Utenti → Profilo (di un utente amministratore) → sezione "Password applicazione" → nome `claude` → Aggiungi. Copia la password generata (formato `xxxx xxxx xxxx xxxx xxxx xxxx`).
3. **Comunica a Claude**: URL del sito, username admin e la Application Password (meglio come variabili d'ambiente `WP_URL`, `WP_USER`, `WP_APP_PASSWORD` nelle impostazioni dell'ambiente Claude Code).

La Application Password è revocabile in qualsiasi momento dal profilo utente e non dà accesso al login normale.

## Sicurezza

- Tutti gli endpoint richiedono autenticazione con `manage_options` (solo amministratori).
- Nessun endpoint pubblico: senza credenziali risponde 401.
- Gli status consentiti per le pagine sono solo `draft`, `publish`, `private`.

## Endpoint esposti

| Endpoint | Metodo | Funzione |
|---|---|---|
| `/wp-json/claude/v1/ping` | GET | Verifica connessione, versioni WP/Elementor |
| `/wp-json/claude/v1/elementor/page` | POST | Crea/aggiorna una pagina con dati Elementor (`_elementor_data`) |
| `/wp-json/claude/v1/elementor/template` | POST | Importa un JSON di export nella libreria Modelli salvati |

## Uso dallo script locale

```bash
export WP_URL=https://tuosito.it
export WP_USER=admin
export WP_APP_PASSWORD='xxxx xxxx xxxx xxxx xxxx xxxx'

node scripts/wp-push.mjs ping
node scripts/wp-push.mjs page elementor-templates/airabreeze-landing.json "AiraBreeze" airabreeze draft
node scripts/wp-push.mjs template elementor-templates/airabreeze-landing.json
```

`page` crea la pagina come **bozza** di default: la controlli nell'editor Elementor e poi la pubblichi (o si passa `publish` direttamente).
