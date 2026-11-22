import { notFound } from 'next/navigation';
import { getLocaleDef, hreflangAlternates, localePrefix, indexedLocaleCodes } from '@/lib/i18n/locales';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { GUIDE_HERO_IMAGES_114 } from '@/lib/guideImagesMap114';
import { getLocalizedGuideSlug35 } from '@/lib/guides100Catalog';
import { Metadata } from 'next';
import { getGuideBySlug, getVenues, mockGuides } from '@/lib/data';
import { getLocalizedText } from '@/lib/seo';
import { seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { getGuideUiLabels35 } from '@/lib/i18n/flagshipGuides35';
import type { LocaleCode } from '@/lib/i18n/locales';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import { buildTasteExplorerData } from '@/lib/tasteExplorerData';
import { getEditorialDisplayHeadline, getGuideEditorialBundle } from '@/lib/guideEditorialMedia';
import GuideEditorialTemplate from '@/components/GuideEditorialTemplate';

// ISR Configuration (1 hour)
export const revalidate = 3600;

const GUIDE_HERO_IMAGES: Record<string, string> = GUIDE_HERO_IMAGES_114;

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
  const heroImg = GUIDE_HERO_IMAGES[guide.id] || guide.image || '/images/guides-editorial/just-me-pavilion.webp';
  const bundle = getGuideEditorialBundle(guide, loc, title, heroImg);
  const displayHeadline = getEditorialDisplayHeadline(guide.id, loc, title);
  const explorerData =
    guide.id === 'g-117' || guide.id === 'g-120'
      ? buildTasteExplorerData('terme', loc, guideUrl)
      : guide.id === 'g-118' || guide.id === 'g-119'
        ? buildTasteExplorerData('clubbing', loc, guideUrl)
        : null;

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
        t={t}
        ui={ui}
      />
    </>
  );
}
