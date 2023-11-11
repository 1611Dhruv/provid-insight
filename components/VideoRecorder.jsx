"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faUpload } from "@fortawesome/free-solid-svg-icons";
import { ReactMediaRecorder } from "react-media-recorder";

const VideoRecorder = () => {
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [file, setFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  console.log(recordedBlob);

  const handleRecordingComplete = (blob) => {
    setRecordedBlob(blob);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleFileUpload = () => {
    // Implement file upload logic here
    // You can use FormData or other methods to upload the file
    console.log("File upload logic goes here", file);
  };

  return (
    <div>
      <h1>Video Recorder</h1>

      <div className="flex items-center space-x-4">
        <ReactMediaRecorder
          video
          render={({ status, startRecording, stopRecording }) => (
            <div>
              {status === "idle" && (
                <button
                  onClick={() => {
                    startRecording();
                    setIsRecording(true);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  <FontAwesomeIcon icon={faCamera} className="mr-2" />
                  Start Recording
                </button>
              )}

              {status === "recording" && (
                <button
                  onClick={() => {
                    stopRecording();
                    setIsRecording(false);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  <FontAwesomeIcon icon={faCamera} className="mr-2" />
                  Stop Recording
                </button>
              )}

              {(status === "stopped" || isRecording) && recordedBlob && (
                <div>
                  <video
                    src={recordedBlob.blobURL}
                    controls
                    className="mt-4 mb-4"
                    width="1280"
                    height="720"
                  />
                </div>
              )}
            </div>
          )}
          onStop={handleRecordingComplete}
        />

        <div className="border-dashed border-2 p-4 flex flex-col items-center space-y-2">
          <label className="bg-gray-300 text-gray-700 px-4 py-2 rounded cursor-pointer">
            <FontAwesomeIcon icon={faUpload} className="mr-2" />
            Select a video file
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {file && (
            <button
              onClick={handleFileUpload}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoRecorder;
