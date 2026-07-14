# Standard produzione eventi multilingua

Questo documento e la fonte operativa per creare o aggiornare eventi Nightlife Milan sul sito e su Eventbrite.

## Routing modelli

- **Sol**: strategia, architettura, prompt, decisioni ad alto rischio e revisione finale.
- **Terra**: implementazione, automazioni, controlli, pubblicazione e lavoro operativo ordinario.
- **Luna**: scrittura e traduzione dei contenuti nelle lingue del sito.
- Usare il modello minimo adeguato, mantenendo alta la qualita. Evitare task o agenti quando il template e gia definito.
- Le traduzioni sono preparate localmente o in-sessione e poi inviate. **Mai tradurre tramite API Anthropic** e mai reintrodurre questa logica lato server.

## Fonte unica

- Profilo evento strutturato: fatti ufficiali, data, orari, venue, prezzi, programma, dress code, eta, link e immagini reali.
- Pack per ogni lingua abilitata in `lib/i18n/locales.ts`.
- Pagina sito e descrizione Eventbrite derivano dalla stessa fonte strutturata. Non mantenere due testi indipendenti.

## Contratto editoriale

- Se non c'e un artista internazionale, il titolo inizia sempre con il nome del locale.
- Summary Eventbrite: massimo 140 caratteri, informazioni SEO principali e WhatsApp `+39 351 912 7047` esplicito.
- Corpo: descrizione lunga e dettagliata, prenotazioni, accesso, dress code, eta, programma, offerte e contatti.
- FAQ: esattamente 25, SEO-oriented nella lingua dell'evento; ogni risposta massimo 300 caratteri.
- Keyword: native per lingua, includono data, locale, citta, evento e combinazioni di ricerca pertinenti. Mai lasciare un blocco SEO inglese in una lingua diversa.

## Contratto immagini

- Locandina quadrata 1:1 subito dopo il summary su Eventbrite; sul sito e anche la hero.
- Ridistribuire gli elementi della locandina originale senza sostituire il soggetto con una nuova immagine casuale.
- Testi e data aggiunti alla locandina sono nella lingua dell'evento.
- Nel corpo Eventbrite: locandina iniziale, descrizione e contatti, programma, poi quattro immagini reali del locale. Le immagini mood compaiono solo dopo il programma.
- Ogni immagine ha titolo e alt text SEO nella lingua dell'evento. Nel corpo e visibile solo il titolo, non una descrizione aggiuntiva.
- Sul sito la galleria usa la stessa sequenza: locandina + quattro immagini reali del locale.

## Pubblicazione e controlli

- Aggiornare prima i listing EN/IT esistenti, poi creare le altre lingue.
- Marker canonico: `nlm:src=<base>-<lang>;slug-en=<slug>`.
- Pubblicazione idempotente e riprendibile: controllare il marker prima di creare e registrare il progresso localmente.
- Prima di scrivere: typecheck, test di tutte le combinazioni evento-lingua, build, controllo mobile/tablet/desktop e verifica delle locandine non latine.
- Dopo il deploy: verificare URL live e route immagini; poi pubblicare Eventbrite e ricontrollare che la coda delle lingue mancanti sia vuota.
