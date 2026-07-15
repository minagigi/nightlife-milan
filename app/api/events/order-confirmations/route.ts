import { NextResponse } from 'next/server';
import { detectEventLocale, extractXceedAffiliateUrls, updateEventbriteConfirmation } from '@/lib/eventbriteConfirmation';
import { getEventbriteToken } from '@/lib/eventbriteToken';
import type { LocaleCode } from '@/lib/i18n/locales';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const ORG_ID = '2988002072164';

interface EventbriteEvent {
  id: string;
  name?: { text?: string };
  description?: { html?: string };
  start?: { local?: string };
  status?: string;
  url?: string;
}

interface ConfirmationCandidate {
  id: string;
  title: string;
  start?: string;
  status?: string;
  url?: string;
  locale: LocaleCode;
  affiliateUrls: string[];
}

function isAuthorized(request: Request): boolean {
  return Boolean(process.env.CRON_SECRET && request.headers.get('authorization') === `Bearer ${process.env.CRON_SECRET}`);
}

async function listFutureEvents(token: string): Promise<EventbriteEvent[]> {
  const base = `${EVENTBRITE_API}/organizations/${ORG_ID}/events/?status=live,started&order_by=start_asc&time_filter=current_future&page_size=200`;
  const events: EventbriteEvent[] = [];
  let continuation: string | undefined;

  for (let page = 1; page <= 20; page += 1) {
    const url = continuation ? `${base}&continuation=${encodeURIComponent(continuation)}` : base;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error(`Eventbrite event list failed: HTTP ${res.status}`);
    const body = await res.json();
    events.push(...(body.events || []));
    continuation = body.pagination?.has_more_items ? body.pagination?.continuation : undefined;
    if (!continuation) return events;
  }

  throw new Error('Eventbrite pagination guard exceeded');
}

function classify(events: EventbriteEvent[]): {
  candidates: ConfirmationCandidate[];
  skipped: Array<{ id: string; title: string; reason: string }>;
} {
  const candidates: ConfirmationCandidate[] = [];
  const skipped: Array<{ id: string; title: string; reason: string }> = [];

  for (const event of events) {
    const title = event.name?.text || event.id;
    const html = event.description?.html || '';
    const locale = detectEventLocale(html);
    const affiliateUrls = extractXceedAffiliateUrls(html);

    if (!locale) {
      skipped.push({ id: event.id, title, reason: 'language marker missing' });
      continue;
    }
    if (affiliateUrls.length === 0) {
      skipped.push({ id: event.id, title, reason: 'verified Nightlife Milan Xceed affiliate link missing' });
      continue;
    }

    candidates.push({
      id: event.id,
      title,
      start: event.start?.local,
      status: event.status,
      url: event.url,
      locale,
      affiliateUrls,
    });
  }

  return { candidates, skipped };
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const token = getEventbriteToken();
  if (!token) return NextResponse.json({ error: 'EVENTBRITE_TOKEN not set' }, { status: 500 });

  try {
    const events = await listFutureEvents(token);
    const { candidates, skipped } = classify(events);
    return NextResponse.json({
      ok: true,
      total: events.length,
      eligible: candidates.length,
      skipped: skipped.length,
      candidates: candidates.map((candidate) => ({
        id: candidate.id,
        title: candidate.title,
        start: candidate.start,
        locale: candidate.locale,
        affiliateLinkCount: candidate.affiliateUrls.length,
        url: candidate.url,
      })),
      skippedEvents: skipped,
    });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : String(error) }, { status: 502 });
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const token = getEventbriteToken();
  if (!token) return NextResponse.json({ error: 'EVENTBRITE_TOKEN not set' }, { status: 500 });

  let body: { offset?: number; limit?: number; eventIds?: string[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const offset = Number.isInteger(body.offset) && (body.offset || 0) >= 0 ? body.offset || 0 : 0;
  const limit = Number.isInteger(body.limit) && (body.limit || 0) > 0 ? Math.min(body.limit || 10, 20) : 10;
  const eventIds = Array.isArray(body.eventIds)
    ? new Set(body.eventIds.filter((id) => /^\d+$/.test(id)).slice(0, 20))
    : null;

  try {
    const events = await listFutureEvents(token);
    const { candidates, skipped } = classify(events);
    const selected = eventIds
      ? candidates.filter((candidate) => eventIds.has(candidate.id))
      : candidates.slice(offset, offset + limit);

    if (selected.length === 0) {
      return NextResponse.json({ ok: false, error: 'No eligible events selected', eligible: candidates.length }, { status: 400 });
    }

    const results = [];
    for (const candidate of selected) {
      const result = await updateEventbriteConfirmation({
        token,
        eventId: candidate.id,
        locale: candidate.locale,
        affiliateUrls: candidate.affiliateUrls,
      });
      results.push({
        id: candidate.id,
        title: candidate.title,
        locale: candidate.locale,
        affiliateLinkCount: candidate.affiliateUrls.length,
        ok: result.ok,
        status: result.status,
        reason: result.reason,
      });
      if (selected.length > 1) await new Promise((resolve) => setTimeout(resolve, 500));
    }

    const failed = results.filter((result) => !result.ok);
    return NextResponse.json({
      ok: failed.length === 0,
      eligible: candidates.length,
      skipped: skipped.length,
      selected: selected.length,
      nextOffset: eventIds ? null : offset + selected.length,
      results,
    }, { status: failed.length === 0 ? 200 : 502 });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : String(error) }, { status: 502 });
  }
}
