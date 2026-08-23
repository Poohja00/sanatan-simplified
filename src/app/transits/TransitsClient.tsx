"use client";

import { useEffect, useState } from "react";
import { fetchToday, DEMO_BIRTH } from "@/lib/api";
import { useChart } from "@/lib/ChartContext";
import { TodayData, PlanetName } from "@/lib/types";

function todayLocal(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function TransitsClient() {
  const { chart } = useChart();
  const place = chart?.birth_info.place ?? DEMO_BIRTH.place;
  const [data, setData] = useState<TodayData | null>(null);

  useEffect(() => {
    fetchToday(todayLocal(), place).then(setData).catch(() => setData(null));
  }, [place]);

  return (
    <div className="mx-auto max-w-[900px] px-[5vw] py-12 lg:px-8">
      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-vyoma-gold">
        Astrology · Transits
      </div>
      <h1 className="mt-2 font-serif text-[clamp(28px,4vw,40px)] font-medium text-vyoma-ink">
        Where the planets are now
      </h1>
      <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.75] text-vyoma-muted">
        Transits (gochara) are the planets&rsquo; current positions, as opposed
        to where they sat at your birth. Traditionally they are read{" "}
        <em>from your Moon sign</em> rather than your rising sign.
      </p>

      {!data ? (
        <div className="mt-8 h-64 animate-pulse rounded-sm border border-vyoma-line bg-vyoma-surface" />
      ) : (
        <>
          {chart && (
            <div className="mt-6 rounded-sm border border-vyoma-line bg-vyoma-bg-2 p-5 text-[13.5px] text-vyoma-muted">
              Your Moon sign is{" "}
              <span className="text-vyoma-gold">{chart.planets.Moon.sign}</span> —
              count each transiting planet&rsquo;s position from there to read
              its gochara house.
            </div>
          )}

          <div className="mt-6 overflow-x-auto rounded-sm border border-vyoma-line">
            <table className="w-full min-w-[520px] border-collapse text-[13px]">
              <thead>
                <tr className="bg-vyoma-bg-2 text-left text-[10px] uppercase tracking-[0.1em] text-vyoma-faint">
                  <th className="p-3 font-semibold">Planet</th>
                  <th className="p-3 font-semibold">Now in</th>
                  <th className="p-3 font-semibold">Nakshatra</th>
                  <th className="p-3 font-semibold">Natal position</th>
                </tr>
              </thead>
              <tbody>
                {(Object.entries(data.sky.planets) as [PlanetName, typeof data.sky.planets[PlanetName]][]).map(
                  ([name, p]) => (
                    <tr key={name} className="border-t border-vyoma-line bg-vyoma-surface">
                      <td className="p-3 text-vyoma-ink">
                        {name}
                        {p.retrograde && name !== "Rahu" && name !== "Ketu" && (
                          <span className="ml-1 text-vyoma-gold">℞</span>
                        )}
                      </td>
                      <td className="p-3 text-vyoma-gold">
                        {p.sign} <span className="tabular-nums text-vyoma-faint">{p.degree_in_sign}°</span>
                      </td>
                      <td className="p-3 text-vyoma-muted">{p.nakshatra}</td>
                      <td className="p-3 text-vyoma-muted">
                        {chart ? (
                          <>
                            {chart.planets[name].sign}
                            <span className="text-vyoma-faint"> · house {chart.planets[name].house}</span>
                          </>
                        ) : (
                          <span className="text-vyoma-faint">—</span>
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {data.sky.retrogrades.length > 0 && (
            <div className="mt-4 rounded-sm border border-vyoma-line bg-vyoma-surface p-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-vyoma-gold">
                Retrograde right now
              </div>
              <div className="mt-2 text-[14px] text-vyoma-ink">
                {data.sky.retrogrades.join(", ")}
              </div>
              <p className="mt-2 text-[13px] leading-[1.7] text-vyoma-muted">
                A retrograde planet appears to move backwards from Earth&rsquo;s
                view. Classical texts treat it as a planet turned inward —
                strong, but expressing through review rather than forward motion.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
