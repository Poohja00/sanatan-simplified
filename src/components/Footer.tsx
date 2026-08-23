"use client";

import { useState } from "react";
import Link from "next/link";

function LogoMark() {
  return (
    <span className="grid h-8 w-8 place-items-center rounded-full border border-vyoma-gold">
      <span className="h-[5px] w-[5px] rounded-full bg-vyoma-gold" />
    </span>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="border-t border-vyoma-line bg-vyoma-bg px-[6vw] pt-16 pb-8 text-vyoma-ink">
      <div className="mx-auto flex max-w-[1180px] flex-col justify-between gap-10 md:flex-row">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark />
            <span className="font-serif text-lg tracking-[0.2em]">VYOMA</span>
          </div>
          <p className="mt-3 text-[13px] leading-[1.6] text-vyoma-muted">
            Understand the pattern.
            <br />
            Live with clarity.
          </p>
        </div>

        <div className="max-w-[360px]">
          <div className="text-[13px] font-medium">Join our cosmic community</div>
          <p className="mt-1 text-[12px] text-vyoma-muted">
            Get astrology insights, cosmic updates and more.
          </p>
          {subscribed ? (
            <p className="mt-3 text-[13px] text-vyoma-gold">You&rsquo;re on the list.</p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setSubscribed(true);
              }}
              className="mt-3 flex gap-2"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 border border-vyoma-line bg-vyoma-surface px-3 py-2.5 text-[13px] text-vyoma-ink outline-none placeholder:text-vyoma-faint"
              />
              <button
                type="submit"
                className="cursor-pointer whitespace-nowrap rounded-sm bg-vyoma-gold px-4 py-2.5 text-[13px] font-semibold text-vyoma-bg"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

        <div className="flex gap-3">
          {["Instagram", "YouTube", "Discord"].map((label) => (
            <span
              key={label}
              aria-label={label}
              title={`${label} (coming soon)`}
              className="grid h-9 w-9 place-items-center rounded-full border border-vyoma-line text-[11px] text-vyoma-muted"
            >
              {label[0]}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-[1180px] flex-col-reverse items-center justify-between gap-4 border-t border-vyoma-line pt-6 text-[11px] text-vyoma-muted sm:flex-row">
        <span>© {new Date().getFullYear()} VYOMA. All rights reserved.</span>
        <div className="flex gap-5">
          <Link href="/privacy" className="hover:text-vyoma-gold">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-vyoma-gold">Terms of Service</Link>
          <Link href="/contact" className="hover:text-vyoma-gold">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
}
