import Image from 'next/image';
import { getVenues } from '@/lib/data';
import HeroInteractive from './HeroInteractive';

const HERO_Q = 55;

export default function Hero({ locale }: { locale: string }) {
  const typedLocale = (locale === 'it' ? 'it' : 'en') as 'en' | 'it';
  const featuredVenues = getVenues().filter(v => v.isFeatured);
  const firstVenue = featuredVenues[0];
  const firstImage = firstVenue.gallery?.[0] || firstVenue.image || '/images/milan-nightclub-luxury-vip-champagne.webp';
  const enc = encodeURIComponent(firstImage);
  const srcset = [640, 828, 1080, 1200].map(w => `/_next/image?url=${enc}&w=${w}&q=${HERO_Q} ${w}w`).join(', ');

  // React 19 hoists <link> anywhere in the tree to <head>
  const preloadLinkProps = {
    rel: 'preload',
    as: 'image',
    href: `/_next/image?url=${enc}&w=828&q=${HERO_Q}`,
    fetchPriority: 'high',
    imagesrcset: srcset,
    imagesizes: '100vw',
  } as React.JSX.IntrinsicElements['link'];

  return (
    <>
      <link {...preloadLinkProps} />
      <section className="relative w-full h-[100svh] min-h-[560px] max-h-[900px] overflow-hidden bg-black flex items-end">
        <div className="absolute inset-0 z-[1]">
          <Image
            src={firstImage}
            alt={firstVenue.localizedContent.name[typedLocale] || firstVenue.localizedContent.name.en}
            fill
            priority
            quality={HERO_Q}
            className="object-cover"
            sizes="100vw"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        </div>

        <HeroInteractive venues={featuredVenues} locale={locale} firstVenueId={firstVenue.id} />

        <div
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)' }}
        />
      </section>
    </>
  );
}
