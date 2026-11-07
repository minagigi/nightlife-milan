import EditorialPageSections from '@/components/EditorialPageSections';
import type { LocaleCode } from '@/lib/i18n/locales';
import type { Metadata } from 'next';
import Link from '@/components/LocalizedLink';
import Image from 'next/image';
import TableConcierge from '@/components/TableConcierge';
import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  ClipboardCheck,
  MessageCircle,
  Send,
} from 'lucide-react';
import { SITE_CONTACT } from '@/config/contact';
import { getLocaleDef, hreflangAlternates, localePrefix } from '@/lib/i18n/locales';
import { seoRobots, seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { currentVipTablesDict } from '@/lib/i18n/currentSafePageCopy';
import { resolveStrictPageCopy } from '@/lib/i18n/strictPageCopy';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import { getDateSensitiveCarouselInventory } from '@/lib/dateSensitiveInventory';
import { selectPriorityVenueEvents } from '@/lib/priorityVenueEvents';
import { getTableConciergeSharedCopy } from '@/lib/tableConciergePageCopy';

export const revalidate = 3600;

const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';

type PageCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  answerLabel: string;
  answer: string;
  cta: string;
  responseNote: string;
  factorsEyebrow: string;
  factorsTitle: string;
  factorsLead: string;
  factors: string[];
  stepsEyebrow: string;
  stepsTitle: string;
  steps: Array<{ title: string; description: string }>;
  notice: string;
  finalEyebrow: string;
  finalTitle: string;
  finalText: string;
  clubsLink: string;
};

const COPY: Record<'en' | 'it' | 'es' | 'fr' | 'de' | 'pt', PageCopy> = {
  en: {
    metaTitle: 'VIP Tables Milan | Nightclub Bookings',
    metaDescription: 'VIP tables in Milan nightclubs: check availability, conditions and admission.',
    eyebrow: 'MILAN NIGHTLIFE · CURRENT QUOTE REQUEST',
    title: 'Milan VIP Tables, Privé Zones & Bottle Service Guide 2026',
    lead: 'Send the date, group size and preferred venue. We use those details to request the current conditions from the venue.',
    answerLabel: 'DIRECT ANSWER · HOW VIP TABLES WORK IN MILAN',
    answer: 'Every VIP Table in Milan operates on a 100% Bottle Credit (Minimum Spend) formula: Dancefloor tables start at €250–€400 (5–6 passes), Privé tables run €500–€1,000 (8–10 passes), and Super Privé / DJ Console tables start at €1,200–€5,000+ (10–15 passes) with skip-the-line VIP Host entry via WhatsApp +39 351 912 7047.',
    cta: 'Request current conditions',
    responseNote: 'Wait for written venue confirmation before making plans.',
    factorsEyebrow: 'BEFORE YOU DECIDE',
    factorsTitle: 'What the venue must confirm',
    factorsLead: 'Ask for one dated response covering every material condition.',
    factors: [
      'Current availability and table assignment',
      'Total cost, payment terms and any minimum commitment',
      'What is included and what is charged separately',
      'Admission policy, age requirements and arrival time',
      'Cancellation or change conditions for that date',
      'Any event-specific rules communicated by the venue',
    ],
    stepsEyebrow: 'A CLEAR HANDOFF',
    stepsTitle: 'How to request a current quote',
    steps: [
      { title: 'Send the essentials', description: 'Message the date, group size, preferred venue and any practical needs.' },
      { title: 'Check the venue response', description: 'Review the dated availability, full cost, inclusions and admission conditions.' },
      { title: 'Decide after confirmation', description: 'Proceed only when the venue conditions are clear and suitable for your group.' },
    ],
    notice: 'A WhatsApp request is not a reservation or an admission ticket. The venue controls availability, acceptance, table placement and door decisions.',
    finalEyebrow: 'START WITH VERIFIED DETAILS',
    finalTitle: 'Ask for the current venue quote',
    finalText: 'Include the date and group size in your first message so the request can be checked against the correct night.',
    clubsLink: 'View Milan clubs',
  },
  it: {
    metaTitle: 'Tavoli VIP Milano | Prenotazioni Discoteche e Club',
    metaDescription: 'Tavoli VIP in discoteche e club di Milano: verifica disponibilità, condizioni e ingresso.',
    eyebrow: 'NIGHTLIFE MILANO · RICHIESTA PREVENTIVO ATTUALE',
    title: 'Tavoli VIP, Privé e Bottle Service nelle Discoteche di Milano (2026)',
    lead: 'Invia data, numero di persone e locale preferito. Questi dati servono per richiedere al locale le condizioni attuali.',
    answerLabel: 'RISPOSTA IMMEDIATA · COME FUNZIONANO I TAVOLI VIP A MILANO',
    answer: 'Tutti i Tavoli VIP nelle discoteche di Milano funzionano con formula 100% Credito Bottiglie (Minimum Spend): i tavoli Pista partono da 250–400 € (5–6 pass inclusi), i tavoli Privé da 500–1.000 € (8–10 pass) e i tavoli Super Privé / Console DJ da 1.200–5.000+ € (10–15 pass), con ingresso prioritario salta-fila tramite WhatsApp +39 351 912 7047.',
    cta: 'Richiedi le condizioni attuali',
    responseNote: 'Attendi la conferma scritta del locale prima di organizzarti.',
    factorsEyebrow: 'PRIMA DI DECIDERE',
    factorsTitle: 'Cosa deve confermare il locale',
    factorsLead: 'Chiedi una risposta datata che includa ogni condizione importante.',
    factors: [
      'Disponibilità attuale e assegnazione del tavolo',
      'Costo totale, modalità di pagamento ed eventuale impegno minimo',
      'Cosa è incluso e cosa viene addebitato a parte',
      'Regole di ingresso, requisiti di età e orario di arrivo',
      'Condizioni di cancellazione o modifica per quella data',
      'Eventuali regole specifiche comunicate dal locale',
    ],
    stepsEyebrow: 'UN PASSAGGIO CHIARO',
    stepsTitle: 'Come chiedere un preventivo attuale',
    steps: [
      { title: 'Invia i dati essenziali', description: 'Scrivi data, numero di persone, locale preferito ed eventuali esigenze pratiche.' },
      { title: 'Controlla la risposta', description: "Verifica disponibilità per la data, costo completo, inclusioni e condizioni di ingresso." },
      { title: 'Decidi dopo la conferma', description: 'Procedi solo quando le condizioni del locale sono chiare e adatte al gruppo.' },
    ],
    notice: 'Una richiesta su WhatsApp non è una prenotazione né un titolo di ingresso. Il locale controlla disponibilità, accettazione, posizione del tavolo e decisioni alla porta.',
    finalEyebrow: 'PARTI DA DATI VERIFICATI',
    finalTitle: 'Chiedi il preventivo attuale del locale',
    finalText: 'Indica data e numero di persone nel primo messaggio, così la richiesta può essere verificata sulla serata corretta.',
    clubsLink: 'Vedi i club di Milano',
  },
  es: {
    metaTitle: 'Mesas VIP Milán | Reservas en Discotecas y Clubes',
    metaDescription: 'Mesas VIP en discotecas y clubes de Milán: confirma disponibilidad, condiciones y acceso.',
    eyebrow: 'MILÁN NIGHTLIFE · SOLICITUD DE PRESUPUESTO ACTUAL',
    title: 'Solicita una mesa VIP en Milán',
    lead: 'Envía la fecha, el tamaño del grupo y el local preferido. Usaremos esos datos para pedir al local sus condiciones actuales.',
    answerLabel: 'QUÉ HACE ESTA PÁGINA',
    answer: 'Esta página no publica precios fijos ni promete disponibilidad. El local debe confirmar para la fecha concreta los costes, las inclusiones, las reglas de acceso y la asignación de mesa.',
    cta: 'Solicitar condiciones actuales',
    responseNote: 'Espera la confirmación escrita del local antes de organizarte.',
    factorsEyebrow: 'ANTES DE DECIDIR',
    factorsTitle: 'Qué debe confirmar el local',
    factorsLead: 'Pide una respuesta fechada que incluya todas las condiciones importantes.',
    factors: [
      'Disponibilidad actual y asignación de mesa',
      'Coste total, condiciones de pago y compromiso mínimo',
      'Qué está incluido y qué se cobra por separado',
      'Política de acceso, requisitos de edad y hora de llegada',
      'Condiciones de cancelación o cambio para esa fecha',
      'Cualquier regla específica comunicada por el local',
    ],
    stepsEyebrow: 'UN PROCESO CLARO',
    stepsTitle: 'Cómo solicitar un presupuesto actual',
    steps: [
      { title: 'Envía los datos esenciales', description: 'Indica fecha, tamaño del grupo, local preferido y necesidades prácticas.' },
      { title: 'Revisa la respuesta', description: "Comprueba la disponibilidad para la fecha, el coste total, las inclusiones y las condiciones de acceso." },
      { title: 'Decide tras la confirmación', description: 'Continúa solo si las condiciones del local son claras y adecuadas para el grupo.' },
    ],
    notice: 'Una solicitud por WhatsApp no es una reserva ni una entrada. El local controla la disponibilidad, la aceptación, la asignación de mesa y las decisiones de acceso.',
    finalEyebrow: 'EMPIEZA CON DATOS VERIFICADOS',
    finalTitle: 'Pide el presupuesto actual del local',
    finalText: 'Incluye la fecha y el tamaño del grupo en el primer mensaje para comprobar la noche correcta.',
    clubsLink: 'Ver clubs de Milán',
  },
  fr: {
    metaTitle: 'Tables VIP à Milan | Réservations en Club',
    metaDescription: 'Tables VIP dans les clubs et discothèques de Milan : confirmez disponibilité, conditions et accès.',
    eyebrow: 'MILAN NIGHTLIFE · DEMANDE DE DEVIS ACTUEL',
    title: 'Demandez une table VIP à Milan',
    lead: 'Envoyez la date, la taille du groupe et le lieu souhaité. Ces informations servent à demander les conditions actuelles au lieu.',
    answerLabel: 'RÔLE DE CETTE PAGE',
    answer: 'Cette page ne publie pas de tarifs fixes et ne promet pas de disponibilité. Le lieu doit confirmer pour la date choisie les coûts, les inclusions, les règles d’admission et l’attribution de la table.',
    cta: 'Demander les conditions actuelles',
    responseNote: 'Attendez la confirmation écrite du lieu avant de vous organiser.',
    factorsEyebrow: 'AVANT DE DÉCIDER',
    factorsTitle: 'Ce que le lieu doit confirmer',
    factorsLead: 'Demandez une réponse datée couvrant chaque condition importante.',
    factors: [
      'Disponibilité actuelle et attribution de la table',
      'Coût total, modalités de paiement et engagement minimum',
      'Ce qui est inclus et ce qui est facturé séparément',
      'Politique d’admission, âge requis et heure d’arrivée',
      'Conditions d’annulation ou de modification pour cette date',
      'Toute règle spécifique communiquée par le lieu',
    ],
    stepsEyebrow: 'UNE DEMANDE CLAIRE',
    stepsTitle: 'Comment demander un devis actuel',
    steps: [
      { title: 'Envoyez les informations essentielles', description: 'Indiquez la date, la taille du groupe, le lieu souhaité et vos besoins pratiques.' },
      { title: 'Vérifiez la réponse', description: "Vérifiez la disponibilité pour la date, le coût total, les inclusions et les conditions d’admission." },
      { title: 'Décidez après confirmation', description: 'Poursuivez uniquement si les conditions du lieu sont claires et adaptées au groupe.' },
    ],
    notice: 'Une demande WhatsApp n’est ni une réservation ni un billet d’entrée. Le lieu contrôle la disponibilité, l’acceptation, l’attribution de la table et l’admission.',
    finalEyebrow: 'COMMENCEZ PAR DES DONNÉES VÉRIFIÉES',
    finalTitle: 'Demandez le devis actuel du lieu',
    finalText: 'Indiquez la date et la taille du groupe dès le premier message afin de vérifier la bonne soirée.',
    clubsLink: 'Voir les clubs de Milan',
  },
  de: {
    metaTitle: 'VIP-Tische Mailand | Club-Reservierungen',
    metaDescription: 'VIP-Tische in Mailänder Clubs und Diskotheken: Verfügbarkeit, Bedingungen und Einlass prüfen.',
    eyebrow: 'MAILAND NIGHTLIFE · AKTUELLE ANGEBOTSANFRAGE',
    title: 'VIP-Tisch in Mailand anfragen',
    lead: 'Senden Sie Datum, Gruppengröße und gewünschten Club. Damit fragen wir die aktuellen Bedingungen beim Club an.',
    answerLabel: 'WAS DIESE SEITE LEISTET',
    answer: 'Diese Seite veröffentlicht keine festen Preise und verspricht keine Verfügbarkeit. Kosten, enthaltene Leistungen, Einlassregeln und Tischzuweisung muss der Club für das konkrete Datum bestätigen.',
    cta: 'Aktuelle Bedingungen anfragen',
    responseNote: 'Warten Sie vor Ihrer Planung auf die schriftliche Bestätigung des Clubs.',
    factorsEyebrow: 'VOR DER ENTSCHEIDUNG',
    factorsTitle: 'Was der Club bestätigen muss',
    factorsLead: 'Bitten Sie um eine datierte Antwort mit allen wichtigen Bedingungen.',
    factors: [
      'Aktuelle Verfügbarkeit und Tischzuweisung',
      'Gesamtkosten, Zahlungsbedingungen und Mindestverpflichtung',
      'Enthaltene und separat berechnete Leistungen',
      'Einlassregeln, Altersvorgaben und Ankunftszeit',
      'Stornierungs- oder Änderungsbedingungen für das Datum',
      'Weitere vom Club mitgeteilte veranstaltungsspezifische Regeln',
    ],
    stepsEyebrow: 'EINE KLARE ANFRAGE',
    stepsTitle: 'So fragen Sie ein aktuelles Angebot an',
    steps: [
      { title: 'Eckdaten senden', description: 'Nennen Sie Datum, Gruppengröße, gewünschten Club und praktische Anforderungen.' },
      { title: 'Antwort prüfen', description: "Prüfen Sie Verfügbarkeit für den Termin, Gesamtkosten, Leistungen und Einlassbedingungen." },
      { title: 'Nach Bestätigung entscheiden', description: 'Fahren Sie nur fort, wenn die Bedingungen klar und für Ihre Gruppe passend sind.' },
    ],
    notice: 'Eine WhatsApp-Anfrage ist weder eine Reservierung noch eine Eintrittskarte. Der Club entscheidet über Verfügbarkeit, Annahme, Tischzuweisung und Einlass.',
    finalEyebrow: 'MIT GEPRÜFTEN ANGABEN STARTEN',
    finalTitle: 'Aktuelles Angebot des Clubs anfragen',
    finalText: 'Nennen Sie Datum und Gruppengröße in der ersten Nachricht, damit die richtige Nacht geprüft werden kann.',
    clubsLink: 'Clubs in Mailand ansehen',
  },
  pt: {
    metaTitle: 'Mesas VIP Milão | Reservas em Discotecas e Clubes',
    metaDescription: 'Mesas VIP em discotecas e clubes de Milão: confirme disponibilidade, condições e entrada.',
    eyebrow: 'MILÃO NIGHTLIFE · PEDIDO DE ORÇAMENTO ATUAL',
    title: 'Peça uma mesa VIP em Milão',
    lead: 'Envie a data, o tamanho do grupo e o local preferido. Usaremos esses dados para pedir as condições atuais ao local.',
    answerLabel: 'O QUE ESTA PÁGINA FAZ',
    answer: 'Esta página não publica preços fixos nem promete disponibilidade. O local deve confirmar para a data específica os custos, as inclusões, as regras de entrada e a atribuição da mesa.',
    cta: 'Pedir condições atuais',
    responseNote: 'Aguarde a confirmação escrita do local antes de se organizar.',
    factorsEyebrow: 'ANTES DE DECIDIR',
    factorsTitle: 'O que o local deve confirmar',
    factorsLead: 'Peça uma resposta datada que inclua todas as condições importantes.',
    factors: [
      'Disponibilidade atual e atribuição da mesa',
      'Custo total, condições de pagamento e compromisso mínimo',
      'O que está incluído e o que é cobrado separadamente',
      'Política de entrada, requisitos de idade e hora de chegada',
      'Condições de cancelamento ou alteração para essa data',
      'Quaisquer regras específicas comunicadas pelo local',
    ],
    stepsEyebrow: 'UM PEDIDO CLARO',
    stepsTitle: 'Como pedir um orçamento atual',
    steps: [
      { title: 'Envie os dados essenciais', description: 'Informe data, tamanho do grupo, local preferido e necessidades práticas.' },
      { title: 'Verifique a resposta', description: "Confira a disponibilidade para a data, o custo total, as inclusões e as condições de entrada." },
      { title: 'Decida após a confirmação', description: 'Prossiga apenas se as condições estiverem claras e adequadas ao grupo.' },
    ],
    notice: 'Um pedido por WhatsApp não é uma reserva nem um ingresso. O local controla disponibilidade, aceitação, atribuição da mesa e decisões de entrada.',
    finalEyebrow: 'COMECE COM DADOS VERIFICADOS',
    finalTitle: 'Peça o orçamento atual do local',
    finalText: 'Inclua a data e o tamanho do grupo na primeira mensagem para verificar a noite correta.',
    clubsLink: 'Ver clubes de Milão',
  },
};

function getCopy(locale: string): PageCopy {
  return resolveStrictPageCopy(locale, COPY, currentVipTablesDict, { trace: 'vip-tables' });
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = getCopy(locale);
  const canonicalUrl = `${baseUrl}${localePrefix(locale)}/vip-tables`;
  const title = seoTitle(copy.metaTitle);
  const description = withWhatsApp(copy.metaDescription, locale);

  return {
    title,
    description,
    robots: seoRobots(locale),
    alternates: { canonical: canonicalUrl, languages: hreflangAlternates(baseUrl, '/vip-tables') },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonicalUrl,
      siteName: 'Nightlife Milan',
      locale: getLocaleDef(locale)?.ogLocale || 'en_US',
      images: [{
        url: `${baseUrl}/images/pillars/vip-tables-hero.webp`,
        width: 768,
        height: 1024,
        alt: copy.title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/images/pillars/vip-tables-hero.webp`],
      site: '@nightlifemilan',
    },
  };
}

export default async function VipTablesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = getCopy(locale);
  const lp = localePrefix(locale);
  const whatsappUrl = getConciergeBookingUrl(locale);
  const stepIcons = [Send, ClipboardCheck, CheckCircle2];
  const initialNow = new Date();
  const datedEvents = selectPriorityVenueEvents(await getDateSensitiveCarouselInventory(locale), initialNow);

  return (
    <main className="min-h-screen bg-[#131009] text-white">
      <section className="relative overflow-hidden px-6 pb-10 pt-20 sm:pb-20 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-champagne/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.25em] text-champagne/75 sm:mb-6 sm:tracking-[0.35em]">
            {copy.eyebrow}
          </p>
          <h1 className="mx-auto mb-5 max-w-3xl font-serif text-4xl font-bold leading-[1.02] sm:mb-6 sm:text-6xl lg:text-7xl">
            {copy.title}
          </h1>
          <p className="mx-auto mb-6 max-w-2xl font-sans text-base leading-relaxed text-white/65 sm:mb-10 sm:text-lg">
            {copy.lead}
          </p>

          <a
            href="#tc-request-vip"
            className="inline-flex min-h-12 items-center justify-center gap-3 bg-champagne px-8 py-4 font-sans text-sm font-semibold uppercase tracking-[0.12em] text-black transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            {copy.cta}
          </a>
          <p className="mt-4 font-sans text-sm text-white/45">
            {SITE_CONTACT.whatsapp.number} · {copy.responseNote}
          </p>

          <div className="mx-auto mt-8 max-w-2xl overflow-hidden rounded-xl border border-champagne/25"><Image src="/images/pillars/vip-tables-hero.webp" alt={copy.title} width={768} height={1024} quality={92} sizes="(max-width: 768px) 100vw, 768px" priority className="h-64 w-full object-cover" /></div>
          <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-champagne/25 bg-champagne/[0.05] p-6 text-left sm:mt-10">
            <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.3em] text-champagne/75">
              {copy.answerLabel}
            </p>
            <p className="font-sans text-base leading-relaxed text-white/75">{copy.answer}</p>
          </div>
        </div>
      </section>

      <TableConcierge
        locale={locale}
        events={datedEvents}
        initialNow={initialNow.toISOString()}
        surface="vip"
        copy={{ ...getTableConciergeSharedCopy(locale), title: copy.title, lead: copy.lead }}
      />

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-white/[0.025] p-7 sm:p-10">
          <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.35em] text-champagne/75">
            {copy.factorsEyebrow}
          </p>
          <h2 className="mb-4 font-serif text-4xl text-white">{copy.factorsTitle}</h2>
          <p className="mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/55">{copy.factorsLead}</p>
          <ul className="grid gap-4 md:grid-cols-2">
            {copy.factors.map((factor) => (
              <li key={factor} className="flex items-start gap-3 rounded-lg border border-white/8 bg-black/15 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-champagne" aria-hidden="true" />
                <span className="font-sans text-sm leading-relaxed text-white/70">{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-center font-sans text-[10px] uppercase tracking-[0.35em] text-champagne/75">
            {copy.stepsEyebrow}
          </p>
          <h2 className="mb-10 text-center font-serif text-4xl text-white">{copy.stepsTitle}</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {copy.steps.map((step, index) => {
              const Icon = stepIcons[index];
              return (
                <article key={step.title} className="rounded-xl border border-white/10 bg-white/[0.025] p-7">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-champagne/25 bg-champagne/10">
                      <Icon className="h-5 w-5 text-champagne" aria-hidden="true" />
                    </span>
                    <span className="font-sans text-3xl font-bold text-champagne/25">0{index + 1}</span>
                  </div>
                  <h3 className="mb-3 font-serif text-2xl text-white">{step.title}</h3>
                  <p className="font-sans text-sm leading-relaxed text-white/55">{step.description}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-6 flex items-start gap-4 rounded-xl border border-amber-300/20 bg-amber-300/[0.05] p-5">
            <CircleAlert className="mt-0.5 h-5 w-5 flex-none text-amber-200" aria-hidden="true" />
            <p className="font-sans text-sm leading-relaxed text-white/70">{copy.notice}</p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-champagne/25 bg-champagne/[0.06] p-8 text-center sm:p-12">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-champagne/10 via-transparent to-transparent" />
          <div className="relative">
            <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-champagne/75">
              {copy.finalEyebrow}
            </p>
            <h2 className="mb-4 font-serif text-4xl text-white">{copy.finalTitle}</h2>
            <p className="mx-auto mb-8 max-w-xl font-sans text-base leading-relaxed text-white/60">{copy.finalText}</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-3 bg-champagne px-8 py-4 font-sans text-sm font-bold uppercase tracking-[0.12em] text-black transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                {SITE_CONTACT.whatsapp.number}
              </a>
              <Link
                href={`${lp}/clubs`}
                prefetch={false}
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/20 px-7 py-4 font-sans text-sm text-white/70 transition-colors hover:border-champagne/50 hover:text-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
              >
                {copy.clubsLink}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <EditorialPageSections locale={locale as LocaleCode} path={`${localePrefix(locale)}/vip-tables`} />
    </main>
  );
}
