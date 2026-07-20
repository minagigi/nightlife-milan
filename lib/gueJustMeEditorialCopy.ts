import type { LocaleCode } from './i18n/locales';

export interface GueJustMeEditorialCopy {
  headings: {
    dressCode: string;
    target: string;
    mood: string;
    music: string;
  };
  targetBody: string;
  stageNotice: string;
}

/**
 * Native editorial copy for the Guè showcase. The event hours describe the
 * whole Just Me night: Xceed has not published Guè's exact stage time.
 */
export const GUE_JUST_ME_EDITORIAL_COPY: Record<LocaleCode, GueJustMeEditorialCopy> = {
  en: { headings: { dressCode: 'Dress code', target: 'Target', mood: 'Mood', music: 'Music' }, targetBody: 'For guests aged 21+ interested in Guè, Italian rap and a premium Milan club night.', stageNotice: 'The Just Me night runs from 19:30 to 05:00. Guè will perform during the club night; his exact stage time has not been published.' },
  it: { headings: { dressCode: 'Dress code', target: 'Target', mood: 'Atmosfera', music: 'Musica' }, targetBody: 'Per un pubblico 21+ interessato a Guè, al rap italiano e a una notte premium nei club di Milano.', stageNotice: 'La serata al Just Me va dalle 19:30 alle 05:00. Guè si esibirà durante la notte; l’orario esatto della performance non è stato pubblicato.' },
  es: { headings: { dressCode: 'Código de vestimenta', target: 'Público', mood: 'Ambiente', music: 'Música' }, targetBody: 'Para mayores de 21 años interesados en Guè, el rap italiano y una noche premium de club en Milán.', stageNotice: 'La noche en Just Me va de 19:30 a 05:00. Guè actuará durante la sesión de club; todavía no se ha publicado la hora exacta.' },
  fr: { headings: { dressCode: 'Tenue vestimentaire', target: 'Public', mood: 'Ambiance', music: 'Musique' }, targetBody: 'Pour les 21 ans et plus qui s’intéressent à Guè, au rap italien et à une nuit club premium à Milan.', stageNotice: 'La soirée au Just Me se déroule de 19 h 30 à 5 h. Guè se produira pendant la nuit club ; son horaire exact n’a pas été publié.' },
  de: { headings: { dressCode: 'Dresscode', target: 'Zielgruppe', mood: 'Stimmung', music: 'Musik' }, targetBody: 'Für Gäste ab 21, die sich für Guè, italienischen Rap und eine hochwertige Clubnacht in Mailand interessieren.', stageNotice: 'Die Nacht im Just Me dauert von 19:30 bis 05:00 Uhr. Guè tritt im Laufe der Clubnacht auf; seine genaue Auftrittszeit wurde nicht veröffentlicht.' },
  pt: { headings: { dressCode: 'Código de vestuário', target: 'Público', mood: 'Ambiente', music: 'Música' }, targetBody: 'Para maiores de 21 anos interessados em Guè, rap italiano e uma noite de clube premium em Milão.', stageNotice: 'A noite no Just Me decorre das 19:30 às 05:00. Guè atuará durante a noite de clube; o horário exato ainda não foi publicado.' },
  nl: { headings: { dressCode: 'Dresscode', target: 'Doelgroep', mood: 'Sfeer', music: 'Muziek' }, targetBody: 'Voor gasten van 21 jaar en ouder met interesse in Guè, Italiaanse rap en een premium clubnacht in Milaan.', stageNotice: 'De avond in Just Me duurt van 19:30 tot 05:00. Guè treedt tijdens de clubnacht op; zijn exacte aanvangstijd is niet gepubliceerd.' },
  ru: { headings: { dressCode: 'Дресс-код', target: 'Для кого', mood: 'Атмосфера', music: 'Музыка' }, targetBody: 'Для гостей 21+, которым интересны Guè, итальянский рэп и премиальная клубная ночь в Милане.', stageNotice: 'Вечер в Just Me проходит с 19:30 до 05:00. Guè выступит в течение клубной ночи; точное время его выхода пока не опубликовано.' },
  tr: { headings: { dressCode: 'Kıyafet kuralı', target: 'Hedef kitle', mood: 'Atmosfer', music: 'Müzik' }, targetBody: 'Guè, İtalyan rap ve Milano’da seçkin bir kulüp gecesiyle ilgilenen 21 yaş üstü misafirler için.', stageNotice: 'Just Me gecesi 19:30–05:00 arasındadır. Guè kulüp gecesi içinde sahne alacak; kesin sahne saati henüz yayımlanmadı.' },
  zh: { headings: { dressCode: '着装要求', target: '适合人群', mood: '现场氛围', music: '音乐' }, targetBody: '适合21岁以上、喜爱Guè与意大利说唱并想体验米兰高端俱乐部之夜的宾客。', stageNotice: 'Just Me整晚活动时间为19:30至05:00。Guè将在俱乐部之夜期间登台，具体演出时间尚未公布。' },
  ar: { headings: { dressCode: 'قواعد اللباس', target: 'الجمهور المستهدف', mood: 'الأجواء', music: 'الموسيقى' }, targetBody: 'للضيوف بعمر 21 عاماً فما فوق المهتمين بـ Guè والراب الإيطالي وليلة نادٍ راقية في ميلانو.', stageNotice: 'تمتد ليلة Just Me من 19:30 حتى 05:00. سيقدّم Guè عرضه خلال ليلة النادي، ولم يُعلن توقيت ظهوره الدقيق بعد.' },
  bg: { headings: { dressCode: 'Дрескод', target: 'Публика', mood: 'Атмосфера', music: 'Музика' }, targetBody: 'За гости над 21 години с интерес към Guè, италианския рап и първокласна клубна нощ в Милано.', stageNotice: 'Вечерта в Just Me е от 19:30 до 05:00. Guè ще се изяви по време на клубната нощ; точният час още не е публикуван.' },
  hr: { headings: { dressCode: 'Pravila odijevanja', target: 'Publika', mood: 'Atmosfera', music: 'Glazba' }, targetBody: 'Za goste od 21 godine naviše koje zanimaju Guè, talijanski rap i premium klupska noć u Milanu.', stageNotice: 'Večer u Just Me traje od 19:30 do 05:00. Guè nastupa tijekom klupske noći; točno vrijeme nastupa još nije objavljeno.' },
  cs: { headings: { dressCode: 'Dress code', target: 'Pro koho', mood: 'Atmosféra', music: 'Hudba' }, targetBody: 'Pro hosty od 21 let, které zajímá Guè, italský rap a prémiová klubová noc v Miláně.', stageNotice: 'Noc v Just Me probíhá od 19:30 do 05:00. Guè vystoupí během klubové noci; přesný čas zatím nebyl zveřejněn.' },
  da: { headings: { dressCode: 'Dresscode', target: 'Målgruppe', mood: 'Stemning', music: 'Musik' }, targetBody: 'For gæster på 21 år og derover med interesse for Guè, italiensk rap og en eksklusiv klubnat i Milano.', stageNotice: 'Natten på Just Me varer fra 19.30 til 05.00. Guè optræder i løbet af klubnatten; det præcise tidspunkt er ikke offentliggjort.' },
  et: { headings: { dressCode: 'Riietusnõuded', target: 'Sihtrühm', mood: 'Meeleolu', music: 'Muusika' }, targetBody: 'Vähemalt 21-aastastele külalistele, keda huvitavad Guè, Itaalia räpp ja esmaklassiline klubiöö Milanos.', stageNotice: 'Just Me õhtu kestab 19.30–05.00. Guè esineb klubiöö jooksul; täpset esinemisaega ei ole veel avaldatud.' },
  fi: { headings: { dressCode: 'Pukukoodi', target: 'Kohderyhmä', mood: 'Tunnelma', music: 'Musiikki' }, targetBody: 'Yli 21-vuotiaille, joita kiinnostavat Guè, italialainen rap ja tasokas klubi-ilta Milanossa.', stageNotice: 'Just Me -ilta kestää klo 19.30–05.00. Guè esiintyy klubi-illan aikana; tarkkaa esiintymisaikaa ei ole julkaistu.' },
  el: { headings: { dressCode: 'Ενδυματολογικός κώδικας', target: 'Κοινό', mood: 'Ατμόσφαιρα', music: 'Μουσική' }, targetBody: 'Για επισκέπτες 21+ που ενδιαφέρονται για τον Guè, το ιταλικό ραπ και μια premium βραδιά club στο Μιλάνο.', stageNotice: 'Η βραδιά στο Just Me διαρκεί από τις 19:30 έως τις 05:00. Ο Guè θα εμφανιστεί μέσα στη νύχτα· η ακριβής ώρα δεν έχει ανακοινωθεί.' },
  hu: { headings: { dressCode: 'Öltözködési szabályok', target: 'Célközönség', mood: 'Hangulat', music: 'Zene' }, targetBody: 'A 21 év feletti vendégeknek, akiket Guè, az olasz rap és egy prémium milánói klubéjszaka érdekel.', stageNotice: 'A Just Me est 19:30-tól 05:00-ig tart. Guè a klubéjszaka során lép fel; a pontos időpontot még nem tették közzé.' },
  ga: { headings: { dressCode: 'Cód gléasta', target: 'Lucht féachana', mood: 'Atmaisféar', music: 'Ceol' }, targetBody: 'D’aíonna 21+ a bhfuil suim acu i Guè, rap Iodálach agus oíche chlub den scoth i Milano.', stageNotice: 'Maireann oíche Just Me ó 19:30 go 05:00. Beidh Guè ar stáitse i rith na hoíche club; níl an t-am cruinn foilsithe.' },
  lv: { headings: { dressCode: 'Ģērbšanās stils', target: 'Mērķauditorija', mood: 'Atmosfēra', music: 'Mūzika' }, targetBody: 'Viesiem no 21 gada, kurus interesē Guè, itāļu reps un augstvērtīga kluba nakts Milānā.', stageNotice: 'Vakars Just Me ilgst no 19:30 līdz 05:00. Guè uzstāsies kluba nakts laikā; precīzs uzstāšanās laiks nav publicēts.' },
  lt: { headings: { dressCode: 'Aprangos kodas', target: 'Kam skirta', mood: 'Atmosfera', music: 'Muzika' }, targetBody: '21 metų ir vyresniems svečiams, kuriuos domina Guè, itališkas repas ir aukščiausios klasės klubo naktis Milane.', stageNotice: 'Vakaras Just Me vyksta nuo 19:30 iki 05:00. Guè pasirodys klubo nakties metu; tikslus laikas dar nepaskelbtas.' },
  mt: { headings: { dressCode: 'Kodiċi tal-ilbies', target: 'Udjenza', mood: 'Atmosfera', music: 'Mużika' }, targetBody: 'Għal mistednin ta’ 21 sena jew aktar interessati f’Guè, fir-rap Taljan u f’lejl premium f’klabb f’Milan.', stageNotice: 'Il-lejl f’Just Me jdum mid-19:30 sal-05:00. Guè se jdoqq matul il-lejl tal-klabb; il-ħin eżatt għadu ma ġiex ippubblikat.' },
  pl: { headings: { dressCode: 'Zasady ubioru', target: 'Dla kogo', mood: 'Atmosfera', music: 'Muzyka' }, targetBody: 'Dla gości 21+ zainteresowanych Guè, włoskim rapem i ekskluzywną nocą klubową w Mediolanie.', stageNotice: 'Noc w Just Me trwa od 19:30 do 05:00. Guè wystąpi w trakcie imprezy; dokładna godzina występu nie została jeszcze opublikowana.' },
  ro: { headings: { dressCode: 'Cod vestimentar', target: 'Public', mood: 'Atmosferă', music: 'Muzică' }, targetBody: 'Pentru oaspeți de 21+ interesați de Guè, rap italian și o noapte premium de club în Milano.', stageNotice: 'Noaptea la Just Me se desfășoară între 19:30 și 05:00. Guè va cânta în timpul nopții; ora exactă nu a fost încă publicată.' },
  sk: { headings: { dressCode: 'Dress code', target: 'Pre koho', mood: 'Atmosféra', music: 'Hudba' }, targetBody: 'Pre hostí od 21 rokov, ktorých zaujíma Guè, taliansky rap a prémiová klubová noc v Miláne.', stageNotice: 'Noc v Just Me trvá od 19:30 do 05:00. Guè vystúpi počas klubovej noci; presný čas ešte nebol zverejnený.' },
  sl: { headings: { dressCode: 'Pravila oblačenja', target: 'Za koga', mood: 'Vzdušje', music: 'Glasba' }, targetBody: 'Za goste, stare 21 let ali več, ki jih zanimajo Guè, italijanski rap in vrhunska klubska noč v Milanu.', stageNotice: 'Noč v Just Me poteka od 19.30 do 05.00. Guè bo nastopil med klubsko nočjo; točen čas še ni objavljen.' },
  sv: { headings: { dressCode: 'Klädkod', target: 'Målgrupp', mood: 'Stämning', music: 'Musik' }, targetBody: 'För gäster över 21 år som är intresserade av Guè, italiensk rap och en exklusiv klubbkväll i Milano.', stageNotice: 'Kvällen på Just Me pågår 19.30–05.00. Guè uppträder under klubbkvällen; den exakta tiden har inte publicerats.' },
  no: { headings: { dressCode: 'Kleskode', target: 'Målgruppe', mood: 'Stemning', music: 'Musikk' }, targetBody: 'For gjester fra 21 år som er interessert i Guè, italiensk rap og en eksklusiv klubbkveld i Milano.', stageNotice: 'Kvelden på Just Me varer fra 19.30 til 05.00. Guè opptrer i løpet av klubbnatten; nøyaktig tidspunkt er ikke publisert.' },
  is: { headings: { dressCode: 'Klæðaburður', target: 'Fyrir hverja', mood: 'Stemning', music: 'Tónlist' }, targetBody: 'Fyrir gesti 21 árs og eldri sem hafa áhuga á Guè, ítölsku rappi og vandaðri klúbbnótt í Mílanó.', stageNotice: 'Kvöldið á Just Me stendur frá 19:30 til 05:00. Guè kemur fram einhvern tíma yfir klúbbnóttina; nákvæmur tími hefur ekki verið birtur.' },
  uk: { headings: { dressCode: 'Дрес-код', target: 'Для кого', mood: 'Атмосфера', music: 'Музика' }, targetBody: 'Для гостей 21+, яких цікавлять Guè, італійський реп і преміальна клубна ніч у Мілані.', stageNotice: 'Вечір у Just Me триває з 19:30 до 05:00. Guè виступить протягом клубної ночі; точний час ще не оприлюднено.' },
  sq: { headings: { dressCode: 'Kodi i veshjes', target: 'Publiku', mood: 'Atmosfera', music: 'Muzika' }, targetBody: 'Për të ftuar 21+ që interesohen për Guè, repin italian dhe një natë premium në klub në Milano.', stageNotice: 'Nata në Just Me zgjat nga 19:30 deri në 05:00. Guè do të performojë gjatë natës; orari i saktë nuk është publikuar.' },
  sr: { headings: { dressCode: 'Pravila oblačenja', target: 'Publika', mood: 'Atmosfera', music: 'Muzika' }, targetBody: 'Za goste od 21 godine naviše koje zanimaju Guè, italijanski rep i premium klupska noć u Milanu.', stageNotice: 'Veče u Just Me traje od 19:30 do 05:00. Guè nastupa tokom klupske noći; tačno vreme još nije objavljeno.' },
  bs: { headings: { dressCode: 'Pravila oblačenja', target: 'Publika', mood: 'Atmosfera', music: 'Muzika' }, targetBody: 'Za goste od 21 godine naviše koje zanimaju Guè, italijanski rap i premium klupska noć u Milanu.', stageNotice: 'Večer u Just Me traje od 19:30 do 05:00. Guè nastupa tokom klupske noći; tačno vrijeme još nije objavljeno.' },
  mk: { headings: { dressCode: 'Кодекс на облекување', target: 'Публика', mood: 'Атмосфера', music: 'Музика' }, targetBody: 'За гости над 21 година кои се заинтересирани за Guè, италијански рап и премиум клупска ноќ во Милано.', stageNotice: 'Вечерта во Just Me трае од 19:30 до 05:00. Guè ќе настапи во текот на клупската ноќ; точниот термин сè уште не е објавен.' },
};

export const GUE_JUST_ME_MUSIC_COPY: Record<LocaleCode, string> = {
  en: 'Guè live performance, Italian rap, hip-hop, house and hits',
  it: 'Performance live di Guè, rap italiano, hip-hop, house e hit',
  es: 'Actuación en vivo de Guè, rap italiano, hip-hop, house y éxitos',
  fr: 'Performance live de Guè, rap italien, hip-hop, house et hits',
  de: 'Live-Auftritt von Guè, italienischer Rap, Hip-Hop, House und Hits',
  pt: 'Atuação ao vivo de Guè, rap italiano, hip-hop, house e êxitos',
  nl: 'Liveoptreden van Guè, Italiaanse rap, hiphop, house en hits',
  ru: 'Живое выступление Guè, итальянский рэп, хип-хоп, хаус и хиты',
  tr: 'Guè canlı performansı, İtalyan rap, hip-hop, house ve hit parçalar',
  zh: 'Guè现场演出、意大利说唱、嘻哈、浩室音乐与热门金曲',
  ar: 'عرض حي لـ Guè، راب إيطالي، هيب هوب، هاوس وأغانٍ ناجحة',
  bg: 'Изпълнение на живо на Guè, италиански рап, хип-хоп, хаус и хитове',
  hr: 'Nastup uživo Guèa, talijanski rap, hip-hop, house i hitovi',
  cs: 'Živé vystoupení Guè, italský rap, hip-hop, house a hity',
  da: 'Liveoptræden med Guè, italiensk rap, hiphop, house og hits',
  et: 'Guè live-esinemine, Itaalia räpp, hiphop, house ja hitid',
  fi: 'Guèn live-esiintyminen, italialainen rap, hiphop, house ja hitit',
  el: 'Ζωντανή εμφάνιση του Guè, ιταλικό ραπ, hip-hop, house και επιτυχίες',
  hu: 'Guè élő fellépése, olasz rap, hip-hop, house és slágerek',
  ga: 'Léiriú beo le Guè, rap Iodálach, hip-hop, house agus amhráin mhóra',
  lv: 'Guè dzīvā uzstāšanās, itāļu reps, hiphops, house un hiti',
  lt: 'Gyvas Guè pasirodymas, itališkas repas, hiphopas, house ir hitai',
  mt: 'Prestazzjoni live ta’ Guè, rap Taljan, hip-hop, house u suċċessi',
  pl: 'Występ na żywo Guè, włoski rap, hip-hop, house i hity',
  ro: 'Spectacol live Guè, rap italian, hip-hop, house și hituri',
  sk: 'Živé vystúpenie Guè, taliansky rap, hip-hop, house a hity',
  sl: 'Nastop Guèja v živo, italijanski rap, hip-hop, house in uspešnice',
  sv: 'Liveframträdande med Guè, italiensk rap, hiphop, house och hits',
  no: 'Liveopptreden med Guè, italiensk rap, hiphop, house og hits',
  is: 'Lifandi flutningur Guè, ítalskt rapp, hip-hop, house og vinsæl lög',
  uk: 'Живий виступ Guè, італійський реп, хіп-хоп, хаус і хіти',
  sq: 'Performancë live nga Guè, rap italian, hip-hop, house dhe hite',
  sr: 'Nastup uživo Guèa, italijanski rep, hip-hop, house i hitovi',
  bs: 'Nastup uživo Guèa, italijanski rap, hip-hop, house i hitovi',
  mk: 'Настап во живо на Guè, италијански рап, хип-хоп, хаус и хитови',
};
