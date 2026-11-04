import EditorialPageSections from '@/components/EditorialPageSections';
import type { LocaleCode } from '@/lib/i18n/locales';
import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';
import { tr } from '@/lib/i18n/t';
import { getLocaleDef, hreflangAlternates, localePrefix } from '@/lib/i18n/locales';
import { seoRobots, seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { Sparkles, PartyPopper, Crown, Users, MessageCircle, CheckCircle2 } from 'lucide-react';
import { VipQuoteCalculator, PrioritySixShowcase } from '@/components/NightlifeExpansionModules';

export const revalidate = 3600;

const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = `${baseUrl}${localePrefix(locale)}/private-parties`;

  const title = seoTitle(
    tr(
      locale,
      'Graduation, 18th Birthday, Bachelorette & Corporate Parties in Milan 2026/2027 | Turnkey VIP Packages',
      'Feste di Laurea, 18 Anni, Addio al Nubilato ed Eventi Aziendali Milano 2026/2027 | Pacchetti in Discoteca e Rooftop'
    )
  );
  const description = withWhatsApp(
    tr(
      locale,
      'Organize your graduation party, 18th/30th birthday, bachelorette or corporate event in Milan’s top clubs & rooftops (Just Me, Pineta, Aria, 55 Milano, Voya). Packages from €25/person.',
      'Organizza la tua festa di laurea, 18esimo/30esimo compleanno, addio al nubilato o evento aziendale nei migliori club e rooftop di Milano (Just Me, Pineta, Aria, 55 Milano, Voya). Da €25/persona.'
    ),
    locale
  );

  return {
    title,
    description,
    robots: seoRobots(locale),
    alternates: {
      canonical,
      languages: hreflangAlternates(baseUrl, '/private-parties'),
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
          url: `${baseUrl}/images/bottle-service-milan-vip-nightclub.webp`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export default async function PrivatePartiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isIt = locale === 'it';
  const lp = localePrefix(locale);

  const packages = [
    {
      badgeEn: 'Formula #1 · Best Value (15–80 Guests)',
      badgeIt: 'Formula #1 · Più Richiesta per Lauree (15–80 Ospiti)',
      titleEn: 'Reserved Royal Aperitivo Area + Prosecco Toast + Club Night',
      titleIt: 'Area Riservata Royal Aperitivo + Brindisi Torta + Serata Club',
      priceEn: '€25 – €35 / person',
      priceIt: '€25 – €35 a persona',
      venuesEn: '55 Milano (1,600 sqm), Just Me Garden, Pineta Milano, Voya Rooftop (20th floor)',
      venuesIt: '55 Milano (1.600 mq), Just Me Garden, Pineta Milano, Voya Rooftop (20° piano)',
      includesEn: [
        'Private cordoned sofa area from 19:30 to 00:30',
        'Unlimited Royal Grand Buffet + 1 cocktail or 1 bottle of wine/Prosecco every 3–4 guests',
        'Custom cake service & sparkler toast at 22:30',
        'Free transition to the club dancefloor until 05:00 included',
      ],
      includesIt: [
        'Area divanetti riservata e transennata dalle 19:30 alle 00:30',
        'Accesso illimitato al Royal Buffet + 1 drink o 1 bottiglia di vino/Prosecco ogni 3–4 ospiti',
        'Servizio taglio torta e brindisi con fontane luminose alle 22:30',
        'Permanenza gratuita in discoteca per tutta la notte fino alle 05:00 inclusa',
      ],
    },
    {
      badgeEn: 'Formula #2 · Glamour & Bachelorette (8–40 Guests)',
      badgeIt: 'Formula #2 · Glamour & Addio al Nubilato (8–40 Ospiti)',
      titleEn: 'Seated Dinner Show + Table Transformed into Nightclub Privé',
      titleIt: 'Cena Spettacolo Servita + Tavolo che Diventa Privé Discoteca',
      priceEn: '€50 – €80 / person',
      priceIt: '€50 – €80 a persona',
      venuesEn: '55 Milano, Pineta Singing Aperitivo, Just Me Italo Rota Restaurant, Tocqueville 13, Church 81',
      venuesIt: '55 Milano, Pineta Aperitivo Cantato, Ristorante Just Me Italo Rota, Tocqueville 13, Church 81',
      includesEn: [
        '3-course seated menu with wine pairing (20:30)',
        'Live vocalist, saxophonist & sing-along entertainment during dinner',
        'Your dinner table remains your private nightclub base after midnight',
        'Optional after-dinner Vodka / Champagne bottle upgrade',
      ],
      includesIt: [
        'Menù servito a 3 portate con vino abbinato (ore 20:30)',
        'Vocalist dal vivo, sax e animazione cantata durante la cena',
        'Il tavolo della cena resta la vostra base privata anche dopo mezzanotte',
        'Possibilità di aggiungere bottiglie di superalcolico o Champagne per il dopocena',
      ],
    },
    {
      badgeEn: 'Formula #3 · Nightclub Privé & Bottle Parade (6–30 Guests)',
      badgeIt: 'Formula #3 · Tavolo VIP Dopocena & Bottle Parade (6–30 Ospiti)',
      titleEn: 'VIP Nightclub Table + Custom LED Sign + Magnum Bottle Service',
      titleIt: 'Tavolo Privé Discoteca + Lavagna LED Personalizzata + Bottle Service',
      priceEn: '€40 – €70 / person (from €250–€600/table)',
      priceIt: '€40 – €70 a persona (da €250–€600 a tavolo)',
      venuesEn: 'Just Me Milano, Pineta Milano, Aria Club, Repvblic, Hollywood, Play Club',
      venuesIt: 'Just Me Milano, Pineta Milano, Aria Club, Repvblic, Hollywood, Play Club',
      includesEn: [
        'Zero-queue VIP hostess escort at 23:30–01:00',
        '100% of table cost converted into premium bottles (Belvedere, Grey Goose, Dom Pérignon)',
        'Custom LED letterboard with graduate or birthday name + sparkler parade',
        'Dedicated waiter & security all night until 05:00',
      ],
      includesIt: [
        'Ingresso salta-fila immediato con hostess VIP tra le 23:30 e l’01:00',
        '100% dell’importo convertito in bottiglie premium (Belvedere, Grey Goose, Dom Pérignon)',
        'Lavagna luminosa LED col nome del festeggiato/laureato + sfilata stelline',
        'Cameriere dedicato e sicurezza per tutta la notte fino alle 05:00',
      ],
    },
  ];

  const faqs = [
    {
      q: isIt
        ? 'Quanto costa organizzare una festa di laurea a Milano in discoteca o rooftop?'
        : 'How much does it cost to organize a graduation party in a Milan club or rooftop?',
      a: isIt
        ? 'I pacchetti chiavi in mano partono da €25–€35 a persona per il Royal Aperitivo con area divanetti riservata, buffet, drink, brindisi torta e serata in discoteca inclusa (es. 55 Milano, Just Me, Pineta, Voya Rooftop), oppure da €40–€60 a persona per i Tavoli VIP dopocena con bottiglie.'
        : 'Turnkey packages start from €25–€35 per person for a Royal Aperitivo with a private sofa area, buffet, drinks, cake toast, and club entry included (e.g., 55 Milano, Just Me, Pineta, Voya Rooftop), or €40–€60 per person for after-dinner VIP bottle service tables.',
    },
    {
      q: isIt
        ? 'Posso portare la torta dall’esterno o ordinarla tramite il locale?'
        : 'Can I bring a cake from an outside bakery or order it through the venue?',
      a: isIt
        ? 'Entrambe le opzioni sono disponibili: puoi ordinare la torta tramite la pasticceria interna del club (con consegna diretta al tavolo e candele pirotecniche) oppure portarla da una pasticceria certificata presentando lo scontrino HACCP.'
        : 'Both options are available: you can order a custom cake through the venue’s partner pastry chef (delivered with sparkler candles) or bring one from a certified bakery with an HACCP receipt.',
    },
    {
      q: isIt
        ? 'Quali locali accettano feste dei 18 anni a Milano?'
        : 'Which clubs in Milan host 18th birthday parties?',
      a: isIt
        ? 'Per i 18esimi compleanni consigliamo 55 Milano (ampie terrazze e sale modulari), Pineta Milano, Play Club, Alcatraz e Loolapaloosa, oppure l’affitto di una sala/privé dedicato. Se tutti gli invitati hanno 18 anni compiuti con documento originale, sono accessibili tutti i club.'
        : 'For 18th birthday parties we recommend 55 Milano (spacious terraces and modular rooms), Pineta Milano, Play Club, Alcatraz, and Loolapaloosa, or renting a dedicated private room. If all guests are 18+ with original physical ID, all clubs are accessible.',
    },
  ];

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: isIt
        ? 'Organizzazione Feste di Laurea, Compleanni, 18 Anni ed Eventi Privati a Milano'
        : 'Graduation, Birthday, Bachelorette & Corporate Party Planning in Milan',
      provider: {
        '@type': 'Organization',
        name: 'Nightlife Milan Concierge',
        telephone: '+393519127047',
        email: 'concierge@nightlifemilan.com',
      },
      areaServed: 'Milan, Italy',
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

      <div data-privateparties-top-hero="true" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-champagne/30">
          <Image quality={92}
            src="/images/pillars/private-parties-hero.webp"
            alt="Milan Graduation Parties, 18th Birthdays & Private Events"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-champagne/30 bg-champagne/10 mb-5">
          <PartyPopper className="w-3.5 h-3.5 text-champagne" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-champagne">
            {isIt
              ? 'Desk Eventi Privati · Lauree · 18 Anni · Addio al Nubilato · Corporate'
              : 'Private Events Desk · Graduations · Birthdays · Bachelorette · Corporate'}
          </span>
        </div>

        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-champagne tracking-tighter mb-6">
          {isIt
            ? 'Feste di Laurea, Compleanni, 18 Anni ed Eventi Privati a Milano'
            : 'Graduation, Birthday, Bachelorette & Private Parties in Milan'}
        </h1>
        <p className="text-xl text-white/65 max-w-3xl mb-8">
          {isIt
            ? 'Pacchetti chiavi in mano nei 6 locali prioritari di Milano (Just Me, Pineta, Aria, 55 Milano, Voya Rooftop, Repvblic) senza alcun costo di agenzia: aree riservate per aperitivo e torta, cene spettacolo e privé dopocena con bottle parade.'
            : 'Turnkey packages at Milan’s Top 6 priority venues (Just Me, Pineta, Aria, 55 Milano, Voya Rooftop, Repvblic) with zero agency fees: private aperitivo & cake lounges, dinner shows, and nightclub VIP tables with sparkler parades.'}
        </p>

        {/* AI Quick Answer */}
        <div className="max-w-3xl p-6 rounded-2xl border border-champagne/25 bg-champagne/[0.04]">
          <p className="font-mono text-champagne text-[10px] tracking-[0.3em] uppercase mb-2">
            {isIt ? 'Risposta Rapida · Pacchetti Feste Milano 2026/2027' : 'Quick Answer · Milan Party Packages 2026/2027'}
          </p>
          <p className="text-sm text-white/75 leading-relaxed">
            {isIt
              ? '1. Royal Aperitivo Riservato + Brindisi Torta + Serata Club: €25–€35 a persona (ideale per lauree e compleanni da 15 a 80 ospiti da 55 Milano, Just Me, Pineta, Voya Rooftop). 2. Cena Spettacolo Servita + Tavolo Club: €50–€80 a persona. 3. Tavolo VIP Dopocena con Bottiglie e Lavagna LED: da €250–€600 a tavolo (€40–€65 a testa). Preventivo su misura in 10 minuti su WhatsApp +39 351 912 7047.'
              : '1. Reserved Royal Aperitivo + Cake Toast + Club Entry: €25–€35/person (ideal for graduations and birthdays of 15–80 guests at 55 Milano, Just Me, Pineta, Voya Rooftop). 2. Seated Dinner Show + Club Table: €50–€80/person. 3. After-Dinner VIP Bottle Table with Custom LED Sign: €250–€600/table (€40–€65/person). Custom quote in 10 minutes via WhatsApp +39 351 912 7047.'}
          </p>
        </div>
      </section>

      {/* 3 Turnkey Formulas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-8">
          {isIt ? 'Le 3 Formule Ufficiali Chiavi in Mano' : 'The 3 Official Turnkey Party Formulas'}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-7 rounded-2xl border border-white/15 bg-white/[0.025] hover:border-champagne/50 transition-all"
            >
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne/15 border border-champagne/40 text-champagne font-mono text-[10px] uppercase tracking-wider mb-4">
                  <Crown className="w-3.5 h-3.5" />
                  <span>{isIt ? pkg.badgeIt : pkg.badgeEn}</span>
                </div>
                <h3 className="font-serif text-2xl text-white mb-2">
                  {isIt ? pkg.titleIt : pkg.titleEn}
                </h3>
                <div className="font-serif text-3xl text-champagne mb-4">
                  {isIt ? pkg.priceIt : pkg.priceEn}
                </div>
                <p className="text-xs text-white/55 mb-5">
                  <strong className="text-white">{isIt ? 'Locali top:' : 'Top venues:'}</strong>{' '}
                  {isIt ? pkg.venuesIt : pkg.venuesEn}
                </p>
                <ul className="space-y-2.5 mb-8">
                  {(isIt ? pkg.includesIt : pkg.includesEn).map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-white/75">
                      <CheckCircle2 className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`https://wa.me/393519127047?text=${encodeURIComponent(
                  isIt
                    ? `Ciao Nightlife Milan! Vorrei un preventivo per "${pkg.titleIt}" (data, numero invitati e locale).`
                    : `Hi Nightlife Milan! I'd like a quote for "${pkg.titleEn}" (date, guest count, and venue).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-champagne text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isIt ? 'Richiedi Preventivo WhatsApp' : 'Request WhatsApp Quote'}</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Calculator */}
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
          {isIt ? 'Domande Frequenti su Feste di Laurea e Compleanni' : 'Private Parties & Graduations FAQ'}
        </h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <h3 className="font-serif text-lg text-white mb-2">{f.q}</h3>
              <p className="text-sm text-white/65 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
      <EditorialPageSections locale={locale as LocaleCode} path={`${lp}/private-parties`} />
    </main>
  );
}
