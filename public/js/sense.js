// Grammar Sense: Fast question generator for quick-fire grammar drills.
// 8 questions per round across Grade 1, Grade 2, and Grade 3.

import { PARTS_OF_SPEECH, montessoriSvg } from "./grammar.js";

export const SENSE_LEVELS = [
  {
    id: "sense-g1",
    grade: 1,
    title: "Grade 1 Sense",
    emoji: "🐣",
    blurb: "Capitals, finger spaces, end marks, and nouns/verbs.",
  },
  {
    id: "sense-g2",
    grade: 2,
    title: "Grade 2 Sense",
    emoji: "🦊",
    blurb: "Proper nouns, commas in lists, contractions, and adverbs.",
  },
  {
    id: "sense-g3",
    grade: 3,
    title: "Grade 3 Sense",
    emoji: "🦉",
    blurb: "Quotes, possessives, prepositions, and subject-verb agreement.",
  },
];

export const SENSE_QUESTIONS_PER_ROUND = 8;

const G1_ITEMS = [
  {
    q: "Which word is a NOUN (person, place, thing)?",
    answer: "puppy",
    choices: ["puppy", "ran", "quickly", "blue"],
    pos: "noun",
    hint: "A noun names a person, place, or thing!",
  },
  {
    q: "Which word is a VERB (action word)?",
    answer: "jumped",
    choices: ["jumped", "apple", "happy", "the"],
    pos: "verb",
    hint: "A verb tells what someone is doing!",
  },
  {
    q: "Which word is an ADJECTIVE (describing word)?",
    answer: "fluffy",
    choices: ["fluffy", "dog", "barked", "they"],
    pos: "adjective",
    hint: "Adjectives describe color, size, or feelings!",
  },
  {
    q: "Which sentence starts with a capital letter correctly?",
    answer: "The sun is warm.",
    choices: ["The sun is warm.", "the sun is warm.", "tHe sun is warm."],
    hint: "The very first letter must be uppercase!",
  },
  {
    q: "Which sentence has proper finger spacing?",
    answer: "A frog can leap.",
    choices: ["A frog can leap.", "Afrog can leap.", "A frogcanleap."],
    hint: "Every word needs space around it!",
  },
  {
    q: "Which mark ends a asking question?",
    answer: "?",
    choices: ["?", ".", "!"],
    hint: "A question mark asks something!",
  },
  {
    q: "What is the plural of 'fox'?",
    answer: "foxes",
    choices: ["foxes", "foxs", "foxies"],
    hint: "Words ending in -x add -es!",
  },
  {
    q: "Which word must ALWAYS be capitalized?",
    answer: "I",
    choices: ["I", "me", "we", "us"],
    hint: "The pronoun 'I' is always uppercase!",
  },
];

const G2_ITEMS = [
  {
    q: "Which word is a PROPER NOUN (specific name)?",
    answer: "Friday",
    choices: ["Friday", "day", "week", "tomorrow"],
    hint: "Days of the week are proper nouns and get capitals!",
  },
  {
    q: "Which contraction stands for 'do not'?",
    answer: "don't",
    choices: ["don't", "dont'", "do'nt"],
    hint: "The apostrophe replaces the missing 'o'!",
  },
  {
    q: "Which word is an ADVERB (tells how)?",
    answer: "softly",
    choices: ["softly", "soft", "pillow", "sleep"],
    pos: "adverb",
    hint: "Adverbs often end in -ly and describe actions!",
  },
  {
    q: "Which sentence has correct commas in a list?",
    answer: "I like apples, pears, and plums.",
    choices: [
      "I like apples, pears, and plums.",
      "I like, apples pears, and plums.",
      "I like apples pears, and plums.",
    ],
    hint: "Separate items with commas: apples, pears, and plums.",
  },
  {
    q: "What is the past tense of 'run'?",
    answer: "ran",
    choices: ["ran", "runned", "running"],
    hint: "Yesterday they ran!",
  },
  {
    q: "What is the plural of 'child'?",
    answer: "children",
    choices: ["children", "childs", "childrens"],
    hint: "One child, two children!",
  },
  {
    q: "Which word is a PRONOUN?",
    answer: "she",
    choices: ["she", "Maya", "girl", "person"],
    pos: "pronoun",
    hint: "Pronouns take the place of nouns!",
  },
  {
    q: "Which date has the correct comma?",
    answer: "July 4, 1776",
    choices: ["July 4, 1776", "July, 4 1776", "July 4 1776,"],
    hint: "Put the comma between the day and the year!",
  },
];

const G3_ITEMS = [
  {
    q: "Which sentence has correct dialogue quotation marks?",
    answer: '"Look at that!" shouted Leo.',
    choices: [
      '"Look at that!" shouted Leo.',
      'Look at that! "shouted Leo."',
      '"Look at" that! shouted Leo.',
    ],
    hint: "Quotes wrap the exact spoken words!",
  },
  {
    q: "Which is the correct singular possessive for 'one cat'?",
    answer: "cat's",
    choices: ["cat's", "cats'", "cats"],
    hint: "One cat owns it: cat's!",
  },
  {
    q: "Which word is a PREPOSITION (shows location)?",
    answer: "under",
    choices: ["under", "run", "table", "wooden"],
    pos: "preposition",
    hint: "Prepositions tell where: in, on, under, behind!",
  },
  {
    q: "Which word is a CONJUNCTION (connects ideas)?",
    answer: "because",
    choices: ["because", "quick", "jump", "puppy"],
    pos: "conjunction",
    hint: "Conjunctions glue clauses together!",
  },
  {
    q: "Which verb agrees with 'The puppies' (plural)?",
    answer: "bark",
    choices: ["bark", "barks"],
    hint: "Plural subject takes base verb: The puppies bark.",
  },
  {
    q: "Which word compares two things (comparative)?",
    answer: "faster",
    choices: ["faster", "fastest", "fast"],
    hint: "-er compares two!",
  },
  {
    q: "Which address has the correct comma?",
    answer: "Denver, Colorado",
    choices: ["Denver, Colorado", "Denver Colorado,", "Denver,Colorado"],
    hint: "Separate city from state with a comma!",
  },
  {
    q: "Which sentence is COMPLETE (not a fragment)?",
    answer: "The blue bird sang a song.",
    choices: [
      "The blue bird sang a song.",
      "The blue bird in the tree.",
      "Sang a lovely song today.",
    ],
    hint: "A complete sentence needs both subject and predicate!",
  },
];

export function makeSenseRound(levelId) {
  const bank = levelId === "sense-g1" ? G1_ITEMS : levelId === "sense-g2" ? G2_ITEMS : G3_ITEMS;
  const shuffled = [...bank].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, SENSE_QUESTIONS_PER_ROUND).map((item) => ({
    ...item,
    choices: [...item.choices].sort(() => Math.random() - 0.5),
  }));
}
