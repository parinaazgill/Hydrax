import { Center, Container } from "@mantine/core";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IconCircle } from "@tabler/icons";
interface props {
  index: number | any;
  data: number | any;
}

export const Graph = (pdata: props | any) => {
  const gdata = pdata.data.filter(function (element: any) {
    return element !== undefined;
  });
  // const gtdata = [
  //   { index: 1, data: 70 },
  //   { index: 2, data: 90 },
  //   { index: 3, data: 60 },
  //   { index: 4, data: 20 },
  //   { index: 5, data: 102 },
  // ];
  // console.log(gdata);
  return (
    <>
      <ResponsiveContainer width="95%" height={200}>
        <AreaChart data={gdata}>
          <Area
            type="monotone"
            dataKey="data"
            stroke="#03fcf8"
            strokeWidth={3}
            fill="#79adad"
          />
          {/* strokeDasharray="3 3" */}
          <CartesianGrid stroke="#545454" strokeDasharray="5 5" />
          <Tooltip contentStyle={{ backgroundColor: "#212020" }} />
          {/* <Legend color="black" /> */}
          <XAxis dataKey="index" />
          <YAxis />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};
