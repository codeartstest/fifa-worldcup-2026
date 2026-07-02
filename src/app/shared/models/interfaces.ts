export interface Fixture {
  id: number;
  date: string;
  status: string;
  statusShort: string;
  homeTeam: TeamShort;
  awayTeam: TeamShort;
  goalsHome: number | null;
  goalsAway: number | null;
  venue: string;
  round: string;
}

export interface TeamShort {
  id: number;
  name: string;
  logo: string;
  code?: string;
}

export interface TeamDetail {
  id: number;
  name: string;
  logo: string;
  code: string;
  country: string;
  founded: number;
  venue: string;
  squad: Player[];
}

export interface Player {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number;
  nationality: string;
  position: string;
  number: number | null;
  photo: string;
}

export interface PlayerStat {
  player: Player;
  games: { appearences: number; lineups: number; minutes: number };
  goals: { total: number; assists: number };
  cards: { yellow: number; red: number };
  penalty?: { won: number; commited: number; scored: number; missed: number };
}

export interface MatchEvent {
  time: string;
  type: string;
  detail: string;
  player: string;
  team: string;
}

export interface GroupStanding {
  group: string;
  team: TeamShort;
  rank: number;
  played: number;
  won: number;
  draw: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
}

export interface BracketRound {
  round: string;
  matches: Fixture[];
}

export interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  category: string;
  author: string;
  date: string;
  image: string;
  content: string;
}

export interface Venue {
  id: number;
  name: string;
  city: string;
  country: string;
  capacity: number;
  image: string;
  surface: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta: {
    cached: boolean;
    cacheTTL: number;
    pagination?: { page: number; perPage: number; total: number };
  };
  error?: { code: number; message: string };
}