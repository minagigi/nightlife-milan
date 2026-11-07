import SeoAuthorityHub from '@/components/SeoAuthorityHub';
import type { LocaleCode } from '@/lib/i18n/locales';
import { capodannoEventPath, capodannoNavigation, capodannoPath } from '@/lib/capodanno/routes';
import {
  getCapodannoLocalizedEventSubtitle,
  getCapodannoLocalizedEventTitle,
  getCapodannoUiCopy,
} from '@/lib/capodanno/i18n';
import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import { SITE_CONTACT } from '@/config/contact';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import { localePrefix } from '@/lib/i18n/locales';
import { getScarcityAndChatCopy } from '@/lib/i18n/scarcityAndChatCopy';
import {
  CAPODANNO_EVENTS,
  type CapodannoEventItem,
} from '@/lib/capodannoEvents';
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
  const ui = getCapodannoUiCopy(locale);
  const scarcity = getScarcityAndChatCopy(locale);

  const title = getCapodannoLocalizedEventTitle(event, locale);
  const subtitle = getCapodannoLocalizedEventSubtitle(event, locale);
  const description = isIt ? event.descriptionIt : event.descriptionEn;
  const music = isIt ? event.musicAndFormatIt : event.musicAndFormatEn;
  const dress = isIt ? event.dressCodeIt : event.dressCodeEn;
  const tiers = isIt ? event.tiersIt : event.tiersEn;
  const highlights = isIt ? event.highlightsIt : event.highlightsEn;
  const sourceBasis = isIt ? event.sourceBasisIt : event.sourceBasisEn;
  const canonicalPath = capodannoEventPath(event.slug, locale);
  const officialPosterSrc = getCapodannoOfficialPosterSrc(event.slug);

  const seoPack = buildSeoEventImagePack({
    locale,
    eventSlug: event.slug,
    venueName: event.venueName,
    h1: title,
    h2List: [
      ui.programHeading,
      `${ui.pricesHeadingPrefix} — ${event.venueName}`,
      ui.bookingHeading,
      `${ui.mapHeadingEvent} — ${event.venueName}`,
    ],
    h3List: tiers.map((t) => t.label),
    categorySlug: event.category,
    music,
    dressCode: dress,
    posterSrc: officialPosterSrc,
  });

  const related = CAPODANNO_EVENTS.filter(
    (item) => item.category === event.category && item.slug !== event.slug
  ).slice(0, 6);

  const faqs = isIt
    ? [
        {
          q: `Quanto costa il Capodanno 2027 presso ${event.venueName} (${event.city})?`,
          a: `Le formule previste per la notte di San Silvestro (31 dicembre 2026 – 1 gennaio 2027) presso ${event.venueName} sono: ${event.priceSummaryIt}. ${sourceBasis}`,
        },
        {
          q: `Quali sono gli orari e l’indirizzo di ${event.venueName} per la notte di Capodanno?`,
          a: `L’evento si svolge presso ${event.venueName} in ${event.address}, ${event.city} (${event.province}), con orario indicativo ${event.hours}. Il dress code richiesto è: ${dress}.`,
        },
        {
          q: `Come posso prenotare prevendite, cenone o tavolo VIP per ${event.venueName}?`,
          a: `Puoi verificare la disponibilità dei lotti Early Bird, i menu del Gran Cenone e le mappe dei tavoli Privé contattando direttamente il Concierge ufficiale Nightlife Milan su WhatsApp o telefono al numero ${SITE_CONTACT.whatsapp.number} oppure via email a concierge@nightlifemilan.com senza commissioni aggiuntive.`,
        },
      ]
    : locale === 'en'
      ? [
          {
            q: `How much does New Year’s Eve 2027 cost at ${event.venueName} (${event.city})?`,
            a: `Official and benchmark packages for December 31, 2026 – January 1, 2027 at ${event.venueName} are: ${event.priceSummaryEn}. ${sourceBasis}`,
          },
          {
            q: `What are the hours, address, and dress code for ${event.venueName} on New Year’s Eve?`,
            a: `The celebration takes place at ${event.venueName}, ${event.address}, ${event.city} (${event.province}), operating ${event.hours}. Recommended dress code: ${dress}.`,
          },
          {
            q: `How can I book tickets, gala dinner, or a VIP table for ${event.venueName}?`,
            a: `You can check real-time early-bird ticket availability, gala menus, and VIP table floor plans via the official Nightlife Milan WhatsApp Concierge at ${SITE_CONTACT.whatsapp.number} or email concierge@nightlifemilan.com with zero agency markups.`,
          },
        ]
      : [
          {
            q: `${nav.menuLabel} 2027 @ ${event.venueName} (${event.city}) — EUR (€)?`,
            a: `${event.venueName} (${event.address}, ${event.city}): ${event.priceSummaryEn}. ${sourceBasis}`,
          },
          {
            q: `${event.venueName} (${event.address}, ${event.city}) — 31/12/2026 (${event.hours})?`,
            a: `${event.venueName}, ${event.address}, ${event.city} (${event.province}), ${event.hours}. Dress code: ${dress}.`,
          },
          {
            q: `WhatsApp Concierge ${SITE_CONTACT.whatsapp.number} — ${event.venueName}?`,
            a: `${ui.bookingSubtitle}`,
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
        offers: {
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
    <main className="min-h-screen bg-[#131009] pb-24 pt-24 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-white/50">
          <Link href={prefix || '/'} className="hover:text-champagne">Home</Link>
          <span>/</span>
          <Link href={capodannoPath(locale)} className="hover:text-champagne">
            {nav.menuLabel} 2027
          </Link>
          <span>/</span>
          <span className="text-champagne">{event.venueName}</span>
        </nav>

        <div className="overflow-hidden rounded-3xl border border-champagne/30 bg-[#18140c]">
          <div className="relative h-72 w-full sm:h-96">
            <img
              src={seoPack.poster.src}
              title={seoPack.poster.title}
              alt={seoPack.poster.alt}
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#18140c] via-[#18140c]/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-champagne px-3 py-1 text-xs font-bold text-black">
                  {ui.dateBadge}
                </span>
                <span className="rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-champagne">
                  {event.city} ({event.province})
                </span>
                <span className="rounded-full border border-amber-400/80 bg-black/85 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-amber-300" data-almost-sold-out-badge>
                  {scarcity.almostSoldOutBadge}
                </span>
              </div>
              <h1 data-event-title={title} className="mt-3 font-serif text-3xl font-bold text-white sm:text-5xl">
                {title}
              </h1>
              <p className="mt-2 text-sm text-white/75 sm:text-base">{subtitle}</p>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div role="alert" data-urgency-alert className="mb-8 rounded-2xl border-2 border-amber-400/70 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent p-5 shadow-lg">
              <p className="text-xs font-extrabold uppercase tracking-wider text-amber-300 sm:text-sm">
                {scarcity.urgencyAlertTitle}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/90">
                {scarcity.urgencyAlertBody}
              </p>
            </div>
            {/* Clickable Table of Contents (TOC) */}
            <nav
              aria-label={ui.tocTitle}
              className="mb-8 rounded-2xl border border-white/12 bg-black/40 p-4 sm:p-5"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-champagne">
                {ui.tocTitle}
              </p>
              <ul className="mt-3 grid gap-2 text-xs sm:grid-cols-2 lg:grid-cols-3 sm:text-sm">
                <li>
                  <a href="#programma-serata" className="text-white/85 hover:text-champagne hover:underline">
                    {ui.tocProgram}
                  </a>
                </li>
                <li>
                  <a href="#prezzi-formule" className="text-white/85 hover:text-champagne hover:underline">
                    {ui.tocPrices}
                  </a>
                </li>
                <li>
                  <a href="#prenota-concierge" className="text-white/85 hover:text-champagne hover:underline">
                    {ui.tocBooking}
                  </a>
                </li>
                <li>
                  <a href="#mappa-locale" className="text-white/85 hover:text-champagne hover:underline">
                    4. {ui.mapHeadingEvent}
                  </a>
                </li>
                <li>
                  <a href="#faq-evento" className="text-white/85 hover:text-champagne hover:underline">
                    5. {ui.faqHeadingPrefix}
                  </a>
                </li>
                <li>
                  <a href="#eventi-correlati" className="text-white/85 hover:text-champagne hover:underline">
                    {ui.tocRelated}
                  </a>
                </li>
              </ul>
            </nav>

            {/* Key Highlights */}
            <div className="grid gap-4 rounded-2xl border border-white/10 bg-black/30 p-5 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item} className="text-sm text-white/85">
                  • {item}
                </div>
              ))}
            </div>

            <div id="programma-serata" className="mt-8 space-y-4">
              <h2 className="font-serif text-2xl font-bold text-champagne">
                {ui.programHeading}
              </h2>
              <p className="text-base leading-relaxed text-white/80">{description}</p>
              <p className="text-sm leading-relaxed text-white/65">
                <strong className="text-white">{ui.musicLabel}:</strong> {music} ·{' '}
                <strong className="text-white">Dress Code:</strong> {dress}
              </p>
            </div>

            {/* Official Remediated Event Poster (Uncropped object-contain) */}
            <figure
              data-capodanno-poster-detail
              className="mt-8 overflow-hidden rounded-2xl border border-champagne/30 bg-black/55 p-4 sm:p-6"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-full bg-champagne/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-champagne">
                  {seoPack.poster.badgeLabel}
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-white/15 bg-black/60 px-3 py-1 text-white/85">
                    <strong className="text-champagne">{seoPack.targetPrefix}:</strong> {seoPack.targetLabel}
                  </span>
                  <span className="rounded-full border border-white/15 bg-black/60 px-3 py-1 text-white/85">
                    <strong className="text-champagne">{seoPack.outfitPrefix}:</strong> {seoPack.outfitLabel}
                  </span>
                </div>
              </div>
              <div className="flex justify-center rounded-xl bg-black/70 p-2">
                <img
                  src={seoPack.poster.src}
                  title={seoPack.poster.title}
                  alt={seoPack.poster.alt}
                  loading="lazy"
                  decoding="async"
                  className="max-h-[540px] w-auto max-w-full rounded-lg object-contain"
                />
              </div>
              <figcaption className="mt-3 text-xs leading-relaxed text-white/75 sm:text-sm">
                <strong className="text-champagne">{seoPack.poster.title}</strong> — {seoPack.poster.description}
              </figcaption>
            </figure>

            {/* Ad-Hoc Google Flow SEO Gallery (4 Images combining Event + Target Crowd + Event Outfit + H1/H2/H3) */}
            <section id="galleria-seo-flow" data-seo-flow-gallery className="mt-10 space-y-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-champagne">
                  {seoPack.eyebrow}
                </p>
                <h2 className="mt-1 font-serif text-2xl font-bold text-white">
                  {seoPack.sectionHeading}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-white/75">
                  {seoPack.sectionSubtitle}
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {seoPack.gallery.map((img) => (
                  <figure
                    key={img.src}
                    className="overflow-hidden rounded-2xl border border-white/15 bg-black/45 transition hover:border-champagne/40"
                  >
                    <div className="relative h-56 w-full bg-black">
                      <img
                        src={img.src}
                        title={img.title}
                        alt={img.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-black/80 px-2.5 py-1 text-[11px] font-semibold text-champagne">
                        {img.shotLabel}
                      </span>
                    </div>
                    <figcaption className="space-y-2 p-4">
                      <div className="flex flex-wrap gap-1.5 text-[11px]">
                        <span className="rounded-md bg-champagne/15 px-2 py-0.5 font-medium text-champagne">
                          {img.targetBadge}
                        </span>
                        <span className="rounded-md bg-white/10 px-2 py-0.5 text-white/85">
                          {img.outfitBadge}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-white/80">
                        <strong className="text-white">{img.title}</strong> — {img.description}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

            {/* Price Tiers Table */}
            <div id="prezzi-formule" className="mt-10">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-serif text-2xl font-bold text-champagne">
                  {ui.pricesHeadingPrefix} — {event.venueName}
                </h2>
                <span className="rounded-full border border-amber-400/70 bg-amber-500/20 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-amber-300" data-selling-fast-badge>
                  {scarcity.sellingFastBadge}
                </span>
              </div>
              <p className="mt-1 text-xs text-white/55">{sourceBasis}</p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {tiers.map((tier) => (
                  <div
                    key={tier.label}
                    className="flex flex-col justify-between rounded-2xl border border-champagne/25 bg-black/40 p-5"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-serif text-lg font-bold text-white">{tier.label}</h3>
                        <span className="shrink-0 rounded-lg bg-champagne/15 px-3 py-1 text-sm font-bold text-champagne">
                          {tier.price}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-white/70">{tier.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Box with WhatsApp, Tel, Email */}
            <div
              id="prenota-concierge"
              className="mt-10 rounded-2xl border border-champagne/40 bg-gradient-to-r from-champagne/15 via-champagne/5 to-transparent p-6 sm:p-8"
            >
              <h2 className="font-serif text-2xl font-bold text-white">
                {ui.bookingHeading}
              </h2>
              <p className="mt-2 text-sm text-white/75">
                {ui.bookingSubtitle}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {event.xceedUrl ? (
                  <a
                    href={event.xceedUrl}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    data-event-cta-kind="admission"
                    className="inline-flex items-center rounded-xl bg-champagne px-6 py-3.5 text-sm font-bold text-black transition hover:bg-white"
                  >
                    {scarcity.xceedPriorityCta}
                  </a>
                ) : (
                  <a
                    href={getConciergeBookingUrl(locale, `${title} (${event.venueName} - 31/12/2026)`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-event-cta-kind="table"
                    className="inline-flex items-center rounded-xl bg-champagne px-6 py-3.5 text-sm font-bold text-black transition hover:bg-white"
                  >
                    WhatsApp {SITE_CONTACT.whatsapp.number}
                  </a>
                )}
                <a
                  href="tel:+393519127047"
                  className="inline-flex items-center rounded-xl border border-champagne/50 bg-black/50 px-5 py-3.5 text-sm font-semibold text-champagne transition hover:bg-champagne hover:text-black"
                >
                  {ui.callNowBtn}
                </a>
                <a
                  href="mailto:concierge@nightlifemilan.com"
                  className="inline-flex items-center rounded-xl border border-white/20 bg-black/40 px-5 py-3.5 text-sm font-semibold text-white/85 transition hover:border-champagne hover:text-champagne"
                >
                  concierge@nightlifemilan.com
                </a>
                <Link
                  href={capodannoPath(locale)}
                  className="inline-flex items-center rounded-xl border border-white/20 px-5 py-3.5 text-sm font-semibold text-white hover:border-champagne hover:text-champagne"
                >
                  {ui.backToAllBtn}
                </Link>
              </div>
            </div>

            {/* Embedded Google Map for Venue */}
            <div id="mappa-locale" className="mt-12">
              <h2 className="font-serif text-2xl font-bold text-champagne">
                {ui.mapHeadingEvent} — {event.venueName}
              </h2>
              <p className="mt-1 text-sm text-white/70">
                {event.venueName} · {event.address}, {event.city} ({event.province}) · {event.hours}
              </p>
              <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
                <iframe
                  title={`${event.venueName} Google Maps`}
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  width="100%"
                  height="340"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block w-full border-0"
                />
              </div>
            </div>

            {/* FAQs */}
            <div id="faq-evento" className="mt-12 space-y-4">
              <h2 className="font-serif text-2xl font-bold text-champagne">
                {ui.faqHeadingPrefix}
              </h2>
              {faqs.map((faq) => (
                <div key={faq.q} className="rounded-xl border border-white/10 bg-black/30 p-5">
                  <h3 className="font-semibold text-white">{faq.q}</h3>
                  <p className="mt-1.5 text-sm text-white/70">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Events */}
        {related.length > 0 && (
          <section id="eventi-correlati" className="mt-14">
            <h2 className="font-serif text-2xl font-bold text-champagne">
              {ui.relatedHeading}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={capodannoEventPath(item.slug, locale)}
                  className="rounded-2xl border border-white/10 bg-[#18140c] p-5 transition hover:border-champagne/40"
                >
                  <p className="text-xs font-semibold text-champagne">
                    {item.city} ({item.province})
                  </p>
                  <h3 className="mt-1 font-serif text-lg font-bold text-white">
                    {getCapodannoLocalizedEventTitle(item, locale)}
                  </h3>
                  <p className="mt-2 text-xs text-white/65">
                    {isIt ? item.priceSummaryIt : item.priceSummaryEn}
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
