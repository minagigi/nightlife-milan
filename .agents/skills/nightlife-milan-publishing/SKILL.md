---
name: nightlife-milan-publishing
description: Publish, update, translate, audit, and deploy Nightlife Milan events, venue pages, landing pages, articles, and guides. Use whenever work affects nightlife content on nightlifemilan.com or its Eventbrite listings, including SEO metadata, multilingual copy, event imagery and galleries, Xceed affiliate links, WhatsApp booking, structured data, responsive verification, sitemap submission, or when an approved publishing pattern must become a permanent project standard.
---

# Nightlife Milan Publishing

Apply the approved Nightlife Milan publishing standard end to end. Treat accepted user corrections as durable knowledge, not one-off chat context.

## Start Here

1. Locate the Nightlife Milan repository.
2. Read its `AGENTS.md`, `docs/seo-metadata-strategy.md`, `lib/i18n/locales.ts`, and the closest existing page or event of the same type.
   If Eventbrite is mentioned or in scope, also read and apply the sibling or global `eventbrite-nightlife-publishing` skill before acting.
3. Read [references/publishing-standard.md](references/publishing-standard.md).
4. For venue facts or audience rules, read [references/venue-facts.md](references/venue-facts.md).
5. Before publishing or deploying, read [references/verification.md](references/verification.md).

Do not redesign from memory when an approved live example exists. Use the current production page and its local implementation as the visual and structural baseline.

## Non-Negotiables

- Generate copy and translations locally in the active Codex session. Never call Anthropic or another paid text-generation API for writing, rewriting, translating, summarizing, FAQ generation, or SEO metadata.
- Operational APIs remain allowed for source data and submission: Eventbrite, Xceed public pages, Vercel, Search Console, image hosting, and site publishing.
- Create, update, refresh, publish, unpublish, or repair Eventbrite listings only through the approved operational API path. The Eventbrite browser editor is read-only for visual verification and must never be used to save publication changes.
- Never invent prices, artists, schedules, minimum age, dress code, availability, ticket terms, or venue services.
- Preserve the exact Xceed affiliate URL from the current source. A non-affiliate replacement loses commission and is a release blocker.
- Use the booking number exactly as `+39 351 912 7047`. Tell buyers to send their purchase confirmation on WhatsApp so booking and payment can be checked.
- For every Eventbrite listing with a verified Nightlife Milan Xceed affiliate URL, localize both order-confirmation fields to the listing language. State that Eventbrite registration is not an admission ticket, include only the exact Xceed URL with channel `nightlifemilan-1`, and repeat the WhatsApp purchase-confirmation instruction.
- Write native search-oriented copy in each language. Never append an English SEO keyword block to a non-English event.
- Publish only complete language variants. Keep incomplete locales navigable but `noindex`; include only complete locales in hreflang and sitemap.
- Do not publish an image with cropped information, invented branding, unreadable contact text, or random artwork unrelated to the approved poster and venue.
- Never turn a panoramic venue photo into a square with a centre crop. Recompose or outpaint it to 5:4 while keeping every focal subject intact; a numerically valid ratio with damaged framing is a release failure.
- Every Eventbrite body `<img>` must persist responsive sizing (`display:block;width:100%;max-width:100%;height:auto`). Verify live that rendered width equals container width on mobile and desktop; otherwise Eventbrite crops the native-size image inside its overflow-hidden body.
- For curated Eventbrite bodies, use answer-first copy, contacts immediately after the lead, the approved poster immediately after contacts, and only 1:1 or 5:4 body media whose metadata describes literal visible pixels.
- Site discovery galleries and suggested-event carousels must show only canonical site events backed by an explicitly verified live Eventbrite listing. Keep the user-approved featured order (Guè first, World Cup final second while current), never surface an event from Xceed or static data alone, and never describe an informational Eventbrite registration as admission or a paid ticket.
- Match Eventbrite venues by name and verified address, and personalize plus re-read both order-confirmation fields before declaring a listing complete.
- For API refreshes of curated Eventbrite batches, discover listings organization-wide by exact marker, preserve each verified existing venue ID, and split metadata/summary from the description write. Treat Eventbrite's uppercased HTML serialization as equivalent only in structural comparisons.
- Do not expose secrets in files, commands, logs, commits, or responses.

## Choose the Workflow

### Event

1. Verify date, venue, services, audience, age, schedule, pricing, affiliate link, and source images.
2. Prepare one language as a pilot when the template or visual treatment is new.
3. Create native title, summary, full body, detailed agenda, programme, 25 FAQs, metadata, image labels, and gallery copy.
4. Recompose the real poster for required aspect ratios; preserve its identity and localize visible text for the event language.
5. Publish or update the Eventbrite variant through the approved API submission path, never through the Eventbrite browser editor or a text-generation API, and verify its localized order-confirmation message when an Xceed affiliate link is present.
6. Put the commercial SEO closing and exactly 10 native commercial-intent keyword permutations after all 25 FAQs.
7. Create or update the matching site event using the approved Italian event design as the structural baseline.
8. Verify the pilot live. Only then roll out the remaining complete languages.

### Page or Landing

1. Match the existing design system and closest approved page.
2. Answer the target intent in the first viewport.
3. Add current events, truthful venue services, programme, useful FAQ, internal links, WhatsApp conversion path, metadata, and schema where relevant.
4. Avoid duplicate intent. Redirect or consolidate an older equivalent URL.

### Article or Guide

1. Define one primary search intent and supporting questions.
2. Write useful, original, native-language content with verifiable venue and event facts.
3. Link to relevant events, clubs, weekly hub, VIP tables, and concierge without stuffing keywords.
4. Add Article or FAQ schema only when the visible content supports it.

## Metadata Rules

Use the repository helper in `lib/seoMetadata.ts` rather than duplicating truncation logic.

- Title: primary intent first, normally no more than 62 characters.
- Description: normally no more than 158 characters and containing one localized WhatsApp CTA with the full number.
- Event title: event name, venue or city, and exact date.
- Event description: venue, city, date, useful differentiator, and WhatsApp CTA.
- Eventbrite summary: no more than 140 characters; include the strongest native-language search terms and the WhatsApp number.
- Put the phone in descriptions and conversion copy, not in SEO titles.
- Canonical must be self-referential for the current language.

## Knowledge Ratchet

When the user approves a correction, layout, image treatment, content limit, API behavior, or publishing sequence:

1. Apply it to the current artifact.
2. Update this skill or the appropriate reference file before declaring completion.
   When the repository contains `.agents/skills/nightlife-milan-publishing`, keep that versioned copy synchronized with the global installed skill.
3. Update the repository rule or reusable code when enforcement belongs in the project.
4. Add or update a test, validator, or audit check when the rule can be automated.
5. Record the approved live example as the new baseline.

Never allow a later batch to regress to an older pattern simply because it is easier or already automated.

## Completion Gate

Do not call a publication complete until all applicable checks in [references/verification.md](references/verification.md) pass locally and on the live URL. For a new pattern, show the pilot before batch publication. Do not use Google's Indexing API for ordinary pages. Keep the protected daily sitemap submitter active: at 18:00 UTC it must validate the complete live sitemap and submit it once per Milan calendar day to the existing Search Console property, even when the URL set is unchanged.
