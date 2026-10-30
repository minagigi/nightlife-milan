import type { LocaleCode } from '@/lib/i18n/locales';
import type { OctoberEventRecord, OctoberEventOffer } from './types';
import { getGuestListsCopy } from '@/lib/guestLists/copy';

const COPY: Record<LocaleCode, readonly [string,string,string,string]> = {
  en:['Elegant attire','Long trousers required for men.','Admission from','Admission until'],
  it:['Abbigliamento elegante','Pantaloni lunghi obbligatori per gli uomini.','Ingresso dalle','Ingresso entro le'],
  es:['Vestimenta elegante','Pantalón largo obligatorio para los hombres.','Entrada desde las','Entrada hasta las'],
  fr:['Tenue élégante','Pantalon long obligatoire pour les hommes.','Entrée à partir de','Entrée avant'],
  de:['Elegante Kleidung','Lange Hosen für Männer erforderlich.','Einlass ab','Einlass bis'],
  pt:['Vestuário elegante','Calças compridas obrigatórias para homens.','Entrada a partir das','Entrada até às'],
  nl:['Elegante kleding','Lange broek verplicht voor mannen.','Toegang vanaf','Toegang tot'],
  ru:['Элегантная одежда','Для мужчин обязательны длинные брюки.','Вход с','Вход до'],
  tr:['Şık kıyafet','Erkekler için uzun pantolon zorunludur.','Giriş başlangıcı','Son giriş'],
  zh:['优雅着装','男士须穿长裤。','最早入场时间','最晚入场时间'],
  ar:['ملابس أنيقة','السروال الطويل إلزامي للرجال.','الدخول بدءًا من','الدخول حتى'],
  bg:['Елегантно облекло','Дългите панталони са задължителни за мъжете.','Вход от','Вход до'],
  hr:['Elegantna odjeća','Duge hlače obvezne su za muškarce.','Ulaz od','Ulaz do'],
  cs:['Elegantní oblečení','Pro muže jsou povinné dlouhé kalhoty.','Vstup od','Vstup do'],
  da:['Elegant påklædning','Lange bukser er påkrævet for mænd.','Adgang fra','Adgang indtil'],
  et:['Elegantne riietus','Meestel on kohustuslikud pikad püksid.','Sissepääs alates','Sissepääs kuni'],
  fi:['Tyylikäs pukeutuminen','Miehiltä edellytetään pitkiä housuja.','Sisäänpääsy alkaen','Sisäänpääsy viimeistään'],
  el:['Κομψή ενδυμασία','Απαιτείται μακρύ παντελόνι για τους άνδρες.','Είσοδος από','Είσοδος έως'],
  hu:['Elegáns öltözet','Férfiaknak hosszúnadrág viselése kötelező.','Belépés ettől','Belépés eddig'],
  ga:['Éadaí galánta','Tá bríste fada éigeantach d’fhir.','Cead isteach ó','Cead isteach go dtí'],
  lv:['Elegants apģērbs','Vīriešiem obligātas garās bikses.','Ieeja no','Ieeja līdz'],
  lt:['Elegantiška apranga','Vyrams privalomos ilgos kelnės.','Įėjimas nuo','Įėjimas iki'],
  mt:['Ilbies eleganti','Qliezet twal huma obbligatorji għall-irġiel.','Dħul minn','Dħul sa'],
  pl:['Elegancki strój','Mężczyzn obowiązują długie spodnie.','Wejście od','Wejście do'],
  ro:['Ținută elegantă','Pantalonii lungi sunt obligatorii pentru bărbați.','Acces de la','Acces până la'],
  sk:['Elegantné oblečenie','Pre mužov sú povinné dlhé nohavice.','Vstup od','Vstup do'],
  sl:['Elegantna oblačila','Za moške so obvezne dolge hlače.','Vstop od','Vstop do'],
  sv:['Elegant klädsel','Långbyxor krävs för män.','Inträde från','Inträde senast'],
  bs:['Elegantna odjeća','Duge pantalone su obavezne za muškarce.','Ulaz od','Ulaz do'],
  sq:['Veshje elegante','Pantallonat e gjata janë të detyrueshme për burrat.','Hyrja nga','Hyrja deri në'],
  mk:['Елегантна облека','Долги панталони се задолжителни за мажите.','Влез од','Влез до'],
  no:['Elegant antrekk','Lange bukser er påkrevd for menn.','Inngang fra','Inngang senest'],
  is:['Glæsilegur klæðnaður','Karlmenn þurfa að vera í síðum buxum.','Aðgangur frá','Aðgangur til'],
  sr:['Елегантна одећа','Дуге панталоне су обавезне за мушкарце.','Улаз од','Улаз до'],
  uk:['Елегантний одяг','Для чоловіків обов’язкові довгі штани.','Вхід з','Вхід до'],
};

export function octoberDressCode(event:OctoberEventRecord,locale:LocaleCode,unknown:string):string {
  const row=COPY[locale];
  const base=event.dressCode==='Elegant'?row[0]:event.dressCode||unknown;
  return (event.dressCodeDetail==='men-long-trousers'?`${base}. ${row[1]}`:base).replace(/[.。]$/u,'');
}

export function octoberOfferConditions(offer:OctoberEventOffer,locale:LocaleCode):string[] {
  const row=COPY[locale];
  return [offer.audience==='women'?getGuestListsCopy(locale).womenOnlyLabel:null,
    offer.admissionFrom?`${row[2]} ${offer.admissionFrom}`:null,
    offer.admissionUntil?`${row[3]} ${offer.admissionUntil}`:null].filter((v):v is string=>Boolean(v));
}

const MIXED_GROUP:Record<LocaleCode,string>={
en:'The venue requires groups with both men and women.',it:'Il locale richiede gruppi misti di uomini e donne.',es:'El local exige grupos mixtos de hombres y mujeres.',fr:'Le lieu exige des groupes mixtes composés d’hommes et de femmes.',de:'Der Veranstaltungsort verlangt gemischte Gruppen aus Männern und Frauen.',pt:'O espaço exige grupos mistos de homens e mulheres.',nl:'De locatie vereist gemengde groepen van mannen en vrouwen.',ru:'Площадка требует смешанные группы мужчин и женщин.',tr:'Mekân, kadın ve erkeklerden oluşan karma gruplar şartı belirtmektedir.',zh:'场地要求男女混合组队入场。',ar:'يشترط المكان مجموعات مختلطة من الرجال والنساء.',bg:'Мястото изисква смесени групи от мъже и жени.',hr:'Lokal zahtijeva mješovite grupe muškaraca i žena.',cs:'Podnik vyžaduje smíšené skupiny mužů a žen.',da:'Stedet kræver blandede grupper med både mænd og kvinder.',et:'Koht nõuab segarühmi, kuhu kuuluvad nii mehed kui ka naised.',fi:'Paikka edellyttää ryhmiä, joissa on sekä miehiä että naisia.',el:'Ο χώρος απαιτεί μικτές παρέες ανδρών και γυναικών.',hu:'A helyszín férfiakból és nőkből álló vegyes csoportokat ír elő.',ga:'Éilíonn an t-ionad grúpaí measctha d’fhir agus de mhná.',lv:'Vieta pieprasa jauktas vīriešu un sieviešu grupas.',lt:'Vieta reikalauja mišrių vyrų ir moterų grupių.',mt:'Il-post jeħtieġ gruppi mħallta ta’ rġiel u nisa.',pl:'Lokal wymaga mieszanych grup kobiet i mężczyzn.',ro:'Localul solicită grupuri mixte de bărbați și femei.',sk:'Podnik vyžaduje zmiešané skupiny mužov a žien.',sl:'Lokal zahteva mešane skupine moških in žensk.',sv:'Lokalen kräver blandade grupper med både män och kvinnor.',bs:'Lokal zahtijeva mješovite grupe muškaraca i žena.',sq:'Lokali kërkon grupe të përziera burrash dhe grash.',mk:'Локалот бара мешани групи од мажи и жени.',no:'Stedet krever blandede grupper med både menn og kvinner.',is:'Staðurinn krefst blandaðra hópa karla og kvenna.',sr:'Локал захтева мешовите групе мушкараца и жена.',uk:'Майданчик вимагає змішані групи чоловіків і жінок.',
};
export function octoberGroupCondition(event:OctoberEventRecord,locale:LocaleCode):string|null{return event.mixedGroup?MIXED_GROUP[locale]:null;}

const SOURCE_CONFLICT:Record<LocaleCode,string>={
en:'Some details differ between official sources. Confirm the conditions before booking.',it:'Alcuni dettagli differiscono tra le fonti ufficiali. Conferma le condizioni prima di prenotare.',es:'Algunos detalles difieren entre las fuentes oficiales. Confirma las condiciones antes de reservar.',fr:'Certains détails diffèrent selon les sources officielles. Confirmez les conditions avant de réserver.',de:'Einige Angaben der offiziellen Quellen weichen voneinander ab. Bestätigen Sie die Bedingungen vor der Buchung.',pt:'Alguns detalhes diferem entre as fontes oficiais. Confirme as condições antes de reservar.',nl:'Officiële bronnen verschillen op enkele punten. Bevestig de voorwaarden voordat je boekt.',ru:'Некоторые сведения в официальных источниках различаются. Уточните условия перед бронированием.',tr:'Resmî kaynaklardaki bazı bilgiler farklılık gösteriyor. Rezervasyon yapmadan önce koşulları teyit edin.',zh:'官方来源中的部分信息存在差异。预订前请确认具体条件。',ar:'تختلف بعض التفاصيل بين المصادر الرسمية. تأكد من الشروط قبل الحجز.',bg:'Някои подробности се различават между официалните източници. Потвърдете условията преди резервация.',hr:'Neki se detalji razlikuju među službenim izvorima. Potvrdite uvjete prije rezervacije.',cs:'Některé údaje se v oficiálních zdrojích liší. Před rezervací si potvrďte podmínky.',da:'Nogle oplysninger varierer mellem de officielle kilder. Bekræft betingelserne før booking.',et:'Mõned üksikasjad ametlikes allikates erinevad. Kinnitage tingimused enne broneerimist.',fi:'Osa virallisten lähteiden tiedoista poikkeaa toisistaan. Varmista ehdot ennen varaamista.',el:'Ορισμένες λεπτομέρειες διαφέρουν μεταξύ των επίσημων πηγών. Επιβεβαιώστε τους όρους πριν από την κράτηση.',hu:'Egyes részletek eltérnek a hivatalos forrásokban. Foglalás előtt erősítse meg a feltételeket.',ga:'Tá difríochtaí idir roinnt sonraí sna foinsí oifigiúla. Deimhnigh na coinníollacha sula ndéanann tú áirithint.',lv:'Dažas detaļas oficiālajos avotos atšķiras. Pirms rezervēšanas apstipriniet nosacījumus.',lt:'Kai kurios detalės oficialiuose šaltiniuose skiriasi. Prieš rezervuodami patvirtinkite sąlygas.',mt:'Xi dettalji jvarjaw bejn is-sorsi uffiċjali. Ikkonferma l-kundizzjonijiet qabel tibbukkja.',pl:'Niektóre szczegóły różnią się między oficjalnymi źródłami. Potwierdź warunki przed rezerwacją.',ro:'Unele detalii diferă între sursele oficiale. Confirmați condițiile înainte de rezervare.',sk:'Niektoré údaje sa v oficiálnych zdrojoch líšia. Pred rezerváciou si potvrďte podmienky.',sl:'Nekatere podrobnosti se med uradnimi viri razlikujejo. Pred rezervacijo potrdite pogoje.',sv:'Vissa uppgifter skiljer sig mellan de officiella källorna. Bekräfta villkoren innan du bokar.',bs:'Neki se detalji razlikuju među službenim izvorima. Potvrdite uslove prije rezervacije.',sq:'Disa detaje ndryshojnë mes burimeve zyrtare. Konfirmoni kushtet përpara rezervimit.',mk:'Некои детали се разликуваат меѓу официјалните извори. Потврдете ги условите пред резервација.',no:'Noen opplysninger varierer mellom de offisielle kildene. Bekreft vilkårene før du bestiller.',is:'Sumar upplýsingar eru mismunandi eftir opinberum heimildum. Staðfestu skilmálana áður en þú bókar.',sr:'Неки детаљи се разликују међу званичним изворима. Потврдите услове пре резервације.',uk:'Деякі відомості в офіційних джерелах різняться. Уточніть умови перед бронюванням.',
};
export function octoberSourceConflict(event:OctoberEventRecord,locale:LocaleCode):string|null{return event.sourceConflict||event.endTimeStatus==='source_conflict'?SOURCE_CONFLICT[locale]:null;}
