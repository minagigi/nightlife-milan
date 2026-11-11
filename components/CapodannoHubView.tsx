import SeoAuthorityHub from '@/components/SeoAuthorityHub';

import EventVenueMap from '@/components/EventVenueMap';
import { getEventVenueCopy } from '@/lib/i18n/eventVenueCopy';import type { LocaleCode } from '@/lib/i18n/locales';
import { capodannoEventPath, capodannoNavigation, capodannoPath } from '@/lib/capodanno/routes';
import {
  getCapodannoLocalizedCategorySubtitle,
  getCapodannoLocalizedCategoryTitle,
  getCapodannoLocalizedEventTitle,
  getCapodannoUiCopy,
} from '@/lib/capodanno/i18n';
import Link from '@/components/LocalizedLink';
import { SITE_CONTACT } from '@/config/contact';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import { localePrefix } from '@/lib/i18n/locales';
import { getScarcityAndChatCopy } from '@/lib/i18n/scarcityAndChatCopy';
import CapodannoInteractiveFilter from '@/components/CapodannoInteractiveFilter';
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

  const title = getCapodannoLocalizedCategoryTitle(pageDef, locale, events.length);
  const subtitle = getCapodannoLocalizedCategorySubtitle(pageDef, locale, events.length);
  const quickAnswer = isIt ? pageDef.quickAnswerIt : pageDef.quickAnswerEn;
  const shortLabel = isIt ? pageDef.shortLabelIt : locale === 'en' ? pageDef.shortLabelEn : nav.h1;

  const faqs = isIt
    ? [
        {
          q: `Quanti eventi sono inclusi in ${pageDef.shortLabelIt} per Capodanno 2027?`,
          a: `Questa pagina raccoglie ${events.length} eventi verificati di Capodanno 2027 (31 dicembre 2026 – 1 gennaio 2027) con prezzi ufficiali o storico certificato dell’edizione precedente. Puoi filtrare in tempo reale per Tipologia (Rooftop, Discoteche, Locali con Cenone, Hotel 5★, Speakeasy, Terme/Baita), Target (Coppie, Single, Famiglie, Over 30/40), Musica, Zona e Budget.`,
        },
        {
          q: 'Quali sono le differenze tra Ingresso Dopocena, Royal Buffet, Cenone Servito e Tavolo VIP?',
          a: 'Il Gran Cenone Servito (dalle 20:00/20:30, 95€–450€) include tavolo riservato per tutta la cena, menu multipiatto con vini, brindisi di mezzanotte e ingresso al party. Il Royal Buffet / Apericena (dalle 20:30, 50€–120€) è più dinamico e conviviale, ideale per single e gruppi. L’Ingresso Dopocena (dalle 23:00/23:30, 20€–100€) consente di entrare per il countdown e la festa. Il Tavolo VIP Privé (da 200€ a 5.000€) garantisce ingresso salta-fila e credito in bottiglie di Champagne o superalcolici.',
        },
        {
          q: 'Come prenotare prevendite Early Bird, cenoni o tavoli VIP senza commissioni extra?',
          a: `Contatta il Concierge ufficiale Nightlife Milan su WhatsApp (${SITE_CONTACT.whatsapp.number}), telefono o email (concierge@nightlifemilan.com) indicando numero di persone, target (coppia, gruppo, famiglia) e formula preferita per ricevere disponibilità aggiornata e link/accredito ufficiale.`,
        },
      ]
    : locale === 'en'
      ? [
          {
            q: `How many New Year’s Eve 2027 events are included in ${pageDef.shortLabelEn}?`,
            a: `This category guide features ${events.length} verified New Year’s Eve 2027 (December 31, 2026 – January 1, 2027) events with official or prior-edition benchmark pricing. Use the interactive filter bar to narrow down by Venue Type, Target Crowd (Couples, Singles, Families, 30+ Adults), Music Genre, District, and Budget.`,
          },
          {
            q: 'What is the difference between Served Gala Dinner, Royal Buffet, After-Dinner Entry, and VIP Tables?',
            a: 'Served Gala Dinners (from 20:00, €95–€450) include a reserved dining table, multi-course menu with wines, midnight toast, and club party access. Royal Buffets (from 20:30, €50–€120) offer a standing/lounge social dinner + party. After-Dinner Tickets (from 23:00, €20–€100) grant entry for the midnight countdown and clubbing. VIP Privé Tables (€200–€5,000) include skip-the-line admission and 100% bottle credit.',
          },
          {
            q: 'How do I book early-bird tickets, gala dinners, or VIP tables?',
            a: `Message our official Nightlife Milan WhatsApp Concierge (${SITE_CONTACT.whatsapp.number}), call us, or email concierge@nightlifemilan.com with your group size and preferred package for instant availability and official reservation links.`,
          },
        ]
      : [
          {
            q: `${nav.h1} · ${events.length} Events (31/12/2026 – 01/01/2027)?`,
            a: `${subtitle} ${quickAnswer}`,
          },
          {
            q: `${nav.menuLabel} 2027: Gala Dinner (95€–450€), Royal Buffet (50€–120€), Club Entry (20€–100€) & VIP Tables?`,
            a: `Voya Rooftop (#1 Rooftop, 300€), JustMe Milano Torre Branca, Armani Privé, Pineta Milano, Aria Club, 55 Milano, Terrazza Duomo 21, QC Terme & Piazza Duomo. WhatsApp Concierge: ${SITE_CONTACT.whatsapp.number}.`,
          },
          {
            q: `WhatsApp Concierge (${SITE_CONTACT.whatsapp.number}) & Email (concierge@nightlifemilan.com)?`,
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
          { '@type': 'ListItem', position: 2, name: ui.eventsBreadcrumb, item: `${SITE_URL}${prefix}/events` },
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
            description: isIt ? ev.descriptionIt : ev.descriptionEn,
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
            offers: {
              '@type': 'Offer',
              url: `${SITE_URL}${capodannoEventPath(ev.slug, locale)}`,
              price: String(ev.priceFromEur),
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
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
    <main className="min-h-screen bg-[#131009] pb-24 pt-24 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-champagne/30 bg-gradient-to-br from-[#211a0d] via-[#151109] to-black p-8 sm:p-12 lg:p-14">
          <nav className="mb-6 text-xs uppercase tracking-widest text-white/50" aria-label="Breadcrumb">
            <Link href={prefix || '/'} className="hover:text-champagne">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`${prefix}/events`} className="hover:text-champagne">{ui.eventsBreadcrumb}</Link>
            <span className="mx-2">/</span>
            <Link href={capodannoPath(locale)} className="hover:text-champagne">{nav.menuLabel} 2027</Link>
            {pageDef.slug !== 'capodanno-2027' && (
              <>
                <span className="mx-2">/</span>
                <span className="text-champagne">{shortLabel}</span>
              </>
            )}
          </nav>

          <div className="flex flex-wrap items-center gap-2.5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-champagne">
              {(isIt ? pageDef.badgeIt : pageDef.badgeEn)} · {events.length} {ui.verifiedEventsLabel}
            </p>
            <span className="rounded-full border border-amber-400/70 bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300" data-selling-fast-badge>
              {scarcity.almostSoldOutBadge}
            </span>
          </div>
          <h1 data-event-title={title} className="mt-3 font-serif text-3xl font-bold leading-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-white/75 sm:text-lg">
            {subtitle}
          </p>

          <div role="alert" data-urgency-alert className="mt-6 rounded-2xl border-2 border-amber-400/70 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent p-5 shadow-lg">
            <p className="text-xs font-extrabold uppercase tracking-wider text-amber-300 sm:text-sm">
              {scarcity.urgencyAlertTitle}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-white/90">
              {scarcity.urgencyAlertBody}
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-champagne/25 bg-black/40 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-champagne">
              {ui.quickGuideLabel} · {shortLabel}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/80">{quickAnswer}</p>
          </div>

          {/* Clickable Contacts: Catalogo Schede Evento, Tel, Email */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#catalogo-eventi"
              className="inline-flex items-center gap-2 rounded-xl bg-champagne px-5 py-3 text-sm font-bold text-black transition hover:bg-white"
            >
              {scarcity.openEventCardCta}
            </a>
            <a
              href="tel:+393519127047"
              className="inline-flex items-center gap-2 rounded-xl border border-champagne/50 bg-black/50 px-4 py-3 text-sm font-semibold text-champagne transition hover:bg-champagne hover:text-black"
            >
              {ui.callNowBtn}
            </a>
            <a
              href="mailto:concierge@nightlifemilan.com"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-sm font-semibold text-white/85 transition hover:border-champagne hover:text-champagne"
            >
              {ui.emailBtn}: concierge@nightlifemilan.com
            </a>
            <span className="w-full text-xs text-white/60 sm:w-auto">
              {ui.freeAdviceNote}
            </span>
          </div>

          {/* Clickable Table of Contents (TOC) with #id anchors */}
          <nav
            aria-label={ui.tocTitle}
            className="mt-7 rounded-2xl border border-white/12 bg-black/50 p-4 sm:p-5"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-champagne">
              {ui.tocTitle}
            </p>
            <ul className="mt-3 grid gap-2 text-xs sm:grid-cols-2 lg:grid-cols-3 sm:text-sm">
              <li>
                <a href="#categorie-capodanno" className="text-white/85 hover:text-champagne hover:underline">
                  {ui.tocCategories}
                </a>
              </li>
              <li>
                <a href="#filtro-eventi" className="text-white/85 hover:text-champagne hover:underline">
                  {ui.tocFilter}
                </a>
              </li>
              <li>
                <a href="#catalogo-eventi" className="text-white/85 hover:text-champagne hover:underline">
                  {ui.tocCatalog}
                </a>
              </li>
              <li>
                <a href="#tabella-prezzi" className="text-white/85 hover:text-champagne hover:underline">
                  {ui.tocTable}
                </a>
              </li>
              <li>
                <a href="#mappa-milano" className="text-white/85 hover:text-champagne hover:underline">
                  {ui.tocMap}
                </a>
              </li>
              <li>
                <a href="#faq-capodanno" className="text-white/85 hover:text-champagne hover:underline">
                  {ui.tocFaq}
                </a>
              </li>
            </ul>
          </nav>
        </div>

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

      {/* Complete Price Comparison Table */}
      <section id="tabella-prezzi" className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#18140c]">
          <div className="border-b border-white/10 p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-bold text-champagne sm:text-3xl">
              {ui.tableHeadingPrefix} · {shortLabel} ({events.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-white/10 bg-black/40 text-[11px] uppercase tracking-wider text-champagne">
                <tr>
                  <th className="px-4 py-3.5">{ui.colVenue}</th>
                  <th className="px-4 py-3.5">{ui.colCity}</th>
                  <th className="px-4 py-3.5">{ui.colHours}</th>
                  <th className="px-4 py-3.5">{ui.colPrices}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {events.map((ev) => (
                  <tr key={ev.slug} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 font-semibold text-white">
                      <Link
                        href={capodannoEventPath(ev.slug, locale)}
                        className="hover:text-champagne hover:underline"
                      >
                        {ev.venueName}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-white/70">
                      {ev.city} ({ev.province})
                    </td>
                    <td className="px-4 py-3 text-white/70">{ev.hours}</td>
                    <td className="px-4 py-3 font-medium text-champagne">
                      {isIt ? ev.priceSummaryIt : ev.priceSummaryEn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Interactive Google Maps Section */}
      <section id="mappa-milano" className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#18140c] p-6 sm:p-8">
          <h2 className="font-serif text-2xl font-bold text-champagne sm:text-3xl">
            {ui.mapHeadingHub}
          </h2>
          <p className="mt-2 text-sm text-white/70">
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

      {/* FAQ Section */}
      <section id="faq-capodanno" className="mx-auto mt-16 max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl font-bold text-champagne sm:text-3xl">
          {ui.faqHeadingPrefix} · {shortLabel}
        </h2>
        <div className="mt-6 space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-2xl border border-white/10 bg-[#18140c] p-6">
              <h3 className="font-serif text-lg font-bold text-white">{f.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
      <SeoAuthorityHub lang={locale as LocaleCode} />
    </main>
  );
}
