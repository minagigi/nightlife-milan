import OctoberEntry from '@/components/OctoberEntry';
import { Metadata } from 'next';
import { tr } from '@/lib/i18n/t';
import { hreflangAlternates, localePrefix } from '@/lib/i18n/locales';
import { generateEventListSchema, getLocalizedText, jsonLdString } from '@/lib/seo';
import Link from '@/components/LocalizedLink';
import Image from 'next/image';
import { Clock, MapPin, Calendar } from 'lucide-react';
import { getAllCalendarEvents, romeDayKey, romeDayKeyOffset } from '@/lib/calendarEvents';
import type { Event, Venue } from '@/lib/types';
import { seoRobots, seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { compareEventbriteDiscoveryItems, getEventbriteDiscoveryItems } from '@/lib/eventbriteDiscovery';
import { WeeklyNightlifeNavigator, VipQuoteCalculator } from '@/components/NightlifeExpansionModules';
import EditorialPageSections from '@/components/EditorialPageSections';
import type { LocaleCode } from '@/lib/i18n/locales';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === 'it';
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const canonical = `${baseUrl}${localePrefix(locale)}/events/tonight`;

  const title = seoTitle(
    tr(
      locale,
      'Events Tonight in Milan Autumn/Winter 2026 & NYE 2027 | Open Clubs',
      'Eventi Stasera a Milano Autunno/Inverno 2026 & Capodanno 2027 | Club Aperti',
    ),
  );
  const description = withWhatsApp(
    tr(
      locale,
      'Discover the best events happening tonight in Milan (Autumn/Winter 2026 & NYE 2027): Just Me 7/7, Pineta, Aria, 55 Milano, Voya Rooftop & Repvblic. Book VIP table or guestlist via WhatsApp +39 351 912 7047.',
      'Scopri i migliori eventi in programma stasera a Milano (Autunno/Inverno 2026 & Capodanno 2027): Just Me 7/7, Pineta, Aria, 55 Milano, Voya Rooftop e Repvblic. Prenota tavolo VIP o lista su WhatsApp +39 351 912 7047.',
    ),
    locale,
  );

  return {
    title,
    description,
    keywords: isIt
      ? [
          'eventi stasera milano',
          'cosa fare stasera milano',
          'club aperto stasera milano',
          'serate stasera milano autunno inverno 2026',
          'aperitivo stasera milano',
          'capodanno 2027 milano serate',
        ]
      : [
          'events tonight milan',
          'what to do tonight milan',
          'clubs open tonight milan',
          'parties tonight milan autumn winter 2026',
          'aperitivo tonight milan',
          'nye 2027 milan clubs',
        ],
    robots: seoRobots(locale),
    alternates: {
      canonical,
      languages: hreflangAlternates(baseUrl, '/events/tonight'),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: isIt ? 'it_IT' : 'en_US',
      images: [{ url: `${baseUrl}/images/pillars/events-tonight-hero.webp`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/images/pillars/events-tonight-hero.webp`],
    },
  };
}

const PRIORITY_SIX_TONIGHT = [
  {
    rank: 1,
    name: 'Just Me Milano',
    slug: 'just-me-milano',
    zone: 'Parco Sempione (Torre Branca)',
    daysIt: 'Aperto 7 sere su 7 (Lun – Dom)',
    daysEn: 'Open 7 nights a week (Mon – Sun)',
    hoursIt: 'Aperitivo 19:30–22:30 · Cut-Off Liste 00:30 · Clubbing 23:30–05:00',
    hoursEn: 'Aperitivo 19:30–22:30 · Guestlist Cut-Off 00:30 · Clubbing 23:30–05:00',
    priceIt: 'Aperitivo 20–30€ · Tavoli VIP da 350–500€',
    priceEn: 'Aperitivo €20–30 · VIP Tables from €350–500',
  },
  {
    rank: 2,
    name: 'Pineta Club Milano',
    slug: 'pineta-club-milano',
    zone: 'Corso Como / Via Messina 38',
    daysIt: 'Venerdì, Sabato & Prefestivi',
    daysEn: 'Friday, Saturday & Pre-Holidays',
    hoursIt: 'Aperitivo Cantato 19:30–22:30 · Cut-Off Liste 00:45 · Clubbing 23:30–05:00',
    hoursEn: 'Singing Aperitivo 19:30–22:30 · Guestlist Cut-Off 00:45 · Clubbing 23:30–05:00',
    priceIt: 'Buffet Cantato 20–25€ · Tavoli VIP 300–600€',
    priceEn: 'Singing Buffet €20–25 · VIP Tables €300–600',
  },
  {
    rank: 3,
    name: 'Aria Club Milano',
    slug: 'aria-club-milano',
    zone: 'San Siro · Piazzale dello Sport 14 (150m Stadio)',
    daysIt: 'Giovedì, Venerdì, Sabato & Dopo-Partita San Siro',
    daysEn: 'Thursday, Friday, Saturday & San Siro Matchdays',
    hoursIt: 'Aperitivo 19:30–22:30 · Cut-Off Liste 01:00 · Clubbing 23:30–05:00',
    hoursEn: 'Aperitivo 19:30–22:30 · Guestlist Cut-Off 01:00 · Clubbing 23:30–05:00',
    priceIt: 'Aperitivo 15–25€ · Tavoli Pista/Privé da 250€',
    priceEn: 'Aperitivo €15–25 · Dancefloor/Privé Tables from €250',
  },
  {
    rank: 4,
    name: '55 Milano (FiftyFive)',
    slug: '55-milano',
    zone: 'Arco della Pace / Via Piero della Francesca 55',
    daysIt: 'Martedì – Domenica (Apericena XL, Dinner Show & The Wall)',
    daysEn: 'Tuesday – Sunday (XXL Apericena, Dinner Show & The Wall)',
    hoursIt: 'Apericena 19:30–22:30 · Cut-Off Liste 00:45 · Clubbing 23:30–04:30',
    hoursEn: 'Apericena 19:30–22:30 · Guestlist Cut-Off 00:45 · Clubbing 23:30–04:30',
    priceIt: 'Apericena 20–30€ · Dinner Show 50€ · Tavoli da 250€',
    priceEn: 'Apericena €20–30 · Dinner Show €50 · Tables from €250',
  },
  {
    rank: 5,
    name: 'Voya Rooftop Milan',
    slug: 'voya-rooftop-milan',
    zone: 'Isola / Portello — 20° Piano Vista Skyline',
    daysIt: 'Martedì – Domenica (Sunset & Sky Clubbing)',
    daysEn: 'Tuesday – Sunday (Sunset & Sky Clubbing)',
    hoursIt: 'Sunset Aperitivo 19:30–22:30 · Cut-Off Liste 00:30 · Clubbing 23:30–04:00',
    hoursEn: 'Sunset Aperitivo 19:30–22:30 · Guestlist Cut-Off 00:30 · Clubbing 23:30–04:00',
    priceIt: 'Aperitivo Panoramico 20–30€ · Tavoli Vetrata da 250–350€',
    priceEn: 'Panoramic Aperitivo €20–30 · Window Tables from €250–350',
  },
  {
    rank: 6,
    name: 'Repvblic Milano',
    slug: 'repvblic-milano',
    zone: 'Piazza della Repubblica / Mecenate',
    daysIt: 'Lunedì (Dirty Monday), Venerdì & Sabato',
    daysEn: 'Monday (Dirty Monday), Friday & Saturday',
    hoursIt: 'Ingresso 23:30 · Cut-Off Liste 01:00 · Clubbing 23:30–05:00',
    hoursEn: 'Doors 23:30 · Guestlist Cut-Off 01:00 · Clubbing 23:30–05:00',
    priceIt: 'Tavoli Pista da 300€ · Privé da 500€',
    priceEn: 'Dancefloor Tables from €300 · Privé from €500',
  },
];

export default async function EventsTonightPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === 'it';
  const lp = localePrefix(locale);

  const now = new Date();
  const allItems = getEventbriteDiscoveryItems(await getAllCalendarEvents(), locale);
  const todayKey = romeDayKeyOffset(0);

  const items = allItems
    .filter(({ event }) => romeDayKey(event.dateISO) === todayKey)
    .sort(compareEventbriteDiscoveryItems);

  const getMilanHour = (iso: string) =>
    parseInt(new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: false, timeZone: 'Europe/Rome' }).format(new Date(iso)), 10);

  const aperitivo = items.filter((i) => {
    const h = getMilanHour(i.event.dateISO);
    return h >= 18 && h <= 21;
  });
  const primeTime = items.filter((i) => {
    const h = getMilanHour(i.event.dateISO);
    return h === 22 || h === 23 || h === 0;
  });
  const afterHours = items.filter((i) => {
    const h = getMilanHour(i.event.dateISO);
    return h >= 1 && h <= 6;
  });

  const dateLabel = now.toLocaleDateString(isIt ? 'it-IT' : 'en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'Europe/Rome',
  });

  // Event schema sui soli eventi effettivamente mostrati nei tre slot orari.
  const shownItems = [...aperitivo, ...primeTime, ...afterHours];
  const eventListSchema =
    shownItems.length > 0
      ? generateEventListSchema(shownItems, locale, tr(locale, 'Events Tonight in Milan', 'Eventi Stasera a Milano'))
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
          <span className="text-champagne">{tr(locale, 'Tonight', 'Stasera')}</span>
        </nav>
      </div>

      {/* Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2 h-2 rounded-full bg-champagne animate-pulse" />
          <span className="text-champagne/60 text-xs font-mono uppercase tracking-[0.2em]">
            {dateLabel} · {tr(locale, 'Autumn/Winter 2026 & NYE 2027', 'Autunno/Inverno 2026 & Capodanno 2027')}
          </span>
        </div>
        <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden mb-6 border border-champagne/25">
          <Image quality={92}
            src="/images/pillars/events-tonight-hero.webp"
            alt={tr(locale, 'Tonight in Milan', 'Stasera a Milano')}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-champagne tracking-tighter mb-4">
          {tr(locale, 'Tonight in Milan', 'Stasera a Milano')}
        </h1>
        <p className="text-lg text-white/50 font-light mb-8">
          {isIt
            ? `${items.length} eventi selezionati stasera — Royal Aperitivo (19:30–22:30), Cut-Off Liste (00:30–01:00) e Clubbing VIP (23:30–05:00).`
            : `${items.length} curated events tonight — Royal Aperitivo (19:30–22:30), Guestlist Cut-Off (00:30–01:00) and VIP Clubbing (23:30–05:00).`}
        </p>

        {/* Quick Answer */}
        <div className="mb-8 p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04]">
          <p className="text-champagne/50 text-[9px] tracking-[0.3em] uppercase mb-2">Quick Answer</p>
          <p className="text-white/75 text-sm leading-relaxed">
            {tr(
              locale,
              'Tonight in Milan: Royal Aperitivo 19:30–22:30 (1. Just Me 7/7, 2. Pineta, 3. Aria, 4. 55 Milano, 5. Voya Rooftop), Guestlist Cut-Off 00:30–01:00, and Clubbing 23:30–05:00 (including 6. Repvblic). Book VIP table via WhatsApp +39 351 912 7047 or concierge@nightlifemilan.com — 10 min reply.',
              'Stasera a Milano: Royal Aperitivo 19:30–22:30 (1. Just Me 7/7, 2. Pineta, 3. Aria, 4. 55 Milano, 5. Voya Rooftop), Cut-Off Liste 00:30–01:00 e Clubbing 23:30–05:00 (incluso 6. Repvblic). Prenota tavolo VIP su WhatsApp +39 351 912 7047 o concierge@nightlifemilan.com — risposta in 10 min.',
            )}
          </p>
        </div>

        {/* Nav pills */}
        <div className="flex gap-3 flex-wrap">
          <span className="px-6 py-2.5 rounded-full bg-champagne text-black text-sm font-medium tracking-wider uppercase">
            {tr(locale, 'Tonight', 'Stasera')}
          </span>
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
          <Link
            href={`${lp}/events/best`}
            className="px-6 py-2.5 rounded-full border border-white/20 text-white/60 hover:border-champagne hover:text-champagne transition-colors text-sm tracking-wider uppercase"
          >
            {tr(locale, 'Best 6 Clubs', 'I 6 Migliori Club')}
          </Link>
          <Link
            href={`${lp}/football-afterparties`}
            className="px-6 py-2.5 rounded-full border border-white/20 text-white/60 hover:border-champagne hover:text-champagne transition-colors text-sm tracking-wider uppercase"
          >
            {tr(locale, 'San Siro Afterparties', 'Dopo-Partita San Siro')}
          </Link>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {items.length === 0 ? (
          <div className="py-24 text-center border border-white/10 rounded-xl bg-white/[0.02]">
            <Calendar className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-white/60 mb-2">
              {tr(locale, 'Direct Concierge Booking Tonight', 'Prenotazione Diretta Concierge per Stasera')}
            </h3>
            <p className="text-white/40 text-sm mb-6">
              {tr(
                locale,
                'Just Me Milano is open 7 nights a week! Check the 6 Priority Clubs below or explore this week’s full schedule.',
                'Just Me Milano è aperto 7 sere su 7! Consulta qui sotto i 6 Club Prioritari oppure esplora tutta la settimana.',
              )}
            </p>
            <Link
              href={`${lp}/events/this-week`}
              className="inline-flex px-6 py-3 rounded-full border border-champagne/40 text-champagne text-sm hover:bg-champagne hover:text-black transition-colors"
            >
              {tr(locale, 'This Week →', 'Questa Settimana →')}
            </Link>
          </div>
        ) : (
          <div className="space-y-14">
            <TimeSlot title="Aperitivo" time="19:30 – 22:30" items={aperitivo} locale={locale} lp={lp} />
            <TimeSlot title="Prime Time" time="23:30 – 01:00" items={primeTime} locale={locale} lp={lp} />
            <TimeSlot title="After Hours" time="01:00 – 05:00" items={afterHours} locale={locale} lp={lp} />
          </div>
        )}
      </section>

      {/* Dove Ballare Stasera nei 6 Club Prioritari */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/10">
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
              'Where to Dance Tonight in Milan’s 6 Priority Clubs (Just Me 7/7, Pineta, Aria, 55 Milano, Voya Rooftop, Repvblic)',
              'Dove Ballare Stasera nei 6 Club Prioritari (Just Me 7/7, Pineta, Aria, 55 Milano, Voya Rooftop, Repvblic)',
            )}
          </h2>
          <p className="text-white/60 text-sm sm:text-base">
            {tr(
              locale,
              'Real verified hours across Milan’s top 6 clubs: Royal Aperitivo 19:30–22:30, Guestlist Cut-Off 00:30–01:00, and VIP Clubbing 23:30–05:00.',
              'Orari reali verificati nei 6 top club di Milano: Royal Aperitivo 19:30–22:30, Cut-Off Liste 00:30–01:00 e Clubbing VIP 23:30–05:00.',
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PRIORITY_SIX_TONIGHT.map((club) => (
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
                    {isIt ? club.daysIt : club.daysEn}
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-white font-bold mb-1">{club.name}</h3>
                <p className="text-xs text-white/50 mb-3">{club.zone}</p>
                <p className="text-xs text-champagne font-mono mb-2">
                  {isIt ? club.hoursIt : club.hoursEn}
                </p>
                <p className="text-xs text-white/75 mb-4">{isIt ? club.priceIt : club.priceEn}</p>
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
                      ? `Ciao! Vorrei prenotare per stasera da ${club.name} a Milano.`
                      : `Hi! I want to book for tonight at ${club.name} in Milan.`,
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <WeeklyNightlifeNavigator locale={locale} />
        <VipQuoteCalculator locale={locale} />
      </div>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-champagne/20 bg-champagne/[0.04] p-8 text-center">
          <h2 className="font-serif text-2xl text-white mb-3">
            {tr(locale, 'Book for Tonight in Milan', 'Prenota Stasera a Milano')}
          </h2>
          <p className="text-white/50 text-sm mb-6">
            {tr(
              locale,
              'VIP table, QR guestlist or Royal Aperitivo — we reply in 10 minutes at +39 351 912 7047 or concierge@nightlifemilan.com.',
              'Tavolo VIP, lista QR o Royal Aperitivo — rispondiamo in 10 minuti al +39 351 912 7047 o concierge@nightlifemilan.com.',
            )}
          </p>
          <a
            href={`https://wa.me/393519127047?text=${encodeURIComponent(
              tr(locale, 'Hi! I want to book for tonight in Milan.', 'Ciao! Vorrei prenotare per stasera a Milano.'),
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-champagne text-black font-bold rounded-full hover:bg-white transition-colors uppercase tracking-wider text-sm"
          >
            WhatsApp +39 351 912 7047
          </a>
        </div>
      </section>
            <OctoberEntry locale={locale} />
        <EditorialPageSections locale={locale as LocaleCode} path={`${lp}/events/tonight`} />
      </main>
  );
}

function TimeSlot({
  title,
  time,
  items,
  locale,
  lp,
}: {
  title: string;
  time: string;
  items: { event: Event; venue: Venue }[];
  locale: string;
  lp: string;
}) {
  if (items.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <h2 className="font-serif text-2xl text-white">{title}</h2>
        <span className="text-white/30 font-mono text-xs">{time}</span>
        <div className="flex-grow h-px bg-white/8" />
      </div>
      <div className="space-y-4">
        {items.map(({ event, venue }) => {
          const title = getLocalizedText(event.localizedContent.title, locale);
          const slug = getLocalizedText(event.localizedContent.slug, locale);
          const venueName = getLocalizedText(venue.localizedContent.name, locale);
          const timeStr = new Intl.DateTimeFormat(locale, {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Europe/Rome',
          }).format(new Date(event.dateISO));
          const genre = event.genre[0]?.replace(/_/g, ' ') ?? '';

          return (
            <Link
              key={event.id}
              href={`${lp}/events/${slug}`}
              className="group flex flex-col sm:flex-row bg-white/[0.03] rounded-lg overflow-hidden border border-white/5 hover:border-champagne/30 transition-all duration-300"
            >
              <div className="sm:w-1/3 h-40 sm:h-auto relative shrink-0">
                <Image
                  src={event.image || venue.image || '/images/milan-nightclub-luxury-vip-champagne.webp'}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 100vw, 45vw"
                  quality={92}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#131009] via-[#131009]/40 to-transparent" />
                {event.isSpecial && (
                  <div className="absolute top-3 left-3 bg-champagne text-black text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                    {tr(locale, 'Special', 'Speciale')}
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col justify-center flex-grow">
                <div className="flex items-center gap-2 text-champagne mb-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="font-mono text-xs">{timeStr}</span>
                  <span className="text-white/20 text-xs">·</span>
                  <span className="text-white/40 text-xs uppercase tracking-wider">{genre}</span>
                </div>
                <h3 className="font-serif text-xl text-white group-hover:text-champagne transition-colors leading-tight mb-2">
                  {title}
                </h3>
                <div className="flex items-center gap-1.5 text-white/40">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-sm">{venueName}</span>
                </div>
                {event.pricing.entry !== null && event.pricing.entry > 0 && (
                  <p className="text-white/30 text-xs mt-2">
                    {tr(locale, 'Entry', 'Ingresso')} €{event.pricing.entry}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
