import EditorialPageSections from '@/components/EditorialPageSections';
import type { LocaleCode } from '@/lib/i18n/locales';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { tr } from '@/lib/i18n/t';
import { getLocaleDef, hreflangAlternates, localePrefix } from '@/lib/i18n/locales';
import { seoRobots, seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { Sparkles, MapPin, Clock, MessageCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { VipQuoteCalculator, PrioritySixShowcase } from '@/components/NightlifeExpansionModules';

export const revalidate = 3600;

const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = `${baseUrl}${localePrefix(locale)}/rooftops`;

  const title = seoTitle(
    tr(
      locale,
      'Best Rooftop Bars & Panoramic Sky Lounges in Milan 2026/2027 | Voya 20th Floor, Ceresio 7 & Terrazza Duomo 21',
      'Migliori Rooftop Bar e Terrazze Panoramiche Milano 2026/2027 | Voya 20° Piano, Ceresio 7 e Terrazza Duomo 21'
    )
  );
  const description = withWhatsApp(
    tr(
      locale,
      'Compare and book the best rooftop bars in Milan for sunset aperitivo, dinner shows & panoramic DJ sets: Voya Rooftop (85m), Ceresio 7 Pools, Terrazza Duomo 21 & Torre Branca.',
      'Confronta e prenota i migliori rooftop bar e terrazze panoramiche di Milano per aperitivo al tramonto, cena e DJ set: Voya Rooftop (85m), Ceresio 7, Terrazza Duomo 21 e Torre Branca.'
    ),
    locale
  );

  return {
    title,
    description,
    robots: seoRobots(locale),
    alternates: {
      canonical,
      languages: hreflangAlternates(baseUrl, '/rooftops'),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: getLocaleDef(locale)?.ogLocale || 'en_US',
      images: [
        {
          url: `${baseUrl}/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-01.webp`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

const ROOFTOPS = [
  {
    rank: 1,
    slug: 'voya-rooftop-milan',
    name: 'Voya Rooftop Milano',
    elevationEn: '20th Floor · 85 Meters',
    elevationIt: '20° Piano · 85 Metri d’Altezza',
    zoneEn: 'Portello / CityLife (Viale Achille Papa, 30)',
    zoneIt: 'Portello / CityLife (Viale Achille Papa, 30)',
    viewEn: '360° CityLife Three Towers, San Siro & Monte Rosa Alps',
    viewIt: 'Vista 360° su Tre Torri CityLife, San Siro e Arco Alpino',
    formulaEn: 'Sunset Aperitivo (19:00) · Dinner Show · Panoramic DJ Set (until 02:30)',
    formulaIt: 'Aperitivo al Tramonto (19:00) · Dinner Show · DJ Set Panoramico (fino alle 02:30)',
    priceEn: 'Aperitivo €20–€25 · Sky Lounge VIP Table from €200–€350',
    priceIt: 'Aperitivo €20–€25 · Tavolo VIP Sky Lounge da €200–€350',
    seasonEn: 'Year-Round (360° glass sky lounge + open-air summer terrace)',
    seasonIt: 'Tutto l’Anno (sky lounge vetrata 360° + terrazza estiva open-air)',
    image: '/images/pillars/rooftops-02.webp',
  },
  {
    rank: 2,
    slug: 'ceresio-7-milano',
    name: 'Ceresio 7 Pools & Restaurant',
    elevationEn: 'Rooftop Twin Pools · Historic Enel Palace',
    elevationIt: 'Rooftop con Doppia Piscina · Storico Palazzo Enel',
    zoneEn: 'Porta Volta / Monumentale (Via Ceresio, 7)',
    zoneIt: 'Porta Volta / Monumentale (Via Ceresio, 7)',
    viewEn: 'Porta Nuova Skyscrapers, UniCredit Tower & Bosco Verticale',
    viewIt: 'Grattacieli di Porta Nuova, Torre UniCredit e Bosco Verticale',
    formulaEn: 'Poolside Sunset Mixology (18:30) · Fine Dining · Lounge DJ Set',
    formulaIt: 'Mixology Bordo Piscina (18:30) · Ristorante Fine Dining · Lounge DJ Set',
    priceEn: 'Signature Cocktails €22–€25 · Poolside Table Reservation Required',
    priceIt: 'Signature Cocktail €22–€25 · Prenotazione Tavolo Obbligatoria',
    seasonEn: 'Year-Round (Heated indoor dining rooms + heated outdoor terraces)',
    seasonIt: 'Tutto l’Anno (Sale interne Dsquared2 + terrazze esterne riscaldate)',
    image: '/images/pillars/rooftops-03.webp',
  },
  {
    rank: 3,
    slug: 'terrazza-21-milano',
    name: 'Terrazza Duomo 21',
    elevationEn: 'Cathedral Terrace · Piazza del Duomo, 21',
    elevationIt: 'Terrazza Fronte Guglie · Piazza del Duomo, 21',
    zoneEn: 'Piazza del Duomo / Galleria Vittorio Emanuele II',
    zoneIt: 'Piazza del Duomo / Galleria Vittorio Emanuele II',
    viewEn: 'Direct Front-Row View of the Gothic Spires & Madonnina',
    viewIt: 'Affaccio Frontale Diretto sulle Guglie Gotiche e sulla Madonnina',
    formulaEn: 'Cathedral Aperitivo (18:00) · Evening Cocktail Club & DJ Set (until 02:00)',
    formulaIt: 'Aperitivo Vista Duomo (18:00) · Evening Cocktail Club & DJ Set (fino alle 02:00)',
    priceEn: 'Aperitivo €20–€25 · Terrace VIP Table from €250–€400',
    priceIt: 'Aperitivo €20–€25 · Tavolo VIP Terrazza da €250–€400',
    seasonEn: 'Year-Round (Indoor panoramic salon + open balcony on Piazza Duomo)',
    seasonIt: 'Tutto l’Anno (Salone panoramico interno + balconata su Piazza Duomo)',
    image: '/images/pillars/rooftops-04.webp',
  },
  {
    rank: 4,
    slug: 'just-me-milano',
    name: 'Just Me Milano & Torre Branca Sky View',
    elevationEn: 'Garden Foot + 108m Torre Branca Panoramic Lift',
    elevationIt: 'Giardino Triennale + Ascensore Panoramico Torre Branca (108m)',
    zoneEn: 'Parco Sempione (Viale Luigi Camusso, 2)',
    zoneIt: 'Parco Sempione (Viale Luigi Camusso, 2)',
    viewEn: 'Parco Sempione Canopy, Castello Sforzesco & Full Milan Horizon at 108m',
    viewIt: 'Parco Sempione, Castello Sforzesco e Orizzonte di Milano a 108m',
    formulaEn: 'Royal Aperitivo (19:30) + Torre Branca Ascent + Luxury Clubbing (until 05:00)',
    formulaIt: 'Royal Aperitivo (19:30) + Salita Torre Branca + Luxury Club (fino alle 05:00)',
    priceEn: 'Aperitivo €20–€25 · VIP Tables from €300–€600',
    priceIt: 'Aperitivo €20–€25 · Tavoli VIP da €300–€600',
    seasonEn: 'Year-Round (Glass winter dome + lush summer garden)',
    seasonIt: 'Tutto l’Anno (Cupola vetrata invernale + giardino estivo)',
    image: '/images/pillars/rooftops-05.webp',
  },
];

export default async function RooftopsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isIt = locale === 'it';
  const lp = localePrefix(locale);

  const faqs = [
    {
      q: isIt
        ? 'Qual è il rooftop bar più alto di Milano per aperitivo e serata con DJ set?'
        : 'What is the highest rooftop bar in Milan for sunset aperitivo and DJ sets?',
      a: isIt
        ? 'Voya Rooftop Milano (Viale Achille Papa 30, zona Portello/CityLife) svetta al 20° piano a 85 metri di altezza con vista a 360° sullo skyline di CityLife, San Siro e le Alpi, offrendo aperitivo panoramico, cena e DJ set fino alle 02:30.'
        : 'Voya Rooftop Milano (Viale Achille Papa 30, Portello/CityLife district) sits on the 20th floor at 85 meters high with a 360° view of the CityLife towers, San Siro, and the Alps, offering sunset aperitivo, dinner, and DJ sets until 02:30.',
    },
    {
      q: isIt
        ? 'I rooftop bar di Milano sono aperti anche in autunno e inverno?'
        : 'Are Milan rooftop bars open during autumn and winter?',
      a: isIt
        ? 'Sì. Voya Rooftop, Ceresio 7, Terrazza Duomo 21 e Just Me dispongono di sky lounge vetrate climatizzate e terrazze esterne riscaldate, risultando perfetti 365 giorni l’anno.'
        : 'Yes. Voya Rooftop, Ceresio 7, Terrazza Duomo 21, and Just Me feature climate-controlled glass sky lounges and heated outdoor terraces, operating 365 days a year.',
    },
    {
      q: isIt
        ? 'Serve la prenotazione per l’aperitivo in terrazza a Milano?'
        : 'Do I need a reservation for a rooftop aperitivo in Milan?',
      a: isIt
        ? 'Sì, la prenotazione anticipata è obbligatoria per garantire il tavolo fronte vista al tramonto (18:30–20:00). Scrivi su WhatsApp al +39 351 912 7047 per bloccare il tuo tavolo senza costi di agenzia.'
        : 'Yes, advance booking is mandatory to secure a front-row sunset table (18:30–20:00). Message our WhatsApp Concierge at +39 351 912 7047 to lock in your table with zero agency fees.',
    },
  ];

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: isIt
        ? 'Migliori Rooftop Bar e Terrazze Panoramiche a Milano 2026/2027'
        : 'Best Rooftop Bars & Panoramic Terraces in Milan 2026/2027',
      itemListElement: ROOFTOPS.map((r) => ({
        '@type': 'ListItem',
        position: r.rank,
        name: r.name,
        url: `${baseUrl}${lp}/clubs/${r.slug}`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a,
        },
      })),
    },
  ];

  return (
    <main className="flex-grow pt-24 pb-20 bg-[#131009]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div data-rooftops-top-hero="true" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-champagne/30">
          <Image quality={92}
            src="/images/pillars/rooftops-01.webp"
            alt="Milan Panoramic Rooftop Bars & Skyline Lounges"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-champagne/30 bg-champagne/10 mb-5">
          <Sparkles className="w-3.5 h-3.5 text-champagne" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-champagne">
            {isIt ? 'Guida Ufficiale Skyline & Terrazze 2026/2027' : 'Official Skyline & Rooftop Guide 2026/2027'}
          </span>
        </div>

        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-champagne tracking-tighter mb-6">
          {isIt
            ? 'I Migliori Rooftop Bar e Terrazze Panoramiche di Milano'
            : 'The Best Rooftop Bars & Sky Lounges in Milan'}
        </h1>
        <p className="text-xl text-white/65 max-w-3xl mb-8">
          {isIt
            ? 'Dall’ottantesimo metro del Voya Rooftop (20° piano) alle piscine sospese di Ceresio 7, fino alle guglie gotiche di Terrazza Duomo 21: confronta altezze, orari del tramonto, prezzi e prenota il tuo tavolo panoramico.'
            : 'From 85 meters high at Voya Rooftop (20th floor) to the twin pools of Ceresio 7 and the Gothic spires of Terrazza Duomo 21: compare elevations, sunset timings, prices, and book your panoramic table.'}
        </p>

        {/* AI Quick Answer */}
        <div className="max-w-3xl p-6 rounded-2xl border border-champagne/25 bg-champagne/[0.04]">
          <p className="font-mono text-champagne text-[10px] tracking-[0.3em] uppercase mb-2">
            {isIt ? 'Risposta Rapida · Top 4 Terrazze Milano' : 'Quick Answer · Top 4 Milan Rooftops'}
          </p>
          <p className="text-sm text-white/75 leading-relaxed">
            {isIt
              ? '1. Voya Rooftop (20° piano, 85m, vista 360° CityLife e Alpi, aperitivo + DJ set fino alle 02:30). 2. Ceresio 7 (piscine in quota in Porta Volta, alta cucina e mixology). 3. Terrazza Duomo 21 (affaccio frontale sulle guglie del Duomo). 4. Just Me & Torre Branca (giardino Italo Rota + vista a 108m nel Parco Sempione). Prenotazione diretta: WhatsApp +39 351 912 7047.'
              : '1. Voya Rooftop (20th floor, 85m, 360° CityLife & Alps view, aperitivo + DJ set until 02:30). 2. Ceresio 7 (rooftop pools in Porta Volta, fine dining & mixology). 3. Terrazza Duomo 21 (direct view of the Duomo spires). 4. Just Me & Torre Branca (Italo Rota garden + 108m view in Parco Sempione). Direct booking: WhatsApp +39 351 912 7047.'}
          </p>
        </div>
      </section>

      {/* Rooftops Showcase Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 space-y-8">
        {ROOFTOPS.map((r) => (
          <div
            key={r.slug}
            className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl overflow-hidden border border-white/15 bg-white/[0.02] hover:border-champagne/50 transition-all"
          >
            <div className="relative h-72 lg:h-auto lg:col-span-5">
              <Image
                src={r.image}
                alt={r.name}
                fill
                quality={92}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-champagne text-black font-mono text-xs font-bold uppercase tracking-wider">
                #{r.rank} Skyline Choice
              </div>
            </div>

            <div className="p-7 md:p-9 lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono uppercase tracking-[0.2em] text-champagne mb-2">
                  {isIt ? r.elevationIt : r.elevationEn}
                </div>
                <h2 className="font-serif text-3xl text-white mb-3">{r.name}</h2>
                <p className="text-sm text-white/60 flex items-center gap-2 mb-5">
                  <MapPin className="w-4 h-4 text-champagne shrink-0" />
                  <span>{isIt ? r.zoneIt : r.zoneEn}</span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-champagne mb-1">
                      {isIt ? 'Panorama & Skyline' : 'Skyline Panorama'}
                    </div>
                    <div className="text-xs text-white/80">{isIt ? r.viewIt : r.viewEn}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-champagne mb-1">
                      {isIt ? 'Prezzi & Tavoli VIP' : 'Pricing & VIP Tables'}
                    </div>
                    <div className="text-xs text-white/80">{isIt ? r.priceIt : r.priceEn}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-white/70 mb-6">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-champagne" />
                    {isIt ? r.formulaIt : r.formulaEn}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    {isIt ? r.seasonIt : r.seasonEn}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                <a
                  href={`https://wa.me/393519127047?text=${encodeURIComponent(
                    isIt
                      ? `Ciao Nightlife Milan! Vorrei prenotare un tavolo panoramico da ${r.name}.`
                      : `Hi Nightlife Milan! I'd like to book a panoramic table at ${r.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-champagne text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isIt ? 'Prenota Tavolo Vista Skyline' : 'Book Skyline Table'}</span>
                </a>
                <Link
                  href={`${lp}/clubs/${r.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 text-white/80 hover:border-champagne hover:text-champagne font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  <span>{isIt ? 'Scheda Locale' : 'Venue Details'}</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Interactive VIP Quote Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <VipQuoteCalculator locale={locale} />
      </section>

      {/* Priority 6 Venues */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <PrioritySixShowcase locale={locale} />
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl text-champagne mb-6">
          {isIt ? 'Domande Frequenti sui Rooftop Bar di Milano' : 'Milan Rooftop Bars FAQ'}
        </h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <h3 className="font-serif text-lg text-white mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-champagne shrink-0" />
                {f.q}
              </h3>
              <p className="text-sm text-white/65 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
      <EditorialPageSections locale={locale as LocaleCode} path={`${lp}/rooftops`} />
    </main>
  );
}
