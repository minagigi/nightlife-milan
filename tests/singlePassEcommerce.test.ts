import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { NextRequest } from 'next/server';
import { middleware } from '../middleware';
import { ALL_35_LOCALES } from '../lib/i18n/localizedSlugs35';
import {
  SINGLE_PASS_FEE_RATE,
  SINGLE_PASS_SKUS,
  SINGLE_PASS_VENUES,
  SKU_BY_ID,
  computeSinglePassPrice,
  getVenueIdByEventSlug,
  validateAgeForSkus,
} from '../lib/single-pass/catalog';
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
  encryptVaultJson,
  getMemberByEmail,
  getOrderById,
  getOrdersForMember,
  listAllOrderSummaries,
  saveMember,
  saveOrder,
} from '../lib/single-pass/store';
import {
  buildCheckoutSessionParams,
  markOrderPaidIdempotently,
  verifyStripeWebhookSignature,
} from '../lib/single-pass/stripe';
import type { SinglePassOrder } from '../lib/single-pass/types';

const REPO_ROOT = path.resolve(__dirname, '..');

test('Single Pass catalog covers all 6 requested venues, 29 SKUs, posters on disk and equal M/F pricing', () => {
  assert.equal(SINGLE_PASS_VENUES.length, 6);
  const venueIds = SINGLE_PASS_VENUES.map((v) => v.id);
  assert.deepEqual(venueIds, ['gate', 'pineta', 'repvblic', 'justme', '55-milano', 'bischeri']);

  assert.equal(SINGLE_PASS_SKUS.length, 29);
  for (const venue of SINGLE_PASS_VENUES) {
    assert.equal(getVenueIdByEventSlug(venue.eventSlug), venue.id);
    const posterDiskPath = path.join(REPO_ROOT, 'public', venue.posterSrc.replace(/^\//, ''));
    assert.ok(fs.existsSync(posterDiskPath), `Missing poster on disk: ${posterDiskPath}`);
    assert.ok(SINGLE_PASS_SKUS.some((s) => s.venueId === venue.id), `No SKUs for ${venue.id}`);
  }

  for (const sku of SINGLE_PASS_SKUS) {
    assert.equal(sku.genderPolicy, 'equal');
    const p1 = computeSinglePassPrice(sku.basePriceCents, 1);
    assert.equal(p1.unitFeeCents, Math.round(sku.basePriceCents * SINGLE_PASS_FEE_RATE));
    assert.equal(p1.unitTotalCents, p1.unitBaseCents + p1.unitFeeCents);

    const p3 = computeSinglePassPrice(sku.basePriceCents, 3);
    assert.equal(p3.lineBaseCents, sku.basePriceCents * 3);
    assert.equal(p3.lineFeeCents, p1.unitFeeCents * 3);
    assert.equal(p3.lineTotalCents, p3.lineBaseCents + p3.lineFeeCents);
  }
});

test('35-locale i18n coverage contains zero exclamation marks and zero em-dashes', () => {
  assert.equal(ALL_35_LOCALES.length, 35);
  for (const loc of ALL_35_LOCALES) {
    const pack = SINGLE_PASS_COPY_35[loc];
    assert.ok(pack, `Missing i18n pack for ${loc}`);
    assert.ok(pack.heroH1.length > 10, `Empty heroH1 for ${loc}`);
    assert.ok(pack.feeLabel.includes('15%'), `Missing +15% fee mention in ${loc}`);
    const serialized = JSON.stringify(pack);
    assert.equal(serialized.includes('!'), false, `Exclamation mark found in ${loc}`);
    assert.equal(serialized.includes('\u2014'), false, `Em-dash found in ${loc}`);
  }
  assert.equal(getSinglePassCopy('zz-invalid').navShopLabel, SINGLE_PASS_COPY_35.en.navShopLabel);
});

test('Age enforcement strictly blocks under-18 everywhere and 30+ on Pineta Milano', () => {
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
  }

  const pineta25 = validateAgeForSkus([pinetaSku], 25);
  assert.equal(pineta25.ok, true);

  const bischeri55 = validateAgeForSkus([bischeriSku], 55);
  assert.equal(bischeri55.ok, true);
  if (bischeri55.ok) assert.equal(bischeri55.advisoryCode, null);

  const advisory55OnJustme = validateAgeForSkus([justmeSku], 55);
  assert.equal(advisory55OnJustme.ok, true);
  if (advisory55OnJustme.ok) assert.equal(advisory55OnJustme.advisoryCode, 'RECOMMEND_BISCHERI_50_PLUS');
});

test('Auth password hashing, HMAC session cookie and AES-256-GCM vault round-trip securely', () => {
  const { salt, hash } = hashPassword('MySecretPass2027');
  assert.equal(verifyPassword('MySecretPass2027', salt, hash), true);
  assert.equal(verifyPassword('WrongPass', salt, hash), false);

  const now = 1_790_000_000;
  const tok = createSessionToken('Guest@Example.COM', 'mbr_123', now);
  const decoded = verifySessionToken(tok, now + 60);
  assert.ok(decoded);
  assert.equal(decoded.email, 'guest@example.com');
  assert.equal(decoded.memberId, 'mbr_123');
  assert.equal(verifySessionToken(`${tok}x`, now + 60), null);
  assert.equal(verifySessionToken(tok, now + 100 * 24 * 3600), null);

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
  assert.equal(dec.accountId, 'acct_1O2zVeAbG6ToifSY');
});

test('Store persistence, Stripe Checkout payload (mode=payment +15% fee), webhook HMAC and idempotent confirmation', async () => {
  const prevToken = process.env.BLOB_READ_WRITE_TOKEN;
  delete process.env.BLOB_READ_WRITE_TOKEN;
  clearMemoryStoreForTests();

  try {
    const sku = SKU_BY_ID.get('bischeri-dinner-terra')!;
    const p = computeSinglePassPrice(sku.basePriceCents, 2);
    const nowIso = new Date().toISOString();

    await saveMember({
      id: 'mbr_test1',
      email: 'elena@example.com',
      fullName: 'Elena Bianchi',
      whatsapp: '+39 347 1112233',
      age: 54,
      spokenLanguages: ['Italiano'],
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
      locale: 'it',
      customer: {
        fullName: 'Elena Bianchi',
        email: 'elena@example.com',
        whatsapp: '+39 347 1112233',
        age: 54,
        spokenLanguages: ['Italiano'],
      },
      items: [
        {
          skuId: sku.id,
          venueId: 'bischeri',
          venueName: 'Bischeri Milano · Speciale Over 50',
          eventSlug: 'capodanno-bischeri-milano',
          category: sku.category,
          title: sku.titleIt,
          arrivalTime: sku.arrivalTime,
          dietaryChoice: 'terra',
          unitBaseCents: p.unitBaseCents,
          unitFeeCents: p.unitFeeCents,
          unitTotalCents: p.unitTotalCents,
          quantity: 2,
          lineBaseCents: p.lineBaseCents,
          lineFeeCents: p.lineFeeCents,
          lineTotalCents: p.lineTotalCents,
        },
      ],
      subtotalBaseCents: p.lineBaseCents,
      feeRate: 0.15,
      feeCents: p.lineFeeCents,
      totalCents: p.lineTotalCents,
      currency: 'eur',
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
    assert.equal(loadedOrder.totalCents, 32200);
    assert.equal(loadedOrder.feeCents, 4200);

    const stripeParams = buildCheckoutSessionParams(loadedOrder, 'https://nightlifemilan.com');
    assert.equal(stripeParams.get('mode'), 'payment');
    assert.equal(stripeParams.get('client_reference_id'), sampleOrder.id);
    assert.equal(stripeParams.get('line_items[0][price_data][unit_amount]'), '14000');
    assert.equal(stripeParams.get('line_items[0][quantity]'), '2');
    assert.equal(stripeParams.get('line_items[1][price_data][unit_amount]'), '4200');
    assert.ok(stripeParams.get('line_items[1][price_data][product_data][name]')?.includes('15%'));

    const rawWebhook = JSON.stringify({ type: 'checkout.session.completed' });
    const ts = 1_790_000_000;
    const whSecret = 'whsec_unit_test_secret';
    const sig = crypto.createHmac('sha256', whSecret).update(`${ts}.${rawWebhook}`).digest('hex');
    assert.equal(verifyStripeWebhookSignature(rawWebhook, `t=${ts},v1=${sig}`, whSecret, ts + 20), true);
    assert.equal(verifyStripeWebhookSignature(rawWebhook, `t=${ts},v1=${sig}`, whSecret, ts + 400), false);
    assert.equal(verifyStripeWebhookSignature(`${rawWebhook} `, `t=${ts},v1=${sig}`, whSecret, ts + 20), false);

    const finalized1 = await markOrderPaidIdempotently(sampleOrder.id, {
      stripeSessionId: 'cs_test_1',
      stripePaymentIntentId: 'pi_test_1',
    });
    assert.ok(finalized1);
    assert.equal(finalized1.status, 'paid');
    assert.ok(finalized1.confirmationEmailSentAt);

    const finalized2 = await markOrderPaidIdempotently(sampleOrder.id, {
      stripeSessionId: 'cs_test_2',
      stripePaymentIntentId: 'pi_test_2',
    });
    assert.ok(finalized2);
    assert.equal(finalized2.confirmationEmailSentAt, finalized1.confirmationEmailSentAt);
    assert.equal(finalized2.stripeSessionId, 'cs_test_1');

    const member = await getMemberByEmail('elena@example.com');
    assert.ok(member);
    const memberOrders = await getOrdersForMember(member);
    assert.equal(memberOrders.length, 1);
    const summaries = await listAllOrderSummaries();
    assert.equal(summaries.length, 1);
  } finally {
    clearMemoryStoreForTests();
    if (prevToken !== undefined) process.env.BLOB_READ_WRITE_TOKEN = prevToken;
  }
});

test('Middleware serves /single-pass, /cart, /account cleanly, redirects IT aliases 1-hop 308 and protects /crm/single-pass', () => {
  const mkReq = (pathname: string) =>
    new NextRequest(`https://nightlifemilan.com${pathname}`, {
      headers: { 'user-agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)' },
    });

  for (const p of ['/single-pass', '/it/single-pass', '/es/single-pass', '/it/cart', '/it/account']) {
    const res = middleware(mkReq(p));
    assert.equal(res.status, 200, `Expected pass-through/rewrite on ${p}, got ${res.status}`);
  }

  const redirCart = middleware(mkReq('/it/carrello'));
  assert.equal(redirCart.status, 308);
  assert.equal(new URL(redirCart.headers.get('location')!).pathname, '/it/cart');

  const redirAccount = middleware(mkReq('/it/area-riservata'));
  assert.equal(redirAccount.status, 308);
  assert.equal(new URL(redirAccount.headers.get('location')!).pathname, '/it/account');

  const crmProtected = middleware(mkReq('/it/crm/single-pass'));
  assert.equal(crmProtected.status, 401);
});
