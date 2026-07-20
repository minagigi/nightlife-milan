---
name: eventbrite-nightlife-publishing
description: Create, update, translate, publish, repair, audit, verify, or inspect Eventbrite listings for Nightlife Milan. Use whenever the user mentions Eventbrite, an Eventbrite event/listing/ticket/order-confirmation email, Eventbrite SEO or images, or asks to operate on Eventbrite through its API. Apply the approved Guè Pequeno pilot template to every Nightlife Milan Eventbrite listing and use the browser only for read-only visual verification.
---

# Eventbrite Nightlife Publishing

Apply the approved Nightlife Milan Eventbrite template consistently. Treat the Guè Pequeno pilot `1994392210790` as the structural baseline, but re-read current facts and assets instead of copying event-specific values.

## Start

1. Locate the Nightlife Milan repository and read its `AGENTS.md`.
2. Read the repository and global `nightlife-milan-publishing` skill when available.
3. For creation or mutation, read [references/template.md](references/template.md).
4. For one listing or a batch audit, read [references/audit-checklist.md](references/audit-checklist.md).
5. Discover the current API runner, prepared package, live IDs, and checkpoint. Do not trust historical counts.

## Operating Boundary

- Perform every create, update, refresh, publish, unpublish, ticket, image, venue, order-confirmation, or email mutation through the approved Eventbrite operational API path.
- Use the Eventbrite browser editor only to inspect the public result or obtain user login/authorization. Never press Save or publish through the browser UI.
- Generate and translate copy locally in the active Codex session. Do not call a paid text-generation API.
- Never invent dates, times, artists, prices, capacity, age, dress code, services, availability, addresses, affiliate URLs, or ticket terms.
- Preserve the exact verified Xceed affiliate URL carrying `channel/nightlifemilan-1`.
- Use `+39 351 912 7047` exactly and request purchase confirmation through WhatsApp.
- Keep secrets out of source files, commands, logs, commits, and responses.

## API Workflow

1. Preflight the exact event ID, locale, marker, dates, venue name/address/postcode, source package, affiliate URL, ticket state, and current publication state.
2. Check that no old runner is active. Create a rollback snapshot before mutating a live listing.
3. Validate the entire prepared package locally before the first write.
4. Upload and verify all Eventbrite CDN images before writing description HTML.
5. Write the event fields through the Eventbrite API. Keep description HTML emoji-free and never use `<br>`.
   - Discover existing curated listings from the organization inventory by exact marker; do not assume one stable Eventbrite venue ID, because equivalent verified venues may have multiple IDs.
   - Match venues by normalized name plus street and civic number, then preserve the listing's verified existing venue ID during updates.
   - Update name/summary/logo/venue first and description in a second event API call. Eventbrite rejects summary and description in one payload and may uppercase serialized HTML; readback gates must compare structure case-insensitively without weakening URL, marker, image-count, FAQ, SEO, ticket, or confirmation checks.
6. Create or repair the localized informational registration ticket only from verified terms. Do not present a free Eventbrite registration as admission.
7. Publish only after all hard gates pass. Apply post-publish properties in the order required by the current API implementation.
8. Configure both localized order-confirmation fields with the exact Xceed link, non-admission warning, and WhatsApp purchase-confirmation instruction.
9. Re-read every written field through the API, then verify the public page read-only at mobile and desktop sizes.
10. Record exact live counts, pass/fail evidence, and unresolved event IDs. Never claim completion from planned or historical counts.

## Batch Rule

Validate one approved pilot first. For a batch, process idempotently from a checkpoint, detect duplicate markers/listings before writes, and continue only while every listing passes the same hard gates. Separate `passed`, `repaired`, `failed`, `skipped`, and `duplicate` counts.

## Completion Gate

Do not call a listing complete until the API readback and public visual checks in [references/audit-checklist.md](references/audit-checklist.md) both pass. If any field cannot be updated through the current API path, report the exact blocked field and leave the listing out of the completed count.
