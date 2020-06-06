import React from "react";
import { Carousel } from "antd";
import image1 from "./events_images/event1.jpg";
import image2 from "./events_images/event2.jpg";
import image3 from "./events_images/event3.jpg";

function Topcarousel() {
  return (
    <Carousel autoplay>
      <div class="container">
        <img
          src="https://images.pexels.com/photos/625644/pexels-photo-625644.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="event1"
          width="100%"
          style={{ height: "46vh" }}
        />
        {/* <div class="bottom-right">Centered</div> */}
      </div>
      <div class="container">
        <img
          src="https://images.pexels.com/photos/382297/pexels-photo-382297.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="event2"
          width="100%"
          style={{ height: "46vh" }}
        />
        {/* <div class="bottom-right">Centered</div> */}
      </div>
      <div class="container">
        <img
          src="https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="event1"
          width="100%"
          style={{ height: "46vh" }}
        />
        {/* <div class="bottom-right">Centered</div> */}
      </div>
      <div class="container">
        <img
          src="https://images.pexels.com/photos/593345/pexels-photo-593345.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="event1"
          width="100%"
          style={{ height: "46vh" }}
        />
        {/* <div class="bottom-right">Centered</div> */}
      </div>
    </Carousel>
  );
}

export default Topcarousel;
