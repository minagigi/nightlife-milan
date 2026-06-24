export default function PricingGrid({ lang }: { lang: string }) {
  const t = {
    en: {
      title: 'Pricing & VIP Packages',
      aperitif: 'Aperitif + 1 Drink',
      club: 'Club Ticket + 1 Drink',
      danceFloor: 'Dance Floor Table (5-10 pax)',
      central: 'Central Table (10 pax)',
      djFront: 'DJ Front Table (15 pax)',
      djTable: 'DJ Table (The Ultimate VIP)',
      entry: 'Entry 19:30',
      entryClub: 'Entry 22:30',
      minSpend: 'Minimum Spend'
    },
    it: {
      title: 'Prezzi & Pacchetti VIP',
      aperitif: 'Aperitivo + 1 Drink',
      club: 'Ingresso Club + 1 Drink',
      danceFloor: 'Tavolo Dance Floor (5-10 pax)',
      central: 'Tavolo Centrale (10 pax)',
      djFront: 'Tavolo DJ Front (15 pax)',
      djTable: 'Tavolo DJ (The Ultimate VIP)',
      entry: 'Ingresso 19:30',
      entryClub: 'Ingresso 22:30',
      minSpend: 'Consumazione Minima'
    }
  };

  const dict = t[lang === 'it' ? 'it' : 'en'];

  const packages = [
    { name: dict.aperitif, price: '€15.00', desc: dict.entry },
    { name: dict.club, price: '€15.00', desc: dict.entryClub },
    { name: dict.danceFloor, price: '€320 - €640', desc: dict.minSpend },
    { name: dict.central, price: '€1,280', desc: dict.minSpend },
    { name: dict.djFront, price: '€3,200', desc: dict.minSpend },
    { name: dict.djTable, price: '€5,000', desc: dict.minSpend },
  ];

  return (
    <div className="py-16">
      <h2 className="text-3xl font-serif font-bold text-champagne mb-12 text-center">{dict.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg, index) => (
          <div key={index} className="bg-white/[0.03] p-8 rounded-lg border border-white/10 hover:border-champagne/30 transition-all">
            <h3 className="text-xl font-bold text-white mb-4">{pkg.name}</h3>
            <p className="text-4xl font-serif text-champagne mb-2">{pkg.price}</p>
            <p className="text-sm text-white/40">{pkg.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
