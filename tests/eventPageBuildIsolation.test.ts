import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { test } from 'node:test';

const pagePath = path.join(process.cwd(), 'app', '[locale]', 'events', '[slug]', 'page.tsx');

test('event route keeps Eventbrite out of build params but resolves it on demand', async () => {
  const source = await readFile(pagePath, 'utf8');
  const staticStart = source.indexOf('export async function generateStaticParams()');
  const staticEnd = source.indexOf('// Generate Dynamic SEO Metadata');
  assert.ok(staticStart >= 0 && staticEnd > staticStart);
  const staticParams = source.slice(staticStart, staticEnd);
  assert.doesNotMatch(staticParams, /fetchEventbriteEvents\s*\(/);
  assert.match(staticParams, /return \[\];/);
  assert.match(source, /export const dynamicParams = true;/);

  const resolverStart = source.indexOf('async function getEbEventBySlug');
  const resolverEnd = source.indexOf('const FALLBACK_GALLERY');
  assert.ok(resolverStart >= 0 && resolverEnd > resolverStart);
  const resolver = source.slice(resolverStart, resolverEnd);
  assert.match(resolver, /await fetchEventbriteEvents\(\)/);
  assert.match(resolver, /await fetchEventbriteEvents\(true, 30\)/);
  assert.doesNotMatch(resolver, /\bcatch\s*[({]/);
  assert.equal((source.match(/if \(!event\) event = await getEbEventBySlug\(slug\);/g) || []).length, 2);
});
