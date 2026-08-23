import type { Metadata } from "next";
import ChartPageClient from "./ChartPageClient";

export const metadata: Metadata = {
  title: "Free Birth Chart (Kundli) Generator — Vedic Astrology",
  description:
    "Generate your free Vedic birth chart (D1 Lagna kundli) with real Swiss Ephemeris calculations. Tap any house to understand what it means in plain English, not jargon.",
  alternates: { canonical: "/chart" },
};

export default function ChartPage() {
  return <ChartPageClient />;
}
