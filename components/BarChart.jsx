import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   {
//     name: "Content",
//     score: 75,
//   },
//   {
//     name: "Reasoning",
//     score: 70,
//   },
//   {
//     name: "Organization",
//     score: 80,
//   },
//   {
//     name: "Style",
//     score: 65,
//   },
//   {
//     name: "Mechanics",
//     score: 60,
//   },
// ];

const BarGraph = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="score" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraph;
