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

  // Riusa un venue reale della org (in-person, come sono gli eventi di produzione —
  // "online_event" potrebbe bloccare endpoint come /description/ per motivi diversi
  // dal vero oggetto del test).
  let realVenueId: string | undefined;
  try {
    const venuesRes = await fetch(`${EVENTBRITE_API}/organizations/${ORG_ID}/venues/`, { headers });
    const venuesBody = await venuesRes.json().catch(() => null);
    realVenueId = venuesBody?.venues?.[0]?.id;
    log.realVenueUsed = realVenueId;
  } catch (e) {
    log.realVenueLookup = { threw: (e as Error).message };
  }

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
          online_event: !realVenueId,
          venue_id: realVenueId,
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
    // Bug reale scoperto: POST /description/ dà 405 anche sull'evento reale già in
    // produzione (la description live è rimasta alla sola summary) — provo PUT e
    // anche POST diretta su /events/{id}/ con description annidata nel body evento.
    try {
      const testImgUrl = 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1178782357%2F2988002064108%2F1%2Foriginal.20260302-123735?auto=format&q=75&s=1';
      const html = `<p>Before</p><img src="${testImgUrl}" alt="test"/><p>After</p>`;

      const descPutRes = await fetch(`${EVENTBRITE_API}/events/${testEventId}/description/`, {
        method: 'PUT',
        headers: jsonHeaders,
        body: JSON.stringify({ description: { html } }),
      });
      log.descImgPut = { status: descPutRes.status, ok: descPutRes.ok, body: await descPutRes.text() };

      const descViaEventRes = await fetch(`${EVENTBRITE_API}/events/${testEventId}/`, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify({ event: { description: { html } } }),
      });
      log.descViaEventPost = { status: descViaEventRes.status, ok: descViaEventRes.ok, body: await descViaEventRes.text() };

      const descGetRes = await fetch(`${EVENTBRITE_API}/events/${testEventId}/description/`, { headers });
      log.descImgGet = { status: descGetRes.status, body: await descGetRes.text() };

      // Plain text (no tag) — verifica se newline/emoji/bullet sopravvivono senza escaping
      const plainText = '🌙 Hook line one.\nSecond line.\n\n📞 CONTACTS\n• WhatsApp: https://wa.me/393519127047\n• Phone: +39 351 912 7047\n\n❓ FAQ\nQ1: Test question?\nA1: Test answer.';
      const descPlainRes = await fetch(`${EVENTBRITE_API}/events/${testEventId}/`, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify({ event: { description: { html: plainText } } }),
      });
      log.descPlainPost = { status: descPlainRes.status, ok: descPlainRes.ok };
      const descPlainGetRes = await fetch(`${EVENTBRITE_API}/events/${testEventId}/description/`, { headers });
      log.descPlainGet = { status: descPlainGetRes.status, body: await descPlainGetRes.text() };

      // Cross-check: stesso stato letto dal campo description ANNIDATO nell'evento
      // principale (più affidabile, è quello che ha rivelato il bug reale sull'evento
      // live) invece del sub-endpoint /description/ dedicato.
      const eventMainGetRes = await fetch(`${EVENTBRITE_API}/events/${testEventId}/`, { headers });
      const eventMainBody = await eventMainGetRes.json().catch(() => null);
      log.eventMainDescriptionAfterPlain = eventMainBody?.description;

      // Variante: paragrafi wrappati in <p> (uno per riga) — verifica se questo è
      // ciò che serve perché il contenuto "conti" come reale (a differenza del
      // testo nudo senza alcun tag, che sopra è risultato vuoto).
      const wrappedText = plainText.split('\n\n').map((para) => `<p>${para.replace(/\n/g, '<br/>')}</p>`).join('');
      const descWrappedRes = await fetch(`${EVENTBRITE_API}/events/${testEventId}/`, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify({ event: { description: { html: wrappedText } } }),
      });
      log.descWrappedPost = { status: descWrappedRes.status, ok: descWrappedRes.ok };
      const eventMainGetRes2 = await fetch(`${EVENTBRITE_API}/events/${testEventId}/`, { headers });
      const eventMainBody2 = await eventMainGetRes2.json().catch(() => null);
      log.eventMainDescriptionAfterWrapped = eventMainBody2?.description;

      // Variante v2-style: HTML moderato (<h2>/<p>/<ul><li>), come lo shape che la
      // v2 già usava e come appaiono le description di eventi REALI di terzi che
      // scrapiamo — verifica se QUESTO shape sopravvive intatto (isola se il
      // problema è la lunghezza/nesting o lo shape esatto usato sopra).
      const v2Style = '<h2>The Night</h2><p>Aperitivo and DJ set at Just Me Milano.</p><ul><li>Doors 19:30</li><li>Dress code: elegant</li></ul>';
      const descV2Res = await fetch(`${EVENTBRITE_API}/events/${testEventId}/`, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify({ event: { description: { html: v2Style } } }),
      });
      log.descV2StylePost = { status: descV2Res.status, ok: descV2Res.ok };
      const eventMainGetRes3 = await fetch(`${EVENTBRITE_API}/events/${testEventId}/`, { headers });
      const eventMainBody3 = await eventMainGetRes3.json().catch(() => null);
      log.eventMainDescriptionAfterV2Style = eventMainBody3?.description;

      // Variante con link <a href> (serve per WhatsApp/sito) — verifica se
      // sopravvive come tag reale (come h2/p/ul) o rompe come <img>.
      const withLink = '<p>WhatsApp us: <a href="https://wa.me/393519127047">+39 351 912 7047</a></p><p>Full guide: <a href="https://nightlifemilan.com/events/test-slug">nightlifemilan.com</a></p>';
      const descLinkRes = await fetch(`${EVENTBRITE_API}/events/${testEventId}/`, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify({ event: { description: { html: withLink } } }),
      });
      log.descLinkPost = { status: descLinkRes.status, ok: descLinkRes.ok };
      const eventMainGetRes4 = await fetch(`${EVENTBRITE_API}/events/${testEventId}/`, { headers });
      const eventMainBody4 = await eventMainGetRes4.json().catch(() => null);
      log.eventMainDescriptionAfterLink = eventMainBody4?.description;

      // Variante gold-length reale: emoji + h2/h3 + p + ul/li ripetuti molte volte
      // (simula davvero la lunghezza/ripetizione di assembleGoldDescription) per
      // escludere che sia un limite di LUNGHEZZA a rompere il parsing, non lo shape.
      const goldLike = Array.from({ length: 8 }, (_, i) => `<h3>🎧 Section ${i + 1}</h3><p>Paragraph text for section ${i + 1} with some detail and a number like €${20 + i}.</p><ul><li>Point A</li><li>Point B</li></ul>`).join('');
      const descGoldRes = await fetch(`${EVENTBRITE_API}/events/${testEventId}/`, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify({ event: { description: { html: goldLike } } }),
      });
      log.descGoldLikePost = { status: descGoldRes.status, ok: descGoldRes.ok, sentLength: goldLike.length };
      const eventMainGetRes5 = await fetch(`${EVENTBRITE_API}/events/${testEventId}/`, { headers });
      const eventMainBody5 = await eventMainGetRes5.json().catch(() => null);
      log.eventMainDescriptionAfterGoldLike = { htmlLength: (eventMainBody5?.description?.html || '').length, html: (eventMainBody5?.description?.html || '').slice(0, 400) };

      // Isola la causa: (a) un singolo <p> lungo senza tag ripetuti, (b) solo 3
      // blocchi h3/p/ul ripetuti invece di 8 — lunghezza vs. ripetizione di tag.
      const longSingleP = `<p>${'This is a long single paragraph sentence about the event. '.repeat(25)}</p>`;
      const descLongPRes = await fetch(`${EVENTBRITE_API}/events/${testEventId}/`, {
        method: 'POST', headers: jsonHeaders,
        body: JSON.stringify({ event: { description: { html: longSingleP } } }),
      });
      log.descLongPPost = { status: descLongPRes.status, sentLength: longSingleP.length };
      const gLongP = await (await fetch(`${EVENTBRITE_API}/events/${testEventId}/`, { headers })).json().catch(() => null);
      log.eventMainDescriptionAfterLongP = { htmlLength: (gLongP?.description?.html || '').length, html: (gLongP?.description?.html || '').slice(0, 200) };

      const threeBlocks = Array.from({ length: 3 }, (_, i) => `<h3>Section ${i + 1}</h3><p>Paragraph ${i + 1}.</p><ul><li>A</li><li>B</li></ul>`).join('');
      const desc3BlocksRes = await fetch(`${EVENTBRITE_API}/events/${testEventId}/`, {
        method: 'POST', headers: jsonHeaders,
        body: JSON.stringify({ event: { description: { html: threeBlocks } } }),
      });
      log.desc3BlocksPost = { status: desc3BlocksRes.status, sentLength: threeBlocks.length };
      const g3Blocks = await (await fetch(`${EVENTBRITE_API}/events/${testEventId}/`, { headers })).json().catch(() => null);
      log.eventMainDescriptionAfter3Blocks = { htmlLength: (g3Blocks?.description?.html || '').length, html: (g3Blocks?.description?.html || '').slice(0, 400) };

      // 6 blocchi h3/p/ul (a metà tra 3=ok e 8=rotto) — trova la soglia reale.
      const sixBlocks = Array.from({ length: 6 }, (_, i) => `<h3>Section ${i + 1}</h3><p>Paragraph ${i + 1} with some more realistic detail and length to it, mentioning a price of €${20 + i} and a time like 19:3${i}.</p><ul><li>Point A for section ${i + 1}</li><li>Point B for section ${i + 1}</li></ul>`).join('');
      await fetch(`${EVENTBRITE_API}/events/${testEventId}/`, { method: 'POST', headers: jsonHeaders, body: JSON.stringify({ event: { description: { html: sixBlocks } } }) });
      const g6 = await (await fetch(`${EVENTBRITE_API}/events/${testEventId}/`, { headers })).json().catch(() => null);
      log.after6Blocks = { sentLength: sixBlocks.length, htmlLength: (g6?.description?.html || '').length, html: (g6?.description?.html || '').slice(0, 300) };

      // 8 blocchi ma SOLO <p> ripetuti (niente h3/ul) — isola se è la ripetizione
      // di <ul>/<h3> specificamente o qualunque tag ripetuto molte volte.
      const eightPOnly = Array.from({ length: 8 }, (_, i) => `<p>Paragraph ${i + 1} with some realistic detail, mentioning a price of €${20 + i} and a time like 19:3${i}.</p>`).join('');
      await fetch(`${EVENTBRITE_API}/events/${testEventId}/`, { method: 'POST', headers: jsonHeaders, body: JSON.stringify({ event: { description: { html: eightPOnly } } }) });
      const g8p = await (await fetch(`${EVENTBRITE_API}/events/${testEventId}/`, { headers })).json().catch(() => null);
      log.after8POnly = { sentLength: eightPOnly.length, htmlLength: (g8p?.description?.html || '').length, html: (g8p?.description?.html || '').slice(0, 300) };

      // Il marker HTML-comment (usato dal backlink G4B / dedupe ledger) sopravvive?
      const withComment = `<p>Test content.</p><!-- nlm:src=999;slug-en=test-slug-here -->`;
      await fetch(`${EVENTBRITE_API}/events/${testEventId}/`, { method: 'POST', headers: jsonHeaders, body: JSON.stringify({ event: { description: { html: withComment } } }) });
      const gComment = await (await fetch(`${EVENTBRITE_API}/events/${testEventId}/`, { headers })).json().catch(() => null);
      log.afterComment = { html: gComment?.description?.html || '' };

      // Test finale a piena scala: simula l'output reale di assembleGoldDescription
      // (h2/h3/p/ul/li/a + 25 FAQ + marker) per validare che l'intera catena
      // sopravviva intatta a lunghezza gold-standard reale, non solo nei micro-test.
      const fakeFaq = Array.from({ length: 25 }, (_, i) =>
        `<h3>Q${i + 1}: What about topic number ${i + 1} for this Saturday night at Just Me Milano?</h3><p>Answer ${i + 1}: this covers a specific detail about Just Me Milano on Saturday, mentioning price €${15 + i}, dress code, and a WhatsApp contact for bookings and confirmations before the doors open at 19:30.</p>`
      ).join('');
      const fakeSections = Array.from({ length: 3 }, (_, i) =>
        `<h3>🎧 Section ${i + 1}</h3><p>Realistic paragraph describing part ${i + 1} of the night, with concrete details like the time 19:3${i} and a price of €${20 + i}, avoiding any vague filler language.</p>`
      ).join('');
      const fullGold = [
        '<p>Hook paragraph describing the Saturday night experience at Just Me Milano in concrete terms.</p>',
        '<h2>Contacts &amp; Bookings</h2><ul><li>💬 WhatsApp: <a href="https://wa.me/393519127047">+39 351 912 7047</a></li><li>✉️ Email: concierge@nightlifemilan.com</li><li>🌐 Full event guide: <a href="https://nightlifemilan.com/events/test-slug">nightlifemilan.com/events/test-slug</a></li></ul>',
        '<h2>⚠️ Important Legal Notice</h2><p>Online tickets are non-refundable. Refunds are only considered if admission is denied by club security at the entrance.</p>',
        fakeSections,
        '<h2>🗓️ Evening Programme</h2><ul><li>19:30 — Doors open</li><li>22:00 — DJ set starts</li></ul>',
        '<h2>🎟️ Tickets</h2><ul><li>Aperitif + 1 Drink: €15 — includes buffet and one drink</li></ul>',
        '<h2>🍾 Bottle Services / VIP Tables</h2><ul><li>Dance Floor: €320 (up to 5 guests, 1 bottle)</li></ul>',
        '<h2>Good to Know</h2><ul><li>👗 Dress code: Elegant attire mandatory.</li><li>🚪 Age: 21+ men, 18+ women.</li></ul>',
        '<p>🔗 Link in bio • 💬 <a href="https://wa.me/393519127047">+39 351 912 7047</a> • ✉️ concierge@nightlifemilan.com</p>',
        `<h2>FAQ</h2>${fakeFaq}`,
        '<p>SEO TAGS: milano nightlife, saturday night milan, just me milano</p>',
        '<p>EVENTBRITE TAGS: milan_nightlife, saturday_night, just_me_milano</p>',
        '<!-- nlm:src=999;slug-en=test-slug -->',
      ].join('');

      await fetch(`${EVENTBRITE_API}/events/${testEventId}/`, { method: 'POST', headers: jsonHeaders, body: JSON.stringify({ event: { description: { html: fullGold } } }) });
      const gFull = await (await fetch(`${EVENTBRITE_API}/events/${testEventId}/`, { headers })).json().catch(() => null);
      const savedHtml = gFull?.description?.html || '';
      log.fullGoldTest = {
        sentLength: fullGold.length,
        savedLength: savedHtml.length,
        survivedFully: savedHtml.length >= fullGold.length * 0.95,
        markerSurvived: savedHtml.includes('nlm:src=999;slug-en=test-slug'),
        faq25thSurvived: savedHtml.includes('Q25:'),
        htmlPreviewStart: savedHtml.slice(0, 200),
        htmlPreviewEnd: savedHtml.slice(-200),
      };

      // Variante B: niente <a> annidato dentro <li> (ipotesi: è il trigger della
      // corruzione), Contacts come <p> semplici, FAQ ridotte a 12 senza link annidati.
      const fakeFaq12 = Array.from({ length: 12 }, (_, i) =>
        `<h3>Q${i + 1}: What about topic number ${i + 1} for this Saturday night at Just Me Milano?</h3><p>Answer ${i + 1}: this covers a specific detail about Just Me Milano on Saturday, mentioning price €${15 + i}, dress code, and a WhatsApp contact for bookings and confirmations before the doors open at 19:30.</p>`
      ).join('');
      const fullGoldB = [
        '<p>Hook paragraph describing the Saturday night experience at Just Me Milano in concrete terms.</p>',
        '<h2>Contacts &amp; Bookings</h2><p>💬 WhatsApp: <a href="https://wa.me/393519127047">+39 351 912 7047</a></p><p>✉️ Email: concierge@nightlifemilan.com</p><p>🌐 Full event guide: <a href="https://nightlifemilan.com/events/test-slug">nightlifemilan.com/events/test-slug</a></p>',
        '<h2>⚠️ Important Legal Notice</h2><p>Online tickets are non-refundable. Refunds are only considered if admission is denied by club security at the entrance.</p>',
        fakeSections,
        '<h2>🗓️ Evening Programme</h2><p>19:30 — Doors open. 22:00 — DJ set starts.</p>',
        '<h2>🎟️ Tickets</h2><p>Aperitif + 1 Drink: €15 — includes buffet and one drink.</p>',
        '<h2>🍾 Bottle Services / VIP Tables</h2><p>Dance Floor: €320 (up to 5 guests, 1 bottle).</p>',
        '<h2>Good to Know</h2><p>👗 Dress code: Elegant attire mandatory. 🚪 Age: 21+ men, 18+ women.</p>',
        '<p>🔗 Link in bio • 💬 <a href="https://wa.me/393519127047">+39 351 912 7047</a> • ✉️ concierge@nightlifemilan.com</p>',
        `<h2>FAQ</h2>${fakeFaq12}`,
        '<p>SEO TAGS: milano nightlife, saturday night milan, just me milano</p>',
        '<p>EVENTBRITE TAGS: milan_nightlife, saturday_night, just_me_milano</p>',
        '<!-- nlm:src=999;slug-en=test-slug -->',
      ].join('');
      await fetch(`${EVENTBRITE_API}/events/${testEventId}/`, { method: 'POST', headers: jsonHeaders, body: JSON.stringify({ event: { description: { html: fullGoldB } } }) });
      const gFullB = await (await fetch(`${EVENTBRITE_API}/events/${testEventId}/`, { headers })).json().catch(() => null);
      const savedHtmlB = gFullB?.description?.html || '';
      log.fullGoldTestB_noNestedLinks = {
        sentLength: fullGoldB.length,
        savedLength: savedHtmlB.length,
        survivedFully: savedHtmlB.length >= fullGoldB.length * 0.95,
        markerSurvived: savedHtmlB.includes('nlm:src=999;slug-en=test-slug'),
        faq12thSurvived: savedHtmlB.includes('Q12:'),
        htmlPreviewEnd: savedHtmlB.slice(-200),
      };
    } catch (e) {
      log.descImgTest = { threw: (e as Error).message };
    }

    // Test 3: music_properties (age_restriction/door_time) è scrivibile?
    try {
      const mpRes = await fetch(`${EVENTBRITE_API}/events/${testEventId}/music_properties/`, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify({ music_properties: { age_restriction: '18+', door_time: '2027-01-01T19:30:00Z' } }),
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
