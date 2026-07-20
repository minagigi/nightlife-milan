import { NextResponse } from 'next/server';
import { getEventbriteToken } from '@/lib/eventbriteToken';
import { eventbriteVenueMatches, publishOneLang, resolveEventbriteVenueId, sleep } from '@/lib/eventPublisher';
import { updateEventbriteConfirmation } from '@/lib/eventbriteConfirmation';
import {
  buildWorldCupEventbriteEnPayloads,
  validateWorldCupEventbriteEnPayload,
} from '@/lib/worldCupEventbriteEn';
import {
  WORLD_CUP_FINAL_COVER_EN,
  WORLD_CUP_FINAL_EN_URL,
  WORLD_CUP_FINAL_POSTER_EN,
} from '@/lib/worldCupFinalEn';
import { WORLD_CUP_FINAL_AFFILIATE_URL, WORLD_CUP_FINAL_PHONE } from '@/lib/worldCupFinalIt';

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
  if (!html.includes(WORLD_CUP_FINAL_EN_URL)) return 'English canonical URL missing';
  if ((html.match(/<img\b/gi) || []).length !== 5) return 'five body images were not persisted';
  const responsiveImages = html.match(/<img\b[^>]*style="[^"]*width:\s*100%[^"]*max-width:\s*100%[^"]*height:\s*auto[^"]*"[^>]*>/gi) || [];
  if (responsiveImages.length !== 5) return 'responsive body image sizing was not persisted';
  if ((html.match(/data-event-faq="true"/gi) || []).length !== 25) return '25 FAQs were not persisted';
  if (!html.includes('7:30 PM') || !html.includes('9 PM') || /6:00\s*PM/i.test(html)) return 'verified times were not persisted';
  for (const heading of ['Dress code', 'Target audience', 'Mood:', 'Music after the final']) {
    // Eventbrite can add attributes or inline formatting to persisted heading
    // tags. Verify the actual visible heading text without requiring byte-for-
    // byte preservation of the source tag.
    if (findHeadingIndex(heading) < 0) return `${heading} section was not persisted`;
  }
  const contacts = findHeadingIndex('Tickets, tables and confirmation');
  const programme = findHeadingIndex('Evening programme');
  const posterOffset = contacts >= 0 ? html.slice(contacts).search(/<img\b/i) : -1;
  const poster = posterOffset >= 0 ? contacts + posterOffset : -1;
  if (contacts < 0) return 'contacts heading was not persisted';
  if (programme < 0) return 'programme heading was not persisted';
  if (poster < contacts || poster > programme) return 'poster is not immediately after contacts';
  const firstImageTag = html.slice(poster, html.indexOf('>', poster) + 1);
  if (!firstImageTag.includes(WORLD_CUP_FINAL_POSTER_EN.alt)) return 'first body image is not the approved poster';
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
    locale: 'en',
    affiliateUrls: [affiliateUrl],
    context: {
      heading: 'Registration confirmation: Spain vs Argentina at Just Me Milan',
      details: confirmationDetails,
    },
  });
  if (!confirmation.ok) {
    throw new Error(`Personalized Eventbrite confirmation failed for ${eventId}: ${confirmation.reason || `HTTP ${confirmation.status}`}`);
  }
}

async function inspectLiveEvent(
  token: string,
  eventId: string,
  marker: string,
  expectedTitle: string,
  expectedVenueId: string,
  expectedCover?: EventbriteMedia,
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
    coverExact: !expectedCover || eventLogo.includes(expectedCover.id),
    venueExact: eventVenueId === expectedVenueId && eventbriteVenueMatches({
      candidate: event.venue || {},
      expectedName: JUST_ME_EVENTBRITE_VENUE.name,
      expectedStreet: JUST_ME_EVENTBRITE_VENUE.street,
      expectedPostalCode: JUST_ME_EVENTBRITE_VENUE.postalCode,
    }),
    startExact: event.start?.utc === START_UTC,
    endExact: event.end?.utc === END_UTC,
    ticketPresent: Array.isArray(event.ticket_classes) && event.ticket_classes.length > 0,
    confirmationEnglish: /not an admission ticket/i.test(confirmation)
      && confirmation.includes(WORLD_CUP_FINAL_AFFILIATE_URL)
      && confirmation.includes(WORLD_CUP_FINAL_PHONE)
      && confirmation.includes('Spain vs Argentina at Just Me Milan')
      && confirmation.includes('7:30 PM')
      && confirmation.includes('9 PM'),
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

async function deleteStaleDraft(token: string, eventId: string): Promise<void> {
  const response = await fetch(`${EVENTBRITE_API}/events/${eventId}/`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
  const text = await response.text();
  if (!response.ok && response.status !== 404) {
    throw new Error(`Could not delete stale World Cup draft ${eventId}: HTTP ${response.status} ${text.slice(0, 200)}`);
  }
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const payloads = buildWorldCupEventbriteEnPayloads();
  payloads.forEach(validateWorldCupEventbriteEnPayload);
  return NextResponse.json({
    ok: true,
    language: 'en',
    layoutVersion: 'answer-first-v2',
    bodyImageCount: 5,
    date: DATE,
    startUtc: START_UTC,
    endUtc: END_UTC,
    canonicalSiteUrl: WORLD_CUP_FINAL_EN_URL,
    count: payloads.length,
    listings: payloads.map(({ title, summary, marker }) => ({ title, summary, marker })),
  });
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const token = getEventbriteToken();
  if (!token) return NextResponse.json({ ok: false, error: 'EVENTBRITE_TOKEN not set' }, { status: 500 });

  let body: { max?: number; refreshExisting?: boolean } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const max = Math.min(5, Math.max(1, Number(body.max) || 5));

  try {
    const origin = new URL(request.url).origin;
    const existing = await listExistingEvents(token);
    const venueEbId = await resolveEventbriteVenueId(token, 'v-justme', false);
    if (!venueEbId) throw new Error('Could not resolve the Eventbrite venue for Just Me Milano');

    const publicPayloads = buildWorldCupEventbriteEnPayloads();
    publicPayloads.forEach(validateWorldCupEventbriteEnPayload);
    const selected = publicPayloads.slice(0, max);
    const existingByMarker = new Map(selected.map((payload) => [
      payload.marker,
      existing.find((event) => event.description?.html?.includes(payload.marker) || event.name?.text === payload.title),
    ]));
    const needsMedia = body.refreshExisting || selected.some((payload) => {
      const duplicate = existingByMarker.get(payload.marker);
      return !duplicate || duplicate.status === 'draft';
    });

    let coverMedia: EventbriteMedia | undefined;
    const bodyMedia: EventbriteMedia[] = [];
    let payloads = selected;
    if (needsMedia) {
      const requiredAssets = [WORLD_CUP_FINAL_COVER_EN.src, ...selected[0].imagePlan.map((image) => image.src)];
      const assetBytes = [];
      for (const assetPath of requiredAssets) assetBytes.push(await fetchPublicJpeg(origin, assetPath));

      coverMedia = await uploadMedia(token, assetBytes[0], WORLD_CUP_FINAL_COVER_EN.src.split('/').pop()!);
      for (let index = 1; index < assetBytes.length; index += 1) {
        bodyMedia.push(await uploadMedia(token, assetBytes[index], requiredAssets[index].split('/').pop()!));
        await sleep(350);
      }
      payloads = buildWorldCupEventbriteEnPayloads(bodyMedia.map((media) => media.url)).slice(0, max);
    }
    payloads.forEach(validateWorldCupEventbriteEnPayload);
    const results = [];

    for (let index = 0; index < payloads.length; index += 1) {
      const payload = payloads[index];
      const duplicate = existingByMarker.get(payload.marker);
      if (duplicate?.status === 'draft') {
        // A failed previous attempt may leave a marker-matched draft. It has
        // never been on sale, so retire it and let this invocation recreate a
        // complete listing instead of permanently blocking all reruns.
        await deleteStaleDraft(token, duplicate.id);
        await sleep(350);
      } else if (duplicate) {
        if (body.refreshExisting) {
          if (!coverMedia) throw new Error('Eventbrite cover media was not prepared for refresh');
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
        const verified = await inspectLiveEvent(
          token,
          duplicate.id,
          payload.marker,
          payload.title,
          venueEbId,
          body.refreshExisting ? coverMedia : undefined,
        );
        results.push({ ...verified, skipped: true, refreshed: Boolean(body.refreshExisting) });
        continue;
      }

      if (!coverMedia) throw new Error('Eventbrite cover media was not prepared for a new listing');
      const result = await publishOneLang({
        token,
        venueEbId,
        imageId: coverMedia.id,
        startUtc: START_UTC,
        endUtc: END_UTC,
        title: payload.title,
        summary: payload.summary,
        description: payload.descriptionHtml,
        locale: 'en_US',
        lang: 'en',
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

    return NextResponse.json({
      ok: true,
      language: 'en',
      pilotFirstVerified: results.length > 0,
      publishedAndVerified: results.length,
      results,
      media: {
        cover: coverMedia,
        body: bodyMedia,
      },
      venueEbId,
    });
  } catch (error) {
    console.error('[publish-world-cup-en]', error);
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : String(error) }, { status: 502 });
  }
}
