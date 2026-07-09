# Il Cervello — come funziona e come si comanda

Sistema autonomo che ogni giorno analizza i progetti, decide la strategia e la fa eseguire a
sub-agenti in parallelo. Il "pensiero" (analisi, strategia, verifica) usa **Fable 5**;
l'esecuzione dei task usa sub-agenti **Sonnet**.

> **Dal 2026-07-09 il cervello gira IN LOCALE sul PC Windows del proprietario**
> (Utilità di pianificazione + Claude Code CLI headless): setup e gestione in
> **`LOCAL-WINDOWS.md`**. Le 4 routine cloud esistono ancora ma sono DISATTIVATE
> per evitare doppie esecuzioni.

## Ritmo giornaliero (ora locale del PC)

| Ora   | Fase | Cosa fa |
|-------|------|---------|
| 04:00 | Analisi & Strategia | Analizza tutti i progetti (pro, difetti, opportunità), scrive la strategia del giorno. Silenziosa. |
| 06:00 | Briefing & Dispatch | Scrive il briefing in `briefings/YYYY-MM-DD.md`, poi lancia i sub-agenti Sonnet in parallelo e apre le PR. |
| 14:00 | Avanzamento | Controlla le PR e la CI, corregge, rilancia i task falliti, pesca dai task di riserva. |
| 20:00 | Retro & Auto-miglioramento | Retrospettiva del giorno, chiude il journal, aggiorna BRAIN.md/PROJECTS.md se ha imparato qualcosa (log in EVOLUTION.md). |

Tutto lo stato (strategie, journal, evoluzione) vive sul branch **`brain/journal`**.
Il lavoro sul codice arriva come **PR verso `main`**: le decidi tu col merge.
I prompt delle 4 fasi (condivisi tra locale e cloud) sono in **`prompts/*.md`**.

## Come si comanda (esecuzione locale)

Vedi `LOCAL-WINDOWS.md` per il dettaglio. In sintesi, da PowerShell:

- **Vedere le fasi**: `Get-ScheduledTask -TaskName "Cervello*"`
- **Pausa di una fase**: `Disable-ScheduledTask -TaskName "Cervello 0600 Briefing"`
- **Esegui subito una fase**: `powershell -File scripts\brain\brain-task.ps1 -Phase 0600-briefing`
- **Rimuovere tutto**: `scripts\brain\uninstall-windows-tasks.ps1`

## Le vecchie routine cloud (disattivate)

Gestite con i tool `list_triggers` / `update_trigger` da una qualsiasi sessione Claude Code.
Per tornare al cloud: "riattiva le routine cloud del cervello" (`enabled: true`) e rimuovi le
attività locali. ⚠️ I loro orari cron sono in **UTC** (Milano = UTC+2 d'estate, UTC+1
d'inverno); le attività locali di Windows invece usano l'ora locale e non hanno questo
problema.

## Come aggiungere un progetto

1. Aggiungi una sezione in `PROJECTS.md` (branch `brain/journal`) con obiettivi e metriche.
2. Se il progetto vive in un altro repository, il repo va abilitato per questo ambiente
   (accesso GitHub per-repo), altrimenti il cervello non potrà leggerlo né aprirvi PR.

## Costi e limiti

- 4 sessioni al giorno + fino a 5 sub-agenti Sonnet in parallelo: consumo quotidiano reale.
  Riduci i task/giorno in BRAIN.md ("Regole non negoziabili") o disattiva le routine 14:00/20:00
  se vuoi alleggerire.
- Il cervello non fa mai push su `main` e non compie azioni distruttive o spese: tutto passa
  da PR che approvi tu.
