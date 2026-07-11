import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dedupeEventsByIdentity } from '../lib/calendarEvents';

// Costruisce un item minimo compatibile con dedupeEventsByIdentity<T extends {event}>.
const mk = (id: string, venueId: string, dateISO: string, titleEn: string) =>
  ({ event: { id, venueId, dateISO, localizedContent: { title: { en: titleEn } } } }) as any;

// INV-E1 — stesso evento da più sorgenti → una card.
test('dedup: eb + mock dello STESSO evento stessa notte → resta solo eb (subset)', () => {
  const items = [
    mk('eb-1', 'v-pineta', '2026-07-11T21:00:00Z', 'White Party @ Pineta Club Milano - VIP Tables & Guestlist'),
    mk('mock-1', 'v-pineta', '2026-07-11T20:00:00Z', 'White Party'),
  ];
  const out = dedupeEventsByIdentity(items);
  assert.equal(out.length, 1);
  assert.equal(out[0].event.id, 'eb-1');
});

// INV-E3 — la passata 2 NON deve cannibalizzare un evento diverso (bug #2).
test('dedup: eb + weekly DIVERSA stessa notte → restano ENTRAMBE (bug #2)', () => {
  const items = [
    mk('eb-1', 'v-pineta', '2026-07-11T21:00:00Z', 'Argentina vs Switzerland Watch Party @ Pineta Club Milano'),
    mk('weekly-x', 'v-pineta', '2026-07-11T20:00:00Z', 'Saturday Night'),
  ];
  const out = dedupeEventsByIdentity(items);
  assert.equal(out.length, 2);
});

// INV-E1 — stesso evento pubblicato come EN+IT (stesso nucleo) → una sola card.
test('dedup: due sorgenti stesso nucleo → una card (rank eb > mock)', () => {
  const items = [
    mk('mock-1', 'v-aria', '2026-07-11T21:00:00Z', 'Saturday Fever Night'),
    mk('eb-9', 'v-aria', '2026-07-11T21:00:00Z', 'Saturday Fever Night @ Aria Club Milano - July 11 2026'),
  ];
  const out = dedupeEventsByIdentity(items);
  assert.equal(out.length, 1);
  assert.equal(out[0].event.id, 'eb-9');
});
