// Grammar! Words, Capitals, Spacing & Montessori Parts of Speech for Grades 1, 2, and 3.
// Plain ES modules, no build step.

import * as S from "./kit/store.js";
import { jingleOnce } from "./kit/jingle.js";
S.init("grammar:v1", {
  montessoriColors: true,
  speakWordsOnTap: true,
});

import { createRouter } from "./kit/router.js";
import { stop } from "./kit/tts.js";
import * as FX from "./kit/fx.js";
import { keepDockVisible } from "./kit/dock.js";
import {
  esc,
  starsHtml,
  stickerBook,
  viewGrownups,
  installClickSounds,
  wireVoiceToggle,
} from "./kit/ui.js";

import { WORLDS, STAGES, PARTS_OF_SPEECH, stageById, montessoriSvg } from "./grammar.js";
import { Game } from "./game.js";
import { viewWatch } from "./watch.js";
import { viewMat } from "./mat.js";
import { viewSense, viewSenseList } from "./senseview.js";
import { viewCopy } from "./copy.js";

const app = document.getElementById("app");

const route = createRouter([
  [/^$/, viewHome],
  [/^play\/([\w-]+)$/, viewPlay],
  [/^watch\/([\w-]+)$/, (id) => viewWatch(app, id, { onPlay: () => (location.hash = `#/play/${id}`) })],
  [/^mat$/, () => viewMat(app)],
  [/^sense$/, () => viewSenseList(app)],
  [/^sense\/([\w-]+)$/, (id) => viewSense(app, id)],
  [/^copy$/, () => viewCopy(app)],
  [/^grownups$/, () => viewGrownups(app, {
    extraToggles: [
      ["montessoriColors", "Montessori color highlights", "Color-code parts of speech with Montessori colors on cards."],
      ["speakWordsOnTap", "Speak words on tap", "Pronounce individual word cards when tapped."],
    ],
    about: `
      <p><b>Grammar!</b> teaches foundational language arts, mechanics, and Montessori grammar for 1st, 2nd, and 3rd graders:</p>
      <ul>
        <li><b>Grade 1 (Foundations):</b> Capital starts, pronoun "I" and names, finger spacing between words, ending punctuation (. ? !), and Montessori nouns, verbs, and adjectives.</li>
        <li><b>Grade 2 (Conventions):</b> Proper nouns (days, months, holidays, places), commas in lists and dates, contractions with apostrophes, pronouns, adverbs, and past tense verbs.</li>
        <li><b>Grade 3 (Sentence Mastery):</b> Dialogue quotation marks, possessive nouns with apostrophes, prepositions, conjunctions, subject-verb agreement, and full Montessori sentence analysis.</li>
      </ul>
      <p><b>Montessori Grammar Symbols:</b> In Montessori education, geometric shapes and colors make abstract grammar visual and tangible (Black Triangle = Noun, Red Circle = Verb, Blue Triangles = Adjectives & Articles, Purple Triangle = Pronoun, Green Crescent = Preposition, Pink Bar = Conjunction).</p>
      <p><b>Gentle Feedback:</b> Every instruction is read aloud for non-readers. On a first mistake, kids get a gentle hint; on a second mistake, the guided answer is shown with praise. Stars, not scores!</p>
    `,
  })],
], {
  before() {
    stop();
    FX.clearFx();
    document.body.classList.remove("in-game");
  },
});

function nextStage() {
  return STAGES.find((s) => !S.progress(s.id).done)
    ?? STAGES.find((s) => S.progress(s.id).stars < 3)
    ?? STAGES[0];
}

function viewHome() {
  const next = nextStage();

  app.innerHTML = `
    <section class="hero">
      <h1 class="title" aria-label="Grammar!">
        <span style="color:var(--m-verb)">G</span><span style="color:var(--m-adjective)">r</span><span style="color:var(--m-noun)">a</span><span style="color:var(--m-adverb)">m</span><span style="color:var(--m-pronoun)">m</span><span style="color:var(--m-preposition)">a</span><span style="color:var(--m-conjunction)">r</span><span style="color:var(--accent)">!</span>
      </h1>
      <p class="lede">Capitals, finger spaces, ending marks, and Montessori grammar for young writers!</p>
      <a class="btn big primary play-btn pulse" href="#/play/${next.id}">▶ Play</a>
      <p class="muted small">${next.emoji} ${esc(next.title)}</p>
      <nav class="grade-jump" aria-label="Jump to a grade">
        ${WORLDS.map((w) => `<button type="button" class="grade-chip" data-grade="${w.n}">${w.emoji} Grade ${w.n}</button>`).join("")}
      </nav>
      <div class="row center tools-row">
        <a class="btn small" href="#/sense">⚡ Grammar Sense</a>
        <a class="btn small" href="#/mat">📐 Montessori Mat</a>
        <a class="btn small" href="#/copy">📝 Show & Copy</a>
      </div>
    </section>

    <!-- Montessori Symbol Legend -->
    <div class="legend-bar" aria-label="Montessori grammar colors">
      ${Object.keys(PARTS_OF_SPEECH).map((k) => {
        const p = PARTS_OF_SPEECH[k];
        return `<span class="legend-chip" title="${p.desc}">${montessoriSvg(k, 18)} <span>${p.name}</span></span>`;
      }).join("")}
    </div>

    <!-- Curriculum Worlds -->
    ${WORLDS.map((w) => `
      <section class="world-section" id="grade-${w.n}">
        <div class="world-header">
          <span class="world-emoji" aria-hidden="true">${w.emoji}</span>
          <div>
            <h2>${esc(w.title)}</h2>
            <p class="muted small">${esc(w.blurb)}</p>
          </div>
        </div>
        <div class="stage-grid">
          ${STAGES.filter((s) => s.world === w.n).map((s) => {
            const pr = S.progress(s.id);
            return `
              <div class="stage-card${pr.done ? " done" : ""}${s.id === next.id ? " next" : ""}">
                <a class="stage-main" href="#/play/${s.id}">
                  <span class="stage-emoji">${s.emoji}</span>
                  <b>${esc(s.title)}</b>
                  ${starsHtml(pr.stars)}
                </a>
                <a class="stage-watch" href="#/watch/${s.id}" aria-label="Watch how: ${esc(s.title)}">🎬 Watch how</a>
              </div>`;
          }).join("")}
        </div>
      </section>
    `).join("")}

    ${stickerBook()}`;
  app.querySelectorAll("[data-grade]").forEach((b) => {
    b.onclick = () => {
      S.setSetting("lastWorld", Number(b.dataset.grade));
      document.getElementById(`grade-${b.dataset.grade}`)?.scrollIntoView({ behavior: "smooth" });
    };
  });
  const lastW = Number(S.settings().lastWorld || 0);
  if (lastW > 1) {
    requestAnimationFrame(() => document.getElementById(`grade-${lastW}`)?.scrollIntoView({ behavior: "auto" }));
  }
}

function viewPlay(id) {
  const stage = stageById(id);
  if (!stage) {
    location.hash = "#/";
    return;
  }

  S.setSetting("lastWorld", stage.world);
  document.body.classList.add("in-game");

  app.innerHTML = `
    <section class="play">
      <div class="play-top">
        <a class="icon-btn" href="#/" aria-label="Exit">✕</a>
        <div class="dots">${Array.from({ length: 5 }, (_, k) => `<i data-dot="${k}"></i>`).join("")}</div>
        <button class="icon-btn toggle" data-voice title="Read aloud">🔊</button>
      </div>
      <div class="bubble" aria-live="polite">
        <span class="mascot" aria-hidden="true">${stage.emoji}</span>
        <p class="say"></p>
      </div>
      <div class="card game-stage"></div>
    </section>
    <div class="dock"></div>`;

  wireVoiceToggle(app.querySelector("[data-voice]"));

  const game = new Game(app, stage, {
    onAgain: () => viewPlay(id),
  });

  game.play();

  return () => {
    game.stop();
  };
}

installClickSounds();
jingleOnce("grammar", () => S.settings().sounds); // the app's little logo sound, on the first tap
route();
keepDockVisible();

// Offline support. A new version only reloads the page when it's safe: never on the very first
// visit (that "change" is just the offline files installing), and never in the middle of a game.
// If an update arrives during a game, it's applied the next time the child is back home.
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  const hadController = !!navigator.serviceWorker.controller;
  let updateReady = false;
  const reloadIfSafe = () => {
    const inGame = document.body.classList.contains("in-game") || /^#\/(play|watch|sense)\//.test(location.hash);
    if (updateReady && !inGame) location.reload();
  };
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!hadController) return;
    updateReady = true;
    reloadIfSafe();
  });
  window.addEventListener("hashchange", reloadIfSafe);
  navigator.serviceWorker.register("sw.js").then((reg) => reg.update()).catch(() => {});
}
