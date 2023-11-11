"use client";
import FileDrop from "@/components/FileDrop";
import { useState } from "react";

export default function RecordingPage() {
  const [fileURL, setFileURL] = useState(null);

  const processFile = (fileParam) => {
    if (fileParam.type !== "video/mp4") {
      alert("Only mp4 files are supported");
      return;
    }
    var objectURL = URL.createObjectURL(fileParam);
    setFileURL(objectURL);
    console.log(objectURL);
  };
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      {fileURL ? (
        <video controls className="rounded-lg">
          <source src={fileURL} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <FileDrop processFile={processFile} />
      )}
    </div>
  );
}
