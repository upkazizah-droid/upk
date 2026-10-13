import React, { useState } from 'react';
import { Volume2, VolumeX, ShieldCheck, UserCheck, Sparkles, Music, Home } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  onOpenTeacher: () => void;
  onOpenStatus: () => void;
  currentScore?: { current: number; total: number };
  playerName?: string;
  onHomeClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTeacher,
  onOpenStatus,
  currentScore,
  playerName,
  onHomeClick
}) => {
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());
  const [isBgmOn, setIsBgmOn] = useState(soundManager.isBgmActive());

  const handleToggleSound = () => {
    const nextMuted = soundManager.toggleMute();
    setIsMuted(nextMuted);
    setIsBgmOn(soundManager.isBgmActive());
    if (!nextMuted) {
      soundManager.playSelection();
    }
  };

  const handleToggleBgm = () => {
    const active = soundManager.toggleBgm();
    setIsBgmOn(active);
    setIsMuted(soundManager.getMuted());
  };

  return (
    <header className="sticky top-0 z-40 bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark (Warna Kuning Gold & Putih Terang) */}
        <button
          onClick={onHomeClick}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
          title="Klik untuk ke Menu Utama"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div>
            <span className="font-display font-black text-base sm:text-lg tracking-tight transition-colors flex items-center gap-1.5">
              <span className="text-white drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)]">POV: </span>
              <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-white bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(251,191,36,0.5)]">
                WATAK UTAMA
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-950/80 text-amber-300 border border-amber-600/60 font-bold">
                SURVIVAL
              </span>
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation / Controls with Menu Utama */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs font-medium text-slate-300">
          {/* Butang Kembali ke Menu Utama yang Jelas */}
          {onHomeClick && (
            <button
              onClick={onHomeClick}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 hover:text-white border border-amber-500/40 text-xs font-bold transition-all shadow-sm shadow-amber-950/40 cursor-pointer"
              title="Kembali ke Menu Utama"
            >
              <Home className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Menu Utama</span>
            </button>
          )}
          {playerName && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800/70 border border-slate-700/60">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-400">Pemain:</span>
              <span className="font-semibold text-white">{playerName}</span>
            </div>
          )}

          {currentScore && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-cyan-950/60 border border-cyan-700/60 text-cyan-300 font-mono">
              <span className="text-xs">Skor:</span>
              <span className="font-bold text-sm text-cyan-200">
                {currentScore.current}/{currentScore.total}
              </span>
            </div>
          )}

          <button
            onClick={onOpenStatus}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-md transition-colors cursor-pointer"
            title="Semak Rekod Markah"
          >
            <UserCheck className="w-4 h-4 text-slate-400" />
            <span>Semak Status</span>
          </button>

          {/* Upbeat BGM Music Toggle */}
          <button
            onClick={handleToggleBgm}
            className={`p-2 rounded-md border transition-all cursor-pointer flex items-center gap-1.5 ${
              isBgmOn
                ? 'bg-emerald-950/80 border-emerald-500/80 text-emerald-300 shadow-md shadow-emerald-950/50'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title={isBgmOn ? 'Jeda Melodi Rancak' : 'Mainkan Melodi Rancak (BGM On)'}
            aria-label="Melodi Rancak"
          >
            <Music className={`w-4 h-4 ${isBgmOn ? 'animate-bounce text-emerald-400' : ''}`} />
            <span className="text-[11px] hidden lg:inline">
              {isBgmOn ? 'Muzik Aktif' : 'Muzik Rancak'}
            </span>
          </button>

          {/* SFX Mute/Unmute */}
          <button
            onClick={handleToggleSound}
            className={`p-2 rounded-md border transition-colors cursor-pointer flex items-center gap-1.5 ${
              isMuted
                ? 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-300'
                : 'bg-cyan-950/60 border-cyan-800/60 text-cyan-400 hover:bg-cyan-900/60'
            }`}
            title={isMuted ? 'Buka Bunyi' : 'Senyapkan Bunyi'}
            aria-label="Kawalan Bunyi"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Zone 3: Teacher Portal */}
        <div className="flex items-center">
          <button
            onClick={onOpenTeacher}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-amber-300 bg-amber-950/40 border border-amber-600/40 rounded-lg hover:bg-amber-900/40 hover:border-amber-500/60 transition-all cursor-pointer whitespace-nowrap shadow-sm shadow-amber-900/20"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Papan Pemuka Guru</span>
          </button>
        </div>
      </div>
    </header>
  );
};
