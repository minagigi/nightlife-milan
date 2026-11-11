'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Map, Grid } from 'lucide-react';
import VenueCard, { VenueProps } from './VenueCard';

const VenueMap = dynamic(() => import('./VenueMap'), { ssr: false });

export interface VenueMapPin {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  href: string;
}

interface VenueMapToggleProps {
  venues: VenueProps[];
  lang: string;
  mapPins?: VenueMapPin[];
}

const DIRECTORY_UI_COPY: Record<string, { heading: string; sub: string; toMap: string; toGrid: string }> = {
  en: { heading: 'All Venues', sub: 'Explore the complete directory of Milan’s verified clubs.', toMap: 'Switch to Map View', toGrid: 'Switch to Grid View' },
  it: { heading: 'Tutti i Locali', sub: 'Esplora la selezione completa dei club verificati di Milano.', toMap: 'Mostra sulla Mappa', toGrid: 'Torna alla Griglia' },
  es: { heading: 'Todos los Locales', sub: 'Explora el directorio completo de los clubes verificados de Milán.', toMap: 'Ver en el Mapa', toGrid: 'Ver en Cuadrícula' },
  fr: { heading: 'Tous les Clubs', sub: 'Explorez le répertoire complet des clubs vérifiés de Milan.', toMap: 'Afficher la Carte', toGrid: 'Afficher la Grille' },
  de: { heading: 'Alle Clubs', sub: 'Entdecken Sie das komplette Verzeichnis verifizierter Mailänder Clubs.', toMap: 'Kartenansicht', toGrid: 'Rasteransicht' },
  pt: { heading: 'Todos os Clubes', sub: 'Explore o diretório completo dos clubes verificados de Milão.', toMap: 'Ver no Mapa', toGrid: 'Ver em Grelha' },
  nl: { heading: 'Alle Clubs', sub: 'Ontdek het volledige overzicht van geverifieerde clubs in Milaan.', toMap: 'Kaartweergave', toGrid: 'Rasterweergave' },
  ru: { heading: 'Все Клубы', sub: 'Полный каталог проверенных ночных клубов Милана.', toMap: 'На карте', toGrid: 'Сеткой' },
  tr: { heading: 'Tüm Kulüpler', sub: 'Milano’nun doğrulanmış kulüplerinin tam dizinini keşfedin.', toMap: 'Harita Görünümü', toGrid: 'Izgara Görünümü' },
  zh: { heading: '全部俱乐部', sub: '浏览米兰官方认证夜店与高空酒廊完整名录。', toMap: '切换地图视图', toGrid: '切换网格视图' },
  ar: { heading: 'جميع النوادي', sub: 'استكشف الدليل الكامل لنوادي ميلانو المعتمدة.', toMap: 'عرض الخريطة', toGrid: 'عرض الشبكة' },
  bg: { heading: 'Всички Клубове', sub: 'Разгледайте пълния каталог на проверените клубове в Милано.', toMap: 'Изглед на карта', toGrid: 'Изглед в мрежа' },
  hr: { heading: 'Svi Klubovi', sub: 'Istražite potpuni imenik provjerenih klubova u Milanu.', toMap: 'Prikaz karte', toGrid: 'Mrežni prikaz' },
  cs: { heading: 'Všechny Kluby', sub: 'Prozkoumejte kompletní přehled ověřených klubů v Miláně.', toMap: 'Zobrazit mapu', toGrid: 'Zobrazit mřížku' },
  da: { heading: 'Alle Klubber', sub: 'Udforsk hele oversigten over verificerede klubber i Milano.', toMap: 'Kortvisning', toGrid: 'Gittervisning' },
  et: { heading: 'Kõik Klubid', sub: 'Tutvu Milano kontrollitud ööklubide täieliku nimekirjaga.', toMap: 'Kaardivaade', toGrid: 'Ruudustikuvaade' },
  fi: { heading: 'Kaikki Klubit', sub: 'Tutustu Milanon vahvistettujen klubien täydelliseen hakemistoon.', toMap: 'Karttanäkymä', toGrid: 'Ruudukkonäkymä' },
  el: { heading: 'Όλα τα Κλαμπ', sub: 'Εξερευνήστε τον πλήρη κατάλογο επαληθευμένων κλαμπ του Μιλάνου.', toMap: 'Προβολή χάρτη', toGrid: 'Προβολή πλέγματος' },
  hu: { heading: 'Összes Klub', sub: 'Fedezze fel Milánó ellenőrzött klubjainak teljes jegyzékét.', toMap: 'Térképnézet', toGrid: 'Rácsnézet' },
  ga: { heading: 'Gach Club', sub: 'Brabhsáil eolaire iomlán na gclubanna fíoraithe i Milano.', toMap: 'Amharc Léarscáile', toGrid: 'Amharc Greille' },
  lv: { heading: 'Visi Klubi', sub: 'Izpētiet pilnu Milānas pārbaudīto klubu katalogu.', toMap: 'Kartes skats', toGrid: 'Režģa skats' },
  lt: { heading: 'Visi Klubai', sub: 'Naršykite pilną patvirtintų Milano klubų katalogą.', toMap: 'Žemėlapio vaizdas', toGrid: 'Tinklelio vaizdas' },
  mt: { heading: 'Il-Klabbs Kollha', sub: 'Esplora d-direttorju komplut tal-klabbs verifikati f’Milan.', toMap: 'Ara fuq il-Mappa', toGrid: 'Ara fil-Gradilja' },
  pl: { heading: 'Wszystkie Kluby', sub: 'Poznaj pełny katalog zweryfikowanych klubów w Mediolanie.', toMap: 'Widok mapy', toGrid: 'Widok siatki' },
  ro: { heading: 'Toate Cluburile', sub: 'Explorează catalogul complet al cluburilor verificate din Milano.', toMap: 'Vezi pe hartă', toGrid: 'Vezi în grilă' },
  sk: { heading: 'Všetky Kluby', sub: 'Preskúmajte kompletný zoznam overených klubov v Miláne.', toMap: 'Zobraziť mapu', toGrid: 'Zobraziť mriežku' },
  sl: { heading: 'Vsi Klubi', sub: 'Raziščite celoten imenik preverjenih klubov v Milanu.', toMap: 'Pogled zemljevida', toGrid: 'Mrežni pogled' },
  sv: { heading: 'Alla Klubbar', sub: 'Utforska hela katalogen över verifierade klubbar i Milano.', toMap: 'Kartvy', toGrid: 'Rutnätsvy' },
  no: { heading: 'Alle Klubber', sub: 'Utforsk hele oversikten over verifiserte klubber i Milano.', toMap: 'Kartvisning', toGrid: 'Rutenettvisning' },
  is: { heading: 'Allir Klúbbar', sub: 'Skoðaðu heildarskrá yfir staðfesta klúbba í Mílanó.', toMap: 'Kortayfirlit', toGrid: 'Reitayfirlit' },
  uk: { heading: 'Усі Клуби', sub: 'Перегляньте повний каталог перевірених клубів Мілана.', toMap: 'На карті', toGrid: 'Сіткою' },
  sq: { heading: 'Të Gjitha Klubet', sub: 'Eksploroni listën e plotë të klubeve të verifikuara në Milano.', toMap: 'Shiko në Hartë', toGrid: 'Shiko në Rrjetë' },
  sr: { heading: 'Сви Клубови', sub: 'Истражите комплетан именик проверених клубова у Милану.', toMap: 'Приказ мапе', toGrid: 'Мрежни приказ' },
  bs: { heading: 'Svi Klubovi', sub: 'Istražite kompletan imenik provjerenih klubova u Milanu.', toMap: 'Prikaz mape', toGrid: 'Mrežni prikaz' },
  mk: { heading: 'Сите Клубови', sub: 'Истражете го целосниот именик на проверени клубови во Милано.', toMap: 'Приказ на мапа', toGrid: 'Мрежен приказ' },
};

export default function VenueMapToggle({ venues, lang, mapPins }: VenueMapToggleProps) {
  const [view, setView] = useState<'grid' | 'map'>('grid');
  const ui = DIRECTORY_UI_COPY[lang] || DIRECTORY_UI_COPY.en;

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
            {ui.heading}
          </h2>
          <p className="text-white/40">
            {ui.sub}
          </p>
        </div>

        <button
          onClick={() => setView(view === 'grid' ? 'map' : 'grid')}
          className="flex items-center space-x-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors text-sm font-medium tracking-wider uppercase"
        >
          {view === 'grid' ? (
            <>
              <Map className="w-4 h-4 text-champagne" />
              <span>{ui.toMap}</span>
            </>
          ) : (
            <>
              <Grid className="w-4 h-4 text-champagne" />
              <span>{ui.toGrid}</span>
            </>
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="relative min-h-[600px]">
        {view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
            {venues.map((venue) => (
              <VenueCard key={venue.id} {...venue} lang={lang} />
            ))}
          </div>
        ) : (
          <div className="w-full h-[600px] rounded-lg overflow-hidden border border-white/10 animate-in fade-in duration-500">
            <VenueMap venues={mapPins ?? []} />
          </div>
        )}
      </div>
    </div>
  );
}
