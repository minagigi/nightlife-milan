import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  assertNoMarkerDuplicates,
  exactMarkerMatches,
  loadPreparedManifest,
  localExecutionPlan,
  parseCliArgs,
  selectRows,
  type ExistingEvent,
} from '../scripts/publish-weekly-july20-remaining-locales';

test('default runner is create:false, offline, and excludes EN/IT', async () => {
  const rows = await loadPreparedManifest();
  const args = parseCliArgs([]);
  const plan = localExecutionPlan(rows, args);
  assert.equal(plan.create, false);
  assert.equal(plan.mutationsEnabled, false);
  assert.equal(plan.networkEnabled, false);
  assert.equal(plan.selectedRows, 2_970);
  assert.equal(plan.includesEnglishOrItalian, false);

  const source = await readFile('scripts/publish-weekly-july20-remaining-locales.ts', 'utf8');
  assert.doesNotMatch(source, /media\/upload|imagegen|playwright|puppeteer/iu);
  assert.match(source, /if \(!args\.preflight && !args\.execute\) return plan/u);
});

test('pilot flags select exactly the ten Spanish University Party variants', async () => {
  const rows = await loadPreparedManifest();
  const args = parseCliArgs([
    '--pilot-locale=es',
    '--pilot-event=justme-university-2026-07-21',
  ]);
  const selected = selectRows(rows, args);
  assert.equal(selected.length, 10);
  assert.deepEqual(selected.map((row) => row.variant), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.ok(selected.every((row) => row.locale === 'es' && row.eventKey === 'justme-university-2026-07-21'));
  assert.throws(() => parseCliArgs(['--execute']), /requires --pilot-locale and --pilot-event/u);
});

test('organization-wide exact-marker duplicate gate hard-fails before create', async () => {
  const [row] = await loadPreparedManifest();
  const event = (id: string): ExistingEvent => ({
    id,
    status: 'draft',
    description: { html: `<p>candidate</p><!-- ${row.marker} -->` },
    start: { utc: row.startUtc },
    end: { utc: row.endUtc },
    venue_id: row.venueEventbriteId,
  });
  const inventory = [event('10001'), event('10002')];
  assert.equal(exactMarkerMatches(row.marker, inventory).length, 2);
  assert.throws(
    () => assertNoMarkerDuplicates([row], inventory),
    new RegExp(`Duplicate exact markers block execution: ${row.marker}=10001,10002`, 'u'),
  );
});
