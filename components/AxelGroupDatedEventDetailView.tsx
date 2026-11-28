import Image from 'next/image';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  ListChecks,
  MapPin,
  MessageCircle,
  Music,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
  XCircle,
} from 'lucide-react';
import EventVenueMap from '@/components/EventVenueMap';
import Link from '@/components/LocalizedLink';
import SeoAuthorityHub from '@/components/SeoAuthorityHub';
import { HumanEventCarousel } from '@/components/HumanEventCarousel';
import { getAxelGroupEventLocalized } from '@/lib/axel-group-events/events35';
import { getEventVenueCopy } from '@/lib/i18n/eventVenueCopy';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { getLocaleDef, localePrefix, type LocaleCode } from '@/lib/i18n/localeRegistry';
import { buildSeoEventImagePack } from '@/lib/seoEventImages';
import { notFound } from 'next/navigation';

const BASE_URL = process.env.APP_URL || 'https://nightlifemilan.com';

export default function AxelGroupDatedEventDetailView({
  idOrSlug,
  locale: rawLocale,
}: {
  idOrSlug: string;
  locale: LocaleCode | string;
}) {
  const locale: LocaleCode = getLocaleDef(rawLocale)?.code || 'en';
  const detail = getAxelGroupEventLocalized(idOrSlug, locale);
  if (!detail) return notFound();

  const { seed } = detail;
  const lp = localePrefix(locale);
  const eventsDir = getLocalizedDir35('events', locale);
  const canonicalUrl = `${BASE_URL}${detail.canonicalPath}`;
  const mapCopy = getEventVenueCopy(locale);

  const seoImages = buildSeoEventImagePack({
    locale,
    eventSlug: detail.slug,
    venueName: seed.venueName,
    h1: detail.h1,
    h2List: [detail.overviewHeading, detail.formatsHeading],
    h3List: [detail.timelineHeading, detail.howTitle],
    categorySlug: seed.venueType === 'pineta' ? 'dinner-show' : 'special-event',
    music: seed.genres.join(' · '),
    dressCode: `${seed.minAge} · Smart Club Attire`,
    posterSrc: seed.posterSrc,
    customAssetKeys: seed.assetKeys,
  });

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: detail.homeLabel, item: `${BASE_URL}${lp || '/'}` },
      { '@type': 'ListItem', position: 2, name: detail.eventsLabel, item: `${BASE_URL}${lp}/${eventsDir}` },
      { '@type': 'ListItem', position: 3, name: detail.h1, item: canonicalUrl },
    ],
  };

  const eventJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: detail.h1,
    description: detail.metaDescription,
    url: canonicalUrl,
    startDate: seed.startISO,
    endDate: seed.endISO,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: seoImages.schemaImages,
    location: {
      '@type': 'Place',
      name: seed.venueName,
      address: {
        '@type': 'PostalAddress',
        streetAddress: seed.streetAddress,
        addressLocality: seed.city,
        addressRegion: seed.province,
        postalCode: seed.postalCode,
        addressCountry: 'IT',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: seed.latitude,
        longitude: seed.longitude,
      },
    },
    performer: {
      '@type': 'PerformingGroup',
      name: seed.performer,
    },
    organizer: {
      '@type': 'Organization',
      name: 'Nightlife Milan',
      url: BASE_URL,
      telephone: '+39 351 912 7047',
    },
    offers: {
      '@type': 'Offer',
      name: `${seed.seriesName} · ${seed.venueName}`,
      price: String(seed.entryEur),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: canonicalUrl,
      validFrom: '2026-11-27T00:00:00+01:00',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: detail.faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const mapEmbedUrl = `https://www.google.com/maps?q=${seed.latitude},${seed.longitude}&hl=${encodeURIComponent(locale)}&z=15&output=embed`;
  const venueCardImg =
    seed.venueType === 'pineta'
      ? '/images/events/cards-4x5/partner-clubs/pineta-club-milano.webp'
      : '/images/seo-events/master/zangola-campiglio-01.webp';
  const nyeCardImg =
    seed.venueType === 'pineta'
      ? '/images/events/cards-4x5/capodanno-2027-posters/capodanno-pineta-milano.webp'
      : '/images/events/cards-4x5/capodanno-2027-posters/capodanno-in-baita-motoslitta-livigno-bormio-madesimo-tonale.webp';
  const fourthCardImg =
    seed.venueType === 'pineta'
      ? '/images/events/cards-4x5/weekly-posters/zangola-capodanno-mazay-2026-12-31.webp'
      : '/images/events/cards-4x5/weekly-posters/check-love-pineta-2026-12-04.webp';
  const fourthCardHref =
    seed.venueType === 'pineta'
      ? detail.specialHubPath
      : detail.specialHubPath;

  return (
    <article className="min-h-screen bg-[#050505] text-[#F6F1E7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
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
            <Link href={lp || '/'} className="transition-colors hover:text-[#EAE3D5]">
              {detail.homeLabel}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`${lp}/${eventsDir}`} className="transition-colors hover:text-[#EAE3D5]">
              {detail.eventsLabel}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={detail.specialHubPath} className="transition-colors hover:text-[#EAE3D5]">
              {detail.specialLabel}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-[#EAE3D5]">{detail.dateBadge}</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <header className="mx-auto max-w-[1440px] border-x border-b border-white/10 px-5 pb-12 sm:px-14">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-champagne/40 bg-champagne/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-champagne">
                <Sparkles className="h-3.5 w-3.5" />
                {seed.seriesName}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs text-white/85">
                <Calendar className="h-3.5 w-3.5 text-champagne" />
                {detail.dateBadge}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/35 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-200">
                <ShieldCheck className="h-3.5 w-3.5" />
                {seed.minAge}
              </span>
            </div>

            <h1 className="font-serif text-3xl font-normal leading-tight tracking-tight text-[#F6F1E7] sm:text-5xl">
              {detail.h1}
            </h1>

            <p className="font-sans text-sm leading-relaxed text-[#EAE3D5]/90 sm:text-base">
              {detail.subtitle}
            </p>

            <p className="border-l-2 border-champagne bg-white/[0.03] px-4 py-3.5 font-sans text-sm leading-relaxed text-[#EAE3D5]">
              {detail.quickAnswer}
            </p>

            <p className="rounded-lg border border-champagne/30 bg-white/[0.03] px-4 py-3 font-mono text-xs tabular-nums tracking-wide text-champagne sm:text-sm">
              {detail.priceBadge}
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={detail.waMainUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-sm bg-[#25D366] px-5 py-3 text-sm font-bold uppercase tracking-wider text-[#050505] transition-opacity hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" />
                {detail.ctaWa}
              </a>

              <Link
                href={detail.nyePath}
                className="inline-flex min-h-[46px] items-center gap-2 rounded-sm bg-[#EAE3D5] px-5 py-3 text-sm font-bold uppercase tracking-wider text-[#050505] transition-colors hover:bg-white"
              >
                {detail.ctaNye}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5" data-no-lightbox="true">
            <div className="aspect-[4/5] w-full overflow-hidden border border-champagne/30 bg-[#050505]">
              <Image
                src={seoImages.poster.src}
                alt={seoImages.poster.alt}
                title={seoImages.poster.title}
                width={1080}
                height={1350}
                priority
                fetchPriority="high"
                quality={95}
                sizes="(max-width: 1080px) 100vw, 1080px"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Quick Facts */}
        <dl className="mt-8 grid grid-cols-1 divide-y divide-white/10 border-t border-white/15 pt-2 md:grid-cols-2 md:gap-x-8 md:divide-y-0 lg:grid-cols-3">
          {detail.quickFacts.map((fact) => (
            <div key={fact.label} className="py-3 md:border-b md:border-white/10">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-champagne/90">
                {fact.label}
              </dt>
              <dd className="mt-1 font-sans text-sm font-medium text-[#F6F1E7]">{fact.value}</dd>
            </div>
          ))}
        </dl>

        {/* Jump TOC */}
        <nav aria-label={detail.tocTitle} className="mt-8 border-t border-white/15 pt-5">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-champagne">
            <ListChecks className="h-4 w-4" />
            <span>{detail.tocTitle}</span>
          </div>
          <ol className="mt-3 flex gap-2 overflow-x-auto pb-1.5 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-2.5 md:overflow-visible md:pb-0">
            {detail.tocItems.map((item) => (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  className="inline-flex min-h-[36px] items-center gap-2 border border-white/15 bg-[#141311] px-3 py-1.5 font-sans text-xs font-semibold text-[#F6F1E7] transition-colors hover:border-champagne hover:text-champagne sm:text-sm"
                >
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </header>

      {/* 2-Step WhatsApp Concierge Strip */}
      <section
        id="how-to-book"
        className="w-full scroll-mt-24 border-y border-[#050505] bg-[#F6F1E7] text-[#050505]"
      >
        <div className="mx-auto max-w-[1440px] space-y-6 border-x border-[#050505]/18 px-5 py-10 sm:px-14">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#4A453E]">
              <Sparkles className="h-4 w-4 text-[#050505]" />
              <span>{detail.howEyebrow}</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#050505] sm:text-4xl">
              {detail.howTitle}
            </h2>
            <p className="font-sans text-sm text-[#3D3830] sm:text-base">{detail.howSub}</p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {detail.howSteps.map((step) => (
              <div
                key={step.num}
                className="flex flex-col justify-between space-y-5 border border-[#050505] bg-[#FFFFFF] p-6 text-[#050505]"
              >
                <div className="space-y-3">
                  <span className="inline-flex items-center bg-[#050505] px-3 py-1 font-mono text-xs font-bold text-[#F6F1E7]">
                    {step.num}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#050505] sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-[#24201B]">{step.detail}</p>
                </div>

                <div className="bg-[#050505] p-1.5 sm:w-fit">
                  <a
                    href={detail.waMainUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 bg-[#25D366] px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#050505] transition-colors hover:bg-[#2EE472] sm:w-auto"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {detail.ctaWa}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="border border-[#050505]/25 bg-[#EAE3D5] px-4 py-3 font-sans text-xs font-medium leading-relaxed text-[#050505] sm:text-sm">
            {detail.waNote} ·{' '}
            <a
              href="mailto:concierge@nightlifemilan.com"
              className="underline decoration-[#050505]/60 underline-offset-4"
            >
              concierge@nightlifemilan.com
            </a>
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] space-y-16 border-x border-white/10 px-5 py-14 sm:px-14">
        {/* Section 1: Overview + Section 3: Evening Timeline */}
        <section id="overview" className="scroll-mt-24 space-y-8">
          <div className="max-w-4xl space-y-4">
            <h2 className="font-serif text-3xl font-normal text-[#F6F1E7] sm:text-4xl">
              {detail.overviewHeading}
            </h2>
            <div className="space-y-4 font-sans text-base leading-relaxed text-[#C2B9AA]">
              {detail.overviewParagraphs.map((para, idx) => (
                <p key={idx} className={idx === 0 ? 'font-medium text-[#F6F1E7]' : undefined}>
                  {para}
                </p>
              ))}
            </div>
          </div>

          <div
            id="evening-timeline"
            className="scroll-mt-24 rounded-xl border border-white/15 bg-white/[0.025] p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-champagne">
              <Clock className="h-4 w-4" />
              <span>{detail.timelineSub}</span>
            </div>
            <h3 className="mt-2 font-serif text-2xl text-[#F6F1E7]">{detail.timelineHeading}</h3>
            <div className="mt-6 space-y-4">
              {detail.timelineSteps.map((step) => (
                <div
                  key={`${step.time}-${step.title}`}
                  className="flex flex-col gap-2 rounded-lg border border-white/10 bg-black/40 p-4 sm:flex-row sm:items-start sm:gap-6"
                >
                  <span className="shrink-0 rounded-full border border-champagne/40 bg-champagne/10 px-3 py-1 font-mono text-xs font-bold text-champagne">
                    {step.time}
                  </span>
                  <div className="space-y-1">
                    <div className="font-sans text-base font-semibold text-[#F6F1E7]">
                      {step.title}
                    </div>
                    <p className="font-sans text-sm leading-relaxed text-[#C2B9AA]">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Entry Tiers, Dinner & VIP Privé Tables */}
        <section id="formulas-vip" className="scroll-mt-24 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-champagne">
              <UtensilsCrossed className="h-4 w-4" />
              <span>
                {seed.hours} · {seed.genres.join(' · ')}
              </span>
            </div>
            <h2 className="font-serif text-3xl font-normal text-[#F6F1E7] sm:text-4xl">
              {detail.formatsHeading}
            </h2>
            <p className="font-sans text-base text-[#C2B9AA]">{detail.formatsSub}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {detail.tiers.map((tier) => (
              <div
                key={tier.title}
                className="flex flex-col justify-between space-y-5 rounded-xl border border-white/15 bg-white/[0.03] p-6"
              >
                <div className="space-y-3">
                  <span className="inline-block rounded-full border border-champagne/35 bg-champagne/10 px-2.5 py-0.5 font-mono text-[11px] uppercase text-champagne">
                    {tier.badge}
                  </span>
                  <h3 className="font-serif text-xl text-[#F6F1E7]">{tier.title}</h3>
                  <p className="font-sans text-sm leading-relaxed text-[#C2B9AA]">{tier.detail}</p>
                </div>

                <a
                  href={tier.waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-sm bg-[#25D366] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#050505] transition-opacity hover:opacity-90"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  {detail.ctaWa}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Google Flow 4 Real Venue 4:5 SEO Gallery */}
        <section
          aria-label={seoImages.sectionHeading}
          data-seo-flow-gallery={`axel-group-${seed.id}`}
          data-no-lightbox="true"
          className="space-y-6 rounded-xl border border-white/15 bg-white/[0.02] p-6 sm:p-8"
        >
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-champagne">
              {seoImages.eyebrow}
            </p>
            <h2 className="font-serif text-2xl font-normal text-[#F6F1E7] sm:text-3xl">
              {seoImages.sectionHeading}
            </h2>
            <p className="font-sans text-sm text-[#C2B9AA]">{seoImages.sectionSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {seoImages.gallery.map((item) => (
              <figure
                key={item.src}
                className="overflow-hidden border border-white/15 bg-[#050505]"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#050505]">
                  <img
                    src={item.src}
                    alt={item.alt}
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

        {/* Section 5: Dress Code, Logistics & Interactive Map */}
        <section id="dress-logistics" className="scroll-mt-24 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-champagne">
              <Music className="h-4 w-4" />
              <span>
                {seed.genres.join(' · ')} · {seed.minAge}
              </span>
            </div>
            <h2 className="font-serif text-3xl font-normal text-[#F6F1E7] sm:text-4xl">
              {detail.dressHeading}
            </h2>
            <p className="font-sans text-base text-[#C2B9AA]">{detail.dressSub}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-3 rounded-xl border border-emerald-400/25 bg-emerald-500/5 p-6">
              <h3 className="flex items-center gap-2 font-serif text-xl text-emerald-300">
                <CheckCircle2 className="h-5 w-5" />
                {detail.dressOkTitle}
              </h3>
              <ul className="space-y-2">
                {detail.dressOk.map((item) => (
                  <li key={item} className="font-sans text-sm text-[#F6F1E7]/90">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 rounded-xl border border-rose-400/25 bg-rose-500/5 p-6">
              <h3 className="flex items-center gap-2 font-serif text-xl text-rose-300">
                <XCircle className="h-5 w-5" />
                {detail.dressNoTitle}
              </h3>
              <ul className="space-y-2">
                {detail.dressNo.map((item) => (
                  <li key={item} className="font-sans text-sm text-[#F6F1E7]/90">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-6">
              <h3 className="flex items-center gap-2 font-serif text-2xl text-[#F6F1E7]">
                <MapPin className="h-5 w-5 text-champagne" />
                <span>{detail.logisticsHeading}</span>
              </h3>
              {detail.logisticsParagraphs.map((p, i) => (
                <p key={i} className="font-sans text-sm leading-relaxed text-[#C2B9AA] sm:text-base">
                  {p}
                </p>
              ))}
              <dl className="grid grid-cols-1 divide-y divide-white/10 border-t border-white/10 pt-2 md:grid-cols-2 md:gap-x-6 md:divide-y-0">
                {detail.logisticsFacts.map((lf) => (
                  <div key={lf.label} className="py-3 md:border-b md:border-white/10">
                    <dt className="font-mono text-[11px] uppercase text-champagne">{lf.label}</dt>
                    <dd className="mt-1 font-sans text-xs text-[#F6F1E7]">{lf.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="space-y-3 lg:col-span-6">
              <h3 className="font-serif text-2xl text-[#F6F1E7]">{detail.mapHeading}</h3>
              <EventVenueMap
                id={`map-axel-${seed.id}`}
                mapUrl={mapEmbedUrl}
                labels={{
                  loadMap: mapCopy.loadMap,
                  mapTitle: `${seed.venueName} · ${seed.city} (${seed.province})`,
                  privacyLoadNotice: mapCopy.privacyLoadNotice,
                }}
              />
            </div>
          </div>
        </section>

        {/* Internal Cross-Links — Every card has a 4:5 (1080x1350) image per Rule 42 */}
        <section
          data-no-lightbox="true"
          data-event-crosslink-cards="axel-group-dated"
        >
          <HumanEventCarousel locale={rawLocale} cardSize="compact">
          <div className="flex flex-col justify-between space-y-4 overflow-hidden rounded-xl border border-white/15 bg-white/[0.03] p-5">
            <div className="space-y-4">
              <Link
                href={detail.nextEventPath}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-lg border border-white/10 bg-[#050505]"
              >
                <Image
                  src={detail.nextEventSeed.card4x5Src}
                  alt={`${detail.nextEventSeed.seriesName} · ${detail.nextEventSeed.venueName}`}
                  fill
                  quality={92}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </Link>
              <div className="space-y-1.5">
                <p className="font-mono text-[11px] uppercase text-champagne">
                  {detail.nextEventSeed.ymd} · {detail.nextEventSeed.city}
                </p>
                <h3 className="font-serif text-lg text-[#F6F1E7]">
                  {detail.nextEventSeed.seriesName} · {detail.nextEventSeed.performer}
                </h3>
                <p className="font-sans text-xs text-[#C2B9AA]">
                  {detail.nextEventSeed.venueName} ({detail.nextEventSeed.hours})
                </p>
              </div>
            </div>
            <Link
              href={detail.nextEventPath}
              className="inline-flex min-h-[44px] items-center gap-1.5 font-mono text-xs font-bold uppercase text-champagne hover:underline"
            >
              {detail.ctaNext} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="flex flex-col justify-between space-y-4 overflow-hidden rounded-xl border border-white/15 bg-white/[0.03] p-5">
            <div className="space-y-4">
              <Link
                href={detail.clubPath}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-lg border border-white/10 bg-[#050505]"
              >
                <Image
                  src={venueCardImg}
                  alt={seed.venueName}
                  fill
                  quality={92}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </Link>
              <div className="space-y-1.5">
                <p className="font-mono text-[11px] uppercase text-champagne">
                  {seed.city} ({seed.province})
                </p>
                <h3 className="font-serif text-lg text-[#F6F1E7]">{seed.venueName}</h3>
                <p className="font-sans text-xs text-[#C2B9AA]">
                  {seed.streetAddress}, {seed.postalCode} {seed.city}
                </p>
              </div>
            </div>
            <Link
              href={detail.clubPath}
              className="inline-flex min-h-[44px] items-center gap-1.5 font-mono text-xs font-bold uppercase text-champagne hover:underline"
            >
              {detail.ctaClub} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="flex flex-col justify-between space-y-4 overflow-hidden rounded-xl border border-white/15 bg-white/[0.03] p-5">
            <div className="space-y-4">
              <Link
                href={detail.nyePath}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-lg border border-white/10 bg-[#050505]"
              >
                <Image
                  src={nyeCardImg}
                  alt={detail.ctaNye}
                  fill
                  quality={92}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </Link>
              <div className="space-y-1.5">
                <p className="font-mono text-[11px] uppercase text-champagne">31/12/2026 · 2027</p>
                <h3 className="font-serif text-lg text-[#F6F1E7]">{detail.ctaNye}</h3>
                <p className="font-sans text-xs text-[#C2B9AA]">
                  WhatsApp Concierge +39 351 912 7047
                </p>
              </div>
            </div>
            <Link
              href={detail.nyePath}
              className="inline-flex min-h-[44px] items-center gap-1.5 font-mono text-xs font-bold uppercase text-champagne hover:underline"
            >
              {detail.ctaNye} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="flex flex-col justify-between space-y-4 overflow-hidden rounded-xl border border-white/15 bg-white/[0.03] p-5">
            <div className="space-y-4">
              <Link
                href={fourthCardHref}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-lg border border-white/10 bg-[#050505]"
              >
                <Image
                  src={fourthCardImg}
                  alt={detail.specialLabel}
                  fill
                  quality={92}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </Link>
              <div className="space-y-1.5">
                <p className="font-mono text-[11px] uppercase text-champagne">2026 / 2027</p>
                <h3 className="font-serif text-lg text-[#F6F1E7]">{detail.specialLabel}</h3>
                <p className="font-sans text-xs text-[#C2B9AA]">
                  Pineta Milano & Zangola Madonna di Campiglio
                </p>
              </div>
            </div>
            <Link
              href={fourthCardHref}
              className="inline-flex min-h-[44px] items-center gap-1.5 font-mono text-xs font-bold uppercase text-champagne hover:underline"
            >
              {detail.specialLabel} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          </HumanEventCarousel>
        </section>

        {/* Section 6: 12 Verified FAQs */}
        <section
          id="faqs"
          className="scroll-mt-24 border-2 border-[#050505] bg-[#F6F1E7] p-6 text-[#050505] sm:p-10"
        >
          <h2 className="font-serif text-2xl font-bold text-[#050505] sm:text-4xl">
            {detail.faqHeading}
          </h2>
          <div className="mt-5 divide-y divide-[#050505]/15 border-y border-[#050505]/15 bg-[#FFFFFF] px-5">
            {detail.faqs.map((faq, idx) => (
              <details key={faq.q} open={idx < 2} className="group py-4">
                <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 marker:hidden">
                  <h3 className="font-serif text-base font-bold text-[#050505] sm:text-lg">
                    {faq.q}
                  </h3>
                  <span
                    className="font-mono text-xl font-bold text-[#050505] transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="pt-2 font-sans text-sm leading-relaxed text-[#24201B]">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      {/* Sitewide 21-Point SEO Authority Hub */}
      <SeoAuthorityHub
        lang={locale}
        pageKey={`axel-group-${seed.id}`}
        pagePath={detail.canonicalPath}
      />
    </article>
  );
}
