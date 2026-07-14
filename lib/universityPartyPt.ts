import type { LocalizedEventContent } from './localizedEventContent';
import { MusicGenre, type Event } from './types';

export const UNIVERSITY_PARTY_CANONICAL_SLUG = 'university-party-just-me-tuesday-july-14-2026-2026-07-14';
export const UNIVERSITY_PARTY_PT_LEGACY_SLUG = 'justme-tuesday-martedi-universitario';

export const universityPartyEventSeed = {
  id: 'eventbrite-1993899840096',
  venueId: 'v-justme',
  genre: [MusicGenre.HOUSE, MusicGenre.HIP_HOP, MusicGenre.REGGAETON, MusicGenre.EDM, MusicGenre.COMMERCIAL],
  dateISO: '2026-07-14T19:30:00+02:00',
  endDateISO: '2026-07-15T05:00:00+02:00',
  pricing: { entry: 13, currency: 'EUR', tableMinSpend: 200 },
  localizedContent: {
    title: {
      en: 'Just Me Milano - University Party | Tuesday, July 14, 2026',
      it: 'Just Me Milano - University Party | Martedì 14 luglio 2026',
      pt: 'Just Me Milano - University Party | Terça, 14 de julho de 2026',
    },
    shortDescription: {
      en: 'University Party at Just Me Milano with aperitivo, club entry and VIP tables.',
      it: 'University Party al Just Me Milano con aperitivo, ingresso club e tavoli VIP.',
      pt: 'University Party no Just Me Milano com aperitivo, entrada club e mesas VIP.',
    },
    slug: {
      en: UNIVERSITY_PARTY_CANONICAL_SLUG,
      it: UNIVERSITY_PARTY_CANONICAL_SLUG,
      pt: UNIVERSITY_PARTY_CANONICAL_SLUG,
    },
  },
  image: '/images/events/generated/just-me-university-party-recomposed-1x1-pt.png',
  xceedUrl: 'https://xceed.me/en/milano/event/university-party-41/220719/channel/nightlifemilan-1',
  isSpecial: true,
  isTrending: true,
} satisfies Event;

export const universityPartyPt = {
  locale: 'pt',
  canonicalSlug: UNIVERSITY_PARTY_CANONICAL_SLUG,
  title: 'Just Me Milano - University Party | Terça, 14 de julho de 2026',
  seoSummary: 'University Party no Just Me Milano, 14 julho: aperitivo, club e mesas VIP. Reservas WhatsApp +39 351 912 7047.',
  affiliateUrl: 'https://xceed.me/en/milano/event/university-party-41/220719/channel/nightlifemilan-1',
  sections: [
    {
      icon: '🥂',
      title: 'Do aperitivo ao amanhecer',
      body: 'Na terça-feira, 14 de julho de 2026, o Just Me Milano recebe a University Party no Parco Sempione, junto à Torre Branca. A noite começa às 19:30 com aperitivo buffet, cocktails premium e jantar opcional. A partir das 22:00, a pista assume o centro da experiência com house, hip hop, hits comerciais, EDM e reggaeton, seguindo até às 05:00 para estudantes universitários, Erasmus, grupos internacionais e jovens profissionais 18+.',
    },
    {
      icon: '👔',
      title: 'Código de vestimenta e regras de entrada',
      body: 'O código de vestimenta é elegante e cuidado. Para homens, calças compridas são obrigatórias; calções, roupa desportiva e um visual demasiado informal podem impedir a entrada. Leve um documento de identificação válido: o evento é 18+. Confirme bilhete, lista de convidados ou mesa antes de sair para evitar dúvidas na porta e chegar no horário correto para a modalidade escolhida.',
    },
    {
      icon: '🍾',
      title: 'Mesas, lista de convidados e bilhetes',
      body: 'Pode escolher Early Bird com aperitivo, entrada Club com duas bebidas, Pink Pass feminina quando disponível, mesa na pista, mesa junto ao DJ ou mesa na área VIP. Para grupos, aniversários e serviço de garrafas, envie o número de pessoas, o horário de chegada e o orçamento pelo WhatsApp +39 351 912 7047. A equipa da Nightlife Milan confirma disponibilidade, posição e inclusões antes da reserva.',
    },
  ],
  programme: [
    { start: '19:30', end: '20:30', title: 'Chegada, aperitivo buffet e cocktails premium' },
    { start: '20:30', end: '22:00', title: 'Jantar opcional e acolhimento dos grupos com reserva' },
    { start: '22:00', end: '00:00', title: 'Abertura da pista e início da University Party' },
    { start: '00:00', end: '03:00', title: 'Pico da noite com house, hip hop, hits, EDM e reggaeton' },
    { start: '03:00', end: '05:00', title: 'Festa até de madrugada e serviço de garrafas nas mesas VIP' },
    { start: '05:00', title: 'Encerramento previsto da pista' },
  ],
  offers: [
    { name: 'Early Bird - aperitivo buffet + 2 bebidas', price: 13, category: 'ticket' },
    { name: 'Entrada Club + 2 bebidas', price: 15, category: 'ticket' },
    { name: 'Pink Pass - lista feminina', price: 0, category: 'guestlist' },
    { name: 'Mesa na pista', price: 200, category: 'table' },
    { name: 'Mesa junto ao DJ', price: 640, category: 'table' },
    { name: 'Mesa na área VIP', price: 960, category: 'table' },
  ],
  faqs: [
    { question: 'O que é a University Party no Just Me Milano?', answer: 'É a noite universitária de terça-feira no Just Me, em Sempione: aperitivo, jantar opcional, pista e mesas VIP até às 05:00.' },
    { question: 'Onde fica o Just Me Milano?', answer: 'O Just Me fica no Parco Sempione, junto à Torre Branca. Cadorna, Cairoli e Lanza são estações práticas para chegar.' },
    { question: 'A que horas abre a University Party?', answer: 'A experiência começa às 19:30 com aperitivo. A pista ganha ritmo a partir das 22:00 e segue até às 05:00.' },
    { question: 'Quanto custa o Early Bird?', answer: 'O Early Bird custa 13 EUR e inclui aperitivo buffet mais duas bebidas, sujeito a disponibilidade e confirmação.' },
    { question: 'Quanto custa a entrada Club com duas bebidas?', answer: 'A entrada Club com duas bebidas custa 15 EUR e inclui acesso ao clube e duas bebidas depois da fase de aperitivo.' },
    { question: 'Como reservar mesa VIP no Just Me?', answer: 'Envie no WhatsApp +39 351 912 7047 o número de pessoas, horário de chegada e budget. A equipa confirma a disponibilidade.' },
    { question: 'Quanto custa uma mesa no Just Me Milano?', answer: 'A mesa na pista começa em 200 EUR, a mesa junto ao DJ em 640 EUR e a mesa na área VIP em 960 EUR. O valor depende da posição e do grupo.' },
    { question: 'Existe lista de convidados para mulheres?', answer: 'Pode haver Pink Pass feminina conforme a disponibilidade. Confirme antes de sair pelo WhatsApp para receber as condições válidas.' },
    { question: 'Qual é o código de vestimenta do Just Me?', answer: 'O código de vestimenta é elegante. Homens precisam de calças compridas; calções e roupa desportiva podem impedir a entrada.' },
    { question: 'A entrada é 18+?', answer: 'Sim. A University Party é 18+. Leve um documento de identificação válido porque a segurança pode verificar a idade.' },
    { question: 'Que música toca na University Party?', answer: 'A pista mistura house, hip hop, hits comerciais, EDM e reggaeton para estudantes e grupos internacionais.' },
    { question: 'Posso jantar antes da festa?', answer: 'Sim. Além do aperitivo buffet, há jantar opcional antes da abertura completa da pista. Confirme a reserva com antecedência.' },
    { question: 'O Eventbrite é o bilhete real para entrar?', answer: 'A página Eventbrite funciona como informação ou pedido de reserva. Confirme o acesso pelo Xceed ou WhatsApp antes de chegar.' },
    { question: 'Onde compro os bilhetes oficiais?', answer: 'Use o link Xceed ou fale com a Nightlife Milan no WhatsApp para bilhetes, guest list e mesas VIP.' },
    { question: 'Como evitar fila no Just Me?', answer: 'Chegue cedo e confirme bilhete, guest list ou mesa. Uma reserva validada reduz dúvidas quando o clube começa a encher.' },
    { question: 'Qual é a melhor hora para chegar?', answer: 'Chegue às 19:30 para o aperitivo ou perto das 22:00 para o clubbing. Grupos com mesa devem alinhar o horário no WhatsApp.' },
    { question: 'O Just Me é indicado para estudantes internacionais?', answer: 'Sim. A University Party foi pensada para estudantes, Erasmus e grupos internacionais que querem sair numa terça-feira em Milão.' },
    { question: 'Posso organizar um aniversário no Just Me?', answer: 'Sim. Para aniversários e grupos, uma Dance Floor Table ou VIP Area oferece um ponto fixo e facilita a entrada conjunta.' },
    { question: 'Há serviço de garrafas?', answer: 'Sim. As mesas podem incluir serviço de garrafas conforme o pacote. Confirme garrafas, posição e inclusões antes de pagar.' },
    { question: 'O Just Me fica perto da Torre Branca?', answer: 'Sim. O clube fica junto à Torre Branca, dentro do Parco Sempione, uma referência simples para táxi e chegada a pé.' },
    { question: 'Como chegar de metro?', answer: 'Cadorna, Cairoli e Lanza são opções práticas. A partir delas, siga pelo Parco Sempione até à entrada do Just Me.' },
    { question: 'Há reembolso se eu não puder ir?', answer: 'Bilhetes online normalmente não são reembolsáveis. Verifique a data e as condições do canal de compra antes de confirmar.' },
    { question: 'A reserva pelo WhatsApp é paga?', answer: 'A concierge confirma disponibilidade. O pagamento depende do bilhete, entrada ou mesa efetivamente escolhido.' },
    { question: 'Que palavras ajudam a encontrar este evento?', answer: 'Just Me Milano, University Party Milan, festa universitária Milão, vida noturna Milão, mesa VIP Milão e nightlife Sempione.' },
    { question: 'Por que escolher o Just Me numa terça-feira?', answer: 'Porque reúne Sempione, aperitivo cedo, pista até às 05:00, público internacional, mesas VIP e concierge num único plano.' },
  ],
} satisfies LocalizedEventContent;
