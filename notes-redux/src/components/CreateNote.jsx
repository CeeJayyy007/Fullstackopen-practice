import { useDispatch } from "react-redux";
import { createNote } from "../reducers/noteReducer";
import noteService from "../services/notes";

const CreateNote = () => {
  const dispatch = useDispatch();

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";

    dispatch(createNote(content));
  };

  return (
    <form onSubmit={addNote}>
      <input name="note" placeholder="Enter note here" />
      <button type="submit">add</button>
    </form>
  );
};

export default CreateNote;
