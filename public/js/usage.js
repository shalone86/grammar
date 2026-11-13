// Word-pair levels ("usage"): a/an, I/me and we/us, is/are and was/were, has/have/had and
// do/does, and see/run/give with saw/ran/gave. Each sentence has one clear right answer, with a
// time clue ("Yesterday…", "right now") whenever the tense matters. test/usage.test.js checks them.

const item = (prompt, correct, choices, hint) => ({ prompt, correct, choices, hint, spoken: prompt.replace("_____", correct) });

// Grade 1 · a or an (an before a vowel sound: a, e, i, o, u)
const vowel = (w) => `"${w}" starts with a vowel sound, so we say "an".`;
const conson = (w) => `"${w}" starts with a consonant sound, so we say "a".`;
const AN = ["An", "A"], an = ["an", "a"];
export const BANK_A_AN = [
  item("I ate _____ apple at lunch.", "an", an, vowel("apple")),
  item("We saw _____ dog at the park.", "a", an, conson("dog")),
  item("_____ angel told Mary the good news.", "An", AN, vowel("angel")),
  item("Mom packed _____ orange for me.", "an", an, vowel("orange")),
  item("There is _____ owl in the tall tree.", "an", an, vowel("owl")),
  item("Ben has _____ red kite.", "a", an, conson("red")),
  item("I need _____ umbrella in the rain.", "an", an, vowel("umbrella")),
  item("We lit _____ candle at church.", "a", an, conson("candle")),
  item("_____ elephant has a long trunk.", "An", AN, vowel("elephant")),
  item("She drew _____ big star.", "a", an, conson("big")),
  item("I found _____ egg in the nest.", "an", an, vowel("egg")),
  item("Can I have _____ cookie, please?", "a", an, conson("cookie")),
  item("Grandpa told us _____ old story.", "an", an, vowel("old")),
  item("We built _____ igloo out of snow.", "an", an, vowel("igloo")),
  item("_____ bee sat on the flower.", "A", AN, conson("bee")),
];

// Grade 1 · I or me, we or us
const doer = (w) => `"${w}" is the one doing it.`;
const getter = (w) => `"${w}" is the one getting it, after the action word.`;
const IME = ["I", "Me"], me = ["I", "me"], WE = ["We", "Us"], us = ["we", "us"];
export const BANK_I_ME = [
  item("_____ like to play tag.", "I", IME, `${doer("I")} Start with "I".`),
  item("Mom gave _____ a big hug.", "me", me, getter("me")),
  item("Sam and _____ went to the park.", "I", me, `Try it alone: "I went to the park." So it's "Sam and I".`),
  item("Please pass the bread to _____.", "me", me, getter("me")),
  item("_____ pray before every meal.", "We", WE, doer("We")),
  item("Grandma made cookies for _____.", "us", us, getter("us")),
  item("Can you help _____ tie my shoes?", "me", me, getter("me")),
  item("_____ am six years old.", "I", IME, doer("I")),
  item("Father Tom waved to _____ after Mass.", "us", us, getter("us")),
  item("_____ are going to the zoo today.", "We", WE, doer("We")),
  item("The puppy ran to _____.", "me", me, getter("me")),
  item("Will you sing with _____?", "us", us, getter("us")),
  item("_____ can ride my bike.", "I", IME, doer("I")),
  item("Our teacher read a story to _____.", "us", us, getter("us")),
  item("_____ all helped clean the yard.", "We", WE, doer("We")),
];

// Grade 2 · is or are (now), was or were (before)
const isAre = ["is", "are"], wasWere = ["was", "were"];
const one = 'One thing uses "is" now, or "was" before.';
const many = 'More than one (and "you") uses "are" now, or "were" before.';
export const BANK_IS_ARE = [
  item("The cat _____ sleeping on the rug.", "is", isAre, one),
  item("The birds _____ singing in the tree.", "are", isAre, many),
  item("Yesterday, it _____ very cold outside.", "was", wasWere, `"Yesterday" means before. ${one}`),
  item("Last week, we _____ at Grandma's house.", "were", wasWere, `"Last week" means before. ${many}`),
  item("My shoes _____ by the front door.", "are", isAre, many),
  item("The church bell _____ ringing.", "is", isAre, one),
  item("Long ago, Jesus _____ born in Bethlehem.", "was", wasWere, `"Long ago" means before. ${one}`),
  item("You _____ my best friend.", "are", isAre, 'With "you", we always use "are".'),
  item("The apples _____ red and shiny.", "are", isAre, many),
  item("The sun _____ hot today.", "is", isAre, one),
  item("Last night, the stars _____ so bright.", "were", wasWere, `"Last night" means before. ${many}`),
  item("Last night, the moon _____ full.", "was", wasWere, `"Last night" means before. ${one}`),
  item("Two dogs _____ in the yard right now.", "are", isAre, many),
  item("I _____ tired after the long walk yesterday.", "was", wasWere, '"Yesterday" means before. With "I", we say "I was".'),
  item("The flowers _____ blooming this spring.", "are", isAre, many),
];

// Grade 2 · has, have, had · do, does
const dd = ["do", "does"], DD = ["Do", "Does"];
const has = 'One person or thing (he, she, it) "has".';
const have = 'I, you, we, they, and more than one "have".';
const had = 'For before ("yesterday", "last year"), everyone "had".';
const does = 'One person or thing (he, she, it) "does".';
const doo = 'I, you, we, they, and more than one "do".';
export const BANK_HAS_HAVE = [
  // Each question offers the two words its clue decides between, so only one can be right.
  item("Lily _____ a new puppy.", "has", ["has", "have"], has),
  item("We _____ two cats at home.", "have", ["has", "have"], have),
  item("Yesterday, I _____ a sore throat.", "had", ["have", "had"], had),
  item("The baby _____ blue eyes.", "has", ["has", "have"], has),
  item("My friends _____ red bikes.", "have", ["has", "have"], have),
  item("Last year, our class _____ a pet fish.", "had", ["has", "had"], had),
  item("Father Mark _____ a kind smile.", "has", ["has", "have"], has),
  item("They _____ lunch at noon every day.", "have", ["has", "have"], have),
  item("Long ago, the farmer _____ three cows.", "had", ["has", "had"], had),
  item("I _____ a question for you.", "have", ["has", "have"], have),
  item("Last night, we _____ soup for dinner.", "had", ["have", "had"], had),
  item("_____ you like to read?", "Do", DD, doo),
  item("My dog _____ tricks for treats.", "does", dd, does),
  item("We _____ our chores on Saturday.", "do", dd, doo),
  item("_____ she want to play?", "Does", DD, does),
];

// Grade 2 · see/sees/saw, run/runs/ran, give/gives/gave
const see = ["see", "sees", "saw"], run = ["run", "runs", "ran"], give = ["give", "gives", "gave"];
const now1 = (w) => `One person or thing now adds -s: "${w}".`;
const nowMany = (w) => `I, you, we, they, and more than one: "${w}", no -s.`;
const before = (w) => `It already happened, so it's "${w}".`;
export const BANK_SEE_RUN = [
  item("I can _____ a rainbow from my window!", "see", see, 'After "can", we say "see", with no -s.'),
  item("Max _____ the big bus every morning.", "sees", see, now1("sees")),
  item("Yesterday, we _____ a deer in the woods.", "saw", see, before("saw")),
  item("The dogs _____ in the park every day.", "run", run, nowMany("run")),
  item("Mia _____ to the bus each morning.", "runs", run, now1("runs")),
  item("Last week, Ben _____ in a race.", "ran", run, before("ran")),
  item("We _____ thanks before every meal.", "give", give, nowMany("give")),
  item("Grandpa _____ me a hug every time he visits.", "gives", give, now1("gives")),
  item("Yesterday, Ana _____ her friend a card.", "gave", give, before("gave")),
  item("Long ago, the shepherds _____ the baby Jesus.", "saw", see, before("saw")),
  item("My cat _____ birds from the window every day.", "sees", see, now1("sees")),
  item("They _____ around the track every morning.", "run", run, nowMany("run")),
  item("Last Sunday, we _____ food to help the poor.", "gave", give, before("gave")),
  item("The horses _____ across the field yesterday.", "ran", run, before("ran")),
  item("My sister _____ the dog its dinner every night.", "gives", give, now1("gives")),
];

export const USAGE_BANKS = { "a-an": BANK_A_AN, "i-me": BANK_I_ME, "is-are": BANK_IS_ARE, "has-have": BANK_HAS_HAVE, "see-run": BANK_SEE_RUN };

export const USAGE_INSTRUCTIONS = {
  "a-an": 'Pick "a" or "an":',
  "i-me": "Pick the word that fits:",
  "is-are": "Pick the word that fits:",
  "has-have": "Pick the word that fits:",
  "see-run": "Pick the action word that fits:",
};

/** "How it works" cards: [title badge, rule (HTML), example words with the focus word, voice]. */
export const USAGE_INTROS = {
  "a-an": {
    badge: "🍎",
    rule: 'Say <b>"an"</b> before a vowel sound (<i>a, e, i, o, u</i>): <b>an</b> apple, <b>an</b> owl. Say <b>"a"</b> before other sounds: <b>a</b> dog.',
    words: ["I", "ate", "an", "apple."], focus: 2,
    voice: "Say an before a word that starts with a vowel sound, like an apple, or an owl. Say a before other sounds, like a dog, or a candle. Listen to the next word to choose!",
  },
  "i-me": {
    badge: "🙋",
    rule: 'Use <b>I</b> or <b>we</b> for the one <b>doing</b> it. Use <b>me</b> or <b>us</b> for the one <b>getting</b> it.',
    words: ["Mom", "hugged", "me."], focus: 2,
    voice: "Use I, or we, for the one doing the action: I run. We pray. Use me, or us, for the one getting the action: Mom hugged me. Grandma called us. Tip: with a friend, try it alone first. Sam and I went, because I went!",
  },
  "is-are": {
    badge: "🔔",
    rule: 'One thing: <b>is</b> (now), <b>was</b> (before). More than one, or "you": <b>are</b> (now), <b>were</b> (before).',
    words: ["The", "birds", "are", "singing."], focus: 2,
    voice: "For one thing, say is for now, and was for before. For more than one, or for you, say are for now, and were for before. Look for clues like yesterday or last night!",
  },
  "has-have": {
    badge: "🎒",
    rule: 'He, she, it, or one name: <b>has</b>, <b>does</b>. I, you, we, they: <b>have</b>, <b>do</b>. Before (yesterday): <b>had</b>.',
    words: ["Lily", "has", "a", "puppy."], focus: 1,
    voice: "One person or thing has, and does: Lily has a puppy. I, you, we, and they have, and do: We have two cats. If it already happened, everyone had: Yesterday I had a cold.",
  },
  "see-run": {
    badge: "🏃",
    rule: 'One person now adds <b>-s</b>: she <b>sees</b>, he <b>runs</b>. I, you, we, they: <b>see</b>, <b>run</b>. Already happened: <b>saw</b>, <b>ran</b>, <b>gave</b>.',
    words: ["Mia", "runs", "to", "the", "bus."], focus: 1,
    voice: "When one person does it now, add an S: Mia runs. Max sees. When it's I, you, we, or they, no S: we run, they see. And when it already happened, the word changes: saw, ran, and gave!",
  },
};
