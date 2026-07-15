import { NextResponse } from 'next/server';
import { getEventbriteToken } from '@/lib/eventbriteToken';
import { publishOneLang } from '@/lib/eventPublisher';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const ORG_ID = '2988002072164';
const CURATED_VENUE_ID = '298565077';
const PHONE = '+39 351 912 7047';
const AFFILIATE_RE = /https:\/\/xceed\.me\/en\/milano\/event\/[^/]+\/\d+\/channel\/nightlifemilan-1/g;
const MARKER_RE = /^nlm:curated=([a-z0-9-]+)-(it|en|es|pt|fr|de)-(\d{4}-\d{2}-\d{2})$/;
const LOCALE_MAP: Record<string, string> = {
  it: 'it_IT',
  en: 'en_GB',
  es: 'es_ES',
  pt: 'pt_PT',
  fr: 'fr_FR',
  de: 'de_DE',
};

interface CuratedSubmission {
  action?: 'recover-draft' | 'update-existing';
  eventId?: string;
  title?: string;
  summary?: string;
  descriptionHtml?: string;
  marker?: string;
  date?: string;
  coverBase64?: string;
  coverContentType?: string;
  coverFilename?: string;
  lang?: string;
  ageRestriction?: string;
  categoryId?: string;
  ticketName?: string;
  ticketDescription?: string;
  dedupePrechecked?: boolean;
}

interface ExistingCuratedEvent {
  id: string;
  status?: string;
  url?: string;
  name?: { text?: string };
  description?: { html?: string };
}

function authHeaders(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}`, 'content-type': 'application/json' };
}

function isAuthorized(request: Request): boolean {
  return Boolean(process.env.CRON_SECRET && request.headers.get('authorization') === `Bearer ${process.env.CRON_SECRET}`);
}

async function listExistingCuratedEvents(token: string): Promise<ExistingCuratedEvent[]> {
  const base = `${EVENTBRITE_API}/organizations/${ORG_ID}/events/?status=live,draft,started&order_by=start_asc&page_size=200`;
  const events: ExistingCuratedEvent[] = [];
  let continuation: string | undefined;
  for (let page = 1; page <= 30; page += 1) {
    const url = continuation ? `${base}&continuation=${encodeURIComponent(continuation)}` : base;
    const response = await fetch(url, { headers: authHeaders(token) });
    if (!response.ok) {
      const retryAfter = response.headers.get('retry-after');
      const reset = response.headers.get('x-ratelimit-reset');
      throw new Error(`Duplicate check failed: ${response.status}${retryAfter ? ` retry-after=${retryAfter}` : ''}${reset ? ` reset=${reset}` : ''}`);
    }
    const body = await response.json();
    events.push(...(body.events || []));
    continuation = body.pagination?.has_more_items ? body.pagination?.continuation : undefined;
    if (!continuation) return events;
  }
  throw new Error('Duplicate check exceeded pagination guard');
}

function validateSubmission(body: CuratedSubmission): string | null {
  const { title, summary, descriptionHtml, marker, date, coverBase64, coverContentType, lang, ticketName, ticketDescription } = body;
  if (!title || !summary || !descriptionHtml || !marker || !date || !coverBase64 || !coverContentType || !lang || !ticketName || !ticketDescription) return 'Missing fields';
  if (title.length > 75) return 'Title exceeds 75 characters';
  if (summary.length > 140 || !summary.includes(PHONE)) return 'Invalid summary';
  const markerMatch = marker.match(MARKER_RE);
  if (!markerMatch || markerMatch[2] !== lang || markerMatch[3] !== date || !LOCALE_MAP[lang]) return 'Invalid marker, locale or date';
  const timestamp = Date.parse(`${date}T18:00:00+02:00`);
  if (!Number.isFinite(timestamp) || timestamp < Date.now() - 3_600_000 || timestamp > Date.now() + 31 * 86_400_000) return 'Date outside allowed window';
  if (!descriptionHtml.includes(`<!-- ${marker} -->`)) return 'Description marker missing';
  if ((descriptionHtml.match(/data-event-faq="true"/g) || []).length !== 25) return 'Description must contain 25 FAQs';
  if ((descriptionHtml.match(/<img /g) || []).length !== 4) return 'Description must contain 4 body images';
  if ((descriptionHtml.match(AFFILIATE_RE) || []).length < 1) return 'No valid Xceed affiliate links';
  if (/<br\s*\/?\s*>/i.test(descriptionHtml)) return 'Unsupported br tag';
  if (/\p{Extended_Pictographic}/u.test(descriptionHtml)) return 'Unsupported emoji';
  if (!/^image\/jpeg$/i.test(coverContentType)) return 'Cover must be JPEG';
  if (Buffer.byteLength(coverBase64, 'base64') > 5_000_000) return 'Cover exceeds 5 MB';
  if (!/^\d{2}\+$/.test(body.ageRestriction || '18+')) return 'Invalid age restriction';
  if (!/^(103|110)$/.test(body.categoryId || '103')) return 'Invalid category';
  if (ticketName.length > 100 || ticketDescription.length > 300) return 'Ticket copy too long';
  return null;
}

async function findExistingByMarker(token: string, marker: string, title: string): Promise<{ id: string; url?: string } | null> {
  return (await listExistingCuratedEvents(token)).find((event) =>
    event.description?.html?.includes(marker) || event.name?.text === title
  ) || null;
}

async function resolveCuratedVenue(token: string): Promise<string> {
  void token;
  return CURATED_VENUE_ID;
}

async function uploadCover(token: string, body: CuratedSubmission): Promise<string> {
  const infoRes = await fetch(`${EVENTBRITE_API}/media/upload/?type=image-event-logo&token=${encodeURIComponent(token)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!infoRes.ok) throw new Error(`Upload preparation failed: ${infoRes.status}`);
  const info = await infoRes.json();
  const form = new FormData();
  for (const [key, value] of Object.entries(info.upload_data || {})) form.append(key, String(value ?? ''));
  form.append(
    info.file_parameter_name || 'file',
    new Blob([Buffer.from(body.coverBase64!, 'base64')], { type: body.coverContentType! }),
    body.coverFilename || 'aperitivi-milano.jpg',
  );
  const uploadRes = await fetch(info.upload_url, { method: 'POST', body: form });
  if (!uploadRes.ok) throw new Error(`Cover upload failed: ${uploadRes.status} ${(await uploadRes.text()).slice(0, 200)}`);
  const finalizeRes = await fetch(`${EVENTBRITE_API}/media/upload/`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ upload_token: info.upload_token }),
  });
  if (!finalizeRes.ok) throw new Error(`Cover finalize failed: ${finalizeRes.status}`);
  const media = await finalizeRes.json();
  if (!media.id) throw new Error('Cover finalize returned no id');
  return media.id;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const token = getEventbriteToken();
  if (!token) return NextResponse.json({ ok: false, error: 'EVENTBRITE_TOKEN not set' }, { status: 500 });
  try {
    const events = await listExistingCuratedEvents(token);
    return NextResponse.json({
      ok: true,
      events: events.map((event) => ({
        id: event.id,
        status: event.status,
        url: event.url,
        title: event.name?.text,
        markers: [...(event.description?.html || '').matchAll(/nlm:curated=[a-z0-9-]+-(?:it|en|es|pt|fr|de)-\d{4}-\d{2}-\d{2}/g)].map((match) => match[0]),
      })),
    });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: CuratedSubmission;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const token = getEventbriteToken();
  if (!token) return NextResponse.json({ ok: false, error: 'EVENTBRITE_TOKEN not set' }, { status: 500 });
  if (body.action === 'recover-draft') {
    if (!/^\d+$/.test(body.eventId || '')) return NextResponse.json({ ok: false, error: 'Invalid draft id' }, { status: 400 });
    try {
      const inspect = await fetch(`${EVENTBRITE_API}/events/${body.eventId}/?expand=ticket_classes`, { headers: authHeaders(token) });
      if (!inspect.ok) throw new Error(`Draft lookup failed: ${inspect.status}`);
      const event = await inspect.json();
      if (event.status !== 'draft' || !/nlm:curated=/.test(event.description?.html || '')) {
        throw new Error('Event is not a recoverable curated draft');
      }
      if (!(event.ticket_classes || []).length) {
        if (!body.ticketName || !body.ticketDescription) throw new Error('Ticket copy is required to recover this draft');
        const ticket = await fetch(`${EVENTBRITE_API}/events/${body.eventId}/ticket_classes/`, {
          method: 'POST',
          headers: authHeaders(token),
          body: JSON.stringify({ ticket_class: {
            name: body.ticketName,
            free: true,
            quantity_total: 500,
            minimum_quantity: 1,
            maximum_quantity: 10,
            hide_sale_dates: false,
            sales_end: event.end?.utc,
            description: body.ticketDescription,
          } }),
        });
        if (!ticket.ok) throw new Error(`Draft ticket recovery failed: ${ticket.status} ${(await ticket.text()).slice(0, 200)}`);
      }
      let lastError = '';
      for (let attempt = 1; attempt <= 3; attempt += 1) {
        const publish = await fetch(`${EVENTBRITE_API}/events/${body.eventId}/publish/`, { method: 'POST', headers: authHeaders(token) });
        if (publish.ok) return NextResponse.json({ ok: true, skipped: false, recovered: true, eventId: body.eventId, url: event.url });
        lastError = `${publish.status} ${(await publish.text()).slice(0, 300)}`;
        if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, attempt * 2500));
      }
      throw new Error(`Draft publish failed: ${lastError}`);
    } catch (error) {
      return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : String(error) }, { status: 502 });
    }
  }

  const validationError = validateSubmission(body);
  if (validationError) return NextResponse.json({ ok: false, error: validationError }, { status: 400 });

  try {
    if (body.action === 'update-existing') {
      if (!/^\d+$/.test(body.eventId || '')) return NextResponse.json({ ok: false, error: 'Invalid event id' }, { status: 400 });
      const inspect = await fetch(`${EVENTBRITE_API}/events/${body.eventId}/`, { headers: authHeaders(token) });
      if (!inspect.ok) throw new Error(`Event lookup failed: ${inspect.status}`);
      const event = await inspect.json();
      if (!['live', 'started'].includes(event.status) || !event.description?.html?.includes(body.marker)) {
        throw new Error('Event is not an updatable curated listing');
      }
      const imageId = await uploadCover(token, body);
      const metadata = await fetch(`${EVENTBRITE_API}/events/${body.eventId}/`, {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify({ event: { name: { html: body.title }, summary: body.summary, logo_id: imageId, category_id: body.categoryId || '103' } }),
      });
      if (!metadata.ok) throw new Error(`Event metadata update failed: ${metadata.status} ${(await metadata.text()).slice(0, 200)}`);
      const description = await fetch(`${EVENTBRITE_API}/events/${body.eventId}/`, {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify({ event: { description: { html: body.descriptionHtml } } }),
      });
      if (!description.ok) throw new Error(`Event description update failed: ${description.status} ${(await description.text()).slice(0, 200)}`);
      const verify = await fetch(`${EVENTBRITE_API}/events/${body.eventId}/`, { headers: authHeaders(token) });
      const saved = await verify.json().catch(() => null);
      if (!verify.ok || saved?.name?.text !== body.title || (saved?.description?.html || '').length < body.descriptionHtml!.length * 0.8) {
        throw new Error('Event update verification failed');
      }
      return NextResponse.json({ ok: true, skipped: false, updated: true, eventId: body.eventId, url: saved.url || event.url });
    }

    if (!body.dedupePrechecked) {
      const existing = await findExistingByMarker(token, body.marker!, body.title!);
      if (existing) {
        return NextResponse.json({ ok: true, skipped: true, reason: 'already-present', eventId: existing.id, url: existing.url });
      }
    }

    const [venueEbId, imageId] = await Promise.all([
      resolveCuratedVenue(token),
      uploadCover(token, body),
    ]);
    const startUtc = new Date(`${body.date}T18:00:00+02:00`).toISOString().replace('.000Z', 'Z');
    const endUtc = new Date(`${body.date}T23:59:00+02:00`).toISOString().replace('.000Z', 'Z');
    const result = await publishOneLang({
      token,
      venueEbId,
      imageId,
      startUtc,
      endUtc,
      title: body.title!,
      summary: body.summary!,
      description: body.descriptionHtml!,
      locale: LOCALE_MAP[body.lang!],
      lang: body.lang!,
      ageRestriction: body.ageRestriction || '18+',
      doorTimeISO: `${body.date}T18:00:00`,
      ticketText: {
        name: body.ticketName!,
        description: body.ticketDescription!,
      },
      categoryId: body.categoryId || '103',
    });
    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.reason, eventId: result.ebEventId }, { status: 502 });
    }
    return NextResponse.json({ ok: true, skipped: false, eventId: result.ebEventId, url: result.url });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
