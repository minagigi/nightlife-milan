import Image from 'next/image';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  ListChecks,
  MapPin,
  MessageCircle,
  Music,
  ShieldCheck,
  Sparkles,
  Ticket,
  Umbrella,
  UtensilsCrossed,
  XCircle,
} from 'lucide-react';
import EventVenueMap from '@/components/EventVenueMap';
import Link from '@/components/LocalizedLink';
import SeoAuthorityHub from '@/components/SeoAuthorityHub';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { getLocaleDef, localePrefix, type LocaleCode } from '@/lib/i18n/localeRegistry';
import { getLocalizedEventSlug35, getLocalizedVenueSlug35 } from '@/lib/i18n/localizedSlugs35';
import {
  getJustSingingDinnerWhatsappUrl,
  getJustSingingEventbriteUrl,
  getJustSingingRainContent,
  getJustSingingWhatsappConfirmUrl,
  JUST_SINGING_RAIN_END_ISO,
  JUST_SINGING_RAIN_EXTRA_ASSET_KEYS,
  JUST_SINGING_RAIN_FLOW_ASSET_KEYS,
  JUST_SINGING_RAIN_POSTER_SRC,
  JUST_SINGING_RAIN_START_ISO,
  JUST_SINGING_RAIN_VENUE,
  justSingingRainPath,
  justSingingRainSlug,
} from '@/lib/just-singing-rain/justme35';
import { partenopeaJustMePath } from '@/lib/partenopea/justme35';
import { buildSeoEventImagePack } from '@/lib/seoEventImages';
import { thanksgivingJustMePath } from '@/lib/thanksgiving/justme35';

const BASE_URL = 'https://nightlifemilan.com';

export default function JustSingingJustMeDetailView({
  locale: rawLocale,
}: {
  locale: LocaleCode | string;
}) {
  const locale: LocaleCode = getLocaleDef(rawLocale)?.code || 'en';
  const c = getJustSingingRainContent(locale);
  const lp = localePrefix(locale);
  const eventsDir = getLocalizedDir35('events', locale);
  const clubsDir = getLocalizedDir35('clubs', locale);
  const canonicalPath = justSingingRainPath(locale);
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;
  const canonicalSlug = justSingingRainSlug(locale);
  const justMeClubPath = `${lp}/${clubsDir}/${getLocalizedVenueSlug35('v-justme', locale)}`;
  const thanksgivingPath = thanksgivingJustMePath(locale);
  const partenopeaPath = partenopeaJustMePath(locale);
  const dec31Path = `${lp}/${eventsDir}/${getLocalizedEventSlug35('capodanno-justme-milano-torre-branca', locale)}`;

  const eventbriteUrl = getJustSingingEventbriteUrl(locale);
  const whatsappConfirmUrl = getJustSingingWhatsappConfirmUrl(locale);
  const whatsappDinnerUrl = getJustSingingDinnerWhatsappUrl(locale);

  const seoImages = buildSeoEventImagePack({
    locale,
    eventSlug: canonicalSlug,
    venueName: JUST_SINGING_RAIN_VENUE.name,
    h1: c.h1,
    h2List: [c.overviewHeading, c.formatsHeading],
    h3List: [c.timelineHeading, c.howToHeading],
    categorySlug: 'special-event',
    music: 'Commercial · Hip Hop · R&B',
    dressCode: '18+ Smart Club Attire',
    posterSrc: JUST_SINGING_RAIN_POSTER_SRC,
    customAssetKeys: [...JUST_SINGING_RAIN_FLOW_ASSET_KEYS],
    shotLabels: c.heroLabels,
  });

  const extraSlugPart = canonicalSlug.slice(0, 64);
  const extraGalleryItems = [
    {
      src: `/images/seo-events/${locale}/${JUST_SINGING_RAIN_EXTRA_ASSET_KEYS[0]}--${extraSlugPart}.webp`,
      title: `${c.h1} · ${c.dressLogisticsHeading}`,
      alt: `${c.h1} (${c.dressLogisticsHeading}) - ${JUST_SINGING_RAIN_VENUE.name}`,
      description: `${c.offerPhrase} · ${JUST_SINGING_RAIN_VENUE.name} (${c.ageDressBadge}) · WhatsApp ${JUST_SINGING_RAIN_VENUE.whatsapp}.`,
    },
    {
      src: `/images/seo-events/${locale}/${JUST_SINGING_RAIN_EXTRA_ASSET_KEYS[1]}--${extraSlugPart}.webp`,
      title: `${c.h1} · Commercial, Hip Hop & R&B (19:30 – 05:00)`,
      alt: `${c.h1} - Commercial, Hip Hop & R&B @ ${JUST_SINGING_RAIN_VENUE.name}`,
      description: `${c.metaTitle} · ${JUST_SINGING_RAIN_VENUE.address} · WhatsApp ${JUST_SINGING_RAIN_VENUE.whatsapp}.`,
    },
  ];
  const fullGallery = [...seoImages.gallery, ...extraGalleryItems];
  const allSchemaImages = [
    ...seoImages.schemaImages,
    ...extraGalleryItems.map((g) => ({
      '@type': 'ImageObject' as const,
      url: `${BASE_URL}${g.src}`,
      contentUrl: `${BASE_URL}${g.src}`,
      name: g.title,
      caption: g.alt,
      description: g.description,
    })),
  ];

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: c.homeLabel, item: `${BASE_URL}${lp || '/'}` },
      { '@type': 'ListItem', position: 2, name: c.eventsLabel, item: `${BASE_URL}${lp}/${eventsDir}` },
      { '@type': 'ListItem', position: 3, name: c.h1, item: canonicalUrl },
    ],
  };

  const eventJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: c.h1,
    description: c.metaDescription,
    startDate: JUST_SINGING_RAIN_START_ISO,
    endDate: JUST_SINGING_RAIN_END_ISO,
    isAccessibleForFree: true,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: allSchemaImages,
    location: {
      '@type': 'Place',
      name: JUST_SINGING_RAIN_VENUE.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: JUST_SINGING_RAIN_VENUE.streetAddress,
        addressLocality: JUST_SINGING_RAIN_VENUE.city,
        postalCode: JUST_SINGING_RAIN_VENUE.postalCode,
        addressCountry: 'IT',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: JUST_SINGING_RAIN_VENUE.latitude,
        longitude: JUST_SINGING_RAIN_VENUE.longitude,
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Nightlife Milan',
      url: BASE_URL,
      telephone: JUST_SINGING_RAIN_VENUE.whatsapp,
    },
    offers: {
      '@type': 'Offer',
      name: `${c.offerPhrase} (until 00:30 · Nightlife Milan)`,
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: eventbriteUrl || canonicalUrl,
      validFrom: '2026-11-25T00:00:00+01:00',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const mapEmbedUrl = `https://www.google.com/maps?q=${JUST_SINGING_RAIN_VENUE.latitude},${JUST_SINGING_RAIN_VENUE.longitude}&hl=${encodeURIComponent(locale)}&z=16&output=embed`;

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
        <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-white/60">
          <li>
            <Link href={lp || '/'} className="transition-colors hover:text-[#EAE3D5]">
              {c.homeLabel}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`${lp}/${eventsDir}`} className="transition-colors hover:text-[#EAE3D5]">
              {c.eventsLabel}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`${lp}/${eventsDir}/special`} className="transition-colors hover:text-[#EAE3D5]">
              {c.specialLabel}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-[#EAE3D5]">{c.dateBadge}</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <header className="mx-auto max-w-[1440px] border-x border-b border-white/10 px-5 pb-12 sm:px-14">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-champagne/40 bg-champagne/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-champagne">
                <Umbrella className="h-3.5 w-3.5" />
                {c.themeTag}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs text-white/85">
                <Calendar className="h-3.5 w-3.5 text-champagne" />
                {c.dateBadge}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/35 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-200">
                <ShieldCheck className="h-3.5 w-3.5" />
                {c.ageDressBadge}
              </span>
            </div>

            <h1 className="font-serif text-3xl font-normal leading-tight tracking-tight text-[#F6F1E7] sm:text-5xl">
              {c.h1}
            </h1>

            <p className="font-sans text-sm leading-relaxed text-[#EAE3D5]/90 sm:text-base">
              {c.subtitle}
            </p>

            <p className="rounded-lg border border-champagne/30 bg-white/[0.03] px-4 py-3 font-mono text-xs tabular-nums tracking-wide text-champagne sm:text-sm">
              {c.priceBadge}
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={whatsappConfirmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-sm bg-[#25D366] px-5 py-3 text-sm font-bold uppercase tracking-wider text-[#050505] transition-opacity hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" />
                {c.ctaWhatsappLabel}
              </a>

              {eventbriteUrl ? (
                <a
                  href={eventbriteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-sm bg-[#EAE3D5] px-5 py-3 text-sm font-bold uppercase tracking-wider text-[#050505] transition-colors hover:bg-white"
                >
                  <Ticket className="h-4 w-4" />
                  {c.ctaEventbriteLabel}
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <a
                  href={whatsappDinnerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-sm border border-[#EAE3D5]/50 bg-[#141311] px-5 py-3 text-sm font-bold uppercase tracking-wider text-[#F6F1E7] transition-colors hover:border-[#EAE3D5] hover:bg-[#1E1C19]"
                >
                  <UtensilsCrossed className="h-4 w-4 text-champagne" />
                  {c.ctaDinnerWhatsappLabel}
                </a>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
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

        {/* Quick Facts — 1 col below md:, hairline dividers */}
        <dl className="mt-8 grid grid-cols-1 divide-y divide-white/10 border-t border-white/15 pt-2 md:grid-cols-2 md:gap-x-8 md:divide-y-0 lg:grid-cols-3">
          {c.quickFacts.map((fact) => (
            <div
              key={fact.label}
              className="py-3 md:border-b md:border-white/10"
            >
              <dt className="font-mono text-[11px] uppercase tracking-wider text-champagne/90">
                {fact.label}
              </dt>
              <dd className="mt-1 font-sans text-sm font-medium text-[#F6F1E7]">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Jump TOC */}
        <nav
          aria-label={c.tocTitle}
          className="mt-8 border-t border-white/15 pt-5"
        >
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-champagne">
            <ListChecks className="h-4 w-4" />
            <span>{c.tocTitle}</span>
          </div>
          <ol className="mt-3 flex gap-2 overflow-x-auto pb-1.5 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-2.5 md:overflow-visible md:pb-0">
            {c.tocItems.map((item) => (
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

      {/* 2-Step Eventbrite + WhatsApp Strip — Alternativa 02 Capitolo Carta Calda #F6F1E7 */}
      <section
        id="how-to-enter"
        className="w-full scroll-mt-24 border-y border-[#050505] bg-[#F6F1E7] text-[#050505]"
      >
        <div className="mx-auto max-w-[1440px] space-y-6 border-x border-[#050505]/18 px-5 py-10 sm:px-14">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#4A453E]">
              <Sparkles className="h-4 w-4 text-[#050505]" />
              <span>Nightlife Milan Official Accreditation · 0 €</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#050505] sm:text-4xl">
              {c.howToHeading}
            </h2>
            <p className="font-sans text-sm text-[#3D3830] sm:text-base">{c.howToSubheading}</p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {c.howToSteps.map((step) => (
              <div
                key={step.stepNumber}
                className="flex flex-col justify-between space-y-5 border border-[#050505] bg-[#FFFFFF] p-6 text-[#050505]"
              >
                <div className="space-y-3">
                  <span className="inline-flex items-center bg-[#050505] px-3 py-1 font-mono text-xs font-bold text-[#F6F1E7]">
                    {step.stepNumber}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#050505] sm:text-2xl">{step.title}</h3>
                  <p className="font-sans text-sm leading-relaxed text-[#24201B]">{step.detail}</p>
                </div>

                <div className="bg-[#050505] p-1.5 sm:w-fit">
                  {step.ctaKind === 'eventbrite' && eventbriteUrl ? (
                    <a
                      href={eventbriteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 bg-[#EAE3D5] px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#050505] transition-colors hover:bg-[#F6F1E7] sm:w-auto"
                    >
                      <Ticket className="h-4 w-4" />
                      {step.ctaLabel}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <a
                      href={whatsappConfirmUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 bg-[#25D366] px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#050505] transition-colors hover:bg-[#2EE472] sm:w-auto"
                    >
                      <MessageCircle className="h-4 w-4" />
                      {step.ctaKind === 'eventbrite' ? c.ctaWhatsappLabel : step.ctaLabel}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="border border-[#050505]/25 bg-[#EAE3D5] px-4 py-3 font-sans text-xs font-medium leading-relaxed text-[#050505] sm:text-sm">
            {c.whatsappTemplateNote}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] space-y-16 border-x border-white/10 px-5 py-14 sm:px-14">
        {/* Section 1: Overview & Storytelling */}
        <section id="overview" className="scroll-mt-24 space-y-8">
          <div className="max-w-4xl space-y-4">
            <h2 className="font-serif text-3xl font-normal text-[#F6F1E7] sm:text-4xl">
              {c.overviewHeading}
            </h2>
            <div className="space-y-4 font-sans text-base leading-relaxed text-[#C2B9AA]">
              {c.overviewParagraphs.map((para, idx) => (
                <p key={idx} className={idx === 0 ? 'text-[#F6F1E7] font-medium' : undefined}>
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Section 4: Evening Timeline */}
          <div
            id="evening-timeline"
            className="scroll-mt-24 rounded-xl border border-white/15 bg-white/[0.025] p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-champagne">
              <Clock className="h-4 w-4" />
              <span>{c.timelineSubheading}</span>
            </div>
            <h3 className="mt-2 font-serif text-2xl text-[#F6F1E7]">{c.timelineHeading}</h3>
            <div className="mt-6 space-y-4">
              {c.timelineSteps.map((step) => (
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

        {/* Section 3: Aperitivo, Dinner on Request & Club Night */}
        <section id="three-formats" className="scroll-mt-24 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-champagne">
              <UtensilsCrossed className="h-4 w-4" />
              <span>19:30 – 05:00 · Commercial · Hip Hop · R&B</span>
            </div>
            <h2 className="font-serif text-3xl font-normal text-[#F6F1E7] sm:text-4xl">
              {c.formatsHeading}
            </h2>
            <p className="font-sans text-base text-[#C2B9AA]">{c.formatsSubheading}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {c.formats.map((fmt) => (
              <div
                key={fmt.id}
                className="flex flex-col justify-between rounded-xl border border-white/15 bg-white/[0.03] p-6 space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full border border-champagne/35 bg-champagne/10 px-2.5 py-0.5 font-mono text-[11px] uppercase text-champagne">
                      {fmt.badge}
                    </span>
                    <span className="font-mono text-xs text-white/65">{fmt.timing}</span>
                  </div>
                  <h3 className="font-serif text-xl text-[#F6F1E7]">{fmt.title}</h3>
                  <p className="font-sans text-sm leading-relaxed text-[#C2B9AA]">{fmt.summary}</p>
                  <ul className="space-y-1.5 border-t border-white/10 pt-3">
                    {fmt.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 font-sans text-xs text-white/85"
                      >
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-champagne" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {fmt.ctaKind === 'whatsapp' ? (
                  <a
                    href={whatsappDinnerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-sm bg-[#25D366] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#050505] transition-opacity hover:opacity-90"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    {fmt.ctaLabel}
                  </a>
                ) : eventbriteUrl ? (
                  <a
                    href={eventbriteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-sm bg-[#EAE3D5] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#050505] transition-colors hover:bg-white"
                  >
                    <Ticket className="h-3.5 w-3.5" />
                    {fmt.ctaLabel}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <a
                    href={whatsappConfirmUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-sm bg-[#25D366] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#050505] transition-opacity hover:opacity-90"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    {c.ctaWhatsappLabel}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Google Flow 4 Real Venue SEO Gallery */}
        <section
          aria-label={seoImages.sectionHeading}
          data-seo-flow-gallery="just-singing-rain-justme-2026"
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

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {fullGallery.map((item) => (
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

        {/* Section 5 & 6: 18+ Dress Code & Rainy-Night Logistics */}
        <section id="dress-code-18plus" className="scroll-mt-24 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-champagne">
              <Music className="h-4 w-4" />
              <span>Commercial · Hip Hop · R&B · 18+</span>
            </div>
            <h2 className="font-serif text-3xl font-normal text-[#F6F1E7] sm:text-4xl">
              {c.dressLogisticsHeading}
            </h2>
            <p className="font-sans text-base text-[#C2B9AA]">{c.dressLogisticsSubheading}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-emerald-400/25 bg-emerald-500/5 p-6 space-y-3">
              <h3 className="flex items-center gap-2 font-serif text-xl text-emerald-300">
                <CheckCircle2 className="h-5 w-5" />
                {c.dressCodeOkTitle}
              </h3>
              <ul className="space-y-2">
                {c.dressCodeOkItems.map((item) => (
                  <li key={item} className="font-sans text-sm text-[#F6F1E7]/90">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-rose-400/25 bg-rose-500/5 p-6 space-y-3">
              <h3 className="flex items-center gap-2 font-serif text-xl text-rose-300">
                <XCircle className="h-5 w-5" />
                {c.dressCodeNoTitle}
              </h3>
              <ul className="space-y-2">
                {c.dressCodeNoItems.map((item) => (
                  <li key={item} className="font-sans text-sm text-[#F6F1E7]/90">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div id="getting-there-dry" className="scroll-mt-24 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-6">
              <h3 className="flex items-center gap-2 font-serif text-2xl text-[#F6F1E7]">
                <MapPin className="h-5 w-5 text-champagne" />
                <span>{c.logisticsHeading}</span>
              </h3>
              {c.logisticsParagraphs.map((p, i) => (
                <p key={i} className="font-sans text-sm leading-relaxed text-[#C2B9AA] sm:text-base">
                  {p}
                </p>
              ))}
              <dl className="grid grid-cols-1 divide-y divide-white/10 border-t border-white/10 pt-2 md:grid-cols-2 md:gap-x-6 md:divide-y-0">
                {c.logisticsFacts.map((lf) => (
                  <div
                    key={lf.label}
                    className="py-3 md:border-b md:border-white/10"
                  >
                    <dt className="font-mono text-[11px] uppercase text-champagne">{lf.label}</dt>
                    <dd className="mt-1 font-sans text-xs text-[#F6F1E7]">{lf.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="space-y-3 lg:col-span-6">
              <h3 className="font-serif text-2xl text-[#F6F1E7]">{c.mapHeading}</h3>
              <EventVenueMap
                id="just-singing-rain-justme-map"
                mapUrl={mapEmbedUrl}
                labels={c.mapLabels}
              />
            </div>
          </div>
        </section>

        {/* Internal Cross-Links: Just Me Dossier, Nov 26 Thanksgiving, Nov 27 Partenopea & Dec 31 NYE */}
        <section
          data-no-lightbox="true"
          data-event-crosslink-cards="just-singing-justme"
          className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-white/15 bg-white/[0.03] p-5 space-y-4">
            <div className="space-y-4">
              <Link
                href={justMeClubPath}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-lg border border-white/10 bg-[#050505]"
              >
                <Image
                  src="/images/venues/just-me-milano/just-me-milano-torre-branca-01.webp"
                  alt={c.venueBannerTitle}
                  fill
                  quality={92}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </Link>
              <div className="space-y-1.5">
                <p className="font-mono text-[11px] uppercase text-champagne">
                  {c.venueBannerEyebrow}
                </p>
                <h3 className="font-serif text-lg text-[#F6F1E7]">{c.venueBannerTitle}</h3>
                <p className="font-sans text-xs text-[#C2B9AA]">{c.venueBannerDesc}</p>
              </div>
            </div>
            <Link
              href={justMeClubPath}
              className="inline-flex min-h-[44px] items-center gap-1.5 font-mono text-xs font-bold uppercase text-champagne hover:underline"
            >
              {c.venueCta} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-white/15 bg-white/[0.03] p-5 space-y-4">
            <div className="space-y-4">
              <Link
                href={thanksgivingPath}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-lg border border-white/10 bg-[#050505]"
              >
                <Image
                  src="/images/events/cards-4x5/thanksgiving-2026/thanksgiving-justme-milano-2026.webp"
                  alt={c.thanksgivingBannerTitle}
                  fill
                  quality={92}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </Link>
              <div className="space-y-1.5">
                <p className="font-mono text-[11px] uppercase text-champagne">
                  {c.thanksgivingBannerEyebrow}
                </p>
                <h3 className="font-serif text-lg text-[#F6F1E7]">{c.thanksgivingBannerTitle}</h3>
                <p className="font-sans text-xs text-[#C2B9AA]">{c.thanksgivingBannerDesc}</p>
              </div>
            </div>
            <Link
              href={thanksgivingPath}
              className="inline-flex min-h-[44px] items-center gap-1.5 font-mono text-xs font-bold uppercase text-champagne hover:underline"
            >
              {c.thanksgivingBannerCta} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-white/15 bg-white/[0.03] p-5 space-y-4">
            <div className="space-y-4">
              <Link
                href={partenopeaPath}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-lg border border-white/10 bg-[#050505]"
              >
                <Image
                  src="/images/events/cards-4x5/partenopea-2026/cena-spettacolo-partenopea-justme-milano-2026.webp"
                  alt={c.partenopeaBannerTitle}
                  fill
                  quality={92}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </Link>
              <div className="space-y-1.5">
                <p className="font-mono text-[11px] uppercase text-champagne">
                  {c.partenopeaBannerEyebrow}
                </p>
                <h3 className="font-serif text-lg text-[#F6F1E7]">{c.partenopeaBannerTitle}</h3>
                <p className="font-sans text-xs text-[#C2B9AA]">{c.partenopeaBannerDesc}</p>
              </div>
            </div>
            <Link
              href={partenopeaPath}
              className="inline-flex min-h-[44px] items-center gap-1.5 font-mono text-xs font-bold uppercase text-champagne hover:underline"
            >
              {c.partenopeaBannerCta} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-white/15 bg-white/[0.03] p-5 space-y-4">
            <div className="space-y-4">
              <Link
                href={dec31Path}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-lg border border-white/10 bg-[#050505]"
              >
                <Image
                  src="/images/events/cards-4x5/capodanno-2027-posters/capodanno-justme-milano-torre-branca.webp"
                  alt={c.dec31BannerTitle}
                  fill
                  quality={92}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </Link>
              <div className="space-y-1.5">
                <p className="font-mono text-[11px] uppercase text-champagne">
                  {c.dec31BannerEyebrow}
                </p>
                <h3 className="font-serif text-lg text-[#F6F1E7]">{c.dec31BannerTitle}</h3>
                <p className="font-sans text-xs text-[#C2B9AA]">{c.dec31BannerDesc}</p>
              </div>
            </div>
            <Link
              href={dec31Path}
              className="inline-flex min-h-[44px] items-center gap-1.5 font-mono text-xs font-bold uppercase text-champagne hover:underline"
            >
              {c.dec31BannerCta} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        {/* Section 7: 12 FAQs — Alternativa 02 Capitolo Carta Calda #F6F1E7 */}
        <section id="faqs" className="scroll-mt-24 border-2 border-[#050505] bg-[#F6F1E7] p-6 text-[#050505] sm:p-10">
          <h2 className="font-serif text-2xl font-bold text-[#050505] sm:text-4xl">
            {c.faqHeading}
          </h2>
          <div className="mt-5 divide-y divide-[#050505]/15 border-y border-[#050505]/15 bg-[#FFFFFF] px-5">
            {c.faqs.map((faq, idx) => (
              <details key={faq.q} open={idx < 2} className="group py-4">
                <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 marker:hidden">
                  <h3 className="font-serif text-base font-bold text-[#050505] sm:text-lg">{faq.q}</h3>
                  <span className="font-mono text-xl font-bold text-[#050505] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
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
        pageKey="justme-just-singing-in-the-rain-2026"
        pagePath={canonicalPath}
      />
    </article>
  );
}
