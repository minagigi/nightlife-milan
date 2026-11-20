import { checkOriginOrReject, jsonError, jsonOk } from '@/lib/single-pass/apiHelpers';
import { readSessionFromRequest } from '@/lib/single-pass/auth';
import {
  isCheckoutItemAllowed,
  isSinglePassStorefrontPath,
  resolveCatalogSku,
} from '@/lib/single-pass/catalog';
import { getOrderById, normalizeEmail, saveOrder } from '@/lib/single-pass/store';
import {
  PUBLIC_PAYMENT_PUBLISHABLE_KEY,
  createEmbeddedPaymentIntentForOrder,
} from '@/lib/single-pass/stripe';

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
    return jsonOk({ orderId: order.id, status: order.status, clientSecret: null });
  }

  for (const item of order.items) {
    const effectiveChannel: 'single-pass' | 'venue' =
      item.channel === 'single-pass' ||
      (!item.channel && isSinglePassStorefrontPath(item.addedFromPath))
        ? 'single-pass'
        : 'venue';
    const allowedCheck = isCheckoutItemAllowed({ venueId: item.venueId }, effectiveChannel);
    if (!allowedCheck.ok) {
      return jsonError(allowedCheck.message, allowedCheck.code, 400);
    }
    if (item.skuId.startsWith('xceed:') && !resolveCatalogSku(item.skuId)) {
      return jsonError(
        'This event is booked exclusively via official Xceed or WhatsApp Concierge (+39 351 912 7047).',
        'VENUE_BOOKING_EXTERNAL_ONLY',
        400,
      );
    }
  }

  try {
    const pi = await createEmbeddedPaymentIntentForOrder(order);
    if (!pi) {
      return jsonError(
        'Online payment gateway is being finalized. Contact WhatsApp +39 351 912 7047 or retry shortly.',
        'PAYMENT_SESSION_ERROR',
        503,
      );
    }

    const nextSubtotalMinor =
      pi.currencyUsed === 'EUR' ? order.subtotalBaseCents : order.presentmentSubtotalMinor;
    const nextFeeMinor = pi.currencyUsed === 'EUR' ? order.feeCents : order.presentmentFeeMinor;
    const nextFxRate = pi.currencyUsed === 'EUR' ? 1 : order.fxRate || 1;

    await saveOrder({
      ...order,
      status: 'awaiting_payment',
      stripePaymentIntentId: pi.paymentIntentId,
      presentmentCurrency: pi.currencyUsed,
      presentmentSubtotalMinor: nextSubtotalMinor,
      presentmentFeeMinor: nextFeeMinor,
      presentmentTotalMinor: pi.amountMinorUsed,
      fxRate: nextFxRate,
      updatedAt: new Date().toISOString(),
    });

    return jsonOk({
      orderId: order.id,
      status: 'awaiting_payment',
      clientSecret: pi.clientSecret,
      publishableKey: PUBLIC_PAYMENT_PUBLISHABLE_KEY,
      subtotalBaseCents: order.subtotalBaseCents,
      feeCents: order.feeCents,
      feeRate: order.feeRate,
      totalEurCents: order.totalCents,
      presentmentCurrency: pi.currencyUsed,
      presentmentSubtotalMinor: nextSubtotalMinor,
      presentmentFeeMinor: nextFeeMinor,
      presentmentTotalMinor: pi.amountMinorUsed,
      fxRate: nextFxRate,
      items: order.items,
      customer: {
        fullName: order.customer.fullName,
        email: order.customer.email,
        whatsapp: order.customer.whatsapp,
      },
    });
  } catch (error) {
    const msg = (error instanceof Error ? error.message : String(error)).replace(/stripe/gi, 'payment gateway');
    return jsonError(`Payment initialization error: ${msg}`, 'PAYMENT_SESSION_ERROR', 502);
  }
}
