import React, { useState } from 'react';
import { Layers, Calendar, Clock, Users, Gift, HelpCircle, ArrowRight, Check } from 'lucide-react';
import { SERVICES, ServiceItem } from '../data/blueprintData';
import { LoShuCanvas } from './LoShuCanvas';

interface ServiceArchitectureProps {
  onSelectServiceToOrder: (service: ServiceItem) => void;
}

export const ServiceArchitecture: React.FC<ServiceArchitectureProps> = ({
  onSelectServiceToOrder,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceItem | null>(null);

  const categories = [
    { id: 'all', label: 'Semua Layanan (12)' },
    { id: 'seri-angka', label: 'Seri Angka', hint: 'Tanggal lahir saja' },
    { id: 'seri-langit', label: 'Seri Langit', hint: 'Butuh jam & kota' },
    { id: 'seri-relasi', label: 'Seri Relasi', hint: 'Dua orang' },
    { id: 'paket', label: 'Paket & Pendampingan', hint: 'Lintas lini' },
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <div className="space-y-16 py-6">
      {/* SECTION HEADER: ARSITEKTUR LAYANAN */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#C9A45C]/20 shadow-sm space-y-8">
        <div className="border-b border-[#1F2A44]/10 pb-6 max-w-4xl">
          <div className="text-xs uppercase tracking-widest text-[#C2673F] font-semibold mb-1">
            Bab 3 & 4 · Struktur Produk
          </div>
          <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#1F2A44]">
            Arsitektur Layanan & Katalog
          </h2>
          <p className="text-sm text-[#1F2A44]/70 mt-1">
            Satu brand induk, empat lini, dikelompokkan menurut kelengkapan data yang dibutuhkan pelanggan.
          </p>
        </div>

        {/* Tree Architecture Diagram (Bab 3) */}
        <div className="bg-[#1F2A44] text-[#F4EDE1] rounded-2xl p-6 sm:p-8 border border-[#C9A45C]/40 relative overflow-hidden shadow-lg">
          <div className="text-center mb-6">
            <div className="inline-block px-6 py-2 rounded-xl bg-[#C9A45C] text-[#1F2A44] font-serif-cormorant text-2xl font-bold shadow-md">
              lintang
            </div>
            <div className="text-[11px] text-[#C9A45C] tracking-[0.25em] uppercase font-semibold mt-1">
              Studio Peta Diri
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {/* Lini 1: Seri Angka */}
            <div className="bg-[#172136] rounded-xl p-4 border border-[#C2673F]/60 text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif-cormorant text-lg font-bold text-[#C9A45C]">Seri Angka</span>
                <Calendar className="w-4 h-4 text-[#C2673F]" />
              </div>
              <div className="text-[11px] text-[#C2673F] font-semibold uppercase mb-2">Tanggal Lahir Saja</div>
              <p className="text-xs text-[#F4EDE1]/75 mb-3 leading-snug">
                Pintu masuk ramah dan instan tanpa perlu tahu jam lahir akurat.
              </p>
              <ul className="text-[11px] space-y-1 text-[#F4EDE1]/90">
                <li>• Kode Diri (Pythagoras)</li>
                <li>• Kisi Sembilan (Lo Shu)</li>
                <li>• Jejak Karma</li>
                <li>• Musim Diri</li>
                <li>• Kartu Lahir (Tarot)</li>
              </ul>
            </div>

            {/* Lini 2: Seri Langit */}
            <div className="bg-[#172136] rounded-xl p-4 border border-[#C9A45C]/60 text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif-cormorant text-lg font-bold text-[#C9A45C]">Seri Langit</span>
                <Clock className="w-4 h-4 text-[#C9A45C]" />
              </div>
              <div className="text-[11px] text-[#C9A45C] font-semibold uppercase mb-2">Butuh Jam & Kota Lahir</div>
              <p className="text-xs text-[#F4EDE1]/75 mb-3 leading-snug">
                Kedalaman kosmik Barat dan Timur untuk resolusi tinggi.
              </p>
              <ul className="text-[11px] space-y-1 text-[#F4EDE1]/90">
                <li>• Peta Bintang (Astrologi)</li>
                <li>• Empat Pilar (BaZi)</li>
                <li>• Desain Diri (Human Design)</li>
                <li>• Bayang ke Cahaya (Gene Keys)</li>
              </ul>
            </div>

            {/* Lini 3: Seri Relasi */}
            <div className="bg-[#172136] rounded-xl p-4 border border-[#8A9A7B]/60 text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif-cormorant text-lg font-bold text-[#C9A45C]">Seri Relasi</span>
                <Users className="w-4 h-4 text-[#8A9A7B]" />
              </div>
              <div className="text-[11px] text-[#8A9A7B] font-semibold uppercase mb-2">Data Dua Orang</div>
              <p className="text-xs text-[#F4EDE1]/75 mb-3 leading-snug">
                Membandingkan dua peta lahir: titik cocok dan bahasa komunikasi.
              </p>
              <ul className="text-[11px] space-y-1 text-[#F4EDE1]/90">
                <li>• Dua Lintang</li>
                <li>• Dua Lintang + Sesi Temu</li>
              </ul>
            </div>

            {/* Lini 4: Paket & Pendampingan */}
            <div className="bg-[#172136] rounded-xl p-4 border border-white/20 text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif-cormorant text-lg font-bold text-[#C9A45C]">Paket & Sesi</span>
                <Gift className="w-4 h-4 text-[#F4EDE1]" />
              </div>
              <div className="text-[11px] text-[#F4EDE1]/70 font-semibold uppercase mb-2">Gabungan Lintas Lini</div>
              <p className="text-xs text-[#F4EDE1]/75 mb-3 leading-snug">
                Tangga nilai mulai Rp49 ribu sampai sesi pendampingan premium.
              </p>
              <ul className="text-[11px] space-y-1 text-[#F4EDE1]/90">
                <li>• Sekilas Lintang (Entry)</li>
                <li>• Lintang Utuh (Unggulan)</li>
                <li>• Sesi Temu (Live Zoom)</li>
                <li>• Lingkar Lintang (Bulanan)</li>
                <li>• Lintang 2027 (Musiman)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-all flex flex-col items-start ${
                  isActive
                    ? 'bg-[#1F2A44] text-[#F4EDE1] shadow-md'
                    : 'bg-[#F4EDE1]/60 text-[#1F2A44] hover:bg-[#F4EDE1] border border-[#1F2A44]/10'
                }`}
              >
                <span className="font-semibold">{cat.label}</span>
                {cat.hint && (
                  <span className={`text-[10px] ${isActive ? 'text-[#C9A45C]' : 'text-[#1F2A44]/60'}`}>
                    {cat.hint}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-[#1F2A44]/10 hover:border-[#C9A45C] transition-all duration-300 ease-out transform hover:scale-105 shadow-sm hover:shadow-xl hover:shadow-[#1F2A44]/10 p-5 flex flex-col justify-between group relative hover:z-10"
            >
              <div>
                {/* Top Bar with Icon and Category */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="p-1 rounded-xl bg-[#1F2A44] shadow-sm group-hover:scale-105 transition-transform">
                    <LoShuCanvas
                      activeNodes={service.loShuActiveNodes}
                      lines={service.loShuLines}
                      size={44}
                      theme="dark"
                    />
                  </div>

                  <div className="text-right">
                    <div className="font-serif-cormorant text-lg font-bold text-[#C2673F]">
                      {service.price}
                    </div>
                    {service.priceNote && (
                      <div className="text-[10px] text-[#1F2A44]/60 max-w-[140px]">
                        {service.priceNote}
                      </div>
                    )}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className="mb-2">
                  <h3 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44] group-hover:text-[#C2673F] transition-colors leading-tight">
                    {service.name}
                  </h3>
                  <div className="text-xs uppercase tracking-wider text-[#C9A45C] font-semibold">
                    {service.subtitle}
                  </div>
                </div>

                {/* Required Data Pill */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F4EDE1] text-[#1F2A44] text-[11px] mb-3">
                  <span className="font-semibold text-[#C2673F]">Data:</span>
                  <span>{service.dataRequired}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-[#1F2A44]/80 leading-relaxed font-sans-dm mb-4">
                  {service.description}
                </p>

                {/* Feature Bullet Points */}
                {service.features && (
                  <div className="space-y-1 mb-4 pt-3 border-t border-[#1F2A44]/5 text-xs text-[#1F2A44]/75">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-[#8A9A7B] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#1F2A44]/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedServiceDetail(service)}
                  className="text-xs text-[#1F2A44]/70 hover:text-[#1F2A44] underline underline-offset-2 font-medium"
                >
                  Detail & Rasi
                </button>
                <button
                  onClick={() => onSelectServiceToOrder(service)}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-[#C2673F] hover:bg-[#d67246] rounded-xl transition-all shadow-sm flex items-center gap-1.5 font-sans-dm"
                >
                  <span>Pesan Layanan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Special Notice for Unknown Birth Time (Page 10) */}
        <div className="p-4 rounded-2xl bg-[#8A9A7B]/15 border border-[#8A9A7B]/40 text-xs text-[#1F2A44] flex items-start gap-3">
          <HelpCircle className="w-4 h-4 text-[#8A9A7B] shrink-0 mt-0.5" />
          <div>
            <strong>Jam lahir tidak diketahui?</strong> Untuk Seri Langit (Peta Bintang, BaZi, Human Design), Lintang menyediakan versi khusus tanpa Rising/Rumah Astrologi atau pilar jam. Sesuai prinsip <em>Jujur</em>, batasan akurasi ini selalu dijelaskan secara transparan kepada klien sebelum melakukan pembayaran.
          </div>
        </div>

        {/* SECTION HIGHLIGHT: SERI RELASI "DUA LINTANG" VENN DIAGRAM (PAGE 11) */}
        <div className="bg-[#1F2A44] text-[#F4EDE1] rounded-2xl p-6 sm:p-8 border border-[#C9A45C]/40 relative overflow-hidden">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold mb-1">
              Sorotan Seri Relasi · Bab 4
            </div>
            <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-white mb-2">
              Dua Lintang: Dua Peta, Satu Cerita
            </h3>
            <p className="text-xs sm:text-sm text-[#F4EDE1]/85 font-sans-dm leading-relaxed mb-6">
              Laporan Dua Lintang membaca dua peta berdampingan: di mana keduanya saling menguatkan secara alami, dan di mana perlu bahasa yang berbeda supaya saling paham.
            </p>
          </div>

          {/* Venn Diagram Visual Reproduction */}
          <div className="bg-[#172136] rounded-2xl p-6 border border-white/10 flex flex-col md:flex-row items-center justify-center gap-8 text-center">
            {/* Left Circle: Peta Kamu */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#C9A45C]/60 flex items-center justify-center relative bg-white/5">
                <LoShuCanvas
                  activeNodes={[3, 5]}
                  lines={[[3, 5]]}
                  size={48}
                  theme="dark"
                />
              </div>
              <span className="font-serif-cormorant text-sm font-bold text-[#F4EDE1] mt-2">
                Peta Kamu
              </span>
              <span className="text-[10px] text-[#F4EDE1]/60">Pola & Kebutuhanmu</span>
            </div>

            {/* Middle Intersection: Titik Temu */}
            <div className="flex flex-col items-center px-4 py-2 rounded-xl bg-[#C9A45C]/15 border border-[#C9A45C]/40">
              <div className="w-12 h-12 rounded-full bg-[#C9A45C] text-[#1F2A44] flex items-center justify-center font-bold text-lg shadow-md mb-1">
                ★
              </div>
              <span className="font-serif-cormorant text-base font-bold text-[#C9A45C]">
                Titik Temu
              </span>
              <span className="text-[10px] text-white/80 max-w-[160px]">
                Ruang sinergi, harmoni, dan kompromi sadar
              </span>
            </div>

            {/* Right Circle: Peta Dia */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#8A9A7B]/60 flex items-center justify-center relative bg-white/5">
                <LoShuCanvas
                  activeNodes={[5, 7]}
                  lines={[[5, 7]]}
                  size={48}
                  theme="dark"
                />
              </div>
              <span className="font-serif-cormorant text-sm font-bold text-[#F4EDE1] mt-2">
                Peta Dia
              </span>
              <span className="text-[10px] text-[#F4EDE1]/60">Pola & Kebutuhannya</span>
            </div>
          </div>
        </div>
      </div>

      {/* DETAIL MODAL IF SELECTED */}
      {selectedServiceDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#C9A45C]/40 shadow-2xl relative">
            <button
              onClick={() => setSelectedServiceDetail(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-1 rounded-xl bg-[#1F2A44]">
                <LoShuCanvas
                  activeNodes={selectedServiceDetail.loShuActiveNodes}
                  lines={selectedServiceDetail.loShuLines}
                  size={50}
                  theme="dark"
                />
              </div>
              <div>
                <h3 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
                  {selectedServiceDetail.name}
                </h3>
                <div className="text-xs uppercase tracking-wider text-[#C2673F] font-semibold">
                  {selectedServiceDetail.subtitle}
                </div>
              </div>
            </div>

            <p className="text-sm text-[#1F2A44]/80 leading-relaxed font-sans-dm mb-4">
              {selectedServiceDetail.description}
            </p>

            <div className="bg-[#F4EDE1] p-3 rounded-xl mb-4 text-xs">
              <div className="font-semibold text-[#1F2A44] mb-1">Data yang Dibutuhkan:</div>
              <div className="text-[#1F2A44]/80">{selectedServiceDetail.dataRequired}</div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="font-serif-cormorant text-xl font-bold text-[#C2673F]">
                {selectedServiceDetail.price}
              </div>
              <button
                onClick={() => {
                  onSelectServiceToOrder(selectedServiceDetail);
                  setSelectedServiceDetail(null);
                }}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-[#C2673F] hover:bg-[#d67246] rounded-xl transition-all shadow"
              >
                Lanjutkan Pemesanan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
