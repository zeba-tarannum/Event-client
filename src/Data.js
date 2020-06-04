import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Input,
  PageHeader,
  Button,
  Typography,
  Row,
  Col,
  Space,
  Descriptions,
  Modal
} from "antd";
import Graph from "./BarPlot.js";
import { PoweroffOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

const { Text } = Typography;

const style = { background: "#0092ff", padding: "8px 0" };

const Data = props => {
  const [events, setEvents] = useState([]);
  const [types, setTypes] = useState([]);
  const [date, setDate] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [searchedColumn, setsearchedColumn] = useState("");
  const [visible, setVisible] = useState(false);
  const [event, setEvent] = useState({});

  useEffect(() => {
    axios
      .get(`https://young-inlet-33955.herokuapp.com/events`)
      .then(res => {
        // console.log(res.data);
        setEvents(res.data.events);
      })
      .catch(err => console.log(err));

    axios
      .get(`https://young-inlet-33955.herokuapp.com/events/regType`)
      .then(res => {
        // console.log(res.data);
        setTypes(res.data);
      })
      .catch(err => console.log(err));

    axios
      .get(`https://young-inlet-33955.herokuapp.com/date`)
      .then(res => {
        // console.log(res.data);
        setDate(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),

    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });
  const handleOk = e => {
    console.log(visible);
    setVisible(false);
    setEvent({});
  };

  const displayInfo = event => {
    //  alert(event.target.innerText);
    let x = event.target.innerText;
    axios
      .get(`https://young-inlet-33955.herokuapp.com/events/${x}`)
      .then(res => {
        console.log(res.data);
        setEvent(res.data);
      })
      .catch(err => console.log(err));
    setVisible(true);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      ...getColumnSearchProps("_id"),
      render: text => (
        <a>
          {" "}
          <p onClick={displayInfo}>{text}</p>
          <Modal
            title="Registration Details "
            visible={visible}
            onOk={handleOk}
            onCancel={handleOk}
            closable={true}
            okText="Back"
            cancelButtonProps={{ style: { display: "none" } }}
          >
            <Descriptions
              bordered
              column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
            >
              <Descriptions.Item label="ID">{event._id}</Descriptions.Item>
              <Descriptions.Item label="Full Name">
                {event.name}
              </Descriptions.Item>
              <Descriptions.Item label="E-mail">
                {event.email}
              </Descriptions.Item>
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
        </a>
      )
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      // defaultSortOrder: "ascend"
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
      sorter: (a, b) => a.email.localeCompare(b.email)
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      ...getColumnSearchProps("mobile")
    },
    {
      title: "Id Proof",
      dataIndex: "idProof",
      key: "idProof",
      render: text => (
        <img
          src={text}
          alt="loading"
          style={{ width: "100px", height: "40px" }}
        />
      )
    },
    {
      title: "Registration Type",
      dataIndex: "regType",
      key: "regType",

      filters: [
        {
          text: "Self",
          value: "Self"
        },
        {
          text: "Corporate",
          value: "Corporate"
        },
        {
          text: "Group",
          value: "Group"
        },
        {
          text: "Others",
          value: "Others"
        }
      ],
      onFilter: (value, record) => record.regType.indexOf(value) === 0
    },
    {
      title: "Tickets",
      dataIndex: "tickets",
      key: "tickets",
      // defaultSortOrder: "ascend",
      sorter: (a, b) => a.tickets - b.tickets
    }
  ];

  const data = events;
  const handleback = () => {
    console.log("go back");
    props.history.push("/");
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setsearchText(selectedKeys[0]);
    setsearchedColumn(dataIndex);
    // this.setState({
    //   searchText: selectedKeys[0],
    //   searchedColumn: dataIndex,
    // });
  };

  const handleReset = clearFilters => {
    clearFilters();
    setsearchText("");
    // this.setState({ searchText: '' });
  };

  return (
    <>
      {console.log(props.history.location.state.username)}
      <PageHeader
        className="site-page-header"
        style={{ padding: "0px" }}
        ghost={false}
        // title="Admin Page"
        extra={[
          // <Switch
          //   checkedChildren="LogOut"
          //   unCheckedChildren="LogIn"
          //   style={{ marginTop: "8px" }}
          //   defaultChecked
          //   onChange={onChange}
          //   className="switch"
          // />,
          //   <Title key="more" key="2" level={3}>
          //     Admin
          //   </Title>,
          //   <Button
          //     //  type="primary"
          //  //   style={{ float: "right" }}
          //     key="1"
          //     icon={<PoweroffOutlined />}
          //     size={"small"}
          //     style={{ marginTop: "8px" }}
          //     onClick={handleback}
          //   />

          <Text>{props.history.location.state.username}</Text>,
          <Button
            key="1"
            icon={<PoweroffOutlined />}
            size={"small"}
            style={{ margin: "8px" }}
            onClick={handleback}
          />
        ]}
      />

      <Row>
        <Col className="gutter-row" span={9} offset={2}>
          {/* <Title level={3}>Grapgh for Reg Types</Title> */}

          <Graph data={types} title="Registeration by type" width={452.25} />
        </Col>

        <Col className="gutter-row" span={10} offset={1}>
          <Graph data={date} title="Registration by date" width={500} />
        </Col>
      </Row>

      <Row
      //style={{ backgroundColor: "#cac3c282" }}
      >
        <Col span={20} offset={2}>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ position: ["bottomCenter"], defaultPageSize: 3 }}
          />
        </Col>
      </Row>
      {/* 
      <Title level={3}>Complete Table</Title> */}

      {/* <Table
        columns={columns}
        dataSource={data}
        pagination={{ position: ["bottomCenter"], defaultPageSize: 5 }}
      /> */}
    </>
  );
};

export default Data;
