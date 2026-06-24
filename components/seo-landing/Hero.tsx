import Image from 'next/image';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
}

export default function Hero({ title, subtitle, ctaText, ctaLink, imageUrl }: HeroProps) {
  return (
    <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* 
        Immagine ottimizzata per LCP (Largest Contentful Paint).
        - priority: true forza il caricamento immediato
        - sizes: garantisce il caricamento della risoluzione corretta
        - placeholder: blur per una transizione morbida (se supportato, qui usiamo un fallback CSS)
      */}
      <Image
        src={imageUrl}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        referrerPolicy="no-referrer"
      />
      
      {/* Overlay per garantire il contrasto del testo (WCAG) */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" aria-hidden="true" />
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-3xl font-light drop-shadow-md">
          {subtitle}
        </p>
        
        {/* Call to Action chiara e accessibile */}
        <a
          href={ctaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black bg-champagne hover:bg-champagne/90 rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(201,168,106,0.3)] focus:outline-none focus:ring-4 focus:ring-champagne/50"
          aria-label={`${ctaText} per ${title}`}
        >
          {/* Icona SVG inline per ridurre le richieste HTTP */}
          <svg 
            className="w-6 h-6 mr-2" 
            fill="currentColor" 
            viewBox="0 0 24 24" 
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
          </svg>
          {ctaText}
        </a>
      </div>
    </section>
  );
}
