export type BlogPost = {
  href: string;
  title: string;
  desc: string;
  category: string;
  readMins: number;
  hue: number; // for the placeholder gradient card
};

/** Real content pages, presented blog-style. No separate CMS — the linked
 * page IS the article. */
export const BLOG_POSTS: BlogPost[] = [
  {
    href: "/explore",
    title: "What is Astrology?",
    desc: "A beginner's guide to Vedic astrology, birth charts, and how any of it can actually help you.",
    category: "Astrology",
    readMins: 5,
    hue: 260,
  },
  {
    href: "/tarot",
    title: "How to Read Tarot for Yourself",
    desc: "Draw a card and understand what it means — no fortune-teller, no jargon.",
    category: "Tarot",
    readMins: 4,
    hue: 20,
  },
  {
    href: "/moon",
    title: "Understanding Moon Phases",
    desc: "What each phase of the Moon means, and why Vedic astrology treats your Moon sign as the real key.",
    category: "Astrology",
    readMins: 4,
    hue: 210,
  },
  {
    href: "/wisdom/ramayana",
    title: "The Ramayana, Simplified",
    desc: "Rama's exile, Sita, and Hanuman's leap — the epic retold plainly, kanda by kanda.",
    category: "Wisdom",
    readMins: 8,
    hue: 35,
  },
  {
    href: "/wisdom/mahabharata",
    title: "The Mahabharata, Simplified",
    desc: "The Kurukshetra war, the Pandavas and Kauravas, and the Bhagavad Gita's core teaching.",
    category: "Wisdom",
    readMins: 9,
    hue: 350,
  },
  {
    href: "/chart",
    title: "Reading Your Own Birth Chart",
    desc: "North Indian, South Indian, planets, houses — a walkthrough of your real kundli.",
    category: "Astrology",
    readMins: 6,
    hue: 160,
  },
];
