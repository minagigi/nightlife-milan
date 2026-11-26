import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { ENABLED_LOCALES, enabledLocaleCodes } from '../lib/i18n/locales';
import {
  WHATSAPP_CONCIERGE_BUBBLE_35,
  getWhatsAppConciergeBubbleCopy,
} from '../lib/i18n/whatsappConciergeBubble35';

const REPO_ROOT = path.resolve(__dirname, '..');

test('WhatsApp 7s Concierge Bubble covers all 35 enabled locales natively with zero forbidden tokens', () => {
  assert.equal(Object.keys(WHATSAPP_CONCIERGE_BUBBLE_35).length, 35);
  for (const loc of enabledLocaleCodes) {
    const c = getWhatsAppConciergeBubbleCopy(loc);
    assert.ok(WHATSAPP_CONCIERGE_BUBBLE_35[loc], `Missing WhatsApp bubble copy for ${loc}`);
    const fields = [
      c.deskLabel,
      c.closeAria,
      c.openAria,
      c.ctaHint,
      c.eventBody,
      c.guideBody,
      c.capodannoHubBody,
      c.clubBody,
      c.generalBody,
      c.prefillPrefix,
    ];
    for (const val of fields) {
      assert.ok(val && val.trim().length >= 5, `Empty WhatsApp bubble string in ${loc}`);
      assert.equal(val.includes('\u2014'), false, `Em-dash forbidden in ${loc}: ${val}`);
      assert.equal(/[!\u00a1\uff01]/.test(val), false, `Exclamation forbidden in ${loc}: ${val}`);
      assert.equal(/%/.test(val), false, `Percentage forbidden in ${loc}: ${val}`);
      assert.equal(/\b(?:stripe|pax|diritti|cookie|cookies|consent)\b/i.test(val), false, `Forbidden token in ${loc}: ${val}`);
    }
    if (loc !== 'en') {
      assert.notEqual(
        WHATSAPP_CONCIERGE_BUBBLE_35[loc].eventBody,
        WHATSAPP_CONCIERGE_BUBBLE_35.en.eventBody,
        `English fallback leaked in ${loc}.eventBody`,
      );
      assert.notEqual(
        WHATSAPP_CONCIERGE_BUBBLE_35[loc].guideBody,
        WHATSAPP_CONCIERGE_BUBBLE_35.en.guideBody,
        `English fallback leaked in ${loc}.guideBody`,
      );
    }
  }
});

test('WhatsAppFloating implements 7000ms auto-open, separate close button, and cross-tab session dismissal', () => {
  const src = fs.readFileSync(path.join(REPO_ROOT, 'components/WhatsAppFloating.tsx'), 'utf8');
  assert.ok(src.includes('AUTO_OPEN_DELAY_MS = 7000'));
  assert.ok(src.includes('nlm_wa_bubble_closed'));
  assert.ok(src.includes('nlm_wa_bubble_closed_until'));
  assert.ok(src.includes("window.addEventListener('storage'"));
  assert.ok(src.includes('data-wa-bubble-close="true"'));
  assert.ok(src.includes('data-wa-bubble-cta="true"'));
  assert.equal(src.includes('hidden xl:inline-block'), false, 'Bubble must be visible on mobile too');
});

test('LanguageSwitcher is visible in mobile header, uses portal without clipping, and maps all 35 country flags', () => {
  const headerSrc = fs.readFileSync(path.join(REPO_ROOT, 'components/Header.tsx'), 'utf8');
  assert.equal(headerSrc.includes('<div className="hidden sm:block">\n                <LanguageSwitcher'), false);
  assert.ok(headerSrc.includes('data-nlm-lang-portal'));

  const langSrc = fs.readFileSync(path.join(REPO_ROOT, 'components/LanguageSwitcher.tsx'), 'utf8');
  assert.ok(langSrc.includes('createPortal'));
  assert.ok(langSrc.includes('data-nlm-lang-portal="true"'));
  assert.equal(langSrc.includes(' fis '), false, 'Square .fis flag distortion must be removed');

  for (const loc of ENABLED_LOCALES) {
    assert.ok(loc.country && /^[a-z]{2}$/.test(loc.country), `Invalid ISO country flag code for ${loc.code}`);
  }
});

test('Home and TableConcierge remove useless dead sections while keeping inline numbered steps across event views', () => {
  const tcSrc = fs.readFileSync(path.join(REPO_ROOT, 'components/TableConcierge.tsx'), 'utf8');
  assert.equal(tcSrc.includes('styles.steps'), false, 'Dead 01/02/03 steps strip must be removed');
  assert.equal(tcSrc.includes('styles.previewBox'), false, 'Redundant previewBox must be removed');
  assert.equal(tcSrc.includes('data-ui="concierge-form"'), false, 'Unused WhatsApp configurator form must be removed');
  assert.equal(tcSrc.includes('tc-request-'), false, 'tc-request panel must be removed everywhere');
  assert.equal(tcSrc.includes('<fieldset'), false, 'Configurator fieldsets must be removed');
  assert.equal(tcSrc.includes('<select'), false, 'Configurator selects must be removed');

  const vipSrc = fs.readFileSync(path.join(REPO_ROOT, 'app/[locale]/vip-tables/page.tsx'), 'utf8');
  assert.equal(vipSrc.includes('<TableConcierge'), false, 'TableConcierge configurator must be removed from /vip-tables');
  assert.equal(vipSrc.includes('components/TableConcierge'), false, 'TableConcierge import must be removed from /vip-tables');
  assert.equal(vipSrc.includes('#tc-request-vip'), false, 'Orphan #tc-request-vip anchors must be removed');
  assert.ok(vipSrc.includes('id="vip-clubs-matrix"'), '/vip-tables must anchor to #vip-clubs-matrix');

  const homeSrc = fs.readFileSync(path.join(REPO_ROOT, 'app/[locale]/page.tsx'), 'utf8');
  assert.equal(homeSrc.includes('v01.cialdiniCells.map'), false, 'Internal Xceed jargon 4-cell grid must be removed');
  assert.equal(homeSrc.includes('<OctoberEntry'), false, 'Duplicate OctoberEntry grid on Home must be removed');

  for (const rel of [
    'components/CapodannoDetailView.tsx',
    'components/CapodannoHubView.tsx',
    'components/ChristmasVoyaDetailView.tsx',
    'components/OrthodoxNyeJustMeDetailView.tsx',
    'components/ThanksgivingJustMeDetailView.tsx',
    'components/PartenopeaJustMeDetailView.tsx',
  ]) {
    const vSrc = fs.readFileSync(path.join(REPO_ROOT, rel), 'utf8');
    assert.ok(vSrc.includes('flex items-start gap-3'), `Expected inline step flex layout in ${rel}`);
    assert.ok(vSrc.includes('.replace(/^\\s*(?:\\(\\d+\\)|'), `Expected leading number stripping in ${rel}`);
  }
});
