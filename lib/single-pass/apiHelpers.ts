import { NextResponse } from 'next/server';
import { getLocaleDef, type LocaleCode } from '@/lib/i18n/locales';
import { verifySameOriginRequest } from './auth';
import type { SinglePassApiErrorCode } from './types';

export const NO_STORE_HEADERS = {
  'Cache-Control': 'private, no-store',
  'X-Content-Type-Options': 'nosniff',
} as const;

export function jsonError(
  error: string,
  code: SinglePassApiErrorCode,
  status: number,
  details?: unknown,
): NextResponse {
  return NextResponse.json(
    { ok: false, error, code, ...(details !== undefined ? { details } : {}) },
    { status, headers: NO_STORE_HEADERS },
  );
}

export function jsonOk<T extends Record<string, unknown>>(data: T, status = 200): NextResponse {
  return NextResponse.json({ ok: true, ...data }, { status, headers: NO_STORE_HEADERS });
}

export function checkOriginOrReject(request: Request): NextResponse | null {
  if (!verifySameOriginRequest(request)) {
    return jsonError('Origin not permitted', 'ORIGIN_FORBIDDEN', 403);
  }
  return null;
}

export function sanitizeSinglePassLocale(raw: unknown): LocaleCode {
  if (typeof raw === 'string' && getLocaleDef(raw)?.enabled) {
    return raw as LocaleCode;
  }
  return 'it';
}

export function isValidEmail(raw: string): boolean {
  const email = raw.trim();
  return email.length >= 5 && email.length <= 200 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

export function sanitizeWhatsapp(raw: string): string {
  return raw.trim().replace(/\s+/g, ' ').slice(0, 40);
}

export function isValidWhatsapp(raw: string): boolean {
  const digits = raw.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 18;
}
