import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Copy,
  Check,
  Share2,
  Sparkles,
  Compass,
  MessageCircle,
  Send,
  Instagram,
  Download,
  FileText,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { FullPetaDiriResult } from '../utils/numerology';
import { LoShuCanvas } from './LoShuCanvas';
import { generateReflectionPdf } from '../utils/pdfGenerator';

interface ReflectionCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  petaDiri: FullPetaDiriResult | null;
}

export const ReflectionCardModal: React.FC<ReflectionCardModalProps> = ({
  isOpen,
  onClose,
  petaDiri,
}) => {
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [instagramToast, setInstagramToast] = useState(false);
  const [isDownloadingImage, setIsDownloadingImage] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !petaDiri) return null;

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    try {
      setIsDownloadingImage(true);
      // Brief wait to ensure canvas & custom fonts are flushed
      await new Promise((r) => setTimeout(r, 100));

      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2.5,
        backgroundColor: '#1F2A44',
      });

      const cleanName = (petaDiri.name || 'kartu')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-');
      const filename = `kartu-refleksi-lintang-${cleanName}.png`;

      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();

      setDownloadSuccessMessage('Kartu refleksi berhasil diunduh sebagai gambar (PNG high-res)!');
      setTimeout(() => setDownloadSuccessMessage(null), 4000);
    } catch (err) {
      console.error('Failed to generate image', err);
      // Fallback: copy text
      handleCopyText();
    } finally {
      setIsDownloadingImage(false);
    }
  };

  const handleDownloadPdf = () => {
    try {
      setIsDownloadingPdf(true);
      generateReflectionPdf(petaDiri);
      setDownloadSuccessMessage('Lembar Refleksi Editorial (PDF A4) berhasil diunduh!');
      setTimeout(() => setDownloadSuccessMessage(null), 4000);
    } catch (err) {
      console.error('Failed to generate PDF', err);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const getShareableText = () => {
    const siteUrl = typeof window !== 'undefined' ? window.location.href : 'https://lintangpetadiri.com';
    return `🌌 Kartu Peta Diri Lintang · ${petaDiri.name} 🌌\n` +
      `“Baca polamu, pilih langkahmu.”\n\n` +
      `✨ Life Path ${petaDiri.lifePath.number}: ${petaDiri.lifePath.name}\n` +
      `"${petaDiri.lifePath.lintangReflection}"\n\n` +
      `🌱 Musim Diri 2026: ${petaDiri.personalYear.stageName} (Tahun ${petaDiri.personalYear.personalYear})\n` +
      `Tema: ${petaDiri.personalYear.theme}\n\n` +
      `🃏 Kartu Lahir Tarot: ${petaDiri.tarotCard.cardName} (${petaDiri.tarotCard.arcanaNameId})\n` +
      `Refleksi: "${petaDiri.tarotCard.reflectiveQuestion}"\n\n` +
      `🌿 Rekomendasi Minggu Ini:\n` +
      `${petaDiri.lifePath.practicalWeeklyAction}\n\n` +
      `✨ Temukan cermin potensimu di Lintang · Studio Peta Diri (@lintang.petadiri):\n${siteUrl}`;
  };

  const handleNativeShare = async () => {
    const text = getShareableText();
    const siteUrl = typeof window !== 'undefined' ? window.location.href : 'https://lintangpetadiri.com';

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `Peta Diri Lintang · ${petaDiri.name}`,
          text: text,
          url: siteUrl,
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2500);
      } catch (err) {
        // Fallback to clipboard if share was cancelled or failed
        if ((err as Error).name !== 'AbortError') {
          handleCopyText();
        }
      }
    } else {
      // Fallback for browsers without Web Share API
      handleCopyText();
    }
  };

  const handleCopyText = () => {
    const text = getShareableText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(getShareableText());
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(
      `Membaca peta diriku di Lintang · Studio Peta Diri ✨\n\n` +
      `Life Path ${petaDiri.lifePath.number}: ${petaDiri.lifePath.name}\n` +
      `Musim Diri: ${petaDiri.personalYear.stageName}\n` +
      `Kartu Lahir: ${petaDiri.tarotCard.cardName}\n\n` +
      `Bukan ramalan, tapi cermin.`
    );
    const url = encodeURIComponent(typeof window !== 'undefined' ? window.location.href : 'https://lintangpetadiri.com');
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleShareInstagram = async () => {
    const text = getShareableText();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore
    }
    setInstagramToast(true);
    setTimeout(() => setInstagramToast(false), 4000);

    // If mobile Web Share is available, invoke it (offers Instagram Stories / Feed on iOS and Android)
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `Peta Diri Lintang · ${petaDiri.name}`,
          text: text,
          url: typeof window !== 'undefined' ? window.location.href : 'https://lintangpetadiri.com',
        });
        return;
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
      }
    }

    // Direct fallback: Open Instagram
    window.open('https://www.instagram.com/', '_blank');
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-preview-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#172136] text-[#F4EDE1] rounded-2xl sm:rounded-3xl p-4 sm:p-7 max-w-xl w-full border-2 border-[#C9A45C]/50 shadow-2xl relative my-3 sm:my-6 space-y-4 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Top Header Bar with Clean Single Close Button */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C9A45C]" />
            <span id="modal-preview-title" className="text-xs uppercase font-bold tracking-wider text-[#F4EDE1]">
              Pratinjau Kartu Refleksi
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:px-3 sm:py-1 rounded-xl bg-white/10 hover:bg-rose-500/20 active:bg-rose-500/30 text-[#F4EDE1]/80 hover:text-white transition-all border border-white/15 hover:border-rose-400/50 flex items-center gap-1.5 text-xs cursor-pointer shadow-sm"
            title="Tutup (Esc)"
            aria-label="Tutup pratinjau kartu"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline text-[11px] font-medium">Tutup</span>
          </button>
        </div>

        {/* Visual Shareable Card Canvas Frame - Generous top padding for oracle card aesthetic */}
        <div
          ref={cardRef}
          className="rounded-2xl px-5 pt-8 pb-6 sm:px-8 sm:pt-10 sm:pb-8 bg-[#1F2A44] border border-[#C9A45C]/50 space-y-5 sm:space-y-6 text-left relative overflow-hidden shadow-inner"
        >
          {/* Subtle starry background shimmer */}
          <div className="absolute top-3 right-6 w-1.5 h-1.5 rounded-full bg-[#C9A45C] animate-twinkle pointer-events-none" />
          <div className="absolute bottom-6 left-6 w-1 h-1 rounded-full bg-white/70 animate-twinkle-slow pointer-events-none" />

          {/* Card Header Wordmark */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <LoShuCanvas
                activeNodes={[8, 5, 2, 9]}
                lines={[[8, 5], [5, 2], [5, 9]]}
                size={34}
              />
              <div>
                <span className="font-serif-cormorant text-2xl font-bold tracking-tight text-white leading-none block">
                  lintang
                </span>
                <span className="text-[9px] tracking-[0.25em] uppercase text-[#C9A45C] font-semibold">
                  Studio Peta Diri
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[9px] uppercase tracking-widest text-[#C9A45C] font-semibold block">
                Peta Personal
              </span>
              <span className="text-[11px] text-[#F4EDE1]/60 font-mono">
                Edisi 2026
              </span>
            </div>
          </div>

          {/* User Name & Birthdate */}
          <div className="text-center sm:text-left space-y-1">
            <h3 className="font-serif-cormorant text-3xl font-bold text-white leading-tight">
              {petaDiri.name}
            </h3>
            <div className="text-xs text-[#C9A45C] font-mono">
              Lahir: {petaDiri.birthDateStr}
              {petaDiri.birthCity ? ` di ${petaDiri.birthCity}` : ''}
              {petaDiri.birthTime ? ` pukul ${petaDiri.birthTime}` : ''}
            </div>
          </div>

          {/* 3 Pillars Grid - Completely Free of Truncate */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Life Path */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[9px] uppercase font-bold text-[#C2673F] tracking-wider block">
                Life Path
              </span>
              <div className="font-serif-cormorant text-xl font-bold text-white">
                Angka {petaDiri.lifePath.number}
              </div>
              <div className="text-[11px] text-[#F4EDE1]/90 leading-tight">
                {petaDiri.lifePath.name}
              </div>
            </div>

            {/* Musim Diri */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[9px] uppercase font-bold text-[#C9A45C] tracking-wider block">
                Musim Diri 2026
              </span>
              <div className="font-serif-cormorant text-xl font-bold text-white">
                Tahun {petaDiri.personalYear.personalYear}
              </div>
              <div className="text-[11px] text-[#F4EDE1]/90 leading-tight">
                {petaDiri.personalYear.stageName}
              </div>
            </div>

            {/* Tarot Card */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[9px] uppercase font-bold text-[#8A9A7B] tracking-wider block">
                Kartu Lahir Tarot
              </span>
              <div className="font-serif-cormorant text-xl font-bold text-white">
                № {petaDiri.tarotCard.cardNumber}
              </div>
              <div className="text-[11px] text-[#F4EDE1]/90 leading-tight">
                {petaDiri.tarotCard.cardName}
              </div>
            </div>
          </div>

          {/* Full Life Path Reflection Quote */}
          <div className="p-4 rounded-xl bg-white/5 border-l-3 border-[#C2673F] space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#C2673F] tracking-wider block">
              Refleksi Karakter:
            </span>
            <p className="font-serif-fraunces text-xs sm:text-sm italic leading-relaxed text-[#F4EDE1]">
              “{petaDiri.lifePath.lintangReflection}”
            </p>
          </div>

          {/* Tarot Question & Musim Advice */}
          <div className="p-4 rounded-xl bg-white/5 border-l-3 border-[#C9A45C] space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#C9A45C] tracking-wider block">
              Pertanyaan Refleksi Jiwa ({petaDiri.tarotCard.cardName}):
            </span>
            <p className="font-serif-fraunces text-xs sm:text-sm italic leading-relaxed text-[#F4EDE1]">
              “{petaDiri.tarotCard.reflectiveQuestion}”
            </p>
          </div>

          {/* Full Weekly Practical Action */}
          <div className="p-4 rounded-xl bg-[#8A9A7B]/15 border border-[#8A9A7B]/40 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#8A9A7B]">
              <Compass className="w-4 h-4" />
              <span>Rekomendasi Praktis Minggu Ini:</span>
            </div>
            <p className="text-xs sm:text-sm text-[#F4EDE1]/95 leading-relaxed font-sans-dm">
              {petaDiri.lifePath.practicalWeeklyAction}
            </p>
          </div>

          {/* Card Footer */}
          <div className="text-[10px] text-[#F4EDE1]/50 border-t border-white/10 pt-3 flex flex-col sm:flex-row items-center justify-between gap-1 font-mono">
            <span>lintangpetadiri.com</span>
            <span>“Bukan ramalan, tapi cermin.”</span>
          </div>
        </div>

        {/* DOWNLOAD & EKSPOR DOKUMENTASI (PNG & PDF) */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-[#C9A45C]/35 space-y-2.5">
          <div className="flex items-center justify-between text-[11px] text-[#C9A45C] font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>Simpan & Ekspor Dokumentasi</span>
            </span>
            <span className="text-[10px] text-[#F4EDE1]/60 font-mono">Bebas Biaya</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Download as High-Res PNG Image */}
            <button
              onClick={handleDownloadImage}
              disabled={isDownloadingImage}
              className="py-2.5 px-3.5 rounded-xl bg-white/10 hover:bg-[#C9A45C] text-white hover:text-[#1F2A44] font-semibold text-xs transition-all flex items-center justify-center gap-2 border border-white/15 hover:border-[#C9A45C] disabled:opacity-50 cursor-pointer shadow-sm active:scale-98"
              title="Unduh visual kartu resolusi tinggi untuk wallpaper atau Instagram Story"
            >
              {isDownloadingImage ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#C9A45C]" />
                  <span>Memproses PNG...</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-4 h-4 text-[#C9A45C]" />
                  <span>Unduh Gambar (PNG)</span>
                </>
              )}
            </button>

            {/* Export as 1-Page A4 Editorial PDF */}
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloadingPdf}
              className="py-2.5 px-3.5 rounded-xl bg-white/10 hover:bg-[#C2673F] text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 border border-white/15 hover:border-[#C2673F] disabled:opacity-50 cursor-pointer shadow-sm active:scale-98"
              title="Unduh lembar kerja refleksi 1 halaman standar A4 siap cetak"
            >
              {isDownloadingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#C2673F]" />
                  <span>Membuat PDF...</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 text-[#C2673F]" />
                  <span>Unduh Lembar PDF (A4)</span>
                </>
              )}
            </button>
          </div>

          {/* Download Success Notice */}
          {downloadSuccessMessage && (
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-[11px] text-emerald-200 flex items-center gap-2 animate-in fade-in duration-300">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{downloadSuccessMessage}</span>
            </div>
          )}
        </div>

        {/* Social Sharing & Action Buttons */}
        <div className="space-y-2.5 pt-1">
          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            {/* Primary Native Web Share Button */}
            <button
              onClick={handleNativeShare}
              className="flex-1 w-full py-3 px-5 rounded-xl bg-[#C9A45C] hover:bg-[#d8b56f] text-[#1F2A44] font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-98"
            >
              <Share2 className="w-4 h-4 text-[#1F2A44]" />
              <span>
                {shareSuccess
                  ? 'Berhasil Dibagikan!'
                  : copied
                  ? 'Tersalin ke Clipboard!'
                  : 'Bagikan Peta Diri (Medsos)'}
              </span>
            </button>

            {/* Direct Copy Text Button */}
            <button
              onClick={handleCopyText}
              className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 border border-white/15"
              title="Salin seluruh teks kartu refleksi"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#C9A45C]" />}
              <span>{copied ? 'Tersalin!' : 'Salin Teks'}</span>
            </button>
          </div>

          {/* Quick Direct Social Media Share Icons (WhatsApp, Instagram, Twitter/X) */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-[#F4EDE1]/70">
            <span className="text-[11px]">Bagikan cepat ke:</span>
            <button
              onClick={handleShareWhatsApp}
              className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 font-semibold text-[11px] flex items-center gap-1.5 transition-colors border border-emerald-500/30"
              title="Kirim ke WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleShareInstagram}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#833ab4]/30 via-[#fd1d1d]/30 to-[#fcb045]/30 hover:from-[#833ab4]/50 hover:via-[#fd1d1d]/50 hover:to-[#fcb045]/50 text-pink-200 font-semibold text-[11px] flex items-center gap-1.5 transition-all border border-pink-500/30"
              title="Salin teks refleksi & bagikan ke Instagram Story/Post"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span>Instagram</span>
            </button>

            <button
              onClick={handleShareTwitter}
              className="px-3 py-1.5 rounded-lg bg-sky-600/30 hover:bg-sky-600/50 text-sky-300 font-semibold text-[11px] flex items-center gap-1.5 transition-colors border border-sky-500/30"
              title="Bagikan ke Twitter / X"
            >
              <Send className="w-3.5 h-3.5 text-sky-400" />
              <span>Twitter / X</span>
            </button>
          </div>

          {/* Instagram Toast Feedback Notice */}
          {instagramToast && (
            <div className="p-2.5 rounded-xl bg-gradient-to-r from-[#833ab4]/20 via-[#fd1d1d]/20 to-[#fcb045]/20 border border-pink-500/40 text-[11px] text-pink-200 flex items-center justify-between gap-2 animate-in fade-in duration-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Teks kartu refleksi tersalin ke clipboard! Siap dipaste ke Instagram Story/Caption (@lintang.petadiri).</span>
              </div>
            </div>
          )}

          {/* Subtle dismiss hint */}
          <div className="pt-2 text-center">
            <span className="text-[11px] text-[#F4EDE1]/50">
              Tekan <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-[#F4EDE1]/80 border border-white/10">ESC</kbd> atau klik area luar untuk menutup
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

