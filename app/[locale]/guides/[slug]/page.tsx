import { notFound } from 'next/navigation';
import { tr } from '@/lib/i18n/t';
import { getLocaleDef, hreflangAlternates, localePrefix, indexedLocaleCodes } from '@/lib/i18n/locales';
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
import type { LocaleCode } from '@/lib/i18n/locales';

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

  const title = seoTitle(`${getLocalizedText(guide.title, locale)} | Nightlife Milan Guides`);
  const description = withWhatsApp(getLocalizedText(guide.excerpt, locale), locale);

  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';

  const enSlug = guide.slugs.en;
  const itSlug = guide.slugs.it || enSlug;

  const currentSlug = getLocalizedGuideSlug35(guide, (locale as LocaleCode) || 'en');
  const path = `${localePrefix(locale)}/guides/${currentSlug}`;
  const canonical = `${baseUrl}${path}`;
  const langAlternates: Record<string, string> = {
    'x-default': `${baseUrl}/guides/${getLocalizedGuideSlug35(guide, 'en')}`,
  };
  for (const loc of indexedLocaleCodes) {
    langAlternates[loc] = `${baseUrl}${localePrefix(loc)}/guides/${getLocalizedGuideSlug35(guide, loc)}`;
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
  const isIt = locale === 'it';
  const guide = getGuideBySlug(slug, locale);

  if (!guide) return notFound();

  const title = getLocalizedText(guide.title, locale);
  const excerpt = getLocalizedText(guide.excerpt, locale);

  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const langPrefix = localePrefix(locale);
  const currentSlug = isIt ? guide.slugs.it || guide.slugs.en : guide.slugs.en;
  const guideUrl = `${baseUrl}${langPrefix}/guides/${currentSlug}`;

  const t = {
    back: tr(locale, 'Back to Guides', 'Torna alle Guide'),
    toc: tr(locale, 'Table of Contents', 'Indice dei Contenuti'),
    relatedVenues: tr(locale, 'Priority Partner Venues', 'Top 6 Locali Partner Prioritari'),
    proTip: tr(locale, 'Concierge Insider Tip', "Il Consiglio dell'Esperto Concierge"),
    faq: tr(locale, 'Frequently Asked Questions', 'Domande Frequenti'),
    otherGuides: tr(locale, 'Explore Other Pillar Guides', 'Esplora le Altre Guide Pillar'),
  };

  // Format date
  const dateObj = new Date(guide.dateModified || guide.datePublished);
  const formattedDate = new Intl.DateTimeFormat(isIt ? 'it-IT' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Europe/Rome',
  }).format(dateObj);

  // Extract sections for TOC
  const tocSections = guide.sections.map((s) => ({
    id: s.id,
    title: getLocalizedText(s.heading, locale),
  }));

  // Priority Top 6 venues ordered by priorityScore (1. Just Me, 2. Pineta, 3. Aria, 4. 55 Milano, 5. Voya Rooftop, 6. Repvblic)
  const relatedVenues = getVenues().slice(0, 6);

  // Other guides for cross-linking
  const otherGuides = mockGuides.filter((g) => g.id !== guide.id).slice(0, 4);

  // Generate Article JSON-LD Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    image: guide.image
      ? [guide.image.startsWith('http') ? guide.image : `${baseUrl}${GUIDE_HERO_IMAGES[guide.id] || guide.image}`]
      : [],
    datePublished: guide.datePublished,
    dateModified: guide.dateModified,
    author: [
      {
        '@type': 'Organization',
        name: guide.author,
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: 'Nightlife Milan',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/milan-nightclub-luxury-vip-champagne.webp`,
      },
    },
    description: excerpt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': guideUrl,
    },
  };

  // Generate FAQPage JSON-LD Schema if FAQs exist
  let faqSchema = null;
  if (guide.faqs && guide.faqs.length > 0) {
    faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: guide.faqs.map((faq) => ({
        '@type': 'Question',
        name: getLocalizedText(faq.question, locale),
        acceptedAnswer: {
          '@type': 'Answer',
          text: getLocalizedText(faq.answer, locale),
        },
      })),
    };
  }

  const waUrl = `https://wa.me/393519127047?text=${encodeURIComponent(
    isIt
      ? `Ciao Nightlife Milan! Sto leggendo la guida "${title}" e vorrei prenotare un Tavolo VIP o Lista.`
      : `Hi Nightlife Milan! I'm reading "${title}" and would like to book a VIP Table or Guest List.`
  )}`;

  return (
    <>
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

      <main className="flex-1 bg-[#131009] w-full">
        {/* Hero Article */}
        <section className="relative w-full h-[60vh] min-h-[500px] flex items-end pb-16">
          <div className="absolute inset-0 z-0">
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#131009] via-[#131009]/80 to-transparent" />
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
                {guide.sections.length} {isIt ? 'Capitoli' : 'Chapters'}
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

            {/* AI Trafiletto */}
            <div className="not-prose mb-8 p-6 rounded-2xl border border-champagne/25 bg-champagne/[0.04] text-left">
              <p className="font-mono text-champagne text-[10px] tracking-[0.3em] uppercase mb-3">
                {isIt ? 'Risposta Rapida · Sintesi AI' : 'Quick Answer · AI Summary'}
              </p>
              <p className="font-sans text-white/75 text-sm leading-relaxed">
                {isIt
                  ? `${title}: guida operativa aggiornata al ${formattedDate} a cura di ${guide.author}. Include prezzi ufficiali 2026/2027, regole di selezione per i 6 club di riferimento (Just Me, Pineta, Aria, 55 Milano, Voya Rooftop, Repvblic) e prenotazione diretta garantita via WhatsApp +39 351 912 7047 (concierge@nightlifemilan.com).`
                  : `${title}: actionable field guide updated ${formattedDate} by ${guide.author}. Includes verified 2026/2027 pricing, door rules for the Top 6 priority venues (Just Me, Pineta, Aria, 55 Milano, Voya Rooftop, Repvblic), and direct guaranteed booking via WhatsApp +39 351 912 7047 (concierge@nightlifemilan.com).`}
              </p>
            </div>

            {/* Tags */}
            <div className="not-prose flex flex-wrap gap-2 mb-10">
              {[
                tr(locale, 'Milan Guide 2026/2027', 'Guida Milano 2026/2027'),
                tr(locale, 'Nightlife Milan', 'Vita Notturna Milano'),
                ...(guide.relatedGenres || []).map((g) => g.replace(/_/g, ' ')),
                tr(locale, 'VIP Concierge', 'Concierge VIP'),
                tr(locale, 'Insider Tips', 'Consigli Insider'),
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

            {guide.sections.map((section, index) => (
              <div key={section.id} id={section.id} className="scroll-mt-32 mb-12">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-champagne mb-5">
                  {getLocalizedText(section.heading, locale)}
                </h2>
                <div
                  className="text-white/75 leading-relaxed font-light space-y-5 text-base [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_strong]:text-white [&_strong]:font-semibold"
                  dangerouslySetInnerHTML={{ __html: getLocalizedText(section.content, locale) }}
                />
                {GUIDE_INLINE_IMAGES[guide.id]?.[index] && (
                  <div className="my-8 relative h-64 md:h-80 w-full rounded-2xl overflow-hidden border border-white/10">
                    <Image
                      src={GUIDE_INLINE_IMAGES[guide.id][index]}
                      alt={`${getLocalizedText(section.heading, locale)} — ${title}`}
                      title={`${getLocalizedText(section.heading, locale)} — ${title}`}
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
                      {t.proTip}
                    </h3>
                    <p className="text-white/75 italic m-0 text-sm leading-relaxed">
                      {isIt
                        ? "Invia sempre un messaggio WhatsApp al Concierge (+39 351 912 7047) entro le ore 19:00 della serata scelta: riceverai la planimetria aggiornata dei tavoli e l'accredito nominale prioritario senza sovrapprezzo."
                        : 'Always message our WhatsApp Concierge (+39 351 912 7047) by 19:00 on the night of your event: you will receive the live VIP floor map and priority guest list accreditation at zero agency fee.'}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {(GUIDE_INLINE_IMAGES[guide.id] || []).slice(guide.sections.length).length > 0 && (
              <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {(GUIDE_INLINE_IMAGES[guide.id] || []).slice(guide.sections.length).map((extraImg, extraIdx) => (
                  <div key={extraImg} className="relative h-56 md:h-64 w-full rounded-2xl overflow-hidden border border-white/10">
                    <Image src={extraImg} alt={`${title} — ${extraIdx + 1}`} title={`${title} — ${extraIdx + 1}`} fill quality={92} sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
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
                        {getLocalizedText(faq.question, locale)}
                      </h3>
                      <p className="text-white/70 leading-relaxed font-light text-sm">
                        {getLocalizedText(faq.answer, locale)}
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
                {isIt ? 'Assistenza Diretta 24/7' : '24/7 Direct Desk'}
              </p>
              <h3 className="font-serif text-xl text-white mb-2">
                {isIt ? 'Prenota Tavolo VIP o Lista' : 'Book VIP Table or Guestlist'}
              </h3>
              <p className="text-xs text-white/65 leading-relaxed mb-4">
                {isIt
                  ? 'Zero commissioni di agenzia. Risposta in meno di 10 minuti con planimetria e listino bottiglie ufficiale.'
                  : 'Zero agency fees. Reply in under 10 minutes with floor map and official bottle service price list.'}
              </p>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-champagne text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp +39 351 912 7047</span>
              </a>
            </div>

            <div>
              <h3 className="text-xs font-mono text-champagne uppercase tracking-[0.2em] mb-4">
                {t.relatedVenues}
              </h3>
              <div className="flex flex-col gap-4">
                {relatedVenues.map((venue, idx) => {
                  const venueName = getLocalizedText(venue.localizedContent.name, locale);
                  const venueSlug = getLocalizedText(venue.slugs, locale);
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
                          #{idx + 1} Priority · {venue.category.replace(/_/g, ' ')}
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
          <VipQuoteCalculator locale={locale} />
        </section>

        {/* Cross-Link to Other Pillar Guides */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 border-t border-white/10 pt-14">
          <h2 className="font-serif text-2xl md:text-3xl text-white mb-8">{t.otherGuides}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {otherGuides.map((g) => {
              const gSlug = getLocalizedText(g.slugs, locale);
              const gTitle = getLocalizedText(g.title, locale);
              return (
                <Link
                  key={g.id}
                  href={`${langPrefix}/guides/${gSlug}`}
                  className="group p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-champagne/40 transition-all"
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-champagne mb-2">
                    Pillar Guide
                  </p>
                  <h3 className="font-serif text-lg text-white group-hover:text-champagne transition-colors leading-snug mb-2">
                    {gTitle}
                  </h3>
                  <p className="text-xs text-white/50 line-clamp-2">
                    {getLocalizedText(g.excerpt, locale)}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
              <EditorialPageSections locale={locale as LocaleCode} path={`${langPrefix}/guides/${slug}`} />
      </main>
    </>
  );
}
