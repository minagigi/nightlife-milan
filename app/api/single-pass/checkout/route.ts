import crypto from 'node:crypto';
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
  applySessionCookie,
  createSessionToken,
  hashPassword,
  readSessionFromRequest,
  verifyPassword,
} from '@/lib/single-pass/auth';
import {
  SINGLE_PASS_FEE_RATE,
  VENUE_BY_ID,
  computeSinglePassPrice,
  resolveCatalogSku,
  validateAgeForSkus,
} from '@/lib/single-pass/catalog';
import {
  convertEurBreakdown,
  defaultCurrencyForLocaleAndCountry,
  fetchEurExchangeRates,
  normalizeSupportedCurrency,
} from '@/lib/single-pass/currency';
import {
  generateAccessPin,
  generateOrderId,
  getMemberByEmail,
  normalizeEmail,
  saveMember,
  saveOrder,
} from '@/lib/single-pass/store';
import {
  PUBLIC_PAYMENT_PUBLISHABLE_KEY,
  createEmbeddedPaymentIntentForOrder,
} from '@/lib/single-pass/stripe';
import type {
  OrderAttribution,
  SinglePassCartItemInput,
  SinglePassOrder,
  SinglePassOrderItem,
  SinglePassSku,
} from '@/lib/single-pass/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type CheckoutBody = {
  locale?: string;
  currency?: string;
  items?: SinglePassCartItemInput[];
  fullName?: string;
  email?: string;
  whatsapp?: string;
  age?: number | string;
  country?: string;
  password?: string;
  spokenLanguages?: string[];
  dietaryNotes?: string;
  acceptedTerms?: boolean;
  attribution?: Partial<OrderAttribution>;
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
  const rawItems = Array.isArray(body.items) ? body.items : [];
  if (rawItems.length === 0) {
    return jsonError('Your cart is empty', 'EMPTY_CART', 400);
  }

  const nowMs = Date.now();
  const merged = new Map<
    string,
    { sku: SinglePassSku; qty: number; dietary?: string; addedFromPath?: string; addedFromTitle?: string }
  >();

  for (const rawItem of rawItems.slice(0, 20)) {
    const skuId = String(rawItem?.skuId || '').trim();
    const resolvedSku = resolveCatalogSku(skuId, nowMs);
    if (!resolvedSku) {
      return jsonError(`Confirmed package not available: ${skuId}`, 'INVALID_SKU', 400);
    }
    const qty = Math.max(1, Math.min(10, Math.floor(Number(rawItem.quantity) || 1)));
    const prev = merged.get(resolvedSku.id);
    const dietary = rawItem.dietaryChoice
      ? String(rawItem.dietaryChoice).trim().slice(0, 60)
      : resolvedSku.dietaryPreset;
    const addedFromPath = rawItem.addedFromPath
      ? String(rawItem.addedFromPath).trim().slice(0, 200)
      : undefined;
    const addedFromTitle = rawItem.addedFromTitle
      ? String(rawItem.addedFromTitle).trim().slice(0, 140)
      : undefined;

    merged.set(resolvedSku.id, {
      sku: resolvedSku,
      qty: Math.min(10, (prev?.qty || 0) + qty),
      dietary: dietary || prev?.dietary,
      addedFromPath: addedFromPath || prev?.addedFromPath,
      addedFromTitle: addedFromTitle || prev?.addedFromTitle,
    });
  }

  const resolvedPairs = Array.from(merged.values());
  const fullName = String(body.fullName || '').trim().slice(0, 120);
  const email = normalizeEmail(String(body.email || ''));
  const whatsapp = sanitizeWhatsapp(String(body.whatsapp || ''));
  const age = Number(body.age);
  const ipCountry =
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry') ||
    undefined;
  const ipCity = request.headers.get('x-vercel-ip-city') || undefined;
  const country = String(body.country || ipCountry || '').trim().slice(0, 80) || undefined;
  const password = String(body.password || '').trim();
  const dietaryNotes = String(body.dietaryNotes || '').trim().slice(0, 400);
  const spokenLanguages = Array.isArray(body.spokenLanguages)
    ? body.spokenLanguages.map((v) => String(v).trim().slice(0, 40)).filter(Boolean).slice(0, 10)
    : ['Italiano', 'English'];

  if (!fullName || fullName.length < 2) {
    return jsonError('Full name is required', 'INVALID_CUSTOMER_DATA', 400);
  }
  if (!isValidEmail(email)) {
    return jsonError('Valid email address is required', 'INVALID_CUSTOMER_DATA', 400);
  }
  if (!isValidWhatsapp(whatsapp)) {
    return jsonError('Valid telephone / WhatsApp number is required', 'INVALID_CUSTOMER_DATA', 400);
  }

  const ageCheck = validateAgeForSkus(
    resolvedPairs.map((p) => p.sku),
    age,
  );
  if (!ageCheck.ok) {
    return jsonError(
      ageCheck.errorCode === 'PINETA_STRICT_UNDER_30'
        ? 'Pineta Milano strictly admits Under 30 guests only (18-29).'
        : 'All bookings require attendees to be at least 18 years old.',
      ageCheck.errorCode,
      400,
      { suggestedVenueIds: ageCheck.suggestedVenueIds },
    );
  }

  if (!body.acceptedTerms) {
    return jsonError('Terms & Conditions acceptance is required', 'TERMS_REQUIRED', 400);
  }

  if (password && password.length < 8) {
    return jsonError('Password must be at least 8 characters long', 'INVALID_PASSWORD', 400);
  }

  const existingSession = readSessionFromRequest(request);
  const existingMember = await getMemberByEmail(email);

  if (existingMember?.passwordHash && existingMember.passwordSalt) {
    const alreadySignedInAsMember =
      existingSession && normalizeEmail(existingSession.email) === email;
    if (!alreadySignedInAsMember && password) {
      const okPwd = verifyPassword(password, existingMember.passwordSalt, existingMember.passwordHash);
      if (!okPwd) {
        return jsonError(
          'An account with this email already exists. Use your existing password or leave password blank.',
          'INVALID_CREDENTIALS',
          401,
        );
      }
    }
  }

  const orderItems: SinglePassOrderItem[] = [];
  let subtotalBaseCents = 0;
  let feeCents = 0;
  let totalHeadcount = 0;

  for (const pair of resolvedPairs) {
    const breakdown = computeSinglePassPrice(pair.sku.basePriceCents, pair.qty);
    const venue = VENUE_BY_ID[pair.sku.venueId];
    const guestsPerUnit = Math.max(1, pair.sku.guestsPerUnit || 1);
    const totalGuests = guestsPerUnit * pair.qty;
    subtotalBaseCents += breakdown.lineBaseCents;
    feeCents += breakdown.lineFeeCents;
    totalHeadcount += totalGuests;

    orderItems.push({
      skuId: pair.sku.id,
      venueId: pair.sku.venueId,
      venueName: pair.sku.venueNameOverride || venue?.name || 'Nightlife Milan Venue',
      eventSlug: pair.sku.eventSlugOverride || venue?.eventSlug || 'events',
      category: pair.sku.category,
      title: locale === 'it' ? pair.sku.titleIt : pair.sku.titleEn,
      arrivalTime: pair.sku.arrivalTime,
      ...(pair.dietary ? { dietaryChoice: pair.dietary } : {}),
      guestsPerUnit,
      totalGuests,
      ...(pair.addedFromPath ? { addedFromPath: pair.addedFromPath } : {}),
      ...(pair.addedFromTitle ? { addedFromTitle: pair.addedFromTitle } : {}),
      unitBaseCents: breakdown.unitBaseCents,
      unitFeeCents: breakdown.unitFeeCents,
      unitTotalCents: breakdown.unitTotalCents,
      quantity: pair.qty,
      lineBaseCents: breakdown.lineBaseCents,
      lineFeeCents: breakdown.lineFeeCents,
      lineTotalCents: breakdown.lineTotalCents,
    });
  }

  const totalCents = subtotalBaseCents + feeCents;
  const fxData = await fetchEurExchangeRates();
  const requestedCurrency = body.currency
    ? normalizeSupportedCurrency(body.currency)
    : defaultCurrencyForLocaleAndCountry(locale, ipCountry);
  const fxRate = fxData.rates[requestedCurrency] || 1;
  const quote = convertEurBreakdown(subtotalBaseCents, feeCents, requestedCurrency, fxRate);

  const rawAttr = body.attribution || {};
  const addedFromPaths = Array.from(
    new Set(
      [
        ...resolvedPairs.map((p) => p.addedFromPath).filter((x): x is string => Boolean(x)),
        ...(Array.isArray(rawAttr.addedFromPaths) ? rawAttr.addedFromPaths : []),
      ]
        .map((p) => String(p).trim().slice(0, 200))
        .filter(Boolean),
    ),
  ).slice(0, 12);

  const ua = request.headers.get('user-agent') || '';
  const deviceType: 'mobile' | 'desktop' = /mobile|iphone|android|ipad/i.test(ua)
    ? 'mobile'
    : 'desktop';

  const attribution: OrderAttribution = {
    firstLandingPath: String(rawAttr.firstLandingPath || addedFromPaths[0] || `/${locale}`).slice(0, 200),
    firstLandingAt: String(rawAttr.firstLandingAt || new Date(nowMs).toISOString()).slice(0, 60),
    initialReferrer: String(rawAttr.initialReferrer || request.headers.get('referer') || 'direct').slice(0, 300),
    ...(rawAttr.utmSource ? { utmSource: String(rawAttr.utmSource).slice(0, 80) } : {}),
    ...(rawAttr.utmMedium ? { utmMedium: String(rawAttr.utmMedium).slice(0, 80) } : {}),
    ...(rawAttr.utmCampaign ? { utmCampaign: String(rawAttr.utmCampaign).slice(0, 100) } : {}),
    ...(rawAttr.utmTerm ? { utmTerm: String(rawAttr.utmTerm).slice(0, 100) } : {}),
    ...(rawAttr.utmContent ? { utmContent: String(rawAttr.utmContent).slice(0, 100) } : {}),
    ...(rawAttr.clickId ? { clickId: String(rawAttr.clickId).slice(0, 100) } : {}),
    addedFromPaths,
    checkoutPath: String(rawAttr.checkoutPath || `/${locale}/checkout`).slice(0, 200),
    journeyPaths: Array.isArray(rawAttr.journeyPaths)
      ? rawAttr.journeyPaths.map((p) => String(p).slice(0, 200)).slice(-12)
      : addedFromPaths,
    ...(ipCountry ? { ipCountry } : {}),
    ...(ipCity ? { ipCity: decodeURIComponent(ipCity).slice(0, 80) } : {}),
    ...(ua ? { userAgent: ua.slice(0, 200) } : {}),
    deviceType,
    ...(rawAttr.browserLanguage ? { browserLanguage: String(rawAttr.browserLanguage).slice(0, 40) } : {}),
  };

  const nowIso = new Date().toISOString();
  const memberId = existingMember?.id || `mbr_${crypto.randomBytes(6).toString('hex')}`;
  const orderId = generateOrderId();
  const accessPin = generateAccessPin();

  let passwordSalt = existingMember?.passwordSalt;
  let passwordHash = existingMember?.passwordHash;
  if (password && !passwordHash) {
    const credsHash = hashPassword(password);
    passwordSalt = credsHash.salt;
    passwordHash = credsHash.hash;
  }

  const member = await saveMember({
    id: memberId,
    email,
    fullName,
    whatsapp,
    age,
    ...(country ? { country } : existingMember?.country ? { country: existingMember.country } : {}),
    spokenLanguages:
      spokenLanguages.length > 0 ? spokenLanguages : existingMember?.spokenLanguages || ['Italiano'],
    dietaryNotes: dietaryNotes || existingMember?.dietaryNotes,
    ...(passwordSalt ? { passwordSalt } : {}),
    ...(passwordHash ? { passwordHash } : {}),
    orderIds: [...(existingMember?.orderIds || []), orderId],
    createdAt: existingMember?.createdAt || nowIso,
    updatedAt: nowIso,
  });

  const order: SinglePassOrder = {
    id: orderId,
    accessPin,
    memberId: member.id,
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
      ...(country ? { country } : {}),
      spokenLanguages: member.spokenLanguages,
      ...(dietaryNotes ? { dietaryNotes } : {}),
    },
    items: orderItems,
    totalHeadcount,
    subtotalBaseCents,
    feeRate: SINGLE_PASS_FEE_RATE,
    feeCents,
    totalCents,
    currency: 'eur',
    presentmentCurrency: quote.currency,
    presentmentSubtotalMinor: quote.subtotalMinor,
    presentmentFeeMinor: quote.feeMinor,
    presentmentTotalMinor: quote.totalMinor,
    fxRate: quote.rate,
    fxTimestamp: fxData.updatedAt,
    stripeSessionId: null,
    stripePaymentIntentId: null,
    stripeCheckoutUrl: null,
    whatsappGroupStatus: 'scheduled_dec_20',
    whatsappGroupInviteUrl: null,
    attribution,
    confirmationEmailSentAt: null,
    emailDeliveryError: null,
  };

  await saveOrder(order);

  let clientSecret = '';
  let paymentIntentId = '';
  let finalCurrency: string = quote.currency;
  let finalAmountMinor = quote.totalMinor;

  try {
    const pi = await createEmbeddedPaymentIntentForOrder(order);
    if (!pi) {
      return jsonError(
        'Online payment gateway is temporarily unavailable. Contact Concierge +39 351 912 7047.',
        'PAYMENT_SESSION_ERROR',
        503,
      );
    }
    paymentIntentId = pi.paymentIntentId;
    clientSecret = pi.clientSecret;
    finalCurrency = pi.currencyUsed;
    finalAmountMinor = pi.amountMinorUsed;

    if (finalCurrency !== order.presentmentCurrency || finalAmountMinor !== order.presentmentTotalMinor) {
      order.presentmentCurrency = finalCurrency;
      order.presentmentTotalMinor = finalAmountMinor;
      if (finalCurrency === 'EUR') {
        order.presentmentSubtotalMinor = order.subtotalBaseCents;
        order.presentmentFeeMinor = order.feeCents;
        order.fxRate = 1;
      }
    }
    order.stripePaymentIntentId = paymentIntentId;
    order.updatedAt = new Date().toISOString();
    await saveOrder(order);
  } catch (error) {
    const msg = (error instanceof Error ? error.message : String(error)).replace(/stripe/gi, 'payment gateway');
    return jsonError(`Unable to initialize secure payment: ${msg}`, 'PAYMENT_SESSION_ERROR', 502, {
      orderId: order.id,
    });
  }

  const response = jsonOk({
    orderId: order.id,
    accessPin: order.accessPin,
    clientSecret,
    publishableKey: PUBLIC_PAYMENT_PUBLISHABLE_KEY,
    totalEurCents: order.totalCents,
    subtotalBaseCents: order.subtotalBaseCents,
    feeCents: order.feeCents,
    presentmentCurrency: finalCurrency,
    presentmentSubtotalMinor: order.presentmentSubtotalMinor,
    presentmentFeeMinor: order.presentmentFeeMinor,
    presentmentTotalMinor: finalAmountMinor,
    fxRate: order.fxRate,
    fxTimestamp: order.fxTimestamp,
    totalHeadcount: order.totalHeadcount,
    ageAdvisory: ageCheck.advisoryCode,
    suggestedVenueIds: ageCheck.suggestedVenueIds,
  });

  const token = createSessionToken(member.email, member.id);
  applySessionCookie(response, token);
  return response;
}
