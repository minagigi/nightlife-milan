import { Metadata } from 'next';
import Hero from '@/components/seo-landing/Hero';

// ISR (Incremental Static Regeneration) per mantenere i dati aggiornati ma veloci
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Just Me Milano | Eventi, Prezzi e Prenotazioni 2026',
  description: 'Scopri il Just Me Milano. Prenota il tuo tavolo VIP, scopri i prezzi, il dress code e gli eventi esclusivi del club più iconico di Milano.',
};

export default function LandingPage() {
  // Generazione JSON-LD per LocalBusiness / EntertainmentBusiness
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EntertainmentBusiness',
    name: 'Just Me Milano',
    image: '/images/just-me-milano.webp',
    '@id': 'https://nightlifemilan.com/clubs/justme',
    url: 'https://nightlifemilan.com/clubs/justme',
    telephone: '+393519127047',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Viale Luigi Camoens, 15',
      addressLocality: 'Milano',
      postalCode: '20121',
      addressCountry: 'IT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.4737,
      longitude: 9.1746,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '19:30',
        closes: '05:00',
      },
    ],
    priceRange: '$$$',
    sameAs: [
      'https://www.instagram.com/justmemilano',
      'https://www.facebook.com/justmemilano',
    ],
  };

  return (
    <main id="main-content" className="flex-1 flex flex-col w-full">
      {/* Script JSON-LD iniettato nell'head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section (LCP Ottimizzato) */}
      <Hero 
        title="Just Me Milano"
        subtitle="L'esperienza notturna definitiva all'ombra della Torre Branca."
        ctaText="Prenota ora su WhatsApp"
        ctaLink="https://wa.me/393519127047"
        imageUrl="/images/just-me-milano.webp"
      />

      {/* Sezione Contenuti (SEO & Accessibilità) */}
      <section id="eventi" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <article className="max-w-none">
          <h2 className="text-3xl font-bold text-champagne mb-8">
            Eventi Esclusivi e Serate a Tema
          </h2>
          <p className="text-white/70 leading-relaxed mb-6">
            Il <strong>Just Me Milano</strong> (ex Just Cavalli) rappresenta l&apos;apice della vita notturna milanese. 
            Situato nel cuore del Parco Sempione, offre un&apos;esperienza unica che unisce alta cucina, 
            design d&apos;avanguardia e i migliori DJ set internazionali.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
            <li className="bg-white/[0.03] p-6 rounded-lg border border-white/5 hover:border-champagne/50 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Aperitivo (19:30 - 22:30)</h3>
              <p className="text-white/50">Buffet reale e cocktail d&apos;autore in un&apos;atmosfera lounge elegante.</p>
            </li>
            <li className="bg-white/[0.03] p-6 rounded-lg border border-white/5 hover:border-champagne/50 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Clubbing (23:00 - 05:00)</h3>
              <p className="text-white/50">La vera anima del locale si accende con musica House e Commerciale.</p>
            </li>
          </ul>
        </article>
      </section>
    </main>
  );
}
