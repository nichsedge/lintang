import React, { useState } from 'react';
import { Sparkles, Info, Check, AlertCircle } from 'lucide-react';
import { LoShuCanvas } from './LoShuCanvas';

interface LoShuInteractiveGridProps {
  presentNumbers: number[];
  counts: Record<number, number>;
}

export const LoShuInteractiveGrid: React.FC<LoShuInteractiveGridProps> = ({
  presentNumbers,
  counts,
}) => {
  const [selectedNode, setSelectedNode] = useState<number>(5);
  const [selectedPlane, setSelectedPlane] = useState<'all' | 'mental' | 'soul' | 'practical' | 'planning' | 'will' | 'action'>('all');

  const nodeDetails: Record<number, { title: string; category: string; element: string; wisdom: string }> = {
    4: { title: 'Keteraturan & Struktur Logika', category: 'Bidang Pikiran (Mental)', element: 'Kayu', wisdom: 'Mengatur urutan kerja dan menjaga ketertiban teknis.' },
    9: { title: 'Visi, Cita-cita & Kematangan', category: 'Bidang Pikiran (Mental)', element: 'Api', wisdom: 'Melihat potensi masa depan dan menyempurnakan siklus pengalaman.' },
    2: { title: 'Kepekaan Rasa & Diplomasi', category: 'Bidang Pikiran (Mental)', element: 'Bumi', wisdom: 'Menangkap suasana hati sekitar dan menjaga kelembutan interaksi.' },
    3: { title: 'Ekspresi Kreatif & Imajinasi', category: 'Bidang Jiwa (Emotional)', element: 'Kayu', wisdom: 'Menyalurkan ide menjadi kata-kata, seni, dan komunikasi yang menghidupkan.' },
    5: { title: 'Pusat Keseimbangan & Fleksibilitas', category: 'Bidang Jiwa (Emotional)', element: 'Bumi', wisdom: 'Inti stabilitas batin yang menghubungkan semua bidang kesadaran hidup.' },
    7: { title: 'Kedalaman Filosofis & Refleksi', category: 'Bidang Jiwa (Emotional)', element: 'Logam', wisdom: 'Mencari hikmah di balik peristiwa dan mendengarkan keheningan jiwa.' },
    8: { title: 'Ketekunan Kerja & Ketahanan Fisik', category: 'Bidang Aksi (Physical)', element: 'Bumi', wisdom: 'Mengubah ide abstrak menjadi kenyataan fisik dan kemakmuran materi.' },
    1: { title: 'Inisiatif Mandiri & Keberanian Awal', category: 'Bidang Aksi (Physical)', element: 'Air', wisdom: 'Kemampuan berdiri tegak dan membuka jalan baru tanpa bergantung pada orang lain.' },
    6: { title: 'Pengabdian & Rasa Harmoni Estetis', category: 'Bidang Aksi (Physical)', element: 'Logam', wisdom: 'Menciptakan rasa aman bagi orang tersayang dan merawat keindahan ruang hidup.' },
  };

  const getPlaneNodes = () => {
    switch (selectedPlane) {
      case 'mental': return [4, 9, 2];
      case 'soul': return [3, 5, 7];
      case 'practical': return [8, 1, 6];
      case 'planning': return [4, 3, 8];
      case 'will': return [9, 5, 1];
      case 'action': return [2, 7, 6];
      default: return presentNumbers;
    }
  };

  const activeDisplayNodes = selectedPlane === 'all' ? presentNumbers : getPlaneNodes();

  const currentNode = nodeDetails[selectedNode] || nodeDetails[5];
  const nodeCount = counts[selectedNode] || 0;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#C2673F] tracking-wider">
            Kisi Sembilan · Lo Shu 3×3 Interaktif
          </span>
          <h3 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
            Peta Geometri Energi Kelahiran
          </h3>
        </div>
        <span className="text-xs text-gray-500">
          Klik angka manapun di kisi atau tombol bidang untuk eksplorasi
        </span>
      </div>

      {/* Plane Filter Pills */}
      <div className="flex flex-wrap gap-1.5 text-xs">
        <button
          onClick={() => setSelectedPlane('all')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            selectedPlane === 'all' ? 'bg-[#1F2A44] text-white shadow-xs' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Semua Angka Hadir
        </button>
        <button
          onClick={() => setSelectedPlane('mental')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            selectedPlane === 'mental' ? 'bg-[#C2673F] text-white shadow-xs' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Pikiran (4-9-2)
        </button>
        <button
          onClick={() => setSelectedPlane('soul')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            selectedPlane === 'soul' ? 'bg-[#C9A45C] text-[#1F2A44] font-bold shadow-xs' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Jiwa (3-5-7)
        </button>
        <button
          onClick={() => setSelectedPlane('practical')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            selectedPlane === 'practical' ? 'bg-[#8A9A7B] text-white shadow-xs' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Aksi (8-1-6)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Interactive 3x3 Canvas */}
        <div className="md:col-span-5 flex justify-center">
          <div className="p-2 rounded-2xl bg-[#1F2A44] border-2 border-[#C9A45C]/40 shadow-xl">
            <LoShuCanvas
              activeNodes={activeDisplayNodes}
              lines={[[8, 5], [5, 2], [5, 9]]}
              size={180}
              interactive={true}
              showLabels={true}
              onNodeClick={(num) => setSelectedNode(num)}
            />
          </div>
        </div>

        {/* Selected Node Details Card */}
        <div className="md:col-span-7 space-y-3">
          <div className="p-5 rounded-2xl bg-[#F4EDE1]/70 border border-[#C9A45C]/40 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#C2673F]">
                  {currentNode.category} · Elemen {currentNode.element}
                </span>
                <h4 className="font-serif-cormorant text-2xl font-bold text-[#1F2A44]">
                  Angka {selectedNode}: {currentNode.title}
                </h4>
              </div>

              <div className="w-10 h-10 rounded-xl bg-[#1F2A44] text-[#C9A45C] font-mono font-bold text-lg flex items-center justify-center shadow">
                {selectedNode}
              </div>
            </div>

            <p className="text-xs text-[#1F2A44]/80 leading-relaxed font-sans-dm">
              {currentNode.wisdom}
            </p>

            <div className="pt-2 border-t border-[#1F2A44]/10 flex items-center gap-2 text-xs">
              {nodeCount > 0 ? (
                <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Muncul {nodeCount}x di tanggal lahirmu (Potensi Alami)</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-amber-800 font-semibold">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Tidak muncul (Karmic Lesson / Pelajaran yang perlu dilatih sadar)</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl bg-gray-50 border border-gray-200">
              <div className="font-bold text-[#1F2A44]">4 · 9 · 2</div>
              <div className="text-[9px] text-[#C2673F]">Bidang Pikiran</div>
            </div>
            <div className="p-2 rounded-xl bg-gray-50 border border-gray-200">
              <div className="font-bold text-[#1F2A44]">3 · 5 · 7</div>
              <div className="text-[9px] text-[#C9A45C]">Bidang Jiwa</div>
            </div>
            <div className="p-2 rounded-xl bg-gray-50 border border-gray-200">
              <div className="font-bold text-[#1F2A44]">8 · 1 · 6</div>
              <div className="text-[9px] text-[#8A9A7B]">Bidang Aksi</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
