# 03 — PROMPT IMMAGINI — "Maison Champagne" (Direzione C)

> Usa questi prompt ESATTI con `images_generate` (mode `imagen-nano-banana-2`, resolution `2k`).
> Ogni prompt finale = `{CORE della voce}` + `, ` + `{STYLE SUFFIX §0}`.
> Salva con `scripts/save-image.mjs` nel path indicato, poi `node scripts/optimize-images.mjs`.

---

## §0 — STYLE SUFFIX (COSTANTE — incollalo in fondo a OGNI prompt)
```
editorial fashion-house photography, warm charcoal and ivory color palette, soft champagne-gold accents, marble and brushed-brass textures, soft directional warm light, shallow depth of field, fine film grain, refined and restrained luxury, members-club mood, medium-format quality, no text, no watermark, no logos, no readable signage, faces out of focus or elegant silhouettes only
```

## §1 — REGOLE GLOBALI
- MAI testo/logo/insegne leggibili nell'immagine.
- Persone solo come silhouette eleganti o sfocate (no volti riconoscibili).
- Niente colori freddi dominanti, niente neon, niente HDR esagerato. Tono caldo, sobrio.
- Coerenza: ogni foto deve sembrare scattata dallo stesso fotografo nello stesso servizio.

## §2 — ASPECT RATIO & PATH (cheat sheet)
| Categoria | aspectRatio | Path di salvataggio (senza estensione) |
|---|---|---|
| Hero featured (4) | `16:9` | `public/images/{venueFile}` |
| Card locale (14 non-featured) | `3:4` | `public/images/{venueFile}` |
| Interno gallery (126) | `4:3` | `public/images/venues/{venueDir}/{venueDir}-interior-0X` |
| Hero di pagina (8) | `16:9` | `public/images/{nome indicato}` |
| Copertina evento | `3:4` | (vedi §7) |
| OG/social | `16:9` | `public/images/og-{nome}` |

> `{venueFile}` = nome file in §4. `{venueDir}` = cartella in §5.

---

## §3 — PILOTA (genera SOLO queste 4, poi STOP e chiedi conferma)

**P1 — Hero Just Me Milano** · 16:9 · `public/images/just-me-milano`
```
Interior of an exclusive Milan nightclub set beneath the illuminated steel pillars of Torre Branca tower, towering brushed-steel columns, low amber lighting, sleek dark marble floor, a few elegant silhouettes with champagne flutes, sophisticated fashion-week atmosphere
```
+ STYLE SUFFIX.

**P2 — Card Gattopardo** · 3:4 · `public/images/gattopardo-milano`
```
A deconsecrated gothic church transformed into Milan's most elegant nightclub, soaring stone arches and vaulted ceiling, warm candle-like uplighting on the columns, intimate bottle-service tables with ivory linens, mysterious refined ambience
```
+ STYLE SUFFIX.

**P3 — Interno Voya Rooftop** · 4:3 · `public/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-01`
```
A 20th-floor rooftop cocktail lounge in Milan at dusk, panoramic city skyline through floor-to-ceiling glass, warm brass and walnut bar, marble counter with champagne, soft golden hour light blending with interior amber glow, elegant silhouettes
```
+ STYLE SUFFIX.

**P4 — Hero pagina /aperitivo** · 16:9 · `public/images/aperitivo-milan-cocktails-bar`
```
A refined Milanese aperitivo scene at golden hour, marble bar top with Negroni and spritz in crystal glassware, brushed-brass details, soft warm backlight, a curated buffet softly out of focus, elegant hands and silhouettes, intimate upscale mood
```
+ STYLE SUFFIX.

---

## §4 — CORE PER LOCALE (card + hero)
> I record locale (file immagine, slug, isFeatured) sono in `lib/venuesData.ts` (VERIFICATO).
> Ogni locale ha GIÀ un file dedicato in `public/images/` → questi prompt lo sovrascrivono. Nessuna collisione.
> Featured (16:9, isFeatured:true): just-me-milano, voya-rooftop-milan, pineta-milano, 55-milano.
> Tutti gli altri (14): 3:4. File = `public/images/{file}`.

| file | CORE (prima dello STYLE SUFFIX) |
|---|---|
| `just-me-milano` *(feat)* | vedi P1 |
| `pineta-milano` *(feat)* | Milan singing-aperitivo club near Corso Como, warm convivial room, long communal marble tables, brass pendant lights, raised hands and elegant silhouettes mid-celebration, festive yet refined warm atmosphere |
| `voya-rooftop-milan` *(feat)* | rooftop skybar on the 20th floor in Isola Milan at blue hour, panoramic skyline through glass, brass-and-walnut bar, marble counter, champagne, warm amber interior glow |
| `55-milano` *(feat)* | upscale Milan apericena venue, elegant dining-meets-club room, candle-warm tables with abundant refined buffet softly blurred, brushed-brass and ivory tones, intimate festive mood |
| `armani-prive-milano` | ultra-exclusive Milan fashion-district nightclub, minimalist sleek dark interior, polished black marble, single champagne-gold light line, pristine restrained luxury, a lone elegant silhouette |
| `gattopardo-milano` | vedi P2 |
| `the-club-milano` | high-energy upscale Milan commercial-music club, sleek dark dancefloor, warm amber and champagne lighting, marble VIP tables, dynamic elegant silhouettes |
| `play-club-milano` | contemporary Milan hip-hop and afrobeats club, warm moody lighting, brushed-brass accents, intimate dark room with champagne-gold glow, stylish silhouettes |
| `volt-club-milano` | refined underground techno club in Milan, raw concrete softened by warm amber wash, minimalist industrial-luxe, subtle champagne-gold haze, silhouettes on a dark dancefloor |
| `hollywood-milano` | historic glamorous Milan nightclub, classic opulent interior with warm gilded details, marble and velvet in charcoal-and-gold, timeless elegant party silhouettes |
| `repvblic-milano` | modern Milan house-and-EDM club, sleek dark architecture, warm amber and champagne lighting, brushed-brass VIP area, elegant silhouettes |
| `church-81-milano` | dramatic Milan club with cathedral-like proportions, tall arches, warm uplighting on stone, intimate bottle-service tables, refined mysterious mood |
| `11-clubroom` | intimate stylish Milan club room, warm low lighting, marble bar, champagne-gold accents, plush charcoal seating, elegant close-knit ambience |
| `terrazza-duomo-21` | rooftop terrace overlooking the Milan Duomo at dusk, ornate cathedral spires softly behind glass, warm brass bar, marble counter, golden-hour-to-amber light |
| `mib-milano` | panoramic Milan rooftop aperitivo terrace, warm sunset over the skyline, brushed-brass and marble bar, elegant cocktails, refined silhouettes |
| `magazzini-generali` | historic Milan warehouse turned multi-room club, vast industrial space softened by warm amber light, brick and steel with champagne-gold glow, atmospheric silhouettes |
| `apollo-club-milano` | retro-design cocktail bar and club in the Navigli district of Milan, warm vintage-modern interior, walnut and brass, marble bar, intimate indie-chic mood |
| `ceresio-7-milano` | Dsquared2 Ceresio 7 rooftop pool bar in Milan, twin brushed-brass bars, marble pool deck, skyline at dusk, warm amber light, elegant silhouettes |

---

## §4b — IMMAGINI GENERICHE / CONDIVISE (zone, photo-grid home, fallback eventi, OG)
> Questi file NON sono di un singolo locale ma sono VISIBILI (zone, griglia home, hero pagine,
> copertine evento di fallback, OG). Vanno rigenerati anch'essi. Path = `public/images/{file}`.
> Mappatura zone→file VERIFICATA in `lib/data.ts` (array `mockZones`).

| file | usato da | aspect | CORE |
|---|---|---|---|
| `aperitivo-milan-cocktails-bar` | zona Brera + /aperitivo | 16:9 | vedi P4 (pilota) |
| `aperitivo-milan-navigli-evening` | zona Navigli | 16:9 | Navigli canal-side aperitivo at dusk in Milan, warm string lights reflecting on the canal, marble-topped outdoor bar, brass details, elegant silhouettes, bohemian-chic warmth |
| `milan-rooftop-aperitivo-panoramic-view` | zona Porta Venezia + fallback | 16:9 | panoramic Milan rooftop at golden hour, warm skyline, brushed-brass and marble bar, refined aperitivo, elegant silhouettes |
| `milan-nightclub-luxury-vip-champagne` | zona Arco della Pace + OG + grid + fallback | 16:9 | the definitive Milan luxury nightlife scene: champagne on dark marble, brushed-brass bucket, warm charcoal-and-gold club beyond, aspirational |
| `milan-nightclub-dancefloor-vip` | zona Porta Romana + fallback | 16:9 | an upscale Milan club dancefloor seen from a VIP table, warm amber haze, marble table with champagne, elegant silhouettes dancing |
| `milan-club-crowd-dancefloor-night` | photo-grid home + fallback | 16:9 | an elegant Milan club crowd at peak night, warm amber and champagne light, tasteful motion, sophisticated silhouettes (no faces in focus) |
| `bottle-service-milan-vip-nightclub` | guide + grid + fallback | 16:9 | premium bottle service in a Milan club, champagne and spirits on marble with sparkler-free elegance, brushed-brass, warm spotlight, no readable labels |
| `vip-table-milan-nightclub-just-me` | photo-grid home + /vip-tables | 16:9 | a pristine VIP table at a Milan luxury club, champagne in ice on marble, brass bucket, plush charcoal seating, warm spotlight |
| `rooftop-bar-milan-voya-skyline` | zona Isola + grid + fallback | 16:9 | a Milan rooftop bar at blue hour with skyline, brass-and-walnut counter, marble, champagne, warm interior glow |
| `clubs-hero` | hero /clubs | 16:9 | an elegant single Milan nightclub interior, warm charcoal and gold, marble and brass, refined silhouettes, members-club mood |
| `club-techno` | genere/zona techno | 16:9 | a refined underground techno space in Milan, warm amber wash over concrete, minimalist industrial-luxe, subtle gold haze |
| `rooftop-luxury` | generico rooftop | 16:9 | a luxurious Milan rooftop lounge at dusk, marble and brass, skyline, warm light, elegant silhouettes |
| `aperitivo-milan-navigli-evening` | (vedi sopra) | — | — |

> NOTA zone che riusano immagini di LOCALI (corso-como→pineta, nolo→volt, lambrate→gattopardo,
> ripamonti→magazzini): si aggiornano automaticamente quando rigeneri il file del locale in §4.
> Se vuoi immagini "da quartiere" dedicate, è un task separato (cambiare i `image:` in mockZones).
> File `mag-cafe`: verifica se è ancora referenziato; se non lo è, IGNORALO.

## §5 — GALLERY INTERNI (126 immagini, 4:3)
> Per OGNI locale genera 7 immagini. Path: `public/images/venues/{venueDir}/{venueDir}-interior-0X` (X = 1..7).
> Prompt = `{CORE del locale §4}` + `, {ANGLE}` + `, {STYLE SUFFIX}`.

`{venueDir}`: 11-clubroom, 55-milano, apollo-milano, armani-prive-milano, ceresio-7,
church-81, gattopardo, hollywood, just-me-milano, magazzini-generali, mib-milano,
pineta-milano, play-club-milano, repvblic-milano, terrazza-21, the-club-milano,
volt-club-milano, voya-rooftop-milan.

> NB CORE per gallery: usa il CORE del locale da §4 (ceresio-7 → riga `ceresio-7-milano`;
> terrazza-21 → riga `terrazza-duomo-21`; apollo → riga `apollo-club-milano`).
> ⚠️ Apollo: il file CARD top-level è `apollo-club-milano.jpg`, ma la CARTELLA gallery è
> `public/images/venues/apollo-milano/` (nome diverso) — usa `apollo-milano` come `{venueDir}`.

ANGLE list (X = 01..07, in quest'ordine):
1. `grand entrance and reception, warm welcome lighting`
2. `main room wide establishing shot`
3. `the bar, marble counter with champagne and crystal`
4. `VIP bottle-service area with ivory linen tables`
5. `dancefloor with elegant silhouettes and amber haze`
6. `intimate detail — brass, marble, candlelight close-up`
7. `lounge seating in plush charcoal and gold`

## §6 — HERO DI PAGINA (8, 16:9)
| file | CORE |
|---|---|
| `clubs-hero` | a curated collage-free single elegant Milan nightclub interior, warm charcoal and gold, marble and brass, refined silhouettes, aspirational members-club mood |
| `og-zones` / `zones-hero` (salva come `public/images/zones-hero`) | atmospheric night map mood of Milan districts, warm amber city lights, elegant abstract, charcoal and gold |
| `guides-hero` (salva `public/images/guides-hero`) | an elegant editorial flat-lay of Milan nightlife essentials, marble surface, brass key, champagne coupe, warm light |
| `aperitivo` → file `aperitivo-milan-cocktails-bar` | vedi P4 |
| `vip-tables-hero` (salva `public/images/vip-table-milan-nightclub-just-me`) | a pristine VIP bottle-service table in a Milan club, champagne in ice on marble, brushed-brass bucket, warm spotlight, elegant silhouettes behind |
| `faq-hero` (salva `public/images/faq-hero`) | a refined concierge desk detail, marble, brass bell, warm light, calm upscale mood |
| `bottle-prices-hero` (salva `public/images/bottle-prices-hero`) | a luxurious lineup of champagne and spirits bottles on a marble bar, warm backlight, brushed-brass, no readable labels |
| `door-policy-hero` (salva `public/images/door-policy-hero`) | an elegant Milan club entrance at night, warm light spilling onto stone, brass rope stanchion, refined doorway, no signage |

> Se un hero di pagina non è ancora referenziato nel codice, prima di usarlo aggiungi il
> riferimento nella relativa pagina (chiedi se incerto) — altrimenti salva comunque il file.

## §7 — COPERTINE EVENTI (3:4, opzionale dopo il batch principale)
> Gli eventi usano già `event.image` con fallback su `venue.image`. Genera copertine
> dedicate SOLO per gli eventi `isSpecial` principali. Prompt = `{CORE del venue dell'evento §4}`
> + `, special-event mood: {tema evento}` + STYLE SUFFIX. Salva in `public/images/events/{event-id}`.
> Esempi temi: Fashion Week → "fashion-week glamour"; Ferragosto → "midsummer celebration";
> Uncle Waffles/Tyga → "international guest DJ night".
> (Se il budget è limitato, SALTA questa sezione: i fallback funzionano già.)

## §8 — OG / SOCIAL (16:9)
| file | CORE |
|---|---|
| `og-default` (salva `public/images/milan-nightclub-luxury-vip-champagne`) | the definitive Milan luxury nightlife image: champagne on marble, brushed-brass, warm charcoal-and-gold club beyond, elegant and aspirational |

---

## §9 — WORKFLOW PER OGNI IMMAGINE (ripeti)
1. `images_generate` { prompt: `{CORE}, {STYLE SUFFIX}`, mode: "imagen-nano-banana-2", aspectRatio, resolution: "2k", count: 1 }
2. Ottieni URL del risultato (usa `creations_wait` se l'operazione è asincrona).
3. `node scripts/save-image.mjs "<URL>" <path-senza-estensione>`
4. Dopo un blocco di immagini: `node scripts/optimize-images.mjs` (crea/aggiorna le .webp).
5. Le pagine referenziano `.webp` (dopo Fase 0): assicurati che la webp esista per ogni nuova jpg.
```
