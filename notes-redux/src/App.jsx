import { useEffect } from "react";
import CreateNote from "./components/CreateNote";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";
import { initializeNotes } from "./reducers/noteReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeNotes());
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      <CreateNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
