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
          src={image1}
          alt="event1"
          width="100%"
          style={{ height: "44vh" }}
        />
        {/* <div class="bottom-right">Centered</div> */}
      </div>
      <div class="container">
        <img
          src={image2}
          alt="event1"
          width="100%"
          style={{ height: "44vh" }}
        />
        {/* <div class="bottom-right">Centered</div> */}
      </div>
      <div class="container">
        <img
          src={image3}
          alt="event1"
          width="100%"
          style={{ height: "44vh" }}
        />
        {/* <div class="bottom-right">Centered</div> */}
      </div>
    </Carousel>
  );
}

export default Topcarousel;
