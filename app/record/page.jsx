"use client";
import FileDrop from "@/components/FileDrop";
import Recorder from "@/components/Recorder";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useRef, useState } from "react";

export default function RecordingPage() {
  const [file, setFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const { user, isLoading } = useUser();
  if (isLoading) return <p>Loading</p>;

  const handleUpload = () => {
    if (!file) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "user",
        JSON.stringify({ name: user.name, email: user.email })
      );
      fetch("/api/upload", { method: "POST", body: formData });
    } catch (error) {
      console.log("Error uploading");
    }
  };

  const processFile = (acceptedFiles) => {
    if (acceptedFiles.type === "video/mp4") {
      console.log(acceptedFiles);
      setFile(acceptedFiles);
    } else {
      alert("Please upload a mp4 video file");
    }
  };

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <input
        type="checkbox"
        onClick={() => {
          setIsRecording((e) => !e);
        }}
        onChange={() => {}}
        checked={isRecording}
        className="toggle"
      />
      {file ? (
        <>
          <div className="flex flex-col items-center">
            <video controls className="rounded-lg mb-4">
              <source src={URL.createObjectURL(file)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button
              onClick={async () => {
                console.log(file);
                let x = await file.arrayBuffer();
                console.log(x);
              }}
              className="btn btn-success"
            >
              Who Am I
            </button>
            <div className="flex justify-between">
              <button
                className="btn"
                onClick={() => {
                  setFile(null);
                }}
              >
                Reset
              </button>
              <button className="btn" onClick={() => handleUpload()}>
                Submit
              </button>
            </div>
          </div>
        </>
      ) : isRecording ? (
        <Recorder processFile={processFile} />
      ) : (
        <FileDrop processFile={processFile} />
      )}
    </div>
  );
}
