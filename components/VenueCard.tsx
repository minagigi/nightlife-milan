'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowUpRight } from 'lucide-react';
import FavoriteButton from './FavoriteButton';

export interface VenueProps {
  id: string;
  slug?: string;
  name: string;
  image: string;
  zone: string;
  mood: string;
  entryDifficulty: number;
  insiderTip: string;
  isEditorChoice?: boolean;
  isManaged?: boolean;
  isFeatured?: boolean;
  isOpenTonight?: boolean;
  priceRange?: string;
  lang?: string;
  customUrl?: string;
}

export default function VenueCard({
  id,
  slug,
  name,
  image,
  zone,
  mood,
  entryDifficulty,
  insiderTip,
  isEditorChoice,
  isManaged,
  isFeatured,
  isOpenTonight,
  priceRange,
  lang = 'en',
  customUrl,
}: VenueProps) {
  const href = customUrl || `/${lang}/clubs/${slug || id}`;

  return (
    <div
      className={`group relative overflow-hidden rounded-lg cursor-pointer img-maison
        aspect-[3/4]
        transition-all duration-500
        ${isFeatured
          ? 'ring-1 ring-champagne/50 shadow-[0_0_40px_rgba(201,168,106,0.12)]'
          : 'hover:ring-1 hover:ring-champagne/30 hover:shadow-[0_0_32px_rgba(201,168,106,0.08)]'
        }`}
    >
      <Link href={href} className="absolute inset-0 z-30 focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-inset rounded-lg" aria-label={`View ${name}`}>
        <span className="sr-only">{name}</span>
      </Link>

      {/* Full-bleed image */}
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        decoding="async"
      />

      {/* Permanent dark gradient at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 z-10" />

      {/* Top fade for badges */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent z-10" />

      {/* Gold shimmer line at top for featured */}
      {isFeatured && (
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent z-20" />
      )}

      {/* Favorite */}
      <FavoriteButton
        item={{ id, type: 'venue', title: name, image, subtitle: zone, url: href }}
      />

      {/* Top-left badges */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
        {isFeatured && (
          <span className="bg-champagne text-[#1C1810] text-[10px] font-sans font-bold px-3 py-1 rounded-full tracking-[0.15em] uppercase">
            {lang === 'it' ? 'Consigliato' : 'Top Pick'}
          </span>
        )}
        {isManaged && (
          <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-sans font-bold px-3 py-1 rounded-full tracking-[0.12em] uppercase border border-white/20">
            {lang === 'it' ? 'Verificato' : 'Verified'}
          </span>
        )}
        {isOpenTonight && (
          <span className="bg-emerald-500/20 backdrop-blur-md text-emerald-400 text-[10px] font-sans font-bold px-3 py-1 rounded-full tracking-[0.12em] uppercase border border-emerald-500/40">
            {lang === 'it' ? 'Aperto Stasera' : 'Open Tonight'}
          </span>
        )}
      </div>

      {/* Bottom content — always visible */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6">

        {/* Zone + mood */}
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-3 h-3 text-champagne/70 flex-shrink-0" />
          <span className="text-champagne/70 text-[11px] font-sans tracking-[0.2em] uppercase">
            {zone}
          </span>
          <span className="text-white/30 text-[11px]">·</span>
          <span className="text-white/50 text-[11px] font-sans tracking-wider uppercase truncate">
            {mood}
          </span>
        </div>

        {/* Name */}
        <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white leading-tight mb-3
          group-hover:text-champagne transition-colors duration-400">
          {name}
        </h3>

        {/* Entry difficulty dots */}
        <div className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`h-1 rounded-full transition-all duration-300 ${
                level <= entryDifficulty
                  ? 'w-4 bg-champagne'
                  : 'w-2 bg-white/20'
              }`}
            />
          ))}
          <span className="text-white/40 text-[10px] font-sans ml-2 tracking-wider uppercase">
            {lang === 'it' ? 'Selettività' : 'Selectivity'}
          </span>
        </div>

        {/* Mobile: always show CTA. Desktop: reveal on hover */}
        <div className="overflow-hidden max-h-12 lg:max-h-0 lg:opacity-0 lg:translate-y-1 lg:group-hover:max-h-[120px] lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-400 ease-out">
          {insiderTip && (
            <p className="hidden lg:block text-white/60 text-xs font-sans leading-relaxed italic line-clamp-2 mb-3 border-l-2 border-champagne/40 pl-3">
              &ldquo;{insiderTip}&rdquo;
            </p>
          )}
          <div className="flex items-center justify-between">
            {priceRange && (
              <span className="text-champagne text-sm font-sans font-medium">{priceRange}</span>
            )}
            <span className="flex items-center gap-1.5 text-champagne text-xs font-sans font-semibold tracking-[0.15em] uppercase ml-auto">
              {lang === 'it' ? 'Scopri' : 'Explore'}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
