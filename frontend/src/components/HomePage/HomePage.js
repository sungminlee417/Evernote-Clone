import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import DisplayNotebooks from "../Notebooks/DisplayNotebooks";

const HomePage = () => {
  return (
    <div>
      <Switch>
        <Route path="/notebooks">
          <DisplayNotebooks />
        </Route>
      </Switch>
    </div>
  );
};

export default HomePage;
