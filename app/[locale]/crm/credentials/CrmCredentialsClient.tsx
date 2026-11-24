'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import type { CrmAuthCopy } from '@/lib/crmAuthCopy';

export default function CrmCredentialsClient({
  locale,
  copy,
  currentUsername,
  source,
  crmHref,
}: {
  locale: string;
  copy: CrmAuthCopy;
  currentUsername: string;
  source: 'vault' | 'env';
  crmHref: string;
}) {
  const [activeUsername, setActiveUsername] = useState(currentUsername);
  const [activeSource, setActiveSource] = useState<'vault' | 'env'>(source);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newUsername, setNewUsername] = useState(currentUsername);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [bannerError, setBannerError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;

    const errors: Record<string, string> = {};
    if (!currentPassword) errors['cred-current-password'] = copy.currentPasswordRequired;
    if (newUsername.trim().length < 3) errors['cred-new-username'] = copy.newUsernameInvalid;
    if (newPassword.length < 10) errors['cred-new-password'] = copy.newPasswordWeak;
    if (confirmPassword !== newPassword) errors['cred-confirm-password'] = copy.confirmPasswordMismatch;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setBannerError('');
      return;
    }

    setSaving(true);
    setSaved(false);
    setFieldErrors({});
    setBannerError('');

    try {
      const response = await fetch('/api/crm/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
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
        if (data.error === 'invalid_current') {
          setFieldErrors({ 'cred-current-password': copy.currentPasswordWrong });
        } else {
          setBannerError(copy.configError);
        }
        return;
      }

      setActiveUsername(data.username || newUsername.trim());
      setActiveSource('vault');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setSaved(true);
    } catch {
      setBannerError(copy.configError);
    } finally {
      setSaving(false);
    }
  }

  const errorEntries = Object.entries(fieldErrors);

  return (
    <main className="crm-shell min-h-screen bg-[#EDEBE6] px-4 py-10 text-[#0A0A0C] sm:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <a
            href={crmHref}
            className="inline-flex h-11 items-center gap-2 border border-[#0A0A0C] bg-[#FFFFFF] px-4 text-sm font-bold text-[#0A0A0C] hover:bg-[#E5E2DC]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {copy.backToCrmBtn}
          </a>

          <form action="/api/crm/logout" method="post">
            <input type="hidden" name="locale" value={locale} />
            <button
              type="submit"
              className="inline-flex h-11 items-center gap-2 border border-[#0A0A0C] bg-[#0A0A0C] px-4 text-sm font-bold text-[#FFFFFF] hover:bg-[#22242A]"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              {copy.headerLogoutBtn}
            </button>
          </form>
        </div>

        <div className="border border-[#0A0A0C] bg-[#FFFFFF] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E2DC] pb-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#4B4D55]">
                <ShieldCheck className="h-4 w-4 text-[#0A0A0C]" aria-hidden="true" />
                <span>NIGHTLIFE MILAN · CRM</span>
              </div>
              <h1 className="mt-2 text-2xl font-bold text-[#0A0A0C]">
                {copy.changePasswordSectionTitle}
              </h1>
            </div>
            <span className="border border-[#0A0A0C] bg-[#EDEBE6] px-3 py-1.5 text-xs font-bold text-[#0A0A0C]">
              {activeSource === 'vault' ? copy.sourceVaultBadge : copy.sourceDefaultBadge}
            </span>
          </div>

          <div className="mt-5 border border-[#0A0A0C]/20 bg-[#EDEBE6] p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4B4D55]">
              {copy.activeUserLabel}
            </span>
            <p className="mt-1 font-mono text-base font-bold text-[#0A0A0C]">{activeUsername}</p>
          </div>

          {saved && (
            <div
              role="status"
              className="mt-6 flex items-start gap-2.5 border-2 border-[#15803D] bg-[#F0FDF4] p-4 text-sm font-semibold text-[#14532D]"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{copy.credentialsSavedBanner}</span>
            </div>
          )}

          {(bannerError || errorEntries.length > 0) && (
            <div
              ref={alertRef}
              role="alert"
              tabIndex={-1}
              className="mt-6 border-2 border-[#B91C1C] bg-[#FEF2F2] p-4 text-sm text-[#7F1D1D] outline-none"
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

          <form noValidate onSubmit={handleSubmit} className="mt-6 space-y-5">
            <p className="text-xs font-medium text-[#4B4D55]">{copy.requiredLegend}</p>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="cred-current-password" className="text-sm font-bold text-[#0A0A0C]">
                  {copy.currentPasswordLabel}
                </label>
                <span className="border border-[#0A0A0C]/25 bg-[#EDEBE6] px-2 py-0.5 text-[11px] font-semibold text-[#0A0A0C]">
                  {copy.requiredBadge}
                </span>
              </div>
              <div
                className={`mt-1.5 flex h-12 items-center border pl-3 pr-1 ${
                  fieldErrors['cred-current-password']
                    ? 'border-2 border-[#B91C1C] bg-[#FEF2F2]'
                    : 'border-[#0A0A0C] bg-[#FFFFFF]'
                }`}
              >
                <input
                  id="cred-current-password"
                  type={showPasswords ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  aria-invalid={Boolean(fieldErrors['cred-current-password'])}
                  className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#0A0A0C] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords((prev) => !prev)}
                  aria-label={showPasswords ? copy.hidePassword : copy.showPassword}
                  className="inline-flex h-11 w-11 items-center justify-center text-[#0A0A0C]"
                >
                  {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="cred-new-username" className="text-sm font-bold text-[#0A0A0C]">
                  {copy.newUsernameLabel}
                </label>
                <span className="border border-[#0A0A0C]/25 bg-[#EDEBE6] px-2 py-0.5 text-[11px] font-semibold text-[#0A0A0C]">
                  {copy.requiredBadge}
                </span>
              </div>
              <input
                id="cred-new-username"
                type="text"
                autoComplete="username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                aria-invalid={Boolean(fieldErrors['cred-new-username'])}
                className={`mt-1.5 h-12 w-full border px-3 text-sm text-[#0A0A0C] outline-none ${
                  fieldErrors['cred-new-username']
                    ? 'border-2 border-[#B91C1C] bg-[#FEF2F2]'
                    : 'border-[#0A0A0C] bg-[#FFFFFF]'
                }`}
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="cred-new-password" className="text-sm font-bold text-[#0A0A0C]">
                  {copy.newPasswordLabel}
                </label>
                <span className="border border-[#0A0A0C]/25 bg-[#EDEBE6] px-2 py-0.5 text-[11px] font-semibold text-[#0A0A0C]">
                  {copy.requiredBadge}
                </span>
              </div>
              <input
                id="cred-new-password"
                type={showPasswords ? 'text' : 'password'}
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                aria-invalid={Boolean(fieldErrors['cred-new-password'])}
                placeholder={copy.newPasswordHint}
                className={`mt-1.5 h-12 w-full border px-3 text-sm text-[#0A0A0C] outline-none ${
                  fieldErrors['cred-new-password']
                    ? 'border-2 border-[#B91C1C] bg-[#FEF2F2]'
                    : 'border-[#0A0A0C] bg-[#FFFFFF]'
                }`}
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="cred-confirm-password" className="text-sm font-bold text-[#0A0A0C]">
                  {copy.confirmPasswordLabel}
                </label>
                <span className="border border-[#0A0A0C]/25 bg-[#EDEBE6] px-2 py-0.5 text-[11px] font-semibold text-[#0A0A0C]">
                  {copy.requiredBadge}
                </span>
              </div>
              <input
                id="cred-confirm-password"
                type={showPasswords ? 'text' : 'password'}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                aria-invalid={Boolean(fieldErrors['cred-confirm-password'])}
                className={`mt-1.5 h-12 w-full border px-3 text-sm text-[#0A0A0C] outline-none ${
                  fieldErrors['cred-confirm-password']
                    ? 'border-2 border-[#B91C1C] bg-[#FEF2F2]'
                    : 'border-[#0A0A0C] bg-[#FFFFFF]'
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex h-12 w-full items-center justify-center gap-2 bg-[#D9381E] px-5 text-sm font-bold text-[#FFFFFF] hover:bg-[#B82C15] disabled:opacity-65"
            >
              <KeyRound className="h-4 w-4" aria-hidden="true" />
              {saving ? copy.savingCredentialsCta : copy.saveCredentialsCta}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
