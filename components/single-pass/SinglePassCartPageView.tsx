'use client';

import React from 'react';
import { ArrowRight, Minus, Plus, ShieldCheck, ShoppingBag, Trash2 } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { localePrefix } from '@/lib/i18n/locales';
import {
  VENUE_BY_ID,
  computeSinglePassPrice,
  formatEurFromCents,
  resolveCatalogSku,
} from '@/lib/single-pass/catalog';
import { formatMinorCurrency, type SupportedCurrency } from '@/lib/single-pass/currency';
import { getSinglePassCopy } from '@/lib/single-pass/i18n35';
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
    totalGuests,
    currency,
    setCurrency,
    convertedTotalMinor,
    currentFxRate,
    supportedCurrencies,
    mounted,
  } = useSinglePassCart();

  const copy = getSinglePassCopy(locale);
  const lp = localePrefix(locale);
  const isIt = locale === 'it';

  if (!mounted) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-16 text-center text-sm text-[#C2B9AA]">
        Loading...
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="border-b border-[#F6F1E7]/15 pb-6">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
          NIGHTLIFE MILAN · {copy.navCartLabel.toUpperCase()}
        </p>
        <h1 className="mt-2 font-serif text-3xl font-bold text-[#F6F1E7] sm:text-4xl">
          {copy.drawerTitle}
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="mt-8 border border-[#F6F1E7]/18 bg-[#0B0A09] p-10 text-center">
          <ShoppingBag className="mx-auto h-10 w-10 text-[#EAE3D5]" />
          <h2 className="mt-4 font-serif text-2xl font-bold text-[#F6F1E7]">{copy.drawerEmptyTitle}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#C2B9AA]">{copy.drawerEmptyBody}</p>
          <Link
            href={`${lp}/single-pass`}
            locale={locale}
            className="mt-6 inline-flex min-h-[48px] items-center justify-center bg-[#F6F1E7] px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-[#050505]"
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
              const pricing = computeSinglePassPrice(sku.basePriceCents, item.quantity);
              const itemGuests = (sku.guestsPerUnit || 1) * item.quantity;

              return (
                <article
                  key={item.skuId}
                  className="border border-[#F6F1E7]/18 bg-[#0B0A09] p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#C9A84C]">
                        {venueName} · {sku.arrivalTime} · {itemGuests} pax
                      </p>
                      <h2 className="mt-1 font-serif text-xl font-bold text-[#F6F1E7]">
                        {isIt ? sku.titleIt : sku.titleEn}
                      </h2>
                      <p className="mt-1 text-xs leading-relaxed text-[#C2B9AA]">
                        {isIt ? sku.descriptionIt : sku.descriptionEn}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.skuId)}
                      aria-label={copy.removeItemLabel}
                      className="flex h-9 w-9 items-center justify-center border border-[#F6F1E7]/20 text-[#C2B9AA] hover:border-rose-400 hover:text-rose-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {sku.requiresDietary && (
                    <div className="mt-3">
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-[#C2B9AA]">
                        {copy.formDietary}
                      </label>
                      <select
                        value={item.dietaryChoice || 'Terra / Standard'}
                        onChange={(e) => updateDietary(item.skuId, e.target.value)}
                        className="mt-1 h-9 border border-[#F6F1E7]/20 bg-[#050505] px-3 text-xs text-[#F6F1E7]"
                      >
                        <option value="Terra / Meat Menu">Menù di Terra / Meat</option>
                        <option value="Mare / Seafood Menu">Menù di Mare / Seafood</option>
                        <option value="Vegetarian / Vegan">Vegetariano / Vegano</option>
                        <option value="Gluten-Free / Allergies">Senza Glutine / Allergie</option>
                      </select>
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#F6F1E7]/12 pt-3">
                    <div className="inline-flex items-center border border-[#F6F1E7]/25 bg-[#050505]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.skuId, item.quantity - 1)}
                        className="flex h-9 w-9 items-center justify-center hover:bg-white/10"
                        aria-label="Decrease"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-[2.5rem] text-center font-mono text-xs font-bold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.skuId, item.quantity + 1)}
                        className="flex h-9 w-9 items-center justify-center hover:bg-white/10"
                        aria-label="Increase"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="text-right font-mono text-xs">
                      <p className="text-[#8E8577]">
                        {formatEurFromCents(pricing.lineBaseCents, locale)} + {formatEurFromCents(pricing.lineFeeCents, locale)} (15%)
                      </p>
                      <p className="text-base font-bold text-[#F6F1E7]">
                        {formatEurFromCents(pricing.lineTotalCents, locale)}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-24 space-y-5 border border-[#F6F1E7]/20 bg-[#0B0A09] p-6">
              <h2 className="font-serif text-2xl font-bold text-[#F6F1E7]">
                {isIt ? 'Riepilogo Carrello' : 'Order Summary'}
              </h2>

              <div>
                <label
                  htmlFor="cart-currency-select"
                  className="block font-mono text-[11px] uppercase tracking-wider text-[#C2B9AA]"
                >
                  {copy.currencySelectorLabel}
                </label>
                <select
                  id="cart-currency-select"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as SupportedCurrency)}
                  className="mt-1.5 h-11 w-full border border-[#F6F1E7]/25 bg-[#050505] px-3 font-mono text-sm font-bold text-[#F6F1E7]"
                >
                  {supportedCurrencies.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <p className="mt-1.5 text-[11px] text-[#8E8577]">{copy.fxRateNotice}</p>
              </div>

              <div className="space-y-2 border-t border-[#F6F1E7]/15 pt-4 text-sm">
                <div className="flex justify-between text-[#C2B9AA]">
                  <span>{copy.guestsLabel}</span>
                  <span className="font-mono font-bold text-[#F6F1E7]">{totalGuests}</span>
                </div>
                <div className="flex justify-between text-[#C2B9AA]">
                  <span>{copy.basePriceLabel}</span>
                  <span className="font-mono">{formatEurFromCents(subtotalBaseCents, locale)}</span>
                </div>
                <div className="flex justify-between text-[#EAE3D5]">
                  <span>{copy.feeLabel}</span>
                  <span className="font-mono">+{formatEurFromCents(totalFeeCents, locale)}</span>
                </div>
                <div className="flex justify-between border-t border-[#F6F1E7]/15 pt-2 text-lg font-extrabold text-[#F6F1E7]">
                  <span>{copy.totalLabel} (EUR)</span>
                  <span className="font-mono">{formatEurFromCents(grandTotalCents, locale)}</span>
                </div>
                {currency !== 'EUR' && (
                  <div className="flex justify-between bg-[#141210] p-2.5 text-sm font-bold text-[#C9A84C]">
                    <span>
                      {copy.chargedInCurrencyLabel} ({currency})
                    </span>
                    <span className="font-mono">
                      {formatMinorCurrency(convertedTotalMinor, currency, locale)}
                    </span>
                  </div>
                )}
                {currency !== 'EUR' && (
                  <p className="text-right font-mono text-[11px] text-[#8E8577]">
                    1 EUR = {currentFxRate.toFixed(4)} {currency}
                  </p>
                )}
              </div>

              <Link
                href={`${lp}/checkout`}
                locale={locale}
                className="flex min-h-[50px] w-full items-center justify-center gap-2 bg-[#F6F1E7] px-5 py-3 text-xs font-extrabold uppercase tracking-widest text-[#050505] transition hover:bg-[#EAE3D5]"
              >
                <span>{copy.drawerCheckoutCta}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                href={`${lp}/account?tab=register`}
                locale={locale}
                className="flex min-h-[42px] w-full items-center justify-center border border-[#F6F1E7]/25 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#EAE3D5] transition hover:border-[#F6F1E7]"
              >
                {copy.tabRegister} / {copy.tabLogin}
              </Link>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8E8577]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#C9A84C]" aria-hidden="true" />
                <span>Nightlife Milan · Magister Mida LLC</span>
              </div>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
