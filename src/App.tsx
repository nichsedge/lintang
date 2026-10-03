import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  User,
  Heart,
  Compass,
  Check,
  Copy,
  CheckCircle2,
  Shield,
  ShieldCheck,
  MessageCircle,
  Share2,
  RotateCw,
  Gift,
  X,
  FileText,
  Menu,
  BookOpen,
  AlertCircle,
  QrCode,
  CreditCard,
  Wallet
} from 'lucide-react';
import { LoShuCanvas } from './components/LoShuCanvas';
import { SERVICES, ServiceItem } from './data/blueprintData';
import { generatePetaDiri, FullPetaDiriResult } from './utils/numerology';
import { TarotCard3D } from './components/TarotCard3D';
import { OrbitWheel } from './components/OrbitWheel';
import { LoShuInteractiveGrid } from './components/LoShuInteractiveGrid';
import { DuaLintangVisualizer } from './components/DuaLintangVisualizer';
import { ReflectionCardModal } from './components/ReflectionCardModal';
import { KadoLintangSection } from './components/KadoLintangSection';
import { JurnalSection } from './components/JurnalSection';
import { LegalModal, LegalDocType } from './components/LegalModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { generateReflectionPdf } from './utils/pdfGenerator';

export default function App() {
  const [activeTab, setActiveTab] = useState<'beranda' | 'layanan' | 'kalkulator' | 'dua-lintang' | 'kado' | 'jurnal' | 'tentang'>('beranda');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Weekly Quota Indicator
  const weeklyQuota = { remaining: 4, total: 15, currentWeek: 'Minggu ke-1 Oktober 2026' };

  // Calculator Form State
  const [calcName, setCalcName] = useState('Nirwana');
  const [calcDate, setCalcDate] = useState('1998-08-17');
  const [calcTime, setCalcTime] = useState('14:30');
  const [calcCity, setCalcCity] = useState('Yogyakarta');
  const [isCalculating, setIsCalculating] = useState(false);
  const [calcProgress, setCalcProgress] = useState(0);
  const [calcResult, setCalcResult] = useState<FullPetaDiriResult | null>(() =>
    generatePetaDiri('Nirwana', '1998-08-17', '14:30', 'Yogyakarta')
  );

  // Selected year in 9-Year Orbit Wheel
  const [selectedOrbitYear, setSelectedOrbitYear] = useState<number>(() => {
    return calcResult?.personalYear.personalYear || 1;
  });

  // Modals State
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalDoc, setLegalModalDoc] = useState<LegalDocType>('disclaimer');

  // Booking Modal State
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3>(1);
  const [bookingAddOns, setBookingAddOns] = useState({ kisiSembilan: false, jejakKarma: false, kadoLintang: false });
  const [bookingForm, setBookingForm] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    unknownTime: false,
    unknownTimeAcknowledged: false,
    birthCity: 'Jakarta',
    gender: 'wanita' as 'pria' | 'wanita',
    partnerName: '',
    partnerDate: '',
    partnerTime: '',
    partnerConsent: false,
    giftNote: '',
    pdpConsent: true,
    promoConsent: false,
    paymentMethod: 'qris' as 'qris' | 'va' | 'ewallet',
  });
  const [generatedOrderNumber, setGeneratedOrderNumber] = useState('');

  // Service Filter
  const [serviceCategory, setServiceCategory] = useState<string>('all');

  // Date Formatter helper
  const formatDateToIndonesian = (dateStr: string) => {
    if (!dateStr) return '-';
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parts[0];
      const monthIndex = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      return `${day} ${months[monthIndex] || parts[1]} ${year}`;
    }
    return dateStr;
  };

  // Close booking modal on Escape key
  useEffect(() => {
    if (!selectedService) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedService(null);
        setBookingStep(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedService]);

  const handleRunCalculator = (e: React.FormEvent) => {
    e.preventDefault();
    if (!calcDate) return;
    setIsCalculating(true);
    setCalcProgress(12);

    setTimeout(() => setCalcProgress(38), 180);
    setTimeout(() => setCalcProgress(68), 420);
    setTimeout(() => setCalcProgress(92), 700);
    setTimeout(() => setCalcProgress(100), 920);

    setTimeout(() => {
      const res = generatePetaDiri(calcName, calcDate, calcTime, calcCity);
      setCalcResult(res);
      if (res) {
        setSelectedOrbitYear(res.personalYear.personalYear);
      }
      setIsCalculating(false);
      setCalcProgress(0);
    }, 1100);
  };

  const filteredServices = useMemo(() => {
    if (serviceCategory === 'all') return SERVICES;
    return SERVICES.filter((s) => s.category === serviceCategory);
  }, [serviceCategory]);

  const handleStartBooking = (service: ServiceItem, isGift: boolean = false) => {
    setSelectedService(service);
    setBookingStep(1);
    setBookingAddOns((prev) => ({ ...prev, kadoLintang: isGift }));
    setBookingForm((prev) => ({
      ...prev,
      name: prev.name || calcName,
      birthDate: prev.birthDate || calcDate,
      birthTime: prev.birthTime || calcTime,
      birthCity: prev.birthCity || calcCity,
    }));
  };

  const handleProceedToSummary = () => {
    if (!bookingForm.name || !bookingForm.birthDate) {
      alert('Mohon isi nama lengkap dan tanggal lahir terlebih dahulu.');
      return;
    }
    if (selectedService?.category === 'seri-langit' && bookingForm.unknownTime && !bookingForm.unknownTimeAcknowledged) {
      alert('Mohon centang konfirmasi bahwa kamu memahami batasan laporan tanpa jam lahir.');
      return;
    }
    if (selectedService?.category === 'seri-relasi' && !bookingForm.partnerConsent) {
      alert('Mohon centang persetujuan izin orang kedua untuk memproses data lahirnya.');
      return;
    }
    if (!bookingForm.pdpConsent) {
      alert('Mohon setujui persetujuan pemrosesan data lahir sesuai ketentuan privasi UU PDP.');
      return;
    }
    // Generate order number
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNo = `LTG-202610-${randomSuffix}`;
    setGeneratedOrderNumber(orderNo);
    setBookingStep(2);
  };

  const handleConfirmAndSendOrder = () => {
    if (!selectedService) return;
    let msg = `Halo Madam Shara & Tim Lintang! ✨\nSaya ingin mengonfirmasi pesanan laporan peta diri:\n\n`;
    msg += `🏷️ *Nomor Pesanan:* ${generatedOrderNumber}\n`;
    msg += `📌 *Layanan:* ${selectedService.name} (${selectedService.subtitle})\n`;
    msg += `💵 *Tarif:* ${selectedService.price}\n`;
    msg += `💳 *Metode Pembayaran:* ${bookingForm.paymentMethod.toUpperCase()}\n`;
    msg += `\n👤 *Data Pemesan:*\n• Nama: ${bookingForm.name}\n• Tanggal Lahir: ${formatDateToIndonesian(bookingForm.birthDate)}\n`;
    
    if (bookingForm.unknownTime) {
      msg += `• Jam Lahir: Tidak Diketahui (Format disesuaikan)\n`;
    } else if (bookingForm.birthTime) {
      msg += `• Jam Lahir: ${bookingForm.birthTime}\n`;
    }
    if (bookingForm.birthCity) msg += `• Kota Lahir: ${bookingForm.birthCity}\n`;

    if (selectedService.category === 'seri-relasi' && bookingForm.partnerName) {
      msg += `\n👥 *Data Orang Kedua:*\n• Nama: ${bookingForm.partnerName}\n• Tanggal Lahir: ${formatDateToIndonesian(bookingForm.partnerDate)}\n• Izin: Terkonfirmasi\n`;
    }

    const addOns: string[] = [];
    if (bookingAddOns.kisiSembilan) addOns.push('Kisi Sembilan (+Rp49rb)');
    if (bookingAddOns.jejakKarma) addOns.push('Jejak Karma (+Rp49rb)');
    if (bookingAddOns.kadoLintang) addOns.push(`Kado Lintang (+Rp25rb) - "${bookingForm.giftNote || 'Selamat bertumbuh'}"`);

    if (addOns.length > 0) {
      msg += `\n🎁 *Add-on:* ${addOns.join(', ')}\n`;
    }

    msg += `\n🔒 *Privasi:* Menyetujui pemrosesan data lahir sesuai UU No. 27/2022 PDP.\n`;
    msg += `Mohon konfirmasi instruksi transfer dan ketersediaan slot pengerjaan. Terima kasih! 🌿`;

    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(msg)}`, '_blank');
    setBookingStep(3);
  };

  const openLegalModalWithDoc = (doc: LegalDocType) => {
    setLegalModalDoc(doc);
    setIsLegalModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F4EDE1] text-[#1F2A44] font-sans-dm selection:bg-[#C2673F]/20">
      {/* STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-[#1F2A44]/95 backdrop-blur-md border-b border-[#C9A45C]/20 text-[#F4EDE1]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          {/* Brand Logo & Descriptor */}
          <div
            onClick={() => setActiveTab('beranda')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#172136] border border-[#C9A45C]/40 flex items-center justify-center p-1 group-hover:border-[#C9A45C] transition-all shadow-md">
              <LoShuCanvas activeNodes={[8, 5, 2, 9]} lines={[[8, 5], [5, 2], [5, 9]]} size={30} />
            </div>
            <div>
              <span className="font-serif-cormorant text-2xl font-bold tracking-tight text-white leading-none">
                lintang
              </span>
              <span className="text-[9px] tracking-[0.22em] uppercase text-[#C9A45C] font-semibold block mt-0.5">
                Studio Peta Diri
              </span>
              <span className="text-[8px] tracking-wider text-[#F4EDE1]/60 italic block">
                oleh Madam Shara
              </span>
            </div>
          </div>

          {/* Desktop Navigation (5 Core Items + Home) */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-medium">
            <button
              onClick={() => setActiveTab('beranda')}
              className={`px-3 py-2 rounded-lg transition-all ${
                activeTab === 'beranda' ? 'bg-[#A8512C] text-white shadow-sm' : 'text-[#F4EDE1]/85 hover:text-white hover:bg-white/5'
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => setActiveTab('layanan')}
              className={`px-3 py-2 rounded-lg transition-all ${
                activeTab === 'layanan' ? 'bg-[#A8512C] text-white shadow-sm' : 'text-[#F4EDE1]/85 hover:text-white hover:bg-white/5'
              }`}
            >
              Layanan (Katalog)
            </button>
            <button
              onClick={() => setActiveTab('kalkulator')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'kalkulator' ? 'bg-[#A8512C] text-white shadow-sm' : 'text-[#C9A45C] font-bold hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>Kalkulator Gratis</span>
            </button>
            <button
              onClick={() => setActiveTab('kado')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1 ${
                activeTab === 'kado' ? 'bg-[#A8512C] text-white shadow-sm' : 'text-[#F4EDE1]/85 hover:text-white hover:bg-white/5'
              }`}
            >
              <Gift className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>Kado Lintang</span>
            </button>
            <button
              onClick={() => setActiveTab('jurnal')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1 ${
                activeTab === 'jurnal' ? 'bg-[#A8512C] text-white shadow-sm' : 'text-[#F4EDE1]/85 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>Jurnal</span>
            </button>
            <button
              onClick={() => setActiveTab('tentang')}
              className={`px-3 py-2 rounded-lg transition-all ${
                activeTab === 'tentang' ? 'bg-[#A8512C] text-white shadow-sm' : 'text-[#F4EDE1]/85 hover:text-white hover:bg-white/5'
              }`}
            >
              Tentang
            </button>
          </nav>

          <div className="flex items-center gap-2">
            {calcResult && (
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="hidden sm:flex px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#F4EDE1] text-xs font-medium items-center gap-1.5 transition-all"
                title="Bagikan Kartu Refleksi"
              >
                <Share2 className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>Kartu Refleksi</span>
              </button>
            )}
            <button
              onClick={() => {
                setActiveTab('kalkulator');
                setMobileMenuOpen(false);
              }}
              className="px-3 sm:px-4 py-2 rounded-xl bg-[#C9A45C] hover:bg-[#d8b56f] text-[#1F2A44] text-xs font-semibold shadow transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Coba Kalkulator</span>
              <span className="sm:hidden">Kalkulator</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#C9A45C]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#182238] border-b border-[#C9A45C]/30 px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2 duration-200 shadow-2xl">
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#C9A45C] px-2 mb-1">
              Navigasi Halaman
            </div>
            <div className="grid grid-cols-1 gap-1">
              {[
                { id: 'beranda', label: 'Beranda' },
                { id: 'layanan', label: 'Layanan & Pembacaan' },
                { id: 'kalkulator', label: 'Kalkulator Gratis (Lead Magnet)' },
                { id: 'kado', label: 'Kado Lintang (Pesan Untuk Orang Lain)' },
                { id: 'jurnal', label: 'Jurnal & Catatan Edukasi' },
                { id: 'tentang', label: 'Tentang & Profil Madam Shara' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id as any); setMobileMenuOpen(false); }}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2.5 transition-all ${
                    activeTab === item.id ? 'bg-[#A8512C] text-white shadow-sm' : 'text-[#F4EDE1]/85 hover:bg-white/10'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* VIEW: BERANDA */}
      {activeTab === 'beranda' && (
        <div>
          {/* HERO SECTION */}
          <section className="bg-[#1F2A44] text-[#F4EDE1] pt-12 pb-24 px-4 text-center relative overflow-hidden">
            <div className="absolute top-8 right-8 sm:right-24 w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-[#F4EDE1] shadow-[0_0_50px_rgba(244,237,225,0.3)] flex items-center justify-center pointer-events-none">
              <div className="w-18 h-18 sm:w-24 sm:h-24 rounded-full bg-[#1F2A44] -translate-x-3 -translate-y-1" />
            </div>
            <div className="absolute top-12 left-1/4 w-1.5 h-1.5 rounded-full bg-[#C9A45C] animate-twinkle pointer-events-none" />
            <div className="absolute top-36 left-12 w-2 h-2 rounded-full bg-white/70 animate-twinkle-slow pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10 space-y-6">
              {/* Status Badge + Weekly Quota Counter */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C9A45C]/40 text-[#C9A45C] text-xs font-medium tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Studio Peta Diri · Bukan Ramalan, Tapi Peta</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8A9A7B]/20 border border-[#8A9A7B]/40 text-emerald-300 text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Slot Minggu Ini: Tersisa {weeklyQuota.remaining} dari {weeklyQuota.total} laporan</span>
                </div>
              </div>

              {/* Rasi 8-5-2+9 Central Icon */}
              <div className="flex justify-center">
                <div className="p-3.5 rounded-3xl bg-[#172136] border border-[#C9A45C]/40 shadow-2xl hover:scale-105 transition-transform duration-300">
                  <LoShuCanvas activeNodes={[8, 5, 2, 9]} lines={[[8, 5], [5, 2], [5, 9]]} size={110} />
                </div>
              </div>

              <div className="space-y-3">
                <h1 className="font-serif-cormorant text-5xl sm:text-7xl font-bold tracking-tight text-white leading-tight">
                  Baca polamu, pilih langkahmu.
                </h1>
                <p className="text-base sm:text-lg text-[#F4EDE1]/85 max-w-xl mx-auto leading-relaxed">
                  Kenali ritme hidup, potensi bawaan lahir, dan arah karier lewat perpaduan cerdas
                  <strong> Numerologi, Astrologi, BaZi, Human Design, dan Tarot</strong>.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('kalkulator')}
                  className="px-6 py-3.5 rounded-xl bg-[#C9A45C] hover:bg-[#d8b56f] text-[#1F2A44] font-semibold text-sm shadow-lg transition-all flex items-center gap-2 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Coba Kalkulator Gratis (Life Path + Musim Diri)</span>
                </button>
                <button
                  onClick={() => setActiveTab('layanan')}
                  className="px-6 py-3.5 rounded-xl bg-[#A8512C] hover:bg-[#924221] text-white font-semibold text-sm shadow-lg transition-all flex items-center gap-2 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Lihat 4 Lini Layanan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-6 text-xs text-[#F4EDE1]/70">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8A9A7B]" />
                  <span>Bahasa Empatik & Hangat</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8A9A7B]" />
                  <span>Tanpa Vonis Fatalistis</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8A9A7B]" />
                  <span>Privasi UU No. 27/2022 Terjamin</span>
                </span>
              </div>
            </div>

            {/* Bottom Horizon Curve */}
            <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
              <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-8 sm:h-12">
                <path d="M0,20 C300,50 600,0 1200,30 L1200,60 L0,60 Z" fill="#8A9A7B" opacity="0.8" />
                <path d="M0,35 C400,10 800,55 1200,35 L1200,60 L0,60 Z" fill="#C2673F" />
                <path d="M0,50 C500,40 900,58 1200,50 L1200,60 L0,60 Z" fill="#F4EDE1" />
              </svg>
            </div>
          </section>

          {/* 3 CORE PILLARS */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-12">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-[#C2673F] font-bold">
                Mengapa Memilih Lintang?
              </span>
              <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#1F2A44]">
                Bukan ramalan masa depan, melainkan peta pemahaman diri.
              </h2>
              <p className="text-xs sm:text-sm text-[#1F2A44]/75 leading-relaxed">
                Kami membantu memetakan pola bawaan lahir agar kamu bisa memilih langkah hidup dengan lebih sadar dan berdaya.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Compass className="w-5 h-5 text-[#C2673F]" />,
                  title: 'Sintesis 10 Sistem Pemetaan',
                  desc: 'Menyatukan kebijaksanaan Barat (Numerologi Pythagoras, Astrologi Natal, Tarot) dan Timur (BaZi 4 Pilar, Lo Shu Grid) ke dalam narasi bahasa Indonesia yang mudah dimengerti.',
                },
                {
                  icon: <Heart className="w-5 h-5 text-[#8A9A7B]" />,
                  title: 'Suara Kakak yang Hangat',
                  desc: 'Tidak ada istilah menakut-nakuti seperti “tahun sial” atau “kutukan karma”. Semua tantangan dipandang sebagai ruang belajar untuk pertumbuhan batinmu.',
                },
                {
                  icon: <Shield className="w-5 h-5 text-[#C9A45C]" />,
                  title: 'Membumi & Praktis',
                  desc: 'Setiap laporan ditutup dengan “Langkah Minggu Ini”: rekomendasi konkret dan aplikatif yang bisa langsung kamu terapkan dalam karier dan relasi.',
                },
              ].map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-[#1F2A44]/10 shadow-sm space-y-3 hover:border-[#C9A45C] transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F4EDE1] flex items-center justify-center">
                    {pillar.icon}
                  </div>
                  <h3 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#1F2A44]/80 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 3 STEPS HOW IT WORKS */}
          <section className="bg-white py-14 border-y border-[#1F2A44]/10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
              <div className="text-center space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#C2673F] font-bold">
                  Alur Mudah Pemesanan
                </span>
                <h3 className="font-serif-cormorant text-3xl font-bold text-[#1F2A44]">
                  Cara Kerja Lintang dalam 3 Langkah
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-[#F4EDE1]/50 border border-gray-200 space-y-2">
                  <div className="text-xs font-bold text-[#C2673F] font-mono">LANGKAH 01</div>
                  <h4 className="font-serif-cormorant text-xl font-bold text-[#1F2A44]">Pilih Layanan</h4>
                  <p className="text-xs text-[#1F2A44]/75">
                    Pilih lini yang sesuai kebutuhanmu: Seri Angka, Seri Langit, Seri Relasi, atau Paket Lengkap Lintang Utuh.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-[#F4EDE1]/50 border border-gray-200 space-y-2">
                  <div className="text-xs font-bold text-[#C2673F] font-mono">LANGKAH 02</div>
                  <h4 className="font-serif-cormorant text-xl font-bold text-[#1F2A44]">Isi Data Lahir Aman</h4>
                  <p className="text-xs text-[#1F2A44]/75">
                    Masukkan nama akta dan tanggal lahir. Jika jam lahir tidak diketahui, sistem otomatis menyesuaikan batasan laporan.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-[#F4EDE1]/50 border border-gray-200 space-y-2">
                  <div className="text-xs font-bold text-[#C2673F] font-mono">LANGKAH 03</div>
                  <h4 className="font-serif-cormorant text-xl font-bold text-[#1F2A44]">Terima Laporan PDF</h4>
                  <p className="text-xs text-[#1F2A44]/75">
                    Laporan dikerjakan manual oleh Madam Shara (2–3 hari kerja) dan dikirim via WhatsApp dengan garansi revisi data 24 jam.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* DUA LINTANG QUICK PROMO */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
            <div className="bg-[#1F2A44] text-[#F4EDE1] rounded-3xl p-8 sm:p-12 border border-[#C9A45C]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl">
                <div className="inline-flex items-center gap-1.5 text-xs uppercase font-bold text-[#C9A45C]">
                  <Heart className="w-3.5 h-3.5 text-[#C2673F]" />
                  <span>Dua Lintang · Matriks Relasi Berdua</span>
                </div>
                <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-white leading-tight">
                  Dua Peta, Satu Cerita.
                </h2>
                <p className="text-xs sm:text-sm text-[#F4EDE1]/85 leading-relaxed">
                  Uji kecocokan dua tanggal kelahiran untuk menemukan titik sinergi alami, sumber potensi salah paham, dan bahasa komunikasi yang perlu dilatih bersama.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveTab('dua-lintang')}
                    className="px-5 py-2.5 rounded-xl bg-[#A8512C] hover:bg-[#924221] text-white text-xs font-semibold shadow transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Coba Simulator Pasangan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setActiveTab('kado')}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#F4EDE1] text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Gift className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>Pesan Sebagai Kado</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#172136] border border-white/10 text-center flex items-center gap-3">
                <div className="w-16 h-16 rounded-full border border-dashed border-[#C9A45C] flex items-center justify-center text-xs font-serif-cormorant">
                  Kamu
                </div>
                <div className="w-10 h-10 rounded-full bg-[#C9A45C] text-[#1F2A44] flex items-center justify-center font-bold text-sm">
                  ★
                </div>
                <div className="w-16 h-16 rounded-full border border-dashed border-[#8A9A7B] flex items-center justify-center text-xs font-serif-cormorant">
                  Dia
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* VIEW: KALKULATOR PETA DIRI INTERAKTIF LENGKAP */}
      {activeTab === 'kalkulator' && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#C2673F] font-bold">
              Kalkulator Interaktif Gratis
            </span>
            <h1 className="font-serif-cormorant text-4xl sm:text-5xl font-bold text-[#1F2A44]">
              Hitung Peta Dirimu
            </h1>
            <p className="text-xs sm:text-sm text-[#1F2A44]/75">
              Masukkan nama panggilan dan tanggal lahir untuk mengkalkulasi Life Path, Tahun Personal, Kartu Lahir Tarot, dan Kisi Lo Shu.
            </p>
          </div>

          {/* Calculator Input Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1F2A44]/10 shadow-lg space-y-6">
            <form onSubmit={handleRunCalculator} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1F2A44] mb-1">
                  Nama Panggilan / Lengkap
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={calcName}
                    onChange={(e) => setCalcName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#C2673F] outline-none"
                    placeholder="Contoh: Nirwana"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F2A44] mb-1">
                  Tanggal Lahir
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="date"
                    value={calcDate}
                    onChange={(e) => setCalcDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#C2673F] outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F2A44] mb-1">
                  Jam Lahir (Opsional)
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="time"
                    value={calcTime}
                    onChange={(e) => setCalcTime(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#C2673F] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F2A44] mb-1">
                  Kota Kelahiran
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={calcCity}
                    onChange={(e) => setCalcCity(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#C2673F] outline-none"
                    placeholder="Contoh: Yogyakarta"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 lg:col-span-4 pt-2">
                <button
                  type="submit"
                  disabled={isCalculating}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#A8512C] hover:bg-[#924221] active:bg-[#7e3518] text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isCalculating ? 'Menghitung Pola Diri...' : 'Hitung Peta Diri Sekarang'}</span>
                </button>
              </div>
            </form>

            {isCalculating && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-[#1F2A44]/70 font-mono">
                  <span>Mengkalkulasi matriks tanggal lahir...</span>
                  <span>{calcProgress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full bg-[#C9A45C] transition-all duration-200 rounded-full"
                    style={{ width: `${calcProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Calculator Results Display */}
          {calcResult && (
            <div className="space-y-10">
              {/* Core Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Life Path */}
                <div className="p-6 rounded-3xl bg-white border border-[#1F2A44]/10 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <span className="text-[11px] uppercase font-bold text-[#C2673F] tracking-wider">
                      Jalan Hidup Utama (Life Path)
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#1F2A44] text-[#C9A45C] flex items-center justify-center font-serif-cormorant font-bold text-lg">
                      {calcResult.lifePath.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
                      {calcResult.lifePath.name}
                    </h3>
                    <p className="text-xs text-[#1F2A44]/80 mt-1 leading-relaxed">
                      {calcResult.lifePath.coreTheme}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F4EDE1]/50 text-xs space-y-1">
                    <div className="font-semibold text-[#1F2A44]">Fokus Pertumbuhan:</div>
                    <div className="text-[#1F2A44]/75 text-[11px]">{calcResult.lifePath.practicalWeeklyAction}</div>
                  </div>
                </div>

                {/* 2. Musim Diri */}
                <div className="p-6 rounded-3xl bg-white border border-[#1F2A44]/10 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <span className="text-[11px] uppercase font-bold text-[#8A9A7B] tracking-wider">
                      Musim Diri Tahun Ini
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#8A9A7B] text-white flex items-center justify-center font-bold text-xs">
                      Thn {calcResult.personalYear.personalYear}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
                      {calcResult.personalYear.stageName}
                    </h3>
                    <p className="text-xs text-[#1F2A44]/80 mt-1 leading-relaxed">
                      {calcResult.personalYear.description}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#8A9A7B]/10 text-xs space-y-1">
                    <div className="font-semibold text-[#1F2A44]">Langkah Praktis Musim Ini:</div>
                    <div className="text-[#1F2A44]/75 text-[11px]">{calcResult.personalYear.lintangAdvice}</div>
                  </div>
                </div>
              </div>

              {/* 3D Tarot & 9-Year Orbit Wheel */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                  <h3 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
                    Kartu Lahir Tarot (Major Arcana)
                  </h3>
                  <TarotCard3D initialCard={calcResult.tarotCard} />
                </div>
                <div className="space-y-4">
                  <h3 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
                    Siklus 9 Tahun (Orbit Wheel)
                  </h3>
                  <OrbitWheel
                    currentYearNum={calcResult.personalYear.personalYear}
                    onSelectYear={(yr) => setSelectedOrbitYear(yr)}
                    selectedYear={selectedOrbitYear}
                  />
                </div>
              </div>

              {/* Lo Shu Grid Explorer */}
              <div className="space-y-4">
                <h3 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
                  Pemetaan Kisi Lo Shu 3×3 Tanggal Lahir
                </h3>
                <LoShuInteractiveGrid
                  presentNumbers={calcResult.loShu.presentNumbers}
                  counts={calcResult.loShu.counts}
                />
              </div>

              {/* Quick Actions to Share / Download */}
              <div className="p-6 rounded-2xl bg-[#1F2A44] text-[#F4EDE1] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif-cormorant text-xl font-bold text-white">
                    Simpan & Bagikan Hasil Peta Dirimu
                  </h4>
                  <p className="text-xs text-[#F4EDE1]/75">
                    Buat kartu refleksi estetik ramah Instagram Story atau unduh laporan rangkuman format PDF.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsShareModalOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-[#C9A45C] hover:bg-[#d8b56f] text-[#1F2A44] font-semibold text-xs transition-all shadow flex items-center gap-1.5 cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Kartu Refleksi Medsos</span>
                  </button>
                  <button
                    onClick={() => generateReflectionPdf(calcResult)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all border border-white/20 flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-[#C9A45C]" />
                    <span>Unduh PDF</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* VIEW: KATALOG LAYANAN (17 LAYANAN DENGAN TANGGA NILAI) */}
      {activeTab === 'layanan' && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#C2673F] font-bold">
              Katalog Layanan & Pembacaan
            </span>
            <h1 className="font-serif-cormorant text-4xl sm:text-5xl font-bold text-[#1F2A44]">
              Pilih Pendampingan Peta Dirimu
            </h1>
            <p className="text-xs sm:text-sm text-[#1F2A44]/75">
              Dari laporan terjangkau Rp49 rb hingga pendampingan holistik tatap muka via Zoom.
            </p>
          </div>

          {/* Mulai Dari Kebutuhanmu Quick Selector (Per Master Plan Specs) */}
          <div className="bg-[#1F2A44] text-[#F4EDE1] rounded-2xl p-4 sm:p-5 border border-[#C9A45C]/30 space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#C9A45C]" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Bingung mulai dari mana? Pilih berdasarkan kebutuhanmu:
                </span>
              </div>
              <span className="text-[11px] text-[#C9A45C]">Panduan Pemula</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <button
                onClick={() => setServiceCategory('seri-angka')}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  serviceCategory === 'seri-angka' ? 'bg-[#C2673F] text-white border-white/20' : 'bg-white/5 border-white/10 hover:bg-white/10 text-[#F4EDE1]'
                }`}
              >
                <div className="text-xs font-bold">🧭 Kenali Arah Diri</div>
                <div className="text-[10px] text-white/70">Cukup tanggal lahir</div>
              </button>

              <button
                onClick={() => setServiceCategory('seri-langit')}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  serviceCategory === 'seri-langit' ? 'bg-[#C2673F] text-white border-white/20' : 'bg-white/5 border-white/10 hover:bg-white/10 text-[#F4EDE1]'
                }`}
              >
                <div className="text-xs font-bold">🌌 Langit & Jam Lahir</div>
                <div className="text-[10px] text-white/70">Astrologi & BaZi</div>
              </button>

              <button
                onClick={() => setServiceCategory('seri-relasi')}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  serviceCategory === 'seri-relasi' ? 'bg-[#C2673F] text-white border-white/20' : 'bg-white/5 border-white/10 hover:bg-white/10 text-[#F4EDE1]'
                }`}
              >
                <div className="text-xs font-bold">💖 Pasangan Berdua</div>
                <div className="text-[10px] text-white/70">Kecocokan & relasi</div>
              </button>

              <button
                onClick={() => setServiceCategory('paket')}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  serviceCategory === 'paket' ? 'bg-[#C2673F] text-white border-white/20' : 'bg-white/5 border-white/10 hover:bg-white/10 text-[#F4EDE1]'
                }`}
              >
                <div className="text-xs font-bold">👑 Laporan Lengkap</div>
                <div className="text-[10px] text-white/70">Sintesis & Sesi Temu</div>
              </button>

              <button
                onClick={() => setActiveTab('kado')}
                className="col-span-2 sm:col-span-1 p-2.5 rounded-xl border border-[#C9A45C]/40 bg-[#C9A45C]/15 hover:bg-[#C9A45C]/25 text-[#F4EDE1] text-left transition-all cursor-pointer"
              >
                <div className="text-xs font-bold text-[#C9A45C]">🎁 Beri Hadiah</div>
                <div className="text-[10px] text-white/70">Kado Lintang personal</div>
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'Semua Layanan (12)' },
              { id: 'seri-angka', label: 'Seri Angka (Tanggal Lahir Saja)' },
              { id: 'seri-langit', label: 'Seri Langit (Butuh Jam Lahir)' },
              { id: 'seri-relasi', label: 'Seri Relasi (Data 2 Orang)' },
              { id: 'paket', label: 'Paket & Pendampingan' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setServiceCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  serviceCategory === cat.id
                    ? 'bg-[#1F2A44] text-[#F4EDE1] shadow'
                    : 'bg-white text-[#1F2A44] hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Services Grid with WCAG AA High-Contrast Prices */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const isEntryDoor = service.id === 'sekilas-lintang' || service.id === 'kode-diri';
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-3xl p-6 border border-[#1F2A44]/10 hover:border-[#C9A45C] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between space-y-4 relative"
                >
                  {isEntryDoor && (
                    <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-[#8A9A7B] text-white text-[10px] font-bold uppercase tracking-wider shadow">
                      ★ Mulai Dari Sini
                    </div>
                  )}

                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h3 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
                          {service.name}
                        </h3>
                        <div className="text-[11px] uppercase tracking-wider text-[#C2673F] font-semibold">
                          {service.subtitle}
                        </div>
                      </div>
                      <div className="p-1 rounded-xl bg-[#1F2A44] shrink-0">
                        <LoShuCanvas
                          activeNodes={service.loShuActiveNodes}
                          lines={service.loShuLines}
                          size={38}
                        />
                      </div>
                    </div>

                    <p className="text-xs text-[#1F2A44]/80 leading-relaxed mb-3">
                      {service.description}
                    </p>

                    <div className="p-2.5 rounded-xl bg-[#F4EDE1]/60 text-[11px] text-[#1F2A44] mb-3">
                      <strong>Data yang dibutuhkan:</strong> {service.dataRequired}
                    </div>

                    {service.features && (
                      <div className="space-y-1 text-xs text-[#1F2A44]/75">
                        {service.features.map((f, idxFeat) => (
                          <div key={idxFeat} className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#8A9A7B] shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="font-serif-cormorant text-xl font-bold text-[#1F2A44]">
                      {service.price}
                    </div>
                    <button
                      onClick={() => handleStartBooking(service)}
                      className="px-4 py-2 rounded-xl bg-[#A8512C] hover:bg-[#924221] text-white text-xs font-semibold shadow transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <span>Pilih Layanan</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* VIEW: DUA LINTANG (PASANGAN) */}
      {activeTab === 'dua-lintang' && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <DuaLintangVisualizer onOrderService={(service) => handleStartBooking(service)} />
        </section>
      )}

      {/* VIEW: KADO LINTANG */}
      {activeTab === 'kado' && (
        <KadoLintangSection
          onOrderGift={(service) => handleStartBooking(service || SERVICES[0], true)}
          onExploreServices={() => setActiveTab('layanan')}
        />
      )}

      {/* VIEW: JURNAL EDUKASI */}
      {activeTab === 'jurnal' && (
        <JurnalSection
          onGoToCalculator={() => setActiveTab('kalkulator')}
          onExploreServices={() => setActiveTab('layanan')}
        />
      )}

      {/* VIEW: TENTANG & MADAM SHARA */}
      {activeTab === 'tentang' && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#C2673F] font-bold">
              Filosofi & Pendiri
            </span>
            <h1 className="font-serif-cormorant text-4xl sm:text-5xl font-bold text-[#1F2A44]">
              Tentang Lintang · Studio Peta Diri
            </h1>
            <p className="text-xs sm:text-sm text-[#1F2A44]/75">
              “Lintang” berarti bintang dalam bahasa Jawa. Kami hadir sebagai teman refleksi yang cerdas, bukan peramal yang menentukan nasib.
            </p>
          </div>

          {/* Madam Shara Founder Section */}
          <div className="bg-[#1F2A44] text-[#F4EDE1] rounded-3xl p-6 sm:p-10 border border-[#C9A45C]/40 shadow-xl flex flex-col md:flex-row items-center gap-8">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#172136] border-2 border-[#C9A45C] flex items-center justify-center shrink-0 shadow-lg text-center p-3">
              <div className="space-y-1">
                <div className="text-xs font-serif-cormorant text-[#C9A45C] uppercase tracking-widest">Pendiri</div>
                <div className="font-serif-cormorant text-xl font-bold text-white">Madam Shara</div>
                <div className="text-[10px] text-[#8A9A7B]">Pembaca Peta</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#C9A45C]/20 text-[#C9A45C] text-[11px] font-bold uppercase tracking-wider">
                Wajah & Penyusun Utama
              </div>
              <h2 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-white">
                Disusun & Ditinjau dengan Ketelitian Manual
              </h2>
              <p className="text-xs text-[#F4EDE1]/85 leading-relaxed">
                Madam Shara adalah praktisi pemetaan diri berbasis numerologi, astrologi natal, dan sistem Timur. Lintang hadir berdampingan dengan metode refleksi MIRROR™, dengan fokus khusus pada laporan komprehensif data momen kelahiran. Setiap laporan dikerjakan secara cermat tanpa automasi dangkal, memastikan pembaca merasa lebih paham dan berdaya.
              </p>
            </div>
          </div>

          {/* 5 Core Values */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#1F2A44]/10 shadow-sm space-y-6">
            <h2 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
              Lima Nilai Integritas Lintang
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-gray-200 space-y-1">
                <div className="font-serif-cormorant text-lg font-bold text-[#1F2A44]">1. Jujur</div>
                <div className="text-[11px] text-[#C2673F] font-semibold italic">“Bukan ramalan, tapi peta.”</div>
                <p className="text-xs text-[#1F2A44]/80">Tidak menjanjikan jodoh atau hasil mutlak; batasan setiap sistem dijelaskan secara transparan kepada pemesan.</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 space-y-1">
                <div className="font-serif-cormorant text-lg font-bold text-[#1F2A44]">2. Hangat</div>
                <div className="text-[11px] text-[#8A9A7B] font-semibold italic">“Seperti kakak yang paham astrologi.”</div>
                <p className="text-xs text-[#1F2A44]/80">Bahasa empatik, tidak menghakimi, dan tidak menakut-nakuti dengan istilah tabu atau tahun sial.</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 space-y-1">
                <div className="font-serif-cormorant text-lg font-bold text-[#1F2A44]">3. Membumi</div>
                <div className="text-[11px] text-[#C9A45C] font-semibold italic">“Rekomendasi yang bisa dicoba minggu ini.”</div>
                <p className="text-xs text-[#1F2A44]/80">Setiap laporan ditutup dengan langkah aksi praktis yang relevan untuk karier, finansial, dan relasi.</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 space-y-1">
                <div className="font-serif-cormorant text-lg font-bold text-[#1F2A44]">4. Rapi</div>
                <div className="text-[11px] text-[#1F2A44] font-semibold italic">“Perhitungan teliti, tata letak bersih.”</div>
                <p className="text-xs text-[#1F2A44]/80">Perhitungan diperiksa ulang silang sebelum ditandatangani dan dikirim ke pemesan.</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 space-y-1 sm:col-span-2">
                <div className="font-serif-cormorant text-lg font-bold text-[#1F2A44]">5. Menjaga Privasi</div>
                <div className="text-[11px] text-[#8A9A7B] font-semibold italic">“Kepatuhan penuh pada UU No. 27/2022 PDP.”</div>
                <p className="text-xs text-[#1F2A44]/80">Data lahirmu hanya dipakai untuk laporan dan dapat kamu minta hapus kapan pun tanpa syarat rumit.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SHAREABLE REFLECTION CARD MODAL */}
      <ReflectionCardModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        petaDiri={calcResult}
      />

      {/* LEGAL MODAL */}
      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        initialDoc={legalModalDoc}
      />

      {/* FLOATING CONTEXTUAL WHATSAPP */}
      <FloatingWhatsApp
        activeTab={activeTab}
        selectedServiceName={selectedService?.name}
      />

      {/* 3-STEP DYNAMIC CHECKOUT MODAL */}
      {selectedService && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedService(null);
              setBookingStep(1);
            }
          }}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-xl w-full border border-[#C9A45C]/40 shadow-2xl relative my-4 sm:my-8 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Modal Header Bar with Single Close Button */}
            <div className="flex items-start justify-between border-b border-gray-100 pb-3 gap-3 mb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#C2673F] tracking-widest block">
                  Formulir Pemesanan Layanan · Langkah {bookingStep} dari 3
                </span>
                <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#1F2A44] leading-tight">
                  {selectedService.name}
                </h3>
                <div className="text-xs text-[#1F2A44] font-semibold">{selectedService.subtitle} · {selectedService.price}</div>
              </div>

              <button
                onClick={() => {
                  setSelectedService(null);
                  setBookingStep(1);
                }}
                className="p-1.5 rounded-xl bg-gray-100 hover:bg-rose-50 text-gray-700 hover:text-rose-600 transition-colors shrink-0 border border-gray-200 cursor-pointer"
                title="Tutup (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* STEP 1: FORMULIR DATA LAHIR DINAMIS */}
            {bookingStep === 1 && (
              <div className="space-y-4">
                <p className="text-xs text-[#1F2A44]/80">{selectedService.description}</p>

                <div className="space-y-3">
                  <div className="text-xs font-bold text-[#1F2A44] uppercase">1. Data Pemesan Utama:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Nama Lengkap (sesuai akta)"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      className="p-2.5 rounded-xl border border-gray-300 text-xs outline-none focus:ring-1 focus:ring-[#C2673F]"
                      required
                    />
                    <input
                      type="date"
                      value={bookingForm.birthDate}
                      onChange={(e) => setBookingForm({ ...bookingForm, birthDate: e.target.value })}
                      className="p-2.5 rounded-xl border border-gray-300 text-xs outline-none focus:ring-1 focus:ring-[#C2673F]"
                      required
                    />
                  </div>

                  {/* Seri Langit fields: Jam Lahir & Kota */}
                  {(selectedService.category === 'seri-langit' || selectedService.id === 'lintang-utuh') && (
                    <div className="space-y-2 pt-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <input
                            type="time"
                            disabled={bookingForm.unknownTime}
                            value={bookingForm.birthTime}
                            onChange={(e) => setBookingForm({ ...bookingForm, birthTime: e.target.value })}
                            className={`w-full p-2.5 rounded-xl border text-xs outline-none ${
                              bookingForm.unknownTime ? 'bg-gray-100 text-gray-400 border-gray-200' : 'border-gray-300 focus:ring-1 focus:ring-[#C2673F]'
                            }`}
                            placeholder="Jam Lahir (WIB/WITA/WIT)"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Kota Lahir (mis. Bandung)"
                            value={bookingForm.birthCity}
                            onChange={(e) => setBookingForm({ ...bookingForm, birthCity: e.target.value })}
                            className="w-full p-2.5 rounded-xl border border-gray-300 text-xs outline-none focus:ring-1 focus:ring-[#C2673F]"
                          />
                        </div>
                      </div>

                      {/* Unknown Birth Time Checkbox & Disclosure */}
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#1F2A44]">
                          <input
                            type="checkbox"
                            checked={bookingForm.unknownTime}
                            onChange={(e) => setBookingForm({ ...bookingForm, unknownTime: e.target.checked })}
                          />
                          <span>Jam lahir tidak diketahui?</span>
                        </label>
                        {bookingForm.unknownTime && (
                          <div className="space-y-1.5 text-[11px] text-amber-900 leading-relaxed border-t border-amber-200/60 pt-1.5">
                            <p>
                              <strong>Batasan Laporan:</strong> Karena jam lahir tidak ada, laporan akan disusun tanpa posisi Rising Sign / 12 Rumah Astrologi dan tanpa Pilar Jam BaZi. Fokus tetap mendalam pada zodiak utama dan pilar Tahun, Bulan, serta Hari.
                            </p>
                            <label className="flex items-center gap-2 cursor-pointer pt-1 font-medium">
                              <input
                                type="checkbox"
                                checked={bookingForm.unknownTimeAcknowledged}
                                onChange={(e) => setBookingForm({ ...bookingForm, unknownTimeAcknowledged: e.target.checked })}
                              />
                              <span>Saya memahami dan menyetujui batasan laporan ini.</span>
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Seri Relasi Data Pasangan */}
                  {selectedService.category === 'seri-relasi' && (
                    <div className="p-3.5 rounded-2xl bg-[#F4EDE1] space-y-2.5">
                      <div className="text-xs font-bold text-[#8A9A7B] uppercase">2. Data Orang Kedua (Pasangan/Partner):</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Nama Lengkap Pasangan"
                          value={bookingForm.partnerName}
                          onChange={(e) => setBookingForm({ ...bookingForm, partnerName: e.target.value })}
                          className="p-2.5 rounded-xl border border-gray-300 text-xs bg-white outline-none"
                        />
                        <input
                          type="date"
                          value={bookingForm.partnerDate}
                          onChange={(e) => setBookingForm({ ...bookingForm, partnerDate: e.target.value })}
                          className="p-2.5 rounded-xl border border-gray-300 text-xs bg-white outline-none"
                        />
                      </div>
                      <label className="flex items-center gap-2 text-xs text-[#1F2A44] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={bookingForm.partnerConsent}
                          onChange={(e) => setBookingForm({ ...bookingForm, partnerConsent: e.target.checked })}
                        />
                        <span className="text-[11px]">Saya menyatakan telah mendapatkan izin dari pihak kedua untuk menyerahkan data lahirnya.</span>
                      </label>
                    </div>
                  )}

                  {/* Optional Add-ons */}
                  <div className="pt-2 border-t border-gray-100 space-y-1.5">
                    <div className="text-xs font-bold text-[#1F2A44] uppercase">Add-on Opsional:</div>
                    <label className="flex items-center gap-2 text-xs text-[#1F2A44] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={bookingAddOns.kisiSembilan}
                        onChange={(e) => setBookingAddOns({ ...bookingAddOns, kisiSembilan: e.target.checked })}
                      />
                      <span>Tambah Kisi Sembilan (Lo Shu Grid) (+Rp49 rb)</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-[#1F2A44] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={bookingAddOns.jejakKarma}
                        onChange={(e) => setBookingAddOns({ ...bookingAddOns, jejakKarma: e.target.checked })}
                      />
                      <span>Tambah Jejak Karma (Karmic Lessons) (+Rp49 rb)</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-[#1F2A44] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={bookingAddOns.kadoLintang}
                        onChange={(e) => setBookingAddOns({ ...bookingAddOns, kadoLintang: e.target.checked })}
                      />
                      <span>Kado Lintang: Kemasan Hadiah Digital + Kartu Ucapan Personal (+Rp25 rb)</span>
                    </label>
                    {bookingAddOns.kadoLintang && (
                      <input
                        type="text"
                        placeholder="Tulis ucapan personal untuk kartu kado..."
                        value={bookingForm.giftNote}
                        onChange={(e) => setBookingForm({ ...bookingForm, giftNote: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-xs mt-1"
                      />
                    )}
                  </div>

                  {/* Dual Privacy Checkboxes (UU No. 27/2022 PDP) */}
                  <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 space-y-2 text-[11px] text-[#1F2A44]">
                    <div className="font-bold flex items-center gap-1.5 text-xs text-[#8A9A7B]">
                      <ShieldCheck className="w-4 h-4 text-[#8A9A7B]" />
                      <span>Kepatuhan Privasi Data (UU No. 27/2022 PDP)</span>
                    </div>
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={bookingForm.pdpConsent}
                        onChange={(e) => setBookingForm({ ...bookingForm, pdpConsent: e.target.checked })}
                        className="mt-0.5"
                      />
                      <span>
                        <strong>(Wajib)</strong> Saya menyetujui pemrosesan data momen kelahiran hanya untuk penyusunan laporan ini, dan data dapat saya minta hapus kapan pun.
                      </span>
                    </label>
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={bookingForm.promoConsent}
                        onChange={(e) => setBookingForm({ ...bookingForm, promoConsent: e.target.checked })}
                        className="mt-0.5"
                      />
                      <span>
                        <strong>(Opsional)</strong> Bersedia menerima pengingat pergantian Musim Diri dan edukasi reflektif via WhatsApp.
                      </span>
                    </label>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                  <div className="text-[11px] text-gray-500">
                    Jendela revisi data 24 jam tersedia.
                  </div>
                  <button
                    onClick={handleProceedToSummary}
                    className="px-6 py-2.5 rounded-xl bg-[#A8512C] hover:bg-[#924221] text-white text-xs font-semibold shadow transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Lanjut ke Ringkasan Data</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: RINGKASAN DATA & PILIH PEMBAYARAN */}
            {bookingStep === 2 && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#F4EDE1] border border-[#C9A45C]/30 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-[#1F2A44] border-b border-gray-200 pb-2">
                    <span>Ringkasan Data Sebelum Pembayaran</span>
                    <span className="font-mono text-[#C2673F]">{generatedOrderNumber}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-[10px] uppercase text-gray-500">Nama Pemesan:</div>
                      <div className="font-semibold text-[#1F2A44]">{bookingForm.name}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase text-gray-500">Tanggal Lahir:</div>
                      <div className="font-semibold text-[#C2673F]">
                        {formatDateToIndonesian(bookingForm.birthDate)}
                      </div>
                    </div>
                    {bookingForm.birthTime && !bookingForm.unknownTime && (
                      <div>
                        <div className="text-[10px] uppercase text-gray-500">Jam Lahir:</div>
                        <div className="font-semibold text-[#1F2A44]">{bookingForm.birthTime}</div>
                      </div>
                    )}
                    {bookingForm.birthCity && (
                      <div>
                        <div className="text-[10px] uppercase text-gray-500">Kota Lahir:</div>
                        <div className="font-semibold text-[#1F2A44]">{bookingForm.birthCity}</div>
                      </div>
                    )}
                  </div>

                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                    💡 <em>Pastikan ejaan nama dan format tanggal lahir di atas sudah benar. Jika ada kesalahan, tersedia jendela koreksi 24 jam setelah pesanan masuk.</em>
                  </div>
                </div>

                {/* Pilih Metode Pembayaran Lokal */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-[#1F2A44] uppercase">Pilih Metode Pembayaran Lokal:</div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'qris', label: 'QRIS', sub: 'Semua E-Wallet', icon: QrCode },
                      { id: 'va', label: 'Virtual Account', sub: 'BCA/Mandiri/BNI', icon: CreditCard },
                      { id: 'ewallet', label: 'E-Wallet', sub: 'GoPay/OVO/DANA', icon: Wallet },
                    ].map((p) => {
                      const Icon = p.icon;
                      const isSel = bookingForm.paymentMethod === p.id;
                      return (
                        <div
                          key={p.id}
                          onClick={() => setBookingForm({ ...bookingForm, paymentMethod: p.id as any })}
                          className={`p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                            isSel ? 'border-[#C2673F] bg-[#C2673F]/10 shadow-sm' : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <Icon className={`w-5 h-5 mx-auto mb-1 ${isSel ? 'text-[#C2673F]' : 'text-gray-500'}`} />
                          <div className="text-xs font-bold text-[#1F2A44]">{p.label}</div>
                          <div className="text-[10px] text-gray-500">{p.sub}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setBookingStep(1)}
                    className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 cursor-pointer"
                  >
                    Kembali
                  </button>
                  <button
                    onClick={handleConfirmAndSendOrder}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Konfirmasi & Buka WhatsApp</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: STATUS PESANAN SUKSES & ESTIMASI */}
            {bookingStep === 3 && (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <Check className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8A9A7B] font-mono">
                    Nomor Pesanan: {generatedOrderNumber}
                  </span>
                  <h3 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44] mt-1">
                    Pesanan Terkirim ke WhatsApp!
                  </h3>
                </div>
                <div className="p-4 rounded-2xl bg-[#F4EDE1] text-xs text-[#1F2A44]/80 max-w-sm mx-auto space-y-2 text-left">
                  <div className="flex items-center gap-1.5 text-[#1F2A44] font-semibold">
                    <Clock className="w-4 h-4 text-[#C9A45C]" />
                    <span>Estimasi Pengerjaan: 2–3 Hari Kerja</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Setiap laporan dikerjakan dan ditinjau secara manual oleh Madam Shara. Jika ada koreksi data lahir, silakan balas chat WhatsApp dalam kurun 24 jam pertama.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedService(null);
                    setBookingStep(1);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#1F2A44] text-white text-xs font-semibold shadow cursor-pointer"
                >
                  Selesai
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#1F2A44] text-[#F4EDE1] py-14 px-4 border-t border-[#C9A45C]/30 mt-16 text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="flex items-center gap-2">
              <LoShuCanvas activeNodes={[8, 5, 2, 9]} lines={[[8, 5], [5, 2], [5, 9]]} size={30} />
              <span className="font-serif-cormorant text-2xl font-bold text-white tracking-tight">lintang</span>
            </div>
            <span className="text-[9px] tracking-widest uppercase text-[#C9A45C]">Studio Peta Diri · oleh Madam Shara</span>
          </div>

          <p className="font-serif-fraunces text-base italic text-[#C9A45C]">
            “Bukan ramalan, tapi peta. Baca polamu, pilih langkahmu.”
          </p>

          <div className="text-xs text-[#F4EDE1]/70 max-w-md mx-auto leading-relaxed">
            Studio peta diri berbasis numerologi, astrologi natal, BaZi, Human Design, dan tarot. Layanan ditujukan untuk refleksi dan pemahaman potensi diri, bukan pengganti nasihat profesional medis, hukum, keuangan, atau psikologis.
          </div>

          {/* Legal Links Triggering Modal */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#F4EDE1]/80 pt-2 border-t border-white/10">
            <button
              onClick={() => openLegalModalWithDoc('disclaimer')}
              className="hover:text-[#C9A45C] transition-colors underline cursor-pointer"
            >
              Disclaimer Resmi
            </button>
            <button
              onClick={() => openLegalModalWithDoc('privasi')}
              className="hover:text-[#C9A45C] transition-colors underline cursor-pointer"
            >
              Kebijakan Privasi (UU PDP)
            </button>
            <button
              onClick={() => openLegalModalWithDoc('terms')}
              className="hover:text-[#C9A45C] transition-colors underline cursor-pointer"
            >
              Syarat & Ketentuan
            </button>
            <button
              onClick={() => openLegalModalWithDoc('refund')}
              className="hover:text-[#C9A45C] transition-colors underline cursor-pointer"
            >
              Revisi & Refund 24 Jam
            </button>
          </div>

          <div className="pt-2 text-xs font-mono text-[#C9A45C] flex flex-wrap justify-center gap-4">
            <span>Instagram: @lintang.petadiri</span>
            <span>Domain: lintangpetadiri.com</span>
            <span>Cloudflare Pages: lintang.pages.dev</span>
          </div>

          <div className="text-[10px] text-[#F4EDE1]/40 pt-2">
            © 2026 Lintang · Studio Peta Diri. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
