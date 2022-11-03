import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from 'react-router-dom'
import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import SignUpFormPage from "./components/SignUpFormPage/SignUpFormPage";
import * as sessionActions from "./store/session";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <Switch>
      <Route path="/login">
        <LoginFormPage/>
      </Route>
      <Route path="/signup">
        <SignUpFormPage/>
      </Route>
    </Switch>
  );
}

export default App;