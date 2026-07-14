import { NextResponse } from 'next/server';
import { fetchOwnOrgEvents } from '@/lib/importLedger';
import { publishOneLang, normalizeAlreadyUtc } from '@/lib/eventPublisher';
import { LOCALES, getLocaleDef, type LocaleCode } from '@/lib/i18n/locales';
import { getEventbriteToken } from '@/lib/eventbriteToken';
import { getTicketText } from '@/lib/eventRewriter';
import { CONTACT } from '@/config/contact';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const ANY_MARKER_RE = /nlm:src=(.+?)-([a-z]{2});slug-en=([^ >]+)/;

interface QueueItem {
  base: string;
  slugEn: string;
  lang: LocaleCode;
  tier: string;
  enEventId: string;
  startLocal: string;
}

interface SourceEntry {
  langs: Set<string>;
  eventsByLang: Map<string, { id: string; status?: string; url?: string }>;
  slugEn: string;
  enEventId?: string;
  startLocal: string;
}

interface LocaleSubmission {
  base?: string;
  enEventId?: string;
  slugEn?: string;
  lang?: string;
  title?: string;
  summary?: string;
  descriptionHtml?: string;
  ticketName?: string;
  ticketDescription?: string;
}

interface EventbriteSourceEvent {
  venue_id?: string;
  logo_id?: string;
  start?: { utc?: string };
  end?: { utc?: string };
  music_properties?: { age_restriction?: string; door_time?: string };
  category_id?: string;
  subcategory_id?: string;
  format_id?: string;
}

const activeLocalePublishes = new Set<string>();

function defaultTargetLangs(): LocaleCode[] {
  const rest = LOCALES.filter((locale) => locale.tier !== 'native');
  return [
    ...rest.filter((locale) => locale.tier === 'A'),
    ...rest.filter((locale) => locale.tier === 'B'),
  ].map((locale) => locale.code);
}

function parseRequestedLangs(searchParams: URLSearchParams): LocaleCode[] {
  const langs = (searchParams.get('langs') || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean) as LocaleCode[];
  return langs.length > 0 ? langs.filter((code) => getLocaleDef(code)) : defaultTargetLangs();
}

async function buildQueue(searchParams: URLSearchParams): Promise<{
  sources: Array<[string, SourceEntry]>;
  queue: QueueItem[];
}> {
  const srcFilter = searchParams.get('src');
  const targetLangs = parseRequestedLangs(searchParams);
  const ownEvents = await fetchOwnOrgEvents();
  const bySrc = new Map<string, SourceEntry>();

  for (const ev of ownEvents) {
    const marker = ev.description?.html?.match(ANY_MARKER_RE);
    if (!marker) continue;

    const [, base, lang, slugEn] = marker;
    const entry = bySrc.get(base) || {
      langs: new Set<string>(),
      eventsByLang: new Map<string, { id: string; status?: string; url?: string }>(),
      slugEn,
      startLocal: ev.start?.local || '',
    };

    entry.langs.add(lang);
    entry.eventsByLang.set(lang, { id: ev.id, status: ev.status, url: ev.url });
    if (lang === 'en') {
      entry.enEventId = ev.id;
      entry.slugEn = slugEn;
      entry.startLocal = ev.start?.local || entry.startLocal;
    }
    bySrc.set(base, entry);
  }

  const sources = [...bySrc.entries()]
    .filter(([base, entry]) => entry.enEventId && (!srcFilter || base === srcFilter))
    .sort((a, b) => a[1].startLocal.localeCompare(b[1].startLocal));

  const queue: QueueItem[] = [];
  for (const [base, entry] of sources) {
    for (const lang of targetLangs) {
      if (!entry.langs.has(lang)) {
        queue.push({
          base,
          slugEn: entry.slugEn,
          lang,
          tier: getLocaleDef(lang)?.tier || 'B',
          enEventId: entry.enEventId!,
          startLocal: entry.startLocal,
        });
      }
    }
  }

  return { sources, queue };
}

/**
 * POST publishes one Eventbrite locale listing.
 *
 * Important: this endpoint never translates. The caller must provide already
 * translated/localized content produced locally in-session. The server only
 * copies venue/logo/time/category/music fields from the EN listing, appends the
 * nlm marker, and submits the final listing to Eventbrite.
 */
export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!(process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = getEventbriteToken();
  if (!token) return NextResponse.json({ ok: false, error: 'EVENTBRITE_TOKEN not set' }, { status: 500 });

  let body: LocaleSubmission & { items?: LocaleSubmission[] };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const isBatchRequest = Array.isArray(body.items) && body.items.length > 0;
  const submissions = isBatchRequest ? body.items! : [body];
  if (submissions.length > 10) {
    return NextResponse.json({ ok: false, error: 'Maximum 10 locale submissions per request' }, { status: 400 });
  }

  const validated = submissions.map((submission) => {
    const def = submission.lang ? getLocaleDef(submission.lang) : undefined;
    const complete = submission.base && submission.enEventId && submission.slugEn && def && submission.title &&
      submission.summary && submission.descriptionHtml && submission.ticketName && submission.ticketDescription;
    return { submission, def, complete: Boolean(complete) };
  });
  if (validated.some((item) => !item.complete)) {
    return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });
  }

  // One marker-ledger read per request, including batch requests. Retrying a
  // successful-but-unacknowledged batch therefore skips listings that already
  // exist without issuing hundreds of organization-list reads.
  const requestedLangs = [...new Set(validated.map((item) => item.def!.code))];
  const preflight = await buildQueue(new URLSearchParams({ langs: requestedLangs.join(',') }));
  const ledgerByBase = new Map(preflight.sources);
  const sourceCache = new Map<string, EventbriteSourceEvent>();
  const results: Array<Record<string, unknown>> = [];

  for (const [index, item] of validated.entries()) {
    const submission = item.submission;
    const def = item.def!;
    const base = submission.base!;
    const key = `${base}:${def.code}`;

    const ledgerSource = ledgerByBase.get(base);
    if (!ledgerSource) {
      results.push({ ok: false, skipped: false, base, lang: def.code, reason: 'source-marker-not-found' });
      continue;
    }
    const existing = ledgerSource.eventsByLang.get(def.code);
    if (existing?.status === 'draft') {
      if (activeLocalePublishes.has(key)) {
        results.push({ ok: false, skipped: false, base, lang: def.code, reason: 'publish-already-in-progress' });
        continue;
      }

      activeLocalePublishes.add(key);
      try {
        const publishRes = await fetch(`${EVENTBRITE_API}/events/${existing.id}/publish/`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!publishRes.ok) {
          const errorBody = await publishRes.text();
          results.push({
            ok: false,
            skipped: false,
            resumed: true,
            base,
            lang: def.code,
            eventId: existing.id,
            reason: `Draft publish failed: ${publishRes.status} ${errorBody.slice(0, 200)}`,
          });
          continue;
        }
        results.push({
          ok: true,
          skipped: false,
          resumed: true,
          base,
          lang: def.code,
          eventId: existing.id,
          url: existing.url,
        });
      } finally {
        activeLocalePublishes.delete(key);
      }
      continue;
    }
    if (ledgerSource.langs.has(def.code)) {
      results.push({ ok: true, skipped: true, base, lang: def.code, reason: 'already-present' });
      continue;
    }

    let source = sourceCache.get(submission.enEventId!);
    if (!source) {
      const srcRes = await fetch(`${EVENTBRITE_API}/events/${submission.enEventId}/?expand=music_properties`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!srcRes.ok) {
        results.push({ ok: false, skipped: false, base, lang: def.code, reason: `EN fetch ${srcRes.status}` });
        continue;
      }
      source = await srcRes.json() as EventbriteSourceEvent;
      sourceCache.set(submission.enEventId!, source);
    }

    if (!source?.venue_id || !source.start?.utc || !source.end?.utc) {
      results.push({ ok: false, skipped: false, base, lang: def.code, reason: 'EN source incomplete' });
      continue;
    }

    const marker = `<!-- nlm:src=${base}-${def.code};slug-en=${submission.slugEn} -->`;
    const description = /<!--\s*nlm:src=[^>]*-->/i.test(submission.descriptionHtml!)
      ? submission.descriptionHtml!
      : `${submission.descriptionHtml}\n${marker}`;
    if (activeLocalePublishes.has(key)) {
      results.push({ ok: false, skipped: false, base, lang: def.code, reason: 'publish-already-in-progress' });
      continue;
    }

    activeLocalePublishes.add(key);
    let result: Awaited<ReturnType<typeof publishOneLang>>;
    try {
      result = await publishOneLang({
        token,
        venueEbId: source.venue_id,
        imageId: source.logo_id || '',
        startUtc: normalizeAlreadyUtc(source.start.utc),
        endUtc: normalizeAlreadyUtc(source.end.utc),
        title: submission.title!.slice(0, 75),
        summary: submission.summary!.slice(0, 140),
        description,
        locale: def.ebLocale,
        lang: def.code,
        ageRestriction: source.music_properties?.age_restriction,
        doorTimeISO: source.music_properties?.door_time,
        ticketText: { name: submission.ticketName!.slice(0, 100), description: submission.ticketDescription! },
        categoryId: source.category_id,
        subcategoryId: source.subcategory_id,
        formatId: source.format_id,
      });
    } finally {
      activeLocalePublishes.delete(key);
    }
    results.push({
      ok: result.ok,
      skipped: false,
      base,
      lang: def.code,
      eventId: result.ebEventId,
      url: result.url,
      reason: result.reason,
    });
    if (index < validated.length - 1) await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  const response = { ok: results.every((result) => result.ok === true), results };
  return NextResponse.json(isBatchRequest ? response : results[0]);
}

/**
 * GET is read-only. It can inspect the missing-locale queue or return EN source
 * content for local translation. It deliberately refuses queue publishing.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const authHeader = request.headers.get('authorization');
  const okCron = process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`;
  const okSecret = process.env.INDEXING_SECRET && searchParams.get('secret') === process.env.INDEXING_SECRET;
  if (!okCron && !okSecret) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const token = getEventbriteToken();
  if (!token) return NextResponse.json({ ok: false, error: 'EVENTBRITE_TOKEN not set' }, { status: 500 });

  const { sources, queue } = await buildQueue(searchParams);
  const contentBase = searchParams.get('content');

  if (contentBase) {
    const entry = sources.find(([base]) => base === contentBase)?.[1];
    if (!entry?.enEventId) return NextResponse.json({ ok: false, error: 'EN source not found' }, { status: 404 });

    const inspectLang = searchParams.get('inspectLang');
    if (inspectLang) {
      const existing = entry.eventsByLang.get(inspectLang);
      if (!existing) return NextResponse.json({ ok: false, error: 'Locale listing not found' }, { status: 404 });

      const inspectRes = await fetch(
        `${EVENTBRITE_API}/events/${existing.id}/?expand=ticket_classes,publish_settings,music_properties`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (!inspectRes.ok) {
        return NextResponse.json({ ok: false, error: `Event inspect ${inspectRes.status}` }, { status: 502 });
      }

      const inspected = await inspectRes.json();
      return NextResponse.json({
        ok: true,
        base: contentBase,
        lang: inspectLang,
        event: {
          id: inspected.id,
          status: inspected.status,
          locale: inspected.locale,
          listed: inspected.listed,
          venueId: inspected.venue_id,
          startUtc: inspected.start?.utc,
          endUtc: inspected.end?.utc,
          summaryLength: inspected.summary?.length || 0,
          descriptionLength: inspected.description?.html?.length || 0,
          ticketClasses: (inspected.ticket_classes || []).map((ticket: Record<string, unknown>) => ({
            id: ticket.id,
            name: ticket.name,
            free: ticket.free,
            quantityTotal: ticket.quantity_total,
            salesEnd: ticket.sales_end,
          })),
          publishSettings: inspected.publish_settings || null,
        },
      });
    }

    const res = await fetch(`${EVENTBRITE_API}/events/${entry.enEventId}/?expand=music_properties`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return NextResponse.json({ ok: false, error: `EN fetch ${res.status}` }, { status: 502 });

    const source = await res.json();
    const ticketEn = getTicketText('en');
    return NextResponse.json({
      ok: true,
      base: contentBase,
      enEventId: entry.enEventId,
      slugEn: entry.slugEn,
      langsPresent: [...entry.langs],
      titleEn: source.name?.text || '',
      summaryEn: source.summary || '',
      descriptionHtmlEn: (source.description?.html || '').replace(/<!--\s*nlm:src=[^>]*-->/g, '').trim(),
      ticketNameEn: ticketEn.name,
      ticketDescriptionEn: ticketEn.description(`+39 351 912 7047`),
      submission: {
        method: 'POST',
        requiredFields: ['base', 'enEventId', 'slugEn', 'lang', 'title', 'summary', 'descriptionHtml', 'ticketName', 'ticketDescription'],
      },
    });
  }

  return NextResponse.json({
    ok: true,
    dryRun: true,
    localOnly: true,
    sources: sources.length,
    queueSize: queue.length,
    next20: queue.slice(0, 20).map((item) => `${item.base}:${item.lang}`),
    message: 'Server-side/API translation is disabled. Translate locally, then POST the completed locale payload.',
  });
}
