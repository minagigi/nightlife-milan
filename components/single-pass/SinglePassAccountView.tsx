'use client';

import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  CreditCard,
  LogOut,
  MessageCircle,
  QrCode,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { localePrefix } from '@/lib/i18n/locales';
import { SINGLE_PASS_FEE_RATE, SPOKEN_LANGUAGE_OPTIONS, VENUE_BY_ID, formatEurFromCents } from '@/lib/single-pass/catalog';
import { formatMinorCurrency } from '@/lib/single-pass/currency';
import { formatFeeLabel35, getSinglePassCopy, getTerrazzaCheckoutUi35 } from '@/lib/single-pass/i18n35';
import type { SinglePassOrder } from '@/lib/single-pass/types';
import { useSinglePassCart } from './SinglePassCartContext';

type MemberView = {
  id: string;
  email: string;
  fullName: string;
  whatsapp: string;
  age: number;
  spokenLanguages: string[];
  dietaryNotes: string;
  hasPassword: boolean;
};

export default function SinglePassAccountView({
  locale,
  initialCheckoutState,
  initialOrderId,
  initialSessionId,
  initialTab,
}: {
  locale: string;
  initialCheckoutState?: string;
  initialOrderId?: string;
  initialSessionId?: string;
  initialTab?: 'login' | 'register' | 'lookup';
}) {
  const { clearCart } = useSinglePassCart();
  const copy = getSinglePassCopy(locale);
  const terrazzaUi = getTerrazzaCheckoutUi35(locale);
  const lp = localePrefix(locale);
  const isIt = locale === 'it';

  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState<MemberView | null>(null);
  const [orders, setOrders] = useState<SinglePassOrder[]>([]);
  const [paymentReady, setPaymentReady] = useState(false);
  const [statusBanner, setStatusBanner] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [authTab, setAuthTab] = useState<'login' | 'register' | 'lookup'>(initialTab || 'login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regAge, setRegAge] = useState('30');
  const [regWhatsapp, setRegWhatsapp] = useState('+39 ');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [lookupEmail, setLookupEmail] = useState('');
  const [lookupOrderId, setLookupOrderId] = useState(initialOrderId || '');

  const [editWhatsapp, setEditWhatsapp] = useState('');
  const [editLanguages, setEditLanguages] = useState<string[]>([]);
  const [savingProfile, setSavingProfile] = useState(false);
  const [payingOrderId, setPayingOrderId] = useState<string | null>(null);

  const loadAccount = async () => {
    try {
      const res = await fetch('/api/single-pass/me', { cache: 'no-store' });
      if (!res.ok) {
        setMember(null);
        setOrders([]);
        setLoading(false);
        return;
      }
      const data = (await res.json()) as {
        ok?: boolean;
        member?: MemberView;
        orders?: SinglePassOrder[];
        paymentReady?: boolean;
      };
      if (data.ok && data.member) {
        setMember(data.member);
        setOrders(data.orders || []);
        setPaymentReady(Boolean(data.paymentReady));
        setEditWhatsapp(data.member.whatsapp);
        setEditLanguages(data.member.spokenLanguages || []);
      } else {
        setMember(null);
      }
    } catch {
      setMember(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    const init = async () => {
      if (initialCheckoutState === 'success' && initialOrderId && initialSessionId) {
        try {
          const vRes = await fetch(
            `/api/single-pass/verify?order=${encodeURIComponent(initialOrderId)}&session_id=${encodeURIComponent(initialSessionId)}`,
            { cache: 'no-store' },
          );
          const vData = (await vRes.json()) as { ok?: boolean; status?: string };
          if (vRes.ok && vData.ok && vData.status === 'paid' && active) {
            clearCart();
            setStatusBanner(
              isIt
                ? `Pagamento confermato per l’ordine ${initialOrderId}. Il tuo pass digitale è attivo nell’Area Riservata.`
                : `Online payment confirmed for order ${initialOrderId}. Your digital pass is ready below.`,
            );
          }
        } catch {
          // ignore transient network error and fall through to /me
        }
      }
      if (active) await loadAccount();
    };
    init();
    return () => {
      active = false;
    };
  }, [initialCheckoutState, initialOrderId, initialSessionId]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const res = await fetch('/api/single-pass/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    });
    const data = (await res.json()) as { ok?: boolean; error?: string };
    if (!res.ok || !data.ok) {
      setErrorMsg(data.error || 'Invalid credentials');
      return;
    }
    await loadAccount();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const res = await fetch('/api/single-pass/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: regName,
        age: Number(regAge),
        whatsapp: regWhatsapp,
        email: regEmail,
        password: regPassword,
      }),
    });
    const data = (await res.json()) as { ok?: boolean; error?: string };
    if (!res.ok || !data.ok) {
      setErrorMsg(data.error || 'Registration failed');
      return;
    }
    await loadAccount();
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const res = await fetch('/api/single-pass/auth/order-lookup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: lookupEmail, orderId: lookupOrderId }),
    });
    const data = (await res.json()) as { ok?: boolean; error?: string };
    if (!res.ok || !data.ok) {
      setErrorMsg(data.error || 'Order not found');
      return;
    }
    await loadAccount();
  };

  const handleLogout = async () => {
    await fetch('/api/single-pass/auth/logout', { method: 'POST' });
    setMember(null);
    setOrders([]);
  };

  const handlePayExistingOrder = async (orderId: string) => {
    setPayingOrderId(orderId);
    window.location.assign(`${lp}/checkout?order=${encodeURIComponent(orderId)}`);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/single-pass/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          whatsapp: editWhatsapp,
          spokenLanguages: editLanguages,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setErrorMsg(data.error || 'Update failed');
      } else {
        setStatusBanner(isIt ? 'Dati WhatsApp e lingue aggiornati.' : 'WhatsApp & languages updated.');
        await loadAccount();
      }
    } finally {
      setSavingProfile(false);
    }
  };

  const toggleEditLang = (l: string) => {
    setEditLanguages((prev) => (prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]));
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 border-b border-[#F6F1E7]/15 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#EAE3D5]">
            NIGHTLIFE MILAN · SINGLE PASS MEMBER PORTAL
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-[#F6F1E7] sm:text-4xl">
            {copy.accountTitle}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-[#C2B9AA]">{copy.accountSubtitle}</p>
        </div>
        {member && (
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex min-h-[42px] items-center gap-2 border border-[#F6F1E7]/25 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#C2B9AA] hover:border-[#F6F1E7] hover:text-[#F6F1E7]"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            {copy.logoutCta}
          </button>
        )}
      </div>

      {statusBanner && (
        <div className="mb-6 flex items-start gap-3 border border-emerald-400/50 bg-emerald-950/40 p-4 text-sm text-emerald-100">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
          <p>{statusBanner}</p>
        </div>
      )}

      {errorMsg && (
        <div role="alert" className="mb-6 border border-rose-400/50 bg-rose-950/40 p-4 text-sm text-rose-100">
          {errorMsg}
        </div>
      )}

      {loading ? (
        <div className="border border-[#F6F1E7]/15 bg-[#0B0A09] p-12 text-center font-mono text-xs uppercase tracking-widest text-[#C2B9AA]">
          Loading Reserved Area...
        </div>
      ) : !member ? (
        <div className="mx-auto max-w-xl border border-[#050505]/20 bg-[#F6F1E7] p-6 text-[#050505] sm:p-8">
          <div className="grid grid-cols-3 border-b border-[#050505]/15 pb-3 text-center text-xs font-bold uppercase">
            <button
              type="button"
              onClick={() => setAuthTab('login')}
              className={`py-2.5 transition ${authTab === 'login' ? 'bg-[#050505] text-[#F6F1E7]' : 'text-[#3D3830] hover:bg-white/60'}`}
            >
              {copy.tabLogin}
            </button>
            <button
              type="button"
              onClick={() => setAuthTab('register')}
              className={`py-2.5 transition ${authTab === 'register' ? 'bg-[#050505] text-[#F6F1E7]' : 'text-[#3D3830] hover:bg-white/60'}`}
            >
              {copy.tabRegister}
            </button>
            <button
              type="button"
              onClick={() => setAuthTab('lookup')}
              className={`py-2.5 transition ${authTab === 'lookup' ? 'bg-[#050505] text-[#F6F1E7]' : 'text-[#3D3830] hover:bg-white/60'}`}
            >
              {copy.tabOrderLookup}
            </button>
          </div>

          {authTab === 'login' && (
            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <label className="block text-xs font-bold">
                Email
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="mt-1 h-11 w-full border border-[#050505]/30 bg-white px-3 text-sm"
                />
              </label>
              <label className="block text-xs font-bold">
                Password
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="mt-1 h-11 w-full border border-[#050505]/30 bg-white px-3 text-sm"
                />
              </label>
              <button
                type="submit"
                className="min-h-[46px] w-full bg-[#050505] px-5 py-3 text-xs font-extrabold uppercase tracking-widest text-[#F6F1E7]"
              >
                {copy.loginCta}
              </button>
            </form>
          )}

          {authTab === 'register' && (
            <form onSubmit={handleRegister} className="mt-6 space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-xs font-bold">
                  {copy.formFullName}
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="mt-1 h-11 w-full border border-[#050505]/30 bg-white px-3 text-sm"
                  />
                </label>
                <label className="text-xs font-bold">
                  {copy.formAge}
                  <input
                    type="number"
                    min={18}
                    max={99}
                    required
                    value={regAge}
                    onChange={(e) => setRegAge(e.target.value)}
                    className="mt-1 h-11 w-full border border-[#050505]/30 bg-white px-3 text-sm"
                  />
                </label>
              </div>
              <label className="block text-xs font-bold">
                {copy.formWhatsapp}
                <input
                  type="tel"
                  required
                  value={regWhatsapp}
                  onChange={(e) => setRegWhatsapp(e.target.value)}
                  className="mt-1 h-11 w-full border border-[#050505]/30 bg-white px-3 text-sm"
                />
              </label>
              <label className="block text-xs font-bold">
                Email
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="mt-1 h-11 w-full border border-[#050505]/30 bg-white px-3 text-sm"
                />
              </label>
              <label className="block text-xs font-bold">
                Password (min. 8)
                <input
                  type="password"
                  minLength={8}
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="mt-1 h-11 w-full border border-[#050505]/30 bg-white px-3 text-sm"
                />
              </label>
              <button
                type="submit"
                className="min-h-[46px] w-full bg-[#050505] px-5 py-3 text-xs font-extrabold uppercase tracking-widest text-[#F6F1E7]"
              >
                {copy.registerCta}
              </button>
            </form>
          )}

          {authTab === 'lookup' && (
            <form onSubmit={handleLookup} className="mt-6 space-y-4">
              <label className="block text-xs font-bold">
                Email
                <input
                  type="email"
                  required
                  value={lookupEmail}
                  onChange={(e) => setLookupEmail(e.target.value)}
                  className="mt-1 h-11 w-full border border-[#050505]/30 bg-white px-3 text-sm"
                />
              </label>
              <label className="block text-xs font-bold">
                {copy.orderCodeLabel}
                <input
                  type="text"
                  required
                  value={lookupOrderId}
                  onChange={(e) => setLookupOrderId(e.target.value)}
                  placeholder="NLM-SP-2026..."
                  className="mt-1 h-11 w-full border border-[#050505]/30 bg-white px-3 font-mono text-sm uppercase"
                />
              </label>
              <button
                type="submit"
                className="min-h-[46px] w-full bg-[#050505] px-5 py-3 text-xs font-extrabold uppercase tracking-widest text-[#F6F1E7]"
              >
                {copy.lookupCta}
              </button>
            </form>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {/* WhatsApp Mini-Group Dec 20 Status & Contact Editor (#F6F1E7) */}
          <section className="border border-[#050505]/20 bg-[#F6F1E7] p-6 text-[#050505] sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#3D3830]">
                  {member.fullName} · {member.age} anni · {member.email}
                </p>
                <h2 className="mt-2 font-serif text-2xl font-bold text-[#050505]">
                  {copy.miniGroupHeading}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#24201B]">
                  {orders.some((o) => o.whatsappGroupInviteUrl)
                    ? copy.miniGroupActiveBody
                    : copy.miniGroupScheduledBody}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 border border-[#050505]/25 bg-[#EFE9DC] px-3 py-2 font-mono text-xs font-bold text-[#050505]">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  20/12/2026 · Lista / Tavolo NIGHTLIFE MILAN
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-3 border border-[#050505]/15 bg-[#EFE9DC] p-4">
                <label className="block text-xs font-bold text-[#24201B]">
                  {copy.formWhatsapp}
                  <input
                    type="tel"
                    required
                    value={editWhatsapp}
                    onChange={(e) => setEditWhatsapp(e.target.value)}
                    className="mt-1 h-10 w-full border border-[#050505]/30 bg-white px-3 text-sm"
                  />
                </label>
                <div>
                  <p className="text-[11px] font-bold text-[#24201B]">{copy.formLanguages}</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {SPOKEN_LANGUAGE_OPTIONS.slice(0, 6).map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => toggleEditLang(l)}
                        className={`border px-2 py-1 text-[11px] font-semibold ${
                          editLanguages.includes(l)
                            ? 'border-[#050505] bg-[#050505] text-[#F6F1E7]'
                            : 'border-[#050505]/25 bg-white text-[#24201B]'
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="min-h-[40px] w-full bg-[#050505] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#F6F1E7]"
                >
                  {savingProfile ? '...' : copy.updateProfileCta}
                </button>
              </form>
            </div>
          </section>

          {/* Purchased Single Pass Cards */}
          <section className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-[#F6F1E7]">
                {isIt ? `I tuoi Single Pass (${orders.length})` : `Your Single Passes (${orders.length})`}
              </h2>
              <Link
                href={`${lp}/single-pass`}
                locale={locale}
                className="inline-flex min-h-[40px] items-center gap-2 border border-[#F6F1E7]/30 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#F6F1E7] hover:border-[#F6F1E7]"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                + {copy.filterAllVenues}
              </Link>
            </div>

            {orders.length === 0 ? (
              <div className="border border-[#F6F1E7]/15 bg-[#0B0A09] p-8 text-center">
                <p className="text-sm text-[#C2B9AA]">{copy.drawerEmptyBody}</p>
                <Link
                  href={`${lp}/single-pass`}
                  locale={locale}
                  className="mt-4 inline-flex min-h-[44px] items-center bg-[#F6F1E7] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#050505]"
                >
                  {copy.drawerExploreCta}
                </Link>
              </div>
            ) : (
              orders.map((order) => {
                const isPaid = order.status === 'paid';
                const isTerrazzaOrder = order.items.some((i) => i.venueId === 'terrazza-duomo-21');
                const hasSinglePassVenue = order.items.some((i) =>
                  ['gate', 'pineta', 'repvblic', 'justme', 'bischeri', 'voya', 'justme-garda'].includes(
                    i.venueId,
                  ),
                );
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
                  typeof order.feeRate === 'number' ? order.feeRate : SINGLE_PASS_FEE_RATE,
                  feeRates.size > 1,
                );
                return (
                  <article
                    key={order.id}
                    className="border border-[#F6F1E7]/20 bg-[#0B0A09] p-6"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F6F1E7]/14 pb-4">
                      <div>
                        <span
                          className={`inline-block px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider ${
                            isPaid
                              ? 'bg-emerald-400 text-[#050505]'
                              : 'bg-[#F6F1E7] text-[#050505]'
                          }`}
                        >
                          {isPaid ? copy.passStatusPaid : copy.passStatusPending}
                        </span>
                        <p className="mt-2 font-mono text-sm font-bold text-[#F6F1E7]">
                          {order.id} · PIN {order.accessPin}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-xs text-[#C2B9AA]">
                        <QrCode className="h-5 w-5 text-[#EAE3D5]" aria-hidden="true" />
                        <span>Lista NIGHTLIFE MILAN</span>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      {order.items.map((item) => {
                        const venueSpec = VENUE_BY_ID[item.venueId];
                        return (
                          <div
                            key={`${order.id}-${item.skuId}`}
                            className="flex flex-col justify-between gap-2 border border-[#F6F1E7]/12 bg-[#050505] p-4 sm:flex-row sm:items-center"
                          >
                            <div>
                              <p className="font-serif text-lg font-bold text-[#F6F1E7]">
                                {item.venueName} · {item.title} x {item.quantity}
                              </p>
                              <p className="mt-1 text-xs text-[#C2B9AA]">
                                {venueSpec?.address} · {copy.arrivalLabel}: {item.arrivalTime}
                                {item.dietaryChoice ? ` · ${item.dietaryChoice}` : ''}
                              </p>
                              {venueSpec && (
                                <p className="mt-0.5 text-xs text-[#847C6F]">
                                  Dress code: {isIt ? venueSpec.dressCodeIt : venueSpec.dressCodeEn}
                                </p>
                              )}
                            </div>
                            <p className="font-mono text-sm font-bold text-[#F6F1E7]">
                              {formatEurFromCents(item.lineBaseCents, locale)}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-4 grid gap-2 border-t border-[#F6F1E7]/12 pt-4 font-mono text-xs sm:grid-cols-3">
                      <div className="text-[#C2B9AA]">
                        {copy.basePriceLabel}: {formatEurFromCents(order.subtotalBaseCents, locale)}
                      </div>
                      <div className="text-[#EAE3D5]">
                        {orderFeeLabel}: {formatEurFromCents(order.feeCents, locale)}
                      </div>
                      <div className="font-bold text-[#F6F1E7] sm:text-right">
                        {copy.totalLabel}: {formatEurFromCents(order.totalCents, locale)}
                        {order.presentmentCurrency && order.presentmentCurrency !== 'EUR' && (
                          <span className="ml-2 text-[#C9A84C]">
                            ({formatMinorCurrency(order.presentmentTotalMinor, order.presentmentCurrency, locale)})
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      {!isPaid && paymentReady && (
                        <button
                          type="button"
                          onClick={() => handlePayExistingOrder(order.id)}
                          disabled={payingOrderId === order.id}
                          className="inline-flex min-h-[44px] items-center gap-2 bg-[#F6F1E7] px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#050505] hover:bg-[#EAE3D5]"
                        >
                          <CreditCard className="h-4 w-4" aria-hidden="true" />
                          {payingOrderId === order.id ? '...' : copy.completePaymentCta}
                        </button>
                      )}
                      {order.whatsappGroupInviteUrl && (
                        <a
                          href={order.whatsappGroupInviteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[44px] items-center gap-2 bg-[#25D366] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#050505]"
                        >
                          <MessageCircle className="h-4 w-4" aria-hidden="true" />
                          {copy.openMiniGroupCta}
                        </a>
                      )}
                      {!order.whatsappGroupInviteUrl && hasSinglePassVenue && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-[#C2B9AA]">
                          <ShieldCheck className="h-4 w-4 text-[#EAE3D5]" aria-hidden="true" />
                          WhatsApp Group: dal 20 dicembre 2026 su {order.customer.whatsapp}
                        </span>
                      )}
                      {isTerrazzaOrder && (
                        <p className="w-full border border-[#C9A84C]/35 bg-[#17130D] p-3 text-xs text-[#EAE3D5]">
                          {terrazzaUi.confirmationRefundNotice}
                        </p>
                      )}
                    </div>
                  </article>
                );
              })
            )}
          </section>
        </div>
      )}
    </div>
  );
}
