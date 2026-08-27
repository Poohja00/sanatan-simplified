import type { Metadata } from "next";
import EpicArticle from "@/components/EpicArticle";

export const metadata: Metadata = {
  title: "Ramayana Simplified — The Story of Rama, Explained Plainly",
  description:
    "The Ramayana explained kanda by kanda in plain language — Rama's exile, Sita's abduction, Hanuman, and the return to Ayodhya.",
  alternates: { canonical: "/wisdom/ramayana" },
};

const SECTIONS = [
  {
    title: "Bala Kanda — A Prince is Born",
    body: "In the kingdom of Ayodhya, King Dasharatha has four sons through his three wives: Rama, Bharata, Lakshmana, and Shatrughna. Rama, the eldest, grows up as the ideal son — disciplined, principled, and deeply loved. As a young man he wins the hand of Sita, princess of Mithila, by stringing and breaking a bow that no other suitor could even lift.",
  },
  {
    title: "Ayodhya Kanda — Exile Instead of a Crown",
    body: "Dasharatha plans to crown Rama as his successor. But his second wife Kaikeyi, manipulated by her maid, calls in an old promise from the king: her own son Bharata gets the throne, and Rama is exiled to the forest for fourteen years. Rama accepts without protest, choosing to honor his father's word over his own claim. Sita and his brother Lakshmana insist on going with him.",
  },
  {
    title: "Aranya Kanda — The Forest, and a Fateful Abduction",
    body: "Years pass in the forest. Then Ravana, the powerful king of Lanka, sees Sita and becomes obsessed with her. He sends a demon disguised as a golden deer to lure Rama and Lakshmana away, then abducts Sita and carries her off to Lanka. Rama, returning to find her gone, is devastated — this is the turning point the rest of the epic responds to.",
  },
  {
    title: "Kishkindha Kanda — An Alliance is Formed",
    body: "Searching for Sita, Rama allies with Sugriva, the exiled king of the monkey kingdom Kishkindha, helping him reclaim his throne in exchange for help finding Sita. Here Rama meets Hanuman, Sugriva's minister — a figure of immense strength, devotion, and humility who becomes central to everything that follows.",
  },
  {
    title: "Sundara Kanda — Hanuman's Leap",
    body: "Hanuman leaps across the sea to Lanka, finds Sita held captive in Ravana's garden, and reassures her that rescue is coming. He is captured, and in a show of both defiance and restraint, allows Ravana's forces to set his tail on fire — then uses it to burn part of Lanka before leaping back to report to Rama. It's widely considered the emotional heart of the epic.",
  },
  {
    title: "Yuddha Kanda — The War for Lanka",
    body: "Rama's army of monkeys and bears builds a bridge of stones across the sea to Lanka. A great war follows, ending when Rama kills Ravana in single combat. Sita undergoes Agni Pariksha — a trial by fire — to prove her purity after her long captivity, and the couple is finally reunited.",
  },
  {
    title: "Uttara Kanda — Return, and a Harder Ending",
    body: "Rama returns to Ayodhya and is crowned king, beginning what's remembered as Rama Rajya — an era of just and harmonious rule. But the epic doesn't end simply: public doubt about Sita's time in captivity leads Rama to exile her while pregnant, and she raises their twin sons alone in a sage's hermitage. It's the epic's most debated chapter, often read as a meditation on duty's cost rather than a moral endorsement.",
  },
  {
    title: "What It's Really About",
    body: "Strip away the specific plot and the Ramayana is about dharma under pressure — doing right when it costs you the throne, the beloved, or the easy path. Rama is remembered as maryada purushottama, the ideal man, precisely because he keeps choosing duty over convenience, even when duty is brutal. Every character orbits that same question in their own way: Sita's endurance, Lakshmana's loyalty, Hanuman's devotion, even Ravana's downfall through unchecked desire.",
  },
];

export default function RamayanaPage() {
  return (
    <EpicArticle
      kicker="Sanatan Wisdom · Ramayana"
      title="The Ramayana, Simplified"
      intro="One of the two great Sanskrit epics of Sanatan Dharma, traditionally attributed to the sage Valmiki. Here's the story in plain language, kanda by kanda — no prior knowledge required."
      sections={SECTIONS}
    />
  );
}
