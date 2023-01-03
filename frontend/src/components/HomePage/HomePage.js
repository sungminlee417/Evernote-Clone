import { Route, Switch } from "react-router-dom";
import DisplayNotebooks from "../Notebooks/DisplayNotebooks";
import Navigation from "../Navigation";
import "./HomePage.css";
import Notes from "../NoteComponents/Notes";
import home_photo from "../../images/sean-benesh-wK8LMfHtRoM-unsplash.jpg";
import HomePageHeader from "./HomePageHeader/HomePageHeader";
import HomePageNotes from "./HomePageNotes";
const HomePage = () => {
  return (
    <section className="home-page-section">
      <Navigation />
      <Switch>
        <Route exact path="/">
          <section className="home-page-section-design">
            <HomePageHeader />
            <img className="home-page-photo" src={home_photo} alt="home"></img>
            <HomePageNotes />
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
