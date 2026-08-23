"use client";

import { useEffect, useState } from "react";
import { fetchToday, DEMO_BIRTH } from "@/lib/api";
import { useChart } from "@/lib/ChartContext";
import { TodayData } from "@/lib/types";

function todayLocal(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const PHASE_MEANING: Record<string, string> = {
  "New Moon": "A beginning point — traditionally a time for setting intention rather than acting outwardly.",
  "Waxing Crescent": "Early momentum. What was set in motion at the new moon starts to take shape.",
  "First Quarter": "A point of effort and friction — where intention meets practical resistance.",
  "Waxing Gibbous": "Refinement. Things are nearly full but still being adjusted.",
  "Full Moon": "Culmination and visibility. Emotions run closest to the surface here.",
  "Waning Gibbous": "Distribution — sharing or teaching what the cycle produced.",
  "Last Quarter": "Release and reassessment. What no longer fits gets let go.",
  "Waning Crescent": "Rest and dissolution before the next cycle begins.",
};

export default function MoonClient() {
  const { chart } = useChart();
  const place = chart?.birth_info.place ?? DEMO_BIRTH.place;
  const [data, setData] = useState<TodayData | null>(null);

  useEffect(() => {
    fetchToday(todayLocal(), place).then(setData).catch(() => setData(null));
  }, [place]);

  return (
    <div className="mx-auto max-w-[800px] px-[5vw] py-12 lg:px-8">
      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-vyoma-gold">
        Astrology · Moon
      </div>
      <h1 className="mt-2 font-serif text-[clamp(28px,4vw,40px)] font-medium text-vyoma-ink">
        The Moon today
      </h1>

      {!data ? (
        <div className="mt-8 h-48 animate-pulse rounded-sm border border-vyoma-line bg-vyoma-surface" />
      ) : (
        <>
          <div className="mt-8 rounded-sm border border-vyoma-line bg-vyoma-surface p-7">
            <div className="font-serif text-[32px] text-vyoma-ink">
              {data.sky.moon_phase.name}
            </div>
            <div className="mt-1 text-[14px] text-vyoma-muted">
              {data.sky.moon_phase.illumination}% illuminated ·{" "}
              {data.sky.planets.Moon.sign} · {data.sky.planets.Moon.nakshatra} (pada{" "}
              {data.sky.planets.Moon.nakshatra_pada})
            </div>
            <p className="mt-4 border-l-2 border-vyoma-gold pl-4 text-[14px] leading-[1.75] text-vyoma-ink">
              {PHASE_MEANING[data.sky.moon_phase.name] ?? ""}
            </p>
          </div>

          <div className="mt-4 rounded-sm border border-vyoma-line bg-vyoma-surface p-7">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-vyoma-gold">
              Tithi
            </div>
            <div className="mt-2 font-serif text-[22px] text-vyoma-ink">
              {data.panchang.tithi.name}
            </div>
            {data.panchang.tithi.ends && (
              <div className="text-[13px] text-vyoma-muted">till {data.panchang.tithi.ends}</div>
            )}
            <p className="mt-3 text-[13.5px] leading-[1.7] text-vyoma-muted">
              The tithi is the lunar day — the Moon&rsquo;s angular distance from
              the Sun divided into thirty segments. It shifts at its own pace,
              which is why it rarely lines up neatly with the calendar date.
            </p>
          </div>
        </>
      )}

      <div className="mt-10 rounded-sm border border-vyoma-line bg-vyoma-bg-2 p-7">
        <h2 className="font-serif text-[20px] text-vyoma-ink">Why the Moon matters most</h2>
        <p className="mt-3 text-[14px] leading-[1.75] text-vyoma-muted">
          Western astrology leads with the Sun sign. Vedic astrology leads with
          the Moon — your rashi is your Moon sign, not your Sun sign. The Moon
          governs manas, the mind, and its nakshatra at the moment of your birth
          determines your entire Vimshottari dasha timeline, the framework used
          to time events across a whole life.
        </p>
      </div>
    </div>
  );
}
