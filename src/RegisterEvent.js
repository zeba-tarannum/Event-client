import React, { useState } from "react";
import "./index.css";
import { Form, Input, Select, Button, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

async function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 8
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 16
    }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

const normFile = e => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    if (file) {
      onSuccess("ok");
    }
  }, 0);
};

const RegistrationForm = props => {
  var url = "";
  var prevData = {};
  var dis = true;

  if (props.imageUrl !== undefined) {
    console.log("i am in");
    url = props.imageUrl;
    prevData = props.values;

    dis = props.values.type === "Self" ? true : false;
  }
  const [form] = Form.useForm();
  const [disable, setDisable] = useState(dis);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setUrl] = useState(url);

  const handleChange = info => {
    console.log(info);
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, imageUrl => {
        setUrl(imageUrl);
        setLoading(false);
      });
    }
  };

  const handleField = value => {
    if (value === "Self") {
      setDisable(true);

      form.setFieldsValue({ tickets: "1" });
    } else {
      setDisable(false);
      form.setFieldsValue({ tickets: "" });
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle initialValue="91">
      <Select
        style={{
          width: 70
        }}
      >
        <Option value="91">+91</Option>
        <Option value="92">+92</Option>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={props.Submit}
      style={{ float: "left" }}
      initialValues={prevData}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="Full Name"
        rules={[
          {
            type: "string",
            message: "The input is a valid Name!"
          },
          {
            required: true,
            message: "Please input your Name!"
          },
          {
            pattern: /^[a-zA-Z ]+$/,
            message: "Enter characters only"
          },
          {
            min: 3,
            message: "name should be more than 3 char long"
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!"
          },
          {
            required: true,
            message: "Please input your E-mail!"
          },
          {
            pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: "Enter valid imail"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: "Please input your phone number!"
          },
          {
            len: 10,
            message: "Please enter valid number"
          }
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: "100%"
          }}
        />
      </Form.Item>
      <Form.Item
        label="Upload ID Card "
        required="true"
        name="file"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[
          {
            required: true,
            message: "Please upload ID proof"
          }
        ]}
      >
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          customRequest={dummyRequest}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <>
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              {props.getUrl(imageUrl)}
            </>
          ) : (
            uploadButton
          )}
        </Upload>
      </Form.Item>

      <Form.Item label="Registration type :">
        <Form.Item name="type" noStyle initialValue="Self">
          <Select onChange={handleField}>
            <Option value="Self">Self</Option>
            <Option value="Group">Group</Option>
            <Option value="Corporate">Corporate</Option>
            <Option value="Others">Others</Option>
          </Select>
        </Form.Item>
      </Form.Item>

      <Form.Item
        name="tickets"
        label="Tickets"
        initialValue="1"
        rules={[
          {
            required: disable ? false : true,
            message: "Please input number of tickets"
          }
        ]}
      >
        <Input disabled={disable} />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
        <Button
          type="primary"
          onClick={props.Cancel}
          style={{ marginLeft: "20px" }}
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
