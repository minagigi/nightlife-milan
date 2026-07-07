import { NextResponse } from 'next/server';
import { getEventbriteToken } from '@/lib/eventbriteToken';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const ORG_ID = '2988002072164';

/**
 * FASE G0 (piano gold-standard) — spike one-off: legge il formato reale dello
 * structured_content e dei campi nativi (highlights/FAQ/agenda) dall'evento
 * gold-standard fatto a mano dall'utente. Nessuna scrittura, solo GET.
 * Non è parte della pipeline di produzione — route diagnostica temporanea.
 *
 * Auth: Authorization: Bearer CRON_SECRET  o  ?secret=INDEXING_SECRET
 * Uso: ?eventId=<id>  (se assente, cerca "branca" tra live/draft/started)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const authHeader = request.headers.get('authorization');

  const okCron = process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`;
  const okSecret = process.env.INDEXING_SECRET && searchParams.get('secret') === process.env.INDEXING_SECRET;
  if (!okCron && !okSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = getEventbriteToken();
  if (!token) return NextResponse.json({ error: 'EVENTBRITE_TOKEN not set' }, { status: 500 });
  const headers = { Authorization: `Bearer ${token}` };

  let eventId = searchParams.get('eventId');
  let matchedTitle: string | undefined;

  if (!eventId) {
    const listRes = await fetch(
      `${EVENTBRITE_API}/organizations/${ORG_ID}/events/?status=live,draft,started&order_by=start_desc`,
      { headers }
    );
    if (!listRes.ok) {
      return NextResponse.json({ step: 'list', ok: false, status: listRes.status, body: await listRes.text() }, { status: 500 });
    }
    const listData = await listRes.json();
    const events = (listData.events || []) as Array<{ id: string; name: { text: string } }>;
    const match = events.find((e) => /branca|torre|tower/i.test(e.name.text));
    if (!match) {
      return NextResponse.json({
        step: 'list',
        ok: false,
        message: 'Nessun evento con "branca/torre/tower" trovato — passa ?eventId= esplicito',
        eventsFound: events.map((e) => ({ id: e.id, title: e.name.text })),
      });
    }
    eventId = match.id;
    matchedTitle = match.name.text;
  }

  // 1. Evento completo con vari expand candidati (osserviamo cosa esiste davvero)
  const eventRes = await fetch(
    `${EVENTBRITE_API}/events/${eventId}/?expand=venue,logo,ticket_classes,structured_content,music_properties,category,format`,
    { headers }
  );
  const eventBody = await eventRes.text();
  let eventJson: unknown;
  try { eventJson = JSON.parse(eventBody); } catch { eventJson = eventBody.slice(0, 2000); }

  // 2. Structured content dedicato
  const scRes = await fetch(`${EVENTBRITE_API}/events/${eventId}/structured_content/`, { headers });
  const scBody = await scRes.text();
  let scJson: unknown;
  try { scJson = JSON.parse(scBody); } catch { scJson = scBody.slice(0, 2000); }

  return NextResponse.json({
    eventId,
    matchedTitle,
    event: { status: eventRes.status, ok: eventRes.ok, body: eventJson },
    structuredContent: { status: scRes.status, ok: scRes.ok, body: scJson },
  });
}
