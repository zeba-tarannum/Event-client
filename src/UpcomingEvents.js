import React from "react";
import { Card, List } from "antd";
import GetPass from "./GetPass";

const { Meta } = Card;

const data = [
  {
    title: "National Geographic",
    date: "10th June 2020",
    img:
      "https://www.nationalgeographic.com/content/dam/ngdotcom/rights-exempt/events/home/gold-coast_cr-scott-belzner.adapt.1900.1.jpg"
  },
  {
    title: "New Scientist",
    date: "30th June 2020",
    img:
      "https://www.newscientist.com/build/images/assets/img/events-homepage-banner-mobile.jpg?ver=f0fd05fbf145e5fa635ebddfc8755947ba031170"
  },
  {
    title: "Event city",
    date: "16th July 2020",
    img: "https://www.eventcity.co.uk/media/2452/homepage-1.jpg"
  },
  {
    title: "Linux foundation",
    date: "20th July 2020",
    img:
      "https://events.linuxfoundation.org/wp-content/uploads/2019/09/welcome.jpg"
  },
  {
    title: "Microsoft",
    date: "25th July 2020",
    img:
      "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE2R9pI?ver=0c21&q=90&h=675&w=830&b=%23FFFFFFFF&aim=true"
  },
  {
    title: "Mwc barcelona conference",
    date: "10th August 2020",
    img:
      "https://www.mwcbarcelona.com/wp-content/uploads/2019/09/conference-programmes-featured-wide-2x.jpg"
  },
  {
    title: "Intelligent connectivity",
    date: "6th September 2020",
    img:
      "https://cwpwp.betterthanpaper.com/wp-content/uploads/2019/03/GMSA-talk-MWC.png"
  },
  {
    title: "Spectrum",
    date: "24th September 2020",
    img:
      "https://i1.wp.com/www.gsma.com/spectrum/wp-content/uploads/2019/11/Luciana-at-WRC-19.png?w=900&ssl=1"
  }
];

function UpcomingEvents() {
  return (
    <List
      style={{ margin: "0 15%" }}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 3,
        xxl: 3
      }}
      dataSource={data}
      renderItem={item => (
        <List.Item style={{ marginTop: "3vh" }}>
          <Card
            bodyStyle={{ padding: "0px", paddingTop: "10px" }}
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                src={item.img}
                alt={item.title}
                style={{ height: "32vh", width: "239px" }}
              />
            }
          >
            <Meta
              title={item.date}
              description={item.title}
              style={{ textAlign: "center" }}
            />
            <div
              style={{
                textAlign: "center",
                backgroundColor: "#177ddcc7",
                margin: "10px",
                borderRadius: "16px"
              }}
            >
              <GetPass width="true" />
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
}

export default UpcomingEvents;
