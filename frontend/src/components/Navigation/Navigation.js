import { NavLink, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Navigation.css";
import { useEffect, useState } from "react";
import ManageAccount from "./ManageAccount";
import { createNote } from "../../store/notes";
import { loadNotesThunk } from "../../store/notes";

const Navigation = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const notes = Object.values(useSelector((state) => state.notes));
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();

  const onClick = () => {
    const settingsContainer = document.querySelector(
      ".nav-bar-new-pop-up-container"
    );
    if (clicked) {
      settingsContainer.classList.remove("visible");
      setClicked(false);
    } else {
      settingsContainer.classList.add("visible");
      setClicked(true);
    }
  };
  const parentFunction = (e) => {
    if (clicked) {
      e.stopPropagation();
    }
  };

  const newNote = () => {
    dispatch(createNote());
  };

  useEffect(() => {
    dispatch(loadNotesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (!clicked) return;
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  });

  return (
    <section className="nav-bar-section">
      <header className="nav-bar-header">
        <div className="nav-bar-header-session-username">
          {sessionUser.username}
        </div>
        <ManageAccount />
      </header>
      <div className="nav-bar-button-search">
        <div className="nav-bar-search">
          <i className="fa-solid fa-magnifying-glass nav-bar-magnifying-glass"></i>
          <input placeholder="Search" className="nav-bar-search-input" />
        </div>
        <div className="nav-bar-new-button-container">
          <button className="nav-bar-new-button" onClick={onClick}>
            <div className="nav-bar-new-button-new">
              <i className="fa-solid fa-plus nav-bar-new-button-plus"></i>
              New
            </div>
            <i className="fa-solid fa-chevron-down"></i>
          </button>
          <div
            className="nav-bar-new-pop-up-container"
            onClick={parentFunction}
          >
            <div className="nav-bar-new-pop-up-button-container">
              <button
                className="nav-bar-new-pop-up-button note"
                onClick={newNote}
              >
                <i className="fa-solid fa-note-sticky"></i>
                Note
              </button>
            </div>
            <div className="nav-bar-new-pop-up-button-container">
              <button className="nav-bar-new-pop-up-button tasks">
                <i className="fa-solid fa-circle-check"></i>
                Task
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="nav-bar-links">
        <div className="nav-bar-links-section-one">
          <NavLink exact to="/" className="nav-bar-link">
            <i className="fa-solid fa-house nav-bar-link-icon"></i> Home
          </NavLink>
          <NavLink to={`/notes/${notes[0]?.id}`} className="nav-bar-link">
            <i className="fa-solid fa-note-sticky nav-bar-link-icon"></i> Notes
          </NavLink>
        </div>
        <div className="nav-bar-links-section-two">
          <NavLink to="/notebooks" className="nav-bar-link">
            <i className="fa-solid fa-book  nav-bar-link-icon"></i> Notebooks
          </NavLink>
        </div>
        <div className="nav-bar-links-section-three">
          <NavLink to="/trash" className="nav-bar-link">
            <i className="fa-solid fa-trash nav-bar-link-icon"></i> Trash
          </NavLink>
        </div>
      </div>
    </section>
  );
};
export default Navigation;
