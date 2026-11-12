// View for Grammar Sense: Fast quiz mode with Montessori symbols and colors.

import { SENSE_LEVELS, SENSE_QUESTIONS_PER_ROUND, makeSenseRound } from "./sense.js";
import { PARTS_OF_SPEECH, montessoriSvg } from "./grammar.js";
import { sfx } from "./kit/sound.js";
import * as FX from "./kit/fx.js";
import { say, nextButton, starsFor, showFinish, pick, esc } from "./kit/ui.js";
import { speak, stop } from "./kit/tts.js";
import * as S from "./kit/store.js";

export function viewSenseList(app) {
  app.innerHTML = `
    <section class="sense-home">
      <div class="hero">
        <h1 class="title">Grammar Sense</h1>
        <p class="lede">8 quick-fire questions to power up your grammar skills!</p>
      </div>
      <div class="sense-grid">
        ${SENSE_LEVELS.map((lvl) => {
          const pr = S.progress(lvl.id);
          return `
            <div class="card sense-card">
              <span class="sense-emoji">${lvl.emoji}</span>
              <h2>${esc(lvl.title)}</h2>
              <p class="muted small">${esc(lvl.blurb)}</p>
              <div class="sense-stars mb-3">${pr.stars ? "★".repeat(pr.stars) : "☆☆☆"}</div>
              <a class="btn primary big" href="#/sense/${lvl.id}">▶ Play</a>
            </div>`;
        }).join("")}
      </div>
    </section>`;
}

export function viewSense(app, levelId) {
  const level = SENSE_LEVELS.find((l) => l.id === levelId) || SENSE_LEVELS[0];
  document.body.classList.add("in-game");

  app.innerHTML = `
    <section class="play">
      <div class="play-top">
        <a class="icon-btn" href="#/sense" aria-label="Exit">✕</a>
        <div class="dots">${Array.from({ length: SENSE_QUESTIONS_PER_ROUND }, (_, k) => `<i data-dot="${k}"></i>`).join("")}</div>
        <button class="icon-btn" data-read title="Read it to me" aria-label="Read it to me">💬</button>
        <button class="icon-btn" data-hint title="Hint" aria-label="Hint">💡</button>
      </div>
      <div class="bubble" aria-live="polite">
        <span class="mascot" aria-hidden="true">${level.emoji}</span>
        <p class="say"></p>
      </div>
      <div class="card sense-stage"></div>
    </section>
    <div class="dock"></div>`;

  const bubble = app.querySelector(".bubble");
  const stage = app.querySelector(".sense-stage");
  const dock = app.querySelector(".dock");
  const dots = app.querySelectorAll("[data-dot]");

  let alive = true;
  let mistakes = 0;
  let current = null;
  // 💬 reads the question and every choice; 💡 gives the hint.
  const readText = (q) => `${q.q} Is it ${q.choices.join(", ").replace(/, ([^,]*)$/, ", or $1")}?`;
  app.querySelector("[data-read]").onclick = () => current && speak(readText(current), { force: true });
  app.querySelector("[data-hint]").onclick = () => {
    if (!current) return;
    const meta = current.pos ? PARTS_OF_SPEECH[current.pos] : null;
    say(bubble, `💡 ${current.hint || (meta ? meta.hint || `Think about ${meta.name.toLowerCase()}s.` : "Read each choice carefully!")}`);
  };

  (async () => {
    const questions = makeSenseRound(level.id);

    for (let k = 0; k < SENSE_QUESTIONS_PER_ROUND && alive; k++) {
      dots.forEach((d, idx) => d.classList.toggle("now", idx === k));
      const q = questions[k];
      const meta = q.pos ? PARTS_OF_SPEECH[q.pos] : null;

      stage.innerHTML = `
        <div class="sense-q-card">
          ${meta ? `<div class="sense-pos-badge">${montessoriSvg(q.pos, 28)} <span>${meta.name}</span></div>` : ""}
          <p class="sense-q-text">${esc(q.q)}</p>
        </div>`;
      current = q;
      say(bubble, q.q, { spokenOverride: readText(q) }); // read the choices too, for kids still learning to read

      dock.innerHTML = `
        <div class="choices">
          ${q.choices.map((c) => `<button class="choice-card" data-val="${esc(c)}">${esc(c)}</button>`).join("")}
        </div>`;

      let missed = false, revealed = false;
      await new Promise((resolve) => {
        let qMistakes = 0;
        let finished = false;
        dock.querySelectorAll("[data-val]").forEach((btn) => {
          btn.onclick = () => {
            if (finished) return;
            const val = btn.dataset.val;
            sfx.select();

            if (val === q.answer) {
              finished = true;
              btn.classList.add("right");
              sfx.right();
              FX.confetti(20);
              dots[k]?.classList.add(missed ? "assisted" : "done"); // yellow if it took a mistake
              S.solvedOne();
              resolve();
            } else {
              mistakes++;
              qMistakes++;
              missed = true;
              btn.classList.add("wrong");
              btn.disabled = true;
              sfx.oops();
              FX.shake(btn);
              if (qMistakes >= 2) {
                finished = true;
                dock.querySelectorAll("[data-val]").forEach((b) => {
                  b.disabled = true;
                  if (b.dataset.val === q.answer) b.classList.add("right");
                });
                dots[k]?.classList.add("assisted");
                say(bubble, `Here's the answer: "${q.answer}". ${q.hint ?? ""}`);
                revealed = true;
                setTimeout(resolve, 1400); // let them see the answer, then the usual Next button
              } else {
                say(bubble, q.hint || "Try another choice!");
              }
            }
          };
        });
      });

      if (!alive) return;
      if (!revealed) say(bubble, `${pick(["Yes!", "Super!", "Correct!"])}`);
      await nextButton(dock, k < SENSE_QUESTIONS_PER_ROUND - 1 ? "Next ▶" : "Finish 🏁");
    }

    if (!alive) return;

    showFinish(app, {
      id: level.id,
      stars: starsFor(mistakes),
      mistakes,
      title: "Grammar Sense Complete!",
      done: `${SENSE_QUESTIONS_PER_ROUND} questions solved!`,
      again: `#/sense/${level.id}`,
      onAgain: () => viewSense(app, level.id),
      next: { href: "#/sense", label: "Other Grades ▶" },
    });
  })();

  return () => {
    alive = false;
    stop();
  };
}
