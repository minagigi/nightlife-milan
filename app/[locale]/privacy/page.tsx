import { Metadata } from 'next';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Privacy Policy | Nightlife Milan',
  description: 'Privacy Policy for Nightlife Milan.',
};

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isIt = locale === 'it';

  return (
    <main className="flex-1 bg-[#131009] w-full py-24 px-4 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto prose prose-invert prose-lg">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-champagne mb-8">
          {isIt ? 'Informativa sulla Privacy' : 'Privacy Policy'}
        </h1>
        
        <p className="text-zinc-300 font-light leading-relaxed">
          {isIt 
            ? 'Ultimo aggiornamento: 9 Marzo 2026' 
            : 'Last updated: March 9, 2026'}
        </p>

        <section className="mt-12">
          <h2 className="font-serif text-2xl font-bold text-champagne mb-4">
            {isIt ? '1. Informazioni che raccogliamo' : '1. Information We Collect'}
          </h2>
          <p className="text-zinc-300 font-light leading-relaxed">
            {isIt 
              ? 'Raccogliamo informazioni per fornire servizi migliori a tutti i nostri utenti. Questo include informazioni di base come la lingua che parli, fino a cose più complesse come quali eventi trovi più utili.'
              : 'We collect information to provide better services to all our users. This includes basic stuff like which language you speak, to more complex things like which events you find most useful.'}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl font-bold text-champagne mb-4">
            {isIt ? '2. Come utilizziamo le informazioni' : '2. How We Use Information'}
          </h2>
          <p className="text-zinc-300 font-light leading-relaxed">
            {isIt 
              ? 'Utilizziamo le informazioni che raccogliamo da tutti i nostri servizi per fornire, mantenere, proteggere e migliorare tali servizi, per svilupparne di nuovi e per proteggere Nightlife Milan e i nostri utenti.'
              : 'We use the information we collect from all of our services to provide, maintain, protect and improve them, to develop new ones, and to protect Nightlife Milan and our users.'}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl font-bold text-champagne mb-4">
            {isIt ? '3. Condivisione delle informazioni' : '3. Information Sharing'}
          </h2>
          <p className="text-zinc-300 font-light leading-relaxed">
            {isIt 
              ? 'Non condividiamo le informazioni personali con aziende, organizzazioni e individui al di fuori di Nightlife Milan a meno che non si verifichi una delle seguenti circostanze: con il tuo consenso, per l\'elaborazione esterna, o per motivi legali.'
              : 'We do not share personal information with companies, organizations and individuals outside of Nightlife Milan unless one of the following circumstances applies: with your consent, for external processing, or for legal reasons.'}
          </p>
        </section>
      </article>
    </main>
  );
}
