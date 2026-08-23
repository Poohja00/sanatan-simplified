import type { Metadata } from "next";
import { HOUSES } from "@/lib/explore-content";

export const metadata: Metadata = {
  title: "The 12 Houses (Bhavas) in Vedic Astrology, Explained",
  description:
    "What each of the twelve houses governs in a Vedic birth chart — from Lagna (self) through Kalatra Bhava (marriage) to Vyaya Bhava (release) — with traditional Sanskrit names.",
  alternates: { canonical: "/explore/houses" },
};

export default function HousesPage() {
  return (
    <div className="mx-auto max-w-[820px] px-[5vw] py-12 lg:px-8">
      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-vyoma-gold">
        Explore · Houses
      </div>
      <h1 className="mt-2 font-serif text-[clamp(30px,4.5vw,42px)] font-medium text-vyoma-ink">
        The Twelve Houses
      </h1>
      <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.75] text-vyoma-muted">
        Houses (bhavas) are the areas of life. Your rising sign determines
        which sign sits on the first house, and every other house follows from
        there — which is why an accurate birth time matters so much.
      </p>

      <div className="mt-10 flex flex-col gap-3">
        {HOUSES.map((h) => (
          <article
            key={h.num}
            id={`house-${h.num}`}
            className="rounded-sm border border-vyoma-line bg-vyoma-surface p-6"
          >
            <div className="flex flex-wrap items-baseline gap-x-3">
              <span className="font-serif text-[28px] leading-none text-vyoma-gold">{h.num}</span>
              <h2 className="font-serif text-[21px] font-medium text-vyoma-ink">{h.name}</h2>
              <span className="text-[12px] text-vyoma-faint">{h.sanskrit}</span>
            </div>
            <p className="mt-2 text-[13.5px] italic text-vyoma-muted">{h.short}</p>
            <p className="mt-2 text-[14px] leading-[1.75] text-vyoma-ink">{h.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
