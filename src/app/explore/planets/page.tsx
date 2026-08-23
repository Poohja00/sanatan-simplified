import type { Metadata } from "next";
import { PLANETS } from "@/lib/explore-content";

export const metadata: Metadata = {
  title: "The Nine Planets (Navagraha) in Vedic Astrology, Explained",
  description:
    "What each of the nine grahas means in Vedic astrology — Sun (Surya), Moon (Chandra), Mars (Mangala), Mercury (Budha), Jupiter (Guru), Venus (Shukra), Saturn (Shani), Rahu and Ketu — with rulership, exaltation and debilitation.",
  alternates: { canonical: "/explore/planets" },
};

export default function PlanetsPage() {
  return (
    <div className="mx-auto max-w-[820px] px-[5vw] py-12 lg:px-8">
      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-vyoma-gold">
        Explore · Planets
      </div>
      <h1 className="mt-2 font-serif text-[clamp(30px,4.5vw,42px)] font-medium text-vyoma-ink">
        The Nine Planets
      </h1>
      <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.75] text-vyoma-muted">
        Vedic astrology works with nine grahas — the seven visible bodies plus
        Rahu and Ketu, the two lunar nodes. Each one signifies a force: not a
        prediction, but a theme that plays out through whichever house and
        sign it occupies.
      </p>

      <div className="mt-10 flex flex-col gap-4">
        {PLANETS.map((p) => (
          <article
            key={p.slug}
            id={p.slug}
            className="rounded-sm border border-vyoma-line bg-vyoma-surface p-6"
          >
            <div className="flex flex-wrap items-baseline gap-x-3">
              <h2 className="font-serif text-[24px] font-medium text-vyoma-ink">{p.name}</h2>
              <span className="text-[13px] text-vyoma-gold">{p.sanskrit}</span>
            </div>
            <p className="mt-1 text-[13.5px] italic text-vyoma-muted">{p.short}</p>
            <p className="mt-3 text-[14px] leading-[1.75] text-vyoma-ink">{p.body}</p>
            <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-vyoma-line pt-4 text-[12px]">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.1em] text-vyoma-faint">Rules</dt>
                <dd className="mt-0.5 text-vyoma-ink">{p.rules}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.1em] text-vyoma-faint">Exalted</dt>
                <dd className="mt-0.5 text-vyoma-ink">{p.exalted}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.1em] text-vyoma-faint">Debilitated</dt>
                <dd className="mt-0.5 text-vyoma-ink">{p.debilitated}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}
