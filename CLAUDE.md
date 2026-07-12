# CLAUDE.md — Nightlife Milan

**Next.js 15 App Router · Multilingual ~35 locales (EN default) · Milan nightlife guide**

---

## Session Start Protocol ⚡

**MANDATORY** at start of each session:

```
✓ .claude/COMMON_MISTAKES.md      # ⚠️ CRITICAL - Read FIRST
✓ .claude/QUICK_START.md          # Commands & dev server
✓ .claude/ARCHITECTURE_MAP.md     # File locations
```

**At task completion:**
- Save key decisions in `.claude/completions/YYYY-MM-DD-task.md`

**⚠️ NEVER auto-load:**
- `.claude/completions/` · `.claude/sessions/` · `docs/archive/`

---

## Tech Stack

- **Framework**: Next.js 15.5 App Router, TypeScript
- **Routing**: `app/[locale]/` — ~35 locales defined in `lib/i18n/locales.ts` (source of truth; `en` default, no prefix). ALL enabled locales are indexed — every new page/content must cover all of them.
- **Middleware**: strips `/en/` prefix → rewrites to `/en/` internally
- **Styling**: Tailwind CSS
- **Data**: static files in `lib/` (no database)

---

## Key Data Files

| File | Content |
|------|---------|
| `lib/venuesData.ts` | 18 venues with slugs, images, SEO fields |
| `lib/eventsConfig.ts` | Weekly recurring events (WeeklyEvent interface) |
| `lib/data.ts` | mockEvents (one-off events), getVenues(), getEventsByVenueId() |
| `lib/types.ts` | All TypeScript interfaces |
| `lib/seo.ts` | SEO helpers: getLocalizedText(), generateEventSchema() |

## Key Pages

| Route | File |
|-------|------|
| `/clubs` | `app/[locale]/clubs/page.tsx` |
| `/clubs/[slug]` | `app/[locale]/clubs/[slug]/page.tsx` |
| `/events/[slug]` | `app/[locale]/events/[slug]/page.tsx` |

---

## Auto-Import Eventbrite — due sorgenti (cron notturni)

**Regole scoperte sull'API Eventbrite (valide per ENTRAMBE le pipeline, vedi `.claude/plans/2026-07-07-eventbrite-gold-standard.md` sezione "RISULTATO REALE FASE G0" per il dettaglio):**
- `description` va scritta annidata in `POST /events/{id}/` (NON l'endpoint dedicato `/description/`, che dà sempre 405).
- Accetta HTML vero (h2/h3/p/ul/li/a) — MAI `<img>`/`<br/>` **e MAI EMOJI**: un'emoji ovunque nella description fa collassare/troncare tutto il contenuto da quel punto in poi (bug reale scoperto in FASE X4, confermato con bisezione su un evento live). Niente emoji nel campo `description`; il sito/blob non ha questo limite e le usa liberamente.
- Il vincolo reale su `description` NON è la lunghezza (il presunto "tetto ~1.000-1.300 caratteri" di FASE X4 era in realtà causato dalle emoji nei test, mai isolate dalla lunghezza) ma il contenuto vietato sopra (emoji/`<img>`/`<br/>`): una bisezione reale su un evento live (FASE B0) ha mostrato 23.288 caratteri di HTML emoji-free intatti senza troncamento. Il codice usa comunque un budget di sicurezza cautelativo, `DESCRIPTION_SAFE_BUDGET = 16000` caratteri in `lib/eventRewriter.ts` (~70% della soglia misurata) — sotto quel tetto il corpo gold-standard completo (sezioni/25 FAQ/programma) può vivere anche direttamente nella description, oltre che sul **blob** e sulla pagina sito.
- `music_properties` (età/check-in) va scritto **DOPO** `POST /events/{id}/publish/`, non prima — scriverlo su un evento ancora draft viene azzerato dal publish stesso (bug reale confermato).
- Le date `XceedEvent.startISO/endISO` sono GIÀ UTC vero — usare `normalizeAlreadyUtc()`, mai `toEventbriteUtc()` (pensata per date wall-clock locali, sottrarrebbe l'offset di Roma una seconda volta).
- `sanitize()` (telefoni/URL/promoter di terzi → nostri) va applicato SOLO al testo AI-generato (hook) prima di assemblare la description, mai al risultato finale già assemblato: le sue regex corrompono URL/slug/marker costruiti dal codice (falsi positivi su date numeriche nello slug, e l'URL affiliate Xceed veniva rimosso perché non riconosciuto come "nostro"). Usare `resolveWhatsappOnly()` sul risultato finale.

### Sorgente 1 — Scout Eventbrite (v3, cron 02:00 UTC, i 15 venue non-Xceed)

| File | Ruolo |
|------|-------|
| `lib/venueMatching.ts` | Matcher nome-venue → venueId condiviso |
| `lib/eventScout.ts` | Discovery pubblica (feed this-week/next-week Eventbrite Milano) + matching + filtro evergreen |
| `lib/importLedger.ts` | Dedupe: fingerprint venue+data + marker `nlm:src=` (commento HTML) |
| `lib/venuePricing.ts` | Listini tavoli/ticket + dress code/età/parcheggio per venue (fallback statico, solo dati reali) |
| `lib/eventRewriter.ts` | `rewriteEvent()`: 2 chiamate Sonnet (corpo + 25 FAQ) → `assembleGoldDescription` (HTML vero senza emoji, budget `DESCRIPTION_SAFE_BUDGET` = 16.000 char, marker canonico) |
| `app/api/events/import/route.ts` | Cron (`?dryRun=1`, `?max=N`, default 3/run) + poll pagina sito + notifica Google Indexing |

### Sorgente 2 — Xceed affiliate (v4, FASE X, cron 03:00 UTC, i 3 venue Ambassador: Justme/Aria/Pineta)

Dati UFFICIALI dei venue (prezzi/orari/età/dress code reali, non scraping) via le pagine pubbliche xceed.me (HTTP puro). Piano: `.claude/plans/2026-07-07-xceed-affiliate-pipeline.md`.

| File | Ruolo |
|------|-------|
| `lib/xceedScout.ts` | Discovery HTTP sui 3 venue affiliati + parse offers/età/dress/doors dal blob RSC della pagina |
| `lib/xceedLedger.ts` | Dedupe per `xceedId` esatto (marker `nlm:src=xc-{id}`) |
| `lib/richContentStore.ts` | Vercel Blob (store **Private**, `BLOB_READ_WRITE_TOKEN`) — contenuto gold completo per la pagina sito |
| `lib/eventRewriter.ts` | `rewriteXceedEvent()`: come sopra ma da dati ufficiali reali, description con link Buy Tickets/Book a Table (affiliate) in testa |
| `lib/eventPublisher.ts` | `publishXceedEvent()` — condivide `publishCore` con `publishEvent`; età/check-in REALI per-evento (non da venuePricing statico) |
| `app/api/events/import-xceed/route.ts` | Cron (`?dryRun=1`, `?max=N`, `?days=N`, default 3/run) |
| `components/GoldEventContent.tsx` | Rendering pagina sito: sezioni/programma/listino reale/FAQ (schema.org FAQPage) + CTA Buy Tickets/Book a Table (`rel="sponsored"`) |

### Condivisi

| File | Ruolo |
|------|-------|
| `lib/brandSanitizer.ts` | `sanitize()` (solo su hook AI) + `resolveWhatsappOnly()` (sul risultato finale assemblato) |
| `lib/eventbriteSync.ts` | `fetchEventbriteEvents()` per il sito — onora il marker `nlm:src=X;slug-en=Y` per uno slug identico a quello linkato su Eventbrite (backlink) |
| `lib/posterPipeline.ts` | Locandine: vision check → editing Gemini (Nano Banana 2) → fallback foto venue |
| `lib/promoterBlacklist.ts` | Nomi promoter noti da sostituire (solo scout v3) |
| `lib/duplicateCleanup.ts` | Pulizia duplicati esistenti (`app/api/events/cleanup-duplicates`) |
| `app/api/events/spike-g0/route.ts`, `spike-x1/route.ts` | Route diagnostiche one-off (non produzione) — usate per gli spike G0/X1 |

---

## Analytics interno (dashboard /analytics)

Strategia completa: `docs/analytics-strategy.md`. Dashboard su `/analytics` protetta da **Basic Auth nel middleware** (`ANALYTICS_USER`/`ANALYTICS_PASSWORD`).

| File | Ruolo |
|------|-------|
| `lib/analytics.ts` + `components/AnalyticsTracker.tsx` | `trackEvent()` doppia scrittura (GA4 + beacon `/api/track`); tracker nel layout con delega click globale su `wa.me`/`xceed.me`/`eventbrite` (`data-analytics-source` etichetta la CTA) |
| `lib/analyticsStore.ts` | Layer dati su Blob: raw append-only → daily compattati (fuso Europe/Rome), snapshot Eventbrite, dati manuali Xceed |
| `app/api/track/route.ts` | Ingest beacon (whitelist eventi, filtro bot, mai PII) |
| `app/api/analytics/aggregate`, `app/api/analytics/eventbrite` | Cron 04:30/04:00 UTC (auth: `CRON_SECRET` o `?secret=INDEXING_SECRET`) |
| `app/[locale]/analytics/` | Dashboard + server action Xceed (POSTano sull'URL della pagina → coperte dalla Basic Auth; NON spostarle su /api) |

⚠️ Le visite/vendite Xceed si inseriscono a mano da pro.xceed.me nel form della dashboard (nessuna API pubblica).

---

**Last Updated**: 2026-07-12
