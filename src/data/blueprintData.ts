export interface ServiceItem {
  id: string;
  name: string;
  subtitle: string;
  category: 'seri-angka' | 'seri-langit' | 'seri-relasi' | 'paket';
  price: string;
  priceNote?: string;
  dataRequired: string;
  description: string;
  highlight?: string;
  loShuActiveNodes: number[]; // 1 to 9
  loShuLines: [number, number][]; // pairs of connected numbers
  features?: string[];
}

export interface CandidateName {
  name: string;
  meaning: string;
  pros: string;
  cons: string;
  status: 'rekomendasi' | 'alternatif';
}

export interface CoreValue {
  name: string;
  meaning: string;
  tagline: string;
  description: string;
  iconName: string;
}

export interface VoiceRule {
  pakai: string;
  hindari: string;
  context: string;
  explanation: string;
}

export interface ChecklistItem {
  id: number;
  code: string;
  title: string;
  category: 'AMANKAN NAMA' | 'IDENTITAS' | 'ASET JUALAN';
  description: string;
  deliverable: string;
  actionHint: string;
  sampleTemplate?: string;
}

export interface ColorSwatch {
  name: string;
  hex: string;
  role: string;
  usage: string;
  contrastText: string;
}

// Lo Shu Grid coordinates for 3x3 layout:
// 4  9  2  (y=0: x=0, x=1, x=2)
// 3  5  7  (y=1: x=0, x=1, x=2)
// 8  1  6  (y=2: x=0, x=1, x=2)
export const LO_SHU_POSITIONS: Record<number, { row: number; col: number; label: number }> = {
  4: { row: 0, col: 0, label: 4 },
  9: { row: 0, col: 1, label: 9 },
  2: { row: 0, col: 2, label: 2 },
  3: { row: 1, col: 0, label: 3 },
  5: { row: 1, col: 1, label: 5 },
  7: { row: 1, col: 2, label: 7 },
  8: { row: 2, col: 0, label: 8 },
  1: { row: 2, col: 1, label: 1 },
  6: { row: 2, col: 2, label: 6 },
};

export const COLOR_PALETTE: ColorSwatch[] = [
  {
    name: 'Biru Malam',
    hex: '#1F2A44',
    role: 'Utama',
    usage: 'Sampul, judul, logo, langit malam, kontras utama',
    contrastText: '#F4EDE1',
  },
  {
    name: 'Krem Pasir',
    hex: '#F4EDE1',
    role: 'Latar',
    usage: 'Halaman laporan, feed, background utama yang hangat',
    contrastText: '#1F2A44',
  },
  {
    name: 'Terakota',
    hex: '#C2673F',
    role: 'Aksen Utama',
    usage: 'Tombol beli, angka penting, highlight hangat',
    contrastText: '#FFFFFF',
  },
  {
    name: 'Emas Redup',
    hex: '#C9A45C',
    role: 'Aksen Kedua',
    usage: 'Garis rasi, bintang, ornamen, elemen langit',
    contrastText: '#1F2A44',
  },
  {
    name: 'Hijau Sage',
    hex: '#8A9A7B',
    role: 'Pendukung',
    usage: 'Rekomendasi, “langkah minggu ini”, tips bertumbuh',
    contrastText: '#FFFFFF',
  },
];

export const CANDIDATE_NAMES: CandidateName[] = [
  {
    name: 'Lintang · Studio Peta Diri',
    meaning: 'Bintang (bahasa Jawa); hangat, lokal, elegan. Mengakar pada budaya Nusantara namun bersuara modern.',
    pros: 'Singkat, mudah diingat, mudah diturunkan ke nama layanan seperti Dua Lintang & Lingkar Lintang. Deskriptor menjelaskan layanan tanpa terdengar mistis.',
    cons: 'Kata umum: perlu deskriptor paten dan pengecekan merek di PDKI DJKI kelas 41 / 45.',
    status: 'rekomendasi',
  },
  {
    name: 'Peta Lahir',
    meaning: 'Peta komprehensif dari data momen kelahiran seseorang.',
    pros: 'Sangat jelas, kuat untuk pencarian Google (SEO alami).',
    cons: 'Kurang unik, sulit didaftarkan merek dagang karena terlalu deskriptif.',
    status: 'alternatif',
  },
  {
    name: 'Nawasena',
    meaning: 'Masa depan cerah (serapan Sanskerta).',
    pros: 'Puitis dan sedang tren di kalangan brand lokal.',
    cons: 'Sudah banyak dipakai brand lain, terdengar menjanjikan masa depan daripada pemahaman diri.',
    status: 'alternatif',
  },
  {
    name: 'Rasi & Angka',
    meaning: 'Menyatukan rasi bintang (astrologi) dan angka (numerologi).',
    pros: 'Menjelaskan dua dunia sekaligus secara gamblang.',
    cons: 'Agak panjang, simbol “&” sulit untuk handle Instagram / TikTok dan URL.',
    status: 'alternatif',
  },
];

export const CORE_VALUES: CoreValue[] = [
  {
    name: 'Jujur',
    meaning: 'Tanpa ilusi atau janji palsu',
    tagline: 'Bukan ramalan, tapi peta.',
    description: 'Tidak menjanjikan jodoh, kekayaan kilat, atau hasil pasti. Batasan setiap sistem dijelaskan secara transparan kepada klien.',
    iconName: 'ShieldCheck',
  },
  {
    name: 'Hangat',
    meaning: 'Empatik dan merangkul',
    tagline: 'Seperti kakak yang paham astrologi.',
    description: 'Bahasa empatik, tidak menghakimi, tidak menakut-nakuti, dan tidak menggunakan istilah karma sebagai momok hukuman.',
    iconName: 'HeartHandshake',
  },
  {
    name: 'Membumi',
    meaning: 'Aplikatif dan berpijak pada realitas',
    tagline: 'Rekomendasi yang bisa dicoba minggu ini.',
    description: 'Setiap laporan ditutup dengan aksi praktis, tips komunikasi, dan rutinitas nyata yang bisa langsung dipraktikkan.',
    iconName: 'Compass',
  },
  {
    name: 'Rapi',
    meaning: 'Presisi dan estetis',
    tagline: 'Perhitungan teliti, tata letak bersih.',
    description: 'Perhitungan diperiksa ulang secara presisi; laporan didesain bersih, konsisten, dan terstruktur seperti dokumen profesional.',
    iconName: 'Sparkles',
  },
  {
    name: 'Menjaga Privasi',
    meaning: 'Etika data yang kokoh',
    tagline: 'Data lahirmu aman sepenuhnya.',
    description: 'Data kelahiran hanya dipakai untuk menyusun laporan dan dapat dihapus seketika atas permintaan klien.',
    iconName: 'Lock',
  },
];

export const SERVICES: ServiceItem[] = [
  // SERI ANGKA
  {
    id: 'kode-diri',
    name: 'Kode Diri',
    subtitle: 'Numerologi Pythagoras',
    category: 'seri-angka',
    price: 'Rp149–199 rb',
    priceNote: '*Dijual sebagai paket bersama Kisi Sembilan dan Jejak Karma',
    dataRequired: 'Nama sesuai akta + tanggal lahir',
    description: 'Lima angka inti dari nama dan tanggal lahir: jalan hidup (Life Path), cara berekspresi, dorongan jiwa, kesan pertama, dan bakat hari lahir.',
    highlight: 'Pintu masuk paling populer untuk mengenal arketipe diri.',
    loShuActiveNodes: [9, 5, 1],
    loShuLines: [[9, 5], [5, 1]],
    features: [
      'Angka Jalan Hidup (Life Path)',
      'Angka Ekspresi & Dorongan Jiwa',
      'Kesan Pertama & Bakat Hari Lahir',
      'Rangkuman Potensi & Blind Spot',
    ],
  },
  {
    id: 'kisi-sembilan',
    name: 'Kisi Sembilan',
    subtitle: 'Lo Shu Grid',
    category: 'seri-angka',
    price: 'Add-on Rp49 rb',
    dataRequired: 'Tanggal lahir',
    description: 'Angka-angka tanggal lahir dipetakan ke kisi 3×3 untuk melihat kekuatan dominan, angka yang hilang, dan garis panah bakat.',
    highlight: 'Visualisasi kisi 3×3 interaktif.',
    loShuActiveNodes: [4, 9, 2, 8, 1, 6],
    loShuLines: [[4, 9], [9, 2], [8, 1], [1, 6]],
    features: [
      'Pemetaan kisi Lo Shu 3×3',
      'Identifikasi Panah Kekuatan (Arrows of Strength)',
      'Identifikasi Angka Kosong / Pelajaran Hidup',
      'Keseimbangan Elemen Diri',
    ],
  },
  {
    id: 'jejak-karma',
    name: 'Jejak Karma',
    subtitle: 'Karmic Debt & Lessons',
    category: 'seri-angka',
    price: 'Add-on Rp49 rb',
    dataRequired: 'Nama + tanggal lahir',
    description: 'Membaca angka 13, 14, 16, 19 dan angka yang absen dari nama sebagai tema belajar yang memberdayakan, bukan hukuman.',
    highlight: 'Mengubah rasa takut menjadi pemahaman bertumbuh.',
    loShuActiveNodes: [4, 3, 8, 7, 2],
    loShuLines: [[4, 3], [3, 8], [8, 7], [7, 2]],
    features: [
      'Pemeriksaan 4 Angka Karmic Debt (13, 14, 16, 19)',
      'Angka Pelajaran Hidup (Karmic Lessons)',
      'Kunci Pelepasan Ego & Transformasi',
      'Afirmasi Reflektif Mingguan',
    ],
  },
  {
    id: 'musim-diri',
    name: 'Musim Diri',
    subtitle: 'Personal Year · Siklus 9 Tahun',
    category: 'seri-angka',
    price: 'Rp59 rb',
    dataRequired: 'Tanggal lahir',
    description: 'Tema tahun ini di dalam siklus sembilan tahun: menanam, tumbuh, berubah, menuntaskan, lalu bersiap memulai kembali.',
    highlight: 'Kompas waktu untuk merencanakan transisi hidup.',
    loShuActiveNodes: [4, 9, 2, 7, 6, 1, 8, 3],
    loShuLines: [[4, 9], [9, 2], [2, 7], [7, 6], [6, 1], [1, 8], [8, 3], [3, 4]],
    features: [
      'Identifikasi Tahun Personal (1–9)',
      'Musim: Menanam / Merawat / Panen / Istirahat',
      'Waktu terbaik untuk melangkah & menahan diri',
      'Kalender ritme energi 12 bulan',
    ],
  },
  {
    id: 'kartu-lahir',
    name: 'Kartu Lahir',
    subtitle: 'Tarot Birth Card',
    category: 'seri-angka',
    price: 'Rp49 rb',
    dataRequired: 'Tanggal lahir',
    description: 'Kartu Major Arcana dari tanggal lahir sebagai simbol karakter dasar dan peta perjalanan jiwa.',
    highlight: 'Ikonik, visual, dan penuh makna simbolis.',
    loShuActiveNodes: [4, 2, 8, 6],
    loShuLines: [[4, 2], [2, 6], [6, 8], [8, 4]],
    features: [
      'Kartu Major Arcana Primer & Sekunder',
      'Simbol Arketipe Perjalanan Jiwa',
      'Pertanyaan Refleksi untuk Kartu Lahir',
      'Koleksi Kartu Digital Estetis',
    ],
  },

  // SERI LANGIT
  {
    id: 'peta-bintang',
    name: 'Peta Bintang',
    subtitle: 'Astrologi Natal',
    category: 'seri-langit',
    price: 'Rp299–399 rb',
    dataRequired: 'Tanggal, jam, dan kota lahir',
    description: 'Sun, Moon, Rising, dua belas rumah astrologi, dan aspek antarplanet diterjemahkan ke karier, relasi, dan cara merawat diri.',
    highlight: 'Kedalaman komprehensif langit Barat.',
    loShuActiveNodes: [4, 9, 2, 3, 5, 7, 8, 1, 6],
    loShuLines: [[4, 6], [2, 8], [3, 7], [9, 1]],
    features: [
      'Big Three: Sun, Moon, Rising Sign',
      'Eksplorasi 12 Rumah Astrologi (Bhavas)',
      'Aspek Kunci Planet Utama',
      'Panduan Perawatan Diri (Self-Care by Chart)',
    ],
  },
  {
    id: 'empat-pilar',
    name: 'Empat Pilar',
    subtitle: 'BaZi · Four Pillars of Destiny',
    category: 'seri-langit',
    price: 'Rp299–399 rb',
    dataRequired: 'Tanggal, jam, kota lahir, jenis kelamin',
    description: 'Elemen diri (Day Master), dinamika lima elemen, pilar karier, kekayaan, relasi, serta siklus keberuntungan sepuluh tahunan (Da Yun).',
    highlight: 'Analisis mendalam sistem Timur klasik.',
    loShuActiveNodes: [4, 2, 8, 6, 5],
    loShuLines: [[4, 2], [2, 6], [6, 8], [8, 4], [4, 6], [2, 8]],
    features: [
      'Identifikasi Day Master & Elemen Penolong',
      'Pilar Tahun, Bulan, Hari, dan Jam',
      'Pola Aliran Finansial & Kerja',
      'Siklus Keberuntungan 10 Tahunan (Da Yun)',
    ],
  },
  {
    id: 'desain-diri',
    name: 'Desain Diri',
    subtitle: 'Berbasis Human Design',
    category: 'seri-langit',
    price: 'Rp249–349 rb',
    dataRequired: 'Tanggal, jam, kota lahir',
    description: 'Tipe energi (Type), strategi hidup (Strategy), kompas batin (Authority), Profile, dan status 9 Centers: cara alami kamu mengambil keputusan tanpa hambatan.',
    highlight: 'Sistem operasional praktis untuk energi harian.',
    loShuActiveNodes: [9, 3, 7, 1],
    loShuLines: [[9, 3], [3, 1], [1, 7], [7, 9]],
    features: [
      'Energy Type (Generator, Projector, Manifestor, dll.)',
      'Inner Authority (Otoritas Emosional, Sakral, Splenic)',
      'Strategi Pengambilan Keputusan',
      'Peta 9 Energy Centers (Defined vs Open)',
    ],
  },
  {
    id: 'bayang-ke-cahaya',
    name: 'Bayang ke Cahaya',
    subtitle: 'Berbasis Gene Keys',
    category: 'seri-langit',
    price: 'Rp249–349 rb',
    dataRequired: 'Tanggal, jam, kota lahir',
    description: 'Perjalanan pola batin dari Shadow (ketakutan alam bawah sadar) menuju Gift (bakat alami), lalu Siddhi (puncak potensi tertinggi) pada kunci-kunci utama.',
    highlight: 'Kontemplasi batin transformatif.',
    loShuActiveNodes: [8, 5, 2],
    loShuLines: [[8, 5], [5, 2]],
    features: [
      '4 Kunci Aktivasi Diri (Prime Gifts)',
      'Evolusi dari Shadow menuju Gift',
      'Penyembuhan Pola Reaksi Batin',
      'Afirmasi Kontemplasi Introspektif',
    ],
  },

  // SERI RELASI
  {
    id: 'dua-lintang',
    name: 'Dua Lintang',
    subtitle: 'Compatibility Matrix',
    category: 'seri-relasi',
    price: 'Rp199–299 rb',
    dataRequired: 'Data lahir dua orang (pasangan/sahabat/partner)',
    description: 'Membandingkan dua peta lahir berdampingan: titik kecocokan alami, sumber potensi gesekan, dan pola komunikasi yang perlu dilatih bersama.',
    highlight: 'Bukan vonis cocok atau tidak, melainkan jembatan pemahaman.',
    loShuActiveNodes: [3, 5, 7],
    loShuLines: [[3, 5], [5, 7]],
    features: [
      'Perbandingan Dua Peta Lahir Berdampingan',
      'Peta Titik Temu & Kekuatan Bersama',
      'Identifikasi Pemicu Gesekan & Miskomunikasi',
      'Latihan Bahasa Cinta & Resolusi Konflik',
    ],
  },
  {
    id: 'dua-lintang-sesi',
    name: 'Dua Lintang + Sesi Temu',
    subtitle: 'Compatibility + Konsultasi Live',
    category: 'seri-relasi',
    price: 'Rp650 rb – 1 jt',
    dataRequired: 'Data lahir dua orang',
    description: 'Laporan lengkap Dua Lintang ditambah sesi temu interaktif 60 menit via Zoom bersama praktisi, sangat cocok untuk pasangan dan persiapan pranikah.',
    highlight: 'Pengalaman dialog hangat dan intim berdua.',
    loShuActiveNodes: [4, 9, 2, 8, 1, 6, 5],
    loShuLines: [[9, 1], [3, 7]],
    features: [
      'Semua isi Laporan Dua Lintang',
      'Sesi Live 60 Menit via Zoom berdua',
      'Fasilitasi Dialog Terbimbing',
      'Rekaman Sesi & Lembar Latihan Pasangan',
    ],
  },

  // PAKET & PENDAMPINGAN
  {
    id: 'sekilas-lintang',
    name: 'Sekilas Lintang',
    subtitle: 'Pintu Masuk · Pilihan Cepat',
    category: 'paket',
    price: 'Rp49–79 rb',
    dataRequired: 'Tanggal lahir',
    description: 'Pintu masuk praktis. Pilih salah satu: Kartu Lahir Tarot atau Musim Diri (Personal Year cycle) untuk sekilas pandang ritme hidupmu.',
    highlight: 'Paling terjangkau untuk mencoba pertama kali.',
    loShuActiveNodes: [5],
    loShuLines: [],
    features: ['Pilihan Kartu Lahir ATAU Musim Diri', 'Laporan ringkas 3-4 halaman PDF estetis', 'Pengantar ramah untuk mengenal diri'],
  },
  {
    id: 'lintang-utuh',
    name: 'Lintang Utuh',
    subtitle: 'Produk Unggulan · Sintesis Lengkap',
    category: 'paket',
    price: 'Rp799 rb – 1,2 jt',
    dataRequired: 'Nama lengkap, tanggal, jam, kota lahir',
    description: 'Sintesis mendalam menyatukan 10 sistem (Numerologi, Lo Shu, Tarot, Astrologi, BaZi, Human Design, Gene Keys) dengan rekomendasi per bidang hidup.',
    highlight: 'Mahakarya kompilasi peta diri paling holistik.',
    loShuActiveNodes: [4, 9, 2, 3, 5, 7, 8, 1, 6],
    loShuLines: [[4, 9], [9, 2], [2, 7], [7, 6], [6, 1], [1, 8], [8, 3], [3, 4], [8, 5], [5, 2], [5, 9]],
    features: [
      'Sintesis 10 Sistem Pemetaan',
      'Rekomendasi Spesifik: Karier, Finansial, Asmara, Kesehatan Mental',
      'Peta Arah Langkah 1 Tahun ke Depan',
      'Desain Buku Personal PDF Eksklusif',
    ],
  },
  {
    id: 'sesi-temu',
    name: 'Sesi Temu',
    subtitle: 'Pendalaman · Konsultasi 60 Menit',
    category: 'paket',
    price: 'Rp450–750 rb',
    dataRequired: 'Peta laporan yang sudah diambil sebelumnya',
    description: 'Konsultasi live 60 menit tatap muka via Zoom bersama pembaca peta diri, lengkap dengan rekaman dan sesi tanya jawab leluasa.',
    highlight: 'Ruang aman untuk berdialog dan mengurai benang kusut.',
    loShuActiveNodes: [4, 9, 2, 8, 6],
    loShuLines: [[4, 9], [9, 2], [2, 6], [6, 8]],
    features: ['60 Menit Konsultasi Intim via Zoom', 'Tanya Jawab Bebas seputar Peta Diri', 'Rekaman Video & Audio Berkualitas', 'Rangkuman Langkah Aksi Personal'],
  },
  {
    id: 'lintang-utuh-sesi',
    name: 'Lintang Utuh + Sesi Temu',
    subtitle: 'Paket Premium · Pengalaman Lengkap',
    category: 'paket',
    price: 'Rp1,5–2 jt',
    dataRequired: 'Nama lengkap, tanggal, jam, kota lahir',
    description: 'Laporan lengkap mahakarya Lintang Utuh ditambah sesi konsultasi pendalaman 90 menit. Pendampingan holistik terbaik.',
    highlight: 'Investasi menyeluruh untuk masa transisi besar hidup.',
    loShuActiveNodes: [4, 9, 2, 3, 5, 7, 8, 1, 6],
    loShuLines: [[4, 9], [9, 2], [2, 7], [7, 6], [6, 1], [1, 8], [8, 3], [3, 4], [4, 6], [2, 8]],
    features: ['Laporan Mahakarya Lintang Utuh', 'Sesi Konsultasi Eksklusif 90 Menit', 'Prioritas Pengerjaan Cepat', 'Tindak Lanjut via Chat 7 Hari'],
  },
  {
    id: 'lingkar-lintang',
    name: 'Lingkar Lintang',
    subtitle: 'Langganan · Komunitas Refleksi Bulanan',
    category: 'paket',
    price: 'Rp49 rb / bulan',
    dataRequired: 'Email & WhatsApp',
    description: 'Komunitas pendampingan bulanan: tema bulanan, pengingat siklus bulan dan musim, serta panduan jurnal refleksi berkala.',
    highlight: 'Menjaga ritme kesadaran sepanjang tahun.',
    loShuActiveNodes: [9, 7, 1, 3],
    loShuLines: [[9, 7], [7, 1], [1, 3], [3, 9]],
    features: ['E-Jurnal Refleksi Tematik Tiap Awal Bulan', 'Pengingat Kalender Energi & Fase Bulan', 'Akses ke Sesi Temu Komunitas Daring', 'Diskon Khusus Laporan Baru'],
  },
  {
    id: 'lintang-2027',
    name: 'Lintang 2027',
    subtitle: 'Musiman (Desember – Februari)',
    category: 'paket',
    price: 'Rp99 rb',
    dataRequired: 'Tanggal lahir',
    description: 'Panduan navigasi tahunan: perpaduan Musim Diri (Personal Year) dengan elemen tahun BaZi untuk membaca peluang dan ritme tahun baru.',
    highlight: 'Produk musiman akhir tahun paling dinanti.',
    loShuActiveNodes: [8, 5, 2],
    loShuLines: [[8, 5], [5, 2]],
    features: ['Membaca Dinamika Tahun Kalender', 'Kolaborasi Musim Diri & Elemen BaZi', '3 Fokus Utama: Karier, Finansial, Relasi', 'Kalender Kuartal Aksi'],
  },
  {
    id: 'kado-lintang',
    name: 'Kado Lintang',
    subtitle: 'Hadiah Personal Penuh Makna',
    category: 'paket',
    price: '+Rp25 rb',
    dataRequired: 'Nama penerima + ucapan khusus',
    description: 'Pilihan kemasan hadiah digital atau cetak untuk laporan apa pun, dilengkapi kartu ucapan estetis bertuliskan doa personal.',
    highlight: 'Kado ulang tahun, pernikahan, atau kelulusan tak terlupakan.',
    loShuActiveNodes: [4, 2, 8, 6, 5],
    loShuLines: [[4, 6], [2, 8]],
    features: ['Sampul Khusus Hadiah dengan Nama Penerima', 'Kartu Ucapan Digital Estetis & Cetak', 'Pesan Khusus Terkustomisasi', 'Tautan Rahasia untuk Penerima'],
  },
];

export const VOICE_RULES: VoiceRule[] = [
  {
    pakai: 'cenderung, pola, potensi, energi',
    hindari: 'pasti, ditakdirkan, akurat 100%',
    context: 'Membicarakan kecenderungan sifat',
    explanation: 'Kita membaca peta kecenderungan, bukan menentukan masa depan yang kaku.',
  },
  {
    pakai: 'musim, siklus, fase',
    hindari: 'tahun sial, nasib buruk, bahaya',
    context: 'Membicarakan periode tantangan',
    explanation: 'Tidak ada tahun sial; setiap masa memiliki fungsi spesifik (menanam, merawat, atau jeda).',
  },
  {
    pakai: 'tantangan yang bisa dilatih',
    hindari: 'kelemahan fatal, kutukan, karma buruk',
    context: 'Membicarakan area kekurangan diri',
    explanation: 'Memberdayakan pembaca untuk berlatih, bukan membuat mereka merasa cacat sejak lahir.',
  },
  {
    pakai: 'coba perhatikan…, kamu bisa memilih…',
    hindari: 'kamu harus…, jangan pernah…',
    context: 'Memberikan saran & rekomendasi',
    explanation: 'Menghargai otonomi dan pilihan sadar individu sebagai kapten atas hidupnya sendiri.',
  },
  {
    pakai: 'refleksi, cermin, peta',
    hindari: 'ramalan jitu, terawang, gaib',
    context: 'Menjelaskan hakikat layanan Lintang',
    explanation: 'Memosisikan diri sebagai teman refleksi cerdas dan membumi, bukan dukun atau peramal.',
  },
];

export const LAUNCH_CHECKLIST: ChecklistItem[] = [
  {
    id: 1,
    code: '01',
    title: 'Cek nama “Lintang” di PDKI, handle medsos, dan domain',
    category: 'AMANKAN NAMA',
    description: 'Pastikan nama Lintang bebas sengketa di DJKI kelas jasa relevan, serta amankan username @lintang.petadiri di Instagram dan TikTok.',
    deliverable: 'Laporan pengecekan PDKI & kepemilikan akun sosial',
    actionHint: 'Prioritaskan @lintang.petadiri, domain lintangpetadiri.com / petadiri.id',
  },
  {
    id: 2,
    code: '02',
    title: 'Daftarkan merek di kelas jasa yang relevan dan NIB di OSS',
    category: 'AMANKAN NAMA',
    description: 'Legalitas hukum perlindungan kekayaan intelektual (Kelas 41 untuk edukasi/pelatihan atau Kelas 45 untuk layanan personal) dan NIB legalitas usaha.',
    deliverable: 'Bukti permohonan pendaftaran merek DJKI & Dokumen NIB',
    actionHint: 'Gunakan OSS RBA untuk proses NIB mikro kilat',
  },
  {
    id: 3,
    code: '03',
    title: 'Desain logomark kisi 9 titik, wordmark, dan avatar',
    category: 'IDENTITAS',
    description: 'Selesaikan aset visual utama: wordmark huruf kecil serif lembut, deskriptor huruf kapital sans-serif spasi lebar, dan ikon rasi 8-5-2+9.',
    deliverable: 'Master file SVG, PNG transparansi tinggi, favicon, dan avatar medsos',
    actionHint: 'Gunakan Lo Shu 3x3 sebagai kanvas geometri dasarnya',
  },
  {
    id: 4,
    code: '04',
    title: 'Buat brand guideline 1 halaman: warna, font, contoh kalimat',
    category: 'IDENTITAS',
    description: 'Dokumen panduan ringkas agar seluruh tim/konten kreator konsisten dalam warna (#1F2A44, #F4EDE1, #C2673F), tipografi, dan gaya tutur kata.',
    deliverable: 'Brand Cheat-Sheet 1 halaman format PDF / Figma',
    actionHint: 'Cantumkan prinsip “Seperti kakak yang paham astrologi”',
  },
  {
    id: 5,
    code: '05',
    title: 'Template sampul dan isi laporan PDF untuk tiap seri',
    category: 'ASET JUALAN',
    description: 'Desain template laporan profesional siap cetak/baca digital: Seri Angka, Seri Langit, Seri Relasi, dan Lintang Utuh.',
    deliverable: 'Template Canva / InDesign / Figma terstandarisasi',
    actionHint: 'Pastikan menyertakan halaman disclaimer di halaman akhir',
  },
  {
    id: 6,
    code: '06',
    title: 'Template konten: carousel edukasi, cover Reels, kartu testimoni',
    category: 'ASET JUALAN',
    description: 'Kumpulan 10+ template media sosial siap pakai untuk peluncuran: edukasi Life Path, Lo Shu grid, perbandingan mitos vs fakta ramalan.',
    deliverable: 'Pack template feed 1:1, story/reels 9:16',
    actionHint: 'Pakai tone visual langit senja dan tekstur kertas',
  },
  {
    id: 7,
    code: '07',
    title: 'Landing page: katalog, formulir data lahir, pembayaran',
    category: 'ASET JUALAN',
    description: 'Halaman website interaktif tempat pengunjung membaca arsitektur layanan, mengisi formulir data lahir aman, dan memilih paket.',
    deliverable: 'Web application aktif (aplikasi ini!)',
    actionHint: 'Integrasikan form input intuitif dengan validasi jam/kota lahir',
  },
  {
    id: 8,
    code: '08',
    title: 'Halaman disclaimer, kebijakan privasi, syarat & ketentuan',
    category: 'ASET JUALAN',
    description: 'Klausul hukum transparan: penegasan bahwa layanan bertujuan refleksi diri bukan medis/hukum, serta jaminan penghapusan data lahir.',
    deliverable: 'Halaman kebijakan privasi & disclaimer terverifikasi',
    actionHint: 'Tampilkan secara menonjol sebelum transaksi pembayaran',
  },
  {
    id: 9,
    code: '09',
    title: 'Kalkulator gratis Life Path + Musim Diri sebagai lead magnet',
    category: 'ASET JUALAN',
    description: 'Fitur interaktif tanpa bayar yang memberi pembaca cuplikan akurat nomor jalan hidup, kartu tarot lahir, dan musim siklus 9 tahun.',
    deliverable: 'Modul kalkulator interaktif live di web',
    actionHint: 'Lengkapi dengan tombol bagikan kartu hasil ke WhatsApp / Story',
  },
  {
    id: 10,
    code: '10',
    title: 'Template pesan WhatsApp: konfirmasi, pengiriman, minta testimoni',
    category: 'ASET JUALAN',
    description: 'Alur komunikasi pesan WhatsApp otomatis/manual yang ramah, sopan, dan hangat mulai dari pembayaran hingga follow-up kepuasan.',
    deliverable: 'Daftar copy teks WhatsApp siap copy-paste',
    actionHint: 'Gunakan sapaan “kamu” dengan sentuhan personal',
    sampleTemplate: `Halo [Nama]! ✨ Terima kasih sudah mempercayakan peta dirimu pada Lintang. 

Data lahirmu untuk laporan [Nama Layanan] sudah kami terima dengan rapi. Tim kami sedang meneliti dan menyusun peta refleksi pribadimu dengan teliti. 

Laporanmu akan kami kirimkan dalam format PDF eksklusif paling lambat [Hari, Tanggal]. Sambil menunggu, silakan ambil secangkir teh hangat ya! 🌿`,
  },
];

export const EBOOK_PAGES = [
  {
    page: 1,
    title: 'Sampul E-Book Blueprint',
    chapter: 'Cover',
    subtitle: 'E-BOOK · BLUEPRINT · Edisi 1 · Oktober 2026',
    quote: '“Baca polamu, pilih langkahmu.”',
    summary: 'Identitas visual awal Lintang: langit biru malam berbintang, bulan sabit lembut, dan rasi khas 8-5-2+9.',
  },
  {
    page: 2,
    title: 'Tentang E-Book Ini & Daftar Isi',
    chapter: 'Pengantar',
    subtitle: 'Pegangan bersama sebelum membuat logo, konten, dan produk',
    summary: 'Cetak biru brand Lintang · Studio Peta Diri: layanan pembacaan diri berbasis numerologi, tarot, astrologi, BaZi, Human Design, dan Gene Keys.',
  },
  {
    page: 3,
    title: 'Bab 1: Nama Brand',
    chapter: 'Bab 1',
    subtitle: 'Lintang · Studio Peta Diri',
    summary: '“Lintang” berarti bintang dalam bahasa Jawa. Hangat, singkat, lokal, dan terhubung dengan langit tanpa terdengar mistis.',
  },
  {
    page: 4,
    title: 'Cerita di Balik Nama & Kandidat',
    chapter: 'Bab 1',
    subtitle: 'Perbandingan 4 kandidat nama dan tips PDKI DJKI',
    quote: '“Setiap orang lahir di bawah susunan bintang dan angka yang unik. Kami membantu membacanya, supaya kamu bisa memilih langkah dengan lebih sadar.”',
    summary: 'Evaluasi nama Lintang, Peta Lahir, Nawasena, serta Rasi & Angka.',
  },
  {
    page: 5,
    title: 'Bab 2: Fondasi Brand — Misi & Visi',
    chapter: 'Bab 2',
    subtitle: 'Teman refleksi cerdas, bukan peramal penentu nasib',
    quote: '“Baca polamu, pilih langkahmu.”',
    summary: 'Misi: Membantu orang Indonesia mengenal diri lewat bahasa angka dan bintang. Visi: Studio peta diri berbahasa Indonesia paling dipercaya karena jujur, rapi, dan membumi.',
  },
  {
    page: 6,
    title: 'Positioning, Tagline, & 5 Nilai',
    chapter: 'Bab 2',
    subtitle: 'Jujur, Hangat, Membumi, Rapi, Menjaga Privasi',
    summary: 'Untuk anak muda urban yang sedang mencari arah: merangkai numerologi, astrologi, dan sistem Timur dalam satu laporan mudah dipahami berfokus pada pilihan sadar.',
  },
  {
    page: 7,
    title: 'Bab 3: Arsitektur Layanan',
    chapter: 'Bab 3',
    subtitle: 'Satu brand induk, empat lini berdasarkan kebutuhan data',
    summary: 'Struktur pohon produk: Seri Angka (tanggal lahir saja), Seri Langit (butuh jam lahir), Seri Relasi (data dua orang), Paket & Sesi (gabungan lintas lini).',
  },
  {
    page: 8,
    title: 'Bab 4: Nama Layanan & Paket — Aturan & Ikon',
    chapter: 'Bab 4',
    subtitle: 'Konsep rasi kisi Lo Shu 3×3 untuk setiap layanan',
    summary: 'Aturan penamaan kata Indonesia maksimal 3 kata, nama sistem asli di subjudul. Setiap ikon layanan memakai kisi Lo Shu 3×3 khas.',
  },
  {
    page: 9,
    title: 'Katalog: Seri Angka',
    chapter: 'Bab 4',
    subtitle: 'Cukup nama dan tanggal lahir',
    summary: 'Kode Diri (Rp149–199 rb), Kisi Sembilan (Add-on Rp49 rb), Jejak Karma (Add-on Rp49 rb), Musim Diri (Rp59 rb), Kartu Lahir (Rp49 rb).',
  },
  {
    page: 10,
    title: 'Katalog: Seri Langit',
    chapter: 'Bab 4',
    subtitle: 'Butuh tanggal, jam, dan kota lahir',
    summary: 'Peta Bintang (Rp299–399 rb), Empat Pilar / BaZi (Rp299–399 rb), Desain Diri / Human Design (Rp249–349 rb), Bayang ke Cahaya / Gene Keys (Rp249–349 rb).',
  },
  {
    page: 11,
    title: 'Katalog: Seri Relasi',
    chapter: 'Bab 4',
    subtitle: 'Dua peta, satu cerita',
    summary: 'Dua Lintang (Rp199–299 rb) & Dua Lintang + Sesi Temu (Rp650 rb – 1 jt). Titik cocok, sumber gesekan, dan pola komunikasi yang dilatih bersama.',
  },
  {
    page: 12,
    title: 'Katalog: Paket & Pendampingan',
    chapter: 'Bab 4',
    subtitle: 'Tangga nilai dari Rp49 ribu sampai sesi premium',
    summary: 'Sekilas Lintang, Lintang Utuh, Sesi Temu, Lintang Utuh + Sesi Temu, Lingkar Lintang, Lintang 2027, Kado Lintang.',
  },
  {
    page: 13,
    title: 'Bab 5: Suara Brand — Panduan Tutur Kata',
    chapter: 'Bab 5',
    subtitle: 'Seperti kakak yang paham astrologi',
    summary: 'Daftar kata Pakai vs Hindari: cermin alih-alih ramalan gaib; musim alih-alih tahun sial; tantangan yang dilatih alih-alih kutukan.',
  },
  {
    page: 14,
    title: 'Contoh Kalimat & Copywriting',
    chapter: 'Bab 5',
    subtitle: 'Caption medsos, pembuka laporan, & membalas klien cemas',
    summary: 'Prinsip utama: setiap kalimat harus membuat pembaca merasa lebih paham dan lebih berdaya, bukan lebih takut.',
  },
  {
    page: 15,
    title: 'Bab 6: Identitas Visual — Kisi Rasi 9 Titik',
    chapter: 'Bab 6',
    subtitle: 'Satu simbol yang menyatukan angka dan bintang',
    summary: 'Kisi Lo Shu 3×3, rasi 8–5–2+9 yang menanjak dan menyelesaikan siklus, wordmark huruf kecil serif lembut dan deskriptor sans-serif tipis.',
  },
  {
    page: 16,
    title: 'Palet Warna, Tipografi & Arahan Visual',
    chapter: 'Bab 6',
    subtitle: 'Biru Malam, Krem Pasir, Terakota, Emas Redup, Hijau Sage',
    summary: 'Fraunces / Cormorant Garamond untuk judul; DM Sans / Inter untuk teks; estetika tekstur kertas dan langit senja tanpa bola kristal seram.',
  },
  {
    page: 17,
    title: 'Bab 7: Aset yang Perlu Dibuat',
    chapter: 'Bab 7',
    subtitle: 'Checklist 10 langkah persiapan peluncuran brand',
    summary: 'Amankan nama dulu (01–02), lalu identitas visual (03–04), lalu aset jualan (05–10) termasuk kalkulator gratis lead magnet.',
  },
  {
    page: 18,
    title: 'Penutup & Disclaimer Etis',
    chapter: 'Penutup',
    subtitle: 'Bukan ramalan, tapi peta. Baca polamu, pilih langkahmu.',
    summary: 'Layanan Lintang ditujukan untuk refleksi diri dan hiburan, bukan pengganti nasihat profesional medis, hukum, keuangan, atau psikologis.',
  },
];
