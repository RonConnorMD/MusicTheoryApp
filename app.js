



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

        document
            .querySelectorAll("#rootButtons button")
            .forEach(btn =>
                btn.classList.remove("selected")
            );

        button.classList.add("selected");

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

    document
        .querySelectorAll("#chordButtons button")
        .forEach(btn =>
            btn.classList.remove("selected")
        );

    button.classList.add("selected");

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

//===================================================================
//     Lookup button
//===================================================================
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

            const symbol =
                chordSymbol(
                    selectedRoot,
                    selectedChordType
                );

            const degrees =
                chordDegrees(
                    selectedChordType
                );

            const intervals =
                chordIntervals(
                    selectedChordType
                );

            document
                .getElementById("result")
                .innerHTML =

                "<h3>Chord: " + symbol + "</h3>" +

                "<p><strong>Notes:</strong><br>" +
                notes +
                "</p>" +

                "<p><strong>Formula:</strong><br>" +
                degrees +
                "</p>" +

                "<p><strong>Intervals:</strong><br>" +
                intervals +
                "</p>";
        }
    );