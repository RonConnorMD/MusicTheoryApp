const notes = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B"
];

const majorPattern = [2, 2, 1, 2, 2, 2, 1];

const rootSelect = document.getElementById("root");
const result = document.getElementById("result");

// Fill the dropdown menu
notes.forEach(note => {
    const option = document.createElement("option");
    option.value = note;
    option.textContent = note;
    rootSelect.appendChild(option);
});

// Build a major scale
function buildMajorScale(root) {

    const scale = [root];

    let currentIndex = notes.indexOf(root);

    for (let i = 0; i < majorPattern.length - 1; i++) {

        currentIndex =
            (currentIndex + majorPattern[i]) % 12;

        scale.push(notes[currentIndex]);
    }

    return scale;
}

// Button click
document
    .getElementById("generate")
    .addEventListener("click", () => {

        const root = rootSelect.value;

        const scale = buildMajorScale(root);

        result.textContent = scale.join(" ");
    });