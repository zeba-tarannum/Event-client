import React, { useState, useEffect } from "react";
// import "./light.css";
import "./App.css";
import Topcarousel from "./Topcarousel";
import UpcomingEvents from "./UpcomingEvents";
import { Divider } from "antd";

import Header from "./Header";
//import "antd/dist/antd.dark.css";

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
