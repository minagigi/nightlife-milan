import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import SeoAuthorityHub from '@/components/SeoAuthorityHub';
import EventVenueMap from '@/components/EventVenueMap';
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

  const canonicalPath = christmasVoyaPath(locale);
  const fullCanonicalUrl = `${SITE_URL}${canonicalPath}`;
  const eventsHubHref = `${prefix}/${getLocalizedDir35('events', loc)}/special`;
  const voyaClubHref = `${prefix}/${getLocalizedDir35('clubs', loc)}/${getLocalizedVenueSlug35('voya-rooftop-milan', loc)}`;
  const voyaNyeHref = getVoyaNyeBannerUrlForChristmas(locale);
  const waHref = getConciergeBookingUrl(locale, `${c.title} (Voya Rooftop Milan · 25/12/2026)`, fullCanonicalUrl);

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
    <main className="min-h-screen bg-[#050505] pb-20 text-[#F6F1E7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-[#C2B9AA]">
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

        {/* Hero Couture Noir */}
        <div className="overflow-hidden border border-[#F6F1E7]/20 bg-[#0B0A09]">
          <div className="grid lg:grid-cols-5">
            <div className="relative aspect-[16/9] min-h-[260px] w-full bg-[#050505] lg:col-span-2 lg:min-h-[380px]">
              <Image
                quality={92}
                src={c.posterSrc}
                alt={c.title}
                title={c.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-contain"
              />
            </div>

            <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-3">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-[#F6F1E7] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#050505]">
                    {c.dateBadge}
                  </span>
                  <span className="border border-[#F6F1E7]/30 bg-[#050505] px-3 py-1 text-xs font-semibold text-[#F6F1E7]">
                    {c.locationBadge}
                  </span>
                  <span className="border border-[#C9A84C]/60 bg-[#050505] px-3 py-1 text-xs font-bold text-[#C9A84C]">
                    {c.priceBadge}
                  </span>
                  <span className="border border-[#F6F1E7]/50 bg-[#050505] px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#F6F1E7]" data-selling-fast-badge>
                    {scarcity.sellingFastBadge}
                  </span>
                </div>

                <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#F6F1E7] sm:text-4xl">
                  {c.title}
                </h1>
                <p className="mt-2 text-base text-[#EAE3D5]">{c.subtitle}</p>
                <p className="mt-4 text-sm leading-relaxed text-[#C2B9AA]">{c.description}</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event-cta-kind="table"
                  className="inline-flex items-center gap-2 bg-[#25D366] px-6 py-3.5 text-sm font-bold text-[#050505] transition hover:bg-[#2EE472]"
                >
                  WhatsApp {SITE_CONTACT.whatsapp.number}
                </a>
                <a
                  href="#menu-natale"
                  className="inline-flex items-center border border-[#F6F1E7]/35 bg-[#050505] px-5 py-3.5 text-sm font-semibold text-[#F6F1E7] transition hover:bg-[#F6F1E7] hover:text-[#050505]"
                >
                  {c.tocMenu}
                </a>
                <Link
                  href={voyaNyeHref}
                  className="inline-flex items-center border border-[#C9A84C]/60 bg-[#C9A84C]/10 px-5 py-3.5 text-sm font-bold text-[#F6F1E7] transition hover:bg-[#C9A84C] hover:text-[#050505]"
                >
                  {c.nyeCrossCta} →
                </Link>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* TOC (#EFE9DC Avorio Caldo) */}
            <nav aria-label={c.tocTitle} className="mb-8 border border-[#050505]/15 bg-[#EFE9DC] p-5 text-[#050505]">
              <p className="text-xs font-bold uppercase tracking-widest text-[#3D3830]">
                {c.tocTitle}
              </p>
              <ul className="mt-3 grid gap-2 text-xs font-medium sm:grid-cols-2 lg:grid-cols-4 sm:text-sm">
                <li>
                  <a href="#programma-natale" className="text-[#050505] hover:underline">
                    {c.tocOverview}
                  </a>
                </li>
                <li>
                  <a href="#menu-natale" className="text-[#050505] hover:underline">
                    {c.tocMenu}
                  </a>
                </li>
                <li>
                  <a href="#prezzi-natale" className="text-[#050505] hover:underline">
                    {c.tocPrice}
                  </a>
                </li>
                <li>
                  <a href="#termini-pagamento" className="text-[#050505] hover:underline">
                    {c.tocPayment}
                  </a>
                </li>
                <li>
                  <a href="#prenota-concierge" className="text-[#050505] hover:underline">
                    {c.tocBooking}
                  </a>
                </li>
                <li>
                  <a href="#mappa-locale" className="text-[#050505] hover:underline">
                    {c.tocMap}
                  </a>
                </li>
                <li>
                  <a href="#faq-evento" className="text-[#050505] hover:underline">
                    {c.tocFaq}
                  </a>
                </li>
              </ul>
            </nav>

            {/* Key Highlights */}
            <div className="grid gap-4 border border-[#F6F1E7]/14 bg-[#050505] p-5 sm:grid-cols-2">
              {c.highlights.map((item) => (
                <div key={item} className="text-sm text-[#EAE3D5]">
                  • {item}
                </div>
              ))}
            </div>

            {/* Program & Venue Links */}
            <div id="programma-natale" className="mt-8 space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#F6F1E7]">
                {c.tocOverview}
              </h2>
              <p className="text-base leading-relaxed text-[#C2B9AA]">{c.description}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="border border-[#F6F1E7]/14 bg-[#050505] p-4">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#C9A84C]">
                    {c.scheduleLabel}
                  </p>
                  <p className="mt-1 text-sm text-[#F6F1E7]">{c.scheduleValue}</p>
                </div>
                <div className="border border-[#F6F1E7]/14 bg-[#050505] p-4">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#C9A84C]">
                    {c.dressCodeLabel}
                  </p>
                  <p className="mt-1 text-sm text-[#F6F1E7]">{c.dressCodeValue}</p>
                </div>
              </div>

              {/* Venue Official Card Banner */}
              <div
                data-venue-authority-backlink
                className="flex flex-col gap-3 border border-[#C9A84C]/35 bg-[#050505] p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#C9A84C]">
                    {c.venueBannerEyebrow}
                  </p>
                  <p className="mt-1 text-sm text-[#EAE3D5]">{c.venueBannerDesc}</p>
                </div>
                <Link
                  href={voyaClubHref}
                  className="inline-flex shrink-0 items-center justify-center border border-[#C9A84C] bg-[#C9A84C]/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#F6F1E7] transition hover:bg-[#C9A84C] hover:text-[#050505]"
                >
                  Voya Rooftop Milan →
                </Link>
              </div>

              {/* Cross-link Voya NYE 300€ */}
              <div
                data-related-holiday-banner
                className="flex flex-col gap-3 border border-[#EAE3D5]/40 bg-[#050505] p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#EAE3D5]">
                    {c.nyeCrossTitle}
                  </p>
                  <p className="mt-1 text-sm text-[#C2B9AA]">{c.nyeCrossDesc}</p>
                </div>
                <Link
                  href={voyaNyeHref}
                  className="inline-flex shrink-0 items-center justify-center bg-[#F6F1E7] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#050505] transition hover:bg-[#EAE3D5]"
                >
                  {c.nyeCrossCta} →
                </Link>
              </div>
            </div>

            {/* Official Remediated Christmas Poster (Uncropped object-contain) */}
            <figure
              data-capodanno-poster-detail
              className="mt-8 overflow-hidden border border-[#F6F1E7]/25 bg-[#050505] p-4 sm:p-6"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="border border-[#F6F1E7]/35 bg-[#0B0A09] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#F6F1E7]">
                  {seoPack.poster.badgeLabel}
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="border border-[#F6F1E7]/15 bg-[#0B0A09] px-3 py-1 text-[#EAE3D5]">
                    <strong className="text-[#F6F1E7]">{seoPack.targetPrefix}:</strong> {seoPack.targetLabel}
                  </span>
                  <span className="border border-[#F6F1E7]/15 bg-[#0B0A09] px-3 py-1 text-[#EAE3D5]">
                    <strong className="text-[#F6F1E7]">{seoPack.outfitPrefix}:</strong> {seoPack.outfitLabel}
                  </span>
                </div>
              </div>
              <div className="flex justify-center bg-[#050505] p-2">
                <img
                  src={c.posterSrc}
                  title={seoPack.poster.title}
                  alt={seoPack.poster.alt}
                  width={1376}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  className="max-h-[540px] w-auto max-w-full object-contain"
                />
              </div>
              <figcaption className="mt-3 text-xs leading-relaxed text-[#C2B9AA] sm:text-sm">
                <strong className="text-[#F6F1E7]">{c.title}</strong> · {VOYA_ADDRESS}
              </figcaption>
            </figure>

            {/* Official 5-Course Christmas Menu */}
            <section
              id="menu-natale"
              data-official-menus
              className="mt-10 border border-[#F6F1E7]/20 bg-[#050505] p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[#F6F1E7]/14 pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#F6F1E7]">{c.menuHeading}</h2>
                  <p className="mt-1 text-sm text-[#C2B9AA]">{c.menuSubheading}</p>
                </div>
                <span className="bg-[#F6F1E7] px-4 py-1.5 text-sm font-bold text-[#050505]">
                  {c.priceCardAmount}
                </span>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:items-start">
                <div className="space-y-4">
                  <dl className="space-y-3">
                    {c.courses.map((courseItem) => (
                      <div
                        key={`${courseItem.course}-${courseItem.dish}`}
                        className="border border-[#F6F1E7]/14 bg-[#0B0A09] p-4"
                      >
                        <dt className="font-mono text-xs font-bold uppercase tracking-wider text-[#C9A84C]">
                          {courseItem.course}
                        </dt>
                        <dd className="mt-1 text-sm leading-relaxed text-[#F6F1E7]">
                          {courseItem.dish}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="border border-[#C9A84C]/35 bg-[#0B0A09] p-4 text-sm font-medium text-[#EAE3D5]">
                    {c.beveragesIncluded}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center border border-[#F6F1E7]/15 bg-[#0B0A09] p-3">
                  <img
                    src={c.menuImageSrc}
                    alt={`${c.title} · ${c.menuHeading}`}
                    title={c.menuHeading}
                    width={1376}
                    height={768}
                    loading="lazy"
                    decoding="async"
                    className="max-h-[460px] w-auto max-w-full object-contain"
                  />
                </div>
              </div>
            </section>

            {/* Google Flow Venue Atmosphere Gallery */}
            <section id="galleria-seo-flow" data-seo-flow-gallery className="mt-10 space-y-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#EAE3D5]">
                  {seoPack.eyebrow}
                </p>
                <h2 className="mt-1 font-serif text-2xl font-bold text-[#F6F1E7]">
                  {seoPack.sectionHeading}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-[#C2B9AA]">
                  {seoPack.sectionSubtitle}
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {seoPack.gallery.map((img) => (
                  <figure
                    key={img.src}
                    className="overflow-hidden border border-[#F6F1E7]/15 bg-[#050505] transition hover:border-[#F6F1E7]/45"
                  >
                    <div className="relative h-56 w-full bg-[#050505]">
                      <img
                        src={img.src}
                        title={img.title}
                        alt={img.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute left-3 top-3 border border-[#F6F1E7]/30 bg-[#050505]/90 px-2.5 py-1 text-[11px] font-semibold text-[#F6F1E7]">
                        {img.shotLabel}
                      </span>
                    </div>
                    <figcaption className="space-y-2 p-4">
                      <div className="flex flex-wrap gap-1.5 text-[11px]">
                        <span className="border border-[#F6F1E7]/25 bg-[#0B0A09] px-2 py-0.5 font-medium text-[#EAE3D5]">
                          {img.targetBadge}
                        </span>
                        <span className="border border-[#F6F1E7]/15 bg-[#0B0A09] px-2 py-0.5 text-[#C2B9AA]">
                          {img.outfitBadge}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-[#C2B9AA]">
                        <strong className="text-[#F6F1E7]">{img.title}</strong> · {img.description}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

            {/* Official Rate Card (#F6F1E7 Avorio Caldo) */}
            <div id="prezzi-natale" className="mt-10 border border-[#050505]/15 bg-[#F6F1E7] p-6 text-[#050505] sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-serif text-2xl font-bold text-[#050505]">
                  {c.priceHeading}
                </h2>
                <span className="border border-[#050505] bg-[#050505] px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#F6F1E7]" data-selling-fast-badge>
                  {scarcity.sellingFastBadge}
                </span>
              </div>
              <div className="mt-4 border border-[#050505]/15 bg-[#EFE9DC] p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="font-serif text-xl font-bold text-[#050505]">
                    {c.priceCardTitle}
                  </h3>
                  <span className="shrink-0 bg-[#050505] px-4 py-1.5 text-base font-bold text-[#F6F1E7]">
                    {c.priceCardAmount}
                  </span>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-[#24201B]">
                  {c.priceCardDetails}
                </p>
              </div>
            </div>

            {/* Official 6-Step Prepayment & Booking Protocol */}
            <section
              id="termini-pagamento"
              data-payment-terms-35
              className="mt-10 border border-[#F6F1E7]/25 bg-[#050505] p-6 sm:p-8"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#C9A84C]">
                {paymentTerms.eyebrow}
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-serif text-2xl font-bold text-[#F6F1E7]">
                  {paymentTerms.heading}
                </h2>
                <span className="border border-[#F6F1E7]/35 bg-[#0B0A09] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#EAE3D5]">
                  {paymentTerms.methodsBadge}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#C2B9AA]">
                {paymentTerms.subtitle}
              </p>
              <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {paymentTerms.steps.map((step, idx) => (
                  <li
                    key={step}
                    className="border border-[#F6F1E7]/15 bg-[#0B0A09] p-4"
                  >
                    <span className="inline-flex h-6 w-6 items-center justify-center bg-[#F6F1E7] font-mono text-xs font-bold text-[#050505]">
                      {idx + 1}
                    </span>
                    <p className="mt-2.5 text-xs leading-relaxed text-[#F6F1E7] sm:text-sm">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
              <p className="mt-4 border-l-2 border-[#C9A84C] pl-3 text-xs leading-relaxed text-[#C2B9AA]">
                {paymentTerms.note}
              </p>
            </section>

            {/* Direct Booking Box */}
            <div
              id="prenota-concierge"
              className="mt-10 border border-[#F6F1E7]/25 bg-[#050505] p-6 sm:p-8"
            >
              <h2 className="font-serif text-2xl font-bold text-[#F6F1E7]">
                {c.bookingHeading}
              </h2>
              <p className="mt-2 text-sm text-[#C2B9AA]">{c.bookingSubtitle}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event-cta-kind="table"
                  className="inline-flex items-center bg-[#25D366] px-6 py-3.5 text-sm font-bold text-[#050505] transition hover:bg-[#2EE472]"
                >
                  WhatsApp {SITE_CONTACT.whatsapp.number}
                </a>
                <a
                  href="tel:+393519127047"
                  className="inline-flex items-center border border-[#F6F1E7]/40 bg-[#0B0A09] px-5 py-3.5 text-sm font-semibold text-[#F6F1E7] transition hover:bg-[#F6F1E7] hover:text-[#050505]"
                >
                  {SITE_CONTACT.whatsapp.number}
                </a>
                <a
                  href="mailto:concierge@nightlifemilan.com"
                  className="inline-flex items-center border border-[#F6F1E7]/20 bg-[#0B0A09] px-5 py-3.5 text-sm font-semibold text-[#C2B9AA] transition hover:border-[#F6F1E7] hover:text-[#F6F1E7]"
                >
                  concierge@nightlifemilan.com
                </a>
                <Link
                  href={voyaNyeHref}
                  className="inline-flex items-center border border-[#C9A84C]/50 px-5 py-3.5 text-sm font-semibold text-[#F6F1E7] hover:bg-[#C9A84C] hover:text-[#050505]"
                >
                  {c.nyeCrossCta} →
                </Link>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div id="mappa-locale" className="mt-12">
              <h2 className="font-serif text-2xl font-bold text-[#F6F1E7]">
                {c.mapHeading}
              </h2>
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

            {/* FAQs (#F6F1E7 Capitolo Avorio Caldo) */}
            <div id="faq-evento" className="mt-12 space-y-4 border border-[#050505]/15 bg-[#F6F1E7] p-6 text-[#050505] sm:p-8">
              <h2 className="font-serif text-2xl font-bold text-[#050505]">
                {c.faqHeading}
              </h2>
              {c.faqs.map((faq) => (
                <div key={faq.q} className="border border-[#050505]/15 bg-[#EFE9DC] p-5">
                  <h3 className="font-semibold text-[#050505]">{faq.q}</h3>
                  <p className="mt-1.5 text-sm text-[#24201B]">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
      <SeoAuthorityHub lang={loc} />
    </main>
  );
}
