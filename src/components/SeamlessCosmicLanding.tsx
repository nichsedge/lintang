import React, { useState } from 'react';
import {
  ArrowRight,
  Clock,
  ShieldCheck,
  ChevronRight,
  BookOpen,
  Send,
  MessageCircle,
  Mail,
  MapPin,
  Building2,
  FileCheck2,
  HelpCircle,
  Plus,
  Minus,
  Sparkles,
  Award,
  Layers,
  Heart,
  CheckCircle2
} from 'lucide-react';
import { LoShuCanvas } from './LoShuCanvas';
import { SERVICES, ServiceItem, CORE_VALUES } from '../data/blueprintData';
import { LegalDocType } from './LegalModal';

interface SeamlessCosmicLandingProps {
  onOpenCalculator: (initialData?: { name?: string; birthDate?: string }) => void;
  onNavigateToTab: (tabId: 'layanan' | 'kalkulator' | 'dua-lintang' | 'kado' | 'jurnal' | 'tentang') => void;
  onStartBooking: (service: ServiceItem, isGift?: boolean) => void;
  weeklyQuota: { remaining: number; total: number; currentWeek: string };
  openLegalModalWithDoc: (doc: LegalDocType) => void;
}

export const SeamlessCosmicLanding: React.FC<SeamlessCosmicLandingProps> = ({
  onOpenCalculator,
  onNavigateToTab,
  onStartBooking,
  weeklyQuota,
  openLegalModalWithDoc,
}) => {
  // Quick contact form state
  const [contactName, setContactName] = useState('');
  const [contactBirthDate, setContactBirthDate] = useState('');
  const [contactService, setContactService] = useState('Lintang Utuh (Sintesis 10 Sistem)');
  const [contactMessage, setContactMessage] = useState('');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let text = `Halo Madam Shara & Tim Lintang! 🌿\n\nSaya ingin berkonsultasi mengenai pemetaan peta diri:\n`;
    if (contactName) text += `• Nama: ${contactName}\n`;
    if (contactBirthDate) text += `• Tanggal Lahir: ${contactBirthDate}\n`;
    text += `• Kebutuhan Layanan: ${contactService}\n`;
    if (contactMessage) text += `• Catatan / Pertanyaan: ${contactMessage}\n`;
    text += `\nMohon informasi ketersediaan slot pengerjaan minggu ini. Terima kasih!`;

    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(text)}`, '_blank');
  };

  const faqs = [
    {
      q: 'Apakah pembacaan Lintang Studio bersifat ramalan masa depan?',
      a: 'Bukan ramalan. Posisi Lintang adalah "Peta, bukan ramalan". Kami memetakan pola bawaan lahir, potensi alami, serta ritme musim diri agar Anda dapat mengambil keputusan dengan lebih berdaya, terarah, dan tanpa kecemasan deterministik.'
    },
    {
      q: 'Bagaimana jika saya tidak tahu jam lahir secara pasti?',
      a: 'Tidak masalah. Untuk analisis numerologi Pythagoras (5 angka inti & tahun personal) dan rasi Lo Shu, jam lahir tidak diperlukan. Untuk astrologi natal dan BaZi, kami akan memetakan konfigurasi planet hari kelahiran tanpa penarikan garis derajat Ascendant semu, tetap transparan dan akurat.'
    },
    {
      q: 'Bagaimana jaminan keamanan data lahir pribadi saya (UU PDP)?',
      a: 'Kami menjamin kepatuhan penuh terhadap UU No. 27/2022 tentang Perlindungan Data Pribadi (UU PDP). Data kelahiran Anda hanya diproses untuk penyusunan laporan personal oleh Madam Shara dan tidak pernah dibagikan ke pihak ketiga atau disimpan permanen di basis data publik.'
    },
    {
      q: 'Berapa lama estimasi pengerjaan dan bagaimana format laporannya?',
      a: 'Laporan disusun dan ditinjau secara manual oleh Madam Shara dalam kurun 2–3 hari kerja. Format yang diterima berupa dokumen PDF resolusi tinggi (siap baca di smartphone atau dicetak) yang dikirimkan langsung melalui WhatsApp Anda.'
    },
    {
      q: 'Apakah ada garansi koreksi jika terjadi salah input data tanggal lahir?',
      a: 'Ya. Lintang menyediakan garansi penyesuaian data lahir gratis dalam 24 jam pertama setelah pemesanan dikonfirmasi jika ada kekeliruan ketik pada tanggal atau nama.'
    }
  ];

  const audienceChips = [
    'Profesional & Karier',
    'Individu Transisi Hidup',
    'Pasangan & Pranikah',
    'Orang Tua & Anak',
    'Wirausahawan',
    'Akademisi & Peneliti',
    'Kreator Konten',
    'Pencari Makna Diri',
    'Komunitas Bertumbuh'
  ];

  return (
    <div className="w-full bg-[#FAF8F2] text-[#1F2A44] font-sans-dm selection:bg-[#C2673F]/20">
      {/* ============================================================== */}
      {/* 1. HERO SECTION (AMIRETHA EDITORIAL STYLE: CLEAN LIGHT HERO)   */}
      {/* ============================================================== */}
      <section className="relative bg-gradient-to-b from-[#F4EDE1]/90 via-[#FAF8F2] to-[#FAF8F2] pt-12 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-[#105237]/10 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Kolom Kiri: Teks Tegas & Action Pair (ala Amiretha) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow Label */}
              <div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#C9A45C]/40 text-[#A8512C] text-xs font-bold tracking-wider uppercase shadow-xs">
                  <Award className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>Studio Peta Diri · Bukan Ramalan, Tapi Peta</span>
                </span>
              </div>

              {/* Display Headline Editorial 2 Warna */}
              <div className="space-y-1">
                <h1 className="font-sans-poppins text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight uppercase leading-[1.02] text-[#1F2A44]">
                  BACA POLAMU,
                </h1>
                <h1 className="font-sans-poppins text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight uppercase leading-[1.02] text-[#C2673F]">
                  PILIH LANGKAHMU.
                </h1>
              </div>

              {/* Sub-headline Deskriptif & Lugas */}
              <p className="text-base sm:text-lg text-[#1F2A44]/80 leading-relaxed max-w-xl">
                Lintang menghadirkan ekosistem peta diri terintegrasi untuk mengenali ritme bawaan lahir, memetakan potensi karier, dan menata arah langkah hidup Anda melalui sintesis berbobot <strong>Numerologi Pythagoras, Astrologi Natal, BaZi, dan Tarot</strong>.
              </p>

              {/* Action Pair */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => onNavigateToTab('layanan')}
                  className="px-6 py-3.5 rounded-full bg-[#1F2A44] hover:bg-[#151D2F] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer group"
                >
                  <span>Jelajahi Layanan</span>
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </span>
                </button>
                <button
                  onClick={() => onOpenCalculator()}
                  className="px-6 py-3.5 rounded-full bg-white hover:bg-[#F4EDE1] border border-[#1F2A44]/20 text-[#1F2A44] font-semibold text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-4 h-4 text-[#C9A45C]" />
                  <span>Coba Kalkulator Gratis</span>
                </button>
              </div>

              {/* Jaminan Etika & Legal PDP */}
              <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#1F2A44]/70 border-t border-[#1F2A44]/10">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8A9A7B]" />
                  <span>Peta Reflektif, Bukan Ramalan Fatalistis</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#8A9A7B]" />
                  <span>Kerahasiaan UU No. 27/2022 PDP</span>
                </span>
              </div>
            </div>

            {/* Kolom Kanan: Visual Card Laporan Rapi Bersih (Tanpa Popup Mengganggu) */}
            <div className="lg:col-span-5">
              <div className="mx-auto max-w-sm sm:max-w-md">
                {/* Main Card: Editorial Showcase ala Cover Dokumen Lintang */}
                <div className="bg-white rounded-3xl border border-[#1F2A44]/12 p-6 sm:p-8 shadow-lg space-y-6">
                  {/* Header Laporan */}
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#1F2A44] flex items-center justify-center p-1 shadow">
                        <LoShuCanvas activeNodes={[8, 5, 2, 9]} lines={[[8, 5], [5, 2], [5, 9]]} size={28} />
                      </div>
                      <div>
                        <div className="font-sans-poppins font-bold text-sm tracking-tight text-[#1F2A44]">
                          Laporan Lintang Utuh
                        </div>
                        <div className="text-[10px] text-[#C9A45C] font-semibold uppercase tracking-widest">
                          Sintesis Komprehensif
                        </div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-[#FAF8F2] border border-[#C9A45C]/30 text-[#A8512C] text-xs font-bold">
                      28 Hal PDF
                    </span>
                  </div>

                  {/* Visual Diagram Lo Shu & Elemen */}
                  <div className="bg-[#FAF8F2] rounded-2xl p-5 border border-[#1F2A44]/8 space-y-4 text-center">
                    <div className="flex justify-center">
                      <LoShuCanvas activeNodes={[8, 5, 2, 9]} lines={[[8, 5], [5, 2], [5, 9]]} size={110} theme="light" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#A8512C]">
                        Garis Kekuatan Rasi 8–5–2+9
                      </div>
                      <p className="text-xs text-[#1F2A44]/70 italic">
                        “Pola ketekunan praktis yang menuntun arah ekspresi hidup.”
                      </p>
                    </div>
                  </div>

                  {/* Poin Isi Laporan */}
                  <div className="space-y-2.5 text-xs text-[#1F2A44]/85">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#8A9A7B]/20 text-[#8A9A7B] flex items-center justify-center font-bold text-[11px]">✓</span>
                      <span>5 Angka Inti Pythagoras (Life Path, Soul Urge, Birthday)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#8A9A7B]/20 text-[#8A9A7B] flex items-center justify-center font-bold text-[11px]">✓</span>
                      <span>Peta Astrologi Natal & Konfigurasi Zodiak Utama</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#8A9A7B]/20 text-[#8A9A7B] flex items-center justify-center font-bold text-[11px]">✓</span>
                      <span>Analisis Dinamika Musim Diri Tahun Berjalan (1–9)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#8A9A7B]/20 text-[#8A9A7B] flex items-center justify-center font-bold text-[11px]">✓</span>
                      <span>Rekomendasi Nyata: Bab “Langkah Minggu Ini”</span>
                    </div>
                  </div>

                  {/* Tombol Pesan Langsung */}
                  <button
                    onClick={() => {
                      const utuh = SERVICES.find((s) => s.id === 'lintang-utuh') || SERVICES[0];
                      onStartBooking(utuh);
                    }}
                    className="w-full py-3 rounded-xl bg-[#A8512C] hover:bg-[#924221] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow"
                  >
                    <span>Pesan Laporan Lintang Utuh (Rp199.000)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. TENTANG KAMI & AUDIENCE CHIP CLOUD (MIRIP AMIRETHA SECTION) */}
      {/* ============================================================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#1F2A44]/8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Kolom Kiri: Narasi Studio */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold tracking-widest uppercase text-[#A8512C]">
                Tentang Lintang Studio
              </span>
              <h2 className="font-sans-poppins text-2xl sm:text-4xl font-bold tracking-tight text-[#1F2A44]">
                Mitra reflektif untuk <span className="text-[#C2673F]">pertumbuhan diri yang berdaya</span>
              </h2>
              <p className="text-sm sm:text-base text-[#1F2A44]/80 leading-relaxed pt-2">
                Lintang Studio Peta Diri didirikan oleh <strong>Madam Shara</strong> dengan satu keyakinan mendasar: <em>“Peta, bukan ramalan”</em>. Kami memadukan kearifan sistem perhitungan klasik Barat dan Timur menjadi panduan refleksi modern yang membumi, elegan, dan tanpa penghakiman fatalistis.
              </p>
              <p className="text-sm sm:text-base text-[#1F2A44]/80 leading-relaxed">
                Setiap laporan dikerjakan secara teliti dengan mempertimbangkan konteks kehidupan nyata Anda saat ini, membantu Anda memahami pola bawaan lahir dan merumuskan langkah konkret yang bisa langsung diambil.
              </p>
              <div className="pt-3">
                <button
                  onClick={() => onNavigateToTab('tentang')}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1F2A44] hover:text-[#A8512C] transition-colors cursor-pointer"
                >
                  <span>Selengkapnya tentang filosofi Madam Shara</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Kolom Kanan: Audience Panel & Chip Cloud (Gaya Amiretha) */}
            <div className="lg:col-span-5 bg-[#FAF8F2] rounded-3xl p-6 sm:p-8 border border-[#1F2A44]/10 space-y-5">
              <span className="text-xs font-bold tracking-widest uppercase text-[#C9A45C]">
                Ekosistem yang Kami Dampingi
              </span>
              <h3 className="font-sans-poppins text-xl font-bold text-[#1F2A44]">
                Menemani Langkah Berbagai Individu & Fase Kehidupan
              </h3>
              <p className="text-xs text-[#1F2A44]/70 leading-relaxed">
                Dari penentuan transisi karier profesional hingga keharmonisan relasi antarpribadi:
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {audienceChips.map((chip, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full bg-white border border-[#1F2A44]/10 text-xs font-medium text-[#1F2A44] shadow-2xs hover:border-[#C9A45C] transition-colors"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. LAYANAN KAMI (SERVICE CARDS GAYA AMIRETHA PUBLISHING)       */}
      {/* ============================================================== */}
      <section className="py-16 sm:py-24 bg-[#FAF8F2] border-b border-[#1F2A44]/8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold tracking-widest uppercase text-[#A8512C]">
              Layanan Pembacaan Peta Diri
            </span>
            <h2 className="font-sans-poppins text-3xl sm:text-4xl font-bold tracking-tight text-[#1F2A44]">
              4 Pintu Gerbang Eksplorasi Diri
            </h2>
            <p className="text-sm text-[#1F2A44]/75">
              Pilih kedalaman pemetaan yang paling sesuai dengan kebutuhan refleksi dan fase hidup Anda saat ini.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {/* Kartu 1: Seri Angka */}
            <div className="bg-white rounded-3xl border border-[#1F2A44]/10 p-6 flex flex-col justify-between shadow-sm hover:border-[#C9A45C]/60 transition-all hover:shadow-md">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF8F2] border border-[#C9A45C]/30 flex items-center justify-center font-sans-poppins font-bold text-lg text-[#A8512C]">
                  1–9
                </div>
                <div>
                  <h3 className="font-sans-poppins text-lg font-bold text-[#1F2A44]">
                    Seri Angka
                  </h3>
                  <div className="text-xs font-semibold text-[#A8512C] mt-0.5">
                    Kode Diri & Musim Diri
                  </div>
                </div>
                <p className="text-xs text-[#1F2A44]/75 leading-relaxed">
                  Pemetaan numerologi Pythagoras 5 angka inti untuk memahami potensi bawaan lahir serta siklus 9 tahun musim diri.
                </p>

                <div className="space-y-2 pt-2 border-t border-gray-100 text-xs text-[#1F2A44]/80">
                  <div className="flex items-center gap-2">
                    <span className="text-[#C9A45C] font-bold">✓</span>
                    <span>Life Path & Soul Urge</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#C9A45C] font-bold">✓</span>
                    <span>Siklus Tahun Personal (1–9)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#C9A45C] font-bold">✓</span>
                    <span>Kisi Lo Shu 3×3 & Garis Karakter</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 space-y-3">
                <div className="text-sm font-bold text-[#1F2A44]">Mulai Rp149.000</div>
                <button
                  onClick={() => onNavigateToTab('layanan')}
                  className="w-full py-2.5 rounded-xl bg-[#FAF8F2] hover:bg-[#F4EDE1] border border-[#1F2A44]/15 text-[#1F2A44] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C9A45C]" />
                </button>
              </div>
            </div>

            {/* Kartu 2: Seri Langit */}
            <div className="bg-white rounded-3xl border border-[#1F2A44]/10 p-6 flex flex-col justify-between shadow-sm hover:border-[#C9A45C]/60 transition-all hover:shadow-md">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF8F2] border border-[#C9A45C]/30 flex items-center justify-center font-sans-poppins font-bold text-lg text-[#1F2A44]">
                  ✦
                </div>
                <div>
                  <h3 className="font-sans-poppins text-lg font-bold text-[#1F2A44]">
                    Seri Langit
                  </h3>
                  <div className="text-xs font-semibold text-[#A8512C] mt-0.5">
                    Peta Bintang & BaZi
                  </div>
                </div>
                <p className="text-xs text-[#1F2A44]/75 leading-relaxed">
                  Sintesis astrologi Barat dan Empat Pilar Nasib (BaZi) dengan penyesuaian fleksibel jika jam lahir tidak diketahui.
                </p>

                <div className="space-y-2 pt-2 border-t border-gray-100 text-xs text-[#1F2A44]/80">
                  <div className="flex items-center gap-2">
                    <span className="text-[#C9A45C] font-bold">✓</span>
                    <span>Konfigurasi Planet Kelahiran</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#C9A45C] font-bold">✓</span>
                    <span>Keseimbangan 5 Elemen BaZi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#C9A45C] font-bold">✓</span>
                    <span>Opsi Jam Lahir Fleksibel</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 space-y-3">
                <div className="text-sm font-bold text-[#1F2A44]">Mulai Rp149.000</div>
                <button
                  onClick={() => onNavigateToTab('layanan')}
                  className="w-full py-2.5 rounded-xl bg-[#FAF8F2] hover:bg-[#F4EDE1] border border-[#1F2A44]/15 text-[#1F2A44] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C9A45C]" />
                </button>
              </div>
            </div>

            {/* Kartu 3: Seri Relasi (Dua Lintang) */}
            <div className="bg-white rounded-3xl border border-[#1F2A44]/10 p-6 flex flex-col justify-between shadow-sm hover:border-[#C9A45C]/60 transition-all hover:shadow-md">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF8F2] border border-[#C9A45C]/30 flex items-center justify-center font-sans-poppins font-bold text-lg text-[#A8512C]">
                  <Heart className="w-5 h-5 text-[#A8512C]" />
                </div>
                <div>
                  <h3 className="font-sans-poppins text-lg font-bold text-[#1F2A44]">
                    Seri Relasi
                  </h3>
                  <div className="text-xs font-semibold text-[#A8512C] mt-0.5">
                    Dua Lintang (Dinamika Berdua)
                  </div>
                </div>
                <p className="text-xs text-[#1F2A44]/75 leading-relaxed">
                  Menelaah sinergi, pemicu friksi emosional, dan panduan komunikasi sehat untuk pasangan atau mitra hidup.
                </p>

                <div className="space-y-2 pt-2 border-t border-gray-100 text-xs text-[#1F2A44]/80">
                  <div className="flex items-center gap-2">
                    <span className="text-[#C9A45C] font-bold">✓</span>
                    <span>Titik Temu Dua Frekuensi Lahir</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#C9A45C] font-bold">✓</span>
                    <span>Panduan Komunikasi & Resolusi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#C9A45C] font-bold">✓</span>
                    <span>Izin Orang Kedua Patuh UU PDP</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 space-y-3">
                <div className="text-sm font-bold text-[#1F2A44]">Rp149.000</div>
                <button
                  onClick={() => onNavigateToTab('dua-lintang')}
                  className="w-full py-2.5 rounded-xl bg-[#FAF8F2] hover:bg-[#F4EDE1] border border-[#1F2A44]/15 text-[#1F2A44] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C9A45C]" />
                </button>
              </div>
            </div>

            {/* Kartu 4: Flagship Lintang Utuh */}
            <div className="bg-[#1F2A44] text-[#F4EDE1] rounded-3xl border-2 border-[#C9A45C]/50 p-6 flex flex-col justify-between shadow-lg relative">
              <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-[#A8512C] text-white text-[10px] font-bold uppercase tracking-wider shadow">
                Laporan Utama
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-[#C9A45C]/40 flex items-center justify-center font-sans-poppins font-bold text-lg text-[#C9A45C]">
                  ★
                </div>
                <div>
                  <h3 className="font-sans-poppins text-lg font-bold text-white">
                    Lintang Utuh
                  </h3>
                  <div className="text-xs font-semibold text-[#C9A45C] mt-0.5">
                    Sintesis Komprehensif
                  </div>
                </div>
                <p className="text-xs text-[#F4EDE1]/80 leading-relaxed">
                  Laporan lengkap 28 halaman mengintegrasikan seluruh 10 sistem pemetaan dengan bab aksi konkret rekomendasi mingguan.
                </p>

                <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-[#F4EDE1]/90">
                  <div className="flex items-center gap-2">
                    <span className="text-[#C9A45C] font-bold">✓</span>
                    <span>10 Sistem Pemetaan Terpadu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#C9A45C] font-bold">✓</span>
                    <span>28 Halaman PDF Resolusi Tinggi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#C9A45C] font-bold">✓</span>
                    <span>Bab Aksi "Langkah Minggu Ini"</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
                <div className="text-sm font-bold text-[#C9A45C]">Rp199.000</div>
                <button
                  onClick={() => {
                    const utuh = SERVICES.find((s) => s.id === 'lintang-utuh') || SERVICES[0];
                    onStartBooking(utuh);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#A8512C] hover:bg-[#924221] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow"
                >
                  <span>Pesan Sekarang</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. HUBUNGI KAMI & FORM CEPAT (PERSIS LAYOUT AMIRETHA PUBLISHING)*/}
      {/* ============================================================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#1F2A44]/8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Kolom Kiri: Informasi Kontak & Legal Usaha */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold tracking-widest uppercase text-[#A8512C]">
                Kontak & Konsultasi
              </span>
              <h2 className="font-sans-poppins text-2xl sm:text-3xl font-bold tracking-tight text-[#1F2A44]">
                Terhubung dengan Studio Lintang
              </h2>
              <p className="text-sm text-[#1F2A44]/75 leading-relaxed">
                Punya pertanyaan mengenai paket pemetaan atau ingin memastikan kesesuaian data lahir? Tim kami siap berdialog secara hangat.
              </p>

              <div className="space-y-4 pt-2">
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#1F2A44]/8 hover:border-[#C9A45C]/60 flex items-start gap-4 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#1F2A44]/60">WhatsApp Layanan</div>
                    <div className="text-sm font-bold text-[#1F2A44] group-hover:text-[#A8512C] transition-colors">
                      +62 812-3456-7890 (Madam Shara & Tim)
                    </div>
                  </div>
                </a>

                <a
                  href="mailto:halo@lintangpetadiri.com"
                  className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#1F2A44]/8 hover:border-[#C9A45C]/60 flex items-start gap-4 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#1F2A44]/60">Email Resmi</div>
                    <div className="text-sm font-bold text-[#1F2A44] group-hover:text-[#A8512C] transition-colors">
                      halo@lintangpetadiri.com
                    </div>
                  </div>
                </a>

                <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#1F2A44]/8 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#1F2A44]/60">Studio & Operasional</div>
                    <div className="text-xs font-semibold text-[#1F2A44] leading-relaxed">
                      Lintang Studio Peta Diri · Yogyakarta & Jakarta, Indonesia
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Form Pesan Singkat (Lanjutkan ke WhatsApp) */}
            <div className="lg:col-span-7 bg-[#FAF8F2] rounded-3xl p-6 sm:p-10 border border-[#1F2A44]/10 shadow-sm space-y-6">
              <div>
                <h3 className="font-sans-poppins text-xl sm:text-2xl font-bold text-[#1F2A44]">
                  Kirim Pesan Singkat
                </h3>
                <p className="text-xs sm:text-sm text-[#1F2A44]/70 mt-1">
                  Isi ringkasan kebutuhan pemetaan Anda, lalu lanjutkan ke WhatsApp untuk respon langsung.
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2A44]/70 mb-1.5">
                      Nama Anda
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nama lengkap atau panggilan"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#1F2A44]/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#A8512C]/40 focus:border-[#A8512C]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2A44]/70 mb-1.5">
                      Tanggal Lahir
                    </label>
                    <input
                      type="date"
                      value={contactBirthDate}
                      onChange={(e) => setContactBirthDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#1F2A44]/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#A8512C]/40 focus:border-[#A8512C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2A44]/70 mb-1.5">
                    Kebutuhan Layanan
                  </label>
                  <select
                    value={contactService}
                    onChange={(e) => setContactService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#1F2A44]/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#A8512C]/40 focus:border-[#A8512C]"
                  >
                    <option>Lintang Utuh (Sintesis 10 Sistem)</option>
                    <option>Seri Angka: Kode Diri & Musim Diri</option>
                    <option>Seri Langit: Peta Bintang & BaZi</option>
                    <option>Seri Relasi: Dua Lintang (Pasangan)</option>
                    <option>Sekilas Lintang (Entry Level Rp49rb)</option>
                    <option>Konsultasi Umum / Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2A44]/70 mb-1.5">
                    Catatan atau Pertanyaan
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ceritakan gambaran situasi atau pertanyaan spesifik yang ingin Anda refleksikan..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#1F2A44]/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#A8512C]/40 focus:border-[#A8512C]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Lanjutkan ke WhatsApp</span>
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. FAQ (PERTANYAAN YANG SERING DIAJUKAN - AMIRETHA STYLE)       */}
      {/* ============================================================== */}
      <section className="py-16 sm:py-24 bg-[#FAF8F2] border-b border-[#1F2A44]/8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Kolom Kiri: Pengantar FAQ & Tombol Chat */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold tracking-widest uppercase text-[#A8512C]">
                FAQ
              </span>
              <h2 className="font-sans-poppins text-2xl sm:text-4xl font-bold tracking-tight text-[#1F2A44]">
                Pertanyaan yang sering diajukan
              </h2>
              <p className="text-sm text-[#1F2A44]/75 leading-relaxed">
                Belum menemukan jawaban yang Anda cari? Tim kami siap membantu menjelaskan metodologi, batasan etika, dan ruang lingkup pembacaan peta diri Anda.
              </p>
              <div className="pt-2">
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold shadow transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat Kami di WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Kolom Kanan: Akordion FAQ Bersih */}
            <div className="lg:col-span-7 space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-[#1F2A44]/10 overflow-hidden transition-all shadow-2xs"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-sans-poppins font-semibold text-sm sm:text-base text-[#1F2A44] hover:text-[#A8512C] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <span className="w-6 h-6 rounded-full bg-[#FAF8F2] flex items-center justify-center text-[#A8512C] shrink-0 font-bold">
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#1F2A44]/80 leading-relaxed border-t border-gray-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. CALL TO ACTION SECTION (HERO BANNER BAWAH ALA AMIRETHA)     */}
      {/* ============================================================== */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1F2A44] text-[#F4EDE1] rounded-3xl p-8 sm:p-14 border border-[#C9A45C]/30 shadow-xl relative overflow-hidden">
            <div className="max-w-2xl space-y-5 relative z-10">
              <span className="text-xs font-bold tracking-widest uppercase text-[#C9A45C]">
                Langkah Nyata Hari Ini
              </span>
              <h2 className="font-sans-poppins text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Wujudkan Hidup yang Lebih Terarah, Sadar, dan Penuh Makna
              </h2>
              <p className="text-sm sm:text-base text-[#F4EDE1]/85 leading-relaxed">
                Diskusikan kebutuhan pemetaan diri atau mulailah dari kalkulator gratis. Bersama Lintang Studio, kenali ritme alami Anda dan melangkah dengan mantap.
              </p>
              
              <div className="flex flex-wrap items-center gap-3.5 pt-3">
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Madam%20Shara%2C%20saya%20ingin%20berkonsultasi%20mengenai%20pemetaan%20peta%20diri%20saya."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-[#C2673F] hover:bg-[#A8512C] text-white font-semibold text-sm transition-colors shadow flex items-center gap-2 cursor-pointer"
                >
                  <span>Hubungi via WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  onClick={() => onOpenCalculator()}
                  className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-[#F4EDE1] font-medium text-sm transition-colors cursor-pointer"
                >
                  Hitung Peta Diri Gratis
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
