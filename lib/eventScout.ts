import { matchVenueId } from './venueMatching';

/**
 * Discovery di eventi di terzi nei nostri 18 venue — Fase 0/1 del piano import.
 *
 * Metodo scelto (spike validato 2026-07-07): l'API `/v3/events/search/` è stata
 * rimossa da Eventbrite nel 2020, e il token privato vede solo la nostra org.
 * Le pagine pubbliche di discover Milano (`/d/italy--milano/events--this-week/`
 * e `…events--next-week/`) incorporano un blob `window.__SERVER_DATA__` con TUTTI
 * gli eventi della finestra già in JSON strutturato (id, name, date/time, venue
 * con nome+indirizzo, summary, image, url, organizer id) — niente bisogno di API
 * search né di visitare ogni pagina evento per la fase di list+match. `?page=N`
 * pagina correttamente (verificato: zero overlap tra pagine), nessun blocco
 * bot-detection con uno User-Agent browser standard. this-week + next-week
 * insieme coprono ~12 giorni in avanti, oltre il fabbisogno di 8 giorni del piano.
 *
 * Per ogni candidato matchato (pochi, non tutti i ~1000 eventi scansionati) si
 * visita la pagina evento pubblica per estrarre il JSON-LD completo (schema.org/
 * Event) — l'unica fonte con organizer.name e offers.price accurati, assenti dal
 * feed di lista.
 */

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const RATE_LIMIT_MS = 1500;
const MAX_PAGES_PER_FEED = 40;
const WINDOW_DAYS = 8;

// Listing "evergreen" di aggregatori/rivenditori terzi — non sono un evento di una
// serata specifica ma un funnel di prenotazione perenne per il venue. Pubblicarli
// come se fossero la serata di una data precisa violerebbe la regola "dati
// fattuali intoccabili". Riconosciuti per pattern di titolo.
const EVERGREEN_TITLE_PATTERNS = [
  /calendario\s*eventi/i,
  /prenota(zione)?\s*tavoli/i,
  /ingressi\s*agevolat/i,
  /offerta\s*da\s+cosa\s*fare/i,
];

function isEvergreenListing(title: string): boolean {
  return EVERGREEN_TITLE_PATTERNS.some((re) => re.test(title));
}

export interface ScoutedEvent {
  ebId: string;
  url: string;
  rawTitle: string;
  rawDescription: string;
  dateISO: string;
  endISO?: string;
  venueId: string;
  rawVenueName: string;
  rawOrganizer: string;
  entryPrice: number;
  currency: string;
  genreHint?: string;
  posterUrl?: string;
}

interface DiscoverResult {
  id: string;
  name: string;
  url: string;
  summary?: string;
  start_date: string;
  start_time?: string;
  end_date?: string;
  end_time?: string;
  primary_venue?: { name?: string };
  image?: { original?: { url?: string } };
}

function extractServerData(html: string): { search_data: { events: { pagination: { page_count: number }; results: DiscoverResult[] } } } | null {
  const marker = 'window.__SERVER_DATA__ = ';
  const start = html.indexOf(marker);
  if (start === -1) return null;

  let i = start + marker.length;
  let depth = 0;
  let inStr = false;
  let esc = false;
  let begin = -1;

  for (; i < html.length; i++) {
    const c = html[i];
    if (begin === -1) {
      if (c === '{') { begin = i; depth = 1; }
      continue;
    }
    if (esc) { esc = false; continue; }
    if (c === '\\') { esc = true; continue; }
    if (c === '"') { inStr = !inStr; continue; }
    if (inStr) continue;
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { i++; break; } }
  }

  if (begin === -1) return null;
  try {
    return JSON.parse(html.slice(begin, i));
  } catch {
    return null;
  }
}

async function fetchFeedResults(feedSlug: 'events--this-week' | 'events--next-week'): Promise<DiscoverResult[]> {
  const base = `https://www.eventbrite.it/d/italy--milano/${feedSlug}/`;
  const all: DiscoverResult[] = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages && page <= MAX_PAGES_PER_FEED) {
    const url = page === 1 ? base : `${base}?page=${page}`;
    let res: Response;
    try {
      res = await fetch(url, { headers: { 'User-Agent': UA } });
    } catch {
      break; // errore di rete su questa pagina: non blocca le altre feed
    }
    if (!res.ok) break;

    const html = await res.text();
    const data = extractServerData(html);
    if (!data) break;

    totalPages = data.search_data.events.pagination.page_count;
    all.push(...data.search_data.events.results);

    page++;
    if (page <= totalPages && page <= MAX_PAGES_PER_FEED) {
      await new Promise((r) => setTimeout(r, RATE_LIMIT_MS));
    }
  }

  return all;
}

/** Estrae il JSON-LD schema.org/Event dalla pagina pubblica di un singolo evento. */
async function fetchEventDetail(url: string): Promise<{ organizer: string; description: string; price: number; currency: string } | null> {
  let res: Response;
  try {
    res = await fetch(url, { headers: { 'User-Agent': UA } });
  } catch {
    return null;
  }
  if (!res.ok) return null;

  const html = await res.text();
  // [^>]* dopo l'attributo type: Eventbrite aggiunge data-next-head="" al tag,
  // un match esatto senza attributi extra falliva silenziosamente su ogni pagina.
  const scripts = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];

  for (const m of scripts) {
    try {
      const parsed = JSON.parse(m[1]);
      const events = Array.isArray(parsed) ? parsed : [parsed];
      const ev = events.find((e) => e['@type'] === 'Event');
      if (!ev) continue;

      const offer = Array.isArray(ev.offers) ? ev.offers[0] : ev.offers;
      // Il prezzo può essere un Offer singolo ("price") o un AggregateOffer
      // ("lowPrice"/"highPrice", usiamo il più alto: spesso lowPrice=0 indica
      // solo una fascia promozionale, non che l'ingresso sia gratis).
      const rawPrice = offer?.price ?? offer?.highPrice ?? offer?.lowPrice;
      return {
        organizer: ev.organizer?.name || '',
        description: (ev.description || '').slice(0, 3000),
        price: rawPrice ? parseFloat(rawPrice) : 0,
        // Tutti i nostri venue sono a Milano — il campo priceCurrency del JSON-LD
        // di Eventbrite è inaffidabile (visto "USD" su un evento chiaramente in EUR).
        currency: 'EUR',
      };
    } catch {
      continue;
    }
  }
  return null;
}

/**
 * Scout completo: scansiona this-week + next-week, matcha contro i 18 venue,
 * filtra evergreen/finestra temporale, arricchisce i candidati con i dettagli
 * JSON-LD della pagina evento (solo per i pochi match, non per tutto il feed).
 */
export async function scoutThirdPartyEvents(): Promise<ScoutedEvent[]> {
  const [thisWeek, nextWeek] = await Promise.allSettled([
    fetchFeedResults('events--this-week'),
    fetchFeedResults('events--next-week'),
  ]);

  const rawResults: DiscoverResult[] = [
    ...(thisWeek.status === 'fulfilled' ? thisWeek.value : []),
    ...(nextWeek.status === 'fulfilled' ? nextWeek.value : []),
  ];

  const now = new Date();
  const windowEnd = new Date(now.getTime() + WINDOW_DAYS * 24 * 60 * 60 * 1000);

  const seenEbIds = new Set<string>();
  const candidates: { result: DiscoverResult; venueId: string }[] = [];

  for (const r of rawResults) {
    if (seenEbIds.has(r.id)) continue;
    if (isEvergreenListing(r.name)) continue;

    const venueId = matchVenueId(r.primary_venue?.name || '');
    if (!venueId) continue;

    const eventDate = new Date(`${r.start_date}T${r.start_time || '00:00'}:00`);
    if (eventDate < now || eventDate > windowEnd) continue;

    seenEbIds.add(r.id);
    candidates.push({ result: r, venueId });
  }

  // Arricchimento JSON-LD solo per i candidati sopravvissuti (poche decine al massimo)
  const scouted: ScoutedEvent[] = [];
  for (const { result: r, venueId } of candidates) {
    await new Promise((res) => setTimeout(res, RATE_LIMIT_MS));
    const detail = await fetchEventDetail(r.url);

    scouted.push({
      ebId: r.id,
      url: r.url,
      rawTitle: r.name,
      rawDescription: detail?.description || r.summary || '',
      dateISO: `${r.start_date}T${r.start_time || '00:00'}:00`,
      endISO: r.end_date ? `${r.end_date}T${r.end_time || '00:00'}:00` : undefined,
      venueId,
      rawVenueName: r.primary_venue?.name || '',
      rawOrganizer: detail?.organizer || '',
      entryPrice: detail?.price ?? 0,
      currency: detail?.currency || 'EUR',
      posterUrl: r.image?.original?.url,
    });
  }

  return scouted;
}
