import React, { useState } from 'react';
import { Compass, ShieldCheck, HeartHandshake, Sparkles, Lock, CheckCircle2, AlertCircle, AtSign, Globe, ArrowUpRight } from 'lucide-react';
import { CANDIDATE_NAMES, CORE_VALUES } from '../data/blueprintData';

export const BrandFoundation: React.FC = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<string>('Lintang · Studio Peta Diri');
  const [activeValueTab, setActiveValueTab] = useState<string>('Jujur');

  const iconsMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#C9A45C]" />,
    HeartHandshake: <HeartHandshake className="w-5 h-5 text-[#C2673F]" />,
    Compass: <Compass className="w-5 h-5 text-[#8A9A7B]" />,
    Sparkles: <Sparkles className="w-5 h-5 text-[#C9A45C]" />,
    Lock: <Lock className="w-5 h-5 text-[#1F2A44]" />,
  };

  return (
    <div className="space-y-16 py-8">
      {/* SECTION 1: BAB 1 NAMA BRAND */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#C9A45C]/20 shadow-sm relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="border-b border-[#1F2A44]/10 pb-6">
            <div className="text-xs uppercase tracking-widest text-[#C2673F] font-semibold mb-1">
              Bab 1 · Identitas Brand
            </div>
            <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#1F2A44]">
              Nama Brand
            </h2>
            <p className="text-sm text-[#1F2A44]/70 mt-1">
              Satu kata yang hangat, singkat, dan langsung terhubung dengan langit.
            </p>
          </div>

          {/* Primary Recommendation Banner */}
          <div className="bg-[#1F2A44] text-[#F4EDE1] rounded-2xl p-6 sm:p-8 border border-[#C9A45C]/40 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#C9A45C]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="inline-block px-3 py-1 rounded-md bg-[#C9A45C] text-[#1F2A44] text-[11px] font-bold uppercase tracking-wider mb-4">
              Rekomendasi Utama
            </div>
            <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#F4EDE1] mb-2">
              Lintang · Studio Peta Diri
            </h3>
            <p className="text-sm sm:text-base text-[#F4EDE1]/90 leading-relaxed font-sans-dm mb-6">
              “Lintang” berarti bintang dalam bahasa Jawa. Mudah diucapkan, terasa lokal, hangat, dan bisa diturunkan secara organik ke berbagai lini layanan seperti <strong>Dua Lintang</strong>, <strong>Lingkar Lintang</strong>, maupun <strong>Kado Lintang</strong>. Deskriptor “Studio Peta Diri” menjelaskan inti layanan secara profesional tanpa terdengar mistis atau klenik.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="flex items-center gap-1.5 text-[#C9A45C] font-semibold mb-1">
                  <AtSign className="w-3.5 h-3.5" />
                  <span>Handle Utama</span>
                </div>
                <div className="font-mono text-sm font-semibold text-white">@lintang.petadiri</div>
              </div>

              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="flex items-center gap-1.5 text-[#C9A45C] font-semibold mb-1">
                  <AtSign className="w-3.5 h-3.5" />
                  <span>Cadangan Handle</span>
                </div>
                <div className="font-mono text-xs text-[#F4EDE1]/80">@lintangstudio · @petadiri.lintang</div>
              </div>

              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="flex items-center gap-1.5 text-[#C9A45C] font-semibold mb-1">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Domain Website</span>
                </div>
                <div className="font-mono text-xs text-[#F4EDE1]/80">lintangpetadiri.com · petadiri.id</div>
              </div>
            </div>
          </div>

          {/* Cerita di Balik Nama Quote */}
          <div className="p-6 rounded-2xl bg-[#F4EDE1] border-l-4 border-[#C2673F]">
            <div className="text-xs uppercase font-semibold text-[#C2673F] mb-1">Cerita di Balik Nama</div>
            <blockquote className="font-serif-fraunces text-lg sm:text-xl text-[#1F2A44] italic leading-snug">
              “Setiap orang lahir di bawah susunan bintang dan angka yang unik. Kami membantu membacanya, supaya kamu bisa memilih langkah dengan lebih sadar.”
            </blockquote>
          </div>

          {/* Candidate Comparison Matrix */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
                Kandidat yang Dipertimbangkan
              </h3>
              <span className="text-xs text-[#1F2A44]/60">Klik kandidat untuk melihat evaluasi</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CANDIDATE_NAMES.map((candidate) => {
                const isSelected = selectedCandidate === candidate.name;
                const isRecommended = candidate.status === 'rekomendasi';
                return (
                  <div
                    key={candidate.name}
                    onClick={() => setSelectedCandidate(candidate.name)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#C2673F] bg-[#F4EDE1]/40 ring-1 ring-[#C2673F]/30 shadow-md'
                        : 'border-[#1F2A44]/10 bg-white hover:border-[#C9A45C]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif-cormorant text-xl font-bold text-[#1F2A44]">
                        {candidate.name}
                      </span>
                      {isRecommended ? (
                        <span className="px-2 py-0.5 rounded-full bg-[#C2673F] text-white text-[10px] font-semibold tracking-wider uppercase">
                          Rekomendasi
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-medium">
                          Alternatif
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#1F2A44]/80 mb-3">{candidate.meaning}</p>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-start gap-1.5 text-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-600" />
                        <span>{candidate.pros}</span>
                      </div>
                      <div className="flex items-start gap-1.5 text-rose-800">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-600" />
                        <span>{candidate.cons}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 p-4 rounded-xl bg-[#8A9A7B]/15 border border-[#8A9A7B]/40 text-xs text-[#1F2A44] flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#8A9A7B] shrink-0 mt-0.5" />
              <div>
                <strong>Catatan Legalitas Sebelum Dipakai:</strong> Cek nama di PDKI DJKI (Pangkalan Data Kekayaan Intelektual), ketersediaan handle Instagram/TikTok, dan domain web. Jika “Lintang” sudah terdaftar di kelas jasa yang sama, gunakan kandidat berikutnya yang lolos.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: BAB 2 FONDASI BRAND */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#C9A45C]/20 shadow-sm relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="border-b border-[#1F2A44]/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#C2673F] font-semibold mb-1">
                Bab 2 · Filosofi & Arah
              </div>
              <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#1F2A44]">
                Fondasi Brand
              </h2>
              <p className="text-sm text-[#1F2A44]/70 mt-1">
                Lintang adalah teman refleksi yang cerdas, bukan peramal yang menentukan nasib.
              </p>
            </div>

            {/* Compass Graphic from Page 5 */}
            <div className="flex items-center gap-3 bg-[#1F2A44] text-[#F4EDE1] px-4 py-2.5 rounded-2xl border border-[#C9A45C]/40 self-start md:self-auto shadow-sm">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <span className="absolute top-0 text-[8px] font-bold text-[#C9A45C]">U</span>
                <span className="absolute bottom-0 text-[8px] font-bold text-[#C9A45C]">S</span>
                <span className="absolute left-0 text-[8px] font-bold text-[#C9A45C]">B</span>
                <span className="absolute right-0 text-[8px] font-bold text-[#C9A45C]">T</span>
                <div className="w-5 h-5 rounded-full border border-[#C9A45C]/40 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C2673F]" />
                </div>
              </div>
              <div className="text-left text-xs">
                <div className="font-bold font-serif-cormorant text-sm leading-tight text-white">Kompas Refleksi</div>
                <div className="text-[10px] text-[#C9A45C]">Navigasi Sadar</div>
              </div>
            </div>
          </div>

          {/* Misi & Visi Dual Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#F4EDE1]/70 border border-[#C9A45C]/30 relative">
              <div className="inline-block px-3 py-1 rounded-md bg-[#C2673F] text-white text-[11px] font-bold uppercase tracking-wider mb-3">
                Misi
              </div>
              <h3 className="font-serif-fraunces text-xl font-semibold text-[#1F2A44] mb-2">
                Membantu orang Indonesia mengenal diri lewat bahasa angka dan bintang
              </h3>
              <p className="text-sm text-[#1F2A44]/80 leading-relaxed font-sans-dm">
                Lalu menerjemahkannya menjadi langkah nyata yang membumi dalam karier, relasi, dan waktu hidup.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#1F2A44] text-[#F4EDE1] border border-[#C9A45C]/40 relative">
              <div className="inline-block px-3 py-1 rounded-md bg-[#C9A45C] text-[#1F2A44] text-[11px] font-bold uppercase tracking-wider mb-3">
                Visi
              </div>
              <h3 className="font-serif-fraunces text-xl font-semibold text-[#F4EDE1] mb-2">
                Studio peta diri berbahasa Indonesia paling dipercaya
              </h3>
              <p className="text-sm text-[#F4EDE1]/80 leading-relaxed font-sans-dm">
                Dipercaya secara luas oleh generasi urban karena berpegang teguh pada prinsip jujur, rapi, dan membumi.
              </p>
            </div>
          </div>

          {/* Positioning Statement */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#F4EDE1] to-white border-l-4 border-[#1F2A44] shadow-sm">
            <div className="text-xs uppercase font-bold tracking-wider text-[#1F2A44]/70 mb-2">
              Positioning
            </div>
            <p className="text-base sm:text-lg text-[#1F2A44] font-medium leading-relaxed font-sans-dm mb-4">
              “Untuk anak muda urban yang sedang mencari arah, <strong>Lintang</strong> adalah studio peta diri yang merangkai numerologi, astrologi, dan sistem Timur dalam satu laporan yang mudah dipahami. Bedanya dari ramalan biasa: <strong>fokus pada pilihan sadar, bukan takdir.</strong>”
            </p>

            <div className="pt-4 border-t border-[#1F2A44]/10">
              <div className="text-xs uppercase font-semibold text-[#C2673F] mb-2">Alternatif Tagline</div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-full bg-[#1F2A44] text-[#F4EDE1] text-xs font-serif-cormorant font-bold">
                  “Bukan ramalan, tapi cermin.”
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white border border-[#C9A45C]/50 text-[#1F2A44] text-xs font-serif-cormorant font-bold">
                  “Peta dirimu, dalam angka dan bintang.”
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white border border-[#8A9A7B]/50 text-[#1F2A44] text-xs font-serif-cormorant font-bold">
                  “Kenali musimmu.”
                </span>
              </div>
            </div>
          </div>

          {/* Lima Nilai (The 5 Core Values) */}
          <div>
            <div className="mb-6">
              <h3 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
                Lima Nilai Lintang
              </h3>
              <p className="text-xs sm:text-sm text-[#1F2A44]/70">
                Prinsip etika tak tertawar yang menjiwai setiap tulisan, laporan, dan interaksi.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CORE_VALUES.map((val) => (
                <div
                  key={val.name}
                  onClick={() => setActiveValueTab(val.name)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    activeValueTab === val.name
                      ? 'border-[#C2673F] bg-[#F4EDE1]/50 shadow-md ring-1 ring-[#C2673F]/20'
                      : 'border-[#1F2A44]/10 bg-white hover:border-[#C9A45C]'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-[#1F2A44]/5">
                      {iconsMap[val.iconName]}
                    </div>
                    <div>
                      <h4 className="font-serif-cormorant text-xl font-bold text-[#1F2A44]">
                        {val.name}
                      </h4>
                      <div className="text-[11px] text-[#C2673F] font-semibold">{val.meaning}</div>
                    </div>
                  </div>
                  <div className="text-xs italic text-[#1F2A44]/70 mb-2">
                    “{val.tagline}”
                  </div>
                  <p className="text-xs text-[#1F2A44]/80 leading-relaxed font-sans-dm">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
