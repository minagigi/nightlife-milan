import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sanitize, resolveWhatsappOnly } from '../lib/brandSanitizer';
import { CONTACT } from '../config/contact';

test('sanitize: replaces a third-party phone number with our own', () => {
  const html = '<p>Call the promoter at +39 02 8765 4321 for info.</p>';
  const out = sanitize(html);
  assert.ok(!out.includes('8765 4321'), 'third-party phone must be removed');
  assert.ok(out.includes(CONTACT.whatsapp.number), 'our number must appear instead');
});

test('sanitize: preserves our own phone number unchanged', () => {
  const html = `<p>WhatsApp us: ${CONTACT.whatsapp.number}</p>`;
  const out = sanitize(html);
  assert.ok(out.includes(CONTACT.whatsapp.number));
  // Should not be duplicated/mangled.
  const occurrences = out.split(CONTACT.whatsapp.number).length - 1;
  assert.equal(occurrences, 1);
});

test('sanitize: preserves the Xceed affiliate URL (nightlifemilan-1 channel)', () => {
  const html = '<p><a href="https://xceed.me/en/milan/aria-club/channel/nightlifemilan-1">Buy tickets</a></p>';
  const out = sanitize(html);
  assert.ok(out.includes('xceed.me/en/milan/aria-club/channel/nightlifemilan-1'), 'affiliate URL must survive sanitize()');
});

test('sanitize: removes a third-party URL', () => {
  const html = '<p>Original event page: https://some-other-promoter.com/event/123</p>';
  const out = sanitize(html);
  assert.ok(!out.includes('some-other-promoter.com'), 'third-party URL must be stripped');
});

test('resolveWhatsappOnly: resolves the {{WHATSAPP}} placeholder only', () => {
  const html = '<p>Contact: {{WHATSAPP}}</p>';
  const out = resolveWhatsappOnly(html);
  assert.ok(out.includes(CONTACT.whatsapp.number));
  assert.ok(out.includes(CONTACT.whatsapp.link));
  assert.ok(!out.includes('{{WHATSAPP}}'));
});

test('resolveWhatsappOnly: does NOT corrupt a slug/marker containing numeric date sequences', () => {
  // Real bug (FASE X4): sanitize()'s PHONE_RE matched digit runs inside a
  // slug like "party-9-2026-2026-07-09" as if it were a phone number. The
  // assembled/final HTML (marker + slug + tracked URLs) must go ONLY through
  // resolveWhatsappOnly, which must leave every non-placeholder byte intact.
  const marker = '<!-- nlm:src=237143-en;slug-en=party-9-2026-2026-07-09 -->';
  const trackedUrl = '<p><a href="https://nightlifemilan.com/events/party-9-2026-2026-07-09?utm_source=eventbrite&utm_medium=referral&utm_campaign=party-9-2026-2026-07-09">Full guide</a></p>';
  const html = `<p>Contact: {{WHATSAPP}}</p>${trackedUrl}${marker}`;

  const out = resolveWhatsappOnly(html);

  assert.ok(out.includes(marker), 'marker with embedded numeric date sequence must survive untouched');
  assert.ok(out.includes('party-9-2026-2026-07-09'), 'numeric slug must survive untouched');
  assert.ok(out.includes(trackedUrl.replace('{{WHATSAPP}}', '{{WHATSAPP}}')) || out.includes('utm_campaign=party-9-2026-2026-07-09'), 'tracked URL must survive untouched');
  assert.ok(!out.includes('{{WHATSAPP}}'));
});

test('regression check: sanitize() WOULD corrupt that same numeric slug (documents why resolveWhatsappOnly exists)', () => {
  // This test pins down the actual historical bug: sanitize()'s PHONE_RE is
  // greedy enough to eat a numeric-heavy slug. It must NEVER be run on the
  // final assembled HTML — only resolveWhatsappOnly may touch it.
  const marker = '<!-- nlm:src=237143-en;slug-en=party-9-2026-2026-07-09 -->';
  const corrupted = sanitize(marker);
  assert.notEqual(corrupted, marker, 'sanitize() is expected to mangle numeric-heavy slugs — this is exactly why it must never run on the final assembled HTML');
});
