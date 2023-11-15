import CreateNote from "./components/CreateNote";
import Notes from "./components/Notes";

const App = () => {
  return (
    <div>
      <h1>Notes</h1>
      <CreateNote />
      <Notes />
    </div>
  );
};

export default App;
