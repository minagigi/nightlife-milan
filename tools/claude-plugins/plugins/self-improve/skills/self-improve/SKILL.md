---
description: Ciclo di automiglioramento e autoevoluzione in stile Microsoft SkillOpt — distilla le lezioni della sessione in edit piccoli, verificabili e con gating sui file di istruzioni del progetto corrente (CLAUDE.md/AGENTS.md e altre skill), tracciandoli in un log evolutivo locale al progetto. Usare a fine task significativa, quando l'utente dice "impara da questo" / "self-improve", quando un errore è stato commesso e poi corretto in sessione, o quando il comportamento reale di un sistema esterno contraddice le regole documentate.
---

# Self-Improve — autoevoluzione delle capacità agentiche

## Principio (adattato da Microsoft SkillOpt — github.com/microsoft/SkillOpt)

Il modello è congelato: ciò che evolve sono i file di istruzioni del progetto
corrente, trattati come **parametri addestrabili**:

- **Forward pass** = la sessione di lavoro appena svolta (la trajectory).
- **Backward pass** = analisi di errori e scoperte della sessione.
- **Update bounded** = pochi edit chirurgici (max 4 per ciclo), mai riscritture.
- **Validation gating** = ogni edit deve superare TUTTI i gate della fase 3;
  l'utente in review del commit è il validation set finale.
- **Rejection buffer** = il log evolutivo del progetto; ciò che è stato
  respinto non si ripropone.

La lezione chiave di SkillOpt: skill auto-generate **senza** controllo
qualità peggiorano le prestazioni. Il gating non è burocrazia, è il cuore
del metodo.

## Artefatti (sempre nel progetto/repo corrente, mai in questo plugin)

Questo plugin è codice condiviso: viene copiato in una cache di sola lettura
all'installazione, quindi non può accumulare stato. Ogni progetto in cui
gira mantiene il proprio stato:

| File (nel repo di lavoro) | Ruolo |
|---|---|
| `CLAUDE.md` / `AGENTS.md` (o equivalente) | Parametro principale: regole di progetto |
| `.claude/skills/*/SKILL.md` locali al progetto | Parametri per-dominio, se presenti |
| `.claude/self-improve/EVOLUTION_LOG.md` | Stato evolutivo di QUESTO progetto: edit accettati/respinti/rimandati. Crealo se non esiste. |

**Vincolo ambiente**: le sessioni remote clonano il repo fresco — esiste
solo ciò che è committato. Una lezione scritta solo in un file gitignored
è una lezione persa per metà delle sessioni. Assicurati che
`.claude/self-improve/` NON sia in `.gitignore`.

## Il ciclo (eseguire in ordine)

### 1. Rollout review
Ripercorri la sessione e raccogli candidati SOLO da queste categorie:

- errore commesso e poi corretto (da te o dall'utente);
- comportamento reale di un sistema esterno che contraddice la
  documentazione o non è coperto (bug API, limiti non documentati, ordini
  di chiamata obbligati);
- correzione esplicita dell'utente su approccio, stile o processo;
- tempo perso per un'informazione mancante che un file di istruzioni
  avrebbe potuto fornire (path sbagliati, comandi riscoperti, assunzioni
  errate).

**NON sono candidati**: preferenze inferite mai confermate dall'utente,
dettagli one-off validi solo per la task corrente, cose già documentate.

### 2. Backward pass
Per ogni candidato scrivi tre cose, esplicitamente:

a) **Evidenza** — il fatto concreto osservato (cosa è successo, in quale
   file/comando/API);
b) **Regola** — la generalizzazione che ne deriva, in 1-3 frasi operative;
c) **Bersaglio** — il file e la sezione esatta dove la regola deve vivere.

### 3. Gating (tutti obbligatori — un gate fallito = edit respinto)

- **Evidenza**: la regola cita un fatto osservato, non un'ipotesi.
  "Potrebbe essere utile" = respinto.
- **Generalità**: tornerà utile in una sessione futura *diversa* da questa.
- **Novità**: grep sul file bersaglio conferma che non è già coperta;
  controlla in `EVOLUTION_LOG.md` che non sia già stata respinta in passato.
- **Budget** (learning rate testuale): max **4 edit per ciclo**. Con più
  candidati validi, applica i migliori e logga il resto come `DEFERRED`.
- **Compattezza**: ogni edit ≤ ~5 righe. I file di istruzioni non devono
  crescere senza limite: usa add/replace/**delete** — se una regola nuova
  rende obsoleta una vecchia, l'edit le fa entrambe.

### 4. Apply + commit dedicato
Applica gli edit sopravvissuti. **Commit separato** dal lavoro di feature,
messaggio `self-improve: <sintesi>`, così l'utente può revisionare o
revertire l'intero ciclo in blocco.

### 5. Log
Appendi a `.claude/self-improve/EVOLUTION_LOG.md` (crealo se non esiste)
una entry per il ciclo (formato sotto). Se in seguito l'utente boccia o
reverta un edit, aggiorna la entry a `REJECTED-BY-USER` con la
motivazione: quel contenuto non va mai riproposto — è il feedback
negativo che addestra i cicli futuri.

## Formato entry di EVOLUTION_LOG.md

```markdown
## YYYY-MM-DD — <contesto sessione in 3-6 parole>
- ACCEPTED `<file>`: <sintesi edit> | evidenza: <fatto osservato>
- REJECTED (<gate fallito>): <proposta> | <motivo>
- DEFERRED: <proposta> | <perché rimandata>
```

## Modalità sleep (su invocazione esplicita `/self-improve:self-improve sleep`)

Come SkillOpt-Sleep: invece della sessione interattiva corrente, la
trajectory sono gli **esiti recenti di processi non presidiati** del
progetto — job schedulati, pipeline CI, batch notturni (successi vs
fallimenti vs errori ricorrenti nei loro log). Applica lo stesso identico
ciclo (fasi 1-5, stessi gate, stesso budget) alle regole documentate su
quei sistemi nei file di istruzioni del progetto.
