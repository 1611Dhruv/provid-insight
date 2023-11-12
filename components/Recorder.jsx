"use client";
import React, { useRef, useState, useEffect } from "react";
import { ReactMediaRecorder } from "react-media-recorder";

const VideoPreview = ({ stream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  if (!stream) {
    return null;
  }
  return (
    <video
      className="rounded-2xl "
      ref={videoRef}
      height={1000}
      width={1000}
      autoPlay
      controls
    />
  );
};

export default function Recorder({ processFile }) {
  const [enable, setEnable] = useState(false);
  return (
    <ReactMediaRecorder
      video
      blobPropertyBag={{
        type: "video/mp4",
      }}
      render={({
        status,
        previewStream,
        startRecording,
        stopRecording,
        mediaBlobUrl,
        clearBlobUrl,
      }) => {
        return (
          <div>
            {enable && <VideoPreview stream={previewStream} />}
            {!enable &&
              (status === "idle" ? (
                <div
                  width={1000}
                  height={1000}
                  className="rounded-2xl border-2 border-dashed w-[720px] h-[400px] flex items-center justify-center"
                >
                  <p>Start a Recording!</p>
                </div>
              ) : (
                <video
                  width={1000}
                  height={1000}
                  className="rounded-2xl"
                  src={mediaBlobUrl}
                  controls
                  autoPlay
                  loop
                />
              ))}
            <div className="flex items-center justify-evenly mt-5">
              {status !== "stopped" ? (
                <>
                  <button
                    onClick={() => {
                      startRecording();
                      setEnable(true);
                    }}
                    className="btn"
                  >
                    Start Recording
                  </button>
                  <button
                    onClick={async () => {
                      stopRecording();
                      setEnable(false);
                      let response = await fetch(mediaBlobUrl);
                      let data = await response.blob();
                      const run_file = new File(
                        [data],
                        Date.now() + "_recording.mp4",
                        {
                          type: "video/mp4",
                        }
                      );
                      console.log(run_file);
                      processFile(run_file);
                      console.log(mediaBlobUrl);
                      //   clearBlobUrl();
                      setTimeout(() => {
                        setEnable(false);
                      }, 1000);
                    }}
                    className="btn"
                  >
                    Stop Recording
                  </button>
                </>
              ) : null}
            </div>
          </div>
        );
      }}
    />
  );
}
