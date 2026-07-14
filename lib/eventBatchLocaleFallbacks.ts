import type { LocaleCode } from './i18n/locales';

export interface EventBatchLocaleFallback {
  noNamedGuests: string;
  elegantDress: string;
  elegantDressLongTrousers: string;
  milanName: string;
}

export const EVENT_BATCH_LOCALE_FALLBACKS: Record<LocaleCode, EventBatchLocaleFallback> = {
  en: {
    noNamedGuests: 'not announced by name',
    elegantDress: 'Elegant dress is required.',
    elegantDressLongTrousers: 'Elegant dress is required, and men must wear long trousers.',
    milanName: 'Milan',
  },
  it: {
    noNamedGuests: 'non annunciati per nome',
    elegantDress: 'È richiesto un abbigliamento elegante.',
    elegantDressLongTrousers: 'È richiesto un abbigliamento elegante e gli uomini devono indossare pantaloni lunghi.',
    milanName: 'Milano',
  },
  es: {
    noNamedGuests: 'no anunciados por nombre',
    elegantDress: 'Se requiere vestimenta elegante.',
    elegantDressLongTrousers: 'Se requiere vestimenta elegante y los hombres deben llevar pantalón largo.',
    milanName: 'Milán',
  },
  fr: {
    noNamedGuests: 'non annoncés nommément',
    elegantDress: 'Une tenue élégante est exigée.',
    elegantDressLongTrousers: 'Une tenue élégante est exigée et les hommes doivent porter un pantalon long.',
    milanName: 'Milan',
  },
  de: {
    noNamedGuests: 'nicht namentlich angekündigt',
    elegantDress: 'Elegante Kleidung ist erforderlich.',
    elegantDressLongTrousers: 'Elegante Kleidung ist erforderlich; Männer müssen lange Hosen tragen.',
    milanName: 'Mailand',
  },
  pt: {
    noNamedGuests: 'não anunciados nominalmente',
    elegantDress: 'É obrigatório usar traje elegante.',
    elegantDressLongTrousers: 'É obrigatório usar traje elegante, e os homens devem usar calças compridas.',
    milanName: 'Milão',
  },
  nl: {
    noNamedGuests: 'niet bij naam aangekondigd',
    elegantDress: 'Elegante kleding is verplicht.',
    elegantDressLongTrousers: 'Elegante kleding is verplicht en mannen moeten een lange broek dragen.',
    milanName: 'Milaan',
  },
  ru: {
    noNamedGuests: 'не объявлены поимённо',
    elegantDress: 'Требуется элегантная одежда.',
    elegantDressLongTrousers: 'Требуется элегантная одежда; мужчины должны быть в длинных брюках.',
    milanName: 'Милан',
  },
  tr: {
    noNamedGuests: 'isimleri açıklanmadı',
    elegantDress: 'Şık giyim zorunludur.',
    elegantDressLongTrousers: 'Şık giyim zorunludur; erkekler uzun pantolon giymelidir.',
    milanName: 'Milano',
  },
  zh: {
    noNamedGuests: '姓名尚未公布',
    elegantDress: '必须穿着优雅得体。',
    elegantDressLongTrousers: '必须穿着优雅得体，男士必须穿长裤。',
    milanName: '米兰',
  },
  ar: {
    noNamedGuests: 'لم تُعلن أسماؤهم',
    elegantDress: 'يُشترط ارتداء ملابس أنيقة.',
    elegantDressLongTrousers: 'يُشترط ارتداء ملابس أنيقة، وعلى الرجال ارتداء سراويل طويلة.',
    milanName: 'ميلانو',
  },
  bg: {
    noNamedGuests: 'не са обявени поименно',
    elegantDress: 'Изисква се елегантно облекло.',
    elegantDressLongTrousers: 'Изисква се елегантно облекло; мъжете трябва да носят дълги панталони.',
    milanName: 'Милано',
  },
  hr: {
    noNamedGuests: 'nisu navedeni po imenu',
    elegantDress: 'Obavezna je elegantna odjeća.',
    elegantDressLongTrousers: 'Obavezna je elegantna odjeća, a muškarci moraju nositi duge hlače.',
    milanName: 'Milano',
  },
  cs: {
    noNamedGuests: 'nejsou uvedeni jmenovitě',
    elegantDress: 'Požaduje se elegantní oblečení.',
    elegantDressLongTrousers: 'Požaduje se elegantní oblečení a muži musí mít dlouhé kalhoty.',
    milanName: 'Milán',
  },
  da: {
    noNamedGuests: 'ikke offentliggjort ved navn',
    elegantDress: 'Der kræves elegant påklædning.',
    elegantDressLongTrousers: 'Der kræves elegant påklædning, og mænd skal bære lange bukser.',
    milanName: 'Milano',
  },
  et: {
    noNamedGuests: 'nimesid ei ole avalikustatud',
    elegantDress: 'Nõutud on elegantne riietus.',
    elegantDressLongTrousers: 'Nõutud on elegantne riietus ja mehed peavad kandma pikki pükse.',
    milanName: 'Milano',
  },
  fi: {
    noNamedGuests: 'nimiä ei ole ilmoitettu',
    elegantDress: 'Tyylikäs pukeutuminen on pakollista.',
    elegantDressLongTrousers: 'Tyylikäs pukeutuminen on pakollista, ja miesten on käytettävä pitkiä housuja.',
    milanName: 'Milano',
  },
  el: {
    noNamedGuests: 'δεν έχουν ανακοινωθεί ονομαστικά',
    elegantDress: 'Απαιτείται κομψή ενδυμασία.',
    elegantDressLongTrousers: 'Απαιτείται κομψή ενδυμασία και οι άνδρες πρέπει να φορούν μακρύ παντελόνι.',
    milanName: 'Μιλάνο',
  },
  hu: {
    noNamedGuests: 'nincsenek név szerint bejelentve',
    elegantDress: 'Elegáns öltözet szükséges.',
    elegantDressLongTrousers: 'Elegáns öltözet szükséges, a férfiaknak pedig hosszú nadrágot kell viselniük.',
    milanName: 'Milán',
  },
  ga: {
    noNamedGuests: 'níor fógraíodh a n-ainmneacha',
    elegantDress: 'Tá culaith ghalánta riachtanach.',
    elegantDressLongTrousers: 'Tá culaith ghalánta riachtanach, agus caithfidh fir brístí fada a chaitheamh.',
    milanName: 'Milan',
  },
  lv: {
    noNamedGuests: 'nav nosaukti vārdā',
    elegantDress: 'Nepieciešams elegants apģērbs.',
    elegantDressLongTrousers: 'Nepieciešams elegants apģērbs, un vīriešiem jāvalkā garās bikses.',
    milanName: 'Milāna',
  },
  lt: {
    noNamedGuests: 'neįvardyti',
    elegantDress: 'Privaloma elegantiška apranga.',
    elegantDressLongTrousers: 'Privaloma elegantiška apranga, o vyrai privalo dėvėti ilgas kelnes.',
    milanName: 'Milanas',
  },
  mt: {
    noNamedGuests: "mhumiex imħabbra b'isimhom",
    elegantDress: 'Huwa meħtieġ ilbies eleganti.',
    elegantDressLongTrousers: 'Huwa meħtieġ ilbies eleganti, u l-irġiel għandhom jilbsu qalziet twil.',
    milanName: 'Milan',
  },
  pl: {
    noNamedGuests: 'nie podano ich nazwisk',
    elegantDress: 'Obowiązuje elegancki strój.',
    elegantDressLongTrousers: 'Obowiązuje elegancki strój, a mężczyźni muszą nosić długie spodnie.',
    milanName: 'Mediolan',
  },
  ro: {
    noNamedGuests: 'nu au fost anunțați nominal',
    elegantDress: 'Este necesară o ținută elegantă.',
    elegantDressLongTrousers: 'Este necesară o ținută elegantă, iar bărbații trebuie să poarte pantaloni lungi.',
    milanName: 'Milano',
  },
  sk: {
    noNamedGuests: 'neboli oznámení menovite',
    elegantDress: 'Vyžaduje sa elegantné oblečenie.',
    elegantDressLongTrousers: 'Vyžaduje sa elegantné oblečenie a muži musia mať dlhé nohavice.',
    milanName: 'Miláno',
  },
  sl: {
    noNamedGuests: 'niso bili imenovani poimensko',
    elegantDress: 'Zahtevana so elegantna oblačila.',
    elegantDressLongTrousers: 'Zahtevana so elegantna oblačila, moški pa morajo nositi dolge hlače.',
    milanName: 'Milano',
  },
  sv: {
    noNamedGuests: 'inte namngivna',
    elegantDress: 'Elegant klädsel krävs.',
    elegantDressLongTrousers: 'Elegant klädsel krävs, och män måste bära långbyxor.',
    milanName: 'Milano',
  },
  no: {
    noNamedGuests: 'ikke kunngjort ved navn',
    elegantDress: 'Det kreves elegant antrekk.',
    elegantDressLongTrousers: 'Det kreves elegant antrekk, og menn må bruke lange bukser.',
    milanName: 'Milano',
  },
  is: {
    noNamedGuests: 'ekki kynntir með nafni',
    elegantDress: 'Nauðsynlegt er að klæðast glæsilegum fötum.',
    elegantDressLongTrousers: 'Nauðsynlegt er að klæðast glæsilegum fötum og karlmenn verða að vera í síðum buxum.',
    milanName: 'Mílanó',
  },
  uk: {
    noNamedGuests: 'не оголошені поіменно',
    elegantDress: 'Потрібен елегантний одяг.',
    elegantDressLongTrousers: 'Потрібен елегантний одяг, а чоловіки повинні носити довгі штани.',
    milanName: 'Мілан',
  },
  sq: {
    noNamedGuests: 'nuk janë bërë të ditur me emër',
    elegantDress: 'Kërkohet veshje elegante.',
    elegantDressLongTrousers: 'Kërkohet veshje elegante dhe burrat duhet të veshin pantallona të gjata.',
    milanName: 'Milano',
  },
  sr: {
    noNamedGuests: 'nisu navedeni po imenu',
    elegantDress: 'Obavezna je elegantna odeća.',
    elegantDressLongTrousers: 'Obavezna je elegantna odeća, a muškarci moraju da nose duge pantalone.',
    milanName: 'Milano',
  },
  bs: {
    noNamedGuests: 'nisu navedeni po imenu',
    elegantDress: 'Obavezna je elegantna odjeća.',
    elegantDressLongTrousers: 'Obavezna je elegantna odjeća, a muškarci moraju nositi duge pantalone.',
    milanName: 'Milano',
  },
  mk: {
    noNamedGuests: 'не се објавени по име',
    elegantDress: 'Потребна е елегантна облека.',
    elegantDressLongTrousers: 'Потребна е елегантна облека, а мажите мора да носат долги панталони.',
    milanName: 'Милано',
  },
};
