"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useChart } from "@/lib/ChartContext";

export default function Nav({ onOpenMenu }: { onOpenMenu?: () => void }) {
  const { openCreate } = useChart();

  return (
    <header className="sticky top-0 z-40 flex h-[70px] items-center justify-between border-b border-vyoma-line bg-vyoma-bg/80 px-[5vw] backdrop-blur-md lg:px-8">
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
        {/* The sidebar carries the wordmark on desktop; show it here only
            when the sidebar is hidden, so it isn't duplicated. */}
        <Link href="/" className="flex items-center gap-3 lg:hidden">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-vyoma-gold">
            <span className="h-[5px] w-[5px] rounded-full bg-vyoma-gold" />
          </span>
          <span className="font-serif text-lg tracking-[0.28em] text-vyoma-ink">
            VYOMA
          </span>
        </Link>
      </div>

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
