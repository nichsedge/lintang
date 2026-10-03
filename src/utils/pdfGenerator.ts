import { jsPDF } from 'jspdf';
import { FullPetaDiriResult } from './numerology';

/**
 * Generates an elegant, single-page editorial A4 PDF reflection report
 * matching Lintang Studio Peta Diri visual identity.
 */
export function generateReflectionPdf(petaDiri: FullPetaDiriResult): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182mm

  // Background subtle cream wash
  doc.setFillColor(252, 250, 246);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Outer gold hairline border frame
  doc.setDrawColor(201, 164, 92);
  doc.setLineWidth(0.4);
  doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

  // Inner subtle border
  doc.setDrawColor(220, 210, 195);
  doc.setLineWidth(0.2);
  doc.rect(9.5, 9.5, pageWidth - 19, pageHeight - 19);

  let currentY = 16;

  // --- HEADER SECTION ---
  // Top Banner / Header Fill
  doc.setFillColor(31, 42, 68); // #1F2A44
  doc.roundedRect(margin, currentY, contentWidth, 22, 2, 2, 'F');

  // Studio Wordmark
  doc.setFont('times', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('LINTANG', margin + 6, currentY + 9);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(201, 164, 92); // Gold
  doc.text('STUDIO PETA DIRI · EDISI 2026', margin + 6, currentY + 15);

  // Title right side
  doc.setFont('times', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(244, 237, 225);
  doc.text('Lembar Refleksi Diri & Potensi', pageWidth - margin - 6, currentY + 9, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(180, 195, 215);
  doc.text('“Bukan ramalan, tapi cermin.”', pageWidth - margin - 6, currentY + 15, { align: 'right' });

  currentY += 26;

  // --- USER PROFILE BANNER ---
  doc.setFillColor(244, 237, 225); // Cream
  doc.setDrawColor(201, 164, 92);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, currentY, contentWidth, 14, 2, 2, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(31, 42, 68);
  doc.text(petaDiri.name || 'Sahabat Lintang', margin + 6, currentY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  const birthInfo = `Lahir: ${petaDiri.birthDateStr}${petaDiri.birthCity ? ` di ${petaDiri.birthCity}` : ''}${petaDiri.birthTime ? ` pukul ${petaDiri.birthTime}` : ''}`;
  doc.text(birthInfo, margin + 6, currentY + 11);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(194, 103, 63); // Terracotta
  doc.text(`Kode Personal: LP-${petaDiri.lifePath.number} · PY-${petaDiri.personalYear.personalYear}`, pageWidth - margin - 6, currentY + 8.5, { align: 'right' });

  currentY += 18;

  // --- 3 CORE CARDS (Life Path, Musim Diri, Tarot) ---
  const colWidth = (contentWidth - 6) / 3; // ~58.6mm each

  // Card 1: Life Path
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(210, 200, 185);
  doc.setLineWidth(0.2);
  doc.roundedRect(margin, currentY, colWidth, 34, 2, 2, 'FD');

  // Colored top tab
  doc.setFillColor(194, 103, 63);
  doc.roundedRect(margin, currentY, colWidth, 4, 1, 1, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(255, 255, 255);
  doc.text('NUMEROLOGI PYTHAGORAS', margin + 3, currentY + 3);

  doc.setFont('times', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(194, 103, 63);
  doc.text(`${petaDiri.lifePath.number}`, margin + 4, currentY + 12);

  doc.setFont('times', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(31, 42, 68);
  doc.text(petaDiri.lifePath.name, margin + 14, currentY + 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(70, 80, 95);
  const lpSummary = `Kekuatan: ${petaDiri.lifePath.strengths.slice(0, 3).join(', ')}`;
  const lpLines = doc.splitTextToSize(lpSummary, colWidth - 8);
  doc.text(lpLines, margin + 4, currentY + 18);

  const lpGrowth = `Fokus: ${petaDiri.lifePath.growthAreas.slice(0, 2).join(', ')}`;
  const growthLines = doc.splitTextToSize(lpGrowth, colWidth - 8);
  doc.text(growthLines, margin + 4, currentY + 26);

  // Card 2: Musim Diri 2026
  const col2X = margin + colWidth + 3;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(col2X, currentY, colWidth, 34, 2, 2, 'FD');

  doc.setFillColor(201, 164, 92);
  doc.roundedRect(col2X, currentY, colWidth, 4, 1, 1, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(255, 255, 255);
  doc.text('MUSIM DIRI 2026 (9 TAHUN)', col2X + 3, currentY + 3);

  doc.setFont('times', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(201, 164, 92);
  doc.text(`${petaDiri.personalYear.personalYear}`, col2X + 4, currentY + 12);

  doc.setFont('times', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(31, 42, 68);
  doc.text(petaDiri.personalYear.stageName, col2X + 13, currentY + 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(70, 80, 95);
  const seasonTheme = `Tema: ${petaDiri.personalYear.theme}`;
  const seasonLines = doc.splitTextToSize(seasonTheme, colWidth - 8);
  doc.text(seasonLines, col2X + 4, currentY + 18);

  const seasonAdvice = `Saran: ${petaDiri.personalYear.lintangAdvice}`;
  const adviceLines = doc.splitTextToSize(seasonAdvice, colWidth - 8);
  doc.text(adviceLines, col2X + 4, currentY + 25);

  // Card 3: Tarot Birth Card
  const col3X = margin + (colWidth + 3) * 2;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(col3X, currentY, colWidth, 34, 2, 2, 'FD');

  doc.setFillColor(138, 154, 123); // Sage green #8A9A7B
  doc.roundedRect(col3X, currentY, colWidth, 4, 1, 1, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(255, 255, 255);
  doc.text('KARTU LAHIR TAROT', col3X + 3, currentY + 3);

  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(138, 154, 123);
  doc.text(`№ ${petaDiri.tarotCard.cardNumber}`, col3X + 4, currentY + 11.5);

  doc.setFont('times', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(31, 42, 68);
  doc.text(petaDiri.tarotCard.cardName, col3X + 17, currentY + 11);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(6.8);
  doc.setTextColor(70, 80, 95);
  const tarotKeyword = `Arketipe: ${petaDiri.tarotCard.keywords.slice(0, 3).join(' · ')}`;
  doc.text(tarotKeyword, col3X + 4, currentY + 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  const tarotQ = `"${petaDiri.tarotCard.reflectiveQuestion}"`;
  const tarotQLines = doc.splitTextToSize(tarotQ, colWidth - 8);
  doc.text(tarotQLines, col3X + 4, currentY + 23);

  currentY += 38;

  // --- SECTION: REFLEKSI KARAKTER & NARASI LINTANG ---
  doc.setFillColor(244, 247, 250);
  doc.setDrawColor(210, 220, 230);
  doc.setLineWidth(0.2);
  doc.roundedRect(margin, currentY, contentWidth, 24, 2, 2, 'FD');

  // Left accent line
  doc.setFillColor(194, 103, 63);
  doc.rect(margin, currentY, 2.5, 24, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(194, 103, 63);
  doc.text('REFLEKSI KARAKTER & CERMIN DIRI', margin + 6, currentY + 5);

  doc.setFont('times', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(31, 42, 68);
  const quoteLines = doc.splitTextToSize(`“${petaDiri.lifePath.lintangReflection}”`, contentWidth - 12);
  doc.text(quoteLines, margin + 6, currentY + 11);

  currentY += 28;

  // --- 2 COLUMNS: KISI RASI LO SHU & LANGKAH PRAKTIS MINGGUAN ---
  const halfColWidth = (contentWidth - 4) / 2; // ~89mm

  // Box Left: Kisi Sembilan Lo Shu
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(220, 215, 205);
  doc.roundedRect(margin, currentY, halfColWidth, 54, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(31, 42, 68);
  doc.text('KISI SEMBILAN · RASI ANGKA LO SHU', margin + 5, currentY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(100, 116, 139);
  doc.text('Pemetaan energi rasi berdasarkan tanggal kelahiran:', margin + 5, currentY + 10);

  // Mini Lo Shu 3x3 Grid
  const gridStartX = margin + 6;
  const gridStartY = currentY + 13;
  const cellSize = 9;

  const loShuLayout = [
    [4, 9, 2],
    [3, 5, 7],
    [8, 1, 6]
  ];

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const num = loShuLayout[r][c];
      const count = petaDiri.loShu.counts[num] || 0;
      const x = gridStartX + c * cellSize;
      const y = gridStartY + r * cellSize;

      if (count > 0) {
        doc.setFillColor(31, 42, 68);
        doc.rect(x, y, cellSize - 1, cellSize - 1, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(201, 164, 92);
        doc.text(`${num}`, x + 3.5, y + 5.5);
      } else {
        doc.setFillColor(245, 245, 245);
        doc.rect(x, y, cellSize - 1, cellSize - 1, 'F');
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(170, 175, 185);
        doc.text(`${num}`, x + 3.5, y + 5.5);
      }
    }
  }

  // Grid details next to 3x3
  const infoX = gridStartX + 30;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(31, 42, 68);
  doc.text('Angka Hadir:', infoX, gridStartY + 4);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(194, 103, 63);
  doc.text(petaDiri.loShu.presentNumbers.join(', ') || '-', infoX + 16, gridStartY + 4);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(31, 42, 68);
  doc.text('Rasi Kosong:', infoX, gridStartY + 10);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(120, 130, 140);
  doc.text(petaDiri.loShu.missingNumbers.join(', ') || 'Lengkap', infoX + 16, gridStartY + 10);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(31, 42, 68);
  doc.text('Garis Rasi:', infoX, gridStartY + 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.2);
  doc.setTextColor(70, 80, 95);
  const completeArrows = petaDiri.loShu.arrows.filter((a) => a.isComplete);
  const arrowNames = completeArrows.map((a) => a.name).slice(0, 2);
  const arrowText = arrowNames.length > 0 ? arrowNames.join(' & ') : 'Sebaran energi alami';
  const arrowLines = doc.splitTextToSize(arrowText, halfColWidth - 36);
  doc.text(arrowLines, infoX, gridStartY + 20);

  // Balance Note
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  const balanceText = petaDiri.loShu.missingNumbers.length > 0
    ? `Ruang penguatan: menyeimbangkan rasi angka ${petaDiri.loShu.missingNumbers.join(', ')} melalui tindakan terarah.`
    : 'Kisi angka seimbang dan lengkap secara harmonis.';
  const balanceNote = doc.splitTextToSize(balanceText, halfColWidth - 10);
  doc.text(balanceNote, margin + 5, currentY + 44);

  // Box Right: Rekomendasi Langkah Praktis Minggu Ini
  const rightColX = margin + halfColWidth + 4;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(220, 215, 205);
  doc.roundedRect(rightColX, currentY, halfColWidth, 54, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(138, 154, 123);
  doc.text('REKOMENDASI PRAKTIS MINGGU INI', rightColX + 5, currentY + 6);

  doc.setFont('times', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(31, 42, 68);
  const actionLines = doc.splitTextToSize(`“${petaDiri.lifePath.practicalWeeklyAction}”`, halfColWidth - 10);
  doc.text(actionLines, rightColX + 5, currentY + 13);

  // 3 Mindful Checklist Items for Personal Practice
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('3 JEDA KONTEMPLASI MINGGUAN:', rightColX + 5, currentY + 28);

  const checklistItems = [
    'Luangkan waktu 10 menit hening tanpa gawai di pagi hari.',
    'Amati keputusan yang dipicu oleh dorongan versus kesadaran.',
    'Tuliskan satu hal yang disyukuri dan satu ruang bertumbuh.'
  ];

  checklistItems.forEach((item, idx) => {
    const itemY = currentY + 34 + idx * 6;
    // Checkbox square
    doc.setDrawColor(201, 164, 92);
    doc.setLineWidth(0.3);
    doc.rect(rightColX + 5, itemY - 2.5, 3, 3);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.6);
    doc.setTextColor(60, 70, 85);
    doc.text(item, rightColX + 10, itemY);
  });

  currentY += 58;

  // --- SECTION: RUANG CATATAN & JURNAL REFLEKSI (TULIS TANGAN) ---
  doc.setFillColor(253, 251, 248);
  doc.setDrawColor(210, 200, 185);
  doc.setLineWidth(0.2);
  doc.roundedRect(margin, currentY, contentWidth, 38, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(201, 164, 92);
  doc.text('RUANG JURNAL & REFLEKSI PRIBADI (UNTUK DITULIS TANGAN)', margin + 6, currentY + 5.5);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(6.8);
  doc.setTextColor(130, 140, 150);
  doc.text('Apa insight terbesar yang kamu rasakan hari ini mengenai pola dan langkah ke depanmu?', margin + 6, currentY + 10);

  // Dotted/light journal lines for writing
  doc.setDrawColor(225, 220, 210);
  doc.setLineWidth(0.2);
  for (let l = 0; l < 4; l++) {
    const lineY = currentY + 16 + l * 5.5;
    doc.line(margin + 6, lineY, pageWidth - margin - 6, lineY);
  }

  currentY += 42;

  // --- FOOTER SECTION ---
  doc.setDrawColor(201, 164, 92);
  doc.setLineWidth(0.3);
  doc.line(margin, pageHeight - 17, pageWidth - margin, pageHeight - 17);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(120, 130, 140);
  doc.text('Lintang · Studio Peta Diri | Pendekatan Reflektif & Membumi', margin, pageHeight - 12);

  doc.setFont('helvetica', 'italic');
  doc.text('Bukan ramalan absolut. Data momen kelahiran diperlakukan sebagai cermin kesadaran diri.', margin, pageHeight - 9);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(31, 42, 68);
  doc.text('lintangpetadiri.com · @lintang.petadiri', pageWidth - margin, pageHeight - 12, { align: 'right' });

  // Generate clean filename
  const cleanName = (petaDiri.name || 'sahabat')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-');
  const filename = `lembar-refleksi-lintang-${cleanName}.pdf`;

  // Download PDF
  doc.save(filename);
}
