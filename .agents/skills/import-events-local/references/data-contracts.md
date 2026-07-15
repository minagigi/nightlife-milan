# Data contracts — types, CLI flags, response shapes

Quick-reference cheat sheet for the local pipeline's data shapes, extracted
from the actual source. If anything here ever looks stale, the `.ts` file
cited above each block is the source of truth — this file is a navigation
aid, not a spec.

## Candidate objects (from Step 0 scout)

### `XceedEvent` (source: `lib/xceedScout.ts`)

```ts
{
  xceedId: string;
  slug: string;
  publicUrl: string;
  affiliateUrl: string;
  venueId: string;
  name: string;
  startISO: string;       // already true UTC — use as-is, never re-offset
  endISO?: string;
  ageRange?: string;
  description: string;
  dressCode?: string;
  doorsOpen?: string;     // "HH:MM" UTC time-of-day, not a date
  offers: XceedOffer[];
  imageUrl?: string;
  genres: string[];
}
```

### `ScoutedEvent` (source: `lib/eventScout.ts`)

```ts
{
  ebId: string;
  url: string;
  rawTitle: string;
  rawDescription: string;
  dateISO: string;
  endISO?: string;
  venueId: string;
  rawVenueName: string;
  rawOrganizer: string;   // feed into knownOrganizers, see Step 2
  entryPrice: number;
  currency: string;
  genreHint?: string;
  posterUrl?: string;
}
```

## `BodyResult` (hand-written in Step 2, source: `lib/eventRewriter.ts`)

```ts
{
  titleEn: string; titleIt: string;
  summaryEn: string; summaryIt: string;
  hook: string; hookIt: string;
  sections: { emoji: string; title: string; titleIt: string; body: string; bodyIt: string }[];
  programme: { start: string; end?: string; title: string; titleIt: string }[];
  seoTags: string[]; seoTagsIt: string[]; ebTags: string[];
  imageAltEn: string; imageAltIt: string; imageSlug: string;
}
```

`BODY_REQUIRED` — the exact keys `isBodyMissing()` checks (undefined / null /
empty-string / empty-array on ANY of these fails validation, same in
`prepare-event.ts` and the server):

```
titleEn, titleIt, summaryEn, summaryIt, hook, hookIt, sections, programme,
seoTags, seoTagsIt, ebTags, imageAltEn, imageAltIt, imageSlug
```

## `FaqResult` (hand-written in Step 2)

```ts
{ faqLong: { question: string; questionIt: string; answer: string; answerIt: string }[] }
```

`prepare-event.ts` throws if `faqLong.length < 15`. Target 25 like production
— don't treat 15 as "good enough", that's just where the hard failure kicks in.

## `RewrittenEvent` (output of Step 4, input to Step 5)

```ts
{
  titleEn, titleIt: string;             // clamped to 75 chars
  summaryEn, summaryIt: string;         // clamped to 140 chars
  hook, hookIt: string;
  sections: BodyResult['sections'];
  programme: BodyResult['programme'];
  faqLong: FaqResult['faqLong'];        // sliced to 25
  seoTags, seoTagsIt: string[];         // sliced to 24
  ebTags: string[];                     // sliced to 18
  imageAltEn, imageAltIt: string;       // clamped to 125 chars
  imageSlug: string;
  slugEn: string;                       // canonical site slug, both /events/ and /it/events/
  descriptionEn, descriptionIt: string; // full assembled Eventbrite description, sanitized
  needsReview: boolean;                 // must be false to publish
  debugError?: string;
}
```

## Script CLI flags

`scripts/scout-xceed.ts`
| Flag | Default | Notes |
|---|---|---|
| `--days N` | `7` | scout window |
| `--source xceed\|scout` | `xceed` | `xceed` = 3 Ambassador venues (Justme/Aria/Pineta) via `scoutXceedEvents()`. `scout` = the 15 non-Xceed venues via `scoutThirdPartyEvents()` |

`scripts/prepare-event.ts`
| Flag | Required | Notes |
|---|---|---|
| `--in file.json` | no (else stdin) | `{ source, candidate, body, faq, knownOrganizers? }` |
| `--out file.json` | no (else stdout) | writes the `RewrittenEvent` |

`scripts/publish-event.ts`
| Flag | Required | Default |
|---|---|---|
| `--candidate file.json` | yes | — |
| `--rewritten file.json` | yes | — |
| `--poster file.jpg` | yes | — |
| `--poster-content-type` | no | `image/jpeg` |
| `--poster-source` | no | `poster-clean` |
| `--site` | no | `https://nightlifemilan.com` |

`CRON_SECRET` must be set as an inline env var on the same command line —
the script throws immediately if it's missing.

## `POST /api/events/publish-prepared` (called by `publish-event.ts`)

Request body: `{ source, candidate, rewritten, posterBase64, posterContentType, posterFilename, posterSource, langsToPublish? }`.

Validates (and rejects with 400 before touching any secret-backed system if
any of these fail): `source`/`candidate`/`rewritten` present,
`rewritten.needsReview === false`, `descriptionEn`/`descriptionIt`/`slugEn`
non-empty, `posterBase64`/`posterContentType` present.

Response: `{ ok, published: [...], skipped: [...], ranAt }`. Each `published`
entry has `{ title, lang, url, imageSource?, sitePageUrl?, sitePageLive?,
indexed?, blobWritten? }` — **there is no `ebEventId` field**, the Eventbrite
event URL is in `url`. `skipped` entries are `{ title, reason }`.
`langsToPublish` is always recomputed server-side from the live ledger
(`missingLangsForXceedCandidate`/`missingLangsForCandidate`) regardless of
what the client sent — dedupe is authoritative on the server.

## `GET /api/events/import-xceed?dryRun=1...` (Step 1)

Query params: `dryRun=1` (skip publish + blob write only — the AI rewrite
still runs for up to `max` new candidates), `force=1` (bypass the 36h
`MANUAL_RUN_GRACE_HOURS` guard), `max=N` (cap on candidates processed this
call, default 3), `days=N` (scout window, default 7).

Response: `{ ok, dryRun, scouted, new, published, skipped, errors,
geminiKeyPresent, anthropicKeyPresent, blobTokenPresent, ranAt }`. `scouted`
and `new` are **counts**, not candidate lists. `published`/`skipped` only
cover the (at most `max`) candidates actually processed this call, and in
dry-run mode `published[].url` is a placeholder string `"[dry-run] {title}"`
rather than a real Eventbrite URL.

## Marker format (written into the assembled description, both sources)

```
<!-- nlm:src={ebIdBase}-{lang};slug-en={slugEn} -->
```

- Xceed source: `ebIdBase = xc-{candidate.xceedId}` → e.g. `nlm:src=xc-12345-en;slug-en=...`
- Scout source: `ebIdBase = candidate.ebId` (no `xc-` prefix) → e.g. `nlm:src={ebId}-it;slug-en=...`

## Eventbrite locale mapping

`en` → `en_US`, `it` → `it_IT` (`LOCALE` in `lib/eventPublisher.ts`). Verify
both on the published events, not just the language of the copy.
