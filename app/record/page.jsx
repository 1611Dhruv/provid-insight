"use client";
import FileDrop from "@/components/FileDrop";
import { useState } from "react";

export default function RecordingPage() {
  const [file, setFile] = useState(null);

  const processFile = (fileParam) => {
    fileParam.arrayBuffer().then((data) => {
      setFile(file);
      console.log(data);
    });
  };
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      {file ? JSON.stringify(file) : <FileDrop processFile={processFile} />}
    </div>
  );
}
