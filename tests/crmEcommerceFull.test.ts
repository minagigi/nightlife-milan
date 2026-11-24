import assert from 'node:assert/strict';
import test from 'node:test';
import { POST as cartSyncPost } from '../app/api/single-pass/cart-sync/route';
import { POST as paymentFailedPost } from '../app/api/single-pass/orders/[orderId]/payment-failed/route';
import { POST as payOrderPost } from '../app/api/single-pass/orders/[orderId]/pay/route';
import { GET as ecommerceExportGet } from '../app/[locale]/crm/ecommerce-export/route';
import {
  createOrderResumeToken,
  verifyOrderResumeToken,
} from '../lib/single-pass/auth';
import { resolveOrderChannels } from '../lib/single-pass/catalog';
import {
  clearMemoryStoreForTests,
  deleteCartDraftById,
  deleteOrderById,
  getOrderById,
  listAllCartDrafts,
  markCartDraftCleared,
  markCartDraftConverted,
  recordOrderPaymentFailure,
  saveOrder,
  upsertCartDraft,
} from '../lib/single-pass/store';
import { markOrderPaidIdempotently } from '../lib/single-pass/stripe';
import type { SinglePassOrder } from '../lib/single-pass/types';

function makeSampleOrder(overrides: Partial<SinglePassOrder> = {}): SinglePassOrder {
  const nowIso = '2026-11-24T20:00:00.000Z';
  return {
    id: 'NLM-SP-20261124-AAA111',
    accessPin: 'ABCDEF',
    memberId: 'mbr_test1',
    status: 'awaiting_payment',
    createdAt: nowIso,
    updatedAt: nowIso,
    paidAt: null,
    locale: 'it',
    customer: {
      fullName: 'Marco Verdi',
      email: 'marco.verdi@example.com',
      whatsapp: '+39 340 123 4567',
      age: 29,
      country: 'Italia',
      spokenLanguages: ['Italiano'],
    },
    items: [
      {
        skuId: 'voya-gala-dinner',
        venueId: 'voya',
        venueName: 'Voya Rooftop Milano',
        eventSlug: 'capodanno-voya-rooftop-milano',
        channel: 'venue',
        category: 'gala-dinner',
        title: 'Gran Cenone Voya',
        arrivalTime: '20:30',
        guestsPerUnit: 1,
        totalGuests: 2,
        unitBaseCents: 20000,
        unitFeeCents: 4000,
        unitTotalCents: 24000,
        feeRate: 0.2,
        quantity: 2,
        lineBaseCents: 40000,
        lineFeeCents: 8000,
        lineTotalCents: 48000,
      },
    ],
    totalHeadcount: 2,
    subtotalBaseCents: 40000,
    feeRate: 0.2,
    feeCents: 8000,
    totalCents: 48000,
    currency: 'eur',
    presentmentCurrency: 'EUR',
    presentmentSubtotalMinor: 40000,
    presentmentFeeMinor: 8000,
    presentmentTotalMinor: 48000,
    fxRate: 1,
    fxTimestamp: nowIso,
    stripeSessionId: null,
    stripePaymentIntentId: 'pi_test_live_like_001',
    stripeCheckoutUrl: null,
    whatsappGroupStatus: 'scheduled_dec_20',
    whatsappGroupInviteUrl: null,
    confirmationEmailSentAt: null,
    emailDeliveryError: null,
    ...overrides,
  };
}

test('recordOrderPaymentFailure deduplicates identical client + webhook + gateway_sync declines and never downgrades paid orders', async () => {
  clearMemoryStoreForTests();
  const order = makeSampleOrder();
  await saveOrder(order);

  // 1. Client confirm reports decline
  const r1 = await recordOrderPaymentFailure(order.id, {
    at: '2026-11-24T20:01:00.000Z',
    code: 'card_declined',
    type: 'card_error',
    message: 'Your card has insufficient funds.',
    paymentIntentId: 'pi_test_live_like_001',
    source: 'client_confirm',
  });
  assert.equal(r1.recordedNewAttempt, true);
  assert.equal(r1.order?.status, 'payment_failed');
  assert.equal(r1.order?.paymentAttempts, 1);

  // 2. Webhook arrives 3 seconds later with same PI & code + declineCode enrichment -> deduplicated!
  const r2 = await recordOrderPaymentFailure(order.id, {
    at: '2026-11-24T20:01:03.000Z',
    code: 'card_declined',
    declineCode: 'insufficient_funds',
    type: 'card_error',
    message: 'Your card has insufficient funds.',
    paymentIntentId: 'pi_test_live_like_001',
    source: 'webhook',
  });
  assert.equal(r2.recordedNewAttempt, false);
  assert.equal(r2.order?.paymentAttempts, 1);
  assert.equal(r2.order?.lastPaymentError?.declineCode, 'insufficient_funds');

  // 3. Gateway sync runs later -> still deduplicated, attempts stays 1!
  const r3 = await recordOrderPaymentFailure(order.id, {
    at: '2026-11-24T20:15:00.000Z',
    code: 'card_declined',
    declineCode: 'insufficient_funds',
    type: 'card_error',
    message: 'Your card has insufficient funds.',
    paymentIntentId: 'pi_test_live_like_001',
    source: 'gateway_sync',
  });
  assert.equal(r3.recordedNewAttempt, false);
  assert.equal(r3.order?.paymentAttempts, 1);

  // 4. Customer retries with a second card and gets a different decline (do_not_honor) -> attempts becomes 2!
  const r4 = await recordOrderPaymentFailure(order.id, {
    at: '2026-11-24T20:05:00.000Z',
    code: 'card_declined',
    declineCode: 'do_not_honor',
    type: 'card_error',
    message: 'Your card was declined.',
    paymentIntentId: 'pi_test_live_like_001',
    source: 'client_confirm',
  });
  assert.equal(r4.recordedNewAttempt, true);
  assert.equal(r4.order?.paymentAttempts, 2);

  // 5. Customer retries and succeeds -> status becomes 'paid'
  const paid = await markOrderPaidIdempotently(order.id, {
    stripePaymentIntentId: 'pi_test_live_like_001',
  });
  assert.equal(paid?.status, 'paid');

  // 6. Delayed webhook or out-of-order saveOrder can NEVER downgrade 'paid' back to 'payment_failed'
  const rAfterPaid = await recordOrderPaymentFailure(order.id, {
    code: 'card_declined',
    message: 'Late webhook',
    paymentIntentId: 'pi_test_live_like_001',
    source: 'webhook',
  });
  assert.equal(rAfterPaid.recordedNewAttempt, false);
  assert.equal(rAfterPaid.order?.status, 'paid');

  const staleAttempt = await saveOrder({ ...order, status: 'awaiting_payment' });
  assert.equal(staleAttempt.status, 'paid');
  assert.equal((await getOrderById(order.id))?.status, 'paid');
});

test('Pre-checkout AbandonedCartRecord lifecycle: cart -> checkout_form merge -> conversion zero duplicates -> fresh cycle after paid -> GC on clear', async () => {
  clearMemoryStoreForTests();
  const sessionA = 'a1b2c3d4e5f60718293a4b5c6d7e8f9011223344';

  // Step 1: Visitor adds Single Pass item on /it/single-pass (+20% fee)
  const req1 = new Request('https://nightlifemilan.com/api/single-pass/cart-sync', {
    method: 'POST',
    headers: {
      Origin: 'https://nightlifemilan.com',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cartSessionId: sessionA,
      locale: 'it',
      currency: 'EUR',
      stage: 'cart',
      items: [
        {
          skuId: 'justme-club-entry',
          quantity: 2,
          channel: 'single-pass',
          addedFromPath: '/it/single-pass',
        },
      ],
      attribution: {
        firstLandingPath: '/it/single-pass',
        utmSource: 'instagram',
      },
    }),
  });
  const res1 = await cartSyncPost(req1);
  assert.equal(res1.status, 200);

  let drafts = await listAllCartDrafts();
  assert.equal(drafts.length, 1);
  assert.equal(drafts[0].stage, 'cart');
  assert.ok(drafts[0].feeCents > 0, 'Single Pass channel must include +20% fee');
  assert.deepEqual(drafts[0].channels, ['single-pass']);

  // Step 2: Visitor opens /it/checkout and types partial contact details + hits validation error
  const req2 = new Request('https://nightlifemilan.com/api/single-pass/cart-sync', {
    method: 'POST',
    headers: {
      Origin: 'https://nightlifemilan.com',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cartSessionId: sessionA,
      locale: 'it',
      currency: 'EUR',
      stage: 'checkout_form',
      items: [
        {
          skuId: 'justme-club-entry',
          quantity: 2,
          channel: 'single-pass',
          addedFromPath: '/it/single-pass',
        },
      ],
      customer: {
        fullName: 'Giulia Bianchi',
        whatsapp: '+39 333 9876543',
      },
      lastValidationError: 'Accetta i termini per procedere',
    }),
  });
  const res2 = await cartSyncPost(req2);
  assert.equal(res2.status, 200);

  // Step 3: Subsequent stage='cart' sync must NOT erase customer or downgrade stage
  const req3 = new Request('https://nightlifemilan.com/api/single-pass/cart-sync', {
    method: 'POST',
    headers: {
      Origin: 'https://nightlifemilan.com',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cartSessionId: sessionA,
      locale: 'it',
      currency: 'EUR',
      stage: 'cart',
      items: [
        {
          skuId: 'justme-club-entry',
          quantity: 3,
          channel: 'single-pass',
        },
      ],
    }),
  });
  await cartSyncPost(req3);

  drafts = await listAllCartDrafts();
  assert.equal(drafts.length, 1);
  assert.equal(drafts[0].stage, 'checkout_form');
  assert.equal(drafts[0].customer?.fullName, 'Giulia Bianchi');
  assert.equal(drafts[0].customer?.whatsapp, '+39 333 9876543');
  assert.equal(drafts[0].attribution?.utmSource, 'instagram');

  // Step 4: Cart converts into an open order -> disappears from pre-checkout abandoned carts (zero duplicates!)
  const openOrder = makeSampleOrder({
    id: 'NLM-SP-20261124-BBB222',
    cartSessionId: sessionA,
    status: 'awaiting_payment',
  });
  await saveOrder(openOrder);
  await markCartDraftConverted(sessionA, openOrder.id);

  assert.equal((await listAllCartDrafts()).length, 0);

  // While openOrder is still awaiting_payment, a late cart-sync keeps convertedOrderId (still zero duplicates!)
  await cartSyncPost(req3);
  assert.equal((await listAllCartDrafts()).length, 0);

  // Step 5: Once openOrder is paid, if the same browser starts a new cart later, it opens a fresh cycle
  await markOrderPaidIdempotently(openOrder.id);
  const reqNewCycle = new Request('https://nightlifemilan.com/api/single-pass/cart-sync', {
    method: 'POST',
    headers: {
      Origin: 'https://nightlifemilan.com',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cartSessionId: sessionA,
      locale: 'it',
      currency: 'EUR',
      stage: 'cart',
      items: [{ skuId: 'voya-nye-gala-dinner', quantity: 2, channel: 'venue' }],
    }),
  });
  await cartSyncPost(reqNewCycle);
  drafts = await listAllCartDrafts();
  assert.equal(drafts.length, 1);
  assert.equal(drafts[0].convertedOrderId, null);
  // Voya Rooftop on 'venue' channel applies +20% fee (non-partner rule)
  assert.equal(drafts[0].feeCents, 12000);
  assert.equal(drafts[0].customer, undefined);

  // Step 6: Emptying cart clears it from active list
  await markCartDraftCleared(sessionA);
  assert.equal((await listAllCartDrafts()).length, 0);
});

test('Guest payment-failed endpoint authorizes via matching paymentIntentId and rejects unauthorized callers', async () => {
  clearMemoryStoreForTests();
  const order = makeSampleOrder({
    id: 'NLM-SP-20261124-CCC333',
    stripePaymentIntentId: 'pi_guest_secret_match_999',
  });
  await saveOrder(order);

  // Unauthorized request (wrong PI, no session cookie) -> 403
  const badReq = new Request(
    `https://nightlifemilan.com/api/single-pass/orders/${order.id}/payment-failed`,
    {
      method: 'POST',
      headers: {
        Origin: 'https://nightlifemilan.com',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentIntentId: 'pi_wrong_id',
        code: 'card_declined',
        message: 'Spoof attempt',
      }),
    },
  );
  const badRes = await paymentFailedPost(badReq, {
    params: Promise.resolve({ orderId: order.id }),
  });
  assert.equal(badRes.status, 403);
  assert.equal((await getOrderById(order.id))?.status, 'awaiting_payment');

  // Authorized guest request (matching paymentIntentId, no session cookie) -> 200 & status='payment_failed'
  const goodReq = new Request(
    `https://nightlifemilan.com/api/single-pass/orders/${order.id}/payment-failed`,
    {
      method: 'POST',
      headers: {
        Origin: 'https://nightlifemilan.com',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentIntentId: 'pi_guest_secret_match_999',
        code: 'card_declined',
        declineCode: 'generic_decline',
        type: 'card_error',
        message: 'Stripe declined card',
      }),
    },
  );
  const goodRes = await paymentFailedPost(goodReq, {
    params: Promise.resolve({ orderId: order.id }),
  });
  assert.equal(goodRes.status, 200);
  const updated = await getOrderById(order.id);
  assert.equal(updated?.status, 'payment_failed');
  assert.equal(updated?.paymentAttempts, 1);
  assert.equal(updated?.lastPaymentError?.declineCode, 'generic_decline');
  assert.equal(/stripe/i.test(updated?.lastPaymentError?.message || ''), false);
});

test('HMAC WhatsApp order resume token validates cross-device recovery and blocks tampering', async () => {
  clearMemoryStoreForTests();
  const order = makeSampleOrder({
    id: 'NLM-SP-20261124-DDD444',
    status: 'payment_failed',
  });
  await saveOrder(order);

  const nowSec = 1_795_000_000;
  const token = createOrderResumeToken(order.id, order.customer.email, nowSec);
  assert.equal(verifyOrderResumeToken(token, order.id, order.customer.email, nowSec + 3600), true);
  assert.equal(verifyOrderResumeToken(token, 'NLM-SP-OTHER', order.customer.email, nowSec), false);
  assert.equal(verifyOrderResumeToken(token, order.id, 'other@example.com', nowSec), false);
  assert.equal(
    verifyOrderResumeToken(token, order.id, order.customer.email, nowSec + 40 * 86400),
    false,
  );

  // Calling /pay without cookie and without valid resumeToken returns 401
  const unauthPay = await payOrderPost(
    new Request(`https://nightlifemilan.com/api/single-pass/orders/${order.id}/pay`, {
      method: 'POST',
      headers: { Origin: 'https://nightlifemilan.com', 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    }),
    { params: Promise.resolve({ orderId: order.id }) },
  );
  assert.equal(unauthPay.status, 401);

  // resolveOrderChannels handles mixed and legacy items cleanly
  assert.deepEqual(
    resolveOrderChannels([
      { channel: 'single-pass' },
      { addedFromPath: '/it/eventi/capodanno-voya-rooftop-milano' },
    ]),
    ['single-pass', 'venue'],
  );

  // Deleting an order also cleans up linked cart draft
  const linkedCartId = 'bbbbccccddddeeeeffff00001111222233334444';
  await upsertCartDraft({
    cartSessionId: linkedCartId,
    stage: 'cart',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    convertedOrderId: order.id,
    clearedAt: null,
    locale: 'it',
    items: order.items,
    venueIds: ['voya'],
    channels: ['venue'],
    itemSummary: '2x Voya',
    totalHeadcount: 2,
    subtotalBaseCents: 40000,
    feeCents: 8000,
    totalCents: 48000,
    presentmentCurrency: 'EUR',
    presentmentTotalMinor: 48000,
  });
  await saveOrder({ ...order, cartSessionId: linkedCartId });
  await deleteOrderById(order.id);
  assert.equal(await deleteCartDraftById(linkedCartId), false);
});

test('CRM ecommerce-export route enforces CRM session authentication (401 unauthenticated)', async () => {
  const unauthRes = await ecommerceExportGet(
    new Request('https://nightlifemilan.com/it/crm/ecommerce-export'),
  );
  assert.equal(unauthRes.status, 401);
});
