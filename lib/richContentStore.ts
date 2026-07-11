import { put, get } from '@vercel/blob';
import type { RewrittenEvent } from './eventRewriter';
import type { XceedOffer } from './xceedScout';
import { CONTACT } from '@/config/contact';

/**
 * Storage del contenuto gold-standard completo (sezioni, programma, 25 FAQ)
 * per la pagina evento del sito — FASE X2 (piano Xceed). Risolve il limite
 * scoperto in FASE G0: Eventbrite tronca la description oltre ~1.300
 * caratteri, quindi il corpo lungo non può viverci. Il sito non ha questo
 * limite: legge da qui invece di rigenerare tutto da una description corta.
 */

export interface RichContentPayload {
  rewritten: RewrittenEvent;
  offers: XceedOffer[];
  affiliateUrl: string;
  venueId: string;
  dressCode?: string;
  ageRange?: string;
  doorsOpen?: string;
  imageUrl?: string;
  storedAt: string;
}

function pathFor(slugEn: string): string {
  return `events/${slugEn}.json`;
}

const WHATSAPP_PLACEHOLDER_RE = /\{\{\s*WHATSAPP\s*\}\}/g;

/**
 * Risolve il placeholder {{WHATSAPP}} in testo semplice (il numero, non un
 * link HTML) prima dello storage — questi campi vengono renderizzati come
 * testo in components/GoldEventContent.tsx, non tramite dangerouslySetInnerHTML.
 * A differenza di sanitize() (lib/brandSanitizer.ts, usato per la description
 * Eventbrite) che inserisce un <a href> HTML, qui basta il numero puro.
 */
function resolveWhatsappPlaceholders(rewritten: RewrittenEvent): RewrittenEvent {
  const resolve = (s: string) => (s || '').replace(WHATSAPP_PLACEHOLDER_RE, CONTACT.whatsapp.number);
  return {
    ...rewritten,
    hook: resolve(rewritten.hook),
    hookIt: resolve(rewritten.hookIt),
    summaryEn: resolve(rewritten.summaryEn),
    summaryIt: resolve(rewritten.summaryIt),
    sections: rewritten.sections.map((s) => ({ ...s, body: resolve(s.body), bodyIt: resolve(s.bodyIt) })),
    faqLong: rewritten.faqLong.map((f) => ({ ...f, answer: resolve(f.answer), answerIt: resolve(f.answerIt) })),
  };
}

/** Scrive il contenuto ricco per uno slug — sovrascrive se già presente (stessa pathname, no suffisso random). */
export async function putRichContent(slugEn: string, data: Omit<RichContentPayload, 'storedAt'>): Promise<{ ok: boolean; url?: string; error?: string }> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return { ok: false, error: 'BLOB_READ_WRITE_TOKEN not set' };

  try {
    const payload: RichContentPayload = {
      ...data,
      rewritten: resolveWhatsappPlaceholders(data.rewritten),
      storedAt: new Date().toISOString(),
    };
    const blob = await put(pathFor(slugEn), JSON.stringify(payload), {
      access: 'private',
      addRandomSuffix: false,
      contentType: 'application/json',
      allowOverwrite: true,
    });
    return { ok: true, url: blob.url };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

/** Legge il contenuto ricco per uno slug, o null se non presente/errore (degrado silenzioso: la pagina usa il rendering base). */
// Cache in-memory per lambda (quota Blob Hobby esaurita 10 lug 2026): con 35
// lingue ogni evento viene renderizzato molte più volte — senza cache ogni
// render era 1 operazione Blob. TTL breve: il contenuto gold cambia solo
// all'import notturno.
const richCache = new Map<string, { at: number; data: RichContentPayload | null }>();
const RICH_CACHE_TTL_MS = 10 * 60 * 1000;

// Circuit breaker (2026-07-11): il Blob è sospeso (403 Forbidden per overage
// quota). L'SDK @vercel/blob ritenta internamente ogni chiamata fallita →
// ~15-25s di ritardo AGGIUNTO a ogni render di pagina evento. Dopo il primo
// fallimento si disabilita per la vita del processo (torna a provare su nuovi
// lambda, così recupera da solo quando la quota si resetta).
let blobDown = false;

export async function getRichContent(slugEn: string): Promise<RichContentPayload | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token || !slugEn || blobDown) return null;

  const cached = richCache.get(slugEn);
  if (cached && Date.now() - cached.at < RICH_CACHE_TTL_MS) return cached.data;

  try {
    const result = await get(pathFor(slugEn), { access: 'private', token });
    if (!result || result.statusCode !== 200 || !result.stream) {
      richCache.set(slugEn, { at: Date.now(), data: null });
      return null;
    }
    const text = await new Response(result.stream).text();
    const data = JSON.parse(text) as RichContentPayload;
    richCache.set(slugEn, { at: Date.now(), data });
    return data;
  } catch {
    blobDown = true; // non ritentare il Blob morto su questo lambda
    return null;
  }
}
