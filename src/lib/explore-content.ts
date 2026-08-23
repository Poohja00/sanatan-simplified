/**
 * Static educational content — the SEO surface. Deliberately server-rendered
 * with no API dependency so every word is crawlable and these pages work
 * even if the chart engine is down.
 */

export const PLANETS = [
  {
    slug: "sun", name: "Sun", sanskrit: "Surya",
    short: "Identity, confidence, authority, and vitality.",
    body: "The Sun (Surya) is the atmakaraka — the significator of the soul. It represents your core identity, willpower, and sense of purpose, along with authority figures, especially the father. A strong Sun shows as natural confidence and leadership; an afflicted one can show as either ego or a struggle to feel seen.",
    rules: "Leo", exalted: "Aries", debilitated: "Libra",
  },
  {
    slug: "moon", name: "Moon", sanskrit: "Chandra",
    short: "Emotions, mind, instincts, and the mother.",
    body: "The Moon (Chandra) governs manas — the mind and emotional nature. In Vedic astrology the Moon matters enormously: your Moon sign (rashi) is often considered more telling than your Sun sign, and the Moon's nakshatra determines your entire Vimshottari dasha timeline.",
    rules: "Cancer", exalted: "Taurus", debilitated: "Scorpio",
  },
  {
    slug: "mars", name: "Mars", sanskrit: "Mangala",
    short: "Drive, courage, anger, and how you assert yourself.",
    body: "Mars (Mangala) is the warrior — action, physical energy, competition, and conflict. It also signifies siblings and property. Mars placements are central to the Mangal Dosha (Manglik) analysis used in marriage matching.",
    rules: "Aries & Scorpio", exalted: "Capricorn", debilitated: "Cancer",
  },
  {
    slug: "mercury", name: "Mercury", sanskrit: "Budha",
    short: "Communication, intellect, and adaptability.",
    body: "Mercury (Budha) governs speech, logic, commerce, and analytical thinking. It is the most adaptable of the planets, taking on the qualities of whatever it sits with — which is why Mercury's condition depends so heavily on its company.",
    rules: "Gemini & Virgo", exalted: "Virgo", debilitated: "Pisces",
  },
  {
    slug: "jupiter", name: "Jupiter", sanskrit: "Guru",
    short: "Wisdom, growth, optimism, and good fortune.",
    body: "Jupiter (Guru or Brihaspati) is the great benefic — knowledge, dharma, teachers, children, and expansion. Its aspect on a house is traditionally considered protective. Jupiter takes about twelve years to circle the zodiac, roughly a year per sign.",
    rules: "Sagittarius & Pisces", exalted: "Cancer", debilitated: "Capricorn",
  },
  {
    slug: "venus", name: "Venus", sanskrit: "Shukra",
    short: "Love, beauty, pleasure, and material comfort.",
    body: "Venus (Shukra) governs romance, art, luxury, and diplomacy — and in classical texts, the spouse for a male chart. It represents what you find beautiful and what you are drawn toward.",
    rules: "Taurus & Libra", exalted: "Pisces", debilitated: "Virgo",
  },
  {
    slug: "saturn", name: "Saturn", sanskrit: "Shani",
    short: "Discipline, responsibility, delay, and long-term lessons.",
    body: "Saturn (Shani) is the great teacher, working through restriction rather than ease. It represents karma, hard work, patience, and maturity earned over time. Saturn's slow transit — about two and a half years per sign — is behind the well-known Sade Sati period.",
    rules: "Capricorn & Aquarius", exalted: "Libra", debilitated: "Aries",
  },
  {
    slug: "rahu", name: "Rahu", sanskrit: "Rahu",
    short: "Obsession, ambition, and the unconventional.",
    body: "Rahu is a shadow planet — the north lunar node, a mathematical point rather than a body. It amplifies whatever it touches, often toward the foreign, the unfamiliar, or the intensely desired. Rahu is always exactly opposite Ketu.",
    rules: "—", exalted: "Taurus (disputed)", debilitated: "Scorpio (disputed)",
  },
  {
    slug: "ketu", name: "Ketu", sanskrit: "Ketu",
    short: "Detachment, spirituality, and past-life mastery.",
    body: "Ketu is the south lunar node, Rahu's opposite point. It creates a sense of having been here before — mastery paired with disinterest. Where Rahu grasps, Ketu releases, which is why Ketu is associated with moksha and spiritual pursuit.",
    rules: "—", exalted: "Scorpio (disputed)", debilitated: "Taurus (disputed)",
  },
];

export const HOUSES = [
  { num: 1, name: "Self & Personality", sanskrit: "Lagna / Tanu Bhava", short: "How you come across, your body, your basic nature.", body: "The first house is the lens for the entire chart — the rising sign sets which sign occupies every other house. It governs physical appearance, temperament, vitality, and your instinctive approach to life." },
  { num: 2, name: "Wealth & Family", sanskrit: "Dhana Bhava", short: "Money, savings, family, speech, and what you consider yours.", body: "The second house covers accumulated wealth (as distinct from income), the immediate family you were born into, your voice and manner of speaking, and food." },
  { num: 3, name: "Courage & Effort", sanskrit: "Sahaja Bhava", short: "Effort, courage, siblings, short travel, and communication.", body: "The third house is self-made effort — the willingness to push. It rules younger siblings, skills learned by doing, short journeys, and everyday communication." },
  { num: 4, name: "Home & Foundation", sanskrit: "Sukha Bhava", short: "Home, emotional security, mother, property, belonging.", body: "The fourth house sits at the base of the chart and governs your foundation: the mother, the home, land and vehicles, and your inner sense of safety." },
  { num: 5, name: "Creativity & Children", sanskrit: "Putra Bhava", short: "Creativity, intelligence, romance, children, past merit.", body: "The fifth house covers what you create — children, art, ideas — as well as intelligence, romance, speculation, and purva punya (merit carried from past lives)." },
  { num: 6, name: "Challenges & Service", sanskrit: "Ripu Bhava", short: "Obstacles, health, debts, enemies, and daily work.", body: "The sixth house is difficulty and how you handle it: illness, debt, conflict, competition, and the daily grind of routine work and service." },
  { num: 7, name: "Partnership & Marriage", sanskrit: "Kalatra Bhava", short: "Marriage, business partnerships, one-to-one relating.", body: "Directly opposite the first house, the seventh governs the other — the spouse, business partners, and how you meet people as equals. It is the primary house consulted in marriage matching." },
  { num: 8, name: "Transformation", sanskrit: "Ayur Bhava", short: "Deep change, shared resources, mystery, longevity.", body: "The eighth house rules what is hidden: inheritance and other people's money, sudden upheaval, the occult, and longevity itself. Difficult, but the traditional house of deep research and hidden knowledge." },
  { num: 9, name: "Beliefs & Fortune", sanskrit: "Dharma Bhava", short: "Luck, higher learning, philosophy, long travel, father.", body: "The ninth is the most auspicious house in classical Jyotish — dharma, fortune, the guru, the father, higher education, pilgrimage, and long-distance travel." },
  { num: 10, name: "Career & Public Life", sanskrit: "Karma Bhava", short: "Career, reputation, authority, your role in the world.", body: "At the top of the chart, the tenth house is what you are publicly known for: profession, status, authority, and visible achievement." },
  { num: 11, name: "Gains & Community", sanskrit: "Labha Bhava", short: "Income, friendships, networks, fulfilment of goals.", body: "The eleventh house covers gains of all kinds — income (as opposed to accumulated wealth), friends, social networks, elder siblings, and desires being met." },
  { num: 12, name: "Release & the Unseen", sanskrit: "Vyaya Bhava", short: "Letting go, solitude, foreign lands, spirituality, sleep.", body: "The twelfth house is expenditure and dissolution: losses, isolation, foreign residence, the subconscious, sleep and dreams — and moksha, liberation itself." },
];

export const NAKSHATRA_INFO = [
  { name: "Ashwini", lord: "Ketu", symbol: "Horse's head", short: "Speed, healing, fresh starts." },
  { name: "Bharani", lord: "Venus", symbol: "Yoni", short: "Bearing, restraint, transformation." },
  { name: "Krittika", lord: "Sun", symbol: "Blade", short: "Sharpness, purification, cutting through." },
  { name: "Rohini", lord: "Moon", symbol: "Chariot", short: "Growth, beauty, fertility." },
  { name: "Mrigashira", lord: "Mars", symbol: "Deer's head", short: "Searching, curiosity, gentleness." },
  { name: "Ardra", lord: "Rahu", symbol: "Teardrop", short: "Storm, upheaval, breakthrough." },
  { name: "Punarvasu", lord: "Jupiter", symbol: "Quiver of arrows", short: "Return, renewal, safety." },
  { name: "Pushya", lord: "Saturn", symbol: "Cow's udder", short: "Nourishment, the most auspicious nakshatra." },
  { name: "Ashlesha", lord: "Mercury", symbol: "Coiled serpent", short: "Entwining, insight, hidden power." },
  { name: "Magha", lord: "Ketu", symbol: "Royal throne", short: "Ancestry, authority, legacy." },
  { name: "Purva Phalguni", lord: "Venus", symbol: "Front of a bed", short: "Pleasure, rest, creativity." },
  { name: "Uttara Phalguni", lord: "Sun", symbol: "Back of a bed", short: "Patronage, contracts, friendship." },
  { name: "Hasta", lord: "Moon", symbol: "Hand", short: "Skill, craft, dexterity." },
  { name: "Chitra", lord: "Mars", symbol: "Bright jewel", short: "Design, brilliance, form." },
  { name: "Swati", lord: "Rahu", symbol: "Young shoot in wind", short: "Independence, flexibility, trade." },
  { name: "Vishakha", lord: "Jupiter", symbol: "Triumphal arch", short: "Determination, goal-focus." },
  { name: "Anuradha", lord: "Saturn", symbol: "Lotus", short: "Devotion, friendship, cooperation." },
  { name: "Jyeshtha", lord: "Mercury", symbol: "Amulet", short: "Seniority, protection, responsibility." },
  { name: "Mula", lord: "Ketu", symbol: "Bundle of roots", short: "Getting to the root, dissolution." },
  { name: "Purva Ashadha", lord: "Venus", symbol: "Fan", short: "Invincibility, conviction." },
  { name: "Uttara Ashadha", lord: "Sun", symbol: "Elephant tusk", short: "Lasting victory, integrity." },
  { name: "Shravana", lord: "Moon", symbol: "Ear", short: "Listening, learning, tradition." },
  { name: "Dhanishta", lord: "Mars", symbol: "Drum", short: "Rhythm, wealth, music." },
  { name: "Shatabhisha", lord: "Rahu", symbol: "Empty circle", short: "Healing, secrecy, solitude." },
  { name: "Purva Bhadrapada", lord: "Jupiter", symbol: "Sword", short: "Intensity, penance, extremes." },
  { name: "Uttara Bhadrapada", lord: "Saturn", symbol: "Serpent of the deep", short: "Depth, stillness, wisdom." },
  { name: "Revati", lord: "Mercury", symbol: "Fish", short: "Safe passage, completion, compassion." },
];
