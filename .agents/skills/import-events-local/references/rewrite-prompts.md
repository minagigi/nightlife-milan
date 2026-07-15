# Rewrite prompts — condensed cheat sheet

This is a quick-recall summary of `BODY_SYSTEM_PROMPT` and `FAQ_SYSTEM_PROMPT`
in `lib/eventRewriter.ts`. **Always open the actual file for the exact
wording before writing a candidate's copy** — this cheat sheet exists so you
don't have to re-read the full prompt text mid-batch, not to replace it. If
this file and `lib/eventRewriter.ts` ever disagree, the `.ts` file wins.

## Voice (both languages, both prompts)

Insider, exclusive, confident, never try-hard. Specific over generic. No
exclamation marks. No vague attribution.

## Banned words

English: stunning, amazing, ultimate, epic, iconic, unforgettable, vibrant,
elevate, dive into, delve into, journey, tapestry, testament, boasts,
seamless.

Italian: imperdibile, esclusivo (if repeated everywhere), da non perdere,
location, mozzafiato, nel cuore di, un'esperienza unica.

## Anti-AI-tell rules (must read like a Milan insider wrote it by hand)

- No "rule of three" list padding — one concrete detail beats three vague ones.
- No em-dash chains — max one em-dash per paragraph, prefer periods.
- No vague attribution ("known for" / "conosciuto per") — state the concrete
  fact (address, price, dress code, timing).
- No filler transitions ("in the heart of" / "nel cuore di", "look no further").
- Vary sentence length (burstiness). Prefer active voice. No hedging.

## Rebrand rules (source is a third-party promoter listing, not us)

- Remove any mention of promoters, agencies, other phone numbers, handles,
  third-party sites. The only brand is "Nightlife Milan". The only contact is
  the literal placeholder `{{WHATSAPP}}` — never invent a phone number.
- The venue name is not a third-party brand — keep it.
- Keep factual data (date, time, venue, music, price) exactly as given. Never
  invent details, DJ names, or experiences not present in the source.

## Bilingual rule (permanent — applies to every field with an "It" counterpart)

The Italian field is a genuine, independently-written Italian version
targeting native Italian search intent and keywords (e.g. "cosa fare a
milano sabato sera", "discoteche milano", "tavoli vip milano", "aperitivo
milano") — **not a literal translation** of the English. Same facts, same
voice, own SEO logic per language. See also memory
`nightlife-bilingual-seo-always`.

## BodyResult output shape (produce ONLY this JSON, no markdown, no prose)

```json
{
  "titleEn": "max 75 chars. TITLE ORDER RULE (2026-07-13): most people search by VENUE first, not by generic party names ('Friday Night', 'University Party'...). DEFAULT: venue FIRST — '[Venue] - [Experience] - [Weekday] [Month Day] [Year]'. Only put the experience/guest first ('[Experience] @ [Venue] - ...') if the source names a genuinely internationally-recognizable DJ/artist — a generic local guest name does NOT qualify.",
  "titleIt": "max 75 char, stesso criterio: default locale-prima, evento-prima solo con guest davvero noto a livello internazionale.",
  "summaryEn": "max 140 chars, with date + venue + {{WHATSAPP}}",
  "summaryIt": "max 140 caratteri, data + venue + {{WHATSAPP}}, in italiano",
  "hook": "3-5 sentences, the experience in a nutshell, with proper nouns",
  "hookIt": "3-5 frasi, italiano nativo (non traduzione letterale)",
  "sections": [{"emoji": "🗼", "title": "...", "titleIt": "...", "body": "1-2 paragraphs, only real details", "bodyIt": "..."}],
  "programme": [{"start": "19:30", "end": "22:00", "title": "...", "titleIt": "..."}],
  "seoTags": ["24 lowercase English SEO keywords"],
  "seoTagsIt": ["24 keyword italiane REALI di ricerca, non traduzioni"],
  "ebTags": ["18 snake_case tags"],
  "imageAltEn": "SEO alt text max 125 chars",
  "imageAltIt": "alt text SEO max 125 caratteri",
  "imageSlug": "ascii-lowercase-hyphenated slug"
}
```

`sections[].emoji` is the one field where an emoji belongs — it's rendered
on the site page only (see "Emoji handling" below).

## FaqResult — 25 entries, both languages

Each answer: 50-70 words, keyword-rich, repeats the full date and venue name
(deliberate SEO repetition). Cover these themes across the 25: night theme,
location + transport, ticket link, aperitivo price, special-experience
timing, club price, VIP table booking, table options, dinner, dress code,
age policy, music, refunds, public transport, "Eventbrite is not a ticket"
disclaimer, what the ticket includes, opening hours, VIP benefits, DJ,
special experience, table drink policy, parking, concierge contact,
birthdays/groups, why choose this venue.

Contact placeholder: `{{WHATSAPP}}` wherever a phone/contact belongs — never
invent a number. Never invent prices, DJ names, or details not given.

```json
{"faqLong": [{"question": "...", "questionIt": "...", "answer": "...", "answerIt": "..."}, "... 25 items"]}
```

## Emoji handling — don't hand-strip, don't oversprinkle

`prepare-event.ts` → `assembleBothDescriptions()` auto-strips emoji from the
hook, section titles/bodies, programme titles, and every FAQ question/answer
before assembling the Eventbrite description (mirrors production's
`stripEmoji()` — Eventbrite's parser silently truncates everything after the
first emoji anywhere in `description`, a real bug confirmed in production).
You do not need to hand-strip emoji from body copy — the script does it. The
one exception is `sections[].emoji`, which is kept as-is because it's only
ever rendered on the site page, never in the Eventbrite description. Don't
use this auto-strip as license to sprinkle emoji through hook/section/FAQ
text anyway — write clean prose; the site copy should read the same whether
or not the strip runs.
