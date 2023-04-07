import React from "react";
import { Route, Switch } from "react-router-dom";
import DisplayNotebooks from "../Notebooks/DisplayNotebooks";
import Navigation from "../Navigation/Navigation";
import Notes from "../NoteComponents/Notes";
import HomePageNotes from "./HomePageNotes";
import HomePageHeader from "./HomePageHeader";

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
          <section className="flex flex-col grow">
            <HomePageHeader />
            <HomePageNotes />
          </section>
        </Route>
      </Switch>
    </section>
  );
};

export default HomePage;
