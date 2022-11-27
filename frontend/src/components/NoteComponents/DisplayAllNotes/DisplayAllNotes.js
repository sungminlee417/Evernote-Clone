import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { loadNotesThunk } from "../../../store/notes";
import "./DisplayAllNotes.css";

const DisplayAllNotes = () => {
  const dispatch = useDispatch();
  const notes = Object.values(useSelector((state) => state.notes));
  useEffect(() => {
    dispatch(loadNotesThunk());
  }, [dispatch]);

  return (
    <section className="notes-section">
      <div className="list-notes">
        <div className="list-notes-header">
          <div className="list-notes-header-header">
            <i className="fa-solid fa-note-sticky"></i> Notes
          </div>
          <div className="list-notes-header-sub">{notes.length} notes</div>
        </div>
        <div className="notes-list">
          {notes.map((note, i) => {
            return (
              <NavLink
                className="display-note-container"
                key={i}
                to={`/notes/${note.id}`}
              >
                <div className="display-note-container-name">{note.name}</div>
                <div className="display-note-container-created-at">
                  {note.createdAt}
                </div>
              </NavLink>
            );
          })}
        </div>
        <div className="create-note"></div>
      </div>
    </section>
  );
};
export default DisplayAllNotes;
