import { checkOriginOrReject, jsonError, jsonOk } from '@/lib/single-pass/apiHelpers';
import { applySessionCookie, createSessionToken, readSessionFromRequest } from '@/lib/single-pass/auth';
import { getOrderById, normalizeEmail } from '@/lib/single-pass/store';
import {
  verifyPaymentIntentAndFinalizeOrder,
  verifyStripeSessionAndFinalizeOrder,
} from '@/lib/single-pass/stripe';
import type { SinglePassOrder } from '@/lib/single-pass/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function sanitizeOrderForClient(order: SinglePassOrder) {
  return {
    id: order.id,
    accessPin: order.accessPin,
    status: order.status,
    paidAt: order.paidAt,
    createdAt: order.createdAt,
    locale: order.locale,
    customer: {
      fullName: order.customer.fullName,
      email: order.customer.email,
      whatsapp: order.customer.whatsapp,
      age: order.customer.age,
      country: order.customer.country,
      spokenLanguages: order.customer.spokenLanguages,
      ...(order.customer.dietaryNotes ? { dietaryNotes: order.customer.dietaryNotes } : {}),
    },
    items: order.items,
    totalHeadcount:
      typeof order.totalHeadcount === 'number' && order.totalHeadcount > 0
        ? order.totalHeadcount
        : order.items.reduce(
            (s, i) => s + (typeof i.totalGuests === 'number' ? i.totalGuests : i.quantity),
            0,
          ),
    subtotalBaseCents: order.subtotalBaseCents,
    feeRate: order.feeRate,
    feeCents: order.feeCents,
    totalCents: order.totalCents,
    presentmentCurrency: order.presentmentCurrency || 'EUR',
    presentmentSubtotalMinor: order.presentmentSubtotalMinor ?? order.subtotalBaseCents,
    presentmentFeeMinor: order.presentmentFeeMinor ?? order.feeCents,
    presentmentTotalMinor: order.presentmentTotalMinor ?? order.totalCents,
    fxRate: order.fxRate ?? 1,
    whatsappGroupStatus: order.whatsappGroupStatus,
    whatsappGroupInviteUrl: order.whatsappGroupInviteUrl,
  };
}

async function handleVerify(
  request: Request,
  orderId: string,
  paymentIntentId: string,
  sessionId: string,
) {
  if (!orderId) {
    return jsonError('Missing order parameter', 'INVALID_CUSTOMER_DATA', 400);
  }

  const existing = await getOrderById(orderId);
  if (!existing) {
    return jsonError('Order not found', 'ORDER_NOT_FOUND', 404);
  }

  // If already paid, require matching session cookie OR paymentIntentId/sessionId possession
  if (existing.status === 'paid') {
    const sess = readSessionFromRequest(request);
    const ownsSession = sess && normalizeEmail(sess.email) === normalizeEmail(existing.customer.email);
    const ownsPi =
      Boolean(paymentIntentId) &&
      Boolean(existing.stripePaymentIntentId) &&
      paymentIntentId === existing.stripePaymentIntentId;
    const ownsCheckoutSess =
      Boolean(sessionId) &&
      Boolean(existing.stripeSessionId) &&
      sessionId === existing.stripeSessionId;

    if (!ownsSession && !ownsPi && !ownsCheckoutSess) {
      return jsonError('Sign in to view this confirmed voucher', 'UNAUTHORIZED', 401);
    }
    const response = jsonOk({
      orderId: existing.id,
      status: existing.status,
      paidAt: existing.paidAt,
      whatsappGroupStatus: existing.whatsappGroupStatus,
      order: sanitizeOrderForClient(existing),
    });
    const token = createSessionToken(existing.customer.email, existing.memberId);
    applySessionCookie(response, token);
    return response;
  }

  const result = sessionId
    ? await verifyStripeSessionAndFinalizeOrder(orderId, sessionId)
    : await verifyPaymentIntentAndFinalizeOrder(orderId, paymentIntentId || existing.stripePaymentIntentId || undefined);

  if (!result.order) {
    return jsonError('Order not found', 'ORDER_NOT_FOUND', 404);
  }
  if (!result.ok) {
    return jsonError(
      `Payment confirmation pending (${result.reason || 'pending'})`,
      'PAYMENT_NOT_CONFIRMED',
      402,
      { status: result.order.status, orderId: result.order.id },
    );
  }

  const response = jsonOk({
    orderId: result.order.id,
    status: result.order.status,
    paidAt: result.order.paidAt,
    whatsappGroupStatus: result.order.whatsappGroupStatus,
    order: sanitizeOrderForClient(result.order),
  });
  const token = createSessionToken(result.order.customer.email, result.order.memberId);
  applySessionCookie(response, token);
  return response;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const orderId = (url.searchParams.get('order') || '').trim();
  const paymentIntentId = (url.searchParams.get('payment_intent') || '').trim();
  const sessionId = (url.searchParams.get('session_id') || '').trim();
  return handleVerify(request, orderId, paymentIntentId, sessionId);
}

export async function POST(request: Request) {
  const originReject = checkOriginOrReject(request);
  if (originReject) return originReject;
  try {
    const body = (await request.json()) as {
      orderId?: string;
      paymentIntentId?: string;
      sessionId?: string;
    };
    return handleVerify(
      request,
      String(body.orderId || '').trim(),
      String(body.paymentIntentId || '').trim(),
      String(body.sessionId || '').trim(),
    );
  } catch {
    return jsonError('Invalid JSON payload', 'INVALID_JSON', 400);
  }
}
