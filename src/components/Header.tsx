import React, { useState } from 'react';
import { Menu, X, Sparkles, BookOpen, Calculator, Compass, Layers, ShieldCheck } from 'lucide-react';
import { LoShuCanvas } from './LoShuCanvas';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCalculator: () => void;
  onOpenOrderModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenCalculator,
  onOpenOrderModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Cetak Biru', icon: BookOpen },
    { id: 'foundation', label: 'Fondasi & Nilai', icon: Compass },
    { id: 'services', label: 'Katalog Layanan', icon: Layers },
    { id: 'loshu', label: 'Rasi Lo Shu 3×3', icon: Sparkles },
    { id: 'calculator', label: 'Kalkulator Gratis', icon: Calculator, badge: 'Lead Magnet' },
    { id: 'voice', label: 'Suara Brand', icon: ShieldCheck },
    { id: 'checklist', label: 'Checklist Aset', icon: Layers, badge: '10 Aset' },
    { id: 'ebook-view', label: 'Mode E-Book', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#1F2A44]/95 backdrop-blur-md border-b border-[#C9A45C]/20 text-[#F4EDE1] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Wordmark */}
          <div
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-3.5 cursor-pointer group py-2"
          >
            <div className="p-1 rounded-xl bg-[#172136] border border-[#C9A45C]/30 group-hover:border-[#C9A45C] transition-all shadow-md">
              <LoShuCanvas
                activeNodes={[8, 5, 2, 9]}
                lines={[[8, 5], [5, 2], [5, 9]]}
                size={38}
                theme="dark"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-cormorant text-2xl font-bold tracking-tight text-[#F4EDE1] group-hover:text-[#C9A45C] transition-colors leading-none">
                lintang
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9A45C] font-medium mt-1">
                Studio Peta Diri
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-3 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#C2673F] text-white shadow-sm'
                      : 'text-[#F4EDE1]/85 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {item.badge && !isActive && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#C9A45C]/20 text-[#C9A45C] font-semibold border border-[#C9A45C]/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onOpenCalculator}
              className="px-3.5 py-2 text-xs font-medium text-[#1F2A44] bg-[#C9A45C] hover:bg-[#d8b56f] rounded-lg transition-all shadow hover:shadow-md flex items-center gap-1.5 font-sans-dm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hitung Peta Diri</span>
            </button>
            <button
              onClick={onOpenOrderModal}
              className="px-3.5 py-2 text-xs font-medium text-white bg-[#C2673F] hover:bg-[#d67246] rounded-lg transition-all shadow hover:shadow-md flex items-center gap-1.5 font-sans-dm"
            >
              <span>Pesan Laporan</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenCalculator}
              className="sm:hidden px-2.5 py-1.5 text-[11px] font-medium text-[#1F2A44] bg-[#C9A45C] rounded-lg"
            >
              Kalkulator
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#F4EDE1] focus:outline-none"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#182238] border-b border-[#C9A45C]/20 px-4 pt-3 pb-6 space-y-2">
          <div className="text-[11px] uppercase tracking-wider text-[#C9A45C] font-semibold px-2 mb-1">
            Navigasi Blueprint Lintang
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2.5 text-xs font-medium rounded-lg text-left flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#C2673F] text-white font-semibold'
                      : 'bg-[#1F2A44] text-[#F4EDE1]/90 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#C9A45C]" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 flex flex-col gap-2 border-t border-white/10">
            <button
              onClick={() => {
                onOpenCalculator();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-[#1F2A44] bg-[#C9A45C] rounded-lg flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Coba Kalkulator Gratis (Lead Magnet)</span>
            </button>
            <button
              onClick={() => {
                onOpenOrderModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-white bg-[#C2673F] rounded-lg"
            >
              Pesan Laporan & Jadwal Konsultasi
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
