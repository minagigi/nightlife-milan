import { checkOriginOrReject, jsonError, jsonOk } from '@/lib/single-pass/apiHelpers';
import { applySessionCookie, createSessionToken } from '@/lib/single-pass/auth';
import { verifyStripeSessionAndFinalizeOrder } from '@/lib/single-pass/stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function handleVerify(orderId: string, sessionId: string) {
  if (!orderId || !sessionId) {
    return jsonError('Missing order or session_id parameter', 'INVALID_CUSTOMER_DATA', 400);
  }
  const result = await verifyStripeSessionAndFinalizeOrder(orderId, sessionId);
  if (!result.order) {
    return jsonError('Order not found', 'ORDER_NOT_FOUND', 404);
  }
  if (!result.ok) {
    return jsonError(
      `Stripe payment not yet confirmed (${result.reason || 'pending'})`,
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
  });
  const token = createSessionToken(result.order.customer.email, result.order.memberId);
  applySessionCookie(response, token);
  return response;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const orderId = (url.searchParams.get('order') || '').trim();
  const sessionId = (url.searchParams.get('session_id') || '').trim();
  return handleVerify(orderId, sessionId);
}

export async function POST(request: Request) {
  const originReject = checkOriginOrReject(request);
  if (originReject) return originReject;
  try {
    const body = (await request.json()) as { orderId?: string; sessionId?: string };
    return handleVerify(String(body.orderId || '').trim(), String(body.sessionId || '').trim());
  } catch {
    return jsonError('Invalid JSON payload', 'INVALID_JSON', 400);
  }
}
