import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, Check, Clock, MessageCircle, Users } from 'lucide-react';
import EventCard from '@/components/EventCard';
import { CONTACT } from '@/config/contact';
import { getAllCalendarEvents, isUpcomingRome } from '@/lib/calendarEvents';
import { getLocaleDef, hreflangAlternates, localePrefix } from '@/lib/i18n/locales';
import { generateEventListSchema, getLocalizedText, jsonLdString } from '@/lib/seo';
import { seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { getEventbriteDiscoveryItems } from '@/lib/eventbriteDiscovery';

export type EventIntent = 'international' | 'university-erasmus' | '18-plus' | '21-plus';
type CoreLocale = 'en' | 'it' | 'es' | 'fr' | 'de' | 'pt';
type LocalizedCopy = Record<CoreLocale, string>;

const coreLocale = (locale: string): CoreLocale =>
  (['en', 'it', 'es', 'fr', 'de', 'pt'].includes(locale) ? locale : 'en') as CoreLocale;

const COMMON = {
  events: { en: 'Available events', it: 'Eventi disponibili', es: 'Eventos disponibles', fr: 'Evenements disponibles', de: 'Verfugbare Events', pt: 'Eventos disponiveis' },
  eventsNav: { en: 'Events', it: 'Eventi', es: 'Eventos', fr: 'Evenements', de: 'Events', pt: 'Eventos' },
  venues: { en: 'Venues and services', it: 'Locali e servizi', es: 'Locales y servicios', fr: 'Lieux et services', de: 'Clubs und Services', pt: 'Locais e servicos' },
  programme: { en: 'How the night works', it: 'Come si svolge la serata', es: 'Como funciona la noche', fr: 'Comment se deroule la soiree', de: 'So lauft der Abend ab', pt: 'Como funciona a noite' },
  faq: { en: 'Frequently asked questions', it: 'Domande frequenti', es: 'Preguntas frecuentes', fr: 'Questions frequentes', de: 'Haufige Fragen', pt: 'Perguntas frequentes' },
  quickAnswer: { en: 'Quick answer', it: 'Risposta rapida', es: 'Respuesta rapida', fr: 'Reponse rapide', de: 'Kurzantwort', pt: 'Resposta rapida' },
  details: { en: 'Details', it: 'Dettagli', es: 'Detalles', fr: 'Details', de: 'Details', pt: 'Detalhes' },
  noEvents: { en: 'No dated event is currently confirmed. Ask us for the next available night.', it: 'Nessun evento datato è al momento confermato. Chiedici la prossima serata disponibile.', es: 'No hay eventos con fecha confirmados. Preguntanos por la proxima noche disponible.', fr: 'Aucun evenement date n\'est confirme. Demandez-nous la prochaine soiree disponible.', de: 'Aktuell ist kein datiertes Event bestatigt. Fragen Sie nach dem nachsten Termin.', pt: 'Nenhum evento com data esta confirmado. Pergunte-nos pela proxima noite disponivel.' },
  confirm: { en: 'After buying, send the ticket confirmation on WhatsApp so we can verify the booking and payment.', it: 'Dopo l’acquisto, invia la conferma del biglietto su WhatsApp per verificare prenotazione e pagamento.', es: 'Tras la compra, envia la confirmacion del billete por WhatsApp para verificar reserva y pago.', fr: 'Apres l’achat, envoyez la confirmation du billet sur WhatsApp pour verifier reservation et paiement.', de: 'Senden Sie nach dem Kauf die Ticketbestatigung per WhatsApp, damit wir Buchung und Zahlung prufen konnen.', pt: 'Depois da compra, envie a confirmacao do bilhete pelo WhatsApp para verificarmos reserva e pagamento.' },
  book: { en: `Book on WhatsApp ${CONTACT.whatsapp.number}`, it: `Prenota su WhatsApp ${CONTACT.whatsapp.number}`, es: `Reserva por WhatsApp ${CONTACT.whatsapp.number}`, fr: `Reservez sur WhatsApp ${CONTACT.whatsapp.number}`, de: `Uber WhatsApp buchen: ${CONTACT.whatsapp.number}`, pt: `Reserve pelo WhatsApp ${CONTACT.whatsapp.number}` },
} satisfies Record<string, LocalizedCopy>;

const PROGRAMME_STEPS: Array<{ icon: typeof Users; time: string; copy: LocalizedCopy }> = [
  {
    icon: Users,
    time: '18:00-22:00',
    copy: {
      en: 'Aperitivo or dinner when offered by the selected venue.',
      it: 'Aperitivo o cena quando previsti dal locale selezionato.',
      es: 'Aperitivo o cena cuando los ofrece el local seleccionado.',
      fr: 'Aperitivo ou diner lorsque le lieu selectionne les propose.',
      de: 'Aperitivo oder Dinner, wenn der ausgewahlte Club dies anbietet.',
      pt: 'Aperitivo ou jantar quando oferecidos pelo local selecionado.',
    },
  },
  {
    icon: Clock,
    time: '22:00-00:30',
    copy: {
      en: 'Arrival, guest-list check, table assignment and warm-up.',
      it: 'Arrivo, controllo guest list, assegnazione tavolo e warm-up.',
      es: 'Llegada, control de lista, asignacion de mesa y warm-up.',
      fr: 'Arrivee, controle de la guest list, attribution de table et warm-up.',
      de: 'Ankunft, Gasteleistenkontrolle, Tischzuweisung und Warm-up.',
      pt: 'Chegada, verificacao da guest list, atribuicao de mesa e warm-up.',
    },
  },
  {
    icon: Check,
    time: '00:30-05:00',
    copy: {
      en: 'Main club programme, DJ set, dance floor and bottle service.',
      it: 'Programma club principale, DJ set, pista e bottle service.',
      es: 'Programa principal del club, DJ set, pista y bottle service.',
      fr: 'Programme principal du club, DJ set, piste et bottle service.',
      de: 'Hauptprogramm im Club, DJ-Set, Tanzflache und Bottle Service.',
      pt: 'Programa principal do club, DJ set, pista e bottle service.',
    },
  },
];

const FAQ_COPY = {
  minimumAge: { en: 'What is the minimum age?', it: "Qual e l'eta minima?", es: 'Cual es la edad minima?', fr: "Quel est l'age minimum ?", de: 'Wie hoch ist das Mindestalter?', pt: 'Qual e a idade minima?' },
  prices: { en: 'How do I check prices and availability?', it: 'Come verifico prezzi e disponibilita?', es: 'Como consulto precios y disponibilidad?', fr: 'Comment verifier les prix et disponibilites ?', de: 'Wie prufe ich Preise und Verfugbarkeit?', pt: 'Como verifico precos e disponibilidade?' },
  pricesAnswer: {
    en: `Open the individual event for confirmed prices or message WhatsApp ${CONTACT.whatsapp.number}.`,
    it: `Apri il singolo evento per i prezzi confermati oppure scrivi su WhatsApp ${CONTACT.whatsapp.number}.`,
    es: `Abre el evento para ver los precios confirmados o escribe por WhatsApp al ${CONTACT.whatsapp.number}.`,
    fr: `Ouvrez l'evenement pour les prix confirmes ou ecrivez sur WhatsApp au ${CONTACT.whatsapp.number}.`,
    de: `Offnen Sie das einzelne Event fur bestatigte Preise oder schreiben Sie per WhatsApp an ${CONTACT.whatsapp.number}.`,
    pt: `Abra o evento para ver os precos confirmados ou escreva pelo WhatsApp ${CONTACT.whatsapp.number}.`,
  },
  vip: { en: 'Can I book a VIP table?', it: 'Posso prenotare un tavolo VIP?', es: 'Puedo reservar una mesa VIP?', fr: 'Puis-je reserver une table VIP ?', de: 'Kann ich einen VIP-Tisch buchen?', pt: 'Posso reservar uma mesa VIP?' },
  vipAnswer: {
    en: 'Yes. Dance-floor, prive and super-prive tables depend on the venue and the individual night.',
    it: 'Si. Sono disponibili tavoli pista, prive e super prive in base al locale e alla serata.',
    es: 'Si. Las mesas de pista, prive y super-prive dependen del local y de la noche.',
    fr: 'Oui. Les tables piste, prive et super-prive dependent du lieu et de la soiree.',
    de: 'Ja. Dancefloor-, Prive- und Super-Prive-Tische hangen vom Club und der jeweiligen Nacht ab.',
    pt: 'Sim. Mesas de pista, prive e super-prive dependem do local e da noite.',
  },
  afterPurchase: { en: 'What should I send after buying?', it: "Cosa devo inviare dopo l'acquisto?", es: 'Que debo enviar despues de comprar?', fr: "Que dois-je envoyer apres l'achat ?", de: 'Was soll ich nach dem Kauf senden?', pt: 'O que devo enviar depois da compra?' },
} satisfies Record<string, LocalizedCopy>;

const INTENTS: Record<EventIntent, {
  title: LocalizedCopy;
  description: LocalizedCopy;
  heading: LocalizedCopy;
  audience: LocalizedCopy;
  hero: string;
  venueIds: string[];
  terms?: string[];
}> = {
  international: {
    title: {
      en: 'International Parties in Milan 2026 | Events & VIP Tables',
      it: 'Serate Internazionali Milano 2026 | Eventi e Tavoli VIP',
      es: 'Fiestas Internacionales en Milan 2026 | Eventos y Mesas VIP',
      fr: 'Soirees Internationales a Milan 2026 | Events et Tables VIP',
      de: 'Internationale Partys in Mailand 2026 | Events & VIP-Tische',
      pt: 'Festas Internacionais em Milao 2026 | Eventos e Mesas VIP',
    },
    description: {
      en: 'International parties in Milan at Just Me and Pineta: current dates, music, guest list, entry and VIP table options.',
      it: 'Serate internazionali a Milano al Just Me e Pineta: date aggiornate, musica, guest list, ingresso e tavoli VIP.',
      es: 'Fiestas internacionales en Milan en Just Me y Pineta: fechas, musica, lista, entrada y mesas VIP.',
      fr: 'Soirees internationales a Milan au Just Me et Pineta : dates, musique, guest list, entree et tables VIP.',
      de: 'Internationale Partys in Mailand bei Just Me und Pineta: Termine, Musik, Gasteleiste, Eintritt und VIP-Tische.',
      pt: 'Festas internacionais em Milao no Just Me e Pineta: datas, musica, guest list, entrada e mesas VIP.',
    },
    heading: { en: 'International Parties Milan', it: 'Serate Internazionali Milano', es: 'Fiestas Internacionales Milan', fr: 'Soirees Internationales Milan', de: 'Internationale Partys Mailand', pt: 'Festas Internacionais Milao' },
    audience: { en: 'International crowd, expats, visitors and mixed groups looking for premium Milan nightlife.', it: 'Pubblico internazionale, expat, visitatori e gruppi misti che cercano la nightlife premium di Milano.', es: 'Publico internacional, expatriados, visitantes y grupos mixtos que buscan nightlife premium.', fr: 'Public international, expatries, visiteurs et groupes mixtes recherchant une nightlife premium.', de: 'Internationales Publikum, Expats, Besucher und gemischte Gruppen fur gehobenes Nachtleben.', pt: 'Publico internacional, expatriados, visitantes e grupos mistos que procuram nightlife premium.' },
    hero: '/images/venues/just-me-milano/just-me-milano-interior-01.webp',
    venueIds: ['v-justme', 'v-pineta'],
  },
  'university-erasmus': {
    title: {
      en: 'University & Erasmus Parties Milan 2026 | Student Events',
      it: 'Serate Universitarie ed Erasmus Milano 2026 | Eventi Studenti',
      es: 'Fiestas Universitarias y Erasmus Milan 2026 | Estudiantes',
      fr: 'Soirees Etudiantes et Erasmus Milan 2026 | Evenements',
      de: 'Studenten- & Erasmus-Partys Mailand 2026 | Events',
      pt: 'Festas Universitarias e Erasmus Milao 2026 | Estudantes',
    },
    description: {
      en: 'University and Erasmus parties in Milan: student events, international crowd, reggaeton, commercial music, guest list and tables.',
      it: 'Serate universitarie ed Erasmus a Milano: eventi studenti, pubblico internazionale, reggaeton, commercial, guest list e tavoli.',
      es: 'Fiestas universitarias y Erasmus en Milan: estudiantes, publico internacional, reggaeton, musica comercial, lista y mesas.',
      fr: 'Soirees etudiantes et Erasmus a Milan : public international, reggaeton, musique commerciale, guest list et tables.',
      de: 'Studenten- und Erasmus-Partys in Mailand: internationales Publikum, Reggaeton, Commercial, Gasteleiste und Tische.',
      pt: 'Festas universitarias e Erasmus em Milao: estudantes, publico internacional, reggaeton, musica comercial, guest list e mesas.',
    },
    heading: { en: 'University & Erasmus Parties Milan', it: 'Serate Universitarie ed Erasmus Milano', es: 'Fiestas Universitarias y Erasmus Milan', fr: 'Soirees Etudiantes et Erasmus Milan', de: 'Studenten- und Erasmus-Partys Mailand', pt: 'Festas Universitarias e Erasmus Milao' },
    audience: { en: 'University students, Erasmus groups and international students who want a social, energetic club night.', it: 'Studenti universitari, gruppi Erasmus e studenti internazionali che cercano una serata sociale ed energica.', es: 'Universitarios, grupos Erasmus y estudiantes internacionales que buscan una noche social y energica.', fr: 'Etudiants, groupes Erasmus et internationaux qui recherchent une soiree sociale et energique.', de: 'Studierende, Erasmus-Gruppen und internationale Studierende fur eine lebhafte Clubnacht.', pt: 'Universitarios, grupos Erasmus e estudantes internacionais que procuram uma noite social e energica.' },
    hero: '/images/events/generated/just-me-university-party-eventbrite-header-2x1-pt.png',
    venueIds: ['v-justme', 'v-pineta', 'v-aria'],
    terms: ['university', 'universitario', 'universitaria', 'erasmus', 'student', 'college'],
  },
  '18-plus': {
    title: {
      en: '18+ Parties in Milan 2026 | Pineta & Aria Club Events',
      it: 'Serate 18+ Milano 2026 | Eventi Pineta e Aria Club',
      es: 'Fiestas 18+ en Milan 2026 | Pineta y Aria Club',
      fr: 'Soirees 18+ a Milan 2026 | Pineta et Aria Club',
      de: 'Partys ab 18 in Mailand 2026 | Pineta & Aria Club',
      pt: 'Festas 18+ em Milao 2026 | Pineta e Aria Club',
    },
    description: {
      en: '18+ club nights in Milan at Pineta and Aria Club: current events, aperitivo, music, entry details, guest list and table booking.',
      it: 'Serate 18+ a Milano al Pineta e Aria Club: eventi aggiornati, aperitivo, musica, ingresso, guest list e prenotazione tavoli.',
      es: 'Noches 18+ en Milan en Pineta y Aria Club: eventos, aperitivo, musica, entrada, lista y reserva de mesas.',
      fr: 'Soirees 18+ a Milan au Pineta et Aria Club : evenements, aperitivo, musique, entree, guest list et tables.',
      de: 'Clubnacht ab 18 in Mailand bei Pineta und Aria Club: Events, Aperitivo, Musik, Eintritt, Gasteleiste und Tische.',
      pt: 'Noites 18+ em Milao no Pineta e Aria Club: eventos, aperitivo, musica, entrada, guest list e mesas.',
    },
    heading: { en: '18+ Parties Milan', it: 'Serate 18+ Milano', es: 'Fiestas 18+ Milan', fr: 'Soirees 18+ Milan', de: 'Partys ab 18 in Mailand', pt: 'Festas 18+ Milao' },
    audience: { en: 'Guests aged 18 and over. Always check the individual event and bring a valid original ID.', it: 'Pubblico dai 18 anni. Controlla sempre il singolo evento e porta un documento originale valido.', es: 'Publico desde 18 anos. Comprueba siempre el evento y lleva un documento original valido.', fr: 'Public a partir de 18 ans. Verifiez l’evenement et apportez une piece d’identite originale valide.', de: 'Gaste ab 18 Jahren. Prufen Sie das einzelne Event und bringen Sie einen gultigen Originalausweis mit.', pt: 'Publico a partir dos 18 anos. Confirme sempre o evento e leve um documento original valido.' },
    hero: '/images/venues/pineta-milano/pineta-milano-interior-01.webp',
    venueIds: ['v-pineta', 'v-aria'],
  },
  '21-plus': {
    title: {
      en: '21+ Parties in Milan 2026 | Just Me Events & VIP Tables',
      it: 'Serate 21+ Milano 2026 | Eventi Just Me e Tavoli VIP',
      es: 'Fiestas 21+ en Milan 2026 | Just Me y Mesas VIP',
      fr: 'Soirees 21+ a Milan 2026 | Just Me et Tables VIP',
      de: 'Partys ab 21 in Mailand 2026 | Just Me & VIP-Tische',
      pt: 'Festas 21+ em Milao 2026 | Just Me e Mesas VIP',
    },
    description: {
      en: '21+ nightlife in Milan at Just Me: aperitivo, dinner, Thursday show dinner, club events, guest list and VIP table booking.',
      it: 'Nightlife 21+ a Milano al Just Me: aperitivo, cena, show dinner del giovedì, serate club, guest list e tavoli VIP.',
      es: 'Nightlife 21+ en Milan en Just Me: aperitivo, cena, show dinner del jueves, club, lista y mesas VIP.',
      fr: 'Nightlife 21+ a Milan au Just Me : aperitivo, diner, show dinner du jeudi, club, guest list et tables VIP.',
      de: 'Nachtleben ab 21 in Mailand im Just Me: Aperitivo, Dinner, Show Dinner am Donnerstag, Club, Gasteleiste und VIP-Tische.',
      pt: 'Nightlife 21+ em Milao no Just Me: aperitivo, jantar, show dinner de quinta, club, guest list e mesas VIP.',
    },
    heading: { en: '21+ Parties Milan', it: 'Serate 21+ Milano', es: 'Fiestas 21+ Milan', fr: 'Soirees 21+ Milan', de: 'Partys ab 21 in Mailand', pt: 'Festas 21+ Milao' },
    audience: { en: 'A mature international 21+ crowd, with elegant dress code and premium table service.', it: 'Pubblico internazionale adulto 21+, dress code elegante e servizio tavoli premium.', es: 'Publico internacional adulto 21+, codigo elegante y servicio de mesas premium.', fr: 'Public international adulte 21+, tenue elegante et service de tables premium.', de: 'Internationales Publikum ab 21, eleganter Dresscode und Premium-Tischservice.', pt: 'Publico internacional adulto 21+, dress code elegante e servico de mesas premium.' },
    hero: '/images/venues/just-me-milano/just-me-milano-interior-01.webp',
    venueIds: ['v-justme'],
  },
};

const VENUE_SERVICES: Record<string, LocalizedCopy> = {
  'v-justme': {
    en: 'Aperitivo, dinner, Thursday show dinner, nightclub, dance-floor tables, prive and super-prive.',
    it: 'Aperitivo, cena, cena cantata show dinner il giovedì, discoteca, tavoli pista, privé e super privé.',
    es: 'Aperitivo, cena, show dinner el jueves, discoteca, mesas de pista, prive y super-prive.',
    fr: 'Aperitivo, diner, show dinner le jeudi, club, tables piste, prive et super-prive.',
    de: 'Aperitivo, Dinner, Show Dinner donnerstags, Club, Dancefloor-, Prive- und Super-Prive-Tische.',
    pt: 'Aperitivo, jantar, show dinner a quinta, discoteca, mesas de pista, prive e super-prive.',
  },
  'v-pineta': {
    en: 'Aperitivo, nightclub and, when confirmed in the individual event, dinner show. Dance-floor, prive and super-prive tables.',
    it: 'Aperitivo, discoteca e, quando confermata nel singolo evento, cena spettacolo. Tavoli pista, privé e super privé.',
    es: 'Aperitivo, discoteca y, cuando el evento lo confirme, cena espectaculo. Mesas de pista, prive y super-prive.',
    fr: 'Aperitivo, club et, si l’evenement le confirme, diner spectacle. Tables piste, prive et super-prive.',
    de: 'Aperitivo, Club und, wenn im Event bestatigt, Dinner-Show. Dancefloor-, Prive- und Super-Prive-Tische.',
    pt: 'Aperitivo, discoteca e, quando confirmado no evento, jantar-espetaculo. Mesas de pista, prive e super-prive.',
  },
  'v-aria': {
    en: 'Aperitivo, nightclub, dance-floor tables, prive and super-prive areas for an Italian 18+ crowd.',
    it: 'Aperitivo, discoteca, tavoli pista, privé e super privé per un pubblico italiano 18+.',
    es: 'Aperitivo, discoteca, mesas de pista, prive y super-prive para publico italiano 18+.',
    fr: 'Aperitivo, club, tables piste, prive et super-prive pour un public italien 18+.',
    de: 'Aperitivo, Club, Dancefloor-, Prive- und Super-Prive-Tische fur italienisches Publikum ab 18.',
    pt: 'Aperitivo, discoteca, mesas de pista, prive e super-prive para publico italiano 18+.',
  },
};

export function buildIntentMetadata(intent: EventIntent, locale: string): Metadata {
  const config = INTENTS[intent];
  const lang = coreLocale(locale);
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const canonical = `${baseUrl}${localePrefix(locale)}/events/${intent}`;
  const title = seoTitle(config.title[lang]);
  const description = withWhatsApp(config.description[lang], locale);
  return {
    title,
    description,
    alternates: { canonical, languages: hreflangAlternates(baseUrl, `/events/${intent}`) },
    robots: getLocaleDef(locale)?.indexed === false ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title, description, url: canonical, type: 'website', siteName: 'Nightlife Milan',
      locale: getLocaleDef(locale)?.ogLocale || 'en_US',
      images: [{ url: `${baseUrl}${config.hero}`, width: 1200, height: 630, alt: config.heading[lang] }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [`${baseUrl}${config.hero}`] },
  };
}

export default async function EventIntentLanding({ intent, locale }: { intent: EventIntent; locale: string }) {
  const config = INTENTS[intent];
  const lang = coreLocale(locale);
  const lp = localePrefix(locale);
  const allItems = getEventbriteDiscoveryItems(await getAllCalendarEvents(), locale);
  const items = allItems
    .filter(({ event }) => isUpcomingRome(event.dateISO) && config.venueIds.includes(event.venueId))
    .filter(({ event }) => {
      if (!config.terms) return true;
      const haystack = `${event.localizedContent.title.en} ${event.localizedContent.shortDescription.en}`.toLowerCase();
      return config.terms.some((term) => haystack.includes(term));
    });

  const venues = Array.from(new Map(allItems
    .filter(({ venue }) => config.venueIds.includes(venue.id))
    .map(({ venue }) => [venue.id, venue])).values());
  const faqs = [
    {
      q: FAQ_COPY.minimumAge[lang],
      a: config.audience[lang],
    },
    {
      q: FAQ_COPY.prices[lang],
      a: FAQ_COPY.pricesAnswer[lang],
    },
    {
      q: FAQ_COPY.vip[lang],
      a: FAQ_COPY.vipAnswer[lang],
    },
    {
      q: FAQ_COPY.afterPurchase[lang],
      a: COMMON.confirm[lang],
    },
  ];

  // Event COMPLETI (non più soli url+name): stessa entità ricca delle altre
  // superfici, via il generatore condiviso di lib/seo.ts.
  const itemListSchema = items.length > 0
    ? generateEventListSchema(items, locale, config.heading[lang])
    : null;
  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })),
  };

  return (
    <main className="min-h-screen bg-[#131009] text-white pb-20">
      {itemListSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(itemListSchema) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="relative min-h-[620px] h-[78svh] max-h-[840px] flex items-end overflow-hidden">
        <Image src={config.hero} alt={config.heading[lang]} fill priority quality={85} sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131009] via-[#131009]/65 to-black/15" />
        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 pb-14 sm:pb-20">
          <nav className="text-xs text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href={lp || '/'} className="hover:text-champagne">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`${lp}/events`} className="hover:text-champagne">{COMMON.eventsNav[lang]}</Link>
          </nav>
          <p className="text-champagne text-xs uppercase mb-4">Nightlife Milan · 2026</p>
          <h1 className="font-serif text-5xl sm:text-7xl font-bold leading-[0.95] max-w-4xl text-white mb-6">{config.heading[lang]}</h1>
          <p className="max-w-3xl text-base sm:text-lg text-white/75 leading-relaxed">{config.description[lang]}</p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-7 grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <p className="text-champagne text-xs uppercase mb-2">{COMMON.quickAnswer[lang]}</p>
            <p className="text-white/75 leading-relaxed">{config.audience[lang]}</p>
            <p className="text-white/50 text-sm mt-2">{COMMON.confirm[lang]}</p>
          </div>
          <a href={`${CONTACT.whatsapp.link}?text=${encodeURIComponent(`I want information about ${config.heading[lang]}.`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 bg-champagne text-black px-6 py-3 font-semibold hover:bg-white transition-colors">
            <MessageCircle className="w-5 h-5" /> {COMMON.book[lang]}
          </a>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-champagne/70 text-xs uppercase mb-2">{items.length} · Milan</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">{COMMON.events[lang]}</h2>
          </div>
          <CalendarDays className="w-7 h-7 text-champagne/60" />
        </div>
        {items.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map(({ event, venue }, index) => <EventCard key={event.id} event={event} venue={venue} lang={locale} priority={index < 2} />)}
          </div>
        ) : (
          <p className="border-y border-white/10 py-10 text-white/60">{COMMON.noEvents[lang]}</p>
        )}
      </section>

      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-10">{COMMON.venues[lang]}</h2>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {venues.map((venue) => (
              <article key={venue.id} className="grid md:grid-cols-[220px_1fr_auto] gap-6 py-7 items-center">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={venue.image || config.hero} alt={getLocalizedText(venue.localizedContent.name, locale)} fill sizes="220px" className="object-cover" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold mb-2">{getLocalizedText(venue.localizedContent.name, locale)}</h3>
                  <p className="text-white/60 leading-relaxed">{VENUE_SERVICES[venue.id]?.[lang] || getLocalizedText(venue.localizedContent.description, locale)}</p>
                </div>
                <Link href={`${lp}/clubs/${getLocalizedText(venue.slugs, locale)}`} className="text-champagne text-sm underline underline-offset-4">{COMMON.details[lang]}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-10">{COMMON.programme[lang]}</h2>
        <div className="grid md:grid-cols-3 border-y border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {PROGRAMME_STEPS.map((step) => (
            <div key={step.time} className="p-7 min-w-0">
              <step.icon className="w-6 h-6 text-champagne mb-5" />
              <p className="font-mono text-xs text-champagne mb-2">{step.time}</p>
              <p className="text-white/65 leading-relaxed">{step.copy[lang]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 sm:px-8 pb-16">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-8">{COMMON.faq[lang]}</h2>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-5">
              <summary className="cursor-pointer font-semibold text-white/90 list-none flex justify-between gap-4">{faq.q}<span className="text-champagne">+</span></summary>
              <p className="pt-4 text-white/60 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
