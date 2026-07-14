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
  slugEn: string;
  enEventId?: string;
  startLocal: string;
}

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
      slugEn,
      startLocal: ev.start?.local || '',
    };

    entry.langs.add(lang);
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

  let body: {
    base?: string;
    enEventId?: string;
    slugEn?: string;
    lang?: string;
    title?: string;
    summary?: string;
    descriptionHtml?: string;
    ticketName?: string;
    ticketDescription?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const { base, enEventId, slugEn, lang, title, summary, descriptionHtml, ticketName, ticketDescription } = body;
  const def = lang ? getLocaleDef(lang) : undefined;
  if (!base || !enEventId || !slugEn || !def || !title || !summary || !descriptionHtml || !ticketName || !ticketDescription) {
    return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });
  }

  const srcRes = await fetch(`${EVENTBRITE_API}/events/${enEventId}/?expand=music_properties`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!srcRes.ok) return NextResponse.json({ ok: false, error: `EN fetch ${srcRes.status}` }, { status: 502 });

  const source = await srcRes.json();
  if (!source.venue_id || !source.start?.utc || !source.end?.utc) {
    return NextResponse.json({ ok: false, error: 'EN source incomplete' }, { status: 502 });
  }

  const marker = `<!-- nlm:src=${base}-${def.code};slug-en=${slugEn} -->`;
  const result = await publishOneLang({
    token,
    venueEbId: source.venue_id,
    imageId: source.logo_id || '',
    startUtc: normalizeAlreadyUtc(source.start.utc),
    endUtc: normalizeAlreadyUtc(source.end.utc),
    title: title.slice(0, 75),
    summary: summary.slice(0, 140),
    description: `${descriptionHtml}\n${marker}`,
    locale: def.ebLocale,
    lang: def.code,
    ageRestriction: source.music_properties?.age_restriction,
    doorTimeISO: source.music_properties?.door_time,
    ticketText: { name: ticketName.slice(0, 100), description: ticketDescription },
    categoryId: source.category_id,
    subcategoryId: source.subcategory_id,
    formatId: source.format_id,
  });

  return NextResponse.json({ ok: result.ok, base, lang: def.code, url: result.url, reason: result.reason });
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
