import type { Metadata } from "next";
import EpicArticle from "@/components/EpicArticle";

export const metadata: Metadata = {
  title: "Mahabharata Simplified — The Kurukshetra War & the Gita, Explained",
  description:
    "The Mahabharata explained in plain language — the Pandavas and Kauravas, the game of dice, the Kurukshetra war, and the Bhagavad Gita's core teaching.",
  alternates: { canonical: "/wisdom/mahabharata" },
};

const SECTIONS = [
  {
    title: "One Family, Two Branches",
    body: "The Kuru dynasty splits into two sets of cousins: the five Pandava brothers (Yudhishthira, Bhima, Arjuna, Nakula, and Sahadeva) and the hundred Kaurava brothers, led by the eldest, Duryodhana. Both are raised together, trained by the same teachers — but Duryodhana's jealousy of the Pandavas, especially Arjuna's skill and Yudhishthira's claim to the throne, poisons the relationship from early on.",
  },
  {
    title: "Exile, Twice Over",
    body: "Duryodhana repeatedly tries to sideline the Pandavas — including a failed attempt to burn them alive in a house of lac. After the Pandavas survive and grow in strength, Duryodhana lures Yudhishthira into a rigged game of dice, in which Yudhishthira loses his kingdom, his brothers, and even Draupadi (the shared wife of all five Pandavas) as stakes. Draupadi's public humiliation in the court — Duryodhana's brother Dushasana attempts to disrobe her, and Krishna is said to have miraculously protected her — becomes the moment the conflict turns irreversible. The Pandavas are sent into thirteen years of exile, the last spent in hiding.",
  },
  {
    title: "The Failed Peace",
    body: "When the exile ends, Duryodhana refuses to return even the smallest portion of the kingdom. Krishna, acting as an envoy for peace, is rejected. War becomes unavoidable — not because either side wants it, but because Duryodhana will not concede an inch, and the Pandavas will not accept permanent injustice.",
  },
  {
    title: "The Bhagavad Gita — On the Battlefield Itself",
    body: "As the two armies face each other at Kurukshetra, Arjuna — the Pandavas' greatest warrior — is overwhelmed. He's about to fight his own teachers, cousins, and grandfather, and he lowers his bow, unwilling to go through with it. His charioteer, Krishna, responds not with battle strategy but with a full teaching on duty, the nature of the self, and detachment from outcome — this conversation is the Bhagavad Gita, one of the most read texts in the world on its own. Its central idea: act according to your dharma, fully and without attachment to the result, because the result was never fully yours to control anyway.",
  },
  {
    title: "Eighteen Days of War",
    body: "The war lasts eighteen days and claims nearly everyone on both sides. Bhishma, the Pandavas' own grandfather, fights for the Kauravas out of loyalty to the throne he serves, and falls only when Arjuna forces the issue. Karna — secretly the Pandavas' elder half-brother, raised without knowing his birth — fights for Duryodhana out of loyalty to the one person who never judged his low-born upbringing, and is killed by Arjuna in one of the epic's most tragic confrontations. By the end, Duryodhana and nearly all hundred Kauravas are dead.",
  },
  {
    title: "A Costly Victory",
    body: "The Pandavas win, but the cost is staggering — teachers, cousins, and an entire generation are gone. Yudhishthira is crowned king but reigns with visible grief rather than triumph. Decades later, the brothers renounce the throne and set out on a final pilgrimage into the Himalayas, leaving the world the way they entered it: walking toward something larger than the kingdom they fought for.",
  },
  {
    title: "What It's Really About",
    body: "The Mahabharata resists a tidy moral — nearly every character has a genuine claim to being right, and the 'good side' still commits real wrongs to win. That's largely the point: dharma is rarely a clean line, and the epic spends 100,000+ verses showing duty, loyalty, and justice pulling against each other in ways that don't resolve neatly. The Gita, delivered right at the story's most impossible moment, is the epic's answer to that mess — not a promise that the right choice will be easy, but a framework for making it anyway.",
  },
];

export default function MahabharataPage() {
  return (
    <EpicArticle
      kicker="Sanatan Wisdom · Mahabharata"
      title="The Mahabharata, Simplified"
      intro="The other great Sanskrit epic — traditionally attributed to the sage Vyasa, and one of the longest poems ever composed. Here's the Kurukshetra story, and the Bhagavad Gita at its center, in plain language."
      sections={SECTIONS}
    />
  );
}
