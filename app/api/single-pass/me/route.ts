import {
  checkOriginOrReject,
  isValidWhatsapp,
  jsonError,
  jsonOk,
  sanitizeWhatsapp,
} from '@/lib/single-pass/apiHelpers';
import { readSessionFromRequest } from '@/lib/single-pass/auth';
import {
  getMemberByEmail,
  getOrdersForMember,
  saveMember,
  saveOrder,
} from '@/lib/single-pass/store';
import { getStripeCredentialStatus } from '@/lib/single-pass/stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const session = readSessionFromRequest(request);
  if (!session) {
    return jsonError('Not signed in', 'UNAUTHORIZED', 401);
  }
  const member = await getMemberByEmail(session.email);
  if (!member) {
    return jsonError('Member profile not found', 'UNAUTHORIZED', 401);
  }
  const [orders, stripeStatus] = await Promise.all([
    getOrdersForMember(member),
    getStripeCredentialStatus(),
  ]);

  return jsonOk({
    member: {
      id: member.id,
      email: member.email,
      fullName: member.fullName,
      whatsapp: member.whatsapp,
      age: member.age,
      spokenLanguages: member.spokenLanguages,
      dietaryNotes: member.dietaryNotes || '',
      hasPassword: Boolean(member.passwordHash),
      createdAt: member.createdAt,
    },
    orders,
    stripeConfigured: stripeStatus.configured,
  });
}

export async function PATCH(request: Request) {
  const originReject = checkOriginOrReject(request);
  if (originReject) return originReject;

  const session = readSessionFromRequest(request);
  if (!session) {
    return jsonError('Not signed in', 'UNAUTHORIZED', 401);
  }
  const member = await getMemberByEmail(session.email);
  if (!member) {
    return jsonError('Member profile not found', 'UNAUTHORIZED', 401);
  }

  let body: { whatsapp?: string; spokenLanguages?: string[]; dietaryNotes?: string };
  try {
    body = (await request.json()) as {
      whatsapp?: string;
      spokenLanguages?: string[];
      dietaryNotes?: string;
    };
  } catch {
    return jsonError('Invalid JSON payload', 'INVALID_JSON', 400);
  }

  const nextWhatsapp = body.whatsapp !== undefined ? sanitizeWhatsapp(body.whatsapp) : member.whatsapp;
  if (!isValidWhatsapp(nextWhatsapp)) {
    return jsonError('Please provide a valid WhatsApp number', 'INVALID_CUSTOMER_DATA', 400);
  }

  const nextLanguages = Array.isArray(body.spokenLanguages)
    ? body.spokenLanguages.map((v) => String(v).trim().slice(0, 40)).filter(Boolean).slice(0, 10)
    : member.spokenLanguages;

  const nextDietary =
    body.dietaryNotes !== undefined ? String(body.dietaryNotes).trim().slice(0, 300) : member.dietaryNotes;

  const updatedMember = await saveMember({
    ...member,
    whatsapp: nextWhatsapp,
    spokenLanguages: nextLanguages.length > 0 ? nextLanguages : member.spokenLanguages,
    dietaryNotes: nextDietary || undefined,
    updatedAt: new Date().toISOString(),
  });

  // Sync updated WhatsApp & languages onto the user's orders for concierge Dec 20 matching
  const orders = await getOrdersForMember(updatedMember);
  await Promise.all(
    orders.map((order) =>
      saveOrder({
        ...order,
        customer: {
          ...order.customer,
          whatsapp: updatedMember.whatsapp,
          spokenLanguages: updatedMember.spokenLanguages,
          dietaryNotes: updatedMember.dietaryNotes,
        },
        updatedAt: new Date().toISOString(),
      }),
    ),
  );

  return jsonOk({
    member: {
      id: updatedMember.id,
      email: updatedMember.email,
      fullName: updatedMember.fullName,
      whatsapp: updatedMember.whatsapp,
      age: updatedMember.age,
      spokenLanguages: updatedMember.spokenLanguages,
      dietaryNotes: updatedMember.dietaryNotes || '',
      hasPassword: Boolean(updatedMember.passwordHash),
    },
  });
}
