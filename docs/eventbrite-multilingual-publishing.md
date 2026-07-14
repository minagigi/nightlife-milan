# Eventbrite Multilingual Publishing

## Regola operativa

Quando pubblichiamo un evento Eventbrite in una lingua diversa dall'italiano/inglese, il lavoro non si ferma alla traduzione del corpo evento.

Ogni lingua deve avere:

- title e summary nella lingua target, con venue-first se non c'e un artista internazionale
- corpo evento lungo, dettagliato e localizzato
- agenda e programma nella lingua target
- 25 FAQ SEO-oriented nella lingua target, con risposte sotto 300 caratteri
- blocco SEO con keyword e commutazioni nella lingua target
- locandina nel corpo Eventbrite in formato 1:1, ricomposta dalla locandina originale e localizzata nella lingua target

## Summary Eventbrite

Il summary e un campo di conversione e SEO, non una frase generica.

Regole:

- massimo 140 caratteri
- deve includere le informazioni SEO piu cercate per quella lingua
- deve includere sempre il numero WhatsApp per prenotazioni: `+39 351 912 7047`
- deve rendere chiaro che la prenotazione avviene via WhatsApp
- deve contenere venue/data/evento quando possibile
- deve essere nella lingua target, salvo termini internazionali realmente cercati come `guest list`, `VIP`, `Just Me Milano`

Esempio PT da 140 caratteri:

`Just Me Milano 14 julho: festa universitaria, vida noturna, mesa VIP, guest list Milao. WhatsApp +39 351 912 7047. Discoteca Milao. Reserva.`

Nota tecnica: Eventbrite puo derivare il summary dai primi 140 caratteri di `event.description.html`. Per evitare concatenazioni o tagli casuali, il primo paragrafo del corpo deve essere il summary finale calibrato a 140 caratteri quando si aggiorna via API.

## Locandina nel corpo Eventbrite

Non usare un crop brutale della locandina originale e non creare una creativita casuale.

Workflow corretto:

1. Prendere la locandina originale come reference.
2. Ricomporre gli stessi elementi in formato quadrato 1:1:
   - stesso mood
   - stessa immagine/foto di base quando possibile
   - stessi loghi/brand
   - stessa gerarchia grafica
   - niente bande nere
   - niente testo tagliato
3. Localizzare i testi visibili nella lingua target:
   - brand e URL restano invariati
   - CTA, giorno, data, sottotitolo e label operative vanno tradotte
4. Salvare l'asset in `public/images/events/generated/`.
5. Caricare l'asset su Eventbrite come media.
6. Inserirlo nel corpo evento tramite `event.description.html` come `<IMG>`.

La locandina iniziale deve apparire subito dopo il summary/primo paragrafo.

## Gallery immagini nel corpo evento

Dopo la locandina iniziale, aggiungere immagini mood dell'evento quando il lavoro richiede un Eventbrite ricco.

Regole:

- creare 4 immagini aggiuntive partendo da foto reali del locale di riferimento
- le immagini devono rappresentare momenti reali della serata: arrivo, aperitivo, dancefloor, tavoli VIP/bottle service
- il target visivo deve rispettare evento, agenda, dress code e pubblico atteso
- per University Party: studenti universitari, Erasmus, international students, outfit fashion/elegante, energia giovane ma coerente con selezione porta Just Me
- evitare immagini generiche o inventate senza legame col locale
- niente testo dentro le immagini mood, salvo locandine vere
- ogni immagine deve avere titolo, descrizione/caption, `ALT` e `TITLE` in lingua target
- titolo/descrizione/alt devono includere keyword SEO locali ad alto intento, senza keyword stuffing
- nel corpo Eventbrite usare blocchi chiari:
  - `<H2>` titolo immagine SEO localizzato
  - `<P>` descrizione/caption localizzata
  - `<IMG SRC="..." ALT="..." TITLE="..." WIDTH="460" STYLE="width:100%;max-width:460px;height:auto;display:block;">`

Esempi PT:

- `Aperitivo Just Me Milano 14 julho 2026 - vida noturna em Milao`
- `Dancefloor University Party Just Me Milano - festa universitaria Milao`
- `Mesa VIP Just Me Milano - bottle service e guest list Milao`
- `Torre Branca e Just Me Milano - onde sair em Milao terca-feira`

## Esempio PT

Per portoghese:

- `Event Service` -> `Servico de Eventos` o `Serviço de Eventos` se l'immagine gestisce bene gli accenti
- `UNIVERSITY Party` -> `FESTA Universitaria` / `Festa Universitária`
- `FOR THE UNIVERSITY LEADERS WHO INSPIRE MILAN` -> `PARA ESTUDANTES QUE INSPIRAM MILAO`
- `TUESDAY` -> `TERCA-FEIRA`
- `14TH JULY` -> `14 DE JULHO`
- `RESERVATIONS` -> `RESERVAS`

Il principio e: stessa locandina, stessa riconoscibilita, lingua dell'utente.
