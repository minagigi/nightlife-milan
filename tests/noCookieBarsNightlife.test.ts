import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { getMagisterMidaLegalDocument } from '../lib/legal/magisterMidaLegal35';
import { PINTEREST_DOMAIN_VERIFY } from '../lib/pinterest';

const REPO_ROOT = path.resolve(__dirname, '..');

function walkTsFiles(dir: string): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkTsFiles(full));
    } else if (/\.(ts|tsx|js|mjs|jsx)$/.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

const FORBIDDEN_PATTERNS: Array<{ name: string; re: RegExp }> = [
  { name: 'PinterestTag symbol', re: /\bPinterestTag\b/ },
  { name: 'MarketingConsentManager symbol', re: /\bMarketingConsentManager\b/ },
  { name: 's.pinimg.com script/origin', re: /s\.pinimg\.com/i },
  { name: 'ct.pinterest.com endpoint', re: /ct\.pinterest\.com/i },
  { name: 'pintrk tracker call', re: /\bpintrk\b/ },
  { name: 'NEXT_PUBLIC_PINTEREST_TAG_ID env', re: /NEXT_PUBLIC_PINTEREST_TAG_ID/ },
  { name: 'nlm_marketing_consent key', re: /nlm_marketing_consent/i },
  { name: 'Iubenda CMP', re: /\biubenda\b/i },
  { name: 'Cookiebot CMP', re: /\bcookiebot\b/i },
  { name: 'OneTrust CMP', re: /\bonetrust\b/i },
  { name: 'CookieYes CMP', re: /\bcookieyes\b/i },
  { name: 'Complianz CMP', re: /\bcomplianz\b/i },
  { name: 'Quantcast Choice CMP', re: /\bquantcast\b/i },
  { name: 'Didomi CMP', re: /\bdidomi\b/i },
  { name: 'Termly CMP', re: /\btermly\b/i },
  { name: 'Osano CMP', re: /\bosano\b/i },
  { name: 'cookie-consent component/pkg', re: /\bcookie[-_]?consent\b/i },
  { name: 'cookie-banner component/class', re: /\bcookie[-_]?banner\b/i },
  { name: 'cookiebar component/class', re: /\bcookie[-_]?bar\b/i },
];

test('Pinterest cookie bar, Pinterest Tag, and third-party cookie/consent bars are permanently removed from app, components, lib, and next.config', () => {
  assert.equal(
    fs.existsSync(path.join(REPO_ROOT, 'components', 'PinterestTag.tsx')),
    false,
    'components/PinterestTag.tsx must stay deleted',
  );

  const scanTargets = [
    ...walkTsFiles(path.join(REPO_ROOT, 'app')),
    ...walkTsFiles(path.join(REPO_ROOT, 'components')),
    ...walkTsFiles(path.join(REPO_ROOT, 'lib')),
    path.join(REPO_ROOT, 'next.config.ts'),
  ];

  for (const filePath of scanTargets) {
    const rel = path.relative(REPO_ROOT, filePath).replace(/\\/g, '/');
    const content = fs.readFileSync(filePath, 'utf8');

    for (const rule of FORBIDDEN_PATTERNS) {
      assert.equal(
        rule.re.test(content),
        false,
        `Forbidden ${rule.name} found in ${rel}`,
      );
    }

    if (rel !== 'components/MobileBottomBar.tsx') {
      assert.equal(
        /\bMobileBottomBar\b/.test(content),
        false,
        `Unused MobileBottomBar must never be imported or mounted (found in ${rel})`,
      );
    }
  }
});

test('Pinterest domain verify meta (p:domain_verify) stays preserved while CSP blocks pinimg/ct.pinterest', () => {
  const layoutSrc = fs.readFileSync(path.join(REPO_ROOT, 'app', '[locale]', 'layout.tsx'), 'utf8');
  assert.match(layoutSrc, /PINTEREST_DOMAIN_VERIFY/);
  assert.match(layoutSrc, /['"]p:domain_verify['"]/);
  assert.equal(typeof PINTEREST_DOMAIN_VERIFY, 'string');

  const nextConfigSrc = fs.readFileSync(path.join(REPO_ROOT, 'next.config.ts'), 'utf8');
  assert.equal(/pinimg\.com|ct\.pinterest\.com/i.test(nextConfigSrc), false);
});

test('Cookie Policy and Privacy Policy documents do not include Pinterest Tag sections', () => {
  for (const locale of ['it', 'en', 'es', 'fr', 'de']) {
    for (const kind of ['cookies', 'privacy'] as const) {
      const doc = getMagisterMidaLegalDocument(locale, kind);
      const serialized = JSON.stringify(doc);
      assert.equal(/Pinterest Tag/i.test(serialized), false, `Pinterest Tag text leaked in ${locale}/${kind}`);
      assert.equal(/s\.pinimg\.com/i.test(serialized), false, `s.pinimg.com leaked in ${locale}/${kind}`);
    }
  }
});
