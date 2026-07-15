# Poster rebrand — procedura completa ed edge case

Riferimento di dettaglio per lo Step 3 di SKILL.md. Standard definitivo
(memoria `nightlife-poster-rebrand-standard`, dall'esempio before/after
fornito dall'utente 2026-07-09) — supera la vecchia regola "solo pulizia
terzi": OGNI locandina pubblicata deve avere tutti e 5 i punti sotto, non un
sottoinsieme.

## I 5 punti obbligatori

1. **Formato 16:9** — outpaint/ricomposizione armonica dello sfondo
   originale (mai crop, mai tagliare elementi).
2. **Badge "Milan Nightlife — Event Service"**
   (`public/images/brand/milan-nightlife-badge.png`, PNG con alpha) in alto
   a sinistra.
3. **Contatti venue → nostri**: QUALSIASI numero di telefono presente (anche
   il numero prenotazioni ufficiale del locale, non solo promoter terzi) va
   sostituito con l'icona WhatsApp + `+39 351 912 7047` + bandierine 🇬🇧🇮🇹.
4. **Sito venue → nostro**: qualsiasi URL del locale → `www.nightlifemilan.com`.
5. **Da MANTENERE intatti**: logo/wordmark del venue, data, artwork/titolo
   evento, lineup (DJ/dinner show), riga servizi, palette e stile grafico.

## Procedura passo-passo

1. Download del poster candidato (`imageUrl`/`posterUrl`).
2. **Read the image** e verifica cosa contiene: loghi/contatti di terzi da
   rimuovere, numero/sito del venue da sostituire, orientamento/crop da
   estendere in 16:9. Questa è la stessa checklist che userebbe
   `inspectWithVision()` server-side (`lib/posterPipeline.ts`), fatta a
   occhio invece che via API Anthropic.
3. Upload di ENTRAMBI al Magnific MCP:
   - poster originale: `creations_upload_image` se l'URL è pubblico,
     altrimenti `creations_request_upload` + PUT del file + `creations_finalize_upload`
     per file locali;
   - badge: stesso flusso file locale, path
     `public/images/brand/milan-nightlife-badge.png`.
4. Un prompt di `images_generate` con `references` = [poster, badge] che
   copre TUTTI i 5 punti in un solo passaggio (estendi 16:9 ricostruendo lo
   sfondo, applica il badge in alto a sinistra, sostituisci telefono con
   icona WhatsApp+numero+bandierine, sostituisci sito, rimuovi loghi/contatti
   di terzi — mantieni logo venue/data/artwork/lineup/servizi invariati).
5. **Verifica visiva carattere per carattere**: il testo piccolo generato
   dall'AI (numero di telefono, URL) può uscire corrotto/illeggibile. Se
   succede, NON pubblicare così — vedi "Fallback testo contatti" sotto.
6. Se il poster è irrecuperabile — vedi "Edge case: contenuto non editabile"
   sotto — fallback a una foto reale della venue.
7. Convert to JPEG (quality ~85) and save locally, e.g. `/tmp/wed-poster.jpg`.
   Passa questo file a `publish-event.ts --poster`.

## Edge case: contenuto non editabile (persone reali, diritti d'immagine)

Esempio reale: locandina con foto di un calciatore noto (caso Messi/Fifa
2026) — non si può editare/rebrandare un volto reale senza violare diritti
d'immagine, indipendentemente da quanto pulito verrebbe il render.

Fallback: foto reale della venue (`lib/venuesData.ts`, `gallery[0]` o
`image`), applicando comunque badge + fascia contatti nostra (i 5 punti
restano obbligatori anche sulla foto di fallback — questo è lo stesso
principio del server: `rebrandVenueFallback()` in `lib/posterPipeline.ts`
applica SEMPRE il badge, nessuna immagine pubblicata resta senza).

Su `publish-event.ts`, usa `--poster-source venue-fallback` per questo caso
(non `poster-clean`) — vedi `references/data-contracts.md` per il perché.

## Fallback testo contatti (quando il render AI corrompe numero/URL)

Il testo piccolo generato in modo generativo (numero di telefono, URL) può
uscire illeggibile o con caratteri sbagliati. Due opzioni, in ordine di
preferenza:

1. Rigenera con un prompt più mirato (istruzioni più esplicite solo sulla
   fascia contatti, referenziando di nuovo poster+badge).
2. Componi la fascia contatti via `sharp` (overlay testo/immagine
   **deterministico**, non generativo) sopra il render già pulito — stessa
   logica del retry loop server-side in `rebrand()`
   (`lib/posterPipeline.ts`: `MAX_EDIT_ATTEMPTS`, vision-recheck,
   `buildRetryPrompt`), ma fatta a mano perché qui non c'è
   `inspectWithVision()` a chiudere il loop automaticamente.

Non pubblicare mai un poster con testo contatti illeggibile "perché tanto si
capisce" — il numero/URL deve essere leggibile carattere per carattere.

## `--poster-source` — quale valore usare

`PosterSource` ammette tre valori (`lib/posterPipeline.ts`), ma solo due
sono pertinenti a questa skill:

- `poster-clean` (default di `publish-event.ts`) — poster originale pulito
  e rebrandato a mano via Magnific in questa sessione. Usalo nel caso comune.
- `venue-fallback` — foto reale della venue usata perché il poster originale
  era irrecuperabile (edge case sopra).
- `poster-edited` — **non usarlo da questa skill**: è il tag che il codice
  server-side assegna quando il rebrand passa dalla pipeline Gemini/Nano
  Banana automatica (`rebrand()` in `lib/posterPipeline.ts`), non dal
  workflow manuale Magnific di questa skill.
