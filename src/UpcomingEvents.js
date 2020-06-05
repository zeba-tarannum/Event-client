import React from "react";
import { Card, Row, Col, List } from "antd";
import GetPass from "./GetPass";

const { Meta } = Card;

const data = [
  {
    title: "Event 1",
    img:
      "https://www.newstatesman.com/sites/all/themes/creative-responsive-theme/images/new_statesman_events.jpg"
  },
  {
    title: "Event 2",
    img:
      "https://www.newscientist.com/build/images/assets/img/events-homepage-banner-mobile.jpg?ver=f0fd05fbf145e5fa635ebddfc8755947ba031170"
  },
  {
    title: "Event 3",
    img:
      "https://events.3ds.com/sites/default/files/2019-11/science-age-of-experience-post-event-image-3.jpg"
  },
  {
    title: "Event 4",
    img: "https://www.abdn.ac.uk/img/450x/news/images/Science_conference.jpg"
  },
  {
    title: "Event 5",
    img:
      "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE2R9pI?ver=0c21&q=90&h=675&w=830&b=%23FFFFFFFF&aim=true"
  },
  {
    title: "Event 6",
    img:
      "https://www.mwcbarcelona.com/wp-content/uploads/2019/09/conference-programmes-featured-wide-2x.jpg"
  },
  {
    title: "Event 7",
    img:
      "https://cwpwp.betterthanpaper.com/wp-content/uploads/2019/03/GMSA-talk-MWC.png"
  },
  {
    title: "Event 8",
    img:
      "https://i1.wp.com/www.gsma.com/spectrum/wp-content/uploads/2019/11/Luciana-at-WRC-19.png?w=900&ssl=1"
  }
];

function UpcomingEvents() {
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 4,
        xxl: 3
      }}
      dataSource={data}
      renderItem={item => (
        <List.Item style={{ margin: "30px" }}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                src={item.img}
                alt={item.title}
                style={{ height: "50vh", width: "239px" }}
              />
            }
            actions={[<GetPass />]}
            //    style={{ marginLeft: "90px" }}
          >
            <Meta
              //  title={item.title}
              description={item.title}
              style={{ textAlign: "center" }}
            />
          </Card>
        </List.Item>
      )}
    />
    // <div className="site-card-wrapper">
    //   <Row gutter={16}>
    //     <Col span={8}>
    //       <Card
    //         hoverable
    //         style={{ width: 240 }}
    //         cover={
    //           <img
    //             src={image1}
    //             alt="event1"
    //             style={{ height: "44vh", width: "40vh" }}
    //           />
    //         }
    //       >
    //         <Meta title="Europe Street beat" description="www.instagram.com" />
    //       </Card>
    //     </Col>
    //     <Col span={8}>
    //       <Card
    //         hoverable
    //         style={{ width: 240 }}
    //         cover={
    //           <img
    //             src={image2}
    //             alt="event1"
    //             style={{ height: "44vh", width: "40vh" }}
    //           />
    //         }
    //       >
    //         <Meta title="Europe Street beat" description="www.instagram.com" />
    //       </Card>
    //     </Col>
    //     <Col span={8}>
    //       <Card
    //         hoverable
    //         style={{ width: 240 }}
    //         cover={
    //           <img
    //             src={image3}
    //             alt="event1"
    //             style={{ height: "44vh", width: "40vh" }}
    //           />
    //         }
    //       >
    //         <Meta title="Europe Street beat" description="www.instagram.com" />
    //       </Card>
    //     </Col>
    //   </Row>
    // </div>
  );
}

export default UpcomingEvents;
