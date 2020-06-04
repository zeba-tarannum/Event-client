import React, { useState } from "react";
// import "./App.css";
import { PageHeader, Button, Modal } from "antd";
import GetPass from "./GetPass";
import Login from "./Login";

import { useHistory } from "react-router-dom";

function Header() {
  const [visible, setVisible] = useState(false);
  let history = useHistory();

  const handleOk = values => {
    console.log("Success:", values);
    setVisible(false);

    history.push("/info", values);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <PageHeader
        ghost={false}
        className="site-page-header"
        title="Events Registration"
        extra={[
          <GetPass />,

          <Button
            key="1"
            // style={{ backgroundColor: "green", color: "white" }}
            onClick={() => setVisible(true)}
          >
            Login As Admin
          </Button>
        ]}
      />
      <Modal
        title="Login"
        visible={visible}
        footer={null}
        style={{ alignItem: "center" }}
        onCancel={handleCancel}
      >
        <Login Submit={handleOk} />
      </Modal>
    </>
  );
}

export default Header;
