const ROOTS = [
    "C", "C#", "Db",
    "D", "D#", "Eb",
    "E",
    "F", "F#", "Gb",
    "G", "G#", "Ab",
    "A", "A#", "Bb",
    "B"
];

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
                .getElementById("result")
                .textContent =
                "Selected root: " + root;
        }
    );

    rootContainer.appendChild(button);

});