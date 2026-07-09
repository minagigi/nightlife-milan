# EVOLUTION.md — Auto-miglioramento del cervello

Ogni volta che il cervello modifica sé stesso (BRAIN.md, PROJECTS.md, protocolli), registra qui:
data, cosa è cambiato, perché, effetto atteso. Le voci più recenti in alto.

---

## 2026-07-09 — Rientro sul cloud + Remote Control per PC/telefono

- **Cosa**: le 4 routine cloud sono state RIATTIVATE (la migrazione allo scheduler
  Windows era un fraintendimento: il proprietario voleva usare Claude Code dal PC e
  comandarlo dal telefono, non spostare lo scheduling). Aggiunto
  `remoteControlAtStartup: true` in `.claude/settings.json`: ogni sessione `claude`
  aperta nel repo sul PC compare con l'icona laptop su claude.ai/code e nell'app
  mobile, comandabile da lì. Il kit Task Scheduler resta nel repo come alternativa
  opzionale non attiva.
- **Perché**: uso interattivo dal PC (accesso a ciò che il cloud non ha) con controllo
  remoto dal telefono, restando tutto su Claude Code.
- **Effetto atteso**: cervello autonomo in cloud invariato; in più sessioni locali
  interattive raggiungibili da qualsiasi dispositivo.

## 2026-07-09 — Migrazione in locale su Windows (richiesta del proprietario)

- **Cosa**: il cervello ora gira sul PC Windows del proprietario via Utilità di
  pianificazione + Claude Code CLI headless (`scripts/brain/*.ps1`, prompt condivisi in
  `prompts/*.md`, guida in `LOCAL-WINDOWS.md`). Le 4 routine cloud sono state DISATTIVATE
  (non cancellate) per evitare doppie esecuzioni.
- **Perché**: il proprietario deve far fare al cervello cose possibili solo dal suo PC.
- **Effetto atteso**: stessi protocolli e orari (ma in ora locale, niente più slittamenti
  UTC/ora legale); briefing salvato in `briefings/YYYY-MM-DD.md`; PR aperte via `gh` CLI.

## 2026-07-09 — Anticipo del mattino (richiesta del proprietario)

- **Cosa**: analisi spostata dalle 06:00 alle 04:00, briefing+dispatch dalle 08:00 alle 06:00
  (ora di Milano). Routine 14:00 e 20:00 invariate.
- **Perché**: il proprietario vuole la strategia in mano alle 06:00 del mattino, con il
  ragionamento fatto molto prima.
- **Effetto atteso**: due ore di lavoro in più ogni giorno per i sub-agenti.

## 2026-07-09 — Nascita del cervello

- **Cosa**: creati BRAIN.md, PROJECTS.md, template strategia, journal e le 4 routine giornaliere
  (04:00 analisi, 06:00 briefing+dispatch, 14:00 avanzamento, 20:00 retro+auto-miglioramento,
  ora di Milano).
- **Perché**: il proprietario vuole che tutti i progetti si auto-migliorino ogni giorno, con
  strategia pensata dal cervello (Fable 5) ed esecuzione parallela di sub-agenti Sonnet.
- **Effetto atteso**: ogni mattina alle 06:00 un briefing con analisi e strategia; PR di
  miglioramento aperte ogni giorno; il sistema impara dai propri errori via retrospettiva.
