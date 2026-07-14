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

## Esempio PT

Per portoghese:

- `Event Service` -> `Servico de Eventos` o `Serviço de Eventos` se l'immagine gestisce bene gli accenti
- `UNIVERSITY Party` -> `FESTA Universitaria` / `Festa Universitária`
- `FOR THE UNIVERSITY LEADERS WHO INSPIRE MILAN` -> `PARA ESTUDANTES QUE INSPIRAM MILAO`
- `TUESDAY` -> `TERCA-FEIRA`
- `14TH JULY` -> `14 DE JULHO`
- `RESERVATIONS` -> `RESERVAS`

Il principio e: stessa locandina, stessa riconoscibilita, lingua dell'utente.
