# Il Cervello — come funziona e come si comanda

Sistema autonomo che ogni giorno analizza i progetti, decide la strategia e la fa eseguire a
sub-agenti in parallelo. Il "pensiero" (analisi, strategia, verifica) usa **Fable 5**;
l'esecuzione dei task usa sub-agenti **Sonnet**.

## Ritmo giornaliero (ora di Milano)

| Ora   | Routine | Cosa fa |
|-------|---------|---------|
| 04:00 | Analisi & Strategia | Analizza tutti i progetti (pro, difetti, opportunità), scrive la strategia del giorno. Silenziosa. |
| 06:00 | Briefing & Dispatch | Ti manda il briefing (notifica push + email) con tutta l'analisi e la strategia, poi lancia i sub-agenti Sonnet in parallelo e apre le PR. |
| 14:00 | Avanzamento | Controlla le PR e la CI, corregge, rilancia i task falliti, pesca dai task di riserva. |
| 20:00 | Retro & Auto-miglioramento | Retrospettiva del giorno, chiude il journal, aggiorna BRAIN.md/PROJECTS.md se ha imparato qualcosa (log in EVOLUTION.md). |

Tutto lo stato (strategie, journal, evoluzione) vive sul branch **`brain/journal`**.
Il lavoro sul codice arriva come **PR verso `main`**: le decidi tu col merge.

## Come si comanda

Le routine sono gestite con i tool `list_triggers` / `update_trigger` / `delete_trigger` /
`fire_trigger` da una qualsiasi sessione Claude Code di questo account. In pratica, apri una
sessione e chiedi ad esempio:

- **Pausa**: "disattiva la routine Cervello 06:00" (`update_trigger` con `enabled: false`)
- **Riprendi**: "riattiva le routine del cervello"
- **Cambia orario**: "sposta il briefing alle 09:00" (nuova `cron_expression`)
- **Esegui subito**: "fai partire ora la routine del briefing" (`fire_trigger`)

⚠️ Gli orari delle routine sono espressi in **UTC**: Milano d'estate è UTC+2, d'inverno UTC+1.
Al cambio ora (fine ottobre / fine marzo) gli orari slittano di un'ora finché non si aggiornano
le `cron_expression`.

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
