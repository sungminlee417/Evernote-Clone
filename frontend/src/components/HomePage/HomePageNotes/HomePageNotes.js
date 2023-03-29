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
    <div className="flex gap-10 justify-between absolute p-10 w-full bottom-0">
      <div className="relative bg-white rounded-md w-[62.5%] shadow-xl">
        <div className="flex justify-between p-6 items-center">
          <NavLink
            to="/notes"
            className="flex items-center gap-2 hover:bg-[#e8e4e4] p-2 rounded-sm"
          >
            <div className="text-2xl font-semibold">NOTES</div>
            <i className="fa-solid fa-chevron-right text-xl text-[#00a82d]"></i>
          </NavLink>
          <button className="hover:bg-[#e8e4e4] text-3xl p-2 w-12 h-12 rounded-sm">
            <i
              className="fa-solid fa-ellipsis m-0"
              src={options}
              alt="notes_options"
              onClick={showSettings}
            />
          </button>
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
