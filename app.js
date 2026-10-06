let selectedRoot = null;
let selectedChordType = null;
let currentQuestion = null;
let userAnswer = [];
let questionsAsked = 0;
let questionsCorrect = 0;
let selectedNotePoolDifficulty = "intermediate";

// ===================================================
// Builder UI
// ===================================================

function updateLookupButton() {
  document.getElementById("lookupBtn").disabled = !(
    selectedRoot && selectedChordType
  );
}

function updateSelectedChordDisplay() {
  const display = document.getElementById("selectedChordDisplay");

  if (!selectedRoot || !selectedChordType) {
    display.textContent = "Select a root and chord type";
    return;
  }

  const symbol = chordSymbol(selectedRoot, selectedChordType);

  display.textContent = prettyMusic(symbol);
}

updateLookupButton();

// =====================================================
// Quiz Filter Controls
// =====================================================

function selectAllChords() {
  document
    .querySelectorAll('#quizFilters input[type="checkbox"]')
    .forEach((cb) => {
      cb.checked = true;
    });
}

function clearAllChords() {
  document
    .querySelectorAll('#quizFilters input[type="checkbox"]')
    .forEach((cb) => {
      cb.checked = false;
    });
}

function selectCoreChords() {
  document
    .querySelectorAll('#quizFilters input[type="checkbox"]')
    .forEach((cb) => {
      cb.checked = CORE_CHORDS.includes(cb.value);
    });
}

// ===============================================================
// Event Listeners
// ===============================================================

// Filter Action Buttons
document
  .getElementById("selectAllChordsBtn")
  .addEventListener("click", selectAllChords);

document
  .getElementById("clearAllChordsBtn")
  .addEventListener("click", clearAllChords);

document
  .getElementById("coreChordsBtn")
  .addEventListener("click", selectCoreChords);

// Difficulty Level Buttons
document.querySelectorAll(".difficulty-btn").forEach((button) => {
  button.addEventListener("click", () => {
    setDifficulty(button.dataset.difficulty);
  });
});

// ===================================================
// Quiz User Interface
// ===================================================
// ===================================================
// Scoreboard
// ===================================================
function updateScoreBoard() {
  document.getElementById("scoreBoard").textContent =
    "Score: " + questionsCorrect + " / " + questionsAsked;
}

function setQuizNoteButtonsEnabled(enabled) {
  document.querySelectorAll("#quizNoteButtons button").forEach((button) => {
    button.disabled = !enabled;
  });
}

// =====================================================
// Core Chord Set
// =====================================================
const CORE_CHORDS = [
  "major",
  "minor",
  "diminished",
  "augmented",

  "sus2",
  "sus4",
  "add9",

  "major7",
  "dominant7",
  "minor7",
];

const DISPLAY_NAMES = {
  major: "Major",
  minor: "Minor",
  diminished: "Dim",
  augmented: "Aug",
  sus2: "Sus2",
  sus4: "Sus4",
  add9: "Add9",
  major7: "Maj7",
  dominant7: "7",
  minor7: "m7",
  halfDiminished7: "ø7",
  diminished7: "dim7",
  major9: "Maj9",
  dominant9: "9",
  minor9: "m9",
  dominant7b9: "7♭9",
  dominant7sharp9: "7♯9",
};

const selectAllBtn = document.getElementById("selectAllChords");
const clearAllBtn = document.getElementById("clearAllChords");
const coreChordsBtn = document.getElementById("coreChords");

const rootContainer = document.getElementById("rootButtons");

ROOTS.forEach((root) => {
  const button = document.createElement("button");

  button.textContent = root;

  button.addEventListener("click", function () {
    document
      .querySelectorAll("#rootButtons button")
      .forEach((btn) => btn.classList.remove("selected"));

    button.classList.add("selected");

    selectedRoot = root;

    updateLookupButton();
    updateSelectedChordDisplay();
  });

  rootContainer.appendChild(button);
});
const chordContainer = document.getElementById("chordButtons");
[
  "major",
  "minor",
  "diminished",
  "augmented",

  "sus2",
  "sus4",
  "add9",

  "major7",
  "dominant7",
  "minor7",

  "halfDiminished7",
  "diminished7",

  "major9",
  "dominant9",
  "minor9",

  "dominant7b9",
  "dominant7sharp9",
].forEach((type) => {
  const button = document.createElement("button");

  button.textContent = DISPLAY_NAMES[type];

  // =====================================================
  // Quiz Filter Roadmap
  // =====================================================
  //
  // Future:
  //   - Suspended/Add9 group
  //   - 7th Chords group
  //   - 9th Chords group
  //   - Expand/Collapse controls
  //
  // =====================================================

  button.addEventListener("click", function () {
    document
      .querySelectorAll("#chordButtons button")
      .forEach((btn) => btn.classList.remove("selected"));

    button.classList.add("selected");

    selectedChordType = type;

    updateLookupButton();
    updateSelectedChordDisplay();
  });

  chordContainer.appendChild(button);
});

//===================================================================
//     Lookup button
//===================================================================
document.getElementById("lookupBtn").addEventListener("click", function () {
  const chord = buildChord(selectedRoot, selectedChordType);

  const notes = chordToString(chord);

  const prettyNotes = prettyMusic(notes);

  const symbol = chordSymbol(selectedRoot, selectedChordType);

  const prettySymbol = prettyMusic(symbol);

  const degrees = prettyMusic(chordDegrees(selectedChordType));

  const intervals = prettyMusic(chordIntervals(selectedChordType));

  document.getElementById("result").innerHTML = `
  <div class="info-card">
    <div class="card-title">Chord</div>
    <div class="card-value chord-symbol">${prettySymbol}</div>
  </div>

  <div class="info-card">
    <div class="card-title">Notes</div>
    <div class="card-value notes">${prettyNotes}</div>
  </div>

  <div class="info-card">
    <div class="card-title">Formula</div>
    <div class="card-value">${degrees}</div>
  </div>

  <div class="info-card">
    <div class="card-title">Intervals</div>
    <div class="card-value">${intervals}</div>
  </div>
  `;
});

// ===================================================
// Selected Quiz Chord Types
// ===================================================

function getSelectedChordTypes() {
  return [
    ...document.querySelectorAll(
      "#quizFilters input[type='checkbox'][value]:checked",
    ),
  ].map((checkbox) => checkbox.value);
}

// ===============================================================
// Difficulty State
// ===============================================================

let selectedDifficulty = "intermediate";

// ===============================================================
// Set Difficulty
// Updates selected difficulty and button highlighting
// ===============================================================

function setDifficulty(difficulty) {
  selectedDifficulty = difficulty;

  document.querySelectorAll(".difficulty-btn").forEach((btn) => {
    btn.classList.toggle("selected", btn.dataset.difficulty === difficulty);
  });
}

// ===============================================================
// Selected Note Pool Difficulty
// Returns current difficulty setting
// ===============================================================

function getSelectedNotePoolDifficulty() {
  return selectedDifficulty;
}

// ===================================================
// Build Filtered Question
// ===================================================
function buildFilteredQuestion() {
  const selectedTypes = getSelectedChordTypes();
  const selectedRoots = getSelectedRoots();

  if (selectedTypes.length === 0) {
    alert("Please select at least one chord type.");
    return null;
  }

  if (selectedRoots.length === 0) {
    alert("Please select at least one root.");
    return null;
  }

  const root = randomItem(selectedRoots);

  const type = randomItem(selectedTypes);

  const answer = chordNotes(buildChord(root, type));

  const notePoolDifficulty = getSelectedNotePoolDifficulty();

  return {
    root,
    type,
    answer,
    notePool: getSmartNotePool(root, type, notePoolDifficulty),
  };
}

// ===================================================
// Quiz Mode
// ===================================================

document
  .getElementById("newQuestionBtn")
  .addEventListener("click", function () {
    currentQuestion = buildFilteredQuestion();
    if (!currentQuestion) {
      return;
    }
    document.getElementById("newQuestionBtn").style.display = "none";
    const q = currentQuestion;

    renderQuizNoteButtons();

    userAnswer = [];
    // Re-enable note buttons for new question
    document.querySelectorAll("#quizNoteButtons button").forEach((button) => {
      button.disabled = false;
    });

    document.getElementById("quizFeedback").textContent = "";
    document.getElementById("checkAnswerBtn").disabled = true;
    displaySelectedNotes();

    document.getElementById("quizAnswer").textContent =
      "Enter " +
      q.answer.length +
      " notes • 0 of " +
      q.answer.length +
      " selected";

    document.getElementById("quizStatus").textContent = "";

    const answerCount = q.answer.length;

    const displayChord = chordSymbol(q.root, q.type);

    document.getElementById("quizQuestion").textContent =
      prettyMusic(displayChord);

    document.getElementById("quizAnswer").textContent =
      "Enter " + answerCount + " notes";
  });

// =========================================================
// Render Quiz Note Buttons
// =========================================================

function renderQuizNoteButtons() {
  const quizNoteContainer = document.getElementById("quizNoteButtons");

  quizNoteContainer.innerHTML = "";

  if (!currentQuestion) {
    return;
  }

  currentQuestion.notePool.forEach((note) => {
    const button = document.createElement("button");

    button.textContent = prettyMusic(note);

    button.addEventListener("click", function () {
      if (userAnswer.length >= currentQuestion.answer.length) {
        return;
      }

      userAnswer.push(note);

      displaySelectedNotes();

      document.getElementById("quizAnswer").textContent =
        "Enter " +
        currentQuestion.answer.length +
        " notes • " +
        userAnswer.length +
        " of " +
        currentQuestion.answer.length +
        " selected";

      if (userAnswer.length === currentQuestion.answer.length) {
        document.getElementById("checkAnswerBtn").disabled = false;

        setQuizNoteButtonsEnabled(false);
      }
    });

    quizNoteContainer.appendChild(button);
  });
}

// ===================================================
// Check Answer
// ===================================================

document
  .getElementById("checkAnswerBtn")
  .addEventListener("click", function () {
    const correct = checkAnswer(currentQuestion.answer, userAnswer);
    questionsAsked++;
    if (correct) {
      questionsCorrect++;

      const displayChord = prettyMusic(
        chordSymbol(currentQuestion.root, currentQuestion.type),
      );

      document.getElementById("quizFeedback").innerHTML = `
  <div class="feedback-card feedback-correct">
  <div class="feedback-title">
    ✅ Correct! ${displayChord}
  </div>

  <button class="feedback-next-btn">
    Next Question
  </button>
</div>

  `;

      document
        .querySelector(".feedback-next-btn")
        ?.addEventListener("click", () => {
          document.getElementById("newQuestionBtn").click();
        });

      document.getElementById("checkAnswerBtn").disabled = true;

      updateScoreBoard();
    } else {
      const analysis = getChordAnalysis(
        currentQuestion.root,
        currentQuestion.type,
      );
      document.getElementById("quizFeedback").innerHTML = `
    <div class="feedback-card feedback-incorrect">
      <div class="feedback-title">❌ Incorrect</div>

      <div class="answer-row">
  <strong>Your Answer:</strong>
  ${prettyMusic(userAnswer.join(" "))}

  &nbsp;&nbsp;|&nbsp;&nbsp;

  <strong>Correct Answer:</strong>
  ${prettyMusic(currentQuestion.answer.join(" "))}
</div>
      <hr>
<div>
 
<div class="formula-heading">
  <strong>${prettyMusic(analysis.chord)} is comprised of:</strong>
</div>

<div class="formula-pills">
  ${analysis.formula
    .split(" ")
    .map((degree) => `<span class="degree-pill">${prettyMusic(degree)}</span>`)
    .join("")}
  </div>
</div>
<br>
<div>
  <strong>Intervals:</strong>
  ${analysis.intervals.map((interval) => prettyMusic(interval)).join(" • ")}
</div>

<div class="feedback-actions">
  <button class="feedback-next-btn">
    Next Question
  </button>
</div>

   `;

      document
        .querySelector(".feedback-next-btn")
        ?.addEventListener("click", () => {
          document.getElementById("newQuestionBtn").click();
        });

      document.getElementById("checkAnswerBtn").disabled = true;

      updateScoreBoard();
    }
  });

// ===================================================
// Difficulty Info
// ===================================================
const difficultyInfoBtn = document.getElementById("difficultyInfoBtn");
const difficultyInfo = document.getElementById("difficultyInfo");
difficultyInfoBtn.addEventListener("click", () => {
  difficultyInfo.hidden = !difficultyInfo.hidden;
});

/* ==========================================
   Next Question Button
   Generates a new quiz question after the
   previous question has been graded.
   ========================================== */

document

  .getElementById("nextQuestionBtn")

  .addEventListener("click", function () {
    currentQuestion = buildFilteredQuestion();

    if (!currentQuestion) {
      return;
    }

    const q = currentQuestion;

    renderQuizNoteButtons();

    userAnswer = [];

    displaySelectedNotes();

    document.getElementById("quizFeedback").innerHTML = "";

    document.getElementById("nextQuestionContainer").style.display = "none";

    document.getElementById("checkAnswerBtn").disabled = true;

    document.getElementById("quizQuestion").innerHTML = prettyMusic(
      chordSymbol(q.root, q.type),
    );

    document.getElementById("quizAnswer").textContent =
      `Enter ${q.answer.length} notes • 0 of ${q.answer.length} selected`;

    document.getElementById("quizStatus").textContent = "";
  });

// ===================================================
// Clear Answer
// ===================================================

document
  .getElementById("clearAnswerBtn")
  .addEventListener("click", function () {
    userAnswer = [];
    setQuizNoteButtonsEnabled(true);
    displaySelectedNotes();

    document.getElementById("quizFeedback").textContent = "";
    document.getElementById("checkAnswerBtn").disabled = true;
  });

// ===================================================
// Get Selected Roots
// ===================================================

function getSelectedRoots() {
  const selectedRoots = [];

  document;
  document
    .querySelectorAll("#rootFilters input[type='checkbox'][value]")
    .forEach(function (checkbox) {
      if (checkbox.checked && checkbox.value) {
        selectedRoots.push(checkbox.value);
      }
    });

  return selectedRoots;
}

// ===================================================
// Display Selected Notes
// ===================================================

function displaySelectedNotes() {
  const container = document.getElementById("selectedNotes");

  container.innerHTML = "";

  userAnswer.forEach(function (note) {
    const span = document.createElement("span");

    span.className = "note-pill";

    span.textContent = prettyMusic(note);

    container.appendChild(span);
  });
}

// ===================================================
// Quiz Filter Groups
// ===================================================

function setupGroupCheckbox(groupId, memberClass) {
  const groupCheckbox = document.getElementById(groupId);

  const members = document.querySelectorAll("." + memberClass);

  // Group checkbox controls members

  groupCheckbox.addEventListener("change", function () {
    members.forEach(function (member) {
      member.checked = groupCheckbox.checked;
    });
  });

  // Members update group checkbox

  members.forEach(function (member) {
    member.addEventListener("change", function () {
      const allChecked = [...members].every((checkbox) => checkbox.checked);

      groupCheckbox.checked = allChecked;
    });
  });
}
// ===================================================
// Establish chord groups
// ===================================================
setupGroupCheckbox("triadsGroup", "triadChord");

setupGroupCheckbox("suspendedGroup", "suspendedChord");

setupGroupCheckbox("seventhGroup", "seventhChord");

setupGroupCheckbox("ninthGroup", "ninthChord");

// ===================================================
// Root Filter Group Checkboxes
// Synchronize group checkboxes with all root
// checkboxes in the corresponding category.
// ===================================================

setupGroupCheckbox("naturalRootsGroup", "naturalRoot");

setupGroupCheckbox("sharpRootsGroup", "sharpRoot");

setupGroupCheckbox("flatRootsGroup", "flatRoot");

// ===================================================
// Navigation
// ===================================================

const homeScreen = document.getElementById("homeScreen");

const builderSection = document.getElementById("builderSection");

const quizSection = document.getElementById("quizSection");

const appHeader = document.querySelector(".app-header");

// ---------------------------------------------------
// Builder Screen
// ---------------------------------------------------

document
  .getElementById("showBuilderBtn")
  .addEventListener("click", function () {
    homeScreen.style.display = "none";
    builderSection.style.display = "block";
    quizSection.style.display = "none";

    appHeader.style.display = "none";

    builderSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });

// ---------------------------------------------------
// Quiz Screen
// ---------------------------------------------------

document.getElementById("showQuizBtn").addEventListener("click", function () {
  homeScreen.style.display = "none";
  builderSection.style.display = "none";
  quizSection.style.display = "block";

  appHeader.style.display = "none";

  quizSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

// ===================================================
// Home Buttons
// ===================================================
document
  .getElementById("learnChordsHomeBtn")
  .addEventListener("click", showHome);

document
  .getElementById("practiceChordsHomeBtn")
  .addEventListener("click", showHome);

// ---------------------------------------------------
// Return To Home
// ---------------------------------------------------

function showHome() {
  homeScreen.style.display = "block";

  builderSection.style.display = "none";

  quizSection.style.display = "none";

  appHeader.style.display = "block";

  homeScreen.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}
