import React from 'react';
import { Sparkles, Shield, AtSign, Globe, Heart } from 'lucide-react';
import { LoShuCanvas } from './LoShuCanvas';

interface FooterProps {
  onNavigate: (tabId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#1F2A44] text-[#F4EDE1] border-t border-[#C9A45C]/30 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-xl bg-[#172136] border border-[#C9A45C]/40">
                <LoShuCanvas
                  activeNodes={[8, 5, 2, 9]}
                  lines={[[8, 5], [5, 2], [5, 9]]}
                  size={42}
                  theme="dark"
                />
              </div>
              <div>
                <span className="font-serif-cormorant text-2xl font-bold tracking-tight text-white leading-none">
                  lintang
                </span>
                <div className="text-[10px] tracking-[0.25em] uppercase text-[#C9A45C] font-semibold mt-0.5">
                  Studio Peta Diri
                </div>
              </div>
            </div>

            <p className="font-serif-fraunces text-base italic text-[#F4EDE1]/90">
              “Baca polamu, pilih langkahmu.”
            </p>

            <p className="text-xs text-[#F4EDE1]/70 font-sans-dm leading-relaxed max-w-sm">
              Studio peta diri berbahasa Indonesia yang merangkai numerologi, astrologi, dan sistem Timur. Bukan ramalan yang memvonis, melainkan cermin refleksi cerdas dan membumi.
            </p>

            <div className="flex flex-wrap gap-4 text-xs text-[#C9A45C] pt-1">
              <span className="flex items-center gap-1 font-mono">
                <AtSign className="w-3.5 h-3.5" />
                <span>@lintang.petadiri</span>
              </span>
              <span className="flex items-center gap-1 font-mono">
                <Globe className="w-3.5 h-3.5" />
                <span>lintangpetadiri.com</span>
              </span>
            </div>
          </div>

          {/* Quick Links Column 1 */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif-cormorant text-lg font-bold text-white uppercase tracking-wider text-xs">
              Bab Blueprint
            </h4>
            <ul className="space-y-2 text-xs text-[#F4EDE1]/80">
              <li>
                <button onClick={() => onNavigate('overview')} className="hover:text-[#C9A45C] transition-colors">
                  Tentang E-Book & Ringkasan
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('foundation')} className="hover:text-[#C9A45C] transition-colors">
                  Bab 1: Nama Brand & PDKI
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('foundation')} className="hover:text-[#C9A45C] transition-colors">
                  Bab 2: Fondasi & 5 Nilai
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[#C9A45C] transition-colors">
                  Bab 3: Arsitektur 4 Lini
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[#C9A45C] transition-colors">
                  Bab 4: Katalog Layanan & Paket
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif-cormorant text-lg font-bold text-white uppercase tracking-wider text-xs">
              Fitur Interaktif
            </h4>
            <ul className="space-y-2 text-xs text-[#F4EDE1]/80">
              <li>
                <button onClick={() => onNavigate('calculator')} className="hover:text-[#C9A45C] transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>Kalkulator Life Path & Musim Diri</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('loshu')} className="hover:text-[#C9A45C] transition-colors">
                  Penjelajah Rasi Lo Shu 3×3
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('voice')} className="hover:text-[#C9A45C] transition-colors">
                  Bab 5: Suara Brand & Tone Tester
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('checklist')} className="hover:text-[#C9A45C] transition-colors">
                  Bab 7: Checklist 10 Aset Peluncuran
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ebook-view')} className="hover:text-[#C9A45C] transition-colors">
                  Mode Baca E-Book (18 Halaman)
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Official Disclaimer Banner (Page 18) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#172136] border border-white/10 text-xs text-[#F4EDE1]/75 leading-relaxed flex items-start gap-3">
          <Shield className="w-5 h-5 text-[#C9A45C] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#F4EDE1]">Disclaimer Etis (Halaman 18):</strong> Layanan Lintang ditujukan untuk refleksi diri, pemahaman potensi, dan hiburan yang memberdayakan. Layanan ini bukan pengganti nasihat profesional medis, hukum, keuangan, psikiatri, atau psikologis.
          </div>
        </div>

        {/* Copyright & Edition info */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#F4EDE1]/60">
          <div>
            © 2026 Lintang · Studio Peta Diri. Hak cipta dilindungi undang-undang.
          </div>
          <div>
            E-Book Blueprint Brand & Layanan · Edisi 1 · Oktober 2026
          </div>
        </div>
      </div>
    </footer>
  );
};
