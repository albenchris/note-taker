const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
let notes = fs.readFileSync("./data/notes.json", "utf-8");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// function createNewNote(body, notesArr) {
//     const note = body;
//     notesArr.push(note);

//     fs.writeFileSync(
//         path.join(__dirname, "./data/notes.json"),
//         JSON.stringify(notesArr, null, 2)
//     );

//     return note;
// };

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// gets notes from data to display on page
app.get("/api/notes", (req, res) => {
    res.json(JSON.parse(notes));
});

// saves note into data/notes.json
app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    notes = JSON.parse(notes);
    console.log(notes);
});

app.listen(PORT, () => {
    console.log(`Server now on port ${PORT}`);
});