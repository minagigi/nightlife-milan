import { Metadata } from 'next';
import Image from 'next/image';
import { MessageCircle, Star, Clock, Shield, Zap, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { CONTACT } from '@/config/contact';

export const revalidate = 3600;

const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === 'it';
  const canonical = `${baseUrl}${isIt ? '/it' : ''}/concierge`;

  const title = isIt
    ? 'Concierge Vita Notturna Milano | Tavoli VIP & Guestlist | Nightlife Milan'
    : 'Milan Nightlife Concierge | Personal Table & Guestlist Service | Nightlife Milan';
  const description = isIt
    ? 'Il tuo concierge personale per la vita notturna milanese. Tavoli VIP, guestlist, bottle service e consigli insider — tutto via WhatsApp. Servizio gratuito.'
    : 'Your personal Milan nightlife concierge. VIP table booking, guestlist access, bottle service, and insider advice — all via WhatsApp. Free service for guests.';
  const ogImage = `${baseUrl}/images/milan-nightclub-luxury-vip-champagne.webp`;

  return {
    title,
    description,
    keywords: isIt
      ? ['concierge vita notturna milano', 'prenotazione tavolo milano', 'guestlist milano', 'vip concierge milano', 'assistente nightlife milano']
      : ['milan nightlife concierge', 'milan club booking service', 'vip concierge milan', 'nightlife assistant milan', 'guestlist milan'],
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: {
        'en': `${baseUrl}/concierge`,
        'it': `${baseUrl}/it/concierge`,
        'x-default': `${baseUrl}/concierge`,
      },
    },
    openGraph: {
      title: isIt ? 'Concierge Vita Notturna Milano — Nightlife Milan' : 'Personal Milan Nightlife Concierge — Nightlife Milan',
      description,
      type: 'website',
      url: canonical,
      siteName: 'Nightlife Milan',
      locale: isIt ? 'it_IT' : 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630, alt: isIt ? 'Concierge nightlife Milano tavolo VIP' : 'Milan nightlife concierge VIP table service' }],
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

const services = [
  {
    icon: Star,
    title: 'VIP Table Booking',
    desc: 'Reserved tables at Milan\'s most exclusive clubs. Best spots in the house, guaranteed.',
  },
  {
    icon: CheckCircle,
    title: 'Guestlist Access',
    desc: 'Skip the queue with free or reduced entry guestlist at top venues. We add your name directly.',
  },
  {
    icon: Zap,
    title: 'Bottle Service',
    desc: 'Premium spirits, champagne, mixers — curated for your group. We negotiate the best package.',
  },
  {
    icon: MapPin,
    title: 'Venue Recommendations',
    desc: 'Not sure where to go? Tell us your vibe and we\'ll match you with the perfect spot.',
  },
  {
    icon: Calendar,
    title: 'Event Calendar',
    desc: 'We keep track of the best parties, DJ sets, and special events every week.',
  },
  {
    icon: Shield,
    title: 'Dress Code Briefing',
    desc: 'Avoid door policy issues — we tell you exactly what to wear for each venue.',
  },
];

const testimonials = [
  {
    text: 'We were 8 people visiting for Fashion Week. They got us the best table at Just Me in under an hour. Absolute legends.',
    name: 'James K.',
    city: 'London',
    night: 'Just Me — Fashion Week',
  },
  {
    text: 'Told them our budget and they came back with 3 options. Ended up at Pineta — best aperitivo of my life.',
    name: 'Sofia R.',
    city: 'New York',
    night: 'Pineta Club',
  },
  {
    text: 'Organized a birthday for 12 people. Everything was perfect — table, bottles, even birthday cake coordination. Zero stress.',
    name: 'Marco & Anna',
    city: 'Dubai',
    night: 'Voya Rooftop',
  },
];

export default async function ConciergePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const waMsg = encodeURIComponent("Hi! I need help planning a night out in Milan. Can you assist me?");
  const waLink = `https://wa.me/393519127047?text=${waMsg}`;

  const conciergeSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Milan Nightlife Concierge Service",
    "description": "Personal concierge service for VIP table booking, guestlist access, bottle service reservations, and nightlife planning in Milan. Free service for guests, reply guaranteed in under 10 minutes.",
    "provider": {
      "@type": "Organization",
      "name": "Nightlife Milan",
      "url": "https://nightlifemilan.com",
      "telephone": "+39-351-912-7047",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+39-351-912-7047",
        "contactType": "customer service",
        "availableLanguage": ["English", "Italian"],
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "14:00",
          "closes": "04:00"
        }
      }
    },
    "areaServed": {
      "@type": "City",
      "name": "Milan",
      "addressCountry": "IT"
    },
    "serviceType": "Nightlife Concierge",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "description": "Free concierge service — no booking fees for guests"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Concierge Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "VIP Table Booking Milan" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Guestlist Access Milan Clubs" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bottle Service Milan" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Nightclub Recommendations Milan" } }
      ]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is the Milan nightlife concierge service free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, the concierge service is completely free for guests. We earn a commission from partner venues, so there are no booking fees or service charges for you."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly do you reply on WhatsApp?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We guarantee a reply within 10 minutes during operating hours (2 PM to 4 AM daily). For same-night requests, contact us before 10 PM."
        }
      },
      {
        "@type": "Question",
        "name": "Can you get us into exclusive Milan clubs without a reservation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We have direct contacts at Milan's top venues including Just Me, Pineta, Voya Rooftop, Play Club, and more. We can add you to the guestlist or reserve a VIP table even on the same day in most cases."
        }
      },
      {
        "@type": "Question",
        "name": "What is the minimum spend for a VIP table in Milan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Minimum spends vary by venue: Just Me from €500, Voya Rooftop from €400, Pineta from €300, Play Club from €200. Contact us via WhatsApp for current prices and availability."
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(conciergeSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <main className="min-h-screen bg-[#131009]">

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-champagne/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-champagne/6 blur-[140px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto">
          <p className="font-sans text-champagne/60 text-[10px] tracking-[0.4em] uppercase mb-6">
            FREE PERSONAL SERVICE
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-none mb-6"
            style={{ textShadow: '0 0 80px rgba(201,168,106,0.15)' }}>
            Your Milan<br />
            <span className="text-champagne">Nightlife Concierge</span>
          </h1>
          <p className="font-sans text-white/50 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Planning a night out in Milan? We handle everything — from finding the right club
            to reserving your VIP table and making sure you get in. All via WhatsApp. All free.
          </p>

          {/* AI Trafiletto */}
          <div className="max-w-2xl mx-auto mb-10 p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04] text-left">
            <p className="font-sans text-champagne/60 text-[9px] tracking-[0.3em] uppercase mb-3">Quick Answer</p>
            <p className="font-sans text-white/70 text-sm leading-relaxed">
              Our <strong className="text-white">free Milan nightlife concierge</strong> handles VIP table reservations, guestlist access, bottle service, and dress code advice at Milan&apos;s top clubs. Contact via <strong className="text-white">WhatsApp +39 351 912 7047</strong> — reply guaranteed in under 10 minutes, 2 PM to 4 AM daily. We cover Just Me, Pineta, Voya Rooftop, Play Club, Magazzini Generali, and 12 more venues.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-champagne text-black
                font-sans font-bold text-sm tracking-[0.15em] uppercase
                hover:bg-white transition-colors duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              Start Planning Now
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-white/30">
              <Clock className="w-3.5 h-3.5 text-champagne/50" />
              <span className="font-sans text-xs tracking-wider">Reply &lt; 10 minutes</span>
            </div>
            <div className="flex items-center gap-2 text-white/30">
              <CheckCircle className="w-3.5 h-3.5 text-champagne/50" />
              <span className="font-sans text-xs tracking-wider">Completely free service</span>
            </div>
            <div className="flex items-center gap-2 text-white/30">
              <Shield className="w-3.5 h-3.5 text-champagne/50" />
              <span className="font-sans text-xs tracking-wider">7 days a week</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 pb-24 border-t border-white/5 pt-20">
        <div className="max-w-5xl mx-auto">
          <p className="font-sans text-champagne/50 text-[10px] tracking-[0.4em] uppercase mb-12 text-center">
            HOW IT WORKS
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 rounded-lg overflow-hidden">
            {[
              {
                step: '01',
                title: 'Tell us your night',
                desc: 'Date, group size, budget, vibe. Send it on WhatsApp — no forms, no calls.',
              },
              {
                step: '02',
                title: 'We find the best option',
                desc: 'We match you with the right venue, check availability, and negotiate the best deal.',
              },
              {
                step: '03',
                title: 'Show up and enjoy',
                desc: 'Your name is on the list, your table is reserved. Just arrive and have the best night.',
              },
            ].map((item) => (
              <div key={item.step} className="bg-[#131009] p-10 text-center">
                <span className="font-serif text-6xl text-champagne/15 font-bold block mb-6">{item.step}</span>
                <h3 className="font-serif text-xl text-white mb-3">{item.title}</h3>
                <p className="font-sans text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <p className="font-sans text-champagne/50 text-[10px] tracking-[0.4em] uppercase mb-3">
            WHAT WE DO
          </p>
          <h2 className="font-serif text-4xl text-white mb-12">
            Everything for Your Night Out
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => (
              <div key={service.title}
                className="p-7 rounded-lg border border-white/8 bg-white/[0.02]
                  hover:border-champagne/20 hover:bg-white/[0.04] transition-all duration-300 group">
                <div className="w-10 h-10 rounded-full bg-champagne/10 border border-champagne/20
                  flex items-center justify-center mb-5
                  group-hover:bg-champagne/15 transition-colors duration-300">
                  <service.icon className="w-4 h-4 text-champagne" />
                </div>
                <h3 className="font-serif text-lg text-white mb-2">{service.title}</h3>
                <p className="font-sans text-white/40 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 pb-24 border-t border-white/5 pt-20">
        <div className="max-w-5xl mx-auto">
          <p className="font-sans text-champagne/50 text-[10px] tracking-[0.4em] uppercase mb-12 text-center">
            WHAT GUESTS SAY
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="p-7 rounded-lg border border-white/8 bg-white/[0.02]">
                <div className="flex gap-1 mb-5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3 h-3 text-champagne fill-champagne" />
                  ))}
                </div>
                <p className="font-sans text-white/60 text-sm leading-relaxed italic mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="border-t border-white/8 pt-4">
                  <p className="font-sans text-white text-sm font-medium">{t.name}</p>
                  <p className="font-sans text-white/30 text-xs">{t.city} · {t.night}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <p className="font-sans text-champagne/50 text-[10px] tracking-[0.4em] uppercase mb-12 text-center">
            QUESTIONS
          </p>
          <div className="space-y-8">
            {[
              {
                q: 'Is this service really free?',
                a: 'Yes. We earn a commission from the venues — you pay nothing extra beyond the normal minimum spend or entry fee. In fact, we often negotiate better rates than you\'d get directly.',
              },
              {
                q: 'How quickly do you respond?',
                a: 'We guarantee a reply within 10 minutes during operating hours (12:00 PM – 4:00 AM Italian time, 7 days a week). For urgent last-minute requests, we\'re usually faster.',
              },
              {
                q: 'What languages do you speak?',
                a: 'We serve guests in English, Italian, French, Spanish, and Arabic. If you\'re visiting from abroad, just write to us in your preferred language.',
              },
              {
                q: 'Can you help with groups larger than 10?',
                a: 'Absolutely — large groups are our specialty. We can organize private areas, multiple tables, or even private events for groups of 20+.',
              },
            ].map((item, i) => (
              <div key={i} className="border-b border-white/8 pb-8">
                <h3 className="font-serif text-lg text-white mb-3">{item.q}</h3>
                <p className="font-sans text-white/50 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venues we cover — image gallery H2 */}
      <section className="px-6 pb-24 border-t border-white/5 pt-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-4xl text-white mb-4">Venues We Cover</h2>
          <p className="font-sans text-white/40 text-sm mb-8 max-w-xl">
            Direct partnerships with Milan&apos;s top clubs — guaranteed access, no surprises.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
            {[
              { src: '/images/vip-table-milan-nightclub-just-me.webp', alt: 'Just Me Milano — VIP table booking luxury club Sempione', label: 'Just Me' },
              { src: '/images/aperitivo-milan-cocktails-bar.webp', alt: 'Pineta Club Milano — singing aperitivo Corso Como', label: 'Pineta Club' },
              { src: '/images/rooftop-bar-milan-voya-skyline.webp', alt: 'Voya Rooftop Milan — sky lounge 20th floor Isola', label: 'Voya Rooftop' },
              { src: '/images/milan-nightclub-dancefloor-vip.webp', alt: 'Play Club Milano — hip hop afrobeats Corso Como', label: 'Play Club' },
              { src: '/images/milan-club-crowd-dancefloor-night.webp', alt: 'Magazzini Generali Milano — techno club Porta Romana', label: 'Magazzini' },
            ].map((img) => (
              <div key={img.label} className="relative group">
                <div className="relative h-36 rounded-xl overflow-hidden border border-white/8">
                  <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 20vw" />
                </div>
                <p className="font-sans text-white/40 text-xs text-center mt-2 tracking-widest uppercase">{img.label}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {['Just Me', 'Pineta Club', 'Voya Rooftop', 'Play Club', 'Magazzini Generali', '55 Milano', 'Repvblic', 'Church 81', 'Apollo', 'Hollywood', 'Volt', 'Armani Privé', 'The Club', 'Terrazza 21', 'Gattopardo', 'Ceresio 7', 'MiB Milano'].map((v) => (
              <span key={v} className="px-3 py-1.5 rounded-full border border-white/10 text-white/40 text-xs font-sans tracking-wider">
                {v}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="relative p-12 rounded-xl border border-champagne/20 bg-champagne/[0.04] text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-champagne/8 via-transparent to-transparent pointer-events-none" />
            <h2 className="font-serif text-4xl text-white mb-4 relative">
              Ready for the best<br />night of your trip?
            </h2>
            <p className="font-sans text-white/40 text-sm mb-8 relative">
              Send us a WhatsApp right now — tell us when and how many people,<br />
              and we&apos;ll take care of everything else.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-3 px-10 py-5 bg-champagne text-black
                font-sans font-bold text-sm tracking-[0.2em] uppercase
                hover:bg-white transition-colors duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              {CONTACT.whatsapp.number}
            </a>
            <p className="font-sans text-white/20 text-xs mt-5 relative">
              Free service · No registration · Instant reply
            </p>
          </div>
        </div>
      </section>

    </main>
    </>
  );
}
