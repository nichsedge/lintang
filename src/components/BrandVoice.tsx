import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, XCircle, Sparkles, MessageSquare, Copy, Check } from 'lucide-react';
import { VOICE_RULES } from '../data/blueprintData';

export const BrandVoice: React.FC = () => {
  const [copiedQuote, setCopiedQuote] = useState<string | null>(null);

  // Brand Voice Transformer Simulator
  const [inputSentence, setInputSentence] = useState<string>(
    'Tahun 2026 kamu kena ciong nasib sial dan keuanganmu bangkrut!'
  );
  const [transformedSentence, setTransformedSentence] = useState<string>(
    'Di siklus tahun 2026 ini, ritme energimu cenderung mengajakmu untuk lebih berhati-hati dan menata ulang fondasi finansial secara cermat. Ini adalah fase untuk merapikan alur, bukan terburu-buru berspekulasi.'
  );

  const sampleTransformations = [
    {
      bad: 'Tahun 2026 kamu kena ciong nasib sial dan keuanganmu bangkrut!',
      good: 'Di siklus tahun 2026 ini, ritme energimu cenderung mengajakmu untuk lebih berhati-hati dan menata ulang fondasi finansial secara cermat. Ini adalah fase untuk merapikan alur, bukan terburu-buru berspekulasi.',
    },
    {
      bad: 'Kamu punya karma buruk nomor 16 yang artinya ego kamu kutukan seumur hidup.',
      good: 'Angka 16 di Jejak Karma bukan pertanda buruk atau kutukan. Ini adalah tema belajar tentang seni melepas ego palsu, dan banyak orang justru bertumbuh paling bijak di fase ini.',
    },
    {
      bad: 'Ramalan kami 100% akurat pasti kejadian, kamu harus putus dengan pacarmu!',
      good: 'Laporan ini membaca peta dua energi berdampingan. Ada dinamika komunikasi yang bisa kalian latih bersama, dan kamu selalu memiliki pilihan sadar untuk melangkah.',
    },
  ];

  const handleApplyPreset = (preset: { bad: string; good: string }) => {
    setInputSentence(preset.bad);
    setTransformedSentence(preset.good);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedQuote(id);
    setTimeout(() => setCopiedQuote(null), 2000);
  };

  return (
    <div className="space-y-16 py-6">
      {/* SECTION HEADER: BAB 5 SUARA BRAND */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#C9A45C]/20 shadow-sm space-y-10">
        <div className="border-b border-[#1F2A44]/10 pb-6 max-w-4xl">
          <div className="text-xs uppercase tracking-widest text-[#C2673F] font-semibold mb-1">
            Bab 5 · Panduan Bahasa
          </div>
          <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#1F2A44]">
            Suara Brand Lintang
          </h2>
          <p className="text-sm text-[#1F2A44]/70 mt-1">
            Seperti kakak yang paham astrologi: menyapa dengan “kamu”, santai tapi rapi, membuka kemungkinan alih-alih memvonis.
          </p>
        </div>

        {/* Core Tone Philosophy Callout */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#1F2A44] text-[#F4EDE1] border border-[#C9A45C]/40 shadow-lg relative overflow-hidden">
          <div className="max-w-2xl space-y-3">
            <div className="inline-block px-3 py-1 rounded-md bg-[#C9A45C] text-[#1F2A44] text-[11px] font-bold uppercase tracking-wider">
              Prinsip Emas Lintang
            </div>
            <h3 className="font-serif-fraunces text-2xl sm:text-3xl text-white font-normal italic leading-snug">
              “Setiap kalimat harus membuat pembaca merasa lebih paham dan lebih berdaya, bukan lebih takut.”
            </h3>
            <p className="text-xs sm:text-sm text-[#F4EDE1]/80 leading-relaxed font-sans-dm pt-2">
              Lintang menolak taktik <em>fear-mongering</em> atau ramalan menakut-nakuti yang sering ditemui di dunia astrologi komersial. Kami hadir sebagai teman refleksi cerdas yang memperluas ruang kesadaran dan pilihan hidupmu.
            </p>
          </div>
        </div>

        {/* PAKAI VS HINDARI MATRIX TABLE (PAGE 13) */}
        <div>
          <div className="mb-4">
            <h3 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
              Kamus Pilihan Kata: Pakai vs Hindari
            </h3>
            <p className="text-xs text-[#1F2A44]/70">
              Gunakan kata-kata di kolom kiri untuk menjaga keselarasan getaran bahasa Lintang.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {VOICE_RULES.map((rule, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#F4EDE1]/40 border border-[#C9A45C]/20 shadow-sm space-y-3"
              >
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#1F2A44]/60">
                  Konteks: {rule.context}
                </div>

                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-emerald-900 uppercase text-[10px]">Pakai (Bahasa Lintang):</div>
                      <div className="text-emerald-950 font-medium font-serif-fraunces text-sm">
                        “{rule.pakai}”
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-rose-900 uppercase text-[10px]">Hindari (Bahasa Vonis):</div>
                      <div className="text-rose-950 font-medium font-serif-fraunces text-sm line-through opacity-80">
                        “{rule.hindari}”
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-[#1F2A44]/75 italic">
                  💡 {rule.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* INTERACTIVE TRANSFORMER SIMULATOR */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1F2A44] to-[#172136] text-[#F4EDE1] border border-[#C9A45C]/40 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#C9A45C] font-semibold">
                Simulasi Suara Brand
              </div>
              <h3 className="font-serif-cormorant text-2xl font-bold text-white">
                Tone Transformer: Mengubah Vonis Jadi Refleksi
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5 text-xs">
              <span className="text-xs text-white/60 self-center mr-1">Contoh Cepat:</span>
              {sampleTransformations.map((st, i) => (
                <button
                  key={i}
                  onClick={() => handleApplyPreset(st)}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[#C9A45C] text-[11px] font-medium transition-all"
                >
                  Skenario {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input / Vonis Biasa */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5" />
                <span>Bahasa Ramalan Biasa (Menakut-nakuti):</span>
              </label>
              <textarea
                rows={4}
                value={inputSentence}
                onChange={(e) => setInputSentence(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#C9A45C]"
                placeholder="Ketik kalimat ramalan biasa..."
              />
            </div>

            {/* Output / Suara Lintang */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Bahasa Lintang (Hangat, Membumi, Memberdayakan):</span>
              </label>
              <div className="p-3.5 rounded-xl bg-[#F4EDE1] text-[#1F2A44] border border-[#C9A45C] min-h-[105px] flex flex-col justify-between">
                <p className="font-serif-fraunces text-xs sm:text-sm italic leading-relaxed text-[#1F2A44]">
                  “{transformedSentence}”
                </p>
                <div className="pt-2 text-[10px] text-[#C2673F] font-semibold flex items-center justify-between">
                  <span>✓ Tanpa vonis fatalistis</span>
                  <span>✓ Mengajak pada kesadaran</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* REAL BLUEPRINT SITUATIONAL EXAMPLES (PAGE 14) */}
        <div>
          <div className="mb-4">
            <h3 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
              Contoh Kalimat Nyata dari Cetak Biru
            </h3>
            <p className="text-xs text-[#1F2A44]/70">
              Tiga situasi yang paling sering muncul dalam operasional harian Lintang.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Situasi 1 */}
            <div className="p-6 rounded-2xl bg-white border border-[#1F2A44]/15 shadow-sm flex flex-col justify-between">
              <div>
                <div className="inline-block px-2.5 py-1 rounded-md bg-[#1F2A44] text-[#C9A45C] text-[10px] font-bold uppercase tracking-wider mb-3">
                  Caption Media Sosial
                </div>
                <blockquote className="font-serif-fraunces text-sm text-[#1F2A44] italic leading-relaxed mb-4">
                  “Life Path 7 sering terlihat pendiam, padahal pikirannya sedang menyusun teori. Kamu begitu juga? Tulis tanggal lahirmu di komentar.”
                </blockquote>
              </div>
              <button
                onClick={() => handleCopy('Life Path 7 sering terlihat pendiam, padahal pikirannya sedang menyusun teori. Kamu begitu juga? Tulis tanggal lahirmu di komentar.', 'quote-1')}
                className="text-xs text-[#C2673F] hover:text-[#d67246] font-semibold flex items-center gap-1.5 self-start pt-2"
              >
                {copiedQuote === 'quote-1' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedQuote === 'quote-1' ? 'Tersalin' : 'Salin Contoh'}</span>
              </button>
            </div>

            {/* Situasi 2 */}
            <div className="p-6 rounded-2xl bg-white border border-[#1F2A44]/15 shadow-sm flex flex-col justify-between">
              <div>
                <div className="inline-block px-2.5 py-1 rounded-md bg-[#1F2A44] text-[#C9A45C] text-[10px] font-bold uppercase tracking-wider mb-3">
                  Pembuka Laporan PDF
                </div>
                <blockquote className="font-serif-fraunces text-sm text-[#1F2A44] italic leading-relaxed mb-4">
                  “Laporan ini bukan ramalan, melainkan cermin. Ambil yang terasa benar, simpan sisanya untuk direnungkan.”
                </blockquote>
              </div>
              <button
                onClick={() => handleCopy('Laporan ini bukan ramalan, melainkan cermin. Ambil yang terasa benar, simpan sisanya untuk direnungkan.', 'quote-2')}
                className="text-xs text-[#C2673F] hover:text-[#d67246] font-semibold flex items-center gap-1.5 self-start pt-2"
              >
                {copiedQuote === 'quote-2' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedQuote === 'quote-2' ? 'Tersalin' : 'Salin Contoh'}</span>
              </button>
            </div>

            {/* Situasi 3 */}
            <div className="p-6 rounded-2xl bg-white border border-[#1F2A44]/15 shadow-sm flex flex-col justify-between">
              <div>
                <div className="inline-block px-2.5 py-1 rounded-md bg-[#C2673F] text-white text-[10px] font-bold uppercase tracking-wider mb-3">
                  Membalas Klien yang Cemas
                </div>
                <blockquote className="font-serif-fraunces text-sm text-[#1F2A44] italic leading-relaxed mb-4">
                  “Angka 16 di Jejak Karma bukan pertanda buruk. Ini tema belajar tentang melepas ego, dan banyak orang justru tumbuh paling besar di sini.”
                </blockquote>
              </div>
              <button
                onClick={() => handleCopy('Angka 16 di Jejak Karma bukan pertanda buruk. Ini tema belajar tentang melepas ego, dan banyak orang justru tumbuh paling besar di sini.', 'quote-3')}
                className="text-xs text-[#C2673F] hover:text-[#d67246] font-semibold flex items-center gap-1.5 self-start pt-2"
              >
                {copiedQuote === 'quote-3' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedQuote === 'quote-3' ? 'Tersalin' : 'Salin Contoh'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
