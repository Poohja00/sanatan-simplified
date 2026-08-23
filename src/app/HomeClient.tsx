"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CosmicSnapshot from "@/components/CosmicSnapshot";
import PanchangCard from "@/components/PanchangCard";
import TraditionSection from "@/components/TraditionSection";
import { heroScrollState } from "@/lib/heroScrollState";
import { useDeviceCapability } from "@/lib/useDeviceCapability";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });
const BirthChartScene = dynamic(() => import("@/components/three/BirthChartScene"), { ssr: false });

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.2" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <line key={i} x1={12 + Math.cos(a) * 6.5} y1={12 + Math.sin(a) * 6.5}
            x2={12 + Math.cos(a) * 9} y2={12 + Math.sin(a) * 9} stroke="currentColor" strokeWidth="1" />
        );
      })}
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path d="M14 4a8 8 0 1 0 0 16 6.5 6.5 0 0 1 0-16Z" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
function LotusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path d="M12 20c-4-1-6-4-6-7 2 1.5 4 2 6 2s4-.5 6-2c0 3-2 6-6 7Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M12 15V6" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export default function HomeClient() {
  const heroRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const { reduceMotion, isMobile } = useDeviceCapability();

  useEffect(() => {
    if (reduceMotion || !heroRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
          onUpdate: (self) => {
            heroScrollState.progress = self.progress;
          },
        },
      })
        .to(heroTextRef.current, { yPercent: -35, opacity: 0, ease: "none" }, 0)
        .to(heroRef.current, { yPercent: -12, ease: "none" }, 0);
    });

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <>
      <section
        ref={heroRef}
        className="relative flex min-h-screen items-center overflow-hidden bg-vyoma-bg px-[5vw]"
      >
        {/* full-bleed 3D celestial environment — sits behind the text, feathered
            into the flat dark bg on its left edge so there's no visible panel edge */}
        <div
          className="absolute inset-y-0 right-0 z-0 w-full lg:w-[64%]"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 22%)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 22%)",
          }}
        >
          <HeroScene dense={!isMobile && !reduceMotion} />
        </div>

        {/* horizon glow, sitting above the canvas layer but below text, to help
            the 3D environment feel continuous with the flat background */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 78% 52%, rgba(198,166,107,0.10), transparent 62%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[1280px]">
          <div ref={heroTextRef} className="max-w-[560px]">
            <h1 className="font-serif text-[clamp(46px,7.2vw,86px)] font-medium leading-[1.02] text-vyoma-ink">
              Understand
              <br />
              your cosmic map.
            </h1>
            <p className="mt-5 text-[15px] font-medium uppercase tracking-[0.08em] text-vyoma-gold">
              Ancient wisdom. Modern clarity.
            </p>
            <p className="mt-3 max-w-[42ch] text-[16px] leading-[1.75] text-vyoma-muted">
              &ldquo;Understand your birth chart without having to understand
              astrology first.&rdquo;
            </p>
            <Link
              href="/chart"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-vyoma-gold px-7 py-3.5 text-[14px] font-semibold text-vyoma-bg transition-transform hover:scale-[1.02]"
            >
              Explore My Chart →
            </Link>
          </div>
        </div>

        {/* floating vertical icon dock, echoing the reference */}
        <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-5 rounded-full border border-vyoma-line bg-vyoma-bg-2/70 px-2.5 py-5 text-vyoma-gold backdrop-blur-sm lg:flex">
          <SunIcon />
          <MoonIcon />
          <LotusIcon />
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[11px] uppercase tracking-[0.15em] text-vyoma-muted">
          Scroll to explore
        </div>
      </section>

      <CosmicSnapshot />

      <section className="relative overflow-hidden bg-vyoma-bg-2 px-[6vw] py-24 text-vyoma-ink">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-12 lg:grid-cols-[0.95fr_1.2fr]">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-vyoma-gold">
              ✦ Understand Deeper
            </div>
            <h2 className="mt-4 font-serif text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.08] text-vyoma-ink">
              Your birth chart,
              <br />
              beautifully decoded.
            </h2>
            <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.75] text-vyoma-muted">
              Every planet, every house, every aspect holds a message. We
              translate the language of the stars into clarity you can use.
            </p>
            <Link
              href="/chart"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-vyoma-gold px-6 py-3 text-[13.5px] font-semibold text-vyoma-bg"
            >
              Explore Your Chart →
            </Link>
            <div className="mt-9 flex gap-8 text-[12px] text-vyoma-muted">
              <span>Accurate Calculations</span>
              <span>Vedic Principles</span>
              <span>Modern Understanding</span>
            </div>
          </div>

          <div className="h-[360px] sm:h-[440px] lg:h-[520px]">
            <BirthChartScene />
          </div>
        </div>
      </section>

      <PanchangCard />
      <TraditionSection />
    </>
  );
}
