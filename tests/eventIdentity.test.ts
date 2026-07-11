import { test } from 'node:test';
import assert from 'node:assert/strict';
import { eventNameCore, physicalEventKey } from '../lib/eventIdentity';

// INV-E2 / INV-E1 — il nucleo-nome è la chiave d'identità di un evento.

test('eventNameCore: stesso nucleo tra localizzazione EN e IT della data', () => {
  assert.equal(
    eventNameCore('Reggaeton Night — July 11 2026'),
    eventNameCore('Reggaeton Night — 11 Luglio 2026'),
  );
});

test('eventNameCore: non ritorna MAI stringa vuota (bug #1)', () => {
  // Titolo fatto SOLO di parole-data/numeri: senza fallback si azzererebbe.
  assert.notEqual(eventNameCore('Saturday July 11 2026'), '');
  assert.notEqual(eventNameCore('11 Luglio 2026'), '');
  assert.notEqual(eventNameCore('2026'), '');
});

test('eventNameCore: rimuove la città Milano/Milan dal nucleo (fix bug #2)', () => {
  assert.ok(!eventNameCore('White Party @ Aria Milano').includes('milano'));
  assert.ok(!eventNameCore('White Party Milan').includes('milan'));
});

test('physicalEventKey: due eventi DIVERSI stesso venue+sera restano distinti (INV-E2)', () => {
  const saturday = physicalEventKey('v-pineta', '2026-07-11T21:00:00Z', 'Saturday Night @ Pineta Club Milano - July 11 2026', 'Pineta Club');
  const fifa = physicalEventKey('v-pineta', '2026-07-11T21:00:00Z', 'Argentina vs Switzerland Watch Party @ Pineta Club Milano', 'Pineta Club');
  assert.notEqual(saturday, fifa);
});

test('physicalEventKey: stesso evento EN/IT collassa sulla stessa chiave (INV-E1)', () => {
  const en = physicalEventKey('v-justme', '2026-07-11T21:00:00Z', 'Saturday Night @ Just Me Milano - July 11 2026', 'Just Me');
  const it = physicalEventKey('v-justme', '2026-07-11T21:00:00Z', 'Saturday Night @ Just Me Milano - 11 Luglio 2026', 'Just Me');
  assert.equal(en, it);
});

test('physicalEventKey: lo strip del venue non azzera il nucleo (bug #1)', () => {
  const key = physicalEventKey('v-justme', '2026-07-11T21:00:00Z', 'Just Me Milano', 'Just Me');
  const core = key.split('|')[2];
  assert.ok(core.length > 0);
});
