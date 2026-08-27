import { HOUSES } from "./explore-content";
import { TodaySky } from "./types";

const SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

export type RashiReading = {
  sign: string;
  moonHouse: number;
  houseName: string;
  guidance: string;
};

/**
 * Classical Moon-transit rashi horoscope: for each rashi, count the house
 * the transiting Moon currently occupies FROM that rashi, then read that
 * house's real significations. This is the same method drikpanchang/
 * astrosage use for "Moon sign horoscope" — derived from real transit
 * data, not an invented daily fortune.
 */
export function rashiReadings(sky: TodaySky): RashiReading[] {
  const moonSignIndex = SIGNS.indexOf(sky.planets.Moon.sign);
  return SIGNS.map((sign, rashiIndex) => {
    const moonHouse = ((moonSignIndex - rashiIndex + 12) % 12) + 1;
    const h = HOUSES[moonHouse - 1];
    return {
      sign,
      moonHouse,
      houseName: h.name,
      guidance: `The Moon transits your ${moonHouse}${ordinal(moonHouse)} house today (${h.name}) — ${h.short.toLowerCase()}`,
    };
  });
}

function ordinal(n: number): string {
  if (n === 1 || n === 21) return "st";
  if (n === 2 || n === 22) return "nd";
  if (n === 3 || n === 23) return "rd";
  return "th";
}
