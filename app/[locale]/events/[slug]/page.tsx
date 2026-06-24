import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import { getEventBySlug, getVenueById, getPerformerById, mockEvents } from '@/lib/data';
import { weeklyEvents, getWeeklyEventBySlug } from '@/lib/eventsConfig';
import { getLocalizedText, generateEventSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { fetchEventbriteEvents } from '@/lib/eventbriteSync';
import { Event } from '@/lib/types';
import BookingForm from '@/components/BookingForm';
import FAQAccordion from '@/components/FAQAccordion';
import PricingGrid from '@/components/PricingGrid';

/** Find a live Eventbrite event by its SEO slug (EN or IT). */
async function getEbEventBySlug(slug: string): Promise<Event | undefined> {
  try {
    const events = await fetchEventbriteEvents();
    return events.find(
      (ev) => ev.localizedContent.slug.en === slug || ev.localizedContent.slug.it === slug
    );
  } catch {
    return undefined;
  }
}

// ISR Configuration (1 hour)
export const revalidate = 3600;

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
  try {
    const ebEvents = await fetchEventbriteEvents();
    ebEvents.forEach((ev) => {
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
    const canonical = `${baseUrl}${locale === 'it' ? '/it' : ''}/events/${slug}`;

    return {
      title,
      description,
      alternates: {
        canonical,
        languages: {
          'en': `${baseUrl}/events/${slug}`,
          'it': `${baseUrl}/it/events/${slug}`,
          'x-default': `${baseUrl}/events/${slug}`,
        },
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
  const path = locale === 'it' ? `/it/events/${currentSlug}` : `/events/${currentSlug}`;
  const canonical = `${baseUrl}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        'en': `${baseUrl}/events/${enSlug}`,
        'it': `${baseUrl}/it/events/${itSlug}`,
        'x-default': `${baseUrl}/events/${enSlug}`,
      },
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
    
    // Generate JSON-LD
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: title,
      description: description,
      startDate: `2026-03-16T23:00:00`, // Placeholder date, ideally calculated based on dayOfWeek
      location: {
        '@type': 'Place',
        name: weeklyEvent.clubName,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Milan',
          addressCountry: 'IT'
        }
      },
      offers: {
        '@type': 'Offer',
        url: weeklyEvent.xceedLink || `https://wa.me/393519127047?text=Booking%20for%20${weeklyEvent.name}`,
        price: weeklyEvent.pricing.club.replace(/[^0-9]/g, '') || '15',
        priceCurrency: 'EUR'
      },
      organizer: {
        '@type': 'Organization',
        name: 'Nightlife Milan',
        url: 'https://nightlifemilan.com'
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
                {isIt ? 'Acquista su Xceed' : 'Buy on Xceed'}
              </a>
            )}
            <a
              href={`https://wa.me/393519127047?text=Hi,%20I%20would%20like%20to%20book%20for%20${weeklyEvent.name}%20at%20${weeklyEvent.clubName}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block ${weeklyEvent.xceedLink ? 'ml-4 border border-white/40 text-white hover:border-champagne hover:text-champagne' : 'bg-champagne text-black hover:bg-white'} px-8 py-4 rounded-full font-bold transition-colors text-lg`}
            >
              {isIt ? 'Prenota via WhatsApp' : 'Book via WhatsApp'}
            </a>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-serif font-bold text-champagne mb-6">
              {isIt ? 'L\'Esperienza' : 'The Experience'}
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mb-8">{description}</p>
            
            <div className="bg-white/[0.03] p-8 rounded-lg border border-white/10 mb-12">
              <h3 className="text-xl font-bold text-white mb-4">{isIt ? 'Dress Code' : 'Dress Code'}</h3>
              <p className="text-white/50">{dressCode}</p>
            </div>

            <h2 className="text-3xl font-serif font-bold text-champagne mb-6 mt-12">
              {isIt ? 'Prezzi & Tavoli VIP' : 'Pricing & VIP Tables'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {weeklyEvent.pricing.aperitif && (
                <div className="bg-white/[0.03] p-6 rounded-xl border border-white/10">
                  <h4 className="text-lg font-bold text-white mb-2">{isIt ? 'Aperitivo' : 'Aperitif'}</h4>
                  <p className="text-2xl font-serif text-champagne">{weeklyEvent.pricing.aperitif}</p>
                </div>
              )}
              <div className="bg-white/[0.03] p-6 rounded-xl border border-white/10">
                <h4 className="text-lg font-bold text-white mb-2">{isIt ? 'Ingresso Club' : 'Club Entry'}</h4>
                <p className="text-2xl font-serif text-champagne">{weeklyEvent.pricing.club}</p>
              </div>
              <div className="bg-white/[0.03] p-6 rounded-xl border border-white/10 md:col-span-2">
                <h4 className="text-lg font-bold text-white mb-2">{isIt ? 'Tavoli VIP' : 'VIP Tables'}</h4>
                <p className="text-2xl font-serif text-champagne">{weeklyEvent.pricing.tables}</p>
                <p className="text-sm text-white/50 mt-2">{isIt ? 'I prezzi variano in base alla posizione e al numero di persone.' : 'Prices vary based on location and number of guests.'}</p>
              </div>
            </div>
            
            <h2 className="text-3xl font-serif font-bold text-champagne mb-6 mt-12">
              {isIt ? 'Domande Frequenti' : 'Frequently Asked Questions'}
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
              {isIt ? 'Dettagli Evento' : 'Event Details'}
            </h3>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-white/50 mb-1">{isIt ? 'Giorno' : 'Day'}</p>
                <p className="text-white font-medium capitalize">{isIt ? weeklyEvent.day : weeklyEvent.day}</p>
              </div>
              <div>
                <p className="text-sm text-white/50 mb-1">{isIt ? 'Target' : 'Target'}</p>
                <p className="text-white font-medium">{weeklyEvent.target}</p>
              </div>
              <div>
                <p className="text-sm text-white/50 mb-1">{isIt ? 'Generi Musicali' : 'Music Genres'}</p>
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
                    {isIt ? 'Acquista su Xceed' : 'Buy on Xceed'}
                  </a>
                )}
                <a
                  href={`https://wa.me/393519127047?text=Hi,%20I%20would%20like%20to%20book%20for%20${weeklyEvent.name}%20at%20${weeklyEvent.clubName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#20bd5a] transition-colors"
                >
                  {isIt ? 'Prenota su WhatsApp' : 'Book on WhatsApp'}
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

  // Generate JSON-LD Schemas
  const eventSchema = generateEventSchema(event, venue, performer || null, locale);
  const breadcrumbSchema = generateBreadcrumbSchema(event, venue, locale);

  const title = getLocalizedText(event.localizedContent.title, locale);
  const venueName = getLocalizedText(venue.localizedContent.name, locale);
  const description = getLocalizedText(event.localizedContent.shortDescription, locale);

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

  // Format Price
  const formattedPrice = new Intl.NumberFormat(locale === 'it' ? 'it-IT' : 'en-US', {
    style: 'currency',
    currency: event.pricing.currency,
    maximumFractionDigits: 0,
  }).format(event.pricing.entry);

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
      
      <main className="flex-1 flex flex-col w-full">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] min-h-[400px]">
          <Image
            src={event.image || venue.image || '/images/milan-nightclub-luxury-vip-champagne.webp'}
            alt={title}
            fill
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
                  ? `${title} @ ${venueName} a Milano. Data: ${formattedDate}. Ingresso: ${event.pricing.entry === 0 ? 'Gratuito' : formattedPrice}${event.pricing.tableMinSpend ? `, tavoli VIP da €${event.pricing.tableMinSpend}` : ''}. Prenota via WhatsApp +39 351 912 7047.`
                  : `${title} @ ${venueName} in Milan. Date: ${formattedDate}. Entry: ${event.pricing.entry === 0 ? 'Free' : formattedPrice}${event.pricing.tableMinSpend ? `, VIP tables from €${event.pricing.tableMinSpend}` : ''}. Book via WhatsApp +39 351 912 7047.`}
              </p>
            </div>

            {/* Tags */}
            <div className="not-prose flex flex-wrap gap-2 mb-8">
              {[
                venueName,
                ...event.genre.map(g => g.replace(/_/g, ' ')),
                locale === 'it' ? 'Serate Milano' : 'Milan Events',
                'VIP Tables',
                locale === 'it' ? 'Prenotazione' : 'Book Now',
              ].map(tag => (
                <span key={tag} className="px-3 py-1.5 rounded-full border border-white/10 text-white/40 text-xs font-sans tracking-wider">
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="text-2xl font-serif font-bold text-champagne mb-4">
              {locale === 'it' ? 'Informazioni sull\'evento' : 'About the event'}
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
              {locale === 'it' ? `${venueName}: La Venue` : `About ${venueName}`}
            </h2>
            <p className="text-white/70 leading-relaxed">
              {locale === 'it'
                ? `${venueName} è uno dei locali più esclusivi di Milano, situato in ${venue.address.streetAddress}. Prenota il tuo tavolo VIP o inserisciti in guestlist per garantirti la migliore esperienza.`
                : `${venueName} is one of Milan's most exclusive venues, located at ${venue.address.streetAddress}. Book your VIP table or get on the guestlist to ensure the best experience.`}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 not-prose">
              {[
                { src: '/images/milan-nightclub-luxury-vip-champagne.webp', alt: `${venueName} Milan luxury nightclub VIP atmosphere` },
                { src: '/images/milan-nightclub-dancefloor-vip.webp', alt: `${venueName} Milan dancefloor club night 2026` },
                { src: '/images/bottle-service-milan-vip-nightclub.webp', alt: `${venueName} bottle service VIP table Milan` },
                { src: '/images/milan-club-crowd-dancefloor-night.webp', alt: `${venueName} Milan club crowd night atmosphere` },
              ].map((img, i) => (
                <div key={i} className="relative h-32 rounded-xl overflow-hidden border border-white/8">
                  <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                </div>
              ))}
            </div>

            {/* H2: Practical Info */}
            <h2 className="text-2xl font-serif font-bold text-champagne mt-12 mb-4">
              {locale === 'it' ? 'Informazioni Pratiche' : 'Practical Information'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 not-prose">
              <div className="p-4 rounded-xl border border-white/8 bg-white/[0.02]">
                <h3 className="font-sans text-champagne text-xs font-bold tracking-widest uppercase mb-2">
                  {locale === 'it' ? 'Dress Code' : 'Dress Code'}
                </h3>
                <p className="font-sans text-white/50 text-sm">
                  {locale === 'it' ? 'Smart elegant. Niente sneakers o shorts.' : 'Smart elegant. No sneakers or shorts.'}
                </p>
              </div>
              <div className="p-4 rounded-xl border border-white/8 bg-white/[0.02]">
                <h3 className="font-sans text-champagne text-xs font-bold tracking-widest uppercase mb-2">
                  {locale === 'it' ? 'Età Minima' : 'Minimum Age'}
                </h3>
                <p className="font-sans text-white/50 text-sm">18+ {locale === 'it' ? '(documento richiesto)' : '(ID required)'}</p>
              </div>
              <div className="p-4 rounded-xl border border-white/8 bg-white/[0.02]">
                <h3 className="font-sans text-champagne text-xs font-bold tracking-widest uppercase mb-2">
                  {locale === 'it' ? 'Come Arrivare' : 'Getting There'}
                </h3>
                <p className="font-sans text-white/50 text-sm">{venue.address.streetAddress}, {locale === 'it' ? 'Milano' : 'Milan'}</p>
              </div>
            </div>
          </div>

          {/* Sidebar / Ticket Info */}
          <aside id="booking" className="bg-white/[0.03] rounded-xl p-8 border border-white/10 h-fit sticky top-24">
            <h3 className="text-xl font-serif font-bold text-champagne mb-6 pb-4 border-b border-white/10">
              {locale === 'it' ? 'Dettagli Ingresso' : 'Entry Details'}
            </h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-white/50">{locale === 'it' ? 'Ingresso' : 'Entry'}</span>
                <span className="text-white font-bold text-xl">
                  {event.pricing.entry === 0 ? (locale === 'it' ? 'Gratis' : 'Free') : formattedPrice}
                </span>
              </div>
              {event.pricing.tableMinSpend && (
                <div className="flex justify-between items-center">
                  <span className="text-white/50">{locale === 'it' ? 'Tavoli da' : 'Tables from'}</span>
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
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-champagne text-black px-6 py-4 font-sans font-bold text-sm tracking-[0.15em] uppercase hover:bg-white transition-colors duration-300 mb-4"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                {event.xceedUrl.includes('eventbrite')
                  ? (locale === 'it' ? 'Compra il Biglietto' : 'Buy Ticket')
                  : (locale === 'it' ? 'Acquista su Xceed' : 'Buy on Xceed')}
              </a>
            )}

            <BookingForm
              lang={locale}
              prefilledDate={event.dateISO.split('T')[0]}
              venueName={venueName}
              eventName={title}
            />

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-sm text-white/50 mb-1">{locale === 'it' ? 'Location' : 'Location'}</p>
              <p className="text-white font-medium">{venueName}</p>
              <p className="text-sm text-white/40">{venue.address.streetAddress}, {venue.address.addressLocality}</p>
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}
