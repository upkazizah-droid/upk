export interface Character {
  id: string;
  title: string; // e.g., "Penegak Keadilan"
  role: string;  // e.g., "Avatar 1"
  tagline: string;
  imageSrc: string;
}

export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
  consequence: string; // Detailed consequence
  boldTakeaway: string; // Concise bold lesson/key takeaway
  psychologicalImpact: string; // e.g., "Menghalang trauma berpanjangan", "Menyemarakkan ketakutan"
}

export interface Challenge {
  id: number;
  title: string;
  category: 'Buli Siber' | 'Kesihatan Mental' | 'Buli Fizikal' | 'Buli Emosi' | 'Tekanan Akademik' | 'Tekanan Rakan Sebaya';
  situation: string;
  innerMonologue: string;
  imageSrc: string;
  choices: Choice[];
  themeColor: string;
  dangerLevel: 'Sederhana' | 'Tinggi' | 'Kritikal';
}

export interface Player {
  name: string;
  studentClass: string;
  character: Character;
  startTime: number;
}

export interface PlayerAnswer {
  challengeId: number;
  selectedChoiceId: string;
  isCorrect: boolean;
  answeredAt: number;
}

export interface GameRecord {
  id: string;
  studentName: string;
  studentClass: string;
  characterName: string;
  characterId: string;
  score: number; // out of 10
  totalChallenges: number;
  hasBadge: boolean;
  completedAt: string;
  answers: PlayerAnswer[];
  durationMinutes: number;
}
