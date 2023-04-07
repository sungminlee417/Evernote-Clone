import { Route, Switch } from "react-router-dom";
import DisplayNotebooks from "../Notebooks/DisplayNotebooks";
import Navigation from "../Navigation";
import Notes from "../NoteComponents/Notes";
import HomePageHeader from "./HomePageHeader";
import HomePageNotes from "./HomePageNotes";
const HomePage = () => {
  return (
    <section className="flex lg:flex-row flex-col-reverse h-full">
      <Navigation />
      <Switch>
        <Route path="/notebooks/:notebookId">
          <Notes />
        </Route>
        <Route path="/notebooks">
          <DisplayNotebooks />
        </Route>
        <Route path="/notes">
          <Notes />
        </Route>
        <Route exact path="/">
          <section className="flex flex-col grow h-full relative">
            <HomePageHeader />
            <HomePageNotes />
          </section>
        </Route>
      </Switch>
    </section>
  );
};

export default HomePage;
