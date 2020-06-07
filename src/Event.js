import React, { useState } from "react";
import axios from "axios";
import { Descriptions, Modal, Spin } from "antd";

function Event({ id }) {
  const [event, setEvent] = useState({});
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  let url;

  if (process.env.NODE_ENV === "development") {
    url = "http://localhost:8000";
  }

  if (process.env.NODE_ENV === "production") {
    url = "https://young-inlet-33955.herokuapp.com";
  }

  const handleOk = e => {
    console.log(visible);
    setVisible(false);
  };
  const displayInfo = event => {
    //  alert(event.target.innerText);
    setLoading(true);
    let x = event.target.innerText;
    setVisible(true);
    axios
      .get(`${url}/events/${x}`)
      .then(res => {
        setLoading(false);
        console.log(res.data);
        setEvent(res.data);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      {/* eslint-disable-next-line */}
      <a onClick={displayInfo}>{id}</a>
      <Modal
        title="Registration Details "
        style={{ height: "auto" }}
        visible={visible}
        onOk={handleOk}
        onCancel={handleOk}
        closable={true}
        okText="Back"
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Spin spinning={loading} tip="Loading..." size="large">
          <Descriptions
            bordered
            column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
          >
            <Descriptions.Item label="ID">{event._id}</Descriptions.Item>
            <Descriptions.Item label="Full Name">
              {event.name}
            </Descriptions.Item>
            <Descriptions.Item label="E-mail">{event.email}</Descriptions.Item>
            <Descriptions.Item label="Mobile No">
              {event.mobile}
            </Descriptions.Item>
            <Descriptions.Item label="ID Proof">
              <img
                src={event.idProof}
                alt="loading"
                style={{ width: "80px", height: "80px" }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Registration Type">
              {event.regType}
            </Descriptions.Item>
            <Descriptions.Item label="Tickets" editing="true">
              {event.tickets}
            </Descriptions.Item>
          </Descriptions>
        </Spin>
      </Modal>
    </div>
  );
}

export default Event;
