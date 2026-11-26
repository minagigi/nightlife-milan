'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, ShieldCheck, Users } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { localePrefix } from '@/lib/i18n/locales';
import {
  VENUE_BY_ID,
  formatEurFromCents,
  getSkuFeeRate,
  getSkusForVenue,
} from '@/lib/single-pass/catalog';
import {
  formatCheckoutFeeNote35,
  getSinglePassCopy,
  localizeSinglePassSku,
  localizeVenueAgeBand,
} from '@/lib/single-pass/i18n35';
import { getCapodannoUiCopy } from '@/lib/capodanno/i18n';
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
  const ui = getCapodannoUiCopy(locale);
  const lp = localePrefix(locale);

  if (!venue || skus.length === 0) return null;
  const venueFeeRate = getSkuFeeRate(skus[0], 'venue');

  return (
    <section
      id="official-tickets-ecommerce"
      data-single-pass-venue={venueId}
      className="mt-10 border border-[#050505]/20 bg-[#F6F1E7] p-6 text-[#050505] sm:p-8"
    >
      <div className="flex flex-col gap-3 border-b border-[#050505]/15 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#3D3830]">
            NIGHTLIFE MILAN E-COMMERCE · {localizeVenueAgeBand(venue, locale)}
          </p>
          <h2 className="mt-1 font-serif text-2xl font-bold text-[#050505]">
            {`${ui.bookPackagesOnlinePrefix} ${venue.name}`}
          </h2>
          <p className="mt-1.5 text-sm text-[#24201B]">
            {copy.trustOnlinePayment}
            {!venue.partner ? (
              <>
                {' · '}
                <span className="font-semibold text-[#5C4415]">{formatCheckoutFeeNote35(locale, venueFeeRate)}</span>
              </>
            ) : (
              ` · ${copy.trustEqualPrice}`
            )}
          </p>
        </div>
        <Link
          href={
            ['gate', 'pineta', 'repvblic', 'justme', 'bischeri', 'bobino', 'voya', 'justme-garda'].includes(
              venueId,
            )
              ? `${lp}/single-pass`
              : `${lp}/cart`
          }
          locale={locale}
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center border border-[#050505] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#050505] transition hover:bg-[#050505] hover:text-[#F6F1E7]"
        >
          {['gate', 'pineta', 'repvblic', 'justme', 'bischeri', 'bobino', 'voya', 'justme-garda'].includes(
            venueId,
          )
            ? copy.embeddedBannerCta
            : copy.drawerCheckoutCta}
        </Link>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {skus.map((sku) => {
          const guests = Math.max(0, sku.guestsPerUnit ?? 1);
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
                    {guests > 1 ? `${guests} ${ui.guestPlural} · ` : ''}
                    {sku.arrivalTime}
                  </span>
                </div>
                <h3 className="mt-1.5 font-serif text-lg font-bold text-[#050505]">
                  {localizeSinglePassSku(sku, locale, copy, venue.name).title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#24201B]">
                  {localizeSinglePassSku(sku, locale, copy, venue.name).description}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#050505]/12 pt-3">
                <div className="font-mono text-xs">
                  <strong className="text-base text-[#050505]">
                    {formatEurFromCents(sku.basePriceCents, locale)}
                  </strong>
                  {currency !== 'EUR' && (
                    <span className="ml-1.5 text-[11px] font-bold text-[#5C4415]">
                      (~{formatConvertedEurCents(sku.basePriceCents)})
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => addItem(sku.id, 1, sku.dietaryPreset, true, undefined, undefined, 'venue')}
                    className="inline-flex min-h-[44px] items-center gap-1.5 border border-[#050505] bg-[#FFFFFF] px-3.5 py-2 text-xs font-bold text-[#050505] transition hover:bg-[#050505] hover:text-[#F6F1E7]"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
                    {copy.addToCartCta}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      addItem(sku.id, 1, sku.dietaryPreset, false, undefined, undefined, 'venue');
                      router.push(`${lp}/checkout`);
                    }}
                    className="inline-flex min-h-[44px] items-center bg-[#25D366] px-4 py-2 text-xs font-extrabold text-[#050505] transition hover:bg-[#2EE472]"
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
          {[
            'gate',
            'pineta',
            'repvblic',
            'justme',
            'bischeri',
            'bobino',
            'voya',
            'justme-garda',
          ].includes(venueId)
            ? copy.trustWhatsAppDate
            : locale === 'it'
              ? 'Voucher email istantaneo · Concierge WhatsApp +39 351 912 7047 (24/7)'
              : 'Instant email voucher · 24/7 WhatsApp Concierge +39 351 912 7047'}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-[#050505]" aria-hidden="true" />
          {copy.trustEqualPrice}
        </span>
      </div>
    </section>
  );
}
