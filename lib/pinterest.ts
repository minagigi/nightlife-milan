import type { LocaleCode } from '@/lib/i18n/localeRegistry';

/**
 * Pinterest: verifica dominio + Tag di conversione.
 *
 * Tutto e' INERTE finche' le variabili d'ambiente sono vuote:
 * - NEXT_PUBLIC_PINTEREST_DOMAIN_VERIFY -> <meta name="p:domain_verify"> (layout)
 * - NEXT_PUBLIC_PINTEREST_TAG_ID        -> banner consenso marketing + core.js
 * Senza Tag ID non si mostra il banner e non si carica nessuno script Pinterest.
 * Le NEXT_PUBLIC_* vengono incise al build: dopo averle impostate su Vercel serve un redeploy.
 */

export const PINTEREST_DOMAIN_VERIFY = (process.env.NEXT_PUBLIC_PINTEREST_DOMAIN_VERIFY || '').trim();

const RAW_TAG_ID = (process.env.NEXT_PUBLIC_PINTEREST_TAG_ID || '').trim();
/** Il Tag ID Pinterest e' numerico: qualsiasi altro valore viene ignorato. */
export const PINTEREST_TAG_ID = /^\d{6,20}$/.test(RAW_TAG_ID) ? RAW_TAG_ID : '';
export const PINTEREST_ENABLED = PINTEREST_TAG_ID !== '';

export const PINTEREST_CORE_SRC = 'https://s.pinimg.com/ct/core.js';

/** Consenso marketing (localStorage, mai cookie, mai dati personali). */
export const MARKETING_CONSENT_KEY = 'nlm_marketing_consent_v1';
export const MARKETING_CONSENT_EVENT = 'nlm:marketing-consent';

export type MarketingConsent = 'granted' | 'denied' | null;

export function readMarketingConsent(): MarketingConsent {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(MARKETING_CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { v?: string };
    return parsed.v === 'granted' || parsed.v === 'denied' ? parsed.v : null;
  } catch {
    return null;
  }
}

export function writeMarketingConsent(value: MarketingConsent) {
  if (typeof window === 'undefined') return;
  try {
    if (value === null) window.localStorage.removeItem(MARKETING_CONSENT_KEY);
    else window.localStorage.setItem(MARKETING_CONSENT_KEY, JSON.stringify({ v: value, t: Date.now() }));
  } catch {
    /* storage bloccato: la scelta vale solo per questa pagina */
  }
  window.dispatchEvent(new CustomEvent(MARKETING_CONSENT_EVENT, { detail: value }));
}

/** Link che valgono come lead Pinterest: Xceed affiliate e WhatsApp concierge. */
export function pinterestLeadType(href: string): 'xceed' | 'whatsapp' | null {
  if (/xceed\.me\/.*nightlifemilan-1/i.test(href)) return 'xceed';
  if (/\/\/(wa\.me\/393519127047|api\.whatsapp\.com\/send\?phone=393519127047)/i.test(href)) return 'whatsapp';
  return null;
}

export type MarketingConsentCopy = {
  text: string;
  accept: string;
  reject: string;
  policy: string;
  manage: string;
};

export const MARKETING_CONSENT_COPY_35: Record<LocaleCode, MarketingConsentCopy> = {
  en: { text: 'We use the Pinterest Tag, a marketing cookie, to measure visits that arrive from Pinterest. It loads only if you accept.', accept: 'Accept', reject: 'Reject', policy: 'Cookie Policy', manage: 'Change marketing cookie choice' },
  it: { text: 'Usiamo il Pinterest Tag, un cookie di marketing, per misurare le visite che arrivano da Pinterest. Si attiva solo se accetti.', accept: 'Accetta', reject: 'Rifiuta', policy: 'Cookie Policy', manage: 'Modifica la scelta sui cookie di marketing' },
  es: { text: 'Usamos el Pinterest Tag, una cookie de marketing, para medir las visitas que llegan desde Pinterest. Solo se activa si aceptas.', accept: 'Aceptar', reject: 'Rechazar', policy: 'Política de cookies', manage: 'Cambiar la elección sobre cookies de marketing' },
  fr: { text: 'Nous utilisons le Pinterest Tag, un cookie marketing, pour mesurer les visites venant de Pinterest. Il ne s’active que si vous acceptez.', accept: 'Accepter', reject: 'Refuser', policy: 'Politique de cookies', manage: 'Modifier le choix sur les cookies marketing' },
  de: { text: 'Wir verwenden den Pinterest Tag, ein Marketing-Cookie, um Besuche über Pinterest zu messen. Er wird nur mit Ihrer Zustimmung geladen.', accept: 'Akzeptieren', reject: 'Ablehnen', policy: 'Cookie-Richtlinie', manage: 'Auswahl zu Marketing-Cookies ändern' },
  pt: { text: 'Usamos o Pinterest Tag, um cookie de marketing, para medir as visitas que chegam do Pinterest. Só é ativado se aceitar.', accept: 'Aceitar', reject: 'Recusar', policy: 'Política de cookies', manage: 'Alterar a escolha sobre cookies de marketing' },
  nl: { text: 'We gebruiken de Pinterest Tag, een marketingcookie, om bezoeken via Pinterest te meten. Hij laadt alleen als je akkoord gaat.', accept: 'Accepteren', reject: 'Weigeren', policy: 'Cookiebeleid', manage: 'Keuze voor marketingcookies wijzigen' },
  ru: { text: 'Мы используем Pinterest Tag, маркетинговый cookie, чтобы учитывать визиты из Pinterest. Он загружается только с вашего согласия.', accept: 'Принять', reject: 'Отклонить', policy: 'Политика cookie', manage: 'Изменить выбор по маркетинговым cookie' },
  tr: { text: 'Pinterest’ten gelen ziyaretleri ölçmek için bir pazarlama çerezi olan Pinterest Tag’i kullanıyoruz. Yalnızca kabul ederseniz yüklenir.', accept: 'Kabul et', reject: 'Reddet', policy: 'Çerez Politikası', manage: 'Pazarlama çerezi tercihini değiştir' },
  zh: { text: '我们使用营销类 Cookie「Pinterest Tag」来统计来自 Pinterest 的访问。仅在您同意后才会加载。', accept: '接受', reject: '拒绝', policy: 'Cookie 政策', manage: '更改营销 Cookie 选择' },
  ar: { text: 'نستخدم Pinterest Tag، وهو ملف تعريف ارتباط تسويقي، لقياس الزيارات القادمة من Pinterest. لا يتم تحميله إلا بموافقتك.', accept: 'قبول', reject: 'رفض', policy: 'سياسة ملفات تعريف الارتباط', manage: 'تغيير اختيار ملفات التسويق' },
  bg: { text: 'Използваме Pinterest Tag, маркетингова бисквитка, за да измерваме посещенията от Pinterest. Зарежда се само ако приемете.', accept: 'Приемам', reject: 'Отказвам', policy: 'Политика за бисквитките', manage: 'Промяна на избора за маркетингови бисквитки' },
  hr: { text: 'Koristimo Pinterest Tag, marketinški kolačić, za mjerenje posjeta koji dolaze s Pinteresta. Učitava se samo ako prihvatite.', accept: 'Prihvaćam', reject: 'Odbijam', policy: 'Politika kolačića', manage: 'Promijeni izbor marketinških kolačića' },
  cs: { text: 'Používáme Pinterest Tag, marketingový soubor cookie, k měření návštěv z Pinterestu. Načte se jen s vaším souhlasem.', accept: 'Přijmout', reject: 'Odmítnout', policy: 'Zásady cookies', manage: 'Změnit volbu marketingových cookies' },
  da: { text: 'Vi bruger Pinterest Tag, en marketingcookie, til at måle besøg fra Pinterest. Den indlæses kun, hvis du accepterer.', accept: 'Accepter', reject: 'Afvis', policy: 'Cookiepolitik', manage: 'Skift valg for marketingcookies' },
  et: { text: 'Kasutame Pinterest Tagi, turundusküpsist, et mõõta Pinterestist tulevaid külastusi. See laaditakse ainult teie nõusolekul.', accept: 'Nõustun', reject: 'Keeldun', policy: 'Küpsiste eeskiri', manage: 'Muuda turundusküpsiste valikut' },
  fi: { text: 'Käytämme Pinterest Tagia, markkinointievästettä, Pinterestistä tulevien käyntien mittaamiseen. Se latautuu vain, jos hyväksyt.', accept: 'Hyväksy', reject: 'Hylkää', policy: 'Evästekäytäntö', manage: 'Muuta markkinointievästeiden valintaa' },
  el: { text: 'Χρησιμοποιούμε το Pinterest Tag, ένα cookie μάρκετινγκ, για να μετράμε τις επισκέψεις από το Pinterest. Φορτώνεται μόνο αν αποδεχτείτε.', accept: 'Αποδοχή', reject: 'Απόρριψη', policy: 'Πολιτική cookies', manage: 'Αλλαγή επιλογής για cookies μάρκετινγκ' },
  hu: { text: 'A Pinterest Tag marketingsütit használjuk a Pinterestről érkező látogatások mérésére. Csak az Ön hozzájárulásával töltődik be.', accept: 'Elfogadom', reject: 'Elutasítom', policy: 'Sütikezelési tájékoztató', manage: 'Marketingsütik beállításának módosítása' },
  ga: { text: 'Úsáidimid an Pinterest Tag, fianán margaíochta, chun cuairteanna ó Pinterest a thomhas. Ní lódáiltear é ach má ghlacann tú leis.', accept: 'Glac leis', reject: 'Diúltaigh', policy: 'Polasaí Fianán', manage: 'Athraigh rogha na bhfianán margaíochta' },
  lv: { text: 'Mēs izmantojam Pinterest Tag, mārketinga sīkdatni, lai mērītu apmeklējumus no Pinterest. Tā tiek ielādēta tikai ar jūsu piekrišanu.', accept: 'Piekrītu', reject: 'Noraidīt', policy: 'Sīkdatņu politika', manage: 'Mainīt mārketinga sīkdatņu izvēli' },
  lt: { text: 'Naudojame Pinterest Tag, rinkodaros slapuką, kad įvertintume apsilankymus iš Pinterest. Jis įkeliamas tik jums sutikus.', accept: 'Sutinku', reject: 'Atmesti', policy: 'Slapukų politika', manage: 'Keisti rinkodaros slapukų pasirinkimą' },
  mt: { text: 'Nużaw il-Pinterest Tag, cookie tal-marketing, biex inkejlu ż-żjarat li jaslu minn Pinterest. Jitgħabba biss jekk taċċetta.', accept: 'Naċċetta', reject: 'Nirrifjuta', policy: 'Politika tal-Cookies', manage: 'Ibdel l-għażla tal-cookies tal-marketing' },
  pl: { text: 'Używamy Pinterest Tag, marketingowego pliku cookie, aby mierzyć wizyty z Pinteresta. Ładuje się tylko po Twojej zgodzie.', accept: 'Akceptuję', reject: 'Odrzucam', policy: 'Polityka cookies', manage: 'Zmień wybór dotyczący marketingowych cookies' },
  ro: { text: 'Folosim Pinterest Tag, un cookie de marketing, pentru a măsura vizitele venite de pe Pinterest. Se încarcă doar dacă accepți.', accept: 'Accept', reject: 'Refuz', policy: 'Politica de cookie-uri', manage: 'Schimbă alegerea pentru cookie-urile de marketing' },
  sk: { text: 'Používame Pinterest Tag, marketingový súbor cookie, na meranie návštev z Pinterestu. Načíta sa len s vaším súhlasom.', accept: 'Prijať', reject: 'Odmietnuť', policy: 'Zásady cookies', manage: 'Zmeniť voľbu marketingových cookies' },
  sl: { text: 'Uporabljamo Pinterest Tag, piškotek za trženje, za merjenje obiskov s Pinteresta. Naloži se le, če se strinjate.', accept: 'Sprejmem', reject: 'Zavrnem', policy: 'Politika piškotkov', manage: 'Spremeni izbiro trženjskih piškotkov' },
  sv: { text: 'Vi använder Pinterest Tag, en marknadsföringscookie, för att mäta besök som kommer från Pinterest. Den laddas bara om du godkänner.', accept: 'Godkänn', reject: 'Avvisa', policy: 'Cookiepolicy', manage: 'Ändra val för marknadsföringscookies' },
  no: { text: 'Vi bruker Pinterest Tag, en markedsføringscookie, for å måle besøk som kommer fra Pinterest. Den lastes bare hvis du godtar.', accept: 'Godta', reject: 'Avvis', policy: 'Retningslinjer for informasjonskapsler', manage: 'Endre valg for markedsføringscookies' },
  is: { text: 'Við notum Pinterest Tag, markaðsvafrakökur, til að mæla heimsóknir frá Pinterest. Hún hleðst aðeins inn ef þú samþykkir.', accept: 'Samþykkja', reject: 'Hafna', policy: 'Vafrakökustefna', manage: 'Breyta vali á markaðsvafrakökum' },
  uk: { text: 'Ми використовуємо Pinterest Tag, маркетинговий cookie, щоб враховувати візити з Pinterest. Він завантажується лише з вашої згоди.', accept: 'Прийняти', reject: 'Відхилити', policy: 'Політика cookie', manage: 'Змінити вибір щодо маркетингових cookie' },
  sq: { text: 'Përdorim Pinterest Tag, një cookie marketingu, për të matur vizitat që vijnë nga Pinterest. Ngarkohet vetëm nëse pranoni.', accept: 'Pranoj', reject: 'Refuzoj', policy: 'Politika e cookies', manage: 'Ndrysho zgjedhjen për cookies të marketingut' },
  sr: { text: 'Koristimo Pinterest Tag, marketinški kolačić, za merenje poseta koje dolaze sa Pinteresta. Učitava se samo ako prihvatite.', accept: 'Prihvatam', reject: 'Odbijam', policy: 'Politika kolačića', manage: 'Promeni izbor marketinških kolačića' },
  bs: { text: 'Koristimo Pinterest Tag, marketinški kolačić, za mjerenje posjeta koje dolaze s Pinteresta. Učitava se samo ako prihvatite.', accept: 'Prihvatam', reject: 'Odbijam', policy: 'Politika kolačića', manage: 'Promijeni izbor marketinških kolačića' },
  mk: { text: 'Користиме Pinterest Tag, маркетиншко колаче, за мерење на посетите што доаѓаат од Pinterest. Се вчитува само ако прифатите.', accept: 'Прифаќам', reject: 'Одбивам', policy: 'Политика за колачиња', manage: 'Промени го изборот за маркетиншки колачиња' },
};

export function getMarketingConsentCopy(locale: string): MarketingConsentCopy {
  return MARKETING_CONSENT_COPY_35[locale as LocaleCode] || MARKETING_CONSENT_COPY_35.en;
}

/** Riga per Cookie Policy e Privacy (EN/IT come il resto dei documenti legali): solo con Tag attivo. */
export const PINTEREST_LEGAL_SECTION = {
  en: {
    cookiesHeading: 'Optional Marketing Cookie: Pinterest Tag',
    privacyHeading: 'Pinterest Tag (Marketing Measurement, Consent Only)',
    body: 'Only after you accept marketing cookies in our banner, we load the Pinterest Tag (Pinterest Europe Ltd., Dublin, Ireland; script s.pinimg.com/ct/core.js). It records page visits and clicks on our Xceed booking links and WhatsApp concierge button, so we can measure visits that arrive from Pinterest. We do not send names, email addresses, phone numbers or other personal details to Pinterest. Legal basis: your consent, which you can withdraw at any time from the Cookie Policy page. Pinterest privacy policy: policy.pinterest.com/privacy-policy.',
  },
  it: {
    cookiesHeading: 'Cookie di Marketing Facoltativo: Pinterest Tag',
    privacyHeading: 'Pinterest Tag (Misurazione Marketing, Solo con Consenso)',
    body: 'Solo dopo che hai accettato i cookie di marketing nel nostro banner carichiamo il Pinterest Tag (Pinterest Europe Ltd., Dublino, Irlanda; script s.pinimg.com/ct/core.js). Registra le visite alle pagine e i clic sui link di prenotazione Xceed e sul pulsante WhatsApp del concierge, per misurare le visite che arrivano da Pinterest. Non inviamo a Pinterest nomi, indirizzi email, numeri di telefono o altri dati personali. Base giuridica: il tuo consenso, revocabile in qualsiasi momento dalla pagina Cookie Policy. Informativa di Pinterest: policy.pinterest.com/it/privacy-policy.',
  },
} as const;
