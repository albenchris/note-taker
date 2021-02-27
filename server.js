const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require("fs");
const path = require("path");
// const uuid = require("uuid");
let notesArr = fs.readFileSync("./data/notes.json", "utf8");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// gets notesArr from data to display on page
app.get("/api/notes", (req, res) => {
    notesArr = fs.readFileSync("./data/notes.json", "utf8")
    res.json(JSON.parse(notesArr));
});

// saves note into data/notes.json
app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    notesArr = JSON.parse(notesArr);

    newNote.id = notesArr.length.toString() + "-" + Math.floor(Math.random() * 1000000).toString();
    // newNote.id = uuid.v1();
    console.log(newNote);

    
    notesArr.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, "./data/notes.json"),
        JSON.stringify(notesArr, null, 2) // or if readonly: (notesArr, newNote.id, 2)
    );

    res.json(notesArr);
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