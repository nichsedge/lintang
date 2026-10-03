import React from 'react';
import { Sparkles, ArrowRight, BookOpen, Compass, Layers, ShieldCheck, Heart } from 'lucide-react';
import { LoShuCanvas } from './LoShuCanvas';

interface HeroSectionProps {
  onNavigate: (tabId: string) => void;
  onOpenCalculator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenCalculator,
}) => {
  return (
    <div className="relative overflow-hidden bg-[#1F2A44] text-[#F4EDE1] pt-12 pb-24 border-b border-[#C9A45C]/30">
      {/* Decorative Night Sky & Stars */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Glowing crescent moon in top right */}
        <div className="absolute top-10 right-8 sm:right-16 md:right-28 w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-[#F4EDE1] shadow-[0_0_50px_rgba(244,237,225,0.4)] flex items-center justify-center">
          <div className="w-18 h-18 sm:w-24 sm:h-24 rounded-full bg-[#1F2A44] -translate-x-3 -translate-y-1" />
        </div>

        {/* Twinkling star field */}
        <div className="absolute top-8 left-1/4 w-1.5 h-1.5 rounded-full bg-[#C9A45C] animate-twinkle" />
        <div className="absolute top-24 left-1/12 w-2 h-2 rounded-full bg-white/80 animate-twinkle-slow" />
        <div className="absolute top-36 left-1/3 w-1 h-1 rounded-full bg-[#C9A45C] animate-twinkle" />
        <div className="absolute top-14 left-3/4 w-2 h-2 rounded-full bg-white/70 animate-twinkle-fast" />
        <div className="absolute top-48 right-1/4 w-1.5 h-1.5 rounded-full bg-[#C9A45C] animate-twinkle" />
        <div className="absolute top-64 left-1/5 w-2 h-2 rounded-full bg-white/60 animate-twinkle-slow" />
        <div className="absolute top-72 right-1/12 w-1.5 h-1.5 rounded-full bg-[#C9A45C] animate-twinkle" />
        <div className="absolute top-32 right-1/3 w-1 h-1 rounded-full bg-white/90 animate-twinkle" />

        {/* Ambient celestial glow in center */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#C9A45C]/10 blur-3xl pointer-events-none" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* E-Book Blueprint Header Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C9A45C]/40 text-[#C9A45C] text-xs uppercase tracking-[0.2em] font-medium mb-8 backdrop-blur-sm shadow-sm">
          <span>E-Book · Blueprint</span>
          <span className="w-1 h-1 rounded-full bg-[#C9A45C]" />
          <span>Edisi 1 · Oktober 2026</span>
        </div>

        {/* Iconic Constellation 8-5-2+9 Central Visual */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="p-3 sm:p-4 rounded-3xl bg-[#172136]/90 border border-[#C9A45C]/40 shadow-2xl relative group cursor-pointer hover:border-[#C9A45C] transition-all hover:scale-105 duration-300">
            <LoShuCanvas
              activeNodes={[8, 5, 2, 9]}
              lines={[[8, 5], [5, 2], [5, 9]]}
              size={130}
              theme="dark"
            />
            <div className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-[#C2673F] text-[10px] text-white tracking-widest uppercase font-semibold">
              Rasi 8–5–2+9
            </div>
          </div>
          <span className="text-[11px] text-[#F4EDE1]/60 mt-3 font-sans-dm">
            “Garis 8–5–2 menanjak seperti langkah hidup, cabang ke 9 menggenapi siklus.”
          </span>
        </div>

        {/* Brand Main Wordmark */}
        <h1 className="font-serif-cormorant text-5xl sm:text-7xl font-bold tracking-tight text-[#F4EDE1] mb-2 leading-none">
          lintang
        </h1>
        <p className="text-sm sm:text-base tracking-[0.35em] uppercase text-[#C9A45C] font-semibold mb-6">
          STUDIO PETA DIRI
        </p>

        {/* Blueprint Title & Primary Motto */}
        <div className="max-w-2xl mx-auto space-y-3 mb-10">
          <h2 className="font-serif-fraunces text-2xl sm:text-3xl text-[#F4EDE1] font-normal italic">
            “Baca polamu, pilih langkahmu.”
          </h2>
          <p className="text-sm sm:text-base text-[#F4EDE1]/80 font-sans-dm leading-relaxed">
            Cetak biru brand, arsitektur layanan, dan identitas Lintang: studio peta diri berbasis
            numerologi, astrologi, dan sistem Timur. Bukan ramalan yang memvonis, melainkan cermin refleksi cerdas dan membumi untuk anak muda urban.
          </p>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16">
          <button
            onClick={onOpenCalculator}
            className="px-6 py-3.5 text-sm sm:text-base font-semibold text-[#1F2A44] bg-[#C9A45C] hover:bg-[#d8b56f] rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-4 h-4 text-[#1F2A44]" />
            <span>Coba Kalkulator Peta Diri (Gratis)</span>
            <ArrowRight className="w-4 h-4 text-[#1F2A44]" />
          </button>

          <button
            onClick={() => onNavigate('services')}
            className="px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#C2673F] hover:bg-[#d47043] rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
          >
            <Layers className="w-4 h-4 text-white" />
            <span>Katalog 12 Layanan & Paket</span>
          </button>

          <button
            onClick={() => onNavigate('ebook-view')}
            className="px-5 py-3.5 text-sm font-medium text-[#F4EDE1] bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-all flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-[#C9A45C]" />
            <span>Buka Mode E-Book (18 Halaman)</span>
          </button>
        </div>

        {/* Highlights / Pillar Snapshot Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto text-left">
          <div
            onClick={() => onNavigate('foundation')}
            className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C9A45C]/50 transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#C9A45C]/20 flex items-center justify-center text-[#C9A45C] mb-2 group-hover:scale-110 transition-transform">
              <Compass className="w-4 h-4" />
            </div>
            <div className="text-xs uppercase text-[#C9A45C] tracking-wider font-semibold">Bab 1 & 2</div>
            <div className="font-serif-cormorant text-lg text-white font-bold">Fondasi & 5 Nilai</div>
            <div className="text-xs text-[#F4EDE1]/70 mt-1 line-clamp-2">
              Jujur, Hangat, Membumi, Rapi, dan Menjaga Privasi.
            </div>
          </div>

          <div
            onClick={() => onNavigate('services')}
            className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C9A45C]/50 transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#C2673F]/20 flex items-center justify-center text-[#C2673F] mb-2 group-hover:scale-110 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
            <div className="text-xs uppercase text-[#C9A45C] tracking-wider font-semibold">Bab 3 & 4</div>
            <div className="font-serif-cormorant text-lg text-white font-bold">4 Lini Layanan</div>
            <div className="text-xs text-[#F4EDE1]/70 mt-1 line-clamp-2">
              Seri Angka, Seri Langit, Seri Relasi, dan Paket Unggulan.
            </div>
          </div>

          <div
            onClick={() => onNavigate('voice')}
            className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C9A45C]/50 transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#8A9A7B]/20 flex items-center justify-center text-[#8A9A7B] mb-2 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-xs uppercase text-[#C9A45C] tracking-wider font-semibold">Bab 5</div>
            <div className="font-serif-cormorant text-lg text-white font-bold">Suara Brand</div>
            <div className="text-xs text-[#F4EDE1]/70 mt-1 line-clamp-2">
              Seperti kakak yang paham astrologi: santai tapi rapi, anti-vonis.
            </div>
          </div>

          <div
            onClick={() => onNavigate('checklist')}
            className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C9A45C]/50 transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#C9A45C]/20 flex items-center justify-center text-[#C9A45C] mb-2 group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-xs uppercase text-[#C9A45C] tracking-wider font-semibold">Bab 7</div>
            <div className="font-serif-cormorant text-lg text-white font-bold">10 Aset Peluncuran</div>
            <div className="text-xs text-[#F4EDE1]/70 mt-1 line-clamp-2">
              Dari amankan nama di PDKI sampai template WhatsApp.
            </div>
          </div>
        </div>
      </div>

      {/* Layered landscape horizon curves matching the PDF Cover bottom graphics */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-10 sm:h-16"
        >
          {/* Wave 1: Sage green layer */}
          <path
            d="M0,40 C150,90 350,-20 600,30 C850,80 1050,10 1200,40 L1200,120 L0,120 Z"
            fill="#8A9A7B"
            opacity="0.85"
          />
          {/* Wave 2: Terracotta warm curve */}
          <path
            d="M0,65 C200,30 420,100 700,60 C980,20 1100,75 1200,65 L1200,120 L0,120 Z"
            fill="#C2673F"
          />
          {/* Wave 3: Sand cream base meeting page */}
          <path
            d="M0,95 C250,75 550,110 850,85 C1050,70 1150,95 1200,95 L1200,120 L0,120 Z"
            fill="#F4EDE1"
          />
        </svg>
      </div>
    </div>
  );
};
