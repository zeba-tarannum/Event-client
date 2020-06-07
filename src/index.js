import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Preview from "./Preview";
import Data from "./Data";

import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";
import history from "./history";
import RegisterEvent from "./RegisterEvent";
ReactDOM.render(
  <Router history={history}>
    <Route exact path="/" component={App} />
    <Route path="/register" component={RegisterEvent} />
    <Route path="/preview" component={Preview} />
    <Route path="/info" component={Data} />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
