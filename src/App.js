import {Route, Switch} from "react-router-dom";
import Landing from "./components/Landing";
import NotFound from "./components/Layouts/NotFound";
import {Navbar} from "./components/Layouts/Navbar";
import React from "react";
import Privacy from "./components/Privacy";
import Terms from "./components/Terms";
import Notice from "./components/Layouts/Notice";

function App() {
    return (
        <div>
            <Notice/>
            <Navbar/>
            <Switch>
                <Route exact path={"/"} component={Landing}/>
                <Route exact path={"/privacy"} component={Privacy}/>
                <Route exact path={"/terms"} component={Terms}/>
                <Route exact component={NotFound}/>
            </Switch>
        </div>
    );
}

export default App;
