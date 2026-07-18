# World Cup rich results and favicon release

- Added native, uniquely sluggified World Cup final pages for all 35 enabled locales; only the six globally indexable locales enter robots index, hreflang, and sitemap.
- Preserved static generation for mock, weekly, known Eventbrite, and site-only event pages while retaining ISR for new dynamic listings.
- Added page-level `Event`, `BreadcrumbList`, and `FAQPage` JSON-LD. The ticket `Offer` uses the verified Xceed affiliate URL and omits an unverified `validFrom` sale date.
- Added stable 96x96 ICO/SVG favicons and a 180x180 Apple icon. The `www.nightlifemilan.com` host now redirects every path to the HTTPS apex domain with a permanent 308.
- Reframed event gallery assets are rendered at their native 5:4 ratio with `object-fit: contain`; Playwright checks at 390x844, 768x1024, and 1440x900 found no horizontal overflow or crop.
- Scheduled the protected sitemap-only Search Console submission once daily at 18:00 UTC; the 08:00 Eventbrite refresh no longer uses the Google Indexing API or submits the sitemap.
- Verification: typecheck, lint, 66 tests, production build (305 static pages), 35/35 locale crawl, 6/6 sitemap URLs, JSON-LD inspection, favicon responses, global-host redirect tests, and independent Deep review (`RELEASE`).
- Rollback baseline before publication: `83d2529210e6f2274e28bd93ce22c90a5d47bf08`.
