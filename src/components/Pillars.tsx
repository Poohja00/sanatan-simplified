"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    num: "01",
    title: "See the chart.",
    text: "Houses, signs and planets stay visible instead of disappearing into a report.",
  },
  {
    num: "02",
    title: "Understand the pattern.",
    text: "Traditional interpretations are translated into clear everyday language.",
  },
  {
    num: "03",
    title: "Ask anything.",
    text: "Ask about career, relationships, home, money or any placement in your own words.",
  },
];

export default function Pillars() {
  return (
    <section
      className="mx-auto grid max-w-[1180px] grid-cols-1 border-y border-vyoma-line md:grid-cols-3"
    >
      {pillars.map((p, i) => (
        <motion.div
          key={p.num}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="border-b border-vyoma-line p-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.17em] text-vyoma-gold">
            {p.num}
          </span>
          <h3 className="my-2 font-serif text-[25px] font-medium text-vyoma-ink">
            {p.title}
          </h3>
          <p className="leading-[1.65] text-vyoma-muted">{p.text}</p>
        </motion.div>
      ))}
    </section>
  );
}
