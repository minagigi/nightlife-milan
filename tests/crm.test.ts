import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  emptyCrmDatabase,
  filterCrmContacts,
  mergeCrmAttendances,
  type IncomingCrmAttendance,
} from '../lib/crmModel';
import { mapEventbriteAttendee } from '../lib/eventbriteCrm';
import { crmContactsCsv } from '../lib/crmExport';

const SYNCED_AT = '2026-07-15T10:00:00.000Z';

function attendance(
  id: string,
  eventId: string,
  eventName: string,
  overrides: Partial<IncomingCrmAttendance> = {},
): IncomingCrmAttendance {
  return {
    id,
    eventbriteEventId: eventId,
    eventName,
    eventStartUtc: '2026-07-18T21:00:00.000Z',
    eventLocale: 'it',
    venueName: 'Just Me Milano',
    orderId: `order-${id}`,
    ticketClassName: 'Guest list',
    quantity: 1,
    registeredAt: '2026-07-14T12:00:00.000Z',
    changedAt: SYNCED_AT,
    status: 'Attending',
    checkedIn: false,
    cancelled: false,
    refunded: false,
    contact: {
      name: 'Mario Rossi',
      firstName: 'Mario',
      lastName: 'Rossi',
      email: ' Mario.Rossi@example.com ',
      phone: '+39 351 000 0000',
      preferredLocale: 'it',
      emailMarketingStatus: 'opted_in',
      permissionUpdatedAt: SYNCED_AT,
    },
    ...overrides,
  };
}

test('CRM deduplicates the same email across events and computes repeat stats', () => {
  const first = attendance('attendee-1', 'event-1', 'Just Me Friday');
  const second = attendance('attendee-2', 'event-2', 'Just Me Saturday', {
    eventStartUtc: '2026-07-19T21:00:00.000Z',
    checkedIn: true,
    quantity: 2,
    contact: {
      ...first.contact,
      email: 'mario.rossi@EXAMPLE.COM',
    },
  });
  const { database, summary } = mergeCrmAttendances(emptyCrmDatabase(), [first, second], SYNCED_AT);
  const contacts = Object.values(database.contacts);

  assert.equal(summary.totalContacts, 1);
  assert.equal(summary.totalAttendances, 2);
  assert.equal(contacts[0].email, 'mario.rossi@example.com');
  assert.deepEqual(contacts[0].stats, {
    events: 2,
    tickets: 3,
    checkIns: 1,
    firstEventAt: '2026-07-18T21:00:00.000Z',
    lastEventAt: '2026-07-19T21:00:00.000Z',
    venues: ['Just Me Milano'],
    locales: ['it'],
  });
});

test('CRM keeps a manual opt-out during later Eventbrite synchronizations', () => {
  const initial = mergeCrmAttendances(
    emptyCrmDatabase(),
    [attendance('attendee-1', 'event-1', 'Just Me Friday')],
    SYNCED_AT,
  ).database;
  const contact = Object.values(initial.contacts)[0];
  contact.emailMarketing = {
    status: 'opted_out',
    source: 'manual',
    updatedAt: '2026-07-15T11:00:00.000Z',
  };

  const updated = mergeCrmAttendances(
    initial,
    [attendance('attendee-2', 'event-2', 'Just Me Saturday')],
    '2026-07-16T10:00:00.000Z',
  ).database;

  assert.deepEqual(Object.values(updated.contacts)[0].emailMarketing, contact.emailMarketing);
});

test('CRM filters contacts by consent, venue and repeat segment', () => {
  const { database } = mergeCrmAttendances(
    emptyCrmDatabase(),
    [
      attendance('attendee-1', 'event-1', 'Just Me Friday'),
      attendance('attendee-2', 'event-2', 'Just Me Saturday'),
      attendance('attendee-3', 'event-3', 'Pineta Friday', {
        venueName: 'Pineta Club',
        contact: {
          name: 'Anna Bianchi',
          firstName: 'Anna',
          lastName: 'Bianchi',
          email: 'anna@example.com',
          phone: null,
          preferredLocale: 'en',
          emailMarketingStatus: 'not_opted_in',
          permissionUpdatedAt: SYNCED_AT,
        },
      }),
    ],
    SYNCED_AT,
  );

  assert.equal(filterCrmContacts(database, { emailMarketing: 'opted_in', segment: 'repeat' }).length, 1);
  assert.equal(filterCrmContacts(database, { venue: 'Pineta Club' })[0].name, 'Anna Bianchi');
  assert.equal(filterCrmContacts(database, { query: '351 000' })[0].name, 'Mario Rossi');
});

test('Eventbrite mapping imports only the operational contact fields and opt-in state', () => {
  const mapped = mapEventbriteAttendee({
    id: 'attendee-99',
    created: '2026-07-15T08:00:00.000Z',
    changed: '2026-07-15T09:00:00.000Z',
    event_id: 'event-99',
    order_id: 'order-99',
    ticket_class_name: 'Lista internazionale',
    checked_in: true,
    profile: {
      name: 'Joao Silva',
      first_name: 'Joao',
      last_name: 'Silva',
      email: 'joao@example.com',
      cell_phone: '+351 900 000 000',
    },
    contact_list_preferences: { has_contact_list: true, has_opted_in: true },
    event: {
      id: 'event-99',
      name: { text: 'Just Me Milano - Festa internacional' },
      description: { html: '<!-- nlm:src=xc-99-pt;slug-en=just-me-friday -->' },
      start: { utc: '2026-07-17T21:00:00.000Z' },
    },
  }, SYNCED_AT);

  assert.equal(mapped.contact.emailMarketingStatus, 'opted_in');
  assert.equal(mapped.contact.preferredLocale, 'pt');
  assert.equal(mapped.venueName, 'Just Me Milano');
  assert.equal(mapped.checkedIn, true);
  assert.equal('answers' in mapped, false);
  assert.equal('barcodes' in mapped, false);
});

test('CRM CSV contains only opted-in emails and neutralizes spreadsheet formulas', () => {
  const { database } = mergeCrmAttendances(
    emptyCrmDatabase(),
    [
      attendance('attendee-1', 'event-1', 'Just Me Friday', {
        contact: {
          name: '=Formula Test',
          firstName: 'Formula',
          lastName: 'Test',
          email: 'formula@example.com',
          phone: null,
          preferredLocale: 'it',
          emailMarketingStatus: 'opted_in',
          permissionUpdatedAt: SYNCED_AT,
        },
      }),
      attendance('attendee-2', 'event-2', 'Pineta Friday', {
        contact: {
          name: 'No Consent',
          firstName: 'No',
          lastName: 'Consent',
          email: 'private@example.com',
          phone: null,
          preferredLocale: 'en',
          emailMarketingStatus: 'not_opted_in',
          permissionUpdatedAt: SYNCED_AT,
        },
      }),
    ],
    SYNCED_AT,
  );
  const csv = crmContactsCsv(Object.values(database.contacts));

  assert.match(csv, /formula@example\.com/);
  assert.doesNotMatch(csv, /private@example\.com/);
  assert.match(csv, /"'=Formula Test"/);
});
