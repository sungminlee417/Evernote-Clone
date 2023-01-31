import { Route, useParams, useLocation } from "react-router-dom";
import DisplayAllNotes from "../DisplayAllNotes";
import DisplayNotebookNotes from "../DisplayNotebookNotes";
import DisplayTagNotes from "../DisplayTagNotes";
import ViewAndEditNote from "../ViewAndEditNote";

const Notes = () => {
  const { notebookId } = useParams();
  const location = useLocation();
  console.log(location.search)
  if (location.search) console.log("hi")
  else console.log("bahdy")
  return (
    <>
      {notebookId ? <DisplayNotebookNotes /> 
      : location.search.includes("=") ? <DisplayTagNotes/>
      : <DisplayAllNotes />}
      <Route path={["/notes/:noteId", "/notebooks/:notebookId/:noteId"]}>
        <ViewAndEditNote />
      </Route>
    </>
  );
};

export default Notes;
