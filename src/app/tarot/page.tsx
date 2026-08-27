import type { Metadata } from "next";
import TarotClient from "./TarotClient";

export const metadata: Metadata = {
  title: "Tarot Card of the Day — Free Daily Draw",
  description:
    "Draw your daily tarot card and read its meaning in plain language — upright and reversed, no jargon, no sign-up.",
  alternates: { canonical: "/tarot" },
};

export default function TarotPage() {
  return <TarotClient />;
}
