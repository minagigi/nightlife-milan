import { Metadata } from 'next';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Terms of Service | Nightlife Milan',
  description: 'Terms of Service for Nightlife Milan.',
};

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isIt = locale === 'it';

  return (
    <main className="flex-1 bg-[#131009] w-full py-24 px-4 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto prose prose-invert prose-lg">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-champagne mb-8">
          {isIt ? 'Termini di Servizio' : 'Terms of Service'}
        </h1>
        
        <p className="text-zinc-300 font-light leading-relaxed">
          {isIt 
            ? 'Ultimo aggiornamento: 9 Marzo 2026' 
            : 'Last updated: March 9, 2026'}
        </p>

        <section className="mt-12">
          <h2 className="font-serif text-2xl font-bold text-champagne mb-4">
            {isIt ? '1. Accettazione dei Termini' : '1. Acceptance of Terms'}
          </h2>
          <p className="text-zinc-300 font-light leading-relaxed">
            {isIt 
              ? 'Accedendo e utilizzando Nightlife Milan, accetti di essere vincolato da questi Termini di Servizio e da tutte le leggi e i regolamenti applicabili.'
              : 'By accessing and using Nightlife Milan, you agree to be bound by these Terms of Service and all applicable laws and regulations.'}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl font-bold text-champagne mb-4">
            {isIt ? '2. Uso del Servizio' : '2. Use of Service'}
          </h2>
          <p className="text-zinc-300 font-light leading-relaxed">
            {isIt 
              ? 'Ti impegni a utilizzare il servizio solo per scopi leciti e in un modo che non violi i diritti di, o limiti o inibisca l\'uso e il godimento del servizio da parte di terzi.'
              : 'You agree to use the service only for lawful purposes, and in a way that does not infringe the rights of, restrict or inhibit anyone else\'s use and enjoyment of the service.'}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl font-bold text-champagne mb-4">
            {isIt ? '3. Esclusione di Garanzie' : '3. Disclaimer'}
          </h2>
          <p className="text-zinc-300 font-light leading-relaxed">
            {isIt 
              ? 'I materiali sul sito web di Nightlife Milan sono forniti "così come sono". Nightlife Milan non fornisce alcuna garanzia, espressa o implicita, e con la presente declina e nega tutte le altre garanzie, incluse, senza limitazione, garanzie implicite o condizioni di commerciabilità, idoneità per uno scopo particolare, o non violazione della proprietà intellettuale o altra violazione dei diritti.'
              : 'The materials on Nightlife Milan\'s website are provided on an \'as is\' basis. Nightlife Milan makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.'}
          </p>
        </section>
      </article>
    </main>
  );
}
