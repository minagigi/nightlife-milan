'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Copy,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
} from 'lucide-react';
import type { CrmAuthCopy } from '@/lib/crmAuthCopy';

export default function CrmRecoverClient({
  locale,
  copy,
  token,
  initialValid,
  initialReason,
  loginRecoverHref,
}: {
  locale: string;
  copy: CrmAuthCopy;
  token: string;
  initialValid: boolean;
  initialReason?: 'missing' | 'invalid_or_expired' | 'used';
  loginRecoverHref: string;
}) {
  const [unlocking, setUnlocking] = useState(false);
  const [tokenState, setTokenState] = useState<'ready' | 'invalid' | 'used' | 'unlocked'>(() => {
    if (!initialValid) {
      return initialReason === 'used' ? 'used' : 'invalid';
    }
    return 'ready';
  });

  const [foundUsername, setFoundUsername] = useState('');
  const [foundPassword, setFoundPassword] = useState('');
  const [crmHref, setCrmHref] = useState(locale && locale !== 'en' ? `/${locale}/crm` : '/crm');
  const [showFoundPassword, setShowFoundPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<'user' | 'pass' | null>(null);

  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [savingCredentials, setSavingCredentials] = useState(false);
  const [savedBanner, setSavedBanner] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [bannerError, setBannerError] = useState('');

  const alertRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bannerError || Object.keys(fieldErrors).length > 0) {
      alertRef.current?.focus();
    }
  }, [bannerError, fieldErrors]);

  function focusField(fieldId: string) {
    const el = document.getElementById(fieldId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.focus();
    }
  }

  async function copyText(value: string, which: 'user' | 'pass') {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(which);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Clipboard API unavailable
    }
  }

  async function handleUnlock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (unlocking) return;
    setUnlocking(true);
    setBannerError('');

    try {
      const response = await fetch('/api/crm/recover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, locale }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        username?: string;
        password?: string;
        crmHref?: string;
      };

      if (!response.ok || !data.ok || !data.username || !data.password) {
        if (data.error === 'used') {
          setTokenState('used');
        } else {
          setTokenState('invalid');
        }
        return;
      }

      setFoundUsername(data.username);
      setFoundPassword(data.password);
      setNewUsername(data.username);
      if (data.crmHref) setCrmHref(data.crmHref);
      setTokenState('unlocked');
    } catch {
      setTokenState('invalid');
    } finally {
      setUnlocking(false);
    }
  }

  async function handleSaveNewCredentials(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (savingCredentials) return;

    const errors: Record<string, string> = {};
    if (newUsername.trim().length < 3) errors['recover-new-username'] = copy.newUsernameInvalid;
    if (newPassword.length < 10) errors['recover-new-password'] = copy.newPasswordWeak;
    if (confirmPassword !== newPassword) {
      errors['recover-confirm-password'] = copy.confirmPasswordMismatch;
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setBannerError('');
      return;
    }

    setSavingCredentials(true);
    setFieldErrors({});
    setBannerError('');
    setSavedBanner(false);

    try {
      const response = await fetch('/api/crm/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: foundPassword,
          newUsername: newUsername.trim(),
          newPassword,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        username?: string;
      };
      if (!response.ok || !data.ok) {
        setBannerError(
          data.error === 'invalid_current' ? copy.currentPasswordWrong : copy.newPasswordWeak,
        );
        return;
      }
      setFoundUsername(data.username || newUsername.trim());
      setFoundPassword(newPassword);
      setNewPassword('');
      setConfirmPassword('');
      setSavedBanner(true);
    } catch {
      setBannerError(copy.configError);
    } finally {
      setSavingCredentials(false);
    }
  }

  const errorEntries = Object.entries(fieldErrors);

  return (
    <main className="crm-shell flex min-h-screen items-center justify-center bg-[#EDEBE6] px-4 py-12 text-[#0A0A0C] sm:px-8">
      <div className="w-full max-w-xl border border-[#0A0A0C] bg-[#FFFFFF] p-6 sm:p-10">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0A0A0C]">
          <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{copy.recoverPageEyebrow}</span>
        </div>

        {tokenState === 'invalid' || tokenState === 'used' ? (
          <div className="mt-6 space-y-6">
            <h1 className="text-2xl font-bold tracking-tight text-[#0A0A0C]">
              {copy.invalidTokenTitle}
            </h1>
            <div
              role="alert"
              className="border-2 border-[#B91C1C] bg-[#FEF2F2] p-4 text-sm leading-6 text-[#7F1D1D]"
            >
              {tokenState === 'used' ? copy.usedTokenBody : copy.invalidTokenBody}
            </div>
            <a
              href={loginRecoverHref}
              className="inline-flex h-12 w-full items-center justify-center gap-2 bg-[#D9381E] px-5 text-sm font-bold text-[#FFFFFF] hover:bg-[#B82C15]"
            >
              <KeyRound className="h-4 w-4" aria-hidden="true" />
              {copy.requestNewLinkCta}
            </a>
          </div>
        ) : tokenState === 'ready' ? (
          <form noValidate onSubmit={handleUnlock} className="mt-6 space-y-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#0A0A0C] sm:text-3xl">
                {copy.recoverPageHeading}
              </h1>
              <p className="mt-2 text-sm leading-6 text-[#3A3C42]">{copy.recoverPageLead}</p>
            </div>
            <button
              type="submit"
              disabled={unlocking}
              className="inline-flex h-12 w-full items-center justify-center gap-2 bg-[#D9381E] px-5 text-sm font-bold text-[#FFFFFF] transition-colors hover:bg-[#B82C15] disabled:opacity-65"
            >
              <KeyRound className="h-4 w-4" aria-hidden="true" />
              {unlocking ? copy.unlockingButton : copy.unlockButton}
            </button>
          </form>
        ) : (
          <div className="mt-6 space-y-8">
            <div className="border-2 border-[#15803D] bg-[#F0FDF4] p-5">
              <div className="flex items-center gap-2 text-lg font-bold text-[#14532D]">
                <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
                <h1>{copy.foundBoxTitle}</h1>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#14532D]">{copy.foundBoxSubtitle}</p>

              <div className="mt-5 space-y-3">
                <div className="border border-[#0A0A0C] bg-[#FFFFFF] p-3.5">
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#4B4D55]">
                    {copy.activeUserLabel}
                  </span>
                  <div className="mt-1.5 flex items-center justify-between gap-3">
                    <code className="min-w-0 flex-1 break-all font-mono text-sm font-bold text-[#0A0A0C]">
                      {foundUsername}
                    </code>
                    <button
                      type="button"
                      onClick={() => copyText(foundUsername, 'user')}
                      className="inline-flex h-11 shrink-0 items-center gap-1.5 border border-[#0A0A0C] bg-[#EDEBE6] px-3 text-xs font-bold text-[#0A0A0C] hover:bg-[#E0DDD6]"
                    >
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      {copiedField === 'user' ? copy.copiedButton : copy.copyButton}
                    </button>
                  </div>
                </div>

                <div className="border border-[#0A0A0C] bg-[#FFFFFF] p-3.5">
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#4B4D55]">
                    {copy.activePasswordLabel}
                  </span>
                  <div className="mt-1.5 flex items-center justify-between gap-2">
                    <code className="min-w-0 flex-1 break-all font-mono text-sm font-bold text-[#0A0A0C]">
                      {showFoundPassword ? foundPassword : '••••••••••••••••'}
                    </code>
                    <button
                      type="button"
                      onClick={() => setShowFoundPassword((prev) => !prev)}
                      aria-label={showFoundPassword ? copy.hidePassword : copy.showPassword}
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-[#0A0A0C] bg-[#FFFFFF] text-[#0A0A0C] hover:bg-[#EDEBE6]"
                    >
                      {showFoundPassword ? (
                        <EyeOff className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Eye className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => copyText(foundPassword, 'pass')}
                      className="inline-flex h-11 shrink-0 items-center gap-1.5 border border-[#0A0A0C] bg-[#EDEBE6] px-3 text-xs font-bold text-[#0A0A0C] hover:bg-[#E0DDD6]"
                    >
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      {copiedField === 'pass' ? copy.copiedButton : copy.copyButton}
                    </button>
                  </div>
                </div>
              </div>

              <a
                href={crmHref}
                className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 bg-[#D9381E] px-5 text-sm font-bold text-[#FFFFFF] hover:bg-[#B82C15]"
              >
                <span>{copy.openCrmNowCta}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <form noValidate onSubmit={handleSaveNewCredentials} className="space-y-4 border-t border-[#E5E2DC] pt-6">
              <div>
                <h2 className="text-lg font-bold text-[#0A0A0C]">{copy.changePasswordSectionTitle}</h2>
                <p className="mt-1 text-sm leading-6 text-[#3A3C42]">{copy.changePasswordSectionLead}</p>
              </div>

              {savedBanner && (
                <div
                  role="status"
                  className="border border-[#15803D] bg-[#F0FDF4] px-4 py-3 text-sm font-semibold text-[#14532D]"
                >
                  {copy.credentialsSavedBanner}
                </div>
              )}

              {(bannerError || errorEntries.length > 0) && (
                <div
                  ref={alertRef}
                  role="alert"
                  tabIndex={-1}
                  className="border-2 border-[#B91C1C] bg-[#FEF2F2] p-4 text-sm text-[#7F1D1D] outline-none"
                >
                  <div className="flex items-start gap-2 font-bold text-[#991B1B]">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{bannerError || copy.errorSummaryTitle}</span>
                  </div>
                  {errorEntries.length > 0 && (
                    <ul className="mt-2 space-y-1 pl-6">
                      {errorEntries.map(([fieldId, message]) => (
                        <li key={fieldId}>
                          <button
                            type="button"
                            onClick={() => focusField(fieldId)}
                            className="text-left font-semibold text-[#991B1B] underline"
                          >
                            {message}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="recover-new-username" className="text-sm font-bold text-[#0A0A0C]">
                    {copy.newUsernameLabel}
                  </label>
                  <span className="border border-[#0A0A0C]/25 bg-[#EDEBE6] px-2 py-0.5 text-[11px] font-semibold text-[#0A0A0C]">
                    {copy.requiredBadge}
                  </span>
                </div>
                <input
                  id="recover-new-username"
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  aria-invalid={Boolean(fieldErrors['recover-new-username'])}
                  className={`mt-1.5 h-12 w-full border px-3 text-sm text-[#0A0A0C] outline-none ${
                    fieldErrors['recover-new-username']
                      ? 'border-2 border-[#B91C1C] bg-[#FEF2F2]'
                      : 'border-[#0A0A0C] bg-[#FFFFFF]'
                  }`}
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="recover-new-password" className="text-sm font-bold text-[#0A0A0C]">
                    {copy.newPasswordLabel}
                  </label>
                  <span className="border border-[#0A0A0C]/25 bg-[#EDEBE6] px-2 py-0.5 text-[11px] font-semibold text-[#0A0A0C]">
                    {copy.requiredBadge}
                  </span>
                </div>
                <div
                  className={`mt-1.5 flex h-12 items-center border pl-3 pr-1 ${
                    fieldErrors['recover-new-password']
                      ? 'border-2 border-[#B91C1C] bg-[#FEF2F2]'
                      : 'border-[#0A0A0C] bg-[#FFFFFF]'
                  }`}
                >
                  <LockKeyhole className="h-4 w-4 shrink-0 text-[#3A3C42]" aria-hidden="true" />
                  <input
                    id="recover-new-password"
                    type={showNewPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    aria-invalid={Boolean(fieldErrors['recover-new-password'])}
                    placeholder={copy.newPasswordHint}
                    className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-[#0A0A0C] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    aria-label={showNewPassword ? copy.hidePassword : copy.showPassword}
                    className="inline-flex h-11 w-11 items-center justify-center text-[#0A0A0C]"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="recover-confirm-password" className="text-sm font-bold text-[#0A0A0C]">
                    {copy.confirmPasswordLabel}
                  </label>
                  <span className="border border-[#0A0A0C]/25 bg-[#EDEBE6] px-2 py-0.5 text-[11px] font-semibold text-[#0A0A0C]">
                    {copy.requiredBadge}
                  </span>
                </div>
                <input
                  id="recover-confirm-password"
                  type={showNewPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  aria-invalid={Boolean(fieldErrors['recover-confirm-password'])}
                  className={`mt-1.5 h-12 w-full border px-3 text-sm text-[#0A0A0C] outline-none ${
                    fieldErrors['recover-confirm-password']
                      ? 'border-2 border-[#B91C1C] bg-[#FEF2F2]'
                      : 'border-[#0A0A0C] bg-[#FFFFFF]'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={savingCredentials}
                className="inline-flex h-12 w-full items-center justify-center gap-2 border border-[#0A0A0C] bg-[#0A0A0C] px-5 text-sm font-bold text-[#FFFFFF] hover:bg-[#22242A] disabled:opacity-65"
              >
                {savingCredentials ? copy.savingCredentialsCta : copy.saveCredentialsCta}
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
