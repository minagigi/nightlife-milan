#!/usr/bin/env node
/**
 * Comanda il browser Chrome SUL COMPUTER DELL'UTENTE (non in cloud) via CDP,
 * attraverso un tunnel pubblico. Google vede l'IP residenziale dell'utente.
 *
 * Setup sul computer dell'utente (una volta per sessione di lavoro):
 *   1. Avvia Chrome con la porta di debug su un profilo dedicato:
 *      Windows:  chrome.exe --remote-debugging-port=9222 --user-data-dir="%USERPROFILE%\chrome-claude"
 *      macOS:    /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --user-data-dir="$HOME/chrome-claude"
 *      (al primo avvio: login manuale su Google in quel profilo — IP di casa, nessun blocco)
 *   2. Esponi la porta con un tunnel:
 *      ngrok:       ngrok http 9222 --host-header=localhost
 *      cloudflared: cloudflared tunnel --url http://localhost:9222 --http-host-header localhost
 *   3. Comunica a Claude l'URL del tunnel (es. https://xxxx.ngrok-free.app)
 *
 * Uso da questa sessione:
 *   CDP_URL=https://xxxx.ngrok-free.app node scripts/flow-remote.mjs ping
 *   CDP_URL=... node scripts/flow-remote.mjs goto <url> [shot.png]
 *   CDP_URL=... node scripts/flow-remote.mjs shot [shot.png]          # screenshot della tab attiva
 *   CDP_URL=... node scripts/flow-remote.mjs eval "<espressione JS>"  # nella tab attiva
 *
 * Sicurezza: chi conosce l'URL del tunnel controlla il browser. Tienilo attivo
 * solo durante le sessioni di lavoro e chiudi ngrok/cloudflared quando finiamo.
 */

import { chromium } from 'playwright';

const CDP_URL = process.env.CDP_URL;
if (!CDP_URL) {
  console.error('Imposta CDP_URL (URL del tunnel verso la porta 9222 del tuo Chrome).');
  process.exit(1);
}

const [cmd, arg1, arg2] = process.argv.slice(2);

const browser = await chromium.connectOverCDP(CDP_URL, { timeout: 30000 });
const ctx = browser.contexts()[0] || (await browser.newContext());

function activePage() {
  const pages = ctx.pages();
  return pages[pages.length - 1] || null;
}

try {
  if (cmd === 'ping') {
    const pages = ctx.pages();
    console.log('Connesso al Chrome remoto ✔');
    console.log('Tab aperte:', pages.length);
    for (const p of pages) console.log(' -', await p.title(), '|', p.url());
  } else if (cmd === 'goto') {
    if (!arg1) throw new Error('Uso: goto <url> [shot.png]');
    const page = activePage() || (await ctx.newPage());
    await page.goto(arg1, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(5000);
    const out = arg2 || 'remote-shot.png';
    await page.screenshot({ path: out });
    console.log('URL:', page.url());
    console.log('Titolo:', await page.title());
    console.log('Screenshot:', out);
  } else if (cmd === 'shot') {
    const page = activePage();
    if (!page) throw new Error('Nessuna tab aperta nel Chrome remoto.');
    const out = arg1 || 'remote-shot.png';
    await page.screenshot({ path: out });
    console.log('URL:', page.url());
    console.log('Screenshot:', out);
  } else if (cmd === 'eval') {
    if (!arg1) throw new Error('Uso: eval "<espressione JS>"');
    const page = activePage();
    if (!page) throw new Error('Nessuna tab aperta nel Chrome remoto.');
    const result = await page.evaluate(arg1);
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.error('Comandi: ping | goto | shot | eval');
    process.exitCode = 1;
  }
} finally {
  await browser.close(); // chiude solo la connessione CDP, NON il Chrome dell'utente
}
