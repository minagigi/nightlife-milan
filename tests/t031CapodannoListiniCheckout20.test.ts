import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { ALL_35_LOCALES } from '../lib/i18n/localizedSlugs35';
import {
  CAPODANNO_EVENTS,
  CLOSED_CAPODANNO_SLUGS,
  PARTNER_CAPODANNO_SLUGS,
  SOLDOUT_CAPODANNO_SLUGS,
  getCapodannoEventBySlug,
  getCapodannoEventsForMode,
  isPartnerCapodannoSlug,
} from '../lib/capodannoEvents';
import { getCapodannoLocalizedEventContent } from '../lib/capodanno/i18n';
import { getT031OverrideContent } from '../lib/capodanno/t031Venues35';
import { selectMasterAssetKeys, getCapodannoOfficialPosterSrc } from '../lib/seoEventImages';
import {
  SINGLE_PASS_SKUS,
  VENUE_BY_ID,
  getSkuFeeRate,
  getSkusForVenue,
  getVenueIdByEventSlug,
  isPartnerVenueId,
} from '../lib/single-pass/catalog';

const REPO_ROOT = path.resolve(__dirname, '..');

test('T-031: Every Capodanno venue has explicit partner boolean; partners = 0% direct, non-partners = 20% at checkout', () => {
  assert.ok(CAPODANNO_EVENTS.length >= 119, `Expected >= 119 events, got ${CAPODANNO_EVENTS.length}`);
  const expectedPartners = [
    'capodanno-pineta-milano',
    'capodanno-justme-milano-torre-branca',
    'capodanno-justme-garda-lake',
    'capodanno-repvblic-milano',
    'capodanno-il-gattopardo-milano',
    'capodanno-bischeri-milano',
    'capodanno-gate-milano',
    'capodanno-tom-the-ordinary-market-milano',
  ];
  for (const slug of expectedPartners) {
    const ev = getCapodannoEventBySlug(slug);
    assert.ok(ev, `Missing partner event ${slug}`);
    assert.equal(ev.partner, true, `Expected partner=true on ${slug}`);
    assert.equal(isPartnerCapodannoSlug(slug), true);
  }
  assert.equal(PARTNER_CAPODANNO_SLUGS.size, expectedPartners.length);

  for (const ev of CAPODANNO_EVENTS) {
    assert.equal(typeof ev.partner, 'boolean', `Missing boolean partner on ${ev.slug}`);
    if (!PARTNER_CAPODANNO_SLUGS.has(ev.slug)) {
      assert.equal(ev.partner, false, `Unexpected partner=true on ${ev.slug}`);
    }
  }

  // Non-partner verified venues must have partner=false and 20% checkout fee
  const nonPartnerVenues = [
    'terrazza-duomo-21',
    'voya',
    'bobino',
    'stk-milan',
    'radio-rooftop',
    'barchetta-como',
    'terminus-como',
    'atmosfera-tram',
    'alcatraz',
    'blue-note',
    'mib-milano',
    'the-club',
    'the-dome',
  ] as const;
  for (const vid of nonPartnerVenues) {
    assert.equal(isPartnerVenueId(vid), false, `Expected partner=false for ${vid}`);
    const skus = getSkusForVenue(vid);
    assert.ok(skus.length >= 1, `Expected SKUs for ${vid}`);
    for (const sku of skus) {
      assert.equal(getSkuFeeRate(sku, 'venue'), 0.2, `Expected 20% checkout fee on ${sku.id}`);
    }
  }

  // Partner venues direct booking must have 0% fee (while Single Pass channel stays 20%)
  for (const vid of ['gate', 'pineta', 'repvblic', 'justme', 'bischeri', 'justme-garda'] as const) {
    assert.equal(isPartnerVenueId(vid), true, `Expected partner=true for ${vid}`);
    const directSkus = SINGLE_PASS_SKUS.filter(
      (s) => s.venueId === vid && s.category !== 'all-night-combo' && s.category !== 'vip-table-share',
    );
    assert.ok(directSkus.length >= 1, `Expected direct SKUs for partner ${vid}`);
    for (const sku of directSkus) {
      assert.equal(getSkuFeeRate(sku, 'venue'), 0, `Expected 0% direct fee on partner ${sku.id}`);
      assert.equal(getSkuFeeRate(sku, 'single-pass'), 0.2, `Expected 20% Single Pass fee on ${sku.id}`);
    }
  }
});

test('T-031: 4 new venues (STK, Barchetta, Terminus, Palace Sold Out) + Radio Rooftop + 8 closed venues pass 35-locale hygiene & assets', () => {
  const newOpenSlugs = [
    'capodanno-stk-milan',
    'capodanno-hotel-barchetta-excelsior-como',
    'capodanno-albergo-terminus-como',
  ];
  const allNewSlugs = [...newOpenSlugs, 'capodanno-palace-hotel-como'];

  for (const slug of allNewSlugs) {
    const ev = getCapodannoEventBySlug(slug);
    assert.ok(ev, `Missing new event ${slug}`);
    assert.equal(ev.partner, false);
    const posterSrc = getCapodannoOfficialPosterSrc(slug);
    assert.ok(
      fs.existsSync(path.join(REPO_ROOT, 'public', posterSrc.replace(/^\//, ''))),
      `Missing poster on disk for ${slug}: ${posterSrc}`,
    );
    const masterKeys = selectMasterAssetKeys(slug, ev.venueName);
    assert.equal(masterKeys.length, 4, `Expected 4 master photos for ${slug}`);
    for (const k of masterKeys) {
      assert.ok(
        fs.existsSync(path.join(REPO_ROOT, 'public', 'images', 'seo-events', 'master', `${k}.webp`)),
        `Missing SEO master photo ${k}.webp for ${slug}`,
      );
    }
  }

  for (const slug of newOpenSlugs) {
    assert.ok(getVenueIdByEventSlug(slug), `New open event must have checkout venue mapping: ${slug}`);
  }

  // Palace Hotel Como is Sold Out -> excluded from open hubs, links to Barchetta & Terminus
  const palace = getCapodannoEventBySlug('capodanno-palace-hotel-como')!;
  assert.equal(palace.soldOutForNye, true);
  assert.ok(SOLDOUT_CAPODANNO_SLUGS.has('capodanno-palace-hotel-como'));
  assert.equal(getVenueIdByEventSlug('capodanno-palace-hotel-como'), null);
  const openHub = getCapodannoEventsForMode('capodanno-2027');
  assert.equal(openHub.some((e) => e.slug === 'capodanno-palace-hotel-como'), false);
  const palaceIt = getCapodannoLocalizedEventContent(palace, 'it');
  assert.equal(palaceIt.soldOutForNye, true);
  assert.deepEqual(palaceIt.alternativeSlugs, [
    'capodanno-hotel-barchetta-excelsior-como',
    'capodanno-albergo-terminus-como',
  ]);

  // All 9 closed venues excluded from open hub & have 0 tiers
  const expectedClosed = [
    'capodanno-ceresio-7-milano',
    'capodanno-fabrique-milano',
    'capodanno-base-milano-tortona',
    'capodanno-live-club-trezzo-milano',
    'capodanno-bloom-mezzago-brianza',
    'capodanno-hotel-principe-di-savoia-milano',
    'capodanno-spirit-de-milan',
    'capodanno-molto-club-milano',
    'capodanno-battello-navigli-darsena-milano',
  ];
  for (const slug of expectedClosed) {
    assert.ok(CLOSED_CAPODANNO_SLUGS.has(slug), `Expected closed slug ${slug}`);
    const ev = getCapodannoEventBySlug(slug)!;
    assert.equal(ev.closedForNye, true);
    assert.equal(ev.priceFromEur, 0);
    assert.equal(openHub.some((e) => e.slug === slug), false, `Closed ${slug} leaked into capodanno-2027 hub`);
  }

  // Verify 35-locale hygiene on all T-031 overrides (zero !, zero em-dash, zero Stripe, zero +20%/fee inclusa)
  const overrideSlugs = [
    'capodanno-stk-milan',
    'capodanno-radio-rooftop-milano',
    'capodanno-hotel-barchetta-excelsior-como',
    'capodanno-albergo-terminus-como',
    'capodanno-palace-hotel-como',
    ...expectedClosed.filter((s) => s !== 'capodanno-ceresio-7-milano'),
  ];
  const forbiddenRe = /\bstripe\b|\+20%|fee inclusa|commissione|commission/i;
  for (const loc of ALL_35_LOCALES) {
    for (const slug of overrideSlugs) {
      const content = getT031OverrideContent(slug, loc);
      assert.ok(content, `Missing T-031 override for ${slug} in ${loc}`);
      const json = JSON.stringify(content);
      assert.equal(json.includes('!'), false, `Exclamation in ${slug} (${loc})`);
      assert.equal(json.includes('\u2014'), false, `Em-dash in ${slug} (${loc})`);
      assert.equal(forbiddenRe.test(json), false, `Forbidden token in ${slug} (${loc})`);
    }
  }
});
