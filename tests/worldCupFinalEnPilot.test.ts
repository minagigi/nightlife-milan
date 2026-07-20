import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import sharp from 'sharp';
import { enabledLocaleCodes } from '../lib/i18n/locales';
import { getEventBatchProfile } from '../lib/eventBatchProfiles';
import { isEventbriteOnlyCuratedListing } from '../lib/eventVisibility';
import { getEventVisualGallery } from '../lib/eventVisualGallery';
import { getLocalizedEventContent, getLocalizedEventSeed } from '../lib/localizedEventContent';
import { GET as getWorldCupEnglishPublishPlan } from '../app/api/events/publish-world-cup-en/route';
import {
  buildWorldCupEventbriteEnPayloads,
  validateWorldCupEventbriteEnPayload,
} from '../lib/worldCupEventbriteEn';
import {
  WORLD_CUP_FINAL_COVER_EN,
  WORLD_CUP_FINAL_EN_SLUG,
  WORLD_CUP_FINAL_EN_URL,
  WORLD_CUP_FINAL_MOOD_IMAGES_EN,
  WORLD_CUP_FINAL_POSTER_EN,
  WORLD_CUP_KEYWORD_EVENTS_EN,
  worldCupFinalEn,
} from '../lib/worldCupFinalEn';
import {
  WORLD_CUP_FINAL_AFFILIATE_URL,
  WORLD_CUP_FINAL_CANONICAL_SLUG,
  WORLD_CUP_FINAL_PHONE,
} from '../lib/worldCupFinalIt';

test('the English World Cup pilot exposes one complete canonical website event', () => {
  const profile = getEventBatchProfile(WORLD_CUP_FINAL_EN_SLUG);
  assert.ok(profile);
  assert.deepEqual(profile.siteLocales, enabledLocaleCodes);
  assert.equal(profile.canonicalSlug, WORLD_CUP_FINAL_CANONICAL_SLUG);
  assert.notEqual(WORLD_CUP_FINAL_EN_SLUG, WORLD_CUP_FINAL_CANONICAL_SLUG);
  assert.equal(WORLD_CUP_FINAL_EN_URL, `https://nightlifemilan.com/events/${WORLD_CUP_FINAL_EN_SLUG}`);
  assert.equal(profile.eventbriteIds, undefined, 'the canonical site profile must not represent any satellite listing');
  assert.equal(getLocalizedEventContent(WORLD_CUP_FINAL_EN_SLUG, 'en'), worldCupFinalEn);
  assert.ok(getLocalizedEventSeed(WORLD_CUP_FINAL_EN_SLUG, 'en'));
});

test('the English canonical content is complete, native and within SEO limits', () => {
  assert.equal(worldCupFinalEn.locale, 'en');
  assert.equal(worldCupFinalEn.sections.length, 4);
  assert.equal(worldCupFinalEn.faqs.length, 25);
  assert.equal(worldCupFinalEn.affiliateUrl, WORLD_CUP_FINAL_AFFILIATE_URL);
  assert.ok(worldCupFinalEn.metaTitle && worldCupFinalEn.metaTitle.length <= 62);
  assert.ok(worldCupFinalEn.metaDescription && worldCupFinalEn.metaDescription.length >= 150 && worldCupFinalEn.metaDescription.length <= 158);
  assert.equal((worldCupFinalEn.metaDescription!.match(new RegExp(WORLD_CUP_FINAL_PHONE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length, 1);
  assert.ok(worldCupFinalEn.seoSummary.length <= 140);
  assert.ok(worldCupFinalEn.faqs.every((faq) => faq.answer.length <= 300));

  const completeText = JSON.stringify(worldCupFinalEn);
  assert.match(completeText, /7:30 PM/);
  assert.match(completeText, /9 PM/);
  assert.match(completeText, /21\+/);
  assert.match(completeText, /long trousers/i);
  assert.match(completeText, /Dress code/i);
  assert.match(completeText, /Target audience/i);
  assert.match(completeText, /Mood:/i);
  assert.match(completeText, /Music after the final/i);
  assert.match(worldCupFinalEn.answerFirst || '', /Spain vs Argentina/);
  assert.match(worldCupFinalEn.bookingIntro || '', /Eventbrite registration is not an admission ticket/);
  assert.equal(worldCupFinalEn.leadPosterAfterBooking, true);
  assert.equal(worldCupFinalEn.programmeBeforeSections, true);
  assert.doesNotMatch(completeText, /6:00 PM/i);
  assert.doesNotMatch(completeText, /stunning|amazing|ultimate|epic|iconic/i);
});

test('the five English search-intent satellites are unique and curated-only', () => {
  const payloads = buildWorldCupEventbriteEnPayloads();
  assert.equal(WORLD_CUP_KEYWORD_EVENTS_EN.length, 5);
  assert.equal(payloads.length, 5);
  assert.equal(new Set(payloads.map((payload) => payload.keyword)).size, 5);
  assert.equal(new Set(payloads.map((payload) => payload.title)).size, 5);
  assert.equal(new Set(payloads.map((payload) => payload.marker)).size, 5);

  for (const payload of payloads) {
    validateWorldCupEventbriteEnPayload(payload);
    assert.equal(payload.lang, 'en');
    assert.equal(payload.canonicalSiteUrl, WORLD_CUP_FINAL_EN_URL);
    assert.equal(payload.affiliateUrl, WORLD_CUP_FINAL_AFFILIATE_URL);
    assert.ok(payload.title.length <= 75);
    assert.ok(payload.summary.length <= 140);
    assert.match(payload.marker, /^nlm:curated=[a-z0-9-]+-en-2026-07-19$/);
    assert.ok(isEventbriteOnlyCuratedListing({ description: { html: payload.descriptionHtml } }));
    assert.equal((payload.descriptionHtml.match(/nightlifemilan\.com\/events\//g) || []).length, 1);
    assert.equal((payload.descriptionHtml.match(/data-event-faq="true"/g) || []).length, 25);
    assert.equal((payload.descriptionHtml.match(/<img /g) || []).length, 5);
    assert.equal((payload.descriptionHtml.match(/alt="[^"]+"/g) || []).length, 5);
    assert.equal((payload.descriptionHtml.match(/title="[^"]+"/g) || []).length, 5);
    assert.equal((payload.descriptionHtml.match(/style="display:block;width:100%;max-width:100%;height:auto"/g) || []).length, 5);
    const contacts = payload.descriptionHtml.indexOf('<h2>Tickets, tables and confirmation</h2>');
    const programme = payload.descriptionHtml.indexOf('<h2>Evening programme</h2>');
    const programmeEnd = payload.descriptionHtml.indexOf('</ul>', programme);
    const imagePositions = [...payload.descriptionHtml.matchAll(/<img /g)].map((match) => match.index);
    assert.ok(contacts < imagePositions[0] && imagePositions[0] < programme);
    assert.ok(imagePositions.slice(1).every((position) => position > programmeEnd));
    assert.ok(payload.descriptionHtml.slice(imagePositions[0], payload.descriptionHtml.indexOf('>', imagePositions[0]) + 1).includes(WORLD_CUP_FINAL_POSTER_EN.alt));
    assert.ok(payload.descriptionHtml.toLocaleLowerCase('en').split(payload.keyword.toLocaleLowerCase('en')).length - 1 >= 3);
    assert.ok(payload.descriptionHtml.length <= 16_000);
    assert.doesNotMatch(payload.descriptionHtml, /<br\s*\/?\s*>/i);
    assert.doesNotMatch(payload.descriptionHtml, /\p{Extended_Pictographic}/u);
    assert.match(payload.orderConfirmation, /not an admission ticket/i);
    assert.match(payload.orderConfirmation, /nightlifemilan-1/);
    assert.match(payload.orderConfirmation, /\+39 351 912 7047/);
  }
});

test('the English publication route is protected and exposes the validated five-listing plan', async () => {
  const previousSecret = process.env.CRON_SECRET;
  process.env.CRON_SECRET = 'world-cup-en-test-secret';
  try {
    const unauthorized = await getWorldCupEnglishPublishPlan(new Request('http://localhost/api/events/publish-world-cup-en'));
    assert.equal(unauthorized.status, 401);

    const authorized = await getWorldCupEnglishPublishPlan(new Request('http://localhost/api/events/publish-world-cup-en', {
      headers: { authorization: 'Bearer world-cup-en-test-secret' },
    }));
    assert.equal(authorized.status, 200);
    const body = await authorized.json();
    assert.equal(body.ok, true);
    assert.equal(body.language, 'en');
    assert.equal(body.count, 5);
    assert.equal(body.bodyImageCount, 5);
    assert.equal(body.canonicalSiteUrl, WORLD_CUP_FINAL_EN_URL);
    assert.equal(new Set(body.listings.map((listing: { marker: string }) => listing.marker)).size, 5);
  } finally {
    if (previousSecret === undefined) delete process.env.CRON_SECRET;
    else process.env.CRON_SECRET = previousSecret;
  }
});

test('English poster paths, dimensions and literal image metadata match the localized assets', async () => {
  assert.equal(WORLD_CUP_FINAL_COVER_EN.src, '/images/events/generated/just-me-world-cup-final-cover-2x1-en-v1.jpg');
  assert.equal(WORLD_CUP_FINAL_POSTER_EN.src, '/images/events/generated/just-me-world-cup-final-poster-5x4-en-v1.jpg');
  assert.equal(WORLD_CUP_FINAL_COVER_EN.width / WORLD_CUP_FINAL_COVER_EN.height, 2);
  assert.equal(WORLD_CUP_FINAL_POSTER_EN.width / WORLD_CUP_FINAL_POSTER_EN.height, 1.25);
  assert.ok(WORLD_CUP_FINAL_MOOD_IMAGES_EN.every((image) => image.width / image.height === 1.25));
  assert.ok(WORLD_CUP_FINAL_MOOD_IMAGES_EN.every((image) => /just-me-finale-coppa-mondo-.+-5x4-it-v5\.jpg$/.test(image.src)));

  for (const asset of [WORLD_CUP_FINAL_COVER_EN, WORLD_CUP_FINAL_POSTER_EN, ...WORLD_CUP_FINAL_MOOD_IMAGES_EN]) {
    const absolute = path.join(process.cwd(), 'public', asset.src.replace(/^\/images\//, 'images/'));
    await access(absolute);
    const metadata = await sharp(absolute).metadata();
    assert.equal(metadata.format, 'jpeg');
    assert.equal(metadata.width, asset.width);
    assert.equal(metadata.height, asset.height);
  }

  const gallery = getEventVisualGallery(WORLD_CUP_FINAL_CANONICAL_SLUG, 'en');
  assert.ok(gallery);
  assert.equal(gallery.hero?.src, WORLD_CUP_FINAL_COVER_EN.src);
  assert.equal(gallery.images.length, 5);
  assert.equal(gallery.images[0].src, WORLD_CUP_FINAL_POSTER_EN.src);
  assert.equal(new Set(gallery.images.map((image) => image.title)).size, 5);
  assert.equal(new Set(gallery.images.map((image) => image.alt)).size, 5);
  assert.ok(gallery.images.every((image) => image.aspect === 'five-four'));
  assert.ok(gallery.images.every((image) => image.title.length > 20 && image.alt.length > 40 && image.description));
});

test('the website keeps 5:4 media uncropped and localizes the English booking block', async () => {
  const [pageSource, gallerySource, publisherSource] = await Promise.all([
    readFile(path.join(process.cwd(), 'app', '[locale]', 'events', '[slug]', 'page.tsx'), 'utf8'),
    readFile(path.join(process.cwd(), 'components', 'EventImageGallery.tsx'), 'utf8'),
    readFile(path.join(process.cwd(), 'app', 'api', 'events', 'publish-world-cup-en', 'route.ts'), 'utf8'),
  ]);
  assert.match(pageSource, /Tickets, admission and WhatsApp/);
  assert.match(pageSource, /Buy on Xceed/);
  assert.match(pageSource, /Confirm on WhatsApp/);
  assert.match(pageSource, /leadPoster\.aspect === 'five-four' \? 'aspect-\[5\/4\]'/);
  assert.match(pageSource, /className="object-contain"/);
  assert.match(pageSource, /const socialImage = visualGallery\?\.hero \|\| visualGallery\?\.images\[0\]/);
  assert.match(pageSource, /eventVisualGallery\?\.hero\?\.alt \|\| eventVisualGallery\?\.images\[0\]\?\.alt/);
  assert.match(gallerySource, /image\.aspect === 'five-four'/);
  assert.match(gallerySource, /'aspect-\[5\/4\]'/);
  assert.match(gallerySource, /className="object-contain/);
  assert.match(publisherSource, /duplicate\?\.status === 'draft'/);
  assert.match(publisherSource, /deleteStaleDraft\(token, duplicate\.id\)/);
  assert.match(publisherSource, /method: 'DELETE'/);
  assert.match(publisherSource, /body\.refreshExisting \? coverMedia : undefined/);
  assert.match(publisherSource, /const needsMedia = body\.refreshExisting \|\| selected\.some/);
  assert.match(publisherSource, /if \(needsMedia\)/);
});
