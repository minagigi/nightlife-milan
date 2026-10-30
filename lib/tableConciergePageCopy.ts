import type { LocaleCode } from './i18n/locales';
import { currentHomeDict, currentVipTablesDict } from './i18n/currentSafePageCopy';
import { resolveStrictPageCopy } from './i18n/strictPageCopy';
import { getEventCardCopy } from './i18n/eventCardCopy';
import { getHeroCopy } from './i18n/heroCopy';
import type { TableConciergeCopy } from '@/components/TableConcierge';

const GENERIC_EVENT_COPY: Record<LocaleCode, { eventsTitle: string; empty: string }> = {
  en: { eventsTitle: 'Upcoming Nights & Club Events in Milan', empty: 'Contact WhatsApp Concierge +39 351 912 7047 for tonight’s VIP tables and guest lists.' },
  it: { eventsTitle: 'Prossime Serate ed Eventi nei Club di Milano', empty: 'Contatta il Concierge su WhatsApp +39 351 912 7047 per tavoli VIP e liste di stasera.' },
  es: { eventsTitle: 'Próximas Fiestas y Eventos en los Clubes de Milán', empty: 'Contacta con el Concierge por WhatsApp +39 351 912 7047 para mesas VIP y listas.' },
  fr: { eventsTitle: 'Prochaines Soirées et Événements dans les Clubs de Milan', empty: 'Contactez le Concierge sur WhatsApp +39 351 912 7047 pour les tables VIP et listes.' },
  de: { eventsTitle: 'Kommende Partys & Club-Events in Mailand', empty: 'Kontaktieren Sie den Concierge per WhatsApp +39 351 912 7047 für VIP-Tische und Gästelisten.' },
  pt: { eventsTitle: 'Próximas Festas e Eventos nos Clubes de Milão', empty: 'Contacte o Concierge no WhatsApp +39 351 912 7047 para mesas VIP e listas.' },
  nl: { eventsTitle: 'Aankomende Clubavonden in Milaan', empty: 'Neem contact op via WhatsApp +39 351 912 7047 voor VIP-tafels en gastenlijsten.' },
  ru: { eventsTitle: 'Ближайшие вечеринки и события в клубах Милана', empty: 'Напишите консьержу в WhatsApp +39 351 912 7047 для брони VIP-столов и списков гостей.' },
  tr: { eventsTitle: 'Milano Kulüplerinde Yaklaşan Etkinlikler', empty: 'VIP masalar ve davetli listeleri için WhatsApp +39 351 912 7047 üzerinden ulaşın.' },
  zh: { eventsTitle: '米兰夜店近期派对与活动', empty: '请通过 WhatsApp +39 351 912 7047 联系礼宾部预订 VIP 卡座与嘉宾名单。' },
  ar: { eventsTitle: 'أحدث السهرات والفعاليات في نوادي ميلانو', empty: 'تواصل مع الكونسيرج عبر واتساب +39 351 912 7047 لطاولات VIP وقوائم الضيوف.' },
  bg: { eventsTitle: 'Предстоящи партита и събития в Милано', empty: 'Свържете се с консиержа в WhatsApp +39 351 912 7047 за VIP маси.' },
  hr: { eventsTitle: 'Nadolazeći klupski događaji u Milanu', empty: 'Kontaktirajte concierge na WhatsApp +39 351 912 7047 za VIP stolove.' },
  cs: { eventsTitle: 'Nadcházející klubové akce v Miláně', empty: 'Kontaktujte concierge na WhatsApp +39 351 912 7047 pro VIP stoly a guestlisty.' },
  da: { eventsTitle: 'Kommende klubaftener i Milano', empty: 'Kontakt concierge på WhatsApp +39 351 912 7047 for VIP-borde og gæstelister.' },
  et: { eventsTitle: 'Tulevased klubiõhtud Milanos', empty: 'Võtke ühendust WhatsAppis +39 351 912 7047 VIP-laudade ja külalistenimekirjade jaoks.' },
  fi: { eventsTitle: 'Tulevat klubi-illat Milanossa', empty: 'Ota yhteyttä WhatsAppissa +39 351 912 7047 VIP-pöytiä ja vieraslistoja varten.' },
  el: { eventsTitle: 'Επερχόμενα πάρτι και εκδηλώσεις στο Μιλάνο', empty: 'Επικοινωνήστε στο WhatsApp +39 351 912 7047 για VIP τραπέζια και λίστες.' },
  hu: { eventsTitle: 'Közelgő klubestek Milánóban', empty: 'Írjon WhatsAppon (+39 351 912 7047) VIP asztalokért és vendéglistákért.' },
  ga: { eventsTitle: 'Oícheanta club atá le teacht i Milano', empty: 'Déan teagmháil ar WhatsApp +39 351 912 7047 le haghaidh boird VIP.' },
  lv: { eventsTitle: 'Gaidāmie klubu pasākumi Milānā', empty: 'Sazinieties WhatsApp +39 351 912 7047 par VIP galdiņiem un viesu sarakstiem.' },
  lt: { eventsTitle: 'Artėjantys klubų renginiai Milane', empty: 'Susisiekite per WhatsApp +39 351 912 7047 dėl VIP staliukų ir svečių sąrašų.' },
  mt: { eventsTitle: 'Serati u avvenimenti li ġejjin f’Milan', empty: 'Ikkuntattja fuq WhatsApp +39 351 912 7047 għal imwejjed VIP.' },
  pl: { eventsTitle: 'Nadchodzące imprezy klubowe w Mediolanie', empty: 'Skontaktuj się przez WhatsApp +39 351 912 7047 w sprawie stolików VIP i list gości.' },
  ro: { eventsTitle: 'Evenimente și petreceri viitoare în Milano', empty: 'Contactează concierge-ul pe WhatsApp +39 351 912 7047 pentru mese VIP și liste.' },
  sk: { eventsTitle: 'Nadchádzajúce klubové podujatia v Miláne', empty: 'Kontaktujte concierge na WhatsApp +39 351 912 7047 pre VIP stoly.' },
  sl: { eventsTitle: 'Prihajajoči klubski dogodki v Milanu', empty: 'Pišite na WhatsApp +39 351 912 7047 za VIP mize in sezname gostov.' },
  sv: { eventsTitle: 'Kommande klubbkvällar i Milano', empty: 'Kontakta concierge via WhatsApp +39 351 912 7047 för VIP-bord och gästlistor.' },
  no: { eventsTitle: 'Kommende klubbkvelder i Milano', empty: 'Kontakt concierge på WhatsApp +39 351 912 7047 for VIP-bord og gjestelister.' },
  is: { eventsTitle: 'Næstu klúbbakvöld í Mílanó', empty: 'Hafðu samband á WhatsApp +39 351 912 7047 fyrir VIP-borð og gestalista.' },
  uk: { eventsTitle: 'Найближчі вечірки та події в Мілані', empty: 'Напишіть у WhatsApp +39 351 912 7047 для бронювання VIP-столів та списків.' },
  sq: { eventsTitle: 'Mbrëmjet dhe eventet e ardhshme në Milano', empty: 'Kontaktoni në WhatsApp +39 351 912 7047 për tavolina VIP dhe lista.' },
  sr: { eventsTitle: 'Predstojeće žurke i događaji u Milanu', empty: 'Pišite na WhatsApp +39 351 912 7047 za VIP stolove i spiskove gostiju.' },
  bs: { eventsTitle: 'Predstojeći klupski događaji u Milanu', empty: 'Pišite na WhatsApp +39 351 912 7047 za VIP stolove i spiskove gostiju.' },
  mk: { eventsTitle: 'Следни клубски настани во Милано', empty: 'Контактирајте на WhatsApp +39 351 912 7047 за VIP маси и списоци.' },
};

export function getTableConciergeLead(locale: string): string {
  return resolveStrictPageCopy(locale, {
    en: 'Select your preferred club, date and group size: our 7/7 Milan Concierge desk (+39 351 912 7047) provides floor plans, bottle menus, minimum spend options and fast-track VIP table or nominal guest-list assistance.',
    it: 'Seleziona locale, data e numero di ospiti: il nostro Concierge Milano attivo 7 giorni su 7 (+39 351 912 7047) ti invia planimetrie privé, listini bottiglie, minimum spend e accredito nominale in lista o tavolo VIP.',
    es: 'Selecciona club, fecha y número de personas: nuestro Concierge en Milán 7/7 (+39 351 912 7047) te envía planos de zonas VIP, cartas de botellas, consumo mínimo y acceso en lista o mesa VIP.',
    fr: 'Sélectionnez le club, la date et la taille du groupe : notre Conciergerie Milan 7j/7 (+39 351 912 7047) vous transmet les plans des carrés VIP, cartes des bouteilles, minimum spend et accréditation liste ou table VIP.',
    de: 'Wählen Sie Club, Datum und Gruppengröße: Unser 7/7 Mailand-Concierge (+39 351 912 7047) sendet Ihnen VIP-Tischpläne, Flaschenkarten, Mindestverzehr-Optionen sowie Gästelisten- und VIP-Tisch-Service.',
    pt: 'Selecione clube, data e número de convidados: o nosso Concierge em Milão 7/7 (+39 351 912 7047) envia plantas das áreas VIP, cartas de garrafas, consumo mínimo e acreditação em lista ou mesa VIP.',
  }, currentVipTablesDict, { trace: 'table-concierge.lead' });
}

export function getTableConciergeSharedCopy(locale: string): Pick<TableConciergeCopy,
  'eyebrow' | 'requestTitle' | 'eventLabel' | 'requestAction' | 'detailAction' | 'disclaimer' | 'eventsTitle' | 'eventsLead' | 'empty' | 'allEvents'> {
  const home = resolveStrictPageCopy(locale, {
    en: { eyebrow: 'Official Concierge Desk · 18:00–05:00 CET', eventLabel: 'Milan Nightlife — Tonight & This Week', requestAction: 'Book / Inquire on WhatsApp', disclaimer: 'Direct WhatsApp assistance 7/7 (+39 351 912 7047) for VIP tables, bottle service, aperitivo and nominal guest lists.', eventsTitle: 'Upcoming Nights This Week', eventsLead: 'Upcoming club nights & DJ sets in Milan', empty: 'Contact WhatsApp +39 351 912 7047 for tonight’s full line-up and VIP availability.', allEvents: 'View full calendar' },
    it: { eyebrow: 'Desk Concierge Ufficiale · 18:00–05:00 CET', eventLabel: 'Serate Milano — Stasera e Questa Settimana', requestAction: 'Prenota / Chiedi su WhatsApp', disclaimer: 'Assistenza diretta WhatsApp 7/7 (+39 351 912 7047) per tavoli VIP, bottle service, aperitivo royal e accredito in lista nominale.', eventsTitle: 'Prossime Serate della Settimana', eventsLead: 'Serate, DJ set e format nei club di Milano', empty: 'Scrivi su WhatsApp +39 351 912 7047 per la line-up completa e la disponibilità tavoli di stasera.', allEvents: 'Vedi calendario completo' },
    es: { eyebrow: 'Desk Concierge Oficial · 18:00–05:00 CET', eventLabel: 'Eventos en Milán — Esta Noche y Esta Semana', requestAction: 'Reservar por WhatsApp', disclaimer: 'Asistencia directa por WhatsApp 7/7 (+39 351 912 7047) para mesas VIP, botellas, aperitivo y listas de invitados.', eventsTitle: 'Próximos Eventos de Esta Semana', eventsLead: 'Fiestas y DJ sets en los clubes de Milán', empty: 'Escribe por WhatsApp +39 351 912 7047 para conocer la programación de esta noche.', allEvents: 'Ver calendario completo' },
    fr: { eyebrow: 'Conciergerie Officielle · 18h00–05h00 CET', eventLabel: 'Soirées à Milan — Ce Soir et Cette Semaine', requestAction: 'Réserver sur WhatsApp', disclaimer: 'Assistance directe WhatsApp 7j/7 (+39 351 912 7047) pour tables VIP, bouteilles, aperitivo et listes d’invités.', eventsTitle: 'Soirées à Venir Cette Semaine', eventsLead: 'Soirées club et DJ sets à Milan', empty: 'Écrivez sur WhatsApp +39 351 912 7047 pour la programmation complète de ce soir.', allEvents: 'Voir tout le calendrier' },
    de: { eyebrow: 'Offizieller Concierge-Desk · 18:00–05:00 CET', eventLabel: 'Events in Mailand — Heute Abend & Diese Woche', requestAction: 'Per WhatsApp reservieren', disclaimer: 'Direkter WhatsApp-Support 7/7 (+39 351 912 7047) für VIP-Tische, Flaschenservice, Aperitivo und Gästelisten.', eventsTitle: 'Kommende Events Diese Woche', eventsLead: 'Clubnächte und DJ-Sets in Mailand', empty: 'Schreiben Sie uns per WhatsApp +39 351 912 7047 für das aktuelle Line-up.', allEvents: 'Gesamten Kalender ansehen' },
    pt: { eyebrow: 'Desk Concierge Oficial · 18:00–05:00 CET', eventLabel: 'Eventos em Milão — Hoje e Esta Semana', requestAction: 'Reservar pelo WhatsApp', disclaimer: 'Atendimento direto no WhatsApp 7/7 (+39 351 912 7047) para mesas VIP, garrafas, aperitivo e listas de convidados.', eventsTitle: 'Próximos Eventos Desta Semana', eventsLead: 'Festas e DJ sets nos clubes de Milão', empty: 'Envie mensagem no WhatsApp +39 351 912 7047 para a programação completa de hoje.', allEvents: 'Ver calendário completo' },
  }, currentHomeDict, { trace: 'table-concierge.home' });
  const hero = getHeroCopy(locale);
  const generic = GENERIC_EVENT_COPY[locale as LocaleCode] || GENERIC_EVENT_COPY.en;
  return {
    ...home,
    requestTitle: hero.cta,
    requestAction: hero.cta,
    eventLabel: generic.eventsTitle,
    detailAction: getEventCardCopy(locale).viewEvent,
    eventsTitle: generic.eventsTitle,
    empty: generic.empty,
  };
}
