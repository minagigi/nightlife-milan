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
  const canonical = `${baseUrl}${isIt ? '/it' : ''}/door-policy`;

  const title = isIt
    ? 'Dress Code & Door Policy Discoteche Milano 2026 | Nightlife Milan'
    : 'Dress Code & Door Policy Milan Clubs 2026 | Nightlife Milan';
  const description = isIt
    ? 'Guida completa al dress code dei club di Milano 2026: cosa indossare, cosa evitare, età minima, selezione all\'ingresso. Just Me, Armani Privé, Play Club e tutti i principali locali.'
    : 'Complete guide to Milan club dress codes 2026: what to wear, what to avoid, minimum age, door selection. Just Me, Armani Privé, Play Club and all major venues.';

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        'en': `${baseUrl}/door-policy`,
        'it': `${baseUrl}/it/door-policy`,
        'x-default': `${baseUrl}/door-policy`,
      },
    },
    keywords: isIt
      ? ['dress code discoteche milano', 'door policy milano', 'cosa indossare club milano', 'età minima discoteche milano', 'selezione ingresso milano']
      : ['dress code milan clubs', 'door policy milan', 'what to wear milan clubs', 'minimum age milan clubs', 'door selection milan'],
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: isIt ? 'it_IT' : 'en_US',
      images: [{ url: `${baseUrl}/images/door-policy-hero.webp`, width: 1200, height: 630, alt: isIt ? 'Dress code e door policy club Milano' : 'Milan clubs dress code and door policy' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/images/door-policy-hero.webp`],
      site: '@nightlifemilan',
    },
  };
}

// Granular dress code per venue
const dressCodeData: Record<string, {
  label: string;
  labelIt: string;
  minAge: number;
  strictness: 1 | 2 | 3; // 1=relaxed, 2=smart, 3=strict
  allowed: string[];
  allowedIt: string[];
  banned: string[];
  bannedIt: string[];
  tip: string;
  tipIt: string;
}> = {
  'v-justme': {
    label: 'Strictly Elegant',
    labelIt: 'Elegante obbligatorio',
    minAge: 21,
    strictness: 3,
    allowed: ['Dress shirt (collar required)', 'Dress trousers / tailored chinos', 'Leather shoes or loafers', 'Blazer or suit jacket', 'Elegant dress or jumpsuit for women'],
    allowedIt: ['Camicia con colletto obbligatoria', 'Pantaloni eleganti o chinos sartoriali', 'Scarpe in pelle o mocassini', 'Blazer o giacca da abito', 'Vestito elegante o tuta moda per donne'],
    banned: ['Sneakers (any type)', 'T-shirts / tank tops', 'Shorts or joggers', 'Tracksuits', 'Caps or hats', 'Casual jeans (slim fit dress jeans may be allowed)'],
    bannedIt: ['Sneakers (qualsiasi tipo)', 'T-shirt / canottiere', 'Shorts o joggers', 'Tute sportive', 'Cappellini e berretti', 'Jeans casual (jeans eleganti slim potrebbero essere accettati)'],
    tip: 'Dress as if attending a luxury dinner. The security team is instructed to refuse the underdressed regardless of VIP bookings.',
    tipIt: 'Vestiti come se andassi a una cena di lusso. Il personale di sicurezza ha istruzioni di rifiutare chi è vestito in modo non appropriato, anche con tavolo prenotato.',
  },
  'v-armani-prive': {
    label: 'Black Tie Optional',
    labelIt: 'Black Tie / Elegante',
    minAge: 21,
    strictness: 3,
    allowed: ['Suits and blazers', 'Dress shirts', 'Formal trousers', 'Oxford / Derby shoes', 'Evening gowns or chic dresses for women'],
    allowedIt: ['Abiti e blazer', 'Camicie eleganti', 'Pantaloni formali', 'Scarpe Oxford/Derby', 'Abiti da sera o vestiti chic per donne'],
    banned: ['Any sneakers', 'Sportswear of any kind', 'Jeans (even premium ones)', 'T-shirts', 'Shorts', 'Hoodies'],
    bannedIt: ['Qualsiasi sneaker', 'Abbigliamento sportivo di qualsiasi tipo', 'Jeans (anche premium)', 'T-shirt', 'Shorts', 'Felpe con cappuccio'],
    tip: 'This is fashion district territory. The crowd expects and enforces the highest standard. When in doubt, overdress.',
    tipIt: 'Siamo nel quadrilatero della moda. Il pubblico si aspetta e applica gli standard più elevati. In caso di dubbio, elegante è sempre meglio.',
  },
  'v-gattopardo': {
    label: 'Chic & Elegant',
    labelIt: 'Chic & Elegante',
    minAge: 21,
    strictness: 3,
    allowed: ['Smart-elegant attire', 'Collared shirts', 'Dress trousers or smart dark jeans', 'Leather footwear', 'Chic dresses for women'],
    allowedIt: ['Abbigliamento smart-elegant', 'Camicie con colletto', 'Pantaloni eleganti o jeans scuri smart', 'Calzature in pelle', 'Abiti chic per donne'],
    banned: ['Technical sneakers', 'Sportswear', 'Shorts', 'Caps', 'Tracksuits'],
    bannedIt: ['Sneakers tecniche', 'Abbigliamento sportivo', 'Shorts', 'Cappellini', 'Tute'],
    tip: 'The deconsecrated church setting demands a respectful elegance. The international crowd here sets a naturally high bar.',
    tipIt: 'L\'ambientazione nella chiesa sconsacrata richiede un\'eleganza rispettosa. Il pubblico internazionale impone uno standard naturalmente elevato.',
  },
  'v-theclub': {
    label: 'Smart Casual',
    labelIt: 'Smart Casual',
    minAge: 18,
    strictness: 2,
    allowed: ['Collared shirts or clean plain T-shirts', 'Dark jeans or chinos', 'Clean leather sneakers (minimal branding)', 'Loafers', 'Smart casual dresses for women'],
    allowedIt: ['Camicie o t-shirt pulite e senza scritte', 'Jeans scuri o chinos', 'Sneakers in pelle pulite (minimal branding)', 'Mocassini', 'Abiti casual chic per donne'],
    banned: ['Tracksuits', 'Hoodies', 'Tank tops', 'Dirty or torn clothing', 'Heavy sportswear'],
    bannedIt: ['Tute sportive', 'Felpe con cappuccio', 'Canottiere', 'Abiti sporchi o strappati', 'Sportswear pesante'],
    tip: 'Commercial music nights attract a mixed crowd. A smart casual look with dark jeans and a clean shirt will get you in easily.',
    tipIt: 'Le serate commercial attirano un pubblico misto. Un look smart casual con jeans scuri e camicia pulita è sufficiente.',
  },
  'v-playclub': {
    label: 'Urban Chic',
    labelIt: 'Urban Chic',
    minAge: 18,
    strictness: 2,
    allowed: ['Urban streetwear (clean, no logos)', 'Fashion sneakers (Jordans, Air Force OK)', 'Dark jeans or joggers (fashion, not sports)', 'Hoodies (clean, no print)', 'Trendy outfits for women'],
    allowedIt: ['Streetwear urban (pulito, senza loghi)', 'Sneakers fashion (Jordans, Air Force OK)', 'Jeans scuri o joggers (fashion, non sportivi)', 'Felpe (pulite, senza stampe)', 'Outfit trendy per donne'],
    banned: ['Jerseys or football shirts', 'Heavily branded sportswear', 'Cargo pants in bad condition', 'Visible underwear'],
    bannedIt: ['Maglie da calcio o basket', 'Sportswear molto brandizzato', 'Cargo pants in cattive condizioni', 'Biancheria intima visibile'],
    tip: 'Play Club leans toward the urban/hip-hop crowd. Fashion streetwear is welcome, but keep it clean and intentional.',
    tipIt: 'Play Club è orientato al pubblico urban/hip-hop. Lo streetwear fashion è benvenuto, ma deve essere pulito e intenzionale.',
  },
  'v-volt': {
    label: 'Techno Casual',
    labelIt: 'Techno Casual',
    minAge: 18,
    strictness: 1,
    allowed: ['All-black outfits', 'Industrial / dark aesthetics', 'Sneakers all types', 'Boots', 'Minimal casual clothing'],
    allowedIt: ['Outfit total black', 'Estetica industrial / dark', 'Sneakers di qualsiasi tipo', 'Stivali', 'Abbigliamento casual minimal'],
    banned: ['Overly flashy or luxury branded clothing', 'Football jerseys'],
    bannedIt: ['Abbigliamento troppo lussuoso o brandizzato', 'Maglie da calcio'],
    tip: 'Volt follows the Berlin techno ethos: dress to dance, not to impress. All-black minimal is the unwritten uniform.',
    tipIt: 'Volt segue l\'etica techno berlinese: vestiti per ballare, non per impressionare. Il total black minimal è l\'uniforme non scritta.',
  },
  'v-hollywood': {
    label: 'Smart Casual',
    labelIt: 'Smart Casual',
    minAge: 18,
    strictness: 2,
    allowed: ['Collared shirts', 'Dark jeans', 'Leather sneakers', 'Smart-casual dresses'],
    allowedIt: ['Camicie con colletto', 'Jeans scuri', 'Sneakers in pelle', 'Abiti smart-casual'],
    banned: ['Tracksuits', 'Shorts', 'Football shirts', 'Heavy sportswear'],
    bannedIt: ['Tute', 'Shorts', 'Maglie da calcio', 'Sportswear pesante'],
    tip: 'Mixed Latin and commercial nights — smart casual is the sweet spot. Avoid being the most underdressed person in the room.',
    tipIt: 'Serate Latin e commercial miste — smart casual è il punto di equilibrio. Evita di essere la persona vestita peggio nella stanza.',
  },
};

const strictnessLabels = {
  1: { en: 'Relaxed', it: 'Rilassato', color: 'text-green-400 border-green-700' },
  2: { en: 'Smart', it: 'Smart', color: 'text-yellow-400 border-yellow-700' },
  3: { en: 'Strict', it: 'Rigoroso', color: 'text-red-400 border-red-700' },
};

const generalRules = [
  {
    rule: 'No sneakers at luxury clubs',
    ruleIt: 'Niente sneakers nei club di lusso',
    detail: 'Just Me, Armani Privé, Gattopardo have absolute bans on all types of sneakers.',
    detailIt: 'Just Me, Armani Privé, Gattopardo hanno divieti assoluti su qualsiasi tipo di sneakers.',
  },
  {
    rule: 'No sportswear anywhere',
    ruleIt: 'Niente sportswear da nessuna parte',
    detail: 'Tracksuits, football jerseys, gym wear and hoodies are refused at all premium venues.',
    detailIt: 'Tute, maglie da calcio, abbigliamento da palestra e felpe sono rifiutati in tutti i locali premium.',
  },
  {
    rule: 'ID required everywhere',
    ruleIt: 'Documento richiesto ovunque',
    detail: 'Minimum age is 18 across all venues. Luxury clubs (Just Me, Armani Privé) prefer 21+.',
    detailIt: 'Età minima 18 anni in tutti i locali. I club di lusso (Just Me, Armani Privé) preferiscono 21+.',
  },
  {
    rule: 'VIP table ≠ guaranteed entry with wrong attire',
    ruleIt: 'Tavolo VIP ≠ ingresso garantito con abbigliamento sbagliato',
    detail: 'Even with a confirmed VIP booking, entry can be refused for dress code violations.',
    detailIt: 'Anche con una prenotazione VIP confermata, l\'ingresso può essere rifiutato per violazioni del dress code.',
  },
  {
    rule: 'Arrive before midnight for easier entry',
    ruleIt: 'Arriva prima di mezzanotte per un ingresso più facile',
    detail: 'Door staff are more selective after 1 AM when the venue reaches capacity. Arrive between 23:00-00:30.',
    detailIt: 'Il personale all\'ingresso è più selettivo dopo l\'1:00 quando il locale è al completo. Arriva tra le 23:00 e le 00:30.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the dress code for Milan nightclubs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Milan has strict dress codes. Luxury clubs (Just Me, Armani Privé, Gattopardo) require elegant attire: collared shirts for men, no sneakers, no sportswear. Smart casual clubs (Play Club, The Club, Hollywood) allow dark jeans and leather sneakers. Techno venues (Volt) are more relaxed with an all-black aesthetic.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I wear sneakers to a Milan club?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on the venue. At Just Me, Armani Privé and Gattopardo, all sneakers are banned. At mid-tier clubs like Play Club or Hollywood, clean leather sneakers or fashion sneakers (Jordans, Air Force) are usually allowed. At Volt, any sneakers are fine.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum age for Milan clubs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The legal drinking age in Italy is 18. Most venues admit from 18+ with valid ID. Luxury clubs (Just Me, Armani Privé) prefer 21+ or even 25+ crowds. Always carry a valid photo ID.',
      },
    },
  ],
};

export default async function DoorPolicyPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === 'it';
  const lp = isIt ? '/it' : '';

  const venuesWithPolicy = mockVenues.filter(v => dressCodeData[v.id]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="flex-1 bg-[#131009] w-full pt-20 pb-20">
        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-white/40">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <Link href={isIt ? '/it' : '/'} className="hover:text-champagne transition-colors">Home</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="text-champagne" aria-current="page">{isIt ? 'Dress Code & Door Policy' : 'Dress Code & Door Policy'}</li>
            </ol>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-champagne tracking-tight mb-6">
            {isIt ? 'Dress Code & Door Policy' : 'Dress Code & Door Policy'}
          </h1>
          <p className="text-xl text-white/40 font-light leading-relaxed mb-8 max-w-3xl">
            {isIt
              ? 'Milano ha uno dei dress code più rigorosi d\'Europa. Questa guida ti prepara per ogni locale — dall\'eleganza obbligatoria di Just Me alla libertà techno di Volt.'
              : "Milan has one of Europe's strictest dress codes. This guide prepares you for every venue — from Just Me's mandatory elegance to Volt's techno freedom."}
          </p>

          {/* Quick Answer */}
          <div className="p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04] mb-12 max-w-2xl">
            <p className="font-sans text-champagne/60 text-[9px] tracking-[0.3em] uppercase mb-3">Quick Answer</p>
            <p className="font-sans text-white/70 text-sm leading-relaxed">
              {isIt
                ? 'Regola base: nei club di lusso (Just Me, Armani Privé, Gattopardo) elegante obbligatorio, no sneakers, no tute. Nei club smart-casual (Play Club, The Club) jeans scuri e sneakers in pelle vanno bene. Età minima 18 anni ovunque, 21+ nei top club.'
                : 'Basic rule: at luxury clubs (Just Me, Armani Privé, Gattopardo) elegant is mandatory, no sneakers, no tracksuits. At smart-casual clubs (Play Club, The Club) dark jeans and leather sneakers are fine. Min age 18 everywhere, 21+ at top clubs.'}
            </p>
          </div>
        </section>

        {/* General Rules */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h2 className="font-serif text-2xl text-white mb-8 pb-4 border-b border-white/10">
            {isIt ? 'Regole Generali' : 'General Rules'}
          </h2>
          <div className="space-y-4">
            {generalRules.map((rule, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl border border-white/8 bg-white/[0.02]">
                <div className="w-6 h-6 rounded-full bg-champagne/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-champagne text-xs font-bold">{i + 1}</span>
                </div>
                <div>
                  <p className="font-semibold text-white text-sm mb-1">{isIt ? rule.ruleIt : rule.rule}</p>
                  <p className="text-white/40 text-sm leading-relaxed">{isIt ? rule.detailIt : rule.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Per-Venue Dress Code */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h2 className="font-serif text-2xl text-white mb-8 pb-4 border-b border-white/10">
            {isIt ? 'Dress Code per Locale' : 'Dress Code by Venue'}
          </h2>

          <div className="space-y-6">
            {venuesWithPolicy.map(venue => {
              const data = dressCodeData[venue.id];
              if (!data) return null;
              const venueName = venue.localizedContent.name[isIt ? 'it' : 'en'] || venue.localizedContent.name.en;
              const venueSlug = isIt && venue.slugs.it ? venue.slugs.it : venue.slugs.en;
              const strictness = strictnessLabels[data.strictness];

              return (
                <div key={venue.id} className="rounded-lg border border-white/10 overflow-hidden">
                  <div className="flex items-center justify-between p-5 bg-white/[0.03] border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <h3 className="font-serif text-lg text-white">{venueName}</h3>
                      <span className={`text-[9px] font-bold tracking-[0.2em] uppercase border px-2 py-0.5 rounded-full ${strictness.color}`}>
                        {isIt ? strictness.it : strictness.en}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-white/40 text-xs">{isIt ? `Min. ${data.minAge} anni` : `Min. ${data.minAge}+`}</span>
                      <Link href={`${lp}/clubs/${venueSlug}`} className="text-champagne text-xs hover:underline">
                        {isIt ? 'Dettagli →' : 'Details →'}
                      </Link>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/8">
                    {/* Allowed */}
                    <div className="p-5">
                      <p className="text-green-400 text-[10px] font-bold tracking-widest uppercase mb-3">
                        ✓ {isIt ? 'Consentito' : 'Allowed'}
                      </p>
                      <ul className="space-y-1.5">
                        {(isIt ? data.allowedIt : data.allowed).map((item, i) => (
                          <li key={i} className="text-white/70 text-sm flex items-start gap-2">
                            <span className="text-green-500 mt-0.5 flex-shrink-0">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Banned */}
                    <div className="p-5">
                      <p className="text-red-400 text-[10px] font-bold tracking-widest uppercase mb-3">
                        ✗ {isIt ? 'Vietato' : 'Banned'}
                      </p>
                      <ul className="space-y-1.5">
                        {(isIt ? data.bannedIt : data.banned).map((item, i) => (
                          <li key={i} className="text-white/70 text-sm flex items-start gap-2">
                            <span className="text-red-500 mt-0.5 flex-shrink-0">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Insider tip */}
                  <div className="px-5 py-4 bg-champagne/[0.03] border-t border-white/8">
                    <p className="text-[10px] text-champagne/60 font-bold tracking-widest uppercase mb-1">
                      {isIt ? 'Insider Tip' : 'Insider Tip'}
                    </p>
                    <p className="text-white/40 text-sm leading-relaxed">{isIt ? data.tipIt : data.tip}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h2 className="font-serif text-2xl text-white mb-8 pb-4 border-b border-white/10">FAQ</h2>
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
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-champagne/20 bg-champagne/[0.04] p-8 text-center">
            <h2 className="font-serif text-2xl text-white mb-3">
              {isIt ? 'Non sei sicuro del dress code?' : "Not sure about the dress code?"}
            </h2>
            <p className="text-white/40 mb-6 text-sm font-light">
              {isIt
                ? 'Scrivici su WhatsApp. Ti diciamo esattamente cosa mettere per il locale che hai scelto.'
                : "Message us on WhatsApp. We'll tell you exactly what to wear for your chosen venue."}
            </p>
            <a
              href="https://wa.me/393519127047?text=Hi%2C%20I%20have%20a%20question%20about%20the%20dress%20code%20for%20a%20Milan%20club."
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
