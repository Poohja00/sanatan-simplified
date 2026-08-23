"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fetchPanchang, DEMO_BIRTH } from "@/lib/api";
import { useChart } from "@/lib/ChartContext";
import { PanchangData } from "@/lib/types";

function todayLocal(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function PanchangCard() {
  const { chart } = useChart();
  const place = chart?.birth_info.place ?? DEMO_BIRTH.place;
  const [p, setP] = useState<PanchangData | null>(null);

  useEffect(() => {
    fetchPanchang(todayLocal(), place).then(setP).catch(() => setP(null));
  }, [place]);

  const cols = p
    ? [
        { label: "Tithi", value: p.tithi.name.split(" ").slice(1).join(" ") || p.tithi.name, time: p.tithi.ends ? `till ${p.tithi.ends}` : "" },
        { label: "Nakshatra", value: p.nakshatra.name, time: p.nakshatra.ends ? `till ${p.nakshatra.ends}` : "" },
        { label: "Yoga", value: p.yoga.name, time: p.yoga.ends ? `till ${p.yoga.ends}` : "" },
        { label: "Karana", value: p.karana.name, time: p.karana.ends ? `till ${p.karana.ends}` : "" },
        { label: "Sunrise", value: p.sunrise, time: "" },
        { label: "Sunset", value: p.sunset, time: "" },
      ]
    : [];

  return (
    <section className="bg-vyoma-ivory px-[6vw] py-24 text-vyoma-ink-dark">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-vyoma-gold">
            Today&rsquo;s Panchang
          </div>
          <h2 className="mt-4 font-serif text-[clamp(28px,4vw,42px)] font-medium leading-[1.1] text-vyoma-ink-dark">
            Align with
            <br />
            the cosmic rhythm.
          </h2>
          <p className="mt-3 max-w-[40ch] text-[15px] leading-[1.65] text-vyoma-muted-dark">
            Plan your day with clarity and harmony.
          </p>
          <Link
            href="/panchang"
            className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-vyoma-gold hover:opacity-80"
          >
            View Full Panchang →
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="rounded-sm border border-vyoma-line-light/60 bg-white/70 p-6 shadow-[0_20px_60px_-30px_rgba(30,20,10,0.35)]"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-vyoma-line-light/60 pb-4">
            <span className="text-[13px] font-medium text-vyoma-ink-dark">📍 {place}</span>
            <span className="text-[12px] text-vyoma-muted-dark">
              {p ? `${p.weekday}, ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}` : "—"}
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
            {(p ? cols : Array.from({ length: 6 }, () => null)).map((c, i) => (
              <div key={c ? c.label : i}>
                <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-vyoma-muted-dark">
                  {c ? c.label : <span className="inline-block h-3 w-16 animate-pulse rounded bg-vyoma-line-light/50" />}
                </div>
                <div className="mt-1 font-serif text-[16px] text-vyoma-ink-dark">
                  {c ? c.value : ""}
                </div>
                {c?.time && <div className="text-[11px] text-vyoma-muted-dark">{c.time}</div>}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
