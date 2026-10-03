import React, { useState, useEffect } from 'react';
import { X, Check, Copy, MessageSquare, Sparkles, Gift, ShieldCheck } from 'lucide-react';
import { SERVICES, ServiceItem } from '../data/blueprintData';

interface OrderSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
}

export const OrderSimulatorModal: React.FC<OrderSimulatorModalProps> = ({
  isOpen,
  onClose,
  initialServiceId = 'kode-diri',
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId);
  const [clientName, setClientName] = useState<string>('');
  const [clientBirthDate, setClientBirthDate] = useState<string>('');
  const [clientBirthTime, setClientBirthTime] = useState<string>('');
  const [clientBirthCity, setClientBirthCity] = useState<string>('');
  const [partnerBirthData, setPartnerBirthData] = useState<string>('');
  const [includeGiftWrap, setIncludeGiftWrap] = useState<boolean>(false);
  const [giftNote, setGiftNote] = useState<string>('');
  const [includeKisiSembilan, setIncludeKisiSembilan] = useState<boolean>(false);
  const [includeJejakKarma, setIncludeJejakKarma] = useState<boolean>(false);
  const [copiedMessage, setCopiedMessage] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];
  const isRelationService = currentService.category === 'seri-relasi';
  const isSkyService = currentService.category === 'seri-langit';

  // Compose formatted WhatsApp order text
  const generateWaMessage = () => {
    let msg = `Halo Lintang · Studio Peta Diri! ✨\nSaya ingin memesan layanan peta diri berikut:\n\n`;
    msg += `📌 Layanan: *${currentService.name}* (${currentService.subtitle})\n`;
    msg += `💵 Estimasi Harga: ${currentService.price}\n\n`;
    msg += `👤 Data Diri:\n`;
    msg += `• Nama Lengkap: ${clientName || '[Nama Belum Diisi]'}\n`;
    msg += `• Tanggal Lahir: ${clientBirthDate || '[Tanggal Belum Diisi]'}\n`;
    if (clientBirthTime) msg += `• Jam Lahir: ${clientBirthTime}\n`;
    if (clientBirthCity) msg += `• Kota Lahir: ${clientBirthCity}\n`;

    if (isRelationService) {
      msg += `\n👥 Data Pasangan / Orang Kedua:\n${partnerBirthData || '[Belum diisi]'}\n`;
    }

    const addOns: string[] = [];
    if (includeKisiSembilan) addOns.push('Kisi Sembilan (Lo Shu Grid) (+Rp49rb)');
    if (includeJejakKarma) addOns.push('Jejak Karma (Karmic Debt) (+Rp49rb)');
    if (includeGiftWrap) addOns.push(`Kado Lintang (+Rp25rb) - Catatan: "${giftNote || 'Selamat bertumbuh'}"`);

    if (addOns.length > 0) {
      msg += `\n🎁 Tambahan Add-on:\n` + addOns.map((a) => `• ${a}`).join('\n') + `\n`;
    }

    msg += `\nMohon informasi ketersediaan slot pengerjaan dan rekening pembayaran. Terima kasih banyak! 🌿`;
    return msg;
  };

  const handleCopyWa = () => {
    const text = generateWaMessage();
    navigator.clipboard.writeText(text);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-xl w-full border border-[#C9A45C]/40 shadow-2xl relative my-4 sm:my-8 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-2 sm:p-2.5 rounded-full bg-[#1F2A44] hover:bg-rose-600 text-white shadow-xl hover:shadow-2xl border-2 border-white transition-all transform hover:scale-110 active:scale-95 cursor-pointer z-20"
          title="Tutup (Esc)"
          aria-label="Tutup formulir"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4EDE1] text-[#C2673F] text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulasi Formulir Pemesanan</span>
          </div>
          <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#1F2A44]">
            Pesan Laporan Peta Diri
          </h3>
          <p className="text-xs text-[#1F2A44]/70">
            Pilih layanan, isi data momen kelahiran secara aman, dan hasilkan format pesan WhatsApp otomatis.
          </p>
        </div>

        {/* Form Body */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {/* Select Service */}
          <div>
            <label className="block text-xs font-semibold text-[#1F2A44] mb-1">
              Pilih Layanan Utama
            </label>
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-gray-300 text-xs text-[#1F2A44] font-medium bg-white focus:outline-none focus:ring-1 focus:ring-[#C2673F]"
            >
              {SERVICES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.subtitle}) — {s.price}
                </option>
              ))}
            </select>
          </div>

          {/* Client Personal Data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#1F2A44] mb-1">
                Nama Lengkap (sesuai akta)
              </label>
              <input
                type="text"
                placeholder="Nama kamu"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-300 text-xs text-[#1F2A44] focus:outline-none focus:ring-1 focus:ring-[#C2673F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1F2A44] mb-1">
                Tanggal Lahir
              </label>
              <input
                type="date"
                value={clientBirthDate}
                onChange={(e) => setClientBirthDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-300 text-xs text-[#1F2A44] focus:outline-none focus:ring-1 focus:ring-[#C2673F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1F2A44] mb-1">
                Jam Lahir {isSkyService ? <span className="text-rose-500">*wajib</span> : '(opsional)'}
              </label>
              <input
                type="time"
                value={clientBirthTime}
                onChange={(e) => setClientBirthTime(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-300 text-xs text-[#1F2A44] focus:outline-none focus:ring-1 focus:ring-[#C2673F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1F2A44] mb-1">
                Kota Lahir {isSkyService ? <span className="text-rose-500">*wajib</span> : '(opsional)'}
              </label>
              <input
                type="text"
                placeholder="Kota kelahiran"
                value={clientBirthCity}
                onChange={(e) => setClientBirthCity(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-300 text-xs text-[#1F2A44] focus:outline-none focus:ring-1 focus:ring-[#C2673F]"
              />
            </div>
          </div>

          {/* Relation Partner Data if category == seri-relasi */}
          {isRelationService && (
            <div className="p-3.5 rounded-2xl bg-[#8A9A7B]/15 border border-[#8A9A7B]/30 space-y-2">
              <label className="block text-xs font-bold text-[#1F2A44]">
                Data Lahir Pasangan / Partner (Nama, Tanggal, Jam & Kota)
              </label>
              <textarea
                rows={2}
                placeholder="Contoh: Bunga Lestari, 12 April 1999, 14:30 WIB di Surabaya"
                value={partnerBirthData}
                onChange={(e) => setPartnerBirthData(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-300 text-xs text-[#1F2A44] bg-white focus:outline-none focus:ring-1 focus:ring-[#8A9A7B]"
              />
            </div>
          )}

          {/* Optional Add-ons */}
          <div className="pt-2 border-t border-gray-100 space-y-2">
            <span className="text-xs font-bold text-[#1F2A44] uppercase">Add-on Opsional:</span>
            
            <label className="flex items-center gap-2 text-xs text-[#1F2A44] cursor-pointer">
              <input
                type="checkbox"
                checked={includeKisiSembilan}
                onChange={(e) => setIncludeKisiSembilan(e.target.checked)}
                className="rounded text-[#C2673F] focus:ring-0"
              />
              <span>Tambah Kisi Sembilan (Lo Shu Grid) (+Rp49 rb)</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-[#1F2A44] cursor-pointer">
              <input
                type="checkbox"
                checked={includeJejakKarma}
                onChange={(e) => setIncludeJejakKarma(e.target.checked)}
                className="rounded text-[#C2673F] focus:ring-0"
              />
              <span>Tambah Jejak Karma (Karmic Debt & Lessons) (+Rp49 rb)</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-[#1F2A44] cursor-pointer">
              <input
                type="checkbox"
                checked={includeGiftWrap}
                onChange={(e) => setIncludeGiftWrap(e.target.checked)}
                className="rounded text-[#C2673F] focus:ring-0"
              />
              <span className="flex items-center gap-1 font-semibold text-[#C2673F]">
                <Gift className="w-3.5 h-3.5" />
                <span>Kado Lintang: Kemasan Hadiah + Kartu Ucapan (+Rp25 rb)</span>
              </span>
            </label>

            {includeGiftWrap && (
              <input
                type="text"
                placeholder="Tuliskan ucapan kado personal..."
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                className="w-full p-2 rounded-xl border border-gray-300 text-xs text-[#1F2A44] bg-[#F4EDE1]/50 focus:outline-none"
              />
            )}
          </div>

          {/* Message Preview Box */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#1F2A44] mb-1">
              <span>Preview Pesan WhatsApp:</span>
              <button
                onClick={handleCopyWa}
                className="text-xs text-[#C2673F] font-semibold flex items-center gap-1 hover:underline"
              >
                {copiedMessage ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedMessage ? 'Tersalin!' : 'Salin Teks'}</span>
              </button>
            </div>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-[11px] font-mono text-gray-700 whitespace-pre-line max-h-32 overflow-y-auto">
              {generateWaMessage()}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="pt-4 mt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-[#8A9A7B]">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Data lahir dihapus setelah laporan dikirim.</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-rose-50 text-gray-700 hover:text-rose-600 text-xs font-semibold transition-all border border-gray-200 hover:border-rose-200 flex items-center justify-center gap-1.5"
            >
              <X className="w-4 h-4 text-rose-500" />
              <span>Tutup</span>
            </button>
            <button
              onClick={handleCopyWa}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#C9A45C] hover:bg-[#d8b56f] text-xs font-semibold text-[#1F2A44] transition-all flex items-center justify-center gap-1.5"
            >
              <Copy className="w-4 h-4" />
              <span>{copiedMessage ? 'Tersalin!' : 'Salin Pesan WA'}</span>
            </button>
            <button
              onClick={() => {
                const text = encodeURIComponent(generateWaMessage());
                // Open WhatsApp Web/App format
                window.open(`https://wa.me/?text=${text}`, '_blank');
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold text-white transition-all flex items-center justify-center gap-1.5 shadow"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Buka WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
