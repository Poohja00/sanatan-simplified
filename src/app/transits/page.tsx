import type { Metadata } from "next";
import TransitsClient from "./TransitsClient";

export const metadata: Metadata = {
  title: "Planetary Transits Today — Current Positions & Retrogrades",
  description:
    "Where every planet sits right now in sidereal Vedic astrology — current sign, degree, nakshatra and retrograde status — compared against your natal chart.",
  alternates: { canonical: "/transits" },
};

export default function TransitsPage() {
  return <TransitsClient />;
}
