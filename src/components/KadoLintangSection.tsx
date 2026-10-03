import React from 'react';
import { Gift, Heart, Sparkles, Send, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../data/blueprintData';

interface KadoLintangSectionProps {
  onOrderGift: (service?: ServiceItem) => void;
  onExploreServices: () => void;
}

export const KadoLintangSection: React.FC<KadoLintangSectionProps> = ({
  onOrderGift,
  onExploreServices,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C2673F]/15 border border-[#C2673F]/30 text-[#C2673F] text-xs font-bold uppercase tracking-wider">
          <Gift className="w-3.5 h-3.5" />
          <span>Kado Lintang · Hadiah Momen Personal</span>
        </div>
        <h1 className="font-serif-cormorant text-4xl sm:text-5xl font-bold text-[#1F2A44] leading-tight">
          Beri Hadiah yang Mengenal Jiwanya Lebih Dalam.
        </h1>
        <p className="text-xs sm:text-sm text-[#1F2A44]/75 leading-relaxed">
          Kado ulang tahun, wisuda, atau transisi hidup yang bermakna. Bukan sekadar barang habis pakai, melainkan buku panduan potensi diri yang akan mereka simpan seumur hidup.
        </p>
      </div>

      {/* Visual Packaging Preview Card */}
      <div className="bg-[#1F2A44] text-[#F4EDE1] rounded-3xl p-6 sm:p-10 border border-[#C9A45C]/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#C9A45C]/20 to-transparent pointer-events-none rounded-full blur-2xl" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9A45C]">
              Kemasan Eksklusif Kado Lintang
            </span>
            <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-white">
              Sertifikat Elegan & Kartu Ucapan Personal
            </h2>
            <p className="text-xs text-[#F4EDE1]/85 leading-relaxed">
              Setiap pemesanan dengan add-on Kado Lintang (+Rp25 rb) dilengkapi sampul digital berstempel rasi emas, kartu ucapan personal yang ditulis tangan secara digital, dan tautan unduh berpassword yang estetik.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-bold text-white">Kartu Ucapan Kustom</div>
                  <div className="text-[#F4EDE1]/70 text-[11px]">Tulis doa tulusmu, kami rangkai dalam tipografi Fraunces klasik.</div>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                <Send className="w-4 h-4 text-[#8A9A7B] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-bold text-white">Pengiriman Terjadwal</div>
                  <div className="text-[#F4EDE1]/70 text-[11px]">Bisa dikirim langsung ke WhatsApp penerima di tanggal ulang tahunnya.</div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onOrderGift()}
                className="px-6 py-3 rounded-xl bg-[#C9A45C] hover:bg-[#d8b56f] text-[#1F2A44] font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Gift className="w-4 h-4 text-[#1F2A44]" />
                <span>Pesan Sebagai Kado Sekarang</span>
              </button>
              <button
                onClick={onExploreServices}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer border border-white/15"
              >
                <span>Lihat Pilihan Laporan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Realistic Gift Box Mockup Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm rounded-2xl bg-[#F4EDE1] text-[#1F2A44] p-6 shadow-2xl border-4 border-[#C9A45C]/60 space-y-4 relative transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center justify-between border-b border-[#1F2A44]/15 pb-3">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#C2673F]" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#C2673F]">
                    Kado Untuk Sahabat / Pasangan
                  </span>
                </div>
                <div className="w-6 h-6 rounded-full bg-[#C9A45C] text-[#1F2A44] flex items-center justify-center text-[10px] font-bold">
                  ★
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] text-[#1F2A44]/60 uppercase tracking-widest">Pesan Personalmu:</div>
                <p className="font-serif-cormorant italic text-base text-[#1F2A44] leading-snug">
                  “Selamat bertumbuh di usiamu yang baru, Nirwana. Semoga peta ini membantumu melangkah dengan tenang dan percaya diri.”
                </p>
                <div className="text-[10px] font-bold text-[#C2673F] text-right mt-1">
                  — Dari Sahabatmu yang Sayang Kamu
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#1F2A44]/10 text-[11px] space-y-1">
                <div className="font-bold text-[#1F2A44]">Isi Paket Kado:</div>
                <div className="text-[#1F2A44]/80 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8A9A7B]" />
                  <span>Buku Laporan PDF Personal (15+ Halaman)</span>
                </div>
                <div className="text-[#1F2A44]/80 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8A9A7B]" />
                  <span>Kartu Refleksi Cetak Ramah Medsos</span>
                </div>
                <div className="text-[#1F2A44]/80 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8A9A7B]" />
                  <span>Surat Pengantar & Panduan Refleksi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Step How it Works */}
      <div className="space-y-4">
        <h3 className="font-serif-cormorant text-2xl font-bold text-center text-[#1F2A44]">
          Cara Mengirim Kado Lintang dalam 3 Langkah
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#1F2A44]/10 space-y-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1F2A44] text-[#C9A45C] flex items-center justify-center font-bold text-xs">
              1
            </div>
            <h4 className="font-serif-cormorant text-xl font-bold text-[#1F2A44]">
              Pilih Laporan & Centang Add-on Kado
            </h4>
            <p className="text-xs text-[#1F2A44]/75 leading-relaxed">
              Pilih layanan yang cocok (misalnya <em>Kode Diri</em> atau <em>Sekilas Lintang</em>), lalu centang opsi Kado Lintang di formulir pesanan.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#1F2A44]/10 space-y-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1F2A44] text-[#C9A45C] flex items-center justify-center font-bold text-xs">
              2
            </div>
            <h4 className="font-serif-cormorant text-xl font-bold text-[#1F2A44]">
              Isi Data Lahir & Pesan Doa Khusus
            </h4>
            <p className="text-xs text-[#1F2A44]/75 leading-relaxed">
              Tuliskan nama penerima, tanggal lahirnya, serta ucapan personal yang ingin kamu sertakan di halaman depan kado.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#1F2A44]/10 space-y-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1F2A44] text-[#C9A45C] flex items-center justify-center font-bold text-xs">
              3
            </div>
            <h4 className="font-serif-cormorant text-xl font-bold text-[#1F2A44]">
              Pengiriman Tepat Waktu
            </h4>
            <p className="text-xs text-[#1F2A44]/75 leading-relaxed">
              Laporan dan kartu ucapan dikirimkan melalui tautan pribadi ke WhatsApp atau Email penerima pada hari istimewanya.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Notice for Gifts */}
      <div className="p-4 rounded-2xl bg-[#8A9A7B]/15 border border-[#8A9A7B]/30 flex items-center gap-3 text-xs text-[#1F2A44]">
        <ShieldCheck className="w-5 h-5 text-[#8A9A7B] shrink-0" />
        <span>
          <strong>Etika Privasi Kado:</strong> Data kelahiran penerima kado hanya digunakan untuk pembuatan laporan dan ucapan. Pembeli menyatakan telah memiliki izin penerima untuk memproses data momen kelahirannya.
        </span>
      </div>
    </div>
  );
};
