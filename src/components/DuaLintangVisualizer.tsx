import React, { useState } from 'react';
import { Heart, Users, Sparkles, User, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { calculateLifePath } from '../utils/numerology';
import { SERVICES, ServiceItem } from '../data/blueprintData';

interface DuaLintangVisualizerProps {
  onOrderService: (service: ServiceItem) => void;
}

export const DuaLintangVisualizer: React.FC<DuaLintangVisualizerProps> = ({
  onOrderService,
}) => {
  const [person1, setPerson1] = useState({ name: 'Kamu', date: '1997-04-12' });
  const [person2, setPerson2] = useState({ name: 'Dia', date: '1999-10-25' });
  const [overlapDistance, setOverlapDistance] = useState<number>(65); // 0 to 100%

  const presets = [
    { label: 'Pasangan Romantis', d1: '1997-04-12', d2: '1999-10-25' },
    { label: 'Partner Bisnis', d1: '1995-08-08', d2: '1996-03-14' },
    { label: 'Sahabat Karib', d1: '1998-11-20', d2: '1998-05-03' },
  ];

  const handleApplyPreset = (p: typeof presets[0]) => {
    setPerson1({ ...person1, date: p.d1 });
    setPerson2({ ...person2, date: p.d2 });
  };

  const p1Parts = person1.date.split('-').map(Number);
  const p2Parts = person2.date.split('-').map(Number);

  const lp1 = p1Parts.length === 3 ? calculateLifePath(p1Parts[2], p1Parts[1], p1Parts[0]) : null;
  const lp2 = p2Parts.length === 3 ? calculateLifePath(p2Parts[2], p2Parts[1], p2Parts[0]) : null;

  // Visual SVG positions calculated based on overlapDistance
  // Distance between centers: at 0% distance is 140px, at 100% distance is 50px
  const centerSeparation = 130 - (overlapDistance / 100) * 70;
  const c1x = 150 - centerSeparation / 2;
  const c2x = 150 + centerSeparation / 2;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#1F2A44]/10 shadow-sm space-y-8">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#C2673F] font-bold">
          Seri Relasi · Interaktif
        </span>
        <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#1F2A44]">
          Dua Lintang: Uji Titik Temu Berdua
        </h2>
        <p className="text-xs sm:text-sm text-[#1F2A44]/75">
          Bukan vonis cocok atau tidak, melainkan peta cermin untuk memahami di mana kalian saling menguatkan dan di mana perlu bahasa berbeda.
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="text-gray-500 mr-1">Contoh Dinamika:</span>
        {presets.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleApplyPreset(p)}
            className="px-3 py-1 rounded-lg bg-[#F4EDE1] hover:bg-[#eddcc7] text-[#1F2A44] font-medium transition-all"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Date Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Person 1 */}
        <div className="p-4 rounded-2xl bg-[#F4EDE1]/50 border border-[#C9A45C]/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#C2673F]">
            <User className="w-4 h-4" />
            <span>Peta Kamu (Orang Pertama)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Nama Kamu"
              value={person1.name}
              onChange={(e) => setPerson1({ ...person1, name: e.target.value })}
              className="p-2.5 rounded-xl border border-gray-300 text-xs bg-white outline-none focus:ring-1 focus:ring-[#C2673F]"
            />
            <input
              type="date"
              value={person1.date}
              onChange={(e) => setPerson1({ ...person1, date: e.target.value })}
              className="p-2.5 rounded-xl border border-gray-300 text-xs bg-white outline-none focus:ring-1 focus:ring-[#C2673F]"
            />
          </div>
        </div>

        {/* Person 2 */}
        <div className="p-4 rounded-2xl bg-[#F4EDE1]/50 border border-[#8A9A7B]/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#8A9A7B]">
            <Heart className="w-4 h-4" />
            <span>Peta Dia (Pasangan / Partner)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Nama Pasangan"
              value={person2.name}
              onChange={(e) => setPerson2({ ...person2, name: e.target.value })}
              className="p-2.5 rounded-xl border border-gray-300 text-xs bg-white outline-none focus:ring-1 focus:ring-[#8A9A7B]"
            />
            <input
              type="date"
              value={person2.date}
              onChange={(e) => setPerson2({ ...person2, date: e.target.value })}
              className="p-2.5 rounded-xl border border-gray-300 text-xs bg-white outline-none focus:ring-1 focus:ring-[#8A9A7B]"
            />
          </div>
        </div>
      </div>

      {/* Interactive Magnetic Dual-Orb Venn Canvas */}
      <div className="bg-[#1F2A44] text-[#F4EDE1] rounded-3xl p-6 sm:p-8 border border-[#C9A45C]/40 shadow-xl space-y-6">
        <div className="flex items-center justify-between text-xs text-[#C9A45C] border-b border-white/10 pb-3">
          <span className="font-semibold uppercase tracking-wider">Simulasi Resonansi Orbit</span>
          <span>Kedekatan Resonansi: {overlapDistance}%</span>
        </div>

        {/* Dynamic Dual Orbit SVG */}
        <div className="flex justify-center py-4 select-none">
          <svg viewBox="0 0 300 160" className="w-full max-w-[420px] h-[160px] overflow-visible">
            <defs>
              <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Orbit Circle 1: Person 1 */}
            <circle
              cx={c1x}
              cy="80"
              r="55"
              fill="rgba(194, 103, 63, 0.2)"
              stroke="#C2673F"
              strokeWidth="2"
              className="transition-all duration-300"
            />

            {/* Orbit Circle 2: Person 2 */}
            <circle
              cx={c2x}
              cy="80"
              r="55"
              fill="rgba(138, 154, 123, 0.2)"
              stroke="#8A9A7B"
              strokeWidth="2"
              className="transition-all duration-300"
            />

            {/* Overlap Core Glow */}
            <circle
              cx="150"
              cy="80"
              r={15 + (overlapDistance / 100) * 10}
              fill="#C9A45C"
              filter="url(#glow-gold)"
              opacity="0.75"
              className="animate-pulse"
            />

            {/* Center Star Emblem */}
            <text
              x="150"
              y="85"
              textAnchor="middle"
              fill="#1F2A44"
              fontSize="16"
              fontWeight="bold"
              className="pointer-events-none"
            >
              ★
            </text>

            {/* Label 1 */}
            <text
              x={c1x - 15}
              y="76"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="12"
              fontFamily="'Cormorant Garamond', Georgia, serif"
              fontWeight="bold"
            >
              {lp1 ? `LP ${lp1.number}` : 'Peta 1'}
            </text>
            <text
              x={c1x - 15}
              y="90"
              textAnchor="middle"
              fill="#F4EDE1"
              fontSize="8"
              opacity="0.8"
            >
              {person1.name}
            </text>

            {/* Label 2 */}
            <text
              x={c2x + 15}
              y="76"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="12"
              fontFamily="'Cormorant Garamond', Georgia, serif"
              fontWeight="bold"
            >
              {lp2 ? `LP ${lp2.number}` : 'Peta 2'}
            </text>
            <text
              x={c2x + 15}
              y="90"
              textAnchor="middle"
              fill="#F4EDE1"
              fontSize="8"
              opacity="0.8"
            >
              {person2.name}
            </text>
          </svg>
        </div>

        {/* Resonansi Overlap Interactive Slider */}
        <div className="space-y-1 max-w-sm mx-auto text-center">
          <label className="text-[11px] text-[#F4EDE1]/70">
            Tarik penggeser untuk mendekatkan orbit energi kedua pihak:
          </label>
          <input
            type="range"
            min="20"
            max="100"
            value={overlapDistance}
            onChange={(e) => setOverlapDistance(Number(e.target.value))}
            className="w-full accent-[#C9A45C] cursor-pointer"
          />
        </div>
      </div>

      {/* Analysis Cards */}
      {lp1 && lp2 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
              <span className="text-[10px] uppercase font-bold text-emerald-800 block">
                Titik Sinergi Alami
              </span>
              <p className="leading-relaxed">
                Perpaduan antara {lp1.name} ({person1.name}) dan {lp2.name} ({person2.name}) menciptakan keseimbangan antara inisiatif dan ketelitian. Kalian saling mengisi di area yang tidak dimiliki satu sama lain.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-800 block">
                Potensi Gesekan & Blindspot
              </span>
              <p className="leading-relaxed">
                Ketegangan terjadi saat komunikasi dilakukan terburu-buru ketika lelah. Hindari membuat asumsi sepihak; tanyakan dengan jelas ekspektasi masing-masing.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 space-y-1">
              <span className="text-[10px] uppercase font-bold text-blue-800 block">
                Latihan Bahasa Komunikasi
              </span>
              <p className="leading-relaxed">
                Gunakan sapaan hangat dan berikan apresiasi kecil setiap pagi. Biasakan aturan "jeda 5 menit" saat menghadapi silang pendapat.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F4EDE1] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <strong>Ingin Laporan Lengkap Dua Lintang (15+ Halaman)?</strong>
              <div className="text-gray-600">Termasuk peta pilar relasi, komparasi elemen, dan opsi sesi konsultasi Zoom berdua.</div>
            </div>
            <button
              onClick={() => {
                const s = SERVICES.find((item) => item.id === 'dua-lintang');
                if (s) onOrderService(s);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#C2673F] hover:bg-[#d67246] text-white font-semibold transition-all shadow shrink-0"
            >
              Pesan Dua Lintang
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
