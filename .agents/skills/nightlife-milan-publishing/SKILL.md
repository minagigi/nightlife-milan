---
name: nightlife-milan-publishing
description: Publish, update, translate, audit, and deploy Nightlife Milan events, venue pages, landing pages, articles, and guides. Use whenever work affects nightlife content on nightlifemilan.com or its Eventbrite listings, including SEO metadata, multilingual copy, event imagery and galleries, Xceed affiliate links, WhatsApp booking, structured data, responsive verification, sitemap submission, or when an approved publishing pattern must become a permanent project standard.
---

# Nightlife Milan Publishing

Apply the approved Nightlife Milan publishing standard end to end. Treat accepted user corrections as durable knowledge, not one-off chat context.

## Start Here

1. Locate the Nightlife Milan repository.
2. Read its `AGENTS.md`, `docs/seo-metadata-strategy.md`, `lib/i18n/locales.ts`, and the closest existing page or event of the same type.
3. Read [references/publishing-standard.md](references/publishing-standard.md).
4. For venue facts or audience rules, read [references/venue-facts.md](references/venue-facts.md).
5. Before publishing or deploying, read [references/verification.md](references/verification.md).

Do not redesign from memory when an approved live example exists. Use the current production page and its local implementation as the visual and structural baseline.

## Non-Negotiables

- Generate copy and translations locally in the active Codex session. Never call Anthropic or another paid text-generation API for writing, rewriting, translating, summarizing, FAQ generation, or SEO metadata.
- Operational APIs remain allowed for source data and submission: Eventbrite, Xceed public pages, Vercel, Search Console, image hosting, and site publishing.
- Never invent prices, artists, schedules, minimum age, dress code, availability, ticket terms, or venue services.
- Preserve the exact Xceed affiliate URL from the current source. A non-affiliate replacement loses commission and is a release blocker.
- Use the booking number exactly as `+39 351 912 7047`. Tell buyers to send their purchase confirmation on WhatsApp so booking and payment can be checked.
- Write native search-oriented copy in each language. Never append an English SEO keyword block to a non-English event.
- Publish only complete language variants. Keep incomplete locales navigable but `noindex`; include only complete locales in hreflang and sitemap.
- Do not publish an image with cropped information, invented branding, unreadable contact text, or random artwork unrelated to the approved poster and venue.
- Do not expose secrets in files, commands, logs, commits, or responses.

## Choose the Workflow

### Event

1. Verify date, venue, services, audience, age, schedule, pricing, affiliate link, and source images.
2. Prepare one language as a pilot when the template or visual treatment is new.
3. Create native title, summary, full body, detailed agenda, programme, 25 FAQs, metadata, image labels, and gallery copy.
4. Recompose the real poster for required aspect ratios; preserve its identity and localize visible text for the event language.
5. Publish the Eventbrite variant through the existing submission path, never through a text-generation API.
6. Create or update the matching site event using the approved Italian event design as the structural baseline.
7. Verify the pilot live. Only then roll out the remaining complete languages.

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

Do not call a publication complete until all applicable checks in [references/verification.md](references/verification.md) pass locally and on the live URL. For a new pattern, show the pilot before batch publication. After deploy, submit the HTTPS sitemap through the existing Search Console property; do not use Google's Indexing API for ordinary pages.
