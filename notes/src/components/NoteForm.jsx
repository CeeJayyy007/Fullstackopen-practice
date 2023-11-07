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
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={({ target }) => setNewNote(target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default NoteForm;
