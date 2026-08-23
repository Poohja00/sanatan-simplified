"use client";

import { motion } from "framer-motion";

const PATHS = [
  {
    name: "Vedic Astrology",
    subtitle: "Jyotish",
    desc: "The classical Parashari system — planets read through signs, houses and divisional charts, refined over millennia of Sanskrit astronomical texts.",
    points: ["Sign-based houses", "Divisional (varga) charts", "Vimshottari dasha timing"],
  },
  {
    name: "Lal Kitab",
    subtitle: "The Red Book, 1939–1952",
    desc: "A distinct 19th–20th century system with fixed houses independent of sign, its own planetary periods, and a signature focus on karmic ‘debts’ resolved through tangible, everyday remedies.",
    points: ["Fixed planetary houses", "Rin — ancestral debts", "Practical, non-ritual remedies"],
  },
];

export default function TraditionSection() {
  return (
    <section className="bg-vyoma-bg-2 px-[6vw] py-24 text-vyoma-ink">
      <div className="mx-auto max-w-[1080px] text-center">
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-vyoma-gold">
          Vedic Astrology + Lal Kitab
        </div>
        <h2 className="mt-4 font-serif text-[clamp(28px,4vw,42px)] font-medium text-vyoma-ink">
          Two paths. One truth.
        </h2>
        <p className="mx-auto mt-3 max-w-[56ch] text-[15px] leading-[1.7] text-vyoma-muted">
          Two independent traditions, each internally rigorous. We keep them
          distinct rather than blending them into one — a reading in one
          system isn&rsquo;t a translation of the other.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {PATHS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-sm border border-vyoma-line bg-vyoma-surface p-8 text-left"
            >
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-vyoma-gold">
                {p.subtitle}
              </div>
              <h3 className="mt-2 font-serif text-[26px] font-medium text-vyoma-ink">
                {p.name}
              </h3>
              <p className="mt-3 text-[13.5px] leading-[1.7] text-vyoma-muted">{p.desc}</p>
              <ul className="mt-5 space-y-2 border-t border-vyoma-line pt-5">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2 text-[12.5px] text-vyoma-ink">
                    <span className="h-[3px] w-[3px] rounded-full bg-vyoma-gold" />
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
