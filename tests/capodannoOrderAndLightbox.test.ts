import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { enabledLocaleCodes } from '../lib/i18n/locales';
import {
  CAPODANNO_EVENTS,
  CAPODANNO_HEAD_13_SLUGS,
  CAPODANNO_PARTNER_PRIORITY_SLUGS,
  CAPODANNO_TAIL_2_SLUGS,
  PARTNER_CAPODANNO_SLUGS,
  getCapodannoEventsForMode,
  getCapodannoPriorityRank,
} from '../lib/capodannoEvents';
import { LIGHTBOX_COPY_35, getLightboxCopy } from '../lib/lightboxCopy35';
import {
  LIGHTBOX_EXCLUDED_ANCESTOR_SELECTOR,
  isLightboxEligibleSrc,
  resolveFullResImageSrc,
} from '../lib/lightboxEligibility';

const REPO_ROOT = path.resolve(__dirname, '..');

test('Capodanno 2027 ordering places all 20 head+partner venues before non-partners and pins Ortodosso + Garda Lake to the tail', () => {
  assert.equal(CAPODANNO_HEAD_13_SLUGS.length, 13);
  assert.equal(CAPODANNO_PARTNER_PRIORITY_SLUGS.length, 20);
  assert.equal(CAPODANNO_PARTNER_PRIORITY_SLUGS[0], 'capodanno-justme-milano-torre-branca');
  assert.equal(CAPODANNO_PARTNER_PRIORITY_SLUGS[1], 'capodanno-pineta-milano');
  assert.equal(CAPODANNO_PARTNER_PRIORITY_SLUGS[2], 'capodanno-voya-rooftop-milano');
  assert.equal(CAPODANNO_PARTNER_PRIORITY_SLUGS[3], 'capodanno-repvblic-milano');
  assert.equal(CAPODANNO_PARTNER_PRIORITY_SLUGS[4], 'capodanno-55-milano');
  assert.equal(CAPODANNO_PARTNER_PRIORITY_SLUGS[5], 'capodanno-carlsberg-ol-milano');
  assert.deepEqual([...CAPODANNO_TAIL_2_SLUGS], [
    'capodanno-ortodosso-justme-milano',
    'capodanno-justme-garda-lake',
  ]);

  // Verify open hub ordering starts with every open partner before any non-partner
  const hubEvents = getCapodannoEventsForMode('capodanno-2027');
  const partnerSet = new Set<string>(CAPODANNO_PARTNER_PRIORITY_SLUGS);
  const firstNonPartnerIndex = hubEvents.findIndex((ev) => !partnerSet.has(ev.slug));
  assert.ok(firstNonPartnerIndex >= CAPODANNO_PARTNER_PRIORITY_SLUGS.length, `Expected all 20 partners before first non-partner (got index ${firstNonPartnerIndex})`);

  const first20Slugs = hubEvents.slice(0, CAPODANNO_PARTNER_PRIORITY_SLUGS.length).map((e) => e.slug);
  assert.deepEqual(first20Slugs, [...CAPODANNO_PARTNER_PRIORITY_SLUGS]);

  // Verify tail 2 slugs sit at the end of the open hub
  const lastTwoHubSlugs = hubEvents.slice(-2).map((e) => e.slug);
  assert.deepEqual(lastTwoHubSlugs, [...CAPODANNO_TAIL_2_SLUGS]);

  // Verify global CAPODANNO_EVENTS ordering keeps all 20 partners ahead of STK, Terrazza Duomo 21, Radio Rooftop
  const stkIndex = CAPODANNO_EVENTS.findIndex((e) => e.slug === 'capodanno-stk-milan');
  const td21Index = CAPODANNO_EVENTS.findIndex((e) => e.slug === 'capodanno-terrazza-duomo-21');
  const radioIndex = CAPODANNO_EVENTS.findIndex((e) => e.slug === 'capodanno-radio-rooftop-milano');
  assert.ok(stkIndex >= 20 && td21Index >= 20 && radioIndex >= 20, `Expected STK/TD21/Radio after all 20 partners`);

  for (const partnerSlug of CAPODANNO_PARTNER_PRIORITY_SLUGS) {
    const idx = CAPODANNO_EVENTS.findIndex((e) => e.slug === partnerSlug);
    assert.ok(idx >= 0 && idx < td21Index, `Partner ${partnerSlug} (${idx}) must appear before non-partner TD21 (${td21Index})`);
    assert.ok(idx < stkIndex, `Partner ${partnerSlug} (${idx}) must appear before non-partner STK (${stkIndex})`);
  }

  // Contextual overrides stay intact
  assert.equal(getCapodannoPriorityRank('capodanno-voya-rooftop-milano', 'capodanno-rooftop-milano'), -1);
  assert.equal(getCapodannoEventsForMode('capodanno-rooftop-milano')[0].slug, 'capodanno-voya-rooftop-milano');
  assert.equal(getCapodannoPriorityRank('capodanno-justme-garda-lake', 'lombardia'), -1);
  assert.equal(getCapodannoEventsForMode('lombardia')[0].slug, 'capodanno-justme-garda-lake');
  assert.equal(getCapodannoPriorityRank('capodanno-ortodosso-justme-milano', 'capodanno-2027'), 9998);
  assert.equal(getCapodannoPriorityRank('capodanno-justme-garda-lake', 'capodanno-2027'), 9999);

  // Fee-exemption set has 10 partner slugs (Voya removed 24 Nov 2026: applies +20% Booking & Transaction Fees)
  assert.equal(PARTNER_CAPODANNO_SLUGS.size, 10);
  assert.equal(PARTNER_CAPODANNO_SLUGS.has('capodanno-voya-rooftop-milano'), false);
});

test('GlobalSearch and OctoberEntry follow Capodanno partner-first priority without duplicate numbering', () => {
  const globalSearchSrc = fs.readFileSync(path.join(REPO_ROOT, 'components', 'GlobalSearch.tsx'), 'utf8');
  assert.ok(globalSearchSrc.includes('getCapodannoPriorityRank'), 'GlobalSearch must use shared getCapodannoPriorityRank ordering');

  const octoberEntrySrc = fs.readFileSync(path.join(REPO_ROOT, 'components', 'OctoberEntry.tsx'), 'utf8');
  assert.ok(octoberEntrySrc.includes('CAPODANNO_HEAD_13_SLUGS'), 'OctoberEntry must render CAPODANNO_HEAD_13_SLUGS');
  assert.ok(octoberEntrySrc.includes('01 · GRAN GALÀ'), 'OctoberEntry missing 01 rank');
  assert.ok(octoberEntrySrc.includes('06 · CAPODANNO PER FAMIGLIE'), 'OctoberEntry missing 06 Carlsberg ØL rank');
  assert.ok(octoberEntrySrc.includes('07 · CASINO NIGHT'), 'OctoberEntry missing 07 Magazzini Generali rank');
  assert.ok(octoberEntrySrc.includes('13 · RED CARPET'), 'OctoberEntry missing 13 Dazi rank');
  const idxJustMe = octoberEntrySrc.indexOf("'capodanno-justme-milano-torre-branca'");
  const idxPineta = octoberEntrySrc.indexOf("'capodanno-pineta-milano'");
  const idxVoya = octoberEntrySrc.indexOf("'capodanno-voya-rooftop-milano'");
  const idx55 = octoberEntrySrc.indexOf("'capodanno-55-milano'");
  const idxCarlsberg = octoberEntrySrc.indexOf("'capodanno-carlsberg-ol-milano'");
  assert.ok(idxJustMe < idxPineta && idxPineta < idxVoya && idxVoya < idx55 && idx55 < idxCarlsberg);
});

test('Lightbox copy covers all 35 enabled locales natively without forbidden words', () => {
  const keys = Object.keys(LIGHTBOX_COPY_35);
  assert.equal(keys.length, 35);
  for (const loc of enabledLocaleCodes) {
    assert.ok(keys.includes(loc), `Missing lightbox copy for locale ${loc}`);
    const c = getLightboxCopy(loc);
    for (const val of [c.openFullScreen, c.zoomIn, c.zoomOut, c.dialogLabel, c.closeGallery, c.previousImage, c.nextImage]) {
      assert.ok(val && val.trim().length >= 3, `Empty lightbox string for ${loc}`);
      assert.equal(/stripe/i.test(val), false, `Forbidden Stripe word in ${loc}`);
      assert.equal(val.includes('\u2014'), false, `Em-dash in ${loc}`);
      assert.equal(val.includes('!'), false, `Exclamation in ${loc}`);
    }
    if (loc !== 'en') {
      assert.notEqual(LIGHTBOX_COPY_35[loc].openFullScreen, LIGHTBOX_COPY_35.en.openFullScreen, `Untranslated fallback in ${loc}`);
    }
  }
});

test('Lightbox eligibility helpers unwrap Next.js full-res URLs, exclude SVG/cards/header.nlm-header, and wire Providers', () => {
  assert.equal(
    resolveFullResImageSrc('/_next/image?url=%2Fimages%2Fevents%2Fvoya.webp&w=640&q=92'),
    '/images/events/voya.webp',
  );
  assert.equal(
    resolveFullResImageSrc('https://nightlifemilan.com/_next/image?url=https%3A%2F%2Fnightlifemilan.com%2Fimages%2Ffoo.webp&w=1080&q=92'),
    'https://nightlifemilan.com/images/foo.webp',
  );
  assert.equal(resolveFullResImageSrc('/images/master.webp'), '/images/master.webp');
  assert.equal(resolveFullResImageSrc('javascript:alert(1)'), '');

  assert.equal(isLightboxEligibleSrc('/images/events/capodanno-voya.webp'), true);
  assert.equal(isLightboxEligibleSrc('/organization-logo.svg'), false);
  assert.equal(isLightboxEligibleSrc('/icon.svg'), false);
  assert.equal(isLightboxEligibleSrc('data:image/svg+xml;base64,abc'), false);
  assert.equal(isLightboxEligibleSrc(''), false);

  // Uses header.nlm-header instead of bare header so event-page posters inside <header> stay clickable
  const selectors = LIGHTBOX_EXCLUDED_ANCESTOR_SELECTOR.split(',').map((s) => s.trim());
  assert.ok(selectors.includes('header.nlm-header'));
  assert.equal(selectors.includes('header'), false);
  assert.ok(selectors.includes('[data-hero-backdrop="true"]'));
  assert.ok(selectors.includes('[data-no-lightbox="true"]'));
  assert.ok(selectors.includes('[data-venue-card]'));
  assert.ok(selectors.includes('[data-single-pass-storefront]'));
  assert.ok(selectors.includes('[data-event-section="gallery"]'));

  const providersSrc = fs.readFileSync(path.join(REPO_ROOT, 'components', 'Providers.tsx'), 'utf8');
  assert.ok(providersSrc.includes('SiteImageLightbox'), 'SiteImageLightbox must be mounted in Providers.tsx');
});
