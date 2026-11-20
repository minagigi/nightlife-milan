'use client';

import React from 'react';
import { AlertTriangle, ArrowRight, Minus, Plus, ShieldCheck, ShoppingBag, Trash2 } from 'lucide-react';
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
import { useSinglePassCart } from './SinglePassCartContext';

export default function SinglePassCartPageView({ locale }: { locale: string }) {
  const {
    items,
    updateQuantity,
    updateDietary,
    removeItem,
    subtotalBaseCents,
    totalFeeCents,
    grandTotalCents,
    effectiveFeeRate,
    hasMixedFeeRates,
    cartValidation,
    totalGuests,
    currency,
    setCurrency,
    convertedTotalMinor,
    currentFxRate,
    supportedCurrencies,
    mounted,
  } = useSinglePassCart();

  const copy = getSinglePassCopy(locale);
  const uxCopy = getCheckoutUxCopy(locale);
  const terrazzaUi = getTerrazzaCheckoutUi35(locale);
  const feeLabel = formatFeeLabel35(locale, effectiveFeeRate, hasMixedFeeRates);
  const lp = localePrefix(locale);
  const isIt = locale === 'it';

  if (!mounted) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-16 text-center text-base text-[#4F4D48]">
        Loading...
      </section>
    );
  }

  return (
    <section data-ui="cart-flow" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="border-b border-[#0A0A0C]/16 pb-6">
        <h1 className="font-display text-4xl font-extrabold uppercase text-[#0A0A0C] sm:text-5xl">
          {copy.drawerTitle}
        </h1>
        <p className="mt-1 text-sm font-semibold text-[#4F4D48]">Nightlife Milan · {copy.navCartLabel}</p>
      </div>

      {items.length === 0 ? (
        <div className="mt-8 border border-[#0A0A0C]/18 bg-[#FFFFFF] p-10 text-center">
          <ShoppingBag className="mx-auto h-10 w-10 text-[#0A0A0C]" />
          <h2 className="mt-4 font-display text-3xl font-bold uppercase text-[#0A0A0C]">
            {copy.drawerEmptyTitle}
          </h2>
          <p className="mx-auto mt-2 max-w-[60ch] text-base text-[#4F4D48]">{copy.drawerEmptyBody}</p>
          <Link
            href={`${lp}/single-pass`}
            locale={locale}
            className="nlm-pressable mt-6 inline-flex min-h-[48px] items-center justify-center bg-[#D9381E] px-6 py-3 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#B82B14]"
          >
            {copy.drawerExploreCta}
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-7">
            {items.map((item) => {
              const sku = resolveCatalogSku(item.skuId);
              if (!sku) return null;
              const venue = VENUE_BY_ID[sku.venueId];
              const venueName = sku.venueNameOverride || venue?.name || 'Nightlife Milan';
              const skuFeeRate = getSkuFeeRate(sku, item.channel || 'venue');
              const feePct = Math.round(skuFeeRate * 100);
              const pricing = computeSinglePassPrice(
                sku.basePriceCents,
                item.quantity,
                skuFeeRate,
              );
              const itemGuests = Math.max(0, sku.guestsPerUnit ?? 1) * item.quantity;

              return (
                <article
                  key={item.skuId}
                  className="border border-[#0A0A0C]/16 bg-[#FFFFFF] p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold text-[#4F4D48] tabular-nums">
                        {venueName} · {sku.arrivalTime} ·{' '}
                        {itemGuests > 0
                          ? `${itemGuests} ${
                              itemGuests === 1 ? uxCopy.guestUnitSingular : uxCopy.guestsUnit
                            }`
                          : terrazzaUi.tableAddonBadge}
                      </p>
                      <h2 className="mt-1 font-display text-2xl font-bold text-[#0A0A0C]">
                        {isIt ? sku.titleIt : sku.titleEn}
                      </h2>
                      <p className="mt-1 text-sm leading-relaxed text-[#4F4D48]">
                        {isIt ? sku.descriptionIt : sku.descriptionEn}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.skuId)}
                      aria-label={copy.removeItemLabel}
                      className="flex h-11 w-11 items-center justify-center border border-[#0A0A0C]/20 text-[#4F4D48] hover:border-[#B91C1C] hover:text-[#B91C1C]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {sku.requiresDietary && (
                    <div className="mt-4">
                      <label className="block text-xs font-bold text-[#0A0A0C]">
                        {copy.formDietary}{' '}
                        <span className="ml-1 bg-[#EDEBE6] px-2 py-0.5 text-[11px] text-[#4F4D48]">
                          {uxCopy.optionalBadge}
                        </span>
                      </label>
                      <select
                        value={item.dietaryChoice || 'Terra / Meat Menu'}
                        onChange={(e) => updateDietary(item.skuId, e.target.value)}
                        className="mt-1.5 h-10 border border-[#0A0A0C]/25 bg-[#FFFFFF] px-3 text-sm text-[#0A0A0C]"
                      >
                        <option value="Terra / Meat Menu">Menù di Terra / Meat</option>
                        <option value="Mare / Seafood Menu">Menù di Mare / Seafood</option>
                        <option value="Vegetarian / Vegan">Vegetariano / Vegano</option>
                        <option value="Gluten-Free / Allergies">Senza Glutine / Allergie</option>
                      </select>
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#0A0A0C]/12 pt-3 tabular-nums">
                    <div className="inline-flex items-center border border-[#0A0A0C]/25 bg-[#EDEBE6]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.skuId, item.quantity - 1)}
                        className="flex h-11 w-11 items-center justify-center text-[#0A0A0C] hover:bg-[#0A0A0C]/10"
                        aria-label="Decrease"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-[2.5rem] text-center text-sm font-bold text-[#0A0A0C]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.skuId, item.quantity + 1)}
                        className="flex h-11 w-11 items-center justify-center text-[#0A0A0C] hover:bg-[#0A0A0C]/10"
                        aria-label="Increase"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      {feePct > 0 && (
                        <p className="text-xs text-[#4F4D48]">
                          {formatEurFromCents(pricing.lineBaseCents, locale)} +{' '}
                          {formatEurFromCents(pricing.lineFeeCents, locale)} ({feePct}%)
                        </p>
                      )}
                      <p className="font-display text-2xl font-extrabold text-[#0A0A0C]">
                        {formatEurFromCents(pricing.lineTotalCents, locale)}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-24 space-y-5 border border-[#0A0A0C]/16 bg-[#FFFFFF] p-6">
              <h2 className="font-display text-2xl font-bold uppercase text-[#0A0A0C]">
                {isIt ? 'Riepilogo Carrello' : 'Order Summary'}
              </h2>

              <div>
                <label htmlFor="cart-currency-select" className="block text-xs font-bold text-[#4F4D48]">
                  {copy.currencySelectorLabel}
                </label>
                <select
                  id="cart-currency-select"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as SupportedCurrency)}
                  className="mt-1.5 h-11 w-full border border-[#0A0A0C]/30 bg-[#FFFFFF] px-3 text-sm font-bold tabular-nums text-[#0A0A0C]"
                >
                  {supportedCurrencies.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <p className="mt-1.5 text-xs text-[#4F4D48]">{copy.fxRateNotice}</p>
              </div>

              <div className="space-y-2.5 border-t border-[#0A0A0C]/14 pt-4 text-sm tabular-nums">
                <div className="flex justify-between text-[#4F4D48]">
                  <span>{copy.guestsLabel}</span>
                  <span className="font-bold text-[#0A0A0C]">{totalGuests}</span>
                </div>
                <div className="flex justify-between text-[#4F4D48]">
                  <span>{copy.basePriceLabel}</span>
                  <span>{formatEurFromCents(subtotalBaseCents, locale)}</span>
                </div>
                {totalFeeCents > 0 && (
                  <div className="flex justify-between text-[#0A0A0C]">
                    <span>{feeLabel}</span>
                    <span>+{formatEurFromCents(totalFeeCents, locale)}</span>
                  </div>
                )}
                {!cartValidation.ok && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 border-2 border-[#B91C1C] bg-[#FEF2F2] p-3.5 text-xs font-semibold text-[#B91C1C]"
                  >
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>
                      {cartValidation.errorCode === 'TABLE_REQUIRES_FORMULA'
                        ? terrazzaUi.tableRequiresFormulaError || uxCopy.errTableRequiresFormula
                        : terrazzaUi.tableMaxGuestsExceededError || uxCopy.errTableMaxGuests}
                    </span>
                  </div>
                )}
                <div className="flex justify-between border-t border-[#0A0A0C]/16 pt-2 text-lg font-extrabold text-[#0A0A0C]">
                  <span>{copy.totalLabel} (EUR)</span>
                  <span className="font-display text-3xl text-[#0A0A0C]">
                    {formatEurFromCents(grandTotalCents, locale)}
                  </span>
                </div>
                {currency !== 'EUR' && (
                  <div className="flex justify-between bg-[#EDEBE6] p-3 text-sm font-bold text-[#0A0A0C]">
                    <span>
                      {copy.chargedInCurrencyLabel} ({currency})
                    </span>
                    <span className="text-[#B5240D]">
                      {formatMinorCurrency(convertedTotalMinor, currency, locale)}
                    </span>
                  </div>
                )}
                {currency !== 'EUR' && (
                  <p className="text-right text-[13px] text-[#4F4D48]">
                    1 EUR = {currentFxRate.toFixed(4)} {currency}
                  </p>
                )}
              </div>

              <Link
                href={`${lp}/checkout`}
                locale={locale}
                className="flex min-h-[52px] w-full items-center justify-center gap-2 bg-[#D9381E] px-5 py-3 text-sm font-extrabold uppercase tracking-wider text-[#FFFFFF] transition hover:bg-[#B82B14]"
              >
                <span>{copy.drawerCheckoutCta}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                href={`${lp}/account?tab=register`}
                locale={locale}
                className="flex min-h-[44px] w-full items-center justify-center border border-[#0A0A0C] bg-[#FFFFFF] px-4 py-2 text-xs font-bold text-[#0A0A0C] transition hover:bg-[#0A0A0C] hover:text-[#FFFFFF]"
              >
                {copy.tabRegister} / {copy.tabLogin}
              </Link>

              <div className="flex items-center justify-center gap-1.5 text-xs text-[#4F4D48]">
                <ShieldCheck className="h-4 w-4 text-[#0A0A0C]" aria-hidden="true" />
                <span>Nightlife Milan · Official E-Commerce</span>
              </div>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
