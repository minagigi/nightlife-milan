import {
  checkOriginOrReject,
  jsonError,
  jsonOk,
  sanitizeSinglePassLocale,
  sanitizeWhatsapp,
} from '@/lib/single-pass/apiHelpers';
import {
  SINGLE_PASS_FEE_RATE,
  VENUE_BY_ID,
  computeSinglePassPrice,
  getSkuFeeRate,
  getSkuMaxQuantity,
  isCheckoutItemAllowed,
  resolveCatalogSku,
  resolveItemChannel,
  resolveOrderChannels,
} from '@/lib/single-pass/catalog';
import {
  convertEurBreakdown,
  defaultCurrencyForLocaleAndCountry,
  fetchEurExchangeRates,
  normalizeSupportedCurrency,
} from '@/lib/single-pass/currency';
import {
  markCartDraftCleared,
  sanitizeCartSessionId,
  upsertCartDraft,
} from '@/lib/single-pass/store';
import type {
  CartDraftCustomer,
  OrderAttribution,
  SinglePassCartItemInput,
  SinglePassOrderItem,
} from '@/lib/single-pass/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_RAW_BODY_BYTES = 16_384;

type CartSyncBody = {
  cartSessionId?: string;
  locale?: string;
  currency?: string;
  stage?: 'cart' | 'checkout_form';
  cleared?: boolean;
  items?: SinglePassCartItemInput[];
  customer?: {
    fullName?: string;
    email?: string;
    whatsapp?: string;
    age?: number | string;
    country?: string;
  };
  lastValidationError?: string | null;
  attribution?: Partial<OrderAttribution>;
};

export async function POST(request: Request) {
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

  let body: CartSyncBody;
  try {
    body = JSON.parse(rawText) as CartSyncBody;
  } catch {
    return jsonError('Invalid JSON payload', 'INVALID_JSON', 400);
  }

  const cartSessionId = sanitizeCartSessionId(body.cartSessionId);
  if (!cartSessionId) {
    return jsonError('Invalid cart session identifier', 'INVALID_CART_SESSION', 400);
  }

  const rawItems = Array.isArray(body.items) ? body.items.slice(0, 20) : [];
  if (body.cleared === true || rawItems.length === 0) {
    await markCartDraftCleared(cartSessionId);
    return jsonOk({ cartSessionId, cleared: true });
  }

  const locale = sanitizeSinglePassLocale(body.locale);
  const nowMs = Date.now();
  const merged = new Map<
    string,
    {
      item: SinglePassOrderItem;
    }
  >();

  for (const raw of rawItems) {
    if (!raw || typeof raw.skuId !== 'string') continue;
    const sku = resolveCatalogSku(raw.skuId, nowMs);
    if (!sku) continue;
    const channel = resolveItemChannel(raw);
    if (!isCheckoutItemAllowed(sku, channel).ok) continue;

    const maxQty = getSkuMaxQuantity(sku);
    const qty = Math.max(1, Math.min(maxQty, Math.floor(Number(raw.quantity) || 1)));
    const feeRate = getSkuFeeRate(sku, channel);
    const pricing = computeSinglePassPrice(sku.basePriceCents, qty, feeRate);
    const venueSpec = VENUE_BY_ID[sku.venueId];
    const venueName = sku.venueNameOverride || venueSpec?.name || sku.venueId;
    const eventSlug = sku.eventSlugOverride || venueSpec?.eventSlug || sku.venueId;
    const guestsPerUnit = Math.max(1, sku.guestsPerUnit || 1);
    const key = `${sku.id}::${channel}`;

    const prev = merged.get(key);
    const finalQty = prev ? Math.min(maxQty, prev.item.quantity + qty) : qty;
    const finalPricing = computeSinglePassPrice(sku.basePriceCents, finalQty, feeRate);

    merged.set(key, {
      item: {
        skuId: sku.id,
        venueId: sku.venueId,
        venueName,
        eventSlug,
        channel,
        category: sku.category,
        title: locale === 'it' ? sku.titleIt : sku.titleEn,
        arrivalTime: sku.arrivalTime,
        ...(raw.dietaryChoice ? { dietaryChoice: String(raw.dietaryChoice).slice(0, 60) } : {}),
        guestsPerUnit,
        totalGuests: guestsPerUnit * finalQty,
        ...(raw.addedFromPath ? { addedFromPath: String(raw.addedFromPath).slice(0, 200) } : {}),
        ...(raw.addedFromTitle ? { addedFromTitle: String(raw.addedFromTitle).slice(0, 140) } : {}),
        unitBaseCents: finalPricing.unitBaseCents,
        unitFeeCents: finalPricing.unitFeeCents,
        unitTotalCents: finalPricing.unitTotalCents,
        feeRate,
        quantity: finalQty,
        lineBaseCents: finalPricing.lineBaseCents,
        lineFeeCents: finalPricing.lineFeeCents,
        lineTotalCents: finalPricing.lineTotalCents,
      },
    });
  }

  const orderItems = Array.from(merged.values()).map((entry) => entry.item);
  if (orderItems.length === 0) {
    await markCartDraftCleared(cartSessionId);
    return jsonOk({ cartSessionId, cleared: true });
  }

  const subtotalBaseCents = orderItems.reduce((s, i) => s + i.lineBaseCents, 0);
  const feeCents = orderItems.reduce((s, i) => s + i.lineFeeCents, 0);
  const totalCents = subtotalBaseCents + feeCents;
  const totalHeadcount = orderItems.reduce((s, i) => s + i.totalGuests, 0);
  const venueIds = Array.from(new Set(orderItems.map((i) => i.venueId)));
  const channels = resolveOrderChannels(orderItems);
  const itemSummary = orderItems
    .map((i) => `${i.quantity}x ${i.venueName} - ${i.title}`)
    .join(' | ');

  const ipCountry = (request.headers.get('x-vercel-ip-country') || '').trim().slice(0, 8) || undefined;
  const ipCityRaw = request.headers.get('x-vercel-ip-city') || '';
  let ipCity: string | undefined;
  try {
    ipCity = ipCityRaw ? decodeURIComponent(ipCityRaw).trim().slice(0, 80) : undefined;
  } catch {
    ipCity = ipCityRaw.trim().slice(0, 80) || undefined;
  }
  const ua = (request.headers.get('user-agent') || '').slice(0, 220);
  const deviceType: 'mobile' | 'desktop' = /mobile|iphone|android/i.test(ua) ? 'mobile' : 'desktop';

  const targetCurrency = body.currency
    ? normalizeSupportedCurrency(body.currency)
    : defaultCurrencyForLocaleAndCountry(locale, ipCountry);
  const fxData = await fetchEurExchangeRates();
  const rate = fxData.rates[targetCurrency] || SINGLE_PASS_FEE_RATE || 1;
  const quote = convertEurBreakdown(
    subtotalBaseCents,
    feeCents,
    targetCurrency,
    targetCurrency === 'EUR' ? 1 : rate,
  );

  let customer: CartDraftCustomer | undefined;
  if (body.customer && typeof body.customer === 'object') {
    const cleanName = String(body.customer.fullName || '').trim().slice(0, 120);
    const cleanEmail = String(body.customer.email || '').trim().toLowerCase().slice(0, 160);
    const cleanPhone = sanitizeWhatsapp(String(body.customer.whatsapp || ''));
    const parsedAge = Number(body.customer.age);
    const cleanAge =
      Number.isFinite(parsedAge) && parsedAge >= 14 && parsedAge <= 110
        ? Math.floor(parsedAge)
        : undefined;
    const cleanCountry = String(body.customer.country || '').trim().slice(0, 80);

    const draftCust: CartDraftCustomer = {
      ...(cleanName ? { fullName: cleanName } : {}),
      ...(cleanEmail ? { email: cleanEmail } : {}),
      ...(cleanPhone ? { whatsapp: cleanPhone } : {}),
      ...(cleanAge !== undefined ? { age: cleanAge } : {}),
      ...(cleanCountry ? { country: cleanCountry } : {}),
    };
    if (Object.keys(draftCust).length > 0) {
      customer = draftCust;
    }
  }

  const rawAttr = body.attribution && typeof body.attribution === 'object' ? body.attribution : {};
  const addedFromFromItems = orderItems
    .map((i) => i.addedFromPath)
    .filter((p): p is string => Boolean(p));
  const attribution: Partial<OrderAttribution> = {
    ...(rawAttr.firstLandingPath
      ? { firstLandingPath: String(rawAttr.firstLandingPath).slice(0, 200) }
      : {}),
    ...(rawAttr.firstLandingAt
      ? { firstLandingAt: String(rawAttr.firstLandingAt).slice(0, 60) }
      : {}),
    ...(rawAttr.initialReferrer
      ? { initialReferrer: String(rawAttr.initialReferrer).slice(0, 240) }
      : {}),
    ...(rawAttr.utmSource ? { utmSource: String(rawAttr.utmSource).slice(0, 80) } : {}),
    ...(rawAttr.utmMedium ? { utmMedium: String(rawAttr.utmMedium).slice(0, 80) } : {}),
    ...(rawAttr.utmCampaign ? { utmCampaign: String(rawAttr.utmCampaign).slice(0, 120) } : {}),
    ...(rawAttr.checkoutPath ? { checkoutPath: String(rawAttr.checkoutPath).slice(0, 200) } : {}),
    addedFromPaths: Array.from(
      new Set([
        ...(Array.isArray(rawAttr.addedFromPaths)
          ? rawAttr.addedFromPaths.map((p) => String(p).slice(0, 200))
          : []),
        ...addedFromFromItems,
      ]),
    ).slice(0, 10),
    journeyPaths: Array.isArray(rawAttr.journeyPaths)
      ? rawAttr.journeyPaths.map((p) => String(p).slice(0, 200)).slice(-12)
      : [],
    ...(ipCountry ? { ipCountry } : {}),
    ...(ipCity ? { ipCity } : {}),
    deviceType,
  };

  const nowIso = new Date().toISOString();
  const stage: 'cart' | 'checkout_form' =
    body.stage === 'checkout_form' ? 'checkout_form' : 'cart';
  const cleanValidationError =
    typeof body.lastValidationError === 'string' && body.lastValidationError.trim()
      ? body.lastValidationError.replace(/stripe/gi, 'payment gateway').trim().slice(0, 200)
      : body.lastValidationError === null
        ? null
        : undefined;

  const saved = await upsertCartDraft({
    cartSessionId,
    stage,
    createdAt: nowIso,
    updatedAt: nowIso,
    convertedOrderId: null,
    clearedAt: null,
    locale,
    items: orderItems,
    venueIds,
    channels,
    itemSummary,
    totalHeadcount,
    subtotalBaseCents,
    feeCents,
    totalCents,
    presentmentCurrency: quote.currency,
    presentmentTotalMinor: quote.totalMinor,
    ...(customer ? { customer } : {}),
    ...(cleanValidationError !== undefined ? { lastValidationError: cleanValidationError } : {}),
    attribution,
  });

  return jsonOk({
    cartSessionId: saved.cartSessionId,
    stage: saved.stage,
    convertedOrderId: saved.convertedOrderId,
  });
}
