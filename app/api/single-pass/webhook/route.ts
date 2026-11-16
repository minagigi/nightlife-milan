import { jsonError, jsonOk } from '@/lib/single-pass/apiHelpers';
import { getOrderById, saveOrder } from '@/lib/single-pass/store';
import {
  markOrderPaidIdempotently,
  resolveStripeCredentials,
  verifyStripeWebhookSignature,
} from '@/lib/single-pass/stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type StripeWebhookEvent = {
  id?: string;
  type?: string;
  data?: {
    object?: {
      id?: string;
      payment_status?: string;
      client_reference_id?: string | null;
      payment_intent?: string | { id?: string } | null;
      metadata?: Record<string, string>;
    };
  };
};

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get('stripe-signature');
  const creds = await resolveStripeCredentials();

  if (!creds?.webhookSecret) {
    return jsonError('Stripe webhook secret not configured', 'UNAUTHORIZED', 503);
  }

  if (!verifyStripeWebhookSignature(rawBody, signature, creds.webhookSecret)) {
    return jsonError('Invalid Stripe signature', 'UNAUTHORIZED', 400);
  }

  let event: StripeWebhookEvent;
  try {
    event = JSON.parse(rawBody) as StripeWebhookEvent;
  } catch {
    return jsonError('Invalid webhook JSON', 'INVALID_JSON', 400);
  }

  const obj = event.data?.object;
  const orderId = obj?.client_reference_id || obj?.metadata?.order_id || '';

  if (
    orderId &&
    (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded')
  ) {
    if (obj?.payment_status === 'paid' || event.type === 'checkout.session.async_payment_succeeded') {
      const piId =
        typeof obj?.payment_intent === 'string'
          ? obj.payment_intent
          : obj?.payment_intent?.id || null;
      await markOrderPaidIdempotently(orderId, {
        stripeSessionId: obj?.id || null,
        stripePaymentIntentId: piId,
      });
    }
  } else if (orderId && event.type === 'checkout.session.expired') {
    const existing = await getOrderById(orderId);
    if (existing && existing.status === 'awaiting_payment') {
      await saveOrder({
        ...existing,
        status: 'expired',
        updatedAt: new Date().toISOString(),
      });
    }
  }

  return jsonOk({ received: true, eventType: event.type || 'unknown' });
}
