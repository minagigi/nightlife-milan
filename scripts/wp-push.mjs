#!/usr/bin/env node
/**
 * Pubblica una pagina Elementor (o importa un template) su WordPress
 * tramite il plugin "Claude Elementor Connector".
 *
 * Variabili d'ambiente richieste:
 *   WP_URL           es. https://tuosito.it
 *   WP_USER          username WordPress (amministratore)
 *   WP_APP_PASSWORD  Application Password (Utenti → Profilo → Password applicazione)
 *
 * Uso:
 *   node scripts/wp-push.mjs ping
 *   node scripts/wp-push.mjs page <file.json> "<Titolo>" [slug] [draft|publish]
 *   node scripts/wp-push.mjs template <file.json>
 *
 * <file.json> è un export Elementor ({title, type, version, content, page_settings}).
 */

import { readFileSync } from 'node:fs';

const { WP_URL, WP_USER, WP_APP_PASSWORD } = process.env;
if (!WP_URL || !WP_USER || !WP_APP_PASSWORD) {
  console.error('Imposta WP_URL, WP_USER e WP_APP_PASSWORD nelle variabili d\'ambiente.');
  process.exit(1);
}

const auth = 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64');
const base = WP_URL.replace(/\/$/, '') + '/wp-json/claude/v1';

async function call(path, method = 'GET', body = null) {
  const res = await fetch(base + path, {
    method,
    headers: { Authorization: auth, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { raw: text }; }
  if (!res.ok) {
    console.error(`HTTP ${res.status}`, JSON.stringify(json, null, 2));
    process.exit(1);
  }
  return json;
}

const [cmd, file, title, slug, status] = process.argv.slice(2);

if (cmd === 'ping') {
  console.log(JSON.stringify(await call('/ping'), null, 2));
} else if (cmd === 'page') {
  if (!file || !title) {
    console.error('Uso: node scripts/wp-push.mjs page <file.json> "<Titolo>" [slug] [draft|publish]');
    process.exit(1);
  }
  const tpl = JSON.parse(readFileSync(file, 'utf8'));
  const out = await call('/elementor/page', 'POST', {
    title,
    slug: slug || undefined,
    status: status || 'draft',
    elementor_data: tpl.content,
    page_settings: tpl.page_settings || undefined,
    page_template: 'elementor_header_footer',
  });
  console.log(JSON.stringify(out, null, 2));
} else if (cmd === 'template') {
  if (!file) {
    console.error('Uso: node scripts/wp-push.mjs template <file.json>');
    process.exit(1);
  }
  const tpl = JSON.parse(readFileSync(file, 'utf8'));
  const out = await call('/elementor/template', 'POST', { template: tpl });
  console.log(JSON.stringify(out, null, 2));
} else {
  console.error('Comandi: ping | page | template');
  process.exit(1);
}
