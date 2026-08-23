import type { Metadata } from "next";
import PanchangPageClient from "./PanchangPageClient";

export const metadata: Metadata = {
  title: "Today's Panchang — Tithi, Nakshatra, Yoga, Karana, Rahu Kalam",
  description:
    "Today's Hindu Panchang: Tithi, Nakshatra, Yoga, Karana, sunrise, sunset, and Rahu Kalam — calculated with real Swiss Ephemeris astronomy, not a lookup table.",
  alternates: { canonical: "/panchang" },
};

export default function PanchangPage() {
  return <PanchangPageClient />;
}
