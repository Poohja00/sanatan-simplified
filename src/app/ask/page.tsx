import type { Metadata } from "next";
import AskPageClient from "./AskPageClient";

export const metadata: Metadata = {
  title: "Ask Your Birth Chart — Vedic Astrology Questions Answered",
  description:
    "Ask your Vedic birth chart questions in plain English — career, relationships, Saturn, any placement — and get an answer that shows its reasoning, not just a generic horoscope.",
  alternates: { canonical: "/ask" },
};

export default function AskPage() {
  return <AskPageClient />;
}
