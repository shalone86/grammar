// Montessori Play Mat: Free play sentence workshop.
// Kids can build sentences freely, explore Montessori parts of speech, test finger spacing,
// reorder tiles with drag-and-drop, and hear their creations read aloud!

import { PARTS_OF_SPEECH, montessoriSvg } from "./grammar.js";
import { sfx } from "./kit/sound.js";
import { speak, stop } from "./kit/tts.js";
import * as FX from "./kit/fx.js";
import { wordTileHtml, attachSentenceOrganizer } from "./board.js";

const MAT_WORDS = {
  article: ["The", "A", "An", "the", "a", "an"],
  adjective: ["happy", "silly", "brave", "tiny", "giant", "shiny", "fluffy", "golden", "purple", "sweet", "crunchy", "fast"],
  noun: ["cat", "dog", "dragon", "astronaut", "robot", "puppy", "pizza", "spaceship", "monkey", "star", "tree", "river"],
  pronoun: ["I", "you", "he", "she", "it", "we", "they", "me", "him", "her", "us"],
  verb: ["runs", "jumped", "dances", "eats", "flew", "sleeps", "painted", "smiles", "plays", "swam", "is", "was"],
  adverb: ["quickly", "softly", "loudly", "happily", "carefully", "brightly", "wildly", "slowly", "always", "here"],
  preposition: ["in", "on", "under", "over", "through", "beside", "behind", "between", "with"],
  conjunction: ["and", "but", "or", "so", "because"],
  punctuation: [".", "?", "!", ",", '"', "'"],
};

const SURPRISE_SENTENCES = [
  [
    { word: "The", pos: "article" },
    { word: "fluffy", pos: "adjective" },
    { word: "cat", pos: "noun" },
    { word: "jumped", pos: "verb" },
    { word: "over", pos: "preposition" },
    { word: "the", pos: "article" },
    { word: "moon.", pos: "noun" },
  ],
  [
    { word: "A", pos: "article" },
    { word: "brave", pos: "adjective" },
    { word: "astronaut", pos: "noun" },
    { word: "eats", pos: "verb" },
    { word: "crunchy", pos: "adjective" },
    { word: "pizza", pos: "noun" },
    { word: "in", pos: "preposition" },
    { word: "space!", pos: "noun" },
  ],
  [
    { word: "Three", pos: "adjective" },
    { word: "silly", pos: "adjective" },
    { word: "monkeys", pos: "noun" },
    { word: "danced", pos: "verb" },
    { word: "happily.", pos: "adverb" },
  ],
  [
    { word: "We", pos: "pronoun" },
    { word: "love", pos: "verb" },
    { word: "reading", pos: "noun" },
    { word: "and", pos: "conjunction" },
    { word: "writing", pos: "noun" },
    { word: "stories!", pos: "noun" },
  ],
];

export function viewMat(app) {
  let activeTab = "noun";
  let sentence = [
    { word: "The", pos: "article" },
    { word: "happy", pos: "adjective" },
    { word: "puppy", pos: "noun" },
    { word: "runs", pos: "verb" },
    { word: "quickly.", pos: "adverb" },
  ];
  let showSymbols = true;
  let showSpaces = false;
  let organizer = null;

  app.innerHTML = `
    <section class="mat-section">
      <div class="mat-head">
        <div>
          <h1>Montessori Grammar Mat</h1>
          <p class="muted small">Tap words to add them to your sentence. Drag or tap to reorder. Press 🔊 to hear your sentence!</p>
        </div>
      </div>

      <!-- Live Sentence Construction Rail -->
      <div class="mat-rail-container card">
        <div class="mat-rail-topbar">
          <span class="mat-rail-title">Sentence Strip:</span>
          <div class="mat-toggles">
            <label class="mat-toggle-label">
              <input type="checkbox" id="mat-toggle-sym" ${showSymbols ? "checked" : ""}>
              <span>Montessori Symbols</span>
            </label>
            <label class="mat-toggle-label">
              <input type="checkbox" id="mat-toggle-space" ${showSpaces ? "checked" : ""}>
              <span>Finger Spaces</span>
            </label>
          </div>
        </div>

        <div class="mat-sentence-rail" aria-live="polite"></div>

        <div class="mat-actions row center mt-3">
          <button class="btn big primary mat-speak-btn" data-speak-all>🔊 Read Sentence</button>
          <button class="btn mat-surprise-btn" data-surprise>🎲 Surprise Idea</button>
          <button class="btn danger mat-clear-btn" data-clear>🧹 Clear</button>
        </div>
      </div>

      <!-- Montessori Word Drawers -->
      <div class="mat-drawer-tabs" role="tablist">
        ${Object.keys(MAT_WORDS).map((key) => {
          const meta = PARTS_OF_SPEECH[key];
          const name = meta ? meta.name : "Punctuation";
          const icon = meta ? montessoriSvg(key, 18) : "🛑";
          return `
            <button class="mat-tab-btn${key === activeTab ? " active" : ""}" data-tab="${key}" role="tab" aria-selected="${key === activeTab}">
              <span class="tab-icon">${icon}</span>
              <span class="tab-label">${name}</span>
            </button>`;
        }).join("")}
      </div>

      <div class="mat-drawer-tray card">
        <div class="mat-drawer-words"></div>
      </div>
    </section>`;

  const railEl = app.querySelector(".mat-sentence-rail");
  const wordsEl = app.querySelector(".mat-drawer-words");
  const tabsContainer = app.querySelector(".mat-drawer-tabs");

  function renderSentence() {
    organizer?.cleanup?.();

    if (sentence.length === 0) {
      railEl.innerHTML = `<p class="muted center py-4">Your sentence strip is empty! Tap words from the drawer below to start building.</p>`;
      return;
    }

    const slotsHtml = sentence.map((item, idx) => {
      const symHtml = showSymbols && item.pos && PARTS_OF_SPEECH[item.pos]
        ? `<span class="tile-msym">${montessoriSvg(item.pos, 20)}</span>`
        : "";
      const spaceHtml = showSpaces && idx < sentence.length - 1
        ? `<span class="mat-space-indicator">⎵</span>`
        : "";
      const posClass = item.pos ? ` pos-${item.pos}` : "";
      return `
        <div class="track-slot mat-slot" data-slot="${idx}">
          <div class="word-tile mat-tile${posClass}"
               data-word="${item.word}"
               data-pos="${item.pos || ""}"
               data-idx="${idx}"
               role="button"
               tabindex="0">
            ${symHtml}
            <span class="tile-text">${item.word}</span>
            <button class="tile-remove-btn" data-remove="${idx}" title="Remove word" aria-label="Remove ${item.word}">✕</button>
          </div>
          ${spaceHtml}
        </div>`;
    }).join("");

    railEl.innerHTML = `<div class="mat-rail-track track-slots">${slotsHtml}</div>`;

    // Attach drag/drop & tap-to-swap
    organizer = attachSentenceOrganizer({
      trackEl: railEl,
      bankEl: wordsEl,
      targetWords: sentence.map((s) => s.word),
      tags: sentence.map((s) => s.pos),
      onOrderChange: (newOrder) => {
        // Rebuild sentence array matching newOrder
        const newSentence = [];
        newOrder.forEach((w) => {
          const match = sentence.find((item) => item.word === w);
          if (match) newSentence.push(match);
        });
        sentence = newSentence;
      },
    });

    // Wire up remove buttons
    railEl.querySelectorAll("[data-remove]").forEach((btn) => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const idx = +btn.dataset.remove;
        sfx.back();
        sentence.splice(idx, 1);
        renderSentence();
      };
    });
  }

  function renderDrawer() {
    const list = MAT_WORDS[activeTab] || [];
    const meta = PARTS_OF_SPEECH[activeTab];
    const headerHtml = meta
      ? `<span class="drawer-symbol">${montessoriSvg(activeTab, 24)}</span><b>${meta.name}:</b> <span class="muted small">${meta.hint}</span>`
      : `<b>Punctuation marks:</b> <span class="muted small">End or pause a sentence</span>`;

    const chipsHtml = list.map((w) => {
      const posClass = activeTab !== "punctuation" ? ` pos-${activeTab}` : "";
      const chipSym = meta ? `<span class="chip-msym">${montessoriSvg(activeTab, 16)}</span>` : "";
      return `
        <button class="drawer-chip-btn${posClass}" data-add-word="${w}" data-pos="${activeTab}">
          ${chipSym}
          <span class="chip-label">${w}</span>
        </button>`;
    }).join("");

    wordsEl.innerHTML = `
      <div class="drawer-header-info">${headerHtml}</div>
      <div class="drawer-word-chips">${chipsHtml}</div>`;

    wordsEl.querySelectorAll("[data-add-word]").forEach((btn) => {
      btn.onclick = () => {
        const w = btn.dataset.addWord;
        const pos = btn.dataset.pos;
        sfx.add();
        sentence.push({ word: w, pos: pos === "punctuation" ? null : pos });
        renderSentence();
        // Speak word immediately
        speak(w.replace(/[.,!?]/g, ""), { force: true });
      };
    });
  }

  // Tab switching
  tabsContainer.querySelectorAll("[data-tab]").forEach((btn) => {
    btn.onclick = () => {
      activeTab = btn.dataset.tab;
      sfx.toggle();
      tabsContainer.querySelectorAll("[data-tab]").forEach((b) => {
        b.classList.toggle("active", b.dataset.tab === activeTab);
        b.setAttribute("aria-selected", b.dataset.tab === activeTab);
      });
      renderDrawer();
    };
  });

  // Toggles
  app.querySelector("#mat-toggle-sym").onchange = (e) => {
    showSymbols = e.target.checked;
    sfx.toggle();
    renderSentence();
  };
  app.querySelector("#mat-toggle-space").onchange = (e) => {
    showSpaces = e.target.checked;
    sfx.toggle();
    renderSentence();
  };

  // Actions
  app.querySelector("[data-speak-all]").onclick = () => {
    if (sentence.length === 0) return;
    const text = sentence.map((s) => s.word).join(" ");
    sfx.right();
    FX.confetti(20);
    speak(text, { force: true });
  };

  app.querySelector("[data-surprise]").onclick = () => {
    sfx.pop();
    const pickSentence = SURPRISE_SENTENCES[Math.floor(Math.random() * SURPRISE_SENTENCES.length)];
    sentence = structuredClone(pickSentence);
    renderSentence();
    const text = sentence.map((s) => s.word).join(" ");
    speak(text, { force: true });
  };

  app.querySelector("[data-clear]").onclick = () => {
    sfx.back();
    sentence = [];
    renderSentence();
  };

  renderSentence();
  renderDrawer();

  return () => {
    organizer?.cleanup?.();
    stop();
  };
}
