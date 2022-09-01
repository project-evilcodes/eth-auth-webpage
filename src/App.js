import {Route, Switch} from "react-router-dom";
import Landing from "./components/Landing";
import NotFound from "./components/Layouts/NotFound";
import {Navbar} from "./components/Layouts/Navbar";
import React from "react";
import Footer from "./components/Layouts/Footer";

function App() {
    return (
        <div>
            <Navbar/>
            <Switch>
                <Route exact path={"/"} component={Landing}/>
                <Route exact component={NotFound}/>
            </Switch>
        </div>
    );
}

export default App;
