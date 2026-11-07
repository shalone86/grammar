// Watch How: auto-playing animated worked example with narration.
// Kids can relax, watch how grammar works, and listen before trying themselves.

import { makeStage, PARTS_OF_SPEECH, montessoriSvg } from "./grammar.js";
import { sfx } from "./kit/sound.js";
import { speak, stop } from "./kit/tts.js";
import * as FX from "./kit/fx.js";
import { say, esc } from "./kit/ui.js";
import { wordTileHtml } from "./board.js";

export function viewWatch(app, stageId, { onPlay } = {}) {
  const stage = typeof stageId === "string" ? { id: stageId, title: "Watch How" } : stageId;
  const problems = makeStage(stage.id, 42);
  const q = problems[0];

  app.innerHTML = `
    <section class="watch-stage">
      <div class="watch-top">
        <a class="icon-btn" href="#/" aria-label="Exit">✕</a>
        <h2>🎬 Watch How: ${esc(q.instruction)}</h2>
      </div>
      <div class="bubble" aria-live="polite">
        <span class="mascot" aria-hidden="true">🦉</span>
        <p class="say">Let's watch how to solve this step by step!</p>
      </div>
      <div class="card watch-screen"></div>
      <div class="row center mt-4">
        <a class="btn big primary pulse" href="#/play/${stage.id}">▶ Try It Myself!</a>
      </div>
    </section>`;

  const bubble = app.querySelector(".bubble");
  const screen = app.querySelector(".watch-screen");
  let alive = true;

  (async () => {
    await FX.sleep(400);
    if (!alive) return;

    if (q.mode === "order") {
      say(bubble, "Let's put the scrambled words in order. First, look for the word with a capital letter!");
      screen.innerHTML = `
        <div class="order-watch-track">
          <div class="track-slots">
            ${q.targetWords.map((_, i) => `<div class="track-slot" data-slot="${i}"></div>`).join("")}
          </div>
          <div class="bank-tray mt-4">
            ${q.scrambled.map((w, i) => wordTileHtml(w, q.tags?.[i] || null, { index: i, draggable: false })).join("")}
          </div>
        </div>`;

      await FX.sleep(2200);
      if (!alive) return;

      const slots = screen.querySelectorAll(".track-slot");
      for (let i = 0; i < q.targetWords.length && alive; i++) {
        const word = q.targetWords[i];
        const tile = Array.from(screen.querySelectorAll(".word-tile")).find((t) => t.dataset.word === word && !t.classList.contains("placed"));

        if (tile) {
          tile.classList.add("placed");
          say(bubble, i === 0 ? `"${word}" starts with a capital letter, so it goes first!` : `Next comes "${word}"!`);
          sfx.lift();
          await FX.sleep(600);
          if (!alive) return;

          slots[i].appendChild(tile);
          sfx.land();
          FX.pop(tile, 1.2);
          await FX.sleep(1200);
        }
      }

      if (!alive) return;
      sfx.right();
      FX.confetti(25);
      say(bubble, `Complete sentence: "${q.spoken}"!`);
    } else if (q.mode === "spacing") {
      say(bubble, "Look how squished these words are! Tap right between the two words to split them apart.");
      const pair = q.squishedPair || q.split;
      screen.innerHTML = `
        <div class="sentence-spacing-strip">
          ${(q.beforeWords || []).map((w) => `<div class="word-tile static-word-tile">${esc(w)}</div>`).join("")}
          <div class="squished-word-tile" data-watch-squish>${esc(pair[0])}<span style="color:#f97316">|</span>${esc(pair[1])}</div>
          ${(q.afterWords || []).map((w) => `<div class="word-tile static-word-tile">${esc(w)}</div>`).join("")}
        </div>`;

      await FX.sleep(2200);
      if (!alive) return;

      sfx.space();
      const sq = screen.querySelector("[data-watch-squish]");
      if (sq) {
        sq.outerHTML = `
          <div class="word-tile spaced-word-tile">${esc(pair[0])}</div>
          <div class="finger-space-badge">👉</div>
          <div class="word-tile spaced-word-tile">${esc(pair[1])}</div>`;
      }
      sfx.right();
      FX.confetti(20);
      say(bubble, `Ah, so much better! "${q.correct}"`);
    } else if (q.mode === "capital-start" || q.mode === "capital-names") {
      say(bubble, q.hint);
      const beforeText = q.broken || q.sentence;
      const afterText = q.correct || q.fixedSentence;
      screen.innerHTML = `
        <div class="onboarding-example-row">
          <div class="word-tile">${esc(beforeText)}</div>
        </div>`;
      await FX.sleep(2000);
      if (!alive) return;
      sfx.cap();
      sfx.right();
      FX.confetti(20);
      screen.innerHTML = `
        <div class="onboarding-example-row">
          <div class="word-tile onboarding-focus">${esc(afterText)} ✅</div>
        </div>`;
      say(bubble, `Fixed! "${afterText}"`);
    } else if (q.mode === "classify") {
      const meta = PARTS_OF_SPEECH[q.targetPos];
      say(bubble, `Let's find the ${meta.name}. ${meta.hint}`);
      screen.innerHTML = `
        <div class="classify-watch-box">
          <div class="target-badge mb-3">
            <span>${q.symbolHtml}</span> <b>${meta.name}</b>
          </div>
          <div class="sentence-classify-strip">
            ${q.words.map((w) => `
              <span class="watch-word-pill${w.pos === q.targetPos ? " target-match" : ""}">
                ${esc(w.word)}
              </span>
            `).join(" ")}
          </div>
        </div>`;

      await FX.sleep(2200);
      if (!alive) return;

      const match = screen.querySelector(".target-match");
      if (match) {
        match.classList.add("highlighted");
        sfx.right();
        FX.pop(match, 1.3);
        say(bubble, `Found it! "${q.answer}" is the ${meta.name}!`);
      }
    } else if (q.mode === "analysis") {
      say(bubble, "Watch how each word in the sentence gets its own Montessori grammar symbol!");
      screen.innerHTML = `
        <div class="analysis-sentence-strip">
          ${q.words.map((item, idx) => `
            <div class="analysis-word-col" data-watch-col="${idx}">
              <div class="analysis-sym-slot empty" data-watch-sym="${idx}">?</div>
              <div class="analysis-word-box">${esc(item.word)}</div>
              <div class="analysis-pos-label" data-watch-lbl="${idx}">&nbsp;</div>
            </div>
          `).join("")}
        </div>`;

      for (let i = 0; i < q.words.length && alive; i++) {
        await FX.sleep(900);
        if (!alive) return;
        const item = q.words[i];
        const slot = screen.querySelector(`[data-watch-sym="${i}"]`);
        const lbl = screen.querySelector(`[data-watch-lbl="${i}"]`);
        if (slot) {
          slot.classList.remove("empty");
          slot.innerHTML = montessoriSvg(item.pos, 26);
          FX.pop(slot, 1.25);
        }
        if (lbl) lbl.textContent = PARTS_OF_SPEECH[item.pos]?.name || item.pos;
        sfx.pop();
      }
      if (!alive) return;
      sfx.right();
      FX.confetti(25);
      say(bubble, `Every word is matched! "${q.spoken}"`);
    } else {
      say(bubble, `Here is the question: ${q.instruction}`);
      screen.innerHTML = `
        <div class="choice-watch-box">
          ${q.subMode !== "sentence-pick" ? `<p class="choice-prompt-text mb-4">${esc(q.prompt || q.lead)}</p>` : ""}
          <div class="choices">
            ${(q.choices || [q.answer]).map((c) => `<div class="choice-card${c === q.answer ? " right" : ""}">${esc(c)}</div>`).join("")}
          </div>
        </div>`;

      await FX.sleep(1800);
      if (!alive) return;
      sfx.right();
      FX.confetti(25);
      say(bubble, `The correct answer is "${q.answer}"! ${q.hint}`);
    }
  })();

  return () => {
    alive = false;
    stop();
  };
}
