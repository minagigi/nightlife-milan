'use client';

import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import { MapPin, ArrowUpRight } from 'lucide-react';
import FavoriteButton from './FavoriteButton';
import { isEnabledLocale, localePrefix, type LocaleCode } from '@/lib/i18n/locales';
import { getLocalizedVenueSlug35 } from '@/lib/i18n/localizedSlugs35';

type VenueCardLabels = {
  topPick: string;
  verified: string;
  openTonight: string;
  selectivity: string;
  explore: string;
  viewVenue: string;
};

const VENUE_CARD_COPY: Record<LocaleCode, VenueCardLabels> = {
  en: { topPick: 'Top Pick', verified: 'Verified', openTonight: 'Open Tonight', selectivity: 'Selectivity', explore: 'Explore', viewVenue: 'View {venue}' },
  it: { topPick: 'Consigliato', verified: 'Verificato', openTonight: 'Aperto Stasera', selectivity: 'Selettività', explore: 'Scopri', viewVenue: 'Scopri {venue}' },
  es: { topPick: 'Destacado', verified: 'Verificado', openTonight: 'Abierto Hoy', selectivity: 'Selectividad', explore: 'Explorar', viewVenue: 'Ver {venue}' },
  fr: { topPick: 'Sélection', verified: 'Vérifié', openTonight: 'Ouvert Ce Soir', selectivity: 'Sélectivité', explore: 'Découvrir', viewVenue: 'Voir {venue}' },
  de: { topPick: 'Empfehlung', verified: 'Verifiziert', openTonight: 'Heute Geöffnet', selectivity: 'Selektivität', explore: 'Entdecken', viewVenue: '{venue} ansehen' },
  pt: { topPick: 'Destaque', verified: 'Verificado', openTonight: 'Aberto Hoje', selectivity: 'Seletividade', explore: 'Explorar', viewVenue: 'Ver {venue}' },
  nl: { topPick: 'Aanrader', verified: 'Geverifieerd', openTonight: 'Vanavond Open', selectivity: 'Selectiviteit', explore: 'Ontdek', viewVenue: 'Bekijk {venue}' },
  ru: { topPick: 'Выбор', verified: 'Проверено', openTonight: 'Открыто сегодня', selectivity: 'Фейсконтроль', explore: 'Подробнее', viewVenue: 'Открыть {venue}' },
  tr: { topPick: 'Öne Çıkan', verified: 'Doğrulandı', openTonight: 'Bu Gece Açık', selectivity: 'Seçicilik', explore: 'Keşfet', viewVenue: '{venue} incele' },
  zh: { topPick: '精选推荐', verified: '官方认证', openTonight: '今晚营业', selectivity: '入场筛选度', explore: '查看详情', viewVenue: '查看 {venue}' },
  ar: { topPick: 'مختار', verified: 'موثق', openTonight: 'مفتوح الليلة', selectivity: 'انتقائية الدخول', explore: 'استكشف', viewVenue: 'عرض {venue}' },
  bg: { topPick: 'Препоръчан', verified: 'Проверен', openTonight: 'Отворено тази вечер', selectivity: 'Селективност', explore: 'Разгледай', viewVenue: 'Виж {venue}' },
  hr: { topPick: 'Preporuka', verified: 'Provjereno', openTonight: 'Otvoreno večeras', selectivity: 'Selektivnost', explore: 'Istraži', viewVenue: 'Pogledaj {venue}' },
  cs: { topPick: 'Doporučeno', verified: 'Ověřeno', openTonight: 'Dnes otevřeno', selectivity: 'Selektivita', explore: 'Prozkoumat', viewVenue: 'Zobrazit {venue}' },
  da: { topPick: 'Anbefalet', verified: 'Verificeret', openTonight: 'Åben i aften', selectivity: 'Selektivitet', explore: 'Udforsk', viewVenue: 'Se {venue}' },
  et: { topPick: 'Soovitatud', verified: 'Kinnitatud', openTonight: 'Täna avatud', selectivity: 'Valivus', explore: 'Avasta', viewVenue: 'Vaata {venue}' },
  fi: { topPick: 'Suositus', verified: 'Vahvistettu', openTonight: 'Avoinna tänään', selectivity: 'Valikoivuus', explore: 'Tutustu', viewVenue: 'Katso {venue}' },
  el: { topPick: 'Επιλογή', verified: 'Επιβεβαιωμένο', openTonight: 'Ανοιχτά απόψε', selectivity: 'Επιλεκτικότητα', explore: 'Εξερεύνηση', viewVenue: 'Προβολή {venue}' },
  hu: { topPick: 'Ajánlott', verified: 'Ellenőrzött', openTonight: 'Ma este nyitva', selectivity: 'Szelektivitás', explore: 'Felfedezés', viewVenue: '{venue} megtekintése' },
  ga: { topPick: 'Rogha Barr', verified: 'Fíoraithe', openTonight: 'Oscailte Anocht', selectivity: 'Roghnaíocht', explore: 'Fiosraigh', viewVenue: 'Féach ar {venue}' },
  lv: { topPick: 'Ieteikums', verified: 'Verificēts', openTonight: 'Atvērts šovakar', selectivity: 'Selektivitāte', explore: 'Izpētīt', viewVenue: 'Skatīt {venue}' },
  lt: { topPick: 'Rekomenduojama', verified: 'Patvirtinta', openTonight: 'Šįvakar dirba', selectivity: 'Atranka', explore: 'Atrasti', viewVenue: 'Peržiūrėti {venue}' },
  mt: { topPick: 'Rakkomandat', verified: 'Verifikat', openTonight: 'Miftuħ Illejla', selectivity: 'Selettività', explore: 'Esplora', viewVenue: 'Ara {venue}' },
  pl: { topPick: 'Polecane', verified: 'Zweryfikowano', openTonight: 'Otwarte dziś', selectivity: 'Selekcja', explore: 'Odkryj', viewVenue: 'Zobacz {venue}' },
  ro: { topPick: 'Recomandat', verified: 'Verificat', openTonight: 'Deschis diseară', selectivity: 'Selectivitate', explore: 'Explorează', viewVenue: 'Vezi {venue}' },
  sk: { topPick: 'Odporúčané', verified: 'Overené', openTonight: 'Dnes otvorené', selectivity: 'Selektivita', explore: 'Preskúmať', viewVenue: 'Zobraziť {venue}' },
  sl: { topPick: 'Priporočeno', verified: 'Preverjeno', openTonight: 'Odprto nocoj', selectivity: 'Selektivnost', explore: 'Razišči', viewVenue: 'Poglej {venue}' },
  sv: { topPick: 'Utvald', verified: 'Verifierad', openTonight: 'Öppet ikväll', selectivity: 'Selektivitet', explore: 'Utforska', viewVenue: 'Visa {venue}' },
  no: { topPick: 'Anbefalt', verified: 'Verifisert', openTonight: 'Åpent i kveld', selectivity: 'Selektivitet', explore: 'Utforsk', viewVenue: 'Se {venue}' },
  is: { topPick: 'Valið', verified: 'Staðfest', openTonight: 'Opið í kvöld', selectivity: 'Valhæfni', explore: 'Skoða', viewVenue: 'Skoða {venue}' },
  uk: { topPick: 'Рекомендовано', verified: 'Перевірено', openTonight: 'Відкрито сьогодні', selectivity: 'Фейсконтроль', explore: 'Детальніше', viewVenue: 'Переглянути {venue}' },
  sq: { topPick: 'E zgjedhur', verified: 'Verifikuar', openTonight: 'Hapur sonte', selectivity: 'Përzgjedhja', explore: 'Eksploro', viewVenue: 'Shiko {venue}' },
  sr: { topPick: 'Preporuka', verified: 'Provereno', openTonight: 'Otvoreno večeras', selectivity: 'Selektivnost', explore: 'Istraži', viewVenue: 'Pogledaj {venue}' },
  bs: { topPick: 'Preporuka', verified: 'Provjereno', openTonight: 'Otvoreno večeras', selectivity: 'Selektivnost', explore: 'Istraži', viewVenue: 'Pogledaj {venue}' },
  mk: { topPick: 'Препорачано', verified: 'Потврдено', openTonight: 'Отворено вечерва', selectivity: 'Селективност', explore: 'Истражи', viewVenue: 'Погледни {venue}' },
};

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
  isManaged,
  isFeatured,
  isOpenTonight,
  priceRange,
  lang = 'en',
  customUrl,
}: VenueProps) {
  const localeCode = (isEnabledLocale(lang) ? lang : 'en') as LocaleCode;
  const labels = VENUE_CARD_COPY[localeCode] || VENUE_CARD_COPY.en;
  const href = customUrl || `${localePrefix(localeCode)}/clubs/${getLocalizedVenueSlug35(slug || id, localeCode)}`;

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
      <Link
        href={href}
        className="absolute inset-0 z-30 focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-inset rounded-lg"
        aria-label={labels.viewVenue.replace('{venue}', name)}
      >
        <span className="sr-only">{name}</span>
      </Link>

      {/* Full-bleed image */}
      <Image
        src={image}
        alt={name}
        fill
        quality={92}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 45vw"
        decoding="async"
      />

      {/* Permanent dark gradient at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 z-10" />

      {/* Hover inner glow */}
      <div
        className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,168,106,0.16) 0%, transparent 65%)' }}
      />

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
          <span className="bg-gradient-to-b from-[#2A2214] to-[#1C1810] border border-brass/40 text-champagne text-[10px] font-sans font-medium px-3 py-1.5 tracking-[0.2em] uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(0,0,0,0.5)]">
            {labels.topPick}
          </span>
        )}
        {isManaged && (
          <span className="bg-gradient-to-b from-[#2A2214] to-[#1C1810] border border-brass/40 text-white text-[10px] font-sans font-medium px-3 py-1.5 tracking-[0.15em] uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(0,0,0,0.5)]">
            {labels.verified}
          </span>
        )}
        {isOpenTonight && (
          <span className="bg-gradient-to-b from-[#2A2214] to-[#1C1810] border border-emerald-500/40 text-emerald-400 text-[10px] font-sans font-medium px-3 py-1.5 tracking-[0.15em] uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(0,0,0,0.5)]">
            {labels.openTonight}
          </span>
        )}
      </div>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6">
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

        <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white leading-tight mb-3
          group-hover:text-champagne transition-colors duration-400">
          {name}
        </h3>

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
            {labels.selectivity}
          </span>
        </div>

        <div className="overflow-hidden max-h-12 lg:max-h-0 lg:opacity-0 lg:translate-y-1 lg:group-hover:max-h-[120px] lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-400 ease-out">
          {insiderTip && (
            <p className="hidden lg:block text-white/60 text-xs font-sans leading-relaxed italic line-clamp-2 mb-3 border-l-2 border-champagne/40 pl-3">
              &ldquo;{insiderTip}&rdquo;
            </p>
          )}
          <div className="flex items-center justify-between">
            {priceRange && (
              <span className="text-champagne text-sm font-sans font-medium tabular-nums">{priceRange}</span>
            )}
            <span className="flex items-center gap-1.5 text-champagne text-xs font-sans font-semibold tracking-[0.15em] uppercase ml-auto">
              {labels.explore}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
