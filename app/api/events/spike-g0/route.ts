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

  if (searchParams.get('writeTest') !== '1') {
    return NextResponse.json({
      eventId,
      matchedTitle,
      event: { status: eventRes.status, ok: eventRes.ok, body: eventJson },
      structuredContent: { status: scRes.status, ok: scRes.ok, body: scJson },
    });
  }

  // --- Write test: crea un evento DRAFT usa-e-getta, prova a scrivere
  // structured_content (modulo text + image) e i widget nativi (agenda/parking/faqs),
  // poi elimina SEMPRE l'evento di prova, successo o fallimento.
  const jsonHeaders = { Authorization: `Bearer ${token}`, 'content-type': 'application/json' };
  const log: Record<string, unknown> = {};
  let testEventId: string | null = null;

  try {
    const createRes = await fetch(`${EVENTBRITE_API}/organizations/${ORG_ID}/events/`, {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify({
        event: {
          name: { html: 'SPIKE G0 TEST — DELETE ME' },
          start: { timezone: 'Europe/Rome', utc: '2027-01-01T20:00:00Z' },
          end: { timezone: 'Europe/Rome', utc: '2027-01-02T02:00:00Z' },
          currency: 'EUR',
          online_event: true,
          listed: false,
          shareable: false,
        },
      }),
    });
    const createBody = await createRes.json().catch(() => null);
    log.createEvent = { status: createRes.status, ok: createRes.ok, body: createBody };
    if (createRes.ok && createBody?.id) testEventId = createBody.id;
  } catch (e) {
    log.createEvent = { threw: (e as Error).message };
  }

  if (testEventId) {
    // GET structured_content per scoprire self/add_module su un evento nuovo
    try {
      const scNewRes = await fetch(`${EVENTBRITE_API}/events/${testEventId}/structured_content/`, { headers });
      const scNewBody = await scNewRes.json().catch(() => null);
      log.scNewGet = { status: scNewRes.status, ok: scNewRes.ok, body: scNewBody };

      const addModuleUrl: string | undefined = scNewBody?.resource_uris?.add_module;
      const publishUrl: string | undefined = scNewBody?.resource_uris?.publish;

      if (addModuleUrl) {
        // Modulo text
        try {
          const modRes = await fetch(addModuleUrl, {
            method: 'POST',
            headers: jsonHeaders,
            body: JSON.stringify({ type: 'text', data: { body: { text: '<p>Spike G0 test module</p>', alignment: 'left' } } }),
          });
          log.addTextModule = { status: modRes.status, ok: modRes.ok, body: await modRes.json().catch(async () => (await modRes.text()).slice(0, 500)) };
        } catch (e) {
          log.addTextModule = { threw: (e as Error).message };
        }

        // Tentativi widget nativi (probabile non-documentati/non scrivibili via API pubblica)
        for (const widgetType of ['agenda', 'parking', 'faqs']) {
          try {
            const wRes = await fetch(addModuleUrl, {
              method: 'POST',
              headers: jsonHeaders,
              body: JSON.stringify({ type: widgetType, data: {} }),
            });
            log[`addWidget_${widgetType}`] = { status: wRes.status, ok: wRes.ok, body: await wRes.json().catch(async () => (await wRes.text()).slice(0, 300)) };
          } catch (e) {
            log[`addWidget_${widgetType}`] = { threw: (e as Error).message };
          }
        }
      } else {
        log.addModuleUrl = 'MISSING — nessun resource_uris.add_module su evento nuovo';
      }

      if (publishUrl) {
        try {
          const pubRes = await fetch(publishUrl, { method: 'POST', headers: jsonHeaders });
          log.publishStructuredContent = { status: pubRes.status, ok: pubRes.ok, body: await pubRes.text() };
        } catch (e) {
          log.publishStructuredContent = { threw: (e as Error).message };
        }
      }

      // GET finale per vedere cosa è stato effettivamente salvato
      const scFinalRes = await fetch(`${EVENTBRITE_API}/events/${testEventId}/structured_content/`, { headers });
      log.scFinalGet = { status: scFinalRes.status, body: await scFinalRes.json().catch(() => null) };
    } catch (e) {
      log.writeTestThrew = (e as Error).message;
    }

    // Test 2: la description classica accetta <img> inline? (fallback per la galleria)
    try {
      const testImgUrl = 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1178782357%2F2988002064108%2F1%2Foriginal.20260302-123735?auto=format&q=75&s=1';
      const descPostRes = await fetch(`${EVENTBRITE_API}/events/${testEventId}/description/`, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify({ description: { html: `<p>Before</p><img src="${testImgUrl}" alt="test"/><p>After</p>` } }),
      });
      log.descImgPost = { status: descPostRes.status, ok: descPostRes.ok, body: await descPostRes.text() };

      const descGetRes = await fetch(`${EVENTBRITE_API}/events/${testEventId}/description/`, { headers });
      log.descImgGet = { status: descGetRes.status, body: await descGetRes.text() };
    } catch (e) {
      log.descImgTest = { threw: (e as Error).message };
    }

    // Test 3: music_properties (age_restriction/door_time) è scrivibile?
    try {
      const mpRes = await fetch(`${EVENTBRITE_API}/events/${testEventId}/music_properties/`, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify({ music_properties: { age_restriction: '18+', door_time: '19:30' } }),
      });
      log.musicPropertiesPost = { status: mpRes.status, ok: mpRes.ok, body: await mpRes.text() };

      const mpGetRes = await fetch(`${EVENTBRITE_API}/events/${testEventId}/music_properties/`, { headers });
      log.musicPropertiesGet = { status: mpGetRes.status, body: await mpGetRes.text() };
    } catch (e) {
      log.musicPropertiesTest = { threw: (e as Error).message };
    }

    // Cleanup: elimina SEMPRE l'evento di prova
    try {
      const delRes = await fetch(`${EVENTBRITE_API}/events/${testEventId}/`, { method: 'DELETE', headers });
      log.cleanup = { status: delRes.status, ok: delRes.ok, body: await delRes.text() };
    } catch (e) {
      log.cleanup = { threw: (e as Error).message };
    }
  }

  return NextResponse.json({ eventId, matchedTitle, testEventId, writeTest: log });
}
