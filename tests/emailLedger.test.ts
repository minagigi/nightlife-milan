import { test } from 'node:test';
import assert from 'node:assert/strict';
import { emailLedgerKey, emailHashFull, shouldAttempt } from '../lib/emailLedger';
import type { AttendeeEmailLedgerEntry } from '../lib/attendeeEmailTypes';

const HEX64_RE = /^[0-9a-f]{64}$/;
const HEX16_RE = /^[0-9a-f]{16}$/;

function makeEntry(overrides: Partial<AttendeeEmailLedgerEntry> = {}): AttendeeEmailLedgerEntry {
  return {
    key: 'evt-abc123',
    attendeeId: 'att-1',
    orderId: 'ord-1',
    eventbriteEventId: '237143',
    emailHash: emailHashFull('mario@example.com'),
    to: 'mario@example.com',
    locale: 'en',
    status: 'pending',
    mode: 'webhook',
    createdAt: '2026-07-19T10:00:00.000Z',
    updatedAt: '2026-07-19T10:00:00.000Z',
    providerMessageId: null,
    error: null,
    ...overrides,
  };
}

// --- emailHashFull -----------------------------------------------------

test('emailHashFull: produce 64 caratteri hex (sha256)', () => {
  assert.match(emailHashFull('mario@example.com'), HEX64_RE);
});

test('emailHashFull: normalizza maiuscole e spazi prima dell hash', () => {
  const a = emailHashFull('Mario.Rossi@Example.com');
  const b = emailHashFull('  mario.rossi@example.com  ');
  assert.equal(a, b);
});

test('emailHashFull: email diverse producono hash diversi', () => {
  assert.notEqual(emailHashFull('mario@example.com'), emailHashFull('luigi@example.com'));
});

// --- emailLedgerKey ------------------------------------------------------

test('emailLedgerKey: e deterministica per la stessa coppia evento+email', () => {
  const a = emailLedgerKey('237143', 'mario@example.com');
  const b = emailLedgerKey('237143', 'mario@example.com');
  assert.equal(a, b);
});

test('emailLedgerKey: insensibile a maiuscole/minuscole e spazi nell email', () => {
  const a = emailLedgerKey('237143', 'Mario.Rossi@Example.COM');
  const b = emailLedgerKey('237143', '  mario.rossi@example.com  ');
  assert.equal(a, b);
});

test('emailLedgerKey: formato eventId-suffisso, suffisso lungo 16 hex', () => {
  const eventId = '237143';
  const key = emailLedgerKey(eventId, 'mario@example.com');
  assert.ok(key.startsWith(`${eventId}-`));
  const suffix = key.slice(eventId.length + 1);
  assert.equal(suffix.length, 16);
  assert.match(suffix, HEX16_RE);
});

test('emailLedgerKey: il suffisso sono i primi 16 caratteri di emailHashFull', () => {
  const eventId = '237143';
  const email = 'Mario.Rossi@Example.com';
  const key = emailLedgerKey(eventId, email);
  const suffix = key.slice(eventId.length + 1);
  assert.equal(suffix, emailHashFull(email).slice(0, 16));
});

test('emailLedgerKey: eventId diversi producono chiavi diverse a parita di email', () => {
  const a = emailLedgerKey('111', 'mario@example.com');
  const b = emailLedgerKey('222', 'mario@example.com');
  assert.notEqual(a, b);
});

test('emailLedgerKey: eventId con trattini interni (marker Xceed xc-{id}) resta gestibile', () => {
  // lib/xceedLedger.ts usa id tipo "xc-220757": il prefisso eventId puo
  // contenere trattini, il suffisso resta comunque gli ultimi 16 hex.
  const eventId = 'xc-220757';
  const key = emailLedgerKey(eventId, 'mario@example.com');
  assert.ok(key.startsWith(`${eventId}-`));
  assert.equal(key.slice(eventId.length + 1).length, 16);
});

// --- shouldAttempt (matrice completa) ------------------------------------

const NOW = '2026-07-19T12:00:00.000Z';

test('shouldAttempt: entry nulla (mai tentata) -> true, indipendentemente dal transport', () => {
  assert.equal(shouldAttempt(null, true, NOW), true);
  assert.equal(shouldAttempt(null, false, NOW), true);
});

test('shouldAttempt: status sent -> false sempre, indipendentemente dal transport', () => {
  const entry = makeEntry({ status: 'sent', updatedAt: NOW });
  assert.equal(shouldAttempt(entry, true, NOW), false);
  assert.equal(shouldAttempt(entry, false, NOW), false);
});

test('shouldAttempt: status pending aggiornato meno di 60 minuti fa -> false (in volo)', () => {
  const updatedAt = '2026-07-19T11:30:00.000Z'; // 30 minuti prima di NOW
  const entry = makeEntry({ status: 'pending', updatedAt });
  assert.equal(shouldAttempt(entry, true, NOW), false);
  assert.equal(shouldAttempt(entry, false, NOW), false);
});

test('shouldAttempt: status pending aggiornato piu di 60 minuti fa -> true (ritentabile)', () => {
  const updatedAt = '2026-07-19T10:30:00.000Z'; // 90 minuti prima di NOW
  const entry = makeEntry({ status: 'pending', updatedAt });
  assert.equal(shouldAttempt(entry, true, NOW), true);
  assert.equal(shouldAttempt(entry, false, NOW), true);
});

test('shouldAttempt: status pending esattamente al bordo dei 60 minuti -> ancora in volo (false)', () => {
  // Decisione: "piu recente di 60 minuti" -> false richiede age STRETTAMENTE
  // maggiore di 60 minuti per considerarsi stantio; il bordo esatto resta in volo.
  const updatedAt = '2026-07-19T11:00:00.000Z'; // esattamente 60 minuti prima di NOW
  const entry = makeEntry({ status: 'pending', updatedAt });
  assert.equal(shouldAttempt(entry, true, NOW), false);
});

test('shouldAttempt: status failed -> true sempre, indipendentemente dal transport', () => {
  const entry = makeEntry({ status: 'failed', updatedAt: NOW });
  assert.equal(shouldAttempt(entry, true, NOW), true);
  assert.equal(shouldAttempt(entry, false, NOW), true);
});

test('shouldAttempt: status dry_run -> true solo se il transport e live', () => {
  const entry = makeEntry({ status: 'dry_run', updatedAt: NOW });
  assert.equal(shouldAttempt(entry, true, NOW), true);
  assert.equal(shouldAttempt(entry, false, NOW), false);
});
