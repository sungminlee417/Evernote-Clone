import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import DisplayAllNotes from "../DisplayAllNotes";
import ViewAndEditNote from "../ViewAndEditNote";

const Notes = () => {
  const notes = useSelector((state) => state.notes);
  return (
    <>
      <DisplayAllNotes />
      <Route path="/notes/:noteId">
        <ViewAndEditNote />
      </Route>
    </>
  );
};

export default Notes;
