import React, { useState } from 'react';
import { GameRecord } from '../types/game';
import { getRecords } from '../utils/storage';
import { generateAndDownloadCertificate } from '../utils/certificate';
import { soundManager } from '../utils/audio';
import { Search, Award, Download, X, UserCheck, Home } from 'lucide-react';

interface ScoreStatusModalProps {
  onClose: () => void;
}

export const ScoreStatusModal: React.FC<ScoreStatusModalProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const allRecords = getRecords();

  const matchedRecords = allRecords.filter(
    (r) =>
      searchTerm.trim() !== '' &&
      (r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.studentClass.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDownloadCert = (r: GameRecord) => {
    soundManager.playSelection();
    generateAndDownloadCertificate({
      studentName: r.studentName,
      studentClass: r.studentClass,
      score: r.score,
      total: r.totalChallenges,
      hasBadge: r.hasBadge,
      date: r.completedAt,
      recordId: r.id,
      characterName: r.characterName
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-amber-950/80 border border-amber-600/60 text-amber-400 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-white">
                Semak Status & Sijil Pelajar
              </h2>
              <p className="text-xs text-slate-400">
                Semak markah terkumpul dan muat turun semula sijil anda
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 hover:text-white border border-amber-500/40 text-xs font-bold transition-all cursor-pointer"
              title="Kembali ke Menu Utama"
            >
              <Home className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Menu Utama</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search input */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300 uppercase">
            Cari Mengikut Nama atau Kelas Anda
          </label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Masukkan nama anda atau nama kelas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Results */}
        <div className="space-y-3">
          {searchTerm.trim() === '' ? (
            <div className="p-8 text-center text-xs text-slate-500 rounded-xl bg-slate-950/50 border border-slate-800/60">
              Sila taip nama atau kelas anda di atas untuk menyemak rekod pencapaian.
            </div>
          ) : matchedRecords.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 rounded-xl bg-slate-950/50 border border-slate-800/60">
              Tiada rekod dijumpai dengan carian "{searchTerm}". Pastikan nama dieja tepat.
            </div>
          ) : (
            matchedRecords.map((r) => (
              <div
                key={r.id}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-white text-sm">
                      {r.studentName}
                    </h3>
                    <div className="text-xs text-slate-400">
                      Kelas: <span className="text-slate-300">{r.studentClass}</span> • Watak: <span className="text-cyan-400">{r.characterName}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono font-bold text-sm text-white">
                      <span className={r.score >= 8 ? 'text-amber-400' : 'text-cyan-400'}>{r.score}</span>/10
                    </div>
                    {r.hasBadge && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-amber-300 font-bold bg-amber-950/70 px-1.5 py-0.5 rounded border border-amber-800/50">
                        <Award className="w-3 h-3" />
                        <span>Local Hero</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                  <span className="font-mono text-[11px]">{r.completedAt}</span>
                  <button
                    onClick={() => handleDownloadCert(r)}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold border border-amber-500/40 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Muat Turun Sijil</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
