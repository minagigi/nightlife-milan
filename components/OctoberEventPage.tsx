import Link from '@/components/LocalizedLink';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { MessageCircle, Ticket } from 'lucide-react';
import EventCoverHero from '@/components/EventCoverHero';
import EventVenueSection from '@/components/EventVenueSection';
import CuratedSpecialEvents from '@/components/CuratedSpecialEvents';
import EventMoneyPillarsStrip from '@/components/EventMoneyPillarsStrip';
import ConfirmedEventTicketsBox from '@/components/single-pass/ConfirmedEventTicketsBox';
import { getConfirmedSkusForInventoryEvent } from '@/lib/single-pass/catalog';
import { getOctoberVenue } from '@/lib/octoberVenue';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import { jsonLdString } from '@/lib/seo';
import { buildOctoberEventGraph, formatOctoberEventDate } from '@/lib/octoberEventSeo';
import { getOctoberHubCopy } from '@/lib/october-events/copy';
import EventTemporalBoundary from '@/components/EventTemporalBoundary';
import { getEventTemporalCopy } from '@/lib/i18n/eventTemporalCopy';
import { octoberOfferConditions, octoberSourceConflict } from '@/lib/october-events/conditions';
import { readOctoberEventCopy } from '@/lib/octoberEditorial';
import { OCTOBER_EVENTS_INVENTORY } from '@/lib/octoberEvents';
import { currentOfferReadbackCopy } from '@/lib/currentOfferReadbackCopy';
import { getScriptFont } from '@/lib/scriptFonts';
import type { OctoberEventRecord } from '@/lib/october-events/types';
import { getLocaleDef, localePrefix, type LocaleCode } from '@/lib/i18n/locales';
import { getMonthEventLocalePack } from '@/lib/month-events/locales';
import { octoberAddressConflict } from '@/lib/october-events/addressStatus';
import { getRaConditionTexts } from '@/lib/october-events/raConditionsAdapter';
import { formatOctoberProgrammeDateRange } from '@/lib/october-events/festivalPeriod';
import { sanitizePublicEventJsonLd } from '@/lib/publicOutboundLinks';
import { getJustmePage, justmeBodyImages } from '@/lib/october-events/justmeContract';
import { getScarcityAndChatCopy } from '@/lib/i18n/scarcityAndChatCopy';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { buildSeoEventImagePack } from '@/lib/seoEventImages';
import { getOctoberEventSlug } from '@/lib/october-events/copy';
import { getPublicImageDimensions } from '@/lib/imageDimensions';

export default async function OctoberEventPage({
  event,
  locale,
  initialNow,
  children,
}: {
  event: OctoberEventRecord;
  locale: LocaleCode;
  initialNow: string;
  children?: ReactNode;
}) {
  const copy = await readOctoberEventCopy(event, locale);
  const hub = getOctoberHubCopy(locale);
  const prefix = localePrefix(locale);
  const date = formatOctoberEventDate(locale, event.startISO);
  const programmePeriod = event.programmeDateRange
    ? `${getMonthEventLocalePack(locale).labels.programme}: ${formatOctoberProgrammeDateRange(locale, event.programmeDateRange)}`
    : null;
  const eventPagePath = `${prefix}/${getLocalizedDir35('events', locale)}/${copy.slug}`;
  const inquiry = getConciergeBookingUrl(
    locale,
    `${event.officialName} · ${date} · ${event.venue.name}`,
    eventPagePath,
  );
  const money = new Intl.NumberFormat(getLocaleDef(locale)?.hreflang || locale, {
    style: 'currency',
    currency: 'EUR',
  });
  const checkedAt = event.commercialCheckedAt || OCTOBER_EVENTS_INVENTORY.sourceCheckedAt;
  const soldOut = currentOfferReadbackCopy(locale, checkedAt).soldOut;
  const temporal = getEventTemporalCopy(locale, checkedAt);
  const beforeEnd = Boolean(event.endISO && Date.parse(initialNow) < Date.parse(event.endISO));
  const hasAdmission = event.offers.some(
    (o) => ['ticket', 'guestlist', 'table'].includes(o.category) && o.availability === 'available',
  );
  const venueGalleryCopy = getMonthEventLocalePack(locale);
  const venue = getOctoberVenue(event, locale);
  const admissionNotices = getRaConditionTexts(locale, event.admissionConditions || []);
  const justmePage = getJustmePage(event, locale);
  const justmeImages = justmeBodyImages(event, locale);
  const scarcity = getScarcityAndChatCopy(locale);
  const eventSlug = getOctoberEventSlug(event);
  const seoPack = buildSeoEventImagePack({
    locale,
    eventSlug,
    venueName: event.venue.name,
    music: event.genres.length > 0 ? event.genres.join(', ') : undefined,
    dressCode: event.dressCode || undefined,
    h1: copy.title,
    h2List: [copy.headings.overview, copy.headings.booking, copy.headings.faq],
    h3List: copy.sections.slice(0, 4).map((s) => s.heading),
    posterSrc: event.image.src,
    isHalloween: eventSlug.includes('halloween') || event.id.includes('halloween'),
  });
  const posterDims = getPublicImageDimensions(event.image.src, {
    width: event.image.width,
    height: event.image.height,
  });
  const hasXceed = Boolean(
    event.affiliateStatus === 'verified' && event.affiliateUrl && hasAdmission,
  );
  const scriptFont = getScriptFont(locale);
  const confirmedSkus = beforeEnd ? getConfirmedSkusForInventoryEvent(event.id) : [];

  const actions = (
    <div className="space-y-3">
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#EAE3D5]">
          CONCIERGE NIGHTLIFE MILAN
        </span>
        <span
          className="inline-flex bg-[#EAE3D5] px-2.5 py-0.5 font-mono text-[11px] font-extrabold uppercase tracking-wider text-[#050505]"
          data-almost-sold-out-badge
        >
          {scarcity.almostSoldOutBadge}
        </span>
      </div>
      {hasXceed ? (
        <EventTemporalBoundary
          endDateISO={event.endISO}
          initialBeforeEnd={beforeEnd}
          beforeEnd={
            <a
              href={event.affiliateUrl!}
              target="_blank"
              rel="sponsored noopener noreferrer"
              data-october-affiliate
              data-event-cta-kind="admission"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 bg-[#F6F1E7] px-5 py-3 text-center text-sm font-extrabold uppercase tracking-wider text-[#050505] transition hover:bg-[#EAE3D5] focus-visible:ring-2 focus-visible:ring-[#F6F1E7]"
            >
              <Ticket className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{copy.labels.offers}</span>
            </a>
          }
          afterEnd={<p className="text-sm text-[#C2B9AA]">{temporal.endedNotice}</p>}
        />
      ) : null}
      <a
        href={inquiry}
        target="_blank"
        rel="noopener noreferrer"
        data-october-inquiry
        data-analytics-source={`october-${event.id}-inquiry`}
        className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 bg-[#25D366] px-5 py-3 text-center text-sm font-extrabold uppercase tracking-wider text-[#050505] transition hover:bg-[#2EE472] focus-visible:ring-2 focus-visible:ring-[#F6F1E7]"
      >
        <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
        <span>
          {copy.labels.askWhatsApp} ·{' '}
          <bdi dir="ltr" className="whitespace-nowrap">
            +39 351 912 7047
          </bdi>
        </span>
      </a>
    </div>
  );

  const tocItems = justmePage
    ? justmePage.primaryH3
    : [
        { id: 'october-booking', heading: copy.headings.booking },
        { id: 'october-overview', heading: copy.headings.overview },
        ...copy.sections.slice(0, 2).map((sec, idx) => ({
          id: `october-section-${idx}`,
          heading: sec.heading,
        })),
        { id: 'october-gallery', heading: venueGalleryCopy.labels.gallery.replace('{venue}', event.venue.name) },
        { id: 'october-faq', heading: copy.headings.faq },
      ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            sanitizePublicEventJsonLd(buildOctoberEventGraph(event, locale, copy)),
          ),
        }}
      />
      <main
        data-layout-alt="alternativa-02-capitoli-colore-netto"
        className="min-h-screen bg-[#050505] pb-16 pt-3 font-sans text-[#F6F1E7] sm:pt-4"
        data-october-event={event.id}
      >
        <div className="mx-auto max-w-5xl px-4 pb-2 sm:px-6 lg:px-8">
          <nav
            aria-label={copy.labels.recommendations}
            className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-[#C2B9AA] sm:text-[13px]"
          >
            <Link href={prefix || '/'} prefetch={false} className="hover:text-[#F6F1E7]">
              Nightlife Milan
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={`${prefix}/events/october-2026`}
              prefetch={false}
              className="hover:text-[#F6F1E7]"
            >
              {hub.labels.heading}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#F6F1E7]">{event.officialName}</span>
          </nav>
        </div>

        {/* CAPITOLO 01 — NOTTE #050505: Locandina a pieno placeholder & Indice Rapido */}
        <EventCoverHero
          src={event.image.src}
          alt={seoPack.poster.alt}
          imageTitle={seoPack.poster.title}
          caption={seoPack.poster.description}
          width={posterDims.width}
          height={posterDims.height}
          eventId={event.id}
          title={copy.title}
          venue={event.venue.name}
          statusBadge={scarcity.almostSoldOutBadge}
          date={programmePeriod ? `${date} · ${programmePeriod}` : date}
          dateTimeISO={event.startISO}
        />

        <div data-event-body className={scriptFont ? scriptFont.variableClass : undefined}>
          <div className="bg-[#050505] pb-8 text-[#F6F1E7]">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-center gap-2.5">
                <p
                  className="font-mono text-xs font-bold uppercase tracking-wider text-[#EAE3D5] sm:text-sm"
                  data-october-essentials
                >
                  {date} · {event.venue.name}
                </p>
                <span
                  className="bg-[#25D366] px-3 py-0.5 font-mono text-xs font-extrabold uppercase tracking-wider text-[#050505]"
                  data-selling-fast-badge
                >
                  {scarcity.almostSoldOutBadge}
                </span>
              </div>

              <nav
                aria-label={copy.headings.overview}
                data-october-body-index
                className="mt-4 border-t border-[#F6F1E7]/15 pt-4"
              >
                <ol className="flex gap-2 overflow-x-auto pb-1.5 text-xs font-bold md:flex-wrap md:overflow-visible md:pb-0">
                  {tocItems.map((item, idx) => (
                    <li key={item.id} className="shrink-0">
                      <a
                        className={`inline-flex min-h-[38px] items-center px-3.5 py-1.5 transition ${
                          idx === 0
                            ? 'bg-[#EAE3D5] text-[#050505]'
                            : 'border border-[#F6F1E7]/22 bg-[#141311] text-[#F6F1E7] hover:border-[#F6F1E7]'
                        }`}
                        href={`#${item.id}`}
                      >
                        {item.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </div>

          {/* CAPITOLO 02 — CARTA CALDA #F6F1E7: Offerte, Biglietti & Prenotazione Immediata */}
          <section
            aria-labelledby="october-booking"
            className="border-y border-[#050505] bg-[#F6F1E7] py-10 text-[#050505]"
          >
            <div className="mx-auto max-w-5xl space-y-6 px-4 sm:px-6 lg:px-8">
              <div
                role="alert"
                data-urgency-alert
                className="border border-[#050505]/25 bg-[#EAE3D5] p-4 text-[#050505] sm:p-5"
              >
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#050505] sm:text-sm">
                  {scarcity.urgencyAlertTitle}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#24201B]">
                  {scarcity.urgencyAlertBody}
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
                <div className="space-y-5">
                  <div>
                    <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#4A453E]">
                      01 · {copy.labels.offers}
                    </p>
                    <h2
                      id="october-booking"
                      className="mt-1 font-display text-2xl font-bold uppercase leading-tight text-[#050505] sm:text-3xl"
                    >
                      {copy.headings.booking}
                    </h2>
                    <p
                      className="mt-3 text-base leading-relaxed text-[#24201B]"
                      data-october-summary
                      data-justme-body-copy={justmePage ? 'intro' : undefined}
                    >
                      {copy.summary}
                    </p>
                    {octoberSourceConflict(event, locale) ? (
                      <p
                        className="mt-3 border-l-2 border-[#050505] bg-[#EAE3D5] px-3 py-2 text-sm font-medium text-[#050505]"
                        data-october-source-conflict
                      >
                        {octoberSourceConflict(event, locale)}
                      </p>
                    ) : null}
                    {event.admissionStatus === 'sold_out' ? (
                      <p className="mt-3 font-bold text-[#991B1B]" data-october-sold-out>
                        {soldOut}
                      </p>
                    ) : null}
                  </div>

                  <div className="border border-[#050505] bg-[#FFFFFF] p-5 text-[#050505]">
                    <p className="font-display text-xl font-bold text-[#050505]">
                      {copy.labels.offers}
                    </p>
                    <p className="mt-1 text-xs text-[#4A453E] sm:text-sm">
                      {hub.labels.sourceNotice}
                    </p>
                    {event.endISO ? (
                      <EventTemporalBoundary
                        endDateISO={event.endISO}
                        initialBeforeEnd={beforeEnd}
                        beforeEnd={null}
                        afterEnd={
                          <p className="mt-2 text-sm text-[#4A453E]">{temporal.historicalOffers}</p>
                        }
                      />
                    ) : null}

                    {event.offers.length ? (
                      <ul
                        className="mt-4 divide-y divide-[#050505]/15 border-t border-[#050505]/15"
                        data-october-offers
                      >
                        {event.offers.map((offer, i) => (
                          <li
                            key={i}
                            className="flex flex-wrap items-start justify-between gap-4 py-3.5 text-sm sm:text-base"
                          >
                            <span className="min-w-0 flex-1 font-bold text-[#050505]">
                              <bdi>{offer.name}</bdi>
                              {octoberOfferConditions(offer, locale).map((condition) => (
                                <span
                                  key={condition}
                                  className="mt-1 block text-xs font-normal text-[#3D3830] sm:text-sm"
                                >
                                  {condition}
                                </span>
                              ))}
                              {offer.availability === 'sold_out' ? (
                                <span className="mt-1 block text-xs font-semibold text-[#991B1B]">
                                  {soldOut}
                                </span>
                              ) : null}
                            </span>
                            <span className="font-display text-2xl font-extrabold tabular-nums text-[#050505]">
                              {offer.price === null
                                ? copy.labels.noKnownValue
                                : money.format(offer.price)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : admissionNotices.length ? (
                      <ul className="mt-4 list-disc space-y-2 ps-5 text-sm leading-relaxed text-[#24201B]">
                        {admissionNotices.map((notice) => (
                          <li key={notice}>{notice}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-3 text-sm text-[#4A453E]">{copy.labels.noKnownValue}</p>
                    )}
                  </div>
                </div>

                {/* Dark Plinth Sidebar for Immediate Booking CTA */}
                <aside
                  className="border border-[#050505] bg-[#050505] p-5 text-[#F6F1E7] lg:sticky lg:top-24"
                  aria-label={copy.headings.booking}
                >
                  {admissionNotices.length ? (
                    <ul
                      className="mb-5 list-disc space-y-2.5 border-b border-[#F6F1E7]/15 pb-4 ps-5 text-xs leading-relaxed text-[#EAE3D5] sm:text-sm"
                      data-october-admission-conditions
                    >
                      {admissionNotices.map((notice) => (
                        <li key={notice}>{notice}</li>
                      ))}
                    </ul>
                  ) : null}
                  {actions}
                </aside>
              </div>

              {confirmedSkus.length > 0 ? (
                event.endISO ? (
                  <EventTemporalBoundary
                    endDateISO={event.endISO}
                    initialBeforeEnd={beforeEnd}
                    beforeEnd={
                      <ConfirmedEventTicketsBox
                        locale={locale}
                        skus={confirmedSkus}
                        venueName={event.venue.name}
                      />
                    }
                    afterEnd={null}
                  />
                ) : (
                  <ConfirmedEventTicketsBox
                    locale={locale}
                    skus={confirmedSkus}
                    venueName={event.venue.name}
                  />
                )
              ) : null}
            </div>
          </section>

          {/* CAPITOLO 03 — CHAMPAGNE #EAE3D5: Guida alla Serata, Format & Dettagli */}
          <section
            aria-labelledby="october-overview"
            className="border-b border-[#050505] bg-[#EAE3D5] py-10 text-[#050505]"
          >
            <div className="mx-auto max-w-5xl space-y-8 px-4 sm:px-6 lg:px-8">
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#4A453E]">
                  02 · FORMAT & GUIDA SERATA
                </p>
                <h2
                  id="october-overview"
                  className="mt-1 font-display text-2xl font-bold uppercase leading-tight text-[#050505] sm:text-3xl"
                >
                  {copy.headings.overview}
                </h2>
                {justmePage ? (
                  <h3
                    id={justmePage.primaryH3[0].id}
                    className="mt-4 font-display text-xl font-bold text-[#050505]"
                  >
                    {justmePage.primaryH3[0].heading}
                  </h3>
                ) : null}
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {copy.sections.slice(0, 4).map((s, i) => (
                  <section
                    key={i}
                    aria-labelledby={`october-section-${i}`}
                    className="border border-[#050505]/20 bg-[#FFFFFF] p-5 text-[#050505]"
                  >
                    {justmePage ? (
                      <h4
                        id={`october-section-${i}`}
                        className="font-display text-lg font-bold text-[#050505]"
                      >
                        {s.heading}
                      </h4>
                    ) : (
                      <h3
                        id={`october-section-${i}`}
                        className="font-display text-lg font-bold text-[#050505]"
                      >
                        {s.heading}
                      </h3>
                    )}
                    <p
                      className="mt-2.5 text-sm leading-relaxed text-[#24201B] sm:text-base"
                      data-justme-body-copy={justmePage ? `section${i}` : undefined}
                    >
                      {s.body}
                    </p>
                  </section>
                ))}
              </div>

              {copy.sections.length > 4 && (
                <div className="space-y-5">
                  {justmePage ? (
                    <h3
                      id={justmePage.primaryH3[1].id}
                      className="font-display text-xl font-bold text-[#050505]"
                    >
                      {justmePage.primaryH3[1].heading}
                    </h3>
                  ) : null}
                  <div className="grid gap-5 md:grid-cols-2">
                    {copy.sections.slice(4).map((s, i) => (
                      <section
                        key={i}
                        aria-labelledby={`october-section-${i + 4}`}
                        className="border border-[#050505]/20 bg-[#F6F1E7] p-5 text-[#050505]"
                      >
                        {justmePage ? (
                          <h4
                            id={`october-section-${i + 4}`}
                            className="font-display text-lg font-bold text-[#050505]"
                          >
                            {s.heading}
                          </h4>
                        ) : (
                          <h3
                            id={`october-section-${i + 4}`}
                            className="font-display text-lg font-bold text-[#050505]"
                          >
                            {s.heading}
                          </h3>
                        )}
                        <p
                          className="mt-2.5 text-sm leading-relaxed text-[#24201B] sm:text-base"
                          data-justme-body-copy={justmePage ? `section${i + 4}` : undefined}
                        >
                          {s.body}
                        </p>
                      </section>
                    ))}
                  </div>
                </div>
              )}

              {justmePage ? (
                <div className="space-y-6" data-justme-expansion>
                  {justmePage.expansionSections.map((section, i) => (
                    <section
                      key={i}
                      className="border border-[#050505]/20 bg-[#FFFFFF] p-5 text-[#050505] sm:p-6"
                    >
                      <h4 className="font-display text-xl font-bold text-[#050505]">
                        {section.heading}
                      </h4>
                      {section.body.split(/\n\s*\n/u).map((body, j) => (
                        <p
                          key={j}
                          className="mt-3 text-sm leading-relaxed text-[#24201B] sm:text-base"
                          data-justme-body-copy={`expansion${i}-${j}`}
                        >
                          {body}
                        </p>
                      ))}
                    </section>
                  ))}
                </div>
              ) : null}
            </div>
          </section>

          {/* CAPITOLO 04 — NOTTE #050505: Galleria Atmosfera a pieno placeholder (1 colonna mobile) & Locandina */}
          <div className="bg-[#050505] py-10 text-[#F6F1E7]">
            <div className="mx-auto max-w-5xl space-y-12 px-4 sm:px-6 lg:px-8">
              {justmeImages.length ? (
                <section
                  aria-label={copy.labels.venue}
                  data-justme-body-images
                  className="grid grid-cols-1 items-start gap-8 md:grid-cols-2"
                >
                  {justmeImages.map((image) => (
                    <figure
                      key={image.key}
                      className="min-w-0"
                    >
                      <div
                        className="w-full overflow-hidden border border-[#F6F1E7]/16 bg-[#050505]"
                        style={{ aspectRatio: `${image.width} / ${image.height}` }}
                      >
                        <Image
                          quality={92}
                          src={image.src}
                          alt={image.alt}
                          title={image.alt}
                          width={image.width}
                          height={image.height}
                          sizes="(max-width: 767px) 100vw, 640px"
                          className="block h-full w-full object-cover"
                        />
                      </div>
                      <figcaption className="pt-3 text-sm leading-relaxed text-[#C2B9AA]">
                        {image.caption}
                      </figcaption>
                    </figure>
                  ))}
                </section>
              ) : null}

              <section
                aria-labelledby="october-gallery"
                data-october-gallery
                data-seo-flow-gallery
                className="space-y-6"
              >
                <div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#EAE3D5]">
                    {seoPack.eyebrow}
                  </p>
                  <h3
                    id="october-gallery"
                    className="mt-1 font-display text-2xl font-bold uppercase text-[#F6F1E7] sm:text-3xl"
                  >
                    {seoPack.sectionHeading}
                  </h3>
                  <p className="mt-2 max-w-[54ch] text-sm leading-relaxed text-[#C2B9AA]">
                    {seoPack.sectionSubtitle}
                  </p>
                  <p className="mt-2 text-xs text-[#EAE3D5]">
                    {seoPack.targetPrefix}: {seoPack.targetLabel} · {seoPack.outfitPrefix}: {seoPack.outfitLabel}
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

              <figure
                className="grid grid-cols-1 gap-6 border-t border-[#F6F1E7]/16 pt-8 lg:grid-cols-12 lg:items-center lg:gap-10"
                data-october-poster-detail
              >
                <div
                  className="w-full overflow-hidden border border-[#F6F1E7]/18 bg-[#050505] lg:col-span-5"
                  style={{ aspectRatio: `${posterDims.width} / ${posterDims.height}` }}
                >
                  <Image
                    quality={95}
                    src={event.image.src}
                    alt={seoPack.poster.alt}
                    width={posterDims.width}
                    height={posterDims.height}
                    sizes="(max-width: 1080px) 100vw, 1080px"
                    className="block h-full w-full object-cover"
                  />
                </div>
                <figcaption className="space-y-3 text-sm leading-relaxed text-[#C2B9AA] lg:col-span-7">
                  <span className="inline-block border border-[#F6F1E7]/35 bg-[#050505] px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[#F6F1E7]">
                    {seoPack.poster.badgeLabel} · {event.venue.name}
                  </span>
                  <p className="text-[#EAE3D5]">
                    <strong>{seoPack.targetPrefix}:</strong> {seoPack.targetLabel}
                  </p>
                  <p className="text-[#C2B9AA]">
                    <strong className="text-[#EAE3D5]">{seoPack.outfitPrefix}:</strong> {seoPack.outfitLabel}
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>

          {/* CAPITOLO 05 — CARTA CALDA #F6F1E7: Domande Frequenti */}
          <section
            aria-labelledby="october-faq"
            className="border-y border-[#050505] bg-[#F6F1E7] py-10 text-[#050505]"
          >
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="border border-[#050505] bg-[#FFFFFF] p-5 sm:p-8">
                <h2
                  id="october-faq"
                  className="font-display text-2xl font-bold uppercase leading-tight text-[#050505]"
                >
                  {copy.headings.faq}
                </h2>
                <div className="mt-5 divide-y divide-[#050505]/15 border-y border-[#050505]/15">
                  {copy.faqs.map((faq, i) =>
                    justmePage ? (
                      <section key={i} className="py-5" data-october-faq={i + 1}>
                        <h3
                          className="font-display text-lg font-bold leading-snug text-[#050505]"
                          data-justme-body-copy={`faq${i}-question`}
                        >
                          {faq.question}
                        </h3>
                        <p
                          className="pt-2.5 text-sm leading-relaxed text-[#24201B] sm:text-base"
                          data-justme-body-copy={`faq${i}-answer`}
                        >
                          {faq.answer}
                        </p>
                      </section>
                    ) : (
                      <details
                        key={i}
                        open={i < 2}
                        className="group py-4"
                        data-october-faq={i + 1}
                      >
                        <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 marker:hidden focus-visible:ring-2 focus-visible:ring-[#050505]">
                          <h3 className="text-sm font-bold leading-snug text-[#050505] sm:text-base">
                            {faq.question}
                          </h3>
                          <span
                            className="font-mono text-xl font-bold text-[#050505] transition-transform group-open:rotate-45"
                            aria-hidden="true"
                          >
                            +
                          </span>
                        </summary>
                        <p className="pt-2.5 text-sm leading-relaxed text-[#24201B] sm:text-base">
                          {faq.answer}
                        </p>
                      </details>
                    ),
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* CAPITOLO 06 — NOTTE #050505: Venue, Eventi Speciali & Pillars */}
          <div className="bg-[#050505] pt-10 text-[#F6F1E7]">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              {venue ? (
                <EventVenueSection locale={locale} venue={venue} />
              ) : (
                <section
                  className="border-t border-[#F6F1E7]/14 pt-8"
                  aria-label={copy.labels.venueSection}
                >
                  <h3 className="font-display text-xl font-bold text-[#F6F1E7]">
                    {event.venue.name}
                  </h3>
                  <p
                    className="mt-3 text-base leading-relaxed text-[#C2B9AA]"
                    data-event-venue-unavailable={locale}
                  >
                    {octoberAddressConflict(event, locale)}
                  </p>
                </section>
              )}
            </div>
            <CuratedSpecialEvents
              locale={locale}
              surface="event"
              excludeEventId={`october-${event.id}`}
              headingLevel={3}
            />
            <EventMoneyPillarsStrip locale={locale} />
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
