"use client";

import { motion } from "framer-motion";
import { Highlight } from "@/lib/types";

export default function Highlights({ highlights }: { highlights: Highlight[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-[1180px] px-[5vw] py-20 md:px-0"
    >
      <div className="text-[10px] font-bold uppercase tracking-[0.17em] text-vyoma-gold">
        A clearer way to explore
      </div>
      <h2 className="my-3 font-serif text-[clamp(34px,5vw,58px)] font-medium leading-[1] text-vyoma-ink">
        Complex chart.
        <br />
        Simple understanding.
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-[1.3fr_0.7fr]">
        <div className="border border-vyoma-line bg-vyoma-surface p-7">
          <div className="text-[10px] font-bold uppercase tracking-[0.17em] text-vyoma-gold">
            Planetary highlights
          </div>
          <h3 className="my-2.5 font-serif text-[27px] font-medium text-vyoma-ink">
            What stands out?
          </h3>
          {highlights.map((h) => (
            <div
              key={h.label}
              className="flex flex-col justify-between gap-2 border-t border-vyoma-line py-4 md:flex-row md:gap-5"
            >
              <b className="whitespace-nowrap text-vyoma-ink">
                {h.label} · House {h.house}
              </b>
              <span className="max-w-[310px] text-[12px] leading-[1.5] text-vyoma-muted md:text-right">
                {h.text}
              </span>
            </div>
          ))}
        </div>

        <div
          className="relative overflow-hidden border border-[#1F1119] bg-vyoma-dark p-7"
          style={{ boxShadow: "inset 0 0 60px -20px rgba(200,155,108,.35)" }}
        >
          <div className="text-[10px] font-bold uppercase tracking-[0.17em] text-vyoma-gold">
            Your journey
          </div>
          <h3 className="my-2.5 font-serif text-[27px] font-medium text-vyoma-ink">
            At a glance.
          </h3>
          <div className="relative h-[220px]">
            <div className="absolute left-1/2 top-1/2 h-[110px] w-[230px] -translate-x-1/2 -translate-y-1/2 rotate-[25deg] rounded-full border border-[#4A3742]" />
            <div className="absolute left-1/2 top-1/2 h-[140px] w-[270px] -translate-x-1/2 -translate-y-1/2 rotate-[-25deg] rounded-full border border-[#4A3742]" />
            <motion.span
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-vyoma-gold"
              style={{ boxShadow: "0 0 14px 3px rgba(200,155,108,.6)" }}
            />
            <span className="absolute bottom-10 left-[10%] text-[11px] text-[#8B7480]">
              PAST
            </span>
            <span className="absolute right-[12%] top-[60px] text-[11px] text-[#8B7480]">
              PRESENT
            </span>
            <span className="absolute bottom-[55px] right-[5%] text-[11px] text-[#8B7480]">
              FUTURE
            </span>
          </div>
          <p className="text-[13px] leading-[1.65] text-vyoma-muted">
            A quiet way to explore themes across your chart.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
