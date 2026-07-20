import assert from 'node:assert/strict';
import test from 'node:test';

process.env.UPDATE_GUE_PILOT_IMPORT_ONLY = '1';

test('pilot updater only accepts one explicit destructive mode', async () => {
  const { parseRunMode } = await import('../scripts/update-gue-eventbrite-pilot');
  assert.equal(parseRunMode(['--execute']), 'execute');
  assert.equal(parseRunMode(['--rollback']), 'rollback');
  assert.throws(() => parseRunMode([]), /without --execute or --rollback/);
  assert.throws(() => parseRunMode(['--execute', '--rollback']), /mutually exclusive/);
});
