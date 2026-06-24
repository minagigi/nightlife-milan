import Image from 'next/image';
import Link from 'next/link';
import { Event, Venue } from '@/lib/types';
import FavoriteButton from './FavoriteButton';

interface EventCardProps {
  event: Event;
  venue: Venue;
  lang: string;
  priority?: boolean;
}

export default function EventCard({ event, venue, lang, priority = false }: EventCardProps) {
  const typedLang = (lang === 'it' ? 'it' : 'en') as 'en' | 'it';
  const langPrefix = typedLang === 'it' ? '/it' : '';

  const slug = event.localizedContent.slug[typedLang] || event.localizedContent.slug.en;
  const title = event.localizedContent.title[typedLang] || event.localizedContent.title.en;
  const venueName = venue.localizedContent.name[typedLang] || venue.localizedContent.name.en;
  const altText = venue.localizedContent.altTextImg?.[typedLang] || title;

  const dateObj = new Date(event.dateISO);
  const timeStr = new Intl.DateTimeFormat(typedLang === 'it' ? 'it-IT' : 'en-US', {
    hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Rome',
  }).format(dateObj);
  const dateStr = new Intl.DateTimeFormat(typedLang === 'it' ? 'it-IT' : 'en-US', {
    weekday: 'short', day: 'numeric', month: 'short', timeZone: 'Europe/Rome',
  }).format(dateObj);

  const isFree = event.pricing.entry === 0;
  const formattedPrice = isFree
    ? (typedLang === 'it' ? 'GRATUITO' : 'FREE')
    : new Intl.NumberFormat(typedLang === 'it' ? 'it-IT' : 'en-US', {
        style: 'currency', currency: event.pricing.currency, maximumFractionDigits: 0,
      }).format(event.pricing.entry);

  const genre = event.genre[0]?.replace(/_/g, ' ') ?? '';

  return (
    <article className="group relative overflow-hidden rounded-lg cursor-pointer aspect-[3/4] img-maison
      transition-all duration-500
      border border-white/5
      hover:border-champagne/30
      hover:shadow-[0_0_0_1px_rgba(201,168,106,0.2),0_16px_48px_rgba(201,168,106,0.08)]">

      {/* Full-card link */}
      <Link href={`${langPrefix}/events/${slug}`} className="absolute inset-0 z-20" aria-label={title}>
        <span className="sr-only">{title}</span>
      </Link>

      {/* Image */}
      <Image
        src={event.image || venue.image || '/images/milan-nightclub-luxury-vip-champagne.webp'}
        alt={altText}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority={priority}
        quality={65}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        referrerPolicy="no-referrer"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/5 z-10" />

      {/* Gold shimmer top line on featured */}
      {venue.isFeatured && (
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent z-20" />
      )}

      {/* Genre badge top-left */}
      <div className="absolute top-4 left-4 z-20">
        <span className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase
          bg-black/50 backdrop-blur-md border border-white/15
          text-white/80 px-3 py-1.5 rounded-full">
          {genre}
        </span>
      </div>

      {/* Price badge top-right */}
      <div className="absolute top-4 right-14 z-20">
        <span className={`font-sans text-[10px] font-bold tracking-[0.15em] uppercase
          px-2.5 py-1.5 rounded-full
          ${isFree
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            : 'bg-champagne text-black'
          }`}>
          {formattedPrice}
        </span>
      </div>

      {/* Favorite */}
      <div className="absolute top-4 right-4 z-20">
        <FavoriteButton
          item={{ id: event.id, type: 'event', title, image: event.image || venue.image || '', subtitle: dateStr, url: `${langPrefix}/events/${slug}` }}
        />
      </div>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-5">

        {/* Time */}
        <div className="flex items-center gap-2 mb-2">
          <span className="font-sans text-champagne text-[11px] font-semibold tracking-[0.2em] uppercase">
            {timeStr}
          </span>
          <span className="text-white/30 text-[10px]">·</span>
          <span className="font-sans text-white/50 text-[11px] tracking-wider">{dateStr}</span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl font-semibold text-white leading-snug mb-1
          group-hover:text-champagne transition-colors duration-300">
          {title}
        </h3>

        {/* Venue name */}
        <p className="font-sans text-white/50 text-[11px] tracking-[0.15em] uppercase mb-3">
          {venueName}
        </p>

        {/* Trending badge — editorial curation, no fabricated attendance numbers */}
        {event.isTrending && (
          <div className="flex items-center gap-2 mb-3">
            <span className="font-sans text-champagne text-[10px] font-bold tracking-[0.2em] uppercase">
              {typedLang === 'it' ? 'Di Tendenza' : 'Trending'}
            </span>
          </div>
        )}

        {/* CTA — always visible on mobile, reveal on hover desktop */}
        <div className="overflow-hidden max-h-12 lg:max-h-0 lg:opacity-0 lg:translate-y-1 lg:group-hover:max-h-[60px] lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-400 ease-out">
          <Link
            href={`${langPrefix}/events/${slug}#booking`}
            className="block w-full text-center bg-champagne text-black
              font-sans font-semibold text-xs py-3 tracking-[0.15em] uppercase
              hover:bg-white active:scale-[0.98] transition-all duration-300 relative z-30 cursor-pointer rounded-lg"
          >
            {typedLang === 'it' ? 'Prenota Ora' : 'Book Now'}
          </Link>
        </div>
      </div>
    </article>
  );
}
