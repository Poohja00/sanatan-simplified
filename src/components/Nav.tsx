"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useChart } from "@/lib/ChartContext";

const MARKETING_LINKS = [
  { href: "/today", label: "Today" },
  { href: "/chart", label: "My Chart" },
  { href: "/panchang", label: "Panchang" },
  { href: "/match", label: "Matching" },
  { href: "/explore", label: "Learn" },
];

export default function Nav({ onOpenMenu }: { onOpenMenu?: () => void }) {
  const pathname = usePathname();
  const { openCreate } = useChart();
  const isMarketing = pathname === "/";

  return (
    <header
      className={`sticky top-0 z-40 flex h-[70px] items-center justify-between border-b border-vyoma-line bg-vyoma-bg/80 px-[5vw] backdrop-blur-md ${
        isMarketing ? "h-[86px] border-b-0" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        {onOpenMenu && (
          <button
            onClick={onOpenMenu}
            aria-label="Open menu"
            className="cursor-pointer text-vyoma-muted hover:text-vyoma-ink lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
        )}
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-vyoma-gold">
            <span className="h-[5px] w-[5px] rounded-full bg-vyoma-gold" />
          </span>
          <span className="font-serif text-lg tracking-[0.28em] text-vyoma-ink">
            VYOMA
          </span>
        </Link>
      </div>

      {isMarketing && (
        <nav className="hidden items-center gap-8 sm:flex">
          {MARKETING_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13.5px] text-vyoma-muted transition-colors hover:text-vyoma-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}

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
