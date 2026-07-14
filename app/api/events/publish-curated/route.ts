import { NextResponse } from 'next/server';
import { getEventbriteToken } from '@/lib/eventbriteToken';
import { publishOneLang } from '@/lib/eventPublisher';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const ORG_ID = '2988002072164';
const PHONE = '+39 351 912 7047';
const AFFILIATE_RE = /https:\/\/xceed\.me\/en\/milano\/event\/[^/]+\/\d+\/channel\/nightlifemilan-1/g;
const MARKER_RE = /^nlm:curated=aperitivi-it-(\d{4}-\d{2}-\d{2})$/;

interface CuratedSubmission {
  title?: string;
  summary?: string;
  descriptionHtml?: string;
  marker?: string;
  date?: string;
  coverBase64?: string;
  coverContentType?: string;
  coverFilename?: string;
}

function authHeaders(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}`, 'content-type': 'application/json' };
}

function validateSubmission(body: CuratedSubmission): string | null {
  const { title, summary, descriptionHtml, marker, date, coverBase64, coverContentType } = body;
  if (!title || !summary || !descriptionHtml || !marker || !date || !coverBase64 || !coverContentType) return 'Missing fields';
  if (title.length > 75) return 'Title exceeds 75 characters';
  if (summary.length > 140 || !summary.includes(PHONE)) return 'Invalid summary';
  if (!MARKER_RE.test(marker) || !marker.endsWith(date)) return 'Invalid marker or date';
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
  return null;
}

async function findExistingByMarker(token: string, marker: string): Promise<{ id: string; url?: string } | null> {
  const response = await fetch(
    `${EVENTBRITE_API}/organizations/${ORG_ID}/events/?status=live&time_filter=current_future&page_size=100`,
    { headers: authHeaders(token) },
  );
  if (!response.ok) throw new Error(`Duplicate check failed: ${response.status}`);
  const body = await response.json();
  return (body.events || []).find((event: { description?: { html?: string } }) =>
    event.description?.html?.includes(marker)
  ) || null;
}

async function resolveCuratedVenue(token: string): Promise<string> {
  const name = 'Milano - sedi indicate nel programma';
  const list = await fetch(`${EVENTBRITE_API}/organizations/${ORG_ID}/venues/`, { headers: authHeaders(token) });
  if (!list.ok) throw new Error(`Venue lookup failed: ${list.status}`);
  const body = await list.json();
  const existing = (body.venues || []).find((venue: { name?: string }) => venue.name === name);
  if (existing?.id) return existing.id;

  const create = await fetch(`${EVENTBRITE_API}/organizations/${ORG_ID}/venues/`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({
      venue: {
        name,
        address: {
          address_1: 'Milano',
          city: 'Milano',
          region: 'Lombardia',
          postal_code: '20121',
          country: 'IT',
          latitude: '45.4642',
          longitude: '9.1900',
        },
      },
    }),
  });
  if (!create.ok) throw new Error(`Venue creation failed: ${create.status} ${(await create.text()).slice(0, 200)}`);
  const created = await create.json();
  if (!created.id) throw new Error('Venue creation returned no id');
  return created.id;
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

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!(process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: CuratedSubmission;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const validationError = validateSubmission(body);
  if (validationError) return NextResponse.json({ ok: false, error: validationError }, { status: 400 });
  const token = getEventbriteToken();
  if (!token) return NextResponse.json({ ok: false, error: 'EVENTBRITE_TOKEN not set' }, { status: 500 });

  try {
    const existing = await findExistingByMarker(token, body.marker!);
    if (existing) {
      return NextResponse.json({ ok: true, skipped: true, reason: 'already-present', eventId: existing.id, url: existing.url });
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
      locale: 'it_IT',
      lang: 'it',
      ageRestriction: '18+',
      doorTimeISO: `${body.date}T18:00:00`,
      ticketText: {
        name: 'Richiesta informazioni gratuita - non valida per ingresso',
        description: `Questa registrazione non è un biglietto di ingresso. Acquista la formula Xceed del locale scelto e invia la conferma su WhatsApp al ${PHONE}.`,
      },
      categoryId: '110',
    });
    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.reason, eventId: result.ebEventId }, { status: 502 });
    }
    return NextResponse.json({ ok: true, skipped: false, eventId: result.ebEventId, url: result.url });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
