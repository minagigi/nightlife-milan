import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';

test('GlobalSearch renders via createPortal to document.body to escape header backdrop-blur containing block', () => {
  const source = readFileSync(resolve(process.cwd(), 'components/GlobalSearch.tsx'), 'utf8');
  assert.match(source, /import\s+\{\s*createPortal\s*\}\s+from\s+['"]react-dom['"]/);
  assert.match(source, /createPortal\(/);
  assert.match(source, /,\s*document\.body\s*,?\s*\)/);
});

test('GlobalSearch synchronizes nlm:global-search custom event, route changes, and keyboard navigation', () => {
  const source = readFileSync(resolve(process.cwd(), 'components/GlobalSearch.tsx'), 'utf8');
  assert.match(source, /new CustomEvent\(['"]nlm:global-search['"],\s*\{\s*detail:\s*\{\s*open:\s*isOpen\s*\}\s*\}\)/);
  assert.match(source, /prevPathname\.current\s*!==\s*pathname/);
  assert.match(source, /e\.key\s*===\s*['"]Enter['"]\s*&&\s*searchResults\.topHref/);
  assert.match(source, /e\.key\s*===\s*['"]Escape['"]/);
});

test('GlobalSearch indexes clubs, Capodanno 2027, Xceed events, VIP hubs, 114 guides, zones, and genres with category tabs', () => {
  const source = readFileSync(resolve(process.cwd(), 'components/GlobalSearch.tsx'), 'utf8');
  assert.doesNotMatch(source, /mockEvents/);
  assert.match(source, /eb-1994392210790/);
  assert.match(source, /eb-1994228700727/);
  assert.match(source, /gue-live-performance-just-me-milan-july-25-2026/);
  assert.match(source, /finale-coppa-del-mondo-maxischermo-milano-just-me-19-luglio-2026/);
  assert.match(source, /import\(['"]@\/lib\/capodannoEvents['"]\)/);
  assert.match(source, /import\(['"]@\/lib\/octoberEvents['"]\)/);
  assert.match(source, /capodannoEventPath\(/);
  assert.match(source, /capodannoCategoryPath\(/);
  assert.match(source, /role=["']tablist["']/);
});

test('GlobalSearch follows Milano Couture Noir and copy-storytelling-cro-nightlife rules', () => {
  const source = readFileSync(resolve(process.cwd(), 'components/GlobalSearch.tsx'), 'utf8');
  assert.doesNotMatch(source, /#[1-6]\s*Priority/i);
  assert.doesNotMatch(source, /Priorit[àa]\s*#[1-6]/i);
  assert.doesNotMatch(source, /Via Fantoli 9/i);
  assert.match(source, /Piazza della Repubblica 12/);
  assert.equal(source.includes('\u2014'), false, 'GlobalSearch must not contain em-dashes');
});
