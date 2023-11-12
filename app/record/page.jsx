"use client";
import FileDrop from "@/components/FileDrop";
import { useEffect, useRef, useState } from "react";

export default function RecordingPage() {
  const [file, setFile] = useState(null);

  const handleSubmit = () => {
    FormD;
  };

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
        <>
          <div className="flex flex-col items-center">
            <video controls className="rounded-lg mb-4">
              <source src={URL.createObjectURL(file)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="flex w-[100px] justify-between">
              <button
                className="btn"
                onClick={() => {
                  setFile(null);
                }}
              >
                Reset
              </button>
              <button className="btn" onClick={() => {}}>
                Submit
              </button>
            </div>
          </div>
        </>
      ) : (
        <FileDrop processFile={processFile} />
      )}
    </div>
  );
}
