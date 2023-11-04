const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Note = require("../models/note");
const User = require("../models/user");

beforeEach(async () => {
  // delete all notes and users at start
  await Promise.all([Note.deleteMany({}), User.deleteMany({})]);

  // create initial users
  const userPromises = helper.initialUsers.map((user) =>
    api.post("/api/users").send(user)
  );
  await Promise.all(userPromises);

  // login initial user
  const loginResponse = await api.post("/api/login").send({
    username: helper.initialUsers[0].username,
    password: helper.initialUsers[0].password,
  });

  // get token from login response
  const token = loginResponse.body.token;

  // create initial notes
  const notePromises = helper.initialNotes.map((note) =>
    api
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...note, userId: loginResponse.body.id })
  );
  await Promise.all(notePromises);
});

describe("when there is initially some notes saved", () => {
  test("notes are returned as json", async () => {
    await api
      .get("/api/notes")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all notes are returned", async () => {
    const response = await api.get("/api/notes");

    expect(response.body).toHaveLength(helper.initialNotes.length);
  });

  test("a specific note is within the returned notes", async () => {
    const response = await api.get("/api/notes");

    const contents = response.body.map((r) => r.content);

    expect(contents).toContain("Browser can execute only JavaScript");
  });
});

describe("viewing a specific note", () => {
  test("succeeds with a valid id", async () => {
    const notesAtStart = await helper.notesInDb();

    const noteToView = notesAtStart[0];

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    console.log("result note", resultNote.body);
    expect(resultNote.body.content).toEqual(noteToView.content);
  });

  test("fails with statuscode 404 if note does not exist", async () => {
    const validNonexistingId = await helper.nonExistingId();

    await api.get(`/api/notes/${validNonexistingId}`).expect(404);
  });

  test("fails with statuscode 400 if id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";

    await api.get(`/api/notes/${invalidId}`).expect(400);
  });
});

describe("addition of a new note", () => {
  test("succeeds with valid data", async () => {
    const newNote = {
      content: "async/await simplifies making async calls",
      important: true,
    };

    const loginResponse = await api.post("/api/login").send({
      username: helper.initialUsers[0].username,
      password: helper.initialUsers[0].password,
    });

    const token = loginResponse.body.token;

    await api
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...newNote, userId: loginResponse.body.id });

    const notesAtEnd = await helper.notesInDb();
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

    const contents = notesAtEnd.map((n) => n.content);
    expect(contents).toContain("async/await simplifies making async calls");
  });

  test("fails with status code 400 if data invalid", async () => {
    const usersAtStart = await helper.usersInDb();
    const user = usersAtStart[0];

    const newNote = {
      important: true,
      userId: user.id,
    };

    await api.post("/api/notes").send(newNote).expect(401);

    const notesAtEnd = await helper.notesInDb();

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
  });
});

describe("deletion of a note", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToDelete = notesAtStart[0];

    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

    const notesAtEnd = await helper.notesInDb();

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1);

    const contents = notesAtEnd.map((r) => r.content);

    expect(contents).not.toContain(noteToDelete.content);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
