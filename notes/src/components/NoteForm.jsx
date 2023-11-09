import { useState } from "react";

// note form
const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState("");

  const addNote = (event) => {
    event.preventDefault();

    createNote({
      content: newNote,
      important: true,
    });

    setNewNote("");
  };

  return (
    <div className="formDiv">
      <form onSubmit={addNote}>
        <input
          value={newNote}
          placeholder="write note content here"
          id="note-input"
          onChange={({ target }) => setNewNote(target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default NoteForm;
