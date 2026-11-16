'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, ShieldCheck, Users } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { localePrefix } from '@/lib/i18n/locales';
import {
  VENUE_BY_ID,
  computeSinglePassPrice,
  formatEurFromCents,
  getSkusForVenue,
} from '@/lib/single-pass/catalog';
import { getSinglePassCopy } from '@/lib/single-pass/i18n35';
import type { SinglePassVenueId } from '@/lib/single-pass/types';
import { useSinglePassCart } from './SinglePassCartContext';

export default function SinglePassVenueModule({
  locale,
  venueId,
}: {
  locale: string;
  venueId: SinglePassVenueId;
}) {
  const router = useRouter();
  const { addItem, currency, formatConvertedEurCents } = useSinglePassCart();
  const venue = VENUE_BY_ID[venueId];
  const skus = getSkusForVenue(venueId);
  const copy = getSinglePassCopy(locale);
  const lp = localePrefix(locale);
  const isIt = locale === 'it';

  if (!venue || skus.length === 0) return null;

  return (
    <section
      id="official-tickets-ecommerce"
      data-single-pass-venue={venueId}
      className="mt-10 border border-[#050505]/20 bg-[#F6F1E7] p-6 text-[#050505] sm:p-8"
    >
      <div className="flex flex-col gap-3 border-b border-[#050505]/15 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#3D3830]">
            NIGHTLIFE MILAN E-COMMERCE · {isIt ? venue.ageBandLabelIt : venue.ageBandLabelEn}
          </p>
          <h2 className="mt-1 font-serif text-2xl font-bold text-[#050505]">
            {isIt
              ? `Acquista online i pacchetti confermati · ${venue.name}`
              : `Book Official Confirmed Packages Online · ${venue.name}`}
          </h2>
          <p className="mt-1.5 text-sm text-[#24201B]">
            {copy.trustOnlinePayment} · {copy.trustEqualPrice}
          </p>
        </div>
        <Link
          href={`${lp}/single-pass`}
          locale={locale}
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center border border-[#050505] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#050505] transition hover:bg-[#050505] hover:text-[#F6F1E7]"
        >
          {copy.embeddedBannerCta}
        </Link>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {skus.map((sku) => {
          const p = computeSinglePassPrice(sku.basePriceCents, 1);
          const guests = sku.guestsPerUnit || 1;
          return (
            <div
              key={sku.id}
              className="flex flex-col justify-between border border-[#050505]/15 bg-[#EFE9DC] p-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#3D3830]">
                    {copy.categoryLabels[sku.category]}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#050505]">
                    {guests > 1 ? `${guests} pax · ` : ''}
                    {sku.arrivalTime}
                  </span>
                </div>
                <h3 className="mt-1.5 font-serif text-lg font-bold text-[#050505]">
                  {isIt ? sku.titleIt : sku.titleEn}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#24201B]">
                  {isIt ? sku.descriptionIt : sku.descriptionEn}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#050505]/12 pt-3">
                <div className="font-mono text-xs">
                  <span className="text-[#3D3830]">
                    {formatEurFromCents(p.unitBaseCents, locale)} + {formatEurFromCents(p.unitFeeCents, locale)} (15%) ={' '}
                  </span>
                  <strong className="text-sm text-[#050505]">
                    {formatEurFromCents(p.unitTotalCents, locale)}
                  </strong>
                  {currency !== 'EUR' && (
                    <span className="ml-1.5 text-[11px] font-bold text-[#5C4415]">
                      (~{formatConvertedEurCents(p.unitTotalCents)})
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => addItem(sku.id, 1, sku.dietaryPreset, true)}
                    className="inline-flex min-h-[40px] items-center gap-1.5 border border-[#050505] bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#050505] hover:bg-[#F6F1E7]"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
                    {copy.addToCartCta}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      addItem(sku.id, 1, sku.dietaryPreset, false);
                      router.push(`${lp}/checkout`);
                    }}
                    className="inline-flex min-h-[40px] items-center bg-[#050505] px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#F6F1E7] hover:bg-[#24201B]"
                  >
                    {copy.buyNowCta}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap gap-4 border-t border-[#050505]/12 pt-4 text-xs text-[#24201B]">
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-4 w-4 text-[#050505]" aria-hidden="true" />
          {copy.trustWhatsAppDate}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-[#050505]" aria-hidden="true" />
          {copy.trustEqualPrice}
        </span>
      </div>
    </section>
  );
}
