import React, { useState } from 'react';
import { Copy, Check, CheckCircle2, XCircle, Sparkles, Palette, Type, Image as ImageIcon } from 'lucide-react';
import { COLOR_PALETTE } from '../data/blueprintData';
import { LoShuCanvas } from './LoShuCanvas';

export const VisualIdentity: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="space-y-16 py-6">
      {/* SECTION HEADER: BAB 6 IDENTITAS VISUAL */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#C9A45C]/20 shadow-sm space-y-10">
        <div className="border-b border-[#1F2A44]/10 pb-6 max-w-4xl">
          <div className="text-xs uppercase tracking-widest text-[#C2673F] font-semibold mb-1">
            Bab 6 · Sistem Desain
          </div>
          <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#1F2A44]">
            Identitas Visual & Design System
          </h2>
          <p className="text-sm text-[#1F2A44]/70 mt-1">
            Satu simbol yang menyatukan angka dan bintang: kisi 3×3 berisi sembilan titik yang membentuk rasi.
          </p>
        </div>

        {/* LOGOMARK & WORDMARK ANATOMY (PAGE 15) */}
        <div className="bg-[#1F2A44] text-[#F4EDE1] rounded-2xl p-6 sm:p-8 border border-[#C9A45C]/40 shadow-lg relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Step 1: Lo Shu Grid */}
            <div className="bg-[#172136] p-5 rounded-2xl border border-white/10 text-center flex flex-col items-center">
              <div className="grid grid-cols-3 gap-2 p-3 bg-black/20 rounded-xl mb-3 font-mono text-xs w-28 h-28 items-center justify-center">
                <span className="text-white/60">4</span>
                <span className="text-white/60">9</span>
                <span className="text-white/60">2</span>
                <span className="text-white/60">3</span>
                <span className="text-white/60">5</span>
                <span className="text-white/60">7</span>
                <span className="text-white/60">8</span>
                <span className="text-white/60">1</span>
                <span className="text-white/60">6</span>
              </div>
              <div className="text-xs font-bold text-[#C9A45C] uppercase">1 · Kisi Lo Shu</div>
              <p className="text-[11px] text-[#F4EDE1]/70 mt-1">Struktur 9 titik kosmis</p>
            </div>

            {/* Step 2: Rasi 8-5-2+9 */}
            <div className="bg-[#172136] p-5 rounded-2xl border border-[#C9A45C]/40 text-center flex flex-col items-center">
              <div className="mb-3">
                <LoShuCanvas
                  activeNodes={[8, 5, 2, 9]}
                  lines={[[8, 5], [5, 2], [5, 9]]}
                  size={90}
                  theme="dark"
                />
              </div>
              <div className="text-xs font-bold text-[#C9A45C] uppercase">2 · Rasi 8–5–2+9</div>
              <p className="text-[11px] text-[#F4EDE1]/70 mt-1">Langkah menanjak & penyelesaian siklus</p>
            </div>

            {/* Step 3: Avatar / App Icon */}
            <div className="bg-[#172136] p-5 rounded-2xl border border-white/10 text-center flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl bg-[#1F2A44] border-2 border-[#C9A45C] shadow-lg flex items-center justify-center mb-3">
                <LoShuCanvas
                  activeNodes={[8, 5, 2, 9]}
                  lines={[[8, 5], [5, 2], [5, 9]]}
                  size={60}
                  theme="dark"
                />
              </div>
              <div className="text-xs font-bold text-[#C9A45C] uppercase">3 · Avatar Resmi</div>
              <p className="text-[11px] text-[#F4EDE1]/70 mt-1">Aplikasi medsos & favicon</p>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <LoShuCanvas
                  activeNodes={[8, 5, 2, 9]}
                  lines={[[8, 5], [5, 2], [5, 9]]}
                  size={36}
                  theme="dark"
                />
              </div>
              <div>
                <div className="font-serif-cormorant text-2xl font-bold tracking-tight text-white leading-none">
                  lintang
                </div>
                <div className="text-[9px] tracking-[0.25em] uppercase text-[#C9A45C] font-semibold mt-1">
                  STUDIO PETA DIRI
                </div>
              </div>
            </div>

            <div className="text-xs text-[#F4EDE1]/80 max-w-md text-center sm:text-right font-sans-dm">
              Wordmark huruf kecil dengan serif lembut; deskriptor dalam sans-serif tipis dengan spasi huruf lebar.
            </div>
          </div>
        </div>

        {/* PALET WARNA INTERAKTIF (PAGE 16) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
                Palet Warna Resmi
              </h3>
              <p className="text-xs text-[#1F2A44]/70">
                Klik kartu warna untuk menyalin kode HEX langsung ke clipboard.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#C2673F] font-semibold">
              <Palette className="w-4 h-4" />
              <span>5 Warna Identitas</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {COLOR_PALETTE.map((color) => {
              const isCopied = copiedHex === color.hex;
              return (
                <div
                  key={color.hex}
                  onClick={() => handleCopyColor(color.hex)}
                  className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group bg-white flex flex-col justify-between"
                >
                  {/* Swatch Color Preview */}
                  <div
                    className="h-28 w-full p-3 flex flex-col justify-between transition-transform group-hover:scale-102"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-sm self-start"
                      style={{
                        backgroundColor: color.hex === '#F4EDE1' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)',
                        color: color.contrastText,
                      }}
                    >
                      {color.role}
                    </span>

                    <div className="flex items-center justify-between">
                      <span
                        className="font-mono text-xs font-bold"
                        style={{ color: color.contrastText }}
                      >
                        {color.hex}
                      </span>
                      <button
                        className="p-1 rounded-md transition-opacity"
                        style={{
                          backgroundColor: color.hex === '#F4EDE1' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.25)',
                          color: color.contrastText,
                        }}
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Description Info */}
                  <div className="p-3.5 space-y-1">
                    <div className="font-serif-cormorant text-base font-bold text-[#1F2A44]">
                      {color.name}
                    </div>
                    <div className="text-[11px] text-[#1F2A44]/75 line-clamp-2 font-sans-dm">
                      {color.usage}
                    </div>
                    {isCopied && (
                      <div className="text-[10px] font-bold text-emerald-700 animate-fadeIn">
                        HEX {color.hex} tersalin!
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TIPOGRAFI & PAIRING (PAGE 16) */}
        <div>
          <div className="mb-4">
            <h3 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
              Tipografi
            </h3>
            <p className="text-xs text-[#1F2A44]/70">
              Kombinasi serif puitis dan sans-serif bersih dari Google Fonts (bebas royalti).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Serif */}
            <div className="p-6 rounded-2xl bg-[#F4EDE1]/50 border border-[#C9A45C]/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#C2673F]">
                  Judul & Kutipan Utama
                </span>
                <span className="font-serif-cormorant text-3xl font-bold text-[#1F2A44]">Aa</span>
              </div>
              <h4 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
                Fraunces / Cormorant Garamond
              </h4>
              <p className="text-xs text-[#1F2A44]/80 leading-relaxed font-sans-dm">
                Serif lembut, elegan, dan menenangkan untuk judul utama, nama layanan, dan kutipan reflektif. Memberikan nuansa buku sastra yang hangat.
              </p>
              <div className="p-3 rounded-xl bg-white border border-[#1F2A44]/10 text-xs font-serif-cormorant text-[#1F2A44] italic">
                “Baca polamu, pilih langkahmu. Bukan ramalan, melainkan cermin.”
              </div>
            </div>

            {/* Sans-serif */}
            <div className="p-6 rounded-2xl bg-[#F4EDE1]/50 border border-[#8A9A7B]/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8A9A7B]">
                  Teks Isi, Laporan & Antarmuka
                </span>
                <span className="font-sans-dm text-3xl font-bold text-[#1F2A44]">Aa</span>
              </div>
              <h4 className="font-sans-dm text-xl font-bold text-[#1F2A44]">
                DM Sans / Inter
              </h4>
              <p className="text-xs text-[#1F2A44]/80 leading-relaxed font-sans-dm">
                Sans-serif bersih dengan tingkat keterbacaan tinggi untuk paragraf laporan, caption media sosial, tombol antarmuka, dan data teknis kelahiran.
              </p>
              <div className="p-3 rounded-xl bg-white border border-[#1F2A44]/10 text-xs font-sans-dm text-[#1F2A44]">
                Laporan PDF diformat dengan grid teratur dan spasi paragraf nyaman untuk membaca santai di gawai maupun cetak.
              </div>
            </div>
          </div>
        </div>

        {/* GAYA FOTO & ILUSTRASI: PAKAI VS HINDARI (PAGE 16) */}
        <div>
          <div className="mb-4">
            <h3 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
              Gaya Foto & Ilustrasi
            </h3>
            <p className="text-xs text-[#1F2A44]/70">
              Menjaga citra brand agar tetap membumi, modern, dan tidak menyeramkan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pakai */}
            <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Pakai (Visual Lintang)</span>
              </div>
              <ul className="text-xs text-emerald-950 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span><strong>Tekstur Kertas:</strong> Memberikan sensasi sentuhan hangat, jurnal harian, dan keaslian.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span><strong>Langit Senja & Malam Lembut:</strong> Gradasi biru tua hangat, mentari temaram, dan bulan sabit.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span><strong>Humanis & Menulis:</strong> Tangan memegang cangkir teh, membuka buku catatan, atau pensil kayu.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span><strong>Garis Rasi Tipis:</strong> Garis geometris tipis berjarak lega, menghubungkan titik bintang dengan rapi.</span>
                </li>
              </ul>
            </div>

            {/* Hindari */}
            <div className="p-6 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-3">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Hindari (Visual Menyeramkan)</span>
              </div>
              <ul className="text-xs text-rose-950 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                  <span><strong>Bola Kristal Bercahaya:</strong> Terlalu klise mistis ala dukun ramal tempo dulu.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                  <span><strong>Tengkorak & Simbol Okultisme Gelap:</strong> Menimbulkan rasa takut dan bertolak belakang dengan nilai hangat Lintang.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                  <span><strong>Visual Hitam Pekat Berawan Asap:</strong> Menghilangkan kesan bersih, jujur, dan teratur.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                  <span><strong>Wajah Menatap Misterius / Tatapan Horor:</strong> Tidak sesuai dengan konsep kakak pendamping refleksi diri.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
