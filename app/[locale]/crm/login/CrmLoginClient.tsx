'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  Database,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  LogIn,
  Mail,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import type { CrmAuthCopy } from '@/lib/crmAuthCopy';

function isValidEmail(raw: string): boolean {
  const value = raw.trim();
  return value.length >= 5 && value.length <= 200 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

export default function CrmLoginClient({
  locale,
  copy,
  next,
  initialTab,
  initialError,
  loggedOut,
  initialSent,
}: {
  locale: string;
  copy: CrmAuthCopy;
  next: string;
  initialTab: 'login' | 'recover';
  initialError: string;
  loggedOut: boolean;
  initialSent: boolean;
}) {
  const [tab, setTab] = useState<'login' | 'recover'>(initialTab);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [recoverSent, setRecoverSent] = useState(initialSent);
  const [bannerError, setBannerError] = useState<string>(() => {
    if (initialError === 'credentials') return copy.invalidCredentials;
    if (initialError === 'configuration') return copy.configError;
    if (initialError === 'invalid_email') return copy.recoverEmailInvalid;
    return '';
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const submitGuardRef = useRef(false);
  const alertRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bannerError || Object.keys(fieldErrors).length > 0) {
      alertRef.current?.focus();
    }
  }, [bannerError, fieldErrors]);

  const publicHomeHref = locale && locale !== 'en' ? `/${locale}` : '/';

  function focusField(fieldId: string) {
    const el = document.getElementById(fieldId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.focus();
    }
  }

  function switchTab(nextTab: 'login' | 'recover') {
    setTab(nextTab);
    setBannerError('');
    setFieldErrors({});
    if (nextTab === 'login') setRecoverSent(false);
  }

  async function handleLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitGuardRef.current) return;

    const errors: Record<string, string> = {};
    if (!username.trim()) errors['crm-username'] = copy.usernameRequired;
    if (!password) errors['crm-password'] = copy.passwordRequired;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setBannerError('');
      return;
    }

    submitGuardRef.current = true;
    setSubmitting(true);
    setFieldErrors({});
    setBannerError('');

    try {
      const response = await fetch('/api/crm/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password, locale, next }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        redirectTo?: string;
        error?: string;
      };
      if (response.ok && data.ok && data.redirectTo) {
        window.location.assign(data.redirectTo);
        return;
      }
      if (data.error === 'configuration') {
        setBannerError(copy.configError);
      } else {
        setBannerError(copy.invalidCredentials);
      }
    } catch {
      setBannerError(copy.invalidCredentials);
    } finally {
      submitGuardRef.current = false;
      setSubmitting(false);
    }
  }

  async function handleRecoverSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitGuardRef.current) return;

    if (!isValidEmail(recoveryEmail)) {
      setFieldErrors({ 'crm-recovery-email': copy.recoverEmailInvalid });
      setBannerError('');
      return;
    }

    submitGuardRef.current = true;
    setSubmitting(true);
    setFieldErrors({});
    setBannerError('');

    try {
      const response = await fetch('/api/crm/recover-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: recoveryEmail.trim(), locale }),
      });
      if (!response.ok) {
        setFieldErrors({ 'crm-recovery-email': copy.recoverEmailInvalid });
        return;
      }
      setRecoverSent(true);
    } catch {
      setRecoverSent(true);
    } finally {
      submitGuardRef.current = false;
      setSubmitting(false);
    }
  }

  const errorEntries = Object.entries(fieldErrors);

  return (
    <main className="crm-shell min-h-screen bg-[#0A0A0C] text-[#F6F1E7] lg:grid lg:grid-cols-[minmax(0,1.08fr)_minmax(460px,0.92fr)]">
      <section className="hidden min-h-screen flex-col justify-between border-r border-white/15 bg-[#0A0A0C] p-12 lg:flex xl:p-16">
        <div>
          <a
            href={publicHomeHref}
            className="inline-flex h-11 items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#F6F1E7]/75 transition-colors hover:text-[#FFFFFF]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {copy.backToPublicSite}
          </a>
          <p className="mt-10 text-xs font-bold uppercase tracking-[0.24em] text-[#EDEBE6]/70">
            {copy.eyebrow}
          </p>
          <h1 className="mt-5 max-w-xl font-serif text-5xl font-medium leading-[1.02] text-[#FFFFFF] xl:text-6xl">
            {copy.heroTitle}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-[#EDEBE6]/80">
            {copy.heroSubtitle}
          </p>
        </div>

        <div className="grid max-w-2xl grid-cols-3 gap-4 border-t border-white/15 pt-8">
          <div className="border border-white/15 bg-[#121318] p-4">
            <Database className="h-5 w-5 text-[#FFFFFF]" aria-hidden="true" />
            <p className="mt-4 text-sm font-medium leading-snug text-[#F6F1E7]">
              {copy.pillarContacts}
            </p>
          </div>
          <div className="border border-white/15 bg-[#121318] p-4">
            <BarChart3 className="h-5 w-5 text-[#FFFFFF]" aria-hidden="true" />
            <p className="mt-4 text-sm font-medium leading-snug text-[#F6F1E7]">
              {copy.pillarOrders}
            </p>
          </div>
          <div className="border border-white/15 bg-[#121318] p-4">
            <ShieldCheck className="h-5 w-5 text-[#FFFFFF]" aria-hidden="true" />
            <p className="mt-4 text-sm font-medium leading-snug text-[#F6F1E7]">
              {copy.pillarSecurity}
            </p>
          </div>
        </div>
      </section>

      <section className="flex min-h-screen flex-col justify-center bg-[#EDEBE6] px-4 py-10 text-[#0A0A0C] sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#0A0A0C]">
              NIGHTLIFE MILAN · CRM
            </span>
            <a
              href={publicHomeHref}
              className="inline-flex h-11 items-center gap-1.5 text-xs font-semibold text-[#0A0A0C] underline underline-offset-4"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              {copy.backToPublicSite}
            </a>
          </div>

          <div className="border border-[#0A0A0C] bg-[#FFFFFF] p-6 sm:p-8">
            <div className="grid grid-cols-2 border border-[#0A0A0C] bg-[#EDEBE6] p-1" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'login'}
                onClick={() => switchTab('login')}
                className={`inline-flex h-11 items-center justify-center gap-2 px-3 text-sm font-bold transition-colors ${
                  tab === 'login'
                    ? 'bg-[#0A0A0C] text-[#FFFFFF]'
                    : 'bg-transparent text-[#0A0A0C] hover:bg-black/5'
                }`}
              >
                <LogIn className="h-4 w-4" aria-hidden="true" />
                {copy.tabLogin}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'recover'}
                onClick={() => switchTab('recover')}
                className={`inline-flex h-11 items-center justify-center gap-2 px-3 text-sm font-bold transition-colors ${
                  tab === 'recover'
                    ? 'bg-[#0A0A0C] text-[#FFFFFF]'
                    : 'bg-transparent text-[#0A0A0C] hover:bg-black/5'
                }`}
              >
                <KeyRound className="h-4 w-4" aria-hidden="true" />
                {copy.tabRecover}
              </button>
            </div>

            {loggedOut && tab === 'login' && !bannerError && (
              <div
                role="status"
                className="mt-6 flex items-start gap-3 border border-[#15803D] bg-[#F0FDF4] px-4 py-3 text-sm font-medium text-[#14532D]"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{copy.loggedOutBanner}</span>
              </div>
            )}

            {(bannerError || errorEntries.length > 0) && (
              <div
                ref={alertRef}
                role="alert"
                tabIndex={-1}
                data-crm-error-summary="true"
                className="mt-6 border-2 border-[#B91C1C] bg-[#FEF2F2] p-4 text-sm text-[#7F1D1D] outline-none"
              >
                <div className="flex items-start gap-2.5 font-bold text-[#991B1B]">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{bannerError || copy.errorSummaryTitle}</span>
                </div>
                {errorEntries.length > 0 && (
                  <ul className="mt-2.5 space-y-1.5 pl-6">
                    {errorEntries.map(([fieldId, message]) => (
                      <li key={fieldId}>
                        <button
                          type="button"
                          onClick={() => focusField(fieldId)}
                          className="text-left font-semibold text-[#991B1B] underline underline-offset-2 hover:text-[#7F1D1D]"
                        >
                          {message}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {tab === 'login' ? (
              <form
                action="/api/crm/login"
                method="post"
                noValidate
                onSubmit={handleLoginSubmit}
                className="mt-6 space-y-5"
              >
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="next" value={next} />

                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-[#0A0A0C] lg:hidden">
                    {copy.loginHeading}
                  </h1>
                  <h2 className="hidden text-2xl font-bold tracking-tight text-[#0A0A0C] lg:block">
                    {copy.loginHeading}
                  </h2>
                  <p className="mt-1.5 text-sm leading-6 text-[#3A3C42]">{copy.loginLead}</p>
                  <p className="mt-2 text-xs font-medium text-[#4B4D55]">{copy.requiredLegend}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <label htmlFor="crm-username" className="text-sm font-bold text-[#0A0A0C]">
                      {copy.usernameLabel}
                    </label>
                    <span className="border border-[#0A0A0C]/25 bg-[#EDEBE6] px-2 py-0.5 text-[11px] font-semibold text-[#0A0A0C]">
                      {copy.requiredBadge}
                    </span>
                  </div>
                  <div
                    className={`mt-1.5 flex h-12 items-center border px-3 ${
                      fieldErrors['crm-username']
                        ? 'border-2 border-[#B91C1C] bg-[#FEF2F2]'
                        : 'border-[#0A0A0C] bg-[#FFFFFF] focus-within:ring-2 focus-within:ring-[#0A0A0C]'
                    }`}
                  >
                    <UserRound className="h-4 w-4 shrink-0 text-[#3A3C42]" aria-hidden="true" />
                    <input
                      id="crm-username"
                      type="text"
                      name="username"
                      autoComplete="username"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        if (fieldErrors['crm-username']) {
                          setFieldErrors((prev) => {
                            const copyErr = { ...prev };
                            delete copyErr['crm-username'];
                            return copyErr;
                          });
                        }
                      }}
                      aria-invalid={Boolean(fieldErrors['crm-username'])}
                      aria-describedby={fieldErrors['crm-username'] ? 'crm-username-error' : undefined}
                      placeholder={copy.usernamePlaceholder}
                      className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-[#0A0A0C] outline-none placeholder:text-[#6B6E76]"
                    />
                  </div>
                  {fieldErrors['crm-username'] && (
                    <p id="crm-username-error" className="mt-1.5 text-xs font-semibold text-[#B91C1C]">
                      {fieldErrors['crm-username']}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <label htmlFor="crm-password" className="text-sm font-bold text-[#0A0A0C]">
                      {copy.passwordLabel}
                    </label>
                    <span className="border border-[#0A0A0C]/25 bg-[#EDEBE6] px-2 py-0.5 text-[11px] font-semibold text-[#0A0A0C]">
                      {copy.requiredBadge}
                    </span>
                  </div>
                  <div
                    className={`mt-1.5 flex h-12 items-center border pl-3 pr-1 ${
                      fieldErrors['crm-password']
                        ? 'border-2 border-[#B91C1C] bg-[#FEF2F2]'
                        : 'border-[#0A0A0C] bg-[#FFFFFF] focus-within:ring-2 focus-within:ring-[#0A0A0C]'
                    }`}
                  >
                    <LockKeyhole className="h-4 w-4 shrink-0 text-[#3A3C42]" aria-hidden="true" />
                    <input
                      id="crm-password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (fieldErrors['crm-password']) {
                          setFieldErrors((prev) => {
                            const copyErr = { ...prev };
                            delete copyErr['crm-password'];
                            return copyErr;
                          });
                        }
                      }}
                      aria-invalid={Boolean(fieldErrors['crm-password'])}
                      aria-describedby={fieldErrors['crm-password'] ? 'crm-password-error' : undefined}
                      placeholder={copy.passwordPlaceholder}
                      className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-[#0A0A0C] outline-none placeholder:text-[#6B6E76]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      aria-label={showPassword ? copy.hidePassword : copy.showPassword}
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-[#0A0A0C] hover:bg-black/5"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Eye className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                  {fieldErrors['crm-password'] && (
                    <p id="crm-password-error" className="mt-1.5 text-xs font-semibold text-[#B91C1C]">
                      {fieldErrors['crm-password']}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 bg-[#D9381E] px-5 text-sm font-bold text-[#FFFFFF] transition-colors hover:bg-[#B82C15] disabled:opacity-65"
                >
                  <LogIn className="h-4 w-4" aria-hidden="true" />
                  {submitting ? copy.submittingLogin : copy.submitLogin}
                </button>

                <div className="border-t border-[#E5E2DC] pt-4">
                  <p className="text-xs text-[#3A3C42]">{copy.forgotPrompt}</p>
                  <button
                    type="button"
                    onClick={() => switchTab('recover')}
                    className="mt-1 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold text-[#0A0A0C] underline underline-offset-4 hover:text-[#D9381E]"
                  >
                    <KeyRound className="h-4 w-4" aria-hidden="true" />
                    {copy.forgotCta}
                  </button>
                </div>
              </form>
            ) : recoverSent ? (
              <div className="mt-6 space-y-5">
                <div
                  role="status"
                  className="border-2 border-[#15803D] bg-[#F0FDF4] p-5 text-[#14532D]"
                >
                  <div className="flex items-center gap-2.5 text-base font-bold">
                    <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <span>{copy.recoverSentTitle}</span>
                  </div>
                  <p className="mt-2.5 text-sm leading-6">{copy.recoverSentBody}</p>
                </div>
                <button
                  type="button"
                  onClick={() => switchTab('login')}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 border border-[#0A0A0C] bg-[#0A0A0C] px-5 text-sm font-bold text-[#FFFFFF] transition-colors hover:bg-[#22242A]"
                >
                  {copy.backToLogin}
                </button>
              </div>
            ) : (
              <form
                action="/api/crm/recover-request"
                method="post"
                noValidate
                onSubmit={handleRecoverSubmit}
                className="mt-6 space-y-5"
              >
                <input type="hidden" name="locale" value={locale} />

                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-[#0A0A0C] lg:hidden">
                    {copy.recoverHeading}
                  </h1>
                  <h2 className="hidden text-2xl font-bold tracking-tight text-[#0A0A0C] lg:block">
                    {copy.recoverHeading}
                  </h2>
                  <p className="mt-1.5 text-sm leading-6 text-[#3A3C42]">{copy.recoverLead}</p>
                  <p className="mt-2 text-xs font-medium text-[#4B4D55]">{copy.requiredLegend}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <label htmlFor="crm-recovery-email" className="text-sm font-bold text-[#0A0A0C]">
                      {copy.recoverEmailLabel}
                    </label>
                    <span className="border border-[#0A0A0C]/25 bg-[#EDEBE6] px-2 py-0.5 text-[11px] font-semibold text-[#0A0A0C]">
                      {copy.requiredBadge}
                    </span>
                  </div>
                  <div
                    className={`mt-1.5 flex h-12 items-center border px-3 ${
                      fieldErrors['crm-recovery-email']
                        ? 'border-2 border-[#B91C1C] bg-[#FEF2F2]'
                        : 'border-[#0A0A0C] bg-[#FFFFFF] focus-within:ring-2 focus-within:ring-[#0A0A0C]'
                    }`}
                  >
                    <Mail className="h-4 w-4 shrink-0 text-[#3A3C42]" aria-hidden="true" />
                    <input
                      id="crm-recovery-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={recoveryEmail}
                      onChange={(e) => {
                        setRecoveryEmail(e.target.value);
                        if (fieldErrors['crm-recovery-email']) {
                          setFieldErrors({});
                        }
                      }}
                      aria-invalid={Boolean(fieldErrors['crm-recovery-email'])}
                      aria-describedby={
                        fieldErrors['crm-recovery-email'] ? 'crm-recovery-email-error' : undefined
                      }
                      placeholder={copy.recoverEmailPlaceholder}
                      className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-[#0A0A0C] outline-none placeholder:text-[#6B6E76]"
                    />
                  </div>
                  {fieldErrors['crm-recovery-email'] && (
                    <p
                      id="crm-recovery-email-error"
                      className="mt-1.5 text-xs font-semibold text-[#B91C1C]"
                    >
                      {fieldErrors['crm-recovery-email']}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 bg-[#D9381E] px-5 text-sm font-bold text-[#FFFFFF] transition-colors hover:bg-[#B82C15] disabled:opacity-65"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {submitting ? copy.submittingRecover : copy.submitRecover}
                </button>

                <button
                  type="button"
                  onClick={() => switchTab('login')}
                  className="inline-flex h-11 w-full items-center justify-center border border-[#0A0A0C] bg-[#FFFFFF] px-4 text-sm font-bold text-[#0A0A0C] hover:bg-[#EDEBE6]"
                >
                  {copy.backToLogin}
                </button>
              </form>
            )}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-[#3A3C42]">
            <ShieldCheck className="h-4 w-4 shrink-0 text-[#0A0A0C]" aria-hidden="true" />
            <span>{copy.sessionFooterNote}</span>
          </div>
        </div>
      </section>
    </main>
  );
}
