import React, { useState } from 'react';
import { Sparkles, Calendar, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { getPersonalYearData, PersonalYearResult } from '../utils/numerology';

interface OrbitWheelProps {
  currentYearNum: number;
  selectedYear: number;
  onSelectYear: (year: number) => void;
}

export const OrbitWheel: React.FC<OrbitWheelProps> = ({
  currentYearNum,
  selectedYear,
  onSelectYear,
}) => {
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  // Directly get accurate information for the selected year 1..9
  const currentDetail: PersonalYearResult = getPersonalYearData(selectedYear, 2026);

  // 9 positions on a circle (radius = 82, center = 120, 120)
  const getOrbCoords = (index: number) => {
    // 9 points evenly spaced by 360/9 = 40 deg, start from top (-90 deg)
    const angleDeg = -90 + index * 40;
    const angleRad = (angleDeg * Math.PI) / 180;
    const r = 82;
    const cx = 120 + r * Math.cos(angleRad);
    const cy = 120 + r * Math.sin(angleRad);
    return { cx, cy };
  };

  const stageShortTitles: Record<number, string> = {
    1: 'Menanam Benih',
    2: 'Merawat Akar',
    3: 'Tumbuh & Kreasi',
    4: 'Menata Fondasi',
    5: 'Angin Perubahan',
    6: 'Harmoni Rumah',
    7: 'Hening Refleksi',
    8: 'Panen Otoritas',
    9: 'Menuntaskan Siklus',
  };

  return (
    <div className="bg-[#1F2A44] text-[#F4EDE1] rounded-3xl p-6 sm:p-8 border border-[#C9A45C]/40 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-[#C9A45C] font-semibold">
            Roda Orbit Siklus 9 Tahun (Musim Diri)
          </div>
          <h3 className="font-serif-cormorant text-2xl font-bold text-white">
            Petakan Waktu & Ritme Energi Hidupmu
          </h3>
        </div>
        <div className="text-xs text-[#F4EDE1]/80">
          Posisi Tahun Berjalanmu: <strong className="text-[#C9A45C]">Tahun {currentYearNum}</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Circular Orbit Wheel Interactive SVG */}
        <div className="md:col-span-6 flex flex-col items-center justify-center">
          <div className="relative w-[240px] h-[240px] select-none">
            <svg viewBox="0 0 240 240" className="w-full h-full block">
              <defs>
                <filter id="orbit-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Outer Orbit Track Circle */}
              <circle
                cx="120"
                cy="120"
                r="82"
                fill="none"
                stroke="rgba(201, 164, 92, 0.3)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Inner ambient ring */}
              <circle
                cx="120"
                cy="120"
                r="44"
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1"
              />

              {/* Center Core (Sun / Self) */}
              <g
                className="cursor-pointer"
                onClick={() => onSelectYear(currentYearNum)}
              >
                <circle
                  cx="120"
                  cy="120"
                  r="28"
                  fill="#172136"
                  stroke="#C9A45C"
                  strokeWidth="1.5"
                />
                <text
                  x="120"
                  y="115"
                  textAnchor="middle"
                  fill="#C9A45C"
                  fontSize="8.5"
                  fontFamily="'DM Sans', sans-serif"
                  fontWeight="600"
                  className="uppercase tracking-widest pointer-events-none"
                >
                  Siklus
                </text>
                <text
                  x="120"
                  y="131"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="15"
                  fontFamily="'Cormorant Garamond', Georgia, serif"
                  fontWeight="bold"
                  className="pointer-events-none"
                >
                  {selectedYear} / 9
                </text>
              </g>

              {/* 9 Orbital Year Nodes */}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((year) => {
                const { cx, cy } = getOrbCoords(year - 1);
                const isSelected = selectedYear === year;
                const isCurrent = currentYearNum === year;
                const isHovered = hoveredYear === year;

                const nodeRadius = isSelected ? 13 : isHovered ? 12 : 10;

                return (
                  <g
                    key={year}
                    className="cursor-pointer"
                    onClick={() => onSelectYear(year)}
                    onMouseEnter={() => setHoveredYear(year)}
                    onMouseLeave={() => setHoveredYear(null)}
                  >
                    {/* Glowing highlight aura for selected or current */}
                    {(isSelected || isCurrent) && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isSelected ? 18 : 15}
                        fill="none"
                        stroke={isSelected ? '#C2673F' : '#C9A45C'}
                        strokeWidth="1.5"
                        opacity={isSelected ? 0.9 : 0.6}
                      />
                    )}

                    {/* Main Node Circle */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={nodeRadius}
                      fill={isSelected ? '#C2673F' : isCurrent ? '#C9A45C' : '#172136'}
                      stroke={isSelected ? '#FFFFFF' : isCurrent ? '#C9A45C' : 'rgba(255, 255, 255, 0.4)'}
                      strokeWidth={isSelected ? 2 : 1.5}
                    />

                    {/* Node Text Label */}
                    <text
                      x={cx}
                      y={cy + 3.5}
                      textAnchor="middle"
                      fill={isSelected ? '#FFFFFF' : isCurrent ? '#1F2A44' : '#F4EDE1'}
                      fontSize={isSelected ? '10' : '8.5'}
                      fontWeight="bold"
                      fontFamily="'DM Sans', sans-serif"
                      className="pointer-events-none select-none"
                    >
                      {year}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="text-[11px] text-[#F4EDE1]/60 text-center mt-2">
            Klik nomor pada lingkaran untuk memutar fase waktu
          </div>
        </div>

        {/* Orbit Detail Information Card */}
        <div className="md:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#C9A45C] tracking-wider">
                  Fase Tahun {selectedYear}
                </span>
                <h4 className="font-serif-cormorant text-2xl font-bold text-white leading-tight">
                  {currentDetail.stageName}
                </h4>
              </div>

              {selectedYear === currentYearNum ? (
                <span className="px-2.5 py-1 rounded-full bg-[#C2673F] text-white text-[10px] font-bold uppercase tracking-wider shadow">
                  Tahun Kamu Saat Ini
                </span>
              ) : (
                <span className="text-xs text-white/50 font-mono">
                  {selectedYear < currentYearNum ? 'Fase Sebelumnya' : 'Fase Mendatang'}
                </span>
              )}
            </div>

            <p className="text-xs text-[#F4EDE1]/85 leading-relaxed font-sans-dm">
              {currentDetail.description}
            </p>

            <div className="p-3 rounded-xl bg-white/5 border-l-2 border-[#C9A45C] text-xs text-[#F4EDE1] italic font-serif-fraunces">
              “{currentDetail.lintangAdvice}”
            </div>

            <div className="pt-2">
              <span className="text-[11px] uppercase font-bold text-[#8A9A7B] tracking-wider block mb-1">
                Fokus Terbaik untuk Fase Ini:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentDetail.recommendedFocus.map((foc, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-[#172136] border border-white/10 text-white/90"
                  >
                    • {foc}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Glitch-free horizontal selector pills for all 9 years */}
          <div className="space-y-1.5 pt-1">
            <div className="text-[11px] text-[#F4EDE1]/60 flex justify-between">
              <span>Pilih langsung tahun siklus:</span>
              <button
                onClick={() => onSelectYear(currentYearNum)}
                className="text-[#C9A45C] hover:underline font-semibold text-[11px]"
              >
                Ke Tahun Saya ({currentYearNum})
              </button>
            </div>
            <div className="grid grid-cols-9 gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((yr) => (
                <button
                  key={yr}
                  onClick={() => onSelectYear(yr)}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all text-center ${
                    selectedYear === yr
                      ? 'bg-[#C2673F] text-white shadow'
                      : yr === currentYearNum
                      ? 'bg-[#C9A45C] text-[#1F2A44]'
                      : 'bg-white/10 hover:bg-white/20 text-white/80'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>

          {/* Stepper Navigation */}
          <div className="flex items-center justify-between text-xs text-white/70 pt-1 border-t border-white/10">
            <button
              onClick={() => onSelectYear(selectedYear > 1 ? selectedYear - 1 : 9)}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Tahun {selectedYear > 1 ? selectedYear - 1 : 9}</span>
            </button>

            <span className="text-[11px] text-white/50">
              {stageShortTitles[selectedYear]}
            </span>

            <button
              onClick={() => onSelectYear(selectedYear < 9 ? selectedYear + 1 : 1)}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>Tahun {selectedYear < 9 ? selectedYear + 1 : 1}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
