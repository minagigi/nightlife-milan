'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, ShieldCheck, ShoppingBag, Users } from 'lucide-react';
import { localePrefix } from '@/lib/i18n/locales';
import { formatEurFromCents, getSkuFeeRate } from '@/lib/single-pass/catalog';
import { getSinglePassCopy, localizeSinglePassSku } from '@/lib/single-pass/i18n35';
import { getCapodannoUiCopy } from '@/lib/capodanno/i18n';
import type { SinglePassSku } from '@/lib/single-pass/types';
import { useSinglePassCart } from './SinglePassCartContext';

export default function ConfirmedEventTicketsBox({
  locale,
  skus,
  venueName,
}: {
  locale: string;
  skus: readonly SinglePassSku[];
  venueName: string;
}) {
  const router = useRouter();
  const { addItem, currency, formatConvertedEurCents } = useSinglePassCart();
  const copy = getSinglePassCopy(locale);
  const ui = getCapodannoUiCopy(locale);
  const lp = localePrefix(locale);

  if (!skus || skus.length === 0) return null;

  return (
    <section
      id="official-tickets-ecommerce"
      data-confirmed-event-tickets={skus[0].id}
      className="mt-8 border border-[#F6F1E7]/25 bg-[#0B0A09] p-6 text-[#F6F1E7] sm:p-8"
    >
      <div className="flex flex-col gap-2 border-b border-[#F6F1E7]/15 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
            {ui.officialDirectTicketingEyebrow}
          </p>
          <h3 className="mt-1 font-serif text-2xl font-bold text-[#F6F1E7]">
            {`${ui.bookPackagesOnlinePrefix} ${venueName}`}
          </h3>
        </div>
        <div className="inline-flex items-center gap-1.5 font-mono text-xs text-[#EAE3D5]">
          <ShieldCheck className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
          <span>{copy.trustOnlinePayment}</span>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {skus.map((sku) => {
          const guests = sku.guestsPerUnit || 1;
          const isPartner = getSkuFeeRate(sku, 'venue') === 0;
          const locSku = localizeSinglePassSku(sku, locale, copy, venueName);
          return (
            <div
              key={sku.id}
              className="flex flex-col justify-between border border-[#F6F1E7]/15 bg-[#12100E] p-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-[#C2B9AA]">
                  <span className="uppercase tracking-wider text-[#C9A84C]">
                    {copy.categoryLabels[sku.category]}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" aria-hidden="true" />
                    {guests} {guests === 1 ? ui.guestSingular : ui.guestPlural} · {sku.arrivalTime}
                  </span>
                </div>
                <h4 className="mt-1.5 font-serif text-lg font-bold text-[#F6F1E7]">
                  {locSku.title}
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-[#C2B9AA]">
                  {locSku.description}
                </p>
              </div>

              <div className="mt-4 space-y-3 border-t border-[#F6F1E7]/12 pt-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2 font-mono text-xs">
                  <span className="text-[#8E8577]">{copy.basePriceLabel}</span>
                  <div className="text-right">
                    <span className="text-base font-bold text-[#F6F1E7]">
                      {formatEurFromCents(sku.basePriceCents, locale)}
                    </span>
                    {currency !== 'EUR' && (
                      <span className="ml-2 text-xs text-[#C9A84C]">
                        (~{formatConvertedEurCents(sku.basePriceCents)})
                      </span>
                    )}
                  </div>
                </div>
                {!isPartner && (
                  <p className="text-[11px] text-[#C2B9AA]">{copy.feeCalculatedAtCheckoutNote}</p>
                )}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => addItem(sku.id, 1, sku.dietaryPreset, true, undefined, undefined, 'venue')}
                    className="inline-flex min-h-[42px] flex-1 items-center justify-center gap-1.5 border border-[#F6F1E7]/35 bg-[#050505] px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#F6F1E7] transition hover:border-[#F6F1E7]"
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
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 bg-[#25D366] px-3 py-2 text-xs font-extrabold uppercase tracking-wider text-[#050505] transition hover:bg-[#2EE472]"
                  >
                    <CreditCard className="h-3.5 w-3.5" aria-hidden="true" />
                    {copy.buyNowCta}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
