# Approved Eventbrite Template

Use the live Guè Pequeno pilot `1994392210790` as the structural reference. Re-read it through the API when useful; do not copy its date, prices, images, artist claims, or affiliate URL into another event.

## Content order

1. Native-language title and summary of at most 140 characters.
2. Answer-first lead explaining what, where, and when.
3. Clear bulleted contacts immediately after the lead:
   - exact verified Xceed ticket URL;
   - VIP table route;
   - WhatsApp `+39 351 912 7047`;
   - instruction to send the purchase confirmation on WhatsApp;
   - localized Nightlife Milan guide when one exists.
4. Approved localized poster.
5. Detailed agenda and programme with verified entry times.
6. Dedicated sections for target, dress code, mood, music, venue, and access.
7. Verified offers and prices only.
8. Explicit notice that Eventbrite registration is an information request and not an admission ticket.
9. Four venue-faithful mood images after the programme.
10. Exactly 25 useful, SEO-driven native-language FAQ.
11. Readable commercial SEO closing after the last FAQ.
12. Exactly 10 native commercial-intent keyword permutations after the closing, covering relevant combinations of artist/event, tickets, VIP table, guest list, venue, city, date, music, and nightlife intent.
13. Technical marker only after the SEO block.

Do not print a raw keyword dump labelled `SEO`. Integrate the final block as readable native-language discovery copy. Research each locale independently; never translate one English list mechanically.

## Images

- Recompose the real poster for the 2:1 cover. Preserve the original hierarchy, protected artist/logo treatment, typography, colors, event identity, and localized visible text.
- Use one localized real poster plus four real or venue-faithful body images: five body images total.
- Use 5:4 for body images by default; 1:1 is allowed only when composition remains intact. Never centre-crop panoramic venue photography into a square.
- Reject crops or outpaints that cut or invent focal people, artist/logo text, signage, landmarks, food, hands, furniture, contact details, or event information.
- Set native-language `alt` and `title` text that describes visible pixels only.
- Persist `display:block;width:100%;max-width:100%;height:auto` on every body image and verify live that rendered width equals container width.
- Upload to Eventbrite CDN and verify every CDN URL before inserting it into the description.

## Ticket and confirmation

- Use a localized informational-registration ticket when the external Xceed purchase is required.
- State in ticket description, confirmation page, and confirmation email that Eventbrite registration is not admission and does not grant entry.
- Include only the exact verified Xceed affiliate URL with `channel/nightlifemilan-1`.
- Repeat the WhatsApp purchase-confirmation CTA with `+39 351 912 7047`.
- Verify ticket name, quantity/capacity, sale window, price, currency, visibility, and end date from the current source; never infer them.

## HTML and venue constraints

- Use semantic HTML such as `h2`, `h3`, `p`, `ul`, `li`, `a`, and approved Eventbrite CDN `img` tags.
- Do not use emoji or `<br>` in Eventbrite description HTML.
- Match venue by normalized name plus verified address and postcode.
- Detect the canonical marker before create/update so a rerun cannot duplicate a listing.
