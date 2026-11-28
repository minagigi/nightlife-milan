import { Metadata } from 'next';
import Image from 'next/image';
import {
  ArrowRight,
  Car,
  CheckCircle2,
  ListChecks,
  MapPin,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { notFound } from 'next/navigation';
import BergamoBresciaExplorer, {
  type BergamoBresciaClubFilterItem,
} from '@/components/BergamoBresciaExplorer';
import EditorialPageSections from '@/components/EditorialPageSections';
import EventVenueMap from '@/components/EventVenueMap';
import { HumanEventCarousel } from '@/components/HumanEventCarousel';
import Link from '@/components/LocalizedLink';
import {
  getBergamoBresciaActiveNightCards,
  type BergamoBresciaCardViewModel,
} from '@/lib/bergamo-brescia/activeNights35';
import {
  bergamoBresciaVenueBatch,
  BG_BS_CITY_META_BY_ID,
  type BergamoBresciaVenueId,
} from '@/lib/bergamo-brescia/clubsSeed';
import { getBergamoBresciaHubCopy35 } from '@/lib/bergamo-brescia/hubCopy35';
import { BERGAMO_BRESCIA_NYE_SLUGS } from '@/lib/capodanno/bergamoBresciaNye35';
import { getCapodannoLocalizedEventContent } from '@/lib/capodanno/i18n';
import { capodannoEventPath, capodannoPath } from '@/lib/capodanno/routes';
import { getCapodannoEventBySlug } from '@/lib/capodannoEvents';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import { getEventVenueCopy } from '@/lib/i18n/eventVenueCopy';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { getHubSeoMeta35 } from '@/lib/i18n/hubSeoMeta35';
import {
  canonicalPageUrl,
  getLocaleDef,
  hreflangAlternates,
  isEnabledLocale,
  localePrefix,
  type LocaleCode,
} from '@/lib/i18n/locales';
import {
  getLocalizedSeoPagePath35,
  getLocalizedVenueSlug35,
} from '@/lib/i18n/localizedSlugs35';
import { getLocalizedText } from '@/lib/seo';
import { seoRobots, seoTitle, withWhatsApp } from '@/lib/seoMetadata';

export const revalidate = 3600;

const BASE_URL = process.env.APP_URL || 'https://nightlifemilan.com';
const HUB_POSTER_SRC = '/images/events/weekly-posters/bergamo-brescia-hub-2026.webp';

const VENUE_ID_TO_CLUB_KEY: Record<
  BergamoBresciaVenueId,
  BergamoBresciaCardViewModel['clubKey']
> = {
  'v-setai-bergamo': 'setai',
  'v-capogiro-bergamo': 'capogiro',
  'v-tiky-klub-bergamo': 'tiky',
  'v-zero-club-bergamo': 'zeroclub',
  'v-qi-clubbing-brescia': 'qiclubbing',
  'v-number-one-brescia': 'numberone',
};

const VENUE_ID_TO_NYE_SLUG: Record<BergamoBresciaVenueId, string> = {
  'v-setai-bergamo': 'capodanno-setai-club-bergamo',
  'v-capogiro-bergamo': 'capodanno-capogiro-curno-bergamo',
  'v-tiky-klub-bergamo': 'capodanno-tiky-klub-seriate-bergamo',
  'v-zero-club-bergamo': 'capodanno-zero-club-bergamo',
  'v-qi-clubbing-brescia': 'capodanno-qi-clubbing-brescia',
  'v-number-one-brescia': 'capodanno-number-one-brescia',
};

const NYE_SLUG_META: Record<
  (typeof BERGAMO_BRESCIA_NYE_SLUGS)[number],
  {
    clubKey: BergamoBresciaCardViewModel['clubKey'];
    province: 'BG' | 'BS';
    city: string;
    whenLabel: string;
  }
> = {
  'capodanno-setai-club-bergamo': {
    clubKey: 'setai',
    province: 'BG',
    city: 'Orio al Serio',
    whenLabel: '31 Dic 2026 · 20:30 – 05:00',
  },
  'capodanno-capogiro-curno-bergamo': {
    clubKey: 'capogiro',
    province: 'BG',
    city: 'Curno',
    whenLabel: '31 Dic 2026 · 20:30 – 04:30',
  },
  'capodanno-tiky-klub-seriate-bergamo': {
    clubKey: 'tiky',
    province: 'BG',
    city: 'Seriate',
    whenLabel: '31 Dic 2026 · 23:00 – 05:00',
  },
  'capodanno-zero-club-bergamo': {
    clubKey: 'zeroclub',
    province: 'BG',
    city: 'Bergamo Centro',
    whenLabel: '31 Dic 2026 · 23:00 – 05:00',
  },
  'capodanno-qi-clubbing-brescia': {
    clubKey: 'qiclubbing',
    province: 'BS',
    city: 'Erbusco',
    whenLabel: '31 Dic 2026 · 20:30 – 05:00',
  },
  'capodanno-number-one-brescia': {
    clubKey: 'numberone',
    province: 'BS',
    city: 'Corte Franca',
    whenLabel: '31 Dic 2026 · 22:00 – 05:30',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isEnabledLocale(locale)) notFound();

  const canonical = canonicalPageUrl(BASE_URL, locale, '/bergamo-brescia');
  const languages = hreflangAlternates(BASE_URL, '/bergamo-brescia');
  const meta35 = getHubSeoMeta35('bergamo-brescia', locale);
  const title = seoTitle(meta35.title);
  const description = withWhatsApp(meta35.description, locale);
  const ogImg = `${BASE_URL}${HUB_POSTER_SRC}`;

  return {
    title,
    description,
    robots: seoRobots(locale),
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: getLocaleDef(locale)?.ogLocale || 'en_US',
      images: [
        {
          url: ogImg,
          width: 1080,
          height: 1350,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImg],
      site: '@nightlifemilan',
    },
  };
}

export default async function BergamoBresciaHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isEnabledLocale(rawLocale)) notFound();
  const locale = (getLocaleDef(rawLocale)?.code || 'en') as LocaleCode;
  const lp = localePrefix(locale);
  const clubsDir = getLocalizedDir35('clubs', locale);
  const hubPath = `${lp}${getLocalizedSeoPagePath35('/bergamo-brescia', locale)}`;
  const canonicalUrl = `${BASE_URL}${hubPath}`;
  const copy = getBergamoBresciaHubCopy35(locale);
  const mapCopy = getEventVenueCopy(locale);
  const now = new Date();

  const clubItems = bergamoBresciaVenueBatch.map((v) => {
    const vid = v.id as BergamoBresciaVenueId;
    const cityMeta = BG_BS_CITY_META_BY_ID[vid];
    const name = getLocalizedText(v.localizedContent.name, locale);
    const description = getLocalizedText(v.localizedContent.description, locale);
    const slug = getLocalizedVenueSlug35(vid, locale);
    const href = `${lp}/${clubsDir}/${slug}`;
    const nyeSlug = VENUE_ID_TO_NYE_SLUG[vid];
    const nyeHref = capodannoEventPath(nyeSlug, locale);
    return {
      id: vid,
      clubKey: VENUE_ID_TO_CLUB_KEY[vid],
      name,
      city: v.address.addressLocality,
      province: cityMeta.province,
      zoneLabel: cityMeta.shortZoneLabel,
      highwayExit: locale === 'it' ? cityMeta.highwayExitIt : cityMeta.highwayExitEn,
      addressLine: `${v.address.streetAddress}, ${v.address.postalCode} ${v.address.addressLocality} (${cityMeta.province})`,
      description,
      genres: v.tags?.join(' · ') || 'House · Tech-House · Commercial',
      ageRange: v.ageRange || '18+',
      image: `/images/events/cards-4x5/partner-clubs/${v.slugs.en}.webp`,
      href,
      nyeHref,
      waHref: getConciergeBookingUrl(locale, `${name} (${v.address.addressLocality}) · Tavolo VIP`, hubPath),
    };
  });

  const explorerClubs: BergamoBresciaClubFilterItem[] = clubItems.map((c) => ({
    clubKey: c.clubKey,
    name: c.name,
    city: c.city,
    province: c.province,
    href: c.href,
  }));

  const nyeCards: BergamoBresciaCardViewModel[] = BERGAMO_BRESCIA_NYE_SLUGS.map((nyeSlug) => {
    const ev = getCapodannoEventBySlug(nyeSlug);
    const meta = NYE_SLUG_META[nyeSlug];
    const href = capodannoEventPath(nyeSlug, locale);
    const locEv = ev ? getCapodannoLocalizedEventContent(ev, locale) : null;
    const title = locEv?.title || ev?.venueName || nyeSlug;
    const venueName = ev?.venueName || nyeSlug;
    return {
      id: nyeSlug,
      clubKey: meta.clubKey,
      province: meta.province,
      city: meta.city,
      venueName,
      kind: 'nye',
      title,
      whenLabel:
        locale === 'it'
          ? meta.whenLabel
          : meta.whenLabel.replace('31 Dic 2026', 'Dec 31, 2026'),
      genresLabel: locEv?.musicAndFormat || 'Gala Dinner & NYE 2027 Club Party',
      posterSrc: `/images/events/capodanno-2027-posters/${nyeSlug}.webp`,
      href,
      waHref: getConciergeBookingUrl(locale, `Capodanno 2027 · ${venueName}`, hubPath),
      endISO: '2027-01-01T06:00:00+01:00',
    };
  });

  const activeNights = getBergamoBresciaActiveNightCards(locale, now);
  const waMainHref = getConciergeBookingUrl(
    locale,
    'Bergamo & Brescia (Setai / Capogiro / Tiky / Zero / Qi / Number One)',
    hubPath,
  );

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}${lp || '/'}` },
      { '@type': 'ListItem', position: 2, name: copy.h1, item: canonicalUrl },
    ],
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: copy.h1,
    description: copy.lead,
    url: canonicalUrl,
    image: `${BASE_URL}${HUB_POSTER_SRC}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        ...clubItems.map((c, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: `${c.name} (${c.city}, ${c.province})`,
          url: `${BASE_URL}${c.href}`,
        })),
        ...nyeCards.map((n, idx) => ({
          '@type': 'ListItem',
          position: clubItems.length + idx + 1,
          name: n.title,
          url: `${BASE_URL}${n.href}`,
        })),
        ...activeNights.map((a, idx) => ({
          '@type': 'ListItem',
          position: clubItems.length + nyeCards.length + idx + 1,
          name: a.title,
          url: `${BASE_URL}${a.href}`,
        })),
      ],
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: copy.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  const corridorMapUrl = `https://maps.google.com/maps?q=45.6500,9.8300&hl=${encodeURIComponent(locale)}&z=10&output=embed`;

  const tocItems = [
    { id: 'esplora-serate', label: copy.tocExplorer },
    { id: 'sei-club', label: copy.tocClubs },
    { id: 'capodanno-2027-bg-bs', label: copy.tocNye },
    { id: 'tabella-autostrada-a4', label: copy.tocMatrix },
    { id: 'guida-editoriale-a4', label: copy.tocGuide },
    { id: 'mappa-e-faq', label: copy.tocMapFaq },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-[#F6F1E7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-[1440px] border-x border-white/10 px-5 pb-3 pt-3 sm:px-14 sm:pt-4"
      >
        <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-white/65">
          <li>
            <Link href={lp || '/'} className="hover:text-[#EAE3D5]">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-[#EAE3D5]">Bergamo &amp; Brescia</li>
        </ol>
      </nav>

      {/* Hero Section (og:image == twitter:image == 1st body img) */}
      <header className="mx-auto max-w-[1440px] border-x border-b border-white/10 px-5 pb-12 sm:px-14">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <span className="inline-flex items-center gap-1.5 border border-[#EAE3D5]/40 bg-[#141311] px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#EAE3D5]">
              <Sparkles className="h-3.5 w-3.5" />
              {copy.eyebrow}
            </span>

            <h1 className="font-serif text-3xl font-normal leading-tight tracking-tight text-[#F6F1E7] sm:text-5xl">
              {copy.h1}
            </h1>

            <p className="font-sans text-base leading-relaxed text-[#EAE3D5]/90">{copy.lead}</p>

            {/* Quick Answer AI/GEO Box */}
            <p className="border-l-2 border-[#EAE3D5] bg-[#141311] px-4 py-3.5 font-sans text-sm leading-relaxed text-[#EAE3D5]">
              {copy.quickAnswer}
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={waMainHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center gap-2 bg-[#25D366] px-6 py-3 text-sm font-extrabold uppercase tracking-wider text-[#050505] transition-colors hover:bg-[#2EE472]"
              >
                <MessageCircle className="h-4 w-4" />
                {copy.bookWaCta}
              </a>
              <Link
                href={capodannoPath(locale)}
                className="inline-flex min-h-[48px] items-center gap-2 bg-[#EAE3D5] px-5 py-3 text-sm font-extrabold uppercase tracking-wider text-[#050505] transition-colors hover:bg-white"
              >
                <span>{copy.allCapodannoCta}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5" data-no-lightbox="true">
            <div className="aspect-[4/5] w-full overflow-hidden border border-[#EAE3D5]/30 bg-[#050505]">
              <Image
                src={HUB_POSTER_SRC}
                alt={copy.h1}
                title={copy.h1}
                width={1080}
                height={1350}
                priority
                fetchPriority="high"
                quality={92}
                sizes="(max-width: 1080px) 100vw, 540px"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Clickable TOC */}
        <nav aria-label={copy.tocTitle} className="mt-8 border-t border-white/15 pt-5">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#EAE3D5]">
            <ListChecks className="h-4 w-4" />
            <span>{copy.tocTitle}</span>
          </div>
          <ol className="mt-3 flex gap-2 overflow-x-auto pb-1.5 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-2.5 md:overflow-visible md:pb-0">
            {tocItems.map((item) => (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  className="inline-flex min-h-[38px] items-center gap-2 border border-white/15 bg-[#141311] px-3.5 py-1.5 font-sans text-xs font-semibold text-[#F6F1E7] transition-colors hover:border-[#EAE3D5] hover:text-[#EAE3D5] sm:text-sm"
                >
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </header>

      <div className="mx-auto max-w-[1440px] space-y-20 border-x border-white/10 px-5 py-14 sm:px-14">
        {/* 1. Interactive Explorer (All 6 NYE + 21 Active Nights) */}
        <section id="esplora-serate" className="scroll-mt-24 space-y-6">
          <div className="max-w-4xl space-y-2">
            <h2 className="font-serif text-3xl font-normal text-[#F6F1E7] sm:text-4xl">
              {copy.explorerHeading}
            </h2>
            <p className="font-sans text-base text-[#C2B9AA]">{copy.explorerSubtitle}</p>
          </div>

          <BergamoBresciaExplorer
            clubs={explorerClubs}
            nyeCards={nyeCards}
            activeNights={activeNights}
            initialNow={now.toISOString()}
            labels={copy.explorerLabels}
          />
        </section>

        {/* 2. The 6 Official Clubs (4 Bergamo + 2 Brescia/Franciacorta) */}
        <section id="sei-club" className="scroll-mt-24 space-y-8" data-no-lightbox="true">
          <div className="max-w-4xl space-y-2">
            <h2 className="font-serif text-3xl font-normal text-[#F6F1E7] sm:text-4xl">
              {copy.clubsHeading}
            </h2>
            <p className="font-sans text-base text-[#C2B9AA]">{copy.clubsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {clubItems.map((club) => (
              <article
                key={club.id}
                data-no-lightbox="true"
                className="flex flex-col justify-between overflow-hidden border border-white/15 bg-[#141311]"
              >
                <div>
                  <Link href={club.href} prefetch={false} className="block">
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#050505]">
                      <Image
                        src={club.image}
                        alt={`${club.name} · ${club.addressLine}`}
                        width={1080}
                        height={1350}
                        quality={92}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 440px"
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                      />
                    </div>
                  </Link>
                  <div className="space-y-3 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="border border-[#EAE3D5]/35 bg-[#050505] px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#EAE3D5]">
                        {club.zoneLabel}
                      </span>
                      <span className="font-mono text-xs text-[#C2B9AA]">{club.ageRange}</span>
                    </div>
                    <h3 className="font-serif text-2xl text-[#F6F1E7]">
                      <Link href={club.href} prefetch={false} className="hover:text-[#EAE3D5]">
                        {club.name}
                      </Link>
                    </h3>
                    <p className="flex items-start gap-1.5 font-mono text-xs text-[#EAE3D5]">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      <span>{club.addressLine}</span>
                    </p>
                    <p className="font-sans text-sm leading-relaxed text-[#C2B9AA]">
                      {club.description}
                    </p>
                    <p className="flex items-center gap-1.5 font-mono text-xs text-white/75">
                      <Car className="h-3.5 w-3.5 shrink-0 text-[#EAE3D5]" />
                      <span>{club.highwayExit}</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 border-t border-white/10 p-5 pt-4 sm:grid-cols-3">
                  <Link
                    href={club.href}
                    prefetch={false}
                    className="inline-flex min-h-[42px] items-center justify-center bg-[#EAE3D5] px-3 py-2 text-xs font-extrabold uppercase tracking-wider text-[#050505] hover:bg-white"
                  >
                    {copy.openClubProfileLabel}
                  </Link>
                  <Link
                    href={club.nyeHref}
                    prefetch={false}
                    className="inline-flex min-h-[42px] items-center justify-center border border-[#EAE3D5]/45 bg-[#050505] px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#F6F1E7] hover:border-[#EAE3D5]"
                  >
                    {copy.openNyeSheetLabel}
                  </Link>
                  <a
                    href={club.waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[42px] items-center justify-center gap-1 bg-[#25D366] px-3 py-2 text-xs font-extrabold uppercase tracking-wider text-[#050505] hover:bg-[#2EE472]"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 3. Dedicated Capodanno 2027 Showcase (All 6 NYE Galas) */}
        <section
          id="capodanno-2027-bg-bs"
          className="scroll-mt-24 space-y-8 border border-[#EAE3D5]/25 bg-[#141311] p-6 sm:p-10"
          data-no-lightbox="true"
        >
          <div className="max-w-4xl space-y-2">
            <span className="inline-block bg-[#EAE3D5] px-3 py-1 font-mono text-xs font-extrabold uppercase tracking-wider text-[#050505]">
              31.12.2026 · CAPODANNO 2027
            </span>
            <h2 className="font-serif text-3xl font-normal text-[#F6F1E7] sm:text-4xl">
              {copy.nyeHeading}
            </h2>
            <p className="font-sans text-base text-[#C2B9AA]">{copy.nyeSubtitle}</p>
          </div>

          <HumanEventCarousel locale={locale} ariaLabel={copy.nyeHeading}>
            {nyeCards.map((nye) => (
              <article
                key={nye.id}
                data-no-lightbox="true"
                className="flex flex-col justify-between overflow-hidden border border-white/15 bg-[#050505]"
              >
                <div>
                  <Link href={nye.href} prefetch={false} className="block">
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#050505]">
                      <Image
                        src={nye.posterSrc}
                        alt={nye.title}
                        width={1080}
                        height={1350}
                        quality={92}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </Link>
                  <div className="space-y-2 p-5">
                    <div className="flex items-center justify-between gap-2 font-mono text-xs text-[#EAE3D5]">
                      <span>{nye.whenLabel}</span>
                      <span>
                        {nye.city} ({nye.province})
                      </span>
                    </div>
                    <h3 className="font-serif text-xl text-[#F6F1E7]">
                      <Link href={nye.href} prefetch={false} className="hover:text-[#EAE3D5]">
                        {nye.title}
                      </Link>
                    </h3>
                    <p className="font-sans text-xs text-[#C2B9AA]">{nye.genresLabel}</p>
                    <p className="font-mono text-xs font-semibold text-[#EAE3D5]">
                      {copy.uponRequestBadge}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 border-t border-white/10 p-5 pt-3">
                  <Link
                    href={nye.href}
                    prefetch={false}
                    className="inline-flex min-h-[42px] items-center justify-center gap-1 bg-[#EAE3D5] px-3 py-2 text-xs font-extrabold uppercase tracking-wider text-[#050505] hover:bg-white"
                  >
                    <span>{copy.explorerLabels.openEventCta}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <a
                    href={nye.waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[42px] items-center justify-center gap-1 bg-[#25D366] px-3 py-2 text-xs font-extrabold uppercase tracking-wider text-[#050505] hover:bg-[#2EE472]"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </article>
            ))}
          </HumanEventCarousel>
        </section>

        {/* 4. A4 Motorway Comparison Matrix */}
        <section id="tabella-autostrada-a4" className="scroll-mt-24 space-y-6">
          <div className="max-w-4xl space-y-2">
            <h2 className="font-serif text-3xl font-normal text-[#F6F1E7] sm:text-4xl">
              {copy.matrixHeading}
            </h2>
            <p className="font-sans text-base text-[#C2B9AA]">{copy.matrixSubtitle}</p>
          </div>

          <div className="overflow-x-auto border border-white/15 bg-[#141311]">
            <table className="w-full min-w-[920px] border-collapse text-left font-sans text-sm">
              <thead>
                <tr className="border-b border-white/20 bg-[#050505] font-mono text-xs uppercase tracking-wider text-[#EAE3D5]">
                  <th className="p-4">{copy.matrixHeaders.club}</th>
                  <th className="p-4">{copy.matrixHeaders.city}</th>
                  <th className="p-4">{copy.matrixHeaders.exit}</th>
                  <th className="p-4">{copy.matrixHeaders.minutes}</th>
                  <th className="p-4">{copy.matrixHeaders.target}</th>
                  <th className="p-4">{copy.matrixHeaders.format}</th>
                  <th className="p-4">{copy.matrixHeaders.nights}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {copy.corridorRows.map((row) => (
                  <tr key={row.clubName} className="hover:bg-white/[0.02]">
                    <td className="p-4 font-serif text-base font-semibold text-[#F6F1E7]">
                      {row.clubName}
                    </td>
                    <td className="p-4 text-[#EAE3D5]">
                      <div>{row.cityProvince}</div>
                      <div className="font-mono text-xs text-[#C2B9AA]">{row.address}</div>
                    </td>
                    <td className="p-4 text-[#C2B9AA]">{row.highwayExit}</td>
                    <td className="p-4 font-mono font-bold text-[#EAE3D5]">
                      {row.driveFromMilan}
                    </td>
                    <td className="p-4 font-mono text-xs text-[#EAE3D5]">{row.targetAge}</td>
                    <td className="p-4 text-[#C2B9AA]">{row.musicAndFormat}</td>
                    <td className="p-4 text-xs text-[#EAE3D5]">{row.activeNightsSummary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. In-Depth Editorial Guide (>= 1,800 words, 4 unique 16:9 Flow Venue Photos) */}
        <section id="guida-editoriale-a4" className="scroll-mt-24 space-y-14">
          <div className="max-w-4xl space-y-2 border-b border-white/15 pb-6">
            <h2 className="font-serif text-3xl font-normal text-[#F6F1E7] sm:text-4xl">
              {copy.guideMainHeading}
            </h2>
            <p className="font-sans text-base text-[#C2B9AA]">{copy.guideMainSubtitle}</p>
          </div>

          {copy.chapters.map((ch) => (
            <article
              key={ch.id}
              id={ch.id}
              className="grid grid-cols-1 items-start gap-8 border-b border-white/10 pb-12 lg:grid-cols-12"
            >
              <div className="space-y-5 lg:col-span-7">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#EAE3D5]">
                  {ch.eyebrow}
                </p>
                <h2 className="font-serif text-2xl text-[#F6F1E7] sm:text-3xl">{ch.h2}</h2>

                <h3 className="font-serif text-xl text-[#EAE3D5]">{ch.h3a}</h3>
                <div className="space-y-3.5 font-sans text-base leading-relaxed text-[#C2B9AA]">
                  {ch.paragraphsA.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <h3 className="pt-2 font-serif text-xl text-[#EAE3D5]">{ch.h3b}</h3>
                <div className="space-y-3.5 font-sans text-base leading-relaxed text-[#C2B9AA]">
                  {ch.paragraphsB.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

              <figure
                className="overflow-hidden border border-white/15 bg-[#141311] lg:col-span-5"
                data-no-lightbox="true"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#050505]">
                  <Image
                    src={ch.imageSrc}
                    alt={ch.imageAlt}
                    title={ch.h2}
                    width={1920}
                    height={1080}
                    quality={92}
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="p-4 font-sans text-xs leading-relaxed text-[#C2B9AA]">
                  {ch.imageCaption}
                </figcaption>
              </figure>
            </article>
          ))}
        </section>

        {/* 6. Interactive Corridor Map & 10 Structured FAQs */}
        <section id="mappa-e-faq" className="scroll-mt-24 space-y-12">
          <div className="space-y-4">
            <h2 className="font-serif text-3xl font-normal text-[#F6F1E7] sm:text-4xl">
              {copy.mapHeading}
            </h2>
            <p className="font-sans text-base text-[#C2B9AA]">{copy.mapSubtitle}</p>
            <EventVenueMap
              id="bergamo-brescia-corridor-map"
              purpose="city"
              mapUrl={corridorMapUrl}
              labels={{
                loadMap: mapCopy.loadMap,
                mapTitle: 'Bergamo, Franciacorta & Brescia Nightlife Corridor (A4)',
                privacyLoadNotice: mapCopy.privacyLoadNotice,
              }}
            />
          </div>

          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-normal text-[#F6F1E7] sm:text-4xl">
              {copy.faqHeading}
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {copy.faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="space-y-2 border border-white/15 bg-[#141311] p-5"
                >
                  <h3 className="flex items-start gap-2 font-serif text-lg text-[#F6F1E7]">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#EAE3D5]" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-[#C2B9AA]">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <EditorialPageSections locale={locale} path={hubPath} />
    </main>
  );
}
