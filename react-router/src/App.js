import React, { Component } from "react";
import { Switch , Route, Link, Redirect} from "react-router-dom";

import Message from "./components/Message";
import Informations from "./components/Informations";
import Error from "./components/Error";

import './App.css';

function App() {
  return (
    <div>
      <ul>
        <li><Link to="/message">Voir la page message</Link></li>
        <li><Link to="/informations">Voir la page informations</Link></li>
      </ul>
      <Switch>
        <Route exact path="/message" render={() => <Message userName="John" />} />
        <Route exact path="/informations" component={Informations} />
        <Route exact path="/error" component={Error} />
        <Redirect to="/error" />
      </Switch>
    </div>
  );
}

export default App;
