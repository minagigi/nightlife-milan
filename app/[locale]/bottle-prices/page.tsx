import { Metadata } from 'next';
import Link from 'next/link';
import { mockVenues } from '@/lib/data';

export const revalidate = 86400;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === 'it';
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const canonical = `${baseUrl}${isIt ? '/it' : ''}/bottle-prices`;

  const title = isIt
    ? 'Prezzi Bottiglie Discoteche Milano 2026 | Listino VIP | Nightlife Milan'
    : 'Milan Club Bottle Prices 2026 | VIP Table Price List | Nightlife Milan';
  const description = isIt
    ? 'Listino prezzi bottiglie aggiornato per tutti i club di Milano: Just Me, Armani Privé, Play Club, Volt, Pineta. Prezzi tavoli VIP, champagne, vodka. Prenota via WhatsApp.'
    : 'Updated bottle price list for all Milan clubs: Just Me, Armani Privé, Play Club, Volt, Pineta. VIP table prices, champagne, vodka. Book via WhatsApp.';

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        'en': `${baseUrl}/bottle-prices`,
        'it': `${baseUrl}/it/bottle-prices`,
        'x-default': `${baseUrl}/bottle-prices`,
      },
    },
    keywords: isIt
      ? ['prezzi bottiglie discoteche milano', 'listino bottle service milano', 'costo tavolo vip milano', 'champagne club milano', 'prezzi just me milano']
      : ['milan club bottle prices', 'bottle service milan price', 'vip table cost milan', 'champagne milan nightclub', 'just me milan prices'],
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: isIt ? 'it_IT' : 'en_US',
      images: [{ url: `${baseUrl}/images/bottle-prices-hero.webp`, width: 1200, height: 630, alt: isIt ? 'Prezzi bottiglie club Milano' : 'Milan club bottle prices' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/images/bottle-prices-hero.webp`],
      site: '@nightlifemilan',
    },
  };
}

// Curated bottle price data per venue (beyond the generic tableMinSpend)
const bottleData: Record<string, {
  standardBottle: string;
  premiumBottle: string;
  champagneEntry: string;
  champagnePremium: string;
  tableMinWeekday: string | null;
  tableMinWeekend: string | null;
  bestFor: string;
  bestForIt: string;
  tier: 'luxury' | 'premium' | 'mid';
}> = {
  'v-justme': {
    standardBottle: '€180–220',
    premiumBottle: '€280–380',
    champagneEntry: '€250–350',
    champagnePremium: '€500–900',
    tableMinWeekday: '€320',
    tableMinWeekend: '€500',
    bestFor: 'Fashion Week crowd, international jet-set',
    bestForIt: 'Fashion Week, jet-set internazionale',
    tier: 'luxury',
  },
  'v-armani-prive': {
    standardBottle: '€200–300',
    premiumBottle: '€350–500',
    champagneEntry: '€350–450',
    champagnePremium: '€700–1500',
    tableMinWeekday: '€500',
    tableMinWeekend: '€1000',
    bestFor: 'Luxury brand events, VIP nights',
    bestForIt: 'Serate di lusso, eventi di moda',
    tier: 'luxury',
  },
  'v-gattopardo': {
    standardBottle: '€160–200',
    premiumBottle: '€250–350',
    champagneEntry: '€250–350',
    champagnePremium: '€500–900',
    tableMinWeekday: '€400',
    tableMinWeekend: '€600',
    bestFor: 'Chic evenings, elegant mixed crowd',
    bestForIt: 'Serate chic, pubblico misto elegante',
    tier: 'luxury',
  },
  'v-theclub': {
    standardBottle: '€150–200',
    premiumBottle: '€250–350',
    champagneEntry: '€200–300',
    champagnePremium: '€450–800',
    tableMinWeekday: '€300',
    tableMinWeekend: '€500',
    bestFor: 'High-energy commercial music nights',
    bestForIt: 'Serate commercial ad alta energia',
    tier: 'premium',
  },
  'v-playclub': {
    standardBottle: '€120–160',
    premiumBottle: '€200–280',
    champagneEntry: '€180–250',
    champagnePremium: '€350–600',
    tableMinWeekday: '€200',
    tableMinWeekend: '€400',
    bestFor: 'Young crowd, hip-hop & commercial',
    bestForIt: 'Crowd giovane, hip-hop e commercial',
    tier: 'mid',
  },
  'v-volt': {
    standardBottle: '€150–200',
    premiumBottle: '€220–300',
    champagneEntry: '€220–300',
    champagnePremium: '€450–700',
    tableMinWeekday: '€300',
    tableMinWeekend: '€500',
    bestFor: 'Techno & electronic music lovers',
    bestForIt: 'Amanti di techno e musica elettronica',
    tier: 'premium',
  },
  'v-hollywood': {
    standardBottle: '€140–180',
    premiumBottle: '€220–300',
    champagneEntry: '€200–280',
    champagnePremium: '€400–700',
    tableMinWeekday: '€300',
    tableMinWeekend: '€500',
    bestFor: 'Mixed commercial & Latin nights',
    bestForIt: 'Serate commercial e Latin',
    tier: 'premium',
  },
  'v-repvblic': {
    standardBottle: '€130–170',
    premiumBottle: '€200–280',
    champagneEntry: '€180–250',
    champagnePremium: '€350–600',
    tableMinWeekday: '€300',
    tableMinWeekend: '€500',
    bestFor: 'EDM & house underground crowd',
    bestForIt: 'Crowd EDM e house underground',
    tier: 'premium',
  },
};

const commonBottles = [
  { name: 'Smirnoff / Bacardi (standard)', price: '€120–180', category: 'Standard' },
  { name: 'Belvedere / Grey Goose (premium)', price: '€180–280', category: 'Premium' },
  { name: 'Ciroc / Don Julio (ultra)', price: '€250–380', category: 'Ultra' },
  { name: "Moët & Chandon (entry champagne)", price: '€200–350', category: 'Champagne' },
  { name: 'Veuve Clicquot', price: '€280–420', category: 'Champagne' },
  { name: 'Dom Pérignon', price: '€500–900', category: 'Prestige' },
  { name: 'Cristal (Louis Roederer)', price: '€700–1500', category: 'Prestige' },
  { name: 'Armand de Brignac (Ace of Spades)', price: '€800–2000', category: 'Ultra Prestige' },
];

export default async function BottlePricesPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === 'it';
  const lp = isIt ? '/it' : '';

  const venuesWithPrices = mockVenues.filter(v => bottleData[v.id]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: isIt ? 'Quanto costa una bottiglia in discoteca a Milano?' : 'How much does a bottle cost at a Milan nightclub?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isIt
            ? 'Una bottiglia standard (vodka, rum) costa da €120 a €200 nei club di Milano. Champagne entry level (Moët) da €200 a €350. Champagne premium (Dom Pérignon) da €500 a €900. Armani Privé e Just Me Milano hanno i prezzi più alti.'
            : 'A standard bottle (vodka, rum) costs €120–200 at Milan clubs. Entry-level champagne (Moët) from €200–350. Premium champagne (Dom Pérignon) from €500–900. Armani Privé and Just Me Milano have the highest prices.',
        },
      },
      {
        '@type': 'Question',
        name: isIt ? 'Quanto è il minimo di spesa per un tavolo VIP a Milano?' : 'What is the minimum spend for a VIP table in Milan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isIt
            ? 'Il minimo di spesa per un tavolo VIP varia da €200 (Play Club, infrasettimanale) a €1000+ (Armani Privé, weekend). Just Me Milano parte da €320 in settimana e €500 nel weekend. Di solito include una o più bottiglie base.'
            : 'Minimum spend for a VIP table ranges from €200 (Play Club, weekday) to €1000+ (Armani Privé, weekends). Just Me Milano starts at €320 weekdays and €500 weekends. Usually includes one or more base bottles.',
        },
      },
      {
        '@type': 'Question',
        name: isIt ? 'Il servizio bottiglia è obbligatorio con il tavolo?' : 'Is bottle service mandatory with a VIP table?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isIt
            ? 'Sì, nella quasi totalità dei club di Milano il tavolo VIP include un "minimo di spesa" da soddisfare in bottiglie e consumazioni. Non puoi prenotare un tavolo e non ordinare bottiglie — il minimo è la garanzia per il locale.'
            : "Yes, in nearly all Milan clubs a VIP table includes a minimum spend to be met in bottles and drinks. You cannot book a table without ordering bottles — the minimum spend is the venue's guarantee.",
        },
      },
    ],
  };

  const tiers = {
    luxury: isIt ? 'Lusso' : 'Luxury',
    premium: isIt ? 'Premium' : 'Premium',
    mid: isIt ? 'Mid-Range' : 'Mid-Range',
  };

  const tierColors = {
    luxury: 'text-champagne border-champagne/40',
    premium: 'text-white/80 border-white/30',
    mid: 'text-white/40 border-white/20',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="flex-1 bg-[#131009] w-full pt-20 pb-20">
        {/* Breadcrumb */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-white/40">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <Link href={isIt ? '/it' : '/'} className="hover:text-champagne transition-colors">Home</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="text-champagne" aria-current="page">{isIt ? 'Prezzi Bottiglie' : 'Bottle Prices'}</li>
            </ol>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-champagne tracking-tight mb-6">
            {isIt ? 'Prezzi Bottiglie Milano 2026' : 'Milan Bottle Prices 2026'}
          </h1>
          <p className="text-xl text-white/40 font-light leading-relaxed mb-8 max-w-3xl">
            {isIt
              ? 'Il listino prezzi aggiornato per bottiglie e tavoli VIP nei principali club di Milano. Prezzi indicativi — contattaci per preventivi precisi e personalizzati.'
              : 'The updated price list for bottles and VIP tables at Milan\'s top clubs. Indicative prices — contact us for exact personalised quotes.'}
          </p>

          {/* Quick Answer */}
          <div className="p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04] mb-8 max-w-2xl">
            <p className="font-sans text-champagne/60 text-[9px] tracking-[0.3em] uppercase mb-3">Quick Answer</p>
            <p className="font-sans text-white/70 text-sm leading-relaxed">
              {isIt
                ? 'Bottiglia standard a Milano: €120–200. Champagne entry (Moët): €200–350. Dom Pérignon: €500–900. Tavolo VIP da €200 (Play Club) a €1000+ (Armani Privé). Servizio gratuito, preventivo in 10 min: WhatsApp +39 351 912 7047.'
                : 'Standard bottle in Milan: €120–200. Entry champagne (Moët): €200–350. Dom Pérignon: €500–900. VIP table from €200 (Play Club) to €1000+ (Armani Privé). Free service, quote in 10 min: WhatsApp +39 351 912 7047.'}
            </p>
          </div>

          {/* Disclaimer */}
          <p className="text-white/40 text-xs italic mb-12">
            {isIt
              ? '* Prezzi indicativi 2026. I prezzi effettivi variano in base alla data, all\'evento e alla disponibilità. Contattaci per il prezzo esatto.'
              : '* Indicative 2026 prices. Actual prices vary by date, event and availability. Contact us for the exact price.'}
          </p>
        </section>

        {/* Per-Venue Price Tables */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <h2 className="font-serif text-3xl text-white mb-10">
            {isIt ? 'Prezzi per Locale' : 'Prices by Venue'}
          </h2>

          <div className="space-y-8">
            {venuesWithPrices.map(venue => {
              const data = bottleData[venue.id];
              if (!data) return null;
              const venueName = venue.localizedContent.name[isIt ? 'it' : 'en'] || venue.localizedContent.name.en;
              const venueSlug = isIt && venue.slugs.it ? venue.slugs.it : venue.slugs.en;

              return (
                <div key={venue.id} className="rounded-lg border border-white/10 overflow-hidden">
                  {/* Venue header */}
                  <div className="flex items-center justify-between p-5 bg-white/[0.03] border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <h3 className="font-serif text-xl text-white">{venueName}</h3>
                      <span className={`text-[9px] font-bold tracking-[0.2em] uppercase border px-2 py-0.5 rounded-full ${tierColors[data.tier]}`}>
                        {tiers[data.tier]}
                      </span>
                    </div>
                    <Link
                      href={`${lp}/clubs/${venueSlug}`}
                      className="text-champagne text-xs tracking-wider hover:underline"
                    >
                      {isIt ? 'Prenota →' : 'Book →'}
                    </Link>
                  </div>

                  {/* Price grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-white/8">
                    <div className="p-4">
                      <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">{isIt ? 'Vodka/Rum Standard' : 'Standard Vodka/Rum'}</p>
                      <p className="text-white font-semibold">{data.standardBottle}</p>
                    </div>
                    <div className="p-4">
                      <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">{isIt ? 'Vodka/Rum Premium' : 'Premium Vodka/Rum'}</p>
                      <p className="text-white font-semibold">{data.premiumBottle}</p>
                    </div>
                    <div className="p-4">
                      <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">{isIt ? 'Champagne Entry' : 'Entry Champagne'}</p>
                      <p className="text-champagne font-semibold">{data.champagneEntry}</p>
                    </div>
                    <div className="p-4">
                      <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">{isIt ? 'Champagne Premium' : 'Premium Champagne'}</p>
                      <p className="text-champagne font-semibold">{data.champagnePremium}</p>
                    </div>
                    <div className="p-4 col-span-2">
                      <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">{isIt ? 'Min. Tavolo VIP (infrasettimanale)' : 'VIP Table Min. (weekday)'}</p>
                      <p className="text-white font-semibold">{data.tableMinWeekday ?? '—'}</p>
                    </div>
                    <div className="p-4 col-span-2">
                      <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">{isIt ? 'Min. Tavolo VIP (weekend)' : 'VIP Table Min. (weekend)'}</p>
                      <p className="text-white font-semibold">{data.tableMinWeekend ?? '—'}</p>
                    </div>
                  </div>

                  {/* Best for */}
                  <div className="px-5 py-3 bg-white/[0.01] border-t border-white/8">
                    <p className="text-white/40 text-xs">
                      <span className="text-white/40 font-medium">{isIt ? 'Ideale per: ' : 'Best for: '}</span>
                      {isIt ? data.bestForIt : data.bestFor}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Common Bottles Reference */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <h2 className="font-serif text-3xl text-white mb-8">
            {isIt ? 'Prezzi di Riferimento per Bottiglia' : 'Reference Bottle Prices'}
          </h2>
          <p className="text-white/40 font-light mb-8 text-sm">
            {isIt
              ? 'Prezzi medi indicativi nei club di Milano. I prezzi variano del ±20-30% a seconda del locale.'
              : 'Average indicative prices across Milan clubs. Prices vary ±20-30% depending on venue.'}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/40 text-xs uppercase tracking-wider font-normal">{isIt ? 'Bottiglia' : 'Bottle'}</th>
                  <th className="text-left py-3 px-4 text-white/40 text-xs uppercase tracking-wider font-normal">{isIt ? 'Categoria' : 'Category'}</th>
                  <th className="text-right py-3 px-4 text-white/40 text-xs uppercase tracking-wider font-normal">{isIt ? 'Prezzo Medio' : 'Avg. Price'}</th>
                </tr>
              </thead>
              <tbody>
                {commonBottles.map((bottle, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 text-white text-sm">{bottle.name}</td>
                    <td className="py-4 px-4">
                      <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border ${
                        bottle.category === 'Standard' ? 'text-white/40 border-white/20' :
                        bottle.category === 'Premium' ? 'text-white/70 border-white/30' :
                        bottle.category === 'Ultra' ? 'text-champagne/80 border-champagne/30' :
                        bottle.category === 'Champagne' ? 'text-champagne border-champagne/50' :
                        'text-yellow-300 border-yellow-500/50'
                      }`}>
                        {bottle.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right text-champagne font-semibold">{bottle.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <h2 className="font-serif text-3xl text-white mb-8">FAQ</h2>
          <div className="space-y-6">
            {faqSchema.mainEntity.map((faq, i) => (
              <div key={i} className="border-b border-white/10 pb-6">
                <h3 className="font-sans text-base font-semibold text-white mb-3">{faq.name}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-champagne/20 bg-champagne/[0.04] p-8 text-center">
            <h2 className="font-serif text-2xl text-white mb-3">
              {isIt ? 'Preventivo Personalizzato' : 'Get a Custom Quote'}
            </h2>
            <p className="text-white/40 mb-6 text-sm font-light max-w-xl mx-auto">
              {isIt
                ? 'Dicci il locale, la data e il numero di persone. Risposta con preventivo preciso in 10 minuti. Gratis.'
                : 'Tell us the venue, date and group size. Reply with exact quote in 10 minutes. Free.'}
            </p>
            <a
              href="https://wa.me/393519127047?text=Hi%2C%20I%20want%20a%20bottle%20price%20quote%20for%20a%20Milan%20club."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-champagne text-black font-bold rounded-full hover:bg-white transition-colors text-sm uppercase tracking-wider"
            >
              WhatsApp +39 351 912 7047
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
