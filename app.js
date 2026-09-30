let selectedRoot = null;
let selectedChordType = null;
let currentQuestion = null;
let userAnswer = [];
let questionsAsked = 0;
let questionsCorrect = 0;

function updateScoreBoard() {
  document.getElementById("scoreBoard").textContent =
    "Score: " + questionsCorrect + " / " + questionsAsked;
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

    document.getElementById("result").textContent = "Root: " + root;
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

    document.getElementById("result").textContent =
      "Root: " + selectedRoot + "   Type: " + selectedChordType;
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

  const degrees = chordDegrees(selectedChordType);

  const intervals = chordIntervals(selectedChordType);

  document.getElementById("result").innerHTML =
    "<h3>Chord: " +
    prettySymbol +
    "</h3>" +
    "<p><strong>Notes:</strong><br>" +
    prettyNotes +
    "</p>" +
    "<p><strong>Formula:</strong><br>" +
    degrees +
    "</p>" +
    "<p><strong>Intervals:</strong><br>" +
    intervals +
    "</p>";
});

// ===================================================
// Quiz Mode
// ===================================================

document
  .getElementById("newQuestionBtn")
  .addEventListener("click", function () {
    currentQuestion = buildQuestion();

    const q = currentQuestion;

    userAnswer = [];

    document.getElementById("quizFeedback").textContent = "";
    document.getElementById("checkAnswerBtn").disabled = true;
    document.getElementById("selectedNotes").textContent = "";

    document.getElementById("quizStatus").textContent =
      "0 of " + q.answer.length + " notes selected";

    const answerCount = q.answer.length;

    document.getElementById("quizQuestion").innerHTML =
      "<h3>" +
      prettyMusic(chordSymbol(q.root, q.type)) +
      "</h3>" +
      "<p>Enter " +
      answerCount +
      " notes</p>";
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

    document.getElementById("selectedNotes").textContent = prettyMusic(
      userAnswer.join(" "),
    );

    document.getElementById("quizStatus").textContent =
      userAnswer.length +
      " of " +
      currentQuestion.answer.length +
      " notes selected";
    if (userAnswer.length === currentQuestion.answer.length) {
      document.getElementById("checkAnswerBtn").disabled = false;
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
      document.getElementById("quizFeedback").innerHTML =
        "<h3>✅ Correct!</h3>";
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

    document.getElementById("selectedNotes").textContent = "";

    document.getElementById("quizFeedback").textContent = "";
    document.getElementById("checkAnswerBtn").disabled = true;
  });

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
