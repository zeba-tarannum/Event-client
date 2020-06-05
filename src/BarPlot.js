import { Chart, Tooltip, Axis, Bar } from "viser-react";

import { Card } from "antd";
import React from "react";
// import "./App.css";

const scale = [
  {
    dataKey: "count",
    tickInterval: 2
  }
];

const BarPlot = ({ data, title, width }) => {
  const d = data.sort((a, b) => (a._id > b._id ? 1 : b._id > a._id ? -1 : 0));
  console.log(d);
  return (
    <Card
      title={title}
      bordered={false}
      style={{
        marginTop: "15px",
        //height: "225px",
        marginBottom: "15px"
      }}
      bodyStyle={{ height: "150px", padding: "0" }}
    >
      <Chart
        forceFit
        height={200}
        // width={width}
        data={d}
        scale={scale}
        // type="flex"
        // justify="center"
        // align="middle"
        // padding-right={50}
        //padding-right={50}
        // renderer={"svg"}
        //  padding={[0, 10, 0, 0]}
        // padding={{ right: 30 }}
      >
        <Tooltip />
        <Axis dataKey="_id" />
        {/* <Axis dataKey="count" show={false} /> */}

        <Bar
          position="_id*count"
          // color={"red"}
          label="count"
          labelFontColor="red"
          // label={[
          //   "count",
          //   {
          //     useHtml: true,
          //     htmlTemplate: function htmlTemplate(text, item) {
          //       return (
          //         '<span class="g2-label-item"><p class="g2-label-item-value">' +
          //         "count:" +
          //         text +
          //         "</p></div>"
          //       );
          //     }
          //   }
          // ]}
        />
      </Chart>
    </Card>
  );
};

export default BarPlot;
