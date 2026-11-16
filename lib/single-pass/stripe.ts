import crypto from 'node:crypto';
import { localePrefix } from '@/lib/i18n/locales';
import { sendAttendeeEmail } from '@/lib/emailTransport';
import { SINGLE_PASS_FEE_RATE } from './catalog';
import { buildSinglePassOrderEmail } from './email';
import {
  getOrderById,
  readStripeVaultConfig,
  saveOrder,
  writeStripeVaultConfig,
} from './store';
import type {
  SinglePassOrder,
  StripeCredentialStatus,
  StripeVaultConfig,
} from './types';

const STRIPE_API_BASE = 'https://api.stripe.com/v1';

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
    `${cleanOrigin}${lp}/account?checkout=success&order=${encodeURIComponent(order.id)}&session_id={CHECKOUT_SESSION_ID}`,
  );
  params.set(
    'cancel_url',
    `${cleanOrigin}${lp}/cart?cancelled=1&order=${encodeURIComponent(order.id)}`,
  );

  order.items.forEach((item, idx) => {
    const p = `line_items[${idx}]`;
    params.set(`${p}[price_data][currency]`, 'eur');
    params.set(`${p}[price_data][unit_amount]`, String(item.unitBaseCents));
    params.set(
      `${p}[price_data][product_data][name]`,
      `${item.venueName} · ${item.title} (Single Pass)`,
    );
    params.set(
      `${p}[price_data][product_data][description]`,
      `31/12/2026 ${item.arrivalTime} · WhatsApp Mini-Group from 20/12/2026${item.dietaryChoice ? ` · ${item.dietaryChoice}` : ''}`,
    );
    params.set(`${p}[quantity]`, String(item.quantity));
  });

  const feeIdx = order.items.length;
  const fp = `line_items[${feeIdx}]`;
  params.set(`${fp}[price_data][currency]`, 'eur');
  params.set(`${fp}[price_data][unit_amount]`, String(order.feeCents));
  params.set(
    `${fp}[price_data][product_data][name]`,
    'Booking, Concierge Service & Entry Fee (+15%)',
  );
  params.set(
    `${fp}[price_data][product_data][description]`,
    'Concierge table coordination, age verification, Lista/Tavolo NIGHTLIFE MILAN and Dec 20 WhatsApp mini-group',
  );
  params.set(`${fp}[quantity]`, '1');

  params.set('metadata[order_id]', order.id);
  params.set('metadata[customer_age]', String(order.customer.age));
  params.set('metadata[customer_whatsapp]', order.customer.whatsapp.slice(0, 80));
  params.set('metadata[locale]', order.locale);
  params.set('metadata[fee_rate]', String(SINGLE_PASS_FEE_RATE));

  params.set('payment_intent_data[metadata][order_id]', order.id);
  params.set('payment_intent_data[metadata][customer_whatsapp]', order.customer.whatsapp.slice(0, 80));

  return params;
}

export async function createStripeCheckoutSessionForOrder(
  order: SinglePassOrder,
  siteOrigin: string,
): Promise<{ sessionId: string; url: string } | null> {
  const creds = await resolveStripeCredentials();
  if (!creds) return null;

  const body = buildCheckoutSessionParams(order, siteOrigin);
  const res = await fetch(`${STRIPE_API_BASE}/checkout/sessions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${creds.secretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Stripe Checkout HTTP ${res.status}: ${errText.slice(0, 300)}`);
  }

  const session = (await res.json()) as { id?: string; url?: string };
  if (!session.id || !session.url) {
    throw new Error('Stripe Checkout response missing id or url');
  }

  return { sessionId: session.id, url: session.url };
}

type StripeCheckoutSessionPayload = {
  id: string;
  payment_status?: string;
  status?: string;
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
    headers: {
      Authorization: `Bearer ${creds.secretKey}`,
    },
  });

  if (!res.ok) {
    return null;
  }
  return (await res.json()) as StripeCheckoutSessionPayload;
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

  if (existing.status === 'paid' && existing.confirmationEmailSentAt) {
    return existing;
  }

  const nowIso = new Date().toISOString();
  const shouldSendEmail = !existing.confirmationEmailSentAt;

  const updated: SinglePassOrder = {
    ...existing,
    status: 'paid',
    paidAt: existing.paidAt || nowIso,
    updatedAt: nowIso,
    stripeSessionId: opts.stripeSessionId || existing.stripeSessionId,
    stripePaymentIntentId: opts.stripePaymentIntentId || existing.stripePaymentIntentId,
    confirmationEmailSentAt: existing.confirmationEmailSentAt || nowIso,
  };

  await saveOrder(updated);

  if (shouldSendEmail) {
    try {
      const msg = buildSinglePassOrderEmail(updated);
      const emailResult = await sendAttendeeEmail(msg);
      if (emailResult.outcome === 'failed') {
        updated.emailDeliveryError = emailResult.error || 'Email delivery failed';
        await saveOrder(updated);
      }
    } catch (error) {
      updated.emailDeliveryError = error instanceof Error ? error.message : String(error);
      await saveOrder(updated);
    }
  }

  return updated;
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
    return { ok: false, order, reason: 'STRIPE_SESSION_UNAVAILABLE' };
  }

  const matchedOrder =
    session.client_reference_id === order.id || session.metadata?.order_id === order.id;
  if (!matchedOrder) {
    return { ok: false, order, reason: 'ORDER_MISMATCH' };
  }

  if (session.payment_status !== 'paid') {
    return { ok: false, order, reason: 'PAYMENT_NOT_CONFIRMED' };
  }

  if (typeof session.amount_total === 'number' && session.amount_total !== order.totalCents) {
    return { ok: false, order, reason: 'AMOUNT_MISMATCH' };
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
    throw new Error('Chiave Stripe non valida: deve iniziare con sk_live_, sk_test_ o rk_live_.');
  }

  const acctRes = await fetch(`${STRIPE_API_BASE}/account`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${secretKey}` },
  });
  if (!acctRes.ok) {
    const msg = await acctRes.text();
    throw new Error(`Verifica account Stripe fallita (HTTP ${acctRes.status}): ${msg.slice(0, 200)}`);
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

  if (!webhookSecret) {
    const body = new URLSearchParams();
    body.set('url', webhookUrl);
    body.set('enabled_events[0]', 'checkout.session.completed');
    body.set('enabled_events[1]', 'checkout.session.async_payment_succeeded');
    body.set('enabled_events[2]', 'checkout.session.expired');
    body.set('description', 'Nightlife Milan Single Pass E-Commerce Webhook');

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
