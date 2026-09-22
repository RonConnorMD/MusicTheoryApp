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
const LETTERS = [
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B"
];

// Natural pitches (C = 0 system)
const NATURAL_PITCHES = {
    C: 0,
    D: 2,
    E: 4,
    F: 5,
    G: 7,
    A: 9,
    B: 11
};



// ===============================================================
// Quiz Settings
// ===============================================================
const QUIZ_LENGTH = 10;
let correctCount = 0;
let totalCount = 0;
let questionNumber = 1;

//===============================================================
//  Chord definitions
//===============================================================
const CHORDS = {

    major: [

        {
            semitones: 0,
            letterSteps: 0,
            name: "Root"
        },

        {
            semitones: 4,
            letterSteps: 2,
            name: "Major 3rd"
        },

        {
            semitones: 7,
            letterSteps: 4,
            name: "Perfect 5th"
        }

    ],

    minor: [

        {
            semitones: 0,
            letterSteps: 0,
            name: "Root"
        },

        {
            semitones: 3,
            letterSteps: 2,
            name: "Minor 3rd"
        },

        {
            semitones: 7,
            letterSteps: 4,
            name: "Perfect 5th"
        }

    ],

    diminished: [

        {
            semitones: 0,
            letterSteps: 0,
            name: "Root"
        },

        {
            semitones: 3,
            letterSteps: 2,
            name: "Minor 3rd"
        },

        {
            semitones: 6,
            letterSteps: 4,
            name: "Diminished 5th"
        }

    ],

    augmented: [

        {
            semitones: 0,
            letterSteps: 0,
            name: "Root"
        },

        {
            semitones: 4,
            letterSteps: 2,
            name: "Major 3rd"
        },

        {
            semitones: 8,
            letterSteps: 4,
            name: "Augmented 5th"
        }

    ],


    major7: [

    {
        semitones: 0,
        letterSteps: 0,
        name: "Root"
    },

    {
        semitones: 4,
        letterSteps: 2,
        name: "Major 3rd"
    },

    {
        semitones: 7,
        letterSteps: 4,
        name: "Perfect 5th"
    },

    {
        semitones: 11,
        letterSteps: 6,
        name: "Major 7th"
    }

],

dominant7: [

    {
        semitones: 0,
        letterSteps: 0,
        name: "Root"
    },

    {
        semitones: 4,
        letterSteps: 2,
        name: "Major 3rd"
    },

    {
        semitones: 7,
        letterSteps: 4,
        name: "Perfect 5th"
    },

    {
        semitones: 10,
        letterSteps: 6,
        name: "Minor 7th"
    }

],

minor7: [

    {
        semitones: 0,
        letterSteps: 0,
        name: "Root"
    },

    {
        semitones: 3,
        letterSteps: 2,
        name: "Minor 3rd"
    },

    {
        semitones: 7,
        letterSteps: 4,
        name: "Perfect 5th"
    },

    {
        semitones: 10,
        letterSteps: 6,
        name: "Minor 7th"
    }

],

halfDiminished7: [

    {
        semitones: 0,
        letterSteps: 0,
        name: "Root"
    },

    {
        semitones: 3,
        letterSteps: 2,
        name: "Minor 3rd"
    },

    {
        semitones: 6,
        letterSteps: 4,
        name: "Diminished 5th"
    },

    {
        semitones: 10,
        letterSteps: 6,
        name: "Minor 7th"
    }

],

diminished7: [

    {
        semitones: 0,
        letterSteps: 0,
        name: "Root"
    },

    {
        semitones: 3,
        letterSteps: 2,
        name: "Minor 3rd"
    },

    {
        semitones: 6,
        letterSteps: 4,
        name: "Diminished 5th"
    },

    {
        semitones: 9,
        letterSteps: 6,
        name: "Diminished 7th"
    }

],
halfDiminished7: [

    {
        semitones: 0,
        letterSteps: 0,
        name: "Root"
    },

    {
        semitones: 3,
        letterSteps: 2,
        name: "Minor 3rd"
    },

    {
        semitones: 6,
        letterSteps: 4,
        name: "Diminished 5th"
    },

    {
        semitones: 10,
        letterSteps: 6,
        name: "Minor 7th"
    }

],

diminished7: [

    {
        semitones: 0,
        letterSteps: 0,
        name: "Root"
    },

    {
        semitones: 3,
        letterSteps: 2,
        name: "Minor 3rd"
    },

    {
        semitones: 6,
        letterSteps: 4,
        name: "Diminished 5th"
    },

    {
        semitones: 9,
        letterSteps: 6,
        name: "Diminished 7th"
    }

],
diminished7: [

    {
        semitones: 0,
        letterSteps: 0,
        name: "Root"
    },

    {
        semitones: 3,
        letterSteps: 2,
        name: "Minor 3rd"
    },

    {
        semitones: 6,
        letterSteps: 4,
        name: "Diminished 5th"
    },

    {
        semitones: 9,
        letterSteps: 6,
        name: "Diminished 7th"
    }

]
// ===============================================================
// End of chord definitions
// ===============================================================

};

// ________________________________________________________________
//     Define roots and trad types
// ________________________________________________________________
const ROOTS = [
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B"
];
//  later we'll add "C#", "Db", "Eb", "F#", "Bb"


const CHORD_TYPES =
    Object.keys(CHORDS);

// -----------------------------------------------------
// Convert text to Note object
// -----------------------------------------------------

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

        randomItem(CHORD_TYPES);

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
        q.root,
        q.type
    );

    return q;
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
        q.root,
        q.type
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
// Main Program
// ===============================================================
interactiveQuizRound();


// ===============================================================
// Test Code
// ==============================================================

