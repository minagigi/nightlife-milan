import crypto from 'node:crypto';
import { del, get, list, put } from '@vercel/blob';
import type {
  SinglePassMember,
  SinglePassOrder,
  SinglePassOrderSummary,
  StripeVaultConfig,
} from './types';

const USERS_PREFIX = 'single-pass/v1/users/';
const ORDERS_PREFIX = 'single-pass/v1/orders/';
const ORDERS_INDEX_PATH = 'single-pass/v1/orders-index.json';
const STRIPE_VAULT_PATH = 'single-pass/v1/config/stripe-credentials.json';

type OrdersIndexDoc = {
  version: 1;
  updatedAt: string;
  orders: SinglePassOrderSummary[];
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
  const itemSummary = order.items
    .map((item) => `${item.quantity}x ${item.venueName} - ${item.title}`)
    .join(' | ');
  const totalHeadcount =
    typeof order.totalHeadcount === 'number' && order.totalHeadcount > 0
      ? order.totalHeadcount
      : order.items.reduce((sum, item) => sum + (item.totalGuests || item.quantity || 1), 0);

  return {
    id: order.id,
    email: normalizeEmail(order.customer.email),
    fullName: order.customer.fullName,
    whatsapp: order.customer.whatsapp,
    age: order.customer.age,
    ...(order.customer.country ? { country: order.customer.country } : {}),
    spokenLanguages: order.customer.spokenLanguages,
    venueIds,
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
  await writePrivateJson(orderStorageKey(order.id), order);
  await upsertOrderIndex(order);
  return order;
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
