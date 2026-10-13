import React, { useState } from 'react';
import { CHARACTERS, HERO_COVER_IMAGE, BADGE_LOCAL_HERO_IMAGE } from '../data/characters';
import { Character, Player } from '../types/game';
import { soundManager } from '../utils/audio';
import { Award, ShieldAlert, ArrowRight, CheckCircle2, User, GraduationCap, Sparkles } from 'lucide-react';

interface IntroScreenProps {
  onStartGame: (player: Player) => void;
  onOpenTeacher: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStartGame }) => {
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(CHARACTERS[0]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSelectCharacter = (char: Character) => {
    soundManager.playSelection();
    setSelectedCharacter(char);
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Sila masukkan nama penuh anda untuk pendaftaran sijil.');
      soundManager.playWarning();
      return;
    }
    if (!studentClass.trim()) {
      setErrorMessage('Sila masukkan tingkatan atau kelas anda (cth: Tingkatan 5 Sains 1).');
      soundManager.playWarning();
      return;
    }

    setErrorMessage('');
    soundManager.playSuccess();
    soundManager.playHeartbeat();
    soundManager.startBgm(); // Auto-start upbeat game melody

    onStartGame({
      name: name.trim(),
      studentClass: studentClass.trim(),
      character: selectedCharacter,
      startTime: Date.now()
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-10 space-y-10">
      {/* Hero Showcase Section */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Text Column */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6 z-10 bg-gradient-to-r from-[#090d16] via-[#0b1222]/95 to-transparent">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-[11px] font-bold tracking-wider uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>EPISOD 1 • PROTOKOL KELANGSUNGAN KAMPUS</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                  <span className="text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.35)]">POV: </span>
                  <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-white bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(251,191,36,0.6)]">
                    WATAK UTAMA
                  </span>
                </h1>
                <div className="text-xs sm:text-sm font-black tracking-widest text-amber-300 font-mono uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  <span>SURVIVAL PROTOCOL // 10 BILIK KEPUTUSAN HIDUP</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Anda sendiri adalah watak utama dalam kisah hidup anda. Hadapi <strong className="text-cyan-300">10 Cabaran Psikologi & Anti-Buli</strong>. Setiap keputusan anda membawa impak nyata terhadap kesejahteraan emosi dan keselamatan komuniti sekolah.
              </p>
            </div>

            {/* Quick Rules Strip with Badge Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800">
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Pilihan Muktamad</span>
                  <span className="text-slate-400">Pilih sekali sahaja, tiada ulangan.</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-300 p-1.5 rounded-lg bg-amber-950/20 border border-amber-500/30">
                <div className="w-9 h-9 rounded-lg overflow-hidden border border-amber-400/80 shrink-0 shadow-md shadow-amber-500/20 bg-slate-950">
                  <img
                    src={BADGE_LOCAL_HERO_IMAGE}
                    alt="Lencana I'm a Local Hero"
                    referrerPolicy="no-referrer"
                    loading="eager"
                    onError={(e) => {
                      const target = e.currentTarget;
                      const rawFilename = BADGE_LOCAL_HERO_IMAGE?.split('/').pop()?.split('?')[0];
                      if (rawFilename && !target.src.includes(`/assets/images/${rawFilename}`)) {
                        target.src = `/assets/images/${rawFilename}`;
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="font-bold text-amber-300 block">Lencana 8/10</span>
                  <span className="text-[11px] text-slate-300">I'm a Local Hero</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Sijil Rasmi</span>
                  <span className="text-slate-400">Muat turun sijil digital peribadi.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Artwork */}
          <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[340px] overflow-hidden bg-slate-950">
            <img
              src={HERO_COVER_IMAGE}
              alt="POV Main Character Mystery Escape Room Scene"
              referrerPolicy="no-referrer"
              loading="eager"
              onError={(e) => {
                const target = e.currentTarget;
                const rawFilename = HERO_COVER_IMAGE?.split('/').pop()?.split('?')[0];
                if (rawFilename && !target.src.includes(`/assets/images/${rawFilename}`)) {
                  target.src = `/assets/images/${rawFilename}`;
                }
              }}
              className="w-full h-full object-cover object-center filter brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent lg:hidden" />
          </div>
        </div>
      </div>

      {/* Main Registration & Character Selection Form */}
      <form onSubmit={handleStart} className="space-y-8">
        {/* Step 1: Student Information (Kotak Nama & Tingkatan) */}
        <div className="p-6 sm:p-8 rounded-xl bg-slate-900/80 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-white flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-mono font-bold">1</span>
              <span>Daftar Maklumat Pemain</span>
            </h2>
            <span className="text-xs text-slate-400">Nama dan tingkatan akan dicatatkan pada sijil pencapaian</span>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-700/50 text-rose-300 text-xs font-medium flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="student-name" className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>Nama Penuh Pelajar <span className="text-rose-400">*</span></span>
              </label>
              <input
                id="student-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama penuh anda..."
                className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="student-class" className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Tingkatan / Kelas <span className="text-rose-400">*</span></span>
              </label>
              <input
                id="student-class"
                type="text"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                placeholder="cth: Tingkatan 5 Sains 1 / Tingkatan 4 Cemerlang"
                className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm transition-all"
                required
              />
            </div>
          </div>
        </div>

        {/* Step 2: Avatar Selection (Tanpa Karakteristik Bias, Mencerminkan Pelajar) */}
        <div className="p-6 sm:p-8 rounded-xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-white flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-mono font-bold">2</span>
                <span>Pilih Avatar Visual Anda</span>
              </h2>
            </div>
            <div className="text-xs font-bold text-amber-300 bg-amber-950/60 px-3 py-1.5 rounded-lg border border-amber-500/40 self-start sm:self-auto flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Avatar Terpilih: <strong>{selectedCharacter.title}</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CHARACTERS.map((char) => {
              const isSelected = selectedCharacter.id === char.id;
              return (
                <div
                  key={char.id}
                  onClick={() => handleSelectCharacter(char)}
                  className={`group relative rounded-2xl border p-4 cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-900 border-amber-400 ring-2 ring-amber-400/40 shadow-xl shadow-amber-950/60 scale-[1.02]'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Character Avatar Image */}
                    <div className="relative aspect-square rounded-xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-md">
                      <img
                        src={char.imageSrc}
                        alt={`Avatar ${char.title}`}
                        referrerPolicy="no-referrer"
                        loading="eager"
                        onError={(e) => {
                          const target = e.currentTarget;
                          const rawFilename = char.imageSrc?.split('/').pop()?.split('?')[0];
                          if (rawFilename && !target.src.includes(`/assets/images/${rawFilename}`)) {
                            target.src = `/assets/images/${rawFilename}`;
                          }
                        }}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      {isSelected ? (
                        <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-md text-[11px] font-black bg-amber-400 text-slate-950 shadow-md flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-slate-950 stroke-[3]" />
                          <span>Dipilih</span>
                        </div>
                      ) : (
                        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/75 text-slate-300 backdrop-blur-xs border border-white/10">
                          {char.role}
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h3 className={`font-black text-base transition-colors ${
                        isSelected ? 'text-amber-300' : 'text-white group-hover:text-amber-200'
                      }`}>
                        {char.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed min-h-[36px]">
                        {char.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    {isSelected ? (
                      <span className="text-amber-400 font-bold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                        <span>Karakter Aktif</span>
                      </span>
                    ) : (
                      <span className="text-slate-500 font-medium">Klik untuk pilih</span>
                    )}
                    <span className={`font-bold ${isSelected ? 'text-amber-400' : 'text-slate-500'}`}>
                      {isSelected ? '✓ Terpilih' : 'Pilih'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Start Game CTA in Bright Gold */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            Pastikan anda bersedia membuat keputusan matang. Setiap pilihan mencerminkan realiti hidup anda.
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-950/60 hover:scale-[1.02] transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Masuk Simulasi Watak Utama</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </form>
    </div>
  );
};
