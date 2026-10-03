import React, { useState } from 'react';
import { BookOpen, Sparkles, ArrowRight, Clock, Tag, X, Calendar, Share2 } from 'lucide-react';

export interface Article {
  id: string;
  title: string;
  category: string;
  readingTime: string;
  summary: string;
  content: string[];
  ctaText: string;
}

export const ARTICLES: Article[] = [
  {
    id: 'life-path-number',
    title: 'Apa itu Life Path Number? Membaca Garis Potensi Terbesar dari Tanggal Lahirmu',
    category: 'Numerologi',
    readingTime: '4 menit baca',
    summary: 'Angka Jalan Hidup (Life Path) bukan ramalan takdir mati, melainkan kompas arketipe kepribadian dan tema belajar terbesar yang kamu bawa sejak lahir.',
    content: [
      'Banyak orang mengira numerologi sama dengan meramal jodoh atau peruntungan harian. Di Lintang Studio, kami memandang angka Pythagoras sebagai notasi musik batin: pola ritmis yang menjelaskan bagaimana energimu bekerja secara alami.',
      'Life Path dihitung dengan mereduksi setiap elemen tanggal lahir (tanggal, bulan, tahun) menjadi satu digit, kecuali Angka Master (11, 22, dan 33). Angka ini menunjukkan lintasan belajar utama: arena hidup di mana kamu akan diuji paling banyak sekaligus memiliki potensi bertumbuh paling tinggi.',
      'Misalnya, seseorang dengan Life Path 1 sering kali merasa ditarik untuk menjadi pelopor dan belajar mandiri. Sementara Life Path 7 diajak menjadi pencari kebenaran, membutuhkan ruang hening dan perenungan mendalam sebelum mengambil keputusan.',
      'Mengetahui Life Path memberimu kejelasan: kamu tidak lagi memaksakan diri menjadi orang lain, melainkan fokus mengasah kekuatan orisinal yang sudah ada di dalam dirimu.'
    ],
    ctaText: 'Hitung Life Path Number-mu Sekarang di Kalkulator Gratis',
  },
  {
    id: 'musim-diri-siklus-9-tahun',
    title: 'Musim Diri & Siklus 9 Tahun: Mengetahui Kapan Harus Melangkah dan Kapan Merawat Diri',
    category: 'Siklus Waktu',
    readingTime: '5 menit baca',
    summary: 'Hidup memiliki musim seperti alam: ada tahun untuk menanam benih, merawat tunas, memanen hasil, hingga merontokkan daun tua.',
    content: [
      'Pernahkah kamu merasa suatu tahun terasa begitu padat dengan permulaan baru, sementara di tahun berikutnya kamu justru merasa lelah dan butuh jeda introspeksi? Itu bukan kegagalan motivasi—itu adalah pergantian Musim Diri.',
      'Dalam numerologi siklus, hidup kita berputar dalam ritme 9 tahunan (Personal Year 1 hingga 9). Tahun 1 adalah musim menanam inisiatif baru. Tahun 4 menuntut pembangunan fondasi dan kerja disiplin. Tahun 7 mengajak kontemplasi batin. Dan Tahun 9 adalah fase menuntaskan hal-hal yang sudah selesai agar kamu siap lahir kembali di siklus berikutnya.',
      'Ketika kamu memaksakan ekspansi besar di Tahun 9 (musim pelepasan), kamu akan merasa melawan arus. Sebaliknya, saat kamu menyelaraskan rencana karier dan bisnismu dengan musim yang sedang berlangsung, langkah hidupmu terasa jauh lebih ringan dan bertenaga.'
    ],
    ctaText: 'Cari Tahu Musim Diri Tahun Ini di Kalkulator Gratis',
  },
  {
    id: 'lo-shu-grid-kisi-sembilan',
    title: 'Lo Shu Grid 3×3: Rahasia Keseimbangan Elemen di Balik Tanggal Lahir',
    category: 'Sistem Timur',
    readingTime: '4 menit baca',
    summary: 'Berasal dari legenda kuno Sungai Luo di Tiongkok ribuan tahun lalu, kisi ajaib 3×3 ini memetakan persebaran energi pikiran, spiritual, dan fisik.',
    content: [
      'Kisi Lo Shu adalah bujur sangkar ajaib kuno di mana jumlah angka di setiap baris, kolom, dan diagonal selalu menghasilkan 15. Ketika tanggal lahirmu dipetakan ke dalam matriks ini, terbentuklah konstelasi unik yang memperlihatkan distribusi energimu.',
      'Angka yang muncul berulang menandakan energi dominan yang melimpah. Sementara kotak yang kosong (absen) bukan berarti kekurangan, melainkan ruang belajar atau keterampilan yang perlu kamu kembangkan secara sadar dalam perjalanan hidup ini.',
      'Garis panah yang terbentuk—seperti Panah Tekad (1-5-9) atau Panah Emosional (2-5-8)—menunjukkan bakat alami dalam berkomunikasi, berempati, atau memimpin secara strategis.'
    ],
    ctaText: 'Lihat Visualisasi Rasi Kisi Lo Shu Tanggal Lahirmu',
  },
  {
    id: 'peta-bintang-vs-ramalan-zodiak',
    title: 'Peta Bintang vs Ramalan Zodiak: Mengapa Peta Kelahiran Jauh Lebih Akurat?',
    category: 'Astrologi',
    readingTime: '5 menit baca',
    summary: 'Zodiak umum di majalah hanya membaca posisi Matahari (Sun Sign). Peta kelahiran yang sesungguhnya adalah potret langit 360 derajat saat napas pertamamu dihirup.',
    content: [
      '“Aku berzodiak Leo, tapi kenapa aku pendiam dan pemalu?” Pertanyaan ini sangat sering muncul. Jawabannya sederhana: ramalan zodiak populer menyederhanakan manusia ke dalam 12 kotak sempit, padahal manusia jauh lebih kaya dari itu.',
      'Peta Bintang (Natal Chart) memperhitungkan derajat presisi seluruh planet, 12 rumah astrologi (Bhavas), dan yang paling krusial: Rising Sign (Ascendant) yang ditentukan oleh jam kelahiran tepat di kota lahirmu.',
      'Bisa jadi Mataharimu di Leo (dorongan berkarya), namun Bulanmu di Pisces (dunia emosi yang sangat peka), dan Rising Sign-mu di Virgo (tampilan luar yang teliti, analitis, dan rendah hati). Inilah mengapa astrologi natal adalah seni pemetaan yang presisi, bukan tebakan umum.'
    ],
    ctaText: 'Pelajari Laporan Peta Bintang Komprehensif',
  },
];

interface JurnalSectionProps {
  onGoToCalculator: () => void;
  onExploreServices: () => void;
}

export const JurnalSection: React.FC<JurnalSectionProps> = ({
  onGoToCalculator,
  onExploreServices,
}) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#8A9A7B]/15 border border-[#8A9A7B]/30 text-[#8A9A7B] text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Jurnal Lintang · Catatan Edukasi & Refleksi</span>
        </div>
        <h1 className="font-serif-cormorant text-4xl sm:text-5xl font-bold text-[#1F2A44]">
          Memahami Bahasa Angka & Bintang
        </h1>
        <p className="text-xs sm:text-sm text-[#1F2A44]/75 leading-relaxed">
          Artikel reflektif yang mengurai teori pemetaan diri secara membumi, tanpa mitos, dan siap kamu terapkan dalam kehidupan sehari-hari.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ARTICLES.map((article) => (
          <article
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-[#1F2A44]/10 hover:border-[#C9A45C] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 cursor-pointer group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] text-[#1F2A44]/60">
                <span className="px-2.5 py-1 rounded-lg bg-[#F4EDE1] font-semibold text-[#C2673F]">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-[#C9A45C]" />
                  <span>{article.readingTime}</span>
                </span>
              </div>

              <h3 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44] group-hover:text-[#C2673F] transition-colors leading-snug">
                {article.title}
              </h3>

              <p className="text-xs text-[#1F2A44]/75 leading-relaxed">
                {article.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#1F2A44] group-hover:text-[#C2673F] transition-colors">
              <span>Baca Selengkapnya</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </article>
        ))}
      </div>

      {/* Reader Modal */}
      {selectedArticle && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedArticle(null);
          }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#F4EDE1] text-[#1F2A44] rounded-2xl sm:rounded-3xl p-6 sm:p-10 max-w-2xl w-full border border-[#C9A45C]/50 shadow-2xl relative my-4 sm:my-8 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 space-y-6"
          >
            {/* Top Bar with Single Close Button */}
            <div className="flex items-start justify-between border-b border-[#1F2A44]/15 pb-4 gap-4">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-[#1F2A44] text-[#C9A45C] text-[10px] font-bold uppercase tracking-wider">
                  {selectedArticle.category} · {selectedArticle.readingTime}
                </span>
                <h2 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#1F2A44] leading-tight">
                  {selectedArticle.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 rounded-xl bg-white/70 hover:bg-rose-50 text-gray-700 hover:text-rose-600 transition-all border border-gray-200 cursor-pointer shrink-0"
                title="Tutup (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Article Content */}
            <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-[#1F2A44]/85">
              {selectedArticle.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* In-Article Dynamic CTA */}
            <div className="p-6 rounded-2xl bg-[#1F2A44] text-[#F4EDE1] space-y-3 border border-[#C9A45C]/40 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs uppercase font-bold text-[#C9A45C]">
                <Sparkles className="w-4 h-4" />
                <span>Eksplorasi Mandiri</span>
              </div>
              <h4 className="font-serif-cormorant text-xl font-bold text-white">
                Ingin melihat bagaimana pola ini bekerja pada dirimu?
              </h4>
              <p className="text-xs text-[#F4EDE1]/80 max-w-md mx-auto">
                Gunakan kalkulator gratis kami untuk menghitung Life Path dan Musim Diri langsung dari browser tanpa biaya.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    onGoToCalculator();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#C9A45C] hover:bg-[#d8b56f] text-[#1F2A44] font-bold text-xs shadow transition-all cursor-pointer"
                >
                  {selectedArticle.ctaText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
