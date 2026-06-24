import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, MapPin, MessageCircle } from 'lucide-react';
import { CONTACT } from '@/config/contact';

export const revalidate = 3600;

const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === 'it';
  const canonical = `${baseUrl}${isIt ? '/it' : ''}/aperitivo`;

  const title = isIt
    ? 'Migliore Aperitivo Milano 2026 | Bar, Orari e Zone | Nightlife Milan'
    : 'Best Aperitivo in Milan 2026 | Top Bars & Where to Go | Nightlife Milan';
  const description = isIt
    ? 'I migliori locali per l\'aperitivo a Milano: orari, cosa ordinare, dress code e top bar per zona — Navigli, Corso Como, Brera. Guida aggiornata 2026.'
    : 'Find the best aperitivo spots in Milan. Opening hours, what to order, dress code, and the top bars by zone — Navigli, Corso Como, Brera. Updated 2026.';
  const ogImage = `${baseUrl}/images/aperitivo-milan-cocktails-bar.webp`;

  return {
    title,
    description,
    keywords: isIt
      ? ['aperitivo milano', 'migliore aperitivo milano', 'bar aperitivo milano', 'dove fare aperitivo milano', 'aperitivo navigli']
      : ['aperitivo milan', 'best aperitivo milan', 'milan aperitivo bars', 'where to do aperitivo milan', 'navigli aperitivo'],
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: {
        'en': `${baseUrl}/aperitivo`,
        'it': `${baseUrl}/it/aperitivo`,
        'x-default': `${baseUrl}/aperitivo`,
      },
    },
    openGraph: {
      title: isIt ? 'Migliore Aperitivo Milano 2026 — Nightlife Milan' : 'Best Aperitivo in Milan 2026 — Nightlife Milan',
      description,
      type: 'article',
      url: canonical,
      siteName: 'Nightlife Milan',
      locale: isIt ? 'it_IT' : 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630, alt: isIt ? 'Aperitivo Milano cocktail bar' : 'Milan aperitivo cocktail bar' }],
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

const bars = [
  {
    name: 'Pineta Club',
    slug: 'pineta-club-milano',
    zone: 'Corso Como',
    image: '/images/aperitivo-milan-cocktails-bar.webp',
    hours: '18:00 – 21:00',
    vibe: 'Singing Aperitivo',
    price: '€15–20 per person',
    highlight: 'The famous Singing Aperitivo on Fridays — guests sing along to Italian hits.',
    dressCode: 'Chic & Stylish',
    isTop: true,
  },
  {
    name: 'Voya Rooftop',
    slug: 'voya-rooftop',
    zone: 'Isola',
    image: '/images/milan-rooftop-aperitivo-panoramic-view.webp',
    hours: '17:30 – 21:00',
    vibe: 'Sky Lounge Aperitivo',
    price: '€20–30 per person',
    highlight: 'Aperitivo with a panoramic view from the 20th floor. Sunset over the Milan skyline.',
    dressCode: 'Smart Elegant',
    isTop: true,
  },
  {
    name: 'Lacerba',
    slug: 'lacerba-milano',
    zone: 'Navigli',
    image: '/images/aperitivo-milan-navigli-evening.webp',
    hours: '18:00 – 22:00',
    vibe: 'Bohemian Canal-Side',
    price: '€10–15 per person',
    highlight: 'Classic Navigli aperitivo. Outdoor tables along the canal, casual crowd, great cocktails.',
    dressCode: 'Casual Cool',
    isTop: false,
  },
  {
    name: 'Brera Social Club',
    slug: 'brera-social-club',
    zone: 'Brera',
    image: '/images/bottle-service-milan-vip-nightclub.webp',
    hours: '17:00 – 21:00',
    vibe: 'Fashion Elite Aperitivo',
    price: '€18–25 per person',
    highlight: 'The Brera crowd — fashion people, designers, and a beautifully curated space.',
    dressCode: 'Fashion Forward',
    isTop: false,
  },
];

const tips = [
  {
    title: 'What time to go',
    body: 'Aperitivo starts at 18:00 and peaks around 19:30–20:30. Arrive by 18:30 to get a table. After 21:00 it transitions into dinner or early club.',
  },
  {
    title: 'What to order',
    body: 'Classic: Aperol Spritz, Campari Spritz, Negroni. Premium: Sbagliato, Vesper, Americano. Food is usually included or €5–10 extra (cicchetti / buffet).',
  },
  {
    title: 'What to wear',
    body: 'Milan is fashion-conscious even for aperitivo. Smart casual minimum — no flip flops, no shorts at nicer spots. Brera and Corso Como expect more elevated looks.',
  },
  {
    title: 'Book in advance?',
    body: 'For Friday and Saturday, always book. Weekday aperitivo is walk-in friendly. Our concierge can reserve your table at no extra cost.',
  },
];

export default async function AperitivoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lp = locale === 'it' ? '/it' : '';
  const waMsg = encodeURIComponent("Hi! Can you help me book a spot for aperitivo in Milan?");
  const waLink = `https://wa.me/393519127047?text=${waMsg}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Best Aperitivo in Milan 2026 — Top Bars & Where to Go",
    "description": "Complete guide to Milan aperitivo: opening hours, top bars by zone, what to order, and how to book a table.",
    "author": { "@type": "Organization", "name": "Nightlife Milan", "url": "https://nightlifemilan.com" },
    "publisher": {
      "@type": "Organization",
      "name": "Nightlife Milan",
      "url": "https://nightlifemilan.com",
      "logo": { "@type": "ImageObject", "url": "https://nightlifemilan.com/images/milan-nightclub-luxury-vip-champagne.webp" }
    },
    "datePublished": "2026-01-01",
    "dateModified": "2026-06-19",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://nightlifemilan.com/aperitivo" },
    "about": { "@type": "Thing", "name": "Aperitivo", "description": "Italian pre-dinner drink and snack tradition" },
    "locationCreated": { "@type": "City", "name": "Milan", "addressCountry": "IT" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What time is aperitivo in Milan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Aperitivo in Milan typically runs from 18:00 to 21:00. The peak time is 19:30–20:30. Arrive by 18:30 on Friday and Saturday to secure a table — popular spots fill up fast."
        }
      },
      {
        "@type": "Question",
        "name": "What is the best aperitivo in Milan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The most famous aperitivo in Milan is the Aperitivo Cantato at Pineta Club (Via Messina 38, Corso Como) — a live sing-along buffet every Friday from 19:30. For views, Voya Rooftop (Via Achille Papa 30) offers aperitivo on the 20th floor overlooking the skyline. For canal vibes, Navigli is the classic choice."
        }
      },
      {
        "@type": "Question",
        "name": "How much does aperitivo cost in Milan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Aperitivo in Milan costs €10–30 per person depending on the venue. Standard Navigli bars: €10–15. Corso Como spots like Pineta: €15–20. Rooftop venues like Voya: €20–30. Food is often included in the drink price."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to book aperitivo in Milan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For weekdays, most venues are walk-in friendly. On Friday and Saturday evenings, booking is strongly recommended — especially at popular spots like Pineta. Our concierge service can reserve your table via WhatsApp at no extra charge."
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <main className="min-h-screen bg-[#131009]">

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-amber-700/8 blur-[120px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto">
          <p className="font-sans text-champagne/60 text-[10px] tracking-[0.4em] uppercase mb-6">
            THE MILANESE RITUAL
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-none mb-6">
            Aperitivo<br />
            <span className="text-champagne">in Milan</span>
          </h1>
          <p className="font-sans text-white/50 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            The Milanese aperitivo is more than a drink — it&apos;s the start of the evening.
            From canal-side Navigli to rooftop lounges, here&apos;s where to go and what to expect.
          </p>

          {/* Quick Answer — for AI search engines (ChatGPT, Perplexity, Claude) */}
          <div className="max-w-2xl mx-auto mb-10 p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04] text-left">
            <p className="font-sans text-champagne/60 text-[9px] tracking-[0.3em] uppercase mb-3">Quick Answer</p>
            <p className="font-sans text-white/70 text-sm leading-relaxed">
              Aperitivo in Milan runs <strong className="text-white">18:00–21:00</strong>. Arrive by <strong className="text-white">18:30</strong> on weekends to get a table.
              Top spots: <strong className="text-white">Pineta</strong> (Via Messina 38, from €15), <strong className="text-white">Voya Rooftop</strong> (20th floor, from €20), Navigli canal bars (from €10).
              Book Friday and Saturday via <strong className="text-white">WhatsApp +39 351 912 7047</strong> — free, reply in 10 min.
            </p>
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-champagne text-black
              font-sans font-semibold text-sm tracking-[0.15em] uppercase
              hover:bg-white transition-colors duration-300"
          >
            <MessageCircle className="w-4 h-4" />
            Reserve a Table
          </a>
        </div>
      </section>

      {/* Quick tips */}
      <section className="px-6 pb-20 border-t border-white/5 pt-16">
        <div className="max-w-5xl mx-auto">
          <p className="font-sans text-champagne/50 text-[10px] tracking-[0.4em] uppercase mb-12 text-center">
            WHAT YOU NEED TO KNOW
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {tips.map((tip) => (
              <div key={tip.title} className="p-7 rounded-lg border border-white/8 bg-white/[0.02]">
                <h3 className="font-serif text-lg text-white mb-3">{tip.title}</h3>
                <p className="font-sans text-white/50 text-sm leading-relaxed">{tip.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top bars */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <p className="font-sans text-champagne/50 text-[10px] tracking-[0.4em] uppercase mb-3">
            BEST SPOTS
          </p>
          <h2 className="font-serif text-4xl text-white mb-12">
            Top Aperitivo Bars
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {bars.map((bar) => {
              const barWaMsg = encodeURIComponent(`Hi! I'd like to book a table for aperitivo at ${bar.name}. Can you help?`);
              const barWaLink = `https://wa.me/393519127047?text=${barWaMsg}`;
              return (
                <div key={bar.name}
                  className={`group relative overflow-hidden rounded-lg border transition-all duration-400
                    ${bar.isTop
                      ? 'border-champagne/25 bg-champagne/[0.03]'
                      : 'border-white/8 bg-white/[0.02] hover:border-white/15'
                    }`}>
                  {bar.isTop && (
                    <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-champagne to-transparent" />
                  )}

                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={bar.image}
                      alt={bar.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131009] via-black/30 to-transparent" />
                    {bar.isTop && (
                      <div className="absolute top-4 right-4">
                        <span className="font-sans text-[9px] font-bold tracking-[0.2em] uppercase px-2.5 py-1.5 rounded-full bg-champagne text-black">
                          Top Pick
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-serif text-xl text-white mb-1">{bar.name}</h3>
                        <p className="font-sans text-champagne/60 text-[11px] tracking-[0.2em] uppercase">
                          {bar.vibe}
                        </p>
                      </div>
                      <span className="font-sans text-white/60 text-xs mt-1 flex-shrink-0">{bar.price}</span>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4 text-xs font-sans text-white/40">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />{bar.hours}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" />{bar.zone}
                      </span>
                    </div>

                    <p className="font-sans text-white/50 text-sm leading-relaxed mb-5 italic">
                      &ldquo;{bar.highlight}&rdquo;
                    </p>

                    <div className="flex gap-3">
                      <a
                        href={barWaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-champagne text-black
                          font-sans font-semibold text-xs tracking-[0.12em] uppercase
                          hover:bg-white transition-colors duration-300"
                      >
                        <MessageCircle className="w-3 h-3" />
                        Reserve
                      </a>
                      <Link
                        href={`${lp}/clubs/${bar.slug}`}
                        className="flex-1 text-center inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-white/15 text-white/50
                          font-sans text-xs tracking-[0.12em] uppercase
                          hover:border-champagne/30 hover:text-champagne transition-colors duration-300"
                      >
                        Details
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Aperitivo by Zone — 3rd H2 */}
      <section className="px-6 pb-24 border-t border-white/5 pt-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-4xl text-white mb-4">
            Aperitivo by Zone: Where to Go in Milan
          </h2>
          <p className="font-sans text-white/40 text-sm mb-10 max-w-2xl">
            Different neighborhoods, different aperitivo energy. Here&apos;s how to pick your spot.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {[
              {
                zone: 'Corso Como',
                vibe: 'Chic & Fashion',
                desc: 'Pineta Club\'s famous Aperitivo Cantato runs every Friday from 19:30. Fashion crowd, premium cocktails, live singing entertainment.',
                price: '€15–20',
                tag: 'Popular',
              },
              {
                zone: 'Isola',
                vibe: 'Rooftop & Skyline',
                desc: 'Voya Rooftop on the 20th floor — aperitivo with panoramic view over the Milan skyline. Arrive by 19:00 for sunset.',
                price: '€20–30',
                tag: 'Panoramic',
              },
              {
                zone: 'Navigli',
                vibe: 'Canal-Side & Bohemian',
                desc: 'Dozens of bars along the Naviglio Grande. Walk-in friendly, outdoor seating, classic Aperol Spritz crowd. The most authentic aperitivo experience.',
                price: '€10–15',
                tag: 'Classic',
              },
              {
                zone: 'Brera',
                vibe: 'Luxury & Design',
                desc: 'Refined cocktail bars in the fashion district. Art galleries, boutique hotels and curated aperitivo menus. Smart-elegant creative crowd.',
                price: '€18–25',
                tag: 'Elite',
              },
            ].map((item) => (
              <div key={item.zone} className="p-6 rounded-lg border border-white/8 bg-white/[0.02]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-xl text-white">{item.zone}</h3>
                  <span className="px-2.5 py-1 rounded-full border border-champagne/30 text-champagne text-[10px] font-sans tracking-widest uppercase">{item.tag}</span>
                </div>
                <p className="font-sans text-champagne/60 text-xs tracking-widest uppercase mb-3">{item.vibe} · {item.price}</p>
                <p className="font-sans text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {['Aperitivo Milano', 'Corso Como', 'Navigli', 'Isola Rooftop', 'Aperitivo Cantato', 'Spritz Milano', 'Happy Hour Milano', 'Sunset Cocktails'].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full border border-white/10 text-white/40 text-xs font-sans tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* After aperitivo CTA */}
      <section className="px-6 pb-24 border-t border-white/5 pt-16">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-sans text-champagne/50 text-[10px] tracking-[0.4em] uppercase mb-4">
            AFTER APERITIVO
          </p>
          <h2 className="font-serif text-4xl text-white mb-4">
            Turn it into a Full Night
          </h2>
          <p className="font-sans text-white/40 text-sm mb-8 max-w-xl mx-auto">
            The aperitivo is just the beginning. Book a VIP table at the same venue for the club set,
            or move to a different spot — we can organize it all.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`${lp}/vip-tables`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-champagne text-black
                font-sans font-semibold text-sm tracking-[0.15em] uppercase
                hover:bg-white transition-colors duration-300"
            >
              Book VIP Table
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`${lp}/calendar/tonight`}
              className="inline-flex items-center gap-2 font-sans text-white/40 text-sm tracking-[0.15em] uppercase
                hover:text-champagne transition-colors duration-300"
            >
              See Tonight&apos;s Events
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </main>
    </>
  );
}
