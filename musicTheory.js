// =====================================================
// Music Theory Engine
// =====================================================

// ===============================================================
// Readline
// ===============================================================

const readline = require("readline");

// ===============================================================
// Constants
// ===============================================================

const LETTERS = ["C", "D", "E", "F", "G", "A", "B"];

// ===============================================================
// Natural Pitches (C = 0 system)
// ===============================================================
const NATURAL_PITCHES = {

    C: 0, D: 2, E: 4, F: 5,

    G: 7, A: 9, B: 11

};


// ===============================================================
// Quiz Settings
// ===============================================================
const QUIZ_LENGTH = 10;
let correctCount = 0;
let totalCount = 0;
let questionNumber = 1;

//===============================================================
// Chord definitions
//===============================================================

const CHORDS = {

    major: [
        { semitones: 0, letterSteps: 0, name: "Root" },
        { semitones: 4, letterSteps: 2, name: "Major 3rd" },
        { semitones: 7, letterSteps: 4, name: "Perfect 5th" }
    ],

    minor: [
        { semitones: 0, letterSteps: 0, name: "Root" },
        { semitones: 3, letterSteps: 2, name: "Minor 3rd" },
        { semitones: 7, letterSteps: 4, name: "Perfect 5th" }
    ],

    diminished: [
        { semitones: 0, letterSteps: 0, name: "Root" },
        { semitones: 3, letterSteps: 2, name: "Minor 3rd" },
        { semitones: 6, letterSteps: 4, name: "Diminished 5th" }
    ],

    augmented: [
        { semitones: 0, letterSteps: 0, name: "Root" },
        { semitones: 4, letterSteps: 2, name: "Major 3rd" },
        { semitones: 8, letterSteps: 4, name: "Augmented 5th" }
    ],
    sus2: [
        { semitones: 0, letterSteps: 0, name: "Root" },
        { semitones: 2, letterSteps: 1, name: "Major 2nd" },
        { semitones: 7, letterSteps: 4, name: "Perfect 5th" }
    ],

    sus4: [
        { semitones: 0, letterSteps: 0, name: "Root" },
        { semitones: 5, letterSteps: 3, name: "Perfect 4th" },
        { semitones: 7, letterSteps: 4, name: "Perfect 5th" }
    ],

    add9: [
        { semitones: 0, letterSteps: 0, name: "Root" },
        { semitones: 4, letterSteps: 2, name: "Major 3rd" },
        { semitones: 7, letterSteps: 4, name: "Perfect 5th" },
        { semitones: 14, letterSteps: 8, name: "Major 9th" }
    ],
    major7: [
        { semitones: 0, letterSteps: 0, name: "Root" },
        { semitones: 4, letterSteps: 2, name: "Major 3rd" },
        { semitones: 7, letterSteps: 4, name: "Perfect 5th" },
        { semitones: 11, letterSteps: 6, name: "Major 7th" }
    ],

    dominant7: [
        { semitones: 0, letterSteps: 0, name: "Root" },
        { semitones: 4, letterSteps: 2, name: "Major 3rd" },
        { semitones: 7, letterSteps: 4, name: "Perfect 5th" },
        { semitones: 10, letterSteps: 6, name: "Minor 7th" }
    ],

    minor7: [
        { semitones: 0, letterSteps: 0, name: "Root" },
        { semitones: 3, letterSteps: 2, name: "Minor 3rd" },
        { semitones: 7, letterSteps: 4, name: "Perfect 5th" },
        { semitones: 10, letterSteps: 6, name: "Minor 7th" }
    ],

    halfDiminished7: [
        { semitones: 0, letterSteps: 0, name: "Root" },
        { semitones: 3, letterSteps: 2, name: "Minor 3rd" },
        { semitones: 6, letterSteps: 4, name: "Diminished 5th" },
        { semitones: 10, letterSteps: 6, name: "Minor 7th" }
    ],

    diminished7: [
        { semitones: 0, letterSteps: 0, name: "Root" },
        { semitones: 3, letterSteps: 2, name: "Minor 3rd" },
        { semitones: 6, letterSteps: 4, name: "Diminished 5th" },
        { semitones: 9, letterSteps: 6, name: "Diminished 7th" }
    ],

    major9: [
        { semitones: 0, letterSteps: 0, name: "Root" },
        { semitones: 4, letterSteps: 2, name: "Major 3rd" },
        { semitones: 7, letterSteps: 4, name: "Perfect 5th" },
        { semitones: 11, letterSteps: 6, name: "Major 7th" },
        { semitones: 14, letterSteps: 8, name: "Major 9th" }
    ],

    dominant9: [
        { semitones: 0, letterSteps: 0, name: "Root" },
        { semitones: 4, letterSteps: 2, name: "Major 3rd" },
        { semitones: 7, letterSteps: 4, name: "Perfect 5th" },
        { semitones: 10, letterSteps: 6, name: "Minor 7th" },
        { semitones: 14, letterSteps: 8, name: "Major 9th" }
    ],

    minor9: [
        { semitones: 0, letterSteps: 0, name: "Root" },
        { semitones: 3, letterSteps: 2, name: "Minor 3rd" },
        { semitones: 7, letterSteps: 4, name: "Perfect 5th" },
        { semitones: 10, letterSteps: 6, name: "Minor 7th" },
        { semitones: 14, letterSteps: 8, name: "Major 9th" }
    ],

    dominant7b9: [
        { semitones: 0, letterSteps: 0, name: "Root" },
        { semitones: 4, letterSteps: 2, name: "Major 3rd" },
        { semitones: 7, letterSteps: 4, name: "Perfect 5th" },
        { semitones: 10, letterSteps: 6, name: "Minor 7th" },
        { semitones: 13, letterSteps: 8, name: "Flat 9th" }
    ],

    dominant7sharp9: [
        { semitones: 0, letterSteps: 0, name: "Root" },
        { semitones: 4, letterSteps: 2, name: "Major 3rd" },
        { semitones: 7, letterSteps: 4, name: "Perfect 5th" },
        { semitones: 10, letterSteps: 6, name: "Minor 7th" },
        { semitones: 15, letterSteps: 8, name: "Sharp 9th" }
    ]
};
// ===============================================================
// End of chord definitions
// ===============================================================


// ===============================================================
// Chord symbol definitions
// ===============================================================
const CHORD_SYMBOLS = {

    major: "",
    minor: "m",

    diminished: "dim",
    augmented: "aug",

    sus2: "sus2",
    sus4: "sus4",
    add9: "add9",

    major7: "maj7",
    dominant7: "7",
    minor7: "m7",

    halfDiminished7: "m7b5",
    diminished7: "dim7",

    major9: "maj9",
    dominant9: "9",
    minor9: "m9",

    dominant7b9: "7b9",
    dominant7sharp9: "7#9"

};


// ===============================================================
// Roots
// ===============================================================

const ROOTS = [
    "C", "C#", "Db", "D", "D#", "Eb",
    "E", "F", "F#", "Gb", "G", "G#",
    "Ab", "A", "A#", "Bb", "B"
];


const CHORD_TYPES =
    Object.keys(CHORDS);

// ===============================================================
// Quiz Levels
// ===============================================================

const QUIZ_LEVELS = {

    beginner: [
        "major",
        "minor"
    ],
    intermediate: [

        "major",
        "minor",
        "diminished",
        "augmented",

        "sus2",
        "sus4",
        "add9",

        "major7",
        "dominant7",
        "minor7"
    ],
    advanced:
        CHORD_TYPES
};





// ===============================================================
// Current Quiz Settings
// ===============================================================

let currentChordTypes =

    QUIZ_LEVELS.advanced;


// ===============================================================
// Convert text to note object
// ===============================================================

function parseNote(noteText) {

    const letter = noteText[0].toUpperCase();

    let accidental = 0;

    for (let i = 1; i < noteText.length; i++) {

        if (noteText[i] === "#") {
            accidental++;
        }

        if (noteText[i] === "b") {
            accidental--;
        }
    }

    return {
        letter: letter,
        accidental: accidental
    };
}


// -----------------------------------------------------
// Convert Note object to text
// -----------------------------------------------------

function noteToString(note) {

    let accidentalText = "";

    if (note.accidental > 0) {
        accidentalText =
            "#".repeat(note.accidental);
    }

    if (note.accidental < 0) {
        accidentalText =
            "b".repeat(-note.accidental);
    }

    return note.letter + accidentalText;
}


// -----------------------------------------------------
// Move through musical alphabet
// -----------------------------------------------------

function nextLetter(letter, steps) {

    const index =
        LETTERS.indexOf(letter);

    return LETTERS[
        (index + steps) % 7
    ];
}


// -----------------------------------------------------
// Natural pitch lookup
// -----------------------------------------------------

function naturalPitch(letter) {

    return NATURAL_PITCHES[letter];
}

//________________________________________________________
//  Find pitch of note
// _______________________________________________________
function pitchOf(note) {

    return (
        naturalPitch(note.letter)
        + note.accidental
        + 12
    ) % 12;
}

// -----------------------------------------------------
// Determine accidental needed for a letter
// to reach a desired pitch
// -----------------------------------------------------

function accidentalNeeded(letter, desiredPitch) {

    const natural = naturalPitch(letter);

    let accidental = desiredPitch - natural;

    // Normalize to smallest distance

    if (accidental > 6) {
        accidental -= 12;
    }

    if (accidental < -6) {
        accidental += 12;
    }

    return accidental;
}

// -----------------------------------------------------
// Create a correctly spelled note
// from a letter and desired pitch
// -----------------------------------------------------

function spellNote(letter, desiredPitch) {

    return {
        letter: letter,
        accidental: accidentalNeeded(
            letter,
            desiredPitch
        )
    };
}



// ===============================================================
// buildChord - build a chord based on input provided
// ===============================================================
function buildChord(rootText, chordType) {

    const tones =
        CHORDS[chordType];

    const root =
        parseNote(rootText);

    const rootPitch =
        pitchOf(root);

    const chord = [];


    for (const tone of tones) {

        const desiredPitch =
            (rootPitch + tone.semitones) % 12;

        const desiredLetter =
            nextLetter(
                root.letter,
                tone.letterSteps
            );

        const note =
            spellNote(
                desiredLetter,
                desiredPitch
            );

        chord.push(note);
    }

    return chord;

}


// ===============================================================
// Chord to string
// ===============================================================
function chordToString(chord) {

    return chord
        .map(noteToString)
        .join(" ");
}

// ===============================================================
// Chord Notes
// ===============================================================
function chordNotes(chord) {

    return chord.map(
        noteToString
    );
}


// ===============================================================
// Random Item Generator
// ===============================================================
function randomItem(array) {

    return array[
        Math.floor(
            Math.random() * array.length
        )
    ];
}






// ===============================================================
// Build Question Object
// ===============================================================

function buildQuestion() {

    const root =

        randomItem(ROOTS);

    const type =

        randomItem(currentChordTypes);

    const answer =

        chordNotes(
            buildChord(
                root,
                type
            )
        );

    return {

        root,

        type,

        answer

    };

}

// ===============================================================
// Build Reverse Question
// ===============================================================

function buildReverseQuestion() {

    const q =
        buildQuestion();

    return {

        notes:
            q.answer,

        answer:
            chordSymbol(
                q.root,
                q.type
            )
    };
}



// ===============================================================
// Check Answer
// ===============================================================

function checkAnswer(
    correctAnswer,
    userAnswer
) {

    if (
        correctAnswer.length !==
        userAnswer.length
    ) {
        return false;
    }

    for (
        let i = 0;
        i < correctAnswer.length;
        i++
    ) {

        if (
            correctAnswer[i] !==
            userAnswer[i]
        ) {
            return false;
        }
    }

    return true;
}


// ===============================================================
// Normalize Note Text
// ===============================================================

function normalizeNoteText(noteText) {

    if (noteText.length === 0) {

        return noteText;
    }

    const letter =

        noteText[0].toUpperCase();

    const accidental =

        noteText
            .slice(1)
            .toLowerCase();

    return letter + accidental;
}


// ===============================================================
// Parse User Answer
// ===============================================================

function parseAnswer(text) {

    return text
        .trim()
        .split(/\s+/)
        .map(normalizeNoteText);
}


// ===============================================================
// Run Quiz Round
// ===============================================================

function runQuizRound() {

    const q =
        buildQuestion();

    console.log();

    console.log(
        "QUESTION:"
    );

    console.log(
        chordSymbol(
            q.root,
            q.type
        )
    );

    return q;
}


// ===============================================================
// Reverse Quiz Round
// ===============================================================

function reverseQuizRound() {

    const q =
        buildReverseQuestion();

    console.log();

    console.log(
        "QUESTION:"
    );

    console.log(
        q.notes.join(" ")
    );

    return q;
}


// ===============================================================
// Interactive Reverse Quiz Round
// ===============================================================

function interactiveReverseQuizRound() {

    const q =
        buildReverseQuestion();

    console.log();

    console.log(
        "QUESTION:"
    );

    console.log(
        q.notes.join(" ")
    );

    console.log();

    rl.question(

        "Enter chord: ",

        function (answerText) {

            const userAnswer =
                answerText
                    .trim()
                    .toLowerCase();

            const correctAnswer =
                q.answer
                    .toLowerCase();

            console.log();

            if (
                userAnswer === correctAnswer
            ) {

                console.log(
                    "Correct!"
                );

            } else {

                console.log(
                    "Incorrect."
                );

                console.log(
                    "Correct answer:",
                    q.answer
                );
            }

            rl.close();
        }
    );
}


// ===============================================================
// Parse Chord Name
// ===============================================================
function parseChordName(chordName) {

    chordName = chordName.trim();

    const match =
        chordName.match(
            /^([A-G][b#]?)(.*)$/
        );

    if (!match) {

        throw new Error(
            "Invalid chord name"
        );
    }

    const root =
        match[1];

    const suffix =
        match[2];

    const suffixMap = {

        "": "major",
        "m": "minor",
        "dim": "diminished",
        "aug": "augmented",

        "sus2": "sus2",
        "sus4": "sus4",
        "add9": "add9",

        "maj7": "major7",
        "7": "dominant7",
        "m7": "minor7",
        "m7b5": "halfDiminished7",
        "dim7": "diminished7",

        "maj9": "major9",
        "9": "dominant9",
        "m9": "minor9",

        "7b9": "dominant7b9",
        "7#9": "dominant7sharp9"

    };

    const type =
        suffixMap[suffix];

    if (!type) {

        throw new Error(
            "Unknown chord type"
        );
    }

    return {

        root: root,

        type: type
    };
}

// ===============================================================
// Chord Lookup Mode
// ===============================================================

function chordLookupMode() {

    console.log();
    console.log("CHORD LOOKUP MODE");
    console.log();

    rl.question(

        "Enter chord name: ",

        function (chordName) {

            try {

                const chord =
                    parseChordName(
                        chordName
                    );

                const notes =
                    buildChord(
                        chord.root,
                        chord.type
                    );

                console.log();


                console.log(
                    chordName +
                    " = " +
                    notes.map(noteToString).join(" ")
                );

                console.log();

            } catch (error) {

                console.log();
                console.log(
                    "Unknown chord."
                );
                console.log();
            }

            showMainMenu();
        }
    );
}

// ===============================================================
// Main Menu
// ===============================================================

function showMainMenu() {

    console.log();
    console.log("1 - Quiz");
    console.log("2 - Reverse Quiz");
    console.log("3 - Chord Lookup");
    console.log("Q - Quit");
    console.log();

    rl.question(

        "Select option: ",

        function (answer) {

            answer =
                answer.trim()
                    .toUpperCase();

            if (answer === "1") {

                chooseDifficulty(
                    interactiveQuizRound
                );

            } else if (
                answer === "2"
            ) {

                chooseDifficulty(
                    interactiveReverseQuizRound
                );
            } else if (
                answer === "3"
            ) {

                chordLookupMode();

            } else if (
                answer === "Q"
            ) {

                rl.close();

            } else {

                console.log(
                    "Invalid choice."
                );

                showMainMenu();
            }
        }
    );
}

// ===============================================================
// Chord Symbol Display
// ===============================================================
function chordSymbol(root, chordType) {

    return (
        root +
        CHORD_SYMBOLS[chordType]
    );
}


// ===============================================================
// Interactive Quiz Round
// ===============================================================

function interactiveQuizRound() {

    const q =
        buildQuestion();

    console.log();

    console.log(
        "QUESTION:"
    );

    console.log(
        chordSymbol(
            q.root,
            q.type
        )
    );

    console.log();

    rl.question(

        "Enter chord: ",

        function (answerText) {

            const userAnswer =

                parseAnswer(
                    answerText
                );

            const correct =

                checkAnswer(
                    q.answer,
                    userAnswer
                );

            console.log();

            totalCount++;

            if (correct) {

                correctCount++;

                console.log(
                    "Correct!"
                );

            } else {

                console.log(
                    "Incorrect."
                );

                console.log(
                    "Correct answer:",
                    q.answer.join(" ")
                );
            }

            console.log();

            console.log(
                "Score:",
                correctCount,
                "/",
                totalCount
            );

            if (
                questionNumber >= QUIZ_LENGTH
            ) {

                console.log();

                console.log(
                    "Quiz Complete!"
                );

                console.log(
                    "Final Score:",
                    correctCount,
                    "/",
                    totalCount
                );

                rl.close();

            } else {

                questionNumber++;

                askToContinue();
            }
        }
    );
}

// ===============================================================
// Ask To Continue
// ===============================================================

function askToContinue() {

    rl.question(

        "Press Enter for next question or Q to quit: ",

        function (answer) {

            if (
                answer.trim().toUpperCase() === "Q"
            ) {

                console.log();

                console.log(
                    "Final Score:",
                    correctCount,
                    "/",
                    totalCount
                );

                rl.close();

            } else {

                interactiveQuizRound();
            }
        }
    );
}





// ===============================================================
// Readline Interface
// ===============================================================

const rl = readline.createInterface({

    input: process.stdin,

    output: process.stdout

});


// ===============================================================
//
// Test User Input
//
// ===============================================================

function testInput() {

    rl.question(

        "What is your name? ",

        function (answer) {

            console.log();

            console.log(

                "Hello",

                answer

            );

            rl.close();
        }
    );
}

// ===============================================================
// Choose Difficulty
// ===============================================================

function chooseDifficulty(callback) {

    console.log();

    console.log(
        "Choose Difficulty"
    );

    console.log();

    console.log(
        "1 - Beginner"
    );

    console.log(
        "2 - Intermediate"
    );

    console.log(
        "3 - Advanced"
    );

    console.log();

    rl.question(

        "Select option: ",

        function (choice) {

            switch (choice) {

                case "1":

                    currentChordTypes =
                        QUIZ_LEVELS.beginner;

                    break;

                case "2":

                    currentChordTypes =
                        QUIZ_LEVELS.intermediate;

                    break;

                case "3":

                    currentChordTypes =
                        QUIZ_LEVELS.advanced;

                    break;

                default:

                    console.log();

                    console.log(
                        "Invalid selection."
                    );

                    chooseDifficulty(
                        callback
                    );

                    return;
            }

            callback();
        }
    );
}


// ===============================================================
// Main Program    ---    main menu
// ===============================================================

showMainMenu();


// ===============================================================
// Test Code
// ==============================================================

