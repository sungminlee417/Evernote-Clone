import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { loadNotesByTagIdThunk, clearNotes } from "../../../store/notes";
import { loadTagsThunk } from "../../../store/tags";
import noNotes from "../../../images/no-notes-with-tag.svg";
import "./DisplayTagNotes.css";

const DisplayTagNotes = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const identifyTag = location.search.charAt(location.search.indexOf("=") + 1)
  const notes = Object.values(useSelector((state) => state.notes));
  const tags = useSelector((state) => state.tags);
  const convertDate = (date) => {
    const dateTime = new Date(date);
    const formatDate = dateTime.toDateString();
    return formatDate.slice(4);
  };


  useEffect(() => {
    dispatch(loadNotesByTagIdThunk());
    dispatch(loadTagsThunk());

    return () => dispatch(clearNotes());
  }, [dispatch]);

  return (
    <section className="notes-section">
      <div className="list-notes">
        <div className="list-notes-header">
          <div className="list-notes-header-header">
            <i className="fa-solid fa-note-sticky"></i>
            <span>Notes</span>
          </div>
          <div className="list-notes-header-sub"> {notes.length} {notes.length == 1 ? "note" : "notes"}{" "}</div>
        </div>
        <div className="display-note-filters">
          <div className="display-note-filters-header">
            FILTERS
            <NavLink to="/notes" className="clear-filters">
              Clear
            </NavLink>
          </div>
          <div className="display-note-filter-names">
            <i className="fa-solid fa-tag"></i>
            {tags[identifyTag]?.name}
          </div>
          <div className="display-note-tags">
          </div>
        </div>
        {notes.length > 0 ? (
          <div className="notes-list">
            {notes.reverse().map((note, i) => {
              return (
                <NavLink
                  className="display-note-container"
                  key={i}
                  to={`/notes/${note.id}`}
                >
                  <div className="display-note-container-name">{note.name}</div>
                  <div className="display-note-container-content">
                    {note?.content}
                  </div>
                  <div className="display-note-container-created-at">
                    {convertDate(note?.updatedAt)}
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
                No notes found
              </div>
              <div className="display-notes-no-notes-text">
                Try using a different keyword or filter. 
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default DisplayTagNotes;
