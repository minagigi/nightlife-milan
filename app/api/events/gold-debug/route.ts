import { NextResponse } from 'next/server';
import { get } from '@vercel/blob';
import { getEventGoldHtml } from '@/lib/eventbriteSync';
import { fetchOwnOrgEvents } from '@/lib/importLedger';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Diagnostica one-off: legge il blob del contenuto gold di un evento e riporta
 * l'ERRORE REALE (rate-limit vs not-found vs altro) invece di ingoiarlo come fa
 * getRichContent. Auth: Bearer CRON_SECRET. Da rimuovere dopo la diagnosi.
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!(process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug') || 'white-party-just-me-milano-friday-july-10-2026-2026-07-10';
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return NextResponse.json({ ok: false, reason: 'BLOB_READ_WRITE_TOKEN not set' });

  // Diagnosi getEventGoldHtml: quali marker-slug/lang trova l'org per questo slug
  if (searchParams.get('gold') === '1') {
    const locale = searchParams.get('locale') || 'fr';
    const all = await fetchOwnOrgEvents();
    const markers: string[] = [];
    for (const ev of all) {
      const html = ev.description?.html || '';
      const m = html.match(/nlm:src=(.+?)-([a-z]{2});slug-en=([a-z0-9-]+)/);
      if (m && m[3] === slug) markers.push(`${m[1]}-${m[2]}`);
    }
    const html = await getEventGoldHtml(slug, locale);
    return NextResponse.json({
      ok: true, slug, locale,
      orgEventsTotal: all.length,
      markersMatchingSlug: markers,
      goldHtmlLen: html ? html.length : 0,
    });
  }

  const path = `events/${slug}.json`;
  try {
    const result = await get(path, { access: 'private', token });
    const status = (result as { statusCode?: number })?.statusCode;
    const hasStream = !!(result as { stream?: unknown })?.stream;
    let len = 0;
    if (hasStream && status === 200) {
      const text = await new Response((result as { stream: ReadableStream }).stream).text();
      len = text.length;
    }
    return NextResponse.json({ ok: true, slug, statusCode: status, hasStream, contentLength: len });
  } catch (e) {
    return NextResponse.json({
      ok: false,
      slug,
      errorName: (e as Error)?.name,
      errorMessage: (e as Error)?.message?.slice(0, 300),
    });
  }
}
