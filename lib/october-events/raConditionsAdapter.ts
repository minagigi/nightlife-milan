import localePacks from './ra-condition-locales.json' with { type: 'json' };

export const ROME_TIME_ZONE = 'Europe/Rome';

export const conditionCodes = [
  'minimum_age',
  'membership_required',
  'membership_or_online_request_required',
  'online_event_registration_required',
  'aics_membership_required',
  'advance_subscription_deadline',
  'classic_and_formal_attire_unwelcome',
  'door_selection_possible',
  'door_tickets_only',
  'door_admission_may_be_refused',
  'noDoorEntry',
  'noOnsiteMembership',
  'bukaMembershipAndEventContributionRequired',
  'availability_not_open',
] as const;

export type RaConditionCode = (typeof conditionCodes)[number];
export type RaConditionCopy = Record<RaConditionCode, string>;
export type RaConditionLocale = keyof typeof localePacks;

export type RaCondition =
  | { code: 'minimum_age'; minimumAge: number }
  | { code: 'membership_required' }
  | { code: 'membership_or_online_request_required' }
  | { code: 'online_event_registration_required' }
  | { code: 'aics_membership_required' }
  | { code: 'advance_subscription_deadline'; deadline: string }
  | { code: 'classic_and_formal_attire_unwelcome' }
  | { code: 'door_selection_possible' }
  | { code: 'door_tickets_only' }
  | { code: 'door_admission_may_be_refused' }
  | { code: 'noDoorEntry' }
  | { code: 'noOnsiteMembership' }
  | {
      code: 'bukaMembershipAndEventContributionRequired';
      membershipFee: number;
      eventContribution: number;
      currency: 'EUR';
      membershipValidityDays: number;
    }
  | { code: 'availability_not_open' };

const localeTags: Record<RaConditionLocale, string> = {
  en: 'en-GB', it: 'it-IT', es: 'es-ES', fr: 'fr-FR', de: 'de-DE', pt: 'pt-PT',
  nl: 'nl-NL', ru: 'ru-RU', tr: 'tr-TR', zh: 'zh-CN', ar: 'ar', bg: 'bg-BG',
  hr: 'hr-HR', cs: 'cs-CZ', da: 'da-DK', et: 'et-EE', fi: 'fi-FI', el: 'el-GR',
  hu: 'hu-HU', ga: 'ga-IE', lv: 'lv-LV', lt: 'lt-LT', mt: 'mt-MT', pl: 'pl-PL',
  ro: 'ro-RO', sk: 'sk-SK', sl: 'sl-SI', sv: 'sv-SE', no: 'nb-NO', is: 'is-IS',
  uk: 'uk-UA', sq: 'sq-AL', sr: 'sr-RS', bs: 'bs-BA', mk: 'mk-MK',
};

function hasOwn(value: object, key: PropertyKey): boolean {
  return Object.hasOwn(value, key);
}

export function getRaConditionCopy(locale: string): RaConditionCopy {
  if (!hasOwn(localePacks, locale)) {
    throw new Error(`Unsupported RA condition locale: ${locale}`);
  }
  return localePacks[locale as RaConditionLocale] as RaConditionCopy;
}

export function formatRomeDeadline(inputDate: string, locale: string): string {
  const copy = getRaConditionCopy(locale);
  void copy;
  const date = new Date(inputDate);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid RA condition deadline: ${inputDate}`);
  }

  return new Intl.DateTimeFormat(localeTags[locale as RaConditionLocale], {
    timeZone: ROME_TIME_ZONE,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(date);
}

export function formatCurrencyAmount(amount: number, currency: 'EUR', locale: string): string {
  getRaConditionCopy(locale);
  if (!Number.isFinite(amount)) {
    throw new Error(`Invalid RA condition amount: ${amount}`);
  }
  return new Intl.NumberFormat(localeTags[locale as RaConditionLocale], {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
  }).format(amount);
}

export function getRaConditionText(locale: string, condition: RaCondition): string {
  const template = getRaConditionCopy(locale)[condition.code];

  switch (condition.code) {
    case 'minimum_age':
      return template.replace('{minimumAge}', String(condition.minimumAge));
    case 'advance_subscription_deadline':
      return template.replace('{deadline}', formatRomeDeadline(condition.deadline, locale));
    case 'bukaMembershipAndEventContributionRequired':
      return template
        .replace('{membershipFee}', formatCurrencyAmount(condition.membershipFee, condition.currency, locale))
        .replace('{membershipValidityDays}', String(condition.membershipValidityDays))
        .replace('{eventContribution}', formatCurrencyAmount(condition.eventContribution, condition.currency, locale));
    default:
      return template;
  }
}

export function getRaConditionTexts(locale: string, conditions: readonly RaCondition[]): string[] {
  return conditions.map((condition) => getRaConditionText(locale, condition));
}
