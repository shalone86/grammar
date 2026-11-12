// Grammar! Curriculum data, Montessori parts of speech, question banks, and generators for Grades 1, 2, and 3.
// Pure ES module with no external dependencies. Tested in test/grammar.test.js.

export const PARTS_OF_SPEECH = {
  article: {
    id: "article",
    name: "Article",
    color: "#38bdf8",
    colorDark: "#0284c7",
    colorSoft: "#e0f2fe",
    colorInk: "#0369a1",
    shape: "triangle-sm",
    symbol: "▲",
    icon: "article",
    desc: "Introduces a noun",
    hint: "Articles (a, an, the) point out a noun.",
    examples: ["a", "an", "the"],
  },
  adjective: {
    id: "adjective",
    name: "Adjective",
    color: "#2563eb",
    colorDark: "#1d4ed8",
    colorSoft: "#dbeafe",
    colorInk: "#1e40af",
    shape: "triangle-md",
    symbol: "▲",
    icon: "adjective",
    desc: "Describes a noun",
    hint: "Adjectives describe what kind, color, size, or how many (like blue, big, sweet).",
    examples: ["blue", "happy", "small", "crunchy", "shiny", "brave", "sunny"],
  },
  noun: {
    id: "noun",
    name: "Noun",
    color: "#1c1917",
    colorDark: "#0c0a09",
    colorSoft: "#f5f5f4",
    colorInk: "#292524",
    shape: "triangle-lg",
    symbol: "▲",
    icon: "noun",
    desc: "Person, place, or thing",
    hint: "A noun names a person, place, animal, or thing (like Maya, park, puppy, pizza).",
    examples: ["cat", "dog", "school", "park", "apple", "teacher", "rocket", "frog"],
  },
  pronoun: {
    id: "pronoun",
    name: "Pronoun",
    color: "#9333ea",
    colorDark: "#7e22ce",
    colorSoft: "#f3e8ff",
    colorInk: "#6b21a8",
    shape: "triangle-tall",
    symbol: "▲",
    icon: "pronoun",
    desc: "Replaces a noun",
    hint: "Pronouns take the place of a noun (like I, you, he, she, it, we, they).",
    examples: ["I", "you", "he", "she", "it", "we", "they", "me", "him", "her"],
  },
  verb: {
    id: "verb",
    name: "Verb",
    color: "#ef4444",
    colorDark: "#dc2626",
    colorSoft: "#fee2e2",
    colorInk: "#991b1b",
    shape: "circle-lg",
    symbol: "●",
    icon: "verb",
    desc: "Action or state of being",
    hint: "Verbs tell what someone or something does (like jump, run, sleep, is, was).",
    examples: ["runs", "jumped", "plays", "sleeps", "is", "was", "eats", "dances"],
  },
  adverb: {
    id: "adverb",
    name: "Adverb",
    color: "#f97316",
    colorDark: "#ea580c",
    colorSoft: "#ffedd5",
    colorInk: "#9a3412",
    shape: "circle-sm",
    symbol: "●",
    icon: "adverb",
    desc: "Describes a verb",
    hint: "Adverbs tell how, when, or where an action happens (often ends in -ly, like quickly, quietly).",
    examples: ["quickly", "loudly", "softly", "slowly", "brightly", "always", "here"],
  },
  preposition: {
    id: "preposition",
    name: "Preposition",
    color: "#16a34a",
    colorDark: "#15803d",
    colorSoft: "#dcfce7",
    colorInk: "#14532d",
    shape: "crescent",
    symbol: "◡",
    icon: "preposition",
    desc: "Position or direction",
    hint: "Prepositions show where or when something is (like in, on, under, through, between).",
    examples: ["in", "on", "under", "over", "through", "beside", "behind", "with"],
  },
  conjunction: {
    id: "conjunction",
    name: "Conjunction",
    color: "#ec4899",
    colorDark: "#db2777",
    colorSoft: "#fce7f3",
    colorInk: "#9d174d",
    shape: "rectangle",
    symbol: "▬",
    icon: "conjunction",
    desc: "Connects words or ideas",
    hint: "Conjunctions glue words or sentence parts together (like and, but, or, so, because).",
    examples: ["and", "but", "or", "so", "because"],
  },
  interjection: {
    id: "interjection",
    name: "Interjection",
    color: "#eab308",
    colorDark: "#ca8a04",
    colorSoft: "#fef9c3",
    colorInk: "#713f12",
    shape: "keyhole",
    symbol: "♠",
    icon: "interjection",
    desc: "Expresses strong feeling",
    hint: "Interjections express sudden excitement or emotion (like Wow!, Ouch!, Hooray!).",
    examples: ["Wow!", "Ouch!", "Hooray!", "Hey!"],
  },
};

/**
 * Returns an inline SVG string for the classic Montessori grammar symbol.
 */
export function montessoriSvg(type, size = 26) {
  const p = PARTS_OF_SPEECH[type];
  if (!p) return "";
  const s = size;
  switch (p.shape) {
    case "triangle-sm": // Article (small light blue equilateral triangle)
      return `<svg class="msym msym-article" width="${s}" height="${s}" viewBox="0 0 32 32" aria-label="${p.name} symbol" role="img"><polygon points="16,10 26,26 6,26" fill="${p.color}"/></svg>`;
    case "triangle-md": // Adjective (medium royal blue equilateral triangle)
      return `<svg class="msym msym-adjective" width="${s}" height="${s}" viewBox="0 0 32 32" aria-label="${p.name} symbol" role="img"><polygon points="16,6 28,26 4,26" fill="${p.color}"/></svg>`;
    case "triangle-lg": // Noun (large black equilateral triangle)
      return `<svg class="msym msym-noun" width="${s}" height="${s}" viewBox="0 0 32 32" aria-label="${p.name} symbol" role="img"><polygon points="16,3 30,27 2,27" fill="${p.color}"/></svg>`;
    case "triangle-tall": // Pronoun (tall purple isosceles triangle)
      return `<svg class="msym msym-pronoun" width="${s}" height="${s}" viewBox="0 0 32 32" aria-label="${p.name} symbol" role="img"><polygon points="16,2 25,29 7,29" fill="${p.color}"/></svg>`;
    case "circle-lg": // Verb (large energy red circle)
      return `<svg class="msym msym-verb" width="${s}" height="${s}" viewBox="0 0 32 32" aria-label="${p.name} symbol" role="img"><circle cx="16" cy="16" r="13" fill="${p.color}"/></svg>`;
    case "circle-sm": // Adverb (smaller orange circle)
      return `<svg class="msym msym-adverb" width="${s}" height="${s}" viewBox="0 0 32 32" aria-label="${p.name} symbol" role="img"><circle cx="16" cy="16" r="9" fill="${p.color}"/></svg>`;
    case "crescent": // Preposition (green crescent/bridge)
      return `<svg class="msym msym-preposition" width="${s}" height="${s}" viewBox="0 0 32 32" aria-label="${p.name} symbol" role="img"><path d="M4 22 C4 9, 28 9, 28 22 C22 17, 10 17, 4 22 Z" fill="${p.color}"/></svg>`;
    case "rectangle": // Conjunction (pink horizontal bar)
      return `<svg class="msym msym-conjunction" width="${s}" height="${s}" viewBox="0 0 32 32" aria-label="${p.name} symbol" role="img"><rect x="3" y="11" width="26" height="10" rx="3" fill="${p.color}"/></svg>`;
    case "keyhole": // Interjection (gold keyhole)
      return `<svg class="msym msym-interjection" width="${s}" height="${s}" viewBox="0 0 32 32" aria-label="${p.name} symbol" role="img"><circle cx="16" cy="9" r="6" fill="${p.color}"/><polygon points="12,15 20,15 18,29 14,29" fill="${p.color}"/></svg>`;
    default:
      return `<span class="msym-char">${p.symbol}</span>`;
  }
}

export const WORLDS = [
  {
    n: 1,
    id: "g1",
    title: "Grade 1: Little Writers",
    emoji: "🐣",
    blurb: "Capitals, finger spaces, end marks, nouns, verbs, and sentence scramble.",
    grades: "1st Grade",
  },
  {
    n: 2,
    id: "g2",
    title: "Grade 2: Word Explorers",
    emoji: "🦊",
    blurb: "Proper nouns, commas in lists & dates, contractions, adverbs, and pronouns.",
    grades: "2nd Grade",
  },
  {
    n: 3,
    id: "g3",
    title: "Grade 3: Sentence Masters",
    emoji: "🦉",
    blurb: "Dialogue quotes, possessives, prepositions, conjunctions, and full sentence parsing.",
    grades: "3rd Grade",
  },
];

export const STAGES = [
  // ── Grade 1 ──
  {
    id: "g1-montessori-colors",
    world: 1,
    title: "Montessori Colors & Symbols",
    emoji: "🔺",
    mode: "montessori-intro",
    posList: ["article", "adjective", "noun", "verb"],
    blurb: "Learn the Montessori colors and shapes for nouns, verbs, adjectives, and articles!",
    why: "Montessori colors and shapes help you see what every word does in a sentence.",
  },
  {
    id: "g1-order-simple",
    world: 1,
    title: "Sentence Scramble",
    emoji: "🧩",
    mode: "order",
    blurb: "Drag words into order to make a complete sentence.",
    why: "Sentences start with a capital, end with punctuation, and tell a complete thought.",
  },
  {
    id: "g1-cap-start",
    world: 1,
    title: "Capital Starts",
    emoji: "🔠",
    mode: "capital-start",
    blurb: "Every sentence must begin with a tall capital letter!",
    why: "The first letter of every sentence is always uppercase.",
  },
  {
    id: "g1-spacing",
    world: 1,
    title: "Finger Spaces",
    emoji: "👉",
    mode: "spacing",
    blurb: "Leave a finger space between words so they do not squish.",
    why: "Words need spaces between them so our eyes can read each word clearly.",
  },
  {
    id: "g1-end-marks",
    world: 1,
    title: "End Marks: . ? !",
    emoji: "🛑",
    mode: "punct-end",
    blurb: "Pick a period, question mark, or exclamation mark to end the sentence.",
    why: "A period (.) tells, a question mark (?) asks, and an exclamation mark (!) shouts or cheers.",
  },
  {
    id: "g1-cap-names",
    world: 1,
    title: 'Capital "I" & Names',
    emoji: "👤",
    mode: "capital-names",
    blurb: 'The pronoun "I" and special names always start with a capital letter.',
    why: 'When writing about yourself, "I" is always capital. People and pets get capitals too!',
  },
  {
    id: "g1-montessori-nouns",
    world: 1,
    title: "Montessori Nouns ▲",
    emoji: "▲",
    mode: "classify",
    targetPos: "noun",
    blurb: "Find the black triangle: people, places, and things!",
    why: "Montessori uses a large black triangle for nouns, like the ancient pyramids of Egypt.",
  },
  {
    id: "g1-montessori-verbs",
    world: 1,
    title: "Montessori Verbs ●",
    emoji: "●",
    mode: "classify",
    targetPos: "verb",
    blurb: "Find the red circle: words that show action!",
    why: "Montessori uses a red circle for verbs, like the glowing red sun that gives energy and action.",
  },
  {
    id: "g1-montessori-adj",
    world: 1,
    title: "Articles & Adjectives ▲",
    emoji: "🔷",
    mode: "classify",
    targetPos: "adjective",
    blurb: "Find the blue triangles: describing words and a, an, the.",
    why: "Articles (light blue) and adjectives (dark blue) belong to the noun family.",
  },
  {
    id: "g1-plurals",
    world: 1,
    title: "Plural Nouns (-s & -es)",
    emoji: "🐾",
    mode: "choice-plural",
    blurb: "One dog, two dogs. One fox, two foxes.",
    why: "Add -s for most plurals, and -es when a word ends in s, x, z, ch, or sh.",
  },
  {
    id: "g1-mix",
    world: 1,
    title: "Grade 1 All-Stars",
    emoji: "🌟",
    mode: "mix",
    blurb: "Mix of word ordering, capitals, spacing, and punctuation.",
    why: "Combine all your Grade 1 writing powers!",
  },

  // ── Grade 2 ──
  {
    id: "g2-montessori-colors",
    world: 2,
    title: "Montessori Colors & Symbols",
    emoji: "🔺",
    mode: "montessori-intro",
    posList: ["article", "adjective", "noun", "verb", "pronoun", "adverb"],
    blurb: "Meet the Montessori colors and shapes for pronouns and adverbs, plus Grade 1 favorites!",
    why: "Knowing each Montessori symbol makes spotting parts of speech easy.",
  },
  {
    id: "g2-order-medium",
    world: 2,
    title: "Sentence Scramble 2",
    emoji: "🚂",
    mode: "order",
    blurb: "Build 5-to-6 word sentences with adjectives and adverbs.",
    why: "Longer sentences need careful ordering so the describing words match their nouns.",
  },
  {
    id: "g2-proper-nouns",
    world: 2,
    title: "Proper Nouns",
    emoji: "🏛️",
    mode: "capital-proper",
    blurb: "Days, months, holidays, and places start with capital letters.",
    why: "Proper nouns name specific people, days, months, holidays, cities, and countries.",
  },
  {
    id: "g2-commas-series",
    world: 2,
    title: "Commas in a List",
    emoji: "🍎",
    mode: "commas-series",
    blurb: "Separate 3 or more items with commas: apples, grapes, and figs.",
    why: "Commas give readers a little pause between items in a list.",
  },
  {
    id: "g2-commas-dates",
    world: 2,
    title: "Commas in Dates & Letters",
    emoji: "📅",
    mode: "commas-dates",
    blurb: "Use commas in dates (July 4, 1776) and letter greetings (Dear Mom,).",
    why: "Commas separate the day from the year, and greet friends nicely.",
  },
  {
    id: "g2-contractions",
    world: 2,
    title: "Apostrophe Contractions",
    emoji: "✂️",
    mode: "contractions",
    blurb: "Shorten words with an apostrophe: can not → can't, do not → don't.",
    why: "The apostrophe (') takes the place of the missing letters.",
  },
  {
    id: "g2-montessori-pronouns",
    world: 2,
    title: "Montessori Pronouns ▲",
    emoji: "🟪",
    mode: "classify",
    targetPos: "pronoun",
    blurb: "Find the tall purple triangle: he, she, it, they, we.",
    why: "Montessori uses a tall purple triangle for pronouns standing in for nouns.",
  },
  {
    id: "g2-montessori-adverbs",
    world: 2,
    title: "Montessori Adverbs ●",
    emoji: "🟠",
    mode: "classify",
    targetPos: "adverb",
    blurb: "Find the orange circle: words that tell how, when, or where.",
    why: "Montessori uses an orange circle for adverbs, orbiting the red verb circle.",
  },
  {
    id: "g2-past-verbs",
    world: 2,
    title: "Past Tense Verbs",
    emoji: "⏳",
    mode: "choice-tense",
    blurb: "Yesterday it happened: walked, jumped, ate, went, saw.",
    why: "Regular past verbs end in -ed, but irregular verbs change their spelling!",
  },
  {
    id: "g2-irregular-plurals",
    world: 2,
    title: "Irregular Plurals",
    emoji: "🐭",
    mode: "choice-irreg-plural",
    blurb: "One child, two children. One tooth, two teeth. One mouse, two mice.",
    why: "Some words don't add -s. They change their whole spelling!",
  },
  {
    id: "g2-complete-sentence",
    world: 2,
    title: "Sentence vs Fragment",
    emoji: "⚖️",
    mode: "choice-fragment",
    blurb: "Does it have a who (subject) and a what happened (predicate)?",
    why: "A complete sentence needs both a naming part (subject) and an action part (predicate).",
  },
  {
    id: "g2-mix",
    world: 2,
    title: "Grade 2 All-Stars",
    emoji: "🏆",
    mode: "mix",
    blurb: "Challenge round covering Grade 2 conventions and grammar!",
    why: "Mastering Grade 2 grammar makes you a fantastic reader and writer.",
  },

  // ── Grade 3 ──
  {
    id: "g3-montessori-colors",
    world: 3,
    title: "Montessori Colors & Symbols",
    emoji: "🔺",
    mode: "montessori-intro",
    posList: ["noun", "verb", "adjective", "pronoun", "adverb", "preposition", "conjunction", "interjection"],
    blurb: "Master all Montessori grammar colors and shapes, including prepositions and conjunctions!",
    why: "Every part of speech has its own Montessori color and shape.",
  },
  {
    id: "g3-order-complex",
    world: 3,
    title: "Sentence Scramble 3",
    emoji: "🏗️",
    mode: "order",
    blurb: "Arrange complex sentences with prepositions and conjunctions.",
    why: "Rich sentences connect ideas with conjunctions like and, but, and because.",
  },
  {
    id: "g3-quotations",
    world: 3,
    title: "Dialogue Quotations",
    emoji: "💬",
    mode: "quotes",
    blurb: 'Put quotation marks around exact spoken words: "I am ready!"',
    why: 'Quotation marks (" ") hug the exact words that someone speaks out loud.',
  },
  {
    id: "g3-possessives",
    world: 3,
    title: "Possessive Nouns",
    emoji: "🐕",
    mode: "choice-possessive",
    blurb: "Show ownership with an apostrophe: the dog's bone, the boys' clubhouse.",
    why: "Singular possessives add 's (cat's bell). Plural possessives add an apostrophe after s (cats' food).",
  },
  {
    id: "g3-montessori-prepositions",
    world: 3,
    title: "Montessori Prepositions ◡",
    emoji: "🟢",
    mode: "classify",
    targetPos: "preposition",
    blurb: "Find the green bridge: in, on, under, between, through, above.",
    why: "Montessori uses a green crescent or bridge to show location and connection to a noun.",
  },
  {
    id: "g3-montessori-conjunctions",
    world: 3,
    title: "Montessori Conjunctions ▬",
    emoji: "🌸",
    mode: "classify",
    targetPos: "conjunction",
    blurb: "Find the pink bar: and, but, or, so, because.",
    why: "Montessori uses a pink bar to hold two parts of a sentence together like a link.",
  },
  {
    id: "g3-subject-verb",
    world: 3,
    title: "Subject-Verb Agreement",
    emoji: "🤝",
    mode: "choice-agreement",
    blurb: "The puppy barks. The puppies bark. Subject and verb must match!",
    why: "One subject takes a verb ending in s (he runs). More than one takes a verb without s (they run).",
  },
  {
    id: "g3-comparatives",
    world: 3,
    title: "Comparatives & Superlatives",
    emoji: "📏",
    mode: "choice-comp",
    blurb: "fast, faster, fastest · bright, brighter, brightest.",
    why: "Compare two with -er or more. Compare three or more with -est or most.",
  },
  {
    id: "g3-commas-address",
    world: 3,
    title: "Commas in Addresses & Clauses",
    emoji: "✉️",
    mode: "commas-address",
    blurb: "Austin, Texas · When the bell rang, we went inside.",
    why: "Commas separate city from state, and introductory clauses from the main sentence.",
  },
  {
    id: "g3-montessori-analysis",
    world: 3,
    title: "Montessori Sentence Builder",
    emoji: "📐",
    mode: "analysis",
    blurb: "Label every word in the sentence with its Montessori symbol!",
    why: "See the entire sentence architecture with Montessori symbols and colors.",
  },
  {
    id: "g3-mix",
    world: 3,
    title: "Grade 3 Grammar Champion",
    emoji: "👑",
    mode: "mix",
    blurb: "Master all Grade 1, 2, and 3 grammar skills!",
    why: "You are now a true Grammar Champion!",
  },
];

export const stageById = (id) => STAGES.find((s) => s.id === id);

// ─────────────────────────────────────────────────────────────
// HANDCRAFTED QUESTION BANKS (CURRICULUM ALIGNED)
// ─────────────────────────────────────────────────────────────

export const QUESTIONS_PER_STAGE = 5;

/** Grade 1 Order Bank: 15 varied 3-4 word sentences */
const BANK_G1_ORDER = [
  { text: "We pray before meals.", words: ["We", "pray", "before", "meals."], scrambled: ["before", "meals.", "We", "pray"], spoken: "We pray before meals.", tags: ["pronoun", "verb", "preposition", "noun"] },
  { text: "Bells ring on Sunday.", words: ["Bells", "ring", "on", "Sunday."], scrambled: ["ring", "Sunday.", "Bells", "on"], spoken: "Bells ring on Sunday.", tags: ["noun", "verb", "preposition", "noun"] },
  { text: "Angels sing to God.", words: ["Angels", "sing", "to", "God."], scrambled: ["sing", "to", "God.", "Angels"], spoken: "Angels sing to God.", tags: ["noun", "verb", "preposition", "noun"] },
  { text: "The cat can jump.", words: ["The", "cat", "can", "jump."], scrambled: ["jump.", "The", "can", "cat"], spoken: "The cat can jump.", tags: ["article", "noun", "verb", "verb"] },
  { text: "A dog barked loudly.", words: ["A", "dog", "barked", "loudly."], scrambled: ["loudly.", "dog", "A", "barked"], spoken: "A dog barked loudly.", tags: ["article", "noun", "verb", "adverb"] },
  { text: "She has red apples.", words: ["She", "has", "red", "apples."], scrambled: ["apples.", "red", "She", "has"], spoken: "She has red apples.", tags: ["pronoun", "verb", "adjective", "noun"] },
  { text: "Birds fly in the sky.", words: ["Birds", "fly", "in", "the", "sky."], scrambled: ["sky.", "Birds", "the", "fly", "in"], spoken: "Birds fly in the sky.", tags: ["noun", "verb", "preposition", "article", "noun"] },
  { text: "We like sunny days.", words: ["We", "like", "sunny", "days."], scrambled: ["sunny", "like", "days.", "We"], spoken: "We like sunny days.", tags: ["pronoun", "verb", "adjective", "noun"] },
  { text: "The big fish swam.", words: ["The", "big", "fish", "swam."], scrambled: ["fish", "swam.", "The", "big"], spoken: "The big fish swam.", tags: ["article", "adjective", "noun", "verb"] },
  { text: "Frogs leap very high.", words: ["Frogs", "leap", "very", "high."], scrambled: ["high.", "leap", "very", "Frogs"], spoken: "Frogs leap very high.", tags: ["noun", "verb", "adverb", "adverb"] },
  { text: "He eats sweet berries.", words: ["He", "eats", "sweet", "berries."], scrambled: ["sweet", "He", "berries.", "eats"], spoken: "He eats sweet berries.", tags: ["pronoun", "verb", "adjective", "noun"] },
  { text: "My duck can quack.", words: ["My", "duck", "can", "quack."], scrambled: ["quack.", "My", "can", "duck"], spoken: "My duck can quack.", tags: ["pronoun", "noun", "verb", "verb"] },
  { text: "The warm sun shines.", words: ["The", "warm", "sun", "shines."], scrambled: ["shines.", "warm", "The", "sun"], spoken: "The warm sun shines.", tags: ["article", "adjective", "noun", "verb"] },
  { text: "A green turtle walked.", words: ["A", "green", "turtle", "walked."], scrambled: ["turtle", "walked.", "A", "green"], spoken: "A green turtle walked.", tags: ["article", "adjective", "noun", "verb"] },
  { text: "They kicked the ball.", words: ["They", "kicked", "the", "ball."], scrambled: ["ball.", "They", "the", "kicked"], spoken: "They kicked the ball.", tags: ["pronoun", "verb", "article", "noun"] },
  { text: "Bees make sweet honey.", words: ["Bees", "make", "sweet", "honey."], scrambled: ["honey.", "Bees", "sweet", "make"], spoken: "Bees make sweet honey.", tags: ["noun", "verb", "adjective", "noun"] },
  { text: "I love fuzzy kittens.", words: ["I", "love", "fuzzy", "kittens."], scrambled: ["kittens.", "love", "I", "fuzzy"], spoken: "I love fuzzy kittens.", tags: ["pronoun", "verb", "adjective", "noun"] },
  { text: "Two owls hooted softly.", words: ["Two", "owls", "hooted", "softly."], scrambled: ["softly.", "Two", "hooted", "owls"], spoken: "Two owls hooted softly.", tags: ["adjective", "noun", "verb", "adverb"] },
];

/** Grade 1 Capital Starts: 15 varied sentences */
const BANK_G1_CAPITAL_START = [
  { broken: "we go to Mass on Sunday.", correct: "We go to Mass on Sunday.", badWord: "we", fixedWord: "We", hint: 'Every sentence starts with a capital! Tap "we" to make it "We".', spoken: "We go to Mass on Sunday." },
  { broken: "my guardian angel watches over me.", correct: "My guardian angel watches over me.", badWord: "my", fixedWord: "My", hint: 'Every sentence starts with a capital! Tap "my" to make it "My".', spoken: "My guardian angel watches over me." },
  { broken: "the sun is bright today.", correct: "The sun is bright today.", badWord: "the", fixedWord: "The", hint: 'Every sentence starts with a capital! Tap "the" to make it "The".', spoken: "The sun is bright today." },
  { broken: "my puppy loves to play.", correct: "My puppy loves to play.", badWord: "my", fixedWord: "My", hint: 'Start with a capital M! Tap "my" at the beginning.', spoken: "My puppy loves to play." },
  { broken: "we saw a yellow bird.", correct: "We saw a yellow bird.", badWord: "we", fixedWord: "We", hint: 'Capitalize the first word "We" at the start of the sentence!', spoken: "We saw a yellow bird." },
  { broken: "frogs can swim fast.", correct: "Frogs can swim fast.", badWord: "frogs", fixedWord: "Frogs", hint: 'Tap the first word "frogs" so it starts with a capital F!', spoken: "Frogs can swim fast." },
  { broken: "apples are delicious fruit.", correct: "Apples are delicious fruit.", badWord: "apples", fixedWord: "Apples", hint: 'Start with a capital A! Tap "apples".', spoken: "Apples are delicious fruit." },
  { broken: "cats purr when happy.", correct: "Cats purr when happy.", badWord: "cats", fixedWord: "Cats", hint: 'Capitalize "Cats" at the beginning of the sentence.', spoken: "Cats purr when happy." },
  { broken: "boats float on the lake.", correct: "Boats float on the lake.", badWord: "boats", fixedWord: "Boats", hint: 'The first word "boats" needs a capital B!', spoken: "Boats float on the lake." },
  { broken: "she painted a rainbow.", correct: "She painted a rainbow.", badWord: "she", fixedWord: "She", hint: 'Start the sentence with a capital S in "She"!', spoken: "She painted a rainbow." },
  { broken: "ducks waddle in the mud.", correct: "Ducks waddle in the mud.", badWord: "ducks", fixedWord: "Ducks", hint: 'Tap "ducks" at the start to give it a capital D!', spoken: "Ducks waddle in the mud." },
  { broken: "he built a tall tower.", correct: "He built a tall tower.", badWord: "he", fixedWord: "He", hint: 'The very first word "he" needs a capital H!', spoken: "He built a tall tower." },
  { broken: "butterflies have colorful wings.", correct: "Butterflies have colorful wings.", badWord: "butterflies", fixedWord: "Butterflies", hint: 'Tap the first word "butterflies" to capitalize B!', spoken: "Butterflies have colorful wings." },
  { broken: "monkeys swing from the trees.", correct: "Monkeys swing from the trees.", badWord: "monkeys", fixedWord: "Monkeys", hint: 'Every sentence starts with a capital letter! Tap "monkeys".', spoken: "Monkeys swing from the trees." },
  { broken: "snowflakes fell on my nose.", correct: "Snowflakes fell on my nose.", badWord: "snowflakes", fixedWord: "Snowflakes", hint: 'Tap "snowflakes" to start the sentence with a capital S!', spoken: "Snowflakes fell on my nose." },
  { broken: "rabbits hop through the grass.", correct: "Rabbits hop through the grass.", badWord: "rabbits", fixedWord: "Rabbits", hint: 'Capitalize the first word "Rabbits"!', spoken: "Rabbits hop through the grass." },
  { broken: "turtles hide inside their shells.", correct: "Turtles hide inside their shells.", badWord: "turtles", fixedWord: "Turtles", hint: 'Start the sentence with a capital T in "Turtles"!', spoken: "Turtles hide inside their shells." },
];

/** Grade 1 Finger Spacing: 15 squished sentences where kids click where two words split */
const BANK_G1_SPACING = [
  { squished: "Welight a candle.", correct: "We light a candle.", beforeWords: [], squishedPair: ["We", "light"], afterWords: ["a", "candle."], split: ["We", "light"], spoken: "We light a candle.", hint: 'Tap between "We" and "light" to split them apart!' },
  { squished: "Thecat ran home.", correct: "The cat ran home.", beforeWords: [], squishedPair: ["The", "cat"], afterWords: ["ran", "home."], split: ["The", "cat"], spoken: "The cat ran home.", hint: 'Tap between "The" and "cat" to split them apart!' },
  { squished: "I sawared bird.", correct: "I saw a red bird.", beforeWords: ["I"], squishedPair: ["saw", "a"], afterWords: ["red", "bird."], split: ["saw", "a"], spoken: "I saw a red bird.", hint: 'Tap between "saw" and "a" to add a finger space!' },
  { squished: "Weplay soccer today.", correct: "We play soccer today.", beforeWords: [], squishedPair: ["We", "play"], afterWords: ["soccer", "today."], split: ["We", "play"], spoken: "We play soccer today.", hint: 'Tap between "We" and "play" to give them a finger space!' },
  { squished: "Dogsbark at night.", correct: "Dogs bark at night.", beforeWords: [], squishedPair: ["Dogs", "bark"], afterWords: ["at", "night."], split: ["Dogs", "bark"], spoken: "Dogs bark at night.", hint: 'Tap right between "Dogs" and "bark"!' },
  { squished: "Lookat the moon.", correct: "Look at the moon.", beforeWords: [], squishedPair: ["Look", "at"], afterWords: ["the", "moon."], split: ["Look", "at"], spoken: "Look at the moon.", hint: 'Add a finger space between "Look" and "at"!' },
  { squished: "A fishswims in the pond.", correct: "A fish swims in the pond.", beforeWords: ["A"], squishedPair: ["fish", "swims"], afterWords: ["in", "the", "pond."], split: ["fish", "swims"], spoken: "A fish swims in the pond.", hint: 'Tap between "fish" and "swims"!' },
  { squished: "She hasblue shoes.", correct: "She has blue shoes.", beforeWords: ["She"], squishedPair: ["has", "blue"], afterWords: ["shoes."], split: ["has", "blue"], spoken: "She has blue shoes.", hint: 'Tap between "has" and "blue"!' },
  { squished: "My frogcan hop.", correct: "My frog can hop.", beforeWords: ["My"], squishedPair: ["frog", "can"], afterWords: ["hop."], split: ["frog", "can"], spoken: "My frog can hop.", hint: 'Split "frogcan" into "frog" and "can"!' },
  { squished: "The sunis hot.", correct: "The sun is hot.", beforeWords: ["The"], squishedPair: ["sun", "is"], afterWords: ["hot."], split: ["sun", "is"], spoken: "The sun is hot.", hint: 'Tap between "sun" and "is"!' },
  { squished: "Redbirds sing songs.", correct: "Red birds sing songs.", beforeWords: [], squishedPair: ["Red", "birds"], afterWords: ["sing", "songs."], split: ["Red", "birds"], spoken: "Red birds sing songs.", hint: 'Tap between "Red" and "birds"!' },
  { squished: "He likeswarm milk.", correct: "He likes warm milk.", beforeWords: ["He"], squishedPair: ["likes", "warm"], afterWords: ["milk."], split: ["likes", "warm"], spoken: "He likes warm milk.", hint: 'Tap between "likes" and "warm"!' },
  { squished: "Two ducksquack loudly.", correct: "Two ducks quack loudly.", beforeWords: ["Two"], squishedPair: ["ducks", "quack"], afterWords: ["loudly."], split: ["ducks", "quack"], spoken: "Two ducks quack loudly.", hint: 'Split "ducksquack" between "ducks" and "quack"!' },
  { squished: "Bigbears sleep here.", correct: "Big bears sleep here.", beforeWords: [], squishedPair: ["Big", "bears"], afterWords: ["sleep", "here."], split: ["Big", "bears"], spoken: "Big bears sleep here.", hint: 'Tap between "Big" and "bears"!' },
  { squished: "We eatfresh fruit.", correct: "We eat fresh fruit.", beforeWords: ["We"], squishedPair: ["eat", "fresh"], afterWords: ["fruit."], split: ["eat", "fresh"], spoken: "We eat fresh fruit.", hint: 'Tap between "eat" and "fresh"!' },
  { squished: "The bellrang loudly.", correct: "The bell rang loudly.", beforeWords: ["The"], squishedPair: ["bell", "rang"], afterWords: ["loudly."], split: ["bell", "rang"], spoken: "The bell rang loudly.", hint: 'Tap between "bell" and "rang"!' },
];

/** Grade 1 End Marks: 15 varied sentences */
const BANK_G1_PUNCT_END = [
  { lead: "Can we say grace before dinner", answer: "?", type: "question", hint: "This asks something, so it needs a question mark (?)!", spoken: "Can we say grace before dinner?", choices: [".", "?", "!"] },
  { lead: "Hooray, it is Christmas morning", answer: "!", type: "exclamation", hint: "This shows big excitement, so it needs an exclamation mark (!)!", spoken: "Hooray, it is Christmas morning!", choices: [".", "?", "!"] },
  { lead: "We sing in the church choir", answer: ".", type: "statement", hint: "This just tells something, so it ends with a period (.)!", spoken: "We sing in the church choir.", choices: [".", "?", "!"] },
  { lead: "Can you ride a bike", answer: "?", type: "question", hint: "This asks something, so it needs a question mark (?)!", spoken: "Can you ride a bike?", choices: [".", "?", "!"] },
  { lead: "The kitten is sleeping", answer: ".", type: "statement", hint: "This tells a calm fact, so it needs a period (.).", spoken: "The kitten is sleeping.", choices: [".", "?", "!"] },
  { lead: "Watch out for the ball", answer: "!", type: "exclamation", hint: "This is exciting or urgent, so use an exclamation mark (!)!", spoken: "Watch out for the ball!", choices: [".", "?", "!"] },
  { lead: "Where is my blue backpack", answer: "?", type: "question", hint: '"Where" is asking a question! Use a question mark (?).', spoken: "Where is my blue backpack?", choices: [".", "?", "!"] },
  { lead: "I love reading books", answer: ".", type: "statement", hint: "This is a calm telling sentence. End with a period (.).", spoken: "I love reading books.", choices: [".", "?", "!"] },
  { lead: "We won the gold trophy", answer: "!", type: "exclamation", hint: "Hooray! Big excitement needs an exclamation mark (!)!", spoken: "We won the gold trophy!", choices: [".", "?", "!"] },
  { lead: "What time does lunch start", answer: "?", type: "question", hint: '"What time" asks a question! Pick the question mark (?).', spoken: "What time does lunch start?", choices: [".", "?", "!"] },
  { lead: "The turtle walked across the log", answer: ".", type: "statement", hint: "This tells what the turtle did. Use a period (.).", spoken: "The turtle walked across the log.", choices: [".", "?", "!"] },
  { lead: "Hooray, it is snowing outside", answer: "!", type: "exclamation", hint: '"Hooray" shows strong cheering! Use an exclamation mark (!).', spoken: "Hooray, it is snowing outside!", choices: [".", "?", "!"] },
  { lead: "Do you like strawberry ice cream", answer: "?", type: "question", hint: '"Do you" asks a question! Pick the question mark (?).', spoken: "Do you like strawberry ice cream?", choices: [".", "?", "!"] },
  { lead: "My shoes are under the bed", answer: ".", type: "statement", hint: "This states a calm fact. End it with a period (.).", spoken: "My shoes are under the bed.", choices: [".", "?", "!"] },
  { lead: "Stop, that stove is very hot", answer: "!", type: "exclamation", hint: "A strong warning uses an exclamation mark (!)!", spoken: "Stop, that stove is very hot!", choices: [".", "?", "!"] },
  { lead: "Who is knocking at the door", answer: "?", type: "question", hint: '"Who" asks a question! Use a question mark (?).', spoken: "Who is knocking at the door?", choices: [".", "?", "!"] },
  { lead: "Grandma planted yellow tulips", answer: ".", type: "statement", hint: "This tells us what Grandma planted. Use a period (.).", spoken: "Grandma planted yellow tulips.", choices: [".", "?", "!"] },
  { lead: "Wow, that firework is huge", answer: "!", type: "exclamation", hint: '"Wow" shows amazement! Pick the exclamation mark (!).', spoken: "Wow, that firework is huge!", choices: [".", "?", "!"] },
];

/** Grade 1 Capital "I" and Names: 12 varied sentences */
const BANK_G1_CAPITAL_NAMES = [
  {
    sentence: "After Mass, i thanked father tom.",
    fixedSentence: "After Mass, I thanked Father Tom.",
    tokens: [{ text: "After", cap: false }, { text: "Mass,", cap: false }, { text: "i", cap: true, fixed: "I" }, { text: "thanked", cap: false }, { text: "father", cap: true, fixed: "Father" }, { text: "tom.", cap: true, fixed: "Tom." }],
    hint: "The word \"I\" is always a capital, and so is a name with its title: Father Tom!",
    spoken: "After Mass, I thanked Father Tom.",
  },
  {
    sentence: "Mom and i sang to baby jesus.",
    fixedSentence: "Mom and I sang to baby Jesus.",
    tokens: [{ text: "Mom", cap: false }, { text: "and", cap: false }, { text: "i", cap: true, fixed: "I" }, { text: "sang", cap: false }, { text: "to", cap: false }, { text: "baby", cap: false }, { text: "jesus.", cap: true, fixed: "Jesus." }],
    hint: "The word \"I\" is always a capital, and so is the name Jesus!",
    spoken: "Mom and I sang to baby Jesus.",
  },
  {
    sentence: "Today i went to the zoo with maya.",
    fixedSentence: "Today I went to the zoo with Maya.",
    tokens: [
      { text: "Today", cap: false }, { text: "i", cap: true, fixed: "I" }, { text: "went", cap: false },
      { text: "to", cap: false }, { text: "the", cap: false }, { text: "zoo", cap: false },
      { text: "with", cap: false }, { text: "maya.", cap: true, fixed: "Maya." },
    ],
    hint: 'Capitalize the word "I" and people\'s names like "Maya"!',
    spoken: "Today I went to the zoo with Maya.",
  },
  {
    sentence: "Can leo and i play with spot?",
    fixedSentence: "Can Leo and I play with Spot?",
    tokens: [
      { text: "Can", cap: false }, { text: "leo", cap: true, fixed: "Leo" }, { text: "and", cap: false },
      { text: "i", cap: true, fixed: "I" }, { text: "play", cap: false }, { text: "with", cap: false },
      { text: "spot?", cap: true, fixed: "Spot?" },
    ],
    hint: 'Capitalize the names "Leo" and "Spot", plus the word "I"!',
    spoken: "Can Leo and I play with Spot?",
  },
  {
    sentence: "Yesterday ben and i ate pizza.",
    fixedSentence: "Yesterday Ben and I ate pizza.",
    tokens: [
      { text: "Yesterday", cap: false }, { text: "ben", cap: true, fixed: "Ben" }, { text: "and", cap: false },
      { text: "i", cap: true, fixed: "I" }, { text: "ate", cap: false }, { text: "pizza.", cap: false },
    ],
    hint: 'Names like "Ben" and the word "I" must be uppercase!',
    spoken: "Yesterday Ben and I ate pizza.",
  },
  {
    sentence: "sam said that i am a great friend.",
    fixedSentence: "Sam said that I am a great friend.",
    tokens: [
      { text: "sam", cap: true, fixed: "Sam" }, { text: "said", cap: false }, { text: "that", cap: false },
      { text: "i", cap: true, fixed: "I" }, { text: "am", cap: false }, { text: "a", cap: false },
      { text: "great", cap: false }, { text: "friend.", cap: false },
    ],
    hint: 'Capitalize "Sam" and "I"!',
    spoken: "Sam said that I am a great friend.",
  },
  {
    sentence: "My dog buster and i ran in the park.",
    fixedSentence: "My dog Buster and I ran in the park.",
    tokens: [
      { text: "My", cap: false }, { text: "dog", cap: false }, { text: "buster", cap: true, fixed: "Buster" },
      { text: "and", cap: false }, { text: "i", cap: true, fixed: "I" }, { text: "ran", cap: false },
      { text: "in", cap: false }, { text: "the", cap: false }, { text: "park.", cap: false },
    ],
    hint: 'Pet names like "Buster" and the word "I" need capitals!',
    spoken: "My dog Buster and I ran in the park.",
  },
  {
    sentence: "Did emma tell you that i can whistle?",
    fixedSentence: "Did Emma tell you that I can whistle?",
    tokens: [
      { text: "Did", cap: false }, { text: "emma", cap: true, fixed: "Emma" }, { text: "tell", cap: false },
      { text: "you", cap: false }, { text: "that", cap: false }, { text: "i", cap: true, fixed: "I" },
      { text: "can", cap: false }, { text: "whistle?", cap: false },
    ],
    hint: 'Capitalize "Emma" and "I"!',
    spoken: "Did Emma tell you that I can whistle?",
  },
  {
    sentence: "Soon liam and i will visit grandma.",
    fixedSentence: "Soon Liam and I will visit Grandma.",
    tokens: [
      { text: "Soon", cap: false }, { text: "liam", cap: true, fixed: "Liam" }, { text: "and", cap: false },
      { text: "i", cap: true, fixed: "I" }, { text: "will", cap: false }, { text: "visit", cap: false },
      { text: "grandma.", cap: true, fixed: "Grandma." },
    ],
    hint: 'Capitalize "Liam", "I", and "Grandma"!',
    spoken: "Soon Liam and I will visit Grandma.",
  },
  {
    sentence: "Here is the picture that chloe and i drew.",
    fixedSentence: "Here is the picture that Chloe and I drew.",
    tokens: [
      { text: "Here", cap: false }, { text: "is", cap: false }, { text: "the", cap: false },
      { text: "picture", cap: false }, { text: "that", cap: false }, { text: "chloe", cap: true, fixed: "Chloe" },
      { text: "and", cap: false }, { text: "i", cap: true, fixed: "I" }, { text: "drew.", cap: false },
    ],
    hint: 'Capitalize "Chloe" and "I"!',
    spoken: "Here is the picture that Chloe and I drew.",
  },
  {
    sentence: "My cat whiskers sleeps when i read.",
    fixedSentence: "My cat Whiskers sleeps when I read.",
    tokens: [
      { text: "My", cap: false }, { text: "cat", cap: false }, { text: "whiskers", cap: true, fixed: "Whiskers" },
      { text: "sleeps", cap: false }, { text: "when", cap: false }, { text: "i", cap: true, fixed: "I" },
      { text: "read.", cap: false },
    ],
    hint: 'Capitalize the pet name "Whiskers" and the word "I"!',
    spoken: "My cat Whiskers sleeps when I read.",
  },
  {
    sentence: "Wait for noah and me so i can come!",
    fixedSentence: "Wait for Noah and me so I can come!",
    tokens: [
      { text: "Wait", cap: false }, { text: "for", cap: false }, { text: "noah", cap: true, fixed: "Noah" },
      { text: "and", cap: false }, { text: "me", cap: false }, { text: "so", cap: false },
      { text: "i", cap: true, fixed: "I" }, { text: "can", cap: false }, { text: "come!", cap: false },
    ],
    hint: 'Capitalize "Noah" and "I"!',
    spoken: "Wait for Noah and me so I can come!",
  },
];

/** Dedicated Montessori Classifier Banks — every sentence is guaranteed to contain the target part of speech! */
const BANK_POS_NOUN = [
  { sentence: "The choir sang sweetly.", words: [{ word: "The", pos: "article" }, { word: "choir", pos: "noun" }, { word: "sang", pos: "verb" }, { word: "sweetly.", pos: "adverb" }], spoken: "The choir sang sweetly." },
  { sentence: "Our priest blessed the baby.", words: [{ word: "Our", pos: "pronoun" }, { word: "priest", pos: "noun" }, { word: "blessed", pos: "verb" }, { word: "the", pos: "article" }, { word: "baby.", pos: "noun" }], spoken: "Our priest blessed the baby." },
  { sentence: "The happy puppy ran fast.", words: [{ word: "The", pos: "article" }, { word: "happy", pos: "adjective" }, { word: "puppy", pos: "noun" }, { word: "ran", pos: "verb" }, { word: "fast.", pos: "adverb" }], spoken: "The happy puppy ran fast." },
  { sentence: "A green frog hopped.", words: [{ word: "A", pos: "article" }, { word: "green", pos: "adjective" }, { word: "frog", pos: "noun" }, { word: "hopped.", pos: "verb" }], spoken: "A green frog hopped." },
  { sentence: "She baked sweet cookies.", words: [{ word: "She", pos: "pronoun" }, { word: "baked", pos: "verb" }, { word: "sweet", pos: "adjective" }, { word: "cookies.", pos: "noun" }], spoken: "She baked sweet cookies." },
  { sentence: "The shiny rocket flew high.", words: [{ word: "The", pos: "article" }, { word: "shiny", pos: "adjective" }, { word: "rocket", pos: "noun" }, { word: "flew", pos: "verb" }, { word: "high.", pos: "adverb" }], spoken: "The shiny rocket flew high." },
  { sentence: "My little sister laughed loudly.", words: [{ word: "My", pos: "pronoun" }, { word: "little", pos: "adjective" }, { word: "sister", pos: "noun" }, { word: "laughed", pos: "verb" }, { word: "loudly.", pos: "adverb" }], spoken: "My little sister laughed loudly." },
  { sentence: "Two yellow ducks swam.", words: [{ word: "Two", pos: "adjective" }, { word: "yellow", pos: "adjective" }, { word: "ducks", pos: "noun" }, { word: "swam.", pos: "verb" }], spoken: "Two yellow ducks swam." },
  { sentence: "He kicked the red ball.", words: [{ word: "He", pos: "pronoun" }, { word: "kicked", pos: "verb" }, { word: "the", pos: "article" }, { word: "red", pos: "adjective" }, { word: "ball.", pos: "noun" }], spoken: "He kicked the red ball." },
  { sentence: "A playful monkey climbed up.", words: [{ word: "A", pos: "article" }, { word: "playful", pos: "adjective" }, { word: "monkey", pos: "noun" }, { word: "climbed", pos: "verb" }, { word: "up.", pos: "adverb" }], spoken: "A playful monkey climbed up." },
  { sentence: "The warm sun shines brightly.", words: [{ word: "The", pos: "article" }, { word: "warm", pos: "adjective" }, { word: "sun", pos: "noun" }, { word: "shines", pos: "verb" }, { word: "brightly.", pos: "adverb" }], spoken: "The warm sun shines brightly." },
  { sentence: "We ate crunchy apples.", words: [{ word: "We", pos: "pronoun" }, { word: "ate", pos: "verb" }, { word: "crunchy", pos: "adjective" }, { word: "apples.", pos: "noun" }], spoken: "We ate crunchy apples." },
  { sentence: "The tall turtle walked slowly.", words: [{ word: "The", pos: "article" }, { word: "tall", pos: "adjective" }, { word: "turtle", pos: "noun" }, { word: "walked", pos: "verb" }, { word: "slowly.", pos: "adverb" }], spoken: "The tall turtle walked slowly." },
  { sentence: "They built a sandy castle.", words: [{ word: "They", pos: "pronoun" }, { word: "built", pos: "verb" }, { word: "a", pos: "article" }, { word: "sandy", pos: "adjective" }, { word: "castle.", pos: "noun" }], spoken: "They built a sandy castle." },
];

const BANK_POS_VERB = [
  { sentence: "Grandpa lit the candle.", words: [{ word: "Grandpa", pos: "noun" }, { word: "lit", pos: "verb" }, { word: "the", pos: "article" }, { word: "candle.", pos: "noun" }], spoken: "Grandpa lit the candle." },
  { sentence: "The bells rang loudly.", words: [{ word: "The", pos: "article" }, { word: "bells", pos: "noun" }, { word: "rang", pos: "verb" }, { word: "loudly.", pos: "adverb" }], spoken: "The bells rang loudly." },
  { sentence: "The happy puppy jumped high.", words: [{ word: "The", pos: "article" }, { word: "happy", pos: "adjective" }, { word: "puppy", pos: "noun" }, { word: "jumped", pos: "verb" }, { word: "high.", pos: "adverb" }], spoken: "The happy puppy jumped high." },
  { sentence: "A little bird sang sweetly.", words: [{ word: "A", pos: "article" }, { word: "little", pos: "adjective" }, { word: "bird", pos: "noun" }, { word: "sang", pos: "verb" }, { word: "sweetly.", pos: "adverb" }], spoken: "A little bird sang sweetly." },
  { sentence: "The clever fox dashed away.", words: [{ word: "The", pos: "article" }, { word: "clever", pos: "adjective" }, { word: "fox", pos: "noun" }, { word: "dashed", pos: "verb" }, { word: "away.", pos: "adverb" }], spoken: "The clever fox dashed away." },
  { sentence: "Three dolphins swam fast.", words: [{ word: "Three", pos: "adjective" }, { word: "dolphins", pos: "noun" }, { word: "swam", pos: "verb" }, { word: "fast.", pos: "adverb" }], spoken: "Three dolphins swam fast." },
  { sentence: "Maya painted a bright rainbow.", words: [{ word: "Maya", pos: "noun" }, { word: "painted", pos: "verb" }, { word: "a", pos: "article" }, { word: "bright", pos: "adjective" }, { word: "rainbow.", pos: "noun" }], spoken: "Maya painted a bright rainbow." },
  { sentence: "The fluffy kitten slept quietly.", words: [{ word: "The", pos: "article" }, { word: "fluffy", pos: "adjective" }, { word: "kitten", pos: "noun" }, { word: "slept", pos: "verb" }, { word: "quietly.", pos: "adverb" }], spoken: "The fluffy kitten slept quietly." },
  { sentence: "Leo climbed the tall tree.", words: [{ word: "Leo", pos: "noun" }, { word: "climbed", pos: "verb" }, { word: "the", pos: "article" }, { word: "tall", pos: "adjective" }, { word: "tree.", pos: "noun" }], spoken: "Leo climbed the tall tree." },
  { sentence: "Our friendly dog barked loudly.", words: [{ word: "Our", pos: "pronoun" }, { word: "friendly", pos: "adjective" }, { word: "dog", pos: "noun" }, { word: "barked", pos: "verb" }, { word: "loudly.", pos: "adverb" }], spoken: "Our friendly dog barked loudly." },
  { sentence: "The gold stars twinkled above.", words: [{ word: "The", pos: "article" }, { word: "gold", pos: "adjective" }, { word: "stars", pos: "noun" }, { word: "twinkled", pos: "verb" }, { word: "above.", pos: "adverb" }], spoken: "The gold stars twinkled above." },
  { sentence: "Grandma baked warm bread.", words: [{ word: "Grandma", pos: "noun" }, { word: "baked", pos: "verb" }, { word: "warm", pos: "adjective" }, { word: "bread.", pos: "noun" }], spoken: "Grandma baked warm bread." },
  { sentence: "The green frog hopped far.", words: [{ word: "The", pos: "article" }, { word: "green", pos: "adjective" }, { word: "frog", pos: "noun" }, { word: "hopped", pos: "verb" }, { word: "far.", pos: "adverb" }], spoken: "The green frog hopped far." },
  { sentence: "Children danced at the party.", words: [{ word: "Children", pos: "noun" }, { word: "danced", pos: "verb" }, { word: "at", pos: "preposition" }, { word: "the", pos: "article" }, { word: "party.", pos: "noun" }], spoken: "Children danced at the party." },
];

const BANK_POS_ADJECTIVE = [
  { sentence: "The tall candle glowed.", words: [{ word: "The", pos: "article" }, { word: "tall", pos: "adjective" }, { word: "candle", pos: "noun" }, { word: "glowed.", pos: "verb" }], spoken: "The tall candle glowed." },
  { sentence: "A gentle angel smiled.", words: [{ word: "A", pos: "article" }, { word: "gentle", pos: "adjective" }, { word: "angel", pos: "noun" }, { word: "smiled.", pos: "verb" }], spoken: "A gentle angel smiled." },
  { sentence: "The fluffy kitten slept.", words: [{ word: "The", pos: "article" }, { word: "fluffy", pos: "adjective" }, { word: "kitten", pos: "noun" }, { word: "slept.", pos: "verb" }], spoken: "The fluffy kitten slept." },
  { sentence: "I ate a crunchy apple.", words: [{ word: "I", pos: "pronoun" }, { word: "ate", pos: "verb" }, { word: "a", pos: "article" }, { word: "crunchy", pos: "adjective" }, { word: "apple.", pos: "noun" }], spoken: "I ate a crunchy apple." },
  { sentence: "A shiny rocket flew up.", words: [{ word: "A", pos: "article" }, { word: "shiny", pos: "adjective" }, { word: "rocket", pos: "noun" }, { word: "flew", pos: "verb" }, { word: "up.", pos: "adverb" }], spoken: "A shiny rocket flew up." },
  { sentence: "She wore a yellow hat.", words: [{ word: "She", pos: "pronoun" }, { word: "wore", pos: "verb" }, { word: "a", pos: "article" }, { word: "yellow", pos: "adjective" }, { word: "hat.", pos: "noun" }], spoken: "She wore a yellow hat." },
  { sentence: "The brave firefighter helped us.", words: [{ word: "The", pos: "article" }, { word: "brave", pos: "adjective" }, { word: "firefighter", pos: "noun" }, { word: "helped", pos: "verb" }, { word: "us.", pos: "pronoun" }], spoken: "The brave firefighter helped us." },
  { sentence: "We swam in cold water.", words: [{ word: "We", pos: "pronoun" }, { word: "swam", pos: "verb" }, { word: "in", pos: "preposition" }, { word: "cold", pos: "adjective" }, { word: "water.", pos: "noun" }], spoken: "We swam in cold water." },
  { sentence: "He found a tiny bug.", words: [{ word: "He", pos: "pronoun" }, { word: "found", pos: "verb" }, { word: "a", pos: "article" }, { word: "tiny", pos: "adjective" }, { word: "bug.", pos: "noun" }], spoken: "He found a tiny bug." },
  { sentence: "The tall giraffe ate leaves.", words: [{ word: "The", pos: "article" }, { word: "tall", pos: "adjective" }, { word: "giraffe", pos: "noun" }, { word: "ate", pos: "verb" }, { word: "leaves.", pos: "noun" }], spoken: "The tall giraffe ate leaves." },
  { sentence: "A friendly dolphin jumped high.", words: [{ word: "A", pos: "article" }, { word: "friendly", pos: "adjective" }, { word: "dolphin", pos: "noun" }, { word: "jumped", pos: "verb" }, { word: "high.", pos: "adverb" }], spoken: "A friendly dolphin jumped high." },
  { sentence: "They shared sweet strawberries.", words: [{ word: "They", pos: "pronoun" }, { word: "shared", pos: "verb" }, { word: "sweet", pos: "adjective" }, { word: "strawberries.", pos: "noun" }], spoken: "They shared sweet strawberries." },
  { sentence: "The purple balloon floated away.", words: [{ word: "The", pos: "article" }, { word: "purple", pos: "adjective" }, { word: "balloon", pos: "noun" }, { word: "floated", pos: "verb" }, { word: "away.", pos: "adverb" }], spoken: "The purple balloon floated away." },
  { sentence: "My soft pillow feels cozy.", words: [{ word: "My", pos: "pronoun" }, { word: "soft", pos: "adjective" }, { word: "pillow", pos: "noun" }, { word: "feels", pos: "verb" }, { word: "cozy.", pos: "adjective" }], spoken: "My soft pillow feels cozy." },
];

const BANK_POS_PRONOUN = [
  { sentence: "We visited the church.", words: [{ word: "We", pos: "pronoun" }, { word: "visited", pos: "verb" }, { word: "the", pos: "article" }, { word: "church.", pos: "noun" }], spoken: "We visited the church." },
  { sentence: "She baked delicious cookies.", words: [{ word: "She", pos: "pronoun" }, { word: "baked", pos: "verb" }, { word: "delicious", pos: "adjective" }, { word: "cookies.", pos: "noun" }], spoken: "She baked delicious cookies." },
  { sentence: "They played under the tree.", words: [{ word: "They", pos: "pronoun" }, { word: "played", pos: "verb" }, { word: "under", pos: "preposition" }, { word: "the", pos: "article" }, { word: "tree.", pos: "noun" }], spoken: "They played under the tree." },
  { sentence: "He rode a blue scooter.", words: [{ word: "He", pos: "pronoun" }, { word: "rode", pos: "verb" }, { word: "a", pos: "article" }, { word: "blue", pos: "adjective" }, { word: "scooter.", pos: "noun" }], spoken: "He rode a blue scooter." },
  { sentence: "We built a giant snowman.", words: [{ word: "We", pos: "pronoun" }, { word: "built", pos: "verb" }, { word: "a", pos: "article" }, { word: "giant", pos: "adjective" }, { word: "snowman.", pos: "noun" }], spoken: "We built a giant snowman." },
  { sentence: "I love reading funny books.", words: [{ word: "I", pos: "pronoun" }, { word: "love", pos: "verb" }, { word: "reading", pos: "verb" }, { word: "funny", pos: "adjective" }, { word: "books.", pos: "noun" }], spoken: "I love reading funny books." },
  { sentence: "You drew a wonderful picture.", words: [{ word: "You", pos: "pronoun" }, { word: "drew", pos: "verb" }, { word: "a", pos: "article" }, { word: "wonderful", pos: "adjective" }, { word: "picture.", pos: "noun" }], spoken: "You drew a wonderful picture." },
  { sentence: "It hopped into the pond.", words: [{ word: "It", pos: "pronoun" }, { word: "hopped", pos: "verb" }, { word: "into", pos: "preposition" }, { word: "the", pos: "article" }, { word: "pond.", pos: "noun" }], spoken: "It hopped into the pond." },
  { sentence: "Grandma made lunch for us.", words: [{ word: "Grandma", pos: "noun" }, { word: "made", pos: "verb" }, { word: "lunch", pos: "noun" }, { word: "for", pos: "preposition" }, { word: "us.", pos: "pronoun" }], spoken: "Grandma made lunch for us." },
  { sentence: "The puppy followed him home.", words: [{ word: "The", pos: "article" }, { word: "puppy", pos: "noun" }, { word: "followed", pos: "verb" }, { word: "him", pos: "pronoun" }, { word: "home.", pos: "noun" }], spoken: "The puppy followed him home." },
  { sentence: "Maya gave her a flower.", words: [{ word: "Maya", pos: "noun" }, { word: "gave", pos: "verb" }, { word: "her", pos: "pronoun" }, { word: "a", pos: "article" }, { word: "flower.", pos: "noun" }], spoken: "Maya gave her a flower." },
  { sentence: "Sam waved at them happily.", words: [{ word: "Sam", pos: "noun" }, { word: "waved", pos: "verb" }, { word: "at", pos: "preposition" }, { word: "them", pos: "pronoun" }, { word: "happily.", pos: "adverb" }], spoken: "Sam waved at them happily." },
  { sentence: "Leo helped me carry boxes.", words: [{ word: "Leo", pos: "noun" }, { word: "helped", pos: "verb" }, { word: "me", pos: "pronoun" }, { word: "carry", pos: "verb" }, { word: "boxes.", pos: "noun" }], spoken: "Leo helped me carry boxes." },
];

const BANK_POS_ADVERB = [
  { sentence: "The choir sang joyfully.", words: [{ word: "The", pos: "article" }, { word: "choir", pos: "noun" }, { word: "sang", pos: "verb" }, { word: "joyfully.", pos: "adverb" }], spoken: "The choir sang joyfully." },
  { sentence: "The happy puppy ran quickly.", words: [{ word: "The", pos: "article" }, { word: "happy", pos: "adjective" }, { word: "puppy", pos: "noun" }, { word: "ran", pos: "verb" }, { word: "quickly.", pos: "adverb" }], spoken: "The happy puppy ran quickly." },
  { sentence: "He spoke softly to the baby.", words: [{ word: "He", pos: "pronoun" }, { word: "spoke", pos: "verb" }, { word: "softly", pos: "adverb" }, { word: "to", pos: "preposition" }, { word: "the", pos: "article" }, { word: "baby.", pos: "noun" }], spoken: "He spoke softly to the baby." },
  { sentence: "The lion roared loudly.", words: [{ word: "The", pos: "article" }, { word: "lion", pos: "noun" }, { word: "roared", pos: "verb" }, { word: "loudly.", pos: "adverb" }], spoken: "The lion roared loudly." },
  { sentence: "A green turtle walked slowly.", words: [{ word: "A", pos: "article" }, { word: "green", pos: "adjective" }, { word: "turtle", pos: "noun" }, { word: "walked", pos: "verb" }, { word: "slowly.", pos: "adverb" }], spoken: "A green turtle walked slowly." },
  { sentence: "Bright stars shone brightly.", words: [{ word: "Bright", pos: "adjective" }, { word: "stars", pos: "noun" }, { word: "shone", pos: "verb" }, { word: "brightly.", pos: "adverb" }], spoken: "Bright stars shone brightly." },
  { sentence: "The children played happily.", words: [{ word: "The", pos: "article" }, { word: "children", pos: "noun" }, { word: "played", pos: "verb" }, { word: "happily.", pos: "adverb" }], spoken: "The children played happily." },
  { sentence: "Maya painted carefully on paper.", words: [{ word: "Maya", pos: "noun" }, { word: "painted", pos: "verb" }, { word: "carefully", pos: "adverb" }, { word: "on", pos: "preposition" }, { word: "paper.", pos: "noun" }], spoken: "Maya painted carefully on paper." },
  { sentence: "The kitten purred quietly.", words: [{ word: "The", pos: "article" }, { word: "kitten", pos: "noun" }, { word: "purred", pos: "verb" }, { word: "quietly.", pos: "adverb" }], spoken: "The kitten purred quietly." },
  { sentence: "She smiled warmly at Grandma.", words: [{ word: "She", pos: "pronoun" }, { word: "smiled", pos: "verb" }, { word: "warmly", pos: "adverb" }, { word: "at", pos: "preposition" }, { word: "Grandma.", pos: "noun" }], spoken: "She smiled warmly at Grandma." },
  { sentence: "The robin sang sweetly.", words: [{ word: "The", pos: "article" }, { word: "robin", pos: "noun" }, { word: "sang", pos: "verb" }, { word: "sweetly.", pos: "adverb" }], spoken: "The robin sang sweetly." },
  { sentence: "Snowflakes fell gently.", words: [{ word: "Snowflakes", pos: "noun" }, { word: "fell", pos: "verb" }, { word: "gently.", pos: "adverb" }], spoken: "Snowflakes fell gently." },
  { sentence: "The knight fought bravely.", words: [{ word: "The", pos: "article" }, { word: "knight", pos: "noun" }, { word: "fought", pos: "verb" }, { word: "bravely.", pos: "adverb" }], spoken: "The knight fought bravely." },
];

const BANK_POS_PREPOSITION = [
  { sentence: "We knelt beside the manger.", words: [{ word: "We", pos: "pronoun" }, { word: "knelt", pos: "verb" }, { word: "beside", pos: "preposition" }, { word: "the", pos: "article" }, { word: "manger.", pos: "noun" }], spoken: "We knelt beside the manger." },
  { sentence: "A bird sang in the tree.", words: [{ word: "A", pos: "article" }, { word: "bird", pos: "noun" }, { word: "sang", pos: "verb" }, { word: "in", pos: "preposition" }, { word: "the", pos: "article" }, { word: "tree.", pos: "noun" }], spoken: "A bird sang in the tree." },
  { sentence: "The puppy hid under the bed.", words: [{ word: "The", pos: "article" }, { word: "puppy", pos: "noun" }, { word: "hid", pos: "verb" }, { word: "under", pos: "preposition" }, { word: "the", pos: "article" }, { word: "bed.", pos: "noun" }], spoken: "The puppy hid under the bed." },
  { sentence: "Frogs jumped into the cool pond.", words: [{ word: "Frogs", pos: "noun" }, { word: "jumped", pos: "verb" }, { word: "into", pos: "preposition" }, { word: "the", pos: "article" }, { word: "cool", pos: "adjective" }, { word: "pond.", pos: "noun" }], spoken: "Frogs jumped into the cool pond." },
  { sentence: "The cat slept on the rug.", words: [{ word: "The", pos: "article" }, { word: "cat", pos: "noun" }, { word: "slept", pos: "verb" }, { word: "on", pos: "preposition" }, { word: "the", pos: "article" }, { word: "rug.", pos: "noun" }], spoken: "The cat slept on the rug." },
  { sentence: "Dolphins leaped over the waves.", words: [{ word: "Dolphins", pos: "noun" }, { word: "leaped", pos: "verb" }, { word: "over", pos: "preposition" }, { word: "the", pos: "article" }, { word: "waves.", pos: "noun" }], spoken: "Dolphins leaped over the waves." },
  { sentence: "Leo sat between his friends.", words: [{ word: "Leo", pos: "noun" }, { word: "sat", pos: "verb" }, { word: "between", pos: "preposition" }, { word: "his", pos: "pronoun" }, { word: "friends.", pos: "noun" }], spoken: "Leo sat between his friends." },
  { sentence: "The rocket flew through space.", words: [{ word: "The", pos: "article" }, { word: "rocket", pos: "noun" }, { word: "flew", pos: "verb" }, { word: "through", pos: "preposition" }, { word: "space.", pos: "noun" }], spoken: "The rocket flew through space." },
  { sentence: "Squirrels ran across the yard.", words: [{ word: "Squirrels", pos: "noun" }, { word: "ran", pos: "verb" }, { word: "across", pos: "preposition" }, { word: "the", pos: "article" }, { word: "yard.", pos: "noun" }], spoken: "Squirrels ran across the yard." },
  { sentence: "She stood beside the red car.", words: [{ word: "She", pos: "pronoun" }, { word: "stood", pos: "verb" }, { word: "beside", pos: "preposition" }, { word: "the", pos: "article" }, { word: "red", pos: "adjective" }, { word: "car.", pos: "noun" }], spoken: "She stood beside the red car." },
  { sentence: "The moon shone above the clouds.", words: [{ word: "The", pos: "article" }, { word: "moon", pos: "noun" }, { word: "shone", pos: "verb" }, { word: "above", pos: "preposition" }, { word: "the", pos: "article" }, { word: "clouds.", pos: "noun" }], spoken: "The moon shone above the clouds." },
  { sentence: "He walked behind the barn.", words: [{ word: "He", pos: "pronoun" }, { word: "walked", pos: "verb" }, { word: "behind", pos: "preposition" }, { word: "the", pos: "article" }, { word: "barn.", pos: "noun" }], spoken: "He walked behind the barn." },
  { sentence: "We camped near the river.", words: [{ word: "We", pos: "pronoun" }, { word: "camped", pos: "verb" }, { word: "near", pos: "preposition" }, { word: "the", pos: "article" }, { word: "river.", pos: "noun" }], spoken: "We camped near the river." },
];

const BANK_POS_CONJUNCTION = [
  { sentence: "We prayed and sang.", words: [{ word: "We", pos: "pronoun" }, { word: "prayed", pos: "verb" }, { word: "and", pos: "conjunction" }, { word: "sang.", pos: "verb" }], spoken: "We prayed and sang." },
  { sentence: "They swam and played outside.", words: [{ word: "They", pos: "pronoun" }, { word: "swam", pos: "verb" }, { word: "and", pos: "conjunction" }, { word: "played", pos: "verb" }, { word: "outside.", pos: "adverb" }], spoken: "They swam and played outside." },
  { sentence: "He whispered because the baby slept.", words: [{ word: "He", pos: "pronoun" }, { word: "whispered", pos: "verb" }, { word: "because", pos: "conjunction" }, { word: "the", pos: "article" }, { word: "baby", pos: "noun" }, { word: "slept.", pos: "verb" }], spoken: "He whispered because the baby slept." },
  { sentence: "I wanted cake, but it vanished.", words: [{ word: "I", pos: "pronoun" }, { word: "wanted", pos: "verb" }, { word: "cake,", pos: "noun" }, { word: "but", pos: "conjunction" }, { word: "it", pos: "pronoun" }, { word: "vanished.", pos: "verb" }], spoken: "I wanted cake, but it vanished." },
  { sentence: "Do you want milk or juice?", words: [{ word: "Do", pos: "verb" }, { word: "you", pos: "pronoun" }, { word: "want", pos: "verb" }, { word: "milk", pos: "noun" }, { word: "or", pos: "conjunction" }, { word: "juice?", pos: "noun" }], spoken: "Do you want milk or juice?" },
  { sentence: "It rained, so we stayed home.", words: [{ word: "It", pos: "pronoun" }, { word: "rained,", pos: "verb" }, { word: "so", pos: "conjunction" }, { word: "we", pos: "pronoun" }, { word: "stayed", pos: "verb" }, { word: "home.", pos: "noun" }], spoken: "It rained, so we stayed home." },
  { sentence: "Maya sang while Leo played drums.", words: [{ word: "Maya", pos: "noun" }, { word: "sang", pos: "verb" }, { word: "while", pos: "conjunction" }, { word: "Leo", pos: "noun" }, { word: "played", pos: "verb" }, { word: "drums.", pos: "noun" }], spoken: "Maya sang while Leo played drums." },
  { sentence: "Wash your hands before you eat.", words: [{ word: "Wash", pos: "verb" }, { word: "your", pos: "pronoun" }, { word: "hands", pos: "noun" }, { word: "before", pos: "conjunction" }, { word: "you", pos: "pronoun" }, { word: "eat.", pos: "verb" }], spoken: "Wash your hands before you eat." },
  { sentence: "We cheered after our team won.", words: [{ word: "We", pos: "pronoun" }, { word: "cheered", pos: "verb" }, { word: "after", pos: "conjunction" }, { word: "our", pos: "pronoun" }, { word: "team", pos: "noun" }, { word: "won.", pos: "verb" }], spoken: "We cheered after our team won." },
  { sentence: "Frogs hop and turtles crawl.", words: [{ word: "Frogs", pos: "noun" }, { word: "hop", pos: "verb" }, { word: "and", pos: "conjunction" }, { word: "turtles", pos: "noun" }, { word: "crawl.", pos: "verb" }], spoken: "Frogs hop and turtles crawl." },
  { sentence: "She smiled because she won.", words: [{ word: "She", pos: "pronoun" }, { word: "smiled", pos: "verb" }, { word: "because", pos: "conjunction" }, { word: "she", pos: "pronoun" }, { word: "won.", pos: "verb" }], spoken: "She smiled because she won." },
];

const BANK_CLASSIFY = [
  { sentence: "The kind priest smiled warmly.", words: [{ word: "The", pos: "article" }, { word: "kind", pos: "adjective" }, { word: "priest", pos: "noun" }, { word: "smiled", pos: "verb" }, { word: "warmly.", pos: "adverb" }], spoken: "The kind priest smiled warmly." },
  { sentence: "The happy puppy ran quickly.", words: [{ word: "The", pos: "article" }, { word: "happy", pos: "adjective" }, { word: "puppy", pos: "noun" }, { word: "ran", pos: "verb" }, { word: "quickly.", pos: "adverb" }], spoken: "The happy puppy ran quickly." },
  { sentence: "A little bird sang in the tree.", words: [{ word: "A", pos: "article" }, { word: "little", pos: "adjective" }, { word: "bird", pos: "noun" }, { word: "sang", pos: "verb" }, { word: "in", pos: "preposition" }, { word: "the", pos: "article" }, { word: "tree.", pos: "noun" }], spoken: "A little bird sang in the tree." },
  { sentence: "She baked sweet cookies for us.", words: [{ word: "She", pos: "pronoun" }, { word: "baked", pos: "verb" }, { word: "sweet", pos: "adjective" }, { word: "cookies", pos: "noun" }, { word: "for", pos: "preposition" }, { word: "us.", pos: "pronoun" }], spoken: "She baked sweet cookies for us." },
  { sentence: "They swam and played outside.", words: [{ word: "They", pos: "pronoun" }, { word: "swam", pos: "verb" }, { word: "and", pos: "conjunction" }, { word: "played", pos: "verb" }, { word: "outside.", pos: "adverb" }], spoken: "They swam and played outside." },
  { sentence: "The shiny rocket flew into space.", words: [{ word: "The", pos: "article" }, { word: "shiny", pos: "adjective" }, { word: "rocket", pos: "noun" }, { word: "flew", pos: "verb" }, { word: "into", pos: "preposition" }, { word: "space.", pos: "noun" }], spoken: "The shiny rocket flew into space." },
  { sentence: "He spoke softly because the baby slept.", words: [{ word: "He", pos: "pronoun" }, { word: "spoke", pos: "verb" }, { word: "softly", pos: "adverb" }, { word: "because", pos: "conjunction" }, { word: "the", pos: "article" }, { word: "baby", pos: "noun" }, { word: "slept.", pos: "verb" }], spoken: "He spoke softly because the baby slept." },
  { sentence: "Two green frogs hopped over the log.", words: [{ word: "Two", pos: "adjective" }, { word: "green", pos: "adjective" }, { word: "frogs", pos: "noun" }, { word: "hopped", pos: "verb" }, { word: "over", pos: "preposition" }, { word: "the", pos: "article" }, { word: "log.", pos: "noun" }], spoken: "Two green frogs hopped over the log." },
  { sentence: "We cheered loudly after our team won.", words: [{ word: "We", pos: "pronoun" }, { word: "cheered", pos: "verb" }, { word: "loudly", pos: "adverb" }, { word: "after", pos: "conjunction" }, { word: "our", pos: "pronoun" }, { word: "team", pos: "noun" }, { word: "won.", pos: "verb" }], spoken: "We cheered loudly after our team won." },
  { sentence: "The clever fox dashed under the fence.", words: [{ word: "The", pos: "article" }, { word: "clever", pos: "adjective" }, { word: "fox", pos: "noun" }, { word: "dashed", pos: "verb" }, { word: "under", pos: "preposition" }, { word: "the", pos: "article" }, { word: "fence.", pos: "noun" }], spoken: "The clever fox dashed under the fence." },
  { sentence: "Maya painted carefully while Leo sang.", words: [{ word: "Maya", pos: "noun" }, { word: "painted", pos: "verb" }, { word: "carefully", pos: "adverb" }, { word: "while", pos: "conjunction" }, { word: "Leo", pos: "noun" }, { word: "sang.", pos: "verb" }], spoken: "Maya painted carefully while Leo sang." },
];

/** Grade 1 Plural Nouns (-s & -es): 12 varied sentences */
const BANK_G1_PLURALS = [
  { prompt: "We lit four Advent _____.", singular: "candle", correct: "candles", choices: ["candlees", "candle's", "candles"], hint: "Most words just add -s: candle → candles!", spoken: "We lit four Advent candles." },
  { prompt: "Families sat on the long church _____.", singular: "bench", correct: "benches", choices: ["benches", "benchies", "benchs"], hint: "Words ending in -ch add -es: bench → benches!", spoken: "Families sat on the long church benches." },
  { prompt: "I saw three cute _____ in the yard.", singular: "fox", correct: "foxes", choices: ["foxes", "foxs", "foxies"], hint: "Words ending in -x add -es: fox → foxes!", spoken: "I saw three cute foxes in the yard." },
  { prompt: "Maya put the wooden _____ on the shelf.", singular: "box", correct: "boxes", choices: ["boxes", "boxs", "boxx"], hint: "Box ends in -x, so add -es: boxes!", spoken: "Maya put the wooden boxes on the shelf." },
  { prompt: "Two friendly _____ wagged their tails.", singular: "dog", correct: "dogs", choices: ["dogs", "doges", "dog's"], hint: "Most nouns just add -s: dog → dogs.", spoken: "Two friendly dogs wagged their tails." },
  { prompt: "We packed five crunchy _____ for lunch.", singular: "sandwich", correct: "sandwiches", choices: ["sandwiches", "sandwichs", "sandwich"], hint: "Words ending in -ch add -es: sandwiches!", spoken: "We packed five crunchy sandwiches for lunch." },
  { prompt: "The yellow school _____ lined up outside.", singular: "bus", correct: "buses", choices: ["buses", "buss", "busses'"], hint: "Bus ends in -s, so add -es: buses!", spoken: "The yellow school buses lined up outside." },
  { prompt: "Birds built their nests in the green _____.", singular: "branch", correct: "branches", choices: ["branches", "branchs", "branchies"], hint: "Branch ends in -ch, so add -es: branches!", spoken: "Birds built their nests in the green branches." },
  { prompt: "Wash the dirty _____ in the sink.", singular: "dish", correct: "dishes", choices: ["dishes", "dishs", "dishies"], hint: "Dish ends in -sh, so add -es: dishes!", spoken: "Wash the dirty dishes in the sink." },
  { prompt: "Four shiny red _____ grew on the tree.", singular: "apple", correct: "apples", choices: ["apples", "applees", "apple's"], hint: "Apple just adds -s: apples!", spoken: "Four shiny red apples grew on the tree." },
  { prompt: "She painted with three small _____.", singular: "brush", correct: "brushes", choices: ["brushes", "brushs", "brushies"], hint: "Brush ends in -sh, so add -es: brushes!", spoken: "She painted with three small brushes." },
  { prompt: "We drank cold water from tall _____.", singular: "glass", correct: "glasses", choices: ["glasses", "glasss", "glassies"], hint: "Glass ends in -ss, so add -es: glasses!", spoken: "We drank cold water from tall glasses." },
  { prompt: "Six colorful _____ floated in the sky.", singular: "kite", correct: "kites", choices: ["kites", "kitees", "kite's"], hint: "Most nouns add -s: kite → kites!", spoken: "Six colorful kites floated in the sky." },
  { prompt: "The genie granted three magic _____.", singular: "wish", correct: " wishes".trim(), choices: ["wishes", "wishs", "wishies"], hint: "Wish ends in -sh, so add -es: wishes!", spoken: "The genie granted three magic wishes." },
];

/** Grade 2 Order Bank: 12 varied 5-6 word sentences */
const BANK_G2_ORDER = [
  { text: "Our family prays the rosary together.", words: ["Our", "family", "prays", "the", "rosary", "together."], scrambled: ["family", "Our", "rosary", "together.", "prays", "the"], spoken: "Our family prays the rosary together.", tags: ["pronoun", "noun", "verb", "article", "noun", "adverb"] },
  { text: "We sang carols on Christmas Eve.", words: ["We", "sang", "carols", "on", "Christmas", "Eve."], scrambled: ["carols", "on", "sang", "Christmas", "Eve.", "We"], spoken: "We sang carols on Christmas Eve.", tags: ["pronoun", "verb", "noun", "preposition", "noun", "noun"] },
  { text: "The clever fox dashed into the woods.", words: ["The", "clever", "fox", "dashed", "into", "the", "woods."], scrambled: ["clever", "the", "dashed", "fox", "woods.", "into", "The"], spoken: "The clever fox dashed into the woods.", tags: ["article", "adjective", "noun", "verb", "preposition", "article", "noun"] },
  { text: "Three happy dolphins jumped over the waves.", words: ["Three", "happy", "dolphins", "jumped", "over", "the", "waves."], scrambled: ["jumped", "dolphins", "the", "waves.", "Three", "happy", "over"], spoken: "Three happy dolphins jumped over the waves.", tags: ["adjective", "adjective", "noun", "verb", "preposition", "article", "noun"] },
  { text: "She baked delicious cookies for Grandma.", words: ["She", "baked", "delicious", "cookies", "for", "Grandma."], scrambled: ["baked", "cookies", "Grandma.", "for", "She", "delicious"], spoken: "She baked delicious cookies for Grandma.", tags: ["pronoun", "verb", "adjective", "noun", "preposition", "noun"] },
  { text: "Bright stars shine in the dark night.", words: ["Bright", "stars", "shine", "in", "the", "dark", "night."], scrambled: ["stars", "dark", "Bright", "night.", "shine", "in", "the"], spoken: "Bright stars shine in the dark night.", tags: ["adjective", "noun", "verb", "preposition", "article", "adjective", "noun"] },
  { text: "Our playful puppy ran very fast.", words: ["Our", "playful", "puppy", "ran", "very", "fast."], scrambled: ["puppy", "very", "ran", "Our", "fast.", "playful"], spoken: "Our playful puppy ran very fast.", tags: ["pronoun", "adjective", "noun", "verb", "adverb", "adverb"] },
  { text: "A tiny mouse hid under the rug.", words: ["A", "tiny", "mouse", "hid", "under", "the", "rug."], scrambled: ["under", "rug.", "hid", "mouse", "A", "tiny", "the"], spoken: "A tiny mouse hid under the rug.", tags: ["article", "adjective", "noun", "verb", "preposition", "article", "noun"] },
  { text: "The green frog leaped into the water.", words: ["The", "green", "frog", "leaped", "into", "the", "water."], scrambled: ["frog", "water.", "the", "green", "leaped", "into", "The"], spoken: "The green frog leaped into the water.", tags: ["article", "adjective", "noun", "verb", "preposition", "article", "noun"] },
  { text: "Maya painted a pretty yellow flower.", words: ["Maya", "painted", "a", "pretty", "yellow", "flower."], scrambled: ["flower.", "a", "Maya", "yellow", "painted", "pretty"], spoken: "Maya painted a pretty yellow flower.", tags: ["noun", "verb", "article", "adjective", "adjective", "noun"] },
  { text: "Two fluffy kittens slept on pillows.", words: ["Two", "fluffy", "kittens", "slept", "on", "pillows."], scrambled: ["pillows.", "kittens", "Two", "on", "fluffy", "slept"], spoken: "Two fluffy kittens slept on pillows.", tags: ["adjective", "adjective", "noun", "verb", "preposition", "noun"] },
  { text: "He rode his shiny blue bike.", words: ["He", "rode", "his", "shiny", "blue", "bike."], scrambled: ["bike.", "his", "He", "blue", "rode", "shiny"], spoken: "He rode his shiny blue bike.", tags: ["pronoun", "verb", "pronoun", "adjective", "adjective", "noun"] },
  { text: "Warm rain fell on green grass.", words: ["Warm", "rain", "fell", "on", "green", "grass."], scrambled: ["grass.", "fell", "Warm", "green", "rain", "on"], spoken: "Warm rain fell on green grass.", tags: ["adjective", "noun", "verb", "preposition", "adjective", "noun"] },
  { text: "We found smooth shells near the ocean.", words: ["We", "found", "smooth", "shells", "near", "the", "ocean."], scrambled: ["smooth", "shells", "We", "near", "the", "ocean.", "found"], spoken: "We found smooth shells near the ocean.", tags: ["pronoun", "verb", "adjective", "noun", "preposition", "article", "noun"] },
];

/** Grade 2 Proper Nouns: 10 varied items */
const BANK_G2_PROPER_NOUNS = [
  {
    sentence: "On sunday, we went to st. mary's church.",
    fixedSentence: "On Sunday, we went to St. Mary's Church.",
    tokens: [{ text: "On", cap: false }, { text: "sunday,", cap: true, fixed: "Sunday," }, { text: "we", cap: false }, { text: "went", cap: false }, { text: "to", cap: false }, { text: "st.", cap: true, fixed: "St." }, { text: "mary's", cap: true, fixed: "Mary's" }, { text: "church.", cap: true, fixed: "Church." }],
    hint: "Days (Sunday) and the names of churches (St. Mary's Church) get capitals!",
    spoken: "On Sunday, we went to St. Mary's Church.",
  },
  {
    sentence: "In december, we celebrate christmas in ohio.",
    fixedSentence: "In December, we celebrate Christmas in Ohio.",
    tokens: [{ text: "In", cap: false }, { text: "december,", cap: true, fixed: "December," }, { text: "we", cap: false }, { text: "celebrate", cap: false }, { text: "christmas", cap: true, fixed: "Christmas" }, { text: "in", cap: false }, { text: "ohio.", cap: true, fixed: "Ohio." }],
    hint: "Months (December), holidays (Christmas), and states (Ohio) get capitals!",
    spoken: "In December, we celebrate Christmas in Ohio.",
  },
  {
    sentence: "On friday, we visited chicago with uncle dan.",
    fixedSentence: "On Friday, we visited Chicago with Uncle Dan.",
    tokens: [{ text: "On", cap: false }, { text: "friday,", cap: true, fixed: "Friday," }, { text: "we", cap: false }, { text: "visited", cap: false }, { text: "chicago", cap: true, fixed: "Chicago" }, { text: "with", cap: false }, { text: "uncle", cap: true, fixed: "Uncle" }, { text: "dan.", cap: true, fixed: "Dan." }],
    hint: "Days (Friday), cities (Chicago), and titles with names (Uncle Dan) get capitals!",
    spoken: "On Friday, we visited Chicago with Uncle Dan.",
  },
  {
    sentence: "In july, we celebrate the fourth of july.",
    fixedSentence: "In July, we celebrate the Fourth of July.",
    tokens: [{ text: "In", cap: false }, { text: "july,", cap: true, fixed: "July," }, { text: "we", cap: false }, { text: "celebrate", cap: false }, { text: "the", cap: false }, { text: "fourth", cap: true, fixed: "Fourth" }, { text: "of", cap: false }, { text: "july.", cap: true, fixed: "July." }],
    hint: "Months and holidays need capital letters!",
    spoken: "In July, we celebrate the Fourth of July.",
  },
  {
    sentence: "Next monday is labor day in america.",
    fixedSentence: "Next Monday is Labor Day in America.",
    tokens: [{ text: "Next", cap: false }, { text: "monday", cap: true, fixed: "Monday" }, { text: "is", cap: false }, { text: "labor", cap: true, fixed: "Labor" }, { text: "day", cap: true, fixed: "Day" }, { text: "in", cap: false }, { text: "america.", cap: true, fixed: "America." }],
    hint: "Capitalize days (Monday), holidays (Labor Day), and countries (America)!",
    spoken: "Next Monday is Labor Day in America.",
  },
  {
    sentence: "Every sunday, dr. smith walks in boston.",
    fixedSentence: "Every Sunday, Dr. Smith walks in Boston.",
    tokens: [{ text: "Every", cap: false }, { text: "sunday,", cap: true, fixed: "Sunday," }, { text: "dr.", cap: true, fixed: "Dr." }, { text: "smith", cap: true, fixed: "Smith" }, { text: "walks", cap: false }, { text: "in", cap: false }, { text: "boston.", cap: true, fixed: "Boston." }],
    hint: "Sunday, Dr. Smith, and Boston are proper nouns!",
    spoken: "Every Sunday, Dr. Smith walks in Boston.",
  },
  {
    sentence: "We went to canada for halloween with maya.",
    fixedSentence: "We went to Canada for Halloween with Maya.",
    tokens: [{ text: "We", cap: false }, { text: "went", cap: false }, { text: "to", cap: false }, { text: "canada", cap: true, fixed: "Canada" }, { text: "for", cap: false }, { text: "halloween", cap: true, fixed: "Halloween" }, { text: "with", cap: false }, { text: "maya.", cap: true, fixed: "Maya." }],
    hint: "Canada, Halloween, and Maya need uppercase letters!",
    spoken: "We went to Canada for Halloween with Maya.",
  },
  {
    sentence: "Last tuesday, texas had warm sunny weather.",
    fixedSentence: "Last Tuesday, Texas had warm sunny weather.",
    tokens: [{ text: "Last", cap: false }, { text: "tuesday,", cap: true, fixed: "Tuesday," }, { text: "texas", cap: true, fixed: "Texas" }, { text: "had", cap: false }, { text: "warm", cap: false }, { text: "sunny", cap: false }, { text: "weather.", cap: false }],
    hint: "Tuesday and Texas are proper nouns!",
    spoken: "Last Tuesday, Texas had warm sunny weather.",
  },
  {
    sentence: "In december, aunt rosa flew to florida.",
    fixedSentence: "In December, Aunt Rosa flew to Florida.",
    tokens: [{ text: "In", cap: false }, { text: "december,", cap: true, fixed: "December," }, { text: "aunt", cap: true, fixed: "Aunt" }, { text: "rosa", cap: true, fixed: "Rosa" }, { text: "flew", cap: false }, { text: "to", cap: false }, { text: "florida.", cap: true, fixed: "Florida." }],
    hint: "December, Aunt Rosa, and Florida are proper nouns!",
    spoken: "In December, Aunt Rosa flew to Florida.",
  },
  {
    sentence: "On saturday, leo visited central park.",
    fixedSentence: "On Saturday, Leo visited Central Park.",
    tokens: [{ text: "On", cap: false }, { text: "saturday,", cap: true, fixed: "Saturday," }, { text: "leo", cap: true, fixed: "Leo" }, { text: "visited", cap: false }, { text: "central", cap: true, fixed: "Central" }, { text: "park.", cap: true, fixed: "Park." }],
    hint: "Saturday, Leo, and Central Park all start with capitals!",
    spoken: "On Saturday, Leo visited Central Park.",
  },
  {
    sentence: "In october, mrs. lee went to london.",
    fixedSentence: "In October, Mrs. Lee went to London.",
    tokens: [{ text: "In", cap: false }, { text: "october,", cap: true, fixed: "October," }, { text: "mrs.", cap: true, fixed: "Mrs." }, { text: "lee", cap: true, fixed: "Lee" }, { text: "went", cap: false }, { text: "to", cap: false }, { text: "london.", cap: true, fixed: "London." }],
    hint: "October, Mrs. Lee, and London need capital letters!",
    spoken: "In October, Mrs. Lee went to London.",
  },
  {
    sentence: "Every thursday, sam practices soccer in ohio.",
    fixedSentence: "Every Thursday, Sam practices soccer in Ohio.",
    tokens: [{ text: "Every", cap: false }, { text: "thursday,", cap: true, fixed: "Thursday," }, { text: "sam", cap: true, fixed: "Sam" }, { text: "practices", cap: false }, { text: "soccer", cap: false }, { text: "in", cap: false }, { text: "ohio.", cap: true, fixed: "Ohio." }],
    hint: "Thursday, Sam, and Ohio are special names!",
    spoken: "Every Thursday, Sam practices soccer in Ohio.",
  },
];

/** Grade 2 Commas in a Series: 10 varied items */
const BANK_G2_COMMAS_SERIES = [
  { lead: "Mary Joseph and Jesus are the Holy Family.", choices: ["Mary, Joseph, and Jesus are the Holy Family.", "Mary Joseph, and Jesus are the Holy Family.", "Mary, Joseph and, Jesus are the Holy Family."], correct: "Mary, Joseph, and Jesus are the Holy Family.", hint: "Put a comma after each name in the list before 'and'!", spoken: "Mary, Joseph, and Jesus are the Holy Family." },
  { lead: "At Mass we sing pray and listen.", choices: ["At Mass we sing, pray, and listen.", "At Mass, we sing pray and listen.", "At Mass we sing pray, and listen."], correct: "At Mass we sing, pray, and listen.", hint: "Put a comma after each action in the list before 'and'!", spoken: "At Mass we sing, pray, and listen." },
  { lead: "I bought apples bananas and grapes.", choices: ["I bought apples, bananas, and grapes.", "I bought, apples bananas, and grapes.", "I bought apples bananas, and grapes."], correct: "I bought apples, bananas, and grapes.", hint: "Put a comma after each item in the list before 'and'!", spoken: "I bought apples, bananas, and grapes." },
  { lead: "We invited Leo Maya and Sam to play.", choices: ["We invited Leo, Maya, and Sam to play.", "We invited, Leo Maya, and Sam to play.", "We, invited Leo, Maya and Sam to play."], correct: "We invited Leo, Maya, and Sam to play.", hint: "Separate people in a list with commas: Leo, Maya, and Sam.", spoken: "We invited Leo, Maya, and Sam to play." },
  { lead: "The flag is red white and blue.", choices: ["The flag is red, white, and blue.", "The flag is, red white and blue.", "The flag is red white, and blue."], correct: "The flag is red, white, and blue.", hint: "Use commas to list the colors: red, white, and blue.", spoken: "The flag is red, white, and blue." },
  { lead: "She likes to swim run and jump.", choices: ["She likes to swim, run, and jump.", "She likes, to swim run and jump.", "She likes to swim run, and jump."], correct: "She likes to swim, run, and jump.", hint: "Separate three action words: swim, run, and jump.", spoken: "She likes to swim, run, and jump." },
  { lead: "He packed a notebook pencil and ruler.", choices: ["He packed a notebook, pencil, and ruler.", "He packed a notebook pencil, and ruler.", "He packed, a notebook pencil and ruler."], correct: "He packed a notebook, pencil, and ruler.", hint: "Separate the supplies: notebook, pencil, and ruler.", spoken: "He packed a notebook, pencil, and ruler." },
  { lead: "Lions tigers and bears live in the wild.", choices: ["Lions, tigers, and bears live in the wild.", "Lions tigers, and bears live in the wild.", "Lions, tigers and, bears live in the wild."], correct: "Lions, tigers, and bears live in the wild.", hint: "Separate animal names: Lions, tigers, and bears.", spoken: "Lions, tigers, and bears live in the wild." },
  { lead: "Mom planted roses tulips and daisies.", choices: ["Mom planted roses, tulips, and daisies.", "Mom planted, roses tulips and daisies.", "Mom planted roses tulips, and daisies."], correct: "Mom planted roses, tulips, and daisies.", hint: "Put commas between the flowers: roses, tulips, and daisies.", spoken: "Mom planted roses, tulips, and daisies." },
  { lead: "We ate toast eggs and berries for breakfast.", choices: ["We ate toast, eggs, and berries for breakfast.", "We ate, toast eggs, and berries for breakfast.", "We ate toast eggs, and berries for breakfast."], correct: "We ate toast, eggs, and berries for breakfast.", hint: "Separate breakfast foods with commas: toast, eggs, and berries.", spoken: "We ate toast, eggs, and berries for breakfast." },
  { lead: "Frogs toads and newts love the pond.", choices: ["Frogs, toads, and newts love the pond.", "Frogs toads, and newts love the pond.", "Frogs, toads and, newts love the pond."], correct: "Frogs, toads, and newts love the pond.", hint: "Separate the three animals: Frogs, toads, and newts.", spoken: "Frogs, toads, and newts love the pond." },
  { lead: "My dog is fluffy gentle and smart.", choices: ["My dog is fluffy, gentle, and smart.", "My dog is, fluffy gentle and smart.", "My dog is fluffy gentle, and smart."], correct: "My dog is fluffy, gentle, and smart.", hint: "Separate the describing words: fluffy, gentle, and smart.", spoken: "My dog is fluffy, gentle, and smart." },
];

/** Grade 2 Commas in Dates & Letters: 10 varied items */
const BANK_G2_COMMAS_DATES = [
  { lead: "School starts on August 25 2025.", choices: ["School starts on August 25, 2025.", "School starts, on August 25 2025.", "School starts on, August 25 2025."], correct: "School starts on August 25, 2025.", hint: "Put a comma between the day and the year: August 25, 2025.", spoken: "School starts on August 25, 2025." },
  { lead: "Dear Maya how are you today?", choices: ["Dear Maya, how are you today?", "Dear, Maya how are you today?", "Dear Maya how, are you today?"], correct: "Dear Maya, how are you today?", hint: "Put a comma after the greeting: Dear Maya,", spoken: "Dear Maya, how are you today?" },
  { lead: "Our country was born on July 4 1776.", choices: ["Our country was born on July 4, 1776.", "Our country was born, on July 4 1776.", "Our country was born on July, 4 1776."], correct: "Our country was born on July 4, 1776.", hint: "Put a comma between the day and the year: July 4, 1776.", spoken: "Our country was born on July 4, 1776." },
  { lead: "Your friend Leo", choices: ["Your friend, Leo", "Your, friend Leo", "Your friend Leo,"], correct: "Your friend, Leo", hint: "A letter closing gets a comma before the name: Your friend,", spoken: "Your friend, Leo." },
  { lead: "Our baby was born on March 12 2024.", choices: ["Our baby was born on March 12, 2024.", "Our baby was born on, March 12 2024.", "Our baby was born, on March 12 2024."], correct: "Our baby was born on March 12, 2024.", hint: "Comma separates the date from the year: March 12, 2024.", spoken: "Our baby was born on March 12, 2024." },
  { lead: "Sincerely yours Sam", choices: ["Sincerely yours, Sam", "Sincerely, yours Sam", "Sincerely yours Sam,"], correct: "Sincerely yours, Sam", hint: "A letter closing gets a comma before the name: Sincerely yours,", spoken: "Sincerely yours, Sam." },
  { lead: "Dear Grandma thank you for the cookies!", choices: ["Dear Grandma, thank you for the cookies!", "Dear, Grandma thank you for the cookies!", "Dear Grandma thank, you for the cookies!"], correct: "Dear Grandma, thank you for the cookies!", hint: "Put a comma after the greeting: Dear Grandma,", spoken: "Dear Grandma, thank you for the cookies!" },
  { lead: "Men landed on the moon on July 20 1969.", choices: ["Men landed on the moon on July 20, 1969.", "Men landed on the moon, on July 20 1969.", "Men landed on the moon on July, 20 1969."], correct: "Men landed on the moon on July 20, 1969.", hint: "Put a comma between day and year: July 20, 1969.", spoken: "Men landed on the moon on July 20, 1969." },
  { lead: "With love Aunt Sara", choices: ["With love, Aunt Sara", "With, love Aunt Sara", "With love Aunt, Sara"], correct: "With love, Aunt Sara", hint: "A letter closing gets a comma before the name: With love,", spoken: "With love, Aunt Sara." },
  { lead: "The party is on October 31 2026.", choices: ["The party is on October 31, 2026.", "The party is, on October 31 2026.", "The party is on, October 31 2026."], correct: "The party is on October 31, 2026.", hint: "Separate the day and year with a comma: October 31, 2026.", spoken: "The party is on October 31, 2026." },
];

/** Grade 2 Contractions: 12 varied sentences with blanks */
const BANK_G2_CONTRACTIONS = [
  { prompt: "We _____ wait to see the manger scene!", full: "cannot", correct: "can't", choices: ["can't", "cant'", "ca'nt"], hint: 'Cannot becomes can\'t: the apostrophe takes the place of the missing letters!', spoken: "We can't wait to see the manger scene!" },
  { prompt: "Look, _____ the first Sunday of Advent!", full: "it is", correct: "it's", choices: ["it's", "its'", "i'ts"], hint: 'It + is becomes it\'s!', spoken: "Look, it's the first Sunday of Advent!" },
  { prompt: "Please _____ forget your warm jacket.", full: "do not", correct: "don't", choices: ["don't", "dont'", "do'nt"], hint: 'The apostrophe replaces the "o" in "not": don\'t!', spoken: "Please don't forget your warm jacket." },
  { prompt: "I _____ find my blue mittens.", full: "can not", correct: "can't", choices: ["can't", "cant'", "ca'nt"], hint: 'Apostrophe takes the place of "no": can\'t!', spoken: "I can't find my blue mittens." },
  { prompt: "Look outside, _____ snowing today!", full: "it is", correct: "it's", choices: ["it's", "its'", "i'ts"], hint: 'Apostrophe replaces the "i" in "is": it\'s snowing!', spoken: "Look outside, it's snowing today!" },
  { prompt: "Hooray, _____ going to the zoo!", full: "we are", correct: "we're", choices: ["we're", "wer'e", "were'"], hint: 'Apostrophe replaces "a" in "are": we\'re going!', spoken: "Hooray, we're going to the zoo!" },
  { prompt: "Soon _____ arrive on the bus.", full: "they will", correct: "they'll", choices: ["they'll", "theyl'l", "they'l"], hint: 'Apostrophe replaces "wi": they\'ll arrive!', spoken: "Soon they'll arrive on the bus." },
  { prompt: "Today _____ my birthday, but tomorrow is!", full: "is not", correct: "isn't", choices: ["isn't", "isnt'", "is'nt"], hint: 'Apostrophe replaces "o" in "not": isn\'t!', spoken: "Today isn't my birthday, but tomorrow is!" },
  { prompt: "I think _____ love this story.", full: "you will", correct: "you'll", choices: ["you'll", "youl'l", "you'l"], hint: 'You + will becomes you\'ll!', spoken: "I think you'll love this story." },
  { prompt: "Right now _____ building a block tower.", full: "I am", correct: "I'm", choices: ["I'm", "Im'", "I'am"], hint: 'I + am becomes I\'m!', spoken: "Right now I'm building a block tower." },
  { prompt: "Maya said _____ bring the soccer ball.", full: "she will", correct: "she'll", choices: ["she'll", "shel'l", "she'l"], hint: 'She + will becomes she\'ll!', spoken: "Maya said she'll bring the soccer ball." },
  { prompt: "The puppy _____ want to go inside.", full: "did not", correct: "didn't", choices: ["didn't", "didnt'", "did'nt"], hint: 'Did + not becomes didn\'t!', spoken: "The puppy didn't want to go inside." },
  { prompt: "Leo told us _____ ready for school.", full: "he is", correct: "he's", choices: ["he's", "hes'", "he'is"], hint: 'He + is becomes he\'s!', spoken: "Leo told us he's ready for school." },
  { prompt: "I know _____ a very kind friend.", full: "you are", correct: "you're", choices: ["you're", "your'e", "youre'"], hint: 'You + are becomes you\'re!', spoken: "I know you're a very kind friend." },
];

/** Grade 2 Past Tense: 12 varied items */
const BANK_G2_PAST_TENSE = [
  { prompt: "The choir _____ a beautiful song at Mass.", correct: "sang", choices: ["sing", "sang", "singed"], hint: 'Sing changes to "sang" in the past!', spoken: "The choir sang a beautiful song at Mass." },
  { prompt: "Last night, we _____ our prayers before bed.", correct: "said", choices: ["say", "sayed", "said"], hint: 'Say changes to "said" in the past! Never "sayed".', spoken: "Last night, we said our prayers before bed." },
  { prompt: "Yesterday, Liam _____ five sweet apples.", correct: "ate", choices: ["ate", "eated", "eat"], hint: 'Eat changes to "ate" in the past! Never "eated".', spoken: "Yesterday, Liam ate five sweet apples." },
  { prompt: "Last summer, we _____ to the sandy beach.", correct: "went", choices: ["went", "goed", "go"], hint: 'Go changes to "went" in the past!', spoken: "Last summer, we went to the sandy beach." },
  { prompt: "The brave astronaut _____ into the rocket.", correct: "climbed", choices: ["climbed", "climb", "clamb"], hint: "Regular past tense adds -ed: climbed!", spoken: "The brave astronaut climbed into the rocket." },
  { prompt: "Maya _____ a bright shooting star last night.", correct: "saw", choices: ["saw", "seed", "seen"], hint: 'See changes to "saw" in the past!', spoken: "Maya saw a bright shooting star last night." },
  { prompt: "The happy children _____ all the way home.", correct: "ran", choices: ["ran", "runned", "run"], hint: 'Run changes to "ran" in the past! Never "runned".', spoken: "The happy children ran all the way home." },
  { prompt: "Last night, the puppy _____ on a soft rug.", correct: "slept", choices: ["slept", "sleeped", "sleep"], hint: 'Sleep changes to "slept" in the past!', spoken: "Last night, the puppy slept on a soft rug." },
  { prompt: "Sam _____ a tall sandcastle at the shore.", correct: "built", choices: ["built", "builded", "build"], hint: 'Build changes to "built" in the past!', spoken: "Sam built a tall sandcastle at the shore." },
  { prompt: "The little bird _____ a happy morning song.", correct: "sang", choices: ["sang", "singed", "sing"], hint: 'Sing changes to "sang" in the past!', spoken: "The little bird sang a happy morning song." },
  { prompt: "We _____ across the cool swimming pool.", correct: "swam", choices: ["swam", "swimmed", "swim"], hint: 'Swim changes to "swam" in the past!', spoken: "We swam across the cool swimming pool." },
  { prompt: "Dad _____ delicious pancakes for breakfast.", correct: "made", choices: ["made", "maked", "make"], hint: 'Make changes to "made" in the past!', spoken: "Dad made delicious pancakes for breakfast." },
  { prompt: "The green frog _____ onto the lily pad.", correct: "jumped", choices: ["jumped", "jump", "jamp"], hint: "Jump adds -ed in the past: jumped!", spoken: "The green frog jumped onto the lily pad." },
  { prompt: "She _____ a shiny penny on the sidewalk.", correct: "found", choices: ["found", "finded", "find"], hint: 'Find changes to "found" in the past!', spoken: "She found a shiny penny on the sidewalk." },
];

/** Grade 2 Irregular Plurals: 12 varied items */
const BANK_G2_IRREG_PLURALS = [
  { prompt: "The shepherds watched their _____ by night.", singular: "sheep", correct: "sheep", choices: ["sheeps", "sheep", "sheepes"], hint: "One sheep, two sheep! Sheep stays the same.", spoken: "The shepherds watched their sheep by night." },
  { prompt: "Three little _____ nibbled on the yellow cheese.", singular: "mouse", correct: "mice", choices: ["mice", "mouses", "mices"], hint: "One mouse, two mice! Never 'mouses'.", spoken: "Three little mice nibbled on the yellow cheese." },
  { prompt: "Remember to brush your _____ before bedtime.", singular: "tooth", correct: "teeth", choices: ["teeth", "tooths", "toothes"], hint: "One tooth, all your teeth!", spoken: "Remember to brush your teeth before bedtime." },
  { prompt: "The happy _____ built a giant snow fort.", singular: "child", correct: "children", choices: ["children", "childs", "childrens"], hint: "One child, many children!", spoken: "The happy children built a giant snow fort." },
  { prompt: "Put warm socks on your cold _____.", singular: "foot", correct: "feet", choices: ["feet", "foots", "feets"], hint: "One foot, two feet!", spoken: "Put warm socks on your cold feet." },
  { prompt: "A flock of wild _____ flew across the lake.", singular: "goose", correct: "geese", choices: ["geese", "gooses", "geeses"], hint: "One goose, many geese!", spoken: "A flock of wild geese flew across the lake." },
  { prompt: "Five fluffy white _____ grazed on the hill.", singular: "sheep", correct: "sheep", choices: ["sheep", "sheeps", "sheepes"], hint: "One sheep, many sheep! The word stays the same.", spoken: "Five fluffy white sheep grazed on the hill." },
  { prompt: "Two brown _____ jumped over the forest log.", singular: "deer", correct: "deer", choices: ["deer", "deers", "deeres"], hint: "One deer, two deer! It stays the same.", spoken: "Two brown deer jumped over the forest log." },
  { prompt: "Colorful _____ swam inside the glass tank.", singular: "fish", correct: "fish", choices: ["fish", "fishs", "feesh"], hint: "One fish, many fish!", spoken: "Colorful fish swam inside the glass tank." },
  { prompt: "Autumn _____ fell from the tall oak tree.", singular: "leaf", correct: "leaves", choices: ["leaves", "leafs", "leavs"], hint: "Leaf changes f to v and adds -es: leaves!", spoken: "Autumn leaves fell from the tall oak tree." },
  { prompt: "The baker put warm _____ of bread on the rack.", singular: "loaf", correct: "loaves", choices: ["loaves", "loafs", "loaveses"], hint: "One loaf, two loaves!", spoken: "The baker put warm loaves of bread on the rack." },
  { prompt: "Three brave _____ helped rescue the kitten.", singular: "woman", correct: "women", choices: ["women", "womans", "womens"], hint: "One woman, three women!", spoken: "Three brave women helped rescue the kitten." },
  { prompt: "Two strong _____ lifted the heavy piano.", singular: "man", correct: "men", choices: ["men", "mans", "mens"], hint: "One man, two men!", spoken: "Two strong men lifted the heavy piano." },
];

/** Grade 2 Complete vs Fragment: 12 varied items */
const BANK_G2_FRAGMENTS = [
  { sentence: "The bells rang on Easter morning.", isComplete: true, reason: "It has a subject (the bells) and an action (rang).", hint: "Who? The bells. What did they do? They rang. That's a complete sentence!", spoken: "The bells rang on Easter morning." },
  { sentence: "Lit the tall Advent candle.", isComplete: false, reason: "Missing subject. Who lit the candle?", hint: "This only has an action. Who lit the candle? It needs a subject!", spoken: "Lit the tall Advent candle." },
  { sentence: "The little brown rabbit.", isComplete: false, reason: "Missing predicate (action). What did the rabbit do?", hint: "This only has a subject (who). It needs an action verb!", spoken: "The little brown rabbit." },
  { sentence: "The little brown rabbit hopped away.", isComplete: true, reason: "Complete! Subject = rabbit, predicate = hopped away.", hint: "Has both who (rabbit) and what it did (hopped)!", spoken: "The little brown rabbit hopped away." },
  { sentence: "Swam quickly across the wide river.", isComplete: false, reason: "Missing subject. Who swam?", hint: "We don't know who did the swimming! It is a fragment.", spoken: "Swam quickly across the wide river." },
  { sentence: "Maya swam quickly across the wide river.", isComplete: true, reason: "Complete! Maya (subject) swam (verb).", hint: "Has both a subject and an action predicate!", spoken: "Maya swam quickly across the wide river." },
  { sentence: "Because the storm started.", isComplete: false, reason: "Incomplete thought. What happened because of the storm?", hint: "This leaves us hanging! It is a fragment.", spoken: "Because the storm started." },
  { sentence: "Under the old wooden bridge.", isComplete: false, reason: "Just tells where! Missing who and what happened.", hint: "Where is not a whole sentence! It needs a subject and verb.", spoken: "Under the old wooden bridge." },
  { sentence: "The shiny red fire truck raced by.", isComplete: true, reason: "Complete! Fire truck (subject) raced by (verb).", hint: "Tells who (fire truck) and what it did (raced by)!", spoken: "The shiny red fire truck raced by." },
  { sentence: "Ate all the crunchy peanut butter cookies.", isComplete: false, reason: "Missing subject! Who ate the cookies?", hint: "We don't know who ate them! It is a fragment.", spoken: "Ate all the crunchy peanut butter cookies." },
  { sentence: "Our friendly dog wagged his fluffy tail.", isComplete: true, reason: "Complete! Dog (subject) wagged (verb).", hint: "Has both a subject and an action!", spoken: "Our friendly dog wagged his fluffy tail." },
  { sentence: "Three yellow ducks in the pond.", isComplete: false, reason: "Missing action verb! What did the ducks do?", hint: "No verb here! What are the ducks doing?", spoken: "Three yellow ducks in the pond." },
  { sentence: "Bright stars twinkled in the night sky.", isComplete: true, reason: "Complete! Stars (subject) twinkled (verb).", hint: "Tells what twinkled in the sky!", spoken: "Bright stars twinkled in the night sky." },
  { sentence: "Jumped high over the garden fence.", isComplete: false, reason: "Missing subject! Who jumped?", hint: "Needs a subject to tell who jumped!", spoken: "Jumped high over the garden fence." },
];

/** Grade 3 Order Bank: 12 complex clauses & prepositional phrases */
const BANK_G3_ORDER = [
  { text: "Saint Francis kindly cared for the animals.", words: ["Saint", "Francis", "kindly", "cared", "for", "the", "animals."], scrambled: ["Francis", "kindly", "the", "for", "cared", "animals.", "Saint"], spoken: "Saint Francis kindly cared for the animals.", tags: ["noun", "noun", "adverb", "verb", "preposition", "article", "noun"] },
  { text: "The brave astronaut floated through the space station.", words: ["The", "brave", "astronaut", "floated", "through", "the", "space", "station."], scrambled: ["through", "the", "floated", "brave", "The", "space", "station.", "astronaut"], spoken: "The brave astronaut floated through the space station.", tags: ["article", "adjective", "noun", "verb", "preposition", "article", "adjective", "noun"] },
  { text: "Maya read a book while rain fell outside.", words: ["Maya", "read", "a", "book", "while", "rain", "fell", "outside."], scrambled: ["fell", "outside.", "book", "rain", "Maya", "while", "a", "read"], spoken: "Maya read a book while rain fell outside.", tags: ["noun", "verb", "article", "noun", "conjunction", "noun", "verb", "adverb"] },
  { text: "Curious kittens slept between two cozy pillows.", words: ["Curious", "kittens", "slept", "between", "two", "cozy", "pillows."], scrambled: ["pillows.", "two", "slept", "between", "Curious", "cozy", "kittens"], spoken: "Curious kittens slept between two cozy pillows.", tags: ["adjective", "noun", "verb", "preposition", "adjective", "adjective", "noun"] },
  { text: "We danced happily because our team won.", words: ["We", "danced", "happily", "because", "our", "team", "won."], scrambled: ["won.", "happily", "danced", "our", "We", "team", "because"], spoken: "We danced happily because our team won.", tags: ["pronoun", "verb", "adverb", "conjunction", "pronoun", "noun", "verb"] },
  { text: "A friendly dolphin leaped across the emerald ocean.", words: ["A", "friendly", "dolphin", "leaped", "across", "the", "emerald", "ocean."], scrambled: ["leaped", "A", "friendly", "across", "emerald", "ocean.", "the", "dolphin"], spoken: "A friendly dolphin leaped across the emerald ocean.", tags: ["article", "adjective", "noun", "verb", "preposition", "article", "adjective", "noun"] },
  { text: "Leo built a tall tower before dinner started.", words: ["Leo", "built", "a", "tall", "tower", "before", "dinner", "started."], scrambled: ["tall", "before", "dinner", "tower", "a", "Leo", "started.", "built"], spoken: "Leo built a tall tower before dinner started.", tags: ["noun", "verb", "article", "adjective", "noun", "conjunction", "noun", "verb"] },
  { text: "Golden eagles soared high above snowy mountains.", words: ["Golden", "eagles", "soared", "high", "above", "snowy", "mountains."], scrambled: ["mountains.", "soared", "Golden", "above", "high", "snowy", "eagles"], spoken: "Golden eagles soared high above snowy mountains.", tags: ["adjective", "noun", "verb", "adverb", "preposition", "adjective", "noun"] },
  { text: "She whispered softly so the baby could sleep.", words: ["She", "whispered", "softly", "so", "the", "baby", "could", "sleep."], scrambled: ["so", "sleep.", "baby", "could", "softly", "the", "whispered", "She"], spoken: "She whispered softly so the baby could sleep.", tags: ["pronoun", "verb", "adverb", "conjunction", "article", "noun", "verb", "verb"] },
  { text: "Two clever squirrels hid acorns under the oak.", words: ["Two", "clever", "squirrels", "hid", "acorns", "under", "the", "oak."], scrambled: ["clever", "Two", "oak.", "squirrels", "under", "the", "acorns", "hid"], spoken: "Two clever squirrels hid acorns under the oak.", tags: ["adjective", "adjective", "noun", "verb", "noun", "preposition", "article", "noun"] },
  { text: "The silver train chugged across the wooden bridge.", words: ["The", "silver", "train", "chugged", "across", "the", "wooden", "bridge."], scrambled: ["across", "chugged", "silver", "train", "wooden", "The", "bridge.", "the"], spoken: "The silver train chugged across the wooden bridge.", tags: ["article", "adjective", "noun", "verb", "preposition", "article", "adjective", "noun"] },
];

/** Grade 3 Quotation Marks: 10 varied items */
const BANK_G3_QUOTES = [
  {
    lead: "Peace be with you said the priest.",
    correct: '"Peace be with you," said the priest.',
    choices: ['"Peace be with you," said the priest.', 'Peace be "with you," said the priest.', '"Peace be with you, said the priest."'],
    hint: 'Put quotes around the words the priest said: "Peace be with you,"',
    spoken: '"Peace be with you," said the priest.',
  },
  {
    lead: "Look at the shooting star yelled Leo.",
    correct: '"Look at the shooting star!" yelled Leo.',
    choices: ['"Look at the shooting star!" yelled Leo.', 'Look at the "shooting star!" yelled Leo.', '"Look at the shooting star! yelled Leo."'],
    hint: 'Put quotes around what Leo actually yelled: "Look at the shooting star!"',
    spoken: '"Look at the shooting star!" yelled Leo.',
  },
  {
    lead: "Maya asked Where did you find that shell?",
    correct: 'Maya asked, "Where did you find that shell?"',
    choices: ['Maya asked, "Where did you find that shell?"', 'Maya asked "Where did you find, that shell?"', '"Maya asked, Where did you find that shell?"'],
    hint: 'Use a comma after asked, then quote the exact question: "Where did you find that shell?"',
    spoken: 'Maya asked, "Where did you find that shell?"',
  },
  {
    lead: "I love reading mysteries whispered Sam.",
    correct: '"I love reading mysteries," whispered Sam.',
    choices: ['"I love reading mysteries," whispered Sam.', '"I love reading" mysteries, whispered Sam.', 'I love reading "mysteries," whispered Sam.'],
    hint: "The quotation marks wrap the entire spoken sentence with a comma inside.",
    spoken: '"I love reading mysteries," whispered Sam.',
  },
  {
    lead: "We can bake cupcakes cheered Emma.",
    correct: '"We can bake cupcakes!" cheered Emma.',
    choices: ['"We can bake cupcakes!" cheered Emma.', 'We can bake "cupcakes!" cheered Emma.', '"We can bake" cupcakes! cheered Emma.'],
    hint: 'Quotes wrap what Emma cheered: "We can bake cupcakes!"',
    spoken: '"We can bake cupcakes!" cheered Emma.',
  },
  {
    lead: "Dad said Please wash your hands before dinner.",
    correct: 'Dad said, "Please wash your hands before dinner."',
    choices: ['Dad said, "Please wash your hands before dinner."', '"Dad said, Please wash your hands before dinner."', 'Dad said "Please wash your hands, before dinner."'],
    hint: "Comma after said, then quotation marks around Dad's words.",
    spoken: 'Dad said, "Please wash your hands before dinner."',
  },
  {
    lead: "Are you ready for the game asked Coach.",
    correct: '"Are you ready for the game?" asked Coach.',
    choices: ['"Are you ready for the game?" asked Coach.', 'Are you ready "for the game?" asked Coach.', '"Are you ready for the game? asked Coach."'],
    hint: 'Wrap the spoken question in quotation marks: "Are you ready for the game?"',
    spoken: '"Are you ready for the game?" asked Coach.',
  },
  {
    lead: "Mom called Dinner is ready on the table!",
    correct: 'Mom called, "Dinner is ready on the table!"',
    choices: ['Mom called, "Dinner is ready on the table!"', '"Mom called, Dinner is ready on the table!"', 'Mom called "Dinner is ready, on the table!"'],
    hint: 'Put a comma after called, then quote Mom\'s words: "Dinner is ready on the table!"',
    spoken: 'Mom called, "Dinner is ready on the table!"',
  },
  {
    lead: "This puppy is so soft said Noah.",
    correct: '"This puppy is so soft," said Noah.',
    choices: ['"This puppy is so soft," said Noah.', '"This puppy" is so soft, said Noah.', 'This puppy is "so soft," said Noah.'],
    hint: 'Wrap Noah\'s exact words in quotes: "This puppy is so soft," said Noah.',
    spoken: '"This puppy is so soft," said Noah.',
  },
  {
    lead: "Grandma asked Would you like warm cocoa?",
    correct: 'Grandma asked, "Would you like warm cocoa?"',
    choices: ['Grandma asked, "Would you like warm cocoa?"', '"Grandma asked, Would you like warm cocoa?"', 'Grandma asked "Would you like, warm cocoa?"'],
    hint: 'Put a comma after asked, then quote Grandma\'s question!',
    spoken: 'Grandma asked, "Would you like warm cocoa?"',
  },
  {
    lead: "Watch out for that puddle shouted Mia.",
    correct: '"Watch out for that puddle!" shouted Mia.',
    choices: ['"Watch out for that puddle!" shouted Mia.', 'Watch out "for that puddle!" shouted Mia.', '"Watch out for that puddle! shouted Mia."'],
    hint: 'Put quotes around what Mia shouted: "Watch out for that puddle!"',
    spoken: '"Watch out for that puddle!" shouted Mia.',
  },
];

/** Grade 3 Possessives: 12 varied items */
const BANK_G3_POSSESSIVES = [
  { prompt: "The _____ bell rang for Mass.", owner: "one church", correct: "church's", choices: ["churchs", "church's", "churches'"], hint: "One church owns the bell, so add 's: church's bell!", spoken: "The church's bell rang for Mass." },
  { prompt: "All the _____ voices filled the church.", owner: "many singers", correct: "singers'", choices: ["singer's", "singers'", "singers"], hint: "Many singers own the voices, so add just an apostrophe: singers'!", spoken: "All the singers' voices filled the church." },
  { prompt: "The _____ bright red collar had a golden bell.", owner: "one cat", correct: "cat's", choices: ["cat's", "cats'", "cats"], hint: "One cat owns the collar, so add 's: cat's collar!", spoken: "The cat's bright red collar had a golden bell." },
  { prompt: "All three _____ tails wagged happily.", owner: "three puppies", correct: "puppies'", choices: ["puppies'", "puppy's", "puppies"], hint: "More than one puppy! For plural ending in s, put the apostrophe after: puppies' tails.", spoken: "All three puppies' tails wagged happily." },
  { prompt: "We visited our _____ cozy garden yesterday.", owner: "one teacher", correct: "teacher's", choices: ["teacher's", "teachers'", "teachers"], hint: "Singular owner gets 's: teacher's garden.", spoken: "We visited our teacher's cozy garden yesterday." },
  { prompt: "The _____ nests were hidden high in the oak trees.", owner: "many birds", correct: "birds'", choices: ["birds'", "bird's", "birds"], hint: "Plural owners (birds) get an apostrophe at the end: birds' nests.", spoken: "The birds' nests were hidden high in the oak trees." },
  { prompt: "My _____ bicycle had shiny silver streamers.", owner: "one brother", correct: "brother's", choices: ["brother's", "brothers'", "brothers"], hint: "One brother owns the bike: brother's bicycle.", spoken: "My brother's bicycle had shiny silver streamers." },
  { prompt: "The _____ clubhouse had a secret wooden door.", owner: "many children", correct: "children's", choices: ["children's", "childrens'", "childrens"], hint: "Irregular plural: children adds 's: children's clubhouse!", spoken: "The children's clubhouse had a secret wooden door." },
  { prompt: "The _____ crown sparkled with rubies.", owner: "one queen", correct: "queen's", choices: ["queen's", "queens'", "queens"], hint: "One queen owns the crown: queen's crown!", spoken: "The queen's crown sparkled with rubies." },
  { prompt: "Both _____ helmets were hanging on hooks.", owner: "two firefighters", correct: "firefighters'", choices: ["firefighters'", "firefighter's", "firefighters"], hint: "Two firefighters own the helmets: firefighters' helmets!", spoken: "Both firefighters' helmets were hanging on hooks." },
  { prompt: "That _____ long trunk sprayed cool water.", owner: "one elephant", correct: "elephant's", choices: ["elephant's", "elephants'", "elephants"], hint: "One elephant owns the trunk: elephant's trunk!", spoken: "That elephant's long trunk sprayed cool water." },
  { prompt: "All the _____ backpacks were lined up neatly.", owner: "many students", correct: "students'", choices: ["students'", "student's", "students"], hint: "Many students own the backpacks: students' backpacks!", spoken: "All the students' backpacks were lined up neatly." },
  { prompt: "The _____ wooly coats kept them warm.", owner: "many sheep", correct: "sheep's", choices: ["sheep's", "sheeps'", "sheeps"], hint: "Irregular plural sheep adds 's: sheep's coats!", spoken: "The sheep's wooly coats kept them warm." },
  { prompt: "My _____ favorite book is about dinosaurs.", owner: "one sister", correct: "sister's", choices: ["sister's", "sisters'", "sisters"], hint: "One sister owns the favorite book: sister's book!", spoken: "My sister's favorite book is about dinosaurs." },
];

/** Grade 3 Subject-Verb Agreement: 12 varied items */
const BANK_G3_AGREEMENT = [
  { prompt: "Grandma _____ the rosary every evening.", subject: "Grandma (singular)", correct: "prays", choices: ["prays", "pray"], hint: "One person takes a verb with -s: Grandma prays.", spoken: "Grandma prays the rosary every evening." },
  { prompt: "The altar servers _____ the candles.", subject: "The altar servers (plural)", correct: "carry", choices: ["carries", "carry"], hint: "More than one takes a verb without -s: the servers carry.", spoken: "The altar servers carry the candles." },
  { prompt: "The hungry puppy _____ its tasty dinner.", subject: "The hungry puppy (singular)", correct: "eats", choices: ["eats", "eat"], hint: "One puppy takes a verb with -s: The puppy eats.", spoken: "The hungry puppy eats its tasty dinner." },
  { prompt: "The two playful kittens _____ around the yarn.", subject: "The two playful kittens (plural)", correct: "dance", choices: ["dance", "dances"], hint: "Plural subject (kittens) takes a base verb without -s: kittens dance.", spoken: "The two playful kittens dance around the yarn." },
  { prompt: "Maya and Leo _____ to the park after school.", subject: "Maya and Leo (compound plural)", correct: "walk", choices: ["walk", "walks"], hint: "Two people = plural! Maya and Leo walk.", spoken: "Maya and Leo walk to the park after school." },
  { prompt: "The kind teacher _____ exciting science stories.", subject: "The kind teacher (singular)", correct: "tells", choices: ["tells", "tell"], hint: "One teacher = singular verb ending in s: teacher tells.", spoken: "The kind teacher tells exciting science stories." },
  { prompt: "The bright stars _____ in the midnight sky.", subject: "The bright stars (plural)", correct: "twinkle", choices: ["twinkle", "twinkles"], hint: "Plural stars takes twinkle: stars twinkle.", spoken: "The bright stars twinkle in the midnight sky." },
  { prompt: "He _____ a wonderful picture with watercolors.", subject: "He (singular pronoun)", correct: "paints", choices: ["paints", "paint"], hint: "He / she / it takes an -s verb: He paints.", spoken: "He paints a wonderful picture with watercolors." },
  { prompt: "A green frog _____ onto the mossy log.", subject: "A green frog (singular)", correct: "hops", choices: ["hops", "hop"], hint: "One frog takes -s: A green frog hops.", spoken: "A green frog hops onto the mossy log." },
  { prompt: "Three yellow ducks _____ across the pond.", subject: "Three yellow ducks (plural)", correct: "swim", choices: ["swim", "swims"], hint: "Plural ducks takes swim without -s!", spoken: "Three yellow ducks swim across the pond." },
  { prompt: "My big brother _____ delicious pancakes.", subject: "My big brother (singular)", correct: "bakes", choices: ["bakes", "bake"], hint: "One brother takes -s: brother bakes.", spoken: "My big brother bakes delicious pancakes." },
  { prompt: "They _____ soccer on the green field.", subject: "They (plural pronoun)", correct: "play", choices: ["play", "plays"], hint: "They takes play without -s: They play.", spoken: "They play soccer on the green field." },
  { prompt: "The shiny rocket _____ high into the clouds.", subject: "The shiny rocket (singular)", correct: "flies", choices: ["flies", "fly"], hint: "One rocket takes flies!", spoken: "The shiny rocket flies high into the clouds." },
  { prompt: "Busy bees _____ sweet nectar from flowers.", subject: "Busy bees (plural)", correct: "gather", choices: ["gather", "gathers"], hint: "Plural bees takes gather without -s!", spoken: "Busy bees gather sweet nectar from flowers." },
];

/** Grade 3 Comparatives & Superlatives: 12 varied items */
const BANK_G3_COMPARATIVES = [
  { prompt: "The Easter candle is _____ than the little candles.", base: "tall", correct: "taller", choices: ["tallest", "taller", "more tall"], hint: "Comparing two things uses -er: taller than!", spoken: "The Easter candle is taller than the little candles." },
  { prompt: "A cheetah is _____ than a turtle.", base: "fast", correct: "faster", choices: ["faster", "fastest", "more fast"], hint: "Comparing two things uses -er: faster than!", spoken: "A cheetah is faster than a turtle." },
  { prompt: "Mount Everest is the _____ mountain on Earth.", base: "high", correct: "highest", choices: ["highest", "higher", "most high"], hint: "Comparing all mountains uses -est: the highest!", spoken: "Mount Everest is the highest mountain on Earth." },
  { prompt: "This math puzzle is _____ than the last one.", base: "difficult", correct: "more difficult", choices: ["more difficult", "difficultest", "difficulter"], hint: "Long adjectives use 'more': more difficult!", spoken: "This math puzzle is more difficult than the last one." },
  { prompt: "Today is the _____ day of the entire summer.", base: "hot", correct: "hottest", choices: ["hottest", "hotter", "most hot"], hint: "The very top of all days: the hottest day!", spoken: "Today is the hottest day of the entire summer." },
  { prompt: "Jupiter is the _____ planet in our solar system.", base: "large", correct: "largest", choices: ["largest", "larger", "most large"], hint: "Comparing all planets: the largest planet!", spoken: "Jupiter is the largest planet in our solar system." },
  { prompt: "An airplane is _____ than a bicycle.", base: "loud", correct: "louder", choices: ["louder", "loudest", "more loud"], hint: "Comparing two things uses -er: louder than a bicycle.", spoken: "An airplane is louder than a bicycle." },
  { prompt: "A giraffe is _____ than a zebra.", base: "tall", correct: "taller", choices: ["taller", "tallest", "more tall"], hint: "Comparing two animals uses -er: taller than!", spoken: "A giraffe is taller than a zebra." },
  { prompt: "The blue whale is the _____ animal in the ocean.", base: "big", correct: "biggest", choices: ["biggest", "bigger", "most big"], hint: "Comparing all ocean animals uses -est: the biggest!", spoken: "The blue whale is the biggest animal in the ocean." },
  { prompt: "Winter is _____ than autumn.", base: "cold", correct: "colder", choices: ["colder", "coldest", "more cold"], hint: "Comparing two seasons uses -er: colder than!", spoken: "Winter is colder than autumn." },
  { prompt: "That butterfly is the _____ insect in the garden.", base: "colorful", correct: "most colorful", choices: ["most colorful", "colorfulest", "more colorful"], hint: "Long words comparing all items use 'most': most colorful!", spoken: "That butterfly is the most colorful insect in the garden." },
  { prompt: "A feather is _____ than a rock.", base: "light", correct: "lighter", choices: ["lighter", "lightest", "more light"], hint: "Comparing two things uses -er: lighter than!", spoken: "A feather is lighter than a rock." },
  { prompt: "Leo told the _____ joke at lunch.", base: "funny", correct: "funniest", choices: ["funniest", "funnier", "most funny"], hint: "Comparing all jokes: change y to i and add -est: funniest!", spoken: "Leo told the funniest joke at lunch." },
];

/** Grade 3 Commas in Addresses: 10 varied items */
const BANK_G3_COMMAS_ADDRESS = [
  { lead: "After we prayed the rosary we ate dinner.", correct: "After we prayed the rosary, we ate dinner.", choices: ["After we prayed the rosary, we ate dinner.", "After, we prayed the rosary we ate dinner.", "After we prayed, the rosary we ate dinner."], hint: "Put a comma after the starting part: After we prayed the rosary,", spoken: "After we prayed the rosary, we ate dinner." },
  { lead: "We mailed a postcard to Seattle Washington.", correct: "We mailed a postcard to Seattle, Washington.", choices: ["We mailed a postcard to Seattle, Washington.", "We mailed, a postcard to Seattle Washington.", "We mailed a postcard, to Seattle Washington."], hint: "Separate city from state with a comma: Seattle, Washington.", spoken: "We mailed a postcard to Seattle, Washington." },
  { lead: "When the school bell rang we lined up.", correct: "When the school bell rang, we lined up.", choices: ["When the school bell rang, we lined up.", "When, the school bell rang we lined up.", "When the school, bell rang we lined up."], hint: "Put a comma after the introductory clause: When the school bell rang,", spoken: "When the school bell rang, we lined up." },
  { lead: "My pen pal lives in Orlando Florida.", correct: "My pen pal lives in Orlando, Florida.", choices: ["My pen pal lives in Orlando, Florida.", "My pen pal, lives in Orlando Florida.", "My pen pal lives, in Orlando Florida."], hint: "Comma between city and state: Orlando, Florida.", spoken: "My pen pal lives in Orlando, Florida." },
  { lead: "Although it was chilly we played soccer outside.", correct: "Although it was chilly, we played soccer outside.", choices: ["Although it was chilly, we played soccer outside.", "Although, it was chilly we played soccer outside.", "Although it was chilly we played soccer, outside."], hint: "Introductory clause comma: Although it was chilly,", spoken: "Although it was chilly, we played soccer outside." },
  { lead: "The president lives in Washington D.C.", correct: "The president lives in Washington, D.C.", choices: ["The president lives in Washington, D.C.", "The president lives, in Washington D.C.", "The president, lives in Washington D.C."], hint: "Comma between city and district: Washington, D.C.", spoken: "The president lives in Washington, D.C." },
  { lead: "Before the sun rose the rooster crowed loudly.", correct: "Before the sun rose, the rooster crowed loudly.", choices: ["Before the sun rose, the rooster crowed loudly.", "Before, the sun rose the rooster crowed loudly.", "Before the sun rose the rooster, crowed loudly."], hint: "Comma after introductory part: Before the sun rose,", spoken: "Before the sun rose, the rooster crowed loudly." },
  { lead: "Grandma moved to Denver Colorado last year.", correct: "Grandma moved to Denver, Colorado, last year.", choices: ["Grandma moved to Denver, Colorado, last year.", "Grandma moved, to Denver Colorado last year.", "Grandma moved to, Denver Colorado last year."], hint: "Put a comma between the city and the state, and after the state: Denver, Colorado, last year.", spoken: "Grandma moved to Denver, Colorado, last year." },
  { lead: "After the rain stopped a rainbow appeared.", correct: "After the rain stopped, a rainbow appeared.", choices: ["After the rain stopped, a rainbow appeared.", "After, the rain stopped a rainbow appeared.", "After the rain, stopped a rainbow appeared."], hint: "Put a comma after the introductory clause: After the rain stopped,", spoken: "After the rain stopped, a rainbow appeared." },
  { lead: "Our cousins visited Austin Texas in spring.", correct: "Our cousins visited Austin, Texas, in spring.", choices: ["Our cousins visited Austin, Texas, in spring.", "Our cousins, visited Austin Texas in spring.", "Our cousins visited, Austin Texas in spring."], hint: "Put a comma between the city and the state, and after the state: Austin, Texas, in spring.", spoken: "Our cousins visited Austin, Texas, in spring." },
  { lead: "While Mom cooked dinner we set the table.", correct: "While Mom cooked dinner, we set the table.", choices: ["While Mom cooked dinner, we set the table.", "While, Mom cooked dinner we set the table.", "While Mom cooked, dinner we set the table."], hint: "Put a comma after the opening part: While Mom cooked dinner,", spoken: "While Mom cooked dinner, we set the table." },
];

// ─────────────────────────────────────────────────────────────
// SMART SENTENCE ANALYZER (FOR PARENT SHOW & COPY BOARD)
// ─────────────────────────────────────────────────────────────

const DICT_ARTICLES = new Set(["a", "an", "the"]);
const DICT_PRONOUNS = new Set(["i", "you", "he", "she", "it", "we", "they", "me", "him", "her", "us", "them", "my", "your", "his", "her", "its", "our", "their", "mine", "yours", "ours", "theirs", "this", "that", "these", "those"]);
const DICT_CONJUNCTIONS = new Set(["and", "but", "or", "so", "because", "if", "when", "while", "although", "until", "since", "as"]);
const DICT_PREPOSITIONS = new Set(["in", "on", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "over", "under", "beside", "behind", "across", "near", "off", "out"]);
const DICT_INTERJECTIONS = new Set(["wow", "oh", "ouch", "yay", "hooray", "hey", "hello", "hi", "look", "ah", "oops"]);
const DICT_ADVERBS = new Set(["very", "well", "fast", "hard", "often", "always", "never", "now", "then", "today", "yesterday", "tomorrow", "here", "there", "quite", "really", "too", "so"]);
const DICT_VERBS = new Set([
  "is", "am", "are", "was", "were", "be", "been", "being", "have", "has", "had", "do", "does", "did",
  "can", "could", "will", "would", "shall", "should", "may", "might", "must",
  "run", "runs", "ran", "jump", "jumps", "jumped", "walk", "walks", "walked",
  "eat", "eats", "ate", "eating", "read", "reads", "write", "writes", "wrote",
  "see", "sees", "saw", "seen", "look", "looks", "looked", "play", "plays", "played",
  "like", "likes", "liked", "love", "loves", "loved", "swim", "swims", "swam",
  "sleep", "sleeps", "slept", "dash", "dashes", "dashed", "say", "says", "said",
  "yell", "yells", "yelled", "shout", "shouts", "shouted", "ask", "asks", "asked",
  "laugh", "laughs", "laughed", "cry", "cries", "cried", "sing", "sings", "sang",
  "dance", "dances", "danced", "fly", "flies", "flew", "hop", "hops", "hopped",
  "bark", "barks", "barked", "purr", "purrs", "purred", "shine", "shines", "shone",
  "float", "floats", "floated", "tell", "tells", "told", "paint", "paints", "painted",
  "bake", "bakes", "baked", "climb", "climbs", "climbed", "built", "build", "builds"
]);
const DICT_ADJECTIVES = new Set([
  "red", "blue", "green", "yellow", "orange", "purple", "pink", "black", "white", "gold", "golden", "emerald",
  "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "first", "second", "third",
  "happy", "sad", "silly", "brave", "smart", "clever", "sunny", "funny", "friendly", "fluffy", "sweet", "crunchy",
  "shiny", "soft", "hard", "warm", "cold", "hot", "cool", "loud", "quiet", "quick", "dark", "bright", "wild",
  "cozy", "beautiful", "wonderful", "great", "little", "giant", "big", "small", "tiny", "huge", "tall", "short",
  "curious", "playful", "hungry", "delicious", "chilly", "proud", "kind", "neat", "clean"
]);

/**
 * Analyzes any sentence text, returning tokenized words with Montessori parts of speech,
 * punctuation, and spacing metadata for the Show & Copy board.
 */
export function analyzeSentence(text) {
  const rawWords = String(text ?? "").trim().split(/\s+/).filter(Boolean);
  return rawWords.map((rawWord) => {
    // Strip trailing punctuation
    const clean = rawWord.toLowerCase().replace(/[^a-z0-9']/g, "");
    let pos = "noun";

    if (DICT_ARTICLES.has(clean)) pos = "article";
    else if (DICT_PRONOUNS.has(clean)) pos = "pronoun";
    else if (DICT_CONJUNCTIONS.has(clean)) pos = "conjunction";
    else if (DICT_PREPOSITIONS.has(clean)) pos = "preposition";
    else if (DICT_INTERJECTIONS.has(clean)) pos = "interjection";
    else if (DICT_VERBS.has(clean)) pos = "verb";
    else if (DICT_ADJECTIVES.has(clean)) pos = "adjective";
    else if (DICT_ADVERBS.has(clean) || (clean.endsWith("ly") && clean.length > 3)) pos = "adverb";
    else if (clean.endsWith("ed") && clean.length > 4) pos = "verb";
    else if (clean.endsWith("ing") && clean.length > 5) pos = "verb";
    else if (clean.endsWith("est") || clean.endsWith("er")) pos = "adjective";
    else pos = "noun";

    const isCapital = /^[A-Z]/.test(rawWord);
    const punctMatch = rawWord.match(/([.,!?:;"']+)$/);
    const trailingPunct = punctMatch ? punctMatch[1] : "";

    return {
      raw: rawWord,
      clean,
      pos,
      isCapital,
      trailingPunct,
    };
  });
}


function pseudoRandom(seed) {
  let s = Math.sin(seed++) * 10000;
  return s - Math.floor(s);
}

function shuffle(arr, seed = 0) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(pseudoRandom(seed + i * 31) * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function itemKey(item) {
  return String(item.key || item.spoken || item.sentence || item.prompt || item.lead || item.correct || item.text || "");
}

function pickRotating(bank, seed = 1, avoidKeys = []) {
  const avoidSet = new Set(Array.isArray(avoidKeys) ? avoidKeys : []);
  const sh = shuffle(bank, seed);
  if (!avoidSet.size) return sh.slice(0, QUESTIONS_PER_STAGE);
  const fresh = sh.filter((item) => !avoidSet.has(itemKey(item)));
  const seen = sh.filter((item) => avoidSet.has(itemKey(item)));
  return [...fresh, ...seen].slice(0, QUESTIONS_PER_STAGE);
}

const POS_BANKS = {
  noun: BANK_POS_NOUN,
  verb: BANK_POS_VERB,
  adjective: BANK_POS_ADJECTIVE,
  pronoun: BANK_POS_PRONOUN,
  adverb: BANK_POS_ADVERB,
  preposition: BANK_POS_PREPOSITION,
  conjunction: BANK_POS_CONJUNCTION,
};

/**
 * Returns 5 problems for any stage, optionally seeded for deterministic tests,
 * and rotating away from `avoidKeys` so kids see fresh sentences across practice sessions.
 */
export function makeStage(stage, seed = 1, avoidKeys = []) {
  const s = typeof stage === "string" ? stageById(stage) : stage;
  if (!s) return [];

  switch (s.mode) {
    case "order": {
      const bank = s.world === 1 ? BANK_G1_ORDER : s.world === 2 ? BANK_G2_ORDER : BANK_G3_ORDER;
      const sh = pickRotating(bank, seed, avoidKeys);
      return sh.map((q, idx) => ({
        stageId: s.id,
        key: itemKey(q),
        mode: "order",
        index: idx,
        instruction: "Drag or tap the words in order to build the sentence!",
        targetWords: q.words,
        scrambled: shuffle(q.words, seed + idx * 7),
        tags: q.tags,
        spoken: q.spoken,
        hint: `Start with the capital word "${q.words[0]}"!`,
      }));
    }

    case "capital-start": {
      const sh = pickRotating(BANK_G1_CAPITAL_START, seed, avoidKeys);
      return sh.map((q, idx) => ({
        stageId: s.id,
        key: itemKey(q),
        mode: "capital-start",
        index: idx,
        instruction: "Tap the word that needs a capital letter at the start!",
        broken: q.broken,
        correct: q.correct,
        badWord: q.badWord,
        fixedWord: q.fixedWord,
        hint: q.hint,
        spoken: q.spoken,
      }));
    }

    case "spacing": {
      const sh = pickRotating(BANK_G1_SPACING, seed, avoidKeys);
      return sh.map((q, idx) => ({
        stageId: s.id,
        key: itemKey(q),
        mode: "spacing",
        index: idx,
        instruction: "Tap between the letters where the finger space belongs!",
        squished: q.squished,
        correct: q.correct,
        split: q.split,
        beforeWords: q.beforeWords || [],
        squishedPair: q.squishedPair || q.split,
        afterWords: q.afterWords || [],
        hint: q.hint,
        spoken: q.spoken,
      }));
    }

    case "punct-end": {
      const sh = pickRotating(BANK_G1_PUNCT_END, seed, avoidKeys);
      return sh.map((q, idx) => ({
        stageId: s.id,
        key: itemKey(q),
        mode: "punct-end",
        index: idx,
        instruction: "Pick the ending mark that belongs in the orange box:",
        lead: q.lead,
        answer: q.answer,
        choices: q.choices,
        hint: q.hint,
        spoken: q.spoken,
      }));
    }

    case "capital-names": {
      const sh = pickRotating(BANK_G1_CAPITAL_NAMES, seed, avoidKeys);
      return sh.map((q, idx) => ({
        stageId: s.id,
        key: itemKey(q),
        mode: "capital-names",
        index: idx,
        instruction: 'Tap the words that need a capital letter ("I" and names):',
        sentence: q.sentence,
        tokens: q.tokens,
        fixedSentence: q.fixedSentence,
        hint: q.hint,
        spoken: q.spoken,
      }));
    }

    case "classify": {
      const targetPos = s.targetPos || "noun";
      const meta = PARTS_OF_SPEECH[targetPos];
      const posBank = POS_BANKS[targetPos] || BANK_CLASSIFY;
      const sh = pickRotating(posBank, seed, avoidKeys);
      return sh.map((item, idx) => {
        const matches = item.words.filter((w) => w.pos === targetPos);
        const targetWord = matches.length ? matches[0].word.replace(/[.,!?]/g, "") : item.words[0].word;
        return {
          stageId: s.id,
          key: itemKey(item),
          mode: "classify",
          index: idx,
          targetPos,
          posName: meta.name,
          symbolHtml: montessoriSvg(targetPos, 28),
          instruction: `Tap the ${meta.name} in the sentence:`,
          sentence: item.sentence,
          words: item.words,
          answer: targetWord,
          hint: `${meta.hint} Look for "${targetWord}"!`,
          spoken: `Find the ${meta.name} in: ${item.sentence}`,
        };
      });
    }

    case "choice-plural": {
      const sh = pickRotating(BANK_G1_PLURALS, seed, avoidKeys);
      return sh.map((q, idx) => ({
        stageId: s.id,
        key: itemKey(q),
        mode: "choice",
        subMode: "fill-blank",
        blankPos: "noun",
        clue: `more than one ${q.singular}`,
        index: idx,
        instruction: `Pick the plural word for more than one "${q.singular}":`,
        prompt: q.prompt,
        answer: q.correct,
        choices: shuffle(q.choices, seed + idx),
        hint: q.hint,
        spoken: q.spoken,
      }));
    }

    case "capital-proper": {
      const sh = pickRotating(BANK_G2_PROPER_NOUNS, seed, avoidKeys);
      return sh.map((q, idx) => ({
        stageId: s.id,
        key: itemKey(q),
        mode: "capital-names",
        index: idx,
        instruction: "Tap every proper noun that needs a capital letter:",
        sentence: q.sentence,
        tokens: q.tokens,
        fixedSentence: q.fixedSentence,
        hint: q.hint,
        spoken: q.spoken,
      }));
    }

    case "commas-series": {
      const sh = pickRotating(BANK_G2_COMMAS_SERIES, seed, avoidKeys);
      return sh.map((q, idx) => ({
        stageId: s.id,
        key: itemKey(q),
        mode: "choice",
        subMode: "sentence-pick",
        index: idx,
        instruction: "Tap the sentence with the commas in the right places:",
        prompt: q.lead,
        answer: q.correct,
        choices: shuffle(q.choices, seed + idx),
        hint: q.hint,
        spoken: q.spoken,
      }));
    }

    case "commas-dates": {
      const sh = pickRotating(BANK_G2_COMMAS_DATES, seed, avoidKeys);
      return sh.map((q, idx) => ({
        stageId: s.id,
        key: itemKey(q),
        mode: "choice",
        subMode: "sentence-pick",
        index: idx,
        instruction: "Tap the sentence with the comma in the right place:",
        prompt: q.lead,
        answer: q.correct,
        choices: shuffle(q.choices, seed + idx),
        hint: q.hint,
        spoken: q.spoken,
      }));
    }

    case "contractions": {
      const sh = pickRotating(BANK_G2_CONTRACTIONS, seed, avoidKeys);
      return sh.map((q, idx) => ({
        stageId: s.id,
        key: itemKey(q),
        mode: "choice",
        subMode: "fill-blank",
        blankPos: "verb",
        clue: q.full,
        index: idx,
        instruction: `Pick the contraction for "${q.full}" to fill the space:`,
        prompt: q.prompt,
        answer: q.correct,
        choices: shuffle(q.choices, seed + idx),
        hint: q.hint,
        spoken: q.spoken,
      }));
    }

    case "choice-tense": {
      const sh = pickRotating(BANK_G2_PAST_TENSE, seed, avoidKeys);
      return sh.map((q, idx) => ({
        stageId: s.id,
        key: itemKey(q),
        mode: "choice",
        subMode: "fill-blank",
        blankPos: "verb",
        index: idx,
        instruction: "Pick the past-tense verb to complete the sentence:",
        prompt: q.prompt,
        answer: q.correct,
        choices: shuffle(q.choices, seed + idx),
        hint: q.hint,
        spoken: q.spoken,
      }));
    }

    case "choice-irreg-plural": {
      const sh = pickRotating(BANK_G2_IRREG_PLURALS, seed, avoidKeys);
      return sh.map((q, idx) => ({
        stageId: s.id,
        key: itemKey(q),
        mode: "choice",
        subMode: "fill-blank",
        blankPos: "noun",
        clue: `more than one ${q.singular}`,
        index: idx,
        instruction: `Pick the plural word for more than one "${q.singular}":`,
        prompt: q.prompt,
        answer: q.correct,
        choices: shuffle(q.choices, seed + idx),
        hint: q.hint,
        spoken: q.spoken,
      }));
    }

    case "choice-fragment": {
      const sh = pickRotating(BANK_G2_FRAGMENTS, seed, avoidKeys);
      return sh.map((q, idx) => ({
        stageId: s.id,
        key: itemKey(q),
        mode: "choice",
        subMode: "fragment",
        sentence: q.sentence,
        index: idx,
        instruction: "Read the word blocks. Is this a complete sentence or a fragment?",
        prompt: q.sentence,
        answer: q.isComplete ? "Complete Sentence" : "Fragment",
        choices: ["Complete Sentence", "Fragment"],
        hint: q.hint,
        spoken: q.spoken,
      }));
    }

    case "quotes": {
      const sh = pickRotating(BANK_G3_QUOTES, seed, avoidKeys);
      return sh.map((q, idx) => ({
        stageId: s.id,
        key: itemKey(q),
        mode: "choice",
        subMode: "sentence-pick",
        index: idx,
        instruction: "Tap the sentence with the correct quotation marks:",
        prompt: q.lead,
        answer: q.correct,
        choices: shuffle(q.choices, seed + idx),
        hint: q.hint,
        spoken: q.spoken,
      }));
    }

    case "choice-possessive": {
      const sh = pickRotating(BANK_G3_POSSESSIVES, seed, avoidKeys);
      return sh.map((q, idx) => ({
        stageId: s.id,
        key: itemKey(q),
        mode: "choice",
        subMode: "fill-blank",
        blankPos: "noun",
        clue: q.owner,
        index: idx,
        instruction: `Pick the possessive noun (${q.owner}) to fill the space:`,
        prompt: q.prompt,
        answer: q.correct,
        choices: shuffle(q.choices, seed + idx),
        hint: q.hint,
        spoken: q.spoken,
      }));
    }

    case "choice-agreement": {
      const sh = pickRotating(BANK_G3_AGREEMENT, seed, avoidKeys);
      return sh.map((q, idx) => ({
        stageId: s.id,
        key: itemKey(q),
        mode: "choice",
        subMode: "fill-blank",
        blankPos: "verb",
        index: idx,
        instruction: "Pick the action verb that matches the subject:",
        prompt: q.prompt,
        answer: q.correct,
        choices: shuffle(q.choices, seed + idx),
        hint: q.hint,
        spoken: q.spoken,
      }));
    }

    case "choice-comp": {
      const sh = pickRotating(BANK_G3_COMPARATIVES, seed, avoidKeys);
      return sh.map((q, idx) => ({
        stageId: s.id,
        key: itemKey(q),
        mode: "choice",
        subMode: "fill-blank",
        blankPos: "adjective",
        clue: q.base,
        index: idx,
        instruction: "Pick the comparing word that fits the sentence:",
        prompt: q.prompt,
        answer: q.correct,
        choices: shuffle(q.choices, seed + idx),
        hint: q.hint,
        spoken: q.spoken,
      }));
    }

    case "commas-address": {
      const sh = pickRotating(BANK_G3_COMMAS_ADDRESS, seed, avoidKeys);
      return sh.map((q, idx) => ({
        stageId: s.id,
        key: itemKey(q),
        mode: "choice",
        subMode: "sentence-pick",
        index: idx,
        instruction: "Tap the sentence with the comma in the right place:",
        prompt: q.lead,
        answer: q.correct,
        choices: shuffle(q.choices, seed + idx),
        hint: q.hint,
        spoken: q.spoken,
      }));
    }

    case "montessori-intro": {
      const pool = s.posList || ["article", "adjective", "noun", "verb"];
      const askTypes = pool.length * 2 >= QUESTIONS_PER_STAGE * 2 ? ["symbol", "name"] : ["symbol", "name", "example"];
      const bank = pool.flatMap((pos) => askTypes.map((askType) => ({ key: `${s.id}-${pos}-${askType}`, pos, askType })));
      const sh = pickRotating(bank, seed, avoidKeys);
      return sh.map((item, idx) => {
        const { pos, askType } = item;
        const meta = PARTS_OF_SPEECH[pos];
        const others = shuffle(pool.filter((p) => p !== pos), seed + idx * 13).slice(0, 3);
        const choices = shuffle([pos, ...others], seed + idx * 17);
        const exWord = meta.examples?.[0] || pos;
        const instruction = askType === "symbol"
          ? `Tap the Montessori symbol for ${meta.name} (${meta.desc})!`
          : askType === "example"
            ? `Tap the Montessori symbol for the ${meta.name.toLowerCase()} "${exWord}"!`
            : `Which part of speech uses this Montessori symbol?`;
        return {
          stageId: s.id,
          key: item.key,
          mode: "montessori-intro",
          askType,
          targetPos: pos,
          answer: pos,
          choices,
          index: idx,
          instruction,
          spoken: `${meta.name}! ${meta.desc}.`,
          hint: meta.hint,
        };
      });
    }

    case "analysis": {
      const sh = pickRotating(BANK_CLASSIFY, seed, avoidKeys);
      return sh.map((item, idx) => ({
        stageId: s.id,
        key: itemKey(item),
        mode: "analysis",
        index: idx,
        instruction: "Tap the Montessori symbol for the highlighted word!",
        sentence: item.sentence,
        words: item.words,
        spoken: item.spoken,
        hint: "Black triangle = noun, Red circle = verb, Blue triangle = adjective or article, Purple triangle = pro-noun, Green crescent = preposition.",
      }));
    }

    case "mix": {
      const worldStages = STAGES.filter((st) => st.world === s.world && st.mode !== "mix");
      const chosenStages = shuffle(worldStages, seed).slice(0, QUESTIONS_PER_STAGE);
      return chosenStages.map((sub, i) => {
        const subProblems = makeStage(sub, seed + i * 19, avoidKeys);
        return {
          ...subProblems[0],
          stageId: s.id,
          index: i,
        };
      });
    }

    default:
      return [];
  }
}

/**
 * Returns a child-friendly Lesson Onboarding card + voice explanation + 1 visual example
 * shown before Question 1 of any stage.
 */
export function lessonIntroFor(stage) {
  const s = typeof stage === "string" ? stageById(stage) : stage;
  if (!s) return null;

  if (s.mode === "classify" && s.targetPos) {
    const meta = PARTS_OF_SPEECH[s.targetPos];
    const examples = {
      noun: {
        voice: "Welcome to Nouns! A noun is a naming word for a person, place, animal, or thing. We mark every noun with a big black triangle. In the example below, puppy is a noun because a puppy is an animal!",
        rule: "A <b>Noun</b> names a person, place, animal, or thing.",
        words: [
          { word: "The", pos: "article" },
          { word: "happy", pos: "adjective" },
          { word: "puppy", pos: "noun", focus: true },
          { word: "ran.", pos: "verb" },
        ],
        caption: 'Tap <b>"puppy"</b> because it names an animal!',
      },
      verb: {
        voice: "Welcome to Action Verbs! A verb is an action word that tells what someone or something does, like run, jump, or sing. We mark verbs with a bright red circle. In this example, jumped is the action verb!",
        rule: "A <b>Verb</b> is an action word — it tells what happens!",
        words: [
          { word: "The", pos: "article" },
          { word: "green", pos: "adjective" },
          { word: "frog", pos: "noun" },
          { word: "jumped.", pos: "verb", focus: true },
        ],
        caption: 'Tap <b>"jumped"</b> because jumping is the action!',
      },
      adjective: {
        voice: "Welcome to Adjectives! An adjective is a describing word that tells what kind, what color, or how many, like fluffy, red, or two. We mark adjectives with a medium blue triangle. Here, fluffy describes the kitten!",
        rule: "An <b>Adjective</b> describes a noun (color, size, or how it feels).",
        words: [
          { word: "The", pos: "article" },
          { word: "fluffy", pos: "adjective", focus: true },
          { word: "kitten", pos: "noun" },
          { word: "slept.", pos: "verb" },
        ],
        caption: 'Tap <b>"fluffy"</b> because it describes the kitten!',
      },
      pronoun: {
        voice: "Welcome to pro-nouns! A pro-noun is a little word that takes the place of a noun or name, like she, he, they, we, I, or you. We mark pro-nouns with a tall purple triangle. In this example, She takes the place of a person's name!",
        rule: "A <b>Pronoun</b> takes the place of a noun (<i>she, he, they, we, I, you, it, us</i>).",
        words: [
          { word: "She", pos: "pronoun", focus: true },
          { word: "baked", pos: "verb" },
          { word: "sweet", pos: "adjective" },
          { word: "cookies.", pos: "noun" },
        ],
        caption: 'Tap <b>"She"</b> because it stands in for a person\'s name!',
      },
      adverb: {
        voice: "Welcome to Adverbs! An adverb describes an action verb and tells how, when, or where something happened. Many adverbs end in L-Y, like quickly, softly, or loudly. We mark adverbs with a small orange circle!",
        rule: "An <b>Adverb</b> tells <i>how</i> an action happens (often ending in <b>-ly</b>).",
        words: [
          { word: "The", pos: "article" },
          { word: "puppy", pos: "noun" },
          { word: "ran", pos: "verb" },
          { word: "quickly.", pos: "adverb", focus: true },
        ],
        caption: 'Tap <b>"quickly"</b> because it tells <i>how</i> the puppy ran!',
      },
      preposition: {
        voice: "Welcome to Prepositions! A preposition is a bridge word that shows where or when, like in, on, under, over, or into. We mark prepositions with a green crescent bridge. Here, under shows where the puppy hid!",
        rule: "A <b>Preposition</b> shows position or where (<i>in, on, under, over, into</i>).",
        words: [
          { word: "The", pos: "article" },
          { word: "puppy", pos: "noun" },
          { word: "hid", pos: "verb" },
          { word: "under", pos: "preposition", focus: true },
          { word: "the", pos: "article" },
          { word: "bed.", pos: "noun" },
        ],
        caption: 'Tap <b>"under"</b> because it shows where the puppy hid!',
      },
      conjunction: {
        voice: "Welcome to Conjunctions! A conjunction is a linking word that joins words or ideas together, like and, but, or, so, and because. We mark conjunctions with a pink bar!",
        rule: "A <b>Conjunction</b> connects words or ideas (<i>and, but, or, because, so</i>).",
        words: [
          { word: "Frogs", pos: "noun" },
          { word: "hop", pos: "verb" },
          { word: "and", pos: "conjunction", focus: true },
          { word: "turtles", pos: "noun" },
          { word: "crawl.", pos: "verb" },
        ],
        caption: 'Tap <b>"and"</b> because it links the two parts together!',
      },
    };
    const ex = examples[s.targetPos] || examples.noun;
    const wordsHtml = ex.words.map((w) => {
      const m = PARTS_OF_SPEECH[w.pos] || PARTS_OF_SPEECH.noun;
      return `<div class="word-tile pos-${w.pos} ${w.focus ? "correct-flash onboarding-focus" : ""}">
        <span class="montessori-badge">${montessoriSvg(w.pos, 24)}</span>
        <span>${w.word}</span>
        <span class="pos-tag" style="color:${m.color}">${m.name}</span>
      </div>`;
    }).join("");

    return {
      title: `${meta.name}s`,
      badgeHtml: montessoriSvg(s.targetPos, 44),
      voice: ex.voice,
      rule: ex.rule,
      exampleHtml: `<div class="onboarding-example-row">${wordsHtml}</div><div class="onboarding-caption">${ex.caption}</div>`,
    };
  }

  switch (s.mode) {
    case "order":
      return {
        title: s.title,
        badgeHtml: "🧱",
        voice: "Let's build sentences! Every sentence starts with a capital letter and ends with a punctuation mark. Tap or drag the words in order so the sentence makes sense!",
        rule: "Start with the <b>Capital Word</b> and end with the word that has a <b>. ? or !</b>",
        exampleHtml: `<div class="onboarding-example-row">
          <div class="word-tile pos-article onboarding-focus"><span class="cap-highlight">T</span>he</div>
          <div class="word-tile pos-noun">dog</div>
          <div class="word-tile pos-verb">ran<span class="punct-highlight">.</span></div>
        </div><div class="onboarding-caption"><b>"The"</b> goes first (capital T) and <b>"ran."</b> goes last (period)!</div>`,
      };

    case "capital-start":
      return {
        title: s.title,
        badgeHtml: "🔠",
        voice: "Welcome to Capital Starts! The very first word of every sentence must begin with a big capital letter. Look at all the words in the sentence and tap the word that needs a capital start!",
        rule: "The <b>first word</b> of every sentence always starts with a <b>CAPITAL</b> letter.",
        exampleHtml: `<div class="onboarding-example-row">
          <div class="word-tile">the ❌</div>
          <span class="onboarding-arrow">➜</span>
          <div class="word-tile onboarding-focus"><span class="cap-highlight">T</span>he ✅</div>
          <div class="word-tile">sun</div>
          <div class="word-tile">is</div>
          <div class="word-tile">hot.</div>
        </div><div class="onboarding-caption">Tap <b>"the"</b> at the start to turn it into <b>"The"</b>!</div>`,
      };

    case "spacing":
      return {
        title: s.title,
        badgeHtml: "👉",
        voice: "Welcome to Finger Spaces! Words need a comfy space between them so we can read them clearly. Find the two words that got squished together and tap right between the letters where they should split!",
        rule: "Put a <b>finger space</b> between every word so they aren't squished together!",
        exampleHtml: `<div class="onboarding-example-row">
          <div class="word-tile">The<span style="color:#f97316;font-weight:900">|</span>cat</div>
          <span class="onboarding-arrow">➜</span>
          <div class="word-tile onboarding-focus">The</div>
          <div class="space-indicator">👉</div>
          <div class="word-tile onboarding-focus">cat</div>
          <div class="word-tile">sat.</div>
        </div><div class="onboarding-caption">Tap right between <b>The</b> and <b>cat</b> to split them apart!</div>`,
      };

    case "punct-end":
      return {
        title: s.title,
        badgeHtml: "🎯",
        voice: "Welcome to Ending Punctuation! Every sentence ends with a mark in the orange box. Use a period for a telling sentence, a question mark when asking a question, and an exclamation mark for big excitement!",
        rule: "<b>.</b> tells something &nbsp;•&nbsp; <b>?</b> asks a question &nbsp;•&nbsp; <b>!</b> shows big feeling!",
        exampleHtml: `<div class="onboarding-example-row">
          <div class="word-tile">Where</div>
          <div class="word-tile">is</div>
          <div class="word-tile">my</div>
          <div class="word-tile">hat</div>
          <div class="punct-slot filled onboarding-focus">?</div>
        </div><div class="onboarding-caption">Asking "Where" needs a <b>question mark (?)</b> in the orange box!</div>`,
      };

    case "capital-names":
    case "capital-proper":
      return {
        title: s.title,
        badgeHtml: "👑",
        voice: s.mode === "capital-names"
          ? "Names of people and pets, and the word I by itself, are special! They always start with a capital letter, even in the middle of a sentence."
          : "Proper nouns are special names for days of the week, months, holidays, cities, and people. Tap every proper noun to give it a capital letter!",
        rule: s.mode === "capital-names"
          ? "Always capitalize people's <b>Names</b> and the word <b>\"I\"</b>!"
          : "Capitalize <b>Days, Months, Holidays, Cities,</b> and <b>Names</b>!",
        exampleHtml: `<div class="onboarding-example-row">
          <div class="word-tile">Today</div>
          <div class="word-tile onboarding-focus"><span class="cap-highlight">M</span>aya</div>
          <div class="word-tile">and</div>
          <div class="word-tile onboarding-focus"><span class="cap-highlight">I</span></div>
          <div class="word-tile">played.</div>
        </div><div class="onboarding-caption">Both <b>"Maya"</b> and <b>"I"</b> get capital letters!</div>`,
      };

    case "choice-plural":
    case "choice-irreg-plural":
      return {
        title: s.title,
        badgeHtml: "🐾",
        voice: s.mode === "choice-plural"
          ? "Plural means more than one! Most words add S to mean more than one, like dogs. Words ending in S, X, Z, CH, or SH add E-S, like boxes or foxes. Pick the right plural word to fill the orange space!"
          : "Some plural nouns are tricky and change their spelling instead of adding S! One mouse becomes two mice, one child becomes many children, and one sheep stays sheep!",
        rule: s.mode === "choice-plural"
          ? "Add <b>-s</b> to most nouns, or <b>-es</b> after <b>s, ss, x, ch, sh</b>."
          : "Irregular plurals change spelling (<i>mouse → mice, tooth → teeth, child → children</i>).",
        exampleHtml: `<div class="onboarding-example-row">
          <div class="word-tile">Three</div>
          <div class="word-tile">cute</div>
          <div class="word-tile onboarding-focus">${s.mode === "choice-plural" ? "foxes" : "mice"}</div>
          <div class="word-tile">ran.</div>
        </div><div class="onboarding-caption">Pick the plural word below to pop it into the sentence!</div>`,
      };

    case "choice-tense":
      return {
        title: s.title,
        badgeHtml: "⏳",
        voice: "Past tense verbs tell about actions that already happened yesterday or before! Many verbs add E-D like climbed, while special verbs change spelling, like eat becomes ate and go becomes went!",
        rule: "<b>Past Tense</b> tells what already happened (<i>walk → walked, eat → ate, go → went</i>).",
        exampleHtml: `<div class="onboarding-example-row">
          <div class="word-tile">Yesterday,</div>
          <div class="word-tile">Liam</div>
          <div class="word-tile onboarding-focus">ate</div>
          <div class="word-tile">apples.</div>
        </div><div class="onboarding-caption">Pick the past-tense verb below and watch it fill the sentence!</div>`,
      };

    case "contractions":
      return {
        title: s.title,
        badgeHtml: "✂️",
        voice: "A contraction squishes two words together and uses an apostrophe to show where letters were left out! For example, do not becomes don't, and I am becomes I'm.",
        rule: "An <b>apostrophe (')</b> takes the place of missing letters (<i>do not → don't, can not → can't</i>).",
        exampleHtml: `<div class="onboarding-example-row">
          <div class="word-tile">I</div>
          <div class="word-tile onboarding-focus">can't</div>
          <div class="word-tile">find</div>
          <div class="word-tile">my</div>
          <div class="word-tile">mittens.</div>
        </div><div class="onboarding-caption"><b>can not</b> shortens to <b>can't</b>!</div>`,
      };

    case "choice-fragment":
      return {
        title: s.title,
        badgeHtml: "🧩",
        voice: "A complete sentence must have two parts: a subject that tells who or what, and a verb that tells what happened! If one part is missing, it is called a fragment.",
        rule: "A <b>Complete Sentence</b> tells <i>WHO</i> (subject) + <i>WHAT HAPPENED</i> (verb).",
        exampleHtml: `<div class="onboarding-example-row">
          <div class="word-tile pos-article">The</div>
          <div class="word-tile pos-noun">rabbit</div>
          <div class="word-tile pos-verb onboarding-focus">hopped.</div>
        </div><div class="onboarding-caption">Has <b>who</b> (The rabbit) + <b>action</b> (hopped) = <b>Complete Sentence ✅</b></div>`,
      };

    case "commas-series":
    case "commas-dates":
    case "commas-address":
      return {
        title: s.title,
        badgeHtml: "🍓",
        voice: "Commas help readers pause in the right spot! Use commas between items in a list of three, between the day and year in a date, and between a city and state. Tap the sentence that has the commas in the right place!",
        rule: "Use <b>commas (,)</b> to separate items in a list, dates, greetings, or city and state.",
        exampleHtml: `<div class="onboarding-example-row">
          <div class="word-tile onboarding-focus">I bought apples<span class="punct-highlight">,</span> bananas<span class="punct-highlight">,</span> and grapes. ✅</div>
        </div><div class="onboarding-caption">Tap the sentence option that puts commas in the right spots!</div>`,
      };

    case "quotes":
      return {
        title: s.title,
        badgeHtml: "💬",
        voice: "Quotation marks hug the exact words a person says out loud! Put quotation marks at the beginning and end of what was spoken, with the punctuation mark tucked inside.",
        rule: '<b>Quotation marks (" ")</b> go around the exact words someone speaks!',
        exampleHtml: `<div class="onboarding-example-row">
          <div class="word-tile onboarding-focus"><span class="punct-highlight">"</span>Look at that star!<span class="punct-highlight">"</span> yelled Leo. ✅</div>
        </div><div class="onboarding-caption">Only Leo's spoken words go inside the quotation marks!</div>`,
      };

    case "choice-possessive":
      return {
        title: s.title,
        badgeHtml: "👑",
        voice: "Possessive nouns show who owns something! Add apostrophe S for one owner, like the cat's collar. Put the apostrophe after the S for more than one owner, like the puppies' tails!",
        rule: "<b>One owner</b> adds <b>'s</b> (<i>cat's</i>). <b>Many owners ending in s</b> add <b>s'</b> (<i>puppies'</i>).",
        exampleHtml: `<div class="onboarding-example-row">
          <div class="word-tile">The</div>
          <div class="word-tile onboarding-focus">cat's</div>
          <div class="word-tile">collar</div>
          <div class="word-tile">is</div>
          <div class="word-tile">red.</div>
        </div><div class="onboarding-caption">One cat owns the collar → <b>cat's</b>!</div>`,
      };

    case "choice-agreement":
      return {
        title: s.title,
        badgeHtml: "🤝",
        voice: "Subjects and verbs must agree! When the subject is just one person or animal, the present-tense action verb adds an S, like The puppy eats. When the subject is more than one, the verb does not add S, like The kittens dance!",
        rule: "<b>One</b> subject → verb with <b>-s</b> (<i>puppy eats</i>). <b>More than one</b> → base verb (<i>kittens dance</i>).",
        exampleHtml: `<div class="onboarding-example-row">
          <div class="word-tile">The</div>
          <div class="word-tile">puppy</div>
          <div class="word-tile onboarding-focus">eats</div>
          <div class="word-tile">dinner.</div>
        </div><div class="onboarding-caption">One puppy → <b>eats</b>!</div>`,
      };

    case "choice-comp":
      return {
        title: s.title,
        badgeHtml: "🏔️",
        voice: "When we compare two things, we add E-R or use more, like faster than. When we compare three or more things, we add E-S-T or use most, like the highest mountain!",
        rule: "Compare <b>2 things</b> with <b>-er / more</b>. Compare <b>3+ things</b> with <b>-est / most</b>.",
        exampleHtml: `<div class="onboarding-example-row">
          <div class="word-tile">A</div>
          <div class="word-tile">cheetah</div>
          <div class="word-tile">is</div>
          <div class="word-tile onboarding-focus">faster</div>
          <div class="word-tile">than</div>
          <div class="word-tile">a</div>
          <div class="word-tile">turtle.</div>
        </div><div class="onboarding-caption">Comparing two animals uses <b>-er (faster)</b>!</div>`,
      };

    case "montessori-intro": {
      const list = s.posList || ["article", "adjective", "noun", "verb"];
      const cardsHtml = list.map((p) => {
        const meta = PARTS_OF_SPEECH[p];
        return `<div class="word-tile pos-${p}" style="display:inline-flex;align-items:center;gap:6px;">
          <span class="montessori-badge">${montessoriSvg(p, 20)}</span>
          <span><b>${meta.name}</b></span>
        </div>`;
      }).join("");
      const names = list.map((p) => PARTS_OF_SPEECH[p].name).join(", ");
      return {
        title: s.title,
        badgeHtml: "🔺",
        voice: `Welcome to Montessori Colors and Symbols! Every part of speech has its own special color and shape. Today you will learn ${names}. Let's match them together!`,
        rule: `Each part of speech has its own <b>Montessori color and shape</b>!`,
        exampleHtml: `<div class="onboarding-example-row" style="flex-wrap:wrap;gap:8px;">${cardsHtml}</div>
          <div class="onboarding-caption">Look at the colors and shapes — then match each one!</div>`,
      };
    }

    case "analysis":
      return {
        title: s.title,
        badgeHtml: "🔺",
        voice: "In Montessori Sentence Analysis, we mark every word in a sentence with its grammar symbol! Look at the highlighted word and tap its matching symbol below.",
        rule: "Match each highlighted word in the sentence to its <b>Montessori Symbol</b>!",
        exampleHtml: `<div class="onboarding-example-row">
          <div class="word-tile pos-article"><span class="montessori-badge">${montessoriSvg("article", 20)}</span>The</div>
          <div class="word-tile pos-adjective"><span class="montessori-badge">${montessoriSvg("adjective", 20)}</span>happy</div>
          <div class="word-tile pos-noun onboarding-focus"><span class="montessori-badge">${montessoriSvg("noun", 20)}</span>puppy</div>
          <div class="word-tile pos-verb"><span class="montessori-badge">${montessoriSvg("verb", 20)}</span>ran.</div>
        </div><div class="onboarding-caption">Tap the matching symbol in the tray for each word!</div>`,
      };

    default:
      return {
        title: s.title,
        badgeHtml: s.icon || "⭐",
        voice: `Welcome to ${s.title}! ${s.blurb || s.desc || "Let's review everything you learned!"} Let's practice 5 fun questions together!`,
        rule: s.blurb || s.desc || "Review everything you learned in this grade!",
        exampleHtml: "",
      };
  }
}
