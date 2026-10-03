import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Compass,
  Clock,
  ShieldCheck,
  Heart,
  ChevronRight,
  Layers,
  CheckCircle2,
  Calendar,
  Lock,
  Moon,
  Gift
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
  // Slide selector for sample report showcase
  const [selectedSlide, setSelectedSlide] = useState(0);

  // Quick client-side input
  const [quickName, setQuickName] = useState('');
  const [quickBirthDate, setQuickBirthDate] = useState('');

  const reportSlides = [
    {
      id: 'lintang-utuh',
      title: 'Laporan Lintang Utuh',
      subtitle: 'Sintesis Komprehensif Lintas Sistem · 28 Halaman PDF Resolusi Tinggi',
      badge: 'Laporan Utama',
      bullets: [
        '5 Angka Inti Pythagoras (Life Path, Soul Urge, Birthday, Expression, Personality)',
        'Rasi Lo Shu 8–5–2+9 & Garis Kekuatan Karakter Bawaan',
        'Peta Zodiak & Astrologi Natal Terstruktur',
        'Rekomendasi Aksi Konkret "Langkah Minggu Ini"',
      ],
      price: 'Rp199.000',
    },
    {
      id: 'sekilas-lintang',
      title: 'Sekilas Lintang',
      subtitle: 'Pintu Masuk Terjangkau · Intisari Pola Diri Praktis',
      badge: 'Mulai Dari Sini',
      bullets: [
        'Life Path & Esensi Karakter Bawaan Lahir',
        'Siklus Musim Diri Tahun Berjalan (1–9)',
        'Analisis Cepat Format PDF Ringkas Siap Baca',
        'Paling Cocok untuk Pembeli Pertama',
      ],
      price: 'Rp49.000',
    },
    {
      id: 'dua-lintang',
      title: 'Dua Lintang (Relasi)',
      subtitle: 'Matriks Dinamika Pasangan & Partner Hidup',
      badge: 'Seri Relasi',
      bullets: [
        'Titik Temu Frekuensi Dua Tanggal Kelahiran',
        'Pemicu Friksi & Panduan Bahasa Komunikasi Sehat',
        'Kesesuaian Ritme Musim Diri Berdua',
        'Pernyataan Izin Orang Kedua Terproteksi (UU PDP)',
      ],
      price: 'Rp149.000',
    },
  ];

  const testimonials = [
    {
      name: 'Alya K.',
      role: 'Product Designer, 27 thn (Jakarta)',
      text: '“Bahasanya hangat dan membumi, seperti diajak berdialog dengan kakak yang bijak. Tidak ada kata-kata nakut-nakutin seperti ‘tahun sial’. Rekomendasi langkah mingguannya sangat aplikatif untuk transisi karierku.”',
      service: 'Lintang Utuh',
    },
    {
      name: 'Bimo Wicaksono',
      role: 'Software Architect, 31 thn (Bandung)',
      text: '“Sebagai orang yang skeptis terhadap ramalan deterministik, pendekatan Lintang yang memosisikan ini sebagai peta navigasi sangat masuk akal. Analisis kisi Lo Shu 8-5-2 memotret ritme kerjaku secara presisi.”',
      service: 'Kode Diri + Kisi Sembilan',
    },
    {
      name: 'Dian & Satria',
      role: 'Pasangan Menikah 3 Tahun (Surabaya)',
      text: '“Laporan Dua Lintang membantu kami memahami akar gesekan kecil dalam rumah tangga. Ternyata ritme musim kami sedang di frekuensi berbeda. Sekarang kami jauh lebih berempati satu sama lain.”',
      service: 'Dua Lintang',
    },
  ];

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickBirthDate) {
      alert('Mohon pilih tanggal lahir terlebih dahulu.');
      return;
    }
    onOpenCalculator({ name: quickName || 'Teman Lintang', birthDate: quickBirthDate });
  };

  const handleOrderSlide = (serviceId: string) => {
    const service = SERVICES.find((item) => item.id === serviceId);
    if (service) {
      onStartBooking(service);
    } else {
      onNavigateToTab('layanan');
    }
  };

  return (
    <div className="w-full bg-[#F4EDE1] text-[#1F2A44] font-sans-dm selection:bg-[#C2673F]/20">
      {/* ============================================================== */}
      {/* 1. HERO SECTION (DEEP BIRU MALAM · CRAFTED CELESTIAL CANVAS) */}
      {/* ============================================================== */}
      <section className="relative bg-[#1F2A44] text-[#F4EDE1] pt-14 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#C9A45C]/30 overflow-hidden">
        {/* Subtle celestial constellation lines & coordinate grid */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="celestial-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#C9A45C" strokeWidth="0.5" strokeDasharray="3 3" />
                <circle cx="80" cy="80" r="1.5" fill="#C9A45C" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#celestial-grid)" />
            <circle cx="85%" cy="20%" r="220" fill="none" stroke="#C9A45C" strokeWidth="0.75" strokeDasharray="6 8" />
            <circle cx="15%" cy="80%" r="180" fill="none" stroke="#8A9A7B" strokeWidth="0.75" strokeDasharray="4 6" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto text-center space-y-8 z-10">
          {/* Header Metadata Chips */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C9A45C]/40 text-[#C9A45C] text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
              <span>Studio Peta Diri · Bukan Ramalan, Tapi Peta</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#8A9A7B]/20 border border-[#8A9A7B]/40 text-emerald-300 text-xs font-semibold backdrop-blur-sm">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Slot Minggu Ini: Tersisa {weeklyQuota.remaining} dari {weeklyQuota.total} laporan</span>
            </span>
          </div>

          {/* Rasi 8-5-2+9 Brand Crest */}
          <div className="flex flex-col items-center justify-center">
            <div
              onClick={() => onOpenCalculator()}
              className="p-4 rounded-2xl bg-[#172136] border border-[#C9A45C]/40 shadow-xl hover:border-[#C9A45C] transition-colors cursor-pointer group"
              title="Buka Kalkulator Lo Shu"
            >
              <LoShuCanvas activeNodes={[8, 5, 2, 9]} lines={[[8, 5], [5, 2], [5, 9]]} size={110} theme="dark" />
              <div className="mt-2 text-center">
                <span className="px-3 py-1 rounded-md bg-[#A8512C] text-xs text-white tracking-widest uppercase font-semibold">
                  Rasi 8–5–2+9
                </span>
              </div>
            </div>
            <p className="text-xs text-[#F4EDE1]/70 mt-3 italic max-w-md">
              “Garis 8–5–2 menanjak seperti langkah hidup, cabang ke 9 menggenapi siklus.”
            </p>
          </div>

          {/* Headline & Value Proposition */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <h1 className="font-serif-cormorant text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              Baca polamu, <br />
              <span className="text-[#C9A45C] italic font-normal">pilih langkahmu.</span>
            </h1>
            <p className="text-sm sm:text-base text-[#F4EDE1]/85 leading-relaxed font-sans-dm max-w-xl mx-auto">
              Kenali ritme hidup, potensi bawaan lahir, dan arah karier lewat perpaduan berbobot
              {' '}<strong>Numerologi Pythagoras, Astrologi Natal, BaZi, dan Tarot</strong>.
              Disusun manual secara hangat dan rapi oleh Madam Shara.
            </p>
          </div>

          {/* Action Pair */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => onOpenCalculator()}
              className="px-6 py-3.5 rounded-xl bg-[#A8512C] hover:bg-[#924221] text-white font-semibold text-sm shadow-md transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#F4EDE1]" />
              <span>Coba Kalkulator Gratis (Life Path + Musim Diri)</span>
            </button>
            <button
              onClick={() => onNavigateToTab('layanan')}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-[#F4EDE1] font-medium text-sm transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-[#C9A45C]" />
              <span>Katalog 4 Lini Layanan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-4 flex flex-wrap justify-center gap-6 text-xs text-[#F4EDE1]/75 border-t border-white/10">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#8A9A7B]" />
              <span>Bahasa Empatik & Hangat</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#8A9A7B]" />
              <span>Tanpa Vonis Fatalistis</span>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#8A9A7B]" />
              <span>Privasi UU No. 27/2022 PDP Terjamin</span>
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. PARADIGMA: BUKAN RAMALAN, TAPI PETA (3 PILAR UTAMA) */}
      {/* ============================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#A8512C] font-bold">
            Paradigma Lintang
          </span>
          <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#1F2A44]">
            Bukan ramalan masa depan, melainkan peta pemahaman diri.
          </h2>
          <p className="text-sm text-[#1F2A44]/75 leading-relaxed">
            Kami membantu memetakan pola bawaan lahir agar kamu bisa memilih langkah hidup dengan lebih sadar, berdaya, dan tanpa kecemasan irasional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-[#1F2A44]/10 p-6 sm:p-8 shadow-sm space-y-4 hover:border-[#C9A45C]/60 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#F4EDE1] border border-[#C9A45C]/30 flex items-center justify-center">
              <Compass className="w-6 h-6 text-[#A8512C]" />
            </div>
            <h3 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
              Sintesis 10 Sistem Pemetaan
            </h3>
            <p className="text-sm text-[#1F2A44]/80 leading-relaxed">
              Menyatukan kebijaksanaan Barat (Numerologi Pythagoras, Astrologi Natal, Tarot) dan Timur (BaZi 4 Pilar, Lo Shu Grid) ke dalam narasi bahasa Indonesia yang elegan dan mudah dipahami.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#1F2A44]/10 p-6 sm:p-8 shadow-sm space-y-4 hover:border-[#C9A45C]/60 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#F4EDE1] border border-[#C9A45C]/30 flex items-center justify-center">
              <Heart className="w-6 h-6 text-[#A8512C]" />
            </div>
            <h3 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
              Suara Kakak yang Hangat
            </h3>
            <p className="text-sm text-[#1F2A44]/80 leading-relaxed">
              Tidak ada vonis menakut-nakuti seperti “tahun sial” atau “kutukan karma”. Semua tantangan dipandang sebagai ruang belajar untuk pertumbuhan batin dan kedewasaanmu.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#1F2A44]/10 p-6 sm:p-8 shadow-sm space-y-4 hover:border-[#C9A45C]/60 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#F4EDE1] border border-[#C9A45C]/30 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-[#8A9A7B]" />
            </div>
            <h3 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
              Membumi & Praktis
            </h3>
            <p className="text-sm text-[#1F2A44]/80 leading-relaxed">
              Setiap laporan ditutup dengan bagian “Langkah Minggu Ini”: rekomendasi konkret dan aplikatif yang bisa langsung kamu terapkan dalam karier, finansial, dan relasi sehari-hari.
            </p>
          </div>
        </div>
      </section>

      {/* Subtle hairline section divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <hr className="border-t border-[#1F2A44]/10" />
      </div>

      {/* ============================================================== */}
      {/* 3. SHOWCASE DUA KARTU: PRATINJAU LAPORAN & KALKULATOR CEPAT */}
      {/* ============================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center space-y-3 max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#A8512C] font-bold">
            Pratinjau & Akses Cepat
          </span>
          <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#1F2A44]">
            Sentuhan Rapi & Estetis di Setiap Halaman
          </h2>
          <p className="text-sm text-[#1F2A44]/75">
            Laporan format PDF resolusi tinggi dengan nomor pesanan terverifikasi dan garansi koreksi data lahir 24 jam.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* KARTU 1: PRATINJAU LAPORAN EDITORIAL (BIRU MALAM CANVAS) */}
          <div className="bg-[#1F2A44] text-[#F4EDE1] rounded-2xl border border-[#C9A45C]/30 p-6 sm:p-8 shadow-md flex flex-col justify-between">
            <div className="space-y-6">
              {/* Slide Selector Tabs */}
              <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                {reportSlides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setSelectedSlide(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      selectedSlide === idx
                        ? 'bg-[#A8512C] text-white shadow-sm'
                        : 'text-[#F4EDE1]/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {slide.badge}
                  </button>
                ))}
              </div>

              <div>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-white">
                    {reportSlides[selectedSlide].title}
                  </h3>
                  <span className="font-serif-cormorant text-xl font-bold text-[#C9A45C] shrink-0">
                    {reportSlides[selectedSlide].price}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#F4EDE1]/75">
                  {reportSlides[selectedSlide].subtitle}
                </p>
              </div>

              {/* Bullet list with clean diamond indicators */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                {reportSlides[selectedSlide].bullets.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm">
                    <span className="text-[#C9A45C] font-serif font-bold text-base leading-none">✦</span>
                    <span className="text-[#F4EDE1]/90 leading-relaxed">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleOrderSlide(reportSlides[selectedSlide].id)}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#A8512C] hover:bg-[#924221] text-white text-xs font-semibold transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Pesan Laporan Ini</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigateToTab('layanan')}
                  className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-[#F4EDE1] text-xs font-medium transition-colors text-center cursor-pointer"
                >
                  Lihat Semua Layanan
                </button>
              </div>
              <div className="text-xs text-[#F4EDE1]/60 text-center flex items-center justify-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>Pengerjaan manual oleh Madam Shara (2–3 hari kerja)</span>
              </div>
            </div>
          </div>

          {/* KARTU 2: KALKULATOR CEPAT CLIENT-SIDE */}
          <div className="bg-white text-[#1F2A44] rounded-2xl border border-[#1F2A44]/10 p-6 sm:p-8 shadow-md flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs text-[#A8512C] font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#A8512C]" />
                <span>Kalkulator Instan Client-Side</span>
              </div>

              <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#1F2A44]">
                Buka Peta Dirimu Sekarang
              </h3>
              <p className="text-sm text-[#1F2A44]/75 leading-relaxed">
                Hitung Life Path Number dan Musim Diri secara instan tanpa biaya.
                Diolah langsung di browsermu tanpa menyimpan data lahir di server.
              </p>

              <form onSubmit={handleQuickSubmit} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#1F2A44]/70 mb-1.5 font-semibold">
                    Nama Lengkap (sesuai akta kelahiran)
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Nirwana Lintang"
                    value={quickName}
                    onChange={(e) => setQuickName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#A8512C]/30 focus:border-[#A8512C]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#1F2A44]/70 mb-1.5 font-semibold">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    value={quickBirthDate}
                    onChange={(e) => setQuickBirthDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#A8512C]/30 focus:border-[#A8512C]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#C9A45C] hover:bg-[#d8b56f] text-[#1F2A44] font-semibold text-sm shadow transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Sparkles className="w-4 h-4 text-[#1F2A44]" />
                  <span>Hitung Peta Diri (Gratis)</span>
                </button>
              </form>
            </div>

            <div className="pt-4 mt-6 border-t border-gray-100 text-center text-xs text-[#1F2A44]/65 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#8A9A7B]" />
              <span>Privasi data lahir terjamin sesuai ketentuan UU No. 27/2022 PDP.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Subtle hairline section divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <hr className="border-t border-[#1F2A44]/10" />
      </div>

      {/* ============================================================== */}
      {/* 4. KATALOG 4 LINI LAYANAN (MASTER PLAN SECTION 3.2) */}
      {/* ============================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#A8512C] font-bold">
              Katalog Layanan Lintang
            </span>
            <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#1F2A44]">
              4 Pintu Gerbang Menuju Peta Dirimu
            </h2>
            <p className="text-sm text-[#1F2A44]/75">
              Pilih kedalaman pemetaan yang paling relevan dengan fase hidupmu saat ini.
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab('layanan')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#A8512C] hover:text-[#924221] transition-colors cursor-pointer shrink-0"
          >
            <span>Buka Katalog Lengkap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* LINI 1: SERI ANGKA */}
          <div className="bg-white rounded-2xl border border-[#1F2A44]/10 p-6 shadow-sm flex flex-col justify-between hover:border-[#C9A45C]/60 transition-colors">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#F4EDE1] border border-[#C9A45C]/30 flex items-center justify-center">
                <span className="font-serif-cormorant text-lg font-bold text-[#A8512C]">1–9</span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#A8512C]">
                  Seri Angka
                </span>
                <h3 className="font-serif-cormorant text-xl font-bold text-[#1F2A44] mt-1">
                  Kode Diri & Musim Diri
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#1F2A44]/75 leading-relaxed">
                Numerologi Pythagoras 5 angka inti & siklus tahun personal 1–9 untuk membaca ritme hidup.
              </p>
              <div className="text-xs text-[#1F2A44]/65 pt-3 border-t border-gray-100">
                <strong className="text-[#1F2A44]">Data:</strong> Nama akta + tanggal lahir
              </div>
            </div>
            <div className="pt-4 mt-6 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-bold text-[#A8512C]">Mulai Rp149 rb</span>
              <button
                onClick={() => onNavigateToTab('layanan')}
                className="p-2 rounded-lg bg-[#F4EDE1] hover:bg-[#eae1d1] text-[#1F2A44] transition-colors cursor-pointer"
                title="Pilih Seri Angka"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* LINI 2: SERI LANGIT */}
          <div className="bg-white rounded-2xl border border-[#1F2A44]/10 p-6 shadow-sm flex flex-col justify-between hover:border-[#C9A45C]/60 transition-colors">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#F4EDE1] border border-[#C9A45C]/30 flex items-center justify-center">
                <Moon className="w-5 h-5 text-[#1F2A44]" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#A8512C]">
                  Seri Langit
                </span>
                <h3 className="font-serif-cormorant text-xl font-bold text-[#1F2A44] mt-1">
                  Peta Bintang & BaZi
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#1F2A44]/75 leading-relaxed">
                Astrologi Barat & Empat Pilar Nasib Tiongkok dengan opsi jam lahir fleksibel.
              </p>
              <div className="text-xs text-[#1F2A44]/65 pt-3 border-t border-gray-100">
                <strong className="text-[#1F2A44]">Data:</strong> Tanggal, jam, & kota lahir
              </div>
            </div>
            <div className="pt-4 mt-6 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-bold text-[#A8512C]">Mulai Rp149 rb</span>
              <button
                onClick={() => onNavigateToTab('layanan')}
                className="p-2 rounded-lg bg-[#F4EDE1] hover:bg-[#eae1d1] text-[#1F2A44] transition-colors cursor-pointer"
                title="Pilih Seri Langit"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* LINI 3: SERI RELASI */}
          <div className="bg-white rounded-2xl border border-[#1F2A44]/10 p-6 shadow-sm flex flex-col justify-between hover:border-[#C9A45C]/60 transition-colors">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#F4EDE1] border border-[#C9A45C]/30 flex items-center justify-center">
                <Heart className="w-5 h-5 text-[#A8512C]" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#A8512C]">
                  Seri Relasi
                </span>
                <h3 className="font-serif-cormorant text-xl font-bold text-[#1F2A44] mt-1">
                  Dua Lintang
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#1F2A44]/75 leading-relaxed">
                Matriks dinamika sinergi & titik friksi berdua (pasangan atau sahabat terdekat).
              </p>
              <div className="text-xs text-[#1F2A44]/65 pt-3 border-t border-gray-100">
                <strong className="text-[#1F2A44]">Data:</strong> Dua tanggal lahir + izin
              </div>
            </div>
            <div className="pt-4 mt-6 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-bold text-[#A8512C]">Rp149 rb</span>
              <button
                onClick={() => onNavigateToTab('dua-lintang')}
                className="p-2 rounded-lg bg-[#F4EDE1] hover:bg-[#eae1d1] text-[#1F2A44] transition-colors cursor-pointer"
                title="Coba Dua Lintang"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* LINI 4: PAKET UTUH (FLAGSHIP CARD DALAM BIRU MALAM) */}
          <div className="bg-[#1F2A44] text-[#F4EDE1] rounded-2xl border-2 border-[#C9A45C]/60 p-6 shadow-md flex flex-col justify-between relative">
            <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-[#A8512C] text-white text-xs font-bold uppercase tracking-wider shadow">
              Mulai Dari Sini
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-[#C9A45C]/40 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#C9A45C]" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#C9A45C]">
                  Paket Pilihan
                </span>
                <h3 className="font-serif-cormorant text-xl font-bold text-white mt-1">
                  Sekilas & Lintang Utuh
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#F4EDE1]/80 leading-relaxed">
                Pintu masuk terjangkau (Rp49rb) atau sintesis penuh 10 sistem (Rp199rb).
              </p>
              <div className="text-xs text-[#F4EDE1]/65 pt-3 border-t border-white/10">
                <strong className="text-white">Format:</strong> PDF siap baca + aksi nyata
              </div>
            </div>
            <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold text-[#C9A45C]">Rp49 rb – Rp199 rb</span>
              <button
                onClick={() => onNavigateToTab('layanan')}
                className="p-2 rounded-lg bg-[#C9A45C] hover:bg-[#d8b56f] text-[#1F2A44] transition-colors cursor-pointer"
                title="Pilih Paket"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Subtle hairline section divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <hr className="border-t border-[#1F2A44]/10" />
      </div>

      {/* ============================================================== */}
      {/* 5. CARA KERJA 3 LANGKAH (MASTER PLAN SECTION 3.1 & 5) */}
      {/* ============================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 space-y-12">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#A8512C] font-bold">
            Alur Pemesanan Cepat
          </span>
          <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#1F2A44]">
            Cara Kerja Lintang dalam 3 Langkah
          </h2>
          <p className="text-sm text-[#1F2A44]/75">
            Didesain transparan, cepat, tanpa registrasi akun yang berbelit-belit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-[#1F2A44]/10 p-6 sm:p-8 space-y-3 shadow-sm">
            <div className="text-xs font-bold text-[#A8512C] font-mono tracking-wider">LANGKAH 01</div>
            <h3 className="font-serif-cormorant text-xl font-bold text-[#1F2A44]">Pilih Layanan</h3>
            <p className="text-xs sm:text-sm text-[#1F2A44]/75 leading-relaxed">
              Tentukan laporan yang kamu butuhkan: Seri Angka, Seri Langit, Seri Relasi, atau Paket Lintang Utuh.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#1F2A44]/10 p-6 sm:p-8 space-y-3 shadow-sm">
            <div className="text-xs font-bold text-[#A8512C] font-mono tracking-wider">LANGKAH 02</div>
            <h3 className="font-serif-cormorant text-xl font-bold text-[#1F2A44]">Isi Data Lahir Aman</h3>
            <p className="text-xs sm:text-sm text-[#1F2A44]/75 leading-relaxed">
              Masukkan nama akta dan tanggal lahir. Jika jam lahir tidak diketahui, sistem otomatis menyesuaikan batasan laporan secara transparan.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#1F2A44]/10 p-6 sm:p-8 space-y-3 shadow-sm">
            <div className="text-xs font-bold text-[#A8512C] font-mono tracking-wider">LANGKAH 03</div>
            <h3 className="font-serif-cormorant text-xl font-bold text-[#1F2A44]">Terima Laporan PDF</h3>
            <p className="text-xs sm:text-sm text-[#1F2A44]/75 leading-relaxed">
              Laporan disusun manual oleh Madam Shara (2–3 hari kerja), dikirim via WhatsApp dengan nomor pesanan resmi dan garansi revisi data 24 jam.
            </p>
          </div>
        </div>
      </section>

      {/* Subtle hairline section divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <hr className="border-t border-[#1F2A44]/10" />
      </div>

      {/* ============================================================== */}
      {/* 6. BUKTI SOSIAL / TESTIMONI TERVERIFIKASI */}
      {/* ============================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 space-y-12">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#A8512C] font-bold">
            Kata Mereka yang Telah Membaca Pola
          </span>
          <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#1F2A44]">
            Pengalaman Bersama Lintang
          </h2>
          <p className="text-sm text-[#1F2A44]/75">
            Refleksi nyata dari teman-teman yang telah menggunakan laporan Lintang sebagai kompas hidup.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#1F2A44]/10 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm"
            >
              <p className="text-xs sm:text-sm text-[#1F2A44]/80 italic leading-relaxed">
                {t.text}
              </p>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-[#1F2A44]">{t.name}</div>
                  <div className="text-[#1F2A44]/60 text-xs">{t.role}</div>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-[#F4EDE1] text-[#A8512C] text-xs font-semibold">
                  {t.service}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subtle hairline section divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <hr className="border-t border-[#1F2A44]/10" />
      </div>

      {/* ============================================================== */}
      {/* 7. 5 NILAI LINTANG (PRINSIP FUNDAMENTAL) */}
      {/* ============================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-10">
        <div className="text-center space-y-3 max-w-lg mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#A8512C] font-bold">
            Prinsip Fundamental
          </span>
          <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#1F2A44]">
            5 Nilai yang Selalu Kami Jaga
          </h2>
          <p className="text-sm text-[#1F2A44]/75">
            Komitmen etis kami dalam setiap pembacaan dan penyusunan laporan peta diri.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CORE_VALUES.map((val, idx) => (
            <div
              key={idx}
              className="bg-white/80 rounded-2xl border border-[#1F2A44]/10 p-5 space-y-3 shadow-sm hover:border-[#C9A45C]/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif-cormorant text-xl font-bold text-[#A8512C]">
                  {val.name}
                </span>
                <span className="text-xs text-[#1F2A44]/40 font-mono">0{idx + 1}</span>
              </div>
              <div className="text-xs font-semibold text-[#1F2A44] italic">
                “{val.tagline}”
              </div>
              <p className="text-xs text-[#1F2A44]/70 leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. FOOTER CALL-TO-ACTION BANNER (DEEP BIRU MALAM) */}
      {/* ============================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 text-center">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#1F2A44] text-[#F4EDE1] border border-[#C9A45C]/30 shadow-lg space-y-6">
          <div className="w-12 h-12 rounded-xl bg-white/10 border border-[#C9A45C]/40 flex items-center justify-center mx-auto text-[#C9A45C] font-serif-cormorant text-2xl font-bold">
            ✦
          </div>
          <h2 className="font-serif-cormorant text-3xl sm:text-5xl font-bold text-white">
            Siap Membaca Pola Langkahmu?
          </h2>
          <p className="text-sm sm:text-base text-[#F4EDE1]/80 max-w-lg mx-auto leading-relaxed">
            Mulai dari kalkulator gratis atau konsultasikan langsung kebutuhan laporanmu bersama Madam Shara via WhatsApp.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => onOpenCalculator()}
              className="px-6 py-3.5 rounded-xl bg-[#A8512C] hover:bg-[#924221] text-white font-semibold text-sm shadow transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#F4EDE1]" />
              <span>Coba Kalkulator Gratis</span>
            </button>
            <button
              onClick={() => onNavigateToTab('layanan')}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-[#F4EDE1] text-sm font-semibold transition-colors cursor-pointer"
            >
              <span>Katalog Semua Layanan</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
