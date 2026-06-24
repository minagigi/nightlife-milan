# 01 — DESIGN SYSTEM CANONICO — "Maison Champagne" (Direzione C)

> Questo è l'UNICO riferimento per colori, tipografia, spaziatura, raggi, motion e
> trattamento immagini. Ogni valore qui è LEGGE. Non inventare valori nuovi.
> Se un file usa un colore che non è in questa tabella, va sostituito con quello qui.

---

## 0. Concept in una frase
Lusso da *members club* (Armani/Bulgari): charcoal **caldo**, avorio, **un solo oro soft**,
texture marmo, ritratti, molto spazio bianco, angoli poco arrotondati, motion lento ed elegante.

---

## 1. PALETTE (valori esatti — copia/incolla)

### Superfici (charcoal caldo, 3 livelli)
| Token | Hex | Uso |
|-------|-----|-----|
| `--canvas`    | `#131009` | Sfondo pagina (il più scuro) |
| `--surface-1` | `#1C1810` | Sezioni rialzate, header, menu |
| `--surface-2` | `#262017` | Card, overlay, dropdown |
| `--line`      | `rgba(201,168,106,0.14)` | Bordi hairline (oro tenue) |

### Oro (UNO SOLO — champagne soft)
| Token | Hex | Uso |
|-------|-----|-----|
| `--gold`        | `#C9A86A` | Oro primario (testi accent, bordi, CTA) |
| `--gold-bright` | `#DFC58E` | Hover/active, highlight |
| `--gold-deep`   | `#8A6E3A` | Testo scuro su fondo chiaro/avorio |
| glow rgba       | `rgba(201,168,106,0.X)` | Ombre/glow oro |

### Avorio / crema (il "chiaro")
| Token | Hex | Uso |
|-------|-----|-----|
| `--ivory`     | `#EDE6D6` | Titoli e testo primario su scuro |
| `--ivory-dim` | `#B8B0A0` | Testo secondario |
| `--stone`     | `#837C6C` | Testo terziario / muted |

> NOTA: il bianco puro `#fff` / `text-white` è tollerato ma PREFERISCI `--ivory` per i
> titoli grandi (hero, h1, h2). Più caldo = più Maison.

---

## 2. TABELLA DI MIGRAZIONE COLORI (find → replace globale)

Questi sono i valori VECCHI presenti nel codice e il loro sostituto NUOVO.
Applica esattamente questi rimpiazzi (istruzioni operative nella Fase 1 del PLAYBOOK).

| VECCHIO (cercare) | NUOVO (sostituire) | Motivo |
|---|---|---|
| `#C5A059` | `#C9A86A` | oro legacy #1 → oro unico |
| `#c5a059` | `#C9A86A` | (lowercase) |
| `#D4AF37` | `#C9A86A` | oro legacy #2 (token champagne) → oro unico |
| `#d4af37` | `#C9A86A` | (lowercase) |
| `#F2D59F` | `#DFC58E` | oro chiaro legacy → gold-bright |
| `#f2d59f` | `#DFC58E` | (lowercase) |
| `rgba(212,175,55,` | `rgba(201,168,106,` | glow oro #D4AF37 → nuovo oro |
| `rgba(197,160,89,` | `rgba(201,168,106,` | glow oro #C5A059 → nuovo oro |
| `#050505` | `#131009` | dark legacy → canvas |
| `#121212` | `#262017` | dark legacy → surface-2 |
| `#0A0A0A` | `#1C1810` | dark legacy → surface-1 |
| `#0a0a0a` | `#1C1810` | (lowercase) |

> ⚠️ ECCEZIONE: dentro `app/globals.css` nel blocco `@theme`, il token
> `--color-charcoal` va impostato a `#131009` (canvas), NON a `#1C1810`.
> Vedi Fase 1, Task 1.1 del PLAYBOOK per l'edit esatto.

---

## 3. TIPOGRAFIA

Font GIÀ caricati in `app/[locale]/layout.tsx` (NON aggiungere dipendenze):
- Serif display: **Cormorant Garamond** → `font-serif` / `var(--font-cormorant)`
- Sans UI: **Montserrat** → `font-sans` / `var(--font-montserrat)`

Regole Maison (più raffinato dell'attuale):
| Elemento | Classi Tailwind |
|---|---|
| H1 hero | `font-serif font-medium tracking-tight text-[var(--ivory)]` + `clamp(2.75rem,9vw,8rem)` (già impostato in Hero) |
| H2 sezione | `font-serif text-3xl md:text-4xl font-medium text-[var(--ivory)] tracking-tight` |
| H3 | `font-serif text-xl font-medium text-[var(--ivory)]` |
| Eyebrow/label | `font-sans text-[10px] tracking-[0.35em] uppercase text-[var(--gold)]/60` |
| Body | `font-sans font-light text-[15px] leading-relaxed text-[var(--ivory-dim)]` |
| CTA testo | `font-sans font-semibold text-sm tracking-[0.15em] uppercase` |

Principio: **più tracking, pesi più leggeri (300/400) per il body, serif per i titoli.**

---

## 4. SPAZIATURA & RAGGI (Maison = arioso e meno arrotondato)

- Padding sezioni: aumenta a `py-20 md:py-28` (l'attuale `py-12/16` è troppo stretto).
- Contenitori: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` (invariato).
- Raggi: **ridurre l'arrotondamento.**
  | VECCHIO | NUOVO |
  |---|---|
  | `rounded-3xl` | `rounded-xl` |
  | `rounded-2xl` | `rounded-lg` |
  (lascia invariati `rounded-full` su pill/avatar e `rounded-xl`/`rounded-lg` esistenti.)

---

## 5. MOTION
- Easing unico: `cubic-bezier(0.4, 0, 0.2, 1)`.
- Durate: hover 300–400ms; transizioni hero/immagini 700–1600ms.
- `active:scale-[0.98]` su tutti i CTA (già fatto sui principali — verifica nei nuovi).
- Rispetta `prefers-reduced-motion` (già gestito in globals.css).

---

## 6. RICETTA TRATTAMENTO IMMAGINI (uniformità "stessa famiglia")

Ogni immagine, dopo la generazione, riceve via CSS un trattamento coerente. Definire in
`globals.css` una utility `.img-maison` da applicare ai wrapper immagine principali
(istruzioni in Fase 2):

```css
@layer utilities {
  /* Velo caldo + leggero per uniformare le foto alla palette Maison */
  .img-maison::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      linear-gradient(180deg, rgba(19,16,9,0) 35%, rgba(19,16,9,0.55) 100%),
      rgba(201,168,106,0.06);
    mix-blend-mode: normal;
  }
}
```

Per la GENERAZIONE (Fase 3) il "look" è codificato nel suffisso di stile dei prompt
(vedi `03_IMAGE_PROMPTS.md`): luce calda direzionale, marmo, avorio, oro soft, grana fine.

---

## 7. CHECKLIST DI COERENZA (dopo ogni fase)
- [ ] Nessun `#C5A059`, `#D4AF37`, `#F2D59F` residuo (`grep` deve dare 0 in app/ e components/).
- [ ] Nessun `#050505`, `#121212`, `#0A0A0A` residuo (eccetto il token charcoal = #131009).
- [ ] `npx tsc --noEmit` senza errori.
- [ ] Nessun errore console nel preview.
