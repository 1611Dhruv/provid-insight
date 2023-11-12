"use client";
import FileDrop from "@/components/FileDrop";
import Recorder from "@/components/Recorder";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useRef, useState } from "react";
import { LoadingOverlay } from "@mantine/core";
import BouncingDotsLoader from "@/components/BouncingDotsLoader";

export default function RecordingPage() {
  const [file, setFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [fetchLoad, setFetchLoad] = useState(false);

  const { user, isLoading } = useUser();

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
      fetch("/api/upload", { method: "POST", body: formData }).then((resp) => {
        if (resp.ok) {
          alert("Upload successful");
        } else {
          alert("Upload failed");
        }
        setFetchLoad(false);
        setFile(null);
      });
      setFetchLoad(true);
      setTimeout(()=>{
        setFetchLoad(false);
        setFile(null);
      },60000)
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
    <div>
      {fetchLoad ? (
        <BouncingDotsLoader />
      ) : (
        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <div className="flex justify-evenly mb-5 w-[720px]">
            <p>Upload</p>
            <input
              type="checkbox"
              onClick={() => {
                setIsRecording((e) => !e);
              }}
              onChange={() => {}}
              checked={isRecording}
              className="toggle "
            />
            <p>Record</p>
          </div>
          {file ? (
            <>
              <div className="flex flex-col items-center">
                <video controls className="rounded-lg mb-4">
                  <source src={URL.createObjectURL(file)} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {/* <button
              onClick={async () => {
                console.log(file);
                let x = await file.arrayBuffer();
                console.log(x);
              }}
              className="btn btn-success"
            >
              Who Am I
            </button> */}
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
      )}
    </div>
  );
}
