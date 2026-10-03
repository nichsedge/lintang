import React, { useEffect } from 'react';
import { X, ShieldCheck, FileText, AlertCircle, RefreshCw } from 'lucide-react';

export type LegalDocType = 'disclaimer' | 'privasi' | 'terms' | 'refund';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDoc?: LegalDocType;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialDoc = 'disclaimer',
}) => {
  const [activeDoc, setActiveDoc] = React.useState<LegalDocType>(initialDoc);

  useEffect(() => {
    setActiveDoc(initialDoc);
  }, [initialDoc]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#172136] text-[#F4EDE1] rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-2xl w-full border border-[#C9A45C]/40 shadow-2xl relative my-4 sm:my-8 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#C9A45C]" />
            <span className="text-xs uppercase font-bold tracking-wider text-white">
              Dokumen Legalitas & Privasi Lintang
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-rose-500/20 text-[#F4EDE1]/80 hover:text-white transition-all border border-white/15 cursor-pointer"
            title="Tutup (Esc)"
            aria-label="Tutup modal legal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1.5 py-3 border-b border-white/10 overflow-x-auto shrink-0">
          {[
            { id: 'disclaimer', label: 'Disclaimer Resmi', icon: AlertCircle },
            { id: 'privasi', label: 'Kebijakan Privasi (UU PDP)', icon: ShieldCheck },
            { id: 'terms', label: 'Syarat & Ketentuan', icon: FileText },
            { id: 'refund', label: 'Revisi & Refund 24 Jam', icon: RefreshCw },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeDoc === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveDoc(tab.id as LegalDocType)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#C2673F] text-white shadow-sm'
                    : 'bg-white/5 text-[#F4EDE1]/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto py-4 space-y-4 text-xs leading-relaxed text-[#F4EDE1]/85 pr-2">
          {activeDoc === 'disclaimer' && (
            <div className="space-y-3">
              <h3 className="font-serif-cormorant text-2xl font-bold text-white">
                Disclaimer Resmi Lintang · Studio Peta Diri
              </h3>
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
                <strong>Prinsip Utama:</strong> “Bukan ramalan, tapi peta.” Seluruh layanan di studio ini ditujukan untuk pemahaman potensi diri, eksplorasi arketipe batin, dan hiburan reflektif.
              </div>
              <p>
                1. <strong>Bukan Nasihat Medis atau Psikologis:</strong> Informasi dalam laporan tidak dapat menggantikan diagnosis medis profesional, terapi psikologi, konseling psikiatri, atau intervensi klinis. Jika kamu mengalami krisis emosional atau gangguan kesehatan mental, segera hubungi profesional berwenang.
              </p>
              <p>
                2. <strong>Bukan Konsultasi Keuangan atau Hukum:</strong> Analisis potensi karier dan pilar kekayaan (seperti dalam BaZi atau Numerologi) adalah interpretasi simbolis arketipe, bukan jaminan kesuksesan investasi atau saran legal berbadan hukum.
              </p>
              <p>
                3. <strong>Kehendak Bebas (Free Will):</strong> Kami percaya takdir bukan vonis kaku. Kamu memegang kendali 100% atas setiap keputusan dan tindakan nyata yang kamu ambil dalam hidupmu.
              </p>
            </div>
          )}

          {activeDoc === 'privasi' && (
            <div className="space-y-3">
              <h3 className="font-serif-cormorant text-2xl font-bold text-white">
                Kebijakan Privasi & Kepatuhan UU No. 27/2022 (PDP)
              </h3>
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200">
                <strong>Komitmen Keamanan Data:</strong> Kami tunduk pada Undang-Undang Republik Indonesia No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP).
              </div>
              <p>
                1. <strong>Data yang Dikumpulkan:</strong> Nama lengkap (sesuai akta untuk numerologi), tanggal lahir, jam lahir (opsional untuk seri langit), kota lahir, serta alamat kontak (Email & WhatsApp) untuk pengiriman hasil laporan.
              </p>
              <p>
                2. <strong>Tujuan Pemrosesan:</strong> Data momen kelahiran hanya digunakan secara eksklusif untuk penyusunan dan kalkulasi laporan peta diri pesananmu. Kami tidak pernah menjual, menyewakan, atau membagikan data ini kepada pihak ketiga mana pun.
              </p>
              <p>
                3. <strong>Hak Penghapusan Data:</strong> Kamu memiliki hak penuh untuk meminta penghapusan total seluruh rekaman data kelahiranmu dari sistem kami kapan pun setelah laporan selesai diterima, cukup dengan mengirimkan pesan ke admin WhatsApp Lintang.
              </p>
              <p>
                4. <strong>Data Orang Kedua (Seri Relasi):</strong> Pemesan bertanggung jawab memastikan telah mendapatkan izin dan persetujuan dari pihak kedua sebelum menyerahkan data kelahirannya ke sistem kami.
              </p>
            </div>
          )}

          {activeDoc === 'terms' && (
            <div className="space-y-3">
              <h3 className="font-serif-cormorant text-2xl font-bold text-white">
                Syarat & Ketentuan Pemesanan
              </h3>
              <p>
                1. <strong>Penyusunan Manual oleh Madam Shara:</strong> Demi menjaga nilai “Rapi” dan ketelitian perhitungan, setiap laporan disusun atau ditinjau secara manual. Waktu estimasi pengerjaan adalah 2–3 hari kerja sejak verifikasi pembayaran.
              </p>
              <p>
                2. <strong>Sistem Kuota Mingguan:</strong> Untuk menjaga kualitas dan ketelitian bacaan, kami membatasi jumlah pesanan per minggu. Jika kuota penuh, pemesanan akan dialihkan ke daftar tunggu minggu berikutnya.
              </p>
              <p>
                3. <strong>Hak Cipta & Larangan Distribusi Komersial:</strong> Laporan PDF bersifat personal untuk pemesan. Setiap dokumen mencantumkan nomor pesanan resmi (watermark proteksi). Dilarang memperjualbelikan, menerbitkan kembali, atau mengomersialisasi isi laporan tanpa izin tertulis dari Lintang Studio.
              </p>
              <p>
                4. <strong>Layanan Sesi Temu Zoom:</strong> Penjadwalan sesi temu dilakukan secara fleksibel melalui tautan kalender interaktif. Pembatalan atau pergantian jadwal dapat dilakukan maksimal 24 jam sebelum sesi berlangsung.
              </p>
            </div>
          )}

          {activeDoc === 'refund' && (
            <div className="space-y-3">
              <h3 className="font-serif-cormorant text-2xl font-bold text-white">
                Kebijakan Revisi Data 24 Jam & Refund
              </h3>
              <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-200">
                <strong>Jendela Koreksi 24 Jam:</strong> Kesalahan ketik tanggal atau ejaan nama adalah penyebab revisi paling umum. Kami memberikan garansi koreksi gratis dalam 24 jam pertama!
              </div>
              <p>
                1. <strong>Koreksi Data Lahir:</strong> Jika kamu menyadari adanya salah ketik tanggal lahir, ejaan nama, atau jam lahir setelah menyelesaikan checkout, segera balas konfirmasi WhatsApp dalam kurun waktu 24 jam sebelum proses penyusunan laporan dimulai.
              </p>
              <p>
                2. <strong>Kebijakan Pengembalian Dana (Refund):</strong> Karena produk ini merupakan karya digital yang dikustomisasi secara manual berdasarkan identitas kelahiran spesifik, pengembalian dana penuh hanya dapat disetujui jika laporan belum mulai dikerjakan atau terjadi keterlambatan melebihi batas waktu toleransi tanpa pemberitahuan dari pihak kami.
              </p>
              <p>
                3. <strong>Garansi Kepuasan:</strong> Jika terdapat ketidaksesuaian hitungan teknis dari sistem aslinya, Madam Shara akan memberikan perbaikan laporan secara cuma-cuma.
              </p>
            </div>
          )}
        </div>

        {/* Footer Dismiss Hint */}
        <div className="pt-3 border-t border-white/10 text-center shrink-0">
          <span className="text-[11px] text-[#F4EDE1]/50">
            Tekan <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-[#F4EDE1]/80 border border-white/10">ESC</kbd> atau klik area luar untuk menutup
          </span>
        </div>
      </div>
    </div>
  );
};
