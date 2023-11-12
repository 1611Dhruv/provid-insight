"use client";
import DataTable from "@/components/DataTable";
import { useEffect, useState } from "react";

export default function RecordingsList() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/api/load", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let x = data.data.map((node) => {
          return {
            uploadTime: Date.now(),
            filename: node.fname,
            score: node.score,
            description: node.description,
            fid: node.fid,
          };
        });
        setData(x);
      });
  }, []);
  return data ? (
    data.length === 0 ? (
      <div className="mt-60 flex flex-col items-center">
        <h1 className="text-black text-8xl font-bold text-center mb-8 justify-center">
          No Data Found
        </h1>
        <p className="text-black text-2xl text-center mb-7 ml-[15%] mr-[15%]">
          Create and Upload your first Recording :)
        </p>
      </div>
    ) : (
      <DataTable data={data} />
    )
  ) : (
    <div></div>
  );
}
