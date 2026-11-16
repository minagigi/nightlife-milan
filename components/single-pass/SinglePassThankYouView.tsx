'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, Mail, MessageCircle, Phone, QrCode, ShieldCheck, Users } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { localePrefix } from '@/lib/i18n/locales';
import { formatEurFromCents } from '@/lib/single-pass/catalog';
import { formatMinorCurrency } from '@/lib/single-pass/currency';
import { getSinglePassCopy } from '@/lib/single-pass/i18n35';
import type { SinglePassOrder } from '@/lib/single-pass/types';
import { useSinglePassCart } from './SinglePassCartContext';

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
          clearCart();
        }
      })
      .catch(() => {
        setErrorMsg('Unable to verify order right now.');
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, paymentIntentId, sessionId]);

  if (loading) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-20 text-center text-sm text-[#C2B9AA]">
        Verifying order...
      </section>
    );
  }

  if (!order) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 text-center space-y-5">
        <div className="border border-[#F6F1E7]/20 bg-[#0B0A09] p-8">
          <h1 className="font-serif text-3xl font-bold text-[#F6F1E7]">
            {orderId ? `${copy.orderIdLabel}: ${orderId}` : copy.navAccountLabel}
          </h1>
          <p className="mt-3 text-sm text-[#C2B9AA]">
            {errorMsg || copy.accountSubtitle}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href={`${lp}/account`}
              locale={locale}
              className="inline-flex min-h-[44px] items-center justify-center bg-[#F6F1E7] px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#050505]"
            >
              {copy.navAccountLabel}
            </Link>
            {orderId && (
              <Link
                href={`${lp}/checkout?order=${encodeURIComponent(orderId)}`}
                locale={locale}
                className="inline-flex min-h-[44px] items-center justify-center border border-[#F6F1E7]/30 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#F6F1E7]"
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
  const hasCapodannoPass = order.items.some((i) =>
    ['gate', 'pineta', 'repvblic', 'justme', 'bischeri', 'voya', 'justme-garda'].includes(
      i.venueId,
    ),
  );

  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8 space-y-8">
      <header className="border border-[#25D366]/45 bg-[#0B0A09] p-6 sm:p-10">
        <p className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#25D366]">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          {copy.thankYouEyebrow}
        </p>
        <h1 className="mt-3 font-serif text-3xl font-bold text-[#F6F1E7] sm:text-5xl">
          {copy.thankYouHeading}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#C2B9AA]">
          {copy.thankYouSubtitle}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3 font-mono text-xs">
          <div className="border border-[#F6F1E7]/20 bg-[#050505] p-3.5">
            <p className="text-[#8E8577]">{copy.orderIdLabel}</p>
            <p className="mt-1 text-base font-bold text-[#F6F1E7]">{order.id}</p>
          </div>
          <div className="border border-[#F6F1E7]/20 bg-[#050505] p-3.5">
            <p className="text-[#8E8577]">ACCESS PIN</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-base font-bold text-[#C9A84C]">
              <QrCode className="h-4 w-4" aria-hidden="true" />
              {order.accessPin}
            </p>
          </div>
          <div className="border border-[#F6F1E7]/20 bg-[#050505] p-3.5">
            <p className="text-[#8E8577]">{copy.guestsLabel}</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-base font-bold text-[#F6F1E7]">
              <Users className="h-4 w-4" aria-hidden="true" />
              {order.totalHeadcount}
            </p>
          </div>
        </div>
      </header>

      {/* Customer Contact Details + Purchased Packages */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="border border-[#F6F1E7]/16 bg-[#0B0A09] p-6 space-y-3">
          <h2 className="font-serif text-xl font-bold text-[#F6F1E7]">
            {copy.customerContactsHeading}
          </h2>
          <div className="space-y-2 text-sm text-[#EAE3D5]">
            <p className="font-bold text-[#F6F1E7]">
              {order.customer.fullName} · {order.customer.age} {isIt ? 'anni' : 'yrs'}
              {order.customer.country ? ` (${order.customer.country})` : ''}
            </p>
            <p className="flex items-center gap-2 text-xs text-[#C2B9AA]">
              <Mail className="h-4 w-4 text-[#C9A84C]" aria-hidden="true" />
              {order.customer.email}
            </p>
            <p className="flex items-center gap-2 font-mono text-xs text-[#C2B9AA]">
              <Phone className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
              {order.customer.whatsapp}
            </p>
          </div>
        </div>

        <div className="border border-[#F6F1E7]/16 bg-[#0B0A09] p-6 space-y-3">
          <h2 className="font-serif text-xl font-bold text-[#F6F1E7]">
            {isIt ? 'Importi Contabilizzati' : 'Payment Breakdown'}
          </h2>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between text-[#C2B9AA]">
              <span>{copy.basePriceLabel}</span>
              <span className="font-mono">{formatEurFromCents(order.subtotalBaseCents, locale)}</span>
            </div>
            <div className="flex justify-between text-[#C2B9AA]">
              <span>{copy.feeLabel}</span>
              <span className="font-mono">+{formatEurFromCents(order.feeCents, locale)}</span>
            </div>
            <div className="flex justify-between border-t border-[#F6F1E7]/12 pt-2 font-bold text-[#F6F1E7]">
              <span>{copy.totalLabel} (EUR)</span>
              <span className="font-mono">{formatEurFromCents(order.totalCents, locale)}</span>
            </div>
            {paidCur !== 'EUR' && (
              <div className="flex justify-between bg-[#141210] p-2.5 text-sm font-bold text-[#C9A84C]">
                <span>
                  {copy.chargedInCurrencyLabel} ({paidCur})
                </span>
                <span className="font-mono">
                  {formatMinorCurrency(order.presentmentTotalMinor, paidCur, locale)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="border border-[#F6F1E7]/16 bg-[#0B0A09] p-6">
        <h2 className="font-serif text-xl font-bold text-[#F6F1E7] mb-4">
          {isIt ? 'Dettaglio Pacchetti Acquistati' : 'Purchased Items'}
        </h2>
        <div className="divide-y divide-[#F6F1E7]/10">
          {order.items.map((item) => (
            <div key={item.skuId} className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm">
              <div>
                <p className="font-bold text-[#F6F1E7]">
                  {item.venueName} · {item.title} × {item.quantity}
                </p>
                <p className="font-mono text-xs text-[#C2B9AA]">
                  {item.arrivalTime} · {item.totalGuests || item.quantity} pax
                  {item.dietaryChoice ? ` · ${item.dietaryChoice}` : ''}
                </p>
              </div>
              <span className="font-mono font-bold text-[#F6F1E7]">
                {formatEurFromCents(item.lineTotalCents, locale)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Dec 20 Mini-Group Notice */}
      {hasCapodannoPass && (
        <div className="border border-[#25D366]/35 bg-[#111512] p-5 text-sm text-[#EAE3D5]">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#25D366]">
            {copy.miniGroupHeading}
          </p>
          <p className="mt-2">
            {order.whatsappGroupInviteUrl ? copy.miniGroupActiveBody : copy.miniGroupScheduledBody}
          </p>
          {order.whatsappGroupInviteUrl && (
            <a
              href={order.whatsappGroupInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-[42px] items-center gap-2 bg-[#25D366] px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-[#050505]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {copy.openMiniGroupCta}
            </a>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#F6F1E7]/15 pt-6">
        <p className="inline-flex items-center gap-2 text-xs text-[#8E8577]">
          <ShieldCheck className="h-4 w-4 text-[#C9A84C]" aria-hidden="true" />
          nightlifemilan.com is a brand of Magister Mida LLC · 447 Broadway, 2nd Floor #2242, New York, NY 10013 · EIN 36-5071848
        </p>
        <Link
          href={`${lp}/account`}
          locale={locale}
          className="inline-flex min-h-[46px] items-center justify-center bg-[#F6F1E7] px-6 py-3 text-xs font-extrabold uppercase tracking-widest text-[#050505]"
        >
          {copy.navAccountLabel} →
        </Link>
      </div>
    </section>
  );
}
