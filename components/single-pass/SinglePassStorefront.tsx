'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Check,
  CreditCard,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  UserCheck,
  Users,
} from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { SITE_CONTACT } from '@/config/contact';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import { localePrefix } from '@/lib/i18n/locales';
import { capodannoEventPath } from '@/lib/capodanno/routes';
import {
  SINGLE_PASS_SKUS,
  STOREFRONT_VENUES,
  computeSinglePassPrice,
  formatEurFromCents,
} from '@/lib/single-pass/catalog';
import type { SupportedCurrency } from '@/lib/single-pass/currency';
import { getSinglePassCopy } from '@/lib/single-pass/i18n35';
import type { SinglePassPackageCategory, SinglePassVenueId } from '@/lib/single-pass/types';
import { useSinglePassCart } from './SinglePassCartContext';

const ALL_CATEGORIES: readonly SinglePassPackageCategory[] = [
  'all-night-combo',
  'vip-table-share',
  'vip-table-full',
  'gala-dinner',
  'royal-buffet',
  'club-entry',
];

export default function SinglePassStorefront({
  locale,
  embedded = false,
}: {
  locale: string;
  embedded?: boolean;
}) {
  const router = useRouter();
  const {
    addItem,
    itemCount,
    grandTotalCents,
    setCartOpen,
    mounted,
    currency,
    setCurrency,
    supportedCurrencies,
    formatConvertedEurCents,
  } = useSinglePassCart();
  const [selectedVenue, setSelectedVenue] = useState<'all' | SinglePassVenueId>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | SinglePassPackageCategory>('all');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const [menuChoices, setMenuChoices] = useState<Record<string, string>>({});

  const copy = getSinglePassCopy(locale);
  const lp = localePrefix(locale);
  const isIt = locale === 'it';

  const visibleVenues = useMemo(() => {
    return STOREFRONT_VENUES.filter((v) => {
      if (selectedVenue !== 'all' && v.id !== selectedVenue) return false;
      const skus = SINGLE_PASS_SKUS.filter(
        (s) => s.venueId === v.id && (selectedCategory === 'all' || s.category === selectedCategory),
      );
      return skus.length > 0;
    });
  }, [selectedVenue, selectedCategory]);

  const handleAdd = (skuId: string, dietaryDefault?: string) => {
    const choice = menuChoices[skuId] || dietaryDefault;
    addItem(skuId, 1, choice, true);
    setJustAddedId(skuId);
    window.setTimeout(() => {
      setJustAddedId((cur) => (cur === skuId ? null : cur));
    }, 1800);
  };

  const handleBuyNow = (skuId: string, dietaryDefault?: string) => {
    const choice = menuChoices[skuId] || dietaryDefault;
    addItem(skuId, 1, choice, false);
    router.push(`${lp}/checkout`);
  };

  const shopUrl = `https://nightlifemilan.com${lp}/single-pass`;
  const waHref = getConciergeBookingUrl(locale, copy.seoTitle, shopUrl);

  return (
    <div id="single-pass-storefront" className="w-full">
      {/* Dark Hero Header (when standalone page) */}
      {!embedded && (
        <section className="border-b border-[#F6F1E7]/14 bg-[#050505] px-4 py-12 text-[#F6F1E7] sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#EAE3D5]">
              {copy.heroEyebrow}
            </p>
            <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-[#F6F1E7] sm:text-5xl">
              {copy.heroH1}
            </h1>
            <p className="mt-4 max-w-4xl text-base leading-relaxed text-[#C2B9AA] sm:text-lg">
              {copy.heroSubtitle}
            </p>

            {/* 4 Trust Pillars */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="border border-[#F6F1E7]/18 bg-[#0B0A09] p-4">
                <CreditCard className="h-5 w-5 text-[#EAE3D5]" aria-hidden="true" />
                <p className="mt-2 text-xs font-semibold leading-relaxed text-[#F6F1E7]">
                  {copy.trustOnlinePayment}
                </p>
              </div>
              <div className="border border-[#F6F1E7]/18 bg-[#0B0A09] p-4">
                <ShieldCheck className="h-5 w-5 text-[#EAE3D5]" aria-hidden="true" />
                <p className="mt-2 text-xs font-semibold leading-relaxed text-[#F6F1E7]">
                  {copy.trustEqualPrice}
                </p>
              </div>
              <div className="border border-[#F6F1E7]/18 bg-[#0B0A09] p-4">
                <Users className="h-5 w-5 text-[#EAE3D5]" aria-hidden="true" />
                <p className="mt-2 text-xs font-semibold leading-relaxed text-[#F6F1E7]">
                  {copy.trustWhatsAppDate}
                </p>
              </div>
              <div className="border border-[#F6F1E7]/18 bg-[#0B0A09] p-4">
                <Sparkles className="h-5 w-5 text-[#EAE3D5]" aria-hidden="true" />
                <p className="mt-2 text-xs font-semibold leading-relaxed text-[#F6F1E7]">
                  {copy.trustConciergeHost}
                </p>
              </div>
            </div>

            {/* Action Bar: Cart, Reserved Area, Contacts */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#catalogo-single-pass"
                className="inline-flex min-h-[46px] items-center gap-2 bg-[#F6F1E7] px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-[#050505] transition hover:bg-[#EAE3D5]"
              >
                {copy.filterAllVenues} · {STOREFRONT_VENUES.length}
              </a>
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="inline-flex min-h-[46px] items-center gap-2 border border-[#F6F1E7]/45 bg-[#0B0A09] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#F6F1E7] transition hover:border-[#F6F1E7]"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                {copy.navCartLabel}
                {mounted && itemCount > 0 ? ` (${itemCount} · ${formatEurFromCents(grandTotalCents, locale)})` : ''}
              </button>
              <Link
                href={`${lp}/account`}
                locale={locale}
                className="inline-flex min-h-[46px] items-center gap-2 border border-[#F6F1E7]/30 bg-[#0B0A09] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#EAE3D5] transition hover:border-[#F6F1E7] hover:text-[#F6F1E7]"
              >
                <UserCheck className="h-4 w-4" aria-hidden="true" />
                {copy.navAccountLabel}
              </Link>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center gap-2 bg-[#25D366] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#050505] transition hover:bg-[#2EE472]"
              >
                WhatsApp {SITE_CONTACT.whatsapp.number}
              </a>
              <a
                href="tel:+393519127047"
                className="inline-flex min-h-[46px] items-center border border-[#F6F1E7]/20 px-4 py-3 text-xs font-semibold text-[#C2B9AA] hover:border-[#F6F1E7] hover:text-[#F6F1E7]"
              >
                +39 351 912 7047
              </a>
              <a
                href="mailto:concierge@nightlifemilan.com"
                className="inline-flex min-h-[46px] items-center border border-[#F6F1E7]/20 px-4 py-3 text-xs font-semibold text-[#C2B9AA] hover:border-[#F6F1E7] hover:text-[#F6F1E7]"
              >
                concierge@nightlifemilan.com
              </a>
            </div>

            {/* Clickable TOC Navigation (SEO 21 points) */}
            <nav
              aria-label="Single Pass index"
              className="mt-7 border border-[#050505]/15 bg-[#F6F1E7] p-5 text-[#050505]"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-[#3D3830]">
                {copy.filterHeading}
              </p>
              <ul className="mt-3 grid gap-2 text-xs font-semibold sm:grid-cols-2 lg:grid-cols-5">
                <li>
                  <a href="#catalogo-single-pass" className="text-[#050505] underline-offset-4 hover:underline">
                    1. {copy.filterAllVenues}
                  </a>
                </li>
                <li>
                  <a href="#come-funziona-single-pass" className="text-[#050505] underline-offset-4 hover:underline">
                    2. {copy.howItWorksEyebrow}
                  </a>
                </li>
                <li>
                  <a href="#mini-gruppo-whatsapp-20-dicembre" className="text-[#050505] underline-offset-4 hover:underline">
                    3. WhatsApp 20/12/2026
                  </a>
                </li>
                <li>
                  <a href="#mappa-milano-single-pass" className="text-[#050505] underline-offset-4 hover:underline">
                    4. Milano Club Map
                  </a>
                </li>
                <li>
                  <a href="#faq-single-pass" className="text-[#050505] underline-offset-4 hover:underline">
                    5. Domande &amp; Regole Ufficiali
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </section>
      )}

      {/* Light Interactive Catalog Surface (#F6F1E7) for High Clarity (chiarezza-visiva-gerarchia-ecommerce) */}
      <section
        id="catalogo-single-pass"
        data-surface="ivory"
        className="border-b border-[#050505]/15 bg-[#F6F1E7] px-4 py-12 text-[#050505] sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 border-b border-[#050505]/15 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#3D3830]">
                NIGHTLIFE MILAN · CAPODANNO 2027 SINGLE PASS SHOP
              </p>
              <h2 className="mt-1 font-serif text-3xl font-bold text-[#050505] sm:text-4xl">
                {copy.filterHeading}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="inline-flex min-h-[44px] items-center gap-2 border border-[#050505]/25 bg-[#EFE9DC] px-3 text-xs font-bold text-[#050505]">
                <span>EUR ⇄</span>
                <select
                  aria-label={copy.currencySelectorLabel}
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as SupportedCurrency)}
                  className="bg-transparent font-mono text-xs font-bold text-[#050505] focus:outline-none"
                >
                  {supportedCurrencies.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="inline-flex min-h-[44px] items-center gap-2 bg-[#050505] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#F6F1E7] transition hover:bg-[#24201B]"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                {copy.drawerTitle}
                {mounted && itemCount > 0 ? ` (${itemCount})` : ''}
              </button>
              <Link
                href={`${lp}/checkout`}
                locale={locale}
                className="inline-flex min-h-[44px] items-center border border-[#050505] bg-transparent px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#050505] transition hover:bg-[#050505] hover:text-[#F6F1E7]"
              >
                {copy.drawerCheckoutCta}
              </Link>
            </div>
          </div>

          {/* Age & Venue Filter Pills */}
          <div className="mt-6 space-y-3">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedVenue('all')}
                className={`min-h-[40px] border px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition ${
                  selectedVenue === 'all'
                    ? 'border-[#050505] bg-[#050505] text-[#F6F1E7]'
                    : 'border-[#050505]/25 bg-[#EFE9DC] text-[#050505] hover:border-[#050505]'
                }`}
              >
                {copy.filterAllVenues}
              </button>
              {STOREFRONT_VENUES.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVenue(v.id)}
                  className={`min-h-[40px] border px-3.5 py-2 text-xs font-bold transition ${
                    selectedVenue === v.id
                      ? 'border-[#050505] bg-[#050505] text-[#F6F1E7]'
                      : 'border-[#050505]/25 bg-[#EFE9DC] text-[#050505] hover:border-[#050505]'
                  }`}
                >
                  {copy.venueShortLabels[v.id]}
                </button>
              ))}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`min-h-[36px] border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition ${
                  selectedCategory === 'all'
                    ? 'border-[#050505] bg-[#3D3830] text-[#F6F1E7]'
                    : 'border-[#050505]/20 bg-white/60 text-[#24201B] hover:border-[#050505]'
                }`}
              >
                {copy.filterAllCategories}
              </button>
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`min-h-[36px] border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition ${
                    selectedCategory === cat
                      ? 'border-[#050505] bg-[#3D3830] text-[#F6F1E7]'
                      : 'border-[#050505]/20 bg-white/60 text-[#24201B] hover:border-[#050505]'
                  }`}
                >
                  {copy.categoryLabels[cat]}
                </button>
              ))}
            </div>
          </div>

          {/* 6 Venues & Package Cards */}
          <div className="mt-10 space-y-12">
            {visibleVenues.map((venue) => {
              const skus = SINGLE_PASS_SKUS.filter(
                (s) =>
                  s.venueId === venue.id &&
                  (selectedCategory === 'all' || s.category === selectedCategory),
              );
              return (
                <div
                  key={venue.id}
                  id={`single-pass-${venue.id}`}
                  className="border border-[#050505]/20 bg-[#EFE9DC] p-5 sm:p-8"
                >
                  <div className="grid gap-6 border-b border-[#050505]/15 pb-6 lg:grid-cols-[240px_1fr]">
                    <div className="overflow-hidden border border-[#050505]/20 bg-[#050505]">
                      <img
                        src={venue.posterSrc}
                        alt={`${venue.name} · ${isIt ? venue.ageBandLabelIt : venue.ageBandLabelEn}`}
                        title={`${venue.name} Single Pass Capodanno 2027`}
                        loading="eager"
                        decoding="async"
                        className="h-52 w-full object-contain bg-[#050505]"
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="bg-[#050505] px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#F6F1E7]">
                            {isIt ? venue.ageBandLabelIt : venue.ageBandLabelEn}
                          </span>
                          <span className="border border-[#050505]/30 bg-[#F6F1E7] px-3 py-1 text-xs font-bold text-[#050505]">
                            {venue.district} · {venue.hours}
                          </span>
                          <span className="border border-[#050505]/20 bg-white/70 px-3 py-1 text-xs font-semibold text-[#24201B]">
                            {skus.length} Single Pass
                          </span>
                        </div>
                        <h3 className="mt-3 font-serif text-2xl font-bold text-[#050505] sm:text-3xl">
                          {venue.name}
                        </h3>
                        <p className="mt-1.5 text-sm font-semibold text-[#24201B]">
                          {isIt ? venue.taglineIt : venue.taglineEn}
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-[#3D3830]">
                          <strong>{venue.address}</strong> · {isIt ? venue.musicIt : venue.musicEn} · Dress code: {isIt ? venue.dressCodeIt : venue.dressCodeEn}
                        </p>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <Link
                          href={capodannoEventPath(venue.eventSlug, locale)}
                          className="text-xs font-bold uppercase tracking-wider text-[#050505] underline underline-offset-4 hover:text-[#3D3830]"
                        >
                          {copy.viewVenueDetails} →
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* SKU Grid for Venue */}
                  <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {skus.map((sku) => {
                      const price = computeSinglePassPrice(sku.basePriceCents, 1);
                      const added = justAddedId === sku.id;
                      const skuTitle = isIt ? sku.titleIt : sku.titleEn;
                      const skuDesc = isIt ? sku.descriptionIt : sku.descriptionEn;
                      const selectedMenu = menuChoices[sku.id] || sku.dietaryPreset || '';

                      return (
                        <article
                          key={sku.id}
                          data-single-pass-sku={sku.id}
                          className="flex flex-col justify-between border border-[#050505]/20 bg-[#F6F1E7] p-5"
                        >
                          <div>
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="border border-[#050505]/25 bg-[#EFE9DC] px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#050505]">
                                {copy.categoryLabels[sku.category]}
                              </span>
                              <span className="font-mono text-[11px] font-semibold text-[#3D3830]">
                                {sku.arrivalTime}
                              </span>
                            </div>

                            <h4 className="mt-3 font-serif text-lg font-bold leading-snug text-[#050505]">
                              {skuTitle}
                            </h4>
                            <p className="mt-2 text-xs leading-relaxed text-[#24201B]">
                              {skuDesc}
                            </p>

                            {sku.requiresDietary && !sku.dietaryPreset && (
                              <div className="mt-3">
                                <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#3D3830]">
                                  {copy.formDietary}
                                  <select
                                    value={selectedMenu}
                                    onChange={(e) =>
                                      setMenuChoices((prev) => ({
                                        ...prev,
                                        [sku.id]: e.target.value,
                                      }))
                                    }
                                    className="mt-1 h-9 w-full border border-[#050505]/30 bg-white px-2.5 text-xs text-[#050505]"
                                  >
                                    <option value="">{isIt ? 'Standard Gala Menu' : 'Standard Gala Menu'}</option>
                                    <option value="Terra">{isIt ? 'Preferenza Terra' : 'Meat / Land'}</option>
                                    <option value="Mare">{isIt ? 'Preferenza Mare' : 'Seafood'}</option>
                                    <option value="Vegetariano">{isIt ? 'Vegetariano / Allergie' : 'Vegetarian / Allergies'}</option>
                                  </select>
                                </label>
                              </div>
                            )}
                          </div>

                          <div className="mt-5 border-t border-[#050505]/15 pt-4">
                            <div className="space-y-1 font-mono text-xs">
                              <div className="flex justify-between text-[#3D3830]">
                                <span>{copy.basePriceLabel}</span>
                                <span>{formatEurFromCents(price.unitBaseCents, locale)}</span>
                              </div>
                              <div className="flex justify-between text-[#3D3830]">
                                <span>+15% Fee</span>
                                <span>+{formatEurFromCents(price.unitFeeCents, locale)}</span>
                              </div>
                              <div className="flex items-baseline justify-between pt-1 text-base font-extrabold text-[#050505]">
                                <span>{copy.totalLabel}</span>
                                <span>
                                  {formatEurFromCents(price.unitTotalCents, locale)}
                                  {mounted && currency !== 'EUR' && (
                                    <span className="ml-1.5 text-xs font-semibold text-[#5C4415]">
                                      (~{formatConvertedEurCents(price.unitTotalCents)})
                                    </span>
                                  )}
                                </span>
                              </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                onClick={() => handleAdd(sku.id, sku.dietaryPreset)}
                                className="flex min-h-[44px] items-center justify-center gap-1.5 border border-[#050505] bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#050505] transition hover:bg-[#EFE9DC]"
                              >
                                {added ? (
                                  <>
                                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                                    {copy.addedFeedback}
                                  </>
                                ) : (
                                  copy.addToCartCta
                                )}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleBuyNow(sku.id, sku.dietaryPreset)}
                                className="flex min-h-[44px] items-center justify-center bg-[#050505] px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#F6F1E7] transition hover:bg-[#24201B]"
                              >
                                {copy.buyNowCta}
                              </button>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dark Process Timeline + Dec 20 WhatsApp Mini-Group Section (#050505) */}
      <section
        id="come-funziona-single-pass"
        className="border-b border-[#F6F1E7]/14 bg-[#050505] px-4 py-12 text-[#F6F1E7] sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#EAE3D5]">
            {copy.howItWorksEyebrow}
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-[#F6F1E7]">
            {copy.howItWorksHeading}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.howItWorksSteps.map((step) => (
              <div key={step.title} className="border border-[#F6F1E7]/16 bg-[#0B0A09] p-5">
                <h3 className="font-serif text-lg font-bold text-[#F6F1E7]">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#C2B9AA]">{step.body}</p>
              </div>
            ))}
          </div>

          <div
            id="mini-gruppo-whatsapp-20-dicembre"
            className="mt-8 border border-[#25D366]/45 bg-[#0B0A09] p-6 sm:p-8"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#25D366]">
                  20 DICEMBRE 2026 ONWARDS · OFFICIAL SINGLE PASS GROUPING
                </p>
                <h3 className="mt-1 font-serif text-2xl font-bold text-[#F6F1E7]">
                  {copy.miniGroupHeading}
                </h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#C2B9AA]">
                  {copy.miniGroupScheduledBody}
                </p>
              </div>
              <Link
                href={`${lp}/account`}
                locale={locale}
                className="inline-flex min-h-[46px] shrink-0 items-center justify-center bg-[#F6F1E7] px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-[#050505] transition hover:bg-[#EAE3D5]"
              >
                {copy.navAccountLabel} →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
