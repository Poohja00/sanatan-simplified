"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchPanchang } from "@/lib/api";
import { PanchangData } from "@/lib/types";

function todayLocal(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function TodayPanchang({ place }: { place: string }) {
  const [p, setP] = useState<PanchangData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setP(null);
    setError(false);
    fetchPanchang(todayLocal(), place)
      .then(setP)
      .catch(() => setError(true));
  }, [place]);

  type Field = { label: string; value: string; detail: string };

  const fields: (Field | null)[] = p
    ? [
        { label: "Tithi", value: p.tithi.name, detail: p.tithi.ends ? `till ${p.tithi.ends}` : "" },
        { label: "Nakshatra", value: p.nakshatra.name, detail: p.nakshatra.ends ? `till ${p.nakshatra.ends} · pada ${p.nakshatra.pada}` : "" },
        { label: "Yoga", value: p.yoga.name, detail: p.yoga.ends ? `till ${p.yoga.ends}` : "" },
        { label: "Karana", value: p.karana.name, detail: p.karana.ends ? `till ${p.karana.ends}` : "" },
        { label: "Sunrise", value: p.sunrise, detail: "" },
        { label: "Sunset", value: p.sunset, detail: "" },
        { label: "Rahu Kalam", value: p.rahu_kalam, detail: "avoid new starts" },
        { label: "Moon sign", value: p.moon_sign, detail: "" },
      ]
    : Array.from({ length: 8 }, () => null);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-[1180px] px-[5vw] pb-20 md:px-0"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.17em] text-vyoma-gold">
            Today&rsquo;s panchang
          </div>
          <h3 className="mt-2 font-serif text-[27px] font-medium text-vyoma-ink">
            The sky, at a glance.
          </h3>
        </div>
        <span className="text-[11px] text-[#8B7480]">
          {p ? `${p.weekday} · ${place.toUpperCase()}` : place.toUpperCase()}
        </span>
      </div>

      {error && (
        <p className="mt-6 text-[13px] text-[#E08B6C]">
          Couldn&rsquo;t reach the chart engine for today&rsquo;s panchang.
        </p>
      )}

      <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-vyoma-line bg-vyoma-line sm:grid-cols-4">
        {fields.map((f, i) => (
          <div key={f ? f.label : i} className="bg-vyoma-surface p-5">
            {f ? (
              <>
                <div className="text-[10px] uppercase tracking-[0.1em] text-vyoma-faint">
                  {f.label}
                </div>
                <div className="mt-1.5 font-serif text-[19px] text-vyoma-ink">
                  {f.value}
                </div>
                {f.detail && (
                  <div className="mt-1 text-[11px] text-vyoma-muted">
                    {f.detail}
                  </div>
                )}
              </>
            ) : (
              <div className="h-[52px] animate-pulse rounded-sm bg-vyoma-line/40" />
            )}
          </div>
        ))}
      </div>
    </motion.section>
  );
}
