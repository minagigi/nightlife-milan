import Image from 'next/image';
import {
  ArrowRight,
  Calendar,
  Car,
  CheckCircle2,
  Clock,
  ListChecks,
  MapPin,
  MessageCircle,
  Music,
  ShieldCheck,
  Sparkles,
  Wine,
} from 'lucide-react';
import EditorialPageSections from '@/components/EditorialPageSections';
import EventVenueMap from '@/components/EventVenueMap';
import Link from '@/components/LocalizedLink';
import {
  computeActiveNightWindowISO,
  getBergamoBresciaNightLocalized,
} from '@/lib/bergamo-brescia/activeNights35';
import { getEventVenueCopy } from '@/lib/i18n/eventVenueCopy';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { getLocaleDef, localePrefix, type LocaleCode } from '@/lib/i18n/localeRegistry';
import { buildSeoEventImagePack } from '@/lib/seoEventImages';
import { notFound } from 'next/navigation';

const BASE_URL = process.env.APP_URL || 'https://nightlifemilan.com';

export default function BergamoBresciaEventDetailView({
  idOrSlug,
  locale: rawLocale,
}: {
  idOrSlug: string;
  locale: LocaleCode | string;
}) {
  const locale: LocaleCode = getLocaleDef(rawLocale)?.code || 'en';
  const detail = getBergamoBresciaNightLocalized(idOrSlug, locale);
  if (!detail) notFound();

  const { seed, ui } = detail;
  const win = computeActiveNightWindowISO(seed, new Date());
  const lp = localePrefix(locale);
  const eventsDir = getLocalizedDir35('events', locale);
  const canonicalUrl = `${BASE_URL}${detail.canonicalPath}`;
  const mapCopy = getEventVenueCopy(locale);

  const isIt = locale === 'it';
  const dress = isIt ? seed.dressIt : seed.dressEn;
  const highway = isIt ? seed.highwayExitIt : seed.highwayExitEn;
  const fullAddr = `${seed.streetAddress}, ${seed.postalCode} ${seed.city} (${seed.province})`;

  const seoImages = buildSeoEventImagePack({
    locale,
    eventSlug: detail.slug,
    venueName: seed.venueName,
    h1: detail.h1,
    h2List: [ui.overviewHeading, ui.tiersHeading],
    h3List: [ui.scheduleHeading, ui.mapHeading],
    categorySlug: seed.hasDinner ? 'dinner-show' : 'club-night',
    music: seed.genres.join(' · '),
    dressCode: `${seed.minAge} · ${dress}`,
    posterSrc: seed.posterSrc,
    customAssetKeys: [...seed.assetKeys],
  });

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: ui.homeLabel, item: `${BASE_URL}${lp || '/'}` },
      { '@type': 'ListItem', position: 2, name: ui.eventsLabel, item: `${BASE_URL}${lp}/${eventsDir}` },
      { '@type': 'ListItem', position: 3, name: ui.hubLabel, item: `${BASE_URL}${detail.hubPath}` },
      { '@type': 'ListItem', position: 4, name: detail.h1, item: canonicalUrl },
    ],
  };

  const eventJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: detail.h1,
    description: detail.metaDescription,
    url: canonicalUrl,
    startDate: win.startISO,
    endDate: win.endISO,
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
      name: `${seed.venueName} Resident & Guest DJs`,
    },
    organizer: {
      '@type': 'Organization',
      name: 'Nightlife Milan',
      url: BASE_URL,
      telephone: '+393519127047',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: detail.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  const mapEmbedUrl = `https://maps.google.com/maps?q=${seed.latitude},${seed.longitude}&hl=${encodeURIComponent(locale)}&z=15&output=embed`;

  const quickFacts = [
    {
      label: isIt ? 'Locale & Provincia' : 'Venue & Province',
      value: `${seed.venueName} · ${seed.city} (${seed.province})`,
    },
    {
      label: isIt ? 'Quando & Orari' : 'Schedule & Doors',
      value: detail.whenLabel,
    },
    {
      label: isIt ? 'Musica & Sale' : 'Music & Format',
      value: seed.genres.join(' · '),
    },
    {
      label: isIt ? 'Età & Dress Code' : 'Age & Dress Code',
      value: `${seed.minAge} · ${dress}`,
    },
    {
      label: isIt ? 'Uscita Autostrada A4' : 'A4 Motorway Exit',
      value: `${highway} (~${seed.driveMinutesFromMilan} min Milano)`,
    },
    {
      label: isIt ? 'Tavoli VIP & Liste' : 'VIP Tables & List',
      value: `${ui.uponRequest} · +39 351 912 7047`,
    },
  ];

  const tocItems = [
    { id: 'panoramica', label: ui.tocOverview },
    { id: 'programma-orari', label: ui.tocSchedule },
    { id: 'formule-tavoli', label: ui.tocTiers },
    { id: 'galleria-seo', label: ui.tocGallery },
    { id: 'mappa-logistica', label: ui.tocMap },
    { id: 'faq-evento', label: ui.tocFaq },
  ];

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
              {ui.homeLabel}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`${lp}/${eventsDir}`} className="transition-colors hover:text-[#EAE3D5]">
              {ui.eventsLabel}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={detail.hubPath} className="transition-colors hover:text-[#EAE3D5]">
              {ui.hubLabel}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-[#EAE3D5]">{seed.venueName}</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <header className="mx-auto max-w-[1440px] border-x border-b border-white/10 px-5 pb-12 sm:px-14">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 border border-[#EAE3D5]/40 bg-[#141311] px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#EAE3D5]">
                <Sparkles className="h-3.5 w-3.5" />
                {detail.badgeText}
              </span>
              <span className="inline-flex items-center gap-1.5 border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs text-white/90">
                <Calendar className="h-3.5 w-3.5 text-[#EAE3D5]" />
                {detail.whenLabel}
              </span>
              <span className="inline-flex items-center gap-1.5 border border-emerald-400/35 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-200">
                <ShieldCheck className="h-3.5 w-3.5" />
                {seed.minAge}
              </span>
            </div>

            <h1 className="font-serif text-3xl font-normal leading-tight tracking-tight text-[#F6F1E7] sm:text-5xl">
              {detail.h1}
            </h1>

            <p className="font-sans text-sm leading-relaxed text-[#EAE3D5] sm:text-base">
              {detail.subtitle}
            </p>

            {/* Quick Answer AI/GEO Box */}
            <p className="border-l-2 border-[#EAE3D5] bg-[#141311] px-4 py-3.5 font-sans text-sm leading-relaxed text-[#EAE3D5]">
              {detail.quickAnswer}
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={detail.waMainUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center gap-2 bg-[#25D366] px-6 py-3 text-sm font-extrabold uppercase tracking-wider text-[#050505] transition-colors hover:bg-[#2EE472]"
              >
                <MessageCircle className="h-4 w-4" />
                {ui.bookWaCta}
              </a>

              <Link
                href={detail.clubPath}
                className="inline-flex min-h-[48px] items-center gap-2 bg-[#EAE3D5] px-5 py-3 text-sm font-extrabold uppercase tracking-wider text-[#050505] transition-colors hover:bg-white"
              >
                {ui.openClubCta}
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href={detail.nyePath}
                className="inline-flex min-h-[48px] items-center gap-2 border border-[#EAE3D5]/45 bg-[#141311] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#F6F1E7] transition-colors hover:border-[#EAE3D5] hover:bg-[#1E1C19]"
              >
                {ui.openNyeCta}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5" data-no-lightbox="true">
            <div className="aspect-[4/5] w-full overflow-hidden border border-[#EAE3D5]/30 bg-[#050505]">
              <Image
                src={seoImages.poster.src}
                alt={seoImages.poster.alt}
                title={seoImages.poster.title}
                width={1080}
                height={1350}
                priority
                fetchPriority="high"
                quality={92}
                sizes="(max-width: 1080px) 100vw, 540px"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Quick Facts */}
        <dl className="mt-8 grid grid-cols-1 divide-y divide-white/10 border-t border-white/15 pt-2 md:grid-cols-2 md:gap-x-8 md:divide-y-0 lg:grid-cols-3">
          {quickFacts.map((fact) => (
            <div key={fact.label} className="py-3 md:border-b md:border-white/10">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-[#EAE3D5]/85">
                {fact.label}
              </dt>
              <dd className="mt-1 font-sans text-sm font-medium text-[#F6F1E7]">{fact.value}</dd>
            </div>
          ))}
        </dl>

        {/* Jump TOC */}
        <nav aria-label={ui.tocTitle} className="mt-8 border-t border-white/15 pt-5">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#EAE3D5]">
            <ListChecks className="h-4 w-4" />
            <span>{ui.tocTitle}</span>
          </div>
          <ol className="mt-3 flex gap-2 overflow-x-auto pb-1.5 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-2.5 md:overflow-visible md:pb-0">
            {tocItems.map((item) => (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  className="inline-flex min-h-[38px] items-center gap-2 border border-white/15 bg-[#141311] px-3.5 py-1.5 font-sans text-xs font-semibold text-[#F6F1E7] transition-colors hover:border-[#EAE3D5] hover:text-[#EAE3D5] sm:text-sm"
                >
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </header>

      {/* Warm Paper Chapter Strip — Booking & Cross-Link */}
      <section className="w-full border-y border-[#050505] bg-[#F6F1E7] text-[#050505]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 border-x border-[#050505]/18 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-14">
          <div className="space-y-1.5">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#4A453E]">
              {seed.venueName} · {fullAddr}
            </p>
            <p className="font-serif text-xl font-bold text-[#050505] sm:text-2xl">
              {ui.tiersHeading}: {ui.uponRequest}
            </p>
            <p className="font-sans text-xs text-[#24201B] sm:text-sm">
              WhatsApp Concierge +39 351 912 7047 · {highway}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3 bg-[#050505] p-2">
            <a
              href={detail.waMainUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[46px] items-center gap-2 bg-[#25D366] px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#050505] transition-colors hover:bg-[#2EE472]"
            >
              <MessageCircle className="h-4 w-4" />
              {ui.bookWaCta}
            </a>
            <Link
              href={detail.hubPath}
              className="inline-flex min-h-[46px] items-center gap-2 bg-[#EAE3D5] px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#050505] transition-colors hover:bg-white"
            >
              {ui.openHubCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] space-y-16 border-x border-white/10 px-5 py-14 sm:px-14">
        {/* 1. Overview + 2. Timeline */}
        <section id="panoramica" className="scroll-mt-24 space-y-8">
          <div className="max-w-4xl space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#EAE3D5]">
              <Music className="h-4 w-4" />
              <span>{seed.genres.join(' · ')}</span>
            </div>
            <h2 className="font-serif text-3xl font-normal text-[#F6F1E7] sm:text-4xl">
              {ui.overviewHeading}
            </h2>
            <div className="space-y-4 font-sans text-base leading-relaxed text-[#C2B9AA]">
              {detail.overviewParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          <div
            id="programma-orari"
            className="scroll-mt-24 border border-white/15 bg-[#141311] p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#EAE3D5]">
              <Clock className="h-4 w-4" />
              <span>{detail.whenLabel}</span>
            </div>
            <h3 className="mt-2 font-serif text-2xl text-[#F6F1E7]">{ui.scheduleHeading}</h3>
            <div className="mt-6 space-y-4">
              {detail.scheduleSteps.map((step) => (
                <div
                  key={step.time}
                  className="flex flex-col gap-2 border border-white/10 bg-[#050505] p-4 sm:flex-row sm:items-start sm:gap-6"
                >
                  <span className="shrink-0 border border-[#EAE3D5]/40 bg-[#141311] px-3 py-1 font-mono text-xs font-bold text-[#EAE3D5]">
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

        {/* 3. Entry, Dinner & VIP Privé Tiers */}
        <section id="formule-tavoli" className="scroll-mt-24 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#EAE3D5]">
              <Wine className="h-4 w-4" />
              <span>{seed.venueName} · WhatsApp +39 351 912 7047</span>
            </div>
            <h2 className="font-serif text-3xl font-normal text-[#F6F1E7] sm:text-4xl">
              {ui.tiersHeading}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {detail.tiers.map((tier) => (
              <div
                key={tier.title}
                className="flex flex-col justify-between space-y-5 border border-white/15 bg-[#141311] p-6"
              >
                <div className="space-y-3">
                  <span className="inline-block border border-[#EAE3D5]/35 bg-[#050505] px-2.5 py-1 font-mono text-[11px] font-semibold uppercase text-[#EAE3D5]">
                    {tier.badge}
                  </span>
                  <h3 className="font-serif text-xl text-[#F6F1E7]">{tier.title}</h3>
                  <p className="font-sans text-sm leading-relaxed text-[#C2B9AA]">{tier.detail}</p>
                </div>

                <a
                  href={tier.waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 bg-[#25D366] px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#050505] transition-colors hover:bg-[#2EE472]"
                >
                  <MessageCircle className="h-4 w-4" />
                  {ui.bookWaCta}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Real Venue & Outfit 16:9 SEO Gallery */}
        <section
          id="galleria-seo"
          aria-label={seoImages.sectionHeading}
          data-seo-flow-gallery={`bg-bs-${seed.id}`}
          className="scroll-mt-24 space-y-6 border border-white/15 bg-[#141311] p-6 sm:p-8"
        >
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#EAE3D5]">
              {seoImages.eyebrow}
            </p>
            <h2 className="font-serif text-2xl font-normal text-[#F6F1E7] sm:text-3xl">
              {seoImages.sectionHeading}
            </h2>
            <p className="font-sans text-sm text-[#C2B9AA]">{seoImages.sectionSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2" data-no-lightbox="true">
            {seoImages.gallery.map((item) => (
              <figure
                key={item.src}
                className="overflow-hidden border border-white/15 bg-[#050505]"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#050505]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    title={item.title}
                    width={1920}
                    height={1080}
                    quality={92}
                    sizes="(max-width: 768px) 100vw, 680px"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="space-y-2 p-4">
                  <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-[#EAE3D5]">
                    <span className="border border-white/15 bg-[#141311] px-2 py-0.5">
                      {item.targetBadge}
                    </span>
                    <span className="border border-white/15 bg-[#141311] px-2 py-0.5">
                      {item.outfitBadge}
                    </span>
                  </div>
                  <div className="font-serif text-base text-[#F6F1E7]">{item.title}</div>
                  <p className="font-sans text-xs leading-relaxed text-[#C2B9AA]">
                    {item.description}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 5. A4 Motorway Access, Parking & Interactive Map */}
        <section id="mappa-logistica" className="scroll-mt-24 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#EAE3D5]">
              <Car className="h-4 w-4" />
              <span>{fullAddr}</span>
            </div>
            <h2 className="font-serif text-3xl font-normal text-[#F6F1E7] sm:text-4xl">
              {ui.mapHeading}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {seoImages.ux.logistics.items.map((logItem) => (
              <div
                key={logItem.label}
                className="space-y-2 border border-white/15 bg-[#141311] p-5"
              >
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-[#EAE3D5]">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>{logItem.label}</span>
                </div>
                <p className="font-sans text-sm leading-relaxed text-[#C2B9AA]">{logItem.text}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border border-white/15 bg-[#141311] p-5">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#EAE3D5]" />
              <div>
                <div className="font-serif text-lg text-[#F6F1E7]">{seed.venueName}</div>
                <div className="font-sans text-sm text-[#C2B9AA]">
                  {fullAddr} · {highway}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={detail.clubPath}
                className="inline-flex min-h-[42px] items-center gap-2 bg-[#EAE3D5] px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-[#050505] hover:bg-white"
              >
                {ui.openClubCta}
              </Link>
              <Link
                href={detail.nyePath}
                className="inline-flex min-h-[42px] items-center gap-2 border border-[#EAE3D5]/45 bg-[#050505] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#F6F1E7] hover:border-[#EAE3D5]"
              >
                {ui.openNyeCta}
              </Link>
            </div>
          </div>

          <EventVenueMap
            id={`map-${seed.id}`}
            mapUrl={mapEmbedUrl}
            labels={{
              loadMap: mapCopy.loadMap,
              mapTitle: `${seed.venueName} · ${seed.city} (${seed.province})`,
              privacyLoadNotice: mapCopy.privacyLoadNotice,
            }}
          />
        </section>

        {/* 6. FAQ Section */}
        <section id="faq-evento" className="scroll-mt-24 space-y-6">
          <h2 className="font-serif text-3xl font-normal text-[#F6F1E7] sm:text-4xl">
            {ui.faqHeading}
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {detail.faqs.map((faq) => (
              <div
                key={faq.q}
                className="space-y-2 border border-white/15 bg-[#141311] p-5"
              >
                <h3 className="font-serif text-lg text-[#F6F1E7]">{faq.q}</h3>
                <p className="font-sans text-sm leading-relaxed text-[#C2B9AA]">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <EditorialPageSections locale={locale} path={detail.canonicalPath} />
    </article>
  );
}
