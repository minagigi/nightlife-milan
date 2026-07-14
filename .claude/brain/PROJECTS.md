# PROJECTS.md — Registro dei progetti

Ogni progetto che il cervello deve far evolvere. Per aggiungere un progetto: aggiungi una
sezione con lo stesso formato. Se vive in un altro repository, il repo deve prima essere
abilitato nell'ambiente delle Routine (l'accesso GitHub è per-repo).

---

## 1. Nightlife Milan — sito (nightlife-milan)

- **Repo**: `minagigi/nightlife-milan` · branch di produzione: `main` · deploy: Vercel
- **Cos'è**: guida ai locali notturni di Milano, Next.js 15 App Router, multilingue ~35 locali
  secondo `lib/i18n/locales.ts` (fonte di verità; EN default senza prefisso), tutti indicizzati.
  Dati statici in `lib/` (niente database).
- **Obiettivo**: crescere il traffico organico SEO e la qualità dei contenuti; il sito deve
  essere veloce, indicizzabile e sempre coerente in tutte le lingue.
- **Metriche da osservare**: build verde, pagine venue/eventi complete in tutte le lingue abilitate
  (`npm run verify` / build verde), schema.org valido (Event, FAQPage), Core Web Vitals ragionevoli.
- **Aree di evoluzione tipiche**: copertura contenuti IT/EN, SEO on-page, internal linking,
  performance, refactoring componenti, accessibilità.

## 2. Pipeline auto-import Eventbrite — Scout v3 (dentro nightlife-milan)

- **Dove**: `lib/eventScout.ts`, `lib/eventRewriter.ts`, `lib/importLedger.ts`,
  `app/api/events/import/route.ts` · cron Vercel 02:00 UTC · 15 venue non-Xceed.
- **Obiettivo**: importare e riscrivere eventi in formato gold-standard senza duplicati né
  regressioni sulle regole Eventbrite (vedi CLAUDE.md di root: NIENTE EMOJI nelle description,
  budget cautelativo `DESCRIPTION_SAFE_BUDGET = 16.000` caratteri in `lib/eventRewriter.ts` (il
  vero vincolo è niente emoji/`<img>`/`<br/>`, non la lunghezza), `music_properties` solo dopo il
  publish, ecc.).
- **Metriche**: eventi importati/giorno senza duplicati, description integre, marker `nlm:src=`
  presenti, zero eventi evergreen importati per errore.

## 3. Pipeline Xceed affiliate — v4 (dentro nightlife-milan)

- **Dove**: `lib/xceedScout.ts`, `lib/eventPublisher.ts`, `lib/richContentStore.ts`,
  `app/api/events/import-xceed/route.ts`, `components/GoldEventContent.tsx` · cron 03:00 UTC ·
  3 venue Ambassador (Justme/Aria/Pineta).
- **Obiettivo**: dati ufficiali dei venue + link affiliate (Buy Tickets/Book a Table) corretti,
  contenuto gold completo sul blob e sulla pagina sito.
- **Metriche**: eventi Xceed pubblicati con età/check-in reali, CTA affiliate funzionanti
  (`rel="sponsored"`), blob leggibile dalla pagina sito.

---

### Standard operativo eventi

- `.claude/brain/strategies/event-production-standard.md` definisce routing Sol/Terra/Luna, contratto SEO, ordine immagini e pubblicazione idempotente sito/Eventbrite.

### Backlog di idee trasversali (il cervello può pescare da qui)

- Audit SEO periodico delle pagine evento generate (title/description/schema).
- Monitoraggio qualità delle description Eventbrite pubblicate (troncamenti, emoji sfuggite).
- Test automatici sulle funzioni critiche (`normalizeAlreadyUtc`, `sanitize`, dedupe ledger).
- Copertura di tutte le lingue abilitate per i contenuti generati (evitare pagine solo in EN/IT).
