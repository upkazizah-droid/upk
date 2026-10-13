import React, { useEffect, useState } from 'react';
import { Player, PlayerAnswer, GameRecord } from '../types/game';
import { soundManager } from '../utils/audio';
import { generateAndDownloadCertificate } from '../utils/certificate';
import { BADGE_LOCAL_HERO_IMAGE } from '../data/characters';
import {
  Award,
  Download,
  CheckCircle2,
  Sparkles,
  Heart,
  Brain,
  ShieldCheck,
  Compass,
  Home
} from 'lucide-react';

interface ResultScreenProps {
  player: Player;
  answers: PlayerAnswer[];
  record: GameRecord;
  onRestart?: () => void;
  onOpenTeacher: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  player,
  answers,
  record,
  onRestart
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const isBadgeUnlocked = correctCount >= 8;

  useEffect(() => {
    if (isBadgeUnlocked) {
      soundManager.playBadgeFanfare();
    } else {
      soundManager.playSuccess();
    }
  }, [isBadgeUnlocked]);

  const handleDownload = () => {
    soundManager.playSelection();
    generateAndDownloadCertificate({
      studentName: player.name,
      studentClass: player.studentClass,
      score: correctCount,
      total: 10,
      hasBadge: isBadgeUnlocked,
      date: record.completedAt,
      recordId: record.id,
      characterName: player.character.title
    });
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  // Generate overall summary
  const getOverallSummary = () => {
    if (correctCount === 10) {
      return {
        title: 'Ketahanan Minda Sempurna (Master of Resilience)',
        desc: 'Tahniah! Anda mempamerkan kematangan emosi luar biasa, prinsip moral yang tidak goyah, dan kepekaan tinggi terhadap keselamatan rakan sekeliling.',
        color: 'text-amber-300'
      };
    } else if (correctCount >= 8) {
      return {
        title: 'Adiwira Kesejahteraan Mental & Anti-Buli',
        desc: 'Hebat! Anda berjaya mengatasi majoriti krisis psikososial dengan strategi selamat dan rasional. Anda layak menerima Lencana Pengiktirafan Rasmi!',
        color: 'text-cyan-300'
      };
    } else if (correctCount >= 5) {
      return {
        title: 'Dalam Perjalanan Membina Jati Diri',
        desc: 'Usaha yang baik. Anda memahami sebahagian konsep keselamatan emosi, namun masih cenderung terpengaruh oleh rasa takut atau tekanan rakan dalam situasi genting.',
        color: 'text-blue-300'
      };
    } else {
      return {
        title: 'Perlu Pengukuhan Bimbingan & Kaunseling',
        desc: 'Anda kerap memilih jalan keluar yang memudaratkan diri atau membiarkan buli berleluasa. Jangan risau, ini adalah ruang belajar untuk memperbetulkan cara bertindak dalam kehidupan sebenar.',
        color: 'text-rose-300'
      };
    }
  };

  const summary = getOverallSummary();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Victory / Completion Banner */}
      <div className="p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-[#0b1222] border border-slate-800 text-center space-y-6 relative overflow-hidden shadow-2xl">
        {/* Glow ambient background */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none -z-0 ${
            isBadgeUnlocked ? 'bg-amber-500/10' : 'bg-cyan-500/10'
          }`}
        />

        <div className="relative z-10 space-y-4 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/60">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>SESI SIMULASI SELESAI</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-white drop-shadow-[0_4px_16px_rgba(251,191,36,0.4)]">
            Keputusan Watak Utama: {player.name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300">
            Tingkatan / Kelas: <strong className="text-white">{player.studentClass}</strong> • Avatar Pemain: <strong className="text-cyan-300">{player.character.title}</strong>
          </p>
        </div>

        {/* Score & Badge Card */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-2">
          {/* Score Box */}
          <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col items-center justify-center">
            <span className="text-xs font-mono text-slate-400 uppercase">Skor Keseluruhan</span>
            <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono mt-1">
              <span className={correctCount >= 8 ? 'text-amber-400' : 'text-cyan-400'}>{correctCount}</span>
              <span className="text-slate-600 text-2xl">/10</span>
            </div>
            <span className="text-xs text-slate-400 mt-1">{Math.round((correctCount / 10) * 100)}% Ketepatan Keputusan</span>
          </div>

          {/* Badge Box with Realistic 3D Local Hero Image */}
          <div className="sm:col-span-2 p-5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left relative overflow-hidden">
            {isBadgeUnlocked && (
              <div className="absolute top-0 right-0 px-3 py-1 bg-amber-500/20 border-b border-l border-amber-500/40 rounded-bl-lg text-[10px] font-mono font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>ACHIEVEMENT UNLOCKED</span>
              </div>
            )}

            <div className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 shrink-0 bg-slate-950 transition-all ${
              isBadgeUnlocked 
                ? 'border-amber-400 ring-4 ring-amber-500/30 shadow-2xl shadow-amber-500/40 scale-105' 
                : 'border-slate-700 opacity-60'
            }`}>
              <img
                src={BADGE_LOCAL_HERO_IMAGE}
                alt="Badge I'm a Local Hero"
                referrerPolicy="no-referrer"
                loading="eager"
                onError={(e) => {
                  const target = e.currentTarget;
                  const rawFilename = BADGE_LOCAL_HERO_IMAGE?.split('/').pop()?.split('?')[0];
                  if (rawFilename && !target.src.includes(`/assets/images/${rawFilename}`)) {
                    target.src = `/assets/images/${rawFilename}`;
                  }
                }}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  isBadgeUnlocked ? 'filter brightness-110 contrast-105' : 'filter grayscale opacity-40'
                }`}
              />
              {!isBadgeUnlocked && (
                <div className="absolute inset-0 bg-black/75 flex items-center justify-center text-[10px] font-mono text-slate-300 font-bold uppercase tracking-wider">
                  Dikunci
                </div>
              )}
            </div>

            <div className="space-y-1.5 flex-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase block tracking-wider">
                Status Lencana Digital
              </span>
              <span className={`font-extrabold text-base sm:text-xl block tracking-wide ${isBadgeUnlocked ? 'text-amber-300 font-display' : 'text-slate-400'}`}>
                {isBadgeUnlocked ? "LENCANA: I'M A LOCAL HERO" : 'Sasaran 8/10 Diperlukan'}
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {isBadgeUnlocked
                  ? "Tahniah! Anda dinobatkan sebagai 'I'm a Local Hero' atas kematangan emosi, daya tahan minda dan keberanian mematahkan kitaran buli!"
                  : 'Syarat kelayakan lencana rasmi adalah sekurang-kurangnya 8/10 cabaran diselesaikan dengan tepat.'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons: Certificate Download & Kembali ke Menu Utama */}
        <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleDownload}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-amber-950/60 hover:scale-[1.02] transition-all cursor-pointer"
          >
            <Download className="w-5 h-5 stroke-[2.5]" />
            <span>Muat Turun Sijil Pencapaian Digital (PNG)</span>
          </button>

          {onRestart && (
            <button
              onClick={onRestart}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900/90 border border-amber-500/50 hover:bg-slate-800 text-amber-300 hover:text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-black/50 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <Home className="w-5 h-5 text-amber-400" />
              <span>Kembali ke Menu Utama</span>
            </button>
          )}
        </div>

        {downloadSuccess && (
          <div className="relative z-10 text-xs font-semibold text-emerald-400 flex items-center justify-center gap-1.5 animate-bounce">
            <CheckCircle2 className="w-4 h-4" />
            <span>Sijil pencapaian anda telah berjaya dimuat turun ke peranti!</span>
          </div>
        )}
      </div>

      {/* Rumusan Keseluruhan */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
          <Brain className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <h2 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-white">
              Rumusan Keseluruhan Prestasi
            </h2>
            <p className="text-xs text-slate-400">
              Analisis refleksi terhadap pilihan hidup dan kematangan emosi anda
            </p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
          <span className="text-xs font-mono uppercase tracking-wide text-cyan-400">
            Penilaian Daya Tahan Emosi:
          </span>
          <h3 className={`text-base sm:text-lg font-bold ${summary.color}`}>
            {summary.title}
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {summary.desc}
          </p>
        </div>

        {/* Nasihat & Motivasi Ringkas */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Compass className="w-4 h-4 text-amber-400" />
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-white">
              Nasihat & Motivasi Buat Watak Utama
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>1. Teguh Pada Prinsip Diri</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Nilai diri anda tidak ditentukan oleh kata-kata pembuli. Berani berkata "TIDAK" kepada sebarang bentuk tekanan yang merosakkan kesihatan dan masa depan anda.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold">
                <Heart className="w-4 h-4" />
                <span>2. Jadi Sahabat Yang Membantu</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Jangan biarkan rakan menghadapi kesukaran bersendirian. Tindakan kecil anda bersuara dan memberi sokongan mampu menyelamatkan jiwa insan lain.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
                <Sparkles className="w-4 h-4" />
                <span>3. Dapatkan Bantuan Tanpa Malu</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Meminta bantuan kaunselor atau orang dewasa dipercayai adalah tanda keberanian yang sebenar, bukan kelemahan. Kesihatan mental anda sentiasa berharga.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ucapan Terima Kasih di Akhir Sesi */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-950/30 via-slate-900 to-amber-950/30 border border-amber-600/40 text-center space-y-4 shadow-xl">
        <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto shadow-md">
          <Heart className="w-6 h-6 fill-amber-400/30 text-amber-400" />
        </div>
        <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-white drop-shadow-[0_2px_8px_rgba(251,191,36,0.4)]">
          Terima Kasih, Watak Utama!
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Terima kasih atas penyertaan dan komitmen anda menyelesaikan simulasi ini. Semoga panduan dan pengajaran yang dipelajari hari ini membimbing anda menjadi insan yang berdaya tahan, bijak membuat keputusan, serta sentiasa menyebarkan aura positif di sekolah dan dalam masyarakat.
        </p>
        <div className="text-[11px] font-mono text-amber-300/90 pt-1 font-semibold">
          Kekal selamat, sayangi diri anda, dan jadilah watak utama yang bermaruah!
        </div>

        {/* Butang Kembali ke Menu Utama di Akhir Halaman */}
        {onRestart && (
          <div className="pt-2">
            <button
              onClick={onRestart}
              className="px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm inline-flex items-center gap-2 shadow-lg shadow-amber-950/60 hover:scale-105 transition-all cursor-pointer"
            >
              <Home className="w-4 h-4 stroke-[2.5]" />
              <span>Kembali ke Menu Utama</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
