import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./HomePageNotes.css";
import click_notes from "../../../images/green-side-arrow.svg";
import options from "../../../images/modify.svg";
import view_notes from "../../../images/view-notes.svg";
import { loadNotesThunk, createNote, clearNotes } from "../../../store/notes";

const HomePageNotes = () => {
  const dispatch = useDispatch();
  const [settingsClicked, setSettingsClicked] = useState(false);
  const notes = Object.values(useSelector((state) => state.notes));
  const convertDate = (date) => {
    const dateTime = new Date(date);
    const formatDate = dateTime.toDateString();
    return formatDate.slice(4);
  };

  useEffect(() => {
    if (!settingsClicked) return;

    const settingsContainer = document.querySelector(
      ".home-page-notes-options-container"
    );

    const closeSettings = () => {
      settingsContainer.classList.remove("visible");
      setSettingsClicked(false);
    };
    document.addEventListener("click", closeSettings);
    return () => document.removeEventListener("click", closeSettings);
  }, [settingsClicked]);

  const showSettings = () => {
    const settingsContainer = document.querySelector(
      ".home-page-notes-options-container"
    );

    if (settingsClicked) {
      settingsContainer.classList.remove("visible");
      setSettingsClicked(false);
    } else {
      settingsContainer.classList.add("visible");
      setSettingsClicked(true);
    }
  };

  const newNote = () => {
    dispatch(createNote()).then(() => {
      dispatch(loadNotesThunk());
    });
  };

  useEffect(() => {
    dispatch(loadNotesThunk());

    return () => dispatch(clearNotes());
  }, [dispatch]);

  return (
    <div className="home-page-notes-subsection">
      <div className="home-page-notes-container">
        <div className="home-page-notes-header">
          <NavLink to="/notes" className="home-page-notes-title">
            <div className="home-page-notes-text">NOTES</div>
            <img
              className="click-for-note-page"
              src={click_notes}
              alt="get_notes"
            ></img>
          </NavLink>
          <img
            className="home-page-notes-options"
            src={options}
            alt="notes_options"
            onClick={showSettings}
          ></img>
          <div className="home-page-notes-options-container">
            <NavLink to="/notes" className="home-page-go-to-notes">
              Go to Notes
            </NavLink>
            <div className="home-page-create-new-note" onClick={newNote}>
              Create new note
            </div>
          </div>
        </div>
        <div className="home-page-view-notes">
          <div className="home-page-notes-list">
            {notes.reverse().map((note) => {
              return (
                <NavLink
                  className="home-page-display-note-container"
                  key={note.id}
                  to={`/notes/${note.id}`}
                >
                  <div className="home-page-display-note-container-name">
                    {note?.name}
                  </div>
                  <div className="home-page-display-note-container-content">
                    {note?.content}
                  </div>
                  <div className="display-note-container-created-at">
                    {convertDate(note?.updatedAt)}
                  </div>
                </NavLink>
              );
            })}
            <NavLink to="/notes" className="home-page-view-all-notes">
              <img
                className="home-page-view-notes-svg"
                src={view_notes}
                alt="view-notes"
              ></img>
              <div className="home-page-view-notes-text">
                <div className="home-page-view-notes-text-label">Notes</div>
                <div className="home-page-view-notes-text-length">
                  {" "}
                  ({notes.length})
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="home-page-scratch-pad">
        <div className="home-page-scratch-pad-header">
          <div className="home-page-scratch-pad-text">SCRATCH PAD</div>
        </div>
        <textarea
          className="home-page-scratch-pad-input"
          placeholder="Start writing..."
        />
      </div>
    </div>
  );
};

export default HomePageNotes;
