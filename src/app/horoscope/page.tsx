import type { Metadata } from "next";
import HoroscopeClient from "./HoroscopeClient";

export const metadata: Metadata = {
  title: "Daily Horoscope — All 12 Rashis, Free",
  description:
    "Today's Vedic horoscope for all twelve moon signs (rashis), based on the real transiting Moon — computed with the Swiss Ephemeris, not guesswork.",
  alternates: { canonical: "/horoscope" },
};

export default function HoroscopePage() {
  return <HoroscopeClient />;
}
