import { notFound } from 'next/navigation';
import { tr } from '@/lib/i18n/t';
import { getLocaleDef, hreflangAlternates, localePrefix, indexedLocaleCodes } from '@/lib/i18n/locales';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { GUIDE_HERO_IMAGES_114, GUIDE_INLINE_IMAGES_114 } from '@/lib/guideImagesMap114';
import { getLocalizedGuideSlug35 } from '@/lib/guides100Catalog';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import { getGuideBySlug, getVenues, mockGuides } from '@/lib/data';
import { getLocalizedText } from '@/lib/seo';
import { ArrowLeft, Calendar, User, MapPin, MessageCircle, Sparkles, BookOpen } from 'lucide-react';
import GuideToc from '@/components/GuideToc';
import GuideShareButtons from '@/components/GuideShareButtons';
import { seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { VipQuoteCalculator } from '@/components/NightlifeExpansionModules';
import EditorialPageSections from '@/components/EditorialPageSections';
import { getGuideUiLabels35 } from '@/lib/i18n/flagshipGuides35';
import type { LocaleCode } from '@/lib/i18n/locales';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import TasteMotionLayer from '@/components/TasteMotionLayer';
import TasteHeroCrossfade from '@/components/TasteHeroCrossfade';
import TastePillarExplorer from '@/components/TastePillarExplorer';
import { getPillarDisplayHeadline } from '@/lib/guidesGscPillar20261120';
import { buildTasteExplorerData } from '@/lib/tasteExplorerData';

// ISR Configuration (1 hour)
export const revalidate = 3600;

const GUIDE_HERO_IMAGES: Record<string, string> = GUIDE_HERO_IMAGES_114;
const GUIDE_INLINE_IMAGES: Record<string, string[]> = GUIDE_INLINE_IMAGES_114;
const _LEGACY_GUIDE_HERO_IMAGES: Record<string, string> = {
  'g-dress-code': '/images/pillars/guide-hero-01.webp', 'g-vip': '/images/pillars/guide-hero-01.webp',
  'g-secret-bars': '/images/pillars/guide-hero-02.webp', 'g-1': '/images/pillars/guide-hero-02.webp',
  'g-vip-tables': '/images/pillars/guide-hero-03.webp', 'g-2': '/images/pillars/guide-hero-03.webp',
  'g-dj-interview': '/images/pillars/guide-hero-04.webp', 'g-3': '/images/pillars/guide-hero-04.webp',
  'g-techno-2026': '/images/pillars/guide-hero-05.webp', 'g-4': '/images/pillars/guide-hero-05.webp',
  'g-vip-bottle-prices': '/images/pillars/guide-hero-06.webp', 'g-5': '/images/pillars/guide-hero-06.webp',
  'g-weekly-calendar': '/images/pillars/guide-hero-07.webp', 'g-6': '/images/pillars/guide-hero-07.webp',
  'g-rooftops-milan': '/images/pillars/guide-hero-08.webp', 'g-7': '/images/pillars/guide-hero-08.webp',
  'g-private-parties': '/images/pillars/guide-hero-09.webp', 'g-8': '/images/pillars/guide-hero-09.webp',
  'g-mfw-fuorisalone-f1': '/images/pillars/guide-hero-10.webp', 'g-9': '/images/pillars/guide-hero-10.webp',
  'g-san-siro-football-afterparties': '/images/pillars/guide-hero-11.webp', 'g-10': '/images/pillars/guide-hero-11.webp',
  'g-new-years-eve-2027': '/images/pillars/guide-hero-12.webp', 'g-11': '/images/pillars/guide-hero-12.webp',
  'g-concert-afterparties-milan': '/images/pillars/guide-hero-13.webp', 'g-12': '/images/pillars/guide-hero-13.webp',
  'g-bachelor-bachelorette-vip-milan': '/images/pillars/guide-hero-14.webp', 'g-13': '/images/pillars/guide-hero-14.webp',
};

const _LEGACY_GUIDE_INLINE_IMAGES: Record<string, string[]> = {
  'g-dress-code': ['/images/pillars/guide-inline-01-a.webp', '/images/pillars/guide-inline-01-b.webp', '/images/pillars/guide-inline-01-c.webp', '/images/pillars/guide-inline-01-d.webp'], 'g-vip': ['/images/pillars/guide-inline-01-a.webp', '/images/pillars/guide-inline-01-b.webp', '/images/pillars/guide-inline-01-c.webp', '/images/pillars/guide-inline-01-d.webp'],
  'g-secret-bars': ['/images/pillars/guide-inline-02-a.webp', '/images/pillars/guide-inline-02-b.webp', '/images/pillars/guide-inline-02-c.webp', '/images/pillars/guide-inline-02-d.webp'], 'g-1': ['/images/pillars/guide-inline-02-a.webp', '/images/pillars/guide-inline-02-b.webp', '/images/pillars/guide-inline-02-c.webp', '/images/pillars/guide-inline-02-d.webp'],
  'g-vip-tables': ['/images/pillars/guide-inline-03-a.webp', '/images/pillars/guide-inline-03-b.webp', '/images/pillars/guide-inline-03-c.webp', '/images/pillars/guide-inline-03-d.webp'], 'g-2': ['/images/pillars/guide-inline-03-a.webp', '/images/pillars/guide-inline-03-b.webp', '/images/pillars/guide-inline-03-c.webp', '/images/pillars/guide-inline-03-d.webp'],
  'g-dj-interview': ['/images/pillars/guide-inline-04-a.webp', '/images/pillars/guide-inline-04-b.webp', '/images/pillars/guide-inline-04-c.webp', '/images/pillars/guide-inline-04-d.webp'], 'g-3': ['/images/pillars/guide-inline-04-a.webp', '/images/pillars/guide-inline-04-b.webp', '/images/pillars/guide-inline-04-c.webp', '/images/pillars/guide-inline-04-d.webp'],
  'g-techno-2026': ['/images/pillars/guide-inline-05-a.webp', '/images/pillars/guide-inline-05-b.webp', '/images/pillars/guide-inline-05-c.webp', '/images/pillars/guide-inline-05-d.webp'], 'g-4': ['/images/pillars/guide-inline-05-a.webp', '/images/pillars/guide-inline-05-b.webp', '/images/pillars/guide-inline-05-c.webp', '/images/pillars/guide-inline-05-d.webp'],
  'g-vip-bottle-prices': ['/images/pillars/guide-inline-06-a.webp', '/images/pillars/guide-inline-06-b.webp', '/images/pillars/guide-inline-06-c.webp', '/images/pillars/guide-inline-06-d.webp'], 'g-5': ['/images/pillars/guide-inline-06-a.webp', '/images/pillars/guide-inline-06-b.webp', '/images/pillars/guide-inline-06-c.webp', '/images/pillars/guide-inline-06-d.webp'],
  'g-weekly-calendar': ['/images/pillars/guide-inline-07-a.webp', '/images/pillars/guide-inline-07-b.webp', '/images/pillars/guide-inline-07-c.webp', '/images/pillars/guide-inline-07-d.webp'], 'g-6': ['/images/pillars/guide-inline-07-a.webp', '/images/pillars/guide-inline-07-b.webp', '/images/pillars/guide-inline-07-c.webp', '/images/pillars/guide-inline-07-d.webp'],
  'g-rooftops-milan': ['/images/pillars/guide-inline-08-a.webp', '/images/pillars/guide-inline-08-b.webp', '/images/pillars/guide-inline-08-c.webp', '/images/pillars/guide-inline-08-d.webp'], 'g-7': ['/images/pillars/guide-inline-08-a.webp', '/images/pillars/guide-inline-08-b.webp', '/images/pillars/guide-inline-08-c.webp', '/images/pillars/guide-inline-08-d.webp'],
  'g-private-parties': ['/images/pillars/guide-inline-09-a.webp', '/images/pillars/guide-inline-09-b.webp', '/images/pillars/guide-inline-09-c.webp', '/images/pillars/guide-inline-09-d.webp'], 'g-8': ['/images/pillars/guide-inline-09-a.webp', '/images/pillars/guide-inline-09-b.webp', '/images/pillars/guide-inline-09-c.webp', '/images/pillars/guide-inline-09-d.webp'],
  'g-mfw-fuorisalone-f1': ['/images/pillars/guide-inline-10-a.webp', '/images/pillars/guide-inline-10-b.webp', '/images/pillars/guide-inline-10-c.webp', '/images/pillars/guide-inline-10-d.webp'], 'g-9': ['/images/pillars/guide-inline-10-a.webp', '/images/pillars/guide-inline-10-b.webp', '/images/pillars/guide-inline-10-c.webp', '/images/pillars/guide-inline-10-d.webp'],
  'g-san-siro-football-afterparties': ['/images/pillars/guide-inline-11-a.webp', '/images/pillars/guide-inline-11-b.webp', '/images/pillars/guide-inline-11-c.webp', '/images/pillars/guide-inline-11-d.webp'], 'g-10': ['/images/pillars/guide-inline-11-a.webp', '/images/pillars/guide-inline-11-b.webp', '/images/pillars/guide-inline-11-c.webp', '/images/pillars/guide-inline-11-d.webp'],
  'g-new-years-eve-2027': ['/images/pillars/guide-inline-12-a.webp', '/images/pillars/guide-inline-12-b.webp', '/images/pillars/guide-inline-12-c.webp', '/images/pillars/guide-inline-12-d.webp'], 'g-11': ['/images/pillars/guide-inline-12-a.webp', '/images/pillars/guide-inline-12-b.webp', '/images/pillars/guide-inline-12-c.webp', '/images/pillars/guide-inline-12-d.webp'],
  'g-concert-afterparties-milan': ['/images/pillars/guide-inline-13-a.webp', '/images/pillars/guide-inline-13-b.webp', '/images/pillars/guide-inline-13-c.webp', '/images/pillars/guide-inline-13-d.webp'], 'g-12': ['/images/pillars/guide-inline-13-a.webp', '/images/pillars/guide-inline-13-b.webp', '/images/pillars/guide-inline-13-c.webp', '/images/pillars/guide-inline-13-d.webp'],
  'g-bachelor-bachelorette-vip-milan': ['/images/pillars/guide-inline-14-a.webp', '/images/pillars/guide-inline-14-b.webp', '/images/pillars/guide-inline-14-c.webp', '/images/pillars/guide-inline-14-d.webp'], 'g-13': ['/images/pillars/guide-inline-14-a.webp', '/images/pillars/guide-inline-14-b.webp', '/images/pillars/guide-inline-14-c.webp', '/images/pillars/guide-inline-14-d.webp'],
};


type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

// Generate Static Params for SEO Crawling
export async function generateStaticParams() {
  const paths: { locale: string; slug: string }[] = [];

  mockGuides.forEach((guide) => {
    paths.push({ locale: 'en', slug: guide.slugs.en });
    paths.push({
      locale: 'it',
      slug: guide.slugs.it || guide.slugs.en,
    });
  });

  return paths;
}

// Generate Dynamic SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = getGuideBySlug(slug, locale);

  if (!guide) return notFound();

  const rawTitle = getLocalizedText(guide.title, locale).replace(/\u2014/g, ' - ');
  const title = seoTitle(`${rawTitle} | Nightlife Milan`);
  const description = withWhatsApp(getLocalizedText(guide.excerpt, locale).replace(/\u2014/g, ' - '), locale);

  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';

  const enSlug = guide.slugs.en;
  const itSlug = guide.slugs.it || enSlug;

  const currentSlug = getLocalizedGuideSlug35(guide, (locale as LocaleCode) || 'en');
  const path = `${localePrefix(locale)}/${getLocalizedDir35('guides', locale)}/${currentSlug}`;
  const canonical = `${baseUrl}${path}`;
  const langAlternates: Record<string, string> = {
    'x-default': `${baseUrl}/${getLocalizedDir35('guides', 'en')}/${getLocalizedGuideSlug35(guide, 'en')}`,
  };
  for (const loc of indexedLocaleCodes) {
    langAlternates[getLocaleDef(loc)!.hreflang] = `${baseUrl}${localePrefix(loc)}/${getLocalizedDir35('guides', loc)}/${getLocalizedGuideSlug35(guide, loc)}`;
  }

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: langAlternates,
    },
    robots:
      getLocaleDef(locale)?.indexed === false
        ? { index: false, follow: true }
        : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [
        {
          url: guide.image ? `${baseUrl}${GUIDE_HERO_IMAGES[guide.id] || guide.image}` : `${baseUrl}/images/guides-hero.webp`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'article',
      siteName: 'Nightlife Milan',
      locale: getLocaleDef(locale)?.ogLocale || 'en_US',
      publishedTime: guide.datePublished,
      modifiedTime: guide.dateModified,
      authors: [guide.author],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [guide.image ? `${baseUrl}${GUIDE_HERO_IMAGES[guide.id] || guide.image}` : `${baseUrl}/images/guides-hero.webp`],
      site: '@nightlifemilan',
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { locale, slug } = await params;
  const loc = (locale as LocaleCode) || 'en';
  const isIt = loc === 'it';
  const guide = getGuideBySlug(slug, loc);

  if (!guide) return notFound();

  const ui = getGuideUiLabels35(loc);
  const title = getLocalizedText(guide.title, loc).replace(/\u2014/g, ' - ');
  const excerpt = getLocalizedText(guide.excerpt, loc).replace(/\u2014/g, ' - ');

  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const langPrefix = localePrefix(loc);
  const currentSlug = getLocalizedGuideSlug35(guide, loc);
  const guideUrl = `${baseUrl}${langPrefix}/${getLocalizedDir35('guides', loc)}/${currentSlug}`;
  const effectiveModified = guide.dateModified || '2026-11-13';

  const t = {
    back: ui.guides,
    toc: ui.tocHeading,
    relatedVenues: ui.recommendedVenues,
    proTip: ui.verifiedTitle,
    faq: ui.faqHeading,
    otherGuides: ui.allGuidesCta,
  };

  // Format date in user's locale
  const dateObj = new Date(effectiveModified || guide.datePublished);
  let formattedDate = effectiveModified;
  try {
    formattedDate = new Intl.DateTimeFormat(getLocaleDef(loc)?.hreflang || 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Europe/Rome',
    }).format(dateObj);
  } catch {
    formattedDate = effectiveModified;
  }

  // Extract sections for TOC (strip any raw markdown ## prefix)
  const tocSections = guide.sections.map((s) => ({
    id: s.id,
    title: getLocalizedText(s.heading, loc).replace(/^#+\s*/, '').replace(/\u2014/g, ' - '),
  }));

  // Priority Top 6 venues ordered by priorityScore (1. Just Me, 2. Pineta, 3. Aria, 4. 55 Milano, 5. Voya Rooftop, 6. Repvblic)
  const relatedVenues = getVenues().slice(0, 6);

  // Other guides for cross-linking
  const otherGuides = mockGuides.filter((g) => g.id !== guide.id).slice(0, 4);

  // Generate Article JSON-LD Schema with E-E-A-T ContactPoint & NightClub mentions
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    inLanguage: getLocaleDef(loc)?.hreflang || loc,
    headline: title,
    image: guide.image
      ? [guide.image.startsWith('http') ? guide.image : `${baseUrl}${GUIDE_HERO_IMAGES[guide.id] || guide.image}`]
      : [],
    datePublished: guide.datePublished,
    dateModified: effectiveModified,
    author: [
      {
        '@type': 'Organization',
        name: guide.author || 'Nightlife Milan Concierge Editorial Desk',
        url: baseUrl,
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: 'Nightlife Milan',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/milan-nightclub-luxury-vip-champagne.webp`,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+39-351-912-7047',
        contactType: 'customer support',
        areaServed: 'IT',
      },
    },
    mentions: relatedVenues.map((v) => ({
      '@type': 'NightClub',
      '@id': `${baseUrl}${langPrefix}/${getLocalizedDir35('clubs', loc)}/${getLocalizedText(v.slugs, loc)}#nightclub`,
      name: getLocalizedText(v.localizedContent.name, loc),
      url: `${baseUrl}${langPrefix}/${getLocalizedDir35('clubs', loc)}/${getLocalizedText(v.slugs, loc)}`,
    })),
    description: excerpt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': guideUrl,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: ui.home,
        item: `${baseUrl}${langPrefix || '/'}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: ui.guides,
        item: `${baseUrl}${langPrefix}/${getLocalizedDir35('guides', loc)}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: guideUrl,
      },
    ],
  };

  // Generate FAQPage JSON-LD Schema if FAQs exist
  let faqSchema = null;
  if (guide.faqs && guide.faqs.length > 0) {
    faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: guide.faqs.map((faq) => ({
        '@type': 'Question',
        name: getLocalizedText(faq.question, loc).replace(/\u2014/g, ' - '),
        acceptedAnswer: {
          '@type': 'Answer',
          text: getLocalizedText(faq.answer, loc).replace(/\u2014/g, ' - '),
        },
      })),
    };
  }

  const waUrl = getConciergeBookingUrl(loc, title, guideUrl);
  const isTastePillar = guide.id === 'g-117' || guide.id === 'g-118';

  if (isTastePillar) {
    const heroImg = GUIDE_HERO_IMAGES[guide.id] || guide.image || '/images/guides-hero.webp';
    const inlineGallery = GUIDE_INLINE_IMAGES[guide.id] || [];
    const crossfadeImgs = Array.from(new Set([heroImg, ...inlineGallery]));
    const tasteHeadline = getPillarDisplayHeadline(guide.id as 'g-117' | 'g-118', loc);
    const explorerData = buildTasteExplorerData(
      guide.id === 'g-117' ? 'terme' : 'clubbing',
      loc,
      guideUrl,
    );
    const leadRate = explorerData.items[0]?.rate || '';
    const leadRateShort = leadRate.includes('·') ? leadRate.split('·')[0].trim() : leadRate;
    const leadVenue = explorerData.items[0]?.name || '';
    const deskAltLabel = explorerData.items[0]?.primaryLabel || t.toc;

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        )}

        <main className="taste-pillar-root flex-1 bg-[#050505] text-[#F6F1E7] w-full">
          <TasteMotionLayer />

          {/* 1. Editorial Hero — Two Prints in Darkness (#050505) */}
          <section className="bg-[#050505] text-[#F6F1E7] pt-8 sm:pt-12 pb-16 sm:pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-3 text-[14px] text-[#C2B9AA]">
                <Link
                  href={`${langPrefix}/guides`}
                  className="inline-flex items-center gap-2 text-[#EAE3D5] hover:text-[#25D366] transition-colors font-semibold min-h-[44px]"
                >
                  <ArrowLeft className="w-4 h-4 shrink-0" />
                  <span>{t.back}</span>
                </Link>
                <span aria-hidden="true">/</span>
                <span>{ui.officialBadge}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{formattedDate}</span>
              </nav>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
                <div className="lg:col-span-7" data-taste-reveal>
                  <h1 className="font-display font-extrabold text-[#F6F1E7] m-0 mb-5">
                    {tasteHeadline}
                  </h1>
                  <p className="text-lg sm:text-xl font-semibold text-[#EAE3D5] leading-snug mb-3 max-w-2xl">
                    {title}
                  </p>
                  <p className="text-base text-[#C2B9AA] leading-relaxed mb-8 max-w-xl">
                    {excerpt}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="taste-btn-primary"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" />
                      <span>{ui.whatsappCta}</span>
                    </a>
                    <a href="#explorer" className="taste-btn-outline-light">
                      <span>{explorerData.allLabel}</span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <TasteHeroCrossfade
                    images={crossfadeImgs}
                    altPrimary={title}
                    altSecondary={tocSections[0]?.title || title}
                    title={title}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 2. Warm Ivory Editorial Brief, Verified Metrics & Architectural TOC (#F6F1E7) */}
          <section className="bg-[#F6F1E7] text-[#050505] py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-8 mb-8" data-taste-stagger>
                <div>
                  <p className="text-lg sm:text-xl font-bold text-[#050505] tabular-nums m-0">{explorerData.items.length}</p>
                  <p className="text-[14px] text-[#3B362E] mt-1 m-0">{explorerData.colVenue}</p>
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-bold text-[#050505] tabular-nums m-0">{leadRateShort}</p>
                  <p className="text-[14px] text-[#3B362E] mt-1 m-0">{leadVenue}</p>
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-bold text-[#050505] tabular-nums m-0">{formattedDate}</p>
                  <p className="text-[14px] text-[#3B362E] mt-1 m-0">{guide.author}</p>
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-bold text-[#050505] tabular-nums m-0">{ui.directDesk}</p>
                  <p className="text-[14px] text-[#3B362E] mt-1 m-0">WhatsApp +39 351 912 7047</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-4 flex flex-col gap-4" data-taste-reveal>
                  <h2 className="font-display font-bold text-[#050505] m-0">{t.toc}</h2>
                  <p className="text-[15px] text-[#3B362E] leading-relaxed m-0">
                    {ui.bookDesc}
                  </p>
                  <GuideShareButtons url={guideUrl} title={title} variant="light" />
                </div>

                <nav aria-label={t.toc} className="lg:col-span-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" data-taste-stagger>
                    <a
                      href="#explorer"
                      className="flex items-center justify-between gap-4 bg-[#EAE3D5] hover:bg-[#050505] hover:text-[#F6F1E7] text-[#050505] px-5 py-4 text-[15px] font-semibold transition-colors"
                    >
                      <span>{explorerData.heading}</span>
                      <span aria-hidden="true">→</span>
                    </a>
                    {tocSections.map((sec) => (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        className="flex items-center justify-between gap-4 bg-[#EAE3D5] hover:bg-[#050505] hover:text-[#F6F1E7] text-[#050505] px-5 py-4 text-[15px] font-medium transition-colors"
                      >
                        <span>{sec.title}</span>
                        <span aria-hidden="true">→</span>
                      </a>
                    ))}
                    {guide.faqs && guide.faqs.length > 0 && (
                      <a
                        href="#faq-guide"
                        className="flex items-center justify-between gap-4 bg-[#EAE3D5] hover:bg-[#050505] hover:text-[#F6F1E7] text-[#050505] px-5 py-4 text-[15px] font-semibold transition-colors"
                      >
                        <span>{t.faq}</span>
                        <span aria-hidden="true">→</span>
                      </a>
                    )}
                  </div>
                </nav>
              </div>
            </div>
          </section>

          {/* 3. Uneven Photo Gallery Strip (#050505 — Lightbox Enabled) */}
          {inlineGallery.length >= 2 && (
            <section id="gallery" aria-label={title} className="bg-[#050505] py-8 sm:py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="taste-uneven-strip" data-taste-stagger>
                  {inlineGallery.slice(0, 4).map((src, idx) => (
                    <figure key={src} className="taste-uneven-panel">
                      <Image
                        src={src}
                        alt={tocSections[idx]?.title || `${title} - ${idx + 1}`}
                        title={tocSections[idx]?.title || `${title} - ${idx + 1}`}
                        fill
                        unoptimized
                        quality={92}
                        sizes="(max-width: 1024px) 50vw, 40vw"
                        className="object-cover brightness-[0.88] hover:brightness-100 transition-[filter] duration-500"
                      />
                    </figure>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* 4. Interactive Partner & Thermal Directory ("One Live Thing" #050505) */}
          <TastePillarExplorer data={explorerData} locale={loc} />

          {/* 5. Six Alternating Chapters (#F6F1E7 / #050505) with Varied Editorial Grids */}
          {guide.sections.map((section, index) => {
            const secHeading = getLocalizedText(section.heading, loc).replace(/^#+\s*/, '').replace(/\u2014/g, ' - ');
            const secContent = getLocalizedText(section.content, loc).replace(/\u2014/g, ' - ');
            const isLight = index % 2 === 0;
            const secPhoto = inlineGallery[index % Math.max(1, inlineGallery.length)] || heroImg;

            return (
              <section
                key={section.id}
                id={section.id}
                className={`scroll-mt-24 py-16 sm:py-24 ${
                  isLight ? 'bg-[#F6F1E7] text-[#050505]' : 'bg-[#050505] text-[#F6F1E7]'
                }`}
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {index === 0 ? (
                    <div className="space-y-8" data-taste-reveal>
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                        <div className="lg:col-span-8">
                          <h2 className="font-display font-bold text-[#050505] m-0">{secHeading}</h2>
                        </div>
                        <div className="lg:col-span-4 lg:text-right">
                          <a
                            href="#explorer"
                            className="taste-btn-dark"
                          >
                            <span>{explorerData.allLabel}</span>
                          </a>
                        </div>
                      </div>
                      <div
                        className="taste-prose-light [&_strong]:font-bold [&_strong]:text-[#050505]"
                        dangerouslySetInnerHTML={{ __html: secContent }}
                      />
                    </div>
                  ) : index === 1 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                      <div className="lg:col-span-7" data-taste-reveal>
                        <h2 className="font-display font-bold text-[#F6F1E7] mb-6">{secHeading}</h2>
                        <div
                          className="taste-prose-dark [&_strong]:font-bold [&_strong]:text-[#F6F1E7]"
                          dangerouslySetInnerHTML={{ __html: secContent }}
                        />
                      </div>
                      <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6" data-taste-reveal>
                        <figure className="relative aspect-[3/4] w-full overflow-clip bg-[#0B0A09]">
                          <Image
                            src={secPhoto}
                            alt={`${secHeading} - ${title}`}
                            title={secHeading}
                            fill
                            unoptimized
                            quality={92}
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            className="object-cover taste-drift-img"
                          />
                        </figure>
                        <div className="bg-[#141311] p-6" data-no-lightbox="true">
                          <h3 className="font-display text-xl font-bold text-[#F6F1E7] mb-2">
                            {ui.bookHeading}
                          </h3>
                          <p className="text-[15px] text-[#C2B9AA] leading-relaxed mb-5">
                            {ui.bookDesc}
                          </p>
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="taste-btn-primary w-full"
                          >
                            <MessageCircle className="w-4 h-4 shrink-0" />
                            <span>{ui.whatsappCta}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : index === 3 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                      <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6" data-taste-reveal>
                        <h2 className="font-display font-bold text-[#F6F1E7] m-0">{secHeading}</h2>
                        <div className="bg-[#141311] p-6" data-no-lightbox="true">
                          <h3 className="font-display text-lg font-bold text-[#F6F1E7] mb-2">
                            {ui.directDesk}
                          </h3>
                          <p className="text-[15px] text-[#C2B9AA] leading-relaxed mb-5">
                            {deskAltLabel} · WhatsApp +39 351 912 7047
                          </p>
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="taste-btn-primary w-full"
                          >
                            <MessageCircle className="w-4 h-4 shrink-0" />
                            <span>{ui.whatsappCta}</span>
                          </a>
                        </div>
                      </div>
                      <div className="lg:col-span-8" data-taste-reveal>
                        <div
                          className="taste-prose-dark [&_strong]:font-bold [&_strong]:text-[#F6F1E7]"
                          dangerouslySetInnerHTML={{ __html: secContent }}
                        />
                      </div>
                    </div>
                  ) : index === 5 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                      <div className="lg:col-span-7" data-taste-reveal>
                        <h2 className="font-display font-bold text-[#F6F1E7] mb-6">{secHeading}</h2>
                        <div
                          className="taste-prose-dark [&_strong]:font-bold [&_strong]:text-[#F6F1E7]"
                          dangerouslySetInnerHTML={{ __html: secContent }}
                        />
                      </div>
                      <aside className="lg:col-span-5 lg:sticky lg:top-24 bg-[#141311] p-6 sm:p-8" data-no-lightbox="true">
                        <h3 className="font-display text-xl font-bold text-[#F6F1E7] mb-5" data-taste-reveal>
                          {t.relatedVenues}
                        </h3>
                        <div className="flex flex-col gap-[2px] bg-[#050505]" data-taste-stagger>
                          {relatedVenues.map((venue, idx) => {
                            const venueName = getLocalizedText(venue.localizedContent.name, loc);
                            const venueSlug = getLocalizedText(venue.slugs, loc);
                            const venueHref = `${langPrefix}/clubs/${venueSlug}`;
                            return (
                              <Link
                                key={venue.id}
                                href={venueHref}
                                className="flex items-center justify-between gap-4 bg-[#0B0A09] hover:bg-[#1F1C18] px-4 py-3.5 transition-colors"
                              >
                                <div className="min-w-0">
                                  <div className="text-[15px] font-semibold text-[#F6F1E7] truncate">
                                    {idx + 1}. {venueName}
                                  </div>
                                  <div className="text-[14px] text-[#C2B9AA] flex items-center gap-1.5 mt-0.5">
                                    <MapPin className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                                    <span>{venue.zone.replace(/_/g, ' ')}</span>
                                  </div>
                                </div>
                                <span className="text-[14px] text-[#25D366] font-semibold shrink-0" aria-hidden="true">→</span>
                              </Link>
                            );
                          })}
                        </div>
                      </aside>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start" data-taste-reveal>
                      <div className="lg:col-span-4 lg:sticky lg:top-24">
                        <h2 className="font-display font-bold text-[#050505] mb-4">{secHeading}</h2>
                        <figure className="relative aspect-[4/3] w-full overflow-clip bg-[#EAE3D5] mt-6">
                          <Image
                            src={secPhoto}
                            alt={`${secHeading} - ${title}`}
                            title={secHeading}
                            fill
                            unoptimized
                            quality={92}
                            sizes="(max-width: 1024px) 100vw, 33vw"
                            className="object-cover"
                          />
                        </figure>
                      </div>
                      <div className="lg:col-span-8">
                        <div
                          className="taste-prose-light [&_strong]:font-bold [&_strong]:text-[#050505]"
                          dangerouslySetInnerHTML={{ __html: secContent }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </section>
            );
          })}

          {/* 6. Split FAQ Accordion (#F6F1E7 Warm Ivory) */}
          {guide.faqs && guide.faqs.length > 0 && (
            <section id="faq-guide" className="scroll-mt-24 bg-[#F6F1E7] text-[#050505] py-16 sm:py-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                  <div className="lg:col-span-7">
                    <h2 className="taste-section-display font-bold text-[#050505] mb-8" data-taste-reveal>
                      {t.faq}
                    </h2>
                    <div className="space-y-3" data-taste-stagger>
                      {guide.faqs.map((faq, i) => (
                        <details
                          key={i}
                          open={i === 0}
                          className="taste-faq-item bg-[#EAE3D5] px-5 sm:px-6"
                        >
                          <summary className="text-base sm:text-lg font-bold text-[#050505]">
                            <span>{getLocalizedText(faq.question, loc).replace(/\u2014/g, ' - ').replace(/\u2605/g, '*')}</span>
                            <span className="taste-faq-plus text-[#050505]" aria-hidden="true" />
                          </summary>
                          <p className="text-[15px] sm:text-base text-[#1F1C18] leading-relaxed pt-2 pb-3 m-0">
                            {getLocalizedText(faq.answer, loc).replace(/\u2014/g, ' - ').replace(/\u2605/g, '*')}
                          </p>
                        </details>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6" data-taste-reveal>
                    <div className="relative pb-8">
                      <figure className="relative ml-auto w-[88%] aspect-[3/4] overflow-clip bg-[#0B0A09]">
                        <Image
                          src={inlineGallery[2] || inlineGallery[0] || heroImg}
                          alt={`${t.faq} - ${title}`}
                          title={title}
                          fill
                          unoptimized
                          quality={92}
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover"
                        />
                      </figure>
                      <figure className="relative -mt-16 w-[38%] aspect-square overflow-clip bg-[#0B0A09]">
                        <Image
                          src={inlineGallery[3] || inlineGallery[1] || heroImg}
                          alt={title}
                          title={title}
                          fill
                          unoptimized
                          quality={92}
                          sizes="(max-width: 640px) 40vw, 22vw"
                          className="object-cover"
                        />
                      </figure>
                    </div>
                    <div className="bg-[#EAE3D5] p-6">
                      <h3 className="font-display text-xl font-bold text-[#050505] mb-2">
                        {ui.bookHeading}
                      </h3>
                      <p className="text-[15px] text-[#3B362E] leading-relaxed mb-5">
                        {ui.bookDesc}
                      </p>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="taste-btn-dark w-full"
                      >
                        <MessageCircle className="w-4 h-4 shrink-0" />
                        <span>{ui.whatsappCta}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 7. VIP Quote Calculator & Flat Editorial Cross-Links (#050505) */}
          <section className="bg-[#050505] text-[#F6F1E7] py-14 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <VipQuoteCalculator locale={loc} />

              <div className="pt-14 mt-14">
                <h2 className="taste-section-display font-bold text-[#F6F1E7] mb-8">
                  {t.otherGuides}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-no-lightbox="true" data-taste-stagger>
                  {otherGuides.map((g) => {
                    const gSlug = getLocalizedGuideSlug35(g, loc);
                    const gTitle = getLocalizedText(g.title, loc).replace(/\u2014/g, ' - ');
                    return (
                      <Link
                        key={g.id}
                        href={`${langPrefix}/guides/${gSlug}`}
                        className="group flex flex-col justify-between p-6 bg-[#0B0A09] hover:bg-[#141311] transition-colors"
                      >
                        <div>
                          <h3 className="font-display text-lg font-bold text-[#F6F1E7] group-hover:text-[#25D366] transition-colors leading-snug mb-3">
                            {gTitle}
                          </h3>
                          <p className="text-[14px] text-[#C2B9AA] line-clamp-3 leading-relaxed">
                            {getLocalizedText(g.excerpt, loc).replace(/\u2014/g, ' - ')}
                          </p>
                        </div>
                        <div className="mt-5 text-[14px] font-semibold text-[#25D366]">
                          {ui.officialBadge}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <EditorialPageSections locale={loc} path={`${langPrefix}/guides/${slug}`} />
        </main>
      </>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <main className="flex-1 bg-[#050505] w-full">
        {/* Hero Article */}
        <section className="relative w-full h-[60vh] min-h-[500px] flex items-end pb-16">
          <div data-hero-backdrop="true" data-no-lightbox="true" className="absolute inset-0 z-0">
            <Image
              src={GUIDE_HERO_IMAGES[guide.id] || guide.image || '/images/guides-hero.webp'}
              alt={title}
              fill
              quality={92}
              sizes="100vw"
              className="object-cover"
              priority
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
          </div>

          <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link
              href={`${langPrefix}/guides`}
              className="inline-flex items-center text-white/50 hover:text-champagne transition-colors mb-8 text-sm uppercase tracking-wider font-semibold"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.back}
            </Link>

            <h1 className="font-serif text-4xl md:text-6xl font-bold text-champagne tracking-tight mb-6 leading-tight">
              {title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/60 uppercase tracking-wider font-semibold">
              <span className="flex items-center">
                <User className="w-4 h-4 mr-2 text-champagne" />
                {guide.author}
              </span>
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-champagne" />
                {formattedDate}
              </span>
              <span className="flex items-center text-champagne">
                <BookOpen className="w-4 h-4 mr-2" />
                {guide.sections.length} · {ui.officialBadge}
              </span>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sticky Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3">
            <GuideToc sections={tocSections} title={t.toc} />
          </aside>

          {/* Reading Experience */}
          <article className="lg:col-span-6 max-w-3xl mx-auto w-full">
            <p className="text-xl text-white/80 leading-relaxed font-light mb-8">{excerpt}</p>

            {/* E-E-A-T & Quick Answer Box */}
            <div className="not-prose mb-8 p-6 rounded-2xl border border-champagne/25 bg-champagne/[0.04] text-left">
              <p className="font-mono text-champagne text-[10px] tracking-[0.3em] uppercase mb-2">
                {ui.verifiedTitle} · {ui.updatedPrefix}: {formattedDate}
              </p>
              <p className="font-sans text-white/80 text-sm leading-relaxed mb-2">
                {ui.verifiedBody}
              </p>
              <p className="font-sans text-white/65 text-xs leading-relaxed">
                {guide.id === 'g-117'
                  ? `${title}: ${excerpt}`
                  : isIt
                    ? `${title}: prezzi ufficiali 2026/2027, regole di selezione per i 6 club di riferimento (Just Me, Pineta, Aria, 55 Milano, Voya Rooftop, Repvblic) e prenotazione diretta via ${ui.whatsappCta}.`
                    : `${title}: Just Me, Pineta, Aria, 55 Milano, Voya Rooftop, Repvblic - ${ui.bookHeading} (${ui.whatsappCta}, concierge@nightlifemilan.com).`}
              </p>
            </div>

            {/* Tags */}
            <div className="not-prose flex flex-wrap gap-2 mb-10">
              {[
                ui.officialBadge,
                'Nightlife Milan',
                ...(guide.relatedGenres || []).map((g) => g.replace(/_/g, ' ')),
                ui.directDesk,
              ]
                .slice(0, 6)
                .map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full border border-white/15 text-white/50 text-xs font-sans tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
            </div>

            {guide.sections.map((section, index) => {
              const secHeading = getLocalizedText(section.heading, loc).replace(/^#+\s*/, '').replace(/\u2014/g, ' - ');
              const secContent = getLocalizedText(section.content, loc).replace(/\u2014/g, ' - ');
              return (
              <div key={section.id} id={section.id} className="scroll-mt-32 mb-12">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-champagne mb-5">
                  {secHeading}
                </h2>
                <div
                  className="text-white/75 leading-relaxed font-light space-y-5 text-base [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_strong]:text-white [&_strong]:font-semibold"
                  dangerouslySetInnerHTML={{ __html: secContent }}
                />
                {GUIDE_INLINE_IMAGES[guide.id]?.[index] && (
                  <div className="my-8 relative h-64 md:h-80 w-full rounded-2xl overflow-hidden border border-white/10">
                    <Image
                      src={GUIDE_INLINE_IMAGES[guide.id][index]}
                      alt={`${secHeading} - ${title}`}
                      title={`${secHeading} - ${title}`}
                      fill
                      quality={92}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                )}

                {index === 0 && (
                  <div className="my-10 p-6 bg-white/[0.03] border border-champagne/30 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-champagne" />
                    <h3 className="text-champagne font-semibold uppercase tracking-wider text-xs mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      {ui.directDesk}
                    </h3>
                    <p className="text-white/75 italic m-0 text-sm leading-relaxed mb-3">
                      {ui.bookDesc}
                    </p>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-champagne hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{ui.whatsappCta}</span>
                    </a>
                  </div>
                )}
              </div>
              );
            })}

            {(GUIDE_INLINE_IMAGES[guide.id] || []).slice(guide.sections.length).length > 0 && (
              <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {(GUIDE_INLINE_IMAGES[guide.id] || []).slice(guide.sections.length).map((extraImg, extraIdx) => (
                  <div key={extraImg} className="relative h-56 md:h-64 w-full rounded-2xl overflow-hidden border border-white/10">
                    <Image src={extraImg} alt={`${title} - ${extraIdx + 1}`} title={`${title} - ${extraIdx + 1}`} fill quality={92} sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
            {/* FAQs if any */}
            {guide.faqs && guide.faqs.length > 0 && (
              <div className="mt-16 pt-12 border-t border-white/10">
                <h2 className="text-3xl font-serif font-bold text-champagne mb-8">{t.faq}</h2>
                <div className="space-y-6">
                  {guide.faqs.map((faq, i) => (
                    <div
                      key={i}
                      className="p-6 rounded-xl border border-white/10 bg-white/[0.02]"
                    >
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {getLocalizedText(faq.question, loc).replace(/\u2014/g, ' - ')}
                      </h3>
                      <p className="text-white/70 leading-relaxed font-light text-sm">
                        {getLocalizedText(faq.answer, loc).replace(/\u2014/g, ' - ')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <GuideShareButtons url={guideUrl} title={title} />
          </article>

          {/* Right Sidebar / Priority 6 Related Venues */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="p-5 rounded-2xl border border-champagne/30 bg-champagne/[0.05]">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-champagne mb-2">
                {ui.directDesk}
              </p>
              <h3 className="font-serif text-xl text-white mb-2">
                {ui.bookHeading}
              </h3>
              <p className="text-xs text-white/65 leading-relaxed mb-4">
                {ui.bookDesc}
              </p>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-champagne text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{ui.whatsappCta}</span>
              </a>
            </div>

            <div>
              <h3 className="text-xs font-mono text-champagne uppercase tracking-[0.2em] mb-4">
                {t.relatedVenues}
              </h3>
              <div className="flex flex-col gap-4">
                {relatedVenues.map((venue, idx) => {
                  const venueName = getLocalizedText(venue.localizedContent.name, loc);
                  const venueSlug = getLocalizedText(venue.slugs, loc);
                  const venueHref = `${langPrefix}/clubs/${venueSlug}`;

                  return (
                    <Link
                      key={venue.id}
                      href={venueHref}
                      className="group flex items-center gap-3.5 p-3 bg-white/[0.03] border border-white/10 rounded-xl hover:border-champagne/50 transition-colors"
                    >
                      <div className="h-12 w-12 rounded-lg bg-champagne/10 border border-champagne/30 flex items-center justify-center shrink-0">
                        <span className="font-serif font-bold text-champagne text-lg">#{idx + 1}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-champagne">
                          #{idx + 1} · {venue.category.replace(/_/g, ' ')}
                        </div>
                        <h4 className="text-white font-serif font-bold text-sm truncate group-hover:text-champagne transition-colors">
                          {venueName}
                        </h4>
                        <p className="text-white/45 text-xs flex items-center mt-0.5">
                          <MapPin className="w-3 h-3 mr-1 text-champagne/70" />
                          {venue.zone.replace(/_/g, ' ')}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>

        {/* Interactive VIP Quote Calculator */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <VipQuoteCalculator locale={loc} />
        </section>

        {/* Cross-Link to Other Pillar Guides */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 border-t border-white/10 pt-14">
          <h2 className="font-serif text-2xl md:text-3xl text-white mb-8">{t.otherGuides}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {otherGuides.map((g) => {
              const gSlug = getLocalizedGuideSlug35(g, loc);
              const gTitle = getLocalizedText(g.title, loc).replace(/\u2014/g, ' - ');
              return (
                <Link
                  key={g.id}
                  href={`${langPrefix}/guides/${gSlug}`}
                  className="group p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-champagne/40 transition-all"
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-champagne mb-2">
                    {ui.officialBadge}
                  </p>
                  <h3 className="font-serif text-lg text-white group-hover:text-champagne transition-colors leading-snug mb-2">
                    {gTitle}
                  </h3>
                  <p className="text-xs text-white/50 line-clamp-2">
                    {getLocalizedText(g.excerpt, loc).replace(/\u2014/g, ' - ')}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
              <EditorialPageSections locale={loc} path={`${langPrefix}/guides/${slug}`} />
      </main>
    </>
  );
}
