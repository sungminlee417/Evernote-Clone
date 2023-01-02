import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { loadNotesByNotebookIdThunk, clearNotes } from "../../../store/notes";
import noNotes from "../../../images/svgexport-28.svg";
import {
  loadNotebookThunk,
  clearNotebook,
} from "../../../store/singleNotebook";
import "./DisplayNotebookNotes.css";

const DisplayNotebookNotes = () => {
  const dispatch = useDispatch();
  const { notebookId } = useParams();
  const notebook = useSelector((state) => state.singleNotebook);
  const notes = Object.values(useSelector((state) => state.notes));

  useEffect(() => {
    dispatch(loadNotebookThunk(notebookId)).then(() => {
      dispatch(loadNotesByNotebookIdThunk(notebookId));
    });

    return () => {
      dispatch(clearNotes());
      dispatch(clearNotebook());
    };
  }, [dispatch, notebookId]);

  const convertDate = (dateTime) => {
    const date = new Date(dateTime);
    return date.toDateString();
  };

  return (
    <section className="notes-section">
      <div className="list-notes">
        <div className="list-notes-header">
          <div className="list-notes-header-header">
            <i className="fa-solid fa-book indiv-notebook-link-icon-display-notes"></i>
            <span>{notebook?.name}</span>
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
                  to={`/notebooks/${notebookId}/${note.id}`}
                >
                  <div className="display-note-container-name">{note.name}</div>
                  <div className="display-note-container-created-at">
                    {convertDate(note.createdAt)}
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

export default DisplayNotebookNotes;
