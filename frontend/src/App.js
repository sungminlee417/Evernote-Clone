import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from 'react-router-dom'
import Navigation from "./components/Navigation";
import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import SignUpFormPage from "./components/SignUpFormPage/SignUpFormPage";
import * as sessionActions from "./store/session";
import LandingPage from "./components/LandingPage";
import Notebooks from "./components/Notebooks";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
    {/* <Navigation/> */}
    <Switch>
      <Route exact path="/">
        <LandingPage/>
      </Route>
      <Route path="/login">
        <LoginFormPage/>
      </Route>
      <Route path="/signup">
        <SignUpFormPage/>
      </Route>
      <Route path ="/notebooks">
        <Notebooks/>
      </Route>
    </Switch></>
  );
}

export default App;
