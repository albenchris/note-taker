// Dependencies
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require("fs");
const path = require("path");
let notesArr = fs.readFileSync("./data/notes.json", "utf8");

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// gets notesArr from data to display on page
app.get("/api/notes", (req, res) => {
    notesArr = fs.readFileSync("./data/notes.json", "utf8");
    res.json(JSON.parse(notesArr));
});

// saves note into data/notes.json
app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    newNote.id = notesArr.length + "-" + Math.floor(Math.random() * 1000000);

    notesArr = JSON.parse(notesArr);
    notesArr.push(newNote);

    fs.writeFileSync(
        path.join(__dirname, "./data/notes.json"),
        JSON.stringify(notesArr, null, 2)
    );

    res.json(notesArr);
});

// deletes notes from data/notes.json
app.delete("/api/notes/:id", (req, res) => {
    notesArr = JSON.parse(notesArr);
    const updatedNotesArr = notesArr.filter((deletedNote) => deletedNote.id !== req.params.id);

    fs.writeFileSync("./data/notes.json", JSON.stringify(updatedNotesArr));

    res.json(updatedNotesArr);
});

// html display start
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
// html display end

// in case route is not found
app.use((req, res) => {
    res.sendStatus(404).end();
});

app.listen(PORT, () => {
    console.log(`Server now on port ${PORT}`);
});