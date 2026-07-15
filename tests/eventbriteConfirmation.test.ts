import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildEventbriteConfirmationHtml,
  detectEventLocale,
  extractXceedAffiliateUrls,
  validateEventbriteConfirmationCoverage,
} from '../lib/eventbriteConfirmation';
import { enabledLocaleCodes } from '../lib/i18n/locales';

const AFFILIATE = 'https://xceed.me/en/milano/event/example-night/123456/channel/nightlifemilan-1';

test('confirmation copy covers every enabled event locale', () => {
  assert.doesNotThrow(validateEventbriteConfirmationCoverage);
  assert.equal(enabledLocaleCodes.length, 35);
});

test('detectEventLocale reads source and curated markers', () => {
  assert.equal(detectEventLocale('<!-- nlm:src=xc-123456-pt;slug-en=example -->'), 'pt');
  assert.equal(detectEventLocale('<!-- nlm:curated=aperitivi-week-de-2026-07-16 -->'), 'de');
  assert.equal(detectEventLocale('<!-- nlm:curated=aperitivi-it-2026-07-16 -->'), 'it');
  assert.equal(detectEventLocale('<p>No publishing marker</p>'), null);
});

test('extractXceedAffiliateUrls keeps only the Nightlife Milan channel and deduplicates', () => {
  const html = [
    `<a href="${AFFILIATE}">Buy</a>`,
    `<a href="${AFFILIATE}">Buy again</a>`,
    '<a href="https://xceed.me/en/milano/event/other/999/channel/another-promoter">Wrong channel</a>',
    '<a href="https://example.com/channel/nightlifemilan-1">Wrong host</a>',
  ].join('');

  assert.deepEqual(extractXceedAffiliateUrls(html), [AFFILIATE]);
});

test('buildEventbriteConfirmationHtml localizes the warning and includes Xceed and WhatsApp CTAs', () => {
  const it = buildEventbriteConfirmationHtml('it', [AFFILIATE]);
  const pt = buildEventbriteConfirmationHtml('pt', [AFFILIATE]);

  assert.match(it, /Non è un biglietto di ingresso/);
  assert.match(pt, /Não é um bilhete de entrada/);
  assert.ok(it.includes(AFFILIATE));
  assert.ok(it.includes('+39 351 912 7047'));
  assert.ok(it.includes('https://wa.me/393519127047'));
});

test('buildEventbriteConfirmationHtml rejects non-affiliate links', () => {
  assert.throws(
    () => buildEventbriteConfirmationHtml('en', ['https://xceed.me/en/milano/event/example/123/channel/wrong']),
    /Invalid Xceed affiliate URL/,
  );
});
