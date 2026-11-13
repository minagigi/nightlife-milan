'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  Search,
  X,
  MapPin,
  Calendar,
  BookOpen,
  Crown,
  Sparkles,
  Trophy,
  Wine,
  PartyPopper,
  QrCode,
  Music2,
  MessageCircle,
  ArrowUpRight,
  Clock,
  SlidersHorizontal,
} from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { usePathname, useRouter } from 'next/navigation';
import { mockVenues, mockZones, mockGuides } from '@/lib/data';
import { CONTACT } from '@/config/contact';
import { localePrefix as urlLocalePrefix, type LocaleCode } from '@/lib/i18n/locales';
import { localizeInternalHref } from '@/lib/i18n/localizedSlugs35';
import {
  CAPODANNO_CATEGORY_IDS,
  capodannoCategoryPath,
  capodannoEventPath,
  capodannoNavigation,
  capodannoPath,
} from '@/lib/capodanno/routes';
import type { CapodannoEventItem } from '@/lib/capodannoEvents';
import type { OctoberEventRecord } from '@/lib/october-events/types';

type SearchTabId = 'all' | 'clubs' | 'capodanno' | 'events' | 'hubs' | 'guides' | 'zones';

type SearchUiCopy = {
  triggerLabel: string;
  triggerAria: string;
  placeholder: string;
  clearAria: string;
  closeLabel: string;
  closeAria: string;
  quickLabel: string;
  tabs: Record<SearchTabId, string>;
  sections: {
    priorityClubs: string;
    allClubsLink: string;
    clubs: string;
    capodanno: string;
    capodannoAllLink: string;
    events: string;
    eventsAllLink: string;
    hubs: string;
    guides: string;
    guidesAllLink: string;
    genres: string;
    zones: string;
  };
  card: {
    officialSelection: string;
    openSheet: string;
    whatsappVip: string;
    fromPrice: string;
    freeEntry: string;
    musicGenre: string;
    nightlifeDistrict: string;
    insiderGuide: string;
    nye2027: string;
  };
  empty: {
    title: string;
    subtitle: string;
    resetBtn: string;
    askConcierge: string;
  };
  footer: {
    deskLabel: string;
    kbdNavigate: string;
    kbdOpen: string;
    kbdClose: string;
  };
};

const SEARCH_UI_COPY_BASE: Record<'it' | 'en' | 'es' | 'fr' | 'de' | 'pt' | 'ru' | 'zh' | 'ar', SearchUiCopy> = {
  it: {
    triggerLabel: 'Cerca',
    triggerAria: 'Apri ricerca globale (Club, Eventi, Capodanno, Guide)',
    placeholder: 'Cerca Just Me, Capodanno 2027, Pineta, San Siro, Rooftop, Tavoli VIP...',
    clearAria: 'Cancella testo di ricerca',
    closeLabel: 'Chiudi',
    closeAria: 'Chiudi ricerca',
    quickLabel: 'Ricerche Rapide:',
    tabs: {
      all: 'Tutti',
      clubs: 'Club & Rooftop',
      capodanno: 'Capodanno 2027',
      events: 'Eventi & Serate',
      hubs: 'Hub VIP',
      guides: 'Guide',
      zones: 'Zone & Generi',
    },
    sections: {
      priorityClubs: 'Selezione Ufficiale · I 6 Top Club & Rooftop di Milano',
      allClubsLink: 'Tutti i 19 Club',
      clubs: 'Club, Discoteche & Rooftop Ufficiali',
      capodanno: 'Capodanno 2027 a Milano · Cenoni, Rooftop & Discoteche',
      capodannoAllLink: 'Tutti i 112 Eventi Capodanno',
      events: 'Calendario Serate & Eventi Speciali',
      eventsAllLink: 'Calendario Completo',
      hubs: 'Hub Strategici & Esperienze VIP 2026/2027',
      guides: 'Guide Insider & Listini Ufficiali (114)',
      guidesAllLink: 'Tutte le 114 Guide',
      genres: '10 Generi Musicali',
      zones: '14 Quartieri della Notte',
    },
    card: {
      officialSelection: 'Selezione Ufficiale',
      openSheet: 'Apri Scheda',
      whatsappVip: 'Tavolo / Lista VIP',
      fromPrice: 'Da',
      freeEntry: 'Ingresso Libero',
      musicGenre: 'Genere Musicale',
      nightlifeDistrict: 'Quartiere di Milano',
      insiderGuide: 'Guida Ufficiale',
      nye2027: '31 Dicembre · Capodanno 2027',
    },
    empty: {
      title: 'Nessun risultato diretto per',
      subtitle: 'Prova con il nome di un club (Just Me, Pineta, Aria, 55 Milano, Voya, Repvblic), un quartiere o chiedi direttamente al nostro Desk Concierge.',
      resetBtn: 'Mostra tutto il catalogo',
      askConcierge: 'Chiedi su WhatsApp (+39 351 912 7047)',
    },
    footer: {
      deskLabel: 'Desk Ufficiale VIP Concierge Milano 24/7:',
      kbdNavigate: 'Filtra per categoria',
      kbdOpen: 'Apri primo risultato',
      kbdClose: 'Chiudi',
    },
  },
  en: {
    triggerLabel: 'Search',
    triggerAria: 'Open global search (Clubs, Events, NYE 2027, Guides)',
    placeholder: 'Search Just Me, NYE 2027, Pineta, San Siro, Rooftops, VIP Tables...',
    clearAria: 'Clear search query',
    closeLabel: 'Close',
    closeAria: 'Close search',
    quickLabel: 'Quick Search:',
    tabs: {
      all: 'All',
      clubs: 'Clubs & Rooftops',
      capodanno: 'NYE 2027',
      events: 'Events & Nights',
      hubs: 'VIP Hubs',
      guides: 'Guides',
      zones: 'Zones & Genres',
    },
    sections: {
      priorityClubs: 'Official Selection · Top 6 Partner Clubs & Rooftops in Milan',
      allClubsLink: 'All 19 Clubs',
      clubs: 'Official Clubs, Nightclubs & Rooftops',
      capodanno: "New Year's Eve 2027 in Milan · Gala Dinners, Rooftops & Clubs",
      capodannoAllLink: 'All 112 NYE Events',
      events: 'Upcoming Nights & Special Events Calendar',
      eventsAllLink: 'Full Calendar',
      hubs: 'Strategic VIP Hubs & Experiences 2026/2027',
      guides: 'Insider Guides & Official Price Lists (114)',
      guidesAllLink: 'All 114 Guides',
      genres: '10 Music Genres',
      zones: '14 Nightlife Districts',
    },
    card: {
      officialSelection: 'Official Selection',
      openSheet: 'View Details',
      whatsappVip: 'VIP Table / List',
      fromPrice: 'From',
      freeEntry: 'Free Public Event',
      musicGenre: 'Music Genre',
      nightlifeDistrict: 'Milan District',
      insiderGuide: 'Official Guide',
      nye2027: '31 Dec · NYE 2027',
    },
    empty: {
      title: 'No direct matches for',
      subtitle: 'Try searching by club name (Just Me, Pineta, Aria, 55 Milano, Voya, Repvblic), district, or message our 24/7 VIP Concierge Desk.',
      resetBtn: 'Browse full directory',
      askConcierge: 'Ask Concierge (+39 351 912 7047)',
    },
    footer: {
      deskLabel: 'Official 24/7 Milan VIP Concierge Desk:',
      kbdNavigate: 'Filter categories',
      kbdOpen: 'Open top result',
      kbdClose: 'Close',
    },
  },
  es: {
    triggerLabel: 'Buscar',
    triggerAria: 'Abrir búsqueda global (Clubs, Eventos, Nochevieja 2027, Guías)',
    placeholder: 'Buscar Just Me, Nochevieja 2027, Pineta, San Siro, Rooftops, Mesas VIP...',
    clearAria: 'Borrar búsqueda',
    closeLabel: 'Cerrar',
    closeAria: 'Cerrar búsqueda',
    quickLabel: 'Búsquedas rápidas:',
    tabs: {
      all: 'Todo',
      clubs: 'Clubs y Rooftops',
      capodanno: 'Nochevieja 2027',
      events: 'Eventos y Fiestas',
      hubs: 'Hubs VIP',
      guides: 'Guías',
      zones: 'Zonas y Géneros',
    },
    sections: {
      priorityClubs: 'Selección Oficial · Los 6 Mejores Clubs y Rooftops de Milán',
      allClubsLink: 'Los 19 Clubs',
      clubs: 'Clubs, Discotecas y Rooftops Oficiales',
      capodanno: 'Nochevieja 2027 en Milán · Cenas de Gala, Rooftops y Discotecas',
      capodannoAllLink: 'Los 112 Eventos de Nochevieja',
      events: 'Calendario de Fiestas y Eventos Especiales',
      eventsAllLink: 'Calendario Completo',
      hubs: 'Hubs Estratégicos y Experiencias VIP 2026/2027',
      guides: 'Guías Oficiales y Tarifas de Mesas VIP (114)',
      guidesAllLink: 'Las 114 Guías',
      genres: '10 Géneros Musicales',
      zones: '14 Zonas Nocturnas',
    },
    card: {
      officialSelection: 'Selección Oficial',
      openSheet: 'Ver Ficha',
      whatsappVip: 'Mesa / Lista VIP',
      fromPrice: 'Desde',
      freeEntry: 'Entrada Libre',
      musicGenre: 'Género Musical',
      nightlifeDistrict: 'Distrito de Milán',
      insiderGuide: 'Guía Oficial',
      nye2027: '31 Dic · Nochevieja 2027',
    },
    empty: {
      title: 'Sin resultados directos para',
      subtitle: 'Prueba con el nombre de un club (Just Me, Pineta, Aria, 55 Milano, Voya, Repvblic) o consulta a nuestro Concierge VIP.',
      resetBtn: 'Ver catálogo completo',
      askConcierge: 'Consultar por WhatsApp (+39 351 912 7047)',
    },
    footer: {
      deskLabel: 'Concierge Oficial VIP Milán 24/7:',
      kbdNavigate: 'Filtrar categorías',
      kbdOpen: 'Abrir primer resultado',
      kbdClose: 'Cerrar',
    },
  },
  fr: {
    triggerLabel: 'Rechercher',
    triggerAria: 'Ouvrir la recherche globale (Clubs, Soirées, Nouvel An 2027, Guides)',
    placeholder: 'Rechercher Just Me, Nouvel An 2027, Pineta, San Siro, Rooftops, Tables VIP...',
    clearAria: 'Effacer la recherche',
    closeLabel: 'Fermer',
    closeAria: 'Fermer la recherche',
    quickLabel: 'Accès rapide :',
    tabs: {
      all: 'Tout',
      clubs: 'Clubs & Rooftops',
      capodanno: 'Nouvel An 2027',
      events: 'Soirées & Événements',
      hubs: 'Hubs VIP',
      guides: 'Guides',
      zones: 'Quartiers & Genres',
    },
    sections: {
      priorityClubs: 'Sélection Officielle · Top 6 Clubs & Rooftops de Milan',
      allClubsLink: 'Les 19 Clubs',
      clubs: 'Clubs, Discothèques & Rooftops Officiels',
      capodanno: 'Nouvel An 2027 à Milan · Dîners Gala, Rooftops & Clubs',
      capodannoAllLink: 'Les 112 Soirées du Nouvel An',
      events: 'Calendrier des Soirées & Événements Spéciaux',
      eventsAllLink: 'Calendrier Complet',
      hubs: 'Hubs Stratégiques & Expériences VIP 2026/2027',
      guides: 'Guides Officiels & Tarifs Bouteilles VIP (114)',
      guidesAllLink: 'Les 114 Guides',
      genres: '10 Genres Musicaux',
      zones: '14 Quartiers Nocturnes',
    },
    card: {
      officialSelection: 'Sélection Officielle',
      openSheet: 'Voir la Fiche',
      whatsappVip: 'Table / Liste VIP',
      fromPrice: 'Dès',
      freeEntry: 'Entrée Libre',
      musicGenre: 'Genre Musical',
      nightlifeDistrict: 'Quartier de Milan',
      insiderGuide: 'Guide Officiel',
      nye2027: '31 Déc · Nouvel An 2027',
    },
    empty: {
      title: 'Aucun résultat direct pour',
      subtitle: 'Essayez le nom d’un club (Just Me, Pineta, Aria, 55 Milano, Voya, Repvblic) ou écrivez à notre Concierge VIP.',
      resetBtn: 'Voir tout le catalogue',
      askConcierge: 'Écrire sur WhatsApp (+39 351 912 7047)',
    },
    footer: {
      deskLabel: 'Conciergerie VIP Officielle Milan 24/7 :',
      kbdNavigate: 'Filtrer par catégorie',
      kbdOpen: 'Ouvrir le 1er résultat',
      kbdClose: 'Fermer',
    },
  },
  de: {
    triggerLabel: 'Suche',
    triggerAria: 'Globale Suche öffnen (Clubs, Events, Silvester 2027, Guides)',
    placeholder: 'Suche nach Just Me, Silvester 2027, Pineta, San Siro, Rooftops, VIP-Tischen...',
    clearAria: 'Suchtext löschen',
    closeLabel: 'Schließen',
    closeAria: 'Suche schließen',
    quickLabel: 'Schnellsuche:',
    tabs: {
      all: 'Alle',
      clubs: 'Clubs & Rooftops',
      capodanno: 'Silvester 2027',
      events: 'Events & Partys',
      hubs: 'VIP-Hubs',
      guides: 'Guides',
      zones: 'Viertel & Genres',
    },
    sections: {
      priorityClubs: 'Offizielle Auswahl · Top 6 Partner-Clubs & Rooftops in Mailand',
      allClubsLink: 'Alle 19 Clubs',
      clubs: 'Offizielle Clubs, Diskotheken & Rooftops',
      capodanno: 'Silvester 2027 in Mailand · Gala-Dinner, Rooftops & Clubs',
      capodannoAllLink: 'Alle 112 Silvester-Events',
      events: 'Party-Kalender & Sonderveranstaltungen',
      eventsAllLink: 'Kompletter Kalender',
      hubs: 'Strategische VIP-Hubs & Erlebnisse 2026/2027',
      guides: 'Insider-Guides & Offizielle Preislisten (114)',
      guidesAllLink: 'Alle 114 Guides',
      genres: '10 Musikgenres',
      zones: '14 Ausgehviertel',
    },
    card: {
      officialSelection: 'Offizielle Auswahl',
      openSheet: 'Details öffnen',
      whatsappVip: 'VIP-Tisch / Liste',
      fromPrice: 'Ab',
      freeEntry: 'Freier Eintritt',
      musicGenre: 'Musikgenre',
      nightlifeDistrict: 'Mailänder Viertel',
      insiderGuide: 'Offizieller Guide',
      nye2027: '31. Dez · Silvester 2027',
    },
    empty: {
      title: 'Keine direkten Treffer für',
      subtitle: 'Suchen Sie nach einem Club (Just Me, Pineta, Aria, 55 Milano, Voya, Repvblic) oder kontaktieren Sie unseren VIP-Concierge.',
      resetBtn: 'Gesamten Katalog anzeigen',
      askConcierge: 'WhatsApp Concierge (+39 351 912 7047)',
    },
    footer: {
      deskLabel: 'Offizieller 24/7 VIP-Concierge Mailand:',
      kbdNavigate: 'Kategorien filtern',
      kbdOpen: 'Erstes Ergebnis öffnen',
      kbdClose: 'Schließen',
    },
  },
  pt: {
    triggerLabel: 'Pesquisar',
    triggerAria: 'Abrir pesquisa global (Clubs, Eventos, Réveillon 2027, Guias)',
    placeholder: 'Pesquisar Just Me, Réveillon 2027, Pineta, San Siro, Rooftops, Mesas VIP...',
    clearAria: 'Limpar pesquisa',
    closeLabel: 'Fechar',
    closeAria: 'Fechar pesquisa',
    quickLabel: 'Pesquisa rápida:',
    tabs: {
      all: 'Tudo',
      clubs: 'Clubs & Rooftops',
      capodanno: 'Réveillon 2027',
      events: 'Eventos & Festas',
      hubs: 'Hubs VIP',
      guides: 'Guias',
      zones: 'Bairros & Géneros',
    },
    sections: {
      priorityClubs: 'Seleção Oficial · Top 6 Clubs & Rooftops de Milão',
      allClubsLink: 'Todos os 19 Clubs',
      clubs: 'Clubs, Discotecas & Rooftops Oficiais',
      capodanno: 'Réveillon 2027 em Milão · Jantares de Gala, Rooftops & Discotecas',
      capodannoAllLink: 'Todos os 112 Eventos de Réveillon',
      events: 'Calendário de Festas & Eventos Especiais',
      eventsAllLink: 'Calendário Completo',
      hubs: 'Hubs Estratégicos & Experiências VIP 2026/2027',
      guides: 'Guias Oficiais & Tabelas de Preços VIP (114)',
      guidesAllLink: 'Todos os 114 Guias',
      genres: '10 Géneros Musicais',
      zones: '14 Bairros Noturnos',
    },
    card: {
      officialSelection: 'Seleção Oficial',
      openSheet: 'Ver Ficha',
      whatsappVip: 'Mesa / Lista VIP',
      fromPrice: 'Desde',
      freeEntry: 'Entrada Livre',
      musicGenre: 'Género Musical',
      nightlifeDistrict: 'Bairro de Milão',
      insiderGuide: 'Guia Oficial',
      nye2027: '31 Dez · Réveillon 2027',
    },
    empty: {
      title: 'Sem resultados diretos para',
      subtitle: 'Tente o nome de um club (Just Me, Pineta, Aria, 55 Milano, Voya, Repvblic) ou fale com o nosso Concierge VIP.',
      resetBtn: 'Ver catálogo completo',
      askConcierge: 'Falar no WhatsApp (+39 351 912 7047)',
    },
    footer: {
      deskLabel: 'Concierge Oficial VIP Milão 24/7:',
      kbdNavigate: 'Filtrar categorias',
      kbdOpen: 'Abrir 1.º resultado',
      kbdClose: 'Fechar',
    },
  },
  ru: {
    triggerLabel: 'Поиск',
    triggerAria: 'Открыть глобальный поиск (Клубы, События, Новый год 2027, Гиды)',
    placeholder: 'Поиск: Just Me, Новый год 2027, Pineta, San Siro, руфтопы, VIP-столы...',
    clearAria: 'Очистить поиск',
    closeLabel: 'Закрыть',
    closeAria: 'Закрыть поиск',
    quickLabel: 'Быстрый поиск:',
    tabs: {
      all: 'Все',
      clubs: 'Клубы и руфтопы',
      capodanno: 'Новый год 2027',
      events: 'События и вечеринки',
      hubs: 'VIP-разделы',
      guides: 'Гиды',
      zones: 'Районы и жанры',
    },
    sections: {
      priorityClubs: 'Официальный выбор · Топ-6 клубов и руфтопов Милана',
      allClubsLink: 'Все 19 клубов',
      clubs: 'Официальные клубы и панорамные руфтопы',
      capodanno: 'Новый год 2027 в Милане · Гала-ужины, руфтопы и клубы',
      capodannoAllLink: 'Все 112 событий Нового года',
      events: 'Календарь вечеринок и специальных событий',
      eventsAllLink: 'Полный календарь',
      hubs: 'Стратегические VIP-разделы 2026/2027',
      guides: 'Официальные гиды и прайс-листы (114)',
      guidesAllLink: 'Все 114 гидов',
      genres: '10 музыкальных жанров',
      zones: '14 ночных районов',
    },
    card: {
      officialSelection: 'Официальный выбор',
      openSheet: 'Открыть',
      whatsappVip: 'VIP-стол / Список',
      fromPrice: 'От',
      freeEntry: 'Свободный вход',
      musicGenre: 'Музыкальный жанр',
      nightlifeDistrict: 'Район Милана',
      insiderGuide: 'Официальный гид',
      nye2027: '31 дек · Новый год 2027',
    },
    empty: {
      title: 'Нет прямых совпадений для',
      subtitle: 'Попробуйте название клуба (Just Me, Pineta, Aria, 55 Milano, Voya, Repvblic) или напишите нашему VIP-консьержу.',
      resetBtn: 'Показать весь каталог',
      askConcierge: 'Написать в WhatsApp (+39 351 912 7047)',
    },
    footer: {
      deskLabel: 'Официальный VIP-консьерж в Милане 24/7:',
      kbdNavigate: 'Фильтр по категориям',
      kbdOpen: 'Открыть 1-й результат',
      kbdClose: 'Закрыть',
    },
  },
  zh: {
    triggerLabel: '搜索',
    triggerAria: '打开全局搜索（俱乐部、活动、2027跨年、指南）',
    placeholder: '搜索 Just Me、2027跨年、Pineta、圣西罗、屋顶酒吧、VIP卡座...',
    clearAria: '清除搜索内容',
    closeLabel: '关闭',
    closeAria: '关闭搜索',
    quickLabel: '热门搜索：',
    tabs: {
      all: '全部',
      clubs: '俱乐部与屋顶酒吧',
      capodanno: '2027跨年盛典',
      events: '派对与活动',
      hubs: 'VIP专区',
      guides: '指南',
      zones: '街区与音乐风格',
    },
    sections: {
      priorityClubs: '官方甄选 · 米兰6大核心俱乐部与全景屋顶',
      allClubsLink: '全部19家俱乐部',
      clubs: '官方合作俱乐部与屋顶酒吧',
      capodanno: '2027米兰跨年盛典 · 晚宴、屋顶烟花与夜店派对',
      capodannoAllLink: '全部112场跨年活动',
      events: '近期派对与特别活动日历',
      eventsAllLink: '完整活动日历',
      hubs: '2026/2027 VIP核心体验专区',
      guides: '官方夜生活指南与酒水价格表 (114)',
      guidesAllLink: '全部114篇指南',
      genres: '10大音乐风格',
      zones: '14大夜生活街区',
    },
    card: {
      officialSelection: '官方甄选',
      openSheet: '查看详情',
      whatsappVip: 'VIP订台 / 名单',
      fromPrice: '起价',
      freeEntry: '免费公众活动',
      musicGenre: '音乐风格',
      nightlifeDistrict: '米兰街区',
      insiderGuide: '官方指南',
      nye2027: '12月31日 · 2027跨年',
    },
    empty: {
      title: '未找到直接匹配项：',
      subtitle: '请尝试搜索俱乐部名称（Just Me、Pineta、Aria、55 Milano、Voya、Repvblic）或直接联系24/7 VIP礼宾台。',
      resetBtn: '浏览完整目录',
      askConcierge: 'WhatsApp 礼宾顾问 (+39 351 912 7047)',
    },
    footer: {
      deskLabel: '米兰官方24/7 VIP礼宾服务台：',
      kbdNavigate: '分类筛选',
      kbdOpen: '打开首个结果',
      kbdClose: '关闭',
    },
  },
  ar: {
    triggerLabel: 'بحث',
    triggerAria: 'فتح البحث الشامل (النوادي، الفعاليات، رأس السنة 2027، الأدلة)',
    placeholder: 'ابحث عن Just Me، رأس السنة 2027، Pineta، سان سيرو، طاولات VIP...',
    clearAria: 'مسح نص البحث',
    closeLabel: 'إغلاق',
    closeAria: 'إغلاق البحث',
    quickLabel: 'بحث سريع:',
    tabs: {
      all: 'الكل',
      clubs: 'النوادي والأسطح',
      capodanno: 'رأس السنة 2027',
      events: 'الفعاليات والسهرات',
      hubs: 'مراكز VIP',
      guides: 'الأدلة',
      zones: 'المناطق والموسيقى',
    },
    sections: {
      priorityClubs: 'الاختيار الرسمي · أفضل 6 نوادي وتراسات بانورامية في ميلانو',
      allClubsLink: 'جميع النوادي الـ 19',
      clubs: 'النوادي الليلية والتراسات الرسمية',
      capodanno: 'رأس السنة 2027 في ميلانو · عشاء فاخر وتراسات ونوادي',
      capodannoAllLink: 'جميع فعاليات رأس السنة (112)',
      events: 'تقويم السهرات والفعاليات الخاصة',
      eventsAllLink: 'التقويم الكامل',
      hubs: 'المراكز الاستراتيجية وتجارب VIP 2026/2027',
      guides: 'الأدلة الرسمية وقوائم أسعار VIP (114)',
      guidesAllLink: 'جميع الأدلة (114)',
      genres: '10 أنماط موسيقية',
      zones: '14 منطقة سهر في ميلانو',
    },
    card: {
      officialSelection: 'الاختيار الرسمي',
      openSheet: 'عرض التفاصيل',
      whatsappVip: 'حجز طاولة / قائمة VIP',
      fromPrice: 'من',
      freeEntry: 'فعالية عامة مجانية',
      musicGenre: 'النمط الموسيقي',
      nightlifeDistrict: 'حي في ميلانو',
      insiderGuide: 'دليل رسمي',
      nye2027: '31 ديسمبر · رأس السنة 2027',
    },
    empty: {
      title: 'لا توجد نتائج مباشرة لـ',
      subtitle: 'جرّب البحث باسم النادي (Just Me، Pineta، Aria، 55 Milano، Voya، Repvblic) أو تواصل مباشرة مع مكتب كونسيرج VIP.',
      resetBtn: 'عرض الدليل الكامل',
      askConcierge: 'تواصل عبر واتساب (+39 351 912 7047)',
    },
    footer: {
      deskLabel: 'مكتب كونسيرج VIP الرسمي في ميلانو 24/7:',
      kbdNavigate: 'تصفية حسب الفئة',
      kbdOpen: 'فتح النتيجة الأولى',
      kbdClose: 'إغلاق',
    },
  },
};

const TRIGGER_LABELS_35: Partial<Record<LocaleCode, { trigger: string; close: string; all: string }>> = {
  nl: { trigger: 'Zoeken', close: 'Sluiten', all: 'Alle' },
  tr: { trigger: 'Ara', close: 'Kapat', all: 'Tümü' },
  bg: { trigger: 'Търсене', close: 'Затвори', all: 'Всички' },
  hr: { trigger: 'Pretraži', close: 'Zatvori', all: 'Sve' },
  cs: { trigger: 'Hledat', close: 'Zavřít', all: 'Vše' },
  da: { trigger: 'Søg', close: 'Luk', all: 'Alle' },
  et: { trigger: 'Otsi', close: 'Sulge', all: 'Kõik' },
  fi: { trigger: 'Haku', close: 'Sulje', all: 'Kaikki' },
  el: { trigger: 'Αναζήτηση', close: 'Κλείσιμο', all: 'Όλα' },
  hu: { trigger: 'Keresés', close: 'Bezárás', all: 'Összes' },
  ga: { trigger: 'Cuardaigh', close: 'Dún', all: 'Uile' },
  lv: { trigger: 'Meklēt', close: 'Aizvērt', all: 'Visi' },
  lt: { trigger: 'Ieškoti', close: 'Uždaryti', all: 'Visi' },
  mt: { trigger: 'Fittex', close: 'Agħlaq', all: 'Kollha' },
  pl: { trigger: 'Szukaj', close: 'Zamknij', all: 'Wszystkie' },
  ro: { trigger: 'Caută', close: 'Închide', all: 'Toate' },
  sk: { trigger: 'Hľadať', close: 'Zavrieť', all: 'Všetko' },
  sl: { trigger: 'Išči', close: 'Zapri', all: 'Vse' },
  sv: { trigger: 'Sök', close: 'Stäng', all: 'Alla' },
  no: { trigger: 'Søk', close: 'Lukk', all: 'Alle' },
  is: { trigger: 'Leita', close: 'Loka', all: 'Allt' },
  uk: { trigger: 'Пошук', close: 'Закрити', all: 'Усі' },
  sq: { trigger: 'Kërko', close: 'Mbyll', all: 'Të gjitha' },
  sr: { trigger: 'Pretraži', close: 'Zatvori', all: 'Sve' },
  bs: { trigger: 'Pretraži', close: 'Zatvori', all: 'Sve' },
  mk: { trigger: 'Пребарај', close: 'Затвори', all: 'Сите' },
};

function getSearchUiCopy(locale: string): SearchUiCopy {
  if (locale in SEARCH_UI_COPY_BASE) {
    return SEARCH_UI_COPY_BASE[locale as keyof typeof SEARCH_UI_COPY_BASE];
  }
  const base = SEARCH_UI_COPY_BASE.en;
  const override = TRIGGER_LABELS_35[locale as LocaleCode];
  const capNav = capodannoNavigation(locale);
  if (!override) {
    return {
      ...base,
      tabs: { ...base.tabs, capodanno: `${capNav.menuLabel} 2027` },
      sections: { ...base.sections, capodanno: capNav.h1 },
    };
  }
  return {
    ...base,
    triggerLabel: override.trigger,
    closeLabel: override.close,
    tabs: {
      ...base.tabs,
      all: override.all,
      capodanno: `${capNav.menuLabel} 2027`,
    },
    sections: {
      ...base.sections,
      capodanno: capNav.h1,
    },
  };
}

const PRIORITY_CLUBS_QUICK = [
  {
    rank: 1,
    id: 'v-justme',
    slug: 'just-me-milano',
    name: 'Just Me Milano',
    image: '/images/venues/just-me-milano/just-me-milano-torre-branca-01.webp',
    zone: {
      en: 'Parco Sempione · Torre Branca (Viale Luigi Camoens 2)',
      it: 'Parco Sempione · Torre Branca (Viale Luigi Camoens 2)',
    },
    badge: {
      en: '01 · Official Selection · Open 7/7 · Royal Aperitivo & VIP €350+',
      it: '01 · Selezione Ufficiale · Aperto 7/7 · Royal Aperitivo & VIP 350€+',
    },
    telemetry: {
      en: ['Parco Sempione', 'House & Commercial', 'Smart Elegance', 'Aperitivo €20–25 · VIP €350+'],
      it: ['Parco Sempione', 'House & Commerciale', 'Eleganza Curata', 'Aperitivo 20–25€ · VIP 350€+'],
    },
    searchTerms:
      'just me milano italo rota torre branca parco sempione viale luigi camoens 2 royal aperitivo tavoli vip grande gatsby',
  },
  {
    rank: 2,
    id: 'v-pineta',
    slug: 'pineta-club-milano',
    name: 'Pineta Club Milano',
    image: '/images/venues/pineta-milano/pineta-milano-ingresso-01.webp',
    zone: {
      en: 'Corso Como / Garibaldi · Via Messina 38',
      it: 'Corso Como / Garibaldi · Via Messina 38',
    },
    badge: {
      en: '02 · Official Selection · Singing Aperitivo & Reggaeton / Urban',
      it: '02 · Selezione Ufficiale · Aperitivo Cantato & Reggaeton / Urban',
    },
    telemetry: {
      en: ['Corso Como / Via Messina 38', 'Singing Dinner & Reggaeton', 'Smart Chic', 'Aperitivo €15–20 · VIP €250+'],
      it: ['Corso Como / Via Messina 38', 'Aperitivo Cantato & Reggaeton', 'Smart Chic', 'Aperitivo 15–20€ · VIP 250€+'],
    },
    searchTerms:
      'pineta club milano via messina 38 corso como garibaldi cenisola aperitivo cantato cena cantata noche de perreo reggaeton',
  },
  {
    rank: 3,
    id: 'v-aria',
    slug: 'aria-club-milano',
    name: 'Aria Club Milano',
    image: '/images/venues/aria-club-milano/aria-club-milano-interior-01.webp',
    zone: {
      en: 'San Siro · Piazzale dello Sport 14 (150m from Stadium)',
      it: 'San Siro · Piazzale dello Sport 14 (a 150m dallo Stadio)',
    },
    badge: {
      en: '03 · Official Selection · San Siro Post-Match & Open-Air Garden',
      it: '03 · Selezione Ufficiale · Dopo-Partita San Siro & Giardino Estivo',
    },
    telemetry: {
      en: ['San Siro (150m Stadium)', 'House, Hip-Hop & Hits', 'Smart Casual / Chic', 'List €15–20 · VIP €250+'],
      it: ['San Siro (a 150m Stadio)', 'House, Hip-Hop & Hits', 'Smart Casual / Chic', 'Lista 15–20€ · VIP 250€+'],
    },
    searchTerms:
      'aria club milano piazzale dello sport 14 san siro stadio meazza inter milan dopo partita afterparty concerto ippodromo',
  },
  {
    rank: 4,
    id: 'v-55milano',
    slug: '55-milano',
    name: '55 Milano',
    image: '/images/55-milano.webp',
    zone: {
      en: 'Arco della Pace / Sempione · Via Piero della Francesca 55',
      it: 'Arco della Pace / Sempione · Via Piero della Francesca 55',
    },
    badge: {
      en: '04 · Official Selection · 1,000 sqm Royal Apericena & Dinner Show',
      it: '04 · Selezione Ufficiale · 1.000 mq Royal Apericena & Dinner Show',
    },
    telemetry: {
      en: ['Sempione / Via P. della Francesca 55', 'Dinner Show & DJ Set', 'Smart Elegance', 'Apericena €20 · VIP €200+'],
      it: ['Sempione / Via P. della Francesca 55', 'Dinner Show & DJ Set', 'Smart Elegance', 'Apericena 20€ · VIP 200€+'],
    },
    searchTerms:
      '55 milano cinquantacinque via piero della francesca 55 sempione arco della pace apericena buffet dinner show laurea compleanno',
  },
  {
    rank: 5,
    id: 'v-voya',
    slug: 'voya-rooftop-milan',
    name: 'Voya Rooftop',
    image: '/images/voya-rooftop-milan.webp',
    zone: {
      en: 'Portello / CityLife · 20th Floor Skyline (Via Achille Papa 30)',
      it: 'Portello / CityLife · 20° Piano Skyline (Via Achille Papa 30)',
    },
    badge: {
      en: '05 · Official Selection · 20th Floor Panoramic Sky Lounge & Club',
      it: '05 · Selezione Ufficiale · Sky Lounge & Club al 20° Piano Panoramico',
    },
    telemetry: {
      en: ['Portello · 20th Floor', 'Afro-House & Melodic', 'Cocktail Attire', 'Sunset Aperitivo & VIP €300+'],
      it: ['Portello · 20° Piano', 'Afro-House & Melodic', 'Abito da Cocktail', 'Sunset Aperitivo & VIP 300€+'],
    },
    searchTerms:
      'voya rooftop milan 20 piano ventesimo piano via achille papa 30 portello citylife skyline tramonto sunset aperitivo capodanno',
  },
  {
    rank: 6,
    id: 'v-repvblic',
    slug: 'repvblic-milano',
    name: 'Repvblic Milano',
    image: '/images/repvblic-milano.webp',
    zone: {
      en: 'Piazza della Repubblica / Centro · Piazza della Repubblica 12',
      it: 'Piazza della Repubblica / Centro · Piazza della Repubblica 12',
    },
    badge: {
      en: '06 · Official Selection · Fashion Crowd, Hip-Hop & House Boutique Club',
      it: '06 · Selezione Ufficiale · Fashion Crowd, Hip-Hop & House Boutique Club',
    },
    telemetry: {
      en: ['Piazza della Repubblica 12', 'Hip-Hop, Trap & House', 'Fashion / Strict Door', 'VIP Tables €300+'],
      it: ['Piazza della Repubblica 12', 'Hip-Hop, Trap & House', 'Fashion / Selezione Porta', 'Tavoli VIP 300€+'],
    },
    searchTerms:
      'repvblic milano republic piazza della repubblica 12 centro porta nuova dirty monday hip hop house urban fashion models',
  },
] as const;

const STRATEGIC_HUBS = [
  {
    id: 'hub-nye',
    href: '/new-years-eve',
    icon: 'party',
    badge: { en: '31 DEC · 112 EVENTS', it: '31 DIC · 112 EVENTI' },
    title: {
      en: "New Year's Eve 2027 in Milan (Cenone, Rooftops & VIP Tables)",
      it: 'Capodanno 2027 a Milano (Cenoni, Rooftop & Tavoli VIP)',
    },
    subtitle: {
      en: 'All 112 NYE 2027 events across 16 categories: Voya 20th Floor, Just Me, Pineta, Aria, 55 Milano & Repvblic',
      it: 'Tutti i 112 eventi di Capodanno 2027 in 16 categorie: Voya 20° Piano, Just Me, Pineta, Aria, 55 Milano & Repvblic',
    },
    searchTerms:
      'capodanno 2027 milano new years eve nye 31 dicembre cenone veglione discoteca tavoli vip fuochi artificio just me voya pineta aria 55 milano repvblic',
  },
  {
    id: 'hub-football',
    href: '/football-afterparties',
    icon: 'trophy',
    badge: { en: 'SAN SIRO · 150M', it: 'SAN SIRO · A 150M' },
    title: {
      en: 'San Siro Football Afterparties (Inter & AC Milan)',
      it: 'Dopo-Partita Calcio San Siro (Inter & Milan)',
    },
    subtitle: {
      en: 'Serie A, Champions League, Derby & Coppa Italia · Aria Club 150m from the stadium',
      it: 'Serie A, Champions League, Derby & Coppa Italia · Aria Club a 150m dallo stadio',
    },
    searchTerms:
      'dopo partita calcio san siro inter ac milan serie a champions league derby della madonnina coppa italia stadio meazza terzo tempo aria club 150m',
  },
  {
    id: 'hub-concerts',
    href: '/concert-afterparties',
    icon: 'music',
    badge: { en: 'LIVE & ARENAS', it: 'STADI & ARENE' },
    title: {
      en: 'Concert Afterparties (San Siro, Ippodromo La Maura & Unipol Forum)',
      it: 'Afterparty Concerti (San Siro, Ippodromo La Maura & Forum Assago)',
    },
    subtitle: {
      en: 'Official post-concert VIP tables & guest lists · Aria 150m from San Siro',
      it: 'Tavoli VIP e liste post-concerto · Aria Club a 150m da San Siro e Ippodromo',
    },
    searchTerms:
      'afterparty concerti milano dopo concerto san siro ippodromo la maura snai i-days unipol forum assago fabrique alcatraz aria club just me',
  },
  {
    id: 'hub-fashion-week',
    href: '/fashion-week',
    icon: 'crown',
    badge: { en: 'MFW · FUORISALONE · F1', it: 'MFW · FUORISALONE · F1' },
    title: {
      en: 'Milan Fashion Week (MFW), Fuorisalone & Monza F1 GP Parties',
      it: 'Milano Fashion Week (MFW), Fuorisalone & Party Monza F1 GP',
    },
    subtitle: {
      en: 'VIP model tables, private brand afterparties & F1 drivers hospitality',
      it: 'Tavoli VIP sfilate, afterparty privati brand & ospitalità piloti F1 Monza',
    },
    searchTerms:
      'milan fashion week mfw settimana della moda sfilate fuorisalone salone del mobile design week formula 1 f1 gp monza afterparty modelli vip just me voya repvblic volt',
  },
  {
    id: 'hub-rooftops',
    href: '/rooftops',
    icon: 'wine',
    badge: { en: 'SKYLINE VIEWS', it: 'VISTA SKYLINE' },
    title: {
      en: 'Panoramic Rooftops & Sky Lounges',
      it: 'Rooftop & Sky Lounge Panoramici',
    },
    subtitle: {
      en: 'Voya 20th Floor, Terrazza Duomo 21, Ceresio 7, Radio Rooftop & MIB',
      it: 'Voya 20° Piano, Terrazza Duomo 21, Ceresio 7, Radio Rooftop & MIB',
    },
    searchTerms:
      'rooftop terrazze panoramiche sky lounge voya 20 piano ventesimo piano terrazza duomo 21 ceresio 7 radio rooftop mib tramonto skyline aperitivo vista',
  },
  {
    id: 'hub-private-parties',
    href: '/private-parties',
    icon: 'party',
    badge: { en: 'PRIVATE EVENTS', it: 'FESTE PRIVATE' },
    title: {
      en: 'Graduation, 18th, Birthday & Bachelorette Parties',
      it: 'Feste di Laurea, 18 Anni, Compleanni & Nubilato/Celibato',
    },
    subtitle: {
      en: 'Custom VIP packages at 55 Milano, Pineta, Aria, Voya & Just Me',
      it: 'Pacchetti VIP su misura da 55 Milano, Pineta, Aria, Voya & Just Me',
    },
    searchTerms:
      'feste di laurea 18 anni diciottesimo compleanno addio al nubilato celibato eventi privati aziendali pacchetti bottiglie torta',
  },
  {
    id: 'hub-guest-lists',
    href: '/guest-lists',
    icon: 'qr',
    badge: { en: 'NOMINAL PASS', it: 'ACCREDITO NOMINALE' },
    title: {
      en: 'Official Guest Lists & Fast-Track QR Pass',
      it: 'Liste Ingresso & QR Salta-Fila Ufficiali',
    },
    subtitle: {
      en: 'Nominal accreditation, door selection & dress code rules',
      it: 'Accredito nominale, selezione porta & regole dress code',
    },
    searchTerms:
      'liste ingresso qr salta fila guest list accredito nominale riduzione omaggio donna selezione porta dress code',
  },
  {
    id: 'hub-bottle-prices',
    href: '/bottle-prices',
    icon: 'crown',
    badge: { en: 'OFFICIAL MENU 26/27', it: 'LISTINO 2026/2027' },
    title: {
      en: 'Official Bottle Service Price List 2026/2027',
      it: 'Listino Prezzi Bottiglie & Tavoli VIP 2026/2027',
    },
    subtitle: {
      en: 'Dom Pérignon, Belvedere, Don Julio 1942, Magnum & Mathusalem',
      it: 'Dom Pérignon, Belvedere, Don Julio 1942, Magnum & Mathusalem',
    },
    searchTerms:
      'listino prezzi bottiglie tavoli vip 2026 2027 minimum spend dom perignon belvedere grey goose azul don julio 1942 magnum jeroboam',
  },
  {
    id: 'hub-vip-tables',
    href: '/vip-tables',
    icon: 'sparkles',
    badge: { en: 'DIRECT CONCIERGE', it: 'CONCIERGE DIRETTO' },
    title: {
      en: 'VIP Table Booking & Console Privé Concierge',
      it: 'Prenotazione Tavoli VIP & Privé Console Concierge',
    },
    subtitle: {
      en: 'Direct floorplans, zero agency markup & instant WhatsApp confirmation',
      it: 'Planimetrie ufficiali, zero commissioni e conferma WhatsApp in 10 min',
    },
    searchTerms:
      'tavoli vip prive console backstage prenotazione tavolo discoteca milano concierge whatsapp',
  },
] as const;

const ALL_TEN_GENRES = [
  { slug: 'house', label: { en: 'House & Tech-House', it: 'House & Tech-House' }, terms: 'house tech house club dj set' },
  { slug: 'afro-house', label: { en: 'Afro-House & Tribal', it: 'Afro-House & Tribal' }, terms: 'afro house tribal amapiano keinemusik voya' },
  { slug: 'dinner-show', label: { en: 'Dinner Show & Singing Aperitivo', it: 'Dinner Show & Aperitivo Cantato' }, terms: 'dinner show cena cantata aperitivo cantato pineta 55 milano just me' },
  { slug: 'techno', label: { en: 'Techno & Underground', it: 'Techno & Underground' }, terms: 'techno melodic underground industrial warehouse volt amnesia gate tunnel' },
  { slug: 'reggaeton', label: { en: 'Reggaeton & Urban Latin', it: 'Reggaeton & Urban Latin' }, terms: 'reggaeton perreo latin dembow pineta mamacita' },
  { slug: 'hip-hop', label: { en: 'Hip-Hop, Trap & R&B', it: 'Hip-Hop, Trap & R&B' }, terms: 'hip hop trap rnb urban afrobeats repvblic the club hollywood' },
  { slug: 'commercial', label: { en: 'Commercial & Hits', it: 'Commerciale & Hits' }, terms: 'commerciale hits party pop dance just me aria' },
  { slug: 'edm', label: { en: 'EDM & Mainstage', it: 'EDM & Mainstage' }, terms: 'edm mainstage festival progressive fabrique alcatraz' },
  { slug: 'live-music', label: { en: 'Live Music & Concerts', it: 'Live Music & Concerti' }, terms: 'live music concerti band blue note santeria' },
  { slug: 'indie', label: { en: 'Indie & Alternative', it: 'Indie & Alternativa' }, terms: 'indie alternative elettronica magnolia base' },
] as const;

const CAPODANNO_CATEGORIES_QUICK = [
  {
    id: 'capodanno-2027',
    label: { it: 'Tutti i 112 Eventi Capodanno 2027', en: 'All 112 NYE 2027 Events' },
    badge: { it: 'Catalogo Master (112)', en: 'Master Catalog (112)' },
    terms: 'capodanno 2027 milano lombardia tutti 112 eventi new years eve',
  },
  {
    id: 'capodanno-rooftop-milano',
    label: { it: 'Capodanno Rooftop & Terrazze Panoramiche', en: 'NYE Rooftop & Panoramic Terraces' },
    badge: { it: 'Voya 20° Piano · Torre Branca · Duomo', en: 'Voya 20th Floor · Torre Branca · Duomo' },
    terms: 'capodanno rooftop milano terrazze panoramiche voya 20 piano just me terrazza duomo 21 ceresio 7 radio rooftop',
  },
  {
    id: 'capodanno-discoteche-milano',
    label: { it: 'Capodanno in Discoteca & Top Club Milano', en: 'NYE Nightclubs & Top Clubs Milan' },
    badge: { it: 'Just Me · Pineta · Aria · Repvblic · Volt', en: 'Just Me · Pineta · Aria · Repvblic · Volt' },
    terms: 'capodanno discoteche milano club ballare tavoli vip just me pineta aria repvblic hollywood the club tocqueville',
  },
  {
    id: 'capodanno-locali-cenone-milano',
    label: { it: 'Capodanno con Cenone Cantato & Dinner Show', en: 'NYE Gala Dinner & Singing Dinner Shows' },
    badge: { it: '55 Milano · Pineta · Just Me · Voya', en: '55 Milano · Pineta · Just Me · Voya' },
    terms: 'capodanno cenone cantato milano dinner show cena spettacolo 55 milano pineta just me voya',
  },
  {
    id: 'capodanno-hotel-5-stelle-ville-castelli',
    label: { it: 'Capodanno Hotel 5★, Ville & Castelli', en: 'NYE 5★ Luxury Hotels, Villas & Castles' },
    badge: { it: 'Principe di Savoia · Gallia · Ville Storiche', en: 'Principe di Savoia · Gallia · Historic Villas' },
    terms: 'capodanno hotel 5 stelle lusso ville castelli principe di savoia terrazza gallia',
  },
  {
    id: 'capodanno-coppie-romantico-milano',
    label: { it: 'Capodanno Romantico per Coppie', en: 'Romantic NYE for Couples in Milan' },
    badge: { it: 'Rooftop · Terme · Cenone a Lume di Candela', en: 'Rooftops · Spas · Candlelight Gala' },
    terms: 'capodanno coppie romantico milano tavolo per due rooftop terme',
  },
  {
    id: 'capodanno-single-milano',
    label: { it: 'Capodanno per Single & Gruppi di Amici', en: 'NYE for Singles & Groups of Friends' },
    badge: { it: 'Tavoli Social · Party & Open Bar', en: 'Social Tables · Party & Clubbing' },
    terms: 'capodanno single milano gruppi amici conoscere gente festa',
  },
  {
    id: 'capodanno-over-30-40-milano',
    label: { it: 'Capodanno Adulti Over 30 / Over 40', en: 'NYE Over 30 / Over 40 Adults Selection' },
    badge: { it: 'Selezione Elegante · Cenone & Lounge', en: 'Refined Crowd · Gala Dinner & Lounge' },
    terms: 'capodanno over 30 over 40 over 50 adulti milano elegante',
  },
] as const;

const CAPODANNO_FLAGSHIP_EVENTS_FALLBACK = [
  {
    slug: 'capodanno-voya-rooftop-milano',
    venueName: 'Voya Rooftop Milano (20° Piano)',
    city: 'Milano',
    address: 'Via Achille Papa 30 · Portello / CityLife',
    image: '/images/voya-rooftop-milan.webp',
    priceFromEur: 300,
    titleIt: 'Capodanno 2027 Voya Rooftop Milano · 20° Piano Skyline All-Inclusive',
    titleEn: 'NYE 2027 Voya Rooftop Milan · 20th Floor Skyline All-Inclusive Gala',
    summaryIt: 'Menu completo di tutto al 20° piano panoramico (300€ a persona) con vista fuochi su tutta Milano',
    summaryEn: 'Full all-inclusive menu on the 20th panoramic floor (€300/person) overlooking Milan fireworks',
    searchTerms: 'capodanno voya rooftop 20 piano ventesimo piano skyline fuochi 300 euro',
  },
  {
    slug: 'capodanno-justme-milano-torre-branca',
    venueName: 'Just Me Milano · Torre Branca',
    city: 'Milano',
    address: 'Viale Luigi Camoens 2 · Parco Sempione',
    image: '/images/venues/just-me-milano/just-me-milano-torre-branca-01.webp',
    priceFromEur: 80,
    titleIt: 'Capodanno 2027 Just Me Milano · Gala Dinner & Party sotto la Torre Branca',
    titleEn: 'NYE 2027 Just Me Milan · Gala Dinner & VIP Party under Torre Branca',
    summaryIt: 'Dopocena 80–100€ · Royal Buffet 120€ · Gran Cenone Servito 300€ · Tavoli VIP',
    summaryEn: 'After-dinner €80–100 · Royal Buffet €120 · Gala Dinner €300 · VIP Tables',
    searchTerms: 'capodanno just me justme torre branca parco sempione cenone tavoli vip',
  },
  {
    slug: 'capodanno-pineta-milano',
    venueName: 'Pineta Club Milano',
    city: 'Milano',
    address: 'Via Messina 38 · Corso Como / Garibaldi',
    image: '/images/venues/pineta-milano/pineta-milano-ingresso-01.webp',
    priceFromEur: 50,
    titleIt: 'Capodanno 2027 Pineta Club Milano · Cenone Cantato & Noche de Perreo',
    titleEn: 'NYE 2027 Pineta Club Milan · Singing Dinner Show & Reggaeton Party',
    summaryIt: 'Ingresso Dopocena da 50€ · Cenone Cantato Servito · Tavoli Privé & Bottiglie',
    summaryEn: 'After-dinner from €50 · Singing Gala Dinner · VIP Bottle Tables',
    searchTerms: 'capodanno pineta club via messina 38 cenone cantato reggaeton',
  },
  {
    slug: 'capodanno-aria-club-milano',
    venueName: 'Aria Club Milano · San Siro',
    city: 'Milano',
    address: 'Piazzale dello Sport 14 · San Siro',
    image: '/images/venues/aria-club-milano/aria-club-milano-interior-01.webp',
    priceFromEur: 50,
    titleIt: 'Capodanno 2027 Aria Club Milano · Gran Veglione San Siro & Tavoli VIP',
    titleEn: 'NYE 2027 Aria Club Milan · San Siro Arena Gala & VIP Club Night',
    summaryIt: 'Dopocena da 50€ · Gran Buffet & Cenone · Tavoli Pista e Console Privé',
    summaryEn: 'After-dinner from €50 · Royal Buffet & Gala · Mainfloor & Console VIP Tables',
    searchTerms: 'capodanno aria club san siro piazzale dello sport 14',
  },
  {
    slug: 'capodanno-55-milano',
    venueName: '55 Milano · Sempione',
    city: 'Milano',
    address: 'Via Piero della Francesca 55 · Sempione / Arco della Pace',
    image: '/images/55-milano.webp',
    priceFromEur: 50,
    titleIt: 'Capodanno 2027 al 55 Milano · 1.000 mq Cenone Spettacolo & Open Wine',
    titleEn: 'NYE 2027 at 55 Milano · 1,000 sqm Dinner Show & Party in Sempione',
    summaryIt: 'Dopocena 50€ · Imperial Buffet 90€ · Gran Cenone Servito 160€ · Tavoli VIP',
    summaryEn: 'After-dinner €50 · Imperial Buffet €90 · Seated Gala €160 · VIP Tables',
    searchTerms: 'capodanno 55 milano cinquantacinque via piero della francesca 55 cenone buffet',
  },
  {
    slug: 'capodanno-repvblic-milano',
    venueName: 'REPVBLIC Milano',
    city: 'Milano',
    address: 'Piazza della Repubblica, 12, 20124 Milano · Porta Nuova',
    image: '/images/events/capodanno-2027-posters/capodanno-repvblic-milano.webp',
    priceFromEur: 45,
    titleIt: 'NEW YEAR’S EVE AT REPVBLIC MILANO 2027 · Piazza della Repubblica 12',
    titleEn: 'NEW YEAR’S EVE AT REPVBLIC MILANO 2027 · Piazza della Repubblica 12',
    summaryIt: 'Dalle 23:00 al mattino · Early Bird 45€ (flûte + 1 drink) · Tavolo Dancefloor 600€ (6 pax) · Privé 1.200€ (10 pax)',
    summaryEn: '23:00 till morning · Early Bird €45 (flûte + 1 drink) · Dancefloor Table €600 (6 guests) · Privé €1,200 (10 guests)',
    searchTerms: 'capodanno repvblic republic piazza della repubblica 12 early bird 45 dancefloor 600 prive 1200 hip hop house international hits',
  },
] as const;

const searchableEventbriteEvents = [
  {
    id: 'eb-1994392210790',
    dateISO: '2026-11-25T19:30:00+02:00',
    venueName: 'Just Me Milano · Torre Branca',
    image: '/images/venues/just-me-milano/just-me-milano-torre-branca-01.webp',
    priceLabel: 'Da 20€ · Tavoli VIP 350€+',
    genre: ['HOUSE', 'HIP_HOP', 'COMMERCIAL'],
    searchTerms: 'gue guè gue pequeno guè pequeno just me milano live performance concerto',
    localizedContent: {
      title: { en: 'Guè · Live performance at Just Me Milan', it: 'Guè · Performance live al Just Me Milano' },
      shortDescription: {
        en: 'Guè live at Just Me Milan under Torre Branca in Parco Sempione.',
        it: 'Guè live al Just Me Milano sotto la Torre Branca in Parco Sempione.',
      },
      slug: {
        en: 'gue-live-performance-just-me-milan-july-25-2026',
        it: 'gue-live-performance-just-me-milan-july-25-2026',
      },
    },
  },
  {
    id: 'eb-1994228700727',
    dateISO: '2026-11-19T19:30:00+02:00',
    venueName: 'Just Me Milano · Torre Branca',
    image: '/images/venues/just-me-milano/just-me-milano-lounge-01.webp',
    priceLabel: 'Aperitivo 20€ · Tavoli VIP',
    genre: ['HOUSE', 'HIP_HOP', 'REGGAETON', 'EDM', 'COMMERCIAL'],
    searchTerms: 'world cup coppa del mondo finale spagna argentina maxischermo just me milano',
    localizedContent: {
      title: {
        en: 'World Cup Final on the Big Screen at Just Me Milan',
        it: 'Finale Coppa del Mondo su maxischermo al Just Me Milano',
      },
      shortDescription: {
        en: 'Spain vs Argentina on the big screen with Royal Aperitivo & DJ set at Just Me Milan.',
        it: 'Spagna-Argentina su maxischermo con Royal Aperitivo e DJ set al Just Me Milano.',
      },
      slug: {
        en: 'world-cup-final-spain-argentina-big-screen-milan-just-me-july-19-2026',
        it: 'finale-coppa-del-mondo-maxischermo-milano-just-me-19-luglio-2026',
      },
    },
  },
] as const;

const QUICK_SEARCH_CHIPS = [
  { id: 'chip-nye', query: 'Capodanno 2027', tab: 'capodanno' as SearchTabId, label: { it: 'Capodanno 2027', en: 'NYE 2027' } },
  { id: 'chip-justme', query: 'Just Me', tab: 'all' as SearchTabId, label: { it: 'Just Me Milano', en: 'Just Me Milan' } },
  { id: 'chip-pineta', query: 'Pineta', tab: 'all' as SearchTabId, label: { it: 'Pineta Club', en: 'Pineta Club' } },
  { id: 'chip-aria', query: 'Aria San Siro', tab: 'all' as SearchTabId, label: { it: 'Aria · San Siro', en: 'Aria · San Siro' } },
  { id: 'chip-55', query: '55 Milano', tab: 'all' as SearchTabId, label: { it: '55 Milano', en: '55 Milano' } },
  { id: 'chip-voya', query: 'Voya Rooftop', tab: 'all' as SearchTabId, label: { it: 'Voya 20° Piano', en: 'Voya 20th Floor' } },
  { id: 'chip-repvblic', query: 'Repvblic', tab: 'all' as SearchTabId, label: { it: 'Repvblic Milano', en: 'Repvblic Milan' } },
  { id: 'chip-dinner', query: 'Cena Cantata', tab: 'all' as SearchTabId, label: { it: 'Cena Cantata', en: 'Singing Dinner' } },
  { id: 'chip-vip', query: 'Tavoli VIP', tab: 'hubs' as SearchTabId, label: { it: 'Listino Tavoli VIP', en: 'VIP Bottle Prices' } },
] as const;

const normalizeSearchText = (value: string) =>
  (value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

function matchTokensScore(haystackPrimary: string, haystackSecondary: string, qTokens: string[], fullQuery: string): number {
  if (qTokens.length === 0) return 1;
  const primary = normalizeSearchText(haystackPrimary);
  const combined = `${primary} ${normalizeSearchText(haystackSecondary)}`;
  for (const token of qTokens) {
    if (!combined.includes(token)) return 0;
  }
  let score = 10;
  if (primary === fullQuery) score += 100;
  else if (primary.startsWith(fullQuery)) score += 60;
  else if (primary.includes(fullQuery)) score += 35;
  for (const token of qTokens) {
    if (primary.includes(token)) score += 12;
  }
  return score;
}

function romeDayKey(value: string | Date): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Rome',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(typeof value === 'string' ? new Date(value) : value);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((entry) => entry.type === type)?.value || '';
  return `${part('year')}-${part('month')}-${part('day')}`;
}

function getOctoberSlugSimple(event: OctoberEventRecord): string {
  const title = (event.shortName || event.officialName)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, '-')
    .replace(/^-|-$/gu, '');
  const venue = event.venue.name.toLowerCase().replace(/[^a-z0-9]+/gu, '-');
  return `${title}-${venue}-${event.startISO.slice(0, 10)}`;
}

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const HighlightText = ({ text, query }: { text: string; query: string }) => {
  const cleanQuery = query.trim();
  if (!cleanQuery) return <span>{text}</span>;
  const tokens = cleanQuery.split(/\s+/).filter((t) => t.length >= 2).map(escapeRegex);
  if (tokens.length === 0) return <span>{text}</span>;
  const pattern = new RegExp(`(${tokens.join('|')})`, 'gi');
  const parts = text.split(pattern);
  const lowerTokens = tokens.map((t) => t.toLowerCase());
  return (
    <span>
      {parts.map((part, i) =>
        lowerTokens.includes(escapeRegex(part.toLowerCase())) ? (
          <span key={i} className="text-[#EAE3D5] font-semibold underline decoration-[#EAE3D5]/45 underline-offset-2">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
};

export default function GlobalSearch({ currentLocale }: { currentLocale: string }) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<SearchTabId>('all');
  const [capodannoCatalog, setCapodannoCatalog] = useState<readonly CapodannoEventItem[] | null>(null);
  const [octoberCatalog, setOctoberCatalog] = useState<readonly OctoberEventRecord[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const loadingCatalogsRef = useRef(false);
  const pathname = usePathname();
  const router = useRouter();

  const isIt = currentLocale === 'it';
  const typedLocale = (isIt ? 'it' : 'en') as 'en' | 'it';
  const localeCode = (currentLocale || 'en') as LocaleCode;
  const langPrefix = urlLocalePrefix(currentLocale);
  const ui = getSearchUiCopy(currentLocale);

  useEffect(() => {
    setMounted(true);
  }, []);

  const ensureExtendedCatalogs = useCallback(() => {
    if (loadingCatalogsRef.current) return;
    loadingCatalogsRef.current = true;
    import('@/lib/capodannoEvents')
      .then((mod) => {
        if (mod?.CAPODANNO_EVENTS) setCapodannoCatalog(mod.CAPODANNO_EVENTS);
      })
      .catch(() => {});
    import('@/lib/octoberEvents')
      .then((mod) => {
        if (mod?.OCTOBER_EVENTS) setOctoberCatalog(mod.OCTOBER_EVENTS);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('nlm:global-search', { detail: { open: isOpen } }));
    if (isOpen) {
      ensureExtendedCatalogs();
      const rafId = window.requestAnimationFrame(() => {
        document.body.classList.add('overflow-hidden', 'nlm-search-open');
        inputRef.current?.focus();
      });
      return () => {
        window.cancelAnimationFrame(rafId);
        document.body.classList.remove('overflow-hidden', 'nlm-search-open');
      };
    } else {
      document.body.classList.remove('overflow-hidden', 'nlm-search-open');
    }
  }, [isOpen, ensureExtendedCatalogs]);

  const prevPathname = useRef(pathname);
  useEffect(() => {
    const urlQuery = new URLSearchParams(window.location.search).get('q')?.trim() || '';
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      if (urlQuery) {
        ensureExtendedCatalogs();
        setQuery(urlQuery.replace(/-/g, ' '));
        setIsOpen(true);
      } else if (isOpen) {
        setIsOpen(false);
        setQuery('');
      }
      return;
    }
    if (urlQuery && !isOpen && !query) {
      ensureExtendedCatalogs();
      setQuery(urlQuery.replace(/-/g, ' '));
      setIsOpen(true);
    }
  }, [pathname, isOpen, query, ensureExtendedCatalogs]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setActiveTab('all');
  }, []);

  const handleOpen = useCallback(() => {
    ensureExtendedCatalogs();
    setIsOpen(true);
  }, [ensureExtendedCatalogs]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => {
          const next = !prev;
          if (next) ensureExtendedCatalogs();
          return next;
        });
        return;
      }
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        if (query.trim().length > 0) {
          setQuery('');
          inputRef.current?.focus();
        } else {
          handleClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, query, handleClose, ensureExtendedCatalogs]);

  const priorityRankMap: Record<string, number> = useMemo(
    () => ({
      'v-justme': 1,
      'v-pineta': 2,
      'v-aria': 3,
      'v-55milano': 4,
      'v-voya': 5,
      'v-repvblic': 6,
    }),
    [],
  );

  const searchResults = useMemo(() => {
    const trimmed = query.trim();
    const fullQuery = normalizeSearchText(trimmed);
    const qTokens = fullQuery ? fullQuery.split(/\s+/).filter(Boolean) : [];
    const isBrowsingCategory = qTokens.length === 0 && activeTab !== 'all';

    if (qTokens.length === 0 && !isBrowsingCategory) {
      return {
        venues: [],
        capodannoCategories: [],
        capodannoEvents: [],
        events: [],
        hubs: [],
        guides: [],
        genres: [],
        zones: [],
        topHref: null as string | null,
      };
    }

    // 1. Venues (19 Official Clubs & Rooftops)
    const scoredVenues = mockVenues
      .map((v) => {
        const pQuick = PRIORITY_CLUBS_QUICK.find((p) => p.id === v.id);
        const name =
          v.localizedContent.name[localeCode] ||
          v.localizedContent.name[typedLocale] ||
          v.localizedContent.name.en;
        const desc =
          v.localizedContent.description[localeCode] ||
          v.localizedContent.description[typedLocale] ||
          v.localizedContent.description.en;
        const dressCode =
          v.localizedContent.dressCode[localeCode] ||
          v.localizedContent.dressCode[typedLocale] ||
          v.localizedContent.dressCode.en;
        const zoneLabel = pQuick ? pQuick.zone[typedLocale] : v.zone.replace(/_/g, ' ');
        const extra = pQuick?.searchTerms || '';
        const score = isBrowsingCategory
          ? 100 - (priorityRankMap[v.id] ?? 50)
          : matchTokensScore(
              `${name} ${zoneLabel}`,
              `${desc} ${dressCode} ${v.category} ${v.address?.streetAddress || ''} ${extra}`,
              qTokens,
              fullQuery,
            );
        return { venue: v, pQuick, name, zoneLabel, dressCode, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => {
        const rA = priorityRankMap[a.venue.id] ?? 99;
        const rB = priorityRankMap[b.venue.id] ?? 99;
        if (b.score !== a.score) return b.score - a.score;
        if (rA !== rB) return rA - rB;
        return (b.venue.priorityScore || 0) - (a.venue.priorityScore || 0);
      })
      .slice(0, activeTab === 'clubs' ? 19 : 8);

    // 2. Capodanno 2027 Categories & Events (16 Categories + 112 Events)
    const scoredCapodannoCategories = CAPODANNO_CATEGORIES_QUICK.map((cat) => {
      const label = cat.label[typedLocale];
      const badge = cat.badge[typedLocale];
      const score = isBrowsingCategory
        ? 50
        : matchTokensScore(label, `${badge} ${cat.terms}`, qTokens, fullQuery);
      return {
        ...cat,
        href: capodannoCategoryPath(cat.id, currentLocale),
        displayLabel: label,
        displayBadge: badge,
        score,
      };
    })
      .filter((c) => c.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, activeTab === 'capodanno' ? 8 : 4);

    const rawCapodannoList = capodannoCatalog
      ? capodannoCatalog.map((ev) => ({
          slug: ev.slug,
          venueName: ev.venueName,
          city: ev.city,
          address: ev.address,
          image: ev.image,
          priceFromEur: ev.priceFromEur,
          title: isIt ? ev.titleIt : ev.titleEn,
          summary: isIt ? ev.priceSummaryIt : ev.priceSummaryEn,
          searchTerms: `${ev.venueName} ${ev.city} ${ev.province} ${ev.address} ${ev.musicTag} ${ev.venueType} ${ev.formulas.join(' ')} capodanno 2027 new years eve nye 31 dicembre`,
        }))
      : CAPODANNO_FLAGSHIP_EVENTS_FALLBACK.map((ev) => ({
          slug: ev.slug,
          venueName: ev.venueName,
          city: ev.city,
          address: ev.address,
          image: ev.image,
          priceFromEur: ev.priceFromEur,
          title: isIt ? ev.titleIt : ev.titleEn,
          summary: isIt ? ev.summaryIt : ev.summaryEn,
          searchTerms: ev.searchTerms,
        }));

    const priorityCapodannoSlugRank: Record<string, number> = {
      'capodanno-voya-rooftop-milano': 1,
      'capodanno-justme-milano-torre-branca': 2,
      'capodanno-pineta-milano': 3,
      'capodanno-aria-club-milano': 4,
      'capodanno-55-milano': 5,
      'capodanno-repvblic-milano': 6,
    };

    const scoredCapodannoEvents = rawCapodannoList
      .map((ev) => {
        const rank = priorityCapodannoSlugRank[ev.slug] ?? 99;
        const score = isBrowsingCategory
          ? 100 - rank
          : matchTokensScore(`${ev.venueName} ${ev.title}`, `${ev.summary} ${ev.address} ${ev.searchTerms}`, qTokens, fullQuery);
        return {
          ...ev,
          href: capodannoEventPath(ev.slug, currentLocale),
          rank,
          score,
        };
      })
      .filter((ev) => ev.score > 0)
      .sort((a, b) => (a.rank !== b.rank && Math.abs(b.score - a.score) < 25 ? a.rank - b.rank : b.score - a.score))
      .slice(0, activeTab === 'capodanno' ? 24 : 6);

    // 3. Upcoming Calendar Events (Master Eventbrite + Xceed Dated Inventory)
    const todayKey = romeDayKey(new Date());
    const ebItems = searchableEventbriteEvents
      .filter((e) => romeDayKey(e.dateISO) >= todayKey)
      .map((e) => {
        const title = e.localizedContent.title[typedLocale] || e.localizedContent.title.en;
        const desc = e.localizedContent.shortDescription[typedLocale] || e.localizedContent.shortDescription.en;
        const slug = e.localizedContent.slug[typedLocale] || e.localizedContent.slug.en;
        const score = isBrowsingCategory
          ? 90
          : matchTokensScore(title, `${desc} ${e.venueName} ${e.genre.join(' ')} ${e.searchTerms}`, qTokens, fullQuery);
        return {
          id: e.id,
          title,
          venueName: e.venueName,
          dateISO: e.dateISO,
          image: e.image,
          priceLabel: e.priceLabel,
          genres: e.genre.map((g) => g.replace(/_/g, ' ')).join(', '),
          href: `${langPrefix}/events/${slug}`,
          score,
        };
      });

    const xceedItems = (octoberCatalog || [])
      .filter((ev) => romeDayKey(ev.startISO) >= todayKey)
      .map((ev) => {
        const title = `${ev.shortName || ev.officialName} · ${ev.venue.name}`;
        const performers = ev.performers.map((p) => p.name).join(' ');
        const genres = ev.genres.join(', ');
        const minOffer = ev.offers
          .filter((o) => o.category === 'ticket' && o.availability === 'available' && o.price !== null)
          .map((o) => o.price as number);
        const priceLabel = minOffer.length > 0 ? `${ui.card.fromPrice} €${Math.min(...minOffer)}` : 'VIP / Guest List';
        const slug = getOctoberSlugSimple(ev);
        const score = isBrowsingCategory
          ? 70
          : matchTokensScore(
              `${ev.shortName || ev.officialName} ${ev.venue.name}`,
              `${performers} ${genres} ${ev.venue.address || ''} ${ev.startISO.slice(0, 10)}`,
              qTokens,
              fullQuery,
            );
        return {
          id: ev.id,
          title,
          venueName: ev.venue.name,
          dateISO: ev.startISO,
          image: ev.image.src,
          priceLabel,
          genres: genres || 'Club Night',
          href: `${langPrefix}/events/${slug}`,
          score,
        };
      });

    const scoredEvents = [...ebItems, ...xceedItems]
      .filter((item) => item.score > 0)
      .sort((a, b) => (b.score !== a.score ? b.score - a.score : Date.parse(a.dateISO) - Date.parse(b.dateISO)))
      .slice(0, activeTab === 'events' ? 24 : 6);

    // 4. Strategic VIP Hubs (9 Hubs)
    const scoredHubs = STRATEGIC_HUBS.map((h) => {
      const title = h.title[typedLocale];
      const sub = h.subtitle[typedLocale];
      const score = isBrowsingCategory ? 80 : matchTokensScore(title, `${sub} ${h.searchTerms}`, qTokens, fullQuery);
      return { ...h, displayTitle: title, displaySubtitle: sub, displayBadge: h.badge[typedLocale], score };
    })
      .filter((h) => h.score > 0)
      .sort((a, b) => b.score - a.score);

    // 5. Insider & Pillar Guides (All 114 Guides across 35 Languages)
    const scoredGuides = mockGuides
      .map((g) => {
        const title = g.title[localeCode] || g.title[typedLocale] || g.title.en;
        const excerpt = g.excerpt[localeCode] || g.excerpt[typedLocale] || g.excerpt.en;
        const slug = g.slugs[localeCode] || g.slugs[typedLocale] || g.slugs.en;
        const score = isBrowsingCategory ? 60 : matchTokensScore(title, `${excerpt} ${slug}`, qTokens, fullQuery);
        return { guide: g, title, excerpt, slug, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, activeTab === 'guides' ? 30 : 8);

    // 6. Genres (10) & Zones (14)
    const scoredGenres = ALL_TEN_GENRES.map((g) => {
      const label = g.label[typedLocale];
      const score = isBrowsingCategory ? 60 : matchTokensScore(label, `${g.terms} ${g.slug}`, qTokens, fullQuery);
      return { ...g, displayLabel: label, score };
    })
      .filter((g) => g.score > 0)
      .sort((a, b) => b.score - a.score);

    const scoredZones = mockZones
      .map((z) => {
        const desc = z.description[localeCode] || z.description[typedLocale] || z.description.en;
        const score = isBrowsingCategory
          ? 60
          : matchTokensScore(z.name, `${z.vibe} ${desc} ${z.tags.join(' ')} ${z.slug}`, qTokens, fullQuery);
        return { zone: z, desc, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);

    const firstHref =
      (scoredVenues[0] && `${langPrefix}/clubs/${scoredVenues[0].venue.slugs[localeCode] || scoredVenues[0].venue.slugs.en}`) ||
      scoredCapodannoEvents[0]?.href ||
      scoredCapodannoCategories[0]?.href ||
      scoredEvents[0]?.href ||
      (scoredHubs[0] && `${langPrefix}${scoredHubs[0].href}`) ||
      (scoredGuides[0] && `${langPrefix}/guides/${scoredGuides[0].slug}`) ||
      (scoredZones[0] && `${langPrefix}/zones/${scoredZones[0].zone.slug}`) ||
      (scoredGenres[0] && `${langPrefix}/genres/${scoredGenres[0].slug}`) ||
      null;

    return {
      venues: scoredVenues,
      capodannoCategories: scoredCapodannoCategories,
      capodannoEvents: scoredCapodannoEvents,
      events: scoredEvents,
      hubs: scoredHubs,
      guides: scoredGuides,
      genres: scoredGenres,
      zones: scoredZones,
      topHref: firstHref,
    };
  }, [query, activeTab, capodannoCatalog, octoberCatalog, localeCode, typedLocale, isIt, currentLocale, langPrefix, priorityRankMap, ui.card.fromPrice]);

  const showClubs = activeTab === 'all' || activeTab === 'clubs';
  const showCapodanno = activeTab === 'all' || activeTab === 'capodanno';
  const showEvents = activeTab === 'all' || activeTab === 'events';
  const showHubs = activeTab === 'all' || activeTab === 'hubs';
  const showGuides = activeTab === 'all' || activeTab === 'guides';
  const showZones = activeTab === 'all' || activeTab === 'zones';

  const isDefaultDiscovery = query.trim().length === 0 && activeTab === 'all';
  const hasVisibleResults =
    (showClubs && searchResults.venues.length > 0) ||
    (showCapodanno && (searchResults.capodannoCategories.length > 0 || searchResults.capodannoEvents.length > 0)) ||
    (showEvents && searchResults.events.length > 0) ||
    (showHubs && searchResults.hubs.length > 0) ||
    (showGuides && searchResults.guides.length > 0) ||
    (showZones && (searchResults.zones.length > 0 || searchResults.genres.length > 0));

  const renderHubIcon = (iconName: string) => {
    switch (iconName) {
      case 'trophy':
        return <Trophy className="w-4 h-4 text-[#EAE3D5]" />;
      case 'wine':
        return <Wine className="w-4 h-4 text-[#EAE3D5]" />;
      case 'party':
        return <PartyPopper className="w-4 h-4 text-[#EAE3D5]" />;
      case 'music':
        return <Music2 className="w-4 h-4 text-[#EAE3D5]" />;
      case 'qr':
        return <QrCode className="w-4 h-4 text-[#EAE3D5]" />;
      case 'crown':
        return <Crown className="w-4 h-4 text-[#EAE3D5]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#EAE3D5]" />;
    }
  };

  const tabDefinitions: Array<{ id: SearchTabId; label: string; count?: number }> = [
    { id: 'all', label: ui.tabs.all },
    { id: 'clubs', label: ui.tabs.clubs, count: query.trim() ? searchResults.venues.length : 19 },
    {
      id: 'capodanno',
      label: ui.tabs.capodanno,
      count: query.trim()
        ? searchResults.capodannoEvents.length + searchResults.capodannoCategories.length
        : 112,
    },
    { id: 'events', label: ui.tabs.events, count: query.trim() ? searchResults.events.length : undefined },
    { id: 'hubs', label: ui.tabs.hubs, count: query.trim() ? searchResults.hubs.length : 9 },
    { id: 'guides', label: ui.tabs.guides, count: query.trim() ? searchResults.guides.length : 114 },
    {
      id: 'zones',
      label: ui.tabs.zones,
      count: query.trim() ? searchResults.zones.length + searchResults.genres.length : 24,
    },
  ];

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        onMouseEnter={ensureExtendedCatalogs}
        onFocus={ensureExtendedCatalogs}
        className="nlm-search-trigger flex items-center justify-center md:justify-between gap-2.5 min-h-11 min-w-11 md:px-3.5 py-2 border border-[#F6F1E7]/20 bg-[#0B0A09] text-[#F6F1E7] hover:border-[#EAE3D5] hover:text-[#EAE3D5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EAE3D5]"
        aria-label={ui.triggerAria}
        aria-keyshortcuts="Control+K Meta+K"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <Search className="w-4 h-4 text-[#EAE3D5] shrink-0" />
        <span className="hidden md:inline font-mono text-[11px] uppercase tabular-nums tracking-[0.06em] text-[#F6F1E7]">
          {ui.triggerLabel}
        </span>
        <kbd className="hidden xl:inline-flex items-center px-1.5 py-0.5 border border-[#F6F1E7]/15 bg-[#050505] font-mono text-[10px] text-[#C2B9AA]">
          ⌘K
        </kbd>
      </button>

      {mounted &&
        isOpen &&
        createPortal(
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label={ui.triggerAria}
            className="fixed inset-0 z-[120] h-[100dvh] w-screen bg-[#050505]/96 backdrop-blur-2xl flex flex-col text-[#F6F1E7] overflow-hidden"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) handleClose();
            }}
          >
            {/* Sticky Editorial Command Header */}
            <div className="w-full border-b border-[#F6F1E7]/14 bg-[#0B0A09]">
              <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 pt-4 pb-3">
                {/* Input Bar */}
                <div className="flex items-center gap-3 shrink-0 whitespace-nowrap">
                  <div className="flex-1 relative flex items-center border border-[#EAE3D5]/45 bg-[#050505] px-3.5 sm:px-4 min-h-[54px] focus-within:border-[#EAE3D5]">
                    <Search className="w-5 h-5 text-[#EAE3D5] shrink-0 mr-3" />
                    <input
                      ref={inputRef}
                      type="text"
                      role="searchbox"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && searchResults.topHref) {
                          e.preventDefault();
                          const dest = localizeInternalHref(searchResults.topHref, localeCode);
                          handleClose();
                          router.push(dest);
                        }
                      }}
                      placeholder={ui.placeholder}
                      aria-label={ui.placeholder}
                      style={{ outline: "none", boxShadow: "none" }}
                      className="w-full bg-transparent border-none text-base sm:text-xl font-serif text-[#F6F1E7] placeholder:text-[#C2B9AA]/55 focus:outline-none focus-visible:outline-none focus:ring-0 py-2.5"
                    />
                    {query.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setQuery('');
                          inputRef.current?.focus();
                        }}
                        aria-label={ui.clearAria}
                        className="flex items-center justify-center w-9 h-9 text-[#C2B9AA] hover:text-[#F6F1E7] transition-colors shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleClose}
                    aria-label={ui.closeAria}
                    className="flex items-center justify-center gap-2 min-h-[54px] min-w-[54px] sm:px-4 border border-[#F6F1E7]/20 bg-[#050505] font-mono text-[11px] uppercase tabular-nums tracking-[0.06em] text-[#F6F1E7] hover:border-[#EAE3D5] hover:text-[#EAE3D5] transition-colors shrink-0"
                  >
                    <X className="w-5 h-5" />
                    <span className="hidden sm:inline">{ui.closeLabel}</span>
                  </button>
                </div>

                {/* Category Filter Tabs */}
                <div className="mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1" role="tablist">
                  {tabDefinitions.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-1.5 px-3 py-2 min-h-[38px] shrink-0 font-mono text-[11px] uppercase tabular-nums tracking-[0.06em] border transition-colors ${
                          isActive
                            ? 'border-[#F6F1E7] bg-[#F6F1E7] text-[#050505] font-bold'
                            : 'border-[#F6F1E7]/14 bg-[#050505] text-[#C2B9AA] hover:border-[#EAE3D5]/50 hover:text-[#F6F1E7]'
                        }`}
                      >
                        <span>{tab.label}</span>
                        {typeof tab.count === 'number' && (
                          <span
                            className={`text-[10px] px-1.5 py-0.2 ${
                              isActive ? 'bg-[#050505]/20 text-[#050505]' : 'bg-[#F6F1E7]/8 text-[#EAE3D5]'
                            }`}
                          >
                            {tab.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* 1-Click Quick Search Chips */}
                <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-[#F6F1E7]/8">
                  <span className="font-mono text-[10px] uppercase tabular-nums tracking-[0.06em] text-[#EAE3D5] shrink-0 flex items-center gap-1 mr-1">
                    <SlidersHorizontal className="w-3 h-3" />
                    {ui.quickLabel}
                  </span>
                  {QUICK_SEARCH_CHIPS.map((chip) => {
                    const isChipActive = normalizeSearchText(query) === normalizeSearchText(chip.query);
                    return (
                      <button
                        key={chip.id}
                        type="button"
                        onClick={() => {
                          if (isChipActive) {
                            setQuery('');
                            setActiveTab('all');
                          } else {
                            setQuery(chip.query);
                            setActiveTab(chip.tab);
                          }
                          inputRef.current?.focus();
                        }}
                        className={`px-2.5 py-1 text-[11px] font-mono shrink-0 border transition-colors ${
                          isChipActive
                            ? 'border-[#EAE3D5] bg-[#EAE3D5]/20 text-[#EAE3D5]'
                            : 'border-[#F6F1E7]/12 bg-[#050505]/70 text-[#C2B9AA] hover:border-[#EAE3D5]/45 hover:text-[#F6F1E7]'
                        }`}
                      >
                        {chip.label[typedLocale]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Scrollable Widescreen Discovery & Results Body */}
            <div className="flex-1 overflow-y-auto overscroll-contain w-full max-w-[1280px] mx-auto px-4 sm:px-8 py-6 pb-20">
              {isDefaultDiscovery ? (
                <div className="space-y-10">
                  {/* 1. Official Selection: The 6 Priority Partner Clubs with Real Photography & 4 Telemetry Signals */}
                  <section aria-label={ui.sections.priorityClubs}>
                    <div className="flex items-center justify-between border-b border-[#F6F1E7]/14 pb-2.5 mb-4">
                      <h2 className="font-mono text-xs font-semibold tabular-nums tracking-[0.06em] text-[#EAE3D5] uppercase flex items-center gap-2">
                        <Crown className="w-4 h-4" />
                        {ui.sections.priorityClubs}
                      </h2>
                      <div className="flex items-center gap-3 shrink-0 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setActiveTab('clubs')}
                          className="font-mono text-[11px] text-[#C2B9AA] hover:text-[#EAE3D5] uppercase tabular-nums tracking-[0.06em]"
                        >
                          {ui.sections.allClubsLink} (19)
                        </button>
                        <Link
                          href={`${langPrefix}/clubs`}
                          onClick={handleClose}
                          className="font-mono text-[11px] text-[#EAE3D5] hover:underline uppercase tabular-nums tracking-[0.06em] flex items-center gap-1 shrink-0 whitespace-nowrap"
                        >
                          /clubs
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {PRIORITY_CLUBS_QUICK.map((club) => {
                        const venueObj = mockVenues.find((v) => v.id === club.id);
                        const localizedClubSlug =
                          venueObj?.slugs?.[localeCode] || venueObj?.slugs?.[typedLocale] || club.slug;
                        const clubHref = `${langPrefix}/clubs/${localizedClubSlug}`;
                        const waText = isIt
                          ? `Ciao Concierge Nightlife Milan! Vorrei informazioni su Tavolo VIP / Lista per ${club.name}.`
                          : `Hi Nightlife Milan Concierge! I would like info about VIP Table / Guest List for ${club.name}.`;

                        return (
                          <div
                            key={club.id}
                            className="group flex flex-col justify-between border border-[#F6F1E7]/14 bg-[#0B0A09] hover:border-[#EAE3D5]/70 transition-colors p-3.5"
                          >
                            <div>
                              <div className="flex items-start gap-3">
                                <Link
                                  href={clubHref}
                                  onClick={handleClose}
                                  className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 overflow-hidden border border-[#F6F1E7]/14 bg-[#050505]"
                                >
                                  <img
                                    src={club.image}
                                    alt={club.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                  <span className="absolute top-0 left-0 bg-[#F6F1E7] text-[#050505] font-mono text-[10px] font-bold px-1.5 py-0.5">
                                    0{club.rank}
                                  </span>
                                </Link>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-2">
                                    <Link
                                      href={clubHref}
                                      onClick={handleClose}
                                      className="font-serif text-lg text-[#F6F1E7] group-hover:text-[#EAE3D5] transition-colors truncate"
                                    >
                                      {club.name}
                                    </Link>
                                  </div>
                                  <p className="font-mono text-[10px] uppercase tabular-nums tracking-[0.06em] text-[#EAE3D5] mt-0.5">
                                    {ui.card.officialSelection}
                                  </p>
                                  <p className="text-xs text-[#C2B9AA] mt-1 line-clamp-1">{club.zone[typedLocale]}</p>
                                </div>
                              </div>

                              {/* 4 Decision Telemetry Pills */}
                              <div className="mt-3 grid grid-cols-2 gap-1.5 text-[11px] text-[#C2B9AA]">
                                {club.telemetry[typedLocale].map((item, idx) => (
                                  <span
                                    key={idx}
                                    className="truncate px-2 py-1 bg-[#050505] border border-[#F6F1E7]/10 font-mono text-[10px]"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="mt-3 pt-2.5 border-t border-[#F6F1E7]/10 flex items-center justify-between gap-2">
                              <Link
                                href={clubHref}
                                onClick={handleClose}
                                className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-2.5 border border-[#F6F1E7]/20 bg-[#050505] hover:border-[#EAE3D5] text-[#F6F1E7] hover:text-[#EAE3D5] font-mono text-[10px] uppercase tabular-nums tracking-[0.06em] transition-colors"
                              >
                                {ui.card.openSheet}
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </Link>
                              <a
                                href={`${CONTACT.whatsapp.link}?text=${encodeURIComponent(waText)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-[#25D366] text-[#050505] hover:bg-[#20bd5a] font-mono text-[10px] font-bold uppercase tabular-nums tracking-[0.06em] transition-colors"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                {ui.card.whatsappVip}
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* 2. Capodanno 2027 Quick Hub & Flagship Events */}
                  <section aria-label={ui.sections.capodanno}>
                    <div className="flex items-center justify-between border-b border-[#F6F1E7]/14 pb-2.5 mb-4">
                      <h2 className="font-mono text-xs font-semibold tabular-nums tracking-[0.06em] text-[#EAE3D5] uppercase flex items-center gap-2">
                        <PartyPopper className="w-4 h-4" />
                        {ui.sections.capodanno}
                      </h2>
                      <div className="flex items-center gap-3 shrink-0 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setActiveTab('capodanno')}
                          className="font-mono text-[11px] text-[#C2B9AA] hover:text-[#EAE3D5] uppercase tabular-nums tracking-[0.06em]"
                        >
                          {ui.sections.capodannoAllLink}
                        </button>
                        <Link
                          href={capodannoPath(currentLocale)}
                          onClick={handleClose}
                          className="font-mono text-[11px] text-[#EAE3D5] hover:underline uppercase tabular-nums tracking-[0.06em] flex items-center gap-1 shrink-0 whitespace-nowrap"
                        >
                          2027
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                      {CAPODANNO_CATEGORIES_QUICK.map((cat) => (
                        <Link
                          key={cat.id}
                          href={capodannoCategoryPath(cat.id, currentLocale)}
                          onClick={handleClose}
                          className="group flex flex-col justify-between p-3 border border-[#F6F1E7]/14 bg-[#0B0A09] hover:border-[#EAE3D5] transition-colors"
                        >
                          <div>
                            <span className="font-mono text-[10px] uppercase tabular-nums tracking-[0.06em] text-[#EAE3D5]">
                              {cat.badge[typedLocale]}
                            </span>
                            <p className="font-serif text-base text-[#F6F1E7] group-hover:text-[#EAE3D5] mt-1 leading-snug">
                              {cat.label[typedLocale]}
                            </p>
                          </div>
                          <span className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] uppercase tabular-nums tracking-[0.06em] text-[#C2B9AA] group-hover:text-[#F6F1E7]">
                            {ui.card.openSheet}
                            <ArrowUpRight className="w-3 h-3" />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </section>

                  {/* 3. Strategic VIP Hubs (9 Hubs) */}
                  <section aria-label={ui.sections.hubs}>
                    <h2 className="font-mono text-xs font-semibold tabular-nums tracking-[0.06em] text-[#C2B9AA] uppercase flex items-center gap-2 border-b border-[#F6F1E7]/14 pb-2.5 mb-4">
                      <Sparkles className="w-4 h-4 text-[#EAE3D5]" />
                      {ui.sections.hubs}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {STRATEGIC_HUBS.map((hub) => (
                        <Link
                          key={hub.id}
                          href={`${langPrefix}${hub.href}`}
                          onClick={handleClose}
                          className="group flex items-start gap-3 p-3.5 border border-[#F6F1E7]/14 bg-[#0B0A09] hover:border-[#EAE3D5] transition-colors"
                        >
                          <div className="p-2 bg-[#050505] border border-[#EAE3D5]/35 shrink-0">
                            {renderHubIcon(hub.icon)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="font-mono text-[10px] uppercase tabular-nums tracking-[0.06em] text-[#EAE3D5]">
                              {hub.badge[typedLocale]}
                            </span>
                            <p className="font-serif text-base text-[#F6F1E7] group-hover:text-[#EAE3D5] transition-colors mt-0.5">
                              {hub.title[typedLocale]}
                            </p>
                            <p className="text-xs text-[#C2B9AA] mt-1 leading-relaxed line-clamp-2">
                              {hub.subtitle[typedLocale]}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>

                  {/* 4. 10 Music Genres & 14 Milan Nightlife Zones */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <section aria-label={ui.sections.genres}>
                      <div className="flex items-center justify-between border-b border-[#F6F1E7]/14 pb-2.5 mb-3">
                        <h3 className="font-mono text-xs font-semibold tabular-nums tracking-[0.06em] text-[#C2B9AA] uppercase flex items-center gap-2">
                          <Music2 className="w-4 h-4 text-[#EAE3D5]" />
                          {ui.sections.genres}
                        </h3>
                        <Link
                          href={`${langPrefix}/genres`}
                          onClick={handleClose}
                          className="font-mono text-[11px] text-[#EAE3D5] hover:underline"
                        >
                          /genres
                        </Link>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {ALL_TEN_GENRES.map((g) => (
                          <Link
                            key={g.slug}
                            href={`${langPrefix}/genres/${g.slug}`}
                            onClick={handleClose}
                            className="px-3 py-1.5 text-xs font-mono border border-[#F6F1E7]/14 bg-[#0B0A09] text-[#F6F1E7] hover:text-[#EAE3D5] hover:border-[#EAE3D5] transition-colors"
                          >
                            {g.label[typedLocale]}
                          </Link>
                        ))}
                      </div>
                    </section>

                    <section aria-label={ui.sections.zones}>
                      <div className="flex items-center justify-between border-b border-[#F6F1E7]/14 pb-2.5 mb-3">
                        <h3 className="font-mono text-xs font-semibold tabular-nums tracking-[0.06em] text-[#C2B9AA] uppercase flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#EAE3D5]" />
                          {ui.sections.zones}
                        </h3>
                        <Link
                          href={`${langPrefix}/zones`}
                          onClick={handleClose}
                          className="font-mono text-[11px] text-[#EAE3D5] hover:underline"
                        >
                          /zones
                        </Link>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {mockZones.map((z) => (
                          <Link
                            key={z.slug}
                            href={`${langPrefix}/zones/${z.slug}`}
                            onClick={handleClose}
                            className="px-3 py-1.5 text-xs font-mono border border-[#F6F1E7]/14 bg-[#0B0A09] text-[#F6F1E7] hover:text-[#EAE3D5] hover:border-[#EAE3D5] transition-colors"
                          >
                            {z.name}
                          </Link>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              ) : !hasVisibleResults ? (
                <div className="flex flex-col items-center justify-center py-16 text-center max-w-xl mx-auto space-y-4 border border-[#F6F1E7]/14 bg-[#0B0A09] p-8">
                  <Search className="w-8 h-8 text-[#EAE3D5]" />
                  <p className="text-xl font-serif text-[#F6F1E7]">
                    {ui.empty.title} <em className="italic font-serif text-[#EAE3D5]">&ldquo;{query}&rdquo;</em>
                  </p>
                  <p className="text-xs text-[#C2B9AA] leading-relaxed">{ui.empty.subtitle}</p>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setQuery('');
                        setActiveTab('all');
                        inputRef.current?.focus();
                      }}
                      className="px-4 py-2.5 border border-[#F6F1E7]/25 bg-[#050505] text-[#F6F1E7] hover:border-[#EAE3D5] font-mono text-xs uppercase tabular-nums tracking-[0.06em]"
                    >
                      {ui.empty.resetBtn}
                    </button>
                    <a
                      href={`${CONTACT.whatsapp.link}?text=${encodeURIComponent(
                        isIt
                          ? `Ciao Concierge Nightlife Milan! Sto cercando "${query}" a Milano, potete aiutarmi?`
                          : `Hi Nightlife Milan Concierge! I am looking for "${query}" in Milan, can you help me?`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-[#050505] hover:bg-[#20bd5a] font-mono font-bold uppercase tabular-nums tracking-[0.06em] text-xs hover:bg-[#F6F1E7] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {ui.empty.askConcierge}
                    </a>
                  </div>
                </div>
              ) : (
                <div className="space-y-10">
                  {/* Filtered Clubs & Rooftops */}
                  {showClubs && searchResults.venues.length > 0 && (
                    <section aria-label={ui.sections.clubs}>
                      <div className="flex items-center justify-between border-b border-[#F6F1E7]/14 pb-2 mb-4">
                        <h3 className="font-mono text-xs font-semibold tabular-nums tracking-[0.06em] text-[#EAE3D5] uppercase flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {ui.sections.clubs} ({searchResults.venues.length})
                        </h3>
                        <Link
                          href={`${langPrefix}/clubs`}
                          onClick={handleClose}
                          className="font-mono text-[11px] text-[#C2B9AA] hover:text-[#EAE3D5] uppercase tabular-nums tracking-[0.06em] flex items-center gap-1 shrink-0 whitespace-nowrap"
                        >
                          {ui.sections.allClubsLink}
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {searchResults.venues.map(({ venue, pQuick, name, zoneLabel, dressCode }) => {
                          const slug = venue.slugs[localeCode] || venue.slugs[typedLocale] || venue.slugs.en;
                          const clubHref = `${langPrefix}/clubs/${slug}`;
                          const waText = isIt
                            ? `Ciao Concierge Nightlife Milan! Vorrei informazioni su Tavolo VIP / Lista per ${name}.`
                            : `Hi Nightlife Milan Concierge! I would like info about VIP Table / Guest List for ${name}.`;

                          return (
                            <div
                              key={venue.id}
                              className="group flex items-start justify-between gap-3.5 p-3.5 border border-[#F6F1E7]/14 bg-[#0B0A09] hover:border-[#EAE3D5] transition-colors"
                            >
                              <Link
                                href={clubHref}
                                onClick={handleClose}
                                className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 overflow-hidden border border-[#F6F1E7]/14 bg-[#050505]"
                              >
                                <img
                                  src={pQuick?.image || venue.image || '/images/venues/just-me-milano/just-me-milano-torre-branca-01.webp'}
                                  alt={name}
                                  loading="lazy"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </Link>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <Link
                                    href={clubHref}
                                    onClick={handleClose}
                                    className="font-serif text-lg text-[#F6F1E7] group-hover:text-[#EAE3D5] transition-colors truncate"
                                  >
                                    <HighlightText text={name} query={query} />
                                  </Link>
                                  <span className="font-mono text-[10px] px-2 py-0.5 border border-[#EAE3D5]/40 text-[#EAE3D5] shrink-0">
                                    {(venue.priceRange || '€€€').replace(/\$/g, '€')}
                                  </span>
                                </div>

                                <p className="text-xs text-[#C2B9AA] mt-0.5 truncate">
                                  <HighlightText text={zoneLabel} query={query} />
                                </p>
                                <p className="font-mono text-[10px] text-[#C2B9AA]/80 mt-1 truncate">
                                  {venue.category} · {dressCode}
                                </p>

                                <div className="mt-2.5 flex items-center gap-2">
                                  <Link
                                    href={clubHref}
                                    onClick={handleClose}
                                    className="px-2.5 py-1 border border-[#F6F1E7]/20 bg-[#050505] hover:border-[#EAE3D5] font-mono text-[10px] uppercase tabular-nums tracking-[0.06em] text-[#F6F1E7]"
                                  >
                                    {ui.card.openSheet}
                                  </Link>
                                  <a
                                    href={`${CONTACT.whatsapp.link}?text=${encodeURIComponent(waText)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#25D366] text-[#050505] hover:bg-[#20bd5a] font-mono text-[10px] font-bold uppercase tabular-nums tracking-[0.06em]"
                                  >
                                    <MessageCircle className="w-3 h-3" />
                                    VIP
                                  </a>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  )}

                  {/* Filtered Capodanno 2027 Categories & Events */}
                  {showCapodanno &&
                    (searchResults.capodannoCategories.length > 0 || searchResults.capodannoEvents.length > 0) && (
                      <section aria-label={ui.sections.capodanno}>
                        <div className="flex items-center justify-between border-b border-[#F6F1E7]/14 pb-2 mb-4">
                          <h3 className="font-mono text-xs font-semibold tabular-nums tracking-[0.06em] text-[#EAE3D5] uppercase flex items-center gap-2">
                            <PartyPopper className="w-4 h-4" />
                            {ui.sections.capodanno}
                          </h3>
                          <Link
                            href={capodannoPath(currentLocale)}
                            onClick={handleClose}
                            className="font-mono text-[11px] text-[#EAE3D5] hover:underline uppercase tabular-nums tracking-[0.06em] flex items-center gap-1 shrink-0 whitespace-nowrap"
                          >
                            {ui.sections.capodannoAllLink}
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>

                        {searchResults.capodannoCategories.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-4">
                            {searchResults.capodannoCategories.map((cat) => (
                              <Link
                                key={cat.id}
                                href={cat.href}
                                onClick={handleClose}
                                className="group p-3 border border-[#EAE3D5]/35 bg-[#0B0A09] hover:border-[#EAE3D5] transition-colors"
                              >
                                <span className="font-mono text-[10px] uppercase tabular-nums tracking-[0.06em] text-[#EAE3D5]">
                                  {cat.displayBadge}
                                </span>
                                <p className="font-serif text-sm text-[#F6F1E7] group-hover:text-[#EAE3D5] mt-1">
                                  <HighlightText text={cat.displayLabel} query={query} />
                                </p>
                              </Link>
                            ))}
                          </div>
                        )}

                        {searchResults.capodannoEvents.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {searchResults.capodannoEvents.map((ev) => (
                              <Link
                                key={ev.slug}
                                href={ev.href}
                                onClick={handleClose}
                                className="group flex items-start gap-3.5 p-3.5 border border-[#F6F1E7]/14 bg-[#0B0A09] hover:border-[#EAE3D5] transition-colors"
                              >
                                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 overflow-hidden border border-[#F6F1E7]/14 bg-[#050505]">
                                  <img
                                    src={ev.image}
                                    alt={ev.venueName}
                                    loading="lazy"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="font-mono text-[10px] uppercase tabular-nums tracking-[0.06em] text-[#EAE3D5]">
                                      {ui.card.nye2027}
                                    </span>
                                    <span className="font-mono text-[10px] px-2 py-0.5 bg-[#EAE3D5]/15 text-[#EAE3D5] shrink-0">
                                      {ev.priceFromEur > 0
                                        ? `${ui.card.fromPrice} €${ev.priceFromEur}`
                                        : ui.card.freeEntry}
                                    </span>
                                  </div>
                                  <p className="font-serif text-base text-[#F6F1E7] group-hover:text-[#EAE3D5] transition-colors truncate mt-0.5">
                                    <HighlightText text={ev.venueName} query={query} />
                                  </p>
                                  <p className="text-xs text-[#C2B9AA] line-clamp-2 mt-0.5">
                                    <HighlightText text={ev.summary} query={query} />
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </section>
                    )}

                  {/* Filtered Upcoming Dated Events */}
                  {showEvents && searchResults.events.length > 0 && (
                    <section aria-label={ui.sections.events}>
                      <div className="flex items-center justify-between border-b border-[#F6F1E7]/14 pb-2 mb-4">
                        <h3 className="font-mono text-xs font-semibold tabular-nums tracking-[0.06em] text-[#EAE3D5] uppercase flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {ui.sections.events} ({searchResults.events.length})
                        </h3>
                        <Link
                          href={`${langPrefix}/events`}
                          onClick={handleClose}
                          className="font-mono text-[11px] text-[#C2B9AA] hover:text-[#EAE3D5] uppercase tabular-nums tracking-[0.06em] flex items-center gap-1 shrink-0 whitespace-nowrap"
                        >
                          {ui.sections.eventsAllLink}
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {searchResults.events.map((event) => {
                          const dateObj = new Date(event.dateISO);
                          const formattedDate = new Intl.DateTimeFormat(isIt ? 'it-IT' : 'en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            timeZone: 'Europe/Rome',
                          }).format(dateObj);

                          return (
                            <Link
                              key={event.id}
                              href={event.href}
                              onClick={handleClose}
                              className="group flex items-start gap-3.5 p-3.5 border border-[#F6F1E7]/14 bg-[#0B0A09] hover:border-[#EAE3D5] transition-colors"
                            >
                              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 overflow-hidden border border-[#F6F1E7]/14 bg-[#050505]">
                                <img
                                  src={event.image}
                                  alt={event.title}
                                  loading="lazy"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="font-mono text-[10px] uppercase tabular-nums tracking-[0.06em] text-[#EAE3D5] flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {formattedDate}
                                  </span>
                                  <span className="font-mono text-[10px] text-[#C2B9AA] truncate">
                                    {event.priceLabel}
                                  </span>
                                </div>
                                <p className="font-serif text-base text-[#F6F1E7] group-hover:text-[#EAE3D5] transition-colors truncate mt-0.5">
                                  <HighlightText text={event.title} query={query} />
                                </p>
                                <p className="font-mono text-[10px] uppercase tabular-nums tracking-[0.06em] text-[#C2B9AA] mt-1 truncate">
                                  {event.venueName} · <HighlightText text={event.genres} query={query} />
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </section>
                  )}

                  {/* Filtered Strategic VIP Hubs */}
                  {showHubs && searchResults.hubs.length > 0 && (
                    <section aria-label={ui.sections.hubs}>
                      <h3 className="font-mono text-xs font-semibold tabular-nums tracking-[0.06em] text-[#EAE3D5] uppercase flex items-center gap-2 border-b border-[#F6F1E7]/14 pb-2 mb-4">
                        <Sparkles className="w-4 h-4" />
                        {ui.sections.hubs} ({searchResults.hubs.length})
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {searchResults.hubs.map((hub) => (
                          <Link
                            key={hub.id}
                            href={`${langPrefix}${hub.href}`}
                            onClick={handleClose}
                            className="group flex items-start gap-3 p-3.5 border border-[#F6F1E7]/14 bg-[#0B0A09] hover:border-[#EAE3D5] transition-colors"
                          >
                            <div className="p-2 bg-[#050505] border border-[#EAE3D5]/35 shrink-0">
                              {renderHubIcon(hub.icon)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="font-mono text-[10px] uppercase tabular-nums tracking-[0.06em] text-[#EAE3D5]">
                                {hub.displayBadge}
                              </span>
                              <p className="font-serif text-base text-[#F6F1E7] group-hover:text-[#EAE3D5] transition-colors">
                                <HighlightText text={hub.displayTitle} query={query} />
                              </p>
                              <p className="text-xs text-[#C2B9AA] mt-0.5">
                                <HighlightText text={hub.displaySubtitle} query={query} />
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Filtered Insider & Pillar Guides (114 Guides) */}
                  {showGuides && searchResults.guides.length > 0 && (
                    <section aria-label={ui.sections.guides}>
                      <div className="flex items-center justify-between border-b border-[#F6F1E7]/14 pb-2 mb-4">
                        <h3 className="font-mono text-xs font-semibold tabular-nums tracking-[0.06em] text-[#EAE3D5] uppercase flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          {ui.sections.guides} ({searchResults.guides.length})
                        </h3>
                        <Link
                          href={`${langPrefix}/guides`}
                          onClick={handleClose}
                          className="font-mono text-[11px] text-[#C2B9AA] hover:text-[#EAE3D5] uppercase tabular-nums tracking-[0.06em] flex items-center gap-1 shrink-0 whitespace-nowrap"
                        >
                          {ui.sections.guidesAllLink}
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {searchResults.guides.map(({ guide, title, excerpt, slug }) => (
                          <Link
                            key={guide.id}
                            href={`${langPrefix}/guides/${slug}`}
                            onClick={handleClose}
                            className="group flex items-start gap-3.5 p-3.5 border border-[#F6F1E7]/14 bg-[#0B0A09] hover:border-[#EAE3D5] transition-colors"
                          >
                            {guide.image && (
                              <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 overflow-hidden border border-[#F6F1E7]/14 bg-[#050505]">
                                <img
                                  src={guide.image}
                                  alt={title}
                                  loading="lazy"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <span className="font-mono text-[10px] uppercase tabular-nums tracking-[0.06em] text-[#EAE3D5]">
                                {ui.card.insiderGuide}
                              </span>
                              <p className="font-serif text-base text-[#F6F1E7] group-hover:text-[#EAE3D5] transition-colors line-clamp-1 mt-0.5">
                                <HighlightText text={title} query={query} />
                              </p>
                              <p className="text-xs text-[#C2B9AA] line-clamp-2 mt-0.5">
                                <HighlightText text={excerpt} query={query} />
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Filtered Zones & Genres */}
                  {showZones && (searchResults.zones.length > 0 || searchResults.genres.length > 0) && (
                    <section aria-label={ui.tabs.zones}>
                      <h3 className="font-mono text-xs font-semibold tabular-nums tracking-[0.06em] text-[#EAE3D5] uppercase flex items-center gap-2 border-b border-[#F6F1E7]/14 pb-2 mb-4">
                        <MapPin className="w-4 h-4" />
                        {ui.tabs.zones} ({searchResults.zones.length + searchResults.genres.length})
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {searchResults.zones.map(({ zone }) => (
                          <Link
                            key={zone.id}
                            href={`${langPrefix}/zones/${zone.slug}`}
                            onClick={handleClose}
                            className="group flex items-center gap-3 p-3 border border-[#F6F1E7]/14 bg-[#0B0A09] hover:border-[#EAE3D5] transition-colors"
                          >
                            <div className="w-12 h-12 shrink-0 overflow-hidden border border-[#F6F1E7]/14 bg-[#050505]">
                              <img src={zone.image} alt={zone.name} loading="lazy" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="font-mono text-[10px] uppercase tabular-nums tracking-[0.06em] text-[#EAE3D5]">
                                {ui.card.nightlifeDistrict}
                              </span>
                              <p className="font-serif text-base text-[#F6F1E7] group-hover:text-[#EAE3D5] truncate">
                                <HighlightText text={zone.name} query={query} />
                              </p>
                              <p className="text-xs text-[#C2B9AA] truncate">{zone.vibe}</p>
                            </div>
                          </Link>
                        ))}

                        {searchResults.genres.map((g) => (
                          <Link
                            key={g.slug}
                            href={`${langPrefix}/genres/${g.slug}`}
                            onClick={handleClose}
                            className="group flex items-center gap-3 p-3 border border-[#F6F1E7]/14 bg-[#0B0A09] hover:border-[#EAE3D5] transition-colors"
                          >
                            <div className="w-12 h-12 shrink-0 flex items-center justify-center border border-[#EAE3D5]/35 bg-[#050505]">
                              <Music2 className="w-5 h-5 text-[#EAE3D5]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="font-mono text-[10px] uppercase tabular-nums tracking-[0.06em] text-[#EAE3D5]">
                                {ui.card.musicGenre}
                              </span>
                              <p className="font-serif text-base text-[#F6F1E7] group-hover:text-[#EAE3D5] truncate">
                                <HighlightText text={g.displayLabel} query={query} />
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Couture Concierge & Keyboard Telemetry Bar */}
            <div className="w-full border-t border-[#F6F1E7]/14 bg-[#0B0A09] px-4 sm:px-8 py-3">
              <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#C2B9AA]">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 font-mono text-[11px]">
                  <span>{ui.footer.deskLabel}</span>
                  <span className="text-[#EAE3D5] font-semibold">
                    <bdi dir="ltr">+39 351 912 7047</bdi>
                  </span>
                  <span>·</span>
                  <a href="mailto:concierge@nightlifemilan.com" className="text-[#F6F1E7] hover:text-[#EAE3D5] underline">
                    concierge@nightlifemilan.com
                  </a>
                </div>

                <div className="flex items-center gap-3 shrink-0 whitespace-nowrap">
                  <div className="hidden lg:flex items-center gap-3 font-mono text-[10px] text-[#C2B9AA]">
                    <span>
                      <kbd className="px-1.5 py-0.5 border border-[#F6F1E7]/20 bg-[#050505] text-[#EAE3D5] mr-1">↵</kbd>
                      {ui.footer.kbdOpen}
                    </span>
                    <span>
                      <kbd className="px-1.5 py-0.5 border border-[#F6F1E7]/20 bg-[#050505] text-[#EAE3D5] mr-1">ESC</kbd>
                      {ui.footer.kbdClose}
                    </span>
                  </div>
                  <a
                    href={`${CONTACT.whatsapp.link}?text=${encodeURIComponent(
                      isIt
                        ? 'Ciao Concierge Nightlife Milan! Vorrei informazioni su tavoli VIP e liste.'
                        : 'Hi Nightlife Milan Concierge! I would like info about VIP tables and guest lists.',
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#25D366] text-[#050505] hover:bg-[#20bd5a] font-mono font-bold uppercase tabular-nums tracking-[0.06em] text-[11px] hover:bg-[#F6F1E7] transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp +39 351 912 7047
                  </a>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
