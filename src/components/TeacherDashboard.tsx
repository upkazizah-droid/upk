import React, { useState, useMemo } from 'react';
import { GameRecord } from '../types/game';
import { CHALLENGES } from '../data/challenges';
import {
  getRecords,
  clearAllRecords,
  resetToDemoRecords
} from '../utils/storage';
import { soundManager } from '../utils/audio';
import {
  ShieldCheck,
  Lock,
  Download,
  Users,
  Award,
  AlertTriangle,
  Search,
  Filter,
  Trash2,
  RefreshCw,
  X,
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
  Eye,
  Home
} from 'lucide-react';

interface TeacherDashboardProps {
  onClose: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [records, setRecords] = useState<GameRecord[]>(getRecords());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [activeRecordModal, setActiveRecordModal] = useState<GameRecord | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === '1234') {
      soundManager.playSuccess();
      setIsAuthenticated(true);
      setPasswordError(false);
    } else {
      soundManager.playWarning();
      setPasswordError(true);
    }
  };

  // Unique classes for filter
  const classList = useMemo(() => {
    const set = new Set<string>();
    records.forEach((r) => set.add(r.studentClass));
    return Array.from(set);
  }, [records]);

  // Filtered records
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const matchSearch =
        r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.studentClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchClass = selectedClass === 'all' || r.studentClass === selectedClass;
      return matchSearch && matchClass;
    });
  }, [records, searchQuery, selectedClass]);

  // Analytics computation
  const analytics = useMemo(() => {
    const total = records.length;
    if (total === 0) {
      return {
        total: 0,
        avgScore: 0,
        badgeRate: 0,
        challengeFailRates: []
      };
    }

    const totalScore = records.reduce((acc, r) => acc + r.score, 0);
    const avgScore = (totalScore / total).toFixed(1);
    const badgeEarners = records.filter((r) => r.hasBadge).length;
    const badgeRate = Math.round((badgeEarners / total) * 100);

    // Compute fail rate per challenge 1..10
    const challengeFailRates = CHALLENGES.map((ch) => {
      let failCount = 0;
      let totalAnswers = 0;
      records.forEach((r) => {
        const ans = r.answers.find((a) => a.challengeId === ch.id);
        if (ans) {
          totalAnswers++;
          if (!ans.isCorrect) failCount++;
        }
      });
      const failRate = totalAnswers > 0 ? Math.round((failCount / totalAnswers) * 100) : 0;
      return {
        id: ch.id,
        title: ch.title,
        category: ch.category,
        failRate,
        failCount,
        totalAnswers
      };
    });

    return {
      total,
      avgScore,
      badgeRate,
      challengeFailRates: challengeFailRates.sort((a, b) => b.failRate - a.failRate)
    };
  }, [records]);

  // Export to CSV
  const handleExportCSV = () => {
    soundManager.playSelection();
    const headers = ['ID Rekod', 'Nama Pelajar', 'Tingkatan', 'Avatar', 'Skor', 'Lencana (≥8)', 'Tarikh'];
    const rows = filteredRecords.map((r) => [
      `"${r.id}"`,
      `"${r.studentName}"`,
      `"${r.studentClass}"`,
      `"${r.characterName}"`,
      r.score,
      r.hasBadge ? 'Ya (Local Hero)' : 'Tidak',
      `"${r.completedAt}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rekod_Prestasi_POV_MainCharacter_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetData = () => {
    resetToDemoRecords();
    setRecords(getRecords());
    soundManager.playSuccess();
  };

  const handleClearData = () => {
    clearAllRecords();
    setRecords([]);
    soundManager.playWarning();
  };

  // Render Password Lock Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl relative space-y-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-amber-950/60 border border-amber-600/40 text-amber-400 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-white">
              Papan Pemuka Kaunselor & Guru
            </h2>
            <p className="text-xs text-slate-400">
              Akses terhad untuk pemantauan kendiri dan analisis intervensi murid
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                Kata Laluan Keselamatan
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Masukkan kata laluan guru..."
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-mono text-center tracking-widest text-lg"
              />
              {passwordError && (
                <div className="text-xs text-rose-400 font-medium mt-1.5 flex items-center justify-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Kata laluan tidak sah! Sila masukkan kata laluan guru yang sah.</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-950/50"
            >
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
              <span>Buka Papan Pemuka</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Home className="w-4 h-4 text-amber-400" />
              <span>Kembali ke Menu Utama</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render Full Teacher Dashboard
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#090d16] text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-white flex items-center gap-2">
              <span>Papan Pemuka Kaunselor & Guru</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-600/60 font-bold">
                PORTAL GURU
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Analisis Kemajuan Psikososial & Rekod Penilaian Murid
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 hover:bg-emerald-900/60 text-emerald-300 text-xs font-semibold cursor-pointer"
            title="Eksport data ke fail CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Eksport CSV</span>
          </button>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer hidden md:inline-block"
          >
            Kunci Semula
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 hover:text-white border border-amber-500/40 text-xs font-bold transition-all cursor-pointer shadow-sm"
            title="Kembali ke Menu Utama"
          >
            <Home className="w-3.5 h-3.5 text-amber-400" />
            <span>Menu Utama</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
            title="Tutup Papan Pemuka"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium uppercase">
              <span>Jumlah Murid Mengambil</span>
              <Users className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">
              {analytics.total} Orang
            </div>
            <p className="text-[11px] text-slate-400">
              Rekod penyertaan terkumpul aktif
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium uppercase">
              <span>Purata Skor Murid</span>
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-amber-400 font-mono">
              {analytics.avgScore} <span className="text-sm text-slate-500 font-sans">/ 10</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Penunjuk tahap literasi kesihatan mental
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium uppercase">
              <span>Kadar Lencana Adiwira (≥8)</span>
              <Award className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">
              {analytics.badgeRate}%
            </div>
            <p className="text-[11px] text-slate-400">
              Pelajar yang mencapai tahap ketahanan optimum
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium uppercase">
              <span>Isu Paling Mencabar</span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-lg font-bold text-rose-300 truncate" title={analytics.challengeFailRates[0]?.title}>
              {analytics.challengeFailRates[0]?.category || 'Tiada'}
            </div>
            <p className="text-[11px] text-slate-400">
              {analytics.challengeFailRates[0]?.failRate}% pelajar tersilap memilih
            </p>
          </div>
        </div>

        {/* Section: Behavioral Dilemma Analytics (Where students make mistakes) */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Analisis Kerentanan Keputusan Murid (Kadar Kegagalan Cabaran)</span>
              </h2>
              <p className="text-xs text-slate-400">
                Mengenalpasti situasi yang paling mengelirukan pelajar untuk tindakan bengkel bimbingan
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-400">
              Disusun mengikut peratusan kesilapan tertinggi
            </span>
          </div>

          <div className="space-y-3">
            {analytics.challengeFailRates.slice(0, 5).map((item) => (
              <div key={item.id} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-cyan-400 font-bold">#{item.id}</span>
                    <span className="font-bold text-white">{item.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {item.category}
                    </span>
                  </div>
                  <div className="font-mono font-bold text-rose-400">
                    {item.failRate}% Pelajar Tersilap
                  </div>
                </div>

                <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-rose-500 rounded-full transition-all"
                    style={{ width: `${item.failRate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Bar & Student Records Table */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>Senarai Rekod Prestasi Pelajar ({filteredRecords.length})</span>
            </h2>

            {/* Search and Class Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-[200px]">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari nama atau kelas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="all">Semua Kelas</option>
                {classList.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>

              <button
                onClick={handleResetData}
                title="Reset Data Demo"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                onClick={handleClearData}
                title="Padam Semua Rekod"
                className="p-1.5 rounded-lg bg-rose-950/60 border border-rose-800/60 hover:bg-rose-900/60 text-rose-300 text-xs"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Nama Pelajar</th>
                  <th className="px-4 py-3">Kelas</th>
                  <th className="px-4 py-3">Watak</th>
                  <th className="px-4 py-3 text-center">Skor</th>
                  <th className="px-4 py-3 text-center">Lencana</th>
                  <th className="px-4 py-3">Tarikh</th>
                  <th className="px-4 py-3 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                      Tiada rekod pelajar dijumpai.
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-850/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-white">
                        {r.studentName}
                      </td>
                      <td className="px-4 py-3 text-slate-300">
                        {r.studentClass}
                      </td>
                      <td className="px-4 py-3 text-cyan-300">
                        {r.characterName}
                      </td>
                      <td className="px-4 py-3 text-center font-mono font-bold text-white">
                        <span className={r.score >= 8 ? 'text-amber-400' : 'text-slate-300'}>
                          {r.score}
                        </span>
                        <span className="text-slate-600">/10</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {r.hasBadge ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                            <Award className="w-3 h-3" />
                            <span>Adiwira</span>
                          </span>
                        ) : (
                          <span className="text-slate-500 text-[11px]">Penyertaan</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-400 font-mono text-[11px]">
                        {r.completedAt}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => {
                            soundManager.playSelection();
                            setActiveRecordModal(r);
                          }}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium cursor-pointer inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Perincian</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Answer Modal for a specific student */}
      {activeRecordModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">
                  Perincian Jawapan: {activeRecordModal.studentName}
                </h3>
                <p className="text-xs text-slate-400">
                  {activeRecordModal.studentClass} • Skor: {activeRecordModal.score}/10
                </p>
              </div>
              <button
                onClick={() => setActiveRecordModal(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {CHALLENGES.map((ch) => {
                const ans = activeRecordModal.answers.find((a) => a.challengeId === ch.id);
                const chosen = ch.choices.find((c) => c.id === ans?.selectedChoiceId);
                const isCorrect = ans?.isCorrect ?? false;

                return (
                  <div
                    key={ch.id}
                    className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                      isCorrect
                        ? 'bg-emerald-950/20 border-emerald-900/40 text-slate-200'
                        : 'bg-rose-950/20 border-rose-900/40 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span>#{ch.id}. {ch.title}</span>
                      <span className={isCorrect ? 'text-emerald-400' : 'text-rose-400'}>
                        {isCorrect ? 'Tepat' : 'Kurang Tepat'}
                      </span>
                    </div>
                    <div className="text-slate-300">
                      <strong>Pilihan Murid:</strong> {chosen?.text || 'Tiada rekod'}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      <strong>Kesan:</strong> {chosen?.consequence}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
