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
import { resolveDistinctGuidePageMedia } from '@/lib/guideEditorialMedia';
import { getLocalizedGuideSlug35 } from '@/lib/guides100Catalog';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { getLocalizedVenueSlug35 } from '@/lib/i18n/localizedSlugs35';
import { getLocalizedText } from '@/lib/seo';
import type { TasteExplorerData } from '@/lib/tasteExplorerData';

export interface GuideCanonicalHubBanner {
  eyebrow: string;
  description: string;
  primaryHref: string;
  primaryAnchor: string;
  secondaryHref?: string;
  secondaryAnchor?: string;
}

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
  partnerCards?: Array<{ venue: Venue; coverSrc: string }>;
  relatedGuideCards?: Array<{ guide: Guide; coverSrc: string }>;
  canonicalHubBanner?: GuideCanonicalHubBanner | null;
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
 * Uses S17 Swiss Grid (max-w-[1440px] px-5 sm:px-10 lg:px-14) + 3 unified grounds (#050505 / #141311 / #F6F1E7)
 * with subtle #25D366 Vermilion markers and #25D366 WhatsApp booking CTAs.
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
  partnerCards,
  relatedGuideCards,
  canonicalHubBanner,
  t,
  ui,
}: GuideEditorialTemplateProps) {
  const fallbackMedia =
    !partnerCards || !relatedGuideCards
      ? resolveDistinctGuidePageMedia(guide, relatedVenues, otherGuides, bundle, explorerData)
      : null;
  const effectivePartnerCards = partnerCards ?? fallbackMedia!.partnerCards;
  const effectiveRelatedGuideCards = relatedGuideCards ?? fallbackMedia!.relatedGuideCards;
  const isPillarExplorer = Boolean(explorerData);
  const leadRate = explorerData?.items[0]?.rate || '';
  const leadRateShort = leadRate.includes('·') ? leadRate.split('·')[0].trim() : leadRate;
  const leadVenue = explorerData?.items[0]?.name || relatedVenues[0]?.localizedContent?.name?.[locale] || relatedVenues[0]?.localizedContent?.name?.en || 'Just Me Milano';
  const deskAltLabel = explorerData?.items[0]?.primaryLabel || t.toc;
  const secondaryJumpHref = isPillarExplorer ? '#explorer' : '#partner-clubs';
  const secondaryJumpLabel = isPillarExplorer ? explorerData!.allLabel : t.relatedVenues;

  const metricCountValue = explorerData
    ? String(explorerData.items.length)
    : String(relatedVenues.length || guide.sections.length);
  const metricCountLabel = explorerData
    ? explorerData.colVenue
    : relatedVenues.length
      ? t.relatedVenues
      : ui.officialBadge;
  const metricRateValue = explorerData && leadRateShort ? leadRateShort : 'VIP · 100%';
  const metricRateLabel = explorerData ? leadVenue : ui.directDesk;

  return (
    <main className="taste-pillar-root flex-1 bg-[#050505] text-[#FFFFFF] w-full">
      <TasteMotionLayer />

      {/* 1. Asymmetric Editorial Cinema Hero (#050505 Obsidian) */}
      <section className="bg-[#050505] text-[#FFFFFF] pt-8 sm:pt-10 pb-14 sm:pb-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-3 text-[14px] text-[#C9C7C2]">
            <Link
              href={`${langPrefix}/guides`}
              locale={locale}
              className="inline-flex items-center gap-2 text-[#F6F1E7] hover:text-[#25D366] transition-colors font-semibold min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              <span>{t.back}</span>
            </Link>
            <span aria-hidden="true">/</span>
            <span>{ui.officialBadge}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{formattedDate}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-5" data-taste-reveal>
              <h1 className="font-display font-extrabold text-[#FFFFFF] m-0 mb-4">
                {displayHeadline}
              </h1>
              <p className="text-[19px] font-semibold text-[#F6F1E7] leading-snug mb-3 max-w-xl">
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

            <div className="lg:col-span-7">
              <TasteHeroCrossfade
                slides={bundle.heroSlides}
                altPrimary={title}
                title={title}
              />
            </div>
          </div>
        </div>
      </section>

      {canonicalHubBanner && (
        <section
          data-canonical-hub-banner="true"
          className="bg-[#141311] text-[#FFFFFF] border-t border-b border-[#2A2824] py-6 sm:py-7"
        >
          <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[12px] uppercase tracking-[0.14em] text-[#25D366] font-bold m-0 mb-1">
                {canonicalHubBanner.eyebrow}
              </p>
              <p className="text-[15px] text-[#E6E2DA] leading-snug m-0 max-w-3xl">
                {canonicalHubBanner.description}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href={canonicalHubBanner.primaryHref}
                locale={locale}
                className="inline-flex items-center gap-2 min-h-[44px] bg-[#25D366] text-[#050505] hover:bg-[#20bd5a] px-5 py-2.5 text-[14px] font-bold transition-colors"
              >
                <span>{canonicalHubBanner.primaryAnchor}</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </Link>
              {canonicalHubBanner.secondaryHref && canonicalHubBanner.secondaryAnchor && (
                <Link
                  href={canonicalHubBanner.secondaryHref}
                  locale={locale}
                  className="inline-flex items-center gap-2 min-h-[44px] border border-[#F6F1E7]/40 text-[#F6F1E7] hover:border-[#25D366] hover:text-[#25D366] px-4 py-2.5 text-[14px] font-semibold transition-colors"
                >
                  <span>{canonicalHubBanner.secondaryAnchor}</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 2. Carta Calda Executive Brief & Editorial Index (#F6F1E7 Warm Paper) */}
      <section className="bg-[#F6F1E7] text-[#050505] py-12 sm:py-16">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-8 mb-8" data-taste-stagger>
            <div className="bg-[#EAE3D5] p-4 sm:p-5">
              <p className="text-lg sm:text-xl font-bold text-[#050505] tabular-nums m-0">{metricCountValue}</p>
              <p className="text-[14px] text-[#3B3935] mt-1 m-0">{metricCountLabel}</p>
            </div>
            <div className="bg-[#EAE3D5] p-4 sm:p-5">
              <p className="text-lg sm:text-xl font-bold text-[#050505] tabular-nums m-0">{metricRateValue}</p>
              <p className="text-[14px] text-[#3B3935] mt-1 m-0">{metricRateLabel}</p>
            </div>
            <div className="bg-[#EAE3D5] p-4 sm:p-5">
              <p className="text-lg sm:text-xl font-bold text-[#050505] tabular-nums m-0">{formattedDate}</p>
              <p className="text-[14px] text-[#3B3935] mt-1 m-0">{guide.author}</p>
            </div>
            <div className="bg-[#EAE3D5] p-4 sm:p-5">
              <p className="text-lg sm:text-xl font-bold text-[#050505] tabular-nums m-0">{ui.directDesk}</p>
              <p className="text-[14px] text-[#3B3935] mt-1 m-0">WhatsApp +39 351 912 7047</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 flex flex-col gap-4" data-taste-reveal>
              <h2 className="font-display font-bold text-[#050505] m-0">{t.toc}</h2>
              <p className="text-[15px] text-[#3B3935] leading-relaxed m-0">
                {ui.bookDesc}
              </p>
              <GuideShareButtons url={guideUrl} title={title} variant="light" />
            </div>

            <nav aria-label={t.toc} className="lg:col-span-8">
              <div
                className="flex snap-x gap-2.5 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:gap-3 sm:overflow-visible sm:pb-0"
                data-taste-stagger
              >
                <a
                  href={secondaryJumpHref}
                  className="flex min-h-[46px] shrink-0 snap-start items-center justify-between gap-3 border border-[#050505] bg-[#050505] px-4 py-3 text-[14px] font-bold text-[#F6F1E7] transition-colors hover:bg-[#1E1C19] sm:px-5 sm:py-4 sm:text-[15px]"
                >
                  <span>{isPillarExplorer ? explorerData!.heading : t.relatedVenues}</span>
                  <span aria-hidden="true">→</span>
                </a>
                {tocSections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="flex min-h-[46px] shrink-0 snap-start items-center justify-between gap-3 border border-[#050505]/20 bg-[#EAE3D5] px-4 py-3 text-[14px] font-medium text-[#050505] transition-colors hover:bg-[#050505] hover:text-[#FFFFFF] sm:px-5 sm:py-4 sm:text-[15px]"
                  >
                    <span>{sec.title}</span>
                    <span aria-hidden="true">→</span>
                  </a>
                ))}
                {guide.faqs && guide.faqs.length > 0 && (
                  <a
                    href="#faq-guide"
                    className="flex min-h-[46px] shrink-0 snap-start items-center justify-between gap-3 border border-[#050505]/20 bg-[#EAE3D5] px-4 py-3 text-[14px] font-semibold text-[#050505] transition-colors hover:bg-[#050505] hover:text-[#FFFFFF] sm:px-5 sm:py-4 sm:text-[15px]"
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

      {/* 3. Curated Cinema Photo Strip — Swipe on Mobile, 4-Column Grid on Desktop, Lightbox Enabled */}
      {bundle.stripPlates.length >= 2 && (
        <section id="gallery" aria-label={title} className="bg-[#050505] py-8 sm:py-12">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14">
            <div
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 sm:overflow-visible sm:pb-0"
              data-taste-stagger
            >
              {bundle.stripPlates.map((plate, idx) => (
                <figure
                  key={`strip-plate-${idx}`}
                  className="relative aspect-[4/5] w-[78vw] max-w-[320px] shrink-0 snap-start overflow-clip bg-[#141311] m-0 group sm:w-auto sm:max-w-none"
                >
                  <Image
                    src={plate.src}
                    alt={`${plate.caption} - ${title}`}
                    title={`${plate.caption} (${plate.district})`}
                    fill
                    unoptimized
                    quality={92}
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover brightness-[0.88] group-hover:brightness-100 transition-[filter] duration-500"
                  />
                  <figcaption className="absolute bottom-3 left-3 z-10 bg-[#050505]/88 px-3 py-1.5 text-[14px] text-[#FFFFFF] pointer-events-none">
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
          className="bg-[#050505] text-[#FFFFFF] py-14 sm:py-20"
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
              {effectivePartnerCards.map(({ venue, coverSrc }) => {
                const venueName = getLocalizedText(venue.localizedContent.name, locale);
                const venueSlug = getLocalizedVenueSlug35(venue.id, locale);
                const venueHref = `${langPrefix}/${getLocalizedDir35('clubs', locale)}/${venueSlug}`;
                return (
                  <Link
                    key={venue.id}
                    href={venueHref}
                    locale={locale}
                    className="group bg-[#141311] hover:bg-[#1E1C19] transition-colors flex flex-col overflow-clip"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-clip bg-[#050505]">
                      <Image
                        src={coverSrc}
                        alt={venueName}
                        fill
                        unoptimized
                        quality={92}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-base font-bold text-[#FFFFFF] group-hover:text-[#25D366] transition-colors truncate">
                          {venueName}
                        </div>
                        <div className="text-[14px] text-[#C9C7C2] flex items-center gap-1.5 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                          <span>{venue.zone.replace(/_/g, ' ')}</span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#F6F1E7] group-hover:text-[#25D366] shrink-0" aria-hidden="true" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 5. Alternating Magazine Spread Chapters (#F6F1E7 Carta Calda <-> #050505 Obsidian) */}
      {guide.sections.map((section, index) => {
        const secHeading = getLocalizedText(section.heading, locale)
          .replace(/^#+\s*/, '')
          .replace(/\u2014/g, ' - ');
        const secContent = normalizeGuideSectionHtml(
          getLocalizedText(section.content, locale),
        );
        const isLight = index % 2 === 0;
        const isLastDark = !isLight && index === guide.sections.length - 1 && index >= 3;
        const secPlate =
          index >= 1 && !isLastDark ? (bundle.chapterPlates[index - 1] ?? null) : null;

        return (
          <section
            key={section.id}
            id={section.id}
            className={`scroll-mt-24 py-14 sm:py-20 ${
              isLight ? 'bg-[#F6F1E7] text-[#050505]' : 'bg-[#050505] text-[#FFFFFF]'
            }`}
          >
            <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14">
              {index === 0 ? (
                <div className="space-y-8" data-taste-reveal>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                    <div className="lg:col-span-8">
                      <h2 className="font-display font-bold text-[#050505] m-0">{secHeading}</h2>
                    </div>
                    <div className="lg:col-span-4 lg:text-right">
                      <a href={secondaryJumpHref} className="taste-btn-dark">
                        <span>{secondaryJumpLabel}</span>
                      </a>
                    </div>
                  </div>
                  <div
                    className="taste-prose-light [&_strong]:font-bold [&_strong]:text-[#050505]"
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
                  <aside className="lg:col-span-5 lg:sticky lg:top-20 bg-[#141311] p-6 sm:p-7" data-no-lightbox="true">
                    <h3 className="font-display text-xl font-bold text-[#FFFFFF] mb-4" data-taste-reveal>
                      {t.relatedVenues}
                    </h3>
                    <div className="flex flex-col gap-[2px] bg-[#050505]" data-taste-stagger>
                      {relatedVenues.map((venue, idx) => {
                        const venueName = getLocalizedText(venue.localizedContent.name, locale);
                        const venueSlug = getLocalizedVenueSlug35(venue.id, locale);
                        const venueHref = `${langPrefix}/${getLocalizedDir35('clubs', locale)}/${venueSlug}`;
                        return (
                          <Link
                            key={venue.id}
                            href={venueHref}
                            locale={locale}
                            className="flex items-center justify-between gap-4 bg-[#0B0A09] hover:bg-[#141311] px-4 py-3.5 transition-colors"
                          >
                            <div className="min-w-0">
                              <div className="text-[15px] font-semibold text-[#FFFFFF] truncate">
                                {idx + 1}. {venueName}
                              </div>
                              <div className="text-[14px] text-[#C9C7C2] flex items-center gap-1.5 mt-0.5">
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
              ) : isLight ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start" data-taste-reveal>
                  <div className="lg:col-span-4 lg:sticky lg:top-20">
                    <h2 className="font-display font-bold text-[#050505] mb-5">{secHeading}</h2>
                    {secPlate && (
                      <figure className="m-0">
                        <div className="relative aspect-[4/5] w-full overflow-clip bg-[#EAE3D5]">
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
                      className="taste-prose-light [&_strong]:font-bold [&_strong]:text-[#050505]"
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
                      <figure className="relative aspect-[4/5] w-full overflow-clip bg-[#141311]">
                        <Image
                          src={secPlate.src}
                          alt={`${secPlate.caption} - ${secHeading}`}
                          title={secHeading}
                          fill
                          unoptimized
                          quality={92}
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover"
                        />
                        <figcaption className="absolute bottom-2 left-2 bg-[#050505]/88 px-3 py-1 text-[14px] text-[#FFFFFF]">
                          {secPlate.caption}
                        </figcaption>
                      </figure>
                    )}
                    <div className="bg-[#141311] p-6" data-no-lightbox="true">
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

      {/* 6. Split FAQ Accordion (#F6F1E7 Carta Calda) */}
      {guide.faqs && guide.faqs.length > 0 && (
        <section id="faq-guide" className="scroll-mt-24 bg-[#F6F1E7] text-[#050505] py-14 sm:py-20">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14">
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
                        <span>
                          {getLocalizedText(faq.question, locale).replace(/\u2014/g, ' - ').replace(/\u2605/g, '*')}
                        </span>
                        <span className="taste-faq-plus text-[#050505]" aria-hidden="true" />
                      </summary>
                      <p className="text-[15px] sm:text-base text-[#1E1C19] leading-relaxed pt-2 pb-3 m-0">
                        {getLocalizedText(faq.answer, locale).replace(/\u2014/g, ' - ').replace(/\u2605/g, '*')}
                      </p>
                    </details>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-5" data-taste-reveal>
                {bundle.faqPlate && (
                  <figure className="relative aspect-[4/5] w-full overflow-clip bg-[#050505]">
                    <Image
                      src={bundle.faqPlate.src}
                      alt={`${bundle.faqPlate.caption} - ${title}`}
                      title={title}
                      fill
                      unoptimized
                      quality={92}
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </figure>
                )}
                <div className="bg-[#EAE3D5] p-6" data-no-lightbox="true">
                  <h3 className="font-display text-xl font-bold text-[#050505] mb-2">
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

      {/* 7. VIP Quote Calculator & Curated Photo Related Guides (#050505 Obsidian) */}
      <section className="bg-[#050505] text-[#FFFFFF] py-14 sm:py-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14">
          <VipQuoteCalculator locale={locale} />

          <div className="pt-14 mt-14" data-no-lightbox="true">
            <h2 className="taste-section-display font-bold text-[#FFFFFF] mb-8">
              {t.otherGuides}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-taste-stagger>
              {effectiveRelatedGuideCards.map(({ guide: g, coverSrc: gCover }) => {
                const gSlug = getLocalizedGuideSlug35(g, locale);
                const gTitle = getLocalizedText(g.title, locale).replace(/\u2014/g, ' - ');
                return (
                  <Link
                    key={g.id}
                    href={`${langPrefix}/guides/${gSlug}`}
                    className="group flex flex-col justify-between bg-[#141311] hover:bg-[#1E1C19] transition-colors overflow-clip"
                  >
                    <div>
                      <div className="relative aspect-[4/5] w-full overflow-clip bg-[#050505]">
                        <Image
                          src={gCover}
                          alt={gTitle}
                          fill
                          unoptimized
                          quality={92}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover"
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
