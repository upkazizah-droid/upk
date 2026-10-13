import { Character } from '../types/game';
import heroCover from '../assets/images/pov_game_hero_cover_1791854916160.jpg';
import badgeLocalHero from '../assets/images/badge_local_hero_1791860885221.jpg';
import avatarInvestigator from '../assets/images/avatar_ref_investigator_1791863029113.jpg';
import avatarEmpathy from '../assets/images/avatar_ref_empathy_1791863073657.jpg';
import avatarStrategist from '../assets/images/avatar_ref_strategist_1791863114635.jpg';
import avatarHijab from '../assets/images/avatar_ref_hijab_1791863160307.jpg';

export const HERO_COVER_IMAGE = heroCover;
export const BADGE_LOCAL_HERO_IMAGE = badgeLocalHero;

export const CHARACTERS: Character[] = [
  {
    id: 'avatar-1',
    title: 'Penyiasat Asertif',
    role: 'Avatar 1',
    tagline: 'Peka fakta, berani bersuara dan tenang di bawah tekanan.',
    imageSrc: avatarInvestigator
  },
  {
    id: 'avatar-2',
    title: 'Wira Empati',
    role: 'Avatar 2',
    tagline: 'Pakar mendengar, peka perasaan dan melindungi rakan sekeliling.',
    imageSrc: avatarEmpathy
  },
  {
    id: 'avatar-3',
    title: 'Strategis Berprinsip',
    role: 'Avatar 3',
    tagline: 'Tegas menolak manipulasi toksik, berfikiran analitikal dan berfakta.',
    imageSrc: avatarStrategist
  },
  {
    id: 'avatar-4',
    title: 'Penegak Berhemah',
    role: 'Avatar 4',
    tagline: 'Berhemah, berintegriti tinggi dan matang menangani krisis.',
    imageSrc: avatarHijab
  }
];

export function getCharacterAvatar(charId?: string, fallbackSrc?: string): string {
  const found = CHARACTERS.find((c) => c.id === charId);
  return found?.imageSrc || fallbackSrc || CHARACTERS[0].imageSrc;
}
