'use client';

import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
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
import {
  SINGLE_PASS_FEE_RATE,
  SPOKEN_LANGUAGE_OPTIONS,
  VENUE_BY_ID,
  formatEurFromCents,
} from '@/lib/single-pass/catalog';
import { formatMinorCurrency } from '@/lib/single-pass/currency';
import {
  formatFeeLabel35,
  getCheckoutUxCopy,
  getSinglePassCopy,
  getTerrazzaCheckoutUi35,
} from '@/lib/single-pass/i18n35';
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

function isEmailValid(raw: string): boolean {
  const email = raw.trim();
  return email.length >= 5 && email.length <= 200 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function isWhatsappValid(raw: string): boolean {
  const digits = raw.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 18;
}

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
  const uxCopy = getCheckoutUxCopy(locale);
  const terrazzaUi = getTerrazzaCheckoutUi35(locale);
  const lp = localePrefix(locale);
  const isIt = locale === 'it';

  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState<MemberView | null>(null);
  const [orders, setOrders] = useState<SinglePassOrder[]>([]);
  const [paymentReady, setPaymentReady] = useState(false);
  const [statusBanner, setStatusBanner] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [authTab, setAuthTab] = useState<'login' | 'register' | 'lookup'>(initialTab || 'login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regAge, setRegAge] = useState('');
  const [regWhatsapp, setRegWhatsapp] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [lookupEmail, setLookupEmail] = useState('');
  const [lookupOrderId, setLookupOrderId] = useState(initialOrderId || '');

  const [editWhatsapp, setEditWhatsapp] = useState('');
  const [editLanguages, setEditLanguages] = useState<string[]>([]);
  const [savingProfile, setSavingProfile] = useState(false);
  const [payingOrderId, setPayingOrderId] = useState<string | null>(null);

  const clearErr = (k: string) => {
    setFieldErrors((prev) => {
      if (!prev[k]) return prev;
      const next = { ...prev };
      delete next[k];
      return next;
    });
  };

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
  }, [initialCheckoutState, initialOrderId, initialSessionId, isIt, clearCart]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const errs: Record<string, string> = {};
    if (!isEmailValid(loginEmail)) errs.loginEmail = uxCopy.errEmail;
    if (!loginPassword) errs.loginPassword = uxCopy.errPasswordShort;
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const res = await fetch('/api/single-pass/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginEmail.trim(), password: loginPassword }),
    });
    const data = (await res.json().catch(() => null)) as {
      ok?: boolean;
      error?: string;
    } | null;
    if (!res.ok || !data?.ok) {
      setErrorMsg(data?.error || uxCopy.errInvalidCredentials);
      return;
    }
    setFieldErrors({});
    await loadAccount();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const errs: Record<string, string> = {};
    const parsedAge = Number(regAge);
    if (regName.trim().length < 2) errs.regName = uxCopy.errFullName;
    if (!regAge.trim() || !Number.isFinite(parsedAge) || parsedAge < 18 || parsedAge > 99) {
      errs.regAge = parsedAge > 0 && parsedAge < 18 ? uxCopy.errUnder18 : uxCopy.errAgeInvalid;
    }
    if (!isWhatsappValid(regWhatsapp)) errs.regWhatsapp = uxCopy.errWhatsapp;
    if (!isEmailValid(regEmail)) errs.regEmail = uxCopy.errEmail;
    if (regPassword.trim().length < 8) errs.regPassword = uxCopy.errPasswordShort;
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const res = await fetch('/api/single-pass/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: regName.trim(),
        age: parsedAge,
        whatsapp: regWhatsapp.trim(),
        email: regEmail.trim(),
        password: regPassword.trim(),
      }),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!res.ok || !data?.ok) {
      setErrorMsg(data?.error || 'Registration failed');
      return;
    }
    setFieldErrors({});
    await loadAccount();
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const errs: Record<string, string> = {};
    if (!isEmailValid(lookupEmail)) errs.lookupEmail = uxCopy.errEmail;
    if (!lookupOrderId.trim()) errs.lookupOrderId = copy.orderCodeLabel;
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const res = await fetch('/api/single-pass/auth/order-lookup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: lookupEmail.trim(), orderId: lookupOrderId.trim() }),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!res.ok || !data?.ok) {
      setErrorMsg(data?.error || 'Order not found');
      return;
    }
    setFieldErrors({});
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
    setErrorMsg(null);
    if (!isWhatsappValid(editWhatsapp)) {
      setFieldErrors({ editWhatsapp: uxCopy.errWhatsapp });
      return;
    }
    setFieldErrors({});
    setSavingProfile(true);
    try {
      const res = await fetch('/api/single-pass/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          whatsapp: editWhatsapp.trim(),
          spokenLanguages: editLanguages,
        }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !data?.ok) {
        setErrorMsg(data?.error || 'Update failed');
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
      <div className="mb-8 flex flex-col gap-4 border-b border-[#0A0A0C]/16 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold tracking-wide text-[#4F4D48]">
            NIGHTLIFE MILAN · SINGLE PASS MEMBER PORTAL
          </p>
          <h1 className="mt-2 font-display text-4xl font-extrabold uppercase text-[#0A0A0C] sm:text-5xl">
            {copy.accountTitle}
          </h1>
          <p className="mt-2 max-w-2xl text-base text-[#4F4D48]">{copy.accountSubtitle}</p>
        </div>
        {member && (
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex min-h-[44px] items-center gap-2 border border-[#0A0A0C] bg-[#FFFFFF] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#0A0A0C] hover:bg-[#0A0A0C] hover:text-[#FFFFFF]"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            {copy.logoutCta}
          </button>
        )}
      </div>

      {statusBanner && (
        <div className="mb-6 flex items-start gap-3 border border-[#15803D] bg-[#FFFFFF] p-4 text-sm font-medium text-[#0A0A0C]">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" aria-hidden="true" />
          <p>{statusBanner}</p>
        </div>
      )}

      {(errorMsg || Object.keys(fieldErrors).length > 0) && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 border-2 border-[#B91C1C] bg-[#FEF2F2] p-4 text-sm font-semibold text-[#B91C1C]"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <div>
            {errorMsg && <p>{errorMsg}</p>}
            {Object.values(fieldErrors).map((m, i) => (
              <p key={i}>{m}</p>
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <div className="border border-[#0A0A0C]/16 bg-[#FFFFFF] p-12 text-center text-sm font-semibold text-[#4F4D48]">
          Loading Reserved Area...
        </div>
      ) : !member ? (
        <div className="mx-auto max-w-xl border border-[#0A0A0C]/18 bg-[#FFFFFF] p-6 text-[#0A0A0C] sm:p-8">
          <p className="mb-4 text-xs font-medium text-[#4F4D48]">{uxCopy.requiredLegend}</p>
          <div className="grid grid-cols-3 border-b border-[#0A0A0C]/15 pb-3 text-center text-xs font-bold uppercase">
            <button
              type="button"
              onClick={() => {
                setAuthTab('login');
                setFieldErrors({});
                setErrorMsg(null);
              }}
              className={`min-h-[44px] py-2.5 transition ${
                authTab === 'login' ? 'bg-[#0A0A0C] text-[#FFFFFF]' : 'text-[#4F4D48] hover:bg-[#EDEBE6]'
              }`}
            >
              {copy.tabLogin}
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthTab('register');
                setFieldErrors({});
                setErrorMsg(null);
              }}
              className={`min-h-[44px] py-2.5 transition ${
                authTab === 'register'
                  ? 'bg-[#0A0A0C] text-[#FFFFFF]'
                  : 'text-[#4F4D48] hover:bg-[#EDEBE6]'
              }`}
            >
              {copy.tabRegister}
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthTab('lookup');
                setFieldErrors({});
                setErrorMsg(null);
              }}
              className={`min-h-[44px] py-2.5 transition ${
                authTab === 'lookup'
                  ? 'bg-[#0A0A0C] text-[#FFFFFF]'
                  : 'text-[#4F4D48] hover:bg-[#EDEBE6]'
              }`}
            >
              {copy.tabOrderLookup}
            </button>
          </div>

          {authTab === 'login' && (
            <form noValidate onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <label htmlFor="acc-login-email" className="text-sm font-bold">
                    Email *
                  </label>
                  <span className="bg-[#0A0A0C] px-2 py-0.5 text-[11px] font-bold text-[#FFFFFF]">
                    {uxCopy.requiredBadge} *
                  </span>
                </div>
                <input
                  id="acc-login-email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => {
                    setLoginEmail(e.target.value);
                    clearErr('loginEmail');
                  }}
                  aria-invalid={Boolean(fieldErrors.loginEmail)}
                  className={`mt-1.5 h-12 w-full px-3 text-base ${
                    fieldErrors.loginEmail
                      ? 'border-2 border-[#B91C1C] bg-[#FEF2F2]'
                      : 'border border-[#0A0A0C]/30 bg-[#FFFFFF]'
                  }`}
                />
                {fieldErrors.loginEmail && (
                  <p className="mt-1 text-sm font-semibold text-[#B91C1C]">
                    {fieldErrors.loginEmail}
                  </p>
                )}
              </div>
              <div>
                <div className="flex items-center justify-between gap-2">
                  <label htmlFor="acc-login-pwd" className="text-sm font-bold">
                    Password *
                  </label>
                  <span className="bg-[#0A0A0C] px-2 py-0.5 text-[11px] font-bold text-[#FFFFFF]">
                    {uxCopy.requiredBadge} *
                  </span>
                </div>
                <input
                  id="acc-login-pwd"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                    clearErr('loginPassword');
                  }}
                  aria-invalid={Boolean(fieldErrors.loginPassword)}
                  className={`mt-1.5 h-12 w-full px-3 text-base ${
                    fieldErrors.loginPassword
                      ? 'border-2 border-[#B91C1C] bg-[#FEF2F2]'
                      : 'border border-[#0A0A0C]/30 bg-[#FFFFFF]'
                  }`}
                />
                {fieldErrors.loginPassword && (
                  <p className="mt-1 text-sm font-semibold text-[#B91C1C]">
                    {fieldErrors.loginPassword}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="min-h-[50px] w-full bg-[#D9381E] px-5 py-3 text-sm font-extrabold uppercase tracking-wider text-[#FFFFFF] hover:bg-[#B82B14]"
              >
                {copy.loginCta}
              </button>
            </form>
          )}

          {authTab === 'register' && (
            <form noValidate onSubmit={handleRegister} className="mt-6 space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="acc-reg-name" className="block text-sm font-bold">
                    {copy.formFullName} *
                  </label>
                  <input
                    id="acc-reg-name"
                    type="text"
                    value={regName}
                    onChange={(e) => {
                      setRegName(e.target.value);
                      clearErr('regName');
                    }}
                    aria-invalid={Boolean(fieldErrors.regName)}
                    className={`mt-1.5 h-12 w-full px-3 text-base ${
                      fieldErrors.regName
                        ? 'border-2 border-[#B91C1C] bg-[#FEF2F2]'
                        : 'border border-[#0A0A0C]/30 bg-[#FFFFFF]'
                    }`}
                  />
                  {fieldErrors.regName && (
                    <p className="mt-1 text-xs font-semibold text-[#B91C1C]">{fieldErrors.regName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="acc-reg-age" className="block text-sm font-bold">
                    {copy.formAge} *
                  </label>
                  <input
                    id="acc-reg-age"
                    type="number"
                    min={18}
                    max={99}
                    value={regAge}
                    onChange={(e) => {
                      setRegAge(e.target.value);
                      clearErr('regAge');
                    }}
                    aria-invalid={Boolean(fieldErrors.regAge)}
                    placeholder="28"
                    className={`mt-1.5 h-12 w-full px-3 text-base ${
                      fieldErrors.regAge
                        ? 'border-2 border-[#B91C1C] bg-[#FEF2F2]'
                        : 'border border-[#0A0A0C]/30 bg-[#FFFFFF]'
                    }`}
                  />
                  {fieldErrors.regAge && (
                    <p className="mt-1 text-xs font-semibold text-[#B91C1C]">{fieldErrors.regAge}</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="acc-reg-wa" className="block text-sm font-bold">
                  {copy.formWhatsapp} *
                </label>
                <input
                  id="acc-reg-wa"
                  type="tel"
                  value={regWhatsapp}
                  onChange={(e) => {
                    setRegWhatsapp(e.target.value);
                    clearErr('regWhatsapp');
                  }}
                  aria-invalid={Boolean(fieldErrors.regWhatsapp)}
                  placeholder={uxCopy.whatsappPlaceholder}
                  className={`mt-1.5 h-12 w-full px-3 text-base ${
                    fieldErrors.regWhatsapp
                      ? 'border-2 border-[#B91C1C] bg-[#FEF2F2]'
                      : 'border border-[#0A0A0C]/30 bg-[#FFFFFF]'
                  }`}
                />
                {fieldErrors.regWhatsapp && (
                  <p className="mt-1 text-xs font-semibold text-[#B91C1C]">
                    {fieldErrors.regWhatsapp}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="acc-reg-email" className="block text-sm font-bold">
                  Email *
                </label>
                <input
                  id="acc-reg-email"
                  type="email"
                  value={regEmail}
                  onChange={(e) => {
                    setRegEmail(e.target.value);
                    clearErr('regEmail');
                  }}
                  aria-invalid={Boolean(fieldErrors.regEmail)}
                  placeholder={uxCopy.emailPlaceholder}
                  className={`mt-1.5 h-12 w-full px-3 text-base ${
                    fieldErrors.regEmail
                      ? 'border-2 border-[#B91C1C] bg-[#FEF2F2]'
                      : 'border border-[#0A0A0C]/30 bg-[#FFFFFF]'
                  }`}
                />
                {fieldErrors.regEmail && (
                  <p className="mt-1 text-xs font-semibold text-[#B91C1C]">{fieldErrors.regEmail}</p>
                )}
              </div>
              <div>
                <label htmlFor="acc-reg-pwd" className="block text-sm font-bold">
                  Password (min. 8) *
                </label>
                <input
                  id="acc-reg-pwd"
                  type="password"
                  value={regPassword}
                  onChange={(e) => {
                    setRegPassword(e.target.value);
                    clearErr('regPassword');
                  }}
                  aria-invalid={Boolean(fieldErrors.regPassword)}
                  placeholder={uxCopy.passwordPlaceholder}
                  className={`mt-1.5 h-12 w-full px-3 text-base ${
                    fieldErrors.regPassword
                      ? 'border-2 border-[#B91C1C] bg-[#FEF2F2]'
                      : 'border border-[#0A0A0C]/30 bg-[#FFFFFF]'
                  }`}
                />
                {fieldErrors.regPassword && (
                  <p className="mt-1 text-xs font-semibold text-[#B91C1C]">
                    {fieldErrors.regPassword}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="min-h-[50px] w-full bg-[#D9381E] px-5 py-3 text-sm font-extrabold uppercase tracking-wider text-[#FFFFFF] hover:bg-[#B82B14]"
              >
                {copy.registerCta}
              </button>
            </form>
          )}

          {authTab === 'lookup' && (
            <form noValidate onSubmit={handleLookup} className="mt-6 space-y-4">
              <div>
                <label htmlFor="acc-lookup-email" className="block text-sm font-bold">
                  Email *
                </label>
                <input
                  id="acc-lookup-email"
                  type="email"
                  value={lookupEmail}
                  onChange={(e) => {
                    setLookupEmail(e.target.value);
                    clearErr('lookupEmail');
                  }}
                  aria-invalid={Boolean(fieldErrors.lookupEmail)}
                  className={`mt-1.5 h-12 w-full px-3 text-base ${
                    fieldErrors.lookupEmail
                      ? 'border-2 border-[#B91C1C] bg-[#FEF2F2]'
                      : 'border border-[#0A0A0C]/30 bg-[#FFFFFF]'
                  }`}
                />
                {fieldErrors.lookupEmail && (
                  <p className="mt-1 text-xs font-semibold text-[#B91C1C]">
                    {fieldErrors.lookupEmail}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="acc-lookup-id" className="block text-sm font-bold">
                  {copy.orderCodeLabel} *
                </label>
                <input
                  id="acc-lookup-id"
                  type="text"
                  value={lookupOrderId}
                  onChange={(e) => {
                    setLookupOrderId(e.target.value);
                    clearErr('lookupOrderId');
                  }}
                  aria-invalid={Boolean(fieldErrors.lookupOrderId)}
                  placeholder="NLM-SP-2026..."
                  className={`mt-1.5 h-12 w-full px-3 text-base uppercase ${
                    fieldErrors.lookupOrderId
                      ? 'border-2 border-[#B91C1C] bg-[#FEF2F2]'
                      : 'border border-[#0A0A0C]/30 bg-[#FFFFFF]'
                  }`}
                />
                {fieldErrors.lookupOrderId && (
                  <p className="mt-1 text-xs font-semibold text-[#B91C1C]">
                    {fieldErrors.lookupOrderId}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="min-h-[50px] w-full bg-[#D9381E] px-5 py-3 text-sm font-extrabold uppercase tracking-wider text-[#FFFFFF] hover:bg-[#B82B14]"
              >
                {copy.lookupCta}
              </button>
            </form>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          <section className="border border-[#0A0A0C]/16 bg-[#FFFFFF] p-6 text-[#0A0A0C] sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="text-xs font-bold text-[#4F4D48]">
                  {member.fullName} · {member.age} anni · {member.email}
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold uppercase text-[#0A0A0C]">
                  {copy.miniGroupHeading}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-[#4F4D48]">
                  {orders.some((o) => o.whatsappGroupInviteUrl)
                    ? copy.miniGroupActiveBody
                    : copy.miniGroupScheduledBody}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 border border-[#0A0A0C]/20 bg-[#EDEBE6] px-3 py-2 text-xs font-bold text-[#0A0A0C]">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  20/12/2026 · Lista / Tavolo NIGHTLIFE MILAN
                </div>
              </div>

              <form
                noValidate
                onSubmit={handleSaveProfile}
                className="space-y-3 border border-[#0A0A0C]/15 bg-[#EDEBE6] p-4"
              >
                <div>
                  <label htmlFor="acc-edit-wa" className="block text-xs font-bold text-[#0A0A0C]">
                    {copy.formWhatsapp} *
                  </label>
                  <input
                    id="acc-edit-wa"
                    type="tel"
                    value={editWhatsapp}
                    onChange={(e) => {
                      setEditWhatsapp(e.target.value);
                      clearErr('editWhatsapp');
                    }}
                    aria-invalid={Boolean(fieldErrors.editWhatsapp)}
                    className={`mt-1 h-11 w-full px-3 text-sm ${
                      fieldErrors.editWhatsapp
                        ? 'border-2 border-[#B91C1C] bg-[#FEF2F2]'
                        : 'border border-[#0A0A0C]/30 bg-[#FFFFFF]'
                    }`}
                  />
                  {fieldErrors.editWhatsapp && (
                    <p className="mt-1 text-xs font-semibold text-[#B91C1C]">
                      {fieldErrors.editWhatsapp}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0A0A0C]">{copy.formLanguages}</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {SPOKEN_LANGUAGE_OPTIONS.slice(0, 6).map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => toggleEditLang(l)}
                        className={`border px-2.5 py-1 text-xs font-semibold ${
                          editLanguages.includes(l)
                            ? 'border-[#0A0A0C] bg-[#0A0A0C] text-[#FFFFFF]'
                            : 'border-[#0A0A0C]/25 bg-[#FFFFFF] text-[#0A0A0C]'
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
                  className="min-h-[44px] w-full bg-[#0A0A0C] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#FFFFFF] hover:bg-[#D9381E]"
                >
                  {savingProfile ? '...' : copy.updateProfileCta}
                </button>
              </form>
            </div>
          </section>

          <section className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-3xl font-bold uppercase text-[#0A0A0C]">
                {isIt ? `I tuoi Single Pass (${orders.length})` : `Your Single Passes (${orders.length})`}
              </h2>
              <Link
                href={`${lp}/single-pass`}
                locale={locale}
                className="inline-flex min-h-[44px] items-center gap-2 border border-[#0A0A0C] bg-[#FFFFFF] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#0A0A0C] hover:bg-[#0A0A0C] hover:text-[#FFFFFF]"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                + {copy.filterAllVenues}
              </Link>
            </div>

            {orders.length === 0 ? (
              <div className="border border-[#0A0A0C]/16 bg-[#FFFFFF] p-8 text-center">
                <p className="text-base text-[#4F4D48]">{copy.drawerEmptyBody}</p>
                <Link
                  href={`${lp}/single-pass`}
                  locale={locale}
                  className="mt-4 inline-flex min-h-[46px] items-center bg-[#D9381E] px-6 py-2.5 text-sm font-bold text-[#FFFFFF]"
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
                  typeof order.feeRate === 'number'
                    ? order.feeRate
                    : feeRates.size === 1
                      ? Array.from(feeRates)[0]
                      : SINGLE_PASS_FEE_RATE,
                  feeRates.size > 1,
                );
                return (
                  <article
                    key={order.id}
                    className="border border-[#0A0A0C]/16 bg-[#FFFFFF] p-6"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#0A0A0C]/14 pb-4">
                      <div>
                        <span
                          className={`inline-block px-3 py-1 text-xs font-bold uppercase ${
                            isPaid ? 'bg-[#15803D] text-[#FFFFFF]' : 'bg-[#0A0A0C] text-[#FFFFFF]'
                          }`}
                        >
                          {isPaid ? copy.passStatusPaid : copy.passStatusPending}
                        </span>
                        <p className="mt-2 text-sm font-bold tabular-nums text-[#0A0A0C]">
                          {order.id} · PIN {order.accessPin}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-[#4F4D48]">
                        <QrCode className="h-5 w-5 text-[#0A0A0C]" aria-hidden="true" />
                        <span>Lista NIGHTLIFE MILAN</span>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      {order.items.map((item) => {
                        const venueSpec = VENUE_BY_ID[item.venueId];
                        return (
                          <div
                            key={`${order.id}-${item.skuId}`}
                            className="flex flex-col justify-between gap-2 border border-[#0A0A0C]/12 bg-[#EDEBE6] p-4 sm:flex-row sm:items-center"
                          >
                            <div>
                              <p className="font-display text-xl font-bold text-[#0A0A0C]">
                                {item.venueName} · {item.title} x {item.quantity}
                              </p>
                              <p className="mt-1 text-xs text-[#4F4D48]">
                                {venueSpec?.address} · {copy.arrivalLabel}: {item.arrivalTime}
                                {item.dietaryChoice ? ` · ${item.dietaryChoice}` : ''}
                              </p>
                              {venueSpec && (
                                <p className="mt-0.5 text-xs text-[#4F4D48]">
                                  Dress code: {isIt ? venueSpec.dressCodeIt : venueSpec.dressCodeEn}
                                </p>
                              )}
                            </div>
                            <p className="text-base font-extrabold tabular-nums text-[#0A0A0C]">
                              {formatEurFromCents(item.lineBaseCents, locale)}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-4 grid gap-2 border-t border-[#0A0A0C]/12 pt-4 text-xs tabular-nums sm:grid-cols-3">
                      <div className="text-[#4F4D48]">
                        {copy.basePriceLabel}: {formatEurFromCents(order.subtotalBaseCents, locale)}
                      </div>
                      {order.feeCents > 0 && (
                        <div className="text-[#4F4D48]">
                          {orderFeeLabel}: {formatEurFromCents(order.feeCents, locale)}
                        </div>
                      )}
                      <div className="font-bold text-[#0A0A0C] sm:text-right">
                        {copy.totalLabel}: {formatEurFromCents(order.totalCents, locale)}
                        {order.presentmentCurrency && order.presentmentCurrency !== 'EUR' && (
                          <span className="ml-2 text-[#D9381E]">
                            (
                            {formatMinorCurrency(
                              order.presentmentTotalMinor,
                              order.presentmentCurrency,
                              locale,
                            )}
                            )
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
                          className="inline-flex min-h-[46px] items-center gap-2 bg-[#D9381E] px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#FFFFFF] hover:bg-[#B82B14]"
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
                          className="inline-flex min-h-[46px] items-center gap-2 bg-[#25D366] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0A0A0C]"
                        >
                          <MessageCircle className="h-4 w-4" aria-hidden="true" />
                          {copy.openMiniGroupCta}
                        </a>
                      )}
                      {!order.whatsappGroupInviteUrl && hasSinglePassVenue && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-[#4F4D48]">
                          <ShieldCheck className="h-4 w-4 text-[#0A0A0C]" aria-hidden="true" />
                          WhatsApp Group: dal 20 dicembre 2026 su {order.customer.whatsapp}
                        </span>
                      )}
                      {isTerrazzaOrder && (
                        <p className="w-full border border-[#0A0A0C]/16 bg-[#EDEBE6] p-3 text-xs text-[#0A0A0C]">
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
