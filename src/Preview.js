import React, { useState, useEffect } from "react";
import { Descriptions, Button, Modal, Spin } from "antd";
import image from "./events_images/ticket.png";
import fail from "./events_images/failed.png";
import axios from "axios";

function Preview({ values, imageUrl, Submit, Edit }) {
  const [id, setId] = useState("");
  const [visible, setVisible] = useState(false);
  const [errorvisible, setErrorVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  let { name, email, prefix, phone, type, tickets } = values;
  const no = `+${prefix}${phone}`;
  let url;

  if (process.env.NODE_ENV === "development") {
    url = "http://localhost:8000";
  }

  if (process.env.NODE_ENV === "production") {
    url = "https://young-inlet-33955.herokuapp.com";
  }
  useEffect(() => {}, [visible], [id]);
  const submitData = () => {
    setLoading(true);
    axios
      .post(`${url}/events`, {
        name: name,
        mobile: no,
        email: email,
        idProof: imageUrl,
        regType: type,
        tickets: tickets
      })
      .then(res => {
        Submit();
        console.log(res);
        setId(res.data.createdEvent._id);
        setLoading(false);
        setVisible(true);
      })
      .catch(err => {
        setLoading(false);
        Submit();
        setErrorVisible(true);
      });
  };

  const handleCancel = () => {
    setVisible(false);
    setErrorVisible(false);
  };

  return (
    <div>
      <Spin spinning={loading} tip="Loading..." size="large">
        <Descriptions
          bordered
          column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
        >
          <Descriptions.Item label="Full Name" editing="true">
            {name}
          </Descriptions.Item>
          <Descriptions.Item label="E-mail">{email}</Descriptions.Item>
          <Descriptions.Item label="Phone">
            +{prefix}
            {phone}
          </Descriptions.Item>

          <Descriptions.Item label="ID">
            {" "}
            {imageUrl ? (
              <img src={imageUrl} alt="id" style={{ width: "100%" }} />
            ) : (
              <p>Upload an id proof</p>
            )}{" "}
          </Descriptions.Item>

          <Descriptions.Item label="Registration Type">
            {type}
          </Descriptions.Item>
          <Descriptions.Item label="Tickets">{tickets}</Descriptions.Item>
        </Descriptions>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginTop: "40px" }}
          onClick={submitData}
        >
          Submit
        </Button>
        <Button
          type="primary"
          style={{ marginTop: "40px", marginLeft: "40px" }}
          onClick={Edit}
        >
          Edit
        </Button>
      </Spin>

      <Modal
        visible={visible}
        onCancel={handleCancel}
        footer={null}
        bodyStyle={{ height: "auto" }}
      >
        <img
          src={image}
          alt="Success"
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "20%"
          }}
        />
        <h3 style={{ textAlign: "center" }}>Registration successfull</h3>
        <h3 style={{ textAlign: "center" }}>Reg id-{id}</h3>
      </Modal>

      <Modal
        visible={errorvisible}
        onCancel={handleCancel}
        footer={null}
        bodyStyle={{ height: "auto" }}
      >
        <img
          src={fail}
          alt="Failed"
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "20%"
          }}
        />
        <h3 style={{ textAlign: "center" }}>Registration Failed</h3>
        <h3 style={{ textAlign: "center" }}>Please try again</h3>
      </Modal>
    </div>
  );
}

export default Preview;
