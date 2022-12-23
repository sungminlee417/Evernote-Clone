import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  loadNotesThunk,
  clearNotes,
  loadNotesByNotebookIdThunk,
} from "../../../store/notes";
import {
  clearNotebook,
  loadNotebookThunk,
} from "../../../store/singleNotebook";
import noNotes from "../../../images/svgexport-28.svg";
import "./DisplayAllNotes.css";

const DisplayAllNotes = () => {
  const dispatch = useDispatch();
  const notes = Object.values(useSelector((state) => state.notes));
  const notebook = useSelector((state) => state.singleNotebook);
  const { notebookId } = useParams();

  useEffect(() => {
    if (notebookId) {
      dispatch(loadNotesByNotebookIdThunk(notebookId));
      dispatch(loadNotebookThunk(notebookId));
    } else {
      dispatch(loadNotesThunk());
    }

    return () => {
      dispatch(clearNotes());
      dispatch(clearNotebook());
    };
  }, [dispatch]);

  return (
    <section className="notes-section">
      <div className="list-notes">
        <div className="list-notes-header">
          <div className="list-notes-header-header">
            {notebookId ? (
              <>
                <i className="fa-solid fa-book indiv-notebook-link-icon-display-notes"></i>
                <span>{notebook?.name}</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-note-sticky"></i>
                <span>Notes</span>
              </>
            )}
          </div>
          <div className="list-notes-header-sub">{notes.length} notes</div>
        </div>
        {notes.length > 0 ? (
          <div className="notes-list">
            {notes.map((note, i) => {
              return (
                <NavLink
                  className="display-note-container"
                  key={i}
                  to={
                    notebookId
                      ? `/notebooks/${notebookId}/${note.id}`
                      : `/notes/${note.id}`
                  }
                >
                  <div className="display-note-container-name">
                    {note?.name}
                  </div>
                  <div className="display-note-container-created-at">
                    {note?.createdAt}
                  </div>
                </NavLink>
              );
            })}
          </div>
        ) : (
          <div className="display-notes-no-notes-section">
            <div className="display-notes-no-notes-container">
              <img src={noNotes} alt="no notes" />
              <div className="display-notes-no-notes-header">
                Create your first note
              </div>
              <div className="display-notes-no-notes-text">
                Click the{" "}
                <button className="display-notes-no-notes-button">
                  + New Note
                </button>{" "}
                button in the sidebar to get started.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default DisplayAllNotes;
