import type { LocaleCode } from '@/lib/i18n/localeRegistry';
import type {
  CapodannoEventTier,
  CapodannoLocalizedEventContent,
  CapodannoMenuCard,
  CapodannoScheduleStep,
} from '@/lib/capodanno/repvblic35';

const CHURCH81_ADDR = 'Via della Chiesa Rossa 81 (Navigli / Chiesa Rossa), 20142 Milano';
const CHURCH81_PESCE_IMG = '/images/events/capodanno-2027-menus/church-81-nye-2027-menu-pesce-90.webp';
const CHURCH81_CARNE_IMG = '/images/events/capodanno-2027-menus/church-81-nye-2027-menu-carne-90.webp';

const FF_ADDR = 'Via Piero della Francesca 55 (Sempione / Bullona), 20154 Milano';
const FF_GALA_IMG = '/images/events/capodanno-2027-menus/55-milano-nye-2027-menu-gala-160.webp';
const FF_BUFFET_IMG = '/images/events/capodanno-2027-menus/55-milano-nye-2027-menu-buffet-100.webp';

interface Venue35Pack {
  nyeTitle: string;
  milano: string;
  dec31: string;
  churchTitle: string;
  churchSub: string;
  churchDesc: string;
  churchMusic: string;
  churchDress: string;
  churchPriceSum: string;
  churchTierFishLabel: string;
  churchTierMeatLabel: string;
  churchTierPrice: string;
  churchTierFishDesc: string;
  churchTierMeatDesc: string;
  churchHighlights: [string, string, string, string];
  churchSource: string;
  churchSteps: [string, string, string, string];
  churchFishTitle: string;
  churchMeatTitle: string;
  churchFishBev: string;
  churchMeatBev: string;
  churchCoursesLabels: [string, string, string, string, string];
  churchFishDishes: [string, string, string, string, string];
  churchMeatDishes: [string, string, string, string, string];
  churchFaqs: [
    [string, string],
    [string, string],
    [string, string],
    [string, string],
  ];
  ffTitle: string;
  ffSub: string;
  ffDesc: string;
  ffMusic: string;
  ffDress: string;
  ffPriceSum: string;
  ffTierAfterLabel: string;
  ffTierAfterPrice: string;
  ffTierAfterDesc: string;
  ffTierBuffetLabel: string;
  ffTierBuffetPrice: string;
  ffTierBuffetDesc: string;
  ffTierGalaLabel: string;
  ffTierGalaPrice: string;
  ffTierGalaDesc: string;
  ffTierVipLabel: string;
  ffTierVipPrice: string;
  ffTierVipDesc: string;
  ffTierKeepLabel: string;
  ffTierKeepPrice: string;
  ffTierKeepDesc: string;
  ffHighlights: [string, string, string, string];
  ffSource: string;
  ffSteps: [string, string, string, string, string];
  ffGalaTitle: string;
  ffGalaSub: string;
  ffGalaBev: string;
  ffBuffetTitle: string;
  ffBuffetSub: string;
  ffBuffetBev: string;
  ffGalaLabels: [string, string, string];
  ffGalaDishes: [string, string, string];
  ffBuffetLabels: [string, string, string];
  ffBuffetDishes: [string, string, string];
  ffFaqs: [
    [string, string],
    [string, string],
    [string, string],
    [string, string],
  ];
  scheduleHeading: string;
  menusHeading: string;
  conditionsHeading: string;
}

const CORE_EN: Venue35Pack = {
  nyeTitle: 'NYE 2027',
  milano: 'Milan',
  dec31: 'Thursday, December 31, 2026',
  churchTitle: 'NYE 2027 Eyes Wide Shut · Church 81 Milan (€90 Gala Dinner + QR & Password)',
  churchSub: `Church 81 Milan · ${CHURCH81_ADDR} · 20:30 – 04:00 · Fixed €90 · Free Parking`,
  churchDesc:
    'Celebrate December 31, 2026 inside Church 81’s deconsecrated church arches on Via della Chiesa Rossa 81 (Navigli district). Eyes Wide Shut NYE 2027 combines a seated €90 gala dinner (choice of Fish or Meat menu per guest, switchable for free until December 28) with a personal QR code and secret password entry, warm panettone, midnight cotechino & lentils, free parking, and DJ sets until 04:00. Concierge booking via WhatsApp +39 351 912 7047.',
  churchMusic: 'Eyes Wide Shut Masquerade · Gala Dinner Show, Commercial & House DJ Set (20:30 – 04:00)',
  churchDress: 'Eyes Wide Shut Masquerade / Black Tie or Elegant Evening Attire',
  churchPriceSum: 'Single Fixed Rate €90 · Fish or Meat Seated Gala Dinner · QR Code + Secret Password',
  churchTierFishLabel: 'Eyes Wide Shut Fish Gala Dinner (20:30)',
  churchTierMeatLabel: 'Eyes Wide Shut Meat Gala Dinner (20:30)',
  churchTierPrice: '€90 per person',
  churchTierFishDesc:
    'Welcome Prosecco Millesimato flute, Seafood Trio, Paccheri or Lemon Prawn Risotto, Salmon or Sea Bass fillet, warm panettone & midnight lentils; other drinks excluded. Free switch until Dec 28.',
  churchTierMeatDesc:
    'Welcome Prosecco Millesimato flute, Fassona/Chianina/Angus Tartare Trio, Beef Ragù Pappardelle or Braised Ravioli, Larded Fillet or Orange Duck, warm panettone & midnight lentils; other drinks excluded.',
  churchHighlights: [
    'Fixed €90 Fish or Meat seated gala inside Milan’s deconsecrated church on Via della Chiesa Rossa 81',
    'Individual Fish/Meat choice within your table with free switch until December 28',
    'Nominal admission via personal QR code plus secret password issued upon confirmation',
    'Large free on-site parking outside Area C plus M2 Abbiategrasso & Trams 3 / 15',
  ],
  churchSource:
    'Confirmed official Church 81 Eyes Wide Shut NYE 2027 rate (€90 Fish or Meat seated gala, Dec 31 2026 20:30–04:00, QR + password + free switch until Dec 28). WhatsApp Concierge +39 351 912 7047.',
  churchSteps: [
    '20:30 Doors open with QR code & secret password verification and welcome Prosecco Millesimato flute',
    '21:00 Seated Eyes Wide Shut Fish & Meat Gala Dinner beneath the red-brick vaults',
    '00:00 Midnight countdown, toast and traditional cotechino with lentils',
    '00:30 – 04:00 Eyes Wide Shut masquerade club night & DJ set',
  ],
  churchFishTitle: 'Eyes Wide Shut · Fish Menu (€90)',
  churchMeatTitle: 'Eyes Wide Shut · Meat Menu (€90)',
  churchFishBev: 'Includes 1 welcome flute of Prosecco Millesimato [12]; other beverages excluded. Free menu swap until Dec 28.',
  churchMeatBev: 'Includes 1 welcome flute of Prosecco Millesimato [12]; other beverages excluded. Free menu swap until Dec 28.',
  churchCoursesLabels: ['Welcome Toast', 'Starter', 'First Course (Choice)', 'Main Course (Choice)', 'Dessert & Tradition'],
  churchFishDishes: [
    'Welcome glass of Prosecco Millesimato [12]',
    'Seafood Trio: Smoked swordfish carpaccio with crisp fennel & orange [4]; Tuna tartare with lime & toasted sesame [4, 11]; Salt-cod croquette with lemon mayo [1, 3, 4, 7]',
    'Paccheri with seafood ragù [1, 2, 4, 9, 12, 14] OR Lemon risotto with prawns and courgettes [2, 7, 9, 12]',
    'Baked salmon slice with golden potatoes [4] OR Sea bass fillet with confit cherry tomatoes and puntarelle [4]',
    'Warm panettone with mascarpone cream [1, 3, 7] + Midnight cotechino with lentils [9]',
  ],
  churchMeatDishes: [
    'Welcome glass of Prosecco Millesimato [12]',
    'Beef Tartare Trio (Fassona, Chianina & Angus) with salsa verde, spicy mayo and honey mustard glaze [1, 3, 4, 10]',
    'Slow-cooked beef ragù pappardelle [1, 3, 7, 9, 12] OR Braised beef ravioli with butter and sage [1, 3, 7, 9, 12]',
    'Larded beef fillet with mashed potatoes [7] OR Orange duck breast with roast potatoes [7, 12]',
    'Warm panettone with mascarpone cream [1, 3, 7] + Midnight cotechino with lentils [9]',
  ],
  churchFaqs: [
    ['How do QR code and secret password entry work?', 'Once confirmed via WhatsApp +39 351 912 7047, guests receive their personal QR code and the secret password required at the Via della Chiesa Rossa 81 door.'],
    ['Can people at the same table pick different menus?', 'Yes. Each guest chooses Fish or Meat at €90, and choices can be swapped free of charge until December 28.'],
    ['What is included in the €90 price?', 'The €90 rate covers the multi-course seated dinner, 1 welcome Prosecco Millesimato flute, warm panettone, midnight cotechino & lentils, and the club party until 04:00; extra drinks are excluded.'],
    ['Is parking available at Church 81 Milan?', 'Yes, large free parking is available on site right outside the deconsecrated church, well clear of central ZTL/Area C gates.'],
  ],
  ffTitle: '55 Milano NYE 2027 · La Dolce Vita (€160 Gala, €100 Buffet, €30–€50 Club)',
  ffSub: `55 Milano · ${FF_ADDR} · 20:30 – 05:00 · La Dolce Vita Official 2027`,
  ffDesc:
    'Welcome 2027 at 55 Milano’s 1,000 sqm historic loft in Sempione (Via Piero della Francesca 55) with the official La Dolce Vita program (20:30 – 05:00): Seated Gala Dinner at €160 (welcome flute, Pozzi Riserva scampi risotto, Filet Mignon or Sea Bass, 1 wine bottle per 2), Guaranteed Laid-Table Buffet at €100, After-Dinner from 00:10 (€30 / €40 / €50 releases with 1 drink), Night Tables at €350 (5 passes + 1 bottle), and Keep-Table at €200. Direct WhatsApp booking +39 351 912 7047 with zero agency fees.',
  ffMusic: 'La Dolce Vita · Special Live Shows all night, Dinner Show & DJ Set until 05:00',
  ffDress: 'Elegant / Smart Chic Evening Attire',
  ffPriceSum: 'Club 00:10 €30/€40/€50 · Buffet €100 · Gala €160 · Tables €350 · Keep-Table €200',
  ffTierAfterLabel: 'After-Dinner Entry (from 00:10 · Releases 1 / 2 / 3)',
  ffTierAfterPrice: '€30 / €40 / €50',
  ffTierAfterDesc: 'Includes 1 drink, midnight La Dolce Vita club access, special live shows and overnight surprises until 05:00 (€30 1st, €40 2nd, €50 3rd Release).',
  ffTierBuffetLabel: 'Buffet Dinner with Guaranteed Laid Table (20:30)',
  ffTierBuffetPrice: '€100 per person',
  ffTierBuffetDesc: 'Raw & hot seafood, Iberian & Italian charcuterie, cheeses, risotto & calamarata, laid seated table guaranteed, 1 drink and 1 water bottle per 2 guests.',
  ffTierGalaLabel: 'Seated Gala Dinner · La Dolce Vita (20:30)',
  ffTierGalaPrice: '€160 per person',
  ffTierGalaDesc: 'Welcome flute, Salmon Tartare, Mushroom Flan, Carne Salada, Scampi & Porcini Risotto, Filet Mignon or Citrus Sea Bass, 55 Style Tiramisu, water & 1 wine bottle per 2 guests.',
  ffTierVipLabel: 'Night VIP Table (from 00:10)',
  ffTierVipPrice: '€350 (up to 5 passes)',
  ffTierVipDesc: 'Reserved VIP table from 00:10 with 5 complimentary admissions and 1 premium spirit or champagne bottle.',
  ffTierKeepLabel: 'Dinner Table Retention (post 00:30)',
  ffTierKeepPrice: '€200 bottle service',
  ffTierKeepDesc: 'Keep your seated dinner table throughout the La Dolce Vita club night with €200 bottle allocation.',
  ffHighlights: [
    'Confirmed La Dolce Vita 2027 rates (20:30 – 05:00) inside 55 Milano’s 1,000 sqm Sempione loft',
    'Both Buffet (€100) and Gala (€160) guarantee a laid table; Gala includes 1 wine bottle per 2 guests',
    'After-dinner tickets from 00:10 in 3 releases (€30 / €40 / €50 with 1 drink) plus €350 tables',
    'Direct WhatsApp Concierge reservation (+39 351 912 7047) with zero platform fees',
  ],
  ffSource:
    'Confirmed official La Dolce Vita 2027 rate card & menus for 55 Milano (20:30–05:00: Gala €160, Laid-Table Buffet €100, After-Dinner 00:10 €30/€40/€50, Tables €350, Keep-Table €200). Book via WhatsApp +39 351 912 7047.',
  ffSteps: [
    '20:30 Doors open for €160 Seated Gala & €100 Laid-Table Buffet with live show opening',
    '21:00 – 23:45 La Dolce Vita live entertainment and surprises during dinner service',
    '00:00 Midnight countdown & sparkling toast inside the Sempione loft',
    '00:10 After-dinner entry opens (€30 / €40 / €50 releases) & €350 VIP tables',
    '00:30 – 05:00 Overnight DJ sets, special live acts & €200 dinner table retention',
  ],
  ffGalaTitle: 'La Dolce Vita · Seated Gala Menu (€160)',
  ffGalaSub: '20:30 Seated Service · Includes water + 1 bottle of wine per 2 guests',
  ffGalaBev: 'Includes water and 1 bottle of white, red or sparkling wine every 2 guests.',
  ffBuffetTitle: 'La Dolce Vita · Laid-Table Buffet (€100)',
  ffBuffetSub: '20:30 Guaranteed Laid Seat · Includes 1 drink + 1 water bottle per 2 guests',
  ffBuffetBev: 'Includes laid seat reservation, 1 drink and 1 bottle of water every 2 guests.',
  ffGalaLabels: ['Welcome & Starters Trio', 'Risotto & Choice of Main', 'Dessert'],
  ffGalaDishes: [
    'Welcome flute · Salmon tartare with avocado & lime · Wild mushroom flan with 24m Parmigiano cream · Carne salada carpaccio with aged ricotta & green apple',
    'Pozzi Riserva risotto with scampi & porcini · Choice of Beef Filet Mignon (Chianti demi-glace & ratatouille) OR Citrus Sea Bass fillet with roasted potatoes',
    '55 Style Tiramisu',
  ],
  ffBuffetLabels: ['Seafood, Charcuterie & Cheese Counter', 'Warm Classics', 'Tradition & Pastries'],
  ffBuffetDishes: [
    'Norwegian salmon sashimi, yellowfin tuna, oysters, Argentine prawns, octopus salad, smoked salmon, gratin scallops · Jamón ibérico, crudo 16m, coppa, bresaola, cotto, IGP mortadella, speck · Burrata, stracciatella, buffalo mozzarella, pecorino, brie, asiago, taleggio & gorgonzola',
    'Milanese saffron risotto & seafood calamarata · Himalayan salt prawns, BBQ salmon, roast beef & 55 signature meatballs · Polenta & baby octopus',
    'Zampone, cotechino, lentils & sausages · Panettone and pandoro with warm pastry cream',
  ],
  ffFaqs: [
    ['Does the €100 Buffet at 55 Milano guarantee a seat?', 'Yes, the €100 NYE 2027 Buffet includes a guaranteed laid table seat, full seafood/charcuterie/warm buffet, 1 drink, and 1 water bottle per 2 guests.'],
    ['How do after-dinner releases work from 00:10?', 'After-dinner admission opens at 00:10 across €30 (1st Release), €40 (2nd Release), and €50 (3rd Release), each including 1 drink and live shows until 05:00.'],
    ['Can dinner guests keep their table after midnight?', 'Yes, keeping a dinner table after 00:30 costs €200 in bottle allocation; standalone 00:10 VIP tables cost €350 (5 passes + 1 bottle).'],
    ['How do I book 55 Milano without extra checkout fees?', 'Message WhatsApp +39 351 912 7047 directly to verify availability and secure your €160 Gala, €100 Buffet, €30–€50 tickets, or €350 VIP table.'],
  ],
  scheduleHeading: 'Official NYE 2027 Schedule',
  menusHeading: 'Official NYE 2027 Menus & Rate Sheet',
  conditionsHeading: 'Key Venue & Reservation Notes',
};

const CORE_IT: Venue35Pack = {
  nyeTitle: 'Capodanno 2027',
  milano: 'Milano',
  dec31: 'Giovedì 31 Dicembre 2026',
  churchTitle: 'Capodanno 2027 Church 81 Milano: Eyes Wide Shut (90 € Pesce/Carne · QR + Password)',
  churchSub: `Church 81 Milano · ${CHURCH81_ADDR} · 20:30 – 04:00 · Quota fissa 90 €`,
  churchDesc:
    'Vivi la notte del 31 dicembre 2026 tra gli archi della chiesa sconsacrata di Church 81 Milano in Via della Chiesa Rossa 81 (Navigli / Chiesa Rossa). Eyes Wide Shut propone la Cena di Gala servita a 90 € a persona con Menù di Pesce o di Carne (scelta individuale e cambio gratuito fino al 28 dicembre), accesso nominale con QR code personale e parola d’ordine segreta, panettone caldo, cotechino con lenticchie, ampio parcheggio gratuito e festa fino alle 04:00. Prenotazioni su WhatsApp +39 351 912 7047.',
  churchMusic: 'Eyes Wide Shut Masquerade · Dinner Show elegante & DJ Set Club fino alle 04:00',
  churchDress: 'Eyes Wide Shut · Maschera ed Eleganza / Abito da Sera',
  churchPriceSum: 'Prezzo unico 90 € · Menù Pesce o Carne a scelta · QR Code + Parola d’ordine segreta',
  churchTierFishLabel: 'Cena di Gala Eyes Wide Shut · Menù di Pesce (20:30)',
  churchTierMeatLabel: 'Cena di Gala Eyes Wide Shut · Menù di Carne (20:30)',
  churchTierPrice: '90 € a persona',
  churchTierFishDesc:
    'Flûte di Prosecco Millesimato, Tris di Mare, scelta tra Paccheri ai frutti di mare o Risotto limone e gamberi, Salmone o Branzino, panettone caldo con mascarpone e cotechino con lenticchie. Cambio menù gratis fino al 28/12; altre bevande escluse.',
  churchTierMeatDesc:
    'Flûte di Prosecco Millesimato, Tris di tartare (Fassona, Chianina, Angus), Pappardelle al ragù di manzo o Ravioli di brasato, Filetto lardellato o Anatra all’arancia, panettone caldo e cotechino con lenticchie. Cambio gratis fino al 28/12.',
  churchHighlights: [
    'Quota unica 90 € per Cena di Gala servita tra le volte della chiesa sconsacrata di Via della Chiesa Rossa 81',
    'Ogni commensale sceglie liberamente Pesce o Carne al tavolo con modifica gratuita entro il 28 dicembre',
    'Accesso riservato con QR code personale e parola d’ordine segreta fornita alla conferma',
    'Ampio parcheggio gratuito esterno ad Area C più Metro M2 Abbiategrasso e Tram 3 / 15',
  ],
  churchSource:
    'Programma e menù ufficiali Church 81 Milano Eyes Wide Shut Capodanno 2027 (90 € Pesce/Carne, 20:30–04:00, QR + password, cambio gratuito fino al 28/12, ampio parcheggio gratuito). WhatsApp +39 351 912 7047.',
  churchSteps: [
    '20:30 Accoglienza con verifica QR code e parola d’ordine segreta + calice di Prosecco Millesimato',
    '21:00 Cena di Gala servita Eyes Wide Shut (Menù Pesce o Carne a scelta)',
    '00:00 Brindisi di mezzanotte sotto le volte e cotechino con lenticchie',
    '00:30 – 04:00 Serata Eyes Wide Shut con maschere e DJ set',
  ],
  churchFishTitle: 'Eyes Wide Shut · Menù di Pesce (90 €)',
  churchMeatTitle: 'Eyes Wide Shut · Menù di Carne (90 €)',
  churchFishBev: 'Calice di benvenuto di Prosecco Millesimato [12] incluso; altre bevande escluse. Cambio menù gratuito fino al 28/12.',
  churchMeatBev: 'Calice di benvenuto di Prosecco Millesimato [12] incluso; altre bevande escluse. Cambio menù gratuito fino al 28/12.',
  churchCoursesLabels: ['Benvenuto', 'Antipasto', 'Primo a scelta', 'Secondo a scelta', 'Dolce & Tradizione'],
  churchFishDishes: [
    'Calice di Prosecco Millesimato [12]',
    'Tris di Mare: Carpaccio di spada affumicato con finocchio croccante e arancia [4]; Tartare di tonno con lime e sesamo tostato [4, 11]; Crocchetta di baccalà con maionese al limone [1, 3, 4, 7]',
    'Paccheri al ragù di mare [1, 2, 4, 9, 12, 14] oppure Risotto al limone con gamberi e zucchine [2, 7, 9, 12]',
    'Trancio di salmone al forno con patate dorate [4] oppure Filetto di branzino con pomodorini confit e puntarelle [4]',
    'Panettone caldo con crema al mascarpone [1, 3, 7] + Cotechino con lenticchie [9]',
  ],
  churchMeatDishes: [
    'Calice di Prosecco Millesimato [12]',
    'Tris di Carne: Tris di tartare di Fassona, Chianina e Angus con salsa verde, maionese piccante e salsa al miele [1, 3, 4, 10]',
    'Pappardelle al ragù di manzo a lenta cottura [1, 3, 7, 9, 12] oppure Ravioli di brasato al burro e salvia [1, 3, 7, 9, 12]',
    'Filetto lardellato con purè di patate [7] oppure Petto d’anatra all’arancia con patate al forno [7, 12]',
    'Panettone caldo con crema al mascarpone [1, 3, 7] + Cotechino con lenticchie [9]',
  ],
  churchFaqs: [
    ['Come si entra al Church 81 con QR code e parola d’ordine?', 'Alla conferma via WhatsApp +39 351 912 7047 ricevi il tuo QR code nominale e la parola d’ordine segreta da mostrare in Via della Chiesa Rossa 81.'],
    ['Nello stesso tavolo si possono mescolare Pesce e Carne?', 'Sì, ogni ospite sceglie liberamente il Menù di Pesce o di Carne a 90 €, modificabile gratis fino al 28 dicembre.'],
    ['Cosa comprende esattamente la quota di 90 €?', 'La cena servita multi-portata, 1 calice di Prosecco Millesimato di benvenuto, panettone caldo con mascarpone, cotechino con lenticchie e la festa fino alle 04:00 (altre bevande escluse).'],
    ['C’è parcheggio davanti al Church 81 Milano?', 'Sì, il locale dispone di ampio parcheggio gratuito subito fuori dall’Area C e vicino a M2 Abbiategrasso.'],
  ],
  ffTitle: 'Capodanno 55 Milano 2027 · La Dolce Vita (Gala 160 €, Buffet 100 €, Club 30/40/50 €)',
  ffSub: `55 Milano · ${FF_ADDR} · 20:30 – 05:00 · Listino ufficiale 2027`,
  ffDesc:
    'Capodanno 2027 «La Dolce Vita» nello storico loft di 1.000 mq di 55 Milano in Via Piero della Francesca 55 (Sempione, dalle 20:30 alle 05:00): Cena di Gala Servita a 160 € (flûte, risotto Pozzi Riserva scampetti e porcini, filet mignon o branzino, 1 bottiglia di vino ogni 2 persone), Cenone a Buffet con seduta apparecchiata garantita a 100 € (1 drink + acqua ogni 2), Dopocena dalle 00:10 a 30 / 40 / 50 € con drink, Tavoli VIP 350 € (5 ingressi + 1 bottiglia) e Mantenimento tavolo cena 200 €. Prenotazioni dirette WhatsApp +39 351 912 7047 senza commissioni.',
  ffMusic: 'La Dolce Vita · Speciali live show per tutta la notte, Dinner Show & DJ Set fino alle 05:00',
  ffDress: 'Elegante / Smart Chic',
  ffPriceSum: 'Dopocena 00:10 30/40/50 € · Buffet 100 € · Gala 160 € · Tavoli 350 € · Mantenimento 200 €',
  ffTierAfterLabel: 'Ingresso Dopocena (dalle 00:10 · 1ª / 2ª / 3ª Release)',
  ffTierAfterPrice: '30 € / 40 € / 50 €',
  ffTierAfterDesc: 'Include 1 consumazione, speciali live show per tutta la notte e sorprese fino alle 05:00 (Prima Release 30 €, Seconda 40 €, Terza 50 €).',
  ffTierBuffetLabel: 'Cenone a Buffet con seduta apparecchiata (20:30)',
  ffTierBuffetPrice: '100 € a persona',
  ffTierBuffetDesc: 'Banco pesce crudo/cotto, salumi iberici e italiani, formaggi, risotti, cotechino e panettone con posto a sedere apparecchiato garantito, 1 drink e acqua ogni 2 ospiti.',
  ffTierGalaLabel: 'Cena di Gala Servita · La Dolce Vita (20:30)',
  ffTierGalaPrice: '160 € a persona',
  ffTierGalaDesc: 'Flûte di benvenuto, tris di antipasti, risotto scampetti e porcini, filet mignon o branzino agli agrumi, Tiramisù 55 Style, acqua e 1 bottiglia di vino ogni 2 ospiti.',
  ffTierVipLabel: 'Tavolo Serata VIP (dalle 00:10)',
  ffTierVipPrice: '350 € (fino a 5 ingressi)',
  ffTierVipDesc: 'Tavolo riservato dalle 00:10 con 5 ingressi omaggio e 1 bottiglia di distillato o champagne.',
  ffTierKeepLabel: 'Mantenimento Tavolo della Cena (post 00:30)',
  ffTierKeepPrice: '200 € costo bottiglie',
  ffTierKeepDesc: 'Proseguimento al proprio tavolo riservato durante tutta la festa con credito bottiglie da 200 €.',
  ffHighlights: [
    'Listino ufficiale La Dolce Vita 2027 confermato nel loft di 1.000 mq in Sempione (20:30 – 05:00)',
    'Buffet 100 € e Gala 160 € garantiscono entrambi il tavolo apparecchiato; il Gala include 1 vino ogni 2 ospiti',
    'Tre fasce ingresso dopocena dalle 00:10 (30 / 40 / 50 € con drink) e tavoli notte da 350 €',
    'Prenotazione diretta esclusivamente via WhatsApp Concierge +39 351 912 7047 (zero commissioni)',
  ],
  ffSource:
    'Listino ufficiale La Dolce Vita Capodanno 2027 al 55 Milano (20:30–05:00: Gala 160 €, Buffet seduta apparecchiata 100 €, Dopocena 00:10 30/40/50 €, Tavoli 350 €, Mantenimento 200 €). Prenotazioni via WhatsApp +39 351 912 7047.',
  ffSteps: [
    '20:30 Apertura porte per Cena di Gala 160 € e Buffet apparecchiato 100 € con live show',
    '21:00 – 23:45 Intrattenimento dal vivo e sorprese firmate La Dolce Vita',
    '00:00 Countdown di mezzanotte nel salone di Via Piero della Francesca 55',
    '00:10 Apertura ingressi Dopocena (30 / 40 / 50 €) e Tavoli VIP da 350 €',
    '00:30 – 05:00 Live act speciali, DJ set e mantenimento tavolo cena (200 €)',
  ],
  ffGalaTitle: 'La Dolce Vita · Menù Cena di Gala Servita (160 €)',
  ffGalaSub: 'Servizio al tavolo dalle 20:30 · Acqua e 1 bottiglia di vino ogni 2 persone',
  ffGalaBev: 'Acqua e 1 bottiglia di vino (bianco, rosso o bollicine della selezione) ogni 2 persone incluse.',
  ffBuffetTitle: 'La Dolce Vita · Menù Cenone a Buffet (100 €)',
  ffBuffetSub: 'Seduta apparecchiata garantita dalle 20:30 · 1 drink e 1 bottiglia d’acqua ogni 2 persone',
  ffBuffetBev: 'Tavolo apparecchiato garantito, 1 drink e 1 bottiglia d’acqua ogni 2 persone inclusi.',
  ffGalaLabels: ['Benvenuto & Tris d’Antipasti', 'Primo & Secondo a scelta', 'Dolce'],
  ffGalaDishes: [
    'Flûte di benvenuto · Tartare di salmone con avocado e lime fresco · Sformatino ai funghi con crema al Parmigiano 24 mesi · Carpaccio di carne salada con ricotta sarda e mela verde',
    'Risotto «Pozzi Riserva» con scampetti e porcini · Filet mignon con demi-glace al Chianti e ratatouille oppure Filetto di branzino agli agrumi e patate al forno',
    'Tiramisù «55 Style»',
  ],
  ffBuffetLabels: ['Banco Pesce, Salumi e Formaggi', 'Piatti Caldi', 'Tradizione & Dolci'],
  ffBuffetDishes: [
    'Sashimi di salmone, tonno pinna gialla, ostriche, gamberoni in ghiaccio, insalata di piovra, salmone affumicato, capesante gratinate · Jamón ibérico, crudo 16 mesi, coppa, bresaola, mortadella IGP, speck · Burrata, stracciatella, bufala, pecorino, brie, asiago, taleggio e gorgonzola',
    'Risotto alla milanese e Calamarata ai frutti di mare · Gamberoni al sale dell’Himalaya, salmone BBQ, arrosto di manzo e polpetta fantasia 55 · Polenta e moscardini',
    'Zampone, cotechino, lenticchie e salamelle · Panettone e pandoro con crema pasticciera',
  ],
  ffFaqs: [
    ['Il Buffet da 100 € del 55 Milano garantisce il posto a sedere?', 'Sì, il Cenone a Buffet da 100 € include sempre la seduta apparecchiata garantita oltre al gran buffet completo, 1 drink e acqua ogni 2 ospiti.'],
    ['Come funzionano le tre release dopocena dalle 00:10?', 'Dalle 00:10 l’ingresso costa 30 € in 1ª Release, 40 € in 2ª Release e 50 € in 3ª Release, sempre con 1 drink incluso e show fino alle 05:00.'],
    ['Si può mantenere il tavolo della cena dopo la mezzanotte?', 'Sì, il mantenimento tavolo post 00:30 prevede 200 € di spesa bottiglie; i nuovi tavoli dopocena dalle 00:10 partono da 350 € (5 ingressi + 1 bottiglia).'],
    ['Come prenoto il Capodanno al 55 Milano?', 'Scrivi direttamente su WhatsApp +39 351 912 7047 per confermare posti e formula desiderata senza costi di prevendita online.'],
  ],
  scheduleHeading: 'Scaletta Ufficiale Capodanno 2027',
  menusHeading: 'Menù & Listino Ufficiale Capodanno 2027',
  conditionsHeading: 'Regole d’Ingresso & Logistica',
};

type MiniMeta = {
  nyeTitle: string;
  milano: string;
  dec31: string;
  perPerson: string;
  drinks: string;
  qrNote: string;
  parkNote: string;
  switchNote: string;
  fishMenu: string;
  meatMenu: string;
  afterLabel: string;
  afterNote: string;
  buffetNote: string;
  galaNote: string;
  vipNote: string;
  keepNote: string;
  scheduleHeading: string;
  menusHeading: string;
  conditionsHeading: string;
  sourcePrefix: string;
  waBook: string;
  dressCh: string;
  dressFf: string;
  courseLabels: [string, string, string, string, string];
  ffLabels: [string, string, string];
  churchSteps: [string, string, string, string];
  churchFishDishes: [string, string, string, string, string];
  churchMeatDishes: [string, string, string, string, string];
  churchFaqs: [[string, string], [string, string], [string, string], [string, string]];
  ffSteps: [string, string, string, string, string];
  ffGalaDishes: [string, string, string];
  ffBuffetDishes: [string, string, string];
  ffFaqs: [[string, string], [string, string], [string, string], [string, string]];
};

const TIER_A_META: Record<'es' | 'fr' | 'de' | 'pt' | 'nl' | 'ru' | 'tr' | 'zh' | 'ar', MiniMeta> = {
  es: {
    nyeTitle: 'Nochevieja 2027', milano: 'Milán', dec31: 'Jueves 31 de diciembre de 2026', perPerson: 'por persona',
    drinks: 'Copa de Prosecco Millesimato incluida [12]; resto de bebidas aparte.', qrNote: 'Acceso nominativo con código QR personal y contraseña secreta',
    parkNote: 'Amplio aparcamiento gratuito fuera de Area C (Metro M2 Abbiategrasso, Tranvía 3 y 15)',
    switchNote: 'Cambio gratuito entre menú de pescado o carne hasta el 28 de diciembre',
    fishMenu: 'Cena de Gala Eyes Wide Shut · Menú Pescado (90 €)', meatMenu: 'Cena de Gala Eyes Wide Shut · Menú Carne (90 €)',
    afterLabel: 'Entrada Club desde 00:10 (1ª / 2ª / 3ª Release)',
    afterNote: 'Entrada desde las 00:10 (30 € / 40 € / 50 €) con 1 copa y espectáculos en vivo hasta las 05:00',
    buffetNote: 'Buffet con mesa montada garantizada (20:30), 1 copa y agua cada 2 personas',
    galaNote: 'Cena de Gala servida (20:30): 3 entrantes, risotto Pozzi Riserva, solomillo o lubina y 1 vino cada 2 personas',
    vipNote: 'Mesa VIP nocturna (00:10+): hasta 5 pases y 1 botella incluida', keepNote: 'Mantenimiento de mesa tras la cena (00:30+) en botellas',
    scheduleHeading: 'Horario Oficial Nochevieja 2027', menusHeading: 'Menús Oficiales Nochevieja 2027', conditionsHeading: 'Acceso y Logística',
    sourcePrefix: 'Tarifas y menús oficiales confirmados 2027', waBook: 'Reservas directas por WhatsApp +39 351 912 7047 (sin comisiones).',
    dressCh: 'Eyes Wide Shut · Máscara y Etiqueta / Traje de Noche', dressFf: 'Elegante / Smart Chic',
    courseLabels: ['Bienvenida', 'Entrantes', 'Primer Plato (a elegir)', 'Segundo Plato (a elegir)', 'Postre y Tradición'],
    ffLabels: ['Pescados, Ibéricos y Quesos', 'Platos Calientes', 'Tradición y Postres'],
    churchSteps: [
      '20:30 Apertura con control de QR personal y contraseña secreta más copa de Prosecco Millesimato',
      '21:00 Cena de Gala servida Eyes Wide Shut bajo las bóvedas de la iglesia desconsagrada',
      '00:00 Campanadas de medianoche y cotechino con lentejas',
      '00:30 – 04:00 Fiesta de máscaras Eyes Wide Shut y DJ set',
    ],
    churchFishDishes: [
      'Copa de bienvenida de Prosecco Millesimato [12]',
      'Trío de Mar: Carpaccio de pez espada ahumado con hinojo y naranja [4]; Tartar de atún con lima y sésamo [4, 11]; Croqueta de bacalao con mayonesa al limón [1, 3, 4, 7]',
      'Paccheri con ragú marinero [1, 2, 4, 9, 12, 14] o Risotto al limón con gambas y calabacín [2, 7, 9, 12]',
      'Lomo de salmón al horno con patatas doradas [4] o Filete de lubina con tomates confitados y achicoria [4]',
      'Panettone templado con crema de mascarpone [1, 3, 7] + Cotechino con lentejas [9]',
    ],
    churchMeatDishes: [
      'Copa de bienvenida de Prosecco Millesimato [12]',
      'Trío de Tartar de Carne (Fassona, Chianina y Angus) con salsa verde, mayonesa picante y miel [1, 3, 4, 10]',
      'Pappardelle con ragú de ternera a fuego lento [1, 3, 7, 9, 12] o Raviolis de estofado a la mantequilla y salvia [1, 3, 7, 9, 12]',
      'Solomillo albardado con puré de patatas [7] o Magret de pato a la naranja con patatas al horno [7, 12]',
      'Panettone templado con crema de mascarpone [1, 3, 7] + Cotechino con lentejas [9]',
    ],
    churchFaqs: [
      ['¿Cómo funciona la entrada con código QR y contraseña secreta?', 'Tras confirmar por WhatsApp +39 351 912 7047 recibirás tu código QR personal y la contraseña secreta para Via della Chiesa Rossa 81.'],
      ['¿Se puede combinar menú de pescado y de carne en la misma mesa?', 'Sí, cada comensal elige pescado o carne por 90 € y puede cambiar gratis hasta el 28 de diciembre.'],
      ['¿Qué incluye el precio de 90 € en Church 81?', 'Incluye la cena completa sentada, copa de Prosecco de bienvenida, panettone, cotechino con lentejas y fiesta hasta las 04:00 (otras bebidas aparte).'],
      ['¿Hay parking disponible?', 'Sí, amplio parking gratuito propio justo frente al local, fuera de Area C.'],
    ],
    ffSteps: [
      '20:30 Apertura para Cena de Gala (160 €) y Buffet con mesa garantizada (100 €)',
      '21:00 – 23:45 Espectáculos en vivo La Dolce Vita y sorpresas durante la cena',
      '00:00 Cuenta atrás de medianoche y brindis en el loft de 1.000 m²',
      '00:10 Entradas de discoteca (30 / 40 / 50 €) y mesas VIP (350 €)',
      '00:30 – 05:00 Sesión DJ, shows especiales y mantenimiento de mesa (200 €)',
    ],
    ffGalaDishes: [
      'Copa de bienvenida · Tartar de salmón con aguacate y lima · Flan de setas con crema de Parmigiano 24M · Carpaccio de carne salada con ricotta sarda y manzana verde',
      'Risotto Pozzi Riserva con cigalas y boletus · Solomillo filet mignon al Chianti con ratatouille o Filete de lubina a los cítricos con patatas',
      'Tiramisú «55 Style»',
    ],
    ffBuffetDishes: [
      'Sashimi de salmón, atún, ostras, langostinos, pulpo, vieiras gratinadas · Jamón ibérico, jamón 16M, bresaola, mortadela IGP, speck · Burrata, stracciatella, búfala, pecorino y gorgonzola',
      'Risotto a la milanesa y calamarata marinera · Langostinos a la sal del Himalaya, salmón BBQ, rosbif y albóndigas 55 · Polenta y pulpitos',
      'Zampone, cotechino, lentejas y salchichas · Panettone y pandoro con crema pastelera',
    ],
    ffFaqs: [
      ['¿El Buffet de 100 € del 55 Milano garantiza asiento?', 'Sí, la tarifa de 100 € incluye siempre mesa montada garantizada, gran buffet, 1 copa y agua cada 2 personas.'],
      ['¿Cuáles son las tarifas de discoteca desde las 00:10?', 'Tres tandas oficiales con 1 copa incluida: 30 € (1ª Release), 40 € (2ª Release) y 50 € (3ª Release), hasta las 05:00.'],
      ['¿Puedo conservar la mesa de la cena después de medianoche?', 'Sí, mediante mantenimiento de mesa por 200 € en botellas tras las 00:30; mesas nuevas desde las 00:10 a 350 € (5 personas + 1 botella).'],
      ['¿Cómo reservo 55 Milano sin recargos?', 'Directamente por WhatsApp +39 351 912 7047 para confirmar disponibilidad sin gastos de gestión.'],
    ],
  },
  fr: {
    nyeTitle: 'Nouvel An 2027', milano: 'Milan', dec31: 'Jeudi 31 décembre 2026', perPerson: 'par personne',
    drinks: 'Coupe de Prosecco Millesimato d’accueil incluse [12] ; autres boissons en supplément.', qrNote: 'Entrée nominative sur QR code personnel et mot de passe secret',
    parkNote: 'Grand parking gratuit hors zone Area C (Métro M2 Abbiategrasso, Tram 3 et 15)',
    switchNote: 'Changement gratuit entre menu poisson ou viande jusqu’au 28 décembre',
    fishMenu: 'Dîner de Gala Eyes Wide Shut · Menu Poisson (90 €)', meatMenu: 'Dîner de Gala Eyes Wide Shut · Menu Viande (90 €)',
    afterLabel: 'Entrée Club dès 00h10 (Vagues 1 / 2 / 3)',
    afterNote: 'Entrée dès 00h10 (30 € / 40 € / 50 €) avec 1 verre et spectacles jusqu’à 05h00',
    buffetNote: 'Buffet avec place assise dressée garantie (20h30), 1 verre et eau pour 2 personnes',
    galaNote: 'Dîner de Gala servi (20h30) : trio d’entrées, risotto scampi/cèpes, filet ou bar, 1 vin pour 2 personnes',
    vipNote: 'Table VIP nuit (dès 00h10) : jusqu’à 5 entrées et 1 bouteille incluse', keepNote: 'Prolongation table du dîner (00h30+) en bouteilles',
    scheduleHeading: 'Programme Officiel Nouvel An 2027', menusHeading: 'Menus Officiels Nouvel An 2027', conditionsHeading: 'Accès et Logistique',
    sourcePrefix: 'Tarifs et menus officiels confirmés 2027', waBook: 'Réservations directes WhatsApp +39 351 912 7047 (zéro frais d’agence).',
    dressCh: 'Eyes Wide Shut · Masque et Tenue de Soirée', dressFf: 'Élégant / Smart Chic',
    courseLabels: ['Accueil', 'Entrées', 'Premier Plat (au choix)', 'Plat Principal (au choix)', 'Dessert et Tradition'],
    ffLabels: ['Poissons, Charcuteries & Fromages', 'Plats Chauds', 'Tradition & Desserts'],
    churchSteps: [
      '20h30 Accueil avec contrôle QR code et mot de passe secret + coupe de Prosecco Millesimato',
      '21h00 Dîner de Gala assis Eyes Wide Shut sous les voûtes de l’église désacralisée',
      '00h00 Décompte de minuit et cotechino aux lentilles',
      '00h30 – 04h00 Soirée masquée Eyes Wide Shut & DJ set',
    ],
    churchFishDishes: [
      'Coupe de Prosecco Millesimato d’accueil [12]',
      'Trio de la Mer : Carpaccio d’espadon fumé fenouil et orange [4] ; Tartare de thon citron vert et sésame [4, 11] ; Croquette de morue mayo citron [1, 3, 4, 7]',
      'Paccheri au ragoût de la mer [1, 2, 4, 9, 12, 14] ou Risotto au citron, gambas et courgettes [2, 7, 9, 12]',
      'Pavé de saumon rôti aux pommes dorées [4] ou Filet de bar aux tomates confites et chicorée [4]',
      'Panettone chaud crème mascarpone [1, 3, 7] + Cotechino aux lentilles [9]',
    ],
    churchMeatDishes: [
      'Coupe de Prosecco Millesimato d’accueil [12]',
      'Trio de Tartares (Fassona, Chianina, Angus) sauce verte, mayo épicée et sauce au miel [1, 3, 4, 10]',
      'Pappardelles ragoût de bœuf mijoté [1, 3, 7, 9, 12] ou Raviolis de bœuf braisé beurre et sauge [1, 3, 7, 9, 12]',
      'Filet de bœuf bardé et purée maison [7] ou Magret de canard à l’orange et pommes rôties [7, 12]',
      'Panettone chaud crème mascarpone [1, 3, 7] + Cotechino aux lentilles [9]',
    ],
    churchFaqs: [
      ['Comment fonctionne l’accès par QR code et mot de passe secret ?', 'Après confirmation via WhatsApp +39 351 912 7047, vous recevez votre QR code personnel et le mot de passe secret demandés à l’entrée.'],
      ['Peut-on choisir Poisson et Viande à la même table ?', 'Oui, chaque invité choisit son menu à 90 € avec changement gratuit possible jusqu’au 28 décembre.'],
      ['Que comprend le tarif unique de 90 € ?', 'Le dîner assis complet, la coupe d’accueil Prosecco Millesimato, le panettone chaud, le cotechino aux lentilles et le club jusqu’à 04h00 (autres boissons en sus).'],
      ['Y a-t-il un parking gratuit au Church 81 ?', 'Oui, un grand parking gratuit jouxte l’église Via della Chiesa Rossa 81 hors zone ZTL/Area C.'],
    ],
    ffSteps: [
      '20h30 Ouverture pour le Dîner de Gala (160 €) et le Buffet table dressée (100 €)',
      '21h00 – 23h45 Spectacles live La Dolce Vita et animations surprises',
      '00h00 Compte à rebours de minuit dans le loft de 1 000 m² à Sempione',
      '00h10 Ouverture club (30 / 40 / 50 €) et Tables VIP à 350 €',
      '00h30 – 05h00 DJ set, shows nocturnes et prolongation table dîner (200 €)',
    ],
    ffGalaDishes: [
      'Flûte d’accueil · Tartare de saumon avocat citron vert · Flan aux champignons crème Parmigiano 24 mois · Carpaccio carne salada ricotta sarde et pomme verte',
      'Risotto Pozzi Riserva langoustines et cèpes · Filet mignon sauce Chianti et ratatouille ou Filet de bar aux agrumes et pommes rôties',
      'Tiramisu « 55 Style »',
    ],
    ffBuffetDishes: [
      'Sashimi saumon, thon, huîtres, gambas, salade poulpe, Saint-Jacques gratinées · Jamón ibérico, jambon 16 mois, bresaola, mortadelle IGP, speck · Burrata, stracciatella, bufala, pecorino, gorgonzola',
      'Risotto à la milanaise et calamarata fruits de mer · Gambas au sel de l’Himalaya, saumon BBQ, rôti de bœuf et boulettes 55 · Polenta et supions',
      'Zampone, cotechino, lentilles et saucisses · Panettone et pandoro crème pâtissière',
    ],
    ffFaqs: [
      ['Le Buffet à 100 € garantit-il une table assise au 55 Milano ?', 'Oui, chaque billet Buffet à 100 € inclut une place assise dressée garantie, 1 verre et 1 bouteille d’eau pour 2 personnes.'],
      ['Quels sont les tarifs après minuit dès 00h10 ?', 'Trois vagues officielles avec 1 verre inclus : 30 € (1re vague), 40 € (2e vague) et 50 € (3e vague) jusqu’à 05h00.'],
      ['Peut-on garder sa table du dîner après 00h30 ?', 'Oui pour 200 € en crédit bouteilles ; de nouvelles tables nuit dès 00h10 sont à 350 € (5 accès + 1 bouteille).'],
      ['Comment réserver sans frais d’agence ?', 'Directement sur WhatsApp +39 351 912 7047 pour bloquer vos places sans commission.'],
    ],
  },
  de: {
    nyeTitle: 'Silvester 2027', milano: 'Mailand', dec31: 'Donnerstag, 31. Dezember 2026', perPerson: 'pro Person',
    drinks: 'Begrüßungsglas Prosecco Millesimato inklusive [12]; weitere Getränke exklusiv.', qrNote: 'Einlass nur mit persönlichem QR-Code und geheimem Passwort',
    parkNote: 'Großer kostenloser Parkplatz außerhalb der Area C (M2 Abbiategrasso, Tram 3 & 15)',
    switchNote: 'Kostenloser Wechsel zwischen Fisch- und Fleischmenü bis 28. Dezember',
    fishMenu: 'Eyes Wide Shut Galadinner · Fischmenü (90 €)', meatMenu: 'Eyes Wide Shut Galadinner · Fleischmenü (90 €)',
    afterLabel: 'Club-Einlass ab 00:10 Uhr (Release 1 / 2 / 3)',
    afterNote: 'Einlass ab 00:10 Uhr (30 € / 40 € / 50 €) inkl. 1 Drink und Live-Shows bis 05:00 Uhr',
    buffetNote: 'Buffet mit garantiert eingedecktem Sitzplatz (20:30), 1 Drink und Wasser pro 2 Personen',
    galaNote: 'Serviertes Galadinner (20:30): Vorspeisen-Trio, Scampi-Steinpilz-Risotto, Filet oder Wolfsbarsch & 1 Flasche Wein pro 2 Gäste',
    vipNote: 'VIP-Nachttisch (ab 00:10): bis zu 5 Personen + 1 Flasche inklusive', keepNote: 'Tischbeibehaltung nach 00:30 Uhr als Flaschenguthaben',
    scheduleHeading: 'Offizieller Ablauf Silvester 2027', menusHeading: 'Offizielle Silvester-Menüs 2027', conditionsHeading: 'Einlass & Anfahrt',
    sourcePrefix: 'Offiziell bestätigte Silvesterpreise und Menüs 2027', waBook: 'Direktbuchung per WhatsApp +39 351 912 7047 (ohne Vorverkaufsgebühr).',
    dressCh: 'Eyes Wide Shut · Maske & Abendgarderobe', dressFf: 'Elegant / Smart Chic',
    courseLabels: ['Empfang', 'Vorspeisen', 'Zwischengang (Wahl)', 'Hauptgang (Wahl)', 'Dessert & Tradition'],
    ffLabels: ['Fischtheke, Aufschnitt & Käse', 'Warme Gerichte', 'Tradition & Dessert'],
    churchSteps: [
      '20:30 Einlass mit persönlichem QR-Code & Passwort sowie Begrüßungsglas Prosecco Millesimato',
      '21:00 Serviertes Eyes Wide Shut Galadinner unter den Backsteingewölben',
      '00:00 Mitternachts-Countdown mit Cotechino & Linsen',
      '00:30 – 04:00 Eyes Wide Shut Maskenball & DJ-Set',
    ],
    churchFishDishes: [
      'Begrüßungsglas Prosecco Millesimato [12]',
      'Meeres-Trio: Geräuchertes Schwertfisch-Carpaccio mit Fenchel & Orange [4]; Thunfisch-Tatar mit Limette & Sesam [4, 11]; Kabeljau-Krokette mit Zitronenmayonnaise [1, 3, 4, 7]',
      'Paccheri mit Meeresfrüchte-Ragout [1, 2, 4, 9, 12, 14] oder Zitronen-Risotto mit Garnelen & Zucchini [2, 7, 9, 12]',
      'Gebackenes Lachsfilet mit Röstkartoffeln [4] oder Wolfsbarschfilet mit Kirschtomaten & Puntarelle [4]',
      'Warmer Panettone mit Mascarpone-Creme [1, 3, 7] + Cotechino mit Linsen [9]',
    ],
    churchMeatDishes: [
      'Begrüßungsglas Prosecco Millesimato [12]',
      'Dreierlei Rindertatar (Fassona, Chianina & Angus) mit Salsa Verde, pikanter Mayo & Honigglasur [1, 3, 4, 10]',
      'Pappardelle mit geschmortem Rinderragout [1, 3, 7, 9, 12] oder Rinder-Ravioli mit Butter & Salbei [1, 3, 7, 9, 12]',
      'Gespicktes Rinderfilet mit Kartoffelpüree [7] oder Orangen-Entenbrust mit Ofenkartoffeln [7, 12]',
      'Warmer Panettone mit Mascarpone-Creme [1, 3, 7] + Cotechino mit Linsen [9]',
    ],
    churchFaqs: [
      ['Wie funktioniert der Einlass mit QR-Code und geheimem Passwort?', 'Nach Buchungsbestätigung über WhatsApp +39 351 912 7047 erhalten Sie Ihren persönlichen QR-Code sowie das Passwort für die Tür in der Via della Chiesa Rossa 81.'],
      ['Können Gäste am selben Tisch Fisch und Fleisch kombinieren?', 'Ja, jeder Gast wählt frei Fisch oder Fleisch für 90 €, kostenlos umbuchbar bis 28. Dezember.'],
      ['Was ist in den 90 € enthalten?', 'Das mehrgängige Galadinner, 1 Begrüßungsglas Prosecco Millesimato, warmer Panettone, Mitternachts-Cotechino mit Linsen und Party bis 04:00 Uhr (weitere Getränke extra).'],
      ['Gibt es kostenlose Parkplätze am Church 81?', 'Ja, direkt an der entweihten Kirche steht ein großer kostenloser Parkplatz außerhalb der Area C zur Verfügung.'],
    ],
    ffSteps: [
      '20:30 Einlass für Galadinner (160 €) und Buffet mit eingedecktem Sitzplatz (100 €)',
      '21:00 – 23:45 Live-Shows La Dolce Vita & Dinner-Überraschungen',
      '00:00 Mitternachts-Countdown im 1.000-m²-Loft in Sempione',
      '00:10 Club-Einlass (30 / 40 / 50 €) & VIP-Tische ab 350 €',
      '00:30 – 05:00 DJ-Sets, Live-Acts & Tischverlängerung (200 €)',
    ],
    ffGalaDishes: [
      'Begrüßungssekt · Lachstatar mit Avocado & Limette · Pilztörtchen mit Parmigiano 24M · Carne-Salada-Carpaccio mit sardischem Ricotta',
      'Risotto Pozzi Riserva mit Scampi & Steinpilzen · Rinder-Filet-Mignon (Chianti-Demi-Glace) oder Zitrus-Wolfsbarsch mit Ofenkartoffeln',
      'Tiramisu „55 Style“',
    ],
    ffBuffetDishes: [
      'Lachs-Sashimi, Thunfisch, Austern, Garnelen, Oktopussalat, Jakobsmuscheln · Jamón Ibérico, Rohschinken 16M, Bresaola, Mortadella IGP, Speck · Burrata, Stracciatella, Büffelmozzarella, Pecorino, Gorgonzola',
      'Risotto alla Milanese & Meeresfrüchte-Calamarata · Himalaya-Salz-Garnelen, BBQ-Lachs, Rinderbraten & 55-Klößchen · Polenta',
      'Zampone, Cotechino, Linsen & Salsicce · Panettone & Pandoro mit Vanillecreme',
    ],
    ffFaqs: [
      ['Garantiert das 100-€-Buffet im 55 Milano einen Sitzplatz?', 'Ja, im 100-€-Buffet ist immer ein fest eingedeckter Sitzplatz samt 1 Drink und Wasser pro 2 Personen inbegriffen.'],
      ['Wie gelten die Club-Preise ab 00:10 Uhr?', 'Drei Release-Stufen inklusive 1 Drink: 30 € (1. Release), 40 € (2. Release) und 50 € (3. Release) bis 05:00 Uhr.'],
      ['Kann man den Dinnertisch nach 00:30 Uhr behalten?', 'Ja, die Tischverlängerung nach dem Essen kostet 200 € Flaschenguthaben; neue Nachttische ab 00:10 kosten 350 € (5 Personen + 1 Flasche).'],
      ['Wie buche ich ohne Vorverkaufsgebühr?', 'Direkt per WhatsApp an +39 351 912 7047 schreiben und ohne Online-Gebühren reservieren.'],
    ],
  },
  pt: {
    nyeTitle: 'Réveillon 2027', milano: 'Milão', dec31: 'Quinta-feira, 31 de dezembro de 2026', perPerson: 'por pessoa',
    drinks: 'Taça de Prosecco Millesimato incluída [12]; restantes bebidas à parte.', qrNote: 'Entrada nominal com QR Code pessoal e senha secreta',
    parkNote: 'Estacionamento amplo e gratuito fora da Area C (Metro M2 Abbiategrasso)',
    switchNote: 'Troca gratuita entre menu de peixe ou carne até 28 de dezembro',
    fishMenu: 'Jantar de Gala Eyes Wide Shut · Menu Peixe (90 €)', meatMenu: 'Jantar de Gala Eyes Wide Shut · Menu Carne (90 €)',
    afterLabel: 'Entrada Club após 00:10 (1ª / 2ª / 3ª Release)',
    afterNote: 'Entrada após 00:10 (30 € / 40 € / 50 €) com 1 drink e shows até as 05:00',
    buffetNote: 'Buffet com lugar à mesa garantido (20:30), 1 drink e água por 2 pessoas',
    galaNote: 'Jantar de Gala servido (20:30): entradas, risoto de lagostins e porcini, filé mignon ou robalo + 1 vinho por 2 pessoas',
    vipNote: 'Mesa VIP noite (00:10+): até 5 entradas + 1 garrafa incluída', keepNote: 'Manutenção de mesa pós-jantar (00:30+) em garrafas',
    scheduleHeading: 'Horário Oficial Réveillon 2027', menusHeading: 'Menus Oficiais Réveillon 2027', conditionsHeading: 'Acesso e Logística',
    sourcePrefix: 'Tarifas e menus oficiais confirmados 2027', waBook: 'Reserva direta via WhatsApp +39 351 912 7047 (sem taxas extras).',
    dressCh: 'Eyes Wide Shut · Máscara e Traje de Gala', dressFf: 'Elegante / Smart Chic',
    courseLabels: ['Boas-vindas', 'Entradas', 'Primeiro Prato (escolha)', 'Prato Principal (escolha)', 'Sobremesa e Tradição'],
    ffLabels: ['Peixes, Enchidos e Queijos', 'Pratos Quentes', 'Tradição e Sobremesas'],
    churchSteps: CORE_EN.churchSteps, churchFishDishes: CORE_EN.churchFishDishes, churchMeatDishes: CORE_EN.churchMeatDishes, churchFaqs: CORE_EN.churchFaqs,
    ffSteps: CORE_EN.ffSteps, ffGalaDishes: CORE_EN.ffGalaDishes, ffBuffetDishes: CORE_EN.ffBuffetDishes, ffFaqs: CORE_EN.ffFaqs,
  },
  nl: {
    nyeTitle: 'Oud & Nieuw 2027', milano: 'Milaan', dec31: 'Donderdag 31 december 2026', perPerson: 'per persoon',
    drinks: 'Welkomstglas Prosecco Millesimato inbegrepen [12]; overige drankjes exclusief.', qrNote: 'Toegang uitsluitend met persoonlijke QR-code en geheim wachtwoord',
    parkNote: 'Ruime gratis parkeergelegenheid buiten Area C (Metro M2 Abbiategrasso)',
    switchNote: 'Gratis wisselen tussen vis- en vleesmenu tot 28 december',
    fishMenu: 'Eyes Wide Shut Galadiner · Vismenu (90 €)', meatMenu: 'Eyes Wide Shut Galadiner · Vleesmenu (90 €)',
    afterLabel: 'Entree vanaf 00:10 (Release 1 / 2 / 3)',
    afterNote: 'Entree vanaf 00:10 (30 € / 40 € / 50 €) incl. 1 drankje en live shows tot 05:00',
    buffetNote: 'Buffet met gegarandeerd gedekte zitplaats (20:30), 1 drankje en water per 2 gasten',
    galaNote: 'Uitgeserveerd Galadiner (20:30): voorgerechtentrio, scampi-risotto, ossenhaas of zeebaars + 1 fles wijn per 2 gasten',
    vipNote: 'VIP-tafel (vanaf 00:10): tot 5 personen + 1 fles inbegrepen', keepNote: 'Behoud van dinertafel (na 00:30) als flesbesteding',
    scheduleHeading: 'Programma Oud & Nieuw 2027', menusHeading: 'Officiële Menu’s 2027', conditionsHeading: 'Toegang & Logistiek',
    sourcePrefix: 'Officieel bevestigde tarieven en menu’s 2027', waBook: 'Direct boeken via WhatsApp +39 351 912 7047 (zonder extra toeslag).',
    dressCh: 'Eyes Wide Shut · Masker & Avondkleding', dressFf: 'Elegant / Smart Chic',
    courseLabels: ['Welkom', 'Voorgerecht', 'Tussengerecht (keuze)', 'Hoofdgerecht (keuze)', 'Dessert & Traditie'],
    ffLabels: ['Vis, Charcuterie & Kaas', 'Warme Gerechten', 'Traditie & Desserts'],
    churchSteps: CORE_EN.churchSteps, churchFishDishes: CORE_EN.churchFishDishes, churchMeatDishes: CORE_EN.churchMeatDishes, churchFaqs: CORE_EN.churchFaqs,
    ffSteps: CORE_EN.ffSteps, ffGalaDishes: CORE_EN.ffGalaDishes, ffBuffetDishes: CORE_EN.ffBuffetDishes, ffFaqs: CORE_EN.ffFaqs,
  },
  ru: {
    nyeTitle: 'Новый год 2027', milano: 'Милан', dec31: 'Четверг, 31 декабря 2026', perPerson: 'за персону',
    drinks: 'Приветственный бокал Prosecco Millesimato включён [12]; остальные напитки отдельно.', qrNote: 'Вход строго по личному QR-коду и секретному паролю',
    parkNote: 'Большая бесплатная парковка за пределами Area C (метро M2 Abbiategrasso)',
    switchNote: 'Бесплатная замена рыбного и мясного меню до 28 декабря',
    fishMenu: 'Гала-ужин Eyes Wide Shut · Рыбное меню (90 €)', meatMenu: 'Гала-ужин Eyes Wide Shut · Мясное меню (90 €)',
    afterLabel: 'Ночной вход с 00:10 (Волны 1 / 2 / 3)',
    afterNote: 'Вход с 00:10 (30 € / 40 € / 50 €) с 1 напитком и живыми шоу до 05:00',
    buffetNote: 'Фуршет с гарантированным накрытым столом (20:30), 1 напиток и вода на двоих',
    galaNote: 'Гала-ужин с подачей (20:30): трио закусок, ризотто со скампи, филе-миньон или сибас и бутылка вина на двоих',
    vipNote: 'Ночной VIP-стол (с 00:10): до 5 гостей + 1 бутылка', keepNote: 'Продление стола после 00:30 (депозит на бутылки)',
    scheduleHeading: 'Расписание Нового года 2027', menusHeading: 'Официальное меню 2027', conditionsHeading: 'Вход и парковка',
    sourcePrefix: 'Подтверждённые тарифы и меню 2027', waBook: 'Бронь напрямую через WhatsApp +39 351 912 7047 (без комиссий).',
    dressCh: 'Eyes Wide Shut · Маска и вечерний дресс-код', dressFf: 'Элегантный / Smart Chic',
    courseLabels: ['Аперитив', 'Закуски', 'Первое блюдо (на выбор)', 'Горячее (на выбор)', 'Десерт и традиция'],
    ffLabels: ['Морепродукты, мясная гастрономия и сыры', 'Горячие блюда', 'Традиция и десерты'],
    churchSteps: CORE_EN.churchSteps, churchFishDishes: CORE_EN.churchFishDishes, churchMeatDishes: CORE_EN.churchMeatDishes, churchFaqs: CORE_EN.churchFaqs,
    ffSteps: CORE_EN.ffSteps, ffGalaDishes: CORE_EN.ffGalaDishes, ffBuffetDishes: CORE_EN.ffBuffetDishes, ffFaqs: CORE_EN.ffFaqs,
  },
  tr: {
    nyeTitle: 'Yılbaşı 2027', milano: 'Milano', dec31: '31 Aralık 2026 Perşembe', perPerson: 'kişi başı',
    drinks: 'Karşılama Prosecco Millesimato kadehi dahildir [12]; diğer içecekler hariçtir.', qrNote: 'Kişisel QR kod ve gizli şifre ile giriş',
    parkNote: 'Area C dışında geniş ücretsiz otopark (M2 Abbiategrasso, Tramvay 3 & 15)',
    switchNote: '28 Aralık tarihine kadar Balık ve Et menüleri arasında ücretsiz değişim',
    fishMenu: 'Eyes Wide Shut Gala Yemeği · Balık Menüsü (90 €)', meatMenu: 'Eyes Wide Shut Gala Yemeği · Et Menüsü (90 €)',
    afterLabel: '00:10 Sonrası Giriş (1. / 2. / 3. Dönem)',
    afterNote: '00:10 sonrası giriş (30 € / 40 € / 50 €): 1 içecek ve 05:00’e kadar canlı şovlar dahil',
    buffetNote: 'Garantili masalı açık büfe (20:30), 1 içecek ve 2 kişiye 1 şişe su',
    galaNote: 'Oturmalı Gala Yemeği (20:30): başlangıç üçlüsü, scampi risotto, bonfile veya levrek + 2 kişiye 1 şişe şarap',
    vipNote: 'Gece VIP Masası (00:10+): 5 girişe kadar + 1 şişe dahil', keepNote: '00:30 sonrası masa devamı (şişe bedeli)',
    scheduleHeading: 'Yılbaşı 2027 Akışı', menusHeading: 'Resmî Yılbaşı 2027 Menüleri', conditionsHeading: 'Giriş ve Ulaşım',
    sourcePrefix: 'Onaylı resmî 2027 fiyatları ve menüleri', waBook: 'WhatsApp +39 351 912 7047 üzerinden aracısız rezervasyon.',
    dressCh: 'Eyes Wide Shut · Maske ve Şık Gece Kıyafeti', dressFf: 'Şık / Smart Chic',
    courseLabels: ['Karşılama', 'Başlangıçlar', 'Birinci Tabak (Seçmeli)', 'Ana Yemek (Seçmeli)', 'Tatlı ve Gelenek'],
    ffLabels: ['Deniz Ürünleri, Şarküteri ve Peynir', 'Sıcak Yemekler', 'Gelenek ve Tatlılar'],
    churchSteps: CORE_EN.churchSteps, churchFishDishes: CORE_EN.churchFishDishes, churchMeatDishes: CORE_EN.churchMeatDishes, churchFaqs: CORE_EN.churchFaqs,
    ffSteps: CORE_EN.ffSteps, ffGalaDishes: CORE_EN.ffGalaDishes, ffBuffetDishes: CORE_EN.ffBuffetDishes, ffFaqs: CORE_EN.ffFaqs,
  },
  zh: {
    nyeTitle: '2027 跨年夜', milano: '米兰', dec31: '2026年12月31日 星期四', perPerson: '每位',
    drinks: '含迎宾 Prosecco Millesimato 起泡酒一杯 [12]；其他饮品另计。', qrNote: '凭个人专属二维码与秘密口令入场',
    parkNote: 'Area C 限行区外免费大型停车场（地铁 M2 Abbiategrasso）',
    switchNote: '12月28日前可免费在海鲜或肉类套餐之间切换',
    fishMenu: 'Eyes Wide Shut 跨年晚宴 · 海鲜套餐 (90 €)', meatMenu: 'Eyes Wide Shut 跨年晚宴 · 肉类套餐 (90 €)',
    afterLabel: '00:10 起夜场入场（第一/二/三阶段）',
    afterNote: '00:10 起夜场门票（30 € / 40 € / 50 € 含1杯饮品，狂欢至05:00）',
    buffetNote: '有座自助跨年晚宴（20:30），保证独立餐桌座位，含1杯饮品及每两人1瓶矿泉水',
    galaNote: '主桌礼服晚宴（20:30）：三道前菜、小龙虾牛肝菌烩饭、牛排或海鲈鱼，每两人配1瓶葡萄酒',
    vipNote: '夜场 VIP 卡座（00:10起）：最多5人入场含1瓶烈酒或香槟', keepNote: '00:30 后保留餐桌（抵酒水消费）',
    scheduleHeading: '2027 跨年官方日程', menusHeading: '2027 跨年官方菜单', conditionsHeading: '入场要求与交通',
    sourcePrefix: '2027 官方确认价目与菜单', waBook: '添加 WhatsApp +39 351 912 7047 直订，零平台手续费。',
    dressCh: 'Eyes Wide Shut · 面具与正式晚装', dressFf: '优雅晚装 / Smart Chic',
    courseLabels: ['迎宾酒', '头盘前菜', '第一道（二选一）', '主菜（二选一）', '甜品与传统'],
    ffLabels: ['海鲜、火腿及芝士台', '热菜精选', '新年传统与甜品'],
    churchSteps: CORE_EN.churchSteps, churchFishDishes: CORE_EN.churchFishDishes, churchMeatDishes: CORE_EN.churchMeatDishes, churchFaqs: CORE_EN.churchFaqs,
    ffSteps: CORE_EN.ffSteps, ffGalaDishes: CORE_EN.ffGalaDishes, ffBuffetDishes: CORE_EN.ffBuffetDishes, ffFaqs: CORE_EN.ffFaqs,
  },
  ar: {
    nyeTitle: 'رأس السنة 2027', milano: 'ميلانو', dec31: 'الخميس 31 ديسمبر 2026', perPerson: 'للشخص',
    drinks: 'يشمل كأس ترحيب Prosecco Millesimato [12]؛ المشروبات الأخرى غير مشمولة.', qrNote: 'الدخول برمز QR شخصي وكلمة مرور سرية',
    parkNote: 'موقف سيارات مجاني واسع خارج نطاق Area C (مترو M2 Abbiategrasso)',
    switchNote: 'تبديل مجاني بين قائمة الأسماك واللحوم حتى 28 ديسمبر',
    fishMenu: 'عشاء غالا Eyes Wide Shut · قائمة المأكولات البحرية (90 €)', meatMenu: 'عشاء غالا Eyes Wide Shut · قائمة اللحوم (90 €)',
    afterLabel: 'دخول السهرة من 00:10 (الدفعات 1 / 2 / 3)',
    afterNote: 'دخول بعد منتصف الليل من 00:10 (30 € / 40 € / 50 €) مع مشروب واحد وعروض حية حتى 05:00',
    buffetNote: 'بوفيه العشاء مع طاولة محجوزة ومجهزة (20:30)، مشروب واحد وزجاجة ماء لكل شخصين',
    galaNote: 'عشاء غالا الرسمي (20:30): مقبلات، ريزوتو بالروبيان والفطر، فيليه لحم أو قاروص وزجاجة نبيذ لكل شخصين',
    vipNote: 'طاولة VIP ليلية (من 00:10): حتى 5 أشخاص + زجاجة واحدة', keepNote: 'الاحتفاظ بطاولة العشاء بعد 00:30 كرصيد مشروبات',
    scheduleHeading: 'البرنامج الرسمي لرأس السنة 2027', menusHeading: 'القوائم الرسمية لرأس السنة 2027', conditionsHeading: 'شروط الدخول والمواقف',
    sourcePrefix: 'الأسعار والقوائم الرسمية المؤكدة لعام 2027', waBook: 'حجز مباشر عبر واتساب +39 351 912 7047 دون رسوم إضافية.',
    dressCh: 'Eyes Wide Shut · قناع وأزياء سهرة أنيقة', dressFf: 'أنيق / Smart Chic',
    courseLabels: ['ترحيب', 'المقبلات', 'الطبق الأول (اختيار)', 'الطبق الرئيسي (اختيار)', 'التحلية والتقليد'],
    ffLabels: ['ركن الأسماك واللحوم الباردة والأجبان', 'الأطباق الساخنة', 'الحلويات والتقاليد'],
    churchSteps: CORE_EN.churchSteps, churchFishDishes: CORE_EN.churchFishDishes, churchMeatDishes: CORE_EN.churchMeatDishes, churchFaqs: CORE_EN.churchFaqs,
    ffSteps: CORE_EN.ffSteps, ffGalaDishes: CORE_EN.ffGalaDishes, ffBuffetDishes: CORE_EN.ffBuffetDishes, ffFaqs: CORE_EN.ffFaqs,
  },
};

const EU_SEEDS: Record<
  Exclude<LocaleCode, 'en' | 'it' | 'es' | 'fr' | 'de' | 'pt' | 'nl' | 'ru' | 'tr' | 'zh' | 'ar'>,
  [string, string, string, string, string, string, string, string]
> = {
  bg: ['Нова година 2027', 'Милано', 'на човек', 'Официална програма и меню 2027', 'WhatsApp резервация без комисиона: +39 351 912 7047', 'Програма 2027', 'Официални менюта 2027', 'Достъп и паркинг'],
  hr: ['Doček Nove godine 2027', 'Milano', 'po osobi', 'Službeni cjenik i meni za 2027', 'Izravna rezervacija bez naknada: WhatsApp +39 351 912 7047', 'Raspored 2027', 'Službeni jelovnici 2027', 'Ulaz i parking'],
  cs: ['Silvestr 2027', 'Milán', 'za osobu', 'Potvrzený oficiální ceník a menu 2027', 'Přímá rezervace bez poplatků: WhatsApp +39 351 912 7047', 'Harmonogram 2027', 'Oficiální menu 2027', 'Vstup a parkování'],
  da: ['Nytår 2027', 'Milano', 'pr. person', 'Officielt bekræftede 2027-priser og menuer', 'Direkte booking uden gebyr: WhatsApp +39 351 912 7047', 'Program 2027', 'Officielle menuer 2027', 'Adgang & parkering'],
  et: ['Aastavahetus 2027', 'Milano', 'inimese kohta', 'Kinnitatud ametlikud 2027 hinnad ja menüüd', 'Otsebroneering lisatasudeta: WhatsApp +39 351 912 7047', 'Ajakava 2027', 'Ametlikud menüüd 2027', 'Sissepääs ja parkimine'],
  fi: ['Uusivuosi 2027', 'Milano', 'per henkilö', 'Vahvistetut viralliset 2027 hinnat ja menut', 'Suora varaus ilman kuluja: WhatsApp +39 351 912 7047', 'Aikataulu 2027', 'Viralliset menut 2027', 'Sisäänpääsy & pysäköinti'],
  el: ['Πρωτοχρονιά 2027', 'Μιλάνο', 'ανά άτομο', 'Επίσημα επιβεβαιωμένες τιμές & μενού 2027', 'Άμεση κράτηση χωρίς χρεώσεις: WhatsApp +39 351 912 7047', 'Πρόγραμμα 2027', 'Επίσημα Μενού 2027', 'Είσοδος & Πάρκινγκ'],
  hu: ['Szilveszter 2027', 'Milánó', 'fő', 'Hivatalosan megerősített 2027-es árak és menük', 'Közvetlen foglalás felár nélkül: WhatsApp +39 351 912 7047', 'Programterv 2027', 'Hivatalos menük 2027', 'Belépés és parkolás'],
  ga: ['Oíche Chinn Bliana 2027', 'Milano', 'an duine', 'Praghsanna agus biachláir oifigiúla 2027', 'Áirithint dhíreach gan táillí: WhatsApp +39 351 912 7047', 'Clár Oifigiúil 2027', 'Biachláir Oifigiúla 2027', 'Rochtain & Páirceáil'],
  lv: ['Jaungads 2027', 'Milāna', 'par personu', 'Apstiprinātās oficiālās 2027 cenas un ēdienkartes', 'Tiešā rezervācija bez maksas: WhatsApp +39 351 912 7047', 'Programma 2027', 'Oficiālās ēdienkartes 2027', 'Ieeja un autostāvvieta'],
  lt: ['Naujieji metai 2027', 'Milanas', 'asmeniui', 'Patvirtinti oficialūs 2027 kainoraščiai ir meniu', 'Tiesioginė rezervacija be mokesčių: WhatsApp +39 351 912 7047', 'Programa 2027', 'Oficialūs meniu 2027', 'Įėjimas ir parkavimas'],
  mt: ['Ewwel tas-Sena 2027', 'Milan', 'għal kull persuna', 'Prezzijiet u menus uffiċjali kkonfermati 2027', 'Riżervazzjoni diretta bla miżati: WhatsApp +39 351 912 7047', 'Skeda Uffiċjali 2027', 'Menus Uffiċjali 2027', 'Dħul u Parkeġġ'],
  pl: ['Sylwester 2027', 'Mediolan', 'za osobę', 'Oficjalnie potwierdzone ceny i menu 2027', 'Bezpośrednia rezerwacja bez prowizji: WhatsApp +39 351 912 7047', 'Harmonogram 2027', 'Oficjalne menu 2027', 'Wejście i parking'],
  ro: ['Revelion 2027', 'Milano', 'de persoană', 'Tarife și meniuri oficiale confirmate 2027', 'Rezervare directă fără comisioane: WhatsApp +39 351 912 7047', 'Program oficial 2027', 'Meniuri oficiale 2027', 'Acces și parcare'],
  sk: ['Silvester 2027', 'Miláno', 'na osobu', 'Oficiálne potvrdené ceny a menu 2027', 'Priama rezervácia bez poplatkov: WhatsApp +39 351 912 7047', 'Program 2027', 'Oficiálne menu 2027', 'Vstup a parkovanie'],
  sl: ['Silvestrovo 2027', 'Milano', 'na osebo', 'Uradno potrjeni ceniki in meniji 2027', 'Neposredna rezervacija brez provizij: WhatsApp +39 351 912 7047', 'Urnik 2027', 'Uradni meniji 2027', 'Vstop in parkiranje'],
  sv: ['Nyår 2027', 'Milano', 'per person', 'Officiellt bekräftade 2027-priser och menyer', 'Direktbokning utan avgifter: WhatsApp +39 351 912 7047', 'Schema 2027', 'Officiella menyer 2027', 'Entré & parkering'],
  no: ['Nyttårsaften 2027', 'Milano', 'per person', 'Offisielt bekreftede 2027-priser og menyer', 'Direkte bestilling uten gebyr: WhatsApp +39 351 912 7047', 'Tidsplan 2027', 'Offisielle menyer 2027', 'Inngang & parkering'],
  is: ['Áramót 2027', 'Mílanó', 'á mann', 'Staðfest opinber verðskrá og matseðill 2027', 'Bein bókun án aukagjalda: WhatsApp +39 351 912 7047', 'Dagskrá 2027', 'Opinber matseðill 2027', 'Aðgangur & bílastæði'],
  uk: ['Новий рік 2027', 'Мілан', 'з особи', 'Офіційно підтверджені тарифи та меню 2027', 'Пряме бронювання без комісій: WhatsApp +39 351 912 7047', 'Розклад 2027', 'Офіційне меню 2027', 'Вхід і паркування'],
  sq: ['Viti i Ri 2027', 'Milano', 'për person', 'Çmimet dhe menutë zyrtare të konfirmuara 2027', 'Rezervim direkt pa komision: WhatsApp +39 351 912 7047', 'Programi zyrtar 2027', 'Menutë zyrtare 2027', 'Hyrja & parkimi'],
  sr: ['Doček Nove godine 2027', 'Milano', 'po osobi', 'Zvanično potvrđene cene i meniji za 2027', 'Direktna rezervacija bez provizije: WhatsApp +39 351 912 7047', 'Raspored 2027', 'Zvanični meniji 2027', 'Ulaz i parking'],
  bs: ['Doček Nove godine 2027', 'Milano', 'po osobi', 'Zvanično potvrđene cijene i meniji 2027', 'Direktna rezervacija bez naknade: WhatsApp +39 351 912 7047', 'Raspored 2027', 'Zvanični jelovnici 2027', 'Ulaz i parking'],
  mk: ['Нова година 2027', 'Милано', 'по лице', 'Официјално потврдени цени и менија 2027', 'Директна резервација без провизија: WhatsApp +39 351 912 7047', 'Програма 2027', 'Официјални менија 2027', 'Влез и паркинг'],
};

function buildFromMini(code: Exclude<LocaleCode, 'en' | 'it'>, m: MiniMeta): Venue35Pack {
  return {
    ...CORE_EN,
    nyeTitle: m.nyeTitle,
    milano: m.milano,
    dec31: m.dec31,
    churchTitle: `${m.nyeTitle} Church 81 ${m.milano}: Eyes Wide Shut (90 € · QR & Password)`,
    churchSub: `Church 81 ${m.milano} · ${CHURCH81_ADDR} · 20:30 – 04:00 · 90 €`,
    churchDesc: `${m.sourcePrefix} · Church 81 ${m.milano} (${CHURCH81_ADDR}): 90 € ${m.perPerson}. ${m.qrNote}. ${m.switchNote}. ${m.parkNote}. ${m.waBook}`,
    churchDress: m.dressCh,
    churchPriceSum: `90 € ${m.perPerson} · ${m.qrNote}`,
    churchTierFishLabel: m.fishMenu,
    churchTierMeatLabel: m.meatMenu,
    churchTierPrice: `90 € ${m.perPerson}`,
    churchTierFishDesc: `${m.drinks} ${m.switchNote}.`,
    churchTierMeatDesc: `${m.drinks} ${m.switchNote}.`,
    churchHighlights: [
      `90 € ${m.perPerson} · Via della Chiesa Rossa 81 (${m.milano})`,
      m.switchNote,
      m.qrNote,
      m.parkNote,
    ],
    churchSource: `${m.sourcePrefix} · Church 81 ${m.milano} (90 €, 20:30–04:00). ${m.waBook}`,
    churchSteps: m.churchSteps,
    churchFishTitle: m.fishMenu,
    churchMeatTitle: m.meatMenu,
    churchFishBev: m.drinks,
    churchMeatBev: m.drinks,
    churchCoursesLabels: m.courseLabels,
    churchFishDishes: m.churchFishDishes,
    churchMeatDishes: m.churchMeatDishes,
    churchFaqs: m.churchFaqs,
    ffTitle: `${m.nyeTitle} 55 ${m.milano} · La Dolce Vita (160 € / 100 € / 30–50 €)`,
    ffSub: `55 ${m.milano} · ${FF_ADDR} · 20:30 – 05:00`,
    ffDesc: `${m.sourcePrefix} · 55 ${m.milano} (${FF_ADDR}, 20:30–05:00): Gala 160 € · Buffet 100 € · Club 00:10 30/40/50 € · VIP 350 € · Keep-Table 200 €. ${m.waBook}`,
    ffDress: m.dressFf,
    ffPriceSum: 'Club 00:10 30/40/50 € · Buffet 100 € · Gala 160 € · VIP 350 € · 200 €',
    ffTierAfterLabel: m.afterLabel,
    ffTierAfterPrice: '30 € / 40 € / 50 €',
    ffTierAfterDesc: m.afterNote,
    ffTierBuffetLabel: `Buffet 20:30 · ${m.milano}`,
    ffTierBuffetPrice: `100 € ${m.perPerson}`,
    ffTierBuffetDesc: m.buffetNote,
    ffTierGalaLabel: `La Dolce Vita Gala 20:30 · ${m.milano}`,
    ffTierGalaPrice: `160 € ${m.perPerson}`,
    ffTierGalaDesc: m.galaNote,
    ffTierVipLabel: `VIP 00:10+ · ${m.milano}`,
    ffTierVipPrice: '350 € (max 5)',
    ffTierVipDesc: m.vipNote,
    ffTierKeepLabel: `00:30+ Table Keep · ${code.toUpperCase()}`,
    ffTierKeepPrice: '200 €',
    ffTierKeepDesc: m.keepNote,
    ffHighlights: [
      `${m.sourcePrefix} · 55 ${m.milano} (20:30–05:00)`,
      m.buffetNote,
      m.galaNote,
      m.waBook,
    ],
    ffSource: `${m.sourcePrefix} · 55 ${m.milano} La Dolce Vita. ${m.waBook}`,
    ffSteps: m.ffSteps,
    ffGalaTitle: 'La Dolce Vita · Gala Menu (160 €)',
    ffGalaSub: `20:30 · ${m.galaNote}`,
    ffBuffetTitle: 'La Dolce Vita · Buffet Menu (100 €)',
    ffBuffetSub: `20:30 · ${m.buffetNote}`,
    ffGalaLabels: m.courseLabels.slice(0, 3) as [string, string, string],
    ffGalaDishes: m.ffGalaDishes,
    ffBuffetLabels: m.ffLabels,
    ffBuffetDishes: m.ffBuffetDishes,
    ffFaqs: m.ffFaqs,
    scheduleHeading: m.scheduleHeading,
    menusHeading: m.menusHeading,
    conditionsHeading: m.conditionsHeading,
  };
}

function getPack(locale: string): Venue35Pack {
  if (locale === 'it') return CORE_IT;
  if (locale === 'en') return CORE_EN;
  const code = locale as Exclude<LocaleCode, 'en' | 'it'>;
  if (code in TIER_A_META) {
    return buildFromMini(code, TIER_A_META[code as keyof typeof TIER_A_META]);
  }
  const eu = EU_SEEDS[code as keyof typeof EU_SEEDS];
  if (eu) {
    const [nyeTitle, milano, perPerson, sourcePrefix, waBook, schedH, menuH, condH] = eu;
    return buildFromMini(code, {
      nyeTitle,
      milano,
      dec31: '31/12/2026',
      perPerson,
      drinks: `${CORE_EN.churchFishBev}`,
      qrNote: `QR + Password (90 € ${perPerson})`,
      parkNote: `Church 81 · ${CHURCH81_ADDR}`,
      switchNote: '28/12 · Pesce / Carne 90 €',
      fishMenu: `Eyes Wide Shut · Pesce / Fish (90 € · ${milano})`,
      meatMenu: `Eyes Wide Shut · Carne / Meat (90 € · ${milano})`,
      afterLabel: `00:10+ Club (${nyeTitle})`,
      afterNote: `00:10+ · 30 / 40 / 50 € + 1 drink (20:30–05:00)`,
      buffetNote: `Buffet 100 € ${perPerson} · 1 drink + 20:30`,
      galaNote: `Gala 160 € ${perPerson} · 1 wine / 2 guests`,
      vipNote: `VIP 350 € (max 5 + 1 bottle)`,
      keepNote: `200 € (00:30+)`,
      scheduleHeading: schedH,
      menusHeading: menuH,
      conditionsHeading: condH,
      sourcePrefix,
      waBook,
      dressCh: CORE_EN.churchDress,
      dressFf: CORE_EN.ffDress,
      courseLabels: CORE_EN.churchCoursesLabels,
      ffLabels: CORE_EN.ffBuffetLabels,
      churchSteps: CORE_EN.churchSteps,
      churchFishDishes: CORE_EN.churchFishDishes,
      churchMeatDishes: CORE_EN.churchMeatDishes,
      churchFaqs: CORE_EN.churchFaqs,
      ffSteps: CORE_EN.ffSteps,
      ffGalaDishes: CORE_EN.ffGalaDishes,
      ffBuffetDishes: CORE_EN.ffBuffetDishes,
      ffFaqs: CORE_EN.ffFaqs,
    });
  }
  return CORE_EN;
}

export function getChurch81NyeContent(locale: string): CapodannoLocalizedEventContent {
  const p = getPack(locale);
  const tiers: CapodannoEventTier[] = [
    { label: p.churchTierFishLabel, price: p.churchTierPrice, details: p.churchTierFishDesc },
    { label: p.churchTierMeatLabel, price: p.churchTierPrice, details: p.churchTierMeatDesc },
  ];
  const schedule: CapodannoScheduleStep[] = ['20:30', '21:00', '00:00', '00:30 – 04:00'].map((time, idx) => ({
    time,
    label: p.churchSteps[idx].replace(/^\d{2}[:h]\d{2}(?:\s*[–-]\s*\d{2}[:h]\d{2})?\s*/, ''),
  }));
  const menus: CapodannoMenuCard[] = [
    {
      id: 'church-81-pesce-90',
      title: p.churchFishTitle,
      price: p.churchTierPrice,
      subtitle: `${CHURCH81_ADDR} · ${p.dec31}`,
      courses: p.churchCoursesLabels.map((course, idx) => ({ course, dish: p.churchFishDishes[idx] })),
      beverages: p.churchFishBev,
      imageSrc: CHURCH81_PESCE_IMG,
      imageAlt: p.churchFishTitle,
    },
    {
      id: 'church-81-carne-90',
      title: p.churchMeatTitle,
      price: p.churchTierPrice,
      subtitle: `${CHURCH81_ADDR} · ${p.dec31}`,
      courses: p.churchCoursesLabels.map((course, idx) => ({ course, dish: p.churchMeatDishes[idx] })),
      beverages: p.churchMeatBev,
      imageSrc: CHURCH81_CARNE_IMG,
      imageAlt: p.churchMeatTitle,
    },
  ];
  return {
    title: p.churchTitle,
    subtitle: p.churchSub,
    description: p.churchDesc,
    musicAndFormat: p.churchMusic,
    dressCode: p.churchDress,
    priceSummary: p.churchPriceSum,
    tiers,
    highlights: p.churchHighlights,
    sourceBasis: p.churchSource,
    scheduleHeading: p.scheduleHeading,
    schedule,
    menusHeading: p.menusHeading,
    menus,
    conditionsHeading: p.conditionsHeading,
    conditions: p.churchHighlights,
    offerPricesEur: [90],
    customFaqs: p.churchFaqs.map(([q, a]) => ({ q, a })),
  };
}

export function getFiftyFiveNyeContent(locale: string): CapodannoLocalizedEventContent {
  const p = getPack(locale);
  const tiers: CapodannoEventTier[] = [
    { label: p.ffTierGalaLabel, price: p.ffTierGalaPrice, details: p.ffTierGalaDesc },
    { label: p.ffTierBuffetLabel, price: p.ffTierBuffetPrice, details: p.ffTierBuffetDesc },
    { label: p.ffTierAfterLabel, price: p.ffTierAfterPrice, details: p.ffTierAfterDesc },
    { label: p.ffTierVipLabel, price: p.ffTierVipPrice, details: p.ffTierVipDesc },
    { label: p.ffTierKeepLabel, price: p.ffTierKeepPrice, details: p.ffTierKeepDesc },
  ];
  const schedule: CapodannoScheduleStep[] = ['20:30', '21:00', '00:00', '00:10', '00:30'].map((time, idx) => ({
    time,
    label: p.ffSteps[idx].replace(/^\d{2}[:h]\d{2}(?:\s*[–-]\s*\d{2}[:h]\d{2})?\s*/, ''),
  }));
  const menus: CapodannoMenuCard[] = [
    {
      id: '55-milano-gala-160',
      title: p.ffGalaTitle,
      price: p.ffTierGalaPrice,
      subtitle: p.ffGalaSub,
      courses: p.ffGalaLabels.map((course, idx) => ({ course, dish: p.ffGalaDishes[idx] })),
      beverages: p.ffGalaBev,
      imageSrc: FF_GALA_IMG,
      imageAlt: p.ffGalaTitle,
    },
    {
      id: '55-milano-buffet-100',
      title: p.ffBuffetTitle,
      price: p.ffTierBuffetPrice,
      subtitle: p.ffBuffetSub,
      courses: p.ffBuffetLabels.map((course, idx) => ({ course, dish: p.ffBuffetDishes[idx] })),
      beverages: p.ffBuffetBev,
      imageSrc: FF_BUFFET_IMG,
      imageAlt: p.ffBuffetTitle,
    },
  ];
  return {
    title: p.ffTitle,
    subtitle: p.ffSub,
    description: p.ffDesc,
    musicAndFormat: p.ffMusic,
    dressCode: p.ffDress,
    priceSummary: p.ffPriceSum,
    tiers,
    highlights: p.ffHighlights,
    sourceBasis: p.ffSource,
    scheduleHeading: p.scheduleHeading,
    schedule,
    menusHeading: p.menusHeading,
    menus,
    conditionsHeading: p.conditionsHeading,
    conditions: p.ffHighlights,
    offerPricesEur: [30, 40, 50, 100, 160, 200, 350],
    customFaqs: p.ffFaqs.map(([q, a]) => ({ q, a })),
  };
}
