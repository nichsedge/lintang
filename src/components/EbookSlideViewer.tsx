import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Sparkles, ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { EBOOK_PAGES } from '../data/blueprintData';
import { LoShuCanvas } from './LoShuCanvas';

export const EbookSlideViewer: React.FC = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

  const currentPage = EBOOK_PAGES[currentPageIndex];

  const handlePrev = () => {
    setCurrentPageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPageIndex((prev) => (prev < EBOOK_PAGES.length - 1 ? prev + 1 : prev));
  };

  return (
    <div className="space-y-8 py-6">
      {/* SECTION HEADER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#C9A45C]/20 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-[#C2673F] font-semibold mb-1">
            Pembaca Dokumen Lengkap
          </div>
          <h2 className="font-serif-cormorant text-3xl font-bold text-[#1F2A44]">
            Mode Baca E-Book Blueprint (18 Halaman)
          </h2>
          <p className="text-xs text-[#1F2A44]/70">
            Jelajahi setiap halaman cetak biru Lintang secara runtut layaknya membalik buku fisik.
          </p>
        </div>

        {/* Page counter & direct jumper */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-[#1F2A44]">
            Halaman {currentPage.page} / {EBOOK_PAGES.length}
          </span>
          <select
            value={currentPageIndex}
            onChange={(e) => setCurrentPageIndex(parseInt(e.target.value, 10))}
            className="px-3 py-1.5 rounded-xl border border-gray-300 text-xs font-medium text-[#1F2A44] bg-white focus:outline-none focus:ring-1 focus:ring-[#C2673F]"
          >
            {EBOOK_PAGES.map((p, idx) => (
              <option key={p.page} value={idx}>
                Hal {p.page}: {p.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* SLIDE CARD DISPLAY */}
      <div className="bg-[#1F2A44] text-[#F4EDE1] rounded-3xl p-6 sm:p-12 border border-[#C9A45C]/40 shadow-2xl relative min-h-[460px] flex flex-col justify-between overflow-hidden">
        {/* Ambient celestial glow */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#C9A45C]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top bar of the slide */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#C9A45C] text-[#1F2A44] text-[10px] font-bold uppercase tracking-wider">
              {currentPage.chapter}
            </span>
            <span className="text-xs text-[#F4EDE1]/70 font-mono">
              Halaman {currentPage.page}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#C9A45C]">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="tracking-widest uppercase font-serif-cormorant font-bold">
              Lintang · Studio Peta Diri
            </span>
          </div>
        </div>

        {/* Slide Main Content */}
        <div className="my-8 max-w-2xl mx-auto text-center space-y-6">
          {/* Constellation Badge for Cover or Visual Pages */}
          {(currentPage.page === 1 || currentPage.page === 15 || currentPage.page === 18) && (
            <div className="inline-block p-2 rounded-2xl bg-[#172136] border border-[#C9A45C]/40 shadow-md">
              <LoShuCanvas
                activeNodes={[8, 5, 2, 9]}
                lines={[[8, 5], [5, 2], [5, 9]]}
                size={80}
                theme="dark"
              />
            </div>
          )}

          <div>
            <h3 className="font-serif-cormorant text-3xl sm:text-5xl font-bold text-white mb-2 leading-tight">
              {currentPage.title}
            </h3>
            <div className="text-xs sm:text-sm text-[#C9A45C] font-serif-fraunces italic">
              {currentPage.subtitle}
            </div>
          </div>

          {currentPage.quote && (
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-lg mx-auto">
              <Quote className="w-5 h-5 text-[#C9A45C] mx-auto mb-2 opacity-60" />
              <blockquote className="font-serif-fraunces text-base sm:text-xl text-[#F4EDE1] italic leading-snug">
                {currentPage.quote}
              </blockquote>
            </div>
          )}

          <p className="text-xs sm:text-base text-[#F4EDE1]/85 font-sans-dm leading-relaxed max-w-xl mx-auto">
            {currentPage.summary}
          </p>
        </div>

        {/* Bottom Navigation Controls */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <button
            onClick={handlePrev}
            disabled={currentPageIndex === 0}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              currentPageIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-white/5 text-white/50'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          {/* Quick Pagination Dots on Desktop */}
          <div className="hidden sm:flex items-center gap-1">
            {EBOOK_PAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPageIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentPageIndex
                    ? 'w-6 bg-[#C9A45C]'
                    : 'bg-white/30 hover:bg-white/60'
                }`}
                title={`Halaman ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentPageIndex === EBOOK_PAGES.length - 1}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              currentPageIndex === EBOOK_PAGES.length - 1
                ? 'opacity-40 cursor-not-allowed bg-white/5 text-white/50'
                : 'bg-[#C2673F] hover:bg-[#d67246] text-white shadow'
            }`}
          >
            <span>Selanjutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
