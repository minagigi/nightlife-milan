'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Check,
  Info,
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
  getSkuFeeRate,
  resolveCatalogSku,
  validateAgeForSkus,
} from '@/lib/single-pass/catalog';
import { formatMinorCurrency, type SupportedCurrency } from '@/lib/single-pass/currency';
import {
  formatFeeLabel35,
  getCheckoutUxCopy,
  getSinglePassCopy,
  getTerrazzaCheckoutUi35,
} from '@/lib/single-pass/i18n35';
import type {
  CheckoutFieldKey,
  SinglePassApiErrorCode,
  SinglePassSku,
  SinglePassVenueId,
} from '@/lib/single-pass/types';
import { readClientAttribution } from './AttributionTracker';
import EmbeddedPaymentForm from './EmbeddedPaymentForm';
import { useSinglePassCart } from './SinglePassCartContext';

type PaymentIntentSession = {
  orderId: string;
  publishableKey: string;
  clientSecret: string;
  presentmentCurrency: string;
  presentmentTotalMinor: number;
  subtotalBaseCents: number;
  feeCents: number;
  feeRate: number;
  hasMixedFeeRates: boolean;
  totalEurCents: number;
  fxRate: number;
  fullName: string;
  email: string;
  phone: string;
};

type SummaryErrorItem = {
  field: CheckoutFieldKey | 'general';
  label: string;
  message: string;
};

const FIELD_DOM_IDS: Record<CheckoutFieldKey, string> = {
  fullName: 'sp-full-name',
  age: 'sp-age',
  country: 'sp-country',
  whatsapp: 'sp-whatsapp',
  email: 'sp-email',
  password: 'sp-password',
  acceptedTerms: 'sp-terms',
  cart: 'sp-cart-items',
};

const ORDERED_FIELDS: CheckoutFieldKey[] = [
  'cart',
  'fullName',
  'age',
  'country',
  'whatsapp',
  'email',
  'password',
  'acceptedTerms',
];

function isEmailValidClient(raw: string): boolean {
  const email = raw.trim();
  return email.length >= 5 && email.length <= 200 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function isWhatsappValidClient(raw: string): boolean {
  const digits = raw.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 18;
}

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
    effectiveFeeRate,
    hasMixedFeeRates,
    hasTerrazzaDuomo21,
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
  const terrazzaUi = getTerrazzaCheckoutUi35(locale);
  const lp = localePrefix(locale);
  const isIt = locale === 'it';

  const errorSummaryRef = useRef<HTMLDivElement | null>(null);
  const submittingRef = useRef(false);

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [fullName, setFullName] = useState('');
  const [ageRaw, setAgeRaw] = useState('');
  const [country, setCountry] = useState(isIt ? 'Italia' : '');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [createAccount, setCreateAccount] = useState(false);
  const [password, setPassword] = useState('');
  const [spokenLanguages, setSpokenLanguages] = useState<string[]>([
    locale === 'it' ? 'Italiano' : 'English',
  ]);
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<Partial<Record<CheckoutFieldKey, string>>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [suggestedVenues, setSuggestedVenues] = useState<SinglePassVenueId[]>([]);
  const [submittedOnce, setSubmittedOnce] = useState(false);
  const [paymentSession, setPaymentSession] = useState<PaymentIntentSession | null>(null);

  const activeFeeRate = paymentSession ? paymentSession.feeRate : effectiveFeeRate;
  const activeMixed = paymentSession ? paymentSession.hasMixedFeeRates : hasMixedFeeRates;
  const feeLabel = formatFeeLabel35(locale, activeFeeRate, activeMixed);
  const headerFeeTag = activeMixed
    ? 'BOOKING FEE 20%'
    : Math.round(activeFeeRate * 100) > 0
      ? `BOOKING FEE ${Math.round(activeFeeRate * 100)}%`
      : 'OFFICIAL PARTNER DIRECT';

  useEffect(() => {
    fetch('/api/single-pass/me', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.ok && d?.member) {
          setIsSignedIn(true);
          setCreateAccount(false);
          setFullName((prev) => prev || d.member.fullName || '');
          setEmail((prev) => prev || d.member.email || '');
          setWhatsapp((prev) => prev || d.member.whatsapp || '');
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
              items?: Array<{ feeRate?: number }>;
              customer?: { fullName?: string; email?: string; whatsapp?: string };
            })
          | null;
        if (!res.ok || !data?.ok || !data.clientSecret) {
          setGeneralError(
            data?.error ||
              (isIt
                ? 'Impossibile riprendere il pagamento ora. Accedi oppure verifica il tuo ordine in Area Riservata.'
                : 'Unable to resume payment right now. Sign in or open your Reserved Area.'),
          );
          return;
        }
        const itemRates = new Set(
          (data.items || [])
            .map((it) => it.feeRate)
            .filter((r): r is number => typeof r === 'number'),
        );
        const resumedFeeRate =
          typeof data.feeRate === 'number'
            ? data.feeRate
            : itemRates.size === 1
              ? Array.from(itemRates)[0]
              : 0.2;
        const resumedFeeCents =
          typeof data.feeCents === 'number'
            ? data.feeCents
            : Math.round(data.totalEurCents - data.totalEurCents / (1 + resumedFeeRate));
        const resumedSubtotalBaseCents =
          typeof data.subtotalBaseCents === 'number'
            ? data.subtotalBaseCents
            : Math.max(0, data.totalEurCents - resumedFeeCents);
        setPaymentSession({
          orderId: data.orderId,
          publishableKey: data.publishableKey,
          clientSecret: data.clientSecret,
          presentmentCurrency: data.presentmentCurrency || 'EUR',
          presentmentTotalMinor: data.presentmentTotalMinor,
          subtotalBaseCents: resumedSubtotalBaseCents,
          feeCents: resumedFeeCents,
          feeRate: resumedFeeRate,
          hasMixedFeeRates: itemRates.size > 1,
          totalEurCents: data.totalEurCents,
          fxRate: data.fxRate || 1,
          fullName: data.customer?.fullName || fullName,
          email: data.customer?.email || email,
          phone: data.customer?.whatsapp || whatsapp,
        });
      })
      .catch(() => {
        setGeneralError(uxCopy.errNetwork);
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

  const toggleAllergyChip = (chipLabel: string) => {
    const clean = dietaryNotes.trim();
    if (chipLabel === uxCopy.allergyChips[0]) {
      setDietaryNotes(clean === chipLabel ? '' : chipLabel);
      return;
    }
    const parts = clean
      .split(',')
      .map((s) => s.trim())
      .filter((s) => Boolean(s) && s !== uxCopy.allergyChips[0] && s !== terrazzaUi.noAllergiesQuickFill);
    const exists = parts.includes(chipLabel);
    const next = exists ? parts.filter((s) => s !== chipLabel) : [...parts, chipLabel];
    setDietaryNotes(next.join(', '));
  };

  const mapApiCodeToMessage = (code?: SinglePassApiErrorCode | string): string => {
    switch (code) {
      case 'INVALID_FULL_NAME':
        return uxCopy.errFullName;
      case 'UNDER_18':
        return uxCopy.errUnder18;
      case 'UNDER_21_JUSTME':
        return uxCopy.errUnder21Justme;
      case 'PINETA_STRICT_UNDER_30':
        return uxCopy.errPinetaUnder30;
      case 'INVALID_COUNTRY':
        return uxCopy.errCountry;
      case 'INVALID_WHATSAPP':
        return uxCopy.errWhatsapp;
      case 'INVALID_EMAIL':
        return uxCopy.errEmail;
      case 'INVALID_PASSWORD':
        return uxCopy.errPasswordShort;
      case 'INVALID_CREDENTIALS':
        return uxCopy.errInvalidCredentials;
      case 'TERMS_REQUIRED':
        return uxCopy.errTermsRequired;
      case 'TABLE_REQUIRES_FORMULA':
        return terrazzaUi.tableRequiresFormulaError || uxCopy.errTableRequiresFormula;
      case 'TABLE_MAX_GUESTS_EXCEEDED':
        return terrazzaUi.tableMaxGuestsExceededError || uxCopy.errTableMaxGuests;
      case 'EMPTY_CART':
        return uxCopy.errEmptyCart;
      case 'PAYMENT_SESSION_ERROR':
        return uxCopy.errPaymentSession;
      default:
        return uxCopy.errPaymentSession;
    }
  };

  const clearFieldError = (field: CheckoutFieldKey) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const jumpToField = (field: CheckoutFieldKey | 'general') => {
    if (field === 'general') {
      errorSummaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      errorSummaryRef.current?.focus();
      return;
    }
    const targetId = FIELD_DOM_IDS[field];
    const el = typeof document !== 'undefined' ? document.getElementById(targetId) : null;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (typeof (el as HTMLElement).focus === 'function') {
        (el as HTMLElement).focus();
      }
    }
  };

  const focusSummaryBanner = () => {
    setTimeout(() => {
      errorSummaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      errorSummaryRef.current?.focus();
    }, 30);
  };

  const getFieldDisplayLabel = (field: CheckoutFieldKey): string => {
    switch (field) {
      case 'fullName':
        return uxCopy.fieldLabelFullName;
      case 'age':
        return uxCopy.fieldLabelAge;
      case 'country':
        return uxCopy.fieldLabelCountry;
      case 'whatsapp':
        return uxCopy.fieldLabelWhatsapp;
      case 'email':
        return uxCopy.fieldLabelEmail;
      case 'password':
        return uxCopy.fieldLabelPassword;
      case 'acceptedTerms':
        return uxCopy.fieldLabelTerms;
      case 'cart':
        return uxCopy.fieldLabelCart;
    }
  };

  const validateClientFields = (): {
    errors: Partial<Record<CheckoutFieldKey, string>>;
    venues: SinglePassVenueId[];
  } => {
    const errors: Partial<Record<CheckoutFieldKey, string>> = {};
    let venues: SinglePassVenueId[] = [];

    if (!cartValidation.ok) {
      errors.cart =
        cartValidation.errorCode === 'TABLE_REQUIRES_FORMULA'
          ? terrazzaUi.tableRequiresFormulaError
          : terrazzaUi.tableMaxGuestsExceededError;
    }
    if (fullName.trim().length < 2) {
      errors.fullName = uxCopy.errFullName;
    }
    if (!ageRaw.trim() || !Number.isFinite(parsedAge) || parsedAge < 1 || parsedAge > 120) {
      errors.age = uxCopy.errAgeInvalid;
    } else {
      const ageRes = validateAgeForSkus(cartSkus, parsedAge);
      if (!ageRes.ok) {
        errors.age = mapApiCodeToMessage(ageRes.errorCode);
        venues = ageRes.suggestedVenueIds || [];
      }
    }
    if (country.trim().length < 2) {
      errors.country = uxCopy.errCountry;
    }
    if (!isWhatsappValidClient(whatsapp)) {
      errors.whatsapp = uxCopy.errWhatsapp;
    }
    if (!isEmailValidClient(email)) {
      errors.email = uxCopy.errEmail;
    }
    if (createAccount && !isSignedIn && password.trim().length < 8) {
      errors.password = uxCopy.errPasswordShort;
    }
    if (!acceptedTerms) {
      errors.acceptedTerms = uxCopy.errTermsRequired;
    }

    return { errors, venues };
  };

  const handleInitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;

    setSubmittedOnce(true);
    setGeneralError(null);

    if (items.length === 0) {
      setGeneralError(uxCopy.errEmptyCart);
      focusSummaryBanner();
      return;
    }

    const { errors, venues } = validateClientFields();
    setFieldErrors(errors);
    setSuggestedVenues(venues);

    if (Object.keys(errors).length > 0) {
      focusSummaryBanner();
      return;
    }

    submittingRef.current = true;
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
          fullName: fullName.trim(),
          email: email.trim(),
          whatsapp: whatsapp.trim(),
          age: parsedAge,
          country: country.trim(),
          password: createAccount && !isSignedIn ? password.trim() : '',
          spokenLanguages,
          dietaryNotes: dietaryNotes.trim(),
          acceptedTerms,
          attribution: {
            ...attr,
            checkoutPath:
              typeof window !== 'undefined' ? window.location.pathname : `/${locale}/checkout`,
          },
        }),
      });

      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        code?: SinglePassApiErrorCode;
        details?: {
          field?: CheckoutFieldKey;
          fieldErrors?: Partial<Record<CheckoutFieldKey, SinglePassApiErrorCode>>;
          suggestedVenueIds?: SinglePassVenueId[];
        };
        orderId?: string;
        clientSecret?: string;
        publishableKey?: string;
        subtotalBaseCents?: number;
        feeCents?: number;
        feeRate?: number;
        totalEurCents?: number;
        presentmentCurrency?: string;
        presentmentTotalMinor?: number;
        fxRate?: number;
      } | null;

      if (!res.ok || !data?.ok || !data.clientSecret || !data.orderId || !data.publishableKey) {
        const mappedErrors: Partial<Record<CheckoutFieldKey, string>> = {};
        if (data?.details?.fieldErrors) {
          for (const [fk, code] of Object.entries(data.details.fieldErrors)) {
            if (code) {
              mappedErrors[fk as CheckoutFieldKey] = mapApiCodeToMessage(code);
            }
          }
        } else if (data?.details?.field && data.code) {
          mappedErrors[data.details.field] = mapApiCodeToMessage(data.code);
        }

        if (Object.keys(mappedErrors).length > 0) {
          setFieldErrors(mappedErrors);
        } else {
          setGeneralError(data?.code ? mapApiCodeToMessage(data.code) : data?.error || uxCopy.errPaymentSession);
        }
        if (Array.isArray(data?.details?.suggestedVenueIds)) {
          setSuggestedVenues(data.details.suggestedVenueIds);
        }
        focusSummaryBanner();
        return;
      }

      setFieldErrors({});
      setGeneralError(null);
      setPaymentSession({
        orderId: data.orderId,
        publishableKey: data.publishableKey,
        clientSecret: data.clientSecret,
        presentmentCurrency: data.presentmentCurrency || currency,
        presentmentTotalMinor: data.presentmentTotalMinor ?? grandTotalCents,
        subtotalBaseCents: data.subtotalBaseCents ?? subtotalBaseCents,
        feeCents: data.feeCents ?? totalFeeCents,
        feeRate: data.feeRate ?? effectiveFeeRate,
        hasMixedFeeRates,
        totalEurCents: data.totalEurCents ?? grandTotalCents,
        fxRate: data.fxRate ?? currentFxRate,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: whatsapp.trim(),
      });
    } catch {
      setGeneralError(uxCopy.errNetwork);
      focusSummaryBanner();
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  const summaryItems: SummaryErrorItem[] = useMemo(() => {
    const out: SummaryErrorItem[] = [];
    for (const key of ORDERED_FIELDS) {
      const msg = fieldErrors[key];
      if (msg) {
        out.push({
          field: key,
          label: getFieldDisplayLabel(key),
          message: msg,
        });
      }
    }
    if (generalError) {
      out.push({
        field: 'general',
        label: uxCopy.errorSummaryTitle,
        message: generalError,
      });
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldErrors, generalError, locale]);

  const displayedSuggestedVenues = useMemo(() => {
    if (suggestedVenues.length > 0) return suggestedVenues;
    if (liveAgeCheck && !liveAgeCheck.ok && liveAgeCheck.suggestedVenueIds) {
      return liveAgeCheck.suggestedVenueIds;
    }
    return [];
  }, [suggestedVenues, liveAgeCheck]);

  if (!mounted && !resumeOrderId) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-16 text-center text-base font-medium text-[#4F4D48]">
        Loading...
      </section>
    );
  }

  return (
    <section data-ui="checkout-flow" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-[#0A0A0C]/18 pb-6">
        <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight text-[#0A0A0C] sm:text-5xl">
          {copy.checkoutTitle}
        </h1>
        <p className="mt-2 max-w-[48ch] text-base leading-relaxed text-[#4F4D48]">
          {copy.checkoutSubtitle}
        </p>
        <p className="mt-2 text-[13px] font-semibold text-[#4F4D48]">
          Nightlife Milan · {headerFeeTag}
        </p>

        {/* 2-Step Progress Strip */}
        <div className="mt-5 flex flex-wrap gap-2.5 text-sm">
          <span
            className={`px-4 py-2 font-bold tabular-nums ${
              !paymentSession
                ? 'bg-[#0A0A0C] text-[#FFFFFF]'
                : 'border border-[#0A0A0C]/20 bg-[#FFFFFF] text-[#4F4D48]'
            }`}
          >
            {copy.stepDetailsLabel}
          </span>
          <span
            className={`px-4 py-2 font-bold tabular-nums ${
              paymentSession
                ? 'bg-[#0A0A0C] text-[#FFFFFF]'
                : 'border border-[#0A0A0C]/20 bg-[#FFFFFF] text-[#4F4D48]'
            }`}
          >
            {copy.stepPaymentLabel}
          </span>
        </div>

        {(cancelled || resumeOrderId) && (
          <div className="mt-4 border border-[#0A0A0C]/30 bg-[#FFFFFF] p-4 text-sm font-medium text-[#0A0A0C]">
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
            <div className="space-y-4 border border-[#0A0A0C]/16 bg-[#FFFFFF] p-6">
              <h2 className="font-display text-2xl font-bold uppercase text-[#0A0A0C]">
                {copy.orderIdLabel}: {paymentSession.orderId}
              </h2>
              <div className="space-y-1 text-sm text-[#4F4D48]">
                <p>
                  <strong className="text-[#0A0A0C]">{paymentSession.fullName}</strong>
                </p>
                <p>{paymentSession.email}</p>
                <p className="tabular-nums font-semibold text-[#0A0A0C]">{paymentSession.phone}</p>
              </div>
              <div className="space-y-2 border-t border-[#0A0A0C]/14 pt-3 text-sm tabular-nums">
                <div className="flex justify-between text-[#4F4D48]">
                  <span>{copy.basePriceLabel}</span>
                  <span>{formatEurFromCents(paymentSession.subtotalBaseCents, locale)}</span>
                </div>
                {paymentSession.feeCents > 0 && (
                  <div className="flex justify-between text-[#0A0A0C]">
                    <span>
                      {formatFeeLabel35(
                        locale,
                        paymentSession.feeRate,
                        paymentSession.hasMixedFeeRates,
                      )}
                    </span>
                    <span>+{formatEurFromCents(paymentSession.feeCents, locale)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-[#0A0A0C]/16 pt-2 text-base font-extrabold text-[#0A0A0C]">
                  <span>{copy.totalLabel} (EUR)</span>
                  <span>{formatEurFromCents(paymentSession.totalEurCents, locale)}</span>
                </div>
                {paymentSession.presentmentCurrency !== 'EUR' && (
                  <>
                    <div className="flex justify-between bg-[#EDEBE6] p-3 font-extrabold text-[#0A0A0C]">
                      <span>{paymentSession.presentmentCurrency}</span>
                      <span>
                        {formatMinorCurrency(
                          paymentSession.presentmentTotalMinor,
                          paymentSession.presentmentCurrency,
                          locale,
                        )}
                      </span>
                    </div>
                    <p className="text-right text-[13px] text-[#4F4D48]">
                      FX: 1 EUR = {paymentSession.fxRate.toFixed(4)}{' '}
                      {paymentSession.presentmentCurrency}
                    </p>
                  </>
                )}
              </div>
            </div>
          </aside>
        </div>
      ) : resumeOrderId && !paymentSession ? (
        generalError ? (
          <div
            role="alert"
            aria-live="assertive"
            className="border-2 border-[#D9381E] bg-[#FFFFFF] p-10 text-center"
          >
            <AlertCircle className="mx-auto h-10 w-10 text-[#D9381E]" aria-hidden="true" />
            <h2 className="mt-4 font-display text-3xl font-bold uppercase text-[#0A0A0C]">
              {isIt ? `Ordine ${resumeOrderId}` : `Order ${resumeOrderId}`}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-base font-medium text-[#0A0A0C]">
              {generalError}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={`${lp}/account`}
                locale={locale}
                className="inline-flex min-h-[48px] items-center justify-center bg-[#0A0A0C] px-6 py-3 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#18181C]"
              >
                {copy.navAccountLabel || (isIt ? 'Area Riservata' : 'Reserved Area')}
              </Link>
              <Link
                href={`${lp}/single-pass`}
                locale={locale}
                className="inline-flex min-h-[48px] items-center justify-center border border-[#0A0A0C]/30 bg-[#FFFFFF] px-6 py-3 text-sm font-bold text-[#0A0A0C] transition hover:border-[#0A0A0C]"
              >
                {copy.drawerExploreCta}
              </Link>
            </div>
          </div>
        ) : (
          <div
            role="status"
            aria-live="polite"
            className="border border-[#0A0A0C]/18 bg-[#FFFFFF] p-10 text-center"
          >
            <ShieldCheck className="mx-auto h-10 w-10 text-[#0A0A0C]" aria-hidden="true" />
            <h2 className="mt-4 font-display text-3xl font-bold uppercase text-[#0A0A0C]">
              {isIt ? `Verifica ordine ${resumeOrderId}` : `Verifying order ${resumeOrderId}`}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-base text-[#4F4D48]">
              {isIt
                ? 'Caricamento della sessione sicura di pagamento in corso...'
                : 'Loading secure on-site payment session...'}
            </p>
          </div>
        )
      ) : items.length === 0 ? (
        <div className="border border-[#0A0A0C]/18 bg-[#FFFFFF] p-10 text-center">
          <ShoppingBag className="mx-auto h-10 w-10 text-[#0A0A0C]" />
          <h2 className="mt-4 font-display text-3xl font-bold uppercase text-[#0A0A0C]">
            {copy.drawerEmptyTitle}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-base text-[#4F4D48]">{copy.drawerEmptyBody}</p>
          <Link
            href={`${lp}/single-pass`}
            locale={locale}
            className="mt-6 inline-flex min-h-[48px] items-center justify-center bg-[#D9381E] px-6 py-3 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#B82B14]"
          >
            {copy.drawerExploreCta}
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-12">
          <form noValidate onSubmit={handleInitPayment} className="space-y-6 lg:col-span-7">
            {/* Clickable Error Summary Banner */}
            {summaryItems.length > 0 && (
              <div
                ref={errorSummaryRef}
                tabIndex={-1}
                role="alert"
                aria-live="assertive"
                data-checkout-error-summary
                className="border-2 border-[#B91C1C] bg-[#FEF2F2] p-5 text-[#0A0A0C] focus:outline-none"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#B91C1C]" aria-hidden="true" />
                  <div className="flex-1">
                    <h2 className="text-base font-extrabold text-[#B91C1C]">
                      {summaryItems.length === 1
                        ? uxCopy.errorSummarySingleTitle
                        : uxCopy.errorSummaryTitle}
                    </h2>
                    <p className="mt-0.5 text-sm text-[#4F4D48]">{uxCopy.errorSummaryHint}</p>
                    <ul className="mt-3 space-y-2">
                      {summaryItems.map((item, idx) => (
                        <li key={`${item.field}-${idx}`}>
                          <button
                            type="button"
                            data-target-field={item.field}
                            onClick={() => jumpToField(item.field)}
                            className="inline-flex min-h-[36px] items-start gap-2 text-left text-sm font-semibold text-[#B91C1C] underline decoration-[#B91C1C]/60 underline-offset-2 hover:text-[#0A0A0C]"
                          >
                            <span>
                              {item.label}: {item.message}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Selected Cart Items */}
            <div id="sp-cart-items" tabIndex={-1} className="space-y-3 focus:outline-none">
              {items.map((item) => {
                const sku = resolveCatalogSku(item.skuId);
                if (!sku) return null;
                const venue = VENUE_BY_ID[sku.venueId];
                const venueName = sku.venueNameOverride || venue?.name || 'Nightlife Milan';
                const skuFeeRate = getSkuFeeRate(sku, item.channel || 'venue');
                const p = computeSinglePassPrice(sku.basePriceCents, item.quantity, skuFeeRate);
                const itemGuestCount = Math.max(0, sku.guestsPerUnit ?? 1) * item.quantity;

                return (
                  <div
                    key={item.skuId}
                    className="flex flex-col gap-3 border border-[#0A0A0C]/16 bg-[#FFFFFF] p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-bold text-[#4F4D48] tabular-nums">
                        {venueName} · {sku.arrivalTime} ·{' '}
                        {itemGuestCount > 0
                          ? `${itemGuestCount} ${
                              itemGuestCount === 1 ? uxCopy.guestUnitSingular : uxCopy.guestsUnit
                            }`
                          : terrazzaUi.tableAddonBadge}
                      </p>
                      <h2 className="font-display text-xl font-bold text-[#0A0A0C]">
                        {isIt ? sku.titleIt : sku.titleEn}
                      </h2>
                      {item.dietaryChoice && !sku.requiresDietary && (
                        <p className="mt-1 text-[13px] text-[#4F4D48]">{item.dietaryChoice}</p>
                      )}
                      {sku.requiresDietary && (
                        <select
                          aria-label={copy.formDietary}
                          value={item.dietaryChoice || 'Terra / Meat Menu'}
                          onChange={(e) => updateDietary(item.skuId, e.target.value)}
                          className="mt-2 h-10 border border-[#0A0A0C]/25 bg-[#FFFFFF] px-3 text-sm text-[#0A0A0C]"
                        >
                          <option value="Terra / Meat Menu">Menù di Terra / Meat</option>
                          <option value="Mare / Seafood Menu">Menù di Mare / Seafood</option>
                          <option value="Vegetarian / Vegan">Vegetariano / Vegano</option>
                          <option value="Gluten-Free / Allergies">Senza Glutine</option>
                        </select>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="inline-flex items-center border border-[#0A0A0C]/25 bg-[#EDEBE6]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.skuId, item.quantity - 1)}
                          className="flex h-11 w-11 items-center justify-center text-[#0A0A0C] hover:bg-[#0A0A0C]/10"
                          aria-label="Decrease"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-[2.25rem] text-center text-sm font-bold tabular-nums text-[#0A0A0C]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.skuId, item.quantity + 1)}
                          className="flex h-11 w-11 items-center justify-center text-[#0A0A0C] hover:bg-[#0A0A0C]/10"
                          aria-label="Increase"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="min-w-[84px] text-right font-display text-2xl font-extrabold tabular-nums text-[#0A0A0C]">
                        {formatEurFromCents(p.lineTotalCents, locale)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeItem(item.skuId)}
                        aria-label={copy.removeItemLabel}
                        className="flex h-11 w-11 items-center justify-center border border-[#0A0A0C]/15 text-[#4F4D48] hover:border-[#B91C1C] hover:text-[#B91C1C]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {!cartValidation.ok && (
                <div
                  role="region"
                  aria-label={uxCopy.cartFixHeading}
                  className="border-2 border-[#B91C1C] bg-[#FEF2F2] p-4 text-sm text-[#0A0A0C]"
                >
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#B91C1C]" />
                    <div className="space-y-2">
                      <p className="font-bold text-[#B91C1C]">{uxCopy.cartFixHeading}</p>
                      <p>
                        {cartValidation.errorCode === 'TABLE_REQUIRES_FORMULA'
                          ? terrazzaUi.tableRequiresFormulaError
                          : terrazzaUi.tableMaxGuestsExceededError}
                      </p>
                      <Link
                        href={`${lp}/cart`}
                        locale={locale}
                        className="inline-flex min-h-[40px] items-center gap-1.5 border border-[#0A0A0C] bg-[#FFFFFF] px-3.5 py-2 text-[13px] font-bold text-[#0A0A0C] hover:bg-[#0A0A0C] hover:text-[#FFFFFF]"
                      >
                        {uxCopy.cartFixCta}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Guest Registration & Contact Fields */}
            <div className="space-y-5 border border-[#0A0A0C]/16 bg-[#FFFFFF] p-6 sm:p-8">
              {/* Required / Optional Legend */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#0A0A0C]/12 pb-4">
                <p className="flex items-center gap-2 text-sm font-medium text-[#4F4D48]">
                  <Info className="h-4 w-4 shrink-0 text-[#0A0A0C]" aria-hidden="true" />
                  <span>{uxCopy.requiredLegend}</span>
                </p>
                <div className="flex items-center gap-2 text-[13px] font-bold">
                  <span className="bg-[#0A0A0C] px-2 py-0.5 text-[#FFFFFF]">
                    {uxCopy.requiredBadge} *
                  </span>
                  <span className="bg-[#EDEBE6] px-2 py-0.5 text-[#4F4D48]">
                    {uxCopy.optionalBadge}
                  </span>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <label htmlFor="sp-full-name" className="text-sm font-bold text-[#0A0A0C]">
                      {copy.formFullName} *
                    </label>
                    <span className="shrink-0 whitespace-nowrap bg-[#0A0A0C] px-2 py-0.5 text-[13px] font-bold text-[#FFFFFF]">
                      {uxCopy.requiredBadge} *
                    </span>
                  </div>
                  <input
                    id="sp-full-name"
                    type="text"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      clearFieldError('fullName');
                    }}
                    aria-invalid={Boolean(fieldErrors.fullName)}
                    aria-describedby={fieldErrors.fullName ? 'sp-full-name-error' : undefined}
                    placeholder="Marco Rossi"
                    className={`mt-2 h-12 w-full px-3.5 text-base text-[#0A0A0C] placeholder:text-[#4F4D48]/60 ${
                      fieldErrors.fullName
                        ? 'border-2 border-[#B91C1C] bg-[#FEF2F2]'
                        : 'border border-[#0A0A0C]/30 bg-[#FFFFFF]'
                    }`}
                  />
                  {fieldErrors.fullName && (
                    <p id="sp-full-name-error" className="mt-1.5 text-sm font-semibold text-[#B91C1C]">
                      {fieldErrors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <label htmlFor="sp-age" className="text-sm font-bold text-[#0A0A0C]">
                      {copy.formAge} *
                    </label>
                    <span className="shrink-0 whitespace-nowrap bg-[#0A0A0C] px-2 py-0.5 text-[13px] font-bold text-[#FFFFFF]">
                      {uxCopy.requiredBadge} *
                    </span>
                  </div>
                  <input
                    id="sp-age"
                    type="number"
                    min={18}
                    max={99}
                    inputMode="numeric"
                    value={ageRaw}
                    onChange={(e) => {
                      setAgeRaw(e.target.value);
                      clearFieldError('age');
                    }}
                    aria-invalid={Boolean(fieldErrors.age || (liveAgeCheck && !liveAgeCheck.ok))}
                    aria-describedby={fieldErrors.age ? 'sp-age-error' : undefined}
                    placeholder="28"
                    className={`mt-2 h-12 w-full px-3.5 text-base tabular-nums text-[#0A0A0C] placeholder:text-[#4F4D48]/60 ${
                      fieldErrors.age || (liveAgeCheck && !liveAgeCheck.ok)
                        ? 'border-2 border-[#B91C1C] bg-[#FEF2F2]'
                        : 'border border-[#0A0A0C]/30 bg-[#FFFFFF]'
                    }`}
                  />
                  {fieldErrors.age && (
                    <p id="sp-age-error" className="mt-1.5 text-sm font-semibold text-[#B91C1C]">
                      {fieldErrors.age}
                    </p>
                  )}
                </div>
              </div>

              {(fieldErrors.age || (liveAgeCheck && !liveAgeCheck.ok)) &&
                displayedSuggestedVenues.length > 0 && (
                  <div className="border-2 border-[#B91C1C] bg-[#FEF2F2] p-4 text-sm text-[#0A0A0C]">
                    <p className="font-bold text-[#B91C1C]">
                      {liveAgeCheck && !liveAgeCheck.ok
                        ? mapApiCodeToMessage(liveAgeCheck.errorCode)
                        : fieldErrors.age}
                    </p>
                    <p className="mt-2 font-semibold text-[#0A0A0C]">
                      {uxCopy.suggestedVenuesHeading}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {displayedSuggestedVenues.map((vid) => {
                        const v = VENUE_BY_ID[vid];
                        if (!v) return null;
                        return (
                          <Link
                            key={vid}
                            href={`${lp}/eventi/${v.eventSlug}`}
                            locale={locale}
                            className="inline-flex min-h-[40px] items-center gap-1.5 border border-[#0A0A0C] bg-[#FFFFFF] px-3 py-1.5 text-[13px] font-bold text-[#0A0A0C] hover:bg-[#0A0A0C] hover:text-[#FFFFFF]"
                          >
                            <span>{v.name}</span>
                            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

              {liveAgeCheck?.ok && liveAgeCheck.advisoryCode === 'RECOMMEND_BISCHERI_50_PLUS' && (
                <div className="border border-[#0A0A0C]/25 bg-[#EDEBE6] p-3.5 text-sm font-medium text-[#0A0A0C]">
                  {copy.bischeriAdvisory}
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <label htmlFor="sp-whatsapp" className="text-sm font-bold text-[#0A0A0C]">
                      {copy.formWhatsapp} *
                    </label>
                    <span className="shrink-0 whitespace-nowrap bg-[#0A0A0C] px-2 py-0.5 text-[13px] font-bold text-[#FFFFFF]">
                      {uxCopy.requiredBadge} *
                    </span>
                  </div>
                  <input
                    id="sp-whatsapp"
                    type="tel"
                    autoComplete="tel"
                    value={whatsapp}
                    onChange={(e) => {
                      setWhatsapp(e.target.value);
                      clearFieldError('whatsapp');
                    }}
                    aria-invalid={Boolean(fieldErrors.whatsapp)}
                    aria-describedby={
                      fieldErrors.whatsapp ? 'sp-whatsapp-error sp-whatsapp-hint' : 'sp-whatsapp-hint'
                    }
                    placeholder={uxCopy.whatsappPlaceholder}
                    className={`mt-2 h-12 w-full px-3.5 text-base tabular-nums text-[#0A0A0C] placeholder:text-[#4F4D48]/60 ${
                      fieldErrors.whatsapp
                        ? 'border-2 border-[#B91C1C] bg-[#FEF2F2]'
                        : 'border border-[#0A0A0C]/30 bg-[#FFFFFF]'
                    }`}
                  />
                  <p id="sp-whatsapp-hint" className="mt-1.5 text-[13px] text-[#4F4D48]">
                    {copy.formWhatsappHint}
                  </p>
                  {fieldErrors.whatsapp && (
                    <p id="sp-whatsapp-error" className="mt-1 text-sm font-semibold text-[#B91C1C]">
                      {fieldErrors.whatsapp}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <label htmlFor="sp-email" className="text-sm font-bold text-[#0A0A0C]">
                      {copy.formEmail} *
                    </label>
                    <span className="shrink-0 whitespace-nowrap bg-[#0A0A0C] px-2 py-0.5 text-[13px] font-bold text-[#FFFFFF]">
                      {uxCopy.requiredBadge} *
                    </span>
                  </div>
                  <input
                    id="sp-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      clearFieldError('email');
                    }}
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? 'sp-email-error' : undefined}
                    placeholder={uxCopy.emailPlaceholder}
                    className={`mt-2 h-12 w-full px-3.5 text-base text-[#0A0A0C] placeholder:text-[#4F4D48]/60 ${
                      fieldErrors.email
                        ? 'border-2 border-[#B91C1C] bg-[#FEF2F2]'
                        : 'border border-[#0A0A0C]/30 bg-[#FFFFFF]'
                    }`}
                  />
                  {fieldErrors.email && (
                    <p id="sp-email-error" className="mt-1.5 text-sm font-semibold text-[#B91C1C]">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <label htmlFor="sp-country" className="text-sm font-bold text-[#0A0A0C]">
                      {copy.formCountry} *
                    </label>
                    <span className="shrink-0 whitespace-nowrap bg-[#0A0A0C] px-2 py-0.5 text-[13px] font-bold text-[#FFFFFF]">
                      {uxCopy.requiredBadge} *
                    </span>
                  </div>
                  <input
                    id="sp-country"
                    type="text"
                    autoComplete="country-name"
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                      clearFieldError('country');
                    }}
                    aria-invalid={Boolean(fieldErrors.country)}
                    aria-describedby={fieldErrors.country ? 'sp-country-error' : undefined}
                    placeholder={uxCopy.countryPlaceholder}
                    className={`mt-2 h-12 w-full px-3.5 text-base text-[#0A0A0C] placeholder:text-[#4F4D48]/60 ${
                      fieldErrors.country
                        ? 'border-2 border-[#B91C1C] bg-[#FEF2F2]'
                        : 'border border-[#0A0A0C]/30 bg-[#FFFFFF]'
                    }`}
                  />
                  {fieldErrors.country && (
                    <p id="sp-country-error" className="mt-1.5 text-sm font-semibold text-[#B91C1C]">
                      {fieldErrors.country}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <label htmlFor="sp-currency" className="text-sm font-bold text-[#0A0A0C]">
                      {copy.currencySelectorLabel}
                    </label>
                    <span className="shrink-0 whitespace-nowrap bg-[#EDEBE6] px-2 py-0.5 text-[13px] font-bold text-[#4F4D48]">
                      {uxCopy.optionalBadge}
                    </span>
                  </div>
                  <select
                    id="sp-currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as SupportedCurrency)}
                    className="mt-2 h-12 w-full border border-[#0A0A0C]/30 bg-[#FFFFFF] px-3.5 text-base font-bold tabular-nums text-[#0A0A0C]"
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
                <div className="space-y-3 border border-[#0A0A0C]/16 bg-[#EDEBE6] p-4">
                  <div className="flex items-center justify-between gap-2">
                    <label className="flex cursor-pointer items-center gap-3 text-sm font-bold text-[#0A0A0C]">
                      <input
                        type="checkbox"
                        checked={createAccount}
                        onChange={(e) => {
                          const nextChecked = e.target.checked;
                          setCreateAccount(nextChecked);
                          if (!nextChecked) {
                            clearFieldError('password');
                          }
                        }}
                        className="h-5 w-5 shrink-0 accent-[#0A0A0C]"
                      />
                      <span>{copy.formCreateAccountToggle}</span>
                    </label>
                    <span className="shrink-0 whitespace-nowrap bg-[#FFFFFF] px-2 py-0.5 text-[13px] font-bold text-[#4F4D48]">
                      {uxCopy.optionalBadge}
                    </span>
                  </div>
                  <p className="text-[13px] text-[#4F4D48]">{uxCopy.createAccountHint}</p>

                  {createAccount && (
                    <div className="pt-1">
                      <div className="flex items-center justify-between gap-2">
                        <label htmlFor="sp-password" className="text-sm font-bold text-[#0A0A0C]">
                          {copy.formPassword} *
                        </label>
                        <span className="shrink-0 whitespace-nowrap bg-[#0A0A0C] px-2 py-0.5 text-[13px] font-bold text-[#FFFFFF]">
                          {uxCopy.conditionalBadge}
                        </span>
                      </div>
                      <input
                        id="sp-password"
                        type="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          clearFieldError('password');
                        }}
                        aria-invalid={Boolean(fieldErrors.password)}
                        aria-describedby={
                          fieldErrors.password ? 'sp-password-error sp-password-hint' : 'sp-password-hint'
                        }
                        placeholder={uxCopy.passwordPlaceholder}
                        className={`mt-2 h-12 w-full px-3.5 text-base text-[#0A0A0C] placeholder:text-[#4F4D48]/60 ${
                          fieldErrors.password
                            ? 'border-2 border-[#B91C1C] bg-[#FEF2F2]'
                            : 'border border-[#0A0A0C]/30 bg-[#FFFFFF]'
                        }`}
                      />
                      <p id="sp-password-hint" className="mt-1 text-[13px] text-[#4F4D48]">
                        {uxCopy.existingAccountHint}
                      </p>
                      {fieldErrors.password && (
                        <p id="sp-password-error" className="mt-1.5 text-sm font-semibold text-[#B91C1C]">
                          {fieldErrors.password}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-[#0A0A0C]">{copy.formLanguages}</span>
                  <span className="shrink-0 whitespace-nowrap bg-[#EDEBE6] px-2 py-0.5 text-[13px] font-bold text-[#4F4D48]">
                    {uxCopy.optionalBadge}
                  </span>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {SPOKEN_LANGUAGE_OPTIONS.map((langOption) => {
                    const active = spokenLanguages.includes(langOption);
                    return (
                      <button
                        key={langOption}
                        type="button"
                        onClick={() => toggleLanguage(langOption)}
                        className={`nlm-pressable min-h-[38px] border px-3 py-1.5 text-[13px] font-bold transition ${
                          active
                            ? 'border-[#0A0A0C] bg-[#0A0A0C] text-[#FFFFFF]'
                            : 'border-[#0A0A0C]/25 bg-[#FFFFFF] text-[#4F4D48] hover:border-[#0A0A0C] hover:text-[#0A0A0C]'
                        }`}
                      >
                        {langOption}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ALWAYS OPTIONAL Allergies & Dietary Notes */}
              <div className="border-t border-[#0A0A0C]/12 pt-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label htmlFor="sp-notes" className="text-sm font-bold text-[#0A0A0C]">
                    {hasTerrazzaDuomo21 ? terrazzaUi.allergiesLabel : copy.formDietary}
                  </label>
                  <span className="shrink-0 whitespace-nowrap bg-[#EDEBE6] px-2 py-0.5 text-[13px] font-bold text-[#4F4D48]">
                    {uxCopy.optionalBadge}
                  </span>
                </div>
                <p className="mt-1 max-w-[48ch] text-[13px] text-[#4F4D48]">
                  {hasTerrazzaDuomo21 ? terrazzaUi.allergiesHint : uxCopy.allergiesOptionalNote}
                </p>

                <div className="mt-2.5 flex flex-wrap gap-2">
                  {uxCopy.allergyChips.map((chip) => {
                    const isChipActive =
                      chip === uxCopy.allergyChips[0]
                        ? dietaryNotes.trim() === chip ||
                          dietaryNotes.trim() === terrazzaUi.noAllergiesQuickFill
                        : dietaryNotes
                            .split(',')
                            .map((s) => s.trim())
                            .includes(chip);
                    return (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => toggleAllergyChip(chip)}
                        className={`nlm-pressable inline-flex min-h-[36px] items-center gap-1.5 border px-3 py-1 text-[13px] font-semibold transition ${
                          isChipActive
                            ? 'border-[#0A0A0C] bg-[#0A0A0C] text-[#FFFFFF]'
                            : 'border-[#0A0A0C]/25 bg-[#FFFFFF] text-[#0A0A0C] hover:border-[#0A0A0C]'
                        }`}
                      >
                        {isChipActive && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                        <span>{chip}</span>
                      </button>
                    );
                  })}
                </div>

                <textarea
                  id="sp-notes"
                  rows={2}
                  value={dietaryNotes}
                  onChange={(e) => setDietaryNotes(e.target.value)}
                  placeholder={
                    hasTerrazzaDuomo21 ? terrazzaUi.allergiesPlaceholder : uxCopy.allergiesOptionalNote
                  }
                  className="mt-2.5 w-full border border-[#0A0A0C]/30 bg-[#FFFFFF] p-3 text-base text-[#0A0A0C] placeholder:text-[#4F4D48]/60"
                />
              </div>

              {hasTerrazzaDuomo21 && (
                <div className="border border-[#0A0A0C]/20 bg-[#EDEBE6] p-4 text-sm leading-relaxed text-[#0A0A0C]">
                  <p className="font-bold">{terrazzaUi.confirmationRefundNotice}</p>
                  <p className="mt-1 text-[13px] text-[#4F4D48]">{terrazzaUi.entryCheckpointNotice}</p>
                </div>
              )}

              <div
                className={`space-y-2 border-t border-[#0A0A0C]/14 pt-5 ${
                  fieldErrors.acceptedTerms ? 'bg-[#FEF2F2] p-3.5 border-2 border-[#B91C1C]' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-[#0A0A0C]">
                    <input
                      id="sp-terms"
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => {
                        setAcceptedTerms(e.target.checked);
                        clearFieldError('acceptedTerms');
                      }}
                      aria-invalid={Boolean(fieldErrors.acceptedTerms)}
                      aria-describedby={fieldErrors.acceptedTerms ? 'sp-terms-error' : undefined}
                      className="mt-1 h-5 w-5 shrink-0 accent-[#0A0A0C]"
                    />
                    <span>
                      {hasTerrazzaDuomo21
                        ? terrazzaUi.termsNotice20
                        : totalFeeCents > 0
                          ? copy.formTermsLabel
                          : isIt
                            ? 'Accetto Termini e Condizioni, Privacy Policy e Politica di Rimborso di nightlifemilan.com e confermo i requisiti d’età del locale.'
                            : 'I accept the Terms & Conditions, Privacy Policy, and Refund Policy of nightlifemilan.com and confirm venue age requirements.'}{' '}
                      *
                    </span>
                  </label>
                  <span className="shrink-0 whitespace-nowrap bg-[#0A0A0C] px-2 py-0.5 text-[13px] font-bold text-[#FFFFFF]">
                    {uxCopy.requiredBadge} *
                  </span>
                </div>
                {fieldErrors.acceptedTerms && (
                  <p id="sp-terms-error" className="pl-8 text-sm font-semibold text-[#B91C1C]">
                    {fieldErrors.acceptedTerms}
                  </p>
                )}
                <div className="flex flex-wrap gap-4 pl-8 text-[13px] font-bold text-[#0A0A0C]">
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

            {submittedOnce && summaryItems.length > 0 && (
              <p className="text-sm font-semibold text-[#B91C1C]">
                {summaryItems.length === 1
                  ? uxCopy.errorSummarySingleTitle
                  : uxCopy.errorSummaryTitle}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="nlm-pressable flex min-h-[54px] w-full items-center justify-center gap-2 bg-[#D9381E] px-6 py-4 text-sm font-extrabold uppercase tracking-[0.04em] text-[#FFFFFF] transition hover:bg-[#B82B14] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Lock className="h-4 w-4" aria-hidden="true" />
              <span>{submitting ? copy.paymentProcessingLabel : copy.formPayNowCta}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>

          {/* Right Summary Card */}
          <aside className="lg:col-span-5">
            <div className="sticky top-24 space-y-5 border border-[#0A0A0C]/16 bg-[#FFFFFF] p-6">
              <h2 className="font-display text-2xl font-bold uppercase text-[#0A0A0C]">
                {isIt ? 'Riepilogo & Valuta di Pagamento' : 'Order & Currency Summary'}
              </h2>
              <div className="space-y-3 text-sm tabular-nums">
                <div className="flex justify-between text-[#4F4D48]">
                  <span>{copy.guestsLabel}</span>
                  <span className="font-bold text-[#0A0A0C]">{totalGuests}</span>
                </div>
                <div className="flex justify-between text-[#4F4D48]">
                  <span>{copy.basePriceLabel}</span>
                  <span className="font-semibold text-[#0A0A0C]">
                    {formatEurFromCents(subtotalBaseCents, locale)}
                  </span>
                </div>
                {totalFeeCents > 0 && (
                  <div className="flex justify-between text-[#4F4D48]">
                    <span>{feeLabel}</span>
                    <span className="font-semibold text-[#0A0A0C]">
                      +{formatEurFromCents(totalFeeCents, locale)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between border-t border-[#0A0A0C]/16 pt-3 text-lg font-extrabold text-[#0A0A0C]">
                  <span>{copy.totalLabel} (EUR)</span>
                  <span className="font-display text-3xl text-[#0A0A0C]">
                    {formatEurFromCents(grandTotalCents, locale)}
                  </span>
                </div>
                {currency !== 'EUR' && (
                  <div className="space-y-1 bg-[#EDEBE6] p-3.5">
                    <div className="flex justify-between text-base font-extrabold text-[#0A0A0C]">
                      <span>
                        {copy.chargedInCurrencyLabel} ({currency})
                      </span>
                      <span className="font-display text-2xl text-[#D9381E]">
                        {formatMinorCurrency(convertedTotalMinor, currency, locale)}
                      </span>
                    </div>
                    <p className="text-right text-[13px] text-[#4F4D48]">
                      1 EUR = {currentFxRate.toFixed(4)} {currency}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2 border-t border-[#0A0A0C]/12 pt-4 text-[13px] text-[#4F4D48]">
                <p className="flex items-center gap-2 font-bold text-[#0A0A0C]">
                  <ShieldCheck className="h-4 w-4 text-[#0A0A0C]" aria-hidden="true" />
                  nightlifemilan.com · Official Concierge
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
