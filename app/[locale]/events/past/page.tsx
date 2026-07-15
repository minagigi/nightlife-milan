import { Metadata } from 'next';
import Link from 'next/link';
import EventCard from '@/components/EventCard';
import { fetchEventbriteEvents } from '@/lib/eventbriteSync';
import { getVenueById, mockEvents } from '@/lib/data';
import { romeDayKey, romeDayKeyOffset, dedupeEventsByIdentity } from '@/lib/calendarEvents';
import { hreflangAlternates, localePrefix, getLocaleDef, DEFAULT_LOCALE } from '@/lib/i18n/locales';
import { tr } from '@/lib/i18n/t';
import type { Event, Venue } from '@/lib/types';
import { seoRobots, seoTitle, withWhatsApp } from '@/lib/seoMetadata';

// ISR invece di force-dynamic: la lista mostra solo la serata di ieri, ma il
// fetch Eventbrite (anche limitato agli ultimi giorni) resta costoso →
// force-dynamic lo rifaceva a OGNI richiesta e andava in timeout (lista vuota).
// Con revalidate la pagina è cacheata e rigenerata ~ogni 30min: il confine
// ieri/oggi si aggiorna con un ritardo trascurabile per un archivio.
export const revalidate = 1800;
export const maxDuration = 60;

// Prerendera en/it al build + abilita l'ISR per TUTTI i locale (senza
// generateStaticParams la route dinamica veniva ri-renderizzata a ogni richiesta,
// pagando il fetch ~33s ogni volta invece di servire l'HTML cacheato).
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'it' }];
}

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const def = getLocaleDef(locale) || getLocaleDef(DEFAULT_LOCALE)!;
  const canonical = `${baseUrl}${localePrefix(locale)}/events/past`;
  const title = seoTitle(tr(locale, 'Past Events in Milan | Nightlife Milan Archive', 'Eventi Passati a Milano | Archivio Nightlife Milan'));
  const description = withWhatsApp(tr(
    locale,
    'Browse past nightlife events in Milan — clubs, aperitivo and special nights. Full line-ups, programmes and FAQ preserved for every past night.',
    'Sfoglia gli eventi passati della nightlife milanese — club, aperitivo e serate speciali. Line-up, programmi e FAQ di ogni serata restano consultabili.'
  ), locale);
  return {
    title,
    description,
    alternates: { canonical, languages: hreflangAlternates(baseUrl, '/events/past') },
    robots: seoRobots(locale),
    openGraph: {
      title, description, url: canonical, type: 'website', siteName: 'Nightlife Milan',
      locale: def.ogLocale,
      images: [{ url: `${baseUrl}/images/milan-nightclub-luxury-vip-champagne.webp`, width: 1200, height: 630 }],
    },
  };
}

export default async function PastEventsPage({ params }: Props) {
  const { locale } = await params;
  const lp = localePrefix(locale);
  const todayKey = romeDayKeyOffset(0);
  const yesterdayKey = romeDayKeyOffset(-1);

  let live: Event[] = [];
  try {
    // includePast=true + bound agli ultimi 3 giorni: la lista mostra solo la
    // serata di ieri, quindi non serve scaricare tutta la storia (che cresce e
    // manda in timeout). Le pagine dei singoli eventi più vecchi restano
    // raggiungibili via la route evento (fallback include-past) e la sitemap.
    live = await fetchEventbriteEvents(true, 3);
  } catch {
    live = [];
  }

  // Unione con i mockEvents (eventi one-off statici) senza duplicare.
  const all: Event[] = [...live, ...mockEvents.filter((m) => !live.some((l) => l.id === m.id))];

  // La sezione "Eventi passati" mostra SOLO la serata di ieri (da ieri sera in poi):
  // >= ieri e < oggi nel fuso di Roma. Gli eventi PRECEDENTI a ieri sera NON
  // compaiono qui — ma le loro pagine restano online e indicizzate (sitemap +
  // route evento con fallback su include-past): i link esistono, fuori dalla lista.
  const past = all
    .filter((e) => {
      const k = romeDayKey(e.dateISO);
      return k >= yesterdayKey && k < todayKey;
    })
    .sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1));

  const items = dedupeEventsByIdentity(
    past
      .map((event) => ({ event, venue: getVenueById(event.venueId) }))
      .filter((x): x is { event: Event; venue: Venue } => !!x.venue)
  );

  const heading = tr(locale, 'Past Events', 'Eventi Passati');
  const sub = tr(
    locale,
    'The archive of Milan nights. Every past event stays online — full programme and FAQ preserved.',
    "L'archivio delle serate milanesi. Ogni evento passato resta online — programma e FAQ consultabili."
  );
  const emptyMsg = tr(locale, 'No past events yet.', 'Ancora nessun evento passato.');

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <p className="text-champagne text-xs tracking-[0.3em] uppercase mb-3">{tr(locale, 'Archive', 'Archivio')}</p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">{heading}</h1>
        <p className="text-white/60 max-w-2xl leading-relaxed">{sub}</p>
      </div>

      {items.length === 0 ? (
        <p className="text-white/50">{emptyMsg}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ event, venue }) => (
            <EventCard key={event.id} event={event} venue={venue} lang={locale} />
          ))}
        </div>
      )}

      <div className="mt-14 pt-8 border-t border-white/10">
        <Link href={`${lp}/events`} className="text-champagne hover:text-white transition-colors text-sm tracking-wide">
          ← {tr(locale, 'Upcoming events', 'Eventi in programma')}
        </Link>
      </div>
    </main>
  );
}
