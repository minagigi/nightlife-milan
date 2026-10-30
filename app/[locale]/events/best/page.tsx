import { Metadata } from 'next';
import { tr } from '@/lib/i18n/t';
import { hreflangAlternates, localePrefix } from '@/lib/i18n/locales';
import { generateEventListSchema, getLocalizedText, jsonLdString } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock, ExternalLink } from 'lucide-react';
import { getAllCalendarEvents, isUpcomingRome } from '@/lib/calendarEvents';
import { seoRobots, seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { getEventbriteDiscoveryItems } from '@/lib/eventbriteDiscovery';
import { PrioritySixShowcase, VipQuoteCalculator } from '@/components/NightlifeExpansionModules';
import EditorialPageSections from '@/components/EditorialPageSections';
import type { LocaleCode } from '@/lib/i18n/locales';

export const revalidate = 3600;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === 'it';
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const canonical = `${baseUrl}${localePrefix(locale)}/events/best`;

  const title = seoTitle(
    tr(
      locale,
      'Best 6 Clubs in Milan Autumn/Winter 2026 & NYE 2027 | Just Me, Pineta, Aria, 55, Voya, Repvblic',
      'I 6 Migliori Club di Milano Autunno/Inverno 2026 & Capodanno 2027 | Just Me, Pineta, Aria, 55, Voya, Repvblic',
    ),
  );
  const description = withWhatsApp(
    tr(
      locale,
      'The 6 best clubs in Milan in official concierge priority order for Autumn/Winter 2026 & NYE 2027: 1. Just Me Milano, 2. Pineta Club, 3. Aria Club, 4. 55 Milano, 5. Voya Rooftop, 6. Repvblic Milano. Book VIP table via WhatsApp +39 351 912 7047.',
      'I 6 migliori club di Milano nell’ordine ufficiale del nostro concierge per Autunno/Inverno 2026 & Capodanno 2027: 1. Just Me Milano, 2. Pineta Club, 3. Aria Club, 4. 55 Milano, 5. Voya Rooftop, 6. Repvblic Milano. Prenota tavolo VIP su WhatsApp +39 351 912 7047.',
    ),
    locale,
  );

  return {
    title,
    description,
    keywords: isIt
      ? [
          'migliori club milano',
          'just me milano',
          'pineta club milano',
          'aria club milano',
          '55 milano',
          'voya rooftop milano',
          'repvblic milano',
          'nightlife milano autunno inverno 2026',
          'capodanno 2027 milano discoteche',
        ]
      : [
          'best clubs milan',
          'just me milan',
          'pineta club milan',
          'aria club milan',
          '55 milano',
          'voya rooftop milan',
          'repvblic milan',
          'milan nightlife autumn winter 2026',
          'nye 2027 milan clubs',
        ],
    robots: seoRobots(locale),
    alternates: {
      canonical,
      languages: hreflangAlternates(baseUrl, '/events/best'),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: isIt ? 'it_IT' : 'en_US',
      images: [{ url: `${baseUrl}/images/venues/just-me-milano/just-me-milano-interior-01.webp`, width: 1200, height: 630 }],
    },
  };
}

const BEST_VENUES = [
  {
    id: 'v-justme',
    slug: 'just-me-milano',
    color: '#C9A86A',
    image: '/images/venues/just-me-milano/just-me-milano-interior-01.webp',
    name: { en: '1. Just Me Milano', it: '1. Just Me Milano' },
    zone: { en: 'Parco Sempione (Torre Branca)', it: 'Parco Sempione (Torre Branca)' },
    label: { en: 'Open 7 nights a week (19:30 – 05:00)', it: 'Aperto 7 sere su 7 (19:30 – 05:00)' },
    why: {
      en: 'Designed by Italo Rota beneath Torre Branca. Milan’s #1 priority flagship club: Royal Aperitivo from 19:30 with panoramic tower elevator, gala dinner, and international jet-set clubbing until 05:00 every night (including Tuesday/Wednesday Champions League nights).',
      it: 'Progettato da Italo Rota sotto la Torre Branca. Il club #1 assoluto di Milano: Royal Aperitivo dalle 19:30 con salita panoramica in torre, cena di gala e club internazionale fino alle 05:00 ogni sera (inclusi martedì e mercoledì di Champions League).',
    },
    tags: ['Open 7/7', 'VIP Tables', 'Italo Rota', 'Fashion Crowd'],
    priceFrom: { en: 'Aperitivo €20–30 · VIP Tables from €350–500', it: 'Aperitivo €20–30 · Tavoli VIP da €350–500' },
    openDays: { en: 'Mon – Sun', it: 'Lun – Dom' },
  },
  {
    id: 'v-pineta',
    slug: 'pineta-club-milano',
    color: '#A8C9A0',
    image: '/images/venues/pineta-milano/pineta-milano-interior-01.webp',
    name: { en: '2. Pineta Club Milano', it: '2. Pineta Club Milano' },
    zone: { en: 'Corso Como · Via Messina 38', it: 'Corso Como · Via Messina 38' },
    label: { en: 'Friday & Saturday + Singing Aperitivo', it: 'Venerdì e Sabato + Aperitivo Cantato' },
    why: {
      en: 'The Formentera & Milano Marittima legend in Milan. Convivial Singing Aperitivo from 19:30 with live performers, transitioning into the city’s most explosive reggaeton and commercial party until 05:00.',
      it: 'La leggenda di Formentera e Milano Marittima a Milano. Celebre Aperitivo Cantato dalle 19:30 su grandi tavolate conviviali, seguito dal party reggaeton e commerciale più esplosivo della città fino alle 05:00.',
    },
    tags: ['Aperitivo Cantato', 'Reggaeton', 'Live Show', 'VIP Tables'],
    priceFrom: { en: 'Aperitivo from €20 · VIP Tables €300–600', it: 'Aperitivo da €20 · Tavoli VIP €300–600' },
    openDays: { en: 'Fri – Sat', it: 'Ven – Sab' },
  },
  {
    id: 'v-aria',
    slug: 'aria-club-milano',
    color: '#A0B4C9',
    image: '/images/venues/aria-club-milano/aria-club-milano-interior-01.webp',
    name: { en: '3. Aria Club Milano', it: '3. Aria Club Milano' },
    zone: { en: 'San Siro · Piazzale dello Sport 14 (150m Stadium)', it: 'San Siro · Piazzale dello Sport 14 (150m Stadio)' },
    label: { en: 'Thu–Sat + San Siro Match & Concert Afterparties', it: 'Gio–Sab + Dopo-Partita e Concerti San Siro' },
    why: {
      en: 'Just 150 meters on foot from San Siro Stadium and Ippodromo. Royal Buffet Aperitivo from 19:30, three distinct VIP table zones (Dancefloor, Privé Aria, DJ Console), and the #1 headquarters for Inter & AC Milan post-match and concert afterparties.',
      it: 'A soli 150 metri a piedi dallo Stadio San Siro e dall’Ippodromo. Royal Aperitivo a buffet dalle 19:30, tre aree Tavoli VIP (Pista, Privé Aria, Console DJ) e quartier generale #1 per il Dopo-Partita di Inter e Milan e gli afterparty dei concerti.',
    },
    tags: ['150m San Siro', 'Buffet Aperitivo', '3 VIP Zones', 'Urban & Hits'],
    priceFrom: { en: 'Entry from €15 · VIP Tables from €250', it: 'Ingresso da €15 · Tavoli VIP da €250' },
    openDays: { en: 'Thu – Sat + Matchdays', it: 'Gio – Sab + Matchday' },
  },
  {
    id: 'v-55',
    slug: '55-milano',
    color: '#D4A373',
    image: '/images/55-milano.webp',
    name: { en: '4. 55 Milano (FiftyFive)', it: '4. 55 Milano (FiftyFive)' },
    zone: { en: 'Arco della Pace · Via Piero della Francesca 55', it: 'Arco della Pace · Via Piero della Francesca 55' },
    label: { en: 'Tue–Sun · XXL Apericena, Dinner Show & The Wall', it: 'Mar–Dom · Apericena XL, Dinner Show & The Wall' },
    why: {
      en: '1,000 sqm inside a historic railway depot with an expansive terrace. Milan’s top venue for graduation parties, birthdays, Friday Singing Dinner Shows, Saturday "The Wall" clubbing, and Sunday Latin nights.',
      it: '1.000 mq in uno storico deposito ferroviario con grande terrazza. Il locale di riferimento a Milano per feste di laurea, compleanni, Dinner Show del venerdì, serata "The Wall" del sabato e domenica latina.',
    },
    tags: ['Apericena XL', 'Dinner Show', 'Graduations & Birthdays', 'The Wall'],
    priceFrom: { en: 'Apericena €20–30 · VIP Tables from €250', it: 'Apericena €20–30 · Tavoli VIP da €250' },
    openDays: { en: 'Tue – Sun', it: 'Mar – Dom' },
  },
  {
    id: 'v-voya',
    slug: 'voya-rooftop-milan',
    color: '#90E0EF',
    image: '/images/voya-rooftop-milan.webp',
    name: { en: '5. Voya Rooftop Milan', it: '5. Voya Rooftop Milan' },
    zone: { en: 'Isola / Portello · 20th Floor Skyline View', it: 'Isola / Portello · 20° Piano Vista Skyline' },
    label: { en: 'Tue–Sun · Sunset Aperitivo & Sky Clubbing', it: 'Mar–Dom · Sunset Aperitivo & Sky Clubbing' },
    why: {
      en: '20th-floor panoramic sky lounge with 360° floor-to-ceiling windows overlooking CityLife, Porta Nuova, and San Siro (3 stops on the M5 metro). Sunset aperitivo from 19:30 and DJ sets until 04:00.',
      it: 'Sky lounge panoramica al 20° piano con vetrate a 360° su CityLife, Porta Nuova e San Siro (a 3 fermate M5 Lilla dallo stadio). Sunset aperitivo dalle 19:30 e DJ set fino alle 04:00.',
    },
    tags: ['20th Floor Rooftop', '360° Skyline', 'Sunset Aperitivo', 'Window VIP Tables'],
    priceFrom: { en: 'Aperitivo €20–30 · Window Tables from €250–350', it: 'Aperitivo €20–30 · Tavoli Vetrata da €250–350' },
    openDays: { en: 'Tue – Sun', it: 'Mar – Dom' },
  },
  {
    id: 'v-repvblic',
    slug: 'repvblic-milano',
    color: '#CDB4DB',
    image: '/images/repvblic-milano.webp',
    name: { en: '6. Repvblic Milano', it: '6. Repvblic Milano' },
    zone: { en: 'Piazza della Repubblica / Mecenate', it: 'Piazza della Repubblica / Mecenate' },
    label: { en: 'Dirty Monday + Friday & Saturday Clubbing', it: 'Dirty Monday + Venerdì e Sabato Club' },
    why: {
      en: 'Cutting-edge audio and lighting design hosting an international fashion crowd, the legendary "Dirty Monday" hip-hop/house night, and high-energy weekend parties.',
      it: 'Design contemporaneo di luci e suono con clientela fashion internazionale, la celebre notte "Dirty Monday" del lunedì e grandi weekend House, Hip-Hop e Commercial.',
    },
    tags: ['Dirty Monday', 'House & Hip-Hop', 'Fashion Crowd', 'VIP Privé'],
    priceFrom: { en: 'Dancefloor Tables from €300 · Privé from €500', it: 'Tavoli Pista da €300 · Privé da €500' },
    openDays: { en: 'Mon, Fri & Sat', it: 'Lun, Ven & Sab' },
  },
];

const SEASONAL_PEAKS = [
  {
    titleIt: 'Capodanno 2027 & Halloween Night',
    titleEn: 'New Year’s Eve 2027 & Halloween Night',
    descIt:
      'Cenoni di Gala, Royal Buffet e Tavoli VIP fino alle 06:00 del mattino nei 6 club prioritari (Just Me, Pineta, Aria, 55 Milano, Voya Rooftop, Repvblic).',
    descEn:
      'Gala Dinners, Royal Buffets, and all-night VIP Tables until 06:00 AM across all 6 priority clubs (Just Me, Pineta, Aria, 55 Milano, Voya Rooftop, Repvblic).',
  },
  {
    titleIt: 'Milano Fashion Week, Fuorisalone & GP F1 Monza',
    titleEn: 'Milan Fashion Week, Fuorisalone & Monza F1 GP',
    descIt:
      'Aftershow ufficiali delle sfilate, cocktail party panoramici per il Salone del Mobile e Paddock VIP Night per il Gran Premio d’Italia a Monza.',
    descEn:
      'Official runway aftershows, panoramic Salone del Mobile cocktail parties, and Paddock VIP Nights for the Italian Formula 1 Grand Prix at Monza.',
  },
  {
    titleIt: 'Dopo-Partita Calcio San Siro (Inter & Milan) & Concerti (Aria a 150m)',
    titleEn: 'San Siro Football (Inter & AC Milan) & Concerts (Aria at 150m)',
    descIt:
      'Terzo Tempo VIP per Serie A, Champions League e Derby della Madonnina + Afterparty Concerti Stadio San Siro e Ippodromo con Aria Club a soli 150 metri a piedi.',
    descEn:
      'VIP Third Half for Serie A, Champions League, and Derby della Madonnina + San Siro Stadium & Ippodromo Concert Afterparties with Aria Club just 150m away on foot.',
  },
];

export default async function EventsBestPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === 'it';
  const lp = localePrefix(locale);
  const lang = (isIt ? 'it' : 'en') as 'en' | 'it';

  const venueIds = BEST_VENUES.map((v) => v.id);

  const allItems = getEventbriteDiscoveryItems(await getAllCalendarEvents(), locale);
  const upcomingByVenue: Record<string, typeof allItems[number]['event'][]> = {};
  allItems
    .map(({ event }) => event)
    .filter((e) => venueIds.includes(e.venueId) && isUpcomingRome(e.dateISO))
    .forEach((e) => {
      if (!upcomingByVenue[e.venueId]) upcomingByVenue[e.venueId] = [];
      upcomingByVenue[e.venueId].push(e);
    });

  const shownItems = BEST_VENUES.flatMap((v) =>
    allItems.filter(({ event }) => event.venueId === v.id && isUpcomingRome(event.dateISO)).slice(0, 3),
  );
  const eventListSchema =
    shownItems.length > 0
      ? generateEventListSchema(
          shownItems,
          locale,
          tr(
            locale,
            'Best 6 Clubs in Milan — Upcoming Events',
            'I 6 Migliori Club di Milano — Prossimi Eventi',
          ),
        )
      : null;

  return (
    <main className="flex-1 bg-[#131009] w-full pt-20 pb-20">
      {eventListSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(eventListSchema) }} />
      )}
      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="text-xs text-white/30 flex gap-2">
          <Link href={`${lp}/`} className="hover:text-champagne transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href={`${lp}/events`} className="hover:text-champagne transition-colors">
            {tr(locale, 'Events', 'Eventi')}
          </Link>
          <span>/</span>
          <span className="text-champagne">{tr(locale, 'Best 6 Clubs', 'I 6 Migliori Club')}</span>
        </nav>
      </div>

      {/* Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-4 h-4 text-champagne fill-champagne" />
          <span className="text-champagne/60 text-xs uppercase tracking-[0.2em]">
            {tr(
              locale,
              'Official Concierge Priority Selection · Autumn/Winter 2026 & NYE 2027',
              'Selezione Ufficiale Concierge · Autunno/Inverno 2026 & Capodanno 2027',
            )}
          </span>
        </div>
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-champagne tracking-tighter mb-4">
          {tr(locale, 'The 6 Best Clubs in Milan', 'I 6 Migliori Club di Milano')}
        </h1>
        <p className="text-lg text-white/50 font-light mb-8 max-w-3xl">
          {tr(
            locale,
            'Six iconic venues in official priority order: 1. Just Me Milano (7/7), 2. Pineta Club, 3. Aria Club (San Siro 150m), 4. 55 Milano, 5. Voya Rooftop (20th floor) and 6. Repvblic Milano.',
            'Sei locali iconici nell’ordine ufficiale di priorità del nostro concierge: 1. Just Me Milano (7/7), 2. Pineta Club, 3. Aria Club (San Siro 150m), 4. 55 Milano, 5. Voya Rooftop (20° piano) e 6. Repvblic Milano.',
          )}
        </p>

        {/* Quick Answer */}
        <div className="mb-8 p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04] max-w-3xl">
          <p className="text-champagne/50 text-[9px] tracking-[0.3em] uppercase mb-2">Quick Answer</p>
          <p className="text-white/75 text-sm leading-relaxed">
            {tr(
              locale,
              'The 6 best clubs in Milan for Autumn/Winter 2026 & NYE 2027: 1. Just Me (open 7 nights, Torre Branca), 2. Pineta (Fri–Sat, Singing Aperitivo + Reggaeton), 3. Aria Club (Thu–Sat, 150m from San Siro Stadium), 4. 55 Milano (XXL Apericena & Dinner Show), 5. Voya Rooftop (20th-floor skyline), 6. Repvblic (Dirty Monday & House/Hip-Hop). Book via WhatsApp +39 351 912 7047 or concierge@nightlifemilan.com.',
              'I 6 migliori club di Milano per Autunno/Inverno 2026 & Capodanno 2027: 1. Just Me (aperto 7/7, Torre Branca), 2. Pineta (ven–sab, Aperitivo Cantato + Reggaeton), 3. Aria Club (gio–sab, a 150m dallo Stadio San Siro), 4. 55 Milano (Apericena XL & Dinner Show), 5. Voya Rooftop (20° piano skyline), 6. Repvblic (Dirty Monday & House/Hip-Hop). Prenota via WhatsApp +39 351 912 7047 o concierge@nightlifemilan.com.',
            )}
          </p>
        </div>

        {/* Nav pills */}
        <div className="flex gap-3 flex-wrap">
          <Link
            href={`${lp}/events/tonight`}
            className="px-6 py-2.5 rounded-full border border-white/20 text-white/60 hover:border-champagne hover:text-champagne transition-colors text-sm tracking-wider uppercase"
          >
            {tr(locale, 'Tonight', 'Stasera')}
          </Link>
          <Link
            href={`${lp}/events/this-week`}
            className="px-6 py-2.5 rounded-full border border-white/20 text-white/60 hover:border-champagne hover:text-champagne transition-colors text-sm tracking-wider uppercase"
          >
            {tr(locale, 'This Week', 'Questa Settimana')}
          </Link>
          <Link
            href={`${lp}/events/special`}
            className="px-6 py-2.5 rounded-full border border-white/20 text-white/60 hover:border-champagne hover:text-champagne transition-colors text-sm tracking-wider uppercase"
          >
            {tr(locale, 'Special Events', 'Eventi Speciali')}
          </Link>
          <span className="px-6 py-2.5 rounded-full bg-champagne text-black text-sm font-medium tracking-wider uppercase">
            {tr(locale, 'Best 6 Clubs', 'I 6 Migliori Club')}
          </span>
          <Link
            href={`${lp}/football-afterparties`}
            className="px-6 py-2.5 rounded-full border border-white/20 text-white/60 hover:border-champagne hover:text-champagne transition-colors text-sm tracking-wider uppercase"
          >
            {tr(locale, 'San Siro Afterparties', 'Dopo-Partita San Siro')}
          </Link>
        </div>
      </section>

      {/* Venue cards */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-12">
        {BEST_VENUES.map((v, index) => {
          const upcoming = upcomingByVenue[v.id] ?? [];
          return (
            <div key={v.id} className="border border-white/8 rounded-xl overflow-hidden">
              <div className="relative h-56 sm:h-72">
                <Image
                  src={v.image}
                  alt={v.name[lang]}
                  fill
                  sizes="(max-width: 768px) 100vw, 1024px"
                  quality={85}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131009] via-[#131009]/60 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-[9px] uppercase tracking-[0.25em] font-bold px-2 py-1 rounded"
                        style={{ color: v.color, border: `1px solid ${v.color}40`, background: `${v.color}10` }}
                      >
                        #{index + 1} {tr(locale, 'PRIORITY PICK', 'PRIORITÀ UFFICIALE')}
                      </span>
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold tracking-tight">{v.name[lang]}</h2>
                    <p className="text-white/50 text-sm mt-1">{v.zone[lang]}</p>
                  </div>
                  <Link
                    href={`${lp}/clubs/${v.slug}`}
                    className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white/70 text-sm hover:border-champagne hover:text-champagne transition-colors"
                  >
                    {tr(locale, 'View Club', 'Vedi Club')} <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="p-6 bg-[#1a1508]">
                <div className="flex flex-wrap gap-3 mb-5 items-center">
                  <span className="text-xs px-3 py-1 rounded-full border border-white/10 text-white/50">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {v.openDays[lang]}
                  </span>
                  <span className="text-xs text-white/40">{v.label[lang]}</span>
                </div>

                <p className="text-white/70 text-sm leading-relaxed mb-5">{v.why[lang]}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {v.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-1 rounded-full border border-white/10 text-white/40 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-champagne/70 text-xs font-mono mb-6">{v.priceFrom[lang]}</p>

                {upcoming.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-white/50 text-[10px] uppercase tracking-[0.25em] mb-3">
                      {tr(locale, 'Upcoming Special Events', 'Prossimi Eventi Speciali')}
                    </h3>
                    <div className="space-y-2">
                      {upcoming.slice(0, 3).map((event) => {
                        const title = getLocalizedText(event.localizedContent.title, locale);
                        const slug = getLocalizedText(event.localizedContent.slug, locale);
                        const dateStr = new Date(event.dateISO).toLocaleDateString(locale, {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                          timeZone: 'Europe/Rome',
                        });
                        return (
                          <Link
                            key={event.id}
                            href={`${lp}/events/${slug}`}
                            className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-champagne/[0.05] border border-champagne/15 hover:border-champagne/40 transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-champagne/50 text-xs font-mono w-28 shrink-0">{dateStr}</span>
                              <span className="text-white/80 text-sm group-hover:text-champagne transition-colors">{title}</span>
                            </div>
                            {event.pricing.entry !== null && event.pricing.entry > 0 && (
                              <span className="text-champagne/50 text-xs shrink-0 ml-2">€{event.pricing.entry}</span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/393519127047?text=${encodeURIComponent(
                      isIt ? `Ciao! Vorrei prenotare da ${v.name.it} a Milano.` : `Hi! I want to book at ${v.name.en} in Milan.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-champagne text-black font-bold rounded-full hover:bg-white transition-colors text-xs uppercase tracking-wider"
                  >
                    {tr(locale, 'Book Table (+39 351 912 7047)', 'Prenota Tavolo (+39 351 912 7047)')}
                  </a>
                  <Link
                    href={`${lp}/clubs/${v.slug}`}
                    className="px-5 py-2.5 border border-white/20 text-white/60 rounded-full hover:border-champagne hover:text-champagne transition-colors text-xs uppercase tracking-wider"
                  >
                    {tr(locale, 'Club Info', 'Scheda Club')}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Grandi Eventi Speciali 2026/2027 nei 6 Club Prioritari */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/10">
        <div className="mb-8">
          <p className="font-sans text-champagne text-[10px] font-bold uppercase tracking-[0.25em] mb-2">
            {tr(locale, 'MAJOR EVENTS 2026 / 2027', 'GRANDI EVENTI SPECIALI 2026 / 2027')}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold">
            {tr(
              locale,
              'NYE 2027, Halloween, Fashion Week, Fuorisalone, F1 Monza, San Siro Football & Concerts',
              'Capodanno 2027, Halloween, Fashion Week, Fuorisalone, GP F1 Monza, Dopo-Partita San Siro & Concerti',
            )}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SEASONAL_PEAKS.map((peak) => (
            <div key={peak.titleEn} className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <h3 className="font-serif text-xl text-champagne font-bold mb-2">
                {isIt ? peak.titleIt : peak.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
                {isIt ? peak.descIt : peak.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PrioritySixShowcase & VipQuoteCalculator */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <PrioritySixShowcase locale={locale} />
        <VipQuoteCalculator locale={locale} />
      </div>

      {/* Global CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-champagne/20 bg-champagne/[0.04] p-8 text-center">
          <h2 className="font-serif text-2xl text-white mb-3">
            {tr(locale, 'Not sure which of the 6 clubs to choose?', 'Non sai quale dei 6 club scegliere?')}
          </h2>
          <p className="text-white/50 text-sm mb-6 max-w-lg mx-auto">
            {tr(
              locale,
              "Tell us the date, group size and budget. We'll find the perfect table in 10 minutes at +39 351 912 7047 or concierge@nightlifemilan.com.",
              'Dicci la data, quante persone siete e il budget. Ti troviamo il tavolo perfetto in 10 minuti al +39 351 912 7047 o concierge@nightlifemilan.com.',
            )}
          </p>
          <a
            href={`https://wa.me/393519127047?text=${encodeURIComponent(
              tr(
                locale,
                'Hi! Help me choose the right club for tonight in Milan.',
                'Ciao! Aiutami a scegliere il club giusto per stasera a Milano.',
              ),
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-champagne text-black font-bold rounded-full hover:bg-white transition-colors uppercase tracking-wider text-sm"
          >
            WhatsApp +39 351 912 7047
          </a>
        </div>
      </section>
            <EditorialPageSections locale={locale as LocaleCode} path={`${lp}/events/best`} />
      </main>
  );
}
