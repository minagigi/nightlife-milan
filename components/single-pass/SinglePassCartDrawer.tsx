'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Minus, Plus, ShoppingBag, Trash2, UserCheck, X } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { localePrefix } from '@/lib/i18n/locales';
import {
  VENUE_BY_ID,
  computeSinglePassPrice,
  formatEurFromCents,
  getSkuFeeRate,
  resolveCatalogSku,
} from '@/lib/single-pass/catalog';
import { formatMinorCurrency, type SupportedCurrency } from '@/lib/single-pass/currency';
import {
  formatFeeLabel35,
  getCheckoutUxCopy,
  getSinglePassCopy,
  getTerrazzaCheckoutUi35,
} from '@/lib/single-pass/i18n35';
import { cartRowKey, useSinglePassCart } from './SinglePassCartContext';

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
    effectiveFeeRate,
    hasMixedFeeRates,
    cartValidation,
    currency,
    setCurrency,
    convertedTotalMinor,
    supportedCurrencies,
  } = useSinglePassCart();

  const copy = getSinglePassCopy(lang);
  const uxCopy = getCheckoutUxCopy(lang);
  const terrazzaUi = getTerrazzaCheckoutUi35(lang);
  const feeLabel = formatFeeLabel35(lang, effectiveFeeRate, hasMixedFeeRates);
  const lp = localePrefix(lang);
  const isIt = lang === 'it';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new CustomEvent('nlm:cart-drawer', { detail: { open: isCartOpen } }));
    return () => {
      window.dispatchEvent(new CustomEvent('nlm:cart-drawer', { detail: { open: false } }));
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[10000] bg-black/70"
            style={{ zIndex: 10000 }}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
            role="dialog"
            aria-modal="true"
            aria-label={copy.drawerTitle}
            data-ui="cart-drawer"
            className="fixed right-0 top-0 z-[10001] flex h-full w-full flex-col border-l border-[#0A0A0C]/20 bg-[#EDEBE6] text-[#0A0A0C] sm:w-[440px]"
            style={{ zIndex: 10001 }}
          >
            <div className="flex items-center justify-between border-b border-[#0A0A0C]/16 bg-[#0A0A0C] px-6 py-4 text-[#FFFFFF]">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-5 w-5 text-[#FFFFFF]" aria-hidden="true" />
                <h2 className="font-display text-2xl font-bold uppercase text-[#FFFFFF]">
                  {copy.drawerTitle}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Close"
                className="flex h-11 w-11 items-center justify-center border border-[#FFFFFF]/25 text-[#FFFFFF] transition hover:border-[#FFFFFF]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center border border-[#0A0A0C]/16 bg-[#FFFFFF]">
                    <ShoppingBag className="h-7 w-7 text-[#0A0A0C]" />
                  </div>
                  <p className="font-display text-2xl font-bold uppercase text-[#0A0A0C]">
                    {copy.drawerEmptyTitle}
                  </p>
                  <p className="max-w-xs text-sm text-[#4F4D48]">{copy.drawerEmptyBody}</p>
                  <Link
                    href={`${lp}/single-pass`}
                    locale={lang}
                    onClick={() => setCartOpen(false)}
                    className="inline-flex min-h-[48px] items-center justify-center bg-[#D9381E] px-6 py-3 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#B82B14]"
                  >
                    {copy.drawerExploreCta}
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => {
                    const sku = resolveCatalogSku(item.skuId);
                    if (!sku) return null;
                    const venue = VENUE_BY_ID[sku.venueId];
                    const venueName = sku.venueNameOverride || venue?.name || 'Nightlife Milan';
                    const posterSrc =
                      venue?.posterSrc ||
                      '/images/events/capodanno-2027-posters/capodanno-justme-milano-torre-branca.webp';
                    const skuFeeRate = getSkuFeeRate(sku, item.channel || 'venue');
                    const pricing = computeSinglePassPrice(
                      sku.basePriceCents,
                      item.quantity,
                      skuFeeRate,
                    );
                    const pkgTitle = isIt ? sku.titleIt : sku.titleEn;
                    const feePct = Math.round(skuFeeRate * 100);

                    return (
                      <div
                        key={cartRowKey(item)}
                        className="border border-[#0A0A0C]/16 bg-[#FFFFFF] p-4"
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={posterSrc}
                            alt={venueName}
                            data-no-lightbox="true"
                            className="h-16 w-16 shrink-0 border border-[#0A0A0C]/15 bg-[#0A0A0C] object-contain"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-xs font-bold text-[#4F4D48]">
                                {venueName} · {sku.arrivalTime}
                              </p>
                              {item.channel === 'single-pass' && (
                                <span className="border border-[#0A0A0C]/25 bg-[#EDEBE6] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#0A0A0C]">
                                  Single Pass
                                </span>
                              )}
                            </div>
                            <p className="mt-0.5 font-display text-lg font-bold leading-snug text-[#0A0A0C]">
                              {pkgTitle}
                            </p>
                            {item.dietaryChoice && (
                              <p className="mt-1 text-xs text-[#4F4D48]">{item.dietaryChoice}</p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.skuId, item.channel)}
                            aria-label={copy.removeItemLabel}
                            className="flex h-10 w-10 items-center justify-center border border-[#0A0A0C]/15 text-[#4F4D48] transition hover:border-[#B91C1C] hover:text-[#B91C1C]"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-3 flex items-center justify-between border-t border-[#0A0A0C]/12 pt-3 tabular-nums">
                          <div className="inline-flex items-center border border-[#0A0A0C]/25 bg-[#EDEBE6]">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.skuId, item.quantity - 1, item.channel)}
                              aria-label="Decrease quantity"
                              className="flex h-9 w-9 items-center justify-center text-[#0A0A0C] hover:bg-[#0A0A0C]/10"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="min-w-[2rem] text-center text-sm font-bold text-[#0A0A0C]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.skuId, item.quantity + 1, item.channel)}
                              aria-label="Increase quantity"
                              className="flex h-9 w-9 items-center justify-center text-[#0A0A0C] hover:bg-[#0A0A0C]/10"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <div className="text-right">
                            {feePct > 0 && (
                              <p className="text-xs text-[#4F4D48]">
                                {formatEurFromCents(pricing.lineBaseCents, lang)} + {feePct}%
                              </p>
                            )}
                            <p className="font-display text-2xl font-extrabold text-[#0A0A0C]">
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

            <div className="border-t border-[#0A0A0C]/16 bg-[#FFFFFF] p-6">
              {items.length > 0 && (
                <div className="mb-4 space-y-2.5 text-sm tabular-nums">
                  <div className="flex items-center justify-between gap-2 pb-1">
                    <label htmlFor="drawer-currency-select" className="text-xs font-bold text-[#4F4D48]">
                      {copy.currencySelectorLabel}
                    </label>
                    <select
                      id="drawer-currency-select"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value as SupportedCurrency)}
                      className="h-9 border border-[#0A0A0C]/30 bg-[#FFFFFF] px-2.5 text-xs font-bold text-[#0A0A0C]"
                    >
                      {supportedCurrencies.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-between text-[#4F4D48]">
                    <span>{copy.drawerSubtotalLabel}</span>
                    <span className="font-semibold text-[#0A0A0C]">
                      {formatEurFromCents(subtotalBaseCents, lang)}
                    </span>
                  </div>
                  {totalFeeCents > 0 && (
                    <div className="flex justify-between text-[#4F4D48]">
                      <span>{feeLabel}</span>
                      <span className="font-semibold text-[#0A0A0C]">
                        +{formatEurFromCents(totalFeeCents, lang)}
                      </span>
                    </div>
                  )}
                  {!cartValidation.ok && (
                    <div
                      role="alert"
                      className="flex items-start gap-2 border-2 border-[#B91C1C] bg-[#FEF2F2] p-3 text-xs font-semibold text-[#B91C1C]"
                    >
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>
                        {cartValidation.errorCode === 'TABLE_REQUIRES_FORMULA'
                          ? terrazzaUi.tableRequiresFormulaError || uxCopy.errTableRequiresFormula
                          : terrazzaUi.tableMaxGuestsExceededError || uxCopy.errTableMaxGuests}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-[#0A0A0C]/16 pt-2 text-base font-extrabold text-[#0A0A0C]">
                    <span>{copy.totalLabel}</span>
                    <span className="font-display text-2xl text-[#0A0A0C]">
                      {formatEurFromCents(grandTotalCents, lang)}
                    </span>
                  </div>
                  {currency !== 'EUR' && (
                    <div className="flex justify-between text-[13px] font-bold text-[#B5240D]">
                      <span>
                        {copy.chargedInCurrencyLabel} ({currency})
                      </span>
                      <span>~{formatMinorCurrency(convertedTotalMinor, currency, lang)}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="grid gap-2.5">
                {items.length > 0 && (
                  <>
                    <Link
                      href={`${lp}/checkout`}
                      locale={lang}
                      onClick={() => setCartOpen(false)}
                      className="flex min-h-[50px] w-full items-center justify-center bg-[#D9381E] px-5 py-3 text-sm font-extrabold uppercase tracking-wider text-[#FFFFFF] transition hover:bg-[#B82B14]"
                    >
                      {copy.drawerCheckoutCta}
                    </Link>
                    <Link
                      href={`${lp}/cart`}
                      locale={lang}
                      onClick={() => setCartOpen(false)}
                      className="flex min-h-[44px] w-full items-center justify-center border border-[#0A0A0C] bg-[#FFFFFF] px-4 py-2 text-xs font-bold text-[#0A0A0C] transition hover:bg-[#0A0A0C] hover:text-[#FFFFFF]"
                    >
                      {copy.drawerCartCta}
                    </Link>
                  </>
                )}
                <Link
                  href={`${lp}/account`}
                  locale={lang}
                  onClick={() => setCartOpen(false)}
                  className="flex min-h-[44px] w-full items-center justify-center gap-2 border border-[#0A0A0C]/25 bg-[#EDEBE6] px-4 py-2 text-xs font-bold text-[#0A0A0C] transition hover:border-[#0A0A0C]"
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
