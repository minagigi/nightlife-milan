# Eventbrite-only curated collections

- Listings marked `nlm:curated` remain publishable and visible on Eventbrite.
- `fetchEventbriteEvents()` excludes those listings before site mapping, so they do not enter pages, cards, calendars, carousels, or sitemap output.
- Previously generated curated collection URLs return `410 Gone` with `noindex, nofollow, noarchive`.
- Normal `nlm:src` event listings and full site event pages remain unchanged.
- The rule is stored in the global and repository `nightlife-milan-publishing` skill copies and covered by regression tests.
- `/api/events/sync?sitemapOnly=1` resubmits only the sitemap and never calls the URL-level Google Indexing API.

Verification completed locally: typecheck, lint, 54 tests, production build, sitemap exclusion, three multilingual `410` checks, and a normal event `200` control check.
