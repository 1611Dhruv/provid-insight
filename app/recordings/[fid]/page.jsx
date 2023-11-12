"use client";
import React, { useState, useRef, useEffect } from "react";
import ScrollableComponent from "@/components/ScrollingComponent";

export default function ViewResult({ params }) {
  const url = "/compressed.mp4"; // updated to have fid
  const [api_dat, setApiDat] = useState(null);
  const [currKey, setCurrKey] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    fetch("/api/download?fid=" + params.fid)
      .then((data) => data.json())
      .then((resp) => {
        console.log(resp.data);
        setApiDat(resp.data);
      });
  }, []);
  if (!api_dat) {
    return <p>Loading...</p>;
  }
  const data = api_dat[0].data;
  const timestamps = data.timestamps;

  const feedbackSet = new Set();
  for (const key in data.timestamps) {
    const feedback = data.timestamps[key].feedback;
    feedbackSet.add(feedback);
  }
  const feedbackList = Array.from(feedbackSet);

  const spanRef = useRef([]);

  // const scrollSpan = (index) => {
  //   console.log(index);
  //   if (spanRef[index]) {
  //     spanRef[index].current.scrollIntoView({
  //       behavior: "smooth",
  //     });
  //   }
  // };

  // const transcriptList = [];
  // for (const key in data.timestamps) {
  //   transcriptList.push(data.timestamps[key].transcript);
  // }

  // const handleTimeChange = (e) => {
  //   if (videoRef.current) {
  //     let x = Object.keys(timestamps).filter((key) => {
  //       const nums = key.split("-");
  //       const x = parseFloat(nums[0]);
  //       const y = parseFloat(nums[1]);
  //       return (
  //         videoRef.current.currentTime >= x && videoRef.current.currentTime < y
  //       );
  //     });
  //     setCurrKey(x[0]);
  //     if (timestamps[x[0]]) {
  //       const index = transcriptList.indexOf(timestamps[x[0]].transcript);
  //       scrollSpan(index);
  //     }
  //   }
  // };

  // return (
  //   <div className="mt-10 flex flex-col items-center">
  //     <div className="grid grid-cols-1 md:grid-cols-3 w-11/12 p-4 mx-auto text-center">
  //       <div className="mockup-browser border bg-slate-300 col-span-2">
  //         <div className="mockup-browser-toolbar">
  //           <div className="input">My Video</div>
  //         </div>
  //         <video
  //           ref={videoRef}
  //           onTimeUpdate={handleTimeChange}
  //           controls
  //           className="mt-4"
  //         >
  //           <source src={url} />
  //         </video>
  //         <div className="overflow-y-auto h-[100px] my-7 px-8 rounded-md">
  //           {Object.keys(timestamps).map((key) => {
  //             return (
  //               <span
  //                 key={key}
  //                 ref={
  //                   spanRef[transcriptList.indexOf(timestamps[key].transcript)]
  //                 }
  //                 id={`timestamp-${key}`}
  //                 className={`${currKey == key ? "bg-yellow-200" : null}`}
  //                 onClick={() => scrollToHighlightedElement(key)}
  //               >
  //                 {timestamps[key].transcript}
  //               </span>
  //             );
  //           })}
  //         </div>
  //       </div>
  //       <div
  //         className="ml-4 w-11/12 px-4 py-4 text-left bg-slate-300 text-slate-700 rounded-lg h-fit"
  //         style={{ alignSelf: "center" }}
  //       >
  //         <ScrollableComponent
  //           data={feedbackList.map((e) => (
  //             <div
  //               className={` mb-6${
  //                 currKey && timestamps[currKey].feedback === e
  //                   ? "text-slate-950 font-bold"
  //                   : "text-slate-700"
  //               }`}
  //             >
  //               {e}
  //             </div>
  //           ))}
  //           containerId={"feedbackContainer"}
  //         />
  //       </div>
  //     </div>
  //     <div class="w-11/12 bg-slate-100 p-4 border-4 border-slate-400 rounded-md mb-4 indicator">
  //       <span className="indicator-item badge badge-accent">Summary</span>
  //       <div>
  //         <p className="font-semibold">Summary stuff blegh</p>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <>
      <h1>{JSON.stringify(timestamps)}</h1>
      <p>{JSON.stringify(data)}</p>
    </>
  );
}
