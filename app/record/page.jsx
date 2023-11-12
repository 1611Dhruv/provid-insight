"use client";
import FileDrop from "@/components/FileDrop";
import { useRef, useState } from "react";

export default function RecordingPage() {
  const [file, setFile] = useState(null);
  const videoRef = useRef(null);

  const processFile = (fileParam) => {
    if (fileParam.type !== "video/mp4") {
      alert("Only mp4 files are supported");
      return;
    }
    setFile(fileParam);
  };
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      {file ? (
        <video ref={videoRef} controls className="rounded-lg">
          <source src={URL.createObjectURL(file)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <FileDrop processFile={processFile} />
      )}
    </div>
  );
}
