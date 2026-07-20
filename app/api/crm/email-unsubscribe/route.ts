import { timingSafeEqual } from 'node:crypto';
import { unsubscribeSignature } from '@/lib/attendeeEmail';
import { getAttendeeEmailCopy } from '@/lib/attendeeEmailCopy';
import type { CrmContact } from '@/lib/crmModel';
import { crmStorageConfigured, readCrmDatabase, writeCrmDatabase } from '@/lib/crmStore';
import { isEnabledLocale, type LocaleCode } from '@/lib/i18n/locales';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function safeEqual(expected: string, provided: string): boolean {
  const expectedBuf = Buffer.from(expected);
  const providedBuf = Buffer.from(provided);
  if (expectedBuf.length !== providedBuf.length) return false;
  return timingSafeEqual(expectedBuf, providedBuf);
}

function emptyOptedOutContact(id: string, now: string): CrmContact {
  return {
    id,
    name: 'Contatto',
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    preferredLocale: null,
    firstSeenAt: now,
    lastSeenAt: now,
    emailMarketing: { status: 'opted_out', source: 'manual', updatedAt: now },
    whatsappMarketing: { status: 'not_opted_in', source: 'none', updatedAt: null },
    tags: [],
    notes: '',
    stats: {
      events: 0,
      tickets: 0,
      checkIns: 0,
      firstEventAt: null,
      lastEventAt: null,
      venues: [],
      locales: [],
    },
  };
}

type UnsubscribeResult =
  | { ok: true; locale: LocaleCode }
  | { ok: false; status: number; message: string };

async function applyUnsubscribe(request: Request): Promise<UnsubscribeResult> {
  const { searchParams } = new URL(request.url);
  const c = searchParams.get('c');
  const t = searchParams.get('t');
  const l = searchParams.get('l') || '';

  if (!c || !t) return { ok: false, status: 400, message: 'Missing parameters' };

  const expected = unsubscribeSignature(c);
  if (!safeEqual(expected, t)) return { ok: false, status: 400, message: 'Invalid signature' };

  const locale: LocaleCode = isEnabledLocale(l) ? l : 'en';

  try {
    if (crmStorageConfigured()) {
      const db = await readCrmDatabase();
      const now = new Date().toISOString();
      const existing = db.contacts[c];

      if (existing) {
        existing.emailMarketing = { status: 'opted_out', source: 'manual', updatedAt: now };
        existing.lastSeenAt = now;
      } else {
        db.contacts[c] = emptyOptedOutContact(c, now);
      }
      db.updatedAt = now;

      await writeCrmDatabase(db);
    }
  } catch (error) {
    // L'utente finale non deve mai vedere un errore tecnico su questo link:
    // si mostra comunque la pagina di conferma, ma l'errore va loggato.
    console.error('[email-unsubscribe] failed to persist opt-out', error instanceof Error ? error.message : error);
  }

  return { ok: true, locale };
}

function unsubscribePage(locale: LocaleCode): string {
  const copy = getAttendeeEmailCopy(locale);
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return `<!doctype html>
<html lang="${locale}" dir="${dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${copy.unsubscribeDoneTitle}</title>
<style>
  body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; box-sizing: border-box; padding: 24px; background: #0B0B10; color: #EDEDF2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  .card { background: #14141C; border-radius: 12px; padding: 32px; max-width: 420px; width: 100%; text-align: center; }
  h1 { margin: 0 0 12px; color: #C9A86A; font-size: 20px; }
  p { margin: 0; line-height: 1.5; font-size: 15px; }
</style>
</head>
<body>
<div class="card">
<h1>${copy.unsubscribeDoneTitle}</h1>
<p>${copy.unsubscribeDoneBody}</p>
</div>
</body>
</html>`;
}

export async function GET(request: Request) {
  const result = await applyUnsubscribe(request);

  if (!result.ok) {
    return new Response(result.message, { status: result.status, headers: { 'content-type': 'text/plain; charset=utf-8' } });
  }

  return new Response(unsubscribePage(result.locale), {
    status: 200,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}

export async function POST(request: Request) {
  const result = await applyUnsubscribe(request);

  if (!result.ok) {
    return new Response(result.message, { status: result.status, headers: { 'content-type': 'text/plain; charset=utf-8' } });
  }

  // One-click unsubscribe (RFC 8058): risposta vuota, nessun corpo da renderizzare.
  return new Response(null, { status: 200 });
}
