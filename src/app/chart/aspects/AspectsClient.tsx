"use client";

import { useChart } from "@/lib/ChartContext";
import { computeAspects } from "@/lib/aspects";
import { HOUSES } from "@/lib/explore-content";

function ordinal(n: number) {
  if (n % 10 === 1 && n % 100 !== 11) return `${n}st`;
  if (n % 10 === 2 && n % 100 !== 12) return `${n}nd`;
  if (n % 10 === 3 && n % 100 !== 13) return `${n}rd`;
  return `${n}th`;
}

export default function AspectsClient() {
  const { chart } = useChart();

  if (!chart) {
    return (
      <div className="grid min-h-[40vh] place-items-center text-vyoma-muted">
        Reading the sky…
      </div>
    );
  }

  const aspects = computeAspects(chart);
  const byPlanet = aspects.reduce<Record<string, typeof aspects>>((acc, a) => {
    (acc[a.from] ??= []).push(a);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-[900px] px-[5vw] py-12 lg:px-8">
      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-vyoma-gold">
        My Blueprint
      </div>
      <h1 className="mt-2 font-serif text-[clamp(28px,4vw,40px)] font-medium text-vyoma-ink">
        Aspects
      </h1>
      <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.75] text-vyoma-muted">
        In Vedic astrology, aspects (graha drishti) work by house count, not by
        degree. Every planet fully aspects the 7th house from where it sits.
        Mars, Jupiter and Saturn each have two additional special aspects —
        which is why those three shape a chart so heavily.
      </p>

      <div className="mt-10 flex flex-col gap-4">
        {Object.entries(byPlanet).map(([planet, list]) => {
          const pos = chart.planets[planet as keyof typeof chart.planets];
          return (
            <article key={planet} className="rounded-sm border border-vyoma-line bg-vyoma-surface p-6">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h2 className="font-serif text-[20px] font-medium text-vyoma-ink">{planet}</h2>
                <span className="text-[12.5px] text-vyoma-muted">
                  in house {pos.house} · {pos.sign}
                </span>
              </div>
              <div className="mt-3 flex flex-col gap-2">
                {list.map((a) => {
                  const house = HOUSES.find((h) => h.num === a.toHouse)!;
                  return (
                    <div
                      key={`${a.from}-${a.distance}`}
                      className="flex flex-wrap items-baseline gap-x-2 border-t border-vyoma-line pt-2 text-[13px]"
                    >
                      <span className="text-vyoma-gold">{ordinal(a.distance)} aspect</span>
                      <span className="text-vyoma-ink">→ house {a.toHouse}</span>
                      <span className="text-vyoma-muted">({house.name})</span>
                      {a.kind === "special" && (
                        <span className="rounded-full border border-vyoma-line px-2 py-px text-[10px] text-vyoma-faint">
                          special
                        </span>
                      )}
                      {a.hitting.length > 0 && (
                        <span className="text-vyoma-ink">
                          · aspecting {a.hitting.join(", ")}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
