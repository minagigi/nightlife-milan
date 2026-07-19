import { createHash } from 'node:crypto';

export type CrmPermissionStatus = 'opted_in' | 'not_opted_in' | 'opted_out';
export type CrmPermissionSource = 'eventbrite' | 'manual' | 'none';

export interface CrmPermission {
  status: CrmPermissionStatus;
  source: CrmPermissionSource;
  updatedAt: string | null;
}

export interface CrmContactStats {
  events: number;
  tickets: number;
  checkIns: number;
  firstEventAt: string | null;
  lastEventAt: string | null;
  venues: string[];
  locales: string[];
}

export interface CrmContact {
  id: string;
  name: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  preferredLocale: string | null;
  firstSeenAt: string;
  lastSeenAt: string;
  emailMarketing: CrmPermission;
  whatsappMarketing: CrmPermission;
  tags: string[];
  notes: string;
  stats: CrmContactStats;
}

export interface CrmAttendance {
  id: string;
  contactId: string;
  eventbriteEventId: string;
  eventName: string;
  eventStartUtc: string | null;
  eventLocale: string | null;
  venueName: string | null;
  orderId: string | null;
  ticketClassName: string | null;
  quantity: number;
  registeredAt: string;
  changedAt: string;
  status: string;
  checkedIn: boolean;
  cancelled: boolean;
  refunded: boolean;
}

export interface CrmSyncRun {
  id: string;
  startedAt: string;
  completedAt: string;
  source: 'eventbrite';
  importedAttendances: number;
  totalContacts: number;
  totalAttendances: number;
}

export interface CrmDatabase {
  version: 1;
  updatedAt: string | null;
  contacts: Record<string, CrmContact>;
  attendances: Record<string, CrmAttendance>;
  syncRuns: CrmSyncRun[];
}

export interface IncomingCrmAttendance extends Omit<CrmAttendance, 'contactId'> {
  contact: {
    name: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phone: string | null;
    preferredLocale: string | null;
    emailMarketingStatus: Exclude<CrmPermissionStatus, 'opted_out'>;
    permissionUpdatedAt: string;
  };
}

export interface CrmMergeSummary {
  importedAttendances: number;
  createdContacts: number;
  updatedContacts: number;
  totalContacts: number;
  totalAttendances: number;
}

export interface CrmContactFilters {
  query?: string;
  emailMarketing?: CrmPermissionStatus | 'all';
  venue?: string;
  locale?: string;
  segment?: 'all' | 'repeat' | 'single' | 'checked_in';
}

const EMPTY_STATS: CrmContactStats = {
  events: 0,
  tickets: 0,
  checkIns: 0,
  firstEventAt: null,
  lastEventAt: null,
  venues: [],
  locales: [],
};

export function emptyCrmDatabase(): CrmDatabase {
  return {
    version: 1,
    updatedAt: null,
    contacts: {},
    attendances: {},
    syncRuns: [],
  };
}

export function normalizeCrmEmail(email: string | null | undefined): string | null {
  const normalized = email?.trim().toLowerCase() || '';
  if (!normalized || !normalized.includes('@')) return null;
  return normalized.slice(0, 320);
}

export function crmContactId(email: string | null, attendeeId: string): string {
  if (!email) return `eventbrite-${attendeeId}`;
  return createHash('sha256').update(email).digest('hex');
}

function cleanText(value: string | null | undefined, max: number): string | null {
  const clean = value?.replace(/\s+/g, ' ').trim() || '';
  return clean ? clean.slice(0, max) : null;
}

function permissionFromEventbrite(
  current: CrmPermission | undefined,
  status: Exclude<CrmPermissionStatus, 'opted_out'>,
  updatedAt: string,
): CrmPermission {
  if (current?.source === 'manual') return current;
  return { status, source: 'eventbrite', updatedAt };
}

function recomputeContactStats(database: CrmDatabase): void {
  const byContact = new Map<string, CrmAttendance[]>();
  for (const attendance of Object.values(database.attendances)) {
    const list = byContact.get(attendance.contactId) || [];
    list.push(attendance);
    byContact.set(attendance.contactId, list);
  }

  for (const contact of Object.values(database.contacts)) {
    const active = (byContact.get(contact.id) || []).filter((a) => !a.cancelled && !a.refunded);
    const eventIds = new Set(active.map((a) => a.eventbriteEventId));
    const eventDates = active.map((a) => a.eventStartUtc).filter(Boolean) as string[];
    const locales = [...new Set(active.map((a) => a.eventLocale).filter(Boolean) as string[])].sort();
    const venues = [...new Set(active.map((a) => a.venueName).filter(Boolean) as string[])].sort();
    eventDates.sort();

    contact.stats = {
      events: eventIds.size,
      tickets: active.reduce((sum, a) => sum + Math.max(1, a.quantity), 0),
      checkIns: active.filter((a) => a.checkedIn).length,
      firstEventAt: eventDates[0] || null,
      lastEventAt: eventDates[eventDates.length - 1] || null,
      venues,
      locales,
    };

    if (!contact.preferredLocale && locales.length === 1) contact.preferredLocale = locales[0];
  }
}

export function mergeCrmAttendances(
  current: CrmDatabase,
  incoming: IncomingCrmAttendance[],
  syncedAt: string,
): { database: CrmDatabase; summary: CrmMergeSummary } {
  const database: CrmDatabase = {
    ...current,
    contacts: { ...current.contacts },
    attendances: { ...current.attendances },
    syncRuns: [...current.syncRuns],
    updatedAt: syncedAt,
  };
  let createdContacts = 0;
  let updatedContacts = 0;

  for (const item of incoming) {
    const email = normalizeCrmEmail(item.contact.email);
    const id = crmContactId(email, item.id);
    const existing = database.contacts[id];
    const name = cleanText(item.contact.name, 180) || email || 'Contatto Eventbrite';
    const firstSeenAt = existing?.firstSeenAt || item.registeredAt || syncedAt;
    const lastSeenAt = [existing?.lastSeenAt, item.changedAt, item.registeredAt, syncedAt]
      .filter(Boolean)
      .sort()
      .at(-1) as string;

    database.contacts[id] = {
      id,
      name,
      firstName: cleanText(item.contact.firstName, 100) || existing?.firstName || null,
      lastName: cleanText(item.contact.lastName, 100) || existing?.lastName || null,
      email: email || existing?.email || null,
      phone: cleanText(item.contact.phone, 40) || existing?.phone || null,
      preferredLocale: item.contact.preferredLocale || existing?.preferredLocale || null,
      firstSeenAt,
      lastSeenAt,
      emailMarketing: permissionFromEventbrite(
        existing?.emailMarketing,
        item.contact.emailMarketingStatus,
        item.contact.permissionUpdatedAt,
      ),
      whatsappMarketing: existing?.whatsappMarketing || {
        status: 'not_opted_in',
        source: 'none',
        updatedAt: null,
      },
      tags: existing?.tags || [],
      notes: existing?.notes || '',
      stats: existing?.stats || { ...EMPTY_STATS },
    };

    if (existing) updatedContacts += 1;
    else createdContacts += 1;

    database.attendances[item.id] = {
      id: item.id,
      contactId: id,
      eventbriteEventId: item.eventbriteEventId,
      eventName: item.eventName,
      eventStartUtc: item.eventStartUtc,
      eventLocale: item.eventLocale,
      venueName: item.venueName,
      orderId: item.orderId,
      ticketClassName: item.ticketClassName,
      quantity: item.quantity,
      registeredAt: item.registeredAt,
      changedAt: item.changedAt,
      status: item.status,
      checkedIn: item.checkedIn,
      cancelled: item.cancelled,
      refunded: item.refunded,
    };
  }

  recomputeContactStats(database);

  return {
    database,
    summary: {
      importedAttendances: incoming.length,
      createdContacts,
      updatedContacts,
      totalContacts: Object.keys(database.contacts).length,
      totalAttendances: Object.keys(database.attendances).length,
    },
  };
}

export function filterCrmContacts(database: CrmDatabase, filters: CrmContactFilters): CrmContact[] {
  const query = filters.query?.trim().toLowerCase() || '';
  return Object.values(database.contacts)
    .filter((contact) => {
      if (filters.emailMarketing && filters.emailMarketing !== 'all' && contact.emailMarketing.status !== filters.emailMarketing) {
        return false;
      }
      if (filters.venue && filters.venue !== 'all' && !contact.stats.venues.includes(filters.venue)) return false;
      if (filters.locale && filters.locale !== 'all' && !contact.stats.locales.includes(filters.locale)) return false;
      if (filters.segment === 'repeat' && contact.stats.events < 2) return false;
      if (filters.segment === 'single' && contact.stats.events !== 1) return false;
      if (filters.segment === 'checked_in' && contact.stats.checkIns < 1) return false;
      if (!query) return true;
      const haystack = [
        contact.name,
        contact.email,
        contact.phone,
        contact.tags.join(' '),
        contact.stats.venues.join(' '),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(query);
    })
    .sort((a, b) => {
      const date = (b.stats.lastEventAt || b.lastSeenAt).localeCompare(a.stats.lastEventAt || a.lastSeenAt);
      return date || a.name.localeCompare(b.name);
    });
}

export function crmFilterOptions(database: CrmDatabase): { venues: string[]; locales: string[] } {
  const contacts = Object.values(database.contacts);
  return {
    venues: [...new Set(contacts.flatMap((contact) => contact.stats.venues))].sort(),
    locales: [...new Set(contacts.flatMap((contact) => contact.stats.locales))].sort(),
  };
}
