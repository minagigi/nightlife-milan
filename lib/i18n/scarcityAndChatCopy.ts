import { appendPageUrlToWhatsAppMessage } from '@/lib/conciergeBooking';
import { isEnabledLocale, type LocaleCode } from './locales';

export type ScarcityAndChatStrings = {
  /** Badge breve per card e hero (es. "🔥 QUASI SOLD OUT · IN ESAURIMENTO") */
  almostSoldOutBadge: string;
  /** Badge compatto per le card degli hub (es. "🔥 IN ESAURIMENTO") */
  sellingFastBadge: string;
  /** Titolo dell'alert di urgenza */
  urgencyAlertTitle: string;
  /** Testo dell'alert di urgenza: i posti migliori stanno andando sold out, va fatto ora perché una volta esauriti non potranno essere fatti miracoli */
  urgencyAlertBody: string;
  /** Bottone principale sulle card degli Hub (porta prima alla scheda dell'evento) */
  openEventCardCta: string;
  /** Bottone prioritario Xceed quando esiste il link Xceed */
  xceedPriorityCta: string;
  /** Testo della chat flottante in basso a destra ("Vuoi prenotare per questo evento?") */
  floatingChatLabel: (eventName?: string) => string;
  /** Messaggio precompilato WhatsApp personalizzato per l'evento con link della pagina */
  floatingChatMessage: (eventName?: string, pageUrl?: string) => string;
};

const COPY: Record<LocaleCode, ScarcityAndChatStrings> = {
  it: {
    almostSoldOutBadge: '🔥 QUASI SOLD OUT · IN ESAURIMENTO',
    sellingFastBadge: '🔥 IN ESAURIMENTO',
    urgencyAlertTitle: '⚠️ ATTENZIONE · POSTI E TAVOLI MIGLIORI IN ESAURIMENTO',
    urgencyAlertBody:
      'I posti migliori, le prevendite e i tavoli VIP stanno andando sold out rapidamente. Se desideri acquistare biglietti, cenoni o riservare un tavolo ti consigliamo di farlo ora, perché una volta esauriti non potranno essere fatti miracoli.',
    openEventCardCta: 'Vai alla Scheda Evento & Prezzi →',
    xceedPriorityCta: 'Acquista Biglietti / Prenota su Xceed →',
    floatingChatLabel: (eventName) =>
      eventName ? `Vuoi prenotare per questo evento? (${eventName})` : 'Vuoi prenotare per questo evento?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Ciao Nightlife Milan! Vorrei prenotare (biglietti / lista / tavolo VIP) per l’evento: ${eventName}. Potete confermarmi disponibilità e prezzi aggiornati?`
        : 'Ciao Nightlife Milan! Vorrei prenotare biglietti o un tavolo VIP per questo evento a Milano. Potete confermarmi disponibilità e prezzi aggiornati?',
  },
  en: {
    almostSoldOutBadge: '🔥 ALMOST SOLD OUT · SELLING FAST',
    sellingFastBadge: '🔥 SELLING FAST',
    urgencyAlertTitle: '⚠️ HIGH DEMAND · BEST SPOTS & VIP TABLES ALMOST SOLD OUT',
    urgencyAlertBody:
      'The best spots, tickets, and VIP tables are selling out fast. If you want to buy tickets, gala dinners, or reserve a VIP table, do it now: once sold out, no miracles can be done at the last minute.',
    openEventCardCta: 'Open Event Guide & Prices →',
    xceedPriorityCta: 'Buy Tickets / Book on Xceed →',
    floatingChatLabel: (eventName) =>
      eventName ? `Want to book for this event? (${eventName})` : 'Want to book for this event?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Hi Nightlife Milan! I would like to book (tickets / guest list / VIP table) for the event: ${eventName}. Can you confirm current availability and prices?`
        : 'Hi Nightlife Milan! I would like to book tickets or a VIP table for this event in Milan. Can you confirm current availability and prices?',
  },
  es: {
    almostSoldOutBadge: '🔥 CASI AGOTADO · ÚLTIMAS PLAZAS',
    sellingFastBadge: '🔥 AGOTÁNDOSE',
    urgencyAlertTitle: '⚠️ ATENCIÓN · LAS MEJORES MESAS Y ENTRADAS SE ESTÁN AGOTANDO',
    urgencyAlertBody:
      'Los mejores sitios, entradas anticipadas y mesas VIP se están agotando rápidamente. Si quieres comprar entradas, cenas o reservar una mesa debes hacerlo ahora, porque una vez agotados no se podrán hacer milagros.',
    openEventCardCta: 'Ver Ficha del Evento y Precios →',
    xceedPriorityCta: 'Comprar Entradas / Reservar en Xceed →',
    floatingChatLabel: (eventName) =>
      eventName ? `¿Quieres reservar para este evento? (${eventName})` : '¿Quieres reservar para este evento?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `¡Hola Nightlife Milan! Quiero reservar (entradas / lista / mesa VIP) para el evento: ${eventName}. ¿Podéis confirmarme disponibilidad y precios?`
        : '¡Hola Nightlife Milan! Quiero reservar entradas o mesa VIP para este evento en Milán. ¿Podéis confirmarme disponibilidad y precios?',
  },
  fr: {
    almostSoldOutBadge: '🔥 PRESQUE COMPLET · DERNIÈRES PLACES',
    sellingFastBadge: '🔥 PRESQUE COMPLET',
    urgencyAlertTitle: '⚠️ ATTENTION · LES MEILLEURES PLACES ET TABLES VIP SONT PRESQUE COMPLÈTES',
    urgencyAlertBody:
      'Les meilleures places, préventes et tables VIP partent très vite. Si vous souhaitez acheter des billets, un dîner ou réserver une table, faites-le maintenant : une fois complet, aucun miracle ne sera possible.',
    openEventCardCta: 'Voir la Fiche Événement & Tarifs →',
    xceedPriorityCta: 'Acheter Billets / Réserver sur Xceed →',
    floatingChatLabel: (eventName) =>
      eventName ? `Vous voulez réserver pour cet événement ? (${eventName})` : 'Vous voulez réserver pour cet événement ?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Bonjour Nightlife Milan ! Je souhaite réserver (billets / guest list / table VIP) pour l’événement : ${eventName}. Pouvez-vous me confirmer les disponibilités et tarifs ?`
        : 'Bonjour Nightlife Milan ! Je souhaite réserver des billets ou une table VIP pour cet événement à Milan. Pouvez-vous me confirmer les disponibilités et tarifs ?',
  },
  de: {
    almostSoldOutBadge: '🔥 FAST AUSVERKAUFT · NUR NOCH WENIGE PLÄTZE',
    sellingFastBadge: '🔥 FAST AUSVERKAUFT',
    urgencyAlertTitle: '⚠️ ACHTUNG · DIE BESTEN PLÄTZE & VIP-TISCHE SIND FAST AUSVERKAUFT',
    urgencyAlertBody:
      'Die besten Plätze, Tickets und VIP-Tische sind schnell ausverkauft. Wenn Sie Tickets, Galadinner oder einen VIP-Tisch buchen möchten, tun Sie es jetzt: sobald alles ausverkauft ist, können keine Wunder mehr vollbracht werden.',
    openEventCardCta: 'Zur Event-Seite & Preisen →',
    xceedPriorityCta: 'Tickets kaufen / Auf Xceed buchen →',
    floatingChatLabel: (eventName) =>
      eventName ? `Möchten Sie für dieses Event buchen? (${eventName})` : 'Möchten Sie für dieses Event buchen?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Hallo Nightlife Milan! Ich möchte für das Event buchen (Tickets / Gästeliste / VIP-Tisch): ${eventName}. Können Sie mir Verfügbarkeit und Preise bestätigen?`
        : 'Hallo Nightlife Milan! Ich möchte Tickets oder einen VIP-Tisch für dieses Event in Mailand buchen. Können Sie mir Verfügbarkeit und Preise bestätigen?',
  },
  pt: {
    almostSoldOutBadge: '🔥 QUASE ESGOTADO · ÚLTIMOS LUGARES',
    sellingFastBadge: '🔥 QUASE ESGOTADO',
    urgencyAlertTitle: '⚠️ ATENÇÃO · OS MELHORES LUGARES E MESAS VIP ESTÃO QUASE ESGOTADOS',
    urgencyAlertBody:
      'Os melhores lugares, ingressos e mesas VIP estão esgotando rapidamente. Se quiser comprar ingressos, ceias ou reservar uma mesa, faça isso agora: depois de esgotados, não será possível fazer milagres.',
    openEventCardCta: 'Ver Página do Evento e Preços →',
    xceedPriorityCta: 'Comprar Ingressos / Reservar na Xceed →',
    floatingChatLabel: (eventName) =>
      eventName ? `Quer reservar para este evento? (${eventName})` : 'Quer reservar para este evento?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Olá Nightlife Milan! Gostaria de reservar (ingressos / lista / mesa VIP) para o evento: ${eventName}. Podem confirmar disponibilidade e preços?`
        : 'Olá Nightlife Milan! Gostaria de reservar ingressos ou mesa VIP para este evento em Milão. Podem confirmar disponibilidade e preços?',
  },
  nl: {
    almostSoldOutBadge: '🔥 BIJNA UITVERKOCHT · LAATSTE PLAATSEN',
    sellingFastBadge: '🔥 BIJNA UITVERKOCHT',
    urgencyAlertTitle: '⚠️ LET OP · DE BESTE PLAATSEN EN VIP-TAFELS RAKEN UITVERKOCHT',
    urgencyAlertBody:
      'De beste plaatsen, tickets en VIP-tafels raken snel uitverkocht. Als je tickets of een VIP-tafel wilt reserveren, doe dat dan nu: zodra het uitverkocht is, kunnen er geen wonderen meer worden verricht.',
    openEventCardCta: 'Bekijk Eventpagina & Prijzen →',
    xceedPriorityCta: 'Koop Tickets / Boek op Xceed →',
    floatingChatLabel: (eventName) =>
      eventName ? `Wil je reserveren voor dit evenement? (${eventName})` : 'Wil je reserveren voor dit evenement?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Hallo Nightlife Milan! Ik wil graag reserveren (tickets / gastenlijst / VIP-tafel) voor het evenement: ${eventName}. Kunnen jullie de beschikbaarheid en prijzen bevestigen?`
        : 'Hallo Nightlife Milan! Ik wil graag tickets of een VIP-tafel reserveren voor dit evenement in Milaan.',
  },
  ru: {
    almostSoldOutBadge: '🔥 ПОЧТИ РАСПРОДАНО · ПОСЛЕДНИЕ МЕСТА',
    sellingFastBadge: '🔥 ПОЧТИ РАСПРОДАНО',
    urgencyAlertTitle: '⚠️ ВНИМАНИЕ · ЛУЧШИЕ МЕСТА И VIP-СТОЛЫ ЗАКАНЧИВАЮТСЯ',
    urgencyAlertBody:
      'Лучшие места, билеты и VIP-столы быстро раскупаются. Если вы хотите купить билеты или забронировать стол, сделайте это сейчас: когда места закончатся, сотворить чудо уже не получится.',
    openEventCardCta: 'Открыть страницу события и цены →',
    xceedPriorityCta: 'Купить билеты / Бронь на Xceed →',
    floatingChatLabel: (eventName) =>
      eventName ? `Хотите забронировать на это событие? (${eventName})` : 'Хотите забронировать на это событие?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Здравствуйте, Nightlife Milan! Хочу забронировать (билеты / список гостей / VIP-стол) на мероприятие: ${eventName}. Подскажите наличие и цены?`
        : 'Здравствуйте, Nightlife Milan! Хочу забронировать билеты или VIP-стол на это мероприятие в Милане.',
  },
  tr: {
    almostSoldOutBadge: '🔥 TÜKENMEK ÜZERE · SON YERLER',
    sellingFastBadge: '🔥 TÜKENMEK ÜZERE',
    urgencyAlertTitle: '⚠️ DİKKAT · EN İYİ YERLER VE VIP MASALAR TÜKENİYOR',
    urgencyAlertBody:
      'En iyi yerler, biletler ve VIP masalar hızla tükeniyor. Bilet almak veya masa ayırtmak istiyorsanız şimdi yapmalısınız; yerler tükendikten sonra mucize yaratmak mümkün olmayacaktır.',
    openEventCardCta: 'Etkinlik Detayları ve Fiyatlar →',
    xceedPriorityCta: 'Xceed Üzerinden Bilet Al / Rezervasyon →',
    floatingChatLabel: (eventName) =>
      eventName ? `Bu etkinlik için rezervasyon yapmak ister misiniz? (${eventName})` : 'Bu etkinlik için rezervasyon yapmak ister misiniz?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Merhaba Nightlife Milan! Şu etkinlik için (bilet / giriş listesi / VIP masa) rezervasyon yapmak istiyorum: ${eventName}. Müsaitlik ve fiyatları teyit edebilir misiniz?`
        : 'Merhaba Nightlife Milan! Milano’daki bu etkinlik için bilet veya VIP masa rezervasyonu yapmak istiyorum.',
  },
  zh: {
    almostSoldOutBadge: '🔥 即将售罄 · 最后名额',
    sellingFastBadge: '🔥 即将售罄',
    urgencyAlertTitle: '⚠️ 注意 · 最佳位置与VIP卡座即将售罄',
    urgencyAlertBody:
      '最佳位置、门票和VIP卡座正在迅速售罄。如果您想购买门票、晚宴或预订VIP卡座，请立即行动 -  - 一旦售罄，临时将无法再创造奇迹。',
    openEventCardCta: '查看活动详情与价格 →',
    xceedPriorityCta: '在 Xceed 购票 / 预订 →',
    floatingChatLabel: (eventName) =>
      eventName ? `想预订此活动吗？(${eventName})` : '想预订此活动吗？',
    floatingChatMessage: (eventName) =>
      eventName
        ? `您好 Nightlife Milan！我想预订此活动的门票 / 嘉宾名单 / VIP卡座：${eventName}。请问目前还有位置和价格吗？`
        : '您好 Nightlife Milan！我想预订米兰此活动的门票或VIP卡座。',
  },
  ar: {
    almostSoldOutBadge: '🔥 أوشكت على النفاد · آخر الأماكن',
    sellingFastBadge: '🔥 أوشكت على النفاد',
    urgencyAlertTitle: '⚠️ تنبيه · أفضل الأماكن وطاولات VIP أوشكت على النفاد',
    urgencyAlertBody:
      'أفضل الأماكن والتذاكر وطاولات VIP تنفد بسرعة. إذا كنت ترغب في شراء التذاكر أو حجز طاولة، يجب القيام بذلك الآن: فبمجرد نفادها لن يكون بالإمكان صنع المعجزات.',
    openEventCardCta: 'عرض تفاصيل الفعالية والأسعار ←',
    xceedPriorityCta: 'شراء التذاكر / الحجز عبر Xceed ←',
    floatingChatLabel: (eventName) =>
      eventName ? `هل ترغب في الحجز لهذه الفعالية؟ (${eventName})` : 'هل ترغب في الحجز لهذه الفعالية؟',
    floatingChatMessage: (eventName) =>
      eventName
        ? `مرحبًا Nightlife Milan! أود حجز (تذاكر / قائمة الدخول / طاولة VIP) لفعالية: ${eventName}. هل يمكنكم تأكيد التوافر والأسعار؟`
        : 'مرحبًا Nightlife Milan! أود حجز تذاكر أو طاولة VIP لهذه الفعالية في ميلانو.',
  },
  bg: {
    almostSoldOutBadge: '🔥 ПОЧТИ ИЗЧЕРПАНО · ПОСЛЕДНИ МЕСТА',
    sellingFastBadge: '🔥 В ИЗЧЕРПВАНЕ',
    urgencyAlertTitle: '⚠️ ВНИМАНИЕ · НАЙ-ДОБРИТЕ МЕСТА И VIP МАСИ СЕ ИЗЧЕРПВАТ',
    urgencyAlertBody:
      'Най-добрите места, билети и VIP маси се разпродават бързо. Ако искате да закупите билети или да резервирате маса, направете го сега: след изчерпване чудеса не са възможни.',
    openEventCardCta: 'Към събитието и цените →',
    xceedPriorityCta: 'Купи билети / Резервирай в Xceed →',
    floatingChatLabel: (eventName) =>
      eventName ? `Искате ли да резервирате за това събитие? (${eventName})` : 'Искате ли да резервирате за това събитие?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Здравейте Nightlife Milan! Искам да резервирам за събитието: ${eventName}. Може ли наличност и цени?`
        : 'Здравейте Nightlife Milan! Искам да резервирам билети или VIP маса за това събитие в Милано.',
  },
  hr: {
    almostSoldOutBadge: '🔥 SKORO RASPRODANO · ZADNJA MJESTA',
    sellingFastBadge: '🔥 U ISTEKNUĆU',
    urgencyAlertTitle: '⚠️ PAŽNJA · NAJBOLJA MJESTA I VIP STOLOVI SE BRZO RASPRODAJU',
    urgencyAlertBody:
      'Najbolja mjesta, ulaznice i VIP stolovi brzo planu. Ako želite kupiti ulaznice ili rezervirati stol, učinite to sada: kad se rasprodaju, čuda više nisu moguća.',
    openEventCardCta: 'Detalji događaja i cijene →',
    xceedPriorityCta: 'Kupi ulaznice / Rezerviraj na Xceed →',
    floatingChatLabel: (eventName) =>
      eventName ? `Želite li rezervirati za ovaj događaj? (${eventName})` : 'Želite li rezervirati za ovaj događaj?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Pozdrav Nightlife Milan! Želim rezervirati (ulaznice / popis gostiju / VIP stol) za događaj: ${eventName}. Možete li potvrditi dostupnost i cijene?`
        : 'Pozdrav Nightlife Milan! Želim rezervirati ulaznice ili VIP stol za ovaj događaj u Milanu.',
  },
  cs: {
    almostSoldOutBadge: '🔥 TÉMĚŘ VYPRODÁNO · POSLEDNÍ MÍSTA',
    sellingFastBadge: '🔥 TÉMĚŘ VYPRODÁNO',
    urgencyAlertTitle: '⚠️ POZOR · NEJLEPŠÍ MÍSTA A VIP STOLY SE RYCHLE VYPRODÁVAJÍ',
    urgencyAlertBody:
      'Nejlepší místa, vstupenky a VIP stoly mizí velmi rychle. Pokud chcete koupit vstupenky nebo rezervovat stůl, udělejte to hned: po vyprodání už zázraky dělat nelze.',
    openEventCardCta: 'Detail akce a ceny →',
    xceedPriorityCta: 'Koupit vstupenky / Xceed →',
    floatingChatLabel: (eventName) =>
      eventName ? `Chcete rezervovat na tuto akci? (${eventName})` : 'Chcete rezervovat na tuto akci?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Dobrý den Nightlife Milan! Chci rezervovat (vstupenky / guest list / VIP stůl) na akci: ${eventName}. Můžete mi potvrdit dostupnost a ceny?`
        : 'Dobrý den Nightlife Milan! Chci rezervovat vstupenky nebo VIP stůl na tuto akci v Miláně.',
  },
  da: {
    almostSoldOutBadge: '🔥 NÆSTEN UDSOLGT · FÅ PLADSER',
    sellingFastBadge: '🔥 NÆSTEN UDSOLGT',
    urgencyAlertTitle: '⚠️ BEMÆRK · DE BEDSTE PLADSER OG VIP-BORDE ER VED AT VÆRE UDSOLGT',
    urgencyAlertBody:
      'De bedste pladser, billetter og VIP-borde bliver hurtigt udsolgt. Hvis du vil købe billetter eller reservere et bord, skal det gøres nu: når der er udsolgt, kan der ikke gøres mirakler.',
    openEventCardCta: 'Se eventdetaljer og priser →',
    xceedPriorityCta: 'Køb billetter / Book på Xceed →',
    floatingChatLabel: (eventName) =>
      eventName ? `Vil du booke til dette event? (${eventName})` : 'Vil du booke til dette event?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Hej Nightlife Milan! Jeg vil gerne booke (billetter / gjesteliste / VIP-bord) til eventet: ${eventName}. Kan I bekræfte ledighed og priser?`
        : 'Hej Nightlife Milan! Jeg vil gerne booke billetter eller VIP-bord til dette event i Milano.',
  },
  et: {
    almostSoldOutBadge: '🔥 PEAAEGU VÄLJA MÜÜDUD',
    sellingFastBadge: '🔥 LÕPPEMAS',
    urgencyAlertTitle: '⚠️ TÄHELEPANU · PARIMAD KOHAD JA VIP-LAUAD ON LÕPPEMAS',
    urgencyAlertBody:
      'Parimad kohad, piletid ja VIP-lauad müüakse kiiresti läbi. Kui soovid osta pileteid või broneerida lauda, tee seda kohe: kui kohad on otsas, ei saa enam imesid teha.',
    openEventCardCta: 'Vaata ürituse infot ja hindu →',
    xceedPriorityCta: 'Osta piletid / Broneeri Xceedis →',
    floatingChatLabel: (eventName) =>
      eventName ? `Kas soovid sellele üritusele broneerida? (${eventName})` : 'Kas soovid sellele üritusele broneerida?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Tere Nightlife Milan! Soovin broneerida (piletid / külalistenimekiri / VIP-laud) üritusele: ${eventName}.`
        : 'Tere Nightlife Milan! Soovin broneerida pileteid või VIP-lauda sellele üritusele Milanos.',
  },
  fi: {
    almostSoldOutBadge: '🔥 MELKEIN LOPPUUNMYYTY',
    sellingFastBadge: '🔥 LOPPUUNMYYNTI LÄHELLÄ',
    urgencyAlertTitle: '⚠️ HUOMIO · PARHAAT PAIKAT JA VIP-PÖYDÄT MYYDÄÄN LOPPUUN',
    urgencyAlertBody:
      'Parhaat paikat, liput ja VIP-pöydät myydään nopeasti loppuun. Jos haluat ostaa liput tai varata pöydän, tee se nyt: kun paikat loppuvat, ihmeitä ei voida enää tehdä.',
    openEventCardCta: 'Katso tapahtuman tiedot ja hinnat →',
    xceedPriorityCta: 'Osta liput / Varaa Xceedissä →',
    floatingChatLabel: (eventName) =>
      eventName ? `Haluatko varata tähän tapahtumaan? (${eventName})` : 'Haluatko varata tähän tapahtumaan?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Hei Nightlife Milan! Haluaisin varata (liput / vieraslista / VIP-pöydän) tapahtumaan: ${eventName}.`
        : 'Hei Nightlife Milan! Haluaisin varata liput tai VIP-pöydän tähän tapahtumaan Milanossa.',
  },
  el: {
    almostSoldOutBadge: '🔥 ΣΧΕΔΟΝ ΕΞΑΝΤΛΗΜΕΝΑ · ΤΕΛΕΥΤΑΙΕΣ ΘΕΣΕΙΣ',
    sellingFastBadge: '🔥 ΕΞΑΝΤΛΟΥΝΤΑΙ',
    urgencyAlertTitle: '⚠️ ΠΡΟΣΟΧΗ · ΟΙ ΚΑΛΥΤΕΡΕΣ ΘΕΣΕΙΣ ΚΑΙ ΤΑ VIP ΤΡΑΠΕΖΙΑ ΕΞΑΝΤΛΟΥΝΤΑΙ',
    urgencyAlertBody:
      'Οι καλύτερες θέσεις, τα εισιτήρια και τα VIP τραπέζια εξαντλούνται γρήγορα. Αν θέλετε να αγοράσετε εισιτήρια ή να κλείσετε τραπέζι, κάντε το τώρα: μόλις εξαντληθούν δεν μπορούν να γίνουν θαύματα.',
    openEventCardCta: 'Δείτε την εκδήλωση & τιμές →',
    xceedPriorityCta: 'Αγορά Εισιτηρίων / Κράτηση στο Xceed →',
    floatingChatLabel: (eventName) =>
      eventName ? `Θέλετε να κάνετε κράτηση για αυτή την εκδήλωση; (${eventName})` : 'Θέλετε να κάνετε κράτηση για αυτή την εκδήλωση;',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Γεια σας Nightlife Milan! Θα ήθελα να κάνω κράτηση (εισιτήρια / λίστα εισόδου / VIP τραπέζι) για την εκδήλωση: ${eventName}.`
        : 'Γεια σας Nightlife Milan! Θα ήθελα να κάνω κράτηση για αυτή την εκδήλωση στο Μιλάνο.',
  },
  hu: {
    almostSoldOutBadge: '🔥 MAJDNEM TELTHÁZ · UTOLSÓ HELYEK',
    sellingFastBadge: '🔥 FOGYÓBAN',
    urgencyAlertTitle: '⚠️ FIGYELEM · A LEGJOBB HELYEK ÉS VIP ASZTALOK GYORSAN FOGYNAK',
    urgencyAlertBody:
      'A legjobb helyek, elővételes jegyek és VIP asztalok gyorsan elfogynak. Ha jegyet vagy VIP asztalt szeretnél foglalni, tedd meg most: teltház után már nem tudunk csodát tenni.',
    openEventCardCta: 'Esemény részletei és árak →',
    xceedPriorityCta: 'Jegyvásárlás / Foglalás Xceeden →',
    floatingChatLabel: (eventName) =>
      eventName ? `Szeretnél foglalni erre az eseményre? (${eventName})` : 'Szeretnél foglalni erre az eseményre?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Szia Nightlife Milan! Szeretnék foglalni (jegyek / vendéglista / VIP asztal) erre az eseményre: ${eventName}.`
        : 'Szia Nightlife Milan! Szeretnék jegyet vagy VIP asztalt foglalni erre a milánói eseményre.',
  },
  ga: {
    almostSoldOutBadge: '🔥 BEAGNACH DÍOLTA AMACH',
    sellingFastBadge: '🔥 AG DÍOL GO TAPA',
    urgencyAlertTitle: '⚠️ FÓGairt · NA HÁITEANNA IS FEARR AG DÍOL AMACH GO TAPA',
    urgencyAlertBody:
      'Tá na háiteanna is fearr, ticéid agus boird VIP ag díol amach go tapa. Más mian leat ticéid a cheannach nó bord a chur in áirithe, déan anois é: nuair a bheidh siad díolta amach ní féidir míorúiltí a dhéanamh.',
    openEventCardCta: 'Féach Eolas & Praghsanna →',
    xceedPriorityCta: 'Ceannaigh Ticéid ar Xceed →',
    floatingChatLabel: (eventName) =>
      eventName ? `Ar mhaith leat áirithint a dhéanamh don imeacht seo? (${eventName})` : 'Ar mhaith leat áirithint a dhéanamh don imeacht seo?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Dia duit Nightlife Milan! Ba mhaith liom áirithint a dhéanamh don imeacht: ${eventName}.`
        : 'Dia duit Nightlife Milan! Ba mhaith liom ticéid nó bord VIP a chur in áirithe don imeacht seo i Milano.',
  },
  lv: {
    almostSoldOutBadge: '🔥 GANDRĪZ IZPĀRDOTS · PĒDĒJĀS VIETAS',
    sellingFastBadge: '🔥 GANDRĪZ IZPĀRDOTS',
    urgencyAlertTitle: '⚠️ UZMANĪBU · LABĀKĀS VIETAS UN VIP GALDIŅI ĀTRI BEIDZAS',
    urgencyAlertBody:
      'Labākās vietas, biļetes un VIP galdiņi tiek ātri izpārdoti. Ja vēlaties iegādāties biļetes vai rezervēt galdiņu, dariet to tagad: kad vietas būs izpārdotas, brīnumus vairs nebūs iespējams paveikt.',
    openEventCardCta: 'Skatīt pasākumu un cenas →',
    xceedPriorityCta: 'Pirkt biļetes / Xceed →',
    floatingChatLabel: (eventName) =>
      eventName ? `Vēlaties rezervēt šim pasākumam? (${eventName})` : 'Vēlaties rezervēt šim pasākumam?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Sveiki Nightlife Milan! Vēlos rezervēt (biļetes / viesu sarakstu / VIP galdiņu) pasākumam: ${eventName}.`
        : 'Sveiki Nightlife Milan! Vēlos rezervēt biļetes vai VIP galdiņu šim pasākumam Milānā.',
  },
  lt: {
    almostSoldOutBadge: '🔥 BEVEIK IŠPARDUOTA · PASKUTINĖS VIETOS',
    sellingFastBadge: '🔥 BEVEIK IŠPARDUOTA',
    urgencyAlertTitle: '⚠️ DĖMESIO · GERIAUSIOS VIETOS IR VIP STALIUKAI GREITAI IŠPERKAMI',
    urgencyAlertBody:
      'Geriausios vietos, bilietai ir VIP staliukai greitai išperkami. Jei norite įsigyti bilietus ar rezervuoti staliuką, padarykite tai dabar: kai vietos baigsis, stebuklų padaryti nebegalėsime.',
    openEventCardCta: 'Renginio informacija ir kainos →',
    xceedPriorityCta: 'Pirkti bilietus / Xceed →',
    floatingChatLabel: (eventName) =>
      eventName ? `Norite rezervuoti šiam renginiui? (${eventName})` : 'Norite rezervuoti šiam renginiui?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Sveiki Nightlife Milan! Norėčiau rezervuoti (bilietus / svečių sąrašą / VIP staliuką) renginiui: ${eventName}.`
        : 'Sveiki Nightlife Milan! Norėčiau rezervuoti bilietus arba VIP staliuką šiam renginiui Milane.',
  },
  mt: {
    almostSoldOutBadge: '🔥 KWAŻI SOLD OUT · L-AĦĦAR POSTIJIET',
    sellingFastBadge: '🔥 KWAŻI SOLD OUT',
    urgencyAlertTitle: '⚠️ ATTENZJONI · L-AĦJAR POSTIJIET U IMWEJJED VIP QED JISPIĊĊAW',
    urgencyAlertBody:
      'L-aħjar postijiet, biljetti u imwejjed VIP qed jinbiegħu malajr. Jekk trid tixtri biljetti jew tibbukkja mejda, agħmel dan issa: ladarba jispiċċaw ma jkunux jistgħu jsiru mirakli.',
    openEventCardCta: 'Ara d-Dettalji u l-Prezzijiet →',
    xceedPriorityCta: 'Ixtri Biljetti fuq Xceed →',
    floatingChatLabel: (eventName) =>
      eventName ? `Trid tibbukkja għal dan l-avveniment? (${eventName})` : 'Trid tibbukkja għal dan l-avveniment?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Bongu Nightlife Milan! Nixtieq nibbukkja għall-avveniment: ${eventName}.`
        : 'Bongu Nightlife Milan! Nixtieq nibbukkja biljetti jew mejda VIP għal dan l-avveniment f’Milan.',
  },
  pl: {
    almostSoldOutBadge: '🔥 PRAWIE WYPRZEDANE · OSTATNIE MIEJSCA',
    sellingFastBadge: '🔥 KOŃCÓWKA MIEJSC',
    urgencyAlertTitle: '⚠️ UWAGA · NAJLEPSZE MIEJSCA I STOLIKI VIP SZYBKO SIĘ WYPRZEDAJĄ',
    urgencyAlertBody:
      'Najlepsze miejsca, bilety i stoliki VIP wyprzedają się błyskawicznie. Jeśli chcesz kupić bilety, kolację lub zarezerwować stolik, zrób to teraz: po wyprzedaniu miejsc nie będziemy w stanie zdziałać cudów.',
    openEventCardCta: 'Zobacz szczegóły i ceny →',
    xceedPriorityCta: 'Kup bilety / Rezerwuj na Xceed →',
    floatingChatLabel: (eventName) =>
      eventName ? `Chcesz zarezerwować na to wydarzenie? (${eventName})` : 'Chcesz zarezerwować na to wydarzenie?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Cześć Nightlife Milan! Chcę zarezerwować (bilety / listę gości / stolik VIP) na wydarzenie: ${eventName}. Czy możecie potwierdzić dostępność i ceny?`
        : 'Cześć Nightlife Milan! Chcę zarezerwować bilety lub stolik VIP na to wydarzenie w Mediolanie.',
  },
  ro: {
    almostSoldOutBadge: '🔥 APROAPE EPUIZAT · ULTIMELE LOCURI',
    sellingFastBadge: '🔥 ÎN CURS DE EPUIZARE',
    urgencyAlertTitle: '⚠️ ATENȚIE · CELE MAI BUNE LOCURI ȘI MESE VIP SE EPUIZEAZĂ RAPID',
    urgencyAlertBody:
      'Cele mai bune locuri, biletele și mesele VIP se vând foarte repede. Dacă dorești să cumperi bilete, revelionul sau să rezervi o masă VIP, fă-o acum: odată epuizate, nu se mai pot face miracole.',
    openEventCardCta: 'Vezi Detalii Eveniment & Prețuri →',
    xceedPriorityCta: 'Cumpără Bilete / Rezervă pe Xceed →',
    floatingChatLabel: (eventName) =>
      eventName ? `Vrei să rezervi pentru acest eveniment? (${eventName})` : 'Vrei să rezervi pentru acest eveniment?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Salut Nightlife Milan! Aș dori să rezerv (bilete / listă / masă VIP) pentru evenimentul: ${eventName}. Îmi puteți confirma disponibilitatea și prețurile?`
        : 'Salut Nightlife Milan! Aș dori să rezerv bilete sau o masă VIP pentru acest eveniment în Milano.',
  },
  sk: {
    almostSoldOutBadge: '🔥 TAKMER VYPREDANÉ · POSLEDNÉ MIESTA',
    sellingFastBadge: '🔥 TAKMER VYPREDANÉ',
    urgencyAlertTitle: '⚠️ POZOR · NAJLEPŠIE MIESTA A VIP STOLY SA RÝCHLO VYPREDÁVAJÚ',
    urgencyAlertBody:
      'Najlepšie miesta, vstupenky a VIP stoly sa rýchlo míňajú. Ak si chcete kúpiť vstupenky alebo rezervovať stôl, urobte to teraz: po vypredaní už zázraky robiť nemožno.',
    openEventCardCta: 'Detail podujatia a ceny →',
    xceedPriorityCta: 'Kúpiť vstupenky / Xceed →',
    floatingChatLabel: (eventName) =>
      eventName ? `Chcete si rezervovať na toto podujatie? (${eventName})` : 'Chcete si rezervovať na toto podujatie?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Dobrý deň Nightlife Milan! Chcem si rezervovať (vstupenky / guest list / VIP stôl) na podujatie: ${eventName}.`
        : 'Dobrý deň Nightlife Milan! Chcem si rezervovať vstupenky alebo VIP stôl na toto podujatie v Miláne.',
  },
  sl: {
    almostSoldOutBadge: '🔥 SKORAJ RAZPRODANO · ZADNJA MESTA',
    sellingFastBadge: '🔥 SKORAJ RAZPRODANO',
    urgencyAlertTitle: '⚠️ POZOR · NAJBOLJŠA MESTA IN VIP MIZE GREDO HITRO V PROMET',
    urgencyAlertBody:
      'Najboljša mesta, vstopnice in VIP mize se hitro razprodajo. Če želite kupiti vstopnice ali rezervirati mizo, storite to zdaj: ko bodo mesta razprodana, čudežev ne bo več mogoče delati.',
    openEventCardCta: 'Podrobnosti dogodka in cene →',
    xceedPriorityCta: 'Kupi vstopnice / Xceed →',
    floatingChatLabel: (eventName) =>
      eventName ? `Želite rezervirati za ta dogodek? (${eventName})` : 'Želite rezervirati za ta dogodek?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Pozdravljeni Nightlife Milan! Želim rezervirati (vstopnice / seznam gostov / VIP mizo) za dogodek: ${eventName}.`
        : 'Pozdravljeni Nightlife Milan! Želim rezervirati vstopnice ali VIP mizo za ta dogodek v Milanu.',
  },
  sv: {
    almostSoldOutBadge: '🔥 NÄSTAN SLUTSÅLT · FÅ PLATSER KVAR',
    sellingFastBadge: '🔥 NÄSTAN SLUTSÅLT',
    urgencyAlertTitle: '⚠️ OBS · DE BÄSTA PLATSERNA OCH VIP-BORDEN TAR SNART SLUT',
    urgencyAlertBody:
      'De bästa platserna, biljetterna och VIP-borden säljer slut snabbt. Om du vill köpa biljetter eller boka ett VIP-bord, gör det nu: när det är slutsålt kan inga mirakel göras.',
    openEventCardCta: 'Se eventguide & priser →',
    xceedPriorityCta: 'Köp biljetter / Boka på Xceed →',
    floatingChatLabel: (eventName) =>
      eventName ? `Vill du boka till detta evenemang? (${eventName})` : 'Vill du boka till detta evenemang?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Hej Nightlife Milan! Jag vill boka (biljetter / gästlista / VIP-bord) till evenemanget: ${eventName}.`
        : 'Hej Nightlife Milan! Jag vill boka biljetter eller VIP-bord till detta evenemang i Milano.',
  },
  no: {
    almostSoldOutBadge: '🔥 NESTEN UTSOLGT · FÅ PLASSER IGJEN',
    sellingFastBadge: '🔥 NESTEN UTSOLGT',
    urgencyAlertTitle: '⚠️ OBS · DE BESTE PLASSENE OG VIP-BORDENE BLIR RASKT UTSOLGT',
    urgencyAlertBody:
      'De beste plassene, billettene og VIP-bordene selges raskt ut. Hvis du vil kjøpe billetter eller reservere bord, gjør det nå: når det er utsolgt, kan det ikke gjøres mirakler.',
    openEventCardCta: 'Se arrangement & priser →',
    xceedPriorityCta: 'Kjøp billetter / Bestill på Xceed →',
    floatingChatLabel: (eventName) =>
      eventName ? `Vil du bestille til dette arrangementet? (${eventName})` : 'Vil du bestille til dette arrangementet?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Hei Nightlife Milan! Jeg vil gjerne bestille (billetter / gjesteliste / VIP-bord) til arrangementet: ${eventName}.`
        : 'Hei Nightlife Milan! Jeg vil gjerne bestille billetter eller VIP-bord til dette arrangementet i Milano.',
  },
  is: {
    almostSoldOutBadge: '🔥 NÆSTUM UPPSELT · FÁ SÆTI EFTIR',
    sellingFastBadge: '🔥 NÆSTUM UPPSELT',
    urgencyAlertTitle: '⚠️ ATHUGIÐ · BESTU SÆTIN OG VIP-BORÐIN ERU AÐ SELJAST UPP',
    urgencyAlertBody:
      'Bestu sætin, miðarnir og VIP-borðin seljast hratt upp. Ef þú vilt kaupa miða eða bóka borð skaltu gera það núna: þegar uppselt er verða engin kraftaverk gerð.',
    openEventCardCta: 'Skoða viðburð og verð →',
    xceedPriorityCta: 'Kaupa miða á Xceed →',
    floatingChatLabel: (eventName) =>
      eventName ? `Viltu bóka á þennan viðburð? (${eventName})` : 'Viltu bóka á þennan viðburð?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Hæ Nightlife Milan! Ég vil bóka (miða / gestalista / VIP-borð) á viðburðinn: ${eventName}.`
        : 'Hæ Nightlife Milan! Ég vil bóka miða eða VIP-borð á þennan viðburð í Mílanó.',
  },
  uk: {
    almostSoldOutBadge: '🔥 МАЙЖЕ РОЗПРОДАНО · ОСТАННІ МІСЦЯ',
    sellingFastBadge: '🔥 МАЙЖЕ РОЗПРОДАНО',
    urgencyAlertTitle: '⚠️ УВАГА · НАЙКРАЩІ МІСЦЯ ТА VIP-СТОЛИ ШВИДКО ЗАКІНЧУЮТЬСЯ',
    urgencyAlertBody:
      'Найкращі місця, квитки та VIP-столи швидко розкуповуються. Якщо ви хочете придбати квитки або забронювати стіл, зробіть це зараз: коли місця закінчаться, дива вже не станеться.',
    openEventCardCta: 'Деталі події та ціни →',
    xceedPriorityCta: 'Купити квитки / Xceed →',
    floatingChatLabel: (eventName) =>
      eventName ? `Хочете забронювати на цю подію? (${eventName})` : 'Хочете забронювати на цю подію?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Вітаю Nightlife Milan! Хочу забронювати (квитки / список гостей / VIP-стіл) на подію: ${eventName}.`
        : 'Вітаю Nightlife Milan! Хочу забронювати квитки або VIP-стіл на цю подію в Мілані.',
  },
  sq: {
    almostSoldOutBadge: '🔥 SHUMË PRANË SOLD OUT · VENDET E FUNDIT',
    sellingFastBadge: '🔥 NË MBARIM',
    urgencyAlertTitle: '⚠️ KUJDES · VENDET DHE TAVOLINAT VIP MË TË MIRA PO MBAROJNË',
    urgencyAlertBody:
      'Vendet më të mira, biletat dhe tavolinat VIP po shiten me shpejtësi. Nëse dëshironi të blini bileta ose të rezervoni një tavolinë, bëjeni tani: kur të mbarojnë nuk mund të bëhen mrekulli.',
    openEventCardCta: 'Shiko Detajet e Eventit & Çmimet →',
    xceedPriorityCta: 'Bli Bileta / Rezervo në Xceed →',
    floatingChatLabel: (eventName) =>
      eventName ? `Dëshiron të rezervosh për këtë event? (${eventName})` : 'Dëshiron të rezervosh për këtë event?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Përshëndetje Nightlife Milan! Dëshiroj të rezervoj (bileta / listë / tavolinë VIP) për eventin: ${eventName}.`
        : 'Përshëndetje Nightlife Milan! Dëshiroj të rezervoj bileta ose tavolinë VIP për këtë event në Milano.',
  },
  sr: {
    almostSoldOutBadge: '🔥 SKORO RASPRODATO · POSLEDNJA MESTA',
    sellingFastBadge: '🔥 PRI KRAJU ZALIHA',
    urgencyAlertTitle: '⚠️ PAŽNJA · NAJBOLJA MESTA I VIP STOLOVI SE BRZO RASPRODAJU',
    urgencyAlertBody:
      'Najbolja mesta, karte i VIP stolovi odlaze veoma brzo. Ako želite da kupite karte ili rezervišete sto, uradite to sada: kada se rasprodaju, čuda više nisu moguća.',
    openEventCardCta: 'Detalji događaja i cene →',
    xceedPriorityCta: 'Kupi karte / Rezerviši na Xceed →',
    floatingChatLabel: (eventName) =>
      eventName ? `Želite da rezervišete za ovaj događaj? (${eventName})` : 'Želite da rezervišete za ovaj događaj?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Pozdrav Nightlife Milan! Želim da rezervišem (karte / listu gostiju / VIP sto) za događaj: ${eventName}.`
        : 'Pozdrav Nightlife Milan! Želim da rezervišem karte ili VIP sto za ovaj događaj u Milanu.',
  },
  bs: {
    almostSoldOutBadge: '🔥 SKORO RASPRODANO · ZADNJA MJESTA',
    sellingFastBadge: '🔥 PRI KRAJU',
    urgencyAlertTitle: '⚠️ PAŽNJA · NAJBOLJA MJESTA I VIP STOLOVI SE BRZO RASPRODAJU',
    urgencyAlertBody:
      'Najbolja mjesta, ulaznice i VIP stolovi brzo se rasprodaju. Ako želite kupiti ulaznice ili rezervisati sto, uradite to sada: nakon što se rasprodaju, čuda nisu moguća.',
    openEventCardCta: 'Detalji događaja i cijene →',
    xceedPriorityCta: 'Kupi ulaznice / Rezerviši na Xceed →',
    floatingChatLabel: (eventName) =>
      eventName ? `Želite li rezervisati za ovaj događaj? (${eventName})` : 'Želite li rezervisati za ovaj događaj?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Pozdrav Nightlife Milan! Želim rezervisati (ulaznice / listu gostiju / VIP sto) za događaj: ${eventName}.`
        : 'Pozdrav Nightlife Milan! Želim rezervisati ulaznice ili VIP sto za ovaj događaj u Milanu.',
  },
  mk: {
    almostSoldOutBadge: '🔥 СКОРО РАСПРОДАДЕНО · ПОСЛЕДНИ МЕСТА',
    sellingFastBadge: '🔥 ПРЕД ИСЦРПУВАЊЕ',
    urgencyAlertTitle: '⚠️ ВНИМАНИЕ · НАЈДОБРИТЕ МЕСТА И VIP МАСИ БРЗО СЕ РАСПРОДАВААТ',
    urgencyAlertBody:
      'Најдобрите места, билети и VIP маси брзо се трошат. Ако сакате да купите билети или да резервирате маса, направете го тоа сега: откако ќе се распродадат, чуда не се возможни.',
    openEventCardCta: 'Детали за настанот и цени →',
    xceedPriorityCta: 'Купи билети / Резервирај на Xceed →',
    floatingChatLabel: (eventName) =>
      eventName ? `Сакате да резервирате за овој настан? (${eventName})` : 'Сакате да резервирате за овој настан?',
    floatingChatMessage: (eventName) =>
      eventName
        ? `Здраво Nightlife Milan! Сакам да резервирам (билети / листа на гости / VIP маса) за настанот: ${eventName}.`
        : 'Здраво Nightlife Milan! Сакам да резервирам билети или VIP маса за овој настан во Милано.',
  },
};

export function getScarcityAndChatCopy(locale: string, defaultPageUrl?: string): ScarcityAndChatStrings {
  const code = isEnabledLocale(locale) ? locale : 'en';
  const entry = COPY[code] || COPY.en;
  return {
    ...entry,
    floatingChatMessage: (eventName?: string, pageUrl?: string) =>
      appendPageUrlToWhatsAppMessage(entry.floatingChatMessage(eventName, pageUrl), pageUrl ?? defaultPageUrl, code),
  };
}
