import { checkOriginOrReject, jsonError, jsonOk } from '@/lib/single-pass/apiHelpers';
import {
  applySessionCookie,
  createSessionToken,
  verifyPassword,
} from '@/lib/single-pass/auth';
import { getMemberByEmail, normalizeEmail } from '@/lib/single-pass/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const originReject = checkOriginOrReject(request);
  if (originReject) return originReject;

  let body: { email?: string; password?: string };
  try {
    body = (await request.json()) as { email?: string; password?: string };
  } catch {
    return jsonError('Invalid JSON payload', 'INVALID_JSON', 400);
  }

  const email = normalizeEmail(String(body.email || ''));
  const password = String(body.password || '');

  if (!email || !password) {
    const fieldErrors: Partial<Record<'email' | 'password', string>> = {};
    if (!email) fieldErrors.email = 'INVALID_EMAIL';
    if (!password) fieldErrors.password = 'INVALID_PASSWORD';
    return jsonError('Email and password are required', 'INVALID_CREDENTIALS', 400, {
      field: !email ? 'email' : 'password',
      fieldErrors,
    });
  }

  const member = await getMemberByEmail(email);
  if (!member?.passwordHash || !member.passwordSalt) {
    return jsonError('Invalid email or password', 'INVALID_CREDENTIALS', 401, {
      field: 'password',
      fieldErrors: { password: 'INVALID_CREDENTIALS' },
    });
  }

  if (!verifyPassword(password, member.passwordSalt, member.passwordHash)) {
    return jsonError('Invalid email or password', 'INVALID_CREDENTIALS', 401, {
      field: 'password',
      fieldErrors: { password: 'INVALID_CREDENTIALS' },
    });
  }

  const token = createSessionToken(member.email, member.id);
  const response = jsonOk({
    email: member.email,
    fullName: member.fullName,
  });
  applySessionCookie(response, token);
  return response;
}
