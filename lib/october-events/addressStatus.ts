import type { LocaleCode } from '@/lib/i18n/locales';
import type { OctoberEventRecord } from './types';

const COPY: Record<LocaleCode,string>={
 en:'The published sources give different street numbers for this venue. Confirm the entrance address before travelling; a map is not available until the discrepancy is resolved.',
 it:'Le fonti pubblicano civici diversi per questo locale. Conferma l’indirizzo d’ingresso prima di partire; la mappa sarà disponibile quando la discrepanza sarà risolta.',
 es:'Las fuentes publican distintos números de calle para este local. Confirma la dirección de entrada antes de salir; el mapa estará disponible cuando se resuelva la discrepancia.',
 fr:'Les sources indiquent des numéros de rue différents pour ce lieu. Confirmez l’adresse de l’entrée avant de partir ; la carte sera disponible une fois l’écart résolu.',
 de:'Die Quellen nennen unterschiedliche Hausnummern für diesen Veranstaltungsort. Bestätigen Sie vor der Anreise die Eingangsadresse. Die Karte ist erst nach Klärung verfügbar.',
 pt:'As fontes indicam números de porta diferentes para este local. Confirme a morada da entrada antes de sair; o mapa ficará disponível quando a divergência for esclarecida.',
 nl:'De bronnen vermelden verschillende huisnummers voor deze locatie. Bevestig vóór vertrek het adres van de ingang. De kaart komt beschikbaar zodra dit verschil is opgehelderd.',
 ru:'В источниках указаны разные номера дома для этой площадки. Уточните адрес входа перед поездкой; карта появится после устранения расхождения.',
 tr:'Kaynaklarda bu mekân için farklı kapı numaraları belirtiliyor. Yola çıkmadan önce giriş adresini doğrulayın; tutarsızlık giderildiğinde harita sunulacaktır.',
 zh:'公开来源为该场地标注了不同的门牌号。出发前请确认入口地址；信息核实一致后才会提供地图。',
 ar:'تذكر المصادر أرقام مبانٍ مختلفة لهذا المكان. تأكد من عنوان المدخل قبل التوجه إليه؛ ستتوفر الخريطة بعد حسم هذا الاختلاف.',
 bg:'Източниците посочват различни номера на сградата за това място. Потвърдете адреса на входа преди пътуване; картата ще бъде достъпна след изясняване на разминаването.',
 hr:'Izvori navode različite kućne brojeve za ovaj prostor. Potvrdite adresu ulaza prije polaska; karta će biti dostupna nakon razjašnjenja razlike.',
 cs:'Zdroje uvádějí pro toto místo různá čísla domu. Před cestou si ověřte adresu vchodu; mapa bude dostupná po vyjasnění rozporu.',
 da:'Kilderne angiver forskellige husnumre for dette sted. Bekræft indgangens adresse før afrejse; kortet bliver tilgængeligt, når uoverensstemmelsen er afklaret.',
 et:'Allikad annavad selle koha kohta erinevad majanumbrid. Kinnitage enne teele asumist sissepääsu aadress; kaart lisatakse pärast vastuolu lahendamist.',
 fi:'Lähteissä ilmoitetaan tälle paikalle eri talonumerot. Varmista sisäänkäynnin osoite ennen lähtöä; kartta tulee saataville ristiriidan selvittyä.',
 el:'Οι πηγές αναφέρουν διαφορετικούς αριθμούς οδού για τον χώρο. Επιβεβαιώστε τη διεύθυνση της εισόδου πριν ξεκινήσετε· ο χάρτης θα είναι διαθέσιμος όταν διευκρινιστεί η διαφορά.',
 hu:'A források eltérő házszámokat adnak meg ehhez a helyszínhez. Indulás előtt erősítse meg a bejárat címét; a térkép az eltérés tisztázása után lesz elérhető.',
 ga:'Tugann na foinsí uimhreacha tí éagsúla don ionad seo. Deimhnigh seoladh an bhealaigh isteach sula dtéann tú ann; beidh léarscáil ar fáil nuair a réiteofar an neamhréireacht.',
 lv:'Avotos šai vietai norādīti atšķirīgi mājas numuri. Pirms došanās ceļā apstipriniet ieejas adresi; karte būs pieejama pēc neatbilstības noskaidrošanas.',
 lt:'Šaltiniuose nurodyti skirtingi šios vietos namo numeriai. Prieš vykdami patvirtinkite įėjimo adresą; žemėlapis bus pateiktas išsiaiškinus neatitikimą.',
 mt:'Is-sorsi jagħtu numri differenti tal-bini għal dan il-post. Ikkonferma l-indirizz tad-daħla qabel titlaq; il-mappa tkun disponibbli meta tissolva d-diskrepanza.',
 pl:'Źródła podają różne numery budynku dla tego miejsca. Przed wyjazdem potwierdź adres wejścia; mapa będzie dostępna po wyjaśnieniu rozbieżności.',
 ro:'Sursele indică numere stradale diferite pentru această locație. Confirmă adresa intrării înainte de plecare; harta va fi disponibilă după clarificarea diferenței.',
 sk:'Zdroje uvádzajú pre toto miesto rôzne čísla domu. Pred cestou si overte adresu vchodu; mapa bude dostupná po objasnení rozporu.',
 sl:'Viri za ta prostor navajajo različne hišne številke. Pred odhodom potrdite naslov vhoda; zemljevid bo na voljo po razjasnitvi razlike.',
 sv:'Källorna anger olika gatunummer för denna plats. Bekräfta entréns adress före avresan; kartan blir tillgänglig när skillnaden har klarlagts.',
 no:'Kildene oppgir ulike husnumre for dette stedet. Bekreft adressen til inngangen før avreise; kartet blir tilgjengelig når avviket er avklart.',
 is:'Heimildir gefa upp mismunandi húsnúmer fyrir þennan stað. Staðfestu heimilisfang inngangsins áður en þú leggur af stað; kort verður aðgengilegt þegar misræmið hefur verið leyst.',
 uk:'У джерелах зазначено різні номери будинку для цього майданчика. Уточніть адресу входу перед поїздкою; карта з’явиться після усунення розбіжності.',
 sq:'Burimet japin numra të ndryshëm të ndërtesës për këtë vend. Konfirmoni adresën e hyrjes para nisjes; harta do të jetë e disponueshme pasi të sqarohet mospërputhja.',
 sr:'Izvori navode različite kućne brojeve za ovaj prostor. Potvrdite adresu ulaza pre polaska; mapa će biti dostupna nakon razjašnjenja razlike.',
 bs:'Izvori navode različite kućne brojeve za ovaj prostor. Potvrdite adresu ulaza prije polaska; karta će biti dostupna nakon razjašnjenja razlike.',
 mk:'Изворите наведуваат различни куќни броеви за ова место. Потврдете ја адресата на влезот пред поаѓање; картата ќе биде достапна по разјаснување на разликата.',
};
export function octoberAddressConflict(event:OctoberEventRecord,locale:LocaleCode):string|null {
 return event.venue.addressStatus==='source_conflict'?COPY[locale]:null;
}
