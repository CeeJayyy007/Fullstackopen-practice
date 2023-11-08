import { useState, useEffect, useRef } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import loginService from "./services/login";
import "./index.css";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm";
import Togglable from "./components/Toggleable";

const Footer = () => {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
  };
  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2023
      </em>
    </div>
  );
};

const App = () => {
  const [notes, setNotes] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const noteFormRef = useRef();

  // do not render anything if notes is still null
  if (!notes) {
    return null;
  }

  const createNote = async (noteObject) => {
    noteFormRef.current.toggleVisibility();

    try {
      const returnedNote = await noteService.create(noteObject);

      setNotes(notes.concat(returnedNote));
    } catch (error) {
      setErrorMessage(error.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `${error.message} - Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const login = async (credentials) => {
    try {
      const user = await loginService.login(credentials);

      // save user to local storage
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));

      noteService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm login={login} />
      </Togglable>
    );
  };

  return (
    <div>
      <h1>Notes</h1>
      {/* notification component */}
      {errorMessage ? <Notification message={errorMessage} /> : ""}

      {!user && loginForm()}

      {user && (
        <div>
          <p>
            <strong>{user.name} </strong>logged in
          </p>
          <Togglable buttonLabel="new note" ref={noteFormRef}>
            <NoteForm createNote={createNote} />
          </Togglable>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      <div>
        <br />
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>

      <Footer />
    </div>
  );
};

export default App;
