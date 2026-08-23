"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fetchToday, DEMO_BIRTH } from "@/lib/api";
import { useChart } from "@/lib/ChartContext";
import { TodayData, PlanetName } from "@/lib/types";

function todayLocal(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const PLANET_SANSKRIT: Record<string, string> = {
  Sun: "Surya", Moon: "Chandra", Mars: "Mangala", Mercury: "Budha",
  Jupiter: "Guru", Venus: "Shukra", Saturn: "Shani", Rahu: "Rahu", Ketu: "Ketu",
};

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-sm border border-vyoma-line bg-vyoma-surface p-6 ${className}`}>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-vyoma-gold">
      {children}
    </div>
  );
}

/** A simple lit-fraction moon, drawn from real illumination % */
function MoonGlyph({ illumination }: { illumination: number }) {
  const r = 26;
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16">
      <circle cx="32" cy="32" r={r} fill="#171210" stroke="#3a332b" strokeWidth="1" />
      <clipPath id="moon-clip">
        <circle cx="32" cy="32" r={r} />
      </clipPath>
      <rect
        x="32"
        y={32 - r}
        width={(illumination / 100) * r * 2 - r > 0 ? (illumination / 100) * r * 2 - r : 0}
        height={r * 2}
        fill="#c6a66b"
        clipPath="url(#moon-clip)"
        opacity="0.85"
      />
      <ellipse
        cx="32"
        cy="32"
        rx={Math.abs(r - (illumination / 100) * r * 2)}
        ry={r}
        fill={illumination < 50 ? "#171210" : "#c6a66b"}
        clipPath="url(#moon-clip)"
        opacity={illumination < 50 ? 1 : 0.85}
      />
      <circle cx="32" cy="32" r={r} fill="none" stroke="#c6a66b" strokeWidth="0.75" opacity="0.5" />
    </svg>
  );
}

export default function TodayClient() {
  const { chart } = useChart();
  const place = chart?.birth_info.place ?? DEMO_BIRTH.place;
  const [data, setData] = useState<TodayData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setData(null);
    setError(false);
    fetchToday(todayLocal(), place).then(setData).catch(() => setError(true));
  }, [place]);

  const prettyDate = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });

  return (
    <div className="mx-auto max-w-[1100px] px-[5vw] py-12 lg:px-8">
      <Label>Today</Label>
      <h1 className="mt-2 font-serif text-[clamp(30px,4.5vw,44px)] font-medium text-vyoma-ink">
        {prettyDate}
      </h1>
      <p className="mt-1 text-[13px] text-vyoma-muted">{place}</p>

      {error && (
        <p className="mt-8 text-[13px] text-[#E08B6C]">
          Couldn&rsquo;t reach the chart engine — today&rsquo;s sky will load once it&rsquo;s back.
        </p>
      )}

      {!data && !error && (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-sm border border-vyoma-line bg-vyoma-surface" />
          ))}
        </div>
      )}

      {data && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 grid gap-4 md:grid-cols-2"
        >
          {/* Moon */}
          <Card>
            <Label>Moon</Label>
            <div className="mt-3 flex items-center gap-5">
              <MoonGlyph illumination={data.sky.moon_phase.illumination} />
              <div>
                <div className="font-serif text-[24px] text-vyoma-ink">
                  {data.sky.moon_phase.name}
                </div>
                <div className="mt-1 text-[13px] text-vyoma-muted">
                  {data.sky.moon_phase.illumination}% illuminated
                </div>
                <div className="mt-1 text-[13px] text-vyoma-muted">
                  In {data.sky.planets.Moon.sign} · {data.sky.planets.Moon.nakshatra}
                </div>
              </div>
            </div>
          </Card>

          {/* Panchang summary */}
          <Card>
            <Label>Panchang</Label>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
              {[
                ["Tithi", data.panchang.tithi.name, data.panchang.tithi.ends],
                ["Nakshatra", data.panchang.nakshatra.name, data.panchang.nakshatra.ends],
                ["Yoga", data.panchang.yoga.name, data.panchang.yoga.ends],
                ["Karana", data.panchang.karana.name, data.panchang.karana.ends],
              ].map(([label, value, ends]) => (
                <div key={label as string}>
                  <div className="text-[10px] uppercase tracking-[0.1em] text-vyoma-faint">{label}</div>
                  <div className="font-serif text-[16px] text-vyoma-ink">{value}</div>
                  {ends && <div className="text-[11px] text-vyoma-muted">till {ends}</div>}
                </div>
              ))}
            </div>
            <Link href="/panchang" className="mt-4 inline-block text-[12px] text-vyoma-gold hover:opacity-80">
              Full panchang →
            </Link>
          </Card>

          {/* Retrogrades — real, calculated */}
          <Card>
            <Label>Retrograde now</Label>
            {data.sky.retrogrades.length === 0 ? (
              <p className="mt-3 text-[14px] leading-[1.7] text-vyoma-muted">
                No major planets are retrograde today — everything is moving direct.
              </p>
            ) : (
              <>
                <div className="mt-3 flex flex-wrap gap-2">
                  {data.sky.retrogrades.map((p) => (
                    <span key={p} className="rounded-full border border-vyoma-line px-3 py-1 text-[12.5px] text-vyoma-ink">
                      {p} ℞
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-[13px] leading-[1.65] text-vyoma-muted">
                  Traditionally read as a time to revisit and review matters ruled
                  by these planets, rather than start them fresh.
                </p>
              </>
            )}
          </Card>

          {/* Sun & timings */}
          <Card>
            <Label>Sun</Label>
            <div className="mt-3 font-serif text-[24px] text-vyoma-ink">
              {data.sky.planets.Sun.sign}
            </div>
            <div className="mt-1 text-[13px] text-vyoma-muted">
              {data.sky.planets.Sun.nakshatra} · {data.sky.planets.Sun.degree_in_sign}°
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-vyoma-line pt-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.1em] text-vyoma-faint">Sunrise</div>
                <div className="font-serif text-[16px] text-vyoma-ink">{data.panchang.sunrise}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.1em] text-vyoma-faint">Sunset</div>
                <div className="font-serif text-[16px] text-vyoma-ink">{data.panchang.sunset}</div>
              </div>
              <div className="col-span-2">
                <div className="text-[10px] uppercase tracking-[0.1em] text-vyoma-faint">Rahu Kalam</div>
                <div className="font-serif text-[16px] text-vyoma-ink">{data.panchang.rahu_kalam}</div>
                <div className="text-[11px] text-vyoma-muted">traditionally avoided for new beginnings</div>
              </div>
            </div>
          </Card>

          {/* Where every planet is right now */}
          <Card className="md:col-span-2">
            <Label>The sky right now</Label>
            <div className="mt-4 grid gap-px overflow-hidden rounded-sm border border-vyoma-line bg-vyoma-line sm:grid-cols-3">
              {(Object.entries(data.sky.planets) as [PlanetName, typeof data.sky.planets[PlanetName]][]).map(
                ([name, p]) => (
                  <div key={name} className="bg-vyoma-surface p-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[13px] text-vyoma-ink">
                        {name}
                        {p.retrograde && name !== "Rahu" && name !== "Ketu" && (
                          <span className="ml-1 text-vyoma-gold">℞</span>
                        )}
                      </span>
                      <span className="text-[10px] text-vyoma-faint">{PLANET_SANSKRIT[name]}</span>
                    </div>
                    <div className="mt-1 font-serif text-[15px] text-vyoma-gold">{p.sign}</div>
                    <div className="text-[11px] text-vyoma-muted">
                      {p.nakshatra} · pada {p.nakshatra_pada}
                    </div>
                  </div>
                )
              )}
            </div>
          </Card>

          {/* Quick actions */}
          <Card className="md:col-span-2">
            <Label>Quick actions</Label>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { href: "/chart", label: "See my chart" },
                { href: "/ask", label: "Ask VYOMA" },
                { href: "/match", label: "Check compatibility" },
                { href: "/explore", label: "Learn the basics" },
              ].map((a) => (
                <Link
                  key={a.href}
                  href={a.href}
                  className="rounded-full border border-vyoma-line px-4 py-2 text-[12.5px] text-vyoma-ink transition-colors hover:border-vyoma-gold hover:text-vyoma-gold"
                >
                  {a.label}
                </Link>
              ))}
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
