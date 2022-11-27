import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import DisplayNotebooks from "../Notebooks/DisplayNotebooks";
import Navigation from "../Navigation";
import "./HomePage.css";
import Notes from "../NoteComponents/Notes";

const HomePage = () => {
  return (
    <section className="home-page-section">
      <Navigation />
      <Switch>
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
