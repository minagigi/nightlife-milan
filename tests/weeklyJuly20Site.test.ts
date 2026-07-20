import assert from 'node:assert/strict';
import test from 'node:test';
import { SITE_ONLY_EVENT_PROFILES, getEventBatchSlug } from '../lib/eventBatchProfiles';
import { getEventVisualGallery } from '../lib/eventVisualGallery';
import { getLocalizedEventContent } from '../lib/localizedEventContent';
import { WEEKLY_JULY20_BATCH_EVENTS } from '../lib/weeklyJuly20Batch';
import { WEEKLY_JULY20_SITE_PROFILES } from '../lib/weeklyJuly20Site';
import { enabledLocaleCodes } from '../lib/i18n/locales';
import { GUE_JUST_ME_EDITORIAL_COPY } from '../lib/gueJustMeEditorialCopy';

test('weekly July 20 site profiles cover the nine remaining valid events in every enabled locale', () => {
  assert.equal(WEEKLY_JULY20_SITE_PROFILES.length, 9);
  assert.deepEqual(
    WEEKLY_JULY20_SITE_PROFILES.map((profile) => profile.baseId),
    WEEKLY_JULY20_BATCH_EVENTS.map((event) => `nlm-${event.eventKey}`),
  );
  assert.ok(WEEKLY_JULY20_SITE_PROFILES.every((profile) => !/gue|bad-bunny/i.test(profile.baseId)));
  assert.ok(WEEKLY_JULY20_SITE_PROFILES.every((profile) => profile.siteLocales === enabledLocaleCodes));
  assert.ok(WEEKLY_JULY20_SITE_PROFILES.every((profile) => profile.indexedLocales === enabledLocaleCodes));
  for (const profile of WEEKLY_JULY20_SITE_PROFILES) {
    assert.ok(SITE_ONLY_EVENT_PROFILES.includes(profile));
    assert.equal(profile.eventbriteIds, undefined);
    assert.equal(profile.affiliateUrl.includes('/channel/nightlifemilan-1'), true);
  }
});

test('weekly July 20 site slugs, Guè-style content structure and galleries are complete in every locale', () => {
  const seen = new Set<string>();
  for (const profile of WEEKLY_JULY20_SITE_PROFILES) {
    for (const locale of enabledLocaleCodes) {
      const slug = getEventBatchSlug(profile, locale);
      assert.equal(seen.has(`${locale}:${slug}`), false, `${locale}:${slug} duplicated`);
      seen.add(`${locale}:${slug}`);
      const content = getLocalizedEventContent(slug, locale);
      assert.ok(content, `${locale}:${slug} missing localized content`);
      assert.equal(content.locale, locale);
      assert.equal(content.faqs.length, 25);
      assert.equal(content.affiliateUrl, profile.affiliateUrl);
      assert.equal(content.leadPosterAfterBooking, true);
      assert.equal(content.programmeBeforeSections, true);
      assert.ok(content.answerFirst, `${locale}:${slug} missing answer-first lead`);
      assert.ok(content.bookingIntro, `${locale}:${slug} missing booking instructions`);
      assert.match(content.bookingIntro || '', /\+39 351 912 7047/);
      assert.ok((content.metaTitle?.length || 0) <= 62, `${locale}:${slug} meta title exceeds limit`);
      assert.ok((content.metaDescription?.length || 0) <= 158, `${locale}:${slug} meta description exceeds limit`);
      assert.equal(content.sections.length, 4, `${locale}:${slug} needs target, dress, mood and music sections`);
      const headings = GUE_JUST_ME_EDITORIAL_COPY[locale].headings;
      assert.deepEqual(content.sections.map((section) => section.title), [
        headings.target,
        headings.dressCode,
        headings.mood,
        headings.music,
      ]);
      assert.ok(content.sections.every((section) => section.body.trim().length > 0));

      const gallery = getEventVisualGallery(slug, locale);
      assert.ok(gallery, `${locale}:${slug} missing gallery`);
      const assetLocale = locale === 'it' ? 'it' : 'en';
      if (locale === 'en' || locale === 'it') {
        assert.ok(gallery.hero?.src.endsWith(`${assetLocale}-cover-2x1-v3.png`));
        assert.ok(gallery.images[0].src.endsWith(`${assetLocale}-poster-5x4-v3.png`));
      } else {
        assert.equal(gallery.hero?.src, `/api/event-poster/${profile.baseId}/${locale}?format=cover`);
        assert.equal(gallery.images[0].src, `/api/event-poster/${profile.baseId}/${locale}?format=poster`);
      }
      assert.equal(gallery.images.length, 5);
      assert.ok(gallery.images.every((image) => image.aspect === 'five-four'));
      assert.ok(gallery.images.slice(1).every((image) => image.src.endsWith('-5x4-v3.png')));
      assert.ok(gallery.images.every((image) => !/\{(?:event|venue)\}/.test(`${image.title} ${image.alt}`)));
    }
  }
  assert.equal(seen.size, WEEKLY_JULY20_SITE_PROFILES.length * enabledLocaleCodes.length);
});
