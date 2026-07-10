/**
 * Renderizza il contenuto gold-standard (sezioni + programma + 25 FAQ) di un
 * evento a partire dall'HTML della description Eventbrite (lib/eventbriteSync
 * getEventGoldHtml). Sostituisce GoldEventContent quando il Vercel Blob non è
 * disponibile (403/sospeso): il contenuto è già completo e nella lingua giusta.
 *
 * L'HTML è nostro (gold-standard generato dalla pipeline), quindi
 * dangerouslySetInnerHTML è accettabile. Lo stile ricalca la pagina evento
 * (heading champagne, testo tenue) via classi sui tag figli.
 */
export default function GoldEventHtml({ html }: { html: string }) {
  return (
    <div
      className="gold-html mt-6 space-y-4
        [&_h2]:text-2xl [&_h2]:font-serif [&_h2]:font-bold [&_h2]:text-champagne [&_h2]:mt-10 [&_h2]:mb-3
        [&_h3]:text-lg [&_h3]:font-serif [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-6 [&_h3]:mb-2
        [&_p]:text-white/70 [&_p]:leading-relaxed [&_p]:mb-3
        [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ul]:text-white/70
        [&_li]:leading-relaxed
        [&_a]:text-champagne [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-white [&_a]:break-words"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
