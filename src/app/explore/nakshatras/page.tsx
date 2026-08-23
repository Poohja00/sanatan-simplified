import type { Metadata } from "next";
import { NAKSHATRA_INFO } from "@/lib/explore-content";

export const metadata: Metadata = {
  title: "The 27 Nakshatras Explained — Lords, Symbols & Meanings",
  description:
    "All 27 nakshatras (lunar mansions) in Vedic astrology, from Ashwini to Revati — each with its ruling planet and symbol. Your Moon's nakshatra sets your entire Vimshottari dasha timeline.",
  alternates: { canonical: "/explore/nakshatras" },
};

export default function NakshatrasPage() {
  return (
    <div className="mx-auto max-w-[900px] px-[5vw] py-12 lg:px-8">
      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-vyoma-gold">
        Explore · Nakshatras
      </div>
      <h1 className="mt-2 font-serif text-[clamp(30px,4.5vw,42px)] font-medium text-vyoma-ink">
        The 27 Nakshatras
      </h1>
      <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.75] text-vyoma-muted">
        Nakshatras divide the zodiac into 27 segments of 13°20&prime; each —
        an older and finer system than the twelve signs. The nakshatra your
        Moon occupies at birth determines your Vimshottari dasha sequence, the
        timing framework used throughout Vedic astrology.
      </p>

      <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-vyoma-line bg-vyoma-line sm:grid-cols-2">
        {NAKSHATRA_INFO.map((n, i) => (
          <article key={n.name} className="bg-vyoma-surface p-5">
            <div className="flex items-baseline gap-2">
              <span className="text-[11px] text-vyoma-faint">{i + 1}</span>
              <h2 className="font-serif text-[18px] font-medium text-vyoma-ink">{n.name}</h2>
            </div>
            <p className="mt-1 text-[13px] leading-[1.6] text-vyoma-muted">{n.short}</p>
            <div className="mt-2 flex gap-4 text-[11px] text-vyoma-faint">
              <span>Lord: <span className="text-vyoma-gold">{n.lord}</span></span>
              <span>{n.symbol}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
