import { test } from "node:test";
import assert from "node:assert/strict";
import { USAGE_BANKS } from "../public/js/usage.js";
import { STAGES, makeStage, lessonIntroFor } from "../public/js/grammar.js";

test("word-pair sentences: one blank, the answer among two or three choices, a hint, no repeats", () => {
  for (const [name, bank] of Object.entries(USAGE_BANKS)) {
    assert.ok(bank.length >= 12, `${name}: enough sentences`);
    assert.equal(new Set(bank.map((q) => q.prompt)).size, bank.length, `${name}: repeated sentence`);
    for (const q of bank) {
      assert.equal(q.prompt.split("_____").length, 2, `${q.prompt}: one blank`);
      assert.ok(q.choices.includes(q.correct), `${q.prompt}: answer among choices`);
      assert.ok(q.choices.length >= 2 && q.choices.length <= 3, `${q.prompt}: 2 or 3 choices`);
      assert.equal(new Set(q.choices).size, q.choices.length, `${q.prompt}: duplicate choice`);
      assert.ok(q.hint && !/undefined/.test(q.hint), `${q.prompt}: hint`);
      // A capital answer only at the start of the sentence, and the other way round.
      if (q.correct !== "I") assert.equal(/^[A-Z]/.test(q.correct), q.prompt.startsWith("_____"), `${q.prompt}: capital only at the start`); // "I" is always a capital
      assert.match(q.spoken, /[.?!]$/);
    }
  }
});

test("the word-pair levels make five questions each and have a How it works card", () => {
  const levels = STAGES.filter((s) => s.mode === "choice-usage");
  assert.equal(levels.length, 5);
  for (const s of levels) {
    assert.ok(lessonIntroFor(s)?.voice, `${s.id}: intro`);
    for (let seed = 1; seed < 60; seed++) {
      const qs = makeStage(s, seed, []);
      assert.equal(qs.length, 5, s.id);
      for (const q of qs) assert.ok(q.choices.includes(q.answer) && q.prompt && q.instruction, s.id);
    }
  }
});
