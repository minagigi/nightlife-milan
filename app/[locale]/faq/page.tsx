import { Metadata } from 'next';
import Link from 'next/link';

export const revalidate = 86400;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === 'it';
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const canonical = `${baseUrl}${isIt ? '/it' : ''}/faq`;

  const title = isIt
    ? 'FAQ Vita Notturna Milano 2026 | Domande Frequenti | Nightlife Milan'
    : 'Milan Nightlife FAQ 2026 | Frequently Asked Questions | Nightlife Milan';
  const description = isIt
    ? 'Tutte le risposte sulle discoteche di Milano: prezzi tavoli VIP, dress code, guestlist, età minima, orari, prenotazioni. La guida completa per uscire a Milano nel 2026.'
    : 'All answers about Milan nightclubs: VIP table prices, dress code, guestlist, minimum age, opening hours, bookings. The complete guide to going out in Milan in 2026.';

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        'en': `${baseUrl}/faq`,
        'it': `${baseUrl}/it/faq`,
        'x-default': `${baseUrl}/faq`,
      },
    },
    keywords: isIt
      ? ['faq vita notturna milano', 'domande discoteche milano', 'prezzi tavoli vip milano', 'dress code milano', 'guestlist milano', 'età minima club milano']
      : ['milan nightlife faq', 'milan club questions', 'vip table prices milan', 'dress code milan clubs', 'guestlist milan', 'minimum age milan clubs'],
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: isIt ? 'it_IT' : 'en_US',
      images: [{ url: `${baseUrl}/images/faq-hero.webp`, width: 1200, height: 630, alt: isIt ? 'FAQ vita notturna Milano' : 'Milan nightlife FAQ' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/images/faq-hero.webp`],
      site: '@nightlifemilan',
    },
  };
}

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === 'it';
  const lp = isIt ? '/it' : '';

  const faqCategories = [
    {
      category: isIt ? 'Prenotazioni & Accesso' : 'Bookings & Entry',
      faqs: [
        {
          q: isIt ? 'Come si prenota un tavolo VIP a Milano?' : 'How do I book a VIP table in Milan?',
          a: isIt
            ? 'Il modo più rapido è WhatsApp al +39 351 912 7047. Dicci il locale, la data, il numero di persone e il budget. Risposta garantita in 10 minuti. Il servizio è completamente gratuito — guadagniamo una commissione dal locale, non da te.'
            : 'The fastest way is WhatsApp at +39 351 912 7047. Tell us the venue, date, group size and budget. Reply guaranteed in 10 minutes. The service is completely free — we earn a commission from the venue, not from you.',
        },
        {
          q: isIt ? "Quanto costa una prenotazione tramite Nightlife Milan?" : 'How much does a booking through Nightlife Milan cost?',
          a: isIt
            ? 'Il nostro servizio è gratuito al 100%. Non aggiungiamo costi extra rispetto al prezzo concordato con il locale. Guadagniamo una commissione dal club quando porti il tuo gruppo — tu non paghi nulla di più.'
            : '100% free. We add no extra costs on top of the venue\'s price. We earn a commission from the club when you bring your group — you pay nothing extra.',
        },
        {
          q: isIt ? 'Qual è la differenza tra guestlist e tavolo VIP?' : 'What is the difference between guestlist and VIP table?',
          a: isIt
            ? 'La guestlist garantisce l\'ingresso (spesso gratuito o ridotto) ma non include posto a sedere — stai in piedi. Il tavolo VIP include posto riservato, servizio bottiglie e una hostess dedicata. Per gruppi di 4+ persone, il tavolo VIP è quasi sempre la scelta migliore.'
            : 'Guestlist guarantees entry (often free or reduced) but no seating — you stand. VIP table includes reserved seating, bottle service and a dedicated hostess. For groups of 4+ people, VIP table is almost always the better choice.',
        },
        {
          q: isIt ? 'Con quanto anticipo devo prenotare?' : 'How far in advance should I book?',
          a: isIt
            ? 'Per i weekend normali, 24-48 ore sono sufficienti. Per eventi speciali (Fashion Week, Capodanno, serate con DJ internazionali), consigliamo almeno 1-2 settimane prima. Contattaci comunque anche all\'ultimo minuto — spesso riusciamo a trovare soluzioni.'
            : 'For regular weekends, 24-48 hours is sufficient. For special events (Fashion Week, New Year\'s Eve, international DJs), we recommend at least 1-2 weeks in advance. Contact us last minute anyway — we often find solutions.',
        },
        {
          q: isIt ? "Cosa succede se cambio idea dopo la prenotazione?" : "What if I change my mind after booking?",
          a: isIt
            ? 'Dipende dal locale e dall\'anticipo. In generale, le cancellazioni oltre 48 ore prima sono gratuite. Per serate speciali, i tavoli possono avere una caparra non rimborsabile. Ti informeremo sempre della policy prima di confermare.'
            : 'It depends on the venue and timing. Generally, cancellations more than 48 hours in advance are free. For special nights, tables may have a non-refundable deposit. We always inform you of the policy before confirming.',
        },
      ],
    },
    {
      category: isIt ? 'Prezzi & Pagamenti' : 'Prices & Payments',
      faqs: [
        {
          q: isIt ? 'Quanto costa un tavolo VIP a Milano?' : 'How much does a VIP table cost in Milan?',
          a: isIt
            ? 'I prezzi variano molto per locale. Just Me Milano: da €320 per la settimana, da €500 il weekend. Pineta Club: da €300. Play Club: da €200. Armani Privé: da €1.000. Voya Rooftop: cena da €60/persona. I prezzi includono di solito una o più bottiglie di base.'
            : 'Prices vary widely by venue. Just Me Milano: from €320 weekdays, from €500 weekends. Pineta Club: from €300. Play Club: from €200. Armani Privé: from €1,000. Voya Rooftop: dinner from €60/person. Prices usually include one or more base bottles.',
        },
        {
          q: isIt ? 'Quali metodi di pagamento accettano i club?' : 'What payment methods do clubs accept?',
          a: isIt
            ? 'La maggior parte dei club a Milano accetta contanti e carte di credito/debito. Alcuni accettano anche Apple Pay e Google Pay. Non tutti accettano American Express. È sempre meglio avere contanti come backup, specialmente per il pagamento al tavolo.'
            : 'Most Milan clubs accept cash and credit/debit cards. Some also accept Apple Pay and Google Pay. Not all accept American Express. It\'s always good to have cash as backup, especially for table payments.',
        },
        {
          q: isIt ? "L'ingresso è gratuito con la guestlist?" : 'Is entry free with guestlist?',
          a: isIt
            ? 'Dipende dal locale e dal giorno. Nei giorni infrasettimanali (lunedì-giovedì), la guestlist è spesso gratuita. Il venerdì e sabato, la guestlist può essere gratuita (entro una certa ora) o ridotta rispetto al prezzo pieno. Ti confermeremo sempre le condizioni prima.'
            : 'It depends on the venue and day. On weekdays (Mon-Thu), guestlist is often free. On Friday and Saturday, guestlist may be free (before a certain time) or reduced vs. full price. We always confirm conditions before.',
        },
        {
          q: isIt ? 'Quanto costano le bottiglie nei club di Milano?' : 'How much do bottles cost in Milan clubs?',
          a: isIt
            ? 'Prezzi indicativi: Vodka/Rum standard (es. Smirnoff) da €120-180. Vodka premium (Belvedere, Grey Goose) da €180-280. Champagne (Moët) da €200-350. Champagne luxury (Dom Pérignon, Cristal) da €500+. I prezzi variano molto per locale — contattaci per preventivi precisi.'
            : 'Indicative prices: Standard vodka/rum (e.g. Smirnoff) from €120-180. Premium vodka (Belvedere, Grey Goose) from €180-280. Champagne (Moët) from €200-350. Luxury champagne (Dom Pérignon, Cristal) from €500+. Prices vary widely — contact us for exact quotes.',
        },
      ],
    },
    {
      category: isIt ? 'Dress Code & Accesso' : 'Dress Code & Door Policy',
      faqs: [
        {
          q: isIt ? "Qual è il dress code per i club di Milano?" : "What is the dress code for Milan clubs?",
          a: isIt
            ? 'Milano ha uno dei dress code più rigorosi in Europa. I club di lusso (Just Me, Armani Privé, Gattopardo) richiedono abbigliamento elegante obbligatorio: pantaloni lunghi per uomo, no sneakers tecniche, no cappelli, no tute. I club più giovani (Play Club, Repvblic) accettano uno stile smart casual o urban chic.'
            : 'Milan has one of the strictest dress codes in Europe. Luxury clubs (Just Me, Armani Privé, Gattopardo) require strictly elegant attire: long trousers for men, no technical sneakers, no caps, no tracksuits. Younger clubs (Play Club, Repvblic) accept smart casual or urban chic.',
        },
        {
          q: isIt ? "Posso entrare in sneakers?" : "Can I get in wearing sneakers?",
          a: isIt
            ? 'Dipende dal tipo di sneakers e dal locale. Le sneakers eleganti in pelle (es. Common Projects, New Balance in pelle) sono accettate in molti club. Sneakers da running, tecniche o sportive (Nike Air, Adidas ultraboost) sono vietate nei club di lusso. In caso di dubbio, opta per scarpe in pelle o mocassini.'
            : 'It depends on the sneaker type and venue. Elegant leather sneakers (e.g. Common Projects, leather New Balance) are accepted in many clubs. Running or technical sneakers (Nike Air, Adidas ultraboost) are banned in luxury clubs. When in doubt, opt for leather shoes or loafers.',
        },
        {
          q: isIt ? 'Qual è l\'età minima per entrare nei club di Milano?' : "What is the minimum age to enter Milan clubs?",
          a: isIt
            ? 'In Italia, l\'età legale per bere alcolici è 18 anni. La maggior parte dei club applica un limite minimo di 18 anni. I club di lusso (Just Me, Armani Privé) spesso preferiscono un pubblico 21+ o addirittura 25+. Porta sempre un documento di identità valido con foto.'
            : 'In Italy, the legal drinking age is 18. Most clubs have a minimum age of 18. Luxury clubs (Just Me, Armani Privé) often prefer a 21+ or even 25+ crowd. Always bring a valid photo ID.',
        },
        {
          q: isIt ? "Il tavolo VIP garantisce l'ingresso?" : 'Does a VIP table guarantee entry?',
          a: isIt
            ? 'Sì, avere un tavolo VIP confermato garantisce quasi sempre l\'ingresso, indipendentemente dalla coda o dalla selezione. Dovrai comunque rispettare il dress code — anche con tavolo, possono rifiutare l\'accesso per abbigliamento inappropriato.'
            : "Yes, having a confirmed VIP table almost always guarantees entry, regardless of the queue or door selection. You still need to comply with the dress code — even with a table, entry can be refused for inappropriate attire.",
        },
      ],
    },
    {
      category: isIt ? 'Orari & Logistica' : 'Opening Hours & Logistics',
      faqs: [
        {
          q: isIt ? 'A che ora aprono i club di Milano?' : 'What time do Milan clubs open?',
          a: isIt
            ? "L'aperitivo inizia dalle 19:00-19:30 in bar e rooftop (Voya, Pineta, 55 Milano). I club veri e propri aprono dalle 22:30-23:30 di sera. L'orario di punta è tra mezzanotte e le 3:00. Molti club restano aperti fino alle 5:00-6:00 del mattino."
            : 'Aperitivo starts from 19:00-19:30 in bars and rooftops (Voya, Pineta, 55 Milano). Proper clubs open from 22:30-23:30. Peak time is between midnight and 3:00 AM. Many clubs stay open until 5:00-6:00 AM.',
        },
        {
          q: isIt ? 'Come si arriva nei club di Milano?' : 'How do I get to Milan clubs?',
          a: isIt
            ? 'La metropolitana di Milano chiude all\'1:30 circa nei fine settimana (fino alle 2:00 il sabato). Per il rientro notturno, usa Uber o taxi (disponibili 24/7). Nelle zone centrali (Corso Como, Brera, Navigli) molti posti sono raggiungibili a piedi da diverse metro. Alcune zone (Sempione per Just Me) richiedono taxi o Uber.'
            : "Milan's metro closes around 1:30 AM on weekends (2:00 AM on Saturdays). For the ride back, use Uber or taxi (available 24/7). In central areas (Corso Como, Brera, Navigli) many spots are walkable from metro stations. Some areas (Sempione for Just Me) require taxi or Uber.",
        },
        {
          q: isIt ? "C'è il guardaroba?" : 'Is there a cloakroom?',
          a: isIt
            ? 'La maggior parte dei club di lusso a Milano ha il servizio guardaroba, spesso incluso nel prezzo del biglietto o del tavolo. Nei club di medie dimensioni, il guardaroba costa generalmente €2-5. Controlla sempre prima di portare zaini grandi — alcuni club non li accettano.'
            : "Most luxury clubs in Milan have a cloakroom service, often included in the ticket or table price. In mid-size clubs, cloakroom usually costs €2-5. Always check before bringing large backpacks — some clubs don't allow them.",
        },
      ],
    },
    {
      category: isIt ? 'Aperitivo & Ristoranti' : 'Aperitivo & Dining',
      faqs: [
        {
          q: isIt ? "Cos'è l'aperitivo a Milano?" : "What is aperitivo in Milan?",
          a: isIt
            ? "L'aperitivo milanese è un rituale serale unico: dal tramonto fino alle 21:00-22:00, i bar offrono drink (Spritz, Negroni, cocktail) con buffet di stuzzichini inclusi nel prezzo. Non è solo un drinks — è un evento sociale. Le zone migliori: Navigli, Brera, Isola. Prezzi tipici: €12-18 per drink con buffet."
            : "The Milanese aperitivo is a unique evening ritual: from sunset until 21:00-22:00, bars offer drinks (Spritz, Negroni, cocktails) with an included snack buffet. It's not just drinks — it's a social event. Best zones: Navigli, Brera, Isola. Typical prices: €12-18 per drink with buffet.",
        },
        {
          q: isIt ? "Qual è la differenza tra aperitivo e apericena?" : "What is the difference between aperitivo and apericena?",
          a: isIt
            ? "L'aperitivo è drink + snack leggeri. L'apericena (portmanteau di 'aperitivo' e 'cena') è drink + cibo abbondante che sostituisce la cena. Posti come 55 Milano e Pineta fanno dell'apericena la loro proposta principale: paghi il drink e mangi fino a saziarti."
            : "Aperitivo is drinks + light snacks. Apericena (portmanteau of 'aperitivo' and 'cena'/dinner) is drinks + abundant food that replaces dinner. Places like 55 Milano and Pineta make apericena their main offer: pay for the drink and eat your fill.",
        },
      ],
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqCategories.flatMap(cat =>
      cat.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      }))
    ),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="flex-1 bg-[#131009] w-full pt-20 pb-20">
        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-white/40" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <Link href={isIt ? '/it' : '/'} className="hover:text-champagne transition-colors">Home</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="text-champagne" aria-current="page">FAQ</li>
            </ol>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-champagne tracking-tight mb-6">
            {isIt ? 'Domande Frequenti' : 'Frequently Asked Questions'}
          </h1>
          <p className="text-xl text-white/40 font-light leading-relaxed mb-8">
            {isIt
              ? 'Tutto quello che devi sapere prima di uscire a Milano: prenotazioni, prezzi, dress code, orari e molto altro.'
              : 'Everything you need to know before going out in Milan: bookings, prices, dress code, opening hours and much more.'}
          </p>

          {/* Quick Answer */}
          <div className="p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04] mb-12">
            <p className="font-sans text-champagne/60 text-[9px] tracking-[0.3em] uppercase mb-3">Quick Answer</p>
            <p className="font-sans text-white/70 text-sm leading-relaxed">
              {isIt
                ? 'Per prenotare: WhatsApp +39 351 912 7047 (risposta in 10 min, servizio gratuito). Dress code: elegante obbligatorio per i club di lusso, no sneakers tecniche. Età minima: 18 anni (21+ per i locali top). Orari: aperitivo dalle 19:00, club dalle 22:30-23:30, chiusura alle 5:00-6:00.'
                : 'To book: WhatsApp +39 351 912 7047 (reply in 10 min, free service). Dress code: elegant mandatory for luxury clubs, no technical sneakers. Min age: 18 (21+ for top venues). Hours: aperitivo from 19:00, clubs from 22:30-23:30, closing at 5:00-6:00 AM.'}
            </p>
          </div>

          {/* Jump links */}
          <div className="flex flex-wrap gap-2 mb-12">
            {faqCategories.map(cat => (
              <a
                key={cat.category}
                href={`#${cat.category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                className="px-4 py-2 rounded-full border border-white/15 text-white/60 text-xs tracking-wider hover:border-champagne/40 hover:text-champagne transition-colors"
              >
                {cat.category}
              </a>
            ))}
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {faqCategories.map(cat => (
            <div key={cat.category} id={cat.category.toLowerCase().replace(/[^a-z0-9]/g, '-')}>
              <h2 className="font-serif text-2xl text-white mb-8 pb-4 border-b border-white/10">
                {cat.category}
              </h2>
              <div className="space-y-6">
                {cat.faqs.map((faq, i) => (
                  <div key={i} className="group">
                    <h3 className="font-sans text-base font-semibold text-white mb-3 group-hover:text-champagne transition-colors">
                      {faq.q}
                    </h3>
                    <p className="text-white/40 leading-relaxed text-sm font-light">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Still have questions */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="rounded-lg border border-champagne/20 bg-champagne/[0.04] p-8 text-center">
            <h2 className="font-serif text-2xl text-white mb-3">
              {isIt ? 'Hai altre domande?' : 'Still have questions?'}
            </h2>
            <p className="text-white/40 mb-6 text-sm font-light">
              {isIt
                ? 'Il nostro concierge risponde entro 10 minuti, 7 giorni su 7.'
                : 'Our concierge replies within 10 minutes, 7 days a week.'}
            </p>
            <a
              href="https://wa.me/393519127047"
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
