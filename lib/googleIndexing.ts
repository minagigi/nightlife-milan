import crypto from 'crypto';

/**
 * Google Indexing API client (zero external deps — signs the service-account
 * JWT with Node's native crypto, exchanges it for an access token, then calls
 * urlNotifications:publish).
 *
 * Officially Google honors the Indexing API for pages with JobPosting or
 * BroadcastEvent structured data — which covers our /events/* pages.
 *
 * Setup (see docs/google-indexing-setup.md):
 *   1. Create a GCP service account, enable the Indexing API.
 *   2. Add the service-account email as an OWNER in Search Console.
 *   3. Put the full service-account JSON (one line) in the
 *      GOOGLE_INDEXING_CREDENTIALS env var on Vercel.
 */

interface ServiceAccount {
  client_email: string;
  private_key: string;
}

type NotifyType = 'URL_UPDATED' | 'URL_DELETED';

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function getCredentials(): ServiceAccount {
  const raw = process.env.GOOGLE_INDEXING_CREDENTIALS;
  if (!raw) {
    throw new Error('GOOGLE_INDEXING_CREDENTIALS env var is not set');
  }
  const parsed = JSON.parse(raw) as ServiceAccount;
  if (!parsed.client_email || !parsed.private_key) {
    throw new Error('GOOGLE_INDEXING_CREDENTIALS is missing client_email or private_key');
  }
  // Vercel stores newlines as literal "\n" — restore real newlines for the PEM key.
  parsed.private_key = parsed.private_key.replace(/\\n/g, '\n');
  return parsed;
}

/** Exchange the signed JWT for a short-lived OAuth access token. */
async function getAccessToken(scope = 'https://www.googleapis.com/auth/indexing'): Promise<string> {
  const sa = getCredentials();
  const now = Math.floor(Date.now() / 1000);

  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = base64url(
    JSON.stringify({
      iss: sa.client_email,
      scope,
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    })
  );

  const signingInput = `${header}.${claims}`;
  const signature = crypto
    .createSign('RSA-SHA256')
    .update(signingInput)
    .sign(sa.private_key);
  const jwt = `${signingInput}.${base64url(signature)}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token exchange failed (${res.status}): ${text}`);
  }
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export interface NotifyResult {
  url: string;
  ok: boolean;
  status: number;
  error?: string;
}

/** Notify Google that a single URL was created/updated (or deleted). */
export async function notifyUrl(url: string, type: NotifyType = 'URL_UPDATED'): Promise<NotifyResult> {
  try {
    const token = await getAccessToken();
    const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, type }),
    });
    if (!res.ok) {
      const text = await res.text();
      return { url, ok: false, status: res.status, error: text.slice(0, 300) };
    }
    return { url, ok: true, status: res.status };
  } catch (err) {
    return { url, ok: false, status: 0, error: err instanceof Error ? err.message : String(err) };
  }
}

export interface SitemapResult {
  ok: boolean;
  status: number;
  error?: string;
}

/**
 * Submit (or re-submit) a sitemap to Google Search Console.
 * Uses the webmasters scope — same service account as the Indexing API.
 *
 * siteUrl:    the verified property, e.g. "https://nightlifemilan.com/"
 * sitemapUrl: e.g. "https://nightlifemilan.com/sitemap.xml"
 */
export async function submitSitemap(siteUrl: string, sitemapUrl: string): Promise<SitemapResult> {
  try {
    const token = await getAccessToken('https://www.googleapis.com/auth/webmasters');
    const site = encodeURIComponent(siteUrl);
    const feed = encodeURIComponent(sitemapUrl);
    const res = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${site}/sitemaps/${feed}`,
      {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!res.ok) {
      const text = await res.text();
      return { ok: false, status: res.status, error: text.slice(0, 300) };
    }
    return { ok: true, status: res.status };
  } catch (err) {
    return { ok: false, status: 0, error: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Notify a batch of URLs. Google's quota is 200 URLs/day by default; we reuse a
 * single access token across the batch and run them sequentially to stay polite.
 */
export async function notifyUrls(urls: string[], type: NotifyType = 'URL_UPDATED'): Promise<NotifyResult[]> {
  const token = await getAccessToken();
  const results: NotifyResult[] = [];
  for (const url of urls) {
    try {
      const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, type }),
      });
      if (!res.ok) {
        const text = await res.text();
        results.push({ url, ok: false, status: res.status, error: text.slice(0, 300) });
      } else {
        results.push({ url, ok: true, status: res.status });
      }
    } catch (err) {
      results.push({ url, ok: false, status: 0, error: err instanceof Error ? err.message : String(err) });
    }
  }
  return results;
}
