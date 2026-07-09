#!/usr/bin/env node
/**
 * Browser pilotato per Google Flow / Gemini (abbonamento Google AI Pro, niente API).
 *
 * Prerequisiti:
 *  - npm i --no-save playwright   (Chromium è già preinstallato nell'ambiente)
 *  - Policy di rete dell'ambiente che consenta labs.google e *.google.com
 *  - Cookie di sessione Google importati (vedi comando "cookies")
 *
 * Comandi:
 *   node scripts/flow-browser.mjs cookies <export-cookie-editor.json>
 *       Importa i cookie esportati con l'estensione Cookie-Editor (formato JSON)
 *       nel profilo browser persistente (.flow-profile/, MAI committato).
 *
 *   node scripts/flow-browser.mjs shot <url> [out.png]
 *       Apre l'URL con il profilo salvato e scatta uno screenshot a piena pagina.
 *
 *   node scripts/flow-browser.mjs whoami
 *       Verifica se la sessione Google è attiva (screenshot di labs.google/fx/tools/flow).
 */

import { chromium } from 'playwright';
import { readFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PROFILE_DIR = join(ROOT, '.flow-profile', 'chrome');
mkdirSync(PROFILE_DIR, { recursive: true });

const FLOW_URL = 'https://labs.google/fx/it/tools/flow';

function mapSameSite(v) {
  if (!v) return undefined;
  const s = String(v).toLowerCase();
  if (s === 'no_restriction' || s === 'none') return 'None';
  if (s === 'strict') return 'Strict';
  if (s === 'lax') return 'Lax';
  return undefined;
}

async function launch() {
  return chromium.launchPersistentContext(PROFILE_DIR, {
    headless: true,
    viewport: { width: 1440, height: 900 },
    locale: 'it-IT',
    timezoneId: 'Europe/Rome',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    args: ['--disable-blink-features=AutomationControlled'],
  });
}

const [cmd, arg1, arg2] = process.argv.slice(2);

if (cmd === 'cookies') {
  if (!arg1) {
    console.error('Uso: node scripts/flow-browser.mjs cookies <export-cookie-editor.json>');
    process.exit(1);
  }
  const raw = JSON.parse(readFileSync(arg1, 'utf8'));
  const cookies = raw
    .filter((c) => c.name && c.value)
    .map((c) => {
      const out = {
        name: c.name,
        value: c.value,
        domain: c.domain,
        path: c.path || '/',
        httpOnly: !!c.httpOnly,
        secure: !!c.secure,
      };
      if (!c.session && c.expirationDate) out.expires = Math.floor(c.expirationDate);
      const ss = mapSameSite(c.sameSite);
      if (ss) out.sameSite = ss;
      return out;
    });
  const ctx = await launch();
  await ctx.addCookies(cookies);
  await ctx.close();
  console.log(`Importati ${cookies.length} cookie nel profilo persistente.`);
} else if (cmd === 'shot' || cmd === 'whoami') {
  const url = cmd === 'whoami' ? FLOW_URL : arg1;
  const out = (cmd === 'whoami' ? arg1 : arg2) || 'screenshot.png';
  if (!url) {
    console.error('Uso: node scripts/flow-browser.mjs shot <url> [out.png]');
    process.exit(1);
  }
  const ctx = await launch();
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(6000);
    await page.screenshot({ path: out, fullPage: false });
    console.log('URL finale:', page.url());
    console.log('Titolo:', await page.title());
    console.log('Screenshot:', out);
  } finally {
    await ctx.close();
  }
} else {
  console.error('Comandi: cookies | shot | whoami');
  process.exit(1);
}
