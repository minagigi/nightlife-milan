import { Metadata } from 'next';
import { hreflangAlternates } from '@/lib/i18n/locales';
import Link from 'next/link';
import Image from 'next/image';
import NewsletterHub from '@/components/NewsletterHub';
import { Clock, Sparkles, Compass, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { tr } from '@/lib/i18n/t';
import { seoRobots, seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { mockGuides } from '@/lib/data';
import { getLocalizedText } from '@/lib/seo';
import { VipQuoteCalculator, WeeklyNightlifeNavigator, PrioritySixShowcase } from '@/components/NightlifeExpansionModules';
import EditorialPageSections from '@/components/EditorialPageSections';
import VerticalHubsAndEventsSection from '@/components/VerticalHubsAndEventsSection';
import type { LocaleCode } from '@/lib/i18n/locales';

export const revalidate = 3600;

const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === 'it';
  const canonical = `${baseUrl}${locale === 'en' ? '' : `/${locale}`}/guides`;

  const title = seoTitle(
    tr(
      locale,
      'Milan Nightlife Guides 2026/2027 | 14 Pillar Guides: Dress Code, VIP Tables, NYE 2027, San Siro & Concerts | Nightlife Milan',
      'Guide Vita Notturna Milano 2026/2027 | 14 Guide Pillar: Dress Code, Tavoli VIP, Capodanno 2027, San Siro e Concerti | Nightlife Milan'
    )
  );
  const description = withWhatsApp(
    tr(
      locale,
      '14 Flagship Pillar Guides to Milan nightlife: door policies, VIP table prices, New Year Eve 2027, San Siro football & concert afterparties, bachelor/bachelorette VIP packages, Monday-to-Sunday calendar, rooftops, speakeasies & Fashion Week.',
      '14 Guide Pillar complete alla vita notturna di Milano: dress code, listino tavoli VIP, Capodanno 2027, dopo-partita e dopo-concerto San Siro, addio al celibato/nubilato VIP, calendario lunedi-domenica, rooftop, speakeasy e Fashion Week.'
    ),
    locale
  );
  const ogImage = `${baseUrl}${mockGuides[0]?.image || '/images/guides-hero.webp'}`;

  const keywordsEn = [
    'milan nightlife guide',
    'milan club dress code',
    'vip table milan prices',
    'new years eve 2027 milan clubs',
    'san siro afterparty inter ac milan clubs',
    'milan concert afterparty san siro ippodromo',
    'bachelor bachelorette party milan vip tables',
    'milan nightlife monday to sunday',
    'best rooftop bars milan',
  ];
  const keywordsIt = [
    'guida vita notturna milano',
    'dress code discoteche milano',
    'prezzi tavoli vip milano',
    'capodanno 2027 milano discoteche cenone',
    'dopo partita san siro inter milan discoteche',
    'dopo concerto san siro ippodromo forum milano',
    'addio al celibato nubilato milano discoteche',
    'serate milano lunedi domenica',
    'migliori rooftop bar milano',
  ];

  return {
    title,
    description,
    keywords: keywordsEn.map((k, i) => tr(locale, k, keywordsIt[i])),
    robots: seoRobots(locale),
    alternates: {
      canonical,
      languages: hreflangAlternates(baseUrl, '/guides'),
    },
    openGraph: {
      title: tr(
        locale,
        'Milan Nightlife Guides 2026/2027 | The 14 Insider Pillar Guides',
        'Guide Vita Notturna Milano 2026/2027 | Le 14 Guide Pillar Ufficiali'
      ),
      description,
      type: 'website',
      url: canonical,
      siteName: 'Nightlife Milan',
      locale: isIt ? 'it_IT' : 'en_US',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: tr(locale, 'Milan nightlife guides insider tips', 'Guide vita notturna Milano insider'),
        },
      ],
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

const GUIDE_META: Record<
  string,
  {
    categoryEn: string;
    categoryIt: string;
    readTimeEn: string;
    readTimeIt: string;
    badgeEn?: string;
    badgeIt?: string;
    readTime?: string;
    score?: number;
    highlightsEn?: string[];
    highlightsIt?: string[];
  }
> = {
  'g-dress-code': {
    categoryEn: 'Door Policy & Style',
    categoryIt: 'Selezione & Dress Code',
    readTimeEn: '8 min read',
    readTimeIt: '8 min di lettura',
    badgeEn: 'Pillar #1 · Most Read',
    badgeIt: 'Pillar #1 · Piu Letta',
  },
  'g-vip-bottle-prices': {
    categoryEn: 'VIP Tables & Bottle Service',
    categoryIt: 'Tavoli VIP & Listino Bottiglie',
    readTimeEn: '9 min read',
    readTimeIt: '9 min di lettura',
    badgeEn: '2026/2027 Price List',
    badgeIt: 'Listino Ufficiale 2026/2027',
  },
  'g-weekly-calendar': {
    categoryEn: 'Weekly Calendar (Mon-Sun)',
    categoryIt: 'Calendario Settimanale (Lun-Dom)',
    readTimeEn: '10 min read',
    readTimeIt: '10 min di lettura',
    badgeEn: 'Every Night Covered',
    badgeIt: '7 Notti su 7',
  },
  'g-rooftops-milan': {
    categoryEn: 'Skyline & Rooftop Bars',
    categoryIt: 'Rooftop & Terrazze Panoramiche',
    readTimeEn: '8 min read',
    readTimeIt: '8 min di lettura',
    badgeEn: 'Top Skyline Views',
    badgeIt: 'Vista Skyline 360°',
  },
  'g-vip-tables': {
    categoryEn: 'VIP Protocol & Concierge',
    categoryIt: 'Protocollo VIP & Concierge',
    readTimeEn: '7 min read',
    readTimeIt: '7 min di lettura',
  },
  'g-secret-bars': {
    categoryEn: 'Speakeasies & Mixology',
    categoryIt: 'Speakeasy & Mixology Segreta',
    readTimeEn: '7 min read',
    readTimeIt: '7 min di lettura',
  },
  'g-techno-2026': {
    categoryEn: 'Underground & Techno',
    categoryIt: 'Underground & Club Techno',
    readTimeEn: '8 min read',
    readTimeIt: '8 min di lettura',
  },
  'g-private-parties': {
    categoryEn: 'Graduations, 18th & Private Events',
    categoryIt: 'Lauree, 18 Anni & Feste Private',
    readTimeEn: '9 min read',
    readTimeIt: '9 min di lettura',
    badgeEn: 'Turnkey Packages',
    badgeIt: 'Pacchetti Chiavi in Mano',
  },
  'g-mfw-fuorisalone-f1': {
    categoryEn: 'Fashion Week, Design Week & F1',
    categoryIt: 'Fashion Week, Fuorisalone & F1',
    readTimeEn: '8 min read',
    readTimeIt: '8 min di lettura',
    badgeEn: 'High-Season Guide',
    badgeIt: 'Guida Alta Stagione',
  },
  'g-dj-interview': {
    categoryEn: 'Sonic Architecture & Culture',
    categoryIt: 'Architettura Sonora & Cultura',
    readTimeEn: '7 min read',
    readTimeIt: '7 min di lettura',
  },
  'g-san-siro-football-afterparties': {
    categoryEn: 'San Siro Football Afterparties (Inter & Milan)',
    categoryIt: 'Dopo-Partita San Siro (Inter & Milan)',
    readTimeEn: '9 min read',
    readTimeIt: '9 min di lettura',
    readTime: '9 min',
    score: 94,
    badgeEn: 'Pillar #11 · Stadium 150m',
    badgeIt: 'Pillar #11 · Stadio a 150m',
    highlightsEn: [
      'Aria Club 150m from San Siro gates',
      'Champions League Tue/Wed at Just Me',
      'Derby della Madonnina VIP Tables',
      'Stadium-to-Club Dress Code Rules',
    ],
    highlightsIt: [
      'Aria Club a 150m dai cancelli di San Siro',
      'Champions League Mar/Mer al Just Me',
      'Tavoli VIP Derby della Madonnina',
      'Dress Code Stadio -> Discoteca',
    ],
  },
  'g-new-years-eve-2027': {
    categoryEn: 'New Year Eve 2027 (Capodanno)',
    categoryIt: 'Capodanno Milano 2027 (Cenoni & Tavoli)',
    readTimeEn: '10 min read',
    readTimeIt: '10 min di lettura',
    readTime: '10 min',
    score: 98,
    badgeEn: 'Pillar #12 · NYE 2027 Prices',
    badgeIt: 'Pillar #12 · Listino Capodanno 2027',
    highlightsEn: [
      '19 Club Price Matrix (Dec 31, 2026)',
      'Gala Dinners & Royal Buffets',
      'Voya 20th Floor Fireworks View',
      'Just Me & Aria VIP Table Packages',
    ],
    highlightsIt: [
      'Tabella Prezzi 19 Club (31 Dic 2026)',
      'Gran Cenone Servito & Royal Buffet',
      'Fuochi dal 20° Piano Voya Rooftop',
      'Tavoli VIP Just Me, Pineta & Aria',
    ],
  },
  'g-concert-afterparties-milan': {
    categoryEn: 'Concert Afterparties (San Siro, Ippodromo, Forum)',
    categoryIt: 'Dopo-Concerto (San Siro, Ippodromo, Forum)',
    readTimeEn: '9 min read',
    readTimeIt: '9 min di lettura',
    readTime: '9 min',
    score: 95,
    badgeEn: 'Pillar #13 · Live & Stadiums',
    badgeIt: 'Pillar #13 · Dopo-Concerto',
    highlightsEn: [
      'Aria Club 150m walk from San Siro',
      'Just Me open 7/7 for midweek tours',
      'Ippodromo La Maura & Unipol Forum',
      'Alcatraz & Fabrique VIP Tables',
    ],
    highlightsIt: [
      'Aria Club a 150m a piedi da San Siro',
      'Just Me aperto 7/7 per i live in settimana',
      'Ippodromo La Maura & Unipol Forum',
      'Tavoli VIP Alcatraz & Fabrique',
    ],
  },
  'g-bachelor-bachelorette-vip-milan': {
    categoryEn: 'VIP Bachelor & Bachelorette Parties',
    categoryIt: 'Addio al Celibato & Nubilato VIP',
    readTimeEn: '9 min read',
    readTimeIt: '9 min di lettura',
    readTime: '9 min',
    score: 93,
    badgeEn: 'Pillar #14 · VIP Groups & Limo',
    badgeIt: 'Pillar #14 · Celibato & Nubilato',
    highlightsEn: [
      'Singing Dinners at Pineta & 55 Milano',
      'All-male group VIP door clearance',
      '20th-Floor Voya + Just Me Prive Combo',
      'Limousine & Custom LED Bottle Shows',
    ],
    highlightsIt: [
      'Cena Cantata da Pineta e 55 Milano',
      'Ingresso garantito gruppi soli uomini',
      'Combo Voya 20° Piano + Prive Just Me',
      'Limousine & Bottle Show personalizzati',
    ],
  },
};

export default async function GuidesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isIt = locale === 'it';
  const localePrefix = locale === 'en' ? '' : `/${locale}`;

  const orderedIds = [
    'g-dress-code',
    'g-vip-bottle-prices',
    'g-new-years-eve-2027',
    'g-san-siro-football-afterparties',
    'g-concert-afterparties-milan',
    'g-bachelor-bachelorette-vip-milan',
    'g-weekly-calendar',
    'g-rooftops-milan',
    'g-vip-tables',
    'g-secret-bars',
    'g-techno-2026',
    'g-private-parties',
    'g-mfw-fuorisalone-f1',
    'g-dj-interview',
  ];

  const sortedGuides = [...mockGuides].sort((a, b) => {
    const ia = orderedIds.indexOf(a.id);
    const ib = orderedIds.indexOf(b.id);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });

  const featuredGuide = sortedGuides[0];
  const remainingGuides = sortedGuides.slice(1);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: isIt
      ? 'Guide Vita Notturna Milano 2026/2027 | Nightlife Milan'
      : 'Milan Nightlife Guides 2026/2027 | Nightlife Milan',
    url: `${baseUrl}${localePrefix}/guides`,
    description: isIt
      ? 'Le 14 guide definitive alla vita notturna di Milano: dress code, listino tavoli VIP, Capodanno 2027, dopo-partita e dopo-concerto San Siro, addio al celibato/nubilato, calendario settimanale, rooftop, speakeasy, club techno e feste private.'
      : 'The 14 definitive guides to Milan nightlife: dress code, VIP table price list, New Year Eve 2027, San Siro football & concert afterparties, bachelor/bachelorette VIP packages, weekly calendar, rooftops, speakeasies, techno clubs, and private parties.',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: sortedGuides.map((g, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: getLocalizedText(g.title, locale).replace(/[—–]/g, ' - '),
        url: `${baseUrl}${localePrefix}/guides/${getLocalizedText(g.slugs, locale)}`,
      })),
    },
  };

  return (
    <main className="flex-grow pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-champagne/30 bg-champagne/10 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-champagne" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-champagne">
              {isIt ? '114 Guide Pillar Ufficiali · Edizione 2026/2027' : '114 Official Pillar Guides · 2026/2027 Edition'}
            </span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-champagne tracking-tighter mb-6">
            {tr(locale, 'The Nightlife Magazine', 'L’Enciclopedia della Notte Milanese')}
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            {tr(
              locale,
              'Authoritative insider guides, verified 2026/2027 VIP bottle lists, New Year Eve 2027 Gala Dinners, San Siro football & concert afterparties, bachelor/bachelorette packages, and neighborhood deep dives curated by the Nightlife Milan Concierge desk.',
              'Guide insider autorevoli, listini bottiglie e tavoli VIP 2026/2027 verificati, Gran Cenoni di Capodanno 2027, dopo-partita e dopo-concerto San Siro, pacchetti celibato/nubilato e mappe di quartiere curate dal Concierge Nightlife Milan.'
            )}
          </p>
        </div>

        {/* AI Answer Box */}
        <div className="max-w-3xl mx-auto p-6 rounded-2xl border border-champagne/25 bg-champagne/[0.04]">
          <p className="font-mono text-champagne text-[10px] tracking-[0.3em] uppercase mb-3">
            {tr(locale, 'Quick Answer · Executive Summary', 'Risposta Rapida · Sintesi Esecutiva')}
          </p>
          <p className="font-sans text-white/75 text-sm leading-relaxed">
            {isIt ? (
              <>
                La nostra libreria comprende <strong className="text-white">14 Guide Pillar complete</strong> aggiornate per la stagione <strong className="text-white">2026/2027</strong>: <strong className="text-white">Dress Code e Selezione</strong>, <strong className="text-white">Listino Prezzi Tavoli VIP e Bottiglie</strong> (da €150 per gli aperitivi a €250-€5.000 nei club), <strong className="text-white">Capodanno Milano 2027 (Gran Cenone, Royal Buffet e Tavoli nei 19 Club)</strong>, <strong className="text-white">Dopo-Partita Calcio a San Siro (Inter & Milan: Aria Club a 150m, Just Me 7/7, Voya Rooftop, 55 Milano)</strong>, <strong className="text-white">Afterparty Concerti San Siro, Ippodromo, Forum e Fabrique</strong>, <strong className="text-white">Addio al Celibato e Nubilato VIP</strong>, <strong className="text-white">Calendario Settimanale Lunedi-Domenica</strong>, <strong className="text-white">Migliori Rooftop Bar</strong>, <strong className="text-white">Speakeasy Segreti</strong>, <strong className="text-white">Club Techno & Warehouse</strong>, <strong className="text-white">Feste di Laurea / 18 Anni</strong> e <strong className="text-white">Fashion Week, Fuorisalone & Monza F1</strong>. Prenotazione diretta garantita via WhatsApp <strong className="text-champagne">+39 351 912 7047</strong> o <strong className="text-champagne">concierge@nightlifemilan.com</strong>.
              </>
            ) : (
              <>
                Our library features <strong className="text-white">14 exhaustive Pillar Guides</strong> updated for the <strong className="text-white">2026/2027</strong> season: <strong className="text-white">Door Policy & Dress Codes</strong>, <strong className="text-white">VIP Table & Bottle Service Price List</strong> (from €150 for aperitivo tables to €250-€5,000 in clubs), <strong className="text-white">New Year Eve Milan 2027 (Gala Dinners, Royal Buffets & VIP Tables across 19 Clubs)</strong>, <strong className="text-white">San Siro Football Match Afterparties (Inter & AC Milan: Aria Club 150m away, Just Me 7/7, Voya Rooftop, 55 Milano)</strong>, <strong className="text-white">San Siro, Ippodromo, Forum & Fabrique Concert Afterparties</strong>, <strong className="text-white">VIP Bachelor & Bachelorette Parties</strong>, <strong className="text-white">Monday-to-Sunday Weekly Calendar</strong>, <strong className="text-white">Best Rooftop Bars</strong>, <strong className="text-white">Hidden Navigli Speakeasies</strong>, <strong className="text-white">Techno & Underground Warehouses</strong>, <strong className="text-white">Graduation / 18th Parties</strong>, and <strong className="text-white">Fashion Week, Design Week & Monza F1 Afterparties</strong>. Direct booking via WhatsApp <strong className="text-champagne">+39 351 912 7047</strong> or <strong className="text-champagne">concierge@nightlifemilan.com</strong>.
              </>
            )}
          </p>
        </div>
      </section>

      {/* Featured Guide (#1 Pillar) */}
      {featuredGuide && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <Link
            href={`${localePrefix}/guides/${getLocalizedText(featuredGuide.slugs, locale)}`}
            className="group relative block w-full h-[500px] md:h-[580px] rounded-2xl overflow-hidden border border-white/15 hover:border-champagne/60 transition-all duration-500"
          >
            <Image
              src={featuredGuide.image || '/images/bottle-service-milan-vip-nightclub.webp'}
              alt={getLocalizedText(featuredGuide.title, locale).replace(/[—–]/g, ' - ')}
              fill
              quality={92}
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent opacity-95" />

            <div className="absolute inset-0 p-8 md:p-14 flex flex-col justify-end">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-champagne text-black px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
                  {isIt
                    ? GUIDE_META[featuredGuide.id]?.badgeIt || 'Guida in Evidenza'
                    : GUIDE_META[featuredGuide.id]?.badgeEn || 'Featured Guide'}
                </span>
                <span className="text-champagne text-xs font-medium tracking-wider uppercase border border-champagne/30 px-4 py-1.5 rounded-full backdrop-blur-sm">
                  {isIt
                    ? GUIDE_META[featuredGuide.id]?.categoryIt || 'Guida Insider'
                    : GUIDE_META[featuredGuide.id]?.categoryEn || 'Insider Guide'}
                </span>
                <div className="flex items-center space-x-1.5 text-white/75 text-xs font-mono">
                  <Clock className="w-3.5 h-3.5 text-champagne" />
                  <span>
                    {isIt
                      ? GUIDE_META[featuredGuide.id]?.readTimeIt || '8 min di lettura'
                      : GUIDE_META[featuredGuide.id]?.readTimeEn || '8 min read'}
                  </span>
                </div>
              </div>

              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 group-hover:text-champagne transition-colors max-w-4xl">
                {getLocalizedText(featuredGuide.title, locale).replace(/[—–]/g, ' - ')}
              </h2>
              <p className="text-base md:text-lg text-white/75 max-w-3xl line-clamp-3 mb-6">
                {getLocalizedText(featuredGuide.excerpt, locale).replace(/[—–]/g, ' - ')}
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-champagne">
                <span>{isIt ? 'Leggi la Guida Completa' : 'Read Complete Pillar Guide'}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* All 13 Remaining Pillar Guides Grid (Total 14 Pillar Guides) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-champagne mb-2">
              {isIt ? 'Libreria Editoriale Completa · 114 Guide Pillar' : 'Complete Editorial Library · 114 Pillar Guides'}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-white">
              {isIt ? 'Tutte le 114 Guide Pillar 2026/2027' : 'All 114 Flagship Pillar Guides 2026/2027'}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { href: `${localePrefix}/new-years-eve`, label: isIt ? 'Capodanno 2027' : 'New Year Eve 2027' },
              { href: `${localePrefix}/football-afterparties`, label: isIt ? 'Dopo-Partita San Siro' : 'San Siro Football' },
              { href: `${localePrefix}/concert-afterparties`, label: isIt ? 'Dopo-Concerto' : 'Concert Afterparties' },
              { href: `${localePrefix}/fashion-week`, label: isIt ? 'Fashion Week & Fuorisalone' : 'Fashion & Design Week' },
              { href: `${localePrefix}/vip-tables`, label: isIt ? 'Tavoli VIP' : 'VIP Tables' },
              { href: `${localePrefix}/bottle-prices`, label: isIt ? 'Listino Bottiglie' : 'Bottle Prices' },
              { href: `${localePrefix}/rooftops`, label: isIt ? 'Rooftop Bar' : 'Rooftop Bars' },
              { href: `${localePrefix}/private-parties`, label: isIt ? 'Lauree, 18 Anni & Nubilato' : 'Private & Bachelor Parties' },
              { href: `${localePrefix}/guest-lists`, label: isIt ? 'Liste & Ingressi' : 'Guest Lists' },
            ].map((chip) => (
              <Link
                key={chip.href}
                href={chip.href}
                className="px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.03] hover:border-champagne/50 text-xs text-white/75 hover:text-champagne transition-colors"
              >
                {chip.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {remainingGuides.map((guide, index) => {
            const meta = GUIDE_META[guide.id] || {
              categoryEn: 'Insider Guide',
              categoryIt: 'Guida Insider',
              readTimeEn: '8 min read',
              readTimeIt: '8 min di lettura',
            };
            const guideSlug = getLocalizedText(guide.slugs, locale);
            const guideTitle = getLocalizedText(guide.title, locale).replace(/[—–]/g, ' - ');
            const guideExcerpt = getLocalizedText(guide.excerpt, locale).replace(/[—–]/g, ' - ');
            const highlights = isIt ? meta.highlightsIt : meta.highlightsEn;

            return (
              <Link
                key={guide.id}
                href={`${localePrefix}/guides/${guideSlug}`}
                className="group flex flex-col bg-white/[0.025] rounded-2xl overflow-hidden border border-white/10 hover:border-champagne/45 transition-all duration-500"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={guide.image || '/images/milan-nightclub-luxury-vip-champagne.webp'}
                    alt={guideTitle}
                    fill
                    quality={92}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2">
                    <span className="bg-black/70 backdrop-blur-md border border-white/15 text-white px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase">
                      {isIt ? meta.categoryIt : meta.categoryEn}
                    </span>
                    {(isIt ? meta.badgeIt : meta.badgeEn) && (
                      <span className="bg-champagne text-black px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
                        {isIt ? meta.badgeIt : meta.badgeEn}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 left-3.5 flex items-center gap-2 text-champagne text-xs font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{isIt ? meta.readTimeIt : meta.readTimeEn}</span>
                    <span className="text-white/40">·</span>
                    <span className="text-white/60">
                      {guide.sections?.length || 4} {isIt ? 'capitoli' : 'chapters'}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mb-2">
                      Pillar #{index + 2} / {sortedGuides.length}
                    </div>
                    <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-champagne transition-colors leading-snug">
                      {guideTitle}
                    </h3>
                    <p className="text-white/55 text-sm leading-relaxed line-clamp-3 mb-4">
                      {guideExcerpt}
                    </p>
                    {highlights && highlights.length > 0 && (
                      <ul className="mb-4 space-y-1">
                        {highlights.slice(0, 3).map((h, hi) => (
                          <li key={hi} className="text-xs text-champagne/80 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-champagne shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-champagne">
                    <span>{isIt ? 'Approfondisci' : 'Read Guide'}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Interactive Weekly Nightlife Navigator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <WeeklyNightlifeNavigator locale={locale} />
      </section>

      {/* Interactive VIP Table & Bottle Service Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <VipQuoteCalculator locale={locale} />
      </section>

      {/* Priority 6 Venues Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <PrioritySixShowcase locale={locale} />
      </section>

      {/* Essential Milan Nightlife Knowledge */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 border-t border-white/10 pt-16">
        <div className="flex items-center gap-2 mb-3">
          <Compass className="w-4 h-4 text-champagne" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-champagne">
            {isIt ? 'Regole d’Oro del Concierge' : 'Concierge Golden Rules'}
          </span>
        </div>
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-8">
          {tr(locale, 'Essential Milan Nightlife Knowledge', 'Le 4 Regole Fondamentali della Notte a Milano')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-7 rounded-2xl border border-white/10 bg-white/[0.02]">
            <h3 className="font-serif text-xl text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-champagne shrink-0" />
              {tr(locale, 'Dress Code: What Actually Gets You In', 'Dress Code: Cosa Ti Fa Entrare Davvero')}
            </h3>
            <p className="font-sans text-white/60 text-sm leading-relaxed">
              {tr(
                locale,
                'Milan enforces strict door selection. At Just Me, Pineta, Aria, and 55 Milano: smart-glamour minimum, collared shirt and dark blazer for men, evening chic for women (no gym sneakers, sportswear, or chains). At Volt, Amnesia, Fabrique, and Magazzini Generali: contemporary total-black clubwear. At Voya Rooftop: panoramic cocktail attire.',
                'Milano applica una selezione rigorosa alla porta. Da Just Me, Pineta, Aria e 55 Milano: minimo smart-glamour, camicia e blazer scuro per gli uomini, abito da sera o tailleur chic per le donne (vietate sneaker sportive, tute e borselli). Da Volt, Amnesia, Fabrique e Magazzini Generali: total-black contemporaneo. Da Voya Rooftop: cocktail chic.'
              )}
            </p>
          </div>
          <div className="p-7 rounded-2xl border border-white/10 bg-white/[0.02]">
            <h3 className="font-serif text-xl text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-champagne shrink-0" />
              {tr(locale, 'Exact Timing: Aperitivo vs Club Peak', 'Orari Esatti: Aperitivo vs Picco Club')}
            </h3>
            <p className="font-sans text-white/60 text-sm leading-relaxed">
              {tr(
                locale,
                'Royal Aperitivo & Dinner Shows at 55 Milano, Just Me, Pineta, Tocqueville 13, and Voya Rooftop start at 19:30 and peak at 20:30-22:30. Nightclubs open their doors at 23:30: guest list privileges expire between 00:30 and 01:00, while VIP Table check-in is guaranteed until 01:30 with dedicated hostess escort.',
                'Royal Aperitivo e Dinner Show da 55 Milano, Just Me, Pineta, Tocqueville 13 e Voya Rooftop iniziano alle 19:30 con picco tra le 20:30 e le 22:30. Le discoteche aprono alle 23:30: le agevolazioni in lista chiudono tra le 00:30 e l’01:00, mentre il check-in Tavolo VIP è garantito fino all’01:30 con accoglienza hostess dedicata.'
              )}
            </p>
          </div>
          <div className="p-7 rounded-2xl border border-white/10 bg-white/[0.02]">
            <h3 className="font-serif text-xl text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-champagne shrink-0" />
              {tr(locale, 'Guestlist vs VIP Table: Transparent Math', 'Lista vs Tavolo VIP: Il Calcolo Trasparente')}
            </h3>
            <p className="font-sans text-white/60 text-sm leading-relaxed">
              {tr(
                locale,
                'A guest list offers reduced entry (€15-€30) but requires queueing and mixed gender balance. For groups of 5-10 guests, a VIP Table (€250-€600 total, i.e. €35-€65 per person) is 100% spendable in premium bottles, skips all lines, guarantees door approval, and gives you a private base all night.',
                'La lista nominale offre ingresso ridotto (€15-€30) ma richiede coda e bilanciamento uomo/donna. Per gruppi di 5-10 persone, il Tavolo VIP (€250-€600 totali, cioè €35-€65 a testa) è 100% spendibile in bottiglie premium, salta ogni fila, blinda l’ingresso alla porta e garantisce una base privata tutta la notte.'
              )}
            </p>
          </div>
          <div className="p-7 rounded-2xl border border-white/10 bg-white/[0.02]">
            <h3 className="font-serif text-xl text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-champagne shrink-0" />
              {tr(locale, '14 Nightlife Districts & 19+ Venues Mapped', '14 Quartieri e 19+ Club Mappati')}
            </h3>
            <p className="font-sans text-white/60 text-sm leading-relaxed">
              {tr(
                locale,
                'Explore all 14 Milan nightlife zones: Parco Sempione (Just Me, 55 Milano), San Siro (Aria Club 150m from Stadium), Portello/CityLife (Voya Rooftop 20th Floor), Corso Como & Garibaldi (Pineta, Repvblic, Hollywood, Play, Volt, 11 Clubroom, Tocqueville 13), Isola (Alcatraz, Ceresio 7), Mecenate/Forlanini (Fabrique, Amnesia), Brera, Navigli, Porta Venezia, Porta Romana, Ripamonti, Duomo, NoLo, and Lambrate.',
                'Esplora tutti i 14 quartieri della notte milanese: Parco Sempione (Just Me, 55 Milano), San Siro (Aria Club a 150m dallo Stadio), Portello/CityLife (Voya Rooftop 20° Piano), Corso Como & Garibaldi (Pineta, Repvblic, Hollywood, Play, Volt, 11 Clubroom, Tocqueville 13), Isola (Alcatraz, Ceresio 7), Mecenate/Forlanini (Fabrique, Amnesia), Brera, Navigli, Porta Venezia, Porta Romana, Ripamonti, Duomo, NoLo e Lambrate.'
              )}
            </p>
          </div>
        </div>
      </section>

      <VerticalHubsAndEventsSection locale={locale} initialTab="occasions" eventFocus="all" />
      {/* Newsletter Hub */}
      <NewsletterHub lang={locale} />
            <EditorialPageSections locale={locale as LocaleCode} path={`${localePrefix}/guides`} />
      </main>
  );
}
