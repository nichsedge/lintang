import React, { useState } from 'react';
import { Sparkles, Calendar, User, Compass, Copy, Check, Share2, BookOpen, ArrowRight, Heart } from 'lucide-react';
import { generatePetaDiri, FullPetaDiriResult } from '../utils/numerology';
import { LoShuCanvas } from './LoShuCanvas';

interface LifePathCalculatorProps {
  onOrderFullReport: (serviceId: string) => void;
}

export const LifePathCalculator: React.FC<LifePathCalculatorProps> = ({
  onOrderFullReport,
}) => {
  const [fullName, setFullName] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('1998-08-17');
  const [birthTime, setBirthTime] = useState<string>('');
  const [birthCity, setBirthCity] = useState<string>('');
  const [result, setResult] = useState<FullPetaDiriResult | null>(() =>
    generatePetaDiri('Arka Pratama', '1998-08-17')
  );
  const [copied, setCopied] = useState<boolean>(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate) return;
    const computed = generatePetaDiri(fullName, birthDate, birthTime, birthCity);
    setResult(computed);
  };

  const handleCopySummary = () => {
    if (!result) return;
    const text = `✨ Peta Diri Lintang untuk ${result.name} (${result.birthDateStr}) ✨

🌟 Life Path: Angka ${result.lifePath.number} — ${result.lifePath.name}
"${result.lifePath.lintangReflection}"

🌱 Musim Diri (Tahun Ini): Angka ${result.personalYear.personalYear} — ${result.personalYear.stageName}
Tema: ${result.personalYear.theme}
"${result.personalYear.lintangAdvice}"

🃏 Kartu Lahir Tarot: ${result.tarotCard.cardName} (${result.tarotCard.arcanaNameId})
Pertanyaan Refleksi: "${result.tarotCard.reflectiveQuestion}"

🌿 Rekomendasi Minggu Ini:
${result.lifePath.practicalWeeklyAction}

— Dihitung melalui Lintang · Studio Peta Diri (lintangpetadiri.com)
"Baca polamu, pilih langkahmu."`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-12 py-6">
      {/* SECTION HEADER */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#C9A45C]/20 shadow-sm">
        <div className="max-w-4xl border-b border-[#1F2A44]/10 pb-6 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A45C]/15 text-[#1F2A44] text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>Aset Jualan #09 · Lead Magnet Interaktif</span>
          </div>
          <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#1F2A44]">
            Kalkulator Peta Diri Gratis
          </h2>
          <p className="text-sm text-[#1F2A44]/70 mt-1">
            Uji coba pintu masuk Lintang: hitung Life Path, Musim Diri siklus 9 tahun, Kartu Lahir Tarot, dan kisi Lo Shu 3×3 langsung di sini.
          </p>
        </div>

        {/* INPUT FORM */}
        <form onSubmit={handleCalculate} className="bg-[#F4EDE1]/50 rounded-2xl p-6 border border-[#C9A45C]/30 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-[#1F2A44] mb-1">
                Nama Lengkap (sesuai akta/panggilan)
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#1F2A44]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Contoh: Arka Pratama"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C2673F] bg-white text-sm text-[#1F2A44]"
                />
              </div>
            </div>

            {/* Birth Date */}
            <div>
              <label className="block text-xs font-semibold text-[#1F2A44] mb-1">
                Tanggal Lahir <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-[#1F2A44]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  required
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C2673F] bg-white text-sm text-[#1F2A44]"
                />
              </div>
            </div>

            {/* Optional Birth Time */}
            <div>
              <label className="block text-xs font-semibold text-[#1F2A44] mb-1">
                Jam Lahir <span className="text-gray-400 font-normal">(opsional)</span>
              </label>
              <input
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C2673F] bg-white text-sm text-[#1F2A44]"
              />
            </div>

            {/* Optional Birth City */}
            <div>
              <label className="block text-xs font-semibold text-[#1F2A44] mb-1">
                Kota Lahir <span className="text-gray-400 font-normal">(opsional)</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Yogyakarta"
                value={birthCity}
                onChange={(e) => setBirthCity(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C2673F] bg-white text-sm text-[#1F2A44]"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-xs text-[#1F2A44]/70">
              🔒 <strong>Privasi Terjamin:</strong> Data perhitungan diproses langsung di perambanmu dan tidak disimpan tanpa izin.
            </span>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#C2673F] hover:bg-[#d67246] text-white font-semibold text-xs transition-all shadow flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Hitung Peta Dirimu Sekarang</span>
            </button>
          </div>
        </form>

        {/* RESULTS PRESENTATION */}
        {result && (
          <div className="space-y-8 animate-fadeIn">
            {/* Top Summary Banner */}
            <div className="bg-[#1F2A44] rounded-2xl p-6 sm:p-8 text-[#F4EDE1] border border-[#C9A45C]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold">
                  Hasil Peta Diri untuk:
                </div>
                <h3 className="font-serif-cormorant text-3xl font-bold text-white">
                  {result.name}
                </h3>
                <p className="text-xs text-[#F4EDE1]/80">
                  Lahir pada <strong>{result.birthDateStr}</strong>
                  {result.birthCity ? ` di ${result.birthCity}` : ''}
                  {result.birthTime ? ` pukul ${result.birthTime}` : ''}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopySummary}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-[#F4EDE1] transition-all flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#C9A45C]" />}
                  <span>{copied ? 'Tersalin!' : 'Salin Ringkasan'}</span>
                </button>
                <button
                  onClick={() => onOrderFullReport('kode-diri')}
                  className="px-4 py-2.5 rounded-xl bg-[#C2673F] hover:bg-[#d67246] text-xs font-semibold text-white transition-all shadow flex items-center gap-2"
                >
                  <span>Pesan Laporan Lengkap</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 4 Cards Grid for Core Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CARD 1: LIFE PATH NUMBER */}
              <div className="p-6 rounded-2xl bg-white border border-[#1F2A44]/15 shadow-sm space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[#C2673F] font-semibold">
                      Numerologi Pythagoras
                    </div>
                    <h4 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
                      Life Path {result.lifePath.number}
                    </h4>
                    <div className="text-xs font-medium text-[#1F2A44]/80">
                      {result.lifePath.name}
                    </div>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-[#C2673F] text-white font-serif-cormorant text-3xl font-bold flex items-center justify-center shadow-md">
                    {result.lifePath.number}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F4EDE1] text-xs font-sans-dm text-[#1F2A44] italic border-l-3 border-[#C2673F]">
                  “{result.lifePath.lintangReflection}”
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-[#1F2A44]">Tema Inti:</span>{' '}
                    <span className="text-[#1F2A44]/80">{result.lifePath.coreTheme}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#1F2A44]">Kekuatan Alami:</span>{' '}
                    <span className="text-[#1F2A44]/80">{result.lifePath.strengths.join(', ')}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#1F2A44]">Ruang Bertumbuh:</span>{' '}
                    <span className="text-[#1F2A44]/80">{result.lifePath.growthAreas.join(', ')}</span>
                  </div>
                </div>

                {/* Practical Weekly Action */}
                <div className="pt-3 border-t border-gray-100 flex items-start gap-2 text-xs text-[#8A9A7B]">
                  <Compass className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="text-[#1F2A44]/90">
                    <strong className="text-[#8A9A7B]">Langkah Minggu Ini:</strong>{' '}
                    {result.lifePath.practicalWeeklyAction}
                  </div>
                </div>
              </div>

              {/* CARD 2: MUSIM DIRI (PERSONAL YEAR CYCLE) */}
              <div className="p-6 rounded-2xl bg-white border border-[#1F2A44]/15 shadow-sm space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[#C9A45C] font-semibold">
                      Siklus 9 Tahun (2026)
                    </div>
                    <h4 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
                      Tahun Personal {result.personalYear.personalYear}
                    </h4>
                    <div className="text-xs font-medium text-[#1F2A44]/80">
                      {result.personalYear.stageName}
                    </div>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-[#C9A45C] text-[#1F2A44] font-serif-cormorant text-3xl font-bold flex items-center justify-center shadow-md">
                    {result.personalYear.personalYear}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F4EDE1] text-xs font-sans-dm text-[#1F2A44] italic border-l-3 border-[#C9A45C]">
                  “{result.personalYear.lintangAdvice}”
                </div>

                <p className="text-xs text-[#1F2A44]/80 leading-relaxed">
                  {result.personalYear.description}
                </p>

                <div className="pt-2">
                  <div className="text-[11px] font-bold text-[#1F2A44] uppercase mb-1">
                    Fokus yang Direkomendasikan:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.personalYear.recommendedFocus.map((f, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-[#F4EDE1] text-[#1F2A44] text-[11px] font-medium">
                        • {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CARD 3: KARTU LAHIR TAROT */}
              <div className="p-6 rounded-2xl bg-white border border-[#1F2A44]/15 shadow-sm space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[#8A9A7B] font-semibold">
                      Tarot Birth Card (Major Arcana)
                    </div>
                    <h4 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
                      {result.tarotCard.cardNumber}. {result.tarotCard.cardName}
                    </h4>
                    <div className="text-xs font-medium text-[#8A9A7B]">
                      {result.tarotCard.arcanaNameId}
                    </div>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-[#8A9A7B] text-white font-serif-cormorant text-2xl font-bold flex items-center justify-center shadow-md">
                    {result.tarotCard.cardNumber}
                  </div>
                </div>

                <p className="text-xs text-[#1F2A44]/80 leading-relaxed font-sans-dm">
                  {result.tarotCard.symbolism}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {result.tarotCard.keywords.map((kw, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-[10px] font-medium">
                      #{kw}
                    </span>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-[#F4EDE1]/80 text-xs text-[#1F2A44] border-l-3 border-[#8A9A7B]">
                  <strong>Pertanyaan Refleksi Jiwa:</strong>
                  <div className="italic mt-0.5">“{result.tarotCard.reflectiveQuestion}”</div>
                </div>
              </div>

              {/* CARD 4: KISI SEMBILAN LO SHU & KARMA CHECK */}
              <div className="p-6 rounded-2xl bg-white border border-[#1F2A44]/15 shadow-sm space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[#1F2A44]/60 font-semibold">
                      Kisi Sembilan (Lo Shu Grid)
                    </div>
                    <h4 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
                      Pemetaan Angka Kelahiran
                    </h4>
                    <div className="text-xs text-[#1F2A44]/70">
                      Distribusi angka di kisi 3×3
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {/* Visual 3x3 Mini Grid with actual numbers */}
                  <div className="grid grid-cols-3 gap-1.5 p-3 rounded-xl bg-[#1F2A44] text-[#F4EDE1] text-center w-36 h-36 shrink-0">
                    {[4, 9, 2, 3, 5, 7, 8, 1, 6].map((num) => {
                      const count = result.loShu.counts[num] || 0;
                      return (
                        <div
                          key={num}
                          className={`rounded-lg flex flex-col items-center justify-center text-xs font-mono transition-all ${
                            count > 0
                              ? 'bg-[#C9A45C] text-[#1F2A44] font-bold shadow'
                              : 'bg-white/5 text-white/20'
                          }`}
                        >
                          <span className="text-[10px] leading-none">{num}</span>
                          {count > 1 && (
                            <span className="text-[8px] opacity-75">({count}x)</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-2 text-xs flex-1">
                    <div>
                      <span className="font-semibold text-emerald-800">Angka Hadir:</span>{' '}
                      <span>{result.loShu.presentNumbers.join(', ') || '—'}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-amber-800">Pelajaran (Kosong):</span>{' '}
                      <span>{result.loShu.missingNumbers.join(', ') || 'Semua terisi'}</span>
                    </div>

                    {/* Karmic Debt Notification */}
                    {result.karmicDebt.details.length > 0 ? (
                      <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[11px] mt-2">
                        <strong>Jejak Karma Terdeteksi:</strong> {result.karmicDebt.details.map((d) => d.title).join(', ')}.
                        <div className="text-[10px] text-amber-800/90 mt-0.5">
                          Lintang memandangnya sebagai tema belajar pemberdayaan, bukan kutukan nasib.
                        </div>
                      </div>
                    ) : (
                      <div className="text-[11px] text-gray-500">
                        Tidak ada angka karmic debt primer pada tanggal lahir.
                      </div>
                    )}
                  </div>
                </div>

                {/* Lo Shu Arrows found */}
                <div className="pt-2 text-xs">
                  <span className="font-bold text-[#1F2A44]">Panah Bakat Selesai:</span>{' '}
                  <span className="text-[#1F2A44]/80">
                    {result.loShu.arrows.filter((a) => a.isComplete).map((a) => a.name).join('; ') || 'Belum ada garis 3 angka penuh (pola fleksibel).'}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Invitation to Full Reading */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#F4EDE1] to-white border border-[#C9A45C]/40 text-center space-y-3">
              <h4 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
                Ingin Mengetahui Sintesis 10 Sistem Secara Utuh?
              </h4>
              <p className="text-xs sm:text-sm text-[#1F2A44]/80 max-w-xl mx-auto font-sans-dm leading-relaxed">
                Kalkulator di atas adalah sekilas pengantar. Di laporan lengkap <strong>Kode Diri</strong> atau <strong>Lintang Utuh</strong>, kamu akan mendapatkan analisis mendalam mengenai jam lahir, astrologi natal, BaZi 4 pilar, Human Design, hingga rekomendasi karier dan relasi terperinci.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => onOrderFullReport('lintang-utuh')}
                  className="px-5 py-2.5 rounded-xl bg-[#C2673F] text-white text-xs font-semibold hover:bg-[#d67246] transition-all shadow"
                >
                  Pelajari Paket Lintang Utuh
                </button>
                <button
                  onClick={() => onOrderFullReport('kode-diri')}
                  className="px-5 py-2.5 rounded-xl bg-[#1F2A44] text-[#F4EDE1] text-xs font-semibold hover:bg-[#2b3a5d] transition-all"
                >
                  Pesan Paket Kode Diri (Rp149–199 rb)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
