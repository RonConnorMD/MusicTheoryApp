let selectedRoot = null;
let selectedChordType = null;
let currentQuestion = null;
let userAnswer = [];
let questionsAsked = 0;
let questionsCorrect = 0;

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

  return {
    root,
    type,
    answer,
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
    const q = currentQuestion;

    userAnswer = [];
    // Re-enable note buttons for new question
    document.querySelectorAll("#quizNoteButtons button").forEach((button) => {
      button.disabled = false;
    });

    document.getElementById("quizFeedback").textContent = "";
    document.getElementById("checkAnswerBtn").disabled = true;
    displaySelectedNotes();

    document.getElementById("quizStatus").textContent =
      "0 of " + q.answer.length + " notes selected";

    const answerCount = q.answer.length;

    const displayChord = chordSymbol(q.root, q.type);

    document.getElementById("quizQuestion").textContent =
      prettyMusic(displayChord);

    document.getElementById("quizAnswer").textContent =
      "Enter " + answerCount + " notes";
  });

// ===================================================
// Quiz Note Buttons
// ===================================================

const quizNoteContainer = document.getElementById("quizNoteButtons");

ROOTS.forEach((note) => {
  const button = document.createElement("button");

  button.textContent = prettyMusic(note);

  button.addEventListener("click", function () {
    if (userAnswer.length >= currentQuestion.answer.length) {
      return;
    }
    userAnswer.push(note);

    displaySelectedNotes();

    document.getElementById("quizStatus").textContent =
      userAnswer.length +
      " of " +
      currentQuestion.answer.length +
      " notes selected";
    if (userAnswer.length === currentQuestion.answer.length) {
      document.getElementById("checkAnswerBtn").disabled = false;

      setQuizNoteButtonsEnabled(false);
    }
  });

  quizNoteContainer.appendChild(button);
});

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

      document.getElementById("quizFeedback").innerHTML =
        "<h3>✅ Correct!</h3>" +
        "<p>You built <strong>" +
        displayChord +
        "</strong> correctly.</p>";
    } else {
      document.getElementById("quizFeedback").innerHTML =
        "<h3>❌ Incorrect</h3>" +
        "<p><strong>Your Answer:</strong><br>" +
        prettyMusic(userAnswer.join(" ")) +
        "</p>" +
        "<p><strong>Correct Answer:</strong><br>" +
        prettyMusic(currentQuestion.answer.join(" ")) +
        "</p>";
    }
    document.getElementById("checkAnswerBtn").disabled = true;

    updateScoreBoard();
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

// ---------------------------------------------------
// Home Buttons
// ---------------------------------------------------

document.getElementById("builderHomeBtn").addEventListener("click", showHome);

document.getElementById("quizHomeBtn").addEventListener("click", showHome);

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
