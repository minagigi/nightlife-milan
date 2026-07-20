# Eventbrite Audit Checklist

Audit current live state through the API; use the public page only for read-only rendering checks. Record the event ID and locale for every failure.

## Inventory and identity

- Count current target listings from live Eventbrite data, not a historical manifest alone.
- Confirm canonical marker uniqueness and detect duplicate listings.
- Confirm locale, title, summary length, date/time/timezone, venue name/address/postcode, status, and public URL.
- Confirm the exact verified Xceed affiliate link remains unchanged.

## Body and SEO

- Confirm answer-first lead, bulleted contacts, poster placement, agenda, programme, target, dress code, mood, music, venue/access, and non-admission notice.
- Confirm exactly 25 FAQ.
- Confirm the commercial SEO closing appears after FAQ 25.
- Confirm exactly 10 native commercial-intent keyword permutations appear after the closing and before the technical marker.
- Reject English keyword blocks inside non-English listings and malformed/truncated HTML.
- Confirm no emoji and no `<br>` in description HTML.

## Media

- Confirm a valid 2:1 cover and five body images.
- Confirm the first body image is the localized real poster and the next four are event/venue-faithful mood images.
- Confirm body sources are 5:4 or approved 1:1, with no damaged crop.
- Confirm Eventbrite CDN URLs, native `alt`/`title`, and responsive inline styles.
- On the public page, verify full-width rendering without clipping on mobile and desktop.

## Ticket and buyer messaging

- Confirm the intended localized informational ticket exists exactly once.
- Confirm ticket price/type, capacity, sale dates, visibility, and description match verified facts.
- Confirm ticket and both order-confirmation fields state that Eventbrite registration is not admission.
- Confirm both confirmation fields contain the exact Xceed affiliate URL and the WhatsApp purchase-confirmation instruction.

## Reporting

Return totals for `target`, `passed`, `repaired`, `failed`, `skipped`, and `duplicates`. Include a machine-readable failure list with event ID, locale, failed gate, observed value, expected rule, and repair status. Run a second API readback after repairs and count only the second-pass result as complete.
