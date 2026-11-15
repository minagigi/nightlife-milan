import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { test } from 'node:test';

const pagePath = path.join(process.cwd(), 'app', '[locale]', 'events', '[slug]', 'page.tsx');

test('event route keeps Eventbrite disconnected and uses editorial/site discovery', async () => {
  const source = await readFile(pagePath, 'utf8');
  const staticStart = source.indexOf('export async function generateStaticParams()');
  const staticEnd = source.indexOf('// Generate Dynamic SEO Metadata');
  assert.ok(staticStart >= 0 && staticEnd > staticStart);
  const staticParams = source.slice(staticStart, staticEnd);
  assert.doesNotMatch(staticParams, /fetchEventbriteEvents\s*\(/);
  assert.match(staticParams, /return \[\];/);
  assert.match(source, /export const dynamicParams = true;/);
  assert.doesNotMatch(source, /\bgetEbEventBySlug\b/);
  assert.doesNotMatch(source, /\bfetchEventbriteEvents\b/);
  assert.match(source, /from '@\/lib\/eventDiscovery'/);
});
