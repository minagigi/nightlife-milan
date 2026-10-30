import type { LocaleCode } from '@/lib/i18n/locales';
import { octoberLivePhotoLabel } from './mediaLabels';
import { octoberVenueSignLabel } from './signLabels';
import { getIntlLocale } from '@/lib/eventPageLocale';
import { MONTH_EVENT_IMAGE_LABELS } from '@/lib/month-events/imageLabels';
const LABELS:Record<LocaleCode,readonly [string,string,string,string]>= {
en:['Venue interior','Outdoor space','Food and drinks on a table','Illuminated Torre Branca'],
it:['Interni del locale','Spazio esterno','Cibo e bevande sul tavolo','Torre Branca illuminata'],
es:['Interior del local','Espacio exterior','Comida y bebidas sobre una mesa','Torre Branca iluminada'],
fr:['Intérieur du lieu','Espace extérieur','Nourriture et boissons sur une table','Torre Branca illuminée'],
de:['Innenraum der Location','Außenbereich','Speisen und Getränke auf einem Tisch','Beleuchtete Torre Branca'],
pt:['Interior do espaço','Área exterior','Comida e bebidas sobre uma mesa','Torre Branca iluminada'],
nl:['Interieur van de locatie','Buitenruimte','Eten en drinken op een tafel','Verlichte Torre Branca'],
ru:['Интерьер заведения','Открытое пространство','Еда и напитки на столе','Освещённая Torre Branca'],
tr:['Mekânın içi','Açık alan','Masada yiyecek ve içecekler','Aydınlatılmış Torre Branca'],
zh:['场地内部','室外空间','桌上的食物和饮料','灯光照亮的Torre Branca'],
ar:['المساحة الداخلية للمكان','المساحة الخارجية','طعام ومشروبات على طاولة','برج توري برانكا مضاء'],
bg:['Интериор на заведението','Външно пространство','Храна и напитки на маса','Осветената Torre Branca'],
hr:['Interijer prostora','Vanjski prostor','Hrana i piće na stolu','Osvijetljena Torre Branca'],
cs:['Interiér podniku','Venkovní prostor','Jídlo a nápoje na stole','Osvětlená Torre Branca'],
da:['Stedets indre','Udendørsområde','Mad og drikke på et bord','Oplyst Torre Branca'],
et:['Koha siseruum','Väliala','Toit ja joogid laual','Valgustatud Torre Branca'],
fi:['Tilan sisäpuoli','Ulkoalue','Ruokaa ja juomia pöydällä','Valaistu Torre Branca'],
el:['Εσωτερικός χώρος','Εξωτερικός χώρος','Φαγητό και ποτά σε τραπέζι','Φωτισμένη Torre Branca'],
hu:['A hely belső tere','Kültéri terület','Ételek és italok az asztalon','Kivilágított Torre Branca'],
ga:['Taobh istigh den ionad','Spás amuigh faoin aer','Bia agus deochanna ar bhord','Torre Branca soilsithe'],
lv:['Vietas interjers','Āra zona','Ēdiens un dzērieni uz galda','Izgaismotais Torre Branca'],
lt:['Vietos interjeras','Lauko erdvė','Maistas ir gėrimai ant stalo','Apšviesta Torre Branca'],
mt:['L-intern tal-post','Spazju fuq barra','Ikel u xorb fuq mejda','Torre Branca mixgħula'],
pl:['Wnętrze lokalu','Przestrzeń na zewnątrz','Jedzenie i napoje na stole','Oświetlona Torre Branca'],
ro:['Interiorul localului','Spațiu exterior','Mâncare și băuturi pe masă','Torre Branca iluminată'],
sk:['Interiér podniku','Vonkajší priestor','Jedlo a nápoje na stole','Osvetlená Torre Branca'],
sl:['Notranjost lokala','Zunanji prostor','Hrana in pijača na mizi','Osvetljena Torre Branca'],
sv:['Lokalens interiör','Utomhusområde','Mat och dryck på ett bord','Upplysta Torre Branca'],
bs:['Unutrašnjost prostora','Vanjski prostor','Hrana i piće na stolu','Osvijetljena Torre Branca'],
sq:['Brendësia e lokalit','Hapësirë e jashtme','Ushqim dhe pije në tavolinë','Torre Branca e ndriçuar'],
mk:['Внатрешност на локалот','Надворешен простор','Храна и пијалаци на маса','Осветлената Torre Branca'],
no:['Lokalets interiør','Uteområde','Mat og drikke på et bord','Opplyste Torre Branca'],
is:['Innra rými staðarins','Útisvæði','Matur og drykkir á borði','Upplýst Torre Branca'],
sr:['Унутрашњост локала','Спољни простор','Храна и пиће на столу','Осветљена Torre Branca'],
uk:['Інтер’єр закладу','Відкритий простір','Їжа та напої на столі','Освітлена Torre Branca'],
};
export function octoberGalleryLabel(locale:LocaleCode,venue:string,key:string){
  if(key==='venue-name')return octoberVenueSignLabel(locale,venue);
  if(key==='performance')return `${venue} · ${octoberLivePhotoLabel(locale)}`;
  if(key==='mural')return `${venue} · ${MURAL[locale]}`;
  if(key==='crowd'||key==='entrance'||key==='signage')return MONTH_EVENT_IMAGE_LABELS[locale][key].replace('{venue}',venue);
  const index=({room:0,outdoor:1,food:2,tower:3} as Record<string,number>)[key];
  if(index===undefined)throw new Error(`Unknown October gallery label: ${key}`);
  return `${venue} · ${LABELS[locale][index]}`;
}

const MURAL:Record<LocaleCode,string>={
en:'Exterior mural',it:'Murale sulla facciata',es:'Mural en la fachada',fr:'Fresque sur la façade',de:'Wandgemälde an der Fassade',pt:'Mural na fachada',nl:'Muurschildering op de gevel',ru:'Роспись на фасаде',tr:'Cephedeki duvar resmi',zh:'外墙壁画',ar:'لوحة جدارية على الواجهة',bg:'Стенопис на фасадата',hr:'Mural na pročelju',cs:'Nástěnná malba na fasádě',da:'Vægmaleri på facaden',et:'Maaling fassaadil',fi:'Julkisivun seinämaalaus',el:'Τοιχογραφία στην πρόσοψη',hu:'Falfestmény a homlokzaton',ga:'Múrmhaisiú ar an aghaidh',lv:'Sienas gleznojums uz fasādes',lt:'Fasado sienų tapyba',mt:'Murali fuq il-faċċata',pl:'Mural na elewacji',ro:'Pictură murală pe fațadă',sk:'Nástenná maľba na fasáde',sl:'Poslikava na fasadi',sv:'Väggmålning på fasaden',bs:'Mural na fasadi',sq:'Mural në fasadë',mk:'Мурал на фасадата',no:'Veggmaleri på fasaden',is:'Veggmynd á framhliðinni',sr:'Мурал на фасади',uk:'Розпис на фасаді',
};

const GALLERY_CONTEXT:Record<LocaleCode,string>={
en:'These photographs show the venue and previous occasions, not the upcoming event.',
it:'Queste fotografie mostrano il locale e occasioni precedenti, non l’evento in programma.',
es:'Estas fotografías muestran el local y ocasiones anteriores, no el próximo evento.',
fr:'Ces photographies montrent le lieu et des occasions passées, pas l’événement à venir.',
de:'Diese Fotos zeigen die Location und frühere Anlässe, nicht die bevorstehende Veranstaltung.',
pt:'Estas fotografias mostram o espaço e ocasiões anteriores, não o próximo evento.',
nl:'Deze foto’s tonen de locatie en eerdere gelegenheden, niet het komende evenement.',
ru:'На фотографиях показаны площадка и прошлые мероприятия, а не предстоящее событие.',
tr:'Bu fotoğraflar mekânı ve önceki etkinlikleri gösterir; yaklaşan etkinliğe ait değildir.',
zh:'这些照片展示的是场地和过去的活动，并非即将举办的活动。',
ar:'تعرض هذه الصور المكان ومناسبات سابقة، وليست صورًا للفعالية القادمة.',
bg:'Тези снимки показват мястото и предишни поводи, а не предстоящото събитие.',
hr:'Ove fotografije prikazuju prostor i ranija događanja, a ne nadolazeći događaj.',
cs:'Tyto fotografie zachycují místo a dřívější příležitosti, nikoli nadcházející akci.',
da:'Disse billeder viser stedet og tidligere begivenheder, ikke det kommende arrangement.',
et:'Need fotod näitavad toimumiskohta ja varasemaid sündmusi, mitte tulevast üritust.',
fi:'Nämä kuvat esittävät tapahtumapaikkaa ja aiempia tilaisuuksia, eivät tulevaa tapahtumaa.',
el:'Αυτές οι φωτογραφίες δείχνουν τον χώρο και προηγούμενες περιστάσεις, όχι την επερχόμενη εκδήλωση.',
hu:'Ezek a fényképek a helyszínt és korábbi alkalmakat mutatják, nem a közelgő eseményt.',
ga:'Taispeánann na grianghraif seo an t-ionad agus ócáidí roimhe seo, ní an t-imeacht atá le teacht.',
lv:'Šajās fotogrāfijās redzama norises vieta un iepriekšēji pasākumi, nevis gaidāmais pasākums.',
lt:'Šiose nuotraukose matoma renginio vieta ir ankstesni renginiai, o ne būsimas renginys.',
mt:'Dawn ir-ritratti juru l-post u okkażjonijiet preċedenti, mhux l-avveniment li ġej.',
pl:'Te zdjęcia przedstawiają lokal i wcześniejsze wydarzenia, a nie nadchodzące wydarzenie.',
ro:'Aceste fotografii arată locația și ocazii anterioare, nu evenimentul viitor.',
sk:'Tieto fotografie zobrazujú miesto a predchádzajúce príležitosti, nie nadchádzajúce podujatie.',
sl:'Te fotografije prikazujejo prizorišče in pretekle dogodke, ne prihajajočega dogodka.',
sv:'Dessa bilder visar lokalen och tidigare tillfällen, inte det kommande evenemanget.',
bs:'Ove fotografije prikazuju prostor i ranije događaje, a ne predstojeći događaj.',
sq:'Këto fotografi tregojnë lokalin dhe raste të mëparshme, jo eventin e ardhshëm.',
mk:'Овие фотографии го прикажуваат местото и претходни настани, а не претстојниот настан.',
no:'Disse bildene viser stedet og tidligere anledninger, ikke det kommende arrangementet.',
is:'Þessar myndir sýna staðinn og fyrri tilefni, ekki væntanlegan viðburð.',
sr:'Ове фотографије приказују простор и раније догађаје, а не предстојећи догађај.',
uk:'Ці фотографії показують майданчик і минулі події, а не майбутній захід.',
};
export function octoberGalleryContext(locale:LocaleCode):string{return GALLERY_CONTEXT[locale];}

export function octoberGalleryImageLabel(locale:LocaleCode,venue:string,image:Readonly<{label:string;subjects?:string;date?:string}>):string {
  return [octoberGalleryLabel(locale,venue,image.label),image.subjects,image.date ? new Intl.DateTimeFormat(getIntlLocale(locale),{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(image.date)) : null].filter(Boolean).join(' · ');
}
