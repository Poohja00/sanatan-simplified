/**
 * The 22 Major Arcana — traditional Rider-Waite-Smith meanings, in plain
 * language. Static and server-renderable; the daily/drawn card is chosen
 * client-side, the meanings themselves are fixed reference content.
 */
export type TarotCard = {
  num: number;
  name: string;
  keyword: string;
  upright: string;
  reversed: string;
};

export const MAJOR_ARCANA: TarotCard[] = [
  { num: 0, name: "The Fool", keyword: "New beginnings", upright: "A leap of faith. Innocence, spontaneity, and the start of a journey before you know where it leads.", reversed: "Recklessness, or fear holding you back from a start you're ready for." },
  { num: 1, name: "The Magician", keyword: "Willpower", upright: "You have every tool you need already in hand. Focus, skill, and the will to turn intention into action.", reversed: "Scattered energy, manipulation, or talent left unused." },
  { num: 2, name: "The High Priestess", keyword: "Intuition", upright: "Quiet knowing over loud logic. Trust what you sense beneath the surface, even unproven.", reversed: "Disconnection from your own instincts, or secrets kept too long." },
  { num: 3, name: "The Empress", keyword: "Abundance", upright: "Nurturing, fertility, and creation in full bloom — of a project, a relationship, or yourself.", reversed: "Neglect, creative block, or overgiving until you're depleted." },
  { num: 4, name: "The Emperor", keyword: "Structure", upright: "Authority, discipline, and stable foundations built through order rather than force.", reversed: "Rigidity, control for its own sake, or a structure that's stopped serving you." },
  { num: 5, name: "The Hierophant", keyword: "Tradition", upright: "Learning from established wisdom — a teacher, a lineage, a system that's worked for generations.", reversed: "Questioning convention, or outgrowing a belief you were handed rather than chose." },
  { num: 6, name: "The Lovers", keyword: "Union", upright: "A meaningful choice made from alignment — with another person, or between two paths within yourself.", reversed: "Imbalance, a values mismatch, or a decision avoided." },
  { num: 7, name: "The Chariot", keyword: "Willpower", upright: "Forward motion through sheer determination, holding two opposing forces steady and moving anyway.", reversed: "Losing direction, or forcing progress that needs a different approach." },
  { num: 8, name: "Strength", keyword: "Inner courage", upright: "Gentleness that outlasts force. Patience, compassion, and quiet resolve rather than domination.", reversed: "Self-doubt, or trying to control through force what needs softness instead." },
  { num: 9, name: "The Hermit", keyword: "Introspection", upright: "Stepping back from the noise to find your own answer. Solitude used well.", reversed: "Isolation that's gone on too long, or avoiding the reflection you need." },
  { num: 10, name: "Wheel of Fortune", keyword: "Cycles", upright: "Change arriving on its own timeline. What goes around genuinely comes around here.", reversed: "Resisting a turn that's already in motion, or a run of bad luck testing your patience." },
  { num: 11, name: "Justice", keyword: "Truth", upright: "Cause and consequence, clearly seen. Fairness, accountability, and decisions made with clear eyes.", reversed: "An imbalance unaddressed, or avoiding a truth that has consequences either way." },
  { num: 12, name: "The Hanged Man", keyword: "Surrender", upright: "A pause that changes your perspective. Letting go of control shows you what pushing couldn't.", reversed: "Stalling, or sacrifice made without real purpose behind it." },
  { num: 13, name: "Death", keyword: "Transformation", upright: "An ending that clears space for what's next. Rarely literal — almost always a necessary close.", reversed: "Resisting an ending that's already happened, prolonging what needs to be released." },
  { num: 14, name: "Temperance", keyword: "Balance", upright: "Blending opposites into something workable. Patience, moderation, and the middle path.", reversed: "Excess in one direction, or impatience that skips the blending altogether." },
  { num: 15, name: "The Devil", keyword: "Attachment", upright: "A pattern, habit, or relationship that has real hold over you — worth naming honestly.", reversed: "Breaking free of a bond that no longer serves you, or seeing the trap clearly for the first time." },
  { num: 16, name: "The Tower", keyword: "Sudden change", upright: "A structure collapses because it was never sound. Disruptive, but it clears out what was false.", reversed: "Avoiding an overdue collapse, or the aftershock of one already underway." },
  { num: 17, name: "The Star", keyword: "Hope", upright: "Renewal after difficulty. Quiet faith that things are, in fact, going to be okay.", reversed: "Disconnection from hope, or faith that feels hard to access right now." },
  { num: 18, name: "The Moon", keyword: "Uncertainty", upright: "Things aren't fully clear yet — intuition matters more than facts you don't have yet.", reversed: "Confusion lifting, or fear that turned out to be larger than the reality." },
  { num: 19, name: "The Sun", keyword: "Joy", upright: "Clarity, vitality, and straightforward good fortune. Little needs decoding here.", reversed: "Joy delayed, or success that hasn't been fully claimed yet." },
  { num: 20, name: "Judgement", keyword: "Reckoning", upright: "An honest accounting of where you've been, and a call toward where you're meant to go next.", reversed: "Self-judgment that's too harsh, or avoiding a reckoning that's due." },
  { num: 21, name: "The World", keyword: "Completion", upright: "A cycle closes, fully and well. Integration, achievement, and arriving where you set out to.", reversed: "A near-completion still missing its last piece, or closure sought too early." },
];

/** Deterministic "card of the day" — same card for everyone on the same date. */
export function cardForDate(dateKey: string): TarotCard {
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) hash = (hash * 31 + dateKey.charCodeAt(i)) >>> 0;
  return MAJOR_ARCANA[hash % MAJOR_ARCANA.length];
}
