import { Metadata } from 'next';
import { getLocaleDef, hreflangAlternates, canonicalPageUrl } from '@/lib/i18n/locales';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { getHubSeoMeta35 } from '@/lib/i18n/hubSeoMeta35';
import { getGuideUiLabels35 } from '@/lib/i18n/flagshipGuides35';
import { getGuidesHubCopy35 } from '@/lib/i18n/guidesHub35';
import { getLocalizedGuideSlug35 } from '@/lib/guides100Catalog';
import GuideToc from '@/components/GuideToc';
import Link from '@/components/LocalizedLink';
import Image from 'next/image';
import NewsletterHub from '@/components/NewsletterHub';
import { Clock, Sparkles, Compass, CheckCircle2, ArrowUpRight, ShieldCheck } from 'lucide-react';
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
  const loc = (locale as LocaleCode) || 'en';
  const canonical = canonicalPageUrl(baseUrl, loc, '/guides');
  const meta35 = getHubSeoMeta35('guides', loc);

  const title = seoTitle(meta35.title);
  const description = withWhatsApp(meta35.description, loc);
  const featuredGuide = mockGuides.find((g) => g.id === 'g-dress-code') || mockGuides[0];
  const ogImage = `${baseUrl}${featuredGuide?.image || '/images/pillars/guide-hero-01.webp'}`;

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
    'serate milano lunedì domenica',
    'migliori rooftop bar milano',
  ];

  return {
    title,
    description,
    keywords: keywordsEn.map((k, i) => tr(loc, k, keywordsIt[i])),
    robots: seoRobots(loc),
    alternates: {
      canonical,
      languages: hreflangAlternates(baseUrl, '/guides'),
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical,
      siteName: 'Nightlife Milan',
      locale: getLocaleDef(loc)?.ogLocale || 'en_US',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
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
    badgeIt: 'Pillar #1 · Più Letta',
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
      '20th-Floor Voya + Just Me Privé Combo',
      'Limousine & Custom LED Bottle Shows',
    ],
    highlightsIt: [
      'Cena Cantata da Pineta e 55 Milano',
      'Ingresso garantito gruppi soli uomini',
      'Combo Voya 20° Piano + Privé Just Me',
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
  const loc = (locale as LocaleCode) || 'en';
  const isIt = loc === 'it';
  const localePrefix = loc === 'en' ? '' : `/${loc}`;
  const guidesDir = getLocalizedDir35('guides', loc);
  const guidesHubUrl = `${baseUrl}${localePrefix}/${guidesDir}`;
  const hubUi = getGuidesHubCopy35(loc);
  const guideUi = getGuideUiLabels35(loc);

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

  const orderedSet = new Set(orderedIds);
  const flagshipGuides = orderedIds
    .map((id) => mockGuides.find((g) => g.id === id))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));
  const clusterGuides = mockGuides.filter((g) => !orderedSet.has(g.id));
  const allGuidesOrdered = [...flagshipGuides, ...clusterGuides];

  const featuredGuide = flagshipGuides[0];
  const remainingFlagship = flagshipGuides.slice(1);

  const parseClusterNum = (id: string) => parseInt(id.replace(/^g-/, ''), 10);
  const venuesCluster = clusterGuides.filter((g) => {
    const n = parseClusterNum(g.id);
    return !Number.isNaN(n) && n >= 15 && n <= 40;
  });
  const occasionsCluster = clusterGuides.filter((g) => {
    const n = parseClusterNum(g.id);
    return !Number.isNaN(n) && n >= 41 && n <= 88;
  });
  const fairsCluster = clusterGuides.filter((g) => {
    const n = parseClusterNum(g.id);
    return !Number.isNaN(n) && n >= 89 && n <= 109;
  });
  const geoCluster = clusterGuides.filter((g) => {
    const n = parseClusterNum(g.id);
    return Number.isNaN(n) || n < 15 || n >= 110;
  });

  const cleanStr = (s: string) => s.replace(/[—–]/g, ' - ');

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: guideUi.home, item: `${baseUrl}${localePrefix || '/'}` },
        { '@type': 'ListItem', position: 2, name: guideUi.guides, item: guidesHubUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: hubUi.h1,
      url: guidesHubUrl,
      description: hubUi.lead,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: allGuidesOrdered.map((g, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: cleanStr(getLocalizedText(g.title, loc)),
          url: `${guidesHubUrl}/${getLocalizedGuideSlug35(g, loc)}`,
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: hubUi.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ];

  const clusterSections = [
    {
      id: 'cluster-venues',
      title: hubUi.clusterVenuesTitle,
      desc: hubUi.clusterVenuesDesc,
      items: venuesCluster,
    },
    {
      id: 'cluster-occasions',
      title: hubUi.clusterOccasionsTitle,
      desc: hubUi.clusterOccasionsDesc,
      items: occasionsCluster,
    },
    {
      id: 'cluster-fairs-holidays',
      title: hubUi.clusterFairsTitle,
      desc: hubUi.clusterFairsDesc,
      items: fairsCluster,
    },
    {
      id: 'cluster-geo-hinterland',
      title: hubUi.clusterGeoTitle,
      desc: hubUi.clusterGeoDesc,
      items: geoCluster,
    },
  ].filter((sec) => sec.items.length > 0);

  return (
    <main className="flex-grow pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav className="text-sm text-white/40" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex items-center">
            <li className="flex items-center">
              <Link href={localePrefix || '/'} locale={loc} className="hover:text-champagne transition-colors">
                {guideUi.home}
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-champagne" aria-current="page">
              {guideUi.guides}
            </li>
          </ol>
        </nav>
      </div>

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-champagne/30 bg-champagne/10 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-champagne" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-champagne">
              {hubUi.badge}
            </span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-champagne tracking-tighter mb-6">
            {hubUi.h1}
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            {hubUi.lead}
          </p>
        </div>

        {/* AI Answer Box */}
        <div className="max-w-3xl mx-auto p-6 rounded-2xl border border-champagne/25 bg-champagne/[0.04] mb-6">
          <p className="font-mono text-champagne text-[10px] tracking-[0.3em] uppercase mb-3">
            {hubUi.quickAnswerTitle}
          </p>
          <p className="font-sans text-white/75 text-sm leading-relaxed">
            {hubUi.quickAnswerBody}
          </p>
        </div>

        {/* E-E-A-T Verified Concierge Bar */}
        <div className="max-w-3xl mx-auto p-4 rounded-xl border border-white/10 bg-white/[0.02] mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-champagne shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-white">{guideUi.verifiedTitle}</p>
              <p className="text-xs text-white/60 mt-0.5">{guideUi.verifiedBody}</p>
            </div>
          </div>
          <a
            href="https://wa.me/393519127047"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-3.5 py-2 rounded-full bg-champagne text-black text-xs font-bold whitespace-nowrap hover:bg-champagne/90 transition-colors"
          >
            {guideUi.directDesk}
          </a>
        </div>

        {/* Clickable TOC */}
        <div className="max-w-3xl mx-auto">
          <GuideToc sections={hubUi.tocItems} title={hubUi.tocTitle} />
        </div>
      </section>

      {/* Featured Guide (#1 Pillar) */}
      {featuredGuide && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <Link
            href={`${localePrefix}/${guidesDir}/${getLocalizedGuideSlug35(featuredGuide, loc)}`}
            locale={loc}
            className="group relative block w-full h-[500px] md:h-[580px] rounded-2xl overflow-hidden border border-white/15 hover:border-champagne/60 transition-all duration-500"
          >
            <Image
              src={featuredGuide.image || '/images/pillars/guide-hero-01.webp'}
              alt={cleanStr(getLocalizedText(featuredGuide.title, loc))}
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
                  {hubUi.featuredBadge}
                </span>
                <span className="text-champagne text-xs font-medium tracking-wider uppercase border border-champagne/30 px-4 py-1.5 rounded-full backdrop-blur-sm">
                  {guideUi.officialBadge}
                </span>
                <div className="flex items-center space-x-1.5 text-white/75 text-xs font-mono">
                  <Clock className="w-3.5 h-3.5 text-champagne" />
                  <span>{featuredGuide.sections?.length || 5} {hubUi.chaptersLabel}</span>
                </div>
              </div>

              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 group-hover:text-champagne transition-colors max-w-4xl">
                {cleanStr(getLocalizedText(featuredGuide.title, loc))}
              </h2>
              <p className="text-base md:text-lg text-white/75 max-w-3xl line-clamp-3 mb-6">
                {cleanStr(getLocalizedText(featuredGuide.excerpt, loc))}
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-champagne">
                <span>{hubUi.featuredCta}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Remaining 13 Flagship Pillar Guides (Total 14 Visual Cards) */}
      <section id="flagship-pillars" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-champagne mb-2">
              {hubUi.flagshipEyebrow}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-white">
              {hubUi.flagshipTitle}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { href: `${localePrefix}/new-years-eve`, label: tr(loc, 'New Year Eve 2027', 'Capodanno 2027') },
              { href: `${localePrefix}/football-afterparties`, label: tr(loc, 'San Siro Football', 'Dopo-Partita San Siro') },
              { href: `${localePrefix}/concert-afterparties`, label: tr(loc, 'Concert Afterparties', 'Dopo-Concerto') },
              { href: `${localePrefix}/fashion-week`, label: tr(loc, 'Fashion & Design Week', 'Fashion Week & Fuorisalone') },
              { href: `${localePrefix}/vip-tables`, label: tr(loc, 'VIP Tables', 'Tavoli VIP') },
              { href: `${localePrefix}/bottle-prices`, label: tr(loc, 'Bottle Prices', 'Listino Bottiglie') },
              { href: `${localePrefix}/rooftops`, label: tr(loc, 'Rooftop Bars', 'Rooftop Bar') },
              { href: `${localePrefix}/private-parties`, label: tr(loc, 'Private & Bachelor Parties', 'Lauree, 18 Anni & Nubilato') },
              { href: `${localePrefix}/guest-lists`, label: tr(loc, 'Guest Lists', 'Liste & Ingressi') },
            ].map((chip) => (
              <Link
                key={chip.href}
                href={chip.href}
                locale={loc}
                className="px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.03] hover:border-champagne/50 text-xs text-white/75 hover:text-champagne transition-colors"
              >
                {chip.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {remainingFlagship.map((guide, index) => {
            const meta = GUIDE_META[guide.id] || {
              categoryEn: 'Insider Guide',
              categoryIt: 'Guida Insider',
              readTimeEn: '8 min read',
              readTimeIt: '8 min di lettura',
            };
            const guideSlug = getLocalizedGuideSlug35(guide, loc);
            const guideTitle = cleanStr(getLocalizedText(guide.title, loc));
            const guideExcerpt = cleanStr(getLocalizedText(guide.excerpt, loc));
            const highlights = isIt ? meta.highlightsIt : meta.highlightsEn;

            return (
              <Link
                key={guide.id}
                href={`${localePrefix}/${guidesDir}/${guideSlug}`}
                locale={loc}
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
                      {tr(loc, meta.categoryEn, meta.categoryIt)}
                    </span>
                    {meta.badgeEn && (
                      <span className="bg-champagne text-black px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
                        {tr(loc, meta.badgeEn, meta.badgeIt || meta.badgeEn)}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 left-3.5 flex items-center gap-2 text-champagne text-xs font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{tr(loc, meta.readTimeEn, meta.readTimeIt)}</span>
                    <span className="text-white/40">·</span>
                    <span className="text-white/60">
                      {guide.sections?.length || 4} {hubUi.chaptersLabel}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mb-2">
                      {hubUi.pillarLabel} #{index + 2} / {flagshipGuides.length}
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
                    <span>{hubUi.readGuideLabel}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 102 Cluster Guides: Compact Grouped Editorial Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 space-y-14">
        <div className="border-t border-white/10 pt-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-champagne mb-2">
            {hubUi.clustersEyebrow}
          </p>
        </div>
        {clusterSections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="font-serif text-2xl md:text-3xl text-white mb-2">
              {section.title}
            </h2>
            <p className="text-sm text-white/60 max-w-3xl mb-6">{section.desc}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {section.items.map((guide) => {
                const guideSlug = getLocalizedGuideSlug35(guide, loc);
                const guideTitle = cleanStr(getLocalizedText(guide.title, loc));
                return (
                  <Link
                    key={guide.id}
                    href={`${localePrefix}/${guidesDir}/${guideSlug}`}
                    locale={loc}
                    className="group flex items-center justify-between gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-champagne/50 hover:bg-champagne/[0.04] transition-colors"
                  >
                    <div className="min-w-0">
                      <span className="block font-serif text-base font-semibold text-white group-hover:text-champagne transition-colors leading-snug">
                        {guideTitle}
                      </span>
                      <span className="mt-1 inline-block font-mono text-[10px] uppercase tracking-wider text-white/40">
                        {hubUi.readGuideLabel}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-champagne shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Interactive Weekly Nightlife Navigator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <WeeklyNightlifeNavigator locale={loc} />
      </section>

      {/* Interactive VIP Table & Bottle Service Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <VipQuoteCalculator locale={loc} />
      </section>

      {/* Priority 6 Venues Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <PrioritySixShowcase locale={loc} />
      </section>

      {/* Essential Milan Nightlife Knowledge */}
      <section id="golden-rules" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 border-t border-white/10 pt-16 scroll-mt-24">
        <div className="flex items-center gap-2 mb-3">
          <Compass className="w-4 h-4 text-champagne" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-champagne">
            {hubUi.goldenEyebrow}
          </span>
        </div>
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-8">
          {hubUi.goldenTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hubUi.goldenRules.map((rule) => (
            <div key={rule.title} className="p-7 rounded-2xl border border-white/10 bg-white/[0.02]">
              <h3 className="font-serif text-xl text-white mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-champagne shrink-0" />
                {rule.title}
              </h3>
              <p className="font-sans text-white/60 text-sm leading-relaxed">
                {rule.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Visible FAQ Section */}
      <section id="guides-faq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 border-t border-white/10 pt-14 scroll-mt-24">
        <h2 className="font-serif text-3xl text-white mb-8">{hubUi.faqTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {hubUi.faqs.map((faq) => (
            <div key={faq.question} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <h3 className="font-serif text-lg text-champagne mb-2">{faq.question}</h3>
              <p className="text-sm text-white/70 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <VerticalHubsAndEventsSection locale={loc} initialTab="occasions" eventFocus="all" />
      {/* Newsletter Hub */}
      <NewsletterHub lang={loc} />
      <EditorialPageSections locale={loc} path={`${localePrefix}/guides`} />
    </main>
  );
}
