'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Minus, Plus, ShoppingBag, Trash2, UserCheck, X } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { localePrefix } from '@/lib/i18n/locales';
import {
  SKU_BY_ID,
  VENUE_BY_ID,
  computeSinglePassPrice,
  formatEurFromCents,
} from '@/lib/single-pass/catalog';
import { getSinglePassCopy } from '@/lib/single-pass/i18n35';
import { useSinglePassCart } from './SinglePassCartContext';

export default function SinglePassCartDrawer({ lang }: { lang: string }) {
  const {
    items,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeItem,
    subtotalBaseCents,
    totalFeeCents,
    grandTotalCents,
  } = useSinglePassCart();

  const copy = getSinglePassCopy(lang);
  const lp = localePrefix(lang);
  const isIt = lang === 'it';

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[105] bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            role="dialog"
            aria-modal="true"
            aria-label={copy.drawerTitle}
            className="fixed right-0 top-0 z-[106] flex h-full w-full flex-col border-l border-[#F6F1E7]/15 bg-[#050505] text-[#F6F1E7] shadow-2xl sm:w-[440px]"
          >
            <div className="flex items-center justify-between border-b border-[#F6F1E7]/14 px-6 py-5">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-5 w-5 text-[#EAE3D5]" aria-hidden="true" />
                <h2 className="font-serif text-xl font-bold text-[#F6F1E7]">{copy.drawerTitle}</h2>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Close"
                className="flex h-10 w-10 items-center justify-center border border-[#F6F1E7]/15 text-[#C2B9AA] transition hover:border-[#F6F1E7] hover:text-[#F6F1E7]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center border border-[#F6F1E7]/20 bg-[#0B0A09]">
                    <ShoppingBag className="h-7 w-7 text-[#EAE3D5]" />
                  </div>
                  <p className="font-serif text-xl font-bold text-[#F6F1E7]">{copy.drawerEmptyTitle}</p>
                  <p className="max-w-xs text-sm text-[#C2B9AA]">{copy.drawerEmptyBody}</p>
                  <Link
                    href={`${lp}/single-pass`}
                    locale={lang}
                    onClick={() => setCartOpen(false)}
                    className="inline-flex min-h-[44px] items-center justify-center bg-[#F6F1E7] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#050505] transition hover:bg-[#EAE3D5]"
                  >
                    {copy.drawerExploreCta}
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => {
                    const sku = SKU_BY_ID.get(item.skuId);
                    if (!sku) return null;
                    const venue = VENUE_BY_ID[sku.venueId];
                    const pricing = computeSinglePassPrice(sku.basePriceCents, item.quantity);
                    const pkgTitle = isIt ? sku.titleIt : sku.titleEn;

                    return (
                      <div
                        key={item.skuId}
                        className="border border-[#F6F1E7]/16 bg-[#0B0A09] p-4"
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={venue.posterSrc}
                            alt={venue.name}
                            className="h-16 w-16 shrink-0 border border-[#F6F1E7]/15 bg-[#050505] object-contain"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#EAE3D5]">
                              {venue.name} · {isIt ? venue.ageBandLabelIt : venue.ageBandLabelEn}
                            </p>
                            <p className="mt-1 font-serif text-base font-bold leading-snug text-[#F6F1E7]">
                              {pkgTitle}
                            </p>
                            {item.dietaryChoice && (
                              <p className="mt-1 text-xs text-[#C2B9AA]">{item.dietaryChoice}</p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.skuId)}
                            aria-label={copy.removeItemLabel}
                            className="flex h-8 w-8 items-center justify-center text-[#847C6F] transition hover:text-rose-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-3 flex items-center justify-between border-t border-[#F6F1E7]/10 pt-3">
                          <div className="inline-flex items-center border border-[#F6F1E7]/20 bg-[#050505]">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.skuId, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="flex h-8 w-8 items-center justify-center text-[#F6F1E7] hover:bg-white/10"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="min-w-[2rem] text-center font-mono text-xs font-bold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.skuId, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="flex h-8 w-8 items-center justify-center text-[#F6F1E7] hover:bg-white/10"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <div className="text-right font-mono">
                            <p className="text-[11px] text-[#847C6F]">
                              {formatEurFromCents(pricing.lineBaseCents, lang)} + 15%
                            </p>
                            <p className="text-sm font-bold text-[#F6F1E7]">
                              {formatEurFromCents(pricing.lineTotalCents, lang)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="border-t border-[#F6F1E7]/14 bg-[#0B0A09] p-6">
              {items.length > 0 && (
                <div className="mb-4 space-y-2 text-sm">
                  <div className="flex justify-between text-[#C2B9AA]">
                    <span>{copy.drawerSubtotalLabel}</span>
                    <span className="font-mono">{formatEurFromCents(subtotalBaseCents, lang)}</span>
                  </div>
                  <div className="flex justify-between text-[#EAE3D5]">
                    <span>{copy.feeLabel}</span>
                    <span className="font-mono">+{formatEurFromCents(totalFeeCents, lang)}</span>
                  </div>
                  <div className="flex justify-between border-t border-[#F6F1E7]/15 pt-2 text-base font-bold text-[#F6F1E7]">
                    <span>{copy.totalLabel}</span>
                    <span className="font-mono">{formatEurFromCents(grandTotalCents, lang)}</span>
                  </div>
                </div>
              )}

              <div className="grid gap-2.5">
                {items.length > 0 && (
                  <Link
                    href={`${lp}/cart`}
                    locale={lang}
                    onClick={() => setCartOpen(false)}
                    className="flex min-h-[48px] w-full items-center justify-center bg-[#F6F1E7] px-5 py-3 text-xs font-extrabold uppercase tracking-widest text-[#050505] transition hover:bg-[#EAE3D5]"
                  >
                    {copy.drawerCheckoutCta}
                  </Link>
                )}
                <Link
                  href={`${lp}/account`}
                  locale={lang}
                  onClick={() => setCartOpen(false)}
                  className="flex min-h-[44px] w-full items-center justify-center gap-2 border border-[#F6F1E7]/30 bg-[#050505] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#F6F1E7] transition hover:border-[#F6F1E7]"
                >
                  <UserCheck className="h-4 w-4" aria-hidden="true" />
                  {copy.drawerAccountCta}
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
