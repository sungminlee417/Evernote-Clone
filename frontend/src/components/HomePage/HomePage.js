import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import DisplayNotebooks from "../Notebooks/DisplayNotebooks";
import Navigation from "../Navigation";
import "./HomePage.css";
import Notes from "../NoteComponents/Notes";
import home_photo from "../../images/sean-benesh-wK8LMfHtRoM-unsplash.jpg"
import HomePageHeader from "./HomePageHeader/HomePageHeader";
import click_notes from "../../images/green-side-arrow.svg";
import options from "../../images/modify.svg"
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <section className="home-page-section">
      <Navigation />
      <Switch>
        <Route exact path ="/">
          <section className="home-page-section-design">
            <HomePageHeader/>
            <img className="home-page-photo" src={home_photo}></img>
            <div className="home-page-notes-subsection">
              <div className="home-page-notes-container">
                <div className="home-page-notes-header">
                  <NavLink to="/notes" className="home-page-notes-title">
                   <div className="home-page-notes-text">NOTES</div>
                    <img className="click-for-note-page" 
                        src={click_notes}
                        alt="get_notes">
                    </img>
                  </NavLink>
                  <img className="home-page-notes-options"
                       src={options}
                       alt="notes_options">
                  </img>
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
