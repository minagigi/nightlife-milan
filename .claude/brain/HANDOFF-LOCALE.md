# HANDOFF — Ricreare e gestire il Cervello da una conversazione LOCALE

Documento di trasferimento completo: tutto ciò che una nuova conversazione Claude Code
**sul PC del proprietario** deve sapere per operare il progetto di auto-miglioramento e
gestione dei progetti ("il Cervello"), nato in cloud il 2026-07-09.

---

## 1. Cos'è il Cervello

Un sistema autonomo che ogni giorno:
1. **Analizza** tutti i progetti registrati (codice reale, PR, CI, commit) e per ciascuno
   individua pro, difetti e opportunità di evoluzione — il "pensiero" usa **Fable 5**
   (`claude-fable-5`).
2. **Decide** una strategia quotidiana: massimo 5 task ad alto impatto, ognuno con un
   criterio di successo verificabile.
3. **Esegue** in parallelo con sub-agenti **Sonnet** (`model: "sonnet"`, Agent tool,
   `isolation: "worktree"`), un branch `brain/task-YYYY-MM-DD-<slug>` per task, e apre
   una PR verso `main` per ogni task riuscito. Il merge lo decide SOLO il proprietario.
4. **Si auto-migliora**: retrospettiva serale, aggiornamento dei propri protocolli
   (BRAIN.md/PROJECTS.md) con log delle modifiche in EVOLUTION.md.

Ritmo giornaliero (ora di Milano): **04:00** analisi → **06:00** briefing al proprietario
+ dispatch → **14:00** avanzamento/correzioni → **20:00** retro + auto-miglioramento.

## 2. Dove vive ogni cosa (già tutto nel repo — NON ricreare da zero)

Il repo `minagigi/nightlife-milan` contiene già l'intero sistema. Un clone locale ha tutto.

| Percorso | Ruolo |
|----------|-------|
| `.claude/brain/BRAIN.md` | **Il cuore**: identità, i 4 protocolli giornalieri, politica dei modelli, regole non negoziabili. Leggilo PER PRIMO e seguilo alla lettera. |
| `.claude/brain/PROJECTS.md` | Registro dei progetti da far evolvere (sito, pipeline Eventbrite Scout v3, pipeline Xceed v4) + backlog trasversale. |
| `.claude/brain/prompts/*.md` | I prompt pronti delle 4 fasi (0400-analisi, 0600-briefing, 1400-avanzamento, 2000-retro). Fonte unica, usabili sia a mano che schedulati. |
| `.claude/brain/strategies/` | Una strategia al giorno (`YYYY-MM-DD.md`, formato in `TEMPLATE.md`). |
| `.claude/brain/journal/` | Un journal al giorno: task lanciati, esiti, PR, lezioni. |
| `.claude/brain/EVOLUTION.md` | Log storico delle auto-modifiche del cervello (leggere le ultime voci per capire com'è cambiato). |
| `.claude/brain/README.md` | Panoramica e comandi di gestione. |
| `.claude/brain/LOCAL-WINDOWS.md` + `scripts/brain/*.ps1` | Kit OPZIONALE per schedulare le 4 fasi con l'Utilità di pianificazione di Windows (headless). |
| `.claude/settings.json` | Permessi pre-autorizzati (`defaultMode: dontAsk` + allow-list, scelta esplicita del proprietario) e `remoteControlAtStartup: true` (le sessioni locali compaiono su claude.ai/code e sull'app mobile con l'icona laptop). |
| `CLAUDE.md` (root) | Regole VITALI del progetto sito/pipeline (bug Eventbrite reali documentati: niente emoji nelle description, `music_properties` dopo il publish, `sanitize()` solo sugli hook AI, ecc.). Vincono su tutto. |

**Stato quotidiano**: vive sul branch **`brain/journal`** (strategie/journal/evoluzione).
Ogni fase inizia con:
```
git fetch origin brain/journal main && git checkout -B brain/journal origin/brain/journal
```
e finisce con commit+push su `brain/journal`. Il codice dei progetti NON si tocca mai su
questo branch: ogni task ha il suo branch dedicato + PR.

## 3. Setup del PC (una tantum)

```
npm install -g @anthropic-ai/claude-code
claude                       # primo avvio: login con l'account del proprietario
winget install GitHub.cli
gh auth login                # serve per aprire/gestire le PR dal locale
gh repo clone minagigi/nightlife-milan
cd nightlife-milan
npm install
```

Aprendo `claude` in questa cartella, il **Remote Control parte da solo** (impostazione già
nel repo): la sessione compare con l'icona del laptop su claude.ai/code e nell'app Claude
del telefono, comandabile da lì mentre esegue sul PC.

## 4. Prompt di bootstrap per la NUOVA conversazione locale

Incolla questo come primo messaggio nella nuova sessione `claude` aperta nel repo:

> Sei il CERVELLO STRATEGICO dei miei progetti. Leggi nell'ordine:
> `.claude/brain/HANDOFF-LOCALE.md`, `.claude/brain/BRAIN.md`,
> `.claude/brain/PROJECTS.md`, le ultime voci di `.claude/brain/EVOLUTION.md`,
> la strategia e il journal più recenti su `origin/brain/journal`, e il `CLAUDE.md`
> di root. Da questo momento operi secondo i protocolli di BRAIN.md: analisi con
> ragionamento profondo, esecuzione con sub-agenti Sonnet in parallelo (worktree),
> una PR per task verso main (il merge lo decido io), stato su brain/journal,
> auto-miglioramento documentato in EVOLUTION.md. Rispetta le regole non negoziabili.
> Quando sei pronto, dimmi lo stato attuale del sistema e cosa proporresti di fare oggi.

Differenze operative del locale rispetto al cloud (già riflesse in `prompts/*.md`):
- **PR e stato GitHub**: usa la CLI `gh` (`gh pr create/list/checks/view`), non i tool MCP.
- **Modelli**: la sessione principale va aperta/lasciata su Fable 5 (`/model claude-fable-5`
  se serve); gli esecutori si lanciano con l'Agent tool e `model: "sonnet"`.
- **Gestione delle routine cloud** (`list_triggers`/`update_trigger`): quei tool sono del
  server Claude Code Remote e in locale potrebbero non esserci — in tal caso si gestiscono
  da una qualsiasi sessione claude.ai/code.

## 5. Scheduling: chi fa girare il cervello ogni giorno?

**Stato attuale: le 4 routine CLOUD sono ATTIVE.** Il cervello autonomo gira in cloud;
la conversazione locale serve per lavoro interattivo e per le operazioni possibili solo
dal PC. Le due cose convivono senza conflitti finché il locale non lancia lui il dispatch.

Se invece vuoi spostare ANCHE lo scheduling sul PC:
1. **Prima spegni le routine cloud** (da una sessione claude.ai/code: "disattiva le 4
   routine del cervello"). ID: `trig_01JMzbAQsYyNktmXkXefnMqM` (04:00),
   `trig_01Fs9K36vndpYGy2twtkEaUJ` (06:00), `trig_01YTXTBpXLricJfFy58doaxW` (14:00),
   `trig_01LYLWJNmbDBR6neVe7e7vjs` (20:00). Mai entrambi accesi: doppie analisi e PR duplicate.
2. Poi installa il kit Windows: `powershell -NoProfile -ExecutionPolicy Bypass -File
   scripts\brain\install-windows-tasks.ps1` (dettagli in `LOCAL-WINDOWS.md`).
   In alternativa, esegui le fasi a mano quando vuoi:
   `powershell -File scripts\brain\brain-task.ps1 -Phase 0400-analisi` (o incolla il
   contenuto di `prompts/<fase>.md` nella sessione interattiva).

## 6. Regole non negoziabili (sintesi — la versione integrale è in BRAIN.md)

1. Mai push diretto su `main`: solo branch dedicati + PR; il merge lo decide il proprietario.
2. Max 5 task/giorno, max 5 sub-agenti in parallelo.
3. Nessuna azione distruttiva o irreversibile (cancellazioni, spese, pubblicazioni esterne)
   senza richiesta esplicita del proprietario.
4. Ogni task ha un criterio di successo VERIFICATO prima della PR (minimo `npm run build`;
   `npm test` esiste ed è la suite di regressione delle pipeline).
5. Il `CLAUDE.md` di root vince su tutto (bug-trap Eventbrite reali).
6. Onestà nel journal: i fallimenti di oggi sono i miglioramenti di domani.

## 7. Snapshot al 2026-07-09 (giorno di nascita)

- Ciclo completo eseguito: analisi Fable 5 → 5 task → 5 PR **tutte mergiate** (#6 fix
  JSON-LD Event, #7 sitemap dinamica, #8 CLAUDE.md+summaryIt, #9 internal linking,
  #10 suite test 30/30) + hotfix prezzi card (#12: mai fidarsi del ticket Eventbrite
  gratuito, prezzo solo dal listino reale `venuePricing.ts`, `null` = nessun badge).
- `npm test` introdotto (30 test) e verde su main.
- Prezzi reali confermati solo per `v-justme`: gli altri venue mostrano prezzo solo
  quando il proprietario fornirà i listini reali (mai inventare prezzi).
- Task di riserva non ancora eseguiti (in `strategies/2026-07-09.md`): route diagnostica
  qualità description, test con fixture HTML per i parser Xceed, rimozione fallback
  silenzioso `v-justme` in `eventbriteSync.mapVenueId`.
