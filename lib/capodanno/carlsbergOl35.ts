import type { LocaleCode } from '@/lib/i18n/localeRegistry';
import type {
  CapodannoEventTier,
  CapodannoLocalizedEventContent,
  CapodannoMenuCard,
  CapodannoScheduleStep,
} from '@/lib/capodanno/repvblic35';

const CARLSBERG_ADDR = 'Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano';
const CARLSBERG_MENU_IMG = '/images/events/capodanno-2027-menus/carlsberg-ol-nye-2027-menu-cenone-75.webp';

interface CarlsbergPack {
  nyeTitle: string;
  milano: string;
  dec31: string;
  title: string;
  sub: string;
  desc: string;
  music: string;
  dress: string;
  priceSum: string;
  tierLabel: string;
  tierPrice: string;
  tierDesc: string;
  highlights: [string, string, string, string];
  source: string;
  steps: [string, string, string, string];
  menuTitle: string;
  menuBev: string;
  courseLabels: [string, string, string, string, string];
  dishes: [string, string, string, string, string];
  faqs: [
    [string, string],
    [string, string],
    [string, string],
    [string, string],
  ];
  scheduleHeading: string;
  menusHeading: string;
  conditionsHeading: string;
}

const CARLSBERG_35: Record<LocaleCode, CarlsbergPack> = {
  "en": {
    "nyeTitle": "Family NYE 2027",
    "milano": "Milan",
    "dec31": "Thursday, December 31, 2026",
    "title": "Carlsberg Øl Milan Family NYE 2027 · Seated Dinner & Sing-Along Show (€75)",
    "sub": "Carlsberg Øl Milan · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Single €75 Rate · Family-Friendly",
    "desc": "Welcome 2027 with the whole family beneath the spacious historic brick vaults of Carlsberg Øl Milan at Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como, a 5-minute walk from M2 Moscova and M2/M5 Porta Garibaldi). Your table stays reserved all evening for the official €75 per person four-course New Year's Eve dinner, paired with a joyful live Italian Cena Cantata sing-along show that parents, grandparents, children, and teens can enjoy together. The verified €75 rate includes mineral water, espresso, 1 bottle of Vino Nobile di Montepulciano or Vermentino di Gallura per 4 adults, midnight prosecco toast, traditional cotechino with lentils, and a DJ set until 03:00. Message us on WhatsApp at +39 351 912 7047 to arrange comfortable family tables, high chairs, and simple kitchen course adjustments for kids and teens.",
    "music": "Joyful Live Italian Sing-Along Dinner (Cena Cantata) for All Ages · Midnight Countdown & DJ Set until 03:00",
    "dress": "Smart Festive Evening Attire for Adults, Teens & Kids",
    "priceSum": "Official single €75 per person rate · Seated Family Dinner + Wine (1 bottle / 4 adults) + Sing-Along Show + DJ Set",
    "tierLabel": "Family & Group Seated NYE Dinner + Sing-Along Show + DJ Set (from 20:30)",
    "tierPrice": "€75 per person",
    "tierDesc": "Reserved table all night with a full four-course served dinner (seafood and land starter trio, Carnaroli risotto with porcini mushrooms and saffron pistils, lava-stone beef ribeye with baby potatoes, pandoro tiramisù with chocolate drops), mineral water, coffee, 1 bottle of Vino Nobile di Montepulciano or Vermentino di Gallura per 4 adults, midnight prosecco toast with cotechino and lentils, and DJ set. Family seating layouts, high chairs, and simple kids' kitchen variations arranged via WhatsApp +39 351 912 7047.",
    "highlights": [
      "Welcoming New Year's Eve for families, children, and teens at Bastioni di Porta Nuova 9 with your table kept all night",
      "Verified official single €75 per person rate covering 4 served courses, water, coffee, and midnight lentils",
      "Includes 1 bottle of Montepulciano red or Vermentino white wine per 4 adults plus midnight prosecco toast",
      "Direct support on WhatsApp +39 351 912 7047 for family group tables, high chairs, and simple kids' dish adjustments"
    ],
    "source": "Confirmed official Carlsberg Øl Milan Family NYE 2027 menu and rate card (Bastioni di Porta Nuova 9, Dec 31, 2026, 20:30–03:00): single €75 per person seated dinner with family-friendly Cena Cantata and DJ set, 1 wine bottle per 4 adults, water, coffee, midnight prosecco and lentils. Family tables, high chairs, and kids' kitchen options via WhatsApp +39 351 912 7047.",
    "steps": [
      "20:30 Doors open at Bastioni di Porta Nuova 9 and comfortable seating at your reserved family table",
      "21:00 Four-course served New Year's Eve dinner with live joyful Cena Cantata music for all generations",
      "00:00 Family midnight countdown, prosecco toast for adults, and traditional cotechino with lentils",
      "00:30 – 03:00 Festive New Year's Eve DJ set while keeping your reserved table as a comfortable base"
    ],
    "menuTitle": "Official Family NYE 2027 Dinner Menu · Sing-Along & DJ Set (€75)",
    "menuBev": "Included in the €75 rate: mineral water, coffee, 1 bottle of Vino Nobile di Montepulciano or Vermentino di Gallura per 4 adults, plus a midnight prosecco flute for adults with cotechino and lentils. Simple kitchen course variations for children, teens, or dietary needs available via WhatsApp +39 351 912 7047.",
    "courseLabels": [
      "Starter",
      "First Course",
      "Main Course",
      "Dessert",
      "Midnight Tradition"
    ],
    "dishes": [
      "Venetian-style gratinated scallops, Patanegra potato croquettes on skewers, and Parmigiano basket with puntarelle, burrata, and Cantabrian anchovies",
      "Carnaroli risotto with porcini mushrooms and whole saffron pistils",
      "Lava-stone beef ribeye with chimichurri sauce and roasted baby potatoes",
      "Holiday pandoro tiramisù with dark chocolate drops",
      "Traditional midnight cotechino sausage with lucky lentils and a prosecco toast"
    ],
    "faqs": [
      [
        "Why is Carlsberg Øl Milan a great choice for families on New Year's Eve?",
        "The spacious vaulted dining halls let parents, children, and teens keep their own comfortable table all evening, pairing a proper seated Italian dinner with a cheerful sing-along atmosphere before the midnight toast."
      ],
      [
        "What is the official price, and can you arrange high chairs or simpler dishes for kids?",
        "The venue's official verified rate is a single €75 per person ticket. When you message us on WhatsApp at +39 351 912 7047, we arrange roomy family table layouts, high chairs, and simple kitchen adjustments on courses for children, teens, or allergies."
      ],
      [
        "What is included in the €75 per person ticket?",
        "It includes your reserved table from 20:30, four served courses, mineral water, coffee, 1 bottle of Montepulciano or Vermentino wine per 4 adults, midnight prosecco and lentils, the live Cena Cantata show, and the DJ set until 03:00."
      ],
      [
        "How easy is it to reach with kids or strollers, and how do we book?",
        "Carlsberg Øl is at Bastioni di Porta Nuova 9 next to Piazza XXV Aprile and Corso Como, 5 minutes on foot from M2 Moscova, M2/M5 Porta Garibaldi, and nearby garages. Write to WhatsApp +39 351 912 7047 to reserve."
      ]
    ],
    "scheduleHeading": "Family NYE 2027 Evening Schedule",
    "menusHeading": "Official €75 Dinner Menu (Wine Included)",
    "conditionsHeading": "Family Comfort, Inclusions & Porta Nuova Access"
  },
  "it": {
    "nyeTitle": "Capodanno 2027",
    "milano": "Milano",
    "dec31": "Giovedì 31 Dicembre 2026",
    "title": "Capodanno 2027 per Famiglie da Carlsberg Øl Milano · Cenone e Cena Cantata (75 €)",
    "sub": "Carlsberg Øl Milano · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Tariffa unica 75 € · Ideale per famiglie",
    "desc": "Festeggia il 31 dicembre 2026 con tutta la famiglia da Carlsberg Øl Milano, nelle ampie sale storiche con volte in mattoni dei Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como, a 5 minuti a piedi da M2 Moscova e M2/M5 Porta Garibaldi). Il tavolo resta riservato per l'intera serata con il Gran Cenone servito a tariffa unica verificata di 75 € a persona, accompagnato da una Cena Cantata allegra e adatta a genitori, nonni, bambini e ragazzi, vino incluso (1 bottiglia di Vino Nobile di Montepulciano o Vermentino di Gallura ogni 4 adulti), acqua, caffè, brindisi di mezzanotte con prosecco, cotechino con lenticchie e DJ set fino alle 03:00. Scrivici su WhatsApp al +39 351 912 7047 per organizzare tavolate famiglia comode, seggioloni e variazioni semplici in cucina per bambini e ragazzi.",
    "music": "Cena Cantata dal vivo allegra per grandi, bambini e ragazzi · Countdown di mezzanotte e DJ Set fino alle 03:00",
    "dress": "Elegante comodo di San Silvestro per adulti, ragazzi e bambini",
    "priceSum": "Tariffa unica ufficiale 75 € a persona · Cenone servito + Vino (1 ogni 4 adulti) + Cena Cantata per famiglie + DJ Set",
    "tierLabel": "Cenone Servito per Famiglie e Gruppi + Cena Cantata + DJ Set (dalle 20:30)",
    "tierPrice": "75 € a persona",
    "tierDesc": "Tavolo riservato tutta la sera con menù completo servito di quattro portate (antipasto di mare e terra, risotto Carnaroli ai porcini e zafferano, ribeye di manzo alla pietra lavica con patate novelle, tiramisù al pandoro con gocce di cioccolato), acque minerali, caffè, 1 bottiglia di Vino Nobile di Montepulciano o Vermentino di Gallura ogni 4 adulti, cotechino con lenticchie, flûte di prosecco a mezzanotte e DJ set. Tavolate famiglia, seggioloni e variazioni cucina semplici per bambini e ragazzi concordabili su WhatsApp +39 351 912 7047.",
    "highlights": [
      "Capodanno accogliente per famiglie, bambini e ragazzi nei Bastioni di Porta Nuova 9 con tavolo riservato tutta la notte",
      "Tariffa unica ufficiale verificata di 75 € a persona con 4 portate servite, acqua, caffè e cotechino con lenticchie",
      "Vino Nobile di Montepulciano o Vermentino di Gallura incluso (1 bottiglia ogni 4 adulti) e flûte di prosecco a mezzanotte",
      "Assistenza su WhatsApp +39 351 912 7047 per disporre tavolate famiglia, seggioloni e variazioni cucina per i più piccoli"
    ],
    "source": "Menù e listino ufficiali confermati Carlsberg Øl Milano (Bastioni di Porta Nuova 9, 31 dicembre 2026 ore 20:30–03:00): Cenone servito per famiglie e gruppi + Cena Cantata e DJ Set a tariffa unica verificata di 75 € a persona con vino 1 bottiglia ogni 4 adulti, acqua, caffè, cotechino con lenticchie e prosecco di mezzanotte. Tavolate famiglia, seggioloni e variazioni cucina bimbi su WhatsApp +39 351 912 7047.",
    "steps": [
      "20:30 Apertura ingressi nei Bastioni di Porta Nuova 9 e sistemazione comoda ai tavoli riservati per famiglie e gruppi",
      "21:00 Cenone servito di San Silvestro accompagnato dalla Cena Cantata dal vivo per grandi e ragazzi",
      "00:00 Conto alla rovescia di mezzanotte in famiglia, brindisi con prosecco e cotechino con lenticchie",
      "00:30 – 03:00 Musica e DJ set di Capodanno con il proprio tavolo sempre a disposizione"
    ],
    "menuTitle": "Menù Ufficiale Cenone di Capodanno · Famiglie e Cena Cantata (75 €)",
    "menuBev": "Inclusi nella tariffa di 75 €: acque minerali, caffè, 1 bottiglia ogni 4 adulti di Vino Nobile di Montepulciano o Vermentino di Gallura e flûte di prosecco per il brindisi degli adulti a mezzanotte con cotechino e lenticchie. Variazioni semplici in cucina per bambini, ragazzi o intolleranze su richiesta via WhatsApp +39 351 912 7047.",
    "courseLabels": [
      "Antipasto",
      "Primo Piatto",
      "Secondo e Contorno",
      "Dolce",
      "Tradizione di Mezzanotte"
    ],
    "dishes": [
      "Capesante gratinate alla veneziana, crocchette di patate al Patanegra su stecco e cestino di Parmigiano con puntarelle, burrata e acciughe del Cantabrico",
      "Risotto Carnaroli con funghi porcini e zafferano con i suoi pistilli",
      "Ribeye di manzo alla pietra lavica con salsa chimichurri e patate novelle al forno",
      "Tiramisù al pandoro con gocce di cioccolato fondente",
      "Cotechino della tradizione con lenticchie di buon augurio e flûte di prosecco per il brindisi"
    ],
    "faqs": [
      [
        "Perché il Capodanno da Carlsberg Øl Milano è adatto alle famiglie con bambini e ragazzi?",
        "Le sale spaziose dei Bastioni di Porta Nuova permettono di restare seduti comodamente al proprio tavolo per tutta la serata, unendo il cenone servito a una Cena Cantata festosa e mai eccessiva, apprezzata sia dai genitori sia dai figli."
      ],
      [
        "Qual è la tariffa ufficiale e come gestite bambini, seggioloni e variazioni sul menù?",
        "Il listino ufficiale verificato prevede la tariffa unica di 75 € a persona. Scrivendo prima su WhatsApp al +39 351 912 7047 predisponiamo tavolate famiglia vicine, eventuali seggioloni e variazioni semplici in cucina sulle portate per bambini, ragazzi o allergie."
      ],
      [
        "Cosa comprende nel dettaglio la quota di 75 € a persona?",
        "Comprende il tavolo riservato dalle 20:30, le quattro portate servite, acque minerali, caffè, 1 bottiglia di Montepulciano o Vermentino ogni 4 adulti, cotechino con lenticchie, brindisi di mezzanotte, Cena Cantata dal vivo e DJ set fino alle 03:00."
      ],
      [
        "Come si arriva comodamente con la famiglia e dove si prenota?",
        "Il locale è in Bastioni di Porta Nuova 9 (angolo Piazza XXV Aprile / Corso Como), a 5 minuti a piedi da M2 Moscova, M2/M5 Porta Garibaldi e parcheggi di Porta Nuova. Prenotazioni dirette su WhatsApp +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Programma Orario Capodanno 2027 per Famiglie",
    "menusHeading": "Menù Ufficiale Cenone 75 € (Vino Incluso)",
    "conditionsHeading": "Accoglienza Famiglie, Inclusioni e Logistica Porta Nuova"
  },
  "es": {
    "nyeTitle": "Nochevieja Familiar 2027",
    "milano": "Milán",
    "dec31": "Jueves 31 de diciembre de 2026",
    "title": "Nochevieja 2027 para Familias en Carlsberg Øl Milán · Cena Cantada y DJ (75 €)",
    "sub": "Carlsberg Øl Milán · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Tarifa única 75 € · Ideal para familias",
    "desc": "Despide el 31 de diciembre de 2026 en familia en los amplios salones abovedados de ladrillo visto de Carlsberg Øl Milán, en Bastioni di Porta Nuova 9 (zona Porta Nuova / Corso Como, a 5 minutos a pie del metro M2 Moscova y M2/M5 Porta Garibaldi). La mesa permanece reservada durante toda la velada con la tarifa oficial verificada de 75 € por persona: cena servida de cuatro platos, alegre Cena Cantada en directo pensada para que disfruten padres, niños y adolescentes, agua mineral, café, 1 botella de vino Montepulciano o Vermentino cada 4 adultos, brindis de medianoche con prosecco, lentejas tradicionales con cotechino y sesión de DJ hasta las 03:00. Escríbenos por WhatsApp al +39 351 912 7047 para organizar mesas familiares amplias, tronas y adaptaciones sencillas de cocina para niños y jóvenes.",
    "music": "Cena Cantada italiana en directo alegre para adultos, niños y jóvenes · Campanadas y DJ Set hasta las 03:00",
    "dress": "Elegante cómodo de Nochevieja para adultos, jóvenes y niños",
    "priceSum": "Tarifa única oficial 75 € por persona · Cena servida + Vino (1 cada 4 adultos) + Cena Cantada familiar + DJ Set",
    "tierLabel": "Cena de Nochevieja para Familias y Grupos + Cena Cantada + DJ Set (desde las 20:30)",
    "tierPrice": "75 € por persona",
    "tierDesc": "Mesa reservada toda la noche con menú completo servido de cuatro pases (entrante triple de mar y tierra, risotto Carnaroli con boletus y azafrán en hebras, lomo alto ribeye a la piedra volcánica con patatas nuevas, tiramisú de pandoro con pepitas de chocolate), agua mineral, café, 1 botella de Vino Nobile di Montepulciano o Vermentino di Gallura cada 4 adultos, cotechino con lentejas, copa de prosecco a medianoche y DJ set. Mesas familiares, tronas y variaciones sencillas de cocina para niños por WhatsApp +39 351 912 7047.",
    "highlights": [
      "Nochevieja cómoda y acogedora para familias con niños y adolescentes en Bastioni di Porta Nuova 9 con mesa toda la noche",
      "Tarifa oficial única verificada de 75 € por persona con 4 platos servidos, agua, café y lentejas de medianoche",
      "Incluye 1 botella de vino Montepulciano o Vermentino cada 4 adultos y brindis con prosecco a medianoche",
      "Atención directa en WhatsApp +39 351 912 7047 para preparar mesas familiares, tronas y platos sencillos para niños"
    ],
    "source": "Menú y tarifa oficial confirmados de Carlsberg Øl Milán (Bastioni di Porta Nuova 9, 31 de diciembre de 2026, 20:30–03:00): cena servida familiar con Cena Cantada y DJ set por tarifa única de 75 € por persona, 1 botella de vino cada 4 adultos, agua, café, prosecco y lentejas. Mesas familiares, tronas y opciones infantiles en cocina por WhatsApp +39 351 912 7047.",
    "steps": [
      "20:30 Apertura de puertas en Bastioni di Porta Nuova 9 y acomodación tranquila en las mesas familiares reservadas",
      "21:00 Cena servida de cuatro platos acompañada por la música en directo de la Cena Cantada",
      "00:00 Cuenta atrás de medianoche en familia, brindis con prosecco y tradicional cotechino con lentejas",
      "00:30 – 03:00 Fiesta de Año Nuevo con DJ set conservando vuestra mesa durante toda la noche"
    ],
    "menuTitle": "Menú Oficial de Nochevieja 2027 · Familias y Cena Cantada (75 €)",
    "menuBev": "Incluido en los 75 €: agua mineral, café, 1 botella de Vino Nobile di Montepulciano o Vermentino di Gallura cada 4 adultos y copa de prosecco para el brindis adulto de medianoche con cotechino y lentejas. Adaptaciones sencillas de cocina para niños, adolescentes o alergias previa solicitud en WhatsApp +39 351 912 7047.",
    "courseLabels": [
      "Entrante",
      "Primer Plato",
      "Plato Principal",
      "Postre",
      "Tradición de Medianoche"
    ],
    "dishes": [
      "Vieiras gratinadas a la veneciana, croquetas de patata y jamón Patanegra en brocheta y cestita de Parmigiano con puntarelle, burrata y anchoas del Cantábrico",
      "Risotto Carnaroli con setas porcini y pistilos de azafrán",
      "Ribeye de ternera a la piedra volcánica con salsa chimichurri y patatas nuevas asadas",
      "Tiramisú de pandoro navideño con gotas de chocolate negro",
      "Cotechino tradicional con lentejas de la suerte y copa de prosecco para brindar"
    ],
    "faqs": [
      [
        "¿Por qué Carlsberg Øl Milán es buena opción para pasar la Nochevieja con niños y adolescentes?",
        "Sus salones amplios permiten que toda la familia conserve su propia mesa cómoda durante toda la noche, combinando una cena servida completa con música italiana alegre y participativa apta para todas las edades."
      ],
      [
        "¿Cuál es el precio oficial y cómo se gestionan tronas o platos adaptados para niños?",
        "La tarifa oficial verificada del local es única de 75 € por persona. Escribiéndonos al reservar por WhatsApp al +39 351 912 7047 preparamos mesas familiares amplias, tronas y variaciones sencillas en cocina para niños, adolescentes o intolerancias."
      ],
      [
        "¿Qué incluye exactamente la entrada de 75 € por persona?",
        "Incluye mesa reservada desde las 20:30, menú servido de cuatro pases, agua, café, 1 botella de vino Montepulciano o Vermentino cada 4 adultos, lentejas y prosecco a medianoche, espectáculo Cena Cantada y DJ set hasta las 03:00."
      ],
      [
        "¿Cómo llegar fácilmente en familia y cómo reservar mesa?",
        "El restaurante está en Bastioni di Porta Nuova 9 (junto a Piazza XXV Aprile y Corso Como), a 5 minutos a pie de M2 Moscova, M2/M5 Porta Garibaldi y aparcamientos cercanos. Reserva oficial por WhatsApp +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Horario de Nochevieja 2027 para Familias",
    "menusHeading": "Menú Oficial de 75 € (Vino Incluido)",
    "conditionsHeading": "Comodidad Familiar, Qué Incluye y Acceso a Porta Nuova"
  },
  "fr": {
    "nyeTitle": "Réveillon en Famille 2027",
    "milano": "Milan",
    "dec31": "Jeudi 31 décembre 2026",
    "title": "Réveillon 2027 en Famille chez Carlsberg Øl Milan · Dîner Chantant et DJ (75 €)",
    "sub": "Carlsberg Øl Milan · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20h30 – 03h00 · Tarif unique 75 € · Idéal en famille",
    "desc": "Fêtez le passage en 2027 avec toute votre famille sous les grandes voûtes historiques en briques de Carlsberg Øl Milan, au Bastioni di Porta Nuova 9 (quartier Porta Nuova / Corso Como, à 5 minutes à pied des métros M2 Moscova et M2/M5 Porta Garibaldi). Votre table reste réservée toute la soirée au tarif officiel vérifié de 75 € par personne : dîner servi en quatre plats, ambiance joyeuse de Cena Cantata en live appréciée des parents comme des enfants et adolescents, eau minérale, café, 1 bouteille de Vino Nobile di Montepulciano ou Vermentino di Gallura pour 4 adultes, coupe de prosecco à minuit, cotechino aux lentilles porte-bonheur et DJ set jusqu'à 03h00. Écrivez-nous sur WhatsApp au +39 351 912 7047 pour organiser de belles tablées familiales, des chaises hautes et des adaptations simples en cuisine pour les plus jeunes.",
    "music": "Cena Cantata italienne live conviviale pour parents, enfants et ados · Décompte de minuit et DJ Set jusqu'à 03h00",
    "dress": "Tenue de fête élégante et confortable pour adultes et enfants",
    "priceSum": "Tarif unique officiel 75 € par personne · Dîner servi + Vin (1 bouteille / 4 adultes) + Cena Cantata familiale + DJ Set",
    "tierLabel": "Dîner du Réveillon en Famille + Cena Cantata + DJ Set (dès 20h30)",
    "tierPrice": "75 € par personne",
    "tierDesc": "Table réservée toute la soirée avec menu servi complet en quatre temps (trio d'entrées terre et mer, risotto Carnaroli aux cèpes et pistils de safran, entrecôte ribeye sur pierre de lave et pommes de terre nouvelles, tiramisù au pandoro et pépites de chocolat), eaux minérales, café, 1 bouteille de Montepulciano ou Vermentino pour 4 adultes, coupe de prosecco et lentilles à minuit, puis DJ set. Tablées familiales, chaises hautes et variantes simples en cuisine pour enfants via WhatsApp +39 351 912 7047.",
    "highlights": [
      "Réveillon chaleureux pour familles, enfants et adolescents au Bastioni di Porta Nuova 9 avec table gardée toute la nuit",
      "Tarif unique officiel vérifié de 75 € par personne comprenant 4 plats servis à table, eau, café et lentilles de minuit",
      "1 bouteille de vin Montepulciano ou Vermentino incluse pour 4 adultes ainsi que la coupe de prosecco à minuit",
      "Coordination directe sur WhatsApp +39 351 912 7047 pour grandes tables familiales, chaises hautes et plats adaptés aux enfants"
    ],
    "source": "Menu et tarif officiels confirmés Carlsberg Øl Milan (Bastioni di Porta Nuova 9, 31 décembre 2026 de 20h30 à 03h00) : dîner servi familial avec Cena Cantata et DJ set au tarif unique de 75 € par personne, 1 bouteille de vin pour 4 adultes, eau, café, prosecco et lentilles. Tablées familiales, chaises hautes et adaptations enfants sur WhatsApp +39 351 912 7047.",
    "steps": [
      "20:30 Accueil au Bastioni di Porta Nuova 9 et installation confortable aux tables familiales réservées",
      "21:00 Dîner de la Saint-Sylvestre servi à table au rythme convivial de la Cena Cantata en direct",
      "00:00 Décompte de minuit en famille, toast au prosecco pour les adultes et cotechino aux lentilles",
      "00:30 – 03:00 Soirée dansante avec DJ set tout en conservant votre table pour la famille"
    ],
    "menuTitle": "Menu Officiel Réveillon 2027 · Familles et Cena Cantata (75 €)",
    "menuBev": "Inclus dans le tarif de 75 € : eaux minérales, café, 1 bouteille de Vino Nobile di Montepulciano ou Vermentino di Gallura pour 4 adultes et coupe de prosecco à minuit avec cotechino et lentilles. Adaptations simples en cuisine pour enfants, adolescents ou régimes particuliers sur demande via WhatsApp +39 351 912 7047.",
    "courseLabels": [
      "Entrée",
      "Premier Plat",
      "Plat Principal",
      "Dessert",
      "Tradition de Minuit"
    ],
    "dishes": [
      "Noix de Saint-Jacques gratinées à la vénitienne, croquettes de pomme de terre au jambon Patanegra et panier de Parmigiano aux puntarelle, burrata et anchois de Cantabrie",
      "Risotto Carnaroli aux cèpes et pistils entiers de safran",
      "Ribeye de bœuf cuit sur pierre de lave, sauce chimichurri et pommes de terre nouvelles rôties",
      "Tiramisù au pandoro de Noël et éclats de chocolat noir",
      "Cotechino traditionnel aux lentilles du Nouvel An et coupe de prosecco pour le toast"
    ],
    "faqs": [
      [
        "Pourquoi Carlsberg Øl Milan convient-il particulièrement aux familles le soir du 31 décembre ?",
        "Les vastes salles voûtées offrent de l'espace et une vraie table réservée du début à la fin de la soirée, associant un repas servi de qualité à une ambiance chantante festive où parents, enfants et ados se sentent à l'aise."
      ],
      [
        "Quel est le tarif officiel et peut-on demander des chaises hautes ou des plats plus simples pour les enfants ?",
        "Le tarif officiel vérifié est unique à 75 € par personne. En nous écrivant sur WhatsApp au +39 351 912 7047 lors de la réservation, nous prévoyons des tables familiales confortables, des chaises hautes et des variantes simples en cuisine pour les jeunes ou les allergies."
      ],
      [
        "Que comprend exactement la formule à 75 € par personne ?",
        "Elle comprend votre table réservée dès 20h30, les quatre plats servis, l'eau, le café, 1 bouteille de vin Montepulciano ou Vermentino pour 4 adultes, le toast et les lentilles de minuit, la Cena Cantata live et le DJ set jusqu'à 03h00."
      ],
      [
        "Comment venir facilement en famille et réserver sa table ?",
        "L'établissement se situe Bastioni di Porta Nuova 9, tout près de Piazza XXV Aprile et Corso Como, à 5 minutes à pied des métros M2 Moscova et M2/M5 Porta Garibaldi. Réservation directe sur WhatsApp au +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Programme de la Soirée Familles 2027",
    "menusHeading": "Menu Officiel à 75 € (Vin Inclus)",
    "conditionsHeading": "Accueil des Familles, Prestations et Accès Porta Nuova"
  },
  "de": {
    "nyeTitle": "Familiensilvester 2027",
    "milano": "Mailand",
    "dec31": "Donnerstag, 31. Dezember 2026",
    "title": "Silvester 2027 für Familien im Carlsberg Øl Mailand · Menü, Cena Cantata & DJ (75 €)",
    "sub": "Carlsberg Øl Mailand · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Einheitspreis 75 € · Familienfreundlich",
    "desc": "Feiern Sie den 31. Dezember 2026 gemeinsam mit der ganzen Familie unter den weitläufigen historischen Backsteingewölben des Carlsberg Øl Mailand in den Bastioni di Porta Nuova 9 (Viertel Porta Nuova / Corso Como, 5 Gehminuten von M2 Moscova und M2/M5 Porta Garibaldi). Ihr Tisch bleibt den ganzen Abend für Sie reserviert: Zum offiziell bestätigten Einheitspreis von 75 € pro Person erwarten Sie ein serviertes Vier-Gänge-Silvestermenü, eine fröhliche italienische Cena Cantata mit Live-Musik für Eltern, Kinder und Jugendliche, Mineralwasser, Kaffee, 1 Flasche Vino Nobile di Montepulciano oder Vermentino di Gallura je 4 Erwachsene, Prosecco-Anstoß und Linsen mit Cotechino um Mitternacht sowie ein DJ-Set bis 03:00 Uhr. Schreiben Sie uns per WhatsApp unter +39 351 912 7047 für gemütliche Familientafeln, Kinderhochstühle und unkomplizierte Küchenvariationen für Kinder und Teenager.",
    "music": "Fröhliche italienische Live-Cena-Cantata für Eltern, Kinder & Jugendliche · Mitternachts-Countdown & DJ-Set bis 03:00",
    "dress": "Festlich-bequeme Abendgarderobe für Erwachsene, Jugendliche und Kinder",
    "priceSum": "Offizieller Einheitspreis 75 € pro Person · Serviertes Menü + Wein (1 Fl. / 4 Erw.) + Familien-Cena-Cantata + DJ-Set",
    "tierLabel": "Serviertes Silvestermenü für Familien & Gruppen + Cena Cantata + DJ-Set (ab 20:30)",
    "tierPrice": "75 € pro Person",
    "tierDesc": "Fester Sitzplatz am reservierten Tisch für den gesamten Abend mit serviertem Vier-Gänge-Menü (dreiteilige Vorspeise, Carnaroli-Risotto mit Steinpilzen und Safranfäden, Rinder-Ribeye vom Lavastein mit jungen Kartoffeln, Pandoro-Tiramisù mit Schokotropfen), Wasser, Kaffee, 1 Flasche Montepulciano- oder Vermentino-Wein je 4 Erwachsene, Mitternachts-Prosecco mit Cotechino und Linsen sowie DJ-Set. Familientische, Hochstühle und einfache Kinder-Anpassungen in der Küche über WhatsApp +39 351 912 7047.",
    "highlights": [
      "Herzliches, entspanntes Silvester für Familien mit Kindern und Teenagern in den Bastioni di Porta Nuova 9 mit eigenem Tisch",
      "Bestätigter offizieller Einheitspreis von 75 € pro Person inklusive 4 servierter Gänge, Wasser, Kaffee und Mitternachtslinsen",
      "1 Flasche Vino Nobile di Montepulciano oder Vermentino di Gallura je 4 Erwachsene sowie Prosecco um Mitternacht inklusive",
      "Persönliche Abstimmung über WhatsApp +39 351 912 7047 für große Familientische, Hochstühle und kindgerechte Gang-Varianten"
    ],
    "source": "Offiziell bestätigte Speise- und Preiskarte Carlsberg Øl Mailand (Bastioni di Porta Nuova 9, 31. Dezember 2026, 20:30–03:00): serviertes Familiensilvester mit Cena Cantata und DJ-Set zum Einheitspreis von 75 € pro Person inklusive 1 Flasche Wein je 4 Erwachsene, Wasser, Kaffee, Prosecco und Linsen. Familientafeln, Hochstühle und Kinderwünsche per WhatsApp +39 351 912 7047.",
    "steps": [
      "20:30 Einlass in den Bastioni di Porta Nuova 9 und entspanntes Platznehmen an den reservierten Familientischen",
      "21:00 Serviertes Vier-Gänge-Silvestermenü begleitet von fröhlicher italienischer Live-Cena-Cantata",
      "00:00 Gemeinsamer Familien-Countdown, Prosecco-Anstoß für Erwachsene und traditioneller Cotechino mit Linsen",
      "00:30 – 03:00 Neujahrsfeier mit DJ-Set, während Ihr Tisch als ruhiger Rückzugsort erhalten bleibt"
    ],
    "menuTitle": "Offizielles Familiensilvester-Menü 2027 · Cena Cantata & DJ-Set (75 €)",
    "menuBev": "Im Preis von 75 € enthalten: Mineralwasser, Kaffee, 1 Flasche Vino Nobile di Montepulciano oder Vermentino di Gallura je 4 Erwachsene sowie ein Glas Prosecco für Erwachsene um Mitternacht zu Cotechino und Linsen. Einfache Küchenvariationen für Kinder, Jugendliche oder Allergiker nach Absprache über WhatsApp +39 351 912 7047.",
    "courseLabels": [
      "Vorspeise",
      "Erster Gang",
      "Hauptgang",
      "Dessert",
      "Mitternachtstradition"
    ],
    "dishes": [
      "Nach venezianischer Art gratinierte Jakobsmuscheln, Patanegra-Kartoffelkroketten am Spieß sowie Parmigiano-Körbchen mit Puntarelle, Burrata und kantabrischen Sardellen",
      "Carnaroli-Risotto mit Steinpilzen und echten Safranfäden",
      "Auf Lavastein gegrilltes Rinder-Ribeye mit Chimichurri-Sauce und jungen Ofenkartoffeln",
      "Weihnachtliches Pandoro-Tiramisù mit Zartbitterschokoladentropfen",
      "Traditioneller Cotechino mit Glückslinsen und Prosecco-Flûte zum Neujahrsgruß"
    ],
    "faqs": [
      [
        "Warum eignet sich das Carlsberg Øl Mailand besonders gut für Familien an Silvester?",
        "Die großzügigen Gewölbesäle bieten viel Platz am eigenen Tisch für den gesamten Abend und verbinden ein ruhiges, serviertes Essen mit fröhlicher italienischer Live-Musik, bei der sich Eltern wie Kinder wohlfühlen."
      ],
      [
        "Wie lautet der offizielle Preis und gibt es Hochstühle oder einfachere Gerichte für Kinder?",
        "Es gilt der offiziell bestätigte Einheitstarif von 75 € pro Person. Über WhatsApp +39 351 912 7047 richten wir vorab passende Familientafeln, Kinderhochstühle sowie einfache Abwandlungen einzelner Gänge für Kinder, Teenager oder Allergien ein."
      ],
      [
        "Was ist im Ticketpreis von 75 € pro Person alles inbegriffen?",
        "Inbegriffen sind der reservierte Tisch ab 20:30 Uhr, vier servierte Gänge, Wasser, Kaffee, 1 Flasche Montepulciano- oder Vermentino-Wein je 4 Erwachsene, Mitternachts-Prosecco und Linsen, die Live-Cena-Cantata und das DJ-Set bis 03:00 Uhr."
      ],
      [
        "Wie erreicht man das Lokal bequem mit Kindern und wie reserviert man?",
        "Das Restaurant liegt in den Bastioni di Porta Nuova 9 direkt an der Piazza XXV Aprile / Corso Como, 5 Gehminuten von M2 Moscova, M2/M5 Porta Garibaldi und Parkhäusern entfernt. Reservierung über WhatsApp +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Zeitplan Familiensilvester 2027",
    "menusHeading": "Offizielles 75-€-Menü (Wein inklusive)",
    "conditionsHeading": "Familienservice, Leistungen & Anfahrt Porta Nuova"
  },
  "pt": {
    "nyeTitle": "Réveillon em Família 2027",
    "milano": "Milão",
    "dec31": "Quinta-feira, 31 de dezembro de 2026",
    "title": "Réveillon 2027 para Famílias no Carlsberg Øl Milão · Ceia Cantada e DJ (75 €)",
    "sub": "Carlsberg Øl Milão · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Tarifa única 75 € · Ideal para famílias",
    "desc": "Comemore a virada para 2027 com toda a família nos amplos salões históricos em abóbadas de tijolos do Carlsberg Øl Milão, em Bastioni di Porta Nuova 9 (região de Porta Nuova / Corso Como, a 5 minutos a pé das estações M2 Moscova e M2/M5 Porta Garibaldi). A mesa fica reservada a noite inteira pela tarifa oficial verificada de 75 € por pessoa, reunindo ceia servida em quatro etapas, Cena Cantata ao vivo alegre e acolhedora para pais, avós, crianças e adolescentes, água mineral, café, 1 garrafa de vinho Vino Nobile di Montepulciano ou Vermentino di Gallura a cada 4 adultos, brinde de meia-noite com prosecco, lentilhas com cotechino e DJ set até as 03:00. Chame no WhatsApp +39 351 912 7047 para organizar mesas familiares espaçosas, cadeirões infantis e adaptações simples na cozinha para crianças e jovens.",
    "music": "Cena Cantata italiana ao vivo para pais, crianças e jovens · Contagem regressiva e DJ Set até 03:00",
    "dress": "Traje festivo confortável de Ano-Novo para adultos e crianças",
    "priceSum": "Tarifa oficial única 75 € por pessoa · Ceia servida + Vinho (1 garrafa / 4 adultos) + Cena Cantata familiar + DJ Set",
    "tierLabel": "Ceia Servida para Famílias e Grupos + Cena Cantata + DJ Set (a partir das 20:30)",
    "tierPrice": "75 € por pessoa",
    "tierDesc": "Mesa reservada durante toda a noite com menu completo servido em quatro pratos (trio de entradas mar e terra, risoto Carnaroli com cogumelos porcini e pistilos de açafrão, ribeye bovino na pedra vulcânica com batatas novas, tiramisù de pandoro com gotas de chocolate), água, café, 1 garrafa de Montepulciano ou Vermentino a cada 4 adultos, prosecco e lentilhas à meia-noite e DJ set. Mesas para famílias, cadeirões e variações simples na cozinha para crianças pelo WhatsApp +39 351 912 7047.",
    "highlights": [
      "Virada de ano acolhedora para famílias com crianças e adolescentes em Bastioni di Porta Nuova 9 com mesa a noite toda",
      "Tarifa oficial única verificada de 75 € por pessoa com 4 pratos servidos, água, café e lentilhas da meia-noite",
      "Inclui 1 garrafa de vinho Montepulciano ou Vermentino a cada 4 adultos e taça de prosecco no brinde da virada",
      "Atendimento pelo WhatsApp +39 351 912 7047 para preparar mesas familiares, cadeirões e ajustes simples nos pratos infantis"
    ],
    "source": "Cardápio e tarifa oficiais confirmados do Carlsberg Øl Milão (Bastioni di Porta Nuova 9, 31 de dezembro de 2026, 20:30–03:00): ceia servida para famílias com Cena Cantata e DJ set por tarifa única de 75 € por pessoa, 1 garrafa de vinho a cada 4 adultos, água, café, prosecco e lentilhas. Mesas familiares, cadeirões e opções infantis na cozinha via WhatsApp +39 351 912 7047.",
    "steps": [
      "20:30 Abertura da casa em Bastioni di Porta Nuova 9 e acomodação tranquila nas mesas familiares reservadas",
      "21:00 Ceia servida de quatro etapas acompanhada pelo clima musical alegre da Cena Cantata ao vivo",
      "00:00 Contagem regressiva em família, brinde com prosecco para os adultos e tradicional cotechino com lentilhas",
      "00:30 – 03:00 Festa de Ano-Novo com DJ set mantendo a mesa reservada para o conforto da família"
    ],
    "menuTitle": "Menu Oficial de Réveillon 2027 · Famílias e Cena Cantata (75 €)",
    "menuBev": "Incluso no valor de 75 €: água mineral, café, 1 garrafa de Vino Nobile di Montepulciano ou Vermentino di Gallura a cada 4 adultos e taça de prosecco à meia-noite com cotechino e lentilhas. Variações simples na cozinha para crianças, adolescentes ou restrições alimentares mediante aviso pelo WhatsApp +39 351 912 7047.",
    "courseLabels": [
      "Entrada",
      "Primeiro Prato",
      "Prato Principal",
      "Sobremesa",
      "Tradição da Meia-Noite"
    ],
    "dishes": [
      "Vieiras gratinadas à veneziana, croquetes de batata com presunto Patanegra no espeto e cestinha de Parmigiano com puntarelle, burrata e anchovas do Cantábrico",
      "Risoto Carnaroli com cogumelos porcini e pistilos de açafrão",
      "Ribeye bovino grelhado na pedra vulcânica com molho chimichurri e batatinhas assadas",
      "Tiramisù de pandoro natalino com gotas de chocolate meio amargo",
      "Cotechino tradicional italiano com lentilhas de boa sorte e taça de prosecco para brindar"
    ],
    "faqs": [
      [
        "Por que o Carlsberg Øl Milão funciona tão bem para famílias com crianças e adolescentes no Réveillon?",
        "Os salões amplos garantem mesa própria e confortável durante toda a noite, combinando jantar servido de verdade com música ao vivo descontraída em que pais e filhos aproveitam juntos sem aperto."
      ],
      [
        "Qual é a tarifa oficial e como solicitar cadeirões ou pratos mais simples para as crianças?",
        "A tarifa oficial verificada da casa é única de 75 € por pessoa. Avisando na reserva pelo WhatsApp +39 351 912 7047, organizamos mesas familiares espaçosas, cadeirões infantis e variações simples na cozinha para crianças, jovens ou alergias."
      ],
      [
        "O que está incluído no valor de 75 € por pessoa?",
        "Inclui mesa reservada desde as 20:30, ceia servida em quatro etapas, água, café, 1 garrafa de vinho Montepulciano ou Vermentino a cada 4 adultos, lentilhas e prosecco à meia-noite, Cena Cantata ao vivo e DJ set até as 03:00."
      ],
      [
        "Como chegar facilmente com a família e confirmar a reserva?",
        "O restaurante fica em Bastioni di Porta Nuova 9, ao lado da Piazza XXV Aprile e Corso Como, a 5 minutos a pé do metrô M2 Moscova e M2/M5 Porta Garibaldi. Reserve diretamente pelo WhatsApp +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Programação de Réveillon 2027 para Famílias",
    "menusHeading": "Menu Oficial de 75 € (Vinho Incluso)",
    "conditionsHeading": "Estrutura Familiar, O Que Inclui e Acesso Porta Nuova"
  },
  "nl": {
    "nyeTitle": "Familie Oud & Nieuw 2027",
    "milano": "Milaan",
    "dec31": "Donderdag 31 december 2026",
    "title": "Oud & Nieuw 2027 voor Gezinnen bij Carlsberg Øl Milaan · Diner, Cena Cantata & DJ (75 €)",
    "sub": "Carlsberg Øl Milaan · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Vast tarief 75 € · Gezinsvriendelijk",
    "desc": "Vier oudejaarsavond 2026 samen met het hele gezin onder de ruime historische bakstenen gewelven van Carlsberg Øl Milaan aan Bastioni di Porta Nuova 9 (wijk Porta Nuova / Corso Como, op 5 minuten lopen van metro M2 Moscova en M2/M5 Porta Garibaldi). Jullie eigen tafel blijft de hele avond gereserveerd tegen het officieel bevestigde tarief van 75 € per persoon: een uitgeserveerd viergangendiner, een vrolijke Italiaanse Cena Cantata met livemuziek voor ouders, kinderen en tieners, mineraalwater, koffie, 1 fles Vino Nobile di Montepulciano of Vermentino di Gallura per 4 volwassenen, een glas prosecco en traditionele linzen met cotechino om middernacht en een DJ-set tot 03:00 uur. Stuur een bericht via WhatsApp naar +39 351 912 7047 voor ruime familietafels, kinderstoelen en eenvoudige keukenaanpassingen voor kinderen en tieners.",
    "music": "Vrolijke live Cena Cantata voor ouders, kinderen en tieners · Aftellen om middernacht & DJ-set tot 03:00",
    "dress": "Feestelijk en comfortabel voor volwassenen, tieners en kinderen",
    "priceSum": "Officieel vast tarief 75 € per persoon · Uitgeserveerd diner + Wijn (1 fles / 4 volw.) + Familie Cena Cantata + DJ-set",
    "tierLabel": "Uitgeserveerd Oudejaarsdiner voor Gezinnen & Groepen + Cena Cantata + DJ-Set (vanaf 20:30)",
    "tierPrice": "75 € per persoon",
    "tierDesc": "Eigen gereserveerde tafel voor de hele avond met vier uitgeserveerde gangen (drievoudig voorgerecht, Carnaroli-risotto met eekhoorntjesbrood en saffraan, runderribeye van de lavasteen met krieltjes, pandoro-tiramisù met chocoladedruppels), water, koffie, 1 fles Montepulciano- of Vermentino-wijn per 4 volwassenen, prosecco met cotechino en linzen om middernacht en DJ-set. Familietafels, kinderstoelen en eenvoudige kindergerechten af te stemmen via WhatsApp +39 351 912 7047.",
    "highlights": [
      "Gastvrij Oud & Nieuw voor gezinnen met kinderen en tieners aan Bastioni di Porta Nuova 9 met een vaste tafel de hele avond",
      "Officieel bevestigd tarief van 75 € per persoon inclusief 4 uitgeserveerde gangen, water, koffie en linzen om middernacht",
      "Inclusief 1 fles Montepulciano- of Vermentino-wijn per 4 volwassenen en een glas prosecco bij de jaarwisseling",
      "Rechtstreeks contact via WhatsApp +39 351 912 7047 voor ruime familietafels, kinderstoelen en eenvoudige variaties voor kids"
    ],
    "source": "Officieel bevestigd menu en tarief 2027 van Carlsberg Øl Milaan (Bastioni di Porta Nuova 9, 31 december 2026, 20:30–03:00): uitgeserveerd familiediner met Cena Cantata en DJ-set voor 75 € per persoon, inclusief 1 fles wijn per 4 volwassenen, water, koffie, prosecco en linzen. Familietafels, kinderstoelen en kinderopties via WhatsApp +39 351 912 7047.",
    "steps": [
      "20:30 Ontvangst aan Bastioni di Porta Nuova 9 en rustig plaatsnemen aan jullie gereserveerde familietafel",
      "21:00 Uitgeserveerd viergangendiner met gezellige Italiaanse Cena Cantata livemuziek voor jong en oud",
      "00:00 Samen aftellen naar middernacht, proosten met prosecco en traditionele cotechino met linzen",
      "00:30 – 03:00 Nieuwjaarsfeest met DJ-set terwijl jullie eigen tafel de hele nacht beschikbaar blijft"
    ],
    "menuTitle": "Officieel Familie Oudejaarsmenu 2027 · Cena Cantata & DJ-Set (75 €)",
    "menuBev": "Inbegrepen bij het tarief van 75 €: mineraalwater, koffie, 1 fles Vino Nobile di Montepulciano of Vermentino di Gallura per 4 volwassenen en een glas prosecco om middernacht met cotechino en linzen. Eenvoudige keukenvariaties voor kinderen, tieners of allergieën op aanvraag via WhatsApp +39 351 912 7047.",
    "courseLabels": [
      "Voorgerecht",
      "Tussengerecht",
      "Hoofdgerecht",
      "Nagerecht",
      "Middernachttraditie"
    ],
    "dishes": [
      "Venetiaans gegratineerde sint-jakobsschelpen, aardappelkroketjes met Patanegra op een prikker en een Parmigiano-mandje met puntarelle, burrata en Cantabrische ansjovis",
      "Carnaroli-risotto met eekhoorntjesbrood en echte saffraandraadjes",
      "Op lavasteen gegrilde runderribeye met chimichurri en geroosterde nieuwe aardappeltjes",
      "Feestelijke pandoro-tiramisù met pure chocoladedruppels",
      "Traditionele cotechino met gelukslinzen en een glas prosecco om te proosten"
    ],
    "faqs": [
      [
        "Waarom past Carlsberg Øl Milaan zo goed bij gezinnen op oudejaarsavond?",
        "De ruime zalen met bakstenen gewelven bieden volop plek aan jullie eigen vaste tafel voor de hele avond, met een rustig uitgeserveerd diner en vrolijke Italiaanse meezingmuziek voor alle leeftijden."
      ],
      [
        "Wat is het officiële tarief en zijn kinderstoelen of aangepaste gerechten mogelijk?",
        "Het officieel geverifieerde tarief bedraagt 75 € per persoon. Stuur bij het reserveren een bericht naar WhatsApp +39 351 912 7047, dan regelen wij een comfortabele familietafel, kinderstoelen en eenvoudige keukenvariaties voor kinderen of allergieën."
      ],
      [
        "Wat zit er precies inbegrepen bij de prijs van 75 € per persoon?",
        "Je krijgt een gereserveerde tafel vanaf 20:30 uur, vier uitgeserveerde gangen, water, koffie, 1 fles Montepulciano of Vermentino per 4 volwassenen, prosecco en linzen om middernacht, de live Cena Cantata en de DJ-set tot 03:00 uur."
      ],
      [
        "Hoe bereik je het restaurant makkelijk met kinderen en hoe reserveer je?",
        "Carlsberg Øl ligt aan Bastioni di Porta Nuova 9 vlak bij Piazza XXV Aprile en Corso Como, op 5 minuten wandelen van metro M2 Moscova en M2/M5 Porta Garibaldi. Reserveren gaat rechtstreeks via WhatsApp +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Programma Familie Oud & Nieuw 2027",
    "menusHeading": "Officieel 75 € Menu (Wijn Inbegrepen)",
    "conditionsHeading": "Gezinscomfort, Wat is Inbegrepen & Bereikbaarheid"
  },
  "ru": {
    "nyeTitle": "Семейный Новый год 2027",
    "milano": "Милан",
    "dec31": "Четверг, 31 декабря 2026 года",
    "title": "Семейный Новый год 2027 в Carlsberg Øl Милан · Ужин, Cena Cantata и DJ (75 €)",
    "sub": "Carlsberg Øl Милан · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Единый тариф 75 € · Удобно с детьми",
    "desc": "Встретьте 2027 год всей семьёй в просторных залах со старинными кирпичными сводами ресторана Carlsberg Øl в Милане по адресу Bastioni di Porta Nuova 9 (район Porta Nuova / Corso Como, 5 минут пешком от метро M2 Moscova и M2/M5 Porta Garibaldi). Ваш стол остаётся за вами на весь вечер по официальному подтверждённому тарифу 75 € с человека: праздничный ужин из четырёх подач с обслуживанием за столом, тёплая музыкальная программа Cena Cantata, комфортная для родителей, детей и подростков, минеральная вода, кофе, 1 бутылка вина Vino Nobile di Montepulciano или Vermentino di Gallura на каждых 4 взрослых, полуночный бокал просекко, традиционный котекино с чечевицей и DJ-сет до 03:00. Напишите нам в WhatsApp +39 351 912 7047, чтобы подготовить удобный семейный стол, детские стульчики и простые вариации блюд на кухне для детей и подростков.",
    "music": "Живая итальянская программа Cena Cantata для родителей, детей и подростков · Бой курантов и DJ-сет до 03:00",
    "dress": "Нарядный и удобный вечерний стиль для взрослых и детей",
    "priceSum": "Официальный единый тариф 75 € с человека · Ужин с подачей + Вино (1 бут. / 4 взр.) + Семейная Cena Cantata + DJ-сет",
    "tierLabel": "Семейный новогодний ужин с подачей + Cena Cantata + DJ-сет (с 20:30)",
    "tierPrice": "75 € с человека",
    "tierDesc": "Закреплённый стол на всю ночь и полный ужин из четырёх перемен (трио закусок из морепродуктов и мясных деликатесов, ризотто Карнароли с белыми грибами и шафраном, стейк рибай на лавовом камне с молодым картофелем, тирамису из пандоро с каплями шоколада), вода, кофе, 1 бутылка вина Montepulciano или Vermentino на 4 взрослых, просекко и чечевица с котекино в полночь, затем DJ-сет. Семейная рассадка, детские стульчики и простые детские замены блюд по запросу в WhatsApp +39 351 912 7047.",
    "highlights": [
      "Уютная новогодняя ночь для семей с детьми и подростками на Bastioni di Porta Nuova 9 с собственным столом до конца вечера",
      "Подтверждённый официальный единый тариф 75 € с человека за 4 подачи ужина, воду, кофе и полуночное угощение",
      "Включена 1 бутылка вина Montepulciano или Vermentino на каждых 4 взрослых и бокал просекко в полночь",
      "Помощь в WhatsApp +39 351 912 7047: просторные столы для семей, детские стульчики и адаптация блюд для младших гостей"
    ],
    "source": "Официально подтверждённое меню и прайс Carlsberg Øl Милан (Bastioni di Porta Nuova 9, 31 декабря 2026, 20:30–03:00): семейный ужин с подачей, программой Cena Cantata и DJ-сетом по единой цене 75 € с человека, 1 бутылка вина на 4 взрослых, вода, кофе, просекко и чечевица. Семейные столы, стульчики и детские опции кухни через WhatsApp +39 351 912 7047.",
    "steps": [
      "20:30 Сбор гостей на Bastioni di Porta Nuova 9 и спокойная рассадка за забронированными семейными столами",
      "21:00 Праздничный ужин из четырёх блюд под весёлые живые итальянские песни Cena Cantata",
      "00:00 Встреча полуночи всей семьёй, тост с просекко для взрослых и традиционный котекино с чечевицей",
      "00:30 – 03:00 Новогодний DJ-сет с сохранением вашего семейного стола на весь вечер"
    ],
    "menuTitle": "Официальное семейное меню Нового года 2027 · Cena Cantata и DJ (75 €)",
    "menuBev": "В стоимость 75 € входят: минеральная вода, кофе, 1 бутылка Vino Nobile di Montepulciano или Vermentino di Gallura на каждых 4 взрослых и бокал просекко в полночь с котекино и чечевицей. Простые вариации блюд для детей, подростков или при пищевой аллергии согласуются через WhatsApp +39 351 912 7047.",
    "courseLabels": [
      "Закуска",
      "Первое блюдо",
      "Основное блюдо",
      "Десерт",
      "Полуночная традиция"
    ],
    "dishes": [
      "Запечённые гребешки по-венециански, картофельные крокеты с хамоном Патанегра на шпажке и корзиночка из пармезана с пунтарелле, бурратой и кантабрийскими анчоусами",
      "Ризотто Карнароли с белыми грибами и тычинками шафрана",
      "Говяжий рибай на лавовом камне с соусом чимичурри и запечённым молодым картофелем",
      "Праздничный тирамису на основе пандоро с каплями тёмного шоколада",
      "Традиционный новогодний котекино с чечевицей на удачу и бокал просекко для тоста"
    ],
    "faqs": [
      [
        "Почему Carlsberg Øl в Милане отлично подходит для встречи Нового года с детьми и подростками?",
        "В просторных сводчатых залах за вашей семьёй весь вечер закреплён удобный стол, а дружелюбный музыкальный формат Cena Cantata одинаково радует и взрослых, и детей без клубной тесноты."
      ],
      [
        "Какова официальная цена и можно ли попросить детские стульчики или более простые блюда для ребёнка?",
        "Действует единый официально подтверждённый тариф 75 € с человека. Напишите заранее в WhatsApp +39 351 912 7047, и мы организуем удобный семейный стол, детские стульчики и простые изменения блюд на кухне для детей или гостей с аллергией."
      ],
      [
        "Что именно входит в билет за 75 € с человека?",
        "Входят стол с 20:30 на весь вечер, четыре подачи ужина, вода, кофе, 1 бутылка вина Montepulciano или Vermentino на 4 взрослых, полуночное просекко с чечевицей, живое шоу Cena Cantata и DJ-сет до 03:00."
      ],
      [
        "Как удобно добраться с семьёй и забронировать стол?",
        "Ресторан расположен по адресу Bastioni di Porta Nuova 9 рядом с Piazza XXV Aprile и Corso Como, в 5 минутах ходьбы от метро M2 Moscova и M2/M5 Porta Garibaldi. Бронирование в WhatsApp +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Расписание семейного Нового года 2027",
    "menusHeading": "Официальное меню 75 € (вино включено)",
    "conditionsHeading": "Удобства для семей, что включено и как добраться"
  },
  "tr": {
    "nyeTitle": "Ailece Yılbaşı 2027",
    "milano": "Milano",
    "dec31": "31 Aralık 2026 Perşembe",
    "title": "Carlsberg Øl Milano Aile Yılbaşı 2027 · Servisli Akşam Yemeği, Cena Cantata ve DJ (75 €)",
    "sub": "Carlsberg Øl Milano · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Tek fiyat 75 € · Ailelere uygun",
    "desc": "2027 yılını tüm ailenizle birlikte Carlsberg Øl Milano'nun Bastioni di Porta Nuova 9 adresindeki geniş tarihi tuğla tonozlu salonlarında karşılayın (Porta Nuova / Corso Como bölgesi, M2 Moscova ve M2/M5 Porta Garibaldi metrolarına yürüyerek 5 dakika). Kişi başı doğrulanmış resmî 75 € tek tarife ile masanız gece boyunca size ayrılır: dört servisli yılbaşı yemeği, ebeveynlerin, çocukların ve gençlerin keyifle katılabileceği neşeli canlı İtalyan Cena Cantata müzik programı, su, kahve, her 4 yetişkine 1 şişe Vino Nobile di Montepulciano veya Vermentino di Gallura şarabı, gece yarısı prosecco ikramı, geleneksel mercimekli cotechino ve 03:00'e kadar DJ performansı dahildir. Rahat aile masaları, bebek mama sandalyeleri ve çocuklara uygun sade mutfak uyarlamaları için WhatsApp +39 351 912 7047 hattımıza yazabilirsiniz.",
    "music": "Yetişkinler, çocuklar ve gençler için neşeli canlı Cena Cantata · Gece yarısı geri sayımı ve 03:00'e kadar DJ Set",
    "dress": "Yetişkinler ve çocuklar için şık ve rahat yılbaşı kıyafeti",
    "priceSum": "Resmî tek fiyat kişi başı 75 € · Servisli yemek + Şarap (4 yetişkine 1 şişe) + Aile dostu Cena Cantata + DJ Set",
    "tierLabel": "Aileler ve Gruplar İçin Servisli Yılbaşı Yemeği + Cena Cantata + DJ Set (20:30'dan itibaren)",
    "tierPrice": "Kişi başı 75 €",
    "tierDesc": "Gece boyu ayrılmış masa ve dört aşamalı servisli menü (deniz ve kara başlangıç üçlemesi, porcini mantarlı ve safranlı Carnaroli risotto, lav taşında dana ribeye ve taze fırın patates, çikolata damlalı pandoro tiramisù), su, kahve, her 4 yetişkine 1 şişe Montepulciano veya Vermentino şarap, gece yarısı prosecco ve mercimekli cotechino ile DJ set. Aile masası düzeni, mama sandalyesi ve çocuklara özel sade tabak seçenekleri için WhatsApp +39 351 912 7047.",
    "highlights": [
      "Bastioni di Porta Nuova 9'da çocuklu ve gençli aileler için gece boyu sabit masalı sıcak yılbaşı kutlaması",
      "Dört servisli menü, su, kahve ve gece yarısı ikramını kapsayan doğrulanmış resmî kişi başı 75 € tek fiyat",
      "Her 4 yetişkine 1 şişe Montepulciano veya Vermentino şarap ve gece yarısı prosecco kadehi fiyata dahildir",
      "Geniş aile masaları, mama sandalyesi ve çocuklara uygun mutfak dokunuşları için WhatsApp +39 351 912 7047 desteği"
    ],
    "source": "Carlsberg Øl Milano onaylı resmî 2027 yılbaşı menüsü ve fiyat listesi (Bastioni di Porta Nuova 9, 31 Aralık 2026, 20:30–03:00): kişi başı 75 € tek fiyata aile dostu Cena Cantata ve DJ setli servisli akşam yemeği, her 4 yetişkine 1 şişe şarap, su, kahve, prosecco ve mercimek. Aile masaları, mama sandalyesi ve çocuk seçenekleri: WhatsApp +39 351 912 7047.",
    "steps": [
      "20:30 Bastioni di Porta Nuova 9 kapı açılışı ve ayrılmış aile masalarına rahat yerleşme",
      "21:00 Canlı ve neşeli Cena Cantata şarkıları eşliğinde dört servisli yılbaşı akşam yemeği",
      "00:00 Ailece yeni yıl geri sayımı, yetişkinler için prosecco kadehi ve geleneksel mercimekli cotechino",
      "00:30 – 03:00 Masanız tüm gece ailenize ayrılmış kalırken DJ setiyle yeni yıl eğlencesi"
    ],
    "menuTitle": "Resmî 2027 Aile Yılbaşı Menüsü · Cena Cantata ve DJ Set (75 €)",
    "menuBev": "75 € fiyatına dahil olanlar: su, kahve, her 4 yetişkin için 1 şişe Vino Nobile di Montepulciano veya Vermentino di Gallura şarabı ve gece yarısı cotechino ile mercimek eşliğinde yetişkinlere prosecco kadehi. Çocuklar, gençler veya alerjiler için sade mutfak uyarlamaları WhatsApp +39 351 912 7047 üzerinden önceden ayarlanır.",
    "courseLabels": [
      "Başlangıç",
      "Birinci Tabak",
      "Ana Yemek",
      "Tatlı",
      "Gece Yarısı Geleneği"
    ],
    "dishes": [
      "Venedik usulü gratine deniz tarağı, şişte Patanegra jambonlu patates kroket ve puntarelle, burrata ile Kantabria hamsili Parmigiano sepeti",
      "Porcini mantarlı ve gerçek safran lifli Carnaroli risotto",
      "Chimichurri soslu ve fırınlanmış taze patatesli lav taşında dana ribeye",
      "Bitter çikolata damlalı yılbaşı pandoro tiramisù",
      "Yeni yıl bereketi için geleneksel mercimekli cotechino ve kutlama için prosecco kadehi"
    ],
    "faqs": [
      [
        "Carlsberg Øl Milano yılbaşı gecesi çocuklu aileler için neden rahat bir seçimdir?",
        "Geniş tonozlu salonlarda ailenizin masası gece boyunca sabit kalır; özenli masa servisi ile hem anne babaların hem çocukların keyif alacağı samimi canlı İtalyan müzikleri bir arada sunulur."
      ],
      [
        "Resmî ücret nedir; çocuklar için mama sandalyesi veya sade yemek uyarlaması yapılıyor mu?",
        "Mekânın doğrulanmış resmî tarifesi kişi başı tek fiyat 75 €'dur. Rezervasyon sırasında WhatsApp +39 351 912 7047 üzerinden yazarak geniş aile masası, mama sandalyesi ve çocuklara ya da alerjilere uygun sade tabak uyarlamaları talep edebilirsiniz."
      ],
      [
        "Kişi başı 75 € paketine tam olarak neler dahildir?",
        "Saat 20:30'dan itibaren ayrılmış masa, dört servisli yemek, su, kahve, her 4 yetişkine 1 şişe Montepulciano veya Vermentino şarap, gece yarısı prosecco ve mercimek, canlı Cena Cantata ve 03:00'e kadar DJ set dahildir."
      ],
      [
        "Ailece ulaşım nasıldır ve masa rezervasyonu nasıl yapılır?",
        "Restoran Piazza XXV Aprile ve Corso Como'nun hemen yanında, Bastioni di Porta Nuova 9 adresindedir; M2 Moscova ve M2/M5 Porta Garibaldi duraklarına 5 dakika yürüme mesafesindedir. Rezervasyon: WhatsApp +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "2027 Aile Yılbaşı Program Akışı",
    "menusHeading": "Resmî 75 € Yılbaşı Menüsü (Şarap Dahil)",
    "conditionsHeading": "Aile Konforu, Pakete Dahil Olanlar ve Porta Nuova Ulaşımı"
  },
  "zh": {
    "nyeTitle": "2027 家庭跨年夜",
    "milano": "米兰",
    "dec31": "2026年12月31日 星期四",
    "title": "米兰 Carlsberg Øl 2027 家庭跨年晚宴 · 意式欢唱晚宴与 DJ 派对 (75 €)",
    "sub": "Carlsberg Øl 米兰 · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · 统一票价 75 € · 适合携家人儿童同行",
    "desc": "2026年12月31日，携全家人走进米兰 Bastioni di Porta Nuova 9（Porta Nuova / Corso Como 核心街区，步行5分钟可达地铁 M2 Moscova 与 M2/M5 Porta Garibaldi 站）的 Carlsberg Øl 历史红砖拱顶大厅，共迎 2027 新年。官方核实统一票价为每位 75 €，整晚保留专属餐桌：包含四道式位上跨年晚宴、老少皆宜的意大利现场欢唱表演（Cena Cantata）、矿泉水、意式咖啡、每 4 位成人包含 1 瓶 Vino Nobile di Montepulciano 红酒或 Vermentino di Gallura 白酒、午夜起泡酒祝酒与传统吉祥扁豆香肠，以及持续至 03:00 的跨年 DJ 音乐。欢迎通过 WhatsApp +39 351 912 7047 联系我们，提前安排宽敞家庭拼桌、儿童高脚椅以及适合儿童与青少年的简明菜品调整。",
    "music": "适合父母、儿童与青少年的意式现场欢唱晚宴 (Cena Cantata) · 午夜倒数与 DJ 派对至 03:00",
    "dress": "适合成人与儿童的节日优雅舒适着装",
    "priceSum": "官方统一票价每位 75 € · 四道式位上晚宴 + 葡萄酒（每4位成人1瓶）+ 家庭友好欢唱秀 + DJ 派对",
    "tierLabel": "家庭及团体四道式跨年晚宴 + 意式欢唱秀 + DJ 派对（20:30 入场）",
    "tierPrice": "每位 75 €",
    "tierDesc": "整晚专属座位与四道式位上菜单（海陆三拼前菜、牛肝菌藏红花卡纳罗利烩饭、火山石烤肉眼牛排配小土豆、圣诞潘多洛提拉米苏配黑巧粒），含矿泉水、咖啡、每 4 位成人 1 瓶 Montepulciano 或 Vermentino 葡萄酒、午夜起泡酒配传统扁豆香肠及 DJ 派对。家庭桌位排布、儿童餐椅及儿童简明口味调整可通过 WhatsApp +39 351 912 7047 提前沟通。",
    "highlights": [
      "位于 Bastioni di Porta Nuova 9 的宽敞拱顶餐厅，整晚保留餐桌，适合父母携儿童与青少年安心跨年",
      "官方核实统一票价每位 75 €，含四道式位上正餐、饮用水、咖啡与午夜吉祥扁豆",
      "每 4 位成人含 1 瓶 Montepulciano 红酒或 Vermentino 白酒，外加午夜成人起泡酒祝酒",
      "支持通过 WhatsApp +39 351 912 7047 预订家庭大桌、儿童高脚椅及针对小朋友的厨房菜式微调"
    ],
    "source": "Carlsberg Øl 米兰 2027 跨年夜官方确认菜单与价格（Bastioni di Porta Nuova 9，2026年12月31日 20:30–03:00）：家庭友好型四道式晚宴配 Cena Cantata 及 DJ 派对，统一票价每位 75 €，含每4位成人1瓶葡萄酒、水、咖啡、午夜起泡酒与扁豆。家庭排桌、儿童座椅与儿童餐食微调请联系 WhatsApp +39 351 912 7047。",
    "steps": [
      "20:30 Bastioni di Porta Nuova 9 开门迎宾，家庭宾客从容入座预订餐桌",
      "21:00 享用四道式跨年晚宴，伴随轻松热闹的现场意式合唱互动",
      "00:00 全家共同迎新年倒数，成人举杯起泡酒并品尝传统扁豆配香肠",
      "00:30 – 03:00 新年 DJ 音乐派对，整晚保留自家餐桌方便休息交流"
    ],
    "menuTitle": "2027 官方家庭跨年菜单 · 意式欢唱与 DJ 派对 (75 €)",
    "menuBev": "75 € 票价已含：矿泉水、咖啡、每 4 位成人 1 瓶 Vino Nobile di Montepulciano 或 Vermentino di Gallura 葡萄酒，以及午夜成人起泡酒配扁豆香肠。如需为儿童、青少年或食物过敏宾客做简明菜式调整，请提前通过 WhatsApp +39 351 912 7047 说明。",
    "courseLabels": [
      "前菜",
      "第一道主食",
      "主菜与配菜",
      "甜点",
      "午夜传统"
    ],
    "dishes": [
      "威尼斯风味焗扇贝、伊比利亚黑猪火腿土豆可乐饼串，配菊苣、布拉塔奶酪与坎塔布里亚凤尾鱼帕玛森干酪篮",
      "牛肝菌配整根藏红花雌蕊卡纳罗利意式烩饭",
      "火山石炙烤肉眼牛排配阿根廷青酱与烤小土豆",
      "节日潘多洛蛋糕提拉米苏配黑巧克力豆",
      "意大利跨年传统吉祥扁豆炖香肠配起泡酒祝酒"
    ],
    "faqs": [
      [
        "为什么米兰 Carlsberg Øl 非常适合带孩子和青少年一起跨年？",
        "餐厅拥有宽敞舒适的砖拱大厅，全家人整晚拥有固定座位，既能悠闲品尝四道式热菜，又能融入温馨欢快的意大利现场合唱氛围。"
      ],
      [
        "官方票价是多少？可以准备儿童餐椅或调整小朋友的菜品吗？",
        "场地官方核实价格为每位 75 € 统一票价。预订时通过 WhatsApp +39 351 912 7047 告知家庭人数，我们可为您安排宽敞家庭桌、儿童高脚椅及厨房简明儿童菜式调整。"
      ],
      [
        "每位 75 € 的费用具体包含哪些内容？",
        "包含 20:30 起整晚预留座位、四道位上菜品、水、咖啡、每 4 位成人 1 瓶葡萄酒、午夜起泡酒与扁豆香肠、现场欢唱演出及至 03:00 的 DJ 派对。"
      ],
      [
        "带家人前往交通方便吗？如何预订？",
        "餐厅位于 Bastioni di Porta Nuova 9，毗邻 Piazza XXV Aprile 与 Corso Como，距离地铁 M2 Moscova 站和 M2/M5 Porta Garibaldi 站仅步行 5 分钟。请发消息至 WhatsApp +39 351 912 7047 预订。"
      ]
    ],
    "scheduleHeading": "2027 家庭跨年夜时间安排",
    "menusHeading": "官方 75 € 跨年菜单（含葡萄酒）",
    "conditionsHeading": "家庭接待服务、费用包含与 Porta Nuova 交通"
  },
  "ar": {
    "nyeTitle": "رأس السنة للعائلات 2027",
    "milano": "ميلانو",
    "dec31": "الخميس 31 ديسمبر 2026",
    "title": "رأس السنة 2027 للعائلات في Carlsberg Øl ميلانو · عشاء وغناء حي ودي جي (75 €)",
    "sub": "Carlsberg Øl ميلانو · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · سعر موحد 75 € · مناسب للعائلات",
    "desc": "استقبلوا عام 2027 مع جميع أفراد العائلة تحت الأقبية التاريخية الفسيحة في مطعم Carlsberg Øl ميلانو في عنوان Bastioni di Porta Nuova 9 (منطقة Porta Nuova / Corso Como، على بُعد 5 دقائق سيراً من محطتي مترو M2 Moscova وM2/M5 Porta Garibaldi). تبقى طاولتكم محجوزة لكم طوال السهرة بالسعر الرسمي المؤكد البالغ 75 € للشخص الواحد، ويشمل عشاءً كاملاً يُقدَّم على الطاولة من أربعة أطباق، وأجواء غنائية إيطالية حية ومبهجة (Cena Cantata) تناسب الآباء والأطفال واليافعين، ومياهاً معدنية وقهوة، وزجاجة نبيذ Montepulciano أو Vermentino لكل 4 بالغين، ونخب منتصف الليل مع العدس الإيطالي التقليدي، يليه دي جي حتى الساعة 03:00. تواصلوا معنا عبر واتساب +39 351 912 7047 لترتيب طاولات عائلية مريحة وكراسي أطفال وتعديلات بسيطة في المطبخ تناسب الصغار واليافعين.",
    "music": "عشاء غنائي إيطالي حي ومبهج يناسب الكبار والأطفال واليافعين · عد تنازلي عند منتصف الليل ودي جي حتى 03:00",
    "dress": "إطلالة سهرة أنيقة ومريحة للكبار والصغار",
    "priceSum": "سعر رسمي موحد 75 € للشخص · عشاء كامل + نبيذ (زجاجة لكل 4 بالغين) + سهرة عائلية غنائية + دي جي",
    "tierLabel": "عشاء رأس السنة للعائلات والمجموعات + Cena Cantata + دي جي (من 20:30)",
    "tierPrice": "75 € للشخص",
    "tierDesc": "طاولة محجوزة طوال الليل مع قائمة عشاء من أربعة أطباق تُقدَّم على الطاولة (تشكيلة مقبلات بحرية وبرية، ريزوتو كارنارولي بالفطر البري والزعفران، ستيك ريب آي مشوي على حجر الحمم مع بطاطس صغيرة، وتيراميسو الباندورو بقطع الشوكولاتة)، مع الماء والقهوة وزجاجة نبيذ لكل 4 بالغين، وعدس تقليدي ونخب بروسيكو للكبار عند منتصف الليل وحفل دي جي. ترتيبات الطاولات العائلية وكراسي الأطفال وتعديلات الأطباق البسيطة للصغار متاحة عبر واتساب +39 351 912 7047.",
    "highlights": [
      "سهرة رأس سنة دافئة ومريحة للعائلات والأطفال واليافعين في Bastioni di Porta Nuova 9 مع الاحتفاظ بالطاولة طوال السهرة",
      "سعر رسمي مؤكد وموحد بقيمة 75 € للشخص يشمل 4 أطباق كاملة والماء والقهوة وطبق منتصف الليل التقليدي",
      "يشمل زجاجة نبيذ Montepulciano أو Vermentino لكل 4 بالغين مع كأس بروسيكو للكبار عند منتصف الليل",
      "تنسيق مباشر عبر واتساب +39 351 912 7047 لتجهيز طاولات عائلية واسعة وكراسي أطفال وخيارات مبسطة للصغار من المطبخ"
    ],
    "source": "القائمة والسعر الرسمي المؤكد لمطعم Carlsberg Øl ميلانو (Bastioni di Porta Nuova 9، 31 ديسمبر 2026، 20:30–03:00): عشاء عائلي مع عرض Cena Cantata ودي جي بسعر موحد 75 € للشخص شامل الماء والقهوة وزجاجة نبيذ لكل 4 بالغين ونخب منتصف الليل. تنسيق الطاولات العائلية وكراسي الأطفال عبر واتساب +39 351 912 7047.",
    "steps": [
      "20:30 فتح الأبواب في Bastioni di Porta Nuova 9 والجلوس المريح على الطاولات العائلية المحجوزة",
      "21:00 بدء عشاء رأس السنة المكون من أربعة أطباق على أنغام الغناء الإيطالي الحي المبهج",
      "00:00 العد التنازلي العائلي لمنتصف الليل وتقديم الطبق الإيطالي التقليدي ونخب العام الجديد",
      "00:30 – 03:00 أجواء احتفالية مع دي جي مع بقاء طاولتكم تحت تصرف العائلة طوال السهرة"
    ],
    "menuTitle": "القائمة الرسمية لرأس السنة 2027 للعائلات · غناء حي ودي جي (75 €)",
    "menuBev": "يشمل سعر 75 €: المياه المعدنية والقهوة وزجاجة نبيذ Vino Nobile di Montepulciano أو Vermentino di Gallura لكل 4 بالغين مع كأس بروسيكو للكبار عند منتصف الليل. يمكن طلب تعديلات مطبخ بسيطة للأطفال أو اليافعين أو لحالات الحساسية الغذائية عبر واتساب +39 351 912 7047.",
    "courseLabels": [
      "المقبلات",
      "الطبق الأول",
      "الطبق الرئيسي",
      "التحلية",
      "تقليد منتصف الليل"
    ],
    "dishes": [
      "محار إسكالوب غراتان على الطريقة الفينيسية، وكروكيت البطاطس على سيخ مع سلة جبن بارميجيانو وهندباء وبوراتا وأنشوجة كانتابريا",
      "ريزوتو كارنارولي مع فطر بورتشيني وخيوط الزعفران الطبيعي",
      "ستيك ريب آي بقري مشوي على حجر الحمم البركانية مع صلصة تشيميتشوري وبطاطس صغيرة محمصة",
      "تيراميسو باندورو الأعياد مع حبيبات الشوكولاتة الداكنة",
      "طبق العدس الإيطالي التقليدي ليلة رأس السنة مع نخب منتصف الليل"
    ],
    "faqs": [
      [
        "لماذا يُعد Carlsberg Øl ميلانو خياراً مناسباً للعائلات مع الأطفال واليافعين في ليلة رأس السنة؟",
        "تتيح القاعات الواسعة ذات الأقبية الحجرية جلوس العائلة براحة تامة على طاولتها طوال السهرة، مع الجمع بين عشاء متكامل يُقدَّم على الطاولة وموسيقى حية مبهجة تناسب جميع الأعمار."
      ],
      [
        "ما هو السعر الرسمي وهل تتوفر كراسي أطفال أو أطباق مبسطة للصغار؟",
        "السعر الرسمي المعتمد من المطعم هو سعر موحد قدره 75 € للشخص. عند الحجز عبر واتساب +39 351 912 7047 نرتب لكم طاولات عائلية مريحة وكراسي للأطفال وتعديلات بسيطة في الأطباق للصغار أو لمن لديهم حساسية غذائية."
      ],
      [
        "ماذا يشمل سعر 75 € للشخص بالتحديد؟",
        "يشمل الطاولة المحجوزة من الساعة 20:30، وأربعة أطباق رئيسية متتالية، والماء والقهوة، وزجاجة نبيذ لكل 4 بالغين، وضيافة منتصف الليل، والغناء الحي Cena Cantata، وحفل الدي جي حتى 03:00."
      ],
      [
        "كيف يمكن الوصول بسهولة مع العائلة وكيف يتم تأكيد الحجز؟",
        "يقع المطعم في Bastioni di Porta Nuova 9 بجوار ساحة XXV Aprile وشارع Corso Como، على بُعد 5 دقائق سيراً من مترو M2 Moscova وPorta Garibaldi. للحجز المباشر راسلونا على واتساب +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "برنامج سهرة رأس السنة للعائلات 2027",
    "menusHeading": "القائمة الرسمية بسعر 75 € (شاملة الضيافة)",
    "conditionsHeading": "راحة العائلات والمزايا المشمولة والوصول إلى Porta Nuova"
  },
  "bg": {
    "nyeTitle": "Семейна Нова година 2027",
    "milano": "Милано",
    "dec31": "Четвъртък, 31 декември 2026 г.",
    "title": "Семейна Нова година 2027 в Carlsberg Øl Милано · Вечеря, Cena Cantata и DJ (75 €)",
    "sub": "Carlsberg Øl Милано · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Единна цена 75 € · Подходящо за семейства",
    "desc": "Посрещнете 2027 година с цялото семейство под просторните тухлени сводове на Carlsberg Øl Милано на Bastioni di Porta Nuova 9 (квартал Porta Nuova / Corso Como, на 5 минути пеша от метростанции M2 Moscova и M2/M5 Porta Garibaldi). Масата остава резервирана за вас през цялата вечер при официално потвърдена единна цена от 75 € на човек: четиристепенна сервирана празнична вечеря, весела италианска музикална програма на живо Cena Cantata за родители, деца и тийнейджъри, минерална вода, кафе, 1 бутилка вино Vino Nobile di Montepulciano или Vermentino di Gallura на всеки 4 възрастни, полунощна чаша просеко, традиционно котекино с леща и DJ сет до 03:00 ч. Пишете ни в WhatsApp на +39 351 912 7047 за удобни семейни маси, детски столчета и лесни кухненски промени по менюто за деца и младежи.",
    "music": "Весела италианска Cena Cantata на живо за родители, деца и младежи · Новогодишно броене и DJ сет до 03:00",
    "dress": "Елегантно и удобно празнично облекло за възрастни и деца",
    "priceSum": "Официална единна цена 75 € на човек · Сервирана вечеря + Вино (1 бут. / 4 възрастни) + Семейна Cena Cantata + DJ сет",
    "tierLabel": "Семейна сервирана новогодишна вечеря + Cena Cantata + DJ сет (от 20:30)",
    "tierPrice": "75 € на човек",
    "tierDesc": "Запазена маса за цялата нощ с четиристепенно сервирано меню (тройно предястие, ризото Карнароли с манатарки и шафран, телешки рибай на вулканичен камък с пресни картофи, празнично тирамису с пандоро и шоколадови капки), вода, кафе, 1 бутилка вино Montepulciano или Vermentino на 4 възрастни, просеко и леща с котекино в полунощ, плюс DJ сет. Семейни маси, детски столчета и адаптирани детски порции чрез WhatsApp +39 351 912 7047.",
    "highlights": [
      "Топла и спокойна Нова година за семейства с деца и тийнейджъри на Bastioni di Porta Nuova 9 със запазена маса цяла вечер",
      "Потвърдена официална единна цена 75 € на човек с 4 сервирани ястия, вода, кафе и традиционна леща в полунощ",
      "Включена 1 бутилка вино Montepulciano или Vermentino на всеки 4 възрастни и чаша просеко за новогодишната наздравица",
      "Съдействие в WhatsApp +39 351 912 7047 за широки семейни маси, детски столчета и опростени ястия за най-малките"
    ],
    "source": "Официално потвърдено меню и ценова листа 2027 на Carlsberg Øl Милано (Bastioni di Porta Nuova 9, 31 декември 2026, 20:30–03:00): сервирана семейна вечеря с Cena Cantata и DJ сет на единна цена 75 € на човек, 1 бутилка вино на 4 възрастни, вода, кафе, просеко и леща. Семейни маси, детски столчета и детски вариации в кухнята чрез WhatsApp +39 351 912 7047.",
    "steps": [
      "20:30 Отваряне на вратите на Bastioni di Porta Nuova 9 и удобно настаняване на резервираните семейни маси",
      "21:00 Четиристепенна празнична вечеря с живи италиански песни Cena Cantata за всички поколения",
      "00:00 Семейно обратно броене в полунощ, наздравица с просеко за възрастните и котекино с леща за късмет",
      "00:30 – 03:00 Новогодишно парти с DJ сет, докато семейната ви маса остава на ваше разположение"
    ],
    "menuTitle": "Официално семейно меню Нова година 2027 · Cena Cantata и DJ (75 €)",
    "menuBev": "В цената от 75 € са включени: минерална вода, кафе, 1 бутилка Vino Nobile di Montepulciano или Vermentino di Gallura на всеки 4 възрастни и чаша просеко в полунощ с котекино и леща. Лесни кухненски адаптации за деца, тийнейджъри или при алергии се заявяват предварително в WhatsApp +39 351 912 7047.",
    "courseLabels": [
      "Предястие",
      "Първо ястие",
      "Основно ястие",
      "Десерт",
      "Полунощна традиция"
    ],
    "dishes": [
      "Гратинирани миди Сен Жак по венециански, картофени крокети с шунка Патанегра на шишче и кошничка от Пармиджано с пунтареле, бурата и аншоа от Кантабрия",
      "Ризото Карнароли с манатарки и истински шафранови тичинки",
      "Телешки рибай на вулканичен камък със сос чимичури и печени пресни картофки",
      "Коледно тирамису с пандоро и капки черен шоколад",
      "Традиционно италианско котекино с леща за късмет и чаша просеко за наздравица"
    ],
    "faqs": [
      [
        "Защо Carlsberg Øl Милано е подходящ избор за семейства с деца в новогодишната нощ?",
        "Широките сводести зали осигуряват спокойствие и собствена маса за цялата вечер, съчетавайки истинска сервирана вечеря с ведра музика на живо без клубна блъсканица."
      ],
      [
        "Каква е официалната цена и предлагате ли детски столчета или по-леки ястия за деца?",
        "Официално потвърдената тарифа на заведението е единна: 75 € на човек. Когато ни пишете в WhatsApp на +39 351 912 7047, подготвяме удобна семейна маса, детски столчета и лесни промени в ястията за деца или при алергии."
      ],
      [
        "Какво точно включва кувертът от 75 € на човек?",
        "Включва резервирана маса от 20:30 ч., четири сервирани ястия, вода, кафе, 1 бутилка вино Montepulciano или Vermentino на 4 възрастни, просеко и леща в полунощ, програмата Cena Cantata и DJ сет до 03:00 ч."
      ],
      [
        "Как се стига удобно със семейството и как да резервираме?",
        "Ресторантът се намира на Bastioni di Porta Nuova 9 до Piazza XXV Aprile и Corso Como, на 5 минути пеша от метро M2 Moscova и M2/M5 Porta Garibaldi. Резервации в WhatsApp: +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Програма за Семейна Нова година 2027",
    "menusHeading": "Официално меню 75 € (с включено вино)",
    "conditionsHeading": "Удобства за семейства, включени услуги и локация"
  },
  "hr": {
    "nyeTitle": "Obiteljski doček 2027.",
    "milano": "Milano",
    "dec31": "Četvrtak, 31. prosinca 2026.",
    "title": "Obiteljski doček Nove godine 2027. u Carlsberg Øl Milano · Večera, Cena Cantata i DJ (75 €)",
    "sub": "Carlsberg Øl Milano · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Jedinstvena cijena 75 € · Za obitelji",
    "desc": "Dočekajte 2027. godinu s cijelom obitelji pod prostranim povijesnim svodovima od opeke restorana Carlsberg Øl Milano na adresi Bastioni di Porta Nuova 9 (četvrt Porta Nuova / Corso Como, 5 minuta pješice od postaja podzemne željeznice M2 Moscova i M2/M5 Porta Garibaldi). Vaš stol ostaje rezerviran cijelu večer po službeno potvrđenoj jedinstvenoj cijeni od 75 € po osobi: svečana poslužena večera u četiri slijeda, vesela talijanska glazbena večer uživo Cena Cantata prilagođena roditeljima, djeci i tinejdžerima, mineralna voda, kava, 1 boca vina Vino Nobile di Montepulciano ili Vermentino di Gallura na svake 4 odrasle osobe, ponoćni pjenušac prosecco, tradicionalni cotechino s lećom i DJ set do 03:00. Javite nam se na WhatsApp +39 351 912 7047 za udoban raspored obiteljskih stolova, dječje sjedalice i jednostavne kuhinjske prilagodbe jela za djecu i mlade.",
    "music": "Vesela talijanska Cena Cantata uživo za roditelje, djecu i mlade · Ponoćno odbrojavanje i DJ set do 03:00",
    "dress": "Svečano i udobno novogodišnje odijevanje za odrasle i djecu",
    "priceSum": "Službena jedinstvena cijena 75 € po osobi · Poslužena večera + Vino (1 boca / 4 odraslih) + Obiteljska Cena Cantata + DJ set",
    "tierLabel": "Obiteljska poslužena novogodišnja večera + Cena Cantata + DJ set (od 20:30)",
    "tierPrice": "75 € po osobi",
    "tierDesc": "Rezervirani stol cijelu noć uz posluženi jelovnik u četiri slijeda (trostruko predjelo mora i kopna, Carnaroli rižoto s vrganjima i nitima šafrana, juneći ribeye s vulkanskog kamena s mladim krumpirom, blagdanski pandoro tiramisù s kapljicama čokolade), vodu, kavu, 1 bocu vina Montepulciano ili Vermentino na 4 odrasle osobe, ponoćni prosecco uz cotechino i leću te DJ set. Obiteljski stolovi, hranilice i jednostavne prilagodbe jela za djecu dogovaraju se putem WhatsAppa +39 351 912 7047.",
    "highlights": [
      "Ugodan i topao doček Nove godine za obitelji s djecom i tinejdžerima na Bastioni di Porta Nuova 9 uz vlastiti stol cijelu večer",
      "Službeno potvrđena jedinstvena cijena od 75 € po osobi s 4 poslužena slijeda, vodom, kavom i ponoćnom lećom",
      "Uključena 1 boca vina Montepulciano ili Vermentino na svake 4 odrasle osobe te čaša prosecca u ponoć",
      "Izravna podrška na WhatsAppu +39 351 912 7047 za spajanje obiteljskih stolova, dječje sjedalice i prilagodbu dječjih tanjura"
    ],
    "source": "Službeno potvrđeni jelovnik i cjenik za 2027. restorana Carlsberg Øl Milano (Bastioni di Porta Nuova 9, 31. prosinca 2026., 20:30–03:00): obiteljska poslužena večera uz program Cena Cantata i DJ set po jedinstvenoj cijeni od 75 € po osobi, 1 boca vina na 4 odrasle osobe, voda, kava, prosecco i leća. Obiteljski stolovi, sjedalice i dječje opcije putem WhatsAppa +39 351 912 7047.",
    "steps": [
      "20:30 Otvaranje vrata na adresi Bastioni di Porta Nuova 9 i udoban smještaj za rezervirane obiteljske stolove",
      "21:00 Svečana poslužena večera u četiri slijeda uz radosnu talijansku glazbu uživo Cena Cantata",
      "00:00 Zajedničko obiteljsko odbrojavanje u ponoć, zdravica proseccom za odrasle i tradicionalni cotechino s lećom",
      "00:30 – 03:00 Novogodišnja proslava uz DJ set dok vaš obiteljski stol ostaje rezerviran do kraja večeri"
    ],
    "menuTitle": "Službeni obiteljski novogodišnji jelovnik 2027. · Cena Cantata i DJ (75 €)",
    "menuBev": "U cijenu od 75 € uključeno je: mineralna voda, kava, 1 boca vina Vino Nobile di Montepulciano ili Vermentino di Gallura na svake 4 odrasle osobe te čaša prosecca u ponoć uz cotechino i leću. Jednostavne kuhinjske prilagodbe jela za djecu, tinejdžere ili alergičare dostupne su uz najavu na WhatsApp +39 351 912 7047.",
    "courseLabels": [
      "Predjelo",
      "Prvi slijed",
      "Glavno jelo",
      "Desert",
      "Ponoćna tradicija"
    ],
    "dishes": [
      "Jakobove kapice gratinirane na venecijanski način, kroketi od krumpira i pršuta Patanegra na štapiću te košarica od Parmigiana s radičem puntarelle, burratom i kantabrijskim inćunima",
      "Carnaroli rižoto s vrganjima i cijelim nitima šafrana",
      "Juneći ribeye pečen na vulkanskom kamenu uz umak chimichurri i pečeni mladi krumpir",
      "Blagdanski tiramisù od pandora s kapljicama tamne čokolade",
      "Tradicionalni novogodišnji cotechino sa sretnom lećom i čašom prosecca za zdravicu"
    ],
    "faqs": [
      [
        "Zašto je Carlsberg Øl Milano odličan izbor za obitelji s djecom u novogodišnjoj noći?",
        "Prostrane dvorane sa svodovima omogućuju da cijela obitelj cijelu večer ima vlastiti udoban stol, spajajući mirnu posluženu večeru i veselu talijansku pjesmu u kojoj uživaju sve generacije."
      ],
      [
        "Koja je službena cijena i nudite li dječje sjedalice ili jednostavnija jela za djecu?",
        "Službeno potvrđena cijena lokala je jedinstvena i iznosi 75 € po osobi. Javite nam se prilikom rezervacije na WhatsApp +39 351 912 7047 kako bismo pripremili komotne obiteljske stolove, dječje hranilice i jednostavne prilagodbe slijedova u kuhinji."
      ],
      [
        "Što je sve uključeno u cijenu od 75 € po osobi?",
        "Uključeni su rezervirani stol od 20:30, četiri poslužena slijeda, voda, kava, 1 boca vina Montepulciano ili Vermentino na 4 odrasle osobe, ponoćni prosecco i leća, glazbeni program Cena Cantata i DJ set do 03:00."
      ],
      [
        "Kako jednostavno doći s obitelji i rezervirati stol?",
        "Restoran se nalazi na Bastioni di Porta Nuova 9 uz Piazzu XXV Aprile i Corso Como, 5 minuta hoda od metroa M2 Moscova i M2/M5 Porta Garibaldi te javnih garaža. Rezervacije na WhatsApp +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Raspored obiteljskog dočeka 2027.",
    "menusHeading": "Službeni jelovnik od 75 € (vino uključeno)",
    "conditionsHeading": "Pogodnosti za obitelji, što je uključeno i dolazak"
  },
  "cs": {
    "nyeTitle": "Rodinný Silvestr 2027",
    "milano": "Milán",
    "dec31": "Čtvrtek 31. prosince 2026",
    "title": "Rodinný Silvestr 2027 v Carlsberg Øl Milán · Servírovaná večeře, Cena Cantata a DJ (75 €)",
    "sub": "Carlsberg Øl Milán · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Jednotná cena 75 € · Vhodné pro rodiny",
    "desc": "Oslavte 31. prosinec 2026 s celou rodinou pod prostornými historickými cihlovými klenbami restaurace Carlsberg Øl Milán na adrese Bastioni di Porta Nuova 9 (čtvrť Porta Nuova / Corso Como, 5 minut pěšky od stanic metra M2 Moscova a M2/M5 Porta Garibaldi). Váš stůl zůstává rezervovaný po celý večer za oficiálně potvrzenou jednotnou cenu 75 € za osobu: čeká vás čtyřchodová servírovaná silvestrovská večeře, veselá italská hudební show Cena Cantata vhodná pro rodiče, děti i dospívající, minerální voda, káva, 1 láhev vína Vino Nobile di Montepulciano nebo Vermentino di Gallura na každé 4 dospělé, půlnoční přípitek proseccem, tradiční cotechino s čočkou a DJ set až do 03:00. Napište nám na WhatsApp +39 351 912 7047 a rádi připravíme pohodlné rodinné stoly, dětské židličky i jednoduché úpravy pokrmů v kuchyni pro děti a teenagery.",
    "music": "Veselá živá italská Cena Cantata pro rodiče, děti i mládež · Půlnoční odpočet a DJ set do 03:00",
    "dress": "Slavnostní a pohodlné silvestrovské oblečení pro dospělé i děti",
    "priceSum": "Oficiální jednotná cena 75 € za osobu · Servírovaná večeře + Víno (1 láhev / 4 dospělí) + Rodinná Cena Cantata + DJ set",
    "tierLabel": "Rodinná servírovaná silvestrovská večeře + Cena Cantata + DJ set (od 20:30)",
    "tierPrice": "75 € za osobu",
    "tierDesc": "Vlastní rezervovaný stůl po celou noc se čtyřchodovým servírovaným menu (trojitý předkrm darů moře a pevniny, rizoto Carnaroli s hříbky a šafránem, hovězí ribeye z lávového kamene s novými bramborami, sváteční pandoro tiramisù s čokoládovými kapkami), vodou, kávou, 1 lahví vína Montepulciano nebo Vermentino na 4 dospělé, půlnočním proseccem s čočkou a cotechinem a DJ setem. Rodinné uspořádání stolů, dětské židličky a úpravy jídel pro děti přes WhatsApp +39 351 912 7047.",
    "highlights": [
      "Příjemný a klidný Silvestr pro rodiny s dětmi a teenagery na Bastioni di Porta Nuova 9 s vlastním stolem po celý večer",
      "Potvrzená oficiální jednotná cena 75 € za osobu včetně 4 servírovaných chodů, vody, kávy a půlnoční čočky",
      "V ceně 1 láhev vína Montepulciano nebo Vermentino na každé 4 dospělé a sklenka prosecca o půlnoci",
      "Domluva na WhatsAppu +39 351 912 7047 pro prostorné rodinné tabule, dětské židličky a jednodušší dětské porce z kuchyně"
    ],
    "source": "Oficiálně potvrzené menu a ceník 2027 Carlsberg Øl Milán (Bastioni di Porta Nuova 9, 31. prosince 2026, 20:30–03:00): rodinná servírovaná večeře s programem Cena Cantata a DJ setem za jednotnou cenu 75 € za osobu, 1 láhev vína na 4 dospělé, voda, káva, prosecco a čočka. Rodinné stoly, židličky a dětské úpravy jídel přes WhatsApp +39 351 912 7047.",
    "steps": [
      "20:30 Otevření podniku na Bastioni di Porta Nuova 9 a pohodlné usazení u rezervovaných rodinných stolů",
      "21:00 Čtyřchodová servírovaná silvestrovská večeře za doprovodu živých italských písní Cena Cantata",
      "00:00 Společný rodinný odpočet půlnoci, přípitek proseccem pro dospělé a tradiční cotechino s čočkou",
      "00:30 – 03:00 Novoroční oslava s DJ setem se zachováním vašeho rodinného stolu až do konce"
    ],
    "menuTitle": "Oficiální rodinné silvestrovské menu 2027 · Cena Cantata a DJ (75 €)",
    "menuBev": "V ceně 75 € je zahrnuto: minerální voda, káva, 1 láhev vína Vino Nobile di Montepulciano nebo Vermentino di Gallura na každé 4 dospělé a sklenka prosecca pro dospělé o půlnoci s cotechinem a čočkou. Jednoduché úpravy pokrmů pro děti, dospívající nebo alergiky zajistíme po domluvě na WhatsAppu +39 351 912 7047.",
    "courseLabels": [
      "Předkrm",
      "První chod",
      "Hlavní chod",
      "Dezert",
      "Půlnoční tradice"
    ],
    "dishes": [
      "Gratinované hřebenatek po benátsku, bramborové krokety se šunkou Patanegra na špejli a parmazánový košíček s čekankou puntarelle, burratou a kantabrijskými ančovičkami",
      "Rizoto Carnaroli s pravými hříbky a bliznami šafránu",
      "Hovězí ribeye grilovaný na lávovém kameni s omáčkou chimichurri a pečenými novými bramborami",
      "Sváteční tiramisù z vánočního pandora s kapkami hořké čokolády",
      "Tradiční novoroční klobása cotechino s čočkou pro štěstí a sklenka prosecca na přípitek"
    ],
    "faqs": [
      [
        "Proč je Carlsberg Øl Milán skvělou volbou pro rodiny s dětmi na Silvestra?",
        "Rozlehlé klenuté sály nabízejí dostatek místa a vlastní stůl po celý večer, takže si rodiče i děti v klidu vychutnají servírovanou večeři i přátelskou živou italskou hudbu."
      ],
      [
        "Jaká je oficiální cena a připravíte dětské židličky nebo jednodušší jídlo pro děti?",
        "Oficiálně ověřená sazba podniku je jednotná 75 € za osobu. Stačí napsat při rezervaci na WhatsApp +39 351 912 7047 a nachystáme pohodlné rodinné sezení, dětské židličky i jednoduché kuchyňské úpravy chodů pro děti či alergiky."
      ],
      [
        "Co přesně zahrnuje vstupenka za 75 € na osobu?",
        "Zahrnuje rezervovaný stůl od 20:30, čtyři servírované chody, vodu, kávu, 1 láhev vína Montepulciano nebo Vermentino na 4 dospělé, půlnoční prosecco a čočku, živou Cena Cantata a DJ set do 03:00."
      ],
      [
        "Jak se sem s rodinou snadno dostaneme a kde rezervovat stůl?",
        "Restaurace sídlí na Bastioni di Porta Nuova 9 hned u Piazza XXV Aprile a Corso Como, 5 minut chůze od metra M2 Moscova a M2/M5 Porta Garibaldi. Rezervace na WhatsAppu +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Harmonogram rodinného Silvestra 2027",
    "menusHeading": "Oficiální menu za 75 € (víno v ceně)",
    "conditionsHeading": "Zázemí pro rodiny, co je v ceně a doprava"
  },
  "da": {
    "nyeTitle": "Familienytår 2027",
    "milano": "Milano",
    "dec31": "Torsdag den 31. december 2026",
    "title": "Nytårsaften 2027 for Familier hos Carlsberg Øl Milano · Middag, Cena Cantata & DJ (75 €)",
    "sub": "Carlsberg Øl Milano · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Enhedspris 75 € · Familievenligt",
    "desc": "Fejr overgangen til 2027 med hele familien under de rummelige historiske murstenshvælvinger hos Carlsberg Øl Milano på Bastioni di Porta Nuova 9 (kvarteret Porta Nuova / Corso Como, 5 minutters gang fra metrostationerne M2 Moscova og M2/M5 Porta Garibaldi). Jeres bord er reserveret hele aftenen til den officielt bekræftede enhedspris på 75 € pr. person: en serveret fireretters nytårsmiddag, festlig italiensk Cena Cantata med livemusik i øjenhøjde for både forældre, børn og teenagere, mineralvand, kaffe, 1 flaske Vino Nobile di Montepulciano eller Vermentino di Gallura pr. 4 voksne, midnatsbobler med prosecco, traditionel cotechino med linser samt DJ-set frem til kl. 03:00. Skriv til os på WhatsApp +39 351 912 7047 for gode familieborde, højstole og enkle køkkentilpasninger af retterne til børn og unge.",
    "music": "Glad italiensk Cena Cantata-livemusik for forældre, børn og unge · Midnatsnedtælling & DJ-set til 03:00",
    "dress": "Festligt og behageligt nytårstøj for både voksne og børn",
    "priceSum": "Officiel enhedspris 75 € pr. person · Serveret middag + Vin (1 flaske / 4 voksne) + Familie-Cena Cantata + DJ-set",
    "tierLabel": "Serveret Nytårsmiddag for Familier & Grupper + Cena Cantata + DJ-Set (fra 20:30)",
    "tierPrice": "75 € pr. person",
    "tierDesc": "Eget reserveret bord hele natten med fireretters bordserveret menu (tredelt forret fra hav og land, Carnaroli-risotto med karljohansvampe og safran, okse-ribeye stegt på lavasten med nye kartofler, pandoro-tiramisù med chokoladedråber), vand, kaffe, 1 flaske Montepulciano- eller Vermentino-vin pr. 4 voksne, prosecco og linser ved midnat samt DJ-set. Familieborde, højstole og enkle børnevariationer i køkkenet aftales via WhatsApp +39 351 912 7047.",
    "highlights": [
      "Tryg og hyggelig nytårsaften for familier med børn og teenagere på Bastioni di Porta Nuova 9 med eget bord hele natten",
      "Officielt bekræftet enhedspris på 75 € pr. person inkl. 4 serverede retter, vand, kaffe og midnatslinser",
      "Inkluderer 1 flaske Montepulciano- eller Vermentino-vin pr. 4 voksne samt et glas prosecco ved midnat",
      "Personlig hjælp på WhatsApp +39 351 912 7047 til samlede familieborde, højstole og børnevenlige tilpasninger i køkkenet"
    ],
    "source": "Officielt bekræftet 2027-menu og prisliste for Carlsberg Øl Milano (Bastioni di Porta Nuova 9, 31. december 2026 kl. 20:30–03:00): serveret familienytår med Cena Cantata og DJ-set til enhedspris 75 € pr. person inkl. 1 flaske vin pr. 4 voksne, vand, kaffe, prosecco og linser. Familieborde, højstole og børneønsker via WhatsApp +39 351 912 7047.",
    "steps": [
      "20:30 Dørene åbner på Bastioni di Porta Nuova 9 med rolig ankomst til jeres reserverede familiebord",
      "21:00 Fireretters serveret nytårsmiddag ledsaget af festlig italiensk Cena Cantata-fællessang",
      "00:00 Fælles nedtælling ved midnat, prosecco-skål for de voksne og traditionel cotechino med linser",
      "00:30 – 03:00 Nytårsfest med DJ-set, mens familien beholder sit eget bord hele aftenen"
    ],
    "menuTitle": "Officiel Familienytårsmenu 2027 · Cena Cantata & DJ-Set (75 €)",
    "menuBev": "Inkluderet i prisen på 75 €: mineralvand, kaffe, 1 flaske Vino Nobile di Montepulciano eller Vermentino di Gallura pr. 4 voksne samt et glas prosecco til voksne ved midnat med cotechino og linser. Enkle køkkentilpasninger til børn, teenagere eller allergikere tilbydes via WhatsApp +39 351 912 7047.",
    "courseLabels": [
      "Forret",
      "Første ret",
      "Hovedret",
      "Dessert",
      "Midnatstradition"
    ],
    "dishes": [
      "Venetiansk gratinerede kammuslinger, kartoffelkroketter med Patanegra-skinke på spyd og Parmigiano-kurv med puntarelle, burrata og cantabriske ansjoser",
      "Carnaroli-risotto med karljohansvampe og ægte safrantråde",
      "Okse-ribeye grillet på lavasten med chimichurri-sauce og ovnbagte nye kartofler",
      "Juleinspireret pandoro-tiramisù med mørke chokoladedråber",
      "Traditionel cotechino med lykkebringende nytårslinser og et glas prosecco"
    ],
    "faqs": [
      [
        "Hvorfor passer Carlsberg Øl Milano så godt til børnefamilier nytårsaften?",
        "De store hvælvede sale giver god plads omkring jeres eget faste bord hele aftenen, så både børn, unge og voksne kan nyde bordserveret mad og livlig italiensk musik i trygge rammer."
      ],
      [
        "Hvad er den officielle pris, og kan vi få højstole eller enklere retter til børnene?",
        "Stedets officielt bekræftede pris er en fast sats på 75 € pr. person. Når I skriver på WhatsApp +39 351 912 7047 ved booking, sørger vi for rummelige familieborde, højstole og enkle tilpasninger af retterne til børn eller allergier."
      ],
      [
        "Hvad dækker kuvertprisen på 75 € pr. person?",
        "Den dækker reserveret bord fra kl. 20:30, fire serverede retter, vand, kaffe, 1 flaske Montepulciano eller Vermentino pr. 4 voksne, midnatsprosecco og linser, live Cena Cantata samt DJ-set til kl. 03:00."
      ],
      [
        "Hvordan kommer man nemt frem med familien, og hvordan bestiller man bord?",
        "Restauranten ligger på Bastioni di Porta Nuova 9 lige ved Piazza XXV Aprile og Corso Como, 5 minutters gang fra metro M2 Moscova og M2/M5 Porta Garibaldi. Book direkte på WhatsApp +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Program for Familienytår 2027",
    "menusHeading": "Officiel 75 € Menu (Vin Inkluderet)",
    "conditionsHeading": "Familieforhold, Inkluderet i Prisen & Transport"
  },
  "et": {
    "nyeTitle": "Pere aastavahetus 2027",
    "milano": "Milano",
    "dec31": "Neljapäev, 31. detsember 2026",
    "title": "Pere aastavahetus 2027 restoranis Carlsberg Øl Milano · Õhtusöök, Cena Cantata ja DJ (75 €)",
    "sub": "Carlsberg Øl Milano · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Ühtne hind 75 € · Peresõbralik",
    "desc": "Võtke 2027. aasta vastu kogu perega Carlsberg Øl Milano avarates ajalooliste telliskivivõlvidega saalides aadressil Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como piirkond, 5-minutilise jalutuskäigu kaugusel M2 Moscova ja M2/M5 Porta Garibaldi metroojaamadest). Teie laud jääb broneerituks kogu õhtuks ametlikult kinnitatud ühtse hinnaga 75 € inimese kohta: hinnas on neljakäiguline lauda serveeritud pidulik õhtusöök, rõõmsameelne elava muusikaga Itaalia Cena Cantata nii vanematele, lastele kui ka teismelistele, mineraalvesi, kohv, 1 pudel Vino Nobile di Montepulciano või Vermentino di Gallura veini iga 4 täiskasvanu kohta, kesköine prosecco, traditsiooniline cotechino läätsedega ja DJ-sett kuni kella 03:00-ni. Kirjutage meile WhatsAppis +39 351 912 7047 mugavate perelaudade, lastetoolide ja lastele sobivate lihtsate köögikohanduste kokkuleppimiseks.",
    "music": "Rõõmus elav Itaalia Cena Cantata vanematele, lastele ja noortele · Kesköine loendus ja DJ-sett kuni 03:00",
    "dress": "Pidulik ja mugav aastavahetuse riietus täiskasvanutele ning lastele",
    "priceSum": "Ametlik ühtne hind 75 € inimese kohta · Serveeritud õhtusöök + Vein (1 pdl / 4 täiskasvanut) + Pere Cena Cantata + DJ",
    "tierLabel": "Perede ja gruppide serveeritud aastavahetuse õhtusöök + Cena Cantata + DJ-sett (alates 20:30)",
    "tierPrice": "75 € inimese kohta",
    "tierDesc": "Reserveeritud laud kogu ööks koos neljakäigulise serveeritud menüüga (mere- ja maa-eelroogade kolmik, Carnaroli risoto puravike ja safraniga, laavakivil küpsetatud veise-ribeye värske kartuliga, pandoro-tiramisù šokolaaditükikestega), vee, kohvi, 1 pudeli Montepulciano või Vermentino veiniga 4 täiskasvanu kohta, kesköise prosecco ja läätsede ning DJ-setiga. Perelauad, söögitoolid ja lihtsad lastepärased muudatused köögis WhatsAppi +39 351 912 7047 kaudu.",
    "highlights": [
      "Soe ja mugav aastavahetus lastega peredele aadressil Bastioni di Porta Nuova 9 koos kindla lauaga kogu õhtuks",
      "Kinnitatud ametlik ühtne hind 75 € inimese kohta: 4 serveeritud käiku, vesi, kohv ja kesköised õnneläätsed",
      "Hinnas 1 pudel Montepulciano või Vermentino veini iga 4 täiskasvanu kohta ja kesköine prosecco tervitusjook",
      "Otsesuhtlus WhatsAppis +39 351 912 7047 avarate perelaudade, lastetoolide ja lastesõbralike roogade korraldamiseks"
    ],
    "source": "Carlsberg Øl Milano ametlikult kinnitatud 2027. aasta menüü ja hinnakiri (Bastioni di Porta Nuova 9, 31. detsember 2026 kell 20:30–03:00): peresõbralik serveeritud õhtusöök koos Cena Cantata ja DJ-setiga ühtse hinnaga 75 € inimese kohta, 1 pudel veini 4 täiskasvanu kohta, vesi, kohv, prosecco ja läätsed. Perelauad ja lastetoolid WhatsAppis +39 351 912 7047.",
    "steps": [
      "20:30 Uste avamine aadressil Bastioni di Porta Nuova 9 ja mugav istumine broneeritud perelaudadesse",
      "21:00 Neljakäiguline serveeritud vana-aasta õhtusöök elava ja kaasahaarava Itaalia Cena Cantata saatel",
      "00:00 Ühine uue aasta vastuvõtmine, täiskasvanute prosecco-tost ja traditsiooniline cotechino läätsedega",
      "00:30 – 03:00 Uusaastapidu DJ-muusikaga, kus pere laud jääb kogu ööks teie kasutusse"
    ],
    "menuTitle": "Ametlik pere aastavahetuse menüü 2027 · Cena Cantata ja DJ (75 €)",
    "menuBev": "75 € hinna sees: mineraalvesi, kohv, 1 pudel Vino Nobile di Montepulciano või Vermentino di Gallura veini iga 4 täiskasvanu kohta ning kesköine prosecco täiskasvanutele koos cotechino ja läätsedega. Lihtsad köögimuudatused lastele, noortele või allergikutele kokkuleppel WhatsAppis +39 351 912 7047.",
    "courseLabels": [
      "Eelroog",
      "Esimene käik",
      "Pearoog",
      "Magustoit",
      "Kesköö traditsioon"
    ],
    "dishes": [
      "Veneetsia moodi gratineeritud kammkarbid, Patanegra singiga kartulikroketid vardas ja Parmigiano korvike puntarelle, burrata ning Kantaabria anšoovistega",
      "Carnaroli risoto puravike ja ehtsate safraniniitidega",
      "Laavakivil grillitud veise-ribeye chimichurri kastme ja röstitud värskete kartulitega",
      "Pühadehõnguline pandoro-tiramisù tumeda šokolaadi tilkadega",
      "Traditsiooniline cotechino õnneläätsedega ja klaas proseccot uue aasta tervituseks"
    ],
    "faqs": [
      [
        "Miks sobib Carlsberg Øl Milano hästi laste ja noortega peredele vana-aastaõhtuks?",
        "Avarad võlvsaalid tagavad kogu perele rahuliku oma laua terveks õhtuks, ühendades korraliku teenindusega õhtusöögi ja rõõmsa Itaalia elava muusika."
      ],
      [
        "Milline on ametlik hind ja kas lastele saab tellida lastetoole või lihtsamaid roogasid?",
        "Restorani ametlikult kinnitatud piletihind on ühtne 75 € inimese kohta. Broneerimisel WhatsAppis +39 351 912 7047 paneme valmis mugava perelaua, lastetoolid ja köögis lihtsad muudatused lastele või allergikutele."
      ],
      [
        "Mis täpselt kuulub 75 € hinna sisse?",
        "Hind sisaldab lauda alates 20:30, nelja serveeritud käiku, vett, kohvi, 1 pudelit Montepulciano või Vermentino veini 4 täiskasvanu kohta, kesköist proseccot ja läätsi, elavat Cena Cantatat ja DJ-setti kuni 03:00-ni."
      ],
      [
        "Kuidas perega mugavalt kohale tulla ja lauda broneerida?",
        "Restoran asub Bastioni di Porta Nuova 9, Piazza XXV Aprile ja Corso Como kõrval, 5 minuti jalutuskäigu kaugusel M2 Moscova ja M2/M5 Porta Garibaldi metroost. Broneerimine WhatsAppis +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Pere aastavahetuse 2027 ajakava",
    "menusHeading": "Ametlik 75 € menüü (vein hinnas)",
    "conditionsHeading": "Peremugavused, hinnas sisalduv ja Porta Nuova asukoht"
  },
  "fi": {
    "nyeTitle": "Perheen uusivuosi 2027",
    "milano": "Milano",
    "dec31": "Torstai 31. joulukuuta 2026",
    "title": "Perheystävällinen uusivuosi 2027 Carlsberg Øl Milanossa · Illallinen, Cena Cantata & DJ (75 €)",
    "sub": "Carlsberg Øl Milano · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Yhtenäishinta 75 € · Sopii perheille",
    "desc": "Juhli vuodenvaihdetta 2027 koko perheen voimin Carlsberg Øl Milanon tilavissa historiallisissa tiiliholvisaleissa osoitteessa Bastioni di Porta Nuova 9 (Porta Nuovan / Corso Comon alue, 5 minuutin kävelymatka M2 Moscova- ja M2/M5 Porta Garibaldi -metroasemilta). Oma pöytä pysyy varattuna seurueellenne koko illan virallisesti vahvistetulla 75 € hengen yhtenäishinnalla: luvassa on neljän ruokalajin pöytiin tarjoiltu juhlaillallinen, hyväntuulinen italialainen Cena Cantata -lauluilta vanhemmille, lapsille ja nuorille, kivennäisvesi, kahvi, 1 pullo Vino Nobile di Montepulciano- tai Vermentino di Gallura -viiniä jokaista 4 aikuista kohden, keskiyön prosecco-malja, perinteinen cotechino linsseineen sekä DJ-musiikkia klo 03:00 asti. Viestitä meille WhatsAppissa +39 351 912 7047, niin järjestämme väljät perhepöydät, syöttötuolit ja yksinkertaiset keittiömuokkaukset lapsille ja nuorille.",
    "music": "Iloinen italialainen live-Cena Cantata vanhemmille, lapsille ja nuorille · Keskiyön lähtölaskenta & DJ klo 03:00 asti",
    "dress": "Juhlava ja mukava uudenvuoden pukeutuminen aikuisille ja lapsille",
    "priceSum": "Virallinen yhtenäishinta 75 € / hlö · Tarjoiltu illallinen + Viini (1 plo / 4 aikuista) + Perheiden Cena Cantata + DJ",
    "tierLabel": "Perheiden ja ryhmien tarjoiltu uudenvuoden illallinen + Cena Cantata + DJ-setti (klo 20:30 alkaen)",
    "tierPrice": "75 € per henkilö",
    "tierDesc": "Oma varattu pöytä koko illaksi ja neljän ruokalajin pöytiin tarjoiltu menu (meren ja maan alkuruokatrio, Carnaroli-risotto herkkutateilla ja sahramilla, laavakivellä paistettu naudan ribeye varhaisperunoilla, pandoro-tiramisù suklaapisaroilla), vesi, kahvi, 1 pullo Montepulciano- tai Vermentino-viiniä 4 aikuista kohden, keskiyön prosecco ja linssit sekä DJ-setti. Perhepöydät, syöttötuolit ja lasten yksinkertaiset annosmuokkaukset WhatsAppista +39 351 912 7047.",
    "highlights": [
      "Lämminhenkinen ja vaivaton uudenvuodenaatto lapsiperheille osoitteessa Bastioni di Porta Nuova 9 omassa pöydässä koko illan",
      "Vahvistettu virallinen 75 € yhtenäishinta sisältäen 4 tarjoiltua ruokalajia, veden, kahvin ja keskiyön linssit",
      "Hintaan kuuluu 1 pullo Montepulciano- tai Vermentino-viiniä 4 aikuista kohden sekä keskiyön prosecco-malja",
      "Suora apu WhatsAppissa +39 351 912 7047 perhepöytien, syöttötuolien ja lasten ruokatoiveiden järjestämiseen"
    ],
    "source": "Carlsberg Øl Milanon vahvistettu virallinen 2027 uudenvuoden menu ja hinnasto (Bastioni di Porta Nuova 9, 31.12.2026 klo 20:30–03:00): perheystävällinen tarjoiltu illallinen, Cena Cantata ja DJ-setti yhtenäishintaan 75 € / hlö sis. 1 viinipullon 4 aikuista kohden, veden, kahvin, proseccon ja linssit. Perhepöydät ja syöttötuolit WhatsApp +39 351 912 7047.",
    "steps": [
      "20:30 Ovet avautuvat osoitteessa Bastioni di Porta Nuova 9 ja rauhallinen asettuminen varattuihin perhepöytiin",
      "21:00 Neljän ruokalajin tarjoiltu juhlaillallinen elävän italialaisen Cena Cantata -musiikin säestyksellä",
      "00:00 Koko perheen yhteinen vuodenvaihteen laskenta, aikuisten prosecco-malja ja cotechino linssien kera",
      "00:30 – 03:00 Uudenvuoden juhlat ja DJ-setti oman perhepöydän säilyessä käytössänne loppuun asti"
    ],
    "menuTitle": "Virallinen perheiden uudenvuoden menu 2027 · Cena Cantata & DJ (75 €)",
    "menuBev": "75 € hintaan sisältyy: kivennäisvesi, kahvi, 1 pullo Vino Nobile di Montepulciano- tai Vermentino di Gallura -viiniä jokaista 4 aikuista kohden sekä keskiyön prosecco-lasillinen aikuisille cotechinon ja linssien kera. Yksinkertaiset keittiömuokkaukset lapsille, nuorille tai allergikoille ennakkoon WhatsAppissa +39 351 912 7047.",
    "courseLabels": [
      "Alkuruoka",
      "Ensimmäinen ruokalaji",
      "Pääruoka",
      "Jälkiruoka",
      "Keskiyön perinne"
    ],
    "dishes": [
      "Venetsialaiseen tapaan gratinoidut kampasimpukat, Patanegra-perunakroketit vartaassa ja Parmigiano-kori puntarellen, burratan sekä Kantabrian sardellien kera",
      "Carnaroli-risotto herkkutateilla ja aidoilla sahraminluoteilla",
      "Laavakivellä grillattu naudan ribeye chimichurri-kastikkeen ja paahdettujen varhaisperunoiden kera",
      "Juhlava pandoro-tiramisù tummilla suklaapisaroilla",
      "Perinteinen italialainen cotechino onnenlinsseillä ja lasillinen proseccoa maljannostoon"
    ],
    "faqs": [
      [
        "Miksi Carlsberg Øl Milano sopii erityisen hyvin lapsiperheille uudenvuodenaattona?",
        "Avarat holvisalit takaavat koko perheelle oman rauhallisen pöydän koko illaksi, ja pöytiin tarjoiltu illallinen yhdistyy iloiseen italialaiseen yhteislauluun ilman yökerhoruuhkaa."
      ],
      [
        "Mikä on virallinen hinta, ja saako lapsille syöttötuoleja tai yksinkertaisempia annoksia?",
        "Ravintolan virallisesti vahvistettu hinta on yhtenäinen 75 € per henkilö. Kun laitat varauksen yhteydessä viestin WhatsAppiin +39 351 912 7047, järjestämme mukavan perhepöydän, syöttötuolit ja yksinkertaiset muokkaukset annoksiin lapsille tai allergioihin."
      ],
      [
        "Mitä kaikkea 75 € henkilöhintaan sisältyy?",
        "Hintaan kuuluvat varattu pöytä klo 20:30 alkaen, neljä tarjoiltua ruokalajia, vesi, kahvi, 1 pullo Montepulciano- tai Vermentino-viiniä 4 aikuista kohden, keskiyön prosecco ja linssit, live-Cena Cantata sekä DJ klo 03:00 saakka."
      ],
      [
        "Miten paikalle pääsee helposti perheen kanssa ja kuinka varaus tehdään?",
        "Ravintola sijaitsee osoitteessa Bastioni di Porta Nuova 9 aivan Piazza XXV Aprilen ja Corso Comon vieressä, 5 minuutin kävelymatkan päässä M2 Moscova- ja M2/M5 Porta Garibaldi -asemista. Varaa WhatsAppissa +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Perheiden uudenvuoden 2027 aikataulu",
    "menusHeading": "Virallinen 75 € menu (viini sisältyy)",
    "conditionsHeading": "Perhepalvelut, hintaan sisältyvät edut & saapuminen"
  },
  "el": {
    "nyeTitle": "Οικογενειακή Πρωτοχρονιά 2027",
    "milano": "Μιλάνο",
    "dec31": "Πέμπτη 31 Δεκεμβρίου 2026",
    "title": "Οικογενειακό Ρεβεγιόν 2027 στο Carlsberg Øl Μιλάνο · Δείπνο, Cena Cantata & DJ (75 €)",
    "sub": "Carlsberg Øl Μιλάνο · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Ενιαία τιμή 75 € · Ιδανικό για οικογένειες",
    "desc": "Υποδεχθείτε το 2027 με όλη την οικογένεια κάτω από τις ευρύχωρες ιστορικές τούβλινες καμάρες του Carlsberg Øl Μιλάνο στην οδό Bastioni di Porta Nuova 9 (περιοχή Porta Nuova / Corso Como, 5 λεπτά με τα πόδια από τους σταθμούς μετρό M2 Moscova και M2/M5 Porta Garibaldi). Το τραπέζι σας παραμένει κρατημένο για όλη τη βραδιά στην επίσημα επιβεβαιωμένη ενιαία τιμή των 75 € ανά άτομο: περιλαμβάνει σερβιριστό εορταστικό δείπνο τεσσάρων πιάτων, χαρούμενη ζωντανή ιταλική μουσική βραδιά Cena Cantata κατάλληλη για γονείς, παιδιά και εφήβους, μεταλλικό νερό, καφέ, 1 φιάλη κρασί Vino Nobile di Montepulciano ή Vermentino di Gallura ανά 4 ενήλικες, πρόποση με prosecco τα μεσάνυχτα, παραδοσιακό cotechino με φακές και DJ set έως τις 03:00. Στείλτε μας μήνυμα στο WhatsApp +39 351 912 7047 για άνετα οικογενειακά τραπέζια, παιδικά καρεκλάκια και απλές προσαρμογές πιάτων στην κουζίνα για παιδιά.",
    "music": "Χαρούμενη ζωντανή ιταλική Cena Cantata για γονείς, παιδιά και εφήβους · Αντίστροφη μέτρηση & DJ set έως τις 03:00",
    "dress": "Κομψό και άνετο γιορτινό ντύσιμο για ενήλικες και παιδιά",
    "priceSum": "Επίσημη ενιαία τιμή 75 € ανά άτομο · Σερβιριστό δείπνο + Κρασί (1 φιάλη / 4 ενήλικες) + Οικογενειακή Cena Cantata + DJ",
    "tierLabel": "Οικογενειακό Σερβιριστό Ρεβεγιόν Πρωτοχρονιάς + Cena Cantata + DJ Set (από 20:30)",
    "tierPrice": "75 € ανά άτομο",
    "tierDesc": "Κρατημένο τραπέζι για όλη τη νύχτα με πλήρες σερβιριστό μενού τεσσάρων σταδίων (τριπλό ορεκτικό θαλασσινών και αλλαντικών, ριζότο Carnaroli με μανιτάρια porcini και κρόκο Κοζάνης/σαφράν, μοσχαρίσιο ribeye στη λάβα με φρέσκες πατάτες, γιορτινό τιραμισού pandoro με σταγόνες σοκολάτας), νερό, καφέ, 1 φιάλη κρασί Montepulciano ή Vermentino ανά 4 ενήλικες, prosecco και φακές τα μεσάνυχτα, καθώς και DJ set. Οικογενειακή διάταξη τραπεζιών, παιδικά καρεκλάκια και απλές παιδικές παραλλαγές μέσω WhatsApp +39 351 912 7047.",
    "highlights": [
      "Φιλόξενο και άνετο ρεβεγιόν για οικογένειες με παιδιά και εφήβους στη Bastioni di Porta Nuova 9 με δικό σας τραπέζι όλο το βράδυ",
      "Επιβεβαιωμένη επίσημη ενιαία τιμή 75 € ανά άτομο με 4 σερβιριστά πιάτα, νερό, καφέ και το έθιμο των μεσονυχτίων",
      "Περιλαμβάνεται 1 φιάλη κρασί Montepulciano ή Vermentino ανά 4 ενήλικες και ποτήρι prosecco στην αλλαγή του χρόνου",
      "Άμεση συνεννόηση στο WhatsApp +39 351 912 7047 για μεγάλα οικογενειακά τραπέζια, καρεκλάκια μωρού και απλές προσαρμογές για παιδιά"
    ],
    "source": "Επίσημα επιβεβαιωμένο μενού και τιμοκατάλογος 2027 του Carlsberg Øl Μιλάνο (Bastioni di Porta Nuova 9, 31 Δεκεμβρίου 2026, 20:30–03:00): οικογενειακό σερβιριστό δείπνο με Cena Cantata και DJ set στην ενιαία τιμή των 75 € ανά άτομο, 1 φιάλη κρασί ανά 4 ενήλικες, νερό, καφέ, prosecco και φακές. Οικογενειακά τραπέζια και παιδικά καρεκλάκια στο WhatsApp +39 351 912 7047.",
    "steps": [
      "20:30 Άνοιγμα θυρών στη Bastioni di Porta Nuova 9 και άνετη τακτοποίηση στα κρατημένα οικογενειακά τραπέζια",
      "21:00 Σερβιριστό δείπνο τεσσάρων πιάτων με ζωντανά ιταλικά τραγούδια Cena Cantata για μικρούς και μεγάλους",
      "00:00 Οικογενειακή αντίστροφη μέτρηση, πρόποση με prosecco για τους ενήλικες και παραδοσιακό cotechino με φακές",
      "00:30 – 03:00 Πρωτοχρονιάτικη γιορτή με DJ set διατηρώντας το οικογενειακό σας τραπέζι όλη τη βραδιά"
    ],
    "menuTitle": "Επίσημο Οικογενειακό Μενού Πρωτοχρονιάς 2027 · Cena Cantata & DJ (75 €)",
    "menuBev": "Στην τιμή των 75 € περιλαμβάνονται: μεταλλικό νερό, καφές, 1 φιάλη Vino Nobile di Montepulciano ή Vermentino di Gallura ανά 4 ενήλικες και ποτήρι prosecco τα μεσάνυχτα με cotechino και φακές. Απλές προσαρμογές πιάτων στην κουζίνα για παιδιά, εφήβους ή αλλεργίες κατόπιν συνεννόησης στο WhatsApp +39 351 912 7047.",
    "courseLabels": [
      "Ορεκτικό",
      "Πρώτο Πιάτο",
      "Κυρίως Πιάτο",
      "Επιδόρπιο",
      "Παράδοση Μεσονυχτίων"
    ],
    "dishes": [
      "Χτένια ογκρατέν αλά βενετσιάνα, κροκέτες πατάτας με ζαμπόν Patanegra σε ξυλάκι και καλαθάκι παρμεζάνας με puntarelle, burrata και αντζούγιες Κανταβρίας",
      "Ριζότο Carnaroli με βασιλομανίταρα porcini και στήμονες σαφράν",
      "Μοσχαρίσιο ribeye ψημένο σε πέτρα λάβας με σάλτσα chimichurri και ψητές φρέσκες πατάτες",
      "Γιορτινό τιραμισού με χριστουγεννιάτικο pandoro και σταγόνες μαύρης σοκολάτας",
      "Παραδοσιακό ιταλικό cotechino με φακές καλοτυχίας και ποτήρι prosecco για την πρόποση"
    ],
    "faqs": [
      [
        "Γιατί το Carlsberg Øl Μιλάνο ταιριάζει ιδιαίτερα σε οικογένειες με παιδιά την παραμονή Πρωτοχρονιάς;",
        "Οι άνετες θολωτές αίθουσες εξασφαλίζουν δικό σας σταθερό τραπέζι για όλη τη βραδιά, συνδυάζοντας προσεγμένο σερβιριστό φαγητό με ζωντανή χαρούμενη μουσική χωρίς συνωστισμό."
      ],
      [
        "Ποια είναι η επίσημη τιμή και υπάρχουν παιδικά καρεκλάκια ή πιο απλά πιάτα για τα παιδιά;",
        "Η επίσημα επιβεβαιωμένη τιμή του καταστήματος είναι ενιαία στα 75 € ανά άτομο. Επικοινωνώντας μαζί μας στο WhatsApp +39 351 912 7047 κατά την κράτηση, φροντίζουμε για άνετα οικογενειακά τραπέζια, παιδικά καρεκλάκια και απλές προσαρμογές στην κουζίνα."
      ],
      [
        "Τι ακριβώς περιλαμβάνει η τιμή των 75 € ανά άτομο;",
        "Περιλαμβάνει κρατημένο τραπέζι από τις 20:30, τέσσερα σερβιριστά πιάτα, νερό, καφέ, 1 φιάλη κρασί Montepulciano ή Vermentino ανά 4 ενήλικες, prosecco και φακές τα μεσάνυχτα, ζωντανή Cena Cantata και DJ set έως τις 03:00."
      ],
      [
        "Πώς θα φτάσουμε εύκολα με την οικογένεια και πώς γίνεται η κράτηση;",
        "Το εστιατόριο βρίσκεται στη Bastioni di Porta Nuova 9 δίπλα στην Piazza XXV Aprile και το Corso Como, 5 λεπτά με τα πόδια από το μετρό M2 Moscova και M2/M5 Porta Garibaldi. Κρατήσεις στο WhatsApp +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Πρόγραμμα Οικογενειακού Ρεβεγιόν 2027",
    "menusHeading": "Επίσημο Μενού 75 € (Κρασί Περιλαμβάνεται)",
    "conditionsHeading": "Παροχές για Οικογένειες & Πρόσβαση στην Porta Nuova"
  },
  "hu": {
    "nyeTitle": "Családi Szilveszter 2027",
    "milano": "Milánó",
    "dec31": "2026. december 31., csütörtök",
    "title": "Családi Szilveszter 2027 a Carlsberg Øl Milánóban · Vacsora, Cena Cantata és DJ (75 €)",
    "sub": "Carlsberg Øl Milánó · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Egységes ár 75 € · Családbarát",
    "desc": "Köszöntse a 2027-es új évet az egész családdal a Carlsberg Øl Milánó tágas, történelmi téglaboltozatos termeiben, a Bastioni di Porta Nuova 9 szám alatt (Porta Nuova / Corso Como negyed, 5 perc sétára az M2 Moscova és az M2/M5 Porta Garibaldi metróállomásoktól). Asztaluk egész estére foglalt marad a hivatalosan megerősített, fejenként 75 €-s egységes áron: négyfogásos, felszolgált ünnepi vacsora, szülőknek, gyerekeknek és kamaszoknak egyaránt élvezetes, vidám élő olasz Cena Cantata műsor, ásványvíz, kávé, 4 felnőttenként 1 üveg Vino Nobile di Montepulciano vagy Vermentino di Gallura bor, éjfélkor prosecco koccintás, hagyományos lencse cotechinóval, majd DJ-szett 03:00 óráig. Írjon nekünk WhatsAppon a +39 351 912 7047 számon kényelmes családi asztalok, etetőszékek és gyerekeknek szóló egyszerű konyhai módosítások egyeztetéséhez.",
    "music": "Vidám élő olasz Cena Cantata szülőknek, gyerekeknek és tiniknek · Éjféli visszaszámlálás és DJ-szett 03:00-ig",
    "dress": "Elegáns és kényelmes ünnepi viselet felnőtteknek és gyerekeknek",
    "priceSum": "Hivatalos egységes ár: 75 € / fő · Felszolgált vacsora + Bor (4 felnőttenként 1 üveg) + Családi Cena Cantata + DJ",
    "tierLabel": "Családi és csoportos felszolgált szilveszteri vacsora + Cena Cantata + DJ-szett (20:30-tól)",
    "tierPrice": "75 € / fő",
    "tierDesc": "Saját foglalt asztal egész éjszakára négyfogásos felszolgált menüvel (háromrészes tengeri és szárazföldi előétel, vargányás és sáfrányos Carnaroli rizottó, lávakövön sült marha ribeye újburgonyával, csokoládécseppes pandoro tiramisù), vízzel, kávéval, 4 felnőttenként 1 üveg Montepulciano vagy Vermentino borral, éjféli proseccóval és lencsével, valamint DJ-szettel. Családi asztalelrendezés, etetőszék és egyszerű gyermekbarát fogások a +39 351 912 7047 WhatsApp-számon kérhetők.",
    "highlights": [
      "Barátságos, kényelmes szilveszter gyerekes családoknak a Bastioni di Porta Nuova 9 alatt, egész este saját asztallal",
      "Megerősített hivatalos 75 € / fő egységes ár 4 felszolgált fogással, vízzel, kávéval és éjféli szerencselencsével",
      "4 felnőttenként 1 üveg Montepulciano vagy Vermentino bor, valamint éjféli prosecco koccintás az árban",
      "Közvetlen egyeztetés WhatsAppon (+39 351 912 7047) tágas családi asztalokhoz, etetőszékekhez és gyerekbarát konyhai kérésekhez"
    ],
    "source": "A Carlsberg Øl Milánó hivatalosan visszaigazolt 2027-es menüje és árlistája (Bastioni di Porta Nuova 9, 2026. december 31., 20:30–03:00): családbarát felszolgált vacsora Cena Cantata műsorral és DJ-szettel 75 € / fő egységes áron, 4 felnőttenként 1 üveg borral, vízzel, kávéval, proseccóval és lencsével. Családi asztalok és etetőszékek: WhatsApp +39 351 912 7047.",
    "steps": [
      "20:30 Kapunyitás a Bastioni di Porta Nuova 9 alatt és kényelmes helyfoglalás a lefoglalt családi asztaloknál",
      "21:00 Négyfogásos felszolgált szilveszteri vacsora élő, jó hangulatú olasz Cena Cantata dalokkal",
      "00:00 Közös családi visszaszámlálás éjfélkor, prosecco a felnőtteknek és hagyományos cotechino lencsével",
      "00:30 – 03:00 Újévi ünneplés DJ-szettel úgy, hogy a család asztala végig megmarad"
    ],
    "menuTitle": "Hivatalos Családi Szilveszteri Menü 2027 · Cena Cantata és DJ (75 €)",
    "menuBev": "A 75 €-s ár tartalmazza: ásványvíz, kávé, 4 felnőttenként 1 üveg Vino Nobile di Montepulciano vagy Vermentino di Gallura bor, valamint éjfélkor egy pohár prosecco a felnőtteknek cotechinóval és lencsével. Gyermekeknek, kamaszoknak vagy ételérzékenyeknek egyszerű konyhai módosítások kérhetők előre a +39 351 912 7047 WhatsApp-számon.",
    "courseLabels": [
      "Előétel",
      "Első fogás",
      "Főétel",
      "Desszert",
      "Éjféli hagyomány"
    ],
    "dishes": [
      "Velencei módra gratinírozott Szent Jakab-kagyló, Patanegra sonkás burgonyakrokett nyárson és Parmigiano kosárka puntarellével, burratával és kantábriai szardellával",
      "Carnaroli rizottó erdei vargányával és valódi sáfránybibével",
      "Lávakövön sült marha ribeye chimichurri mártással és sült újburgonyával",
      "Ünnepi pandoro tiramisù étcsokoládé-cseppekkel",
      "Hagyományos olasz cotechino szerencsehozó újévi lencsével és egy pohár proseccóval"
    ],
    "faqs": [
      [
        "Miért ideális választás a Carlsberg Øl Milánó gyerekes és kamaszos családoknak szilveszterkor?",
        "A tágas boltozatos termekben a család egész este saját, kényelmes asztalnál ülhet, ahol a felszolgált ünnepi vacsora és a barátságos élő olasz zene zsúfoltság nélkül élvezhető."
      ],
      [
        "Mennyi a hivatalos ár, és kérhető etetőszék vagy egyszerűbb fogás a gyerekeknek?",
        "Az étterem hivatalosan megerősített díja egységesen 75 € személyenként. Foglaláskor a +39 351 912 7047 WhatsApp-számon jelezheti igényét kényelmes családi asztalra, etetőszékre és egyszerűbb gyermek- vagy allergénmentes fogásokra."
      ],
      [
        "Mit tartalmaz pontosan a fejenkénti 75 €-s ár?",
        "Tartalmazza a foglalt asztalt 20:30-tól, a négy felszolgált fogást, a vizet és kávét, 4 felnőttenként 1 üveg Montepulciano vagy Vermentino bort, az éjféli proseccót és lencsét, az élő Cena Cantatát és a DJ-szettet 03:00-ig."
      ],
      [
        "Hogyan közelíthető meg könnyen családdal, és hogyan lehet foglalni?",
        "Az étterem a Bastioni di Porta Nuova 9 alatt található a Piazza XXV Aprile és a Corso Como mellett, 5 perc sétára az M2 Moscova és az M2/M5 Porta Garibaldi metrótól. Foglalás: WhatsApp +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Családi Szilveszter 2027 Programterv",
    "menusHeading": "Hivatalos 75 € Menü (Borral Együtt)",
    "conditionsHeading": "Családbarát Szolgáltatások, Tartalom és Megközelítés"
  },
  "ga": {
    "nyeTitle": "Oíche Chinn Bliana Teaghlaigh 2027",
    "milano": "Milano",
    "dec31": "Déardaoin, 31 Nollaig 2026",
    "title": "Oíche Chinn Bliana 2027 do Theaghlaigh ag Carlsberg Øl Milano · Dinnéar, Cena Cantata & DJ (75 €)",
    "sub": "Carlsberg Øl Milano · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Ráta aonair 75 € · Oiriúnach do theaghlaigh",
    "desc": "Cuir fáilte roimh 2027 leis an teaghlach ar fad faoi na boghtaí stairiúla brící i Carlsberg Øl Milano ag Bastioni di Porta Nuova 9 (ceantar Porta Nuova / Corso Como, siúlóid 5 nóiméad ó stáisiúin mheitreo M2 Moscova agus M2/M5 Porta Garibaldi). Fanann do bhord in áirithe don oíche ar fad ar an ráta oifigiúil deimhnithe de 75 € an duine: dinnéar ceithre chúrsa seirbheáilte ag an mbord, ceol beo meidhreach Iodálach Cena Cantata a thaitníonn le tuismitheoirí, páistí agus déagóirí araon, uisce mianraí, caife, 1 bhuidéal fíona Vino Nobile di Montepulciano nó Vermentino di Gallura in aghaidh gach 4 dhuine fásta, gloine prosecco ag meán oíche le cotechino traidisiúnta agus linteoga, chomh maith le seit DJ go dtí 03:00. Seol teachtaireacht chugainn ar WhatsApp +39 351 912 7047 chun boird chompordacha teaghlaigh, cathaoireacha arda agus mionathruithe simplí cistine do pháistí a shocrú.",
    "music": "Ceol beo meidhreach Cena Cantata do thuismitheoirí, páistí agus déagóirí · Comhaireamh síos & DJ go dtí 03:00",
    "dress": "Feisteas galánta compordach Oíche Chinn Bliana do dhaoine fásta agus do pháistí",
    "priceSum": "Ráta oifigiúil aonair 75 € an duine · Dinnéar seirbheáilte + Fíon (1 bhuidéal / 4 dhuine fásta) + Cena Cantata + DJ",
    "tierLabel": "Dinnéar Oíche Chinn Bliana do Theaghlaigh & Grúpaí + Cena Cantata + Seit DJ (ó 20:30)",
    "tierPrice": "75 € an duine",
    "tierDesc": "Bord curtha in áirithe don oíche ar fad le biachlár ceithre chúrsa (tríréad réamhchúrsa mara agus tíre, risotto Carnaroli le beacáin porcini agus cróch, ribeye mairteola ar chloch laibhe le prátaí nua, tiramisù pandoro le braonta seacláide), uisce, caife, 1 bhuidéal fíona Montepulciano nó Vermentino in aghaidh 4 dhuine fásta, prosecco agus linteoga ag meán oíche, agus DJ. Boird theaghlaigh, cathaoireacha arda agus roghanna simplí cistine do pháistí trí WhatsApp +39 351 912 7047.",
    "highlights": [
      "Oíche Chinn Bliana fháilteach do theaghlaigh le páistí agus déagóirí ag Bastioni di Porta Nuova 9 le bord don oíche go léir",
      "Ráta oifigiúil deimhnithe aonair de 75 € an duine le 4 chúrsa seirbheáilte, uisce, caife agus linteoga meán oíche",
      "1 bhuidéal fíona Montepulciano nó Vermentino san áireamh do gach 4 dhuine fásta móide prosecco ag meán oíche",
      "Cúnamh díreach ar WhatsApp +39 351 912 7047 do bhoird mhóra theaghlaigh, cathaoireacha arda agus miasa simplí do pháistí"
    ],
    "source": "Biachlár agus ráta oifigiúil deimhnithe 2027 Carlsberg Øl Milano (Bastioni di Porta Nuova 9, 31 Nollaig 2026, 20:30–03:00): dinnéar teaghlaigh le Cena Cantata agus seit DJ ar 75 € an duine, 1 bhuidéal fíona do gach 4 dhuine fásta, uisce, caife, prosecco agus linteoga. Boird theaghlaigh agus cathaoireacha arda trí WhatsApp +39 351 912 7047.",
    "steps": [
      "20:30 Doirse ar oscailt ag Bastioni di Porta Nuova 9 agus suí compordach ag na boird theaghlaigh in áirithe",
      "21:00 Dinnéar ceithre chúrsa Oíche Chinn Bliana in éineacht le hamhráin bheo Cena Cantata",
      "00:00 Comhaireamh síos meán oíche le chéile, sláinte prosecco do dhaoine fásta agus cotechino le linteoga",
      "00:30 – 03:00 Ceiliúradh na Bliana Nua le DJ fad is a fhanann bord an teaghlaigh agaibh"
    ],
    "menuTitle": "Biachlár Oifigiúil Teaghlaigh Oíche Chinn Bliana 2027 · Cena Cantata & DJ (75 €)",
    "menuBev": "San áireamh sa ráta 75 €: uisce mianraí, caife, 1 bhuidéal Vino Nobile di Montepulciano nó Vermentino di Gallura in aghaidh gach 4 dhuine fásta, agus gloine prosecco do dhaoine fásta ag meán oíche le cotechino agus linteoga. Mionathruithe simplí cistine do pháistí, déagóirí nó ailléirgí ar fáil trí WhatsApp +39 351 912 7047.",
    "courseLabels": [
      "Réamhchúrsa",
      "An Chéad Chúrsa",
      "Príomhchúrsa",
      "Milseog",
      "Traidisiún Mheán Oíche"
    ],
    "dishes": [
      "Muiríní gratin ar nós na Veinéise, croquettes prátaí Patanegra ar bhior agus ciseán Parmigiano le puntarelle, burrata agus ainseabhaithe Chantabria",
      "Risotto Carnaroli le beacáin porcini agus snáithíní cróich",
      "Ribeye mairteola ar chloch laibhe le hanlann chimichurri agus prátaí nua rósta",
      "Tiramisù pandoro Nollag le braonta seacláide dorcha",
      "Cotechino traidisiúnta na Bliana Nua le linteoga an áidh agus gloine prosecco"
    ],
    "faqs": [
      [
        "Cén fáth a bhfuil Carlsberg Øl Milano oiriúnach do theaghlaigh le páistí Oíche Chinn Bliana?",
        "Tugann na hallaí fairsinge boghtacha spás compordach ag bhur mbord féin ar feadh na hoíche, le dinnéar ceart seirbheáilte agus atmaisféar ceoil cairdiúil do gach aois."
      ],
      [
        "Cad é an praghas oifigiúil agus an féidir cathaoireacha arda nó miasa simplí do pháistí a iarraidh?",
        "Is ráta aonair deimhnithe 75 € an duine an praghas oifigiúil. Scríobh chugainn ar WhatsApp +39 351 912 7047 agus tú ag cur in áirithe chun boird theaghlaigh, cathaoireacha arda agus miasa oiriúnaithe do pháistí a eagrú."
      ],
      [
        "Cad atá san áireamh sa ticéad 75 € an duine?",
        "Bord in áirithe ó 20:30, ceithre chúrsa seirbheáilte, uisce, caife, 1 bhuidéal fíona Montepulciano nó Vermentino in aghaidh 4 dhuine fásta, prosecco agus linteoga ag meán oíche, Cena Cantata beo agus DJ go dtí 03:00."
      ],
      [
        "Conas is féidir teacht ann go héasca leis an teaghlach agus áirithint a dhéanamh?",
        "Tá an bhialann ag Bastioni di Porta Nuova 9 in aice le Piazza XXV Aprile agus Corso Como, siúlóid 5 nóiméad ó M2 Moscova agus M2/M5 Porta Garibaldi. Déan áirithint ar WhatsApp +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Clár Oíche Chinn Bliana Teaghlaigh 2027",
    "menusHeading": "Biachlár Oifigiúil 75 € (Fíon san Áireamh)",
    "conditionsHeading": "Áiseanna Teaghlaigh, Cad atá san Áireamh & Suíomh"
  },
  "lv": {
    "nyeTitle": "Ģimenes Jaungads 2027",
    "milano": "Milāna",
    "dec31": "Ceturtdiena, 2026. gada 31. decembris",
    "title": "Ģimenes Vecgada vakars 2027 restorānā Carlsberg Øl Milāna · Vakariņas, Cena Cantata un DJ (75 €)",
    "sub": "Carlsberg Øl Milāna · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Vienota cena 75 € · Draudzīgi ģimenēm",
    "desc": "Sagaidiet 2027. gadu kopā ar visu ģimeni plašajās vēsturiskajās ķieģeļu velvju zālēs restorānā Carlsberg Øl Milāna, Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como rajons, 5 minūšu gājienā no metro stacijām M2 Moscova un M2/M5 Porta Garibaldi). Jūsu galdiņš paliek rezervēts visu vakaru par oficiāli apstiprinātu vienotu cenu 75 € par personu: četru kārtu pie galda pasniegtas svētku vakariņas, sirsnīgs itāļu dzīvās mūzikas šovs Cena Cantata, kas piemērots vecākiem, bērniem un pusaudžiem, minerālūdens, kafija, 1 pudele Vino Nobile di Montepulciano vai Vermentino di Gallura vīna uz katriem 4 pieaugušajiem, pusnakts prosecco tosts, tradicionālais cotechino ar lēcām un DJ sets līdz plkst. 03:00. Rakstiet mums WhatsApp +39 351 912 7047, lai sarūpētu ērtus ģimenes galdus, bērnu barošanas krēsliņus un vienkāršas ēdienu variācijas bērniem un jauniešiem.",
    "music": "Dzīvespriecīga itāļu Cena Cantata dzīvā mūzika vecākiem, bērniem un jauniešiem · Pusnakts atskaite un DJ līdz 03:00",
    "dress": "Svētku un ērts Vecgada vakara apģērbs pieaugušajiem un bērniem",
    "priceSum": "Oficiāla vienota cena 75 € par personu · Pasniegtas vakariņas + Vīns (1 pud. / 4 pieaug.) + Ģimenes Cena Cantata + DJ",
    "tierLabel": "Ģimenēm un grupām pasniegtas Vecgada vakariņas + Cena Cantata + DJ sets (no 20:30)",
    "tierPrice": "75 € par personu",
    "tierDesc": "Rezervēts galdiņš visai naktij ar četru kārtu pasniegtu ēdienkarti (jūras un sauszemes uzkodu trio, Carnaroli risoto ar baravikām un safrānu, uz lavas akmens cepts liellopa ribeye ar jaunajiem kartupeļiem, svētku pandoro tiramisù ar šokolādes pilieniem), ūdeni, kafiju, 1 pudeli Montepulciano vai Vermentino vīna uz 4 pieaugušajiem, pusnakts prosecco ar lēcām un DJ setu. Ģimenes galdi, bērnu krēsliņi un vienkāršas bērnu ēdienu pielāgošanas caur WhatsApp +39 351 912 7047.",
    "highlights": [
      "Sirsnīgs un ērts Vecgada vakars ģimenēm ar bērniem un pusaudžiem Bastioni di Porta Nuova 9 ar savu galdiņu visu nakti",
      "Oficiāli apstiprināta vienota cena 75 € par personu ar 4 pasniegtām kārtām, ūdeni, kafiju un pusnakts lēcām",
      "Cenā iekļauta 1 pudele Montepulciano vai Vermentino vīna uz katriem 4 pieaugušajiem un prosecco glāze pusnaktī",
      "Tiešs atbalsts WhatsApp +39 351 912 7047 plašiem ģimenes galdiem, bērnu krēsliņiem un bērniem pielāgotiem ēdieniem"
    ],
    "source": "Carlsberg Øl Milāna oficiāli apstiprinātā 2027. gada ēdienkarte un cenrādis (Bastioni di Porta Nuova 9, 2026. gada 31. decembrī 20:30–03:00): ģimenēm piemērotas vakariņas ar Cena Cantata un DJ setu par vienotu cenu 75 € par personu, 1 vīna pudele uz 4 pieaugušajiem, ūdens, kafija, prosecco un lēcas. Ģimenes galdi un bērnu krēsliņi: WhatsApp +39 351 912 7047.",
    "steps": [
      "20:30 Durvju atvēršana Bastioni di Porta Nuova 9 un ērta iekārtošanās pie rezervētajiem ģimenes galdiņiem",
      "21:00 Četru kārtu Vecgada vakariņas dzīvespriecīgu itāļu dziesmu Cena Cantata pavadījumā",
      "00:00 Kopīga Jaunā gada sagaidīšana, prosecco tosts pieaugušajiem un tradicionālais cotechino ar lēcām",
      "00:30 – 03:00 Jaungada svinības ar DJ setu, saglabājot jūsu ģimenes galdiņu visas nakts garumā"
    ],
    "menuTitle": "Oficiālā ģimenes Vecgada ēdienkarte 2027 · Cena Cantata un DJ (75 €)",
    "menuBev": "75 € cenā iekļauts: minerālūdens, kafija, 1 pudele Vino Nobile di Montepulciano vai Vermentino di Gallura vīna uz katriem 4 pieaugušajiem un glāze prosecco pieaugušajiem pusnaktī kopā ar cotechino un lēcām. Vienkāršas virtuves korekcijas bērniem, pusaudžiem vai alerģiju gadījumā pieejamas, iepriekš sazinoties WhatsApp +39 351 912 7047.",
    "courseLabels": [
      "Uzkoda",
      "Pirmais ēdiens",
      "Pamatēdiens",
      "Deserts",
      "Pusnakts tradīcija"
    ],
    "dishes": [
      "Venēciešu gaumē gratinētas jūras ķemmītes, kartupeļu kroketes ar Patanegra šķiņķi uz iesmiņa un Parmigiano groziņš ar puntarelle, burratu un Kantabrijas anšoviem",
      "Carnaroli risoto ar baravikām un īstām safrāna drīksnām",
      "Uz lavas akmens grilēts liellopa ribeye steiks ar chimichurri mērci un ceptiem jaunajiem kartupeļiem",
      "Svētku pandoro tiramisù ar tumšās šokolādes pilieniem",
      "Tradicionālais Jaungada cotechino ar veiksmes lēcām un prosecco glāzi tostam"
    ],
    "faqs": [
      [
        "Kāpēc Carlsberg Øl Milāna ir lieliska izvēle ģimenēm ar bērniem Vecgada vakarā?",
        "Plašās velvju zāles nodrošina mierīgu sēdēšanu pie sava galdiņa visu vakaru, apvienojot kvalitatīvas pasniegtas vakariņas un sirsnīgu itāļu dzīvo mūziku visām paaudzēm."
      ],
      [
        "Kāda ir oficiālā cena un vai bērniem var lūgt bērnu krēsliņus vai vienkāršākus ēdienus?",
        "Restorāna oficiāli apstiprinātā maksa ir vienota 75 € par personu. Rezervējot caur WhatsApp +39 351 912 7047, sagatavosim ērtu ģimenes galdu, bērnu krēsliņus un vienkāršas ēdienu izmaiņas virtuvē bērniem vai alerģijām."
      ],
      [
        "Kas tieši ietilpst 75 € cenā par personu?",
        "Tajā ietilpst rezervēts galdiņš no plkst. 20:30, četras pasniegtas kārtas, ūdens, kafija, 1 pudele vīna uz 4 pieaugušajiem, pusnakts prosecco un lēcas, dzīvais Cena Cantata šovs un DJ sets līdz 03:00."
      ],
      [
        "Kā ērti nokļūt ar ģimeni un veikt rezervāciju?",
        "Restorāns atrodas Bastioni di Porta Nuova 9 blakus Piazza XXV Aprile un Corso Como, 5 minūšu gājienā no metro M2 Moscova un M2/M5 Porta Garibaldi. Rezervācijas WhatsApp: +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Ģimenes Jaungada 2027 programma",
    "menusHeading": "Oficiālā 75 € ēdienkarte (vīns iekļauts)",
    "conditionsHeading": "Ērtības ģimenēm, cenā iekļautais un atrašanās vieta"
  },
  "lt": {
    "nyeTitle": "Šeimos Naujieji metai 2027",
    "milano": "Milanas",
    "dec31": "Ketvirtadienis, 2026 m. gruodžio 31 d.",
    "title": "Šeimos Naujųjų metų sutikimas 2027 restorane Carlsberg Øl Milanas · Vakarienė, Cena Cantata ir DJ (75 €)",
    "sub": "Carlsberg Øl Milanas · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Vienoda kaina 75 € · Tinka šeimoms",
    "desc": "Sutikite 2027-uosius su visa šeima erdviose istorinėse plytų skliautų salėse restorane Carlsberg Øl Milane, adresu Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como rajonas, 5 minutės pėsčiomis nuo M2 Moscova ir M2/M5 Porta Garibaldi metro stočių). Jūsų staliukas lieka rezervuotas visam vakarui už oficialiai patvirtintą vienodą 75 € kainą asmeniui: keturių patiekalų prie stalo patiekiama šventinė vakarienė, nuotaikinga gyva itališka Cena Cantata programa tėvams, vaikams ir paaugliams, mineralinis vanduo, kava, 1 butelis Vino Nobile di Montepulciano arba Vermentino di Gallura vyno kas 4 suaugusiesiems, vidurnakčio prosecco taurė, tradicinis cotechino su lęšiais ir DJ programa iki 03:00. Parašykite mums per WhatsApp +39 351 912 7047 dėl patogių šeimos stalų, vaikiškų kėdučių ir paprastų virtuvės pakeitimų vaikams bei paaugliams.",
    "music": "Linksma gyva itališka Cena Cantata tėvams, vaikams ir paaugliams · Vidurnakčio skaičiavimas ir DJ iki 03:00",
    "dress": "Šventiškas ir patogus Naujųjų metų vakaro stilius suaugusiesiems ir vaikams",
    "priceSum": "Oficiali vienoda kaina 75 € asmeniui · Patiekiama vakarienė + Vynas (1 but. / 4 suaug.) + Šeimos Cena Cantata + DJ",
    "tierLabel": "Šeimų ir grupių patiekiama Naujųjų metų vakarienė + Cena Cantata + DJ programa (nuo 20:30)",
    "tierPrice": "75 € asmeniui",
    "tierDesc": "Rezervuotas staliukas visai nakčiai su keturių patiekalų meniu (jūros ir žemės užkandžių trio, Carnaroli rizotas su baravykais ir šafranu, ant lavos akmens keptas jautienos ribeye su šviežiomis bulvytėmis, šventinis pandoro tiramisù su šokolado lašeliais), vandeniu, kava, 1 buteliu Montepulciano arba Vermentino vyno 4 suaugusiesiems, vidurnakčio prosecco su lęšiais bei DJ programa. Šeimos stalai, vaikiškos kėdutės ir paprasti patiekalų pakeitimai vaikams derinami per WhatsApp +39 351 912 7047.",
    "highlights": [
      "Jaukus ir patogus Naujųjų metų vakaras šeimoms su vaikais ir paaugliais Bastioni di Porta Nuova 9 su savo stalu visą naktį",
      "Oficialiai patvirtinta vienoda 75 € kaina asmeniui: 4 patiekiami patiekalai, vanduo, kava ir vidurnakčio lęšiai",
      "Įskaičiuotas 1 butelis Montepulciano arba Vermentino vyno kas 4 suaugusiesiems ir prosecco taurė vidurnaktį",
      "Tiesioginė pagalba per WhatsApp +39 351 912 7047 ruošiant erdvius šeimos stalus, kėdutes ir paprastesnius patiekalus vaikams"
    ],
    "source": "Oficialiai patvirtintas Carlsberg Øl Milanas 2027 m. meniu ir kainoraštis (Bastioni di Porta Nuova 9, 2026 m. gruodžio 31 d., 20:30–03:00): šeimoms pritaikyta vakarienė su Cena Cantata ir DJ programa už vienodą 75 € kainą asmeniui, 1 vyno butelis 4 suaugusiesiems, vanduo, kava, prosecco ir lęšiai. Šeimos stalai ir kėdutės: WhatsApp +39 351 912 7047.",
    "steps": [
      "20:30 Durys atveriamos Bastioni di Porta Nuova 9 ir patogus įsikūrimas prie rezervuotų šeimos stalų",
      "21:00 Keturių patiekalų šventinė vakarienė skambant gyvoms itališkoms Cena Cantata dainoms",
      "00:00 Bendras šeimos vidurnakčio skaičiavimas, prosecco tostas suaugusiesiems ir tradicinis cotechino su lęšiais",
      "00:30 – 03:00 Naujametinis vakarėlis su DJ, išlaikant šeimos staliuką iki pat vakaro pabaigos"
    ],
    "menuTitle": "Oficialus šeimos Naujųjų metų 2027 meniu · Cena Cantata ir DJ (75 €)",
    "menuBev": "Į 75 € kainą įskaičiuota: mineralinis vanduo, kava, 1 butelis Vino Nobile di Montepulciano arba Vermentino di Gallura vyno kas 4 suaugusiesiems ir taurė prosecco suaugusiesiems vidurnaktį su cotechino ir lęšiais. Paprasti virtuvės pakeitimai vaikams, paaugliams ar alergiškiems svečiams suderinami per WhatsApp +39 351 912 7047.",
    "courseLabels": [
      "Užkandis",
      "Pirmasis patiekalas",
      "Pagrindinis patiekalas",
      "Desertas",
      "Vidurnakčio tradicija"
    ],
    "dishes": [
      "Venecijietiškai užkeptos šukutės, bulvių kroketai su Patanegra kumpiu ant iešmelio ir Parmigiano krepšelis su puntarelle, burrata bei Kantabrijos ančiuviais",
      "Carnaroli rizotas su baravykais ir tikromis šafrano purkomis",
      "Ant lavos akmens keptas jautienos ribeye kepsnys su chimichurri padažu ir keptomis šviežiomis bulvytėmis",
      "Šventinis pandoro tiramisù su juodojo šokolado lašeliais",
      "Tradicinis naujametinis cotechino su sėkmę nešančiais lęšiais ir prosecco taure"
    ],
    "faqs": [
      [
        "Kodėl Carlsberg Øl Milanas puikiai tinka šeimoms su vaikais Naujųjų metų išvakarėse?",
        "Erdviose skliautuotose salėse šeima visą vakarą turi savo patogų stalą, o rami vakarienė su aptarnavimu dera su linksma itališka gyva muzika be klubinės spūsties."
      ],
      [
        "Kokia oficiali kaina ir ar galima užsakyti vaikiškas kėdutes ar paprastesnius patiekalus vaikams?",
        "Restorano oficialiai patvirtinta kaina yra vienoda 75 € asmeniui. Rezervuodami per WhatsApp +39 351 912 7047, galite paprašyti erdvaus šeimos stalo, vaikiškų kėdučių ir paprastų patiekalų pakeitimų vaikams ar esant alergijoms."
      ],
      [
        "Kas tiksliai įskaičiuota į 75 € kainą asmeniui?",
        "Įskaičiuotas staliukas nuo 20:30, keturi patiekiami patiekalai, vanduo, kava, 1 butelis vyno 4 suaugusiesiems, vidurnakčio prosecco ir lęšiai, gyva Cena Cantata bei DJ programa iki 03:00."
      ],
      [
        "Kaip patogiai atvykti su šeima ir rezervuoti staliuką?",
        "Restoranas įsikūręs Bastioni di Porta Nuova 9 šalia Piazza XXV Aprile ir Corso Como, 5 minutės pėsčiomis nuo M2 Moscova ir M2/M5 Porta Garibaldi metro. Rezervacija per WhatsApp +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Šeimos Naujųjų metų 2027 programa",
    "menusHeading": "Oficialus 75 € meniu (vynas įskaičiuotas)",
    "conditionsHeading": "Patogumai šeimoms, įskaičiuotos paslaugos ir vieta"
  },
  "mt": {
    "nyeTitle": "L-Ewwel tas-Sena għall-Familji 2027",
    "milano": "Milan",
    "dec31": "Il-Ħamis, 31 ta' Diċembru 2026",
    "title": "L-Ewwel tas-Sena 2027 għall-Familji f'Carlsberg Øl Milan · Ċena, Cena Cantata u DJ (75 €)",
    "sub": "Carlsberg Øl Milan · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Rata waħda 75 € · Ideali għall-familji",
    "desc": "Iċċelebra Lejlet l-Ewwel tas-Sena 2027 mal-familja kollha taħt il-ħnejjiet storiċi tal-briks ta' Carlsberg Øl Milan f'Bastioni di Porta Nuova 9 (żona Porta Nuova / Corso Como, 5 minuti mixi mill-metro M2 Moscova u M2/M5 Porta Garibaldi). Il-mejda tagħkom tibqa' riżervata l-lejla kollha bir-rata uffiċjali kkonfermata ta' 75 € għal kull persuna: ikla servuta ta' erba' platti, mużika Taljana live ferrieħa Cena Cantata addattata għall-ġenituri, tfal u adolexxenti, ilma minerali, kafè, flixkun inbid Vino Nobile di Montepulciano jew Vermentino di Gallura kull 4 adulti, prosecco f'nofsillejl b'cotechino u għads tradizzjonali, u DJ set sas-03:00. Iktbilna fuq WhatsApp +39 351 912 7047 biex nippreparaw imwejjed komdi għall-familja, high chairs u varjazzjonijiet sempliċi fil-kċina għat-tfal u ż-żgħażagħ.",
    "music": "Cena Cantata Taljana live ferrieħa għall-kbar, tfal u żgħażagħ · Countdown ta' nofsillejl u DJ Set sas-03:00",
    "dress": "Ilbies eleganti u komdu tal-festa għall-adulti u t-tfal",
    "priceSum": "Rata uffiċjali waħda 75 € kull persuna · Ċena servuta + Inbid (flixkun / 4 adulti) + Cena Cantata għall-familji + DJ",
    "tierLabel": "Ċena Servuta għall-Familji u Gruppi + Cena Cantata + DJ Set (mit-20:30)",
    "tierPrice": "75 € għal kull persuna",
    "tierDesc": "Mejda riżervata l-lejl kollu b'menu servut ta' erba' platti (trio ta' antipasti tal-baħar u l-art, risotto Carnaroli bil-faqqiegħ porcini u żagħfran, ribeye taċ-ċanga fuq ġebla tal-lava bil-patata żgħira, tiramisù tal-pandoro biċ-ċikkulata), ilma, kafè, flixkun inbid Montepulciano jew Vermentino kull 4 adulti, prosecco u għads f'nofsillejl, u DJ set. Imwejjed għall-familji, high chairs u tibdil sempliċi fil-platti tat-tfal permezz ta' WhatsApp +39 351 912 7047.",
    "highlights": [
      "Lejlet l-Ewwel tas-Sena komda għall-familji bit-tfal u ż-żgħażagħ f'Bastioni di Porta Nuova 9 b'mejda riżervata l-lejla kollha",
      "Rata uffiċjali kkonfermata ta' 75 € kull persuna b'4 platti servuti, ilma, kafè u għads ta' nofsillejl",
      "Inkluż flixkun inbid Montepulciano jew Vermentino kull 4 adulti flimkien ma' tazza prosecco f'nofsillejl",
      "Għajnuna diretta fuq WhatsApp +39 351 912 7047 għal imwejjed tal-familja, high chairs u platti sempliċi għaż-żgħar"
    ],
    "source": "Menu u prezz uffiċjali kkonfermati 2027 ta' Carlsberg Øl Milan (Bastioni di Porta Nuova 9, 31 ta' Diċembru 2026, 20:30–03:00): ċena servuta għall-familji b'Cena Cantata u DJ set bir-rata waħda ta' 75 € kull persuna, flixkun inbid kull 4 adulti, ilma, kafè, prosecco u għads. Imwejjed tal-familja u high chairs fuq WhatsApp +39 351 912 7047.",
    "steps": [
      "20:30 Ftuħ tal-bibien f'Bastioni di Porta Nuova 9 u post komdu fl-imwejjed riżervati għall-familji",
      "21:00 Ċena servuta ta' erba' platti akkumpanjata mill-kant live Taljan taċ-Cena Cantata",
      "00:00 Countdown ta' nofsillejl flimkien, brindisi bil-prosecco għall-adulti u cotechino bl-għads",
      "00:30 – 03:00 Festa tal-Ewwel tas-Sena b'DJ set filwaqt li l-mejda tibqa' dejjem tagħkom"
    ],
    "menuTitle": "Menu Uffiċjali tal-Familji 2027 · Cena Cantata u DJ Set (75 €)",
    "menuBev": "Inkluż fir-rata ta' 75 €: ilma minerali, kafè, flixkun Vino Nobile di Montepulciano jew Vermentino di Gallura kull 4 adulti, u tazza prosecco għall-adulti f'nofsillejl b'cotechino u għads. Varjazzjonijiet sempliċi fil-kċina għat-tfal, adolexxenti jew allerġiji huma disponibbli permezz ta' WhatsApp +39 351 912 7047.",
    "courseLabels": [
      "Antipasto",
      "L-Ewwel Platt",
      "Platt Prinċipali",
      "Deżerta",
      "Tradizzjoni ta' Nofsillejl"
    ],
    "dishes": [
      "Kapixxotti gratinati stil Venezjan, kroketti tal-patata u perżut Patanegra fuq stikka u qoffa Parmigiano bil-puntarelle, burrata u inċova ta' Cantabria",
      "Risotto Carnaroli bil-faqqiegħ porcini u pistilli taż-żagħfran",
      "Ribeye taċ-ċanga msajjar fuq ġebla tal-lava biż-żalsa chimichurri u patata żgħira l-forn",
      "Tiramisù tal-pandoro tal-festa bi qtar taċ-ċikkulata skura",
      "Cotechino tradizzjonali bl-għads ta' xorti tajba u tazza prosecco għall-brindisi"
    ],
    "faqs": [
      [
        "Għaliex Carlsberg Øl Milan huwa tajjeb ħafna għall-familji bit-tfal f'Lejlet l-Ewwel tas-Sena?",
        "Is-swali wesgħin jagħtukom il-kumdità tal-mejda tagħkom il-lejla kollha, b'ikla servuta bil-kwiet u mużika Taljana ferrieħa li jieħdu gost biha kemm il-ġenituri kif ukoll it-tfal."
      ],
      [
        "X'inhu l-prezz uffiċjali u nistgħu nitolbu high chairs jew platti aktar sempliċi għat-tfal?",
        "Ir-rata uffiċjali kkonfermata hija waħda ta' 75 € għal kull persuna. Meta tibbukkjaw fuq WhatsApp +39 351 912 7047, nirranġaw imwejjed tal-familja, high chairs u varjazzjonijiet sempliċi fil-kċina għat-tfal jew allerġiji."
      ],
      [
        "X'jinkludi eżatt il-biljett ta' 75 € kull persuna?",
        "Jinkludi mejda riżervata mit-20:30, erba' platti servuti, ilma, kafè, flixkun inbid Montepulciano jew Vermentino kull 4 adulti, prosecco u għads f'nofsillejl, Cena Cantata live u DJ set sas-03:00."
      ],
      [
        "Kif tasal faċilment mal-familja u kif tibbukkja?",
        "Ir-ristorant jinsab f'Bastioni di Porta Nuova 9 ħdejn Piazza XXV Aprile u Corso Como, 5 minuti mixi minn M2 Moscova u M2/M5 Porta Garibaldi. Ibbukkja fuq WhatsApp +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Skeda tal-Ewwel tas-Sena għall-Familji 2027",
    "menusHeading": "Menu Uffiċjali ta' 75 € (Inbid Inkluż)",
    "conditionsHeading": "Kumdità għall-Familji, Inklużjonijiet u Aċċess"
  },
  "pl": {
    "nyeTitle": "Rodzinny Sylwester 2027",
    "milano": "Mediolan",
    "dec31": "Czwartek, 31 grudnia 2026 r.",
    "title": "Rodzinny Sylwester 2027 w Carlsberg Øl Mediolan · Kolacja, Cena Cantata i DJ (75 €)",
    "sub": "Carlsberg Øl Mediolan · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Jednolita cena 75 € · Przyjazny rodzinom",
    "desc": "Przywitaj 2027 rok z całą rodziną pod przestronnymi, zabytkowymi ceglanymi sklepieniami restauracji Carlsberg Øl w Mediolanie przy Bastioni di Porta Nuova 9 (dzielnica Porta Nuova / Corso Como, 5 minut pieszo od stacji metra M2 Moscova i M2/M5 Porta Garibaldi). Wasz stolik pozostaje zarezerwowany przez cały wieczór w oficjalnie potwierdzonej jednolitej cenie 75 € za osobę: obejmuje ona czterodaniową kolację serwowaną do stołu, radosną włoską oprawę muzyczną na żywo Cena Cantata odpowiednią dla rodziców, dzieci i nastolatków, wodę mineralną, kawę, 1 butelkę wina Vino Nobile di Montepulciano lub Vermentino di Gallura na każde 4 osoby dorosłe, północny toast prosecco, tradycyjne cotechino z soczewicą oraz set DJ-ski do 03:00. Napisz do nas na WhatsApp +39 351 912 7047, aby przygotować wygodne rodzinne stoły, krzesełka dla małych dzieci i proste modyfikacje dań w kuchni dla najmłodszych.",
    "music": "Radosna włoska Cena Cantata na żywo dla rodziców, dzieci i młodzieży · Odliczanie o północy i DJ set do 03:00",
    "dress": "Elegancki i wygodny strój sylwestrowy dla dorosłych oraz dzieci",
    "priceSum": "Oficjalna jednolita cena 75 € za osobę · Kolacja serwowana + Wino (1 but. / 4 dorosłych) + Rodzinna Cena Cantata + DJ",
    "tierLabel": "Rodzinna serwowana kolacja sylwestrowa + Cena Cantata + DJ set (od 20:30)",
    "tierPrice": "75 € za osobę",
    "tierDesc": "Stolik zarezerwowany na całą noc z czterodaniowym menu serwowanym do stołu (potrójna przystawka morza i lądu, risotto Carnaroli z borowikami i szafranem, antrykot ribeye z kamienia lawowego z młodymi ziemniakami, świąteczne tiramisù z pandoro i kropelkami czekolady), wodą, kawą, 1 butelką wina Montepulciano lub Vermentino na 4 dorosłych, prosecco i soczewicą o północy oraz DJ setem. Stoły rodzinne, krzesełka dziecięce i proste zmiany w daniach dla dzieci przez WhatsApp +39 351 912 7047.",
    "highlights": [
      "Gościnny, spokojny Sylwester dla rodzin z dziećmi i nastolatkami przy Bastioni di Porta Nuova 9 z własnym stolikiem przez całą noc",
      "Potwierdzona oficjalna jednolita stawka 75 € za osobę: 4 serwowane dania, woda, kawa i noworoczna soczewica",
      "W cenie 1 butelka wina Montepulciano lub Vermentino na każde 4 osoby dorosłe oraz kieliszek prosecco o północy",
      "Bezpośredni kontakt na WhatsApp +39 351 912 7047 w sprawie dużych stołów rodzinnych, krzesełek i łagodniejszych porcji dla dzieci"
    ],
    "source": "Oficjalnie potwierdzone menu i cennik 2027 Carlsberg Øl Mediolan (Bastioni di Porta Nuova 9, 31 grudnia 2026, 20:30–03:00): rodzinna kolacja serwowana z Cena Cantata i DJ setem w cenie 75 € za osobę, 1 butelka wina na 4 dorosłych, woda, kawa, prosecco i soczewica. Stoły rodzinne, krzesełka i opcje dziecięce na WhatsApp +39 351 912 7047.",
    "steps": [
      "20:30 Otwarcie drzwi przy Bastioni di Porta Nuova 9 i wygodne zajęcie zarezerwowanych stołów rodzinnych",
      "21:00 Czterodaniowa kolacja sylwestrowa przy dźwiękach wspólnego włoskiego śpiewania Cena Cantata",
      "00:00 Rodzinne odliczanie do północy, toast prosecco dla dorosłych oraz tradycyjne cotechino z soczewicą",
      "00:30 – 03:00 Zabawa noworoczna z DJ-em przy zachowaniu rodzinnego stolika do końca wieczoru"
    ],
    "menuTitle": "Oficjalne rodzinne menu sylwestrowe 2027 · Cena Cantata i DJ (75 €)",
    "menuBev": "W cenie 75 € zawarte są: woda mineralna, kawa, 1 butelka wina Vino Nobile di Montepulciano lub Vermentino di Gallura na każde 4 osoby dorosłe oraz kieliszek prosecco dla dorosłych o północy z cotechino i soczewicą. Proste modyfikacje potraw dla dzieci, młodzieży lub alergików ustalisz wcześniej na WhatsApp +39 351 912 7047.",
    "courseLabels": [
      "Przystawka",
      "Pierwsze danie",
      "Danie główne",
      "Deser",
      "Tradycja o północy"
    ],
    "dishes": [
      "Zapiekane przegrzebki po wenecku, krokiety ziemniaczane z szynką Patanegra na patyczku oraz koszyczek z Parmigiano z cykorią puntarelle, burratą i anchois z Kantabrii",
      "Risotto Carnaroli z prawdziwkami i nitkami szafranu",
      "Wołowy ribeye grillowany na kamieniu lawowym z sosem chimichurri i pieczonymi młodymi ziemniakami",
      "Świąteczne tiramisù na bazie babki pandoro z kroplami gorzkiej czekolady",
      "Tradycyjne włoskie cotechino z soczewicą na szczęście i kieliszek prosecco do toastu"
    ],
    "faqs": [
      [
        "Dlaczego Carlsberg Øl w Mediolanie to świetne miejsce na Sylwestra z dziećmi i nastolatkami?",
        "Przestronne ceglane sale gwarantują rodzinie stały, wygodny stolik przez cały wieczór, łącząc pełną kolację kelnerską z radosną włoską muzyką na żywo bez klubowego tłoku."
      ],
      [
        "Jaka jest oficjalna cena i czy można poprosić o krzesełko do karmienia lub prostsze dania dla dzieci?",
        "Oficjalnie potwierdzona stawka lokalu jest jednolita i wynosi 75 € za osobę. Przy rezerwacji przez WhatsApp +39 351 912 7047 przygotujemy wygodny stół rodzinny, krzesełka dziecięce oraz proste modyfikacje dań w kuchni."
      ],
      [
        "Co dokładnie obejmuje pakiet za 75 € od osoby?",
        "Obejmuje stolik od 20:30, cztery serwowane dania, wodę, kawę, 1 butelkę wina Montepulciano lub Vermentino na 4 dorosłych, północne prosecco i soczewicę, występ Cena Cantata oraz DJ set do 03:00."
      ],
      [
        "Jak wygodnie dojechać z rodziną i zarezerwować stolik?",
        "Lokal mieści się przy Bastioni di Porta Nuova 9 tuż obok Piazza XXV Aprile i Corso Como, 5 minut spacerem od stacji metra M2 Moscova i M2/M5 Porta Garibaldi. Rezerwacje na WhatsApp +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Harmonogram Rodzinnego Sylwestra 2027",
    "menusHeading": "Oficjalne menu 75 € (wino w cenie)",
    "conditionsHeading": "Udogodnienia dla rodzin, co obejmuje cena i dojazd"
  },
  "ro": {
    "nyeTitle": "Revelion în Familie 2027",
    "milano": "Milano",
    "dec31": "Joi, 31 decembrie 2026",
    "title": "Revelion 2027 pentru Familii la Carlsberg Øl Milano · Cină, Cena Cantata și DJ (75 €)",
    "sub": "Carlsberg Øl Milano · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Tarif unic 75 € · Ideal pentru familii",
    "desc": "Sărbătoriți trecerea în anul 2027 împreună cu toată familia sub bolțile istorice spațioase din cărămidă ale restaurantului Carlsberg Øl Milano, pe Bastioni di Porta Nuova 9 (zona Porta Nuova / Corso Como, la 5 minute de mers pe jos de stațiile de metrou M2 Moscova și M2/M5 Porta Garibaldi). Masa rămâne rezervată pentru familia dumneavoastră toată seara la tariful oficial verificat de 75 € de persoană: cină festivă servită la masă în patru feluri, atmosferă veselă de Cena Cantata live potrivită pentru părinți, copii și adolescenți, apă minerală, cafea, 1 sticlă de vin Vino Nobile di Montepulciano sau Vermentino di Gallura la fiecare 4 adulți, cupă de prosecco la miezul nopții, cotechino tradițional cu linte și DJ set până la ora 03:00. Scrieți-ne pe WhatsApp la +39 351 912 7047 pentru a pregăti mese de familie confortabile, scaune înalte pentru cei mici și adaptări simple în bucătărie pentru copii și tineri.",
    "music": "Cena Cantata italiană live și veselă pentru părinți, copii și adolescenți · Numărătoarea inversă și DJ set până la 03:00",
    "dress": "Ținută festivă elegantă și comodă pentru adulți și copii",
    "priceSum": "Tarif oficial unic 75 € de persoană · Cină servită + Vin (1 sticlă / 4 adulți) + Cena Cantata de familie + DJ set",
    "tierLabel": "Cină Festivă de Revelion pentru Familii și Grupuri + Cena Cantata + DJ Set (de la 20:30)",
    "tierPrice": "75 € de persoană",
    "tierDesc": "Masă rezervată toată noaptea cu meniu complet servit în patru feluri (trio de aperitive mare și pământ, risotto Carnaroli cu hribi și șofran, antricot ribeye pe piatră vulcanică cu cartofi noi, tiramisù cu pandoro și picături de ciocolată), apă, cafea, 1 sticlă de vin Montepulciano sau Vermentino la 4 adulți, prosecco și linte la miezul nopții, plus DJ set. Mese de familie, scaune pentru copii și variante simple în bucătărie prin WhatsApp +39 351 912 7047.",
    "highlights": [
      "Revelion primitor și relaxat pentru familii cu copii și adolescenți pe Bastioni di Porta Nuova 9 cu masă păstrată toată noaptea",
      "Tarif oficial unic verificat de 75 € de persoană incluzând 4 feluri servite la masă, apă, cafea și lintea de la miezul nopții",
      "Include 1 sticlă de vin Montepulciano sau Vermentino la fiecare 4 adulți și un pahar de prosecco la cumpăna dintre ani",
      "Asistență directă pe WhatsApp +39 351 912 7047 pentru aranjarea meselor de familie, scaune de copii și preparate adaptate celor mici"
    ],
    "source": "Meniu și tarif oficial confirmate pentru 2027 la Carlsberg Øl Milano (Bastioni di Porta Nuova 9, 31 decembrie 2026, 20:30–03:00): cină festivă de familie cu Cena Cantata și DJ set la tariful unic de 75 € de persoană, 1 sticlă de vin la 4 adulți, apă, cafea, prosecco și linte. Mese de familie, scaune înalte și opțiuni pentru copii pe WhatsApp +39 351 912 7047.",
    "steps": [
      "20:30 Deschiderea accesului pe Bastioni di Porta Nuova 9 și așezarea confortabilă la mesele rezervate pentru familii",
      "21:00 Cină festivă în patru feluri însoțită de muzica italiană live Cena Cantata pentru toate vârstele",
      "00:00 Numărătoarea inversă în familie, toast cu prosecco pentru adulți și tradiționalul cotechino cu linte",
      "00:30 – 03:00 Petrecere de Anul Nou cu DJ set păstrând masa familiei disponibilă toată noaptea"
    ],
    "menuTitle": "Meniu Oficial de Revelion 2027 pentru Familii · Cena Cantata și DJ (75 €)",
    "menuBev": "Inclus în tariful de 75 €: apă minerală, cafea, 1 sticlă de Vino Nobile di Montepulciano sau Vermentino di Gallura la fiecare 4 adulți și cupă de prosecco pentru adulți la miezul nopții alături de cotechino și linte. Adaptări simple în bucătărie pentru copii, adolescenți sau alergii alimentare se stabilesc pe WhatsApp +39 351 912 7047.",
    "courseLabels": [
      "Aperitiv",
      "Primul fel",
      "Felul principal",
      "Desert",
      "Tradiția de la miezul nopții"
    ],
    "dishes": [
      "Scoici Saint-Jacques gratinate în stil venețian, crochete de cartofi cu jambon Patanegra pe frigăruie și coșuleț de Parmigiano cu puntarelle, burrata și anșoa de Cantabria",
      "Risotto Carnaroli cu hribi și stamine întregi de șofran",
      "Ribeye de vită gătit pe piatră vulcanică cu sos chimichurri și cartofi noi rumeniți la cuptor",
      "Tiramisù festiv din pandoro cu picături de ciocolată neagră",
      "Cotechino tradițional italian cu linte aducătoare de noroc și cupă de prosecco pentru toast"
    ],
    "faqs": [
      [
        "De ce este Carlsberg Øl Milano o alegere excelentă pentru familiile cu copii și adolescenți de Revelion?",
        "Sălile largi cu bolți din cărămidă oferă spațiu și propria masă rezervată pe tot parcursul serii, îmbinând o cină servită liniștită cu muzică italiană live plină de bună dispoziție."
      ],
      [
        "Care este tariful oficial și se pot solicita scaune pentru copii sau preparate mai simple?",
        "Tariful oficial verificat al localului este unic: 75 € de persoană. Scriindu-ne la rezervare pe WhatsApp +39 351 912 7047, organizăm mese de familie încăpătoare, scaune înalte și adaptări simple ale felurilor în bucătărie pentru copii sau alergii."
      ],
      [
        "Ce include mai exact pachetul de 75 € de persoană?",
        "Include masa rezervată de la 20:30, patru feluri servite, apă, cafea, 1 sticlă de vin Montepulciano sau Vermentino la 4 adulți, prosecco și linte la miezul nopții, programul live Cena Cantata și DJ set până la 03:00."
      ],
      [
        "Cum ajungem ușor cu familia și cum rezervăm masa?",
        "Restaurantul se află pe Bastioni di Porta Nuova 9 lângă Piazza XXV Aprile și Corso Como, la 5 minute pe jos de metroul M2 Moscova și M2/M5 Porta Garibaldi. Rezervări directe pe WhatsApp +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Programul Revelionului de Familie 2027",
    "menusHeading": "Meniu Oficial 75 € (Vin Inclus)",
    "conditionsHeading": "Confort pentru Familii, Ce Include și Acces Porta Nuova"
  },
  "sk": {
    "nyeTitle": "Rodinný Silvester 2027",
    "milano": "Miláno",
    "dec31": "Štvrtok 31. decembra 2026",
    "title": "Rodinný Silvester 2027 v Carlsberg Øl Miláno · Večera, Cena Cantata a DJ (75 €)",
    "sub": "Carlsberg Øl Miláno · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Jednotná cena 75 € · Vhodné pre rodiny",
    "desc": "Privítajte rok 2027 s celou rodinou pod priestrannými historickými tehlovými klenbami reštaurácie Carlsberg Øl Miláno na adrese Bastioni di Porta Nuova 9 (štvrť Porta Nuova / Corso Como, len 5 minút pešo od staníc metra M2 Moscova a M2/M5 Porta Garibaldi). Váš stôl zostáva rezervovaný počas celého večera za oficiálne potvrdenú jednotnú cenu 75 € na osobu: čaká vás štvorchodová servírovaná silvestrovská večera, veselá živá talianska hudobná atmosféra Cena Cantata vhodná pre rodičov, deti aj tínedžerov, minerálna voda, káva, 1 fľaša vína Vino Nobile di Montepulciano alebo Vermentino di Gallura na každých 4 dospelých, polnočný prípitok proseccom, tradičné cotechino so šošovicou a DJ set až do 03:00. Napíšte nám na WhatsApp +39 351 912 7047 a pripravíme pohodlné rodinné stoly, detské stoličky aj jednoduché úpravy jedál v kuchyni pre deti a mládež.",
    "music": "Veselá živá talianska Cena Cantata pre rodičov, deti a tínedžerov · Polnočné odpočítavanie a DJ set do 03:00",
    "dress": "Slávnostné a pohodlné silvestrovské oblečenie pre dospelých aj deti",
    "priceSum": "Oficiálna jednotná cena 75 € na osobu · Servírovaná večera + Víno (1 fľaša / 4 dospelí) + Rodinná Cena Cantata + DJ",
    "tierLabel": "Rodinná servírovaná silvestrovská večera + Cena Cantata + DJ set (od 20:30)",
    "tierPrice": "75 € na osobu",
    "tierDesc": "Vlastný rezervovaný stôl po celú noc so štvorchodovým servírovaným jedálnym lístkom (trojité predjedlo darov mora a pevniny, rizoto Carnaroli s dubákmi a šafranom, hovädzí ribeye z lávového kameňa s mladými zemiakmi, sviatočné pandoro tiramisù s kúskami čokolády), vodou, kávou, 1 fľašou vína Montepulciano alebo Vermentino na 4 dospelých, polnočným proseccom so šošovicou a DJ setom. Rodinné sedenie, detské stoličky a jednoduché úpravy porcií pre deti cez WhatsApp +39 351 912 7047.",
    "highlights": [
      "Príjemný a pokojný Silvester pre rodiny s deťmi a tínedžermi na Bastioni di Porta Nuova 9 s vlastným stolom po celú noc",
      "Potvrdená oficiálna jednotná sadzba 75 € na osobu vrátane 4 servírovaných chodov, vody, kávy a polnočnej šošovice",
      "V cene je 1 fľaša vína Montepulciano alebo Vermentino na každých 4 dospelých a pohár prosecca o polnoci",
      "Priama dohoda cez WhatsApp +39 351 912 7047 pre priestranné rodinné stoly, detské stoličky a jednoduchšie detské jedlá"
    ],
    "source": "Oficiálne potvrdený jedálny lístok a cenník 2027 Carlsberg Øl Miláno (Bastioni di Porta Nuova 9, 31. decembra 2026, 20:30–03:00): rodinná servírovaná večera s programom Cena Cantata a DJ setom za jednotnú cenu 75 € na osobu, 1 fľaša vína na 4 dospelých, voda, káva, prosecco a šošovica. Rodinné stoly, stoličky a detské úpravy jedál cez WhatsApp +39 351 912 7047.",
    "steps": [
      "20:30 Otvorenie podniku na Bastioni di Porta Nuova 9 a pohodlné usadenie pri rezervovaných rodinných stoloch",
      "21:00 Štvorchodová servírovaná silvestrovská večera so živými talianskymi piesňami Cena Cantata",
      "00:00 Spoločné rodinné odpočítavanie polnoci, prípitok proseccom pre dospelých a tradičné cotechino so šošovicou",
      "00:30 – 03:00 Novoročná zábava s DJ setom, pričom váš rodinný stôl vám zostáva k dispozícii celý večer"
    ],
    "menuTitle": "Oficiálny rodinný silvestrovský jedálny lístok 2027 · Cena Cantata a DJ (75 €)",
    "menuBev": "V cene 75 € je zahrnuté: minerálna voda, káva, 1 fľaša vína Vino Nobile di Montepulciano alebo Vermentino di Gallura na každých 4 dospelých a pohár prosecca pre dospelých o polnoci s cotechino a šošovicou. Jednoduché úpravy jedál v kuchyni pre deti, tínedžerov alebo alergikov vybavíme vopred cez WhatsApp +39 351 912 7047.",
    "courseLabels": [
      "Predjedlo",
      "Prvý chod",
      "Hlavný chod",
      "Dezert",
      "Polnočná tradícia"
    ],
    "dishes": [
      "Gratinované hrebenatky na benátsky spôsob, zemiakové krokety so šunkou Patanegra na špajli a parmezánový košíček s čakankou puntarelle, burratou a kantábrijskými sardelami",
      "Rizoto Carnaroli s dubákmi a pravými nitkami šafranu",
      "Hovädzí ribeye grilovaný na lávovom kameni s omáčkou chimichurri a pečenými mladými zemiakmi",
      "Sviatočné tiramisù z vianočného koláča pandoro s kvapkami horkej čokolády",
      "Tradičné novoročné cotechino so šošovicou pre šťastie a pohár prosecca na prípitok"
    ],
    "faqs": [
      [
        "Prečo je Carlsberg Øl Miláno výbornou voľbou pre rodiny s deťmi na Silvestra?",
        "Priestranné klenbové sály zaručujú rodine vlastný pohodlný stôl počas celého večera a spájajú poctivú servírovanú večeru s priateľskou živou talianskou hudbou."
      ],
      [
        "Aká je oficiálna cena a viete zabezpečiť detské stoličky alebo jednoduchšie jedlo pre deti?",
        "Oficiálne overená cena podniku je jednotná 75 € na osobu. Pri rezervácii cez WhatsApp +39 351 912 7047 vám radi prichystáme pohodlný rodinný stôl, detské stoličky aj jednoduché úpravy chodov v kuchyni."
      ],
      [
        "Čo všetko zahŕňa suma 75 € na osobu?",
        "Zahŕňa rezervovaný stôl od 20:30, štyri servírované chody, vodu, kávu, 1 fľašu vína Montepulciano alebo Vermentino na 4 dospelých, polnočné prosecco a šošovicu, živú Cena Cantata a DJ set do 03:00."
      ],
      [
        "Ako sa sem ľahko dostaneme s rodinou a ako rezervovať stôl?",
        "Reštaurácia sa nachádza na Bastioni di Porta Nuova 9 hneď vedľa Piazza XXV Aprile a Corso Como, iba 5 minút pešo od metra M2 Moscova a M2/M5 Porta Garibaldi. Rezervácie cez WhatsApp +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Program rodinného Silvestra 2027",
    "menusHeading": "Oficiálny jedálny lístok za 75 € (víno v cene)",
    "conditionsHeading": "Zázemie pre rodiny, čo je v cene a dostupnosť"
  },
  "sl": {
    "nyeTitle": "Družinsko silvestrovanje 2027",
    "milano": "Milano",
    "dec31": "Četrtek, 31. december 2026",
    "title": "Družinsko silvestrovanje 2027 v Carlsberg Øl Milano · Večerja, Cena Cantata in DJ (75 €)",
    "sub": "Carlsberg Øl Milano · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Enotna cena 75 € · Prijazno družinam",
    "desc": "Pričakajte leto 2027 z vso družino pod prostornimi zgodovinskimi opečnatimi oboki restavracije Carlsberg Øl Milano na Bastioni di Porta Nuova 9 (četrt Porta Nuova / Corso Como, 5 minut hoje od postaj podzemne železnice M2 Moscova in M2/M5 Porta Garibaldi). Vaša miza ostane rezervirana ves večer po uradno potrjeni enotni ceni 75 € na osebo: čaka vas postrežena štirihodna silvestrska večerja, vesela italijanska glasbena spremljava v živo Cena Cantata, primerna za starše, otroke in najstnike, mineralna voda, kava, 1 steklenica vina Vino Nobile di Montepulciano ali Vermentino di Gallura na vsake 4 odrasle, polnočni prosecco, tradicionalni cotechino z lečo in DJ set do 03:00. Pišite nam na WhatsApp +39 351 912 7047 za udobne družinske mize, otroške stolčke in preproste kuhinjske prilagoditve jedi za otroke in mladostnike.",
    "music": "Vesela italijanska Cena Cantata v živo za starše, otroke in najstnike · Polnočno odštevanje in DJ set do 03:00",
    "dress": "Urejeno in udobno praznično oblačilo za odrasle ter otroke",
    "priceSum": "Uradna enotna cena 75 € na osebo · Postrežena večerja + Vino (1 stekl. / 4 odrasle) + Družinska Cena Cantata + DJ",
    "tierLabel": "Družinska postrežena silvestrska večerja + Cena Cantata + DJ set (od 20:30)",
    "tierPrice": "75 € na osebo",
    "tierDesc": "Rezervirana miza vso noč s štirihodnim postreženim menijem (trojni morsko-mesni krožnik predjedi, rižota Carnaroli z jurčki in žafranom, goveji ribeye z vulkanskega kamna z mladim krompirjem, praznični pandoro tiramisù s čokoladnimi kapljicami), vodo, kavo, 1 steklenico vina Montepulciano ali Vermentino na 4 odrasle, polnočnim proseccom in lečo ter DJ setom. Družinske mize, otroški stolčki in prilagoditve jedi za otroke prek WhatsAppa +39 351 912 7047.",
    "highlights": [
      "Sproščeno in toplo silvestrovanje za družine z otroki in najstniki na Bastioni di Porta Nuova 9 z lastno mizo vso noč",
      "Potrjena uradna enotna cena 75 € na osebo s 4 postreženimi hodi, vodo, kavo in polnočno lečo za srečo",
      "Vključena 1 steklenica vina Montepulciano ali Vermentino na vsake 4 odrasle ter kozarec prosecca ob polnoči",
      "Neposredna pomoč na WhatsAppu +39 351 912 7047 za prostorne družinske mize, stolčke za malčke in prilagojene otroške krožnike"
    ],
    "source": "Uradno potrjen silvestrski meni in cenik 2027 Carlsberg Øl Milano (Bastioni di Porta Nuova 9, 31. december 2026, 20:30–03:00): družinska postrežena večerja s programom Cena Cantata in DJ setom po enotni ceni 75 € na osebo, 1 steklenica vina na 4 odrasle, voda, kava, prosecco in leča. Družinske mize, stolčki in otroške prilagoditve na WhatsAppu +39 351 912 7047.",
    "steps": [
      "20:30 Odprtje vrat na Bastioni di Porta Nuova 9 in udobna namestitev pri rezerviranih družinskih mizah",
      "21:00 Štirihodna postrežena silvestrska večerja ob živahnih italijanskih pesmih Cena Cantata",
      "00:00 Skupno družinsko odštevanje ob polnoči, zdravica s proseccom za odrasle in tradicionalni cotechino z lečo",
      "00:30 – 03:00 Novoletno praznovanje z DJ setom, medtem ko vaša družinska miza ostaja na voljo ves večer"
    ],
    "menuTitle": "Uradni družinski silvestrski meni 2027 · Cena Cantata in DJ (75 €)",
    "menuBev": "V ceno 75 € je vključeno: mineralna voda, kava, 1 steklenica vina Vino Nobile di Montepulciano ali Vermentino di Gallura na vsake 4 odrasle ter kozarec prosecca za odrasle ob polnoči s cotechino klobaso in lečo. Preproste kuhinjske prilagoditve za otroke, najstnike ali alergike uredimo po dogovoru prek WhatsAppa +39 351 912 7047.",
    "courseLabels": [
      "Predjed",
      "Prvi hod",
      "Glavna jed",
      "Sladica",
      "Polnočna tradicija"
    ],
    "dishes": [
      "Gratinirane pokrovače po beneško, krompirjevi kroketi s pršutom Patanegra na palčki in košarica Parmigiana s cikorijo puntarelle, burrato in kantabrijskimi sardoni",
      "Rižota Carnaroli z jurčki in celimi žafranovimi nitkami",
      "Goveji ribeye z vulkanskega kamna z omako chimichurri in pečenim mladim krompirjem",
      "Praznični tiramisù iz pandora s kapljicami temne čokolade",
      "Tradicionalni novoletni cotechino z lečo za srečo in kozarec prosecca za zdravico"
    ],
    "faqs": [
      [
        "Zakaj je Carlsberg Øl Milano odlična izbira za družine z otroki na silvestrovo?",
        "Prostorne dvorane z oboki zagotavljajo družini lastno udobno mizo ves večer ter združujejo mirno postreženo večerjo in prijetno italijansko glasbo v živo brez gneče."
      ],
      [
        "Kakšna je uradna cena in ali uredite otroške stolčke ali preprostejše jedi za otroke?",
        "Uradno potrjena cena lokala je enotna in znaša 75 € na osebo. Ob rezervaciji na WhatsApp +39 351 912 7047 vam pripravimo udobno družinsko mizo, otroške stolčke in preproste prilagoditve hodov v kuhinji."
      ],
      [
        "Kaj natančno vključuje cena 75 € na osebo?",
        "Vključuje rezervirano mizo od 20:30, štiri postrežene hode, vodo, kavo, 1 steklenico vina Montepulciano ali Vermentino na 4 odrasle, polnočni prosecco in lečo, živo Cena Cantata ter DJ set do 03:00."
      ],
      [
        "Kako preprosto priti z družino in rezervirati mizo?",
        "Restavracija je na naslovu Bastioni di Porta Nuova 9 tik ob Piazza XXV Aprile in Corso Como, 5 minut hoje od postaj M2 Moscova in M2/M5 Porta Garibaldi. Rezervacije prek WhatsAppa +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Urnik družinskega silvestrovanja 2027",
    "menusHeading": "Uradni meni za 75 € (vino vključeno)",
    "conditionsHeading": "Ugodnosti za družine, kaj je vključeno in dostop"
  },
  "sv": {
    "nyeTitle": "Familjenyår 2027",
    "milano": "Milano",
    "dec31": "Torsdag 31 december 2026",
    "title": "Nyårsafton 2027 för Familjer på Carlsberg Øl Milano · Middag, Cena Cantata & DJ (75 €)",
    "sub": "Carlsberg Øl Milano · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Enhetspris 75 € · Familjevänligt",
    "desc": "Fira in 2027 med hela familjen under de rymliga historiska tegelvalven på Carlsberg Øl Milano vid Bastioni di Porta Nuova 9 (kvarteren Porta Nuova / Corso Como, 5 minuters promenad från tunnelbanestationerna M2 Moscova och M2/M5 Porta Garibaldi). Ert bord är reserverat hela kvällen till det officiellt bekräftade enhetspriset 75 € per person: en bordsserverad fyrarätters nyårsmiddag, glad italiensk Cena Cantata med livemusik som passar både föräldrar, barn och tonåringar, mineralvatten, kaffe, 1 flaska Vino Nobile di Montepulciano eller Vermentino di Gallura per 4 vuxna, prosecco vid tolvslaget, traditionell cotechino med linser samt DJ-set fram till kl. 03:00. Skriv till oss på WhatsApp +39 351 912 7047 för rymliga familjebord, barnstolar och enkla köksanpassningar av rätterna för barn och ungdomar.",
    "music": "Glad italiensk Cena Cantata live för föräldrar, barn och tonåringar · Tolvslagsfirande & DJ-set till 03:00",
    "dress": "Festlig och bekväm nyårsklädsel för vuxna och barn",
    "priceSum": "Officiellt enhetspris 75 € per person · Bordsserverad middag + Vin (1 flaska / 4 vuxna) + Familje-Cena Cantata + DJ",
    "tierLabel": "Bordsserverad Nyårsmiddag för Familjer & Sällskap + Cena Cantata + DJ-Set (från 20:30)",
    "tierPrice": "75 € per person",
    "tierDesc": "Eget reserverat bord hela natten med fyrarätters serverad meny (förrättstrio från hav och land, Carnaroli-risotto med karljohan och saffran, nötytterfilé/ribeye på lavasten med färskpotatis, pandoro-tiramisù med chokladdroppar), vatten, kaffe, 1 flaska Montepulciano- eller Vermentino-vin per 4 vuxna, prosecco och linser vid midnatt samt DJ-set. Familjebord, barnstolar och enkla barnanpassningar i köket bokas via WhatsApp +39 351 912 7047.",
    "highlights": [
      "Välkomnande och trygg nyårsafton för barnfamiljer på Bastioni di Porta Nuova 9 med eget bord hela kvällen",
      "Bekräftat officiellt enhetspris på 75 € per person med 4 serverade rätter, vatten, kaffe och nyårslinser",
      "Inkluderar 1 flaska Montepulciano- eller Vermentino-vin per 4 vuxna samt ett glas prosecco vid tolvslaget",
      "Personlig hjälp via WhatsApp +39 351 912 7047 för familjebord, barnstolar och enklare rätter från köket för barnen"
    ],
    "source": "Officiellt bekräftad 2027-meny och prislista för Carlsberg Øl Milano (Bastioni di Porta Nuova 9, 31 december 2026 kl. 20:30–03:00): bordsserverat familjenyår med Cena Cantata och DJ-set till enhetspriset 75 € per person inkl. 1 flaska vin per 4 vuxna, vatten, kaffe, prosecco och linser. Familjebord, barnstolar och barnönskemål via WhatsApp +39 351 912 7047.",
    "steps": [
      "20:30 Dörrarna öppnas på Bastioni di Porta Nuova 9 med lugn ankomst till era reserverade familjebord",
      "21:00 Fyrarätters serverad nyårsmiddag till tonerna av glada italienska allsångslåtar (Cena Cantata)",
      "00:00 Gemensam nedräkning till tolvslaget, prosecco-skål för vuxna och traditionell cotechino med linser",
      "00:30 – 03:00 Nyårsfest med DJ-set medan familjens bord står kvar hela natten"
    ],
    "menuTitle": "Officiell Familjenyårsmeny 2027 · Cena Cantata & DJ-Set (75 €)",
    "menuBev": "Ingår i priset på 75 €: mineralvatten, kaffe, 1 flaska Vino Nobile di Montepulciano eller Vermentino di Gallura per 4 vuxna samt ett glas prosecco för vuxna vid tolvslaget med cotechino och linser. Enkla köksanpassningar för barn, tonåringar eller allergier ordnas via WhatsApp +39 351 912 7047.",
    "courseLabels": [
      "Förrätt",
      "Första rätt",
      "Huvudrätt",
      "Efterrätt",
      "Midnattstradition"
    ],
    "dishes": [
      "Venetianskt gratinerade pilgrimsmusslor, potatiskroketter med Patanegra-skinka på spett och Parmigiano-korg med puntarelle, burrata och kantabrisk ansjovis",
      "Carnaroli-risotto med karljohanssvamp och äkta saffranspistiller",
      "Grillad nötrevbensstek ribeye på lavasten med chimichurrisås och ugnsrostad färskpotatis",
      "Julig pandoro-tiramisù med mörka chokladdroppar",
      "Traditionell cotechino med lyckobringande linser och ett glas prosecco vid midnatt"
    ],
    "faqs": [
      [
        "Varför passar Carlsberg Øl Milano så bra för familjer med barn och tonåringar på nyårsafton?",
        "De rymliga tegelvalvssalarna ger hela familjen en egen bekväm bordsplats hela kvällen, med lugn bordsservering och festlig italiensk livemusik som uppskattas över generationsgränserna."
      ],
      [
        "Vad är det officiella priset och kan ni ordna barnstolar eller enklare rätter åt barnen?",
        "Restaurangens officiellt verifierade pris är ett enhetspris på 75 € per person. Hör av er på WhatsApp +39 351 912 7047 vid bokningen så ordnar vi sammanhängande familjebord, barnstolar och enkla anpassningar i köket."
      ],
      [
        "Vad ingår i kuvertpriset på 75 € per person?",
        "Det inkluderar reserverat bord från kl. 20:30, fyra serverade rätter, vatten, kaffe, 1 flaska Montepulciano eller Vermentino per 4 vuxna, prosecco och linser vid midnatt, live Cena Cantata och DJ-set till kl. 03:00."
      ],
      [
        "Hur tar man sig enkelt dit med familjen och hur bokar man?",
        "Carlsberg Øl ligger på Bastioni di Porta Nuova 9 intill Piazza XXV Aprile och Corso Como, 5 minuters promenad från tunnelbana M2 Moscova och M2/M5 Porta Garibaldi. Boka via WhatsApp +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Tidsschema för Familjenyår 2027",
    "menusHeading": "Officiell 75 € Meny (Vin Ingår)",
    "conditionsHeading": "Familjeservice, Vad som Ingår & Läge vid Porta Nuova"
  },
  "no": {
    "nyeTitle": "Familienyttår 2027",
    "milano": "Milano",
    "dec31": "Torsdag 31. desember 2026",
    "title": "Nyttårsaften 2027 for Familier hos Carlsberg Øl Milano · Middag, Cena Cantata & DJ (75 €)",
    "sub": "Carlsberg Øl Milano · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Enhetspris 75 € · Familievennlig",
    "desc": "Feir inngangen til 2027 sammen med hele familien under de romslige historiske mursteinshvelvene hos Carlsberg Øl Milano i Bastioni di Porta Nuova 9 (området Porta Nuova / Corso Como, 5 minutters gange fra T-banestasjonene M2 Moscova og M2/M5 Porta Garibaldi). Bordet deres står reservert hele kvelden til den offisielt bekreftede enhetsprisen på 75 € per person: en bordservert fireretters nyttårsmiddag, livlig italiensk Cena Cantata med livemusikk som passer både foreldre, barn og tenåringer, mineralvann, kaffe, 1 flaske Vino Nobile di Montepulciano eller Vermentino di Gallura per 4 voksne, prosecco ved midnatt, tradisjonell cotechino med linser samt DJ-set frem til kl. 03:00. Send oss en melding på WhatsApp +39 351 912 7047 for gode familiebord, barnestoler og enkle kjøkkentilpasninger av rettene for barn og ungdom.",
    "music": "Hyggelig italiensk Cena Cantata-livemusikk for foreldre, barn og tenåringer · Midnattsnedtelling & DJ-set til 03:00",
    "dress": "Pent og behagelig nyttårsantrekk for både voksne og barn",
    "priceSum": "Offisiell enhetspris 75 € per person · Bordservert middag + Vin (1 flaske / 4 voksne) + Familie-Cena Cantata + DJ",
    "tierLabel": "Bordservert Nyttårsmiddag for Familier & Grupper + Cena Cantata + DJ-Set (fra 20:30)",
    "tierPrice": "75 € per person",
    "tierDesc": "Eget reservert bord hele natten med fireretters bordservert meny (tredelt forrett fra hav og land, Carnaroli-risotto med steinsopp og safran, okse-ribeye stekt på lavastein med nypoteter, pandoro-tiramisù med sjokoladedråper), vann, kaffe, 1 flaske Montepulciano- eller Vermentino-vin per 4 voksne, prosecco og linser ved midnatt samt DJ-set. Familiebord, barnestoler og enkle barnetilpasninger på kjøkkenet avtales via WhatsApp +39 351 912 7047.",
    "highlights": [
      "Trygg og trivelig nyttårsfeiring for barnefamilier i Bastioni di Porta Nuova 9 med eget bord hele kvelden",
      "Bekreftet offisiell enhetspris på 75 € per person inkludert 4 serverte retter, vann, kaffe og midnattslinser",
      "Inkluderer 1 flaske Montepulciano- eller Vermentino-vin per 4 voksne samt et glass prosecco ved midnatt",
      "Direkte hjelp på WhatsApp +39 351 912 7047 for romslige familiebord, barnestoler og enklere barneporsjoner fra kjøkkenet"
    ],
    "source": "Offisielt bekreftet 2027-meny og prisliste for Carlsberg Øl Milano (Bastioni di Porta Nuova 9, 31. desember 2026 kl. 20:30–03:00): bordservert familienyttår med Cena Cantata og DJ-set til enhetspris 75 € per person inkl. 1 flaske vin per 4 voksne, vann, kaffe, prosecco og linser. Familiebord, barnestoler og barneønsker via WhatsApp +39 351 912 7047.",
    "steps": [
      "20:30 Dørene åpner i Bastioni di Porta Nuova 9 og rolig innsjekk ved reserverte familiebord",
      "21:00 Fireretters servert nyttårsmiddag akkompagnert av glade italienske Cena Cantata-sanger",
      "00:00 Felles nedtelling ved midnatt, prosecco-skål for de voksne og tradisjonell cotechino med linser",
      "00:30 – 03:00 Nyttårsfest med DJ-set mens familien beholder sitt eget bord hele natten"
    ],
    "menuTitle": "Offisiell Familienyttårsmeny 2027 · Cena Cantata & DJ-Set (75 €)",
    "menuBev": "Inkludert i prisen på 75 €: mineralvann, kaffe, 1 flaske Vino Nobile di Montepulciano eller Vermentino di Gallura per 4 voksne samt et glass prosecco til voksne ved midnatt med cotechino og linser. Enkle kjøkkentilpasninger for barn, tenåringer eller allergier ordnes på forhånd via WhatsApp +39 351 912 7047.",
    "courseLabels": [
      "Forrett",
      "Første rett",
      "Hovedrett",
      "Dessert",
      "Midnattstradisjon"
    ],
    "dishes": [
      "Venetiansk gratinerte kamskjell, potetkroketter med Patanegra-skinke på spyd og Parmigiano-kurv med puntarelle, burrata og kantabriske ansjos",
      "Carnaroli-risotto med steinsopp og ekte safrantråder",
      "Okse-ribeye grillet på lavastein med chimichurrisaus og ovnsbakte nypoteter",
      "Juleinspirert pandoro-tiramisù med mørke sjokoladedråper",
      "Tradisjonell cotechino med lykkebringende linser og et glass prosecco til midnattsskålen"
    ],
    "faqs": [
      [
        "Hvorfor passer Carlsberg Øl Milano så godt for familier med barn på nyttårsaften?",
        "De romslige hvelvede salene gir familien et fast og behagelig bord hele kvelden, med skikkelig bordservering og hyggelig italiensk livemusikk uten nattklubbtrengsel."
      ],
      [
        "Hva er den offisielle prisen, og kan vi få barnestoler eller enklere retter til barna?",
        "Stedets offisielt bekreftede pris er en enhetspris på 75 € per person. Når dere bestiller via WhatsApp +39 351 912 7047, ordner vi gode familiebord, barnestoler og enkle tilpasninger på kjøkkenet."
      ],
      [
        "Hva er inkludert i prisen på 75 € per person?",
        "Den dekker reservert bord fra kl. 20:30, fire serverte retter, vann, kaffe, 1 flaske Montepulciano eller Vermentino per 4 voksne, prosecco og linser ved midnatt, live Cena Cantata og DJ-set til kl. 03:00."
      ],
      [
        "Hvordan kommer man seg enkelt dit med familien, og hvordan bestiller man?",
        "Restauranten ligger i Bastioni di Porta Nuova 9 like ved Piazza XXV Aprile og Corso Como, 5 minutters gange fra metro M2 Moscova og M2/M5 Porta Garibaldi. Bestill på WhatsApp +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Tidsskjema for Familienyttår 2027",
    "menusHeading": "Offisiell 75 € Meny (Vin Inkludert)",
    "conditionsHeading": "Familiekomfort, Inkludert i Prisen & Beliggenhet"
  },
  "is": {
    "nyeTitle": "Fjölskylduáramót 2027",
    "milano": "Mílanó",
    "dec31": "Fimmtudaginn 31. desember 2026",
    "title": "Áramótakvöld 2027 fyrir Fjölskyldur á Carlsberg Øl Mílanó · Kvöldverður, Cena Cantata & DJ (75 €)",
    "sub": "Carlsberg Øl Mílanó · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Eitt verð 75 € · Fjölskylduvænt",
    "desc": "Fagnið komu ársins 2027 með allri fjölskyldunni undir rúmgóðum sögulegum múrsteinshvelfingum Carlsberg Øl Mílanó við Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como hverfið, 5 mínútna gangur frá M2 Moscova og M2/M5 Porta Garibaldi neðanjarðarlestarstöðvunum). Borðið ykkar er frátekið allt kvöldið á staðfestu opinberu verði, 75 € á mann: fjögurra rétta þjónaður hátíðarkvöldverður, lífleg ítölsk Cena Cantata lifandi tónlist sem hentar foreldrum, börnum og unglingum, sódavatn, kaffi, 1 flaska af Vino Nobile di Montepulciano eða Vermentino di Gallura víni á hverja 4 fullorðna, prosecco á miðnætti, hefðbundið cotechino með linsubaunum og plötusnúður til kl. 03:00. Sendið okkur skilaboð á WhatsApp +39 351 912 7047 til að skipuleggja þægileg fjölskylduborð, barnastóla og einfaldar eldhúsbreytingar fyrir börn og unglinga.",
    "music": "Lífleg ítölsk Cena Cantata lifandi tónlist fyrir foreldra, börn og unglinga · Miðnæturniðurtalning & DJ til 03:00",
    "dress": "Snyrtilegur og þægilegur hátíðarklæðnaður fyrir fullorðna og börn",
    "priceSum": "Opinbert einingarverð 75 € á mann · Þjónaður kvöldverður + Vín (1 flaska / 4 fullorðnir) + Fjölskyldu-Cena Cantata + DJ",
    "tierLabel": "Þjónaður áramótakvöldverður fyrir fjölskyldur & hópa + Cena Cantata + DJ-sett (frá 20:30)",
    "tierPrice": "75 € á mann",
    "tierDesc": "Frátekið borð allt kvöldið með fjögurra rétta þjónuðum matseðli (þrískiptur forréttur af sjó og landi, Carnaroli-risotto með karljóhannsveppum og saffrani, nautasteik ribeye af hraunsteini með nýjum kartöflum, pandoro-tiramisù með súkkulaðidropum), vatni, kaffi, 1 flösku af Montepulciano- eða Vermentino-víni á 4 fullorðna, prosecco og linsubaunum á miðnætti auk DJ-setts. Fjölskylduborð, barnastólar og einfaldar barnabreytingar í eldhúsi í gegnum WhatsApp +39 351 912 7047.",
    "highlights": [
      "Hlýlegt og þægilegt gamlárskvöld fyrir barnafjölskyldur við Bastioni di Porta Nuova 9 með eigið borð allt kvöldið",
      "Staðfest opinbert verð 75 € á mann með 4 þjónuðum réttum, vatni, kaffi og linsubaunum á miðnætti",
      "Innifalin 1 flaska af Montepulciano- eða Vermentino-víni á hverja 4 fullorðna auk prosecco-glass á miðnætti",
      "Bein aðstoð á WhatsApp +39 351 912 7047 fyrir rúmgóð fjölskylduborð, barnastóla og einfaldari rétti fyrir yngstu gestina"
    ],
    "source": "Staðfestur opinber 2027 matseðill og verðskrá Carlsberg Øl Mílanó (Bastioni di Porta Nuova 9, 31. desember 2026 kl. 20:30–03:00): fjölskylduvænn kvöldverður með Cena Cantata og DJ-setti á 75 € á mann, 1 vínflaska á 4 fullorðna, vatn, kaffi, prosecco og linsubaunir. Fjölskylduborð og barnastólar í gegnum WhatsApp +39 351 912 7047.",
    "steps": [
      "20:30 Húsið opnar við Bastioni di Porta Nuova 9 og sest er í rólegheitum við frátekin fjölskylduborð",
      "21:00 Fjögurra rétta þjónaður áramótakvöldverður undir glöðum ítölskum Cena Cantata söngvum",
      "00:00 Sameiginleg niðurtalning á miðnætti, prosecco-skál fyrir fullorðna og hefðbundið cotechino með linsubaunum",
      "00:30 – 03:00 Nýársfagnaður með plötusnúð á meðan borð fjölskyldunnar helst áfram frátekið"
    ],
    "menuTitle": "Opinber fjölskyldumatseðill áramóta 2027 · Cena Cantata & DJ (75 €)",
    "menuBev": "Innifalið í 75 € verðinu: sódavatn, kaffi, 1 flaska af Vino Nobile di Montepulciano eða Vermentino di Gallura á hverja 4 fullorðna og prosecco-glas fyrir fullorðna á miðnætti með cotechino og linsubaunum. Einfaldar breytingar í eldhúsi fyrir börn, unglinga eða ofnæmi fást með fyrirvara á WhatsApp +39 351 912 7047.",
    "courseLabels": [
      "Forréttur",
      "Fyrsti réttur",
      "Aðalréttur",
      "Eftirréttur",
      "Miðnæturhefð"
    ],
    "dishes": [
      "Gratíneraður hörpudiskur að feneyskum hætti, kartöflukrókettur með Patanegra-skinku á spjóti og Parmigiano-karfa með puntarelle, burrata og ansjósum frá Kantabríu",
      "Carnaroli-risotto með karljóhannsveppum og ekta saffranþráðum",
      "Nauta-ribeye grillað á hraunsteini með chimichurri-sósu og ofnbökuðum nýjum kartöflum",
      "Hátíðlegt pandoro-tiramisù með dökkum súkkulaðidropum",
      "Hefðbundið ítalskt cotechino með heillalinsubaunum og prosecco-glasi til að skála"
    ],
    "faqs": [
      [
        "Af hverju hentar Carlsberg Øl Mílanó svona vel fyrir barnafjölskyldur á gamlárskvöld?",
        "Rúmgóðir hvelfdir salir tryggja fjölskyldunni fast og þægilegt borð allt kvöldið þar sem borðþjónusta og glaðvær ítölsk tónlist fara vel saman án næturklúbbaþrengsla."
      ],
      [
        "Hvert er opinbera verðið og er hægt að fá barnastóla eða einfaldari rétti fyrir börn?",
        "Staðfest opinbert verð staðarins er eitt verð, 75 € á mann. Þegar bókað er á WhatsApp +39 351 912 7047 útbúum við góð fjölskylduborð, barnastóla og einfaldar eldhúsbreytingar fyrir börn eða ofnæmi."
      ],
      [
        "Hvað er innifalið í 75 € verðinu á mann?",
        "Innifalið er frátekið borð frá kl. 20:30, fjórir þjónaðir réttir, vatn, kaffi, 1 vínflaska á 4 fullorðna, prosecco og linsubaunir á miðnætti, lifandi Cena Cantata og DJ til kl. 03:00."
      ],
      [
        "Hvernig er best að komast þangað með fjölskylduna og hvernig bókar maður?",
        "Veitingastaðurinn er við Bastioni di Porta Nuova 9 rétt hjá Piazza XXV Aprile og Corso Como, í 5 mínútna göngufæri frá M2 Moscova og M2/M5 Porta Garibaldi. Bókið á WhatsApp +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Dagskrá fjölskylduáramóta 2027",
    "menusHeading": "Opinber 75 € matseðill (vín innifalið)",
    "conditionsHeading": "Þægindi fyrir fjölskyldur, innifalið & staðsetning"
  },
  "uk": {
    "nyeTitle": "Сімейний Новий рік 2027",
    "milano": "Мілан",
    "dec31": "Четвер, 31 грудня 2026 року",
    "title": "Сімейний Новий рік 2027 у Carlsberg Øl Мілан · Вечеря, Cena Cantata та DJ (75 €)",
    "sub": "Carlsberg Øl Мілан · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Єдиний тариф 75 € · Зручно з дітьми",
    "desc": "Зустріньте 2027 рік усією родиною в просторих історичних залах із цегляними склепіннями ресторану Carlsberg Øl у Мілані за адресою Bastioni di Porta Nuova 9 (район Porta Nuova / Corso Como, 5 хвилин пішки від станцій метро M2 Moscova та M2/M5 Porta Garibaldi). Ваш столик залишається заброньованим на весь вечір за офіційно підтвердженим єдиним тарифом 75 € з особи: святкова вечеря з чотирьох страв із подачею до столу, тепла жива італійська музична програма Cena Cantata для батьків, дітей і підлітків, мінеральна вода, кава, 1 пляшка вина Vino Nobile di Montepulciano або Vermentino di Gallura на кожні 4 дорослих, келих просеко опівночі, традиційне котекіно з сочевицею та DJ-сет до 03:00. Напишіть нам у WhatsApp +39 351 912 7047, щоб підготувати зручні сімейні столи, дитячі стільчики та прості кулінарні зміни страв для дітей і підлітків.",
    "music": "Радісна жива італійська Cena Cantata для батьків, дітей і підлітків · Опівнічний відлік та DJ-сет до 03:00",
    "dress": "Святковий і зручний вечірній одяг для дорослих та дітей",
    "priceSum": "Офіційний єдиний тариф 75 € з особи · Сервірована вечеря + Вино (1 пл. / 4 дорослих) + Сімейна Cena Cantata + DJ",
    "tierLabel": "Сімейна новорічна вечеря з подачею + Cena Cantata + DJ-сет (з 20:30)",
    "tierPrice": "75 € з особи",
    "tierDesc": "Закріплений столик на всю ніч із чотиристравним меню (тріо морських і м'ясних закусок, ризото Карнаролі з білими грибами та шафраном, яловичий рібай на лавовому камені з молодою картоплею, святкове тирамісу з пандоро та краплями шоколаду), водою, кавою, 1 пляшкою вина Montepulciano або Vermentino на 4 дорослих, просеко і сочевицею опівночі та DJ-сетом. Сімейні столи, дитячі стільчики й адаптація страв для дітей через WhatsApp +39 351 912 7047.",
    "highlights": [
      "Затишна новорічна ніч для родин із дітьми та підлітками на Bastioni di Porta Nuova 9 зі своїм столиком до кінця свята",
      "Підтверджений офіційний єдиний тариф 75 € з особи за 4 подачі страв, воду, каву та новорічну сочевицю",
      "У вартість входить 1 пляшка вина Montepulciano або Vermentino на кожні 4 дорослих та келих просеко опівночі",
      "Підтримка у WhatsApp +39 351 912 7047 для зручних родинних столів, дитячих стільчиків і простіших дитячих страв"
    ],
    "source": "Офіційно підтверджене меню та прайс 2027 Carlsberg Øl Мілан (Bastioni di Porta Nuova 9, 31 грудня 2026, 20:30–03:00): сімейна вечеря з подачею, програмою Cena Cantata та DJ-сетом за єдиною ціною 75 € з особи, 1 пляшка вина на 4 дорослих, вода, кава, просеко і сочевиця. Родинні столи, стільчики та дитячі опції через WhatsApp +39 351 912 7047.",
    "steps": [
      "20:30 Відкриття дверей на Bastioni di Porta Nuova 9 та спокійне розміщення за заброньованими сімейними столами",
      "21:00 Святкова вечеря з чотирьох страв під супровід живих італійських пісень Cena Cantata",
      "00:00 Спільна зустріч Нового року, тост із просеко для дорослих і традиційне котекіно з сочевицею",
      "00:30 – 03:00 Новорічна вечірка з DJ-сетом зі збереженням вашого родинного столу на всю ніч"
    ],
    "menuTitle": "Офіційне сімейне новорічне меню 2027 · Cena Cantata та DJ (75 €)",
    "menuBev": "У тариф 75 € входять: мінеральна вода, кава, 1 пляшка Vino Nobile di Montepulciano або Vermentino di Gallura на кожні 4 дорослих і келих просеко для дорослих опівночі з котекіно та сочевицею. Прості зміни страв на кухні для дітей, підлітків або при алергіях узгоджуються заздалегідь у WhatsApp +39 351 912 7047.",
    "courseLabels": [
      "Закуска",
      "Перша страва",
      "Основна страва",
      "Десерт",
      "Опівнічна традиція"
    ],
    "dishes": [
      "Запечені морські гребінці по-венеційськи, картопляні крокети з шинкою Патанегра на шпажці та кошик із Парміджано з пунтареле, буратою і кантабрійськими анчоусами",
      "Ризото Карнаролі з білими грибами та тичинками шафрану",
      "Яловичий рібай на лавовому камені з соусом чимічурі та запеченою молодою картоплею",
      "Святкове тирамісу з різдвяного пандоро з краплями чорного шоколаду",
      "Традиційне італійське котекіно з сочевицею на щастя та келих просеко для тосту"
    ],
    "faqs": [
      [
        "Чому Carlsberg Øl у Мілані чудово підходить для святкування Нового року з дітьми?",
        "Просторі склепінчасті зали дають родині власний зручний стіл на весь вечір, поєднуючи спокійну сервіровану вечерю та щиру італійську живу музику без клубної тісняви."
      ],
      [
        "Яка офіційна вартість і чи можна замовити дитячі стільчики або простіші страви для дитини?",
        "Офіційно підтверджений тариф закладу єдиний: 75 € з особи. Напишіть під час бронювання у WhatsApp +39 351 912 7047, і ми підготуємо просторий сімейний стіл, дитячі стільчики та прості зміни страв на кухні."
      ],
      [
        "Що саме входить у вартість 75 € з особи?",
        "Входять столик із 20:30, чотири подачі вечері, вода, кава, 1 пляшка вина Montepulciano або Vermentino на 4 дорослих, опівнічне просеко з сочевицею, жива Cena Cantata та DJ-сет до 03:00."
      ],
      [
        "Як зручно дістатися з родиною та забронювати столик?",
        "Ресторан розташований на Bastioni di Porta Nuova 9 поруч із Piazza XXV Aprile та Corso Como, за 5 хвилин пішки від метро M2 Moscova та M2/M5 Porta Garibaldi. Бронювання у WhatsApp +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Розклад сімейного Нового року 2027",
    "menusHeading": "Офіційне меню 75 € (вино включено)",
    "conditionsHeading": "Зручності для родин, що входить у ціну та локація"
  },
  "sq": {
    "nyeTitle": "Viti i Ri Familjar 2027",
    "milano": "Milano",
    "dec31": "E enjte, 31 dhjetor 2026",
    "title": "Viti i Ri 2027 për Familje te Carlsberg Øl Milano · Darkë e Shërbyer, Cena Cantata & DJ (75 €)",
    "sub": "Carlsberg Øl Milano · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Çmim unik 75 € · Ideale për familje",
    "desc": "Pritni vitin 2027 me gjithë familjen nën harqet e bollshme historike me tulla të Carlsberg Øl Milano në Bastioni di Porta Nuova 9 (zona Porta Nuova / Corso Como, 5 minuta në këmbë nga stacionet e metrosë M2 Moscova dhe M2/M5 Porta Garibaldi). Tavolina juaj mbetet e rezervuar gjatë gjithë mbrëmjes me tarifën zyrtare të verifikuar prej 75 € për person: darkë festive me katër pjata të shërbyera në tavolinë, atmosferë e gëzueshme live Cena Cantata e përshtatshme për prindër, fëmijë dhe adoleshentë, ujë mineral, kafe, 1 shishe verë Vino Nobile di Montepulciano ose Vermentino di Gallura për çdo 4 të rritur, gotë prosecco në mesnatë, cotechino tradicional me thjerrëza dhe DJ set deri në orën 03:00. Na shkruani në WhatsApp +39 351 912 7047 për të rregulluar tavolina familjare të rehatshme, karrige për fëmijë dhe përshtatje të thjeshta në kuzhinë për më të vegjlit.",
    "music": "Cena Cantata italiane live e gëzueshme për prindër, fëmijë dhe të rinj · Numërimi i mesnatës & DJ Set deri në 03:00",
    "dress": "Veshje festive elegante dhe e rehatshme për të rritur dhe fëmijë",
    "priceSum": "Çmim zyrtar unik 75 € për person · Darkë e shërbyer + Verë (1 shishe / 4 të rritur) + Cena Cantata familjare + DJ",
    "tierLabel": "Darkë Viti të Ri për Familje & Grupe + Cena Cantata + DJ Set (nga ora 20:30)",
    "tierPrice": "75 € për person",
    "tierDesc": "Tavolinë e rezervuar gjithë natën me menu të plotë me katër pjata (antipastë treshe deti dhe toke, rizoto Carnaroli me kërpudha porcini dhe shafran, ribeye viçi në gur llave me patate të reja, tiramisù me pandoro dhe pika çokollate), ujë, kafe, 1 shishe verë Montepulciano ose Vermentino për 4 të rritur, prosecco dhe thjerrëza në mesnatë, si dhe DJ set. Tavolinat familjare, karriget për foshnja dhe përshtatjet për fëmijë koordinohen në WhatsApp +39 351 912 7047.",
    "highlights": [
      "Mbrëmje mikpritëse e Vitit të Ri për familje me fëmijë dhe adoleshentë në Bastioni di Porta Nuova 9 me tavolinë gjithë natën",
      "Tarifë zyrtare unike e konfirmuar 75 € për person me 4 pjata të shërbyera, ujë, kafe dhe thjerrëzat e mesnatës",
      "Përfshihet 1 shishe verë Montepulciano ose Vermentino për çdo 4 të rritur dhe gotë prosecco në ndërrimin e viteve",
      "Asistencë direkte në WhatsApp +39 351 912 7047 për tavolina familjare të gjera, karrige fëmijësh dhe pjata të thjeshtuara"
    ],
    "source": "Menuja dhe çmimi zyrtar i konfirmuar 2027 i Carlsberg Øl Milano (Bastioni di Porta Nuova 9, 31 dhjetor 2026, 20:30–03:00): darkë e shërbyer familjare me Cena Cantata dhe DJ set me çmim unik 75 € për person, 1 shishe verë për 4 të rritur, ujë, kafe, prosecco dhe thjerrëza. Tavolina familjare dhe karrige fëmijësh në WhatsApp +39 351 912 7047.",
    "steps": [
      "20:30 Hapja e dyerve në Bastioni di Porta Nuova 9 dhe akomodimi i qetë në tavolinat familjare të rezervuara",
      "21:00 Darka festive me katër pjata e shoqëruar nga këngët italiane live të Cena Cantata",
      "00:00 Numërimi së bashku në mesnatë, dolli me prosecco për të rriturit dhe cotechino tradicional me thjerrëza",
      "00:30 – 03:00 Festë e Vitit të Ri me DJ set duke mbajtur tavolinën tuaj familjare gjatë gjithë natës"
    ],
    "menuTitle": "Menuja Zyrtare Familjare e Vitit të Ri 2027 · Cena Cantata & DJ (75 €)",
    "menuBev": "Përfshirë në çmimin prej 75 €: ujë mineral, kafe, 1 shishe Vino Nobile di Montepulciano ose Vermentino di Gallura për çdo 4 të rritur dhe gotë prosecco për të rriturit në mesnatë me cotechino dhe thjerrëza. Përshtatje të thjeshta në kuzhinë për fëmijë, adoleshentë ose alergji ushqimore ofrohen përmes WhatsApp +39 351 912 7047.",
    "courseLabels": [
      "Antipastë",
      "Pjata e Parë",
      "Pjata Kryesore",
      "Ëmbëlsirë",
      "Tradita e Mesnatës"
    ],
    "dishes": [
      "Guaska deti të gratinuara sipas mënyrës veneciane, kroketa patatesh me proshutë Patanegra në shkop dhe shportë Parmigiano me puntarelle, burrata dhe açuge të Kantabrisë",
      "Rizoto Carnaroli me kërpudha porcini dhe fije shafrani",
      "Ribeye viçi i pjekur në gur llave me salcë chimichurri dhe patate të reja furre",
      "Tiramisù festiv me pandoro dhe pika çokollate të zezë",
      "Cotechino tradicional italian me thjerrëza mbarësie dhe gotë prosecco për dolli"
    ],
    "faqs": [
      [
        "Pse Carlsberg Øl Milano është zgjedhje shumë e mirë për familjet me fëmijë natën e Vitit të Ri?",
        "Sallat e mëdha me harqe u japin familjeve rehatinë e tavolinës së tyre gjatë gjithë mbrëmjes, duke bashkuar darkën e shërbyer me muzikë live të gëzueshme për çdo moshë."
      ],
      [
        "Cili është çmimi zyrtar dhe a mund të kërkojmë karrige fëmijësh ose pjata më të thjeshta?",
        "Tarifa zyrtare e konfirmuar e lokalit është unike 75 € për person. Duke na shkruar gjatë rezervimit në WhatsApp +39 351 912 7047, përgatisim tavolina familjare të rehatshme, karrige fëmijësh dhe ndryshime të thjeshta në kuzhinë."
      ],
      [
        "Çfarë përfshihet saktësisht në biletën 75 € për person?",
        "Përfshin tavolinën e rezervuar nga ora 20:30, katër pjata të shërbyera, ujë, kafe, 1 shishe verë Montepulciano ose Vermentino për 4 të rritur, prosecco dhe thjerrëza në mesnatë, Cena Cantata live dhe DJ set deri në 03:00."
      ],
      [
        "Si arrihet lehtë me familjen dhe si bëhet rezervimi?",
        "Restoranti ndodhet në Bastioni di Porta Nuova 9 pranë Piazza XXV Aprile dhe Corso Como, 5 minuta në këmbë nga metroja M2 Moscova dhe M2/M5 Porta Garibaldi. Rezervoni në WhatsApp +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Programi i Vitit të Ri Familjar 2027",
    "menusHeading": "Menuja Zyrtare 75 € (Vera e Përfshirë)",
    "conditionsHeading": "Komoditeti Familjar, Përfshirjet & Vendndodhja"
  },
  "sr": {
    "nyeTitle": "Porodični doček 2027.",
    "milano": "Milano",
    "dec31": "Četvrtak, 31. decembar 2026.",
    "title": "Porodični doček Nove godine 2027. u Carlsberg Øl Milano · Večera, Cena Cantata i DJ (75 €)",
    "sub": "Carlsberg Øl Milano · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Jedinstvena cena 75 € · Za porodice",
    "desc": "Dočekajte 2027. godinu sa celom porodicom pod prostranim istorijskim svodovima od opeke restorana Carlsberg Øl Milano na adresi Bastioni di Porta Nuova 9 (četvrt Porta Nuova / Corso Como, 5 minuta hoda od stanica metroa M2 Moscova i M2/M5 Porta Garibaldi). Vaš sto ostaje rezervisan tokom cele večeri po zvanično potvrđenoj jedinstvenoj ceni od 75 € po osobi: poslužena svečana večera u četiri sleda, vesela italijanska muzika uživo Cena Cantata prilagođena roditeljima, deci i tinejdžerima, mineralna voda, kafa, 1 flaša vina Vino Nobile di Montepulciano ili Vermentino di Gallura na svake 4 odrasle osobe, ponoćni prosecco, tradicionalni cotechino sa sočivom i DJ set do 03:00. Pišite nam na WhatsApp +39 351 912 7047 za udobne porodične stolove, stolice za bebe i jednostavne kuhinjske izmene jela za decu i mlade.",
    "music": "Vesela italijanska Cena Cantata uživo za roditelje, decu i tinejdžere · Ponoćno odbrojavanje i DJ set do 03:00",
    "dress": "Elegantno i udobno novogodišnje odevanje za odrasle i decu",
    "priceSum": "Zvanična jedinstvena cena 75 € po osobi · Poslužena večera + Vino (1 flaša / 4 odraslih) + Porodična Cena Cantata + DJ",
    "tierLabel": "Porodična poslužena novogodišnja večera + Cena Cantata + DJ set (od 20:30)",
    "tierPrice": "75 € po osobi",
    "tierDesc": "Rezervisan sto celu noć uz posluženi meni u četiri sleda (trostruko predjelo mora i kopna, Carnaroli rižoto sa vrganjima i šafranom, goveđi ribeye sa vulkanskog kamena sa mladim krompirom, praznični pandoro tiramisù sa komadićima čokolade), vodu, kafu, 1 flašu vina Montepulciano ili Vermentino na 4 odrasle osobe, ponoćni prosecco i sočivo sa cotechino kobasicom, kao i DJ set. Porodični stolovi, dečje stolice i prilagođena jela za decu dogovaraju se preko WhatsAppa +39 351 912 7047.",
    "highlights": [
      "Topao i opušten doček Nove godine za porodice sa decom i tinejdžerima na Bastioni di Porta Nuova 9 uz sopstveni sto celu noć",
      "Zvanično potvrđena jedinstvena cena od 75 € po osobi sa 4 poslužena jela, vodom, kafom i ponoćnim sočivom",
      "Uključena 1 flaša vina Montepulciano ili Vermentino na svake 4 odrasle osobe i čaša prosecca u ponoć",
      "Direktna podrška na WhatsAppu +39 351 912 7047 za komotne porodične stolove, hranilice i jednostavnije dečje porcije"
    ],
    "source": "Zvanično potvrđen meni i cenovnik za 2027. restorana Carlsberg Øl Milano (Bastioni di Porta Nuova 9, 31. decembar 2026., 20:30–03:00): porodična poslužena večera uz Cena Cantata i DJ set po jedinstvenoj ceni od 75 € po osobi, 1 flaša vina na 4 odrasle osobe, voda, kafa, prosecco i sočivo. Porodični stolovi i dečje opcije putem WhatsAppa +39 351 912 7047.",
    "steps": [
      "20:30 Otvaranje vrata na Bastioni di Porta Nuova 9 i udoban smeštaj za rezervisane porodične stolove",
      "21:00 Svečana poslužena večera u četiri sleda uz radosne italijanske pesme uživo Cena Cantata",
      "00:00 Zajedničko porodično odbrojavanje u ponoć, zdravica proseccom za odrasle i tradicionalni cotechino sa sočivom",
      "00:30 – 03:00 Novogodišnja žurka uz DJ set dok vaš porodični sto ostaje na raspolaganju cele noći"
    ],
    "menuTitle": "Zvanični porodični novogodišnji meni 2027. · Cena Cantata i DJ (75 €)",
    "menuBev": "U cenu od 75 € uključeno je: mineralna voda, kafa, 1 flaša vina Vino Nobile di Montepulciano ili Vermentino di Gallura na svake 4 odrasle osobe i čaša prosecca za odrasle u ponoć uz cotechino i sočivo. Jednostavne kuhinjske izmene za decu, tinejdžere ili alergije dostupne su uz najavu na WhatsApp +39 351 912 7047.",
    "courseLabels": [
      "Predjelo",
      "Prvo jelo",
      "Glavno jelo",
      "Desert",
      "Ponoćna tradicija"
    ],
    "dishes": [
      "Gratinirane jakobove kapice na venecijanski način, kroketi od krompira sa šunkom Patanegra na štapiću i korpica od parmezana sa cikorijom puntarelle, buratom i kantabrijskim inćunima",
      "Carnaroli rižoto sa vrganjima i nitima pravog šafrana",
      "Goveđi ribeye pečen na vulkanskom kamenu sa sosom chimichurri i pečenim mladim krompirom",
      "Praznični tiramisù sa božićnim kolačem pandoro i kapljicama crne čokolade",
      "Tradicionalni novogodišnji cotechino sa sočivom za sreću i čašom prosecca za zdravicu"
    ],
    "faqs": [
      [
        "Zašto je Carlsberg Øl Milano odličan izbor za porodice sa decom u novogodišnjoj noći?",
        "Prostrane sale pod svodovima obezbeđuju porodici sopstveni udoban sto tokom cele večeri, spajajući mirnu posluženu večeru i veselu italijansku živu muziku za sve generacije."
      ],
      [
        "Koja je zvanična cena i da li obezbeđujete stolice za bebe ili jednostavnija jela za decu?",
        "Zvanično potvrđena cena restorana je jedinstvena i iznosi 75 € po osobi. Prilikom rezervacije putem WhatsAppa +39 351 912 7047 pripremamo komotne porodične stolove, hranilice i jednostavne izmene jela u kuhinji."
      ],
      [
        "Šta tačno obuhvata karta od 75 € po osobi?",
        "Obuhvata rezervisan sto od 20:30, četiri poslužena jela, vodu, kafu, 1 flašu vina Montepulciano ili Vermentino na 4 odrasle osobe, ponoćni prosecco i sočivo, živu Cena Cantata i DJ set do 03:00."
      ],
      [
        "Kako lako stići sa porodicom i rezervisati sto?",
        "Restoran se nalazi na adresi Bastioni di Porta Nuova 9 pored Piazza XXV Aprile i Corso Como, 5 minuta hoda od metroa M2 Moscova i M2/M5 Porta Garibaldi. Rezervacije na WhatsApp +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Raspored porodičnog dočeka 2027.",
    "menusHeading": "Zvanični meni od 75 € (vino uključeno)",
    "conditionsHeading": "Pogodnosti za porodice, šta je uključeno i lokacija"
  },
  "bs": {
    "nyeTitle": "Porodični doček 2027.",
    "milano": "Milano",
    "dec31": "Četvrtak, 31. decembar 2026.",
    "title": "Porodični doček Nove godine 2027. u Carlsberg Øl Milano · Večera, Cena Cantata i DJ (75 €)",
    "sub": "Carlsberg Øl Milano · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Jedinstvena cijena 75 € · Za porodice",
    "desc": "Dočekajte 2027. godinu sa cijelom porodicom pod prostranim historijskim svodovima od cigle restorana Carlsberg Øl Milano na adresi Bastioni di Porta Nuova 9 (četvrt Porta Nuova / Corso Como, 5 minuta pješice od stanica metroa M2 Moscova i M2/M5 Porta Garibaldi). Vaš sto ostaje rezervisan cijelu večer po zvanično potvrđenoj jedinstvenoj cijeni od 75 € po osobi: svečana poslužena večera u četiri slijeda, vesela italijanska muzika uživo Cena Cantata prilagođena roditeljima, djeci i tinejdžerima, mineralna voda, kafa, 1 flaša vina Vino Nobile di Montepulciano ili Vermentino di Gallura na svake 4 odrasle osobe, ponoćni prosecco, tradicionalni cotechino sa lećom i DJ set do 03:00. Pišite nam na WhatsApp +39 351 912 7047 za udobne porodične stolove, dječije hranilice i jednostavne kuhinjske prilagodbe jela za djecu i mlade.",
    "music": "Vesela italijanska Cena Cantata uživo za roditelje, djecu i tinejdžere · Ponoćno odbrojavanje i DJ set do 03:00",
    "dress": "Svečano i udobno novogodišnje odijevanje za odrasle i djecu",
    "priceSum": "Zvanična jedinstvena cijena 75 € po osobi · Poslužena večera + Vino (1 flaša / 4 odraslih) + Porodična Cena Cantata + DJ",
    "tierLabel": "Porodična poslužena novogodišnja večera + Cena Cantata + DJ set (od 20:30)",
    "tierPrice": "75 € po osobi",
    "tierDesc": "Rezervisan sto cijelu noć uz posluženi jelovnik u četiri slijeda (trostruko predjelo mora i kopna, Carnaroli rižoto sa vrganjima i šafranom, juneći ribeye sa vulkanskog kamena sa mladim krompirom, praznični pandoro tiramisù sa kapljicama čokolade), vodu, kafu, 1 flašu vina Montepulciano ili Vermentino na 4 odrasle osobe, ponoćni prosecco i leću uz cotechino te DJ set. Porodični stolovi, hranilice i jednostavne prilagodbe jela za djecu dogovaraju se putem WhatsAppa +39 351 912 7047.",
    "highlights": [
      "Ugodan i topao doček Nove godine za porodice sa djecom i tinejdžerima na Bastioni di Porta Nuova 9 uz vlastiti sto cijelu noć",
      "Zvanično potvrđena jedinstvena cijena od 75 € po osobi sa 4 poslužena slijeda, vodom, kafom i ponoćnom lećom",
      "Uključena 1 flaša vina Montepulciano ili Vermentino na svake 4 odrasle osobe i čaša prosecca u ponoć",
      "Direktna podrška na WhatsAppu +39 351 912 7047 za prostrane porodične stolove, dječije stolice i prilagođene dječije porcije"
    ],
    "source": "Zvanično potvrđeni jelovnik i cjenovnik za 2027. restorana Carlsberg Øl Milano (Bastioni di Porta Nuova 9, 31. decembar 2026., 20:30–03:00): porodična poslužena večera uz Cena Cantata i DJ set po jedinstvenoj cijeni od 75 € po osobi, 1 flaša vina na 4 odrasle osobe, voda, kafa, prosecco i leća. Porodični stolovi i dječije opcije putem WhatsAppa +39 351 912 7047.",
    "steps": [
      "20:30 Otvaranje vrata na Bastioni di Porta Nuova 9 i udoban smještaj za rezervisane porodične stolove",
      "21:00 Svečana poslužena večera u četiri slijeda uz vesele italijanske pjesme uživo Cena Cantata",
      "00:00 Zajedničko porodično odbrojavanje u ponoć, zdravica proseccom za odrasle i tradicionalni cotechino sa lećom",
      "00:30 – 03:00 Novogodišnje slavlje uz DJ set dok vaš porodični sto ostaje rezervisan cijelu večer"
    ],
    "menuTitle": "Zvanični porodični novogodišnji jelovnik 2027. · Cena Cantata i DJ (75 €)",
    "menuBev": "U cijenu od 75 € uključeno je: mineralna voda, kafa, 1 flaša vina Vino Nobile di Montepulciano ili Vermentino di Gallura na svake 4 odrasle osobe i čaša prosecca za odrasle u ponoć uz cotechino i leću. Jednostavne kuhinjske prilagodbe za djecu, tinejdžere ili alergije dostupne su uz najavu na WhatsApp +39 351 912 7047.",
    "courseLabels": [
      "Predjelo",
      "Prvo jelo",
      "Glavno jelo",
      "Desert",
      "Ponoćna tradicija"
    ],
    "dishes": [
      "Gratinirane jakobove kapice na venecijanski način, kroketi od krompira sa pršutom Patanegra na štapiću i korpica od Parmigiana sa cikorijom puntarelle, burratom i kantabrijskim inćunima",
      "Carnaroli rižoto sa vrganjima i nitima pravog šafrana",
      "Juneći ribeye pečen na vulkanskom kamenu uz sos chimichurri i pečeni mladi krompir",
      "Praznični tiramisù od pandora sa kapljicama tamne čokolade",
      "Tradicionalni novogodišnji cotechino sa lećom za sreću i čašom prosecca za zdravicu"
    ],
    "faqs": [
      [
        "Zašto je Carlsberg Øl Milano odličan izbor za porodice sa djecom u novogodišnjoj noći?",
        "Prostrane dvorane sa svodovima omogućavaju porodici vlastiti udoban sto tokom cijele večeri, spajajući mirnu posluženu večeru i veselu italijansku muziku uživo bez klupske gužve."
      ],
      [
        "Koja je zvanična cijena i da li nudite dječije hranilice ili jednostavnija jela za djecu?",
        "Zvanično potvrđena cijena restorana je jedinstvena i iznosi 75 € po osobi. Javite nam se prilikom rezervacije na WhatsApp +39 351 912 7047 kako bismo pripremili komotne porodične stolove, hranilice i jednostavne prilagodbe jela u kuhinji."
      ],
      [
        "Šta je sve uključeno u cijenu od 75 € po osobi?",
        "Uključeni su rezervisan sto od 20:30, četiri poslužena slijeda, voda, kafa, 1 flaša vina Montepulciano ili Vermentino na 4 odrasle osobe, ponoćni prosecco i leća, živa Cena Cantata i DJ set do 03:00."
      ],
      [
        "Kako jednostavno doći sa porodicom i rezervisati sto?",
        "Restoran se nalazi na Bastioni di Porta Nuova 9 pored Piazza XXV Aprile i Corso Como, 5 minuta pješice od metroa M2 Moscova i M2/M5 Porta Garibaldi. Rezervacije na WhatsApp +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Raspored porodičnog dočeka 2027.",
    "menusHeading": "Zvanični jelovnik od 75 € (vino uključeno)",
    "conditionsHeading": "Pogodnosti za porodice, šta je uključeno i lokacija"
  },
  "mk": {
    "nyeTitle": "Семејна Нова година 2027",
    "milano": "Милано",
    "dec31": "Четврток, 31 декември 2026 г.",
    "title": "Семејна Нова година 2027 во Carlsberg Øl Милано · Вечера, Cena Cantata и DJ (75 €)",
    "sub": "Carlsberg Øl Милано · Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano · 20:30 – 03:00 · Единствена цена 75 € · За семејства",
    "desc": "Дочекајте ја 2027 година со целото семејство под пространите историски сводови од тула на ресторанот Carlsberg Øl Милано на Bastioni di Porta Nuova 9 (кварт Porta Nuova / Corso Como, на 5 минути пеш од метро-станиците M2 Moscova и M2/M5 Porta Garibaldi). Вашата маса останува резервирана цела вечер по официјално потврдена единствена цена од 75 € по лице: свечена сервирана вечера во четири следа, весела италијанска музика во живо Cena Cantata прилагодена за родители, деца и тинејџери, минерална вода, кафе, 1 шише вино Vino Nobile di Montepulciano или Vermentino di Gallura на секои 4 возрасни, полноќно просеко, традиционално котекино со леќа и DJ сет до 03:00 ч. Пишете ни на WhatsApp +39 351 912 7047 за удобни семејни маси, детски столчиња и едноставни кујнски прилагодувања на јадењата за деца и млади.",
    "music": "Весела италијанска Cena Cantata во живо за родители, деца и млади · Полноќно одбројување и DJ сет до 03:00",
    "dress": "Елегантна и удобна празнична облека за возрасни и деца",
    "priceSum": "Официјална единствена цена 75 € по лице · Сервирана вечера + Вино (1 шише / 4 возрасни) + Семејна Cena Cantata + DJ",
    "tierLabel": "Семејна сервирана новогодишна вечера + Cena Cantata + DJ сет (од 20:30)",
    "tierPrice": "75 € по лице",
    "tierDesc": "Резервирана маса цела ноќ со сервирано мени во четири следа (тројно предјадење од море и копно, рижото Карнароли со вргањ и шафран, говедски рибај од вулкански камен со млади компирчиња, празнично пандоро тирамису со чоколадни капки), вода, кафе, 1 шише вино Montepulciano или Vermentino на 4 возрасни, полноќно просеко со леќа и DJ сет. Семејни маси, столчиња за бебиња и едноставни детски оброци преку WhatsApp +39 351 912 7047.",
    "highlights": [
      "Топол и удобен новогодишен дочек за семејства со деца и тинејџери на Bastioni di Porta Nuova 9 со сопствена маса цела вечер",
      "Потврдена официјална единствена цена од 75 € по лице со 4 сервирани јадења, вода, кафе и полноќна леќа за среќа",
      "Вклучено 1 шише вино Montepulciano или Vermentino на секои 4 возрасни и чаша просеко на полноќ",
      "Директна поддршка на WhatsApp +39 351 912 7047 за пространи семејни маси, детски столчиња и прилагодени порции за деца"
    ],
    "source": "Официјално потврдено мени и ценовник за 2027 на Carlsberg Øl Милано (Bastioni di Porta Nuova 9, 31 декември 2026, 20:30–03:00): семејна сервирана вечера со Cena Cantata и DJ сет по единствена цена од 75 € по лице, 1 шише вино на 4 возрасни, вода, кафе, просеко и леќа. Семејни маси и детски столчиња на WhatsApp +39 351 912 7047.",
    "steps": [
      "20:30 Отворање на вратите на Bastioni di Porta Nuova 9 и удобно сместување на резервираните семејни маси",
      "21:00 Свечена сервирана вечера во четири следа со весели италијански песни во живо Cena Cantata",
      "00:00 Заедничко семејно одбројување на полноќ, здравица со просеко за возрасните и традиционално котекино со леќа",
      "00:30 – 03:00 Новогодишна забава со DJ сет додека вашата семејна маса останува слободна за вас цела ноќ"
    ],
    "menuTitle": "Официјално семејно новогодишно мени 2027 · Cena Cantata и DJ (75 €)",
    "menuBev": "Во цената од 75 € се вклучени: минерална вода, кафе, 1 шише вино Vino Nobile di Montepulciano или Vermentino di Gallura на секои 4 возрасни и чаша просеко за возрасните на полноќ со котекино и леќа. Едноставни кујнски прилагодувања за деца, тинејџери или алергии се договараат преку WhatsApp +39 351 912 7047.",
    "courseLabels": [
      "Предјадење",
      "Прво јадење",
      "Главно јадење",
      "Десерт",
      "Полноќна традиција"
    ],
    "dishes": [
      "Гратинирани школки Сен Жак на венецијански начин, крокети од компир со пршута Патанегра на стапче и кошничка од Пармиџано со цикорија пунтареле, бурата и кантабриски инчуни",
      "Рижото Карнароли со вргањ и вистински нишки шафран",
      "Говедски рибај печен на вулкански камен со чимичури сос и печени млади компирчиња",
      "Празнично тирамису од пандоро со капки темно чоколадо",
      "Традиционално италијанско котекино со новогодишна леќа за бериќет и чаша просеко за здравица"
    ],
    "faqs": [
      [
        "Зошто Carlsberg Øl Милано е одличен избор за семејства со деца за Нова година?",
        "Пространите сводести сали му овозможуваат на семејството своја удобна маса во текот на целата вечер, спојувајќи мирна сервирана вечера и весела италијанска музика во живо за сите генерации."
      ],
      [
        "Која е официјалната цена и дали нудите детски столчиња или поедноставни јадења за деца?",
        "Официјално потврдената цена на ресторанот е единствена и изнесува 75 € по лице. При резервација на WhatsApp +39 351 912 7047 подготвуваме удобни семејни маси, детски столчиња и едноставни кујнски прилагодувања."
      ],
      [
        "Што точно е вклучено во цената од 75 € по лице?",
        "Вклучена е резервирана маса од 20:30, четири сервирани јадења, вода, кафе, 1 шише вино Montepulciano или Vermentino на 4 возрасни, полноќно просеко и леќа, жива Cena Cantata и DJ сет до 03:00."
      ],
      [
        "Како лесно да се стигне со семејството и како се резервира маса?",
        "Ресторанот се наоѓа на Bastioni di Porta Nuova 9 веднаш до Piazza XXV Aprile и Corso Como, на 5 минути пеш од метро M2 Moscova и M2/M5 Porta Garibaldi. Резервации на WhatsApp +39 351 912 7047."
      ]
    ],
    "scheduleHeading": "Програма за Семејна Нова година 2027",
    "menusHeading": "Официјално мени од 75 € (вино вклучено)",
    "conditionsHeading": "Погодности за семејства, што е вклучено и локација"
  }
};

export function getCarlsbergOlNyeContent(locale: string): CapodannoLocalizedEventContent {
  const code = (locale in CARLSBERG_35 ? locale : 'en') as LocaleCode;
  const p = CARLSBERG_35[code];
  const tiers: CapodannoEventTier[] = [
    { label: p.tierLabel, price: p.tierPrice, details: p.tierDesc },
  ];
  const schedule: CapodannoScheduleStep[] = ['20:30', '21:00', '00:00', '00:30 – 03:00'].map((time, idx) => ({
    time,
    label: p.steps[idx].replace(/^\d{2}[:h]\d{2}(?:\s*[–-]\s*\d{2}[:h]\d{2})?\s*/, ''),
  }));
  const menus: CapodannoMenuCard[] = [
    {
      id: 'carlsberg-ol-cenone-75',
      title: p.menuTitle,
      price: p.tierPrice,
      subtitle: `${CARLSBERG_ADDR} · ${p.dec31}`,
      courses: p.courseLabels.map((course, idx) => ({ course, dish: p.dishes[idx] })),
      beverages: p.menuBev,
      imageSrc: CARLSBERG_MENU_IMG,
      imageAlt: p.menuTitle,
    },
  ];
  return {
    title: p.title,
    subtitle: p.sub,
    description: p.desc,
    musicAndFormat: p.music,
    dressCode: p.dress,
    priceSummary: p.priceSum,
    tiers,
    highlights: p.highlights,
    sourceBasis: p.source,
    scheduleHeading: p.scheduleHeading,
    schedule,
    menusHeading: p.menusHeading,
    menus,
    conditionsHeading: p.conditionsHeading,
    conditions: p.highlights,
    offerPricesEur: [75],
    customFaqs: p.faqs.map(([q, a]) => ({ q, a })),
  };
}
