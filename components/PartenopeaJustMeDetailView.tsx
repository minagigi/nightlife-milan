import Image from 'next/image';
import {
  ArrowRight,
  Calendar,
  Car,
  CheckCircle2,
  Clock,
  ExternalLink,
  ListChecks,
  MapPin,
  MessageCircle,
  Music,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
  Wine,
  XCircle,
} from 'lucide-react';
import EventVenueMap from '@/components/EventVenueMap';
import Link from '@/components/LocalizedLink';
import SeoAuthorityHub from '@/components/SeoAuthorityHub';
import { getPaymentTerms35 } from '@/lib/capodanno/paymentTerms35';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { getLocaleDef, localePrefix, type LocaleCode } from '@/lib/i18n/localeRegistry';
import { getLocalizedEventSlug35, getLocalizedVenueSlug35 } from '@/lib/i18n/localizedSlugs35';
import { orthodoxNyeJustMePath } from '@/lib/orthodox-nye/justme35';
import {
  getPartenopeaJustMeContent,
  PARTENOPEA_JUSTME_AFFILIATE_URL,
  PARTENOPEA_JUSTME_FLOW_ASSET_KEYS,
  PARTENOPEA_JUSTME_MENU_CARD_SRC,
  PARTENOPEA_JUSTME_POSTER_SRC,
  PARTENOPEA_JUSTME_SHUTTLE_MAP_URL,
  PARTENOPEA_JUSTME_TABLES_CARD_SRC,
  PARTENOPEA_JUSTME_VENUE,
  partenopeaJustMePath,
  partenopeaJustMeSlug,
} from '@/lib/partenopea/justme35';
import { buildSeoEventImagePack } from '@/lib/seoEventImages';
import { thanksgivingJustMePath } from '@/lib/thanksgiving/justme35';

const BASE_URL = 'https://nightlifemilan.com';

const JSON_LD_OFFERS = [
  {
    name: 'Cena Spettacolo Partenopea · Full €70 Menu + Party (19:30 Doors / 21:30 Dinner Show)',
    price: '70',
    source: 'whatsapp' as const,
  },
  {
    name: 'Aperitif + 1 Drink (19:30–21:30)',
    price: '15',
    source: 'xceed' as const,
  },
  {
    name: 'Club + 1 Drink · Friday Party (22:30–05:00)',
    price: '20',
    source: 'xceed' as const,
  },
  {
    name: 'Dehor Table (Entry strictly by 23:00)',
    price: '320',
    source: 'xceed' as const,
  },
  {
    name: 'Dance Floor Table',
    price: '640',
    source: 'xceed' as const,
  },
  {
    name: 'Central Table',
    price: '1280',
    source: 'xceed' as const,
  },
  {
    name: 'VIP Front Table',
    price: '3200',
    source: 'xceed' as const,
  },
  {
    name: 'DJ Table',
    price: '5000',
    source: 'xceed' as const,
  },
] as const;

export default function PartenopeaJustMeDetailView({
  locale: rawLocale,
}: {
  locale: LocaleCode | string;
}) {
  const locale: LocaleCode = getLocaleDef(rawLocale)?.code || 'en';
  const c = getPartenopeaJustMeContent(locale);
  const terms = getPaymentTerms35(locale);
  const lp = localePrefix(locale);
  const eventsDir = getLocalizedDir35('events', locale);
  const clubsDir = getLocalizedDir35('clubs', locale);
  const canonicalPath = partenopeaJustMePath(locale);
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;
  const canonicalSlug = partenopeaJustMeSlug(locale);
  const justMeClubPath = `${lp}/${clubsDir}/${getLocalizedVenueSlug35('v-justme', locale)}`;
  const thanksgivingPath = thanksgivingJustMePath(locale);
  const dec31Path = `${lp}/${eventsDir}/${getLocalizedEventSlug35('capodanno-justme-milano-torre-branca', locale)}`;
  const orthodoxPath = orthodoxNyeJustMePath(locale);

  const whatsappGeneralUrl = getConciergeBookingUrl(
    locale,
    'CSP · Cena Spettacolo Partenopea (Pineta Napoli) · JustMe Milano (27 Nov 2026)',
    canonicalPath,
  );
  const whatsappRestaurantUrl = getConciergeBookingUrl(
    locale,
    'Cena Spettacolo Partenopea 70€ & Tavolo Ristorante · JustMe Milano (27 Nov)',
    canonicalPath,
  );
  const whatsappVipFrontUrl = getConciergeBookingUrl(
    locale,
    'Tavoli VIP Front 3.200€ / DJ Table 5.000€ · CSP Partenopea JustMe Milano (27 Nov)',
    canonicalPath,
  );

  const seoImages = buildSeoEventImagePack({
    locale,
    eventSlug: canonicalSlug,
    venueName: PARTENOPEA_JUSTME_VENUE.name,
    h1: c.h1,
    h2List: [c.overviewHeading, c.dinnerHeading],
    h3List: [c.timelineHeading, c.tiersHeading],
    categorySlug: 'dinner-show',
    music: 'Live Music · Italian Dinner Show · House · Commercial Hits · Hip-Hop',
    dressCode: '21+ Elegant · Men long trousers mandatory',
    posterSrc: PARTENOPEA_JUSTME_POSTER_SRC,
    customAssetKeys: [...PARTENOPEA_JUSTME_FLOW_ASSET_KEYS],
    shotLabels: c.heroLabels,
  });

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
    startDate: '2026-11-27T19:30:00+01:00',
    endDate: '2026-11-28T05:00:00+01:00',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: seoImages.schemaImages,
    location: {
      '@type': 'Place',
      name: PARTENOPEA_JUSTME_VENUE.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: PARTENOPEA_JUSTME_VENUE.address,
        addressLocality: PARTENOPEA_JUSTME_VENUE.city,
        postalCode: PARTENOPEA_JUSTME_VENUE.postalCode,
        addressCountry: 'IT',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: PARTENOPEA_JUSTME_VENUE.latitude,
        longitude: PARTENOPEA_JUSTME_VENUE.longitude,
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Nightlife Milan',
      url: BASE_URL,
      telephone: PARTENOPEA_JUSTME_VENUE.whatsapp,
    },
    performer: [
      { '@type': 'Person', name: 'Voice John Vaccaro' },
      { '@type': 'Person', name: 'DJ Franky Dee' },
      { '@type': 'Person', name: 'DJ Antonio Marigliano' },
      { '@type': 'Organization', name: 'Pineta Napoli' },
    ],
    offers: JSON_LD_OFFERS.map((o) => ({
      '@type': 'Offer',
      name: o.name,
      price: o.price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: o.source === 'whatsapp' ? whatsappRestaurantUrl : PARTENOPEA_JUSTME_AFFILIATE_URL,
      validFrom: '2026-11-18T00:00:00+01:00',
    })),
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

  const mapEmbedUrl = `https://maps.google.com/maps?q=${PARTENOPEA_JUSTME_VENUE.latitude},${PARTENOPEA_JUSTME_VENUE.longitude}&hl=${encodeURIComponent(locale)}&z=16&output=embed`;

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
        className="mx-auto max-w-[1440px] border-x border-white/10 px-5 pt-28 pb-4 sm:px-14"
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
                <Sparkles className="h-3.5 w-3.5" />
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

            <p className="font-sans text-sm leading-relaxed text-[#EAE3D5]/85 sm:text-base">
              <em className="not-italic sm:italic text-[#F6F1E7]">{c.subtitle}</em>
            </p>

            <p className="rounded-lg border border-champagne/25 bg-white/[0.03] px-4 py-3 font-mono text-xs tabular-nums tracking-wide text-champagne sm:text-sm">
              {c.priceBadge}
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={PARTENOPEA_JUSTME_AFFILIATE_URL}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-sm bg-[#EAE3D5] px-5 py-3 text-sm font-bold uppercase tracking-wider text-[#050505] transition-colors hover:bg-white"
              >
                {c.ctaXceedLabel}
                <ExternalLink className="h-4 w-4" />
              </a>

              <a
                href={whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-sm border border-[#25D366]/45 bg-[#25D366]/15 px-5 py-3 text-sm font-semibold text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-[#050505]"
              >
                <MessageCircle className="h-4 w-4" />
                {c.ctaWhatsappLabel}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-xl border border-champagne/30 bg-[#050505] p-2">
              <Image
                src={seoImages.poster.src}
                alt={seoImages.poster.alt}
                title={seoImages.poster.title}
                width={1376}
                height={768}
                priority
                quality={92}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="h-auto w-full rounded-lg object-contain"
              />
            </div>
          </div>
        </div>

        {/* Quick Facts 6-Card Grid */}
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {c.quickFacts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3"
            >
              <div className="font-mono text-[11px] uppercase tracking-wider text-champagne/90">
                {fact.label}
              </div>
              <div className="mt-1 font-sans text-sm font-medium text-[#F6F1E7]">
                {fact.value}
              </div>
            </div>
          ))}
        </div>

        {/* Sticky/Jump TOC */}
        <nav
          aria-label={c.tocTitle}
          className="mt-8 rounded-xl border border-white/15 bg-white/[0.03] p-5"
        >
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-champagne">
            <ListChecks className="h-4 w-4" />
            <span>{c.tocTitle}</span>
          </div>
          <ol className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {c.tocItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="inline-flex items-center gap-2 font-sans text-sm text-white/85 transition-colors hover:text-champagne"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </header>

      {/* Official Xceed #249217 & 24/7 WhatsApp Dinner / VIP Booking Strip */}
      <section
        id="official-xceed-booking"
        className="mx-auto max-w-[1440px] scroll-mt-24 border-x border-b border-white/10 bg-[#0B0A09] px-5 py-6 sm:px-14"
      >
        <div className="flex flex-col gap-4 rounded-xl border border-champagne/30 bg-white/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-champagne">
              {c.tiersHeading}
            </p>
            <p className="font-sans text-sm text-[#EAE3D5]">{c.priceBadge}</p>
            <p className="font-sans text-xs text-[#C2B9AA]">{c.tiersSubheading}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              href={PARTENOPEA_JUSTME_AFFILIATE_URL}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-sm bg-[#EAE3D5] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#050505] transition-colors hover:bg-white"
            >
              {c.ctaXceedLabel}
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={whatsappRestaurantUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-sm border border-[#25D366]/45 bg-[#25D366]/15 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-[#050505]"
            >
              <MessageCircle className="h-4 w-4" />
              {c.ctaWhatsappLabel}
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] space-y-16 border-x border-white/10 px-5 py-14 sm:px-14">
        {/* Section 1: Overview & Timeline */}
        <section id="overview" className="scroll-mt-24 space-y-8">
          <div className="max-w-4xl space-y-4">
            <h2 className="font-serif text-3xl font-normal text-[#F6F1E7] sm:text-4xl">
              {c.overviewHeading}
            </h2>
            <div className="space-y-4 font-sans text-base leading-relaxed text-[#C2B9AA]">
              {c.overviewParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/15 bg-white/[0.025] p-6 sm:p-8">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-champagne">
              <Clock className="h-4 w-4" />
              <span>{c.timelineSubheading}</span>
            </div>
            <h3 className="mt-2 font-serif text-2xl text-[#F6F1E7]">
              {c.timelineHeading}
            </h3>
            <div className="mt-6 space-y-4">
              {c.timelineSteps.map((step) => (
                <div
                  key={step.time}
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

        {/* Section 2: €70 Neapolitan Menu, Pineta Napoli Partnership & Dual Couture Noir Cards */}
        <section id="dinner-show-menu" className="scroll-mt-24 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-champagne">
              <UtensilsCrossed className="h-4 w-4" />
              <span>21:30 Dinner Show · 70€ Full Menu · Pineta Napoli</span>
            </div>
            <h2 className="font-serif text-3xl font-normal text-[#F6F1E7] sm:text-4xl">
              {c.dinnerHeading}
            </h2>
            <p className="font-sans text-base text-[#C2B9AA]">
              {c.dinnerSubheading}
            </p>
          </div>

          {/* 2 Couture Noir Event Cards */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <figure className="overflow-hidden rounded-xl border border-champagne/30 bg-black/50 p-3">
              <Image
                src={PARTENOPEA_JUSTME_MENU_CARD_SRC}
                alt={c.menuCardTitle}
                title={c.menuCardTitle}
                width={1376}
                height={768}
                quality={85}
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="h-auto w-full rounded-lg object-contain"
              />
              <figcaption className="mt-3 space-y-1 px-1">
                <div className="font-serif text-lg text-[#F6F1E7]">{c.menuCardTitle}</div>
                <p className="font-sans text-xs text-[#C2B9AA]">{c.menuCardCaption}</p>
              </figcaption>
            </figure>

            <figure className="overflow-hidden rounded-xl border border-champagne/30 bg-black/50 p-3">
              <Image
                src={PARTENOPEA_JUSTME_TABLES_CARD_SRC}
                alt={c.tablesCardTitle}
                title={c.tablesCardTitle}
                width={1376}
                height={768}
                quality={85}
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="h-auto w-full rounded-lg object-contain"
              />
              <figcaption className="mt-3 space-y-1 px-1">
                <div className="font-serif text-lg text-[#F6F1E7]">{c.tablesCardTitle}</div>
                <p className="font-sans text-xs text-[#C2B9AA]">{c.tablesCardCaption}</p>
              </figcaption>
            </figure>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {c.culinaryHighlights.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-2"
              >
                <span className="inline-block rounded-full border border-champagne/35 bg-champagne/10 px-2.5 py-0.5 font-mono text-[11px] uppercase text-champagne">
                  {item.badge}
                </span>
                <h3 className="font-serif text-xl text-[#F6F1E7]">{item.title}</h3>
                <p className="font-sans text-sm leading-relaxed text-[#C2B9AA]">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-between gap-4 rounded-xl border border-[#25D366]/35 bg-[#25D366]/10 p-5 sm:flex-row sm:items-center">
            <p className="font-sans text-sm leading-relaxed text-[#F6F1E7]">
              {c.restaurantConciergeNote}
            </p>
            <a
              href={whatsappRestaurantUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-[#25D366] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#050505] transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" />
              {c.ctaWhatsappLabel}
            </a>
          </div>
        </section>

        {/* Section 3: All 8 Confirmed Offers & Tables */}
        <section id="tables-vip-pricing" className="scroll-mt-24 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-champagne">
              <Wine className="h-4 w-4" />
              <span>70€ Menu + Xceed #249217 · Nightlife Milan Official Attribution</span>
            </div>
            <h2 className="font-serif text-3xl font-normal text-[#F6F1E7] sm:text-4xl">
              {c.tiersHeading}
            </h2>
            <p className="font-sans text-base text-[#C2B9AA]">{c.tiersSubheading}</p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {c.tiers.map((tier) => (
              <div
                key={tier.id}
                className="flex flex-col justify-between rounded-xl border border-white/15 bg-white/[0.03] p-6 space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full border border-champagne/35 bg-champagne/10 px-2.5 py-0.5 font-mono text-[11px] text-champagne">
                      {tier.badge}
                    </span>
                    <span className="font-serif text-2xl font-bold text-[#F6F1E7]">
                      {tier.price}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-[#F6F1E7]">{tier.title}</h3>
                  <p className="font-sans text-sm leading-relaxed text-[#C2B9AA]">
                    {tier.summary}
                  </p>
                  <ul className="space-y-1.5 border-t border-white/10 pt-3">
                    {tier.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 font-sans text-xs text-white/85">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-champagne" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {tier.ctaKind === 'whatsapp' ? (
                  <a
                    href={tier.id === 'dinner-show-70' ? whatsappRestaurantUrl : whatsappVipFrontUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-[#25D366]/45 bg-[#25D366]/15 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-[#050505]"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    {tier.ctaLabel}
                  </a>
                ) : (
                  <a
                    href={PARTENOPEA_JUSTME_AFFILIATE_URL}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#EAE3D5] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#050505] transition-colors hover:bg-white"
                  >
                    {tier.ctaLabel}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>

          <p className="rounded-lg border border-white/10 bg-white/[0.02] p-4 font-sans text-sm text-[#C2B9AA]">
            {c.vipConciergeNote}
          </p>
        </section>

        {/* Google Flow 4 Real Venue SEO Gallery */}
        <section
          aria-label={seoImages.sectionHeading}
          data-seo-flow-gallery="partenopea-justme-2026"
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

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {seoImages.gallery.map((item) => (
              <figure
                key={item.src}
                className="overflow-hidden rounded-xl border border-white/15 bg-black/60"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    title={item.title}
                    fill
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 48vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="space-y-1 p-4">
                  <div className="font-serif text-base text-[#F6F1E7]">{item.title}</div>
                  <p className="font-sans text-xs leading-relaxed text-[#C2B9AA]">
                    {item.description}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Section 4: Dress Code 21+, Free Shuttle & Logistics */}
        <section id="dress-code-shuttle-logistics" className="scroll-mt-24 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-champagne">
              <Music className="h-4 w-4" />
              <span>Voice John Vaccaro · DJ Franky Dee · DJ Antonio Marigliano · 21+</span>
            </div>
            <h2 className="font-serif text-3xl font-normal text-[#F6F1E7] sm:text-4xl">
              {c.dressShuttleHeading}
            </h2>
            <p className="font-sans text-base text-[#C2B9AA]">
              {c.dressShuttleSubheading}
            </p>
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

          {/* Dedicated Partner Car Park with Free Shuttle CTA */}
          <div className="flex flex-col justify-between gap-4 rounded-xl border border-champagne/40 bg-champagne/10 p-6 sm:flex-row sm:items-center">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-serif text-xl text-[#F6F1E7]">
                <Car className="h-5 w-5 text-champagne" />
                <span>{c.shuttleHighlightTitle}</span>
              </div>
              <p className="font-sans text-sm text-[#EAE3D5]/85">
                {c.shuttleHighlightDesc}
              </p>
            </div>
            <a
              href={PARTENOPEA_JUSTME_SHUTTLE_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-[#EAE3D5] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#050505] transition-colors hover:bg-white"
            >
              <MapPin className="h-4 w-4" />
              {c.ctaShuttleLabel}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Logistics & Map */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-6">
              <h3 className="font-serif text-2xl text-[#F6F1E7]">{c.logisticsHeading}</h3>
              {c.logisticsParagraphs.map((p, i) => (
                <p key={i} className="font-sans text-sm leading-relaxed text-[#C2B9AA] sm:text-base">
                  {p}
                </p>
              ))}
              <dl className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
                {c.logisticsFacts.map((lf) => (
                  <div
                    key={lf.label}
                    className="rounded-lg border border-white/10 bg-white/[0.025] p-3"
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
                id="partenopea-justme-map"
                mapUrl={mapEmbedUrl}
                labels={c.mapLabels}
              />
            </div>
          </div>
        </section>

        {/* Section 5: Payment Protocol (100% Prepayment) */}
        <section
          id="payment-terms"
          className="scroll-mt-24 rounded-xl border border-white/15 bg-white/[0.03] p-6 sm:p-8 space-y-5"
        >
          <div className="space-y-1.5">
            <p className="font-mono text-xs uppercase tracking-wider text-champagne">
              {terms.eyebrow}
            </p>
            <h2 className="font-serif text-2xl font-normal text-[#F6F1E7] sm:text-3xl">
              {terms.heading}
            </h2>
            <p className="font-sans text-sm text-[#C2B9AA]">{terms.subtitle}</p>
            <p className="inline-block rounded-full border border-champagne/35 bg-champagne/10 px-3 py-1 font-mono text-xs text-champagne">
              {terms.methodsBadge}
            </p>
          </div>
          <ol className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {terms.steps.map((step) => (
              <li
                key={step}
                className="rounded-lg border border-white/10 bg-black/40 p-4 font-sans text-sm text-[#F6F1E7]/90"
              >
                {step}
              </li>
            ))}
          </ol>
          <p className="font-sans text-xs text-[#C2B9AA]">{terms.note}</p>
        </section>

        {/* Internal Cross-Links: JustMe Dossier, Thanksgiving Nov 26, Dec 31 NYE & Jan 13 Orthodox NYE */}
        <section data-no-lightbox="true" className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-white/15 bg-white/[0.03] p-5 space-y-4">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-white/10">
              <Image
                src="/images/venues/just-me-milano/just-me-milano-torre-branca-01.webp"
                alt={c.venueBannerTitle}
                title={c.venueBannerTitle}
                fill
                quality={85}
                sizes="(max-width: 1280px) 50vw, 24vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-1.5">
              <p className="font-mono text-[11px] uppercase text-champagne">
                {c.venueBannerEyebrow}
              </p>
              <h3 className="font-serif text-lg text-[#F6F1E7]">{c.venueBannerTitle}</h3>
              <p className="font-sans text-xs text-[#C2B9AA]">{c.venueBannerDesc}</p>
            </div>
            <Link
              href={justMeClubPath}
              className="inline-flex min-h-[44px] items-center gap-1.5 font-mono text-xs font-bold uppercase text-champagne hover:underline"
            >
              {c.venueCta} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-white/15 bg-white/[0.03] p-5 space-y-4">
            <div className="space-y-1.5">
              <p className="font-mono text-[11px] uppercase text-champagne">
                {c.thanksgivingBannerEyebrow}
              </p>
              <h3 className="font-serif text-lg text-[#F6F1E7]">{c.thanksgivingBannerTitle}</h3>
              <p className="font-sans text-xs text-[#C2B9AA]">{c.thanksgivingBannerDesc}</p>
            </div>
            <Link
              href={thanksgivingPath}
              className="inline-flex min-h-[44px] items-center gap-1.5 font-mono text-xs font-bold uppercase text-champagne hover:underline"
            >
              {c.thanksgivingBannerCta} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-white/15 bg-white/[0.03] p-5 space-y-4">
            <div className="space-y-1.5">
              <p className="font-mono text-[11px] uppercase text-champagne">
                {c.dec31BannerEyebrow}
              </p>
              <h3 className="font-serif text-lg text-[#F6F1E7]">{c.dec31BannerTitle}</h3>
              <p className="font-sans text-xs text-[#C2B9AA]">{c.dec31BannerDesc}</p>
            </div>
            <Link
              href={dec31Path}
              className="inline-flex min-h-[44px] items-center gap-1.5 font-mono text-xs font-bold uppercase text-champagne hover:underline"
            >
              {c.dec31BannerCta} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-white/15 bg-white/[0.03] p-5 space-y-4">
            <div className="space-y-1.5">
              <p className="font-mono text-[11px] uppercase text-champagne">
                {c.orthodoxBannerEyebrow}
              </p>
              <h3 className="font-serif text-lg text-[#F6F1E7]">{c.orthodoxBannerTitle}</h3>
              <p className="font-sans text-xs text-[#C2B9AA]">{c.orthodoxBannerDesc}</p>
            </div>
            <Link
              href={orthodoxPath}
              className="inline-flex min-h-[44px] items-center gap-1.5 font-mono text-xs font-bold uppercase text-champagne hover:underline"
            >
              {c.orthodoxBannerCta} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        {/* Section 6: 12 FAQs */}
        <section id="faqs" className="scroll-mt-24 space-y-6">
          <h2 className="font-serif text-3xl font-normal text-[#F6F1E7] sm:text-4xl">
            {c.faqHeading}
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {c.faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl border border-white/10 bg-white/[0.025] p-5 space-y-2"
              >
                <h3 className="font-serif text-lg text-[#F6F1E7]">{faq.q}</h3>
                <p className="font-sans text-sm leading-relaxed text-[#C2B9AA]">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Sitewide 21-Point SEO Authority Hub */}
      <SeoAuthorityHub lang={locale} pageKey="justme-partenopea-2026" pagePath={canonicalPath} />
    </article>
  );
}
