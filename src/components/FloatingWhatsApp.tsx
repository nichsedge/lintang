import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

interface FloatingWhatsAppProps {
  activeTab: string;
  selectedServiceName?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ activeTab, selectedServiceName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getContextMessage = () => {
    if (selectedServiceName) {
      return `Halo Madam Shara & Tim Lintang, saya tertarik dengan layanan *${selectedServiceName}*. Boleh tanya ketersediaan slot minggu ini?`;
    }
    switch (activeTab) {
      case 'kalkulator':
        return 'Halo Madam Shara, saya baru mencoba Kalkulator Peta Diri di website dan ingin bertanya tentang interpretasi hasil Life Path & Musim Diri saya.';
      case 'layanan':
        return 'Halo Tim Lintang, saya sedang melihat katalog layanan dan butuh rekomendasi laporan yang paling pas untuk situasi saya saat ini.';
      case 'kado':
        return 'Halo Tim Lintang, saya ingin memesan Kado Lintang untuk ulang tahun sahabat/pasangan. Bagaimana alur pengiriman kartu ucapannya?';
      case 'dua-lintang':
        return 'Halo Tim Lintang, saya ingin konsultasi mengenai analisis kecocokan relasi Dua Lintang.';
      default:
        return 'Halo Madam Shara & Tim Lintang, saya ingin bertanya tentang pemesanan laporan peta diri.';
    }
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(getContextMessage());
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 w-80 bg-[#1F2A44] text-[#F4EDE1] rounded-2xl p-4 shadow-2xl border border-[#C9A45C]/40 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start justify-between border-b border-white/10 pb-2.5 mb-3">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#C9A45C]">
                Lintang · WhatsApp Care
              </div>
              <h4 className="font-serif-cormorant text-lg font-bold text-white">
                Tanya Madam Shara & Tim
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Tutup popup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#F4EDE1]/80 leading-relaxed mb-3">
            Punya pertanyaan seputar data lahir, pemilihan layanan, atau ketersediaan slot minggu ini? Kami siap membantu dengan ramah.
          </p>

          <div className="p-2.5 rounded-xl bg-[#172136] border border-white/10 text-[11px] text-[#C9A45C] italic mb-3">
            “{getContextMessage()}”
          </div>

          <button
            onClick={handleOpenWhatsApp}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Mulai Chat di WhatsApp</span>
          </button>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative p-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2"
        aria-label="Bantuan WhatsApp"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-semibold pr-1">
          Tanya Lintang
        </span>
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300" />
        </span>
      </button>
    </div>
  );
};
