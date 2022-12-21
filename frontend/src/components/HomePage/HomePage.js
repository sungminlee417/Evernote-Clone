import { Route, Switch, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DisplayNotebooks from "../Notebooks/DisplayNotebooks";
import Navigation from "../Navigation";
import "./HomePage.css";
import Notes from "../NoteComponents/Notes";
import home_photo from "../../images/sean-benesh-wK8LMfHtRoM-unsplash.jpg";
import HomePageHeader from "./HomePageHeader/HomePageHeader";
import click_notes from "../../images/green-side-arrow.svg";
import options from "../../images/modify.svg";
import DisplayAllNotes from "../NoteComponents/DisplayAllNotes";
import ViewAndEditNote from "../NoteComponents/ViewAndEditNote";
import view_notes from "../../images/view-notes.svg"
import { loadNotesThunk, clearNotes } from "../../store/notes";


const HomePage = () => {
  const dispatch = useDispatch();
  const notes = Object.values(useSelector((state) => state.notes));
  // useEffect(() => {
  //   dispatch(loadNotesThunk());
  // }, [dispatch]);
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
            <img className="home-page-photo" src={home_photo}></img>
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
                  ></img>
                </div>
                <div className="home-page-view-notes">
                  <div className="home-page-notes-list">
                    {notes.map((note, i) => {
                      return (
                        <NavLink
                          className="home-page-display-note-container"
                          key={i}
                          to={`/notes/${note.id}`}
                        >
                          <div className="home-page-display-note-container-name">{note?.name}</div>
                          <div className="display-note-container-created-at">
                            {note?.createdAt}
                          </div>
                        </NavLink>
                      );
                    })}
                  </div> 
                  <NavLink to="/notes" className="home-page-view-all-notes">
                    <img className="home-page-view-notes-svg" src={view_notes} alt="view-notes"></img>
                    <div className="home-page-view-notes-text">
                      <div className="home-page-view-notes-text-label">Notes</div>
                      <div className="home-page-view-notes-text-length"> ({notes.length})</div>
                    </div>
                  </NavLink>     
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
        <Route exact path="/notebooks">
          <DisplayNotebooks />
        </Route>
        <Route path="/notebooks/:notebookId">
          <Notes />
        </Route>
        <Route path="/notes">
          <Notes />
        </Route>
      </Switch>
    </section>
  );
};

export default HomePage;
