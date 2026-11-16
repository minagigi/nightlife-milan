import { checkOriginOrReject, isValidEmail, jsonError, jsonOk } from '@/lib/single-pass/apiHelpers';
import { applySessionCookie, createSessionToken } from '@/lib/single-pass/auth';
import { getOrderById, normalizeEmail } from '@/lib/single-pass/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const originReject = checkOriginOrReject(request);
  if (originReject) return originReject;

  let body: { email?: string; orderId?: string };
  try {
    body = (await request.json()) as { email?: string; orderId?: string };
  } catch {
    return jsonError('Invalid JSON payload', 'INVALID_JSON', 400);
  }

  const email = normalizeEmail(String(body.email || ''));
  const orderId = String(body.orderId || '').trim().toUpperCase();

  if (!isValidEmail(email) || !orderId) {
    return jsonError('Provide both email and order reference (NLM-SP-...)', 'INVALID_CREDENTIALS', 400);
  }

  const order = await getOrderById(orderId);
  if (!order || normalizeEmail(order.customer.email) !== email) {
    return jsonError('Order not found for this email address', 'ORDER_NOT_FOUND', 404);
  }

  const token = createSessionToken(order.customer.email, order.memberId);
  const response = jsonOk({
    orderId: order.id,
    email: order.customer.email,
  });
  applySessionCookie(response, token);
  return response;
}
