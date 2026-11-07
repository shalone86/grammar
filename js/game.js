// Game runner: plays one stage of 5 questions step by step.
// Manages lesson onboarding, question lifecycles, drag-and-drop, tap-to-swap, feedback, stars, and progression.

import {
  makeStage,
  lessonIntroFor,
  analyzeSentence,
  QUESTIONS_PER_STAGE,
  PARTS_OF_SPEECH,
  montessoriSvg,
} from "./grammar.js";
import { sfx } from "./kit/sound.js";
import * as FX from "./kit/fx.js";
import { say, nextButton, starsFor, showFinish, pick, esc } from "./kit/ui.js";
import { speak, stop as stopTts } from "./kit/tts.js";
import * as S from "./kit/store.js";
import {
  wordTileHtml,
  attachSentenceOrganizer,
  initClassifierExercise,
  initSpacingExercise,
  initCapitalExercise,
} from "./board.js";

const FOLLOWUP_PROMPTS = [
  "Let's try this one!",
  "Now, try this question!",
  "Here comes the next one!",
  "How about this one?",
  "Let's do another one!",
  "Give this one a try!",
  "Ready for the next one? Let's go!",
];

export class Game {
  constructor(app, stage, { onFinish, onAgain } = {}) {
    this.app = app;
    this.stage = stage;
    this.onFinish = onFinish;
    this.onAgain = onAgain;
    this.bubble = app.querySelector(".bubble");
    this.dock = app.querySelector(".dock");
    this.stageEl = app.querySelector(".game-stage");
    this.dots = app.querySelectorAll("[data-dot]");
    this.alive = true;
    this.mistakes = 0;
  }

  async play() {
    // 1. Show Lesson Onboarding + 1 worked example before Question 1
    await this.showOnboarding();
    if (!this.alive) return;

    // 2. Generate 5 rotating questions avoiding recently seen ones
    const seen = S.seenQuestions(this.stage.id);
    const questions = makeStage(this.stage, Math.floor(Math.random() * 10000) + 1, seen);
    S.rememberQuestions(this.stage.id, questions.map((q) => q.key).filter(Boolean));

    for (let k = 0; k < QUESTIONS_PER_STAGE && this.alive; k++) {
      this.updateDots(k);
      const q = questions[k];
      this.dock.innerHTML = "";
      this.stageEl.innerHTML = "";

      if (k === 0 || this.stage.mode === "mix") {
        say(this.bubble, q.instruction);
      } else {
        const leadIn = FOLLOWUP_PROMPTS[(k - 1) % FOLLOWUP_PROMPTS.length];
        const spokenPrompt = q.clue ? `${leadIn} Find ${q.clue}!` : leadIn;
        say(this.bubble, `<b>${leadIn}</b> ${q.instruction}`, { spokenOverride: spokenPrompt });
      }

      let result = { solvedByChild: true };

      if (q.mode === "order") {
        result = await this.playOrder(q);
      } else if (q.mode === "capital-start" || q.mode === "capital-names") {
        result = await this.playCapital(q);
      } else if (q.mode === "spacing") {
        result = await this.playSpacing(q);
      } else if (q.mode === "classify") {
        result = await this.playClassify(q);
      } else if (q.mode === "analysis") {
        result = await this.playAnalysis(q);
      } else {
        result = await this.playChoice(q);
      }

      if (!this.alive) return;

      if (result.solvedByChild) {
        say(this.bubble, `${pick(["Awesome!", "You did it!", "Great job!", "Spot on!"])}`, { speakText: false });
        this.dots[k]?.classList.add("done");
      } else {
        this.dots[k]?.classList.add("assisted");
      }
      S.solvedOne();

      await nextButton(this.dock, k < QUESTIONS_PER_STAGE - 1 ? "Next ▶" : "Finish 🏁");
    }

    if (!this.alive) return;
    this.finish();
  }

  /**
   * Lesson Onboarding Card: Explains the concept with voice + 1 visual example before Question 1.
   * Includes both "Skip ⏭" and "Start Lesson ▶" so kids who already know it can jump right in.
   */
  async showOnboarding() {
    const intro = lessonIntroFor(this.stage);
    if (!intro) return;

    // Hide the speech bubble during onboarding so it doesn't push the card off-screen on mobile
    if (this.bubble) this.bubble.style.display = "none";
    this.dock.innerHTML = "";
    speak(intro.voice);

    this.stageEl.innerHTML = `
      <div class="onboarding-card">
        <div class="onboarding-header">
          <span class="onboarding-badge">${intro.badgeHtml}</span>
          <div style="flex: 1;">
            <div class="onboarding-kicker">How It Works</div>
            <h2 class="onboarding-title">${esc(intro.title)}</h2>
          </div>
          <button type="button" class="btn small ghosty" data-skip-lesson aria-label="Skip intro">Skip ⏭</button>
        </div>
        <p class="onboarding-rule">${intro.rule}</p>
        ${intro.exampleHtml ? `
          <div class="onboarding-example-box">
            <div class="onboarding-example-label">✨ Example</div>
            ${intro.exampleHtml}
          </div>
        ` : ""}
        <div class="onboarding-actions">
          <button type="button" class="btn" data-hear-intro>🔊 Listen</button>
          <button type="button" class="btn ghosty" data-skip-lesson>Skip ⏭</button>
          <button type="button" class="btn big primary pulse" data-start-lesson>Start ▶</button>
        </div>
      </div>`;

    let animTimer = null;
    const animateExample = () => {
      if (animTimer) clearTimeout(animTimer);
      const focusEls = this.stageEl.querySelectorAll(".onboarding-focus");
      focusEls.forEach((f) => {
        f.classList.remove("onboarding-focus-active");
        f.style.opacity = "0.4";
      });
      animTimer = setTimeout(() => {
        if (!this.alive) return;
        focusEls.forEach((f) => {
          f.style.opacity = "1";
          f.classList.add("onboarding-focus-active");
        });
        sfx.pop?.();
      }, 950);
    };
    animateExample();

    const hearBtn = this.stageEl.querySelector("[data-hear-intro]");
    if (hearBtn) {
      hearBtn.onclick = () => {
        sfx.click();
        animateExample();
        speak(intro.voice, { force: true });
      };
    }

    await new Promise((resolve) => {
      let done = false;
      const proceed = () => {
        if (done) return;
        done = true;
        if (animTimer) clearTimeout(animTimer);
        if (this.bubble) this.bubble.style.display = "";
        document.removeEventListener("keydown", onKey);
        stopTts();
        sfx.go?.();
        resolve();
      };
      const onKey = (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          proceed();
        }
      };
      document.addEventListener("keydown", onKey);
      this.app.querySelectorAll("[data-start-lesson], [data-skip-lesson]").forEach((btn) => {
        btn.onclick = proceed;
      });
    });
  }

  updateDots(k) {
    this.dots.forEach((d, idx) => {
      d.classList.toggle("now", idx === k);
    });
  }

  /**
   * Helper for in-place 1st and 2nd mistake handling.
   * Returns true if the question should now end and reveal the guided answer.
   */
  handleMistake(questionMistakes, q) {
    this.mistakes++;
    if (questionMistakes === 1) {
      say(this.bubble, `Not quite! ${q.hint}`);
      return false;
    }
    say(this.bubble, `I'll give you the answer! ${q.hint}`);
    return true;
  }

  /**
   * Sentence Scramble: Drag and drop or tap-to-swap words into order.
   */
  async playOrder(q) {
    const n = q.targetWords.length;
    this.stageEl.innerHTML = `
      <div class="order-game-area">
        <div class="track-container">
          <div class="track-slots" aria-label="Sentence slots">
            ${Array.from({ length: n }, (_, i) => `
              <div class="track-slot" data-slot="${i}" aria-label="Slot ${i + 1}"></div>
            `).join("")}
          </div>
        </div>
        <div class="bank-container">
          <p class="muted small bank-label">Words (drag or tap to place):</p>
          <div class="bank-tray" aria-label="Word bank">
            ${q.scrambled.map((w, i) => {
              const targetIdx = q.targetWords.indexOf(w);
              const pos = targetIdx >= 0 ? q.tags?.[targetIdx] : null;
              return wordTileHtml(w, pos || null, { index: i });
            }).join("")}
          </div>
        </div>
      </div>`;

    const trackEl = this.stageEl.querySelector(".track-slots");
    const bankEl = this.stageEl.querySelector(".bank-tray");

    this.dock.innerHTML = `
      <div class="order-dock-controls">
        <button class="btn big primary check-sentence-btn" data-check>Check Sentence ✓</button>
      </div>`;

    const checkBtn = this.dock.querySelector("[data-check]");
    let questionMistakes = 0;

    return new Promise((resolve) => {
      const organizer = attachSentenceOrganizer({
        trackEl,
        bankEl,
        targetWords: q.targetWords,
        tags: q.tags,
        onOrderChange: (currentOrder) => {
          const filled = currentOrder.filter(Boolean).length;
          checkBtn.disabled = filled < n;
        },
      });

      checkBtn.onclick = async () => {
        const order = organizer.getCurrentOrder();
        const correct = order.length === n && order.every((w, i) => w === q.targetWords[i]);

        if (correct) {
          organizer.cleanup();
          sfx.right();
          FX.confetti(30);
          speak(q.spoken, { force: true });
          resolve({ solvedByChild: true });
        } else {
          sfx.oops();
          FX.shake(trackEl);
          questionMistakes++;
          const shouldReveal = this.handleMistake(questionMistakes, q);
          if (shouldReveal) {
            organizer.cleanup();
            await this.revealAnswer(q);
            resolve({ solvedByChild: false });
          }
        }
      };
    });
  }

  /**
   * Capital letters exercise (in-place mistake handling).
   */
  async playCapital(q) {
    this.dock.innerHTML = "";
    let questionMistakes = 0;
    return new Promise((resolve) => {
      initCapitalExercise(this.stageEl, q, async ({ correct }) => {
        if (correct) {
          if (q.spoken) speak(q.spoken, { force: true });
          resolve({ solvedByChild: true });
        } else {
          questionMistakes++;
          const shouldReveal = this.handleMistake(questionMistakes, q);
          if (shouldReveal) {
            await this.revealAnswer(q);
            resolve({ solvedByChild: false });
          }
        }
      });
    });
  }

  /**
   * Finger spaces exercise (in-place mistake handling).
   */
  async playSpacing(q) {
    this.dock.innerHTML = "";
    let questionMistakes = 0;
    return new Promise((resolve) => {
      initSpacingExercise(this.stageEl, q, async ({ correct }) => {
        if (correct) {
          if (q.spoken) speak(q.spoken, { force: true });
          resolve({ solvedByChild: true });
        } else {
          questionMistakes++;
          const shouldReveal = this.handleMistake(questionMistakes, q);
          if (shouldReveal) {
            await this.revealAnswer(q);
            resolve({ solvedByChild: false });
          }
        }
      });
    });
  }

  /**
   * Montessori parts of speech classification exercise (in-place mistake handling).
   */
  async playClassify(q) {
    this.dock.innerHTML = "";
    let questionMistakes = 0;
    return new Promise((resolve) => {
      initClassifierExercise(this.stageEl, q, async ({ correct }) => {
        if (correct) {
          if (q.spoken) speak(q.spoken, { force: true });
          resolve({ solvedByChild: true });
        } else {
          questionMistakes++;
          const shouldReveal = this.handleMistake(questionMistakes, q);
          if (shouldReveal) {
            await this.revealAnswer(q);
            resolve({ solvedByChild: false });
          }
        }
      });
    });
  }

  /**
   * Multiple choice exercises:
   * - `punct-end`: colorful sentence blocks + empty orange punctuation box at the end
   * - `fill-blank`: colorful sentence blocks + empty orange word slot that fills when answered
   * - `fragment`: colorful sentence blocks on the board + 2 choice buttons below
   * - `sentence-pick`: only the 3 clickable sentence option cards (no unclickable prompt box)
   */
  async playChoice(q) {
    const choices = q.choices || [];
    let questionMistakes = 0;

    if (q.mode === "punct-end") {
      const analyzed = analyzeSentence(q.lead);
      this.stageEl.innerHTML = `
        <div class="punct-stage">
          <div class="sentence-blocks-row">
            ${analyzed.map((tok, i) => wordTileHtml(tok.raw, tok.pos, { index: i, draggable: false })).join("")}
            <div class="punct-slot empty-box" data-punct-box aria-label="Empty ending punctuation box"></div>
          </div>
        </div>`;

      this.dock.innerHTML = `
        <div class="choices punct-choices">
          ${choices.map((c, idx) => `<button class="choice-card punct-choice-card" data-choice-idx="${idx}">${esc(c)}</button>`).join("")}
        </div>`;
    } else if (q.subMode === "fill-blank") {
      // Split around _____ and render colorful word blocks with an empty orange slot
      const rawTokens = String(q.prompt || "").trim().split(/\s+/);
      const solvedSentence = String(q.prompt || "").replace("_____", q.answer);
      const solvedAnalyzed = analyzeSentence(solvedSentence);

      let solvedCursor = 0;
      const blocksHtml = rawTokens.map((tok, i) => {
        if (tok.includes("_____")) {
          const trailing = tok.replace("_____", "");
          const answerWords = String(q.answer).split(/\s+/).length;
          solvedCursor += answerWords;
          return `
            <div class="word-tile blank-slot-tile" data-blank-slot data-trailing="${esc(trailing)}">
              <span class="blank-slot-placeholder">${q.clue ? esc(q.clue) : "___"}</span>
            </div>`;
        }
        const metaTok = solvedAnalyzed[solvedCursor] || { pos: "noun" };
        solvedCursor++;
        return wordTileHtml(tok, metaTok.pos, { index: i, draggable: false });
      }).join("");

      this.stageEl.innerHTML = `
        <div class="choice-stage">
          <div class="sentence-blocks-row">
            ${blocksHtml}
          </div>
        </div>`;

      this.dock.innerHTML = `
        <div class="choices">
          ${choices.map((c, idx) => `<button class="choice-card" data-choice-idx="${idx}">${esc(c)}</button>`).join("")}
        </div>`;
    } else if (q.subMode === "fragment") {
      const analyzed = analyzeSentence(q.sentence || q.prompt);
      this.stageEl.innerHTML = `
        <div class="choice-stage">
          <div class="sentence-blocks-row">
            ${analyzed.map((tok, i) => wordTileHtml(tok.raw, tok.pos, { index: i, draggable: false })).join("")}
          </div>
        </div>`;

      this.dock.innerHTML = `
        <div class="choices fragment-choices">
          ${choices.map((c, idx) => `
            <button class="choice-card fragment-choice-card" data-choice-idx="${idx}">
              ${c === "Complete Sentence" ? "✅ Complete Sentence" : "🧩 Fragment (Missing Part)"}
            </button>
          `).join("")}
        </div>`;
    } else if (q.subMode === "sentence-pick") {
      // Commas & Dialogue Quotations: ONLY show the 3 clickable sentence options!
      this.stageEl.innerHTML = `
        <div class="sentence-pick-stage">
          <div class="sentence-pick-list">
            ${choices.map((c, idx) => `
              <button type="button" class="choice-card sentence-option-card" data-choice-idx="${idx}">
                <span class="option-letter">${String.fromCharCode(65 + idx)}</span>
                <span class="option-sentence">${esc(c)}</span>
              </button>
            `).join("")}
          </div>
        </div>`;
      this.dock.innerHTML = "";
    } else {
      this.stageEl.innerHTML = `
        <div class="choice-stage">
          <div class="choice-prompt-card">
            <p class="choice-prompt-text">${esc(q.prompt || q.lead)}</p>
          </div>
        </div>`;
      this.dock.innerHTML = `
        <div class="choices">
          ${choices.map((c, idx) => `<button class="choice-card" data-choice-idx="${idx}">${esc(c)}</button>`).join("")}
        </div>`;
    }

    // Allow clicking individual word tiles to hear them
    this.stageEl.addEventListener("click", (e) => {
      const speakBtn = e.target.closest("[data-speak-word]");
      if (speakBtn) {
        e.stopPropagation();
        sfx.click();
        speak(speakBtn.dataset.speakWord.replace(/[.,!?]/g, ""), { force: true });
      }
    });

    const fillVisualSlot = () => {
      const punctBox = this.stageEl.querySelector("[data-punct-box]");
      if (punctBox) {
        punctBox.textContent = q.answer;
        punctBox.classList.remove("empty-box");
        punctBox.classList.add("filled", "correct-flash");
        FX.pop(punctBox, 1.3);
      }
      const blankSlot = this.stageEl.querySelector("[data-blank-slot]");
      if (blankSlot) {
        const trailing = blankSlot.dataset.trailing || "";
        const pos = q.blankPos || "noun";
        const meta = PARTS_OF_SPEECH[pos];
        blankSlot.className = `word-tile pos-${pos} filled-slot-tile correct-flash`;
        if (meta) {
          blankSlot.style.setProperty("--tile-color", meta.color);
          blankSlot.style.setProperty("--tile-soft", meta.colorSoft);
          blankSlot.style.setProperty("--tile-ink", meta.colorInk);
        }
        blankSlot.innerHTML = `
          ${meta ? `<span class="tile-msym">${montessoriSvg(pos, 20)}</span>` : ""}
          <span class="tile-text">${esc(q.answer + trailing)}</span>
        `;
        FX.pop(blankSlot, 1.25);
      }
    };

    this.stageEl.revealSolution = fillVisualSlot;

    const allButtons = [
      ...this.stageEl.querySelectorAll("[data-choice-idx]"),
      ...this.dock.querySelectorAll("[data-choice-idx]"),
    ];

    return new Promise((resolve) => {
      allButtons.forEach((btn) => {
        btn.onclick = async () => {
          const idx = Number(btn.dataset.choiceIdx);
          const val = choices[idx];
          sfx.select();

          if (val === q.answer) {
            btn.classList.add("right");
            allButtons.forEach((b) => { b.disabled = true; });
            fillVisualSlot();
            sfx.right();
            FX.confetti(20);
            if (q.spoken) speak(q.spoken, { force: true });
            resolve({ solvedByChild: true });
          } else {
            btn.classList.add("wrong");
            btn.disabled = true;
            sfx.oops();
            FX.shake(btn);
            questionMistakes++;
            const shouldReveal = this.handleMistake(questionMistakes, q);
            if (shouldReveal) {
              allButtons.forEach((b) => { b.disabled = true; });
              await this.revealAnswer(q);
              resolve({ solvedByChild: false });
            }
          }
        };
      });
    });
  }

  /**
   * Full Interactive Montessori Sentence Analysis (`g3-montessori-analysis`):
   * Highlights one word at a time and lets the child tap its matching Montessori grammar symbol!
   */
  async playAnalysis(q) {
    const words = q.words;
    let currentIdx = 0;
    let questionMistakes = 0;

    // Distinct POS options present in Montessori palette
    const paletteKeys = ["article", "adjective", "noun", "pronoun", "verb", "adverb", "preposition", "conjunction"];

    this.stageEl.innerHTML = `
      <div class="analysis-stage">
        <p class="classifier-prompt" data-analysis-prompt>
          Tap the Montessori symbol for <b>"${esc(words[0].word.replace(/[.,!?]/g, ""))}"</b>:
        </p>
        <div class="analysis-sentence-strip">
          ${words.map((item, idx) => `
            <div class="analysis-word-col ${idx === 0 ? "active-word" : ""}" data-word-col="${idx}">
              <div class="analysis-sym-slot empty" data-sym-slot="${idx}">?</div>
              <div class="analysis-word-box">${esc(item.word)}</div>
              <div class="analysis-pos-label" data-pos-label="${idx}">&nbsp;</div>
            </div>
          `).join("")}
        </div>
      </div>`;

    this.dock.innerHTML = `
      <div class="analysis-palette">
        ${paletteKeys.map((posKey) => {
          const m = PARTS_OF_SPEECH[posKey];
          return `
            <button type="button" class="analysis-pos-btn" data-pick-pos="${posKey}">
              <span class="analysis-btn-sym">${montessoriSvg(posKey, 24)}</span>
              <span class="analysis-btn-name">${m.name}</span>
            </button>`;
        }).join("")}
      </div>`;

    const promptEl = this.stageEl.querySelector("[data-analysis-prompt]");
    const markWordSolved = (idx) => {
      const item = words[idx];
      const col = this.stageEl.querySelector(`[data-word-col="${idx}"]`);
      const slot = this.stageEl.querySelector(`[data-sym-slot="${idx}"]`);
      const label = this.stageEl.querySelector(`[data-pos-label="${idx}"]`);
      if (col) {
        col.classList.remove("active-word");
        col.classList.add("solved-word");
      }
      if (slot) {
        slot.classList.remove("empty");
        slot.innerHTML = montessoriSvg(item.pos, 26);
        FX.pop(slot, 1.25);
      }
      if (label) {
        label.textContent = PARTS_OF_SPEECH[item.pos]?.name || item.pos;
      }
    };

    this.stageEl.revealSolution = () => {
      for (let i = currentIdx; i < words.length; i++) {
        markWordSolved(i);
      }
    };

    return new Promise((resolve) => {
      this.dock.querySelectorAll("[data-pick-pos]").forEach((btn) => {
        btn.onclick = async () => {
          if (currentIdx >= words.length) return;
          const pickedPos = btn.dataset.pickPos;
          const targetItem = words[currentIdx];
          sfx.click();

          if (pickedPos === targetItem.pos) {
            sfx.right();
            markWordSolved(currentIdx);
            currentIdx++;
            questionMistakes = 0;

            if (currentIdx >= words.length) {
              FX.confetti(30);
              if (q.spoken) speak(q.spoken, { force: true });
              resolve({ solvedByChild: true });
            } else {
              const nextCol = this.stageEl.querySelector(`[data-word-col="${currentIdx}"]`);
              nextCol?.classList.add("active-word");
              const nextWordClean = words[currentIdx].word.replace(/[.,!?]/g, "");
              if (promptEl) {
                promptEl.innerHTML = `Tap the Montessori symbol for <b>"${esc(nextWordClean)}"</b>:`;
              }
            }
          } else {
            sfx.oops();
            FX.shake(btn);
            questionMistakes++;
            const targetMeta = PARTS_OF_SPEECH[targetItem.pos];
            const customQ = {
              ...q,
              hint: `"${targetItem.word.replace(/[.,!?]/g, "")}" is a ${targetMeta.name}!`,
            };
            const shouldReveal = this.handleMistake(questionMistakes, customQ);
            if (shouldReveal) {
              await this.revealAnswer(q);
              resolve({ solvedByChild: false });
            }
          }
        };
      });
    });
  }

  /**
   * Reveal guided answer if child made 2 mistakes so they see how it works before pressing Next.
   */
  async revealAnswer(q) {
    if (q.mode === "order") {
      const trackEl = this.stageEl.querySelector(".track-slots");
      const bankEl = this.stageEl.querySelector(".bank-tray");
      if (trackEl) {
        trackEl.innerHTML = q.targetWords.map((w, i) => `
          <div class="track-slot" data-slot="${i}">
            ${wordTileHtml(w, q.tags?.[i] || null, { index: i, draggable: false })}
          </div>
        `).join("");
        FX.pop(trackEl, 1.12);
      }
      if (bankEl) bankEl.innerHTML = "";
    } else if (q.mode === "choice" || q.mode === "punct-end") {
      this.stageEl.revealSolution?.();
      const choices = q.choices || [];
      const allButtons = [
        ...this.stageEl.querySelectorAll("[data-choice-idx]"),
        ...this.dock.querySelectorAll("[data-choice-idx]"),
      ];
      allButtons.forEach((btn) => {
        const idx = Number(btn.dataset.choiceIdx);
        if (choices[idx] === q.answer) {
          btn.classList.remove("wrong");
          btn.classList.add("right");
          FX.pop(btn, 1.18);
        }
      });
    } else {
      // capital-start, capital-names, spacing, classify, analysis
      this.stageEl.revealSolution?.();
    }

    sfx.right();
    await new Promise((r) => setTimeout(r, 900));
  }

  finish() {
    const stars = starsFor(this.mistakes);
    showFinish(this.app, {
      id: this.stage.id,
      stars,
      mistakes: this.mistakes,
      title: "Grammar Star!",
      done: `${QUESTIONS_PER_STAGE} challenges solved!`,
      again: `#/play/${this.stage.id}`,
      onAgain: this.onAgain,
      next: null,
    });
    this.onFinish?.({ stars, mistakes: this.mistakes });
  }

  stop() {
    this.alive = false;
  }
}
