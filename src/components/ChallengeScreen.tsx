import React, { useState, useEffect } from 'react';
import { Challenge, Choice, Player, PlayerAnswer } from '../types/game';
import { soundManager } from '../utils/audio';
import { getCharacterAvatar } from '../data/characters';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldAlert,
  Flame,
  Brain,
  MessageSquare,
  Home
} from 'lucide-react';

interface ChallengeScreenProps {
  challenge: Challenge;
  challengeIndex: number;
  totalChallenges: number;
  player: Player;
  onAnswerSubmit: (answer: PlayerAnswer) => void;
  onNextChallenge: () => void;
  isLastChallenge: boolean;
  onGoHome?: () => void;
}

export const ChallengeScreen: React.FC<ChallengeScreenProps> = ({
  challenge,
  challengeIndex,
  totalChallenges,
  player,
  onAnswerSubmit,
  onNextChallenge,
  isLastChallenge,
  onGoHome
}) => {
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [timerSeconds, setTimerSeconds] = useState<number>(45);
  const [imgSrc, setImgSrc] = useState<string>(challenge.imageSrc);
  const [imgHasError, setImgHasError] = useState<boolean>(false);

  // Reset local state when challenge changes
  useEffect(() => {
    setSelectedChoiceId(null);
    setHasAnswered(false);
    setSelectedChoice(null);
    setTimerSeconds(45);
    setImgSrc(challenge.imageSrc);
    setImgHasError(false);

    // Play heartbeat tension sound at start of each challenge
    soundManager.playHeartbeat();
  }, [challenge.id, challenge.imageSrc]);

  // Subtle escape room timer tick countdown
  useEffect(() => {
    if (hasAnswered) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        if (prev <= 10 && prev % 2 === 0) {
          soundManager.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [hasAnswered]);

  const handleSelect = (choice: Choice) => {
    if (hasAnswered) return; // Strict lock: only 1 selection allowed!

    setSelectedChoiceId(choice.id);
    setSelectedChoice(choice);
    setHasAnswered(true);

    soundManager.playSelection();

    if (choice.isCorrect) {
      setTimeout(() => soundManager.playSuccess(), 200);
    } else {
      setTimeout(() => soundManager.playWarning(), 200);
    }

    onAnswerSubmit({
      challengeId: challenge.id,
      selectedChoiceId: choice.id,
      isCorrect: choice.isCorrect,
      answeredAt: Date.now()
    });
  };

  const getDangerBadge = (level: string) => {
    switch (level) {
      case 'Kritikal':
        return {
          bg: 'bg-rose-950/80 text-rose-300 border-rose-800',
          dot: 'bg-rose-500'
        };
      case 'Tinggi':
        return {
          bg: 'bg-amber-950/80 text-amber-300 border-amber-800',
          dot: 'bg-amber-500'
        };
      default:
        return {
          bg: 'bg-blue-950/80 text-blue-300 border-blue-800',
          dot: 'bg-blue-400'
        };
    }
  };

  const dangerStyle = getDangerBadge(challenge.dangerLevel);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top HUD Bar: Progress, Timer, Danger Level & Menu Utama */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-md">
        {/* Left: Challenge Stage */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-950/80 border border-amber-600/60 flex items-center justify-center font-mono font-black text-amber-300 text-sm shadow-sm">
            {challengeIndex + 1 < 10 ? `0${challengeIndex + 1}` : challengeIndex + 1}
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Bilik Keputusan • {challengeIndex + 1} daripada {totalChallenges}
            </div>
            <div className="text-sm font-black text-amber-300 flex items-center gap-2">
              <span>{challenge.category}</span>
            </div>
          </div>
        </div>

        {/* Center: Progress Bar */}
        <div className="flex-1 max-w-xs hidden md:block">
          <div className="flex justify-between text-[11px] text-slate-400 font-mono mb-1">
            <span>KEMAJUAN SIMULASI</span>
            <span>{Math.round(((challengeIndex + 1) / totalChallenges) * 100)}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-500 rounded-full"
              style={{ width: `${((challengeIndex + 1) / totalChallenges) * 100}%` }}
            />
          </div>
        </div>

        {/* Right: Timer, Danger Tag & Butang Menu Utama */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className={`px-3 py-1 rounded-md text-xs font-semibold border flex items-center gap-1.5 ${dangerStyle.bg}`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Tahap Risiko: {challenge.dangerLevel}</span>
          </div>

          <div
            className={`px-3 py-1 rounded-md font-mono text-xs font-bold border ${
              timerSeconds <= 10
                ? 'bg-rose-950/80 text-rose-300 border-rose-700 animate-pulse'
                : 'bg-slate-950 text-slate-300 border-slate-800'
            }`}
          >
            {timerSeconds > 0 ? `00:${timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}` : 'MASA TAMAT'}
          </div>

          {onGoHome && (
            <button
              onClick={onGoHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 hover:text-white border border-amber-500/40 text-xs font-bold transition-all shadow-sm cursor-pointer ml-1"
              title="Kembali ke Menu Utama"
            >
              <Home className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Menu Utama</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Narrative Card: Situation & Inner Monologue */}
      <div className="rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-[#0c1322] border border-slate-800 overflow-hidden shadow-xl">
        {/* Character POV Header Banner */}
        <div className="p-4 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-cyan-500/50 shrink-0 bg-slate-950 shadow-sm">
              <img
                src={getCharacterAvatar(player.character?.id, player.character?.imageSrc)}
                alt={player.character?.title || 'Watak Utama'}
                referrerPolicy="no-referrer"
                loading="eager"
                onError={(e) => {
                  const target = e.currentTarget;
                  const rawFilename = player.character?.imageSrc?.split('/').pop()?.split('?')[0];
                  if (rawFilename && !target.src.includes(`/assets/images/${rawFilename}`)) {
                    target.src = `/assets/images/${rawFilename}`;
                  }
                }}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span>{player.name}</span>
                <span className="text-[10px] text-cyan-400 font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/50">
                  {player.character?.title || 'Watak Utama'}
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                {player.studentClass} • Sudut Pandang Watak Utama (POV)
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">
              KEPUTUSAN MUKTAMAD
            </span>
            <span className="text-[11px] text-slate-400">Pilih 1 kali sahaja</span>
          </div>
        </div>

        {/* Challenge Title & Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-amber-400 font-bold tracking-wide uppercase flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>Cabaran #{challengeIndex + 1}:</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-snug text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-white drop-shadow-[0_2px_12px_rgba(251,191,36,0.4)]">
              {challenge.title}
            </h2>
          </div>

          {/* Situation Scene Illustration */}
          <div className="w-full relative rounded-xl overflow-hidden border border-slate-700/80 aspect-video sm:aspect-[21/9] max-h-[320px] bg-slate-950 shadow-xl group">
            {!imgHasError ? (
              <img
                src={imgSrc}
                alt={challenge.title}
                referrerPolicy="no-referrer"
                loading="eager"
                onError={() => {
                  const rawFilename = challenge.imageSrc?.split('/').pop()?.split('?')[0];
                  const fallbackPublicPath = rawFilename ? `/assets/images/${rawFilename}` : '';
                  if (fallbackPublicPath && imgSrc !== fallbackPublicPath) {
                    setImgSrc(fallbackPublicPath);
                  } else {
                    setImgHasError(true);
                  }
                }}
                className="w-full h-full object-cover filter brightness-90 contrast-105 transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full min-h-[220px] flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40 text-center relative">
                <div className="w-14 h-14 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300 mb-2.5 shadow-lg shadow-cyan-500/20">
                  <ShieldAlert className="w-7 h-7 text-cyan-400" />
                </div>
                <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest font-bold">
                  SITUASI SIMULASI // {challenge.category}
                </span>
                <span className="text-sm font-semibold text-slate-300 mt-1 max-w-md">
                  {challenge.title}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 sm:left-4 flex items-center gap-2 pointer-events-none">
              <span className="px-3 py-1 rounded-md text-[11px] font-bold bg-black/80 text-cyan-300 border border-cyan-800/80 backdrop-blur-md shadow-md flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>Situasi: {challenge.category}</span>
              </span>
            </div>
          </div>

          {/* Scenario Text */}
          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 text-sm sm:text-base leading-relaxed">
            {challenge.situation}
          </div>

          {/* Inner Monologue Box (Psychological Tension) */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 text-amber-200/90 text-xs sm:text-sm italic flex items-start gap-3">
            <MessageSquare className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="not-italic text-[11px] uppercase tracking-wider text-amber-300 block mb-0.5 font-mono">
                Bisikan Hati Watak (Inner Monologue):
              </strong>
              {challenge.innerMonologue}
            </div>
          </div>
        </div>
      </div>

      {/* 3 Choices Selection Area */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider px-1">
          <span>Pilih Tindakan Anda (Hanya 1 Pilihan Tepat):</span>
          {hasAnswered && (
            <span className="text-amber-400 font-mono">Keputusan Dikunci</span>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3.5">
          {challenge.choices.map((choice, idx) => {
            const isSelected = selectedChoiceId === choice.id;
            const letter = ['A', 'B', 'C'][idx];

            let buttonStyle = 'bg-slate-900/95 border-2 border-cyan-500/60 hover:border-cyan-300 hover:bg-slate-850 hover:shadow-lg hover:shadow-cyan-500/20 text-white shadow-md ring-1 ring-cyan-500/20';

            if (hasAnswered) {
              if (isSelected) {
                if (choice.isCorrect) {
                  buttonStyle = 'bg-emerald-950/90 border-2 border-emerald-400 text-white shadow-xl shadow-emerald-500/30 ring-2 ring-emerald-400/50';
                } else {
                  buttonStyle = 'bg-rose-950/90 border-2 border-rose-400 text-white shadow-xl shadow-rose-500/30 ring-2 ring-rose-400/50';
                }
              } else if (choice.isCorrect) {
                // Clearly show the right path with bright emerald outline
                buttonStyle = 'bg-emerald-950/50 border-2 border-emerald-500 text-emerald-100 ring-1 ring-emerald-400/40';
              } else {
                buttonStyle = 'bg-slate-950/60 border border-slate-800 text-slate-500 opacity-45';
              }
            }

            return (
              <button
                key={choice.id}
                onClick={() => handleSelect(choice)}
                disabled={hasAnswered}
                className={`w-full text-left p-4 sm:p-5 rounded-xl transition-all duration-200 flex items-start gap-4 cursor-pointer disabled:cursor-default ${buttonStyle}`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center font-extrabold text-base shrink-0 border-2 transition-transform ${
                    isSelected
                      ? choice.isCorrect
                        ? 'bg-emerald-400 text-black border-emerald-300 shadow-md scale-105'
                        : 'bg-rose-500 text-white border-rose-300 shadow-md scale-105'
                      : 'bg-cyan-950/90 border-cyan-400 text-cyan-300 shadow-sm'
                  }`}
                >
                  {letter}
                </div>

                <div className="flex-1 text-sm sm:text-base font-medium leading-relaxed">
                  {choice.text}
                </div>

                {hasAnswered && isSelected && (
                  <div className="shrink-0 mt-1">
                    {choice.isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 drop-shadow" />
                    ) : (
                      <XCircle className="w-6 h-6 text-rose-400 drop-shadow" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Consequence Reveal & Bold Educational Takeaway (Shown immediately once chosen) */}
      {hasAnswered && selectedChoice && (
        <div
          className={`p-6 rounded-2xl border space-y-4 transition-all duration-300 ${
            selectedChoice.isCorrect
              ? 'bg-emerald-950/40 border-emerald-600/60 text-emerald-100'
              : 'bg-rose-950/40 border-rose-600/60 text-rose-100'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-base">
            {selectedChoice.isCorrect ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-300">PILIHAN TEPAT! TINDAKAN BERINTEGRITI & SELAMAT</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <span className="text-rose-300">PILIHAN KURANG TEPAT! LIHAT KESAN TINDAKAN INI:</span>
              </>
            )}
          </div>

          {/* Consequence explanation */}
          <p className="text-sm sm:text-base leading-relaxed text-slate-200">
            {selectedChoice.consequence}
          </p>

          {/* Bold Takeaway (Crucial requirement: ayat ringkas dengan bold) */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block">
              Pengajaran Utama Untuk Anda:
            </span>
            <p className="text-sm sm:text-base text-white">
              <strong className={selectedChoice.isCorrect ? 'text-emerald-300' : 'text-rose-300'}>
                {selectedChoice.boldTakeaway}
              </strong>
            </p>
          </div>

          {/* Psychological Insight */}
          <div className="text-xs text-slate-400 flex items-center gap-2 pt-1">
            <Brain className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Kesan Psikososial: <strong className="text-slate-300">{selectedChoice.psychologicalImpact}</strong></span>
          </div>

          {/* Next Button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => {
                soundManager.playSelection();
                onNextChallenge();
              }}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyan-950/50 cursor-pointer"
            >
              <span>{isLastChallenge ? 'Lihat Keputusan Akhir & Skor' : 'Teruskan ke Cabaran Seterusnya'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
