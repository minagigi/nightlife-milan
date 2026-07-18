import {
  getBatchEventTemplateValues,
  getBatchLocalizedEventContent,
  interpolateEventBatchTemplate,
} from './eventBatchContent';
import { EVENT_BATCH_LOCALE_FALLBACKS } from './eventBatchLocaleFallbacks';
import { getEventBatchProfile, type EventBatchProfile } from './eventBatchProfiles';
import { getEventLocalePack } from './eventLocalePacks';
import { getEventbriteConfirmationPlainText } from './eventbriteConfirmation';
import type { LocaleCode } from './i18n/locales';
import type { LocalizedEventContent, LocalizedEventFaq } from './localizedEventContent';
import { worldCupFinalEn } from './worldCupFinalEn';
import { WORLD_CUP_FINAL_CANONICAL_SLUG, WORLD_CUP_FINAL_PHONE, worldCupFinalIt } from './worldCupFinalIt';
import { getWorldCupFinalLocaleCopy } from './worldCupFinalLocaleCopies';

function clamp(value: string, limit: number): string {
  const normalized = value.replace(/\s+/g, ' ').trim();
  if ([...normalized].length <= limit) return normalized;
  return `${[...normalized].slice(0, limit - 1).join('').replace(/[\s,;:.-]+$/u, '')}…`;
}
function searchQuestion(intent: string, locale: LocaleCode): string {
  const value = intent.trim();
  const body = `${value.charAt(0).toLocaleUpperCase(locale)}${value.slice(1).replace(/[?.!؟；;]+$/u, '')}`;
  if (locale === 'es') return `¿${body}?`;
  if (locale === 'fr') return `${body} ?`;
  if (locale === 'el') return `${body};`;
  if (locale === 'zh') return `${body}？`;
  if (locale === 'ar') return `${body}؟`;
  return `${body}?`;
}

interface WorldCupProgrammeCopy {
  afterFinalWhistle: string;
  untilClose: string;
  titles: readonly [string, string, string, string, string, string];
}

const WORLD_CUP_PROGRAMME_COPY: Partial<Record<LocaleCode, WorldCupProgrammeCopy>> = {
  es: {
    afterFinalWhistle: 'Después del pitido final', untilClose: 'Hasta las 05:00',
    titles: ['Apertura del jardín, check-in y asignación de mesas', 'Aperitivo, cócteles y previa en la pantalla gigante', 'Acomodación de invitados y última franja recomendada de llegada', 'España-Argentina en directo hasta el final, con prórroga y penaltis si fueran necesarios', 'Paso de la retransmisión a Uptown Nights', 'DJ set de house, hip-hop, éxitos, EDM y reguetón'],
  },
  fr: {
    afterFinalWhistle: 'Après le coup de sifflet final', untilClose: "Jusqu’à 05:00",
    titles: ['Ouverture du jardin, contrôle des réservations et attribution des tables', 'Apéritif, cocktails et avant-match sur écran géant', 'Installation des invités et dernière plage d’arrivée conseillée', 'Espagne-Argentine en direct jusqu’au terme, prolongation et tirs au but compris si nécessaire', 'Transition de la retransmission vers Uptown Nights', 'DJ set house, hip-hop, hits, EDM et reggaeton'],
  },
  de: {
    afterFinalWhistle: 'Nach dem Schlusspfiff', untilClose: 'Bis 05:00 Uhr',
    titles: ['Öffnung des Gartens, Check-in und Tischzuweisung', 'Aperitif, Cocktails und Vorberichterstattung auf der Großbildleinwand', 'Platzierung der Gäste und letztes empfohlenes Ankunftsfenster', 'Spanien gegen Argentinien live bis zum Ende, bei Bedarf einschließlich Verlängerung und Elfmeterschießen', 'Übergang von der Übertragung zu Uptown Nights', 'DJ-Set mit House, Hip-Hop, Hits, EDM und Reggaeton'],
  },
  pt: {
    afterFinalWhistle: 'Depois do apito final', untilClose: 'Até às 05:00',
    titles: ['Abertura do jardim, check-in e atribuição de mesas', 'Aperitivo, cocktails e antevisão no ecrã gigante', 'Acomodação dos convidados e última janela de chegada recomendada', 'Espanha-Argentina em direto até ao fim, incluindo prolongamento e penáltis se necessário', 'Transição da transmissão para a Uptown Nights', 'Sessão de DJ com house, hip-hop, êxitos, EDM e reggaeton'],
  },
  nl: {
    afterFinalWhistle: 'Na het laatste fluitsignaal', untilClose: 'Tot 05:00',
    titles: ['Opening van de tuin, check-in en tafeltoewijzing', 'Aperitief, cocktails en voorbeschouwing op het grote scherm', 'Plaatsing van gasten en laatste aanbevolen aankomstmoment', 'Spanje-Argentinië live tot het einde, zo nodig inclusief verlenging en strafschoppen', 'Overgang van de uitzending naar Uptown Nights', 'DJ-set met house, hiphop, hits, EDM en reggaeton'],
  },
  ru: {
    afterFinalWhistle: 'После финального свистка', untilClose: 'До 05:00',
    titles: ['Открытие сада, регистрация и распределение столиков', 'Аперитив, коктейли и предматчевая программа на большом экране', 'Рассадка гостей и последнее рекомендуемое время прибытия', 'Испания — Аргентина в прямом эфире до завершения, включая дополнительное время и пенальти при необходимости', 'Переход от трансляции к Uptown Nights', 'DJ-сет: house, hip-hop, hits, EDM и reggaeton'],
  },
  tr: {
    afterFinalWhistle: 'Final düdüğünden sonra', untilClose: '05:00’e kadar',
    titles: ['Bahçenin açılışı, giriş kontrolü ve masa yerleşimi', 'Aperitivo, kokteyller ve dev ekranda maç önü yayını', 'Konukların yerleşimi ve önerilen son varış aralığı', 'İspanya-Arjantin maçı sonuna kadar canlı; gerekirse uzatmalar ve penaltılar dâhil', 'Yayından Uptown Nights programına geçiş', 'House, hip-hop, hit, EDM ve reggaeton DJ seti'],
  },
  zh: {
    afterFinalWhistle: '终场哨响后', untilClose: '至05:00',
    titles: ['花园开放、签到与桌位安排', '餐前酒、鸡尾酒与大屏赛前节目', '宾客入座及建议最晚到场时段', '西班牙对阿根廷全程直播，如有需要包括加时赛和点球大战', '从赛事直播转入Uptown Nights', 'DJ时段：House、嘻哈、热门金曲、EDM与雷鬼顿'],
  },
  ar: {
    afterFinalWhistle: 'بعد صافرة النهاية', untilClose: 'حتى 05:00',
    titles: ['افتتاح الحديقة وتسجيل الوصول وتوزيع الطاولات', 'أبيريتيف وكوكتيلات وتغطية ما قبل المباراة على الشاشة الكبيرة', 'جلوس الحضور وآخر فترة وصول موصى بها', 'بث مباشر لإسبانيا والأرجنتين حتى النهاية، مع الوقت الإضافي وركلات الترجيح عند الحاجة', 'الانتقال من البث إلى Uptown Nights', 'جلسة DJ تشمل House وHip-Hop وHits وEDM وReggaeton'],
  },
  bg: {
    afterFinalWhistle: 'След последния съдийски сигнал', untilClose: 'До 05:00',
    titles: ['Отваряне на градината, регистрация и разпределяне на масите', 'Аперитив, коктейли и предмачова програма на големия екран', 'Настаняване на гостите и последен препоръчителен час за пристигане', 'Испания срещу Аржентина на живо до края, включително продължения и дузпи при нужда', 'Преминаване от излъчването към Uptown Nights', 'DJ сет с house, hip-hop, хитове, EDM и reggaeton'],
  },
  hr: {
    afterFinalWhistle: 'Nakon posljednjeg zvižduka', untilClose: 'Do 05:00',
    titles: ['Otvaranje vrta, prijava i dodjela stolova', 'Aperitiv, kokteli i najava utakmice na velikom ekranu', 'Smještaj gostiju i posljednji preporučeni termin dolaska', 'Španjolska protiv Argentine uživo do kraja, uključujući produžetke i jedanaesterce ako budu potrebni', 'Prijelaz s prijenosa na Uptown Nights', 'DJ set uz house, hip-hop, hitove, EDM i reggaeton'],
  },
  cs: {
    afterFinalWhistle: 'Po závěrečném hvizdu', untilClose: 'Do 05:00',
    titles: ['Otevření zahrady, odbavení a přidělení stolů', 'Aperitiv, koktejly a předzápasový program na velkoplošné obrazovce', 'Usazení hostů a poslední doporučený čas příchodu', 'Španělsko proti Argentině živě až do konce, včetně prodloužení a penalt, budou-li potřeba', 'Přechod z přenosu na Uptown Nights', 'DJ set: house, hip-hop, hity, EDM a reggaeton'],
  },
  da: {
    afterFinalWhistle: 'Efter slutfløjtet', untilClose: 'Indtil 05:00',
    titles: ['Haven åbner, check-in og bordplacering', 'Aperitif, cocktails og optakt på storskærmen', 'Gæsterne får pladser, og sidste anbefalede ankomsttid nærmer sig', 'Spanien mod Argentina live til kampens afslutning, inklusive forlænget spilletid og straffespark om nødvendigt', 'Overgang fra kampen til Uptown Nights', 'DJ-sæt med house, hiphop, hits, EDM og reggaeton'],
  },
  et: {
    afterFinalWhistle: 'Pärast lõpuvilet', untilClose: 'Kuni 05:00',
    titles: ['Aia avamine, registreerimine ja laudade määramine', 'Aperitiiv, kokteilid ja mängueelne programm suurel ekraanil', 'Külaliste kohtadele juhatamine ja viimane soovituslik saabumisaeg', 'Hispaania–Argentina otseülekanne lõpuni, vajadusel koos lisaaja ja penaltitega', 'Üleminek ülekandelt Uptown Nightsi programmile', 'DJ-set: house, hip-hop, hitid, EDM ja reggaeton'],
  },
  fi: {
    afterFinalWhistle: 'Loppuvihellyksen jälkeen', untilClose: 'Klo 05:00 asti',
    titles: ['Puutarhan avaus, sisäänkirjautuminen ja pöytien jako', 'Aperitiivi, cocktailit ja otteluennakko jättinäytöllä', 'Vieraiden sijoittuminen ja viimeinen suositeltu saapumisaika', 'Espanja–Argentiina suorana loppuun asti, tarvittaessa myös jatkoaika ja rangaistuspotkut', 'Siirtyminen ottelulähetyksestä Uptown Nightsiin', 'DJ-setti: house, hip-hop, hitit, EDM ja reggaeton'],
  },
  el: {
    afterFinalWhistle: 'Μετά το τελευταίο σφύριγμα', untilClose: 'Έως τις 05:00',
    titles: ['Άνοιγμα κήπου, check-in και κατανομή τραπεζιών', 'Aperitivo, κοκτέιλ και pre-match πρόγραμμα στη γιγαντοοθόνη', 'Τακτοποίηση επισκεπτών και τελευταίο προτεινόμενο διάστημα άφιξης', 'Ισπανία–Αργεντινή ζωντανά έως το τέλος, με παράταση και πέναλτι αν χρειαστούν', 'Μετάβαση από τη μετάδοση στο Uptown Nights', 'DJ set με house, hip-hop, hits, EDM και reggaeton'],
  },
  hu: {
    afterFinalWhistle: 'A lefújás után', untilClose: '05:00-ig',
    titles: ['A kert megnyitása, beléptetés és asztalok kiosztása', 'Aperitif, koktélok és meccsfelvezetés az óriáskivetítőn', 'A vendégek leültetése és az utolsó ajánlott érkezési időszak', 'Spanyolország–Argentína élőben a mérkőzés végéig, szükség esetén hosszabbítással és büntetőkkel', 'Átmenet a közvetítésről az Uptown Nights programjára', 'DJ-szett house, hip-hop, slágerek, EDM és reggaeton zenével'],
  },
  ga: {
    afterFinalWhistle: 'Tar éis na feadóige deiridh', untilClose: 'Go dtí 05:00',
    titles: ['Oscailt an ghairdín, seiceáil isteach agus leithdháileadh na mbord', 'Aperitivo, manglaim agus réamhamharc an chluiche ar an scáileán mór', 'Suíocháin na n-aíonna agus an tréimhse dheireanach mholta le teacht', 'An Spáinn–an Airgintín beo go deireadh, le ham breise agus ciceanna pionóis más gá', 'Aistriú ón gcraoladh go Uptown Nights', 'Seisiún DJ le house, hip-hop, amhráin mhóra, EDM agus reggaeton'],
  },
  lv: {
    afterFinalWhistle: 'Pēc spēles beigu svilpes', untilClose: 'Līdz 05:00',
    titles: ['Dārza atvēršana, reģistrācija un galdiņu piešķiršana', 'Aperitīvs, kokteiļi un pirmsspēles programma uz lielā ekrāna', 'Viesu sasēdināšana un pēdējais ieteicamais ierašanās laiks', 'Spānija pret Argentīnu tiešraidē līdz beigām, vajadzības gadījumā arī papildlaiks un pēcspēles sitieni', 'Pāreja no translācijas uz Uptown Nights', 'DJ sets ar house, hip-hop, hitiem, EDM un reggaeton'],
  },
  lt: {
    afterFinalWhistle: 'Po finalinio švilpuko', untilClose: 'Iki 05:00',
    titles: ['Sodo atidarymas, registracija ir staliukų paskyrimas', 'Aperityvas, kokteiliai ir priešrungtyninė programa didžiajame ekrane', 'Svečių susodinimas ir paskutinis rekomenduojamas atvykimo laikas', 'Ispanija prieš Argentiną tiesiogiai iki pabaigos, prireikus su pratęsimu ir baudiniais', 'Perėjimas nuo transliacijos prie Uptown Nights', 'DJ setas: house, hip-hop, hitai, EDM ir reggaeton'],
  },
  mt: {
    afterFinalWhistle: 'Wara t-tisfira finali', untilClose: 'Sal-05:00',
    titles: ['Ftuħ tal-ġnien, check-in u tqassim tal-imwejjed', 'Aperitivo, cocktails u programm ta’ qabel il-logħba fuq l-iskrin kbir', 'Tqegħid tal-mistednin u l-aħħar ħin rakkomandat tal-wasla', 'Spanja–Arġentina dirett sal-aħħar, inkluż ħin barrani u penalties jekk ikun meħtieġ', 'Tranżizzjoni mix-xandira għal Uptown Nights', 'Sessjoni DJ b’house, hip-hop, hits, EDM u reggaeton'],
  },
  pl: {
    afterFinalWhistle: 'Po ostatnim gwizdku', untilClose: 'Do 05:00',
    titles: ['Otwarcie ogrodu, odprawa i przydział stolików', 'Aperitif, koktajle i studio przedmeczowe na wielkim ekranie', 'Rozmieszczenie gości i ostatni zalecany czas przybycia', 'Hiszpania–Argentyna na żywo do końca, w razie potrzeby z dogrywką i rzutami karnymi', 'Przejście z transmisji do Uptown Nights', 'DJ set: house, hip-hop, hity, EDM i reggaeton'],
  },
  ro: {
    afterFinalWhistle: 'După fluierul final', untilClose: 'Până la 05:00',
    titles: ['Deschiderea grădinii, check-in și repartizarea meselor', 'Aperitiv, cocktailuri și avanpremiera meciului pe ecranul mare', 'Așezarea invitaților și ultimul interval recomandat pentru sosire', 'Spania–Argentina în direct până la final, inclusiv prelungiri și lovituri de departajare dacă este necesar', 'Trecerea de la transmisie la Uptown Nights', 'DJ set cu house, hip-hop, hituri, EDM și reggaeton'],
  },
  sk: {
    afterFinalWhistle: 'Po záverečnom hvizde', untilClose: 'Do 05:00',
    titles: ['Otvorenie záhrady, registrácia a pridelenie stolov', 'Aperitív, koktaily a predzápasový program na veľkoplošnej obrazovke', 'Usadenie hostí a posledný odporúčaný čas príchodu', 'Španielsko proti Argentíne naživo až do konca, v prípade potreby vrátane predĺženia a penált', 'Prechod z prenosu na Uptown Nights', 'DJ set: house, hip-hop, hity, EDM a reggaeton'],
  },
  sl: {
    afterFinalWhistle: 'Po zadnjem sodnikovem žvižgu', untilClose: 'Do 05:00',
    titles: ['Odprtje vrta, prijava in razporeditev miz', 'Aperitiv, koktajli in predtekmaški program na velikem zaslonu', 'Namestitev gostov in zadnji priporočeni čas prihoda', 'Španija proti Argentini v živo do konca, po potrebi tudi s podaljški in enajstmetrovkami', 'Prehod s prenosa na Uptown Nights', 'DJ set: house, hip-hop, uspešnice, EDM in reggaeton'],
  },
  sv: {
    afterFinalWhistle: 'Efter slutsignalen', untilClose: 'Till 05:00',
    titles: ['Trädgården öppnar, incheckning och bordsplacering', 'Aperitif, cocktails och uppladdning på storbildsskärmen', 'Gästerna placeras och sista rekommenderade ankomsttid', 'Spanien mot Argentina live till slutet, inklusive förlängning och straffar vid behov', 'Övergång från sändningen till Uptown Nights', 'DJ-set med house, hiphop, hits, EDM och reggaeton'],
  },
  no: {
    afterFinalWhistle: 'Etter sluttsignalet', untilClose: 'Til 05:00',
    titles: ['Hagen åpner, innsjekking og bordplassering', 'Aperitiff, cocktailer og oppladning på storskjermen', 'Plassering av gjester og siste anbefalte ankomsttid', 'Spania mot Argentina direkte til kampen er ferdig, inkludert ekstraomganger og straffer ved behov', 'Overgang fra sendingen til Uptown Nights', 'DJ-sett med house, hiphop, hits, EDM og reggaeton'],
  },
  is: {
    afterFinalWhistle: 'Eftir lokaflautið', untilClose: 'Til 05:00',
    titles: ['Garðurinn opnar, innritun og borðaúthlutun', 'Aperitivo, kokteilar og upphitun á risaskjánum', 'Gestum vísað til sæta og síðasti ráðlagði komutími', 'Spánn–Argentína í beinni til loka, með framlengingu og vítaspyrnum ef þarf', 'Skipt frá útsendingunni yfir í Uptown Nights', 'DJ-sett með house, hip-hop, vinsælum lögum, EDM og reggaeton'],
  },
  uk: {
    afterFinalWhistle: 'Після фінального свистка', untilClose: 'До 05:00',
    titles: ['Відкриття саду, реєстрація та розподіл столиків', 'Аперитив, коктейлі та передматчева програма на великому екрані', 'Розсадження гостей і останній рекомендований час прибуття', 'Іспанія — Аргентина наживо до завершення, включно з додатковим часом і пенальті за потреби', 'Перехід від трансляції до Uptown Nights', 'DJ-сет: house, hip-hop, хіти, EDM і reggaeton'],
  },
  sq: {
    afterFinalWhistle: 'Pas bilbilit të fundit', untilClose: 'Deri në 05:00',
    titles: ['Hapja e kopshtit, check-in dhe caktimi i tavolinave', 'Aperitiv, kokteje dhe programi para ndeshjes në ekranin e madh', 'Vendosja e pjesëmarrësve dhe ora e fundit e rekomanduar e mbërritjes', 'Spanjë–Argjentinë drejtpërdrejt deri në fund, përfshirë shtesat dhe penalltitë nëse nevojiten', 'Kalimi nga transmetimi te Uptown Nights', 'Set DJ me house, hip-hop, hite, EDM dhe reggaeton'],
  },
  sr: {
    afterFinalWhistle: 'Posle poslednjeg zvižduka', untilClose: 'Do 05:00',
    titles: ['Otvaranje bašte, prijava i dodela stolova', 'Aperitiv, kokteli i najava utakmice na velikom ekranu', 'Smeštanje gostiju i poslednji preporučeni termin dolaska', 'Španija protiv Argentine uživo do kraja, uključujući produžetke i penale ako budu potrebni', 'Prelazak sa prenosa na Uptown Nights', 'DJ set uz house, hip-hop, hitove, EDM i reggaeton'],
  },
  bs: {
    afterFinalWhistle: 'Nakon posljednjeg zvižduka', untilClose: 'Do 05:00',
    titles: ['Otvaranje bašte, prijava i dodjela stolova', 'Aperitiv, kokteli i najava utakmice na velikom ekranu', 'Smještanje gostiju i posljednji preporučeni termin dolaska', 'Španija protiv Argentine uživo do kraja, uključujući produžetke i penale ako budu potrebni', 'Prelazak s prijenosa na Uptown Nights', 'DJ set uz house, hip-hop, hitove, EDM i reggaeton'],
  },
  mk: {
    afterFinalWhistle: 'По последниот свиреж', untilClose: 'До 05:00',
    titles: ['Отворање на градината, пријавување и распределба на масите', 'Аперитив, коктели и преднатпреварувачка програма на големиот екран', 'Сместување на присутните и последен препорачан термин за пристигнување', 'Шпанија против Аргентина во живо до крај, со продолженија и пенали ако бидат потребни', 'Премин од преносот кон Uptown Nights', 'DJ сет со house, hip-hop, хитови, EDM и reggaeton'],
  },
};

const WEST_WORLD_LOCALES = new Set<LocaleCode>(['es', 'fr', 'de', 'pt', 'nl', 'ru', 'tr', 'zh', 'ar', 'ga', 'mt']);
const BALKAN_LOCALES = new Set<LocaleCode>(['hr', 'el', 'sl', 'sq', 'sr', 'bs', 'mk']);

const WORLD_CUP_DRESS_TITLES: Record<LocaleCode, string> = {
  en: 'What is the dress code?',
  it: 'Qual è il dress code?',
  es: '¿Hay código de vestimenta?',
  fr: 'Y a-t-il un dress code ?',
  de: 'Gibt es einen Dresscode?',
  pt: 'Existe código de vestuário?',
  nl: 'Is er een dresscode?',
  ru: 'Есть ли дресс-код?',
  tr: 'Kıyafet kuralı var mı?',
  zh: '有着装要求吗？',
  ar: 'هل توجد قواعد للملابس؟',
  bg: 'Какъв е дрескодът?',
  hr: 'Kakav je dress code?',
  cs: 'Jaký je dress code?',
  da: 'Hvad er dresscoden?',
  et: 'Milline on riietusstiil?',
  fi: 'Mikä on pukukoodi?',
  el: 'Ποιο είναι το dress code;',
  hu: 'Mi a dress code?',
  ga: 'An bhfuil cód gúna ann?',
  lv: 'Kāds ir ģērbšanās stils?',
  lt: 'Koks aprangos kodas?',
  mt: 'Hemm kodiċi tal-ilbies?',
  pl: 'Jaki jest dress code?',
  ro: 'Care este dress code-ul?',
  sk: 'Aký je dress code?',
  sl: 'Kakšen je kodeks oblačenja?',
  sv: 'Vilken klädkod gäller?',
  no: 'Hva er kleskoden?',
  is: 'Hver er klæðaburðurinn?',
  uk: 'Який дрескод?',
  sq: 'Cili është kodi i veshjes?',
  sr: 'Kakav je kodeks oblačenja?',
  bs: 'Kakav je kodeks oblačenja?',
  mk: 'Каков е кодексот на облекување?',
};

function cleanEventText(value: string): string {
  return value.replace(/\bDJ\.\s*,/giu, 'DJ,').replace(/\bDJ\.,/giu, 'DJ,');
}

function buildProgramme(locale: LocaleCode) {
  const copy = WORLD_CUP_PROGRAMME_COPY[locale];
  if (!copy) throw new Error(`Missing World Cup programme copy: ${locale}`);
  return [
    { start: '19:30', end: '20:15', title: copy.titles[0] },
    { start: '20:15', end: '20:45', title: copy.titles[1] },
    { start: '20:45', end: '21:00', title: copy.titles[2] },
    { start: '21:00', title: copy.titles[3] },
    { start: copy.afterFinalWhistle, title: copy.titles[4] },
    { start: copy.untilClose, title: copy.titles[5] },
  ];
}

function localizedProfile(profile: EventBatchProfile, locale: LocaleCode): EventBatchProfile {
  const eventName = getWorldCupFinalLocaleCopy(locale).eventName;
  return {
    ...profile,
    eventName: { ...profile.eventName, en: eventName, it: eventName, [locale]: eventName },
  };
}

function buildSeoFaqs(
  base: LocalizedEventContent,
  locale: LocaleCode,
  answers: readonly [string, string, string, string, string],
): LocalizedEventFaq[] {
  const copy = getWorldCupFinalLocaleCopy(locale);
  return base.faqs.map((faq, index) => index < 5
    ? { question: searchQuestion(copy.keywordIntents[index], locale), answer: answers[index] }
    : { question: cleanEventText(faq.question), answer: cleanEventText(faq.answer) });
}

function removeUnverifiedGuestlistFaqs(
  faqs: LocalizedEventFaq[],
  locale: LocaleCode,
  buyTickets: string,
  bookTable: string,
  programme: ReturnType<typeof buildProgramme>,
): void {
  const indices = WEST_WORLD_LOCALES.has(locale)
    ? [10, 18]
    : BALKAN_LOCALES.has(locale)
      ? [7, 14]
      : [];

  if (indices[0] !== undefined) {
    faqs[indices[0]] = {
      question: searchQuestion(`${buyTickets} / ${bookTable}`, locale),
      answer: `${buyTickets}: Xceed. ${bookTable}: WhatsApp ${WORLD_CUP_FINAL_PHONE}.`,
    };
  }
  if (indices[1] !== undefined) {
    faqs[indices[1]] = {
      question: searchQuestion(`${programme[0].start} — ${programme[0].title}`, locale),
      answer: `${programme[0].start}–${programme[0].end}: ${programme[0].title}.`,
    };
  }
}

export function getWorldCupFinalLocalizedContent(locale: LocaleCode): LocalizedEventContent {
  if (locale === 'en') return worldCupFinalEn;
  if (locale === 'it') return worldCupFinalIt;

  const profile = getEventBatchProfile(WORLD_CUP_FINAL_CANONICAL_SLUG);
  const pack = getEventLocalePack(locale);
  if (!profile || !pack) throw new Error(`World Cup final cannot render locale ${locale}`);

  const copy = getWorldCupFinalLocaleCopy(locale);
  const nativeProfile = localizedProfile(profile, locale);
  const base = getBatchLocalizedEventContent(nativeProfile, locale, pack);
  const values = getBatchEventTemplateValues(nativeProfile, locale, pack);
  const fill = (template: string) => interpolateEventBatchTemplate(template, values);
  const confirmation = getEventbriteConfirmationPlainText(locale, WORLD_CUP_FINAL_PHONE);
  const dressRule = EVENT_BATCH_LOCALE_FALLBACKS[locale].elegantDressLongTrousers;
  const programme = buildProgramme(locale);
  const experienceSection = base.sections.find((section) => section.title === pack.sectionTitles.experience);
  const accessSection = base.sections.find((section) => section.title === pack.sectionTitles.access);
  const ageFaqIndex = pack.faqs.findIndex((faq) => faq.answer.includes('{minAge}'));
  const ageFaq = ageFaqIndex >= 0 ? base.faqs[ageFaqIndex] : undefined;
  if (!experienceSection || !accessSection || !ageFaq) throw new Error(`World Cup semantic sections are incomplete for ${locale}`);
  const dressTitle = WORLD_CUP_DRESS_TITLES[locale];
  const targetTitle = searchQuestion(`${pack.sectionTitles.access}: 21+`, locale);
  const targetBody = cleanEventText(`21+. ${ageFaq.answer}`);
  const afterpartyTitle = cleanEventText(programme[4].title);
  const afterpartyBody = cleanEventText(`${programme[4].title}. ${programme[5].title}.`);

  const answerFirst = cleanEventText(`${copy.eventName}. 19.07.2026, Just Me Milano: 19:30 — ${programme[0].title}; 21:00 — ${programme[3].title}. ${targetBody} ${dressRule}`);
  const bookingIntro = `${confirmation.notTicket} ${confirmation.purchase} ${confirmation.afterPurchase}`;
  const venueDescription = cleanEventText(accessSection.body);
  const programmeText = programme.map((slot) => `${slot.start}${slot.end ? `–${slot.end}` : ''}: ${slot.title}`).join(' ');
  const faqs = buildSeoFaqs(base, locale, [
    answerFirst,
    venueDescription,
    `${answerFirst} ${programmeText}`,
    answerFirst,
    `${experienceSection.body} ${afterpartyBody}`,
  ]);
  const targetFaqIndex = ageFaqIndex < 5 ? 5 : ageFaqIndex;
  faqs[targetFaqIndex] = { question: ageFaq.question, answer: targetBody };
  removeUnverifiedGuestlistFaqs(faqs, locale, pack.eventbrite.buyTickets, pack.eventbrite.bookTable, programme);

  const exactFacts = `19.07.2026 · Just Me Milano · 19:30 · 21:00`;

  return {
    ...base,
    title: copy.eventName,
    metaTitle: clamp(`19.07.2026 | Just Me Milano | ${copy.keywordIntents[0]}`, 62),
    seoSummary: clamp(`${exactFacts}. WhatsApp ${WORLD_CUP_FINAL_PHONE}. ${copy.poster.teams}.`, 140),
    metaDescription: clamp(`${exactFacts}. WhatsApp ${WORLD_CUP_FINAL_PHONE}. ${copy.keywordIntents[0]}.`, 158),
    answerFirst,
    bookingIntro: cleanEventText(bookingIntro),
    venueDescription,
    leadPosterAfterBooking: true,
    programmeBeforeSections: true,
    sections: [
      { title: dressTitle, body: dressRule },
      { title: targetTitle, body: targetBody },
      { title: pack.sectionTitles.experience, body: cleanEventText(experienceSection.body) },
      { title: afterpartyTitle, body: afterpartyBody },
    ],
    programme: programme.map((slot) => ({ ...slot, title: cleanEventText(fill(slot.title)) })),
    faqs: faqs.map((faq) => ({ question: cleanEventText(faq.question), answer: cleanEventText(faq.answer) })),
  };
}
