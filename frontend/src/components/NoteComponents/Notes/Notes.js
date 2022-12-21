import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import DisplayAllNotes from "../DisplayAllNotes";
import ViewAndEditNote from "../ViewAndEditNote";

const Notes = () => {
  return (
    <>
      <DisplayAllNotes />
      <Route path={["/notes/:noteId", "/notebooks/:notebookId/:noteId"]}>
        <ViewAndEditNote />
      </Route>
    </>
  );
};

export default Notes;
