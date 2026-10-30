import type { LocaleCode } from './locales';
import { homeDict } from './dicts/home';
import { aperitivoDict } from './dicts/aperitivo';
import { guidesDict } from './dicts/guides';
import { conciergeDict } from './dicts/concierge';
import { vipTablesDict } from './dicts/vip-tables';
import { doorPolicyDict } from './dicts/door-policy';

export const currentHomeDict: Partial<Record<LocaleCode, any>> = homeDict as any;
export const currentAperitivoDict: Partial<Record<LocaleCode, any>> = aperitivoDict as any;
export const currentGuidesDict: Partial<Record<LocaleCode, any>> = guidesDict as any;
export const currentConciergeDict: Partial<Record<LocaleCode, any>> = conciergeDict as any;
export const currentVipTablesDict: Partial<Record<LocaleCode, any>> = vipTablesDict as any;
export const currentDoorPolicyDict: Partial<Record<LocaleCode, any>> = doorPolicyDict as any;

export function currentHomeGridAlts(
  locale: string,
): readonly [string, string, string, string, string, string, string, string] {
  if (locale === 'it') {
    return [
      'Club techno e musica elettronica a Milano',
      'Tavoli VIP e servizio bottiglie nei club di Milano',
      'Royal Aperitivo e rooftop panoramici a Milano',
      'Quartiere Navigli e vita notturna a Milano',
      'Corso Como e Porta Garibaldi club a Milano',
      'Guide ufficiali vita notturna Milano 2026',
      'Servizio VIP Concierge WhatsApp Milano',
      'Tutti i 20 migliori club e discoteche di Milano',
    ];
  }
  return [
    'Techno and underground electronic clubs in Milan',
    'VIP tables and bottle service at Milan nightclubs',
    'Royal Aperitivo and panoramic rooftop lounges in Milan',
    'Navigli canal district nightlife in Milan',
    'Corso Como and Porta Garibaldi clubs in Milan',
    'Official Milan nightlife insider guides 2026',
    '24/7 VIP WhatsApp Concierge desk in Milan',
    'All 20 best nightclubs and lounges in Milan',
  ];
}
