import { NextResponse } from 'next/server';
import { processPoster } from '@/lib/posterPipeline';
import { replaceEventImage } from '@/lib/eventPublisher';
import { getEventbriteToken } from '@/lib/eventbriteToken';
import type { PosterResult, PosterSource } from '@/lib/posterPipeline';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Sostituisce l'immagine di un evento GIÀ pubblicato con la foto venue
 * (fallback sicuro) — nato per correggere un falso negativo del vision check
 * (locandina con watermark di terzi non rilevato, vedi lib/posterPipeline.ts
 * inspectWithVision, prompt rafforzato dopo questo episodio).
 *
 * Auth: Authorization: Bearer CRON_SECRET  o  ?secret=INDEXING_SECRET
 * Uso: ?eventId=<id eventbrite>&venueId=<id interno, es. v-justme>
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const authHeader = request.headers.get('authorization');

  const okCron = process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`;
  const okSecret = process.env.INDEXING_SECRET && searchParams.get('secret') === process.env.INDEXING_SECRET;

  if (!okCron && !okSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const eventId = searchParams.get('eventId');
  const venueId = searchParams.get('venueId');
  const posterUrl = searchParams.get('posterUrl') || undefined;
  const returnBase64 = searchParams.get('returnBase64') === '1';
  if (!eventId || !venueId) {
    return NextResponse.json({ error: 'eventId and venueId query params required' }, { status: 400 });
  }

  try {
    const poster = await processPoster(posterUrl, venueId, `fix-${eventId}`);
    const result = await replaceEventImage(eventId, poster);

    // Verifica server-side lo stato attuale dell'evento (bypassa qualsiasi
    // cache CDN/pagina che potrebbe mascherare un aggiornamento riuscito o
    // rivelarne uno fallito silenziosamente).
    let currentLogo: unknown = null;
    const token = getEventbriteToken();
    if (token) {
      const checkRes = await fetch(`https://www.eventbriteapi.com/v3/events/${eventId}/?expand=logo`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (checkRes.ok) {
        const data = await checkRes.json();
        currentLogo = { logo_id: data.logo_id, logo_url: data.logo?.url || data.logo?.original?.url };
      }
    }

    return NextResponse.json({
      ok: result.ok,
      reason: result.reason,
      imageSource: poster.source,
      currentLogo,
      ...(returnBase64 ? { posterBase64: poster.buffer.toString('base64'), posterContentType: poster.contentType } : {}),
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}

/**
 * Variante POST — sostituisce l'immagine con un file GIÀ pronto (locandina
 * riadattata/pulita in locale, es. FASE F2 standard 16:9), invece del solo
 * fallback foto venue del GET. Stesso auth, stessa verifica server-side.
 *
 * Body JSON: { eventId, posterBase64, posterContentType, posterFilename?, posterSource? }
 */
export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  const okCron = process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`;
  if (!okCron) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: { eventId?: string; posterBase64?: string; posterContentType?: string; posterFilename?: string; posterSource?: PosterSource };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const { eventId, posterBase64, posterContentType, posterFilename, posterSource } = body;
  if (!eventId || !posterBase64 || !posterContentType) {
    return NextResponse.json({ ok: false, error: 'eventId, posterBase64 and posterContentType are required' }, { status: 400 });
  }

  try {
    const poster: PosterResult = {
      buffer: Buffer.from(posterBase64, 'base64'),
      contentType: posterContentType,
      filename: posterFilename || `${eventId}-replaced.jpg`,
      source: posterSource || 'poster-edited',
    };

    const result = await replaceEventImage(eventId, poster);

    let currentLogo: unknown = null;
    const token = getEventbriteToken();
    if (token) {
      const checkRes = await fetch(`https://www.eventbriteapi.com/v3/events/${eventId}/?expand=logo`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (checkRes.ok) {
        const data = await checkRes.json();
        currentLogo = { logo_id: data.logo_id, logo_url: data.logo?.url || data.logo?.original?.url };
      }
    }

    return NextResponse.json({ ok: result.ok, reason: result.reason, imageSource: poster.source, currentLogo });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}
