# Verification Gate

## Before Submission

- Confirm venue, date, time zone, services, audience, age, dress code, prices, capacity language, and exact affiliate URL.
- Confirm native-language title, summary, full body, programme, 25 FAQs, WhatsApp number, and purchase-confirmation instruction.
- Confirm image ratio, safe margins, readable text, localized visible copy, image order, title, description, and alt text.
- Confirm no third-party phone, promoter, URL, or unsupported claim remains.

## Repository Checks

- Run `npm run typecheck`.
- Run `npm run lint`.
- Run `npm test`.
- Run `npm run build` before deploy.
- Verify sitemap URL count equals unique URL count.
- Verify canonical, robots, hreflang, H1 count, schema, alt text, and metadata lengths.

## Responsive Checks

Render at minimum:

- Mobile: 390 x 844.
- Tablet: 768 x 1024.
- Desktop: 1440 x 900.

Reject horizontal overflow, overlapping text, cropped poster information, blank hero media, broken images, duplicate H1, or server error fallbacks. Inspect screenshots visually; status `200` alone is insufficient.

## Live Checks

- Open the public URL and verify title, description, phone, canonical, robots, structured data, images, links, and CTA.
- Verify legacy redirects without automatically following them.
- Verify Eventbrite on mobile and desktop after publication.
- For new patterns, obtain user approval on one pilot before batch rollout.
- Submit the HTTPS sitemap to the existing Search Console property after deploy.
- Do not use the Google Indexing API for normal event, page, article, or guide URLs.

## Report

Return a concise report containing:

- Published or modified URLs.
- Languages completed and languages intentionally held `noindex`.
- Verification results.
- Remaining blockers or decisions.
- The approved rule or skill update added during the task.
