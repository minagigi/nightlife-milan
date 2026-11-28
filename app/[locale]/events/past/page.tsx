import EditorialPageSections from '@/components/EditorialPageSections';
import PageContextualToc from '@/components/PageContextualToc';
import { getTocLabel35 } from '@/lib/i18n/contextualSilo35';
import type { LocaleCode } from '@/lib/i18n/locales';
import Image from 'next/image';
import { Metadata } from 'next';
import Link from '@/components/LocalizedLink';
import EventCard from '@/components/EventCard';
import { getVenueById, mockEvents } from '@/lib/data';
import { romeDayKey, romeDayKeyOffset, dedupeEventsByIdentity } from '@/lib/calendarEvents';
import { hreflangAlternates, canonicalPageUrl, localePrefix, getLocaleDef, DEFAULT_LOCALE } from '@/lib/i18n/locales';
import { tr } from '@/lib/i18n/t';
import type { Event, Venue } from '@/lib/types';
import { seoRobots, seoTitle, withWhatsApp } from '@/lib/seoMetadata';

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
  const canonical = canonicalPageUrl(baseUrl, locale, '/events/past');
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

  const all: Event[] = [...mockEvents];

  // La sezione "Eventi passati" mostra solo la serata di ieri (da ieri sera in poi):
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
    <main className="bg-[#050505] text-[#F6F1E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-10">
        <p className="text-champagne text-xs tracking-[0.3em] uppercase mb-3">{tr(locale, 'Archive', 'Archivio')}</p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">{heading}</h1>
        <p className="text-white/60 max-w-2xl leading-relaxed">{sub}</p>
      </div>

      <PageContextualToc
        locale={locale}
        variant="compact"
        items={[
          { id: 'archivio-serate', label: getTocLabel35(locale, 'archive') },
          { id: 'prossimi-eventi-attivi', label: getTocLabel35(locale, 'calendar') },
          { id: 'categorie-eventi', label: getTocLabel35(locale, 'categories') },
          { id: 'silo-correlati', label: getTocLabel35(locale, 'related') },
        ]}
      />

      <section id="archivio-serate" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="font-serif text-2xl md:text-3xl text-white mb-6">
          {getTocLabel35(locale, 'archive')}
        </h2>
        {items.length === 0 ? (
          <p className="text-white/60">{emptyMsg}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(({ event, venue }) => (
              <EventCard key={event.id} event={event} venue={venue} lang={locale} />
            ))}
          </div>
        )}
      </section>

      <section id="prossimi-eventi-attivi" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 py-12 border-t border-white/10">
        <h2 className="font-serif text-2xl md:text-3xl text-white mb-4">
          {getTocLabel35(locale, 'calendar')}
        </h2>
        <div className="flex flex-wrap gap-4 pt-2">
          <Link href={`${lp}/events/tonight`} className="px-5 py-2.5 border border-champagne/40 text-champagne hover:bg-champagne hover:text-[#050505] transition-colors text-xs font-mono uppercase tracking-wider">
            {getTocLabel35(locale, 'tonight')} →
          </Link>
          <Link href={`${lp}/events/this-week`} className="px-5 py-2.5 border border-white/20 text-white/80 hover:border-champagne hover:text-champagne transition-colors text-xs font-mono uppercase tracking-wider">
            {getTocLabel35(locale, 'weekend')} →
          </Link>
          <Link href={`${lp}/vip-tables`} className="px-5 py-2.5 border border-white/20 text-white/80 hover:border-champagne hover:text-champagne transition-colors text-xs font-mono uppercase tracking-wider">
            {getTocLabel35(locale, 'pricing')} →
          </Link>
          <Link href={`${lp}/events`} className="px-5 py-2.5 border border-white/20 text-white/80 hover:border-champagne hover:text-champagne transition-colors text-xs font-mono uppercase tracking-wider">
            ← {tr(locale, 'Upcoming events', 'Eventi in programma')}
          </Link>
        </div>
      </section>

      <EditorialPageSections locale={locale as LocaleCode} path={`${localePrefix(locale)}/events/past`} />
    </main>
  );
}
