# Eventbrite localized order confirmations

- Added native order-confirmation copy for all 35 enabled Nightlife Milan event locales.
- Every Eventbrite listing with a verified `xceed.me` URL carrying the `nightlifemilan-1` channel now states that the Eventbrite registration is not an admission ticket.
- The confirmation page and the email/PDF instructions include the exact affiliate URL already present in the listing and the WhatsApp purchase-confirmation CTA at `+39 351 912 7047`.
- New Eventbrite publications configure and verify these fields automatically after publication; failure is reported without republishing an already-live event.
- Migrated and verified 583 future live/started Eventbrite listings: 583 succeeded, 0 skipped, 0 failed.
- Final live samples in Italian, English, Portuguese, and Arabic were re-read successfully from Eventbrite.
- Production commit: `133e99a`.
- Verification: typecheck, lint, 59 tests, production build, live migration verification.
