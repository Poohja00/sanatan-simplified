"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/chart", label: "My Chart" },
  { href: "/explore", label: "Astrology" },
  { href: "/tarot", label: "Tarot" },
  { href: "/horoscope", label: "Horoscope" },
  { href: "/wisdom", label: "Wisdom" },
  { href: "/panchang", label: "Panchang" },
  { href: "/blog", label: "Blog" },
];

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.3" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={12 + Math.cos(a) * 6.5}
            y1={12 + Math.sin(a) * 6.5}
            x2={12 + Math.cos(a) * 9}
            y2={12 + Math.sin(a) * 9}
            stroke="currentColor"
            strokeWidth="1.1"
          />
        );
      })}
    </svg>
  );
}

function TodayPill() {
  const [label, setLabel] = useState<string | null>(null);
  useEffect(() => {
    setLabel(
      new Date().toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric", weekday: "long" })
    );
  }, []);
  if (!label) return null;
  return (
    <span className="hidden items-center gap-1.5 text-[11px] text-vyoma-muted lg:flex">
      <SunIcon />
      {label}
    </span>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-vyoma-line bg-vyoma-bg/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-[5vw] lg:px-8">
        <Link href="/" className="flex items-center rounded-md bg-white px-2.5 py-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="Sanatan Simplified" className="h-8 w-auto" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-[13px] transition-colors ${
                  active ? "text-vyoma-gold" : "text-vyoma-muted hover:text-vyoma-ink"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-5">
          <TodayPill />
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Open menu"
            className="cursor-pointer text-vyoma-muted hover:text-vyoma-ink lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-vyoma-line bg-vyoma-bg px-[5vw] py-3 lg:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-sm px-2 py-2.5 text-[14px] text-vyoma-muted hover:bg-vyoma-surface hover:text-vyoma-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
