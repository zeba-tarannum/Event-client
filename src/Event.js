import React, { useEffect, useState } from "react";
import axios from "axios";
import { Descriptions, Modal } from "antd";

function Event({ id }) {
  const [event, setEvent] = useState({});
  const [visible, setVisible] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8000/events/${id}`)
  //     .then(res => {
  //       console.log(res.data);
  //       setEvent(res.data);
  //     })
  //     .catch(err => console.log(err));
  // }, []);

  const handleOk = e => {
    console.log(visible);
    setVisible(false);
  };
  const displayInfo = event => {
    //  alert(event.target.innerText);
    let x = event.target.innerText;
    setVisible(true);
    axios
      .get(`https://young-inlet-33955.herokuapp.com/events/${x}`)
      .then(res => {
        console.log(res.data);
        setEvent(res.data);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      {/* {console.log(event)} */}
      <p onClick={displayInfo}>{id}</p>
      <Modal
        title="Registration Details "
        visible={visible}
        onOk={handleOk}
        closable={true}
        okText="Back"
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Descriptions
          bordered
          column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
        >
          <Descriptions.Item label="ID">{event._id}</Descriptions.Item>
          <Descriptions.Item label="Full Name">{event.name}</Descriptions.Item>
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
      </Modal>
    </div>
  );
}

export default Event;
