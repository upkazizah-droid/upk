export function generateAndDownloadCertificate({
  studentName,
  studentClass,
  score,
  total,
  hasBadge,
  date,
  recordId,
  characterName
}: {
  studentName: string;
  studentClass: string;
  score: number;
  total: number;
  hasBadge: boolean;
  date: string;
  recordId: string;
  characterName: string;
}) {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 1130;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle radial gradient center
  const radial = ctx.createRadialGradient(800, 565, 50, 800, 565, 800);
  radial.addColorStop(0, '#1e293b');
  radial.addColorStop(1, '#090d16');
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Outer Gold Border
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 10;
  ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

  // Inner Thin Cyan/Gold Border
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

  // Corner decorative flourishes
  const corners = [
    [70, 70],
    [canvas.width - 70, 70],
    [70, canvas.height - 70],
    [canvas.width - 70, canvas.height - 70]
  ];
  ctx.fillStyle = '#f59e0b';
  corners.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fill();
  });

  // Header Subtitle / Logo Area
  ctx.textAlign = 'center';
  ctx.fillStyle = '#94a3b8';
  ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '4px';
  ctx.fillText('PROGRAM PENDIDIKAN PSIKOSOSIAL & ANTI-BULI KEBANGSAAN', 800, 140);

  // Main Title
  ctx.fillStyle = '#f8fafc';
  ctx.font = '800 48px "Outfit", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('SIJIL PENCAPAIAN DIGITAL', 800, 210);

  // Game Subtitle
  ctx.fillStyle = '#38bdf8';
  ctx.font = '700 24px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillText('SIMULASI INTERAKTIF: POV: MAIN CHARACTER', 800, 260);

  // Divider Line
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(400, 300);
  ctx.lineTo(1200, 300);
  ctx.stroke();

  // Certificate Statement
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '400 22px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '0px';
  ctx.fillText('Dengan ini disahkan dan diperakui bahawa', 800, 360);

  // Student Name (Prominent)
  ctx.fillStyle = '#fbbf24';
  ctx.font = '800 52px "Outfit", sans-serif';
  ctx.fillText(studentName.toUpperCase(), 800, 440);

  // Class & Avatar details
  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`TINGKATAN: ${studentClass.toUpperCase()}  •  AVATAR: ${characterName.toUpperCase()}`, 800, 500);

  // Citation Paragraph
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '400 21px "Plus Jakarta Sans", sans-serif';
  const line1 = `Telah berjaya menyelesaikan kesemua 10 Cabaran Psikologi & Anti-Buli`;
  const line2 = `dengan mencatatkan markah ${score} daripada ${total} cabaran (${Math.round((score / total) * 100)}%).`;
  ctx.fillText(line1, 800, 570);
  ctx.fillText(line2, 800, 605);

  // Helper for drawing rounded rect safely across all browsers
  const drawRoundedBox = (x: number, y: number, w: number, h: number, r: number) => {
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(x, y, w, h, r);
    } else {
      ctx.rect(x, y, w, h);
    }
  };

  // Badge Status Box
  if (hasBadge) {
    ctx.fillStyle = 'rgba(245, 158, 11, 0.12)';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    drawRoundedBox(460, 660, 680, 90, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#fbbf24';
    ctx.font = '800 26px "Outfit", sans-serif';
    ctx.fillText("★ ANUGERAH: LENCANA I'M A LOCAL HERO ★", 800, 715);
  } else {
    ctx.fillStyle = 'rgba(56, 189, 248, 0.1)';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    drawRoundedBox(500, 660, 600, 90, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = '700 24px "Outfit", sans-serif';
    ctx.fillText('PENGIKTIRAFAN PENYERTAAN AKTIF & KESEDARAN KENDIRI', 800, 715);
  }

  // Bottom Metadata: Date, ID, Signatures
  // Left: ID & Tarikh
  ctx.textAlign = 'left';
  ctx.fillStyle = '#64748b';
  ctx.font = '400 16px "JetBrains Mono", monospace';
  ctx.fillText(`ID VERIFIKASI: ${recordId}`, 120, 930);
  ctx.fillText(`TARIKH PENYEMPURNAAN: ${date}`, 120, 960);
  ctx.fillText(`STATUS: SAH DIVERIFIKASI SECARA DIGITAL`, 120, 990);

  // Right: Signature Mock
  ctx.textAlign = 'center';
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(1200, 940);
  ctx.lineTo(1460, 940);
  ctx.stroke();

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '700 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('UNIT BIMBINGAN & KAUNSELING', 1330, 970);
  ctx.fillStyle = '#64748b';
  ctx.font = '400 15px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Kementerian Pendidikan & Hal Ehwal Murid', 1330, 995);

  // Center Gold Seal Graphic
  ctx.beginPath();
  ctx.arc(800, 920, 50, 0, Math.PI * 2);
  ctx.fillStyle = '#f59e0b';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(800, 920, 44, 0, Math.PI * 2);
  ctx.fillStyle = '#0f172a';
  ctx.fill();

  ctx.fillStyle = '#fbbf24';
  ctx.font = '800 16px "Outfit", sans-serif';
  ctx.fillText('SEAL', 800, 915);
  ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('OFFICIAL', 800, 932);

  // Convert to image and trigger download
  const imageURL = canvas.toDataURL('image/png');
  const downloadLink = document.createElement('a');
  downloadLink.href = imageURL;
  const safeName = studentName.replace(/[^a-zA-Z0-9]/g, '_');
  downloadLink.download = `Sijil_POV_MainCharacter_${safeName}.png`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
