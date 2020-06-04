import React, { useState } from "react";
import { Descriptions, Button, Typography, Modal } from "antd";
import { Link } from "react-router-dom";
import Success from "./Success";
import { message } from "antd";

import axios from "axios";
import { PropertySafetyFilled } from "@ant-design/icons";

// const { Paragraph } = Typography;

function Preview({ values, imageUrl, Submit, Edit }) {
  // const [id, setId] = useState();
  // console.log(props);
  // const { state } = props.location;
  // const { values, imageUrl } = state;
  let { name, email, prefix, phone, type, tickets } = values;
  const no = `+${prefix}${phone}`;
  // var bindata = new Buffer(imageUrl.split(",")[1], "base64");

  const onChange = name => {
    name = name;
    console.log("Content change:", name);
  };

  const submitData = () => {
    Submit();
    axios
      .post(`https://young-inlet-33955.herokuapp.com/events`, {
        name: name,
        mobile: no,
        email: email,
        idProof: imageUrl,
        regType: type,
        tickets: tickets
      })
      .then(res => {
        message.success(
          `Successfully registered for event and id is:${res.data.createdEvent._id}`
        );
        // setId(res.data.createdEvent._id);
        //   return alert(res.data.createdEvent._id);
      });
  };

  return (
    <div>
      <Descriptions
        bordered
        column={{ xxl: 2, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
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

        <Descriptions.Item label="Registration Type">{type}</Descriptions.Item>
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
      {/* <Link
        to={{
          pathname: "/",
          state
        }}
      >
        Edit
      </Link> */}
    </div>
  );
}

export default Preview;
