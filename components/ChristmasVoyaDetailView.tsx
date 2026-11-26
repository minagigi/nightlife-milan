import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import SeoAuthorityHub from '@/components/SeoAuthorityHub';
import EventVenueMap from '@/components/EventVenueMap';
import SinglePassVenueModule from '@/components/single-pass/SinglePassVenueModule';
import { getSinglePassCopy } from '@/lib/single-pass/i18n35';
import { SITE_CONTACT } from '@/config/contact';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import { localePrefix, type LocaleCode } from '@/lib/i18n/locales';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { getLocalizedVenueSlug35 } from '@/lib/i18n/localizedSlugs35';
import { getScarcityAndChatCopy } from '@/lib/i18n/scarcityAndChatCopy';
import { getEventVenueCopy } from '@/lib/i18n/eventVenueCopy';
import { buildSeoEventImagePack } from '@/lib/seoEventImages';
import { getPaymentTerms35 } from '@/lib/capodanno/paymentTerms35';
import {
  christmasVoyaPath,
  getChristmasVoyaContent,
  getVoyaNyeBannerUrlForChristmas,
} from '@/lib/christmas/voya35';

type Props = {
  locale: string;
};

const SITE_URL = 'https://nightlifemilan.com';
const VOYA_ADDRESS = 'Viale Achille Papa 30 (Portello / CityLife), 20149 Milano';
const VOYA_VENUE_NAME = 'Voya Rooftop Milan (20° Piano)';

export default function ChristmasVoyaDetailView({ locale }: Props) {
  const loc = locale as LocaleCode;
  const prefix = localePrefix(locale);
  const c = getChristmasVoyaContent(locale);
  const paymentTerms = getPaymentTerms35(locale);
  const scarcity = getScarcityAndChatCopy(locale);
  const venueMapCopy = getEventVenueCopy(loc);
  const singlePassCopy = getSinglePassCopy(locale);

  const canonicalPath = christmasVoyaPath(locale);
  const fullCanonicalUrl = `${SITE_URL}${canonicalPath}`;
  const eventsHubHref = `${prefix}/${getLocalizedDir35('events', loc)}/special`;
  const voyaClubHref = `${prefix}/${getLocalizedDir35('clubs', loc)}/${getLocalizedVenueSlug35('voya-rooftop-milan', loc)}`;
  const voyaNyeHref = getVoyaNyeBannerUrlForChristmas(locale);
  const waHref = getConciergeBookingUrl(
    locale,
    `${c.title} (Voya Rooftop Milan · 25/12/2026)`,
    fullCanonicalUrl,
  );

  const seoPack = buildSeoEventImagePack({
    locale,
    eventSlug: 'christmas-voya-rooftop-milan-2026',
    venueName: VOYA_VENUE_NAME,
    h1: c.title,
    h2List: [c.menuHeading, c.priceHeading, paymentTerms.heading, c.mapHeading],
    h3List: [c.priceCardTitle, c.menuSubheading],
    categorySlug: 'special',
    music: c.locationBadge,
    dressCode: c.dressCodeValue,
    posterSrc: c.posterSrc,
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Nightlife Milan', item: `${SITE_URL}${prefix || '/'}` },
          { '@type': 'ListItem', position: 2, name: c.dateBadge, item: `${SITE_URL}${eventsHubHref}` },
          { '@type': 'ListItem', position: 3, name: c.title, item: fullCanonicalUrl },
        ],
      },
      {
        '@type': 'Event',
        name: c.title,
        description: c.description,
        startDate: '2026-12-25',
        endDate: '2026-12-25',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        organizer: {
          '@type': 'Organization',
          name: 'Nightlife Milan',
          url: SITE_URL,
        },
        performer: {
          '@type': 'PerformingGroup',
          name: `${VOYA_VENUE_NAME} Resident DJs`,
        },
        image: seoPack.schemaImages,
        location: {
          '@type': 'Place',
          name: VOYA_VENUE_NAME,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Viale Achille Papa 30',
            postalCode: '20149',
            addressLocality: 'Milano',
            addressRegion: 'Lombardia',
            addressCountry: 'IT',
          },
        },
        offers: {
          '@type': 'Offer',
          url: fullCanonicalUrl,
          price: '100',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          validFrom: '2026-11-01T00:00:00+01:00',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: c.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
          },
        })),
      },
    ],
  };

  return (
    <main
      data-layout-alt="alternativa-02-capitoli-colore-netto"
      className="min-h-screen bg-[#050505] pb-20 text-[#F6F1E7]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="w-full">
        {/* CAPITOLO 01 — NOTTE #050505: Locandina 4:5 a pieno placeholder, Titolo & Indice Rapido */}
        <div className="mx-auto max-w-5xl px-4 pb-10 pt-3 sm:px-6 sm:pt-4 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap items-center gap-1.5 text-xs text-[#C2B9AA] sm:mb-4">
            <Link href={prefix || '/'} className="hover:text-[#F6F1E7]">
              Home
            </Link>
            <span>/</span>
            <Link href={eventsHubHref} className="hover:text-[#F6F1E7]">
              Events
            </Link>
            <span>/</span>
            <Link href={voyaClubHref} className="hover:text-[#F6F1E7]">
              Voya Rooftop Milan
            </Link>
            <span>/</span>
            <span className="font-medium text-[#F6F1E7]">{c.dateBadge}</span>
          </nav>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-10">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-[#F6F1E7]/18 bg-[#050505] lg:col-span-5">
              <Image
                quality={95}
                src={c.posterSrc}
                alt={c.title}
                title={c.title}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1080px) 100vw, 1080px"
                className="object-cover"
              />
            </div>

            <div className="flex min-w-0 flex-col justify-between lg:col-span-7">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-[#F6F1E7] px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[#050505]">
                    {c.dateBadge}
                  </span>
                  <span className="border border-[#F6F1E7]/30 bg-[#050505] px-3 py-1 text-xs font-semibold text-[#F6F1E7]">
                    {c.locationBadge}
                  </span>
                  <span className="bg-[#EAE3D5] px-3 py-1 font-mono text-xs font-extrabold text-[#050505]">
                    {c.priceBadge}
                  </span>
                  <span
                    className="bg-[#25D366] px-3 py-1 font-mono text-xs font-extrabold uppercase tracking-wider text-[#050505]"
                    data-selling-fast-badge
                  >
                    {scarcity.sellingFastBadge}
                  </span>
                </div>

                <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-[#F6F1E7] sm:text-4xl">
                  {c.title}
                </h1>
                <p className="mt-2 font-serif text-base italic text-[#EAE3D5]">{c.subtitle}</p>
                <p className="mt-4 text-sm leading-relaxed text-[#C2B9AA]">{c.description}</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#prezzi-natale"
                  className="inline-flex min-h-[46px] items-center bg-[#25D366] px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-[#050505] transition hover:bg-[#2EE472]"
                >
                  {c.tocPrice}
                </a>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event-cta-kind="table"
                  aria-label={`WhatsApp ${SITE_CONTACT.whatsapp.number}`}
                  className="inline-flex min-h-[46px] items-center gap-2 bg-[#EAE3D5] px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-[#050505] transition hover:bg-[#F6F1E7]"
                >
                  WhatsApp {SITE_CONTACT.whatsapp.number}
                </a>
                <a
                  href="#menu-natale"
                  className="inline-flex min-h-[46px] items-center border border-[#F6F1E7]/35 bg-[#050505] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#F6F1E7] transition hover:border-[#F6F1E7]"
                >
                  {c.tocMenu}
                </a>
              </div>

              <nav aria-label={c.tocTitle} className="mt-6 border-t border-[#F6F1E7]/15 pt-4">
                <ul className="flex gap-2 overflow-x-auto pb-1.5 text-xs font-bold md:flex-wrap md:overflow-visible md:pb-0">
                  <li className="shrink-0">
                    <a href="#prezzi-natale" className="inline-flex min-h-[36px] items-center bg-[#F6F1E7] px-3 py-1.5 text-[#050505]">
                      {c.tocPrice}
                    </a>
                  </li>
                  <li className="shrink-0">
                    <a href="#menu-natale" className="inline-flex min-h-[36px] items-center border border-[#F6F1E7]/22 bg-[#141311] px-3 py-1.5 text-[#F6F1E7]">
                      {c.tocMenu}
                    </a>
                  </li>
                  <li className="shrink-0">
                    <a href="#programma-natale" className="inline-flex min-h-[36px] items-center border border-[#F6F1E7]/22 bg-[#141311] px-3 py-1.5 text-[#F6F1E7]">
                      {c.tocOverview}
                    </a>
                  </li>
                  <li className="shrink-0">
                    <a href="#prenota-concierge" className="inline-flex min-h-[36px] items-center border border-[#F6F1E7]/22 bg-[#141311] px-3 py-1.5 text-[#F6F1E7]">
                      {c.tocBooking}
                    </a>
                  </li>
                  <li className="shrink-0">
                    <a href="#termini-pagamento" className="inline-flex min-h-[36px] items-center border border-[#F6F1E7]/22 bg-[#141311] px-3 py-1.5 text-[#F6F1E7]">
                      {c.tocPayment}
                    </a>
                  </li>
                  <li className="shrink-0">
                    <a href="#faq-evento" className="inline-flex min-h-[36px] items-center border border-[#F6F1E7]/22 bg-[#141311] px-3 py-1.5 text-[#F6F1E7]">
                      {c.tocFaq}
                    </a>
                  </li>
                  <li className="shrink-0">
                    <a href="#mappa-locale" className="inline-flex min-h-[36px] items-center border border-[#F6F1E7]/22 bg-[#141311] px-3 py-1.5 text-[#F6F1E7]">
                      {c.tocMap}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* CAPITOLO 02 — CARTA CALDA #F6F1E7: Tariffa Ufficiale, E-Commerce & Prenotazione */}
        <div className="border-y border-[#050505] bg-[#F6F1E7] py-10 text-[#050505]">
          <div className="mx-auto max-w-5xl space-y-8 px-4 sm:px-6 lg:px-8">
            <div id="prezzi-natale" className="bg-[#F6F1E7] text-[#050505]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#050505] pb-4">
                <h2 className="font-display text-2xl font-bold uppercase text-[#050505] sm:text-3xl">
                  {c.priceHeading}
                </h2>
                <span
                  className="bg-[#050505] px-3 py-1 font-mono text-xs font-extrabold uppercase tracking-wider text-[#F6F1E7]"
                  data-selling-fast-badge
                >
                  {scarcity.sellingFastBadge}
                </span>
              </div>
              <div className="mt-4 border-b border-[#050505]/20 pb-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-bold text-[#050505]">
                    {c.priceCardTitle}
                  </h3>
                  <span className="shrink-0 bg-[#050505] px-4 py-1.5 font-display text-xl font-bold text-[#F6F1E7]">
                    {c.priceCardAmount}
                  </span>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-[#24201B]">
                  {c.priceCardDetails}
                </p>
                <p className="mt-2 text-xs font-bold text-[#050505]" data-checkout-fee-note>
                  {singlePassCopy.feeCalculatedAtCheckoutNote}
                </p>
              </div>
            </div>

            <SinglePassVenueModule locale={locale} venueId="voya-christmas" />

            <div id="prenota-concierge" className="bg-[#050505] p-6 text-[#F6F1E7] sm:p-8">
              <h2 className="font-display text-2xl font-bold text-[#F6F1E7]">
                {c.bookingHeading}
              </h2>
              <p className="mt-2 text-sm text-[#C2B9AA]">{c.bookingSubtitle}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event-cta-kind="table"
                  aria-label={`WhatsApp ${SITE_CONTACT.whatsapp.number}`}
                  className="inline-flex min-h-[46px] items-center bg-[#25D366] px-6 py-3 text-sm font-extrabold uppercase tracking-wider text-[#050505] transition hover:bg-[#2EE472]"
                >
                  WhatsApp {SITE_CONTACT.whatsapp.number}
                </a>
                <a
                  href="mailto:concierge@nightlifemilan.com"
                  className="inline-flex min-h-[46px] items-center border border-[#F6F1E7]/25 bg-[#141311] px-5 py-3 text-sm font-semibold text-[#F6F1E7] transition hover:border-[#F6F1E7]"
                >
                  concierge@nightlifemilan.com
                </a>
                <Link
                  href={voyaNyeHref}
                  className="inline-flex min-h-[46px] items-center bg-[#EAE3D5] px-5 py-3 text-sm font-bold text-[#050505] hover:bg-[#F6F1E7]"
                >
                  {c.nyeCrossCta.replace(/\s*→+$/, '')} →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* CAPITOLO 03 — CHAMPAGNE #EAE3D5: Menu di Natale a pieno placeholder & Programma */}
        <div className="border-b border-[#050505] bg-[#EAE3D5] py-10 text-[#050505]">
          <div className="mx-auto max-w-5xl space-y-10 px-4 sm:px-6 lg:px-8">
            <section id="menu-natale" data-official-menus className="text-[#050505]">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[#050505] pb-4">
                <div>
                  <h2 className="font-display text-2xl font-bold uppercase text-[#050505]">{c.menuHeading}</h2>
                  <p className="mt-1 text-sm text-[#4A453E]">{c.menuSubheading}</p>
                </div>
                <span className="bg-[#050505] px-4 py-1.5 font-mono text-sm font-bold text-[#F6F1E7]">
                  {c.priceCardAmount}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
                <div className="space-y-4 lg:col-span-7">
                  <dl className="divide-y divide-[#050505]/15">
                    {c.courses.map((courseItem) => (
                      <div
                        key={`${courseItem.course}-${courseItem.dish}`}
                        className="py-3"
                      >
                        <dt className="font-mono text-xs font-bold uppercase tracking-wider text-[#4A453E]">
                          {courseItem.course}
                        </dt>
                        <dd className="mt-1 text-sm font-medium leading-relaxed text-[#050505] sm:text-base">
                          {courseItem.dish}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="border-l-2 border-[#050505] pl-3.5 text-sm font-semibold text-[#050505]">
                    {c.beveragesIncluded}
                  </p>
                </div>

                <figure
                  data-menu-preview="/images/events/christmas-2026-menus/voya-natale-2026-menu-it.webp"
                  className="aspect-[4/5] w-full overflow-hidden border border-[#050505]/20 bg-[#050505] lg:col-span-5"
                >
                  <img
                    src={c.menuImageSrc}
                    alt={`${c.title} · ${c.menuHeading}`}
                    title={c.menuHeading}
                    width={1080}
                    height={1350}
                    loading="lazy"
                    decoding="async"
                    className="block h-full w-full object-cover"
                  />
                </figure>
              </div>
            </section>

            <div id="programma-natale" className="space-y-6">
              <h2 className="border-b border-[#050505] pb-3 font-display text-2xl font-bold uppercase text-[#050505]">
                {c.tocOverview}
              </h2>
              <ul className="grid grid-cols-1 divide-y divide-[#050505]/15 border-b border-[#050505]/15 md:grid-cols-2 md:gap-x-8">
                {c.highlights.map((item) => (
                  <li key={item} className="py-3 text-sm font-medium text-[#050505] sm:text-base">
                    • {item}
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-1 divide-y divide-[#050505]/15 md:grid-cols-2 md:gap-x-8 md:divide-y-0">
                <div className="py-3 text-[#050505]">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#4A453E]">
                    {c.scheduleLabel}
                  </p>
                  <p className="mt-1 text-sm font-bold text-[#050505]">{c.scheduleValue}</p>
                </div>
                <div className="py-3 text-[#050505]">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#4A453E]">
                    {c.dressCodeLabel}
                  </p>
                  <p className="mt-1 text-sm font-bold text-[#050505]">{c.dressCodeValue}</p>
                </div>
              </div>

              <div
                data-venue-authority-backlink
                className="flex flex-col gap-3 bg-[#050505] p-5 text-[#F6F1E7] md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#EAE3D5]">
                    {c.venueBannerEyebrow}
                  </p>
                  <p className="mt-1 text-sm text-[#F6F1E7]">{c.venueBannerDesc}</p>
                </div>
                <Link
                  href={voyaClubHref}
                  className="inline-flex min-h-[44px] shrink-0 items-center justify-center bg-[#25D366] px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#050505] transition hover:bg-[#2EE472]"
                >
                  Voya Rooftop Milan →
                </Link>
              </div>

              <div
                data-related-holiday-banner
                className="flex flex-col gap-3 border-y border-[#050505]/25 bg-[#EAE3D5] py-5 text-[#050505] md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#4A453E]">
                    {c.nyeCrossTitle}
                  </p>
                  <p className="mt-1 text-sm text-[#3D3830]">{c.nyeCrossDesc}</p>
                </div>
                <Link
                  href={voyaNyeHref}
                  className="inline-flex min-h-[44px] shrink-0 items-center justify-center bg-[#050505] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#F6F1E7] transition hover:bg-[#1E1C19]"
                >
                  {c.nyeCrossCta.replace(/\s*→+$/, '')} →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* CAPITOLO 04 — NOTTE #050505: Galleria 4:5 a pieno placeholder & Locandina */}
        <div className="bg-[#050505] py-10 text-[#F6F1E7]">
          <div className="mx-auto max-w-5xl space-y-12 px-4 sm:px-6 lg:px-8">
            <section id="galleria-seo-flow" data-seo-flow-gallery className="space-y-6">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#EAE3D5]">
                  {seoPack.eyebrow}
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold uppercase text-[#F6F1E7]">
                  {seoPack.sectionHeading}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-[#C2B9AA]">
                  {seoPack.sectionSubtitle}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {seoPack.gallery.map((img) => (
                  <figure
                    key={img.src}
                    className="min-w-0"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden border border-[#F6F1E7]/16 bg-[#050505]">
                      <img
                        src={img.src}
                        title={img.title}
                        alt={img.alt}
                        width={1080}
                        height={1350}
                        loading="lazy"
                        decoding="async"
                        className="block h-full w-full object-cover"
                      />
                      <span className="pointer-events-none absolute left-3 top-3 border border-[#F6F1E7]/30 bg-[#050505]/90 px-2.5 py-1 text-[11px] font-semibold text-[#F6F1E7]">
                        {img.shotLabel}
                      </span>
                    </div>
                    <figcaption className="space-y-1.5 pt-3">
                      <p className="font-mono text-[11px] text-[#EAE3D5]">
                        {img.targetBadge} · {img.outfitBadge}
                      </p>
                      <p className="text-xs leading-relaxed text-[#C2B9AA]">
                        <strong className="text-[#F6F1E7]">{img.title}</strong> · {img.description}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <figure
              data-capodanno-poster-detail
              className="grid grid-cols-1 gap-6 border-t border-[#F6F1E7]/16 pt-8 lg:grid-cols-12 lg:items-center lg:gap-10"
            >
              <div className="aspect-[4/5] w-full overflow-hidden border border-[#F6F1E7]/18 bg-[#050505] lg:col-span-5">
                <Image
                  quality={95}
                  src={c.posterSrc}
                  title={seoPack.poster.title}
                  alt={seoPack.poster.alt}
                  width={1080}
                  height={1350}
                  sizes="(max-width: 1080px) 100vw, 1080px"
                  className="block h-full w-full object-cover"
                />
              </div>
              <figcaption className="space-y-3 lg:col-span-7">
                <span className="inline-block border border-[#F6F1E7]/35 bg-[#050505] px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[#F6F1E7]">
                  {seoPack.poster.badgeLabel}
                </span>
                <p className="text-xs text-[#EAE3D5] sm:text-sm">
                  <strong className="text-[#F6F1E7]">{seoPack.targetPrefix}:</strong> {seoPack.targetLabel} ·{' '}
                  <strong className="text-[#F6F1E7]">{seoPack.outfitPrefix}:</strong> {seoPack.outfitLabel}
                </p>
                <p className="text-xs leading-relaxed text-[#C2B9AA] sm:text-sm">
                  <strong className="text-[#F6F1E7]">{c.title}</strong> · {VOYA_ADDRESS}
                </p>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* CAPITOLO 05 — CARTA CALDA #F6F1E7: Protocollo Pagamenti & FAQ senza cassettoni */}
        <div className="border-y border-[#050505] bg-[#F6F1E7] py-10 text-[#050505]">
          <div className="mx-auto max-w-5xl space-y-10 px-4 sm:px-6 lg:px-8">
            <section
              id="termini-pagamento"
              data-payment-terms-35
              className="bg-[#F6F1E7] text-[#050505]"
            >
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#4A453E]">
                {paymentTerms.eyebrow}
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-2xl font-bold uppercase text-[#050505]">
                  {paymentTerms.heading}
                </h2>
                <span className="bg-[#050505] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#F6F1E7]">
                  {paymentTerms.methodsBadge}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#3D3830]">
                {paymentTerms.subtitle}
              </p>
              <ol className="mt-5 list-none pl-0 grid grid-cols-1 divide-y divide-[#050505]/15 border-y border-[#050505]/15 md:grid-cols-2 md:gap-x-8 md:divide-y-0 lg:grid-cols-3">
                {paymentTerms.steps.map((step, idx) => (
                  <li key={step} className="flex items-start gap-3 py-4 text-[#050505] md:border-b md:border-[#050505]/15">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center bg-[#050505] font-mono text-xs font-bold tabular-nums text-[#F6F1E7]">
                      {idx + 1}
                    </span>
                    <span className="min-w-0 flex-1 text-xs leading-relaxed text-[#050505] sm:text-sm">
                      {step.replace(/^\s*(?:\(\d+\)|[\d\u0660-\u0669\u06F0-\u06F9]+[.):、-])\s*/u, '')}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 border-l-2 border-[#050505] pl-3.5 text-xs leading-relaxed text-[#24201B]">
                {paymentTerms.note}
              </p>
            </section>

            <div id="faq-evento" className="border-t border-[#050505]/20 bg-[#F6F1E7] pt-8 text-[#050505]">
              <h2 className="font-display text-2xl font-bold uppercase text-[#050505]">
                {c.faqHeading}
              </h2>
              <div className="mt-4 divide-y divide-[#050505]/15 border-y border-[#050505]/15">
                {c.faqs.map((faq, idx) => (
                  <details key={faq.q} open={idx < 2} className="group py-4">
                    <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 marker:hidden">
                      <h3 className="text-sm font-bold text-[#050505] sm:text-base">{faq.q}</h3>
                      <span
                        className="font-mono text-xl font-bold text-[#050505] transition-transform group-open:rotate-45"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>
                    <p className="pt-2 text-sm leading-relaxed text-[#24201B]">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CAPITOLO 06 — NOTTE #050505: Mappa Venue */}
        <div id="mappa-locale" className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-[#F6F1E7]">{c.mapHeading}</h2>
          <p className="mt-1 text-sm text-[#C2B9AA]">
            {VOYA_VENUE_NAME} · {VOYA_ADDRESS} · {c.dateBadge}
          </p>
          <div className="mt-4">
            <EventVenueMap
              id="voya-christmas-map-2026"
              mapUrl={`https://www.google.com/maps?q=${encodeURIComponent('Voya Rooftop Milan Viale Achille Papa 30 Milano')}&output=embed`}
              labels={{
                loadMap: venueMapCopy.loadMap,
                mapTitle: venueMapCopy.mapTitle.replace('{venue}', 'Voya Rooftop Milan'),
                privacyLoadNotice: venueMapCopy.privacyLoadNotice,
              }}
            />
          </div>
        </div>
      </article>
      <SeoAuthorityHub lang={loc} />
    </main>
  );
}
