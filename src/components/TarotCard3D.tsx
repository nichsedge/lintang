import React, { useState } from 'react';
import { RotateCw, Sparkles, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { TarotBirthCardResult, calculateTarotBirthCard } from '../utils/numerology';

interface TarotCard3DProps {
  initialCard: TarotBirthCardResult;
  onExploreOther?: (cardNum: number) => void;
}

export const TarotCard3D: React.FC<TarotCard3DProps> = ({ initialCard }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCardNumber, setCurrentCardNumber] = useState<number>(initialCard.cardNumber);

  const currentCard = calculateTarotBirthCard(currentCardNumber, 0, 0);

  const handlePrevCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentCardNumber((prev) => (prev > 0 ? prev - 1 : 21));
  };

  const handleNextCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentCardNumber((prev) => (prev < 21 ? prev + 1 : 0));
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1F2A44]/10 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#8A9A7B] tracking-wider">
            Tarot Birth Card · Major Arcana
          </span>
          <h3 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
            {currentCard.cardName}
          </h3>
        </div>

        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="px-3 py-1.5 rounded-xl bg-[#F4EDE1] hover:bg-[#ebdcc9] text-xs font-semibold text-[#C2673F] flex items-center gap-1.5 transition-all shadow-xs"
        >
          <RotateCw className="w-3.5 h-3.5 transition-transform duration-300 hover:rotate-180" />
          <span>{isFlipped ? 'Lihat Sisi Depan' : 'Balik Kartu (Refleksi)'}</span>
        </button>
      </div>

      {/* 3D Perspective Card Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative mx-auto w-full max-w-[280px] h-[360px] cursor-pointer [perspective:1000px] group"
      >
        <div
          className="relative w-full h-full rounded-3xl transition-transform duration-700 [transform-style:preserve-3d] shadow-xl group-hover:scale-[1.02]"
          style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          {/* FRONT OF THE TAROT CARD */}
          <div className="absolute inset-0 bg-[#1F2A44] text-[#F4EDE1] rounded-3xl p-6 border-2 border-[#C9A45C]/50 flex flex-col justify-between [backface-visibility:hidden] overflow-hidden shadow-2xl">
            {/* Celestial subtle background pattern */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#C9A45C]/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#C2673F]/15 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between z-10 border-b border-white/10 pb-2">
              <span className="font-mono text-xs text-[#C9A45C] font-bold tracking-widest">
                № {currentCard.cardNumber < 10 ? `0${currentCard.cardNumber}` : currentCard.cardNumber}
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/70 font-serif-cormorant font-semibold">
                Major Arcana
              </span>
            </div>

            {/* Emblem Center */}
            <div className="text-center my-auto space-y-3 z-10">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#172136] border border-[#C9A45C]/40 flex items-center justify-center shadow-inner group-hover:border-[#C9A45C] transition-colors">
                <span className="font-serif-cormorant text-4xl text-[#C9A45C] font-bold">
                  {currentCard.cardNumber}
                </span>
              </div>
              <div>
                <h4 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-white tracking-wide">
                  {currentCard.cardName}
                </h4>
                <div className="text-xs text-[#C9A45C] font-serif-fraunces italic mt-1">
                  {currentCard.arcanaNameId}
                </div>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="z-10 text-center pt-2 border-t border-white/10">
              <span className="text-[10px] text-[#F4EDE1]/60 tracking-wider flex items-center justify-center gap-1">
                <RotateCw className="w-3 h-3 text-[#C9A45C]" />
                <span>Klik untuk membalik kartu</span>
              </span>
            </div>
          </div>

          {/* BACK OF THE TAROT CARD */}
          <div className="absolute inset-0 bg-[#F4EDE1] text-[#1F2A44] rounded-3xl p-6 border-2 border-[#C9A45C]/60 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-2xl overflow-hidden">
            <div className="border-b border-[#1F2A44]/10 pb-2 flex justify-between items-center">
              <span className="text-[10px] uppercase font-bold text-[#8A9A7B] tracking-wider">
                Refleksi Jiwa
              </span>
              <span className="font-mono text-xs text-[#C2673F] font-bold">
                № {currentCard.cardNumber}
              </span>
            </div>

            <div className="space-y-3 my-auto">
              <div className="text-xs font-semibold uppercase text-[#1F2A44]/60 tracking-wider">
                Pertanyaan Renungan:
              </div>
              <blockquote className="font-serif-fraunces text-sm sm:text-base italic leading-relaxed text-[#1F2A44] border-l-2 border-[#C2673F] pl-3 py-1">
                “{currentCard.reflectiveQuestion}”
              </blockquote>

              <div className="pt-2 flex flex-wrap gap-1.5">
                {currentCard.keywords.map((kw, i) => (
                  <span key={i} className="text-[10px] px-2.5 py-1 rounded-full bg-white border border-gray-200 text-gray-700 font-medium">
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-[10px] text-[#1F2A44]/60 text-center border-t border-[#1F2A44]/10 pt-2">
              Klik untuk kembali ke sisi depan
            </div>
          </div>
        </div>
      </div>

      {/* Card Symbolism Summary */}
      <p className="text-xs text-[#1F2A44]/80 leading-relaxed font-sans-dm text-center max-w-sm mx-auto">
        {currentCard.symbolism}
      </p>

      {/* Explore other Major Arcana cards slider */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-500">
        <button
          onClick={handlePrevCard}
          className="flex items-center gap-1 hover:text-[#C2673F] font-medium transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        <span className="font-mono text-[11px] text-[#1F2A44] font-semibold">
          Kartu {currentCardNumber} / 21
        </span>

        <button
          onClick={handleNextCard}
          className="flex items-center gap-1 hover:text-[#C2673F] font-medium transition-colors"
        >
          <span>Berikutnya</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
