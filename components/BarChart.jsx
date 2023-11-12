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
  console.log(data)
  const arr = []
  for(let key in data){
    if(key==="filler_words_count"){
      continue
    }
    arr.push({name: key,val:data[key]})
  }
  arr[arr.length-1].val=Math.ceil(arr[arr.length-1].val*100)
  arr[arr.length-1].name = "Filler Words %"
  console.log(arr)
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={arr}
        margin={{ top: 10, right: 20, left: 10, bottom: 40 }}
        
      >
        <XAxis dataKey="name" angle={-30} dy={10} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="val" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraph;
