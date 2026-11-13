import { Metadata } from 'next';
import { tr } from '@/lib/i18n/t';
import { hreflangAlternates, canonicalPageUrl, localePrefix } from '@/lib/i18n/locales';
import Link from '@/components/LocalizedLink';
import { getAllCalendarEvents, romeDayKey, romeDayKeyOffset, romeUpcomingSundayKey } from '@/lib/calendarEvents';
import { generateEventListSchema, jsonLdString } from '@/lib/seo';
import DiscoveryGrid from '@/components/DiscoveryGrid';
import { getEventbriteDiscoveryItems, slimDiscoveryItemsForClient } from '@/lib/eventbriteDiscovery';
import { WeeklyNightlifeNavigator, VipQuoteCalculator } from '@/components/NightlifeExpansionModules';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title = tr(
    locale,
    `Upcoming Events This Week in Milan (Autumn/Winter 2026 & NYE 2027) | Nightlife Milan`,
    `Eventi Questa Settimana a Milano (Autunno/Inverno 2026 & Capodanno 2027) | Nightlife Milan`,
  );
  const description = tr(
    locale,
    `Discover all upcoming events, parties, and nights out this week in Milan (Autumn/Winter 2026 & NYE 2027): Just Me 7/7, Pineta, Aria, 55 Milano, Voya Rooftop & Repvblic. WhatsApp +39 351 912 7047.`,
    `Scopri tutti gli eventi, party e serate in programma questa settimana a Milano (Autunno/Inverno 2026 & Capodanno 2027): Just Me 7/7, Pineta, Aria, 55 Milano, Voya Rooftop e Repvblic. WhatsApp +39 351 912 7047.`,
  );

  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const canonical = canonicalPageUrl(baseUrl, locale, '/calendar/this-week');

  const isIt = locale === 'it';
  const ogImage = `${baseUrl}/images/milan-nightclub-luxury-vip-champagne.webp`;

  return {
    title,
    description,
    keywords: isIt
      ? [
          'eventi questa settimana milano',
          'serate milano settimana autunno inverno 2026',
          'club milano questa settimana',
          'agenda vita notturna milano',
          'capodanno 2027 milano calendario',
        ]
      : [
          'events this week milan',
          'milan nightlife this week autumn winter 2026',
          'clubs milan this week',
          'milan party calendar',
          'nye 2027 milan calendar',
        ],
    robots: { index: false, follow: true },
    alternates: {
      canonical,
      languages: hreflangAlternates(baseUrl, '/calendar/this-week'),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: isIt ? 'it_IT' : 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630, alt: tr(locale, 'Milan events this week', 'Eventi questa settimana Milano') }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      site: '@nightlifemilan',
    },
  };
}

const PRIORITY_SIX_WEEK = [
  {
    rank: 1,
    name: 'Just Me Milano',
    slug: 'just-me-milano',
    zone: 'Parco Sempione (Torre Branca)',
    scheduleIt: 'Aperto 7 sere su 7 (Lun – Dom)',
    scheduleEn: 'Open 7 nights a week (Mon – Sun)',
    hoursIt: 'Aperitivo 19:30–22:30 · Cut-Off Liste 00:30 · Clubbing 23:30–05:00',
    hoursEn: 'Aperitivo 19:30–22:30 · Guestlist Cut-Off 00:30 · Clubbing 23:30–05:00',
    pricesIt: 'Royal Aperitivo 20–30€ · Tavoli VIP da 350–500€',
    pricesEn: 'Royal Aperitivo €20–30 · VIP Tables from €350–500',
  },
  {
    rank: 2,
    name: 'Pineta Club Milano',
    slug: 'pineta-club-milano',
    zone: 'Corso Como / Via Messina 38',
    scheduleIt: 'Venerdì, Sabato & Prefestivi (Aperitivo Cantato + Club)',
    scheduleEn: 'Friday, Saturday & Pre-Holidays (Singing Aperitivo + Club)',
    hoursIt: 'Aperitivo 19:30–22:30 · Cut-Off Liste 00:45 · Clubbing 23:30–05:00',
    hoursEn: 'Aperitivo 19:30–22:30 · Guestlist Cut-Off 00:45 · Clubbing 23:30–05:00',
    pricesIt: 'Aperitivo Cantato 20–25€ · Tavoli VIP 300–600€',
    pricesEn: 'Singing Aperitivo €20–25 · VIP Tables €300–600',
  },
  {
    rank: 3,
    name: 'Aria Club Milano',
    slug: 'aria-club-milano',
    zone: 'San Siro · Piazzale dello Sport 14 (150m Stadio Meazza)',
    scheduleIt: 'Giovedì, Venerdì, Sabato & Matchday San Siro',
    scheduleEn: 'Thursday, Friday, Saturday & San Siro Matchdays',
    hoursIt: 'Aperitivo 19:30–22:30 · Cut-Off Liste 01:00 · Clubbing 23:30–05:00',
    hoursEn: 'Aperitivo 19:30–22:30 · Guestlist Cut-Off 01:00 · Clubbing 23:30–05:00',
    pricesIt: 'Aperitivo 15–25€ · Tavoli Pista/Privé da 250€',
    pricesEn: 'Aperitivo €15–25 · Dancefloor/Privé Tables from €250',
  },
  {
    rank: 4,
    name: '55 Milano (FiftyFive)',
    slug: '55-milano',
    zone: 'Arco della Pace / Via Piero della Francesca 55',
    scheduleIt: 'Martedì – Domenica (Apericena XL, Dinner Show & The Wall)',
    scheduleEn: 'Tuesday – Sunday (XXL Apericena, Dinner Show & The Wall)',
    hoursIt: 'Apericena 19:30–22:30 · Cut-Off Liste 00:45 · Clubbing 23:30–04:30',
    hoursEn: 'Apericena 19:30–22:30 · Guestlist Cut-Off 00:45 · Clubbing 23:30–04:30',
    pricesIt: 'Apericena 20–30€ · Dinner Show 50€ · Tavoli da 250€',
    pricesEn: 'Apericena €20–30 · Dinner Show €50 · Tables from €250',
  },
  {
    rank: 5,
    name: 'Voya Rooftop Milan',
    slug: 'voya-rooftop-milan',
    zone: 'Isola / Portello — 20° Piano Vista Skyline',
    scheduleIt: 'Martedì – Domenica (Sunset & Sky Lounge DJ Set)',
    scheduleEn: 'Tuesday – Sunday (Sunset & Sky Lounge DJ Set)',
    hoursIt: 'Aperitivo 19:30–22:30 · Cut-Off Liste 00:30 · Clubbing 23:30–04:00',
    hoursEn: 'Aperitivo 19:30–22:30 · Guestlist Cut-Off 00:30 · Clubbing 23:30–04:00',
    pricesIt: 'Aperitivo Panoramico 20–30€ · Tavoli Vetrata da 250–350€',
    pricesEn: 'Panoramic Aperitivo €20–30 · Window Tables from €250–350',
  },
  {
    rank: 6,
    name: 'Repvblic Milano',
    slug: 'repvblic-milano',
    zone: 'Piazza della Repubblica / Mecenate',
    scheduleIt: 'Lunedì (Dirty Monday), Venerdì & Sabato',
    scheduleEn: 'Monday (Dirty Monday), Friday & Saturday',
    hoursIt: 'Ingresso 23:30 · Cut-Off Liste 01:00 · Clubbing 23:30–05:00',
    hoursEn: 'Doors 23:30 · Guestlist Cut-Off 01:00 · Clubbing 23:30–05:00',
    pricesIt: 'Tavoli Pista da 300€ · Privé da 500€',
    pricesEn: 'Dancefloor Tables from €300 · Privé from €500',
  },
];

export default async function ThisWeekPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === 'it';
  const lp = localePrefix(locale);

  const allItems = getEventbriteDiscoveryItems(await getAllCalendarEvents(), locale);
  const todayKey = romeDayKeyOffset(0);
  const sundayKey = romeUpcomingSundayKey();

  const items = allItems.filter(({ event }) => {
    const key = romeDayKey(event.dateISO);
    return key >= todayKey && key <= sundayKey;
  });

  const eventListSchema =
    items.length > 0
      ? generateEventListSchema(items, locale, tr(locale, 'Milan Events This Week', 'Eventi Milano Questa Settimana'))
      : null;

  const t = {
    title: tr(
      locale,
      `Upcoming Events This Week — Autumn/Winter 2026 & NYE 2027`,
      `Eventi in Arrivo Questa Settimana — Autunno/Inverno 2026 & Capodanno 2027`,
    ),
    intro: tr(
      locale,
      `Discover all upcoming events in Milan across the 6 priority clubs (1. Just Me 7/7, 2. Pineta, 3. Aria, 4. 55 Milano, 5. Voya Rooftop, 6. Repvblic).`,
      `Scopri tutti gli eventi in programma questa settimana a Milano nei 6 club prioritari (1. Just Me 7/7, 2. Pineta, 3. Aria, 4. 55 Milano, 5. Voya Rooftop, 6. Repvblic).`,
    ),
    gridTitle: tr(locale, `Upcoming This Week`, `In Programma Questa Settimana`),
    gridSubtitle: tr(locale, 'The best parties selected for you', 'I migliori party selezionati per te'),
  };

  return (
    <>
      {eventListSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(eventListSchema) }} />
      )}
      <main className="flex-1 bg-[#050505] w-full pt-20">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-white/40" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <Link href={lp || '/'} className="hover:text-champagne transition-colors">Home</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="flex items-center">
                <Link href={tr(locale, '/calendar', '/it/calendar')} className="hover:text-champagne transition-colors">{tr(locale, 'Calendar', 'Calendario')}</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="text-champagne" aria-current="page">
                {tr(locale, 'This Week', 'Questa Settimana')}
              </li>
            </ol>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-champagne mb-6 tracking-tight">{t.title}</h1>
          <div className="max-w-3xl mb-8">
            <p className="text-white/70 leading-relaxed font-light">{t.intro}</p>
          </div>

          {/* AI Trafiletto */}
          <div className="max-w-2xl mb-8 p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04]">
            <p className="font-sans text-champagne/60 text-[9px] tracking-[0.3em] uppercase mb-3">Quick Answer</p>
            <p className="font-sans text-white/75 text-sm leading-relaxed">
              {isIt
                ? `Questa settimana a Milano (Autunno/Inverno 2026 & Capodanno 2027): ${items.length} eventi in programma nei 6 club prioritari (1. Just Me 7/7, 2. Pineta, 3. Aria, 4. 55 Milano, 5. Voya Rooftop, 6. Repvblic). Prenota VIP table o guestlist via WhatsApp +39 351 912 7047 o concierge@nightlifemilan.com.`
                : `This week in Milan (Autumn/Winter 2026 & NYE 2027): ${items.length} events scheduled across our 6 priority clubs (1. Just Me 7/7, 2. Pineta, 3. Aria, 4. 55 Milano, 5. Voya Rooftop, 6. Repvblic). Book VIP tables or guestlist via WhatsApp +39 351 912 7047 or concierge@nightlifemilan.com.`}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              tr(locale, 'This Week Milan', 'Questa Settimana Milano'),
              tr(locale, 'Autumn/Winter 2026 & NYE 2027', 'Autunno/Inverno 2026 & Capodanno 2027'),
              tr(locale, 'Milan 6 Priority Clubs', 'I 6 Club Prioritari'),
              'VIP Tables',
              tr(locale, 'Guestlist Milan', 'Guestlist'),
              tr(locale, 'Aperitivo 19:30–22:30', 'Aperitivo 19:30–22:30'),
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full border border-white/10 text-white/40 text-xs font-sans tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* H2: This Week's Highlights */}
          <h2 className="font-serif text-3xl text-white mb-4">
            {isIt ? 'I Migliori Appuntamenti della Settimana' : "This Week's Best Events in Milan"}
          </h2>
          <p className="text-white/40 mb-8 text-base">
            {isIt
              ? 'Abbiamo selezionato per te le serate più esclusive, gli artisti più attesi e le 6 venue prioritarie di questa settimana.'
              : "We've curated the most exclusive nights, most anticipated artists, and the 6 priority venues this week in Milan."}
          </p>

          {/* Calendar toggle */}
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            <Link
              href={`${lp}/calendar/tonight`}
              className="flex-shrink-0 px-8 py-3 rounded-full border border-white/20 text-white hover:border-champagne hover:text-champagne transition-colors font-medium tracking-wider uppercase text-sm"
            >
              {tr(locale, 'Tonight', 'Stasera')}
            </Link>
            <Link
              href={`${lp}/calendar/tonight#tomorrow`}
              className="flex-shrink-0 px-8 py-3 rounded-full border border-white/20 text-white hover:border-champagne hover:text-champagne transition-colors font-medium tracking-wider uppercase text-sm"
            >
              {tr(locale, 'Tomorrow', 'Domani')}
            </Link>
            <Link
              href={`${lp}/calendar/this-week`}
              className="flex-shrink-0 px-8 py-3 rounded-full bg-champagne text-black font-medium tracking-wider uppercase text-sm"
            >
              {tr(locale, 'Full Week', 'Tutta la Settimana')}
            </Link>
          </div>
        </section>

        {/* Discovery Grid */}
        <DiscoveryGrid items={slimDiscoveryItemsForClient(items, locale, 24)} lang={locale} title={t.gridTitle} subtitle={t.gridSubtitle} />

        {/* Dove Ballare Questa Settimana nei 6 Club Prioritari */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
          <div className="mb-8">
            <p className="font-sans text-champagne text-[10px] font-bold uppercase tracking-[0.25em] mb-2">
              {tr(
                locale,
                'OFFICIAL PRIORITY ORDER · REAL OPERATING HOURS',
                'ORDINE UFFICIALE DI PRIORITÀ · ORARI REALI VERIFICATI',
              )}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold mb-3">
              {tr(
                locale,
                'Where to Dance This Week in Milan’s 6 Priority Clubs (Just Me 7/7, Pineta, Aria, 55 Milano, Voya Rooftop, Repvblic)',
                'Dove Ballare Questa Settimana nei 6 Club Prioritari (Just Me 7/7, Pineta, Aria, 55 Milano, Voya Rooftop, Repvblic)',
              )}
            </h2>
            <p className="text-white/60 text-sm sm:text-base">
              {tr(
                locale,
                'Real hours: Royal Aperitivo 19:30–22:30, Guestlist Cut-Off 00:30–01:00, and Clubbing 23:30–05:00.',
                'Orari reali: Royal Aperitivo 19:30–22:30, Cut-Off Liste 00:30–01:00 e Clubbing 23:30–05:00.',
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRIORITY_SIX_WEEK.map((club) => (
              <div
                key={club.slug}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-6 flex flex-col justify-between hover:border-champagne/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-champagne text-black text-[10px] font-bold uppercase tracking-wider">
                      #{club.rank} {tr(locale, 'Priority', 'Priorità')}
                    </span>
                    <span className="text-xs text-champagne/80 font-mono">
                      {isIt ? club.scheduleIt : club.scheduleEn}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-white font-bold mb-1">{club.name}</h3>
                  <p className="text-xs text-white/50 mb-3">{club.zone}</p>
                  <p className="text-xs text-champagne font-mono mb-2">
                    {isIt ? club.hoursIt : club.hoursEn}
                  </p>
                  <p className="text-xs text-white/75 mb-4">{isIt ? club.pricesIt : club.pricesEn}</p>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <Link
                    href={`${lp}/clubs/${club.slug}`}
                    className="text-xs font-semibold text-white/80 hover:text-champagne transition-colors"
                  >
                    {tr(locale, 'Club Guide →', 'Scheda Club →')}
                  </Link>
                  <a
                    href={`https://wa.me/393519127047?text=${encodeURIComponent(
                      isIt
                        ? `Ciao! Vorrei prenotare per questa settimana da ${club.name} a Milano.`
                        : `Hi! I want to book for this week at ${club.name} in Milan.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto px-4 py-2 rounded-full bg-champagne text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                  >
                    WhatsApp +39 351 912 7047
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Modules */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WeeklyNightlifeNavigator locale={locale} />
          <VipQuoteCalculator locale={locale} />
        </div>

        {/* H3 section: How to Book */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
          <h2 className="font-serif text-3xl text-white mb-8">
            {tr(locale, 'How to Book for This Week in Milan', 'Come Prenotare per Questa Settimana')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-lg border border-white/8 bg-white/[0.02]">
              <h3 className="font-sans text-champagne text-xs font-bold tracking-widest uppercase mb-3">
                {tr(locale, 'Contact us via WhatsApp', 'Contattaci via WhatsApp')}
              </h3>
              <p className="font-sans text-white/50 text-sm leading-relaxed">
                {tr(
                  locale,
                  'Message +39 351 912 7047 or concierge@nightlifemilan.com. Tell us your date, group size and preferences. Reply guaranteed in 10 minutes.',
                  'Scrivi a +39 351 912 7047 o concierge@nightlifemilan.com. Dicci data, numero di persone e preferenze. Risposta garantita in 10 minuti.',
                )}
              </p>
            </div>
            <div className="p-6 rounded-lg border border-white/8 bg-white/[0.02]">
              <h3 className="font-sans text-champagne text-xs font-bold tracking-widest uppercase mb-3">
                {tr(locale, 'VIP Table or Guestlist?', 'VIP Table o Guestlist?')}
              </h3>
              <p className="font-sans text-white/50 text-sm leading-relaxed">
                {tr(
                  locale,
                  'Guestlist = reduced entry (cut-off 00:30–01:00), standing. VIP table = reserved booth, 100% bottle service, skip-the-line Hostess.',
                  'Guestlist = ingresso ridotto (cut-off 00:30–01:00), in piedi. VIP table = divanetto riservato, 100% bottle service e Hostess salta-fila.',
                )}
              </p>
            </div>
            <div className="p-6 rounded-lg border border-white/8 bg-white/[0.02]">
              <h3 className="font-sans text-champagne text-xs font-bold tracking-widest uppercase mb-3">
                {tr(locale, 'Free Service', 'Servizio Gratuito')}
              </h3>
              <p className="font-sans text-white/50 text-sm leading-relaxed">
                {tr(
                  locale,
                  'Our concierge service is completely free. You pay the official venue price directly at the door.',
                  'Il nostro servizio di concierge è completamente gratuito. Paghi il listino ufficiale direttamente alla cassa del locale.',
                )}
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
