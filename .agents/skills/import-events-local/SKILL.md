---
name: import-events-local
description: Import events from the Xceed-affiliated venues (Just Me, Aria, Pineta) or the Eventbrite scout while generating every rewrite, translation, FAQ, summary, metadata field, and poster instruction locally in the active Codex session. Use when the user asks to import, prepare, translate, or publish Nightlife Milan events. Never use Anthropic or another paid text-generation API, even when API credit is available; operational APIs are only for source data and final submission. Apply the nightlife-milan-publishing skill as the controlling standard.
---

# Import Events — Local Pipeline (no API cost)

This workflow is subordinate to `nightlife-milan-publishing`. If the two skills
conflict, the newer publishing standard wins. Anthropic-backed import routes are
legacy implementation details and must not be invoked for writing or dry runs.

FASE L (piano `.Codex/plans/2026-07-08-local-pipeline-no-api.md`). Runs the
whole rewrite step in this session (covered by the Max subscription) instead
of a paid `api.anthropic.com` call. The site keeps every secret
(EVENTBRITE_TOKEN, BLOB_READ_WRITE_TOKEN, GOOGLE_INDEXING_CREDENTIALS) —
this session only ever needs `CRON_SECRET`, and only to call
`POST /api/events/publish-prepared`.

## Non-negotiables

- **No Anthropic API under any condition.** Generate all copy and translations
  locally, then use operational endpoints only to submit validated content.

- **`needsReview` applies to me too.** If I can't produce all 25 FAQ or a
  required `BodyResult` field, the event does not get published — same rule
  as the paid pipeline. Never skip a step to save time.
- **Secrets never leave Vercel.** Never put `EVENTBRITE_TOKEN` /
  `BLOB_READ_WRITE_TOKEN` / `GOOGLE_INDEXING_CREDENTIALS` in this session, in
  `.env.local`, or in any script argument. `CRON_SECRET` only, and only as an
  inline env var on the one `publish-event.ts` call — never written to a file.
- **Never hand-edit the assembled output.** If a description/marker/slug is
  wrong, fix the `BodyResult`/`FaqResult` input and re-run `prepare-event.ts`
  — it runs the exact server-side `slugify`/`sanitize`/`assembleBothDescriptions`,
  so a hand edit would silently diverge from what production would have produced.
- **Never touch the 3 legacy live events** (Wednesday Night / VidaLoca /
  White Party, old architecture) through this pipeline — that migration is a
  separate decision with the user.

## Workflow

### Step 0 — Scout (no AI, no secrets)

```bash
npx tsx scripts/scout-xceed.ts --days 7 > /tmp/xceed-candidates.json
```

`--source scout` instead of the default `xceed` targets the 15
Eventbrite-scraped venues instead of the 3 Xceed ones. Pure HTTP against
xceed.me / Eventbrite's public feed — no AI call, no secrets. Flags and
output shape: `references/data-contracts.md`.

### Step 1 — Dedupe without a rewrite route

Compare the local candidate list with the current site and live Eventbrite
records by venue, physical date, and event identity. Do not call
`/api/events/import` or `/api/events/import-xceed`, including with `dryRun=1`:
those legacy routes may execute a paid rewrite before returning.

Treat the server-side ledger check in `publish-prepared` as the final source of
truth. A duplicate must be reported as skipped; never force a second physical
event merely to complete a language variant.

### Step 2 — Write BodyResult + FaqResult by hand, per candidate

Read the exact prompts from `lib/eventRewriter.ts`: `BODY_SYSTEM_PROMPT` and
`FAQ_SYSTEM_PROMPT` — that file is the canonical source. Write the JSON
output **as if I were the model receiving that system prompt** with a user
message built from the candidate:

```
Venue: {meta.name} (zone: ..., locality: ...)
Event date: {startISO}
Official event name / offers / dress code / age / doors / genres (for Xceed)
   — or —
Raw title/description (for scout, needs full rewrite + brand strip)
```

Rules to actually follow (not skim) — full wording and JSON schema in
`references/rewrite-prompts.md`:
- Bilingual fields are genuine independent Italian copy targeting native
  search intent, never a translation of the English (memory
  `nightlife-bilingual-seo-always`).
- No invented facts — prices/DJs/times must come from the candidate data.
- 25 FAQ, every one filled — fewer than 15 throws in `prepare-event.ts`
  (`BODY_REQUIRED`/`faqLong.length < 15` checks, same as the server). Target
  25 like production; don't treat 15 as "good enough".
- `{{WHATSAPP}}` literal placeholder wherever a phone/contact belongs, never
  a real number.
- Anti-AI-tell rules (banned words, no rule-of-three, no em-dash chains) —
  same bar as the paid model, this isn't a "good enough" fallback.
- Emoji: don't hand-strip it from hook/section/FAQ text — `prepare-event.ts`
  auto-strips it before assembling the Eventbrite description (Eventbrite's
  parser truncates everything after the first emoji, a real production bug).
  `sections[].emoji` is the one field that's meant to carry one, since it's
  only ever rendered on the site page. Don't use the auto-strip as license to
  write emoji-heavy body copy anyway.
- Scout source only: pass `knownOrganizers` (see Step 4) = the deduped
  `rawOrganizer` names from this batch, mirroring production's
  `addToBlacklist(scouted.map(s => s.rawOrganizer))` — helps `sanitize()`
  strip third-party promoter names from the hook.

Save the two objects as one JSON file, e.g. `/tmp/wed-body.json`:
```json
{ "titleEn": "...", "titleIt": "...", "...": "...", "imageSlug": "..." }
```
and `/tmp/wed-faq.json`: `{ "faqLong": [ {...} x25 ] }`.

### Step 3 — Poster: rebrand standard completo (me + Magnific, non solo pulizia)

OGNI locandina pubblicata deve avere tutti e 5: formato 16:9 (outpaint, mai
crop), badge "Milan Nightlife — Event Service" in alto a sinistra, telefono
venue → WhatsApp `+39 351 912 7047` 🇬🇧🇮🇹, sito venue → `www.nightlifemilan.com`,
e logo/data/artwork/lineup/servizi/palette del venue MANTENUTI intatti
(memoria `nightlife-poster-rebrand-standard`).

Procedura in breve — dettaglio completo, edge case (persone reali/diritti
d'immagine, fallback testo contatti illeggibile, quale `--poster-source`
usare) in `references/poster-rebrand.md`:
1. Download del poster candidato.
2. **Read the image**, verifica cosa va rimosso/sostituito/esteso.
3. Upload di poster + badge al Magnific MCP.
4. Un prompt `images_generate` con `references` = [poster, badge] che copre
   tutti i 5 punti in un passaggio.
5. **Verifica visiva carattere per carattere** del testo piccolo generato
   (telefono/URL) — se corrotto, non pubblicare così (fallback in
   `references/poster-rebrand.md`).
6. Se il poster è irrecuperabile → fallback a foto reale della venue
   (`lib/venuesData.ts`), badge + fascia contatti comunque applicati.
7. Convert to JPEG (quality ~85), salva localmente, es. `/tmp/wed-poster.jpg`.

### Step 4 — Assemble (pure code, no judgment calls)

```bash
cat << 'EOF' > /tmp/wed-input.json
{
  "source": "xceed",
  "candidate": <paste the one candidate object from Step 0's output>,
  "body": <contents of /tmp/wed-body.json>,
  "faq": <contents of /tmp/wed-faq.json>
}
EOF
npx tsx scripts/prepare-event.ts --in /tmp/wed-input.json --out /tmp/wed-rewritten.json
```

For scout-sourced candidates, add `"knownOrganizers": [...]` (see Step 2).

This runs the exact server-side `slugify`/`sanitize`/`assembleBothDescriptions`
— review the output file: `descriptionEn`/`descriptionIt` should contain the
full gold body, all FAQ, the marker
`<!-- nlm:src=xc-{xceedId}-{lang};slug-en=... -->` (Xceed) or
`<!-- nlm:src={ebId}-{lang};slug-en=... -->` (scout), and (for Xceed) the
affiliate Buy Tickets/Book a Table links. `needsReview` must be `false`; the
script throws before writing output if `BodyResult` is missing a required
field or `faqLong` has fewer than 15 entries — full field list in
`references/data-contracts.md`.

### Step 5 — Publish

```bash
cat << 'EOF' > /tmp/wed-candidate.json
{ "source": "xceed", "candidate": <same candidate object as Step 4> }
EOF
CRON_SECRET=<value from Vercel, one-off, never write to a file> \
  npx tsx scripts/publish-event.ts \
    --candidate /tmp/wed-candidate.json \
    --rewritten /tmp/wed-rewritten.json \
    --poster /tmp/wed-poster.jpg \
    --poster-content-type image/jpeg \
    --poster-source poster-clean
```

Use `--poster-source venue-fallback` instead of the default `poster-clean`
if Step 3.6's venue-photo fallback was used. Never `poster-edited` — that
tag is reserved for production's own Gemini pipeline.

Check the JSON response for every requested complete locale. Each successful
entry must include `url` and `sitePageLive: true`; there is no `ebEventId`
field, because the Eventbrite URL lives in `url`. Anything in `skipped` means a
language failed (`reason` explains why). Do not consider that candidate done
until all requested locales appear in `published`. Do not require or trigger a
Google Indexing API notification for these normal event pages. Full response shape:
`references/data-contracts.md`.

Publishing multiple candidates back to back: the server already sleeps 3s
between the EN and IT publish inside one call — leave a few seconds between
separate `publish-event.ts` calls too, same order of magnitude, to avoid
hammering the Eventbrite API.

### Step 6 — Repeat per candidate, verify batch completion

After the full batch, compare the live site and Eventbrite records with the
candidate list and confirm that the per-candidate ledger response covered all
requested locales. Never re-run a legacy import route as a completion check.
The nightly cron routes will no-op for 36h after any successful
`publish-prepared` call (FASE L2 guard, `MANUAL_RUN_GRACE_HOURS`) — no need
to touch them.

For the first (pilot) candidate of a batch, verify directly on Eventbrite
and the site before trusting the rest of the run: EN event locale `en_US` +
IT event locale `it_IT`, full gold description (all FAQ present, zero
emoji, affiliate links clickable, marker present), ticket types correct,
`music_properties` (age/check-in) populated — that field is written
server-side *after* publish, never before (a draft-time write gets wiped by
the publish call itself), so just confirm it landed rather than trying to
set it yourself. Both site pages (`/events/{slug}` and `/it/events/{slug}`)
live with real bilingual content and the venue's real photo gallery.

## Common mistakes / anti-patterns

- **Calling a legacy import route as a dedupe check.** Even `dryRun=1` may run
  an Anthropic rewrite. Use local/live comparison and the final ledger check.
- **Hand-editing `descriptionEn`/`descriptionIt`/the marker/the slug.**
  Always regenerate via `prepare-event.ts` from a corrected
  `BodyResult`/`FaqResult` — a hand edit silently diverges from what the
  server-side code would have produced and breaks the ledger marker.
- **Publishing with `needsReview: true` or fewer than 15 FAQ.**
  `prepare-event.ts` already throws on this — don't work around the check.
- **Stopping at 15 FAQ because that's where validation kicks in.** The bar is
  25, same as production; 15 is just the hard failure floor.
- **Treating literal translation as the Italian field.** It must be
  independently written for native Italian search intent — see the
  bilingual rule in `references/rewrite-prompts.md`.
- **Hand-stripping emoji from body copy "to be safe".** `prepare-event.ts`
  already does it automatically for the Eventbrite description; don't waste
  effort re-implementing it, and don't sprinkle emoji into hook/section/FAQ
  text just because the strip will catch it.
- **Publishing a poster with illegible contact text** because "it's close
  enough" — the WhatsApp number/URL must be readable character by character;
  regenerate or composite it deterministically instead (`references/poster-rebrand.md`).
- **Using `poster-edited` as the `--poster-source`.** That tag belongs to
  production's automatic Gemini pipeline, not this skill's manual Magnific
  workflow — use `poster-clean` or `venue-fallback`.
- **Putting any secret other than `CRON_SECRET` in this session.** Not even
  temporarily, not even in a script argument that gets cleared later.
- **Reusing this pipeline for the 3 legacy live events.** Out of scope — see
  Non-negotiables.

## Reference files

- `references/data-contracts.md` — exact TS field lists (`XceedEvent`,
  `ScoutedEvent`, `BodyResult`, `FaqResult`, `RewrittenEvent`,
  `BODY_REQUIRED`), every script's CLI flags, the `publish-prepared` and
  dry-run response shapes, the marker format for both sources. Read this
  when assembling a candidate's input JSON or interpreting a response.
- `references/rewrite-prompts.md` — condensed banned-words list, anti-AI-tell
  rules, bilingual rule, the exact `BodyResult`/`FaqResult` JSON schemas, and
  the 25 FAQ themes. Read this before writing copy in Step 2; read
  `lib/eventRewriter.ts` itself for the authoritative wording.
- `references/poster-rebrand.md` — full Step 3 procedure, the real-person/
  image-rights edge case, the illegible-contact-text fallback, and which
  `--poster-source` value to use when. Read this when Step 3 hits anything
  other than the common case.
