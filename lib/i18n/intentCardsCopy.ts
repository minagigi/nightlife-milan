import type { LocaleCode } from './locales';

export type IntentCardsCopy = {
  vipTitle: string;
  vipSubtitle: string;
  danceTitle: string;
  danceSubtitle: string;
  aperitivoTitle: string;
  aperitivoSubtitle: string;
  conciergeTitle: string;
  conciergeSubtitle: string;
  explore: string;
  whatsappMessage: string;
};

export const INTENT_CARDS_COPY: Record<LocaleCode, IntentCardsCopy> = {
  en: {
    vipTitle: 'VIP Tables & Bottle Service', vipSubtitle: 'Reserved Privé areas, bottle menus and skip-the-line host entry',
    danceTitle: 'Club Nights & DJ Sets', danceSubtitle: 'Explore tonight’s and upcoming parties across Milan’s top clubs',
    aperitivoTitle: 'Royal Aperitivo & Rooftops', aperitivoSubtitle: 'Sunset terraces, dinner shows and lounge bookings from 19:30',
    conciergeTitle: '24/7 VIP Concierge Desk', conciergeSubtitle: 'Direct WhatsApp assistance for tables, guest lists and private events',
    explore: 'Explore', whatsappMessage: 'Hi Nightlife Milan! I would like to check VIP table and guest list options in Milan.',
  },
  it: {
    vipTitle: 'Tavoli VIP & Bottle Service', vipSubtitle: 'Aree Privé riservate, listini bottiglie e ingresso salta-fila',
    danceTitle: 'Serate in Club & DJ Set', danceSubtitle: 'Calendario serate, guest internazionali e format nei club di Milano',
    aperitivoTitle: 'Royal Aperitivo & Rooftop', aperitivoSubtitle: 'Terrazze panoramiche, dinner show e tavoli aperitivo dalle 19:30',
    conciergeTitle: 'Concierge VIP WhatsApp 7/7', conciergeSubtitle: 'Assistenza diretta per preventivi tavoli, liste nominali ed eventi privati',
    explore: 'Scopri', whatsappMessage: 'Ciao Nightlife Milan! Vorrei ricevere opzioni per tavoli VIP e liste a Milano.',
  },
  es: {
    vipTitle: 'Información sobre mesas VIP', vipSubtitle: 'Servicio de botellas en una selección de locales de Milán',
    danceTitle: 'Salir a bailar', danceSubtitle: 'Información sobre clubes y sesiones de DJ con fecha específica',
    aperitivoTitle: 'Aperitivo', aperitivoSubtitle: 'Horarios, locales y qué pedir',
    conciergeTitle: 'Pide información actualizada', conciergeSubtitle: 'Solicita disponibilidad actual confirmada por el local',
    explore: 'Explorar', whatsappMessage: '¡Hola! Quisiera información actualizada sobre mesas VIP en Milán. ¿Podéis ayudarme?',
  },
  fr: {
    vipTitle: 'Informations sur les tables VIP', vipSubtitle: 'Service de bouteilles dans une sélection d’établissements milanais',
    danceTitle: 'Sortir danser', danceSubtitle: 'Informations sur les clubs et DJ sets à des dates précises',
    aperitivoTitle: 'Apéritif', aperitivoSubtitle: 'Horaires, établissements et quoi commander',
    conciergeTitle: 'Demander des informations à jour', conciergeSubtitle: 'Demandez les disponibilités actuelles confirmées par l’établissement',
    explore: 'Découvrir', whatsappMessage: 'Bonjour ! Je souhaiterais obtenir des informations à jour sur les tables VIP à Milan. Pouvez-vous m’aider ?',
  },
  de: {
    vipTitle: 'Informationen zu VIP-Tischen', vipSubtitle: 'Flaschenservice in ausgewählten Mailänder Locations',
    danceTitle: 'Tanzen gehen', danceSubtitle: 'Informationen zu Clubs und DJ-Sets mit konkretem Datum',
    aperitivoTitle: 'Aperitivo', aperitivoSubtitle: 'Zeiten, Locations und Bestelltipps',
    conciergeTitle: 'Aktuelle Informationen anfragen', conciergeSubtitle: 'Aktuelle, von der Location bestätigte Verfügbarkeit anfragen',
    explore: 'Entdecken', whatsappMessage: 'Hallo! Ich hätte gerne aktuelle Informationen zu VIP-Tischen in Mailand. Könnt ihr mir helfen?',
  },
  pt: {
    vipTitle: 'Informações sobre mesas VIP', vipSubtitle: 'Serviço de garrafas em espaços selecionados de Milão',
    danceTitle: 'Sair para dançar', danceSubtitle: 'Informações sobre clubes e DJ sets com data específica',
    aperitivoTitle: 'Aperitivo', aperitivoSubtitle: 'Horários, espaços e o que pedir',
    conciergeTitle: 'Pedir informações atuais', conciergeSubtitle: 'Peça a disponibilidade atual confirmada pelo espaço',
    explore: 'Explorar', whatsappMessage: 'Olá! Gostaria de receber informações atuais sobre mesas VIP em Milão. Podem ajudar-me?',
  },
  nl: {
    vipTitle: 'Informatie over viptafels', vipSubtitle: 'Flessenservice bij geselecteerde locaties in Milaan',
    danceTitle: 'Uit dansen', danceSubtitle: 'Informatie over clubs en dj-sets met een specifieke datum',
    aperitivoTitle: 'Aperitivo', aperitivoSubtitle: 'Tijden, locaties en wat te bestellen',
    conciergeTitle: 'Vraag actuele informatie', conciergeSubtitle: 'Vraag naar actuele, door de locatie bevestigde beschikbaarheid',
    explore: 'Ontdekken', whatsappMessage: 'Hallo! Ik wil graag actuele informatie over viptafels in Milaan. Kunnen jullie me helpen?',
  },
  ru: {
    vipTitle: 'Информация о VIP-столах', vipSubtitle: 'Бутылочный сервис в выбранных заведениях Милана',
    danceTitle: 'Пойти танцевать', danceSubtitle: 'Информация о клубах и DJ-сетах с указанной датой',
    aperitivoTitle: 'Аперитив', aperitivoSubtitle: 'Время, заведения и что заказать',
    conciergeTitle: 'Запросить актуальную информацию', conciergeSubtitle: 'Запросите актуальную доступность, подтверждённую заведением',
    explore: 'Подробнее', whatsappMessage: 'Здравствуйте! Хотелось бы получить актуальную информацию о VIP-столах в Милане. Можете помочь?',
  },
  tr: {
    vipTitle: 'VIP masa bilgileri', vipSubtitle: 'Milano’daki seçili mekânlarda şişe servisi',
    danceTitle: 'Dans etmeye çıkın', danceSubtitle: 'Kulüpler ve belirli tarihli DJ setleri hakkında bilgi',
    aperitivoTitle: 'Aperitivo', aperitivoSubtitle: 'Saatler, mekânlar ve ne sipariş edilmeli',
    conciergeTitle: 'Güncel bilgi isteyin', conciergeSubtitle: 'Mekân tarafından doğrulanmış güncel müsaitlik isteyin',
    explore: 'Keşfet', whatsappMessage: 'Merhaba! Milano’daki VIP masalar hakkında güncel bilgi almak istiyorum. Yardımcı olabilir misiniz?',
  },
  zh: {
    vipTitle: 'VIP 卡座信息', vipSubtitle: '米兰精选场所的瓶装酒服务',
    danceTitle: '去跳舞', danceSubtitle: '俱乐部和注明具体日期的 DJ 演出信息',
    aperitivoTitle: '开胃酒', aperitivoSubtitle: '营业时间、场所和点单建议',
    conciergeTitle: '咨询最新信息', conciergeSubtitle: '查询由场所确认的当前空位',
    explore: '查看详情', whatsappMessage: '你好！我想了解米兰 VIP 卡座的最新信息。可以帮忙吗？',
  },
  ar: {
    vipTitle: 'معلومات طاولات VIP', vipSubtitle: 'خدمة الزجاجات في مجموعة مختارة من أماكن ميلانو',
    danceTitle: 'اخرج للرقص', danceSubtitle: 'معلومات عن النوادي وعروض الدي جي ذات التواريخ المحددة',
    aperitivoTitle: 'أبيريتيفو', aperitivoSubtitle: 'المواعيد والأماكن وما يمكنك طلبه',
    conciergeTitle: 'اطلب معلومات حديثة', conciergeSubtitle: 'اطلب التوفر الحالي المؤكد من المكان',
    explore: 'استكشف', whatsappMessage: 'مرحبًا! أود الحصول على معلومات حديثة عن طاولات VIP في ميلانو. هل يمكنكم مساعدتي؟',
  },
  bg: {
    vipTitle: 'Информация за VIP маси', vipSubtitle: 'Сервиз с бутилки в избрани заведения в Милано',
    danceTitle: 'Излезте да танцувате', danceSubtitle: 'Информация за клубове и DJ сетове с посочена дата',
    aperitivoTitle: 'Аперитив', aperitivoSubtitle: 'Работно време, заведения и какво да поръчате',
    conciergeTitle: 'Поискайте актуална информация', conciergeSubtitle: 'Поискайте актуална наличност, потвърдена от заведението',
    explore: 'Разгледайте', whatsappMessage: 'Здравейте! Искам актуална информация за VIP маси в Милано. Можете ли да ми помогнете?',
  },
  hr: {
    vipTitle: 'Informacije o VIP stolovima', vipSubtitle: 'Usluga boca u odabranim milanskim lokalima',
    danceTitle: 'Izađite na ples', danceSubtitle: 'Informacije o klubovima i DJ setovima s navedenim datumom',
    aperitivoTitle: 'Aperitiv', aperitivoSubtitle: 'Radno vrijeme, lokali i što naručiti',
    conciergeTitle: 'Zatražite aktualne informacije', conciergeSubtitle: 'Zatražite trenutačnu dostupnost potvrđenu od lokala',
    explore: 'Istražite', whatsappMessage: 'Pozdrav! Želim aktualne informacije o VIP stolovima u Milanu. Možete li mi pomoći?',
  },
  cs: {
    vipTitle: 'Informace o VIP stolech', vipSubtitle: 'Lahvový servis ve vybraných milánských podnicích',
    danceTitle: 'Vyrazit za tancem', danceSubtitle: 'Informace o klubech a DJ setech s uvedeným datem',
    aperitivoTitle: 'Aperitiv', aperitivoSubtitle: 'Otevírací doba, podniky a co si objednat',
    conciergeTitle: 'Vyžádat aktuální informace', conciergeSubtitle: 'Požádejte o aktuální dostupnost potvrzenou podnikem',
    explore: 'Prozkoumat', whatsappMessage: 'Dobrý den! Prosím o aktuální informace o VIP stolech v Miláně. Můžete mi pomoci?',
  },
  da: {
    vipTitle: 'Information om VIP-borde', vipSubtitle: 'Flaskeservice på udvalgte steder i Milano',
    danceTitle: 'Tag ud at danse', danceSubtitle: 'Information om klubber og DJ-sæt med angivet dato',
    aperitivoTitle: 'Aperitivo', aperitivoSubtitle: 'Åbningstider, steder og hvad du kan bestille',
    conciergeTitle: 'Bed om aktuelle oplysninger', conciergeSubtitle: 'Bed om aktuel tilgængelighed bekræftet af stedet',
    explore: 'Udforsk', whatsappMessage: 'Hej! Jeg vil gerne have aktuelle oplysninger om VIP-borde i Milano. Kan I hjælpe mig?',
  },
  et: {
    vipTitle: 'VIP-laudade teave', vipSubtitle: 'Pudeliteenus valitud Milano peopaikades',
    danceTitle: 'Mine tantsima', danceSubtitle: 'Teave klubide ja kindla kuupäevaga DJ-settide kohta',
    aperitivoTitle: 'Aperitiiv', aperitivoSubtitle: 'Lahtiolekuajad, kohad ja mida tellida',
    conciergeTitle: 'Küsi ajakohast teavet', conciergeSubtitle: 'Küsi toimumiskohalt kinnitatud hetke saadavust',
    explore: 'Avasta', whatsappMessage: 'Tere! Soovin ajakohast teavet Milano VIP-laudade kohta. Kas saate mind aidata?',
  },
  fi: {
    vipTitle: 'Tietoa VIP-pöydistä', vipSubtitle: 'Pullopalvelu valituissa Milanon tapahtumapaikoissa',
    danceTitle: 'Lähde tanssimaan', danceSubtitle: 'Tietoa klubeista ja tietylle päivälle ilmoitetuista DJ-seteistä',
    aperitivoTitle: 'Aperitivo', aperitivoSubtitle: 'Aukioloajat, paikat ja mitä tilata',
    conciergeTitle: 'Pyydä ajankohtaista tietoa', conciergeSubtitle: 'Pyydä paikan vahvistama ajantasainen saatavuus',
    explore: 'Tutustu', whatsappMessage: 'Hei! Haluaisin ajankohtaista tietoa Milanon VIP-pöydistä. Voitteko auttaa?',
  },
  el: {
    vipTitle: 'Πληροφορίες για τραπέζια VIP', vipSubtitle: 'Υπηρεσία φιαλών σε επιλεγμένους χώρους του Μιλάνου',
    danceTitle: 'Βγείτε για χορό', danceSubtitle: 'Πληροφορίες για κλαμπ και DJ set με συγκεκριμένη ημερομηνία',
    aperitivoTitle: 'Απεριτίφ', aperitivoSubtitle: 'Ωράρια, χώροι και τι να παραγγείλετε',
    conciergeTitle: 'Ζητήστε ενημερωμένες πληροφορίες', conciergeSubtitle: 'Ζητήστε τρέχουσα διαθεσιμότητα επιβεβαιωμένη από τον χώρο',
    explore: 'Εξερευνήστε', whatsappMessage: 'Γεια σας! Θα ήθελα ενημερωμένες πληροφορίες για τραπέζια VIP στο Μιλάνο. Μπορείτε να με βοηθήσετε;',
  },
  hu: {
    vipTitle: 'Információ VIP-asztalokról', vipSubtitle: 'Palackos kiszolgálás válogatott milánói helyszíneken',
    danceTitle: 'Menj táncolni', danceSubtitle: 'Információ klubokról és konkrét dátumú DJ-szettekről',
    aperitivoTitle: 'Aperitivo', aperitivoSubtitle: 'Nyitvatartás, helyszínek és mit érdemes rendelni',
    conciergeTitle: 'Kérj naprakész információt', conciergeSubtitle: 'Kérj a helyszín által megerősített aktuális elérhetőséget',
    explore: 'Fedezd fel', whatsappMessage: 'Szia! Naprakész információt szeretnék kérni a milánói VIP-asztalokról. Tudtok segíteni?',
  },
  ga: {
    vipTitle: 'Eolas faoi tháblaí VIP', vipSubtitle: 'Seirbhís buidéal in ionaid roghnaithe i Milano',
    danceTitle: 'Téigh amach ag damhsa', danceSubtitle: 'Eolas faoi chlubanna agus tacair DJ ar dhátaí sonraithe',
    aperitivoTitle: 'Aipéritif', aperitivoSubtitle: 'Uaireanta, ionaid agus cad ba cheart a ordú',
    conciergeTitle: 'Iarr eolas cothrom le dáta', conciergeSubtitle: 'Iarr infhaighteacht reatha atá deimhnithe ag an ionad',
    explore: 'Fiosraigh', whatsappMessage: 'Dia duit! Ba mhaith liom eolas cothrom le dáta faoi tháblaí VIP i Milano. An féidir libh cabhrú liom?',
  },
  lv: {
    vipTitle: 'Informācija par VIP galdiņiem', vipSubtitle: 'Pudeļu serviss atlasītās Milānas norises vietās',
    danceTitle: 'Dodieties dejot', danceSubtitle: 'Informācija par klubiem un konkrēta datuma dīdžeju setiem',
    aperitivoTitle: 'Aperitīvs', aperitivoSubtitle: 'Darba laiks, vietas un ko pasūtīt',
    conciergeTitle: 'Pieprasiet aktuālu informāciju', conciergeSubtitle: 'Pieprasiet vietas apstiprinātu pašreizējo pieejamību',
    explore: 'Izpētīt', whatsappMessage: 'Sveiki! Vēlos aktuālu informāciju par VIP galdiņiem Milānā. Vai varat man palīdzēt?',
  },
  lt: {
    vipTitle: 'Informacija apie VIP staliukus', vipSubtitle: 'Butelių aptarnavimas atrinktose Milano vietose',
    danceTitle: 'Eikite šokti', danceSubtitle: 'Informacija apie klubus ir konkrečios datos DJ pasirodymus',
    aperitivoTitle: 'Aperityvas', aperitivoSubtitle: 'Darbo laikas, vietos ir ką užsisakyti',
    conciergeTitle: 'Klauskite naujausios informacijos', conciergeSubtitle: 'Klauskite vietos patvirtinto dabartinio užimtumo',
    explore: 'Naršyti', whatsappMessage: 'Sveiki! Norėčiau naujausios informacijos apie VIP staliukus Milane. Ar galite padėti?',
  },
  mt: {
    vipTitle: 'Informazzjoni dwar imwejjed VIP', vipSubtitle: 'Servizz tal-fliexken f’postijiet magħżula f’Milan',
    danceTitle: 'Mur żifen', danceSubtitle: 'Informazzjoni dwar klabbs u settijiet ta’ DJ b’data speċifika',
    aperitivoTitle: 'Aperittiv', aperitivoSubtitle: 'Ħinijiet, postijiet u x’għandek tordna',
    conciergeTitle: 'Itlob informazzjoni aġġornata', conciergeSubtitle: 'Itlob disponibbiltà attwali kkonfermata mill-post',
    explore: 'Esplora', whatsappMessage: 'Bonġu! Nixtieq informazzjoni aġġornata dwar imwejjed VIP f’Milan. Tistgħu tgħinuni?',
  },
  pl: {
    vipTitle: 'Informacje o stolikach VIP', vipSubtitle: 'Serwis butelkowy w wybranych lokalach w Mediolanie',
    danceTitle: 'Wyjdź potańczyć', danceSubtitle: 'Informacje o klubach i setach DJ-skich z podaną datą',
    aperitivoTitle: 'Aperitivo', aperitivoSubtitle: 'Godziny, lokale i co zamówić',
    conciergeTitle: 'Poproś o aktualne informacje', conciergeSubtitle: 'Zapytaj o aktualną dostępność potwierdzoną przez lokal',
    explore: 'Odkryj', whatsappMessage: 'Dzień dobry! Chcę uzyskać aktualne informacje o stolikach VIP w Mediolanie. Czy możecie mi pomóc?',
  },
  ro: {
    vipTitle: 'Informații despre mese VIP', vipSubtitle: 'Serviciu de băuturi la sticlă în locații selectate din Milano',
    danceTitle: 'Ieși la dans', danceSubtitle: 'Informații despre cluburi și seturi DJ cu dată specificată',
    aperitivoTitle: 'Aperitiv', aperitivoSubtitle: 'Program, locații și ce să comanzi',
    conciergeTitle: 'Solicită informații actuale', conciergeSubtitle: 'Solicită disponibilitatea actuală confirmată de locație',
    explore: 'Explorează', whatsappMessage: 'Bună! Aș dori informații actuale despre mesele VIP din Milano. Mă puteți ajuta?',
  },
  sk: {
    vipTitle: 'Informácie o VIP stoloch', vipSubtitle: 'Fľaškový servis vo vybraných milánskych podnikoch',
    danceTitle: 'Vyrazte si zatancovať', danceSubtitle: 'Informácie o kluboch a DJ setoch s uvedeným dátumom',
    aperitivoTitle: 'Aperitív', aperitivoSubtitle: 'Otváracie hodiny, podniky a čo si objednať',
    conciergeTitle: 'Vyžiadajte si aktuálne informácie', conciergeSubtitle: 'Požiadajte o aktuálnu dostupnosť potvrdenú podnikom',
    explore: 'Preskúmať', whatsappMessage: 'Dobrý deň! Prosím o aktuálne informácie o VIP stoloch v Miláne. Môžete mi pomôcť?',
  },
  sl: {
    vipTitle: 'Informacije o VIP-mizah', vipSubtitle: 'Postrežba steklenic v izbranih milanskih lokalih',
    danceTitle: 'Pojdite plesat', danceSubtitle: 'Informacije o klubih in DJ-setih z navedenim datumom',
    aperitivoTitle: 'Aperitiv', aperitivoSubtitle: 'Odpiralni časi, lokali in kaj naročiti',
    conciergeTitle: 'Prosite za aktualne informacije', conciergeSubtitle: 'Prosite za trenutno razpoložljivost, ki jo potrdi lokal',
    explore: 'Raziščite', whatsappMessage: 'Pozdravljeni! Želim aktualne informacije o VIP-mizah v Milanu. Mi lahko pomagate?',
  },
  sv: {
    vipTitle: 'Information om VIP-bord', vipSubtitle: 'Flaskservice på utvalda ställen i Milano',
    danceTitle: 'Gå ut och dansa', danceSubtitle: 'Information om klubbar och DJ-set med angivet datum',
    aperitivoTitle: 'Aperitivo', aperitivoSubtitle: 'Öppettider, ställen och vad du kan beställa',
    conciergeTitle: 'Be om aktuell information', conciergeSubtitle: 'Be om aktuell tillgänglighet som bekräftats av stället',
    explore: 'Utforska', whatsappMessage: 'Hej! Jag vill ha aktuell information om VIP-bord i Milano. Kan ni hjälpa mig?',
  },
  no: {
    vipTitle: 'Informasjon om VIP-bord', vipSubtitle: 'Flaskeservice på utvalgte steder i Milano',
    danceTitle: 'Gå ut og dans', danceSubtitle: 'Informasjon om klubber og DJ-sett med angitt dato',
    aperitivoTitle: 'Aperitivo', aperitivoSubtitle: 'Åpningstider, steder og hva du kan bestille',
    conciergeTitle: 'Be om oppdatert informasjon', conciergeSubtitle: 'Be om oppdatert tilgjengelighet bekreftet av stedet',
    explore: 'Utforsk', whatsappMessage: 'Hei! Jeg ønsker oppdatert informasjon om VIP-bord i Milano. Kan dere hjelpe meg?',
  },
  is: {
    vipTitle: 'Upplýsingar um VIP-borð', vipSubtitle: 'Flöskuþjónusta á völdum stöðum í Mílanó',
    danceTitle: 'Farðu út að dansa', danceSubtitle: 'Upplýsingar um klúbba og DJ-sett á tilgreindum dagsetningum',
    aperitivoTitle: 'Aperitivo', aperitivoSubtitle: 'Opnunartímar, staðir og hvað á að panta',
    conciergeTitle: 'Biddu um nýjustu upplýsingar', conciergeSubtitle: 'Biddu um núverandi framboð staðfest af staðnum',
    explore: 'Skoða', whatsappMessage: 'Halló! Mig langar að fá nýjustu upplýsingar um VIP-borð í Mílanó. Getið þið aðstoðað mig?',
  },
  uk: {
    vipTitle: 'Інформація про VIP-столи', vipSubtitle: 'Пляшковий сервіс у вибраних закладах Мілана',
    danceTitle: 'Піти потанцювати', danceSubtitle: 'Інформація про клуби та DJ-сети із зазначеною датою',
    aperitivoTitle: 'Аперитив', aperitivoSubtitle: 'Години роботи, заклади та що замовити',
    conciergeTitle: 'Запитайте актуальну інформацію', conciergeSubtitle: 'Запитайте про актуальну наявність, підтверджену закладом',
    explore: 'Дізнатися більше', whatsappMessage: 'Вітаю! Хочу отримати актуальну інформацію про VIP-столи в Мілані. Можете допомогти?',
  },
  sq: {
    vipTitle: 'Informacion për tavolinat VIP', vipSubtitle: 'Shërbim me shishe në ambiente të përzgjedhura në Milano',
    danceTitle: 'Dilni për të kërcyer', danceSubtitle: 'Informacion për klubet dhe setet e DJ-ve me datë të përcaktuar',
    aperitivoTitle: 'Aperitiv', aperitivoSubtitle: 'Oraret, ambientet dhe çfarë të porositni',
    conciergeTitle: 'Kërkoni informacion të përditësuar', conciergeSubtitle: 'Kërkoni disponueshmëri aktuale të konfirmuar nga ambienti',
    explore: 'Eksploroni', whatsappMessage: 'Përshëndetje! Dua informacion të përditësuar për tavolinat VIP në Milano. A mund të më ndihmoni?',
  },
  sr: {
    vipTitle: 'Informacije o VIP stolovima', vipSubtitle: 'Usluga flaša u odabranim milanskim lokalima',
    danceTitle: 'Izađite na ples', danceSubtitle: 'Informacije o klubovima i DJ setovima sa navedenim datumom',
    aperitivoTitle: 'Aperitiv', aperitivoSubtitle: 'Radno vreme, lokali i šta naručiti',
    conciergeTitle: 'Zatražite aktuelne informacije', conciergeSubtitle: 'Zatražite trenutnu dostupnost potvrđenu od lokala',
    explore: 'Istražite', whatsappMessage: 'Zdravo! Želim aktuelne informacije o VIP stolovima u Milanu. Možete li mi pomoći?',
  },
  bs: {
    vipTitle: 'Informacije o VIP stolovima', vipSubtitle: 'Usluga boca u odabranim milanskim lokalima',
    danceTitle: 'Izađite na ples', danceSubtitle: 'Informacije o klubovima i DJ setovima s navedenim datumom',
    aperitivoTitle: 'Aperitiv', aperitivoSubtitle: 'Radno vrijeme, lokali i šta naručiti',
    conciergeTitle: 'Zatražite aktuelne informacije', conciergeSubtitle: 'Zatražite trenutnu dostupnost koju je potvrdio lokal',
    explore: 'Istražite', whatsappMessage: 'Zdravo! Želim aktuelne informacije o VIP stolovima u Milanu. Možete li mi pomoći?',
  },
  mk: {
    vipTitle: 'Информации за VIP маси', vipSubtitle: 'Услуга со шишиња во избрани места во Милано',
    danceTitle: 'Излезете на танцување', danceSubtitle: 'Информации за клубови и DJ сетови со наведен датум',
    aperitivoTitle: 'Аперитив', aperitivoSubtitle: 'Работно време, места и што да нарачате',
    conciergeTitle: 'Побарајте ажурирани информации', conciergeSubtitle: 'Побарајте тековна достапност потврдена од локалот',
    explore: 'Истражете', whatsappMessage: 'Здраво! Сакам ажурирани информации за VIP маси во Милано. Можете ли да ми помогнете?',
  },
};

export function getIntentCardsCopy(locale: string): IntentCardsCopy {
  return INTENT_CARDS_COPY[locale as LocaleCode] ?? INTENT_CARDS_COPY.en;
}
