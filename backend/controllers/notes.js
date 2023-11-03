// create notes router
const notesRouter = require("express").Router();

// add note model
const Note = require("../models/note");

// get notes
notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

// get notes with id
notesRouter.get("/:id", async (request, response) => {
  const note = await Note.findById(request.params.id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

// toggle note importance
notesRouter.put("/:id", async (request, response) => {
  const { content, important } = request.body;

  const updatedNote = await Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  );

  response.json(updatedNote);
});

// post note
notesRouter.post("/", async (request, response) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  const savedNote = await note.save();
  response.status(201).json(savedNote);
});

// delete note
notesRouter.delete("/:id", async (request, response) => {
  await Note.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = notesRouter;
