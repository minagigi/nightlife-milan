import { NextResponse } from 'next/server';
import { getEventbriteToken } from '@/lib/eventbriteToken';
import { publishOneLang, sleep } from '@/lib/eventPublisher';
import {
  badBunnyAriaConfirmationFieldComplete,
  buildBadBunnyAriaEventbritePayloads,
  type BadBunnyAriaEventbritePayload,
} from '@/lib/badBunnyAriaEventbrite';
import {
  BAD_BUNNY_ARIA_AFFILIATE_URL,
  BAD_BUNNY_ARIA_END_UTC,
  BAD_BUNNY_ARIA_PHONE,
  BAD_BUNNY_ARIA_START_UTC,
} from '@/lib/badBunnyAria';
import { enabledLocaleCodes, isEnabledLocale, type LocaleCode } from '@/lib/i18n/locales';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const ORG_ID = '2988002072164';
const EXPECTED_VENUE = {
  name: 'Aria Club Milano',
  street: 'Piazzale dello Sport 14',
  postalCode: '20151',
} as const;

interface EventbriteMedia { id: string; url: string }
interface ExistingEvent {
  id: string;
  status?: string;
  name?: { text?: string };
  summary?: string;
  logo_id?: string;
  logo?: { id?: string };
  start?: { utc?: string };
  end?: { utc?: string };
  description?: { html?: string };
  venue_id?: string;
  venue?: { id?: string; name?: string; address?: { address_1?: string; postal_code?: string } };
  ticket_classes?: Array<{ id?: string; name?: string; description?: string | { text?: string; html?: string } }>;
}

interface LiveSnapshot {
  name: string;
  summary: string;
  descriptionHtml: string;
  logoId: string;
  venueId: string;
  ticket: { id: string; name: string; description: string };
  confirmationHtml: string;
  instructionsHtml: string;
  ageRestriction: string;
  doorTime: string;
}

function headers(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}`, 'content-type': 'application/json' };
}

function authorized(request: Request): boolean {
  const authorization = request.headers.get('authorization');
  return Boolean(
    (process.env.CRON_SECRET && authorization === `Bearer ${process.env.CRON_SECRET}`)
      || (process.env.BAD_BUNNY_PUBLISH_SECRET && authorization === `Bearer ${process.env.BAD_BUNNY_PUBLISH_SECRET}`),
  );
}

function normalize(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function venueMatches(venue: { name?: string; address?: { address_1?: string; postal_code?: string } }): boolean {
  const name = normalize(venue.name || '');
  const street = normalize(venue.address?.address_1 || '');
  const postal = normalize(venue.address?.postal_code || '');
  return name.includes('aria club')
    && ['piazzale', 'dello', 'sport', '14'].every((token) => street.split(' ').includes(token))
    && postal === EXPECTED_VENUE.postalCode;
}

async function ebFetch(url: string, init: RequestInit, label: string, attempts = 4): Promise<Response> {
  let response: Response | undefined;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    response = await fetch(url, init);
    if (response.status !== 429 && response.status < 500) return response;
    if (attempt < attempts) await sleep(Math.min(15_000, attempt * attempt * 1_500));
  }
  if (!response) throw new Error(`${label}: no response`);
  return response;
}

async function resolveVerifiedVenue(token: string, createIfMissing = true): Promise<string> {
  const base = `${EVENTBRITE_API}/organizations/${ORG_ID}/venues/?page_size=200`;
  let continuation: string | undefined;
  for (let page = 0; page < 20; page += 1) {
    const url = continuation ? `${base}&continuation=${encodeURIComponent(continuation)}` : base;
    const response = await ebFetch(url, { headers: headers(token) }, `venue page ${page + 1}`);
    if (!response.ok) throw new Error(`Venue lookup failed: HTTP ${response.status} ${(await response.text()).slice(0, 300)}`);
    const body = await response.json();
    const match = (body.venues || []).find(venueMatches);
    if (match?.id) return String(match.id);
    continuation = body.pagination?.has_more_items ? body.pagination.continuation : undefined;
    if (!continuation) break;
  }

  if (!createIfMissing) throw new Error('Verified Aria venue was not found during read-only audit');

  const create = await ebFetch(
    `${EVENTBRITE_API}/organizations/${ORG_ID}/venues/`,
    {
      method: 'POST',
      headers: headers(token),
      body: JSON.stringify({
        venue: {
          name: EXPECTED_VENUE.name,
          address: {
            address_1: EXPECTED_VENUE.street,
            city: 'Milano',
            postal_code: EXPECTED_VENUE.postalCode,
            country: 'IT',
          },
        },
      }),
    },
    'venue creation',
  );
  if (!create.ok) throw new Error(`Verified Aria venue creation failed: HTTP ${create.status} ${(await create.text()).slice(0, 300)}`);
  const venue = await create.json();
  if (!venue.id || !venueMatches(venue)) throw new Error('Created Aria venue failed exact name, address and postal-code readback');
  return String(venue.id);
}

async function fetchPublicJpeg(url: string): Promise<Uint8Array> {
  const parsed = new URL(url);
  if (parsed.origin !== 'https://nightlifemilan.com' || !parsed.pathname.startsWith('/images/events/generated/bad-bunny-aria-')) {
    throw new Error(`Untrusted Bad Bunny Aria image: ${url}`);
  }
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Image fetch failed: ${parsed.pathname}, HTTP ${response.status}`);
  if (!(response.headers.get('content-type') || '').includes('image/jpeg')) throw new Error(`${parsed.pathname} is not a JPEG`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.length < 100_000 || bytes.length > 5_000_000) throw new Error(`${parsed.pathname} has invalid size ${bytes.length}`);
  return bytes;
}

async function uploadMedia(token: string, bytes: Uint8Array, filename: string): Promise<EventbriteMedia> {
  const infoResponse = await ebFetch(
    `${EVENTBRITE_API}/media/upload/?type=image-event-logo&token=${encodeURIComponent(token)}`,
    { headers: { Authorization: `Bearer ${token}` } },
    `media prepare ${filename}`,
  );
  if (!infoResponse.ok) throw new Error(`Media preparation failed for ${filename}: HTTP ${infoResponse.status}`);
  const info = await infoResponse.json();
  const form = new FormData();
  for (const [key, value] of Object.entries(info.upload_data || {})) form.append(key, String(value ?? ''));
  const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
  form.append(info.file_parameter_name || 'file', new Blob([buffer], { type: 'image/jpeg' }), filename);
  const upload = await fetch(info.upload_url, { method: 'POST', body: form });
  if (!upload.ok) throw new Error(`Media upload failed for ${filename}: HTTP ${upload.status} ${(await upload.text()).slice(0, 200)}`);
  const finalize = await ebFetch(
    `${EVENTBRITE_API}/media/upload/`,
    { method: 'POST', headers: headers(token), body: JSON.stringify({ upload_token: info.upload_token }) },
    `media finalize ${filename}`,
  );
  if (!finalize.ok) throw new Error(`Media finalize failed for ${filename}: HTTP ${finalize.status}`);
  const media = await finalize.json();
  const mediaUrl = String(media.original?.url || media.url || '').replace(/&amp;/g, '&');
  if (!media.id || !/^https:\/\/(?:img|cdn)\.evbuc\.com\//i.test(mediaUrl)) throw new Error(`Invalid Eventbrite media response for ${filename}`);
  return { id: String(media.id), url: mediaUrl };
}

async function uploadAllMedia(token: string, locale: LocaleCode): Promise<readonly [EventbriteMedia, EventbriteMedia, EventbriteMedia, EventbriteMedia, EventbriteMedia, EventbriteMedia]> {
  const plans = buildBadBunnyAriaEventbritePayloads(locale)[0];
  const source = [plans.coverImage, ...plans.imagePlan];
  const uploaded: EventbriteMedia[] = [];
  for (let index = 0; index < source.length; index += 1) {
    const bytes = await fetchPublicJpeg(source[index].src);
    uploaded.push(await uploadMedia(token, bytes, `bad-bunny-aria-${locale}-${index + 1}.jpg`));
  }
  return uploaded as [EventbriteMedia, EventbriteMedia, EventbriteMedia, EventbriteMedia, EventbriteMedia, EventbriteMedia];
}

async function listVenueEvents(token: string, venueId: string): Promise<ExistingEvent[]> {
  const base = `${EVENTBRITE_API}/venues/${venueId}/events/?status=live,draft,started&time_filter=current_future&order_by=start_desc&page_size=200`;
  const events: ExistingEvent[] = [];
  let continuation: string | undefined;
  for (let page = 0; page < 20; page += 1) {
    const url = continuation ? `${base}&continuation=${encodeURIComponent(continuation)}` : base;
    const response = await ebFetch(url, { headers: headers(token) }, `event inventory ${page + 1}`);
    if (!response.ok) throw new Error(`Event inventory failed: HTTP ${response.status}`);
    const body = await response.json();
    events.push(...(body.events || []));
    continuation = body.pagination?.has_more_items ? body.pagination.continuation : undefined;
    if (!continuation) return events;
  }
  throw new Error('Event inventory exceeded 20 pages');
}

function descriptionGate(payload: BadBunnyAriaEventbritePayload, html: string): string | null {
  if (!html.includes(`<!-- ${payload.marker} -->`)) return 'curated marker missing';
  if (!html.includes(BAD_BUNNY_ARIA_AFFILIATE_URL) || !html.includes(payload.canonicalSiteUrl)) return 'affiliate or canonical URL missing';
  if (html.length < payload.descriptionHtml.length * 0.8) return 'description truncated';
  if ((html.match(/data-event-faq="true"/gi) || []).length !== 25) return '25 FAQs not persisted';
  const tags = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  if (tags.length !== 5) return 'five body images not persisted';
  if (tags.some((tag) => !/style="[^"]*width:\s*100%[^"]*max-width:\s*100%[^"]*height:\s*auto[^"]*"/i.test(tag))) return 'responsive image sizing not persisted';
  const urls = tags.map((tag) => /\bsrc="([^"]+)"/i.exec(tag)?.[1]?.replace(/&amp;/g, '&') || '');
  if (urls.some((url, index) => url !== payload.imagePlan[index].src.replace(/&amp;/g, '&'))) return 'body image sequence differs';
  const imageLabelsDiffer = tags.some((tag, index) => {
    const alt = /\balt="([^"]*)"/i.exec(tag)?.[1] || '';
    const title = /\btitle="([^"]*)"/i.exec(tag)?.[1] || '';
    return decodedHtmlText(alt) !== payload.imagePlan[index].alt || decodedHtmlText(title) !== payload.imagePlan[index].title;
  });
  if (imageLabelsDiffer) return 'body image labels differ';
  const visible = html.replace(/<[^>]+>/g, ' ').replace(/&(?:amp|quot|apos|#39);/g, ' ').replace(/\s+/g, ' ');
  if (!html.includes(payload.requiredLead.replaceAll("'", '&#39;')) || !visible.includes(BAD_BUNNY_ARIA_PHONE) || !visible.includes('18+')) return 'localized disclaimer, phone or age missing';
  if (!visible.includes('19:30') || !visible.includes('23:00') || !visible.includes('05:00')) return 'programme times missing';
  return null;
}

async function ensureSettings(token: string, eventId: string, payload: BadBunnyAriaEventbritePayload): Promise<void> {
  const settings = await ebFetch(
    `${EVENTBRITE_API}/events/${eventId}/ticket_buyer_settings/`,
    {
      method: 'POST',
      headers: headers(token),
      body: JSON.stringify({ ticket_buyer_settings: { confirmation_message: { html: payload.orderConfirmation }, instructions: { html: payload.orderConfirmation } } }),
    },
    `${payload.marker} confirmation write`,
  );
  if (!settings.ok) throw new Error(`${payload.marker}: confirmation write failed: HTTP ${settings.status}`);
  const music = await ebFetch(
    `${EVENTBRITE_API}/events/${eventId}/music_properties/`,
    { method: 'POST', headers: headers(token), body: JSON.stringify({ music_properties: { age_restriction: '18+', door_time: BAD_BUNNY_ARIA_START_UTC } }) },
    `${payload.marker} music write`,
  );
  if (!music.ok) throw new Error(`${payload.marker}: music properties failed: HTTP ${music.status}`);
}

function ticketDescription(ticket: NonNullable<ExistingEvent['ticket_classes']>[number]): string {
  return typeof ticket.description === 'string'
    ? ticket.description
    : String(ticket.description?.text || ticket.description?.html || '');
}

function decodedHtmlText(value: string): string {
  return value.replace(/<[^>]+>/g, ' ').replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code))).replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(Number.parseInt(code, 16))).replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&quot;/gi, '"').replace(/&apos;|&#39;/gi, "'").replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/\s+/g, ' ').trim();
}

function orderedHtmlUrls(value: string): string[] {
  return [...value.matchAll(/\b(?:href|src)\s*=\s*(["'])(.*?)\1/gi)].map((match) => match[2].replace(/&amp;/gi, '&'));
}

function snapshotSemantics(snapshot: LiveSnapshot): string {
  return JSON.stringify({
    name: snapshot.name, summary: snapshot.summary, logoId: snapshot.logoId, venueId: snapshot.venueId,
    ticket: snapshot.ticket, ageRestriction: snapshot.ageRestriction, doorTime: snapshot.doorTime,
    description: { text: decodedHtmlText(snapshot.descriptionHtml), urls: orderedHtmlUrls(snapshot.descriptionHtml) },
    confirmation: { text: decodedHtmlText(snapshot.confirmationHtml), urls: orderedHtmlUrls(snapshot.confirmationHtml) },
    instructions: { text: decodedHtmlText(snapshot.instructionsHtml), urls: orderedHtmlUrls(snapshot.instructionsHtml) },
  });
}

async function captureLiveSnapshot(token: string, eventId: string, marker: string): Promise<LiveSnapshot> {
  const [eventResponse, settingsResponse, musicResponse] = await Promise.all([
    ebFetch(`${EVENTBRITE_API}/events/${eventId}/?expand=ticket_classes,venue`, { headers: headers(token) }, `${marker} snapshot event`),
    ebFetch(`${EVENTBRITE_API}/events/${eventId}/ticket_buyer_settings/`, { headers: headers(token) }, `${marker} snapshot settings`),
    ebFetch(`${EVENTBRITE_API}/events/${eventId}/music_properties/`, { headers: headers(token) }, `${marker} snapshot music`),
  ]);
  if (!eventResponse.ok || !settingsResponse.ok || !musicResponse.ok) throw new Error(`${marker}: live refresh snapshot failed`);
  const event = await eventResponse.json() as ExistingEvent;
  const settings = await settingsResponse.json();
  const music = await musicResponse.json();
  const tickets = event.ticket_classes || [];
  if (tickets.length !== 1 || !tickets[0].id) throw new Error(`${marker}: snapshot requires exactly one ticket class`);
  const venueId = String(event.venue_id || event.venue?.id || '');
  const logoId = String(event.logo_id || event.logo?.id || '');
  if (!event.name?.text || !logoId || !venueId) throw new Error(`${marker}: snapshot is missing event identity fields`);
  return {
    name: event.name.text,
    summary: String(event.summary || ''),
    descriptionHtml: String(event.description?.html || ''),
    logoId,
    venueId,
    ticket: { id: String(tickets[0].id), name: String(tickets[0].name || ''), description: ticketDescription(tickets[0]) },
    confirmationHtml: String(settings?.confirmation_message?.html || ''),
    instructionsHtml: String(settings?.instructions?.html || ''),
    ageRestriction: String(music?.age_restriction || ''),
    doorTime: String(music?.door_time || ''),
  };
}

async function updateLiveTicket(token: string, eventId: string, ticketId: string, name: string, description: string, marker: string): Promise<void> {
  const response = await ebFetch(`${EVENTBRITE_API}/events/${eventId}/ticket_classes/${ticketId}/`, {
    method: 'POST', headers: headers(token), body: JSON.stringify({ ticket_class: { name, description } }),
  }, `${marker} ticket refresh`);
  if (!response.ok) throw new Error(`${marker}: ticket refresh failed: HTTP ${response.status}`);
}

async function restoreLiveSnapshot(token: string, eventId: string, snapshot: LiveSnapshot, marker: string): Promise<void> {
  const metadata = await ebFetch(`${EVENTBRITE_API}/events/${eventId}/`, { method: 'POST', headers: headers(token), body: JSON.stringify({ event: { name: { html: snapshot.name }, summary: snapshot.summary, logo_id: snapshot.logoId, venue_id: snapshot.venueId } }) }, `${marker} rollback metadata`);
  if (!metadata.ok) throw new Error(`${marker}: automatic rollback metadata failed`);
  const description = await ebFetch(`${EVENTBRITE_API}/events/${eventId}/`, { method: 'POST', headers: headers(token), body: JSON.stringify({ event: { description: { html: snapshot.descriptionHtml } } }) }, `${marker} rollback description`);
  if (!description.ok) throw new Error(`${marker}: automatic rollback description failed`);
  const operations = [
    ebFetch(`${EVENTBRITE_API}/events/${eventId}/ticket_buyer_settings/`, { method: 'POST', headers: headers(token), body: JSON.stringify({ ticket_buyer_settings: { confirmation_message: { html: snapshot.confirmationHtml }, instructions: { html: snapshot.instructionsHtml } } }) }, `${marker} rollback settings`),
    ebFetch(`${EVENTBRITE_API}/events/${eventId}/music_properties/`, { method: 'POST', headers: headers(token), body: JSON.stringify({ music_properties: { age_restriction: snapshot.ageRestriction, door_time: snapshot.doorTime } }) }, `${marker} rollback music`),
  ];
  const responses = await Promise.all(operations);
  if (responses.some((response) => !response.ok)) throw new Error(`${marker}: automatic rollback failed`);
  await updateLiveTicket(token, eventId, snapshot.ticket.id, snapshot.ticket.name, snapshot.ticket.description, marker);
  const restored = await captureLiveSnapshot(token, eventId, marker);
  if (snapshotSemantics(restored) !== snapshotSemantics(snapshot)) throw new Error(`${marker}: automatic rollback readback verification failed`);
}

async function refreshExistingLive(token: string, eventId: string, venueId: string, cover: EventbriteMedia, payload: BadBunnyAriaEventbritePayload): Promise<LiveSnapshot> {
  const snapshot = await captureLiveSnapshot(token, eventId, payload.marker);
  try {
    const metadata = await ebFetch(`${EVENTBRITE_API}/events/${eventId}/`, {
      method: 'POST', headers: headers(token), body: JSON.stringify({ event: { name: { html: payload.title }, summary: payload.summary, logo_id: cover.id, venue_id: venueId } }),
    }, `${payload.marker} live metadata refresh`);
    if (!metadata.ok) throw new Error(`metadata HTTP ${metadata.status}`);
    const description = await ebFetch(`${EVENTBRITE_API}/events/${eventId}/`, {
      method: 'POST', headers: headers(token), body: JSON.stringify({ event: { description: { html: payload.descriptionHtml } } }),
    }, `${payload.marker} live description refresh`);
    if (!description.ok) throw new Error(`description HTTP ${description.status}`);
    await updateLiveTicket(token, eventId, snapshot.ticket.id, payload.ticketName, payload.ticketDescription, payload.marker);
    return snapshot;
  } catch (error) {
    await restoreLiveSnapshot(token, eventId, snapshot, payload.marker);
    throw new Error(`${payload.marker}: live refresh failed and the previous state was restored: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function inspectLive(token: string, eventId: string, venueId: string, payload: BadBunnyAriaEventbritePayload): Promise<{ id: string; url: string; title: string; marker: string }> {
  const [eventResponse, settingsResponse, musicResponse] = await Promise.all([
    ebFetch(`${EVENTBRITE_API}/events/${eventId}/?expand=ticket_classes,venue`, { headers: headers(token) }, `${payload.marker} event readback`),
    ebFetch(`${EVENTBRITE_API}/events/${eventId}/ticket_buyer_settings/`, { headers: headers(token) }, `${payload.marker} confirmation readback`),
    ebFetch(`${EVENTBRITE_API}/events/${eventId}/music_properties/`, { headers: headers(token) }, `${payload.marker} music readback`),
  ]);
  if (!eventResponse.ok || !settingsResponse.ok || !musicResponse.ok) throw new Error(`${payload.marker}: live readback failed`);
  const event = await eventResponse.json() as ExistingEvent & { url?: string };
  const settings = await settingsResponse.json();
  const music = await musicResponse.json();
  const venue = event.venue || {};
  const venueIdCurrent = String(event.venue_id || venue.id || '');
  const gate = descriptionGate(payload, String(event.description?.html || ''));
  const confirmationFields = [
    String(settings?.confirmation_message?.html || ''),
    String(settings?.instructions?.html || ''),
  ];
  const tickets = event.ticket_classes || [];
  if (!['live', 'started'].includes(String(event.status || '')) || event.name?.text !== payload.title || event.start?.utc !== BAD_BUNNY_ARIA_START_UTC || event.end?.utc !== BAD_BUNNY_ARIA_END_UTC) throw new Error(`${payload.marker}: title, status or dates differ after publish`);
  if (venueIdCurrent !== venueId || !venueMatches(venue)) throw new Error(`${payload.marker}: venue readback failed exact name/address/postal gate`);
  if (gate) throw new Error(`${payload.marker}: ${gate}`);
  if (!confirmationFields.every((html) => badBunnyAriaConfirmationFieldComplete(html, payload.locale))) throw new Error(`${payload.marker}: both confirmation fields are incomplete`);
  if (!tickets.some((ticket) => ticket.name === payload.ticketName)) throw new Error(`${payload.marker}: ticket name readback failed`);
  if (music?.age_restriction !== '18+' || music?.door_time !== BAD_BUNNY_ARIA_START_UTC) throw new Error(`${payload.marker}: music properties readback failed`);
  return { id: eventId, url: String(event.url || ''), title: payload.title, marker: payload.marker };
}

async function hydrateStartCandidates(token: string, inventory: ExistingEvent[], payloads: readonly BadBunnyAriaEventbritePayload[]): Promise<ExistingEvent[]> {
  const titles = new Set(payloads.map((payload) => payload.title));
  const markers = payloads.map((payload) => `<!-- ${payload.marker} -->`);
  const candidates = inventory.filter((event) => event.start?.utc === BAD_BUNNY_ARIA_START_UTC && (
    titles.has(String(event.name?.text || '')) || markers.some((marker) => String(event.description?.html || '').includes(marker))
  ));
  const hydrated: ExistingEvent[] = [];
  for (let offset = 0; offset < candidates.length; offset += 5) {
    const chunk = candidates.slice(offset, offset + 5);
    hydrated.push(...await Promise.all(chunk.map(async (candidate) => {
      const response = await ebFetch(`${EVENTBRITE_API}/events/${candidate.id}/?expand=venue`, { headers: headers(token) }, `dedupe hydrate ${candidate.id}`);
      if (!response.ok) throw new Error(`Candidate ${candidate.id} read failed`);
      return await response.json() as ExistingEvent;
    })));
  }
  return hydrated;
}

function findExisting(candidates: ExistingEvent[], payload: BadBunnyAriaEventbritePayload): ExistingEvent | null {
  let sameTitleWithoutMarker = false;
  for (const candidate of candidates) {
    const html = String(candidate.description?.html || '');
    if (html.includes(`<!-- ${payload.marker} -->`)) return candidate;
    const belongsToAnotherExpectedSatellite = /<!-- nlm:curated=bad-bunny-aria-v\d+-(?:en|it|es|fr|de|pt|nl|ru|tr|zh|ar|bg|hr|cs|da|et|fi|el|hu|ga|lv|lt|mt|pl|ro|sk|sl|sv|no|is|uk|sq|sr|bs|mk)-2026-07-18 -->/u.test(html);
    if (candidate.name?.text === payload.title && !belongsToAnotherExpectedSatellite) sameTitleWithoutMarker = true;
  }
  if (sameTitleWithoutMarker) throw new Error(`${payload.marker}: same title and start already exist without the exact curated marker`);
  return null;
}

function persistedBodyImageUrls(event: ExistingEvent, marker: string): [string, string, string, string, string] {
  const tags = [...String(event.description?.html || '').matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  const urls = tags.map((tag) => /\bsrc="([^"]+)"/i.exec(tag)?.[1]?.replace(/&amp;/g, '&') || '');
  if (urls.length !== 5 || urls.some((url) => !/^https:\/\/(?:img|cdn)\.evbuc\.com\//i.test(url))) {
    throw new Error(`${marker}: existing live listing does not retain five trusted Eventbrite CDN body images`);
  }
  return urls as [string, string, string, string, string];
}

async function hydrateAuditCandidates(token: string, candidates: readonly ExistingEvent[]): Promise<ExistingEvent[]> {
  const hydrated: ExistingEvent[] = [];
  for (let offset = 0; offset < candidates.length; offset += 5) {
    const chunk = candidates.slice(offset, offset + 5);
    hydrated.push(...await Promise.all(chunk.map(async (candidate) => {
      const response = await ebFetch(`${EVENTBRITE_API}/events/${candidate.id}/?expand=venue`, { headers: headers(token) }, `audit hydrate ${candidate.id}`);
      if (!response.ok) throw new Error(`Audit candidate ${candidate.id} read failed: HTTP ${response.status}`);
      return await response.json() as ExistingEvent;
    })));
  }
  return hydrated;
}

function stableEventIdCompare(left: ExistingEvent, right: ExistingEvent): number {
  const leftId = String(left.id || '');
  const rightId = String(right.id || '');
  return leftId.length - rightId.length || leftId.localeCompare(rightId, 'en');
}

export async function GET(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const requestUrl = new URL(request.url);
  if (requestUrl.searchParams.get('audit') === '1') {
    const token = getEventbriteToken();
    if (!token) return NextResponse.json({ error: 'EVENTBRITE_TOKEN unavailable in runtime' }, { status: 503 });
    try {
      const venueId = await resolveVerifiedVenue(token, false);
      const inventory = await listVenueEvents(token, venueId);
      const candidates = inventory.filter((event) => event.start?.utc === BAD_BUNNY_ARIA_START_UTC
        && ['live', 'started', 'draft'].includes(String(event.status || ''))).sort(stableEventIdCompare);
      const offset = Math.max(0, Number(requestUrl.searchParams.get('offset')) || 0);
      const limit = Math.max(1, Math.min(20, Number(requestUrl.searchParams.get('limit')) || 20));
      const hydrated = await hydrateAuditCandidates(token, candidates.slice(offset, offset + limit));
      const expected = enabledLocaleCodes.flatMap((locale) => buildBadBunnyAriaEventbritePayloads(locale));
      const expectedByMarker = new Map(expected.map((payload) => [payload.marker, payload]));
      const rows = hydrated.map((event, index) => {
        const html = String(event.description?.html || '');
        const markerRows = [...html.matchAll(/<!-- (nlm:curated=bad-bunny-aria-v\d+-(?:en|it|es|fr|de|pt|nl|ru|tr|zh|ar|bg|hr|cs|da|et|fi|el|hu|ga|lv|lt|mt|pl|ro|sk|sl|sv|no|is|uk|sq|sr|bs|mk)-2026-07-18) -->/gu)].map((match) => {
          const marker = match[1];
          const payload = expectedByMarker.get(marker);
          return {
            marker, expected: Boolean(payload), eventId: String(event.id), status: String(event.status || ''),
            observedTitle: String(event.name?.text || ''), expectedTitle: payload?.title || null,
            titleExact: Boolean(payload) && event.name?.text === payload?.title,
          };
        });
        return { candidateIndex: offset + index, id: String(event.id), status: String(event.status || ''), title: String(event.name?.text || ''), markerRows };
      });
      return NextResponse.json({
        ok: true, audit: true, venueId, expectedMarkerCount: expected.length, candidateTotal: candidates.length,
        chunk: { offset, limit, returned: rows.length, nextOffset: offset + rows.length < candidates.length ? offset + rows.length : null },
        rows,
      });
    } catch (error) {
      return NextResponse.json({ ok: false, audit: true, error: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
  }
  const requested = requestUrl.searchParams.get('locale') || 'it';
  if (!isEnabledLocale(requested)) return NextResponse.json({ error: 'Unsupported locale' }, { status: 400 });
  return NextResponse.json({
    ready: true,
    locale: requested,
    variants: buildBadBunnyAriaEventbritePayloads(requested).map((payload) => ({ variant: payload.variant, keyword: payload.keyword, title: payload.title, marker: payload.marker })),
    affiliateUrl: BAD_BUNNY_ARIA_AFFILIATE_URL,
    startUtc: BAD_BUNNY_ARIA_START_UTC,
    endUtc: BAD_BUNNY_ARIA_END_UTC,
    publicationMode: 'nlm:curated Eventbrite-only satellites; one canonical site event',
  });
}

export async function POST(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const token = getEventbriteToken();
  if (!token) return NextResponse.json({ error: 'EVENTBRITE_TOKEN unavailable in runtime' }, { status: 503 });
  try {
    const body = await request.json().catch(() => ({})) as { locale?: string; fromVariant?: number; max?: number; refreshExisting?: boolean };
    const requestedLocale = body.locale || 'it';
    if (!isEnabledLocale(requestedLocale)) return NextResponse.json({ ok: false, error: 'A supported locale is required' }, { status: 400 });
    const locale = requestedLocale as LocaleCode;
    const fromVariant = Math.max(1, Math.min(10, Number(body.fromVariant) || 1));
    const max = Math.max(1, Math.min(10, Number(body.max) || 10));
    const refreshExisting = body.refreshExisting === true;
    const site = await fetch(buildBadBunnyAriaEventbritePayloads(locale)[0].canonicalSiteUrl, { cache: 'no-store' });
    const siteHtml = await site.text();
    if (!site.ok || !siteHtml.includes('Bad Bunny') || !siteHtml.includes(BAD_BUNNY_ARIA_AFFILIATE_URL)) throw new Error(`Canonical ${locale} site page is not live with Bad Bunny copy and exact Xceed link`);

    const venueId = await resolveVerifiedVenue(token);
    const inventory = await listVenueEvents(token, venueId);
    const sourcePayloads = buildBadBunnyAriaEventbritePayloads(locale).slice(fromVariant - 1, fromVariant - 1 + max);
    const hydratedCandidates = await hydrateStartCandidates(token, inventory, sourcePayloads);
    const existingRows = sourcePayloads.map((payload) => findExisting(hydratedCandidates, payload));
    const needsMedia = refreshExisting || existingRows.some((event) => !event || event.status === 'draft');
    const uploaded = needsMedia ? await uploadAllMedia(token, locale) : null;
    const newCdnUrls = uploaded?.map((entry) => entry.url) as [string, string, string, string, string, string] | undefined;
    const results = [];

    for (let index = 0; index < sourcePayloads.length; index += 1) {
      const sourcePayload = sourcePayloads[index];
      let existing = existingRows[index];
      if (existing?.status === 'draft') {
        const remove = await ebFetch(`${EVENTBRITE_API}/events/${existing.id}/`, { method: 'DELETE', headers: headers(token) }, `${sourcePayload.marker} stale draft delete`);
        if (!remove.ok && remove.status !== 404) throw new Error(`${sourcePayload.marker}: stale draft deletion failed`);
        existing = null;
      }
      const persistedUrls = existing && !refreshExisting ? persistedBodyImageUrls(existing, sourcePayload.marker) : null;
      const mediaUrls = persistedUrls
        ? [persistedUrls[0], ...persistedUrls] as [string, string, string, string, string, string]
        : newCdnUrls;
      if (!mediaUrls) throw new Error(`${sourcePayload.marker}: media manifest unavailable`);
      const payload = buildBadBunnyAriaEventbritePayloads(locale, mediaUrls)[sourcePayload.variant - 1];
      let eventId = existing?.id;
      let refreshSnapshot: LiveSnapshot | null = null;
      if (eventId && refreshExisting) {
        if (!uploaded) throw new Error(`${payload.marker}: refreshed cover media is unavailable`);
        refreshSnapshot = await refreshExistingLive(token, eventId, venueId, uploaded[0], payload);
      } else if (!eventId) {
        if (!uploaded) throw new Error(`${payload.marker}: uploaded cover is unavailable`);
        const result = await publishOneLang({
          token,
          venueEbId: venueId,
          imageId: uploaded[0].id,
          startUtc: BAD_BUNNY_ARIA_START_UTC,
          endUtc: BAD_BUNNY_ARIA_END_UTC,
          title: payload.title,
          summary: payload.summary,
          description: payload.descriptionHtml,
          locale: payload.eventbriteLocale,
          lang: payload.locale,
          ageRestriction: '18+',
          doorTimeISO: BAD_BUNNY_ARIA_START_UTC,
          ticketText: { name: payload.ticketName, description: payload.ticketDescription },
          validateSavedDescription: (savedHtml) => descriptionGate(payload, savedHtml),
        });
        if (!result.ok || !result.ebEventId) throw new Error(`${payload.marker}: ${result.reason || 'publication failed'}`);
        eventId = result.ebEventId;
      }
      try {
        await ensureSettings(token, eventId, payload);
        results.push(await inspectLive(token, eventId, venueId, payload));
      } catch (error) {
        if (refreshSnapshot) {
          await restoreLiveSnapshot(token, eventId, refreshSnapshot, payload.marker);
          throw new Error(`${payload.marker}: confirmation/music/final readback failed and the previous live state was restored: ${error instanceof Error ? error.message : String(error)}`);
        }
        throw error;
      }
      await sleep(1_000);
    }

    return NextResponse.json({ ok: true, locale, count: results.length, venueId, refreshedExisting: refreshExisting, affiliateUrl: BAD_BUNNY_ARIA_AFFILIATE_URL, results });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
