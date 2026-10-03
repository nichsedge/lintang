import React, { useState } from 'react';
import { Sparkles, RefreshCw, Info, Check, Eye } from 'lucide-react';
import { LoShuCanvas } from './LoShuCanvas';
import { SERVICES } from '../data/blueprintData';

interface PresetRasi {
  id: string;
  name: string;
  category: string;
  activeNodes: number[];
  lines: [number, number][];
  meaning: string;
  sourceNote: string;
}

export const LoShuExplorer: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('logo-lintang');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [customNodes, setCustomNodes] = useState<number[]>([8, 5, 2, 9]);

  const presets: PresetRasi[] = [
    {
      id: 'logo-lintang',
      name: 'Logo Utama Lintang (8–5–2+9)',
      category: 'Identitas Induk',
      activeNodes: [8, 5, 2, 9],
      lines: [[8, 5], [5, 2], [5, 9]],
      meaning: 'Garis 8–5–2 naik dari kiri bawah ke kanan atas seperti langkah yang menanjak; cabang ke angka 9 melambangkan penyelesaian satu siklus penuh kesadaran.',
      sourceNote: 'Simbol master Lintang yang memadukan kestabilan bumi (8), pusat keseimbangan (5), kepekaan rasa (2), dan puncak kematangan (9).',
    },
    ...SERVICES.map((s) => ({
      id: s.id,
      name: `${s.name} (${s.subtitle})`,
      category: s.category.toUpperCase().replace('-', ' '),
      activeNodes: s.loShuActiveNodes,
      lines: s.loShuLines,
      meaning: s.description,
      sourceNote: s.highlight || 'Ikon rasi khas pada kisi Lo Shu 3×3.',
    })),
  ];

  const currentPreset = presets.find((p) => p.id === selectedPresetId) || presets[0];

  const handleNodeToggle = (nodeNum: number) => {
    if (!isCustomMode) {
      setIsCustomMode(true);
    }
    setCustomNodes((prev) =>
      prev.includes(nodeNum) ? prev.filter((n) => n !== nodeNum) : [...prev, nodeNum]
    );
  };

  const handleResetCustom = () => {
    setCustomNodes([8, 5, 2, 9]);
    setIsCustomMode(false);
    setSelectedPresetId('logo-lintang');
  };

  // Determine active display nodes and lines
  const displayNodes = isCustomMode ? customNodes : currentPreset.activeNodes;
  // If custom mode, generate simple connecting lines between active nodes
  const displayLines = isCustomMode
    ? customNodes.slice(0, -1).map((n, i) => [n, customNodes[i + 1]] as [number, number])
    : currentPreset.lines;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#C9A45C]/20 shadow-sm space-y-10">
      {/* Header */}
      <div className="border-b border-[#1F2A44]/10 pb-6 max-w-4xl">
        <div className="text-xs uppercase tracking-widest text-[#C2673F] font-semibold mb-1">
          Bab 6 & Bab 4 · Geometri Suci
        </div>
        <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#1F2A44]">
          Penjelajah Rasi Lo Shu 3×3
        </h2>
        <p className="text-sm text-[#1F2A44]/70 mt-1">
          Satu simbol yang menyatukan angka dan bintang. Setiap ikon layanan Lintang terbentuk dari titik-titik kisi Lo Shu 3×3.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Canvas & Mode Controls */}
        <div className="lg:col-span-6 bg-[#1F2A44] rounded-3xl p-6 sm:p-8 text-[#F4EDE1] border border-[#C9A45C]/40 shadow-xl flex flex-col items-center justify-center relative overflow-hidden">
          {/* Subtle star particles background */}
          <div className="absolute top-4 left-6 w-1.5 h-1.5 rounded-full bg-[#C9A45C] animate-twinkle" />
          <div className="absolute bottom-6 right-8 w-1 h-1 rounded-full bg-white/70 animate-twinkle-slow" />
          <div className="absolute top-1/2 left-3 w-1 h-1 rounded-full bg-[#C9A45C] animate-twinkle-fast" />

          {/* Mode Badge */}
          <div className="w-full flex items-center justify-between mb-4 text-xs">
            <span className="text-[#C9A45C] font-semibold tracking-wider uppercase text-[11px]">
              {isCustomMode ? '✨ Mode Kanvas Bebas' : '📐 Preset Blueprint Brand'}
            </span>
            <button
              onClick={() => {
                if (isCustomMode) {
                  handleResetCustom();
                } else {
                  setIsCustomMode(true);
                }
              }}
              className="text-xs px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-[#F4EDE1] transition-all flex items-center gap-1 font-sans-dm"
            >
              <RefreshCw className="w-3 h-3 text-[#C9A45C]" />
              <span>{isCustomMode ? 'Kembali ke Preset' : 'Gambar Rasi Bebas'}</span>
            </button>
          </div>

          {/* Large Lo Shu Interactive Canvas */}
          <div className="py-4">
            <LoShuCanvas
              activeNodes={displayNodes}
              lines={displayLines}
              size={220}
              interactive={true}
              onNodeClick={handleNodeToggle}
              showLabels={true}
              theme="dark"
              className="border-2 border-[#C9A45C]/30 hover:border-[#C9A45C] shadow-2xl"
            />
          </div>

          <div className="text-center mt-3 text-xs text-[#F4EDE1]/70 font-sans-dm max-w-sm">
            {isCustomMode ? (
              <span className="text-[#C9A45C] font-medium">
                Klik titik angka 1–9 di atas untuk menyalakan/memadamkan bintang rasi personalmu.
              </span>
            ) : (
              <span>
                Menampilkan <strong className="text-white">{currentPreset.name}</strong>. Kamu juga bisa mengklik titik di kanvas kapan saja.
              </span>
            )}
          </div>

          {/* Active Nodes Summary */}
          <div className="mt-5 pt-4 border-t border-white/10 w-full flex items-center justify-between text-xs">
            <span className="text-[#F4EDE1]/70">Titik Aktif:</span>
            <div className="flex gap-1.5">
              {[4, 9, 2, 3, 5, 7, 8, 1, 6].map((num) => {
                const isActive = displayNodes.includes(num);
                return (
                  <span
                    key={num}
                    onClick={() => handleNodeToggle(num)}
                    className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-[11px] font-bold cursor-pointer transition-all ${
                      isActive
                        ? 'bg-[#C9A45C] text-[#1F2A44] shadow'
                        : 'bg-white/5 text-white/30 hover:bg-white/10'
                    }`}
                  >
                    {num}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Preset Selector & Educational Blueprint Context */}
        <div className="lg:col-span-6 space-y-6">
          {/* Information Callout */}
          <div className="p-5 rounded-2xl bg-[#F4EDE1] border border-[#C9A45C]/40 text-[#1F2A44]">
            <div className="flex items-center gap-2 text-xs uppercase font-bold text-[#C2673F] mb-1.5">
              <Info className="w-4 h-4" />
              <span>Filosofi Kisi Lo Shu 3×3</span>
            </div>
            <p className="text-xs sm:text-sm text-[#1F2A44]/80 leading-relaxed font-sans-dm mb-3">
              Kisi Lo Shu membagi kesadaran manusia menjadi 3 bidang:
            </p>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-lg bg-white/70 border border-[#1F2A44]/10">
                <div className="font-bold text-[#1F2A44]">4 · 9 · 2</div>
                <div className="text-[10px] text-[#C2673F] font-medium">Bidang Pikiran / Intelek</div>
              </div>
              <div className="p-2 rounded-lg bg-white/70 border border-[#1F2A44]/10">
                <div className="font-bold text-[#1F2A44]">3 · 5 · 7</div>
                <div className="text-[10px] text-[#C9A45C] font-medium">Bidang Jiwa / Emosi</div>
              </div>
              <div className="p-2 rounded-lg bg-white/70 border border-[#1F2A44]/10">
                <div className="font-bold text-[#1F2A44]">8 · 1 · 6</div>
                <div className="text-[10px] text-[#8A9A7B] font-medium">Bidang Praktis / Aksi</div>
              </div>
            </div>
          </div>

          {/* Current Preset Deep-dive */}
          <div className="p-5 rounded-2xl bg-white border border-[#1F2A44]/10 shadow-sm">
            <div className="text-[11px] uppercase tracking-wider text-[#C2673F] font-semibold mb-1">
              {currentPreset.category}
            </div>
            <h3 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44] mb-2">
              {currentPreset.name}
            </h3>
            <p className="text-sm text-[#1F2A44]/85 leading-relaxed font-sans-dm mb-3">
              {currentPreset.meaning}
            </p>
            <div className="p-3 rounded-xl bg-[#8A9A7B]/10 border border-[#8A9A7B]/30 text-xs text-[#1F2A44]/90 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#8A9A7B] shrink-0 mt-0.5" />
              <span>{currentPreset.sourceNote}</span>
            </div>
          </div>

          {/* Preset Buttons Grid */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#1F2A44]/70 mb-3">
              Pilih Rasi Layanan dari Blueprint:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto pr-1">
              {presets.map((preset) => {
                const isSelected = !isCustomMode && selectedPresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setIsCustomMode(false);
                      setSelectedPresetId(preset.id);
                    }}
                    className={`p-2.5 rounded-xl text-left border text-xs transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'bg-[#1F2A44] text-[#F4EDE1] border-[#C9A45C] shadow-sm'
                        : 'bg-gray-50/70 text-[#1F2A44] border-gray-200 hover:border-[#C9A45C] hover:bg-white'
                    }`}
                  >
                    <div className="w-6 h-6 shrink-0 rounded-md bg-[#172136] flex items-center justify-center p-0.5">
                      <LoShuCanvas
                        activeNodes={preset.activeNodes}
                        lines={preset.lines}
                        size={20}
                        theme="dark"
                      />
                    </div>
                    <span className="truncate font-medium text-[11px]">{preset.name.split('(')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
