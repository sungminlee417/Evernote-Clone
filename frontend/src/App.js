import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from 'react-router-dom'
import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import SignUpFormPage from "./components/SignUpFormPage/SignUpFormPage";
import * as sessionActions from "./store/session";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";
import DisplayNotebooks from "./components/Notebooks/DisplayNotebooks";

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
        <Header/>
        <LandingPage/>
        <Footer/>
      </Route>
      <Route path="/login">
        <LoginFormPage/>
      </Route>
      <Route path="/signup">
        <SignUpFormPage/>
      </Route>
      <Route path ="/notebooks">
        <DisplayNotebooks/>
      </Route>
    </Switch></>
  );
}

export default App;
