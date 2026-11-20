import SeoAuthorityHub from '@/components/SeoAuthorityHub';

import EventVenueMap from '@/components/EventVenueMap';
import { getEventVenueCopy } from '@/lib/i18n/eventVenueCopy';
import type { LocaleCode } from '@/lib/i18n/locales';
import { capodannoEventPath, capodannoNavigation, capodannoPath } from '@/lib/capodanno/routes';
import { getPaymentTerms35 } from '@/lib/capodanno/paymentTerms35';
import {
  formatCapodannoHours35,
  getCapodannoCategoryBadge35,
  getCapodannoCategoryQuickAnswer35,
  getCapodannoCategoryShortLabel35,
  getCapodannoHubFaqs35,
  getCapodannoLocalizedCategorySubtitle,
  getCapodannoLocalizedCategoryTitle,
  getCapodannoLocalizedEventContent,
  getCapodannoLocalizedEventTitle,
  getCapodannoUiCopy,
} from '@/lib/capodanno/i18n';
import Link from '@/components/LocalizedLink';
import { SITE_CONTACT } from '@/config/contact';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import { localePrefix, canonicalPageUrl } from '@/lib/i18n/locales';
import { getScarcityAndChatCopy } from '@/lib/i18n/scarcityAndChatCopy';
import CapodannoInteractiveFilter from '@/components/CapodannoInteractiveFilter';
import SinglePassStorefront from '@/components/single-pass/SinglePassStorefront';
import { getSinglePassCopy } from '@/lib/single-pass/i18n35';
import {
  CAPODANNO_CATEGORY_PAGES,
  getCapodannoCategoryPageDef,
  getCapodannoEventsForMode,
} from '@/lib/capodannoEvents';

type Props = {
  locale: string;
  mode: string;
  canonicalPath: string;
};

const SITE_URL = 'https://nightlifemilan.com';

export default function CapodannoHubView({ locale, mode, canonicalPath }: Props) {
  const isIt = locale === 'it';
  const prefix = localePrefix(locale);
  const pageDef = getCapodannoCategoryPageDef(mode);
  const events = getCapodannoEventsForMode(mode);
  const nav = capodannoNavigation(locale);
  const ui = getCapodannoUiCopy(locale);
  const scarcity = getScarcityAndChatCopy(locale);
  const venueMapCopy = getEventVenueCopy(locale as LocaleCode);
  const paymentTerms = getPaymentTerms35(locale);
  const spCopy = getSinglePassCopy(locale);

  const title = getCapodannoLocalizedCategoryTitle(pageDef, locale, events.length);
  const subtitle = getCapodannoLocalizedCategorySubtitle(pageDef, locale, events.length);
  const quickAnswer = getCapodannoCategoryQuickAnswer35(pageDef, locale, events.length);
  const shortLabel = getCapodannoCategoryShortLabel35(pageDef.slug, locale, pageDef.shortLabelIt, pageDef.shortLabelEn);

  const faqs = getCapodannoHubFaqs35({
    pageDef,
    locale,
    eventsCount: events.length,
    subtitle,
    quickAnswer,
    paymentSteps: paymentTerms.steps,
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}${prefix || '/'}` },
          { '@type': 'ListItem', position: 2, name: ui.eventsBreadcrumb, item: canonicalPageUrl(SITE_URL, locale, '/events') },
          { '@type': 'ListItem', position: 3, name: nav.menuLabel, item: `${SITE_URL}${capodannoPath(locale)}` },
          { '@type': 'ListItem', position: 4, name: title, item: `${SITE_URL}${canonicalPath}` },
        ],
      },
      {
        '@type': 'ItemList',
        name: title,
        description: subtitle,
        numberOfItems: events.length,
        itemListElement: events.map((ev, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          item: {
            '@type': 'Event',
            name: getCapodannoLocalizedEventTitle(ev, locale),
            description: getCapodannoLocalizedEventContent(ev, locale).description,
            startDate: ev.startISO,
            endDate: ev.endISO,
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
            url: `${SITE_URL}${capodannoEventPath(ev.slug, locale)}`,
            image: [`${SITE_URL}${ev.image}`],
            location: {
              '@type': 'Place',
              name: ev.venueName,
              address: {
                '@type': 'PostalAddress',
                streetAddress: ev.address,
                addressLocality: ev.city,
                addressRegion: 'Lombardia',
                addressCountry: 'IT',
              },
            },
            offers: ev.priceFromEur > 0 || ev.category === 'piazza'
              ? {
                  '@type': 'Offer',
                  url: `${SITE_URL}${capodannoEventPath(ev.slug, locale)}`,
                  price: String(ev.priceFromEur),
                  priceCurrency: 'EUR',
                  availability: ev.soldOutForNye || ev.closedForNye
                    ? 'https://schema.org/SoldOut'
                    : 'https://schema.org/InStock',
                  validFrom: '2026-10-01T00:00:00+02:00',
                }
              : ev.soldOutForNye || ev.closedForNye
                ? {
                    '@type': 'Offer',
                    url: `${SITE_URL}${capodannoEventPath(ev.slug, locale)}`,
                    availability: 'https://schema.org/SoldOut',
                  }
                : {
                    '@type': 'Offer',
                    url: `${SITE_URL}${capodannoEventPath(ev.slug, locale)}`,
                    priceCurrency: 'EUR',
                    availability: 'https://schema.org/PreOrder',
                    validFrom: '2026-10-01T00:00:00+02:00',
                  },
          },
        })),
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

  return (
    <main className="min-h-[100dvh] bg-[#050505] pb-24 pt-24 text-[#F6F1E7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden border border-[#F6F1E7]/18 bg-[#0B0A09] p-8 sm:p-12 lg:p-14">
          <nav className="mb-6 text-[13px] font-semibold text-[#C2B9AA]" aria-label="Breadcrumb">
            <Link href={prefix || '/'} className="hover:text-[#F6F1E7]">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`${prefix}/events`} className="hover:text-[#F6F1E7]">{ui.eventsBreadcrumb}</Link>
            <span className="mx-2">/</span>
            <Link href={capodannoPath(locale)} className="hover:text-[#F6F1E7]">{nav.menuLabel} 2027</Link>
            {pageDef.slug !== 'capodanno-2027' && (
              <>
                <span className="mx-2">/</span>
                <span className="text-[#F6F1E7]">{shortLabel}</span>
              </>
            )}
          </nav>

          <div className="flex flex-wrap items-center gap-2.5">
            <p className="text-[13px] font-bold uppercase text-[#EAE3D5]">
              {getCapodannoCategoryBadge35(pageDef.slug, locale, pageDef.badgeIt, pageDef.badgeEn)} · {events.length} {ui.verifiedEventsLabel}
            </p>
            <span className="bg-[#25D366] px-3 py-1 text-[13px] font-bold uppercase text-[#050505]" data-selling-fast-badge>
              {scarcity.almostSoldOutBadge}
            </span>
          </div>
          <h1 data-event-title={title} className="mt-3 font-display text-4xl font-bold uppercase leading-none text-[#F6F1E7] sm:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-[#C2B9AA] sm:text-lg">
            {subtitle}
          </p>

          <div role="alert" data-urgency-alert className="mt-6 border border-[#F6F1E7]/14 bg-[#0B0A09] p-5 text-[#F6F1E7]">
            <p className="text-[13px] font-bold uppercase text-[#EAE3D5] sm:text-sm">
              {scarcity.urgencyAlertTitle}
            </p>
            <p className="mt-1.5 max-w-[48ch] text-base leading-relaxed text-[#C2B9AA]">
              {scarcity.urgencyAlertBody}
            </p>
          </div>

          <div className="mt-6 border border-[#F6F1E7]/18 bg-[#050505] p-5">
            <p className="text-[13px] font-bold text-[#EAE3D5]">
              {ui.quickGuideLabel} · {shortLabel}
            </p>
            <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-[#C2B9AA]">{quickAnswer}</p>
          </div>

          {/* Clickable Contacts: Catalogo Schede Evento, WhatsApp, Tel, Email */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={getConciergeBookingUrl(locale, title, `${SITE_URL}${canonicalPath}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] px-5 py-3 text-sm font-bold text-[#050505] transition hover:bg-[#2EE472]"
            >
              WhatsApp {SITE_CONTACT.whatsapp.number}
            </a>
            <a
              href="#catalogo-eventi"
              className="inline-flex items-center gap-2 bg-[#EAE3D5] px-5 py-3 text-sm font-bold text-[#050505] transition hover:bg-[#EAE3D5]"
            >
              {scarcity.openEventCardCta}
            </a>
            <a
              href="tel:+393519127047"
              className="inline-flex items-center gap-2 border border-[#EAE3D5]/40 bg-[#050505] px-4 py-3 text-sm font-semibold text-[#050505] transition hover:bg-[#EAE3D5] hover:text-[#050505]"
            >
              {ui.callNowBtn}
            </a>
            <a
              href="mailto:concierge@nightlifemilan.com"
              className="inline-flex items-center gap-2 border border-[#EAE3D5]/24 bg-[#050505] px-4 py-3 text-sm font-semibold text-[#C2B9AA] transition hover:border-[#EAE3D5] hover:text-[#F6F1E7]"
            >
              {ui.emailBtn}: concierge@nightlifemilan.com
            </a>
            <span className="w-full text-[13px] text-[#C2B9AA] sm:w-auto">
              {ui.freeAdviceNote}
            </span>
          </div>

          {/* Clickable Table of Contents (TOC) with #id anchors */}
          <nav
            aria-label={ui.tocTitle}
            className="mt-7 border border-[#F6F1E7]/14 bg-[#0B0A09] p-5 text-[#F6F1E7]"
          >
            <p className="text-[13px] font-bold text-[#C2B9AA]">
              {ui.tocTitle}
            </p>
            <ul className="mt-3 grid gap-2 text-[13px] font-medium sm:grid-cols-2 lg:grid-cols-3 sm:text-sm">
              <li>
                <a href="#categorie-capodanno" className="text-[#F6F1E7] hover:underline">
                  {ui.tocCategories}
                </a>
              </li>
              <li>
                <a href="#filtro-eventi" className="text-[#F6F1E7] hover:underline">
                  {ui.tocFilter}
                </a>
              </li>
              <li>
                <a href="#catalogo-eventi" className="text-[#F6F1E7] hover:underline">
                  {ui.tocCatalog}
                </a>
              </li>
              <li>
                <a href="#tabella-prezzi" className="text-[#F6F1E7] hover:underline">
                  {ui.tocTable}
                </a>
              </li>
              <li>
                <a href="#termini-pagamento" className="text-[#F6F1E7] hover:underline">
                  {paymentTerms.tocLabel}
                </a>
              </li>
              <li>
                <a href="#mappa-milano" className="text-[#F6F1E7] hover:underline">
                  {ui.tocMap}
                </a>
              </li>
              <li>
                <a href="#faq-capodanno" className="text-[#F6F1E7] hover:underline">
                  {ui.tocFaq}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Dedicated Single Pass E-Commerce Embed or Callout */}
        {mode === 'capodanno-single-milano' && (
          <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
            <SinglePassStorefront locale={locale} embedded />
          </div>
        )}
        {mode === 'capodanno-2027' && (
          <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 border border-[#F6F1E7]/18 bg-[#0B0A09] p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold uppercase text-[#F6F1E7]">
                  {spCopy.embeddedBannerTitle}
                </h2>
                <p className="mt-1 text-[13px] font-bold text-[#EAE3D5]">
                  {spCopy.heroEyebrow}
                </p>
                <p className="mt-1 max-w-[48ch] text-sm leading-relaxed text-[#C2B9AA]">
                  {spCopy.embeddedBannerBody}
                </p>
              </div>
              <Link
                href={`${prefix}/single-pass`}
                locale={locale}
                className="nlm-pressable inline-flex min-h-[44px] shrink-0 items-center justify-center bg-[#25D366] px-5 py-3 text-[13px] font-bold text-[#050505] transition hover:bg-[#2EE472]"
              >
                {spCopy.embeddedBannerCta}
              </Link>
            </div>
          </div>
        )}

        {/* Interactive Filter + 16 Category Pages + Event Cards */}
        <CapodannoInteractiveFilter
          events={events}
          categoryPages={CAPODANNO_CATEGORY_PAGES}
          activeSlug={pageDef.slug}
          isIt={isIt}
          locale={locale}
          prefix={prefix}
        />
      </section>

      {/* Complete Price Comparison Table (#F6F1E7 Capitolo Avorio Caldo) */}
      <section id="tabella-prezzi" className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden border border-[#F6F1E7]/14 bg-[#0B0A09] text-[#F6F1E7]">
          <div className="border-b border-[#F6F1E7]/14 p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold text-[#F6F1E7] sm:text-3xl">
              {ui.tableHeadingPrefix} · {shortLabel} ({events.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px] sm:text-sm">
              <thead className="border-b border-[#F6F1E7]/14 bg-[#F6F1E7] text-[13px] font-bold uppercase tracking-[0.04em] text-[#050505]">
                <tr>
                  <th className="px-4 py-3.5">{ui.colVenue}</th>
                  <th className="px-4 py-3.5">{ui.colCity}</th>
                  <th className="px-4 py-3.5">{ui.colHours}</th>
                  <th className="px-4 py-3.5">{ui.colPrices}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F6F1E7]/12">
                {events.map((ev) => (
                  <tr key={ev.slug} className="hover:bg-[#141311]">
                    <td className="px-4 py-3 font-semibold text-[#F6F1E7]">
                      <Link
                        href={capodannoEventPath(ev.slug, locale)}
                        className="hover:underline"
                      >
                        {ev.venueName}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-[#C2B9AA]">
                      {ev.city} ({ev.province})
                    </td>
                    <td className="px-4 py-3 text-[#C2B9AA]">{formatCapodannoHours35(ev.hours, locale)}</td>
                    <td className="px-4 py-3 font-bold text-[#F6F1E7]">
                      {getCapodannoLocalizedEventContent(ev, locale).priceSummary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Official 6-Step Prepayment & Booking Protocol */}
      <section id="termini-pagamento" data-payment-terms-35 className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border border-[#F6F1E7]/18 bg-[#0B0A09] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-bold uppercase text-[#F6F1E7] sm:text-3xl">
              {paymentTerms.heading}
            </h2>
            <span className="border border-white/30 bg-[#050505] px-3 py-1 text-[13px] font-bold text-[#EAE3D5]">
              {paymentTerms.methodsBadge}
            </span>
          </div>
          <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-[#C2B9AA]">
            {paymentTerms.subtitle}
          </p>
          <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {paymentTerms.steps.map((step, idx) => (
              <li
                key={step}
                className="border border-[#F6F1E7]/14 bg-[#050505] p-4"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center bg-[#F6F1E7] text-[13px] font-bold tabular-nums text-[#050505]">
                  {idx + 1}
                </span>
                <p className="mt-2.5 text-sm leading-relaxed text-[#F6F1E7]">
                  {step}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-4 bg-[#050505] px-4 py-3 text-[13px] leading-relaxed text-[#EAE3D5]">
            {paymentTerms.note}
          </p>
        </div>
      </section>

      {/* Interactive Google Maps Section */}
      <section id="mappa-milano" className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden border border-[#F6F1E7]/14 bg-[#0B0A09] p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold text-[#F6F1E7] sm:text-3xl">
            {ui.mapHeadingHub}
          </h2>
          <p className="mt-2 text-sm text-[#C2B9AA]">
            {ui.mapSubtitleHub}
          </p>
          <div className="mt-5">
            <EventVenueMap
              id={`capodanno-city-map-${mode}`}
              purpose="city"
              mapUrl="https://www.google.com/maps?q=Milano+Piazza+del+Duomo+Corso+Como+Parco+Sempione+Navigli&output=embed"
              labels={{
                loadMap: venueMapCopy.loadMap,
                mapTitle: ui.mapHeadingHub,
                privacyLoadNotice: venueMapCopy.privacyLoadNotice,
              }}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section (#F6F1E7 Capitolo Avorio Caldo) */}
      <section id="faq-capodanno" className="mx-auto mt-16 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B0A09] text-[#F6F1E7] border border-[#F6F1E7]/14 p-6 sm:p-10">
          <h2 className="font-display text-2xl font-bold text-[#F6F1E7] sm:text-3xl">
            {ui.faqHeadingPrefix} · {shortLabel}
          </h2>
          <div className="mt-6 space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="border border-[#F6F1E7]/14 bg-[#141311] p-6">
                <h3 className="font-display text-lg font-bold text-[#F6F1E7]">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#C2B9AA]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SeoAuthorityHub lang={locale as LocaleCode} />
    </main>
  );
}
