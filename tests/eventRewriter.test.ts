import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  stripEmoji,
  assembleBothDescriptions,
  DESCRIPTION_SAFE_BUDGET,
  slugify,
  type BodyResult,
} from '../lib/eventRewriter';

const EMOJI_RE = /[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]/gu;

test('stripEmoji: removes pictographic emoji but keeps normal text', () => {
  const withEmoji = 'Saturday night 🎉 at Aria Club 🔥 - doors at 23:00 ➡️';
  const cleaned = stripEmoji(withEmoji);
  assert.ok(!EMOJI_RE.test(cleaned), 'no emoji code points should remain');
  assert.ok(cleaned.includes('Saturday night'));
  assert.ok(cleaned.includes('Aria Club'));
  assert.ok(cleaned.includes('doors at 23:00'));
});

test('stripEmoji: collapses the extra whitespace left behind by a removed emoji', () => {
  const cleaned = stripEmoji('hello 🎉 world');
  assert.equal(cleaned, 'hello world');
});

function buildBody(overrides: Partial<BodyResult> = {}): BodyResult {
  return {
    titleEn: 'Saturday Night @ Aria Club - Saturday Jul 11 2026',
    titleIt: 'Sabato Sera @ Aria Club - Sabato 11 Lug 2026',
    summaryEn: 'Saturday night at Aria Club, Jul 11 2026. {{WHATSAPP}}',
    summaryIt: 'Sabato sera all’Aria Club, 11 lug 2026. {{WHATSAPP}}',
    hook: 'An insider night at Aria Club 🎉 with a real dance floor.',
    hookIt: 'Una serata insider all’Aria Club 🎉 con una vera pista da ballo.',
    sections: [
      { emoji: '🎵', title: 'The Music', titleIt: 'La Musica', body: 'House and techno all night 🔥.', bodyIt: 'House e techno tutta la notte 🔥.' },
    ],
    programme: [
      { start: '23:00', end: '02:00', title: 'Main floor opens', titleIt: 'Apertura pista principale' },
    ],
    seoTags: ['milano nightlife', 'aria club milano'],
    seoTagsIt: ['discoteche milano', 'aria club milano'],
    ebTags: ['milan_nightlife'],
    imageAltEn: 'Aria Club Milan Saturday night',
    imageAltIt: 'Aria Club Milano sabato sera',
    imageSlug: 'aria-club-saturday',
    ...overrides,
  };
}

function buildFaq(count: number, answerLength: number) {
  return Array.from({ length: count }, (_, i) => ({
    question: `Question ${i} about Aria Club Saturday`,
    questionIt: `Domanda ${i} su Aria Club sabato`,
    answer: `Answer ${i} `.repeat(Math.ceil(answerLength / 10)).slice(0, answerLength),
    answerIt: `Risposta ${i} `.repeat(Math.ceil(answerLength / 10)).slice(0, answerLength),
  }));
}

test('assembleBothDescriptions: output has no emoji, contains the marker, and respects DESCRIPTION_SAFE_BUDGET', () => {
  const body = buildBody();
  const faq = buildFaq(5, 100);
  const { descriptionEn, descriptionIt } = assembleBothDescriptions(body, faq, 'aria-club-saturday-2026-07-11', '237143');

  for (const [lang, desc] of [['en', descriptionEn], ['it', descriptionIt]] as const) {
    assert.ok(!EMOJI_RE.test(desc), `no emoji allowed in Eventbrite description (${lang})`);
    assert.ok(desc.includes(`<!-- nlm:src=237143-${lang};slug-en=aria-club-saturday-2026-07-11 -->`), `marker must be present (${lang})`);
    assert.ok(desc.length <= DESCRIPTION_SAFE_BUDGET, `description must respect DESCRIPTION_SAFE_BUDGET (${lang}): got ${desc.length}`);
  }
});

test('assembleBothDescriptions: truncates FAQ (never the hook/contacts/marker) when the full payload would exceed the budget', () => {
  const body = buildBody();
  // 25 FAQ entries with long answers: fixed blocks + all 25 would comfortably
  // exceed DESCRIPTION_SAFE_BUDGET, forcing the tail-truncation logic.
  const faq = buildFaq(25, 900);
  const { descriptionEn } = assembleBothDescriptions(body, faq, 'aria-club-saturday-2026-07-11', '237143');

  assert.ok(descriptionEn.length <= DESCRIPTION_SAFE_BUDGET, 'final description must fit the budget after truncation');
  // The hook, contacts and marker are non-negotiable and must always survive.
  assert.ok(descriptionEn.includes('An insider night at Aria Club'));
  assert.ok(descriptionEn.includes('{{WHATSAPP}}') || descriptionEn.includes('WhatsApp'));
  assert.ok(descriptionEn.includes('<!-- nlm:src=237143-en;slug-en=aria-club-saturday-2026-07-11 -->'));
  // At least one FAQ must survive, but not all 25 (truncation must have happened).
  const faqBlockCount = (descriptionEn.match(/<h3>/g) || []).length;
  assert.ok(faqBlockCount >= 1, 'at least one FAQ must be included');
  assert.ok(faqBlockCount < 25, 'truncation must have dropped some FAQ entries given the oversized input');
});

test('slugify: lowercases, strips accents/punctuation, and hyphenates', () => {
  assert.equal(slugify('Aria Club - Sabato Sera!'), 'aria-club-sabato-sera');
  assert.equal(slugify('Città di Milano'), 'citta-di-milano');
  assert.equal(slugify('  multiple   spaces  '), 'multiple-spaces');
});
