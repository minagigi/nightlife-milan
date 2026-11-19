'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  SINGLE_PASS_FEE_RATE,
  computeSinglePassPrice,
  getSkuFeeRate,
  getSkuMaxQuantity,
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
};

const STORAGE_KEY = 'nlm_single_pass_cart_v1';
const CURRENCY_STORAGE_KEY = 'nlm_preferred_currency_v1';

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
  ) => void;
  updateQuantity: (skuId: string, quantity: number) => void;
  updateDietary: (skuId: string, dietaryChoice: string) => void;
  removeItem: (skuId: string) => void;
  clearCart: () => void;
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

  useEffect(() => {
    setMounted(true);
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
                typeof (entry as SinglePassCartItem).skuId === 'string' &&
                Boolean(resolveCatalogSku((entry as SinglePassCartItem).skuId)),
            )
            .map((entry) => {
              const resolved = resolveCatalogSku(entry.skuId);
              const maxQty = resolved ? getSkuMaxQuantity(resolved) : 10;
              return {
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
              };
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

    setItems((prev) => {
      const idx = prev.findIndex((i) => i.skuId === sku.id);
      if (idx >= 0) {
        const next = [...prev];
        const cur = next[idx];
        next[idx] = {
          skuId: sku.id,
          quantity: Math.min(maxQty, cur.quantity + safeQty),
          dietaryChoice: dietaryChoice || cur.dietaryChoice || sku.dietaryPreset,
          addedFromPath: cur.addedFromPath || originPath,
          addedFromTitle: cur.addedFromTitle || originTitle,
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
        },
      ];
    });
    if (openDrawer) setCartOpen(true);
  };

  const updateQuantity = (skuId: string, quantity: number) => {
    const safeQty = Math.floor(quantity);
    if (safeQty <= 0) {
      removeItem(skuId);
      return;
    }
    const sku = resolveCatalogSku(skuId);
    const maxQty = sku ? getSkuMaxQuantity(sku) : 10;
    setItems((prev) =>
      prev.map((item) =>
        item.skuId === skuId ? { ...item, quantity: Math.max(1, Math.min(maxQty, safeQty)) } : item,
      ),
    );
  };

  const updateDietary = (skuId: string, dietaryChoice: string) => {
    setItems((prev) =>
      prev.map((item) => (item.skuId === skuId ? { ...item, dietaryChoice } : item)),
    );
  };

  const removeItem = (skuId: string) => {
    setItems((prev) => prev.filter((i) => i.skuId !== skuId));
  };

  const clearCart = () => {
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
      if (sku.venueId === 'terrazza-duomo-21') hasTerrazzaDuomo21 = true;
      const skuFeeRate = getSkuFeeRate(sku);
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
