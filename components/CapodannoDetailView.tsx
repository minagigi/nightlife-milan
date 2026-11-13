import SeoAuthorityHub from '@/components/SeoAuthorityHub';

import EventVenueMap from '@/components/EventVenueMap';
import { getEventVenueCopy } from '@/lib/i18n/eventVenueCopy';
import type { LocaleCode } from '@/lib/i18n/locales';
import { capodannoEventPath, capodannoNavigation, capodannoPath } from '@/lib/capodanno/routes';
import { getPaymentTerms35 } from '@/lib/capodanno/paymentTerms35';
import {
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
import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import { SITE_CONTACT } from '@/config/contact';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import { localePrefix } from '@/lib/i18n/locales';
import { getScarcityAndChatCopy } from '@/lib/i18n/scarcityAndChatCopy';
import {
  CAPODANNO_EVENTS,
  getCapodannoEventForClub,
  type CapodannoEventItem,
} from '@/lib/capodannoEvents';
import { mockVenues } from '@/lib/data';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { getLocalizedVenueSlug35 } from '@/lib/i18n/localizedSlugs35';
import { getLocalizedText } from '@/lib/seo';
import {
  buildSeoEventImagePack,
  getCapodannoOfficialPosterSrc,
} from '@/lib/seoEventImages';

type Props = {
  locale: string;
  event: CapodannoEventItem;
};

const SITE_URL = 'https://nightlifemilan.com';

export default function CapodannoDetailView({ locale, event }: Props) {
  const isIt = locale === 'it';
  const prefix = localePrefix(locale);
  const nav = capodannoNavigation(locale);
  const baseUi = getCapodannoUiCopy(locale);
  const baseScarcity = getScarcityAndChatCopy(locale);
  // Party-only event (official REPVBLIC rate card): no dinner, no show, no bottle service,
  // no "almost sold out" claim. Swap the generic Capodanno strings for event-specific copy.
  const isPartyOnly = isRepvblicNyeSlug(event.slug);
  const partyCopy = isPartyOnly ? getRepvblicNyePageCopy(locale) : null;
  const ui = partyCopy
    ? {
        ...baseUi,
        tocPrices: partyCopy.tocPrices,
        bookingSubtitle: partyCopy.bookingSubtitle,
        musicLabel: partyCopy.musicLabel,
      }
    : baseUi;
  const scarcity = partyCopy
    ? { ...baseScarcity, urgencyAlertTitle: partyCopy.alertTitle, urgencyAlertBody: partyCopy.alertBody }
    : baseScarcity;
  const venueMapCopy = getEventVenueCopy(locale as LocaleCode);
  const paymentTerms = getPaymentTerms35(locale);

  const localized = getCapodannoLocalizedEventContent(event, locale);
  const title = localized.title;
  const subtitle = localized.subtitle;
  const description = localized.description;
  const music = localized.musicAndFormat;
  const dress = localized.dressCode;
  const tiers = localized.tiers;
  const highlights = localized.highlights;
  const sourceBasis = localized.sourceBasis;
  const hasDinnerFormula = event.formulas.includes('cenone') || event.formulas.includes('buffet');
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
    shotLabels: partyCopy?.shots,
  });

  const related = CAPODANNO_EVENTS.filter(
    (item) => item.category === event.category && item.slug !== event.slug
  ).slice(0, 6);

  const faqs = isIt
    ? [
        {
          q: `Quanto costa il Capodanno 2027 presso ${event.venueName} (${event.city})?`,
          a: `Le formule previste per la notte di San Silvestro (31 dicembre 2026 – 1 gennaio 2027) presso ${event.venueName} sono: ${localized.priceSummary}. ${sourceBasis}`,
        },
        {
          q: `Quali sono gli orari e l’indirizzo di ${event.venueName} per la notte di Capodanno?`,
          a: `L’evento si svolge presso ${event.venueName} in ${event.address}, ${event.city} (${event.province}), con orario ${event.hours}. Il dress code richiesto è: ${dress}.`,
        },
        hasDinnerFormula
          ? {
              q: `Come posso prenotare prevendite, cenone o tavolo VIP per ${event.venueName}?`,
              a: `Contatta il Concierge ufficiale Nightlife Milan su WhatsApp (${SITE_CONTACT.whatsapp.number}), attivo 24/24, 7 giorni su 7. ${paymentTerms.steps.join(' ')}`,
            }
          : {
              q: `Come posso prenotare l’ingresso Early Bird o il tavolo VIP per ${event.venueName}?`,
              a: `Contatta il Concierge ufficiale Nightlife Milan su WhatsApp (${SITE_CONTACT.whatsapp.number}), attivo 24/24, 7 giorni su 7. ${paymentTerms.steps.join(' ')}`,
            },
      ]
    : locale === 'en'
      ? [
          {
            q: `How much does New Year’s Eve 2027 cost at ${event.venueName} (${event.city})?`,
            a: `Official packages for December 31, 2026 – January 1, 2027 at ${event.venueName} are: ${localized.priceSummary}. ${sourceBasis}`,
          },
          {
            q: `What are the hours, address, and dress code for ${event.venueName} on New Year’s Eve?`,
            a: `The celebration takes place at ${event.venueName}, ${event.address}, ${event.city} (${event.province}), operating ${event.hours}. Recommended dress code: ${dress}.`,
          },
          hasDinnerFormula
            ? {
                q: `How can I book tickets, gala dinner, or a VIP table for ${event.venueName}?`,
                a: `Contact our official Nightlife Milan WhatsApp Concierge (${SITE_CONTACT.whatsapp.number}), available 24/7. ${paymentTerms.steps.join(' ')}`,
              }
            : {
                q: `How can I book Early Bird admission or a VIP table for ${event.venueName}?`,
                a: `Contact our official Nightlife Milan WhatsApp Concierge (${SITE_CONTACT.whatsapp.number}), available 24/7. ${paymentTerms.steps.join(' ')}`,
              },
        ]
      : [
          {
            q: `${nav.menuLabel} 2027 @ ${event.venueName} (${event.city}) · EUR (€)?`,
            a: `${event.venueName} (${event.address}, ${event.city}): ${localized.priceSummary}. ${sourceBasis}`,
          },
          {
            q: `${event.venueName} (${event.address}, ${event.city}) · 31/12/2026 (${event.hours})?`,
            a: `${event.venueName}, ${event.address}, ${event.city} (${event.province}), ${event.hours}. Dress code: ${dress}.`,
          },
          {
            q: `WhatsApp Concierge ${SITE_CONTACT.whatsapp.number} · ${event.venueName}?`,
            a: `${paymentTerms.steps.join(' ')}`,
          },
        ];

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
      {
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
        performer: {
          '@type': 'PerformingGroup',
          name: `${event.venueName} Resident DJs`,
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
        offers: isPartyOnly
          ? tiers.slice(0, REPVBLIC_NYE_OFFER_PRICES_EUR.length).map((tier, idx) => ({
              '@type': 'Offer',
              name: tier.label,
              description: tier.details,
              url: `${SITE_URL}${canonicalPath}`,
              price: String(REPVBLIC_NYE_OFFER_PRICES_EUR[idx]),
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
              validFrom: '2026-10-01T00:00:00+02:00',
            }))
          : {
              '@type': 'Offer',
              url: `${SITE_URL}${canonicalPath}`,
              price: String(event.priceFromEur),
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
              validFrom: '2026-10-01T00:00:00+02:00',
            },
      },
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

  return (
    <main className="min-h-screen bg-[#050505] pb-24 pt-24 text-[#F6F1E7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-[#C2B9AA]">
          <Link href={prefix || '/'} className="hover:text-[#F6F1E7]">Home</Link>
          <span>/</span>
          <Link href={capodannoPath(locale)} className="hover:text-[#F6F1E7]">
            {nav.menuLabel} 2027
          </Link>
          <span>/</span>
          <span className="text-[#F6F1E7]">{event.venueName}</span>
        </nav>

        <div className="overflow-hidden border border-[#F6F1E7]/20 bg-[#0B0A09]">
          <div className="border-b border-[#F6F1E7]/14 bg-[#050505]">
            <img
              src={seoPack.poster.src}
              title={seoPack.poster.title}
              alt={seoPack.poster.alt}
              loading="eager"
              decoding="async"
              className="mx-auto block max-h-[620px] w-full object-contain"
            />
          </div>
          <div className="border-b border-[#F6F1E7]/14 bg-[#0B0A09] px-6 py-6 sm:px-10 sm:py-8">
            <div className="flex flex-wrap gap-2">
              <span className="bg-[#F6F1E7] px-3 py-1 text-xs font-bold text-[#050505]">
                {ui.dateBadge}
              </span>
              <span className="border border-[#F6F1E7]/35 bg-[#050505]/90 px-3 py-1 text-xs font-semibold text-[#F6F1E7]">
                {event.city} ({event.province})
              </span>
              {!isPartyOnly && (
                <span className="border border-[#F6F1E7]/50 bg-[#050505]/90 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#F6F1E7]" data-almost-sold-out-badge>
                  {scarcity.almostSoldOutBadge}
                </span>
              )}
            </div>
            <h1
              data-event-title={title}
              data-event-party-only={isPartyOnly ? 'true' : undefined}
              className="mt-3 font-serif text-3xl font-bold text-[#F6F1E7] sm:text-5xl"
            >
              {title}
            </h1>
            <p className="mt-2 font-serif text-sm italic text-[#EAE3D5] sm:text-base">{subtitle}</p>
          </div>

          <div className="p-6 sm:p-10">
            <div role="alert" data-urgency-alert className="mb-8 border border-[#050505]/15 bg-[#F6F1E7] p-5 text-[#050505]">
              <p className="text-xs font-extrabold uppercase tracking-wider text-[#050505] sm:text-sm">
                {scarcity.urgencyAlertTitle}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#24201B]">
                {scarcity.urgencyAlertBody}
              </p>
            </div>
            {/* Clickable Table of Contents (TOC) (#F6F1E7 Avorio Caldo) */}
            <nav
              aria-label={ui.tocTitle}
              className="mb-8 border border-[#050505]/15 bg-[#F6F1E7] text-[#050505] p-5"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-[#3D3830]">
                {ui.tocTitle}
              </p>
              <ul className="mt-3 grid gap-2 text-xs font-medium sm:grid-cols-2 lg:grid-cols-3 sm:text-sm">
                <li>
                  <a href="#programma-serata" className="text-[#050505] hover:underline">
                    {ui.tocProgram}
                  </a>
                </li>
                <li>
                  <a href="#prezzi-formule" className="text-[#050505] hover:underline">
                    {ui.tocPrices}
                  </a>
                </li>
                {(localized.menus?.length ?? 0) > 0 && (
                  <li>
                    <a href="#menu-ufficiale" className="text-[#050505] hover:underline">
                      {localized.menusHeading || 'Menu'}
                    </a>
                  </li>
                )}
                <li>
                  <a href="#termini-pagamento" className="text-[#050505] hover:underline">
                    {paymentTerms.tocLabel}
                  </a>
                </li>
                <li>
                  <a href="#prenota-concierge" className="text-[#050505] hover:underline">
                    {ui.tocBooking}
                  </a>
                </li>
                <li>
                  <a href="#mappa-locale" className="text-[#050505] hover:underline">
                    {ui.mapHeadingEvent}
                  </a>
                </li>
                <li>
                  <a href="#faq-evento" className="text-[#050505] hover:underline">
                    {ui.faqHeadingPrefix}
                  </a>
                </li>
                <li>
                  <a href="#eventi-correlati" className="text-[#050505] hover:underline">
                    {ui.tocRelated}
                  </a>
                </li>
              </ul>
            </nav>

            {/* Key Highlights */}
            <div className="grid gap-4 border border-[#F6F1E7]/14 bg-[#050505] p-5 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item} className="text-sm text-[#EAE3D5]">
                  • {item}
                </div>
              ))}
            </div>

            <div id="programma-serata" className="mt-8 space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#F6F1E7]">
                {ui.programHeading}
              </h2>
              <p className="text-base leading-relaxed text-[#C2B9AA]">{description}</p>
              <p className="text-sm leading-relaxed text-[#C2B9AA]">
                <strong className="text-[#F6F1E7]">{ui.musicLabel}:</strong> {music} ·{' '}
                <strong className="text-[#F6F1E7]">Dress Code:</strong> {dress}
              </p>
              {matchedPublicVenue && matchedPublicVenueHref && (
                <div
                  data-venue-authority-backlink
                  className="mt-4 flex flex-col gap-3 border border-[#C9A84C]/35 bg-[#050505] p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#C9A84C]">
                      {isGardaSisterVenue
                        ? (isIt ? 'Sede Gemella a Milano' : 'Sister Flagship Venue in Milan')
                        : (isIt ? 'Scheda Ufficiale Locale Tutto l\'Anno' : 'Official Year-Round Venue Guide')}
                    </p>
                    <p className="mt-1 text-sm text-[#EAE3D5]">
                      {isGardaSisterVenue
                        ? (isIt
                            ? 'Scopri anche la sede milanese Just Me Milano (Torre Branca, Parco Sempione): prezzi tavoli VIP, serate 7/7 e lista.'
                            : 'Explore our sister Milan flagship Just Me Milano (Torre Branca, Parco Sempione): VIP table prices, 7/7 nights and guest list.')
                        : (isIt
                            ? `Consulta prezzi tavoli VIP, dress code, orari metro e calendario settimanale completo di ${matchedPublicVenueName}.`
                            : `Check year-round VIP table prices, dress code, metro directions and weekly calendar for ${matchedPublicVenueName}.`)}
                    </p>
                  </div>
                  <Link
                    href={matchedPublicVenueHref}
                    className="inline-flex shrink-0 items-center justify-center border border-[#C9A84C] bg-[#C9A84C]/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#F6F1E7] transition hover:bg-[#C9A84C] hover:text-[#050505]"
                  >
                    {matchedPublicVenueName} →
                  </Link>
                </div>
              )}

              {localized.relatedHolidayBanner && (
                <div
                  data-related-holiday-banner
                  className="mt-4 flex flex-col gap-3 border border-[#EAE3D5]/40 bg-[#050505] p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#EAE3D5]">
                      {localized.relatedHolidayBanner.badge}
                    </p>
                    <p className="mt-1 font-serif text-lg font-bold text-[#F6F1E7]">
                      {localized.relatedHolidayBanner.title}
                    </p>
                    <p className="mt-1 text-sm text-[#C2B9AA]">
                      {localized.relatedHolidayBanner.description}
                    </p>
                  </div>
                  <Link
                    href={localized.relatedHolidayBanner.href}
                    className="inline-flex min-h-[44px] shrink-0 items-center justify-center bg-[#F6F1E7] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#050505] transition hover:bg-[#EAE3D5]"
                  >
                    {localized.relatedHolidayBanner.ctaLabel.replace(/\s*→+$/, '')} →
                  </Link>
                </div>
              )}

              {localized.schedule && localized.schedule.length > 0 && (
                <div className="mt-6 border border-[#F6F1E7]/15 bg-[#050505] p-5">
                  <h3 className="font-serif text-lg font-bold text-[#F6F1E7]">
                    {localized.scheduleHeading || ui.programHeading}
                  </h3>
                  <ol className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                    {localized.schedule.map((step) => (
                      <li
                        key={`${step.time}-${step.label}`}
                        className="border border-[#F6F1E7]/12 bg-[#0B0A09] p-3"
                      >
                        <span className="font-mono text-xs font-bold text-[#C9A84C]">{step.time}</span>
                        <p className="mt-1 text-xs leading-relaxed text-[#F6F1E7] sm:text-sm">{step.label}</p>
                      </li>
                    ))}
                  </ol>
                  {localized.programImageSrc && (
                    <div className="mt-4 flex justify-center border border-[#F6F1E7]/15 bg-[#0B0A09] p-2">
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
                  src={seoPack.poster.src}
                  title={seoPack.poster.title}
                  alt={seoPack.poster.alt}
                  loading="lazy"
                  decoding="async"
                  className="max-h-[540px] w-auto max-w-full object-contain"
                />
              </div>
              <figcaption className="mt-3 text-xs leading-relaxed text-[#C2B9AA] sm:text-sm">
                <strong className="text-[#F6F1E7]">{seoPack.poster.title}</strong> · {seoPack.poster.description}
              </figcaption>
            </figure>

            {/* Ad-Hoc Google Flow SEO Gallery (4 Images combining Event + Target Crowd + Event Outfit + H1/H2/H3) */}
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

            {/* Price Tiers Table (#F6F1E7 Capitolo Avorio Caldo) */}
            <div id="prezzi-formule" className="mt-10 border border-[#050505]/15 bg-[#F6F1E7] text-[#050505] p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-serif text-2xl font-bold text-[#050505]">
                  {ui.pricesHeadingPrefix} · {event.venueName}
                </h2>
                {!isPartyOnly && (
                  <span className="border border-[#050505] bg-[#050505] px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#F6F1E7]" data-selling-fast-badge>
                    {scarcity.sellingFastBadge}
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-[#3D3830]">{sourceBasis}</p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {tiers.map((tier) => (
                  <div
                    key={tier.label}
                    className="flex flex-col justify-between border border-[#050505]/15 bg-[#EFE9DC] p-5"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-serif text-lg font-bold text-[#050505]">{tier.label}</h3>
                        <span className="shrink-0 bg-[#050505] px-3 py-1 text-sm font-bold text-[#F6F1E7]">
                          {tier.price}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-[#24201B]">{tier.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Menus (Pineta Gala / Buffet & Voya 20th Floor) */}
            {localized.menus && localized.menus.length > 0 && (
              <section
                id="menu-ufficiale"
                data-official-menus
                className="mt-10 border border-[#F6F1E7]/20 bg-[#050505] p-6 sm:p-8"
              >
                <h2 className="font-serif text-2xl font-bold text-[#F6F1E7]">
                  {localized.menusHeading || 'Menu'}
                </h2>
                <div className="mt-5 grid gap-6 lg:grid-cols-2">
                  {localized.menus.map((menu) => (
                    <article
                      key={menu.id}
                      className="flex flex-col justify-between border border-[#F6F1E7]/16 bg-[#0B0A09] p-5"
                    >
                      <div>
                        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#F6F1E7]/12 pb-3">
                          <div>
                            <h3 className="font-serif text-xl font-bold text-[#F6F1E7]">{menu.title}</h3>
                            <p className="mt-1 text-xs text-[#C2B9AA]">{menu.subtitle}</p>
                          </div>
                          <span className="shrink-0 bg-[#F6F1E7] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#050505]">
                            {menu.price}
                          </span>
                        </div>
                        <dl className="mt-4 space-y-2.5 text-sm">
                          {menu.courses.map((c) => (
                            <div key={`${menu.id}-${c.course}`} className="border-b border-[#F6F1E7]/10 pb-2 last:border-0">
                              <dt className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#C9A84C]">
                                {c.course}
                              </dt>
                              <dd className="mt-0.5 text-xs leading-relaxed text-[#EAE3D5] sm:text-sm">
                                {c.dish}
                              </dd>
                            </div>
                          ))}
                        </dl>
                        <p className="mt-3 border border-[#F6F1E7]/15 bg-[#050505] p-3 text-xs font-medium text-[#C2B9AA]">
                          {menu.beverages}
                        </p>
                      </div>
                      <div className="mt-4 flex justify-center border border-[#F6F1E7]/15 bg-[#050505] p-2">
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
                    </article>
                  ))}
                </div>
              </section>
            )}

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

            {/* CTA Box with WhatsApp, Tel, Email */}
            <div
              id="prenota-concierge"
              className="mt-10 border border-[#F6F1E7]/25 bg-[#050505] p-6 sm:p-8"
            >
              <h2 className="font-serif text-2xl font-bold text-[#F6F1E7]">
                {ui.bookingHeading}
              </h2>
              <p className="mt-2 text-sm text-[#C2B9AA]">
                {ui.bookingSubtitle}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={getConciergeBookingUrl(locale, `${title} (${event.venueName} - 31/12/2026)`, `${SITE_URL}${canonicalPath}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event-cta-kind="table"
                  className="inline-flex min-h-[44px] items-center bg-[#25D366] px-6 py-3 text-sm font-bold text-[#050505] transition hover:bg-[#2EE472]"
                >
                  WhatsApp {SITE_CONTACT.whatsapp.number}
                </a>
                {event.xceedUrl ? (
                  <a
                    href={event.xceedUrl}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    data-event-cta-kind="admission"
                    className="inline-flex min-h-[44px] items-center bg-[#F6F1E7] px-6 py-3 text-sm font-bold text-[#050505] transition hover:bg-[#EAE3D5]"
                  >
                    {scarcity.xceedPriorityCta}
                  </a>
                ) : null}
                <a
                  href="tel:+393519127047"
                  className="inline-flex min-h-[44px] items-center border border-[#F6F1E7]/40 bg-[#0B0A09] px-5 py-3 text-sm font-semibold text-[#F6F1E7] transition hover:bg-[#F6F1E7] hover:text-[#050505]"
                >
                  {ui.callNowBtn}
                </a>
                <a
                  href="mailto:concierge@nightlifemilan.com"
                  className="inline-flex min-h-[44px] items-center border border-[#F6F1E7]/20 bg-[#0B0A09] px-5 py-3 text-sm font-semibold text-[#C2B9AA] transition hover:border-[#F6F1E7] hover:text-[#F6F1E7]"
                >
                  concierge@nightlifemilan.com
                </a>
                <Link
                  href={capodannoPath(locale)}
                  className="inline-flex min-h-[44px] items-center border border-[#F6F1E7]/20 px-5 py-3 text-sm font-semibold text-[#F6F1E7] hover:bg-[#F6F1E7] hover:text-[#050505]"
                >
                  {ui.backToAllBtn}
                </Link>
              </div>
            </div>

            {/* Embedded Google Map for Venue */}
            <div id="mappa-locale" className="mt-12">
              <h2 className="font-serif text-2xl font-bold text-[#F6F1E7]">
                {ui.mapHeadingEvent} · {event.venueName}
              </h2>
              <p className="mt-1 text-sm text-[#C2B9AA]">
                {event.venueName} · {event.address}, {event.city} ({event.province}) · {event.hours}
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
            <div id="faq-evento" className="mt-12 border border-[#050505]/15 bg-[#F6F1E7] text-[#050505] p-6 sm:p-8 space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#050505]">
                {ui.faqHeadingPrefix}
              </h2>
              {faqs.map((faq) => (
                <div key={faq.q} className="border border-[#050505]/15 bg-[#EFE9DC] p-5">
                  <h3 className="font-semibold text-[#050505]">{faq.q}</h3>
                  <p className="mt-1.5 text-sm text-[#24201B]">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Events */}
        {related.length > 0 && (
          <section id="eventi-correlati" className="mt-14">
            <h2 className="font-serif text-2xl font-bold text-[#F6F1E7]">
              {ui.relatedHeading}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={capodannoEventPath(item.slug, locale)}
                  className="border border-[#F6F1E7]/14 bg-[#0B0A09] p-5 transition hover:border-[#F6F1E7]/45"
                >
                  <p className="text-xs font-semibold text-[#EAE3D5]">
                    {item.city} ({item.province})
                  </p>
                  <h3 className="mt-1 font-serif text-lg font-bold text-[#F6F1E7]">
                    {getCapodannoLocalizedEventTitle(item, locale)}
                  </h3>
                  <p className="mt-2 text-xs text-[#C2B9AA]">
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
