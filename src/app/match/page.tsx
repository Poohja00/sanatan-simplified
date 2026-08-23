import type { Metadata } from "next";
import MatchSection from "@/components/MatchSection";

export const metadata: Metadata = {
  title: "Free Kundli Matching — Ashta Kuta Guna Milan Calculator",
  description:
    "Check horoscope compatibility with the classical 36-point Ashta-Kuta system — Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, and Nadi, with the reasoning behind your score explained.",
  alternates: { canonical: "/match" },
};

export default function MatchPage() {
  return <MatchSection />;
}
