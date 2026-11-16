'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Lock,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
} from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { localePrefix } from '@/lib/i18n/locales';
import {
  SPOKEN_LANGUAGE_OPTIONS,
  VENUE_BY_ID,
  computeSinglePassPrice,
  formatEurFromCents,
  resolveCatalogSku,
  validateAgeForSkus,
} from '@/lib/single-pass/catalog';
import { formatMinorCurrency, type SupportedCurrency } from '@/lib/single-pass/currency';
import { getSinglePassCopy } from '@/lib/single-pass/i18n35';
import type { SinglePassSku } from '@/lib/single-pass/types';
import { readClientAttribution } from './AttributionTracker';
import EmbeddedPaymentForm from './EmbeddedPaymentForm';
import { useSinglePassCart } from './SinglePassCartContext';

type PaymentIntentSession = {
  orderId: string;
  publishableKey: string;
  clientSecret: string;
  presentmentCurrency: string;
  presentmentTotalMinor: number;
  totalEurCents: number;
  fxRate: number;
  fullName: string;
  email: string;
  phone: string;
};

export default function SinglePassCheckoutView({
  locale,
  resumeOrderId,
  cancelled,
}: {
  locale: string;
  resumeOrderId?: string;
  cancelled?: boolean;
}) {
  const {
    items,
    updateQuantity,
    updateDietary,
    removeItem,
    clearCart,
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

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [fullName, setFullName] = useState('');
  const [ageRaw, setAgeRaw] = useState('');
  const [country, setCountry] = useState(isIt ? 'Italia' : '');
  const [whatsapp, setWhatsapp] = useState('+39 ');
  const [email, setEmail] = useState('');
  const [createAccount, setCreateAccount] = useState(true);
  const [password, setPassword] = useState('');
  const [spokenLanguages, setSpokenLanguages] = useState<string[]>([
    locale === 'it' ? 'Italiano' : 'English',
  ]);
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [paymentSession, setPaymentSession] = useState<PaymentIntentSession | null>(null);

  useEffect(() => {
    fetch('/api/single-pass/me', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.ok && d?.member) {
          setIsSignedIn(true);
          setCreateAccount(false);
          setFullName((prev) => prev || d.member.fullName || '');
          setEmail((prev) => prev || d.member.email || '');
          setWhatsapp((prev) => (prev === '+39 ' || !prev ? d.member.whatsapp || '+39 ' : prev));
          setAgeRaw((prev) => prev || (d.member.age ? String(d.member.age) : ''));
          setCountry((prev) => prev || d.member.country || '');
          if (Array.isArray(d.member.spokenLanguages) && d.member.spokenLanguages.length > 0) {
            setSpokenLanguages(d.member.spokenLanguages);
          }
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!resumeOrderId) return;
    setSubmitting(true);
    fetch(`/api/single-pass/orders/${encodeURIComponent(resumeOrderId)}/pay`, {
      method: 'POST',
    })
      .then(async (res) => {
        const data = (await res.json().catch(() => null)) as
          | (PaymentIntentSession & {
              ok?: boolean;
              error?: string;
              customer?: { fullName?: string; email?: string; whatsapp?: string };
            })
          | null;
        if (!res.ok || !data?.ok || !data.clientSecret) {
          setErrorMessage(
            data?.error || 'Unable to resume payment right now. Sign in or open your Reserved Area.',
          );
          return;
        }
        setPaymentSession({
          orderId: data.orderId,
          publishableKey: data.publishableKey,
          clientSecret: data.clientSecret,
          presentmentCurrency: data.presentmentCurrency || 'EUR',
          presentmentTotalMinor: data.presentmentTotalMinor,
          totalEurCents: data.totalEurCents,
          fxRate: data.fxRate || 1,
          fullName: data.customer?.fullName || fullName,
          email: data.customer?.email || email,
          phone: data.customer?.whatsapp || whatsapp,
        });
      })
      .catch(() => {
        setErrorMessage('Connection error resuming payment.');
      })
      .finally(() => {
        setSubmitting(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeOrderId]);

  const parsedAge = Number(ageRaw);
  const cartSkus = useMemo(() => {
    return items
      .map((item) => resolveCatalogSku(item.skuId))
      .filter((s): s is SinglePassSku => Boolean(s));
  }, [items]);

  const liveAgeCheck = useMemo(() => {
    if (!ageRaw.trim() || !Number.isFinite(parsedAge)) return null;
    return validateAgeForSkus(cartSkus, parsedAge);
  }, [ageRaw, parsedAge, cartSkus]);

  const toggleLanguage = (langLabel: string) => {
    setSpokenLanguages((prev) =>
      prev.includes(langLabel) ? prev.filter((l) => l !== langLabel) : [...prev, langLabel],
    );
  };

  const handleInitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (items.length === 0) {
      setErrorMessage(copy.drawerEmptyBody);
      return;
    }

    if (liveAgeCheck && !liveAgeCheck.ok) {
      setErrorMessage(
        liveAgeCheck.errorCode === 'PINETA_STRICT_UNDER_30' ? copy.pinetaUnder30Error : copy.under18Error,
      );
      return;
    }

    if (createAccount && !isSignedIn && password.trim().length > 0 && password.trim().length < 8) {
      setErrorMessage(
        isIt
          ? 'La password deve avere almeno 8 caratteri.'
          : 'Password must be at least 8 characters.',
      );
      return;
    }

    setSubmitting(true);
    try {
      const attr = readClientAttribution();
      const res = await fetch('/api/single-pass/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locale,
          currency,
          items,
          fullName,
          email,
          whatsapp,
          age: parsedAge,
          country,
          password: createAccount && !isSignedIn ? password : '',
          spokenLanguages,
          dietaryNotes,
          acceptedTerms,
          attribution: {
            ...attr,
            checkoutPath: typeof window !== 'undefined' ? window.location.pathname : `/${locale}/checkout`,
          },
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        orderId?: string;
        clientSecret?: string;
        publishableKey?: string;
        totalEurCents?: number;
        presentmentCurrency?: string;
        presentmentTotalMinor?: number;
        fxRate?: number;
      };

      if (!res.ok || !data.ok || !data.clientSecret || !data.orderId || !data.publishableKey) {
        setErrorMessage(
          data.error || 'Unable to initialize secure payment.',
        );
        setSubmitting(false);
        return;
      }

      setPaymentSession({
        orderId: data.orderId,
        publishableKey: data.publishableKey,
        clientSecret: data.clientSecret,
        presentmentCurrency: data.presentmentCurrency || currency,
        presentmentTotalMinor: data.presentmentTotalMinor ?? grandTotalCents,
        totalEurCents: data.totalEurCents ?? grandTotalCents,
        fxRate: data.fxRate ?? currentFxRate,
        fullName,
        email,
        phone: whatsapp,
      });
    } catch {
      setErrorMessage('Network error during checkout initialization.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted && !resumeOrderId) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-16 text-center text-sm text-[#C2B9AA]">
        Loading...
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-[#F6F1E7]/15 pb-6">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#EAE3D5]">
          NIGHTLIFE MILAN · MAGISTER MIDA LLC · CHECKOUT (+15% FEE)
        </p>
        <h1 className="mt-2 font-serif text-3xl font-bold text-[#F6F1E7] sm:text-4xl">
          {copy.checkoutTitle}
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#C2B9AA]">
          {copy.checkoutSubtitle}
        </p>

        {/* 2-Step Progress Strip */}
        <div className="mt-5 flex flex-wrap gap-3 font-mono text-xs">
          <span
            className={`px-3 py-1.5 font-bold ${
              !paymentSession ? 'bg-[#F6F1E7] text-[#050505]' : 'border border-[#F6F1E7]/25 text-[#C2B9AA]'
            }`}
          >
            {copy.stepDetailsLabel}
          </span>
          <span
            className={`px-3 py-1.5 font-bold ${
              paymentSession ? 'bg-[#F6F1E7] text-[#050505]' : 'border border-[#F6F1E7]/25 text-[#C2B9AA]'
            }`}
          >
            {copy.stepPaymentLabel}
          </span>
        </div>

        {(cancelled || resumeOrderId) && (
          <div className="mt-4 border border-amber-400/40 bg-amber-950/30 p-4 text-sm text-amber-200">
            {cancelled
              ? isIt
                ? `Pagamento annullato per l’ordine ${resumeOrderId || ''}. Puoi completarlo subito qui sotto.`
                : `Payment was cancelled for order ${resumeOrderId || ''}. You can complete it below.`
              : isIt
                ? `Riprendi il pagamento sicuro direttamente su Nightlife Milan per l’ordine ${resumeOrderId}.`
                : `Completing on-site secure payment for order ${resumeOrderId}.`}
          </div>
        )}
      </div>

      {paymentSession ? (
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <EmbeddedPaymentForm
              publishableKey={paymentSession.publishableKey}
              clientSecret={paymentSession.clientSecret}
              orderId={paymentSession.orderId}
              locale={locale}
              fullName={paymentSession.fullName}
              email={paymentSession.email}
              phone={paymentSession.phone}
              billingTotalDisplay={formatMinorCurrency(
                paymentSession.presentmentTotalMinor,
                paymentSession.presentmentCurrency,
                locale,
              )}
              eurTotalDisplay={formatEurFromCents(paymentSession.totalEurCents, locale)}
              showEurReference={paymentSession.presentmentCurrency !== 'EUR'}
              onBack={resumeOrderId ? undefined : () => setPaymentSession(null)}
              clearCart={clearCart}
            />
          </div>
          <aside className="lg:col-span-5">
            <div className="border border-[#F6F1E7]/20 bg-[#0B0A09] p-6 space-y-4">
              <h2 className="font-serif text-xl font-bold text-[#F6F1E7]">
                {copy.orderIdLabel}: {paymentSession.orderId}
              </h2>
              <div className="space-y-1 text-xs text-[#C2B9AA]">
                <p>
                  <strong className="text-[#F6F1E7]">{paymentSession.fullName}</strong>
                </p>
                <p>{paymentSession.email}</p>
                <p className="font-mono">{paymentSession.phone}</p>
              </div>
              <div className="border-t border-[#F6F1E7]/12 pt-3 text-sm space-y-1.5">
                <div className="flex justify-between font-mono text-[#EAE3D5]">
                  <span>{copy.eurOriginalLabel}</span>
                  <span>{formatEurFromCents(paymentSession.totalEurCents, locale)}</span>
                </div>
                <div className="flex justify-between font-mono text-base font-bold text-[#C9A84C]">
                  <span>{paymentSession.presentmentCurrency}</span>
                  <span>
                    {formatMinorCurrency(
                      paymentSession.presentmentTotalMinor,
                      paymentSession.presentmentCurrency,
                      locale,
                    )}
                  </span>
                </div>
                {paymentSession.presentmentCurrency !== 'EUR' && (
                  <p className="text-right font-mono text-[11px] text-[#8E8577]">
                    FX: 1 EUR = {paymentSession.fxRate.toFixed(4)} {paymentSession.presentmentCurrency}
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>
      ) : items.length === 0 ? (
        <div className="border border-[#F6F1E7]/16 bg-[#0B0A09] p-10 text-center">
          <ShoppingBag className="mx-auto h-10 w-10 text-[#EAE3D5]" />
          <h2 className="mt-4 font-serif text-2xl font-bold text-[#F6F1E7]">{copy.drawerEmptyTitle}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#C2B9AA]">{copy.drawerEmptyBody}</p>
          <Link
            href={`${lp}/single-pass`}
            locale={locale}
            className="mt-6 inline-flex min-h-[46px] items-center justify-center bg-[#F6F1E7] px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-[#050505]"
          >
            {copy.drawerExploreCta}
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-12">
          <form onSubmit={handleInitPayment} className="space-y-6 lg:col-span-7">
            {/* Compact Selected Items Recap */}
            <div className="space-y-3">
              {items.map((item) => {
                const sku = resolveCatalogSku(item.skuId);
                if (!sku) return null;
                const venue = VENUE_BY_ID[sku.venueId];
                const venueName = sku.venueNameOverride || venue?.name || 'Nightlife Milan';
                const p = computeSinglePassPrice(sku.basePriceCents, item.quantity);

                return (
                  <div
                    key={item.skuId}
                    className="flex flex-wrap items-center justify-between gap-3 border border-[#F6F1E7]/16 bg-[#0B0A09] p-4"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#C9A84C]">
                        {venueName} · {sku.arrivalTime} · {(sku.guestsPerUnit || 1) * item.quantity} pax
                      </p>
                      <h2 className="font-serif text-base font-bold text-[#F6F1E7]">
                        {isIt ? sku.titleIt : sku.titleEn}
                      </h2>
                      {sku.requiresDietary && (
                        <select
                          aria-label={copy.formDietary}
                          value={item.dietaryChoice || 'Terra / Meat Menu'}
                          onChange={(e) => updateDietary(item.skuId, e.target.value)}
                          className="mt-2 h-8 border border-[#F6F1E7]/20 bg-[#050505] px-2 text-xs text-[#F6F1E7]"
                        >
                          <option value="Terra / Meat Menu">Menù di Terra / Meat</option>
                          <option value="Mare / Seafood Menu">Menù di Mare / Seafood</option>
                          <option value="Vegetarian / Vegan">Vegetariano / Vegano</option>
                          <option value="Gluten-Free / Allergies">Senza Glutine</option>
                        </select>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="inline-flex items-center border border-[#F6F1E7]/20 bg-[#050505]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.skuId, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center hover:bg-white/10"
                          aria-label="Decrease"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[2rem] text-center font-mono text-xs font-bold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.skuId, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center hover:bg-white/10"
                          aria-label="Increase"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="min-w-[76px] text-right font-mono text-sm font-bold text-[#F6F1E7]">
                        {formatEurFromCents(p.lineTotalCents, locale)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeItem(item.skuId)}
                        aria-label={copy.removeItemLabel}
                        className="text-[#8E8577] hover:text-rose-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Guest Registration & Contact Fields */}
            <div className="space-y-4 border border-[#F6F1E7]/16 bg-[#0B0A09] p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="sp-full-name" className="block text-xs font-bold text-[#EAE3D5]">
                    {copy.formFullName} *
                  </label>
                  <input
                    id="sp-full-name"
                    required
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Marco Rossi"
                    className="mt-1.5 h-11 w-full border border-[#F6F1E7]/25 bg-[#050505] px-3 text-sm text-[#F6F1E7]"
                  />
                </div>
                <div>
                  <label htmlFor="sp-age" className="block text-xs font-bold text-[#EAE3D5]">
                    {copy.formAge} *
                  </label>
                  <input
                    id="sp-age"
                    required
                    type="number"
                    min={18}
                    max={99}
                    value={ageRaw}
                    onChange={(e) => setAgeRaw(e.target.value)}
                    placeholder="28"
                    className="mt-1.5 h-11 w-full border border-[#F6F1E7]/25 bg-[#050505] px-3 text-sm text-[#F6F1E7]"
                  />
                </div>
              </div>

              {liveAgeCheck && !liveAgeCheck.ok && (
                <div className="flex items-start gap-2.5 border border-rose-500/50 bg-rose-950/40 p-3.5 text-xs text-rose-200">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    {liveAgeCheck.errorCode === 'PINETA_STRICT_UNDER_30'
                      ? copy.pinetaUnder30Error
                      : copy.under18Error}
                  </span>
                </div>
              )}
              {liveAgeCheck?.ok && liveAgeCheck.advisoryCode === 'RECOMMEND_BISCHERI_50_PLUS' && (
                <div className="border border-amber-400/40 bg-amber-950/30 p-3 text-xs text-amber-200">
                  {copy.bischeriAdvisory}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="sp-whatsapp" className="block text-xs font-bold text-[#EAE3D5]">
                    {copy.formWhatsapp} *
                  </label>
                  <input
                    id="sp-whatsapp"
                    required
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+39 340 123 4567"
                    className="mt-1.5 h-11 w-full border border-[#F6F1E7]/25 bg-[#050505] px-3 text-sm text-[#F6F1E7]"
                  />
                  <p className="mt-1 text-[11px] text-[#8E8577]">{copy.formWhatsappHint}</p>
                </div>
                <div>
                  <label htmlFor="sp-email" className="block text-xs font-bold text-[#EAE3D5]">
                    {copy.formEmail} *
                  </label>
                  <input
                    id="sp-email"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nome@email.com"
                    className="mt-1.5 h-11 w-full border border-[#F6F1E7]/25 bg-[#050505] px-3 text-sm text-[#F6F1E7]"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="sp-country" className="block text-xs font-bold text-[#EAE3D5]">
                    {copy.formCountry} *
                  </label>
                  <input
                    id="sp-country"
                    required
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Italia / USA / UK..."
                    className="mt-1.5 h-11 w-full border border-[#F6F1E7]/25 bg-[#050505] px-3 text-sm text-[#F6F1E7]"
                  />
                </div>
                <div>
                  <label htmlFor="sp-currency" className="block text-xs font-bold text-[#EAE3D5]">
                    {copy.currencySelectorLabel}
                  </label>
                  <select
                    id="sp-currency"
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
                </div>
              </div>

              {!isSignedIn && (
                <div className="border border-[#F6F1E7]/15 bg-[#12100E] p-4 space-y-3">
                  <label className="flex items-center gap-2.5 text-xs font-bold text-[#F6F1E7] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={createAccount}
                      onChange={(e) => setCreateAccount(e.target.checked)}
                    />
                    <span>{copy.formCreateAccountToggle}</span>
                  </label>
                  {createAccount && (
                    <div>
                      <label htmlFor="sp-password" className="block text-xs font-bold text-[#EAE3D5]">
                        {copy.formPassword}
                      </label>
                      <input
                        id="sp-password"
                        type="password"
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min. 8 caratteri"
                        className="mt-1.5 h-11 w-full border border-[#F6F1E7]/25 bg-[#050505] px-3 text-sm text-[#F6F1E7]"
                      />
                      <p className="mt-1 text-[11px] text-[#8E8577]">{copy.formPasswordHint}</p>
                    </div>
                  )}
                </div>
              )}

              <div>
                <span className="block text-xs font-bold text-[#EAE3D5]">{copy.formLanguages}</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {SPOKEN_LANGUAGE_OPTIONS.map((langOption) => {
                    const active = spokenLanguages.includes(langOption);
                    return (
                      <button
                        key={langOption}
                        type="button"
                        onClick={() => toggleLanguage(langOption)}
                        className={`min-h-[34px] border px-3 py-1 text-xs font-semibold transition ${
                          active
                            ? 'border-[#F6F1E7] bg-[#F6F1E7] text-[#050505]'
                            : 'border-[#F6F1E7]/25 bg-[#050505] text-[#C2B9AA]'
                        }`}
                      >
                        {langOption}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="sp-notes" className="block text-xs font-bold text-[#EAE3D5]">
                  {copy.formDietary}
                </label>
                <textarea
                  id="sp-notes"
                  rows={2}
                  value={dietaryNotes}
                  onChange={(e) => setDietaryNotes(e.target.value)}
                  className="mt-1.5 w-full border border-[#F6F1E7]/25 bg-[#050505] p-3 text-sm text-[#F6F1E7]"
                />
              </div>

              <div className="space-y-2 border-t border-[#F6F1E7]/12 pt-4">
                <label className="flex items-start gap-3 text-xs leading-relaxed text-[#C2B9AA] cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 accent-[#F6F1E7]"
                  />
                  <span>{copy.formTermsLabel}</span>
                </label>
                <div className="flex flex-wrap gap-4 pl-7 text-[11px] font-semibold text-[#C9A84C]">
                  <Link href={`${lp}/terms`} locale={locale} className="underline">
                    {copy.termsPolicyLabel}
                  </Link>
                  <Link href={`${lp}/privacy`} locale={locale} className="underline">
                    {copy.privacyPolicyLabel}
                  </Link>
                  <Link href={`${lp}/refund-policy`} locale={locale} className="underline">
                    {copy.refundPolicyLabel}
                  </Link>
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="border border-rose-500/50 bg-rose-950/40 p-4 text-sm text-rose-200">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || Boolean(liveAgeCheck && !liveAgeCheck.ok)}
              className="flex min-h-[52px] w-full items-center justify-center gap-2 bg-[#F6F1E7] px-5 py-3.5 text-xs font-extrabold uppercase tracking-widest text-[#050505] transition hover:bg-[#EAE3D5] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Lock className="h-4 w-4" aria-hidden="true" />
              <span>{submitting ? copy.paymentProcessingLabel : copy.formPayNowCta}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>

          {/* Right Summary Card */}
          <aside className="lg:col-span-5">
            <div className="sticky top-24 space-y-5 border border-[#F6F1E7]/20 bg-[#0B0A09] p-6">
              <h2 className="font-serif text-2xl font-bold text-[#F6F1E7]">
                {isIt ? 'Riepilogo & Cambio Valuta Live' : 'Live Currency Order Summary'}
              </h2>
              <div className="space-y-2.5 text-sm">
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
                <div className="flex justify-between border-t border-[#F6F1E7]/15 pt-2.5 text-base font-bold text-[#F6F1E7]">
                  <span>{copy.totalLabel} (EUR)</span>
                  <span className="font-mono">{formatEurFromCents(grandTotalCents, locale)}</span>
                </div>
                {currency !== 'EUR' && (
                  <div className="space-y-1 bg-[#141210] p-3">
                    <div className="flex justify-between text-base font-extrabold text-[#C9A84C]">
                      <span>
                        {copy.chargedInCurrencyLabel} ({currency})
                      </span>
                      <span className="font-mono">
                        {formatMinorCurrency(convertedTotalMinor, currency, locale)}
                      </span>
                    </div>
                    <p className="text-right font-mono text-[11px] text-[#8E8577]">
                      1 EUR = {currentFxRate.toFixed(4)} {currency}
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t border-[#F6F1E7]/12 pt-4 text-xs text-[#C2B9AA] space-y-2">
                <p className="flex items-center gap-2 font-semibold text-[#F6F1E7]">
                  <ShieldCheck className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
                  nightlifemilan.com · Magister Mida LLC
                </p>
                <p>{copy.fxRateNotice}</p>
              </div>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
