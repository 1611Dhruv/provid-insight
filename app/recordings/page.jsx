"use client"
import DataTable from "@/components/DataTable";
import { useEffect, useState } from "react";

export default function RecordingsList() {
  const [data, setData] = useState(null)
  useEffect( () => {
      fetch('/api/load', { method: "GET" }).then((res) => res.json()).then((data) => {
        let x = data.data.map((node) => {
          return {
            uploadTime: Date.now(),
            filename: node.fname,
            score: node.score,
            description: node.description,
            fid: node.fid,
          }
        })
        setData(x)
      });

  }, []);
  return (
    data ? <DataTable data={data}/>: <div></div>
  );
}
