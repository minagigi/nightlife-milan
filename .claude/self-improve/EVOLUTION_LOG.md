# Evolution Log — self-improve

Registro append-only dei cicli di automiglioramento (vedi `SKILL.md`).
Ogni ciclo = una entry. Gli edit `REJECTED` e `REJECTED-BY-USER` non vanno
mai riproposti: sono il rejection buffer del metodo SkillOpt.

---

## 2026-07-09 — creazione della skill self-improve
- ACCEPTED `.gitignore`: `.claude/skills/` ora versionata (era tutta `.claude/` ignorata) | evidenza: in sessione remota `.claude/` non esisteva affatto — COMMON_MISTAKES.md e il protocollo di sessione erano irraggiungibili, quindi ogni lezione non committata è invisibile alle sessioni cloud
- ACCEPTED `CLAUDE.md`: protocollo di fine task ora include il ciclo `/self-improve` | evidenza: le regole Eventbrite/Xceed in CLAUDE.md sono nate da distillazione manuale di bug reali (emoji, music_properties) — il processo esisteva già ma senza metodo né gating

## 2026-07-09 — migrazione a plugin marketplace (accesso "ovunque")
- ACCEPTED: skill migrata da `.claude/skills/self-improve/` (locale a questo repo) a un plugin distribuito (`tools/claude-plugins/`, marketplace `minagigi-tools`) | evidenza: skill in `.claude/skills/` è visibile SOLO nelle sessioni che clonano questo repo — l'utente la vuole disponibile in ogni conversazione, locale e cloud, su qualunque progetto; il meccanismo Claude Code per questo è un plugin installato a livello account (`/plugin marketplace add` + `/plugin install`), non un file per-progetto
- DEFERRED: repo dedicato per il marketplace (es. `minagigi/claude-plugins`) invece di ospitarlo dentro `nightlife-milan` | l'integrazione GitHub di questa sessione non ha permesso di creare nuovi repository (403 "Resource not accessible by integration") e l'utente era irraggiungibile per crearlo lui stesso — ripiegato su `tools/claude-plugins/` in questo repo come soluzione funzionante subito; da spostare in un repo proprio quando possibile (basta cambiare il `source` in `.claude-plugin/marketplace.json` a un repo dedicato, i file del plugin sono già isolati e portabili)

## 2026-07-09 — rimozione del plugin da questo repo (privacy)
- ACCEPTED: rimossi `.claude-plugin/marketplace.json` e `tools/claude-plugins/` da `nightlife-milan` | evidenza: `nightlife-milan` è un repo GitHub **pubblico** (`visibility: "public"`); l'utente ha chiesto esplicitamente che le sue skill e i suoi strumenti restino privati — ospitarli qui li rendeva visibili a chiunque fin dal push, non solo dopo il merge. Contenuto conservato localmente nello scratchpad della sessione, pronto per essere ripubblicato non appena esiste un repo privato dedicato
- DEFERRED: scrub della cronologia git (i commit precedenti che includevano questi file restano raggiungibili nella storia del branch/PR pubblico finché non vengono riscritti) | riscrivere history pubblica è un'operazione distruttiva (force-push) da non fare senza conferma esplicita dell'utente; il contenuto non conteneva segreti/credenziali, solo la metodologia della skill
