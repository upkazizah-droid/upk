import { GameRecord, Player, PlayerAnswer } from '../types/game';

const RECORDS_STORAGE_KEY = 'pov_main_character_records_v1';
const CURRENT_PLAYER_KEY = 'pov_main_character_current_player_v1';

const INITIAL_DEMO_RECORDS: GameRecord[] = [
  {
    id: 'REC-2026-001',
    studentName: 'Muhammad Harith',
    studentClass: 'Tingkatan 5 Sains 1',
    characterName: 'Penegak Keadilan',
    characterId: 'avatar-1',
    score: 9,
    totalChallenges: 10,
    hasBadge: true,
    completedAt: '2026-10-10 10:24 AM',
    durationMinutes: 8,
    answers: [
      { challengeId: 1, selectedChoiceId: '1c', isCorrect: true, answeredAt: 1 },
      { challengeId: 2, selectedChoiceId: '2c', isCorrect: true, answeredAt: 2 },
      { challengeId: 3, selectedChoiceId: '3c', isCorrect: true, answeredAt: 3 },
      { challengeId: 4, selectedChoiceId: '4c', isCorrect: true, answeredAt: 4 },
      { challengeId: 5, selectedChoiceId: '5c', isCorrect: true, answeredAt: 5 },
      { challengeId: 6, selectedChoiceId: '6c', isCorrect: true, answeredAt: 6 },
      { challengeId: 7, selectedChoiceId: '7c', isCorrect: true, answeredAt: 7 },
      { challengeId: 8, selectedChoiceId: '8c', isCorrect: true, answeredAt: 8 },
      { challengeId: 9, selectedChoiceId: '9a', isCorrect: false, answeredAt: 9 },
      { challengeId: 10, selectedChoiceId: '10c', isCorrect: true, answeredAt: 10 }
    ]
  },
  {
    id: 'REC-2026-002',
    studentName: 'Nurul Iman Binti Roslan',
    studentClass: 'Tingkatan 5 Sastera 2',
    characterName: 'Pengamat Tenang',
    characterId: 'avatar-2',
    score: 10,
    totalChallenges: 10,
    hasBadge: true,
    completedAt: '2026-10-11 02:15 PM',
    durationMinutes: 7,
    answers: Array.from({ length: 10 }, (_, i) => ({
      challengeId: i + 1,
      selectedChoiceId: `${i + 1}c`,
      isCorrect: true,
      answeredAt: i + 1
    }))
  },
  {
    id: 'REC-2026-003',
    studentName: 'Adam Farhan Bin Zulkifli',
    studentClass: 'Tingkatan 4 Teknik 1',
    characterName: 'Suara Kreatif',
    characterId: 'avatar-3',
    score: 7,
    totalChallenges: 10,
    hasBadge: false,
    completedAt: '2026-10-11 04:40 PM',
    durationMinutes: 11,
    answers: [
      { challengeId: 1, selectedChoiceId: '1c', isCorrect: true, answeredAt: 1 },
      { challengeId: 2, selectedChoiceId: '2a', isCorrect: false, answeredAt: 2 },
      { challengeId: 3, selectedChoiceId: '3c', isCorrect: true, answeredAt: 3 },
      { challengeId: 4, selectedChoiceId: '4b', isCorrect: false, answeredAt: 4 },
      { challengeId: 5, selectedChoiceId: '5c', isCorrect: true, answeredAt: 5 },
      { challengeId: 6, selectedChoiceId: '6c', isCorrect: true, answeredAt: 6 },
      { challengeId: 7, selectedChoiceId: '7a', isCorrect: false, answeredAt: 7 },
      { challengeId: 8, selectedChoiceId: '8c', isCorrect: true, answeredAt: 8 },
      { challengeId: 9, selectedChoiceId: '9c', isCorrect: true, answeredAt: 9 },
      { challengeId: 10, selectedChoiceId: '10c', isCorrect: true, answeredAt: 10 }
    ]
  },
  {
    id: 'REC-2026-004',
    studentName: 'Chloe Tan Wei Ling',
    studentClass: 'Tingkatan 5 Sains 1',
    characterName: 'Pemimpin Berempati',
    characterId: 'avatar-4',
    score: 8,
    totalChallenges: 10,
    hasBadge: true,
    completedAt: '2026-10-12 09:10 AM',
    durationMinutes: 9,
    answers: [
      { challengeId: 1, selectedChoiceId: '1c', isCorrect: true, answeredAt: 1 },
      { challengeId: 2, selectedChoiceId: '2c', isCorrect: true, answeredAt: 2 },
      { challengeId: 3, selectedChoiceId: '3c', isCorrect: true, answeredAt: 3 },
      { challengeId: 4, selectedChoiceId: '4a', isCorrect: false, answeredAt: 4 },
      { challengeId: 5, selectedChoiceId: '5c', isCorrect: true, answeredAt: 5 },
      { challengeId: 6, selectedChoiceId: '6c', isCorrect: true, answeredAt: 6 },
      { challengeId: 7, selectedChoiceId: '7c', isCorrect: true, answeredAt: 7 },
      { challengeId: 8, selectedChoiceId: '8c', isCorrect: true, answeredAt: 8 },
      { challengeId: 9, selectedChoiceId: '9a', isCorrect: false, answeredAt: 9 },
      { challengeId: 10, selectedChoiceId: '10c', isCorrect: true, answeredAt: 10 }
    ]
  }
];

const memoryStore: Record<string, string> = {};

function safeGetItem(key: string): string | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(key);
    }
  } catch {
    // Fallback to memory
  }
  return memoryStore[key] ?? null;
}

function safeSetItem(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, value);
      return;
    }
  } catch {
    // Fallback to memory
  }
  memoryStore[key] = value;
}

function safeRemoveItem(key: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(key);
      return;
    }
  } catch {
    // Fallback to memory
  }
  delete memoryStore[key];
}

export function getRecords(): GameRecord[] {
  try {
    const raw = safeGetItem(RECORDS_STORAGE_KEY);
    if (!raw) {
      safeSetItem(RECORDS_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_RECORDS));
      return INITIAL_DEMO_RECORDS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DEMO_RECORDS;
  }
}

export function saveRecord(
  player: Player,
  score: number,
  answers: PlayerAnswer[],
  durationMinutes: number
): GameRecord {
  const records = getRecords();
  const dateStr = new Date().toLocaleDateString('ms-MY', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const newRecord: GameRecord = {
    id: `REC-${Date.now().toString(36).toUpperCase()}`,
    studentName: player.name,
    studentClass: player.studentClass,
    characterName: player.character.title,
    characterId: player.character.id,
    score,
    totalChallenges: 10,
    hasBadge: score >= 8,
    completedAt: dateStr,
    answers,
    durationMinutes
  };

  records.unshift(newRecord);
  try {
    safeSetItem(RECORDS_STORAGE_KEY, JSON.stringify(records));
  } catch (err) {
    console.error('Failed to save record to storage', err);
  }

  return newRecord;
}

export function clearAllRecords() {
  safeSetItem(RECORDS_STORAGE_KEY, JSON.stringify([]));
}

export function resetToDemoRecords() {
  safeSetItem(RECORDS_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_RECORDS));
}

export function saveCurrentPlayer(player: Player | null) {
  if (!player) {
    safeRemoveItem(CURRENT_PLAYER_KEY);
  } else {
    safeSetItem(CURRENT_PLAYER_KEY, JSON.stringify(player));
  }
}

export function getCurrentPlayer(): Player | null {
  try {
    const raw = safeGetItem(CURRENT_PLAYER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

