import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import EventVenueMap from '@/components/EventVenueMap';
import SeoAuthorityHub from '@/components/SeoAuthorityHub';
import { HumanEventCarousel } from '@/components/HumanEventCarousel';
import { SITE_CONTACT } from '@/config/contact';
import { getPaymentTerms35 } from '@/lib/capodanno/paymentTerms35';
import { capodannoEventPath } from '@/lib/capodanno/routes';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { getEventVenueCopy } from '@/lib/i18n/eventVenueCopy';
import { localePrefix, type LocaleCode } from '@/lib/i18n/locales';
import { getLocalizedVenueSlug35 } from '@/lib/i18n/localizedSlugs35';
import { getScarcityAndChatCopy } from '@/lib/i18n/scarcityAndChatCopy';
import {
  getOrthodoxNyeJustMeContent,
  ORTHODOX_NYE_JUSTME_AFFILIATE_URL,
  ORTHODOX_NYE_JUSTME_FLOW_ASSET_KEYS,
  ORTHODOX_NYE_JUSTME_GOLD_MENU_SRC,
  ORTHODOX_NYE_JUSTME_POSTER_SRC,
  ORTHODOX_NYE_JUSTME_SILVER_MENU_SRC,
  ORTHODOX_NYE_JUSTME_VENUE,
  orthodoxNyeJustMePath,
} from '@/lib/orthodox-nye/justme35';
import { buildSeoEventImagePack } from '@/lib/seoEventImages';

function safeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export default function OrthodoxNyeJustMeDetailView({ locale }: { locale: string }) {
  const loc = (locale || 'en') as LocaleCode;
  const c = getOrthodoxNyeJustMeContent(loc);
  const paymentTerms = getPaymentTerms35(loc);
  const scarcity = getScarcityAndChatCopy(loc);
  const venueMapCopy = getEventVenueCopy(loc);
  const prefix = localePrefix(loc);
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';

  const eventsDir = getLocalizedDir35('events', loc);
  const clubsDir = getLocalizedDir35('clubs', loc);
  const eventsHubHref = `${prefix}/${eventsDir}`;
  const specialEventsHref = `${prefix}/${eventsDir}/special`;
  const justMeClubHref = `${prefix}/${clubsDir}/${getLocalizedVenueSlug35('just-me-milan', loc)}`;
  const dec31NyeHref = capodannoEventPath('capodanno-justme-milano-torre-branca', loc);
  const canonicalPath = orthodoxNyeJustMePath(loc);
  const fullCanonicalUrl = `${baseUrl}${canonicalPath}`;

  const whatsappGeneralHref = getConciergeBookingUrl(
    loc,
    `${c.whatsappContext} · VIP Privé / Dinner Info`,
    fullCanonicalUrl,
  );
  const whatsappVipHref = getConciergeBookingUrl(
    loc,
    `${c.whatsappContext} · VIP Privé Bottle Table Request`,
    fullCanonicalUrl,
  );

  const imagePack = buildSeoEventImagePack({
    locale: loc,
    eventSlug: 'capodanno-ortodosso-justme-milano-2027',
    venueName: `${ORTHODOX_NYE_JUSTME_VENUE.name} (${ORTHODOX_NYE_JUSTME_VENUE.district})`,
    h1: c.h1,
    h2List: [c.menusHeading, c.ticketsHeading, c.contestHeading],
    h3List: [c.silverMenuTitle, c.goldMenuTitle, c.logisticsHeading],
    categorySlug: 'special',
    music: 'House · Hip-Hop · International Hits · DJ Nazar Radchuk',
    dressCode: 'Elegant with red or luminous accessory (21+)',
    posterSrc: ORTHODOX_NYE_JUSTME_POSTER_SRC,
    customAssetKeys: [...ORTHODOX_NYE_JUSTME_FLOW_ASSET_KEYS],
    shotLabels: c.shotLabels,
  });

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: c.breadcrumbHome, item: `${baseUrl}${prefix || '/'}` },
      { '@type': 'ListItem', position: 2, name: c.breadcrumbEvents, item: `${baseUrl}${eventsHubHref}` },
      { '@type': 'ListItem', position: 3, name: c.breadcrumbSpecial, item: `${baseUrl}${specialEventsHref}` },
      { '@type': 'ListItem', position: 4, name: c.h1, item: fullCanonicalUrl },
    ],
  };

  const eventJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: c.h1,
    description: c.description,
    url: fullCanonicalUrl,
    startDate: '2027-01-13T19:30:00+01:00',
    endDate: '2027-01-14T05:00:00+01:00',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: [
      ...imagePack.schemaImages,
      {
        '@type': 'ImageObject',
        url: `${baseUrl}${ORTHODOX_NYE_JUSTME_SILVER_MENU_SRC}`,
        contentUrl: `${baseUrl}${ORTHODOX_NYE_JUSTME_SILVER_MENU_SRC}`,
        name: c.silverMenuAlt,
        caption: c.silverMenuAlt,
        width: 1080,
        height: 1350,
      },
      {
        '@type': 'ImageObject',
        url: `${baseUrl}${ORTHODOX_NYE_JUSTME_GOLD_MENU_SRC}`,
        contentUrl: `${baseUrl}${ORTHODOX_NYE_JUSTME_GOLD_MENU_SRC}`,
        name: c.goldMenuAlt,
        caption: c.goldMenuAlt,
        width: 1080,
        height: 1350,
      },
    ],
    location: {
      '@type': 'Place',
      name: ORTHODOX_NYE_JUSTME_VENUE.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Viale Luigi Camoens, 2',
        addressLocality: 'Milano',
        postalCode: '20121',
        addressRegion: 'MI',
        addressCountry: 'IT',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: ORTHODOX_NYE_JUSTME_VENUE.latitude,
        longitude: ORTHODOX_NYE_JUSTME_VENUE.longitude,
      },
    },
    performer: [
      {
        '@type': 'Person',
        name: 'DJ Nazar Radchuk',
      },
    ],
    organizer: {
      '@type': 'Organization',
      name: 'Nightlife Milan',
      url: baseUrl,
      sameAs: ['https://wa.me/393519127047', ORTHODOX_NYE_JUSTME_AFFILIATE_URL],
    },
    offers: {
      '@type': 'AggregateOffer',
      url: ORTHODOX_NYE_JUSTME_AFFILIATE_URL,
      priceCurrency: 'EUR',
      lowPrice: 20,
      highPrice: 80,
      offerCount: 3,
      availability: 'https://schema.org/InStock',
      validFrom: '2026-11-15T00:00:00+01:00',
      offers: [
        {
          '@type': 'Offer',
          name: 'Club + 1 Drink (from 23:30)',
          price: 20,
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          validFrom: '2026-11-15T00:00:00+01:00',
          url: ORTHODOX_NYE_JUSTME_AFFILIATE_URL,
        },
        {
          '@type': 'Offer',
          name: 'Silver Seated Dinner (from 19:30 + Party)',
          price: 60,
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          validFrom: '2026-11-15T00:00:00+01:00',
          url: ORTHODOX_NYE_JUSTME_AFFILIATE_URL,
        },
        {
          '@type': 'Offer',
          name: 'Gold Seafood Dinner (from 19:30 + Party)',
          price: 80,
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          validFrom: '2026-11-15T00:00:00+01:00',
          url: ORTHODOX_NYE_JUSTME_AFFILIATE_URL,
        },
      ],
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-[#050505] pb-20 text-[#F6F1E7]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(eventJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(faqJsonLd) }} />

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-3 sm:px-6 sm:pt-4 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-2 text-xs text-[#C2B9AA]">
          <Link href={prefix || '/'} className="hover:text-[#F6F1E7]">
            {c.breadcrumbHome}
          </Link>
          <span>/</span>
          <Link href={eventsHubHref} className="hover:text-[#F6F1E7]">
            {c.breadcrumbEvents}
          </Link>
          <span>/</span>
          <Link href={specialEventsHref} className="hover:text-[#F6F1E7]">
            {c.breadcrumbSpecial}
          </Link>
          <span>/</span>
          <span className="font-medium text-[#C9A84C]">{c.h1}</span>
        </nav>

        {/* Hero Section */}
        <section className="border-b border-[#F6F1E7]/15 pb-8">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-[#F6F1E7]/18 bg-[#050505]">
                <Image
                  src={ORTHODOX_NYE_JUSTME_POSTER_SRC}
                  alt={imagePack.poster.alt}
                  title={imagePack.poster.title}
                  fill
                  priority
                  fetchPriority="high"
                  quality={95}
                  sizes="(max-width: 1080px) 100vw, 1080px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="space-y-6 lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="border border-[#C9A84C] bg-[#C9A84C]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
                  {c.dateBadge}
                </span>
                <span className="border border-[#2A2A34] bg-[#12131A] px-3 py-1 font-mono text-[11px] font-semibold tabular-nums tracking-wider text-[#EAE3D5]">
                  {c.priceBadge}
                </span>
                <span className="border border-[#8B1E2B] bg-[#8B1E2B]/20 px-3 py-1 text-[11px] font-semibold tracking-wider text-[#F6E3E6]">
                  {c.ageDressBadge}
                </span>
                {scarcity?.sellingFastBadge && (
                  <span className="border border-emerald-700/60 bg-emerald-950/60 px-3 py-1 text-[11px] font-semibold text-emerald-300">
                    {scarcity.sellingFastBadge}
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <p className="font-serif text-sm italic text-[#C9A84C]"><em>{c.themeTag}</em></p>
                <h1 className="font-serif text-3xl font-bold leading-tight text-[#F6F1E7] sm:text-5xl">{c.h1}</h1>
                <p className="text-sm font-medium text-[#D6CEC0] sm:text-base">{c.subtitle}</p>
              </div>

              <p className="max-w-4xl text-base leading-relaxed text-[#EAE3D5]">{c.description}</p>

              {/* Primary Action Bar */}
              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href={ORTHODOX_NYE_JUSTME_AFFILIATE_URL}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex min-h-[48px] items-center justify-center bg-[#C9A84C] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[#050505] transition hover:bg-[#DFBE63]"
                >
                  {c.xceedCtaLabel} →
                </a>
                <a
                  href={whatsappGeneralHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center border border-[#25D366]/70 bg-[#25D366]/15 px-6 py-3 text-sm font-bold text-[#F6F1E7] transition hover:bg-[#25D366] hover:text-[#050505]"
                >
                  {c.whatsappCtaLabel}
                </a>
              </div>

              {/* Key Facts — 1 col below md:, hairline dividers */}
              <dl className="grid grid-cols-1 divide-y divide-[#F6F1E7]/12 border-t border-[#F6F1E7]/15 pt-2 md:grid-cols-2 md:gap-x-8 md:divide-y-0 lg:grid-cols-3">
                {c.quickFacts.map((fact) => (
                  <div key={fact.label} className="py-3 md:border-b md:border-[#F6F1E7]/12">
                    <dt className="text-[11px] font-bold tracking-wider text-[#C9A84C]">{fact.label}</dt>
                    <dd className="mt-1 text-sm font-medium text-[#F6F1E7]">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="mt-6 border-b border-[#F6F1E7]/15 pb-5">
          <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-[#C9A84C]">{c.tocTitle}</h2>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1.5 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-2.5 md:overflow-visible md:pb-0">
            {c.tocItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="inline-flex min-h-[38px] shrink-0 items-center border border-[#F6F1E7]/16 bg-[#141311] px-3.5 py-2 text-xs font-semibold text-[#EAE3D5] transition hover:border-[#C9A84C] hover:text-[#C9A84C]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </section>

        {/* Cross Banners: JustMe Club + Dec 31 Gatsby NYE */}
        <section
          data-no-lightbox="true"
          data-event-crosslink-cards="orthodox-nye-justme"
          className="mt-8"
        >
          <HumanEventCarousel locale={locale}>
          <div className="flex flex-col justify-between gap-4 border border-[#24242C] bg-[#0D0E13] p-5">
            <div className="space-y-4">
              <Link
                href={justMeClubHref}
                className="group relative block aspect-[4/5] w-full overflow-hidden border border-white/10 bg-[#050505]"
              >
                <Image
                  src="/images/venues/just-me-milano/just-me-milano-torre-branca-01.webp"
                  alt={c.venueBannerTitle}
                  fill
                  quality={92}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </Link>
              <div>
                <span className="text-[11px] font-bold tracking-wider text-[#C9A84C]">
                  {c.venueBannerEyebrow}
                </span>
                <h3 className="mt-1 font-serif text-lg font-bold text-[#F6F1E7]">{c.venueBannerTitle}</h3>
                <p className="mt-1 text-xs leading-relaxed text-[#C2B9AA]">{c.venueBannerDesc}</p>
              </div>
            </div>
            <Link
              href={justMeClubHref}
              className="inline-flex min-h-[44px] w-full items-center justify-center border border-[#C9A84C] bg-[#C9A84C]/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#F6F1E7] transition hover:bg-[#C9A84C] hover:text-[#050505]"
            >
              {c.venueBannerCta}
            </Link>
          </div>

          <div className="flex flex-col justify-between gap-4 border border-[#8B1E2B]/60 bg-[#120A0D] p-5">
            <div className="space-y-4">
              <Link
                href={dec31NyeHref}
                className="group relative block aspect-[4/5] w-full overflow-hidden border border-white/10 bg-[#050505]"
              >
                <Image
                  src="/images/events/cards-4x5/capodanno-2027-posters/capodanno-justme-milano-torre-branca.webp"
                  alt={c.dec31BannerTitle}
                  fill
                  quality={92}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </Link>
              <div>
                <span className="text-[11px] font-bold tracking-wider text-[#E69A9A]">
                  {c.dec31BannerEyebrow}
                </span>
                <h3 className="mt-1 font-serif text-lg font-bold text-[#F6F1E7]">{c.dec31BannerTitle}</h3>
                <p className="mt-1 text-xs leading-relaxed text-[#EAE3D5]">{c.dec31BannerDesc}</p>
              </div>
            </div>
            <Link
              href={dec31NyeHref}
              className="inline-flex min-h-[44px] w-full items-center justify-center bg-[#F6F1E7] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#050505] transition hover:bg-[#DFBE63]"
            >
              {c.dec31BannerCta}
            </Link>
          </div>
          </HumanEventCarousel>
        </section>

        {/* 1. Overview & Timeline */}
        <section id="overview" className="mt-10 space-y-6 border border-[#24242C] bg-[#0B0C10] p-6 sm:p-10">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-bold text-[#F6F1E7] sm:text-3xl">{c.overviewHeading}</h2>
            <p className="text-sm text-[#C9A84C]">{c.subtitle}</p>
          </div>

          <div className="space-y-4 text-base leading-relaxed text-[#EAE3D5]">
            {c.overviewParagraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="border-t border-[#202028] pt-6">
            <h3 className="font-serif text-xl font-bold text-[#F6F1E7]">{c.timelineHeading}</h3>
            <p className="mt-1 text-sm text-[#C2B9AA]">{c.timelineSubheading}</p>
            <div className="mt-5 divide-y divide-[#F6F1E7]/12 border-y border-[#F6F1E7]/12">
              {c.timelineSteps.map((step) => (
                <div
                  key={step.time}
                  className="flex flex-col gap-2 py-4 sm:flex-row sm:items-start sm:gap-5"
                >
                  <span className="inline-block w-28 shrink-0 border border-[#C9A84C]/50 bg-[#C9A84C]/10 px-2.5 py-1 text-center text-xs font-bold text-[#C9A84C]">
                    {step.time}
                  </span>
                  <div>
                    <div className="font-semibold text-[#F6F1E7]">{step.title}</div>
                    <p className="mt-1 text-sm leading-relaxed text-[#C2B9AA]">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Silver €60 & Gold €80 Menus */}
        <section id="menus" className="mt-10 space-y-8 border border-[#24242C] bg-[#0B0C10] p-6 sm:p-10">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#F6F1E7] sm:text-3xl">{c.menusHeading}</h2>
            <p className="mt-1 text-sm text-[#C2B9AA]">{c.menusSubheading}</p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Silver 60 EUR */}
            <article className="flex flex-col border border-[#2B2D36] bg-[#101116]">
              <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-[#24242C] bg-[#050505]">
                <Image
                  src={ORTHODOX_NYE_JUSTME_SILVER_MENU_SRC}
                  alt={c.silverMenuAlt}
                  title={c.silverMenuAlt}
                  fill
                  quality={92}
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-serif text-2xl font-bold text-[#F6F1E7]">{c.silverMenuTitle}</h3>
                    <span className="border border-[#C9A84C] bg-[#C9A84C]/15 px-3 py-1 text-base font-bold text-[#C9A84C]">
                      {c.silverMenuPrice}
                    </span>
                  </div>
                  <p className="mt-2 text-xs font-semibold text-emerald-300">{c.silverBeverages}</p>
                  <div className="mt-5 space-y-4">
                    {c.silverCourses.map((course) => (
                      <div key={course.course} className="border-l-2 border-[#C9A84C] pl-3.5">
                        <div className="text-[11px] font-bold tracking-wider text-[#C9A84C]">
                          {course.course}
                        </div>
                        <div className="mt-0.5 text-sm font-bold text-[#F6F1E7]">{course.dish}</div>
                        <p className="mt-1 text-xs leading-relaxed text-[#C2B9AA]">{course.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-4">
                  <a
                    href={ORTHODOX_NYE_JUSTME_AFFILIATE_URL}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex min-h-[44px] w-full items-center justify-center bg-[#C9A84C] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#050505] transition hover:bg-[#DFBE63]"
                  >
                    {c.silverMenuTitle} · {c.silverMenuPrice} →
                  </a>
                </div>
              </div>
            </article>

            {/* Gold 80 EUR */}
            <article className="flex flex-col border border-[#C9A84C]/60 bg-[#12100B]">
              <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-[#C9A84C]/30 bg-[#050505]">
                <Image
                  src={ORTHODOX_NYE_JUSTME_GOLD_MENU_SRC}
                  alt={c.goldMenuAlt}
                  title={c.goldMenuAlt}
                  fill
                  quality={92}
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-serif text-2xl font-bold text-[#F6F1E7]">{c.goldMenuTitle}</h3>
                    <span className="bg-[#C9A84C] px-3 py-1 text-base font-bold text-[#050505]">
                      {c.goldMenuPrice}
                    </span>
                  </div>
                  <p className="mt-2 text-xs font-semibold text-emerald-300">{c.goldBeverages}</p>
                  <div className="mt-5 space-y-4">
                    {c.goldCourses.map((course) => (
                      <div key={course.course} className="border-l-2 border-[#C9A84C] pl-3.5">
                        <div className="text-[11px] font-bold tracking-wider text-[#C9A84C]">
                          {course.course}
                        </div>
                        <div className="mt-0.5 text-sm font-bold text-[#F6F1E7]">{course.dish}</div>
                        <p className="mt-1 text-xs leading-relaxed text-[#C2B9AA]">{course.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-4">
                  <a
                    href={ORTHODOX_NYE_JUSTME_AFFILIATE_URL}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex min-h-[44px] w-full items-center justify-center bg-[#C9A84C] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#050505] transition hover:bg-[#DFBE63]"
                  >
                    {c.goldMenuTitle} · {c.goldMenuPrice} →
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* 3. Tickets & VIP Privé Pricing Grid — Alternativa 02 Capitolo Carta Calda #F6F1E7 */}
        <section id="tickets-vip" className="mt-10 space-y-6 border-2 border-[#050505] bg-[#F6F1E7] p-6 text-[#050505] sm:p-10">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#4A453E]">
              TARIFFE UFFICIALI & PRENOTAZIONE
            </p>
            <h2 className="mt-1 font-serif text-2xl font-bold text-[#050505] sm:text-3xl">{c.ticketsHeading}</h2>
            <p className="mt-1 text-sm text-[#3D3830]">{c.ticketsSubheading}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {c.tiers.map((tier) => (
              <div
                key={tier.id}
                className="flex flex-col justify-between border border-[#050505] bg-[#FFFFFF] p-6 text-[#050505]"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="bg-[#050505] px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#F6F1E7]">
                      {tier.badge}
                    </span>
                    <span className="font-serif text-2xl font-extrabold text-[#050505]">{tier.price}</span>
                  </div>
                  <h3 className="mt-3 font-serif text-xl font-bold text-[#050505]">{tier.title}</h3>
                  <p className="mt-1.5 text-xs text-[#4A453E]">{tier.summary}</p>
                  <ul className="mt-4 space-y-2 text-sm text-[#24201B]">
                    {tier.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="mt-1 text-xs font-bold text-[#050505]">◆</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 bg-[#050505] p-1.5">
                  {tier.action === 'xceed' ? (
                    <a
                      href={ORTHODOX_NYE_JUSTME_AFFILIATE_URL}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="inline-flex min-h-[44px] w-full items-center justify-center bg-[#EAE3D5] px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#050505] transition hover:bg-[#F6F1E7]"
                    >
                      {c.xceedCtaLabel}
                    </a>
                  ) : (
                    <a
                      href={whatsappVipHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] w-full items-center justify-center bg-[#25D366] px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#050505] transition hover:bg-[#2EE472]"
                    >
                      {c.whatsappCtaLabel}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="border border-[#050505]/25 bg-[#EAE3D5] p-4 text-sm font-medium text-[#050505]">{c.vipConciergeNote}</p>
        </section>

        {/* 4. Theme, Dress Code & 4-Star Mountain Contest */}
        <section id="contest-dresscode" className="mt-10 space-y-6 border border-[#8B1E2B]/50 bg-[#0D0A0C] p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold tracking-wider text-[#E69A9A]">{c.contestSubheading}</p>
              <h2 className="mt-1 font-serif text-2xl font-bold text-[#F6F1E7] sm:text-3xl">{c.contestHeading}</h2>
            </div>
            <span className="border border-[#C9A84C] bg-[#C9A84C]/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#C9A84C]">
              {c.contestPrizeBadge}
            </span>
          </div>

          <div className="space-y-3 text-base leading-relaxed text-[#EAE3D5]">
            {c.contestParagraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="border border-[#C9A84C]/50 bg-[#14110B] p-5">
            <h3 className="font-serif text-lg font-bold text-[#C9A84C]">{c.contestPrizeTitle}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#EAE3D5]">{c.contestPrizeDetails}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="border border-emerald-700/50 bg-[#0B120E] p-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-300">{c.dressCodeOkTitle}</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#EAE3D5]">
                {c.dressCodeOkItems.map((item) => (
                  <li key={item}>✓ {item}</li>
                ))}
              </ul>
            </div>
            <div className="border border-[#8B1E2B]/60 bg-[#140B0D] p-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#F29999]">{c.dressCodeNoTitle}</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#EAE3D5]">
                {c.dressCodeNoItems.map((item) => (
                  <li key={item}>✕ {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Bespoke Winter Flow Gallery (4 Real Contextualized Architectural Shots) */}
        <section data-lead-shot="/images/seo-events/master/orthodox-nye-justme-01-torre-branca.webp" className="mt-10 space-y-6 border border-[#24242C] bg-[#0B0C10] p-6 sm:p-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A84C]">{imagePack.eyebrow}</p>
            <h2 className="mt-1 font-serif text-2xl font-bold text-[#F6F1E7] sm:text-3xl">
              {imagePack.sectionHeading}
            </h2>
            <p className="mt-1 text-sm text-[#C2B9AA]">{imagePack.sectionSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {imagePack.gallery.map((shot) => (
              <figure key={shot.assetKey} className="overflow-hidden border border-[#24242C] bg-[#050505]">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#050505]">
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    width={1080}
                    height={1350}
                    loading="lazy"
                    decoding="async"
                    className="block h-full w-full object-cover"
                  />
                </div>
              </figure>
            ))}
          </div>
        </section>

        {/* 5. Official 6-Step 100% Prepayment Terms */}
        <section id="payment-terms" className="mt-10 space-y-5 border-t border-[#F6F1E7]/15 pt-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A84C]">{paymentTerms.eyebrow}</p>
              <h2 className="mt-1 font-serif text-2xl font-bold text-[#F6F1E7]">{paymentTerms.heading}</h2>
            </div>
            <span className="border border-[#C9A84C]/60 bg-[#C9A84C]/10 px-3 py-1 text-xs font-bold text-[#C9A84C]">
              {paymentTerms.methodsBadge}
            </span>
          </div>

          <p className="text-sm text-[#C2B9AA]">{paymentTerms.subtitle}</p>

          <ol className="list-none pl-0 grid grid-cols-1 divide-y divide-[#F6F1E7]/12 border-y border-[#F6F1E7]/12 md:grid-cols-2 md:gap-x-8 md:divide-y-0 lg:grid-cols-3">
            {paymentTerms.steps.map((step, index) => (
              <li key={step} className="flex items-start gap-3 py-4 text-sm text-[#EAE3D5] md:border-b md:border-[#F6F1E7]/12">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center bg-[#C9A84C] font-mono text-xs font-bold tabular-nums text-[#050505]">
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1 leading-relaxed">
                  {step.replace(/^\s*(?:\(\d+\)|[\d\u0660-\u0669\u06F0-\u06F9]+[.):、-])\s*/u, '')}
                </span>
              </li>
            ))}
          </ol>

          <p className="text-xs text-[#C2B9AA]">{paymentTerms.note}</p>
        </section>

        {/* 6. Logistics & Interactive Map */}
        <section id="venue-map" className="mt-10 space-y-6 border border-[#24242C] bg-[#0B0C10] p-6 sm:p-10">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#F6F1E7] sm:text-3xl">{c.logisticsHeading}</h2>
            <p className="mt-1 text-sm text-[#C9A84C]">{c.mapHeading}</p>
          </div>

          <div className="space-y-3 text-base leading-relaxed text-[#EAE3D5]">
            {c.logisticsParagraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="grid grid-cols-1 divide-y divide-[#F6F1E7]/12 border-y border-[#F6F1E7]/12 md:grid-cols-2 md:gap-x-8 md:divide-y-0 lg:grid-cols-4">
            {c.logisticsFacts.map((item) => (
              <div key={item.label} className="py-3.5 md:border-b md:border-[#F6F1E7]/12">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#C9A84C]">{item.label}</div>
                <div className="mt-1 text-xs font-medium text-[#F6F1E7]">{item.value}</div>
              </div>
            ))}
          </div>

          <EventVenueMap
            id="orthodox-nye-justme-map-2027"
            mapUrl={`https://www.google.com/maps?q=${encodeURIComponent(
              `${ORTHODOX_NYE_JUSTME_VENUE.name} ${ORTHODOX_NYE_JUSTME_VENUE.address}`,
            )}&output=embed`}
            labels={{
              loadMap: venueMapCopy.loadMap,
              mapTitle: venueMapCopy.mapTitle.replace('{venue}', ORTHODOX_NYE_JUSTME_VENUE.name),
              privacyLoadNotice: venueMapCopy.privacyLoadNotice,
            }}
          />

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={ORTHODOX_NYE_JUSTME_AFFILIATE_URL}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex min-h-[44px] items-center bg-[#C9A84C] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#050505] hover:bg-[#DFBE63]"
            >
              {c.xceedCtaLabel}
            </a>
            <a
              href={`mailto:${SITE_CONTACT.email}`}
              className="inline-flex min-h-[44px] items-center border border-[#2A2A34] px-5 py-2.5 text-xs font-semibold text-[#F6F1E7] hover:border-[#C9A84C]"
            >
              {SITE_CONTACT.email}
            </a>
          </div>
        </section>

        {/* 7. FAQ Section — Alternativa 02 Capitolo Carta Calda #F6F1E7 */}
        <section id="faq" className="mt-10 space-y-5 border-2 border-[#050505] bg-[#F6F1E7] p-6 text-[#050505] sm:p-10">
          <h2 className="font-serif text-2xl font-bold text-[#050505] sm:text-3xl">{c.faqHeading}</h2>
          <div className="divide-y divide-[#050505]/15 border-y border-[#050505]/15 bg-[#FFFFFF] px-5">
            {c.faqs.map((faq, idx) => (
              <details
                key={faq.q}
                open={idx < 2}
                className="group py-4"
              >
                <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 font-bold text-[#050505] marker:hidden">
                  <span>{faq.q}</span>
                  <span className="font-mono text-xl font-bold text-[#050505] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="pt-2 text-sm leading-relaxed text-[#24201B]">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <SeoAuthorityHub lang={loc} />
    </main>
  );
}
