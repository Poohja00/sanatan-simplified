"use client";

import { useEffect, useState } from "react";
import { fetchToday, DEMO_BIRTH } from "@/lib/api";
import { rashiReadings, RashiReading } from "@/lib/horoscope";
import { TodaySky } from "@/lib/types";

function todayLocal(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function HoroscopeClient() {
  const [sky, setSky] = useState<TodaySky | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetchToday(todayLocal(), DEMO_BIRTH.place)
      .then((d) => setSky(d.sky))
      .catch(() => setFailed(true));
  }, []);

  const readings: RashiReading[] = sky ? rashiReadings(sky) : [];

  return (
    <div className="mx-auto max-w-[1000px] px-[5vw] py-14 lg:px-8">
      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-vyoma-gold">
        Horoscope
      </div>
      <h1 className="mt-2 font-serif text-[clamp(32px,4.8vw,48px)] font-medium text-vyoma-ink">
        Today, for every rashi.
      </h1>
      <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.75] text-vyoma-muted">
        Not a canned prediction — this is computed from where the Moon is
        actually transiting right now{sky ? `, in ${sky.planets.Moon.sign}` : ""},
        read through each rashi&rsquo;s houses. Find your Moon sign on your{" "}
        <a href="/chart" className="text-vyoma-gold hover:opacity-80">birth chart</a> if you don&rsquo;t know it.
      </p>

      {failed && (
        <p className="mt-6 text-[13px] text-[#E08B6C]">
          Can&rsquo;t reach the chart engine right now — horoscopes will load once it&rsquo;s back.
        </p>
      )}

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {(readings.length ? readings : Array.from<RashiReading | null>({ length: 12 }).fill(null)).map((r, i) => (
          <div key={r ? r.sign : i} className="rounded-sm border border-vyoma-line bg-vyoma-surface p-6">
            {r ? (
              <>
                <h2 className="font-serif text-[20px] font-medium text-vyoma-gold">{r.sign}</h2>
                <p className="mt-2 text-[13.5px] leading-[1.7] text-vyoma-muted">{r.guidance}</p>
              </>
            ) : (
              <div className="h-16 animate-pulse rounded bg-vyoma-line/40" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
