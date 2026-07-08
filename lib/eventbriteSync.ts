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
const SLUG_MARKER_RE = /nlm:src=([^;]+);slug-en=([a-z0-9-]+)/;

function extractSlugMarker(text: string): string | undefined {
  return text?.match(SLUG_MARKER_RE)?.[2];
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

export async function fetchEventbriteEvents(): Promise<Event[]> {
  const token = getEventbriteToken();
  if (!token) return [];

  try {
    const res = await fetch(
      `${EVENTBRITE_API}/organizations/${ORG_ID}/events/?status=live&expand=venue,logo,ticket_classes&order_by=start_asc&time_filter=current_future`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) return [];

    const data = await res.json();
    const raw = (data.events || []) as Array<{
      id: string;
      name: { text: string };
      description?: { text: string; html?: string };
      start: { local: string };
      end: { local: string };
      status: string;
      logo?: { url: string; original?: { url: string } };
      venue?: { name: string };
      ticket_classes?: Array<{ free: boolean; cost?: { major_value: string } }>;
    }>;

    // SEO rewrite each event (AI in the Nightlife Milan voice, fail-safe to
    // rule-based). Cached by content hash so unchanged events aren't re-billed.
    const events = await Promise.all(
      raw.map(async (ev): Promise<Event> => {
        const title = cleanTitle(ev.name.text);
        const desc = (ev.description?.text || title).slice(0, 600);
        const venueId = mapVenueId(ev.venue?.name || '');
        const dateISO = `${ev.start.local}+01:00`;

        const seo = await rewriteEventSEO({ title, description: desc, venueId, dateISO });
        const markerSlug = extractSlugMarker(ev.description?.text || '') || extractSlugMarker(ev.description?.html || '');
        const slugEn = markerSlug || seo.slugEn;
        const slugIt = markerSlug || seo.slugIt;

        return {
          id: `eb-${ev.id}`,
          venueId,
          genre: detectGenre(title + ' ' + desc),
          dateISO,
          endDateISO: `${ev.end.local}+01:00`,
          pricing: {
            entry: extractEntryPrice(ev.ticket_classes),
            currency: 'EUR',
            tableMinSpend: null,
          },
          localizedContent: {
            title: { en: seo.titleEn, it: seo.titleIt },
            shortDescription: { en: seo.descEn, it: seo.descIt },
            slug: { en: slugEn, it: slugIt },
          },
          image: ev.logo?.url || ev.logo?.original?.url,
          isSpecial: /live|special|vip/i.test(title),
          isTrending: ev.status === 'live',
          xceedUrl:
            extractXceedUrl(ev.description?.html || '') ||
            extractXceedUrl(ev.description?.text || '') ||
            `https://www.eventbrite.com/e/${ev.id}`,
        };
      })
    );

    return events;
  } catch {
    return [];
  }
}
