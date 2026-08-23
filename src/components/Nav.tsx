"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useChart } from "@/lib/ChartContext";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/chart", label: "My Chart" },
  { href: "/panchang", label: "Panchang" },
  { href: "/ask", label: "Ask" },
  { href: "/match", label: "Matching" },
];

export default function Nav() {
  const pathname = usePathname();
  const { openCreate } = useChart();

  return (
    <header className="sticky top-0 z-40 flex h-[86px] items-center justify-between bg-vyoma-bg/70 px-[5vw] backdrop-blur-md">
      <Link href="/" className="flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-full border border-vyoma-gold">
          <span className="h-[5px] w-[5px] rounded-full bg-vyoma-gold" />
        </span>
        <span className="font-serif text-lg tracking-[0.28em] text-vyoma-ink">
          VYOMA
        </span>
      </Link>
      <nav className="hidden items-center gap-8 sm:flex">
        {LINKS.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`relative pb-1 text-[13.5px] transition-colors ${
                active ? "text-vyoma-ink" : "text-vyoma-muted hover:text-vyoma-ink"
              }`}
            >
              {l.label}
              {active && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-0.5 left-0 right-0 h-px bg-vyoma-gold"
                />
              )}
            </Link>
          );
        })}
      </nav>
      <motion.button
        whileHover={{ opacity: 0.88 }}
        whileTap={{ scale: 0.97 }}
        onClick={openCreate}
        className="cursor-pointer rounded-full bg-vyoma-gold px-5 py-2.5 text-[13px] font-semibold text-vyoma-bg"
      >
        Create My Chart
      </motion.button>
    </header>
  );
}
