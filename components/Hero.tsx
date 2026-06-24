import Image from 'next/image';
import { getVenues } from '@/lib/data';
import HeroInteractive from './HeroInteractive';

export default function Hero({ locale }: { locale: string }) {
  const typedLocale = (locale === 'it' ? 'it' : 'en') as 'en' | 'it';
  const featuredVenues = getVenues().filter(v => v.isFeatured);
  const firstVenue = featuredVenues[0];
  const firstImage = firstVenue.gallery?.[0] || firstVenue.image || '/images/milan-nightclub-luxury-vip-champagne.webp';

  return (
    <section className="relative w-full h-[100svh] min-h-[560px] max-h-[900px] overflow-hidden bg-black flex items-end">
      {/* SSR first frame — Next.js emits <link rel="preload" fetchpriority="high"> for /_next/image */}
      <div className="absolute inset-0 z-[1]">
        <Image
          src={firstImage}
          alt={firstVenue.localizedContent.name[typedLocale] || firstVenue.localizedContent.name.en}
          fill
          priority
          quality={75}
          className="object-cover"
          sizes="100vw"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>

      {/* Client component: slideshow rotation, animations, text, dots */}
      <HeroInteractive venues={featuredVenues} locale={locale} firstVenueId={firstVenue.id} />

      {/* Corner vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)' }}
      />
    </section>
  );
}
