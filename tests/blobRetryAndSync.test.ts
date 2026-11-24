import assert from 'node:assert/strict';
import test from 'node:test';
import type { GetBlobResult } from '@vercel/blob';
import {
  mapWithConcurrency,
  readPrivateBlobJson,
  type PrivateBlobGetFn,
} from '../lib/blobPrivateRead';
import {
  clearMemoryStoreForTests,
  getOrderById,
  saveOrder,
} from '../lib/single-pass/store';
import { reconcileEcommerceWithGateway } from '../lib/single-pass/stripe';
import type { SinglePassOrder } from '../lib/single-pass/types';

function makeStreamResult(
  jsonText: string,
  customStream?: ReadableStream<Uint8Array>,
): Extract<GetBlobResult, { statusCode: 200 }> {
  const encoder = new TextEncoder();
  const stream =
    customStream ??
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode(jsonText));
        controller.close();
      },
    });
  return {
    statusCode: 200,
    stream,
    headers: new Headers({ 'content-type': 'application/json' }),
    blob: {
      url: 'https://example.private.blob.vercel-storage.com/doc.json',
      downloadUrl: 'https://example.private.blob.vercel-storage.com/doc.json?download=1',
      pathname: 'doc.json',
      contentType: 'application/json',
      contentDisposition: '',
      cacheControl: 'no-cache',
      size: jsonText.length,
      uploadedAt: new Date(),
      etag: 'etag-1',
    },
  };
}

test('readPrivateBlobJson retries transient Vercel Blob 500 errors and mid-stream resets while keeping useCache=false fail-closed by default', async () => {
  const seenUseCache: Array<boolean | undefined> = [];
  let calls = 0;

  const flakyGetter: PrivateBlobGetFn = async (_pathname, opts) => {
    seenUseCache.push(opts.useCache);
    calls += 1;
    if (calls === 1) {
      throw new Error('Vercel Blob: Failed to fetch blob: 500 Internal Server Error');
    }
    if (calls === 2) {
      const brokenStream = new ReadableStream<Uint8Array>({
        pull() {
          throw new Error('Premature close ECONNRESET');
        },
      });
      return makeStreamResult('{}', brokenStream);
    }
    return makeStreamResult(JSON.stringify({ ok: true, count: 42 }));
  };

  const data = await readPrivateBlobJson<{ ok: boolean; count: number }>('test/doc.json', {
    token: 'vercel_blob_rw_dummy_token',
    useCache: false,
    getImpl: flakyGetter,
  });

  assert.deepEqual(data, { ok: true, count: 42 });
  assert.equal(calls, 3);
  assert.deepEqual(seenUseCache, [false, false, false]);
});

test('readPrivateBlobJson returns null on 404 without retrying and does not retry 403 BlobAccessError', async () => {
  let notFoundCalls = 0;
  const res404 = await readPrivateBlobJson('missing.json', {
    token: 'vercel_blob_rw_dummy_token',
    getImpl: async () => {
      notFoundCalls += 1;
      throw new Error('BlobNotFoundError: 404 Not Found');
    },
  });
  assert.equal(res404, null);
  assert.equal(notFoundCalls, 1);

  let authCalls = 0;
  await assert.rejects(
    () =>
      readPrivateBlobJson('forbidden.json', {
        token: 'vercel_blob_rw_dummy_token',
        getImpl: async () => {
          authCalls += 1;
          throw new Error('BlobAccessError: 403 Forbidden');
        },
      }),
    /403 Forbidden/,
  );
  assert.equal(authCalls, 1);
});

test('reconcileEcommerceWithGateway skips deleted historical order_ids and non-actionable PaymentIntents while updating open orders', async () => {
  clearMemoryStoreForTests();
  const prevSecret = process.env.STRIPE_SECRET_KEY;
  const origFetch = globalThis.fetch;

  const nowIso = '2026-11-24T22:00:00.000Z';
  const activeOrder: SinglePassOrder = {
    id: 'NLM-SP-20261124-SYNC01',
    accessPin: '123456',
    memberId: 'mbr_sync',
    status: 'awaiting_payment',
    createdAt: nowIso,
    updatedAt: nowIso,
    paidAt: null,
    locale: 'it',
    customer: {
      fullName: 'Elena Neri',
      email: 'elena@example.com',
      whatsapp: '+39 347 0001112',
      age: 31,
      spokenLanguages: ['Italiano'],
    },
    items: [
      {
        skuId: 'voya-nye-gala-dinner',
        venueId: 'voya',
        venueName: 'Voya Rooftop Milano',
        eventSlug: 'capodanno-voya-rooftop-milano',
        channel: 'venue',
        category: 'gala-dinner',
        title: 'Cenone Voya',
        arrivalTime: '20:00',
        guestsPerUnit: 1,
        totalGuests: 2,
        unitBaseCents: 30000,
        unitFeeCents: 6000,
        unitTotalCents: 36000,
        feeRate: 0.2,
        quantity: 2,
        lineBaseCents: 60000,
        lineFeeCents: 12000,
        lineTotalCents: 72000,
      },
    ],
    totalHeadcount: 2,
    subtotalBaseCents: 60000,
    feeRate: 0.2,
    feeCents: 12000,
    totalCents: 72000,
    currency: 'eur',
    presentmentCurrency: 'EUR',
    presentmentSubtotalMinor: 60000,
    presentmentFeeMinor: 12000,
    presentmentTotalMinor: 72000,
    fxRate: 1,
    fxTimestamp: nowIso,
    stripeSessionId: null,
    stripePaymentIntentId: 'pi_sync_active_01',
    stripeCheckoutUrl: null,
    whatsappGroupStatus: 'scheduled_dec_20',
    whatsappGroupInviteUrl: null,
    confirmationEmailSentAt: null,
    emailDeliveryError: null,
  };
  await saveOrder(activeOrder);

  process.env.STRIPE_SECRET_KEY = 'sk_test_dummy_reconcile_key';
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.includes('/payment_intents?limit=')) {
      return new Response(
        JSON.stringify({
          data: [
            // 1. Deleted historical test order -> skipped cleanly via index/existingIds
            {
              id: 'pi_deleted_old_test',
              status: 'succeeded',
              metadata: { order_id: 'NLM-SP-20261001-DELETED' },
            },
            // 2. Non-actionable open PI without error -> skipped before touching Blob
            {
              id: 'pi_open_no_error',
              status: 'requires_payment_method',
              metadata: { order_id: 'NLM-SP-20261124-SYNC01' },
            },
            // 3. Actionable decline on active order -> updates status to payment_failed
            {
              id: 'pi_sync_active_01',
              status: 'requires_payment_method',
              created: 1_795_555_000,
              metadata: { order_id: 'NLM-SP-20261124-SYNC01' },
              last_payment_error: {
                code: 'card_declined',
                decline_code: 'insufficient_funds',
                type: 'card_error',
                message: 'Your card has insufficient funds.',
              },
            },
          ],
        }),
        { status: 200, headers: { 'content-type': 'application/json' } },
      );
    }
    return new Response('Not found', { status: 404 });
  }) as typeof fetch;

  try {
    const summary = await reconcileEcommerceWithGateway(50);
    assert.equal(summary.ok, true);
    assert.equal(summary.scanned, 3);
    assert.equal(summary.markedFailed, 1);
    assert.equal(summary.skippedErrors, 0);

    const after = await getOrderById(activeOrder.id);
    assert.equal(after?.status, 'payment_failed');
    assert.equal(after?.lastPaymentError?.declineCode, 'insufficient_funds');

    // Second sync run is idempotent -> markedFailed === 0!
    const summary2 = await reconcileEcommerceWithGateway(50);
    assert.equal(summary2.ok, true);
    assert.equal(summary2.markedFailed, 0);
  } finally {
    globalThis.fetch = origFetch;
    if (prevSecret === undefined) delete process.env.STRIPE_SECRET_KEY;
    else process.env.STRIPE_SECRET_KEY = prevSecret;
  }

  // mapWithConcurrency isolates individual worker failures without aborting siblings
  const out = await mapWithConcurrency([1, 2, 3, 4, 5], 2, async (n) => {
    if (n === 3) throw new Error('Simulated single-blob failure');
    return n * 10;
  });
  assert.deepEqual(out, [10, 20, 40, 50]);
});
