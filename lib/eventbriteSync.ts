import { Event, MusicGenre } from './types';
import { rewriteEventSEO } from './seoRewrite';
import { matchVenueId } from './venueMatching';
import { getEventbriteToken } from './eventbriteToken';

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const ORG_ID = '2988002072164';

// Map Eventbrite venue name → canonical internal venue id (matches venuesData ids).
// Eventi della NOSTRA org sono sempre in uno dei 18 venue: se il nome non matcha
// nessun alias noto (typo, nome leggermente diverso), il fallback a v-justme evita
// di scartare l'evento — comportamento invariato rispetto a prima del refactor.
function mapVenueId(venueName: string): string {
  return matchVenueId(venueName) || 'v-justme';
}

function detectGenre(text: string): MusicGenre[] {
  const t = text.toLowerCase();
  const genres: MusicGenre[] = [];
  if (t.includes('techno')) genres.push(MusicGenre.TECHNO);
  if (t.includes('house') || t.includes('afro house')) genres.push(MusicGenre.HOUSE);
  if (t.includes('hip hop') || t.includes('hiphop') || t.includes('rap') || t.includes('afrobeat') || t.includes('uptown')) genres.push(MusicGenre.HIP_HOP);
  if (t.includes('reggaeton') || t.includes('urban') || t.includes('latin') || t.includes('brasil')) genres.push(MusicGenre.REGGAETON);
  if (t.includes('commercial') || t.includes('pop') || t.includes('top 40')) genres.push(MusicGenre.COMMERCIAL);
  if (t.includes('edm') || t.includes('electronic')) genres.push(MusicGenre.EDM);
  if (t.includes(' live') || t.includes('concert')) genres.push(MusicGenre.LIVE_MUSIC);
  if (t.includes('indie') || t.includes('alternative')) genres.push(MusicGenre.INDIE);
  return genres.length > 0 ? genres : [MusicGenre.COMMERCIAL];
}

// FASE G4B: il publisher (eventRewriter.ts/assembleGoldDescription) incorpora
// nella description un marker (commento HTML) con lo slug canonico deciso
// PRIMA del publish (necessario per il backlink Eventbrite→sito: il link
// viene scritto nell'evento e va puntare a uno slug che il sito genererà
// IDENTICO). Se presente, va usato verbatim al posto della rigenerazione AI —
// coerenza garantita sito↔Eventbrite.
//
// Bug reale corretto: questo regex cercava ancora il vecchio formato testuale
// `[nlm:src=N;slug-en=...]` (con parentesi quadre, id solo numerico) di una
// versione precedente di assembleGoldDescription — MAI aggiornato quando il
// marker è diventato un commento HTML `<!-- nlm:src=X;slug-en=... -->` con id
// anche non numerico (es. "xc-220757" per gli eventi Xceed, FASE X4). Il
// meccanismo di backlink non ha mai effettivamente funzionato: ogni pagina
// sito veniva rigenerata con uno slug AI diverso da quello linkato su
// Eventbrite, e il poll "200 = pagina viva" del publisher risultava un falso
// positivo (una pagina ESISTENTE ma per uno slug diverso/inesistente veniva
// comunque scambiata per quella giusta).
//
// FASE F1 (2026-07-08): con l'architettura "eventi separati" (due listing
// Eventbrite per serata, uno EN uno IT) il marker include anche la lingua
// (`nlm:src={baseId}-{lang};slug-en=...`) — i marker dei 3 eventi legacy
// (pre-pivot) restano nel vecchio formato senza lingua. Bug reale riportato
// dall'utente con screenshot: senza distinguere per lingua, ogni serata
// produceva DUE card identiche su "Upcoming This Week" (una per listing) —
// la card IT mostrava comunque il titolo italiano ma affiancata alla EN,
// invece di essercene una sola che cambia lingua col sito.
const NEW_MARKER_RE = /nlm:src=(.+?)-(en|it);slug-en=([a-z0-9-]+)/;
const LEGACY_MARKER_RE = /nlm:src=([^;]+);slug-en=([a-z0-9-]+)/;

interface ParsedMarker {
  baseId: string;
  lang?: 'en' | 'it';
  slug: string;
}

function parseMarker(text: string | undefined): ParsedMarker | undefined {
  if (!text) return undefined;
  const fresh = text.match(NEW_MARKER_RE);
  if (fresh) return { baseId: fresh[1], lang: fresh[2] as 'en' | 'it', slug: fresh[3] };
  const legacy = text.match(LEGACY_MARKER_RE);
  if (legacy) return { baseId: legacy[1], slug: legacy[2] };
  return undefined;
}

/** Extract the first Xceed link from an Eventbrite event description (HTML or plain text). */
function extractXceedUrl(text: string): string | undefined {
  if (!text) return undefined;
  // href="https://xceed.me/..." (HTML anchor)
  const href = text.match(/href=["']?(https?:\/\/(?:www\.)?xceed\.me\/[^"'\s>]+)/i);
  if (href) return href[1].replace(/[.,;!?)]+$/, '');
  // plain URL in text
  const plain = text.match(/https?:\/\/(?:www\.)?xceed\.me\/[^\s"'<>\)\]]+/i);
  return plain?.[0]?.replace(/[.,;!?)]+$/, '');
}

function cleanTitle(raw: string): string {
  return raw
    .replace(/[·•–—·]/g, '-')
    .replace(/Â·|â|Ã¬|â¬/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function extractEntryPrice(ticketClasses?: Array<{ free: boolean; cost?: { major_value: string } }>): number {
  if (!ticketClasses?.length) return 0;
  const free = ticketClasses.find(t => t.free);
  if (free) return 0;
  const paid = ticketClasses.find(t => t.cost?.major_value);
  return paid ? parseFloat(paid.cost!.major_value) : 0;
}

export async function debugEventbrite() {
  const token = getEventbriteToken();
  if (!token) return { error: 'EVENTBRITE_TOKEN not set', hasToken: false };

  const url = `${EVENTBRITE_API}/organizations/${ORG_ID}/events/?status=live&expand=venue,logo,ticket_classes&order_by=start_asc&time_filter=current_future`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 300 },
  });

  const text = await res.text();
  let parsed: unknown;
  try { parsed = JSON.parse(text); } catch { parsed = text.slice(0, 500); }

  return {
    hasToken: true,
    tokenPrefix: token.slice(0, 6) + '...',
    status: res.status,
    ok: res.ok,
    url,
    responsePreview: parsed,
  };
}

interface RawEbEvent {
  id: string;
  name: { text: string };
  description?: { text: string; html?: string };
  start: { local: string; utc: string };
  end: { local: string; utc: string };
  status: string;
  logo?: { url: string; original?: { url: string } };
  venue?: { name: string };
  ticket_classes?: Array<{ free: boolean; cost?: { major_value: string } }>;
}

/** Costruisce l'Event condiviso da UN listing (venue/data/prezzo/immagine/xceedUrl —
 * identici tra i due listing EN/IT della stessa serata, quindi presi da uno qualsiasi).
 *
 * FASE C0 (2026-07-09, bug reale riportato dall'utente): `ev.start.local` NON ha
 * offset — costruire la data con un `+01:00` hardcoded (ora solare CET) fa
 * slittare di un'ora OGNI evento durante l'ora legale (CEST, marzo-ottobre),
 * mostrando sul sito orari sbagliati (es. un doors-open reale delle 19:30
 * mostrato come 20:30). `ev.start.utc`/`ev.end.utc` sono già UTC vero
 * dall'API — usarli sempre, mai ricostruire l'offset a mano. */
function buildSharedFields(ev: RawEbEvent, title: string, desc: string) {
  const venueId = mapVenueId(ev.venue?.name || '');
  return {
    venueId,
    genre: detectGenre(title + ' ' + desc),
    dateISO: ev.start.utc,
    endDateISO: ev.end.utc,
    pricing: { entry: extractEntryPrice(ev.ticket_classes), currency: 'EUR' as const, tableMinSpend: null },
    image: ev.logo?.url || ev.logo?.original?.url,
    isSpecial: /live|special|vip/i.test(title),
    isTrending: ev.status === 'live',
    xceedUrl:
      extractXceedUrl(ev.description?.html || '') ||
      extractXceedUrl(ev.description?.text || '') ||
      `https://www.eventbrite.com/e/${ev.id}`,
  };
}

/** Prima frase/paragrafo in chiaro dalla description — usata SOLO per i listing
 * "eventi separati" (marker con lingua): sono già il nostro contenuto gold-standard,
 * riscriverli con l'AI generica sarebbe ridondante e, a credito API esaurito,
 * degraderebbe un testo già corretto al fallback rule-based. */
function shortDescFromText(text: string | undefined, fallback: string): string {
  const clean = (text || '').replace(/\s+/g, ' ').trim();
  return clean ? clean.slice(0, 200) : fallback;
}

/**
 * Fetch della lista eventi live con retry — un fallimento transitorio
 * dell'API Eventbrite (rate limit/hiccup) non deve tradursi in una lista
 * vuota indistinguibile da "nessun evento": la pagina evento farebbe
 * notFound() e Next CACHEREBBE quel 404 per l'intera finestra di
 * revalidate (fino a 1h) — bug reale riportato dall'utente (bandierina
 * italiana → 404 su una pagina che pochi minuti dopo rispondeva 200).
 * Dopo i retry, fallisce con throw: i chiamanti tolleranti (homepage,
 * sync) degradano a [], la pagina evento propaga l'errore (500 non
 * cacheato) invece di un 404 cacheabile.
 */
const FETCH_RETRIES = 3;
const FETCH_RETRY_DELAY_MS = 700;

export async function fetchEventbriteEvents(): Promise<Event[]> {
  const token = getEventbriteToken();
  if (!token) return [];

  let lastError: unknown = null;
  let data: { events?: RawEbEvent[] } | null = null;

  for (let attempt = 1; attempt <= FETCH_RETRIES; attempt++) {
    try {
      const res = await fetch(
        `${EVENTBRITE_API}/organizations/${ORG_ID}/events/?status=live&expand=venue,logo,ticket_classes&order_by=start_asc&time_filter=current_future`,
        {
          headers: { Authorization: `Bearer ${token}` },
          next: { revalidate: 300 },
        }
      );
      if (!res.ok) {
        lastError = new Error(`Eventbrite list HTTP ${res.status}`);
      } else {
        data = await res.json();
        break;
      }
    } catch (e) {
      lastError = e;
    }
    if (attempt < FETCH_RETRIES) await new Promise((r) => setTimeout(r, FETCH_RETRY_DELAY_MS * attempt));
  }

  if (!data) {
    throw new Error(`Eventbrite events fetch failed after ${FETCH_RETRIES} attempts: ${(lastError as Error)?.message || 'unknown'}`);
  }

  try {
    const raw = (data.events || []) as RawEbEvent[];

    // FASE F1 (2026-07-08): raggruppare per baseId del marker — l'architettura
    // "eventi separati" pubblica DUE listing (EN+IT) per ogni serata reale; senza
    // raggruppare, ognuno diventava una Event a sé, mostrando due card duplicate
    // (una per lingua) sullo stesso carosello invece di una sola card bilingue.
    interface Group { baseId: string; en?: RawEbEvent; it?: RawEbEvent; singles: RawEbEvent[] }
    const groups = new Map<string, Group>();

    for (const ev of raw) {
      const marker = parseMarker(ev.description?.text) || parseMarker(ev.description?.html);
      const baseId = marker?.baseId || ev.id;
      const group = groups.get(baseId) || { baseId, singles: [] };
      if (marker?.lang === 'en') group.en = ev;
      else if (marker?.lang === 'it') group.it = ev;
      else group.singles.push(ev);
      groups.set(baseId, group);
    }

    const events: Event[] = [];

    for (const group of groups.values()) {
      if (group.en && group.it) {
        // Coppia EN+IT completa — UNA sola card bilingue, niente riscrittura AI:
        // il contenuto è già il nostro gold-standard in entrambe le lingue.
        const marker = parseMarker(group.en.description?.text) || parseMarker(group.en.description?.html);
        const titleEn = cleanTitle(group.en.name.text);
        const titleIt = cleanTitle(group.it.name.text);
        const slug = marker?.slug || '';
        const shared = buildSharedFields(group.en, titleEn, group.en.description?.text || '');

        events.push({
          id: `eb-${group.baseId}`,
          ...shared,
          localizedContent: {
            title: { en: titleEn, it: titleIt },
            shortDescription: {
              en: shortDescFromText(group.en.description?.text, titleEn),
              it: shortDescFromText(group.it.description?.text, titleIt),
            },
            slug: { en: slug, it: slug },
          },
        });
        continue;
      }

      // Gruppo parziale (solo una lingua pubblicata finora) o singolo listing
      // legacy/scout (marker senza lingua, o nessun marker) — comportamento
      // invariato: riscrittura AI generica, fail-safe a rule-based.
      for (const ev of [group.en, group.it, ...group.singles].filter((e): e is RawEbEvent => !!e)) {
        const title = cleanTitle(ev.name.text);
        const desc = (ev.description?.text || title).slice(0, 600);
        const shared = buildSharedFields(ev, title, desc);

        const seo = await rewriteEventSEO({ title, description: desc, venueId: shared.venueId, dateISO: shared.dateISO });
        const marker = parseMarker(ev.description?.text) || parseMarker(ev.description?.html);
        const slugEn = marker?.slug || seo.slugEn;
        const slugIt = marker?.slug || seo.slugIt;

        events.push({
          id: `eb-${ev.id}`,
          ...shared,
          localizedContent: {
            title: { en: seo.titleEn, it: seo.titleIt },
            shortDescription: { en: seo.descEn, it: seo.descIt },
            slug: { en: slugEn, it: slugIt },
          },
        });
      }
    }

    return events;
  } catch (e) {
    // Anche un errore di mapping post-fetch deve propagarsi, mai degradare a
    // lista vuota: stessa ragione del retry sopra (404 cacheato da ISR).
    throw new Error(`Eventbrite events mapping failed: ${(e as Error).message}`);
  }
}
