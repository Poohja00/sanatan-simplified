import type { Metadata } from "next";
import MoonClient from "./MoonClient";

export const metadata: Metadata = {
  title: "Moon Phase Today — Tithi, Nakshatra & What It Means",
  description:
    "Today's moon phase with exact illumination, the Moon's current sign and nakshatra, and the tithi — plus why the Moon, not the Sun, is the centre of Vedic astrology.",
  alternates: { canonical: "/moon" },
};

export default function MoonPage() {
  return <MoonClient />;
}
