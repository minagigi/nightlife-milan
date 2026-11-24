import { SITE_CONTACT } from '@/config/contact';
import { getWords35 } from '@/lib/capodanno/capodannoUi35';
import type { LocaleCode } from '@/lib/i18n/locales';

export type CompactSeoLocaleOverride = {
  badge: string;
  eyebrow: string;
  headingTpl: string;
  targetPrefix: string;
  outfitPrefix: string;
  couples: string;
  singles: string;
  over30: string;
  families: string;
  young: string;
  fashion: string;
  blackTie: string;
  sequins: string;
  couture: string;
  urban: string;
  techno: string;
  thermal: string;
  ski: string;
  halloween: string;
  smart: string;
  shots: [string, string, string, string];
};

export type UxCopyBlock = {
  tldrBadge: string;
  tldrHeadingTpl: string;
  tldrLabels: [string, string, string, string, string];
  tldrPricesVal: string;
  tldrConciergeVal: string;
  formulaCta: string;
  vipEyebrow: string;
  vipHeadingTpl: string;
  vipSub: string;
  vipZones: [string, string, string, string];
  vipInclusions: [string, string, string, string];
  upsellTitle: string;
  upsellBody: string;
  vipCtaBtn: string;
  dressHeadingTpl: string;
  dressOkTitle: string;
  dressOkExtra1: string;
  dressOkExtra2: string;
  dressNoTitle: string;
  dressNoItems: [string, string, string];
  logHeadingTpl: string;
  logLabels: [string, string, string];
  logTexts: [string, string, string];
  privBadge: string;
  privHeadingTpl: string;
  privBody: string;
  privCta: string;
  nfEyebrow: string;
  nfHeading: string;
  nfSub: string;
  nfSteps: [string, string, string];
  nfChips1: [string, string, string, string];
  nfChips2: [string, string, string, string];
  nfChips3: [string, string, string];
  nfWaCta: string;
};

type CompactBaseSeed = {
  badge: string;
  targetPrefix: string;
  outfitPrefix: string;
  couples: string;
  singles: string;
  over30: string;
  families: string;
  young: string;
  fashion: string;
  dressElegant: string;
  dressParty: string;
  dressUrban: string;
  dressSpa: string;
  shots: [string, string, string, string];
};

function makeCompactPack(s: CompactBaseSeed): CompactSeoLocaleOverride {
  return {
    badge: s.badge,
    eyebrow: `GOOGLE FLOW SEO · ${s.targetPrefix.toUpperCase()} & ${s.outfitPrefix.toUpperCase()}`,
    headingTpl: `{venue} - ${s.targetPrefix} & ${s.outfitPrefix}`,
    targetPrefix: s.targetPrefix,
    outfitPrefix: s.outfitPrefix,
    couples: s.couples,
    singles: s.singles,
    over30: s.over30,
    families: s.families,
    young: s.young,
    fashion: s.fashion,
    blackTie: s.dressElegant,
    sequins: s.dressParty,
    couture: s.dressElegant,
    urban: s.dressUrban,
    techno: s.dressUrban,
    thermal: s.dressSpa,
    ski: s.dressSpa,
    halloween: s.dressParty,
    smart: s.dressElegant,
    shots: s.shots,
  };
}

export const COMPACT_LOCALE_OVERRIDES_22: Record<string, CompactSeoLocaleOverride> = {
  bg: makeCompactPack({
    badge: 'Официален плакат на събитието', targetPrefix: 'Публика', outfitPrefix: 'Дрескод',
    couples: 'Романтични двойки и VIP гости (25–45 г.)', singles: 'Сингъл гости и компании приятели (23–38 г.)',
    over30: 'Изискана публика 30+ / 40+', families: 'Семейства с деца на гала вечеря',
    young: 'Млади гости и студенти (20–32 г.)', fashion: 'Международна модна публика и VIP маси (24–40 г.)',
    dressElegant: 'Елегантен вечерен стил, костюм или официална рокля', dressParty: 'Празничен вечерен аутфит с блясък и кадифе',
    dressUrban: 'Модерен градски клубен стил', dressSpa: 'Бял халат за СПА или алпийски зимен шик',
    shots: ['Основна зала и атмосфера', 'Гала вечеря и посрещане', 'VIP Privé маси и шампанско', 'Дансинг и празничен дрескод'],
  }),
  hr: makeCompactPack({
    badge: 'Službeni plakat događaja', targetPrefix: 'Publika', outfitPrefix: 'Dress code',
    couples: 'Parovi i VIP gosti (25–45 god.)', singles: 'Samci, prijatelji i društveni stolovi (23–38 god.)',
    over30: 'Elegantna publika 30+ / 40+', families: 'Obitelji s djecom na gala večeri',
    young: 'Mladi ljubitelji klubova (20–32 god.)', fashion: 'Međunarodna modna publika i VIP stolovi (24–40 god.)',
    dressElegant: 'Black Tie smoking, svečana haljina ili elegantni sako', dressParty: 'Večernja haljina sa šljokicama i tamno odijelo',
    dressUrban: 'Urbani klupski stil', dressSpa: 'Bijeli spa ogrtač ili alpski chalet stil',
    shots: ['Glavna dvorana i atmosfera', 'Gala večera i doček', 'VIP Privé stolovi i šampanjac', 'Plesni podij i dress code'],
  }),
  cs: makeCompactPack({
    badge: 'Oficiální plakát akce', targetPrefix: 'Cílová skupina', outfitPrefix: 'Dress code',
    couples: 'Páry a VIP hosté (25–45 let)', singles: 'Jednotlivci a skupiny přátel (23–38 let)',
    over30: 'Elegantní publikum 30+ / 40+', families: 'Rodiny s dětmi na slavnostní večeři',
    young: 'Mladí návštěvníci klubů (20–32 let)', fashion: 'Mezinárodní módní publikum a VIP stoly (24–40 let)',
    dressElegant: 'Společenský oděv, smoking, sako nebo dlouhé šaty', dressParty: 'Flitrové společenské šaty a tmavý oblek',
    dressUrban: 'Stylové klubové a street oblečení', dressSpa: 'Bílý lázeňský župan nebo alpský styl',
    shots: ['Hlavní sál a atmosféra', 'Galavečeře a uvítání', 'VIP Privé stoly a šampaňské', 'Taneční parket a outfit'],
  }),
  da: makeCompactPack({
    badge: 'Officiel eventplakat', targetPrefix: 'Målgruppe', outfitPrefix: 'Dresscode',
    couples: 'Romantiske par & VIP-gæster (25–45 år)', singles: 'Singler & vennegrupper (23–38 år)',
    over30: 'Stilfuldt publikum 30+ / 40+', families: 'Familier med børn til gallamiddag',
    young: 'Unge clubbers & DJ-fans (20–32 år)', fashion: 'Internationalt modepublikum & VIP-borde (24–40 år)',
    dressElegant: 'Black Tie smoking, gallakjole eller skræddersyet blazer', dressParty: 'Festlig aftenkjole, fløjl og mørkt jakkesæt',
    dressUrban: 'Stilrent urban clubwear', dressSpa: 'Luksus spa-badekåbe eller alpin après-ski',
    shots: ['Hovedsal & stemning', 'Gallamiddag & velkomst', 'VIP Privé-borde & champagne', 'Dansegulv & festtøj'],
  }),
  et: makeCompactPack({
    badge: 'Ürituse ametlik plakat', targetPrefix: 'Sihtgrupp', outfitPrefix: 'Riietus',
    couples: 'Romantilised paarid ja VIP-külalised (25–45)', singles: 'Üksikkülalised ja sõpruskonnad (23–38)',
    over30: 'Stiilne 30+ / 40+ publik', families: 'Pered lastega pidulikul õhtusöögil',
    young: 'Noored klubikülastajad (20–32)', fashion: 'Rahvusvaheline moepublik ja VIP-lauad (24–40)',
    dressElegant: 'Pidulik ülikond, pikk õhtukleit või bleiser', dressParty: 'Litritega peokleit ja tume ülikond',
    dressUrban: 'Stiilne urbanistlik klubiriietus', dressSpa: 'Luksuslik spaamantel või alpi stiil',
    shots: ['Peasaal ja atmosfäär', 'Galaõhtusöök ja vastuvõtt', 'VIP Privé lauad ja šampanja', 'Tantsupõrand ja riietusstiil'],
  }),
  fi: makeCompactPack({
    badge: 'Virallinen tapahtumajuliste', targetPrefix: 'Kohderyhmä', outfitPrefix: 'Pukukoodi',
    couples: 'Romanttiset pariskunnat ja VIP-vieraat (25–45 v.)', singles: 'Sinkut ja ystäväporukat (23–38 v.)',
    over30: 'Tyylikäs 30+ / 40+ yleisö', families: 'Perheet ja lapset gaalaillallisella',
    young: 'Nuoret klubikävijät (20–32 v.)', fashion: 'Kansainvälinen muotiyleisö ja VIP-pöydät (24–40 v.)',
    dressElegant: 'Black Tie -puku, iltapuku tai tyylikäs pikkutakki', dressParty: 'Juhlava paljettimekko ja tumma puku',
    dressUrban: 'Trendikäs urban-klubiasu', dressSpa: 'Kylpytakki tai alppityyli',
    shots: ['Pääsali ja tunnelma', 'Gaalaillallinen ja vastaanotto', 'VIP Privé -pöydät ja samppanja', 'Tanssilattia ja pukukoodi'],
  }),
  el: makeCompactPack({
    badge: 'Επίσημη αφίσα εκδήλωσης', targetPrefix: 'Κοινό', outfitPrefix: 'Ενδυμασία',
    couples: 'Ρομαντικά ζευγάρια και VIP (25–45 ετών)', singles: 'Παρέες φίλων και solo επισκέπτες (23–38 ετών)',
    over30: 'Εκλεπτυσμένο κοινό 30+ / 40+', families: 'Οικογένειες με παιδιά σε γκαλά δείπνο',
    young: 'Νεανικό κοινό και clubbers (20–32 ετών)', fashion: 'Διεθνές κοινό μόδας και τραπέζια VIP (24–40 ετών)',
    dressElegant: 'Επίσημο ένδυμα, κοστούμι, σμόκιν ή βραδινό φόρεμα', dressParty: 'Βραδινό λαμπερό σύνολο και σκούρο κοστούμι',
    dressUrban: 'Σύγχρονο urban club στυλ', dressSpa: 'Πολυτελές μπουρνούζι σπα ή αλπικό chic',
    shots: ['Κεντρική αίθουσα και ατμόσφαιρα', 'Γκαλά δείπνο και υποδοχή', 'Τραπέζια VIP Privé και σαμπάνια', 'Πίστα χορού και dress code'],
  }),
  hu: makeCompactPack({
    badge: 'Hivatalos eseményplakát', targetPrefix: 'Célközönség', outfitPrefix: 'Öltözet',
    couples: 'Párok és VIP vendégek (25–45 év)', singles: 'Egyéni vendégek és baráti társaságok (23–38 év)',
    over30: 'Elegáns 30+ / 40+ közönség', families: 'Családok gyermekekkel a gálavacsorán',
    young: 'Fiatal klublátogatók (20–32 év)', fashion: 'Nemzetközi divatközönség és VIP asztalok (24–40 év)',
    dressElegant: 'Szokványos elegáns öltöny, koktél- vagy estélyi ruha', dressParty: 'Csillogó estélyi és sötét öltöny',
    dressUrban: 'Modern városi kluböltözet', dressSpa: 'Termál fürdőköpeny vagy alpesi sikk',
    shots: ['Főterem és hangulat', 'Gálavacsora és fogadás', 'VIP Privé asztalok és pezsgő', 'Táncparkett és öltözet'],
  }),
  ga: makeCompactPack({
    badge: 'Póstaer Oifigiúil an Imeachta', targetPrefix: 'Lucht Féachana', outfitPrefix: 'Culaith',
    couples: 'Lánúineacha agus aíonna VIP (25–45)', singles: 'Singil agus grúpaí cairde (23–38)',
    over30: 'Slua stylish 30+ / 40+', families: 'Teaghlaigh le páistí ag dinnéar gála',
    young: 'Clubbers óga agus lucht ceoil (20–32)', fashion: 'Slua faisin idirnáisiúnta agus táblaí VIP (24–40)',
    dressElegant: 'Culaith galánta, tux nó gúna tráthnóna', dressParty: 'Gúna cóisire agus culaith dhorcha',
    dressUrban: 'Éadaí club uirbeacha nua-aimseartha', dressSpa: 'Róba spá sómasach nó stíl Alpach',
    shots: ['Príomhsheomra agus atmaisféar', 'Dinnéar gála agus fáilte', 'Táblaí VIP Privé agus seaimpéin', 'Urlár rince agus gléasadh'],
  }),
  lv: makeCompactPack({
    badge: 'Oficiālais pasākuma plakāts', targetPrefix: 'Auditorija', outfitPrefix: 'Apģērbs',
    couples: 'Romantiski pāri un VIP viesi (25–45 g.)', singles: 'Individuālie viesi un draugu grupas (23–38 g.)',
    over30: 'Eleganta 30+ / 40+ publika', families: 'Ģimenes ar bērniem svētku vakariņās',
    young: 'Jaunieši un mūzikas cienītāji (20–32 g.)', fashion: 'Starptautiska modes publika un VIP galdi (24–40 g.)',
    dressElegant: 'Vakara tērps, smokings vai kokteiļkleita', dressParty: 'Svētku mirdzoša kleita un tumšs uzvalks',
    dressUrban: 'Moderns pilsētas kluba stils', dressSpa: 'Balts spa halāts vai Alpu stils',
    shots: ['Galvenā zāle un atmosfēra', 'Svētku vakariņas un sagaidīšana', 'VIP Privé galdi un šampanietis', 'Deju grīda un dress code'],
  }),
  lt: makeCompactPack({
    badge: 'Oficialus renginio plakatas', targetPrefix: 'Auditorija', outfitPrefix: 'Apranga',
    couples: 'Romantiškos poros ir VIP svečiai (25–45 m.)', singles: 'Pavieniai svečiai ir draugų grupės (23–38 m.)',
    over30: 'Elegantiška 30+ / 40+ publika', families: 'Šeimos su vaikais šventinėje vakarienėje',
    young: 'Jauni klubų lankytojai (20–32 m.)', fashion: 'Tarptautinė mados publika ir VIP stalai (24–40 m.)',
    dressElegant: 'Smokingas, ilga vakarinė suknelė ar švarkas', dressParty: 'Šventinė suknelė ir tamsus kostiumas',
    dressUrban: 'Stilinga miesto klubinė apranga', dressSpa: 'Baltas SPA chalatas ar Alpių stilius',
    shots: ['Pagrindinė salė ir atmosfera', 'Šventinė vakarienė ir sutikimas', 'VIP Privé stalai ir šampanas', 'Šokių aikštelė ir apranga'],
  }),
  mt: makeCompactPack({
    badge: 'Poster Uffiċjali tal-Avveniment', targetPrefix: 'Udjenza', outfitPrefix: 'Ilbies',
    couples: 'Koppji romantiċi u mistednin VIP (25–45 sena)', singles: 'Singles u gruppi ta’ ħbieb (23–38 sena)',
    over30: 'Udjenza eleganti 30+ / 40+', families: 'Familji bit-tfal fil-gala dinner',
    young: 'Żgħażagħ u dilettanti tal-klabbs (20–32 sena)', fashion: 'Pubbliku internazzjonali tal-moda u VIP (24–40 sena)',
    dressElegant: 'Ilbies formali, tuxedo jew libsa ta’ filgħaxija', dressParty: 'Libsa tal-festa u libsa skura',
    dressUrban: 'Stil urban modern għall-klabb', dressSpa: 'Ġagaga bajda tal-ispa jew stil Alpin',
    shots: ['Sala prinċipali u atmosfera', 'Ikla tal-gala u merħba', 'Imwejjed VIP Privé u xampanja', 'Żona taż-żfin u dress code'],
  }),
  sk: makeEuroCompact({
    badge: 'Oficiálny plagát podujatia', targetPrefix: 'Publikum', outfitPrefix: 'Oblečenie',
    couples: 'Páry a VIP hostia (25–45 r.)', singles: 'Jednotlivci a skupiny priateľov (23–38 r.)',
    over30: 'Elegantné publikum 30+ / 40+', families: 'Rodiny s deťmi na galavečeri',
    young: 'Mladí návštevníci klubov (20–32 r.)', fashion: 'Medzinárodná módna klientela a VIP stoly (24–40 r.)',
    dressElegant: 'Spoločenský oblek, smoking alebo večerné šaty', dressParty: 'Slávnostné šaty s flitrami a tmavý oblek',
    dressUrban: 'Štýlové mestské klubové oblečenie', dressSpa: 'Biely wellness župan alebo alpský štýl',
    shots: ['Hlavná sála a atmosféra', 'Galavečera a privítanie', 'VIP Privé stoly a šampanské', 'Tanečný parket a outfit'],
  }),
  sl: makeCompactPack({
    badge: 'Uradni plakat dogodka', targetPrefix: 'Občinstvo', outfitPrefix: 'Obleka',
    couples: 'Romantični pari in VIP gosti (25–45 let)', singles: 'Samski in družbe prijateljev (23–38 let)',
    over30: 'Elegantno občinstvo 30+ / 40+', families: 'Družine z otroki na gala večerji',
    young: 'Mladi ljubitelji klubov (20–32 let)', fashion: 'Mednarodna modna publika in VIP mize (24–40 let)',
    dressElegant: 'Smoking, večerna obleka ali eleganten suknjič', dressParty: 'Večerna bleščeča obleka in temna obleka',
    dressUrban: 'Sodoben urbani klubski slog', dressSpa: 'Beli spa kopalni plašč ali alpski slog',
    shots: ['Glavna dvorana in vzdušje', 'Gala večerja in sprejem', 'VIP Privé mize in šampanjec', 'Plesišče in dress code'],
  }),
  sv: makeCompactPack({
    badge: 'Officiell evenemangsaffisch', targetPrefix: 'Målgrupp', outfitPrefix: 'Klädkod',
    couples: 'Romantiska par & VIP-gäster (25–45 år)', singles: 'Singlar & vängrupper (23–38 år)',
    over30: 'Stilren publik 30+ / 40+', families: 'Familjer med barn på galamiddag',
    young: 'Unga klubbesökare & DJ-fans (20–32 år)', fashion: 'Internationell modepublik & VIP-bord (24–40 år)',
    dressElegant: 'Smoking, lång aftonklänning eller skräddad kavaj', dressParty: 'Festlig aftonklänning & mörk kostym',
    dressUrban: 'Stilren urban klubbklädsel', dressSpa: 'Lyxig spabadrock eller alpin stil',
    shots: ['Huvudsal & atmosfär', 'Galamiddag & välkomst', 'VIP Privé-bord & champagne', 'Dansgolv & klädkod'],
  }),
  no: makeCompactPack({
    badge: 'Offisiell arrangementsplakat', targetPrefix: 'Målgruppe', outfitPrefix: 'Kleskode',
    couples: 'Romantiske par & VIP-gjester (25–45 år)', singles: 'Single & vennegrupper (23–38 år)',
    over30: 'Stilfullt publikum 30+ / 40+', families: 'Familier med barn på galamiddag',
    young: 'Unge klubbgjester & musikkfans (20–32 år)', fashion: 'Internasjonalt motepublikum & VIP-bord (24–40 år)',
    dressElegant: 'Smoking, lang aftenkjole eller dressjakke', dressParty: 'Festkjole med paljetter & mørk dress',
    dressUrban: 'Moderne urban klubbstil', dressSpa: 'Luksus spabadekåpe eller alpin stil',
    shots: ['Hovedsal & stemning', 'Galamiddag & mottakelse', 'VIP Privé-bord & champagne', 'Dansegulv & antrekk'],
  }),
  is: makeCompactPack({
    badge: 'Opinbert veggspjald viðburðar', targetPrefix: 'Markhópur', outfitPrefix: 'Klæðnaður',
    couples: 'Pör og VIP-gestir (25–45 ára)', singles: 'Einstaklingar og vinahópar (23–38 ára)',
    over30: 'Glæsilegur hópur 30+ / 40+', families: 'Fjölskyldur með börn í hátíðarkvöldverði',
    young: 'Ungir klúbbgestir (20–32 ára)', fashion: 'Alþjóðlegur tískuhópur og VIP-borð (24–40 ára)',
    dressElegant: 'Svarföt, síðkjóll eða sérsniðinn jakki', dressParty: 'Hátíðarkjóll og dökk jakkaföt',
    dressUrban: 'Nútímalegur borgarklúbbaklæðnaður', dressSpa: 'Heilsulindarsloppur eða alpaskíðatíska',
    shots: ['Aðalsalur og stemning', 'Hátíðarkvöldverður', 'VIP Privé borð og kampavín', 'Dansgólf og klæðaburður'],
  }),
  uk: makeCompactPack({
    badge: 'Офіційна афіша події', targetPrefix: 'Аудиторія', outfitPrefix: 'Дрес-код',
    couples: 'Романтичні пари та VIP-гості (25–45 р.)', singles: 'Компанії друзів та соло-гості (23–38 р.)',
    over30: 'Елегантна публіка 30+ / 40+', families: 'Сім’ї з дітьми на гала-вечері',
    young: 'Молодь та поціновувачі музики (20–32 р.)', fashion: 'Міжнародна фешн-публіка та VIP-столи (24–40 р.)',
    dressElegant: 'Вечірній дрес-код, смокінг або довга сукня', dressParty: 'Святкова вечірня сукня та темний костюм',
    dressUrban: 'Стильний міський клубний образ', dressSpa: 'Білий спа-халат або альпійський стиль',
    shots: ['Головна зала та атмосфера', 'Гала-вечеря та прийом', 'VIP Privé столи та шампанське', 'Танцпол і вечірній образ'],
  }),
  sq: makeCompactPack({
    badge: 'Posteri Zyrtar i Ngjarjes', targetPrefix: 'Publiku', outfitPrefix: 'Veshja',
    couples: 'Çifte romantike dhe VIP (25–45 vjeç)', singles: 'Beqarë dhe grupe miqsh (23–38 vjeç)',
    over30: 'Publik elegant 30+ / 40+', families: 'Familje me fëmijë në darkën gala',
    young: 'Të rinj dhe adhurues të muzikës (20–32 vjeç)', fashion: 'Publik ndërkombëtar mode dhe tavolina VIP (24–40)',
    dressElegant: 'Black Tie smoking, fustan mbrëmjeje ose xhaketë elegante', dressParty: 'Fustan festiv dhe kostum i errët',
    dressUrban: 'Stil urban modern për klub', dressSpa: 'Rrobë banje spa luksoze ose stil alpin',
    shots: ['Salla kryesore dhe atmosfera', 'Darka gala dhe pritja', 'Tavolina VIP Privé dhe shampanjë', 'Pista e vallëzimit dhe veshja'],
  }),
  sr: makeCompactPack({
    badge: 'Zvanični plakat događaja', targetPrefix: 'Publika', outfitPrefix: 'Dress code',
    couples: 'Romantični parovi i VIP gosti (25–45 god.)', singles: 'Samci i društva prijatelja (23–38 god.)',
    over30: 'Elegantna publika 30+ / 40+', families: 'Porodice sa decom na gala večeri',
    young: 'Mladi ljubitelji klubova (20–32 god.)', fashion: 'Međunarodna modna publika i VIP stolovi (24–40)',
    dressElegant: 'Smoking, duga večernja haljina ili svečani sako', dressParty: 'Svečana haljina i tamno odelo',
    dressUrban: 'Moderan urbani klupski stil', dressSpa: 'Beli spa ogrtač ili alpski stil',
    shots: ['Glavna sala i atmosfera', 'Gala večera i doček', 'VIP Privé stolovi i šampanjac', 'Podijum i dress code'],
  }),
  bs: makeCompactPack({
    badge: 'Zvanični plakat događaja', targetPrefix: 'Publika', outfitPrefix: 'Odjeća',
    couples: 'Romantični parovi i VIP gosti (25–45 god.)', singles: 'Samci i grupe prijatelja (23–38 god.)',
    over30: 'Elegantna publika 30+ / 40+', families: 'Porodice s djecom na gala večeri',
    young: 'Mladi ljubitelji klubova (20–32 god.)', fashion: 'Međunarodna modna publika i VIP stolovi (24–40)',
    dressElegant: 'Black Tie smoking, svečana haljina ili sako', dressParty: 'Svečana haljina i tamno odijelo',
    dressUrban: 'Moderan urbani klupski stil', dressSpa: 'Bijeli spa ogrtač ili alpski stil',
    shots: ['Glavna sala i atmosfera', 'Gala večera i prijem', 'VIP Privé stolovi i šampanjac', 'Plesni podij i dress code'],
  }),
  mk: makeCompactPack({
    badge: 'Официјален плакат на настанот', targetPrefix: 'Публика', outfitPrefix: 'Дрес-код',
    couples: 'Романтични парови и VIP гости (25–45 г.)', singles: 'Друштва и сингл гости (23–38 г.)',
    over30: 'Елегантна публика 30+ / 40+', families: 'Семејства со деца на гала вечера',
    young: 'Млади љубители на клубови (20–32 г.)', fashion: 'Меѓународна модна публика и VIP маси (24–40 г.)',
    dressElegant: 'Смокинг, долг вечерен фустан или елегантно сако', dressParty: 'Свечен фустан и темен костум',
    dressUrban: 'Модерен урбан клубски стил', dressSpa: 'Бел спа бањарка или алпски стил',
    shots: ['Главна сала и атмосфера', 'Гала вечера и пречек', 'VIP Privé маси и шампањ', 'Подиум за танц и дрес-код'],
  }),
};

function makeEuroCompact(s: CompactBaseSeed): CompactSeoLocaleOverride {
  return makeCompactPack(s);
}

// Bespoke native UX copy for top languages + clean native builders for all 33 non-IT/EN locales
const BESPOKE_UX: Record<string, UxCopyBlock> = {
  es: {
    tldrBadge: 'EN RESUMEN · 5 PUNTOS CLAVE DEL EVENTO',
    tldrHeadingTpl: '{h1} - Guía Rápida y Resumen Oficial',
    tldrLabels: ['1. Público y Edad', '2. Música y Formato', '3. Dress Code y Outfit', '4. Entradas y Mesas VIP', '5. Concierge Oficial Directo'],
    tldrPricesVal: 'Lista / Preventa Salta-Filas · Mesas VIP desde €300 (6–8 personas, ~€38–€50/pers. con crédito en botellas)',
    tldrConciergeVal: 'WhatsApp +39 351 912 7047 · WWW.NIGHTLIFEMILAN.COM (Sin comisiones de agencia)',
    formulaCta: 'Reserva este paquete por WhatsApp →',
    vipEyebrow: 'CALCULADORA INTERACTIVA DE MESA VIP Y BOTELLAS',
    vipHeadingTpl: 'Calcula el Coste por Persona de tu Mesa VIP - {venue}',
    vipSub: 'Divide una mesa VIP con tu grupo: acceso prioritario sin colas, zona reservada toda la noche y 100% del importe en botellas.',
    vipZones: ['Mesa VIP Pista', 'Mesa Privé Elevada', 'Mesa Super Privé VIP', 'Mesa Cabina DJ / Backstage'],
    vipInclusions: [
      '1 Botella Premium o Champagne + 6–8 Pases VIP Salta-Filas',
      '2 Botellas Premium o 1 Magnum + 8–10 Pases VIP',
      'Dom Pérignon / Botellas Lujo + 10–12 Pases Super Privé',
      'Mesa Junto al DJ + Desfile de Botellas (12–15 Pases VIP)',
    ],
    upsellTitle: '¿Por qué para grupos de 6+ conviene una Mesa VIP antes que entradas sueltas?',
    upsellBody: 'Entre entrada general (€20–€30), guardarropa y segunda copa (€15–€20), ya gastas €40–€50 por persona esperando fila. Con una Mesa VIP de €300 entre 6–8 amigos pagas lo mismo (€38–€50/pers.) con acceso prioritario y mesa con botella toda la noche.',
    vipCtaBtn: 'Solicitar Presupuesto Mesa VIP por WhatsApp (+39 351 912 7047) →',
    dressHeadingTpl: 'Control Rápido de Dress Code y Admisión - {venue}',
    dressOkTitle: '✅ Outfit Recomendado (Acceso Fluido)',
    dressOkExtra1: 'Camisa, americana elegante o vestido de noche con calzado cuidado',
    dressOkExtra2: 'Grupos mixtos o reserva nominal confirmada por WhatsApp Concierge',
    dressNoTitle: '❌ Evitar en Puerta (Riesgo de No Admisión)',
    dressNoItems: ['Chándal, pantalones cortos deportivos o sudaderas técnicas', 'Gorras deportivas, riñoneras cruzadas o chanclas', 'Grupos grandes exclusivamente masculinos sin mesa VIP'],
    logHeadingTpl: 'Logística Nocturna: Cómo Llegar y Volver a las 04:00 - {venue}',
    logLabels: ['Metro y Autobuses Nocturnos ATM', 'Taxis Oficiales y Chófer', 'Parking y Zonas ZTL'],
    logTexts: [
      'Metro M1/M2/M3/M4/M5 hasta las 00:30 + Líneas Nocturnas ATM (NM1–NM4) activas toda la noche.',
      'Parada de taxi oficial a menos de 100m (Radiotaxi +39 02 4040 / +39 02 6969) o traslado privado.',
      'Parkings vigilados 24h cercanos; revisa las cámaras de Area C y ZTL nocturna si vienes en coche.',
    ],
    privBadge: 'GRADUACIONES · CUMPLEAÑOS · EVENTOS CORPORATIVOS · FASHION WEEK',
    privHeadingTpl: 'Fiestas Privadas, Cumpleaños y Eventos de Empresa en {venue}',
    privBody: '¿Organizas una graduación, un 30º cumpleaños o un evento corporativo durante la Milan Fashion Week o Fuorisalone? Paquetes a medida con zona Privé, aperitivo, cena y servicio de botellas.',
    privCta: 'Pedir Presupuesto Evento Privado por WhatsApp →',
    nfEyebrow: 'BUSCADOR DE NOCHE EN MILÁN EN 3 CLICS',
    nfHeading: 'Encuentra Tu Plan Ideal en Milán en 3 Clics',
    nfSub: 'Filtra por fecha, género musical o fórmula de acceso, o escribe a nuestro Concierge 24/7 por WhatsApp.',
    nfSteps: ['1. ¿Cuándo sales?', '2. ¿Qué música buscas?', '3. ¿Qué formato prefieres?'],
    nfChips1: ['Esta Noche en Milán', 'Este Fin de Semana', 'Especial Halloween 2026', 'Nochevieja 2027 (126 Eventos)'],
    nfChips2: ['House, Rooftop y Lujo', 'Hip-Hop, Reggaeton y Urbano', 'Techno y Club Electrónico', 'Cena Cantada y Público +30'],
    nfChips3: ['Lista y Entradas', 'Mesa Aperitivo Royal', 'Mesa VIP Privé y Botellas'],
    nfWaCta: 'Recomendación en 60s por WhatsApp (+39 351 912 7047) →',
  },
  fr: {
    tldrBadge: 'EN BREF · 5 POINTS CLÉS DE LA SOIRÉE',
    tldrHeadingTpl: '{h1} - Résumé Rapide & Guide Officiel',
    tldrLabels: ['1. Public & Âge', '2. Musique & Format', '3. Dress Code & Tenue', '4. Billets & Tables VIP', '5. Conciergerie Officielle Directe'],
    tldrPricesVal: 'Liste / Prévente Coupe-File · Tables VIP dès €300 (6–8 pers., ~€38–€50/pers. crédit bouteilles inclus)',
    tldrConciergeVal: 'WhatsApp +39 351 912 7047 · WWW.NIGHTLIFEMILAN.COM (Zéro frais d’agence)',
    formulaCta: 'Réserver cette formule sur WhatsApp →',
    vipEyebrow: 'SIMULATEUR INTERACTIF TABLE VIP & BOUTEILLES',
    vipHeadingTpl: 'Calculez le Tarif par Personne de Votre Table VIP - {venue}',
    vipSub: 'Partagez une table VIP entre amis : entrée coupe-file immédiate, place assise toute la nuit et 100% du minimum converti en bouteilles.',
    vipZones: ['Table VIP Piste', 'Table Privé Surélevée', 'Table Super Privé VIP', 'Table Cabine DJ / Backstage'],
    vipInclusions: [
      '1 Bouteille Spiritueux Premium ou Champagne + 6–8 Pass VIP',
      '2 Bouteilles Premium ou 1 Magnum + 8–10 Pass VIP',
      'Dom Pérignon / Bouteilles Prestige + 10–12 Pass Super Privé',
      'Table Côté DJ + Show Bouteilles (12–15 Pass VIP)',
    ],
    upsellTitle: 'Pourquoi une Table VIP est plus avantageuse à partir de 6 personnes ?',
    upsellBody: 'Entre l’entrée (€20–€30), le vestiaire et un verre au bar (€15–€20), vous dépensez déjà €40–€50 par personne debout. À €300 pour 6–8 amis, la Table VIP coûte le même prix (€38–€50/pers.) avec entrée prioritaire et bouteilles servies à table.',
    vipCtaBtn: 'Bloquer ce Devis Table VIP sur WhatsApp (+39 351 912 7047) →',
    dressHeadingTpl: 'Vérification Dress Code & Sélection à l’Entrée - {venue}',
    dressOkTitle: '✅ Tenue Recommandée (Accès Facilité)',
    dressOkExtra1: 'Chemise, blazer cintré ou robe de soirée habillée avec chaussures de ville',
    dressOkExtra2: 'Groupes mixtes ou réservation nominative confirmée via Conciergerie WhatsApp',
    dressNoTitle: '❌ À Éviter à l’Entrée (Risque de Refus)',
    dressNoItems: ['Survêtements, shorts de sport ou sweats à capuche techniques', 'Casquettes de sport, sacoches bandoulière ou claquettes', 'Grands groupes exclusivement masculins sans table VIP réservée'],
    logHeadingTpl: 'Logistique Nocturne : Accès & Retour à 04h00 - {venue}',
    logLabels: ['Métro & Bus de Nuit ATM', 'Taxis Officiels & Chauffeur', 'Parkings & Zones ZTL'],
    logTexts: [
      'Métro M1/M2/M3/M4/M5 jusqu’à 00h30 + Bus de nuit ATM (NM1–NM4) en service toute la nuit.',
      'Station de taxi officielle à 100m (Radiotaxi +39 02 4040 / +39 02 6969) ou chauffeur privé.',
      'Parkings surveillés 24h/24 à proximité ; attention aux caméras Area C et ZTL nocturnes en voiture.',
    ],
    privBadge: 'DIPLÔMES · ANNIVERSAIRES · ÉVÉNEMENTS CORPORATE · FASHION WEEK',
    privHeadingTpl: 'Soirées Privées, Anniversaires & Événements d’Entreprise chez {venue}',
    privBody: 'Vous organisez un anniversaire, un enterrement de vie ou une soirée corporate pendant la Fashion Week ou le Fuorisalone ? Formules sur mesure avec espace Privé, dîner ou apéritivo royal et bouteilles.',
    privCta: 'Demander un Devis Événement Privé sur WhatsApp →',
    nfEyebrow: 'TROUVEZ VOTRE SOIRÉE À MILAN EN 3 CLICS',
    nfHeading: 'Trouvez Votre Soirée Idéale à Milan en 3 Clics',
    nfSub: 'Filtrez par date, style musical ou formule d’accès, ou contactez notre Conciergerie 24/7 sur WhatsApp.',
    nfSteps: ['1. Quand sortez-vous ?', '2. Quelle musique cherchez-vous ?', '3. Quelle formule préférez-vous ?'],
    nfChips1: ['Ce Soir à Milan', 'Ce Week-end', 'Spécial Halloween 2026', 'Nouvel An 2027 (126 Événements)'],
    nfChips2: ['House, Rooftop & Luxe', 'Hip-Hop, Reggaeton & Urban', 'Techno & Club Électro', 'Dîner Chantant & Public 30+'],
    nfChips3: ['Liste & Préventes', 'Apéritivo Royal avec Table', 'Table VIP Privé & Bouteilles'],
    nfWaCta: 'Conseil sur mesure en 60s sur WhatsApp (+39 351 912 7047) →',
  },
  de: {
    tldrBadge: 'KURZÜBERSICHT · 5 WICHTIGE EVENT-FAKTEN',
    tldrHeadingTpl: '{h1} - Schnellguide & Offizielle Buchungsinfo',
    tldrLabels: ['1. Publikum & Alter', '2. Musik & Format', '3. Dresscode & Outfit', '4. Tickets & VIP-Tische', '5. Offizieller Direkt-Concierge'],
    tldrPricesVal: 'Gästeliste / Skip-the-Line Tickets · VIP-Tische ab €300 (6–8 Personen, ~€38–€50/Pers. inkl. Flaschenguthaben)',
    tldrConciergeVal: 'WhatsApp +39 351 912 7047 · WWW.NIGHTLIFEMILAN.COM (Ohne Agenturaufschlag)',
    formulaCta: 'Dieses Paket per WhatsApp anfragen →',
    vipEyebrow: 'INTERAKTIVER VIP-TISCH- & FLASCHENRECHNER',
    vipHeadingTpl: 'Berechnen Sie den Preis pro Person für Ihren VIP-Tisch - {venue}',
    vipSub: 'Teilen Sie einen VIP-Tisch in Ihrer Gruppe: sofortiger VIP-Einlass ohne Schlange, reservierter Bereich die ganze Nacht und 100% Flaschenwert.',
    vipZones: ['Dancefloor VIP-Tisch', 'Erhöhter Privé-Tisch', 'Super-Privé VIP-Tisch', 'DJ-Booth / Backstage-Tisch'],
    vipInclusions: [
      '1 Premium-Flasche oder Champagner + 6–8 VIP-Fast-Track-Pässe',
      '2 Premium-Flaschen oder 1 Magnum + 8–10 VIP-Pässe',
      'Dom Pérignon / Prestige-Flaschen + 10–12 Super-Privé-Pässe',
      'Top-Tisch am DJ-Pult + Show-Service (12–15 VIP-Pässe)',
    ],
    upsellTitle: 'Warum sich ein VIP-Tisch ab 6 Freunden mehr lohnt als Einzeltickets',
    upsellBody: 'Mit Eintritt (€20–€30), Garderobe und einem zweiten Drink (€15–€20) geben Sie ohnehin €40–€50 pro Person im Stehen aus. Ein €300-VIP-Tisch für 6–8 Freunde kostet dasselbe (€38–€50/Pers.) mit Priority-Einlass und eigenem Tisch.',
    vipCtaBtn: 'VIP-Tisch-Angebot per WhatsApp sichern (+39 351 912 7047) →',
    dressHeadingTpl: 'Dresscode-Check & Einlassregeln - {venue}',
    dressOkTitle: '✅ Empfohlenes Outfit (Problemloser Einlass)',
    dressOkExtra1: 'Hemd, taillierter Blazer oder elegantes Abendkleid mit gepflegten Schuhen',
    dressOkExtra2: 'Gemischte Gruppen oder bestätigte Gästeliste über unseren WhatsApp-Concierge',
    dressNoTitle: '❌ Am Eingang vermeiden (Einlassrisiko)',
    dressNoItems: ['Trainingsanzüge, Sportshorts oder Funktions-Hoodies', 'Baseballcaps, Sport-Bauchtaschen oder Flip-Flops', 'Größere reine Männergruppen ohne reservierten VIP-Tisch'],
    logHeadingTpl: 'Nacht-Logistik: Anfahrt & Rückweg um 04:00 Uhr - {venue}',
    logLabels: ['Metro & ATM-Nachtlinien', 'Offizielle Taxis & Chauffeur', 'Parken & ZTL-Kameras'],
    logTexts: [
      'Metro M1/M2/M3/M4/M5 bis 00:30 Uhr + ATM-Nachtbusse (NM1–NM4) durchgehend die ganze Nacht.',
      'Offizieller Taxistand in 100m Entfernung (Radiotaxi +39 02 4040 / +39 02 6969) oder privater Fahrdienst.',
      'Bewachte 24h-Parkhäuser in der Nähe; bitte Mailänder Area C und nächtliche ZTL-Zonen beachten.',
    ],
    privBadge: 'ABSCHLUSSFEIERN · GEBURTSTAGE · FIRMENEWENTS · FASHION WEEK',
    privHeadingTpl: 'Privatpartys, Geburtstage & Firmenevents im {venue}',
    privBody: 'Planen Sie einen 30. Geburtstag, eine Abschlussfeier oder ein Firmenevent während der Milan Fashion Week oder Design Week? Maßgeschneiderte Pakete mit eigenem Privé-Bereich, Dinner oder Aperitivo.',
    privCta: 'Privat- / Firmenevent per WhatsApp anfragen →',
    nfEyebrow: 'MAILAND NIGHT FINDER IN 3 KLICKS',
    nfHeading: 'Finden Sie Ihre perfekte Mailänder Nacht in 3 Klicks',
    nfSub: 'Filtern Sie nach Datum, Musikstil oder Einlassart oder fragen Sie direkt unseren 24/7 WhatsApp-Concierge.',
    nfSteps: ['1. Wann gehen Sie aus?', '2. Welche Musikrichtung?', '3. Welche Buchungsart?'],
    nfChips1: ['Heute Nacht in Mailand', 'Dieses Wochenende', 'Halloween-Special 2026', 'Silvester 2027 (126 Events)'],
    nfChips2: ['House, Rooftop & Luxury', 'Hip-Hop, Reggaeton & Urban', 'Techno & Elektronik-Club', 'Dinner Show & 30+ Publikum'],
    nfChips3: ['Gästeliste & Tickets', 'Royal Aperitivo mit Tisch', 'VIP Privé Tisch & Flaschen'],
    nfWaCta: 'Passende Empfehlung in 60s per WhatsApp (+39 351 912 7047) →',
  },
  pt: {
    tldrBadge: 'RESUMO RÁPIDO · 5 PONTOS-CHAVE DO EVENTO',
    tldrHeadingTpl: '{h1} - Resumo Oficial e Guia de Reserva',
    tldrLabels: ['1. Público e Idade', '2. Música e Formato', '3. Dress Code e Look', '4. Ingressos e Mesas VIP', '5. Concierge Oficial Direto'],
    tldrPricesVal: 'Lista / Ingresso Sem Fila · Mesas VIP a partir de €300 (6–8 pessoas, ~€38–€50/pessoa em consumo)',
    tldrConciergeVal: 'WhatsApp +39 351 912 7047 · WWW.NIGHTLIFEMILAN.COM (Sem taxas de agência)',
    formulaCta: 'Reservar este pacote no WhatsApp →',
    vipEyebrow: 'CALCULADORA INTERATIVA DE MESA VIP E GARRAFAS',
    vipHeadingTpl: 'Calcule o Valor por Pessoa da Mesa VIP - {venue}',
    vipSub: 'Divida uma mesa VIP com amigos: acesso prioritário sem fila, área reservada a noite toda e 100% em garrafas.',
    vipZones: ['Mesa VIP Pista', 'Mesa Privé Elevada', 'Mesa Super Privé VIP', 'Mesa Cabine DJ / Backstage'],
    vipInclusions: [
      '1 Garrafa Premium ou Champagne + 6–8 Passes VIP',
      '2 Garrafas Premium ou 1 Magnum + 8–10 Passes VIP',
      'Dom Pérignon / Rótulos Luxo + 10–12 Passes Super Privé',
      'Mesa ao Lado do DJ + Show de Garrafas (12–15 Passes VIP)',
    ],
    upsellTitle: 'Por que a Mesa VIP compensa mais do que ingressos individuais para 6+ amigos?',
    upsellBody: 'Entre ingresso (€20–€30), chapelaria e segundo drink (€15–€20), você já gasta €40–€50 em pé. Dividindo uma mesa de €300 em 6–8 amigos sai o mesmo valor (€38–€50/pessoa) com entrada VIP imediata e garrafas incluídas.',
    vipCtaBtn: 'Garantir Cotação de Mesa VIP no WhatsApp (+39 351 912 7047) →',
    dressHeadingTpl: 'Guia Rápido de Dress Code e Porta - {venue}',
    dressOkTitle: '✅ Visual Recomendado (Entrada Facilitada)',
    dressOkExtra1: 'Camisa, blazer elegante ou vestido de noite com calçado social',
    dressOkExtra2: 'Grupos mistos ou reserva confirmada via Concierge WhatsApp',
    dressNoTitle: '❌ Evitar na Porta (Risco de Recusa)',
    dressNoItems: ['Agasalhos esportivos, bermudas ou moletons esportivos', 'Bonés, pochetes esportivas ou chinelos', 'Grupos grandes apenas masculinos sem mesa VIP'],
    logHeadingTpl: 'Logística Noturna: Como Chegar e Voltar às 04:00 - {venue}',
    logLabels: ['Metrô e Ônibus Noturnos ATM', 'Táxis Oficiais e Motorista', 'Estacionamento e Zonas ZTL'],
    logTexts: [
      'Metrô M1/M2/M3/M4/M5 até 00h30 + Linhas Noturnas ATM (NM1–NM4) toda a madrugada.',
      'Ponto de táxi oficial a 100m (Radiotaxi +39 02 4040 / +39 02 6969) ou transfer privativo.',
      'Garagens 24h próximas; atenção às câmeras da Area C e ZTL noturna se for de carro.',
    ],
    privBadge: 'FORMATURAS · ANIVERSÁRIOS · EVENTOS CORPORATIVOS · FASHION WEEK',
    privHeadingTpl: 'Festas Privadas, Aniversários e Eventos Corporativos no {venue}',
    privBody: 'Planejando aniversário, formatura ou festa corporativa na Milan Fashion Week ou Fuorisalone? Pacotes sob medida com área Privé, jantar ou aperitivo e garrafas.',
    privCta: 'Pedir Orçamento Festa Privada no WhatsApp →',
    nfEyebrow: 'BUSCADOR DE NOITE EM MILÃO EM 3 CLIQUES',
    nfHeading: 'Encontre Sua Noite Perfeita em Milão em 3 Cliques',
    nfSub: 'Filtre por data, estilo musical ou tipo de entrada, ou fale com nosso Concierge 24/7 no WhatsApp.',
    nfSteps: ['1. Quando quer sair?', '2. Qual estilo musical?', '3. Qual formato prefere?'],
    nfChips1: ['Hoje em Milão', 'Este Fim de Semana', 'Especial Halloween 2026', 'Réveillon 2027 (126 Eventos)'],
    nfChips2: ['House, Rooftop e Luxo', 'Hip-Hop, Reggaeton e Urbano', 'Techno e Clube Eletrônico', 'Jantar Cantado e Público 30+'],
    nfChips3: ['Lista e Ingressos', 'Mesa Aperitivo Royal', 'Mesa VIP Privé e Garrafas'],
    nfWaCta: 'Recomendação em 60s no WhatsApp (+39 351 912 7047) →',
  },
};

export function getUxCopyForLocale35(locale: string, _enBase: UxCopyBlock): UxCopyBlock | undefined {
  if (BESPOKE_UX[locale]) return BESPOKE_UX[locale];
  if (locale === 'it' || locale === 'en') return undefined;
  const w = getWords35(locale);
  const comp = COMPACT_LOCALE_OVERRIDES_22[locale];
  const cats125 = w.cats['capodanno-2027']?.label || '2027';
  const vipLbl = w.formulas['tavolo-vip'];
  return {
    tldrBadge: `${w.verifiedEventsLabel} · 5`,
    tldrHeadingTpl: `{h1} · ${w.quickGuideLabel}`,
    tldrLabels: [
      `1. ${comp?.targetPrefix || w.audiences.all}`,
      `2. ${w.musicLabel}`,
      `3. ${w.dressCodeLabel}`,
      `4. ${w.colPrices}`,
      `5. WhatsApp ${SITE_CONTACT.whatsapp.number}`,
    ],
    tldrPricesVal: `${w.formulas.dopocena} · ${vipLbl} ${w.fromPricePrefix} €300 (6–8 ${w.guestPlural})`,
    tldrConciergeVal: `WhatsApp +39 351 912 7047 · WWW.NIGHTLIFEMILAN.COM`,
    formulaCta: `${w.viewPackagesCta}`,
    vipEyebrow: `${vipLbl.toUpperCase()}`,
    vipHeadingTpl: `${vipLbl} - {venue}`,
    vipSub: w.freeAdviceTpl,
    vipZones: [
      `${vipLbl} · €300`,
      `${vipLbl} Privé · €600`,
      `Super Privé VIP · €1.000`,
      `Console DJ VIP · €1.500`,
    ],
    vipInclusions: [
      `€300 · 6–8 ${w.guestPlural} · ${vipLbl}`,
      `€600 · 8–10 ${w.guestPlural} · ${vipLbl}`,
      `€1.000 · 10–12 ${w.guestPlural} · Super Privé`,
      `€1.500 · 12–15 ${w.guestPlural} · Console DJ`,
    ],
    upsellTitle: `6+ ${w.guestPlural}: ${vipLbl} (€38–€50 / ${w.guestSingular})`,
    upsellBody: `${vipLbl} €300 / 6–8 ${w.guestPlural} = €38–€50 / ${w.guestSingular} · ${w.freeAdviceTpl}.`,
    vipCtaBtn: `WhatsApp +39 351 912 7047 →`,
    dressHeadingTpl: `${w.dressCodeLabel} - {venue}`,
    dressOkTitle: `✅ ${comp?.outfitPrefix || w.dressCodeLabel}`,
    dressOkExtra1: comp?.couture || w.dressCodeLabel,
    dressOkExtra2: `WhatsApp +39 351 912 7047`,
    dressNoTitle: `❌ ${w.dressCodeLabel}`,
    dressNoItems: [
      `${w.dressCodeLabel}: ${comp?.smart || w.verifiedEventsLabel}`,
      `WhatsApp +39 351 912 7047`,
      vipLbl,
    ],
    logHeadingTpl: `${w.mapHeadingEvent} - {venue}`,
    logLabels: ['Metro ATM (M1–M5 · NM1–NM4)', 'Radiotaxi Milano (+39 02 4040)', 'Area C · ZTL Milano'],
    logTexts: [
      'Metro M1/M2/M3/M4/M5 (00:30) + ATM NM1/NM2/NM3/NM4.',
      'Radiotaxi Milano +39 02 4040 / +39 02 6969 / +39 02 8585.',
      `${w.addressLabel} Area C & ZTL Milano.`,
    ],
    privBadge: `VIP · ${w.eventsBreadcrumb.toUpperCase()}`,
    privHeadingTpl: `${w.eventsBreadcrumb} & ${vipLbl} - {venue}`,
    privBody: w.bookingSubtitle,
    privCta: `${w.whatsappLabel} →`,
    nfEyebrow: w.filterEyebrow,
    nfHeading: `${w.eventsBreadcrumb} Milano`,
    nfSub: w.bookingSubtitle,
    nfSteps: [`1. ${w.dateBadge}`, `2. ${w.musicLabel}`, `3. ${w.lblFormula}`],
    nfChips1: [
      `${w.eventsBreadcrumb} Milano`,
      `Milano · 31/12`,
      `Halloween 2026`,
      cats125,
    ],
    nfChips2: [
      w.music['commerciale-house'],
      w.music['latino-urban'],
      w.music['techno-elettronica'],
      w.music['cena-cantata-live'],
    ],
    nfChips3: [
      w.formulas.dopocena,
      w.formulas.buffet,
      vipLbl,
    ],
    nfWaCta: `WhatsApp +39 351 912 7047 →`,
  };
}
