import { Metadata } from 'next';
import { hreflangAlternates } from '@/lib/i18n/locales';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MessageCircle, Star, Users, Clock, Shield } from 'lucide-react';
import { CONTACT } from '@/config/contact';
import { venuesData } from '@/lib/venuesData';
import { MilanZone } from '@/lib/types';
import { tr } from '@/lib/i18n/t';

export const revalidate = 3600;

const baseUrlGlobal = process.env.APP_URL || 'https://nightlifemilan.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === 'it';
  const canonicalUrl = `${baseUrlGlobal}${isIt ? '/it' : ''}/vip-tables`;

  const title = tr(locale, 'VIP Table Booking Milan | Bottle Service & Table Reservations | Nightlife Milan', 'Prenotazione Tavoli VIP Milano | Bottle Service & Tavoli | Nightlife Milan');
  const description = tr(locale, 'Book VIP tables at the best clubs in Milan. Guaranteed entry, premium bottle service, and personal concierge. WhatsApp response in under 10 minutes.', 'Prenota tavoli VIP nei migliori club di Milano. Ingresso garantito, bottle service premium e concierge personale. Risposta WhatsApp in meno di 10 minuti.');

  const keywordsEn = ['vip table milan', 'bottle service milan', 'table booking milan', 'vip nightclub milan', 'exclusive table milan'];
  const keywordsIt = ['tavoli vip milano', 'bottle service milano', 'prenotazione tavolo milano', 'vip nightclub milano', 'tavolo esclusivo milano'];

  return {
    title,
    description,
    keywords: keywordsEn.map((k, i) => tr(locale, k, keywordsIt[i])),
    robots: { index: true, follow: true },
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates(baseUrlGlobal, '/vip-tables'),
    },
    openGraph: {
      title: tr(locale, 'VIP Table Booking Milan — Nightlife Milan Concierge', 'Prenotazione Tavoli VIP Milano — Nightlife Milan Concierge'),
      description,
      type: 'website',
      url: canonicalUrl,
      siteName: 'Nightlife Milan',
      locale: isIt ? 'it_IT' : 'en_US',
      images: [{
        url: `${baseUrlGlobal}/images/vip-table-milan-nightclub-just-me.webp`,
        width: 1200,
        height: 630,
        alt: tr(locale, 'VIP Tables Milan — Just Me Club', 'Tavoli VIP Milano — Just Me Club'),
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrlGlobal}/images/vip-table-milan-nightclub-just-me.webp`],
      site: '@nightlifemilan',
    },
  };
}

const ZONE_LABELS: Partial<Record<MilanZone, string>> = {
  [MilanZone.SEMPIONE]: 'Sempione',
  [MilanZone.CORSO_COMO]: 'Corso Como',
  [MilanZone.ISOLA]: 'Isola',
  [MilanZone.PORTA_ROMANA]: 'Porta Romana',
  [MilanZone.NAVIGLI]: 'Navigli',
  [MilanZone.BRERA]: 'Brera',
  [MilanZone.TORTONA]: 'Tortona',
};

const VIP_CONFIG: Record<string, {
  zoneDisplay?: string;
  vibe: string;
  minSpend: number;
  tableStart: number;
  capacity: string;
  music: string;
  bestFor: string;
  isHot: boolean;
}> = {
  'v-justme': {
    vibe: 'Luxury Fashion Club', minSpend: 500, tableStart: 800, capacity: '6–12 guests',
    music: 'House · Commercial · Fashion DJ Sets',
    bestFor: 'Fashion Week, Special occasions, Celebrating in style', isHot: true,
  },
  'v-pineta': {
    vibe: 'Chic Aperitivo & Night Club', minSpend: 300, tableStart: 400, capacity: '4–10 guests',
    music: 'Commercial · Pop · Live Singing Aperitivo',
    bestFor: 'Friday Singing Aperitivo, Group nights out', isHot: false,
  },
  'v-voya': {
    zoneDisplay: 'Isola · 20th Floor',
    vibe: 'Sky Lounge & Rooftop Bar', minSpend: 400, tableStart: 600, capacity: '4–8 guests',
    music: 'Lounge · Nu Disco · Chill House',
    bestFor: 'Sunset views, Romantic evenings, Corporate events', isHot: true,
  },
  'v-playclub': {
    vibe: 'Urban Hip-Hop & Afrobeats', minSpend: 200, tableStart: 300, capacity: '4–8 guests',
    music: 'Hip Hop · Afrobeats · Reggaeton',
    bestFor: 'Late night parties, Urban crowd, Dancing', isHot: false,
  },
  'v-magazzini': {
    vibe: 'Industrial Techno & Electronic', minSpend: 250, tableStart: 350, capacity: '4–6 guests',
    music: 'Techno · Electronic · Underground',
    bestFor: 'Electronic music lovers, After-work parties', isHot: false,
  },
};

const VIP_ORDER = ['v-justme', 'v-pineta', 'v-voya', 'v-playclub', 'v-magazzini'];

const venues = venuesData
  .filter(v => VIP_ORDER.includes(v.id))
  .sort((a, b) => VIP_ORDER.indexOf(a.id) - VIP_ORDER.indexOf(b.id))
  .map(v => {
    const cfg = VIP_CONFIG[v.id];
    return {
      id: v.id,
      name: v.localizedContent.name.en,
      slug: v.slugs.en,
      zone: cfg.zoneDisplay ?? (ZONE_LABELS[v.zone] ?? v.zone),
      image: v.image ?? '/images/milan-nightclub-dancefloor-vip.webp',
      tags: v.tags ?? [],
      insiderTip: v.localizedContent.insiderTip?.en ?? '',
      ...cfg,
    };
  });

const steps = [
  {
    icon: MessageCircle,
    title: 'WhatsApp Us',
    desc: 'Tell us the date, number of guests, and which club. We reply in under 10 minutes.',
  },
  {
    icon: Shield,
    title: 'We Confirm & Reserve',
    desc: 'We personally confirm your table with the venue. No hidden fees, no surprises.',
  },
  {
    icon: Star,
    title: 'You Arrive as VIPs',
    desc: 'Show up, skip the line, go straight to your table. Our staff ensures everything is perfect.',
  },
];

export default async function VipTablesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lp = locale === 'it' ? '/it' : '';
  const waMsg = encodeURIComponent("Hi! I'd like to book a VIP table in Milan. Can you help me?");
  const waLink = `https://wa.me/393519127047?text=${waMsg}`;
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'VIP Table Booking Milan',
    description: 'Personal concierge service for VIP table and bottle service reservations at Milan\'s top nightclubs. WhatsApp response guaranteed in under 10 minutes.',
    provider: { '@type': 'Organization', name: 'Nightlife Milan', url: baseUrl },
    areaServed: { '@type': 'City', name: 'Milan', sameAs: 'https://www.wikidata.org/wiki/Q490' },
    serviceType: 'Nightclub Table Reservation',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      lowPrice: '200',
      highPrice: '2000',
      offerCount: venues.length,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+39-351-912-7047',
      contactType: 'reservations',
      availableLanguage: ['English', 'Italian'],
      hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '12:00', closes: '04:00' },
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How much does a VIP table cost in Milan?', acceptedAnswer: { '@type': 'Answer', text: 'VIP tables in Milan typically start at €200–€500 minimum spend per table, depending on the venue and night. This amount goes toward drinks and bottle service. Tables at premium venues like Just Me start from €500 minimum spend.' } },
      { '@type': 'Question', name: 'What is included in bottle service at Milan clubs?', acceptedAnswer: { '@type': 'Answer', text: 'Bottle service includes 1 or more bottles of premium spirits (vodka, champagne, etc.), mixers, ice, and dedicated table service throughout the night.' } },
      { '@type': 'Question', name: 'How do I book a VIP table in Milan?', acceptedAnswer: { '@type': 'Answer', text: 'WhatsApp us at +39 351 912 7047 with your preferred date, group size, and budget. We confirm your reservation and add your name to the guestlist. We reply in under 10 minutes.' } },
      { '@type': 'Question', name: 'Is there a service fee for VIP table booking in Milan?', acceptedAnswer: { '@type': 'Answer', text: 'Our concierge service is completely free. We earn a commission directly from the venue, so you pay only the agreed minimum spend — often at better rates than booking directly.' } },
      { '@type': 'Question', name: 'What should I wear to Milan clubs?', acceptedAnswer: { '@type': 'Answer', text: 'Milan clubs enforce strict dress codes. Smart-elegant is the minimum — no sneakers, no shorts, no sportswear. For premium venues like Just Me, fashion-forward attire is expected.' } },
    ],
  };

  const faqs = [
    {
      q: 'How much does a VIP table cost in Milan?',
      a: 'VIP tables in Milan typically start at €200–€500 minimum spend per table, depending on the venue and night. This amount goes toward drinks and bottle service. Our concierge will find the best option for your group and budget.',
      qIt: 'Quanto costa un tavolo VIP a Milano?',
      aIt: 'I tavoli VIP a Milano partono in genere da €200–€500 di consumazione minima a tavolo, a seconda del locale e della serata. L\'importo viene speso in drink e bottle service. Il nostro concierge troverà l\'opzione migliore per il tuo gruppo e budget.',
    },
    {
      q: "What's included in bottle service?",
      a: 'Bottle service includes 1 or more bottles of premium spirits (vodka, champagne, etc.), mixers, ice, and dedicated table service. Some venues include entry in the minimum spend; others charge separately.',
      qIt: 'Cosa è incluso nel bottle service?',
      aIt: 'Il bottle service include una o più bottiglie di alcolici premium (vodka, champagne, ecc.), mixer, ghiaccio e servizio al tavolo dedicato. Alcuni locali includono l\'ingresso nella consumazione minima; altri lo fanno pagare a parte.',
    },
    {
      q: 'Do we need to book in advance?',
      a: 'For weekends and special events, we recommend booking at least 48 hours in advance. For Fashion Week, Salone del Mobile, or New Year\'s Eve — book as early as possible. Same-day bookings are possible on weekdays.',
      qIt: 'Bisogna prenotare in anticipo?',
      aIt: 'Per weekend ed eventi speciali consigliamo di prenotare almeno 48 ore prima. Per Fashion Week, Salone del Mobile o Capodanno — prenota il prima possibile. Nei giorni infrasettimanali sono possibili prenotazioni anche in giornata.',
    },
    {
      q: 'Is there a service fee?',
      a: 'Our concierge service is free for you. We earn a commission directly from the venue. You pay only the minimum spend agreed with the club.',
      qIt: 'C\'è un costo per il servizio?',
      aIt: 'Il nostro servizio concierge è gratuito per te. La nostra commissione viene pagata direttamente dal locale. Tu paghi solo la consumazione minima concordata con il club.',
    },
    {
      q: 'What should we wear?',
      a: 'Milan clubs enforce strict dress codes. Smart-elegant is the minimum — no sneakers, no shorts, no sportswear. For top venues like Just Me, fashion-forward is expected. We\'ll send you the specific dress code when you book.',
      qIt: 'Come dobbiamo vestirci?',
      aIt: 'I club milanesi applicano un dress code rigoroso. Smart-elegant è il minimo richiesto — niente sneakers, pantaloncini o abbigliamento sportivo. Nei locali top come Just Me è richiesto un look fashion-forward. Ti invieremo il dress code specifico al momento della prenotazione.',
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <main className="min-h-screen bg-[#131009]">

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-champagne/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-champagne/8 blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <p className="font-sans text-champagne/60 text-[10px] tracking-[0.4em] uppercase mb-6">
            {tr(locale, 'MILAN NIGHTLIFE CONCIERGE')}
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-none mb-6"
            style={{ textShadow: '0 0 80px rgba(201,168,106,0.2)' }}>
            {tr(locale, 'VIP Tables')}<br />
            <span className="text-champagne">{tr(locale, 'in Milan')}</span>
          </h1>
          <p className="font-sans text-white/50 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            {tr(locale, "Skip the queue. Get the best seat in the house. We book VIP tables at Milan's most exclusive clubs — with guaranteed entry, bottle service, and personal concierge.", 'Salta la fila. Prendi il posto migliore della casa. Prenotiamo tavoli VIP nei club più esclusivi di Milano — con ingresso garantito, bottle service e concierge personale.')}
          </p>

          {/* Quick Answer — for AI search engines */}
          <div className="max-w-2xl mx-auto mb-10 p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04] text-left">
            <p className="font-sans text-champagne/60 text-[9px] tracking-[0.3em] uppercase mb-3">{tr(locale, 'Quick Answer')}</p>
            <p
              className="font-sans text-white/70 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: tr(
                locale,
                'VIP tables in Milan start at <strong class="text-white">€200 minimum spend</strong> (Play Club) up to <strong class="text-white">€500+</strong> (Just Me). Book via <strong class="text-white">WhatsApp +39 351 912 7047</strong> — reply guaranteed in 10 minutes. Free service, no booking fee. Venues: Just Me (Sempione), Pineta (Corso Como), Voya Rooftop (Isola), Play Club (Corso Como), Magazzini Generali (Navigli).',
                'I tavoli VIP a Milano partono da <strong class="text-white">€200 di consumazione minima</strong> (Play Club) fino a <strong class="text-white">€500+</strong> (Just Me). Prenota via <strong class="text-white">WhatsApp +39 351 912 7047</strong> — risposta garantita in 10 minuti. Servizio gratuito, nessuna commissione. Locali: Just Me (Sempione), Pineta (Corso Como), Voya Rooftop (Isola), Play Club (Corso Como), Magazzini Generali (Navigli).'
              ) }}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-champagne text-black
                font-sans font-semibold text-sm tracking-[0.15em] uppercase
                hover:bg-white transition-colors duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              {tr(locale, 'Book via WhatsApp', 'Prenota su WhatsApp')}
            </a>
            <div className="flex items-center gap-2 text-white/40 text-sm font-sans">
              <Clock className="w-4 h-4" />
              {tr(locale, 'Reply in under 10 minutes', 'Risposta in meno di 10 minuti')}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-4xl text-white mb-3 text-center">{tr(locale, 'How to Book a VIP Table in Milan', 'Come Prenotare un Tavolo VIP a Milano')}</h2>
          <p className="font-sans text-champagne/50 text-[10px] tracking-[0.4em] uppercase text-center mb-12">
            {tr(locale, '3 STEPS · FREE SERVICE · 10-MINUTE REPLY', '3 PASSI · SERVIZIO GRATUITO · RISPOSTA IN 10 MINUTI')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative p-8 rounded-lg border border-white/8 bg-white/[0.03]">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-10 h-10 rounded-full bg-champagne/10 border border-champagne/20 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-4 h-4 text-champagne" />
                  </div>
                  <span className="font-sans text-champagne/30 text-3xl font-bold">0{i + 1}</span>
                </div>
                <h3 className="font-serif text-xl text-white mb-2">{tr(locale, step.title)}</h3>
                <p className="font-sans text-white/50 text-sm leading-relaxed">{tr(locale, step.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue list */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <p className="font-sans text-champagne/50 text-[10px] tracking-[0.4em] uppercase mb-3">
            {tr(locale, 'AVAILABLE VENUES', 'LOCALI DISPONIBILI')}
          </p>
          <h2 className="font-serif text-4xl text-white mb-12">
            {tr(locale, 'Choose Your Club', 'Scegli il Tuo Club')}
          </h2>

          <div className="space-y-5">
            {venues.map((venue) => {
              const venueWaMsg = encodeURIComponent(`Hi! I'd like to book a VIP table at ${venue.name}. Can you help me?`);
              const venueWaLink = `https://wa.me/393519127047?text=${venueWaMsg}`;
              return (
                <div key={venue.id}
                  className="group relative overflow-hidden rounded-lg border border-white/8
                    hover:border-champagne/25 transition-all duration-500
                    bg-white/[0.02] hover:bg-white/[0.04]">

                  {venue.isHot && (
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent" />
                  )}

                  <div className="flex flex-col lg:flex-row">
                    {/* Image */}
                    <div className="relative w-full lg:w-72 h-48 lg:h-auto flex-shrink-0 overflow-hidden">
                      <Image
                        src={venue.image}
                        alt={venue.name}
                        fill
                        quality={85}
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        sizes="(max-width: 1024px) 100vw, 288px"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#131009]/80 hidden lg:block" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#131009]/80 lg:hidden" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 lg:p-8">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-serif text-2xl text-white group-hover:text-champagne transition-colors duration-300">
                              {venue.name}
                            </h3>
                            {venue.isHot && (
                              <span className="font-sans text-[9px] font-bold tracking-[0.2em] uppercase px-2 py-1 rounded-full bg-champagne text-black">
                                {tr(locale, 'Most Popular', 'Il Più Richiesto')}
                              </span>
                            )}
                          </div>
                          <p className="font-sans text-champagne/60 text-xs tracking-[0.2em] uppercase">
                            {venue.zone} · {tr(locale, venue.vibe)}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-sans text-white/30 text-[10px] uppercase tracking-widest mb-1">{tr(locale, 'Min. Spend', 'Consumo Min.')}</p>
                          <p className="font-serif text-3xl text-champagne font-bold">€{venue.minSpend}</p>
                          <p className="font-sans text-white/30 text-[10px]">{tr(locale, `tables from €${venue.tableStart}`, `tavoli da €${venue.tableStart}`)}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5 text-sm">
                        <div>
                          <p className="font-sans text-white/25 text-[10px] uppercase tracking-widest mb-1">{tr(locale, 'Music', 'Musica')}</p>
                          <p className="font-sans text-white/60 text-xs">{tr(locale, venue.music)}</p>
                        </div>
                        <div>
                          <p className="font-sans text-white/25 text-[10px] uppercase tracking-widest mb-1">{tr(locale, 'Table Size', 'Capienza Tavolo')}</p>
                          <p className="font-sans text-white/60 text-xs flex items-center gap-1.5">
                            <Users className="w-3 h-3" />{venue.capacity}
                          </p>
                        </div>
                        <div>
                          <p className="font-sans text-white/25 text-[10px] uppercase tracking-widest mb-1">{tr(locale, 'Best For', 'Ideale Per')}</p>
                          <p className="font-sans text-white/60 text-xs">{tr(locale, venue.bestFor)}</p>
                        </div>
                      </div>

                      <p className="font-sans text-white/40 text-xs italic border-l-2 border-champagne/30 pl-3 mb-6">
                        &ldquo;{tr(locale, venue.insiderTip)}&rdquo;
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {venue.tags.map((tag) => (
                          <span key={tag}
                            className="font-sans text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full
                              bg-white/5 border border-white/10 text-white/50">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <a
                          href={venueWaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-champagne text-black
                            font-sans font-semibold text-xs tracking-[0.15em] uppercase
                            hover:bg-white transition-colors duration-300"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          {tr(locale, 'Book This Table', 'Prenota Questo Tavolo')}
                        </a>
                        <Link
                          href={`${lp}/clubs/${venue.slug}`}
                          className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white/60
                            font-sans text-xs tracking-[0.15em] uppercase
                            hover:border-champagne/40 hover:text-champagne transition-colors duration-300"
                        >
                          {tr(locale, 'View Club', 'Vedi il Club')}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-24 border-t border-white/5 pt-16">
        <div className="max-w-3xl mx-auto">
          <p className="font-sans text-champagne/50 text-[10px] tracking-[0.4em] uppercase mb-12 text-center">
            {tr(locale, 'FREQUENTLY ASKED QUESTIONS', 'DOMANDE FREQUENTI')}
          </p>
          <div className="space-y-8">
            {faqs.map((item, i) => (
              <div key={i} className="border-b border-white/8 pb-8">
                <h3 className="font-serif text-lg text-white mb-3">{tr(locale, item.q, item.qIt)}</h3>
                <p className="font-sans text-white/50 text-sm leading-relaxed">{tr(locale, item.a, item.aIt)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative p-10 rounded-xl border border-champagne/20 bg-champagne/[0.04] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-champagne/8 via-transparent to-transparent pointer-events-none" />
            <p className="font-sans text-champagne/60 text-[10px] tracking-[0.4em] uppercase mb-4 relative">
              {tr(locale, 'READY TO GO?', 'PRONTO A PARTIRE?')}
            </p>
            <h2 className="font-serif text-4xl text-white mb-4 relative">
              {tr(locale, 'Reserve Your Table Now', 'Prenota il Tuo Tavolo Ora')}
            </h2>
            <p className="font-sans text-white/40 text-sm mb-8 relative">
              {tr(locale, "WhatsApp us with your date, group size, and budget. We'll handle everything.", 'Scrivici su WhatsApp con data, numero di persone e budget. Ci pensiamo a tutto noi.')}
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
            <p className="font-sans text-white/20 text-xs mt-4 relative">
              {tr(locale, 'Response guaranteed in under 10 minutes · Available 7 days a week', 'Risposta garantita in meno di 10 minuti · Disponibili 7 giorni su 7')}
            </p>
          </div>
        </div>
      </section>

    </main>
    </>
  );
}
