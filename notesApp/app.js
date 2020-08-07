const yargs = require("yargs");
const notes = require("./note");
const { argv } = require("yargs");

yargs.command({
  command: "add",
  describe: "Adds note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
  },
  describe: "Removes note",
  handler() {
    notes.removeNote(argv.title);
  },
});

yargs.command({
  command: "list",
  describe: "Shows all notes",
  handler() {
    notes.listNotes();
  },
});

yargs.command({
  command: "read",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
  },
  describe: "Prints value of note",
  handler(argv) {
    notes.readNotes(argv.title);
  },
});

yargs.parse();
