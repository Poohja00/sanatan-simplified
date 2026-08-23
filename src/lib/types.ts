export type PlanetName =
  | "Sun" | "Moon" | "Mars" | "Mercury" | "Jupiter" | "Venus" | "Saturn" | "Rahu" | "Ketu";

export type PlanetPosition = {
  longitude: number;
  sign: string;
  sign_index: number;
  degree_in_sign: number;
  house: number;
  nakshatra: string;
  nakshatra_pada: number;
  retrograde: boolean;
};

export type DashaPeriod = { lord: string; start: string; end: string };

export type ChartData = {
  birth_info: { dob: string; tob: string; place: string; lat: number; lon: number; timezone: string };
  ascendant: {
    longitude: number;
    sign: string;
    sign_index: number;
    nakshatra: string;
    nakshatra_pada: number;
  };
  planets: Record<PlanetName, PlanetPosition>;
  houses: Record<string, string>; // house number (as string key) -> sign
  dasha_timeline: DashaPeriod[];
};

export type Highlight = { label: string; text: string; house: number };

export type HouseExplanation = {
  house: number;
  name: string;
  traditional_name: string;
  what_you_see: string;
  in_simple_words: string;
  why: string;
};

export type PlanetExplanation = {
  planet: string;
  position: string;
  nakshatra: string;
  simple: string;
  deeper: string;
  traditional: string;
};

export type AskResponse = {
  matched_topic?: string;
  short_answer: string;
  why: string[];
  deeper: string;
  related_topics: string[];
};

export type ChartApiError = { message: string; suggestions: string[] };

export type Kuta = {
  name: string;
  max: number;
  score: number;
  detail: string;
  dosha?: boolean;
};

export type MatchResult = {
  kutas: Kuta[];
  total: number;
  max_total: number;
  verdict: string;
  overriding_factor: string | null;
  groom_moon: { sign: string; sign_index: number; degree_in_sign: number; nakshatra: string };
  bride_moon: { sign: string; sign_index: number; degree_in_sign: number; nakshatra: string };
};

export type SkyPlanet = {
  sign: string;
  degree_in_sign: number;
  nakshatra: string;
  nakshatra_pada: number;
  retrograde: boolean;
};

export type TodaySky = {
  date: string;
  place: string;
  planets: Record<PlanetName, SkyPlanet>;
  moon_phase: { name: string; illumination: number };
  retrogrades: string[];
};

export type TodayData = { sky: TodaySky; panchang: PanchangData };

export type PanchangData = {
  date: string;
  place: string;
  weekday: string;
  tithi: { name: string; ends: string | null };
  nakshatra: { name: string; pada: number; ends: string | null };
  yoga: { name: string; ends: string | null };
  karana: { name: string; ends: string | null };
  sunrise: string;
  sunset: string;
  rahu_kalam: string;
  moon_sign: string;
  sun_sign: string;
};
