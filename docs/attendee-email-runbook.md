# Runbook — Email post-registrazione Eventbrite

Sistema che invia in automatico una email personalizzata (lingua del listing, dettagli evento, link Xceed affiliati `channel/nightlifemilan-1`, CTA WhatsApp, unsubscribe firmato) a chi si registra a un evento Eventbrite dell'organizzazione `2988002072164`.

## Architettura

| Pezzo | File | Ruolo |
|---|---|---|
| Webhook tempo reale | `app/api/crm/email-webhook` | Eventbrite `order.placed` → invio entro ~1 minuto |
| Sweep di sicurezza | `app/api/crm/email-dispatch` (cron orario `10 * * * *`) | recupera registrazioni sfuggite al webhook (`changed_since` 72h) |
| Eleggibilità + invio | `lib/attendeeEmailDispatch.ts` | filtri (cancellati, opted-out, eventi passati, pre-attivazione), rendering, invio |
| Ledger idempotente | `lib/emailLedger.ts` → Blob `crm/v1/email/` | 1 sola email per (evento, indirizzo); claim atomico |
| Render localizzato | `lib/attendeeEmail.ts` + `lib/attendeeEmailCopy.ts` | 35 locali, date Europe/Rome, RTL per `ar`, riuso copy conferma approvato |
| Transport | `lib/emailTransport.ts` | Resend REST; senza `RESEND_API_KEY` = **dry-run** (nessun invio) |
| Unsubscribe | `app/api/crm/email-unsubscribe` | HMAC firmato, opt-out `manual` nel CRM Blob, one-click RFC 8058 |

Anti-backfill: alla prima esecuzione viene scritto `crm/v1/email/activation.json`; ricevono email SOLO le registrazioni successive a quel momento.

## Stato dopo il deploy iniziale

- Transport in **dry-run** (manca `RESEND_API_KEY`): il flusso gira tutto, il ledger si popola con `status: dry_run`, nessuna email parte.
- `EMAIL_TEST_OVERRIDE=minagigi@gmail.com`: quando il transport diventerà live, TUTTI gli invii andranno a quell'indirizzo finché la variabile non viene rimossa (rampa sicura).
- Webhook Eventbrite registrato via self-provisioning (`?setupWebhook=1`).

## Attivazione invii reali (unico passo utente)

1. Account Resend — due strade:
   - **Vercel Marketplace (consigliata)**: dashboard Vercel → Integrations → Resend → Install sul progetto `nightllfe-milan-main`. La chiave viene iniettata automaticamente; se il dominio è su DNS Vercel i record si configurano da lì.
   - **Diretta**: signup su resend.com → Domains → aggiungi `nightlifemilan.com` → crea su DNS i 2-3 record indicati (SPF/DKIM) → API Keys → nuova chiave.
2. Env su Vercel (Production): `RESEND_API_KEY=<chiave>`; opzionale `EMAIL_FROM=Nightlife Milan <events@nightlifemilan.com>` (default già così; il dominio deve risultare Verified su Resend).
3. Redeploy (o attendere il deploy successivo).
4. Test reale (gli invii finiscono solo sulla tua casella finché c'è l'override):
   - `https://nightlifemilan.com/api/crm/email-preview?k=<EMAIL_WEBHOOK_SECRET>&sample=1&locale=it` → anteprima HTML.
   - `https://nightlifemilan.com/api/crm/email-dispatch?k=<EMAIL_WEBHOOK_SECRET>&order=<ID_ORDINE>&force=1` → invio reale del flusso completo verso l'override.
   - Controlla resa su Gmail mobile + desktop.
5. **Go-live**: rimuovi `EMAIL_TEST_OVERRIDE` dalle env Production → da quel momento i nuovi registrati ricevono l'email vera.

`<EMAIL_WEBHOOK_SECRET>` si legge da Vercel → Settings → Environment Variables.

## Operazioni

- Stato webhook route: `GET /api/crm/email-webhook?k=<SECRET>` → `{ok, transport}`.
- Elenco webhook Eventbrite: `GET /api/crm/email-dispatch?k=<SECRET>&listWebhooks=1` (secret mascherato).
- Ri-registrare/ruotare il webhook: `GET /api/crm/email-dispatch?k=<SECRET>&setupWebhook=1` (idempotente; usa il token Eventbrite già in env).
- Sweep manuale di prova: `...&dryRun=1&sinceHours=168` (nessuna scrittura, report `would-send`/skip con orderId).
- Dispatch forzato di un ordine (bypassa solo il filtro anti-backfill): `...&order=<ID>&force=1` (idempotente sul ledger).
- Cron orario autenticato da Vercel con `CRON_SECRET` (già attivo).

## Spegnere / emergenza

- Stop invii: rimuovi `RESEND_API_KEY` (torna dry-run) — effetto al deploy/istanza successiva.
- Stop trigger: `listWebhooks` → id → `npx tsx scripts/manage-attendee-email-webhook.ts delete --id <id>` (serve `EVENTBRITE_TOKEN` in env locale) — oppure da eventbrite.com → Account settings → Webhooks.

## Note privacy

Email transazionale legata alla registrazione (non marketing): informa che la registrazione non è un biglietto e come ottenere l'ingresso. Rispetta comunque gli opt-out del CRM (`opted_out` salta l'invio), header `List-Unsubscribe` + link firmato in ogni email, nessun invio per eventi passati o registrazioni precedenti all'attivazione. Ledger su Blob privato.
