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
  MessageCircle,
  Share2,
  RotateCw,
  Gift,
  X,
  FileText,
  Menu
} from 'lucide-react';
import { LoShuCanvas } from './components/LoShuCanvas';
import { SERVICES, ServiceItem } from './data/blueprintData';
import { generatePetaDiri, FullPetaDiriResult } from './utils/numerology';
import { TarotCard3D } from './components/TarotCard3D';
import { OrbitWheel } from './components/OrbitWheel';
import { LoShuInteractiveGrid } from './components/LoShuInteractiveGrid';
import { DuaLintangVisualizer } from './components/DuaLintangVisualizer';
import { ReflectionCardModal } from './components/ReflectionCardModal';
import { generateReflectionPdf } from './utils/pdfGenerator';

export default function App() {
  const [activeTab, setActiveTab] = useState<'beranda' | 'kalkulator' | 'layanan' | 'dua-lintang' | 'tentang'>('beranda');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Share Card Modal State
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Booking Modal State
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [bookingAddOns, setBookingAddOns] = useState({ kisiSembilan: false, jejakKarma: false, kadoLintang: false });
  const [bookingForm, setBookingForm] = useState({ name: '', birthDate: '', birthTime: '', birthCity: '', partnerName: '', partnerDate: '', giftNote: '' });
  const [orderSent, setOrderSent] = useState(false);

  // Service Filter
  const [serviceCategory, setServiceCategory] = useState<string>('all');

  // Close booking modal on Escape key
  useEffect(() => {
    if (!selectedService) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedService(null);
        setOrderSent(false);
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

  const handleSendWhatsAppOrder = () => {
    if (!selectedService) return;
    let msg = `Halo Lintang · Studio Peta Diri! ✨\nSaya ingin memesan layanan:\n\n`;
    msg += `📌 *Layanan:* ${selectedService.name} (${selectedService.subtitle})\n`;
    msg += `💵 *Tarif:* ${selectedService.price}\n`;
    msg += `\n👤 *Data Pemesan:*\n• Nama: ${bookingForm.name || calcName}\n• Tanggal Lahir: ${bookingForm.birthDate || calcDate}\n`;
    if (bookingForm.birthTime) msg += `• Jam Lahir: ${bookingForm.birthTime}\n`;
    if (bookingForm.birthCity) msg += `• Kota Lahir: ${bookingForm.birthCity}\n`;

    if (selectedService.category === 'seri-relasi' && bookingForm.partnerName) {
      msg += `\n👥 *Data Pasangan:*\n• Nama: ${bookingForm.partnerName}\n• Tanggal Lahir: ${bookingForm.partnerDate}\n`;
    }

    const addOns: string[] = [];
    if (bookingAddOns.kisiSembilan) addOns.push('Kisi Sembilan (+Rp49rb)');
    if (bookingAddOns.jejakKarma) addOns.push('Jejak Karma (+Rp49rb)');
    if (bookingAddOns.kadoLintang) addOns.push(`Kado Lintang (+Rp25rb) - "${bookingForm.giftNote || 'Selamat bertumbuh'}"`);

    if (addOns.length > 0) {
      msg += `\n🎁 *Add-on:* ${addOns.join(', ')}\n`;
    }

    msg += `\nMohon informasi ketersediaan slot pengerjaan. Terima kasih! 🌿`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
    setOrderSent(true);
  };

  return (
    <div className="min-h-screen bg-[#F4EDE1] text-[#1F2A44] font-sans-dm selection:bg-[#C2673F]/20">
      {/* STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-[#1F2A44]/95 backdrop-blur-md border-b border-[#C9A45C]/20 text-[#F4EDE1]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div
            onClick={() => setActiveTab('beranda')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#172136] border border-[#C9A45C]/40 flex items-center justify-center p-1 group-hover:border-[#C9A45C] transition-all shadow-md">
              <LoShuCanvas activeNodes={[8, 5, 2, 9]} lines={[[8, 5], [5, 2], [5, 9]]} size={28} />
            </div>
            <div>
              <span className="font-serif-cormorant text-2xl font-bold tracking-tight text-white leading-none">
                lintang
              </span>
              <span className="text-[9px] tracking-[0.22em] uppercase text-[#C9A45C] font-semibold block mt-0.5">
                Studio Peta Diri
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1.5 text-xs font-medium">
            <button
              onClick={() => setActiveTab('beranda')}
              className={`px-3 py-2 rounded-lg transition-all ${
                activeTab === 'beranda' ? 'bg-[#C2673F] text-white shadow-sm' : 'text-[#F4EDE1]/85 hover:text-white hover:bg-white/5'
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => setActiveTab('kalkulator')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'kalkulator' ? 'bg-[#C2673F] text-white shadow-sm' : 'text-[#F4EDE1]/85 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>Peta Diri Interaktif</span>
            </button>
            <button
              onClick={() => setActiveTab('layanan')}
              className={`px-3 py-2 rounded-lg transition-all ${
                activeTab === 'layanan' ? 'bg-[#C2673F] text-white shadow-sm' : 'text-[#F4EDE1]/85 hover:text-white hover:bg-white/5'
              }`}
            >
              Layanan & Pembacaan
            </button>
            <button
              onClick={() => setActiveTab('dua-lintang')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1 ${
                activeTab === 'dua-lintang' ? 'bg-[#C2673F] text-white shadow-sm' : 'text-[#F4EDE1]/85 hover:text-white hover:bg-white/5'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>Dua Lintang (Pasangan)</span>
            </button>
            <button
              onClick={() => setActiveTab('tentang')}
              className={`px-3 py-2 rounded-lg transition-all ${
                activeTab === 'tentang' ? 'bg-[#C2673F] text-white shadow-sm' : 'text-[#F4EDE1]/85 hover:text-white hover:bg-white/5'
              }`}
            >
              Filosofi Kami
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
              <span className="hidden sm:inline">Cek Peta Diri</span>
              <span className="sm:hidden">Peta Diri</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#C9A45C]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#182238] border-b border-[#C9A45C]/30 px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2 duration-200 shadow-2xl">
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#C9A45C] px-2 mb-1">
              Navigasi Halaman
            </div>
            <div className="grid grid-cols-1 gap-1">
              <button
                onClick={() => { setActiveTab('beranda'); setMobileMenuOpen(false); }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2.5 transition-all ${
                  activeTab === 'beranda' ? 'bg-[#C2673F] text-white shadow-sm' : 'text-[#F4EDE1]/85 hover:bg-white/10'
                }`}
              >
                <span>Beranda</span>
              </button>
              <button
                onClick={() => { setActiveTab('kalkulator'); setMobileMenuOpen(false); }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2.5 transition-all ${
                  activeTab === 'kalkulator' ? 'bg-[#C2673F] text-white shadow-sm' : 'text-[#F4EDE1]/85 hover:bg-white/10'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>Peta Diri Interaktif (Kalkulator)</span>
              </button>
              <button
                onClick={() => { setActiveTab('layanan'); setMobileMenuOpen(false); }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2.5 transition-all ${
                  activeTab === 'layanan' ? 'bg-[#C2673F] text-white shadow-sm' : 'text-[#F4EDE1]/85 hover:bg-white/10'
                }`}
              >
                <span>Katalog Layanan & Pembacaan</span>
              </button>
              <button
                onClick={() => { setActiveTab('dua-lintang'); setMobileMenuOpen(false); }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2.5 transition-all ${
                  activeTab === 'dua-lintang' ? 'bg-[#C2673F] text-white shadow-sm' : 'text-[#F4EDE1]/85 hover:bg-white/10'
                }`}
              >
                <Heart className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>Dua Lintang (Sinergi Pasangan)</span>
              </button>
              <button
                onClick={() => { setActiveTab('tentang'); setMobileMenuOpen(false); }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2.5 transition-all ${
                  activeTab === 'tentang' ? 'bg-[#C2673F] text-white shadow-sm' : 'text-[#F4EDE1]/85 hover:bg-white/10'
                }`}
              >
                <span>Filosofi & Etika Kami</span>
              </button>
            </div>

            {calcResult && (
              <div className="pt-2 border-t border-white/10 flex items-center gap-2">
                <button
                  onClick={() => { setIsShareModalOpen(true); setMobileMenuOpen(false); }}
                  className="flex-1 py-2 px-3 rounded-xl bg-white/10 text-white text-xs font-medium flex items-center justify-center gap-1.5 border border-white/15"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>Kartu Refleksi</span>
                </button>
                <button
                  onClick={() => { generateReflectionPdf(calcResult); setMobileMenuOpen(false); }}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#C9A45C]/20 text-[#C9A45C] text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#C9A45C]/40"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Unduh PDF</span>
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* VIEW: BERANDA */}
      {activeTab === 'beranda' && (
        <div>
          {/* HERO */}
          <section className="bg-[#1F2A44] text-[#F4EDE1] pt-16 pb-24 px-4 text-center relative overflow-hidden">
            <div className="absolute top-8 right-8 sm:right-24 w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-[#F4EDE1] shadow-[0_0_50px_rgba(244,237,225,0.3)] flex items-center justify-center pointer-events-none">
              <div className="w-18 h-18 sm:w-24 sm:h-24 rounded-full bg-[#1F2A44] -translate-x-3 -translate-y-1" />
            </div>
            <div className="absolute top-12 left-1/4 w-1.5 h-1.5 rounded-full bg-[#C9A45C] animate-twinkle pointer-events-none" />
            <div className="absolute top-36 left-12 w-2 h-2 rounded-full bg-white/70 animate-twinkle-slow pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C9A45C]/40 text-[#C9A45C] text-xs font-medium tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Studio Peta Diri · Bukan Ramalan, Tapi Cermin</span>
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
                  Kenali ritme hidup, potensi tersembunyi, dan arah karier lewat perpaduan cerdas
                  <strong> Numerologi, Astrologi, BaZi, Human Design, dan Tarot</strong>.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('kalkulator')}
                  className="px-6 py-3.5 rounded-xl bg-[#C9A45C] hover:bg-[#d8b56f] text-[#1F2A44] font-semibold text-sm shadow-lg transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Hitung Peta Dirimu Sekarang (Gratis)</span>
                </button>
                <button
                  onClick={() => setActiveTab('layanan')}
                  className="px-6 py-3.5 rounded-xl bg-[#C2673F] hover:bg-[#d67246] text-white font-semibold text-sm shadow-lg transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                >
                  <span>Lihat Pilihan Laporan & Konsultasi</span>
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
                  <span>Data Lahir Dijamin Privasi</span>
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
          <motion.section
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-12"
          >
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-[#C2673F] font-bold">
                Mengapa Memilih Lintang?
              </span>
              <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#1F2A44]">
                Bukan ramalan masa depan, melainkan cermin refleksi diri.
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
                  desc: 'Menyatukan kebijaksanaan Barat (Numerologi Pythagoras, Astrologi Natal, Tarot) dan Timur (BaZi 4 Pilar, Lo Shu Grid, I Ching) ke dalam narasi bahasa Indonesia yang mudah dimengerti.',
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
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
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
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* DUA LINTANG QUICK PROMO */}
          <motion.section
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-6xl mx-auto px-4 sm:px-6 py-8"
          >
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
                <button
                  onClick={() => setActiveTab('dua-lintang')}
                  className="px-5 py-2.5 rounded-xl bg-[#C2673F] hover:bg-[#d67246] text-white text-xs font-semibold shadow transition-all flex items-center gap-1.5"
                >
                  <span>Coba Simulator Kecocokan Pasangan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
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
          </motion.section>
        </div>
      )}

      {/* VIEW: KALKULATOR PETA DIRI INTERAKTIF LENGKAP */}
      {activeTab === 'kalkulator' && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-2 max-w-xl mx-auto"
          >
            <span className="text-xs uppercase tracking-widest text-[#C2673F] font-bold">
              Kalkulator Peta Diri Interaktif
            </span>
            <h1 className="font-serif-cormorant text-4xl sm:text-5xl font-bold text-[#1F2A44]">
              Hitung Pola & Rasi Kelahiranmu
            </h1>
            <p className="text-xs sm:text-sm text-[#1F2A44]/75">
              Masukkan tanggal kelahiranmu untuk melihat Life Path Pythagoras, roda siklus 9 tahun yang bisa kamu putar, kartu tarot lahir yang bisa dibalik secara 3D, dan kisi rasi Lo Shu 3×3.
            </p>
          </motion.div>

          {/* Form Input */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1F2A44]/10 shadow-sm"
          >
            <form onSubmit={handleRunCalculator} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-[#1F2A44] mb-1">Nama Panggilan</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={calcName}
                    onChange={(e) => setCalcName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-1 focus:ring-[#C2673F] outline-none"
                    placeholder="Nama kamu"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F2A44] mb-1">
                  Tanggal Lahir <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    required
                    value={calcDate}
                    onChange={(e) => setCalcDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-1 focus:ring-[#C2673F] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F2A44] mb-1">Jam Lahir (opsional)</label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="time"
                    value={calcTime}
                    onChange={(e) => setCalcTime(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-1 focus:ring-[#C2673F] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F2A44] mb-1">Kota Lahir (opsional)</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={calcCity}
                    onChange={(e) => setCalcCity(e.target.value)}
                    placeholder="Contoh: Bandung"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-1 focus:ring-[#C2673F] outline-none"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 lg:col-span-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-xs text-gray-500">
                  🔒 Perhitungan langsung aman di browsermu & tidak disimpan tanpa izin.
                </span>
                <button
                  type="submit"
                  disabled={isCalculating}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#C2673F] hover:bg-[#d67246] disabled:opacity-85 disabled:cursor-wait text-white text-xs font-semibold shadow transition-all flex items-center justify-center gap-2"
                >
                  {isCalculating ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Menyelaraskan Orbit ({calcProgress}%)...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Perbarui Peta Refleksi</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* CELESTIAL ORBIT PROGRESS CIRCLE LOADING STATE */}
            {isCalculating ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="mt-8 pt-8 border-t border-gray-100 flex flex-col items-center justify-center py-12 px-4 rounded-3xl bg-[#1F2A44] text-[#F4EDE1] border-2 border-[#C9A45C]/40 shadow-2xl relative overflow-hidden text-center space-y-6"
              >
                {/* Ambient starry backdrop particles */}
                <div className="absolute top-4 left-8 w-1.5 h-1.5 rounded-full bg-[#C9A45C] animate-twinkle pointer-events-none" />
                <div className="absolute bottom-6 right-10 w-1 h-1 rounded-full bg-white/80 animate-twinkle-slow pointer-events-none" />
                <div className="absolute top-1/2 left-6 w-1 h-1 rounded-full bg-white/50 animate-twinkle pointer-events-none" />
                <div className="absolute top-8 right-16 w-2 h-2 rounded-full bg-[#C2673F]/60 animate-twinkle-slow pointer-events-none" />

                {/* Center SVG Orbit Progress Circle */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center select-none">
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
                    <defs>
                      <linearGradient id="orbit-progress-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#C9A45C" />
                        <stop offset="50%" stopColor="#C2673F" />
                        <stop offset="100%" stopColor="#F4EDE1" />
                      </linearGradient>
                      <filter id="orbit-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    {/* Outer Dashed Orbit Background Track */}
                    <circle
                      cx="80"
                      cy="80"
                      r="66"
                      fill="none"
                      stroke="rgba(201, 164, 92, 0.25)"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />

                    {/* Inner Celestial Core Guide Ring */}
                    <circle
                      cx="80"
                      cy="80"
                      r="52"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.08)"
                      strokeWidth="1"
                    />

                    {/* Circular Orbit Progress Arc */}
                    <circle
                      cx="80"
                      cy="80"
                      r="60"
                      fill="none"
                      stroke="url(#orbit-progress-grad)"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray="377"
                      strokeDashoffset={377 - (377 * Math.min(calcProgress, 100)) / 100}
                      className="transition-all duration-300 ease-out"
                      filter="url(#orbit-glow-filter)"
                    />

                    {/* Orbiting Satellite Star Node */}
                    {(() => {
                      const angleRad = ((calcProgress / 100) * 360 * Math.PI) / 180;
                      const nodeX = 80 + 60 * Math.cos(angleRad);
                      const nodeY = 80 + 60 * Math.sin(angleRad);
                      return (
                        <g className="transition-all duration-300 ease-out">
                          <circle
                            cx={nodeX}
                            cy={nodeY}
                            r="6.5"
                            fill="#C2673F"
                            stroke="#FFFFFF"
                            strokeWidth="2"
                          />
                          <circle
                            cx={nodeX}
                            cy={nodeY}
                            r="11"
                            fill="none"
                            stroke="#C9A45C"
                            strokeWidth="1"
                            opacity="0.8"
                          />
                        </g>
                      );
                    })()}
                  </svg>

                  {/* Center Core Information Floating Badge */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <div className="p-2 rounded-2xl bg-[#172136] border border-[#C9A45C]/40 shadow-inner mb-1 flex items-center justify-center">
                      <LoShuCanvas activeNodes={[8, 5, 2, 9]} lines={[[8, 5], [5, 2], [5, 9]]} size={32} />
                    </div>
                    <div className="font-serif-cormorant text-3xl font-bold text-white tracking-tight leading-none mt-1">
                      {calcProgress}%
                    </div>
                    <span className="text-[9px] uppercase tracking-widest text-[#C9A45C] font-semibold mt-0.5">
                      Orbit Selaras
                    </span>
                  </div>
                </div>

                {/* Stage Narrative and Status Text */}
                <div className="space-y-2 max-w-md mx-auto">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C9A45C]/30 text-xs font-semibold text-[#C9A45C]">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
                    <span>
                      {calcProgress < 40
                        ? 'Menghitung Life Path Pythagoras...'
                        : calcProgress < 75
                        ? 'Memutar Roda Musim Diri 9 Tahun...'
                        : calcProgress < 95
                        ? 'Menyusun Kartu Lahir & Kisi Rasi...'
                        : 'Menyelesaikan Peta Refleksi...'}
                    </span>
                  </div>

                  <p className="text-xs text-[#F4EDE1]/80 leading-relaxed font-sans-dm">
                    Menyelaraskan waktu lahir <strong>{calcDate}</strong> untuk <strong>{calcName || 'Kamu'}</strong> ke dalam siklus semesta.
                  </p>

                  {/* 4 Orbit Steps Indicator */}
                  <div className="flex items-center justify-center gap-2 pt-1 text-[11px] font-mono">
                    <span className={calcProgress >= 25 ? 'text-[#C9A45C] font-bold' : 'text-white/40'}>1. Angka</span>
                    <span className="text-white/30">•</span>
                    <span className={calcProgress >= 50 ? 'text-[#C9A45C] font-bold' : 'text-white/40'}>2. Musim</span>
                    <span className="text-white/30">•</span>
                    <span className={calcProgress >= 75 ? 'text-[#C9A45C] font-bold' : 'text-white/40'}>3. Tarot</span>
                    <span className="text-white/30">•</span>
                    <span className={calcProgress >= 95 ? 'text-[#C2673F] font-bold' : 'text-white/40'}>4. Kisi Rasi</span>
                  </div>
                </div>
              </motion.div>
            ) : calcResult ? (
              <div className="mt-8 pt-8 border-t border-gray-100 space-y-8 animate-in fade-in duration-500">
                {/* Result Header */}
                <div className="p-6 rounded-2xl bg-[#1F2A44] text-[#F4EDE1] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] uppercase text-[#C9A45C] font-bold tracking-widest">
                      Peta Diri Lintang
                    </div>
                    <h2 className="font-serif-cormorant text-3xl font-bold text-white">
                      {calcResult.name} · {calcResult.birthDateStr}
                    </h2>
                    <p className="text-xs text-[#F4EDE1]/70">
                      {calcResult.birthCity ? `Lahir di ${calcResult.birthCity}` : ''}
                      {calcResult.birthTime ? ` pukul ${calcResult.birthTime}` : ''}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => generateReflectionPdf(calcResult)}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#F4EDE1] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border border-white/20 hover:border-[#C9A45C] cursor-pointer shadow-sm active:scale-98"
                      title="Unduh Lembar Refleksi Editorial 1 Halaman Siap Cetak (A4 PDF)"
                    >
                      <FileText className="w-4 h-4 text-[#C9A45C]" />
                      <span>Unduh Lembar PDF (A4)</span>
                    </button>
                    <button
                      onClick={() => setIsShareModalOpen(true)}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#C9A45C] hover:bg-[#d8b56f] text-[#1F2A44] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow cursor-pointer active:scale-98"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Buat & Unduh Kartu</span>
                    </button>
                  </div>
                </div>

                {/* 1. LIFE PATH SUMMARY & 3D TAROT CARD FLIP */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Column: Life Path Detailed Analysis */}
                  <div className="lg:col-span-6 p-6 rounded-3xl bg-[#F4EDE1]/60 border border-[#C9A45C]/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-[#C2673F]">
                        Numerologi Pythagoras
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-[#C2673F] text-white font-serif-cormorant text-2xl font-bold flex items-center justify-center shadow">
                        {calcResult.lifePath.number}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
                        Life Path {calcResult.lifePath.number}: {calcResult.lifePath.name}
                      </h3>
                      <p className="font-serif-fraunces text-xs italic text-[#1F2A44]/90 bg-white/80 p-3 rounded-xl border border-gray-100 leading-relaxed mt-2">
                        “{calcResult.lifePath.lintangReflection}”
                      </p>
                    </div>

                    <div className="text-xs text-[#1F2A44]/80 space-y-1.5 pt-2 border-t border-gray-200">
                      <div><strong>Kekuatan Alami:</strong> {calcResult.lifePath.strengths.join(', ')}</div>
                      <div><strong>Ruang Bertumbuh:</strong> {calcResult.lifePath.growthAreas.join(', ')}</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2">
                      <Compass className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <strong>Langkah Minggu Ini:</strong> {calcResult.lifePath.practicalWeeklyAction}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: 3D Luxury Tarot Card */}
                  <div className="lg:col-span-6">
                    <TarotCard3D initialCard={calcResult.tarotCard} />
                  </div>
                </div>

                {/* 2. RODA ORBIT SIKLUS 9 TAHUN INTERAKTIF */}
                <OrbitWheel
                  currentYearNum={calcResult.personalYear.personalYear}
                  selectedYear={selectedOrbitYear}
                  onSelectYear={(y) => setSelectedOrbitYear(y)}
                />

                {/* 3. KISI LO SHU 3X3 INTERAKTIF DENGAN EKSPLORASI BIDANG */}
                <LoShuInteractiveGrid
                  presentNumbers={calcResult.loShu.presentNumbers}
                  counts={calcResult.loShu.counts}
                />

                {/* PERSONALIZED UPSELL CALLOUT */}
                <div className="p-6 rounded-2xl bg-[#1F2A44] text-[#F4EDE1] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase text-[#C9A45C] font-bold">Rekomendasi Personal</div>
                    <h3 className="font-serif-cormorant text-2xl font-bold text-white">
                      Sebagai Life Path {calcResult.lifePath.number}, Kamu Paling Selaras Membaca:
                    </h3>
                    <p className="text-xs text-[#F4EDE1]/80 max-w-lg">
                      Laporan <strong>Kode Diri</strong> (Rp149 rb) atau <strong>Lintang Utuh</strong> yang mengkaji secara spesifik jam kelahiran dan astrologi natalmu.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const kodeDiri = SERVICES.find((s) => s.id === 'kode-diri');
                      if (kodeDiri) setSelectedService(kodeDiri);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#C2673F] hover:bg-[#d67246] text-white text-xs font-semibold shadow transition-all shrink-0"
                  >
                    Pesan Laporan Penuh
                  </button>
                </div>
              </div>
            ) : null}
          </motion.div>
        </section>
      )}

      {/* VIEW: KATALOG LAYANAN LINTANG */}
      {activeTab === 'layanan' && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-2 max-w-xl mx-auto"
          >
            <span className="text-xs uppercase tracking-widest text-[#C2673F] font-bold">
              Katalog Layanan & Pembacaan
            </span>
            <h1 className="font-serif-cormorant text-4xl sm:text-5xl font-bold text-[#1F2A44]">
              Pilih Pendampingan Peta Dirimu
            </h1>
            <p className="text-xs sm:text-sm text-[#1F2A44]/75">
              Dari laporan tertulis PDF berdesain elegan hingga sesi konsultasi tatap muka 60 menit via Zoom.
            </p>
          </motion.div>

          {/* Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-2"
          >
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
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  serviceCategory === cat.id
                    ? 'bg-[#1F2A44] text-[#F4EDE1] shadow'
                    : 'bg-white text-[#1F2A44] hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Services Grid with Smart Matcher & Scroll Animations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, idx) => {
              const isMatch = calcResult && (
                (calcResult.lifePath.number === 7 && service.id === 'peta-bintang') ||
                (calcResult.lifePath.number === 1 && service.id === 'kode-diri') ||
                (calcResult.lifePath.number === 8 && service.id === 'empat-pilar') ||
                (calcResult.lifePath.number === 2 && service.id === 'dua-lintang') ||
                service.id === 'lintang-utuh'
              );

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: (idx % 3) * 0.08 }}
                  className="bg-white rounded-3xl p-6 border border-[#1F2A44]/10 hover:border-[#C9A45C] transition-all duration-300 ease-out transform hover:scale-105 shadow-sm hover:shadow-xl hover:shadow-[#1F2A44]/10 flex flex-col justify-between space-y-4 relative hover:z-10"
                >
                  {isMatch && (
                    <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#C2673F] text-white text-[10px] font-bold uppercase tracking-wider shadow">
                      ★ Sangat Selaras Untukmu
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
                    <div className="font-serif-cormorant text-xl font-bold text-[#C2673F]">
                      {service.price}
                    </div>
                    <button
                      onClick={() => setSelectedService(service)}
                      className="px-4 py-2 rounded-xl bg-[#C2673F] hover:bg-[#d67246] text-white text-xs font-semibold shadow transition-all flex items-center gap-1"
                    >
                      <span>Pilih Layanan</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* VIEW: DUA LINTANG COMPATIBILITY INTERACTIVE */}
      {activeTab === 'dua-lintang' && (
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto px-4 sm:px-6 py-12"
        >
          <DuaLintangVisualizer onOrderService={(service) => setSelectedService(service)} />
        </motion.section>
      )}

      {/* VIEW: TENTANG & FILOSOFI LINTANG */}
      {activeTab === 'tentang' && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-2 max-w-xl mx-auto"
          >
            <span className="text-xs uppercase tracking-widest text-[#C2673F] font-bold">
              Filosofi & Etika
            </span>
            <h1 className="font-serif-cormorant text-4xl sm:text-5xl font-bold text-[#1F2A44]">
              Tentang Lintang
            </h1>
            <p className="text-xs sm:text-sm text-[#1F2A44]/75">
              “Lintang” berarti bintang dalam bahasa Jawa. Kami hadir sebagai teman refleksi yang cerdas, bukan peramal yang menentukan nasib.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-[#1F2A44]/10 shadow-sm space-y-8"
          >
            <div className="space-y-4">
              <h2 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
                Misi & Visi Kami
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#F4EDE1] space-y-1">
                  <div className="text-xs font-bold uppercase text-[#C2673F]">Misi</div>
                  <p className="text-xs text-[#1F2A44] leading-relaxed">
                    Membantu orang Indonesia mengenal diri lewat bahasa angka dan bintang, lalu menerjemahkannya menjadi langkah nyata dalam karier, relasi, dan waktu hidup.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#1F2A44] text-[#F4EDE1] space-y-1">
                  <div className="text-xs font-bold uppercase text-[#C9A45C]">Visi</div>
                  <p className="text-xs text-[#F4EDE1]/90 leading-relaxed">
                    Menjadi studio peta diri berbahasa Indonesia yang paling dipercaya karena jujur, rapi, dan membumi.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h2 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
                Empat Nilai Utama Lintang
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-gray-200">
                  <div className="font-serif-cormorant text-lg font-bold text-[#1F2A44]">1. Jujur</div>
                  <p className="text-xs text-[#1F2A44]/80">Tidak menjanjikan jodoh atau hasil pasti; batasan setiap sistem dijelaskan secara transparan.</p>
                </div>
                <div className="p-3.5 rounded-xl border border-gray-200">
                  <div className="font-serif-cormorant text-lg font-bold text-[#1F2A44]">2. Hangat</div>
                  <p className="text-xs text-[#1F2A44]/80">Bahasa empatik seperti kakak sendiri, tidak menghakimi, dan tidak menakut-nakuti.</p>
                </div>
                <div className="p-3.5 rounded-xl border border-gray-200">
                  <div className="font-serif-cormorant text-lg font-bold text-[#1F2A44]">3. Membumi</div>
                  <p className="text-xs text-[#1F2A44]/80">Setiap laporan ditutup dengan rekomendasi praktis mingguan yang bisa langsung dicoba.</p>
                </div>
                <div className="p-3.5 rounded-xl border border-gray-200">
                  <div className="font-serif-cormorant text-lg font-bold text-[#1F2A44]">4. Menjaga Privasi</div>
                  <p className="text-xs text-[#1F2A44]/80">Data momen kelahiranmu hanya digunakan untuk penyusunan laporan dan dihapus setelahnya.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* SHAREABLE REFLECTION CARD MODAL */}
      <ReflectionCardModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        petaDiri={calcResult}
      />

      {/* BOOKING MODAL */}
      {selectedService && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedService(null);
              setOrderSent(false);
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
            {/* Prominent Floating Close Button */}
            <button
              onClick={() => {
                setSelectedService(null);
                setOrderSent(false);
              }}
              className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-2 sm:p-2.5 rounded-full bg-[#1F2A44] hover:bg-rose-600 text-white shadow-xl hover:shadow-2xl border-2 border-white transition-all transform hover:scale-110 active:scale-95 cursor-pointer z-20"
              title="Tutup (Esc)"
              aria-label="Tutup formulir"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </button>

            {!orderSent ? (
              <div className="space-y-5">
                {/* Dedicated Top Bar with Title & Non-overlapping Close Button */}
                <div className="flex items-start justify-between border-b border-gray-100 pb-3 gap-3 pr-10 sm:pr-14">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#C2673F] tracking-widest block">
                      Formulir Pemesanan Layanan
                    </span>
                    <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#1F2A44] leading-tight">
                      {selectedService.name}
                    </h3>
                    <div className="text-xs text-[#C9A45C] font-semibold">{selectedService.subtitle} · {selectedService.price}</div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedService(null);
                      setOrderSent(false);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-rose-50 text-gray-700 hover:text-rose-600 text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 border border-gray-200"
                    aria-label="Tutup formulir"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Tutup (Esc)</span>
                  </button>
                </div>

                <p className="text-xs text-[#1F2A44]/80">{selectedService.description}</p>

                <div className="space-y-3">
                  <div className="text-xs font-bold text-[#1F2A44] uppercase">Data Kelahiran Pemesan:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Nama Lengkap"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      className="p-2.5 rounded-xl border border-gray-300 text-xs outline-none focus:ring-1 focus:ring-[#C2673F]"
                    />
                    <input
                      type="date"
                      value={bookingForm.birthDate}
                      onChange={(e) => setBookingForm({ ...bookingForm, birthDate: e.target.value })}
                      className="p-2.5 rounded-xl border border-gray-300 text-xs outline-none focus:ring-1 focus:ring-[#C2673F]"
                    />
                    <input
                      type="time"
                      placeholder="Jam Lahir"
                      value={bookingForm.birthTime}
                      onChange={(e) => setBookingForm({ ...bookingForm, birthTime: e.target.value })}
                      className="p-2.5 rounded-xl border border-gray-300 text-xs outline-none focus:ring-1 focus:ring-[#C2673F]"
                    />
                    <input
                      type="text"
                      placeholder="Kota Lahir"
                      value={bookingForm.birthCity}
                      onChange={(e) => setBookingForm({ ...bookingForm, birthCity: e.target.value })}
                      className="p-2.5 rounded-xl border border-gray-300 text-xs outline-none focus:ring-1 focus:ring-[#C2673F]"
                    />
                  </div>

                  {selectedService.category === 'seri-relasi' && (
                    <div className="pt-2 space-y-2">
                      <div className="text-xs font-bold text-[#8A9A7B] uppercase">Data Orang Kedua (Pasangan):</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Nama Pasangan"
                          value={bookingForm.partnerName}
                          onChange={(e) => setBookingForm({ ...bookingForm, partnerName: e.target.value })}
                          className="p-2.5 rounded-xl border border-gray-300 text-xs outline-none focus:ring-1 focus:ring-[#8A9A7B]"
                        />
                        <input
                          type="date"
                          value={bookingForm.partnerDate}
                          onChange={(e) => setBookingForm({ ...bookingForm, partnerDate: e.target.value })}
                          className="p-2.5 rounded-xl border border-gray-300 text-xs outline-none focus:ring-1 focus:ring-[#8A9A7B]"
                        />
                      </div>
                    </div>
                  )}

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
                      <span>Kado Lintang: Kemasan Hadiah + Kartu Ucapan (+Rp25 rb)</span>
                    </label>
                    {bookingAddOns.kadoLintang && (
                      <input
                        type="text"
                        placeholder="Tulis pesan ucapan kado..."
                        value={bookingForm.giftNote}
                        onChange={(e) => setBookingForm({ ...bookingForm, giftNote: e.target.value })}
                        className="w-full p-2 rounded-xl border border-gray-300 text-xs mt-1"
                      />
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-gray-500">
                    🔒 Privasi data dijamin aman.
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => {
                        setSelectedService(null);
                        setOrderSent(false);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-rose-50 text-gray-700 hover:text-rose-600 text-xs font-semibold transition-all border border-gray-200 hover:border-rose-200 flex items-center justify-center gap-1.5"
                    >
                      <X className="w-4 h-4 text-rose-500" />
                      <span>Tutup</span>
                    </button>
                    <button
                      onClick={handleSendWhatsAppOrder}
                      className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow transition-all flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Lanjutkan Pesan via WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
                  Pesan Terbuka di WhatsApp!
                </h3>
                <p className="text-xs text-[#1F2A44]/80 max-w-sm mx-auto">
                  Draf pesan pemesanan telah disiapkan. Kirimkan pesan tersebut untuk mengonfirmasi ketersediaan slot pengerjaan bersama admin Lintang.
                </p>
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-5 py-2 rounded-xl bg-[#1F2A44] text-white text-xs font-semibold"
                >
                  Selesai
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.65 }}
        className="bg-[#1F2A44] text-[#F4EDE1] py-14 px-4 border-t border-[#C9A45C]/30 mt-16 text-center space-y-6"
      >
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2">
            <LoShuCanvas activeNodes={[8, 5, 2, 9]} lines={[[8, 5], [5, 2], [5, 9]]} size={28} />
            <span className="font-serif-cormorant text-2xl font-bold text-white tracking-tight">lintang</span>
          </div>
          <p className="font-serif-fraunces text-base italic text-[#C9A45C]">
            “Bukan ramalan, tapi cermin. Baca polamu, pilih langkahmu.”
          </p>
          <div className="text-xs text-[#F4EDE1]/70 max-w-md mx-auto leading-relaxed">
            Studio peta diri berbasis numerologi, astrologi natal, BaZi, Human Design, dan tarot. Layanan ditujukan untuk refleksi dan pemahaman diri, bukan pengganti nasihat profesional medis, hukum, keuangan, atau psikologis.
          </div>
          <div className="pt-4 text-xs font-mono text-[#C9A45C] flex justify-center gap-4">
            <span>Instagram: @lintang.petadiri</span>
            <span>Domain: lintangpetadiri.com</span>
          </div>
          <div className="text-[10px] text-[#F4EDE1]/40 pt-2">
            © 2026 Lintang · Studio Peta Diri. All rights reserved.
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
