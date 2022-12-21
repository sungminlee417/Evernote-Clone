import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { clearNotebooks, loadNotebookThunk } from "../../../store/notebooks";
import {
  loadNotesThunk,
  clearNotes,
  loadNotesByNotebookIdThunk,
} from "../../../store/notes";
import "./DisplayAllNotes.css";

const DisplayAllNotes = () => {
  const dispatch = useDispatch();
  const { notebookId } = useParams();
  const notes = Object.values(useSelector((state) => state.notes));
  const notebooks = useSelector((state) => state.notebooks);
  const notebook = notebooks[notebookId];

  useEffect(() => {
    if (notebookId) {
      dispatch(loadNotesByNotebookIdThunk(notebookId));
    } else {
      dispatch(loadNotesThunk());
    }

    return () => {
      dispatch(clearNotes());
    };
  }, [dispatch]);

  return (
    <section className="notes-section">
      <div className="list-notes">
        <div className="list-notes-header">
          <div className="list-notes-header-header">
            {notebookId ? (
              <>
                <i className="fa-solid fa-book  indiv-notebook-link-icon"></i>
                <span>{notebook.name}</span>
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
                <div className="display-note-container-name">{note?.name}</div>
                <div className="display-note-container-created-at">
                  {note?.createdAt}
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default DisplayAllNotes;
