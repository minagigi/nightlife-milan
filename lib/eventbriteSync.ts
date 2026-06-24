import { Event, MusicGenre } from './types';

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const ORG_ID = '2988002072164';

// Map Eventbrite venue name → internal venue ID
function mapVenueId(venueName: string): string {
  const n = (venueName || '').toLowerCase();
  if (n.includes('justme') || n.includes('just me')) return 'just-me-milano';
  if (n.includes('pineta')) return 'pineta-milano';
  if (n.includes('voya')) return 'voya-rooftop-milan';
  if (n.includes('volt')) return 'volt-club-milano';
  if (n.includes('magazzini')) return 'magazzini-generali-milano';
  if (n.includes('55 milano') || n.includes('55milano')) return '55-milano';
  if (n.includes('church')) return 'church-81-milano';
  if (n.includes('terrazza')) return 'terrazza-21-milano';
  if (n.includes('apollo')) return 'apollo-club-navigli';
  if (n.includes('aria')) return 'aria-club-milano';
  if (n.includes('repvblic')) return 'repvblic-club-milano';
  return 'just-me-milano';
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

function cleanTitle(raw: string): string {
  return raw
    .replace(/[·•–—·]/g, '-')
    .replace(/Â·|â|Ã¬|â¬/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 70);
}

function extractEntryPrice(ticketClasses?: Array<{ free: boolean; cost?: { major_value: string } }>): number {
  if (!ticketClasses?.length) return 0;
  const free = ticketClasses.find(t => t.free);
  if (free) return 0;
  const paid = ticketClasses.find(t => t.cost?.major_value);
  return paid ? parseFloat(paid.cost!.major_value) : 0;
}

export async function fetchEventbriteEvents(): Promise<Event[]> {
  const token = process.env.EVENTBRITE_TOKEN;
  if (!token) return [];

  try {
    const res = await fetch(
      `${EVENTBRITE_API}/organizations/${ORG_ID}/events/?status=live&expand=venue,logo,ticket_classes&order_by=start_asc&time_filter=current_future`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return [];

    const data = await res.json();
    const raw = (data.events || []) as Array<{
      id: string;
      name: { text: string };
      description?: { text: string };
      start: { local: string };
      end: { local: string };
      status: string;
      logo?: { url: string; original?: { url: string } };
      venue?: { name: string };
      ticket_classes?: Array<{ free: boolean; cost?: { major_value: string } }>;
    }>;

    return raw.map((ev): Event => {
      const title = cleanTitle(ev.name.text);
      const desc = (ev.description?.text || title).slice(0, 200);

      return {
        id: `eb-${ev.id}`,
        venueId: mapVenueId(ev.venue?.name || ''),
        genre: detectGenre(title + ' ' + desc),
        dateISO: `${ev.start.local}+01:00`,
        endDateISO: `${ev.end.local}+01:00`,
        pricing: {
          entry: extractEntryPrice(ev.ticket_classes),
          currency: 'EUR',
          tableMinSpend: null,
        },
        localizedContent: {
          title: { en: title, it: title },
          shortDescription: { en: desc, it: desc },
          slug: {
            en: toSlug(title),
            it: toSlug(title),
          },
        },
        image: ev.logo?.url || ev.logo?.original?.url,
        isSpecial: /live|special|vip/i.test(title),
        isTrending: ev.status === 'live',
        xceedUrl: `https://www.eventbrite.com/e/${ev.id}`,
      };
    });
  } catch {
    return [];
  }
}
