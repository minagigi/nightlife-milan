import { NextResponse } from 'next/server';
import { fetchOwnOrgEvents } from '@/lib/importLedger';
import { publishOneLang, sleep, PUBLISH_RATE_LIMIT_MS, normalizeAlreadyUtc } from '@/lib/eventPublisher';
import { translateListing, lastTranslatorError } from '@/lib/contentTranslator';
import { LOCALES, getLocaleDef, type LocaleCode } from '@/lib/i18n/locales';
import { getEventbriteToken } from '@/lib/eventbriteToken';
import { getTicketText } from '@/lib/eventRewriter';
import { CONTACT } from '@/config/contact';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';

/**
 * FASE L3 (piano 2026-07-10-multilingual-strategy): worker della coda di
 * pubblicazione multilingua su Eventbrite — TUTTO via API, mai browser.
 *
 * Sorgente di verità: i listing EN GIÀ live della nostra org (marker
 * `nlm:src={base}-en;slug-en=…` nella description). Per ogni lingua del
 * registry ancora mancante per quella serata: traduce title/summary/description
 * /ticket con contentTranslator (Sonnet Tier A, Haiku Tier B) e pubblica un
 * listing separato riusando venue_id, logo_id, categoria e music_properties
 * del listing EN. Idempotente: il marker per-lingua è lo stato della coda —
 * un run interrotto riparte da dove era arrivato.
 *
 *   GET /api/events/publish-locales                 → smaltisce la coda per ~budget
 *   ?dryRun=1                                       → riporta la coda senza pubblicare
 *   ?langs=es,fr                                    → limita alle lingue indicate
 *   ?src=xc-220770                                  → limita a una serata sorgente
 *   ?max=N                                          → tetto rigido di listing per run
 *
 * Auth: Authorization: Bearer CRON_SECRET  oppure  ?secret=INDEXING_SECRET.
 */

// Marker generico (base scout numerica O xc-{id}): lazy fino a `-{lang};`
const ANY_MARKER_RE = /nlm:src=(.+?)-([a-z]{2});slug-en=([^ >]+)/;
// Budget di tempo del loop: entro maxDuration=300 con margine per l'item in corso.
const TIME_BUDGET_MS = 240_000;

interface QueueItem {
  base: string;
  slugEn: string;
  lang: LocaleCode;
  tier: string;
  enEventId: string;
  startLocal: string;
}

/** Lingue target di default: tutte quelle del registry tranne le native en/it, Tier A prima. */
function defaultTargetLangs(): LocaleCode[] {
  const rest = LOCALES.filter((l) => l.tier !== 'native');
  return [...rest.filter((l) => l.tier === 'A'), ...rest.filter((l) => l.tier === 'B')].map((l) => l.code);
}

/**
 * POST — pubblica UN listing con contenuto GIÀ TRADOTTO in-sessione (regola
 * 10 lug: le traduzioni le fa Claude Code sul PC, mai le API Anthropic).
 * Body: { base, enEventId, slugEn, lang, title, summary, descriptionHtml,
 *         ticketName, ticketDescription }
 * Venue/logo/categoria/orari/music_properties vengono copiati dal listing EN.
 */
export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!(process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const token = getEventbriteToken();
  if (!token) return NextResponse.json({ ok: false, error: 'EVENTBRITE_TOKEN not set' }, { status: 500 });

  let body: {
    base?: string; enEventId?: string; slugEn?: string; lang?: string;
    title?: string; summary?: string; descriptionHtml?: string;
    ticketName?: string; ticketDescription?: string;
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
  const s = await srcRes.json();
  if (!s.venue_id || !s.start?.utc || !s.end?.utc) {
    return NextResponse.json({ ok: false, error: 'EN source incomplete' }, { status: 502 });
  }

  const marker = `<!-- nlm:src=${base}-${def.code};slug-en=${slugEn} -->`;
  const result = await publishOneLang({
    token,
    venueEbId: s.venue_id,
    imageId: s.logo_id || '',
    startUtc: normalizeAlreadyUtc(s.start.utc),
    endUtc: normalizeAlreadyUtc(s.end.utc),
    title: title.slice(0, 75),
    summary: summary.slice(0, 140),
    description: `${descriptionHtml}\n${marker}`,
    locale: def.ebLocale,
    lang: def.code,
    ageRestriction: s.music_properties?.age_restriction,
    doorTimeISO: s.music_properties?.door_time,
    ticketText: { name: ticketName.slice(0, 100), description: ticketDescription },
    categoryId: s.category_id,
    subcategoryId: s.subcategory_id,
    formatId: s.format_id,
  });
  return NextResponse.json({ ok: result.ok, base, lang: def.code, url: result.url, reason: result.reason });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const authHeader = request.headers.get('authorization');
  const okCron = process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`;
  const okSecret = process.env.INDEXING_SECRET && searchParams.get('secret') === process.env.INDEXING_SECRET;
  if (!okCron && !okSecret) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const token = getEventbriteToken();
  if (!token) return NextResponse.json({ ok: false, error: 'EVENTBRITE_TOKEN not set' }, { status: 500 });

  const dryRun = searchParams.get('dryRun') === '1';
  const srcFilter = searchParams.get('src');
  const maxParam = parseInt(searchParams.get('max') || '0', 10);
  const langsParam = (searchParams.get('langs') || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean) as LocaleCode[];
  const targetLangs = langsParam.length > 0 ? langsParam.filter((c) => getLocaleDef(c)) : defaultTargetLangs();

  // 1. Stato della coda dai marker dei listing esistenti
  const ownEvents = await fetchOwnOrgEvents();
  const bySrc = new Map<string, { langs: Set<string>; slugEn: string; enEventId?: string; startLocal: string }>();
  for (const ev of ownEvents) {
    const m = ev.description?.html?.match(ANY_MARKER_RE);
    if (!m) continue;
    const [, base, lang, slugEn] = m;
    const entry = bySrc.get(base) || { langs: new Set<string>(), slugEn, startLocal: ev.start?.local || '' };
    entry.langs.add(lang);
    if (lang === 'en') {
      entry.enEventId = ev.id;
      entry.slugEn = slugEn;
      entry.startLocal = ev.start?.local || entry.startLocal;
    }
    bySrc.set(base, entry);
  }

  // 2. Coda: serate più vicine prima (scadono!), per ogni serata le lingue mancanti (Tier A prima)
  const queue: QueueItem[] = [];
  const sources = [...bySrc.entries()]
    .filter(([base, e]) => e.enEventId && (!srcFilter || base === srcFilter))
    .sort((a, b) => a[1].startLocal.localeCompare(b[1].startLocal));
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

  // ?content=<base>: ritorna il contenuto EN sorgente per la traduzione
  // IN-SESSIONE (regola 10 lug: mai tradurre via API Anthropic server-side).
  const contentBase = searchParams.get('content');
  if (contentBase) {
    const entry = bySrc.get(contentBase);
    if (!entry?.enEventId) return NextResponse.json({ ok: false, error: 'EN source not found' }, { status: 404 });
    const res = await fetch(`${EVENTBRITE_API}/events/${entry.enEventId}/?expand=music_properties`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return NextResponse.json({ ok: false, error: `EN fetch ${res.status}` }, { status: 502 });
    const s = await res.json();
    const ticketEn = getTicketText('en');
    return NextResponse.json({
      ok: true,
      base: contentBase,
      enEventId: entry.enEventId,
      slugEn: entry.slugEn,
      langsPresent: [...entry.langs],
      titleEn: s.name?.text || '',
      summaryEn: s.summary || '',
      descriptionHtmlEn: (s.description?.html || '').replace(/<!--\s*nlm:src=[^>]*-->/g, '').trim(),
      ticketNameEn: ticketEn.name,
      ticketDescriptionEn: ticketEn.description(`☎️ ${CONTACT.whatsapp.number}`),
    });
  }

  if (dryRun) {
    return NextResponse.json({
      ok: true,
      dryRun: true,
      sources: sources.length,
      queueSize: queue.length,
      next20: queue.slice(0, 20).map((q) => `${q.base}:${q.lang}`),
    });
  }

  // 3. Smaltimento a budget di tempo (+ tetto esplicito ?max=)
  const started = Date.now();
  const hardMax = maxParam > 0 ? maxParam : Infinity;
  const processed: Array<{ base: string; lang: string; ok: boolean; url?: string; reason?: string }> = [];
  const enCache = new Map<string, Record<string, unknown> | null>();

  for (const item of queue) {
    if (processed.length >= hardMax) break;
    if (Date.now() - started > TIME_BUDGET_MS) break;

    // Listing EN sorgente (cache per serata: più lingue riusano la stessa fetch)
    let src: Record<string, unknown> | null;
    if (enCache.has(item.enEventId)) {
      src = enCache.get(item.enEventId)!;
    } else {
      try {
        const res = await fetch(`${EVENTBRITE_API}/events/${item.enEventId}/?expand=music_properties`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        src = res.ok ? await res.json() : null;
      } catch {
        src = null;
      }
      enCache.set(item.enEventId, src);
    }
    if (!src) {
      processed.push({ base: item.base, lang: item.lang, ok: false, reason: 'EN source fetch failed' });
      continue;
    }

    const s = src as {
      name?: { text?: string };
      summary?: string;
      description?: { html?: string };
      start?: { utc?: string };
      end?: { utc?: string };
      venue_id?: string;
      logo_id?: string;
      category_id?: string;
      subcategory_id?: string;
      format_id?: string;
      music_properties?: { age_restriction?: string; door_time?: string };
    };
    const descriptionEn = (s.description?.html || '').replace(/<!--\s*nlm:src=[^>]*-->/g, '').trim();
    if (!s.name?.text || !descriptionEn || !s.venue_id || !s.start?.utc || !s.end?.utc) {
      processed.push({ base: item.base, lang: item.lang, ok: false, reason: 'EN source incomplete' });
      continue;
    }

    // Traduzione (ticket EN come sorgente del testo ticket)
    const ticketEn = getTicketText('en');
    const translated = await translateListing({
      titleEn: s.name.text,
      summaryEn: s.summary || '',
      descriptionHtmlEn: descriptionEn,
      ticketNameEn: ticketEn.name,
      ticketDescriptionEn: ticketEn.description(`☎️ ${CONTACT.whatsapp.number}`),
      targetLocale: item.lang,
    });
    if (!translated) {
      processed.push({ base: item.base, lang: item.lang, ok: false, reason: `translation failed: ${lastTranslatorError || 'unknown'}` });
      continue;
    }

    const def = getLocaleDef(item.lang)!;
    const marker = `<!-- nlm:src=${item.base}-${item.lang};slug-en=${item.slugEn} -->`;
    const result = await publishOneLang({
      token,
      venueEbId: s.venue_id,
      imageId: s.logo_id || '',
      startUtc: normalizeAlreadyUtc(s.start.utc),
      endUtc: normalizeAlreadyUtc(s.end.utc),
      title: translated.title,
      summary: translated.summary,
      description: `${translated.descriptionHtml}\n${marker}`,
      locale: def.ebLocale,
      lang: item.lang,
      ageRestriction: s.music_properties?.age_restriction,
      doorTimeISO: s.music_properties?.door_time,
      ticketText: { name: translated.ticketName, description: translated.ticketDescription },
      categoryId: s.category_id,
      subcategoryId: s.subcategory_id,
      formatId: s.format_id,
    });

    processed.push({ base: item.base, lang: item.lang, ok: result.ok, url: result.url, reason: result.reason });
    await sleep(PUBLISH_RATE_LIMIT_MS);
  }

  return NextResponse.json({
    ok: true,
    queueSize: queue.length,
    processedCount: processed.length,
    queueRemaining: queue.length - processed.filter((p) => p.ok).length,
    elapsedMs: Date.now() - started,
    processed,
  });
}
