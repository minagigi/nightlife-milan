# Publishing Standard

## Site Structure

- Treat the current production implementation as the baseline.
- Keep `/events/this-week` as the only indexed weekly event hub.
- Eventbrite publication does not imply site publication. Listings marked `nlm:curated` are Eventbrite-only distribution assets: never import or render them as site events, articles, cards, calendar entries, or sitemap URLs unless the user explicitly requests a separate site page. Previously generated curated site URLs must return `410 Gone` with `noindex`.
- Redirect equivalent legacy hubs permanently.
- Use full event pages: description, what happens, agenda, programme, venue information, contacts, gallery, FAQ, conversion CTA, and schema.
- Keep the approved Nightlife Milan design. Do not replace complete pages with thin prototypes.

## Event Copy

- If there is no internationally recognized artist, begin the event title with the venue name.
- Make the description long, concrete, and useful. Explain audience, music, arrival, aperitivo or dinner, club phase, tables, dress code, age, booking, and purchase confirmation when supported by source data.
- Make the agenda detailed enough to describe each phase of the night.
- Provide exactly 25 SEO-oriented FAQs for full event publication.
- Keep every FAQ answer within 300 characters when required by the destination.
- Use high-intent nightlife queries naturally in the event language. Include date, venue, city, category, audience, music, entry, guest list, table, aperitivo, and concierge variants only when relevant.
- Never display a raw `SEO:` keyword dump in the body.

## Eventbrite Content

- Keep the summary within 140 characters and include the booking number.
- Provide both the short summary and the complete main body.
- Use supported structured content blocks. Do not assume arbitrary HTML images work inside a text field.
- The approved poster is the primary image. Keep only its title visible as an image label when a label is required; do not print title, description, and alt text as body paragraphs.
- Place additional mood images after the agenda unless the current approved template demonstrates a newer user-approved order.
- Image title, description, and alt text must be native to the event language and describe the actual image.

## Images

- Start from the real poster and real venue imagery. Do not generate a substitute concept unrelated to the supplied artwork.
- Recompose poster elements for the target ratio; do not crop critical text or add black padding as the final solution.
- Eventbrite cover: use the current approved 2:1 composition and protect text inside mobile-safe margins.
- Body poster and gallery: use 1:1 compositions that redistribute original elements while preserving hierarchy, palette, venue identity, date, and contact band.
- Localize visible poster text to the event language.
- Create four distinct mood images only from real venue references or clearly venue-faithful edits. Match audience, fashion, time of night, service, lighting, and event programme.
- Verify every generated word and number character by character before publication.

## Language and Indexing

- The site supports 35 enabled locales, but enabled does not mean indexable.
- Current priority indexable locales are English, Italian, Spanish, French, German, and Portuguese as defined by `lib/i18n/locales.ts`.
- A language can become indexable only when metadata, full body, FAQ, CTA, alt text, venue facts, and event data are complete and native.
- Generate translations locally, then submit them through operational publishing APIs. Never generate text through an Anthropic API route.

## SEO and Conversion

- Use `lib/seoMetadata.ts` for title, description, phone preservation, event dates, and robots behavior.
- Use exact, self-referential canonical URLs.
- Include only indexable languages in hreflang and sitemap.
- Add Event, ItemList, FAQPage, Article, BreadcrumbList, or LocalBusiness schema only when visible data supports it.
- Keep the WhatsApp number visible and clickable.
- Include the purchase-confirmation instruction near booking or ticket information.
- Preserve `rel="sponsored"` where applicable for affiliate purchase links.

## Venue and Category Pages

- Show only current, relevant events.
- Explain real services and audience fit.
- Link to event detail pages rather than duplicating their complete text.
- Avoid competing pages for the same intent. Consolidate or redirect when overlap is material.
