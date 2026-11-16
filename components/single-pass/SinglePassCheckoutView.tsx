'use client';

import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CreditCard,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
} from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { localePrefix } from '@/lib/i18n/locales';
import {
  SKU_BY_ID,
  SPOKEN_LANGUAGE_OPTIONS,
  VENUE_BY_ID,
  computeSinglePassPrice,
  formatEurFromCents,
  validateAgeForSkus,
} from '@/lib/single-pass/catalog';
import { getSinglePassCopy } from '@/lib/single-pass/i18n35';
import type { SinglePassSku } from '@/lib/single-pass/types';
import { useSinglePassCart } from './SinglePassCartContext';

export default function SinglePassCheckoutView({
  locale,
  cancelledOrderId,
}: {
  locale: string;
  cancelledOrderId?: string;
}) {
  const {
    items,
    updateQuantity,
    updateDietary,
    removeItem,
    subtotalBaseCents,
    totalFeeCents,
    grandTotalCents,
    mounted,
  } = useSinglePassCart();

  const copy = getSinglePassCopy(locale);
  const lp = localePrefix(locale);
  const isIt = locale === 'it';

  const [fullName, setFullName] = useState('');
  const [ageRaw, setAgeRaw] = useState('');
  const [whatsapp, setWhatsapp] = useState('+39 ');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [spokenLanguages, setSpokenLanguages] = useState<string[]>([
    locale === 'it' ? 'Italiano' : 'English',
  ]);
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const parsedAge = Number(ageRaw);
  const cartSkus = useMemo(() => {
    return items
      .map((item) => SKU_BY_ID.get(item.skuId))
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

  const handleSubmit = async (e: React.FormEvent) => {
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

    setSubmitting(true);
    try {
      const res = await fetch('/api/single-pass/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locale,
          items,
          acceptedTerms,
          password: password.trim() || undefined,
          customer: {
            fullName: fullName.trim(),
            email: email.trim(),
            whatsapp: whatsapp.trim(),
            age: Number(ageRaw),
            spokenLanguages,
            dietaryNotes: dietaryNotes.trim() || undefined,
          },
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        redirectUrl?: string;
        checkoutUrl?: string | null;
      };
      if (!res.ok || !data.ok) {
        setErrorMessage(data.error || 'Unable to create Stripe checkout session.');
        setSubmitting(false);
        return;
      }
      const targetUrl = data.checkoutUrl || data.redirectUrl || `${lp}/account`;
      window.location.assign(targetUrl);
    } catch {
      setErrorMessage(
        isIt
          ? 'Errore di connessione durante il checkout. Riprova oppure scrivi su WhatsApp +39 351 912 7047.'
          : 'Connection error while creating checkout. Please try again or contact WhatsApp +39 351 912 7047.',
      );
      setSubmitting(false);
    }
  };

  if (!mounted) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 text-center font-mono text-xs uppercase tracking-widest text-[#C2B9AA]">
        Loading Cart...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-[#F6F1E7]/15 pb-6">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#EAE3D5]">
          NIGHTLIFE MILAN · STRIPE CHECKOUT (+15% FEE)
        </p>
        <h1 className="mt-2 font-serif text-3xl font-bold text-[#F6F1E7] sm:text-4xl">
          {copy.checkoutTitle}
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#C2B9AA]">
          {copy.checkoutSubtitle}
        </p>
      </div>

      {cancelledOrderId && (
        <div className="mb-6 border border-[#EAE3D5]/40 bg-[#0B0A09] p-4 text-sm text-[#EAE3D5]">
          {isIt
            ? `Pagamento Stripe interrotto per ordine ${cancelledOrderId}. Puoi completarlo ora oppure dalla tua Area Riservata.`
            : `Stripe payment cancelled for order ${cancelledOrderId}. You can retry below or from your Reserved Area.`}
        </div>
      )}

      {items.length === 0 ? (
        <div className="border border-[#F6F1E7]/20 bg-[#0B0A09] p-10 text-center">
          <ShoppingBag className="mx-auto h-10 w-10 text-[#EAE3D5]" aria-hidden="true" />
          <h2 className="mt-4 font-serif text-2xl font-bold text-[#F6F1E7]">{copy.drawerEmptyTitle}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#C2B9AA]">{copy.drawerEmptyBody}</p>
          <Link
            href={`${lp}/single-pass`}
            locale={locale}
            className="mt-6 inline-flex min-h-[46px] items-center justify-center bg-[#F6F1E7] px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-[#050505] hover:bg-[#EAE3D5]"
          >
            {copy.drawerExploreCta}
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <div className="space-y-8">
            {/* Cart Items List */}
            <section className="border border-[#F6F1E7]/16 bg-[#0B0A09] p-6">
              <div className="flex items-center justify-between border-b border-[#F6F1E7]/12 pb-4">
                <h2 className="font-serif text-xl font-bold text-[#F6F1E7]">{copy.drawerTitle}</h2>
                <Link
                  href={`${lp}/single-pass`}
                  locale={locale}
                  className="text-xs font-bold uppercase tracking-wider text-[#EAE3D5] hover:underline"
                >
                  + {copy.filterAllVenues}
                </Link>
              </div>
              <div className="mt-4 divide-y divide-[#F6F1E7]/12">
                {items.map((item) => {
                  const sku = SKU_BY_ID.get(item.skuId);
                  if (!sku) return null;
                  const venue = VENUE_BY_ID[sku.venueId];
                  const p = computeSinglePassPrice(sku.basePriceCents, item.quantity);

                  return (
                    <div key={item.skuId} className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center">
                      <img
                        src={venue.posterSrc}
                        alt={venue.name}
                        className="h-20 w-20 shrink-0 border border-[#F6F1E7]/15 bg-[#050505] object-contain"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#EAE3D5]">
                          {venue.name} · {isIt ? venue.ageBandLabelIt : venue.ageBandLabelEn}
                        </p>
                        <p className="mt-1 font-serif text-lg font-bold text-[#F6F1E7]">
                          {isIt ? sku.titleIt : sku.titleEn}
                        </p>
                        <p className="mt-1 font-mono text-xs text-[#C2B9AA]">
                          {formatEurFromCents(p.unitBaseCents, locale)} + {formatEurFromCents(p.unitFeeCents, locale)} (+15%)
                        </p>
                        {sku.requiresDietary && !sku.dietaryPreset && (
                          <select
                            value={item.dietaryChoice || ''}
                            onChange={(e) => updateDietary(item.skuId, e.target.value)}
                            className="mt-2 h-8 border border-[#F6F1E7]/25 bg-[#050505] px-2 text-xs text-[#F6F1E7]"
                          >
                            <option value="">Standard Gala Menu</option>
                            <option value="Terra">Preferenza Terra</option>
                            <option value="Mare">Preferenza Mare</option>
                            <option value="Vegetariano">Vegetariano / Allergie</option>
                          </select>
                        )}
                      </div>
                      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                        <div className="inline-flex items-center border border-[#F6F1E7]/20 bg-[#050505]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.skuId, item.quantity - 1)}
                            className="flex h-9 w-9 items-center justify-center text-[#F6F1E7] hover:bg-white/10"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-[2.2rem] text-center font-mono text-xs font-bold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.skuId, item.quantity + 1)}
                            className="flex h-9 w-9 items-center justify-center text-[#F6F1E7] hover:bg-white/10"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-base font-bold text-[#F6F1E7]">
                            {formatEurFromCents(p.lineTotalCents, locale)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeItem(item.skuId)}
                            aria-label={copy.removeItemLabel}
                            className="p-1.5 text-[#847C6F] hover:text-rose-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Attendee & Reserved Area Profile Form (#F6F1E7 crisp form contrast) */}
            <section className="border border-[#050505]/15 bg-[#F6F1E7] p-6 text-[#050505] sm:p-8">
              <h2 className="font-serif text-2xl font-bold text-[#050505]">
                {isIt ? 'Dati Partecipante e Area Riservata' : 'Attendee & Reserved Area Profile'}
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-bold text-[#24201B]">
                  {copy.formFullName} *
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Mario Rossi"
                    className="mt-1.5 h-11 w-full border border-[#050505]/30 bg-white px-3 text-sm text-[#050505]"
                  />
                </label>

                <label className="text-xs font-bold text-[#24201B]">
                  {copy.formAge} *
                  <input
                    type="number"
                    required
                    min={18}
                    max={99}
                    value={ageRaw}
                    onChange={(e) => setAgeRaw(e.target.value)}
                    placeholder="34"
                    className="mt-1.5 h-11 w-full border border-[#050505]/30 bg-white px-3 text-sm text-[#050505]"
                  />
                </label>

                <label className="text-xs font-bold text-[#24201B]">
                  {copy.formWhatsapp} *
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+39 347 000 0000"
                    className="mt-1.5 h-11 w-full border border-[#050505]/30 bg-white px-3 text-sm text-[#050505]"
                  />
                  <span className="mt-1 block text-[11px] font-normal text-[#3D3830]">
                    {copy.formWhatsappHint}
                  </span>
                </label>

                <label className="text-xs font-bold text-[#24201B]">
                  {copy.formEmail} *
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nome@email.com"
                    className="mt-1.5 h-11 w-full border border-[#050505]/30 bg-white px-3 text-sm text-[#050505]"
                  />
                </label>

                <label className="text-xs font-bold text-[#24201B] sm:col-span-2">
                  {copy.formPassword}
                  <input
                    type="password"
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimo 8 caratteri per accedere all’Area Riservata"
                    className="mt-1.5 h-11 w-full border border-[#050505]/30 bg-white px-3 text-sm text-[#050505]"
                  />
                  <span className="mt-1 block text-[11px] font-normal text-[#3D3830]">
                    {copy.formPasswordHint}
                  </span>
                </label>
              </div>

              {/* Spoken Languages Picker */}
              <div className="mt-5">
                <p className="text-xs font-bold text-[#24201B]">{copy.formLanguages}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {SPOKEN_LANGUAGE_OPTIONS.map((langOpt) => {
                    const active = spokenLanguages.includes(langOpt);
                    return (
                      <button
                        key={langOpt}
                        type="button"
                        onClick={() => toggleLanguage(langOpt)}
                        className={`border px-3 py-1.5 text-xs font-semibold transition ${
                          active
                            ? 'border-[#050505] bg-[#050505] text-[#F6F1E7]'
                            : 'border-[#050505]/25 bg-white text-[#24201B] hover:border-[#050505]'
                        }`}
                      >
                        {langOpt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="mt-5 block text-xs font-bold text-[#24201B]">
                {copy.formDietary}
                <textarea
                  rows={2}
                  value={dietaryNotes}
                  onChange={(e) => setDietaryNotes(e.target.value)}
                  className="mt-1.5 w-full border border-[#050505]/30 bg-white p-3 text-sm text-[#050505]"
                />
              </label>

              {/* Age Rule Live Warnings / Blocks */}
              {liveAgeCheck && !liveAgeCheck.ok && (
                <div role="alert" className="mt-5 border-2 border-rose-700 bg-rose-50 p-4 text-rose-950">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-700" aria-hidden="true" />
                    <div className="text-xs leading-relaxed">
                      <p className="font-bold">
                        {liveAgeCheck.errorCode === 'PINETA_STRICT_UNDER_30'
                          ? copy.pinetaUnder30Error
                          : copy.under18Error}
                      </p>
                      {liveAgeCheck.suggestedVenueIds.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {liveAgeCheck.suggestedVenueIds.map((vid) => (
                            <Link
                              key={vid}
                              href={`${lp}/single-pass#single-pass-${vid}`}
                              locale={locale}
                              className="border border-rose-800 bg-white px-2.5 py-1 font-bold text-rose-900 hover:bg-rose-100"
                            >
                              {VENUE_BY_ID[vid].name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {liveAgeCheck?.ok && liveAgeCheck.advisoryCode === 'RECOMMEND_BISCHERI_50_PLUS' && (
                <div className="mt-4 border border-[#050505]/30 bg-[#EFE9DC] p-3 text-xs text-[#24201B]">
                  {copy.bischeriAdvisory}{' '}
                  <Link href={`${lp}/single-pass#single-pass-bischeri`} locale={locale} className="font-bold underline">
                    Bischeri Milano Over 50
                  </Link>
                </div>
              )}
            </section>
          </div>

          {/* Right Column: Sticky Order Summary & Stripe Submit */}
          <aside className="h-fit border border-[#F6F1E7]/20 bg-[#0B0A09] p-6 lg:sticky lg:top-24">
            <h2 className="font-serif text-2xl font-bold text-[#F6F1E7]">
              {isIt ? 'Riepilogo Ordine Stripe' : 'Stripe Order Summary'}
            </h2>
            <div className="mt-5 space-y-3 border-b border-[#F6F1E7]/15 pb-5 text-sm">
              <div className="flex justify-between text-[#C2B9AA]">
                <span>{copy.drawerSubtotalLabel}</span>
                <span className="font-mono">{formatEurFromCents(subtotalBaseCents, locale)}</span>
              </div>
              <div className="flex justify-between text-[#EAE3D5]">
                <span>{copy.feeLabel}</span>
                <span className="font-mono">+{formatEurFromCents(totalFeeCents, locale)}</span>
              </div>
              <div className="flex items-baseline justify-between pt-2 text-xl font-bold text-[#F6F1E7]">
                <span>{copy.totalLabel}</span>
                <span className="font-mono">{formatEurFromCents(grandTotalCents, locale)}</span>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-xs leading-relaxed text-[#C2B9AA]">
              <p className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#EAE3D5]" aria-hidden="true" />
                <span>{copy.trustEqualPrice}</span>
              </p>
              <p className="flex items-start gap-2">
                <CreditCard className="mt-0.5 h-4 w-4 shrink-0 text-[#EAE3D5]" aria-hidden="true" />
                <span>{copy.trustWhatsAppDate}</span>
              </p>
            </div>

            <label className="mt-5 flex items-start gap-2.5 border border-[#F6F1E7]/15 bg-[#050505] p-3 text-xs leading-relaxed text-[#EAE3D5]">
              <input
                type="checkbox"
                required
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-[#F6F1E7]"
              />
              <span>{copy.formTermsLabel}</span>
            </label>

            {errorMessage && (
              <div role="alert" className="mt-4 border border-rose-400/50 bg-rose-950/50 p-3 text-xs text-rose-200">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || (liveAgeCheck !== null && !liveAgeCheck.ok)}
              className="mt-5 flex min-h-[52px] w-full items-center justify-center gap-2 bg-[#F6F1E7] px-5 py-3 text-xs font-extrabold uppercase tracking-widest text-[#050505] transition hover:bg-[#EAE3D5] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? (isIt ? 'Creazione sessione Stripe...' : 'Connecting to Stripe...') : copy.formPayStripeCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <p className="mt-3 text-center font-mono text-[11px] text-[#847C6F]">
              Powered by Stripe · Concierge +39 351 912 7047
            </p>
          </aside>
        </form>
      )}
    </div>
  );
}
