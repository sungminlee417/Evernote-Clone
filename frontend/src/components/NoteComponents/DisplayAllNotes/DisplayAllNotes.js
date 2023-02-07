import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { loadNotesThunk, clearNotes } from "../../../store/notes";
import noNotes from "../../../images/svgexport-28.svg";
import "./DisplayAllNotes.css";

const DisplayAllNotes = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const notes = Object.values(useSelector((state) => state.notes));
  const [tags, setTags] = useState([]);
  console.log(tags)
  console.log(location.state)
  const convertDate = (date) => {
    const dateTime = new Date(date);
    const formatDate = dateTime.toDateString();
    return formatDate.slice(4);
  };
  const removeTags = ()=> {
    setTags([]);
  }
  useEffect(() => {
    dispatch(loadNotesThunk());
    if (location.state) {
      if (location.state.tag) {
        const { tag } = location.state;
        setTags([tag]);
        dispatch(loadNotesThunk());
      }
    }
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
        <div> 
          {tags.length > 0 &&
            <div className="display-note-filters">
              <div className="display-note-filters-header">
                FILTER
                <div className="clear-filters" onClick={removeTags}>
                  Clear
                </div>
              </div>
              <div className="display-note-filter-names">
                <i className="fa-solid fa-tag"></i>
                name
              </div>
              <div className="display-note-tags">
              </div>
            </div>
          }          
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
