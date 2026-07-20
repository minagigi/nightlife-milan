import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  applySitemapSnapshot,
  diffSitemapUrls,
  extractSitemapUrls,
  runSitemapWatchCycle,
  type SitemapWatchState,
} from '../lib/sitemapWatcher';

const SITEMAP_URL = 'https://nightlifemilan.com/sitemap.xml';

function state(urls: string[]): SitemapWatchState {
  return {
    version: 1,
    sitemapUrl: SITEMAP_URL,
    urls,
    checkedAt: '2026-07-15T00:00:00.000Z',
    submittedAt: '2026-07-15T00:00:00.000Z',
  };
}

test('extractSitemapUrls returns a sorted unique set and decodes XML entities', () => {
  const xml = `<?xml version="1.0"?><urlset>
    <url><loc>https://nightlifemilan.com/guides/new?x=1&amp;y=2</loc></url>
    <url><loc><![CDATA[https://nightlifemilan.com/]]></loc></url>
    <url><loc>https://nightlifemilan.com/</loc></url>
  </urlset>`;
  assert.deepEqual(extractSitemapUrls(xml, 'https://nightlifemilan.com'), [
    'https://nightlifemilan.com/',
    'https://nightlifemilan.com/guides/new?x=1&y=2',
  ]);
});

test('extractSitemapUrls rejects an empty sitemap', () => {
  assert.throws(
    () => extractSitemapUrls('<?xml version="1.0"?><urlset></urlset>', 'https://nightlifemilan.com'),
    /non-empty <urlset>/,
  );
});

test('extractSitemapUrls rejects a truncated HTTP 200 document', () => {
  assert.throws(
    () => extractSitemapUrls(
      '<urlset><url><loc>https://nightlifemilan.com/</loc></url>',
      'https://nightlifemilan.com',
    ),
    /Invalid sitemap XML/,
  );
});

test('extractSitemapUrls rejects a sitemap index instead of treating child sitemaps as pages', () => {
  assert.throws(
    () => extractSitemapUrls(
      '<sitemapindex><sitemap><loc>https://nightlifemilan.com/sitemap-1.xml</loc></sitemap></sitemapindex>',
      'https://nightlifemilan.com',
    ),
    /non-empty <urlset>/,
  );
});

test('extractSitemapUrls rejects external or non-HTTPS URLs', () => {
  assert.throws(
    () => extractSitemapUrls('<urlset><url><loc>https://example.com/x</loc></url></urlset>', 'https://nightlifemilan.com'),
    /Unexpected sitemap origin/,
  );
  assert.throws(
    () => extractSitemapUrls('<urlset><url><loc>http://nightlifemilan.com/x</loc></url></urlset>', 'https://nightlifemilan.com'),
    /Unexpected sitemap origin/,
  );
});

test('decimal and hexadecimal XML character references remain distinct URLs', () => {
  const xml = `<urlset>
    <url><loc>https://nightlifemilan.com/events/?id=&#65;</loc></url>
    <url><loc>https://nightlifemilan.com/events/?id=&#x42;</loc></url>
  </urlset>`;
  assert.deepEqual(extractSitemapUrls(xml, 'https://nightlifemilan.com'), [
    'https://nightlifemilan.com/events/?id=A',
    'https://nightlifemilan.com/events/?id=B',
  ]);
});

test('a new numeric-reference URL triggers a sitemap addition', () => {
  const previous = extractSitemapUrls(
    '<urlset><url><loc>https://nightlifemilan.com/events/?id=&#65;</loc></url></urlset>',
    'https://nightlifemilan.com',
  );
  const current = extractSitemapUrls(
    '<urlset><url><loc>https://nightlifemilan.com/events/?id=&#65;</loc></url><url><loc>https://nightlifemilan.com/events/?id=&#x42;</loc></url></urlset>',
    'https://nightlifemilan.com',
  );
  assert.deepEqual(diffSitemapUrls(previous, current).addedUrls, [
    'https://nightlifemilan.com/events/?id=B',
  ]);
});

test('mixed CDATA and text in loc preserves document order and triggers an addition', () => {
  const previous = extractSitemapUrls(
    '<urlset><url><loc>https://nightlifemilan.com/a</loc></url></urlset>',
    'https://nightlifemilan.com',
  );
  const current = extractSitemapUrls(
    '<urlset><url><loc>https://nightlifemilan.com/a</loc></url><url><loc><![CDATA[https://nightlifemilan.com/a]]>?x=1</loc></url></urlset>',
    'https://nightlifemilan.com',
  );
  assert.deepEqual(diffSitemapUrls(previous, current).addedUrls, [
    'https://nightlifemilan.com/a?x=1',
  ]);
});

test('DOCTYPE text inside an XML comment does not invalidate the sitemap', () => {
  assert.deepEqual(
    extractSitemapUrls(
      '<urlset><!-- literal <!DOCTYPE mention --><url><loc>https://nightlifemilan.com/a</loc></url></urlset>',
      'https://nightlifemilan.com',
    ),
    ['https://nightlifemilan.com/a'],
  );
});

test('XML numeric null reference is rejected', () => {
  assert.throws(
    () => extractSitemapUrls(
      '<urlset><url><loc>https://nightlifemilan.com/?x=&#0;</loc></url></urlset>',
      'https://nightlifemilan.com',
    ),
    /Invalid XML entity/,
  );
});

test('XML forbidden control reference is rejected', () => {
  assert.throws(
    () => extractSitemapUrls(
      '<urlset><url><loc>https://nightlifemilan.com/?x=&#1;</loc></url></urlset>',
      'https://nightlifemilan.com',
    ),
    /Invalid XML entity/,
  );
});

test('XML noncharacter reference FFFE is rejected', () => {
  assert.throws(
    () => extractSitemapUrls(
      '<urlset><url><loc>https://nightlifemilan.com/?x=&#xFFFE;</loc></url></urlset>',
      'https://nightlifemilan.com',
    ),
    /Invalid XML entity/,
  );
});

test('diffSitemapUrls reports additions and removals independently', () => {
  assert.deepEqual(
    diffSitemapUrls(
      ['https://nightlifemilan.com/old', 'https://nightlifemilan.com/shared'],
      ['https://nightlifemilan.com/new', 'https://nightlifemilan.com/shared'],
    ),
    {
      addedUrls: ['https://nightlifemilan.com/new'],
      removedUrls: ['https://nightlifemilan.com/old'],
    },
  );
});

test('first run submits the baseline and persists it after success', async () => {
  let submissions = 0;
  const saved: SitemapWatchState[] = [];
  const result = await applySitemapSnapshot({
    previous: null,
    currentUrls: ['https://nightlifemilan.com/', 'https://nightlifemilan.com/guides/new'],
    sitemapUrl: SITEMAP_URL,
    now: '2026-07-16T10:00:00.000Z',
    submit: async () => { submissions += 1; return { ok: true, status: 204 }; },
    save: async (next) => { saved.push(next); },
  });

  assert.equal(result.action, 'submitted');
  assert.equal(result.baseline, true);
  assert.equal(submissions, 1);
  assert.equal(saved.length, 1);
  assert.deepEqual(saved[0].urls, [
    'https://nightlifemilan.com/',
    'https://nightlifemilan.com/guides/new',
  ]);
});

test('sitemap watcher cron runs once daily at 18:00 UTC', () => {
  const config = JSON.parse(readFileSync('vercel.json', 'utf8')) as {
    crons: Array<{ path: string; schedule: string }>;
  };
  const watcher = config.crons.filter((cron) => cron.path === '/api/indexing/sitemap-watch');
  assert.deepEqual(watcher, [{ path: '/api/indexing/sitemap-watch', schedule: '0 18 * * *' }]);
});

test('one added URL triggers exactly one submission and persists the new set', async () => {
  let submissions = 0;
  const saved: SitemapWatchState[] = [];
  const result = await applySitemapSnapshot({
    previous: state(['https://nightlifemilan.com/']),
    currentUrls: ['https://nightlifemilan.com/', 'https://nightlifemilan.com/articles/new'],
    sitemapUrl: SITEMAP_URL,
    now: '2026-07-16T10:10:00.000Z',
    submit: async () => { submissions += 1; return { ok: true, status: 204 }; },
    save: async (next) => { saved.push(next); },
  });

  assert.equal(result.action, 'submitted');
  assert.deepEqual(result.addedUrls, ['https://nightlifemilan.com/articles/new']);
  assert.equal(submissions, 1);
  assert.equal(saved.length, 1);
});

test('unchanged URL set is submitted again on the next Milan calendar day', async () => {
  let submissions = 0;
  let saves = 0;
  const result = await applySitemapSnapshot({
    previous: state(['https://nightlifemilan.com/']),
    currentUrls: ['https://nightlifemilan.com/'],
    sitemapUrl: SITEMAP_URL,
    now: '2026-07-16T10:20:00.000Z',
    submit: async () => { submissions += 1; return { ok: true, status: 204 }; },
    save: async () => { saves += 1; },
  });

  assert.equal(result.action, 'submitted');
  assert.equal(submissions, 1);
  assert.equal(saves, 1);
});

test('removal-only change is submitted on the next Milan calendar day', async () => {
  let submissions = 0;
  const saved: SitemapWatchState[] = [];
  const result = await applySitemapSnapshot({
    previous: state(['https://nightlifemilan.com/', 'https://nightlifemilan.com/removed']),
    currentUrls: ['https://nightlifemilan.com/'],
    sitemapUrl: SITEMAP_URL,
    now: '2026-07-16T10:30:00.000Z',
    submit: async () => { submissions += 1; return { ok: true, status: 204 }; },
    save: async (next) => { saved.push(next); },
  });

  assert.equal(result.action, 'submitted');
  assert.deepEqual(result.removedUrls, ['https://nightlifemilan.com/removed']);
  assert.equal(submissions, 1);
  assert.equal(saved.length, 1);
  assert.deepEqual(saved[0].urls, ['https://nightlifemilan.com/']);
});

test('a second valid invocation on the same Milan calendar day does not submit again', async () => {
  let submissions = 0;
  let saves = 0;
  const previous = state(['https://nightlifemilan.com/']);
  previous.submittedAt = '2026-07-16T18:00:00.000Z';

  const result = await applySitemapSnapshot({
    previous,
    currentUrls: ['https://nightlifemilan.com/', 'https://nightlifemilan.com/new'],
    sitemapUrl: SITEMAP_URL,
    now: '2026-07-16T18:05:00.000Z',
    submit: async () => { submissions += 1; return { ok: true, status: 204 }; },
    save: async () => { saves += 1; },
  });

  assert.equal(result.action, 'already-submitted');
  assert.deepEqual(result.addedUrls, ['https://nightlifemilan.com/new']);
  assert.equal(submissions, 0);
  assert.equal(saves, 0);
});

test('daily idempotency follows the Milan calendar across a UTC date boundary', async () => {
  let submissions = 0;
  const previous = state(['https://nightlifemilan.com/']);
  previous.submittedAt = '2026-07-16T22:30:00.000Z';

  const result = await applySitemapSnapshot({
    previous,
    currentUrls: ['https://nightlifemilan.com/'],
    sitemapUrl: SITEMAP_URL,
    now: '2026-07-17T00:30:00.000Z',
    submit: async () => { submissions += 1; return { ok: true, status: 204 }; },
    save: async () => {},
  });

  assert.equal(result.action, 'already-submitted');
  assert.equal(submissions, 0);
});

test('failed Search Console submission does not persist the new URL set', async () => {
  let saves = 0;
  const result = await applySitemapSnapshot({
    previous: state(['https://nightlifemilan.com/']),
    currentUrls: ['https://nightlifemilan.com/', 'https://nightlifemilan.com/new'],
    sitemapUrl: SITEMAP_URL,
    now: '2026-07-16T10:40:00.000Z',
    submit: async () => ({ ok: false, status: 403, error: 'forbidden' }),
    save: async () => { saves += 1; },
  });

  assert.equal(result.ok, false);
  assert.equal(result.action, 'submission-failed');
  assert.equal(result.persisted, false);
  assert.equal(saves, 0);
});

test('empty observed URL set is rejected before submission or persistence', async () => {
  let submissions = 0;
  let saves = 0;
  await assert.rejects(
    applySitemapSnapshot({
      previous: state(['https://nightlifemilan.com/']),
      currentUrls: [],
      sitemapUrl: SITEMAP_URL,
      now: '2026-07-16T10:50:00.000Z',
      submit: async () => { submissions += 1; return { ok: true, status: 204 }; },
      save: async () => { saves += 1; },
    }),
    /empty sitemap URL set/,
  );
  assert.equal(submissions, 0);
  assert.equal(saves, 0);
});

test('a malformed observation performs no submission and no persistence', async () => {
  let submissions = 0;
  let saves = 0;
  await assert.rejects(
    runSitemapWatchCycle({
      acquire: async () => ({ release: async () => {} }),
      observe: async () => extractSitemapUrls(
        '<urlset><url><loc>https://nightlifemilan.com/</loc></url>',
        'https://nightlifemilan.com',
      ),
      read: async () => state(['https://nightlifemilan.com/']),
      save: async () => { saves += 1; },
      submit: async () => { submissions += 1; return { ok: true, status: 204 }; },
      sitemapUrl: SITEMAP_URL,
      now: () => '2026-07-16T11:00:00.000Z',
    }),
    /Invalid sitemap XML/,
  );
  assert.equal(submissions, 0);
  assert.equal(saves, 0);
});

test('an incomplete tag performs no submission and no persistence', async () => {
  let submissions = 0;
  let saves = 0;
  await assert.rejects(
    runSitemapWatchCycle({
      acquire: async () => ({ release: async () => {} }),
      observe: async () => extractSitemapUrls(
        '<urlset><url><loc>https://nightlifemilan.com/</loc></url><url</urlset>',
        'https://nightlifemilan.com',
      ),
      read: async () => state(['https://nightlifemilan.com/', 'https://nightlifemilan.com/existing']),
      save: async () => { saves += 1; },
      submit: async () => { submissions += 1; return { ok: true, status: 204 }; },
      sitemapUrl: SITEMAP_URL,
      now: () => '2026-07-16T11:01:00.000Z',
    }),
    /Invalid sitemap XML/,
  );
  assert.equal(submissions, 0);
  assert.equal(saves, 0);
});

test('an unclosed element performs no submission and no persistence', async () => {
  let submissions = 0;
  let saves = 0;
  await assert.rejects(
    runSitemapWatchCycle({
      acquire: async () => ({ release: async () => {} }),
      observe: async () => extractSitemapUrls(
        '<urlset><url><loc>https://nightlifemilan.com/</loc></url><lastmod></urlset>',
        'https://nightlifemilan.com',
      ),
      read: async () => state(['https://nightlifemilan.com/', 'https://nightlifemilan.com/existing']),
      save: async () => { saves += 1; },
      submit: async () => { submissions += 1; return { ok: true, status: 204 }; },
      sitemapUrl: SITEMAP_URL,
      now: () => '2026-07-16T11:02:00.000Z',
    }),
    /Invalid sitemap XML/,
  );
  assert.equal(submissions, 0);
  assert.equal(saves, 0);
});

test('an invalid named entity performs no submission and no persistence', async () => {
  let submissions = 0;
  let saves = 0;
  await assert.rejects(
    runSitemapWatchCycle({
      acquire: async () => ({ release: async () => {} }),
      observe: async () => extractSitemapUrls(
        '<urlset><url><loc>https://nightlifemilan.com/?x=&amp;bogus;</loc></url></urlset>'.replace('&amp;bogus;', '&bogus;'),
        'https://nightlifemilan.com',
      ),
      read: async () => state(['https://nightlifemilan.com/', 'https://nightlifemilan.com/existing']),
      save: async () => { saves += 1; },
      submit: async () => { submissions += 1; return { ok: true, status: 204 }; },
      sitemapUrl: SITEMAP_URL,
      now: () => '2026-07-16T11:03:00.000Z',
    }),
    /Invalid XML entity/,
  );
  assert.equal(submissions, 0);
  assert.equal(saves, 0);
});

test('an unexpected urlset child performs no submission and no persistence', async () => {
  let submissions = 0;
  let saves = 0;
  await assert.rejects(
    runSitemapWatchCycle({
      acquire: async () => ({ release: async () => {} }),
      observe: async () => extractSitemapUrls(
        '<urlset><url><loc>https://nightlifemilan.com/a</loc></url><ur1><loc>https://nightlifemilan.com/b</loc></ur1></urlset>',
        'https://nightlifemilan.com',
      ),
      read: async () => state([
        'https://nightlifemilan.com/a',
        'https://nightlifemilan.com/b',
      ]),
      save: async () => { saves += 1; },
      submit: async () => { submissions += 1; return { ok: true, status: 204 }; },
      sitemapUrl: SITEMAP_URL,
      now: () => '2026-07-16T11:04:00.000Z',
    }),
    /Unexpected element under sitemap <urlset>/,
  );
  assert.equal(submissions, 0);
  assert.equal(saves, 0);
});

test('concurrent cycles serialize the transaction and prevent duplicate submissions', async () => {
  let locked = false;
  let submissions = 0;
  const saved: SitemapWatchState[] = [];
  const acquire = async () => {
    if (locked) return null;
    locked = true;
    return { release: async () => { locked = false; } };
  };
  const cycle = () => runSitemapWatchCycle({
    acquire,
    observe: async () => ['https://nightlifemilan.com/', 'https://nightlifemilan.com/new'],
    read: async () => state(['https://nightlifemilan.com/']),
    save: async (next) => { saved.push(next); },
    submit: async () => {
      submissions += 1;
      await new Promise((resolve) => setTimeout(resolve, 20));
      return { ok: true, status: 204 };
    },
    sitemapUrl: SITEMAP_URL,
    now: () => '2026-07-16T11:10:00.000Z',
  });

  const [first, second] = await Promise.all([cycle(), cycle()]);
  assert.deepEqual([first.action, second.action].sort(), ['busy', 'submitted']);
  assert.equal(submissions, 1);
  assert.equal(saved.length, 1);
  assert.deepEqual(saved[0].urls, [
    'https://nightlifemilan.com/',
    'https://nightlifemilan.com/new',
  ]);
});
