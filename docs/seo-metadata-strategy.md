# Strategia SEO metadata

## Obiettivo

Aumentare il CTR organico facendo coincidere query, promessa dello snippet e contenuto della pagina. I title privilegiano intento, locale o categoria e data; le description aggiungono informazioni utili e una CTA WhatsApp verificabile.

## Regole globali

- Title: massimo 62 caratteri, keyword principale all'inizio, brand solo se rimane spazio utile.
- Description: massimo 158 caratteri e una sola CTA localizzata con `+39 351 912 7047`.
- Il numero non entra nei title: ridurrebbe spazio per query, locale e data.
- Canonical sempre autoreferenziale nella lingua corrente.
- Hreflang e sitemap includono solo lingue con contenuto completo.
- Open Graph e Twitter riutilizzano title e description della pagina.
- Niente liste di keyword o promesse non confermate: prezzi, eta e servizi devono corrispondere all'evento o al locale.

## Formule per pagina

| Tipo | Formula title | Contenuto description |
|---|---|---|
| Home | `Milan nightlife + club/VIP/aperitivo + anno` | offerta complessiva, aggiornamento, prenotazione |
| Hub eventi | `Eventi a Milano + finestra temporale` | tipologie disponibili e prenotazione |
| Evento singolo | `Nome evento + locale/citta + data esatta` | locale, data, sintesi reale e WhatsApp |
| Locale | `Nome locale + Milano + tipo di esperienza` | pubblico, servizi realmente disponibili e prenotazione |
| Landing intento | `Categoria/pubblico + Milano + anno` | locali coerenti, servizi e disponibilita |
| Guida | `Domanda o tema + Milano` | risposta concreta e assistenza WhatsApp |
| Zona o genere | `Categoria + zona/Milano` | scelta dei locali ed eventi pertinenti |

## Priorita linguistiche

Italiano, inglese, francese, tedesco, spagnolo e portoghese sono le lingue commerciali prioritarie. Le altre restano accessibili ma `noindex` fino al completamento di metadata, testo, FAQ, CTA, alt text e dati evento.

## Architettura e controllo duplicati

- `/events/this-week` e l'unico hub settimanale indicizzabile.
- `/calendar/this-week` reindirizza in modo permanente all'hub.
- Gli eventi Eventbrite multilingua sono raggruppati per evento fisico nella sitemap.
- Le pagine statiche usano date di modifica stabili, non la data di ogni richiesta.
- Eventi e ItemList hanno dati strutturati coerenti con date e URL visibili.

## Misurazione

Confrontare in Search Console finestre di 28 giorni per pagina e query. Intervenire prima sulle pagine con molte impression, posizione media 1-10 e CTR sotto la mediana del sito. Valutare title e description insieme a intento, contenuto e SERP: Google puo riscrivere lo snippet quando la pagina non risponde bene alla query.
