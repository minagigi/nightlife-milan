import SeoAuthorityHub from '@/components/SeoAuthorityHub';

import EventVenueMap from '@/components/EventVenueMap';
import { getEventVenueCopy } from '@/lib/i18n/eventVenueCopy';
import type { LocaleCode } from '@/lib/i18n/locales';
import { capodannoEventPath, capodannoNavigation, capodannoPath } from '@/lib/capodanno/routes';
import { getPaymentTerms35 } from '@/lib/capodanno/paymentTerms35';
import {
  formatCapodannoHours35,
  getCapodannoDetailFaqs35,
  getCapodannoLocalizedEventContent,
  getCapodannoLocalizedEventSubtitle,
  getCapodannoLocalizedEventTitle,
  getCapodannoUiCopy,
} from '@/lib/capodanno/i18n';
import {
  REPVBLIC_NYE_OFFER_PRICES_EUR,
  getRepvblicNyePageCopy,
  isRepvblicNyeSlug,
} from '@/lib/capodanno/repvblic35';
import {
  GATE_NYE_OFFER_PRICES_EUR,
  getGateNyePageCopy,
  isGateNyeSlug,
} from '@/lib/capodanno/gate35';
import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import { SITE_CONTACT } from '@/config/contact';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import { localePrefix } from '@/lib/i18n/locales';
import { getScarcityAndChatCopy } from '@/lib/i18n/scarcityAndChatCopy';
import {
  CAPODANNO_EVENTS,
  getCapodannoEventBySlug,
  getCapodannoEventForClub,
  type CapodannoEventItem,
} from '@/lib/capodannoEvents';
import { mockVenues } from '@/lib/data';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { getExistingGuideSlug35, getLocalizedVenueSlug35 } from '@/lib/i18n/localizedSlugs35';
import { getLocalizedText } from '@/lib/seo';
import {
  buildSeoEventImagePack,
  getCapodannoOfficialPosterSrc,
} from '@/lib/seoEventImages';
import { getClubNyeBannerCopy35 } from '@/lib/clubSeoMeta35';
import SinglePassVenueModule from '@/components/single-pass/SinglePassVenueModule';
import TerrazzaDuomoBookingModule from '@/components/single-pass/TerrazzaDuomoBookingModule';
import {
  getSkusForVenue,
  getSkuFeeRate,
  getVenueIdByEventSlug,
} from '@/lib/single-pass/catalog';
import { formatCheckoutFeeNote35 } from '@/lib/single-pass/i18n35';

type Props = {
  locale: string;
  event: CapodannoEventItem;
};

const SITE_URL = 'https://nightlifemilan.com';

export default function CapodannoDetailView({ locale, event }: Props) {
  const prefix = localePrefix(locale);
  const nav = capodannoNavigation(locale);
  const baseUi = getCapodannoUiCopy(locale);
  const baseScarcity = getScarcityAndChatCopy(locale);
  // Party-only events (official REPVBLIC and PERREO XL @ Gate Milano NYE rate cards):
  // no dinner, no show, no bottle service, no "almost sold out" claim.
  const isGate = isGateNyeSlug(event.slug);
  const isRepvblic = isRepvblicNyeSlug(event.slug);
  const isTerrazzaDuomo21 = event.slug === 'capodanno-terrazza-duomo-21';
  const isPartyOnly = isRepvblic || isGate;
  const partyCopy = isGate
    ? getGateNyePageCopy(locale)
    : isRepvblic
      ? getRepvblicNyePageCopy(locale)
      : null;
  const partyOfferPrices = isGate ? GATE_NYE_OFFER_PRICES_EUR : REPVBLIC_NYE_OFFER_PRICES_EUR;
  const ui = partyCopy
    ? {
        ...baseUi,
        tocPrices: partyCopy.tocPrices,
        bookingSubtitle: partyCopy.bookingSubtitle,
        musicLabel: partyCopy.musicLabel,
      }
    : isTerrazzaDuomo21
      ? {
          ...baseUi,
          bookingHeading: baseUi.terrazzaBookingHeading,
          bookingSubtitle: baseUi.terrazzaBookingSubtitle,
        }
      : baseUi;
  const scarcity = partyCopy
    ? { ...baseScarcity, urgencyAlertTitle: partyCopy.alertTitle, urgencyAlertBody: partyCopy.alertBody }
    : baseScarcity;
  const venueMapCopy = getEventVenueCopy(locale as LocaleCode);
  const paymentTerms = getPaymentTerms35(locale);

  const localized = getCapodannoLocalizedEventContent(event, locale);
  const isClosedForNye = Boolean(event.closedForNye || localized.closedForNye);
  const isSoldOutForNye = Boolean(event.soldOutForNye || localized.soldOutForNye);
  const isUnavailableForNye = isClosedForNye || isSoldOutForNye;
  const multiOfferPrices = isPartyOnly ? partyOfferPrices : localized.offerPricesEur;
  const alternativeSlugList =
    localized.alternativeSlugs && localized.alternativeSlugs.length > 0
      ? localized.alternativeSlugs
      : ['capodanno-justme-milano-torre-branca', 'capodanno-pineta-milano', 'capodanno-voya-rooftop-milano', 'capodanno-repvblic-milano'];
  const alternativeEventsResolved = alternativeSlugList
    .map((s) => getCapodannoEventBySlug(s))
    .filter((e): e is CapodannoEventItem => e !== undefined && !e.closedForNye && !e.soldOutForNye);
  const rooftopAlternatives = isUnavailableForNye ? alternativeEventsResolved : [];
  const confirmedAlternatives =
    !isUnavailableForNye && localized.alternativeSlugs && localized.alternativeSlugs.length > 0
      ? alternativeEventsResolved
      : [];
  const isTermeDetail =
    event.slug.startsWith('capodanno-qc-terme-') ||
    event.slug === 'capodanno-terme-di-sirmione-aquaria-lago-di-garda';
  const partnerGuideHref = `${prefix}/${getLocalizedDir35('guides', locale as LocaleCode)}/${getExistingGuideSlug35(isTermeDetail ? 'g-117' : 'g-118', locale as LocaleCode)}`;
  const title = localized.title;
  const subtitle = localized.subtitle;
  const description = localized.description;
  const music = localized.musicAndFormat;
  const dress = localized.dressCode;
  const tiers = localized.tiers;
  const highlights = localized.highlights;
  const sourceBasis = localized.sourceBasis;
  const canonicalPath = capodannoEventPath(event.slug, locale);
  const officialPosterSrc = getCapodannoOfficialPosterSrc(event.slug);
  const matchedPublicVenue =
    event.slug === 'capodanno-justme-garda-lake'
      ? mockVenues.find((v) => v.id === 'v-justme-garda')
      : mockVenues.find((v) => getCapodannoEventForClub(v.slugs.en, getLocalizedText(v.localizedContent.name, 'en'))?.slug === event.slug);
  const matchedPublicVenueName = matchedPublicVenue
    ? getLocalizedText(matchedPublicVenue.localizedContent.name, locale)
    : '';
  const matchedPublicVenueHref = matchedPublicVenue
    ? `${prefix}/${getLocalizedDir35('clubs', locale as LocaleCode)}/${getLocalizedVenueSlug35(matchedPublicVenue.id, locale as LocaleCode)}`
    : null;

  const seoPack = buildSeoEventImagePack({
    locale,
    eventSlug: event.slug,
    venueName: event.venueName,
    h1: title,
    h2List: [
      ui.programHeading,
      `${ui.pricesHeadingPrefix} · ${event.venueName}`,
      ui.bookingHeading,
      `${ui.mapHeadingEvent} · ${event.venueName}`,
    ],
    h3List: tiers.map((t) => t.label),
    categorySlug: event.category,
    music,
    dressCode: dress,
    posterSrc: officialPosterSrc,
    shotLabels: partyCopy?.shots || localized.shots,
  });

  const related = CAPODANNO_EVENTS.filter(
    (item) => !item.closedForNye && !item.soldOutForNye && item.category === event.category && item.slug !== event.slug
  ).slice(0, 6);

  const displayHours = formatCapodannoHours35(event.hours, locale);
  const defaultFaqs = getCapodannoDetailFaqs35({
    locale,
    venueName: event.venueName,
    address: event.address,
    city: event.city,
    province: event.province,
    hours: displayHours,
    dressCode: dress,
    priceSummary: localized.priceSummary,
    sourceBasis,
    paymentSteps: paymentTerms.steps,
  });

  const faqs =
    localized.customFaqs && localized.customFaqs.length > 0 ? localized.customFaqs : defaultFaqs;

  const eventSchemaNode: Record<string, unknown> = {
    '@type': 'Event',
    name: title,
    description,
    startDate: event.startISO,
    endDate: event.endISO,
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
      name: event.venueName,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.address,
        addressLocality: event.city,
        addressRegion: 'Lombardia',
        addressCountry: 'IT',
      },
    },
  };

  eventSchemaNode.performer =
    event.slug === 'capodanno-bischeri-milano'
      ? {
          '@type': 'Person',
          name: 'DJ Gigi Zeus',
        }
      : isGate
        ? {
            '@type': 'PerformingGroup',
            name: 'PERREO XL DJs',
          }
        : {
            '@type': 'PerformingGroup',
            name: `${event.venueName} Resident DJs`,
          };

  const offerAvailability = isUnavailableForNye
    ? 'https://schema.org/SoldOut'
    : 'https://schema.org/InStock';

  const schemaOfferUrl = event.xceedUrl || `${SITE_URL}${canonicalPath}`;

  if (multiOfferPrices && multiOfferPrices.length > 0) {
    eventSchemaNode.offers = tiers.slice(0, multiOfferPrices.length).map((tier, idx) => ({
      '@type': 'Offer',
      name: tier.label,
      description: tier.details,
      url: schemaOfferUrl,
      price: String(multiOfferPrices[idx]),
      priceCurrency: 'EUR',
      availability: offerAvailability,
      validFrom: '2026-10-01T00:00:00+02:00',
    }));
  } else if (event.priceFromEur > 0 || event.category === 'piazza') {
    eventSchemaNode.offers = {
      '@type': 'Offer',
      url: schemaOfferUrl,
      price: String(event.priceFromEur),
      priceCurrency: 'EUR',
      availability: offerAvailability,
      validFrom: '2026-10-01T00:00:00+02:00',
    };
  } else if (isUnavailableForNye) {
    eventSchemaNode.offers = {
      '@type': 'Offer',
      url: schemaOfferUrl,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/SoldOut',
      validFrom: '2026-10-01T00:00:00+02:00',
    };
  } else {
    eventSchemaNode.offers = {
      '@type': 'Offer',
      url: schemaOfferUrl,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/PreOrder',
      validFrom: '2026-10-01T00:00:00+02:00',
    };
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}${prefix || '/'}` },
          { '@type': 'ListItem', position: 2, name: nav.h1, item: `${SITE_URL}${capodannoPath(locale)}` },
          { '@type': 'ListItem', position: 3, name: title, item: `${SITE_URL}${canonicalPath}` },
        ],
      },
      eventSchemaNode,
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  const mapQuery = encodeURIComponent(`${event.venueName}, ${event.address}, ${event.city}`);
  const [capDisplayH1, ...capTitleExtra] = title.split(/\s*·\s*/);
  const capTitleQualifier = capTitleExtra.join(' · ');
  const singlePassVenueId = getVenueIdByEventSlug(event.slug);

  return (
    <main
      data-layout-alt="alternativa-02-capitoli-colore-netto"
      className="taste-pillar-root taste-capodanno-root min-h-[100dvh] bg-[#050505] pb-16 pt-3 text-[#F6F1E7] sm:pt-4"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="w-full">
        {/* CAPITOLO 01 — NOTTE #050505: Locandina 4:5 a pieno placeholder, Titolo & Sintesi aperta */}
        <div className="bg-[#050505] pb-10 text-[#F6F1E7]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <nav className="mb-3 flex flex-wrap items-center gap-1.5 text-xs font-semibold text-[#C2B9AA] sm:mb-4 sm:text-[13px]">
              <Link href={prefix || '/'} className="hover:text-[#F6F1E7]">Home</Link>
              <span>/</span>
              <Link href={capodannoPath(locale)} className="hover:text-[#F6F1E7]">
                {nav.menuLabel} 2027
              </Link>
              <span>/</span>
              <span className="text-[#F6F1E7]">{event.venueName}</span>
            </nav>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-10">
              <div className="lg:col-span-5">
                <div className="aspect-[4/5] w-full overflow-hidden border border-[#F6F1E7]/18 bg-[#050505]">
                  <Image
                    quality={95}
                    src={seoPack.poster.src}
                    title={seoPack.poster.title}
                    alt={seoPack.poster.alt}
                    width={1080}
                    height={1350}
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 1080px) 100vw, 1080px"
                    className="block h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="min-w-0 lg:col-span-7">
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="bg-[#F6F1E7] px-3 py-1 font-mono text-xs font-bold text-[#050505]">
                    {event.slug === 'capodanno-world-winter-week-aprica' ? '30/12/2026 - 03/01/2027' : ui.dateBadge}
                  </span>
                  <span className="border border-[#F6F1E7]/30 bg-[#050505] px-3 py-1 text-xs font-semibold text-[#F6F1E7]">
                    {event.city} ({event.province})
                  </span>
                  {!isPartyOnly && !isUnavailableForNye && event.priceFromEur > 0 && (
                    <span
                      className="bg-[#25D366] px-3 py-1 text-xs font-extrabold uppercase text-[#050505]"
                      data-almost-sold-out-badge
                    >
                      {scarcity.almostSoldOutBadge}
                    </span>
                  )}
                  {isUnavailableForNye && (
                    <span
                      className="border border-amber-400/60 bg-amber-950/90 px-3 py-1 text-xs font-extrabold uppercase text-amber-100"
                      data-sold-out-for-nye-badge
                    >
                      {ui.soldOutNye2027Badge}
                    </span>
                  )}
                </div>

                <h1
                  data-event-title={title}
                  data-event-party-only={isPartyOnly ? 'true' : undefined}
                  data-event-sold-out-nye={isUnavailableForNye ? 'true' : undefined}
                  className="font-display font-bold uppercase leading-[1.03] text-[#F6F1E7]"
                >
                  {capDisplayH1 || title}
                </h1>
                {capTitleQualifier && (
                  <p className="mt-2 font-sans text-base font-semibold text-[#EAE3D5]">
                    {capTitleQualifier}
                  </p>
                )}
                <p className="mt-2.5 max-w-[60ch] font-sans text-sm leading-relaxed text-[#C2B9AA] sm:text-base">
                  {subtitle}
                </p>

                {/* Sintesi Rapida S17 — 1 Colonna Mobile con Filetti Sottili (Zero Cassettoni) */}
                <section data-s17-summary-grid className="mt-6 border-t border-[#F6F1E7]/16">
                  <dl className="grid grid-cols-1 divide-y divide-[#F6F1E7]/14 md:grid-cols-2 md:gap-x-8">
                    <div className="py-3">
                      <dt className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#EAE3D5]">
                        {ui.colPrices}
                      </dt>
                      <dd className="mt-0.5 font-display text-xl font-extrabold text-[#F6F1E7]">
                        {localized.priceSummary || `€${event.priceFromEur}`}
                      </dd>
                    </div>
                    <div className="py-3">
                      <dt className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#C2B9AA]">
                        {ui.hoursLabel}
                      </dt>
                      <dd className="mt-0.5 font-mono text-sm font-bold tabular-nums text-[#F6F1E7]">
                        {displayHours}
                      </dd>
                    </div>
                    <div className="py-3">
                      <dt className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#C2B9AA]">
                        TARGET
                      </dt>
                      <dd className="mt-0.5 text-sm font-semibold text-[#F6F1E7]">
                        {seoPack.targetLabel}
                      </dd>
                    </div>
                    <div className="py-3">
                      <dt className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#C2B9AA]">
                        {ui.dressCodeLabel}
                      </dt>
                      <dd className="mt-0.5 text-sm font-semibold text-[#F6F1E7]">
                        {dress}
                      </dd>
                    </div>
                    <div className="py-3 md:col-span-2">
                      <dt className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#C2B9AA]">
                        {ui.musicLabel}
                      </dt>
                      <dd className="mt-0.5 text-sm font-semibold text-[#F6F1E7]">
                        {music}
                      </dd>
                    </div>
                    <div className="py-3 md:col-span-2">
                      <dt className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#C2B9AA]">
                        {ui.tocProgram}
                      </dt>
                      <dd className="mt-0.5 text-sm font-semibold text-[#F6F1E7]">
                        {highlights[0] || event.venueName}
                      </dd>
                    </div>
                  </dl>
                </section>

                {/* Indice Rapido Compatto */}
                <nav aria-label={ui.tocTitle} className="mt-4 border-t border-[#F6F1E7]/14 pt-4">
                  <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#C2B9AA]">
                    {ui.tocTitle}
                  </p>
                  <ul className="flex gap-2 overflow-x-auto pb-1.5 text-xs font-bold md:flex-wrap md:overflow-visible md:pb-0">
                    {isUnavailableForNye ? (
                      <li className="shrink-0">
                        <a
                          href="#alternative-rooftop"
                          className="inline-flex min-h-[38px] items-center bg-[#EAE3D5] px-3.5 py-1.5 text-[#050505]"
                        >
                          {localized.alternativesHeading || ui.confirmedAlternativesHeading}
                        </a>
                      </li>
                    ) : (
                      <>
                        <li className="shrink-0">
                          <a
                            href="#prezzi-formule"
                            className="inline-flex min-h-[38px] items-center bg-[#25D366] px-3.5 py-1.5 text-[#050505]"
                          >
                            {ui.tocPrices}
                          </a>
                        </li>
                        <li className="shrink-0">
                          <a
                            href="#prenota-concierge"
                            className="inline-flex min-h-[38px] items-center border border-[#EAE3D5]/35 bg-[#141311] px-3.5 py-1.5 text-[#F6F1E7] hover:border-[#F6F1E7]"
                          >
                            {ui.tocBooking}
                          </a>
                        </li>
                        {(localized.menus?.length ?? 0) > 0 && (
                          <li className="shrink-0">
                            <a
                              href="#menu-ufficiale"
                              className="inline-flex min-h-[38px] items-center border border-[#F6F1E7]/22 bg-[#141311] px-3.5 py-1.5 text-[#F6F1E7] hover:border-[#F6F1E7]"
                            >
                              {localized.menusHeading || ui.tocMenuLabel}
                            </a>
                          </li>
                        )}
                        <li className="shrink-0">
                          <a
                            href="#programma-serata"
                            className="inline-flex min-h-[38px] items-center border border-[#F6F1E7]/22 bg-[#141311] px-3.5 py-1.5 text-[#F6F1E7] hover:border-[#F6F1E7]"
                          >
                            {ui.tocProgram}
                          </a>
                        </li>
                        {(localized.conditions?.length ?? 0) > 0 && (
                          <li className="shrink-0">
                            <a
                              href="#condizioni-ufficiali"
                              className="inline-flex min-h-[38px] items-center border border-[#F6F1E7]/22 bg-[#141311] px-3.5 py-1.5 text-[#F6F1E7] hover:border-[#F6F1E7]"
                            >
                              {localized.conditionsHeading || ui.officialConditionsHeading}
                            </a>
                          </li>
                        )}
                        <li className="shrink-0">
                          <a
                            href="#termini-pagamento"
                            className="inline-flex min-h-[38px] items-center border border-[#F6F1E7]/22 bg-[#141311] px-3.5 py-1.5 text-[#F6F1E7] hover:border-[#F6F1E7]"
                          >
                            {paymentTerms.tocLabel}
                          </a>
                        </li>
                      </>
                    )}
                    <li className="shrink-0">
                      <a
                        href="#galleria-seo-flow"
                        className="inline-flex min-h-[38px] items-center border border-[#F6F1E7]/22 bg-[#141311] px-3.5 py-1.5 text-[#F6F1E7] hover:border-[#F6F1E7]"
                      >
                        Foto
                      </a>
                    </li>
                    <li className="shrink-0">
                      <a
                        href="#faq-evento"
                        className="inline-flex min-h-[38px] items-center border border-[#F6F1E7]/22 bg-[#141311] px-3.5 py-1.5 text-[#F6F1E7] hover:border-[#F6F1E7]"
                      >
                        {ui.faqHeadingPrefix}
                      </a>
                    </li>
                    <li className="shrink-0">
                      <a
                        href="#mappa-locale"
                        className="inline-flex min-h-[38px] items-center border border-[#F6F1E7]/22 bg-[#141311] px-3.5 py-1.5 text-[#F6F1E7] hover:border-[#F6F1E7]"
                      >
                        {ui.mapHeadingEvent}
                      </a>
                    </li>
                    <li className="shrink-0">
                      <a
                        href="#eventi-correlati"
                        className="inline-flex min-h-[38px] items-center border border-[#F6F1E7]/22 bg-[#141311] px-3.5 py-1.5 text-[#F6F1E7] hover:border-[#F6F1E7]"
                      >
                        {ui.tocRelated}
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* CAPITOLO 02 — CARTA CALDA #F6F1E7: Prezzi Chiari, Biglietteria Diretta & Prenotazione */}
        <div className="border-y border-[#050505] bg-[#F6F1E7] py-10 text-[#050505]">
          <div className="mx-auto max-w-5xl space-y-8 px-4 sm:px-6 lg:px-8">
            {isUnavailableForNye ? (
              <>
                <div
                  role="status"
                  data-closure-notice
                  className="border-l-4 border-[#050505] bg-[#EAE3D5] p-5 text-[#050505]"
                >
                  <p className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#050505]">
                    {localized.closureBannerTitle}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#24201B] sm:text-base">
                    {localized.closureBannerBody}
                  </p>
                </div>

                <section
                  id="alternative-rooftop"
                  data-rooftop-alternatives
                  className="bg-[#F6F1E7] pt-2 text-[#050505]"
                >
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#4A453E]">
                    {ui.confirmedVenuesBanner}
                  </p>
                  <h2 className="mt-1 font-display text-3xl font-bold uppercase text-[#050505] sm:text-4xl">
                    {localized.alternativesHeading}
                  </h2>
                  <p className="mt-2 max-w-[54ch] text-base text-[#3D3830]">
                    {localized.alternativesSubheading}
                  </p>
                  <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
                    {rooftopAlternatives.map((alt) => {
                      const altTitle = getCapodannoLocalizedEventTitle(alt, locale);
                      const altSub = getCapodannoLocalizedEventSubtitle(alt, locale);
                      const altHref = capodannoEventPath(alt.slug, locale);
                      return (
                        <article
                          key={alt.slug}
                          className="flex flex-col justify-between border-b border-[#050505]/20 bg-[#F6F1E7] pb-6 text-[#050505]"
                        >
                          <div>
                            <div
                              data-no-lightbox="true"
                              className="aspect-[4/5] w-full overflow-hidden border border-[#050505]/18 bg-[#050505]"
                            >
                              <img
                                src={alt.image}
                                alt={altTitle}
                                width={1080}
                                height={1350}
                                loading="lazy"
                                decoding="async"
                                className="block h-full w-full object-cover"
                              />
                            </div>
                            <h3 className="mt-3.5 font-display text-xl font-bold text-[#050505]">
                              {altTitle}
                            </h3>
                            <p className="mt-1 text-[13px] text-[#3D3830]">{altSub}</p>
                            <p className="mt-2 font-mono text-[13px] font-bold text-[#050505]">
                              {getCapodannoLocalizedEventContent(alt, locale).priceSummary}
                            </p>
                          </div>
                          <Link
                            href={altHref}
                            className="mt-4 inline-flex min-h-[46px] items-center justify-center bg-[#050505] px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.04em] text-[#F6F1E7] transition hover:bg-[#1E1C19]"
                          >
                            {ui.viewPackagesCta}
                          </Link>
                        </article>
                      );
                    })}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3 bg-[#050505] p-4 text-[#F6F1E7]">
                    <a
                      href={getConciergeBookingUrl(
                        locale,
                        `NYE 2027 Alternatives (${event.venueName})`,
                        `${SITE_URL}${canonicalPath}`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center bg-[#25D366] px-5 py-2.5 text-[13px] font-extrabold uppercase tracking-[0.04em] text-[#050505]"
                    >
                      WhatsApp {SITE_CONTACT.whatsapp.number}
                    </a>
                    <Link
                      href={partnerGuideHref}
                      locale={locale}
                      className="inline-flex min-h-[44px] items-center bg-[#F6F1E7] px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.04em] text-[#050505] hover:bg-[#EAE3D5]"
                    >
                      {getClubNyeBannerCopy35(locale).ctaGuide} →
                    </Link>
                    <Link
                      href={capodannoPath(locale)}
                      locale={locale}
                      className="inline-flex min-h-[44px] items-center border border-[#F6F1E7]/35 bg-[#141311] px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.04em] text-[#F6F1E7] hover:border-[#F6F1E7]"
                    >
                      {ui.backToAllBtn}
                    </Link>
                  </div>
                </section>
              </>
            ) : (
              <>
                {event.priceFromEur > 0 ? (
                  <div
                    role="alert"
                    data-urgency-alert
                    className="border-l-2 border-[#050505] bg-[#F6F1E7] py-1 pl-4 text-[#050505]"
                  >
                    <p className="text-sm font-extrabold uppercase tracking-wide text-[#050505]">
                      {scarcity.urgencyAlertTitle}
                    </p>
                    <p className="mt-1 max-w-[60ch] text-sm leading-relaxed text-[#24201B]">
                      {scarcity.urgencyAlertBody}
                    </p>
                  </div>
                ) : event.category !== 'piazza' ? (
                  <div
                    role="status"
                    data-tba-waitlist-notice
                    className="border-l-2 border-[#050505] bg-[#F6F1E7] py-1 pl-4 text-[#050505]"
                  >
                    <p className="text-sm font-bold text-[#050505]">{localized.musicAndFormat}</p>
                    <p className="mt-1 max-w-[60ch] text-sm leading-relaxed text-[#24201B]">
                      {localized.priceSummary}
                    </p>
                  </div>
                ) : null}

                {/* Tariffe Ufficiali — Tabella aperta a righe con filetti sottili (1 colonna < 768px) */}
                <div
                  id="prezzi-formule"
                  className="bg-[#F6F1E7] text-[#050505]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#050505] pb-4">
                    <div>
                      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#4A453E]">
                        01 · {ui.tocPrices}
                      </p>
                      <h2 className="mt-1 font-display text-2xl font-bold uppercase text-[#050505] sm:text-3xl">
                        {ui.pricesHeadingPrefix} · {event.venueName}
                      </h2>
                    </div>
                    {!isPartyOnly && event.priceFromEur > 0 && (
                      <span
                        className="bg-[#050505] px-3 py-1 font-mono text-xs font-bold uppercase text-[#F6F1E7]"
                        data-selling-fast-badge
                      >
                        {scarcity.sellingFastBadge}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-xs font-medium leading-relaxed text-[#4A453E] sm:text-[13px]">
                    {sourceBasis}
                  </p>
                  {!event.partner &&
                    event.priceFromEur > 0 &&
                    (isTerrazzaDuomo21 || Boolean(singlePassVenueId)) &&
                    (() => {
                      const spSkus = singlePassVenueId ? getSkusForVenue(singlePassVenueId) : [];
                      const spFeeRate = spSkus.length > 0 ? getSkuFeeRate(spSkus[0], 'venue') : 0.2;
                      return (
                        <p
                          className="mt-2 text-xs font-bold text-[#050505] sm:text-[13px]"
                          data-checkout-fee-note
                        >
                          {formatCheckoutFeeNote35(locale, spFeeRate)}
                        </p>
                      );
                    })()}

                  <div className="mt-4 border-y border-[#050505]/25">
                    <table className="block w-full border-collapse text-left text-sm tabular-nums text-[#050505] md:table">
                      <thead className="hidden border-b border-[#050505]/25 font-mono text-xs font-bold uppercase tracking-wider text-[#4A453E] md:table-header-group">
                        <tr>
                          <th className="py-3 pr-6">{ui.colPrices} · {event.venueName}</th>
                          <th className="whitespace-nowrap py-3 pl-6 text-right">{ui.colPrices}</th>
                        </tr>
                      </thead>
                      <tbody className="block divide-y divide-[#050505]/18 md:table-row-group">
                        {tiers.map((tier) => (
                          <tr
                            key={tier.label}
                            className="block py-4 md:table-row md:py-0"
                          >
                            <td className="block align-top md:table-cell md:py-4 md:pr-6">
                              <h3 className="font-display text-xl font-bold leading-snug text-[#050505]">
                                {tier.label}
                              </h3>
                              <p className="mt-1 text-sm leading-relaxed text-[#3D3830]">
                                {tier.details}
                              </p>
                            </td>
                            <td className="mt-2 block text-left align-top md:mt-0 md:table-cell md:whitespace-nowrap md:py-4 md:pl-6 md:text-right">
                              <span className="font-display text-2xl font-extrabold text-[#050505] sm:text-3xl">
                                {tier.price}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Direct E-Commerce Booking Module */}
                {isTerrazzaDuomo21 ? (
                  <TerrazzaDuomoBookingModule locale={locale} />
                ) : singlePassVenueId ? (
                  <SinglePassVenueModule locale={locale} venueId={singlePassVenueId} />
                ) : null}

                {/* Dark Action Plinth for WhatsApp Concierge & Xceed Priority */}
                <div
                  id="prenota-concierge"
                  className="bg-[#050505] p-6 text-[#F6F1E7] sm:p-8"
                >
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#EAE3D5]">
                    CONCIERGE UFFICIALE NIGHTLIFE MILAN
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-bold text-[#F6F1E7] sm:text-3xl">
                    {ui.bookingHeading}
                  </h2>
                  <p className="mt-2 max-w-[56ch] text-sm leading-relaxed text-[#C2B9AA]">
                    {ui.bookingSubtitle}
                  </p>
                  <div className="mt-5 flex flex-col gap-3 md:flex-row md:flex-wrap">
                    <a
                      href={getConciergeBookingUrl(
                        locale,
                        `${title} (${event.venueName} - 31/12/2026)`,
                        `${SITE_URL}${canonicalPath}`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-event-cta-kind="table"
                      className="inline-flex min-h-[48px] items-center justify-center bg-[#25D366] px-6 py-3 text-sm font-extrabold uppercase tracking-wider text-[#050505] transition hover:bg-[#2EE472]"
                    >
                      WhatsApp {SITE_CONTACT.whatsapp.number}
                    </a>
                    {event.xceedUrl ? (
                      <a
                        href={event.xceedUrl}
                        target="_blank"
                        rel="sponsored noopener noreferrer"
                        data-event-cta-kind="admission"
                        className="inline-flex min-h-[48px] items-center justify-center bg-[#EAE3D5] px-6 py-3 text-sm font-extrabold uppercase tracking-wider text-[#050505] transition hover:bg-[#F6F1E7]"
                      >
                        {scarcity.xceedPriorityCta}
                      </a>
                    ) : null}
                    <a
                      href="mailto:concierge@nightlifemilan.com"
                      className="inline-flex min-h-[48px] items-center justify-center border border-[#EAE3D5]/32 bg-[#141311] px-5 py-3 text-sm font-semibold text-[#F6F1E7] transition hover:border-[#EAE3D5]"
                    >
                      concierge@nightlifemilan.com
                    </a>
                    <Link
                      href={capodannoPath(locale)}
                      className="inline-flex min-h-[48px] items-center justify-center border border-[#EAE3D5]/32 bg-[#141311] px-5 py-3 text-sm font-semibold text-[#F6F1E7] transition hover:bg-[#EAE3D5] hover:text-[#050505]"
                    >
                      {ui.backToAllBtn}
                    </Link>
                  </div>
                </div>

                {/* Confirmed Alternatives Cross-Sell (if any) */}
                {confirmedAlternatives.length > 0 && (
                  <section
                    id="alternative-confermate"
                    data-confirmed-alternatives
                    className="border-t border-[#050505]/20 bg-[#F6F1E7] pt-8 text-[#050505]"
                  >
                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#4A453E]">
                      {ui.confirmedVenuesBanner}
                    </p>
                    {localized.alternativesHeading && (
                      <h2 className="mt-1 font-display text-2xl font-bold uppercase text-[#050505] sm:text-3xl">
                        {localized.alternativesHeading}
                      </h2>
                    )}
                    {localized.alternativesSubheading && (
                      <p className="mt-2 text-sm text-[#3D3830]">
                        {localized.alternativesSubheading}
                      </p>
                    )}
                    <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
                      {confirmedAlternatives.map((alt) => {
                        const altTitle = getCapodannoLocalizedEventTitle(alt, locale);
                        const altSub = getCapodannoLocalizedEventSubtitle(alt, locale);
                        const altHref = capodannoEventPath(alt.slug, locale);
                        return (
                          <article
                            key={alt.slug}
                            className="flex flex-col justify-between border-b border-[#050505]/20 bg-[#F6F1E7] pb-6 text-[#050505]"
                          >
                            <div>
                              <div
                                data-no-lightbox="true"
                                className="aspect-[4/5] w-full overflow-hidden border border-[#050505]/18 bg-[#050505]"
                              >
                                <img
                                  src={alt.image}
                                  alt={altTitle}
                                  width={1080}
                                  height={1350}
                                  loading="lazy"
                                  decoding="async"
                                  className="block h-full w-full object-cover"
                                />
                              </div>
                              <h3 className="mt-3.5 font-display text-xl font-bold text-[#050505]">
                                {altTitle}
                              </h3>
                              <p className="mt-1 text-[13px] text-[#3D3830]">{altSub}</p>
                              <p className="mt-2 font-mono text-[13px] font-bold text-[#050505]">
                                {getCapodannoLocalizedEventContent(alt, locale).priceSummary}
                              </p>
                            </div>
                            <Link
                              href={altHref}
                              locale={locale}
                              className="mt-4 inline-flex min-h-[46px] items-center justify-center bg-[#050505] px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.04em] text-[#F6F1E7] transition hover:bg-[#1E1C19]"
                            >
                              {ui.viewPackagesCta}
                            </Link>
                          </article>
                        );
                      })}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link
                        href={partnerGuideHref}
                        locale={locale}
                        className="inline-flex min-h-[44px] items-center bg-[#050505] px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.04em] text-[#F6F1E7] hover:bg-[#1E1C19]"
                      >
                        {(localized.relatedHolidayBanner?.ctaLabel || ui.viewPackagesCta).replace(
                          /\s*→+$/,
                          '',
                        )}{' '}
                        →
                      </Link>
                      <Link
                        href={capodannoPath(locale)}
                        locale={locale}
                        className="inline-flex min-h-[44px] items-center border border-[#050505] bg-[#F6F1E7] px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.04em] text-[#050505] hover:bg-[#050505] hover:text-[#F6F1E7]"
                      >
                        {ui.backToAllBtn}
                      </Link>
                    </div>
                  </section>
                )}
              </>
            )}
          </div>
        </div>

        {/* CAPITOLO 03 — CHAMPAGNE #EAE3D5: Menu Ufficiale a pieno placeholder & Programma arioso */}
        <div className="border-b border-[#050505] bg-[#EAE3D5] py-10 text-[#050505]">
          <div className="mx-auto max-w-5xl space-y-10 px-4 sm:px-6 lg:px-8">
            {!isUnavailableForNye && localized.menus && localized.menus.length > 0 && (
              <section
                id="menu-ufficiale"
                data-official-menus
                data-lightbox-group="capodanno-menus"
                className="space-y-8"
              >
                <div className="border-b border-[#050505] pb-4">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#4A453E]">
                    GASTRONOMIA & CALICI UFFICIALI
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-bold uppercase text-[#050505] sm:text-3xl">
                    {localized.menusHeading || 'Menu'}
                  </h2>
                </div>
                <div className="space-y-10">
                  {localized.menus.map((menu) => (
                    <article
                      key={menu.id}
                      className="grid grid-cols-1 gap-6 border-b border-[#050505]/20 pb-8 last:border-0 last:pb-0 lg:grid-cols-12 lg:items-start lg:gap-10"
                    >
                      <div className={menu.imageSrc ? 'lg:col-span-7' : 'lg:col-span-12'}>
                        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#050505]/20 pb-3">
                          <div>
                            <h3 className="font-display text-xl font-bold text-[#050505] sm:text-2xl">
                              {menu.title}
                            </h3>
                            <p className="mt-1 text-xs text-[#4A453E] sm:text-sm">{menu.subtitle}</p>
                          </div>
                          <span className="shrink-0 bg-[#050505] px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.04em] text-[#F6F1E7]">
                            {menu.price}
                          </span>
                        </div>
                        <dl className="mt-4 divide-y divide-[#050505]/14 text-sm">
                          {menu.courses.map((c) => (
                            <div
                              key={`${menu.id}-${c.course}`}
                              className="py-2.5"
                            >
                              <dt className="font-mono text-xs font-bold uppercase tracking-wide text-[#4A453E]">
                                {c.course}
                              </dt>
                              <dd className="mt-0.5 text-sm leading-relaxed text-[#050505] sm:text-base">
                                {c.dish}
                              </dd>
                            </div>
                          ))}
                        </dl>
                        <p className="mt-4 border-l-2 border-[#050505] pl-3.5 text-xs font-semibold text-[#24201B] sm:text-sm">
                          {menu.beverages}
                        </p>
                      </div>
                      {menu.imageSrc && (
                        <div className="lg:col-span-5">
                          <div className="aspect-[4/5] w-full overflow-hidden border border-[#050505]/20 bg-[#050505]">
                            <img
                              src={menu.imageSrc}
                              alt={menu.imageAlt}
                              title={menu.title}
                              width={1080}
                              height={1350}
                              loading="lazy"
                              decoding="async"
                              className="block h-full w-full object-cover"
                            />
                          </div>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            )}

            <div id="programma-serata" className="space-y-6">
              <div className="border-b border-[#050505] pb-4">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#4A453E]">
                  FORMAT, ORARI & ATMOSFERA
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold uppercase text-[#050505] sm:text-3xl">
                  {ui.programHeading}
                </h2>
              </div>

              {/* Key Highlights — 1 Colonna Mobile con Filetti Sottili (Zero Cassettoni) */}
              <ul className="grid grid-cols-1 divide-y divide-[#050505]/15 border-b border-[#050505]/15 md:grid-cols-2 md:gap-x-8">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="py-3 text-sm font-medium leading-relaxed text-[#050505] sm:text-base"
                  >
                    • {item}
                  </li>
                ))}
              </ul>

              <div className="space-y-3 pt-1">
                <p className="max-w-[68ch] text-base leading-relaxed text-[#24201B]">{description}</p>
                <p className="border-t border-[#050505]/15 pt-3 text-sm leading-relaxed text-[#3D3830]">
                  <strong className="text-[#050505]">{ui.musicLabel}:</strong> {music} ·{' '}
                  <strong className="text-[#050505]">{ui.dressCodeLabel}:</strong> {dress}
                </p>
              </div>

              {matchedPublicVenue && matchedPublicVenueHref && (
                <div
                  data-venue-authority-backlink
                  className="flex flex-col gap-3 bg-[#050505] p-5 text-[#F6F1E7] md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.06em] text-[#EAE3D5]">
                      {ui.officialVenueGuideLabel}
                    </p>
                    <p className="mt-1 text-sm text-[#F6F1E7] sm:text-base">
                      {ui.officialVenueGuideDescTpl.replace('{venue}', matchedPublicVenueName)}
                    </p>
                  </div>
                  <Link
                    href={matchedPublicVenueHref}
                    className="nlm-pressable inline-flex min-h-[44px] shrink-0 items-center justify-center bg-[#25D366] px-5 py-2.5 text-xs font-extrabold uppercase tracking-[0.05em] text-[#050505] transition hover:bg-[#2EE472]"
                  >
                    {matchedPublicVenueName} →
                  </Link>
                </div>
              )}

              {localized.relatedHolidayBanner && (
                <div
                  data-related-holiday-banner
                  className="flex flex-col gap-3 border-y border-[#050505]/25 bg-[#EAE3D5] py-5 text-[#050505] md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.06em] text-[#4A453E]">
                      {localized.relatedHolidayBanner.badge}
                    </p>
                    <p className="mt-1 font-display text-xl font-bold text-[#050505]">
                      {localized.relatedHolidayBanner.title}
                    </p>
                    <p className="mt-1 text-sm text-[#3D3830]">
                      {localized.relatedHolidayBanner.description}
                    </p>
                  </div>
                  <Link
                    href={localized.relatedHolidayBanner.href}
                    className="inline-flex min-h-[44px] shrink-0 items-center justify-center bg-[#050505] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.05em] text-[#F6F1E7] transition hover:bg-[#1E1C19]"
                  >
                    {localized.relatedHolidayBanner.ctaLabel.replace(/\s*→+$/, '')} →
                  </Link>
                </div>
              )}

              {localized.schedule && localized.schedule.length > 0 && (
                <div className="border-t border-[#050505]/20 pt-6 text-[#050505]">
                  <h3 className="font-display text-xl font-bold text-[#050505] sm:text-2xl">
                    {localized.scheduleHeading || ui.programHeading}
                  </h3>
                  <ol className="mt-4 grid grid-cols-1 divide-y divide-[#050505]/15 border-t border-[#050505]/15 md:grid-cols-2 md:gap-x-8 lg:grid-cols-3">
                    {localized.schedule.map((step) => (
                      <li
                        key={`${step.time}-${step.label}`}
                        className="py-3.5"
                      >
                        <span className="inline-block bg-[#050505] px-2 py-0.5 font-mono text-xs font-bold tabular-nums text-[#F6F1E7]">
                          {step.time}
                        </span>
                        <p className="mt-1.5 text-sm font-medium leading-relaxed text-[#050505]">
                          {step.label}
                        </p>
                      </li>
                    ))}
                  </ol>
                  {localized.programImageSrc && (
                    <div className="mt-6 aspect-[4/5] w-full overflow-hidden border border-[#050505]/20 bg-[#050505] md:max-w-[460px]">
                      <img
                        src={localized.programImageSrc}
                        alt={`${title} · ${localized.scheduleHeading || ui.programHeading}`}
                        title={localized.scheduleHeading || title}
                        width={1080}
                        height={1350}
                        loading="lazy"
                        decoding="async"
                        className="block h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CAPITOLO 04 — NOTTE #050505: Galleria 4:5 a pieno placeholder (1 colonna mobile) & Locandina */}
        <div className="bg-[#050505] py-10 text-[#F6F1E7]">
          <div className="mx-auto max-w-5xl space-y-12 px-4 sm:px-6 lg:px-8">
            <section id="galleria-seo-flow" data-seo-flow-gallery className="space-y-6">
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#EAE3D5]">
                  {seoPack.eyebrow}
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold uppercase text-[#F6F1E7] sm:text-3xl">
                  {seoPack.sectionHeading}
                </h2>
                <p className="mt-2 max-w-[54ch] text-sm leading-relaxed text-[#C2B9AA] sm:text-base">
                  {seoPack.sectionSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {seoPack.gallery.map((img, idx) => (
                  <figure
                    key={img.src}
                    data-seo-flow-item={idx + 1}
                    className="min-w-0"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden border border-[#F6F1E7]/16 bg-[#050505]">
                      <img
                        src={img.src}
                        alt={img.alt}
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

            {/* Official Event Poster — 100% Placeholder */}
            <figure
              data-capodanno-poster-detail
              className="grid grid-cols-1 gap-6 border-t border-[#F6F1E7]/16 pt-8 lg:grid-cols-12 lg:items-center lg:gap-10"
            >
              <div className="aspect-[4/5] w-full overflow-hidden border border-[#F6F1E7]/18 bg-[#050505] lg:col-span-5">
                <Image
                  quality={95}
                  src={seoPack.poster.src}
                  alt={seoPack.poster.alt}
                  width={1080}
                  height={1350}
                  sizes="(max-width: 1080px) 100vw, 1080px"
                  className="block h-full w-full object-cover"
                />
              </div>
              <figcaption className="space-y-3 lg:col-span-7">
                <span className="inline-block border border-[#F6F1E7]/35 bg-[#050505] px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.04em] text-[#F6F1E7]">
                  {seoPack.poster.badgeLabel}
                </span>
                <p className="text-sm leading-relaxed text-[#EAE3D5]">
                  <strong>{seoPack.targetPrefix}:</strong> {seoPack.targetLabel}
                </p>
                <p className="text-sm leading-relaxed text-[#C2B9AA]">
                  <strong className="text-[#EAE3D5]">{seoPack.outfitPrefix}:</strong> {seoPack.outfitLabel}
                </p>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* CAPITOLO 05 — CARTA CALDA #F6F1E7: Condizioni Ufficiali, Protocollo Pagamenti & FAQ senza cassettoni */}
        <div className="border-y border-[#050505] bg-[#F6F1E7] py-10 text-[#050505]">
          <div className="mx-auto max-w-5xl space-y-10 px-4 sm:px-6 lg:px-8">
            {!isUnavailableForNye && localized.conditions && localized.conditions.length > 0 && (
              <section
                id="condizioni-ufficiali"
                data-official-conditions
                className="bg-[#F6F1E7] text-[#050505]"
              >
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#4A453E]">
                  {ui.officialConditionsEyebrow}
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold uppercase text-[#050505]">
                  {localized.conditionsHeading || ui.officialConditionsHeading}
                </h2>
                <ul className="mt-4 grid grid-cols-1 divide-y divide-[#050505]/15 border-y border-[#050505]/15 md:grid-cols-2 md:gap-x-8">
                  {localized.conditions.map((cond) => (
                    <li
                      key={cond}
                      className="py-3.5 text-xs leading-relaxed text-[#050505] sm:text-sm"
                    >
                      {cond}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {!isUnavailableForNye && (
              <section
                id="termini-pagamento"
                data-payment-terms-35
                className="border-t border-[#050505]/20 bg-[#F6F1E7] pt-8 text-[#050505]"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-display text-2xl font-bold uppercase text-[#050505] sm:text-3xl">
                    {paymentTerms.heading}
                  </h2>
                  <span className="bg-[#050505] px-3 py-1 font-mono text-xs font-bold text-[#F6F1E7]">
                    {paymentTerms.methodsBadge}
                  </span>
                </div>
                <p className="mt-2 max-w-[54ch] text-sm leading-relaxed text-[#3D3830]">
                  {paymentTerms.subtitle}
                </p>
                <ol className="mt-5 list-none pl-0 grid grid-cols-1 divide-y divide-[#050505]/15 border-y border-[#050505]/15 md:grid-cols-2 md:gap-x-8 md:divide-y-0 lg:grid-cols-3">
                  {paymentTerms.steps.map((step, idx) => (
                    <li
                      key={step}
                      className="flex items-start gap-3 py-4 text-[#050505] md:border-b md:border-[#050505]/15"
                    >
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center bg-[#050505] font-mono text-xs font-bold tabular-nums text-[#F6F1E7]">
                        {idx + 1}
                      </span>
                      <span className="min-w-0 flex-1 text-sm leading-relaxed text-[#050505]">
                        {step.replace(/^\s*(?:\(\d+\)|[\d\u0660-\u0669\u06F0-\u06F9]+[.):、-])\s*/u, '')}
                      </span>
                    </li>
                  ))}
                </ol>
                <p className="mt-4 border-l-2 border-[#050505] pl-3.5 text-xs font-medium leading-relaxed text-[#24201B] sm:text-[13px]">
                  {paymentTerms.note}
                </p>
              </section>
            )}

            <section
              id="faq-evento"
              className="border-t border-[#050505]/20 bg-[#F6F1E7] pt-8 text-[#050505]"
            >
              <h2 className="font-display text-2xl font-bold uppercase text-[#050505]">
                {ui.faqHeadingPrefix}
              </h2>
              <div className="mt-4 divide-y divide-[#050505]/15 border-y border-[#050505]/15">
                {faqs.map((faq, idx) => (
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
                    <p className="pt-2 text-sm leading-relaxed text-[#3D3830]">{faq.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* CAPITOLO 06 — NOTTE #050505: Mappa Venue & Eventi Correlati (1 colonna mobile) */}
        <div className="bg-[#050505] pt-10 text-[#F6F1E7]">
          <div className="mx-auto max-w-5xl space-y-12 px-4 sm:px-6 lg:px-8">
            <div id="mappa-locale">
              <h2 className="font-display text-2xl font-bold text-[#F6F1E7]">
                {ui.mapHeadingEvent} · {event.venueName}
              </h2>
              <p className="mt-1 text-sm text-[#C2B9AA]">
                {event.venueName} · {event.address}, {event.city} ({event.province}) · {displayHours}
              </p>
              <div className="mt-4">
                <EventVenueMap
                  id={`capodanno-venue-map-${event.slug}`}
                  mapUrl={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  labels={{
                    loadMap: venueMapCopy.loadMap,
                    mapTitle: venueMapCopy.mapTitle.replace('{venue}', event.venueName),
                    privacyLoadNotice: venueMapCopy.privacyLoadNotice,
                  }}
                />
              </div>
            </div>

            {related.length > 0 && (
              <section id="eventi-correlati">
                <h2 className="font-display text-2xl font-bold text-[#F6F1E7]">
                  {ui.relatedHeading}
                </h2>
                <div className="mt-5 grid grid-cols-1 divide-y divide-[#F6F1E7]/14 border-y border-[#F6F1E7]/14 md:grid-cols-2 md:gap-x-8 lg:grid-cols-3">
                  {related.map((item) => (
                    <Link
                      key={item.slug}
                      href={capodannoEventPath(item.slug, locale)}
                      className="block py-4 transition hover:text-[#EAE3D5]"
                    >
                      <p className="font-mono text-xs font-bold uppercase text-[#EAE3D5]">
                        {item.city} ({item.province})
                      </p>
                      <h3 className="mt-1 font-display text-lg font-bold text-[#F6F1E7]">
                        {getCapodannoLocalizedEventTitle(item, locale)}
                      </h3>
                      <p className="mt-1.5 font-mono text-xs text-[#C2B9AA]">
                        {getCapodannoLocalizedEventContent(item, locale).priceSummary}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </article>

      <SeoAuthorityHub lang={locale as LocaleCode} />
    </main>
  );
}
