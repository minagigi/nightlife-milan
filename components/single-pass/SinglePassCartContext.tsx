'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { SKU_BY_ID, computeSinglePassPrice } from '@/lib/single-pass/catalog';

export type SinglePassCartItem = {
  skuId: string;
  quantity: number;
  dietaryChoice?: string;
};

const STORAGE_KEY = 'nlm_single_pass_cart_v1';

type SinglePassCartContextValue = {
  items: SinglePassCartItem[];
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addItem: (skuId: string, quantity?: number, dietaryChoice?: string, openDrawer?: boolean) => void;
  updateQuantity: (skuId: string, quantity: number) => void;
  updateDietary: (skuId: string, dietaryChoice: string) => void;
  removeItem: (skuId: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotalBaseCents: number;
  totalFeeCents: number;
  grandTotalCents: number;
  mounted: boolean;
};

const SinglePassCartContext = createContext<SinglePassCartContextValue | undefined>(undefined);

export function SinglePassCartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<SinglePassCartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

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
                SKU_BY_ID.has((entry as SinglePassCartItem).skuId),
            )
            .map((entry) => ({
              skuId: entry.skuId,
              quantity: Math.max(1, Math.min(10, Math.floor(Number(entry.quantity) || 1))),
              ...(entry.dietaryChoice ? { dietaryChoice: String(entry.dietaryChoice).slice(0, 60) } : {}),
            }));
          setItems(valid);
        }
      }
    } catch {
      // ignore corrupted storage
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage quota errors
    }
  }, [items, mounted]);

  const addItem = (
    skuId: string,
    quantity = 1,
    dietaryChoice?: string,
    openDrawer = true,
  ) => {
    const sku = SKU_BY_ID.get(skuId);
    if (!sku) return;
    const safeQty = Math.max(1, Math.min(10, Math.floor(quantity)));
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.skuId === skuId);
      if (idx >= 0) {
        const next = [...prev];
        const cur = next[idx];
        next[idx] = {
          skuId,
          quantity: Math.min(10, cur.quantity + safeQty),
          dietaryChoice: dietaryChoice || cur.dietaryChoice || sku.dietaryPreset,
        };
        return next;
      }
      return [
        ...prev,
        {
          skuId,
          quantity: safeQty,
          ...(dietaryChoice || sku.dietaryPreset ? { dietaryChoice: dietaryChoice || sku.dietaryPreset } : {}),
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
    setItems((prev) =>
      prev.map((item) =>
        item.skuId === skuId ? { ...item, quantity: Math.max(1, Math.min(10, safeQty)) } : item,
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
    let subtotalBaseCents = 0;
    let totalFeeCents = 0;
    let grandTotalCents = 0;

    for (const item of items) {
      const sku = SKU_BY_ID.get(item.skuId);
      if (!sku) continue;
      const pricing = computeSinglePassPrice(sku.basePriceCents, item.quantity);
      itemCount += item.quantity;
      subtotalBaseCents += pricing.lineBaseCents;
      totalFeeCents += pricing.lineFeeCents;
      grandTotalCents += pricing.lineTotalCents;
    }
    return { itemCount, subtotalBaseCents, totalFeeCents, grandTotalCents };
  }, [items]);

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
