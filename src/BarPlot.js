import { Chart, Tooltip, Axis, Bar } from "viser-react";
import { Card } from "antd";
import React from "react";

const scale = [
  {
    dataKey: "count",
    tickInterval: 8
  }
];

const BarPlot = ({ data, title }) => {
  const d = data.sort((a, b) => (a._id > b._id ? 1 : b._id > a._id ? -1 : 0));
  console.log(d);
  return (
    <Card
      title={title}
      bordered={false}
      bodyStyle={{ height: "200px", padding: "0" }}
    >
      <Chart forceFit height={260} data={d} scale={scale}>
        <Tooltip />
        <Axis />
        <Bar position="_id*count" label="count" labelFontColor="red" />
      </Chart>
    </Card>
  );
};

export default BarPlot;
