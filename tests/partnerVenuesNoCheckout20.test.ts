import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import {
  CAPODANNO_EVENTS,
  isPartnerCapodannoSlug,
} from '../lib/capodannoEvents';
import { weeklyEvents } from '../lib/eventsConfig';
import { OCTOBER_EVENTS } from '../lib/octoberEvents';
import {
  PARTENOPEA_JUSTME_SLUGS_35,
  getPartenopeaJustMeContent,
} from '../lib/partenopea/justme35';
import {
  DISABLED_DIRECT_CHECKOUT_VENUE_IDS,
  SINGLE_PASS_FEE_RATE,
  SINGLE_PASS_ONLY_VENUE_IDS,
  SINGLE_PASS_SKUS,
  STOREFRONT_VENUES,
  getConfirmedSkusForInventoryEvent,
  getSkuFeeRate,
  getVenueIdByEventSlug,
  isCheckoutItemAllowed,
  isConfirmedUpcomingInventoryEvent,
  isDirectCheckoutExcludedInventoryVenue,
  isSinglePassStorefrontPath,
  resolveCatalogSku,
} from '../lib/single-pass/catalog';
import {
  THANKSGIVING_JUSTME_SLUGS_35,
  getThanksgivingJustMeContent,
} from '../lib/thanksgiving/justme35';

const REPO_ROOT = path.resolve(__dirname, '..');

const SIX_PARTNER_CAPODANNO_SLUGS = [
  'capodanno-justme-milano-torre-branca',
  'capodanno-justme-garda-lake',
  'capodanno-pineta-milano',
  'capodanno-aria-club-milano',
  'capodanno-voya-rooftop-milano',
  'capodanno-55-milano',
] as const;

const EXCLUDED_INVENTORY_VENUE_IDS = new Set([
  'v-justme',
  'v-justme-garda',
  'v-pineta',
  'v-aria',
  'v-voya',
  'v-55',
  'v-55milano',
]);

test('6 partner venues Capodanno & holiday event pages have zero direct internal checkout and zero +20% fee', () => {
  for (const slug of SIX_PARTNER_CAPODANNO_SLUGS) {
    const ev = CAPODANNO_EVENTS.find((e) => e.slug === slug);
    assert.ok(ev, `Missing Capodanno event: ${slug}`);
    assert.equal(ev.partner, true, `Expected partner=true on ${slug}`);
    assert.equal(isPartnerCapodannoSlug(slug), true, `Expected isPartnerCapodannoSlug(${slug})=true`);
    assert.equal(getVenueIdByEventSlug(slug), null, `Expected null direct checkout venue on ${slug}`);
  }

  for (const specialSlug of [
    'christmas-voya-rooftop-milan-2026',
    'orthodox-new-year-justme-milan-2027',
    ...Object.values(THANKSGIVING_JUSTME_SLUGS_35),
    ...Object.values(PARTENOPEA_JUSTME_SLUGS_35),
  ]) {
    assert.equal(
      getVenueIdByEventSlug(specialSlug),
      null,
      `Expected zero internal checkout on special event ${specialSlug}`,
    );
  }
});

test('All inventory.json events (regular, dated, Capodanno dupes) for the 6 partner venues block internal checkout SKUs', () => {
  const nowMs = Date.parse('2026-11-20T00:00:00Z');
  const partnerInventoryEvents = OCTOBER_EVENTS.filter((ev) =>
    EXCLUDED_INVENTORY_VENUE_IDS.has(ev.venue.id),
  );
  assert.ok(partnerInventoryEvents.length >= 20, `Expected partner inventory events, got ${partnerInventoryEvents.length}`);

  for (const ev of partnerInventoryEvents) {
    assert.equal(isDirectCheckoutExcludedInventoryVenue(ev), true, `Expected excluded flag on ${ev.id}`);
    assert.equal(isConfirmedUpcomingInventoryEvent(ev, nowMs), false, `Expected blocked event ${ev.id}`);
    assert.deepEqual(getConfirmedSkusForInventoryEvent(ev.id, nowMs), [], `Expected empty SKUs for ${ev.id}`);
    assert.equal(resolveCatalogSku(`xceed:${ev.id}:0`, nowMs), null, `Expected null SKU resolution for ${ev.id}`);
  }
});

test('/single-pass storefront stays unchanged (8 venues + 20% fee) while venue-channel checkout for partners is rejected', () => {
  assert.deepEqual(
    STOREFRONT_VENUES.map((v) => v.id),
    ['gate', 'pineta', 'repvblic', 'justme', 'bischeri', 'bobino', 'voya', 'justme-garda'],
  );

  for (const vid of SINGLE_PASS_ONLY_VENUE_IDS) {
    const sku = SINGLE_PASS_SKUS.find((s) => s.venueId === vid);
    assert.ok(sku, `Missing SKU for ${vid}`);
    assert.equal(isCheckoutItemAllowed(sku, 'venue').ok, false, `${vid} must fail on venue channel`);
    assert.equal(isCheckoutItemAllowed(sku, 'single-pass').ok, true, `${vid} must remain active on /single-pass`);
    assert.equal(getSkuFeeRate(sku, 'single-pass'), SINGLE_PASS_FEE_RATE);
  }

  for (const vid of DISABLED_DIRECT_CHECKOUT_VENUE_IDS) {
    const sku = SINGLE_PASS_SKUS.find((s) => s.venueId === vid);
    assert.ok(sku, `Missing legacy SKU for ${vid}`);
    assert.equal(isCheckoutItemAllowed(sku, 'venue').ok, false);
    assert.equal(isCheckoutItemAllowed(sku, 'single-pass').ok, false);
  }

  assert.equal(isSinglePassStorefrontPath('/single-pass'), true);
  assert.equal(isSinglePassStorefrontPath('/it/single-pass'), true);
  assert.equal(isSinglePassStorefrontPath('/fr/single-pass/'), true);
  assert.equal(isSinglePassStorefrontPath('/events/foo?ref=/single-pass'), false);
  assert.equal(isSinglePassStorefrontPath('/it/eventi/capodanno-justme-milano-torre-branca'), false);
});

test('Aria weekly events have no expired/404 Xceed links and fall back cleanly to WhatsApp', () => {
  const ariaWeekly = weeklyEvents.filter((w) => w.clubSlug === 'aria');
  assert.equal(ariaWeekly.length, 3);
  for (const w of ariaWeekly) {
    assert.equal(w.xceedLink, undefined, `Expected WhatsApp fallback (no expired xceedLink) on ${w.id}`);
  }
});

test('Detail views strip SinglePassVenueModule/#official-tickets-ecommerce and keep valid Partenopea/Thanksgiving routing', () => {
  for (const rel of [
    'components/ThanksgivingJustMeDetailView.tsx',
    'components/PartenopeaJustMeDetailView.tsx',
    'components/OrthodoxNyeJustMeDetailView.tsx',
    'components/ChristmasVoyaDetailView.tsx',
  ]) {
    const src = fs.readFileSync(path.join(REPO_ROOT, rel), 'utf8');
    assert.equal(src.includes('SinglePassVenueModule'), false, `${rel} must not use SinglePassVenueModule`);
    assert.equal(src.includes('official-tickets-ecommerce'), false, `${rel} must not link #official-tickets-ecommerce`);
    assert.equal(/\bstripe\b/i.test(src), false, `${rel} must never mention Stripe`);
  }

  for (const guardRel of [
    'app/api/single-pass/checkout/route.ts',
    'app/api/single-pass/orders/[orderId]/pay/route.ts',
    'components/single-pass/SinglePassCartContext.tsx',
  ]) {
    const src = fs.readFileSync(path.join(REPO_ROOT, guardRel), 'utf8');
    assert.equal(src.includes('isCheckoutItemAllowed'), true, `${guardRel} must enforce isCheckoutItemAllowed`);
  }

  const tgEn = getThanksgivingJustMeContent('en');
  assert.equal(tgEn.tocItems[1]?.id, 'official-xceed-booking');
  assert.equal(tgEn.tiers.filter((t) => t.ctaKind === 'xceed').length, 5);
  assert.equal(tgEn.tiers.filter((t) => t.ctaKind === 'whatsapp').length, 2);

  const cspIt = getPartenopeaJustMeContent('it');
  assert.equal(cspIt.tocItems[1]?.id, 'official-xceed-booking');
  const dinnerTier = cspIt.tiers.find((t) => t.id === 'dinner-show-70');
  assert.equal(dinnerTier?.ctaKind, 'whatsapp', 'Cena Spettacolo €70 must route to WhatsApp concierge only');
  assert.equal(cspIt.tiers.filter((t) => t.ctaKind === 'xceed').length, 5);
  assert.equal(cspIt.tiers.filter((t) => t.ctaKind === 'whatsapp').length, 3);
});
