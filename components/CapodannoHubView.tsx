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
  const shortLabel = getCapodannoCategoryShortLabel35(
    pageDef.slug,
    locale,
    pageDef.shortLabelIt,
    pageDef.shortLabelEn,
  );

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
          {
            '@type': 'ListItem',
            position: 2,
            name: ui.eventsBreadcrumb,
            item: canonicalPageUrl(SITE_URL, locale, '/events'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: nav.menuLabel,
            item: `${SITE_URL}${capodannoPath(locale)}`,
          },
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
            organizer: {
              '@type': 'Organization',
              name: 'Nightlife Milan',
              url: SITE_URL,
            },
            performer:
              ev.slug === 'capodanno-bischeri-milano'
                ? { '@type': 'Person', name: 'DJ Gigi Zeus' }
                : ev.slug === 'capodanno-gate-milano'
                  ? { '@type': 'PerformingGroup', name: 'PERREO XL DJs' }
                  : { '@type': 'PerformingGroup', name: `${ev.venueName} Resident DJs` },
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
            offers:
              ev.priceFromEur > 0 || ev.category === 'piazza'
                ? {
                    '@type': 'Offer',
                    url: `${SITE_URL}${capodannoEventPath(ev.slug, locale)}`,
                    price: String(ev.priceFromEur),
                    priceCurrency: 'EUR',
                    availability:
                      ev.soldOutForNye || ev.closedForNye
                        ? 'https://schema.org/SoldOut'
                        : 'https://schema.org/InStock',
                    validFrom: '2026-10-01T00:00:00+02:00',
                  }
                : ev.soldOutForNye || ev.closedForNye
                  ? {
                      '@type': 'Offer',
                      url: `${SITE_URL}${capodannoEventPath(ev.slug, locale)}`,
                      priceCurrency: 'EUR',
                      availability: 'https://schema.org/SoldOut',
                      validFrom: '2026-10-01T00:00:00+02:00',
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
    <main
      data-layout-alt="alternativa-02-capitoli-colore-netto"
      className="min-h-[100dvh] bg-[#050505] pb-20 pt-3 text-[#F6F1E7] sm:pt-4"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* CAPITOLO 01 — NOTTE #050505: Testata Editoriale Senza Cassettoni, Filtri & Locandine 4:5 Piene */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="border-b border-[#F6F1E7]/14 pb-8">
          <nav className="mb-3 text-xs font-semibold text-[#C2B9AA] sm:text-[13px]" aria-label="Breadcrumb">
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
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#EAE3D5]">
              {getCapodannoCategoryBadge35(pageDef.slug, locale, pageDef.badgeIt, pageDef.badgeEn)} ·{' '}
              {events.length} {ui.verifiedEventsLabel}
            </p>
            <span
              className="bg-[#25D366] px-3 py-0.5 font-mono text-xs font-extrabold uppercase text-[#050505]"
              data-selling-fast-badge
            >
              {scarcity.almostSoldOutBadge}
            </span>
          </div>

          <h1
            data-event-title={title}
            className="mt-3 font-display text-3xl font-bold uppercase leading-[1.05] text-[#F6F1E7] sm:text-6xl"
          >
            {title}
          </h1>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-[#C2B9AA] sm:text-lg">
            {subtitle}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href="#catalogo-eventi"
              className="inline-flex min-h-[46px] items-center gap-2 bg-[#EAE3D5] px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#050505] transition hover:bg-[#F6F1E7] sm:text-sm"
            >
              {scarcity.openEventCardCta}
            </a>
            <a
              href={getConciergeBookingUrl(locale, title, `${SITE_URL}${canonicalPath}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[46px] items-center gap-2 bg-[#25D366] px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#050505] transition hover:bg-[#2EE472] sm:text-sm"
            >
              WhatsApp {SITE_CONTACT.whatsapp.number}
            </a>
            <a
              href="mailto:concierge@nightlifemilan.com"
              className="inline-flex min-h-[46px] items-center gap-2 border border-[#EAE3D5]/32 bg-[#141311] px-4 py-2.5 text-xs font-semibold text-[#F6F1E7] transition hover:border-[#EAE3D5] sm:text-sm"
            >
              {ui.emailBtn}: concierge@nightlifemilan.com
            </a>
          </div>

          <div className="mt-6 divide-y divide-[#F6F1E7]/12 border-t border-[#F6F1E7]/14 pt-2 lg:grid lg:grid-cols-2 lg:gap-8 lg:divide-y-0 lg:pt-5">
            <div
              role="alert"
              data-urgency-alert
              className="py-3 text-[#F6F1E7] lg:py-0"
            >
              <p className="font-mono text-xs font-bold uppercase text-[#EAE3D5]">
                {scarcity.urgencyAlertTitle}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#C2B9AA] sm:text-sm">
                {scarcity.urgencyAlertBody}
              </p>
            </div>
            <div className="py-3 text-[#F6F1E7] lg:border-l lg:border-[#F6F1E7]/14 lg:pl-8 lg:py-0">
              <p className="font-mono text-xs font-bold uppercase text-[#EAE3D5]">
                {ui.quickGuideLabel} · {shortLabel}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#C2B9AA] sm:text-sm">
                {quickAnswer}
              </p>
            </div>
          </div>

          {/* Compact Horizontal TOC */}
          <nav aria-label={ui.tocTitle} className="mt-5 border-t border-[#F6F1E7]/14 pt-4">
            <ul className="flex gap-2 overflow-x-auto pb-1.5 text-xs font-bold sm:flex-wrap sm:overflow-visible sm:pb-0">
              <li className="shrink-0">
                <a
                  href="#catalogo-eventi"
                  className="inline-flex min-h-[36px] items-center bg-[#F6F1E7] px-3 py-1.5 text-[#050505]"
                >
                  {ui.tocCatalog}
                </a>
              </li>
              <li className="shrink-0">
                <a
                  href="#categorie-capodanno"
                  className="inline-flex min-h-[36px] items-center border border-[#F6F1E7]/22 bg-[#141311] px-3 py-1.5 text-[#F6F1E7]"
                >
                  {ui.tocCategories}
                </a>
              </li>
              <li className="shrink-0">
                <a
                  href="#filtro-eventi"
                  className="inline-flex min-h-[36px] items-center border border-[#F6F1E7]/22 bg-[#141311] px-3 py-1.5 text-[#F6F1E7]"
                >
                  {ui.tocFilter}
                </a>
              </li>
              <li className="shrink-0">
                <a
                  href="#tabella-prezzi"
                  className="inline-flex min-h-[36px] items-center border border-[#F6F1E7]/22 bg-[#141311] px-3 py-1.5 text-[#F6F1E7]"
                >
                  {ui.tocTable}
                </a>
              </li>
              <li className="shrink-0">
                <a
                  href="#termini-pagamento"
                  className="inline-flex min-h-[36px] items-center border border-[#F6F1E7]/22 bg-[#141311] px-3 py-1.5 text-[#F6F1E7]"
                >
                  {paymentTerms.tocLabel}
                </a>
              </li>
              <li className="shrink-0">
                <a
                  href="#faq-capodanno"
                  className="inline-flex min-h-[36px] items-center border border-[#F6F1E7]/22 bg-[#141311] px-3 py-1.5 text-[#F6F1E7]"
                >
                  {ui.tocFaq}
                </a>
              </li>
              <li className="shrink-0">
                <a
                  href="#mappa-milano"
                  className="inline-flex min-h-[36px] items-center border border-[#F6F1E7]/22 bg-[#141311] px-3 py-1.5 text-[#F6F1E7]"
                >
                  {ui.tocMap}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Dedicated Single Pass E-Commerce Embed or Callout */}
        {mode === 'capodanno-single-milano' && (
          <div className="mt-8">
            <SinglePassStorefront locale={locale} embedded />
          </div>
        )}
        {mode === 'capodanno-2027' && (
          <div className="mt-6">
            <div className="flex flex-col gap-4 border border-[#EAE3D5]/30 bg-[#141311] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#EAE3D5]">
                  {spCopy.heroEyebrow}
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold uppercase text-[#F6F1E7]">
                  {spCopy.embeddedBannerTitle}
                </h2>
                <p className="mt-1 max-w-[54ch] text-sm leading-relaxed text-[#C2B9AA]">
                  {spCopy.embeddedBannerBody}
                </p>
              </div>
              <Link
                href={`${prefix}/single-pass`}
                locale={locale}
                className="nlm-pressable inline-flex min-h-[46px] shrink-0 items-center justify-center bg-[#25D366] px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-[#050505] transition hover:bg-[#2EE472]"
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

      {/* CAPITOLO 02 — CARTA CALDA #F6F1E7: Tabella Confronto Prezzi & Protocollo Pagamenti (senza cassettoni) */}
      <div className="border-y border-[#050505] bg-[#F6F1E7] py-12 text-[#050505]">
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <section id="tabella-prezzi">
            <div className="border-b-2 border-[#050505] pb-4">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#4A453E]">
                CONFRONTO UFFICIALE TARIFFE
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold uppercase text-[#050505] sm:text-3xl">
                {ui.tableHeadingPrefix} · {shortLabel} ({events.length})
              </h2>
            </div>
            <table className="w-full text-left text-xs text-[#050505] sm:text-sm">
              <thead className="hidden border-b border-[#050505] font-mono text-xs font-bold uppercase tracking-[0.04em] text-[#3D3830] md:table-header-group">
                <tr>
                  <th className="py-3.5 pr-4">{ui.colVenue}</th>
                  <th className="px-4 py-3.5">{ui.colCity}</th>
                  <th className="px-4 py-3.5">{ui.colHours}</th>
                  <th className="py-3.5 pl-4 text-right">{ui.colPrices}</th>
                </tr>
              </thead>
              <tbody className="block divide-y divide-[#050505]/15 md:table-row-group">
                {events.map((ev) => (
                  <tr key={ev.slug} className="block py-4 md:table-row md:py-0">
                    <td className="block font-bold text-[#050505] md:table-cell md:py-3.5 md:pr-4">
                      <Link href={capodannoEventPath(ev.slug, locale)} className="underline underline-offset-2">
                        {ev.venueName}
                      </Link>
                    </td>
                    <td className="mt-1 block text-[#3D3830] md:mt-0 md:table-cell md:px-4 md:py-3.5">
                      {ev.city} ({ev.province})
                    </td>
                    <td className="mt-0.5 block font-mono text-xs text-[#3D3830] md:mt-0 md:table-cell md:px-4 md:py-3.5">
                      {formatCapodannoHours35(ev.hours, locale)}
                    </td>
                    <td className="mt-1.5 block font-mono font-bold text-[#050505] md:mt-0 md:table-cell md:py-3.5 md:pl-4 md:text-right">
                      {getCapodannoLocalizedEventContent(ev, locale).priceSummary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section
            id="termini-pagamento"
            data-payment-terms-35
            className="border-t-2 border-[#050505] pt-8 text-[#050505]"
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
            <ol className="mt-5 grid grid-cols-1 divide-y divide-[#050505]/15 border-y border-[#050505]/15 md:grid-cols-2 md:gap-x-8 md:divide-y-0 lg:grid-cols-3">
              {paymentTerms.steps.map((step, idx) => (
                <li key={step} className="py-4 text-[#050505] md:border-b md:border-[#050505]/15">
                  <span className="inline-flex h-6 w-6 items-center justify-center bg-[#050505] font-mono text-xs font-bold tabular-nums text-[#F6F1E7]">
                    {idx + 1}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-[#050505]">{step}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 border-l-2 border-[#050505] pl-4 text-xs font-medium leading-relaxed text-[#24201B] sm:text-[13px]">
              {paymentTerms.note}
            </p>
          </section>
        </div>
      </div>

      {/* CAPITOLO 03 — CHAMPAGNE #EAE3D5: FAQ Hub (senza cassettoni) */}
      <section id="faq-capodanno" className="border-b border-[#050505] bg-[#EAE3D5] py-12 text-[#050505]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold uppercase text-[#050505] sm:text-3xl">
            {ui.faqHeadingPrefix} · {shortLabel}
          </h2>
          <div className="mt-5 divide-y divide-[#050505]/15 border-y border-[#050505]/15">
            {faqs.map((f, idx) => (
              <details key={f.q} open={idx < 2} className="group py-4">
                <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 marker:hidden">
                  <h3 className="font-display text-lg font-bold text-[#050505]">{f.q}</h3>
                  <span
                    className="font-mono text-xl font-bold text-[#050505] transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="pt-2 text-sm leading-relaxed text-[#3D3830]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CAPITOLO 04 — NOTTE #050505: Mappa Città & Authority Hub */}
      <section id="mappa-milano" className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden border border-[#F6F1E7]/14 bg-[#0B0A09] p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold text-[#F6F1E7] sm:text-3xl">
            {ui.mapHeadingHub}
          </h2>
          <p className="mt-2 text-sm text-[#C2B9AA]">{ui.mapSubtitleHub}</p>
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

      <SeoAuthorityHub lang={locale as LocaleCode} />
    </main>
  );
}
