import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, Sparkles, MessageCircle, Copy, Check, Filter, RotateCcw, ExternalLink } from 'lucide-react';
import { LAUNCH_CHECKLIST, ChecklistItem } from '../data/blueprintData';

export const LaunchChecklist: React.FC = () => {
  const [completedIds, setCompletedIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('lintang_checklist_state');
      // By default, mark lead magnet (#9) and landing page (#7) as in progress/completed
      return saved ? JSON.parse(saved) : [7, 9];
    } catch {
      return [7, 9];
    }
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItemDetail, setSelectedItemDetail] = useState<ChecklistItem | null>(null);
  const [copiedTemplate, setCopiedTemplate] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('lintang_checklist_state', JSON.stringify(completedIds));
    } catch {
      // ignore storage error
    }
  }, [completedIds]);

  const toggleItem = (id: number) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    setCompletedIds([]);
  };

  const handleCompleteAll = () => {
    setCompletedIds(LAUNCH_CHECKLIST.map((i) => i.id));
  };

  const filteredItems = activeCategory === 'all'
    ? LAUNCH_CHECKLIST
    : LAUNCH_CHECKLIST.filter((i) => i.category === activeCategory);

  const progressPercent = Math.round((completedIds.length / LAUNCH_CHECKLIST.length) * 100);

  const handleCopyWa = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  return (
    <div className="space-y-12 py-6">
      {/* SECTION HEADER: BAB 7 */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#C9A45C]/20 shadow-sm space-y-8">
        <div className="border-b border-[#1F2A44]/10 pb-6 max-w-4xl">
          <div className="text-xs uppercase tracking-widest text-[#C2673F] font-semibold mb-1">
            Bab 7 · Roadmap Peluncuran
          </div>
          <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#1F2A44]">
            Aset yang Perlu Dibuat
          </h2>
          <p className="text-sm text-[#1F2A44]/70 mt-1">
            Urutannya: <strong>amankan nama dulu</strong>, lalu <strong>identitas</strong>, lalu <strong>aset jualan</strong>. Pantau kesiapan peluncuran Lintang di sini.
          </p>
        </div>

        {/* PROGRESS BAR & CONTROLS */}
        <div className="p-6 rounded-2xl bg-[#1F2A44] text-[#F4EDE1] border border-[#C9A45C]/40 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#C9A45C] font-semibold">
                Status Peluncuran Brand
              </div>
              <h3 className="font-serif-cormorant text-2xl font-bold text-white">
                {completedIds.length} dari 10 Aset Selesai ({progressPercent}%)
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCompleteAll}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-[#F4EDE1] transition-all"
              >
                Tandai Semua Selesai
              </button>
              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-[#F4EDE1] transition-all flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Visual Progress Track */}
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden p-0.5 border border-white/20">
            <div
              className="bg-gradient-to-r from-[#C2673F] via-[#C9A45C] to-[#8A9A7B] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex justify-between text-[11px] text-[#F4EDE1]/70">
            <span>Fase 1: Amankan Nama</span>
            <span>Fase 2: Identitas Visual</span>
            <span>Fase 3: Aset Jualan Siap Operasi</span>
          </div>
        </div>

        {/* FILTER CATEGORY PILLS */}
        <div className="flex flex-wrap gap-2 pt-2">
          {[
            { id: 'all', label: 'Semua 10 Aset' },
            { id: 'AMANKAN NAMA', label: '1. Amankan Nama (01–02)' },
            { id: 'IDENTITAS', label: '2. Identitas (03–04)' },
            { id: 'ASET JUALAN', label: '3. Aset Jualan (05–10)' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#C2673F] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 10 CHECKLIST CARDS */}
        <div className="space-y-3">
          {filteredItems.map((item) => {
            const isCompleted = completedIds.includes(item.id);
            return (
              <div
                key={item.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isCompleted
                    ? 'bg-emerald-50/50 border-emerald-300'
                    : 'bg-white border-gray-200 hover:border-[#C9A45C]'
                }`}
              >
                <div className="flex items-start gap-3.5 flex-1">
                  {/* Checkbox Button */}
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="mt-0.5 text-[#1F2A44] hover:text-[#C2673F] transition-colors shrink-0"
                    aria-label={`Toggle item ${item.code}`}
                  >
                    {isCompleted ? (
                      <CheckSquare className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Square className="w-6 h-6 text-gray-400" />
                    )}
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#C2673F] bg-[#F4EDE1] px-2 py-0.5 rounded">
                        {item.code}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#1F2A44]/60">
                        {item.category}
                      </span>
                    </div>

                    <h4 className={`font-serif-cormorant text-xl font-bold ${
                      isCompleted ? 'text-emerald-950 line-through opacity-80' : 'text-[#1F2A44]'
                    }`}>
                      {item.title}
                    </h4>

                    <p className="text-xs text-[#1F2A44]/75 font-sans-dm leading-relaxed">
                      {item.description}
                    </p>

                    <div className="text-[11px] text-[#8A9A7B] font-semibold pt-1">
                      Deliverable: <span className="text-[#1F2A44]/80">{item.deliverable}</span>
                    </div>
                  </div>
                </div>

                {/* Right side actions */}
                <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  <button
                    onClick={() => setSelectedItemDetail(item)}
                    className="text-xs text-[#C2673F] hover:text-[#d67246] font-semibold underline underline-offset-2"
                  >
                    Panduan Detail
                  </button>

                  {item.sampleTemplate && (
                    <button
                      onClick={() => setSelectedItemDetail(item)}
                      className="px-2.5 py-1 rounded-lg bg-[#C9A45C]/20 text-[#1F2A44] text-[11px] font-semibold flex items-center gap-1 hover:bg-[#C9A45C]/30 transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#C2673F]" />
                      <span>Lihat Template WA</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DETAIL MODAL WITH GUIDELINES & TEMPLATES */}
      {selectedItemDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-[#C9A45C]/40 shadow-2xl relative">
            <button
              onClick={() => setSelectedItemDetail(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-[#C2673F] bg-[#F4EDE1] px-2 py-0.5 rounded">
                Aset {selectedItemDetail.code}
              </span>
              <span className="text-xs font-bold text-[#1F2A44]/60 uppercase">
                {selectedItemDetail.category}
              </span>
            </div>

            <h3 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44] mb-3">
              {selectedItemDetail.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#1F2A44]/80 leading-relaxed font-sans-dm mb-4">
              {selectedItemDetail.description}
            </p>

            <div className="p-3.5 rounded-xl bg-[#F4EDE1] border border-[#C9A45C]/30 text-xs text-[#1F2A44] mb-4 space-y-1">
              <div>
                <strong>Tips Eksekusi Cepat:</strong> {selectedItemDetail.actionHint}
              </div>
              <div>
                <strong>Output Akhir:</strong> {selectedItemDetail.deliverable}
              </div>
            </div>

            {/* WA Template Preview if Item 10 */}
            {selectedItemDetail.sampleTemplate && (
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs font-bold text-[#1F2A44]">
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <MessageCircle className="w-4 h-4" />
                    <span>Contoh Template Pesan WhatsApp:</span>
                  </span>
                  <button
                    onClick={() => handleCopyWa(selectedItemDetail.sampleTemplate!)}
                    className="text-xs text-[#C2673F] font-semibold flex items-center gap-1"
                  >
                    {copiedTemplate ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTemplate ? 'Tersalin' : 'Salin Teks'}</span>
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono text-gray-800 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">
                  {selectedItemDetail.sampleTemplate}
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => {
                  toggleItem(selectedItemDetail.id);
                  setSelectedItemDetail(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  completedIds.includes(selectedItemDetail.id)
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                {completedIds.includes(selectedItemDetail.id)
                  ? 'Batal Tandai Selesai'
                  : 'Tandai Aset Ini Sudah Selesai'}
              </button>

              <button
                onClick={() => setSelectedItemDetail(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#1F2A44] hover:bg-gray-100"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
