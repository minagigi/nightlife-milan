import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getAttendeeEmailCopy,
  validateAttendeeEmailCopyCoverage,
} from '../lib/attendeeEmailCopy';
import { enabledLocaleCodes, type LocaleCode } from '../lib/i18n/locales';

const EMOJI_PATTERN = /\p{Extended_Pictographic}/u;

test('attendee email copy covers every enabled locale', () => {
  assert.doesNotThrow(validateAttendeeEmailCopyCoverage);
  assert.equal(enabledLocaleCodes.length, 35);
});

test('every locale has non-empty fields with no emoji', () => {
  for (const locale of enabledLocaleCodes) {
    const copy = getAttendeeEmailCopy(locale);

    for (const [field, value] of Object.entries(copy)) {
      assert.ok(value.trim().length > 0, `${locale}.${field} should not be empty`);
      assert.ok(!EMOJI_PATTERN.test(value), `${locale}.${field} should not contain emoji`);
    }
  }
});

test('subject and intro contain the {event} placeholder for every locale', () => {
  for (const locale of enabledLocaleCodes) {
    const copy = getAttendeeEmailCopy(locale);
    assert.ok(copy.subject.includes('{event}'), `${locale}.subject should contain {event}`);
    assert.ok(copy.intro.includes('{event}'), `${locale}.intro should contain {event}`);
  }
});

test('greeting contains the {name} placeholder for every locale', () => {
  for (const locale of enabledLocaleCodes) {
    const copy = getAttendeeEmailCopy(locale);
    assert.ok(copy.greeting.includes('{name}'), `${locale}.greeting should contain {name}`);
  }
});

test('whatsappCta contains the {phone} placeholder for every locale', () => {
  for (const locale of enabledLocaleCodes) {
    const copy = getAttendeeEmailCopy(locale);
    assert.ok(copy.whatsappCta.includes('{phone}'), `${locale}.whatsappCta should contain {phone}`);
  }
});

test('getAttendeeEmailCopy throws for a locale without coverage', () => {
  assert.throws(
    () => getAttendeeEmailCopy('xx-not-a-locale' as LocaleCode),
    /Missing attendee email copy/,
  );
});
