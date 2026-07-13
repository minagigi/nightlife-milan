import type { LocaleCode } from './locales';
import { homeDict } from './dicts/home';
import { aperitivoDict } from './dicts/aperitivo';
import { vipTablesDict } from './dicts/vip-tables';
import { guidesDict } from './dicts/guides';
import { eventsSpecialDict } from './dicts/events-special';
import { faqDict } from './dicts/faq';
import { bottlePricesDict } from './dicts/bottle-prices';
import { eventsSlugDict } from './dicts/events-slug';
import { zonesDict } from './dicts/zones';
import { calendarThisWeekDict } from './dicts/calendar-this-week';
import { eventsDict } from './dicts/events';
import { calendarTonightDict } from './dicts/calendar-tonight';
import { eventsBestDict } from './dicts/events-best';
import { eventsThisWeekDict } from './dicts/events-this-week';
import { eventsTonightDict } from './dicts/events-tonight';
import { genresSlugDict } from './dicts/genres-slug';
import { doorPolicyDict } from './dicts/door-policy';
import { bookingSuccessDict } from './dicts/booking-success';
import { c_WeeklyProgramDict } from './dicts/c-weeklyprogram';
import { guidesSlugDict } from './dicts/guides-slug';
import { zonesSlugDict } from './dicts/zones-slug';
import { c_EventFiltersDict } from './dicts/c-eventfilters';
import { privacyDict } from './dicts/privacy';
import { termsDict } from './dicts/terms';
import { c_FooterDict } from './dicts/c-footer';
import { clubsSlugDict } from './dicts/clubs-slug';
import { eventsPastDict } from './dicts/events-past';
import { c_BookingFormDict } from './dicts/c-bookingform';
import { c_GoldEventContentDict } from './dicts/c-goldeventcontent';
import { c_MobileBottomBarDict } from './dicts/c-mobilebottombar';
import { c_NewsletterHubDict } from './dicts/c-newsletterhub';
import { clubsDict } from './dicts/clubs';
import { conciergeDict } from './dicts/concierge';
import { layoutDict } from './dicts/layout';
import { c_EventCardDict } from './dicts/c-eventcard';
import { c_HeaderDict } from './dicts/c-header';
import { c_IntentCardsDict } from './dicts/c-intentcards';

// Dizionario aggregato dei contenuti di pagina (una pagina = un file in dicts/).
export const PAGE_DICT: Record<string, Partial<Record<LocaleCode, string>>> = {
  ...homeDict,
  ...aperitivoDict,
  ...vipTablesDict,
  ...guidesDict,
  ...eventsSpecialDict,
  ...faqDict,
  ...bottlePricesDict,
  ...eventsSlugDict,
  ...zonesDict,
  ...calendarThisWeekDict,
  ...eventsDict,
  ...calendarTonightDict,
  ...eventsBestDict,
  ...eventsThisWeekDict,
  ...eventsTonightDict,
  ...genresSlugDict,
  ...doorPolicyDict,
  ...bookingSuccessDict,
  ...c_WeeklyProgramDict,
  ...guidesSlugDict,
  ...zonesSlugDict,
  ...c_EventFiltersDict,
  ...privacyDict,
  ...termsDict,
  ...c_FooterDict,
  ...clubsSlugDict,
  ...eventsPastDict,
  ...c_BookingFormDict,
  ...c_GoldEventContentDict,
  ...c_MobileBottomBarDict,
  ...c_NewsletterHubDict,
  ...clubsDict,
  ...conciergeDict,
  ...layoutDict,
  ...c_EventCardDict,
  ...c_HeaderDict,
  ...c_IntentCardsDict,
};
