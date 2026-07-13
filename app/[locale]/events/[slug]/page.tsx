import { notFound } from 'next/navigation';
import { tr } from '@/lib/i18n/t';
import { hreflangAlternates, localePrefix } from '@/lib/i18n/locales';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getEventBySlug, getVenueById, getPerformerById, mockEvents } from '@/lib/data';
import { weeklyEvents, getWeeklyEventBySlug } from '@/lib/eventsConfig';
import { getLocalizedText, generateEventSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { nextWeekdayISO } from '@/lib/calendarEvents';
import { fetchEventbriteEvents } from '@/lib/eventbriteSync';
import { getAllCalendarEvents, isUpcomingRome } from '@/lib/calendarEvents';
import { getRichContent } from '@/lib/richContentStore';
import { getEventGoldHtml } from '@/lib/eventbriteSync';
import { Event, Venue } from '@/lib/types';
import BookingForm from '@/components/BookingForm';
import FAQAccordion from '@/components/FAQAccordion';
import PricingGrid from '@/components/PricingGrid';
import GoldEventContent from '@/components/GoldEventContent';
import GoldEventHtml from '@/components/GoldEventHtml';
import MoreVenueEvents, { MoreVenueEventItem } from '@/components/MoreVenueEvents';

/** Find a live Eventbrite event by its SEO slug (EN or IT).
 * NESSUN try/catch qui: se la fetch Eventbrite fallisce (dopo i retry
 * interni) l'errore DEVE propagarsi come 500 non cacheato — degradare a
 * undefined produceva notFound(), e Next cacheava quel 404 per l'intera
 * finestra ISR (bug reale: bandierina IT → 404 su pagina esistente). */
async function getEbEventBySlug(slug: string): Promise<Event | undefined> {
  const match = (ev: Event) => ev.localizedContent.slug.en === slug || ev.localizedContent.slug.it === slug;
  const events = await fetchEventbriteEvents();
  const hit = events.find(match);
  if (hit) return hit;
  // Evento passato: NON è nel set current_future, ma la sua pagina deve restare
  // raggiungibile (SEO: link accessibili anche quando l'evento è uscito dalla
  // lista "Eventi passati"). Percorso VELOCE (ended,completed + start_desc, ~400
  // listing più recenti): copre gli eventi passati recenti in pochi secondi,
  // senza scansionare tutta la storia (start_asc completo = ~60s → timeout →
  // pagina mai renderizzata). Gli eventi molto vecchi restano nella sitemap.
  const withPast = await fetchEventbriteEvents(true, 30);
  return withPast.find(match);
}

const FALLBACK_GALLERY = [
  '/images/milan-nightclub-luxury-vip-champagne.webp',
  '/images/milan-nightclub-dancefloor-vip.webp',
  '/images/bottle-service-milan-vip-nightclub.webp',
  '/images/milan-club-crowd-dancefloor-night.webp',
];

const GALLERY_DESCRIPTORS: Record<'en' | 'it', string[]> = {
  en: [
    'VIP tables and lounge area', 'dancefloor and DJ booth', 'bar and champagne service',
    'entrance and crowd atmosphere', 'main room interior', 'private booth seating',
  ],
  it: [
    'area tavoli VIP e lounge', 'pista da ballo e consolle DJ', 'bar e servizio champagne',
    'ingresso e atmosfera del pubblico', 'interno della sala principale', 'area privé con divani',
  ],
};

// FASE F3 (piano fix-i18n-posters-redo-justme): fino a 6 foto reali della
// venue invece di 4 — più copertura visiva sulla pagina evento.
const GALLERY_MAX = 6;

/**
 * Galleria foto reali della venue (non più 4 foto stock identiche su ogni
 * pagina evento) — alt/title unico per immagine, SEO in chiave locale,
 * combina venue + descrittore posizionale + titolo evento specifico.
 */
function buildVenueGalleryImages(venue: Venue, eventTitle: string, locale: string): { src: string; alt: string }[] {
  const isIt = locale === 'it';
  const sources = venue.gallery && venue.gallery.length > 0 ? venue.gallery : FALLBACK_GALLERY;
  const descriptors = GALLERY_DESCRIPTORS[isIt ? 'it' : 'en'];
  const venueName = getLocalizedText(venue.localizedContent.name, locale);

  return sources.slice(0, GALLERY_MAX).map((src, i) => {
    const descriptor = descriptors[i % descriptors.length];
    const alt = isIt
      ? `${venueName} Milano — ${descriptor} durante ${eventTitle}`
      : `${venueName} Milan — ${descriptor} during ${eventTitle}`;
    return { src, alt };
  });
}

// ISR Configuration (1 hour)
// ISR (revalidate): la pagina è cacheata → il fetch pesante dei ~260 listing
// Eventbrite (risoluzione evento + contenuto gold) avviene solo alla rigenerazione,
// NON a ogni visita (force-dynamic rendeva ogni richiesta lentissima/timeout).
// revalidate breve + maxDuration alto per la prima generazione on-demand.
export const revalidate = 600;
// Vercel Pro (2026-07-11): 300s. La prima generazione on-demand di un evento SENZA
// gold nel Blob fa il fallback getEventGoldHtml (fetch ~260 listing org): con 60s
// (Hobby) andava in timeout → gold assente; con 300s completa e poi resta in ISR.
export const maxDuration = 300;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

// Generate Static Params for SEO Crawling
export async function generateStaticParams() {
  const paths: { locale: string; slug: string }[] = [];

  mockEvents.forEach((event) => {
    paths.push({ locale: 'en', slug: event.localizedContent.slug.en });
    paths.push({
      locale: 'it',
      slug: event.localizedContent.slug.it || event.localizedContent.slug.en
    });
  });

  weeklyEvents.forEach((event) => {
    const slug = `${event.clubSlug}-${event.day}-${event.eventSlug}`;
    paths.push({ locale: 'en', slug });
    paths.push({ locale: 'it', slug });
  });

  // Pre-generate pages for live Eventbrite events at build time.
  // New events added after the last build are served on-demand via ISR.
  // Include ANCHE i passati recenti (percorso veloce ended,completed): così le
  // pagine degli eventi appena trascorsi sono già renderizzate/cacheate e non
  // dipendono dal fetch on-demand lento (che andava in timeout → link rotti).
  try {
    const [future, recentPast] = await Promise.all([
      fetchEventbriteEvents(),
      fetchEventbriteEvents(true, 30).catch(() => [] as Awaited<ReturnType<typeof fetchEventbriteEvents>>),
    ]);
    [...future, ...recentPast].forEach((ev) => {
      if (ev.localizedContent.slug.en)
        paths.push({ locale: 'en', slug: ev.localizedContent.slug.en });
      const itSlug = ev.localizedContent.slug.it || ev.localizedContent.slug.en;
      if (itSlug)
        paths.push({ locale: 'it', slug: itSlug });
    });
  } catch {
    // Eventbrite unreachable at build time — new events served on-demand
  }

  return paths;
}

// Generate Dynamic SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  
  const weeklyEvent = getWeeklyEventBySlug(slug);
  if (weeklyEvent) {
    const title = `${weeklyEvent.name} @ ${weeklyEvent.clubName} Milano - ${weeklyEvent.day.charAt(0).toUpperCase() + weeklyEvent.day.slice(1)} 2026 | Nightlife Milan`;
    const description = locale === 'it' ? weeklyEvent.description.it : weeklyEvent.description.en;
    const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
    const canonical = `${baseUrl}${localePrefix(locale)}/events/${slug}`;

    return {
      title,
      description,
      alternates: {
        canonical,
        languages: hreflangAlternates(baseUrl, `/events/${slug}`),
      },
      robots: { index: true, follow: true },
      openGraph: {
        title,
        description,
        url: canonical,
        images: [{ url: weeklyEvent.image, width: 1200, height: 630, alt: title }],
        type: 'website',
        siteName: 'Nightlife Milan',
        locale: locale === 'it' ? 'it_IT' : 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [weeklyEvent.image],
        site: '@nightlifemilan',
      },
    };
  }

  let event = getEventBySlug(slug, locale);
  if (!event) event = await getEbEventBySlug(slug);
  if (!event) return notFound();

  const venue = getVenueById(event.venueId);
  if (!venue) return notFound();

  const title = `${getLocalizedText(event.localizedContent.title, locale)} @ ${getLocalizedText(venue.localizedContent.name, locale)} | Nightlife Milan`;
  const description = getLocalizedText(event.localizedContent.shortDescription, locale);

  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  
  // Generate Canonical and Hreflang URLs
  const enSlug = event.localizedContent.slug.en;
  const itSlug = event.localizedContent.slug.it || enSlug;
  
  const currentSlug = locale === 'it' ? itSlug : enSlug;
  const path = `${localePrefix(locale)}/events/${currentSlug}`;
  const canonical = `${baseUrl}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { ...hreflangAlternates(baseUrl, `/events/${enSlug}`), it: `${baseUrl}/it/events/${itSlug}` },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: `${baseUrl}${event.image || venue.image || ''}`, width: 1200, height: 630, alt: title }],
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: locale === 'it' ? 'it_IT' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}${event.image || venue.image || ''}`],
      site: '@nightlifemilan',
    },
  };
}

export default async function EventPage({ params }: Props) {
  const { locale, slug } = await params;
  
  const weeklyEvent = getWeeklyEventBySlug(slug);
  if (weeklyEvent) {
    const isIt = locale === 'it';
    const title = `${weeklyEvent.name} @ ${weeklyEvent.clubName} Milano - ${weeklyEvent.day.charAt(0).toUpperCase() + weeklyEvent.day.slice(1)} 2026`;
    const description = isIt ? weeklyEvent.description.it : weeklyEvent.description.en;
    const dressCode = isIt ? weeklyEvent.dressCode.it : weeklyEvent.dressCode.en;

    const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
    const weeklyVenue = getVenueById(`v-${weeklyEvent.clubSlug}`);
    const absoluteImage = weeklyEvent.image.startsWith('http')
      ? weeklyEvent.image
      : `${baseUrl}${weeklyEvent.image}`;

    // Prossima occorrenza reale del giorno ricorrente (fuso Europe/Rome, 23:00
    // orario indicativo salvo dato più specifico), mai una data placeholder
    // hardcoded che poteva finire nel passato.
    const startDateISO = nextWeekdayISO(weeklyEvent.dayOfWeek, 23, 0);
    const endDateISO = new Date(new Date(startDateISO).getTime() + 4 * 60 * 60 * 1000).toISOString();

    // Generate JSON-LD
    const jsonLd: any = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: title,
      description: description,
      startDate: startDateISO,
      endDate: endDateISO,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      image: absoluteImage,
      location: {
        '@type': 'Place',
        name: weeklyEvent.clubName,
        address: {
          '@type': 'PostalAddress',
          ...(weeklyVenue?.address?.streetAddress ? { streetAddress: weeklyVenue.address.streetAddress } : {}),
          addressLocality: 'Milan',
          addressCountry: 'IT'
        }
      },
      // Prezzo reale dalle stringhe pricing ("From €15" -> 15, "Free Entry..." ->
      // 0): mai un fallback fabbricato — se non si riesce a leggere un numero
      // reale né un "free" esplicito, niente offers piuttosto che un prezzo finto.
      ...(() => {
        const parsePriceEUR = (s?: string): number | null => {
          if (!s) return null;
          if (/free/i.test(s)) return 0;
          const digits = s.replace(/[^0-9]/g, '');
          return digits ? parseInt(digits, 10) : null;
        };
        const price = parsePriceEUR(weeklyEvent.pricing.club) ?? parsePriceEUR(weeklyEvent.pricing.aperitif);
        if (price === null) return {};
        return {
          offers: {
            '@type': 'Offer',
            url: weeklyEvent.xceedLink || `https://wa.me/393519127047?text=Booking%20for%20${weeklyEvent.name}`,
            price,
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
          },
        };
      })(),
      organizer: {
        '@type': 'Organization',
        name: 'Nightlife Milan',
        url: baseUrl
      }
    };

    return (
      <main className="min-h-screen bg-[#131009] text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <section className="relative h-screen flex items-center justify-center">
          <Image
            src={weeklyEvent.image}
            alt={title}
            fill
            quality={85}
            sizes="100vw"
            className="object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            <div className="flex justify-center gap-3 mb-6">
              <span className="bg-champagne text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {weeklyEvent.clubName}
              </span>
              <span className="text-white/70 text-sm font-medium border border-white/20 px-3 py-1 rounded-full">
                {weeklyEvent.genres.join(', ')}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight">{title}</h1>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">{weeklyEvent.target}</p>
            {weeklyEvent.xceedLink && (
              <a
                href={weeklyEvent.xceedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-champagne text-black px-8 py-4 rounded-full font-bold hover:bg-white transition-colors text-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                {tr(locale, 'Buy on Xceed', 'Acquista su Xceed')}
              </a>
            )}
            <a
              href={`https://wa.me/393519127047?text=Hi,%20I%20would%20like%20to%20book%20for%20${weeklyEvent.name}%20at%20${weeklyEvent.clubName}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block ${weeklyEvent.xceedLink ? 'ml-4 border border-white/40 text-white hover:border-champagne hover:text-champagne' : 'bg-champagne text-black hover:bg-white'} px-8 py-4 rounded-full font-bold transition-colors text-lg`}
            >
              {tr(locale, 'Book via WhatsApp', 'Prenota via WhatsApp')}
            </a>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-serif font-bold text-champagne mb-6">
              {tr(locale, 'The Experience', 'L\'Esperienza')}
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mb-8">{description}</p>
            
            <div className="bg-white/[0.03] p-8 rounded-lg border border-white/10 mb-12">
              <h3 className="text-xl font-bold text-white mb-4">{tr(locale, 'Dress Code', 'Dress Code')}</h3>
              <p className="text-white/50">{dressCode}</p>
            </div>

            <h2 className="text-3xl font-serif font-bold text-champagne mb-6 mt-12">
              {tr(locale, 'Pricing & VIP Tables', 'Prezzi & Tavoli VIP')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {weeklyEvent.pricing.aperitif && (
                <div className="bg-white/[0.03] p-6 rounded-xl border border-white/10">
                  <h4 className="text-lg font-bold text-white mb-2">{tr(locale, 'Aperitif', 'Aperitivo')}</h4>
                  <p className="text-2xl font-serif text-champagne">{weeklyEvent.pricing.aperitif}</p>
                </div>
              )}
              <div className="bg-white/[0.03] p-6 rounded-xl border border-white/10">
                <h4 className="text-lg font-bold text-white mb-2">{tr(locale, 'Club Entry', 'Ingresso Club')}</h4>
                <p className="text-2xl font-serif text-champagne">{weeklyEvent.pricing.club}</p>
              </div>
              <div className="bg-white/[0.03] p-6 rounded-xl border border-white/10 md:col-span-2">
                <h4 className="text-lg font-bold text-white mb-2">{tr(locale, 'VIP Tables', 'Tavoli VIP')}</h4>
                <p className="text-2xl font-serif text-champagne">{weeklyEvent.pricing.tables}</p>
                <p className="text-sm text-white/50 mt-2">{tr(locale, 'Prices vary based on location and number of guests.', 'I prezzi variano in base alla posizione e al numero di persone.')}</p>
              </div>
            </div>
            
            <h2 className="text-3xl font-serif font-bold text-champagne mb-6 mt-12">
              {tr(locale, 'Frequently Asked Questions', 'Domande Frequenti')}
            </h2>
            <div className="space-y-4">
              {weeklyEvent.faqs.map((faq, index) => (
                <div key={index} className="bg-white/[0.03] rounded-xl border border-white/10 p-6">
                  <h4 className="text-lg font-semibold text-white mb-2">{isIt ? faq.q.it : faq.q.en}</h4>
                  <p className="text-white/50">{isIt ? faq.a.it : faq.a.en}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="bg-white/[0.03] rounded-xl p-8 border border-white/10 h-fit sticky top-24">
            <h3 className="text-xl font-serif font-bold text-champagne mb-6 pb-4 border-b border-white/10">
              {tr(locale, 'Event Details', 'Dettagli Evento')}
            </h3>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-white/50 mb-1">{tr(locale, 'Day', 'Giorno')}</p>
                <p className="text-white font-medium capitalize">{isIt ? weeklyEvent.day : weeklyEvent.day}</p>
              </div>
              <div>
                <p className="text-sm text-white/50 mb-1">{tr(locale, 'Target', 'Target')}</p>
                <p className="text-white font-medium">{weeklyEvent.target}</p>
              </div>
              <div>
                <p className="text-sm text-white/50 mb-1">{tr(locale, 'Music Genres', 'Generi Musicali')}</p>
                <p className="text-white font-medium">{weeklyEvent.genres.join(', ')}</p>
              </div>
              <div className="pt-6 border-t border-white/10 space-y-3">
                {weeklyEvent.xceedLink && (
                  <a
                    href={weeklyEvent.xceedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-champagne text-black px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                    {tr(locale, 'Buy on Xceed', 'Acquista su Xceed')}
                  </a>
                )}
                <a
                  href={`https://wa.me/393519127047?text=Hi,%20I%20would%20like%20to%20book%20for%20${weeklyEvent.name}%20at%20${weeklyEvent.clubName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#20bd5a] transition-colors"
                >
                  {tr(locale, 'Book on WhatsApp', 'Prenota su WhatsApp')}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>
    );
  }

  let event = getEventBySlug(slug, locale);
  if (!event) event = await getEbEventBySlug(slug);
  if (!event) return notFound();

  const venue = getVenueById(event.venueId);
  if (!venue) return notFound();

  const performer = event.performerId ? getPerformerById(event.performerId) : null;

  // FASE X2 (piano Xceed): contenuto gold-standard (sezioni/programma/25 FAQ/
  // listino reale) letto dal blob se questo evento è passato dalla pipeline
  // Xceed — assente per tutti gli altri eventi, rendering base invariato.
  // Prova il gold nel Blob sotto lo slug EN e, se assente, sotto lo slug IT: per
  // gli eventi pubblicati come due listing (EN/IT con slug diversi) il gold può
  // essere stato scritto sotto lo slug IT, mentre la card FUSA usa lo slug-en
  // canonico → senza questo secondo tentativo il gold sparirebbe dopo la dedup.
  const slugEnKey = event.localizedContent.slug.en;
  const slugItKey = event.localizedContent.slug.it;
  const blobRich =
    (await getRichContent(slugEnKey)) ||
    (slugItKey && slugItKey !== slugEnKey ? await getRichContent(slugItKey) : null);

  // CORPO GOLD LOCALIZZATO (2026-07-12). Il Blob (GoldEventContent) contiene le
  // sezioni/FAQ SOLO in en/it → su /es, /fr, ecc. il corpo restava in inglese.
  // Per le lingue diverse da en/it si legge quindi il gold TRADOTTO direttamente
  // dal listing Eventbrite nella lingua scelta (getEventGoldHtml → GoldEventHtml).
  // Se quella lingua non ha un gold tradotto, si ripiega sul Blob en/it così il
  // corpo non resta vuoto. Per en/it: Blob se presente, altrimenti gold dal listing
  // (copre gli eventi pubblicati senza enrichment). getEventGoldHtml è cacheato
  // (fetchOrgCached 5min) + ISR, e con Vercel Pro (maxDuration 300s) non va in timeout.
  const isEnIt = locale === 'en' || locale === 'it';
  const localizedGold = isEnIt ? null : await getEventGoldHtml(slug, locale);
  const richContent = localizedGold ? null : blobRich;
  const goldHtml = localizedGold || (richContent ? null : await getEventGoldHtml(slug, locale));

  // Internal linking: "More events at {venue}" — riusa la sorgente dati
  // unificata già usata da homepage/calendar (statici + Eventbrite/Xceed
  // reali). getAllCalendarEvents() degrada già da sola se Eventbrite non
  // risponde (vedi lib/calendarEvents.ts), quindi nessun try/catch qui.
  const allVenueCalendarItems = await getAllCalendarEvents();
  const moreVenueEvents: MoreVenueEventItem[] = allVenueCalendarItems
    .filter(
      ({ event: e }) =>
        e.venueId === event.venueId && e.id !== event.id && isUpcomingRome(e.dateISO)
    )
    .sort((a, b) => new Date(a.event.dateISO).getTime() - new Date(b.event.dateISO).getTime())
    .slice(0, 4)
    .map(({ event: e }) => {
      const eSlug = locale === 'it' ? (e.localizedContent.slug.it || e.localizedContent.slug.en) : e.localizedContent.slug.en;
      const eDateStr = new Intl.DateTimeFormat(locale === 'it' ? 'it-IT' : 'en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Rome',
      }).format(new Date(e.dateISO));
      return {
        href: `${localePrefix(locale)}/events/${eSlug}`,
        title: getLocalizedText(e.localizedContent.title, locale),
        dateStr: eDateStr,
      };
    });

  // Generate JSON-LD Schemas
  const eventSchema = generateEventSchema(event, venue, performer || null, locale);
  const breadcrumbSchema = generateBreadcrumbSchema(event, venue, locale);
  const faqSchema = richContent?.rewritten.faqLong?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: richContent.rewritten.faqLong.map((f) => ({
          '@type': 'Question',
          name: (locale === 'it' && f.questionIt) || f.question,
          acceptedAnswer: { '@type': 'Answer', text: (locale === 'it' && f.answerIt) || f.answer },
        })),
      }
    : null;

  const title = getLocalizedText(event.localizedContent.title, locale);
  const venueName = getLocalizedText(venue.localizedContent.name, locale);
  const description = getLocalizedText(event.localizedContent.shortDescription, locale);
  // Internal linking: venue name in "About the venue" links to its /clubs page.
  const venueSlug = getLocalizedText(venue.slugs, locale);
  const venueHref = `${localePrefix(locale)}/clubs/${venueSlug}`;

  // Format Date
  const dateObj = new Date(event.dateISO);
  const formattedDate = new Intl.DateTimeFormat(locale === 'it' ? 'it-IT' : 'en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Rome'
  }).format(dateObj);

  // Format Price — null quando non c'è un prezzo reale confermato (vedi
  // lib/eventbriteSync.ts: il ticket Eventbrite non è mai il prezzo vero)
  const formattedPrice = event.pricing.entry === null
    ? null
    : new Intl.NumberFormat(locale === 'it' ? 'it-IT' : 'en-US', {
        style: 'currency',
        currency: event.pricing.currency,
        maximumFractionDigits: 0,
      }).format(event.pricing.entry);

  // Frase prezzo per il trafiletto AI — omette del tutto la parte "Ingresso"
  // quando il prezzo non è confermato, invece di affermare "Gratuito" a caso.
  const entryText = event.pricing.entry === null
    ? null
    : (event.pricing.entry === 0 ? (tr(locale, 'Free', 'Gratuito')) : formattedPrice);
  const tableText = event.pricing.tableMinSpend
    ? (locale === 'it' ? `tavoli VIP da €${event.pricing.tableMinSpend}` : `VIP tables from €${event.pricing.tableMinSpend}`)
    : null;
  const pricePhrase = [
    entryText ? `${tr(locale, 'Entry', 'Ingresso')}: ${entryText}` : null,
    tableText,
  ].filter(Boolean).join(', ');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <main className="flex-1 flex flex-col w-full">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] min-h-[400px]">
          <Image
            src={event.image || venue.image || '/images/milan-nightclub-luxury-vip-champagne.webp'}
            alt={title}
            fill
            quality={85}
            priority={true} // Above the fold
            sizes="100vw"
            className="object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131009] via-[#131009]/60 to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {venueName}
              </span>
              <span className="text-white/70 text-sm font-medium">
                {event.genre.map(g => g.replace('_', ' ')).join(', ')}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              {title}
            </h1>
            <time dateTime={event.dateISO} className="text-xl text-white/70 font-light flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {formattedDate}
            </time>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto w-full px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 max-w-none">

            {/* AI Trafiletto */}
            <div className="not-prose mb-8 p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04] text-left">
              <p className="font-sans text-champagne/60 text-[9px] tracking-[0.3em] uppercase mb-3">Quick Answer</p>
              <p className="font-sans text-white/70 text-sm leading-relaxed">
                {locale === 'it'
                  ? `${title} @ ${venueName} a Milano. Data: ${formattedDate}.${pricePhrase ? ` ${pricePhrase}.` : ''} Prenota via WhatsApp +39 351 912 7047.`
                  : `${title} @ ${venueName} in Milan. Date: ${formattedDate}.${pricePhrase ? ` ${pricePhrase}.` : ''} Book via WhatsApp +39 351 912 7047.`}
              </p>
            </div>

            {/* Tags */}
            <div className="not-prose flex flex-wrap gap-2 mb-8">
              {[
                venueName,
                ...event.genre.map(g => g.replace(/_/g, ' ')),
                tr(locale, 'Milan Events', 'Serate Milano'),
                'VIP Tables',
                tr(locale, 'Book Now', 'Prenotazione'),
              ].map(tag => (
                <span key={tag} className="px-3 py-1.5 rounded-full border border-white/10 text-white/40 text-xs font-sans tracking-wider">
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="text-2xl font-serif font-bold text-champagne mb-4">
              {tr(locale, 'About the event', 'Informazioni sull\'evento')}
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              {description}
            </p>

            {performer && (
              <div className="mt-8 p-6 bg-white/[0.03] rounded-lg border border-white/10">
                <h3 className="text-xl font-serif font-bold text-champagne mb-2">Lineup: {performer.name}</h3>
                <p className="text-white/50">
                  {getLocalizedText(performer.localizedContent.bio, locale)}
                </p>
              </div>
            )}

            {/* H2: Venue Info */}
            <h2 className="text-2xl font-serif font-bold text-champagne mt-12 mb-4">
              {locale === 'it' ? (
                <>
                  <Link href={venueHref} className="hover:text-white transition-colors underline decoration-champagne/40 underline-offset-4">
                    {venueName}
                  </Link>
                  {': La Venue'}
                </>
              ) : (
                <>
                  {'About '}
                  <Link href={venueHref} className="hover:text-white transition-colors underline decoration-champagne/40 underline-offset-4">
                    {venueName}
                  </Link>
                </>
              )}
            </h2>
            <p className="text-white/70 leading-relaxed">
              {locale === 'it'
                ? `${venueName} è uno dei locali più esclusivi di Milano, situato in ${venue.address.streetAddress}. Prenota il tuo tavolo VIP o inserisciti in guestlist per garantirti la migliore esperienza.`
                : `${venueName} is one of Milan's most exclusive venues, located at ${venue.address.streetAddress}. Book your VIP table or get on the guestlist to ensure the best experience.`}
            </p>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 not-prose">
              {buildVenueGalleryImages(venue, title, locale).map((img, i) => (
                <div key={i} className="relative h-32 rounded-xl overflow-hidden border border-white/8">
                  <Image src={img.src} alt={img.alt} title={img.alt} fill quality={85} className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
                </div>
              ))}
            </div>

            {/* H2: Practical Info */}
            <h2 className="text-2xl font-serif font-bold text-champagne mt-12 mb-4">
              {tr(locale, 'Practical Information', 'Informazioni Pratiche')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 not-prose">
              <div className="p-4 rounded-xl border border-white/8 bg-white/[0.02]">
                <h3 className="font-sans text-champagne text-xs font-bold tracking-widest uppercase mb-2">
                  {tr(locale, 'Dress Code', 'Dress Code')}
                </h3>
                <p className="font-sans text-white/50 text-sm">
                  {tr(locale, 'Smart elegant. No sneakers or shorts.', 'Smart elegant. Niente sneakers o shorts.')}
                </p>
              </div>
              <div className="p-4 rounded-xl border border-white/8 bg-white/[0.02]">
                <h3 className="font-sans text-champagne text-xs font-bold tracking-widest uppercase mb-2">
                  {tr(locale, 'Minimum Age', 'Età Minima')}
                </h3>
                <p className="font-sans text-white/50 text-sm">18+ {tr(locale, '(ID required)', '(documento richiesto)')}</p>
              </div>
              <div className="p-4 rounded-xl border border-white/8 bg-white/[0.02]">
                <h3 className="font-sans text-champagne text-xs font-bold tracking-widest uppercase mb-2">
                  {tr(locale, 'Getting There', 'Come Arrivare')}
                </h3>
                <p className="font-sans text-white/50 text-sm">{venue.address.streetAddress}, {tr(locale, 'Milan', 'Milano')}</p>
              </div>
            </div>

            {richContent && <GoldEventContent data={richContent} locale={locale} />}
            {!richContent && goldHtml && <GoldEventHtml html={goldHtml} />}

            <MoreVenueEvents items={moreVenueEvents} locale={locale} venueName={venueName} />
          </div>

          {/* Sidebar / Ticket Info */}
          <aside id="booking" className="bg-white/[0.03] rounded-xl p-8 border border-white/10 h-fit sticky top-24">
            <h3 className="text-xl font-serif font-bold text-champagne mb-6 pb-4 border-b border-white/10">
              {tr(locale, 'Entry Details', 'Dettagli Ingresso')}
            </h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-white/50">{tr(locale, 'Entry', 'Ingresso')}</span>
                <span className="text-white font-bold text-xl">
                  {event.pricing.entry === null
                    ? (tr(locale, 'On request', 'Su richiesta'))
                    : event.pricing.entry === 0
                      ? (tr(locale, 'Free', 'Gratis'))
                      : formattedPrice}
                </span>
              </div>
              {event.pricing.tableMinSpend && (
                <div className="flex justify-between items-center">
                  <span className="text-white/50">{tr(locale, 'Tables from', 'Tavoli da')}</span>
                  <span className="text-white font-medium">
                    {new Intl.NumberFormat(locale === 'it' ? 'it-IT' : 'en-US', { style: 'currency', currency: event.pricing.currency, maximumFractionDigits: 0 }).format(event.pricing.tableMinSpend)}
                  </span>
                </div>
              )}
            </div>

            {event.xceedUrl && (
              <a
                href={event.xceedUrl}
                target="_blank"
                rel={event.xceedUrl.includes('eventbrite') ? 'noopener noreferrer' : 'noopener noreferrer sponsored'}
                className="flex items-center justify-center gap-2 w-full bg-champagne text-black px-6 py-4 font-sans font-bold text-sm tracking-[0.15em] uppercase hover:bg-white transition-colors duration-300 mb-4"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                {event.xceedUrl.includes('eventbrite')
                  ? (tr(locale, 'Buy Ticket', 'Compra il Biglietto'))
                  : (tr(locale, 'Buy on Xceed', 'Acquista su Xceed'))}
              </a>
            )}

            <BookingForm
              lang={locale}
              prefilledDate={event.dateISO.split('T')[0]}
              venueName={venueName}
              eventName={title}
            />

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-sm text-white/50 mb-1">{tr(locale, 'Location', 'Location')}</p>
              <p className="text-white font-medium">{venueName}</p>
              <p className="text-sm text-white/40">{venue.address.streetAddress}, {venue.address.addressLocality}</p>
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}
