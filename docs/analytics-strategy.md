# Strategia Analytics — Funnel completo Nightlife Milan

**Obiettivo**: un quadro unico che risponda a 7 domande di traffico/conversione, dal primo click sul sito fino al biglietto venduto o alla prenotazione via WhatsApp.

**Data**: 2026-07-09 · **Stato**: IMPLEMENTATO (vedi §7) — dashboard su `nightlifemilan.com/analytics`

---

## 1. Le 7 metriche e dove vivono

| # | Domanda | Fonte primaria | Come | Stato |
|---|---------|----------------|------|-------|
| 1 | Visite al sito | Tracking first-party + GA4 | pageview doppia scrittura (§7) | ✅ implementato |
| 2 | Visite agli eventi Eventbrite | Dashboard organizzatore Eventbrite | report "Visualizzazioni pagina" per evento (link in dashboard) | ✅ disponibile, da consultare |
| 3 | Registrazioni Eventbrite | API Eventbrite (`quantity_sold` per ticket class) | lettura live a ogni apertura dashboard + snapshot cron per la curva | ✅ implementato |
| 4 | Visite pagina Xceed per evento | pro.xceed.me + click in uscita | `xceed_click` automatico come proxy + inserimento manuale in dashboard | ✅ implementato |
| 5 | Acquisti biglietti su Xceed | pro.xceed.me (channel `nightlifemilan-1`) | inserimento manuale in dashboard (nessuna API pubblica) | ✅ implementato |
| 6 | Click sul tasto WhatsApp | Tracking first-party + GA4 `whatsapp_click` | delega click globale su tutte le CTA | ✅ implementato |
| 7 | Form prenotazione compilato | Tracking first-party + GA4 `booking_form_submit` | tracking nel submit | ✅ implementato |

Principio: **GA4 è l'hub** per tutto ciò che accade sul nostro dominio (1, 4-proxy, 6, 7). **Eventbrite e Xceed restano le fonti di verità** per ciò che accade sui loro domini (2, 3, 5) — non possiamo mettere il nostro tracking lì, ma possiamo estrarre i loro dati (API Eventbrite) o leggerli in dashboard (Xceed).

---

## 2. Stato attuale del codice (audit)

Cosa è emerso dall'analisi del repo:

- **GA4 presente ma solo pageview.** `components/GoogleAnalytics.tsx` carica gtag.js lazy (alla prima interazione, per Lighthouse). Nessun `gtag('event', ...)` in tutto il codebase: zero eventi custom oggi.
- **CTA WhatsApp non tracciate.** Quattro punti di contatto, tutti senza tracking:
  - `components/WhatsAppFloating.tsx` (bottone flottante)
  - `components/MobileBottomBar.tsx` ("Prenota ora su WhatsApp")
  - `components/BookingForm.tsx` (il submit apre `wa.me` con messaggio precompilato)
  - `app/[locale]/booking/success/page.tsx` (share "Invia agli amici")
- **`/booking/success` è codice morto ai fini conversione**: contiene un `dataLayer.push({event: 'booking_success'})` ma `BookingForm` non reindirizza mai lì — apre solo WhatsApp. L'evento non scatta mai.
- **CTA Xceed non tracciate.** `components/GoldEventContent.tsx` ha "Compra Biglietti" / "Prenota Tavolo" → `affiliateUrl` (`xceed.me/.../channel/nightlifemilan-1`), senza evento GA4 sul click.
- **Nessun UTM** sui link in uscita né convenzione UTM per i link che pubblichiamo nelle description Eventbrite verso il sito (il backlink con slug esiste già via marker `nlm:src`).

---

## 3. Strategia per metrica

### 3.1 Visite al sito — GA4 (attivo)

Già funzionante. Due accorgimenti:

- **Caveat noto**: il lazy-load su interazione non conta chi apre e chiude senza toccare nulla (trade-off voluto per la performance — accettato, documentato in `GoogleAnalytics.tsx`). Se in futuro serve il numero "vero" di visite, affiancare **Vercel Analytics** (cookie-free, zero impatto Lighthouse, già su Vercel) come seconda fonte; per ora non necessario.
- Aggiungere **Google Search Console** al quadro per il traffico organico (query, impression, CTR) — complementare a GA4, costo zero.

### 3.2 Visite agli eventi Eventbrite — dashboard organizzatore

Le page view degli eventi Eventbrite si leggono nel **report dell'organizzatore** (Gestisci evento → Report → Visualizzazioni pagina); l'API pubblica v3 non le espone in modo affidabile, quindi niente automazione qui: consultazione settimanale in dashboard.

Per capire **quanto di quel traffico arriva da noi**: usare i **link di tracciamento Eventbrite** ("Tracking links" nella dashboard evento) con codice `nlm-site` sui link a Eventbrite pubblicati dal sito. Eventbrite attribuirà visite e vendite a quel codice — è il loro equivalente degli UTM.

### 3.3 Registrazioni Eventbrite — API + cron rollup (da costruire)

L'infrastruttura c'è già (token `EVENTBRITE_TOKEN`, pipeline import, marker `nlm:src` che lega ogni evento Eventbrite allo slug sito). Il pezzo mancante:

- **Nuova route** `app/api/analytics/eventbrite/route.ts` (cron settimanale, stesso pattern di `import/route.ts`):
  1. lista eventi live/ended dell'organizzazione (`/organizations/{org_id}/events/`),
  2. per ognuno legge `/events/{id}/attendees/` (conteggio registrati, per status) e `ticket_availability` (capienza/venduti),
  3. salva uno snapshot JSON su **Vercel Blob** (riusare `lib/richContentStore.ts` come pattern, store privato già configurato),
  4. lo snapshot per data permette anche la **curva di registrazione nel tempo**, che la dashboard Eventbrite non dà in export comodo.
- Il join con lo slug sito (dal marker `nlm:src=...;slug-en=...`) permette il funnel completo: *pageview pagina evento sito → click out → registrazione Eventbrite*.

### 3.4 Visite pagina Xceed per evento — proxy click + dashboard

Le pagine Xceed non sono nostre: **le visite totali le vede solo Xceed**. Due mosse:

1. **Proxy misurabile subito**: evento GA4 `xceed_click` su ogni click "Compra Biglietti"/"Prenota Tavolo" in `GoldEventContent.tsx`, con parametri `event_slug` e `cta` (`buy_tickets` | `book_table`). Questo misura *il traffico che noi mandiamo a Xceed, per singolo evento* — che è la parte del funnel sotto il nostro controllo.
2. **Dashboard Ambassador Xceed**: il channel link `/channel/nightlifemilan-1` attribuisce già click e vendite al nostro account. Verificare nella dashboard Ambassador la granularità per evento; se serve di più (page view totali per evento), chiederlo al contatto partner Xceed — non esiste API pubblica.

Il rapporto `xceed_click` (GA4) vs vendite attribuite (dashboard Xceed) dà il **tasso di conversione click→acquisto** per evento.

### 3.5 Click WhatsApp — evento GA4 unico con `source` (da costruire)

Un solo evento `whatsapp_click` con parametro `source`, così in GA4 si confrontano i punti di contatto in un'unica vista:

| Componente | `source` |
|------------|----------|
| `WhatsAppFloating.tsx` | `floating` |
| `MobileBottomBar.tsx` | `bottom_bar` |
| `BookingForm.tsx` (submit) | `booking_form` |
| `booking/success` (share) | `share_success` |

Più i parametri `page_path` e, dove disponibile, `venue`/`event_slug`.

**Implementazione**: helper `lib/analytics.ts` con `trackEvent(name, params)` che fa push su `window.dataLayer` (creandolo se assente — gtag.js processa la coda al load, e comunque un click È un'interazione, quindi il lazy-load di GA è già partito). Un helper unico evita di duplicare la guardia `typeof window` in ogni componente.

### 3.6 Form prenotazione — evento chiave GA4 (da costruire)

- In `BookingForm.handleSubmit`: `trackEvent('booking_form_submit', { venue, event_slug, guests, has_date })` **prima** di `window.open(wa.me...)`.
- In GA4: marcare `booking_form_submit` (e `whatsapp_click`) come **key event** (conversione).
- Decisione collegata: `/booking/success` oggi è irraggiungibile. O si reindirizza lì dopo l'apertura di WhatsApp (dando una pagina di conferma reale + un secondo segnale di conversione), o si rimuove il suo script di tracking morto. Consiglio: reindirizzare — migliora anche la UX (istruzioni "come entrare" già pronte in quella pagina).

Nota privacy: **mai** mandare a GA4 nome/email dell'utente — solo venue, evento, n. ospiti.

---

## 4. Convenzioni

**Eventi GA4** (tutti key event tranne `xceed_click`):

| Evento | Parametri | Significato |
|--------|-----------|-------------|
| `whatsapp_click` | `source`, `page_path`, `venue?`, `event_slug?` | contatto WhatsApp iniziato |
| `booking_form_submit` | `venue?`, `event_slug?`, `guests`, `has_date` | form prenotazione completato |
| `xceed_click` | `cta`, `event_slug` | uscita verso Xceed |
| `eventbrite_click` | `event_slug` | uscita verso Eventbrite (se/dove il sito linka Eventbrite) |

**UTM in ingresso** (link nelle description Eventbrite verso il sito):
`?utm_source=eventbrite&utm_medium=referral&utm_campaign={slug-evento}` — da aggiungere in `assembleGoldDescription` (`lib/eventRewriter.ts`) dove si costruisce il backlink. Attenzione: l'URL con UTM va costruito dal codice DOPO la sanitizzazione, mai passato per `sanitize()` (regola nota, vedi CLAUDE.md).

**Tracking link Eventbrite in uscita**: codice `nlm-site` sui link sito→Eventbrite (§3.2).

---

## 5. Piano di implementazione

| Fase | Contenuto | Sforzo |
|------|-----------|--------|
| **1 — Quick win** | `lib/analytics.ts` + eventi su 4 CTA WhatsApp, submit form, CTA Xceed/Eventbrite; key event in GA4; fix `/booking/success` (redirect o rimozione script morto) | ~½ giornata di sviluppo |
| **2 — Attribuzione cross-dominio** | UTM sui backlink Eventbrite→sito in `eventRewriter`; tracking link `nlm-site` sito→Eventbrite; Google Search Console | ~½ giornata + config dashboard |
| **3 — Rollup Eventbrite** | Route cron `app/api/analytics/eventbrite` + snapshot su Blob (registrati, venduti/capienza, curva temporale per evento) | ~1 giornata |
| **4 — Routine e reportistica** | Check settimanale: GA4 (funnel key events), dashboard Eventbrite (page view), dashboard Xceed Ambassador (vendite); eventuale pagina interna `/admin/analytics` che unisce snapshot Blob + link alle dashboard | ricorrente; pagina opzionale |

**Il funnel finale leggibile per ogni evento**: pageview pagina evento (GA4) → `xceed_click`/`eventbrite_click` (GA4) → visite pagina esterna (dashboard EB/Xceed) → registrazioni (API EB) / acquisti (dashboard Xceed) → in parallelo `whatsapp_click` + `booking_form_submit` per il canale prenotazione diretta.

---

## 6bis. Stato implementazione (2026-07-09) {#7}

Tutto implementato nello stesso PR di questo documento. Architettura:

**Dashboard** — `nightlifemilan.com/analytics` (il typo `/analitycs` redirige), protetta da **Basic Auth nel middleware**. Mostra: KPI del funnel, visite/click per giorno (grafici 30 gg), curva registrazioni Eventbrite, tabella funnel per evento (visite sito → click out → registrati/capienza → Δ giorno), top pagine, referrer, WhatsApp per sorgente, e la sezione Xceed con inserimento manuale.

| File | Ruolo |
|------|-------|
| `lib/analytics.ts` | `trackEvent()` client: doppia scrittura GA4 (coda gtag) + beacon `/api/track` |
| `components/AnalyticsTracker.tsx` | Nel layout: pageview per navigazione + **delega click globale** sui link `wa.me`/`xceed.me`/`eventbrite` (copre anche i server component; `data-analytics-source` etichetta la CTA) |
| `app/api/track/route.ts` | Ingest: whitelist nomi evento, filtro bot, mai PII → un blob raw per evento (append-only, niente race sui contatori) |
| `lib/analyticsStore.ts` | Layer dati: contatori raw/daily su Blob, snapshot Eventbrite, dati manuali Xceed. Giorni in fuso **Europe/Rome** |
| `app/api/analytics/aggregate/route.ts` | Cron 04:30 UTC: compatta i raw in `analytics/daily/{giorno}.json` |
| `app/api/analytics/eventbrite/route.ts` | Cron 04:00 UTC: snapshot registrazioni (la sequenza = curva) |
| `app/[locale]/analytics/page.tsx` + `actions.ts` | Dashboard (force-dynamic, noindex) + server action Xceed (passano dalla Basic Auth perché POSTano sull'URL della pagina) |
| `components/analytics/Charts.tsx` | Grafici SVG senza librerie (barre + linea, tooltip hover) |

**Setup richiesto (una volta, su Vercel)**:
1. Env `ANALYTICS_USER` e `ANALYTICS_PASSWORD` → user/password della dashboard (senza, /analytics risponde sempre 401).
2. Tutto il resto usa env già esistenti: `BLOB_READ_WRITE_TOKEN`, `EVENTBRITE_TOKEN`, `CRON_SECRET`.
3. Facoltativo: in GA4 marcare `whatsapp_click` e `booking_form_submit` come key event (Admin → Events).

**Trigger manuali** (stessa convenzione delle altre pipeline): `/api/analytics/aggregate?secret=INDEXING_SECRET`, `/api/analytics/eventbrite?secret=INDEXING_SECRET`.

L'UTM sul backlink Eventbrite→sito (§4) è attivo in `assembleGoldDescriptionForLang` per i prossimi eventi pubblicati.

---

## 6. Limiti noti (da accettare o negoziare)

- **Visite totali pagine Xceed**: visibili solo a Xceed; noi misuriamo i click che gli mandiamo e le vendite attribuite al channel. Per di più serve accordo col partner.
- **Page view Eventbrite via API**: non esposte in modo affidabile — restano in dashboard, non automatizzabili.
- **GA4 lazy-load**: sottostima i bounce "zero interazione" (scelta consapevole per la performance).
- **Ad-blocker**: GA4 è bloccato da una quota di utenti (~10-20% tipico); i numeri Eventbrite/Xceed lato server non ne soffrono — utile tenerlo a mente quando si confrontano le fonti.
