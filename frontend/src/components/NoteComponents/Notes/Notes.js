import { Route, useParams } from "react-router-dom";
import DisplayAllNotes from "../DisplayAllNotes";
import DisplayNotebookNotes from "../DisplayNotebookNotes";
import ViewAndEditNote from "../ViewAndEditNote";

const Notes = () => {
  const { notebookId } = useParams();
  return (
    <>
      {notebookId ? <DisplayNotebookNotes /> : <DisplayAllNotes />}
      <Route path={["/notes/:noteId", "/notebooks/:notebookId/:noteId"]}>
        <ViewAndEditNote />
      </Route>
    </>
  );
};

export default Notes;
