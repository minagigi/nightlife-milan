> **NON ATTIVO** — alternativa opzionale al cloud. Le routine cloud sono ATTIVE:
> installare queste attività solo dopo averle spente, altrimenti doppie esecuzioni.

# Il Cervello in locale su Windows

Con questo kit il cervello gira sul tuo PC invece che in cloud: stessi protocolli (BRAIN.md),
stessi orari, ma le sessioni partono dall'Utilità di pianificazione di Windows e possono usare
tutto ciò che c'è sul PC. Prima di installarlo, disattiva le 4 routine cloud per evitare doppie
esecuzioni (riattivabili in qualsiasi momento, vedi in fondo).

Bonus: gli orari sono in **ora locale del PC** — il problema del fuso UTC e del cambio
ora legale sparisce.

## Prerequisiti (una tantum)

1. **Claude Code CLI** installata e autenticata:
   ```
   npm install -g @anthropic-ai/claude-code
   claude          # primo avvio: fai il login
   ```
2. **Git** con credenziali push per `minagigi/nightlife-milan` (se cloni via GitHub
   Desktop o con `gh`, le credenziali sono già a posto).
3. **GitHub CLI** autenticata (serve al cervello per aprire le PR):
   ```
   winget install GitHub.cli
   gh auth login
   ```
4. **Clona il repo** (se non l'hai già sul PC):
   ```
   gh repo clone minagigi/nightlife-milan
   ```
5. Facoltativo ma consigliato: `npm install` nella cartella del repo, così i sub-agenti
   non lo rifanno a ogni build.

## Installazione (30 secondi)

Apri PowerShell **nella cartella del repo** ed esegui:

```
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\brain\install-windows-tasks.ps1
```

Registra 4 attività pianificate giornaliere (ora locale):

| Attività | Ora | Fase |
|----------|-----|------|
| Cervello 0400 Analisi | 04:00 | Analisi & strategia (silenziosa) |
| Cervello 0600 Briefing | 06:00 | Briefing + dispatch sub-agenti Sonnet + PR |
| Cervello 1400 Avanzamento | 14:00 | Controllo PR/CI, correzioni, task di riserva |
| Cervello 2000 Retro | 20:00 | Retrospettiva + auto-miglioramento |

Le attività hanno `-WakeToRun` (svegliano il PC dalla **sospensione**) e
`-StartWhenAvailable` (se il PC era proprio spento, la fase parte appena lo riaccendi).
Un PC spento tutta la notte NON esegue nulla finché resta spento: se vuoi il cervello
puntuale alle 04:00, lascia il PC in sospensione, non spento.

## Prova subito (senza aspettare domattina)

```
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\brain\brain-task.ps1 -Phase 0400-analisi
```

## Dove trovi le cose

- **Briefing del mattino**: `.claude/brain/briefings/YYYY-MM-DD.md` (e comunque strategia
  e journal vengono pushati su `brain/journal` come sempre).
- **Log di ogni fase**: `.claude/brain/logs/YYYY-MM-DD-<fase>.log`.
- **Prompt delle fasi** (se vuoi modificarli): `.claude/brain/prompts/*.md`.

## Gestione

- **Vedere le attività**: `Get-ScheduledTask -TaskName "Cervello*"`
- **Pausa di una fase**: `Disable-ScheduledTask -TaskName "Cervello 0600 Briefing"`
- **Rimuovere tutto**: `powershell -NoProfile -ExecutionPolicy Bypass -File scripts\brain\uninstall-windows-tasks.ps1`

## Tornare al cloud

Le 4 routine cloud esistono ancora, solo disattivate. Da una qualsiasi sessione Claude
Code (web o PC) chiedi: "riattiva le routine cloud del cervello" (`update_trigger` con
`enabled: true`) — e in quel caso rimuovi le attività locali per non avere doppioni.
