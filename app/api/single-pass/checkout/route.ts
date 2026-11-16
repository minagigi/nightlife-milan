import crypto from 'node:crypto';
import { localePrefix } from '@/lib/i18n/locales';
import {
  applySessionCookie,
  createSessionToken,
  hashPassword,
  readSessionFromRequest,
  resolveRequestOrigin,
  verifyPassword,
} from '@/lib/single-pass/auth';
import {
  checkOriginOrReject,
  isValidEmail,
  isValidWhatsapp,
  jsonError,
  jsonOk,
  sanitizeSinglePassLocale,
  sanitizeWhatsapp,
} from '@/lib/single-pass/apiHelpers';
import {
  SKU_BY_ID,
  VENUE_BY_ID,
  computeSinglePassPrice,
  validateAgeForSkus,
} from '@/lib/single-pass/catalog';
import { getSinglePassCopy } from '@/lib/single-pass/i18n35';
import {
  generateAccessPin,
  generateOrderId,
  getMemberByEmail,
  normalizeEmail,
  saveMember,
  saveOrder,
} from '@/lib/single-pass/store';
import { createStripeCheckoutSessionForOrder } from '@/lib/single-pass/stripe';
import type {
  SinglePassCartItemInput,
  SinglePassMember,
  SinglePassOrder,
  SinglePassOrderItem,
  SinglePassSku,
} from '@/lib/single-pass/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type CheckoutBody = {
  items?: SinglePassCartItemInput[];
  locale?: string;
  acceptedTerms?: boolean;
  password?: string;
  customer?: {
    fullName?: string;
    email?: string;
    whatsapp?: string;
    age?: number | string;
    spokenLanguages?: string[];
    dietaryNotes?: string;
  };
};

export async function POST(request: Request) {
  const originReject = checkOriginOrReject(request);
  if (originReject) return originReject;

  let body: CheckoutBody;
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return jsonError('Invalid JSON payload', 'INVALID_JSON', 400);
  }

  const locale = sanitizeSinglePassLocale(body.locale);
  const copy = getSinglePassCopy(locale);

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return jsonError('Cart is empty', 'EMPTY_CART', 400);
  }
  if (body.acceptedTerms !== true) {
    return jsonError(copy.formTermsLabel, 'TERMS_REQUIRED', 400);
  }

  const customerRaw = body.customer || {};
  const fullName = String(customerRaw.fullName || '').trim().slice(0, 120);
  const email = normalizeEmail(String(customerRaw.email || ''));
  const whatsapp = sanitizeWhatsapp(String(customerRaw.whatsapp || ''));
  const age = Number(customerRaw.age);
  const spokenLanguages = Array.isArray(customerRaw.spokenLanguages)
    ? customerRaw.spokenLanguages
        .map((v) => String(v).trim().slice(0, 40))
        .filter(Boolean)
        .slice(0, 10)
    : [];
  const dietaryNotes = String(customerRaw.dietaryNotes || '').trim().slice(0, 300);

  if (!fullName || fullName.length < 2 || !isValidEmail(email) || !isValidWhatsapp(whatsapp)) {
    return jsonError(
      'Please provide valid full name, email and WhatsApp number',
      'INVALID_CUSTOMER_DATA',
      400,
    );
  }

  const mergedQtyBySku = new Map<string, { sku: SinglePassSku; qty: number; dietaryChoice?: string }>();
  for (const rawItem of body.items.slice(0, 20)) {
    const skuId = String(rawItem?.skuId || '').trim();
    const sku = SKU_BY_ID.get(skuId);
    if (!sku) {
      return jsonError(`Unknown Single Pass package: ${skuId}`, 'INVALID_SKU', 400);
    }
    const qty = Math.max(1, Math.min(10, Math.floor(Number(rawItem?.quantity) || 1)));
    const existing = mergedQtyBySku.get(skuId);
    const dietaryChoice = rawItem?.dietaryChoice
      ? String(rawItem.dietaryChoice).trim().slice(0, 60)
      : existing?.dietaryChoice;
    mergedQtyBySku.set(skuId, {
      sku,
      qty: Math.min(10, (existing?.qty || 0) + qty),
      dietaryChoice,
    });
  }

  const selectedSkus = Array.from(mergedQtyBySku.values()).map((entry) => entry.sku);
  const ageCheck = validateAgeForSkus(selectedSkus, age);
  if (!ageCheck.ok) {
    const msg = ageCheck.errorCode === 'PINETA_STRICT_UNDER_30' ? copy.pinetaUnder30Error : copy.under18Error;
    return jsonError(msg, ageCheck.errorCode, 400, {
      suggestedVenueIds: ageCheck.suggestedVenueIds,
    });
  }

  const orderItems: SinglePassOrderItem[] = [];
  let subtotalBaseCents = 0;
  let feeCents = 0;
  let totalCents = 0;

  for (const { sku, qty, dietaryChoice } of mergedQtyBySku.values()) {
    const venue = VENUE_BY_ID[sku.venueId];
    const pricing = computeSinglePassPrice(sku.basePriceCents, qty);
    subtotalBaseCents += pricing.lineBaseCents;
    feeCents += pricing.lineFeeCents;
    totalCents += pricing.lineTotalCents;

    orderItems.push({
      skuId: sku.id,
      venueId: venue.id,
      venueName: venue.name,
      eventSlug: venue.eventSlug,
      category: sku.category,
      title: locale === 'it' ? sku.titleIt : sku.titleEn,
      arrivalTime: sku.arrivalTime,
      ...(dietaryChoice ? { dietaryChoice } : {}),
      unitBaseCents: pricing.unitBaseCents,
      unitFeeCents: pricing.unitFeeCents,
      unitTotalCents: pricing.unitTotalCents,
      quantity: qty,
      lineBaseCents: pricing.lineBaseCents,
      lineFeeCents: pricing.lineFeeCents,
      lineTotalCents: pricing.lineTotalCents,
    });
  }

  const existingSession = readSessionFromRequest(request);
  const existingMember = await getMemberByEmail(email);
  const rawPassword = typeof body.password === 'string' ? body.password.trim() : '';

  if (existingMember?.passwordHash && existingMember.passwordSalt) {
    const isAuthenticatedOwner = existingSession?.email === email;
    const passwordMatches = rawPassword
      ? verifyPassword(rawPassword, existingMember.passwordSalt, existingMember.passwordHash)
      : false;
    if (!isAuthenticatedOwner && !passwordMatches) {
      if (rawPassword) {
        return jsonError(
          'An account with this email already exists. Enter your account password or leave blank to authenticate in Reserved Area.',
          'INVALID_CREDENTIALS',
          401,
        );
      }
    }
  } else if (rawPassword && rawPassword.length < 8) {
    return jsonError('Password must be at least 8 characters long', 'INVALID_PASSWORD', 400);
  }

  const nowIso = new Date().toISOString();
  const orderId = generateOrderId();
  const accessPin = generateAccessPin();
  const memberId = existingMember?.id || `mbr_${crypto.randomBytes(6).toString('hex')}`;

  let nextMember: SinglePassMember;
  if (existingMember) {
    const shouldSetPassword =
      !existingMember.passwordHash && rawPassword.length >= 8;
    const pwdFields = shouldSetPassword ? hashPassword(rawPassword) : null;
    nextMember = await saveMember({
      ...existingMember,
      fullName,
      whatsapp,
      age,
      spokenLanguages: spokenLanguages.length > 0 ? spokenLanguages : existingMember.spokenLanguages,
      dietaryNotes: dietaryNotes || existingMember.dietaryNotes,
      ...(pwdFields ? { passwordSalt: pwdFields.salt, passwordHash: pwdFields.hash } : {}),
      orderIds: [orderId, ...existingMember.orderIds],
      updatedAt: nowIso,
    });
  } else {
    const pwdFields = rawPassword.length >= 8 ? hashPassword(rawPassword) : null;
    nextMember = await saveMember({
      id: memberId,
      email,
      fullName,
      whatsapp,
      age,
      spokenLanguages: spokenLanguages.length > 0 ? spokenLanguages : [locale.toUpperCase()],
      dietaryNotes: dietaryNotes || undefined,
      ...(pwdFields ? { passwordSalt: pwdFields.salt, passwordHash: pwdFields.hash } : {}),
      orderIds: [orderId],
      createdAt: nowIso,
      updatedAt: nowIso,
    });
  }

  let order: SinglePassOrder = {
    id: orderId,
    accessPin,
    memberId: nextMember.id,
    status: 'awaiting_payment',
    createdAt: nowIso,
    updatedAt: nowIso,
    paidAt: null,
    locale,
    customer: {
      fullName,
      email,
      whatsapp,
      age,
      spokenLanguages: nextMember.spokenLanguages,
      ...(dietaryNotes ? { dietaryNotes } : {}),
    },
    items: orderItems,
    subtotalBaseCents,
    feeRate: 0.15,
    feeCents,
    totalCents,
    currency: 'eur',
    stripeSessionId: null,
    stripePaymentIntentId: null,
    stripeCheckoutUrl: null,
    whatsappGroupStatus: 'scheduled_dec_20',
    whatsappGroupInviteUrl: null,
    confirmationEmailSentAt: null,
    emailDeliveryError: null,
  };

  await saveOrder(order);

  const siteOrigin = resolveRequestOrigin(request);
  const lp = localePrefix(locale);
  const fallbackAccountUrl = `${lp}/account?order=${encodeURIComponent(order.id)}&stripe=pending_activation`;

  let checkoutUrl: string | null = null;
  try {
    const session = await createStripeCheckoutSessionForOrder(order, siteOrigin);
    if (session) {
      checkoutUrl = session.url;
      order = await saveOrder({
        ...order,
        stripeSessionId: session.sessionId,
        stripeCheckoutUrl: session.url,
        updatedAt: new Date().toISOString(),
      });
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return jsonError(`Stripe checkout creation failed: ${msg}`, 'STRIPE_SESSION_ERROR', 502, {
      orderId: order.id,
    });
  }

  const canIssueSession =
    !existingMember?.passwordHash ||
    existingSession?.email === email ||
    (rawPassword ? verifyPassword(rawPassword, existingMember.passwordSalt || '', existingMember.passwordHash) : false);

  const response = jsonOk({
    orderId: order.id,
    accessPin: order.accessPin,
    status: order.status,
    subtotalBaseCents: order.subtotalBaseCents,
    feeCents: order.feeCents,
    totalCents: order.totalCents,
    checkoutUrl,
    redirectUrl: checkoutUrl || fallbackAccountUrl,
  });

  if (canIssueSession) {
    const token = createSessionToken(nextMember.email, nextMember.id);
    applySessionCookie(response, token);
  }

  return response;
}
