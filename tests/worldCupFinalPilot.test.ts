import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import sharp from 'sharp';
import { enabledLocaleCodes } from '../lib/i18n/locales';
import {
  EVENT_BATCH_PROFILES,
  getEventBatchProfile,
  getEventBatchProfileByBase,
  getEventBatchSlug,
  SITE_ONLY_EVENT_PROFILES,
} from '../lib/eventBatchProfiles';
import { isEventbriteOnlyCuratedListing } from '../lib/eventVisibility';
import { eventbriteVenueMatches } from '../lib/eventPublisher';
import { getEventVisualGallery } from '../lib/eventVisualGallery';
import { getLocalizedEventContent, getLocalizedEventSeed } from '../lib/localizedEventContent';
import {
  buildWorldCupEventbriteItPayloads,
  validateWorldCupEventbriteItPayload,
  WORLD_CUP_EVENTBRITE_IT_LIVE_LISTINGS,
  WORLD_CUP_EVENTBRITE_IT_SUPERSEDED_IDS,
} from '../lib/worldCupEventbriteIt';
import {
  WORLD_CUP_FINAL_AFFILIATE_URL,
  WORLD_CUP_FINAL_CANONICAL_SLUG,
  WORLD_CUP_FINAL_COVER_IT,
  WORLD_CUP_FINAL_IT_SLUG,
  WORLD_CUP_FINAL_IT_URL,
  WORLD_CUP_FINAL_MOOD_IMAGES_IT,
  WORLD_CUP_FINAL_PHONE,
  WORLD_CUP_FINAL_POSTER_IT,
  worldCupFinalIt,
} from '../lib/worldCupFinalIt';

test('the World Cup event has one canonical page per complete pilot language and stays separate from Uptown Nights', () => {
  const uptown = getEventBatchProfile('uptown-nights-just-me-sunday-july-19-2026-2026-07-19');
  const worldCup = getEventBatchProfile(WORLD_CUP_FINAL_IT_SLUG);

  assert.equal(EVENT_BATCH_PROFILES.length, 11, 'the 35-locale Eventbrite batch must remain unchanged');
  assert.equal(SITE_ONLY_EVENT_PROFILES.filter((profile) => profile.baseId === 'nlm-world-cup-final-2026').length, 1);
  assert.deepEqual(worldCup?.siteLocales, enabledLocaleCodes);
  assert.equal(getEventBatchSlug(worldCup!, 'it'), WORLD_CUP_FINAL_IT_SLUG);
  assert.equal(uptown?.baseId, 'xc-220784');
  assert.equal(uptown?.eventName.it, 'Uptown Nights');
  assert.equal(uptown?.kind, 'club');
  assert.equal(uptown?.affiliateUrl, 'https://xceed.me/en/milano/event/uptown-nights-73/220784/channel/nightlifemilan-1');
  assert.equal(worldCup?.baseId, 'nlm-world-cup-final-2026');
  assert.equal(worldCup?.eventbriteIds, undefined, 'website-only profiles must not carry placeholder Eventbrite IDs');
  assert.equal(worldCup?.canonicalSlug, WORLD_CUP_FINAL_CANONICAL_SLUG);
  assert.equal(worldCup?.affiliateUrl, 'https://xceed.me/en/milano/event/fifa-2026-final/238627/channel/nightlifemilan-1');
  assert.notEqual(worldCup?.baseId, uptown?.baseId);
  assert.equal(worldCup?.affiliateUrl, WORLD_CUP_FINAL_AFFILIATE_URL);
  assert.notEqual(getEventBatchProfileByBase('xc-220784')?.affiliateUrl, WORLD_CUP_FINAL_AFFILIATE_URL);
  assert.ok(getLocalizedEventContent(WORLD_CUP_FINAL_IT_SLUG, 'en'));
  assert.ok(getLocalizedEventSeed(WORLD_CUP_FINAL_IT_SLUG, 'en'));
  assert.ok(getLocalizedEventContent(WORLD_CUP_FINAL_IT_SLUG, 'it'));
  assert.ok(getLocalizedEventSeed(WORLD_CUP_FINAL_IT_SLUG, 'it'));
});

test('the Italian canonical event has complete SEO, commercial and audience data', () => {
  assert.equal(worldCupFinalIt.sections.length, 4);
  assert.equal(worldCupFinalIt.faqs.length, 25);
  assert.equal(worldCupFinalIt.affiliateUrl, WORLD_CUP_FINAL_AFFILIATE_URL);
  assert.ok(worldCupFinalIt.metaTitle && worldCupFinalIt.metaTitle.length <= 62);
  assert.ok(worldCupFinalIt.metaDescription && worldCupFinalIt.metaDescription.length <= 158);
  assert.equal((worldCupFinalIt.metaDescription!.match(new RegExp(WORLD_CUP_FINAL_PHONE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length, 1);
  assert.ok(worldCupFinalIt.seoSummary.length <= 140);
  assert.ok(worldCupFinalIt.faqs.every((faq) => faq.answer.length <= 300));

  const completeText = JSON.stringify(worldCupFinalIt);
  assert.match(completeText, /19:30/);
  assert.match(completeText, /21:00/);
  assert.match(completeText, /21\+/);
  assert.match(completeText, /pantaloni lunghi/i);
  for (const heading of ['Dress code', 'Target della serata', 'Mood e atmosfera', 'Musica dopo la finale']) {
    assert.match(completeText, new RegExp(heading, 'i'));
  }
  assert.match(worldCupFinalIt.answerFirst || '', /Spagna-Argentina/);
  assert.match(worldCupFinalIt.bookingIntro || '', /Eventbrite non è un biglietto/);
  assert.equal(worldCupFinalIt.leadPosterAfterBooking, true);
  assert.equal(worldCupFinalIt.programmeBeforeSections, true);
  assert.doesNotMatch(completeText, /18:00/i);
  assert.doesNotMatch(completeText, /pubblico internazionale/i);
});

test('the five Italian Eventbrite destinations are registered as live without placeholders', () => {
  assert.equal(WORLD_CUP_EVENTBRITE_IT_LIVE_LISTINGS.length, 5);
  assert.equal(new Set(WORLD_CUP_EVENTBRITE_IT_LIVE_LISTINGS.map((listing) => listing.eventId)).size, 5);
  assert.equal(new Set(WORLD_CUP_EVENTBRITE_IT_LIVE_LISTINGS.map((listing) => listing.url)).size, 5);
  assert.equal(WORLD_CUP_EVENTBRITE_IT_SUPERSEDED_IDS.length, 5);
  assert.equal(new Set(WORLD_CUP_EVENTBRITE_IT_SUPERSEDED_IDS).size, 5);
  const liveIds = new Set<string>(WORLD_CUP_EVENTBRITE_IT_LIVE_LISTINGS.map((listing) => listing.eventId));
  assert.ok(WORLD_CUP_EVENTBRITE_IT_SUPERSEDED_IDS.every((id) => !liveIds.has(id)));
  for (const listing of WORLD_CUP_EVENTBRITE_IT_LIVE_LISTINGS) {
    assert.match(listing.eventId, /^\d+$/);
    assert.match(listing.url, new RegExp(`^https://www\\.eventbrite\\.it/e/.+-${listing.eventId}$`));
    assert.equal(listing.status, 'live');
    assert.doesNotMatch(JSON.stringify(listing), /pending-/i);
  }
});

test('five Italian Eventbrite keyword listings are unique, complete and curated-only', () => {
  const payloads = buildWorldCupEventbriteItPayloads();
  assert.equal(payloads.length, 5);
  assert.equal(new Set(payloads.map((payload) => payload.keyword)).size, 5);
  assert.equal(new Set(payloads.map((payload) => payload.title)).size, 5);
  assert.equal(new Set(payloads.map((payload) => payload.marker)).size, 5);

  for (const payload of payloads) {
    validateWorldCupEventbriteItPayload(payload);
    assert.equal(payload.canonicalSiteUrl, WORLD_CUP_FINAL_IT_URL);
    assert.equal(payload.affiliateUrl, WORLD_CUP_FINAL_AFFILIATE_URL);
    assert.ok(payload.title.length <= 62);
    assert.ok(payload.summary.length <= 140);
    assert.match(payload.marker, /^nlm:curated=[a-z0-9-]+-it-2026-07-19$/);
    assert.ok(isEventbriteOnlyCuratedListing({ description: { html: payload.descriptionHtml } }));
    assert.equal((payload.descriptionHtml.match(/nightlifemilan\.com\/it\/events\//g) || []).length, 1);
    assert.equal((payload.descriptionHtml.match(/data-event-faq="true"/g) || []).length, 25);
    assert.equal((payload.descriptionHtml.match(/<img /g) || []).length, 5);
    assert.equal((payload.descriptionHtml.match(/alt="[^"]+"/g) || []).length, 5);
    assert.equal((payload.descriptionHtml.match(/title="[^"]+"/g) || []).length, 5);
    assert.equal((payload.descriptionHtml.match(/style="display:block;width:100%;max-width:100%;height:auto"/g) || []).length, 5);
    const contacts = payload.descriptionHtml.indexOf('<h2>Prenotazioni e ingresso</h2>');
    const programme = payload.descriptionHtml.indexOf('<h2>Programma della serata</h2>');
    const programmeEnd = payload.descriptionHtml.indexOf('</ul>', programme);
    const imagePositions = [...payload.descriptionHtml.matchAll(/<img /g)].map((match) => match.index);
    assert.ok(contacts < imagePositions[0] && imagePositions[0] < programme);
    assert.ok(imagePositions.slice(1).every((position) => position > programmeEnd));
    assert.ok(payload.descriptionHtml.slice(imagePositions[0], payload.descriptionHtml.indexOf('>', imagePositions[0]) + 1).includes(WORLD_CUP_FINAL_POSTER_IT.alt));
    assert.ok(payload.descriptionHtml.toLocaleLowerCase('it').split(payload.keyword.toLocaleLowerCase('it')).length - 1 >= 3);
    assert.ok(payload.descriptionHtml.length <= 16_000);
    assert.doesNotMatch(payload.descriptionHtml, /<br\s*\/?\s*>/i);
    assert.doesNotMatch(payload.descriptionHtml, /\p{Extended_Pictographic}/u);
    assert.doesNotMatch(payload.descriptionHtml, /18:00/i);
  }
});

test('cover, poster and four event-specific mood images have correct formats and metadata', async () => {
  const gallery = getEventVisualGallery(WORLD_CUP_FINAL_CANONICAL_SLUG, 'it');
  assert.ok(gallery);
  assert.equal(gallery.images.length, 5);
  assert.equal(new Set(gallery.images.map((image) => image.title)).size, 5);
  assert.equal(new Set(gallery.images.map((image) => image.alt)).size, 5);
  assert.ok(gallery.images.every((image) => image.title.length > 20 && image.alt.length > 40 && image.description));

  const assets = [WORLD_CUP_FINAL_COVER_IT, WORLD_CUP_FINAL_POSTER_IT, ...WORLD_CUP_FINAL_MOOD_IMAGES_IT];
  for (const asset of assets) {
    const absolute = path.join(process.cwd(), 'public', asset.src.replace(/^\/images\//, 'images/'));
    await access(absolute);
    const metadata = await sharp(absolute).metadata();
    assert.equal(metadata.format, 'jpeg');
    assert.equal(metadata.width, asset.width);
    assert.equal(metadata.height, asset.height);
  }
  assert.equal(WORLD_CUP_FINAL_COVER_IT.width / WORLD_CUP_FINAL_COVER_IT.height, 2);
  assert.ok(
    [WORLD_CUP_FINAL_POSTER_IT, ...WORLD_CUP_FINAL_MOOD_IMAGES_IT]
      .every((image) => image.width / image.height === 1.25 && image.src.includes('-5x4-it-v5.')),
    'all Eventbrite body assets must use the approved no-centre-crop 5:4 v5 treatment',
  );
});

test('Eventbrite venue matching rejects the wrong Just Me address', () => {
  const expected = {
    expectedName: 'Just Me',
    expectedStreet: 'Viale Luigi Camoens, 2',
    expectedPostalCode: '20121',
  };
  assert.equal(eventbriteVenueMatches({
    ...expected,
    candidate: { name: 'Just Me Milano', address: { address_1: '2 Viale Luigi Camoens', postal_code: '20121' } },
  }), true);
  assert.equal(eventbriteVenueMatches({
    ...expected,
    candidate: { name: 'Just Me', address: { address_1: '6 Via Tommaso da Cazzaniga', postal_code: '20121' } },
  }), false);
});
