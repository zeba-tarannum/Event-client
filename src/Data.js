import React, { useEffect, useState } from "react";
import Event from "./Event";
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
  Spin
} from "antd";
import Graph from "./BarPlot.js";
import { PoweroffOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

const { Text } = Typography;

const Data = props => {
  const [events, setEvents] = useState([]);
  const [types, setTypes] = useState([]);
  const [date, setDate] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [searchedColumn, setsearchedColumn] = useState("");
  const [tableloading, settableLoading] = useState(true);
  const [graph1loading, setgraph1Loading] = useState(true);
  const [graph2loading, setgraph2Loading] = useState(true);
  let url;

  if (process.env.NODE_ENV === "development") {
    url = "http://localhost:8000";
  }

  if (process.env.NODE_ENV === "production") {
    url = "https://young-inlet-33955.herokuapp.com";
  }

  useEffect(() => {
    axios
      .get(`${url}/events`)
      .then(res => {
        // console.log(res.data);
        settableLoading(false);
        setEvents(res.data.events);
      })
      .catch(err => console.log(err));

    axios
      .get(`${url}/events/regType`)
      .then(res => {
        // console.log(res.data);
        setTypes(res.data);
        setgraph1Loading(false);
      })
      .catch(err => {
        console.log(err);
        setgraph1Loading(false);
      });

    axios
      .get(`${url}/date`)
      .then(res => {
        // console.log(res.data);
        setDate(res.data);
        setgraph2Loading(false);
      })
      .catch(err => {
        console.log(err);
        setgraph2Loading(false);
      });
  }, [url]);

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

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      ...getColumnSearchProps("_id"),
      render: text => <Event id={text} />
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      responsive: ["xxl", "xl", "lg", "md", "sm"],
      ...getColumnSearchProps("name"),
      // defaultSortOrder: "ascend"
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      responsive: ["xxl", "xl", "lg", "md", "sm"],
      ...getColumnSearchProps("email"),
      sorter: (a, b) => a.email.localeCompare(b.email)
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      responsive: ["xxl", "xl", "lg", "md"],
      ...getColumnSearchProps("mobile")
    },
    {
      title: "Id Proof",
      dataIndex: "idProof",
      key: "idProof",
      responsive: ["xxl", "xl", "lg"],
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
      responsive: ["xxl", "xl", "lg"],
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
      responsive: ["xxl", "xl"],
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
  };

  const handleReset = clearFilters => {
    clearFilters();
    setsearchText("");
  };

  return (
    <>
      {console.log(props.history.location.state.username)}
      <PageHeader
        className="site-page-header"
        style={{ padding: "0px" }}
        ghost={false}
        title="Admin Page"
        extra={[
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
      <br />
      <Row>
        <Col
          style={{ marginTop: "10px" }}
          className="gutter-row"
          xs={{ span: 20, offset: 2 }}
          s={{ span: 20, offset: 2 }}
          lg={{ span: 9, offset: 2 }}
        >
          <Spin spinning={graph1loading} tip="Loading..." size="large">
            <Graph data={types} title="Registeration by type" />
          </Spin>
        </Col>

        <Col
          style={{ marginTop: "10px" }}
          className="gutter-row"
          xs={{ span: 20, offset: 2 }}
          s={{ span: 20, offset: 2 }}
          lg={{ span: 10, offset: 1 }}
        >
          <Spin spinning={graph2loading} tip="Loading..." size="large">
            <Graph data={date} title="Registration by date" />
          </Spin>
        </Col>
      </Row>

      <Row>
        <Col span={20} offset={2}>
          <br />
          <p>Click on id to get complete details</p>
          <Spin spinning={tableloading} tip="Loading..." size="large">
            <Table
              loading="true"
              columns={columns}
              dataSource={data}
              pagination={{ position: ["bottomCenter"] }}
            />
          </Spin>
        </Col>
      </Row>
    </>
  );
};

export default Data;
