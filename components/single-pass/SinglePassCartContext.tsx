'use client';

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  readCartFunnelSnapshot,
  trackEcommerceEvent,
  writeCartFunnelSnapshot,
} from '@/lib/analytics';
import { readClientAttribution } from './AttributionTracker';
import {
  SINGLE_PASS_FEE_RATE,
  computeSinglePassPrice,
  getSkuFeeRate,
  getSkuMaxQuantity,
  isCheckoutItemAllowed,
  isSinglePassStorefrontPath,
  resolveCatalogSku,
  validateTerrazzaDuomoCart,
  type TerrazzaCartValidationResult,
} from '@/lib/single-pass/catalog';
import {
  SUPPORTED_CURRENCIES,
  convertEurBreakdown,
  convertEurCentsSingle,
  defaultCurrencyForLocaleAndCountry,
  formatMinorCurrency,
  normalizeSupportedCurrency,
  type SupportedCurrency,
} from '@/lib/single-pass/currency';

export type SinglePassCartItem = {
  skuId: string;
  quantity: number;
  dietaryChoice?: string;
  addedFromPath?: string;
  addedFromTitle?: string;
  channel?: 'single-pass' | 'venue';
};

export function cartRowKey(item: {
  skuId: string;
  channel?: 'single-pass' | 'venue';
}): string {
  return `${item.skuId}::${item.channel || 'venue'}`;
}

const STORAGE_KEY = 'nlm_single_pass_cart_v1';
const CURRENCY_STORAGE_KEY = 'nlm_preferred_currency_v1';
const CART_SESSION_STORAGE_KEY = 'nlm_cart_session_id_v1';

function generateBrowserCartSessionId(): string {
  const bytes = new Uint8Array(20);
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i += 1) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

function readOrCreateCartSessionId(): string {
  try {
    const existing = localStorage.getItem(CART_SESSION_STORAGE_KEY) || '';
    if (/^[a-f0-9]{32,64}$/i.test(existing.trim())) {
      return existing.trim().toLowerCase();
    }
    const created = generateBrowserCartSessionId();
    localStorage.setItem(CART_SESSION_STORAGE_KEY, created);
    return created;
  } catch {
    return generateBrowserCartSessionId();
  }
}

const DEFAULT_FX_RATES: Record<SupportedCurrency, number> = {
  EUR: 1,
  USD: 1.07,
  GBP: 0.835,
  CHF: 0.94,
  PLN: 4.32,
  SEK: 11.55,
  NOK: 11.75,
  DKK: 7.46,
  CZK: 25.35,
  HUF: 407,
  RON: 4.98,
  BGN: 1.9558,
  ISK: 149,
  TRY: 36.8,
  AED: 3.93,
  SAR: 4.01,
  CAD: 1.49,
  AUD: 1.63,
  JPY: 164,
  CNY: 7.72,
  BRL: 6.18,
  RSD: 117.1,
};

type SinglePassCartContextValue = {
  items: SinglePassCartItem[];
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addItem: (
    skuId: string,
    quantity?: number,
    dietaryChoice?: string,
    openDrawer?: boolean,
    addedFromPath?: string,
    addedFromTitle?: string,
    channel?: 'single-pass' | 'venue',
  ) => void;
  updateQuantity: (skuId: string, quantity: number, channel?: 'single-pass' | 'venue') => void;
  updateDietary: (skuId: string, dietaryChoice: string, channel?: 'single-pass' | 'venue') => void;
  removeItem: (skuId: string, channel?: 'single-pass' | 'venue') => void;
  clearCart: (opts?: { converted?: boolean }) => void;
  cartSessionId: string;
  itemCount: number;
  totalGuests: number;
  subtotalBaseCents: number;
  totalFeeCents: number;
  grandTotalCents: number;
  effectiveFeeRate: number;
  hasMixedFeeRates: boolean;
  hasTerrazzaDuomo21: boolean;
  cartValidation: TerrazzaCartValidationResult;
  currency: SupportedCurrency;
  setCurrency: (next: SupportedCurrency) => void;
  fxRates: Record<SupportedCurrency, number>;
  fxUpdatedAt: string | null;
  convertedSubtotalMinor: number;
  convertedFeeMinor: number;
  convertedTotalMinor: number;
  currentFxRate: number;
  formatConvertedEurCents: (eurCents: number) => string;
  supportedCurrencies: readonly SupportedCurrency[];
  mounted: boolean;
};

const SinglePassCartContext = createContext<SinglePassCartContextValue | undefined>(undefined);

export function SinglePassCartProvider({
  children,
  locale = 'en',
}: {
  children: React.ReactNode;
  locale?: string;
}) {
  const [items, setItems] = useState<SinglePassCartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currency, setCurrencyState] = useState<SupportedCurrency>(() =>
    defaultCurrencyForLocaleAndCountry(locale),
  );
  const [fxRates, setFxRates] = useState<Record<SupportedCurrency, number>>(DEFAULT_FX_RATES);
  const [fxUpdatedAt, setFxUpdatedAt] = useState<string | null>(null);
  const [cartSessionId, setCartSessionId] = useState<string>('');
  const userMutatedRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    setCartSessionId(readOrCreateCartSessionId());
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed)) {
          const valid = parsed
            .filter(
              (entry): entry is SinglePassCartItem =>
                Boolean(entry) &&
                typeof entry === 'object' &&
                typeof (entry as SinglePassCartItem).skuId === 'string',
            )
            .flatMap((entry) => {
              const resolved = resolveCatalogSku(entry.skuId);
              if (!resolved) return [];
              const entryChannel: 'single-pass' | 'venue' =
                entry.channel === 'single-pass'
                  ? 'single-pass'
                  : entry.channel === 'venue'
                    ? 'venue'
                    : isSinglePassStorefrontPath(entry.addedFromPath)
                      ? 'single-pass'
                      : 'venue';
              if (!isCheckoutItemAllowed(resolved, entryChannel).ok) {
                return [];
              }
              const maxQty = getSkuMaxQuantity(resolved);
              return [
                {
                  skuId: entry.skuId,
                  quantity: Math.max(1, Math.min(maxQty, Math.floor(Number(entry.quantity) || 1))),
                  ...(entry.dietaryChoice
                    ? { dietaryChoice: String(entry.dietaryChoice).slice(0, 60) }
                    : {}),
                  ...(entry.addedFromPath
                    ? { addedFromPath: String(entry.addedFromPath).slice(0, 200) }
                    : {}),
                  ...(entry.addedFromTitle
                    ? { addedFromTitle: String(entry.addedFromTitle).slice(0, 140) }
                    : {}),
                  channel: entryChannel,
                },
              ];
            });
          setItems(valid);
        }
      }

      const savedCurrency = localStorage.getItem(CURRENCY_STORAGE_KEY);
      if (savedCurrency) {
        setCurrencyState(normalizeSupportedCurrency(savedCurrency));
      }
    } catch {
      // Ignore corrupted storage
    }

    fetch(`/api/single-pass/fx?locale=${encodeURIComponent(locale)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data?.ok || !data?.rates) return;
        setFxRates((prev) => ({ ...prev, ...data.rates }));
        if (data.updatedAt) setFxUpdatedAt(String(data.updatedAt));
        const hasManual = Boolean(localStorage.getItem(CURRENCY_STORAGE_KEY));
        if (!hasManual && data.defaultCurrency) {
          setCurrencyState(normalizeSupportedCurrency(data.defaultCurrency));
        }
      })
      .catch(() => {
        // Keep baseline rates
      });
  }, [locale]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore quota errors
    }
  }, [items, mounted]);

  useEffect(() => {
    if (!mounted || !cartSessionId || !userMutatedRef.current) return;
    const timer = window.setTimeout(() => {
      const attr = readClientAttribution();
      fetch('/api/single-pass/cart-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({
          cartSessionId,
          locale,
          currency,
          stage: 'cart',
          cleared: items.length === 0,
          items,
          attribution: attr,
        }),
      }).catch(() => {});
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [items, mounted, cartSessionId, locale, currency]);

  const setCurrency = (next: SupportedCurrency) => {
    const clean = normalizeSupportedCurrency(next);
    setCurrencyState(clean);
    try {
      localStorage.setItem(CURRENCY_STORAGE_KEY, clean);
    } catch {
      // Ignore quota errors
    }
  };

  const addItem = (
    skuId: string,
    quantity = 1,
    dietaryChoice?: string,
    openDrawer = true,
    addedFromPath?: string,
    addedFromTitle?: string,
    channel?: 'single-pass' | 'venue',
  ) => {
    const sku = resolveCatalogSku(skuId);
    if (!sku) return;
    const maxQty = getSkuMaxQuantity(sku);
    const safeQty = Math.max(1, Math.min(maxQty, Math.floor(quantity)));
    const originPath =
      addedFromPath ||
      (typeof window !== 'undefined' ? window.location.pathname.slice(0, 200) : undefined);
    const originTitle =
      addedFromTitle ||
      (typeof document !== 'undefined' ? document.title.slice(0, 140) : undefined);
    const resolvedChannel: 'single-pass' | 'venue' =
      channel ||
      (isSinglePassStorefrontPath(originPath) ? 'single-pass' : 'venue');
    if (!isCheckoutItemAllowed(sku, resolvedChannel).ok) return;
    userMutatedRef.current = true;

      const linePricing = computeSinglePassPrice(
        sku.basePriceCents,
        safeQty,
        getSkuFeeRate(sku, resolvedChannel),
      );
      trackEcommerceEvent('add_to_cart', {
        currency: 'EUR',
        value: linePricing.lineTotalCents / 100,
        item_count: safeQty,
        items: [
          {
            item_id: sku.id,
            item_name: sku.titleIt || sku.titleEn,
            item_category: resolvedChannel,
            price: Number((linePricing.unitTotalCents / 100).toFixed(2)),
            quantity: safeQty,
          },
        ],
      });

    setItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.skuId === sku.id && (i.channel || 'venue') === resolvedChannel,
      );
      if (idx >= 0) {
        const next = [...prev];
        const cur = next[idx];
        next[idx] = {
          skuId: sku.id,
          quantity: Math.min(maxQty, cur.quantity + safeQty),
          dietaryChoice: dietaryChoice || cur.dietaryChoice || sku.dietaryPreset,
          addedFromPath: cur.addedFromPath || originPath,
          addedFromTitle: cur.addedFromTitle || originTitle,
          channel: channel || cur.channel || resolvedChannel,
        };
        return next;
      }
      return [
        ...prev,
        {
          skuId: sku.id,
          quantity: safeQty,
          ...(dietaryChoice || sku.dietaryPreset
            ? { dietaryChoice: dietaryChoice || sku.dietaryPreset }
            : {}),
          ...(originPath ? { addedFromPath: originPath } : {}),
          ...(originTitle ? { addedFromTitle: originTitle } : {}),
          channel: resolvedChannel,
        },
      ];
    });
    if (openDrawer) setCartOpen(true);
  };

  const updateQuantity = (
    skuId: string,
    quantity: number,
    channel?: 'single-pass' | 'venue',
  ) => {
    const safeQty = Math.floor(quantity);
    if (safeQty <= 0) {
      removeItem(skuId, channel);
      return;
    }
    const sku = resolveCatalogSku(skuId);
    const maxQty = sku ? getSkuMaxQuantity(sku) : 10;
    userMutatedRef.current = true;
    setItems((prev) =>
      prev.map((item) =>
        item.skuId === skuId && (!channel || (item.channel || 'venue') === channel)
          ? { ...item, quantity: Math.max(1, Math.min(maxQty, safeQty)) }
          : item,
      ),
    );
  };

  const updateDietary = (
    skuId: string,
    dietaryChoice: string,
    channel?: 'single-pass' | 'venue',
  ) => {
    userMutatedRef.current = true;
    setItems((prev) =>
      prev.map((item) =>
        item.skuId === skuId && (!channel || (item.channel || 'venue') === channel)
          ? { ...item, dietaryChoice }
          : item,
      ),
    );
  };

  const removeItem = (skuId: string, channel?: 'single-pass' | 'venue') => {
    userMutatedRef.current = true;
    setItems((prev) =>
      prev.filter(
        (i) => !(i.skuId === skuId && (!channel || (i.channel || 'venue') === channel)),
      ),
    );
  };

  const clearCart = (opts?: { converted?: boolean }) => {
    if (opts?.converted) {
      userMutatedRef.current = false;
      const prevSnap = readCartFunnelSnapshot();
      if (prevSnap) {
        writeCartFunnelSnapshot({ ...prevSnap, active: false, purchased: true });
      }
      const nextSessionId = generateBrowserCartSessionId();
      setCartSessionId(nextSessionId);
      try {
        localStorage.setItem(CART_SESSION_STORAGE_KEY, nextSessionId);
      } catch {
        // Ignore storage errors
      }
      setItems([]);
      return;
    }
    userMutatedRef.current = true;
    writeCartFunnelSnapshot(null);
    setItems([]);
  };

  const totals = useMemo(() => {
    let itemCount = 0;
    let totalGuests = 0;
    let subtotalBaseCents = 0;
    let totalFeeCents = 0;
    let grandTotalCents = 0;
    const distinctFeeRates = new Set<number>();
    let hasTerrazzaDuomo21 = false;
    const resolvedPairs: Array<{ sku: NonNullable<ReturnType<typeof resolveCatalogSku>>; quantity: number }> = [];

    for (const item of items) {
      const sku = resolveCatalogSku(item.skuId);
      if (!sku) continue;
      const itemChannel = item.channel || 'venue';
      if (!isCheckoutItemAllowed(sku, itemChannel).ok) continue;
      if (sku.venueId === 'terrazza-duomo-21') hasTerrazzaDuomo21 = true;
      const skuFeeRate = getSkuFeeRate(sku, itemChannel);
      distinctFeeRates.add(skuFeeRate);
      const pricing = computeSinglePassPrice(sku.basePriceCents, item.quantity, skuFeeRate);
      itemCount += item.quantity;
      totalGuests += Math.max(0, sku.guestsPerUnit ?? 1) * item.quantity;
      subtotalBaseCents += pricing.lineBaseCents;
      totalFeeCents += pricing.lineFeeCents;
      grandTotalCents += pricing.lineTotalCents;
      resolvedPairs.push({ sku, quantity: item.quantity });
    }

    const hasMixedFeeRates = distinctFeeRates.size > 1;
    const effectiveFeeRate =
      distinctFeeRates.size === 1
        ? Array.from(distinctFeeRates)[0]
        : subtotalBaseCents > 0
          ? Math.round((totalFeeCents / subtotalBaseCents) * 10000) / 10000
          : SINGLE_PASS_FEE_RATE;
    const cartValidation = validateTerrazzaDuomoCart(resolvedPairs);

    const rate = fxRates[currency] || 1;
    const converted = convertEurBreakdown(subtotalBaseCents, totalFeeCents, currency, rate);
    return {
      itemCount,
      totalGuests,
      subtotalBaseCents,
      totalFeeCents,
      grandTotalCents,
      effectiveFeeRate,
      hasMixedFeeRates,
      hasTerrazzaDuomo21,
      cartValidation,
      convertedSubtotalMinor: converted.subtotalMinor,
      convertedFeeMinor: converted.feeMinor,
      convertedTotalMinor: converted.totalMinor,
      currentFxRate: converted.rate,
    };
  }, [items, currency, fxRates]);

  const formatConvertedEurCents = (eurCents: number) => {
    const minor = convertEurCentsSingle(eurCents, currency, totals.currentFxRate);
    return formatMinorCurrency(minor, currency, locale);
  };

  useEffect(() => {
    if (!mounted) return;
    const ABANDON_IDLE_MS = 25 * 60 * 1000;
    const prev = readCartFunnelSnapshot();
    const now = Date.now();

    if (items.length === 0) {
      if (prev && !prev.purchased) {
        writeCartFunnelSnapshot(null);
      }
      return;
    }

    if (
      prev &&
      prev.active &&
      !prev.purchased &&
      !prev.abandonedSent &&
      now - prev.lastTouchMs >= ABANDON_IDLE_MS
    ) {
      trackEcommerceEvent('cart_abandoned', {
        currency: 'EUR',
        value: prev.valueEur || totals.grandTotalCents / 100,
        item_count: prev.itemCount || totals.itemCount,
        abandon_stage: prev.stage,
        ...(prev.orderId ? { order_id: prev.orderId } : {}),
      });
      writeCartFunnelSnapshot({
        ...prev,
        valueEur: Number((totals.grandTotalCents / 100).toFixed(2)),
        itemCount: totals.itemCount,
        abandonedSent: true,
        lastTouchMs: now,
      });
      return;
    }

    const nextSnap = {
      active: true,
      stage: prev?.stage || ('cart' as const),
      valueEur: Number((totals.grandTotalCents / 100).toFixed(2)),
      itemCount: totals.itemCount,
      orderId: prev?.orderId,
      lastTouchMs: userMutatedRef.current || !prev ? now : prev.lastTouchMs,
      purchased: false,
      abandonedSent: Boolean(prev?.abandonedSent),
    };
    writeCartFunnelSnapshot(nextSnap);

    const idleTimer = window.setTimeout(() => {
      const latest = readCartFunnelSnapshot();
      if (!latest || !latest.active || latest.purchased || latest.abandonedSent) return;
      trackEcommerceEvent('cart_abandoned', {
        currency: 'EUR',
        value: latest.valueEur,
        item_count: latest.itemCount,
        abandon_stage: latest.stage,
        ...(latest.orderId ? { order_id: latest.orderId } : {}),
      });
      writeCartFunnelSnapshot({ ...latest, abandonedSent: true });
    }, ABANDON_IDLE_MS);

    return () => window.clearTimeout(idleTimer);
  }, [mounted, items.length, totals.grandTotalCents, totals.itemCount]);

  return (
    <SinglePassCartContext.Provider
      value={{
        items,
        isCartOpen,
        setCartOpen,
        addItem,
        updateQuantity,
        updateDietary,
        removeItem,
        clearCart,
        cartSessionId,
        ...totals,
        currency,
        setCurrency,
        fxRates,
        fxUpdatedAt,
        formatConvertedEurCents,
        supportedCurrencies: SUPPORTED_CURRENCIES,
        mounted,
      }}
    >
      {children}
    </SinglePassCartContext.Provider>
  );
}

export function useSinglePassCart() {
  const ctx = useContext(SinglePassCartContext);
  if (!ctx) {
    throw new Error('useSinglePassCart must be used within a SinglePassCartProvider');
  }
  return ctx;
}
