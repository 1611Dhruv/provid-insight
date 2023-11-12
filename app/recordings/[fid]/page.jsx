"use client";

import React, { useState, useRef, useEffect } from "react";
import ScrollableComponent from "@/components/ScrollingComponent";
import BouncingDotsLoader from "@/components/BouncingDotsLoader";

export default function ViewResult({ params }) {
  // const url = "/compressed.mp4"; // updated to have fid
  const [api_dat, setApiDat] = useState(null);
  // const url = "/api/download?fid=" + params.fid;
  const [blob, setBlob] = useState(null);

  const [loading, setLoading] = useState(0);

  const [currKey, setCurrKey] = useState(null);
  const videoRef = useRef(null);
  // },[])
  useEffect(() => {
    fetch("/api/download_video?fid=" + params.fid)
      .then((r) => {
        setLoading((e) => e - 1);
        return r.blob();
      })
      .then((blob) => {
        setBlob(blob);
      });
    setLoading((e) => e + 1);
    fetch("/api/download_data?fid=" + params.fid)
      .then((r) => {
        setLoading((e) => e - 1);
        return r.json();
      })
      .then((data) => {
        console.log(data);
        setApiDat(data);
      });
    setLoading((e) => e + 1);
  }, []);
  if (api_dat == null) {
    return <BouncingDotsLoader />;
  }
  const data = api_dat.data;
  const timestamps = data.timestamps;

  const feedbackSet = new Set();
  for (const key in data.timestamps) {
    const feedback = data.timestamps[key].feedback;

    feedbackSet.add(feedback);
  }
  const feedbackList = Array.from(feedbackSet);

  const transcriptList = [];
  for (const key in data.timestamps) {
    transcriptList.push(data.timestamps[key].transcript);
  }

  const handleTimeChange = (e) => {
    if (videoRef.current) {
      let x = Object.keys(timestamps).filter((key) => {
        const nums = key.split("-");
        const x = parseFloat(nums[0]);
        const y = parseFloat(nums[1]);
        return (
          videoRef.current.currentTime >= x && videoRef.current.currentTime < y
        );
      });
      setCurrKey(x[0]);
    }
  };

  return loading == 0 ? (
      <div className="mt-10 flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 w-11/12 p-4 mx-auto text-center">
          <div className="mockup-browser border bg-slate-300 col-span-2">
            <div className="mockup-browser-toolbar">
              <div className="input">My Video</div>
            </div>
            {blob && (
              <video
                ref={videoRef}
                onTimeUpdate={handleTimeChange}
                controls
                className="mt-4"
              >
                <source src={URL.createObjectURL(blob)} />
              </video>
            )}
            <div className="overflow-y-auto h-[100px] my-7 px-8 rounded-md">
              {Object.keys(timestamps).map((key) => {
                return (
                  <span
                    key={key}
                    id={`timestamp-${key}`}
                    className={`${currKey == key ? "bg-yellow-200" : null}`}
                    onClick={() => scrollToHighlightedElement(key)}
                  >
                    {timestamps[key].transcript}
                  </span>
                );
              })}
            </div>
          </div>

          <div
            className="ml-4 w-11/12 px-4 py-4 text-left bg-slate-300 rounded-lg h-fit"
            style={{ alignSelf: "center" }}
          >
            <ScrollableComponent
              data={feedbackList.map((e) => (
                <div
                  className={` mb-6${
                    currKey && timestamps[currKey].feedback === e
                      ? ".text-slate-950 font-bold text-xl"
                      : "text-base font-normal"
                  }`}
                >
                  {e}
                </div>
              ))}
              containerId={"feedbackContainer"}
            />
          </div>
        </div>
        <div class="w-11/12 bg-slate-100 p-4 border-4 border-slate-400 rounded-md mb-4 indicator">
          <span className="indicator-item badge badge-accent">Summary</span>
          <div>
            <p className="font-semibold">{data.summary}</p>
          </div>
        </div>
      </div>
    ) : (
      <BouncingDotsLoader />
    );
}
