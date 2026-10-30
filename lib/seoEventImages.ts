import { CAPODANNO_NAVIGATION } from '@/lib/capodanno/routes';
import { SITE_CONTACT } from '@/config/contact';

export type TargetArchetype =
  | 'couples_vip'
  | 'singles_friends'
  | 'over30_adults'
  | 'families_kids'
  | 'young_clubbers'
  | 'fashion_international';

export type OutfitArchetype =
  | 'black_tie_gatsby'
  | 'sequins_evening'
  | 'haute_couture'
  | 'urban_reggaeton'
  | 'techno_blackwear'
  | 'thermal_bathrobe'
  | 'apres_ski_chalet'
  | 'halloween_dark_glam'
  | 'smart_chic_aperitivo';

export interface SeoLocalePack {
  officialPosterBadge: string;
  galleryEyebrow: string;
  galleryHeadingTpl: string;
  gallerySubTpl: string;
  targetPrefix: string;
  outfitPrefix: string;
  targets: Record<TargetArchetype, string>;
  outfits: Record<OutfitArchetype, string>;
  shots: [string, string, string, string];
  posterDescTpl: string;
  shotDescTpl: string;
}

const PACKS: Record<string, SeoLocalePack> = {
  it: {
    officialPosterBadge: 'Locandina Ufficiale Evento',
    galleryEyebrow: 'GALLERIA FOTOGRAFICA SEO GOOGLE FLOW · PUBBLICO TARGET & OUTFIT',
    galleryHeadingTpl: 'Immagini dell’Evento, Pubblico Target e Outfit Consigliato — {venue}',
    gallerySubTpl: '{h1}: scopri l’atmosfera reale di {venue}, il pubblico target ({target}) e il dress code della serata ({outfit}). Prenotazioni ufficiali su WWW.NIGHTLIFEMILAN.COM · WhatsApp {phone}.',
    targetPrefix: 'Target Evento',
    outfitPrefix: 'Outfit Consigliato',
    targets: {
      couples_vip: 'Coppie Romantiche & Ospiti VIP (25–45 anni)',
      singles_friends: 'Single, Gruppi di Amici & Tavoli Social (23–38 anni)',
      over30_adults: 'Pubblico Adulto Selezionato Over 30 / Over 40',
      families_kids: 'Famiglie con Bambini & Genitori in Gran Galà',
      young_clubbers: 'Giovani Clubber, Studenti Universitari & Music Lovers (20–32 anni)',
      fashion_international: 'Pubblico Internazionale, Moda & Tavoli Privé (24–40 anni)',
    },
    outfits: {
      black_tie_gatsby: 'Smoking Black Tie, Abito Lungo da Sera & Stile Grande Gatsby',
      sequins_evening: 'Abito da Sera con Paillettes, Velluto & Completo Scuro Elegante',
      haute_couture: 'Alta Moda Milanese, Giacca Sartoriale & Abito Cocktail di Lusso',
      urban_reggaeton: 'Glamour Streetwear, Abito Corto da Club & Camicia Nera',
      techno_blackwear: 'Total Black Contemporaneo, Minimal Clubwear & Pelle',
      thermal_bathrobe: 'Accappatoio Bianco Terme di Lusso & Costume da Bagno Elegante',
      apres_ski_chalet: 'Après-Ski Chic di Montagna, Cashmere & Pelliccia Ecologica',
      halloween_dark_glam: 'Dark Couture di Halloween, Maschera Veneziana & Velluto Nero',
      smart_chic_aperitivo: 'Smart Chic Milanese, Blazer Sartoriale & Abito da Aperitivo',
    },
    shots: [
      'Sala Principale & Atmosfera Reale',
      'Esperienza Cena, Spettacolo & Accoglienza',
      'Tavoli VIP Privé, Bottiglie & Brindisi',
      'Pubblico in Pista, Outfit & Energia della Serata',
    ],
    posterDescTpl: '{h1} presso {venue}: locandina ufficiale bonificata dell’evento con contatti diretti WWW.NIGHTLIFEMILAN.COM e Concierge WhatsApp {phone}. Pensato per {target} con dress code {outfit}.',
    shotDescTpl: '{h1} ({heading}) da {venue}: fotografia ambientata nel locale reale con {target} in {outfit} ({shot}). Info e tavoli: WWW.NIGHTLIFEMILAN.COM · WhatsApp {phone}.',
  },
  en: {
    officialPosterBadge: 'Official Event Poster',
    galleryEyebrow: 'GOOGLE FLOW SEO PHOTO GALLERY · TARGET CROWD & OUTFIT',
    galleryHeadingTpl: 'Event Atmosphere, Target Crowd & Outfit Guide — {venue}',
    gallerySubTpl: '{h1}: explore the real atmosphere of {venue}, the target crowd ({target}), and the event dress code ({outfit}). Official bookings at WWW.NIGHTLIFEMILAN.COM · WhatsApp {phone}.',
    targetPrefix: 'Target Crowd',
    outfitPrefix: 'Event Outfit',
    targets: {
      couples_vip: 'Romantic Couples & VIP Guests (Ages 25–45)',
      singles_friends: 'Singles, Groups of Friends & Social Tables (Ages 23–38)',
      over30_adults: 'Discerning Adult Crowd 30+ / 40+',
      families_kids: 'Families with Children & Gala Dinner Parents',
      young_clubbers: 'Young Clubbers, University Crowd & Music Lovers (Ages 20–32)',
      fashion_international: 'International Fashion Crowd & VIP Privé Guests (Ages 24–40)',
    },
    outfits: {
      black_tie_gatsby: 'Black Tie Tuxedo, Floor-Length Evening Gown & Great Gatsby Attire',
      sequins_evening: 'Sparkling Sequined Evening Dress, Velvet & Tailored Dark Suit',
      haute_couture: 'Milanese Haute Couture, Tailored Dinner Jacket & Luxury Cocktail Dress',
      urban_reggaeton: 'Upscale Glamour Streetwear, Club Cocktail Dress & Designer Shirt',
      techno_blackwear: 'Contemporary All-Black Clubwear, Minimalist Dark Layers & Leather',
      thermal_bathrobe: 'Luxury White Thermal Spa Bathrobe & Elegant Swimwear',
      apres_ski_chalet: 'Luxury Alpine Après-Ski Knitwear, Cashmere & Shearling Layers',
      halloween_dark_glam: 'Halloween Dark Couture, Venetian Mask & Black Velvet Elegance',
      smart_chic_aperitivo: 'Milanese Smart-Chic Blazer & Silk Aperitivo Attire',
    },
    shots: [
      'Main Hall & Real Venue Atmosphere',
      'Gala Dinner, Show & Hospitality Experience',
      'VIP Privé Tables, Bottle Service & Midnight Toast',
      'Target Crowd on the Dancefloor & Event Outfit',
    ],
    posterDescTpl: '{h1} at {venue}: official remediated event poster featuring direct concierge contacts WWW.NIGHTLIFEMILAN.COM and WhatsApp {phone}. Curated for {target} wearing {outfit}.',
    shotDescTpl: '{h1} ({heading}) at {venue}: contextualized venue photography featuring {target} dressed in {outfit} ({shot}). Bookings: WWW.NIGHTLIFEMILAN.COM · WhatsApp {phone}.',
  },
  es: {
    officialPosterBadge: 'Cartel Oficial del Evento',
    galleryEyebrow: 'GALERÍA FOTOGRÁFICA SEO GOOGLE FLOW · PÚBLICO Y OUTFIT',
    galleryHeadingTpl: 'Fotos del Evento, Público Objetivo y Outfit Recomendado — {venue}',
    gallerySubTpl: '{h1}: descubre el ambiente real de {venue}, el público del evento ({target}) y el dress code ({outfit}). Reservas oficiales en WWW.NIGHTLIFEMILAN.COM · WhatsApp {phone}.',
    targetPrefix: 'Público Objetivo',
    outfitPrefix: 'Outfit del Evento',
    targets: {
      couples_vip: 'Parejas Románticas e Invitados VIP (25–45 años)',
      singles_friends: 'Solteros, Grupos de Amigos y Mesas Sociales (23–38 años)',
      over30_adults: 'Público Adulto Selecto Mayores de 30 y 40 años',
      families_kids: 'Familias con Niños en Cena de Gala',
      young_clubbers: 'Jóvenes Clubbers, Universitarios y Amantes de la Música (20–32 años)',
      fashion_international: 'Público Internacional de Moda y Mesas Privé (24–40 años)',
    },
    outfits: {
      black_tie_gatsby: 'Esmoquin Black Tie, Vestido Largo de Gala y Estilo Gran Gatsby',
      sequins_evening: 'Vestido de Noche de Lentejuelas, Terciopelo y Traje Oscuro Elegante',
      haute_couture: 'Alta Moda Milanesa, Americana de Gala y Vestido Cóctel de Lujo',
      urban_reggaeton: 'Glamour Urbano de Club, Vestido Corto y Camisa de Diseño',
      techno_blackwear: 'Total Black Contemporáneo, Clubwear Minimalista y Cuero',
      thermal_bathrobe: 'Albornoz Blanco de Spa Termal y Bañador Elegante',
      apres_ski_chalet: 'Après-Ski Chic de Montaña, Cachemir y Abrigo Invernal',
      halloween_dark_glam: 'Alta Costura Oscura de Halloween, Máscara y Terciopelo Negro',
      smart_chic_aperitivo: 'Smart Chic Milanés, Blazer a Medida y Vestido de Aperitivo',
    },
    shots: [
      'Sala Principal y Ambiente Real del Local',
      'Cena de Gala, Espectáculo y Bienvenida',
      'Mesas VIP Privé, Botellas y Brindis',
      'Público Objetivo en Pista y Outfit de la Noche',
    ],
    posterDescTpl: '{h1} en {venue}: cartel oficial del evento con contacto directo WWW.NIGHTLIFEMILAN.COM y WhatsApp {phone}. Ideal para {target} con outfit {outfit}.',
    shotDescTpl: '{h1} ({heading}) en {venue}: imagen del local real mostrando {target} con {outfit} ({shot}). Reservas: WWW.NIGHTLIFEMILAN.COM · WhatsApp {phone}.',
  },
  fr: {
    officialPosterBadge: 'Affiche Officielle de la Soirée',
    galleryEyebrow: 'GALERIE PHOTO SEO GOOGLE FLOW · PUBLIC CIBLE & TENUE',
    galleryHeadingTpl: 'Photos de la Soirée, Public Cible et Tenue Conseillée — {venue}',
    gallerySubTpl: '{h1} : découvrez l’ambiance réelle de {venue}, la clientèle cible ({target}) et la tenue exigée ({outfit}). Réservations sur WWW.NIGHTLIFEMILAN.COM · WhatsApp {phone}.',
    targetPrefix: 'Public Cible',
    outfitPrefix: 'Tenue de Soirée',
    targets: {
      couples_vip: 'Couples Romantiques & Clientèle VIP (25–45 ans)',
      singles_friends: 'Célibataires, Groupes d’Amis & Tables Conviviales (23–38 ans)',
      over30_adults: 'Clientèle Adulte Sélectionnée 30+ / 40+',
      families_kids: 'Familles avec Enfants & Dîner de Gala',
      young_clubbers: 'Jeunes Clubbers, Étudiants & Passionnés de Musique (20–32 ans)',
      fashion_international: 'Clientèle Mode Internationale & Carré VIP (24–40 ans)',
    },
    outfits: {
      black_tie_gatsby: 'Smoking Black Tie, Robe Longue de Gala & Style Gatsby le Magnifique',
      sequins_evening: 'Robe de Soirée à Paillettes, Velours & Costume Sombre Élégant',
      haute_couture: 'Haute Couture Milanaise, Veste de Smoking & Robe Cocktail Luxe',
      urban_reggaeton: 'Glamour Streetwear Chic, Robe de Club & Chemise Ajustée',
      techno_blackwear: 'Total Black Contemporain, Clubwear Minimaliste & Cuir',
      thermal_bathrobe: 'Peignoir Blanc des Thermes & Maillot de Bain Élégant',
      apres_ski_chalet: 'Tenue Après-Ski Chic en Chalet, Cachemire & Fourrure Écologique',
      halloween_dark_glam: 'Dark Couture Halloween, Masque Vénitien & Velours Noir',
      smart_chic_aperitivo: 'Smart Chic Milanais, Blazer sur Mesure & Tenue Aperitivo',
    },
    shots: [
      'Salle Principale & Architecture Réelle du Lieu',
      'Dîner de Gala, Spectacle & Accueil',
      'Carré VIP Privé, Flacons & Toast de Minuit',
      'Clientèle Cible en Soirée & Dress Code',
    ],
    posterDescTpl: '{h1} chez {venue} : affiche officielle de l’événement avec contact direct WWW.NIGHTLIFEMILAN.COM et WhatsApp {phone}. Pensé pour {target} en tenue {outfit}.',
    shotDescTpl: '{h1} ({heading}) chez {venue} : photographie du lieu réel réunissant {target} en {outfit} ({shot}). Infos : WWW.NIGHTLIFEMILAN.COM · WhatsApp {phone}.',
  },
  de: {
    officialPosterBadge: 'Offizielles Event-Plakat',
    galleryEyebrow: 'GOOGLE FLOW SEO-FOTOGALERIE · ZIELGRUPPE & DRESSCODE',
    galleryHeadingTpl: 'Event-Impressionen, Zielgruppe und Dresscode — {venue}',
    gallerySubTpl: '{h1}: Entdecken Sie das echte Ambiente von {venue}, das Zielpublikum ({target}) und das passende Event-Outfit ({outfit}). Buchung über WWW.NIGHTLIFEMILAN.COM · WhatsApp {phone}.',
    targetPrefix: 'Zielgruppe',
    outfitPrefix: 'Event-Outfit',
    targets: {
      couples_vip: 'Romantische Paare & VIP-Gäste (25–45 Jahre)',
      singles_friends: 'Singles, Freundesgruppen & Social Tables (23–38 Jahre)',
      over30_adults: 'Anspruchsvolles Ü30- / Ü40-Publikum',
      families_kids: 'Familien mit Kindern beim Galadinner',
      young_clubbers: 'Junge Clubgänger, Studenten & Musikliebhaber (20–32 Jahre)',
      fashion_international: 'Internationales Modepublikum & VIP-Privé-Gäste (24–40 Jahre)',
    },
    outfits: {
      black_tie_gatsby: 'Black-Tie-Smoking, langes Abendkleid & Great-Gatsby-Stil',
      sequins_evening: 'Pailletten-Abendkleid, Samt & dunkler Maßanzug',
      haute_couture: 'Mailänder Haute Couture, Dinner-Jacket & Luxus-Cocktailkleid',
      urban_reggaeton: 'Glamour-Clubwear, kurzes Abendkleid & Designerhemd',
      techno_blackwear: 'Moderner All-Black-Club-Look, Minimalismus & Leder',
      thermal_bathrobe: 'Weißer Luxus-Bademantel in der Therme & elegante Bademode',
      apres_ski_chalet: 'Alpiner Après-Ski-Chic, Kaschmir & Wintermantel',
      halloween_dark_glam: 'Halloween Dark Couture, venezianische Maske & schwarzer Samt',
      smart_chic_aperitivo: 'Mailänder Smart-Chic, maßgeschneiderter Blazer & Seidenkleid',
    },
    shots: [
      'Hauptsaal & echte Location-Architektur',
      'Galadinner, Dinner-Show & Empfang',
      'VIP-Privé-Tische, Champagner & Mitternachtstoast',
      'Zielgruppe auf der Tanzfläche & Dresscode',
    ],
    posterDescTpl: '{h1} im {venue}: offizielles Event-Plakat mit direktem Concierge-Kontakt WWW.NIGHTLIFEMILAN.COM und WhatsApp {phone}. Für {target} im Outfit {outfit}.',
    shotDescTpl: '{h1} ({heading}) im {venue}: echte Location-Aufnahme mit {target} im {outfit} ({shot}). Reservierung: WWW.NIGHTLIFEMILAN.COM · WhatsApp {phone}.',
  },
  pt: {
    officialPosterBadge: 'Cartaz Oficial do Evento',
    galleryEyebrow: 'GALERIA DE FOTOS SEO GOOGLE FLOW · PÚBLICO E TRAJE',
    galleryHeadingTpl: 'Fotos do Evento, Público-Alvo e Traje Recomendado — {venue}',
    gallerySubTpl: '{h1}: conheça o ambiente real de {venue}, o público do evento ({target}) e o dress code ({outfit}). Reservas em WWW.NIGHTLIFEMILAN.COM · WhatsApp {phone}.',
    targetPrefix: 'Público-Alvo',
    outfitPrefix: 'Traje do Evento',
    targets: {
      couples_vip: 'Casais Românticos e Convidados VIP (25–45 anos)',
      singles_friends: 'Solteiros, Grupos de Amigos e Mesas Sociais (23–38 anos)',
      over30_adults: 'Público Adulto Selecionado 30+ / 40+',
      families_kids: 'Famílias com Crianças em Ceia de Gala',
      young_clubbers: 'Jovens Clubbers, Universitários e Fãs de Música (20–32 anos)',
      fashion_international: 'Público Internacional de Moda e Camarotes VIP (24–40 anos)',
    },
    outfits: {
      black_tie_gatsby: 'Smoking Black Tie, Vestido Longo de Gala e Estilo Grande Gatsby',
      sequins_evening: 'Vestido de Noite com Paetês, Veludo e Terno Escuro Elegante',
      haute_couture: 'Alta Costura Milanesa, Blazer de Gala e Vestido Cocktail de Luxo',
      urban_reggaeton: 'Glamour Urbano de Club, Vestido Curto e Camisa Preta',
      techno_blackwear: 'Total Black Contemporâneo, Clubwear Minimalista e Couro',
      thermal_bathrobe: 'Roupão Branco de Spa Termal e Roupa de Banho Elegante',
      apres_ski_chalet: 'Après-Ski Chic de Montanha, Caxemira e Casaco de Inverno',
      halloween_dark_glam: 'Dark Couture de Halloween, Máscara Veneziana e Veludo Preto',
      smart_chic_aperitivo: 'Smart Chic Milanês, Blazer de Alfaiataria e Traje Aperitivo',
    },
    shots: [
      'Salão Principal e Atmosfera Real da Casa',
      'Ceia de Gala, Dinner Show e Recepção',
      'Mesas VIP Privé, Champanhe e Brinde da Meia-Noite',
      'Público na Pista e Traje da Noite',
    ],
    posterDescTpl: '{h1} no {venue}: cartaz oficial do evento com contato direto WWW.NIGHTLIFEMILAN.COM e WhatsApp {phone}. Para {target} com traje {outfit}.',
    shotDescTpl: '{h1} ({heading}) no {venue}: fotografia do local real com {target} vestindo {outfit} ({shot}). Reservas: WWW.NIGHTLIFEMILAN.COM · WhatsApp {phone}.',
  },
};

const COMPACT_LOCALE_OVERRIDES: Record<string, {
  badge: string;
  eyebrow: string;
  headingTpl: string;
  targetPrefix: string;
  outfitPrefix: string;
  couples: string;
  singles: string;
  over30: string;
  families: string;
  young: string;
  fashion: string;
  blackTie: string;
  sequins: string;
  couture: string;
  urban: string;
  techno: string;
  thermal: string;
  ski: string;
  halloween: string;
  smart: string;
  shots: [string, string, string, string];
}> = {
  nl: {
    badge: 'Officiële Eventposter', eyebrow: 'GOOGLE FLOW SEO FOTOGALERIJ · DOELGROEP & OUTFIT',
    headingTpl: 'Sfeerbeelden, Doelgroep en Kledingvoorschrift — {venue}',
    targetPrefix: 'Doelgroep', outfitPrefix: 'Event Outfit',
    couples: 'Romantische Koppels & VIP-Gasten (25–45 jaar)', singles: 'Singles, Vriendengroepen & Social Tables (23–38 jaar)',
    over30: 'Stijlvol 30+ / 40+ Publiek', families: 'Gezinnen met Kinderen bij het Galadiner',
    young: 'Jonge Clubbers & Muziekliefhebbers (20–32 jaar)', fashion: 'Internationaal Modepubliek & VIP-Tafels (24–40 jaar)',
    blackTie: 'Black Tie Smoking, Lange Avondjurk & Great Gatsby Stijl', sequins: 'Avondjurk met Pailletten, Fluweel & Donker Kostuum',
    couture: 'Milanese Haute Couture & Luxe Cocktailjurk', urban: 'Stijlvolle Urban Clubwear & Designer Overhemd',
    techno: 'Volledig Zwarte Techno Clubwear & Leer', thermal: 'Witte Luxe Badjas in de Thermen & Badkleding',
    ski: 'Alpiene Après-Ski Chic & Kasjmier', halloween: 'Halloween Dark Couture & Venetiaans Masker',
    smart: 'Milanees Smart-Chic Maatpak & Aperitivo-Jurk',
    shots: ['Hooforzaal & Echte Sfeer', 'Galadiner, Show & Ontvangst', 'VIP Privé-Tafels & Champagne', 'Publiek op de Dansvloer & Dresscode'],
  },
  pl: {
    badge: 'Oficjalny Plakat Wydarzenia', eyebrow: 'GALERIA ZDJĘĆ SEO GOOGLE FLOW · GOŚCIE I DRESS CODE',
    headingTpl: 'Zdjęcia Wydarzenia, Grupa Docelowa i Strój Wieczorowy — {venue}',
    targetPrefix: 'Grupa Docelowa', outfitPrefix: 'Strój na Wydarzenie',
    couples: 'Romantyczne Pary i Goście VIP (25–45 lat)', singles: 'Single, Grupy Znajomych i Stoliki Towarzyskie (23–38 lat)',
    over30: 'Elegancka Publiczność 30+ / 40+', families: 'Rodziny z Dziećmi na Kolacji Galowej',
    young: 'Młodzi Klubowicze i Miłośnicy Muzyki (20–32 lata)', fashion: 'Międzynarodowi Goście Świata Mody i Strefy VIP (24–40 lat)',
    blackTie: 'Smoking Black Tie, Długa Suknia Wieczorowa i Styl Wielki Gatsby', sequins: 'Cekinowa Suknia Wieczorowa, Aksami i Ciemny Garnitur',
    couture: 'Mediolańska Haute Couture i Luksusowa Sukienka Koktajlowa', urban: 'Klubowy Glamour Streetwear i Elegancka Koszula',
    techno: 'Nowoczesny Total Black Clubwear i Skóra', thermal: 'Biały Szlafrok Termalny Spa i Elegancki Strój Kąpielowy',
    ski: 'Alpejski Styl Après-Ski Chic i Kaszmir', halloween: 'Mroczna Elegancja Halloween i Wenecka Maska',
    smart: 'Mediolański Smart Chic, Marynarka i Sukienka na Aperitivo',
    shots: ['Sala Główna i Prawdziwe Wnętrze', 'Kolacja Galowa, Show i Powitanie', 'Stoliki VIP Privé i Toast o Północy', 'Goście na Parkiecie i Dress Code'],
  },
  ro: {
    badge: 'Afișul Oficial al Evenimentului', eyebrow: 'GALERIE FOTO SEO GOOGLE FLOW · PUBLIC ȚINTĂ ȘI ȚINUTĂ',
    headingTpl: 'Imagini Eveniment, Publicul Țintă și Ținuta Recomandată — {venue}',
    targetPrefix: 'Public Țintă', outfitPrefix: 'Ținuta Evenimentului',
    couples: 'Cupluri Romantice și Oaspeți VIP (25–45 ani)', singles: 'Persoane Singure, Grupuri de Prieteni și Mese Sociale (23–38 ani)',
    over30: 'Public Matur Selectat 30+ / 40+', families: 'Familii cu Copii la Cina Festivă de Gală',
    young: 'Tineri Clubberi și Iubitori de Muzică (20–32 ani)', fashion: 'Public Internațional de Modă și Mese VIP Privé (24–40 ani)',
    blackTie: 'Smoking Black Tie, Rochie Lungă de Seară și Stilul Marele Gatsby', sequins: 'Rochie cu Paiete, Catifea și Costum Închis Elegant',
    couture: 'Haute Couture Milaneză și Rochie Cocktail de Lux', urban: 'Glamour Streetwear de Club și Cămașă Neagră',
    techno: 'Ținută Total Black Techno și Piele', thermal: 'Halat Alb de Spa Termal și Costum de Baie Elegant',
    ski: 'Ținută Après-Ski Chic de Munte și Cașmir', halloween: 'Dark Couture de Halloween și Mască Venețiană',
    smart: 'Smart Chic Milanez, Sacou Croit și Ținută Aperitivo',
    shots: ['Sala Principală și Atmosfera Reală', 'Cina de Gală, Spectacol și Primire', 'Mese VIP Privé și Șampanie', 'Publicul pe Ringul de Dans și Dress Code'],
  },
  ru: {
    badge: 'Официальная Афиша Вечера', eyebrow: 'SEO-ФОТОГАЛЕРЕЯ GOOGLE FLOW · ПУБЛИКА И ДРЕСС-КОД',
    headingTpl: 'Фотографии События, Целевая Публика и Дресс-Код — {venue}',
    targetPrefix: 'Публика События', outfitPrefix: 'Дресс-Код Вечера',
    couples: 'Романтические Пары и VIP-Гости (25–45 лет)', singles: 'Компании Друзей и Новые Знакомства (23–38 лет)',
    over30: 'Изысканная Публика 30+ / 40+', families: 'Семьи с Детьми на Гала-Ужине',
    young: 'Молодежь, Студенты и Любители Клубной Музыки (20–32 года)', fashion: 'Международная Модная Публика и Гости VIP-Лож (24–40 лет)',
    blackTie: 'Смокинг Black Tie, Вечернее Платье в Пол и Стиль Великий Гэтсби', sequins: 'Вечернее Платье с Пайетками, Бархат и Темный Костюм',
    couture: 'Миланская Высокая Мода и Роскошное Коктейльное Платье', urban: 'Стильный Клубный Образ и Дизайнерская Рубашка',
    techno: 'Современный Total Black для Техно-Клуба и Кожа', thermal: 'Белый Халат Термального Спа и Купальный Костюм',
    ski: 'Альпийский Шик Шале, Кашемир и Мех', halloween: 'Вечерний Образ Хэллоуин Dark Couture и Венецианская Маска',
    smart: 'Миланский Smart Chic, Пиджак и Коктейльный Образ',
    shots: ['Главный Зал и Реальный Интерьер', 'Гала-Ужин, Шоу-Программа и Сервис', 'VIP-Столы Privé и Полуночный Тост', 'Гости на Танцполе и Вечерние Образы'],
  },
  tr: {
    badge: 'Resmi Etkinlik Afişi', eyebrow: 'GOOGLE FLOW SEO FOTOĞRAF GALERİSİ · HEDEF KİTLE VE KIYAFET',
    headingTpl: 'Etkinlik Atmosferi, Katılımcı Profili ve Kıyafet Kodu — {venue}',
    targetPrefix: 'Hedef Kitle', outfitPrefix: 'Etkinlik Kıyafeti',
    couples: 'Romantik Çiftler ve VIP Misafirler (25–45 Yaş)', singles: 'Bekarlar, Arkadaş Grupları ve Sosyal Masalar (23–38 Yaş)',
    over30: 'Seçkin 30+ / 40+ Yetişkin Kitle', families: 'Çocuklu Aileler ve Gala Yemeği Misafirleri',
    young: 'Genç Kulüp Severler ve Müzik Tutkunları (20–32 Yaş)', fashion: 'Uluslararası Moda Çevresi ve VIP Loca Misafirleri (24–40 Yaş)',
    blackTie: 'Black Tie Smokin, Uzun Gece Elbisesi ve Muhteşem Gatsby Stili', sequins: 'Payetli Gece Elbisesi, Kadife ve Şık Koyu Takım Elbise',
    couture: 'Milano Haute Couture, Smokin Ceket ve Lüks Kokteyl Elbisesi', urban: 'Şık Kulüp Stili, Kısa Elbise ve Tasarım Gömlek',
    techno: 'Modern Simsiyah Tekno Kulüp Stili ve Deri', thermal: 'Termal Spa Beyaz Bornoz ve Şık Mayo',
    ski: 'Dağ Evi Après-Ski Şıklığı ve Kaşmir', halloween: 'Cadılar Bayramı Dark Couture ve Venedik Maskesi',
    smart: 'Milano Smart-Chic Blazer ve Aperitivo Şıklığı',
    shots: ['Ana Salon ve Gerçek Mekan Atmosferi', 'Gala Yemeği, Sahne Şovu ve Karşılama', 'VIP Privé Masalar ve Gece Yarısı Kadehi', 'Pistteki Katılımcılar ve Kıyafet Kodu'],
  },
  zh: {
    badge: '官方活动海报', eyebrow: 'GOOGLE FLOW SEO 实景图集 · 目标客群与穿搭指南',
    headingTpl: '活动实景、目标人群与着装要求 — {venue}',
    targetPrefix: '目标客群', outfitPrefix: '活动着装',
    couples: '浪漫情侣与 VIP 贵宾（25–45岁）', singles: '单身人士、好友聚会与社交餐桌（23–38岁）',
    over30: '30+ / 40+ 成熟精英客群', families: '亲子家庭与跨年晚宴宾客',
    young: '年轻潮人、大学生与电子音乐爱好者（20–32岁）', fashion: '国际时尚名流与 VIP 卡座贵宾（24–40岁）',
    blackTie: 'Black Tie 燕尾礼服、及地晚礼服与了不起的盖茨比风格', sequins: '亮片晚礼服、丝绒礼服与深色定制西装',
    couture: '米兰高级定制礼服与奢华鸡尾酒裙', urban: '潮流夜店盛装、修身短裙与设计师衬衫',
    techno: '全黑先锋电子俱乐部穿搭与皮衣', thermal: '奢华温泉白色浴袍与优雅泳装',
    ski: '阿尔卑斯雪屋奢华羊绒与冬日穿搭', halloween: '万圣节暗黑高定礼服与威尼斯面具',
    smart: '米兰意式雅痞西装与开胃酒晚装',
    shots: ['主厅实景与真实建筑氛围', '跨年晚宴、现场演出与迎宾服务', 'VIP 尊享卡座与午夜香槟祝酒', '舞池目标客群与晚宴着装展示'],
  },
  ar: {
    badge: 'الملصق الرسمي للفعالية', eyebrow: 'معرض صور SEO GOOGLE FLOW · الجمهور المستهدف والأزياء',
    headingTpl: 'صور الفعالية، الجمهور المستهدف والزي الرسمي — {venue}',
    targetPrefix: 'الجمهور المستهدف', outfitPrefix: 'زي السهرة',
    couples: 'الأزواج الرومانسيون وضيوف VIP (25–45 سنة)', singles: 'مجموعات الأصدقاء والطاولات الاجتماعية (23–38 سنة)',
    over30: 'جمهور النخبة 30+ / 40+', families: 'العائلات مع الأطفال في عشاء الغالا',
    young: 'الشباب وعشاق الموسيقى الإلكترونية (20–32 سنة)', fashion: 'جمهور الموضة العالمي وطاولات VIP (24–40 سنة)',
    blackTie: 'بدلة توكسيدو Black Tie وفستان سهرة طويل بأسلوب غاتسبي العظيم', sequins: 'فستان سهرة لامع ومخمل وبدلة رسمية داكنة',
    couture: 'أزياء ميلانو الراقية وفستان كوكتيل فاخر', urban: 'إطلالة نادي عصرية أنيقة وقميص مصمم',
    techno: 'إطلالة تكنو باللون الأسود الكامل وجلد', thermal: 'رداء حمام أبيض فاخر في السبا الحراري',
    ski: 'أناقة شاليهات جبال الألب والكشمير', halloween: 'أزياء هالوين دارك كوتور وقناع البندقية',
    smart: 'أناقة ميلانو سمارت شيك وبليزر رسمي',
    shots: ['القاعة الرئيسية والأجواء الحقيقية', 'عشاء الغالا والعرض الفني والترحيب', 'طاولات VIP Privé ونخب منتصف الليل', 'الجمهور في ساحة الرقص وزي السهرة'],
  },
};

export function getSeoLocalePack(locale: string): SeoLocalePack {
  if (PACKS[locale]) return PACKS[locale];
  const ov = COMPACT_LOCALE_OVERRIDES[locale];
  if (ov) {
    return {
      officialPosterBadge: ov.badge,
      galleryEyebrow: ov.eyebrow,
      galleryHeadingTpl: ov.headingTpl,
      gallerySubTpl: `{h1} @ {venue}: {target} · {outfit}. WWW.NIGHTLIFEMILAN.COM · WhatsApp {phone}.`,
      targetPrefix: ov.targetPrefix,
      outfitPrefix: ov.outfitPrefix,
      targets: {
        couples_vip: ov.couples,
        singles_friends: ov.singles,
        over30_adults: ov.over30,
        families_kids: ov.families,
        young_clubbers: ov.young,
        fashion_international: ov.fashion,
      },
      outfits: {
        black_tie_gatsby: ov.blackTie,
        sequins_evening: ov.sequins,
        haute_couture: ov.couture,
        urban_reggaeton: ov.urban,
        techno_blackwear: ov.techno,
        thermal_bathrobe: ov.thermal,
        apres_ski_chalet: ov.ski,
        halloween_dark_glam: ov.halloween,
        smart_chic_aperitivo: ov.smart,
      },
      shots: ov.shots,
      posterDescTpl: `{h1} · {venue}: ${ov.badge} (WWW.NIGHTLIFEMILAN.COM · WhatsApp {phone}). ${ov.targetPrefix}: {target} · ${ov.outfitPrefix}: {outfit}.`,
      shotDescTpl: `{h1} ({heading}) — {venue}: {target}, {outfit} ({shot}). WWW.NIGHTLIFEMILAN.COM · WhatsApp {phone}.`,
    };
  }
  // For all other European / Balkan / Nordic locales (cs, sv, da, no, fi, el, hu, sk, bg, hr, sl, lt, lv, et, ga, mt, is, uk, sq, sr, bs, mk)
  return {
    officialPosterBadge: `${locale.toUpperCase()} · Official Event Poster`,
    galleryEyebrow: 'GOOGLE FLOW SEO PHOTO GALLERY · TARGET & OUTFIT',
    galleryHeadingTpl: `{venue} — SEO Photo Gallery, Target & Outfit`,
    gallerySubTpl: `{h1} @ {venue}: {target} · {outfit}. WWW.NIGHTLIFEMILAN.COM · WhatsApp {phone}.`,
    targetPrefix: 'Target',
    outfitPrefix: 'Outfit',
    targets: PACKS.en.targets,
    outfits: PACKS.en.outfits,
    shots: PACKS.en.shots,
    posterDescTpl: `{h1} @ {venue}: {target} · {outfit} (WWW.NIGHTLIFEMILAN.COM · WhatsApp {phone}).`,
    shotDescTpl: `{h1} ({heading}) @ {venue}: {target} · {outfit} ({shot}). WWW.NIGHTLIFEMILAN.COM · WhatsApp {phone}.`,
  };
}

export function slugifySeoSegment(input: string, maxLen = 78): string {
  const translit = input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ß/g, 'ss')
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'o')
    .replace(/đ/g, 'd')
    .replace(/ł/g, 'l')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
  if (!translit) return 'milano-nightlife-seo';
  if (translit.length <= maxLen) return translit;
  const cut = translit.slice(0, maxLen);
  const lastDash = cut.lastIndexOf('-');
  return (lastDash > 24 ? cut.slice(0, lastDash) : cut).replace(/^-+|-+$/g, '');
}

export function inferTargetAndOutfit(params: {
  slug: string;
  categorySlug?: string;
  music?: string;
  dressCode?: string;
  isHalloween?: boolean;
}): { target: TargetArchetype; outfit: OutfitArchetype } {
  const s = `${params.slug} ${params.categorySlug || ''} ${params.music || ''} ${params.dressCode || ''}`.toLowerCase();
  if (params.isHalloween || s.includes('halloween') || s.includes('muertos') || s.includes('vampir') || s.includes('streghe')) {
    return { target: 'fashion_international', outfit: 'halloween_dark_glam' };
  }
  if (s.includes('terme') || s.includes('aquaria') || s.includes('spa') || s.includes('bagni')) {
    return { target: 'couples_vip', outfit: 'thermal_bathrobe' };
  }
  if (s.includes('baita') || s.includes('motoslitta') || s.includes('livigno') || s.includes('mottolino') || s.includes('fiaccolata') || s.includes('bobbio')) {
    return { target: 'couples_vip', outfit: 'apres_ski_chalet' };
  }
  if (s.includes('famiglie') || s.includes('bambini')) {
    return { target: 'families_kids', outfit: 'black_tie_gatsby' };
  }
  if (s.includes('tram-storico') || s.includes('atmosfera') || s.includes('castello') || s.includes('villa-') || s.includes('principe-di-savoia') || s.includes('gallia') || s.includes('scala') || s.includes('justme') || s.includes('gatsby')) {
    return { target: 'couples_vip', outfit: 'black_tie_gatsby' };
  }
  if (s.includes('rooftop') || s.includes('terrazza') || s.includes('ceresio') || s.includes('voya') || s.includes('dome') || s.includes('armani')) {
    return { target: 'fashion_international', outfit: 'haute_couture' };
  }
  if (s.includes('techno') || s.includes('amnesia') || s.includes('volt') || s.includes('gate') || s.includes('tempio') || s.includes('tunnel') || s.includes('masada') || s.includes('amelia') || s.includes('bolgia') || s.includes('duro') || s.includes('apophis')) {
    return { target: 'young_clubbers', outfit: 'techno_blackwear' };
  }
  if (s.includes('reggaeton') || s.includes('latino') || s.includes('ahynama') || s.includes('encanto') || s.includes('aria-club') || s.includes('the-club') || s.includes('hollywood') || s.includes('play-club') || s.includes('lime') || s.includes('mamacita')) {
    return { target: 'singles_friends', outfit: 'urban_reggaeton' };
  }
  if (s.includes('over-30') || s.includes('over-40') || s.includes('bobino') || s.includes('55-milano') || s.includes('nepentha') || s.includes('blue-note') || s.includes('spirit-de-milan') || s.includes('gattopardo') || s.includes('mib')) {
    return { target: 'over30_adults', outfit: 'sequins_evening' };
  }
  return { target: 'singles_friends', outfit: 'sequins_evening' };
}

const VENUE_MASTER_KEYS: Record<string, [string, string, string, string]> = {
  'justme': ['just-me-milano-torre-branca-01', 'just-me-milano-cena-01', 'just-me-milano-prive-01', 'just-me-milano-party-01'],
  'armani': ['armani-prive-milano-interior-01', 'armani-prive-milano-interior-02', 'armani-prive-milano-interior-03', 'armani-prive-milano-interior-04'],
  'pineta': ['pineta-milano-ingresso-01', 'pineta-milano-cena-01', 'pineta-milano-lounge-01', 'pineta-milano-party-01'],
  'aria': ['aria-club-milano-interior-01', 'aria-club-milano-buffet-01', 'aria-club-milano-bar-01', 'aria-club-milano-garden-01'],
  'voya': ['voya-rooftop-milan-skyline-01', 'voya-rooftop-milan-cena-01', 'voya-rooftop-milan-lounge-01', 'voya-rooftop-milan-interior-07'],
  '55-milano': ['fiftyfive-milano-interior-01', 'fiftyfive-milano-cena-01', 'fiftyfive-milano-lounge-01', 'fiftyfive-milano-dj-01'],
  'hollywood': ['hollywood-interior-01', 'hollywood-interior-02', 'hollywood-interior-03', 'hollywood-interior-04'],
  'the-club': ['the-club-milano-interior-01', 'the-club-milano-interior-03', 'the-club-milano-interior-05', 'the-club-milano-interior-07'],
  '11clubroom': ['11-clubroom-interior-01', '11-clubroom-interior-03', '11-clubroom-interior-05', '11-clubroom-interior-07'],
  'volt': ['volt-club-milano-interior-01', 'volt-club-milano-interior-02', 'volt-club-milano-interior-03', 'volt-club-milano-interior-04'],
  'magazzini': ['magazzini-generali-interior-01', 'magazzini-generali-interior-02', 'magazzini-generali-interior-03', 'magazzini-generali-interior-04'],
  'play-club': ['play-club-milano-interior-01', 'play-club-milano-interior-03', 'play-club-milano-interior-05', 'play-club-milano-interior-07'],
  'repvblic': ['repvblic-cover-16x9-v1', 'repvblic-gallery-01-v1', 'repvblic-gallery-02-v1', 'repvblic-gallery-03-v1'],
  'gattopardo': ['gattopardo-interior-01', 'gattopardo-interior-02', 'gattopardo-interior-03', 'gattopardo-interior-04'],
  'apollo': ['apollo-milano-interior-01', 'apollo-milano-interior-02', 'apollo-milano-interior-03', 'apollo-milano-interior-04'],
  'terrazza-duomo-21': ['terrazza-21-interior-01', 'terrazza-21-interior-02', 'terrazza-21-interior-03', 'terrazza-21-interior-04'],
  'ceresio-7': ['ceresio-7-interior-01', 'ceresio-7-interior-02', 'ceresio-7-interior-03', 'ceresio-7-interior-04'],
  'mib': ['mib-milano-interior-01', 'mib-milano-interior-02', 'mib-milano-interior-03', 'mib-milano-interior-04'],
  'church-81': ['church-81-interior-01', 'church-81-interior-02', 'church-81-interior-03', 'church-81-interior-04'],
  'terme': ['capodanno-terme-milano-flow-01', 'ceresio-7-interior-03', 'voya-rooftop-milan-drink-01', 'capodanno-rooftop-skyline-flow-01'],
  'baita': ['capodanno-baita-neve-flow-01', 'capodanno-villa-castello-flow-01', 'capodanno-cena-cantata-show-flow-01', 'fiftyfive-milano-cena-01'],
  'tram': ['capodanno-tram-storico-flow-01', 'capodanno-piazza-duomo-flow-01', 'terrazza-21-interior-04', 'just-me-milano-cena-01'],
  'castello-villa': ['capodanno-villa-castello-flow-01', 'capodanno-gran-gala-famiglie-flow-01', 'gattopardo-interior-01', 'just-me-milano-cena-01'],
  'piazza': ['capodanno-piazza-duomo-flow-01', 'terrazza-21-interior-02', 'just-me-milano-torre-branca-01', 'capodanno-rooftop-skyline-flow-01'],
  'rooftop-generic': ['capodanno-rooftop-skyline-flow-01', 'voya-rooftop-milan-skyline-01', 'terrazza-21-interior-04', 'ceresio-7-interior-03'],
  'dinner-show-generic': ['capodanno-cena-cantata-show-flow-01', 'pineta-milano-cena-01', 'fiftyfive-milano-cena-01', 'gattopardo-interior-02'],
};

export function selectMasterAssetKeys(slug: string, venueName = '', categorySlug = ''): [string, string, string, string] {
  const s = `${slug} ${venueName} ${categorySlug}`.toLowerCase();
  if (s.includes('justme') || s.includes('just-me') || s.includes('torre-branca')) return VENUE_MASTER_KEYS['justme'];
  if (s.includes('armani')) return VENUE_MASTER_KEYS['armani'];
  if (s.includes('pineta')) return VENUE_MASTER_KEYS['pineta'];
  if (s.includes('aria-club') || s.includes('v-aria')) return VENUE_MASTER_KEYS['aria'];
  if (s.includes('voya')) return VENUE_MASTER_KEYS['voya'];
  if (s.includes('55-milano') || s.includes('cinquanta5') || s.includes('fiftyfive')) return VENUE_MASTER_KEYS['55-milano'];
  if (s.includes('hollywood')) return VENUE_MASTER_KEYS['hollywood'];
  if (s.includes('the-club') || s.includes('theclub')) return VENUE_MASTER_KEYS['the-club'];
  if (s.includes('11clubroom') || s.includes('11-clubroom')) return VENUE_MASTER_KEYS['11clubroom'];
  if (s.includes('volt')) return VENUE_MASTER_KEYS['volt'];
  if (s.includes('magazzini')) return VENUE_MASTER_KEYS['magazzini'];
  if (s.includes('play-club')) return VENUE_MASTER_KEYS['play-club'];
  if (s.includes('repvblic')) return VENUE_MASTER_KEYS['repvblic'];
  if (s.includes('gattopardo')) return VENUE_MASTER_KEYS['gattopardo'];
  if (s.includes('apollo')) return VENUE_MASTER_KEYS['apollo'];
  if (s.includes('terrazza-duomo') || s.includes('terrazza-21')) return VENUE_MASTER_KEYS['terrazza-duomo-21'];
  if (s.includes('ceresio')) return VENUE_MASTER_KEYS['ceresio-7'];
  if (s.includes('mib')) return VENUE_MASTER_KEYS['mib'];
  if (s.includes('church')) return VENUE_MASTER_KEYS['church-81'];
  if (s.includes('fabrique')) return ['fabrique-milano', 'v-fabrique-2', 'magazzini-generali-interior-02', 'capodanno-cena-cantata-show-flow-01'];
  if (s.includes('alcatraz')) return ['alcatraz-milano', 'v-alcatraz-2', 'magazzini-generali-interior-03', 'capodanno-cena-cantata-show-flow-01'];
  if (s.includes('amnesia')) return ['amnesia-milano', 'v-amnesia-2', 'volt-club-milano-interior-02', 'volt-club-milano-interior-03'];
  if (s.includes('gate')) return ['gate-milano', 'v-gate-2', 'volt-club-milano-interior-01', 'magazzini-generali-interior-04'];
  if (s.includes('tempio')) return ['tempio-del-futuro-perduto-1', 'tempio-del-futuro-perduto-2', 'tunnel-1', 'tunnel-2'];
  if (s.includes('tunnel')) return ['tunnel-1', 'tunnel-2', 'volt-club-milano-interior-02', 'tempio-del-futuro-perduto-1'];
  if (s.includes('magnolia')) return ['circolo-magnolia', 'circolo-magnolia-2', 'base-milano-1', 'base-milano-2'];
  if (s.includes('santeria')) return ['santeria-toscana-31', 'v-santeria-toscana-2', 'santeria-paladini-8', 'v-santeria-paladini-2'];
  if (s.includes('base-milano')) return ['base-milano-1', 'base-milano-2', 'fabbrica-del-vapore-1', 'fabbrica-del-vapore-2'];
  if (s.includes('arci-bellezza')) return ['arci-bellezza-milano', 'arci-bellezza-2', 'santeria-toscana-31', 'mosso-milano-1'];
  if (s.includes('masada') || s.includes('amelia')) return ['masada-1', 'masada-2', 'amelia-1', 'amelia-2'];
  if (s.includes('tocqueville')) return ['tocqueville-13', '11-clubroom-interior-01', '11-clubroom-interior-03', 'play-club-milano-interior-02'];
  if (s.includes('bobino')) return ['bobino-milano', 'fiftyfive-milano-lounge-01', 'apollo-milano-interior-03', 'fiftyfive-milano-cena-01'];
  if (s.includes('spirit-de-milan')) return ['spirit-de-milan', 'balera-dell-ortica', 'capodanno-cena-cantata-show-flow-01', 'fiftyfive-milano-cena-01'];
  if (s.includes('blue-note')) return ['blue-note-milano', 'nidaba-theatre', 'capodanno-cena-cantata-show-flow-01', 'gattopardo-interior-02'];
  if (s.includes('terme') || s.includes('aquaria') || s.includes('spa')) return VENUE_MASTER_KEYS['terme'];
  if (s.includes('baita') || s.includes('motoslitta') || s.includes('livigno') || s.includes('fiaccolata')) return VENUE_MASTER_KEYS['baita'];
  if (s.includes('tram') || s.includes('atmosfera') || s.includes('battello')) return VENUE_MASTER_KEYS['tram'];
  if (s.includes('castello') || s.includes('villa') || s.includes('principe') || s.includes('hotel')) return VENUE_MASTER_KEYS['castello-villa'];
  if (s.includes('piazza') || s.includes('duomo') || s.includes('darsena') || s.includes('arco-della-pace')) return VENUE_MASTER_KEYS['piazza'];
  if (s.includes('rooftop') || s.includes('gallia') || s.includes('dome') || s.includes('radio-rooftop')) return VENUE_MASTER_KEYS['rooftop-generic'];
  return VENUE_MASTER_KEYS['dinner-show-generic'];
}

export function getCapodannoOfficialPosterSrc(eventSlug: string): string {
  if (eventSlug === 'capodanno-justme-milano-torre-branca') {
    return '/images/events/october-2026/248439-68f2dbbf4405.webp';
  }
  return `/images/events/capodanno-2027-posters/${eventSlug}.webp`;
}

export interface SeoImageItem {
  src: string;
  title: string;
  alt: string;
  description: string;
  anchorHeading: string;
  targetBadge: string;
  outfitBadge: string;
  shotLabel: string;
  assetKey: string;
}

export interface SeoEventUxTier {
  id: string;
  zoneLabel: string;
  totalEur: number;
  guestsRange: string;
  perPersonRange: string;
  included: string;
  waUrl: string;
}

export interface SeoEventUxPack {
  tldr: {
    badge: string;
    heading: string;
    items: Array<{ label: string; value: string }>;
  };
  formulaCtaLabel: string;
  vipCalc: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    tiers: [SeoEventUxTier, SeoEventUxTier, SeoEventUxTier, SeoEventUxTier];
    upsellTitle: string;
    upsellBody: string;
    ctaBtn: string;
    waDefaultUrl: string;
  };
  dressChecker: {
    heading: string;
    okTitle: string;
    okItems: [string, string, string];
    noTitle: string;
    noItems: [string, string, string];
  };
  logistics: {
    heading: string;
    items: [
      { label: string; text: string },
      { label: string; text: string },
      { label: string; text: string },
    ];
  };
  privateParties: {
    badge: string;
    heading: string;
    body: string;
    ctaLabel: string;
    waUrl: string;
  };
  nightFinder: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    steps: [
      { title: string; chips: Array<{ label: string; href: string }> },
      { title: string; chips: Array<{ label: string; href: string }> },
      { title: string; chips: Array<{ label: string; href: string }> },
    ];
    waCtaLabel: string;
    waUrl: string;
  };
}

export interface SeoEventImagePack {
  eyebrow: string;
  sectionHeading: string;
  sectionSubtitle: string;
  targetPrefix: string;
  outfitPrefix: string;
  targetLabel: string;
  outfitLabel: string;
  poster: {
    src: string;
    title: string;
    alt: string;
    description: string;
    badgeLabel: string;
  };
  gallery: [SeoImageItem, SeoImageItem, SeoImageItem, SeoImageItem];
  schemaImages: Array<{
    '@type': 'ImageObject';
    url: string;
    contentUrl: string;
    name: string;
    caption: string;
    description: string;
  }>;
  ux: SeoEventUxPack;
}

const UX_COPY_BY_LOCALE: Record<string, {
  tldrBadge: string;
  tldrHeadingTpl: string;
  tldrLabels: [string, string, string, string, string];
  tldrPricesVal: string;
  tldrConciergeVal: string;
  formulaCta: string;
  vipEyebrow: string;
  vipHeadingTpl: string;
  vipSub: string;
  vipZones: [string, string, string, string];
  vipInclusions: [string, string, string, string];
  upsellTitle: string;
  upsellBody: string;
  vipCtaBtn: string;
  dressHeadingTpl: string;
  dressOkTitle: string;
  dressOkExtra1: string;
  dressOkExtra2: string;
  dressNoTitle: string;
  dressNoItems: [string, string, string];
  logHeadingTpl: string;
  logLabels: [string, string, string];
  logTexts: [string, string, string];
  privBadge: string;
  privHeadingTpl: string;
  privBody: string;
  privCta: string;
  nfEyebrow: string;
  nfHeading: string;
  nfSub: string;
  nfSteps: [string, string, string];
  nfChips1: [string, string, string, string];
  nfChips2: [string, string, string, string];
  nfChips3: [string, string, string];
  nfWaCta: string;
}> = {
  it: {
    tldrBadge: 'IN SINTESI · 5 PUNTI CHIAVE DELL’EVENTO',
    tldrHeadingTpl: '{h1} — Guida Rapida & Riepilogo Ufficiale',
    tldrLabels: ['1. Pubblico & Età', '2. Musica & Format', '3. Dress Code & Outfit', '4. Formule & Tavoli VIP', '5. Concierge Ufficiale Diretto'],
    tldrPricesVal: 'Lista / Prevendita Salta-Fila · Tavolo VIP da €300 (6–8 ospiti, ~€38–€50 a persona con bottiglie incluse)',
    tldrConciergeVal: 'WhatsApp +39 351 912 7047 · WWW.NIGHTLIFEMILAN.COM (Zero commissioni d’agenzia)',
    formulaCta: 'Prenota questa formula su WhatsApp →',
    vipEyebrow: 'CALCOLATORE PREVENTIVO TAVOLO VIP & BOTTIGLIE',
    vipHeadingTpl: 'Calcola il Costo a Persona del Tavolo VIP — {venue}',
    vipSub: 'Dividi il tavolo con il tuo gruppo: ingresso prioritario salta-fila immediato, tavolo riservato tutta la notte e 100% dell’importo convertito in bottiglie servite al tavolo.',
    vipZones: ['Tavolo Pista / Dancefloor', 'Tavolo Privé Rialzato', 'Tavolo Super Privé VIP', 'Tavolo Console DJ / Backstage'],
    vipInclusions: [
      '1 Bottiglia Superalcolico o Champagne + 6–8 Pass Salta-Fila',
      '2 Bottiglie Premium o 1 Magnum + 8–10 Pass VIP & Hostess',
      'Dom Pérignon / Bottiglie Luxury + 10–12 Pass Super Privé',
      'Postazione Esclusiva Console DJ + Bottle Show Scenografico (12–15 Pass)',
    ],
    upsellTitle: 'Perché in 6 o più amici il Tavolo VIP conviene più dell’ingresso singolo?',
    upsellBody: 'Tra biglietto o ingresso in lista (€20–€30), guardaroba e secondo drink al bar (€15–€20), spendi già €40–€50 a testa facendo coda all’ingresso e restando in piedi. Con un Tavolo VIP da €300 diviso in 6–8 amici spendi la stessa cifra (€38–€50 a persona), entri subito dal varco VIP senza fila e hai seduta riservata con bottiglie al tavolo tutta la notte.',
    vipCtaBtn: 'Blocca Preventivo Tavolo VIP su WhatsApp (+39 351 912 7047) →',
    dressHeadingTpl: 'Controllo Rapido Dress Code & Selezione all’Ingresso — {venue}',
    dressOkTitle: '✅ Outfit Consigliato (Ingresso Agevolato)',
    dressOkExtra1: 'Camicia, Blazer sartoriale o Abito da sera curato con calzature eleganti',
    dressOkExtra2: 'Gruppi misti uomo/donna o prenotazione nominale confermata via Concierge WhatsApp',
    dressNoTitle: '❌ Da Evitare (Rischio Rimbalzo alla Porta)',
    dressNoItems: [
      'Tute sportive, pantaloncini, abbigliamento da palestra o felpe tecniche',
      'Cappellini con visiera, marsupi sportivi a tracolla o calzature da spiaggia',
      'Gruppi numerosi di soli uomini privi di tavolo VIP riservato',
    ],
    logHeadingTpl: 'Logistica Notturna: Come Arrivare & Rientro alle 04:00 — {venue}',
    logLabels: ['Metro & Linee Notturne ATM', 'Taxi Ufficiali & NCC', 'Parcheggio & Viabilità'],
    logTexts: [
      'Linee M1/M2/M3/M4/M5 fino alle 00:30 + Rete Notturna ATM (NM1, NM2, NM3, NM4 e N25/N26 sui Navigli/Garibaldi) attiva tutta la notte.',
      'Posteggio Taxi ufficiale a 100m dal locale (Radiotaxi 02 4040 / 02 6969 / 02 8585) o prenotazione anticipata tramite Concierge.',
      'Garage custoditi H24 nelle vie adiacenti; attenzione ai varchi elettronici ZTL e Area C se arrivi in auto.',
    ],
    privBadge: 'FESTE DI LAUREA · COMPLEANNI · EVENTI AZIENDALI · FUORISALONE & FASHION WEEK',
    privHeadingTpl: 'Feste di Laurea, Compleanni, Addii al Nubilato/Celibato & Corporate da {venue}',
    privBody: 'Organizzi una Festa di Laurea, un 18°/30° Compleanno o un Evento Aziendale durante Milano Fashion Week, Design Week / Fuorisalone o GP F1 Monza? Pacchetti dedicati con area Privé riservata, aperitivo royal o cena, servizio torta, bottiglie personalizzate e lista ospiti dedicata.',
    privCta: 'Richiedi Preventivo Festa / Laurea su WhatsApp →',
    nfEyebrow: 'SELETTORE GUIDATO SERATA MILANO IN 3 CLICK',
    nfHeading: 'Trova la Tua Serata Perfetta a Milano in 3 Click',
    nfSub: 'Filtra per data, genere musicale o formula d’ingresso oppure chiedi consiglio immediato su WhatsApp.',
    nfSteps: ['1. Quando vuoi uscire?', '2. Che musica e atmosfera cerchi?', '3. Quale formula preferisci?'],
    nfChips1: ['Stasera a Milano', 'Questo Weekend', 'Speciale Halloween 2026', 'Capodanno 2027 (112 Eventi)'],
    nfChips2: ['House, Rooftop & Luxury', 'Hip-Hop, Reggaeton & Urban', 'Techno & Electronic Club', 'Cena Cantata & Over 30'],
    nfChips3: ['Lista & Biglietti Salta-Fila', 'Aperitivo Royal con Tavolo', 'Tavolo VIP Privé & Bottiglie'],
    nfWaCta: 'Fatti Consigliare in 60 Secondi su WhatsApp (+39 351 912 7047) →',
  },
  en: {
    tldrBadge: 'TL;DR · 5 KEY EVENT ESSENTIALS',
    tldrHeadingTpl: '{h1} — Quick Summary & Official Booking Guide',
    tldrLabels: ['1. Target Crowd & Age', '2. Music & Format', '3. Dress Code & Outfit', '4. Tickets & VIP Tables', '5. Official Direct Concierge'],
    tldrPricesVal: 'Guest List / Skip-the-Line Tickets · VIP Tables from €300 (6–8 guests, ~€38–€50/person with bottle credit included)',
    tldrConciergeVal: 'WhatsApp +39 351 912 7047 · WWW.NIGHTLIFEMILAN.COM (Zero agency markup)',
    formulaCta: 'Book this package on WhatsApp →',
    vipEyebrow: 'INTERACTIVE VIP TABLE & BOTTLE SPLITTER',
    vipHeadingTpl: 'Calculate Your Per-Person VIP Table Cost — {venue}',
    vipSub: 'Split a VIP table with your group: instant skip-the-line VIP entry, reserved seating all night, and 100% of the table minimum spent on bottles.',
    vipZones: ['Dancefloor VIP Table', 'Elevated Privé Table', 'Super Privé VIP Table', 'DJ Console / Backstage Table'],
    vipInclusions: [
      '1 Premium Spirit or Champagne Bottle + 6–8 Skip-the-Line VIP Passes',
      '2 Premium Bottles or 1 Magnum + 8–10 VIP Passes & Hostess Escort',
      'Dom Pérignon / Luxury Bottles + 10–12 Super Privé Passes',
      'Prime DJ Booth Table + Show Parade Service (12–15 VIP Passes)',
    ],
    upsellTitle: 'Why a VIP Table Is Smarter Than Individual Tickets for Groups of 6+',
    upsellBody: 'Between standard entry (€20–€30), coat check, and a second drink at the bar (€15–€20), you already spend €40–€50 per person while standing in line. Splitting a €300 VIP Table among 6–8 friends costs the exact same (€38–€50/person) and gives you instant VIP door entry, reserved seating, and bottle service all night.',
    vipCtaBtn: 'Lock In This VIP Table Quote on WhatsApp (+39 351 912 7047) →',
    dressHeadingTpl: 'Quick Dress Code & Door Policy Checker — {venue}',
    dressOkTitle: '✅ Approved & Recommended Outfit (Smooth Door Entry)',
    dressOkExtra1: 'Collared shirt, tailored blazer, cocktail dress, or polished eveningwear with dress shoes',
    dressOkExtra2: 'Balanced mixed-gender groups or confirmed nominal reservation via WhatsApp Concierge',
    dressNoTitle: '❌ Avoid at the Door (High Risk of Refusal)',
    dressNoItems: [
      'Tracksuits, gym shorts, athletic hoodies, or activewear',
      'Baseball caps, sporty crossbody bags, or flip-flops/slides',
      'Large all-male groups arriving late without a confirmed VIP Table reservation',
    ],
    logHeadingTpl: 'Night Logistics: Getting There & 04:00 AM Return — {venue}',
    logLabels: ['Metro & ATM Night Lines', 'Official Taxis & Chauffeur', 'Parking & ZTL Cameras'],
    logTexts: [
      'Metro M1/M2/M3/M4/M5 until 00:30 + ATM Night Buses (NM1, NM2, NM3, NM4) running all night on weekends.',
      'Official Taxi stand within 100m (Radiotaxi +39 02 4040 / +39 02 6969 / +39 02 8585) or private chauffeur via Concierge.',
      '24h guarded parking garages nearby; watch out for Milan Area C and night ZTL camera zones if driving.',
    ],
    privBadge: 'GRADUATION PARTIES · BIRTHDAYS · CORPORATE EVENTS · FASHION & DESIGN WEEK',
    privHeadingTpl: 'Graduation Parties, Birthdays, Bachelorette/Bachelor & Corporate Events at {venue}',
    privBody: 'Planning a Graduation Party (Festa di Laurea), 18th/30th Birthday, or Corporate Afterparty during Milan Fashion Week, Design Week / Fuorisalone, or Monza F1 GP? Custom packages with private area, royal aperitivo or dinner, cake service, and bottle parades.',
    privCta: 'Request Private Party / Corporate Quote on WhatsApp →',
    nfEyebrow: '3-CLICK MILAN NIGHT FINDER',
    nfHeading: 'Find Your Ideal Night Out in Milan in 3 Clicks',
    nfSub: 'Filter by night, music vibe, or entry formula — or message our 24/7 WhatsApp Concierge for an instant match.',
    nfSteps: ['1. When are you going out?', '2. What music & vibe do you want?', '3. Preferred entry formula?'],
    nfChips1: ['Tonight in Milan', 'This Weekend', 'Halloween 2026 Special', 'New Year’s Eve 2027 (112 Events)'],
    nfChips2: ['House, Rooftop & Luxury', 'Hip-Hop, Reggaeton & Urban', 'Techno & Electronic Club', 'Dinner Show & 30+ Crowd'],
    nfChips3: ['Guest List & Tickets', 'Royal Aperitivo Table', 'VIP Privé Table & Bottles'],
    nfWaCta: 'Get a Tailored Club Match in 60s on WhatsApp (+39 351 912 7047) →',
  },
};

function buildSeoEventUxPack(params: {
  locale: string;
  venueName: string;
  h1: string;
  targetLabel: string;
  outfitLabel: string;
  music?: string;
}): SeoEventUxPack {
  const loc = params.locale;
  const base = UX_COPY_BY_LOCALE[loc] || UX_COPY_BY_LOCALE.en;
  const prefix = loc === 'en' ? '' : `/${loc}`;
  const capHubHref = `${prefix}/events/${(CAPODANNO_NAVIGATION[loc as keyof typeof CAPODANNO_NAVIGATION] || CAPODANNO_NAVIGATION.en).slug}`;
  const halHubHref = loc === 'it' ? '/it/events/eventi-halloween-milano-2026' : `${prefix}/events/halloween-events-in-milan-2026`;
  const mkWa = (msg: string) => `https://wa.me/393519127047?text=${encodeURIComponent(msg)}`;

  const tiers: [SeoEventUxTier, SeoEventUxTier, SeoEventUxTier, SeoEventUxTier] = [
    {
      id: 'dancefloor',
      zoneLabel: base.vipZones[0],
      totalEur: 300,
      guestsRange: '6–8 pax',
      perPersonRange: '€38 – €50 / pax',
      included: base.vipInclusions[0],
      waUrl: mkWa(`Ciao Nightlife Milan! Vorrei bloccare un preventivo ${base.vipZones[0]} (€300 · 6-8 pax) per ${params.h1} presso ${params.venueName}.`),
    },
    {
      id: 'prive',
      zoneLabel: base.vipZones[1],
      totalEur: 600,
      guestsRange: '8–10 pax',
      perPersonRange: '€60 – €75 / pax',
      included: base.vipInclusions[1],
      waUrl: mkWa(`Ciao Nightlife Milan! Vorrei bloccare un preventivo ${base.vipZones[1]} (€600 · 8-10 pax) per ${params.h1} presso ${params.venueName}.`),
    },
    {
      id: 'super-prive',
      zoneLabel: base.vipZones[2],
      totalEur: 1000,
      guestsRange: '10–12 pax',
      perPersonRange: '€85 – €100 / pax',
      included: base.vipInclusions[2],
      waUrl: mkWa(`Ciao Nightlife Milan! Vorrei bloccare un preventivo ${base.vipZones[2]} (€1.000 · 10-12 pax) per ${params.h1} presso ${params.venueName}.`),
    },
    {
      id: 'console',
      zoneLabel: base.vipZones[3],
      totalEur: 1500,
      guestsRange: '12–15 pax',
      perPersonRange: '€100 – €125 / pax',
      included: base.vipInclusions[3],
      waUrl: mkWa(`Ciao Nightlife Milan! Vorrei bloccare un preventivo ${base.vipZones[3]} (€1.500 · 12-15 pax) per ${params.h1} presso ${params.venueName}.`),
    },
  ];

  return {
    tldr: {
      badge: base.tldrBadge,
      heading: base.tldrHeadingTpl.replace('{h1}', params.h1),
      items: [
        { label: base.tldrLabels[0], value: params.targetLabel },
        { label: base.tldrLabels[1], value: params.music || 'Clubbing, DJ Set & Show' },
        { label: base.tldrLabels[2], value: params.outfitLabel },
        { label: base.tldrLabels[3], value: base.tldrPricesVal },
        { label: base.tldrLabels[4], value: base.tldrConciergeVal },
      ],
    },
    formulaCtaLabel: base.formulaCta,
    vipCalc: {
      eyebrow: base.vipEyebrow,
      heading: base.vipHeadingTpl.replace('{venue}', params.venueName),
      subtitle: base.vipSub,
      tiers,
      upsellTitle: base.upsellTitle,
      upsellBody: base.upsellBody,
      ctaBtn: base.vipCtaBtn,
      waDefaultUrl: mkWa(`Ciao Nightlife Milan! Vorrei un preventivo Tavolo VIP per ${params.h1} (${params.venueName}).`),
    },
    dressChecker: {
      heading: base.dressHeadingTpl.replace('{venue}', params.venueName),
      okTitle: base.dressOkTitle,
      okItems: [params.outfitLabel, base.dressOkExtra1, base.dressOkExtra2],
      noTitle: base.dressNoTitle,
      noItems: base.dressNoItems,
    },
    logistics: {
      heading: base.logHeadingTpl.replace('{venue}', params.venueName),
      items: [
        { label: base.logLabels[0], text: base.logTexts[0] },
        { label: base.logLabels[1], text: base.logTexts[1] },
        { label: base.logLabels[2], text: base.logTexts[2] },
      ],
    },
    privateParties: {
      badge: base.privBadge,
      heading: base.privHeadingTpl.replace('{venue}', params.venueName),
      body: base.privBody,
      ctaLabel: base.privCta,
      waUrl: mkWa(`Ciao Nightlife Milan! Vorrei informazioni sui pacchetti Festa Privata / Laurea / Compleanno / Evento Aziendale presso ${params.venueName}.`),
    },
    nightFinder: {
      eyebrow: base.nfEyebrow,
      heading: base.nfHeading,
      subtitle: base.nfSub,
      steps: [
        {
          title: base.nfSteps[0],
          chips: [
            { label: base.nfChips1[0], href: `${prefix}/events/tonight` },
            { label: base.nfChips1[1], href: `${prefix}/events/this-week` },
            { label: base.nfChips1[2], href: halHubHref },
            { label: base.nfChips1[3], href: capHubHref },
          ],
        },
        {
          title: base.nfSteps[1],
          chips: [
            { label: base.nfChips2[0], href: `${prefix}/events/special` },
            { label: base.nfChips2[1], href: `${prefix}/events/international` },
            { label: base.nfChips2[2], href: `${prefix}/events/best` },
            { label: base.nfChips2[3], href: `${prefix}/events/21-plus` },
          ],
        },
        {
          title: base.nfSteps[2],
          chips: [
            { label: base.nfChips3[0], href: `${prefix}/guest-lists` },
            { label: base.nfChips3[1], href: `${prefix}/aperitivo` },
            { label: base.nfChips3[2], href: `${prefix}/vip-tables` },
          ],
        },
      ],
      waCtaLabel: base.nfWaCta,
      waUrl: mkWa(`Ciao Nightlife Milan! Vorrei un consiglio rapido per scegliere locale, lista o tavolo VIP a Milano.`),
    },
  };
}

export function buildSeoEventImagePack(params: {
  locale: string;
  eventSlug: string;
  venueName: string;
  h1: string;
  h2List: string[];
  h3List: string[];
  categorySlug?: string;
  music?: string;
  dressCode?: string;
  posterSrc: string;
  isHalloween?: boolean;
  customAssetKeys?: [string, string, string, string];
}): SeoEventImagePack {
  const pack = getSeoLocalePack(params.locale);
  const { target, outfit } = inferTargetAndOutfit({
    slug: params.eventSlug,
    categorySlug: params.categorySlug,
    music: params.music,
    dressCode: params.dressCode,
    isHalloween: params.isHalloween,
  });
  const targetLabel = pack.targets[target];
  const outfitLabel = pack.outfits[outfit];
  const phone = SITE_CONTACT.whatsapp.number;

  const h2A = params.h2List[0] || params.h1;
  const h2B = params.h2List[1] || h2A;
  const h3A = params.h3List[0] || h2A;
  const h3B = params.h3List[1] || h2B;
  const anchors: [string, string, string, string] = [params.h1, h2A, h3A, h3B];

  const assetKeys = params.customAssetKeys || selectMasterAssetKeys(params.eventSlug, params.venueName, params.categorySlug);

  const posterTitle = `${params.h1} — ${pack.officialPosterBadge} · ${params.venueName}`;
  const posterAlt = `${params.h1} — ${pack.officialPosterBadge} ${params.venueName} (${targetLabel} · ${outfitLabel})`;
  const posterDesc = pack.posterDescTpl
    .replace('{h1}', params.h1)
    .replace('{venue}', params.venueName)
    .replace('{target}', targetLabel)
    .replace('{outfit}', outfitLabel)
    .replace('{phone}', phone);

  const gallery = assetKeys.map((assetKey, idx) => {
    const anchorHeading = anchors[idx] || params.h1;
    const shotLabel = pack.shots[idx] || pack.shots[0];
    const seoFileSlug = slugifySeoSegment(
      `${params.h1}-${anchorHeading}-${params.venueName}-${targetLabel.split('(')[0]}-${outfitLabel.split('&')[0]}`,
      82,
    );
    const src = `/images/seo-events/${params.locale}/${assetKey}--${seoFileSlug}.webp`;
    const title = `${params.h1} · ${anchorHeading} — ${targetLabel} | ${outfitLabel}`;
    const alt = `${params.h1} (${anchorHeading}) — ${params.venueName}: ${targetLabel}, ${outfitLabel} (${shotLabel})`;
    const description = pack.shotDescTpl
      .replace('{h1}', params.h1)
      .replace('{heading}', anchorHeading)
      .replace('{venue}', params.venueName)
      .replace('{target}', targetLabel)
      .replace('{outfit}', outfitLabel)
      .replace('{shot}', shotLabel)
      .replace('{phone}', phone);
    return {
      src,
      title,
      alt,
      description,
      anchorHeading,
      targetBadge: targetLabel,
      outfitBadge: outfitLabel,
      shotLabel,
      assetKey,
    };
  }) as [SeoImageItem, SeoImageItem, SeoImageItem, SeoImageItem];

  const origin = 'https://nightlifemilan.com';
  const safePosterSrc = typeof params.posterSrc === 'string' && params.posterSrc ? params.posterSrc : '/images/milan-nightclub-luxury-vip-champagne.webp';
  const schemaImages = [
    {
      '@type': 'ImageObject' as const,
      url: safePosterSrc.startsWith('http') ? safePosterSrc : `${origin}${safePosterSrc}`,
      contentUrl: safePosterSrc.startsWith('http') ? safePosterSrc : `${origin}${safePosterSrc}`,
      name: posterTitle,
      caption: posterAlt,
      description: posterDesc,
    },
    ...gallery.map((g) => ({
      '@type': 'ImageObject' as const,
      url: `${origin}${g.src}`,
      contentUrl: `${origin}${g.src}`,
      name: g.title,
      caption: g.alt,
      description: g.description,
    })),
  ];

  return {
    eyebrow: pack.galleryEyebrow,
    sectionHeading: pack.galleryHeadingTpl.replace('{venue}', params.venueName),
    sectionSubtitle: pack.gallerySubTpl
      .replace('{h1}', params.h1)
      .replace('{venue}', params.venueName)
      .replace('{target}', targetLabel)
      .replace('{outfit}', outfitLabel)
      .replace('{phone}', phone),
    targetPrefix: pack.targetPrefix,
    outfitPrefix: pack.outfitPrefix,
    targetLabel,
    outfitLabel,
    poster: {
      src: params.posterSrc,
      title: posterTitle,
      alt: posterAlt,
      description: posterDesc,
      badgeLabel: pack.officialPosterBadge,
    },
    gallery,
    schemaImages,
    ux: buildSeoEventUxPack({
      locale: params.locale,
      venueName: params.venueName,
      h1: params.h1,
      targetLabel,
      outfitLabel,
      music: params.music,
    }),
  };
}
