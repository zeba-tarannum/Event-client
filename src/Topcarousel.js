import React from "react";
import { Carousel } from "antd";

function Topcarousel() {
  return (
    <Carousel autoplay>
      <div class="container">
        <img
          src="https://images.pexels.com/photos/625644/pexels-photo-625644.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=2000"
          alt="event1"
          width="100%"
          style={{ height: "46vh" }}
        />
      </div>

      <div class="container">
        <img
          src="https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1500"
          alt="event1"
          width="100%"
          style={{ height: "46vh" }}
        />
      </div>
      <div class="container">
        <img
          src="https://images.pexels.com/photos/1306791/pexels-photo-1306791.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1500"
          alt="event1"
          width="100%"
          style={{ height: "46vh" }}
        />
      </div>
    </Carousel>
  );
}

export default Topcarousel;
