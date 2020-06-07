import React from "react";
import "./App.css";
import Topcarousel from "./Topcarousel";
import UpcomingEvents from "./UpcomingEvents";
import { Divider } from "antd";

import Header from "./Header";

function App(props) {
  return (
    <>
      <Header props={props} />
      <br />
      <Topcarousel />
      <Divider orientation="left">Upcoming events</Divider>
      <UpcomingEvents />
    </>
  );
}

export default App;
