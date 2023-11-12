"use client";
import FileDrop from "@/components/FileDrop";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useRef, useState } from "react";

export default function RecordingPage() {
  const [file, setFile] = useState(null);
  const { user, isLoading } = useUser();
  if (isLoading) return <p>Loading</p>;

  const handleUpload = () => {
    console.log("YAY");
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
    if (acceptedFiles[0].type === "video/mp4") {
      setFile(acceptedFiles[0]);
    } else {
      alert("Please upload a mp4 video file");
    }
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
              <button className="btn" onClick={() => handleUpload()}>
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
