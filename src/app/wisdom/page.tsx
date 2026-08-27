import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sanatan Wisdom — Ramayana, Mahabharata & More, Simplified",
  description:
    "The stories and concepts of Sanatan Dharma, explained in plain language — the Ramayana, the Mahabharata, planets, houses, and nakshatras.",
  alternates: { canonical: "/wisdom" },
};

const SECTIONS = [
  { href: "/wisdom/ramayana", title: "Ramayana, Simplified", desc: "The story of Rama, Sita, and Hanuman — kanda by kanda, in plain language." },
  { href: "/wisdom/mahabharata", title: "Mahabharata, Simplified", desc: "The Kurukshetra war, the Pandavas and Kauravas, and the Bhagavad Gita's core teaching." },
  { href: "/explore/planets", title: "The Nine Planets", desc: "What each graha actually signifies in Vedic astrology." },
  { href: "/explore/houses", title: "The Twelve Houses", desc: "The life area each house of a birth chart governs." },
  { href: "/explore/nakshatras", title: "The 27 Nakshatras", desc: "The lunar mansions behind your dasha timeline." },
];

export default function WisdomPage() {
  return (
    <div className="mx-auto max-w-[900px] px-[5vw] py-14 lg:px-8">
      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-vyoma-gold">
        Sanatan Wisdom
      </div>
      <h1 className="mt-2 font-serif text-[clamp(32px,4.8vw,48px)] font-medium text-vyoma-ink">
        The stories and ideas, without the jargon.
      </h1>
      <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.75] text-vyoma-muted">
        You don&rsquo;t need years of study to be curious about Sanatan
        Dharma. Start with the epics, then go as deep as you want.
      </p>

      <div className="mt-10 grid gap-4">
        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group rounded-sm border border-vyoma-line bg-vyoma-surface p-6 transition-colors hover:border-vyoma-gold"
          >
            <h2 className="font-serif text-[22px] font-medium text-vyoma-ink group-hover:text-vyoma-gold">
              {s.title}
            </h2>
            <p className="mt-2 text-[13.5px] leading-[1.7] text-vyoma-muted">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
