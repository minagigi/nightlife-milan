import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import {
  DINNER_DIETARY_OPTIONS,
  SINGLE_PASS_FEE_RATE,
  SINGLE_PASS_SKUS,
  SKU_BY_ID,
  getConfirmedSkusForInventoryEvent,
  getSkuFeeRate,
  isCheckoutItemAllowed,
  isSinglePassMiniGroupOrder,
  resolveCatalogSku,
} from '../lib/single-pass/catalog';
import {
  STAFF_ACTIVATION_EMAIL,
  buildSinglePassOrderEmail,
  buildStaffActivationEmail,
} from '../lib/single-pass/email';
import { getSinglePassCopy } from '../lib/single-pass/i18n35';
import type { SinglePassOrder } from '../lib/single-pass/types';
import { cartRowKey } from '../components/single-pass/SinglePassCartContext';

const REPO_ROOT = path.resolve(__dirname, '..');

test('REPVBLIC & Gate partner venues apply 0% fee on ALL venue-channel formulas and +20% only on /single-pass', () => {
  for (const vid of ['repvblic', 'gate', 'bischeri'] as const) {
    const venueSkus = SINGLE_PASS_SKUS.filter((s) => s.venueId === vid);
    assert.ok(venueSkus.length >= 2, `Expected multiple SKUs for ${vid}`);
    for (const sku of venueSkus) {
      assert.equal(getSkuFeeRate(sku, 'venue'), 0, `Expected 0% venue fee on ${sku.id} (${sku.category})`);
      assert.equal(
        getSkuFeeRate(sku, 'single-pass'),
        SINGLE_PASS_FEE_RATE,
        `Expected +20% single-pass fee on ${sku.id}`,
      );
    }
  }

  // Gate NYE duplicate inventory event 247797 is 0%, while regular weekly event 240987 stays +20%
  const gateNyeSkus = getConfirmedSkusForInventoryEvent('247797', Date.parse('2026-11-20T12:00:00Z'));
  assert.ok(gateNyeSkus.length >= 1, 'Expected Gate 247797 upcoming confirmed offers');
  const gateNyeSku = resolveCatalogSku(gateNyeSkus[0].id, Date.parse('2026-11-20T12:00:00Z'));
  assert.ok(gateNyeSku, `Missing resolved SKU ${gateNyeSkus[0].id}`);
  assert.equal(getSkuFeeRate(gateNyeSku, 'venue'), 0);

  const regularGateSkus = getConfirmedSkusForInventoryEvent('240987', Date.parse('2026-11-16T22:00:00Z'));
  assert.ok(regularGateSkus.length >= 1, 'Expected Gate 240987 upcoming confirmed offers');
  const regularGateSku = resolveCatalogSku(regularGateSkus[0].id, Date.parse('2026-11-16T22:00:00Z'));
  assert.ok(regularGateSku, `Missing resolved SKU ${regularGateSkus[0].id}`);
  assert.equal(getSkuFeeRate(regularGateSku, 'venue'), 0.2);

  // ConfirmedEventTicketsBox uses getSkuFeeRate(sku, 'venue') === 0
  const confirmedBoxSrc = fs.readFileSync(
    path.join(REPO_ROOT, 'components/single-pass/ConfirmedEventTicketsBox.tsx'),
    'utf8',
  );
  assert.equal(confirmedBoxSrc.includes("getSkuFeeRate(sku, 'venue') === 0"), true);
});

test('Mini-group WhatsApp eligibility includes bobino on single-pass and excludes non-solo venue orders', () => {
  assert.equal(isSinglePassMiniGroupOrder([{ venueId: 'bobino', channel: 'single-pass' }]), true);
  assert.equal(isSinglePassMiniGroupOrder([{ venueId: 'bobino' }]), true);
  assert.equal(isSinglePassMiniGroupOrder([{ venueId: 'repvblic', channel: 'venue' }]), false);
  assert.equal(isSinglePassMiniGroupOrder([{ venueId: 'bobino', channel: 'venue' }]), false);
  assert.equal(isSinglePassMiniGroupOrder([{ venueId: 'terrazza-duomo-21', channel: 'venue' }]), false);

  const copyIt = getSinglePassCopy('it');
  const bobinoSoloOrder: SinglePassOrder = {
    id: 'NLM-SP-20261121-BOB01',
    accessPin: '12AB34',
    memberId: 'mbr_bob',
    status: 'paid',
    createdAt: '2026-11-21T10:00:00.000Z',
    updatedAt: '2026-11-21T10:00:00.000Z',
    paidAt: '2026-11-21T10:00:00.000Z',
    locale: 'it',
    customer: {
      fullName: 'Sara Rossi',
      email: 'sara@example.com',
      whatsapp: '+39 340 1234567',
      age: 34,
      country: 'Italia',
      spokenLanguages: ['Italiano'],
    },
    items: [
      {
        skuId: 'bobino-gala-dinner',
        venueId: 'bobino',
        venueName: 'Bobino Milano',
        eventSlug: 'capodanno-bobino-milano',
        category: 'gala-dinner',
        title: 'Gran Cenone Bobino',
        arrivalTime: '20:30',
        guestsPerUnit: 1,
        totalGuests: 1,
        channel: 'single-pass',
        feeRate: 0.2,
        unitBaseCents: 12000,
        unitFeeCents: 2400,
        unitTotalCents: 14400,
        quantity: 1,
        lineBaseCents: 12000,
        lineFeeCents: 2400,
        lineTotalCents: 14400,
      },
    ],
    totalHeadcount: 1,
    subtotalBaseCents: 12000,
    feeRate: 0.2,
    feeCents: 2400,
    totalCents: 14400,
    currency: 'eur',
    presentmentCurrency: 'EUR',
    presentmentSubtotalMinor: 12000,
    presentmentFeeMinor: 2400,
    presentmentTotalMinor: 14400,
    fxRate: 1,
    fxTimestamp: '2026-11-21T10:00:00.000Z',
    stripeSessionId: null,
    stripePaymentIntentId: 'pi_test_bob_1',
    stripeCheckoutUrl: null,
    whatsappGroupStatus: 'scheduled_dec_20',
    whatsappGroupInviteUrl: null,
    confirmationEmailSentAt: null,
    emailDeliveryError: null,
  };

  const bobinoCustMail = buildSinglePassOrderEmail(bobinoSoloOrder);
  assert.equal(bobinoCustMail.text.includes(copyIt.miniGroupNoticeBody), true);

  const bobinoStaffMail = buildStaffActivationEmail(bobinoSoloOrder);
  assert.equal(bobinoStaffMail.to, STAFF_ACTIVATION_EMAIL);
  assert.match(bobinoStaffMail.subject, /\[SINGLE PASS DA SOLI\]/);
  assert.equal(/\bstripe\b/i.test(bobinoStaffMail.html), false);
  assert.equal(/\bstripe\b/i.test(bobinoStaffMail.text), false);

  const repvblicVenueOrder: SinglePassOrder = {
    ...bobinoSoloOrder,
    id: 'NLM-SP-20261121-REP01',
    items: [
      {
        ...bobinoSoloOrder.items[0],
        skuId: 'repvblic-table-share',
        venueId: 'repvblic',
        venueName: 'REPVBLIC Milano',
        eventSlug: 'capodanno-repvblic-milano',
        category: 'vip-table-share',
        title: 'VIP Table Share',
        channel: 'venue',
        feeRate: 0,
        unitFeeCents: 0,
        unitTotalCents: 12000,
        lineFeeCents: 0,
        lineTotalCents: 12000,
      },
    ],
    feeRate: 0,
    feeCents: 0,
    totalCents: 12000,
    presentmentFeeMinor: 0,
    presentmentTotalMinor: 12000,
  };

  const repvblicCustMail = buildSinglePassOrderEmail(repvblicVenueOrder);
  assert.equal(repvblicCustMail.text.includes(copyIt.miniGroupNoticeBody), false);

  const repvblicStaffMail = buildStaffActivationEmail(repvblicVenueOrder);
  assert.equal(repvblicStaffMail.to, STAFF_ACTIVATION_EMAIL);
  assert.match(repvblicStaffMail.subject, /\[PARTNER 0%\]/);
  assert.equal(/\bstripe\b/i.test(repvblicStaffMail.html), false);

  // Strictly isolated dual-channel keys
  assert.notEqual(
    cartRowKey({ skuId: 'gate-early-bird', channel: 'venue' }),
    cartRowKey({ skuId: 'gate-early-bird', channel: 'single-pass' }),
  );
  assert.equal(DINNER_DIETARY_OPTIONS.length, 4);

  // Storefront & JSON-LD exclude vip-table-full and remain clean of forbidden tokens
  const storefrontSrc = fs.readFileSync(
    path.join(REPO_ROOT, 'components/single-pass/SinglePassStorefront.tsx'),
    'utf8',
  );
  const singlePassPageSrc = fs.readFileSync(
    path.join(REPO_ROOT, 'app/[locale]/single-pass/page.tsx'),
    'utf8',
  );
  assert.equal(storefrontSrc.includes("s.category !== 'vip-table-full'"), true);
  assert.equal(singlePassPageSrc.includes("sku.category !== 'vip-table-full'"), true);

  // Protected partner venues still reject direct venue-channel checkout
  for (const protectedVid of ['justme', 'justme-garda', 'pineta', 'voya'] as const) {
    const sku = SKU_BY_ID.get(
      SINGLE_PASS_SKUS.find((s) => s.venueId === protectedVid)?.id || '',
    );
    assert.ok(sku);
    assert.equal(isCheckoutItemAllowed(sku, 'venue').ok, false);
  }
});
