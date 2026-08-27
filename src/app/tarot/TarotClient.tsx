"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MAJOR_ARCANA, cardForDate, TarotCard } from "@/lib/tarot-content";

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export default function TarotClient() {
  const daily = cardForDate(todayKey());
  const [drawn, setDrawn] = useState<{ card: TarotCard; reversed: boolean } | null>(null);

  function draw() {
    const card = MAJOR_ARCANA[Math.floor(Math.random() * MAJOR_ARCANA.length)];
    setDrawn({ card, reversed: Math.random() < 0.3 });
  }

  return (
    <div className="mx-auto max-w-[900px] px-[5vw] py-14 lg:px-8">
      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-vyoma-gold">
        Tarot
      </div>
      <h1 className="mt-2 font-serif text-[clamp(32px,4.8vw,48px)] font-medium text-vyoma-ink">
        Draw a card. Read what it means.
      </h1>
      <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.75] text-vyoma-muted">
        No fortune-telling, no vague mysticism — just the traditional
        meaning of each of the 22 Major Arcana, explained plainly.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-sm border border-vyoma-line bg-vyoma-surface p-7">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-vyoma-faint">
            Today&rsquo;s Card — same for everyone
          </div>
          <h2 className="mt-2 font-serif text-[26px] font-medium text-vyoma-gold">
            {daily.name}
          </h2>
          <p className="mt-1 text-[12px] uppercase tracking-[0.1em] text-vyoma-muted">
            {daily.keyword}
          </p>
          <p className="mt-3 text-[14px] leading-[1.7] text-vyoma-muted">{daily.upright}</p>
        </div>

        <div className="flex flex-col rounded-sm border border-vyoma-line bg-vyoma-surface p-7">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-vyoma-faint">
            Draw your own — random each time
          </div>
          <button
            onClick={draw}
            className="mt-3 cursor-pointer self-start rounded-full bg-vyoma-gold px-5 py-2.5 text-[13px] font-semibold text-vyoma-bg transition-transform hover:scale-[1.02]"
          >
            {drawn ? "Draw again →" : "Draw a card →"}
          </button>
          <AnimatePresence mode="wait">
            {drawn && (
              <motion.div
                key={`${drawn.card.num}-${drawn.reversed}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-5"
              >
                <h3 className="font-serif text-[22px] font-medium text-vyoma-ink">
                  {drawn.card.name} {drawn.reversed && <span className="text-vyoma-faint">(Reversed)</span>}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.7] text-vyoma-muted">
                  {drawn.reversed ? drawn.card.reversed : drawn.card.upright}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-14">
        <h2 className="font-serif text-[24px] font-medium text-vyoma-ink">
          All 22 Major Arcana
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {MAJOR_ARCANA.map((c) => (
            <div key={c.num} className="rounded-sm border border-vyoma-line bg-vyoma-surface p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-serif text-[17px] font-medium text-vyoma-ink">{c.name}</h3>
                <span className="text-[10px] uppercase tracking-[0.1em] text-vyoma-faint">{c.keyword}</span>
              </div>
              <p className="mt-2 text-[13px] leading-[1.65] text-vyoma-muted">{c.upright}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-sm border border-vyoma-line bg-vyoma-bg-2 p-7 text-center">
        <p className="text-[14px] text-vyoma-muted">Want your full astrological picture too?</p>
        <Link href="/chart" className="mt-2 inline-flex text-[14px] font-semibold text-vyoma-gold hover:opacity-80">
          See your Birth Chart →
        </Link>
      </div>
    </div>
  );
}
