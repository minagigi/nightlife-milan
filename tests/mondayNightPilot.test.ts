import test from 'node:test';
import assert from 'node:assert/strict';
import { getEventBatchProfile, getEventBatchSlug } from '../lib/eventBatchProfiles';
import { getEventVisualGallery } from '../lib/eventVisualGallery';
import { getLocalizedEventContent } from '../lib/localizedEventContent';
import { buildMondayNightEventbritePayloads } from '../lib/mondayNightEventbrite';
import {
  MONDAY_NIGHT_AFFILIATE_URL,
  MONDAY_NIGHT_CANONICAL_SLUG,
  MONDAY_NIGHT_IT_SLUG,
  MONDAY_NIGHT_PHONE,
} from '../lib/weeklyJuly20Pilot';

const media = [
  'https://img.evbuc.com/poster',
  'https://img.evbuc.com/arrival',
  'https://img.evbuc.com/aperitivo',
  'https://img.evbuc.com/lounge',
  'https://img.evbuc.com/buffet',
] as const;

test('Monday Night site profile is limited to native English and Italian', () => {
  const profile = getEventBatchProfile(MONDAY_NIGHT_CANONICAL_SLUG);
  assert.ok(profile);
  assert.deepEqual(profile.siteLocales, ['en', 'it']);
  assert.deepEqual(profile.indexedLocales, ['en', 'it']);
  assert.equal(getEventBatchSlug(profile, 'en'), MONDAY_NIGHT_CANONICAL_SLUG);
  assert.equal(getEventBatchSlug(profile, 'it'), MONDAY_NIGHT_IT_SLUG);
  assert.equal(profile.affiliateUrl, MONDAY_NIGHT_AFFILIATE_URL);
  assert.equal(profile.minAge, 21);
});

for (const locale of ['en', 'it'] as const) {
  test(`Monday Night ${locale} content and visuals are complete`, () => {
    const content = getLocalizedEventContent(MONDAY_NIGHT_CANONICAL_SLUG, locale);
    assert.ok(content);
    assert.equal(content.faqs.length, 25);
    assert.equal(content.affiliateUrl, MONDAY_NIGHT_AFFILIATE_URL);
    assert.ok(content.bookingIntro?.includes(MONDAY_NIGHT_PHONE));
    assert.equal(content.sections.length, 4);
    assert.equal(content.programme.length, 3);
    const gallery = getEventVisualGallery(MONDAY_NIGHT_CANONICAL_SLUG, locale);
    assert.ok(gallery?.hero);
    assert.equal(gallery.hero.aspect, 'landscape');
    assert.equal(gallery.images.length, 5);
    assert.ok(gallery.images.every((image) => image.aspect === 'five-four'));
  });

  test(`Monday Night ${locale} builds ten Eventbrite variants`, () => {
    const payloads = buildMondayNightEventbritePayloads(locale, media);
    assert.equal(payloads.length, 10);
    assert.equal(new Set(payloads.map((payload) => payload.marker)).size, 10);
    assert.equal(new Set(payloads.map((payload) => payload.title)).size, 10);
    for (const payload of payloads) {
      assert.ok(payload.title.length <= 75);
      assert.ok(payload.summary.length <= 140);
      assert.equal((payload.descriptionHtml.match(/data-event-faq="true"/g) || []).length, 25);
      assert.equal((payload.descriptionHtml.match(/<img /g) || []).length, 5);
      assert.ok(payload.descriptionHtml.includes(MONDAY_NIGHT_AFFILIATE_URL));
      assert.ok(payload.ticket.description.includes(MONDAY_NIGHT_AFFILIATE_URL));
      assert.ok(payload.descriptionHtml.indexOf(locale === 'it' ? 'Ricerche utili per prenotare' : 'Useful booking searches')
        > payload.descriptionHtml.indexOf(locale === 'it' ? 'Domande frequenti' : 'Frequently asked questions'));
    }
  });
}

