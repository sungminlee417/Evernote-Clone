import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { loadNotesThunk, clearNotes } from "../../../store/notes";
import noNotes from "../../../images/svgexport-28.svg";
import "./DisplayAllNotes.css";
import { TagContext } from "../../context/TagContext";

const DisplayAllNotes = () => {
  const { selectedTags, setSelectedTags } = useContext(TagContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const notes = Object.values(useSelector((state) => state.notes));
  const convertDate = (date) => {
    const dateTime = new Date(date);
    const formatDate = dateTime.toDateString();
    return formatDate.slice(4);
  };

  const removeTags = () => {
    setSelectedTags({});
  };

  const removeTag = (tag) => {
    setSelectedTags((tags) => {
      const prevTags = { ...tags };
      delete prevTags[tag.id];
      return prevTags;
    });
  };

  useEffect(() => {
    dispatch(loadNotesThunk(selectedTags)).then((notes) => {
      if (Object.values(notes).length) {
        history.push(`/notes/${notes[notes.length - 1].id}`);
      }
    });

    return () => dispatch(clearNotes());
  }, [dispatch, Object.values(selectedTags).length]);

  return (
    <section className="notes-section">
      <div className="list-notes">
        <div className="list-notes-header">
          <div className="list-notes-header-header">
            <i className="fa-solid fa-note-sticky"></i>
            <span>Notes</span>
          </div>

          <div className="list-notes-header-sub">
            {" "}
            {notes.length} {notes.length == 1 ? "note" : "notes"}{" "}
          </div>
        </div>
        <div>
          {Object.values(selectedTags).length > 0 && (
            <div className="display-note-filters">
              <div className="display-note-filters-header">
                FILTER
                <div className="clear-filters" onClick={removeTags}>
                  Clear
                </div>
              </div>
              <div>
                <ul className="selected-tags">
                  {Object.values(selectedTags).map((tag) => {
                    return (
                      <li className="display-note-filter-names" key={tag.id}>
                        <i className="fa-solid fa-tag"></i>
                        <div>{tag.name}</div>
                        <i
                          class="fa-solid fa-xmark clear-single-filter"
                          onClick={() => removeTag(tag)}
                        ></i>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
        {notes.length > 0 ? (
          <div className="notes-list">
            {notes.reverse().map((note) => {
              return (
                <NavLink
                  className="display-note-container"
                  key={note.id}
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
