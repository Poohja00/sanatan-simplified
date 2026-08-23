import type { Metadata } from "next";
import TodayClient from "./TodayClient";

export const metadata: Metadata = {
  title: "Today's Sky — Moon Phase, Panchang & Planetary Positions",
  description:
    "Today's cosmic snapshot: moon phase and illumination, tithi and nakshatra, which planets are retrograde right now, sunrise, sunset and Rahu Kalam — all calculated live.",
  alternates: { canonical: "/today" },
};

export default function TodayPage() {
  return <TodayClient />;
}
