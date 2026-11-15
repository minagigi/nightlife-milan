import { enabledLocaleCodes } from './i18n/locales';
import { EVENTBRITE_DISCONNECTED_MESSAGE } from './eventbriteDisconnected';
import type { IncomingCrmAttendance } from './crmModel';

const LOCALES = new Set<string>(enabledLocaleCodes);

interface RawEventbriteEvent {
  id?: string;
  name?: { text?: string };
  description?: { text?: string; html?: string };
  start?: { utc?: string };
  venue?: { name?: string };
}

interface RawContactPreferences {
  has_contact_list?: boolean;
  has_opted_in?: boolean;
}

interface RawEventbriteAttendee {
  id: string;
  created?: string;
  changed?: string;
  quantity?: number;
  profile?: {
    name?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    cell_phone?: string;
  };
  checked_in?: boolean;
  cancelled?: boolean;
  refunded?: boolean;
  status?: string;
  ticket_class_name?: string;
  event_id?: string;
  order_id?: string;
  event?: RawEventbriteEvent;
  contact_list_preferences?: RawContactPreferences;
}

interface EventbriteAttendeePage {
  attendees?: RawEventbriteAttendee[];
  pagination?: {
    page_number?: number;
    page_count?: number;
    has_more_items?: boolean;
    continuation?: string;
  };
}

export interface EventbriteCrmSyncResult {
  importedAttendances: number;
  createdContacts: number;
  updatedContacts: number;
  totalContacts: number;
  totalAttendances: number;
  completedAt: string;
}

function clean(value: string | null | undefined, max: number): string | null {
  const text = value?.replace(/\s+/g, ' ').trim() || '';
  return text ? text.slice(0, max) : null;
}

export function inferCrmEventLocale(event: RawEventbriteEvent | undefined): string | null {
  const description = event?.description?.html || event?.description?.text || '';
  const marker = description.match(/nlm:src=[^;]+-([a-z]{2})(?:;|$)/i)?.[1]?.toLowerCase();
  return marker && LOCALES.has(marker) ? marker : null;
}

export function inferCrmVenue(event: RawEventbriteEvent | undefined): string | null {
  const explicit = clean(event?.venue?.name, 160);
  if (explicit) return explicit;
  const title = event?.name?.text?.toLowerCase() || '';
  if (/just\s*me/.test(title)) return 'Just Me Milano';
  if (title.includes('pineta')) return 'Pineta Club';
  if (/\baria\b/.test(title)) return 'Aria Club Milano';
  return null;
}

export function mapEventbriteAttendee(attendee: RawEventbriteAttendee, syncedAt: string): IncomingCrmAttendance {
  const registeredAt = attendee.created || syncedAt;
  const changedAt = attendee.changed || registeredAt;
  const eventId = attendee.event_id || attendee.event?.id || 'unknown';
  const name = clean(attendee.profile?.name, 180)
    || clean([attendee.profile?.first_name, attendee.profile?.last_name].filter(Boolean).join(' '), 180)
    || clean(attendee.profile?.email, 320)
    || 'Contatto Eventbrite';

  return {
    id: attendee.id,
    contact: {
      name,
      firstName: clean(attendee.profile?.first_name, 100),
      lastName: clean(attendee.profile?.last_name, 100),
      email: clean(attendee.profile?.email, 320),
      phone: clean(attendee.profile?.cell_phone, 40),
      preferredLocale: inferCrmEventLocale(attendee.event),
      emailMarketingStatus: attendee.contact_list_preferences?.has_opted_in === true ? 'opted_in' : 'not_opted_in',
      permissionUpdatedAt: changedAt,
    },
    eventbriteEventId: eventId,
    eventName: clean(attendee.event?.name?.text, 240) || `Evento Eventbrite ${eventId}`,
    eventStartUtc: attendee.event?.start?.utc || null,
    eventLocale: inferCrmEventLocale(attendee.event),
    venueName: inferCrmVenue(attendee.event),
    orderId: clean(attendee.order_id, 80),
    ticketClassName: clean(attendee.ticket_class_name, 180),
    quantity: Math.max(1, Number(attendee.quantity) || 1),
    registeredAt,
    changedAt,
    status: clean(attendee.status, 80) || 'Unknown',
    checkedIn: attendee.checked_in === true,
    cancelled: attendee.cancelled === true,
    refunded: attendee.refunded === true,
  };
}

export async function syncEventbriteCrm(): Promise<EventbriteCrmSyncResult> {
  throw new Error(EVENTBRITE_DISCONNECTED_MESSAGE);
}
