'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, ArrowRight, Minus, Plus, ShoppingBag, Trash2, UserCheck, X } from 'lucide-react';
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
  formatCartValidationError35,
  formatFeeLabel35,
  getCheckoutUxCopy,
  getSinglePassCopy,
  localizeSinglePassSku,
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
            className="fixed inset-0 z-[10000] bg-black/75"
            style={{ zIndex: 10000 }}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.32 }}
            role="dialog"
            aria-modal="true"
            aria-label={copy.drawerTitle}
            data-ui="cart-drawer"
            data-no-lightbox="true"
            className="fixed right-0 top-0 z-[10001] flex h-full w-full flex-col border-l border-[#F6F1E7]/20 bg-[#050505] text-[#F6F1E7] sm:w-[440px]"
            style={{ zIndex: 10001 }}
          >
            {/* CAPITOLO 1 (#050505): TESTATA & VALUTA */}
            <div className="flex items-center justify-between border-b border-[#F6F1E7]/16 bg-[#050505] px-5 py-4 text-[#F6F1E7]">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-5 w-5 text-[#25D366]" aria-hidden="true" />
                <h2 className="font-display text-2xl font-bold text-[#F6F1E7]">
                  {copy.drawerTitle}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Close"
                className="flex h-11 w-11 items-center justify-center border border-[#F6F1E7]/28 bg-[#141311] text-[#F6F1E7] transition hover:border-[#F6F1E7]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* ELENCO ARTICOLI SCELTI (#050505) */}
            <div className="flex-1 overflow-y-auto bg-[#050505] p-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center space-y-4 bg-[#F6F1E7] p-6 text-center text-[#050505]">
                  <div className="flex h-16 w-16 items-center justify-center border border-[#050505] bg-[#FFFFFF]">
                    <ShoppingBag className="h-7 w-7 text-[#050505]" />
                  </div>
                  <p className="font-display text-2xl font-bold text-[#050505]">
                    {copy.drawerEmptyTitle}
                  </p>
                  <p className="max-w-xs text-sm text-[#57534E]">{copy.drawerEmptyBody}</p>
                  <div className="w-full bg-[#050505] p-3">
                    <Link
                      href={`${lp}/single-pass`}
                      locale={lang}
                      onClick={() => setCartOpen(false)}
                      className="inline-flex min-h-[48px] w-full items-center justify-center bg-[#25D366] px-6 py-3 text-sm font-extrabold text-[#050505] transition hover:bg-[#2EE472]"
                    >
                      {copy.drawerExploreCta}
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-3.5">
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
                    const pkgTitle =
                      sku.venueId === 'aprica-world-winter-week'
                        ? localizeSinglePassSku(sku, lang, copy, venueName).title
                        : isIt
                          ? sku.titleIt
                          : sku.titleEn;
                    const feePct = Math.round(skuFeeRate * 100);
                    const itemGuests = Math.max(0, sku.guestsPerUnit ?? 1) * item.quantity;

                    return (
                      <div
                        key={cartRowKey(item)}
                        className="border border-[#F6F1E7]/18 bg-[#141311] p-4 text-[#F6F1E7]"
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={posterSrc}
                            alt={venueName}
                            data-no-lightbox="true"
                            className="aspect-[4/5] w-16 shrink-0 border border-[#F6F1E7]/20 bg-[#050505] object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="font-mono text-xs font-semibold text-[#C2B9AA] tabular-nums">
                                {venueName} · {sku.arrivalTime}
                              </p>
                              {item.channel === 'single-pass' && (
                                <span className="bg-[#EAE3D5] px-2 py-0.5 text-[11px] font-bold text-[#050505]">
                                  Single Pass
                                </span>
                              )}
                            </div>
                            <p className="mt-1 font-display text-lg font-bold leading-snug text-[#F6F1E7]">
                              {pkgTitle}
                            </p>
                            {itemGuests > 0 && (
                              <p className="mt-1 font-mono text-xs text-[#25D366] tabular-nums">
                                {itemGuests}{' '}
                                {itemGuests === 1 ? uxCopy.guestUnitSingular : uxCopy.guestsUnit}
                              </p>
                            )}
                            {item.dietaryChoice && (
                              <p className="mt-1 text-xs text-[#EAE3D5]">{item.dietaryChoice}</p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.skuId, item.channel)}
                            aria-label={copy.removeItemLabel}
                            className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#F6F1E7]/22 bg-[#050505] text-[#C2B9AA] transition hover:border-[#F6F1E7] hover:text-[#F6F1E7]"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-3 flex items-center justify-between border-t border-[#F6F1E7]/14 pt-3 tabular-nums">
                          <div className="inline-flex items-center border border-[#F6F1E7]/30 bg-[#050505]">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.skuId, item.quantity - 1, item.channel)}
                              aria-label="Decrease quantity"
                              className="flex h-11 w-11 items-center justify-center text-[#F6F1E7] hover:bg-[#1E1C19]"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="min-w-[2.25rem] text-center font-mono text-sm font-bold text-[#F6F1E7]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.skuId, item.quantity + 1, item.channel)}
                              aria-label="Increase quantity"
                              className="flex h-11 w-11 items-center justify-center text-[#F6F1E7] hover:bg-[#1E1C19]"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="text-right">
                            {feePct > 0 && (
                              <p className="font-mono text-xs text-[#C2B9AA]">
                                {formatEurFromCents(pricing.lineBaseCents, lang)} + {feePct}%
                              </p>
                            )}
                            <p className="font-display text-2xl font-extrabold text-[#F6F1E7]">
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

            {/* CAPITOLO 2 (#EAE3D5 CHAMPAGNE): SCOMPOSIZIONE COSTI E VALUTA */}
            {items.length > 0 && (
              <div className="border-t border-[#050505] bg-[#EAE3D5] px-5 py-4 text-[#050505]">
                <div className="space-y-2 text-sm tabular-nums">
                  <div className="flex items-center justify-between gap-2 pb-1">
                    <label htmlFor="drawer-currency-select" className="text-xs font-bold text-[#050505]">
                      {copy.currencySelectorLabel}
                    </label>
                    <select
                      id="drawer-currency-select"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value as SupportedCurrency)}
                      className="h-10 border border-[#050505] bg-[#FFFFFF] px-2.5 font-mono text-sm font-bold text-[#050505]"
                    >
                      {supportedCurrencies.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-between text-[#050505]">
                    <span>{copy.drawerSubtotalLabel}</span>
                    <span className="font-mono font-bold text-[#050505]">
                      {formatEurFromCents(subtotalBaseCents, lang)}
                    </span>
                  </div>
                  {totalFeeCents > 0 && (
                    <div className="flex justify-between gap-3 text-[#050505]">
                      <span className="font-semibold">{feeLabel}</span>
                      <span className="shrink-0 font-mono font-bold text-[#050505]">
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
                      <span>{formatCartValidationError35(lang, cartValidation.errorCode)}</span>
                    </div>
                  )}
                  <div className="flex items-baseline justify-between border-t-2 border-[#050505] pt-2 text-base font-extrabold text-[#050505]">
                    <span>{copy.totalLabel}</span>
                    <span className="font-display text-2xl text-[#050505]">
                      {formatEurFromCents(grandTotalCents, lang)}
                    </span>
                  </div>
                  {currency !== 'EUR' && (
                    <div className="flex justify-between border border-[#050505] bg-[#FFFFFF] px-3 py-2 text-xs font-bold text-[#050505]">
                      <span>
                        {copy.chargedInCurrencyLabel} ({currency})
                      </span>
                      <span className="font-mono">~{formatMinorCurrency(convertedTotalMinor, currency, lang)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CAPITOLO 3 (#050505 PLINTO DI AZIONE): CONTRASTO 10.6:1 SU #25D366 */}
            <div className="border-t border-[#F6F1E7]/16 bg-[#050505] p-5">
              <div className="grid gap-2.5">
                {items.length > 0 && (
                  <>
                    <Link
                      href={`${lp}/checkout`}
                      locale={lang}
                      onClick={() => setCartOpen(false)}
                      className="flex min-h-[52px] w-full items-center justify-center gap-2 bg-[#25D366] px-5 py-3 text-base font-extrabold text-[#050505] transition hover:bg-[#2EE472]"
                    >
                      <span>{copy.drawerCheckoutCta}</span>
                      <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                    </Link>
                    <Link
                      href={`${lp}/cart`}
                      locale={lang}
                      onClick={() => setCartOpen(false)}
                      className="flex min-h-[44px] w-full items-center justify-center border border-[#F6F1E7]/30 bg-[#141311] px-4 py-2 text-xs font-bold text-[#F6F1E7] transition hover:border-[#F6F1E7]"
                    >
                      {copy.drawerCartCta}
                    </Link>
                  </>
                )}
                <Link
                  href={`${lp}/account`}
                  locale={lang}
                  onClick={() => setCartOpen(false)}
                  className="flex min-h-[44px] w-full items-center justify-center gap-2 border border-[#F6F1E7]/20 bg-[#0B0A09] px-4 py-2 text-xs font-bold text-[#EAE3D5] transition hover:border-[#F6F1E7] hover:text-[#F6F1E7]"
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
