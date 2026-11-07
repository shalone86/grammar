// Show & Copy Board: Parent & Teacher Presentation Tool.
// Type any word or sentence to display it big on screen for children to copy,
// with optional handwriting guide lines, Montessori grammar symbols, and finger spaces.

import { analyzeSentence, PARTS_OF_SPEECH, montessoriSvg } from "./grammar.js";
import { sfx } from "./kit/sound.js";
import { speak, stop } from "./kit/tts.js";
import * as FX from "./kit/fx.js";
import { esc } from "./kit/ui.js";

const PRESETS = [
  { label: "🐣 I see a cat.", text: "I see a cat." },
  { label: "🐣 The sun is hot.", text: "The sun is hot." },
  { label: "🦊 On Friday, Maya visited Boston.", text: "On Friday, Maya visited Boston." },
  { label: "🦊 We packed apples, grapes, and crackers.", text: "We packed apples, grapes, and crackers." },
  { label: '🦉 "Look at that star!" yelled Leo.', text: '"Look at that star!" yelled Leo.' },
  { label: "🦉 A brave astronaut floated through space.", text: "A brave astronaut floated through space." },
];

export function viewCopy(app) {
  let currentText = "The friendly cat ran quickly.";
  let showMontessori = true;
  let showHandwritingLines = false;
  let showFingerSpaces = true;
  let highlightCapPunct = true;
  let giantMode = false;

  app.innerHTML = `
    <section class="copy-board-section">
      <div class="copy-topbar">
        <div>
          <h1>Show & Copy Board</h1>
          <p class="muted small">Type any word or sentence below to display it big for kids to copy on paper or a whiteboard.</p>
        </div>
      </div>

      <!-- Input and Presets Card -->
      <div class="card copy-input-card">
        <div class="copy-input-row">
          <input type="text" id="copy-text-input" class="copy-text-input" value="${esc(currentText)}" placeholder="Type a word or sentence here…" autocomplete="off">
          <button class="btn big primary copy-update-btn" data-update>Show Big ✨</button>
        </div>
        <div class="copy-presets-row">
          <span class="muted small">Quick ideas:</span>
          ${PRESETS.map((p, i) => `<button class="btn small copy-preset-btn" data-preset="${i}">${p.label}</button>`).join(" ")}
          <button class="btn small danger" data-clear-input>Clear</button>
        </div>
      </div>

      <!-- Toggles Bar -->
      <div class="copy-toggles-bar card">
        <label class="copy-toggle-item">
          <input type="checkbox" id="toggle-montessori" ${showMontessori ? "checked" : ""}>
          <span>Montessori Symbols</span>
        </label>
        <label class="copy-toggle-item">
          <input type="checkbox" id="toggle-lines" ${showHandwritingLines ? "checked" : ""}>
          <span>Handwriting Lines</span>
        </label>
        <label class="copy-toggle-item">
          <input type="checkbox" id="toggle-spaces" ${showFingerSpaces ? "checked" : ""}>
          <span>Finger Spaces</span>
        </label>
        <label class="copy-toggle-item">
          <input type="checkbox" id="toggle-cap-punct" ${highlightCapPunct ? "checked" : ""}>
          <span>Capitals & Punctuation</span>
        </label>
        <label class="copy-toggle-item">
          <input type="checkbox" id="toggle-giant" ${giantMode ? "checked" : ""}>
          <span>Giant Font (64px)</span>
        </label>
      </div>

      <!-- Big Screen Display Area -->
      <div class="card copy-screen-card" id="copy-screen-card">
        <div class="copy-screen-inner" id="copy-display"></div>
      </div>

      <!-- Action Buttons -->
      <div class="row center mt-4">
        <button class="btn big primary copy-speak-all-btn" data-speak-all>🔊 Read Out Loud</button>
        <button class="btn big copy-clipboard-btn" data-copy-clip>📋 Copy Text</button>
        <a class="btn big" href="#/">🏠 Home</a>
      </div>
    </section>`;

  const inputEl = app.querySelector("#copy-text-input");
  const displayEl = app.querySelector("#copy-display");
  const screenCard = app.querySelector("#copy-screen-card");

  function renderBoard() {
    const text = currentText.trim();
    if (!text) {
      displayEl.innerHTML = `<p class="muted center py-5">Type something above and press <b>Show Big ✨</b></p>`;
      return;
    }

    const tokens = analyzeSentence(text);

    screenCard.classList.toggle("handwriting-lines", showHandwritingLines);
    screenCard.classList.toggle("giant-font", giantMode);

    displayEl.innerHTML = `
      <div class="copy-words-row">
        ${tokens.map((tok, i) => {
          const meta = PARTS_OF_SPEECH[tok.pos];
          const posClass = tok.pos ? ` pos-${tok.pos}` : "";
          const capClass = highlightCapPunct && tok.isCapital ? " has-cap" : "";
          const punctClass = highlightCapPunct && tok.trailingPunct ? " has-punct" : "";

          const symHtml = showMontessori && meta
            ? `<div class="copy-sym-badge" title="${meta.name}">${montessoriSvg(tok.pos, giantMode ? 26 : 22)}<span class="copy-pos-name">${meta.name}</span></div>`
            : "";

          const spaceHtml = showFingerSpaces && i < tokens.length - 1
            ? `<span class="copy-finger-space" title="Finger space between words"><span class="space-pill">👉 ⎵</span></span>`
            : "";

          return `
            <div class="copy-word-item${posClass}${capClass}${punctClass}" data-word="${esc(tok.clean)}">
              ${symHtml}
              <div class="copy-word-text" title="Tap to hear this word">
                ${tok.raw}
              </div>
            </div>
            ${spaceHtml}`;
        }).join("")}
      </div>`;

    // Click individual words to speak
    displayEl.querySelectorAll(".copy-word-item").forEach((el) => {
      el.onclick = () => {
        const w = el.dataset.word;
        sfx.click();
        speak(w, { force: true });
        FX.pop(el, 1.15);
      };
    });
  }

  // Event handlers
  app.querySelector("[data-update]").onclick = () => {
    currentText = inputEl.value;
    sfx.click();
    renderBoard();
  };

  inputEl.onkeydown = (e) => {
    if (e.key === "Enter") {
      currentText = inputEl.value;
      sfx.click();
      renderBoard();
    }
  };

  app.querySelectorAll("[data-preset]").forEach((btn) => {
    btn.onclick = () => {
      const idx = +btn.dataset.preset;
      currentText = PRESETS[idx].text;
      inputEl.value = currentText;
      sfx.select();
      renderBoard();
    };
  });

  app.querySelector("[data-clear-input]").onclick = () => {
    currentText = "";
    inputEl.value = "";
    sfx.back();
    renderBoard();
  };

  app.querySelector("#toggle-montessori").onchange = (e) => {
    showMontessori = e.target.checked;
    sfx.toggle();
    renderBoard();
  };

  app.querySelector("#toggle-lines").onchange = (e) => {
    showHandwritingLines = e.target.checked;
    sfx.toggle();
    renderBoard();
  };

  app.querySelector("#toggle-spaces").onchange = (e) => {
    showFingerSpaces = e.target.checked;
    sfx.toggle();
    renderBoard();
  };

  app.querySelector("#toggle-cap-punct").onchange = (e) => {
    highlightCapPunct = e.target.checked;
    sfx.toggle();
    renderBoard();
  };

  app.querySelector("#toggle-giant").onchange = (e) => {
    giantMode = e.target.checked;
    sfx.toggle();
    renderBoard();
  };

  app.querySelector("[data-speak-all]").onclick = () => {
    if (!currentText.trim()) return;
    sfx.right();
    FX.confetti(20);
    speak(currentText, { force: true });
  };

  app.querySelector("[data-copy-clip]").onclick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentText);
      sfx.snap();
      const btn = app.querySelector("[data-copy-clip]");
      btn.textContent = "✓ Copied!";
      setTimeout(() => { btn.textContent = "📋 Copy Text"; }, 2000);
    }
  };

  renderBoard();

  return () => {
    stop();
  };
}
