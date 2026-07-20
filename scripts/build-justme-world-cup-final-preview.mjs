import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const draftDir = path.join(root, 'artifacts', 'just-me-world-cup-final-2026-draft');
const markdown = await fs.readFile(path.join(draftDir, 'event-project-it.md'), 'utf8');

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

function section(title) {
  const start = markdown.indexOf(`## ${title}`);
  if (start < 0) return '';
  const bodyStart = markdown.indexOf('\n', start) + 1;
  const next = markdown.indexOf('\n## ', bodyStart);
  return markdown.slice(bodyStart, next < 0 ? markdown.length : next).trim();
}

function paragraphs(value) {
  return value.split(/\r?\n\r?\n/)
    .filter((part) => part && !part.startsWith('#'))
    .map((part) => `<p>${escapeHtml(part.replace(/\r?\n/g, ' '))}</p>`)
    .join('');
}

function listItems(value, ordered = false) {
  const pattern = ordered ? /^\d+\.\s+(.+)$/gm : /^-\s+(.+)$/gm;
  return [...value.matchAll(pattern)].map((match) => escapeHtml(match[1]));
}

const description = paragraphs(section('Descrizione principale'));
const programme = listItems(section('Programma dettagliato'), true);
const prices = listItems(section('Biglietti e tavoli verificati su Xceed'));
const booking = paragraphs(section('Prenotazione e conferma acquisto'));
const trademark = paragraphs(section('Nota marchi'));
const faq = [...section('FAQ SEO, 25 domande').matchAll(/^### (\d+)\. (.+)\r?\n\r?\n([^#]+?)(?=\r?\n\r?\n### |$)/gm)]
  .map((match) => ({ number: Number(match[1]), question: match[2], answer: match[3].trim() }));

const gallery = [
  ['just-me-finale-mondiale-argentina-spagna-poster-1x1-it.jpg', 'Locandina Argentina-Spagna al Just Me Milano', 'Locandina quadrata Argentina-Spagna al Just Me Milano con apertura alle 18 e calcio d’inizio alle 21'],
  ['just-me-finale-mondiale-aperitivo-1x1.jpg', 'Aperitivo pre-partita al Just Me Milano', 'Aperitivo elegante prima di Argentina-Spagna nel garden del Just Me Milano'],
  ['just-me-finale-mondiale-maxischermo-1x1.jpg', 'Finale Argentina-Spagna su maxischermo a Milano', 'Pubblico internazionale guarda Argentina-Spagna sul maxischermo del Just Me Milano'],
  ['just-me-finale-mondiale-tavoli-vip-1x1.jpg', 'Tavolo VIP per Argentina-Spagna al Just Me', 'Tavolo VIP con bottle service e vista sul maxischermo al Just Me Milano'],
  ['just-me-finale-mondiale-afterparty-1x1.jpg', 'Uptown Nights afterparty dopo la finale', 'Afterparty Uptown Nights al Just Me Milano dopo Argentina-Spagna'],
];

const html = `<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Argentina-Spagna al Just Me Milano | 19 luglio 2026</title>
  <meta name="description" content="Finale Argentina-Spagna al Just Me Milano con maxischermo, aperitivo e afterparty. Prenota su WhatsApp +39 351 912 7047.">
  <style>
    :root { color-scheme: dark; --bg:#0d0e10; --panel:#15161a; --line:#2a2c32; --gold:#e5bd61; --sky:#8fd4fa; --muted:#a9acb5; --white:#f7f7f8; }
    * { box-sizing:border-box; }
    html { scroll-behavior:smooth; }
    body { margin:0; background:var(--bg); color:var(--white); font-family:Arial Nova, Arial, sans-serif; line-height:1.65; }
    a { color:inherit; }
    .review { position:sticky; top:0; z-index:20; padding:10px 18px; background:#f3c75b; color:#15110a; text-align:center; font-size:13px; font-weight:800; }
    .hero { position:relative; min-height:min(720px, 86vh); display:grid; align-items:end; overflow:hidden; border-bottom:1px solid var(--line); }
    .hero img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
    .hero::after { content:""; position:absolute; inset:0; background:linear-gradient(180deg,rgba(5,5,7,.04) 28%,rgba(5,5,7,.82) 78%,#0d0e10 100%); }
    .hero-copy { position:relative; z-index:2; width:min(1180px, calc(100% - 36px)); margin:0 auto; padding:38px 0 44px; }
    .eyebrow { color:var(--gold); font-size:13px; font-weight:800; text-transform:uppercase; }
    h1 { margin:10px 0 12px; max-width:900px; font-size:clamp(36px,6vw,72px); line-height:1.02; }
    .hero-copy p { max-width:760px; margin:0; color:#dedfe3; font-size:clamp(16px,2vw,20px); }
    .facts { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); width:min(1180px,calc(100% - 36px)); margin:-1px auto 0; border:1px solid var(--line); border-width:0 1px 1px; }
    .fact { padding:22px; border-right:1px solid var(--line); }
    .fact:last-child { border-right:0; }
    .fact b { display:block; margin-bottom:4px; color:var(--gold); font-size:12px; text-transform:uppercase; }
    .container { width:min(1080px,calc(100% - 36px)); margin:0 auto; }
    section { padding:68px 0; border-bottom:1px solid var(--line); }
    h2 { margin:0 0 24px; font-size:clamp(27px,4vw,42px); line-height:1.1; }
    h3 { margin:0; font-size:18px; }
    p { color:#d0d1d6; }
    .intro { font-size:18px; }
    .notice { margin:28px 0 0; padding:18px 20px; border-left:4px solid #f3c75b; background:#211d14; color:#f5e4b2; }
    .timeline { display:grid; gap:0; border-top:1px solid var(--line); }
    .time-row { display:grid; grid-template-columns:62px 1fr; gap:18px; padding:19px 0; border-bottom:1px solid var(--line); }
    .time-row span { display:grid; place-items:center; width:42px; height:42px; border:1px solid #4a4d55; color:var(--gold); font-weight:800; }
    .gallery { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:18px; }
    figure { margin:0; background:var(--panel); border:1px solid var(--line); overflow:hidden; }
    figure:first-child { grid-column:1/-1; width:min(620px,100%); justify-self:center; }
    figure img { display:block; width:100%; aspect-ratio:1; object-fit:cover; }
    figcaption { padding:14px 16px; font-weight:800; }
    .prices { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; }
    .price { display:flex; justify-content:space-between; gap:16px; padding:16px 18px; background:var(--panel); border:1px solid var(--line); }
    .price strong { color:var(--gold); white-space:nowrap; }
    .actions { display:flex; flex-wrap:wrap; gap:12px; margin-top:28px; }
    .button { display:inline-flex; min-height:48px; align-items:center; justify-content:center; padding:0 20px; border:1px solid var(--gold); background:var(--gold); color:#14110b; text-decoration:none; font-weight:800; }
    .button.secondary { background:transparent; color:var(--white); border-color:#4b4e57; }
    .faq { display:grid; gap:10px; }
    details { background:var(--panel); border:1px solid var(--line); }
    summary { padding:18px 20px; cursor:pointer; font-weight:800; }
    details p { margin:0; padding:0 20px 20px; }
    .disclaimer { color:var(--muted); font-size:13px; }
    footer { padding:40px 18px 70px; color:var(--muted); text-align:center; }
    @media (max-width:760px) {
      .hero { min-height:520px; }
      .hero img { object-position:center; }
      .facts { grid-template-columns:1fr 1fr; }
      .fact:nth-child(2) { border-right:0; }
      .fact:nth-child(-n+2) { border-bottom:1px solid var(--line); }
      section { padding:48px 0; }
      .gallery,.prices { grid-template-columns:1fr; }
      figure:first-child { grid-column:auto; }
    }
  </style>
</head>
<body>
  <div class="review">BOZZA LOCALE, NON PUBBLICATA · Apertura 18:00 da confermare e allineare su Xceed</div>
  <header class="hero">
    <img src="just-me-finale-mondiale-argentina-spagna-cover-2x1-it.jpg" alt="Finale Argentina-Spagna su maxischermo al Just Me Milano domenica 19 luglio 2026">
    <div class="hero-copy">
      <div class="eyebrow">Just Me Milano · Finale mondiale 2026</div>
      <h1>Argentina vs Spagna su maxischermo</h1>
      <p>Un'unica serata con aperitivo, finale in diretta e Uptown Nights afterparty nel garden ai piedi della Torre Branca.</p>
    </div>
  </header>
  <div class="facts">
    <div class="fact"><b>Data</b>Domenica 19 luglio</div>
    <div class="fact"><b>Orari</b>Apertura 18:00 · Kick-off 21:00</div>
    <div class="fact"><b>Ingresso</b>21+ · Dress code elegante</div>
    <div class="fact"><b>Location</b>Parco Sempione · Torre Branca</div>
  </div>

  <main class="container">
    <section class="intro">
      <h2>La finale mondiale al Just Me Milano</h2>
      ${description}
      <div class="notice"><strong>Controllo pre-produzione:</strong> Xceed mostra oggi Uptown Nights dalle 19:30. L'apertura speciale delle 18:00 deve essere confermata prima di pubblicare sito ed Eventbrite.</div>
    </section>

    <section>
      <h2>Programma della serata</h2>
      <div class="timeline">${programme.map((item,index)=>`<div class="time-row"><span>${String(index+1).padStart(2,'0')}</span><p>${item}</p></div>`).join('')}</div>
    </section>

    <section>
      <h2>Immagini dell'evento</h2>
      <div class="gallery">${gallery.map(([src,title,alt])=>`<figure><img src="${src}" alt="${escapeHtml(alt)}"><figcaption>${escapeHtml(title)}</figcaption></figure>`).join('')}</div>
    </section>

    <section>
      <h2>Biglietti e tavoli</h2>
      <div class="prices">${prices.map((item)=>{const [name,...rest]=item.split(':');return `<div class="price"><span>${escapeHtml(name)}</span><strong>${escapeHtml(rest.join(':').trim())}</strong></div>`}).join('')}</div>
      ${booking}
      <div class="actions">
        <a class="button" href="https://xceed.me/en/milano/event/fifa-2026-final/238627/channel/nightlifemilan-1" rel="nofollow sponsored">Acquista su Xceed</a>
        <a class="button secondary" href="https://wa.me/393519127047">WhatsApp +39 351 912 7047</a>
      </div>
    </section>

    <section>
      <h2>Domande frequenti</h2>
      <div class="faq">${faq.map((item)=>`<details><summary>${item.number}. ${escapeHtml(item.question)}</summary><p>${escapeHtml(item.answer)}</p></details>`).join('')}</div>
    </section>

    <section class="disclaimer">
      <h2>Nota informativa</h2>
      ${trademark}
    </section>
  </main>
  <footer>Preview Nightlife Milan · progetto in approvazione · nessuna pubblicazione eseguita</footer>
</body>
</html>`;

await fs.writeFile(path.join(draftDir, 'preview.html'), html, 'utf8');
console.log(path.join(draftDir, 'preview.html'));
