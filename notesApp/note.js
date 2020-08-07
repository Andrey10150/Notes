const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicate = notes.find((note) => note.title === title);
  if (!duplicate) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.default.green.bold("Note have been saved"));
  } else {
    console.log(chalk.default.bgRed("Note already exists"));
  }
};

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  const jsonData = JSON.stringify(notes);
  fs.writeFileSync("notes.json", jsonData);
};

const removeNote = (title) => {
  const notes = loadNotes();
  const newNotes = notes.filter((note) => note.title !== title);
  if (notes.length > newNotes.length) {
    console.log(chalk.default.bgGreen("Note removed!"));
  } else {
    console.log(chalk.default.bgRed("No note found!"));
  }
  saveNotes(newNotes);
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.default.green.bold("Your notes"));
  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNotes = (title) => {
  const notes = loadNotes();
  const noteElement = notes.find((note) => note.title === title);
  if (noteElement) {
    console.log(chalk.default.green.bold(noteElement.title));
    console.log(noteElement.body);
  } else {
    console.log(chalk.default.bgRed('Error, isn\'t note with typed title'));
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes: readNotes,
};
