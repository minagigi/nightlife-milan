import crypto from 'node:crypto';
import {
  checkOriginOrReject,
  isValidEmail,
  isValidWhatsapp,
  jsonError,
  jsonOk,
  sanitizeWhatsapp,
} from '@/lib/single-pass/apiHelpers';
import {
  applySessionCookie,
  createSessionToken,
  hashPassword,
} from '@/lib/single-pass/auth';
import { getMemberByEmail, normalizeEmail, saveMember } from '@/lib/single-pass/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const originReject = checkOriginOrReject(request);
  if (originReject) return originReject;

  let body: {
    fullName?: string;
    email?: string;
    whatsapp?: string;
    age?: number | string;
    password?: string;
    spokenLanguages?: string[];
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return jsonError('Invalid JSON payload', 'INVALID_JSON', 400);
  }

  const fullName = String(body.fullName || '').trim().slice(0, 120);
  const email = normalizeEmail(String(body.email || ''));
  const whatsapp = sanitizeWhatsapp(String(body.whatsapp || ''));
  const age = Number(body.age);
  const password = String(body.password || '').trim();
  const spokenLanguages = Array.isArray(body.spokenLanguages)
    ? body.spokenLanguages.map((v) => String(v).trim().slice(0, 40)).filter(Boolean).slice(0, 10)
    : ['Italiano', 'English'];

  if (!fullName || fullName.length < 2 || !isValidEmail(email) || !isValidWhatsapp(whatsapp)) {
    return jsonError('Valid full name, email and WhatsApp number are required', 'INVALID_CUSTOMER_DATA', 400);
  }
  if (!Number.isFinite(age) || age < 18 || age > 99) {
    return jsonError('Minimum age 18 is required', 'UNDER_18', 400);
  }
  if (password.length < 8) {
    return jsonError('Password must be at least 8 characters long', 'INVALID_PASSWORD', 400);
  }

  const existing = await getMemberByEmail(email);
  if (existing?.passwordHash) {
    return jsonError('An account with this email already exists. Sign in instead.', 'INVALID_CREDENTIALS', 409);
  }

  const { salt, hash } = hashPassword(password);
  const nowIso = new Date().toISOString();
  const member = await saveMember({
    id: existing?.id || `mbr_${crypto.randomBytes(6).toString('hex')}`,
    email,
    fullName,
    whatsapp,
    age,
    spokenLanguages: spokenLanguages.length > 0 ? spokenLanguages : existing?.spokenLanguages || ['Italiano'],
    passwordSalt: salt,
    passwordHash: hash,
    orderIds: existing?.orderIds || [],
    createdAt: existing?.createdAt || nowIso,
    updatedAt: nowIso,
  });

  const token = createSessionToken(member.email, member.id);
  const response = jsonOk({ email: member.email, fullName: member.fullName });
  applySessionCookie(response, token);
  return response;
}
