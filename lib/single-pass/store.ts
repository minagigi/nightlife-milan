import crypto from 'node:crypto';
import { del, get, list, put } from '@vercel/blob';
import { resolveOrderChannels } from './catalog';
import type {
  AbandonedCartRecord,
  CartDraftCustomer,
  OrderAttribution,
  PaymentFailureRecord,
  SinglePassMember,
  SinglePassOrder,
  SinglePassOrderSummary,
  StripeVaultConfig,
} from './types';

const USERS_PREFIX = 'single-pass/v1/users/';
const ORDERS_PREFIX = 'single-pass/v1/orders/';
const ORDERS_INDEX_PATH = 'single-pass/v1/orders-index.json';
const CARTS_PREFIX = 'single-pass/v1/carts/';
const CARTS_INDEX_PATH = 'single-pass/v1/carts-index.json';
const STRIPE_VAULT_PATH = 'single-pass/v1/config/stripe-credentials.json';

type OrdersIndexDoc = {
  version: 1;
  updatedAt: string;
  orders: SinglePassOrderSummary[];
};

type CartsIndexDoc = {
  version: 1;
  updatedAt: string;
  carts: AbandonedCartRecord[];
};

type EncryptedPayload = {
  v: 1;
  iv: string;
  tag: string;
  data: string;
};

// In-memory store fallback when BLOB_READ_WRITE_TOKEN is absent (unit tests / local dev).
const memoryBlobs = new Map<string, string>();

export function singlePassBlobConfigured(): boolean {
  return Boolean((process.env.BLOB_READ_WRITE_TOKEN || '').trim());
}

export function clearMemoryStoreForTests(): void {
  memoryBlobs.clear();
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function emailStorageKey(email: string): string {
  const hash = crypto.createHash('sha256').update(normalizeEmail(email)).digest('hex');
  return `${USERS_PREFIX}${hash}.json`;
}

export function orderStorageKey(orderId: string): string {
  const safeId = orderId.trim().toUpperCase().replace(/[^A-Z0-9-]/g, '');
  return `${ORDERS_PREFIX}${safeId}.json`;
}

export function generateOrderId(now = new Date()): string {
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');
  const rand = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `NLM-SP-${datePart}-${rand}`;
}

export function generateAccessPin(): string {
  return crypto.randomBytes(3).toString('hex').toUpperCase();
}

async function readPrivateJson<T>(pathname: string): Promise<T | null> {
  if (!singlePassBlobConfigured()) {
    const raw = memoryBlobs.get(pathname);
    return raw ? (JSON.parse(raw) as T) : null;
  }
  const token = (process.env.BLOB_READ_WRITE_TOKEN || '').trim();
  try {
    const result = await get(pathname, {
      access: 'private',
      useCache: false,
      token,
    });
    if (!result || result.statusCode !== 200 || !result.stream) return null;
    const text = await new Response(result.stream).text();
    if (!text) return null;
    return JSON.parse(text) as T;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (/not found|404|BlobNotFoundError/i.test(message)) return null;
    throw error;
  }
}

async function writePrivateJson(pathname: string, value: unknown): Promise<void> {
  const serialized = JSON.stringify(value);
  if (!singlePassBlobConfigured()) {
    memoryBlobs.set(pathname, serialized);
    return;
  }
  const token = (process.env.BLOB_READ_WRITE_TOKEN || '').trim();
  await put(pathname, serialized, {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    token,
  });
}

async function deletePrivateBlob(pathname: string): Promise<void> {
  if (!singlePassBlobConfigured()) {
    memoryBlobs.delete(pathname);
    return;
  }
  const token = (process.env.BLOB_READ_WRITE_TOKEN || '').trim();
  try {
    await del(pathname, { token });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (/not found|404|BlobNotFoundError/i.test(message)) return;
    throw error;
  }
}

function getVaultMasterKey(): Buffer {
  const seed =
    (process.env.VAULT_ENCRYPTION_KEY || '').trim() ||
    (process.env.BLOB_READ_WRITE_TOKEN || '').trim() ||
    (process.env.CRM_PASSWORD || '').trim() ||
    (process.env.ANALYTICS_PASSWORD || '').trim() ||
    'nlm-sp-dev-vault-2027';
  return crypto.scryptSync(seed, 'nlm-single-pass-vault-salt', 32);
}

export function encryptVaultJson(value: StripeVaultConfig): EncryptedPayload {
  const key = getVaultMasterKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(value), 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    v: 1,
    iv: iv.toString('base64url'),
    tag: tag.toString('base64url'),
    data: encrypted.toString('base64url'),
  };
}

export function decryptVaultJson(payload: EncryptedPayload): StripeVaultConfig | null {
  try {
    if (!payload || payload.v !== 1) return null;
    const key = getVaultMasterKey();
    const iv = Buffer.from(payload.iv, 'base64url');
    const tag = Buffer.from(payload.tag, 'base64url');
    const data = Buffer.from(payload.data, 'base64url');
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8');
    return JSON.parse(decrypted) as StripeVaultConfig;
  } catch {
    return null;
  }
}

export async function readStripeVaultConfig(): Promise<StripeVaultConfig | null> {
  const payload = await readPrivateJson<EncryptedPayload>(STRIPE_VAULT_PATH);
  if (!payload) return null;
  return decryptVaultJson(payload);
}

export async function writeStripeVaultConfig(config: StripeVaultConfig): Promise<void> {
  const encrypted = encryptVaultJson(config);
  await writePrivateJson(STRIPE_VAULT_PATH, encrypted);
}

export async function getMemberByEmail(email: string): Promise<SinglePassMember | null> {
  if (!email.trim()) return null;
  return readPrivateJson<SinglePassMember>(emailStorageKey(email));
}

export async function saveMember(member: SinglePassMember): Promise<SinglePassMember> {
  const normalized: SinglePassMember = {
    ...member,
    email: normalizeEmail(member.email),
    orderIds: Array.from(new Set(member.orderIds)),
  };
  await writePrivateJson(emailStorageKey(normalized.email), normalized);
  return normalized;
}

export function toOrderSummary(order: SinglePassOrder): SinglePassOrderSummary {
  const venueIds = Array.from(new Set(order.items.map((item) => item.venueId)));
  const channels = resolveOrderChannels(order.items);
  const itemSummary = order.items
    .map((item) => `${item.quantity}x ${item.venueName} - ${item.title}`)
    .join(' | ');
  const totalHeadcount =
    typeof order.totalHeadcount === 'number' && order.totalHeadcount > 0
      ? order.totalHeadcount
      : order.items.reduce(
          (sum, item) => sum + (typeof item.totalGuests === 'number' ? item.totalGuests : item.quantity || 1),
          0,
        );

  return {
    id: order.id,
    email: normalizeEmail(order.customer.email),
    fullName: order.customer.fullName,
    whatsapp: order.customer.whatsapp,
    age: order.customer.age,
    ...(order.customer.country ? { country: order.customer.country } : {}),
    spokenLanguages: order.customer.spokenLanguages,
    venueIds,
    channels,
    itemSummary,
    totalHeadcount,
    subtotalBaseCents: order.subtotalBaseCents,
    feeCents: order.feeCents,
    totalCents: order.totalCents,
    presentmentCurrency: order.presentmentCurrency || 'EUR',
    presentmentTotalMinor: order.presentmentTotalMinor ?? order.totalCents,
    fxRate: order.fxRate ?? 1,
    ...(order.attribution?.firstLandingPath
      ? { firstLandingPath: order.attribution.firstLandingPath }
      : {}),
    ...(order.attribution?.addedFromPaths?.length
      ? { addedFromPaths: order.attribution.addedFromPaths }
      : {}),
    ...(order.attribution?.initialReferrer
      ? { initialReferrer: order.attribution.initialReferrer }
      : {}),
    ...(order.attribution?.utmSource ? { utmSource: order.attribution.utmSource } : {}),
    ...(order.attribution?.utmCampaign ? { utmCampaign: order.attribution.utmCampaign } : {}),
    status: order.status,
    whatsappGroupStatus: order.whatsappGroupStatus,
    whatsappGroupInviteUrl: order.whatsappGroupInviteUrl,
    createdAt: order.createdAt,
    paidAt: order.paidAt,
    ...(order.failedAt ? { failedAt: order.failedAt } : {}),
    ...(typeof order.paymentAttempts === 'number' ? { paymentAttempts: order.paymentAttempts } : {}),
    ...(order.lastPaymentError ? { lastPaymentError: order.lastPaymentError } : {}),
    ...(order.cartSessionId ? { cartSessionId: order.cartSessionId } : {}),
  };
}

export async function getOrderById(orderId: string): Promise<SinglePassOrder | null> {
  const key = orderStorageKey(orderId);
  if (key === `${ORDERS_PREFIX}.json`) return null;
  return readPrivateJson<SinglePassOrder>(key);
}

async function upsertOrderIndex(order: SinglePassOrder): Promise<void> {
  const current = (await readPrivateJson<OrdersIndexDoc>(ORDERS_INDEX_PATH)) || {
    version: 1 as const,
    updatedAt: new Date().toISOString(),
    orders: [],
  };
  const summary = toOrderSummary(order);
  const filtered = current.orders.filter((entry) => entry.id !== summary.id);
  filtered.unshift(summary);
  filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  await writePrivateJson(ORDERS_INDEX_PATH, {
    version: 1 as const,
    updatedAt: new Date().toISOString(),
    orders: filtered,
  });
}

export async function saveOrder(order: SinglePassOrder): Promise<SinglePassOrder> {
  // Never downgrade an already-paid order due to an out-of-order write
  if (order.status !== 'paid') {
    const latest = await getOrderById(order.id);
    if (latest?.status === 'paid') {
      return latest;
    }
  }
  await writePrivateJson(orderStorageKey(order.id), order);
  await upsertOrderIndex(order);
  return order;
}

function buildFailureFingerprint(f: {
  paymentIntentId?: string | null;
  code?: string;
  declineCode?: string;
  message: string;
}): string {
  return [
    (f.paymentIntentId || '').trim(),
    (f.code || '').trim().toLowerCase(),
    (f.declineCode || '').trim().toLowerCase(),
    f.message.trim().toLowerCase().slice(0, 120),
  ].join('|');
}

export async function recordOrderPaymentFailure(
  orderId: string,
  failure: Omit<PaymentFailureRecord, 'at'> & { at?: string },
): Promise<{ order: SinglePassOrder | null; recordedNewAttempt: boolean }> {
  const existing = await getOrderById(orderId);
  if (!existing) return { order: null, recordedNewAttempt: false };

  if (existing.status === 'paid') {
    return { order: existing, recordedNewAttempt: false };
  }
  if (
    failure.source === 'gateway_sync' &&
    (existing.status === 'cancelled' || existing.status === 'expired')
  ) {
    return { order: existing, recordedNewAttempt: false };
  }

  const nowIso = failure.at || new Date().toISOString();
  const cleanMessage = (failure.message || 'Payment declined')
    .replace(/stripe/gi, 'payment gateway')
    .trim()
    .slice(0, 240);

  const entry: PaymentFailureRecord = {
    at: nowIso,
    ...(failure.code ? { code: String(failure.code).slice(0, 64) } : {}),
    ...(failure.declineCode ? { declineCode: String(failure.declineCode).slice(0, 64) } : {}),
    ...(failure.type ? { type: String(failure.type).slice(0, 64) } : {}),
    message: cleanMessage,
    paymentIntentId: failure.paymentIntentId || existing.stripePaymentIntentId || null,
    source: failure.source,
  };

  const prevList = Array.isArray(existing.paymentFailures) ? existing.paymentFailures : [];
  const candidateFp = buildFailureFingerprint(entry);
  const nowMs = Date.parse(nowIso) || Date.now();

  const duplicateIndex = prevList.findIndex((prev) => {
    const samePi =
      Boolean(entry.paymentIntentId) &&
      Boolean(prev.paymentIntentId) &&
      entry.paymentIntentId === prev.paymentIntentId;
    if (failure.source === 'gateway_sync' && samePi) {
      return (
        buildFailureFingerprint(prev) === candidateFp ||
        (Boolean(entry.code) && prev.code === entry.code && prev.declineCode === entry.declineCode)
      );
    }
    const prevMs = Date.parse(prev.at) || 0;
    const withinWindow = Math.abs(nowMs - prevMs) <= 15 * 60 * 1000;
    if (!withinWindow) return false;
    if (buildFailureFingerprint(prev) === candidateFp) return true;
    // Also deduplicate client_confirm + webhook on the exact same PaymentIntent & error code within 2 minutes
    if (
      samePi &&
      prev.source !== entry.source &&
      Math.abs(nowMs - prevMs) <= 2 * 60 * 1000 &&
      (prev.code || '') === (entry.code || '')
    ) {
      return true;
    }
    return false;
  });

  if (duplicateIndex >= 0) {
    const prev = prevList[duplicateIndex];
    const enriched: PaymentFailureRecord = {
      ...prev,
      ...(entry.declineCode && !prev.declineCode ? { declineCode: entry.declineCode } : {}),
      ...(entry.code && !prev.code ? { code: entry.code } : {}),
    };
    const nextList = [...prevList];
    nextList[duplicateIndex] = enriched;
    const updatedExisting: SinglePassOrder = {
      ...existing,
      status: 'payment_failed',
      failedAt: existing.failedAt || prev.at,
      lastPaymentError: duplicateIndex === 0 ? enriched : existing.lastPaymentError || enriched,
      paymentFailures: nextList,
      updatedAt: nowIso,
    };
    const saved = await saveOrder(updatedExisting);
    return { order: saved, recordedNewAttempt: false };
  }

  const nextFailures = [entry, ...prevList].slice(0, 10);
  const nextAttempts = Math.max(prevList.length, existing.paymentAttempts || 0) + 1;
  const updated: SinglePassOrder = {
    ...existing,
    status: 'payment_failed',
    failedAt: nowIso,
    paymentAttempts: nextAttempts,
    lastPaymentError: entry,
    paymentFailures: nextFailures,
    stripePaymentIntentId: entry.paymentIntentId || existing.stripePaymentIntentId,
    updatedAt: nowIso,
  };
  const saved = await saveOrder(updated);
  return { order: saved, recordedNewAttempt: saved.status === 'payment_failed' };
}

export async function deleteOrderById(orderId: string): Promise<boolean> {
  const cleanId = orderId.trim().toUpperCase();
  if (!cleanId) return false;

  const existingOrder = await getOrderById(cleanId);
  await deletePrivateBlob(orderStorageKey(cleanId));

  const current = await readPrivateJson<OrdersIndexDoc>(ORDERS_INDEX_PATH);
  if (current) {
    const nextOrders = current.orders.filter((entry) => entry.id.toUpperCase() !== cleanId);
    await writePrivateJson(ORDERS_INDEX_PATH, {
      version: 1 as const,
      updatedAt: new Date().toISOString(),
      orders: nextOrders,
    });
  }

  if (existingOrder?.customer?.email) {
    const member = await getMemberByEmail(existingOrder.customer.email);
    if (member && member.orderIds.includes(existingOrder.id)) {
      await saveMember({
        ...member,
        orderIds: member.orderIds.filter((id) => id !== existingOrder.id),
        updatedAt: new Date().toISOString(),
      });
    }
  }

  if (existingOrder?.cartSessionId) {
    await deleteCartDraftById(existingOrder.cartSessionId);
  }

  return Boolean(existingOrder) || Boolean(current);
}

export async function getOrdersForMember(member: SinglePassMember): Promise<SinglePassOrder[]> {
  const ids = new Set(member.orderIds);
  const summaries = await listAllOrderSummaries();
  for (const s of summaries) {
    if (normalizeEmail(s.email) === normalizeEmail(member.email)) {
      ids.add(s.id);
    }
  }
  const orders = await Promise.all(Array.from(ids).map((id) => getOrderById(id)));
  return orders
    .filter((o): o is SinglePassOrder => Boolean(o))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function listAllOrderSummaries(): Promise<SinglePassOrderSummary[]> {
  const indexed = await readPrivateJson<OrdersIndexDoc>(ORDERS_INDEX_PATH);
  const byId = new Map<string, SinglePassOrderSummary>();
  if (indexed?.orders) {
    for (const s of indexed.orders) byId.set(s.id, s);
  }

  // Fallback sweep so concurrent index overwrites can never orphan an order blob.
  if (!singlePassBlobConfigured()) {
    for (const [k, raw] of memoryBlobs.entries()) {
      if (k.startsWith(ORDERS_PREFIX) && k.endsWith('.json')) {
        try {
          const order = JSON.parse(raw) as SinglePassOrder;
          if (!byId.has(order.id)) byId.set(order.id, toOrderSummary(order));
        } catch {}
      }
    }
  } else {
    try {
      const token = (process.env.BLOB_READ_WRITE_TOKEN || '').trim();
      const listed = await list({ prefix: ORDERS_PREFIX, limit: 500, token });
      const missingPaths = listed.blobs
        .map((b) => b.pathname)
        .filter((p) => p.endsWith('.json'))
        .filter((p) => {
          const id = p.slice(ORDERS_PREFIX.length, -5);
          return !byId.has(id);
        });
      if (missingPaths.length > 0) {
        const recovered = await Promise.all(
          missingPaths.slice(0, 50).map((p) => readPrivateJson<SinglePassOrder>(p)),
        );
        for (const o of recovered) {
          if (o?.id) byId.set(o.id, toOrderSummary(o));
        }
      }
    } catch {
      // Index still returned safely even if list throws
    }
  }

  return Array.from(byId.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function listAllOrders(limit = 500): Promise<SinglePassOrder[]> {
  const summaries = await listAllOrderSummaries();
  const orders = await Promise.all(summaries.slice(0, limit).map((s) => getOrderById(s.id)));
  return orders
    .filter((o): o is SinglePassOrder => Boolean(o))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

const MAX_INDEXED_CARTS = 500;

export function sanitizeCartSessionId(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const trimmed = raw.trim().toLowerCase();
  if (!/^[a-f0-9]{32,64}$/.test(trimmed)) return null;
  return trimmed;
}

export function cartStorageKey(cartSessionId: string): string {
  return `${CARTS_PREFIX}${cartSessionId}.json`;
}

export async function getCartDraftById(cartSessionId: string): Promise<AbandonedCartRecord | null> {
  const cleanId = sanitizeCartSessionId(cartSessionId);
  if (!cleanId) return null;
  return readPrivateJson<AbandonedCartRecord>(cartStorageKey(cleanId));
}

function mergeCustomer(
  prev?: CartDraftCustomer,
  next?: CartDraftCustomer,
): CartDraftCustomer | undefined {
  if (!prev && !next) return undefined;
  const merged: CartDraftCustomer = {
    ...(prev?.fullName ? { fullName: prev.fullName } : {}),
    ...(prev?.email ? { email: prev.email } : {}),
    ...(prev?.whatsapp ? { whatsapp: prev.whatsapp } : {}),
    ...(typeof prev?.age === 'number' ? { age: prev.age } : {}),
    ...(prev?.country ? { country: prev.country } : {}),
    ...(next?.fullName ? { fullName: next.fullName } : {}),
    ...(next?.email ? { email: next.email } : {}),
    ...(next?.whatsapp ? { whatsapp: next.whatsapp } : {}),
    ...(typeof next?.age === 'number' ? { age: next.age } : {}),
    ...(next?.country ? { country: next.country } : {}),
  };
  return Object.keys(merged).length > 0 ? merged : undefined;
}

function mergeAttribution(
  prev?: Partial<OrderAttribution>,
  next?: Partial<OrderAttribution>,
): Partial<OrderAttribution> | undefined {
  if (!prev && !next) return undefined;
  return {
    ...(prev || {}),
    ...(next || {}),
    addedFromPaths: Array.from(
      new Set([...(prev?.addedFromPaths || []), ...(next?.addedFromPaths || [])]),
    ).slice(0, 12),
    journeyPaths: (next?.journeyPaths?.length ? next.journeyPaths : prev?.journeyPaths || []).slice(
      -15,
    ),
  };
}

async function upsertCartIndex(record: AbandonedCartRecord): Promise<void> {
  const current = (await readPrivateJson<CartsIndexDoc>(CARTS_INDEX_PATH)) || {
    version: 1 as const,
    updatedAt: new Date().toISOString(),
    carts: [],
  };
  const filtered = current.carts.filter((c) => c.cartSessionId !== record.cartSessionId);
  if (!record.clearedAt && !record.convertedOrderId && record.items.length > 0) {
    filtered.unshift(record);
  }
  filtered.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  await writePrivateJson(CARTS_INDEX_PATH, {
    version: 1 as const,
    updatedAt: new Date().toISOString(),
    carts: filtered.slice(0, MAX_INDEXED_CARTS),
  });
}

async function removeFromCartIndex(cartSessionId: string): Promise<void> {
  const current = await readPrivateJson<CartsIndexDoc>(CARTS_INDEX_PATH);
  if (!current) return;
  const filtered = current.carts.filter((c) => c.cartSessionId !== cartSessionId);
  if (filtered.length === current.carts.length) return;
  await writePrivateJson(CARTS_INDEX_PATH, {
    version: 1 as const,
    updatedAt: new Date().toISOString(),
    carts: filtered,
  });
}

export async function upsertCartDraft(draft: AbandonedCartRecord): Promise<AbandonedCartRecord> {
  const cleanId = sanitizeCartSessionId(draft.cartSessionId);
  if (!cleanId) {
    throw new Error('Invalid cartSessionId');
  }
  const nowIso = draft.updatedAt || new Date().toISOString();
  const existing = await getCartDraftById(cleanId);

  let effectiveCreatedAt = existing?.createdAt || draft.createdAt || nowIso;
  let effectiveConvertedOrderId = existing?.convertedOrderId || draft.convertedOrderId || null;
  let resetPreviousCustomer = false;

  if (effectiveConvertedOrderId) {
    const prevOrder = await getOrderById(effectiveConvertedOrderId);
    if (
      !prevOrder ||
      prevOrder.status === 'paid' ||
      prevOrder.status === 'cancelled' ||
      prevOrder.status === 'expired'
    ) {
      // Closed order: start a fresh abandoned-cart tracking cycle on this browser if reused
      effectiveConvertedOrderId = null;
      effectiveCreatedAt = nowIso;
      resetPreviousCustomer = true;
    }
  }

  const effectiveStage: 'cart' | 'checkout_form' =
    !resetPreviousCustomer && existing?.stage === 'checkout_form' ? 'checkout_form' : draft.stage;

  const mergedRecord: AbandonedCartRecord = {
    ...draft,
    cartSessionId: cleanId,
    stage: effectiveStage,
    createdAt: effectiveCreatedAt,
    updatedAt: nowIso,
    convertedOrderId: effectiveConvertedOrderId,
    clearedAt: draft.items.length > 0 ? null : draft.clearedAt || nowIso,
    customer: resetPreviousCustomer
      ? draft.customer
      : mergeCustomer(existing?.customer, draft.customer),
    lastValidationError:
      draft.lastValidationError !== undefined
        ? draft.lastValidationError
        : resetPreviousCustomer
          ? null
          : existing?.lastValidationError || null,
    attribution: resetPreviousCustomer
      ? draft.attribution
      : mergeAttribution(existing?.attribution, draft.attribution),
  };

  await writePrivateJson(cartStorageKey(cleanId), mergedRecord);
  await upsertCartIndex(mergedRecord);
  return mergedRecord;
}

export async function markCartDraftConverted(
  cartSessionId: string,
  orderId: string,
): Promise<void> {
  const cleanId = sanitizeCartSessionId(cartSessionId);
  if (!cleanId || !orderId) return;
  const nowIso = new Date().toISOString();
  const existing = await getCartDraftById(cleanId);
  if (existing) {
    const updated: AbandonedCartRecord = {
      ...existing,
      convertedOrderId: orderId,
      clearedAt: null,
      updatedAt: nowIso,
    };
    await writePrivateJson(cartStorageKey(cleanId), updated);
  }
  await removeFromCartIndex(cleanId);
}

export async function markCartDraftCleared(cartSessionId: string): Promise<void> {
  const cleanId = sanitizeCartSessionId(cartSessionId);
  if (!cleanId) return;
  const existing = await getCartDraftById(cleanId);
  if (existing?.convertedOrderId) {
    await removeFromCartIndex(cleanId);
    return;
  }
  await deletePrivateBlob(cartStorageKey(cleanId));
  await removeFromCartIndex(cleanId);
}

export async function deleteCartDraftById(cartSessionId: string): Promise<boolean> {
  const cleanId = sanitizeCartSessionId(cartSessionId);
  if (!cleanId) return false;
  const existing = await getCartDraftById(cleanId);
  await deletePrivateBlob(cartStorageKey(cleanId));
  await removeFromCartIndex(cleanId);
  return Boolean(existing);
}

export async function listAllCartDrafts(limit = 250): Promise<AbandonedCartRecord[]> {
  const indexed = await readPrivateJson<CartsIndexDoc>(CARTS_INDEX_PATH);
  const byId = new Map<string, AbandonedCartRecord>();
  if (indexed?.carts) {
    for (const c of indexed.carts) {
      if (!c.clearedAt && !c.convertedOrderId && c.items.length > 0) {
        byId.set(c.cartSessionId, c);
      }
    }
  }

  if (!singlePassBlobConfigured()) {
    for (const [k, raw] of memoryBlobs.entries()) {
      if (k.startsWith(CARTS_PREFIX) && k.endsWith('.json')) {
        try {
          const cart = JSON.parse(raw) as AbandonedCartRecord;
          if (!cart.clearedAt && !cart.convertedOrderId && cart.items.length > 0) {
            byId.set(cart.cartSessionId, cart);
          } else {
            byId.delete(cart.cartSessionId);
          }
        } catch {}
      }
    }
  } else if (!indexed) {
    try {
      const token = (process.env.BLOB_READ_WRITE_TOKEN || '').trim();
      const listed = await list({ prefix: CARTS_PREFIX, limit: 100, token });
      const recovered = await Promise.all(
        listed.blobs
          .map((b) => b.pathname)
          .filter((p) => p.endsWith('.json'))
          .slice(0, 50)
          .map((p) => readPrivateJson<AbandonedCartRecord>(p)),
      );
      for (const c of recovered) {
        if (c && !c.clearedAt && !c.convertedOrderId && c.items.length > 0) {
          byId.set(c.cartSessionId, c);
        }
      }
    } catch {}
  }

  return Array.from(byId.values())
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, limit);
}

export async function readIndexedOrderSummariesOnly(): Promise<SinglePassOrderSummary[]> {
  const indexed = await readPrivateJson<OrdersIndexDoc>(ORDERS_INDEX_PATH);
  if (!indexed?.orders || !Array.isArray(indexed.orders)) return [];
  return [...indexed.orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function readIndexedCartDraftsOnly(): Promise<AbandonedCartRecord[]> {
  const indexed = await readPrivateJson<CartsIndexDoc>(CARTS_INDEX_PATH);
  if (!indexed?.carts || !Array.isArray(indexed.carts)) return [];
  return indexed.carts
    .filter((c) => !c.clearedAt && !c.convertedOrderId && Array.isArray(c.items) && c.items.length > 0)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

