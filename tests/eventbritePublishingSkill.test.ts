import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import test from 'node:test';

const root = fileURLToPath(new URL('../', import.meta.url));

async function text(relativePath: string) {
  return readFile(path.join(root, relativePath), 'utf8');
}

test('Eventbrite requests are routed to the approved API-only skill', async () => {
  const agents = await text('AGENTS.md');
  const skill = await text('.agents/skills/eventbrite-nightlife-publishing/SKILL.md');

  assert.match(agents, /Whenever Eventbrite is mentioned or in scope/);
  assert.match(agents, /eventbrite-nightlife-publishing/);
  assert.match(skill, /Use whenever the user mentions Eventbrite/);
  assert.match(skill, /through the approved Eventbrite operational API path/);
  assert.match(skill, /Never press Save or publish through the browser UI/);
});

test('Eventbrite skill preserves the approved Guè pilot template gates', async () => {
  const template = await text('.agents/skills/eventbrite-nightlife-publishing/references/template.md');
  const audit = await text('.agents/skills/eventbrite-nightlife-publishing/references/audit-checklist.md');

  assert.match(template, /Exactly 25 useful, SEO-driven native-language FAQ/);
  assert.match(template, /Exactly 10 native commercial-intent keyword permutations/);
  assert.match(template, /one localized real poster plus four real or venue-faithful body images/i);
  assert.match(template, /2:1 cover/);
  assert.match(template, /channel\/nightlifemilan-1/);
  assert.match(audit, /Run a second API readback after repairs/);
  assert.match(audit, /target.*passed.*repaired.*failed.*skipped.*duplicates/);
});
