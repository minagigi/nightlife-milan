import { SITE_CONTACT } from '@/config/contact';
import {
  DEFAULT_LOCALE,
  ENABLED_LOCALES,
  isEnabledLocale,
  localePrefix,
  type LocaleCode,
} from '@/lib/i18n/localeRegistry';
import { canonicalPageUrl } from '@/lib/i18n/locales';

export const SITE_ORIGIN = 'https://nightlifemilan.com';

export interface WhatsAppBookingFormInput {
  context: string;
  date?: string;
  guests: string;
  name: string;
  email: string;
}

export interface WhatsAppLocalePack {
  pageLabel: string;
  defaultMessage: string;
  contextMessage: (context: string) => string;
  bookingEventSubject: (eventName: string) => string;
  bookingVenueSubject: (venueName: string) => string;
  bookingFormMessage: (input: WhatsAppBookingFormInput) => string;
}

export const WHATSAPP_LOCALE_PACKS: Record<LocaleCode, WhatsAppLocalePack> = {
  en: {
    pageLabel: 'Page',
    defaultMessage: 'Hi Nightlife Milan! I would like info and availability to book a VIP table or guest list in Milan.',
    contextMessage: (context) => `Hi Nightlife Milan! I would like info and availability for: ${context}.`,
    bookingEventSubject: (eventName) => `the event "${eventName}"`,
    bookingVenueSubject: (venueName) => `a VIP table at ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Hi Nightlife Milan! I'd like to book ${context}${date ? ` for ${date}` : ''} for ${guests} guests. Name: ${name} (${email}). Can you confirm availability?`,
  },
  it: {
    pageLabel: 'Pagina',
    defaultMessage: 'Ciao Nightlife Milan! Vorrei informazioni e disponibilità per prenotare un tavolo VIP o una lista a Milano.',
    contextMessage: (context) => `Ciao Nightlife Milan! Vorrei informazioni e disponibilità per: ${context}.`,
    bookingEventSubject: (eventName) => `l'evento "${eventName}"`,
    bookingVenueSubject: (venueName) => `un tavolo VIP al ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Ciao Nightlife Milan! Vorrei prenotare ${context}${date ? ` per il ${date}` : ''} per ${guests} persone. Mi chiamo ${name} (${email}). Potete confermare la disponibilità?`,
  },
  es: {
    pageLabel: 'Página',
    defaultMessage: '¡Hola Nightlife Milan! Quisiera información y disponibilidad para reservar mesa VIP o lista en Milán.',
    contextMessage: (context) => `¡Hola Nightlife Milan! Quisiera información y disponibilidad para: ${context}.`,
    bookingEventSubject: (eventName) => `el evento "${eventName}"`,
    bookingVenueSubject: (venueName) => `una mesa VIP en ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `¡Hola Nightlife Milan! Quiero reservar ${context}${date ? ` para el ${date}` : ''} para ${guests} personas. Me llamo ${name} (${email}). ¿Podéis confirmar disponibilidad?`,
  },
  fr: {
    pageLabel: 'Page',
    defaultMessage: 'Bonjour Nightlife Milan ! Je souhaite des informations et disponibilités pour réserver une table VIP ou guest list à Milan.',
    contextMessage: (context) => `Bonjour Nightlife Milan ! Je souhaite des informations et disponibilités pour : ${context}.`,
    bookingEventSubject: (eventName) => `l’événement « ${eventName} »`,
    bookingVenueSubject: (venueName) => `une table VIP au ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Bonjour Nightlife Milan ! Je souhaite réserver ${context}${date ? ` pour le ${date}` : ''} pour ${guests} personnes. Nom : ${name} (${email}). Pouvez-vous confirmer la disponibilité ?`,
  },
  de: {
    pageLabel: 'Seite',
    defaultMessage: 'Hallo Nightlife Milan! Ich möchte Informationen und Verfügbarkeit für einen VIP-Tisch oder die Gästeliste in Mailand anfragen.',
    contextMessage: (context) => `Hallo Nightlife Milan! Ich möchte Informationen und Verfügbarkeit für: ${context}.`,
    bookingEventSubject: (eventName) => `das Event „${eventName}“`,
    bookingVenueSubject: (venueName) => `einen VIP-Tisch im ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Hallo Nightlife Milan! Ich möchte ${context}${date ? ` am ${date}` : ''} für ${guests} Personen reservieren. Name: ${name} (${email}). Können Sie die Verfügbarkeit bestätigen?`,
  },
  pt: {
    pageLabel: 'Página',
    defaultMessage: 'Olá Nightlife Milan! Gostaria de informações e disponibilidade para reservar mesa VIP ou lista em Milão.',
    contextMessage: (context) => `Olá Nightlife Milan! Gostaria de informações e disponibilidade para: ${context}.`,
    bookingEventSubject: (eventName) => `o evento "${eventName}"`,
    bookingVenueSubject: (venueName) => `uma mesa VIP no ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Olá Nightlife Milan! Gostaria de reservar ${context}${date ? ` para ${date}` : ''} para ${guests} pessoas. Nome: ${name} (${email}). Podem confirmar a disponibilidade?`,
  },
  nl: {
    pageLabel: 'Pagina',
    defaultMessage: 'Hallo Nightlife Milan! Ik wil graag informatie en beschikbaarheid voor het reserveren van een VIP-tafel of gastenlijst in Milaan.',
    contextMessage: (context) => `Hallo Nightlife Milan! Ik wil graag informatie en beschikbaarheid voor: ${context}.`,
    bookingEventSubject: (eventName) => `het evenement "${eventName}"`,
    bookingVenueSubject: (venueName) => `een VIP-tafel bij ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Hallo Nightlife Milan! Ik wil graag ${context}${date ? ` voor ${date}` : ''} reserveren voor ${guests} personen. Naam: ${name} (${email}). Kunnen jullie de beschikbaarheid bevestigen?`,
  },
  ru: {
    pageLabel: 'Страница',
    defaultMessage: 'Здравствуйте, Nightlife Milan! Подскажите наличие мест и условия бронирования VIP-стола или входа по списку в Милане.',
    contextMessage: (context) => `Здравствуйте, Nightlife Milan! Интересует информация и наличие мест: ${context}.`,
    bookingEventSubject: (eventName) => `мероприятие «${eventName}»`,
    bookingVenueSubject: (venueName) => `VIP-стол в ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Здравствуйте, Nightlife Milan! Хочу забронировать ${context}${date ? ` на ${date}` : ''} для ${guests} гостей. Имя: ${name} (${email}). Подтвердите, пожалуйста, наличие мест.`,
  },
  tr: {
    pageLabel: 'Sayfa',
    defaultMessage: 'Merhaba Nightlife Milan! Milano’da VIP masa veya giriş listesi rezervasyonu için bilgi ve müsaitlik almak istiyorum.',
    contextMessage: (context) => `Merhaba Nightlife Milan! Şu konu hakkında bilgi ve müsaitlik almak istiyorum: ${context}.`,
    bookingEventSubject: (eventName) => `"${eventName}" etkinliği`,
    bookingVenueSubject: (venueName) => `${venueName} mekanında VIP masa`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Merhaba Nightlife Milan! ${context}${date ? ` (${date})` : ''} için ${guests} kişilik rezervasyon yapmak istiyorum. Ad: ${name} (${email}). Müsaitliği teyit edebilir misiniz?`,
  },
  zh: {
    pageLabel: '页面',
    defaultMessage: '您好 Nightlife Milan！我想咨询米兰 VIP 卡座或嘉宾名单的预订信息与空位情况。',
    contextMessage: (context) => `您好 Nightlife Milan！我想咨询以下项目的预订与空位情况：${context}。`,
    bookingEventSubject: (eventName) => `活动“${eventName}”`,
    bookingVenueSubject: (venueName) => `${venueName} 的 VIP 卡座`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `您好 Nightlife Milan！我想预订${context}${date ? `（日期：${date}）` : ''}，共 ${guests} 位。姓名：${name}（${email}）。请问目前有位吗？`,
  },
  ar: {
    pageLabel: 'الصفحة',
    defaultMessage: 'مرحبًا Nightlife Milan! أود الحصول على معلومات وتوافر حجز طاولة VIP أو قائمة الدخول في ميلانو.',
    contextMessage: (context) => `مرحبًا Nightlife Milan! أود الاستفسار عن التوافر والحجز لـ: ${context}.`,
    bookingEventSubject: (eventName) => `فعالية "${eventName}"`,
    bookingVenueSubject: (venueName) => `طاولة VIP في ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `مرحبًا Nightlife Milan! أود حجز ${context}${date ? ` بتاريخ ${date}` : ''} لعدد ${guests} أشخاص. الاسم: ${name} (${email}). هل يمكنكم تأكيد التوافر؟`,
  },
  bg: {
    pageLabel: 'Страница',
    defaultMessage: 'Здравейте, Nightlife Milan! Бих искал информация и наличност за резервация на VIP маса или списък за гости в Милано.',
    contextMessage: (context) => `Здравейте, Nightlife Milan! Интересувам се от информация и наличност за: ${context}.`,
    bookingEventSubject: (eventName) => `събитието "${eventName}"`,
    bookingVenueSubject: (venueName) => `VIP маса в ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Здравейте, Nightlife Milan! Искам да резервирам ${context}${date ? ` за ${date}` : ''} за ${guests} души. Име: ${name} (${email}). Може ли да потвърдите наличността?`,
  },
  hr: {
    pageLabel: 'Stranica',
    defaultMessage: 'Pozdrav Nightlife Milan! Želim informacije i dostupnost za rezervaciju VIP stola ili popisa gostiju u Milanu.',
    contextMessage: (context) => `Pozdrav Nightlife Milan! Zanimaju me informacije i dostupnost za: ${context}.`,
    bookingEventSubject: (eventName) => `događaj "${eventName}"`,
    bookingVenueSubject: (venueName) => `VIP stol u klubu ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Pozdrav Nightlife Milan! Želim rezervirati ${context}${date ? ` za datum ${date}` : ''} za ${guests} osoba. Ime: ${name} (${email}). Možete li potvrditi dostupnost?`,
  },
  cs: {
    pageLabel: 'Stránka',
    defaultMessage: 'Dobrý den Nightlife Milan! Rád bych získal informace a dostupnost pro rezervaci VIP stolu nebo guest listu v Miláně.',
    contextMessage: (context) => `Dobrý den Nightlife Milan! Prosím o informace a dostupnost pro: ${context}.`,
    bookingEventSubject: (eventName) => `akci "${eventName}"`,
    bookingVenueSubject: (venueName) => `VIP stůl v ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Dobrý den Nightlife Milan! Chci rezervovat ${context}${date ? ` na termín ${date}` : ''} pro ${guests} osob. Jméno: ${name} (${email}). Můžete potvrdit dostupnost?`,
  },
  da: {
    pageLabel: 'Side',
    defaultMessage: 'Hej Nightlife Milan! Jeg vil gerne høre om muligheder og ledighed for VIP-bord eller gæsteliste i Milano.',
    contextMessage: (context) => `Hej Nightlife Milan! Jeg vil gerne have information og ledighed for: ${context}.`,
    bookingEventSubject: (eventName) => `eventet "${eventName}"`,
    bookingVenueSubject: (venueName) => `et VIP-bord på ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Hej Nightlife Milan! Jeg vil gerne booke ${context}${date ? ` den ${date}` : ''} for ${guests} gæster. Navn: ${name} (${email}). Kan I bekræfte ledighed?`,
  },
  et: {
    pageLabel: 'Leht',
    defaultMessage: 'Tere Nightlife Milan! Soovin infot ja saadavust VIP-laua või külalistenimekirja broneerimiseks Milanos.',
    contextMessage: (context) => `Tere Nightlife Milan! Soovin infot ja saadavust: ${context}.`,
    bookingEventSubject: (eventName) => `ürituse "${eventName}"`,
    bookingVenueSubject: (venueName) => `VIP-laua kohas ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Tere Nightlife Milan! Soovin broneerida ${context}${date ? ` kuupäevaks ${date}` : ''} ${guests} külalisele. Nimi: ${name} (${email}). Kas saate saadavust kinnitada?`,
  },
  fi: {
    pageLabel: 'Sivu',
    defaultMessage: 'Hei Nightlife Milan! Haluaisin lisätietoja ja saatavuuden VIP-pöydän tai vieraslistan varaamiseen Milanossa.',
    contextMessage: (context) => `Hei Nightlife Milan! Haluaisin lisätietoja ja saatavuuden kohteeseen: ${context}.`,
    bookingEventSubject: (eventName) => `tapahtuma "${eventName}"`,
    bookingVenueSubject: (venueName) => `VIP-pöytä paikassa ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Hei Nightlife Milan! Haluaisin varata ${context}${date ? ` päivälle ${date}` : ''} ${guests} hengelle. Nimi: ${name} (${email}). Voitteko vahvistaa saatavuuden?`,
  },
  el: {
    pageLabel: 'Σελίδα',
    defaultMessage: 'Γεια σας Nightlife Milan! Θα ήθελα πληροφορίες και διαθεσιμότητα για κράτηση VIP τραπεζιού ή λίστας εισόδου στο Μιλάνο.',
    contextMessage: (context) => `Γεια σας Nightlife Milan! Θα ήθελα πληροφορίες και διαθεσιμότητα για: ${context}.`,
    bookingEventSubject: (eventName) => `την εκδήλωση «${eventName}»`,
    bookingVenueSubject: (venueName) => `ένα VIP τραπέζι στο ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Γεια σας Nightlife Milan! Θα ήθελα να κάνω κράτηση για ${context}${date ? ` στις ${date}` : ''} για ${guests} άτομα. Όνομα: ${name} (${email}). Μπορείτε να επιβεβαιώσετε τη διαθεσιμότητα;`,
  },
  hu: {
    pageLabel: 'Oldal',
    defaultMessage: 'Szia Nightlife Milan! Információt és elérhetőséget szeretnék VIP asztal vagy vendéglista foglalásához Milánóban.',
    contextMessage: (context) => `Szia Nightlife Milan! Információt és elérhetőséget szeretnék a következőhöz: ${context}.`,
    bookingEventSubject: (eventName) => `a(z) „${eventName}” esemény`,
    bookingVenueSubject: (venueName) => `VIP asztal itt: ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Szia Nightlife Milan! Foglalni szeretnék (${context}${date ? `, dátum: ${date}` : ''}) ${guests} fő részére. Név: ${name} (${email}). Megerősítitek az elérhetőséget?`,
  },
  ga: {
    pageLabel: 'Leathanach',
    defaultMessage: 'Dia duit Nightlife Milan! Ba mhaith liom eolas agus infhaighteacht a fháil chun bord VIP nó liosta aíonna a chur in áirithe i Milano.',
    contextMessage: (context) => `Dia duit Nightlife Milan! Ba mhaith liom eolas agus infhaighteacht a fháil do: ${context}.`,
    bookingEventSubject: (eventName) => `an imeacht "${eventName}"`,
    bookingVenueSubject: (venueName) => `bord VIP ag ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Dia duit Nightlife Milan! Ba mhaith liom áirithint a dhéanamh do ${context}${date ? ` ar ${date}` : ''} do ${guests} duine. Ainm: ${name} (${email}). An féidir libh infhaighteacht a dheimhniú?`,
  },
  lv: {
    pageLabel: 'Lapa',
    defaultMessage: 'Sveiki Nightlife Milan! Vēlos uzzināt informāciju un pieejamību VIP galdiņa vai viesu saraksta rezervācijai Milānā.',
    contextMessage: (context) => `Sveiki Nightlife Milan! Vēlos saņemt informāciju un pieejamību par: ${context}.`,
    bookingEventSubject: (eventName) => `pasākumu "${eventName}"`,
    bookingVenueSubject: (venueName) => `VIP galdiņu klubā ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Sveiki Nightlife Milan! Vēlos rezervēt ${context}${date ? ` datumā ${date}` : ''} ${guests} personām. Vārds: ${name} (${email}). Vai varat apstiprināt pieejamību?`,
  },
  lt: {
    pageLabel: 'Puslapis',
    defaultMessage: 'Sveiki Nightlife Milan! Norėčiau gauti informaciją ir laisvas vietas VIP staliuko ar svečių sąrašo rezervacijai Milane.',
    contextMessage: (context) => `Sveiki Nightlife Milan! Norėčiau informacijos ir laisvų vietų dėl: ${context}.`,
    bookingEventSubject: (eventName) => `renginio "${eventName}"`,
    bookingVenueSubject: (venueName) => `VIP staliuko klube ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Sveiki Nightlife Milan! Norėčiau rezervuoti ${context}${date ? ` datai ${date}` : ''} ${guests} svečiams. Vardas: ${name} (${email}). Ar galite patvirtinti laisvas vietas?`,
  },
  mt: {
    pageLabel: 'Paġna',
    defaultMessage: 'Bongu Nightlife Milan! Nixtieq informazzjoni u disponibbiltà biex nibbukkja mejda VIP jew guest list f’Milan.',
    contextMessage: (context) => `Bongu Nightlife Milan! Nixtieq informazzjoni u disponibbiltà għal: ${context}.`,
    bookingEventSubject: (eventName) => `l-avveniment "${eventName}"`,
    bookingVenueSubject: (venueName) => `mejda VIP f’${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Bongu Nightlife Milan! Nixtieq nibbukkja ${context}${date ? ` għal ${date}` : ''} għal ${guests} persuni. Isem: ${name} (${email}). Tistgħu tikkonfermaw id-disponibbiltà?`,
  },
  pl: {
    pageLabel: 'Strona',
    defaultMessage: 'Cześć Nightlife Milan! Proszę o informacje i dostępność w sprawie rezerwacji stolika VIP lub listy gości w Mediolanie.',
    contextMessage: (context) => `Cześć Nightlife Milan! Proszę o informacje i dostępność dla: ${context}.`,
    bookingEventSubject: (eventName) => `wydarzenie „${eventName}”`,
    bookingVenueSubject: (venueName) => `stolik VIP w ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Cześć Nightlife Milan! Chcę zarezerwować ${context}${date ? ` na termin ${date}` : ''} dla ${guests} osób. Imię: ${name} (${email}). Czy możecie potwierdzić dostępność?`,
  },
  ro: {
    pageLabel: 'Pagină',
    defaultMessage: 'Salut Nightlife Milan! Aș dori informații și disponibilitate pentru a rezerva o masă VIP sau intrare pe listă în Milano.',
    contextMessage: (context) => `Salut Nightlife Milan! Aș dori informații și disponibilitate pentru: ${context}.`,
    bookingEventSubject: (eventName) => `evenimentul "${eventName}"`,
    bookingVenueSubject: (venueName) => `o masă VIP la ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Salut Nightlife Milan! Aș dori să rezerv ${context}${date ? ` pentru data de ${date}` : ''} pentru ${guests} persoane. Nume: ${name} (${email}). Puteți confirma disponibilitatea?`,
  },
  sk: {
    pageLabel: 'Stránka',
    defaultMessage: 'Dobrý deň Nightlife Milan! Rád by som získal informácie a dostupnosť pre rezerváciu VIP stola alebo guest listu v Miláne.',
    contextMessage: (context) => `Dobrý deň Nightlife Milan! Prosím o informácie a dostupnosť pre: ${context}.`,
    bookingEventSubject: (eventName) => `podujatie "${eventName}"`,
    bookingVenueSubject: (venueName) => `VIP stôl v ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Dobrý deň Nightlife Milan! Chcem si rezervovať ${context}${date ? ` na termín ${date}` : ''} pre ${guests} osôb. Meno: ${name} (${email}). Môžete potvrdiť dostupnosť?`,
  },
  sl: {
    pageLabel: 'Stran',
    defaultMessage: 'Pozdravljeni Nightlife Milan! Želim informacije in razpoložljivost za rezervacijo VIP mize ali seznama gostov v Milanu.',
    contextMessage: (context) => `Pozdravljeni Nightlife Milan! Želim informacije in razpoložljivost za: ${context}.`,
    bookingEventSubject: (eventName) => `dogodek "${eventName}"`,
    bookingVenueSubject: (venueName) => `VIP mizo v ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Pozdravljeni Nightlife Milan! Želim rezervirati ${context}${date ? ` za datum ${date}` : ''} za ${guests} oseb. Ime: ${name} (${email}). Ali lahko potrdite razpoložljivost?`,
  },
  sv: {
    pageLabel: 'Sida',
    defaultMessage: 'Hej Nightlife Milan! Jag vill gärna ha information och tillgänglighet för att boka VIP-bord eller gästlista i Milano.',
    contextMessage: (context) => `Hej Nightlife Milan! Jag vill gärna ha information och tillgänglighet för: ${context}.`,
    bookingEventSubject: (eventName) => `evenemanget "${eventName}"`,
    bookingVenueSubject: (venueName) => `ett VIP-bord på ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Hej Nightlife Milan! Jag vill boka ${context}${date ? ` den ${date}` : ''} för ${guests} gäster. Namn: ${name} (${email}). Kan ni bekräfta tillgänglighet?`,
  },
  no: {
    pageLabel: 'Side',
    defaultMessage: 'Hei Nightlife Milan! Jeg ønsker informasjon og tilgjengelighet for å bestille VIP-bord eller gjesteliste i Milano.',
    contextMessage: (context) => `Hei Nightlife Milan! Jeg ønsker informasjon og tilgjengelighet for: ${context}.`,
    bookingEventSubject: (eventName) => `arrangementet "${eventName}"`,
    bookingVenueSubject: (venueName) => `et VIP-bord på ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Hei Nightlife Milan! Jeg vil bestille ${context}${date ? ` den ${date}` : ''} for ${guests} gjester. Navn: ${name} (${email}). Kan dere bekrefte tilgjengelighet?`,
  },
  is: {
    pageLabel: 'Síða',
    defaultMessage: 'Hæ Nightlife Milan! Ég óska eftir upplýsingum og framboði fyrir VIP-borð eða gestalista í Mílanó.',
    contextMessage: (context) => `Hæ Nightlife Milan! Ég óska eftir upplýsingum og framboði fyrir: ${context}.`,
    bookingEventSubject: (eventName) => `viðburðinn "${eventName}"`,
    bookingVenueSubject: (venueName) => `VIP-borð á ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Hæ Nightlife Milan! Ég vil bóka ${context}${date ? ` þann ${date}` : ''} fyrir ${guests} gesti. Nafn: ${name} (${email}). Getið þið staðfest framboð?`,
  },
  uk: {
    pageLabel: 'Сторінка',
    defaultMessage: 'Вітаю, Nightlife Milan! Підкажіть наявність місць та умови бронювання VIP-столу або списку гостей у Мілані.',
    contextMessage: (context) => `Вітаю, Nightlife Milan! Потрібна інформація та наявність місць для: ${context}.`,
    bookingEventSubject: (eventName) => `подію «${eventName}»`,
    bookingVenueSubject: (venueName) => `VIP-стіл у ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Вітаю, Nightlife Milan! Хочу забронювати ${context}${date ? ` на ${date}` : ''} для ${guests} гостей. Ім’я: ${name} (${email}). Підтвердіть, будь ласка, наявність.`,
  },
  sq: {
    pageLabel: 'Faqja',
    defaultMessage: 'Përshëndetje Nightlife Milan! Dëshiroj informacione dhe disponueshmëri për të rezervuar tavolinë VIP ose listë në Milano.',
    contextMessage: (context) => `Përshëndetje Nightlife Milan! Dëshiroj informacione dhe disponueshmëri për: ${context}.`,
    bookingEventSubject: (eventName) => `eventin "${eventName}"`,
    bookingVenueSubject: (venueName) => `tavolinë VIP te ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Përshëndetje Nightlife Milan! Dua të rezervoj ${context}${date ? ` më ${date}` : ''} për ${guests} persona. Emri: ${name} (${email}). A mund ta konfirmoni disponueshmërinë?`,
  },
  sr: {
    pageLabel: 'Stranica',
    defaultMessage: 'Pozdrav Nightlife Milan! Želim informacije i dostupnost za rezervaciju VIP stola ili liste gostiju u Milanu.',
    contextMessage: (context) => `Pozdrav Nightlife Milan! Želim informacije i dostupnost za: ${context}.`,
    bookingEventSubject: (eventName) => `događaj "${eventName}"`,
    bookingVenueSubject: (venueName) => `VIP sto u klubu ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Pozdrav Nightlife Milan! Želim da rezervišem ${context}${date ? ` za datum ${date}` : ''} za ${guests} osoba. Ime: ${name} (${email}). Možete li potvrditi dostupnost?`,
  },
  bs: {
    pageLabel: 'Stranica',
    defaultMessage: 'Pozdrav Nightlife Milan! Želim informacije i dostupnost za rezervaciju VIP stola ili liste gostiju u Milanu.',
    contextMessage: (context) => `Pozdrav Nightlife Milan! Želim informacije i dostupnost za: ${context}.`,
    bookingEventSubject: (eventName) => `događaj "${eventName}"`,
    bookingVenueSubject: (venueName) => `VIP sto u klubu ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Pozdrav Nightlife Milan! Želim rezervisati ${context}${date ? ` za datum ${date}` : ''} za ${guests} osoba. Ime: ${name} (${email}). Možete li potvrditi dostupnost?`,
  },
  mk: {
    pageLabel: 'Страница',
    defaultMessage: 'Здраво Nightlife Milan! Сакам информации и достапност за резервација на VIP маса или листа на гости во Милано.',
    contextMessage: (context) => `Здраво Nightlife Milan! Сакам информации и достапност за: ${context}.`,
    bookingEventSubject: (eventName) => `настанот „${eventName}“`,
    bookingVenueSubject: (venueName) => `VIP маса во ${venueName}`,
    bookingFormMessage: ({ context, date, guests, name, email }) =>
      `Здраво Nightlife Milan! Сакам да резервирам ${context}${date ? ` за ${date}` : ''} за ${guests} гости. Име: ${name} (${email}). Можете ли да потврдите достапност?`,
  },
};

export function resolveWhatsAppLocale(localeOrPath?: string | null): LocaleCode {
  if (!localeOrPath) return DEFAULT_LOCALE;
  const trimmed = localeOrPath.trim();
  const normalized = trimmed.toLowerCase();
  if (isEnabledLocale(normalized)) return normalized;

  let path = trimmed;
  if (/^https?:\/\//i.test(path)) {
    try {
      path = new URL(path).pathname;
    } catch {
      path = trimmed;
    }
  }
  const firstSegment = path.split('?')[0].split('#')[0].split('/').filter(Boolean)[0]?.toLowerCase();
  if (firstSegment && isEnabledLocale(firstSegment)) {
    return firstSegment;
  }
  return DEFAULT_LOCALE;
}

export function getWhatsAppPack(locale?: string | null): WhatsAppLocalePack {
  const code = resolveWhatsAppLocale(locale);
  return WHATSAPP_LOCALE_PACKS[code] || WHATSAPP_LOCALE_PACKS.en;
}

export function getWhatsAppPageLabel(locale?: string | null): string {
  return getWhatsAppPack(locale).pageLabel;
}

export function resolveFullPageUrl(pageUrlOrPath?: string | null, locale?: string | null): string {
  const code = resolveWhatsAppLocale(locale || pageUrlOrPath);
  if (!pageUrlOrPath || !pageUrlOrPath.trim()) {
    const fallback = canonicalPageUrl(SITE_ORIGIN, code, '/');
    return fallback === SITE_ORIGIN ? `${SITE_ORIGIN}/` : fallback;
  }

  const raw = pageUrlOrPath.trim();
  if (/^https?:\/\//i.test(raw)) {
    try {
      const parsed = new URL(raw);
      if (parsed.hostname === 'nightlifemilan.com' || parsed.hostname === 'www.nightlifemilan.com') {
        const pathname = parsed.pathname || '/';
        return `${SITE_ORIGIN}${pathname}${parsed.search}`;
      }
      // Map localhost / Vercel preview URLs onto official production domain for customer-facing links
      const pathname = parsed.pathname || '/';
      return `${SITE_ORIGIN}${pathname}${parsed.search}`;
    } catch {
      // Fallback below
    }
  }

  const withLeadingSlash = raw.startsWith('/') ? raw : `/${raw}`;
  const clean = withLeadingSlash.split('#')[0];
  if (clean === '/' && code !== 'en') {
    return `${SITE_ORIGIN}${localePrefix(code)}`;
  }
  return `${SITE_ORIGIN}${clean}`;
}

const TRAILING_PAGE_URL_LINE_RE = /\n{1,2}[^\n:]{1,40}:\s*https:\/\/nightlifemilan\.com[^\s]*\s*$/iu;

export function appendPageUrlToWhatsAppMessage(
  message: string,
  pageUrlOrPath?: string | null,
  locale?: string | null,
): string {
  const code = resolveWhatsAppLocale(locale || pageUrlOrPath);
  const fullUrl = resolveFullPageUrl(pageUrlOrPath, code);
  const label = getWhatsAppPageLabel(code);
  const cleaned = message.trim();

  if (!cleaned) {
    return `${getWhatsAppPack(code).defaultMessage}\n\n${label}: ${fullUrl}`;
  }

  const expectedSuffix = `${label}: ${fullUrl}`;
  if (cleaned.endsWith(expectedSuffix)) {
    return cleaned;
  }

  const withoutStaleLine = cleaned.replace(TRAILING_PAGE_URL_LINE_RE, '').trim();
  return `${withoutStaleLine}\n\n${label}: ${fullUrl}`;
}

export function buildWhatsAppConciergeMessage(
  locale?: string | null,
  context?: string | null,
  pageUrlOrPath?: string | null,
): string {
  const code = resolveWhatsAppLocale(locale || pageUrlOrPath);
  const pack = getWhatsAppPack(code);
  const trimmedContext = context?.trim();
  const base = trimmedContext ? pack.contextMessage(trimmedContext) : pack.defaultMessage;
  return appendPageUrlToWhatsAppMessage(base, pageUrlOrPath, code);
}

export function getConciergeBookingUrl(
  locale?: string | null,
  context?: string | null,
  pageUrlOrPath?: string | null,
): string {
  const message = buildWhatsAppConciergeMessage(locale, context, pageUrlOrPath);
  return `${SITE_CONTACT.whatsapp.link}?text=${encodeURIComponent(message)}`;
}

export function isSiteWhatsAppUrl(href?: string | null): boolean {
  if (!href) return false;
  try {
    const parsed = new URL(href, SITE_ORIGIN);
    if (parsed.hostname === 'wa.me' && parsed.pathname.replace(/\/+$/, '') === '/393519127047') {
      return true;
    }
    if (
      (parsed.hostname === 'api.whatsapp.com' || parsed.hostname === 'web.whatsapp.com') &&
      parsed.searchParams.get('phone')?.replace(/\D/g, '') === '393519127047'
    ) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

const ENGLISH_LEAK_RE =
  /^\s*(?:hi|hello)\b|\b(?:hi\s+nightlife|hi\s+there|booking\s+for|i\s+want\s+information|i(?:'d|\s+would)\s+like|i\s+have\s+a\s+question|can\s+you\s+help|would\s+like\s+to\s+book)\b/i;
const ITALIAN_LEAK_RE =
  /^\s*(?:ciao|salve)\b|\b(?:vorrei\s+(?:prenotare|informazioni|ricevere|sapere)|vorremmo\b|siamo\s+a\b|sto\s+leggendo\b)\b/i;

function extractLegacyContext(message: string): string | undefined {
  const withoutTrailingUrl = message.replace(TRAILING_PAGE_URL_LINE_RE, '').trim();
  const match = withoutTrailingUrl.match(/\b(?:for:\s*|for\s+|at\s+|per:\s*|per\s+|da\s+)([^\n]{2,90})$/i);
  const candidate = match?.[1]?.replace(/[.!?\s]+$/, '').trim();
  if (!candidate || candidate.length > 90) return undefined;
  return candidate;
}

export function isMessageWrongLanguageForLocale(message: string, locale: LocaleCode): boolean {
  const trimmed = message.trim();
  if (!trimmed) return true;
  if (locale === 'en') {
    return ITALIAN_LEAK_RE.test(trimmed);
  }
  if (locale === 'it') {
    return ENGLISH_LEAK_RE.test(trimmed);
  }
  return ENGLISH_LEAK_RE.test(trimmed) || ITALIAN_LEAK_RE.test(trimmed);
}

export function normalizeWhatsAppHrefForPage(
  href: string,
  locale?: string | null,
  pageUrlOrPath?: string | null,
  fallbackContext?: string | null,
): string {
  if (!isSiteWhatsAppUrl(href)) return href;
  const code = resolveWhatsAppLocale(locale || pageUrlOrPath);
  const fullUrl = resolveFullPageUrl(pageUrlOrPath, code);

  let existingText = '';
  try {
    const parsed = new URL(href, SITE_ORIGIN);
    existingText = parsed.searchParams.get('text')?.trim() || '';
  } catch {
    existingText = '';
  }

  if (!existingText || isMessageWrongLanguageForLocale(existingText, code)) {
    const context = fallbackContext || (existingText ? extractLegacyContext(existingText) : undefined);
    return getConciergeBookingUrl(code, context, fullUrl);
  }

  const nextText = appendPageUrlToWhatsAppMessage(existingText, fullUrl, code);
  return `${SITE_CONTACT.whatsapp.link}?text=${encodeURIComponent(nextText)}`;
}

export function listAllSupportedWhatsAppLocales(): readonly LocaleCode[] {
  return ENABLED_LOCALES.map((d) => d.code);
}
