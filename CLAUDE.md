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

**Last Updated**: 2026-06-23
