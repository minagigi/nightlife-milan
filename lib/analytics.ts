'use client';

/**
 * Tracking eventi lato client per Nightlife Milan:
 * 1. Google Analytics 4 (G-89JEXSWX80): per eventi contatti (whatsapp_click,
 *    xceed_click, booking_form_submit) e per l'intero percorso di acquisto
 *    (add_to_cart, view_cart, begin_checkout, add_payment_info, purchase,
 *    cart_abandoned).
 * 2. Contatori interni (/api/track): solo per whatsapp_click, xceed_click e
 *    booking_form_submit (nessuna nuova scrittura Blob sugli eventi carrello).
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const NLM_GA4_ID = 'G-89JEXSWX80';

const PURCHASED_IDS_STORAGE_KEY = 'nlm_ga4_purchased_ids_v1';
const FUNNEL_STATE_STORAGE_KEY = 'nlm_cart_funnel_v1';

let gtagScriptInjected = false;

export function ensureGoogleAnalyticsLoaded(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer!.push(arguments);
    };
  }
  if (gtagScriptInjected) return;
  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${NLM_GA4_ID}"]`)) {
    gtagScriptInjected = true;
    return;
  }
  gtagScriptInjected = true;
  window.gtag('js', new Date());
  window.gtag('config', NLM_GA4_ID);
  const s = document.createElement('script');
  s.src = `https://www.googletagmanager.com/gtag/js?id=${NLM_GA4_ID}`;
  s.async = true;
  document.head.appendChild(s);
}

export type AnalyticsEventName =
  | 'pageview'
  | 'whatsapp_click'
  | 'booking_form_submit'
  | 'xceed_click';

export type EcommerceEventName =
  | 'add_to_cart'
  | 'view_cart'
  | 'begin_checkout'
  | 'add_payment_info'
  | 'purchase'
  | 'cart_abandoned';

export interface Ga4EcommerceItem {
  item_id: string;
  item_name: string;
  item_category?: string;
  price: number;
  quantity: number;
}

export interface CartFunnelSnapshot {
  active: boolean;
  stage: 'cart' | 'checkout' | 'payment';
  valueEur: number;
  itemCount: number;
  orderId?: string;
  lastTouchMs: number;
  purchased: boolean;
  abandonedSent: boolean;
}

export function readCartFunnelSnapshot(): CartFunnelSnapshot | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(FUNNEL_STATE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CartFunnelSnapshot>;
    if (!parsed || typeof parsed !== 'object') return null;
    return {
      active: Boolean(parsed.active),
      stage: parsed.stage === 'payment' ? 'payment' : parsed.stage === 'checkout' ? 'checkout' : 'cart',
      valueEur: Number(parsed.valueEur) || 0,
      itemCount: Number(parsed.itemCount) || 0,
      orderId: typeof parsed.orderId === 'string' ? parsed.orderId : undefined,
      lastTouchMs: Number(parsed.lastTouchMs) || Date.now(),
      purchased: Boolean(parsed.purchased),
      abandonedSent: Boolean(parsed.abandonedSent),
    };
  } catch {
    return null;
  }
}

export function writeCartFunnelSnapshot(next: CartFunnelSnapshot | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (!next) {
      localStorage.removeItem(FUNNEL_STATE_STORAGE_KEY);
      return;
    }
    localStorage.setItem(FUNNEL_STATE_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore storage quota errors
  }
}

function hasPurchaseBeenTracked(orderId: string): boolean {
  if (typeof window === 'undefined' || !orderId) return false;
  try {
    const raw = localStorage.getItem(PURCHASED_IDS_STORAGE_KEY);
    const ids = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(ids) && ids.includes(orderId);
  } catch {
    return false;
  }
}

function markPurchaseTracked(orderId: string): void {
  if (typeof window === 'undefined' || !orderId) return;
  try {
    const raw = localStorage.getItem(PURCHASED_IDS_STORAGE_KEY);
    const prev = raw ? (JSON.parse(raw) as unknown) : [];
    const list = Array.isArray(prev) ? prev.filter((x): x is string => typeof x === 'string') : [];
    if (!list.includes(orderId)) {
      const next = [...list.slice(-49), orderId];
      localStorage.setItem(PURCHASED_IDS_STORAGE_KEY, JSON.stringify(next));
    }
  } catch {
    // ignore storage quota errors
  }
}

export function trackEvent(name: AnalyticsEventName, params: Record<string, string | number | undefined> = {}) {
  if (typeof window === 'undefined') return;
  try {
    if (name !== 'pageview') {
      ensureGoogleAnalyticsLoaded();
      window.gtag?.('event', name, {
        ...params,
        transport_type: 'beacon',
      });
    }

    const body = JSON.stringify({ name, params, path: window.location.pathname });
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', body);
    } else {
      fetch('/api/track', { method: 'POST', body, keepalive: true }).catch(() => {});
    }
  } catch {
    // il tracking non deve mai rompere la UI
  }
}

export function trackEcommerceEvent(
  name: EcommerceEventName,
  payload: {
    value: number;
    currency?: string;
    transaction_id?: string;
    payment_type?: string;
    order_id?: string;
    abandon_stage?: string;
    item_count?: number;
    items?: Ga4EcommerceItem[];
  },
): void {
  if (typeof window === 'undefined') return;
  try {
    if (name === 'purchase') {
      const txId = (payload.transaction_id || '').trim();
      if (!txId || hasPurchaseBeenTracked(txId)) return;
      markPurchaseTracked(txId);
    }
    ensureGoogleAnalyticsLoaded();
    window.gtag?.('event', name, {
      currency: payload.currency || 'EUR',
      value: Number((Number(payload.value) || 0).toFixed(2)),
      ...(payload.transaction_id ? { transaction_id: payload.transaction_id } : {}),
      ...(payload.payment_type ? { payment_type: payload.payment_type } : {}),
      ...(payload.order_id ? { order_id: payload.order_id } : {}),
      ...(payload.abandon_stage ? { abandon_stage: payload.abandon_stage } : {}),
      ...(typeof payload.item_count === 'number' ? { item_count: payload.item_count } : {}),
      ...(payload.items ? { items: payload.items } : {}),
      transport_type: 'beacon',
    });
  } catch {
    // il tracking non deve mai rompere la UI
  }
}
