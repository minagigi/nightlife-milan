import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { mockEvents, mockVenues } from '@/lib/data';
import { MusicGenre } from '@/lib/types';
import DiscoveryGrid from '@/components/DiscoveryGrid';
import { Music, ArrowLeft, Calendar } from 'lucide-react';

// ISR Configuration
export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const genreData: Record<string, {
  id: MusicGenre;
  name: string;
  heroTitle: { en: string; it: string };
  editorial: { en: string; it: string };
  soundOf: { en: string; it: string };
  metaTitle: { en: string; it: string };
  metaDescription: { en: string; it: string };
}> = {
  'techno': {
    id: MusicGenre.TECHNO,
    name: 'Techno',
    heroTitle: {
      en: 'Techno: The Industrial Pulse of Milan',
      it: 'Techno: Il Battito Industriale di Milano'
    },
    editorial: {
      en: 'Milan\'s techno scene has evolved from hidden underground raves to a globally recognized movement. The city\'s industrial past provides the perfect backdrop for heavy, relentless beats. Today, massive warehouses in the outskirts and intimate, dark basements in the center host both local pioneers and international heavyweights. The crowd is dedicated, the dress code is strictly black, and the energy is unparalleled. Whether you are looking for hypnotic, fast-paced rhythms or deep, melodic journeys, Milan\'s techno landscape offers a pure, unadulterated clubbing experience that lasts well past dawn.',
      it: 'La scena techno di Milano si è evoluta dai rave underground nascosti a un movimento riconosciuto a livello globale. Il passato industriale della città offre lo sfondo perfetto per ritmi pesanti e incessanti. Oggi, enormi magazzini in periferia e intimi scantinati bui nel centro ospitano sia pionieri locali che pesi massimi internazionali. Il pubblico è devoto, il dress code è rigorosamente nero e l\'energia è senza pari. Che tu stia cercando ritmi ipnotici e frenetici o viaggi profondi e melodici, il panorama techno di Milano offre un\'esperienza di clubbing pura e incontaminata che dura ben oltre l\'alba.'
    },
    soundOf: {
      en: 'High BPMs, strobe lights, Funktion-One sound systems, raw concrete, and total black dress code.',
      it: 'BPM elevati, luci stroboscopiche, sound system Funktion-One, cemento grezzo e dress code total black.'
    },
    metaTitle: {
      en: 'The Best Techno Clubs in Milan | 2026 Guide',
      it: 'I Migliori Club Techno a Milano | Guida 2026'
    },
    metaDescription: {
      en: 'Discover the ultimate guide to Milan\'s techno scene. Find the best underground clubs, industrial warehouses, and top DJ sets in 2026.',
      it: 'Scopri la guida definitiva alla scena techno di Milano. Trova i migliori club underground, magazzini industriali e i migliori DJ set nel 2026.'
    }
  },
  'house': {
    id: MusicGenre.HOUSE,
    name: 'House',
    heroTitle: {
      en: 'House: The Soulful Groove of the City',
      it: 'House: Il Groove Soul della Città'
    },
    editorial: {
      en: 'House music in Milan is synonymous with elegance and endless grooves. From the early days of Italo house to the modern deep and tech-house variations, the city has always embraced the 4/4 beat with style. You\'ll find house music dominating the chicest rooftops, sophisticated lounge bars, and premium clubs. The atmosphere is vibrant, inclusive, and focused on the joy of dancing. Expect lush melodies, driving basslines, and a crowd that knows how to appreciate a perfectly crafted DJ set while sipping premium cocktails.',
      it: 'La musica house a Milano è sinonimo di eleganza e groove infiniti. Dai primi giorni dell\'Italo house alle moderne variazioni deep e tech-house, la città ha sempre abbracciato il ritmo in 4/4 con stile. Troverai la musica house a dominare i rooftop più chic, i sofisticati lounge bar e i club premium. L\'atmosfera è vivace, inclusiva e incentrata sulla gioia di ballare. Aspettati melodie lussureggianti, linee di basso trascinanti e un pubblico che sa come apprezzare un DJ set perfettamente realizzato sorseggiando cocktail premium.'
    },
    soundOf: {
      en: 'Soulful vocals, deep basslines, chic venues, premium cocktails, and an elegant crowd.',
      it: 'Voci soul, linee di basso profonde, locali chic, cocktail premium e un pubblico elegante.'
    },
    metaTitle: {
      en: 'The Best House Music Clubs in Milan | 2026 Guide',
      it: 'I Migliori Club di Musica House a Milano | Guida 2026'
    },
    metaDescription: {
      en: 'Explore Milan\'s vibrant house music scene. Discover the best clubs, rooftops, and lounges playing deep, tech, and soulful house.',
      it: 'Esplora la vivace scena della musica house di Milano. Scopri i migliori club, rooftop e lounge che suonano deep, tech e soulful house.'
    }
  },
  'hip-hop': {
    id: MusicGenre.HIP_HOP,
    name: 'Hip Hop',
    heroTitle: { en: 'Hip Hop: The Urban Rhythm of Milan', it: 'Hip Hop: Il Ritmo Urbano di Milano' },
    editorial: {
      en: 'Milan\'s hip hop scene is a dynamic mix of international hits and a thriving local rap culture. The clubs dedicated to this genre offer high-energy nights, VIP tables, and a glamorous yet street-savvy crowd.',
      it: 'La scena hip hop di Milano è un mix dinamico di successi internazionali e una fiorente cultura rap locale. I club dedicati a questo genere offrono serate ad alta energia, tavoli VIP e un pubblico glamour ma attento allo street style.'
    },
    soundOf: { en: 'Heavy 808s, VIP bottle service, streetwear fashion, and high energy.', it: '808 pesanti, servizio bottiglie VIP, moda streetwear e grande energia.' },
    metaTitle: { en: 'Best Hip Hop Clubs in Milan | 2026 Guide', it: 'I Migliori Club Hip Hop a Milano | Guida 2026' },
    metaDescription: { en: 'Find the top hip hop and rap clubs in Milan. VIP tables, urban vibes, and the best DJs in the city.', it: 'Trova i migliori club hip hop e rap a Milano. Tavoli VIP, vibrazioni urbane e i migliori DJ della città.' }
  },
  'reggaeton': {
    id: MusicGenre.REGGAETON,
    name: 'Reggaeton',
    heroTitle: { en: 'Reggaeton: Caliente Nights in Milan', it: 'Reggaeton: Notti Calienti a Milano' },
    editorial: {
      en: 'When Milan wants to let loose and dance without inhibitions, reggaeton is the answer. The city hosts massive Latin nights filled with infectious rhythms, colorful atmospheres, and a crowd ready to party until the early hours.',
      it: 'Quando Milano vuole lasciarsi andare e ballare senza inibizioni, il reggaeton è la risposta. La città ospita enormi serate latine piene di ritmi contagiosi, atmosfere colorate e un pubblico pronto a fare festa fino alle prime ore del mattino.'
    },
    soundOf: { en: 'Dembow rhythms, tropical cocktails, vibrant dancefloors, and pure fun.', it: 'Ritmi dembow, cocktail tropicali, piste da ballo vivaci e puro divertimento.' },
    metaTitle: { en: 'Top Reggaeton & Latin Clubs in Milan | 2026 Guide', it: 'I Migliori Club Reggaeton e Latini a Milano | Guida 2026' },
    metaDescription: { en: 'Dance the night away at Milan\'s best reggaeton and Latin music clubs. Discover the hottest parties in town.', it: 'Balla tutta la notte nei migliori club di musica reggaeton e latina di Milano. Scopri le feste più calde della città.' }
  },
  'commercial': {
    id: MusicGenre.COMMERCIAL,
    name: 'Commercial',
    heroTitle: { en: 'Commercial: The Heart of Milanese Nightlife', it: 'Commerciale: Il Cuore della Movida Milanese' },
    editorial: {
      en: 'Commercial clubs are the glittering core of Milan\'s nightlife. Frequented by models, celebrities, and international students, these venues offer a mix of chart-toppers, EDM anthems, and pop hits in luxurious settings.',
      it: 'I club commerciali sono il nucleo scintillante della vita notturna di Milano. Frequentati da modelli, celebrità e studenti internazionali, questi locali offrono un mix di successi in classifica, inni EDM e hit pop in ambienti lussuosi.'
    },
    soundOf: { en: 'Chart-topping hits, sparklers, glamorous dress codes, and VIP areas.', it: 'Hit in cima alle classifiche, stelline scintillanti, dress code glamour e aree VIP.' },
    metaTitle: { en: 'Best Commercial & VIP Clubs in Milan | 2026 Guide', it: 'I Migliori Club Commerciali e VIP a Milano | Guida 2026' },
    metaDescription: { en: 'Experience the glamorous side of Milan. Discover the best commercial clubs, VIP tables, and exclusive parties.', it: 'Vivi il lato glamour di Milano. Scopri i migliori club commerciali, tavoli VIP e feste esclusive.' }
  },
  'edm': {
    id: MusicGenre.EDM,
    name: 'EDM',
    heroTitle: { en: 'EDM: Electric Energy and Massive Drops', it: 'EDM: Energia Elettrica e Drop Massicci' },
    editorial: {
      en: 'For those seeking festival-level energy indoors, Milan\'s EDM scene delivers. Huge LED screens, CO2 cannons, and international superstar DJs define these high-octane nights.',
      it: 'Per chi cerca l\'energia di un festival al chiuso, la scena EDM di Milano non delude. Enormi schermi LED, cannoni a CO2 e DJ superstar internazionali definiscono queste serate ad alto numero di ottani.'
    },
    soundOf: { en: 'Massive drops, laser shows, CO2 cannons, and festival vibes.', it: 'Drop massicci, spettacoli laser, cannoni a CO2 e vibrazioni da festival.' },
    metaTitle: { en: 'Top EDM Clubs & Events in Milan | 2026 Guide', it: 'I Migliori Club ed Eventi EDM a Milano | Guida 2026' },
    metaDescription: { en: 'Find the biggest EDM parties in Milan. Experience international DJs, massive sound systems, and unforgettable nights.', it: 'Trova le più grandi feste EDM a Milano. Vivi DJ internazionali, sound system enormi e notti indimenticabili.' }
  },
  'live-music': {
    id: MusicGenre.LIVE_MUSIC,
    name: 'Live Music',
    heroTitle: { en: 'Live Music: The Authentic Sound of Milan', it: 'Musica dal Vivo: Il Suono Autentico di Milano' },
    editorial: {
      en: 'Beyond the DJs, Milan boasts a rich live music culture. From intimate jazz clubs in Brera to large concert venues in Lambrate, the city offers stages for both emerging indie bands and established international artists.',
      it: 'Oltre ai DJ, Milano vanta una ricca cultura di musica dal vivo. Dagli intimi jazz club di Brera ai grandi locali per concerti a Lambrate, la città offre palcoscenici sia per band indie emergenti che per artisti internazionali affermati.'
    },
    soundOf: { en: 'Guitars, live vocals, intimate atmospheres, and craft beers.', it: 'Chitarre, voci dal vivo, atmosfere intime e birre artigianali.' },
    metaTitle: { en: 'Best Live Music Venues in Milan | 2026 Guide', it: 'I Migliori Locali di Musica dal Vivo a Milano | Guida 2026' },
    metaDescription: { en: 'Discover Milan\'s best live music venues. From jazz to rock, find the perfect spot for an authentic musical experience.', it: 'Scopri i migliori locali di musica dal vivo di Milano. Dal jazz al rock, trova il posto perfetto per un\'autentica esperienza musicale.' }
  },
  'indie': {
    id: MusicGenre.INDIE,
    name: 'Indie',
    heroTitle: { en: 'Indie: The Alternative Beat of the City', it: 'Indie: Il Battito Alternativo della Città' },
    editorial: {
      en: 'Milan\'s indie scene is a haven for the creative and the unconventional. Centered around neighborhoods like NoLo and Isola, these venues offer alternative sounds, vintage aesthetics, and a relaxed, welcoming community.',
      it: 'La scena indie di Milano è un rifugio per i creativi e gli anticonformisti. Centrati in quartieri come NoLo e Isola, questi locali offrono suoni alternativi, estetica vintage e una comunità rilassata e accogliente.'
    },
    soundOf: { en: 'Alternative beats, vintage aesthetics, relaxed dress codes, and artistic crowds.', it: 'Ritmi alternativi, estetica vintage, dress code rilassati e un pubblico artistico.' },
    metaTitle: { en: 'Top Indie & Alternative Clubs in Milan | 2026 Guide', it: 'I Migliori Club Indie e Alternativi a Milano | Guida 2026' },
    metaDescription: { en: 'Explore the alternative side of Milan. Find the best indie clubs, creative spaces, and underground live music.', it: 'Esplora il lato alternativo di Milano. Trova i migliori club indie, spazi creativi e musica dal vivo underground.' }
  }
};

export async function generateStaticParams() {
  const paths: { locale: string; slug: string }[] = [];
  
  Object.keys(genreData).forEach((slug) => {
    paths.push({ locale: 'en', slug });
    paths.push({ locale: 'it', slug });
  });

  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const typedLocale = (locale === 'it' ? 'it' : 'en') as 'en' | 'it';
  
  const genre = genreData[slug];
  
  if (!genre) return notFound();

  const title = genre.metaTitle[typedLocale];
  const description = genre.metaDescription[typedLocale];
  
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const canonical = `${baseUrl}${locale === 'it' ? '/it' : ''}/genres/${slug}`;

  const isIt = locale === 'it';
  const genreImages: Record<string, string> = {
    'techno': '/images/club-techno.webp',
    'house': '/images/milan-nightclub-luxury-vip-champagne.webp',
    'hip-hop': '/images/milan-nightclub-dancefloor-vip.webp',
    'reggaeton': '/images/milan-club-crowd-dancefloor-night.webp',
  };
  const ogImage = `${baseUrl}${genreImages[slug] || '/images/milan-nightclub-luxury-vip-champagne.webp'}`;

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: {
        'en': `${baseUrl}/genres/${slug}`,
        'it': `${baseUrl}/it/genres/${slug}`,
        'x-default': `${baseUrl}/genres/${slug}`,
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

export default async function GenrePage({ params }: Props) {
  const { locale, slug } = await params;
  const typedLocale = (locale === 'it' ? 'it' : 'en') as 'en' | 'it';
  
  const genre = genreData[slug];

  if (!genre) return notFound();

  // Filter events by genre
  const genreEvents = mockEvents.filter(e => e.genre.includes(genre.id));
  
  const items = genreEvents
    .map(event => {
      const venue = mockVenues.find(v => v.id === event.venueId);
      return venue ? { event, venue } : null;
    })
    .filter((item): item is { event: any; venue: any } => item !== null);

  // Helper to get absolute priority
  const getAbsolutePriority = (name: string) => {
    const upperName = name.toUpperCase();
    if (upperName.includes('JUSTME')) return 1;
    if (upperName.includes('PINETA')) return 2;
    if (upperName.includes('VOYA')) return 3;
    return 99; // Default for others
  };

  items.sort((a, b) => new Date(a.event.dateISO).getTime() - new Date(b.event.dateISO).getTime());

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
            <li className="text-champagne" aria-current="page">{genre.name}</li>
          </ol>
        </nav>
      </div>

      {/* Hero District */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1">
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-champagne tracking-tighter mb-6">
              {genre.heroTitle[typedLocale]}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[genre.name, 'Milan Nightlife', typedLocale === 'it' ? 'Club Milano' : 'Milan Clubs', typedLocale === 'it' ? 'Notte Milano' : 'Night Out Milan', 'VIP Tables'].map(tag => (
                <span key={tag} className="px-3 py-1.5 rounded-full border border-champagne/30 text-champagne/80 text-xs font-medium tracking-wide">
                  {tag}
                </span>
              ))}
            </div>

            {/* AI Trafiletto */}
            <div className="mb-8 p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04]">
              <p className="font-sans text-champagne/60 text-[9px] tracking-[0.3em] uppercase mb-3">Quick Answer</p>
              <p className="font-sans text-white/70 text-sm leading-relaxed">
                {typedLocale === 'it'
                  ? `I migliori club ${genre.name} a Milano: scopri le venue, gli eventi e le serate ${genre.name.toLowerCase()} più esclusive della città. ${items.length} eventi in programma. Prenota via WhatsApp +39 351 912 7047.`
                  : `Best ${genre.name} clubs in Milan: discover the venues, events and most exclusive ${genre.name.toLowerCase()} nights in the city. ${items.length} events scheduled. Book via WhatsApp +39 351 912 7047.`}
              </p>
            </div>

            {/* H2: About this genre */}
            <h2 className="font-serif text-2xl text-white mb-4">
              {typedLocale === 'it' ? `${genre.name} a Milano: La Guida` : `${genre.name} in Milan: The Guide`}
            </h2>
            <div className="text-white/70 leading-relaxed mb-12">
              <p>{genre.editorial[typedLocale]}</p>
            </div>
          </div>

          {/* The Sound Of Box */}
          <div className="w-full md:w-80 bg-white/[0.03] border border-white/10 rounded-lg p-6 sticky top-32">
            <h3 className="font-serif text-xl text-white mb-6 border-b border-white/10 pb-4 flex items-center gap-2">
              <Music className="w-5 h-5 text-champagne" />
              {typedLocale === 'it' ? `Il Suono: ${genre.name}` : `The Sound of ${genre.name}`}
            </h3>
            <p className="text-white/50 leading-relaxed italic mb-6">
              &quot;{genre.soundOf[typedLocale]}&quot;
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { src: '/images/milan-nightclub-dancefloor-vip.webp', alt: `${genre.name} club Milan dancefloor crowd` },
                { src: '/images/milan-club-crowd-dancefloor-night.webp', alt: `${genre.name} night Milan club atmosphere` },
                { src: '/images/bottle-service-milan-vip-nightclub.webp', alt: `VIP bottle service ${genre.name} club Milan` },
                { src: '/images/milan-nightclub-luxury-vip-champagne.webp', alt: `${genre.name} event Milan luxury nightclub` },
              ].map((img, i) => (
                <div key={i} className="relative h-20 rounded-lg overflow-hidden border border-white/8">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 40vw, 140px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filtering Logic: DiscoveryGrid or Empty State */}
      <div className="border-t border-white/5 bg-white/[0.03] pt-8">
        {items.length > 0 ? (
          <DiscoveryGrid 
            items={items} 
            lang={locale} 
            title={typedLocale === 'it' ? `Eventi ${genre.name}` : `${genre.name} Events`}
            subtitle={typedLocale === 'it' ? `I migliori party con questo vibe` : `The best parties with this vibe`}
          />
        ) : (
          <section className="max-w-3xl mx-auto px-4 py-24 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-6">
              <Calendar className="w-8 h-8 text-champagne" />
            </div>
            <h2 className="font-serif text-3xl text-white mb-4">
              {typedLocale === 'it' 
                ? `Nessun evento ${genre.name} stasera.` 
                : `No ${genre.name} events tonight.`}
            </h2>
            <p className="text-white/40 mb-8 text-lg">
              {typedLocale === 'it'
                ? 'Controlla il calendario completo per il weekend o esplora altri generi.'
                : 'Check the full calendar for the weekend or explore other genres.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href={`/${locale}/calendar/tonight`}
                className="px-8 py-3 rounded-full bg-champagne text-black font-medium tracking-wider uppercase text-sm w-full sm:w-auto"
              >
                {typedLocale === 'it' ? 'Timeline di Stasera' : 'Tonight\'s Timeline'}
              </Link>
              <Link 
                href={`/${locale}`}
                className="px-8 py-3 rounded-full border border-white/20 text-white hover:border-champagne hover:text-champagne transition-colors font-medium tracking-wider uppercase text-sm w-full sm:w-auto"
              >
                {typedLocale === 'it' ? 'Torna alla Home' : 'Back to Home'}
              </Link>
            </div>
          </section>
        )}
      </div>

      {/* 3rd H2 section: Plan Your Night */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
        <h2 className="font-serif text-3xl text-white mb-8">
          {typedLocale === 'it' ? `Come Organizzare una Serata ${genre.name} a Milano` : `How to Plan a ${genre.name} Night in Milan`}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="p-6 rounded-lg border border-white/8 bg-white/[0.02]">
            <h3 className="font-sans text-champagne text-xs font-bold tracking-widest uppercase mb-3">
              {typedLocale === 'it' ? 'Dove Andare' : 'Where to Go'}
            </h3>
            <p className="font-sans text-white/50 text-sm leading-relaxed">
              {typedLocale === 'it'
                ? `I club ${genre.name} migliori di Milano si trovano principalmente in zona Corso Como, Navigli e Porta Romana. Controlla la lista eventi sopra per trovare le serate più vicine a te.`
                : `The best ${genre.name} clubs in Milan are mainly in Corso Como, Navigli and Porta Romana. Check the event list above to find the nearest nights to you.`}
            </p>
          </div>
          <div className="p-6 rounded-lg border border-white/8 bg-white/[0.02]">
            <h3 className="font-sans text-champagne text-xs font-bold tracking-widest uppercase mb-3">
              {typedLocale === 'it' ? 'Come Prenotare' : 'How to Book'}
            </h3>
            <p className="font-sans text-white/50 text-sm leading-relaxed">
              {typedLocale === 'it'
                ? 'Contattaci via WhatsApp +39 351 912 7047. Ti confermiamo disponibilità, prezzi e dress code per ogni locale. Servizio gratuito, risposta in 10 minuti.'
                : 'Contact us via WhatsApp +39 351 912 7047. We confirm availability, prices and dress code for each venue. Free service, reply in 10 minutes.'}
            </p>
          </div>
          <div className="p-6 rounded-lg border border-white/8 bg-white/[0.02]">
            <h3 className="font-sans text-champagne text-xs font-bold tracking-widest uppercase mb-3">
              {typedLocale === 'it' ? 'Dress Code & Accesso' : 'Dress Code & Entry'}
            </h3>
            <p className="font-sans text-white/50 text-sm leading-relaxed">
              {typedLocale === 'it'
                ? 'Ogni locale ha le sue regole. Smart-elegant nei club commerciali, total black nel techno, casual nei club indie. Il nostro concierge ti darà le info specifiche prima di uscire.'
                : 'Each club has its own rules. Smart-elegant at commercial clubs, total black at techno, casual at indie spots. Our concierge will give you specific info before you go.'}
            </p>
          </div>
        </div>
        {/* Additional image */}
        <div className="relative h-48 rounded-lg overflow-hidden border border-white/8">
          <Image
            src="/images/milan-nightclub-luxury-vip-champagne.webp"
            alt={`${genre.name} club Milan — VIP experience and nightlife atmosphere 2026`}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          <div className="absolute inset-0 p-8 flex flex-col justify-center">
            <p className="font-sans text-champagne/80 text-xs tracking-widest uppercase mb-2">
              {typedLocale === 'it' ? 'Prenota Ora' : 'Book Now'}
            </p>
            <p className="font-serif text-2xl text-white">WhatsApp +39 351 912 7047</p>
          </div>
        </div>
      </section>

      {/* Cross-Linking SEO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center border-t border-white/5">
        <Link 
          href={`/${locale}`}
          className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-champagne hover:text-black hover:border-champagne transition-all duration-300 font-bold tracking-widest uppercase text-sm gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {typedLocale === 'it' ? 'Esplora altri generi' : 'Back to all Genres'}
        </Link>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MusicPlaylist",
            "name": genre.heroTitle[typedLocale],
            "description": genre.editorial[typedLocale],
            "genre": genre.name,
            "track": items.map(item => ({
              "@type": "MusicEvent",
              "name": item.event.localizedContent.title[typedLocale] || item.event.localizedContent.title.en,
              "startDate": item.event.dateISO,
              "location": {
                "@type": "Place",
                "name": item.venue.localizedContent.name[typedLocale] || item.venue.localizedContent.name.en,
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Milan",
                  "addressCountry": "IT"
                }
              }
            }))
          })
        }}
      />
    </main>
  );
}
