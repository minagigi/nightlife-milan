import type { LocaleCode } from '@/lib/i18n/localeRegistry';
import { christmasVoyaPath } from '@/lib/christmas/voya35';
import type {
  CapodannoLocalizedEventContent,
  CapodannoMenuCard,
  CapodannoRelatedHolidayBanner,
} from '@/lib/capodanno/repvblic35';

const VOYA_ADDR = 'Viale Achille Papa 30 (Portello / CityLife), 20149 Milano';
const VOYA_MENU_IT = '/images/events/capodanno-2027-menus/voya-nye-2027-menu-it.webp';
const VOYA_MENU_EN = '/images/events/capodanno-2027-menus/voya-nye-2027-menu-en.webp';

interface VoyaBasePack {
  title: string;
  subtitle: string;
  description: string;
  musicAndFormat: string;
  dressCode: string;
  priceSummary: string;
  tierLabel: string;
  tierPrice: string;
  tierDetails: string;
  highlights: string[];
  sourceBasis: string;
  menusHeading: string;
  menuTitle: string;
  menuSubtitle: string;
  beverages: string;
  courses: [string, string][];
  bannerBadge: string;
  bannerTitle: string;
  bannerDesc: string;
  bannerCta: string;
}

function buildVoyaContent(loc: LocaleCode, p: VoyaBasePack): CapodannoLocalizedEventContent {
  const isIt = loc === 'it';
  const menu: CapodannoMenuCard = {
    id: 'voya-nye-300',
    title: p.menuTitle,
    price: p.tierPrice,
    subtitle: p.menuSubtitle,
    beverages: p.beverages,
    courses: p.courses.map(([course, dish]) => ({ course, dish })),
    imageSrc: isIt ? VOYA_MENU_IT : VOYA_MENU_EN,
    imageAlt: `${p.menuTitle} · Voya Rooftop Milano 2027`,
  };
  const relatedHolidayBanner: CapodannoRelatedHolidayBanner = {
    badge: p.bannerBadge,
    title: p.bannerTitle,
    description: p.bannerDesc,
    ctaLabel: p.bannerCta,
    href: christmasVoyaPath(loc),
  };
  return {
    title: p.title,
    subtitle: p.subtitle,
    description: p.description,
    musicAndFormat: p.musicAndFormat,
    dressCode: p.dressCode,
    priceSummary: p.priceSummary,
    tiers: [
      {
        label: p.tierLabel,
        price: p.tierPrice,
        details: p.tierDetails,
      },
    ],
    highlights: p.highlights,
    sourceBasis: p.sourceBasis,
    menusHeading: p.menusHeading,
    menus: [menu],
    relatedHolidayBanner,
  };
}

const VOYA_BASE_35: Record<LocaleCode, VoyaBasePack> = {
  it: {
    title: 'Capodanno 2027 Voya Rooftop Milano (20° Piano, 85m): Cenone & DJ Set 300€',
    subtitle: `Voya Rooftop · 20° Piano (85m) · ${VOYA_ADDR} · Vista Fuochi a 360°`,
    description:
      'Festeggia il Capodanno 2027 al 20° piano (85 metri di altezza) del Voya Rooftop Milano in Viale Achille Papa 30: Restaurant & DJ Set con vista panoramica a 360 gradi sui fuochi d’artificio di tutta Milano, menu degustazione ufficiale 6 portate + Cotechino con lenticchie dopo la mezzanotte alla tariffa unica confermata di 300€ a persona.',
    musicAndFormat: 'Restaurant & DJ Set · Vista panoramica 360° su Milano e fuochi d’artificio (20:00 – 05:00)',
    dressCode: 'Gala / Elegante Chic per alta terrazza panoramica',
    priceSummary: 'Tariffa Unica Ufficiale 300€ a persona · Menu completo 6 portate + Dopo la mezzanotte, vino ogni 4 ospiti, brindisi e acqua',
    tierLabel: 'Menu Ufficiale Capodanno 2027 + DJ Set (Tariffa Unica)',
    tierPrice: '300€ a persona',
    tierDetails: 'Cenone completo (Entrée, Antipasto, Primo, Secondo, Dessert + Cotechino e lenticchie dopo la mezzanotte), 1 bottiglia di vino ogni 4 persone, brindisi di mezzanotte e acqua.',
    highlights: [
      `Location: Voya Rooftop · 20° Piano, 85m (${VOYA_ADDR})`,
      'Format: Restaurant & DJ Set fino al mattino con vista fuochi a 360° su Milano',
      'Prezzo ufficiale confermato: 300€ a persona (menu completo, vini e brindisi)',
      'Prenotazioni 24/7 via Concierge WhatsApp +39 351 912 7047 (prepagato 100%)',
    ],
    sourceBasis:
      'Locandina ufficiale Voya Rooftop 20th Floor e Menu Capodanno ufficiale Voya Rooftop 2026/2027: tariffa confermata 300€ a persona, 1 bottiglia di vino ogni 4 persone, brindisi e acqua.',
    menusHeading: 'Menu Ufficiale Capodanno 2027 · Voya Rooftop (300€)',
    menuTitle: 'Menu Ufficiale Cenone di Capodanno · 20° Piano',
    menuSubtitle: '6 portate gourmet inclusi vini, brindisi di mezzanotte e cotechino augurale',
    beverages: 'Inclusi: 1 bottiglia di vino ogni 4 persone, Brindisi di mezzanotte e acqua',
    courses: [
      ['Entrée', 'Roll di salmone Gravlax, avocado crème fraîche e aneto'],
      ['Antipasto', 'Capesante scottate al timo, cremoso di zucca e chips di patate viola'],
      ['Primo', 'Ravioli di cernia in salsa ciuppin e crumble di olive'],
      ['Secondo', 'Filetto di rombo glassato al miso con purea di topinambur e julienne di carciofi'],
      ['Dessert', 'Tiramisù di pandoro'],
      ['Dopo la mezzanotte', 'Cotechino con lenticchie'],
    ],
    bannerBadge: 'Natale 2026 · Voya Rooftop',
    bannerTitle: 'Cerchi anche il Natale al Voya Rooftop (25 Dicembre, 100€)?',
    bannerDesc: 'Scopri il menu ufficiale di Natale 5 portate al 20° piano con allestimento natalizio e vino incluso a 100€ a persona.',
    bannerCta: 'Scopri Natale Voya 2026 (100€) →',
  },
  en: {
    title: 'New Year’s Eve 2027 Voya Rooftop Milan (20th Floor, 85m): Gala Dinner & DJ Set €300',
    subtitle: `Voya Rooftop · 20th Floor (85m) · ${VOYA_ADDR} · 360° Skyline & Fireworks`,
    description:
      'Celebrate New Year’s Eve 2027 at Voya Rooftop Milan on the 20th Floor (85m above the city) at Viale Achille Papa 30: Restaurant & DJ Set with 360-degree fireworks views across Milan, and the official 6-course NYE menu plus midnight Cotechino & Lentils at the single confirmed rate of €300 per person.',
    musicAndFormat: 'Restaurant & DJ Set · 360° panoramic Milan skyline & midnight fireworks view (20:00 – 05:00)',
    dressCode: 'Black-Tie Optional / Luxury Rooftop Gala',
    priceSummary: 'Single Confirmed Rate €300 per person · Full 6-Course Menu + After-Midnight, Wine (1 bottle/4 guests), Toast & Water',
    tierLabel: 'Official NYE 2027 All-Inclusive Menu & DJ Set',
    tierPrice: '€300 per person',
    tierDetails: 'Complete 6-course gala dinner (Entrée, Starter, First Course, Main, Dessert + After-Midnight Cotechino & Lentils), 1 bottle of wine every 4 people, midnight toast and water.',
    highlights: [
      `Venue: Voya Rooftop · 20th Floor, 85m (${VOYA_ADDR})`,
      'Format: Fine-Dining Restaurant & DJ Set with 360° fireworks views',
      'Confirmed official rate: €300 per person all-inclusive menu',
      '24/7 WhatsApp Concierge +39 351 912 7047 · 100% Prepaid Reservation',
    ],
    sourceBasis:
      'Official Voya Rooftop 20th Floor NYE 2027 flyer & official Voya menu PDF: single confirmed rate €300 per person with wine (1/4 guests), midnight toast and water.',
    menusHeading: 'Official NYE 2027 Menu · Voya Rooftop (€300)',
    menuTitle: 'Official New Year’s Eve Tasting Menu · 20th Floor',
    menuSubtitle: '6 curated courses including wine pairing, midnight toast and lucky lentils',
    beverages: 'Included: 1 bottle of wine for every 4 people, Midnight Toast and water',
    courses: [
      ['Entrée', 'Gravlax Salmon Roll with Avocado Crème Fraîche and Dill'],
      ['Starter', 'Seared Scallops with Thyme, Creamy Pumpkin Purée and Purple Potato Chips'],
      ['First Course', 'Grouper Ravioli with Ciuppin Seafood Sauce and Olive Crumble'],
      ['Main Course', 'Miso-glazed Turbot Fillet with Jerusalem Artichoke Purée and Julienne Artichokes'],
      ['Dessert', 'Pandoro Tiramisù'],
      ['After Midnight', 'Traditional Cotechino with Lentils'],
    ],
    bannerBadge: 'Christmas 2026 · Voya Rooftop',
    bannerTitle: 'Also looking for Christmas Day at Voya Rooftop (25 Dec, €100)?',
    bannerDesc: 'Explore the official 5-course Christmas menu at 85m with festive décor, wine, water and coffee for €100 per person.',
    bannerCta: 'View Christmas at Voya (€100) →',
  },
  es: {
    title: 'Nochevieja 2027 Voya Rooftop Milán (Piso 20, 85m): Cena de Gala & DJ Set 300€',
    subtitle: `Voya Rooftop · Piso 20 (85m) · ${VOYA_ADDR} · Vistas 360° Fuegos Artificiales`,
    description:
      'Fin de Año 2027 en Voya Rooftop Milán, piso 20 a 85 metros de altura en Viale Achille Papa 30: Restaurante & DJ Set con vistas panorámicas 360° de los fuegos artificiales y menú oficial completo por la tarifa única confirmada de 300€ por persona.',
    musicAndFormat: 'Restaurante & DJ Set · Panorama 360° y fuegos artificiales sobre Milán (20:00 – 05:00)',
    dressCode: 'Gala / Elegante Chic Panorámico',
    priceSummary: 'Tarifa Oficial Única 300€ por persona · Menú 6 pasos + Después de medianoche, vino (1/4 pers.), brindis y agua',
    tierLabel: 'Menú Oficial Nochevieja 2027 + DJ Set',
    tierPrice: '300€ por persona',
    tierDetails: 'Menú completo (Entrée, Entrante, Primer Plato, Segundo Plato, Postre y Cotechino con lentejas), 1 botella de vino cada 4 personas, brindis de medianoche y agua.',
    highlights: [
      `Lugar: Voya Rooftop · Piso 20, 85m (${VOYA_ADDR})`,
      'Formato: Restaurante gourmet y DJ Set con vistas 360°',
      'Precio oficial confirmado: 300€ por persona',
      'Concierge WhatsApp 24/7 +39 351 912 7047 · Prepago 100%',
    ],
    sourceBasis: 'Cartel oficial Voya Rooftop Piso 20 y menú oficial de Fin de Año 2027 (300€ por persona).',
    menusHeading: 'Menú Oficial Nochevieja 2027 · Voya Rooftop (300€)',
    menuTitle: 'Menú Oficial de Gala · Piso 20',
    menuSubtitle: '6 pases gourmet con vinos, brindis de medianoche y cotechino de la suerte',
    beverages: 'Incluido: 1 botella de vino cada 4 personas, brindis de medianoche y agua',
    courses: [
      ['Entrée', 'Roll de salmón Gravlax con crème fraîche de aguacate y eneldo'],
      ['Entrante', 'Vieiras marcadas al tomillo, crema de calabaza y chips de patata violeta'],
      ['Primer Plato', 'Raviolis de mero en salsa ciuppin y crumble de aceitunas'],
      ['Segundo Plato', 'Filete de rodaballo glaseado al miso con puré de tupinambo y juliana de alcachofas'],
      ['Postre', 'Tiramisú de pandoro'],
      ['Después de medianoche', 'Cotechino tradicional con lentejas'],
    ],
    bannerBadge: 'Navidad 2026 · Voya Rooftop',
    bannerTitle: '¿También buscas el menú de Navidad en Voya Rooftop (25 Dic, 100€)?',
    bannerDesc: 'Descubre el menú oficial de Navidad de 5 platos en el piso 20 con vino, agua y café por 100€.',
    bannerCta: 'Ver Navidad en Voya (100€) →',
  },
  fr: {
    title: 'Nouvel An 2027 Voya Rooftop Milan (20e Étage, 85m) : Dîner & DJ Set 300€',
    subtitle: `Voya Rooftop · 20e Étage (85m) · ${VOYA_ADDR} · Panorama 360° Feux d’artifice`,
    description:
      'Réveillon 2027 au 20e étage (85m) du Voya Rooftop Milan, Viale Achille Papa 30 : Restaurant & DJ Set avec vue à 360° sur les feux d’artifice de Milan et menu gastronomique officiel au tarif unique confirmé de 300€ par personne.',
    musicAndFormat: 'Restaurant & DJ Set · Vue panoramique 360° sur les feux d’artifice (20h00 – 05h00)',
    dressCode: 'Tenue de Gala / Chic Panoramique',
    priceSummary: 'Tarif Officiel Unique 300€ par personne · Menu 6 plats + Minuit, vin (1 bout./4 pers.), toast et eau',
    tierLabel: 'Menu Officiel Nouvel An 2027 + DJ Set',
    tierPrice: '300€ par personne',
    tierDetails: 'Dîner de gala complet (Entrée, Mise en bouche, Pâtes, Poisson, Dessert et Cotechino aux lentilles après minuit), 1 bouteille de vin pour 4 personnes, toast et eau.',
    highlights: [
      `Lieu : Voya Rooftop · 20e Étage, 85m (${VOYA_ADDR})`,
      'Format : Restaurant gastronomique & DJ Set vue 360°',
      'Tarif officiel confirmé : 300€ par personne tout compris',
      'Conciergerie WhatsApp 24/7 +39 351 912 7047 · Prépaiement 100%',
    ],
    sourceBasis: 'Affiche et menu officiels Voya Rooftop Milan 2026/2027 : tarif confirmé de 300€ par personne.',
    menusHeading: 'Menu Officiel Nouvel An 2027 · Voya Rooftop (300€)',
    menuTitle: 'Menu Dégustation de Saint-Sylvestre · 20e Étage',
    menuSubtitle: '6 temps gastronomiques avec vin, toast de minuit et lentilles de la chance',
    beverages: 'Inclus : 1 bouteille de vin pour 4 personnes, toast de minuit et eau',
    courses: [
      ['Mise en bouche', 'Roulé de saumon Gravlax, crème fraîche à l’avocat et aneth'],
      ['Entrée', 'Noix de Saint-Jacques snackées au thym, velouté de courge et chips de vitelotte'],
      ['Premier Plat', 'Raviolis de mérou sauce ciuppin et crumble d’olives'],
      ['Plat Principal', 'Filet de turbot glacé au miso, purée de topinambour et julienne d’artichauts'],
      ['Dessert', 'Tiramisù au pandoro'],
      ['Après minuit', 'Cotechino traditionnel aux lentilles'],
    ],
    bannerBadge: 'Noël 2026 · Voya Rooftop',
    bannerTitle: 'Vous cherchez aussi Noël au Voya Rooftop (25 Décembre, 100€) ?',
    bannerDesc: 'Découvrez le menu officiel de Noël 5 plats au 20e étage avec vin, eau et café à 100€.',
    bannerCta: 'Voir Noël à Voya (100€) →',
  },
  de: {
    title: 'Silvester 2027 Voya Rooftop Mailand (20. Etage, 85m): Galadinner & DJ-Set 300€',
    subtitle: `Voya Rooftop · 20. Etage (85m) · ${VOYA_ADDR} · 360°-Feuerwerksblick`,
    description:
      'Feiern Sie Silvester 2027 in der 20. Etage (85 Meter) auf dem Voya Rooftop Mailand (Viale Achille Papa 30): Restaurant & DJ-Set mit 360-Grad-Blick auf das Feuerwerk über Mailand zum offiziellen Einheitspreis von 300€ pro Person.',
    musicAndFormat: 'Restaurant & DJ-Set · 360°-Feuerwerks-Panorama über Mailand (20:00 – 05:00)',
    dressCode: 'Gala / Elegante Rooftop-Abendgarderobe',
    priceSummary: 'Offizieller Einheitspreis 300€ pro Person · 6-Gänge-Menü + Mitternachtsgang, Wein (1/4 Pers.), Toast & Wasser',
    tierLabel: 'Offizielles Silvester-Menü 2027 & DJ-Set',
    tierPrice: '300€ pro Person',
    tierDetails: 'Komplettes 6-Gänge-Menü inkl. Cotechino mit Linsen nach Mitternacht, 1 Flasche Wein pro 4 Personen, Mitternachtstoast und Wasser.',
    highlights: [
      `Location: Voya Rooftop · 20. Etage, 85m (${VOYA_ADDR})`,
      'Format: Gourmet-Restaurant & DJ-Set mit 360°-Feuerwerksblick',
      'Bestätigter offizieller Preis: 300€ pro Person',
      '24/7 WhatsApp-Concierge +39 351 912 7047 · 100% Vorauszahlung',
    ],
    sourceBasis: 'Offizielles Silvester-Menü & Flyer Voya Rooftop 2026/2027 (300€ pro Person).',
    menusHeading: 'Offizielles Silvestermenü 2027 · Voya Rooftop (300€)',
    menuTitle: 'Offizielles Silvester-Galadinner · 20. Etage',
    menuSubtitle: '6 Gänge inklusive Weinbegleitung, Mitternachtstoast und Linsen nach Mitternacht',
    beverages: 'Inklusive: 1 Flasche Wein für je 4 Gäste, Mitternachtstoast und Wasser',
    courses: [
      ['Entrée', 'Gravlax-Lachsrolle mit Avocado-Crème-fraîche und Dill'],
      ['Vorspeise', 'Gebratene Jakobsmuscheln mit Thymian, Kürbiscreme und lila Kartoffelchips'],
      ['Erster Gang', 'Zackenbarsch-Ravioli in Ciuppin-Sauce und Oliven-Crumble'],
      ['Hauptgang', 'Miso-glasiertes Steinbuttfilet mit Topinamburpüree und Artischocken-Julienne'],
      ['Dessert', 'Pandoro-Tiramisù'],
      ['Nach Mitternacht', 'Traditioneller Cotechino mit Linsen'],
    ],
    bannerBadge: 'Weihnachten 2026 · Voya Rooftop',
    bannerTitle: 'Auch das Weihnachtsmenü im Voya Rooftop entdecken (25. Dez., 100€)?',
    bannerDesc: 'Offizielles 5-Gänge-Weihnachtsmenü in 85m Höhe mit Weihnachtsdeko, Wein, Wasser und Kaffee für 100€.',
    bannerCta: 'Weihnachten bei Voya ansehen (100€) →',
  },
  pt: {
    title: 'Réveillon 2027 Voya Rooftop Milão (20º Andar, 85m): Jantar & DJ Set 300€',
    subtitle: `Voya Rooftop · 20º Andar (85m) · ${VOYA_ADDR} · Vista 360° Fogo de Artifício`,
    description:
      'Celebre o Réveillon 2027 no 20º andar (85m de altura) do Voya Rooftop Milão na Viale Achille Papa 30: Restaurante & DJ Set com vista panorâmica de 360° para o fogo de artifício e menu oficial completo à tarifa única confirmada de 300€ por pessoa.',
    musicAndFormat: 'Restaurante & DJ Set · Vista panorâmica 360° sobre Milão (20:00 – 05:00)',
    dressCode: 'Gala / Elegante Chic Rooftop',
    priceSummary: 'Tarifa Oficial Única 300€ por pessoa · Menu 6 pratos + Pós-meia-noite, vinho (1/4 pax), brinde e água',
    tierLabel: 'Menu Oficial Réveillon 2027 + DJ Set',
    tierPrice: '300€ por pessoa',
    tierDetails: 'Menu completo (Entrée, Entrada, Primeiro Prato, Prato Principal, Sobremesa e Cotechino com lentilhas após a meia-noite), 1 garrafa de vinho por cada 4 pessoas, brinde e água.',
    highlights: [
      `Espaço: Voya Rooftop · 20º Andar, 85m (${VOYA_ADDR})`,
      'Formato: Restaurante & DJ Set até de madrugada com vista 360°',
      'Preço oficial confirmado: 300€ por pessoa',
      'Concierge WhatsApp 24/7 +39 351 912 7047 · Pré-pagamento 100%',
    ],
    sourceBasis: 'Cartaz oficial Voya Rooftop e Menu Oficial de Fim de Ano 2026/2027 (300€ por pessoa).',
    menusHeading: 'Menu Oficial Réveillon 2027 · Voya Rooftop (300€)',
    menuTitle: 'Menu Oficial de Gala · 20º Andar',
    menuSubtitle: '6 momentos gourmet incluindo vinho, brinde de meia-noite e lentilhas da sorte',
    beverages: 'Incluído: 1 garrafa de vinho para cada 4 pessoas, brinde de meia-noite e água',
    courses: [
      ['Entrée', 'Rolo de salmão Gravlax com crème fraîche de abacate e endro'],
      ['Entrada', 'Vieiras salteadas com tomilho, creme de abóbora e chips de batata roxa'],
      ['Primeiro Prato', 'Raviólis de garoupa com molho ciuppin e crumble de azeitonas'],
      ['Prato Principal', 'Lombo de pregado vitrificado com miso, puré de tupinambo e juliana de alcachofras'],
      ['Sobremesa', 'Tiramisù de pandoro'],
      ['Após a meia-noite', 'Cotechino tradicional com lentilhas'],
    ],
    bannerBadge: 'Natal 2026 · Voya Rooftop',
    bannerTitle: 'Também procura o Natal no Voya Rooftop (25 Dezembro, 100€)?',
    bannerDesc: 'Veja o menu oficial de Natal de 5 pratos no 20º andar com decoração natalícia, vinho e café por 100€.',
    bannerCta: 'Ver Natal no Voya (100€) →',
  },
  nl: shortVoya('Oud & Nieuw 2027 Voya Rooftop Milaan (20e Etage, 85m): Diner & DJ €300', 'Voya Rooftop · 20e Verdieping · 360° Uitzicht', 'Vier Oud en Nieuw 2027 op de 20e verdieping (85m) van Voya Rooftop Milaan (Viale Achille Papa 30) met diner, DJ-set en 360°-vuurwerkzicht voor het vaste officiële tarief van €300 per persoon.', 'Restaurant & DJ-set · 360° vuurwerkzicht (20:00 – 05:00)', 'Chic / Rooftop Gala', '€300 p.p. all-inclusive', 'Officieel Oud & Nieuw Menu 2027', '€300 p.p.', '6-gangen menu + Cotechino met linzen, 1 fles wijn per 4 gasten, toast & water.', ['20e verdieping, 85m', '360° vuurwerkzicht', '€300 p.p. · 24/7 WhatsApp +39 351 912 7047'], 'Officiële Menu · Voya €300', '1 fles wijn per 4 gasten, middernachttoast & water', [['Entrée', 'Gravlax zalmrolletje met avocado crème fraîche & dille'], ['Voorgerecht', 'Gegrilde coquilles met pompoencrème & paarse aardappelchips'], ['Tussengerecht', 'Zeebaarsravioli in ciuppin-saus & olijfcrumble'], ['Hoofdgerecht', 'Tarbotfilet met miso & aardperenpuree'], ['Dessert', 'Pandoro tiramisù'], ['Na middernacht', 'Cotechino met linzen']], 'Kerst 2026', 'Kerst bij Voya (25 dec, €100)?', 'Bekijk Kerst (€100) →'),
  ru: shortVoya('Новый год 2027 Voya Rooftop Милан (20 этаж, 85м): Ужин & DJ-сет 300€', 'Voya Rooftop · 20 этаж · Панорама 360°', 'Встретьте 2027 год на 20-м этаже (85м) Voya Rooftop Милан (Viale Achille Papa 30): ресторан и DJ-сет с видом на салют 360° по единой официальной цене 300€ с гостя.', 'Ресторан & DJ-сет · Панорама фейерверков 360° (20:00 – 05:00)', 'Вечерний / Rooftop Gala', 'Единый тариф 300€ с гостя', 'Официальное новогоднее меню 2027', '300€ с гостя', 'Меню из 6 курсов + котекино с чечевицей, 1 бут. вина на 4 гостей, тост и вода.', ['20 этаж, 85м высота', 'Панорамный вид 360° на салют', '300€ с гостя · WhatsApp 24/7 +39 351 912 7047'], 'Официальное меню · Voya 300€', '1 бутылка вина на 4 человек, тост и вода', [['Закуска', 'Ролл из лосося Гравлакс с авокадо и укропом'], ['Стартер', 'Гребешки с тимьяном, кремом из тыквы и фиолетовыми чипсами'], ['Первое блюдо', 'Равиоли с групером в соусе чуппин'], ['Основное', 'Филе тюрбо в глазури мисо с пюре из топинамбура'], ['Десерт', 'Тирамису из пандоро'], ['После полуночи', 'Котекино с чечевицей']], 'Рождество 2026', 'Ищете Рождество в Voya (25 дек, 100€)?', 'Смотреть Рождество (100€) →'),
  tr: shortVoya('Yılbaşı 2027 Voya Rooftop Milano (20. Kat, 85m): Yemek & DJ 300€', 'Voya Rooftop · 20. Kat · 360° Manzara', 'Milano’nun 85m yükseklikteki Voya Rooftop terasında (Viale Achille Papa 30) 2027 Yılbaşı gecesi: 360° havai fişek manzarası eşliğinde resmi 6 aşamalı menü kişi başı sabit 300€.', 'Restoran & DJ Set · 360° manzara (20:00 – 05:00)', 'Gala / Rooftop Şıklığı', 'Resmi Tek Tarife 300€ kişi başı', 'Resmi Yılbaşı Menüsü 2027 + DJ', '300€ kişi başı', '6 aşamalı menü + gece yarısı Cotechino, her 4 kişiye 1 şişe şarap, kadeh ve su.', ['20. kat, 85m yükseklik', '360° havai fişek panoraması', '300€ kişi başı · 7/24 WhatsApp +39 351 912 7047'], 'Resmi Yılbaşı Menüsü · 300€', 'Her 4 kişiye 1 şişe şarap, gece yarısı kadehi ve su', [['Entrée', 'Avokadolu ve dereotlu Gravlax somon rulo'], ['Başlangıç', 'Kekikli deniz tarağı, balkabağı püresi ve mor patates'], ['Ara Sıcak', 'Ciuppin soslu lahoz ravioli'], ['Ana Yemek', 'Miso glazeli kalkan filetosu ve yer elması püresi'], ['Tatlı', 'Pandoro tiramisu'], ['Gece yarısı', 'Mercimekli Cotechino']], 'Noel 2026', 'Voya Noel Yemeği (25 Aralık, 100€)?', 'Noel Menüsünü Gör (100€) →'),
  zh: shortVoya('2027米兰Voya Rooftop跨年晚宴（20层85米）：盛大晚宴与DJ派对 300€', 'Voya Rooftop · 20层高空 · 360°烟花景观', '2027跨年夜在米兰Voya Rooftop高空露台（Viale Achille Papa 30，20层85米）尊享360度全景烟花秀、官方六道式晚宴与DJ派对，官方统一定价每位300€。', '餐厅晚宴 & DJ派对 · 360度跨年烟花视角 (20:00 – 05:00)', '礼服盛装 / Rooftop Gala', '官方统一定价 每位300€', '2027官方跨年全套菜单 + DJ', '每位 300€', '6道式精选菜单 + 零点扁豆香肠、每4位1瓶葡萄酒、零点香槟祝酒及水。', ['20层 85米天际线露台', '360°米兰烟花全景', '每位300€ · 24/7 WhatsApp +39 351 912 7047'], '官方跨年菜单 · 每位300€', '含每4位1瓶葡萄酒、零点祝酒与矿泉水', [['前菜', '北欧腌三文鱼卷配牛油果奶油与茴香'], ['头盘', '百里香煎扇贝配南瓜泥及紫薯脆片'], ['主食', '意式石斑鱼饺佐海鲜汁'], ['主菜', '味噌釉烤菱鲆鱼配菊芋泥与朝鲜蓟'], ['甜点', '潘多罗提拉米苏'], ['午夜后', '传统意式香肠炖扁豆']], '2026圣诞', '预订Voya 12月25日圣诞晚宴（100€）？', '查看圣诞菜单 (100€) →'),
  ar: shortVoya('رأس السنة 2027 في Voya Rooftop ميلانو (الطابق 20): عشاء وDJ بـ 300€', 'Voya Rooftop · الطابق 20 (85م)', 'احتفل برأس السنة 2027 في الطابق 20 (85 متراً) من Voya Rooftop ميلانو (Viale Achille Papa 30) مع عشاء فاخر وDJ وإطلالة 360° للألعاب النارية بسعر رسمي موحد 300€ للشخص.', 'مطعم وDJ · إطلالة 360° على الألعاب النارية (20:00 – 05:00)', 'أنيق / ملابس غالا', 'السعر الموحد 300€ للشخص', 'القائمة الرسمية لرأس السنة 2027', '300€ للشخص', '6 أطباق + كوتيكينو بالعدس بعد منتصف الليل، زجاجة نبيذ لكل 4 أشخاص، نخب منتصف الليل وماء.', ['الطابق 20 ارتفاع 85م', 'إطلالة 360°', '300€ للشخص · واتساب 24/7 +39 351 912 7047'], 'القائمة الرسمية · 300€', 'شامل زجاجة نبيذ لكل 4 أشخاص ونخب منتصف الليل والماء', [['مقبلات', 'رول سلمون غرافلاكس مع الأفوكادو والشبت'], ['بداية', 'اسكالوب مشوي بالزعتر مع هريس اليقطين'], ['طبق أول', 'رافيولي الهامور مع صلصة المأكولات البحرية'], ['طبق رئيسي', 'فيليه تيربو مع هريس الأرضي شوكي'], ['حلويات', 'تيراميسو باندورو'], ['بعد منتصف الليل', 'كوتيكينو مع العدس']], 'عيد الميلاد 2026', 'عيد الميلاد في Voya (25 ديسمبر، 100€)؟', 'عرض قائمة الميلاد (100€) →'),
  bg: shortVoya('Нова година 2027 Voya Rooftop Милано (20 етаж, 85м): Вечеря & DJ 300€', 'Voya Rooftop · 20 етаж · 360° панорама', 'Празнувайте Нова година 2027 на 20-ия етаж (85м) в Voya Rooftop Милано (Viale Achille Papa 30) с 360° изглед към фойерверките за единна потвърдена цена от 300€ на гост.', 'Ресторант & DJ сет · 360° фойерверки (20:00 – 05:00)', 'Гала / Елегантен', 'Официална цена 300€ на човек', 'Официално новогодишно меню 2027', '300€ на гост', '6-степенно меню + котекино с леща, 1 бут. вино на 4 гости, тост и вода.', ['20-ти етаж, 85м', '360° изглед', '300€ · WhatsApp 24/7 +39 351 912 7047'], 'Официално меню · 300€', '1 бутилка вино на 4 гости, тост в полунощ и вода', [['Антре', 'Руло сьомга Гравлакс с авокадо и копър'], ['Предястие', 'Миди Сен Жак с мащерка и тиквен крем'], ['Първо', 'Равиоли с групер в сос чупин'], ['Основно', 'Филе калкан с мисо и пюре от топинамбур'], ['Десерт', 'Тирамису от пандоро'], ['След полунощ', 'Котекино с леща']], 'Коледа 2026', 'Коледа в Voya Rooftop (25 дек, 100€)?', 'Виж Коледа (100€) →'),
  hr: shortVoya('Nova godina 2027. Voya Rooftop Milano (20. kat, 85m): Večera & DJ 300€', 'Voya Rooftop · 20. kat · 360° pogled', 'Dočekajte 2027. na 20. katu (85m) Voya Rooftop Milano (Viale Achille Papa 30) uz restoran, DJ set i 360° pogled na vatromet po jedinstvenoj cijeni od 300€ po osobi.', 'Restoran & DJ set · 360° pogled na vatromet (20:00 – 05:00)', 'Gala / Elegantno', 'Jedinstvena cijena 300€ po osobi', 'Službeni novogodišnji meni 2027', '300€ po osobi', '6 sljedova + cotechino s lećom, 1 boca vina na 4 gosta, zdravica i voda.', ['20. kat, 85m', '360° panorama vatrometa', '300€ · 24/7 WhatsApp +39 351 912 7047'], 'Službeni meni · Voya 300€', '1 boca vina na 4 gosta, ponoćna zdravica i voda', [['Entrée', 'Gravlax losos rolada s avokadom i koprom'], ['Predjelo', 'Pečene jakobove kapice s pireom od bundeve'], ['Prvo jelo', 'Ravioli od kirnje u ciuppin umaku'], ['Glavno jelo', 'Filet iverka s misom i pireom od čičoke'], ['Desert', 'Pandoro tiramisu'], ['Nakon ponoći', 'Cotechino s lećom']], 'Božić 2026', 'Božić u Voya Rooftop (25. prosinca, 100€)?', 'Pogledaj Božić (100€) →'),
  cs: shortVoya('Silvestr 2027 Voya Rooftop Milán (20. patro, 85m): Večeře & DJ 300€', 'Voya Rooftop · 20. patro · Výhled 360°', 'Oslavte Silvestra 2027 ve 20. patře (85m) na Voya Rooftop Milán (Viale Achille Papa 30) s restaurací, DJ setem a 360° výhledem na ohňostroj za jednotnou oficiální cenu 300€ na osobu.', 'Restaurace & DJ set · 360° ohňostroj (20:00 – 05:00)', 'Gala / Elegantní', 'Jednotná oficiální cena 300€', 'Oficiální silvestrovské menu 2027', '300€ na osobu', '6chodové menu + cotechino s čočkou po půlnoci, 1 láhev vína na 4 hosty, přípitek a voda.', ['20. patro, 85m', '360° výhled na ohňostroj', '300€ · 24/7 WhatsApp +39 351 912 7047'], 'Oficiální menu · Voya 300€', '1 láhev vína na 4 osoby, půlnoční přípitek a voda', [['Entrée', 'Rolka z lososa Gravlax s avokádem a koprem'], ['Předkrm', 'Opékané hřebenatky s dýňovým pyré'], ['První chod', 'Ravioli z kanice v omáčce ciuppin'], ['Hlavní chod', 'Filet z kambaly s misem a topinamburovým pyré'], ['Dezert', 'Pandoro tiramisu'], ['Po půlnoci', 'Cotechino s čočkou']], 'Vánoce 2026', 'Hledáte Vánoce v Voya (25. 12., 100€)?', 'Zobrazit Vánoce (100€) →'),
  da: shortVoya('Nytår 2027 Voya Rooftop Milano (20. etage, 85m): Middag & DJ 300€', 'Voya Rooftop · 20. etage · 360° udsigt', 'Fejr nytår 2027 på 20. etage (85m) hos Voya Rooftop Milano (Viale Achille Papa 30) med restaurant, DJ-sæt og 360° fyrværkeriudsigt til den officielle faste pris på 300€ pr. gæst.', 'Restaurant & DJ-sæt · 360° fyrværkeri (20:00 – 05:00)', 'Gala / Elegant Chic', 'Fast officiel pris 300€ pr. person', 'Officiel nytårsmenu 2027', '300€ pr. gæst', '6-retters menu + cotechino & linser, 1 fl. vin pr. 4 gæster, midnatsskål & vand.', ['20. etage, 85m', '360° udsigt', '300€ · 24/7 WhatsApp +39 351 912 7047'], 'Officiel menu · Voya 300€', '1 flaske vin pr. 4 gæster, midnatsskål & vand', [['Entrée', 'Gravlaks-rulle med avocadocrème & dild'], ['Forret', 'Stegte kammuslinger med græskarpuré'], ['Mellemret', 'Ravioli med havaborre i ciuppin-sauce'], ['Hovedret', 'Pighvarfilet med miso & jordskokkepuré'], ['Dessert', 'Pandoro tiramisu'], ['Efter midnat', 'Cotechino med linser']], 'Jul 2026', 'Jul på Voya Rooftop (25. dec, 100€)?', 'Se Jul på Voya (100€) →'),
  et: shortVoya('Aastavahetus 2027 Voya Rooftop Milano (20. korrus, 85m): Õhtusöök & DJ 300€', 'Voya Rooftop · 20. korrus · 360° vaade', 'Tähista 2027. aastavahetust Voya Rooftop Milanos (Viale Achille Papa 30, 85m kõrgusel) 360° ilutulestikuvaate ja ametliku 6-käigulise menüüga 300€ külalise kohta.', 'Restoran & DJ · 360° vaade (20:00 – 05:00)', 'Gala / Pidulik', 'Ametlik hind 300€ külalise kohta', 'Ametlik aastavahetuse menüü 2027', '300€ inimene', '6-käiguline menüü + cotechino läätsedega, 1 veinipudel 4 külalisele, toost & vesi.', ['20. korrus, 85m', '360° vaade', '300€ · 24/7 WhatsApp +39 351 912 7047'], 'Ametlik menüü · Voya 300€', '1 veinipudel 4 külalisele, kesköötoost ja vesi', [['Entrée', 'Gravlax lõherull avokaado ja tilliga'], ['Eelroog', 'Praetud kammkarbid kõrvitsapüreega'], ['Esimene käik', 'Kiviahvena ravioolid ciuppin-kastmes'], ['Pearoog', 'Miso-kammeljafille maapirnipüreega'], ['Dessert', 'Pandoro tiramisu'], ['Pärast keskööd', 'Cotechino läätsedega']], 'Jõulud 2026', 'Jõulud Voya Rooftopil (25. dets, 100€)?', 'Vaata jõulumenüüd (100€) →'),
  fi: shortVoya('Uusivuosi 2027 Voya Rooftop Milano (20. krs, 85m): Illallinen & DJ 300€', 'Voya Rooftop · 20. kerros · 360° näkymä', 'Juhli uuttavuotta 2027 Milanon korkeimmalla terassilla (Viale Achille Papa 30, 85m) ravintolan ja DJ:n parissa 360° ilotulitusnäkymin kiinteään hintaan 300€ / hlö.', 'Ravintola & DJ · 360° ilotulitusnäkymä (20:00 – 05:00)', 'Gaala / Tyylikäs', 'Virallinen hinta 300€ / hlö', 'Virallinen uuden vuoden menu 2027', '300€ / hlö', '6 ruokalajia + cotechino ja linssit keskiyön jälkeen, 1 pullo viiniä / 4 hlö, malja ja vesi.', ['20. kerros, 85m', '360° ilotulitusnäkymä', '300€ / hlö · 24/7 WhatsApp +39 351 912 7047'], 'Virallinen menu · Voya 300€', '1 viinipullo per 4 vierasta, keskiyön malja ja vesi', [['Entrée', 'Gravlax-lohirulla avokadolla ja tillillä'], ['Alkuruoka', 'Paistetut kampasimpukat ja kurpitsapyree'], ['Ensimmäinen', 'Meriahvenravioli ciuppin-kastikkeessa'], ['Pääruoka', 'Misokuorrutettu piikkikampela ja maa-artisokkapyree'], ['Jälkiruoka', 'Pandoro-tiramisu'], ['Keskiyön jälkeen', 'Cotechino ja linssit']], 'Joulu 2026', 'Joulu Voya Rooftopissa (25.12., 100€)?', 'Katso joulumenu (100€) →'),
  el: shortVoya('Πρωτοχρονιά 2027 Voya Rooftop Μιλάνο (20ος, 85μ): Δείπνο & DJ 300€', 'Voya Rooftop · 20ος Όροφος · 360° Θέα', 'Γιορτάστε την Πρωτοχρονιά 2027 στον 20ό όροφο (85μ) του Voya Rooftop (Viale Achille Papa 30) με δείπνο, DJ και 360° θέα στα πυροτεχνήματα με επίσημη τιμή 300€ ανά άτομο.', 'Εστιατόριο & DJ Set · 360° θέα (20:00 – 05:00)', 'Γκαλά / Κομψό', 'Επίσημη τιμή 300€ ανά άτομο', 'Επίσημο Πρωτοχρονιάτικο Μενού 2027', '300€ / άτομο', '6 πιάτα + cotechino με φακές, 1 φιάλη κρασί ανά 4 άτομα, πρόποση και νερό.', ['20ος όροφος, 85μ', '360° θέα πυροτεχνημάτων', '300€ · 24/7 WhatsApp +39 351 912 7047'], 'Επίσημο Μενού · Voya 300€', '1 φιάλη κρασί ανά 4 άτομα, πρόποση και νερό', [['Entrée', 'Ρολό σολομού Gravlax με αβοκάντο & άνηθο'], ['Ορεκτικό', 'Χτένια με θυμάρι & κρέμα κολοκύθας'], ['Πρώτο', 'Ραβιόλι ροφού σε σάλτσα ciuppin'], ['Κυρίως', 'Φιλέτο καλκάνι με μίσο & πουρέ τοπιναμπούρ'], ['Επιδόρπιο', 'Τιραμισού παντόρο'], ['Μετά τα μεσάνυχτα', 'Κοτεκίνο με φακές']], 'Χριστούγεννα 2026', 'Χριστούγεννα στο Voya (25 Δεκ, 100€);', 'Δείτε Χριστούγεννα (100€) →'),
  hu: shortVoya('Szilveszter 2027 Voya Rooftop Milánó (20. em., 85m): Vacsora & DJ 300€', 'Voya Rooftop · 20. emelet · 360° Panoráma', 'Ünnepelje 2027-et a Voya Rooftop Milánó 20. emeletén (Viale Achille Papa 30) 360 fokos tűzijáték-panorámával, gálavacsorával és DJ-vel egységesen 300€ / fő áron.', 'Étterem & DJ · 360° panoráma (20:00 – 05:00)', 'Gála / Elegáns', 'Hivatalos ár: 300€ / fő', 'Hivatalos Szilveszteri Menü 2027', '300€ / fő', '6 fogás + cotechino lencsével éjfél után, 1 üveg bor 4 főre, koccintás és víz.', ['20. emelet, 85m', '360° tűzijáték-kilátás', '300€ / fő · 24/7 WhatsApp +39 351 912 7047'], 'Hivatalos Menü · Voya 300€', '1 palack bor 4 vendégenként, éjféli pezsgő & víz', [['Entrée', 'Gravlax lazactekercs avokádóval & kaporral'], ['Előétel', 'Sütött fésűkagyló sütőtökpürével'], ['Első fogás', 'Sügér ravioli ciuppin szósszal'], ['Főétel', 'Miso-mázas rombuszhal csicsókapürével'], ['Desszert', 'Pandoro tiramisu'], ['Éjfél után', 'Cotechino lencsével']], 'Karácsony 2026', 'Karácsony a Voya Rooftopon (dec. 25., 100€)?', 'Karácsonyi menü (100€) →'),
  ga: shortVoya('Oíche Chinn Bliana 2027 Voya Rooftop Milano (20ú hUrlár): €300', 'Voya Rooftop · 20ú hUrlár (85m)', 'Ceiliúir 2027 ar an 20ú hUrlár ag Voya Rooftop Milano (Viale Achille Papa 30) le bialann, DJ agus radharc 360° ar thinte ealaíne ar €300 an duine.', 'Bialann & DJ · Radharc 360° (20:00 – 05:00)', 'Galánta / Gala', 'Praghas oifigiúil €300 an duine', 'Biachlár Oifigiúil 2027 + DJ', '€300 an duine', '6 chúrsa + Cotechino le lintilí, 1 bhuidéal fíona do 4 aoi, tósta & uisce.', ['20ú hUrlár, 85m', 'Radharc 360°', '€300 · 24/7 WhatsApp +39 351 912 7047'], 'Biachlár Oifigiúil · €300', '1 bhuidéal fíona do gach 4 aoi, tósta & uisce', [['Entrée', 'Rolla bradán Gravlax le habhacád & dill'], ['Tosaithe', 'Muiríní le thyme & pumpkin'], ['Céad Chúrsa', 'Ravioli i anlann ciuppin'], ['Príomhchúrsa', 'Turbot le miso & Jerusalem artichoke'], ['Milseog', 'Pandoro tiramisù'], ['Tar éis meán oíche', 'Cotechino le lintilí']], 'Nollaig 2026', 'Nollaig ag Voya (25 Nollaig, €100)?', 'Féach Nollaig (€100) →'),
  lv: shortVoya('Jaunais gads 2027 Voya Rooftop Milāna (20. stāvs, 85m): Vakariņas & DJ 300€', 'Voya Rooftop · 20. stāvs · 360° skats', 'Sagaidiet 2027. gadu Voya Rooftop Milānā (Viale Achille Papa 30, 85m) ar restorānu, DJ un 360° salūta skatu par apstiprināto fiksēto cenu 300€ personai.', 'Restorāns & DJ · 360° salūts (20:00 – 05:00)', 'Gala / Elegants', 'Fiksēta cena 300€ personai', 'Oficiālā Jaungada ēdienkarte 2027', '300€ personai', '6 kārtu ēdienkarte + cotechino ar lēcām, 1 vīna pudele uz 4 viesiem, tosts un ūdens.', ['20. stāvs, 85m', '360° skats uz salūtu', '300€ · 24/7 WhatsApp +39 351 912 7047'], 'Oficiālā ēdienkarte · 300€', '1 vīna pudele uz 4 personām, pusnakts tosts un ūdens', [['Entrée', 'Gravlax laša rullis ar avokado un dillēm'], ['Uzkoda', 'Ceptas jūras ķemmītes ar ķirbju biezeni'], ['Pirmais', 'Asara ravioli ciuppin mērcē'], ['Pamatēdiens', 'Paltusa fileja ar miso un topinambūru biezeni'], ['Deserts', 'Pandoro tiramisu'], ['Pēc pusnakts', 'Cotechino ar lēcām']], 'Ziemassvētki 2026', 'Ziemassvētki Voya Rooftop (25. dec, 100€)?', 'Skatīt Ziemassvētkus (100€) →'),
  lt: shortVoya('Naujieji metai 2027 Voya Rooftop Milanas (20 aukštas): Vakarienė & DJ 300€', 'Voya Rooftop · 20 aukštas (85m)', 'Sutikite 2027 m. 20-ajame Voya Rooftop aukšte Milane (Viale Achille Papa 30) su 360° fejerverkų panorama už vieningą oficialią 300€ kainą asmeniui.', 'Restoranas & DJ · 360° panorama (20:00 – 05:00)', 'Gala / Elegantiškas', 'Oficiali kaina 300€ asmeniui', 'Oficialus Naujųjų metų meniu 2027', '300€ asmeniui', '6 patiekalų meniu + cotechino su lęšiais, 1 vyno butelis 4 svečiams, tostas ir vanduo.', ['20 aukštas, 85m', '360° fejerverkų vaizdas', '300€ · 24/7 WhatsApp +39 351 912 7047'], 'Oficialus meniu · Voya 300€', '1 vyno butelis 4 asmenims, vidurnakčio tostas ir vanduo', [['Entrée', 'Gravlax lašišos suktinukas su avokadu'], ['Užkandis', 'Keptos šukutės su moliūgų tyre'], ['Pirmas', 'Gruperio ravioliai ciuppin padaže'], ['Pagrindinis', 'Oto filė su miso ir topinambų tyre'], ['Desertas', 'Pandoro tiramisu'], ['Po vidurnakčio', 'Cotechino su lęšiais']], 'Kalėdos 2026', 'Kalėdos Voya Rooftop (gruodžio 25 d., 100€)?', 'Žiūrėti Kalėdas (100€) →'),
  mt: shortVoya('Ewwel tas-Sena 2027 Voya Rooftop Milan (20 Sular): Ikla & DJ €300', 'Voya Rooftop · L-20 Sular (85m)', 'Iċċelebra l-2027 fl-20 sular ta’ Voya Rooftop Milan (Viale Achille Papa 30) b’veduta ta’ 360° fuq il-logħob tan-nar bir-rata uffiċjali unika ta’ €300 kull persuna.', 'Restorant & DJ · Veduta 360° (20:00 – 05:00)', 'Gala / Eleganti', 'Rata uffiċjali €300 kull persuna', 'Menu Uffiċjali 2027 + DJ', '€300 / persuna', 'Menu ta’ 6 platti + Cotechino bl-għads, flixkun inbid kull 4 mistednin, toast u ilma.', ['20 Sular, 85m', 'Veduta 360°', '€300 · 24/7 WhatsApp +39 351 912 7047'], 'Menu Uffiċjali · Voya €300', 'Flixkun inbid kull 4 persuni, toast ta’ nofsillejl u ilma', [['Entrée', 'Roll tas-salamun Gravlax bl-avokado'], ['Starter', 'Scallops bil-ħlewwa u krema tal-qargħa ħamra'], ['L-Ewwel', 'Ravjul taċ-ċerna fiz-zalza ciuppin'], ['Prinċipali', 'Flett tat-turbot bil-miso'], ['Deżerta', 'Pandoro tiramisù'], ['Wara nofsillejl', 'Cotechino bl-għads']], 'Milied 2026', 'Il-Milied f’Voya Rooftop (25 Diċ, €100)?', 'Ara l-Milied (€100) →'),
  pl: shortVoya('Sylwester 2027 Voya Rooftop Mediolan (20. piętro, 85m): Kolacja & DJ 300€', 'Voya Rooftop · 20. piętro · Widok 360°', 'Powitaj 2027 na 20. piętrze (85m) Voya Rooftop Mediolan (Viale Achille Papa 30) z restauracją, DJ-em i panoramą 360° na fajerwerki w jednolitej oficjalnej cenie 300€ od osoby.', 'Restauracja & DJ Set · Widok 360° na fajerwerki (20:00 – 05:00)', 'Gala / Elegancki', 'Jednolita oficjalna cena 300€ od osoby', 'Oficjalne Menu Sylwestrowe 2027', '300€ od osoby', 'Menu 6-daniowe + cotechino z soczewicą po północy, 1 butelka wina na 4 gości, toast i woda.', ['20. piętro, 85m', 'Panorama 360° na Mediolan', '300€ · 24/7 WhatsApp +39 351 912 7047'], 'Oficjalne Menu · Voya 300€', '1 butelka wina na 4 osoby, toast o północy i woda', [['Entrée', 'Roladka z łososia Gravlax z awokado i koperkiem'], ['Przystawka', 'Przegrzebki z tymiankiem i kremem z dyni'], ['Pierwsze danie', 'Ravioli z granika w sosie ciuppin'], ['Danie główne', 'Filet z turbota z miso i purée z topinamburu'], ['Deser', 'Tiramisu z pandoro'], ['Po północy', 'Cotechino z soczewicą']], 'Boże Narodzenie 2026', 'Szukasz Bożego Narodzenia w Voya (25 grudzień, 100€)?', 'Zobacz menu świąteczne (100€) →'),
  ro: shortVoya('Revelion 2027 Voya Rooftop Milano (Etaj 20, 85m): Cină & DJ Set 300€', 'Voya Rooftop · Etajul 20 · Panoramă 360°', 'Sărbătorește Revelionul 2027 la etajul 20 (85m) al Voya Rooftop Milano (Viale Achille Papa 30): Restaurant & DJ Set cu priveliște 360° asupra artificiilor și meniu oficial la tariful unic confirmat de 300€ de persoană.', 'Restaurant & DJ Set · Artificii 360° (20:00 – 05:00)', 'Gală / Elegant Chic', 'Tarif Unic Oficial 300€ de persoană', 'Meniu Oficial Revelion 2027 + DJ', '300€ de persoană', 'Meniu 6 feluri + Cotechino cu linte după miezul nopții, 1 sticlă vin la 4 persoane, toast și apă.', ['Etajul 20, 85m înălțime', 'Vedere 360° peste Milano', '300€ · WhatsApp 24/7 +39 351 912 7047'], 'Meniu Oficial · Voya 300€', '1 sticlă de vin la 4 persoane, toast la miezul nopții și apă', [['Entrée', 'Rulou de somon Gravlax cu avocado și mărar'], ['Aperitiv', 'Scoici Saint-Jacques cu cimbru și cremă de dovleac'], ['Felul Întâi', 'Ravioli cu cernia în sos ciuppin'], ['Fel Principal', 'File de calcan glazurat cu miso și piure de topinambur'], ['Desert', 'Tiramisù de pandoro'], ['După miezul nopții', 'Cotechino cu linte']], 'Crăciun 2026', 'Cauți și Crăciunul la Voya Rooftop (25 Dec, 100€)?', 'Vezi Crăciunul la Voya (100€) →'),
  sk: shortVoya('Silvester 2027 Voya Rooftop Miláno (20. posch., 85m): Večera & DJ 300€', 'Voya Rooftop · 20. poschodie · Výhľad 360°', 'Oslávte Silvestra 2027 na 20. poschodí (85m) Voya Rooftop Miláno (Viale Achille Papa 30) s reštauráciou, DJ setom a 360° výhľadom na ohňostroj za jednotnú cenu 300€ na osobu.', 'Reštaurácia & DJ · 360° výhľad (20:00 – 05:00)', 'Gala / Elegantný', 'Oficiálna jednotná cena 300€', 'Oficiálne silvestrovské menu 2027', '300€ na osobu', '6-chodové menu + cotechino so šošovicou, 1 fľaša vína na 4 hostí, prípitok a voda.', ['20. poschodie, 85m', '360° výhľad', '300€ · 24/7 WhatsApp +39 351 912 7047'], 'Oficiálne menu · Voya 300€', '1 fľaša vína na 4 osoby, polnočný prípitok a voda', [['Entrée', 'Rolka z lososa Gravlax s avokádom'], ['Predjedlo', 'Opekané hrebenatky s tekvicovým pyré'], ['Prvý chod', 'Ravioli z garupy v omáčke ciuppin'], ['Hlavné jedlo', 'Filet z kambaly s misom a topinamburovým pyré'], ['Dezert', 'Pandoro tiramisu'], ['Po polnoci', 'Cotechino so šošovicou']], 'Vianoce 2026', 'Vianoce vo Voya Rooftop (25. dec, 100€)?', 'Pozrieť Vianoce (100€) →'),
  sl: shortVoya('Silvestrovo 2027 Voya Rooftop Milano (20. nadstropje, 85m): 300€', 'Voya Rooftop · 20. nadstropje · 360° razgled', 'Praznujte silvestrovo 2027 v 20. nadstropju (85m) na Voya Rooftop Milano (Viale Achille Papa 30) z restavracijo, DJ-jem in 360° razgledom na ognjemet za 300€ na osebo.', 'Restavracija & DJ · 360° ognjemet (20:00 – 05:00)', 'Gala / Elegantno', 'Enotna cena 300€ na osebo', 'Uradni silvestrski meni 2027', '300€ na osebo', '6 hodov + cotechino z lečo po polnoči, 1 steklenica vina na 4 osebe, zdravica in voda.', ['20. nadstropje, 85m', '360° razgled', '300€ · 24/7 WhatsApp +39 351 912 7047'], 'Uradni meni · Voya 300€', '1 steklenica vina na 4 goste, zdravica in voda', [['Entrée', 'Zvitek lososa Gravlax z avokadom in koprom'], ['Predjed', 'Popečene jakobinke z bučnim pirejem'], ['Prva jed', 'Ravioli kirnje v omaki ciuppin'], ['Glavna jed', 'File romba z misom in pirejem topinamburja'], ['Sladica', 'Pandoro tiramisu'], ['Po polnoči', 'Cotechino z lečo']], 'Božič 2026', 'Božič na Voya Rooftop (25. dec, 100€)?', 'Poglej Božič (100€) →'),
  sv: shortVoya('Nyår 2027 Voya Rooftop Milano (Våning 20, 85m): Middag & DJ 300€', 'Voya Rooftop · Våning 20 · 360° Utsikt', 'Fira nyår 2027 på 20:e våningen (85m) på Voya Rooftop Milano (Viale Achille Papa 30) med restaurang, DJ-set och 360° fyrverkeriutsikt för det bekräftade priset 300€ per gäst.', 'Restaurang & DJ-set · 360° utsikt (20:00 – 05:00)', 'Gala / Elegant', 'Officiellt fast pris 300€ per person', 'Officiell Nyårsmeny 2027', '300€ per gäst', '6-rätters meny + cotechino & linser, 1 fl. vin per 4 gäster, tolvslagsskål & vatten.', ['Våning 20, 85m', '360° fyrverkerivy', '300€ · 24/7 WhatsApp +39 351 912 7047'], 'Officiell meny · Voya 300€', '1 flaska vin per 4 gäster, nyårsskål & vatten', [['Entrée', 'Gravlaxrulle med avokado & dill'], ['Förrätt', 'Halstrade pilgrimsmusslor med pumpapuré'], ['Mellanrätt', 'Havsabborr-ravioli i ciuppin-sås'], ['Varmrätt', 'Piggvarfilé med miso & jordärtskockspuré'], ['Dessert', 'Pandoro tiramisù'], ['Efter midnatt', 'Cotechino med linser']], 'Jul 2026', 'Jul på Voya Rooftop (25 dec, 100€)?', 'Se Jul på Voya (100€) →'),
  no: shortVoya('Nyttår 2027 Voya Rooftop Milano (20. etg., 85m): Middag & DJ 300€', 'Voya Rooftop · 20. etasje · 360° Utsikt', 'Feir nyttår 2027 i 20. etasje (85m) på Voya Rooftop Milano (Viale Achille Papa 30) med restaurant, DJ-sett og 360° fyrverkeriutsikt til bekreftet enhetspris 300€ per person.', 'Restaurant & DJ-sett · 360° utsikt (20:00 – 05:00)', 'Gala / Elegant', 'Offisiell enhetspris 300€ per person', 'Offisiell Nyttårsmeny 2027', '300€ per person', '6-retters meny + cotechino & linser, 1 fl. vin pr. 4 gjester, midnattsskål & vann.', ['20. etasje, 85m', '360° fyrverkeriutsikt', '300€ · 24/7 WhatsApp +39 351 912 7047'], 'Offisiell meny · Voya 300€', '1 flaske vin pr. 4 gjester, midnattsskål & vann', [['Entrée', 'Gravlaksrull med avokado & dill'], ['Forrett', 'Stekte kamskjell med gresskarpuré'], ['Første rett', 'Ravioli i ciuppin-saus'], ['Hovedrett', 'Piggvarfilet med miso & jordskokkpuré'], ['Dessert', 'Pandoro tiramisu'], ['Etter midnatt', 'Cotechino med linser']], 'Jul 2026', 'Jul på Voya Rooftop (25. des, 100€)?', 'Se Jul på Voya (100€) →'),
  is: shortVoya('Áramót 2027 Voya Rooftop Mílanó (20. hæð, 85m): Kvöldverður & DJ 300€', 'Voya Rooftop · 20. hæð · 360° Útsýni', 'Fagnaðu nýju ári 2027 á 20. hæð (85m) Voya Rooftop Mílanó (Viale Achille Papa 30) með 360° flugeldaútsýni á opinberu verði 300€ á mann.', 'Veitingastaður & DJ · 360° útsýni (20:00 – 05:00)', 'Gala / Glæsilegt', 'Opinbert verð 300€ á mann', 'Opinber Áramótamatseðill 2027', '300€ á mann', '6 réttir + cotechino og linsubaunir, 1 vínflaska á 4 gesti, skál & vatn.', ['20. hæð, 85m', '360° flugeldaútsýni', '300€ · 24/7 WhatsApp +39 351 912 7047'], 'Opinber Matseðill · Voya 300€', '1 vínflaska á 4 gesti, miðnæturskál & vatn', [['Entrée', 'Gravlax laxarúlla með avókadó & dilli'], ['Forréttur', 'Pönnusteiktur hörpudiskur með graskersmauki'], ['Fyrri réttur', 'Ravioli í ciuppin sósu'], ['Aðalréttur', 'Sandhverfuflak með miso og ætiþistlum'], ['Eftirréttur', 'Pandoro tiramisu'], ['Eftir miðnætti', 'Cotechino með linsubaunum']], 'Jól 2026', 'Jól á Voya Rooftop (25. des, 100€)?', 'Sjá Jól á Voya (100€) →'),
  uk: shortVoya('Новий рік 2027 Voya Rooftop Мілан (20 поверх, 85м): Вечеря & DJ 300€', 'Voya Rooftop · 20-й поверх · 360° панорама', 'Святкуйте 2027 рік на 20-му поверсі (85м) Voya Rooftop Мілан (Viale Achille Papa 30) з рестораном, DJ-сетом і панорамою салютів 360° за фіксованою ціною 300€ з гостя.', 'Ресторан & DJ-сет · 360° феєрверки (20:00 – 05:00)', 'Гала / Елегантний', 'Офіційний тариф 300€ з гостя', 'Офіційне новорічне меню 2027', '300€ з гостя', '6 страв + котекіно з сочевицею опівночі, 1 пляшка вина на 4 гостей, тост та вода.', ['20-й поверх, 85м', 'Панорама 360° на салют', '300€ · 24/7 WhatsApp +39 351 912 7047'], 'Офіційне меню · Voya 300€', '1 пляшка вина на 4 гостей, тост і вода', [['Антрі', 'Рол з лосося Гравлакс з авокадо та кропом'], ['Закуска', 'Гребінці з чебрецем і гарбузовим кремом'], ['Перша страва', 'Равіолі з групером у соусі чупін'], ['Основна страва', 'Філе тюрбо в глазурі місо з пюре топінамбура'], ['Десерт', 'Тірамісу з пандоро'], ['Після опівночі', 'Котекіно з сочевицею']], 'Різдво 2026', 'Різдво у Voya Rooftop (25 груд, 100€)?', 'Дивитися Різдво (100€) →'),
  sq: shortVoya('Viti i Ri 2027 Voya Rooftop Milano (Kati 20, 85m): Darkë & DJ 300€', 'Voya Rooftop · Kati 20 · Pamje 360°', 'Festoni Vitin e Ri 2027 në katin 20 (85m) të Voya Rooftop Milano (Viale Achille Papa 30) me restorant, DJ Set dhe pamje 360° të fishekzjarreve me çmimin zyrtar 300€ për person.', 'Restorant & DJ Set · Pamje 360° (20:00 – 05:00)', 'Gala / Elegant', 'Çmimi zyrtar 300€ për person', 'Menuja Zyrtare e Vitit të Ri 2027', '300€ për person', 'Menu me 6 pjata + cotechino me thjerrëza, 1 shishe verë për 4 persona, dolli dhe ujë.', ['Kati 20, 85m', 'Pamje 360°', '300€ · 24/7 WhatsApp +39 351 912 7047'], 'Menuja Zyrtare · Voya 300€', '1 shishe verë për 4 persona, dolli mesnate dhe ujë', [['Entrée', 'Role salmoni Gravlax me avokado'], ['Antipastë', 'Goca deti me pure kungulli'], ['E Parë', 'Ravioli me salcë ciuppin'], ['Kryesore', 'Fileto peshku me miso dhe pure topinambur'], ['Ëmbëlsirë', 'Tiramisù pandoro'], ['Pas mesnate', 'Cotechino me thjerrëza']], 'Krishtlindje 2026', 'Krishtlindje në Voya Rooftop (25 Dhjetor, 100€)?', 'Shiko Krishtlindjet (100€) →'),
  sr: shortVoya('Nova godina 2027. Voya Rooftop Milano (20. sprat, 85m): Večera & DJ 300€', 'Voya Rooftop · 20. sprat · 360° pogled', 'Dočekajte 2027. na 20. spratu (85m) Voya Rooftop Milano (Viale Achille Papa 30) uz restoran, DJ set i 360° pogled na vatromet po zvaničnoj jedinstvenoj ceni od 300€ po osobi.', 'Restoran & DJ set · 360° pogled (20:00 – 05:00)', 'Gala / Elegantno', 'Zvanična cena 300€ po osobi', 'Zvanični novogodišnji meni 2027', '300€ po osobi', '6 sledova + cotechino sa sočivom, 1 flaša vina na 4 gosta, zdravica i voda.', ['20. sprat, 85m', '360° panorama vatrometa', '300€ · 24/7 WhatsApp +39 351 912 7047'], 'Zvanični meni · Voya 300€', '1 boca vina na 4 osobe, ponoćna zdravica i voda', [['Entrée', 'Gravlax rolnica lososa sa avokadom'], ['Predjelo', 'Pečene kapice sa kremom od bundeve'], ['Prvo jelo', 'Ravioli u ciuppin sosu'], ['Glavno jelo', 'File romba u miso glazuri sa pireom od čičoke'], ['Dezert', 'Pandoro tiramisu'], ['Posle ponoći', 'Cotechino sa sočivom']], 'Božić 2026', 'Božić u Voya Rooftop (25. decembar, 100€)?', 'Pogledaj Božić (100€) →'),
  bs: shortVoya('Nova godina 2027. Voya Rooftop Milano (20. sprat, 85m): Večera & DJ 300€', 'Voya Rooftop · 20. sprat · 360° pogled', 'Proslavite 2027. na 20. spratu (85m) Voya Rooftop Milano (Viale Achille Papa 30) uz restoran, DJ set i 360° pogled na vatromet po jedinstvenoj cijeni od 300€ po osobi.', 'Restoran & DJ set · 360° pogled (20:00 – 05:00)', 'Gala / Elegantno', 'Zvanična cijena 300€ po osobi', 'Zvanični novogodišnji meni 2027', '300€ po osobi', '6 sljedova + cotechino s lećom, 1 boca vina na 4 gosta, zdravica i voda.', ['20. sprat, 85m', '360° panorama', '300€ · 24/7 WhatsApp +39 351 912 7047'], 'Zvanični meni · Voya 300€', '1 boca vina na 4 osobe, zdravica i voda', [['Entrée', 'Gravlax rolica lososa s avokadom'], ['Predjelo', 'Pečene jakobove kapice s pireom od bundeve'], ['Prvo jelo', 'Ravioli u ciuppin umaku'], ['Glavno jelo', 'Filet romba s misom i pireom od čičoke'], ['Desert', 'Pandoro tiramisu'], ['Nakon ponoći', 'Cotechino s lećom']], 'Božić 2026', 'Božić u Voya Rooftop (25. dec, 100€)?', 'Pogledaj Božić (100€) →'),
  mk: shortVoya('Нова Година 2027 Voya Rooftop Милано (20-ти кат, 85м): Вечера & DJ 300€', 'Voya Rooftop · 20-ти кат · 360° поглед', 'Прославете ја 2027 на 20-тиот кат (85м) во Voya Rooftop Милано (Viale Achille Papa 30) со ресторан, DJ сет и 360° поглед на огнометот по официјална цена од 300€ по лице.', 'Ресторан & DJ сет · 360° поглед (20:00 – 05:00)', 'Гала / Елегантно', 'Официјална цена 300€ по лице', 'Официјално новогодишно мени 2027', '300€ по лице', '6 јадења + котекино со леќа, 1 шише вино на 4 гости, здравица и вода.', ['20-ти кат, 85м', '360° панорама', '300€ · 24/7 WhatsApp +39 351 912 7047'], 'Официјално мени · Voya 300€', '1 шише вино на 4 лица, полноќна здравица и вода', [['Entrée', 'Ролна од лосос Гравлакс со авокадо'], ['Предјадење', 'Школки со мајчина душица и крем од тиква'], ['Прво', 'Равиоли во сос чупин'], ['Главно', 'Филе од ромб со мисо и пире од топинамбур'], ['Десерт', 'Пандоро тирамису'], ['По полноќ', 'Котекино со леќа']], 'Божиќ 2026', 'Божиќ во Voya Rooftop (25 дек, 100€)?', 'Види Божиќ (100€) →'),
};

function shortVoya(
  title: string,
  subtitleSuffix: string,
  description: string,
  musicAndFormat: string,
  dressCode: string,
  priceSummary: string,
  tierLabel: string,
  tierPrice: string,
  tierDetails: string,
  highlightsTail: [string, string, string],
  menusHeading: string,
  beverages: string,
  courses: [string, string][],
  bannerBadge: string,
  bannerTitle: string,
  bannerCta: string,
): VoyaBasePack {
  return {
    title,
    subtitle: `${subtitleSuffix} · ${VOYA_ADDR}`,
    description,
    musicAndFormat,
    dressCode,
    priceSummary,
    tierLabel,
    tierPrice,
    tierDetails,
    highlights: [`Voya Rooftop (${VOYA_ADDR})`, ...highlightsTail],
    sourceBasis: `${subtitleSuffix} · ${priceSummary} · WhatsApp +39 351 912 7047.`,
    menusHeading,
    menuTitle: menusHeading,
    menuSubtitle: beverages,
    beverages,
    courses,
    bannerBadge,
    bannerTitle,
    bannerDesc: `${bannerTitle} · 100€ · 25/12/2026`,
    bannerCta,
  };
}

export const VOYA_NYE_CONTENT_35: Record<LocaleCode, CapodannoLocalizedEventContent> = Object.fromEntries(
  (Object.keys(VOYA_BASE_35) as LocaleCode[]).map((loc) => [loc, buildVoyaContent(loc, VOYA_BASE_35[loc])]),
) as Record<LocaleCode, CapodannoLocalizedEventContent>;

export function getVoyaNyeContent(locale: string): CapodannoLocalizedEventContent {
  return VOYA_NYE_CONTENT_35[(locale as LocaleCode) in VOYA_NYE_CONTENT_35 ? (locale as LocaleCode) : 'en'];
}
