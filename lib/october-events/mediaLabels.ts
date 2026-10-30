import type { LocaleCode } from '@/lib/i18n/locales';

const LABELS: Record<LocaleCode, readonly [string, string]> = {en:["Artist photograph","Live performance"],it:["Fotografia degli artisti","Esibizione dal vivo"],es:["Fotograf\xeda de los artistas","Actuaci\xf3n en directo"],fr:["Photographie des artistes","Concert en direct"],de:["K\xfcnstlerfoto","Liveauftritt"],pt:["Fotografia dos artistas","Atua\xe7\xe3o ao vivo"],nl:["Artiestenfoto","Liveoptreden"],ru:["Фотография артистов","Живое выступление"],tr:["Sanat\xe7ı fotoğrafı","Canlı performans"],zh:["艺人照片","现场演出"],ar:["صورة للفنانين","عرض موسيقي حي"],bg:["Снимка на изпълнителите","Изпълнение на живо"],hr:["Fotografija izvođača","Nastup uživo"],cs:["Fotografie interpretů","Živ\xe9 vystoupen\xed"],da:["Kunstnerfoto","Liveoptr\xe6den"],et:["Esinejate foto","Elav esitus"],fi:["Artistikuva","Live-esitys"],el:["Φωτογραφία καλλιτεχνών","Ζωντανή εμφάνιση"],hu:["Az előad\xf3k f\xe9nyk\xe9pe","\xc9lő fell\xe9p\xe9s"],ga:["Grianghraf de na heala\xedont\xf3ir\xed","Taibhi\xfa beo"],lv:["Mākslinieku fotogrāfija","Dzīvā uzstāšanās"],lt:["Atlikėjų nuotrauka","Gyvas pasirodymas"],mt:["Ritratt tal-artisti","Wirja live"],pl:["Zdjęcie artyst\xf3w","Występ na żywo"],ro:["Fotografie a artiștilor","Concert live"],sk:["Fotografia interpretov","Živ\xe9 vyst\xfapenie"],sl:["Fotografija izvajalcev","Nastop v živo"],sv:["Artistfoto","Liveframtr\xe4dande"],bs:["Fotografija izvođača","Nastup uživo"],sq:["Fotografi e artist\xebve","Performanc\xeb e drejtp\xebrdrejt\xeb"],mk:["Фотографија на изведувачите","Настап во живо"],no:["Artistfoto","Liveopptreden"],is:["Lj\xf3smynd af listam\xf6nnum","Lifandi flutningur"],sr:["Фотографија извођача","Наступ уживо"],uk:["Фотографія артистів","Живий виступ"]};

export function octoberArtistPhotoLabel(locale: LocaleCode): string {
  return (LABELS[locale] ?? LABELS.en)[0];
}

export function octoberLivePhotoLabel(locale: LocaleCode): string {
  return (LABELS[locale] ?? LABELS.en)[1];
}
