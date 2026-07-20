import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  EVENT_BATCH_FAQ_ANSWER_LIMIT,
  EVENT_BATCH_FAQ_COUNT,
  EVENT_BATCH_PHONE,
  EVENT_BATCH_SUMMARY_LIMIT,
  getBatchLocalizedEventContent,
  interpolateEventBatchTemplate,
  validateBatchLocalizedEventContent,
  validateEventLocalePack,
} from '../lib/eventBatchContent';
import { localizedSquarePosterUrl, renderBatchEventbriteHtml } from '../lib/eventBatchEventbrite';
import { EVENT_LOCALE_PACKS_ALL, validateEventLocalePackCoverage } from '../lib/eventLocalePacks';
import { EVENT_BATCH_PROFILES } from '../lib/eventBatchProfiles';
import { enabledLocaleCodes } from '../lib/i18n/locales';
import { getEventVisualGallery } from '../lib/eventVisualGallery';
import { BAD_BUNNY_ARIA_BASE_ID, getBadBunnyAriaImagePath } from '../lib/badBunnyAria';

test('event batch contains exactly eleven unique physical-event profiles', () => {
  assert.equal(EVENT_BATCH_PROFILES.length, 11);
  assert.equal(new Set(EVENT_BATCH_PROFILES.map((profile) => profile.baseId)).size, 11);
  assert.equal(new Set(EVENT_BATCH_PROFILES.map((profile) => profile.canonicalSlug)).size, 11);
  for (const profile of EVENT_BATCH_PROFILES) {
    assert.match(profile.eventbriteIds!.en, /^\d+$/);
    assert.match(profile.eventbriteIds!.it, /^\d+$/);
    assert.match(profile.posterUrl, /^https:\/\//);
    assert.match(profile.affiliateUrl, /^https:\/\//);
    assert.equal(profile.venueImages.length, 4);
  }
});

test('all 35 locale packs expose complete localized templates', () => {
  validateEventLocalePackCoverage();
  assert.equal(enabledLocaleCodes.length, 35);
  assert.equal(Object.keys(EVENT_LOCALE_PACKS_ALL).length, enabledLocaleCodes.length);
  for (const pack of Object.values(EVENT_LOCALE_PACKS_ALL)) {
    validateEventLocalePack(pack);
    assert.equal(pack.faqs.length, EVENT_BATCH_FAQ_COUNT);
    assert.equal(pack.seoKeywords.length, 25);
    assert.equal(pack.gallery.moodTitles.length, 4);
    assert.equal(pack.gallery.moodAlts.length, 4);
  }
});

test('all 385 event-locale combinations generate complete localized content', () => {
  for (const profile of EVENT_BATCH_PROFILES) {
    for (const locale of enabledLocaleCodes) {
      const content = getBatchLocalizedEventContent(profile.canonicalSlug, locale);
      assert.equal(content.locale, locale);
      assert.equal(content.canonicalSlug, profile.canonicalSlug);
      assert.ok(content.title.startsWith(profile.venue), `${profile.baseId} ${locale} title must be venue first`);
      assert.ok(content.seoSummary.length <= EVENT_BATCH_SUMMARY_LIMIT);
      assert.match(content.seoSummary, /\+39 351 912 7047/);
      assert.equal(content.sections.length, 3);
      assert.equal(content.programme.length, profile.programme.length);
      assert.equal(content.offers.length, profile.offers.length);
      assert.equal(content.faqs.length, EVENT_BATCH_FAQ_COUNT);
      for (const faq of content.faqs) {
        assert.ok(faq.question.length > 0);
        assert.ok(faq.answer.length <= EVENT_BATCH_FAQ_ANSWER_LIMIT);
        assert.doesNotMatch(`${faq.question} ${faq.answer}`, /\{[a-zA-Z][a-zA-Z0-9]*\}/);
      }
    }
  }
});

test('Eventbrite renderer preserves the required image order for all profiles and locales', () => {
  for (const profile of EVENT_BATCH_PROFILES) {
    for (const locale of enabledLocaleCodes) {
      const html = renderBatchEventbriteHtml(profile, locale);
      const imageSources = [...html.matchAll(/<img src="([^"]+)"/g)].map((match) => match[1].replace(/&amp;/g, '&'));
      const expected = [localizedSquarePosterUrl(profile, locale), ...profile.venueImages.map((path) => `https://nightlifemilan.com${path}`)];
      assert.deepEqual(imageSources, expected, `${profile.baseId} ${locale} image order`);
      assert.ok(html.indexOf(expected[0]) < html.indexOf(expected[1]));
      assert.ok(html.includes(`<h2>${EVENT_LOCALE_PACKS_ALL[locale].eventbrite.programmeTitle}</h2>`));
      assert.ok(html.includes(`<h2>${EVENT_LOCALE_PACKS_ALL[locale].eventbrite.offersTitle}</h2>`));
      assert.ok(html.indexOf(EVENT_LOCALE_PACKS_ALL[locale].eventbrite.programmeTitle) < html.indexOf(expected[1]));
      assert.ok(html.indexOf(expected[4]) < html.indexOf(EVENT_LOCALE_PACKS_ALL[locale].eventbrite.offersTitle));
      assert.equal((html.match(/data-event-faq="true"/g) || []).length, EVENT_BATCH_FAQ_COUNT);
      assert.equal(imageSources.length, 5);
      assert.ok(html.includes(`nlm:src=${profile.baseId}-${locale};slug-en=${profile.canonicalSlug}`));

      const gallery = getEventVisualGallery(profile.canonicalSlug, locale);
      if (profile.siteLocales && !profile.siteLocales.includes(locale)) {
        assert.equal(gallery, null);
        continue;
      }
      assert.ok(gallery);
      assert.equal(gallery.images.length, 5);
      const expectedGalleryPoster = profile.baseId === BAD_BUNNY_ARIA_BASE_ID
        ? getBadBunnyAriaImagePath(locale, 'poster')
        : `/api/event-poster/${profile.baseId}/${locale}`;
      assert.equal(gallery.images[0].src, expectedGalleryPoster);
    }
  }
});

test('validators reject missing values, invalid FAQ counts, overlong answers, and non-native SEO labels', () => {
  assert.throws(() => interpolateEventBatchTemplate('{venue} {missing}', { venue: 'Pineta Club' }), /Missing template values: missing/);

  const content = getBatchLocalizedEventContent(EVENT_BATCH_PROFILES[0], 'en');
  assert.throws(() => validateBatchLocalizedEventContent({ ...content, faqs: content.faqs.slice(0, -1) }), /exactly 25 FAQs/);
  assert.throws(() => validateBatchLocalizedEventContent({ ...content, faqs: [{ ...content.faqs[0], answer: 'x'.repeat(EVENT_BATCH_FAQ_ANSWER_LIMIT + 1) }, ...content.faqs.slice(1)] }), /exceeds 300 characters/);
  assert.throws(() => validateEventLocalePack({ ...EVENT_LOCALE_PACKS_ALL.it, eventbrite: { ...EVENT_LOCALE_PACKS_ALL.it.eventbrite, seoLabel: 'SEO keywords' } }), /English SEO label/);
  assert.ok(content.seoSummary.includes(EVENT_BATCH_PHONE));
});
