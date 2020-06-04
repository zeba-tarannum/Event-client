import React, { useState, useEffect } from "react";
// import "./App.css";
import { Button, Modal, Descriptions, Upload, Form, Select, Input } from "antd";
import RegisterEvent from "./RegisterEvent";
import Preview from "./Preview";

function GetPass(props) {
  const [visible, setVisible] = useState(false);
  const [previsible, setPreVisible] = useState(false);
  const [imageUrl, setimageUrl] = useState("");
  const [values, setValues] = useState({});

  const getUrl = url => {
    setimageUrl(url);
  };

  const handleSubmit = values => {
    setValues(values);
    setVisible(false);
    setPreVisible(true);
    console.log("visible", visible);
    console.log("previsible", previsible);
  };

  const handleReg = () => {
    setVisible(true);
  };

  const handleCancel = e => {
    setVisible(false);
    setPreVisible(false);
  };

  const handleEdit = () => {
    setPreVisible(false);
    setVisible(true);
    console.log("Because of edit");
  };

  return (
    <>
      <Button
        //  style={{ backgroundColor: "green", color: "white" }}
        onClick={handleReg}
      >
        Get A Pass
      </Button>

      <Modal
        title="Registration Details "
        visible={visible}
        closable={true}
        okText="Back"
        onCancel={handleCancel}
        //  cancelButtonProps={{ style: { display: "none" } }}
        footer={null}
        bodyStyle={{ height: "80vh" }}
      >
        <RegisterEvent
          Submit={handleSubmit}
          Cancel={handleCancel}
          getUrl={getUrl}
        />
      </Modal>
      <Modal
        title="Preview"
        visible={previsible}
        closable={true}
        footer={null}
        onCancel={handleCancel}
        // bodyStyle={{ height: "80vh" }}
      >
        <Preview
          values={values}
          imageUrl={imageUrl}
          Submit={handleCancel}
          Edit={handleEdit}
        />
      </Modal>
    </>
  );
}

export default GetPass;
