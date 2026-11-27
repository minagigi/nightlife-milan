import { notFound, permanentRedirect } from 'next/navigation';
import { getLocaleDef, localePrefix, indexedLocaleCodes } from '@/lib/i18n/locales';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import {
  getLocalizedVenueSlug35,
  isConsolidatedNyeMasterGuideId,
  resolveVenueSlug,
} from '@/lib/i18n/localizedSlugs35';
import { GUIDE_HERO_IMAGES_114 } from '@/lib/guideImagesMap114';
import { getLocalizedGuideSlug35 } from '@/lib/guides100Catalog';
import { Metadata } from 'next';
import { getGuideBySlug, getVenues, mockGuides, mockVenues } from '@/lib/data';
import { getLocalizedText } from '@/lib/seo';
import { seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { OFFICIAL_SERP_NAME_BY_ID } from '@/lib/clubSeoMeta35';
import { getCapodannoEventForClub } from '@/lib/capodannoEvents';
import { capodannoCategoryPath, capodannoEventPath } from '@/lib/capodanno/routes';
import { getCapodannoMasterSeo35 } from '@/lib/capodanno/capodannoMasterSeo35';
import { cleanCapodannoSeoTitle, getCapodannoUiCopy } from '@/lib/capodanno/i18n';
import { getGuideUiLabels35 } from '@/lib/i18n/flagshipGuides35';
import type { LocaleCode } from '@/lib/i18n/locales';
import type { Venue } from '@/lib/types';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import { buildTasteExplorerData } from '@/lib/tasteExplorerData';
import {
  getEditorialDisplayHeadline,
  getGuideEditorialBundle,
  resolveDistinctGuidePageMedia,
} from '@/lib/guideEditorialMedia';
import GuideEditorialTemplate, {
  type GuideCanonicalHubBanner,
} from '@/components/GuideEditorialTemplate';

// ISR Configuration (1 hour)
export const revalidate = 3600;

const GUIDE_HERO_IMAGES: Record<string, string> = GUIDE_HERO_IMAGES_114;

const NATIVE_GUIDE_TITLE_PREFIX_35: Readonly<Record<LocaleCode, string>> = {
  en: 'Guide',
  it: 'Guida',
  es: 'Guía',
  fr: 'Guide',
  de: 'Ratgeber',
  pt: 'Guia',
  nl: 'Gids',
  ru: 'Гид',
  tr: 'Rehber',
  zh: '指南',
  ar: 'دليل',
  bg: 'Пътеводител',
  hr: 'Vodič',
  cs: 'Průvodce',
  da: 'Guide',
  et: 'Teejuht',
  fi: 'Opas',
  el: 'Οδηγός',
  hu: 'Útmutató',
  ga: 'Treoir',
  lv: 'Ceļvedis',
  lt: 'Gidas',
  mt: 'Gwida',
  pl: 'Przewodnik',
  ro: 'Ghid',
  sk: 'Sprievodca',
  sl: 'Vodnik',
  sv: 'Guide',
  no: 'Guide',
  is: 'Handbók',
  uk: 'Путівник',
  sq: 'Udhëzues',
  sr: 'Водич',
  bs: 'Vodič',
  mk: 'Водич',
};

const SINGLE_VENUE_GUIDE_RAW_SLUGS: Readonly<Record<string, string>> = {
  'g-15': 'just-me-milan',
  'g-16': 'pineta-milan',
  'g-17': 'aria-club-milan',
  'g-18': 'voya-rooftop-milan',
  'g-19': '55-milano',
  'g-20': 'repvblic-milan',
  'g-21': 'tocqueville-13-milan',
  'g-22': 'armani-prive-milan',
  'g-23': 'volt-club-milan',
  'g-24': 'alcatraz-milan',
  'g-25': 'fabrique-milan',
  'g-26': 'amnesia-milan',
  'g-27': 'hollywood-milan',
  'g-28': 'the-club-milan',
  'g-29': '11-clubroom-milan',
  'g-30': 'gattopardo-milano',
  'g-31': 'mib-milan',
  'g-32': 'terrazza-duomo-21-milan',
  'g-33': 'ceresio-7-milan',
  'g-34': 'apollo-club-milan',
  'g-35': 'magazzini-generali-milan',
  'g-36': 'church-81-milan',
  'g-37': 'loolapaloosa-milan',
  'g-38': 'bobino-milan',
  'g-39': 'old-fashion-milan',
  'g-40': 'the-grace-club-milan',
  'g-125': 'carlsberg-ol-milano',
  'g-126': 'philipps-milano',
  'g-129': 'radio-rooftop-milan',
};

const NYE_VERTICAL_GUIDE_IDS: ReadonlySet<string> = new Set([
  'g-87',
  'g-88',
  'g-117',
  'g-118',
  'g-120',
  'g-121',
  'g-122',
  'g-123',
  'g-124',
  'g-125',
  'g-127',
  'g-128',
  'g-130',
  'g-131',
  'g-133',
]);

function resolvePrimaryVenueForGuide(guideId: string): Venue | undefined {
  const rawVenueSlug = SINGLE_VENUE_GUIDE_RAW_SLUGS[guideId];
  if (!rawVenueSlug) return undefined;
  const canonicalSlug = resolveVenueSlug(rawVenueSlug);
  return mockVenues.find((v) => v.slugs.en === canonicalSlug);
}

function buildDeCannibalizedGuideMetaTitle(
  rawTitle: string,
  locale: LocaleCode,
  primaryVenue?: Venue,
): string {
  const cleaned = rawTitle.replace(/\u2014/g, ' - ').replace(/!/g, '.').trim();
  if (!primaryVenue) {
    return seoTitle(`${cleaned} | Nightlife Milan`);
  }
  const guidePrefix = NATIVE_GUIDE_TITLE_PREFIX_35[locale] || 'Guide';
  const lowerClean = cleaned.toLowerCase();
  const startsWithGuideWord =
    lowerClean.startsWith(guidePrefix.toLowerCase()) ||
    lowerClean.startsWith('guide') ||
    lowerClean.startsWith('guida') ||
    lowerClean.startsWith('guia') ||
    lowerClean.startsWith('guía');
  if (startsWithGuideWord) {
    return cleanCapodannoSeoTitle(cleaned, 62);
  }
  const sep = locale === 'zh' ? '：' : ': ';
  return cleanCapodannoSeoTitle(`${guidePrefix}${sep}${cleaned}`, 62);
}

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

// Generate Static Params for SEO Crawling
export async function generateStaticParams() {
  const paths: { locale: string; slug: string }[] = [];

  mockGuides.forEach((guide) => {
    if (isConsolidatedNyeMasterGuideId(guide.id)) return;
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
  const loc = ((locale as LocaleCode) || 'en') as LocaleCode;
  const guide = getGuideBySlug(slug, loc);

  if (!guide) return notFound();
  if (isConsolidatedNyeMasterGuideId(guide.id)) {
    permanentRedirect(capodannoCategoryPath('capodanno-2027', loc));
  }

  const primaryVenue = resolvePrimaryVenueForGuide(guide.id);
  const rawTitle = getLocalizedText(guide.title, loc).replace(/\u2014/g, ' - ');
  const title = buildDeCannibalizedGuideMetaTitle(rawTitle, loc, primaryVenue);
  const description = withWhatsApp(getLocalizedText(guide.excerpt, loc).replace(/\u2014/g, ' - '), loc);

  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';

  const currentSlug = getLocalizedGuideSlug35(guide, loc);
  const path = `${localePrefix(loc)}/${getLocalizedDir35('guides', loc)}/${currentSlug}`;
  const canonical = `${baseUrl}${path}`;
  const langAlternates: Record<string, string> = {
    'x-default': `${baseUrl}/${getLocalizedDir35('guides', 'en')}/${getLocalizedGuideSlug35(guide, 'en')}`,
  };
  for (const l of indexedLocaleCodes) {
    langAlternates[getLocaleDef(l)!.hreflang] = `${baseUrl}${localePrefix(l)}/${getLocalizedDir35('guides', l)}/${getLocalizedGuideSlug35(guide, l)}`;
  }

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: langAlternates,
    },
    robots:
      getLocaleDef(loc)?.indexed === false
        ? { index: false, follow: true }
        : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [
        {
          url: guide.image ? `${baseUrl}${GUIDE_HERO_IMAGES[guide.id] || guide.image}` : `${baseUrl}/images/guides-hero.webp`,
          width: 1080,
          height: 1350,
          alt: title,
        },
      ],
      type: 'article',
      siteName: 'Nightlife Milan',
      locale: getLocaleDef(loc)?.ogLocale || 'en_US',
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
  const guide = getGuideBySlug(slug, loc);

  if (!guide) return notFound();
  if (isConsolidatedNyeMasterGuideId(guide.id)) {
    permanentRedirect(capodannoCategoryPath('capodanno-2027', loc));
  }

  const ui = getGuideUiLabels35(loc);
  const title = getLocalizedText(guide.title, loc).replace(/\u2014/g, ' - ');
  const excerpt = getLocalizedText(guide.excerpt, loc).replace(/\u2014/g, ' - ');

  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const langPrefix = localePrefix(loc);
  const currentSlug = getLocalizedGuideSlug35(guide, loc);
  if (slug !== guide.slugs.en && slug !== currentSlug) {
    permanentRedirect(`${langPrefix}/${getLocalizedDir35('guides', loc)}/${currentSlug}`);
  }
  const guideUrl = `${baseUrl}${langPrefix}/${getLocalizedDir35('guides', loc)}/${currentSlug}`;
  const effectiveModified = guide.dateModified || '2026-11-13';

  const t = {
    back: ui.guides,
    toc: ui.tocHeading,
    relatedVenues: ui.recommendedVenues,
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

  const primaryVenue = resolvePrimaryVenueForGuide(guide.id);
  const allVenues = getVenues();
  const relatedVenues = primaryVenue
    ? [primaryVenue, ...allVenues.filter((v) => v.id !== primaryVenue.id)].slice(0, 6)
    : allVenues.slice(0, 6);

  // Other guides for cross-linking (never surface consolidated 308 guides)
  const otherGuides = mockGuides
    .filter((g) => g.id !== guide.id && !isConsolidatedNyeMasterGuideId(g.id))
    .slice(0, 4);

  // Build text+SVG canonical entity hub banner (zero <img>, zero <h1>)
  let canonicalHubBanner: GuideCanonicalHubBanner | null = null;
  if (primaryVenue) {
    const officialClubName =
      OFFICIAL_SERP_NAME_BY_ID[primaryVenue.id] ||
      getLocalizedText(primaryVenue.localizedContent.name, loc);
    const clubHref = `${langPrefix}/${getLocalizedDir35('clubs', loc)}/${getLocalizedVenueSlug35(primaryVenue.id, loc)}`;
    const capCopy = getCapodannoUiCopy(loc);
    const nyeEvent = getCapodannoEventForClub(primaryVenue.slugs.en, officialClubName);
    const nyeSlug = nyeEvent?.slug;
    const masterSeo = getCapodannoMasterSeo35(loc);
    canonicalHubBanner = {
      eyebrow: capCopy.officialVenueGuideLabel,
      description: capCopy.officialVenueGuideDescTpl.replace('{venue}', officialClubName),
      primaryHref: clubHref,
      primaryAnchor: officialClubName,
      secondaryHref: nyeSlug
        ? capodannoEventPath(nyeSlug, loc)
        : NYE_VERTICAL_GUIDE_IDS.has(guide.id)
          ? capodannoCategoryPath('capodanno-2027', loc)
          : undefined,
      secondaryAnchor: nyeSlug || NYE_VERTICAL_GUIDE_IDS.has(guide.id) ? masterSeo.footerAnchor : undefined,
    };
  } else if (NYE_VERTICAL_GUIDE_IDS.has(guide.id)) {
    const masterSeo = getCapodannoMasterSeo35(loc);
    canonicalHubBanner = {
      eyebrow: masterSeo.partnerEyebrow,
      description: masterSeo.partnerIntro,
      primaryHref: capodannoCategoryPath('capodanno-2027', loc),
      primaryAnchor: masterSeo.footerAnchor,
    };
  }

  // Generate Article JSON-LD Schema with E-E-A-T ContactPoint & 0-hop NightClub mentions
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
    mentions: relatedVenues.map((v) => {
      const vUrl = `${baseUrl}${langPrefix}/${getLocalizedDir35('clubs', loc)}/${getLocalizedVenueSlug35(v.id, loc)}`;
      return {
        '@type': 'NightClub',
        '@id': `${vUrl}#nightclub`,
        name: OFFICIAL_SERP_NAME_BY_ID[v.id] || getLocalizedText(v.localizedContent.name, loc),
        url: vUrl,
      };
    }),
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
  const heroImg = GUIDE_HERO_IMAGES[guide.id] || guide.image || '/images/guides-editorial/just-me-pavilion.webp';
  const bundle = getGuideEditorialBundle(guide, loc, title, heroImg);
  const displayHeadline = getEditorialDisplayHeadline(guide.id, loc, title);
  const rawExplorerData =
    guide.id === 'g-117' || guide.id === 'g-120' || guide.id === 'g-122'
      ? buildTasteExplorerData('terme', loc, guideUrl)
      : guide.id === 'g-118' ||
          guide.id === 'g-119' ||
          guide.id === 'g-30' ||
          guide.id === 'g-121' ||
          guide.id === 'g-123' ||
          guide.id === 'g-124'
        ? buildTasteExplorerData('clubbing', loc, guideUrl)
        : null;
  const resolvedMedia = resolveDistinctGuidePageMedia(
    guide,
    allVenues,
    otherGuides,
    bundle,
    rawExplorerData,
  );
  const explorerData = resolvedMedia.explorerData;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, '\\u003c') }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
        />
      )}

      <GuideEditorialTemplate
        guide={guide}
        locale={loc}
        langPrefix={langPrefix}
        slug={currentSlug}
        guideUrl={guideUrl}
        title={title}
        displayHeadline={displayHeadline}
        excerpt={excerpt}
        formattedDate={formattedDate}
        waUrl={waUrl}
        tocSections={tocSections}
        relatedVenues={relatedVenues}
        otherGuides={otherGuides}
        bundle={bundle}
        explorerData={explorerData}
        partnerCards={resolvedMedia.partnerCards}
        relatedGuideCards={resolvedMedia.relatedGuideCards}
        canonicalHubBanner={canonicalHubBanner}
        t={t}
        ui={ui}
      />
    </>
  );
}
