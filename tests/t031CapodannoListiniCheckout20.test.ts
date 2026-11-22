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
import { getCapodannoLocalizedEventContent, getCapodannoUiCopy } from '../lib/capodanno/i18n';
import { getCapodannoFilterOptions35 } from '../lib/capodanno/capodannoUi35';
import { getT031OverrideContent } from '../lib/capodanno/t031Venues35';
import { getWhatsappVenueNyeContent } from '../lib/capodanno/whatsappVenues35';
import { SINGLE_PASS_COPY_35, localizeSinglePassSku } from '../lib/single-pass/i18n35';
import { selectMasterAssetKeys, getCapodannoOfficialPosterSrc, getSeoLocalePack, buildSeoEventImagePack } from '../lib/seoEventImages';
import {
  SINGLE_PASS_SKUS,
  VENUE_BY_ID,
  getSkuFeeRate,
  getSkusForVenue,
  getVenueIdByEventSlug,
  isPartnerVenueId,
} from '../lib/single-pass/catalog';

const REPO_ROOT = path.resolve(__dirname, '..');

test('T-031, T-032 & WA Audit: Every Capodanno venue has explicit partner boolean; partners = 0% direct, non-partners = 20% at checkout', () => {
  assert.equal(CAPODANNO_EVENTS.length, 124, `Expected 124 events, got ${CAPODANNO_EVENTS.length}`);
  const expectedPartners = [
    'capodanno-pineta-milano',
    'capodanno-justme-milano-torre-branca',
    'capodanno-justme-garda-lake',
    'capodanno-aria-club-milano',
    'capodanno-voya-rooftop-milano',
    'capodanno-55-milano',
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

  // Partner venues direct booking must have 0% fee across ALL formulas (while Single Pass channel stays 20%)
  for (const vid of ['gate', 'pineta', 'repvblic', 'justme', 'bischeri', 'voya', 'justme-garda'] as const) {
    assert.equal(isPartnerVenueId(vid), true, `Expected partner=true for ${vid}`);
    const directSkus = SINGLE_PASS_SKUS.filter((s) => s.venueId === vid);
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

  // All 14 closed/sold-out venues mark soldOutForNye (never closedForNye), excluded from open hub & 0 SKUs
  const expectedSoldOutFromClosed = [
    'capodanno-ceresio-7-milano',
    'capodanno-fabrique-milano',
    'capodanno-base-milano-tortona',
    'capodanno-live-club-trezzo-milano',
    'capodanno-bloom-mezzago-brianza',
    'capodanno-hotel-principe-di-savoia-milano',
    'capodanno-spirit-de-milan',
    'capodanno-molto-club-milano',
    'capodanno-battello-navigli-darsena-milano',
    'capodanno-backdoor43-milano',
    'capodanno-palace-grand-hotel-varese',
    'capodanno-legend-club-milano',
    'capodanno-nidaba-theatre-navigli',
  ];
  const allExpectedSoldOut = ['capodanno-palace-hotel-como', ...expectedSoldOutFromClosed];
  assert.equal(SOLDOUT_CAPODANNO_SLUGS.size, 14);
  for (const slug of expectedSoldOutFromClosed) {
    assert.ok(CLOSED_CAPODANNO_SLUGS.has(slug), `Expected closed->SoldOut slug ${slug}`);
  }
  for (const slug of allExpectedSoldOut) {
    assert.ok(SOLDOUT_CAPODANNO_SLUGS.has(slug), `Expected sold-out slug ${slug}`);
    const ev = getCapodannoEventBySlug(slug)!;
    assert.ok(ev, `Missing event ${slug}`);
    assert.equal(ev.soldOutForNye, true, `Expected soldOutForNye=true on ${slug}`);
    assert.equal(Boolean(ev.closedForNye), false, `Expected closedForNye falsy on ${slug}`);
    assert.equal(ev.priceFromEur, 0, `Expected priceFromEur=0 on ${slug}`);
    assert.equal(openHub.some((e) => e.slug === slug), false, `SoldOut ${slug} leaked into capodanno-2027 hub`);
    assert.equal(getVenueIdByEventSlug(slug), null, `SoldOut ${slug} must have no checkout venueId`);
  }

  // Verify 35-locale hygiene on all T-031, T-032 & Email Reconcile overrides (zero !, zero em-dash, zero Stripe, zero +20%/fee inclusa)
  const overrideSlugs = [
    'capodanno-stk-milan',
    'capodanno-radio-rooftop-milano',
    'capodanno-jazz-cafe-milano',
    'capodanno-hotel-barchetta-excelsior-como',
    'capodanno-albergo-terminus-como',
    'capodanno-palace-hotel-como',
    'capodanno-tram-storico-milano-atmosfera',
    'capodanno-armani-prive-milano',
    'capodanno-teatro-manzoni-milano',
    ...expectedSoldOutFromClosed.filter((s) => s !== 'capodanno-ceresio-7-milano'),
  ];
  const forbiddenRe = /\bstripe\b|\+20%|fee inclusa|commissione|commission/i;
  for (const loc of ALL_35_LOCALES) {
    for (const slug of overrideSlugs) {
      const content = getT031OverrideContent(slug, loc);
      assert.ok(content, `Missing T-031/T-032 override for ${slug} in ${loc}`);
      const json = JSON.stringify(content);
      assert.equal(json.includes('!'), false, `Exclamation in ${slug} (${loc})`);
      assert.equal(json.includes('\u2014'), false, `Em-dash in ${slug} (${loc})`);
      assert.equal(forbiddenRe.test(json), false, `Forbidden token in ${slug} (${loc})`);
    }
  }
});

test('T-032 & Email Reconcile: active venues, Jazz Cafe Orient Express 170€/40€, Legend/Nidaba Sold Out, CIQ TBA & Stage Entertainment removed', () => {
  // Unique SKU IDs across Single Pass catalog
  const skuIds = SINGLE_PASS_SKUS.map((s) => s.id);
  assert.equal(new Set(skuIds).size, skuIds.length, 'Duplicate SKU ID detected in SINGLE_PASS_SKUS');

  // Removed Stage Entertainment theatres must be completely absent
  for (const removedSlug of [
    'capodanno-teatro-lirico-giorgio-gaber-milano',
    'capodanno-teatro-nazionale-milano',
  ]) {
    assert.equal(getCapodannoEventBySlug(removedSlug), undefined, `Removed venue ${removedSlug} still exists`);
    assert.equal(getVenueIdByEventSlug(removedSlug), null, `Removed venue ${removedSlug} still maps to checkout`);
  }

  // Active event pages + clean posters + 4 real gallery masters each
  const activeCheckSlugs = [
    'capodanno-backdoor43-milano',
    'capodanno-palace-grand-hotel-varese',
    'capodanno-teatro-manzoni-milano',
    'capodanno-jazz-cafe-milano',
    'capodanno-legend-club-milano',
    'capodanno-nidaba-theatre-navigli',
    'capodanno-ciq-milano-corvetto',
  ];
  for (const slug of activeCheckSlugs) {
    const ev = getCapodannoEventBySlug(slug);
    assert.ok(ev, `Missing Capodanno event ${slug}`);
    const posterPath = path.join(REPO_ROOT, 'public', getCapodannoOfficialPosterSrc(slug).replace(/^\/+/, ''));
    assert.ok(fs.existsSync(posterPath), `Missing poster ${posterPath}`);
    assert.ok(fs.statSync(posterPath).size <= 300 * 1024, `Poster too large (>300KB): ${posterPath}`);
    const masterKeys = selectMasterAssetKeys(slug, ev.venueName, ev.category);
    for (const key of masterKeys) {
      const mp = path.join(REPO_ROOT, 'public/images/seo-events/master', `${key}.webp`);
      assert.ok(fs.existsSync(mp), `Missing master image ${key}.webp for ${slug}`);
    }
  }

  // Updated galleries for Radio Rooftop, ATMosfera & Armani/Privé
  for (const slug of [
    'capodanno-radio-rooftop-milano',
    'capodanno-tram-storico-milano-atmosfera',
    'capodanno-armani-prive-milano',
  ]) {
    const ev = getCapodannoEventBySlug(slug)!;
    for (const key of selectMasterAssetKeys(slug, ev.venueName, ev.category)) {
      const mp = path.join(REPO_ROOT, 'public/images/seo-events/master', `${key}.webp`);
      assert.ok(fs.existsSync(mp), `Missing refreshed master ${key}.webp for ${slug}`);
    }
  }

  // All 5 bonified PDF menu plates exist on disk
  for (const mFile of [
    'menu-stk-milan-nye-2027.webp',
    'menu-radio-rooftop-nye-2027.webp',
    'menu-barchetta-como-nye-2027.webp',
    'menu-terminus-como-nye-2027.webp',
    'menu-jazz-cafe-milano-nye-2027.webp',
  ]) {
    assert.ok(fs.existsSync(path.join(REPO_ROOT, 'public/images/events/t031-menus', mFile)), `Missing menu plate ${mFile}`);
  }

  // Confirmed non-partner checkouts (0.20 fee) with exact confirmed base prices
  assert.equal(getVenueIdByEventSlug('capodanno-teatro-manzoni-milano'), 'teatro-manzoni');
  assert.equal(isPartnerVenueId('teatro-manzoni'), false);
  const manzoniSkus = getSkusForVenue('teatro-manzoni');
  assert.ok(manzoniSkus.length >= 4);
  assert.ok(manzoniSkus.some((s) => s.basePriceCents === 4000));
  for (const sku of manzoniSkus) assert.equal(getSkuFeeRate(sku), 0.2);

  assert.equal(getVenueIdByEventSlug('capodanno-jazz-cafe-milano'), 'jazz-cafe');
  assert.equal(isPartnerVenueId('jazz-cafe'), false);
  const jazzSkus = getSkusForVenue('jazz-cafe');
  assert.ok(jazzSkus.some((s) => s.basePriceCents === 4000));
  assert.ok(jazzSkus.some((s) => s.basePriceCents === 17000));
  for (const sku of jazzSkus) assert.equal(getSkuFeeRate(sku), 0.2);

  // TBA / On-request safeguards: never expose fake starting prices
  for (const tbaSlug of [
    'capodanno-carroponte-sesto-san-giovanni',
    'capodanno-zoo-club-milano',
    'capodanno-crociera-lago-di-como-garda-maggiore',
    'capodanno-armani-prive-milano',
    'capodanno-ciq-milano-corvetto',
  ]) {
    const ev = getCapodannoEventBySlug(tbaSlug)!;
    assert.ok(ev, `Missing TBA event ${tbaSlug}`);
    assert.equal(ev.priceFromEur, 0, `Expected TBA priceFromEur=0 on ${tbaSlug}`);
    assert.equal(Boolean(ev.soldOutForNye), false);
  }
});

test('WhatsApp Audit: Magazzini tables, Fabbrica del Vapore TBA, Armani TBA, The Club & JustMe clean across 35 locales', () => {
  // 1. Magazzini Generali tables & 20% fee (non-partner)
  const magPista = SINGLE_PASS_SKUS.find((s) => s.id === 'magazzini-table-pista');
  const magBalc = SINGLE_PASS_SKUS.find((s) => s.id === 'magazzini-table-balconata');
  const magPalco = SINGLE_PASS_SKUS.find((s) => s.id === 'magazzini-table-prive-palco');
  assert.ok(magPista && magBalc && magPalco, 'Missing Magazzini table SKUs');
  assert.equal(magPista.basePriceCents, 30000);
  assert.equal(magBalc.basePriceCents, 60000);
  assert.equal(magPalco.basePriceCents, 90000);
  assert.equal(VENUE_BY_ID['magazzini-generali']?.partner, false);
  assert.equal(getSkuFeeRate(magPista, 'venue'), 0.2);

  // 2. Fabbrica del Vapore (TBA, 0 formulas, 4 SEO master files present)
  const fabbrica = getCapodannoEventBySlug('capodanno-fabbrica-del-vapore-milano');
  assert.ok(fabbrica, 'Missing capodanno-fabbrica-del-vapore-milano');
  assert.equal(fabbrica.priceFromEur, 0);
  assert.deepEqual(fabbrica.formulas, []);
  for (const key of selectMasterAssetKeys('capodanno-fabbrica-del-vapore-milano')) {
    const p = path.join(REPO_ROOT, `public/images/seo-events/master/${key}.webp`);
    assert.ok(fs.existsSync(p), `Missing Fabbrica master image ${p}`);
  }

  // 3. Armani/Privé TBA & Fabbrica TBA have zero invented offerPricesEur across 35 locales
  for (const loc of ALL_35_LOCALES) {
    const armaniC = getWhatsappVenueNyeContent('capodanno-armani-prive-milano', loc)!;
    const fabbricaC = getWhatsappVenueNyeContent('capodanno-fabbrica-del-vapore-milano', loc)!;
    assert.ok(armaniC && fabbricaC);
    assert.equal(armaniC.offerPricesEur, undefined, `Armani must stay TBA in ${loc}`);
    assert.equal(fabbricaC.offerPricesEur, undefined, `Fabbrica must stay TBA in ${loc}`);
    assert.doesNotMatch(JSON.stringify(armaniC), /70€|280€|800€/);
    assert.doesNotMatch(JSON.stringify(armaniC), /\bFREE ENTRY\b|\bINGRESSO GRATUITO\b/i);

    // 4. The Club aligned with verified rate card (50/70/90/150/900-2000€)
    const theClubC = getWhatsappVenueNyeContent('capodanno-the-club-milano', loc)!;
    assert.match(JSON.stringify(theClubC), /50€/);
    assert.match(JSON.stringify(theClubC), /150€/);
    assert.match(JSON.stringify(theClubC), /2\.000€/);

    // 5. JustMe never contains Pelledoca Cantine Volpi wines, and always keeps Orthodox banner
    const justMe = getCapodannoEventBySlug('capodanno-justme-milano-torre-branca')!;
    const jmContent = getCapodannoLocalizedEventContent(justMe, loc);
    assert.doesNotMatch(JSON.stringify(jmContent), /Cantine Volpi|Gavi DOCG|Nebbiolo DOC/i);
    assert.ok(jmContent.relatedHolidayBanner?.href, `Missing Orthodox banner on JustMe in ${loc}`);

    // 6. Zero UI / Filter / SEO / SinglePass English leaks or forbidden tokens
    const ui = getCapodannoUiCopy(loc);
    const filterOpts = getCapodannoFilterOptions35(loc);
    const spPack = SINGLE_PASS_COPY_35[loc];
    const seoPack = getSeoLocalePack(loc);
    const imgPack = buildSeoEventImagePack({
      locale: loc,
      eventSlug: 'capodanno-justme-milano-torre-branca',
      venueName: 'JustMe Milano',
      h1: jmContent.title,
      h2List: ['H2'],
      h3List: ['H3'],
      posterSrc: '/images/events/capodanno-2027-posters/capodanno-justme-milano-torre-branca.webp',
    });
    const uxPack = imgPack.ux;
    if (loc !== 'en') {
      assert.doesNotMatch(JSON.stringify(ui), /Tarife \/ Prices|Official & Benchmark|FREE ENTRY|\bUpon request\b|Rooftop, Club & Gala Events/);
      assert.doesNotMatch(JSON.stringify(filterOpts.w), /All Budgets|All Venue Types|All Packages|No events match all selected/);
      assert.doesNotMatch(seoPack.galleryEyebrow, /GOOGLE FLOW SEO PHOTO GALLERY · TARGET & OUTFIT/);
      assert.doesNotMatch(uxPack.vipCalc.heading, /Calculate Your Per-Person VIP Table Cost/);
      assert.doesNotMatch(spPack.embeddedBannerTitle, /Buy confirmed-price tickets directly online/);
    }
    const allTexts = JSON.stringify({ ui, spPack, jmContent, theClubC, armaniC, fabbricaC });
    assert.equal(allTexts.includes('!'), false, `Exclamation in ${loc}`);
    assert.equal(allTexts.includes('\u2014'), false, `Em-dash in ${loc}`);
    assert.equal(/\bstripe\b/i.test(allTexts), false, `Stripe mention in ${loc}`);

    // 7. Distinct localized titles across Magazzini & JustMe SKUs
    const magSkus = getSkusForVenue('magazzini-generali');
    const magTitles = magSkus.map((s) => localizeSinglePassSku(s, loc, spPack, 'Magazzini Generali').title);
    assert.equal(new Set(magTitles).size, magSkus.length, `Colliding Magazzini SKU titles in ${loc}: ${magTitles.join(' | ')}`);
  }
});
