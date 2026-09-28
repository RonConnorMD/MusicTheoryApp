



let selectedRoot = null;
let selectedChordType = null;

const rootContainer =
    document.getElementById("rootButtons");

ROOTS.forEach(root => {

    const button =
        document.createElement("button");

    button.textContent = root;

    button.addEventListener(
        "click",
        function () {

            selectedRoot = root;

            document
                .getElementById("result")
                .textContent =
                "Root: " + root;
        }
    );

    rootContainer.appendChild(button);
});

const chordContainer =
    document.getElementById("chordButtons");

[
    "major",
    "minor",
    "major7",
    "dominant7",
    "minor7"
].forEach(type => {

    const button =
        document.createElement("button");

    button.textContent = type;

    button.addEventListener(
        "click",
        function () {

            selectedChordType = type;

            document
                .getElementById("result")
                .textContent =
                "Root: " +
                selectedRoot +
                "   Type: " +
                selectedChordType;
        }
    );

    chordContainer.appendChild(button);
});

//====================================================
document
    .getElementById("lookupBtn")
    .addEventListener(
        "click",
        function () {

            const chord =
                buildChord(
                    selectedRoot,
                    selectedChordType
                );

            const notes =
                chordToString(chord);

            document
                .getElementById("result")
                .textContent =
                notes;
        }
    );