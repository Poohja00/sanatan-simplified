import { ChartData, PlanetName } from "./types";

/**
 * Vedic graha drishti (planetary aspects) — deliberately NOT Western aspects.
 *
 * Every planet aspects the 7th house from itself. Mars, Jupiter and Saturn
 * have additional special aspects:
 *   Mars    — 4th and 8th
 *   Jupiter — 5th and 9th
 *   Saturn  — 3rd and 10th
 * Rahu/Ketu aspects are debated across traditions; we include only the
 * universally-accepted 7th for them rather than pick a side.
 */
const SPECIAL: Partial<Record<PlanetName, number[]>> = {
  Mars: [4, 8],
  Jupiter: [5, 9],
  Saturn: [3, 10],
};

export type Aspect = {
  from: PlanetName;
  toHouse: number;
  distance: number;
  kind: "full" | "special";
  hitting: PlanetName[];
};

export function computeAspects(chart: ChartData): Aspect[] {
  const planets = Object.entries(chart.planets) as [PlanetName, ChartData["planets"][PlanetName]][];
  const out: Aspect[] = [];

  for (const [name, pos] of planets) {
    const distances = [7, ...(SPECIAL[name] ?? [])];
    for (const d of distances) {
      const toHouse = ((pos.house - 1 + (d - 1)) % 12) + 1;
      const hitting = planets
        .filter(([other, op]) => other !== name && op.house === toHouse)
        .map(([other]) => other);
      out.push({
        from: name,
        toHouse,
        distance: d,
        kind: d === 7 ? "full" : "special",
        hitting,
      });
    }
  }
  return out;
}
