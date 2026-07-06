# CLAUDE.md — Nightlife Milan

**Next.js 15 App Router · Multilingual EN/IT · Milan nightlife guide**

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
- **Routing**: `app/[locale]/` — locales: `en` (default, no prefix), `it`
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

## Auto-Import Eventbrite (cron notturno, 02:00 UTC)

Trova eventi di terzi nei 18 venue, li riscrive in chiave SEO, ripulisce locandine e testi da contatti/brand di terzi, pubblica sulla nostra org Eventbrite. Piano: `.claude/plans/2026-07-07-eventbrite-auto-import.md`.

| File | Ruolo |
|------|-------|
| `lib/venueMatching.ts` | Matcher nome-venue → venueId condiviso (null-safe, usato anche da `eventbriteSync.ts`) |
| `lib/eventScout.ts` | Discovery pubblica (feed this-week/next-week Eventbrite Milano) + matching + filtro evergreen |
| `lib/importLedger.ts` | Dedupe: fingerprint venue+data + marker `<!-- src:{ebId} -->` |
| `lib/eventRewriter.ts` | Riscrittura SEO bilingue con claude-sonnet-5 (voce + regole anti-AI-tell) |
| `lib/brandSanitizer.ts` | Seconda linea regex: telefoni/URL/handle/promoter terzi → Nightlife Milan |
| `lib/promoterBlacklist.ts` | Nomi promoter noti da sostituire |
| `lib/posterPipeline.ts` | Locandine: vision check → editing Gemini (Nano Banana 2) → fallback foto venue |
| `lib/eventPublisher.ts` | Pubblicazione API v3 sulla nostra org (venue/immagine/ticket/publish) |
| `lib/duplicateCleanup.ts` | Pulizia duplicati esistenti (usato da `app/api/events/cleanup-duplicates`) |
| `app/api/events/import/route.ts` | Route cron principale (`?dryRun=1`, `?max=N`) |
| `app/api/events/cleanup-duplicates/route.ts` | Pulizia one-off (dry-run default, `?execute=1` per eseguire) |

---

**Last Updated**: 2026-07-07
