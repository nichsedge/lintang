/**
 * Numerology & Astrology calculation engine for Lintang · Studio Peta Diri
 * Implements Pythagorean Life Path, 9-Year Personal Year (Musim Diri),
 * Lo Shu 3x3 Grid mapping, Karmic Debt checks, and Tarot Birth Cards.
 */

export interface LifePathResult {
  number: number;
  isMaster: boolean;
  name: string;
  archetype: string;
  coreTheme: string;
  strengths: string[];
  growthAreas: string[];
  lintangReflection: string;
  practicalWeeklyAction: string;
}

export interface PersonalYearResult {
  personalYear: number;
  year: number;
  theme: string;
  stageName: string;
  description: string;
  recommendedFocus: string[];
  lintangAdvice: string;
}

export interface TarotBirthCardResult {
  cardNumber: number;
  cardName: string;
  arcanaNameId: string;
  keywords: string[];
  symbolism: string;
  reflectiveQuestion: string;
}

export interface LoShuGridResult {
  counts: Record<number, number>; // counts of 1..9
  presentNumbers: number[];
  missingNumbers: number[];
  arrows: {
    name: string;
    description: string;
    numbers: number[];
    isComplete: boolean;
  }[];
}

export interface KarmicDebtResult {
  foundNumbers: number[];
  details: {
    number: number;
    title: string;
    theme: string;
    growthAdvice: string;
  }[];
}

export interface FullPetaDiriResult {
  name: string;
  birthDateStr: string;
  birthTime?: string;
  birthCity?: string;
  lifePath: LifePathResult;
  personalYear: PersonalYearResult;
  tarotCard: TarotBirthCardResult;
  loShu: LoShuGridResult;
  karmicDebt: KarmicDebtResult;
}

// Reduce a number until single digit or master number (11, 22, 33)
export function reduceToSingleOrMaster(num: number): number {
  if (num === 11 || num === 22 || num === 33) return num;
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = num
      .toString()
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return num;
}

export function reduceToSingleDigit(num: number): number {
  while (num > 9) {
    num = num
      .toString()
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return num;
}

export function calculateLifePath(day: number, month: number, year: number): LifePathResult {
  const d = reduceToSingleOrMaster(day);
  const m = reduceToSingleOrMaster(month);
  const y = reduceToSingleOrMaster(
    year
      .toString()
      .split('')
      .reduce((a, b) => a + parseInt(b, 10), 0)
  );

  const rawSum = d + m + y;
  const lp = reduceToSingleOrMaster(rawSum);

  const lifePathDatabase: Record<number, Omit<LifePathResult, 'number' | 'isMaster'>> = {
    1: {
      name: 'Sang Perintis (The Pioneer)',
      archetype: 'Inisiator, Mandiri, Pembuka Jalan',
      coreTheme: 'Membangun keberanian untuk memimpin dan berdiri di atas kaki sendiri.',
      strengths: ['Kemauan baja', 'Inisiatif cepat', 'Originalitas ide', 'Keberanian mencoba hal baru'],
      growthAreas: ['Belajar mendelegasikan tugas', 'Menahan dorongan terburu-buru', 'Menghargai proses orang lain'],
      lintangReflection: 'Kamu tidak dirancang untuk sekadar mengikuti jejak yang sudah ada. Kehadiranmu sering kali menjadi pemantik api perubahan.',
      practicalWeeklyAction: 'Pilihlah satu ide yang selama ini kamu tunda karena menunggu persetujuan orang lain, dan mulailah langkah pertamanya minggu ini.',
    },
    2: {
      name: 'Sang Penyeimbang (The Peacemaker)',
      archetype: 'Diplomatis, Intuitif, Penghubung Hati',
      coreTheme: 'Menjadi jembatan empati dan merajut keharmonisan dalam relasi.',
      strengths: ['Kepekaan rasa yang tajam', 'Pendengar empatik', 'Kemampuan mediasi', 'Kesetiaan'],
      growthAreas: ['Menetapkan batasan pribadi (boundaries)', 'Tidak menelan emosi demi ketenangan semu'],
      lintangReflection: 'Kekuatan terbesarmu terletak pada kelembutan yang mampu mencairkan ketegangan. Jangan lupa untuk tetap mendengarkan kebutuhan dirimu sendiri.',
      practicalWeeklyAction: 'Latih satu penolakan halus namun tegas terhadap permintaan yang menguras energimu tanpa rasa bersalah.',
    },
    3: {
      name: 'Sang Penutur Rasa (The Creative Expressor)',
      archetype: 'Kreatif, Komunikatif, Penebar Inspirasi',
      coreTheme: 'Mengekspresikan warna batin melalui kata, seni, dan keterbukaan.',
      strengths: ['Daya imajinasi kaya', 'Komunikasi memikat', 'Optimisme alami', 'Humor dan keterbukaan'],
      growthAreas: ['Fokus pada satu proyek hingga tuntas', 'Mengelola suasana hati yang mudah naik turun'],
      lintangReflection: 'Dunia membutuhkan caramu menerjemahkan ide menjadi sesuatu yang bernyawa. Bicaralah dan berkaryalah dengan jujur dari hatimu.',
      practicalWeeklyAction: 'Tulis satu jurnal refleksi atau bagikan satu ide kreatifmu kepada teman terdekat tanpa filter perfeksionis.',
    },
    4: {
      name: 'Sang Pembangun Fondasi (The Architect)',
      archetype: 'Metodis, Bertanggung Jawab, Tangguh',
      coreTheme: 'Menyusun struktur yang kokoh dan tahan uji bagi masa depan.',
      strengths: ['Disiplin tinggi', 'Konsistensi kerja', 'Perhatian pada detail', 'Dapat diandalkan di masa krisis'],
      growthAreas: ['Fleksibilitas menghadapi perubahan rencana', 'Memberi ruang untuk spontanitas dan istirahat'],
      lintangReflection: 'Kamu adalah tiang penyangga yang kokoh. Namun tiang yang paling kuat sekalipun butuh kelenturan agar tidak patah saat angin kencang berhembus.',
      practicalWeeklyAction: 'Jadwalkan 2 jam istirahat mutlak di kalendermu minggu ini tanpa memikirkan daftar pekerjaan yang belum beres.',
    },
    5: {
      name: 'Sang Petualang Bebas (The Catalyst)',
      archetype: 'Dinamis, Adaptif, Pencari Pengalaman',
      coreTheme: 'Merangkul kebebasan dan menjembatani perubahan dinamis.',
      strengths: ['Adaptasi cepat', 'Daya tarik karismatik', 'Keberanian bereksplorasi', 'Kemampuan multi-talenta'],
      growthAreas: ['Komitmen jangka panjang', 'Mengendalikan rasa gelisah saat rutinitas terasa membosankan'],
      lintangReflection: 'Energi hidupmu mekar ketika kamu diberi ruang bernapas dan bergerak. Kebebasan sejati lahir dari disiplin memilih hal yang benar-benar berharga.',
      practicalWeeklyAction: 'Ubah satu rute perjalanan atau coba satu aktivitas baru yang memicu rasa ingin tahumu akhir pekan ini.',
    },
    6: {
      name: 'Sang Pengayom (The Nurturer)',
      archetype: 'Penuh Kasih, Tanggung Jawab, Harmonis',
      coreTheme: 'Menghadirkan rasa aman, merawat orang terkasih, dan menciptakan keindahan.',
      strengths: ['Kepedulian tulus', 'Rasa estetika tinggi', 'Kapasitas mengayomi', 'Tanggung jawab keluarga/komunitas'],
      growthAreas: ['Menghindari sindrom penyelamat (savior complex)', 'Menerima bahwa ketidaksempurnaan adalah bagian dari hidup'],
      lintangReflection: 'Hati yang besar adalah anugerah terindahmu. Ingatlah bahwa kamu tidak bisa menuangkan air dari teko yang sedang kosong.',
      practicalWeeklyAction: 'Lakukan satu sesi perawatan diri (self-care) yang murni untuk kebahagiaan fisik dan batinmu sendiri.',
    },
    7: {
      name: 'Sang Pencari Kebenaran (The Seeker)',
      archetype: 'Analitis, Introspektif, Filosofis',
      coreTheme: 'Menggali makna di balik permukaan dan mencari kebijaksanaan sejati.',
      strengths: ['Ketajaman analisis', 'Intuisi mendalam', 'Kemandirian berpikir', 'Kedalaman spiritualitas'],
      growthAreas: ['Kecenderungan menarik diri terlalu jauh', 'Membangun kepercayaan pada orang lain'],
      lintangReflection: 'Pikiranmu adalah laboratorium yang hening dan luas. Kamu butuh waktu menyendiri untuk memproses dunia, dan itu adalah kebutuhan sahmu.',
      practicalWeeklyAction: 'Luangkan 30 menit tanpa gawai di pagi hari untuk duduk bersama kopi, teh, dan renungan pribadimu.',
    },
    8: {
      name: 'Sang Pemimpin Berdaya (The Visionary)',
      archetype: 'Eksploratif, Berdaya, Berorientasi Hasil',
      coreTheme: 'Mengelola sumber daya dan mewujudkan visi nyata menjadi kemakmuran.',
      strengths: ['Visi strategis tajam', 'Ketahanan mental tinggi', 'Bakat kepemimpinan', 'Kecerdasan praktis'],
      growthAreas: ['Menjaga keseimbangan antara ambisi materi dan kedamaian batin', 'Meredam kecenderungan mengontrol'],
      lintangReflection: 'Kapasitasmu untuk mewujudkan visi sangat besar. Gunakan kekuatanmu bukan sekadar untuk menaklukkan puncak, melainkan untuk mengangkat orang lain bersama.',
      practicalWeeklyAction: 'Audit alur finansial atau proyek terbesarmu, lalu tetapkan satu langkah delegasi yang meringankan bebanmu.',
    },
    9: {
      name: 'Sang Humanis Bijak (The Philanthropist)',
      archetype: 'Berjiwa Luas, Penuh Belas Kasih, Penggenap Siklus',
      coreTheme: 'Melepaskan yang usang dan melayani kemanusiaan dengan ketulusan.',
      strengths: ['Pandangan global luas', 'Kedermawanan hati', 'Daya tarik inspiratif', 'Kemampuan merangkul perbedaan'],
      growthAreas: ['Belajar melepaskan masa lalu tanpa rasa dendam', 'Mencegah kelelahan emosional (burnout)'],
      lintangReflection: 'Kamu membawa jiwa penyelesai yang kaya akan pengalaman batin. Setiap akhir yang kamu lalui sedang mempersiapkan awal yang jauh lebih agung.',
      practicalWeeklyAction: 'Lepaskan satu benda atau satu pikiran masa lalu yang sudah tidak lagi melayani pertumbuhan dirimu.',
    },
    11: {
      name: 'Sang Mercusuar Intuitif (Master Number 11)',
      archetype: 'Visioner Spiritual, Inspirator, Kanal Cahaya',
      coreTheme: 'Menghubungkan intuisi tinggi dengan inspirasi nyata bagi orang banyak.',
      strengths: ['Intuisi luar biasa peka', 'Daya inspirasi kuat', 'Sensitivitas artistik', 'Kesadaran spiritual tinggi'],
      growthAreas: ['Mengelola kecemasan karena stimulasi sensorik berlebih', 'Menancapkan kaki di bumi (grounding)'],
      lintangReflection: 'Sebagai Master Number 11, kamu ibarat antena penangkap getaran halus. Jagalah kejernihan batinmu agar tidak tenggelam oleh kebisingan dunia.',
      practicalWeeklyAction: 'Lakukan latihan grounding: berjalan tanpa alas kaki di atas rumput atau latihan pernapasan sadar selama 10 menit.',
    },
    22: {
      name: 'Sang Arsitek Ulung (Master Number 22)',
      archetype: 'Master Builder, Eksekutor Visi Raksasa',
      coreTheme: 'Menurunkan mimpi-mimpi idealis menjadi karya nyata yang bermanfaat luas.',
      strengths: ['Perpaduan intuisi tinggi dan kepraktisan absolut', 'Kemampuan merancang sistem besar', 'Pengaruh positif luas'],
      growthAreas: ['Tekanan ekspektasi diri yang terlalu berat', 'Takut gagal sebelum mencoba'],
      lintangReflection: 'Kamu diberi cetak biru untuk membangun sesuatu yang bertahan melampaui zaman. Mulailah dari fondasi batu pertama yang rapi hari ini.',
      practicalWeeklyAction: 'Uraikan satu visi jangka panjangmu menjadi tiga aksi mikro yang bisa diselesaikan minggu ini.',
    },
    33: {
      name: 'Sang Guru Pengasih (Master Number 33)',
      archetype: 'Master Healer, Penebar Kasih Sejati',
      coreTheme: 'Membimbing sesama menuju pencerahan melalui teladan welas asih.',
      strengths: ['Empati tanpa batas', 'Kemampuan menyembuhkan batin', 'Keberanian membela yang lemah'],
      growthAreas: ['Mengorbankan diri berlebihan (martyrdom)', 'Memikul beban dunia sendirian'],
      lintangReflection: 'Cahayamu hangat dan menyembuhkan. Ingatlah bahwa kamu hanya bisa menerangi sesama jika lilin dalam jiwamu tetap menyala dengan aman.',
      practicalWeeklyAction: 'Berikan apresiasi tulus kepada dirimu sendiri sebelum menolong atau merawat orang lain hari ini.',
    },
  };

  const info = lifePathDatabase[lp] || lifePathDatabase[1];
  return {
    number: lp,
    isMaster: lp === 11 || lp === 22 || lp === 33,
    ...info,
  };
}

export function getPersonalYearData(pyNumber: number, targetYear = 2026): PersonalYearResult {
  const py = pyNumber < 1 || pyNumber > 9 ? 1 : pyNumber;
  return calculatePersonalYearFromNumber(py, targetYear);
}

const personalYearDatabase: Record<number, { theme: string; stageName: string; description: string; recommendedFocus: string[]; advice: string }> = {
  1: {
    stageName: 'Musim Menanam Benih Baru',
    theme: 'Inisiatif, Awal Baru, Kemandirian',
    description: 'Ini adalah tahun pembuka dari siklus 9 tahun barumu. Energi tahun ini segar, dinamis, dan menuntut keberanian untuk melangkah lebih dulu.',
    recommendedFocus: ['Memulai proyek orisinal', 'Menata ulang tujuan hidup', 'Mempercayai insting pribadi'],
    advice: 'Jangan ragu mengambil inisiatif. Benih yang kamu tabur di tahun ini akan menentukan warna 9 tahun ke depan.',
  },
  2: {
    stageName: 'Musim Merawat & Berkolaborasi',
    theme: 'Kesabaran, Diplomasi, Relasi',
    description: 'Benih yang ditanam tahun lalu kini sedang mengembangkan akar di bawah tanah. Fokus bergeser pada kemitraan, kerjasama, dan kelembutan.',
    recommendedFocus: ['Memperdalam hubungan dekat', 'Melatih kesabaran proses', 'Mendengarkan intuisi daripada logika kaku'],
    advice: 'Jika ada hal yang terasa lambat, bukan berarti gagal. Ini adalah waktu menanti dengan anggun.',
  },
  3: {
    stageName: 'Musim Berekspresi & Berkembang',
    theme: 'Kreativitas, Komunikasi, Keceriaan',
    description: 'Batang tanaman mulai muncul ke permukaan dengan dedaunan hijau. Energi tahun ini cerah, mengundangmu bersosialisasi dan menuangkan ide.',
    recommendedFocus: ['Berkreasi tanpa sensor diri', 'Menjalin jejaring sosial baru', 'Menikmati kegembiraan harian'],
    advice: 'Ekspresikan apa yang kamu rasakan secara autentik. Jangan menahan warna aslimu.',
  },
  4: {
    stageName: 'Musim Membangun Fondasi & Kerja Nyata',
    theme: 'Disiplin, Struktur, Pengorganisasian',
    description: 'Tahun untuk menancapkan tiang penopang agar tanamanmu kokoh menghadapi angin. Diperlukan ketekunan, manajemen keuangan, dan kerapian sistem.',
    recommendedFocus: ['Menata anggaran dan tabungan', 'Membangun rutinitas sehat', 'Menyelesaikan hal-hal administratif'],
    advice: 'Kerapian dan keteraturan bukan pembatas kebebasan, melainkan pelindung impianmu.',
  },
  5: {
    stageName: 'Musim Angin Perubahan & Fleksibilitas',
    theme: 'Dinamika, Eksplorasi, Kebebasan',
    description: 'Titik tengah siklus 9 tahun. Angin perubahan bertiup membawa peluang tak terduga, pergeseran minat, atau perjalanan baru.',
    recommendedFocus: ['Berani keluar dari zona nyaman', 'Fleksibel menghadapi improvisasi', 'Melepas rutinitas yang monoton'],
    advice: 'Berselancarlah di atas ombak perubahan alih-alih melawannya.',
  },
  6: {
    stageName: 'Musim Harmoni & Pengabdian',
    theme: 'Keluarga, Rumah Tangga, Tanggung Jawab',
    description: 'Fokus berpusat pada orang-orang terdekat, kehangatan rumah, dan mempercantik ruang hidupmu. Ada panggilan untuk merawat dan hadir.',
    recommendedFocus: ['Memperbaiki relasi keluarga/pasangan', 'Menata estetika tempat tinggal', 'Mengulurkan tangan dengan tulus'],
    advice: 'Hadirkan kehangatan di rumahmu, mulai dari cara kamu memperlakukan diri sendiri.',
  },
  7: {
    stageName: 'Musim Hening & Introspeksi Batin',
    theme: 'Refleksi Diri, Belajar, Kedalaman',
    description: 'Tahun jeda untuk merenungkan makna di balik perjalananmu sejauh ini. Lebih menyukai keheningan daripada keramaian luar.',
    recommendedFocus: ['Mendalami ilmu atau keterampilan baru', 'Retret refleksi dan istirahat batin', 'Mengevaluasi arah kompas hidup'],
    advice: 'Menepi sejenak bukanlah langkah mundur; ini adalah persiapan mengumpulkan tenaga.',
  },
  8: {
    stageName: 'Musim Panen & Pemberdayaan',
    theme: 'Pencapaian, Otoritas, Finansial',
    description: 'Buah dari kerja keras tahun-tahun sebelumnya mulai matang. Tahun untuk menuntut nilai pantas atas keringatmu dan mengelola hasil nyata.',
    recommendedFocus: ['Negosiasi karier dan bisnis', 'Keputusan investasi yang terukur', 'Menunjukkan kapabilitas diri di depan publik'],
    advice: 'Klaim ruangmu dan berdirilah dengan percaya diri. Hasil kerjamu pantas dihargai.',
  },
  9: {
    stageName: 'Musim Menuntaskan & Melepas',
    theme: 'Penutupan Siklus, Katarsis, Ruang Baru',
    description: 'Tahun penutup dari siklus 9 tahun. Waktunya menyortir apa yang masih layak dibawa dan apa yang harus dilepaskan dengan lapang dada.',
    recommendedFocus: ['Menuntaskan proyek tertunda', 'Memaafkan dan membersihkan beban emosi', 'Mempersiapkan lembaran kosong untuk tahun depan'],
    advice: 'Lepaskan apa yang memang sudah selesai masa tugasnya agar tanganmu siap menerima hal baru.',
  },
};

function calculatePersonalYearFromNumber(py: number, targetYear: number): PersonalYearResult {
  const data = personalYearDatabase[py] || personalYearDatabase[1];
  return {
    personalYear: py,
    year: targetYear,
    stageName: data.stageName,
    theme: data.theme,
    description: data.description,
    recommendedFocus: data.recommendedFocus,
    lintangAdvice: data.advice,
  };
}

export function calculatePersonalYear(day: number, month: number, targetYear = 2026): PersonalYearResult {
  const d = reduceToSingleDigit(day);
  const m = reduceToSingleDigit(month);
  const y = reduceToSingleDigit(targetYear);
  const py = reduceToSingleDigit(d + m + y);
  return calculatePersonalYearFromNumber(py, targetYear);
}

export function calculateTarotBirthCard(day: number, month: number, year: number): TarotBirthCardResult {
  // Method: sum digits of DD + MM + YYYY until <= 21
  const sumDigits = (n: number) =>
    n
      .toString()
      .split('')
      .reduce((a, b) => a + parseInt(b, 10), 0);

  const total = sumDigits(day) + sumDigits(month) + sumDigits(year);
  let cardNum = total;
  while (cardNum > 21) {
    cardNum = sumDigits(cardNum);
  }

  const tarotCards: Record<number, { name: string; idName: string; keywords: string[]; symbolism: string; question: string }> = {
    0: {
      name: 'The Fool',
      idName: 'Sang Pengelana Awal',
      keywords: ['Kemurnian Batin', 'Spontanitas', 'Langkah Keyakinan'],
      symbolism: 'Jiwa yang melangkah ringan membawa ransel kecil dengan bunga mawar putih, siap menatap cakrawala tanpa prasangka buruk.',
      question: 'Di area mana dalam hidupmu kamu dipanggil untuk melangkah dengan hati yang murni tanpa ketakutan berlebih?',
    },
    1: {
      name: 'The Magician',
      idName: 'Sang Pengrajin Peluang',
      keywords: ['Pemanfaatan Potensi', 'Kreativitas', 'Fokus Nyata'],
      symbolism: 'Meja yang memuat empat elemen (tongkat, cawan, pedang, koin), melambangkan semua alat yang kamu butuhkan sudah berada di depanmu.',
      question: 'Bakat dan sumber daya apa yang sudah kamu miliki namun belum kamu gunakan secara optimal?',
    },
    2: {
      name: 'The High Priestess',
      idName: 'Sang Penjaga Intuisi',
      keywords: ['Suara Hati', 'Kearifan Batin', 'Keheningan'],
      symbolism: 'Dua pilar gelap dan terang dengan tirai delima di belakangnya, menjaga rahasia yang hanya bisa didengar saat pikiran mereda.',
      question: 'Bisikan lembut apa dari hatimu yang selama ini tertutup oleh suara bising logika sekitarmu?',
    },
    3: {
      name: 'The Empress',
      idName: 'Sang Ibu Kelimpahan',
      keywords: ['Kesuburan Ide', 'Perawatan Diri', 'Keindahan Alam'],
      symbolism: 'Mahkota dua belas bintang dan hamparan ladang gandum keemasan, merayakan kelimpahan cinta yang memberi kehidupan.',
      question: 'Bagaimana caramu merawat diri sendiri agar kamu bisa terus melahirkan karya yang indah?',
    },
    4: {
      name: 'The Emperor',
      idName: 'Sang Penjaga Keteraturan',
      keywords: ['Stabilitas', 'Kepemimpinan', 'Fondasi Kokoh'],
      symbolism: 'Tahta batu kokoh dengan relief kepala domba jantan, menegaskan ketegasan arah dan perlindungan bagi apa yang kamu bangun.',
      question: 'Struktur atau disiplin apa yang perlu kamu perkuat agar hidupmu terasa lebih aman dan terarah?',
    },
    5: {
      name: 'The Hierophant',
      idName: 'Sang Pembawa Warisan Kebijaksanaan',
      keywords: ['Nilai Luhur', 'Tradisi Teruji', 'Mentor Batin'],
      symbolism: 'Kunci persilangan di bawah kaki tahta spiritual, menghubungkan pembelajaran masa lalu dengan jalan hidup masa kini.',
      question: 'Prinsip hidup atau nilai mendasar apa yang menjadi peganganmu saat menghadapi dilema moral?',
    },
    6: {
      name: 'The Lovers',
      idName: 'Sang Pemersatu Pilihan Hati',
      keywords: ['Pilihan Sadar', 'Penyelarasan Nilai', 'Keintiman Tulus'],
      symbolism: 'Malaikat Raphael memberkati dua sosok manusia, mengingatkan bahwa setiap pilihan relasi bermula dari kejujuran pada diri sendiri.',
      question: 'Apakah pilihan-pilihan yang kamu ambil saat ini selaras dengan nilai-nilai terdalam hatimu?',
    },
    7: {
      name: 'The Chariot',
      idName: 'Sang Pengendali Arah',
      keywords: ['Fokus Tunggal', 'Keteguhan Tekad', 'Menjinakkan Kontradiksi'],
      symbolism: 'Kereta baja yang ditarik oleh dua sphinx hitam dan putih yang bergerak maju berkat keteguhan niat pengendaranya.',
      question: 'Bagaimana kamu menyatukan dua dorongan yang saling bertentangan dalam dirimu menuju satu tujuan utama?',
    },
    8: {
      name: 'Strength',
      idName: 'Sang Kelembutan Tangguh',
      keywords: ['Keberanian Halus', 'Welas Asih', 'Ketabahan Batin'],
      symbolism: 'Sosok perempuan yang dengan lembut membelai rahang singa berapi-api, membuktikan bahwa cinta kasih lebih kuat daripada paksaan.',
      question: 'Kapan terakhir kali kamu memilih merespons kemarahan dengan kelembutan yang teguh?',
    },
    9: {
      name: 'The Hermit',
      idName: 'Sang Pembawa Lentera Hening',
      keywords: ['Introspeksi', 'Cahaya Penuntun', 'Kedalaman Renungan'],
      symbolism: 'Sosok bijak di puncak gunung salju memegang lentera berisi bintang bercahaya enam sudut, menerangi jalan setapak satu langkah demi satu langkah.',
      question: 'Ruang hening seperti apa yang kamu butuhkan untuk menyegarkan kembali jiwamu?',
    },
    10: {
      name: 'Wheel of Fortune',
      idName: 'Sang Pemutar Roda Waktu',
      keywords: ['Siklus Hidup', 'Titik Balik', 'Kesadaran Musim'],
      symbolism: 'Roda empat penjuru yang berputar di langit bebas, mengingatkan bahwa setiap fase suka dan duka senantiasa bergulir.',
      question: 'Siklus hidup apa yang saat ini sedang kamu jalani, dan bagaimana kamu menyikapinya dengan lapang dada?',
    },
    11: {
      name: 'Justice',
      idName: 'Sang Penimbang Keadilan',
      keywords: ['Kejujuran Radikal', 'Keseimbangan Karma', 'Keputusan Objektif'],
      symbolism: 'Pedang kebenaran di tangan kanan dan timbangan keseimbangan di tangan kiri, memotong ilusi tanpa rasa dendam.',
      question: 'Di area mana kamu perlu bersikap lebih jujur dan adil kepada dirimu sendiri?',
    },
    12: {
      name: 'The Hanged Man',
      idName: 'Sang Pembalik Sudut Pandang',
      keywords: ['Jeda Menyerah', 'Perspektif Baru', 'Ketenangan Menunggu'],
      symbolism: 'Sosok tergantung terbalik dengan lingkaran cahaya di kepalanya, menemukan pencerahan saat bersedia melepaskan ego untuk mengontrol.',
      question: 'Apa yang bisa kamu lepaskan kendalinya agar kamu bisa melihat situasi kusut dari sudut pandang yang lebih jernih?',
    },
    13: {
      name: 'Death',
      idName: 'Sang Gerbang Transformasi',
      keywords: ['Pelepasan Alami', 'Kelahiran Kembali', 'Akhir yang Membebaskan'],
      symbolism: 'Matahari yang terbit di balik dua menara saat malam berlalu, mengingatkan bahwa dedaunan gugur adalah syarat mekarnya bunga musim semi.',
      question: 'Bab lama apa dalam hidupmu yang sudah saatnya kamu tutup dengan rasa terima kasih?',
    },
    14: {
      name: 'Temperance',
      idName: 'Sang Pencampur Harmoni',
      keywords: ['Keseimbangan Rasa', 'Sintesis Moderasi', 'Kesembuhan Bertahap'],
      symbolism: 'Malaikat dengan satu kaki di air dan satu di darat menuangkan cairan antar dua cawan tanpa tumpah setetes pun.',
      question: 'Bagaimana kamu bisa memadukan dua aspek berbeda dalam hidupmu menjadi harmoni yang menenangkan?',
    },
    15: {
      name: 'The Devil',
      idName: 'Sang Penyingkap Keterikatan',
      keywords: ['Mengenali Bayang-bayang', 'Pelepasan Rantai Ilusi', 'Kejujuran Hasrat'],
      symbolism: 'Rantai longgar di leher dua sosok manusia, menyingkap bahwa keterikatan batin sering kali hanya bisa diputus oleh kesadaran diri.',
      question: 'Kekhawatiran atau kebiasaan apa yang membuatmu merasa terkungkung, padahal kuncinya ada di tanganmu?',
    },
    16: {
      name: 'The Tower',
      idName: 'Sang Pembongkar Ilusi',
      keywords: ['Petir Pembebasan', 'Runtuhnya Fondasi Rapuh', 'Penyadaran Kilat'],
      symbolism: 'Petir menyambar menara bermahkota buatan manusia, membebaskan jiwa dari kepalsuan yang sudah terlalu lama dipertahankan.',
      question: 'Kebenaran apa yang selama ini kamu hindari, yang jika diakui akan membebaskan langkahmu?',
    },
    17: {
      name: 'The Star',
      idName: 'Sang Bintang Harapan',
      keywords: ['Kedamaian Batin', 'Inspirasi Murni', 'Penyembuhan Sejati'],
      symbolism: 'Bintang besar emas di langit malam dengan delapan bintang kecil, memancarkan harapan jernih setelah badai mereda.',
      question: 'Harapan tulus apa yang selalu membuat jiwamu merasa damai dan bersyukur?',
    },
    18: {
      name: 'The Moon',
      idName: 'Sang Penjelajah Alam Rasa',
      keywords: ['Misteri Bawah Sadar', 'Mimpi', 'Menavigasi Keraguan'],
      symbolism: 'Bulan dengan wajah penuh merenung di atas jalan setapak berliku antara anjing dan serigala, menuntun langkah di tengah kabut.',
      question: 'Kekhawatiran mana yang merupakan bayangan masa lalu dan bukan realitas nyata hari ini?',
    },
    19: {
      name: 'The Sun',
      idName: 'Sang Surya Kehangatan',
      keywords: ['Kegembiraan Murni', 'Kejelasan Langkah', 'Vitalitas Hidup'],
      symbolism: 'Matahari tersenyum hangat menyinari anak kecil di atas kuda putih bermahkota bunga matahari, merayakan hidup tanpa kepura-puraan.',
      question: 'Aktivitas sederhana apa yang selalu membuatmu merasa hidup dan bersinar apa adanya?',
    },
    20: {
      name: 'Judgement',
      idName: 'Sang Panggilan Jiwa',
      keywords: ['Kebangkitan Kesadaran', 'Panggilan Hidup', 'Pengampunan Tuntas'],
      symbolism: 'Terompet malaikat membangkitkan sosok-sosok dari peti dengan tangan terbuka, menyambut babak baru panggilan hidup yang sejati.',
      question: 'Panggilan atau suara hati apa yang berulang kali mengetuk pintumu belakangan ini?',
    },
    21: {
      name: 'The World',
      idName: 'Sang Kesempurnaan Siklus',
      keywords: ['Kepenuhan Hidup', 'Integrasi Utuh', 'Keberhasilan Perjalanan'],
      symbolism: 'Penari dalam lingkaran daun salam hijau dikelilingi empat penjaga penjuru alam, merayakan penyelesaian perjalanan dengan anggun.',
      question: 'Pencapaian batin apa yang patut kamu rayakan dan syukuri dari perjalanan hidupmu sejauh ini?',
    },
  };

  const selected = tarotCards[cardNum] || tarotCards[1];
  return {
    cardNumber: cardNum,
    cardName: selected.name,
    arcanaNameId: selected.idName,
    keywords: selected.keywords,
    symbolism: selected.symbolism,
    reflectiveQuestion: selected.question,
  };
}

export function calculateLoShuGrid(day: number, month: number, year: number): LoShuGridResult {
  // Collect all digits
  const dateStr = `${day}${month}${year}`;
  const counts: Record<number, number> = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0,
  };

  for (const ch of dateStr) {
    const digit = parseInt(ch, 10);
    if (digit >= 1 && digit <= 9) {
      counts[digit] = (counts[digit] || 0) + 1;
    }
  }

  const presentNumbers: number[] = [];
  const missingNumbers: number[] = [];

  for (let i = 1; i <= 9; i++) {
    if (counts[i] > 0) {
      presentNumbers.push(i);
    } else {
      missingNumbers.push(i);
    }
  }

  // Pre-defined arrows in Lo Shu:
  // 4 9 2
  // 3 5 7
  // 8 1 6
  const arrowDefs = [
    {
      name: 'Garis Pikiran & Intelek (4-9-2)',
      description: 'Menunjukkan kemampuan memori analitis, daya serap logika, dan pemikiran terstruktur.',
      numbers: [4, 9, 2],
    },
    {
      name: 'Garis Jiwa & Spiritualitas (3-5-7)',
      description: 'Menunjukkan kepekaan emosi, intuisi batin, welas asih, dan ketenangan jiwa.',
      numbers: [3, 5, 7],
    },
    {
      name: 'Garis Praktikal & Aksi (8-1-6)',
      description: 'Menunjukkan ketelitian eksekusi fisik, ketekunan bekerja, dan kepraktisan materi.',
      numbers: [8, 1, 6],
    },
    {
      name: 'Garis Tekad & Ketabahan (1-5-9)',
      description: 'Kemauan kuat yang pantang menyerah sebelum tujuan tercapai.',
      numbers: [1, 5, 9],
    },
    {
      name: 'Garis Perencanaan (4-3-8)',
      description: 'Bakat merancang strategi, menata detail urutan, dan visi jangka panjang.',
      numbers: [4, 3, 8],
    },
    {
      name: 'Garis Kemauan & Disiplin (2-5-8)',
      description: 'Keseimbangan tekad batin dan keteguhan langkah nyata.',
      numbers: [2, 5, 8],
    },
    {
      name: 'Garis Aktivitas & Eksekusi (2-7-6)',
      description: 'Daya gerak dinamis dan kemampuan mengubah energi menjadi aksi nyata.',
      numbers: [2, 7, 6],
    },
  ];

  const arrows = arrowDefs.map((def) => {
    const isComplete = def.numbers.every((num) => counts[num] > 0);
    return {
      ...def,
      isComplete,
    };
  });

  return {
    counts,
    presentNumbers,
    missingNumbers,
    arrows,
  };
}

export function checkKarmicDebt(day: number, month: number, year: number): KarmicDebtResult {
  const karmicNumbers = [13, 14, 16, 19];
  const found: number[] = [];

  // Check day of birth
  if (karmicNumbers.includes(day)) {
    found.push(day);
  }

  // Check sub-sums of life path
  const sumDayMonth = day + month;
  if (karmicNumbers.includes(sumDayMonth) && !found.includes(sumDayMonth)) {
    found.push(sumDayMonth);
  }

  const detailsDb: Record<number, { title: string; theme: string; growthAdvice: string }> = {
    13: {
      title: 'Pelajaran Ketekunan (13/4)',
      theme: 'Mengubah rasa malas atau frustrasi menjadi ketabahan langkah teratur.',
      growthAdvice: 'Fokus pada satu tugas sederhana setiap hari. Hindari mencari jalan pintas instan; keindahanmu mekar melalui ketelatenan.',
    },
    14: {
      title: 'Pelajaran Keseimbangan Kebebasan (14/5)',
      theme: 'Mengendalikan dorongan impulsif dan menikmati kebebasan yang bertanggung jawab.',
      growthAdvice: 'Tetapkan batas sehat dalam menikmati hiburan. Latihlah disiplin kecil agar energimu yang melimpah tidak tercerai-berai.',
    },
    16: {
      title: 'Pelajaran Pelepasan Ego (16/7)',
      theme: 'Meruntuhkan kesombongan batin dan membangun ketulusan batin yang sejati.',
      growthAdvice: 'Angka 16 bukan pertanda buruk. Ini tema belajar tentang melepas ego palsu; banyak orang justru tumbuh paling besar dan bercahaya di sini.',
    },
    19: {
      title: 'Pelajaran Kemandirian & Kerjasama (19/1)',
      theme: 'Belajar meminta dan menerima pertolongan tanpa merasa harga diri terluka.',
      growthAdvice: 'Bukan tanda kelemahan untuk meminta bantuan. Izinkan orang lain menjadi bagian dari kesuksesanmu.',
    },
  };

  const details = found.map((num) => ({
    number: num,
    title: detailsDb[num]?.title || `Tema Pelajaran ${num}`,
    theme: detailsDb[num]?.theme || 'Tema belajar untuk pertumbuhan kesadaran batin.',
    growthAdvice: detailsDb[num]?.growthAdvice || 'Renungkan tema ini sebagai ruang bertumbuh yang memperkaya jiwamu.',
  }));

  return {
    foundNumbers: found,
    details,
  };
}

export function generatePetaDiri(
  fullName: string,
  birthDateString: string,
  birthTime?: string,
  birthCity?: string
): FullPetaDiriResult | null {
  if (!birthDateString) return null;
  const parts = birthDateString.split('-');
  if (parts.length !== 3) return null;

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;

  const lifePath = calculateLifePath(day, month, year);
  const personalYear = calculatePersonalYear(day, month, 2026);
  const tarotCard = calculateTarotBirthCard(day, month, year);
  const loShu = calculateLoShuGrid(day, month, year);
  const karmicDebt = checkKarmicDebt(day, month, year);

  return {
    name: fullName.trim() || 'Sahabat Lintang',
    birthDateStr: `${day} ${[
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ][month - 1]} ${year}`,
    birthTime,
    birthCity,
    lifePath,
    personalYear,
    tarotCard,
    loShu,
    karmicDebt,
  };
}
