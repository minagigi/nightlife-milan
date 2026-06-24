import { Event, MusicGenre } from './types';
import { rewriteEventSEO } from './seoRewrite';

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const ORG_ID = '2988002072164';

// Map Eventbrite venue name → canonical internal venue id (matches venuesData ids)
function mapVenueId(venueName: string): string {
  const n = (venueName || '').toLowerCase();
  if (n.includes('justme') || n.includes('just me')) return 'v-justme';
  if (n.includes('pineta')) return 'v-pineta';
  if (n.includes('voya')) return 'v-voya';
  if (n.includes('volt')) return 'v-volt';
  if (n.includes('magazzini')) return 'v-magazzini';
  if (n.includes('55 milano') || n.includes('55milano')) return 'v-55milano';
  if (n.includes('church')) return 'v-church81';
  if (n.includes('terrazza')) return 'v-terrazza21';
  if (n.includes('apollo')) return 'v-apollo';
  if (n.includes('play')) return 'v-playclub';
  if (n.includes('repvblic')) return 'v-repvblic';
  if (n.includes('11 club') || n.includes('11club')) return 'v-11clubroom';
  if (n.includes('gattopardo')) return 'v-gattopardo';
  if (n.includes('hollywood')) return 'v-hollywood';
  if (n.includes('armani')) return 'v-armani-prive';
  return 'v-justme';
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
  const token = process.env.EVENTBRITE_TOKEN;
  if (!token) return { error: 'EVENTBRITE_TOKEN not set', hasToken: false };

  const url = `${EVENTBRITE_API}/organizations/${ORG_ID}/events/?status=live&expand=venue,logo,ticket_classes&order_by=start_asc&time_filter=current_future`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
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
  const token = process.env.EVENTBRITE_TOKEN;
  if (!token) return [];

  try {
    const res = await fetch(
      `${EVENTBRITE_API}/organizations/${ORG_ID}/events/?status=live&expand=venue,logo,ticket_classes&order_by=start_asc&time_filter=current_future`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
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
            slug: { en: seo.slugEn, it: seo.slugIt },
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
