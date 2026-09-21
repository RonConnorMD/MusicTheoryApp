// =====================================================
// Music Theory Engine
// =====================================================



// ===============================================================
//
// Constants
//
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


//_________________________________________________________
//  Triads  - definitions
//_________________________________________________________
const TRIADS = {

    major: [0, 4, 7],

    minor: [0, 3, 7],

    diminished: [0, 3, 6],

    augmented: [0, 4, 8]
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


const TRIAD_TYPES = [
    "major",
    "minor",
    "diminished",
    "augmented"
];

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


// -----------------------------------------------------
// Build a major triad
// -----------------------------------------------------

function buildMajorTriad(rootText) {

    const root = parseNote(rootText);

    const rootPitch = pitchOf(root);

    const thirdPitch =
        (rootPitch + 4) % 12;

    const fifthPitch =
        (rootPitch + 7) % 12;

    const thirdLetter =
        nextLetter(root.letter, 2);

    const fifthLetter =
        nextLetter(root.letter, 4);

    return [

        root,

        spellNote(
            thirdLetter,
            thirdPitch
        ),

        spellNote(
            fifthLetter,
            fifthPitch
        )
    ];
}



//_________________________________________________________
//     Build a triad based on provided type
//_________________________________________________________
function buildTriad(rootText, triadType) {

    const intervals =
        TRIADS[triadType];

    const root =
        parseNote(rootText);

    const rootPitch =
        pitchOf(root);

    const thirdPitch =
        (rootPitch + intervals[1]) % 12;

    const fifthPitch =
        (rootPitch + intervals[2]) % 12;

    const thirdLetter =
        nextLetter(root.letter, 2);

    const fifthLetter =
        nextLetter(root.letter, 4);

    return [

        root,

        spellNote(
            thirdLetter,
            thirdPitch
        ),

        spellNote(
            fifthLetter,
            fifthPitch
        )
    ];
}



//    chord to string
//____________________________________________________________
function chordToString(chord) {

    return chord
        .map(noteToString)
        .join(" ");
}

// ________________________________________________________________
// chord notes    
// ________________________________________________________________
function chordNotes(chord) {

    return chord.map(
        noteToString
    );
}


// ________________________________________________________________
//    random item generator 
// ________________________________________________________________
function randomItem(array) {

    return array[
        Math.floor(
            Math.random() * array.length
        )
    ];
}


 
// ________________________________________________________________
//     Random triad question
// ________________________________________________________________
function randomTriadQuestion() {

    return {

        root:
            randomItem(ROOTS),

        type:
            randomItem(TRIAD_TYPES)
    };
}


// ________________________________________________________________

//     Build Question Object

// ________________________________________________________________

function buildQuestion() {

    const root =

        randomItem(ROOTS);

    const type =

        randomItem(TRIAD_TYPES);

    const answer =

    chordNotes(
        buildTriad(
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
//
// Check Answer
//
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
//
// Parse User Answer
//
// ===============================================================

function parseAnswer(text) {

    return text
        .trim()
        .split(/\s+/);
}


// ===============================================================
//
// Run Quiz Round
//
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
// Test Code
// ==============================================================





// ===============================================================
//
// Test Check Answer
//
// ===============================================================

console.log();

console.log(
    "Check Answer Tests"
);

console.log(
    checkAnswer(
        ["C", "E", "G"],
        ["C", "E", "G"]
    )
);

console.log(
    checkAnswer(
        ["C", "E", "G"],
        ["C", "Eb", "G"]
    )
);

console.log(
    checkAnswer(
        ["C", "E", "G"],
        ["E", "G", "C"]
    )
);


// ===============================================================
//
// Test Run Quiz Round
//
// ===============================================================

const quizQuestion =
    runQuizRound();

console.log();

console.log(
    "ANSWER:"
);

console.log(
    quizQuestion.answer.join(" ")
);
// ===============================================================
//
// Test Parse Answer
//
// ===============================================================

console.log(
    parseAnswer(
        "G B D#"
    )
);

console.log(
    parseAnswer(
        "   G   B   D#   "
    )
);

