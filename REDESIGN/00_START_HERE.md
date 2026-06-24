# 00 — START HERE — Rinascita visiva Nightlife Milan

## Contesto (deciso dall'utente)
- Direzione d'arte scelta: **C — "Maison Champagne"** (ultra-lusso da members club: charcoal caldo, avorio, un solo oro soft, marmo, ritratti, molto spazio bianco, angoli netti).
- Sequenza: **fase per fase, dall'inizio alla fine.**
- Immagini AI: **PILOTA prima** (4 immagini campione → conferma utente → poi batch).
- Chi esegue: un modello esecutore (Sonnet 4.6). Questo pacchetto è scritto per essere
  seguito MECCANICAMENTE, senza dover ragionare.

## Ordine di lettura ed esecuzione
1. Leggi `01_DESIGN_SYSTEM.md` → è il riferimento per TUTTI i valori (colori, font, spazi). Non inventare.
2. Apri `02_PLAYBOOK.md` → eseguilo dall'alto al basso, una task alla volta. È la guida operativa.
3. Quando arrivi alla Fase 3, usa `03_IMAGE_PROMPTS.md` per i prompt e i path esatti.

## Le 6 fasi (in ordine)
- Fase 0 — Pipeline immagini (532MB → ~30MB, webp). Sblocca subito la performance.
- Fase 1 — Design tokens unificati (1 oro #C9A86A, 3 superfici calde, tipografia).
- Fase 2 — Componenti & schema sezioni (respiro, angoli netti, titoli serif/avorio, velo caldo foto).
- Fase 3 — Rigenerazione immagini: PILOTA (4) → STOP/conferma → BATCH.
- Fase 4 — Copy/presentazioni (tono luxury, EN+IT) per locali, eventi-chiave, pagine.
- Fase 5 — QA finale (tsc, preview EN/IT, mobile, network, grep colori legacy).

## Regole d'oro
- Edit puntuali (mai riscrivere interi file). Sostituzioni di massa SOLO con gli script Node forniti (encoding-safe).
- Dopo ogni fase: `npx tsc --noEmit` = 0 errori, console preview = 0 errori.
- Non superare mai il PILOTA senza conferma esplicita dell'utente.
- In caso di dubbio su un valore: è in `01_DESIGN_SYSTEM.md`. Se non c'è, FERMATI e chiedi.

## Mappa dati (VERIFICATA nel codice — non fidarti della memoria)
- LOCALI (18 record: image, slug, isFeatured, copy) → `lib/venuesData.ts`. Ognuno ha un file immagine DEDICATO.
- EVENTI (mockEvents) e ZONE (mockZones) → `lib/data.ts` (`mockVenues = venuesData` è solo un re-export).
- GUIDE (mockGuides) → `lib/data.ts`.
- Featured (carosello hero): just-me, voya, pineta, 55milano.
- Le ZONE e la photo-grid della home riusano immagini generiche/condivise → vedi `03_IMAGE_PROMPTS.md` §4b.

## Punto di partenza
→ Apri `02_PLAYBOOK.md` ed esegui la **Fase 0, Task 0.1**.
