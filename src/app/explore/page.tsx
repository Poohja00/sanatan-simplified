import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Learn Vedic Astrology — Planets, Houses & Nakshatras Explained",
  description:
    "Plain-English guides to Vedic astrology: what the nine planets mean, what the twelve houses govern, and how the 27 nakshatras work. No jargon wall.",
  alternates: { canonical: "/explore" },
};

const SECTIONS = [
  {
    href: "/explore/planets",
    title: "The Nine Planets",
    desc: "Surya to Ketu — what each graha actually signifies, which signs it rules, and where it is exalted or debilitated.",
    count: "9 planets",
  },
  {
    href: "/explore/houses",
    title: "The Twelve Houses",
    desc: "From Lagna to Vyaya Bhava — the life area each house governs, with its traditional Sanskrit name.",
    count: "12 houses",
  },
  {
    href: "/explore/nakshatras",
    title: "The 27 Nakshatras",
    desc: "The lunar mansions that determine your dasha timeline — each with its ruling planet and symbol.",
    count: "27 nakshatras",
  },
];

export default function ExplorePage() {
  return (
    <div className="mx-auto max-w-[900px] px-[5vw] py-12 lg:px-8">
      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-vyoma-gold">
        Explore
      </div>
      <h1 className="mt-2 font-serif text-[clamp(30px,4.5vw,44px)] font-medium text-vyoma-ink">
        Astrology without the jargon wall.
      </h1>
      <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.75] text-vyoma-muted">
        A house tells you <em>where</em> in life. A planet tells you{" "}
        <em>what</em> force is at work. A sign tells you <em>how</em> it
        expresses. Vedic astrology reads those three layers together — and
        once you see that, the rest stops looking like code.
      </p>

      <div className="mt-10 grid gap-4">
        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group rounded-sm border border-vyoma-line bg-vyoma-surface p-6 transition-colors hover:border-vyoma-gold"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-serif text-[22px] font-medium text-vyoma-ink group-hover:text-vyoma-gold">
                {s.title}
              </h2>
              <span className="whitespace-nowrap text-[11px] text-vyoma-faint">{s.count}</span>
            </div>
            <p className="mt-2 text-[13.5px] leading-[1.7] text-vyoma-muted">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
