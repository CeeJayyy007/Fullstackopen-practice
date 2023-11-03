const Note = require("../models/note");
const User = require("../models/user");

const initialNotes = [
  {
    content: "HTML is easy",
    important: false,
    userId: "5f8e3b2c1c2e6a2a4c3a1f2d",
  },
  {
    content: "Browser can execute only JavaScript",
    important: true,
    userId: "5f8e3b2c1c2e6a2a4c3a1f2d",
  },
];

const initialUsers = [
  {
    username: "root",
    name: "Superuser",
    password: "sekret",
  },
  {
    username: "mluukkai",
    name: "Matti Luukkainen",
    password: "salainen",
  },
];

const nonExistingId = async () => {
  const note = new Note({ content: "willremovethissoon" });
  await note.save();
  await note.deleteOne();

  return note._id.toString();
};

const notesInDb = async () => {
  const notes = await Note.find({});

  return notes.map((note) => note.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});

  return users.map((user) => user.toJSON());
};

module.exports = {
  initialNotes,
  initialUsers,
  nonExistingId,
  notesInDb,
  usersInDb,
};
