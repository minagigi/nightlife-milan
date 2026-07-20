import { enabledLocaleCodes } from './i18n/locales';
import { getEventbriteToken } from './eventbriteToken';
import { mergeCrmAttendances, type IncomingCrmAttendance, type CrmSyncRun } from './crmModel';
import { readCrmDatabase, writeCrmDatabase } from './crmStore';

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const EVENTBRITE_ORGANIZATION_ID = '2988002072164';
const MAX_PAGES = 500;
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

async function fetchEventbriteAttendees(): Promise<RawEventbriteAttendee[]> {
  const token = getEventbriteToken();
  if (!token) throw new Error('EVENTBRITE_TOKEN is required for the CRM sync');

  const attendees: RawEventbriteAttendee[] = [];
  let continuation: string | undefined;
  let page = 1;

  for (let requestNumber = 0; requestNumber < MAX_PAGES; requestNumber += 1) {
    const url = new URL(`${EVENTBRITE_API}/organizations/${EVENTBRITE_ORGANIZATION_ID}/attendees/`);
    url.searchParams.set('expand', 'event,contact_list_preferences');
    if (continuation) url.searchParams.set('continuation', continuation);
    else if (page > 1) url.searchParams.set('page', String(page));

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    if (!response.ok) {
      const payload = await response.json().catch(() => null) as {
        error?: string;
        error_description?: string;
      } | null;
      const detail = clean(payload?.error_description || payload?.error, 240);
      throw new Error(
        `Eventbrite attendees request failed with HTTP ${response.status}${detail ? `: ${detail}` : ''}`,
      );
    }

    const data = (await response.json()) as EventbriteAttendeePage;
    attendees.push(...(data.attendees || []));
    const pagination = data.pagination;
    if (!pagination?.has_more_items) return attendees;
    continuation = pagination.continuation;
    page = (pagination.page_number || page) + 1;
  }

  throw new Error(`Eventbrite attendees pagination exceeded ${MAX_PAGES} pages`);
}

export async function syncEventbriteCrm(): Promise<EventbriteCrmSyncResult> {
  const startedAt = new Date().toISOString();
  let phase = 'lettura partecipanti Eventbrite';
  try {
    const rawAttendees = await fetchEventbriteAttendees();
    const completedAt = new Date().toISOString();
    const incoming = rawAttendees.map((attendee) => mapEventbriteAttendee(attendee, completedAt));
    phase = 'lettura archivio CRM';
    const current = await readCrmDatabase();
    const { database, summary } = mergeCrmAttendances(current, incoming, completedAt);
    const syncRun: CrmSyncRun = {
      id: `eventbrite-${completedAt}`,
      startedAt,
      completedAt,
      source: 'eventbrite',
      importedAttendances: summary.importedAttendances,
      totalContacts: summary.totalContacts,
      totalAttendances: summary.totalAttendances,
    };
    database.syncRuns = [syncRun, ...database.syncRuns].slice(0, 30);
    phase = 'scrittura archivio CRM';
    await writeCrmDatabase(database);
    return { ...summary, completedAt };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'errore sconosciuto';
    throw new Error(`Sincronizzazione CRM fallita durante ${phase}: ${message}`);
  }
}
