"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useChart } from "@/lib/ChartContext";

function SunIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-7 w-7">
      <circle cx="24" cy="24" r="9" stroke="#c6a66b" strokeWidth="1.4" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const x1 = 24 + Math.cos(a) * 15, y1 = 24 + Math.sin(a) * 15;
        const x2 = 24 + Math.cos(a) * 20, y2 = 24 + Math.sin(a) * 20;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c6a66b" strokeWidth="1.2" />;
      })}
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-7 w-7">
      <path
        d="M28 8a17 17 0 1 0 0 32 14 14 0 0 1 0-32Z"
        stroke="#c6a66b"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AscendantIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-7 w-7">
      <circle cx="24" cy="24" r="16" stroke="#c6a66b" strokeWidth="1.4" />
      <path d="M24 32V16M17 23l7-7 7 7" stroke="#c6a66b" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CosmicSnapshot() {
  const { chart } = useChart();

  const cards = [
    {
      icon: <SunIcon />,
      label: "Sun Sign",
      value: chart?.planets.Sun.sign ?? "—",
      desc: "Your core identity and life purpose.",
    },
    {
      icon: <MoonIcon />,
      label: "Moon Sign",
      value: chart?.planets.Moon.sign ?? "—",
      desc: "Your inner world and emotional nature.",
    },
    {
      icon: <AscendantIcon />,
      label: "Ascendant",
      value: chart?.ascendant.sign ?? "—",
      desc: "How you present yourself to the world.",
    },
  ];

  return (
    <section className="bg-vyoma-ivory py-24 px-[6vw] text-vyoma-ink-dark">
      <div className="mx-auto max-w-[1080px] text-center">
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-vyoma-gold">
          ✦ Your Cosmic Snapshot ✦
        </div>
        <h2 className="mt-4 font-serif text-[clamp(28px,4vw,42px)] font-medium text-vyoma-ink-dark">
          A glimpse of your cosmic blueprint
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {cards.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start gap-3 rounded-sm border border-vyoma-line-light/60 bg-white/70 p-7 text-left shadow-[0_20px_60px_-30px_rgba(30,20,10,0.35)]"
            >
              <div className="grid h-14 w-14 place-items-center rounded-full bg-vyoma-ivory-2">
                {c.icon}
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-vyoma-muted-dark">
                {c.label}
              </div>
              <div className="font-serif text-[30px] font-medium text-vyoma-ink-dark">
                {c.value}
              </div>
              <p className="text-[13px] leading-[1.6] text-vyoma-muted-dark">{c.desc}</p>
            </motion.div>
          ))}
        </div>

        <Link
          href="/chart"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-vyoma-ink-dark/20 px-6 py-3 text-[13px] font-semibold text-vyoma-ink-dark transition-colors hover:border-vyoma-gold hover:text-vyoma-gold"
        >
          See Full Chart →
        </Link>
      </div>
    </section>
  );
}
