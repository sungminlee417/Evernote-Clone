import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage/LoginFormPage";
import SignUpFormPage from "./components/SignUpFormPage/SignUpFormPage";
import * as sessionActions from "./store/session";
import LandingPage from "./components/LandingPage";
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
          <HomePage />
        ) : (
          <Switch>
            <Route exact path="/">
              {/* <Header /> */}
              <LandingPage />
              {/* <Footer /> */}
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
