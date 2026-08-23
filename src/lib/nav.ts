export type NavChild = { href: string; label: string; soon?: boolean };
export type NavSection = {
  href?: string;
  label: string;
  glyph: string;
  children?: NavChild[];
  soon?: boolean;
};

/**
 * The full VYOMA information architecture. Items marked `soon` are part of
 * the roadmap but need accounts/persistence first — they render visibly
 * but disabled, so the structure reads as intentional rather than missing.
 */
export const NAV: NavSection[] = [
  { href: "/", label: "Home", glyph: "⌂" },
  { href: "/today", label: "Today", glyph: "✦" },
  {
    label: "My Blueprint",
    glyph: "◉",
    children: [
      { href: "/chart", label: "Birth Chart" },
      { href: "/chart/planets", label: "Planets & Houses" },
      { href: "/chart/aspects", label: "Aspects" },
      { href: "/numerology", label: "Numerology", soon: true },
    ],
  },
  {
    label: "Tarot",
    glyph: "♢",
    soon: true,
    children: [
      { href: "/tarot", label: "Daily Card", soon: true },
      { href: "/tarot/spreads", label: "Spreads", soon: true },
      { href: "/tarot/history", label: "History", soon: true },
    ],
  },
  {
    label: "Astrology",
    glyph: "☾",
    children: [
      { href: "/panchang", label: "Panchang" },
      { href: "/transits", label: "Transits" },
      { href: "/moon", label: "Moon" },
    ],
  },
  {
    label: "Compatibility",
    glyph: "♡",
    children: [
      { href: "/match", label: "Kundli Matching" },
      { href: "/people", label: "My People", soon: true },
    ],
  },
  {
    label: "Journal",
    glyph: "⌁",
    soon: true,
    children: [
      { href: "/journal", label: "Entries", soon: true },
      { href: "/journal/patterns", label: "Patterns", soon: true },
    ],
  },
  { href: "/ask", label: "Ask VYOMA", glyph: "✧" },
];

export const EXPLORE_NAV: NavChild[] = [
  { href: "/explore", label: "Learn" },
  { href: "/explore/planets", label: "Planets" },
  { href: "/explore/houses", label: "Houses" },
  { href: "/explore/nakshatras", label: "Nakshatras" },
];
