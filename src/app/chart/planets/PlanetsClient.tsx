"use client";

import { useChart } from "@/lib/ChartContext";
import { PlanetName } from "@/lib/types";
import { HOUSES } from "@/lib/explore-content";

const SANSKRIT: Record<string, string> = {
  Sun: "Surya", Moon: "Chandra", Mars: "Mangala", Mercury: "Budha",
  Jupiter: "Guru", Venus: "Shukra", Saturn: "Shani", Rahu: "Rahu", Ketu: "Ketu",
};

export default function PlanetsClient() {
  const { chart } = useChart();

  if (!chart) {
    return (
      <div className="grid min-h-[40vh] place-items-center text-vyoma-muted">
        Reading the sky…
      </div>
    );
  }

  const planets = Object.entries(chart.planets) as [PlanetName, typeof chart.planets[PlanetName]][];

  return (
    <div className="mx-auto max-w-[1000px] px-[5vw] py-12 lg:px-8">
      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-vyoma-gold">
        My Blueprint
      </div>
      <h1 className="mt-2 font-serif text-[clamp(28px,4vw,40px)] font-medium text-vyoma-ink">
        Planets &amp; Houses
      </h1>
      <p className="mt-2 text-[13px] text-vyoma-muted">
        {chart.birth_info.place} · Ascendant {chart.ascendant.sign} ·{" "}
        {chart.ascendant.nakshatra}
      </p>

      <h2 className="mt-10 font-serif text-[22px] text-vyoma-ink">Where your planets sit</h2>
      <div className="mt-4 overflow-x-auto rounded-sm border border-vyoma-line">
        <table className="w-full min-w-[560px] border-collapse text-[13px]">
          <thead>
            <tr className="bg-vyoma-bg-2 text-left text-[10px] uppercase tracking-[0.1em] text-vyoma-faint">
              <th className="p-3 font-semibold">Planet</th>
              <th className="p-3 font-semibold">Sign</th>
              <th className="p-3 font-semibold">House</th>
              <th className="p-3 font-semibold">Nakshatra</th>
              <th className="p-3 font-semibold tabular-nums">Degree</th>
            </tr>
          </thead>
          <tbody>
            {planets.map(([name, p]) => (
              <tr key={name} className="border-t border-vyoma-line bg-vyoma-surface">
                <td className="p-3 text-vyoma-ink">
                  {name}
                  {p.retrograde && name !== "Rahu" && name !== "Ketu" && (
                    <span className="ml-1 text-vyoma-gold" title="Retrograde">℞</span>
                  )}
                  <span className="ml-2 text-[10px] text-vyoma-faint">{SANSKRIT[name]}</span>
                </td>
                <td className="p-3 text-vyoma-gold">{p.sign}</td>
                <td className="p-3 tabular-nums text-vyoma-ink">{p.house}</td>
                <td className="p-3 text-vyoma-muted">
                  {p.nakshatra} <span className="text-vyoma-faint">· pada {p.nakshatra_pada}</span>
                </td>
                <td className="p-3 tabular-nums text-vyoma-muted">{p.degree_in_sign}°</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 font-serif text-[22px] text-vyoma-ink">Your twelve houses</h2>
      <div className="mt-4 grid gap-px overflow-hidden rounded-sm border border-vyoma-line bg-vyoma-line sm:grid-cols-2">
        {HOUSES.map((h) => {
          const sign = chart.houses[String(h.num)];
          const occupants = planets.filter(([, p]) => p.house === h.num).map(([n]) => n);
          return (
            <div key={h.num} className="bg-vyoma-surface p-5">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-[20px] text-vyoma-gold">{h.num}</span>
                <span className="text-[14px] text-vyoma-ink">{h.name}</span>
              </div>
              <div className="mt-1 text-[12.5px] text-vyoma-muted">
                {sign}
                {occupants.length > 0 && (
                  <span className="text-vyoma-ink"> · {occupants.join(", ")}</span>
                )}
              </div>
              <p className="mt-1.5 text-[12px] leading-[1.6] text-vyoma-faint">{h.short}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
