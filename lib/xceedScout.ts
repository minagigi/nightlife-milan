/**
 * Discovery eventi Xceed per i 3 venue dove siamo Ambassador — FASE X1 (piano
 * v4, .claude/plans/2026-07-07-xceed-affiliate-pipeline.md). A differenza dello
 * scout Eventbrite (lib/eventScout.ts, dati di terzi scrapati con incertezza),
 * qui i dati sono UFFICIALI del venue (prezzi/orari/dress code/età reali) e la
 * pagina pubblica è completamente server-rendered (verificato con curl puro,
 * 2026-07-07): JSON-LD Event + Offer[] per ogni ticket/guest list/tavolo.
 */

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const RATE_LIMIT_MS = 1500;
const XCEED_CHANNEL = 'nightlifemilan-1';
const WINDOW_DAYS_DEFAULT = 7;

export const XCEED_VENUES: { venueId: string; venuePageUrl: string; channel: string }[] = [
  { venueId: 'v-justme', venuePageUrl: 'https://xceed.me/en/milano/venue/justme-milano', channel: XCEED_CHANNEL },
  { venueId: 'v-aria', venuePageUrl: 'https://xceed.me/en/milano/venue/aria-club-milano', channel: XCEED_CHANNEL },
  { venueId: 'v-pineta', venuePageUrl: 'https://xceed.me/en/milano/venue/pineta-milano', channel: XCEED_CHANNEL },
];

export const XCEED_VENUE_IDS = XCEED_VENUES.map((v) => v.venueId);

export interface XceedOffer {
  name: string;
  price: number;
  category: 'ticket' | 'guestlist' | 'table';
  details?: string;
}

export interface XceedEvent {
  xceedId: string;
  slug: string;
  publicUrl: string;
  affiliateUrl: string;
  venueId: string;
  name: string;
  startISO: string;
  endISO?: string;
  ageRange?: string;
  description: string;
  dressCode?: string;
  doorsOpen?: string; // "HH:MM" in UTC (orario, non una data — vedi nota in fetchEventDetail)
  offers: XceedOffer[];
  imageUrl?: string;
  genres: string[];
}

function classifyOffer(name: string, price: number): XceedOffer['category'] {
  const n = name.toLowerCase();
  if (price === 0 || /free|pass/.test(n)) return 'guestlist';
  if (/table|vip|dj/.test(n)) return 'table';
  return 'ticket';
}

/** Estrae tutti i blocchi `<script type="application/ld+json">…</script>` di una pagina. */
function extractJsonLdBlocks(html: string): unknown[] {
  const blocks: unknown[] = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      blocks.push(JSON.parse(m[1]));
    } catch {
      continue;
    }
  }
  return blocks;
}

/**
 * Lista eventi di una venue page CON data (slug + id + startingTime). La pagina
 * incorpora un blob RSC con `\"legacyId\":N,\"name\":\"…\",\"slug\":\"…\",
 * \"startingTime\":unixSeconds` per ogni evento — permette di filtrare per
 * finestra temporale QUI, prima di visitare ogni pagina dettaglio (senza
 * questo pre-filtro lo scout supera il maxDuration: una venue page elenca
 * settimane di eventi futuri, non solo la finestra di interesse).
 */
async function fetchVenueEventLinks(venuePageUrl: string): Promise<{ slug: string; xceedId: string; startMs: number }[]> {
  let res: Response;
  try {
    res = await fetch(venuePageUrl, { headers: { 'User-Agent': UA } });
  } catch {
    return [];
  }
  if (!res.ok) return [];

  const html = await res.text();
  const seen = new Set<string>();
  const out: { slug: string; xceedId: string; startMs: number }[] = [];

  const re = /\\"legacyId\\":(\d+),\\"name\\":\\"[^\\]*\\",\\"slug\\":\\"([a-z0-9-]+)\\",\\"startingTime\\":(\d+)/g;
  for (const m of html.matchAll(re)) {
    const xceedId = m[1];
    const slug = m[2];
    const startMs = parseInt(m[3], 10) * 1000;
    const key = `${slug}/${xceedId}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ slug, xceedId, startMs });
  }

  return out;
}

/** Dettaglio completo di un evento: JSON-LD Event+Offer[] + sezioni testuali (Dress Code/Doors/Age). */
async function fetchEventDetail(venueId: string, slug: string, xceedId: string, channel: string): Promise<XceedEvent | null> {
  const publicUrl = `https://xceed.me/en/milano/event/${slug}/${xceedId}`;
  let res: Response;
  try {
    res = await fetch(publicUrl, { headers: { 'User-Agent': UA } });
  } catch {
    return null;
  }
  if (!res.ok) return null;

  const html = await res.text();
  const blocks = extractJsonLdBlocks(html);

  let eventLd: Record<string, unknown> | null = null;
  const offers: XceedOffer[] = [];

  for (const block of blocks) {
    if (!block || typeof block !== 'object') continue;
    const b = block as Record<string, unknown>;
    if (b['@type'] === 'Event') {
      eventLd = b;
      const rawOffers = Array.isArray(b.offers) ? b.offers : b.offers ? [b.offers] : [];
      for (const o of rawOffers as Record<string, unknown>[]) {
        const name = String(o.name || '');
        const price = typeof o.price === 'number' ? o.price : parseFloat(String(o.price || '0')) || 0;
        if (!name) continue;
        offers.push({ name, price, category: classifyOffer(name, price) });
      }
    }
  }

  if (!eventLd) return null;

  // Questi campi vivono in un blob RSC con quote escapate (\"key\":\"value\"),
  // non nel JSON-LD — verificato sulla pagina reale (2026-07-08).
  const ogImageMatch = html.match(/property="og:image" content="([^"]+)"/);
  const dressMatch = html.match(/\\"dressCode\\":\{[^}]*\\"name\\":\\"([^\\]+)\\"/);
  const doorsMatch = html.match(/\\"doorsOpening\\":(\d+)/);
  const minAgeMatch = html.match(/\\"minimumAge\\":(\d+)/);
  const genreMatches = [...html.matchAll(/\\"musicGenres\\":\[([^\]]*)\]/g)]
    .flatMap((m) => [...m[1].matchAll(/\\"name\\":\\"([^\\]+)\\"/g)].map((g) => g[1]));

  // decodeHtmlEntities: og:image arriva con "&amp;" nell'attributo HTML — un
  // URL con "&amp;" letterale invece di "&" romperebbe i parametri di query.
  const decodeEntities = (s: string) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"');

  return {
    xceedId,
    slug,
    publicUrl,
    affiliateUrl: `${publicUrl}/channel/${channel}`,
    venueId,
    name: String(eventLd.name || ''),
    startISO: String(eventLd.startDate || ''),
    endISO: eventLd.endDate ? String(eventLd.endDate) : undefined,
    ageRange: eventLd.typicalAgeRange ? String(eventLd.typicalAgeRange) : (minAgeMatch ? `${minAgeMatch[1]}+` : undefined),
    description: String(eventLd.description || '').slice(0, 3000),
    dressCode: dressMatch?.[1]?.trim(),
    // doorsOpening è un timestamp-template del venue (la DATA è un riferimento
    // arbitrario/storico, non quella dell'evento) — usabile solo per l'ORARIO
    // (UTC hh:mm), da ricombinare con la data reale dell'evento a valle.
    doorsOpen: doorsMatch ? new Date(parseInt(doorsMatch[1], 10) * 1000).toISOString().slice(11, 16) : undefined,
    offers,
    imageUrl: ogImageMatch ? decodeEntities(ogImageMatch[1]) : undefined,
    genres: [...new Set(genreMatches)],
  };
}

/**
 * Scout completo dei 3 venue affiliati Xceed: lista eventi della finestra +
 * dettaglio JSON-LD/offers per ciascuno. Fallisce rumorosamente (evento
 * scartato, mai pubblicato con dati parziali) se il parse non produce un
 * JSON-LD Event valido — vedi COSA NON FARE nel piano.
 */
export async function scoutXceedEvents(daysAhead: number = WINDOW_DAYS_DEFAULT): Promise<XceedEvent[]> {
  const now = new Date();
  const windowEnd = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);

  const results: XceedEvent[] = [];

  for (const venue of XCEED_VENUES) {
    const links = await fetchVenueEventLinks(venue.venuePageUrl);
    await new Promise((r) => setTimeout(r, RATE_LIMIT_MS));

    // Pre-filtro sulla finestra temporale usando startMs della lista — evita
    // di visitare la pagina dettaglio di eventi fuori finestra (una venue page
    // elenca settimane di eventi futuri).
    const inWindow = links.filter((l) => l.startMs >= now.getTime() && l.startMs <= windowEnd.getTime());

    for (const { slug, xceedId } of inWindow) {
      await new Promise((r) => setTimeout(r, RATE_LIMIT_MS));
      const detail = await fetchEventDetail(venue.venueId, slug, xceedId, venue.channel);
      if (!detail || !detail.startISO) continue;

      const start = new Date(detail.startISO);
      if (start < now || start > windowEnd) continue;

      results.push(detail);
    }
  }

  return results;
}
