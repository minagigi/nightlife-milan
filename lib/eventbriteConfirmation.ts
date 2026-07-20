import { CONTACT } from '@/config/contact';
import { getEventLocalePack } from './eventLocalePacks';
import { enabledLocaleCodes, isEnabledLocale, type LocaleCode } from './i18n/locales';

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const AFFILIATE_CHANNEL = 'nightlifemilan-1';

interface ConfirmationCopy {
  notTicket: string;
  purchase: string;
  afterPurchase: string;
}

export interface EventbriteConfirmationPlainText {
  notTicket: string;
  purchase: string;
  afterPurchase: string;
}

export interface EventbriteConfirmationContext {
  heading: string;
  details: string;
}

const CONFIRMATION_COPY: Record<LocaleCode, ConfirmationCopy> = {
  en: {
    notTicket: 'This Eventbrite registration is an information request only. It is not an admission ticket and does not grant entry.',
    purchase: 'To attend, purchase the ticket or selected service through one of the official Nightlife Milan Xceed affiliate links below.',
    afterPurchase: 'After purchasing, send your Xceed purchase confirmation on WhatsApp to {phone}, including your name, event and number of guests.',
  },
  it: {
    notTicket: 'Questa registrazione Eventbrite è soltanto una richiesta di informazioni. Non è un biglietto di ingresso e non consente l’accesso.',
    purchase: 'Per partecipare, acquista il biglietto o il servizio scelto tramite uno dei link Xceed affiliati ufficiali di Nightlife Milan qui sotto.',
    afterPurchase: 'Dopo l’acquisto, invia la conferma di acquisto Xceed su WhatsApp al {phone}, indicando nome, evento e numero di persone.',
  },
  es: {
    notTicket: 'Esta inscripción en Eventbrite es solo una solicitud de información. No es una entrada ni permite el acceso al evento.',
    purchase: 'Para asistir, compra la entrada o el servicio elegido mediante uno de los enlaces afiliados oficiales de Xceed de Nightlife Milan que aparecen a continuación.',
    afterPurchase: 'Después de la compra, envía la confirmación de Xceed por WhatsApp al {phone}, indicando tu nombre, el evento y el número de personas.',
  },
  fr: {
    notTicket: 'Cette inscription Eventbrite est uniquement une demande d’information. Ce n’est pas un billet d’entrée et elle ne donne pas accès à l’événement.',
    purchase: 'Pour participer, achetez le billet ou la formule choisie via l’un des liens affiliés Xceed officiels de Nightlife Milan ci-dessous.',
    afterPurchase: 'Après l’achat, envoyez la confirmation Xceed sur WhatsApp au {phone}, avec votre nom, l’événement et le nombre de personnes.',
  },
  de: {
    notTicket: 'Diese Eventbrite-Registrierung ist nur eine Informationsanfrage. Sie ist keine Eintrittskarte und berechtigt nicht zum Einlass.',
    purchase: 'Um teilzunehmen, kaufe das Ticket oder die gewählte Leistung über einen der folgenden offiziellen Xceed-Partnerlinks von Nightlife Milan.',
    afterPurchase: 'Sende nach dem Kauf die Xceed-Kaufbestätigung per WhatsApp an {phone} und gib Name, Veranstaltung und Personenzahl an.',
  },
  pt: {
    notTicket: 'Esta inscrição no Eventbrite é apenas um pedido de informação. Não é um bilhete de entrada e não dá acesso ao evento.',
    purchase: 'Para participar, compra o bilhete ou o serviço escolhido através de um dos links afiliados oficiais da Xceed da Nightlife Milan abaixo.',
    afterPurchase: 'Depois da compra, envia a confirmação da Xceed por WhatsApp para {phone}, indicando nome, evento e número de pessoas.',
  },
  nl: {
    notTicket: 'Deze Eventbrite-registratie is alleen een informatieaanvraag. Het is geen toegangsticket en geeft geen recht op toegang.',
    purchase: 'Koop om deel te nemen het ticket of de gekozen service via een van de onderstaande officiële Xceed-partnerlinks van Nightlife Milan.',
    afterPurchase: 'Stuur na aankoop de Xceed-aankoopbevestiging via WhatsApp naar {phone}, met je naam, evenement en aantal personen.',
  },
  ru: {
    notTicket: 'Эта регистрация на Eventbrite является только информационным запросом. Она не является входным билетом и не дает права на вход.',
    purchase: 'Для участия купите билет или выбранную услугу по одной из официальных партнерских ссылок Xceed от Nightlife Milan ниже.',
    afterPurchase: 'После покупки отправьте подтверждение Xceed в WhatsApp на номер {phone}, указав имя, мероприятие и количество гостей.',
  },
  tr: {
    notTicket: 'Bu Eventbrite kaydı yalnızca bilgi talebidir. Giriş bileti değildir ve etkinliğe giriş hakkı sağlamaz.',
    purchase: 'Katılmak için bileti veya seçtiğiniz hizmeti aşağıdaki resmi Nightlife Milan Xceed satış ortaklığı bağlantılarından biri üzerinden satın alın.',
    afterPurchase: 'Satın alma işleminden sonra Xceed onayını WhatsApp üzerinden {phone} numarasına adınız, etkinlik ve kişi sayısıyla gönderin.',
  },
  zh: {
    notTicket: '此 Eventbrite 登记仅为信息咨询，不是入场门票，也不能作为活动入场凭证。',
    purchase: '如需参加活动，请通过下方 Nightlife Milan 官方 Xceed 推广链接购买门票或所选服务。',
    afterPurchase: '购买后，请通过 WhatsApp 将 Xceed 购买确认发送至 {phone}，并注明姓名、活动名称和人数。',
  },
  ar: {
    notTicket: 'هذا التسجيل عبر Eventbrite هو طلب معلومات فقط، وليس تذكرة دخول ولا يمنح حق الدخول إلى الفعالية.',
    purchase: 'للحضور، اشترِ التذكرة أو الخدمة المختارة عبر أحد روابط Xceed الرسمية التابعة لـ Nightlife Milan أدناه.',
    afterPurchase: 'بعد الشراء، أرسل تأكيد شراء Xceed عبر واتساب إلى {phone} مع الاسم والفعالية وعدد الأشخاص.',
  },
  bg: {
    notTicket: 'Тази регистрация в Eventbrite е само информационно запитване. Тя не е входен билет и не дава право на достъп.',
    purchase: 'За да присъствате, купете билета или избраната услуга чрез един от официалните партньорски линкове на Nightlife Milan към Xceed по-долу.',
    afterPurchase: 'След покупката изпратете потвърждението от Xceed по WhatsApp на {phone}, като посочите име, събитие и брой гости.',
  },
  hr: {
    notTicket: 'Ova Eventbrite prijava samo je zahtjev za informacije. Nije ulaznica i ne omogućuje ulazak na događaj.',
    purchase: 'Za sudjelovanje kupite ulaznicu ili odabranu uslugu putem jedne od službenih partnerskih Xceed poveznica Nightlife Milan u nastavku.',
    afterPurchase: 'Nakon kupnje pošaljite Xceed potvrdu putem WhatsAppa na {phone} te navedite ime, događaj i broj osoba.',
  },
  cs: {
    notTicket: 'Tato registrace na Eventbrite je pouze žádostí o informace. Není vstupenkou a neopravňuje ke vstupu na akci.',
    purchase: 'Pro účast si kupte vstupenku nebo vybranou službu prostřednictvím jednoho z níže uvedených oficiálních partnerských odkazů Xceed od Nightlife Milan.',
    afterPurchase: 'Po nákupu pošlete potvrzení z Xceed přes WhatsApp na {phone} a uveďte jméno, akci a počet osob.',
  },
  da: {
    notTicket: 'Denne Eventbrite-tilmelding er kun en informationsforespørgsel. Den er ikke en adgangsbillet og giver ikke adgang til arrangementet.',
    purchase: 'For at deltage skal du købe billetten eller den valgte service via et af Nightlife Milans officielle Xceed-partnerlinks nedenfor.',
    afterPurchase: 'Efter købet skal du sende Xceed-købsbekræftelsen via WhatsApp til {phone} med navn, arrangement og antal personer.',
  },
  et: {
    notTicket: 'See Eventbrite’i registreerimine on ainult infopäring. See ei ole sissepääsupilet ega anna õigust üritusele siseneda.',
    purchase: 'Osalemiseks osta pilet või valitud teenus ühe alloleva Nightlife Milani ametliku Xceedi partnerlingi kaudu.',
    afterPurchase: 'Pärast ostu saada Xceedi ostukinnitus WhatsAppis numbrile {phone} ning lisa nimi, üritus ja inimeste arv.',
  },
  fi: {
    notTicket: 'Tämä Eventbrite-ilmoittautuminen on vain tietopyyntö. Se ei ole pääsylippu eikä oikeuta sisäänpääsyyn.',
    purchase: 'Osallistuaksesi osta lippu tai valittu palvelu alla olevan Nightlife Milanin virallisen Xceed-kumppanilinkin kautta.',
    afterPurchase: 'Lähetä oston jälkeen Xceed-ostovahvistus WhatsAppilla numeroon {phone} ja ilmoita nimi, tapahtuma ja henkilömäärä.',
  },
  el: {
    notTicket: 'Αυτή η εγγραφή στο Eventbrite αποτελεί μόνο αίτημα πληροφοριών. Δεν είναι εισιτήριο και δεν παρέχει δικαίωμα εισόδου.',
    purchase: 'Για να συμμετάσχετε, αγοράστε το εισιτήριο ή την επιλεγμένη υπηρεσία μέσω ενός από τους παρακάτω επίσημους συνδέσμους συνεργάτη Xceed της Nightlife Milan.',
    afterPurchase: 'Μετά την αγορά, στείλτε την επιβεβαίωση Xceed μέσω WhatsApp στο {phone}, αναφέροντας όνομα, εκδήλωση και αριθμό ατόμων.',
  },
  hu: {
    notTicket: 'Ez az Eventbrite-regisztráció csak információkérés. Nem belépőjegy, és nem jogosít belépésre.',
    purchase: 'A részvételhez vásárold meg a jegyet vagy a kiválasztott szolgáltatást a Nightlife Milan alábbi hivatalos Xceed partnerlinkjeinek egyikén.',
    afterPurchase: 'A vásárlás után küldd el az Xceed visszaigazolását WhatsAppon a {phone} számra, a név, esemény és létszám megadásával.',
  },
  ga: {
    notTicket: 'Is iarratas faisnéise amháin é an clárú Eventbrite seo. Ní ticéad iontrála é agus ní thugann sé cead isteach.',
    purchase: 'Chun freastal, ceannaigh an ticéad nó an tseirbhís roghnaithe trí cheann de na naisc chleamhnaithe oifigiúla Xceed de chuid Nightlife Milan thíos.',
    afterPurchase: 'Tar éis an cheannaigh, seol deimhniú Xceed ar WhatsApp chuig {phone}, agus luaigh d’ainm, an ócáid agus líon na ndaoine.',
  },
  lv: {
    notTicket: 'Šī Eventbrite reģistrācija ir tikai informācijas pieprasījums. Tā nav ieejas biļete un nedod tiesības iekļūt pasākumā.',
    purchase: 'Lai piedalītos, iegādājieties biļeti vai izvēlēto pakalpojumu, izmantojot kādu no zemāk norādītajām Nightlife Milan oficiālajām Xceed partneru saitēm.',
    afterPurchase: 'Pēc pirkuma nosūtiet Xceed apstiprinājumu WhatsApp uz {phone}, norādot vārdu, pasākumu un personu skaitu.',
  },
  lt: {
    notTicket: 'Ši Eventbrite registracija yra tik informacijos užklausa. Tai nėra įėjimo bilietas ir ji nesuteikia teisės patekti į renginį.',
    purchase: 'Norėdami dalyvauti, įsigykite bilietą ar pasirinktą paslaugą per vieną iš toliau pateiktų oficialių Nightlife Milan Xceed partnerių nuorodų.',
    afterPurchase: 'Po pirkimo atsiųskite Xceed patvirtinimą per WhatsApp numeriu {phone}, nurodydami vardą, renginį ir žmonių skaičių.',
  },
  mt: {
    notTicket: 'Din ir-reġistrazzjoni fuq Eventbrite hija biss talba għal informazzjoni. Mhijiex biljett tad-dħul u ma tagħtix aċċess għall-avveniment.',
    purchase: 'Biex tattendi, ixtri l-biljett jew is-servizz magħżul permezz ta’ waħda mil-links affiljati uffiċjali ta’ Nightlife Milan fuq Xceed hawn taħt.',
    afterPurchase: 'Wara x-xiri, ibgħat il-konferma ta’ Xceed fuq WhatsApp lil {phone}, flimkien mal-isem, l-avveniment u n-numru ta’ persuni.',
  },
  pl: {
    notTicket: 'Ta rejestracja w Eventbrite jest wyłącznie zapytaniem informacyjnym. Nie jest biletem wstępu i nie uprawnia do wejścia.',
    purchase: 'Aby wziąć udział, kup bilet lub wybraną usługę przez jeden z poniższych oficjalnych linków partnerskich Xceed Nightlife Milan.',
    afterPurchase: 'Po zakupie wyślij potwierdzenie Xceed przez WhatsApp na numer {phone}, podając imię, wydarzenie i liczbę osób.',
  },
  ro: {
    notTicket: 'Această înscriere pe Eventbrite este doar o solicitare de informații. Nu este bilet de intrare și nu oferă acces la eveniment.',
    purchase: 'Pentru a participa, cumpără biletul sau serviciul ales prin unul dintre linkurile oficiale de afiliere Xceed ale Nightlife Milan de mai jos.',
    afterPurchase: 'După cumpărare, trimite confirmarea Xceed pe WhatsApp la {phone}, menționând numele, evenimentul și numărul de persoane.',
  },
  sk: {
    notTicket: 'Táto registrácia na Eventbrite je iba žiadosťou o informácie. Nie je vstupenkou a neoprávňuje na vstup na podujatie.',
    purchase: 'Ak sa chcete zúčastniť, kúpte si vstupenku alebo vybranú službu cez jeden z nižšie uvedených oficiálnych partnerských odkazov Xceed od Nightlife Milan.',
    afterPurchase: 'Po nákupe pošlite potvrdenie z Xceed cez WhatsApp na {phone} a uveďte meno, podujatie a počet osôb.',
  },
  sl: {
    notTicket: 'Ta prijava na Eventbrite je samo zahteva za informacije. Ni vstopnica in ne omogoča vstopa na dogodek.',
    purchase: 'Za udeležbo kupite vstopnico ali izbrano storitev prek ene od spodnjih uradnih partnerskih povezav Xceed Nightlife Milan.',
    afterPurchase: 'Po nakupu pošljite potrdilo Xceed prek WhatsAppa na {phone} ter navedite ime, dogodek in število oseb.',
  },
  sv: {
    notTicket: 'Denna Eventbrite-registrering är endast en informationsförfrågan. Den är inte en entrébiljett och ger inte tillträde till evenemanget.',
    purchase: 'För att delta ska du köpa biljetten eller den valda tjänsten via en av Nightlife Milans officiella Xceed-partnerlänkar nedan.',
    afterPurchase: 'Efter köpet skickar du Xceed-köpbekräftelsen via WhatsApp till {phone} med namn, evenemang och antal personer.',
  },
  no: {
    notTicket: 'Denne Eventbrite-registreringen er bare en informasjonsforespørsel. Den er ikke en inngangsbillett og gir ikke adgang til arrangementet.',
    purchase: 'For å delta må du kjøpe billetten eller den valgte tjenesten via en av Nightlife Milans offisielle Xceed-partnerlenker nedenfor.',
    afterPurchase: 'Etter kjøpet sender du Xceed-kjøpsbekreftelsen på WhatsApp til {phone} med navn, arrangement og antall personer.',
  },
  is: {
    notTicket: 'Þessi Eventbrite-skráning er aðeins upplýsingabeiðni. Hún er ekki aðgöngumiði og veitir ekki aðgang að viðburðinum.',
    purchase: 'Til að mæta þarftu að kaupa miða eða valda þjónustu í gegnum einn af opinberum Xceed-samstarfstenglum Nightlife Milan hér að neðan.',
    afterPurchase: 'Eftir kaupin skaltu senda Xceed-staðfestinguna á WhatsApp í {phone} ásamt nafni, viðburði og fjölda gesta.',
  },
  uk: {
    notTicket: 'Ця реєстрація на Eventbrite є лише інформаційним запитом. Вона не є вхідним квитком і не дає права на вхід.',
    purchase: 'Для участі придбайте квиток або обрану послугу за одним з офіційних партнерських посилань Xceed від Nightlife Milan нижче.',
    afterPurchase: 'Після покупки надішліть підтвердження Xceed у WhatsApp на номер {phone}, вказавши ім’я, подію та кількість гостей.',
  },
  sq: {
    notTicket: 'Ky regjistrim në Eventbrite është vetëm një kërkesë për informacion. Nuk është biletë hyrjeje dhe nuk lejon hyrjen në event.',
    purchase: 'Për të marrë pjesë, bli biletën ose shërbimin e zgjedhur përmes një prej lidhjeve zyrtare partnere Xceed të Nightlife Milan më poshtë.',
    afterPurchase: 'Pas blerjes, dërgo konfirmimin e Xceed në WhatsApp te {phone}, duke treguar emrin, eventin dhe numrin e personave.',
  },
  sr: {
    notTicket: 'Ova Eventbrite prijava je samo zahtev za informacije. Nije ulaznica i ne omogućava ulazak na događaj.',
    purchase: 'Za učešće kupite ulaznicu ili izabranu uslugu putem jedne od zvaničnih partnerskih Xceed veza Nightlife Milan u nastavku.',
    afterPurchase: 'Nakon kupovine pošaljite Xceed potvrdu putem WhatsAppa na {phone} i navedite ime, događaj i broj osoba.',
  },
  bs: {
    notTicket: 'Ova Eventbrite prijava je samo zahtjev za informacije. Nije ulaznica i ne omogućava ulazak na događaj.',
    purchase: 'Za učešće kupite ulaznicu ili odabranu uslugu putem jedne od službenih partnerskih Xceed poveznica Nightlife Milan u nastavku.',
    afterPurchase: 'Nakon kupovine pošaljite Xceed potvrdu putem WhatsAppa na {phone} i navedite ime, događaj i broj osoba.',
  },
  mk: {
    notTicket: 'Оваа регистрација на Eventbrite е само барање за информации. Не е влезница и не овозможува влез на настанот.',
    purchase: 'За да присуствувате, купете билет или избрана услуга преку една од официјалните партнерски Xceed врски на Nightlife Milan подолу.',
    afterPurchase: 'По купувањето, испратете ја потврдата од Xceed преку WhatsApp на {phone}, со име, настан и број на лица.',
  },
};

export function getEventbriteConfirmationPlainText(
  locale: LocaleCode,
  phone = CONTACT.whatsapp.number,
): EventbriteConfirmationPlainText {
  const copy = CONFIRMATION_COPY[locale];
  if (!copy) throw new Error(`Missing Eventbrite confirmation copy for ${locale}`);
  return {
    notTicket: copy.notTicket,
    purchase: copy.purchase,
    afterPurchase: copy.afterPurchase.replace('{phone}', phone),
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function normalizeEventbriteConfirmationText(value: string): string {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isNightlifeMilanAffiliateUrl(raw: string): boolean {
  try {
    const url = new URL(raw.replace(/&amp;/g, '&'));
    const host = url.hostname.toLowerCase();
    return (host === 'xceed.me' || host === 'www.xceed.me')
      && url.protocol === 'https:'
      && url.pathname.toLowerCase().includes(`/channel/${AFFILIATE_CHANNEL}`);
  } catch {
    return false;
  }
}

export function extractXceedAffiliateUrls(html: string): string[] {
  const candidates = html.match(/https:\/\/(?:www\.)?xceed\.me\/[^\s"'<>]+/gi) || [];
  const unique = new Set<string>();

  for (const candidate of candidates) {
    const normalized = candidate.replace(/&amp;/g, '&').replace(/[),.;]+$/, '');
    if (isNightlifeMilanAffiliateUrl(normalized)) unique.add(normalized);
  }

  return [...unique];
}

export function detectEventLocale(descriptionHtml: string): LocaleCode | null {
  const src = descriptionHtml.match(/nlm:src=[^;]+-([a-z]{2});slug-en=/i)?.[1]?.toLowerCase();
  if (src && isEnabledLocale(src)) return src;

  const curated = descriptionHtml.match(/nlm:curated=[a-z0-9-]+-([a-z]{2})-\d{4}-\d{2}-\d{2}/i)?.[1]?.toLowerCase();
  if (curated && isEnabledLocale(curated)) return curated;

  const legacy = descriptionHtml.match(/nlm:curated=aperitivi-([a-z]{2})-\d{4}-\d{2}-\d{2}/i)?.[1]?.toLowerCase();
  return legacy && isEnabledLocale(legacy) ? legacy : null;
}

export function buildEventbriteConfirmationHtml(
  locale: LocaleCode,
  affiliateUrls: string[],
  context?: EventbriteConfirmationContext,
): string {
  if (affiliateUrls.length === 0) throw new Error('At least one verified Xceed affiliate URL is required');
  if (!affiliateUrls.every(isNightlifeMilanAffiliateUrl)) throw new Error('Invalid Xceed affiliate URL');

  const copy = CONFIRMATION_COPY[locale];
  const pack = getEventLocalePack(locale);
  if (!copy || !pack) throw new Error(`Missing Eventbrite confirmation copy for ${locale}`);

  const phone = `<a href="${escapeHtml(CONTACT.whatsapp.link)}">${escapeHtml(CONTACT.whatsapp.number)}</a>`;
  const afterPurchase = copy.afterPurchase.replace('{phone}', phone);
  const links = affiliateUrls
    .map((url, index) => `<li><a href="${escapeHtml(url)}">${escapeHtml(pack.eventbrite.buyTickets)}${affiliateUrls.length > 1 ? ` ${index + 1}` : ''}</a></li>`)
    .join('');
  const eventContext = context
    ? `<p><strong>${escapeHtml(context.heading)}</strong></p><p>${escapeHtml(context.details)}</p>`
    : '';

  return `${eventContext}<p><strong>${escapeHtml(copy.notTicket)}</strong></p><p>${escapeHtml(copy.purchase)}</p><ul>${links}</ul><p>${afterPurchase}</p>`;
}

export interface EventbriteConfirmationResult {
  ok: boolean;
  status: number;
  reason?: string;
}

export async function updateEventbriteConfirmation(params: {
  token: string;
  eventId: string;
  locale: LocaleCode;
  affiliateUrls: string[];
  context?: EventbriteConfirmationContext;
}): Promise<EventbriteConfirmationResult> {
  const html = buildEventbriteConfirmationHtml(params.locale, params.affiliateUrls, params.context);
  const res = await fetch(`${EVENTBRITE_API}/events/${params.eventId}/ticket_buyer_settings/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${params.token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      ticket_buyer_settings: {
        confirmation_message: { html },
        instructions: { html },
      },
    }),
  });

  if (!res.ok) {
    return { ok: false, status: res.status, reason: (await res.text()).slice(0, 500) };
  }

  const verify = await fetch(`${EVENTBRITE_API}/events/${params.eventId}/ticket_buyer_settings/`, {
    headers: { Authorization: `Bearer ${params.token}` },
  });
  if (!verify.ok) return { ok: false, status: verify.status, reason: 'Verification request failed' };

  const current = await verify.json().catch(() => null);
  const saved = `${current?.confirmation_message?.html || ''} ${current?.instructions?.html || ''}`;
  const savedText = normalizeEventbriteConfirmationText(saved);
  const verified = params.affiliateUrls.every((url) => saved.includes(url))
    && saved.includes(CONTACT.whatsapp.number)
    && (!params.context || (
      savedText.includes(params.context.heading)
      && savedText.includes(params.context.details)
    ));

  return verified
    ? { ok: true, status: verify.status }
    : { ok: false, status: verify.status, reason: 'Eventbrite did not persist the expected confirmation content' };
}

export function validateEventbriteConfirmationCoverage(): void {
  const missing = enabledLocaleCodes.filter((locale) => !CONFIRMATION_COPY[locale]);
  if (missing.length > 0) throw new Error(`Missing Eventbrite confirmation copy: ${missing.join(', ')}`);
}
