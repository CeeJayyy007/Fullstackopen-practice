// note form
const NoteForm = ({ addNote, newNote, handleNoteChange }) => (
  <form onSubmit={addNote}>
    <input value={newNote} onChange={handleNoteChange} />
    <button type="submit">Save</button>
  </form>
);

export default NoteForm;
