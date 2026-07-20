import { NextResponse } from 'next/server';
import { getEventbriteToken } from '@/lib/eventbriteToken';
import { eventbriteVenueMatches, publishOneLang, resolveEventbriteVenueId, sleep } from '@/lib/eventPublisher';
import { updateEventbriteConfirmation } from '@/lib/eventbriteConfirmation';
import {
  buildWorldCupEventbriteItPayloads,
  getWorldCupCuratedMarker,
  validateWorldCupEventbriteItPayload,
  WORLD_CUP_EVENTBRITE_IT_LIVE_LISTINGS,
  WORLD_CUP_EVENTBRITE_IT_SUPERSEDED_IDS,
} from '@/lib/worldCupEventbriteIt';
import {
  WORLD_CUP_FINAL_AFFILIATE_URL,
  WORLD_CUP_FINAL_COVER_IT,
  WORLD_CUP_FINAL_IT_URL,
  WORLD_CUP_FINAL_PHONE,
  WORLD_CUP_FINAL_POSTER_IT,
} from '@/lib/worldCupFinalIt';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const ORG_ID = '2988002072164';
const START_UTC = '2026-07-19T17:30:00Z';
const END_UTC = '2026-07-20T03:00:00Z';
const DATE = '2026-07-19';
const JUST_ME_EVENTBRITE_VENUE = {
  name: 'Just Me',
  street: 'Viale Luigi Camoens, 2',
  postalCode: '20121',
} as const;

interface EventbriteMedia {
  id: string;
  url: string;
}

interface ExistingEvent {
  id: string;
  status?: string;
  url?: string;
  name?: { text?: string };
  description?: { html?: string };
  start?: { utc?: string };
}

function authHeaders(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}`, 'content-type': 'application/json' };
}

function isAuthorized(request: Request): boolean {
  const bearer = request.headers.get('authorization');
  return Boolean(
    (process.env.CRON_SECRET && bearer === `Bearer ${process.env.CRON_SECRET}`)
      || (process.env.WORLD_CUP_PUBLISH_SECRET && bearer === `Bearer ${process.env.WORLD_CUP_PUBLISH_SECRET}`),
  );
}

async function fetchPublicJpeg(origin: string, assetPath: string): Promise<Uint8Array> {
  const response = await fetch(`${origin}${assetPath}`, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Asset fetch failed for ${assetPath}: HTTP ${response.status}`);
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('image/jpeg')) throw new Error(`Asset ${assetPath} is not a JPEG (${contentType})`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.length < 100_000 || bytes.length > 5_000_000) throw new Error(`Asset ${assetPath} has an invalid size (${bytes.length})`);
  return bytes;
}

async function uploadMedia(token: string, bytes: Uint8Array, filename: string): Promise<EventbriteMedia> {
  const infoRes = await fetch(`${EVENTBRITE_API}/media/upload/?type=image-event-logo&token=${encodeURIComponent(token)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!infoRes.ok) throw new Error(`Media upload preparation failed: HTTP ${infoRes.status} ${(await infoRes.text()).slice(0, 200)}`);
  const info = await infoRes.json();
  const form = new FormData();
  for (const [key, value] of Object.entries(info.upload_data || {})) form.append(key, String(value ?? ''));
  const arrayBuffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
  form.append(info.file_parameter_name || 'file', new Blob([arrayBuffer], { type: 'image/jpeg' }), filename);

  const uploadRes = await fetch(info.upload_url, { method: 'POST', body: form });
  if (!uploadRes.ok) throw new Error(`Media upload failed: HTTP ${uploadRes.status} ${(await uploadRes.text()).slice(0, 200)}`);

  const finalizeRes = await fetch(`${EVENTBRITE_API}/media/upload/`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ upload_token: info.upload_token }),
  });
  if (!finalizeRes.ok) throw new Error(`Media finalize failed: HTTP ${finalizeRes.status} ${(await finalizeRes.text()).slice(0, 200)}`);
  const media = await finalizeRes.json();
  const url = media.original?.url || media.url;
  if (!media.id || !url || !/^https:\/\/(?:img|cdn)\.evbuc\.com\//i.test(url)) {
    throw new Error('Eventbrite media response is missing a trusted id or CDN URL');
  }
  return { id: String(media.id), url };
}

async function listExistingEvents(token: string): Promise<ExistingEvent[]> {
  // Start from the newest dates: this organization has thousands of historical
  // listings, while the five curated events are dated July 19, 2026.
  const base = `${EVENTBRITE_API}/organizations/${ORG_ID}/events/?status=live,draft,started&order_by=start_desc&page_size=200`;
  const events: ExistingEvent[] = [];
  let continuation: string | undefined;
  for (let page = 0; page < 30; page += 1) {
    const url = continuation ? `${base}&continuation=${encodeURIComponent(continuation)}` : base;
    const response = await fetch(url, { headers: authHeaders(token) });
    if (!response.ok) throw new Error(`Eventbrite dedupe lookup failed: HTTP ${response.status} ${(await response.text()).slice(0, 200)}`);
    const body = await response.json();
    const pageEvents = (body.events || []) as ExistingEvent[];
    events.push(...pageEvents);
    const oldestOnPage = pageEvents.at(-1)?.start?.utc;
    if (oldestOnPage && oldestOnPage <= START_UTC) return events;
    continuation = body.pagination?.has_more_items ? body.pagination?.continuation : undefined;
    if (!continuation) return events;
  }
  return events;
}

function descriptionGate(marker: string, html: string): string | null {
  const findHeadingIndex = (heading: string): number => {
    const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = new RegExp(`<h2(?:\\s[^>]*)?>\\s*(?:<[^>]+>\\s*)*${escaped}`, 'i').exec(html);
    return match?.index ?? -1;
  };

  if (!html.includes(`<!-- ${marker} -->`)) return 'curated marker missing';
  if (!html.includes(WORLD_CUP_FINAL_AFFILIATE_URL)) return 'affiliate URL missing';
  if (!html.includes(WORLD_CUP_FINAL_IT_URL)) return 'Italian canonical URL missing';
  if ((html.match(/<img\b/gi) || []).length !== 5) return 'five body images were not persisted';
  const responsiveImages = html.match(/<img\b[^>]*style="[^"]*width:\s*100%[^"]*max-width:\s*100%[^"]*height:\s*auto[^"]*"[^>]*>/gi) || [];
  if (responsiveImages.length !== 5) return 'responsive body image sizing was not persisted';
  if ((html.match(/data-event-faq="true"/gi) || []).length !== 25) return '25 FAQs were not persisted';
  if (!html.includes('19:30') || !html.includes('21:00') || /18:00/.test(html)) return 'verified times were not persisted';
  for (const heading of ['Dress code', 'Target della serata', 'Mood e atmosfera', 'Musica dopo la finale']) {
    // Eventbrite can add attributes or inline formatting to persisted heading
    // tags. Verify the actual visible heading text without requiring byte-for-
    // byte preservation of the source tag.
    if (findHeadingIndex(heading) < 0) return `${heading} section was not persisted`;
  }
  const contacts = findHeadingIndex('Prenotazioni e ingresso');
  const programme = findHeadingIndex('Programma della serata');
  const posterOffset = contacts >= 0 ? html.slice(contacts).search(/<img\b/i) : -1;
  const poster = posterOffset >= 0 ? contacts + posterOffset : -1;
  if (contacts < 0) return 'contacts heading was not persisted';
  if (programme < 0) return 'programme heading was not persisted';
  if (poster < contacts || poster > programme) return 'poster is not immediately after contacts';
  const firstImageTag = html.slice(poster, html.indexOf('>', poster) + 1);
  if (!firstImageTag.includes(WORLD_CUP_FINAL_POSTER_IT.alt)) return 'first body image is not the approved poster';
  return null;
}

async function refreshLiveEvent(params: {
  token: string;
  eventId: string;
  html: string;
  coverMedia: EventbriteMedia;
  venueEbId: string;
  confirmationDetails: string;
  affiliateUrl: string;
}): Promise<void> {
  const { token, eventId, html, coverMedia, venueEbId, confirmationDetails, affiliateUrl } = params;
  const response = await fetch(`${EVENTBRITE_API}/events/${eventId}/`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ event: { description: { html }, logo_id: coverMedia.id, venue_id: venueEbId } }),
  });
  if (!response.ok) {
    throw new Error(`Live event refresh failed for ${eventId}: HTTP ${response.status} ${(await response.text()).slice(0, 200)}`);
  }
  const confirmation = await updateEventbriteConfirmation({
    token,
    eventId,
    locale: 'it',
    affiliateUrls: [affiliateUrl],
    context: {
      heading: 'Conferma registrazione: Spagna-Argentina al Just Me Milano',
      details: confirmationDetails,
    },
  });
  if (!confirmation.ok) {
    throw new Error(`Personalized Eventbrite confirmation failed for ${eventId}: ${confirmation.reason || `HTTP ${confirmation.status}`}`);
  }
}

async function retireSupersededListing(token: string, eventId: string) {
  const headers = authHeaders(token);
  const currentRes = await fetch(`${EVENTBRITE_API}/events/${eventId}/`, { headers });
  if (!currentRes.ok) throw new Error(`Could not inspect superseded listing ${eventId}: HTTP ${currentRes.status}`);
  const current = await currentRes.json();
  if (/^cancell?ed$/i.test(current.status || '')) return { id: eventId, status: 'canceled', attendeeCount: 0, alreadyRetired: true };

  const attendeesRes = await fetch(`${EVENTBRITE_API}/events/${eventId}/attendees/?status=attending&page_size=1`, { headers });
  if (!attendeesRes.ok) throw new Error(`Could not inspect attendees for superseded listing ${eventId}: HTTP ${attendeesRes.status}`);
  const attendees = await attendeesRes.json();
  const attendeeCount = Number(attendees.pagination?.object_count || attendees.attendees?.length || 0);
  if (attendeeCount > 0) throw new Error(`Superseded listing ${eventId} has ${attendeeCount} attendee(s); refusing automatic cancellation`);

  const cancelRes = await fetch(`${EVENTBRITE_API}/events/${eventId}/cancel/`, { method: 'POST', headers });
  const cancelText = await cancelRes.text();
  if (!cancelRes.ok && !/ALREADY_CANCELED/i.test(cancelText)) {
    throw new Error(`Could not cancel superseded listing ${eventId}: HTTP ${cancelRes.status} ${cancelText.slice(0, 200)}`);
  }
  return {
    id: eventId,
    status: 'canceled',
    attendeeCount,
    alreadyRetired: /ALREADY_CANCELED/i.test(cancelText),
    immutableHistoricalUrl: true,
  };
}

async function inspectLiveEvent(
  token: string,
  eventId: string,
  marker: string,
  expectedTitle: string,
  expectedVenueId: string,
  expectedCover: EventbriteMedia,
) {
  const [eventRes, settingsRes, musicRes] = await Promise.all([
    fetch(`${EVENTBRITE_API}/events/${eventId}/?expand=ticket_classes,venue`, { headers: authHeaders(token) }),
    fetch(`${EVENTBRITE_API}/events/${eventId}/ticket_buyer_settings/`, { headers: authHeaders(token) }),
    fetch(`${EVENTBRITE_API}/events/${eventId}/music_properties/`, { headers: authHeaders(token) }),
  ]);
  if (!eventRes.ok) throw new Error(`Live event verification failed for ${eventId}: HTTP ${eventRes.status}`);
  const event = await eventRes.json();
  const settings = settingsRes.ok ? await settingsRes.json() : null;
  const music = musicRes.ok ? await musicRes.json() : null;
  const savedHtml = event.description?.html || '';
  const gateFailure = descriptionGate(marker, savedHtml);
  const confirmation = `${settings?.confirmation_message?.html || ''} ${settings?.instructions?.html || ''}`;
  const eventVenueId = String(event.venue_id || event.venue?.id || '');
  const eventLogo = JSON.stringify(event.logo || {});
  const checks = {
    statusLive: event.status === 'live' || event.status === 'started',
    titleExact: event.name?.text === expectedTitle,
    descriptionComplete: !gateFailure,
    coverPresent: Boolean(event.logo?.url || event.logo?.original?.url),
    coverExact: eventLogo.includes(expectedCover.id),
    venueExact: eventVenueId === expectedVenueId && eventbriteVenueMatches({
      candidate: event.venue || {},
      expectedName: JUST_ME_EVENTBRITE_VENUE.name,
      expectedStreet: JUST_ME_EVENTBRITE_VENUE.street,
      expectedPostalCode: JUST_ME_EVENTBRITE_VENUE.postalCode,
    }),
    startExact: event.start?.utc === START_UTC,
    endExact: event.end?.utc === END_UTC,
    ticketPresent: Array.isArray(event.ticket_classes) && event.ticket_classes.length > 0,
    confirmationItalian: confirmation.includes(WORLD_CUP_FINAL_AFFILIATE_URL)
      && confirmation.includes(WORLD_CUP_FINAL_PHONE)
      && /non (?:è|&egrave;|&#232;) un biglietto/i.test(confirmation)
      && confirmation.includes('Spagna-Argentina al Just Me Milano')
      && confirmation.includes('19:30')
      && confirmation.includes('21:00'),
    age21: /21\+/.test(music?.age_restriction || ''),
    doorTimePresent: Boolean(music?.door_time),
  };
  const failed = Object.entries(checks).filter(([, ok]) => !ok).map(([name]) => name);
  if (failed.length > 0) {
    throw new Error(`Live verification failed for ${eventId}: ${failed.join(', ')}${gateFailure ? ` (${gateFailure})` : ''}`);
  }
  return {
    id: eventId,
    url: event.url,
    title: event.name.text,
    status: event.status,
    startUtc: event.start.utc,
    endUtc: event.end.utc,
    bodyImages: (savedHtml.match(/<img\b/gi) || []).length,
    faqHeadings: (savedHtml.match(/data-event-faq="true"/gi) || []).length,
    descriptionLength: savedHtml.length,
    confirmationConfigured: true,
    ageRestriction: music.age_restriction,
    doorTime: music.door_time,
    venueId: eventVenueId,
    venueAddress: event.venue?.address?.address_1,
    checks,
  };
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const payloads = buildWorldCupEventbriteItPayloads();
  payloads.forEach(validateWorldCupEventbriteItPayload);
  return NextResponse.json({
    ok: true,
    language: 'it',
    layoutVersion: 'answer-first-v2',
    bodyImageCount: 5,
    date: DATE,
    startUtc: START_UTC,
    endUtc: END_UTC,
    canonicalSiteUrl: WORLD_CUP_FINAL_IT_URL,
    count: payloads.length,
    listings: payloads.map(({ title, summary, marker }) => ({ title, summary, marker })),
  });
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const token = getEventbriteToken();
  if (!token) return NextResponse.json({ ok: false, error: 'EVENTBRITE_TOKEN not set' }, { status: 500 });

  let body: { max?: number; refreshExisting?: boolean; retireSuperseded?: boolean } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const max = Math.min(5, Math.max(1, Number(body.max) || 5));

  try {
    const origin = new URL(request.url).origin;
    const existing = await listExistingEvents(token);
    const retired = [];
    if (body.retireSuperseded) {
      for (let index = 0; index < WORLD_CUP_EVENTBRITE_IT_SUPERSEDED_IDS.length; index += 1) {
        const eventId = WORLD_CUP_EVENTBRITE_IT_SUPERSEDED_IDS[index];
        retired.push(await retireSupersededListing(token, eventId));
        await sleep(350);
      }
    }
    const venueEbId = await resolveEventbriteVenueId(token, 'v-justme', false);
    if (!venueEbId) throw new Error('Could not resolve the Eventbrite venue for Just Me Milano');

    const publicPayloads = buildWorldCupEventbriteItPayloads();
    publicPayloads.forEach(validateWorldCupEventbriteItPayload);
    const selected = publicPayloads.slice(0, max);

    const requiredAssets = [WORLD_CUP_FINAL_COVER_IT.src, ...selected[0].imagePlan.map((image) => image.src)];
    const assetBytes = [];
    for (const assetPath of requiredAssets) assetBytes.push(await fetchPublicJpeg(origin, assetPath));

    const coverMedia = await uploadMedia(token, assetBytes[0], WORLD_CUP_FINAL_COVER_IT.src.split('/').pop()!);
    const bodyMedia: EventbriteMedia[] = [];
    for (let index = 1; index < assetBytes.length; index += 1) {
      bodyMedia.push(await uploadMedia(token, assetBytes[index], requiredAssets[index].split('/').pop()!));
      await sleep(350);
    }

    const payloads = buildWorldCupEventbriteItPayloads(bodyMedia.map((media) => media.url)).slice(0, max);
    payloads.forEach(validateWorldCupEventbriteItPayload);
    const results = [];

    for (let index = 0; index < payloads.length; index += 1) {
      const payload = payloads[index];
      const registered = WORLD_CUP_EVENTBRITE_IT_LIVE_LISTINGS.find((listing) => getWorldCupCuratedMarker(listing.key) === payload.marker);
      const duplicate = registered
        ? { id: registered.eventId, status: 'live' }
        : existing.find((event) => event.description?.html?.includes(payload.marker) || event.name?.text === payload.title);
      if (duplicate) {
        if (duplicate.status === 'draft') throw new Error(`A draft already exists for ${payload.marker}: ${duplicate.id}`);
        if (!registered || registered.eventId !== duplicate.id) {
          throw new Error(`Live registry mismatch for ${payload.marker}: expected ${registered?.eventId || 'missing'}, found ${duplicate.id}`);
        }
        if (body.refreshExisting) {
          await refreshLiveEvent({
            token,
            eventId: duplicate.id,
            html: payload.descriptionHtml,
            coverMedia,
            venueEbId,
            confirmationDetails: payload.orderConfirmation,
            affiliateUrl: payload.affiliateUrl,
          });
        }
        const verified = await inspectLiveEvent(token, duplicate.id, payload.marker, payload.title, venueEbId, coverMedia);
        results.push({ ...verified, skipped: true, refreshed: Boolean(body.refreshExisting) });
        continue;
      }

      const result = await publishOneLang({
        token,
        venueEbId,
        imageId: coverMedia.id,
        startUtc: START_UTC,
        endUtc: END_UTC,
        title: payload.title,
        summary: payload.summary,
        description: payload.descriptionHtml,
        locale: 'it_IT',
        lang: 'it',
        ageRestriction: '21+',
        doorTimeISO: START_UTC,
        ticketText: { name: payload.ticketName, description: payload.ticketDescription },
        categoryId: '103',
        validateSavedDescription: (savedHtml) => descriptionGate(payload.marker, savedHtml),
      });
      if (!result.ok || !result.ebEventId) {
        throw new Error(`${payload.marker}: ${result.reason || 'publication failed'}${result.ebEventId ? ` (draft ${result.ebEventId})` : ''}`);
      }
      if (!result.confirmationConfigured) {
        throw new Error(`${payload.marker}: order confirmation was not configured (${result.confirmationReason || 'unknown reason'})`);
      }

      await refreshLiveEvent({
        token,
        eventId: result.ebEventId,
        html: payload.descriptionHtml,
        coverMedia,
        venueEbId,
        confirmationDetails: payload.orderConfirmation,
        affiliateUrl: payload.affiliateUrl,
      });
      const verified = await inspectLiveEvent(token, result.ebEventId, payload.marker, payload.title, venueEbId, coverMedia);
      results.push({ ...verified, skipped: false });

      // Pilot-first gate: listing 1 is fully live-verified before listing 2 can be created.
      if (index < payloads.length - 1) await sleep(3000);
    }

    const complete = results.length === 5 && results.every((result) => Object.values(result.checks).every(Boolean));
    const sitemap = {
      scheduledDaily: true,
      nextAutomaticWindow: '18:00 UTC',
      reason: complete
        ? 'Publication complete; sitemap submission is handled by the protected daily job.'
        : `Publication incomplete: ${results.length}/5 listings verified.`,
    };

    return NextResponse.json({
      ok: true,
      language: 'it',
      pilotFirstVerified: results.length > 0,
      publishedAndVerified: results.length,
      results,
      media: {
        cover: coverMedia,
        body: bodyMedia,
      },
      venueEbId,
      retired,
      sitemap,
    });
  } catch (error) {
    console.error('[publish-world-cup-it]', error);
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : String(error) }, { status: 502 });
  }
}
