import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { NextRequest } from 'next/server';
import { middleware } from '../middleware';
import { ALL_35_LOCALES } from '../lib/i18n/localizedSlugs35';
import {
  MAGISTER_MIDA_COMPANY,
  getMagisterMidaLegalDocument,
} from '../lib/legal/magisterMidaLegal35';
import {
  CONFIRMED_CAPODANNO_SLUGS,
  DISABLED_DIRECT_CHECKOUT_VENUE_IDS,
  SINGLE_PASS_FEE_RATE,
  SINGLE_PASS_ONLY_VENUE_IDS,
  SINGLE_PASS_SKUS,
  STOREFRONT_VENUES,
  SKU_BY_ID,
  TERRAZZA_DUOMO_FEE_RATE,
  VENUE_BY_ID,
  computeSinglePassPrice,
  getConfirmedSkusForInventoryEvent,
  getSkuFeeRate,
  getVenueIdByEventSlug,
  isCheckoutItemAllowed,
  resolveCatalogSku,
  validateAgeForSkus,
} from '../lib/single-pass/catalog';
import {
  convertEurBreakdown,
  formatMinorCurrency,
} from '../lib/single-pass/currency';
import { buildSinglePassOrderEmail } from '../lib/single-pass/email';
import { SINGLE_PASS_COPY_35, getSinglePassCopy } from '../lib/single-pass/i18n35';
import {
  createSessionToken,
  hashPassword,
  verifyPassword,
  verifySessionToken,
} from '../lib/single-pass/auth';
import {
  clearMemoryStoreForTests,
  decryptVaultJson,
  deleteOrderById,
  encryptVaultJson,
  getMemberByEmail,
  getOrderById,
  getOrdersForMember,
  listAllOrderSummaries,
  saveMember,
  saveOrder,
} from '../lib/single-pass/store';
import {
  buildPaymentIntentParams,
  markOrderPaidIdempotently,
  verifyStripeWebhookSignature,
} from '../lib/single-pass/stripe';
import type { SinglePassOrder } from '../lib/single-pass/types';

const REPO_ROOT = path.resolve(__dirname, '..');

test('Catalog excludes 55-milano & TOM, includes all 8 confirmed Capodanno + holidays + verified future events', () => {
  assert.equal(getVenueIdByEventSlug('capodanno-55-milano'), null);
  assert.equal(getVenueIdByEventSlug('capodanno-tom-the-ordinary-market-milano'), null);
  assert.equal(SKU_BY_ID.get('55-gala-dinner'), undefined);
  assert.equal(resolveCatalogSku('55-club-entry'), null);

  assert.ok(CONFIRMED_CAPODANNO_SLUGS.size >= 30, `Expected >= 30 confirmed Capodanno slugs, got ${CONFIRMED_CAPODANNO_SLUGS.size}`);
  assert.ok(CONFIRMED_CAPODANNO_SLUGS.has('capodanno-bobino-milano'));
  assert.ok(CONFIRMED_CAPODANNO_SLUGS.has('capodanno-terrazza-duomo-21'));
  assert.ok(CONFIRMED_CAPODANNO_SLUGS.has('capodanno-stk-milan'));
  assert.ok(CONFIRMED_CAPODANNO_SLUGS.has('capodanno-hotel-barchetta-excelsior-como'));
  assert.ok(CONFIRMED_CAPODANNO_SLUGS.has('capodanno-albergo-terminus-como'));
  for (const slug of CONFIRMED_CAPODANNO_SLUGS) {
    if (slug === 'capodanno-tom-the-ordinary-market-milano') {
      assert.equal(getVenueIdByEventSlug(slug), null);
    } else {
      assert.ok(getVenueIdByEventSlug(slug), `Confirmed slug missing venue mapping: ${slug}`);
    }
  }
  assert.equal(getVenueIdByEventSlug('christmas-voya-rooftop-milan-2026'), 'voya-christmas');
  assert.equal(getVenueIdByEventSlug('capodanno-voya-rooftop-milano'), 'voya');
  assert.equal(getVenueIdByEventSlug('orthodox-new-year-justme-milan-2027'), null);
  for (const partnerNyeSlug of [
    'capodanno-justme-milano-torre-branca',
    'capodanno-justme-garda-lake',
    'capodanno-pineta-milano',
    'capodanno-aria-club-milano',
    'capodanno-55-milano',
  ]) {
    assert.equal(getVenueIdByEventSlug(partnerNyeSlug), null);
  }
  assert.ok(SINGLE_PASS_ONLY_VENUE_IDS.has('justme'));
  assert.equal(DISABLED_DIRECT_CHECKOUT_VENUE_IDS.has('voya-christmas'), false);

  assert.equal(STOREFRONT_VENUES.length, 8);
  for (const v of STOREFRONT_VENUES) {
    const posterDiskPath = path.join(REPO_ROOT, 'public', v.posterSrc.replace(/^\//, ''));
    assert.ok(fs.existsSync(posterDiskPath), `Missing poster on disk: ${posterDiskPath}`);
    assert.ok(SINGLE_PASS_SKUS.some((s) => s.venueId === v.id), `No SKUs for ${v.id}`);
  }

  for (const sku of SINGLE_PASS_SKUS) {
    assert.equal(sku.genderPolicy, 'equal');
    const venue = VENUE_BY_ID[sku.venueId];
    assert.ok(venue, `Missing venue spec for SKU ${sku.id}`);
    // Single Pass channel always applies 20% fee
    assert.equal(getSkuFeeRate(sku, 'single-pass'), SINGLE_PASS_FEE_RATE);
    // Venue direct channel: 0% for ALL partner formulas, 20% for non-partner venues
    const expectedVenueRate = venue.partner ? 0 : TERRAZZA_DUOMO_FEE_RATE;
    assert.equal(getSkuFeeRate(sku, 'venue'), expectedVenueRate, `Wrong venue fee rate for ${sku.id}`);
    const p1 = computeSinglePassPrice(sku.basePriceCents, 1, expectedVenueRate);
    assert.equal(p1.unitFeeCents, Math.round(sku.basePriceCents * expectedVenueRate));
    assert.equal(p1.unitTotalCents, p1.unitBaseCents + p1.unitFeeCents);
  }

  // Dynamic upcoming paid offer (Gate Milano 240987 verified upcoming vs past October event)
  const gateSkus = getConfirmedSkusForInventoryEvent('240987', Date.parse('2026-11-16T22:00:00Z'));
  assert.ok(gateSkus.length >= 2, 'Expected Gate Milano upcoming confirmed paid offers');
  const firstSku = resolveCatalogSku(gateSkus[0].id, Date.parse('2026-11-16T22:00:00Z'));
  assert.ok(firstSku);
  assert.ok(firstSku.basePriceCents > 0);
  // Past event excluded automatically
  assert.equal(resolveCatalogSku('xceed:243599:0', Date.parse('2026-11-16T22:00:00Z')), null);
});

test('Multi-currency converter respects EUR, USD, JPY zero-decimal, and ISK/HUF integer*100 rules', () => {
  const eur = convertEurBreakdown(10000, 1500, 'EUR', 1);
  assert.equal(eur.totalMinor, 11500);

  const usd = convertEurBreakdown(10000, 1500, 'USD', 1.1);
  assert.equal(usd.subtotalMinor, 11000);
  assert.equal(usd.feeMinor, 1650);
  assert.equal(usd.totalMinor, 12650);

  const jpy = convertEurBreakdown(10000, 1500, 'JPY', 165);
  assert.equal(jpy.subtotalMinor, 16500);
  assert.equal(jpy.feeMinor, 2475);
  assert.equal(jpy.totalMinor, 18975);
  assert.ok(formatMinorCurrency(jpy.totalMinor, 'JPY', 'en').includes('18'));

  const isk = convertEurBreakdown(10000, 1500, 'ISK', 149.4);
  assert.equal(isk.subtotalMinor % 100, 0);
  assert.equal(isk.feeMinor % 100, 0);
  assert.equal(isk.totalMinor % 100, 0);

  const huf = convertEurBreakdown(10000, 1500, 'HUF', 407.6);
  assert.equal(huf.subtotalMinor % 100, 0);
  assert.equal(huf.feeMinor % 100, 0);
});

test('Zero public Stripe wording exists across all public pages, UI components, legal docs, email templates & 35 locales', () => {
  const stripeWordRe = /\bstripe\b/i;

  const wyomingOrAgentRe =
    /(wyoming|cheyenne|fbra|lincolnway|82001|вайоминг|вајоминг|уайоминг|怀俄明|وايومنغ|vaioming|vajoming)/i;

  for (const loc of ALL_35_LOCALES) {
    const pack = SINGLE_PASS_COPY_35[loc];
    assert.ok(pack, `Missing i18n pack for ${loc}`);
    assert.ok(pack.heroH1.length > 10, `Empty heroH1 for ${loc}`);
    assert.ok(pack.feeLabel.includes('20%'), `Missing 20% fee mention in ${loc}`);
    assert.equal(pack.feeLabel.includes('15%'), false, `Legacy 15% fee found in ${loc}`);
    const publicPackFields = JSON.stringify({
      seoTitle: pack.seoTitle,
      seoDescription: pack.seoDescription,
      heroEyebrow: pack.heroEyebrow,
      heroH1: pack.heroH1,
      heroSubtitle: pack.heroSubtitle,
      trustOnlinePayment: pack.trustOnlinePayment,
      howItWorksSteps: pack.howItWorksSteps,
      embeddedBannerTitle: pack.embeddedBannerTitle,
      embeddedBannerBody: pack.embeddedBannerBody,
    });
    assert.equal(
      /15%|20%|\bfee\b|commission|frais|gebühr/i.test(publicPackFields),
      false,
      `Fee/percentage leaked into public Single Pass pack for ${loc}`,
    );
    const serialized = JSON.stringify(pack);
    assert.equal(serialized.includes('!'), false, `Exclamation mark found in ${loc}`);
    assert.equal(serialized.includes('\u2014'), false, `Em-dash found in ${loc}`);
    assert.equal(stripeWordRe.test(serialized), false, `Public Stripe mention in i18n35 ${loc}`);
    assert.equal(/magister/i.test(serialized), false, `Magister Mida found in i18n35 ${loc}`);

    for (const kind of ['terms', 'privacy', 'cookies', 'refund'] as const) {
      const legal = getMagisterMidaLegalDocument(loc, kind);
      const legalJson = JSON.stringify(legal);
      assert.equal(wyomingOrAgentRe.test(legalJson), false, `Wyoming/agent ref found in ${loc} ${kind}`);
      assert.ok(legalJson.includes('447 Broadway, 2nd Floor #2242, New York, NY 10013'), `Missing NY address in ${loc} ${kind}`);
      if (kind === 'terms') {
        assert.ok(legalJson.includes('Magister Mida LLC'), `Missing Magister Mida LLC in ${loc} terms`);
        assert.ok(legalJson.includes(MAGISTER_MIDA_COMPANY.filingId));
        assert.ok(legalJson.includes(MAGISTER_MIDA_COMPANY.ein));
      } else {
        assert.equal(/magister|36-5071848|2023-001288676/i.test(legalJson), false, `Magister Mida/ID leaked into non-terms ${loc} ${kind}`);
      }
      assert.equal(stripeWordRe.test(legalJson), false, `Stripe mention in legal ${loc} ${kind}`);
    }
  }
  assert.equal(getSinglePassCopy('zz-invalid').navShopLabel, SINGLE_PASS_COPY_35.en.navShopLabel);

  const publicFilesToScan = [
    'app/[locale]/single-pass/page.tsx',
    'app/[locale]/new-years-eve/page.tsx',
    'app/[locale]/cart/page.tsx',
    'app/[locale]/checkout/page.tsx',
    'app/[locale]/thank-you/page.tsx',
    'app/[locale]/account/page.tsx',
    'app/[locale]/terms/page.tsx',
    'app/[locale]/privacy/page.tsx',
    'app/[locale]/cookie-policy/page.tsx',
    'app/[locale]/refund-policy/page.tsx',
    'components/Footer.tsx',
    'components/LegalDocumentPage.tsx',
    'components/single-pass/SinglePassStorefront.tsx',
    'components/single-pass/SinglePassVenueModule.tsx',
    'components/single-pass/TerrazzaDuomoBookingModule.tsx',
    'components/single-pass/ConfirmedEventTicketsBox.tsx',
    'components/single-pass/SinglePassCartContext.tsx',
    'components/single-pass/SinglePassCartDrawer.tsx',
    'components/single-pass/SinglePassCartPageView.tsx',
    'components/single-pass/SinglePassCheckoutView.tsx',
    'components/single-pass/SinglePassThankYouView.tsx',
    'components/single-pass/SinglePassAccountView.tsx',
    'components/single-pass/EmbeddedPaymentForm.tsx',
    'lib/single-pass/catalog.ts',
    'lib/single-pass/currency.ts',
    'lib/single-pass/email.ts',
    'lib/single-pass/i18n35.ts',
    'lib/legal/magisterMidaLegal35.ts',
    'lib/capodanno/paymentTerms35.ts',
    'lib/capodanno/gate35.ts',
    'lib/capodanno/bobino35.ts',
    'lib/capodanno/terrazzaDuomo21_35.ts',
    'lib/capodanno/t031Venues35.ts',
    'lib/capodanno/ceresio7Closed35.ts',
    'lib/christmas/voya35.ts',
    'lib/orthodox-nye/justme35.ts',
    'lib/thanksgiving/justme35.ts',
    'components/ThanksgivingJustMeDetailView.tsx',
    'lib/partenopea/justme35.ts',
    'components/PartenopeaJustMeDetailView.tsx',
  ];

  const filesDisallowingMagisterAndNyAddress = new Set([
    'app/[locale]/single-pass/page.tsx',
    'components/Footer.tsx',
    'components/single-pass/SinglePassCartPageView.tsx',
    'components/single-pass/SinglePassCheckoutView.tsx',
    'components/single-pass/SinglePassThankYouView.tsx',
    'components/single-pass/EmbeddedPaymentForm.tsx',
    'lib/single-pass/i18n35.ts',
    'lib/single-pass/email.ts',
    'lib/thanksgiving/justme35.ts',
    'components/ThanksgivingJustMeDetailView.tsx',
    'lib/partenopea/justme35.ts',
    'components/PartenopeaJustMeDetailView.tsx',
  ]);

  for (const rel of publicFilesToScan) {
    const content = fs.readFileSync(path.join(REPO_ROOT, rel), 'utf8');
    const visibleTextContent =
      rel === 'components/single-pass/EmbeddedPaymentForm.tsx'
        ? content
            .replace(/window\.Stripe/g, '')
            .replace(/Stripe\?:/g, '')
            .replace(/https:\/\/js\.stripe\.com\/v3\//g, '')
            .replace(/\/stripe\/gi/g, '')
        : content;
    assert.equal(stripeWordRe.test(visibleTextContent), false, `Found forbidden "Stripe" word in public file: ${rel}`);
    assert.equal(wyomingOrAgentRe.test(content), false, `Found forbidden Wyoming/Cheyenne/FBRA ref in public file: ${rel}`);
    if (filesDisallowingMagisterAndNyAddress.has(rel)) {
      assert.equal(/magister/i.test(content), false, `Found Magister Mida outside Terms in: ${rel}`);
      assert.equal(/447\s+broadway/i.test(content), false, `Found street address outside legal pages in: ${rel}`);
    }
  }
});

test('Age enforcement strictly blocks under-18 everywhere and 30+ on Pineta without suggesting 55-milano', () => {
  const pinetaSku = SKU_BY_ID.get('pineta-gala-dinner')!;
  const bischeriSku = SKU_BY_ID.get('bischeri-dinner-terra')!;
  const justmeSku = SKU_BY_ID.get('justme-club-entry')!;

  const minorCheck = validateAgeForSkus([justmeSku], 17);
  assert.equal(minorCheck.ok, false);
  if (!minorCheck.ok) assert.equal(minorCheck.errorCode, 'UNDER_18');

  const pineta30 = validateAgeForSkus([pinetaSku], 30);
  assert.equal(pineta30.ok, false);
  if (!pineta30.ok) {
    assert.equal(pineta30.errorCode, 'PINETA_STRICT_UNDER_30');
    assert.ok(pineta30.suggestedVenueIds.includes('justme'));
    assert.equal((pineta30.suggestedVenueIds as string[]).includes('55-milano'), false);
  }

  const bischeri55 = validateAgeForSkus([bischeriSku], 55);
  assert.equal(bischeri55.ok, true);
  if (bischeri55.ok) assert.equal(bischeri55.advisoryCode, null);
});

test('Auth password hashing, HMAC session cookie & AES-256-GCM vault round-trip securely', () => {
  const { salt, hash } = hashPassword('MySecretPass2027');
  assert.equal(verifyPassword('MySecretPass2027', salt, hash), true);
  assert.equal(verifyPassword('WrongPass', salt, hash), false);

  const now = 1_790_000_000;
  const tok = createSessionToken('Guest@Example.COM', 'mbr_123', now);
  const decoded = verifySessionToken(tok, now + 60);
  assert.ok(decoded);
  assert.equal(decoded.email, 'guest@example.com');
  assert.equal(verifySessionToken(`${tok}x`, now + 60), null);

  const enc = encryptVaultJson({
    secretKey: 'sk_live_example_123456',
    webhookSecret: 'whsec_example_123456',
    accountId: 'acct_1O2zVeAbG6ToifSY',
    livemode: true,
    updatedAt: '2026-11-16T20:00:00.000Z',
  });
  const dec = decryptVaultJson(enc);
  assert.ok(dec);
  assert.equal(dec.secretKey, 'sk_live_example_123456');
});

test('Order persistence, multi-currency PaymentIntent params (no receipt_email), attribution, delete & email hygiene', async () => {
  const prevToken = process.env.BLOB_READ_WRITE_TOKEN;
  const prevSmtpUser = process.env.SMTP_USER;
  const prevSmtpPass = process.env.SMTP_PASS;
  const prevResend = process.env.RESEND_API_KEY;
  const prevOverride = process.env.EMAIL_TEST_OVERRIDE;
  const origFetch = globalThis.fetch;
  delete process.env.BLOB_READ_WRITE_TOKEN;
  delete process.env.SMTP_USER;
  delete process.env.SMTP_PASS;
  delete process.env.RESEND_API_KEY;
  delete process.env.EMAIL_TEST_OVERRIDE;
  clearMemoryStoreForTests();

  try {
    const sku = SKU_BY_ID.get('bischeri-dinner-terra')!;
    const p = computeSinglePassPrice(sku.basePriceCents, 2);
    const quote = convertEurBreakdown(p.lineBaseCents, p.lineFeeCents, 'USD', 1.1);
    const nowIso = new Date().toISOString();

    await saveMember({
      id: 'mbr_test1',
      email: 'elena@example.com',
      fullName: 'Elena Bianchi',
      whatsapp: '+39 347 1112233',
      age: 54,
      country: 'United States',
      spokenLanguages: ['Italiano', 'English'],
      orderIds: ['NLM-SP-20261116-AABBCC'],
      createdAt: nowIso,
      updatedAt: nowIso,
    });

    const sampleOrder: SinglePassOrder = {
      id: 'NLM-SP-20261116-AABBCC',
      accessPin: '7F9A12',
      memberId: 'mbr_test1',
      status: 'awaiting_payment',
      createdAt: nowIso,
      updatedAt: nowIso,
      paidAt: null,
      locale: 'en',
      customer: {
        fullName: 'Elena Bianchi',
        email: 'elena@example.com',
        whatsapp: '+39 347 1112233',
        age: 54,
        country: 'United States',
        spokenLanguages: ['Italiano', 'English'],
      },
      items: [
        {
          skuId: sku.id,
          venueId: 'bischeri',
          venueName: 'Bischeri Milano · Navigli',
          eventSlug: 'capodanno-bischeri-milano',
          category: sku.category,
          title: sku.titleEn,
          arrivalTime: sku.arrivalTime,
          dietaryChoice: 'terra',
          guestsPerUnit: 1,
          totalGuests: 2,
          addedFromPath: '/events/bischeri-milan-nye-2027',
          unitBaseCents: p.unitBaseCents,
          unitFeeCents: p.unitFeeCents,
          unitTotalCents: p.unitTotalCents,
          quantity: 2,
          lineBaseCents: p.lineBaseCents,
          lineFeeCents: p.lineFeeCents,
          lineTotalCents: p.lineTotalCents,
        },
      ],
      totalHeadcount: 2,
      subtotalBaseCents: p.lineBaseCents,
      feeRate: SINGLE_PASS_FEE_RATE,
      feeCents: p.lineFeeCents,
      totalCents: p.lineTotalCents,
      currency: 'eur',
      presentmentCurrency: quote.currency,
      presentmentSubtotalMinor: quote.subtotalMinor,
      presentmentFeeMinor: quote.feeMinor,
      presentmentTotalMinor: quote.totalMinor,
      fxRate: quote.rate,
      fxTimestamp: nowIso,
      attribution: {
        firstLandingPath: '/events/new-years-eve-events-in-milan-2027',
        firstLandingAt: nowIso,
        initialReferrer: 'https://google.com/',
        utmSource: 'google',
        utmCampaign: 'nye_milan_2027',
        addedFromPaths: ['/events/bischeri-milan-nye-2027'],
        checkoutPath: '/checkout',
        journeyPaths: ['/events/new-years-eve-events-in-milan-2027', '/events/bischeri-milan-nye-2027', '/checkout'],
      },
      stripeSessionId: null,
      stripePaymentIntentId: null,
      stripeCheckoutUrl: null,
      whatsappGroupStatus: 'scheduled_dec_20',
      whatsappGroupInviteUrl: null,
      confirmationEmailSentAt: null,
      emailDeliveryError: null,
    };

    await saveOrder(sampleOrder);
    const loadedOrder = await getOrderById(sampleOrder.id);
    assert.ok(loadedOrder);
    // 2 × €140 = €280 base + 20% (€56) = €336 (33600 cents); USD @ 1.1 = 36960 minor
    assert.equal(loadedOrder.totalCents, 33600);
    assert.equal(loadedOrder.presentmentCurrency, 'USD');
    assert.equal(loadedOrder.presentmentTotalMinor, 36960);

    const piParams = buildPaymentIntentParams(loadedOrder);
    assert.equal(piParams.get('currency'), 'usd');
    assert.equal(piParams.get('amount'), '36960');
    assert.equal(piParams.get('payment_method_types[0]'), 'card');
    assert.equal(piParams.get('receipt_email'), null);
    assert.equal(piParams.get('metadata[order_id]'), sampleOrder.id);

    const emailMsg = buildSinglePassOrderEmail(loadedOrder);
    assert.equal(/\bstripe\b/i.test(emailMsg.html), false);
    assert.equal(/\bstripe\b/i.test(emailMsg.text), false);
    assert.equal(/magister|wyoming|447\s+broadway/i.test(emailMsg.html), false);
    assert.equal(/magister|wyoming|447\s+broadway/i.test(emailMsg.text), false);
    assert.ok(emailMsg.idempotencyKey);

    const rawWebhook = JSON.stringify({ type: 'payment_intent.succeeded' });
    const ts = 1_790_000_000;
    const whSecret = 'whsec_unit_test_secret';
    const sig = crypto.createHmac('sha256', whSecret).update(`${ts}.${rawWebhook}`).digest('hex');
    assert.equal(verifyStripeWebhookSignature(rawWebhook, `t=${ts},v1=${sig}`, whSecret, ts + 20), true);

    const finalizedDryRun = await markOrderPaidIdempotently(sampleOrder.id, {
      stripePaymentIntentId: 'pi_test_1',
    });
    assert.ok(finalizedDryRun);
    assert.equal(finalizedDryRun.status, 'paid');
    assert.equal(finalizedDryRun.confirmationEmailSentAt, null);
    assert.equal(finalizedDryRun.staffEmailSentAt, null);
    assert.match(finalizedDryRun.emailDeliveryError || '', /dry_run/i);
    assert.match(finalizedDryRun.staffEmailError || '', /dry_run/i);

    process.env.RESEND_API_KEY = 're_test_mock_ecommerce';
    let emailSendCalls = 0;
    globalThis.fetch = (async () => {
      emailSendCalls += 1;
      return new Response(JSON.stringify({ id: `email_mock_${emailSendCalls}` }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }) as typeof fetch;

    const finalized1 = await markOrderPaidIdempotently(sampleOrder.id, {
      stripePaymentIntentId: 'pi_test_1',
    });
    assert.ok(finalized1);
    assert.equal(finalized1.status, 'paid');
    assert.ok(finalized1.confirmationEmailSentAt);
    assert.ok(finalized1.staffEmailSentAt);
    assert.equal(finalized1.emailDeliveryError, null);
    assert.equal(finalized1.staffEmailError, null);
    assert.equal(emailSendCalls, 2);

    const member = await getMemberByEmail('elena@example.com');
    assert.ok(member);
    assert.equal((await getOrdersForMember(member)).length, 1);

    const deleted = await deleteOrderById(sampleOrder.id);
    assert.equal(deleted, true);
    assert.equal(await getOrderById(sampleOrder.id), null);
    assert.equal((await listAllOrderSummaries()).length, 0);
  } finally {
    globalThis.fetch = origFetch;
    clearMemoryStoreForTests();
    if (prevToken !== undefined) process.env.BLOB_READ_WRITE_TOKEN = prevToken;
    else delete process.env.BLOB_READ_WRITE_TOKEN;
    if (prevSmtpUser !== undefined) process.env.SMTP_USER = prevSmtpUser;
    else delete process.env.SMTP_USER;
    if (prevSmtpPass !== undefined) process.env.SMTP_PASS = prevSmtpPass;
    else delete process.env.SMTP_PASS;
    if (prevResend !== undefined) process.env.RESEND_API_KEY = prevResend;
    else delete process.env.RESEND_API_KEY;
    if (prevOverride !== undefined) process.env.EMAIL_TEST_OVERRIDE = prevOverride;
    else delete process.env.EMAIL_TEST_OVERRIDE;
  }
});

test('Middleware routes /checkout, /thank-you, /cookie-policy, /refund-policy cleanly and protects /crm', async () => {
  const mkReq = (pathname: string) =>
    new NextRequest(`https://nightlifemilan.com${pathname}`, {
      headers: { 'user-agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)' },
    });

  for (const p of [
    '/single-pass',
    '/cart',
    '/checkout',
    '/thank-you',
    '/cookie-policy',
    '/refund-policy',
    '/it/single-pass',
    '/it/checkout',
    '/it/thank-you',
    '/it/cookie-policy',
    '/it/refund-policy',
  ]) {
    const res = await middleware(mkReq(p));
    assert.equal(res.status, 200, `Expected 200 on ${p}, got ${res.status}`);
  }

  const redirCheckout = await middleware(mkReq('/it/cassa'));
  assert.equal(redirCheckout.status, 308);
  assert.equal(new URL(redirCheckout.headers.get('location')!).pathname, '/it/checkout');

  const redirRefund = await middleware(mkReq('/it/rimborsi'));
  assert.equal(redirRefund.status, 308);
  assert.equal(new URL(redirRefund.headers.get('location')!).pathname, '/it/refund-policy');

  const crmProtected = await middleware(mkReq('/it/crm/single-pass'));
  assert.equal(crmProtected.status, 303);
  const crmLoginUrl = new URL(crmProtected.headers.get('location')!);
  assert.equal(crmLoginUrl.pathname, '/it/crm/login');
  assert.equal(crmLoginUrl.searchParams.get('next'), '/it/crm/single-pass');

  const crmLoginOpen = await middleware(mkReq('/it/crm/login'));
  assert.equal(crmLoginOpen.status, 200);
});

test('JustMe Partenopea (2026-11-27) keeps 6 legacy EUR SKU specs + strict 21+ age check while event-page checkout is blocked', () => {
  const cspSkus = SINGLE_PASS_SKUS.filter((s) => s.venueId === 'justme-partenopea');
  assert.equal(cspSkus.length, 6);
  const dinner = cspSkus.find((s) => s.id === 'justme-partenopea-dinner');
  assert.ok(dinner);
  assert.equal(dinner.basePriceCents, 7000);
  assert.equal(DISABLED_DIRECT_CHECKOUT_VENUE_IDS.has('justme-partenopea'), true);
  assert.equal(isCheckoutItemAllowed(dinner, 'venue').ok, false);
  assert.equal(isCheckoutItemAllowed(dinner, 'single-pass').ok, false);

  const under18 = validateAgeForSkus(cspSkus, 17);
  assert.equal(under18.ok, false);
  if (!under18.ok) assert.equal(under18.errorCode, 'UNDER_18');

  const under21 = validateAgeForSkus(cspSkus, 20);
  assert.equal(under21.ok, false);
  if (!under21.ok) assert.equal(under21.errorCode, 'UNDER_21_JUSTME');

  assert.equal(validateAgeForSkus(cspSkus, 21).ok, true);
});

