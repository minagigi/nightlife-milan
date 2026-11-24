export const ANALYTICS_MASTER_COOKIE = 'nlm_master_analytics';

async function sha256Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function timingSafeEqualStr(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function computeMasterCookieDigest(secret: string): Promise<string> {
  return sha256Hex(`nlm-analytics-master-v1:${secret.trim()}`);
}

export async function verifyAnalyticsMasterRawKey(candidate: string | null | undefined): Promise<string | null> {
  const secret = (process.env.ANALYTICS_MASTER_TOKEN || '').trim();
  const actual = (candidate || '').trim();
  if (secret.length < 20 || !actual) return null;
  const [da, db] = await Promise.all([
    computeMasterCookieDigest(actual),
    computeMasterCookieDigest(secret),
  ]);
  return timingSafeEqualStr(da, db) ? db : null;
}

export async function verifyAnalyticsMasterCookie(cookieVal: string | null | undefined): Promise<boolean> {
  const secret = (process.env.ANALYTICS_MASTER_TOKEN || '').trim();
  const actual = (cookieVal || '').trim();
  if (secret.length < 20 || actual.length !== 64) return false;
  const expected = await computeMasterCookieDigest(secret);
  return timingSafeEqualStr(actual, expected);
}

export function verifyBasicAuthHeader(authHeader: string | null | undefined): boolean {
  const user = (process.env.ANALYTICS_USER || '').trim();
  const pass = (process.env.ANALYTICS_PASSWORD || '').trim();
  if (!user || !pass || !authHeader) return false;
  const expected = `Basic ${btoa(`${user}:${pass}`)}`;
  return timingSafeEqualStr(authHeader, expected);
}
