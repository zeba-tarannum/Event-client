import React, { useState } from "react";
import "./App.css";
import { Button, Modal } from "antd";
import RegisterEvent from "./RegisterEvent";
import Preview from "./Preview";

function GetPass({ width }) {
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
        className="mybtn"
        style={{
          width: width ? "100%" : "auto",
          border: width ? "none" : "auto",
          color: width ? "white" : "auto"
        }}
      >
        Get a pass
      </Button>

      <Modal
        className="register"
        title="Registration Details "
        style={{ top: 20 }}
        visible={visible}
        closable={true}
        okText="Back"
        onCancel={handleCancel}
        footer={null}
      >
        <RegisterEvent
          Submit={handleSubmit}
          Cancel={handleCancel}
          getUrl={getUrl}
        />
      </Modal>
      <Modal
        title="Preview"
        style={{ top: 20 }}
        visible={previsible}
        closable={true}
        footer={null}
        onCancel={handleCancel}
        bodyStyle={{ height: "auto" }}
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
