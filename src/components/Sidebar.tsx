"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV, EXPLORE_NAV, NavSection } from "@/lib/nav";

function SoonTag() {
  return (
    <span className="ml-auto rounded-full border border-vyoma-line px-1.5 py-px text-[9px] uppercase tracking-[0.08em] text-vyoma-faint">
      soon
    </span>
  );
}

function Section({ section, pathname, onNavigate }: {
  section: NavSection;
  pathname: string;
  onNavigate?: () => void;
}) {
  const childActive = section.children?.some((c) => c.href === pathname);
  const [open, setOpen] = useState(!!childActive);

  if (!section.children) {
    const active = pathname === section.href;
    return (
      <Link
        href={section.href!}
        onClick={onNavigate}
        className={`flex items-center gap-2.5 rounded-sm px-3 py-2 text-[13px] transition-colors ${
          active
            ? "bg-vyoma-surface text-vyoma-gold"
            : "text-vyoma-muted hover:text-vyoma-ink"
        }`}
      >
        <span className="w-3.5 text-center text-vyoma-gold">{section.glyph}</span>
        {section.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full cursor-pointer items-center gap-2.5 rounded-sm px-3 py-2 text-[13px] text-vyoma-muted transition-colors hover:text-vyoma-ink"
        aria-expanded={open}
      >
        <span className="w-3.5 text-center text-vyoma-gold">{section.glyph}</span>
        {section.label}
        {section.soon ? <SoonTag /> : (
          <span className={`ml-auto text-[9px] transition-transform ${open ? "rotate-90" : ""}`}>›</span>
        )}
      </button>
      {open && (
        <div className="mb-1 ml-[26px] flex flex-col gap-px border-l border-vyoma-line pl-3">
          {section.children.map((c) =>
            c.soon ? (
              <span
                key={c.href}
                className="flex cursor-not-allowed items-center py-1.5 text-[12.5px] text-vyoma-faint"
                title="Coming soon"
              >
                {c.label}
                <SoonTag />
              </span>
            ) : (
              <Link
                key={c.href}
                href={c.href}
                onClick={onNavigate}
                className={`py-1.5 text-[12.5px] transition-colors ${
                  pathname === c.href
                    ? "text-vyoma-gold"
                    : "text-vyoma-muted hover:text-vyoma-ink"
                }`}
              >
                {c.label}
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex h-full flex-col gap-1 overflow-y-auto px-3 py-5">
      <Link
        href="/"
        onClick={onNavigate}
        className="mb-4 flex items-center gap-3 px-3"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full border border-vyoma-gold">
          <span className="h-[5px] w-[5px] rounded-full bg-vyoma-gold" />
        </span>
        <span className="font-serif text-[17px] tracking-[0.28em] text-vyoma-ink">
          VYOMA
        </span>
      </Link>

      {NAV.map((s) => (
        <Section key={s.label} section={s} pathname={pathname} onNavigate={onNavigate} />
      ))}

      <div className="my-3 border-t border-vyoma-line" />
      <div className="px-3 pb-1 text-[10px] uppercase tracking-[0.14em] text-vyoma-faint">
        Explore
      </div>
      {EXPLORE_NAV.map((c) => (
        <Link
          key={c.href}
          href={c.href}
          onClick={onNavigate}
          className={`rounded-sm px-3 py-1.5 text-[12.5px] transition-colors ${
            pathname === c.href ? "text-vyoma-gold" : "text-vyoma-muted hover:text-vyoma-ink"
          }`}
        >
          {c.label}
        </Link>
      ))}

      <div className="mt-auto flex flex-col gap-px border-t border-vyoma-line pt-3 text-[11.5px] text-vyoma-faint">
        <Link href="/privacy" className="px-3 py-1 hover:text-vyoma-muted">Privacy</Link>
        <Link href="/terms" className="px-3 py-1 hover:text-vyoma-muted">Terms</Link>
        <Link href="/contact" className="px-3 py-1 hover:text-vyoma-muted">Contact</Link>
      </div>
    </nav>
  );
}
