import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignUpFormPage from "./components/SignUpFormPage";
import * as sessionActions from "./store/session";
import LandingPage from "./components/LandingPage/LandingPage";
import HomePage from "./components/HomePage";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    isLoaded && (
      <>
        {isLoaded && currentUser ? (
          <Route path="/">
            <HomePage />
          </Route>
        ) : (
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/login">
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignUpFormPage />
            </Route>
          </Switch>
        )}
      </>
    )
  );
}

export default App;
