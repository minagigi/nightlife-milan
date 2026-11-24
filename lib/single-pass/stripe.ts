import crypto from 'node:crypto';
import { localePrefix } from '@/lib/i18n/locales';
import { sendAttendeeEmail } from '@/lib/emailTransport';
import { SINGLE_PASS_FEE_RATE } from './catalog';
import { buildSinglePassOrderEmail, buildStaffActivationEmail } from './email';
import { formatFeeLabel35 } from './i18n35';
import {
  getOrderById,
  listAllOrderSummaries,
  listExistingOrderIds,
  normalizeOrderIdKey,
  readStripeVaultConfig,
  recordOrderPaymentFailure,
  saveOrder,
  writeStripeVaultConfig,
} from './store';
import type {
  SinglePassOrder,
  StripeCredentialStatus,
  StripeVaultConfig,
} from './types';

const STRIPE_API_BASE = 'https://api.stripe.com/v1';

/**
 * Public client-side tokenization key paired with connected account acct_1O2zVeAbG6ToifSY.
 * Publishable keys are safe for browser Elements use only.
 */
export const PUBLIC_PAYMENT_PUBLISHABLE_KEY =
  (process.env.NEXT_PUBLIC_PAYMENT_PUBLIC_KEY || '').trim() ||
  'pk_live_51O2zVeAbG6ToifSYGR7Awn0frY7LDmN9VZKACgJCRBaPGkBMzzXrHVKWfi8ERA6D0R6IIbQ6F3HfflRJmHXAZl9A00aqo8Nunz';

export type ResolvedStripeCredentials = {
  secretKey: string;
  webhookSecret: string;
  source: 'env' | 'vault';
  accountId: string | null;
  livemode: boolean | null;
};

function maskSecret(key: string): string {
  const clean = key.trim();
  if (clean.length <= 12) return '****';
  return `${clean.slice(0, 7)}...${clean.slice(-4)}`;
}

export async function resolveStripeCredentials(): Promise<ResolvedStripeCredentials | null> {
  const envKey = (process.env.STRIPE_SECRET_KEY || '').trim();
  const envWebhook = (process.env.STRIPE_WEBHOOK_SECRET || '').trim();
  if (envKey) {
    return {
      secretKey: envKey,
      webhookSecret: envWebhook,
      source: 'env',
      accountId: 'acct_1O2zVeAbG6ToifSY',
      livemode: !envKey.startsWith('sk_test_') && !envKey.startsWith('rk_test_'),
    };
  }
  const vault = await readStripeVaultConfig();
  if (vault?.secretKey) {
    return {
      secretKey: vault.secretKey,
      webhookSecret: vault.webhookSecret || '',
      source: 'vault',
      accountId: vault.accountId || null,
      livemode: Boolean(vault.livemode),
    };
  }
  return null;
}

export async function getStripeCredentialStatus(): Promise<StripeCredentialStatus> {
  const creds = await resolveStripeCredentials();
  if (!creds) {
    return {
      configured: false,
      source: 'none',
      accountId: 'acct_1O2zVeAbG6ToifSY',
      livemode: null,
      maskedKey: null,
      webhookConfigured: false,
    };
  }
  return {
    configured: true,
    source: creds.source,
    accountId: creds.accountId,
    livemode: creds.livemode,
    maskedKey: maskSecret(creds.secretKey),
    webhookConfigured: Boolean(creds.webhookSecret),
  };
}

export function buildPaymentIntentParams(
  order: SinglePassOrder,
  overrideCurrency?: string,
  overrideAmountMinor?: number,
): URLSearchParams {
  const params = new URLSearchParams();
  const currency = (overrideCurrency || order.presentmentCurrency || 'EUR').toLowerCase();
  const amount = overrideAmountMinor ?? (order.presentmentTotalMinor || order.totalCents);

  params.set('amount', String(Math.max(50, Math.round(amount))));
  params.set('currency', currency);
  // Card + Apple Pay + Google Pay wallets without external link branding; never set receipt_email.
  params.set('payment_method_types[0]', 'card');
  params.set('description', `Nightlife Milan Order ${order.id} (${order.totalHeadcount || 1} pax)`);

  params.set('metadata[order_id]', order.id);
  params.set('metadata[customer_name]', order.customer.fullName.slice(0, 80));
  params.set('metadata[customer_email]', order.customer.email.slice(0, 100));
  params.set('metadata[customer_phone]', order.customer.whatsapp.slice(0, 40));
  params.set('metadata[customer_age]', String(order.customer.age));
  params.set('metadata[eur_total_cents]', String(order.totalCents));
  params.set('metadata[presentment_currency]', currency.toUpperCase());
  params.set('metadata[fx_rate]', String(order.fxRate || 1));
  const effectiveFeeRate = typeof order.feeRate === 'number' ? order.feeRate : SINGLE_PASS_FEE_RATE;
  params.set('metadata[headcount]', String(order.totalHeadcount ?? 1));
  params.set('metadata[locale]', order.locale);
  params.set('metadata[fee_rate]', String(effectiveFeeRate));
  params.set('metadata[venue_net_eur_cents]', String(order.subtotalBaseCents));
  params.set('metadata[fee_eur_cents]', String(order.feeCents));
  if (order.attribution?.firstLandingPath) {
    params.set('metadata[first_landing]', order.attribution.firstLandingPath.slice(0, 120));
  }
  if (order.attribution?.addedFromPaths?.length) {
    params.set('metadata[added_from]', order.attribution.addedFromPaths.join(',').slice(0, 180));
  }

  return params;
}

export type EmbeddedPaymentIntentResult = {
  paymentIntentId: string;
  clientSecret: string;
  currencyUsed: string;
  amountMinorUsed: number;
};

type RawPaymentIntentResponse = {
  id?: string;
  client_secret?: string;
  status?: string;
  amount?: number;
  currency?: string;
  created?: number;
  metadata?: Record<string, string>;
  last_payment_error?: {
    code?: string;
    decline_code?: string;
    type?: string;
    message?: string;
  } | null;
};

export async function fetchEmbeddedPaymentIntent(
  paymentIntentId: string,
): Promise<RawPaymentIntentResponse | null> {
  const creds = await resolveStripeCredentials();
  if (!creds) return null;

  const res = await fetch(`${STRIPE_API_BASE}/payment_intents/${encodeURIComponent(paymentIntentId)}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${creds.secretKey}` },
  });
  if (!res.ok) return null;
  return (await res.json()) as RawPaymentIntentResponse;
}

export async function createEmbeddedPaymentIntentForOrder(
  order: SinglePassOrder,
): Promise<EmbeddedPaymentIntentResult | null> {
  const creds = await resolveStripeCredentials();
  if (!creds) return null;

  // Reuse an existing open PaymentIntent if present and currency/amount match
  const targetCurrency = (order.presentmentCurrency || 'EUR').toUpperCase();
  const targetAmount = order.presentmentTotalMinor || order.totalCents;

  if (order.stripePaymentIntentId) {
    const existing = await fetchEmbeddedPaymentIntent(order.stripePaymentIntentId);
    const existingCur = (existing?.currency || '').toUpperCase();
    const matchesAmountAndCurrency =
      (!existingCur || existingCur === targetCurrency) &&
      (typeof existing?.amount !== 'number' || existing.amount === Math.max(50, Math.round(targetAmount)));
    if (
      existing?.client_secret &&
      existing.status &&
      ['requires_payment_method', 'requires_confirmation', 'requires_action'].includes(existing.status) &&
      matchesAmountAndCurrency
    ) {
      return {
        paymentIntentId: existing.id || order.stripePaymentIntentId,
        clientSecret: existing.client_secret,
        currencyUsed: (existing.currency || order.presentmentCurrency || 'EUR').toUpperCase(),
        amountMinorUsed: existing.amount ?? order.presentmentTotalMinor ?? order.totalCents,
      };
    }
  }

  const attemptCreate = async (currency: string, amountMinor: number) => {
    const body = buildPaymentIntentParams(order, currency, amountMinor);
    const res = await fetch(`${STRIPE_API_BASE}/payment_intents`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${creds.secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });
    return res;
  };

  let res = await attemptCreate(targetCurrency, targetAmount);
  let usedCurrency = targetCurrency;
  let usedAmount = targetAmount;

  if (!res.ok && targetCurrency !== 'EUR' && res.status === 400) {
    res = await attemptCreate('EUR', order.totalCents);
    usedCurrency = 'EUR';
    usedAmount = order.totalCents;
  }

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Payment gateway HTTP ${res.status}: ${errText.slice(0, 220).replace(/stripe/gi, 'gateway')}`);
  }

  const pi = (await res.json()) as RawPaymentIntentResponse;
  if (!pi.id || !pi.client_secret) {
    throw new Error('Payment gateway did not return client_secret');
  }

  return {
    paymentIntentId: pi.id,
    clientSecret: pi.client_secret,
    currencyUsed: (pi.currency || usedCurrency).toUpperCase(),
    amountMinorUsed: pi.amount ?? usedAmount,
  };
}

export function buildCheckoutSessionParams(order: SinglePassOrder, siteOrigin: string): URLSearchParams {
  const params = new URLSearchParams();
  const lp = localePrefix(order.locale);
  const cleanOrigin = siteOrigin.replace(/\/+$/, '');

  params.set('mode', 'payment');
  params.set('client_reference_id', order.id);
  params.set('customer_email', order.customer.email);
  params.set('phone_number_collection[enabled]', 'true');
  params.set(
    'success_url',
    `${cleanOrigin}${lp}/thank-you?order=${encodeURIComponent(order.id)}&session_id={CHECKOUT_SESSION_ID}`,
  );
  params.set(
    'cancel_url',
    `${cleanOrigin}${lp}/checkout?cancelled=1&order=${encodeURIComponent(order.id)}`,
  );

  order.items.forEach((item, idx) => {
    const p = `line_items[${idx}]`;
    params.set(`${p}[price_data][currency]`, 'eur');
    params.set(`${p}[price_data][unit_amount]`, String(item.unitBaseCents));
    params.set(`${p}[price_data][product_data][name]`, `${item.venueName} · ${item.title}`);
    params.set(`${p}[quantity]`, String(item.quantity));
  });

  const distinctRates = new Set(
    order.items.map((item) =>
      typeof item.feeRate === 'number' ? item.feeRate : SINGLE_PASS_FEE_RATE,
    ),
  );
  const isMixed = distinctRates.size > 1;
  const effectiveFeeRate =
    distinctRates.size === 1
      ? Array.from(distinctRates)[0]
      : typeof order.feeRate === 'number'
        ? order.feeRate
        : SINGLE_PASS_FEE_RATE;

  if (order.feeCents > 0) {
    const feeIdx = order.items.length;
    const fp = `line_items[${feeIdx}]`;
    const feeLineName = formatFeeLabel35(order.locale, effectiveFeeRate, isMixed);
    params.set(`${fp}[price_data][currency]`, 'eur');
    params.set(`${fp}[price_data][unit_amount]`, String(order.feeCents));
    params.set(`${fp}[price_data][product_data][name]`, feeLineName);
    params.set(`${fp}[quantity]`, '1');
  }

  params.set('metadata[order_id]', order.id);
  params.set('metadata[customer_whatsapp]', order.customer.whatsapp.slice(0, 80));
  params.set('metadata[locale]', order.locale);
  params.set('metadata[fee_rate]', String(effectiveFeeRate));
  params.set('payment_intent_data[metadata][order_id]', order.id);
  return params;
}

export async function markOrderPaidIdempotently(
  orderId: string,
  opts: {
    stripeSessionId?: string | null;
    stripePaymentIntentId?: string | null;
  } = {},
): Promise<SinglePassOrder | null> {
  const existing = await getOrderById(orderId);
  if (!existing) return null;

  const needsStaffEmail = !existing.staffEmailSentAt;

  if (existing.status === 'paid' && existing.confirmationEmailSentAt && !needsStaffEmail) {
    return existing;
  }

  const nowIso = new Date().toISOString();
  const shouldSendEmail = !existing.confirmationEmailSentAt;
  const shouldSendStaffEmail = needsStaffEmail;

  const updated: SinglePassOrder = {
    ...existing,
    status: 'paid',
    paidAt: existing.paidAt || nowIso,
    updatedAt: nowIso,
    stripeSessionId: opts.stripeSessionId || existing.stripeSessionId,
    stripePaymentIntentId: opts.stripePaymentIntentId || existing.stripePaymentIntentId,
    confirmationEmailSentAt: existing.confirmationEmailSentAt || nowIso,
    ...(shouldSendStaffEmail ? { staffEmailSentAt: nowIso } : {}),
  };

  // Persist email timestamps BEFORE calling email transport to prevent concurrent webhook/verify double-sends
  await saveOrder(updated);

  if (shouldSendEmail) {
    try {
      const msg = buildSinglePassOrderEmail(updated);
      const emailResult = await sendAttendeeEmail(msg);
      if (emailResult.outcome === 'sent') {
        if (updated.emailDeliveryError) {
          updated.emailDeliveryError = null;
          await saveOrder(updated);
        }
      } else {
        updated.confirmationEmailSentAt = null;
        updated.emailDeliveryError =
          emailResult.outcome === 'dry_run'
            ? 'Email transport in dry_run mode (no SMTP/Resend credentials configured)'
            : emailResult.error || 'Email delivery failed';
        await saveOrder(updated);
      }
    } catch (error) {
      updated.confirmationEmailSentAt = null;
      updated.emailDeliveryError = error instanceof Error ? error.message : String(error);
      await saveOrder(updated);
    }
  }

  if (shouldSendStaffEmail) {
    try {
      const staffMsg = buildStaffActivationEmail(updated);
      const staffResult = await sendAttendeeEmail(staffMsg);
      if (staffResult.outcome === 'sent') {
        if (updated.staffEmailError) {
          updated.staffEmailError = null;
          await saveOrder(updated);
        }
      } else {
        updated.staffEmailSentAt = null;
        updated.staffEmailError =
          staffResult.outcome === 'dry_run'
            ? 'Email transport in dry_run mode (no SMTP/Resend credentials configured)'
            : staffResult.error || 'Staff email delivery failed';
        await saveOrder(updated);
      }
    } catch (error) {
      updated.staffEmailSentAt = null;
      updated.staffEmailError = error instanceof Error ? error.message : String(error);
      await saveOrder(updated);
    }
  }

  return updated;
}

export async function verifyPaymentIntentAndFinalizeOrder(
  orderId: string,
  paymentIntentId?: string,
): Promise<{ ok: boolean; order: SinglePassOrder | null; reason?: string }> {
  const order = await getOrderById(orderId);
  if (!order) {
    return { ok: false, order: null, reason: 'ORDER_NOT_FOUND' };
  }
  if (order.status === 'paid') {
    return { ok: true, order };
  }

  const targetPiId = (paymentIntentId || order.stripePaymentIntentId || '').trim();
  if (!targetPiId) {
    return { ok: false, order, reason: 'PAYMENT_NOT_CONFIRMED' };
  }

  const pi = await fetchEmbeddedPaymentIntent(targetPiId);
  if (!pi) {
    return { ok: false, order, reason: 'PAYMENT_UNAVAILABLE' };
  }

  if (pi.metadata?.order_id && pi.metadata.order_id !== order.id) {
    return { ok: false, order, reason: 'ORDER_MISMATCH' };
  }

  if (pi.status !== 'succeeded') {
    if (pi.last_payment_error) {
      const updatedFailure = await recordOrderPaymentFailure(order.id, {
        code: pi.last_payment_error.code,
        declineCode: pi.last_payment_error.decline_code,
        type: pi.last_payment_error.type,
        message: pi.last_payment_error.message || 'Card payment declined',
        paymentIntentId: pi.id || targetPiId,
        source: 'gateway_sync',
      });
      return {
        ok: false,
        order: updatedFailure.order || order,
        reason: pi.last_payment_error.decline_code || pi.last_payment_error.code || pi.status || 'PAYMENT_FAILED',
      };
    }
    return { ok: false, order, reason: pi.status || 'PAYMENT_NOT_CONFIRMED' };
  }

  const finalized = await markOrderPaidIdempotently(order.id, {
    stripePaymentIntentId: pi.id || targetPiId,
  });

  return { ok: Boolean(finalized), order: finalized };
}

type StripeCheckoutSessionPayload = {
  id: string;
  payment_status?: string;
  amount_total?: number;
  client_reference_id?: string | null;
  payment_intent?: string | { id?: string } | null;
  metadata?: Record<string, string>;
};

export async function fetchStripeCheckoutSession(
  sessionId: string,
): Promise<StripeCheckoutSessionPayload | null> {
  const creds = await resolveStripeCredentials();
  if (!creds) return null;

  const res = await fetch(`${STRIPE_API_BASE}/checkout/sessions/${encodeURIComponent(sessionId)}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${creds.secretKey}` },
  });
  if (!res.ok) return null;
  return (await res.json()) as StripeCheckoutSessionPayload;
}

export async function verifyStripeSessionAndFinalizeOrder(
  orderId: string,
  sessionId: string,
): Promise<{ ok: boolean; order: SinglePassOrder | null; reason?: string }> {
  const order = await getOrderById(orderId);
  if (!order) {
    return { ok: false, order: null, reason: 'ORDER_NOT_FOUND' };
  }
  if (order.status === 'paid') {
    return { ok: true, order };
  }

  const session = await fetchStripeCheckoutSession(sessionId);
  if (!session) {
    return { ok: false, order, reason: 'PAYMENT_SESSION_UNAVAILABLE' };
  }

  const matchedOrder =
    session.client_reference_id === order.id || session.metadata?.order_id === order.id;
  if (!matchedOrder) {
    return { ok: false, order, reason: 'ORDER_MISMATCH' };
  }

  if (session.payment_status !== 'paid') {
    return { ok: false, order, reason: 'PAYMENT_NOT_CONFIRMED' };
  }

  const paymentIntentId =
    typeof session.payment_intent === 'string'
      ? session.payment_intent
      : session.payment_intent?.id || null;

  const finalized = await markOrderPaidIdempotently(order.id, {
    stripeSessionId: session.id,
    stripePaymentIntentId: paymentIntentId,
  });

  return { ok: Boolean(finalized), order: finalized };
}

export function verifyStripeWebhookSignature(
  rawBody: string,
  signatureHeader: string | null,
  webhookSecret: string,
  nowEpochSec = Math.floor(Date.now() / 1000),
): boolean {
  if (!rawBody || !signatureHeader || !webhookSecret) return false;
  let timestampStr = '';
  const v1Signatures: string[] = [];

  for (const part of signatureHeader.split(',')) {
    const trimmed = part.trim();
    if (trimmed.startsWith('t=')) {
      timestampStr = trimmed.slice(2);
    } else if (trimmed.startsWith('v1=')) {
      v1Signatures.push(trimmed.slice(3));
    }
  }

  const timestamp = Number(timestampStr);
  if (!Number.isFinite(timestamp) || v1Signatures.length === 0) return false;
  if (Math.abs(nowEpochSec - timestamp) > 300) return false;

  const signedPayload = `${timestampStr}.${rawBody}`;
  const expectedHex = crypto
    .createHmac('sha256', webhookSecret.trim())
    .update(signedPayload, 'utf8')
    .digest('hex');

  const expectedBuf = Buffer.from(expectedHex, 'hex');
  return v1Signatures.some((cand) => {
    try {
      const candBuf = Buffer.from(cand, 'hex');
      if (candBuf.length !== expectedBuf.length) return false;
      return crypto.timingSafeEqual(candBuf, expectedBuf);
    } catch {
      return false;
    }
  });
}

export async function validateAndSaveStripeKey(
  rawSecretKey: string,
  siteOrigin = 'https://nightlifemilan.com',
): Promise<StripeCredentialStatus> {
  const secretKey = rawSecretKey.trim();
  if (!secretKey.startsWith('sk_') && !secretKey.startsWith('rk_')) {
    throw new Error('Chiave gateway non valida: deve iniziare con sk_live_, sk_test_ o rk_live_.');
  }

  const acctRes = await fetch(`${STRIPE_API_BASE}/account`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${secretKey}` },
  });
  if (!acctRes.ok) {
    const msg = await acctRes.text();
    throw new Error(`Verifica account gateway fallita (HTTP ${acctRes.status}): ${msg.slice(0, 200)}`);
  }
  const acct = (await acctRes.json()) as { id?: string };

  const cleanOrigin = siteOrigin.replace(/\/+$/, '');
  const webhookUrl = `${cleanOrigin}/api/single-pass/webhook`;
  let webhookSecret = '';
  let webhookEndpointId = '';

  const existingVault = await readStripeVaultConfig();
  if (existingVault?.webhookSecret) {
    webhookSecret = existingVault.webhookSecret;
    webhookEndpointId = existingVault.webhookEndpointId || '';
  }

  const events = [
    'payment_intent.succeeded',
    'payment_intent.payment_failed',
    'payment_intent.canceled',
    'checkout.session.completed',
    'checkout.session.async_payment_succeeded',
    'checkout.session.expired',
  ];

  if (webhookEndpointId) {
    const updateBody = new URLSearchParams();
    events.forEach((ev, idx) => updateBody.set(`enabled_events[${idx}]`, ev));
    await fetch(`${STRIPE_API_BASE}/webhook_endpoints/${encodeURIComponent(webhookEndpointId)}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: updateBody.toString(),
    });
  } else if (!webhookSecret) {
    const body = new URLSearchParams();
    body.set('url', webhookUrl);
    events.forEach((ev, idx) => body.set(`enabled_events[${idx}]`, ev));
    body.set('description', 'Nightlife Milan E-Commerce Webhook');

    const whRes = await fetch(`${STRIPE_API_BASE}/webhook_endpoints`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });
    if (whRes.ok) {
      const whJson = (await whRes.json()) as { id?: string; secret?: string };
      webhookEndpointId = whJson.id || '';
      webhookSecret = whJson.secret || '';
    }
  }

  const livemode = !secretKey.startsWith('sk_test_') && !secretKey.startsWith('rk_test_');
  const nextVault: StripeVaultConfig = {
    secretKey,
    webhookSecret,
    accountId: acct.id || 'acct_1O2zVeAbG6ToifSY',
    livemode,
    webhookEndpointId: webhookEndpointId || undefined,
    updatedAt: new Date().toISOString(),
  };

  await writeStripeVaultConfig(nextVault);
  return getStripeCredentialStatus();
}

export async function syncPaymentWebhookEvents(
  siteOrigin = 'https://nightlifemilan.com',
): Promise<{ ok: boolean; endpointId: string | null }> {
  const creds = await resolveStripeCredentials();
  if (!creds) return { ok: false, endpointId: null };

  const cleanOrigin = siteOrigin.replace(/\/+$/, '');
  const listRes = await fetch(`${STRIPE_API_BASE}/webhook_endpoints?limit=20`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${creds.secretKey}` },
  });
  if (!listRes.ok) return { ok: false, endpointId: null };

  const listJson = (await listRes.json()) as {
    data?: Array<{ id?: string; url?: string }>;
  };
  const match = (listJson.data || []).find((ep) =>
    (ep.url || '').startsWith(`${cleanOrigin}/api/single-pass/webhook`) ||
    (ep.url || '').endsWith('/api/single-pass/webhook'),
  );
  if (!match?.id) return { ok: false, endpointId: null };

  const events = [
    'payment_intent.succeeded',
    'payment_intent.payment_failed',
    'payment_intent.canceled',
    'checkout.session.completed',
    'checkout.session.async_payment_succeeded',
    'checkout.session.expired',
  ];
  const body = new URLSearchParams();
  events.forEach((ev, idx) => body.set(`enabled_events[${idx}]`, ev));

  const updRes = await fetch(
    `${STRIPE_API_BASE}/webhook_endpoints/${encodeURIComponent(match.id)}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${creds.secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    },
  );
  if (!updRes.ok) return { ok: false, endpointId: match.id };
  return { ok: true, endpointId: match.id };
}

export type GatewayReconcileSummary = {
  ok: boolean;
  scanned: number;
  markedPaid: number;
  markedFailed: number;
  markedCancelled: number;
  skippedErrors: number;
  errorKind?: 'auth' | 'storage' | 'gateway';
  error?: string;
};

export async function reconcileEcommerceWithGateway(limit = 100): Promise<GatewayReconcileSummary> {
  const safeLimit = Math.max(1, Math.min(100, Math.floor(limit)));
  try {
    const creds = await resolveStripeCredentials();
    if (!creds) {
      return {
        ok: false,
        scanned: 0,
        markedPaid: 0,
        markedFailed: 0,
        markedCancelled: 0,
        skippedErrors: 0,
        errorKind: 'auth',
        error: 'Chiave gateway non configurata',
      };
    }

    const res = await fetch(`${STRIPE_API_BASE}/payment_intents?limit=${safeLimit}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${creds.secretKey}` },
    });
    if (!res.ok) {
      const isAuthErr = res.status === 401 || res.status === 403;
      return {
        ok: false,
        scanned: 0,
        markedPaid: 0,
        markedFailed: 0,
        markedCancelled: 0,
        skippedErrors: 0,
        errorKind: isAuthErr ? 'auth' : 'gateway',
        error: `Gateway HTTP ${res.status}`,
      };
    }

    const payload = (await res.json()) as { data?: RawPaymentIntentResponse[] };
    const items = Array.isArray(payload.data) ? payload.data : [];

    // Load existing order summaries and exact Blob key set ONCE so deleted test order_ids
    // and non-actionable PaymentIntents never trigger individual Blob reads.
    const [summaries, existingIds] = await Promise.all([
      listAllOrderSummaries(),
      listExistingOrderIds(),
    ]);
    const summaryStatusById = new Map<string, string>();
    for (const s of summaries) {
      summaryStatusById.set(normalizeOrderIdKey(s.id), s.status);
    }

    let markedPaid = 0;
    let markedFailed = 0;
    let markedCancelled = 0;
    let skippedErrors = 0;

    for (const pi of items) {
      const rawOrderId = (pi.metadata?.order_id || '').trim();
      if (!rawOrderId) continue;

      const isActionable =
        pi.status === 'succeeded' ||
        pi.status === 'canceled' ||
        Boolean(pi.last_payment_error);
      if (!isActionable) continue;

      const normId = normalizeOrderIdKey(rawOrderId);
      if (!normId) continue;

      // Skip historical/deleted orders that no longer exist in our Blob store
      if (!summaryStatusById.has(normId) && !existingIds.has(normId)) {
        continue;
      }

      const knownStatus = summaryStatusById.get(normId);
      if (knownStatus === 'paid') {
        continue;
      }
      if (pi.status === 'canceled' && knownStatus && knownStatus !== 'awaiting_payment') {
        continue;
      }
      if (
        pi.last_payment_error &&
        pi.status !== 'succeeded' &&
        (knownStatus === 'cancelled' || knownStatus === 'expired')
      ) {
        continue;
      }

      try {
        const existing = await getOrderById(normId);
        if (!existing) continue;

        if (pi.status === 'succeeded') {
          if (existing.status !== 'paid') {
            const updated = await markOrderPaidIdempotently(existing.id, {
              stripePaymentIntentId: pi.id || null,
            });
            if (updated?.status === 'paid') {
              markedPaid += 1;
              summaryStatusById.set(normId, 'paid');
            }
          } else {
            summaryStatusById.set(normId, 'paid');
          }
        } else if (pi.status === 'canceled') {
          if (existing.status === 'awaiting_payment') {
            await saveOrder({
              ...existing,
              status: 'cancelled',
              updatedAt: new Date().toISOString(),
            });
            markedCancelled += 1;
            summaryStatusById.set(normId, 'cancelled');
          }
        } else if (pi.last_payment_error) {
          if (
            existing.status !== 'paid' &&
            existing.status !== 'cancelled' &&
            existing.status !== 'expired'
          ) {
            const failureTime =
              typeof pi.created === 'number'
                ? new Date(pi.created * 1000).toISOString()
                : new Date().toISOString();
            const resFail = await recordOrderPaymentFailure(existing.id, {
              at: failureTime,
              code: pi.last_payment_error.code,
              declineCode: pi.last_payment_error.decline_code,
              type: pi.last_payment_error.type,
              message: pi.last_payment_error.message || 'Card payment declined',
              paymentIntentId: pi.id || null,
              source: 'gateway_sync',
            });
            if (resFail.recordedNewAttempt) markedFailed += 1;
            if (resFail.order?.status) summaryStatusById.set(normId, resFail.order.status);
          }
        }
      } catch {
        skippedErrors += 1;
      }
    }

    return {
      ok: true,
      scanned: items.length,
      markedPaid,
      markedFailed,
      markedCancelled,
      skippedErrors,
    };
  } catch (err) {
    const rawMsg = (err instanceof Error ? err.message : String(err)).slice(0, 140);
    const isBlobErr = /vercel blob|blob/i.test(rawMsg);
    return {
      ok: false,
      scanned: 0,
      markedPaid: 0,
      markedFailed: 0,
      markedCancelled: 0,
      skippedErrors: 0,
      errorKind: isBlobErr ? 'storage' : 'gateway',
      error: rawMsg.replace(/stripe/gi, 'gateway'),
    };
  }
}

