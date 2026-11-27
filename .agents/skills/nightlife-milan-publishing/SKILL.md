---
name: nightlife-milan-publishing
description: Publish, update, translate, audit, and deploy Nightlife Milan events, venue pages, landing pages, articles, and guides. Use whenever work affects nightlife content on nightlifemilan.com or its Eventbrite listings, including SEO metadata, multilingual copy, event imagery and galleries, Xceed affiliate links, WhatsApp booking, structured data, responsive verification, sitemap submission, or when an approved publishing pattern must become a permanent project standard.
---

# Nightlife Milan Publishing

Apply the approved Nightlife Milan publishing standard end to end. Treat accepted user corrections as durable knowledge, not one-off chat context.

## Rilascio singolo tramite template e riuso delle verifiche (10 ottobre 2026)

- Prima di cambiare codice, identifica la singola pagina/template, la revisione pubblicata, le capacita realmente installate e le sole dipendenze necessarie. Una proposta architetturale o un file locale non dimostra una capacita disponibile in produzione.
- Per dati, testi, immagini, composizione e stile gia supportati, usa il percorso autenticato del record/template con revisione attesa e invalidazione delle sole pagine dipendenti; verifica salvataggio e risultato pubblico senza build.
- Avvia un rilascio di codice solo dopo aver individuato concretamente la capacita assente nel renderer. Limita la patch a quella capacita e alle dipendenze indispensabili; non accorpare correzioni indipendenti di home, calendario, Halloween o altre famiglie.
- Riusa sorgenti, asset e verifiche ancora validi per gli esatti input e dipendenze. Ripeti i controlli influenzati dalla modifica e conserva tutti i gate obbligatori; un vecchio build o snapshot non approva una nuova sorgente.
- Un limite strutturale di Next.js puo richiedere una build ampia anche per una patch piccola: dichiaralo con evidenza, senza estendere i contenuti modificati, promettere deploy per file o disattivare i controlli.
- Dopo un errore reale, aggiorna questa regola, la procedura pertinente e le copie applicabili, conservando causa, correzione ed evidenza. Non ricominciare il lavoro verificato per un cambio di sessione.

La procedura operativa e in `docs/cost-efficient-publishing.md`, sezione "Scelta del percorso per una singola modifica". Queste istruzioni non autorizzano nuovi deploy o scritture esterne e non provano che il motore completo sia installato.

## Lezioni verificate dalla review live V34 (10 ottobre 2026)

- **Card Halloween:** un frame quadrato forzato aggiungeva ampie aree vuote alle locandine orizzontali. La correzione pubblicata conserva larghezza responsiva e altezza naturale (`block h-auto w-full object-contain`), senza cambiare immagini o composizione. Questa regola riguarda le card del hub Halloween: non modificare altri template per estenderla. Verificare tutti i poster reali su mobile/tablet/desktop, RTL e cinese; gli attributi HTML da soli non provano il risultato. Evidenza: `C:/Users/minag/.codex/reviews/20261010-home-week-calendar/release-preparation/live-browser-v34/published-card-ratio.visual-actual-acceptance.json` (232ee3df), produzione `dpl_5qNa2fAHXvGAUSasfFzEPHtNdv7H`.
- **Riferimenti di promozione:** il primo trasporto V34 ha respinto prima dell'effetto prove pubbliche B4 necessarie ma esterne al namespace previsto (`PUBLIC_SCOPE`). Verificare prima dell'esecuzione che ciascun riferimento reale sia ammesso da percorso esatto, hash e dimensione; usare un successore minimo revisionato se il namespace e consumato. Non allargare la lettura a intere cartelle, aggirare il controllo o ripetere l'intento fallito. Evidenza: `promotion-public-reference-successor1-preparation/promotion-actual-acceptance.json` (78898eae) nel medesimo packet V34; originale fallito preservato, successore EXIT0/fullEOF.
- **Stati selezionati:** la review live ha rilevato nel calendario un chip con testo e fondo entrambi `rgb(199,174,135)`, nonostante classi apparentemente corrette. Verificare il contrasto calcolato e i pixel dopo selezione reale e focus da tastiera. Registrare il difetto come non riparato finche la correzione sia effettivamente pubblicata e rivista; non dedurre un passaggio dal solo nome delle classi. La sorgente e il CSS compilato V34 mostrano una regola non stratificata `.shell .text-champagne` che prevale sulla variante stratificata `aria-pressed:text-black`. La patch proposta usa classi mutualmente esclusive per attivo/inattivo e riusa `.shell .bg-champagne`; la prova statica della cascade e in `C:/Users/minag/.codex/reviews/20261010-calendar-selected-day-contrast/static-cascade.actual.json`. E una preparazione SOURCE_ONLY, non una correzione live o una verifica dei pixel.

## Start Here

1. Locate the Nightlife Milan repository.
2. Read its `AGENTS.md`, `docs/seo-metadata-strategy.md`, `lib/i18n/locales.ts`, and the closest existing page or event of the same type.
   If Eventbrite is mentioned or in scope, read and apply `C:\Users\minag\.claude\skills\eventbrite-eventi-completi\SKILL.md` first (user rule, 16 Oct 2026). It overrides every Eventbrite rule in this skill and in the Claude Code `eventbrite-nightlife-publishing` skill: informational "BIGLIETTO NON VALIDO" registrations, Xceed affiliate purchase paths, WhatsApp booking/payment CTAs, multilingual duplicate listings, 25-FAQ/SEO-closing bodies and service-image matrices are the pattern that got the accounts suspended in July 2026 and are forbidden on Eventbrite. They remain valid for nightlifemilan.com only where this skill allows them.
3. Read [references/publishing-standard.md](references/publishing-standard.md).
4. For venue facts or audience rules, read [references/venue-facts.md](references/venue-facts.md).
5. Before publishing or deploying, read [references/verification.md](references/verification.md).

Do not redesign from memory when an approved live example exists. Use the current production page and its local implementation as the visual and structural baseline.

## Non-Negotiables

### Locandine, card e copertine `4:5` a pieno palco ovunque + Hero Schede Evento in Risoluzione HD e Proporzioni Reali (Lamentele utente — 24 novembre 2026)

- **Lamentela 1 (24 novembre 2026 — Pieno palco `4:5`)**: confronto tra `capodanno-justme-milano-torre-branca-2027` rimpicciolito dentro doppia cornice dorata (`recompose_poster_or_menu_4x5` su `1376×768`) e il Campione d'Oro approvato `NYE PINETA 2027` (`capodanno-pineta-milano.webp`): *«voglio che le sistemi su tutti i siti , sia come card , sia come immagini di copertina , sia come locandine , ovunque . non voglio più che siano fatti questi tipi di errori sul sito nightlifemilan.com e sui siti di axel»*.
- **Lamentela 2 (24 novembre 2026 — Risoluzione HD, Zero Sgranatura e Proporzioni Esatte nelle Hero Schede Evento)**: *«tutte le immagini delle hero nelle schede evento devono essere in risoluzione adeguata e non essere sgranate su nightlifemilan com e devono avere le proporzioni adatte»*.
- **Regola permanente (`locandine-copertine-pieno-formato` + `controlla_hero_schede_evento_nightlife.py`)**:
  1. Tutte le locandine, card (`cards-4x5/**`), copertine hero (`EventCoverHero`, `CapodannoDetailView`, `ChristmasVoyaDetailView`, `OrthodoxNyeJustMeDetailView`, `ThanksgivingJustMeDetailView`, `PartenopeaJustMeDetailView`, `app/[locale]/events/[slug]/page.tsx`), `<figure>` dettaglio e `openGraph.images` degli **eventi attivi/futuri** (inclusi tutti gli eventi non scaduti in `lib/october-events/inventory.json` e i 25 eventi settimanali in `lib/eventsConfig.ts`) su `nightlifemilan.com` devono essere **`1080×1350` `4:5` (`<= 300 KB` WebP)** a **pieno palco superiore (`1080×1214`)** sopra la sola barra Couture Noir (`136px`, `WWW.NIGHTLIFEMILAN.COM` + pillola `#25D366` `+39 351 912 7047` senza bollino nero `WA`), con energia ad alta frequenza `hf_energy >= 3.25` (zero ritagli `338×380 px` ingranditi da vecchie card con scritte fantasma `PODANNO 2` / `RESERVATIONS`, e restauro fedele GPU `Real-ESRGAN x4plus` + Lanczos isotropo `scale_x == scale_y` sulle locandine ufficiali strette `< 1080px`).
  2. **Rendering Next.js `<Image>` senza downscaling e con proporzioni esatte Serverless-safe**:
     - Tutti i 7 componenti Hero delle schede evento usano `<Image>` senza `unoptimized`, con `quality={95}` e `sizes="(max-width: 1080px) 100vw, 1080px"` sui box `4:5` (`max-w-[540px]`), così che `/_next/image` serva sempre **`>= 1080w`** (vietati `sizes="540px"`, `560px`, `40vw`, `42vw` che facevano servire `w=600` sgranato su desktop `1x`/`1.25x`).
     - Tramite il manifest statico `lib/imageDimensionsManifest.json` + `getPublicImageDimensions` (zero `fs` a runtime, compatibile Vercel Serverless ISR), gli **eventi storici d'archivio** (`1376×768` `16:9`, `1400×1120` `5:4`, `1800×900` `2:1`, `1080×1080` `1:1` o `1080×1350` `4:5`) adottano sempre l'esatto `aspectRatio` intrinseco del file reale senza mai tagliare un `16:9` dentro `4:5` né un `4:5` dentro `16:9`.
     - Dopo ogni sovrascrittura in-place di immagini già pubblicate, eseguire il purge della cache Edge/Image Optimization di Vercel (`minimumCacheTTL: 86400`) così che `/_next/image` serva immediatamente gli asset nitidi.
  3. Vietati `recompose_poster_or_menu_4x5`, `render_square_flyer` con testata nera sopra il flyer, box intermedi `OFFICIAL RESERVATIONS`, `object-contain p-1 sm:p-2` o `max-h-[680px]` nei componenti React, parole troncate a metà e glifi mancanti `□`.
  4. Cancelli bloccanti obbligatori prima e dopo ogni push/deploy:
     ```bash
     python -X utf8 C:\Users\minag\.claude\skills\locandine-copertine-pieno-formato\scripts\controlla_locandine_pieno_formato.py --nlm <repo>
     python -X utf8 C:\Users\minag\.claude\skills\nightlife-milan-publishing\scripts\controlla_hero_schede_evento_nightlife.py --repo <repo>
     python -X utf8 C:\Users\minag\.claude\skills\nightlife-milan-publishing\scripts\controlla_hero_schede_evento_nightlife.py --live https://nightlifemilan.com
     ```

### Pagamenti e fee dei locali partner sulle pagine evento: 5 venue esenti vs Voya Rooftop con +20% (Errore pagato 20 nov 2026 · aggiornamento 24 nov 2026)

- **Lamentela dell'utente (20 novembre 2026)**: sulle pagine evento (serate settimanali, speciali/festività e Capodanno 2027) era stato attivato per errore il checkout Stripe interno e la commissione `+20%` (`SinglePassVenueModule`, `ConfirmedEventTicketsBox` mappato a `club-event` con `partner: false`, e `PARTNER_CAPODANNO_SLUGS` incompleto) su locali partner che invece non devono MAI avere checkout interno né `+20%`.
- **Aggiornamento dell'utente (24 novembre 2026)**: *«per il voya su nightlifemilan.com per il pagamento c'è da aggiungere la commissione di booking & transaction fees come per gli altri eventi del 20% , non trattarlo a livello economico come uno dei locali partner»*.
- **Regola permanente**:
  1. **Just Me Milano**, **JustMe Garda Lake**, **Pineta Milano**, **Aria Club Milano**: sulle pagine evento (normali, speciali, Capodanno) usare **esclusivamente Xceed (`nightlifemilan-1`)** o, quando non disponibile, **WhatsApp (`+39 351 912 7047`)**. Vietati checkout interno e `+20%`. (Nota: per `Aria Club` settimanali in `eventsConfig.ts` non lasciare link Xceed 404/scaduti così resta attivo il fallback WhatsApp; per *Partenopea* al Just Me il *Dinner Show 70€* resta solo WhatsApp, mentre aperitivo/ingresso/tavoli usano Xceed `#249216` o WhatsApp.)
  2. **55 Milano**: su tutte le pagine evento (normali, Natale, Capodanno) gestire le prenotazioni **esclusivamente via WhatsApp (`+39 351 912 7047`)**. Vietati checkout interno e `+20%`.
  3. **Voya Rooftop Milan (`+20%` Booking & Transaction Fees su `nightlifemilan.com`)**: su `nightlifemilan.com` il Voya Rooftop **non va trattato economicamente come locale partner** (`partner: false` su `capodanno-voya-rooftop-milano` e sugli SKU `voya` / `voya-christmas` in `lib/single-pass/catalog.ts`, `PARTNER_CAPODANNO_SLUGS` a 10 slug esenti fee, mantenendo `capodanno-voya-rooftop-milano` in `CAPODANNO_PARTNER_PRIORITY_SLUGS` per la priorità d'ordine). Sulle pagine evento Voya (Capodanno 300€ -> 360€ e Natale 100€ -> 120€) e su `/single-pass` è attivo il checkout online con commissione `+20%` Booking & Transaction Fees. Inoltre ogni pagina che cita il Capodanno Voya mostra il menu ufficiale 2027 a 6 portate sia scritto per esteso sia come card immagine `4:5` tradotta nella lingua della pagina (`voya-nye-2027-menu-<locale>.webp`, 35 lingue su NLM e 4 lingue su Axel).
  4. **Eccezione `/single-pass` invariata**: la pagina e il flusso **`/single-pass`** (8 locali in `STOREFRONT_VENUES`, `channel: 'single-pass'`) mantengono il checkout interno e la fee `+20%`.
- **Cancello automatico obbligatorio**: eseguire sia prima del push (`--repo <path>`) sia dopo il deploy su produzione (`--live https://nightlifemilan.com`):
  ```bash
  python -X utf8 C:\Users\minag\.claude\skills\nightlife-milan-publishing\scripts\controlla_pagamenti_venue_nightlife.py --repo <repo>
  python -X utf8 C:\Users\minag\.claude\skills\nightlife-milan-publishing\scripts\controlla_pagamenti_venue_nightlife.py --live https://nightlifemilan.com
  ```
- **Allineamento extra-repo**: aggiornare sempre anche `C:\Users\minag\Desktop\CAPODANNO\richieste-locali\LISTINI-VERIFICATI.json` e `C:\Users\minag\Desktop\social-automation\whatsapp-nightlife\ISTRUZIONI.md`.

### Ordine Capodanno 2027 (partner prima) e Lightbox a schermo intero su immagini non-card (Regola permanente — 20 novembre 2026)

- **Ordine Capodanno 2027 (richiesta permanente dell'utente, 20 novembre 2026 · aggiornamento fee Voya 24 novembre 2026)**: su `nightlifemilan.com` (catalogo `lib/capodannoEvents.ts`, `components/GlobalSearch.tsx`, `components/OctoberEntry.tsx`) tutti i **18 locali partner** allineati al network live `https://capodannodimilano.com` di Axel (Just Me, Pineta, Voya, REPVBLIC, Bischeri, Gate, Pelledoca, Magazzini Generali, Bobino, The Club, Aria, 55, Tocqueville 13, Hollywood, 11 Clubroom, TOM) più **JustMe Garda Lake** e **Il Gattopardo** (`CAPODANNO_PARTNER_PRIORITY_SLUGS` in `lib/capodanno/partnerPrioritySlugs.ts`) vanno ordinati **strettamente prima** di tutti gli altri locali non partner (`NON_PARTNER_PRIORITY_SLUGS`). Conservare `PARTNER_CAPODANNO_SLUGS` a **10 slug esenti fee** (`capodanno-voya-rooftop-milano` rimosso il 24 nov 2026 perché applica `+20%` Booking & Transaction Fees) e gli override contestuali (`voya` #1 in `capodanno-rooftop-milano`, `justme-garda-lake` #1 in `lombardia`).
- **Lightbox a schermo intero su tutte le immagini logiche tranne le card**: tramite `<SiteImageLightbox />` (`components/SiteImageLightbox.tsx`, `lib/lightboxEligibility.ts`, copy native su 35 lingue in `lib/lightboxCopy35.ts` con zero testo `"Stripe"`), tutte le immagini logiche dentro `#main-content`/`main` (locandine evento, card/tavole menu, gallerie SEO Flow, gallerie locali ed editoriali/guide) devono aprirsi a schermo intero al click con `resolveFullResImageSrc` (unwrapping `/_next/image`), zoom `1x`/`1.85x`, navigazione `Prev`/`Next`, tastiera (`Escape`/`ArrowLeft`/`ArrowRight`) e swipe. Restano **rigorosamente escluse tutte le card** (eventi, locali, Capodanno, caroselli, `/single-pass`, ricerca, `EventImageGallery`), i backdrop hero full-bleed (`data-hero-backdrop="true"` / `data-no-lightbox="true"`), l'header di navigazione (`header.nlm-header`), i loghi SVG e le mappe.
- **Cancello automatico obbligatorio**: eseguire sia prima del push (`--repo <path>`) sia dopo il deploy (`--live https://nightlifemilan.com`):
  ```bash
  python -X utf8 C:\Users\minag\.claude\skills\nightlife-milan-publishing\scripts\controlla_ordine_capodanno_e_lightbox.py --repo <repo>
  python -X utf8 C:\Users\minag\.claude\skills\nightlife-milan-publishing\scripts\controlla_ordine_capodanno_e_lightbox.py --live https://nightlifemilan.com
  ```

### Zero bottoni/link «Chiama» (`tel:`) e contrasto WCAG obbligatorio su tutti i bottoni (Errore pagato — 21 novembre 2026)

- **Lamentela dell'utente (21 novembre 2026, `/it/eventi/eventi-capodanno-milano-2027`)**: su più sezioni erano rimasti link `href="tel:+393519127047"` (*Chiama*), tra cui un bottone `Chiama` reso come **riquadro vuoto nero su nero** (`bg-[#050505] ... text-[#050505]`), più pulsanti di catalogo/calendario con `text-[#050505]` su `#050505`, `hover:bg-[#050505] hover:text-[#050505]` o `text-white` su `#25D366` (1,98:1).
- **Causa radice**: conversione colore automatica verso palette Couture Noir (`text-[#FFFFFF]` → `text-[#050505]`) su bottoni a sfondo scuro + audit regex precedente che usava `\b` subito dopo `]` (`bg-\[#050505\]\b` non fa mai match perché `]` è `\W`).
- **Regola permanente**:
  1. **Zero bottoni e link click-to-call (`tel:`) ovunque su `nightlifemilan.com`**: nessun `href="tel:..."`, nessun `Chiama` / `Call +39`. I canali cliccabili pubblici sul sito sono esclusivamente **WhatsApp (`https://wa.me/393519127047`)**, **Email (`mailto:concierge@nightlifemilan.com`)** e **Xceed / checkout online** ove previsto. (I campi `"telephone"` nei JSON-LD machine-readable restano invariati.)
  2. **Contrasto visibile reale su base, hover e focus per ogni bottone/link**: su `#25D366` usare sempre testo scuro `#050505` (`10,6:1`, mai `text-white`), nessun testo `#050505` senza fondo chiaro esplicito su sezioni scure, nessuna icona `#F6F1E7` dentro bottone `#F6F1E7` (`text-current`).
- **Cancello automatico obbligatorio (`--repo` prima del push, `--live` dopo il deploy)**:
  ```bash
  python -X utf8 C:\Users\minag\.claude\skills\nightlife-milan-publishing\scripts\controlla_zero_chiama_e_contrasto_bottoni.py --repo <repo>
  python -X utf8 C:\Users\minag\.claude\skills\nightlife-milan-publishing\scripts\controlla_zero_chiama_e_contrasto_bottoni.py --live https://nightlifemilan.com/it/eventi/eventi-capodanno-milano-2027 https://nightlifemilan.com/it
  ```

### Generatore Pin Pinterest: eventi esclusi per diffida (Regola permanente — 22 novembre 2026)

- **Richiesta dell'utente**: due teatri hanno mandato una diffida e non vanno più menzionati (elenco completo in `regole-di-dominio/nightlife-eventi.md`).
- **Nel generatore `D:\nightlife milan\pinterest`**: `costruisci_lotto.py` ha `ESCLUSI_DIFFIDA` e `citato_escluso()` e toglie dal lotto ogni Pin che li cita, anche se il sito li ripubblica. `controlla_pin.py` fallisce se compaiono in testi, alt, link, nomi file, `pins.json`, CSV, `BACHECHE.json`, `pin/` o `scarti/`.
- **Cancellazioni**: `cancella_esclusi_diffida.py` cancella i file e ripulisce `dati/`. Va lanciato su TIMEMACHINE e sul Worker, perché la sincronizzazione non propaga le cancellazioni. Nota in `dati/regola-esclusioni-diffida.md`.

### Zero barra dei cookie Pinterest e zero altre barre cookie/consenso su `nightlifemilan.com` (Regola permanente — 22 novembre 2026)

- **Richiesta dell'utente (22 novembre 2026)**: *«non voglio la barra dei cookie di pinterest o altre barre su nightlifemilan»*.
- **Regola permanente**:
  1. **Zero barre o banner cookie/consenso e zero Pinterest Tag su `nightlifemilan.com`**: nessun componente o script di consenso (`PinterestTag`, `MarketingConsentManager`, `s.pinimg.com`, `ct.pinterest.com`, `pintrk`, `NEXT_PUBLIC_PINTEREST_TAG_ID`, `nlm_marketing_consent_v1`) né banner di terze parti (Iubenda, Cookiebot, OneTrust, CookieYes, Complianz, Didomi, Quantcast, Termly, Osano) o barre fisse non richieste (`MobileBottomBar`) possono essere montati o inclusi in `app/`, `components/`, `lib/`, `next.config.ts` o nelle variabili Vercel.
  2. **Verifica dominio e asset Pinterest invariati**: restano intatti `<meta name="p:domain_verify">` tramite `NEXT_PUBLIC_PINTEREST_DOMAIN_VERIFY` (zero UI, zero cookie) e le immagini statiche dei Pin in `public/images/pinterest/capodanno-2027/*`.
- **Cancello automatico obbligatorio (`--repo` prima del push, `--live` dopo il deploy)**:
  ```bash
  python -X utf8 C:\Users\minag\.claude\skills\nightlife-milan-publishing\scripts\controlla_zero_barre_cookie_nightlife.py --repo <repo>
  python -X utf8 C:\Users\minag\.claude\skills\nightlife-milan-publishing\scripts\controlla_zero_barre_cookie_nightlife.py --live https://nightlifemilan.com/it https://nightlifemilan.com/en https://nightlifemilan.com/it/cookie-policy https://nightlifemilan.com/it/eventi/eventi-capodanno-milano-2027
  ```

### Resilienza `@vercel/blob` `get()` + Riconciliazione Index-First e Verifica Click Server Actions CRM (Errore pagato — 24 novembre 2026)

- **Errore segnalato dall'utente (24 novembre 2026, `/it/crm`)**: cliccando **Sincronizza Pagamenti** compariva `Impossibile interrogare il gateway pagamenti: Vercel Blob: Failed to fetch blob: 500 Internal Server Error. Verifica la chiave in Analisi & Gateway.`.
- **Causa radice**: in `@vercel/blob`, a differenza di `put`/`list`/`del`, il metodo `get()` usa `undici.fetch` nudo senza retry sui `5xx`; `reconcileEcommerceWithGateway` eseguiva inoltre 62+ `get(..., { useCache: false })` sequenziali anche su `PaymentIntent` non azionabili e su vecchi `order_id` di test cancellati, e il banner di errore incolpava sempre la chiave del gateway.
- **Regola permanente**:
  1. Tutte le letture private Vercel Blob (`lib/single-pass/store.ts`, `lib/crmAuthVault.ts`, `lib/crmStore.ts`) devono passare da `lib/blobPrivateRead.ts` (`readPrivateBlobJson` / `readPrivateBlobText` con 3 tentativi, backoff + jitter sui `500/502/503/504/429`, consumo dello stream dentro il retry, `AbortSignal.timeout(9000)`, `allowCachedFallbackOn5xx = false` fail-closed per default e concorrenza limitata `mapWithConcurrency(..., 8)`).
  2. Le sincronizzazioni gateway nel CRM devono filtrare in memoria gli stati azionabili e usare `listAllOrderSummaries()` + `listExistingOrderIds()` una sola volta (zero `get()` su vecchi ordini cancellati), isolando gli errori per singolo ordine e distinguendo `errorKind: 'auth' | 'storage' | 'gateway'`.
  3. Nelle verifiche Playwright live del CRM, cliccare realmente i pulsanti di Server Action non distruttivi (es. *Sincronizza Pagamenti*) verificando l'URL/banner post-redirect, mai solo la presenza statica del testo nel DOM.

### Official-source special events with WhatsApp table purchase (8 September 2026)

- The user-approved Keinemusik Milan pattern permits a dedicated special-event page backed by the exact official artist announcement and its linked official ticketing listing. Keep this curated-source identity separate from Xceed approval rules; never fabricate an affiliate URL or Eventbrite identity.
- For Keinemusik Milan at DOCK22 on 25 September 2026, ALL admission and table inquiries require contacting the Nightlife Milan concierge exclusively on WhatsApp, +39 351 912 7047. Do not expose DICE links or purchasing directions in public content, CTA, FAQ, source links, or structured data. A WhatsApp inquiry does not confirm availability, admission, or a table reservation. Do not invent prices or inclusions, or claim an exclusive organiser partnership.
- Verify event date, timezone, venue, lineup and age against the source. Unpublished dress code, set times, prices and service arrangements stay explicitly unconfirmed; do not turn missing data into a fabricated rule or repeated customer-facing audit language.
- Publish all 35 enabled locales with complete native copy, 25 useful FAQs, accurate visible/structured facts, official promotional assets with provenance, and clearly labelled historical location context. Preserve original promotional artwork and translate the surrounding HTML, captions and alt text. Never describe historical location images as the event setup.
- Add the event to special events, dated discovery, search and all locale sitemaps. Expire current discovery after the real event end while retaining an informative archive. Preserve static HTML and scoped editorial updates, existing affiliates, CRM and external GA4. Internal Analytics and Eventbrite remain disconnected.
- Require content, image, responsive, schema, CTA and regression checks plus independent review before the scoped prebuilt production release. SEO and AI-search work never justifies a ranking guarantee or invented authority.

- Generate copy and translations locally in the active Claude Code session. Never call Anthropic or another paid text-generation API for writing, rewriting, translating, summarizing, FAQ generation, or SEO metadata.
- Operational APIs remain allowed for source data and submission: Eventbrite, Xceed public pages, Vercel, Search Console, image hosting, and site publishing.
- Create, update, refresh, publish, unpublish, or repair Eventbrite listings only through the approved operational API path. The Eventbrite browser editor is read-only for visual verification and must never be used to save publication changes.
- Never invent prices, artists, schedules, minimum age, dress code, availability, ticket terms, or venue services.
- Preserve the exact Xceed affiliate URL from the current source. A non-affiliate replacement loses commission and is a release blocker.
- Build every owned Xceed event URL as the exact dated event path `https://xceed.me/en/milano/event/{slug}/{id}/channel/nightlifemilan-1`, then inspect the rendered affiliate page. HTTP `200` alone is not proof: Xceed may render `404 - Event Not Found`, and the products visible on the public non-affiliate page may differ from the affiliate channel.
- Link and describe only products visibly available on the exact `nightlifemilan-1` page. When the affiliate page lists tables only, keep that exact referral for table booking and advertise admission separately as payment at the door through WhatsApp, with no invented price and an explicit requirement to confirm price, availability, arrival time and conditions; state that WhatsApp is not a ticket and does not guarantee entry.
- When the exact affiliate page renders `Event Not Found`, suppress the broken Xceed CTA and every Xceed `Offer` in site schema. Use the same truthful pay-at-door WhatsApp path and never silently substitute the working public non-affiliate URL.
- Use the booking number exactly as `+39 351 912 7047`, render it as a real clickable WhatsApp contact wherever HTML is supported, and tell buyers to send their purchase confirmation so booking and payment can be checked. For Eventbrite, verify the anchor in the published DOM, not only in API readback.
- For every Eventbrite listing with a verified Nightlife Milan Xceed affiliate URL, localize both order-confirmation fields to the listing language. State that Eventbrite registration is not an admission ticket, include only the exact Xceed URL with channel `nightlifemilan-1`, and repeat the WhatsApp purchase-confirmation instruction.
- Write native search-oriented copy in each language. Never append an English SEO keyword block to a non-English event.
- Publish only complete language variants. Keep incomplete locales navigable but `noindex`; include only complete locales in hreflang and sitemap.
- The club surface is an approved route-scoped 35-locale release: `/clubs` plus the 19 canonical `/clubs/[slug]` pages must produce exactly 700 sitemap URLs. Every released page requires native metadata, decision copy, visible UI, footer and editorial-request copy; unresolved placeholders and English fallback block release. Emit 35 reciprocal locale alternates plus `x-default`, keep the middleware exception limited to the hub and known venue slugs, and do not change global locale-index flags for unrelated route families. Before deployment audit all 700 runtime responses, metadata bounds, one exact phone/CTA, robots, canonical and hreflang, then visually verify 390x844, 768x1024 and 1440x900.
- Do not publish an image with cropped information, invented branding, unreadable contact text, or random artwork unrelated to the approved poster and venue. **STRICT BAN ON MAGIC ERASER / INPAINTING (`bonifica-locandine-sostituzione-contatti`, user rule 12 Nov 2026: "per le locandine , cancellare stile gomma magica fa schifo e va sostituito questo con sito e numero di tel coi miei contatti di nightlife milan , va bene la cornice sotto con i miei contatti")**: never use `cv2.inpaint` (Telea / Navier-Stokes) or blurry smudge erasing on any event flyer. Flyers with club phone/domain (Group A) must replace that exact contact block in-place using a 100% opaque (`alpha = 255`) 4-corner bilinear gradient editorial plate + OFL typography (`Outfit-Bold`) + `#25D366` WhatsApp badge + `+39 351 912 7047` and `WWW.NIGHTLIFEMILAN.COM` (`0` pixels changed outside ROI); flyers without club phone/domain (Group B) keep `0` pixels changed inside the artwork; all card posters keep the approved `1376x768` `object-contain` Couture Noir bottom contact frame (`<= 300 KB` WebP for WhatsApp `og:image`), verified by `controlla_bonifica_locandine_zero_gomma.py` (`exit 0`).
- Never turn a panoramic venue photo into a square with a centre crop. Recompose or outpaint it to 5:4 while keeping every focal subject intact; a numerically valid ratio with damaged framing is a release failure.
- Dynamic Xceed site events must use four existing, 200-response 5:4 gallery assets derived by AI editing from four distinct real photographs of the exact venue. Store source/result paths and SHA-256 evidence, localize every alt/title from the native locale pack, and fail the build when any referenced `/images/` asset is absent. Adapt the official event poster from an immutable, hash-pinned source master: replace only existing legacy phone/domain glyphs inside a narrow per-poster contact ROI, preserve the original label, font character, size, tracking, color, alignment and position, and place a real small WhatsApp icon immediately before `+39 351 912 7047`. The exact domain is `WWW.NIGHTLIFEMILAN.COM`. Reject generic footer bands, global overlays, redesigns, runtime upstream image generation, duplicate old/new contacts, and any decoded pixel change outside the approved ROI. A poster with no legacy contact field remains byte-identical unless the user separately authorizes adding contacts. Derive 2:1 and 5:4 assets only from the approved static master, without crop or stretch.
- Automatic image optimization is mandatory only for site-delivery media. Preserve approved high-resolution masters separately, generate site derivatives with `npm run images:prepare:site`, and publish only WebP/AVIF assets that pass `npm run images:verify`. Render through `next/image` without `unoptimized`, declare accurate `sizes` and reserved dimensions/aspect ratio, lazy-load below the fold, and give priority only to the actual LCP image.
- **Errore pagato (15 ottobre 2026) — Whitelist `images.qualities` in `next.config.ts` e verifica HTTP 200 di `/_next/image`:** quando `next.config.ts` definisce un array esplicito `images.qualities` (es. `[40, 45, 50, 65, 75, 80, 85, 92, 95]`), qualsiasi componente `<Image quality={N} />` con un valore `N` non incluso nella whitelist produce **HTTP 400 Bad Request** (`"q" parameter (quality) of N is not allowed`) sull'optimizer edge `/_next/image` di Vercel, rompendo l'immagine in produzione pur con il file `.webp` presente in `public/images/`. Prima di ogni build o deploy prebuilt: (1) eseguire `npm run images:verify` (che tramite `assertConfiguredImageQualities()` in `scripts/verify-image-policy.ts` confronta staticamente ogni `quality={...}` in `app/`, `components/` e `lib/` con `images.qualities` di `next.config.ts` e `.vercel/output/config.json`); (2) dopo il deploy, verificare con uno script HTTP reale che il 100% degli URL `src` e `srcSet` generati da `/_next/image` nella pagina live risponda `200 OK` con `content-type: image/*`.
- Every canonical dated-event calendar card must show the event's approved site poster. A clearly separated recurring programme without a dated poster may show only a truthful approved programme or venue reference image and must never present it as an event poster. Render all calendar media with `object-contain`; preserve the complete 1300×700 poster in a reserved 13:7 frame and never crop source photography, poster text, contacts, logos or dates. Keep the entire card as one keyboard-focusable event link, retain visible time, title and venue, use a compact two-column mobile layout, and lazy-load all calendar media.
- Public event recommendation galleries use responsive grids with complete visible cards in normal page flow. Never use a horizontally scrolling row, clipped preview card, hidden navigation arrow, or browser scrollbar to discover more event cards. Verify mobile, tablet, desktop, keyboard navigation and RTL while preserving canonical links and commercial CTAs.
- Never pass an Eventbrite-bound image through the automatic site optimizer or the site image-policy gate. Keep the approved Eventbrite cover/body exports as separate destination assets without recompressing or changing their bytes in the site pipeline; continue to enforce Eventbrite's composition, provenance, visual, responsive-rendering, and supported-format checks separately.
- Every Eventbrite body `<img>` must persist responsive sizing (`display:block;width:100%;max-width:100%;height:auto`). Verify live that rendered width equals container width on mobile and desktop; otherwise Eventbrite crops the native-size image inside its overflow-hidden body.
- For curated Eventbrite bodies, use answer-first copy, contacts immediately after the lead, the approved poster immediately after contacts, and only 1:1 or 5:4 body media whose metadata describes literal visible pixels.
- Outside the approved poster, every Eventbrite body image and every contextualized site venue gallery image must be an edit of a distinct, verifiable real photograph of the exact venue, governed by `contestualizzazione-foto-locali-reali` (user rule, 19 October 2026) and verified with `python -X utf8 C:\Users\minag\.claude\skills\contestualizzazione-foto-locali-reali\scripts\controlla_foto_locale.py` (exit 0). Preserve recognizable architecture, furniture and signage; pre-clean blown-out highlights (`clip_hi <= 2.0%`); enforce two-zone color separation (`mag_low <= 32.0` with warm 3200K light on foreground faces, white tablecloths and gourmet dishes, confining purple/magenta club lighting to upper architectural beams); frame foreground subjects at 35%–65% of frame height at eye level (never add tiny distant figures in wide shots); remove legacy watermarks onto clean neutral surfaces without stamping repeated text on tables; inspect 1:1 crops of faces, hands, food and glassware before delivery. Never generate the venue from scratch or substitute a generic club.
- Site discovery galleries and suggested-event carousels must show only canonical site events backed by an explicitly verified live Eventbrite listing. Keep the user-approved featured order (Guè first, World Cup final second while current), never surface an event from Xceed or static data alone, and never describe an informational Eventbrite registration as admission or a paid ticket.
- Match Eventbrite venues by name and verified address, and personalize plus re-read both order-confirmation fields before declaring a listing complete.
- For API refreshes of curated Eventbrite batches, discover listings organization-wide by exact marker, preserve each verified existing venue ID, and split metadata/summary from the description write. Treat Eventbrite's uppercased HTML serialization as equivalent only in structural comparisons.
- Do not expose secrets in files, commands, logs, commits, or responses.

## Choose the Workflow

### Event

1. Verify date, venue, services, audience, age, schedule, pricing, affiliate link, and source images.
2. Prepare one language as a pilot when the template or visual treatment is new.
3. Create native title, summary, full body, detailed agenda, programme, 25 FAQs, metadata, image labels, and gallery copy.
4. Recompose the real poster for required aspect ratios; preserve its identity and localize visible text for the event language.
5. Publish or update the Eventbrite variant through the approved API submission path, never through the Eventbrite browser editor or a text-generation API, and verify its localized order-confirmation message when an Xceed affiliate link is present.
6. Put the commercial SEO closing and exactly 10 native commercial-intent keyword permutations after all 25 FAQs.
7. Create or update the matching site event using the approved Italian event design as the structural baseline.
8. Verify the pilot live. Only then roll out the remaining complete languages.

### Page or Landing

1. Load `architettura-design-siti-avanzati` (Dark Luxury Cinema + Swiss Editorial Grid + Active Bento 2.0 + Interactive Concierge Engine, verifying the 7 visual richness layers with `controlla_ricchezza_design.py`) and match the existing design system and closest approved page.
2. Answer the target intent in the first viewport.
3. Add current events, truthful venue services, programme, useful FAQ, internal links, WhatsApp conversion path, metadata, and schema where relevant.
4. Avoid duplicate intent. Redirect or consolidate an older equivalent URL.

### Article or Guide

1. Define one primary search intent and supporting questions.
2. Write useful, original, native-language content with verifiable venue and event facts.
3. Link to relevant events, clubs, weekly hub, VIP tables, and concierge without stuffing keywords.
4. Add Article or FAQ schema only when the visible content supports it.

## Metadata Rules

Use the repository helper in `lib/seoMetadata.ts` rather than duplicating truncation logic.

- Title: primary intent first, normally no more than 62 characters.
- Description: normally no more than 158 characters and containing one localized WhatsApp CTA with the full number.
- The metadata CTA must use the native-language equivalent of `Info e prenotazioni: WhatsApp +39 351 912 7047.` Never use `details`, `dettagli`, `current details`, or an information-only CTA in a meta description. Treat the complete CTA and phone as one atomic suffix.
- Bounded club metadata must use complete native music and dress-code atoms keyed to the venue's evidenced profiles. Never word-slice a translated fact and never replace a known profile with a generic `event music` or `current dress code` placeholder merely to fit 158 characters.
- Every club-detail title must retain venue name, a Milan/Milano variant, native category, and a fail-closed native service atom within 62 characters. Shorten only the title-specific service wording; never drop city, category, or booking intent, and never introduce guest-list/table wording without evidence.
- Event title: event name, venue or city, and exact date.
- Event description: venue, city, date, useful differentiator, and WhatsApp CTA.
- Every event meta title and description must match the event page locale. Localize date, city, decision labels, music genres, status wording, and booking CTA; an English fallback on a non-English event is an indexing blocker.
- Club and approved-event descriptions must contain native, visible-parity
  values for age target, music, and dress code. Label the venue age range as an
  editorial audience target, never as a minimum-admission rule. If an event is
  missing any of the three verified values, keep it out of robots index,
  hreflang, sitemap, and `Event` schema. Aggregate pages may say that the values
  vary by dated event; they must not invent a shared policy.
- Treat venue category and commercial services as separate facts with a
  fail-closed service gate. `CLUB` may
  produce the native `Nightclub`/`Discoteca` term, but it never proves a guest
  list, private table, or VIP table. A venue title may add only the strongest
  service in the approved venue evidence; otherwise use native booking intent.
  Guest-list wording requires its own current venue or dated-event proof.
- The `/clubs` hub may target native guest-list and VIP-table queries only when
  the description states that availability and conditions vary by dated event.
  Event titles keep event name, venue/city, and exact date ahead of services;
  event descriptions add list/table terms only from the date-specific approval
  manifest and include those fields in the factual approval hash.
- Eventbrite summary: no more than 140 characters; include the strongest native-language search terms and the WhatsApp number.
- Put the phone in descriptions and conversion copy, not in SEO titles.
- Canonical must be self-referential for the current language.

## MilanoToday Browser Pilot

- Use the signed-in browser form at `https://www.milanotoday.it/form/contacts/eventi/`; do not replace the requested browser workflow with an API or another portal.
- Publish native Italian only. When no named artist is announced, begin the title with the venue and leave the artist field empty rather than inventing a performer.
- When the user requests MilanoToday publication `solo come Eventi`, submit only the Event form and never create or send a parallel Comunicato stampa. Adapt the copy as an event listing, omit email addresses and press-office signatures, and show the exact verified Xceed affiliate URL in full inside the body as well as in the website field.
- When a named artist is announced, use the artist's full public name consistently in the article title, body and artist field. An official abbreviated artist mark may remain unchanged inside the source poster.
- Re-check the current event source before filling the form. Include only verified date, cross-midnight end date, time, venue, services, audience, age, dress code, music, price, table terms, Xceed affiliate URL and WhatsApp purchase-confirmation instruction.
- Keep every upload at or below the portal's conservative 200,000-byte limit. MilanoToday currently accepts JPG, PNG and GIF but silently rejects WebP, so convert verified venue WebP files to compressed JPG before upload. The approved Monday Night pilot uses eight images in this order: 2:1 cover, 5:4 poster, arrival/target/dress code, aperitivo, confirmed dinner service, generic DJ/music, club dancefloor and VIP table service.
- When the user requests venue imagery, include at least two literal photographs of the verified venue in addition to the poster and event-faithful service, audience and music images. Match each photograph to the event venue by verified name and address; never use a generic club or a different venue as a substitute.
- For an authorized official-poster adaptation, preserve its composition, venue and artist logos, type character, palette, hierarchy, photograph and focal crop. Change only the existing information area to replace contact details or add verified essentials such as music, services, age and dress code; show the revised cover and poster to the user before any browser upload.
- When the user narrows an official-poster edit to `contact only`, treat that boundary literally: replace only the specified phone/domain glyphs inside their original information area, preserve every other decoded pixel, and add no footer, panel, music, services, times, dress code, price, translations or other copy. Match the source typography and placement, use a real WhatsApp icon rather than the word `WHATSAPP`, and prove zero changed pixels outside the approved ROI before deriving any resized asset. Pin source/result hashes and serve the approved static result; do not fetch or regenerate the master at request time. Use [examples/contact-only-poster-edit.md](examples/contact-only-poster-edit.md) and its user-approved image as the standing baseline.
- Once the user approves that poster, it is also the mandatory master for the main Eventbrite cover. Never replace it with a newly generated horizontal interpretation or redesign. For a required 2:1 cover, extend only the canvas/background outside the master and keep the entire approved poster centered, uncropped and unchanged; verify the preserved master region before upload, then verify the new Eventbrite `logo_id` and public desktop/mobile rendering.
- Use venue-faithful GPT edits only when they remain consistent with the real poster, venue and verified programme. Review each final JPEG for faces, hands, food, service, clothing, signage, text and framing before upload.
- Upload the complete set in batches of at most five files or individually with bounded retries. MilanoToday can silently drop an otherwise valid image during a multi-file selection. Verify the visible thumbnail count after every batch or file, verify the final count and order, and keep the first image as the cover. The file chooser count is not evidence that the images were accepted.
- Obtain immediate user confirmation before pressing `Invia evento`. After the success landing page, report the listing as submitted and pending editorial approval, never as already published.

## Knowledge Ratchet

When the user approves a correction, layout, image treatment, content limit, API behavior, or publishing sequence:

1. Apply it to the current artifact.
2. Update this skill or the appropriate reference file before declaring completion.
   When the repository contains `.agents/skills/nightlife-milan-publishing`, keep that versioned copy synchronized with the global installed skill.
3. Update the repository rule or reusable code when enforcement belongs in the project.
4. Add or update a test, validator, or audit check when the rule can be automated.
5. Record the approved live example as the new baseline.

Never allow a later batch to regress to an older pattern simply because it is easier or already automated.

## Completion Gate

Do not call any site code or content modification complete until it is deployed to production and all applicable checks in [references/verification.md](references/verification.md) pass on the live URL. A dirty worktree is not a reason to leave an approved change undeployed: create an isolated source state containing the exact scoped patch and deploy only that state. Skip deployment only when the user explicitly requests local-only work or no deploy. For a new pattern, show the pilot before batch publication. Do not use Google's Indexing API for ordinary pages. Keep the protected daily sitemap submitter active: at 18:00 UTC it must validate the complete live sitemap and submit it once per Milan calendar day to the existing Search Console property, even when the URL set is unchanged.

## Vercel cost controls approved on 2026-09-05

- For Vercel projects in the approved account, keep automatic Git-triggered deployments disabled unless the user explicitly requests continuous deployment again. Group related changes and publish only verified, scoped releases.
- Prefer a local prebuilt artifact compatible with the target runtime. For Node projects with native dependencies, build on Linux with the project's supported Node major; never deploy Windows native binaries to Linux functions.
- Preserve required business schedules, tracking, security and data freshness. Remove demonstrably unnecessary regeneration/calls; do not disable functional jobs, downgrade a commercial plan, delete projects or move hosting merely to report a saving.
- For Nightlife Milan, public HTML has no timed ISR or date-rollover cron. Browser date views use verified dated source inventory. Registered text/metadata writes use the protected editorial document layer and scoped invalidation; Analytics/CRM actions never purge the public layout.
- Before a prebuilt Nightlife Milan release, verify the exact production source baseline, the scoped patch, a consistent editorial snapshot, the Linux artifact, and the exact staged deployment. Do not promote an unverified bootstrap snapshot. Follow `docs/cost-efficient-publishing.md`.


## User-curated special events and Keinemusik contact routing (2026-09-09)

- Maintain one explicit user-curated canonical event registry and reuse it on the homepage, calendar, special-event index, and below every event detail, including recurring events. Show verified future occurrences in date order, hide expired occurrences, deduplicate cards, and exclude the current event from its own suggestions. Do not promote every event marked special automatically.
- The current requested selection is Sven Vath, Keinemusik, Bob Sinclar, Paloma, and Franky Rizardo. Match verified canonical occurrences; never invent dates or duplicate artist cards. Preserve each other event's exact verified Xceed affiliate URL.
- For Keinemusik Milan on 25 September 2026, ALL admission and table inquiries must go through WhatsApp at https://wa.me/393519127047, displayed as +39 351 912 7047. Do not expose DICE links or purchasing directions in public copy, CTA, FAQ, source links, or structured data. Historical source provenance may remain private. A message does not confirm admission, table reservation, price, or availability.
- Apply this route naturally in all 35 languages while retaining the verified facts, 25 distinct FAQ, complete programme, and approved images. Validate the actual admission and table hrefs, public rendered text, source links, schema, responsive cards, temporal expiry, and current-event exclusion before release.

## Claude Code editorial menus and page sections (2026-09-25)

After the renderer is verified on production, Claude Code may update registered `shared` menu fields and route-specific `sectionsAfter` documents through the protected editorial API with an expected revision. Use native copy for each affected locale, allowlisted internal route IDs, and the exact page path; verify the saved document and rendered route after scoped invalidation. Preserve the protected WhatsApp/privacy links, commercial destinations, event facts, and existing template hierarchy. Composition and style choices already supported by the installed template use its protected configuration without a code release. A component type or rendering capability absent from the installed renderer requires the smallest verified scoped code release. Follow `docs/cost-efficient-publishing.md` for the command and schema.

## Direct concierge booking actions (10 September 2026)

- WhatsApp contact and table-reservation buttons open the dedicated concierge directly at `https://wa.me/393519127047`, with a nonempty native-language reservation request in the `text` parameter. Include the real event, venue and date when known; never invent guest counts or personal details.
- Do not put a required name/email form, a modal, an information page or a booking-section scroll between a reservation button and WhatsApp. A request is not a confirmed reservation.
- Use the shared `getConciergeBookingUrl` helper for generic and contextual booking actions. Preserve already approved complete native messages, including Keinemusik.
- This user instruction supersedes affiliate routing for table-reservation buttons. Preserve exact verified Xceed admission/ticket links and truthful product information. Informational navigation to VIP Tables and genuine WhatsApp sharing remain separate actions.
- Verify the rendered button destination and decoded request, keyboard/click reachability, and event-expiry behavior on mobile, tablet and desktop before publication.
## Persistent public booking and curated gallery pattern (approved 2026-09-11)

Every public page and event page must expose the shared, localized `Prenota su WhatsApp` CTA immediately on mobile and desktop; never exclude event detail pages. Use the direct `wa.me/393519127047` native inquiry route, preserve eligible event context and the expired generic fallback, hide only private areas and overlays, and avoid duplicate bars. Reuse the approved compact `CuratedSpecialEvents` 260/280 snap gallery with full posters; do not use a fixed 36rem track, native scrollbar, or audit-status label. Keep the detail page and WhatsApp buttons separate, preserve eligible affiliate admission links, and verify with `persistentBooking`, `backToTop`, and `curatedGalleryVariant` tests.


## Requisito minimo SEO obbligatorio a 21 punti senza social (regola utente, 14 ottobre 2026)

Ogni pagina, evento, locale, hub, guida, news o articolo geolocalizzato di `nightlifemilan.com` deve rispettare il requisito minimo SEO a 21 punti definito dall'utente il 14 ottobre 2026 (esclusa la parte social/YouTube/Quora, «senza i social»):

1. **1 `<h1>` unico per pagina**, descrittivo e nella lingua della pagina.
2. **Almeno 2 `<h3>` per pagina** con gerarchia semantica `<h1>` → `<h2>` → `<h3>`.
3. **Indice cliccabile (TOC)** con l'elenco degli `<h3>` che puntano alle rispettive ancore `#id` nel corpo della pagina.
4. **Meta Title (`<title>`)** ottimizzato in lingua (≤ 62 caratteri quando previsto dal contratto metadata).
5. **Meta Description (`<meta name="description">`)** ottimizzata in lingua con CTA WhatsApp `+39 351 912 7047` atomica (≤ 158 caratteri).
6. **Almeno 1.500 parole reali e utili su ogni pagina standard** e **almeno 2.000 parole su ogni guida o news**, scritte da madrelingua (con verifiche `stop-slop` e `umanizzatore-lingue`) e basate su fatti reali verificati (questa regola dell'utente prevale sulle note precedenti che escludevano un minimo di parole).
7. **Almeno 5 immagini per pagina** (`next/image`, dimensioni riservate, `fetchPriority="high"` sull'immagine LCP).
8. **Allineamento semantico immagini**: `nome-file-immagine` = `titolo H della sezione` = `alt text` nella lingua della pagina.
9. **Dati strutturati `Schema.org` JSON-LD su ogni pagina** (`Organization`, `NightClub`/`LocalBusiness`, `Event`/`MusicEvent`, `Service`, `Article`, `FAQPage`, `BreadcrumbList`, `ImageObject`, `WebPage` aderenti ai fatti visibili).
10. **Slug localizzato nella lingua della pagina e allineato all'`<h1>`** (con redirect `308` dagli slug storici e collegamento completo delle 35 varianti).
11. **Connessione tra le 35 lingue sul menu a tendina (`LanguageSwitcher`)** e tag `hreflang` reciproci + `x-default` verso l'esatta variante tradotta della stessa pagina (mai fallback alla home se la pagina esiste nella lingua scelta).
12. **`sitemap.xml` aggiornata** con tutte le rotte canoniche indicizzabili delle 35 lingue.
13. **Notifica `IndexNow` ad ogni pubblicazione/aggiornamento** + invio a **Google, Bing, Yandex, Yahoo** e a tutti i motori di ricerca con endpoint di submit/ping (`api.indexnow.org`, `www.bing.com/indexnow`, `yandex.com/indexnow`, `searchadvisor.naver.com/indexnow`, `search.seznam.cz/indexnow`, più Search Console sitemap submit).
14. **Google Maps integrata su ogni pagina** (mappa del locale/evento o mappa generale dei locali e quartieri di Milano nel corpo/footer).
15. **Footer collegato e combaciante con Google My Business (GMB)** (nome attività, indirizzo/coordinate di Milano, telefono/WhatsApp `+39 351 912 7047`, email `concierge@nightlifemilan.com` e dati `Organization`/`LocalBusiness` coerenti).
16. **Zone di competenza, città/comuni/province/quartieri serviti e servizi nel Footer** (quartieri di Milano: Brera, Corso Como, Porta Nuova, Isola, Sempione, Navigli, Garibaldi, Tortona, Porta Romana, CityLife, San Siro, Bicocca, Lambrate, Idroscalo; comuni e città/province limitrofe della Lombardia: Monza, Bergamo, Como, Brescia, Varese, Pavia, Lodi, Lecco, Cremona, Mantova, Sondrio, Rho Fiera, Assago, Segrate, Sesto San Giovanni, San Donato Milanese, Rozzano, Cinisello Balsamo, Cologno Monzese, Corsico; servizi: Tavoli VIP, Liste Nominative, Bottle Service, Concierge WhatsApp, Calendario Eventi, Guida Discoteche).
17. **Contatti visibili e cliccabili** in ogni pagina e nel footer (`+39 351 912 7047` su WhatsApp, email, CTA persistenti).
18. **Articoli, eventi e pagine correlate in fondo alla pagina con struttura ad albero (silo)**: collegamento gerarchico Hub Madre ↔ Pagina Corrente ↔ Pagine Sorelle (stessa zona/genere/data) ↔ Guide/Eventi Figli.
19. **Google Search Console e Google Analytics (GA4) installati e connessi a vicenda**.
20. **Guide e news giornaliere da almeno 2.000 parole** + **articoli geolocalizzati** dedicati a quartieri di Milano, comuni dell'hinterland, città vicine, province lombarde e regione Lombardia.
21. **Link interni contestuali con anchor text descrittivo per le parole chiave di riferimento** all'interno del testo di pagine, eventi e articoli (mai anchor generici «clicca qui»).

Riferimento memoria condivisa: `K-20261014-seo-requisito-minimo-obbligatorio.md` e skill obbligatoria `seo-21-punti-multilingua` (`python -X utf8 C:\Users\minag\.claude\skills\seo-21-punti-multilingua\scripts\controlla_seo_21_punti.py --preset sito-completo`, esito 0 prima e dopo ogni rilascio).

## Immagine della Hero in tutte le Social Card (regola utente, 21 ottobre 2026)

Ordine dell'utente (21 ottobre 2026): «deve esserci l'immagine della hero in tutte le social card quando viene inoltrato un link».

1. **Corrispondenza esatta Social Card ↔ Hero (`og:image == twitter:image == 1st body img`)**: in tutte le pagine di `nightlifemilan.com` (Home, Hub Club, Scheda Club, Hub Eventi, Tonight, This Week, Special, Best, International, University/Erasmus, 18+, 21+, October 2026, Capodanno 2027 Hub e 16 Categorie, Scheda Evento Capodanno, Halloween 2026 Hub, Scheda Evento, VIP Tables, Guest Lists, Bottle Prices, Aperitivo, Concierge, Hub Zone, Scheda Zona, Scheda Genere, Hub Guide, Scheda Guida, Milan Fashion Week), l'immagine dichiarata in `<meta property="og:image">` e `<meta name="twitter:image">` (`twitter:card = summary_large_image`) deve essere **esattamente la stessa immagine mostrata nella Hero** della pagina (`1st body img`).
2. **URL assoluto, `HTTP 200` e peso `<= 300 KB`**: l'URL di `og:image` e `twitter:image` deve essere sempre assoluto (`https://nightlifemilan.com/images/...`), rispondere `HTTP 200` (zero `404`) e pesare **`<= 300 KB`** in formato `.webp` ottimizzato, così che WhatsApp, Telegram, Instagram, iMessage, Facebook, LinkedIn e X mostrino sempre l'anteprima visiva immediata quando viene inoltrato un link.
3. **Cancello automatico**: verificato automaticamente al punto 12 di `python -X utf8 C:\Users\minag\.claude\skills\seo-21-punti-multilingua\scripts\controlla_seo_21_punti.py --preset sito-completo` (`esito 0` obbligatorio).

## Sincronizzazione completa Xceed, Locandine Bonificate, Card con Locandina e CTA in Lingua (regola utente, 24–25 ottobre 2026)

Ordine dell'utente (24–25 ottobre 2026):
1. **Sincronizzazione integrale Xceed (`nightlifemilan-1`)**: ricontrollare tutti gli eventi sui canali Xceed collegati (`just-me-milano`, `pineta-milano`, `aria-club-milano`), aggiornare quelli esistenti e inserire tutti i nuovi eventi disponibili fino a dicembre 2026 (`lib/october-events/inventory.json` e `lib/october-events/routeSlugs.json`, `>= 315` eventi totali), aggiornando i bundle compilati (`.next/server/chunks/9713.js`, `.next/server/middleware.js`, `.vercel/output/functions/middleware.func/index.js`) e prerenderizzando tutte le 35 lingue.
2. **Locandine sempre bonificate coi contatti ufficiali (`WWW.NIGHTLIFEMILAN.COM` + `[icona WhatsApp] +39 351 912 7047`)**: ogni locandina evento (`public/images/events/october-2026/*.webp` e `public/images/halloween/2026/**/*.webp`) deve rimuovere numeri di telefono e siti dei singoli locali e mostrare la barra inferiore con `WWW.NIGHTLIFEMILAN.COM` a sinistra e l'icona WhatsApp verde + `+39 351 912 7047` a destra, sincronizzata in `.vercel/output/static/images` e `.next/standalone/public/images`.
3. **Locandine intere (`object-contain`) nelle card Halloween e Capodanno di `/[locale]/events` e `/[locale]`**: tutte le 6 card prioritarie Halloween (`hal-p1..p6`) e le 6 card prioritarie Capodanno (`cap-p1..p6`) in `HomeHalloweenAndCapodannoSections` devono mostrare la locandina intera (`<img>` con `object-contain`), il badge scarsità localizzato e il bottone CTA localizzato che punta alla scheda evento canonica.
4. **Zero bottoni in inglese sulle rotte non inglesi**: né le card del calendario (`DateSensitiveCalendar`), né le sezioni Halloween/Capodanno, né gli hub `/[locale]/events/october-2026` e `/[locale]/events/<halloweenHubSlug>` possono mostrare fallback inglesi (`Open Event Guide & Prices →`, `Official Tickets & Tables ↗`) sulle 34 lingue non inglesi; ogni card usa un unico bottone localizzato (`openEventCardCta` / `openEventCtaLabel`) verso la scheda evento e il badge scarsità deterministico nella lingua della pagina.
5. **Bottone WhatsApp fluttuante in basso a destra con fumetto in lingua**: presente su tutte le pagine pubbliche (`bottom:14px;right:14px`) con icona WhatsApp `56x56px` e nuvoletta con codino che invita a scrivere su WhatsApp nella lingua della pagina.
6. **Cancello automatico obbligatorio (`esito 0`)**:
   ```bash
   python -X utf8 C:\Users\minag\.claude\skills\nightlife-milan-publishing\scripts\controlla_locandine_calendario_lingua_nightlife.py
   ```





## Dopo-Partita Calcio San Siro (Inter & AC Milan: Serie A, Champions League, Derby della Madonnina, Coppa Italia) e Post-Concerto San Siro ? Standard Obbligatorio (30 ottobre 2026)

Ordine fisso dell'utente (30 ottobre 2026): **?devi farmi anche tutti i dopo partite di calcio che ci sono a milano e mettere in procedura anche questo?**.

Ogni espansione, calendario, hub o aggiornamento di `nightlifemilan.com` deve presidiare in modo permanente e completo tutti i **Dopo-Partita di Calcio dello Stadio Giuseppe Meazza (San Siro)** per le gare casalinghe di **FC Internazionale Milano (Inter)** e **AC Milan** (**Serie A**, **UEFA Champions League**, **Derby della Madonnina**, **Coppa Italia**, pi? gli **Afterparty Post-Concerto San Siro & Ippodromo Snai**):

1. **Hub Dedicato, Guida Pillar ed Eventi Post-Match**:
   - Hub verticale `app/[locale]/football-afterparties/page.tsx` (`/football-afterparties`) collegato in `Header.tsx`, `Footer.tsx` e `app/sitemap.ts` (35 lingue), dotato di `Schema.org` JSON-LD (`SportsEvent`, `FAQPage`), TOC cliccabile, Google Maps e contatto ufficiale `+39 351 912 7047` + `concierge@nightlifemilan.com`.
   - Modulo interattivo **`SanSiroMatchAfterpartyFinder`** in `components/NightlifeExpansionModules.tsx` per filtrare il post-partita in base a squadra/competizione, orario del fischio finale e formula (Royal Aperitivo, Dinner Show, Tavolo VIP Priv?).
   - Guida Pillar **`g-san-siro-football-afterparties`** (`san-siro-football-match-afterparties-inter-ac-milan` / `dopo-partita-san-siro-milano-inter-milan-discoteche`) ed eventi post-partita dedicati in `lib/data.ts`.
2. **Gerarchia Obbligatoria dei 6 Club Prioritari Post-Partita**:
   - **#1 Aria Club Milano (Piazzale Lorenzo Lotto 15 ? a 150 metri dallo Stadio San Siro / M1-M5 Lotto)**: il quartier generale post-match raggiungibile a piedi in 2 minuti dal Meazza senza code di traffico n? attese taxi, ideale subito dopo il triplice fischio delle 22:45/23:00.
   - **#2 Just Me Milano (Viale Luigi Camoens 2 ? Parco Sempione / Torre Branca, aperto 7/7)**: punto di riferimento internazionale per tifosi VIP, ospiti corporate, calciatori e delegazioni estere anche nei turni infrasettimanali di Champions League e Coppa Italia.
   - **#3 Voya Rooftop Milan (Via Achille Papa 30 ? 20? piano, fermata M5 Portello a 3 fermate da San Siro Stadio)**: sky lounge panoramico con vista diretta sullo skyline e sullo Stadio illuminato, perfetto per Royal Aperitivo post-gara delle 15:00/18:00 o cocktail d'?lite post-match.
   - **#4 55 Milano (Via Piero della Francesca 55 ? Sempione / Bullona)**: location iconica da 1.600 mq per maxi-tavolate Royal Aperitivo e Terzo Tempo con gruppi numerosi.
   - **#5 Pineta Club Milano (Via Messina 38 ? Monumentale / Chinatown, M5 Monumentale diretta da San Siro)**: luxury club per il proseguimento notturno di lusso dei big match del venerd?, sabato e domenica.
   - **#6 Repvblic Milano (Piazza della Repubblica)**: indirizzo fashion boutique per clientela internazionale e hospitality aziendale.
3. **Le 3 Fasce Orarie Ufficiali dal Fischio Finale al Club**:
   - **Partite Pomeridiane (`15:00` e `18:00`) -> `19:30?22:30 Royal Aperitivo & Dinner Show`**: uscita dallo stadio e trasferimento immediato verso **Voya Rooftop (M5 Portello)**, **55 Milano**, **Just Me** o **Aria Club** per buffet imperiale, tavolo d'appoggio e proseguimento serale.
   - **Posticipi Serali (`20:45`, Serie A & Derby della Madonnina) -> `23:00?05:00 Terzo Tempo Club & VIP Bottle Service`**: al fischio finale delle `22:40`, ingresso diretto in lista o **Tavolo VIP salta-fila** ad **Aria Club (a 150m)** o trasferimento in 8?12 minuti con M5 verso **Voya Rooftop**, **Pineta** e **Just Me**.
   - **Notti Europee Infrasettimanali (`21:00` Marted? & Mercoled? UEFA Champions League / Coppa Italia) -> `23:15?04:30 Midweek VIP Afterparty`**: presidio garantito su **Just Me Milano (aperto 7/7)**, **Aria Club** e **Voya Rooftop** per tifoserie ospiti, sponsor e corporate box.
4. **Protocollo Dress Code Stadio -> Discoteca (Regola Anti-Rimbalzo alla Porta)**:
   - Nei club di fascia luxury di Milano **non sono ammesse maglie da gara, sciarpe da curva, cappellini sportivi, tute o borselli tecnici** al controllo selezione.
   - Indicazione operativa obbligatoria in pagina: indossare **smart casual / camicia o polo scura** sotto la giacca per passare direttamente dalla Tribuna/Hospitality di San Siro al Priv? del club senza dover tornare in hotel, oppure usufruire del guardaroba custodito prenotando un **Tavolo VIP tramite Concierge WhatsApp `+39 351 912 7047`**.
5. **Esclusioni Rank Intel (Cosa NON fare)**:
   - Vietato creare pagine su classifiche di Serie A (`ac milan fc table`, `serie a standings`), vendita biglietti stadio o tessere del tifoso (`milan club membership card`), streaming partite (`san siro in diretta`) o settori/parcheggi stadio privi di intento nightlife: il focus ? esclusivamente **Hospitality Notturna, Terzo Tempo, Aperitivo Post-Gara, Discoteche e Tavoli VIP dopo la partita**.
6. **Cancello automatico Poka-Yoke obbligatorio (`esito 0`)**:
   ```bash
   python -X utf8 C:\Users\minag\.claude\skills\nightlife-milan-publishing\scripts\controlla_dopo_partita_calcio_milano.py
   ```

## Cancello Obbligatorio di Verifica e Auto-Riparazione del Deployment Vercel (regola utente, 7 novembre 2026)

Ordine fisso dell'utente (7 novembre 2026): **«il deployment stamattina è fallito ... controlla la mail ed impostalo come cancello di verifica obbligatorio , con se no fix»**.

### Errore pagato (7 novembre 2026)
La mattina del 7 novembre 2026 (`09:12 CET` / `08:08–08:09 UTC`), due deployment consecutivi di produzione su `nightllfe-milan-main` (`dpl_69zPL6gf7wgC6Uuanr6pNT71fbqm` su commit `44d7006` e `dpl_DZ9kt4JfTVMe8LancNNG18iSwP7o` su commit `ef43387`) sono falliti generati da un push di codemod multilingua che aveva inserito due volte `import type { LocaleCode }` in `./lib/verticalsHubData.ts:2:15` (`Type error: Duplicate identifier 'LocaleCode'`), facendo partire due mail di alert da `notifications@vercel.com` (`Production deployment failed for nightllfe-milan-main`). Il secondo commit (`ef43387`) aveva corretto solo `lib/guides100Catalog.ts` dimenticando `lib/verticalsHubData.ts`, perché mancava un cancello automatico pre-push/post-push con auto-riparazione su tutto l'albero TypeScript.

### Regola Operativa e Cancello con Auto-Fix (`--fix` attivo di default)
Prima di ogni `git push` e dopo ogni push o deploy su `nightlifemilan.com` (inclusi i task schedulati `nightlife-multilingua-avanza` e `nightlife-eventi-caroselli-giornalieri`), è **OBBLIGATORIO** eseguire `controlla_deployment_vercel.py`:

1. **Pre-push sull'albero locale (`--pre-push <repo_dir>`)**: scansiona `app/`, `components/` e `lib/` e rimuove automaticamente eventuali import TypeScript duplicati dello stesso simbolo prima del commit/push.
2. **Verifica API Vercel + Rinnovo Token OAuth Automatico (Cross-Platform TIMEMACHINE + Worker)**:
   - Su `TIMEMACHINE` (con WSL disponibile): interroga via WSL Node l'API Vercel (`/v6/deployments`, `/v4/aliases`, `/v2/deployments/{id}/events` per `prj_AEeUOhzdaIOVYVn7i2wtEAAAEMos`, team `team_tzUIj3lzjJiqkBDMIUrnpFkn`), rinnovando automaticamente il token CLI in `/home/minagigi/.local/share/com.vercel.cli/auth.json` se scaduto.
   - Sul PC Worker (`LAPTOP-L6A4PH4G`, senza WSL) o con `--via-gh-api`: usa il motore nativo Windows tramite GitHub CLI (`gh api repos/minagigi/nightlife-milan/commits/...` o fallback REST autenticato via `git credential fill`), controllando che `origin/main HEAD` abbia stato `Vercel` `READY` (bloccando falsi verdi da `MISSING_STATUS` o commit vecchi) e verificando `HTTP 200` sugli alias live.
3. **4 Criteri Obbligatori di Esito `0`**:
   - L'ultimo deployment di produzione su `main` deve essere in stato `READY` (se è `BUILDING`/`QUEUED`, attende fino al completamento).
   - Eventuali deployment `ERROR` nelle ultime 24 ore (corrispondenti alle mail `Production deployment failed for nightllfe-milan-main`) devono essere tutti superati da un deployment `READY` più recente.
   - Entrambi gli alias `nightlifemilan.com` e `www.nightlifemilan.com` devono puntare esattamente all'`uid` dell'ultimo deployment `READY`.
   - Le rotte live principali (`/`, `/it`, `/en`, `/de`, `/fr`, `/es`, `/events`, `/clubs`, `/capodanno`) devono rispondere `HTTP 200` con `<h1>` e contatto WhatsApp `+39 351 912 7047`.
4. **Auto-Riparazione («con se no fix», attiva di default con `--fix`)**:
   - Se l'ultimo deployment è `ERROR` o `CANCELED`, ispeziona i log di build Vercel, crea un worktree temporaneo pulito su `origin/main`, ripara automaticamente gli import duplicati TypeScript in tutto il repo, committa, pusha su `origin/main` e attende il nuovo deployment `READY`.
   - Se gli alias `nightlifemilan.com` / `www.nightlifemilan.com` sono disallineati rispetto all'ultimo deployment `READY`, li promuove immediatamente tramite `POST /v2/deployments/{id}/aliases` e riverifica fino a `esito 0`.

```bash
python -X utf8 C:\Users\minag\.claude\skills\nightlife-milan-publishing\scripts\controlla_deployment_vercel.py --fix
```

## Obbligo Immagini `4:5` (`1080×1350`) in Tutte le Sezioni Card delle Pagine Evento Singole (Errore pagato — 27 novembre 2026)

- **Lamentela dell'utente (27 novembre 2026, `/it/eventi/cena-spettacolo-partenopea-pineta-napoli-justme-milano-27-novembre`)**: *«nella pagina eventi singoli questa sezione non è fatta correttamente mancano le immagini . correggi questa e tutte le pagine evento che hanno questo errore»*.
- **Causa radice**: nelle griglie di card correlate / cross-link di `PartenopeaJustMeDetailView`, `ThanksgivingJustMeDetailView` e `JustSingingJustMeDetailView` solo la 1ª card (*Scheda Locale*) renderizzava `<Image>` `4:5`, mentre le card evento adiacenti erano prive di `<Image>` e si stiravano verticalmente lasciando scatole nere vuote; analogamente `OrthodoxNyeJustMeDetailView`, `ChristmasVoyaDetailView`, `CapodannoDetailView` (`#eventi-correlati`, `data-venue-authority-backlink`, `data-related-holiday-banner`), `MoreVenueEvents`, `EventMoneyPillarsStrip`, `PrioritySixShowcase` (`NightlifeExpansionModules`), `EditorialPageSections` (Case `/events`) e `BergamoBresciaEventDetailView` mostravano card di navigazione prive di immagine.
- **Regola permanente**:
  1. In **tutte** le pagine evento singole di `nightlifemilan.com` (35 lingue), ogni card dentro griglie correlate, cross-link locale/festività, altri eventi dello stesso locale, pilastri e selezioni club deve mostrare un'immagine **`4:5` (`1080×1350`, `<= 300 KB` WebP)** con `<Image fill quality={92} />` (o dimensioni `4:5` esplicite) e `data-no-lightbox="true"` sul contenitore di sezione.
  2. Le card che puntano alla **Scheda Locale** usano una fotografia reale `4:5` del locale; le card che puntano a un **Evento** usano esclusivamente la **vera locandina grafica `4:5`** approvata dell'evento (`toCardPoster4x5(...)` / `cards-4x5/...`, Gate 5 `locandine-copertine-pieno-formato`).
- **Cancello automatico obbligatorio (`--repo` prima del push, `--live` dopo il deploy)**:
  ```bash
  python -X utf8 C:\Users\minag\.claude\skills\nightlife-milan-publishing\scripts\controlla_card_sezioni_eventi_singoli.py --repo <repo>
  python -X utf8 C:\Users\minag\.claude\skills\nightlife-milan-publishing\scripts\controlla_card_sezioni_eventi_singoli.py --live https://nightlifemilan.com
  ```

## Checklist obbligatoria prima della consegna

- [ ] **Cancello Immagini `4:5` Sezioni Card Pagine Evento Singole (`controlla_card_sezioni_eventi_singoli.py --repo` e `--live` esito 0)**: zero card prive di immagine `4:5` (`1080×1350`) nelle griglie correlate/cross-link di tutte le schede evento singole (`Partenopea`, `Thanksgiving`, `Just Singing`, `Orthodox NYE`, `Christmas Voya`, `Capodanno #eventi-correlati`, `MoreVenueEvents`, `EventMoneyPillarsStrip`, `PrioritySixShowcase`, `EditorialPageSections`, `BergamoBresciaEventDetailView`), con `data-no-lightbox="true"` e `HTTP 200 image/*` in produzione.

- [ ] **Cancello Deployment Vercel + Auto-Fix (`controlla_deployment_vercel.py --fix` esito 0)**: ultimo deployment di produzione `READY`, zero build `ERROR` non recuperati nelle ultime 24h, alias `nightlifemilan.com` e `www.nightlifemilan.com` allineati all'ultimo `READY` e rotte live `HTTP 200`.
- [ ] **Cancello Pagamenti Locali Partner (`controlla_pagamenti_venue_nightlife.py --repo` e `--live` esito 0)**: zero checkout interno e zero `+20%` sulle pagine evento di `Just Me Milano`, `JustMe Garda Lake`, `Pineta Milano`, `Aria Club Milano` (solo Xceed `nightlifemilan-1` o WhatsApp) e `Voya Rooftop`, `55 Milano` (solo WhatsApp), `/single-pass` invariato.
- [ ] **Cancello Zero Bottoni «Chiama» (`tel:`) e Contrasto Bottoni (`controlla_zero_chiama_e_contrasto_bottoni.py --repo --live` esito 0)**: zero `href="tel:..."` / `Chiama` ovunque in UI (`app/`, `components/` e pagine live) e zero bottoni/link invisibili o sotto soglia WCAG (`>= 4,5:1` normale, `>= 3,0:1` large; testo `#050505` su `#25D366`).
- [ ] **Cancello Zero Barre Cookie Pinterest / Consenso (`controlla_zero_barre_cookie_nightlife.py --repo --live` esito 0)**: zero banner/barre cookie (`PinterestTag`, `MarketingConsentManager`, `s.pinimg.com`, `ct.pinterest.com`, CMP terzi, `MobileBottomBar` non richiesta) su repo, Vercel e pagine live desktop/mobile; `<meta name="p:domain_verify">` e immagini statiche Pin intatti.
- [ ] **Cancello Checkout UX & Design Parity S17 (`checkout-ux-chiarezza-validazione`, `controlla_checkout_ux_e_design_nightlife.py --repo --live` esito 0)**: `Big Shoulders` + `Figtree` (`latin-ext`), `#0A0A0C` / `#EDEBE6` / `#FFFFFF` / `#D9381E`, Mega-Dropdown `#FFFFFF` (`border-[#0A0A0C]`, `data-no-lightbox="true"`), 6-box riepilogo e tabella formule zebra su dettaglio Capodanno, `<form noValidate>` in checkout/account, badge `Obbligatorio *` / `Facoltativo`, allegie sempre facoltative (zero `DIETARY_NOTES_REQUIRED`), Error Summary `role="alert"` cliccabile con focus + `#B91C1C` inline, nessuno stub `'+39 '`, opt-in account, verifica visiva `1440px` e `390px`.
- [ ] Tutte le 35 lingue verificate (`controlla_seo_21_punti.py --preset sito-completo` esito 0 e `controlla_copy_storytelling_cro.py` esito 0).
- [ ] Tutte le locandine evento bonificate con `WWW.NIGHTLIFEMILAN.COM` + `[icona WhatsApp] +39 351 912 7047`, 315+ eventi Xceed sincronizzati, card Halloween/Capodanno con locandina e CTA in lingua (`controlla_locandine_calendario_lingua_nightlife.py` esito 0).
- [ ] In tutte le schede del Capodanno di ogni locale, ogni evento di Capodanno e ogni evento datato sono presenti la locandina ufficiale bonificata (`object-contain`) + almeno 4 immagini create ad hoc con Google Flow che mostrano l'evento/locale reale + persone del target + outfit dell'evento tutto combinato, combinando in tutte le 35 lingue titolo dell'immagine (`title`), `alt` text, descrizione (`figcaption` + `ImageObject`) e nome file `.webp` (`src`) in base agli `H1`, `H2`, `H3` dell'evento, insieme a slug e bottoni in tutte le 35 lingue (`controlla_immagini_seo_eventi_multilingua.py` esito 0, skill `immagini-seo-flow-eventi-multilingua`).
- [ ] Contatto ufficiale `+39 351 912 7047` (`wa.me/393519127047`) e bottone fluttuante WhatsApp in basso a destra con fumetto in lingua attivi su tutte le pagine pubbliche.
- [ ] Storico dettagliato delle regole di settembre–ottobre 2026 in `references/storico-regole-2026.md`.
