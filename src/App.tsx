import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { IntroScreen } from './components/IntroScreen';
import { ChallengeScreen } from './components/ChallengeScreen';
import { ResultScreen } from './components/ResultScreen';
import { TeacherDashboard } from './components/TeacherDashboard';
import { ScoreStatusModal } from './components/ScoreStatusModal';
import { CHALLENGES } from './data/challenges';
import { Player, PlayerAnswer, GameRecord } from './types/game';
import { saveRecord } from './utils/storage';
import { soundManager } from './utils/audio';
import { HeartPulse, PhoneCall, ShieldAlert } from 'lucide-react';

export default function App() {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'result'>('intro');
  const [player, setPlayer] = useState<Player | null>(null);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<PlayerAnswer[]>([]);
  const [completedRecord, setCompletedRecord] = useState<GameRecord | null>(null);
  const [showTeacherDashboard, setShowTeacherDashboard] = useState(false);
  const [showScoreStatus, setShowScoreStatus] = useState(false);

  const handleStartGame = (newPlayer: Player) => {
    setPlayer(newPlayer);
    setCurrentChallengeIndex(0);
    setAnswers([]);
    setCompletedRecord(null);
    setGameState('playing');
  };

  const handleAnswerSubmit = (answer: PlayerAnswer) => {
    setAnswers((prev) => {
      // Avoid duplicate answers
      const filtered = prev.filter((a) => a.challengeId !== answer.challengeId);
      return [...filtered, answer];
    });
  };

  const handleNextChallenge = () => {
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      // Final challenge completed! Calculate final score & save
      if (!player) return;
      const durationMins = Math.max(1, Math.round((Date.now() - player.startTime) / 60000));
      const correctScore = answers.filter((a) => a.isCorrect).length;
      const record = saveRecord(player, correctScore, answers, durationMins);
      setCompletedRecord(record);
      setGameState('result');
    }
  };

  const handleRestart = () => {
    soundManager.playSelection();
    setGameState('intro');
    setCurrentChallengeIndex(0);
    setAnswers([]);
    setCompletedRecord(null);
  };

  const currentScoreCount = answers.filter((a) => a.isCorrect).length;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Navbar */}
      <Navbar
        onOpenTeacher={() => setShowTeacherDashboard(true)}
        onOpenStatus={() => setShowScoreStatus(true)}
        currentScore={
          gameState === 'playing'
            ? { current: currentScoreCount, total: currentChallengeIndex + 1 }
            : undefined
        }
        playerName={player ? player.name : undefined}
        onHomeClick={() => {
          if (gameState !== 'intro') {
            handleRestart();
          }
        }}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 w-full flex flex-col">
        {gameState === 'intro' && (
          <IntroScreen
            onStartGame={handleStartGame}
            onOpenTeacher={() => setShowTeacherDashboard(true)}
          />
        )}

        {gameState === 'playing' && player && (
          <ChallengeScreen
            challenge={CHALLENGES[currentChallengeIndex]}
            challengeIndex={currentChallengeIndex}
            totalChallenges={CHALLENGES.length}
            player={player}
            onAnswerSubmit={handleAnswerSubmit}
            onNextChallenge={handleNextChallenge}
            isLastChallenge={currentChallengeIndex === CHALLENGES.length - 1}
            onGoHome={handleRestart}
          />
        )}

        {gameState === 'result' && player && completedRecord && (
          <ResultScreen
            player={player}
            answers={answers}
            record={completedRecord}
            onRestart={handleRestart}
            onOpenTeacher={() => setShowTeacherDashboard(true)}
          />
        )}
      </main>

      {/* Footer: Support Hotlines for Youths in Malaysia */}
      <footer className="border-t border-slate-800/80 bg-slate-950/90 py-6 px-4 sm:px-6 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-rose-400 shrink-0" />
            <span>
              <strong>POV: Main Character</strong> • Inisiatif Kesedaran Kesihatan Mental & Anti-Buli Belia
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-slate-300">
            <div className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
              <span>Talian HEAL: <strong className="text-white">15555</strong> (KKM)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>Talian Kasih: <strong className="text-white">15999</strong> (KPWKM)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Befrienders KL: <strong className="text-white">03-7627 2929</strong></span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showTeacherDashboard && (
        <TeacherDashboard onClose={() => setShowTeacherDashboard(false)} />
      )}

      {showScoreStatus && (
        <ScoreStatusModal onClose={() => setShowScoreStatus(false)} />
      )}
    </div>
  );
}
