import type { Metadata } from "next";
import AspectsClient from "./AspectsClient";

export const metadata: Metadata = {
  title: "Your Aspects — Vedic Graha Drishti Explained",
  description:
    "Every planetary aspect in your Vedic birth chart, calculated by house count as classical Jyotish does — including the special 4th/8th, 5th/9th and 3rd/10th aspects of Mars, Jupiter and Saturn.",
  alternates: { canonical: "/chart/aspects" },
};

export default function AspectsPage() {
  return <AspectsClient />;
}
