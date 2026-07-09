'use client';

import { useState } from 'react';

/**
 * Grafici SVG leggeri per la dashboard /analytics — nessuna libreria esterna.
 * Serie singola per grafico (small multiples nella pagina): niente legenda
 * necessaria, il titolo del riquadro nomina la serie. Colore marchio champagne
 * su superficie scura del sito; testo sempre in token neutri, mai nel colore
 * della serie.
 */

const CHAMPAGNE = '#e8c987';

interface Point {
  label: string;
  value: number;
}

function niceMax(max: number): number {
  if (max <= 5) return 5;
  const pow = 10 ** Math.floor(Math.log10(max));
  return Math.ceil(max / pow) * pow;
}

/** Barre giornaliere con top arrotondato ancorato alla baseline. */
export function BarChart({ data, ariaLabel }: { data: Point[]; ariaLabel: string }) {
  const [hover, setHover] = useState<number | null>(null);

  if (data.length === 0 || data.every((d) => d.value === 0)) {
    return <p className="text-white/40 text-sm py-8 text-center">Nessun dato ancora — i contatori si riempiono con le prossime visite.</p>;
  }

  const W = 640;
  const H = 190;
  const PAD_L = 34;
  const PAD_B = 22;
  const plotW = W - PAD_L - 6;
  const plotH = H - PAD_B - 8;
  const max = niceMax(Math.max(...data.map((d) => d.value)));
  const n = data.length;
  const step = plotW / n;
  const barW = Math.max(2, Math.min(18, step - 2));
  const labelEvery = Math.max(1, Math.ceil(n / 7));

  const barPath = (x: number, y: number, w: number, h: number) => {
    const r = Math.min(3, w / 2, h);
    return `M${x},${y + h} V${y + r} Q${x},${y} ${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h} Z`;
  };

  return (
    <div className="relative" role="img" aria-label={ariaLabel}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {/* gridline max + baseline, recessive */}
        <line x1={PAD_L} x2={W - 6} y1={8} y2={8} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 4" />
        <line x1={PAD_L} x2={W - 6} y1={8 + plotH} y2={8 + plotH} stroke="rgba(255,255,255,0.18)" />
        <text x={PAD_L - 6} y={13} textAnchor="end" fontSize="10" fill="rgba(255,255,255,0.45)">{max}</text>
        <text x={PAD_L - 6} y={11 + plotH} textAnchor="end" fontSize="10" fill="rgba(255,255,255,0.45)">0</text>

        {data.map((d, i) => {
          const h = (d.value / max) * plotH;
          const x = PAD_L + i * step + (step - barW) / 2;
          const y = 8 + plotH - h;
          return (
            <g key={d.label}>
              {d.value > 0 && (
                <path d={barPath(x, y, barW, h)} fill={CHAMPAGNE} opacity={hover === null || hover === i ? 1 : 0.45} />
              )}
              {/* hit target a colonna piena, più grande del mark */}
              <rect
                x={PAD_L + i * step}
                y={0}
                width={step}
                height={H - PAD_B}
                fill="transparent"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              />
              {i % labelEvery === 0 && (
                <text x={PAD_L + i * step + step / 2} y={H - 6} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.45)">
                  {d.label.slice(5)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      {hover !== null && (
        <div
          className="absolute pointer-events-none bg-black/90 border border-champagne/30 rounded-lg px-3 py-1.5 text-xs text-white whitespace-nowrap -translate-x-1/2"
          style={{ left: `${((PAD_L + hover * step + step / 2) / W) * 100}%`, top: 0 }}
        >
          <span className="text-white/60">{data[hover].label}</span>{' '}
          <span className="font-bold text-champagne">{data[hover].value}</span>
        </div>
      )}
    </div>
  );
}

/** Linea (curva cumulativa, es. registrazioni Eventbrite nel tempo) con crosshair. */
export function LineChart({ data, ariaLabel }: { data: Point[]; ariaLabel: string }) {
  const [hover, setHover] = useState<number | null>(null);

  if (data.length < 2) {
    return <p className="text-white/40 text-sm py-8 text-center">Servono almeno due snapshot giornalieri per la curva — arrivano col cron notturno.</p>;
  }

  const W = 640;
  const H = 190;
  const PAD_L = 34;
  const PAD_B = 22;
  const plotW = W - PAD_L - 6;
  const plotH = H - PAD_B - 8;
  const max = niceMax(Math.max(...data.map((d) => d.value)));
  const n = data.length;
  const xAt = (i: number) => PAD_L + (i / (n - 1)) * plotW;
  const yAt = (v: number) => 8 + plotH - (v / max) * plotH;
  const labelEvery = Math.max(1, Math.ceil(n / 7));

  const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${xAt(i)},${yAt(d.value)}`).join(' ');
  const areaPath = `${linePath} L${xAt(n - 1)},${8 + plotH} L${xAt(0)},${8 + plotH} Z`;

  return (
    <div
      className="relative"
      role="img"
      aria-label={ariaLabel}
      onMouseLeave={() => setHover(null)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const px = ((e.clientX - rect.left) / rect.width) * W;
        const i = Math.round(((px - PAD_L) / plotW) * (n - 1));
        setHover(Math.max(0, Math.min(n - 1, i)));
      }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        <line x1={PAD_L} x2={W - 6} y1={8} y2={8} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 4" />
        <line x1={PAD_L} x2={W - 6} y1={8 + plotH} y2={8 + plotH} stroke="rgba(255,255,255,0.18)" />
        <text x={PAD_L - 6} y={13} textAnchor="end" fontSize="10" fill="rgba(255,255,255,0.45)">{max}</text>
        <text x={PAD_L - 6} y={11 + plotH} textAnchor="end" fontSize="10" fill="rgba(255,255,255,0.45)">0</text>

        <path d={areaPath} fill={CHAMPAGNE} opacity="0.12" />
        <path d={linePath} fill="none" stroke={CHAMPAGNE} strokeWidth="2" strokeLinejoin="round" />

        {data.map((d, i) =>
          i % labelEvery === 0 ? (
            <text key={d.label} x={xAt(i)} y={H - 6} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.45)">
              {d.label.slice(5)}
            </text>
          ) : null
        )}

        {hover !== null && (
          <g>
            <line x1={xAt(hover)} x2={xAt(hover)} y1={8} y2={8 + plotH} stroke="rgba(255,255,255,0.25)" />
            {/* anello superficie 2px attorno al marker */}
            <circle cx={xAt(hover)} cy={yAt(data[hover].value)} r="5" fill={CHAMPAGNE} stroke="#131009" strokeWidth="2" />
          </g>
        )}
      </svg>
      {hover !== null && (
        <div
          className="absolute pointer-events-none bg-black/90 border border-champagne/30 rounded-lg px-3 py-1.5 text-xs text-white whitespace-nowrap -translate-x-1/2"
          style={{ left: `${(xAt(hover) / W) * 100}%`, top: 0 }}
        >
          <span className="text-white/60">{data[hover].label}</span>{' '}
          <span className="font-bold text-champagne">{data[hover].value}</span>
        </div>
      )}
    </div>
  );
}
