const Note = require("../models/note");
const User = require("../models/user");

const initialNotes = [
  {
    content: "HTML is easy",
    important: false,
  },
  {
    content: "Browser can execute only JavaScript",
    important: true,
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

// const newUser = async () => {
//   const user = new User({
//     username: "testuser",
//     name: "Test User",
//     password: "testpassword",
//   });

//   await user.save();
//   return user;
// };

module.exports = {
  initialNotes,
  initialUsers,
  nonExistingId,
  notesInDb,
  usersInDb,
  //   newUser,
};
