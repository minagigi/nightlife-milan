import assert from 'node:assert/strict';
import test from 'node:test';
import { getConciergeBookingUrl } from '../lib/conciergeBooking';
import { getVenueById } from '../lib/data';
import { getOctoberDateSensitivePresentations, normVenueId } from '../lib/dateSensitiveInventory';
import { getLocalizedDir35 } from '../lib/i18n/dirTokens35';
import { enabledLocaleCodes, localePrefix } from '../lib/i18n/locales';
import { getLocalizedEventSlug35 } from '../lib/i18n/localizedSlugs35';
import { getOctoberEventCopy, getOctoberEventSlug } from '../lib/october-events/copy';
import { getOctoberEventById } from '../lib/octoberEvents';
import { buildOctoberEventGraph } from '../lib/octoberEventSeo';
import { sanitizePublicEventJsonLd } from '../lib/publicOutboundLinks';
import { buildSeoEventImagePack, inferTargetAndOutfit, selectMasterAssetKeys } from '../lib/seoEventImages';
import { resolveVenueEventsForCarousel } from '../lib/venueDossiers35';

const LEAK_RE = /55milano\.com|fiftyfivemilano\.com|3939204246|ciao\s+marco|55clubmilano/i;

test('normVenueId and getOctoberDateSensitivePresentations expose 55m-2026-11-14 with real EUR 15 price across v-55milano and v-55', async () => {
  assert.equal(normVenueId('v-55'), 'v-55milano');
  assert.equal(normVenueId('v-55milano'), 'v-55milano');

  for (const [locale, venueArg] of [
    ['en', 'v-55milano'],
    ['it', 'v-55milano'],
    ['en', 'v-55'],
  ] as const) {
    const items = await getOctoberDateSensitivePresentations(locale, venueArg);
    const target = items.find((item) => item.id === 'october-55m-2026-11-14');
    assert.ok(target, `Expected october-55m-2026-11-14 in presentations for (${locale}, ${venueArg})`);
    assert.equal(target.venueId, 'v-55milano');
    assert.equal(target.price, 15);
    assert.ok(
      target.labels.priceLabel.includes('15'),
      `Expected numeric 15 in priceLabel for (${locale}, ${venueArg}), got "${target.labels.priceLabel}"`,
    );
  }
});

test('resolveVenueEventsForCarousel includes dated 55 Milano event with canonical Nightlife Milan links in EN and IT', () => {
  const venue55 = getVenueById('v-55milano');
  assert.ok(venue55, 'Expected v-55milano in venues catalog');

  for (const locale of ['en', 'it'] as const) {
    const grouped = resolveVenueEventsForCarousel(venue55, locale);
    const allCards = [...grouped.tonight, ...grouped.thisWeek, ...grouped.curatedProposals, ...grouped.future];
    const nocheCard = allCards.find((card) => card.href.includes('noche-de-perreo-55-milano-2026-11-14'));
    assert.ok(nocheCard, `Expected 55m-2026-11-14 card in resolveVenueEventsForCarousel(${locale})`);
    assert.equal(nocheCard.priceLabel, '€15');
    assert.ok(
      nocheCard.whatsappHref.startsWith('https://wa.me/393519127047?text='),
      `Expected Nightlife Milan WA URL, got ${nocheCard.whatsappHref}`,
    );
    assert.equal(nocheCard.categoryLabel, '55 Milano');
    assert.equal(LEAK_RE.test(JSON.stringify(nocheCard)), false);
  }
});

test('inferTargetAndOutfit, selectMasterAssetKeys, and buildSeoEventImagePack classify 55 Milano reggaeton vs general events cleanly', () => {
  const reggaeton = inferTargetAndOutfit({
    slug: 'noche-de-perreo-55-milano-2026-11-14',
    venueName: '55 Milano',
    music: 'Reggaeton, Latin',
    dressCode: 'Elegant',
  });
  assert.equal(reggaeton.outfit, 'urban_reggaeton');

  const general = inferTargetAndOutfit({
    slug: 'sabato-night-55-milano-2026-11-21',
    venueName: '55 Milano',
    music: 'Commercial, House',
    dressCode: 'Elegant',
  });
  assert.deepEqual(general, { target: 'over30_adults', outfit: 'sequins_evening' });

  const keys = selectMasterAssetKeys('noche-de-perreo-55-milano-2026-11-14', '55 Milano');
  assert.deepEqual(keys, [
    'fiftyfive-milano-interior-01',
    'fiftyfive-milano-cena-01',
    'fiftyfive-milano-lounge-01',
    'fiftyfive-milano-dj-01',
  ]);

  const pack = buildSeoEventImagePack({
    locale: 'en',
    eventSlug: 'noche-de-perreo-55-milano-2026-11-14',
    venueName: '55 Milano',
    h1: 'Noche de Perreo · 55 Milano',
    h2List: ['Event details', 'Reserve tickets & VIP tables'],
    h3List: ['Guest list & Ticket Online', 'Privé tables'],
    music: 'Reggaeton, Latin',
    dressCode: 'Elegant',
    posterSrc: '/images/events/october-2026/noche-de-perreo-55-milano-2026-11-14.webp',
  });
  assert.equal(pack.poster.src, '/images/events/october-2026/noche-de-perreo-55-milano-2026-11-14.webp');
  assert.equal(pack.gallery.length, 4);
});

test('55m-2026-11-14 passes 35-locale slugs, metadata bounds, clean JSON-LD/offers, and localized WhatsApp links', () => {
  const event = getOctoberEventById('55m-2026-11-14');
  assert.ok(event, 'Expected 55m-2026-11-14 in OCTOBER_EVENTS');
  assert.equal(event.venue.id, 'v-55milano');

  const enSlug = getOctoberEventSlug(event);
  assert.equal(enSlug, 'noche-de-perreo-55-milano-2026-11-14');

  for (const offer of event.offers) {
    assert.equal(offer.url, 'https://nightlifemilan.com/clubs/55-milano');
    assert.equal(LEAK_RE.test(JSON.stringify(offer)), false);
  }

  for (const loc of enabledLocaleCodes) {
    const copy = getOctoberEventCopy(event, loc);
    assert.ok(copy.metaTitle.length <= 62, `metaTitle too long for ${loc}: ${copy.metaTitle}`);
    assert.ok(copy.metaDescription.length <= 158, `metaDescription too long for ${loc}: ${copy.metaDescription}`);
    assert.equal(copy.slug, getLocalizedEventSlug35(enSlug, loc));
    if (loc === 'it') {
      assert.equal(copy.slug, 'festa-milano-noche-de-perreo-55-milano-2026-11-14');
    }

    const pagePath = `${localePrefix(loc)}/${getLocalizedDir35('events', loc)}/${copy.slug}`;
    const waUrl = getConciergeBookingUrl(loc, copy.title, pagePath);
    assert.ok(waUrl.startsWith('https://wa.me/393519127047?text='), `Unexpected WA URL for ${loc}`);
    const decoded = new URL(waUrl).searchParams.get('text') || '';
    assert.ok(decoded.includes(`https://nightlifemilan.com${pagePath}`), `Missing page URL in WA text for ${loc}`);
    assert.equal(LEAK_RE.test(decoded), false);

    const graph: unknown = sanitizePublicEventJsonLd(buildOctoberEventGraph(event, loc, copy));
    assert.equal(LEAK_RE.test(JSON.stringify(graph)), false);
    assert.equal(LEAK_RE.test(JSON.stringify(copy)), false);
  }
});
