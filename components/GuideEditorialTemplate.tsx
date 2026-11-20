import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import { ArrowLeft, ArrowUpRight, MapPin, MessageCircle } from 'lucide-react';
import TasteMotionLayer from '@/components/TasteMotionLayer';
import TasteHeroCrossfade from '@/components/TasteHeroCrossfade';
import TastePillarExplorer from '@/components/TastePillarExplorer';
import GuideShareButtons from '@/components/GuideShareButtons';
import { VipQuoteCalculator } from '@/components/NightlifeExpansionModules';
import EditorialPageSections from '@/components/EditorialPageSections';
import type { Guide, Venue } from '@/lib/types';
import type { LocaleCode } from '@/lib/i18n/locales';
import type { GuideEditorialBundle } from '@/lib/guideEditorialMedia';
import { getGuideCardCover } from '@/lib/guideEditorialMedia';
import { getLocalizedGuideSlug35 } from '@/lib/guides100Catalog';
import { getLocalizedText } from '@/lib/seo';
import type { TasteExplorerData } from '@/lib/tasteExplorerData';

const VENUE_CURATED_PHOTO_MAP: Record<string, string> = {
  'just-me-milano': '/images/guides-editorial/just-me-pavilion.webp',
  'pineta-club-milano': '/images/guides-editorial/pineta-lounge.webp',
  'aria-club-milano': '/images/guides-editorial/aria-garden.webp',
  '55-milano': '/images/guides-editorial/fiftyfive-loft.webp',
  'voya-rooftop-milan': '/images/guides-editorial/voya-rooftop-20f.webp',
  'repvblic-milano': '/images/guides-editorial/repvblic-club.webp',
  'gattopardo-milano': '/images/guides-editorial/gattopardo-nave.webp',
  'armani-prive-milano': '/images/guides-editorial/armani-prive-lounge.webp',
  'hollywood-club-milano': '/images/guides-editorial/hollywood-corso-como.webp',
  'the-club-milano': '/images/guides-editorial/the-club-brera.webp',
  'apollo-milano': '/images/guides-editorial/apollo-navigli.webp',
  'terrazza-21': '/images/guides-editorial/terrazza-duomo-skyline.webp',
  'ceresio-7': '/images/guides-editorial/ceresio-pool-dusk.webp',
};

const PARTNER_COVER_FALLBACKS = [
  '/images/guides-editorial/just-me-pavilion.webp',
  '/images/guides-editorial/pineta-lounge.webp',
  '/images/guides-editorial/aria-garden.webp',
  '/images/guides-editorial/fiftyfive-loft.webp',
  '/images/guides-editorial/voya-rooftop-20f.webp',
  '/images/guides-editorial/repvblic-club.webp',
];

function normalizeGuideSectionHtml(rawHtml: string): string {
  const cleaned = rawHtml
    .replace(/\u2014/g, ' - ')
    .replace(/\u2605/g, '*')
    .replace(/\bmin-w-full\b/g, 'taste-data-table')
    .replace(/\bborder-white\/(?:10|15|20|30)\b/g, '')
    .replace(/\bbg-white\/(?:5|10|\[0\.0[2-9]\])\b/g, '')
    .replace(/\btext-white(?:\/\d+)?\b/g, '');

  // Wrap unwrapped bare <table> elements (such as g-12..g-14 in lib/data.ts) so mobile never overflows
  return cleaned.replace(
    /(<div[^>]+class="[^"]*(?:taste-table-scroll|overflow-x-auto)[^"]*"[^>]*>[\s\S]*?<\/div>)|(<table\b[\s\S]*?<\/table>)/gi,
    (full, alreadyWrapped, bareTable) => {
      if (alreadyWrapped) return full;
      return `<div class="taste-table-scroll">${bareTable}</div>`;
    },
  );
}

export interface GuideEditorialTemplateProps {
  guide: Guide;
  locale: LocaleCode;
  langPrefix: string;
  slug: string;
  guideUrl: string;
  title: string;
  displayHeadline: string;
  excerpt: string;
  formattedDate: string;
  waUrl: string;
  tocSections: Array<{ id: string; title: string }>;
  relatedVenues: Venue[];
  otherGuides: Guide[];
  bundle: GuideEditorialBundle;
  explorerData: TasteExplorerData | null;
  t: {
    back: string;
    toc: string;
    faq: string;
    relatedVenues: string;
    otherGuides: string;
  };
  ui: {
    officialBadge: string;
    whatsappCta: string;
    bookHeading: string;
    bookDesc: string;
    directDesk: string;
  };
}

/**
 * Reusable 10/10 Magazine Editorial Guide Template for ALL 118 guides on nightlifemilan.com.
 * Uses S17 Swiss Grid (max-w-[1440px] px-5 sm:px-10 lg:px-14) + 3 unified grounds (#0A0A0C / #141418 / #EDEBE6)
 * with subtle #D9381E Vermilion markers and #25D366 WhatsApp booking CTAs.
 */
export default function GuideEditorialTemplate({
  guide,
  locale,
  langPrefix,
  slug,
  guideUrl,
  title,
  displayHeadline,
  excerpt,
  formattedDate,
  waUrl,
  tocSections,
  relatedVenues,
  otherGuides,
  bundle,
  explorerData,
  t,
  ui,
}: GuideEditorialTemplateProps) {
  const isPillarExplorer = Boolean(explorerData);
  const leadRate = explorerData?.items[0]?.rate || '';
  const leadRateShort = leadRate.includes('·') ? leadRate.split('·')[0].trim() : leadRate;
  const leadVenue = explorerData?.items[0]?.name || relatedVenues[0]?.localizedContent?.name?.[locale] || relatedVenues[0]?.localizedContent?.name?.en || 'Just Me Milano';
  const deskAltLabel = explorerData?.items[0]?.primaryLabel || t.toc;
  const secondaryJumpHref = isPillarExplorer ? '#explorer' : '#partner-clubs';
  const secondaryJumpLabel = isPillarExplorer ? explorerData!.allLabel : t.relatedVenues;

  const metricCountValue = explorerData ? String(explorerData.items.length) : String(guide.sections.length);
  const metricCountLabel = explorerData ? explorerData.colVenue : ui.officialBadge;
  const metricRateValue = explorerData && leadRateShort ? leadRateShort : '100% Bot.';
  const metricRateLabel = explorerData ? leadVenue : ui.directDesk;

  return (
    <main className="taste-pillar-root flex-1 bg-[#0A0A0C] text-[#FFFFFF] w-full">
      <TasteMotionLayer />

      {/* 1. Asymmetric Editorial Cinema Hero (#0A0A0C Obsidian) */}
      <section className="bg-[#0A0A0C] text-[#FFFFFF] pt-8 sm:pt-10 pb-14 sm:pb-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-3 text-[14px] text-[#C9C7C2]">
            <Link
              href={`${langPrefix}/guides`}
              className="inline-flex items-center gap-2 text-[#EDEBE6] hover:text-[#25D366] transition-colors font-semibold min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              <span>{t.back}</span>
            </Link>
            <span aria-hidden="true">/</span>
            <span>{ui.officialBadge}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{formattedDate}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6" data-taste-reveal>
              <h1 className="font-display font-extrabold text-[#FFFFFF] m-0 mb-4">
                {displayHeadline}
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-[#EDEBE6] leading-snug mb-3 max-w-2xl">
                {title}
              </p>
              <p className="text-base text-[#C9C7C2] leading-relaxed mb-7 max-w-xl">
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
                <a href={secondaryJumpHref} className="taste-btn-outline-light">
                  <span>{secondaryJumpLabel}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <TasteHeroCrossfade
                slides={bundle.heroSlides}
                altPrimary={title}
                title={title}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Carta Calda Executive Brief & Editorial Index (#EDEBE6 Warm Paper) */}
      <section className="bg-[#EDEBE6] text-[#0A0A0C] py-12 sm:py-16">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-8 mb-8" data-taste-stagger>
            <div className="bg-[#E2DED6] p-4 sm:p-5">
              <p className="text-lg sm:text-xl font-bold text-[#0A0A0C] tabular-nums m-0">{metricCountValue}</p>
              <p className="text-[14px] text-[#3B3935] mt-1 m-0">{metricCountLabel}</p>
            </div>
            <div className="bg-[#E2DED6] p-4 sm:p-5">
              <p className="text-lg sm:text-xl font-bold text-[#0A0A0C] tabular-nums m-0">{metricRateValue}</p>
              <p className="text-[14px] text-[#3B3935] mt-1 m-0">{metricRateLabel}</p>
            </div>
            <div className="bg-[#E2DED6] p-4 sm:p-5">
              <p className="text-lg sm:text-xl font-bold text-[#0A0A0C] tabular-nums m-0">{formattedDate}</p>
              <p className="text-[14px] text-[#3B3935] mt-1 m-0">{guide.author}</p>
            </div>
            <div className="bg-[#E2DED6] p-4 sm:p-5">
              <p className="text-lg sm:text-xl font-bold text-[#0A0A0C] tabular-nums m-0">{ui.directDesk}</p>
              <p className="text-[14px] text-[#3B3935] mt-1 m-0">WhatsApp +39 351 912 7047</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 flex flex-col gap-4" data-taste-reveal>
              <h2 className="font-display font-bold text-[#0A0A0C] m-0">{t.toc}</h2>
              <p className="text-[15px] text-[#3B3935] leading-relaxed m-0">
                {ui.bookDesc}
              </p>
              <GuideShareButtons url={guideUrl} title={title} variant="light" />
            </div>

            <nav aria-label={t.toc} className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" data-taste-stagger>
                <a
                  href={secondaryJumpHref}
                  className="flex items-center justify-between gap-4 bg-[#E2DED6] hover:bg-[#0A0A0C] hover:text-[#FFFFFF] text-[#0A0A0C] px-5 py-4 text-[15px] font-semibold transition-colors"
                >
                  <span>{isPillarExplorer ? explorerData!.heading : t.relatedVenues}</span>
                  <span aria-hidden="true">→</span>
                </a>
                {tocSections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="flex items-center justify-between gap-4 bg-[#E2DED6] hover:bg-[#0A0A0C] hover:text-[#FFFFFF] text-[#0A0A0C] px-5 py-4 text-[15px] font-medium transition-colors"
                  >
                    <span>{sec.title}</span>
                    <span aria-hidden="true">→</span>
                  </a>
                ))}
                {guide.faqs && guide.faqs.length > 0 && (
                  <a
                    href="#faq-guide"
                    className="flex items-center justify-between gap-4 bg-[#E2DED6] hover:bg-[#0A0A0C] hover:text-[#FFFFFF] text-[#0A0A0C] px-5 py-4 text-[15px] font-semibold transition-colors"
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

      {/* 3. Curated Cinema Photo Strip — Zero Flyer Text, Zero Watermarks, Lightbox Enabled */}
      {bundle.stripPlates.length >= 2 && (
        <section id="gallery" aria-label={title} className="bg-[#0A0A0C] py-8 sm:py-12">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14">
            <div className="taste-uneven-strip" data-taste-stagger>
              {bundle.stripPlates.map((plate, idx) => (
                <figure key={`${plate.src}-${idx}`} className="taste-uneven-panel group">
                  <Image
                    src={plate.src}
                    alt={`${plate.caption} - ${title}`}
                    title={`${plate.caption} (${plate.district})`}
                    fill
                    unoptimized
                    quality={92}
                    sizes="(max-width: 1024px) 50vw, 40vw"
                    className="object-cover brightness-[0.88] group-hover:brightness-100 transition-[filter] duration-500"
                  />
                  <figcaption className="absolute bottom-3 left-3 z-10 bg-[#0A0A0C]/88 px-3 py-1.5 text-[14px] text-[#FFFFFF] pointer-events-none">
                    <span className="font-semibold">{plate.caption}</span>
                    {plate.district && (
                      <span className="text-[#C9C7C2] block text-[14px]">{plate.district}</span>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Interactive Directory (g-117/g-118) OR Visual Partner Clubs Showcase (g-1..g-116) */}
      {isPillarExplorer && explorerData ? (
        <TastePillarExplorer data={explorerData} locale={locale} />
      ) : (
        <section
          id="partner-clubs"
          aria-labelledby="guide-partner-clubs-heading"
          className="bg-[#0A0A0C] text-[#FFFFFF] py-14 sm:py-20"
          data-no-lightbox="true"
        >
          <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-8" data-taste-reveal>
              <div className="lg:col-span-7">
                <h2 id="guide-partner-clubs-heading" className="taste-section-display font-bold text-[#FFFFFF] m-0">
                  {t.relatedVenues}
                </h2>
              </div>
              <div className="lg:col-span-5 lg:text-right">
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="taste-btn-primary">
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>{ui.whatsappCta}</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-taste-stagger>
              {relatedVenues.map((venue, idx) => {
                const venueName = getLocalizedText(venue.localizedContent.name, locale);
                const venueSlug = getLocalizedText(venue.slugs, locale);
                const venueHref = `${langPrefix}/clubs/${venueSlug}`;
                const coverSrc =
                  VENUE_CURATED_PHOTO_MAP[venue.slugs.en] ||
                  PARTNER_COVER_FALLBACKS[idx % PARTNER_COVER_FALLBACKS.length];
                return (
                  <Link
                    key={venue.id}
                    href={venueHref}
                    className="group bg-[#141418] hover:bg-[#18181C] transition-colors flex flex-col overflow-clip"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-clip bg-[#0A0A0C]">
                      <Image
                        src={coverSrc}
                        alt={venueName}
                        fill
                        unoptimized
                        quality={92}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover nlm-hover-zoom"
                      />
                    </div>
                    <div className="p-5 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-base font-bold text-[#FFFFFF] group-hover:text-[#25D366] transition-colors truncate">
                          {venueName}
                        </div>
                        <div className="text-[14px] text-[#C9C7C2] flex items-center gap-1.5 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-[#D9381E] shrink-0" />
                          <span>{venue.zone.replace(/_/g, ' ')}</span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#EDEBE6] group-hover:text-[#25D366] shrink-0" aria-hidden="true" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 5. Alternating Magazine Spread Chapters (#EDEBE6 Carta Calda <-> #0A0A0C Obsidian) */}
      {guide.sections.map((section, index) => {
        const secHeading = getLocalizedText(section.heading, locale)
          .replace(/^#+\s*/, '')
          .replace(/\u2014/g, ' - ');
        const secContent = normalizeGuideSectionHtml(
          getLocalizedText(section.content, locale),
        );
        const isLight = index % 2 === 0;
        const secPlate =
          bundle.chapterPlates[index % Math.max(1, bundle.chapterPlates.length)] ||
          bundle.stripPlates[0];
        const isLastDark = !isLight && index === guide.sections.length - 1 && index >= 3;

        return (
          <section
            key={section.id}
            id={section.id}
            className={`scroll-mt-24 py-14 sm:py-20 ${
              isLight ? 'bg-[#EDEBE6] text-[#0A0A0C]' : 'bg-[#0A0A0C] text-[#FFFFFF]'
            }`}
          >
            <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14">
              {index === 0 ? (
                <div className="space-y-8" data-taste-reveal>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                    <div className="lg:col-span-8">
                      <h2 className="font-display font-bold text-[#0A0A0C] m-0">{secHeading}</h2>
                    </div>
                    <div className="lg:col-span-4 lg:text-right">
                      <a href={secondaryJumpHref} className="taste-btn-dark">
                        <span>{secondaryJumpLabel}</span>
                      </a>
                    </div>
                  </div>
                  <div
                    className="taste-prose-light [&_strong]:font-bold [&_strong]:text-[#0A0A0C]"
                    dangerouslySetInnerHTML={{ __html: secContent }}
                  />
                </div>
              ) : isLastDark ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                  <div className="lg:col-span-7" data-taste-reveal>
                    <h2 className="font-display font-bold text-[#FFFFFF] mb-6">{secHeading}</h2>
                    <div
                      className="taste-prose-dark [&_strong]:font-bold [&_strong]:text-[#FFFFFF]"
                      dangerouslySetInnerHTML={{ __html: secContent }}
                    />
                  </div>
                  <aside className="lg:col-span-5 lg:sticky lg:top-20 bg-[#141418] p-6 sm:p-7" data-no-lightbox="true">
                    <h3 className="font-display text-xl font-bold text-[#FFFFFF] mb-4" data-taste-reveal>
                      {t.relatedVenues}
                    </h3>
                    <div className="flex flex-col gap-[2px] bg-[#0A0A0C]" data-taste-stagger>
                      {relatedVenues.map((venue, idx) => {
                        const venueName = getLocalizedText(venue.localizedContent.name, locale);
                        const venueSlug = getLocalizedText(venue.slugs, locale);
                        const venueHref = `${langPrefix}/clubs/${venueSlug}`;
                        return (
                          <Link
                            key={venue.id}
                            href={venueHref}
                            className="flex items-center justify-between gap-4 bg-[#111115] hover:bg-[#18181C] px-4 py-3.5 transition-colors"
                          >
                            <div className="min-w-0">
                              <div className="text-[15px] font-semibold text-[#FFFFFF] truncate">
                                {idx + 1}. {venueName}
                              </div>
                              <div className="text-[14px] text-[#C9C7C2] flex items-center gap-1.5 mt-0.5">
                                <MapPin className="w-3.5 h-3.5 text-[#D9381E] shrink-0" />
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
              ) : isLight ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start" data-taste-reveal>
                  <div className="lg:col-span-4 lg:sticky lg:top-20">
                    <h2 className="font-display font-bold text-[#0A0A0C] mb-5">{secHeading}</h2>
                    {secPlate && (
                      <figure className="m-0">
                        <div className="relative aspect-[16/10] w-full overflow-clip bg-[#E2DED6]">
                          <Image
                            src={secPlate.src}
                            alt={`${secPlate.caption} - ${secHeading}`}
                            title={secHeading}
                            fill
                            unoptimized
                            quality={92}
                            sizes="(max-width: 1024px) 100vw, 35vw"
                            className="object-cover"
                          />
                        </div>
                        <figcaption className="mt-2.5 text-[14px] font-medium text-[#3B3935]">
                          {secPlate.caption}
                        </figcaption>
                      </figure>
                    )}
                  </div>
                  <div className="lg:col-span-8">
                    <div
                      className="taste-prose-light [&_strong]:font-bold [&_strong]:text-[#0A0A0C]"
                      dangerouslySetInnerHTML={{ __html: secContent }}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                  <div className="lg:col-span-7" data-taste-reveal>
                    <h2 className="font-display font-bold text-[#FFFFFF] mb-6">{secHeading}</h2>
                    <div
                      className="taste-prose-dark [&_strong]:font-bold [&_strong]:text-[#FFFFFF]"
                      dangerouslySetInnerHTML={{ __html: secContent }}
                    />
                  </div>
                  <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-5" data-taste-reveal>
                    {secPlate && (
                      <figure className="relative aspect-[16/10] w-full overflow-clip bg-[#141418]">
                        <Image
                          src={secPlate.src}
                          alt={`${secPlate.caption} - ${secHeading}`}
                          title={secHeading}
                          fill
                          unoptimized
                          quality={92}
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover taste-drift-img"
                        />
                        <figcaption className="absolute bottom-2 left-2 bg-[#0A0A0C]/88 px-3 py-1 text-[14px] text-[#FFFFFF]">
                          {secPlate.caption}
                        </figcaption>
                      </figure>
                    )}
                    <div className="bg-[#141418] p-6" data-no-lightbox="true">
                      <h3 className="font-display text-xl font-bold text-[#FFFFFF] mb-2">
                        {ui.bookHeading}
                      </h3>
                      <p className="text-[15px] text-[#C9C7C2] leading-relaxed mb-4">
                        {deskAltLabel} · {ui.bookDesc}
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
              )}
            </div>
          </section>
        );
      })}

      {/* 6. Split FAQ Accordion (#EDEBE6 Carta Calda) */}
      {guide.faqs && guide.faqs.length > 0 && (
        <section id="faq-guide" className="scroll-mt-24 bg-[#EDEBE6] text-[#0A0A0C] py-14 sm:py-20">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-7">
                <h2 className="taste-section-display font-bold text-[#0A0A0C] mb-8" data-taste-reveal>
                  {t.faq}
                </h2>
                <div className="space-y-3" data-taste-stagger>
                  {guide.faqs.map((faq, i) => (
                    <details
                      key={i}
                      open={i === 0}
                      className="taste-faq-item bg-[#E2DED6] px-5 sm:px-6"
                    >
                      <summary className="text-base sm:text-lg font-bold text-[#0A0A0C]">
                        <span>
                          {getLocalizedText(faq.question, locale).replace(/\u2014/g, ' - ').replace(/\u2605/g, '*')}
                        </span>
                        <span className="taste-faq-plus text-[#0A0A0C]" aria-hidden="true" />
                      </summary>
                      <p className="text-[15px] sm:text-base text-[#1E1C19] leading-relaxed pt-2 pb-3 m-0">
                        {getLocalizedText(faq.answer, locale).replace(/\u2014/g, ' - ').replace(/\u2605/g, '*')}
                      </p>
                    </details>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-5" data-taste-reveal>
                <figure className="relative aspect-[16/10] w-full overflow-clip bg-[#0A0A0C]">
                  <Image
                    src={(bundle.chapterPlates[2] || bundle.stripPlates[0]).src}
                    alt={`${t.faq} - ${title}`}
                    title={title}
                    fill
                    unoptimized
                    quality={92}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </figure>
                <div className="bg-[#E2DED6] p-6" data-no-lightbox="true">
                  <h3 className="font-display text-xl font-bold text-[#0A0A0C] mb-2">
                    {ui.bookHeading}
                  </h3>
                  <p className="text-[15px] text-[#3B3935] leading-relaxed mb-5">
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

      {/* 7. VIP Quote Calculator & Curated Photo Related Guides (#0A0A0C Obsidian) */}
      <section className="bg-[#0A0A0C] text-[#FFFFFF] py-14 sm:py-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14">
          <VipQuoteCalculator locale={locale} />

          <div className="pt-14 mt-14" data-no-lightbox="true">
            <h2 className="taste-section-display font-bold text-[#FFFFFF] mb-8">
              {t.otherGuides}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-taste-stagger>
              {otherGuides.map((g) => {
                const gSlug = getLocalizedGuideSlug35(g, locale);
                const gTitle = getLocalizedText(g.title, locale).replace(/\u2014/g, ' - ');
                const gCover = getGuideCardCover(g.id);
                return (
                  <Link
                    key={g.id}
                    href={`${langPrefix}/guides/${gSlug}`}
                    className="group flex flex-col justify-between bg-[#141418] hover:bg-[#18181C] transition-colors overflow-clip"
                  >
                    <div>
                      <div className="relative aspect-[16/10] w-full overflow-clip bg-[#0A0A0C]">
                        <Image
                          src={gCover}
                          alt={gTitle}
                          fill
                          unoptimized
                          quality={92}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover nlm-hover-zoom"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-display text-lg font-bold text-[#FFFFFF] group-hover:text-[#25D366] transition-colors leading-snug mb-2">
                          {gTitle}
                        </h3>
                        <p className="text-[14px] text-[#C9C7C2] line-clamp-3 leading-relaxed m-0">
                          {getLocalizedText(g.excerpt, locale).replace(/\u2014/g, ' - ')}
                        </p>
                      </div>
                    </div>
                    <div className="px-5 pb-5 text-[14px] font-semibold text-[#25D366]">
                      {ui.officialBadge}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <EditorialPageSections locale={locale} path={`${langPrefix}/guides/${slug}`} />
    </main>
  );
}
