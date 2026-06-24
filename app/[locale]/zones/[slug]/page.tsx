import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { mockZones, mockEvents, mockVenues } from '@/lib/data';
import DiscoveryGrid from '@/components/DiscoveryGrid';
import { MapPin, Calendar, GlassWater } from 'lucide-react';

// ISR Configuration
export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const paths: { locale: string; slug: string }[] = [];
  
  mockZones.forEach((zone) => {
    paths.push({ locale: 'en', slug: zone.slug });
    paths.push({ locale: 'it', slug: zone.slug });
  });

  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const typedLocale = (locale === 'it' ? 'it' : 'en') as 'en' | 'it';
  
  const zone = mockZones.find(z => z.slug === slug);
  
  if (!zone) return notFound();

  const title = zone.metaTitle[typedLocale] || zone.metaTitle.en;
  const description = zone.metaDescription[typedLocale] || zone.metaDescription.en;
  
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const canonical = `${baseUrl}${locale === 'it' ? '/it' : ''}/zones/${slug}`;

  const isIt = locale === 'it';
  const ogImage = zone.image ? `${baseUrl}${zone.image}` : `${baseUrl}/images/milan-nightclub-luxury-vip-champagne.webp`;

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: {
        'en': `${baseUrl}/zones/${slug}`,
        'it': `${baseUrl}/it/zones/${slug}`,
        'x-default': `${baseUrl}/zones/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: isIt ? 'it_IT' : 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      site: '@nightlifemilan',
    },
  };
}

export default async function ZonePage({ params }: Props) {
  const { locale, slug } = await params;
  const typedLocale = (locale === 'it' ? 'it' : 'en') as 'en' | 'it';
  
  const zone = mockZones.find(z => z.slug === slug);

  if (!zone) return notFound();

  // Filter events by zone
  const zoneVenues = mockVenues.filter(v => v.zone === zone.id);
  const venueIds = new Set(zoneVenues.map(v => v.id));
  const zoneEvents = mockEvents.filter(e => venueIds.has(e.venueId));

  const items = zoneEvents.map(event => {
    const venue = mockVenues.find(v => v.id === event.venueId)!;
    return { event, venue };
  });

  // Helper to get absolute priority
  const getAbsolutePriority = (name: string) => {
    const upperName = name.toUpperCase();
    if (upperName.includes('JUSTME')) return 1;
    if (upperName.includes('PINETA')) return 2;
    if (upperName.includes('VOYA')) return 3;
    return 99; // Default for others
  };

  items.sort((a, b) => new Date(a.event.dateISO).getTime() - new Date(b.event.dateISO).getTime());

  // Calculate dynamic stats
  const venuesInZone = zoneVenues.length;
  const eventsTonight = zoneEvents.length; // Simplified for mock data

  return (
    <main className="flex-grow pt-24 pb-20 bg-[#131009]">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <nav className="text-sm text-white/40" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href={`/${locale}`} className="hover:text-champagne transition-colors">Home</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <Link href={`/${locale}/zones`} className="hover:text-champagne transition-colors">
                {typedLocale === 'it' ? 'Zone' : 'Zones'}
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-champagne" aria-current="page">{zone.name}</li>
          </ol>
        </nav>
      </div>

      {/* Hero District */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1">
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-champagne tracking-tighter mb-6">
              {zone.name}: {zone.vibe}
            </h1>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {zone.tags.map(tag => (
                <span key={tag} className="px-4 py-1.5 rounded-full border border-champagne/30 text-champagne text-sm font-medium tracking-wider">
                  {tag}
                </span>
              ))}
            </div>

            {/* AI Trafiletto */}
            <div className="mb-8 p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04]">
              <p className="font-sans text-champagne/60 text-[9px] tracking-[0.3em] uppercase mb-3">Quick Answer</p>
              <p className="font-sans text-white/70 text-sm leading-relaxed">
                {typedLocale === 'it'
                  ? `${zone.name} è uno dei quartieri più vivaci per la vita notturna di Milano. Vibe: ${zone.vibe}. ${venuesInZone} locali nella zona, ${eventsTonight} eventi in programma. Prenota via WhatsApp +39 351 912 7047.`
                  : `${zone.name} is one of Milan's most vibrant nightlife districts. Vibe: ${zone.vibe}. ${venuesInZone} venues in the area, ${eventsTonight} events tonight. Book via WhatsApp +39 351 912 7047.`}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {zone.tags.map(tag => (
                <span key={tag} className="px-3 py-1.5 rounded-full border border-champagne/30 text-champagne/80 text-xs font-medium tracking-wide">
                  {tag}
                </span>
              ))}
            </div>

            {/* The Insider Guide */}
            <div className="text-white/70 leading-relaxed mb-12">
              <h2 className="text-2xl font-serif text-champagne mb-4">
                {typedLocale === 'it' ? `Guida a ${zone.name}` : `The Insider Guide to ${zone.name}`}
              </h2>
              <p>{zone.description[typedLocale]}</p>
            </div>

            {/* What to Expect — 2nd H2 */}
            <div className="mb-12">
              <h2 className="text-2xl font-serif text-white mb-6">
                {typedLocale === 'it' ? 'Cosa Aspettarsi' : 'What to Expect'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl border border-white/8 bg-white/[0.02]">
                  <h3 className="font-sans text-champagne text-xs font-bold tracking-widest uppercase mb-2">
                    {typedLocale === 'it' ? 'Orari' : 'Hours'}
                  </h3>
                  <p className="font-sans text-white/50 text-sm leading-relaxed">
                    {typedLocale === 'it'
                      ? 'Aperitivo dalle 18:00. Club aperti dalle 22:30. Picco tra mezzanotte e le 3:00.'
                      : 'Aperitivo from 18:00. Clubs open from 22:30. Peak between midnight and 3 AM.'}
                  </p>
                </div>
                <div className="p-5 rounded-xl border border-white/8 bg-white/[0.02]">
                  <h3 className="font-sans text-champagne text-xs font-bold tracking-widest uppercase mb-2">
                    {typedLocale === 'it' ? 'Dress Code' : 'Dress Code'}
                  </h3>
                  <p className="font-sans text-white/50 text-sm leading-relaxed">
                    {typedLocale === 'it'
                      ? 'Smart-elegant minimo. Niente sneakers, shorts o sportswear nei locali premium.'
                      : 'Smart-elegant minimum. No sneakers, shorts or sportswear at premium venues.'}
                  </p>
                </div>
                <div className="p-5 rounded-xl border border-white/8 bg-white/[0.02]">
                  <h3 className="font-sans text-champagne text-xs font-bold tracking-widest uppercase mb-2">
                    {typedLocale === 'it' ? 'Come Arrivare' : 'Getting There'}
                  </h3>
                  <p className="font-sans text-white/50 text-sm leading-relaxed">
                    {typedLocale === 'it'
                      ? 'Metro, taxi o Uber. La zona è ben servita dai mezzi pubblici fino all\'1:00.'
                      : 'Metro, taxi or Uber. The area is well served by public transport until 1 AM.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* District Stats */}
          <div className="w-full md:w-80 bg-white/[0.03] border border-white/10 rounded-lg p-6 sticky top-32">
            <h3 className="font-serif text-xl text-white mb-6 border-b border-white/10 pb-4">
              District Stats
            </h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-champagne" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{venuesInZone > 0 ? venuesInZone : zone.stats.split(',')[0].replace(/[^0-9]/g, '')}</p>
                  <p className="text-sm text-white/40 uppercase tracking-wider">Venues</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-champagne" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{eventsTonight}</p>
                  <p className="text-sm text-white/40 uppercase tracking-wider">Events Tonight</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center flex-shrink-0">
                  <GlassWater className="w-5 h-5 text-champagne" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{zone.vibe}</p>
                  <p className="text-sm text-white/40 uppercase tracking-wider">Main Vibe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtering Logic: DiscoveryGrid */}
      <div className="border-t border-white/5 bg-white/[0.03] pt-8">
        <DiscoveryGrid 
          items={items} 
          lang={locale} 
          title={typedLocale === 'it' ? `Eventi a ${zone.name}` : `Events in ${zone.name}`}
          subtitle={typedLocale === 'it' ? `Scopri cosa succede stasera nel quartiere` : `Discover what's happening tonight in the district`}
        />
      </div>

      {/* Cross-Linking SEO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Link 
          href={`/${locale}/zones`}
          className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-champagne hover:text-black hover:border-champagne transition-all duration-300 font-bold tracking-widest uppercase text-sm"
        >
          {typedLocale === 'it' ? 'Esplora altre zone' : 'Explore other zones'}
        </Link>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "TouristAttraction",
              "name": `${zone.name} Nightlife District — Milan`,
              "description": zone.description[typedLocale] || zone.description.en,
              "image": zone.image,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Milan",
                "addressRegion": "Lombardy",
                "addressCountry": "IT"
              },
              "touristType": "Nightlife",
              "keywords": zone.tags.join(', '),
            },
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": typedLocale === 'it' ? `Locali a ${zone.name}, Milano` : `Venues in ${zone.name}, Milan`,
              "numberOfItems": zoneVenues.length,
              "itemListElement": zoneVenues.map((venue, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "item": {
                  "@type": "NightClub",
                  "name": venue.localizedContent.name[typedLocale] || venue.localizedContent.name.en,
                  "image": venue.image,
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Milan",
                    "addressCountry": "IT"
                  }
                }
              }))
            }
          ])
        }}
      />
    </main>
  );
}
