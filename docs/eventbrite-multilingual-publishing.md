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
