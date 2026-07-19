import assert from 'node:assert/strict';
import test from 'node:test';
import {
  dispatchCandidates,
  evaluateAttendeeEligibility,
  mapRawAttendee,
  resolveEventInfo,
  resolveVenueName,
  validateOrderApiUrl,
} from '../lib/attendeeEmailDispatch';
import { crmContactId, normalizeCrmEmail } from '../lib/crmModel';
import type { AttendeeEmailEventInfo, DispatchCandidate, EligibilityContext } from '../lib/attendeeEmailTypes';

// --- validateOrderApiUrl ---

test('validateOrderApiUrl accepts the order URL with and without a trailing slash', () => {
  assert.equal(
    validateOrderApiUrl('https://www.eventbriteapi.com/v3/orders/123456789/'),
    'https://www.eventbriteapi.com/v3/orders/123456789/',
  );
  assert.equal(
    validateOrderApiUrl('https://www.eventbriteapi.com/v3/orders/123456789'),
    'https://www.eventbriteapi.com/v3/orders/123456789/',
  );
});

test('validateOrderApiUrl rejects http, other hosts, path traversal, non-numeric ids and extra suffixes', () => {
  assert.equal(validateOrderApiUrl('http://www.eventbriteapi.com/v3/orders/123/'), null);
  assert.equal(validateOrderApiUrl('https://evil.com/v3/orders/123/'), null);
  assert.equal(validateOrderApiUrl('https://www.eventbriteapi.com/v3/orders/../orders/123/'), null);
  assert.equal(validateOrderApiUrl('https://www.eventbriteapi.com/v3/orders/abc123/'), null);
  assert.equal(validateOrderApiUrl('https://www.eventbriteapi.com/v3/orders/123/attendees/'), null);
  assert.equal(validateOrderApiUrl('https://www.eventbriteapi.com/v3/orders/123/?expand=attendees'), null);
});

// --- resolveVenueName ---

test('resolveVenueName prefers an explicit non-empty venue name', () => {
  assert.equal(resolveVenueName('Custom Venue', 'Saturday Night — Just Me Milano'), 'Custom Venue');
});

test('resolveVenueName infers Just Me / Pineta / Aria from the event title', () => {
  assert.equal(resolveVenueName(null, 'Saturday Night — Just Me Milano'), 'Just Me Milano');
  assert.equal(resolveVenueName(undefined, 'Sunday Aperitivo at Pineta'), 'Pineta Club');
  assert.equal(resolveVenueName('', 'Friday Guestlist at Aria'), 'Aria Club Milano');
});

test('resolveVenueName returns null when nothing matches', () => {
  assert.equal(resolveVenueName(null, 'Some Unrelated Event Title'), null);
  assert.equal(resolveVenueName(undefined, 'Unrelated'), null);
});

// --- resolveEventInfo ---

test('resolveEventInfo reads the locale from the nlm:src description marker', () => {
  const html = '<!-- nlm:src=xc-123-it;slug-en=test --><p>Body</p>';
  const info = resolveEventInfo({ id: '900001', name: { text: 'Just Me Milano Night' }, description: { html } }, null);
  assert.ok(info);
  assert.equal(info?.locale, 'it');
});

test('resolveEventInfo falls back to en without a marker', () => {
  const info = resolveEventInfo(
    { id: '900002', name: { text: 'Untitled Party' }, description: { html: '<p>No marker here</p>' } },
    null,
  );
  assert.equal(info?.locale, 'en');
});

test('resolveEventInfo extracts only verified nightlifemilan-1 Xceed affiliate URLs', () => {
  const affiliate = 'https://xceed.me/en/milano/event/sample-party--900001/channel/nightlifemilan-1';
  const html = `<p>Buy tickets</p><a href="${affiliate}">Buy</a><a href="https://xceed.me/en/milano/event/x/1/channel/other">Other</a>`;
  const info = resolveEventInfo({ id: '900003', name: { text: 'Just Me Milano Night' }, description: { html } }, null);
  assert.deepEqual(info?.affiliateUrls, [affiliate]);
});

test('resolveEventInfo returns null without an id or without a name', () => {
  assert.equal(resolveEventInfo({ name: { text: 'No id' } }, null), null);
  assert.equal(resolveEventInfo({ id: '900004' }, null), null);
});

// --- evaluateAttendeeEligibility ---

function baseEvent(overrides: Partial<AttendeeEmailEventInfo> = {}): AttendeeEmailEventInfo {
  return {
    eventbriteEventId: '900001',
    eventName: 'Saturday Night — Just Me Milano',
    eventStartUtc: '2026-08-01T22:00:00Z',
    venueName: 'Just Me Milano',
    locale: 'en',
    affiliateUrls: [],
    ...overrides,
  };
}

function baseCandidate(overrides: Partial<DispatchCandidate> = {}): DispatchCandidate {
  return {
    attendeeId: 'att-1',
    orderId: 'order-1',
    createdAt: '2026-07-15T10:00:00Z',
    status: 'Attending',
    cancelled: false,
    refunded: false,
    email: 'guest@example.com',
    firstName: 'Alex',
    name: 'Alex Guest',
    event: baseEvent(),
    ...overrides,
  };
}

function baseCtx(overrides: Partial<EligibilityContext> = {}): EligibilityContext {
  return {
    activatedAt: '2026-07-01T00:00:00Z',
    nowIso: '2026-07-19T12:00:00Z',
    force: false,
    optedOutContactIds: new Set<string>(),
    ...overrides,
  };
}

test('evaluateAttendeeEligibility: no-email', () => {
  assert.deepEqual(evaluateAttendeeEligibility(baseCandidate({ email: null }), baseCtx()), {
    eligible: false,
    reason: 'no-email',
  });
});

test('evaluateAttendeeEligibility: cancelled', () => {
  assert.deepEqual(evaluateAttendeeEligibility(baseCandidate({ cancelled: true }), baseCtx()), {
    eligible: false,
    reason: 'cancelled',
  });
});

test('evaluateAttendeeEligibility: refunded', () => {
  assert.deepEqual(evaluateAttendeeEligibility(baseCandidate({ refunded: true }), baseCtx()), {
    eligible: false,
    reason: 'refunded',
  });
});

test('evaluateAttendeeEligibility: not-attending', () => {
  assert.deepEqual(evaluateAttendeeEligibility(baseCandidate({ status: 'Not Attending' }), baseCtx()), {
    eligible: false,
    reason: 'not-attending',
  });
});

test('evaluateAttendeeEligibility: no-event', () => {
  assert.deepEqual(evaluateAttendeeEligibility(baseCandidate({ event: null }), baseCtx()), {
    eligible: false,
    reason: 'no-event',
  });
});

test('evaluateAttendeeEligibility: no-event-start', () => {
  assert.deepEqual(
    evaluateAttendeeEligibility(baseCandidate({ event: baseEvent({ eventStartUtc: null }) }), baseCtx()),
    { eligible: false, reason: 'no-event-start' },
  );
});

test('evaluateAttendeeEligibility: event-past', () => {
  assert.deepEqual(
    evaluateAttendeeEligibility(baseCandidate({ event: baseEvent({ eventStartUtc: '2026-01-01T00:00:00Z' }) }), baseCtx()),
    { eligible: false, reason: 'event-past' },
  );
});

test('evaluateAttendeeEligibility: pre-activation blocks when force is false', () => {
  const candidate = baseCandidate({ createdAt: '2026-06-01T00:00:00Z' });
  assert.deepEqual(evaluateAttendeeEligibility(candidate, baseCtx({ force: false })), {
    eligible: false,
    reason: 'pre-activation',
  });
});

test('evaluateAttendeeEligibility: pre-activation is bypassed when force is true', () => {
  const candidate = baseCandidate({ createdAt: '2026-06-01T00:00:00Z' });
  assert.deepEqual(evaluateAttendeeEligibility(candidate, baseCtx({ force: true })), { eligible: true });
});

test('evaluateAttendeeEligibility: opted-out', () => {
  const candidate = baseCandidate();
  const contactId = crmContactId(normalizeCrmEmail(candidate.email), candidate.attendeeId);
  assert.deepEqual(
    evaluateAttendeeEligibility(candidate, baseCtx({ optedOutContactIds: new Set([contactId]) })),
    { eligible: false, reason: 'opted-out' },
  );
});

test('evaluateAttendeeEligibility: eligible', () => {
  assert.deepEqual(evaluateAttendeeEligibility(baseCandidate(), baseCtx()), { eligible: true });
});

// --- mapRawAttendee ---

test('mapRawAttendee composes the name from first+last and trims the email', () => {
  const candidate = mapRawAttendee(
    {
      id: 'att-9',
      created: '2026-07-18T10:00:00Z',
      status: 'Attending',
      order_id: 'order-9',
      profile: { first_name: 'Alex', last_name: 'Guest', email: '  guest@example.com  ' },
    },
    null,
  );

  assert.equal(candidate.attendeeId, 'att-9');
  assert.equal(candidate.orderId, 'order-9');
  assert.equal(candidate.firstName, 'Alex');
  assert.equal(candidate.name, 'Alex Guest');
  assert.equal(candidate.email, 'guest@example.com');
  assert.equal(candidate.event, null);
});

test('mapRawAttendee falls back to profile.name and then null when no first/last name is present', () => {
  const withProfileName = mapRawAttendee({ id: 'att-10', profile: { name: 'Display Name' } }, null);
  assert.equal(withProfileName.name, 'Display Name');

  const withNothing = mapRawAttendee({ id: 'att-11' }, null);
  assert.equal(withNothing.name, null);
  assert.equal(withNothing.email, null);
});

test('dispatchCandidates deduplica la stessa coppia evento+email nello stesso run', async () => {
  // Regressione del duplicato osservato in e2e: il Blob e eventualmente
  // consistente, quindi il dedupe intra-run deve avvenire in memoria.
  const savedBlob = process.env.BLOB_READ_WRITE_TOKEN;
  const savedResend = process.env.RESEND_API_KEY;
  delete process.env.BLOB_READ_WRITE_TOKEN;
  delete process.env.RESEND_API_KEY;
  try {
    const event = baseEvent({ eventStartUtc: '2030-01-01T22:00:00Z' });
    const first = baseCandidate({ attendeeId: 'a1', event });
    const duplicate = baseCandidate({ attendeeId: 'a2', event });
    const other = baseCandidate({ attendeeId: 'a3', email: 'other@example.com', event });

    const report = await dispatchCandidates([first, duplicate, other], { mode: 'manual', dryRun: true, force: true });

    assert.equal(report.dryRunCount, 2);
    assert.equal(report.skipped['in-flight'], 1);
    assert.equal(report.failed, 0);
    assert.equal(report.processed, 3);
  } finally {
    if (savedBlob === undefined) delete process.env.BLOB_READ_WRITE_TOKEN; else process.env.BLOB_READ_WRITE_TOKEN = savedBlob;
    if (savedResend === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = savedResend;
  }
});
