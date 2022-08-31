import {Route, Switch} from "react-router-dom";
import Landing from "./components/Landing";
import NotFound from "./components/Layouts/NotFound";

function App() {
  return (
      <div>
        <Switch>
          <Route exact path={"/"} component={Landing} />
          <Route exact component={NotFound} />
        </Switch>
      </div>
  );
}

export default App;
