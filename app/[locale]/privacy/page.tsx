import { Metadata } from 'next';
import { tr } from '@/lib/i18n/t';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Privacy Policy | Nightlife Milan',
  description: 'Privacy Policy for Nightlife Milan.',
};

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <main className="flex-1 bg-[#131009] w-full py-24 px-4 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto prose prose-invert prose-lg">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-champagne mb-8">
          {tr(locale, 'Privacy Policy', 'Informativa sulla Privacy')}
        </h1>
        
        <p className="text-zinc-300 font-light leading-relaxed">
          {tr(locale, 'Last updated: July 15, 2026', 'Ultimo aggiornamento: 15 luglio 2026')}
        </p>

        <section className="mt-12">
          <h2 className="font-serif text-2xl font-bold text-champagne mb-4">
            {tr(locale, '1. Information We Collect', '1. Informazioni che raccogliamo')}
          </h2>
          <p className="text-zinc-300 font-light leading-relaxed">
            {tr(locale, 'We collect information to provide better services to all our users. This includes basic stuff like which language you speak, to more complex things like which events you find most useful.', 'Raccogliamo informazioni per fornire servizi migliori a tutti i nostri utenti. Questo include informazioni di base come la lingua che parli, fino a cose più complesse come quali eventi trovi più utili.')}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl font-bold text-champagne mb-4">
            {tr(locale, '2. How We Use Information', '2. Come utilizziamo le informazioni')}
          </h2>
          <p className="text-zinc-300 font-light leading-relaxed">
            {tr(locale, 'We use the information we collect from all of our services to provide, maintain, protect and improve them, to develop new ones, and to protect Nightlife Milan and our users.', 'Utilizziamo le informazioni che raccogliamo da tutti i nostri servizi per fornire, mantenere, proteggere e migliorare tali servizi, per svilupparne di nuovi e per proteggere Nightlife Milan e i nostri utenti.')}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl font-bold text-champagne mb-4">
            {tr(locale, '3. Information Sharing', '3. Condivisione delle informazioni')}
          </h2>
          <p className="text-zinc-300 font-light leading-relaxed">
            {tr(locale, 'We do not share personal information with companies, organizations and individuals outside of Nightlife Milan unless one of the following circumstances applies: with your consent, for external processing, or for legal reasons.', 'Non condividiamo le informazioni personali con aziende, organizzazioni e individui al di fuori di Nightlife Milan a meno che non si verifichi una delle seguenti circostanze: con il tuo consenso, per l\'elaborazione esterna, o per motivi legali.')}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl font-bold text-champagne mb-4">
            {tr(locale, '4. Event registrations and customer records', '4. Registrazioni agli eventi e archivio clienti')}
          </h2>
          <p className="text-zinc-300 font-light leading-relaxed">
            {tr(
              locale,
              'When you register for or book an event managed by Nightlife Milan through Eventbrite, we may receive your name, email address, phone number if supplied, event and ticket details, registration status, check-in status, language of the event, and Eventbrite marketing preference. We do not import free-form answers, postal addresses, barcodes, birth dates, or other data that is not necessary for customer and booking management.',
              'Quando ti registri o prenoti un evento gestito da Nightlife Milan tramite Eventbrite, possiamo ricevere nome, indirizzo email, numero di telefono se fornito, dati dell’evento e del titolo di accesso, stato della registrazione, check-in, lingua dell’evento e preferenza marketing registrata da Eventbrite. Non importiamo risposte libere, indirizzi postali, codici a barre, date di nascita o altri dati non necessari alla gestione del cliente e della prenotazione.',
            )}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl font-bold text-champagne mb-4">
            {tr(locale, '5. Communications and marketing choices', '5. Comunicazioni e preferenze marketing')}
          </h2>
          <p className="text-zinc-300 font-light leading-relaxed">
            {tr(
              locale,
              'We use registration data to manage bookings, provide event information, assist customers, prevent abuse, and analyse attendance. Promotional email is enabled only when a valid marketing permission is recorded. Transactional event messages may still be sent when necessary to complete or manage a booking. You may object to direct marketing or withdraw consent at any time by writing to concierge@nightlifemilan.com.',
              'Utilizziamo i dati di registrazione per gestire prenotazioni, fornire informazioni sull’evento, assistere i clienti, prevenire abusi e analizzare le partecipazioni. Le email promozionali vengono abilitate solo quando risulta un valido consenso marketing. Le comunicazioni transazionali relative all’evento possono essere inviate quando necessarie per completare o gestire una prenotazione. Puoi opporti al marketing diretto o revocare il consenso in qualsiasi momento scrivendo a concierge@nightlifemilan.com.',
            )}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl font-bold text-champagne mb-4">
            {tr(locale, '6. Retention and your rights', '6. Conservazione e tuoi diritti')}
          </h2>
          <p className="text-zinc-300 font-light leading-relaxed">
            {tr(
              locale,
              'We keep personal data only for as long as needed for the stated purposes, legal obligations, dispute management, and valid marketing permissions. You may request access, correction, restriction, portability, or deletion of your data, subject to legal retention requirements, by contacting concierge@nightlifemilan.com.',
              'Conserviamo i dati personali solo per il tempo necessario alle finalità indicate, agli obblighi di legge, alla gestione delle contestazioni e ai consensi marketing validi. Puoi chiedere accesso, rettifica, limitazione, portabilità o cancellazione dei tuoi dati, fatti salvi gli obblighi legali di conservazione, contattando concierge@nightlifemilan.com.',
            )}
          </p>
        </section>
      </article>
    </main>
  );
}
