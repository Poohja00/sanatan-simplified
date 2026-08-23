import type { Metadata } from "next";
import PlanetsClient from "./PlanetsClient";

export const metadata: Metadata = {
  title: "Your Planets & Houses — Full Birth Chart Breakdown",
  description:
    "Every planet in your Vedic birth chart with its sign, house, nakshatra, pada, exact degree and retrograde status — plus what each of your twelve houses governs.",
  alternates: { canonical: "/chart/planets" },
};

export default function PlanetsPage() {
  return <PlanetsClient />;
}
