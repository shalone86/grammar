// Visual rendering, Montessori symbols, sentence tracks, and drag-and-drop interactions.
// Touch-first PointerEvents with tap-to-swap fallback for accessible play on tablets & phones.

import { PARTS_OF_SPEECH, montessoriSvg } from "./grammar.js";
import { sfx } from "./kit/sound.js";
import { speak } from "./kit/tts.js";
import * as FX from "./kit/fx.js";
import { settings } from "./kit/store.js";

/**
 * Render a word tile HTML with optional Montessori symbol and color badge.
 */
export function wordTileHtml(word, pos = null, { index = 0, draggable = true, selected = false, disabled = false } = {}) {
  const meta = pos ? PARTS_OF_SPEECH[pos] : null;
  const showColors = settings().montessoriColors ?? true;
  const colorStyle = meta && showColors ? `style="--tile-color: ${meta.color}; --tile-soft: ${meta.colorSoft}; --tile-ink: ${meta.colorInk};"` : "";
  const symbol = meta ? `<span class="tile-msym" title="${meta.name}">${montessoriSvg(pos, 20)}</span>` : "";

  return `
    <div class="word-tile${selected ? " selected" : ""}${disabled ? " disabled" : ""}${meta ? ` pos-${pos}` : ""}"
         data-word="${word}"
         data-idx="${index}"
         ${pos ? `data-pos="${pos}"` : ""}
         ${colorStyle}
         ${draggable ? 'touch-action="none"' : ""}
         role="button"
         tabindex="0"
         aria-label="${word}${meta ? `, ${meta.name}` : ""}">
      ${symbol}
      <span class="tile-text">${word}</span>
      <button class="tile-speak-btn" data-speak-word="${word}" aria-label="Listen to ${word}" title="Listen">🔊</button>
    </div>`;
}

/**
 * Creates and attaches the unified PointerEvent drag-and-drop controller
 * with automatic tap-to-swap fallback for all touch and mouse devices.
 */
export function attachSentenceOrganizer({
  trackEl,
  bankEl,
  targetWords,
  tags = [],
  onOrderChange,
  onCheck,
}) {
  let draggedEl = null;
  let ghostEl = null;
  let selectedTile = null;
  let startX = 0, startY = 0;
  let isDragging = false;
  let dropSlots = [];

  function updateSlots() {
    dropSlots = Array.from(trackEl.querySelectorAll(".track-slot")).map((slot, i) => {
      const r = slot.getBoundingClientRect();
      return { el: slot, index: i, rect: r };
    });
  }

  // Speak word when clicking small speaker button
  const handleWordSpeak = (e) => {
    const btn = e.target.closest("[data-speak-word]");
    if (btn) {
      e.stopPropagation();
      const w = btn.dataset.speakWord.replace(/[.,!?]/g, "");
      sfx.click();
      speak(w, { force: true });
    }
  };
  trackEl.addEventListener("click", handleWordSpeak);
  bankEl.addEventListener("click", handleWordSpeak);

  // Tap-to-select and tap-to-swap mechanism
  const handleTileTap = (tile) => {
    if (isDragging) return;
    if (!selectedTile) {
      // Select this tile
      selectedTile = tile;
      tile.classList.add("selected");
      sfx.select();
      tile.animate?.([{ transform: "scale(1)" }, { transform: "scale(1.1)" }, { transform: "scale(1.05)" }], { duration: 200, fill: "forwards" });
    } else if (selectedTile === tile) {
      // Deselect
      selectedTile.classList.remove("selected");
      selectedTile.style.transform = "";
      selectedTile = null;
      sfx.tap();
    } else {
      // Swap or move
      sfx.slide();
      swapOrMoveTiles(selectedTile, tile);
      selectedTile.classList.remove("selected");
      selectedTile.style.transform = "";
      selectedTile = null;
      onOrderChange?.(getCurrentOrder());
    }
  };

  function swapOrMoveTiles(sourceTile, targetTile) {
    const sourceParent = sourceTile.parentElement;
    const targetParent = targetTile.parentElement;

    // FLIP animation capture
    const before = FX.capture([sourceTile, targetTile]);

    // If target is an empty slot
    if (targetTile.classList.contains("track-slot") && !targetTile.querySelector(".word-tile")) {
      targetTile.appendChild(sourceTile);
      sfx.land();
    } else {
      // Swap places
      const temp = document.createElement("div");
      targetParent.insertBefore(temp, targetTile);
      sourceParent.insertBefore(targetTile, sourceTile);
      targetParent.insertBefore(sourceTile, temp);
      temp.remove();
      sfx.snap();
    }

    FX.flip(before, { dur: 280 });
  }

  // Pointer drag events on tiles
  const onPointerDown = (e) => {
    const tile = e.target.closest(".word-tile");
    if (!tile || e.target.closest(".tile-speak-btn")) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;

    tile.setPointerCapture(e.pointerId);
    draggedEl = tile;
    startX = e.clientX;
    startY = e.clientY;
    isDragging = false;
    updateSlots();

    const onPointerMove = (moveEvent) => {
      if (!draggedEl) return;
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      if (!isDragging && Math.hypot(dx, dy) > 8) {
        isDragging = true;
        sfx.lift();

        // Create ghost clone in FX layer
        const r = draggedEl.getBoundingClientRect();
        ghostEl = draggedEl.cloneNode(true);
        ghostEl.classList.add("drag-ghost");
        Object.assign(ghostEl.style, {
          position: "fixed",
          left: `${r.left}px`,
          top: `${r.top}px`,
          width: `${r.width}px`,
          height: `${r.height}px`,
          zIndex: 9999,
          pointerEvents: "none",
          transform: "scale(1.08)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
        });
        document.body.appendChild(ghostEl);
        draggedEl.style.opacity = "0.3";
      }

      if (isDragging && ghostEl) {
        const r = draggedEl.getBoundingClientRect();
        ghostEl.style.transform = `translate(${dx}px, ${dy}px) scale(1.08)`;

        // Highlight nearest slot
        const cx = moveEvent.clientX;
        const cy = moveEvent.clientY;
        dropSlots.forEach((s) => {
          const hit = cx >= s.rect.left && cx <= s.rect.right && cy >= s.rect.top && cy <= s.rect.bottom;
          s.el.classList.toggle("drop-hover", hit);
        });
      }
    };

    const onPointerUp = (upEvent) => {
      tile.releasePointerCapture(e.pointerId);
      tile.removeEventListener("pointermove", onPointerMove);
      tile.removeEventListener("pointerup", onPointerUp);
      tile.removeEventListener("pointercancel", onPointerUp);

      if (!isDragging) {
        // Was a tap!
        handleTileTap(tile);
        draggedEl = null;
        return;
      }

      // Drag finished
      const cx = upEvent.clientX;
      const cy = upEvent.clientY;
      const targetSlot = dropSlots.find((s) => cx >= s.rect.left && cx <= s.rect.right && cy >= s.rect.top && cy <= s.rect.bottom);

      dropSlots.forEach((s) => s.el.classList.remove("drop-hover"));

      if (ghostEl) {
        ghostEl.remove();
        ghostEl = null;
      }
      draggedEl.style.opacity = "1";

      if (targetSlot) {
        const existingTile = targetSlot.el.querySelector(".word-tile");
        if (existingTile && existingTile !== draggedEl) {
          // Swap with tile in target slot
          swapOrMoveTiles(draggedEl, existingTile);
        } else {
          targetSlot.el.appendChild(draggedEl);
          sfx.land();
        }
        onOrderChange?.(getCurrentOrder());
      } else {
        // Dropped outside: return or return to bank if was in bank
        sfx.pop();
      }

      draggedEl = null;
      isDragging = false;
    };

    tile.addEventListener("pointermove", onPointerMove);
    tile.addEventListener("pointerup", onPointerUp);
    tile.addEventListener("pointercancel", onPointerUp);
  };

  // Allow clicking on empty slots to place the selected tile
  trackEl.addEventListener("click", (e) => {
    const slot = e.target.closest(".track-slot");
    if (slot && selectedTile && !slot.querySelector(".word-tile")) {
      swapOrMoveTiles(selectedTile, slot);
      selectedTile.classList.remove("selected");
      selectedTile.style.transform = "";
      selectedTile = null;
      onOrderChange?.(getCurrentOrder());
    }
  });

  // Attach listeners
  trackEl.addEventListener("pointerdown", onPointerDown);
  bankEl.addEventListener("pointerdown", onPointerDown);

  function getCurrentOrder() {
    const slots = Array.from(trackEl.querySelectorAll(".track-slot"));
    return slots.map((s) => s.querySelector(".word-tile")?.dataset.word ?? null);
  }

  return {
    getCurrentOrder,
    cleanup() {
      trackEl.removeEventListener("pointerdown", onPointerDown);
      bankEl.removeEventListener("pointerdown", onPointerDown);
      trackEl.removeEventListener("click", handleWordSpeak);
      bankEl.removeEventListener("click", handleWordSpeak);
      if (ghostEl) ghostEl.remove();
    },
  };
}

/**
 * Montessori Grammar Classifier Interactive Exercise.
 * Kids tap the target word in the sentence to reveal its Montessori symbol.
 */
export function initClassifierExercise(stageEl, question, onAnswer) {
  const words = question.words;
  const targetPos = question.targetPos;
  const meta = PARTS_OF_SPEECH[targetPos];
  let solved = false;

  stageEl.innerHTML = `
    <div class="classifier-stage">
      <div class="target-badge">
        <span class="target-sym">${question.symbolHtml}</span>
        <span class="target-name">${meta.name}</span>
        <span class="target-desc">${meta.desc}</span>
      </div>
      <p class="classifier-prompt">Tap the <b>${meta.name}</b>:</p>
      <div class="sentence-classify-strip">
        ${words.map((item, idx) => `
          <button class="classify-word-btn" data-idx="${idx}" data-word="${item.word}" data-pos="${item.pos}">
            <span class="classify-sym-holder">${montessoriSvg(item.pos, 24)}</span>
            <span class="word-text">${item.word}</span>
          </button>
        `).join("")}
      </div>
    </div>`;

  const buttons = stageEl.querySelectorAll(".classify-word-btn");

  stageEl.revealSolution = () => {
    solved = true;
    buttons.forEach((btn) => {
      btn.disabled = true;
      if (btn.dataset.pos === targetPos) {
        btn.classList.remove("wrong");
        btn.classList.add("correct");
        btn.querySelector(".classify-sym-holder")?.classList.add("revealed");
        FX.pop(btn, 1.2);
      }
    });
  };

  buttons.forEach((btn) => {
    btn.onclick = () => {
      if (solved) return;
      const pos = btn.dataset.pos;
      const word = btn.dataset.word;
      sfx.click();

      if (pos === targetPos) {
        solved = true;
        btn.classList.remove("wrong");
        btn.classList.add("correct");
        btn.querySelector(".classify-sym-holder")?.classList.add("revealed");
        sfx.right();
        FX.pop(btn, 1.25);
        onAnswer?.({ correct: true, word });
      } else {
        btn.classList.add("wrong");
        sfx.oops();
        FX.shake(btn);
        setTimeout(() => btn.classList.remove("wrong"), 650);
        onAnswer?.({ correct: false, word, expectedPos: meta.name, actualPos: PARTS_OF_SPEECH[pos]?.name });
      }
    };
  });
}

/**
 * Finger Space Surgeon Interactive Exercise.
 * Shows the two words squished together inside the sentence and lets the child
 * tap between the letters where the finger space belongs (or get it wrong if they tap the wrong spot).
 */
export function initSpacingExercise(stageEl, question, onAnswer) {
  const beforeWords = question.beforeWords || [];
  const afterWords = question.afterWords || [];
  const pair = question.squishedPair && question.squishedPair.length === 2
    ? question.squishedPair
    : [question.split[0].split(" ").pop(), question.split[1].split(" ")[0]];

  const wordA = pair[0];
  const wordB = pair[1];
  const combined = wordA + wordB;
  const splitIdx = wordA.length; // Correct split index is right after wordA
  let solved = false;

  // Build interactive letter+gap strip inside the squished block so kids can click any letter boundary
  const lettersHtml = Array.from(combined).map((ch, i) => {
    const gapBtn = i > 0
      ? `<button type="button" class="letter-gap-btn" data-split-at="${i}" aria-label="Split between ${combined[i - 1]} and ${ch}"><span>|</span></button>`
      : "";
    return `${gapBtn}<button type="button" class="squish-char-btn" data-char-idx="${i}" aria-label="Letter ${ch}">${ch}</button>`;
  }).join("");

  stageEl.innerHTML = `
    <div class="spacing-stage">
      <p class="spacing-hint-text">Two words are squished together! Tap right where the <b>finger space</b> 👉 belongs:</p>
      <div class="sentence-spacing-strip">
        ${beforeWords.map((w) => `<div class="word-tile static-word-tile"><span class="tile-text">${w}</span></div>`).join("")}
        <div class="squished-word-tile" data-squished-tile>
          ${lettersHtml}
        </div>
        ${afterWords.map((w) => `<div class="word-tile static-word-tile"><span class="tile-text">${w}</span></div>`).join("")}
      </div>
      <div class="spacing-preview" aria-live="polite"></div>
    </div>`;

  const squishTile = stageEl.querySelector("[data-squished-tile]");
  const preview = stageEl.querySelector(".spacing-preview");

  function showSplitSuccess() {
    solved = true;
    if (!squishTile) return;
    squishTile.outerHTML = `
      <div class="word-tile spaced-word-tile correct-flash"><span class="tile-text">${wordA}</span></div>
      <div class="finger-space-badge" aria-label="Finger space">👉</div>
      <div class="word-tile spaced-word-tile correct-flash"><span class="tile-text">${wordB}</span></div>
    `;
    if (preview) {
      preview.innerHTML = `<span class="c1">✓ ${question.correct}</span>`;
    }
  }

  stageEl.revealSolution = () => {
    showSplitSuccess();
  };

  function handleAttempt(atIndex, targetEl) {
    if (solved) return;
    if (atIndex === splitIdx) {
      sfx.space();
      showSplitSuccess();
      sfx.right();
      FX.confetti(20);
      onAnswer?.({ correct: true });
    } else {
      sfx.oops();
      targetEl.classList.add("wrong");
      FX.shake(squishTile);
      setTimeout(() => targetEl.classList.remove("wrong"), 600);
      onAnswer?.({ correct: false });
    }
  }

  // Clicking a gap between letters
  stageEl.querySelectorAll(".letter-gap-btn").forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const idx = Number(btn.dataset.splitAt);
      handleAttempt(idx, btn);
    };
  });

  // Clicking a character directly: if it's the last letter of wordA or first letter of wordB, treat as splitting at the boundary!
  stageEl.querySelectorAll(".squish-char-btn").forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const cIdx = Number(btn.dataset.charIdx);
      if (cIdx === splitIdx - 1 || cIdx === splitIdx) {
        handleAttempt(splitIdx, btn);
      } else {
        handleAttempt(cIdx, btn);
      }
    };
  });
}

/**
 * Capitalization Surgeon Interactive Exercise.
 * Kids can tap ANY letter/word in the sentence so they have to find which one needs a capital letter.
 */
export function initCapitalExercise(stageEl, question, onAnswer) {
  const isStart = question.mode === "capital-start";
  let solved = false;

  if (isStart) {
    const words = question.broken.split(" ");

    stageEl.innerHTML = `
      <div class="capital-stage">
        <p class="capital-prompt">Tap the letter that needs to be a <b>CAPITAL</b> letter:</p>
        <div class="sentence-capital-strip flex-wrap">
          ${words.map((w, wIdx) => `
            <div class="cap-word-box" data-word-idx="${wIdx}">
              ${Array.from(w).map((ch, cIdx) => `
                <button type="button" class="cap-letter-btn" data-w="${wIdx}" data-c="${cIdx}" aria-label="Letter ${ch}">${ch}</button>
              `).join("")}
            </div>
          `).join("")}
        </div>
      </div>`;

    const firstWordBox = stageEl.querySelector('.cap-word-box[data-word-idx="0"]');
    const firstLetterBtn = stageEl.querySelector('.cap-letter-btn[data-w="0"][data-c="0"]');

    stageEl.revealSolution = () => {
      solved = true;
      if (firstLetterBtn) {
        firstLetterBtn.textContent = firstLetterBtn.textContent.toUpperCase();
        firstLetterBtn.classList.add("fixed-cap");
      }
      if (firstWordBox) {
        firstWordBox.classList.add("fixed-cap-word");
        FX.pop(firstWordBox, 1.2);
      }
    };

    stageEl.querySelectorAll(".cap-letter-btn").forEach((btn) => {
      btn.onclick = () => {
        if (solved) return;
        const wIdx = Number(btn.dataset.w);
        const cIdx = Number(btn.dataset.c);
        // Tapping the first letter (or first word's first letter) fixes it!
        if (wIdx === 0 && cIdx === 0) {
          solved = true;
          sfx.cap();
          btn.textContent = btn.textContent.toUpperCase();
          btn.classList.add("fixed-cap");
          firstWordBox?.classList.add("fixed-cap-word");
          FX.pop(firstWordBox || btn, 1.25);
          sfx.right();
          onAnswer?.({ correct: true });
        } else {
          sfx.oops();
          btn.classList.add("wrong-letter");
          FX.shake(btn.closest(".cap-word-box") || btn);
          setTimeout(() => btn.classList.remove("wrong-letter"), 600);
          onAnswer?.({ correct: false });
        }
      };
    });
  } else {
    // Multi-token names / "I" / Proper Nouns capitalization — all words look uniform so nothing gives away the answer
    const tokens = question.tokens || [];
    let remaining = tokens.filter((t) => t.cap).length;

    stageEl.innerHTML = `
      <div class="capital-stage">
        <p class="capital-prompt">Tap the words that need a <b>capital letter</b>:</p>
        <div class="sentence-capital-strip flex-wrap">
          ${tokens.map((t, idx) => `
            <button type="button" class="token-btn" data-idx="${idx}" data-cap="${t.cap}">
              ${t.text}
            </button>
          `).join(" ")}
        </div>
      </div>`;

    const btns = stageEl.querySelectorAll(".token-btn");

    stageEl.revealSolution = () => {
      solved = true;
      btns.forEach((b) => {
        const idx = Number(b.dataset.idx);
        const tok = tokens[idx];
        b.disabled = true;
        if (tok?.cap) {
          b.classList.remove("wrong");
          b.classList.add("fixed-cap");
          b.textContent = tok.fixed || (tok.text[0].toUpperCase() + tok.text.slice(1));
          FX.pop(b, 1.2);
        }
      });
    };

    btns.forEach((b) => {
      b.onclick = () => {
        if (solved) return;
        const needsCap = b.dataset.cap === "true";
        const idx = +b.dataset.idx;
        const tok = tokens[idx];

        if (needsCap && !b.classList.contains("fixed-cap")) {
          sfx.cap();
          b.classList.remove("wrong");
          b.classList.add("fixed-cap");
          b.textContent = tok.fixed || (tok.text[0].toUpperCase() + tok.text.slice(1));
          FX.pop(b, 1.25);
          remaining--;
          if (remaining <= 0) {
            solved = true;
            sfx.right();
            FX.confetti(25);
            onAnswer?.({ correct: true });
          }
        } else if (!needsCap) {
          sfx.oops();
          b.classList.add("wrong");
          FX.shake(b);
          setTimeout(() => b.classList.remove("wrong"), 600);
          onAnswer?.({ correct: false });
        }
      };
    });
  }
}
