import { checkOriginOrReject, jsonError, jsonOk } from '@/lib/single-pass/apiHelpers';
import { readSessionFromRequest, resolveRequestOrigin } from '@/lib/single-pass/auth';
import { getOrderById, normalizeEmail, saveOrder } from '@/lib/single-pass/store';
import { createStripeCheckoutSessionForOrder } from '@/lib/single-pass/stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(
  request: Request,
  context: { params: Promise<{ orderId: string }> },
) {
  const originReject = checkOriginOrReject(request);
  if (originReject) return originReject;

  const session = readSessionFromRequest(request);
  if (!session) {
    return jsonError('Authentication required', 'UNAUTHORIZED', 401);
  }

  const { orderId } = await context.params;
  const order = await getOrderById(orderId);
  if (!order) {
    return jsonError('Order not found', 'ORDER_NOT_FOUND', 404);
  }

  if (normalizeEmail(order.customer.email) !== normalizeEmail(session.email)) {
    return jsonError('Not authorized for this order', 'UNAUTHORIZED', 403);
  }

  if (order.status === 'paid') {
    return jsonOk({ orderId: order.id, status: order.status, checkoutUrl: null });
  }

  const origin = resolveRequestOrigin(request);
  try {
    const stripeSession = await createStripeCheckoutSessionForOrder(order, origin);
    if (!stripeSession) {
      return jsonError(
        'Stripe checkout is being finalized. Contact WhatsApp +39 351 912 7047 or retry shortly.',
        'STRIPE_SESSION_ERROR',
        503,
      );
    }

    await saveOrder({
      ...order,
      status: 'awaiting_payment',
      stripeSessionId: stripeSession.sessionId,
      stripeCheckoutUrl: stripeSession.url,
      updatedAt: new Date().toISOString(),
    });

    return jsonOk({
      orderId: order.id,
      status: 'awaiting_payment',
      checkoutUrl: stripeSession.url,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return jsonError(`Stripe session error: ${msg}`, 'STRIPE_SESSION_ERROR', 502);
  }
}
