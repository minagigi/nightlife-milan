'use client';

import React, { useEffect, useRef } from 'react';
import { AlertTriangle, ArrowRight, Minus, Plus, ShieldCheck, ShoppingBag, Trash2 } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { trackEcommerceEvent, type Ga4EcommerceItem } from '@/lib/analytics';
import { localePrefix } from '@/lib/i18n/locales';
import {
  DINNER_DIETARY_OPTIONS,
  VENUE_BY_ID,
  computeSinglePassPrice,
  formatEurFromCents,
  getSkuFeeRate,
  resolveCatalogSku,
} from '@/lib/single-pass/catalog';
import { formatMinorCurrency, type SupportedCurrency } from '@/lib/single-pass/currency';
import {
  formatCartValidationError35,
  formatFeeLabelNoPct35,
  formatZeroGuestAddonBadge35,
  getCheckoutUxCopy,
  getSinglePassCopy,
  localizeSinglePassSku,
} from '@/lib/single-pass/i18n35';
import { cartRowKey, useSinglePassCart } from './SinglePassCartContext';

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
  const feeLabel = formatFeeLabelNoPct35(locale);
  const lp = localePrefix(locale);
  const isIt = locale === 'it';
  const viewedRef = useRef(false);

  useEffect(() => {
    if (!mounted || items.length === 0 || viewedRef.current) return;
    viewedRef.current = true;
    const gaItems: Ga4EcommerceItem[] = [];
    for (const it of items) {
      const s = resolveCatalogSku(it.skuId);
      if (!s) continue;
      const ch = it.channel || 'venue';
      const br = computeSinglePassPrice(s.basePriceCents, it.quantity, getSkuFeeRate(s, ch));
      gaItems.push({
        item_id: s.id,
        item_name: s.titleIt || s.titleEn,
        item_category: VENUE_BY_ID[s.venueId]?.name || s.venueId,
        price: Number((br.unitTotalCents / 100).toFixed(2)),
        quantity: it.quantity,
      });
    }
    trackEcommerceEvent('view_cart', {
      value: Number((grandTotalCents / 100).toFixed(2)),
      items: gaItems,
    });
  }, [mounted, items, grandTotalCents]);

  if (!mounted) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-20 text-center text-base text-[#C2B9AA]">
        Loading...
      </section>
    );
  }

  return (
    <div data-ui="cart-flow" data-no-lightbox="true" className="w-full">
      {/* CAPITOLO 1 (#050505 NOTTE): INTESTAZIONE & ARTICOLI SCELTI */}
      <section className="w-full bg-[#050505] pt-4 pb-10 text-[#F6F1E7] sm:pt-5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#F6F1E7]/16 pb-6">
            <div>
              <p className="font-mono text-xs font-semibold text-[#25D366]">
                NIGHTLIFE MILAN · {copy.navCartLabel.toUpperCase()}
              </p>
              <h1 className="mt-1 font-display text-3xl font-bold text-[#F6F1E7] sm:text-5xl">
                {copy.drawerTitle}
              </h1>
            </div>

            {items.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label={copy.currencySelectorLabel}>
                {(['EUR', 'USD', 'GBP', 'CHF'] as const)
                  .filter((c) => supportedCurrencies.includes(c))
                  .map((c) => {
                    const active = currency === c;
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCurrency(c)}
                        className={`min-h-[40px] min-w-[48px] border px-2.5 py-1.5 font-mono text-xs font-bold transition ${
                          active
                            ? 'border-[#F6F1E7] bg-[#F6F1E7] text-[#050505]'
                            : 'border-[#F6F1E7]/28 bg-[#141311] text-[#F6F1E7] hover:border-[#F6F1E7]'
                        }`}
                      >
                        {c}
                      </button>
                    );
                  })}
              </div>
            )}
          </div>

          {items.length === 0 ? (
            <div className="mt-8 border border-[#050505] bg-[#F6F1E7] p-8 text-center text-[#050505] sm:p-12">
              <ShoppingBag className="mx-auto h-10 w-10 text-[#050505]" />
              <h2 className="mt-4 font-display text-3xl font-bold text-[#050505]">
                {copy.drawerEmptyTitle}
              </h2>
              <p className="mx-auto mt-2 max-w-[54ch] text-base text-[#57534E]">{copy.drawerEmptyBody}</p>
              <div className="mx-auto mt-6 max-w-sm bg-[#050505] p-3">
                <Link
                  href={`${lp}/single-pass`}
                  locale={locale}
                  className="nlm-pressable inline-flex min-h-[50px] w-full items-center justify-center bg-[#25D366] px-6 py-3 text-base font-extrabold text-[#050505] transition hover:bg-[#2EE472]"
                >
                  {copy.drawerExploreCta}
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {items.map((item) => {
                const sku = resolveCatalogSku(item.skuId);
                if (!sku) return null;
                const venue = VENUE_BY_ID[sku.venueId];
                const venueName = sku.venueNameOverride || venue?.name || 'Nightlife Milan';
                const posterSrc =
                  venue?.posterSrc ||
                  '/images/events/capodanno-2027-posters/capodanno-justme-milano-torre-branca.webp';
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
                    key={cartRowKey(item)}
                    className="border border-[#F6F1E7]/18 bg-[#141311] p-4 sm:p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <img
                          src={posterSrc}
                          alt={venueName}
                          data-no-lightbox="true"
                          className="aspect-[4/5] w-16 shrink-0 border border-[#F6F1E7]/20 bg-[#050505] object-cover sm:w-20"
                        />
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-mono text-xs font-bold text-[#C2B9AA] tabular-nums">
                              {venueName} · {sku.arrivalTime} ·{' '}
                              {itemGuests > 0
                                ? `${itemGuests} ${
                                    itemGuests === 1 ? uxCopy.guestUnitSingular : uxCopy.guestsUnit
                                  }`
                                : formatZeroGuestAddonBadge35(locale, sku.venueId)}
                            </p>
                            {item.channel === 'single-pass' && (
                              <span className="bg-[#EAE3D5] px-2 py-0.5 text-[11px] font-bold text-[#050505]">
                                Single Pass
                              </span>
                            )}
                          </div>
                          <h2 className="mt-1 font-display text-xl font-bold text-[#F6F1E7] sm:text-2xl">
                            {sku.venueId === 'aprica-world-winter-week'
                              ? localizeSinglePassSku(sku, locale, copy, venueName).title
                              : isIt
                                ? sku.titleIt
                                : sku.titleEn}
                          </h2>
                          <p className="mt-1 text-sm leading-relaxed text-[#C2B9AA]">
                            {sku.venueId === 'aprica-world-winter-week'
                              ? localizeSinglePassSku(sku, locale, copy, venueName).description
                              : isIt
                                ? sku.descriptionIt
                                : sku.descriptionEn}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.skuId, item.channel)}
                        aria-label={copy.removeItemLabel}
                        className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#F6F1E7]/22 bg-[#050505] text-[#C2B9AA] hover:border-[#F6F1E7] hover:text-[#F6F1E7]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {item.dietaryChoice && (!sku.requiresDietary || Boolean(sku.dietaryPreset)) && (
                      <p className="mt-3 text-xs font-semibold text-[#EAE3D5]">{item.dietaryChoice}</p>
                    )}

                    {sku.requiresDietary && !sku.dietaryPreset && (
                      <div className="mt-4 border border-[#050505] bg-[#F6F1E7] p-3 text-[#050505]">
                        <label className="flex items-center justify-between gap-2 text-xs font-bold text-[#050505]">
                          <span>{copy.formDietary}</span>
                          <span className="bg-[#EAE3D5] px-2 py-0.5 text-[11px] text-[#050505]">
                            {uxCopy.optionalBadge}
                          </span>
                        </label>
                        <select
                          value={
                            DINNER_DIETARY_OPTIONS.some((o) => o.value === item.dietaryChoice)
                              ? item.dietaryChoice
                              : DINNER_DIETARY_OPTIONS[0].value
                          }
                          onChange={(e) => updateDietary(item.skuId, e.target.value, item.channel)}
                          className="mt-1.5 h-12 w-full border border-[#050505] bg-[#FFFFFF] px-3 text-base text-[#050505]"
                        >
                          {DINNER_DIETARY_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {isIt ? opt.labelIt : opt.labelEn}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#F6F1E7]/14 pt-3 tabular-nums">
                      <div className="inline-flex items-center border border-[#F6F1E7]/30 bg-[#050505]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.skuId, item.quantity - 1, item.channel)}
                          className="flex h-11 w-11 items-center justify-center text-[#F6F1E7] hover:bg-[#1E1C19]"
                          aria-label="Decrease"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-[2.5rem] text-center font-mono text-sm font-bold text-[#F6F1E7]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.skuId, item.quantity + 1, item.channel)}
                          className="flex h-11 w-11 items-center justify-center text-[#F6F1E7] hover:bg-[#1E1C19]"
                          aria-label="Increase"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-display text-2xl font-extrabold text-[#F6F1E7]">
                          {formatEurFromCents(pricing.lineBaseCents, locale)}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {items.length > 0 && (
        <>
          {/* CAPITOLO 2 (#EAE3D5 CHAMPAGNE): SCOMPOSIZIONE TRASPARENTE DEL CONTO */}
          <section className="w-full border-y border-[#050505] bg-[#EAE3D5] py-8 text-[#050505]">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
                <div className="space-y-3 lg:col-span-7">
                  <h2 className="font-display text-2xl font-bold text-[#050505]">
                    {isIt ? 'Riepilogo Trasparente' : 'Transparent Order Summary'}
                  </h2>
                  <div className="space-y-2.5 border-t border-[#050505]/20 pt-3 text-sm tabular-nums">
                    <div className="flex justify-between text-[#050505]">
                      <span>{copy.guestsLabel}</span>
                      <span className="font-mono font-bold">{totalGuests}</span>
                    </div>
                    <div className="flex justify-between text-[#050505]">
                      <span>{copy.basePriceLabel}</span>
                      <span className="font-mono font-semibold">
                        {formatEurFromCents(subtotalBaseCents, locale)}
                      </span>
                    </div>
                    {totalFeeCents > 0 && (
                      <div className="flex justify-between gap-4 text-[#050505]">
                        <span className="font-semibold">{feeLabel}</span>
                        <span className="shrink-0 font-mono font-bold">
                          +{formatEurFromCents(totalFeeCents, locale)}
                        </span>
                      </div>
                    )}
                    {!cartValidation.ok && (
                      <div
                        role="alert"
                        className="flex items-start gap-2 border-2 border-[#B91C1C] bg-[#FEF2F2] p-3.5 text-xs font-semibold text-[#B91C1C]"
                      >
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>{formatCartValidationError35(locale, cartValidation.errorCode)}</span>
                      </div>
                    )}
                    <div className="flex items-baseline justify-between border-t-2 border-[#050505] pt-3 text-lg font-extrabold text-[#050505]">
                      <span className="font-display text-2xl">{copy.totalLabel} (EUR)</span>
                      <span className="font-display text-3xl text-[#050505]">
                        {formatEurFromCents(grandTotalCents, locale)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 border border-[#050505] bg-[#F6F1E7] p-4 lg:col-span-5">
                  <label htmlFor="cart-currency-select" className="block text-xs font-bold text-[#050505]">
                    {copy.currencySelectorLabel}
                  </label>
                  <select
                    id="cart-currency-select"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as SupportedCurrency)}
                    className="h-12 w-full border border-[#050505] bg-[#FFFFFF] px-3 font-mono text-base font-bold tabular-nums text-[#050505]"
                  >
                    {supportedCurrencies.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-[#57534E]">{copy.fxRateNotice}</p>
                  {currency !== 'EUR' && (
                    <div className="mt-2 flex justify-between border border-[#050505] bg-[#FFFFFF] p-2.5 text-sm font-bold text-[#050505]">
                      <span>
                        {copy.chargedInCurrencyLabel} ({currency})
                      </span>
                      <span className="font-mono">
                        {formatMinorCurrency(convertedTotalMinor, currency, locale)} (1 EUR = {currentFxRate.toFixed(4)})
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* CAPITOLO 3 (#050505 PLINTO FINALE): AZIONE VERSO LA COMPILAZIONE SU CARTA CALDA */}
          <section className="w-full bg-[#050505] py-8 text-[#F6F1E7]">
            <div className="mx-auto max-w-5xl space-y-3 px-4 sm:px-6 lg:px-8">
              <Link
                href={`${lp}/checkout`}
                locale={locale}
                className="flex min-h-[54px] w-full items-center justify-center gap-2 bg-[#25D366] px-6 py-4 text-base font-extrabold text-[#050505] transition hover:bg-[#2EE472]"
              >
                <span>{copy.drawerCheckoutCta}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </Link>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs text-[#C2B9AA]">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
                  <span>Nightlife Milan · Official E-Commerce</span>
                </span>
                <Link
                  href={`${lp}/account?tab=register`}
                  locale={locale}
                  className="inline-flex min-h-[44px] items-center border border-[#F6F1E7]/25 bg-[#141311] px-4 py-2 font-bold text-[#F6F1E7] transition hover:border-[#F6F1E7]"
                >
                  {copy.tabRegister} / {copy.tabLogin}
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
