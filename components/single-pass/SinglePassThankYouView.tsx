'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, Mail, MessageCircle, Phone, QrCode, ShieldCheck, Users } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { localePrefix } from '@/lib/i18n/locales';
import {
  SINGLE_PASS_FEE_RATE,
  formatEurFromCents,
  isSinglePassMiniGroupOrder,
} from '@/lib/single-pass/catalog';
import { formatMinorCurrency } from '@/lib/single-pass/currency';
import {
  formatFeeLabel35,
  formatZeroGuestAddonBadge35,
  getCheckoutUxCopy,
  getSinglePassCopy,
  getTerrazzaCheckoutUi35,
} from '@/lib/single-pass/i18n35';
import type { SinglePassOrder } from '@/lib/single-pass/types';
import { trackEcommerceEvent } from '@/lib/analytics';
import { cartRowKey, useSinglePassCart } from './SinglePassCartContext';

type ThankYouOrderView = {
  id: string;
  accessPin: string;
  status: string;
  paidAt: string | null;
  createdAt: string;
  customer: SinglePassOrder['customer'];
  items: SinglePassOrder['items'];
  totalHeadcount: number;
  subtotalBaseCents: number;
  feeRate?: number;
  feeCents: number;
  totalCents: number;
  presentmentCurrency: string;
  presentmentSubtotalMinor: number;
  presentmentFeeMinor: number;
  presentmentTotalMinor: number;
  fxRate: number;
  whatsappGroupStatus: SinglePassOrder['whatsappGroupStatus'];
  whatsappGroupInviteUrl: string | null;
};

export default function SinglePassThankYouView({
  locale,
  orderId,
  paymentIntentId,
  sessionId,
}: {
  locale: string;
  orderId?: string;
  paymentIntentId?: string;
  sessionId?: string;
}) {
  const { clearCart } = useSinglePassCart();
  const copy = getSinglePassCopy(locale);
  const uxCopy = getCheckoutUxCopy(locale);
  const lp = localePrefix(locale);
  const isIt = locale === 'it';

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<ThankYouOrderView | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    fetch('/api/single-pass/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, paymentIntentId, sessionId }),
    })
      .then(async (res) => {
        const data = (await res.json().catch(() => null)) as {
          ok?: boolean;
          order?: ThankYouOrderView;
          error?: string;
        } | null;
        if (!res.ok || !data?.ok || !data.order) {
          setErrorMsg(data?.error || 'Order confirmation pending');
          return;
        }
        setOrder(data.order);
        if (data.order.status === 'paid') {
          trackEcommerceEvent('purchase', {
            transaction_id: data.order.id,
            currency: 'EUR',
            value: (data.order.totalCents || 0) / 100,
            item_count: data.order.items.reduce((s, i) => s + (i.quantity || 1), 0),
            items: data.order.items.map((item) => ({
              item_id: item.skuId,
              item_name: `${item.venueName} - ${item.title}`,
              item_category: item.channel || 'venue',
              price: Number(((item.unitTotalCents || 0) / 100).toFixed(2)),
              quantity: item.quantity || 1,
            })),
          });
          clearCart({ converted: true });
        }
      })
      .catch(() => {
        setErrorMsg(uxCopy.errNetwork);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, paymentIntentId, sessionId]);

  if (loading) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-20 text-center text-base text-[#4F4D48]">
        Verifying order...
      </section>
    );
  }

  if (!order) {
    return (
      <section className="mx-auto max-w-3xl space-y-5 px-4 py-16 text-center">
        <div className="border border-[#0A0A0C]/16 bg-[#FFFFFF] p-8">
          <h1 className="font-display text-3xl font-bold uppercase text-[#0A0A0C]">
            {orderId ? `${copy.orderIdLabel}: ${orderId}` : copy.navAccountLabel}
          </h1>
          <p className="mt-3 text-base text-[#4F4D48]">{errorMsg || copy.accountSubtitle}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href={`${lp}/account`}
              locale={locale}
              className="inline-flex min-h-[46px] items-center justify-center bg-[#0A0A0C] px-5 py-2.5 text-sm font-bold text-[#FFFFFF]"
            >
              {copy.navAccountLabel}
            </Link>
            {orderId && (
              <Link
                href={`${lp}/checkout?order=${encodeURIComponent(orderId)}`}
                locale={locale}
                className="inline-flex min-h-[46px] items-center justify-center bg-[#D9381E] px-5 py-2.5 text-sm font-bold text-[#FFFFFF]"
              >
                {copy.completePaymentCta}
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  }

  const paidCur = (order.presentmentCurrency || 'EUR').toUpperCase();
  const terrazzaUi = getTerrazzaCheckoutUi35(locale);
  const hasTerrazzaDuomo21 = order.items.some((i) => i.venueId === 'terrazza-duomo-21');
  const hasCapodannoPass = isSinglePassMiniGroupOrder(order.items);
  const feeRates = new Set(
    order.items.map((i) =>
      typeof i.feeRate === 'number'
        ? i.feeRate
        : i.venueId === 'terrazza-duomo-21'
          ? 0.2
          : SINGLE_PASS_FEE_RATE,
    ),
  );
  const orderFeeLabel = formatFeeLabel35(
    locale,
    typeof order.feeRate === 'number'
      ? order.feeRate
      : feeRates.size === 1
        ? Array.from(feeRates)[0]
        : SINGLE_PASS_FEE_RATE,
    feeRates.size > 1,
  );

  return (
    <section className="mx-auto max-w-4xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <header className="border-2 border-[#0A0A0C] bg-[#FFFFFF] p-6 sm:p-10">
        <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#15803D]">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          {copy.thankYouEyebrow}
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold uppercase text-[#0A0A0C] sm:text-5xl">
          {copy.thankYouHeading}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#4F4D48]">
          {copy.thankYouSubtitle}
        </p>

        <div className="mt-6 grid gap-3 text-sm tabular-nums sm:grid-cols-3">
          <div className="border border-[#0A0A0C]/16 bg-[#EDEBE6] p-4">
            <p className="text-xs font-bold text-[#4F4D48]">{copy.orderIdLabel}</p>
            <p className="mt-1 font-display text-2xl font-extrabold text-[#0A0A0C]">{order.id}</p>
          </div>
          <div className="border border-[#0A0A0C]/16 bg-[#EDEBE6] p-4">
            <p className="text-xs font-bold text-[#4F4D48]">ACCESS PIN</p>
            <p className="mt-1 inline-flex items-center gap-1.5 font-display text-2xl font-extrabold text-[#D9381E]">
              <QrCode className="h-5 w-5" aria-hidden="true" />
              {order.accessPin}
            </p>
          </div>
          <div className="border border-[#0A0A0C]/16 bg-[#EDEBE6] p-4">
            <p className="text-xs font-bold text-[#4F4D48]">{copy.guestsLabel}</p>
            <p className="mt-1 inline-flex items-center gap-1.5 font-display text-2xl font-extrabold text-[#0A0A0C]">
              <Users className="h-5 w-5" aria-hidden="true" />
              {order.totalHeadcount}
            </p>
          </div>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3 border border-[#0A0A0C]/16 bg-[#FFFFFF] p-6">
          <h2 className="font-display text-2xl font-bold uppercase text-[#0A0A0C]">
            {copy.customerContactsHeading}
          </h2>
          <div className="space-y-2 text-sm text-[#0A0A0C]">
            <p className="font-bold">
              {order.customer.fullName} · {order.customer.age} {isIt ? 'anni' : 'yrs'}
              {order.customer.country ? ` (${order.customer.country})` : ''}
            </p>
            <p className="flex items-center gap-2 text-[#4F4D48]">
              <Mail className="h-4 w-4 text-[#0A0A0C]" aria-hidden="true" />
              {order.customer.email}
            </p>
            <p className="flex items-center gap-2 tabular-nums text-[#4F4D48]">
              <Phone className="h-4 w-4 text-[#15803D]" aria-hidden="true" />
              {order.customer.whatsapp}
            </p>
          </div>
        </div>

        <div className="space-y-3 border border-[#0A0A0C]/16 bg-[#FFFFFF] p-6">
          <h2 className="font-display text-2xl font-bold uppercase text-[#0A0A0C]">
            {isIt ? 'Importi Contabilizzati' : 'Payment Breakdown'}
          </h2>
          <div className="space-y-1.5 text-sm tabular-nums">
            <div className="flex justify-between text-[#4F4D48]">
              <span>{copy.basePriceLabel}</span>
              <span>{formatEurFromCents(order.subtotalBaseCents, locale)}</span>
            </div>
            {order.feeCents > 0 && (
              <div className="flex justify-between text-[#4F4D48]">
                <span>{orderFeeLabel}</span>
                <span>+{formatEurFromCents(order.feeCents, locale)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-[#0A0A0C]/14 pt-2 font-extrabold text-[#0A0A0C]">
              <span>{copy.totalLabel} (EUR)</span>
              <span>{formatEurFromCents(order.totalCents, locale)}</span>
            </div>
            {paidCur !== 'EUR' && (
              <div className="flex justify-between bg-[#EDEBE6] p-2.5 text-sm font-bold text-[#0A0A0C]">
                <span>
                  {copy.chargedInCurrencyLabel} ({paidCur})
                </span>
                <span className="text-[#D9381E]">
                  {formatMinorCurrency(order.presentmentTotalMinor, paidCur, locale)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border border-[#0A0A0C]/16 bg-[#FFFFFF] p-6">
        <h2 className="mb-4 font-display text-2xl font-bold uppercase text-[#0A0A0C]">
          {isIt ? 'Dettaglio Pacchetti Acquistati' : 'Purchased Items'}
        </h2>
        <div className="divide-y divide-[#0A0A0C]/12">
          {order.items.map((item) => {
            const guestCount = typeof item.totalGuests === 'number' ? item.totalGuests : item.quantity;
            return (
              <div
                key={cartRowKey(item)}
                className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm tabular-nums"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-bold text-[#0A0A0C]">
                      {item.venueName} · {item.title} × {item.quantity}
                    </p>
                    {item.channel === 'single-pass' && (
                      <span className="border border-[#0A0A0C]/25 bg-[#EDEBE6] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#0A0A0C]">
                        Single Pass
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#4F4D48]">
                    {item.arrivalTime} ·{' '}
                    {guestCount > 0
                      ? `${guestCount} ${
                          guestCount === 1 ? uxCopy.guestUnitSingular : uxCopy.guestsUnit
                        }`
                      : formatZeroGuestAddonBadge35(locale, item.venueId)}
                    {item.dietaryChoice ? ` · ${item.dietaryChoice}` : ''}
                  </p>
                </div>
                <span className="font-display text-2xl font-extrabold text-[#0A0A0C]">
                  {formatEurFromCents(item.lineTotalCents, locale)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {hasTerrazzaDuomo21 && (
        <div className="space-y-2 border border-[#0A0A0C]/20 bg-[#FFFFFF] p-5 text-sm text-[#0A0A0C]">
          <p className="font-bold">{terrazzaUi.confirmationRefundNotice}</p>
          <p className="text-xs leading-relaxed text-[#4F4D48]">{terrazzaUi.entryCheckpointNotice}</p>
        </div>
      )}

      {hasCapodannoPass && (
        <div className="border border-[#0A0A0C]/20 bg-[#FFFFFF] p-5 text-sm text-[#0A0A0C]">
          <p className="text-xs font-extrabold uppercase tracking-wider text-[#15803D]">
            {copy.miniGroupHeading}
          </p>
          <p className="mt-2 text-[#4F4D48]">
            {order.whatsappGroupInviteUrl ? copy.miniGroupActiveBody : copy.miniGroupScheduledBody}
          </p>
          {order.whatsappGroupInviteUrl && (
            <a
              href={order.whatsappGroupInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-[44px] items-center gap-2 bg-[#25D366] px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#0A0A0C]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {copy.openMiniGroupCta}
            </a>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#0A0A0C]/16 pt-6">
        <p className="inline-flex items-center gap-2 text-xs text-[#4F4D48]">
          <ShieldCheck className="h-4 w-4 text-[#0A0A0C]" aria-hidden="true" />
          Nightlife Milan · nightlifemilan.com · Official Digital Pass
        </p>
        <Link
          href={`${lp}/account`}
          locale={locale}
          className="inline-flex min-h-[48px] items-center justify-center bg-[#D9381E] px-6 py-3 text-sm font-extrabold uppercase tracking-wider text-[#FFFFFF] hover:bg-[#B82B14]"
        >
          {copy.navAccountLabel} →
        </Link>
      </div>
    </section>
  );
}
