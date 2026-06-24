import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getGuideBySlug, getEventsByGenres, mockGuides, mockVenues } from '@/lib/data';
import { getLocalizedText } from '@/lib/seo';
import { ArrowLeft, Calendar, User, MapPin } from 'lucide-react';
import GuideToc from '@/components/GuideToc';
import GuideShareButtons from '@/components/GuideShareButtons';

// ISR Configuration (1 hour)
export const revalidate = 3600;

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
      slug: guide.slugs.it || guide.slugs.en 
    });
  });

  return paths;
}

// Generate Dynamic SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = getGuideBySlug(slug, locale);

  if (!guide) return notFound();

  const title = `${getLocalizedText(guide.title, locale)} | Nightlife Milan Guides`;
  const description = getLocalizedText(guide.excerpt, locale);
  
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  
  const enSlug = guide.slugs.en;
  const itSlug = guide.slugs.it || enSlug;
  
  const currentSlug = locale === 'it' ? itSlug : enSlug;
  const path = locale === 'it' ? `/it/guides/${currentSlug}` : `/guides/${currentSlug}`;
  const canonical = `${baseUrl}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        'en': `${baseUrl}/guides/${enSlug}`,
        'it': `${baseUrl}/it/guides/${itSlug}`,
        'x-default': `${baseUrl}/guides/${enSlug}`,
      },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: guide.image ? `${baseUrl}${guide.image}` : `${baseUrl}/images/guides-hero.webp`, width: 1200, height: 630, alt: title }],
      type: 'article',
      siteName: 'Nightlife Milan',
      locale: locale === 'it' ? 'it_IT' : 'en_US',
      publishedTime: guide.datePublished,
      modifiedTime: guide.dateModified,
      authors: [guide.author],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [guide.image ? `${baseUrl}${guide.image}` : `${baseUrl}/images/guides-hero.webp`],
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
  const langPrefix = isIt ? '/it' : '';
  const currentSlug = isIt ? (guide.slugs.it || guide.slugs.en) : guide.slugs.en;
  const guideUrl = `${baseUrl}${langPrefix}/guides/${currentSlug}`;

  const t = {
    back: isIt ? 'Torna alle Guide' : 'Back to Guides',
    toc: isIt ? 'Indice dei Contenuti' : 'Table of Contents',
    relatedVenues: isIt ? 'Locali Menzionati' : 'Related Venues',
    proTip: isIt ? 'Il Consiglio dell\'Esperto' : 'Pro Tip',
    faq: isIt ? 'Domande Frequenti' : 'Frequently Asked Questions',
  };

  // Format date
  const dateObj = new Date(guide.datePublished);
  const formattedDate = new Intl.DateTimeFormat(isIt ? 'it-IT' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Europe/Rome'
  }).format(dateObj);

  // Extract sections for TOC
  const tocSections = guide.sections.map(s => ({
    id: s.id,
    title: getLocalizedText(s.heading, locale),
  }));

  // Find related venues (mock logic: just grab 2 random venues if none are strictly related by genre, or use relatedGenres)
  let relatedVenues = mockVenues;
  if (guide.relatedGenres && guide.relatedGenres.length > 0) {
    relatedVenues = mockVenues.filter(v => 
      // This is a mock check, ideally venues have genres, but we can just use the first 2
      true
    );
  }
  relatedVenues = relatedVenues.slice(0, 2);

  // Generate Article JSON-LD Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    image: guide.image ? [guide.image] : [],
    datePublished: guide.datePublished,
    dateModified: guide.dateModified,
    author: [{
      '@type': 'Person',
      name: guide.author,
    }],
    publisher: {
      '@type': 'Organization',
      name: 'Nightlife Milan',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/milan-nightclub-luxury-vip-champagne.webp`
      }
    },
    description: excerpt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': guideUrl
    }
  };

  // Generate FAQPage JSON-LD Schema if FAQs exist
  let faqSchema = null;
  if (guide.faqs && guide.faqs.length > 0) {
    faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: guide.faqs.map(faq => ({
        '@type': 'Question',
        name: getLocalizedText(faq.question, locale),
        acceptedAnswer: {
          '@type': 'Answer',
          text: getLocalizedText(faq.answer, locale)
        }
      }))
    };
  }

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
              src={guide.image || '/images/milan-nightlife-guide-2026-insider.webp'}
              alt={title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131009] via-[#131009]/80 to-transparent" />
          </div>
          
          <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link 
              href={`/${locale}`}
              className="inline-flex items-center text-white/40 hover:text-champagne transition-colors mb-8 text-sm uppercase tracking-wider font-semibold"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.back}
            </Link>
            
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-champagne tracking-tight mb-6 leading-tight">
              {title}
            </h1>
            
            <div className="flex items-center justify-center gap-6 text-sm text-white/50 uppercase tracking-wider font-semibold">
              <span className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {guide.author}
              </span>
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {formattedDate}
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
            <p className="text-xl text-white/70 leading-relaxed font-light mb-8">
              {excerpt}
            </p>

            {/* AI Trafiletto */}
            <div className="not-prose mb-8 p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04] text-left">
              <p className="font-sans text-champagne/60 text-[9px] tracking-[0.3em] uppercase mb-3">Quick Answer</p>
              <p className="font-sans text-white/70 text-sm leading-relaxed">
                {isIt
                  ? `${title} — una guida completa alla vita notturna di Milano scritta da ${guide.author}. Pubbl. ${formattedDate}. Prenota VIP table o guestlist via WhatsApp +39 351 912 7047.`
                  : `${title} — a complete guide to Milan nightlife by ${guide.author}. Published ${formattedDate}. Book VIP tables or guestlist via WhatsApp +39 351 912 7047.`}
              </p>
            </div>

            {/* Tags */}
            <div className="not-prose flex flex-wrap gap-2 mb-10">
              {[
                isIt ? 'Guida Milano' : 'Milan Guide',
                isIt ? 'Vita Notturna' : 'Nightlife Milan',
                ...(guide.relatedGenres || []).map(g => g.replace(/_/g, ' ')),
                isIt ? 'Club Milano' : 'Milan Clubs',
                isIt ? 'Consigli Insider' : 'Insider Tips',
              ].slice(0, 6).map(tag => (
                <span key={tag} className="px-3 py-1.5 rounded-full border border-white/10 text-white/40 text-xs font-sans tracking-wider">
                  {tag}
                </span>
              ))}
            </div>

            {guide.sections.map((section, index) => (
              <div key={section.id} id={section.id} className="scroll-mt-32 mb-12">
                <h2 className="text-3xl font-serif font-bold text-champagne mb-6">
                  {getLocalizedText(section.heading, locale)}
                </h2>
                <div 
                  className="text-white/70 leading-relaxed font-light space-y-6"
                  dangerouslySetInnerHTML={{ __html: getLocalizedText(section.content, locale) }}
                />
                
                {/* Callout Box Example (Mocked after first section) */}
                {index === 0 && (
                  <div className="my-10 p-6 bg-white/[0.03] border border-champagne/30 rounded-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-champagne" />
                    <h3 className="text-champagne font-semibold uppercase tracking-wider text-sm mb-2">
                      {t.proTip}
                    </h3>
                    <p className="text-white/70 italic m-0">
                      {isIt 
                        ? "Arriva sempre 15 minuti prima dell'orario di punta per evitare lunghe code ed assicurarti un ingresso fluido." 
                        : "Always arrive 15 minutes before peak time to avoid long lines and ensure a smooth entry."}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* FAQs if any */}
            {guide.faqs && guide.faqs.length > 0 && (
              <div className="mt-16 pt-12 border-t border-white/10">
                <h2 className="text-3xl font-serif font-bold text-champagne mb-8">{t.faq}</h2>
                <div className="space-y-8">
                  {guide.faqs.map((faq, i) => (
                    <div key={i}>
                      <h3 className="text-xl font-semibold text-white mb-3">
                        {getLocalizedText(faq.question, locale)}
                      </h3>
                      <p className="text-white/70 leading-relaxed font-light">
                        {getLocalizedText(faq.answer, locale)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <GuideShareButtons url={guideUrl} title={title} />
          </article>

          {/* Right Sidebar / Related Venues */}
          <aside className="lg:col-span-3 space-y-8">
            <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-6">
              {t.relatedVenues}
            </h3>
            <div className="flex flex-col gap-6">
              {relatedVenues.map(venue => {
                const venueName = getLocalizedText(venue.localizedContent.name, locale);
                const venueSlug = getLocalizedText(venue.slugs, locale);
                
                let venueHref = `/${locale}/clubs/${venueSlug}`;

                return (
                  <Link 
                    key={venue.id} 
                    href={venueHref}
                    className="group flex flex-col bg-white/[0.03] border border-white/10 rounded-lg overflow-hidden hover:border-champagne/50 transition-colors"
                  >
                    <div className="relative h-32 w-full">
                      <Image
                        src={venue.image || '/images/milan-nightclub-luxury-vip-champagne.webp'}
                        alt={venueName}
                        fill
                        sizes="(max-width: 768px) 50vw, 200px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-champagne">
                          {venue.category.replace('_', ' ')}
                        </span>
                      </div>
                      <h4 className="text-white font-bold mb-1 group-hover:text-champagne transition-colors">
                        {venueName}
                      </h4>
                      <p className="text-white/40 text-xs flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {venue.zone.replace('_', ' ')}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </aside>

        </div>
      </main>
    </>
  );
}
