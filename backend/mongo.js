const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://jamesjamil007:${password}@cluster0.sl17drf.mongodb.net/testNoteApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

// create new note
// const note = new Note({
//   content: "Test note",
//   important: true,
// });

// find note
Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});

// save note
// note.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });
