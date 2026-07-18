# World Cup final: all complete locales indexable

- Applied the existing event-scoped `indexedLocales` override to the World Cup final profile only.
- All 35 complete native event locales now enter robots index, the reciprocal hreflang set, and the sitemap.
- Global locale indexing remains limited to `en`, `it`, `es`, `fr`, `de`, and `pt`; incomplete non-World-Cup pages retain their existing `noindex` guardrail.
- Preserved every localized slug, canonical origin, Event/FAQ/Breadcrumb schema, Xceed affiliate URL, content, image, favicon, API route, and cron configuration.
- Local gates: focused tests 7/7, full tests 66/66, typecheck, lint, production build 305/305, and `git diff --check` passed.
- Local runtime crawl: 35/35 event pages indexable with self-canonical URLs, 35 reciprocal locale alternates plus `x-default`, all 35 sitemap entries present exactly once, and `/nl/clubs` remained `noindex` as a negative canary.
- Publication baseline and rollback commit: `09c0cd0f18517ea73ffc25b21ff59bc87d0de13e`.
