# Google Indexing API — Setup

Push diretto a Google quando un evento nasce o cambia. È l'unico metodo "in tempo reale".
Google onora ufficialmente l'Indexing API per pagine con structured data `JobPosting` o
`BroadcastEvent` — le nostre pagine `/events/*` rientrano in questa categoria.

## 1. Crea il service account (Google Cloud Console) — una volta sola

1. Vai su https://console.cloud.google.com/ → crea (o seleziona) un progetto.
2. **APIs & Services → Library** → cerca **"Web Search Indexing API"** → **Enable**.
3. **APIs & Services → Credentials → Create Credentials → Service account**.
   - Nome: `nightlife-indexing`. Crea.
4. Apri il service account → tab **Keys → Add Key → Create new key → JSON**.
   - Scarica il file JSON. Contiene `client_email` e `private_key`. **Non committarlo.**

## 2. Autorizza il service account in Search Console — una volta sola

1. Apri https://search.google.com/search-console per la proprietà `nightlifemilan.com`.
   (Se la proprietà non è ancora verificata, verificala prima: DNS TXT su Vercel o meta tag.)
2. **Impostazioni → Utenti e autorizzazioni → Aggiungi utente**.
3. Incolla l'email del service account (`...@...iam.gserviceaccount.com`), ruolo **Proprietario**.

## 3. Configura le env var su Vercel — una volta sola

Project Settings → Environment Variables:

| Nome | Valore |
|------|--------|
| `GOOGLE_INDEXING_CREDENTIALS` | l'intero contenuto del JSON del service account, su una riga |
| `INDEXING_SECRET` | una stringa casuale a tua scelta (protegge l'endpoint) |

> Il codice gestisce automaticamente i `\n` letterali nella `private_key`, quindi puoi
> incollare il JSON così com'è.

Dopo aver aggiunto le env var, fai **Redeploy**.

## 4. Uso

L'endpoint protetto è `/api/indexing`.

**Notifica tutti gli eventi (one-off + settimanali, EN+IT):**
```
https://nightlifemilan.com/api/indexing?secret=IL_TUO_INDEXING_SECRET
```

**Notifica un singolo URL (es. evento appena creato):**
```
https://nightlifemilan.com/api/indexing?secret=IL_TUO_INDEXING_SECRET&url=https://nightlifemilan.com/events/lo-slug-evento
```

**Notifica una rimozione (evento cancellato):**
```
https://nightlifemilan.com/api/indexing?secret=...&url=https://nightlifemilan.com/events/slug&type=URL_DELETED
```

Risposta esempio:
```json
{ "ok": true, "total": 84, "succeeded": 84, "failed": 0, "results": [] }
```

## Quota e note

- Quota default: **200 URL/giorno** per progetto. Sufficiente per gli eventi.
- L'Indexing API **non sostituisce** la sitemap — lavorano insieme. La sitemap fa scoprire
  tutto; l'Indexing API accelera gli eventi nuovi/aggiornati.
- Per le pagine non-evento (club, guide, zone) usa "Richiedi indicizzazione" in Search Console
  o lascia che la sitemap faccia il suo corso.

## Automazione opzionale (futuro)

Si può chiamare `notifyUrl()` da `lib/googleIndexing.ts` direttamente nel flusso di creazione
evento (es. dopo il sync Eventbrite), così ogni nuovo evento viene pingato senza intervento manuale.
