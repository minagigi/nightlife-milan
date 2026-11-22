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
      data-venue-card={id}
      data-no-lightbox="true"
      className={`group relative overflow-hidden cursor-pointer border bg-[#0B0A09]
        aspect-[4/5]
        transition-colors duration-200
        ${isFeatured
          ? 'border-[#EAE3D5]/40 hover:border-[#EAE3D5]'
          : 'border-[#F6F1E7]/14 hover:border-[#EAE3D5]'
        }`}
    >
      <Link
        href={href}
        className="absolute inset-0 z-30 focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-inset"
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
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 45vw"
        decoding="async"
      />

      {/* Deep Couture Noir gradient scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/55 to-transparent z-10" />

      {/* Top accent border for featured */}
      {isFeatured && (
        <div className="absolute top-0 inset-x-0 h-[2px] bg-[#25D366] z-20" />
      )}

      {/* Favorite */}
      <FavoriteButton
        item={{ id, type: 'venue', title: name, image, subtitle: zone, url: href }}
      />

      {/* Top-left badges */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
        {isFeatured && (
          <span className="bg-[#050505]/92 border border-[#EAE3D5]/32 text-[#EAE3D5] text-[12px] font-sans font-semibold px-3 py-1">
            {labels.topPick}
          </span>
        )}
        {isManaged && (
          <span className="bg-[#050505]/92 border border-[#F6F1E7]/20 text-[#F6F1E7] text-[12px] font-sans font-semibold px-3 py-1">
            {labels.verified}
          </span>
        )}
        {isOpenTonight && (
          <span className="bg-[#050505]/92 border border-[#25D366]/60 text-[#25D366] text-[12px] font-sans font-bold px-3 py-1">
            {labels.openTonight}
          </span>
        )}
      </div>

      {/* Bottom content (always visible — zero mouse reveal) */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-3.5 h-3.5 text-[#EAE3D5] flex-shrink-0" />
          <span className="text-[#EAE3D5] text-[12px] font-sans font-semibold">
            {zone}
          </span>
          <span className="text-[#A8A093] text-[12px]">·</span>
          <span className="text-[#C2B9AA] text-[12px] font-sans truncate">
            {mood}
          </span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F6F1E7] leading-tight mb-3 group-hover:text-[#EAE3D5] transition-colors">
          {name}
        </h3>

        <div className="flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`h-1 ${
                level <= entryDifficulty
                  ? 'w-4 bg-[#EAE3D5]'
                  : 'w-2 bg-[#F6F1E7]/20'
              }`}
            />
          ))}
          <span className="text-[#C2B9AA] text-[12px] font-sans ml-2">
            {labels.selectivity}
          </span>
        </div>

        {insiderTip && (
          <p className="hidden lg:block text-[#DED8CC] text-xs font-sans leading-relaxed italic line-clamp-2 mb-3 border-l-2 border-[#EAE3D5]/40 pl-3">
            &ldquo;{insiderTip}&rdquo;
          </p>
        )}
        <div className="flex items-center justify-between pt-2 border-t border-[#F6F1E7]/14">
          {priceRange && (
            <span className="font-mono text-[#EAE3D5] text-sm font-semibold tabular-nums">{priceRange}</span>
          )}
          <span className="flex items-center gap-1.5 text-[#25D366] text-xs font-sans font-bold ml-auto">
            {labels.explore}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
        <div className="mt-2 pt-1.5 border-t border-[#EAE3D5]/18 flex items-center justify-between gap-2 font-mono text-[10px] tracking-wider text-[#F6F1E7]/90">
          <span className="font-semibold">WWW.NIGHTLIFEMILAN.COM</span>
          <span className="font-bold text-[#25D366]">+39 351 912 7047</span>
        </div>
      </div>
    </div>
  );
}
