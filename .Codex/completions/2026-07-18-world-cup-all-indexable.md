# World Cup final: all complete locales indexable

- Applied the existing event-scoped `indexedLocales` override to the World Cup final profile only.
- All 35 complete native event locales now enter robots index, the reciprocal hreflang set, and the sitemap.
- Global locale indexing remains limited to `en`, `it`, `es`, `fr`, `de`, and `pt`; incomplete non-World-Cup pages retain their existing `noindex` guardrail.
- HTTP header gate: the middleware now omits `X-Robots-Tag: noindex, follow` only for an exact `/{locale}/events/{localized-world-cup-slug}` path whose event profile explicitly indexes that locale; all other non-indexed-locale paths remain guarded.
- Preserved every localized slug, canonical origin, Event/FAQ/Breadcrumb schema, Xceed affiliate URL, content, image, favicon, API route, and cron configuration.
- Current release gates: focused tests 8/8, full tests 67/67, typecheck, lint, production build 305/305, and `git diff --check` passed; middleware bundle is 56.9 kB.
- Local runtime crawl: 35/35 event pages indexable with self-canonical URLs, 35 reciprocal locale alternates plus `x-default`, and all 35 sitemap entries present exactly once. The HTTP-header correction passed on all 34 prefixed locale routes; `/nl/clubs`, an ordinary Dutch event, and an Italian World Cup slug under `/nl/` retained `noindex` as negative canaries.
- Publication baseline and rollback commit: `09c0cd0f18517ea73ffc25b21ff59bc87d0de13e`.
