import { put, get } from '@vercel/blob';
import type { RewrittenEvent } from './eventRewriter';
import type { XceedOffer } from './xceedScout';

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

/** Scrive il contenuto ricco per uno slug — sovrascrive se già presente (stessa pathname, no suffisso random). */
export async function putRichContent(slugEn: string, data: Omit<RichContentPayload, 'storedAt'>): Promise<{ ok: boolean; url?: string; error?: string }> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return { ok: false, error: 'BLOB_READ_WRITE_TOKEN not set' };

  try {
    const payload: RichContentPayload = { ...data, storedAt: new Date().toISOString() };
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
export async function getRichContent(slugEn: string): Promise<RichContentPayload | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token || !slugEn) return null;

  try {
    const result = await get(pathFor(slugEn), { access: 'private', token });
    if (!result || result.statusCode !== 200 || !result.stream) return null;
    const text = await new Response(result.stream).text();
    return JSON.parse(text) as RichContentPayload;
  } catch {
    return null;
  }
}
