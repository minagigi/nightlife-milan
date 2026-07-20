import { NextResponse } from 'next/server';
import { buildEventbriteConfirmationHtml } from '@/lib/eventbriteConfirmation';
import { getEventbriteToken } from '@/lib/eventbriteToken';
import { enabledLocaleCodes } from '@/lib/i18n/locales';
import { buildWorldCupEventbriteEnPayloads } from '@/lib/worldCupEventbriteEn';
import {
  buildWorldCupEventbriteItPayloads,
  getWorldCupCuratedMarker,
  WORLD_CUP_EVENTBRITE_IT_LIVE_LISTINGS,
} from '@/lib/worldCupEventbriteIt';
import { buildWorldCupEventbriteLocalePayloads } from '@/lib/worldCupEventbriteLocales';
import { WORLD_CUP_FINAL_AFFILIATE_URL } from '@/lib/worldCupFinalIt';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const ORG_ID = '2988002072164';
const OLD_AFFILIATE_URL = 'https://xceed.me/en/milano/event/uptown-nights-73/220784/channel/nightlifemilan-1';
const MARKER_RE = /nlm:curated=wc26-final-v[1-5]-[a-z]{2}-2026-07-19/g;

interface EventbriteEvent {
  id: string;
  status?: string;
  url?: string;
  description?: { html?: string };
}

interface EventbritePage {
  events?: EventbriteEvent[];
  pagination?: { has_more_items?: boolean; continuation?: string };
}

interface ConfirmationSettings {
  confirmation_message?: { html?: string };
  instructions?: { html?: string };
}

function isAuthorized(request: Request): boolean {
  const bearer = request.headers.get('authorization');
  return Boolean(
    (process.env.CRON_SECRET && bearer === `Bearer ${process.env.CRON_SECRET}`)
      || (process.env.WORLD_CUP_PUBLISH_SECRET && bearer === `Bearer ${process.env.WORLD_CUP_PUBLISH_SECRET}`)
      || (process.env.WORLD_CUP_ROLLOUT_SECRET && bearer === `Bearer ${process.env.WORLD_CUP_ROLLOUT_SECRET}`),
  );
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function eventbrite<T>(token: string, pathOrUrl: string, init: RequestInit = {}): Promise<T> {
  const url = pathOrUrl.startsWith('http') ? pathOrUrl : `${EVENTBRITE_API}${pathOrUrl}`;
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const response = await fetch(url, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(init.body ? { 'content-type': 'application/json' } : {}),
        ...init.headers,
      },
      cache: 'no-store',
    });
    if (response.ok) {
      const text = await response.text();
      return (text ? JSON.parse(text) : null) as T;
    }
    const body = (await response.text()).slice(0, 600);
    if ((response.status === 429 || response.status >= 500) && attempt < 6) {
      const retryAfter = Number(response.headers.get('retry-after') || 0);
      const reset = Number(response.headers.get('x-rate-limit-reset') || 0);
      const resetDelay = reset > 0 ? Math.max(0, reset * 1000 - Date.now()) : 0;
      await sleep(Math.min(120_000, Math.max(retryAfter * 1000, resetDelay, attempt * 5_000)));
      continue;
    }
    throw new Error(`${init.method || 'GET'} ${url} failed: ${response.status} ${body}`);
  }
  throw new Error(`Eventbrite retry budget exhausted for ${url}`);
}

function payloadsByMarker(): Map<string, { orderConfirmation: string }> {
  const corePayloads = [
    ...buildWorldCupEventbriteEnPayloads().map((payload) => ({
      ...payload,
      orderConfirmation: buildEventbriteConfirmationHtml('en', [WORLD_CUP_FINAL_AFFILIATE_URL], {
        heading: payload.title,
        details: payload.orderConfirmation,
      }),
    })),
    ...buildWorldCupEventbriteItPayloads().map((payload) => ({
      ...payload,
      orderConfirmation: buildEventbriteConfirmationHtml('it', [WORLD_CUP_FINAL_AFFILIATE_URL], {
        heading: payload.title,
        details: payload.orderConfirmation,
      }),
    })),
  ];
  const payloads = [
    ...corePayloads,
    ...enabledLocaleCodes
      .filter((locale) => locale !== 'en' && locale !== 'it')
      .flatMap((locale) => buildWorldCupEventbriteLocalePayloads(locale)),
  ];
  return new Map(payloads.map((payload) => [payload.marker, { orderConfirmation: payload.orderConfirmation }]));
}

async function listLiveWorldCupEvents(token: string): Promise<Array<{
  event: EventbriteEvent;
  marker: string;
  orderConfirmation: string;
}>> {
  const base = `${EVENTBRITE_API}/organizations/${ORG_ID}/events/?status=live&order_by=start_asc&page_size=200&time_filter=current_future`;
  const events: EventbriteEvent[] = [];
  let continuation: string | undefined;
  do {
    const url = continuation ? `${base}&continuation=${encodeURIComponent(continuation)}` : base;
    const page = await eventbrite<EventbritePage>(token, url);
    events.push(...(page.events || []));
    continuation = page.pagination?.has_more_items ? page.pagination.continuation : undefined;
  } while (continuation);

  const payloadMap = payloadsByMarker();
  const targets = events.flatMap((event) => {
    const markers = [...new Set((event.description?.html || '').match(MARKER_RE) || [])];
    if (markers.length === 0) return [];
    if (markers.length !== 1) throw new Error(`Event ${event.id} has ${markers.length} World Cup markers`);
    const marker = markers[0];
    const payload = payloadMap.get(marker);
    if (!payload) throw new Error(`No prepared localized payload for ${marker}`);
    return [{ event, marker, orderConfirmation: payload.orderConfirmation }];
  }).sort((a, b) => a.marker.localeCompare(b.marker) || a.event.id.localeCompare(b.event.id));
  return targets;
}

async function listDraftWorldCupEvents(token: string): Promise<Array<{ event: EventbriteEvent; marker: string }>> {
  const base = `${EVENTBRITE_API}/organizations/${ORG_ID}/events/?status=draft&order_by=start_asc&page_size=200&time_filter=current_future`;
  const events: EventbriteEvent[] = [];
  let continuation: string | undefined;
  do {
    const url = continuation ? `${base}&continuation=${encodeURIComponent(continuation)}` : base;
    const page = await eventbrite<EventbritePage>(token, url);
    events.push(...(page.events || []));
    continuation = page.pagination?.has_more_items ? page.pagination.continuation : undefined;
  } while (continuation);
  return events.flatMap((event) => {
    const markers = [...new Set((event.description?.html || '').match(MARKER_RE) || [])];
    if (markers.length === 0) return [];
    if (markers.length !== 1) throw new Error(`Draft ${event.id} has ${markers.length} World Cup markers`);
    return [{ event, marker: markers[0] }];
  });
}

async function listRegisteredItalianEvents(token: string): Promise<Array<{
  event: EventbriteEvent;
  marker: string;
  orderConfirmation: string;
}>> {
  const payloadMap = payloadsByMarker();
  const targets = [];
  for (const listing of WORLD_CUP_EVENTBRITE_IT_LIVE_LISTINGS) {
    const marker = getWorldCupCuratedMarker(listing.key);
    const payload = payloadMap.get(marker);
    if (!payload) throw new Error(`No prepared payload for registered Italian marker ${marker}`);
    const event = await eventbrite<EventbriteEvent>(token, `/events/${listing.eventId}/`);
    const html = event.description?.html || '';
    if (event.status !== 'live') throw new Error(`Registered Italian event ${listing.eventId} is not live`);
    if (!html.includes(marker)) throw new Error(`Registered Italian event ${listing.eventId} lost marker ${marker}`);
    targets.push({ event, marker, orderConfirmation: payload.orderConfirmation });
  }
  return targets;
}

function inventory(targets: Awaited<ReturnType<typeof listLiveWorldCupEvents>>) {
  const uniqueMarkerCount = new Set(targets.map(({ marker }) => marker)).size;
  return {
    total: targets.length,
    uniqueMarkerCount,
    duplicateListingCount: targets.length - uniqueMarkerCount,
    localeCount: new Set(targets.map(({ marker }) => marker.match(/-([a-z]{2})-2026-07-19$/)?.[1])).size,
    oldUrlCount: targets.filter(({ event }) => (event.description?.html || '').includes(OLD_AFFILIATE_URL)).length,
    newUrlCount: targets.filter(({ event }) => (event.description?.html || '').includes(WORLD_CUP_FINAL_AFFILIATE_URL)).length,
  };
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const token = getEventbriteToken();
  if (!token) return NextResponse.json({ ok: false, error: 'EVENTBRITE_TOKEN not set' }, { status: 500 });
  try {
    const targets = await listLiveWorldCupEvents(token);
    return NextResponse.json({ ok: true, inventory: inventory(targets) });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : String(error) }, { status: 502 });
  }
}

export async function DELETE(request: Request) {
  if (!isAuthorized(request)) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const token = getEventbriteToken();
  if (!token) return NextResponse.json({ ok: false, error: 'EVENTBRITE_TOKEN not set' }, { status: 500 });
  try {
    const drafts = await listDraftWorldCupEvents(token);
    const deleted = [];
    for (const { event, marker } of drafts) {
      await eventbrite<null>(token, `/events/${event.id}/`, { method: 'DELETE' });
      deleted.push({ eventId: event.id, marker });
    }
    const remaining = await listDraftWorldCupEvents(token);
    if (remaining.length > 0) throw new Error(`World Cup drafts remain after cleanup: ${remaining.map(({ event }) => event.id).join(', ')}`);
    return NextResponse.json({ ok: true, deletedCount: deleted.length, deleted, remaining: 0 });
  } catch (error) {
    console.error('[refresh-world-cup-affiliate:cleanup]', error);
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : String(error) }, { status: 502 });
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const token = getEventbriteToken();
  if (!token) return NextResponse.json({ ok: false, error: 'EVENTBRITE_TOKEN not set' }, { status: 500 });

  try {
    const body = await request.json().catch(() => ({})) as { offset?: number; max?: number; registeredItalianOnly?: boolean };
    const offset = Math.max(0, Math.floor(Number(body.offset) || 0));
    const max = Math.min(15, Math.max(1, Math.floor(Number(body.max) || 10)));
    const targets = body.registeredItalianOnly
      ? await listRegisteredItalianEvents(token)
      : await listLiveWorldCupEvents(token);
    if (targets.length === 0) throw new Error('No live World Cup listings found');
    const selected = targets.slice(offset, offset + max);
    const results = [];

    for (const { event, marker, orderConfirmation } of selected) {
      const currentHtml = event.description?.html || '';
      if (!currentHtml.includes(OLD_AFFILIATE_URL) && !currentHtml.includes(WORLD_CUP_FINAL_AFFILIATE_URL)) {
        throw new Error(`${marker}: neither the old nor the new affiliate URL is present`);
      }
      const updatedHtml = currentHtml.split(OLD_AFFILIATE_URL).join(WORLD_CUP_FINAL_AFFILIATE_URL);
      const descriptionChanged = updatedHtml !== currentHtml;
      if (descriptionChanged) {
        await eventbrite(token, `/events/${event.id}/`, {
          method: 'POST',
          body: JSON.stringify({ event: { description: { html: updatedHtml } } }),
        });
      }

      await eventbrite(token, `/events/${event.id}/ticket_buyer_settings/`, {
        method: 'POST',
        body: JSON.stringify({
          ticket_buyer_settings: {
            confirmation_message: { html: orderConfirmation },
            instructions: { html: orderConfirmation },
          },
        }),
      });

      const [savedEvent, settings] = await Promise.all([
        eventbrite<EventbriteEvent>(token, `/events/${event.id}/`),
        eventbrite<ConfirmationSettings>(token, `/events/${event.id}/ticket_buyer_settings/`),
      ]);
      const savedHtml = savedEvent.description?.html || '';
      const confirmation = settings.confirmation_message?.html || '';
      const instructions = settings.instructions?.html || '';
      if (!savedHtml.includes(marker) || !savedHtml.includes(WORLD_CUP_FINAL_AFFILIATE_URL) || savedHtml.includes(OLD_AFFILIATE_URL)) {
        throw new Error(`${marker}: description readback failed`);
      }
      if ([confirmation, instructions].some((value) => !value.includes(WORLD_CUP_FINAL_AFFILIATE_URL) || value.includes(OLD_AFFILIATE_URL))) {
        throw new Error(`${marker}: order-confirmation readback failed`);
      }
      results.push({ eventId: event.id, eventUrl: savedEvent.url || event.url, marker, descriptionChanged, confirmationsVerified: true });
      await sleep(150);
    }

    const nextOffset = offset + selected.length;
    return NextResponse.json({
      ok: true,
      inventoryBeforeBatch: inventory(targets),
      offset,
      processed: results.length,
      nextOffset,
      complete: nextOffset >= targets.length,
      results,
    });
  } catch (error) {
    console.error('[refresh-world-cup-affiliate]', error);
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : String(error) }, { status: 502 });
  }
}
