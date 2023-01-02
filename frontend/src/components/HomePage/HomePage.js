import { Route, Switch, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DisplayNotebooks from "../Notebooks/DisplayNotebooks";
import Navigation from "../Navigation";
import "./HomePage.css";
import Notes from "../NoteComponents/Notes";
import home_photo from "../../images/sean-benesh-wK8LMfHtRoM-unsplash.jpg";
import HomePageHeader from "./HomePageHeader/HomePageHeader";
import click_notes from "../../images/green-side-arrow.svg";
import options from "../../images/modify.svg";
import view_notes from "../../images/view-notes.svg";
import { loadNotesThunk, clearNotes } from "../../store/notes";

const HomePage = () => {
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

  useEffect(() => {
    dispatch(loadNotesThunk());

    return () => dispatch(clearNotes());
  }, [dispatch]);

  return (
    <section className="home-page-section">
      <Navigation />
      <Switch>
        <Route exact path="/">
          <section className="home-page-section-design">
            <HomePageHeader />
            <img className="home-page-photo" src={home_photo} alt="home"></img>
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
                    <div className="home-page-create-new-note">
                      Create new note
                    </div>
                  </div>
                </div>
                <div className="home-page-view-notes">
                  <div className="home-page-notes-list">
                    {notes.reverse().map((note, i) => {
                      return (
                        <NavLink
                          className="home-page-display-note-container"
                          key={i}
                          to={`/notes/${note.id}`}
                        >
                          <div className="home-page-display-note-container-name">
                            {note?.name}
                          </div>
                          <div className="display-note-container-content">
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
                        <div className="home-page-view-notes-text-label">
                          Notes
                        </div>
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
          </section>
        </Route>
        <Route path="/notebooks/:notebookId">
          <Notes />
        </Route>
        <Route path="/notebooks">
          <DisplayNotebooks />
        </Route>
        <Route path="/notes">
          <Notes />
        </Route>
      </Switch>
    </section>
  );
};

export default HomePage;
