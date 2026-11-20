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
import { getVenueIdByEventSlug } from '@/lib/single-pass/catalog';
import { getSinglePassCopy } from '@/lib/single-pass/i18n35';

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
  const singlePassCopy = getSinglePassCopy(locale);
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
  const isGardaSisterVenue = event.slug === 'capodanno-justme-garda-lake';
  const matchedPublicVenue = isGardaSisterVenue
    ? mockVenues.find((v) => v.id === 'v-justme')
    : mockVenues.find((v) => getCapodannoEventForClub(v.slugs.en, getLocalizedText(v.localizedContent.name, 'en'))?.slug === event.slug);
  const matchedPublicVenueName = matchedPublicVenue
    ? getLocalizedText(matchedPublicVenue.localizedContent.name, locale)
    : '';
  const matchedPublicVenueHref = matchedPublicVenue
    ? `${prefix}/${getLocalizedDir35('clubs', locale as LocaleCode)}/${getLocalizedVenueSlug35(matchedPublicVenue.slugs.en, locale as LocaleCode)}`
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

  if (true) {
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
        availability: 'https://schema.org/SoldOut',
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

  return (
    <main className="taste-pillar-root taste-capodanno-root min-h-[100dvh] bg-[#0A0A0C] pb-24 pt-20 text-[#FFFFFF]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-[13px] font-semibold text-[#C9C7C2]">
          <Link href={prefix || '/'} className="hover:text-[#FFFFFF]">Home</Link>
          <span>/</span>
          <Link href={capodannoPath(locale)} className="hover:text-[#FFFFFF]">
            {nav.menuLabel} 2027
          </Link>
          <span>/</span>
          <span className="text-[#FFFFFF]">{event.venueName}</span>
        </nav>

        <div className="overflow-hidden border border-white/18 bg-[#18181C]">
          <div className="border-b border-white/14 bg-[#0A0A0C]">
            <img
              src={seoPack.poster.src}
              title={seoPack.poster.title}
              alt={seoPack.poster.alt}
              loading="eager"
              decoding="async"
              className="mx-auto block max-h-[620px] w-full object-contain"
            />
          </div>
          <div className="border-b border-white/14 bg-[#18181C] px-6 py-6 sm:px-10 sm:py-8">
            <h1
              data-event-title={title}
              data-event-party-only={isPartyOnly ? 'true' : undefined}
              data-event-sold-out-nye={isUnavailableForNye ? 'true' : undefined}
              className="font-display font-extrabold uppercase leading-none text-[#FFFFFF]"
            >
              {capDisplayH1 || title}
            </h1>
            {capTitleQualifier && (
              <p className="mt-2 font-sans text-base font-semibold text-[#EDEBE6]">{capTitleQualifier}</p>
            )}
            <p className="mt-2 font-sans text-base italic text-[#EDEBE6] sm:text-lg">{subtitle}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="bg-[#FFFFFF] px-3 py-1 text-[13px] font-bold text-[#0A0A0C]">
                {ui.dateBadge}
              </span>
              <span className="border border-white/30 bg-[#0A0A0C] px-3 py-1 text-[13px] font-semibold text-[#FFFFFF]">
                {event.city} ({event.province})
              </span>
              {!isPartyOnly && !isUnavailableForNye && event.priceFromEur > 0 && (
                <span className="bg-[#D9381E] px-3 py-1 text-[13px] font-extrabold uppercase text-[#FFFFFF]" data-almost-sold-out-badge>
                  {scarcity.almostSoldOutBadge}
                </span>
              )}
              {isUnavailableForNye && (
                <span className="border border-amber-400/60 bg-amber-950/90 px-3 py-1 text-[13px] font-extrabold uppercase text-amber-100" data-sold-out-for-nye-badge>
                  {ui.soldOutNye2027Badge}
                </span>
              )}
            </div>
          </div>

          <div className="p-6 sm:p-10">
              {isUnavailableForNye ? (
              <div
                role="status"
                data-closure-notice
                className="mb-8 border-2 border-amber-400/60 bg-amber-950/40 p-6 text-[#FFFFFF]"
              >
                <p className="text-sm font-extrabold text-amber-200">
                  {localized.closureBannerTitle}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#FFFFFF] sm:text-base">
                  {localized.closureBannerBody}
                </p>
              </div>
            ) : event.priceFromEur > 0 ? (
              <div role="alert" data-urgency-alert className="mb-8 border border-[#0A0A0C]/16 bg-[#EDEBE6] p-5 text-[#0A0A0C]">
                <p className="text-sm font-extrabold text-[#0A0A0C]">
                  {scarcity.urgencyAlertTitle}
                </p>
                <p className="mt-1.5 max-w-[48ch] text-sm leading-relaxed text-[#4F4D48]">
                  {scarcity.urgencyAlertBody}
                </p>
              </div>
            ) : event.category !== 'piazza' ? (
              <div role="status" data-tba-waitlist-notice className="mb-8 border border-[#0A0A0C]/16 bg-[#EDEBE6] p-5 text-[#0A0A0C]">
                <p className="text-sm font-extrabold text-[#0A0A0C]">
                  {localized.musicAndFormat}
                </p>
                <p className="mt-1.5 max-w-[48ch] text-sm leading-relaxed text-[#4F4D48]">
                  {localized.priceSummary}
                </p>
              </div>
            ) : null}
            {/* Clickable Table of Contents (TOC) (#EDEBE6 Carta Calda) */}
            <nav
              aria-label={ui.tocTitle}
              className="mb-8 border border-[#0A0A0C]/16 bg-[#EDEBE6] p-5 text-[#0A0A0C]"
            >
              <p className="text-[13px] font-bold text-[#4F4D48]">
                {ui.tocTitle}
              </p>
              <ul className="mt-3 grid gap-2 text-[13px] font-medium sm:grid-cols-2 lg:grid-cols-3 sm:text-sm">
                <li>
                  <a href="#programma-serata" className="text-[#0A0A0C] hover:underline">
                    {ui.tocProgram}
                  </a>
                </li>
                {isUnavailableForNye ? (
                  <li>
                    <a href="#alternative-rooftop" className="text-[#0A0A0C] hover:underline">
                      {localized.alternativesHeading || ui.confirmedAlternativesHeading}
                    </a>
                  </li>
                ) : (
                  <>
                    <li>
                      <a href="#prezzi-formule" className="text-[#0A0A0C] hover:underline">
                        {ui.tocPrices}
                      </a>
                    </li>
                    {(localized.menus?.length ?? 0) > 0 && (
                      <li>
                        <a href="#menu-ufficiale" className="text-[#0A0A0C] hover:underline">
                          {localized.menusHeading || ui.tocMenuLabel}
                        </a>
                      </li>
                    )}
                    {(localized.conditions?.length ?? 0) > 0 && (
                      <li>
                        <a href="#condizioni-ufficiali" className="text-[#0A0A0C] hover:underline">
                          {localized.conditionsHeading || ui.officialConditionsHeading}
                        </a>
                      </li>
                    )}
                    <li>
                      <a href="#termini-pagamento" className="text-[#0A0A0C] hover:underline">
                        {paymentTerms.tocLabel}
                      </a>
                    </li>
                    <li>
                      <a href="#prenota-concierge" className="text-[#0A0A0C] hover:underline">
                        {ui.tocBooking}
                      </a>
                    </li>
                  </>
                )}
                <li>
                  <a href="#mappa-locale" className="text-[#0A0A0C] hover:underline">
                    {ui.mapHeadingEvent}
                  </a>
                </li>
                <li>
                  <a href="#faq-evento" className="text-[#0A0A0C] hover:underline">
                    {ui.faqHeadingPrefix}
                  </a>
                </li>
                <li>
                  <a href="#eventi-correlati" className="text-[#0A0A0C] hover:underline">
                    {ui.tocRelated}
                  </a>
                </li>
              </ul>
            </nav>

            {/* S17 6-Box Summary Grid */}
            <section
              data-s17-summary-grid
              className="mb-8 border border-[#0A0A0C]/16 bg-[#EDEBE6] p-5 text-[#0A0A0C]"
            >
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div className="border border-[#0A0A0C]/14 bg-[#FFFFFF] p-4">
                  <p className="text-[13px] font-extrabold uppercase text-[#B5240D]">
                    {ui.colPrices}
                  </p>
                  <p className="mt-1 font-display text-xl font-bold text-[#0A0A0C]">
                    {localized.priceSummary || `€${event.priceFromEur}`}
                  </p>
                </div>
                <div className="border border-[#0A0A0C]/14 bg-[#FFFFFF] p-4">
                  <p className="text-[13px] font-extrabold uppercase text-[#4F4D48]">TARGET</p>
                  <p className="mt-1 text-sm font-bold text-[#0A0A0C]">{seoPack.targetLabel}</p>
                </div>
                <div className="border border-[#0A0A0C]/14 bg-[#FFFFFF] p-4">
                  <p className="text-[13px] font-extrabold uppercase text-[#4F4D48]">
                    {ui.tocProgram}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#0A0A0C]">
                    {highlights[0] || event.venueName}
                  </p>
                </div>
                <div className="border border-[#0A0A0C]/14 bg-[#FFFFFF] p-4">
                  <p className="text-[13px] font-extrabold uppercase text-[#4F4D48]">
                    {ui.musicLabel}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#0A0A0C]">{music}</p>
                </div>
                <div className="border border-[#0A0A0C]/14 bg-[#FFFFFF] p-4">
                  <p className="text-[13px] font-extrabold uppercase text-[#4F4D48]">
                    {ui.hoursLabel}
                  </p>
                  <p className="mt-1 text-sm font-semibold tabular-nums text-[#0A0A0C]">
                    {displayHours}
                  </p>
                </div>
                <div className="border border-[#0A0A0C]/14 bg-[#FFFFFF] p-4">
                  <p className="text-[13px] font-extrabold uppercase text-[#4F4D48]">
                    {ui.dressCodeLabel}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#0A0A0C]">{dress}</p>
                </div>
              </div>
            </section>

            {/* Key Highlights */}
            <div className="grid gap-4 border border-white/14 bg-[#0A0A0C] p-5 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item} className="text-sm text-[#EDEBE6]">
                  • {item}
                </div>
              ))}
            </div>

            <div id="programma-serata" data-reveal="rise" className="mt-8 space-y-4">
              <h2 className="font-display text-2xl font-bold text-[#FFFFFF]">
                {ui.programHeading}
              </h2>
              <p className="text-base leading-relaxed text-[#C9C7C2]">{description}</p>
              <p className="text-sm leading-relaxed text-[#C9C7C2]">
                <strong className="text-[#FFFFFF]">{ui.musicLabel}:</strong> {music} ·{' '}
                <strong className="text-[#FFFFFF]">{ui.dressCodeLabel}:</strong> {dress}
              </p>
              {matchedPublicVenue && matchedPublicVenueHref && (
                <div
                  data-venue-authority-backlink
                  className="mt-4 flex flex-col gap-3 border border-white/25 bg-[#18181C] p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-[13px] font-bold uppercase tracking-[0.04em] text-[#F35A3F]">
                      {isGardaSisterVenue
                        ? ui.sisterVenueMilanLabel
                        : ui.officialVenueGuideLabel}
                    </p>
                    <p className="mt-1 text-base text-[#FFFFFF]">
                      {isGardaSisterVenue
                        ? ui.sisterVenueMilanDesc
                        : ui.officialVenueGuideDescTpl.replace('{venue}', matchedPublicVenueName)}
                    </p>
                  </div>
                  <Link
                    href={matchedPublicVenueHref}
                    className="nlm-pressable inline-flex shrink-0 items-center justify-center bg-[#D9381E] px-4 py-2.5 text-[13px] font-bold uppercase tracking-[0.04em] text-[#FFFFFF] transition hover:bg-[#B82B14]"
                  >
                    {matchedPublicVenueName} →
                  </Link>
                </div>
              )}

              {localized.relatedHolidayBanner && (
                <div
                  data-related-holiday-banner
                  className="mt-4 flex flex-col gap-3 border border-white/40 bg-[#0A0A0C] p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-[13px] font-bold uppercase tracking-[0.04em] text-[#FFFFFF]">
                      {localized.relatedHolidayBanner.badge}
                    </p>
                    <p className="mt-1 font-display text-lg font-bold text-[#FFFFFF]">
                      {localized.relatedHolidayBanner.title}
                    </p>
                    <p className="mt-1 text-sm text-[#C9C7C2]">
                      {localized.relatedHolidayBanner.description}
                    </p>
                  </div>
                  <Link
                    href={localized.relatedHolidayBanner.href}
                    className="inline-flex min-h-[44px] shrink-0 items-center justify-center bg-[#EDEBE6] px-4 py-2.5 text-[13px] font-bold uppercase tracking-[0.04em] text-[#0A0A0C] transition hover:bg-[#EAE3D5]"
                  >
                    {localized.relatedHolidayBanner.ctaLabel.replace(/\s*→+$/, '')} →
                  </Link>
                </div>
              )}

              {localized.schedule && localized.schedule.length > 0 && (
                <div className="mt-6 border border-white/15 bg-[#0A0A0C] p-5">
                  <h3 className="font-display text-lg font-bold text-[#FFFFFF]">
                    {localized.scheduleHeading || ui.programHeading}
                  </h3>
                  <ol className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                    {localized.schedule.map((step) => (
                      <li
                        key={`${step.time}-${step.label}`}
                        className="border border-white/12 bg-[#18181C] p-3"
                      >
                        <span className="text-[13px] font-bold tabular-nums text-[#F35A3F]">{step.time}</span>
                        <p className="mt-1 text-base leading-relaxed text-[#FFFFFF]">{step.label}</p>
                      </li>
                    ))}
                  </ol>
                  {localized.programImageSrc && (
                    <div className="mt-4 flex justify-center border border-white/15 bg-[#18181C] p-2">
                      <img
                        src={localized.programImageSrc}
                        alt={`${title} · ${localized.scheduleHeading || ui.programHeading}`}
                        title={localized.scheduleHeading || title}
                        width={1376}
                        height={768}
                        loading="lazy"
                        decoding="async"
                        className="max-h-[420px] w-auto max-w-full object-contain"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Official Remediated Event Poster (Uncropped object-contain) */}
            <figure
              data-capodanno-poster-detail
              data-reveal="clip"
              className="mt-8 overflow-hidden border border-white/25 bg-[#0A0A0C] p-4 sm:p-6"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="border border-white/35 bg-[#18181C] px-3 py-1 text-[13px] font-bold uppercase tracking-[0.04em] text-[#FFFFFF]">
                  {seoPack.poster.badgeLabel}
                </span>
                <div className="flex flex-wrap gap-2 text-[13px]">
                  <span className="border border-white/15 bg-[#18181C] px-3 py-1 text-[#FFFFFF]">
                    <strong className="text-[#FFFFFF]">{seoPack.targetPrefix}:</strong> {seoPack.targetLabel}
                  </span>
                  <span className="border border-white/15 bg-[#18181C] px-3 py-1 text-[#FFFFFF]">
                    <strong className="text-[#FFFFFF]">{seoPack.outfitPrefix}:</strong> {seoPack.outfitLabel}
                  </span>
                </div>
              </div>
              <div className="flex justify-center bg-[#0A0A0C] p-2">
                <img
                  src={seoPack.poster.src}
                  title={seoPack.poster.title}
                  alt={seoPack.poster.alt}
                  loading="lazy"
                  decoding="async"
                  className="max-h-[540px] w-auto max-w-full object-contain"
                />
              </div>
              <figcaption className="mt-3 text-[13px] leading-relaxed text-[#C9C7C2] sm:text-sm">
                <strong className="text-[#FFFFFF]">{seoPack.poster.title}</strong> · {seoPack.poster.description}
              </figcaption>
            </figure>

            {/* Ad-Hoc Google Flow SEO Gallery (4 Images combining Event + Target Crowd + Event Outfit + H1/H2/H3) */}
            <section id="galleria-seo-flow" data-seo-flow-gallery className="mt-10 space-y-5">
              <div>
                <h2 className="font-display text-3xl font-extrabold uppercase text-[#FFFFFF]">
                  {seoPack.sectionHeading}
                </h2>
                <p className="mt-1.5 text-[13px] font-bold uppercase tracking-[0.04em] text-[#F35A3F]">
                  {seoPack.eyebrow}
                </p>
                <p className="mt-2 max-w-[48ch] text-base leading-relaxed text-[#C9C7C2]">
                  {seoPack.sectionSubtitle}
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {seoPack.gallery.map((img) => (
                  <figure
                    key={img.src}
                    className="overflow-hidden border border-white/15 bg-[#0A0A0C] transition hover:border-white/45"
                  >
                    <div className="relative h-56 w-full bg-[#0A0A0C]">
                      <img
                        src={img.src}
                        title={img.title}
                        alt={img.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                      <span className="pointer-events-none absolute left-3 top-3 border border-white/30 bg-[#0A0A0C]/90 px-2.5 py-1 text-[13px] font-semibold text-[#FFFFFF]">
                        {img.shotLabel}
                      </span>
                    </div>
                    <figcaption className="space-y-2 p-4">
                      <div className="flex flex-wrap gap-1.5 text-[13px]">
                        <span className="border border-white/25 bg-[#18181C] px-2 py-0.5 font-medium text-[#FFFFFF]">
                          {img.targetBadge}
                        </span>
                        <span className="border border-white/15 bg-[#18181C] px-2 py-0.5 text-[#C9C7C2]">
                          {img.outfitBadge}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-[#C9C7C2]">
                        <strong className="text-[#FFFFFF]">{img.title}</strong> · {img.description}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

            {isUnavailableForNye ? (
              <section
                id="alternative-rooftop"
                data-rooftop-alternatives
                data-reveal="rise"
                className="mt-10 border border-[#0A0A0C]/16 bg-[#EDEBE6] p-6 text-[#0A0A0C] sm:p-8"
              >
                <h2 className="font-display text-3xl font-extrabold uppercase text-[#0A0A0C] sm:text-4xl">
                  {localized.alternativesHeading}
                </h2>
                <p className="mt-1.5 font-sans text-[13px] font-bold uppercase tracking-[0.04em] text-[#B5240D]">
                  {ui.confirmedVenuesBanner}
                </p>
                <p className="mt-2 max-w-[48ch] text-base text-[#4F4D48]">
                  {localized.alternativesSubheading}
                </p>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  {rooftopAlternatives.map((alt) => {
                    const altTitle = getCapodannoLocalizedEventTitle(alt, locale);
                    const altSub = getCapodannoLocalizedEventSubtitle(alt, locale);
                    const altHref = capodannoEventPath(alt.slug, locale);
                    return (
                      <article
                        key={alt.slug}
                        className="flex flex-col justify-between border border-[#0A0A0C]/20 bg-[#FFFFFF] p-5"
                      >
                        <div>
                          <div data-no-lightbox="true" className="overflow-hidden border border-[#0A0A0C]/15 bg-[#0A0A0C]">
                            <img
                              src={alt.image}
                              alt={altTitle}
                              loading="lazy"
                              decoding="async"
                              className="h-44 w-full object-contain"
                            />
                          </div>
                          <h3 className="mt-3 font-display text-xl font-bold text-[#0A0A0C]">
                            {altTitle}
                          </h3>
                          <p className="mt-1 text-[13px] text-[#4F4D48]">{altSub}</p>
                          <p className="mt-2 text-[13px] font-semibold text-[#0A0A0C]">
                            {getCapodannoLocalizedEventContent(alt, locale).priceSummary}
                          </p>
                        </div>
                        <Link
                          href={altHref}
                          className="mt-4 inline-flex min-h-[44px] items-center justify-center bg-[#0A0A0C] px-5 py-2.5 text-[13px] font-extrabold uppercase tracking-[0.04em] text-[#FFFFFF] transition hover:bg-[#24201B]"
                        >
                          {ui.viewPackagesCta}
                        </Link>
                      </article>
                    );
                  })}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={capodannoPath(locale)}
                    locale={locale}
                    className="inline-flex min-h-[44px] items-center border border-[#0A0A0C] px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.04em] text-[#0A0A0C] hover:bg-[#0A0A0C] hover:text-[#FFFFFF]"
                  >
                    {ui.backToAllBtn}
                  </Link>
                  <Link
                    href={partnerGuideHref}
                    locale={locale}
                    className="inline-flex min-h-[44px] items-center border border-[#0A0A0C] bg-[#FFFFFF] px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.04em] text-[#0A0A0C] hover:bg-[#0A0A0C] hover:text-[#FFFFFF]"
                  >
                    {getClubNyeBannerCopy35(locale).ctaGuide} →
                  </Link>
                  <a
                    href={getConciergeBookingUrl(locale, `NYE 2027 Alternatives (${event.venueName})`, `${SITE_URL}${canonicalPath}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center bg-[#25D366] px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.04em] text-[#0A0A0C]"
                  >
                    WhatsApp {SITE_CONTACT.whatsapp.number}
                  </a>
                </div>
              </section>
            ) : (
              <>
            {/* Price Tiers S17 Table (#EDEBE6 Carta Calda + Testa Nera #0A0A0C) */}
            <div id="prezzi-formule" data-reveal="rise" className="mt-10 border border-[#0A0A0C]/16 bg-[#EDEBE6] p-6 text-[#0A0A0C] sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-display text-3xl font-extrabold uppercase text-[#0A0A0C]">
                  {ui.pricesHeadingPrefix} · {event.venueName}
                </h2>
                {!isPartyOnly && event.priceFromEur > 0 && (
                  <span className="bg-[#D9381E] px-3 py-1 text-[13px] font-extrabold uppercase text-[#FFFFFF]" data-selling-fast-badge>
                    {scarcity.sellingFastBadge}
                  </span>
                )}
              </div>
              <p className="mt-1 text-[13px] font-medium text-[#4F4D48]">{sourceBasis}</p>
              {!event.partner &&
                event.priceFromEur > 0 &&
                (isTerrazzaDuomo21 || Boolean(getVenueIdByEventSlug(event.slug))) && (
                <p className="mt-1 text-[13px] font-bold text-[#0A0A0C]" data-checkout-fee-note>
                  {singlePassCopy.feeCalculatedAtCheckoutNote}
                </p>
              )}

              <div className="mt-5 overflow-x-auto border border-[#0A0A0C]/18 bg-[#FFFFFF]">
                <table className="w-full border-collapse text-left text-sm tabular-nums">
                  <thead className="bg-[#0A0A0C] text-[13px] font-bold text-[#FFFFFF]">
                    <tr>
                      <th className="px-4 py-3.5">{ui.tocPrices}</th>
                      <th className="px-4 py-3.5 text-right">{ui.colPrices}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tiers.map((tier) => (
                      <tr
                        key={tier.label}
                        className="border-b border-[#0A0A0C]/12 odd:bg-[#FFFFFF] even:bg-[#F7F5F0] last:border-b-0"
                      >
                        <td className="px-4 py-4 align-top">
                          <h3 className="font-display text-xl font-bold text-[#0A0A0C]">
                            {tier.label}
                          </h3>
                          <p className="mt-1 text-sm text-[#4F4D48]">{tier.details}</p>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right align-top">
                          <span className="font-display text-2xl font-extrabold text-[#D9381E]">
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
            ) : (() => {
              const singlePassVenueId = getVenueIdByEventSlug(event.slug);
              return singlePassVenueId ? (
                <SinglePassVenueModule locale={locale} venueId={singlePassVenueId} />
              ) : null;
            })()}

            {/* Confirmed Alternatives Cross-Sell (QC Terme Waitlist -> Sirmione 198 EUR & Active NYE Venues) */}
            {confirmedAlternatives.length > 0 && (
              <section
                id="alternative-confermate"
                data-confirmed-alternatives
                data-reveal="rise"
                className="mt-10 border border-[#0A0A0C]/16 bg-[#EDEBE6] p-6 text-[#0A0A0C] sm:p-8"
              >
                {localized.alternativesHeading && (
                  <h2 className="font-display text-2xl font-extrabold uppercase text-[#0A0A0C] sm:text-3xl">
                    {localized.alternativesHeading}
                  </h2>
                )}
                <p className="mt-1 text-[13px] font-bold text-[#B5240D]">
                  {ui.confirmedVenuesBanner}
                </p>
                {localized.alternativesSubheading && (
                  <p className="mt-2 text-sm text-[#4F4D48]">
                    {localized.alternativesSubheading}
                  </p>
                )}
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  {confirmedAlternatives.map((alt) => {
                    const altTitle = getCapodannoLocalizedEventTitle(alt, locale);
                    const altSub = getCapodannoLocalizedEventSubtitle(alt, locale);
                    const altHref = capodannoEventPath(alt.slug, locale);
                    return (
                      <article
                        key={alt.slug}
                        className="flex flex-col justify-between border border-[#0A0A0C]/20 bg-[#FFFFFF] p-5"
                      >
                        <div>
                          <div data-no-lightbox="true" className="overflow-hidden border border-[#0A0A0C]/15 bg-[#0A0A0C]">
                            <img
                              src={alt.image}
                              alt={altTitle}
                              loading="lazy"
                              decoding="async"
                              className="h-44 w-full object-contain"
                            />
                          </div>
                          <h3 className="mt-3 font-display text-xl font-bold text-[#0A0A0C]">
                            {altTitle}
                          </h3>
                          <p className="mt-1 text-[13px] text-[#4F4D48]">{altSub}</p>
                          <p className="mt-2 text-[13px] font-semibold text-[#0A0A0C]">
                            {getCapodannoLocalizedEventContent(alt, locale).priceSummary}
                          </p>
                        </div>
                        <Link
                          href={altHref}
                          locale={locale}
                          className="mt-4 inline-flex min-h-[44px] items-center justify-center bg-[#0A0A0C] px-5 py-2.5 text-[13px] font-extrabold uppercase tracking-[0.04em] text-[#FFFFFF] transition hover:bg-[#24201B]"
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
                    className="inline-flex min-h-[44px] items-center bg-[#0A0A0C] px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.04em] text-[#FFFFFF] hover:bg-[#24201B]"
                  >
                    {(localized.relatedHolidayBanner?.ctaLabel || ui.viewPackagesCta).replace(/\s*→+$/, '')} →
                  </Link>
                  <Link
                    href={capodannoPath(locale)}
                    locale={locale}
                    className="inline-flex min-h-[44px] items-center border border-[#0A0A0C] px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.04em] text-[#0A0A0C] hover:bg-[#0A0A0C] hover:text-[#FFFFFF]"
                  >
                    {ui.backToAllBtn}
                  </Link>
                </div>
              </section>
            )}

            {/* Official Menus (Pineta Gala / Buffet, Voya 20th Floor, Terrazza Duomo 21 & MA.RE) */}
            {localized.menus && localized.menus.length > 0 && (
              <section
                id="menu-ufficiale"
                data-official-menus
                data-lightbox-group="capodanno-menus"
                className="mt-10 border border-white/20 bg-[#0A0A0C] p-6 sm:p-8"
              >
                <h2 className="font-display text-2xl font-bold text-[#FFFFFF]">
                  {localized.menusHeading || 'Menu'}
                </h2>
                <div className="mt-5 grid gap-6 lg:grid-cols-2">
                  {localized.menus.map((menu) => (
                    <article
                      key={menu.id}
                      className="flex flex-col justify-between border border-white/16 bg-[#18181C] p-5"
                    >
                      <div>
                        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/12 pb-3">
                          <div>
                            <h3 className="font-display text-xl font-bold text-[#FFFFFF]">{menu.title}</h3>
                            <p className="mt-1 text-[13px] text-[#C9C7C2]">{menu.subtitle}</p>
                          </div>
                          <span className="shrink-0 bg-[#EDEBE6] px-3 py-1 text-[13px] font-bold uppercase tracking-[0.04em] text-[#0A0A0C]">
                            {menu.price}
                          </span>
                        </div>
                        <dl className="mt-4 space-y-2.5 text-sm">
                          {menu.courses.map((c) => (
                            <div key={`${menu.id}-${c.course}`} className="border-b border-white/10 pb-2 last:border-0">
                              <dt className="text-[13px] font-bold text-[#F35A3F]">
                                {c.course}
                              </dt>
                              <dd className="mt-0.5 text-sm leading-relaxed text-[#EDEBE6]">
                                {c.dish}
                              </dd>
                            </div>
                          ))}
                        </dl>
                        <p className="mt-3 border border-white/15 bg-[#0A0A0C] p-3 text-[13px] font-medium text-[#C9C7C2]">
                          {menu.beverages}
                        </p>
                      </div>
                      {menu.imageSrc && (
                        <div className="mt-4 flex justify-center border border-white/15 bg-[#0A0A0C] p-2">
                          <img
                            src={menu.imageSrc}
                            alt={menu.imageAlt}
                            title={menu.title}
                            width={1376}
                            height={768}
                            loading="lazy"
                            decoding="async"
                            className="max-h-[380px] w-auto max-w-full object-contain"
                          />
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Official Venue Conditions (PDF rules: Via Silvio Pellico 2, 9 checkpoints, Dec 28 allergies, table pairing) */}
            {localized.conditions && localized.conditions.length > 0 && (
              <section
                id="condizioni-ufficiali"
                data-official-conditions
                className="mt-10 border border-white/18 bg-[#18181C] p-6 sm:p-8"
              >
                <h2 className="font-display text-2xl font-extrabold uppercase text-[#FFFFFF]">
                  {localized.conditionsHeading || ui.officialConditionsHeading}
                </h2>
                <p className="mt-1 text-[13px] font-bold text-[#EDEBE6]">
                  {ui.officialConditionsEyebrow}
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {localized.conditions.map((cond) => (
                    <li
                      key={cond}
                      className="border border-white/15 bg-[#0A0A0C] p-4 text-[13px] leading-relaxed text-[#FFFFFF] sm:text-sm"
                    >
                      {cond}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Official 6-Step Prepayment & Booking Protocol */}
            <section
              id="termini-pagamento"
              data-payment-terms-35
              className="mt-10 border border-white/18 bg-[#0A0A0C] p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-2xl font-extrabold uppercase text-[#FFFFFF] sm:text-3xl">
                  {paymentTerms.heading}
                </h2>
                <span className="border border-white/30 bg-[#18181C] px-3 py-1 text-[13px] font-bold text-[#EDEBE6]">
                  {paymentTerms.methodsBadge}
                </span>
              </div>
              <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-[#C9C7C2]">
                {paymentTerms.subtitle}
              </p>
              <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {paymentTerms.steps.map((step, idx) => (
                  <li
                    key={step}
                    className="border border-white/14 bg-[#18181C] p-4"
                  >
                    <span className="inline-flex h-6 w-6 items-center justify-center bg-[#FFFFFF] text-[13px] font-bold tabular-nums text-[#0A0A0C]">
                      {idx + 1}
                    </span>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#FFFFFF]">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
              <p className="mt-4 bg-[#18181C] px-4 py-3 text-[13px] leading-relaxed text-[#EDEBE6]">
                {paymentTerms.note}
              </p>
            </section>

            {/* CTA Box with WhatsApp, Tel, Email */}
            <div
              id="prenota-concierge"
              data-reveal="rise"
              className="mt-10 border border-white/25 bg-[#0A0A0C] p-6 sm:p-8"
            >
              <h2 className="font-display text-2xl font-bold text-[#FFFFFF]">
                {ui.bookingHeading}
              </h2>
              <p className="mt-2 text-sm text-[#C9C7C2]">
                {ui.bookingSubtitle}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={getConciergeBookingUrl(locale, `${title} (${event.venueName} - 31/12/2026)`, `${SITE_URL}${canonicalPath}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event-cta-kind="table"
                  className="inline-flex min-h-[44px] items-center bg-[#25D366] px-6 py-3 text-sm font-bold text-[#0A0A0C] transition hover:bg-[#2EE472]"
                >
                  WhatsApp {SITE_CONTACT.whatsapp.number}
                </a>
                {event.xceedUrl ? (
                  <a
                    href={event.xceedUrl}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    data-event-cta-kind="admission"
                    className="inline-flex min-h-[44px] items-center bg-[#EDEBE6] px-6 py-3 text-sm font-bold text-[#0A0A0C] transition hover:bg-[#EAE3D5]"
                  >
                    {scarcity.xceedPriorityCta}
                  </a>
                ) : null}
                <a
                  href="tel:+393519127047"
                  className="inline-flex min-h-[44px] items-center border border-white/40 bg-[#18181C] px-5 py-3 text-sm font-semibold text-[#FFFFFF] transition hover:bg-[#EDEBE6] hover:text-[#0A0A0C]"
                >
                  {ui.callNowBtn}
                </a>
                <a
                  href="mailto:concierge@nightlifemilan.com"
                  className="inline-flex min-h-[44px] items-center border border-white/20 bg-[#18181C] px-5 py-3 text-sm font-semibold text-[#C9C7C2] transition hover:border-white hover:text-[#FFFFFF]"
                >
                  concierge@nightlifemilan.com
                </a>
                <Link
                  href={capodannoPath(locale)}
                  className="inline-flex min-h-[44px] items-center border border-white/20 px-5 py-3 text-sm font-semibold text-[#FFFFFF] hover:bg-[#EDEBE6] hover:text-[#0A0A0C]"
                >
                  {ui.backToAllBtn}
                </Link>
              </div>
            </div>
              </>
            )}

            {/* Embedded Google Map for Venue */}
            <div id="mappa-locale" data-reveal="rise" className="mt-12">
              <h2 className="font-display text-2xl font-bold text-[#FFFFFF]">
                {ui.mapHeadingEvent} · {event.venueName}
              </h2>
              <p className="mt-1 text-sm text-[#C9C7C2]">
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

            {/* FAQs (#F6F1E7 Capitolo Avorio Caldo) */}
            <div id="faq-evento" data-reveal="rise" className="mt-12 border border-[#0A0A0C]/15 bg-[#EDEBE6] text-[#0A0A0C] p-6 sm:p-8 space-y-4">
              <h2 className="font-display text-2xl font-bold text-[#0A0A0C]">
                {ui.faqHeadingPrefix}
              </h2>
              {faqs.map((faq) => (
                <div key={faq.q} className="border border-[#0A0A0C]/15 bg-[#FFFFFF] p-5">
                  <h3 className="font-semibold text-[#0A0A0C]">{faq.q}</h3>
                  <p className="mt-1.5 text-sm text-[#4F4D48]">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Events */}
        {related.length > 0 && (
          <section id="eventi-correlati" data-reveal="rise" className="mt-14">
            <h2 className="font-display text-2xl font-bold text-[#FFFFFF]">
              {ui.relatedHeading}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={capodannoEventPath(item.slug, locale)}
                  className="border border-white/14 bg-[#18181C] p-5 transition hover:border-white/45"
                >
                  <p className="text-[13px] font-semibold text-[#FFFFFF]">
                    {item.city} ({item.province})
                  </p>
                  <h3 className="mt-1 font-display text-lg font-bold text-[#FFFFFF]">
                    {getCapodannoLocalizedEventTitle(item, locale)}
                  </h3>
                  <p className="mt-2 text-[13px] text-[#C9C7C2]">
                    {getCapodannoLocalizedEventContent(item, locale).priceSummary}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
      <SeoAuthorityHub lang={locale as LocaleCode} />
    </main>
  );
}
