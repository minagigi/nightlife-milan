'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronDown,
  Info,
  Lock,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
} from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { capodannoEventPath } from '@/lib/capodanno/routes';
import { localePrefix } from '@/lib/i18n/locales';
import {
  DINNER_DIETARY_OPTIONS,
  SPOKEN_LANGUAGE_OPTIONS,
  STOREFRONT_VENUE_ID_SET,
  VENUE_BY_ID,
  computeSinglePassPrice,
  formatEurFromCents,
  getSkuFeeRate,
  resolveCatalogSku,
  validateAgeForSkus,
} from '@/lib/single-pass/catalog';
import { formatMinorCurrency, type SupportedCurrency } from '@/lib/single-pass/currency';
import {
  formatCartValidationError35,
  formatFeeLabel35,
  formatTermsLabel35,
  formatZeroGuestAddonBadge35,
  getCheckoutUxCopy,
  getSinglePassCopy,
  getTerrazzaCheckoutUi35,
  localizeSinglePassSku,
} from '@/lib/single-pass/i18n35';
import type {
  CheckoutFieldKey,
  SinglePassApiErrorCode,
  SinglePassSku,
  SinglePassVenueId,
} from '@/lib/single-pass/types';
import { readClientAttribution } from './AttributionTracker';
import {
  readCartFunnelSnapshot,
  trackEcommerceEvent,
  writeCartFunnelSnapshot,
} from '@/lib/analytics';
import EmbeddedPaymentForm from './EmbeddedPaymentForm';
import { cartRowKey, useSinglePassCart } from './SinglePassCartContext';

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
  resumeToken,
  cancelled,
}: {
  locale: string;
  resumeOrderId?: string;
  resumeToken?: string;
  cancelled?: boolean;
}) {
  const {
    items,
    updateQuantity,
    updateDietary,
    removeItem,
    clearCart,
    cartSessionId,
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
  const beginCheckoutSigRef = useRef<string>('');

  useEffect(() => {
    if (!mounted || items.length === 0 || grandTotalCents <= 0) return;
    const sig = items.map((i) => `${i.skuId}:${i.quantity}:${i.channel || 'venue'}`).join('|');
    if (beginCheckoutSigRef.current === sig) return;
    beginCheckoutSigRef.current = sig;

    const gaItems = items.flatMap((i) => {
      const sku = resolveCatalogSku(i.skuId);
      if (!sku) return [];
      const ch = i.channel || 'venue';
      const pr = computeSinglePassPrice(sku.basePriceCents, i.quantity, getSkuFeeRate(sku, ch));
      return [
        {
          item_id: sku.id,
          item_name: sku.titleIt || sku.titleEn,
          item_category: ch,
          price: Number((pr.unitTotalCents / 100).toFixed(2)),
          quantity: i.quantity,
        },
      ];
    });

    trackEcommerceEvent('begin_checkout', {
      currency: 'EUR',
      value: grandTotalCents / 100,
      item_count: items.reduce((s, x) => s + x.quantity, 0),
      items: gaItems,
    });

    const prevSnap = readCartFunnelSnapshot();
    writeCartFunnelSnapshot({
      active: true,
      stage: 'checkout',
      valueEur: Number((grandTotalCents / 100).toFixed(2)),
      itemCount: items.reduce((s, x) => s + x.quantity, 0),
      orderId: prevSnap?.orderId,
      lastTouchMs: Date.now(),
      purchased: false,
      abandonedSent: false,
    });
  }, [mounted, items, grandTotalCents]);

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [fullName, setFullName] = useState('');
  const [ageRaw, setAgeRaw] = useState('');
  const [country, setCountry] = useState(isIt ? 'Italia' : '');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [createAccount, setCreateAccount] = useState(false);
  const [extraOpen, setExtraOpen] = useState(false);
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
  const activeFeePct = Math.round(activeFeeRate * 100);
  const headerFeeTag =
    activeFeePct > 0
      ? `CONCIERGE & TRANSACTION FEES ${activeFeePct}%`
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resumeToken ? { resumeToken } : {}),
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

  const firstValidationBlocker = useMemo(() => {
    for (const k of ORDERED_FIELDS) {
      if (fieldErrors[k]) return fieldErrors[k] || null;
    }
    return generalError || null;
  }, [fieldErrors, generalError]);

  useEffect(() => {
    if (!mounted || !cartSessionId || resumeOrderId || paymentSession || items.length === 0) {
      return;
    }
    const hasContactInput =
      fullName.trim().length >= 2 || email.trim().length >= 3 || whatsapp.trim().length >= 4;
    if (!hasContactInput && !submittedOnce) {
      return;
    }

    const buildPayload = () => {
      const attr = readClientAttribution();
      return JSON.stringify({
        cartSessionId,
        locale,
        currency,
        stage: 'checkout_form',
        items,
        customer: {
          ...(fullName.trim() ? { fullName: fullName.trim() } : {}),
          ...(email.trim() ? { email: email.trim() } : {}),
          ...(whatsapp.trim() ? { whatsapp: whatsapp.trim() } : {}),
          ...(ageRaw.trim() && Number.isFinite(parsedAge) ? { age: parsedAge } : {}),
          ...(country.trim() ? { country: country.trim() } : {}),
        },
        lastValidationError: firstValidationBlocker,
        attribution: {
          ...attr,
          checkoutPath:
            typeof window !== 'undefined' ? window.location.pathname : `/${locale}/checkout`,
        },
      });
    };

    const timer = window.setTimeout(() => {
      fetch('/api/single-pass/cart-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: buildPayload(),
      }).catch(() => {});
    }, 1000);

    const handlePageHide = () => {
      if (submittingRef.current) return;
      try {
        const blob = new Blob([buildPayload()], { type: 'application/json' });
        if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
          navigator.sendBeacon('/api/single-pass/cart-sync', blob);
        }
      } catch {}
    };

    window.addEventListener('pagehide', handlePageHide);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, [
    mounted,
    cartSessionId,
    resumeOrderId,
    paymentSession,
    items,
    fullName,
    email,
    whatsapp,
    ageRaw,
    parsedAge,
    country,
    submittedOnce,
    firstValidationBlocker,
    locale,
    currency,
  ]);

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
      case 'TABLE_MAX_GUESTS_EXCEEDED':
      case 'APRICA_HALF_BOARD_REQUIRES_HOTEL':
      case 'APRICA_HALF_BOARD_MAX_EXCEEDED':
      case 'APRICA_BUS_REQUIRES_PACKAGE':
      case 'APRICA_BUS_MAX_EXCEEDED':
        return formatCartValidationError35(locale, code);
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
    if (field === 'password') {
      setExtraOpen(true);
      setTimeout(() => {
        const pwEl = typeof document !== 'undefined' ? document.getElementById(FIELD_DOM_IDS.password) : null;
        if (pwEl) {
          pwEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (typeof (pwEl as HTMLElement).focus === 'function') {
            (pwEl as HTMLElement).focus();
          }
        }
      }, 30);
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
      errors.cart = formatCartValidationError35(locale, cartValidation.errorCode);
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

    if (errors.password) {
      setExtraOpen(true);
    }

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
          cartSessionId,
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

        if (mappedErrors.password) {
          setExtraOpen(true);
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
      const sessionEurCents = data.totalEurCents ?? grandTotalCents;
      trackEcommerceEvent('add_payment_info', {
        currency: 'EUR',
        value: sessionEurCents / 100,
        order_id: data.orderId,
        payment_type: 'card',
        item_count: items.reduce((s, x) => s + x.quantity, 0),
      });
      writeCartFunnelSnapshot({
        active: true,
        stage: 'payment',
        valueEur: Number((sessionEurCents / 100).toFixed(2)),
        itemCount: items.reduce((s, x) => s + x.quantity, 0),
        orderId: data.orderId,
        lastTouchMs: Date.now(),
        purchased: false,
        abandonedSent: false,
      });
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

  const isOptionalDrawerOpen = extraOpen || createAccount || Boolean(fieldErrors.password);

  if (!mounted && !resumeOrderId) {
    return (
      <section className="bg-[#050505] px-4 py-16 text-center text-base font-medium text-[#C2B9AA]">
        Loading...
      </section>
    );
  }

  return (
    <section data-ui="checkout-flow" data-cart-variant="variante-1-carta-calda" className="w-full">
      {/* CAPITOLO 01 — NOTTE #050505: Testata & Articoli Selezionati */}
      <div className="bg-[#050505] text-[#F6F1E7]">
        <div className="mx-auto max-w-4xl px-4 pb-8 pt-8 sm:px-6 lg:px-8">
          <div className="border-b border-[#F6F1E7]/16 pb-6">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#EAE3D5]">
              NIGHTLIFE MILAN · {headerFeeTag}
            </p>
            <h1 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight text-[#F6F1E7] sm:text-5xl">
              {copy.checkoutTitle}
            </h1>
            <p className="mt-2 max-w-[54ch] text-sm leading-relaxed text-[#C2B9AA] sm:text-base">
              {copy.checkoutSubtitle}
            </p>

            {/* 2-Step Progress Strip */}
            <div className="mt-5 flex flex-wrap gap-2.5 text-xs sm:text-sm">
              <span
                className={`inline-flex min-h-[38px] items-center px-4 py-2 font-extrabold uppercase tracking-wider tabular-nums ${
                  !paymentSession
                    ? 'bg-[#25D366] text-[#050505]'
                    : 'border border-[#F6F1E7]/25 bg-[#141311] text-[#C2B9AA]'
                }`}
              >
                {copy.stepDetailsLabel}
              </span>
              <span
                className={`inline-flex min-h-[38px] items-center px-4 py-2 font-extrabold uppercase tracking-wider tabular-nums ${
                  paymentSession
                    ? 'bg-[#25D366] text-[#050505]'
                    : 'border border-[#F6F1E7]/25 bg-[#141311] text-[#C2B9AA]'
                }`}
              >
                {copy.stepPaymentLabel}
              </span>
            </div>

            {(cancelled || resumeOrderId) && (
              <div className="mt-4 border border-[#EAE3D5]/35 bg-[#141311] p-4 text-sm font-medium text-[#F6F1E7]">
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

          {!paymentSession && !resumeOrderId && items.length === 0 && (
            <div className="mt-8 border border-[#F6F1E7]/18 bg-[#141311] p-8 text-center sm:p-12">
              <ShoppingBag className="mx-auto h-10 w-10 text-[#EAE3D5]" />
              <h2 className="mt-4 font-display text-3xl font-bold uppercase text-[#F6F1E7]">
                {copy.drawerEmptyTitle}
              </h2>
              <p className="mx-auto mt-2 max-w-md text-base text-[#C2B9AA]">{copy.drawerEmptyBody}</p>
              <Link
                href={`${lp}/single-pass`}
                locale={locale}
                className="mt-6 inline-flex min-h-[48px] items-center justify-center bg-[#25D366] px-6 py-3 text-sm font-extrabold uppercase tracking-wider text-[#050505] transition hover:bg-[#2EE472]"
              >
                {copy.drawerExploreCta}
              </Link>
            </div>
          )}

          {resumeOrderId && !paymentSession && (
            <div className="mt-8">
              {generalError ? (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="border-2 border-[#991B1B] bg-[#FEF2F2] p-8 text-center text-[#050505] sm:p-10"
                >
                  <AlertCircle className="mx-auto h-10 w-10 text-[#991B1B]" aria-hidden="true" />
                  <h2 className="mt-4 font-display text-3xl font-bold uppercase text-[#050505]">
                    {isIt ? `Ordine ${resumeOrderId}` : `Order ${resumeOrderId}`}
                  </h2>
                  <p className="mx-auto mt-3 max-w-lg text-base font-medium text-[#050505]">
                    {generalError}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <Link
                      href={`${lp}/account`}
                      locale={locale}
                      className="inline-flex min-h-[48px] items-center justify-center bg-[#050505] px-6 py-3 text-sm font-bold text-[#F6F1E7] transition hover:bg-[#1E1C19]"
                    >
                      {copy.navAccountLabel || (isIt ? 'Area Riservata' : 'Reserved Area')}
                    </Link>
                    <Link
                      href={`${lp}/single-pass`}
                      locale={locale}
                      className="inline-flex min-h-[48px] items-center justify-center border border-[#050505] bg-[#FFFFFF] px-6 py-3 text-sm font-bold text-[#050505]"
                    >
                      {copy.drawerExploreCta}
                    </Link>
                  </div>
                </div>
              ) : (
                <div
                  role="status"
                  aria-live="polite"
                  className="border border-[#F6F1E7]/18 bg-[#141311] p-10 text-center text-[#F6F1E7]"
                >
                  <ShieldCheck className="mx-auto h-10 w-10 text-[#25D366]" aria-hidden="true" />
                  <h2 className="mt-4 font-display text-3xl font-bold uppercase text-[#F6F1E7]">
                    {isIt ? `Verifica ordine ${resumeOrderId}` : `Verifying order ${resumeOrderId}`}
                  </h2>
                  <p className="mx-auto mt-2 max-w-md text-base text-[#C2B9AA]">
                    {isIt
                      ? 'Caricamento della sessione sicura di pagamento in corso...'
                      : 'Loading secure on-site payment session...'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* STEP 2 — Sessione Pagamento Carta / Apple Pay / Google Pay */}
      {paymentSession ? (
        <div className="bg-[#F6F1E7] text-[#050505]">
          <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-12 lg:px-8">
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
              <div className="space-y-4 border border-[#050505] bg-[#EAE3D5] p-6 text-[#050505]">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#4A453E]">
                  {isIt ? 'CONTO CONFERMATO' : 'CONFIRMED SUMMARY'}
                </p>
                <h2 className="font-display text-2xl font-bold uppercase text-[#050505]">
                  {copy.orderIdLabel}: {paymentSession.orderId}
                </h2>
                <div className="space-y-1 border border-[#050505]/20 bg-[#F6F1E7] p-3.5 text-sm text-[#4A453E]">
                  <p>
                    <strong className="text-[#050505]">{paymentSession.fullName}</strong>
                  </p>
                  <p>{paymentSession.email}</p>
                  <p className="font-mono font-semibold tabular-nums text-[#050505]">
                    {paymentSession.phone}
                  </p>
                </div>
                <div className="space-y-2 border-t border-[#050505]/20 pt-3 text-sm tabular-nums">
                  <div className="flex justify-between text-[#4A453E]">
                    <span>{copy.basePriceLabel}</span>
                    <span className="font-semibold text-[#050505]">
                      {formatEurFromCents(paymentSession.subtotalBaseCents, locale)}
                    </span>
                  </div>
                  {paymentSession.feeCents > 0 && (
                    <div className="flex justify-between gap-3 text-[#4A453E]">
                      <span>
                        {formatFeeLabel35(
                          locale,
                          paymentSession.feeRate,
                          paymentSession.hasMixedFeeRates,
                        )}
                      </span>
                      <span className="shrink-0 font-semibold text-[#050505]">
                        +{formatEurFromCents(paymentSession.feeCents, locale)}
                      </span>
                    </div>
                  )}
                  <div className="flex items-baseline justify-between border-t border-[#050505] pt-3 text-base font-extrabold text-[#050505]">
                    <span>{copy.totalLabel} (EUR)</span>
                    <span className="font-display text-3xl font-extrabold text-[#050505]">
                      {formatEurFromCents(paymentSession.totalEurCents, locale)}
                    </span>
                  </div>
                  {paymentSession.presentmentCurrency !== 'EUR' && (
                    <>
                      <div className="flex justify-between border border-[#050505] bg-[#FFFFFF] p-3 font-extrabold text-[#050505]">
                        <span>{paymentSession.presentmentCurrency}</span>
                        <span>
                          {formatMinorCurrency(
                            paymentSession.presentmentTotalMinor,
                            paymentSession.presentmentCurrency,
                            locale,
                          )}
                        </span>
                      </div>
                      <p className="text-right font-mono text-xs text-[#4A453E]">
                        FX: 1 EUR = {paymentSession.fxRate.toFixed(4)}{' '}
                        {paymentSession.presentmentCurrency}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      ) : !resumeOrderId && items.length > 0 ? (
        <form noValidate onSubmit={handleInitPayment} className="w-full">
          {/* CAPITOLO 01B — NOTTE #050505: Articoli & Valuta */}
          <div className="bg-[#050505] pb-10 text-[#F6F1E7]">
            <div className="mx-auto max-w-4xl space-y-4 px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#EAE3D5]">
                  01 · {isIt ? 'I TUOI PACCHETTI' : 'SELECTED PACKAGES'} ({totalGuests}{' '}
                  {totalGuests === 1 ? uxCopy.guestUnitSingular : uxCopy.guestsUnit})
                </p>
                <div className="flex flex-wrap items-center gap-1.5">
                  {supportedCurrencies.slice(0, 5).map((cur) => {
                    const isCurActive = currency === cur;
                    return (
                      <button
                        key={cur}
                        type="button"
                        onClick={() => setCurrency(cur as SupportedCurrency)}
                        className={`min-h-[36px] px-2.5 py-1 font-mono text-xs font-bold tabular-nums transition ${
                          isCurActive
                            ? 'bg-[#EAE3D5] text-[#050505]'
                            : 'border border-[#F6F1E7]/22 bg-[#141311] text-[#C2B9AA] hover:border-[#F6F1E7] hover:text-[#F6F1E7]'
                        }`}
                      >
                        {cur}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div
                id="sp-cart-items"
                data-no-lightbox="true"
                tabIndex={-1}
                className="space-y-3 focus:outline-none"
              >
                {items.map((item) => {
                  const sku = resolveCatalogSku(item.skuId);
                  if (!sku) return null;
                  const venue = VENUE_BY_ID[sku.venueId];
                  const venueName = sku.venueNameOverride || venue?.name || 'Nightlife Milan';
                  const skuFeeRate = getSkuFeeRate(sku, item.channel || 'venue');
                  const p = computeSinglePassPrice(sku.basePriceCents, item.quantity, skuFeeRate);
                  const itemGuestCount = Math.max(0, sku.guestsPerUnit ?? 1) * item.quantity;
                  const perGuestCents =
                    itemGuestCount > 1 ? Math.round(p.lineBaseCents / itemGuestCount) : 0;

                  return (
                    <div
                      key={cartRowKey(item)}
                      className="flex flex-col gap-4 border border-[#F6F1E7]/18 bg-[#141311] p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-start gap-3.5 min-w-0 flex-1">
                        {venue?.posterSrc && (
                          <img
                            src={venue.posterSrc}
                            alt={venueName}
                            width={72}
                            height={90}
                            loading="lazy"
                            decoding="async"
                            className="aspect-[4/5] w-16 shrink-0 border border-[#F6F1E7]/16 object-cover sm:w-20"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-mono text-xs font-bold uppercase tracking-wide text-[#EAE3D5] tabular-nums">
                              {venueName} · {sku.arrivalTime}
                            </p>
                            {item.channel === 'single-pass' && (
                              <span className="border border-[#EAE3D5]/35 bg-[#050505] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#EAE3D5]">
                                Single Pass
                              </span>
                            )}
                          </div>
                          <h2 className="mt-1 font-display text-xl font-bold text-[#F6F1E7]">
                            {sku.venueId === 'aprica-world-winter-week'
                              ? localizeSinglePassSku(sku, locale, copy, venueName).title
                              : isIt
                                ? sku.titleIt
                                : sku.titleEn}
                          </h2>
                          <p className="mt-1 text-xs font-medium text-[#C2B9AA] tabular-nums">
                            {itemGuestCount > 0
                              ? `${itemGuestCount} ${
                                  itemGuestCount === 1 ? uxCopy.guestUnitSingular : uxCopy.guestsUnit
                                }`
                              : formatZeroGuestAddonBadge35(locale, sku.venueId)}
                            {perGuestCents > 0
                              ? ` · ${formatEurFromCents(perGuestCents, locale)} / ${uxCopy.guestUnitSingular}`
                              : ''}
                          </p>
                          {item.dietaryChoice && (!sku.requiresDietary || Boolean(sku.dietaryPreset)) && (
                            <p className="mt-1 text-xs text-[#EAE3D5]">{item.dietaryChoice}</p>
                          )}
                          {sku.requiresDietary && !sku.dietaryPreset && (
                            <select
                              aria-label={copy.formDietary}
                              value={
                                DINNER_DIETARY_OPTIONS.some((o) => o.value === item.dietaryChoice)
                                  ? item.dietaryChoice
                                  : DINNER_DIETARY_OPTIONS[0].value
                              }
                              onChange={(e) => updateDietary(item.skuId, e.target.value, item.channel)}
                              className="mt-2 h-11 border border-[#F6F1E7]/30 bg-[#050505] px-3 text-sm text-[#F6F1E7]"
                            >
                              {DINNER_DIETARY_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {isIt ? opt.labelIt : opt.labelEn}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 border-t border-[#F6F1E7]/12 pt-3 sm:border-t-0 sm:pt-0">
                        <div className="inline-flex items-center border border-[#F6F1E7]/28 bg-[#050505]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.skuId, item.quantity - 1, item.channel)}
                            className="flex h-11 w-11 items-center justify-center text-[#F6F1E7] hover:bg-[#1E1C19]"
                            aria-label="Decrease"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-[2.25rem] text-center font-mono text-sm font-bold tabular-nums text-[#F6F1E7]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.skuId, item.quantity + 1, item.channel)}
                            className="flex h-11 w-11 items-center justify-center text-[#F6F1E7] hover:bg-[#1E1C19]"
                            aria-label="Increase"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <span className="block font-display text-2xl font-extrabold tabular-nums text-[#F6F1E7]">
                            {formatEurFromCents(p.lineBaseCents, locale)}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.skuId, item.channel)}
                          aria-label={copy.removeItemLabel}
                          className="flex h-11 w-11 items-center justify-center border border-[#F6F1E7]/20 bg-[#050505] text-[#C2B9AA] hover:border-[#F6F1E7] hover:text-[#F6F1E7]"
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
                    className="border-2 border-[#991B1B] bg-[#FEF2F2] p-4 text-sm text-[#050505]"
                  >
                    <div className="flex items-start gap-2.5">
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#991B1B]" />
                      <div className="space-y-2">
                        <p className="font-bold text-[#991B1B]">{uxCopy.cartFixHeading}</p>
                        <p>{formatCartValidationError35(locale, cartValidation.errorCode)}</p>
                        <Link
                          href={`${lp}/cart`}
                          locale={locale}
                          className="inline-flex min-h-[40px] items-center gap-1.5 border border-[#050505] bg-[#FFFFFF] px-3.5 py-2 text-[13px] font-bold text-[#050505] hover:bg-[#050505] hover:text-[#F6F1E7]"
                        >
                          {uxCopy.cartFixCta}
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CAPITOLO 02 — CHAMPAGNE #EAE3D5: Conto Trasparente & Valuta */}
          <div className="border-y border-[#050505] bg-[#EAE3D5] py-8 text-[#050505]">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#050505]/20 pb-4">
                <div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#4A453E]">
                    02 · {isIt ? 'CONTO TRASPARENTE' : 'TRANSPARENT BREAKDOWN'}
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-bold uppercase text-[#050505] sm:text-3xl">
                    {isIt ? 'Riepilogo Importi' : 'Order Breakdown'}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="sp-currency" className="text-xs font-bold uppercase text-[#4A453E]">
                    {copy.currencySelectorLabel}
                  </label>
                  <select
                    id="sp-currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as SupportedCurrency)}
                    className="h-11 border border-[#050505] bg-[#FFFFFF] px-3 font-mono text-sm font-bold tabular-nums text-[#050505]"
                  >
                    {supportedCurrencies.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 space-y-2.5 text-sm tabular-nums sm:text-base">
                <div className="flex justify-between text-[#4A453E]">
                  <span>{copy.guestsLabel}</span>
                  <span className="font-mono font-bold text-[#050505]">{totalGuests}</span>
                </div>
                <div className="flex justify-between text-[#4A453E]">
                  <span>{copy.basePriceLabel}</span>
                  <span className="font-mono font-semibold text-[#050505]">
                    {formatEurFromCents(subtotalBaseCents, locale)}
                  </span>
                </div>
                {totalFeeCents > 0 && (
                  <div className="flex justify-between gap-4 text-[#050505]">
                    <span className="font-semibold">{feeLabel}</span>
                    <span className="shrink-0 font-mono font-bold">
                      +{formatEurFromCents(totalFeeCents, locale)}
                    </span>
                  </div>
                )}
                <div className="flex items-baseline justify-between border-t border-[#050505] pt-3.5">
                  <span className="text-base font-extrabold uppercase tracking-wide text-[#050505]">
                    {copy.totalLabel} (EUR)
                  </span>
                  <span className="font-display text-3xl font-extrabold text-[#050505] sm:text-4xl">
                    {formatEurFromCents(grandTotalCents, locale)}
                  </span>
                </div>

                {currency !== 'EUR' && (
                  <div className="mt-3 border border-[#050505] bg-[#F6F1E7] p-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-extrabold uppercase text-[#050505]">
                        {copy.chargedInCurrencyLabel} ({currency})
                      </span>
                      <span className="font-display text-2xl font-extrabold text-[#050505]">
                        {formatMinorCurrency(convertedTotalMinor, currency, locale)}
                      </span>
                    </div>
                    <p className="mt-1 text-right font-mono text-xs text-[#4A453E]">
                      1 EUR = {currentFxRate.toFixed(4)} {currency} · {copy.fxRateNotice}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CAPITOLO 03 — CARTA CALDA #F6F1E7: Compilazione Dati & Preferenze */}
          <div className="bg-[#F6F1E7] py-10 text-[#050505]">
            <div className="mx-auto max-w-4xl space-y-6 px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#050505]/20 pb-4">
                <div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#4A453E]">
                    03 · {isIt ? 'COMPILAZIONE SU CARTA CALDA' : 'GUEST REGISTRATION'}
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-bold uppercase text-[#050505] sm:text-3xl">
                    {isIt ? 'Dati Intestatario Pass' : 'Pass Holder Details'}
                  </h2>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                  <span className="bg-[#050505] px-2.5 py-1 text-[#F6F1E7]">
                    {uxCopy.requiredBadge} *
                  </span>
                  <span className="border border-[#050505]/30 bg-[#EAE3D5] px-2.5 py-1 text-[#050505]">
                    {uxCopy.optionalBadge}
                  </span>
                </div>
              </div>

              <p className="flex items-center gap-2 text-sm font-medium text-[#4A453E]">
                <Info className="h-4 w-4 shrink-0 text-[#050505]" aria-hidden="true" />
                <span>{uxCopy.requiredLegend}</span>
              </p>

              {/* Clickable Error Summary Banner */}
              {summaryItems.length > 0 && (
                <div
                  ref={errorSummaryRef}
                  tabIndex={-1}
                  role="alert"
                  aria-live="assertive"
                  data-checkout-error-summary
                  className="border-2 border-[#991B1B] bg-[#FEF2F2] p-5 text-[#050505] focus:outline-none"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#991B1B]" aria-hidden="true" />
                    <div className="flex-1">
                      <h3 className="text-base font-extrabold text-[#991B1B]">
                        {summaryItems.length === 1
                          ? uxCopy.errorSummarySingleTitle
                          : uxCopy.errorSummaryTitle}
                      </h3>
                      <p className="mt-0.5 text-sm text-[#4A453E]">{uxCopy.errorSummaryHint}</p>
                      <ul className="mt-3 space-y-2">
                        {summaryItems.map((item, idx) => (
                          <li key={`${item.field}-${idx}`}>
                            <button
                              type="button"
                              data-target-field={item.field}
                              onClick={() => jumpToField(item.field)}
                              className="inline-flex min-h-[38px] items-start gap-2 text-left text-sm font-bold text-[#991B1B] underline decoration-[#991B1B]/60 underline-offset-2 hover:text-[#050505]"
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

              {/* Row 1: Full Name */}
              <div>
                <div className="flex items-center justify-between gap-2">
                  <label htmlFor="sp-full-name" className="text-sm font-bold text-[#050505]">
                    {copy.formFullName} *
                  </label>
                  <span className="shrink-0 whitespace-nowrap bg-[#050505] px-2 py-0.5 text-xs font-bold text-[#F6F1E7]">
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
                  className={`mt-2 h-12 w-full px-3.5 text-base text-[#050505] placeholder:text-[#4A453E]/65 ${
                    fieldErrors.fullName
                      ? 'border-2 border-[#991B1B] bg-[#FEF2F2]'
                      : 'border border-[#050505] bg-[#FFFFFF]'
                  }`}
                />
                {fieldErrors.fullName && (
                  <p id="sp-full-name-error" className="mt-1.5 text-sm font-bold text-[#991B1B]">
                    {fieldErrors.fullName}
                  </p>
                )}
              </div>

              {/* Row 2: Age + Country side by side on mobile too */}
              <div className="grid grid-cols-[minmax(118px,38%)_1fr] items-end gap-3 sm:gap-5">
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <label htmlFor="sp-age" className="text-sm font-bold text-[#050505]">
                      {copy.formAge} *
                    </label>
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
                    className={`mt-2 h-12 w-full px-3.5 font-mono text-base tabular-nums text-[#050505] placeholder:text-[#4A453E]/65 ${
                      fieldErrors.age || (liveAgeCheck && !liveAgeCheck.ok)
                        ? 'border-2 border-[#991B1B] bg-[#FEF2F2]'
                        : 'border border-[#050505] bg-[#FFFFFF]'
                    }`}
                  />
                  {fieldErrors.age && (
                    <p id="sp-age-error" className="mt-1.5 text-sm font-bold text-[#991B1B]">
                      {fieldErrors.age}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <label htmlFor="sp-country" className="text-sm font-bold text-[#050505]">
                      {copy.formCountry} *
                    </label>
                    <span className="shrink-0 whitespace-nowrap bg-[#050505] px-2 py-0.5 text-xs font-bold text-[#F6F1E7]">
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
                    className={`mt-2 h-12 w-full px-3.5 text-base text-[#050505] placeholder:text-[#4A453E]/65 ${
                      fieldErrors.country
                        ? 'border-2 border-[#991B1B] bg-[#FEF2F2]'
                        : 'border border-[#050505] bg-[#FFFFFF]'
                    }`}
                  />
                  {fieldErrors.country && (
                    <p id="sp-country-error" className="mt-1.5 text-sm font-bold text-[#991B1B]">
                      {fieldErrors.country}
                    </p>
                  )}
                </div>
              </div>

              {(fieldErrors.age || (liveAgeCheck && !liveAgeCheck.ok)) &&
                displayedSuggestedVenues.length > 0 && (
                  <div className="border-2 border-[#991B1B] bg-[#FEF2F2] p-4 text-sm text-[#050505]">
                    <p className="font-bold text-[#991B1B]">
                      {liveAgeCheck && !liveAgeCheck.ok
                        ? mapApiCodeToMessage(liveAgeCheck.errorCode)
                        : fieldErrors.age}
                    </p>
                    <p className="mt-2 font-semibold text-[#050505]">
                      {uxCopy.suggestedVenuesHeading}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {displayedSuggestedVenues.map((vid) => {
                        const v = VENUE_BY_ID[vid];
                        if (!v) return null;
                        const hasSinglePassInCart = items.some((i) => i.channel === 'single-pass');
                        const suggestedHref =
                          hasSinglePassInCart && STOREFRONT_VENUE_ID_SET.has(vid)
                            ? `${lp}/single-pass#single-pass-${vid}`
                            : capodannoEventPath(v.eventSlug, locale);
                        return (
                          <Link
                            key={vid}
                            href={suggestedHref}
                            locale={locale}
                            className="inline-flex min-h-[40px] items-center gap-1.5 border border-[#050505] bg-[#FFFFFF] px-3 py-1.5 text-[13px] font-bold text-[#050505] hover:bg-[#050505] hover:text-[#F6F1E7]"
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
                <div className="border border-[#050505] bg-[#EAE3D5] p-3.5 text-sm font-medium text-[#050505]">
                  {copy.bischeriAdvisory}
                </div>
              )}

              {/* Row 3: WhatsApp + Email */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <label htmlFor="sp-whatsapp" className="text-sm font-bold text-[#050505]">
                      {copy.formWhatsapp} *
                    </label>
                    <span className="shrink-0 whitespace-nowrap bg-[#050505] px-2 py-0.5 text-xs font-bold text-[#F6F1E7]">
                      {uxCopy.requiredBadge} *
                    </span>
                  </div>
                  <input
                    id="sp-whatsapp"
                    type="tel"
                    dir="ltr"
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
                    className={`mt-2 h-12 w-full px-3.5 font-mono text-base tabular-nums text-[#050505] placeholder:text-[#4A453E]/65 ${
                      fieldErrors.whatsapp
                        ? 'border-2 border-[#991B1B] bg-[#FEF2F2]'
                        : 'border border-[#050505] bg-[#FFFFFF]'
                    }`}
                  />
                  <p id="sp-whatsapp-hint" className="mt-1.5 text-xs text-[#4A453E]">
                    {copy.formWhatsappHint}
                  </p>
                  {fieldErrors.whatsapp && (
                    <p id="sp-whatsapp-error" className="mt-1 text-sm font-bold text-[#991B1B]">
                      {fieldErrors.whatsapp}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <label htmlFor="sp-email" className="text-sm font-bold text-[#050505]">
                      {copy.formEmail} *
                    </label>
                    <span className="shrink-0 whitespace-nowrap bg-[#050505] px-2 py-0.5 text-xs font-bold text-[#F6F1E7]">
                      {uxCopy.requiredBadge} *
                    </span>
                  </div>
                  <input
                    id="sp-email"
                    type="email"
                    dir="ltr"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      clearFieldError('email');
                    }}
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? 'sp-email-error' : undefined}
                    placeholder={uxCopy.emailPlaceholder}
                    className={`mt-2 h-12 w-full px-3.5 text-base text-[#050505] placeholder:text-[#4A453E]/65 ${
                      fieldErrors.email
                        ? 'border-2 border-[#991B1B] bg-[#FEF2F2]'
                        : 'border border-[#050505] bg-[#FFFFFF]'
                    }`}
                  />
                  {fieldErrors.email && (
                    <p id="sp-email-error" className="mt-1.5 text-sm font-bold text-[#991B1B]">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* ALWAYS VISIBLE & ALWAYS OPTIONAL: Allergies & Dietary Notes */}
              <div className="border-t border-[#050505]/18 pt-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label htmlFor="sp-notes" className="text-sm font-bold text-[#050505]">
                    {hasTerrazzaDuomo21 ? terrazzaUi.allergiesLabel : copy.formDietary}
                  </label>
                  <span className="shrink-0 whitespace-nowrap border border-[#050505]/30 bg-[#EAE3D5] px-2.5 py-0.5 text-xs font-bold text-[#050505]">
                    {uxCopy.optionalBadge}
                  </span>
                </div>
                <p className="mt-1 max-w-[54ch] text-xs text-[#4A453E]">
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
                        className={`nlm-pressable inline-flex min-h-[38px] items-center gap-1.5 border px-3 py-1.5 text-xs font-bold transition ${
                          isChipActive
                            ? 'border-[#050505] bg-[#050505] text-[#F6F1E7]'
                            : 'border-[#050505]/40 bg-[#FFFFFF] text-[#050505] hover:border-[#050505]'
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
                  className="mt-2.5 w-full border border-[#050505] bg-[#FFFFFF] p-3 text-base text-[#050505] placeholder:text-[#4A453E]/65"
                />
              </div>

              {/* Collapsible Optional Drawer: Spoken Languages & Member Password */}
              <div className="border border-[#050505]/30 bg-[#EAE3D5]">
                <button
                  type="button"
                  aria-expanded={isOptionalDrawerOpen}
                  onClick={() => setExtraOpen((prev) => !prev)}
                  className="flex min-h-[48px] w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-bold text-[#050505]"
                >
                  <span>
                    {isIt
                      ? 'Opzioni facoltative: Lingue parlate e salvataggio Area Riservata'
                      : 'Optional preferences: Spoken languages & Reserved Area account'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4A453E]">
                    <span>{uxCopy.optionalBadge}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${isOptionalDrawerOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </span>
                </button>

                {isOptionalDrawerOpen && (
                  <div className="space-y-5 border-t border-[#050505]/20 bg-[#F6F1E7] p-4 sm:p-5">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-[#050505]">{copy.formLanguages}</span>
                        <span className="border border-[#050505]/30 bg-[#EAE3D5] px-2 py-0.5 text-xs font-bold text-[#050505]">
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
                              className={`nlm-pressable min-h-[38px] border px-3 py-1.5 text-xs font-bold transition ${
                                active
                                  ? 'border-[#050505] bg-[#050505] text-[#F6F1E7]'
                                  : 'border-[#050505]/40 bg-[#FFFFFF] text-[#050505] hover:border-[#050505]'
                              }`}
                            >
                              {langOption}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {!isSignedIn && (
                      <div className="space-y-3 border border-[#050505]/25 bg-[#EAE3D5] p-4">
                        <div className="flex items-center justify-between gap-2">
                          <label className="flex cursor-pointer items-center gap-3 text-sm font-bold text-[#050505]">
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
                              className="h-5 w-5 shrink-0 accent-[#050505]"
                            />
                            <span>{copy.formCreateAccountToggle}</span>
                          </label>
                          <span className="bg-[#FFFFFF] px-2 py-0.5 text-xs font-bold text-[#050505]">
                            {uxCopy.optionalBadge}
                          </span>
                        </div>
                        <p className="text-xs text-[#4A453E]">{uxCopy.createAccountHint}</p>

                        {(createAccount || Boolean(fieldErrors.password)) && (
                          <div className="pt-1">
                            <div className="flex items-center justify-between gap-2">
                              <label htmlFor="sp-password" className="text-sm font-bold text-[#050505]">
                                {copy.formPassword} *
                              </label>
                              <span className="shrink-0 whitespace-nowrap bg-[#050505] px-2 py-0.5 text-xs font-bold text-[#F6F1E7]">
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
                                fieldErrors.password
                                  ? 'sp-password-error sp-password-hint'
                                  : 'sp-password-hint'
                              }
                              placeholder={uxCopy.passwordPlaceholder}
                              className={`mt-2 h-12 w-full px-3.5 text-base text-[#050505] placeholder:text-[#4A453E]/65 ${
                                fieldErrors.password
                                  ? 'border-2 border-[#991B1B] bg-[#FEF2F2]'
                                  : 'border border-[#050505] bg-[#FFFFFF]'
                              }`}
                            />
                            <p id="sp-password-hint" className="mt-1 text-xs text-[#4A453E]">
                              {uxCopy.existingAccountHint}
                            </p>
                            {fieldErrors.password && (
                              <p id="sp-password-error" className="mt-1.5 text-sm font-bold text-[#991B1B]">
                                {fieldErrors.password}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {hasTerrazzaDuomo21 && (
                <div className="border border-[#050505] bg-[#EAE3D5] p-4 text-sm leading-relaxed text-[#050505]">
                  <p className="font-bold">{terrazzaUi.confirmationRefundNotice}</p>
                  <p className="mt-1 text-xs text-[#4A453E]">{terrazzaUi.entryCheckpointNotice}</p>
                </div>
              )}

              {/* Terms Acceptance Card on #FFFFFF */}
              <div
                className={`space-y-2.5 p-4 ${
                  fieldErrors.acceptedTerms
                    ? 'border-2 border-[#991B1B] bg-[#FEF2F2]'
                    : 'border border-[#050505] bg-[#FFFFFF]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <label className="flex min-h-[44px] cursor-pointer items-start gap-3 text-sm leading-relaxed text-[#050505]">
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
                      className="mt-1 h-5 w-5 shrink-0 accent-[#050505]"
                    />
                    <span>
                      {totalFeeCents > 0
                        ? formatTermsLabel35(locale, activeFeeRate, hasTerrazzaDuomo21)
                        : hasTerrazzaDuomo21
                          ? formatTermsLabel35(locale, 0, true)
                          : isIt
                            ? 'Accetto Termini e Condizioni, Privacy Policy e Politica di Rimborso di nightlifemilan.com e confermo i requisiti d’età del locale.'
                            : 'I accept the Terms & Conditions, Privacy Policy, and Refund Policy of nightlifemilan.com and confirm venue age requirements.'}{' '}
                      *
                    </span>
                  </label>
                  <span className="shrink-0 whitespace-nowrap bg-[#050505] px-2 py-0.5 text-xs font-bold text-[#F6F1E7]">
                    {uxCopy.requiredBadge} *
                  </span>
                </div>
                {fieldErrors.acceptedTerms && (
                  <p id="sp-terms-error" className="pl-8 text-sm font-bold text-[#991B1B]">
                    {fieldErrors.acceptedTerms}
                  </p>
                )}
                <div className="flex flex-wrap gap-4 pl-8 text-xs font-bold text-[#050505]">
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
          </div>

          {/* CAPITOLO 04 — PLINTO NOTTE #050505: Azione Pagamento #25D366 */}
          <div className="border-t border-[#F6F1E7]/16 bg-[#050505] py-8 text-[#F6F1E7]">
            <div className="mx-auto max-w-4xl space-y-4 px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#EAE3D5]">
                    04 · {isIt ? 'CONFERMA & PAGAMENTO IMMEDIATO' : 'INSTANT SECURE PAYMENT'}
                  </p>
                  <p className="mt-1 text-xs text-[#C2B9AA]">
                    {isIt
                      ? 'Apple Pay · Google Pay · Carta di credito o debito · Pass QR istantaneo'
                      : 'Apple Pay · Google Pay · Credit or Debit Card · Instant QR Pass'}
                  </p>
                </div>
                <p className="font-display text-3xl font-extrabold tabular-nums text-[#F6F1E7]">
                  {currency !== 'EUR'
                    ? formatMinorCurrency(convertedTotalMinor, currency, locale)
                    : formatEurFromCents(grandTotalCents, locale)}
                </p>
              </div>

              {submittedOnce && summaryItems.length > 0 && (
                <p className="border border-[#FCA5A5]/50 bg-[#7F1D1D] px-4 py-2.5 text-sm font-bold text-[#FEF2F2]">
                  {summaryItems.length === 1
                    ? uxCopy.errorSummarySingleTitle
                    : uxCopy.errorSummaryTitle}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="nlm-pressable flex min-h-[56px] w-full items-center justify-center gap-2.5 bg-[#25D366] px-6 py-4 text-sm font-extrabold uppercase tracking-[0.05em] text-[#050505] transition hover:bg-[#2EE472] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Lock className="h-4 w-4" aria-hidden="true" />
                <span>{submitting ? copy.paymentProcessingLabel : copy.formPayNowCta}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <p className="flex items-center justify-center gap-2 text-center text-xs text-[#C2B9AA]">
                <ShieldCheck className="h-4 w-4 shrink-0 text-[#25D366]" aria-hidden="true" />
                <span>nightlifemilan.com · Official Concierge & Encrypted Checkout</span>
              </p>
            </div>
          </div>
        </form>
      ) : null}
    </section>
  );
}
