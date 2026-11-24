import { checkOriginOrReject, jsonError, jsonOk } from '@/lib/single-pass/apiHelpers';
import { readSessionFromRequest } from '@/lib/single-pass/auth';
import {
  getOrderById,
  normalizeEmail,
  recordOrderPaymentFailure,
} from '@/lib/single-pass/store';
import { fetchEmbeddedPaymentIntent } from '@/lib/single-pass/stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_RAW_BODY_BYTES = 16_384;

type PaymentFailedBody = {
  paymentIntentId?: string;
  code?: string;
  declineCode?: string;
  type?: string;
  message?: string;
};

export async function POST(
  request: Request,
  context: { params: Promise<{ orderId: string }> },
) {
  const originReject = checkOriginOrReject(request);
  if (originReject) return originReject;

  let rawText = '';
  try {
    rawText = await request.text();
  } catch {
    return jsonError('Invalid payload', 'INVALID_JSON', 400);
  }
  if (Buffer.byteLength(rawText, 'utf8') > MAX_RAW_BODY_BYTES) {
    return jsonError('Payload too large', 'PAYLOAD_TOO_LARGE', 413);
  }

  let body: PaymentFailedBody;
  try {
    body = JSON.parse(rawText) as PaymentFailedBody;
  } catch {
    return jsonError('Invalid JSON payload', 'INVALID_JSON', 400);
  }

  const { orderId } = await context.params;
  const order = await getOrderById(orderId);
  if (!order) {
    return jsonError('Order not found', 'ORDER_NOT_FOUND', 404);
  }

  const session = readSessionFromRequest(request);
  const ownsSession =
    Boolean(session) && normalizeEmail(session!.email) === normalizeEmail(order.customer.email);
  const cleanPiId = String(body.paymentIntentId || '').trim().slice(0, 80);
  const matchesOrderPi =
    Boolean(cleanPiId) &&
    Boolean(order.stripePaymentIntentId) &&
    cleanPiId === order.stripePaymentIntentId;

  if (!ownsSession && !matchesOrderPi) {
    return jsonError('Not authorized for this order', 'UNAUTHORIZED', 403);
  }

  if (order.status === 'paid') {
    return jsonOk({ orderId: order.id, status: order.status });
  }

  let verifiedCode = body.code ? String(body.code).slice(0, 64) : undefined;
  let verifiedDecline = body.declineCode ? String(body.declineCode).slice(0, 64) : undefined;
  let verifiedType = body.type ? String(body.type).slice(0, 64) : undefined;
  let verifiedMessage = String(body.message || 'Card payment declined')
    .replace(/stripe/gi, 'payment gateway')
    .trim()
    .slice(0, 240);

  const targetPi = cleanPiId || order.stripePaymentIntentId || '';
  if (targetPi) {
    try {
      const pi = await fetchEmbeddedPaymentIntent(targetPi);
      if (pi?.status === 'succeeded') {
        return jsonOk({ orderId: order.id, status: 'paid' });
      }
      if (pi?.last_payment_error) {
        verifiedCode = pi.last_payment_error.code || verifiedCode;
        verifiedDecline = pi.last_payment_error.decline_code || verifiedDecline;
        verifiedType = pi.last_payment_error.type || verifiedType;
        if (pi.last_payment_error.message) {
          verifiedMessage = pi.last_payment_error.message
            .replace(/stripe/gi, 'payment gateway')
            .trim()
            .slice(0, 240);
        }
      }
    } catch {
      // Keep sanitized client failure info if gateway lookup fails transiently
    }
  }

  const result = await recordOrderPaymentFailure(order.id, {
    code: verifiedCode,
    declineCode: verifiedDecline,
    type: verifiedType,
    message: verifiedMessage,
    paymentIntentId: targetPi || null,
    source: 'client_confirm',
  });

  return jsonOk({
    orderId: order.id,
    status: result.order?.status || 'payment_failed',
    paymentAttempts: result.order?.paymentAttempts || 1,
  });
}
