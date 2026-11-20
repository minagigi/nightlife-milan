import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { ALL_35_LOCALES } from '../lib/i18n/localizedSlugs35';
import {
  CAPODANNO_CATEGORY_PAGES,
  getCapodannoEventBySlug,
  getCapodannoEventsForMode,
} from '../lib/capodannoEvents';
import { getCapodannoLocalizedEventContent } from '../lib/capodanno/i18n';
import {
  TERRAZZA_DUOMO_21_NYE_OFFER_PRICES_EUR,
  getTerrazzaDuomo21NyeContent,
} from '../lib/capodanno/terrazzaDuomo21_35';
import { getCeresio7ClosedNyeContent } from '../lib/capodanno/ceresio7Closed35';
import { resolveCapodannoEventBaseSlugByLocalizedSlug } from '../lib/capodanno/routes';
import { selectMasterAssetKeys } from '../lib/seoEventImages';
import {
  SINGLE_PASS_FEE_RATE,
  SKU_BY_ID,
  TERRAZZA_DUOMO_FEE_RATE,
  computeSinglePassPrice,
  getSkuFeeRate,
  validateTerrazzaDuomoCart,
} from '../lib/single-pass/catalog';
import {
  STAFF_ACTIVATION_EMAIL,
  buildSinglePassOrderEmail,
  buildStaffActivationEmail,
} from '../lib/single-pass/email';
import { formatFeeLabel35, getTerrazzaCheckoutUi35 } from '../lib/single-pass/i18n35';
import { buildPaymentIntentParams } from '../lib/single-pass/stripe';
import { clearMemoryStoreForTests, getOrderById } from '../lib/single-pass/store';
import { POST as checkoutPost } from '../app/api/single-pass/checkout/route';
import type { SinglePassOrder } from '../lib/single-pass/types';

const REPO_ROOT = path.resolve(__dirname, '..');

test('Terrazza Duomo 21 (1F), Terrazza MA.RE (5F) & Single Pass SKUs all compute exact +20% fee (T-029b + T-029c)', () => {
  const expectedPrices: Record<string, [number, number, number]> = {
    'terrazza21-f1-dinner-place-rubia': [30000, 6000, 36000],
    'terrazza21-f1-dinner-place-ricciola': [30000, 6000, 36000],
    'terrazza21-f1-dinner-buffet': [20000, 4000, 24000],
    'terrazza21-f1-brindisi': [9000, 1800, 10800],
    'terrazza21-f1-anno-nuovo': [7000, 1400, 8400],
    'terrazza21-f1-terrace-table': [60000, 12000, 72000],
    'terrazza21-f1-private-terrace': [120000, 24000, 144000],
    'terrazza21-f5-mare-dinner-place': [38000, 7600, 45600],
    'terrazza21-f5-mare-brindisi': [9000, 1800, 10800],
    'terrazza21-f5-mare-anno-nuovo': [7000, 1400, 8400],
    'terrazza21-f5-mare-terrace-table': [60000, 12000, 72000],
  };

  for (const [skuId, [base, fee, total]] of Object.entries(expectedPrices)) {
    const sku = SKU_BY_ID.get(skuId);
    assert.ok(sku, `Missing SKU ${skuId}`);
    assert.equal(getSkuFeeRate(sku), TERRAZZA_DUOMO_FEE_RATE);
    const p = computeSinglePassPrice(sku.basePriceCents, 1, getSkuFeeRate(sku));
    assert.equal(p.unitBaseCents, base);
    assert.equal(p.unitFeeCents, fee);
    assert.equal(p.unitTotalCents, total);
    assert.equal(
      /20%|15%|\bfee\b|commission|listino locale|venue rate/i.test(
        `${sku.descriptionIt} ${sku.descriptionEn}`,
      ),
      false,
      `Fee breakdown leaked in SKU description: ${skuId}`,
    );
  }

  // Single Pass SKUs are 20% on single-pass channel, while partner venues direct are 0% (T-031)
  assert.equal(SINGLE_PASS_FEE_RATE, 0.2);
  const spSku = SKU_BY_ID.get('justme-club-entry')!;
  assert.equal(getSkuFeeRate(spSku, 'single-pass'), 0.2);
  assert.equal(getSkuFeeRate(spSku, 'venue'), 0);
  const spPrice = computeSinglePassPrice(spSku.basePriceCents, 1, getSkuFeeRate(spSku, 'single-pass'));
  assert.equal(spPrice.unitFeeCents, Math.round(spSku.basePriceCents * 0.2));
  assert.equal(spPrice.unitTotalCents, spPrice.unitBaseCents + spPrice.unitFeeCents);

  // T-031 non-partner venues always apply 20% at checkout
  const barchettaSku = SKU_BY_ID.get('barchetta-como-gala-adult')!;
  assert.ok(barchettaSku);
  assert.equal(getSkuFeeRate(barchettaSku, 'venue'), 0.2);
  const barchettaP = computeSinglePassPrice(barchettaSku.basePriceCents, 1, getSkuFeeRate(barchettaSku, 'venue'));
  assert.equal(barchettaP.unitBaseCents, 17500);
  assert.equal(barchettaP.unitFeeCents, 3500);
  assert.equal(barchettaP.unitTotalCents, 21000);
});

test('Terrace table mandatory pairing validation enforces same-floor pairing and max capacity (4 / 8)', () => {
  const f1Table4 = SKU_BY_ID.get('terrazza21-f1-terrace-table')!;
  const f1Private8 = SKU_BY_ID.get('terrazza21-f1-private-terrace')!;
  const f1Brindisi = SKU_BY_ID.get('terrazza21-f1-brindisi')!;
  const f1Rubia = SKU_BY_ID.get('terrazza21-f1-dinner-place-rubia')!;
  const f1Ricciola = SKU_BY_ID.get('terrazza21-f1-dinner-place-ricciola')!;
  const f5Table4 = SKU_BY_ID.get('terrazza21-f5-mare-terrace-table')!;
  const f5Dinner = SKU_BY_ID.get('terrazza21-f5-mare-dinner-place')!;

  // 1. Orphan table rejected
  const orphan = validateTerrazzaDuomoCart([{ sku: f1Table4, quantity: 1 }]);
  assert.equal(orphan.ok, false);
  if (!orphan.ok) assert.equal(orphan.errorCode, 'TABLE_REQUIRES_FORMULA');

  // 2. Cross-floor mismatch rejected (5F table + 1F formula)
  const crossFloor = validateTerrazzaDuomoCart([
    { sku: f5Table4, quantity: 1 },
    { sku: f1Brindisi, quantity: 4 },
  ]);
  assert.equal(crossFloor.ok, false);
  if (!crossFloor.ok) assert.equal(crossFloor.errorCode, 'TABLE_REQUIRES_FORMULA');

  // 3. Over-capacity rejected (1 table max 4 + 5 guests)
  const overCap = validateTerrazzaDuomoCart([
    { sku: f1Table4, quantity: 1 },
    { sku: f1Brindisi, quantity: 5 },
  ]);
  assert.equal(overCap.ok, false);
  if (!overCap.ok) assert.equal(overCap.errorCode, 'TABLE_MAX_GUESTS_EXCEEDED');

  // 4. Valid: 1 table (€600) + 4 Brindisi (€90×4) = €960 base + €192 (20%) = €1,152 total, 4 pax
  const validBrindisi = validateTerrazzaDuomoCart([
    { sku: f1Table4, quantity: 1 },
    { sku: f1Brindisi, quantity: 4 },
  ]);
  assert.equal(validBrindisi.ok, true);
  const tP = computeSinglePassPrice(f1Table4.basePriceCents, 1, TERRAZZA_DUOMO_FEE_RATE);
  const fP = computeSinglePassPrice(f1Brindisi.basePriceCents, 4, TERRAZZA_DUOMO_FEE_RATE);
  assert.equal(tP.lineBaseCents + fP.lineBaseCents, 96000);
  assert.equal(tP.lineFeeCents + fP.lineFeeCents, 19200);
  assert.equal(tP.lineTotalCents + fP.lineTotalCents, 115200);
  assert.equal((f1Table4.guestsPerUnit ?? 1) * 1 + (f1Brindisi.guestsPerUnit ?? 1) * 4, 4);

  // 5. Valid mixed main courses: 1 table (€600) + 2 Rubia + 2 Ricciola (€300×4) = €1,800 base + €360 = €2,160
  const validMixedDinner = validateTerrazzaDuomoCart([
    { sku: f1Table4, quantity: 1 },
    { sku: f1Rubia, quantity: 2 },
    { sku: f1Ricciola, quantity: 2 },
  ]);
  assert.equal(validMixedDinner.ok, true);

  // 6. Valid private terrace max 8 + 8 formulas
  const validPrivate8 = validateTerrazzaDuomoCart([
    { sku: f1Private8, quantity: 1 },
    { sku: f1Brindisi, quantity: 8 },
  ]);
  assert.equal(validPrivate8.ok, true);

  // 7. Valid 5F table + 4× 5F Michelin dinner
  const valid5F = validateTerrazzaDuomoCart([
    { sku: f5Table4, quantity: 1 },
    { sku: f5Dinner, quantity: 4 },
  ]);
  assert.equal(valid5F.ok, true);
});

test('All 35 locales cover Terrazza Duomo 21 / MA.RE & Ceresio 7 closed with zero Stripe/!/em-dash/venue contacts/public fee breakdown', () => {
  const forbiddenRe = /\bstripe\b|terrazzaduomo21\.it|marecapitaneo\.com|ceresio7\.com/i;
  const forbiddenPublicFeeRe =
    /20%|15%|\bfee\b|booking fee|commission|commissione|percentuale|comisión|gestión|frais|gebühr|taxa de|комисси|hizmet ücreti|服务费|رسوم|opłat|comision|προμήθεια|комісі|listino locale|venue rate/i;

  for (const loc of ALL_35_LOCALES) {
    const td = getTerrazzaDuomo21NyeContent(loc);
    const tdJson = JSON.stringify(td);
    assert.ok(td.title.length >= 20, `Short title in ${loc}`);
    assert.equal(td.tiers.length, 10, `Expected 10 tiers in ${loc}`);
    assert.equal(td.menus?.length, 3, `Expected 3 official menus in ${loc}`);
    assert.ok((td.conditions?.length ?? 0) >= 7, `Missing PDF conditions in ${loc}`);
    assert.deepEqual(td.offerPricesEur, [...TERRAZZA_DUOMO_21_NYE_OFFER_PRICES_EUR]);
    assert.deepEqual(TERRAZZA_DUOMO_21_NYE_OFFER_PRICES_EUR, [300, 200, 90, 70, 600, 1200, 380, 90, 70, 600]);
    assert.equal(/360€|€360|456€|€456|720€|€720|1\.440€|€1,440|108€|€108|84€|€84|240€|€240/.test(tdJson), false, `Inflated T-029b price leaked in Terrazza ${loc}`);
    assert.equal(tdJson.includes('!'), false, `Exclamation in Terrazza ${loc}`);
    assert.equal(tdJson.includes('\u2014'), false, `Em-dash in Terrazza ${loc}`);
    assert.equal(forbiddenRe.test(tdJson), false, `Forbidden token in Terrazza ${loc}`);
    assert.equal(
      forbiddenPublicFeeRe.test(tdJson),
      false,
      `Public fee/percentage breakdown leaked in Terrazza ${loc}`,
    );

    const c7 = getCeresio7ClosedNyeContent(loc);
    const c7Json = JSON.stringify(c7);
    assert.equal(c7.soldOutForNye, true);
    assert.equal(Boolean(c7.closedForNye), false);
    assert.equal(c7.tiers.length, 0, `Closed Ceresio 7 must have 0 price tiers in ${loc}`);
    assert.ok(c7.closureBannerTitle && c7.closureBannerTitle.length > 10);
    assert.equal(c7Json.includes('!'), false, `Exclamation in Ceresio 7 ${loc}`);
    assert.equal(c7Json.includes('\u2014'), false, `Em-dash in Ceresio 7 ${loc}`);
    assert.equal(/100–350|350–1\.200|40–50€/.test(c7Json), false, `Invented prices in Ceresio 7 ${loc}`);

    const fee20 = formatFeeLabel35(loc, 0.2, false);
    assert.ok(fee20.includes('Booking fee 20%'), `Missing Booking fee 20% label in ${loc}: ${fee20}`);
    const ui35 = getTerrazzaCheckoutUi35(loc);
    assert.ok(ui35.confirmationRefundNotice.length > 20);
  }

  assert.equal(
    formatFeeLabel35('it', 0.2, false),
    'Booking fee 20% · consulenza concierge e pagamento elettronico',
  );
  assert.equal(
    formatFeeLabel35('en', 0.2, false),
    'Booking fee 20% · concierge & electronic payment',
  );

  // Category pages (Rooftop, Couples) & raw capodannoEvents entry have zero fee breakdown
  for (const catSlug of ['capodanno-rooftop-milano', 'capodanno-coppie-romantico-milano']) {
    const def = CAPODANNO_CATEGORY_PAGES.find((c) => c.slug === catSlug);
    assert.ok(def, `Missing category ${catSlug}`);
    assert.equal(
      forbiddenPublicFeeRe.test(`${def.subtitleIt} ${def.subtitleEn} ${def.quickAnswerIt} ${def.quickAnswerEn}`),
      false,
      `Fee leaked in category ${catSlug}`,
    );
  }
  const tdRaw = getCapodannoEventBySlug('capodanno-terrazza-duomo-21')!;
  assert.equal(forbiddenPublicFeeRe.test(JSON.stringify(tdRaw)), false, 'Fee leaked in raw Terrazza event');

  // Public booking UI files must not show +15% / +20% / fee breakdown
  for (const rel of [
    'components/single-pass/TerrazzaDuomoBookingModule.tsx',
    'components/single-pass/SinglePassStorefront.tsx',
    'components/single-pass/SinglePassVenueModule.tsx',
    'components/single-pass/ConfirmedEventTicketsBox.tsx',
    'app/[locale]/single-pass/page.tsx',
  ]) {
    const src = fs.readFileSync(path.join(REPO_ROOT, rel), 'utf8');
    assert.equal(
      /\+\s*20%|\+\s*15%|20%\s*fee|15%\s*fee|booking fee|commissione|commission/i.test(src),
      false,
      `Public fee/percentage breakdown found in ${rel}`,
    );
  }

  // Real photos exist on disk and are mapped in seoEventImages.ts
  const keys = selectMasterAssetKeys('capodanno-terrazza-duomo-21', 'Terrazza Duomo 21');
  assert.deepEqual(keys, [
    'terrazza-duomo-21-real-01',
    'terrazza-duomo-21-real-02',
    'terrazza-mare-5f-real-03',
    'terrazza-mare-5f-real-04',
  ]);
  for (const k of keys) {
    assert.ok(
      fs.existsSync(path.join(REPO_ROOT, 'public', 'images', 'seo-events', 'master', `${k}.webp`)),
      `Missing real master image: ${k}.webp`,
    );
  }
  for (const menuFile of [
    'terrazza-duomo21-f1-place-menu.webp',
    'terrazza-duomo21-f1-buffet-lounge.webp',
    'terrazza-mare-f5-capitaneo-menu.webp',
  ]) {
    assert.ok(
      fs.existsSync(path.join(REPO_ROOT, 'public', 'images', 'events', 'capodanno-2027-menus', menuFile)),
      `Missing real menu image: ${menuFile}`,
    );
  }

  // Alias slugs redirect cleanly to capodanno-terrazza-duomo-21
  assert.equal(resolveCapodannoEventBaseSlugByLocalizedSlug('capodanno-terrazza-mare', 'it'), 'capodanno-terrazza-duomo-21');
  assert.equal(resolveCapodannoEventBaseSlugByLocalizedSlug('new-years-eve-terrazza-mare-2027', 'en'), 'capodanno-terrazza-duomo-21');
});

test('Ceresio 7 is excluded from purchasable lists/categories while its detail page resolves cleanly', () => {
  const c7 = getCapodannoEventBySlug('capodanno-ceresio-7-milano');
  assert.ok(c7);
  assert.equal(c7.soldOutForNye, true);
  assert.equal(Boolean(c7.closedForNye), false);
  assert.equal(c7.priceFromEur, 0);

  for (const mode of [
    'capodanno-2027',
    'capodanno-rooftop-milano',
    'capodanno-economico-low-cost-milano',
    'capodanno-coppie-romantico-milano',
    'capodanno-over-30-40-milano',
  ]) {
    const list = getCapodannoEventsForMode(mode);
    assert.equal(
      list.some((e) => e.slug === 'capodanno-ceresio-7-milano'),
      false,
      `Ceresio 7 should not appear in purchasable mode ${mode}`,
    );
  }

  const rooftops = getCapodannoEventsForMode('capodanno-rooftop-milano');
  assert.ok(rooftops.some((e) => e.slug === 'capodanno-terrazza-duomo-21'));
  const tdEvent = getCapodannoEventBySlug('capodanno-terrazza-duomo-21')!;
  const tdLocalizedIt = getCapodannoLocalizedEventContent(tdEvent, 'it');
  assert.equal(tdLocalizedIt.tiers.length, 10);
});

test('Post-payment emails generate localized customer confirmation/refund notice and staff@nightlifemilan.com activation brief', () => {
  const sampleOrder: SinglePassOrder = {
    id: 'NLM-SP-20261119-TD2101',
    accessPin: 'AB12CD',
    memberId: 'mbr_td1',
    status: 'paid',
    createdAt: '2026-11-19T12:00:00.000Z',
    updatedAt: '2026-11-19T12:05:00.000Z',
    paidAt: '2026-11-19T12:05:00.000Z',
    locale: 'it',
    customer: {
      fullName: 'Giulia Conti',
      email: 'giulia@example.com',
      whatsapp: '+39 349 5556677',
      age: 34,
      country: 'Italia',
      spokenLanguages: ['Italiano', 'English'],
      dietaryNotes: 'Intolleranza al lattosio (1 ospite)',
    },
    items: [
      {
        skuId: 'terrazza21-f1-dinner-place-rubia',
        venueId: 'terrazza-duomo-21',
        venueName: 'Terrazza Duomo 21 · 1° Piano',
        eventSlug: 'capodanno-terrazza-duomo-21',
        category: 'gala-dinner',
        title: '1° Piano · Cena Placé Chef Valerio Braschi (Rubia Gallega)',
        arrivalTime: '20:30',
        dietaryChoice: 'Rubia gallega dry aged',
        guestsPerUnit: 1,
        totalGuests: 2,
        feeRate: 0.2,
        unitBaseCents: 30000,
        unitFeeCents: 6000,
        unitTotalCents: 36000,
        quantity: 2,
        lineBaseCents: 60000,
        lineFeeCents: 12000,
        lineTotalCents: 72000,
      },
      {
        skuId: 'terrazza21-f1-dinner-place-ricciola',
        venueId: 'terrazza-duomo-21',
        venueName: 'Terrazza Duomo 21 · 1° Piano',
        eventSlug: 'capodanno-terrazza-duomo-21',
        category: 'gala-dinner',
        title: '1° Piano · Cena Placé Chef Valerio Braschi (Ricciola)',
        arrivalTime: '20:30',
        dietaryChoice: 'Ricciola, zucca tartufata e tarassaco al miele',
        guestsPerUnit: 1,
        totalGuests: 2,
        feeRate: 0.2,
        unitBaseCents: 30000,
        unitFeeCents: 6000,
        unitTotalCents: 36000,
        quantity: 2,
        lineBaseCents: 60000,
        lineFeeCents: 12000,
        lineTotalCents: 72000,
      },
      {
        skuId: 'terrazza21-f1-terrace-table',
        venueId: 'terrazza-duomo-21',
        venueName: 'Terrazza Duomo 21 · 1° Piano',
        eventSlug: 'capodanno-terrazza-duomo-21',
        category: 'vip-table-full',
        title: '1° Piano · Tavolo in Terrazza (max 4 pax, 2 bottiglie)',
        arrivalTime: '20:30',
        guestsPerUnit: 0,
        totalGuests: 0,
        feeRate: 0.2,
        unitBaseCents: 60000,
        unitFeeCents: 12000,
        unitTotalCents: 72000,
        quantity: 1,
        lineBaseCents: 60000,
        lineFeeCents: 12000,
        lineTotalCents: 72000,
      },
    ],
    totalHeadcount: 4,
    subtotalBaseCents: 180000,
    feeRate: 0.2,
    feeCents: 36000,
    totalCents: 216000,
    currency: 'eur',
    presentmentCurrency: 'EUR',
    presentmentSubtotalMinor: 180000,
    presentmentFeeMinor: 36000,
    presentmentTotalMinor: 216000,
    fxRate: 1,
    fxTimestamp: '2026-11-19T12:00:00.000Z',
    stripeSessionId: null,
    stripePaymentIntentId: 'pi_test_td21_001',
    stripeCheckoutUrl: null,
    whatsappGroupStatus: 'scheduled_dec_20',
    whatsappGroupInviteUrl: null,
    confirmationEmailSentAt: null,
    emailDeliveryError: null,
  };

  const piParams = buildPaymentIntentParams(sampleOrder);
  assert.equal(piParams.get('amount'), '216000');
  assert.equal(piParams.get('metadata[fee_rate]'), '0.2');
  assert.equal(piParams.get('metadata[headcount]'), '4');
  assert.equal(piParams.get('metadata[venue_net_eur_cents]'), '180000');

  const custMail = buildSinglePassOrderEmail(sampleOrder);
  assert.equal(custMail.to, 'giulia@example.com');
  assert.ok(custMail.html.includes('verifica della disponibilità col locale'));
  assert.ok(custMail.html.includes('rimborso completo'));
  assert.ok(custMail.html.includes('Prezzo del locale (EUR)'));
  assert.ok(custMail.html.includes('Booking fee 20% · consulenza concierge e pagamento elettronico'));
  assert.ok(custMail.text.includes('Prezzo del locale (EUR)'));
  assert.ok(custMail.text.includes('Booking fee 20% · consulenza concierge e pagamento elettronico'));
  assert.ok(custMail.html.includes('Via Silvio Pellico 2'));
  assert.ok(custMail.html.includes('Intolleranza al lattosio'));
  assert.equal(/\bstripe\b/i.test(custMail.html), false);
  assert.equal(/\bstripe\b/i.test(custMail.text), false);

  const staffMail = buildStaffActivationEmail(sampleOrder);
  assert.equal(staffMail.to, STAFF_ACTIVATION_EMAIL);
  assert.ok(staffMail.html.includes('NETTO DA BONIFICARE AL LOCALE'));
  assert.ok(staffMail.html.includes('1.800') || staffMail.html.includes('1800'));
  assert.ok(staffMail.html.includes('360'));
  assert.ok(staffMail.html.includes('2.160') || staffMail.html.includes('2160'));
  assert.ok(staffMail.html.includes('Rubia gallega dry aged'));
  assert.ok(staffMail.html.includes('Ricciola'));
  assert.ok(staffMail.html.includes('Intolleranza al lattosio'));
  assert.equal(/\bstripe\b/i.test(staffMail.html), false);
  assert.equal(/\bstripe\b/i.test(staffMail.text), false);
});

test('End-to-end /api/single-pass/checkout POST enforces pairing/allergies and creates exact 20% test-mode PaymentIntent', async () => {
  const prevToken = process.env.BLOB_READ_WRITE_TOKEN;
  const prevStripeKey = process.env.STRIPE_SECRET_KEY;
  const origFetch = globalThis.fetch;
  delete process.env.BLOB_READ_WRITE_TOKEN;
  process.env.STRIPE_SECRET_KEY = 'sk_test_unit_terrazza21_mock_000000';
  clearMemoryStoreForTests();

  const capturedPaymentIntentBodies: URLSearchParams[] = [];

  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
    if (url.includes('/v1/payment_intents')) {
      const params = new URLSearchParams(String(init?.body || ''));
      capturedPaymentIntentBodies.push(params);
      return new Response(
        JSON.stringify({
          id: `pi_test_mock_${capturedPaymentIntentBodies.length}`,
          client_secret: `pi_test_mock_${capturedPaymentIntentBodies.length}_secret_ok`,
          status: 'requires_payment_method',
          amount: Number(params.get('amount')),
          currency: params.get('currency'),
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    }
    return new Response(JSON.stringify({ rates: { EUR: 1 } }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }) as typeof fetch;

  const mkPost = (payload: Record<string, unknown>) =>
    new Request('https://nightlifemilan.com/api/single-pass/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        origin: 'https://nightlifemilan.com',
      },
      body: JSON.stringify(payload),
    });

  try {
    // 1. Orphan terrace table blocked (400 TABLE_REQUIRES_FORMULA)
    const orphanRes = await checkoutPost(
      mkPost({
        locale: 'it',
        currency: 'EUR',
        items: [{ skuId: 'terrazza21-f1-terrace-table', quantity: 1 }],
        fullName: 'Marco Rossi',
        email: 'marco@example.com',
        whatsapp: '+39 340 1112233',
        age: 32,
        country: 'Italia',
        dietaryNotes: 'Nessuna allergia',
        acceptedTerms: true,
      }),
    );
    assert.equal(orphanRes.status, 400);
    const orphanJson = (await orphanRes.json()) as { code?: string };
    assert.equal(orphanJson.code, 'TABLE_REQUIRES_FORMULA');

    // 2. Empty allergies allowed (optional field -> 200 ok)
    const noAllergyRes = await checkoutPost(
      mkPost({
        locale: 'it',
        currency: 'EUR',
        items: [
          { skuId: 'terrazza21-f1-terrace-table', quantity: 1 },
          { skuId: 'terrazza21-f1-brindisi', quantity: 4 },
        ],
        fullName: 'Marco Rossi',
        email: 'marco@example.com',
        whatsapp: '+39 340 1112233',
        age: 32,
        country: 'Italia',
        dietaryNotes: '',
        acceptedTerms: true,
      }),
    );
    assert.equal(noAllergyRes.status, 200);
    const noAllergyJson = (await noAllergyRes.json()) as { ok?: boolean; orderId?: string };
    assert.equal(noAllergyJson.ok, true);
    assert.ok(noAllergyJson.orderId);
    assert.equal((await getOrderById(noAllergyJson.orderId))?.customer.dietaryNotes, undefined);

    // 3. Valid: 1 table (€600) + 4 Brindisi (€90×4) = €960 base + €192 (20%) = €1,152, 4 pax
    const okBrindisiRes = await checkoutPost(
      mkPost({
        locale: 'it',
        currency: 'EUR',
        items: [
          { skuId: 'terrazza21-f1-terrace-table', quantity: 1 },
          { skuId: 'terrazza21-f1-brindisi', quantity: 4 },
        ],
        fullName: 'Marco Rossi',
        email: 'marco@example.com',
        whatsapp: '+39 340 1112233',
        age: 32,
        country: 'Italia',
        dietaryNotes: 'Nessuna allergia',
        acceptedTerms: true,
      }),
    );
    assert.equal(okBrindisiRes.status, 200);
    const okBrindisi = (await okBrindisiRes.json()) as {
      ok: boolean;
      orderId: string;
      subtotalBaseCents: number;
      feeRate: number;
      feeCents: number;
      totalEurCents: number;
      totalHeadcount: number;
    };
    assert.equal(okBrindisi.ok, true);
    assert.equal(okBrindisi.subtotalBaseCents, 96000);
    assert.equal(okBrindisi.feeRate, 0.2);
    assert.equal(okBrindisi.feeCents, 19200);
    assert.equal(okBrindisi.totalEurCents, 115200);
    assert.equal(okBrindisi.totalHeadcount, 4);

    // 4. Valid: 1 table (€600) + 2 Rubia + 2 Ricciola (€300×4) = €1,800 base + €360 (20%) = €2,160, 4 pax
    const okDinnerRes = await checkoutPost(
      mkPost({
        locale: 'en',
        currency: 'EUR',
        items: [
          { skuId: 'terrazza21-f1-terrace-table', quantity: 1 },
          { skuId: 'terrazza21-f1-dinner-place-rubia', quantity: 2 },
          { skuId: 'terrazza21-f1-dinner-place-ricciola', quantity: 2 },
        ],
        fullName: 'Elena Rossi',
        email: 'elena.td21@example.com',
        whatsapp: '+39 347 9998877',
        age: 35,
        country: 'Italy',
        dietaryNotes: 'No shellfish for 1 guest',
        acceptedTerms: true,
      }),
    );
    assert.equal(okDinnerRes.status, 200);
    const okDinner = (await okDinnerRes.json()) as {
      ok: boolean;
      orderId: string;
      subtotalBaseCents: number;
      feeCents: number;
      totalEurCents: number;
      totalHeadcount: number;
    };
    assert.equal(okDinner.subtotalBaseCents, 180000);
    assert.equal(okDinner.feeCents, 36000);
    assert.equal(okDinner.totalEurCents, 216000);
    assert.equal(okDinner.totalHeadcount, 4);

    const savedOrder = await getOrderById(okDinner.orderId);
    assert.ok(savedOrder);
    assert.equal(savedOrder.feeRate, 0.2);
    assert.equal(savedOrder.customer.dietaryNotes, 'No shellfish for 1 guest');

    // 5. T-029c / T-031 Single Pass channel checkout: Bischeri Dinner €140 × 1.20 = €168 (€140 base + €28 fee)
    const spRes = await checkoutPost(
      mkPost({
        locale: 'it',
        currency: 'EUR',
        items: [{ skuId: 'bischeri-dinner-terra', quantity: 1, channel: 'single-pass' }],
        fullName: 'Luca Verdi',
        email: 'luca.sp20@example.com',
        whatsapp: '+39 348 1234567',
        age: 52,
        country: 'Italia',
        acceptedTerms: true,
      }),
    );
    assert.equal(spRes.status, 200);
    const spOk = (await spRes.json()) as {
      ok: boolean;
      orderId: string;
      subtotalBaseCents: number;
      feeRate: number;
      feeCents: number;
      totalEurCents: number;
    };
    assert.equal(spOk.ok, true);
    assert.equal(spOk.subtotalBaseCents, 14000);
    assert.equal(spOk.feeRate, 0.2);
    assert.equal(spOk.feeCents, 2800);
    assert.equal(spOk.totalEurCents, 16800);

    // 6. T-031 Partner venue direct checkout (channel: 'venue'): Bischeri Dinner €140 + 0% fee = €140
    const partnerRes = await checkoutPost(
      mkPost({
        locale: 'it',
        currency: 'EUR',
        items: [{ skuId: 'bischeri-dinner-terra', quantity: 1, channel: 'venue' }],
        fullName: 'Paolo Bianchi',
        email: 'paolo.partner0@example.com',
        whatsapp: '+39 348 9876543',
        age: 54,
        country: 'Italia',
        acceptedTerms: true,
      }),
    );
    assert.equal(partnerRes.status, 200);
    const partnerOk = (await partnerRes.json()) as {
      ok: boolean;
      orderId: string;
      subtotalBaseCents: number;
      feeRate: number;
      feeCents: number;
      totalEurCents: number;
    };
    assert.equal(partnerOk.ok, true);
    assert.equal(partnerOk.subtotalBaseCents, 14000);
    assert.equal(partnerOk.feeRate, 0);
    assert.equal(partnerOk.feeCents, 0);
    assert.equal(partnerOk.totalEurCents, 14000);

    const partnerSavedOrder = await getOrderById(partnerOk.orderId);
    assert.ok(partnerSavedOrder);
    const partnerMail = buildSinglePassOrderEmail(partnerSavedOrder);
    assert.equal(partnerMail.html.includes('Booking fee'), false, 'Partner 0% email must not include Booking fee row');

    // 7. T-031 New non-partner location checkout (channel: 'venue'): Barchetta Como 175€ + 20% (35€) = 210€
    const barchettaRes = await checkoutPost(
      mkPost({
        locale: 'it',
        currency: 'EUR',
        items: [{ skuId: 'barchetta-como-gala-adult', quantity: 1, channel: 'venue' }],
        fullName: 'Chiara Neri',
        email: 'chiara.como@example.com',
        whatsapp: '+39 349 1122334',
        age: 38,
        country: 'Italia',
        acceptedTerms: true,
      }),
    );
    assert.equal(barchettaRes.status, 200);
    const barchettaOk = (await barchettaRes.json()) as {
      ok: boolean;
      orderId: string;
      subtotalBaseCents: number;
      feeRate: number;
      feeCents: number;
      totalEurCents: number;
    };
    assert.equal(barchettaOk.ok, true);
    assert.equal(barchettaOk.subtotalBaseCents, 17500);
    assert.equal(barchettaOk.feeRate, 0.2);
    assert.equal(barchettaOk.feeCents, 3500);
    assert.equal(barchettaOk.totalEurCents, 21000);

    // 8. T-031 New non-partner location checkout: Terminus Como 240€ + 20% (48€) = 288€
    const terminusRes = await checkoutPost(
      mkPost({
        locale: 'en',
        currency: 'EUR',
        items: [{ skuId: 'terminus-como-bar-delle-terme', quantity: 1, channel: 'venue' }],
        fullName: 'James Miller',
        email: 'james.como@example.com',
        whatsapp: '+44 7700 900123',
        age: 41,
        country: 'United Kingdom',
        acceptedTerms: true,
      }),
    );
    assert.equal(terminusRes.status, 200);
    const terminusOk = (await terminusRes.json()) as {
      ok: boolean;
      subtotalBaseCents: number;
      feeRate: number;
      feeCents: number;
      totalEurCents: number;
    };
    assert.equal(terminusOk.subtotalBaseCents, 24000);
    assert.equal(terminusOk.feeRate, 0.2);
    assert.equal(terminusOk.feeCents, 4800);
    assert.equal(terminusOk.totalEurCents, 28800);

    assert.equal(capturedPaymentIntentBodies.length, 7);
    assert.equal(capturedPaymentIntentBodies[0].get('amount'), '115200');
    assert.equal(capturedPaymentIntentBodies[0].get('metadata[fee_rate]'), '0.2');
    assert.equal(capturedPaymentIntentBodies[1].get('amount'), '115200');
    assert.equal(capturedPaymentIntentBodies[1].get('metadata[fee_rate]'), '0.2');
    assert.equal(capturedPaymentIntentBodies[2].get('amount'), '216000');
    assert.equal(capturedPaymentIntentBodies[2].get('metadata[venue_net_eur_cents]'), '180000');
    assert.equal(capturedPaymentIntentBodies[3].get('amount'), '16800');
    assert.equal(capturedPaymentIntentBodies[3].get('metadata[fee_rate]'), '0.2');
    assert.equal(capturedPaymentIntentBodies[3].get('metadata[venue_net_eur_cents]'), '14000');
    assert.equal(capturedPaymentIntentBodies[4].get('amount'), '14000');
    assert.equal(capturedPaymentIntentBodies[4].get('metadata[fee_rate]'), '0');
    assert.equal(capturedPaymentIntentBodies[4].get('metadata[fee_eur_cents]'), '0');
    assert.equal(capturedPaymentIntentBodies[5].get('amount'), '21000');
    assert.equal(capturedPaymentIntentBodies[5].get('metadata[fee_rate]'), '0.2');
    assert.equal(capturedPaymentIntentBodies[6].get('amount'), '28800');
    assert.equal(capturedPaymentIntentBodies[6].get('metadata[fee_rate]'), '0.2');
  } finally {
    globalThis.fetch = origFetch;
    clearMemoryStoreForTests();
    if (prevToken !== undefined) process.env.BLOB_READ_WRITE_TOKEN = prevToken;
    else delete process.env.BLOB_READ_WRITE_TOKEN;
    if (prevStripeKey !== undefined) process.env.STRIPE_SECRET_KEY = prevStripeKey;
    else delete process.env.STRIPE_SECRET_KEY;
  }
});
