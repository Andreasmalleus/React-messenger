import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

const App = () =>{
    return(
        <Router>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/signup"component={Signup} />
                <Route path="/" component={Home}/>
            </Switch>
        </Router>
    )
}

export default App;