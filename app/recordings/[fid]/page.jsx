"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Link,
  Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
} from "react-scroll";
import ScrollableComponent from "@/components/ScrollingComponent";
import { scroller } from "react-scroll";

export default function ViewResult({ params }) {
  // const url = "/compressed.mp4"; // updated to have fid
  const [api_dat, setApiDat] = useState(null);
  // const url = "/api/download?fid=" + params.fid;
  const [blob, setBlob] = useState(null);
  // },[])
  useEffect(() => {
    fetch("/api/download?fid=" + params.fid)
      .then((r) => r.blob())
      .then((blob) => {
        console.log(blob);
        setBlob(blob);
      });
    fetch("/api/download_data?fid=" + params.fid)
      .then((r) => r.blob())
      .then((data) => {
        console.log(data);
        setApiDat(data);
      });
  }, []);
  const data = {
    timestamps: {
      "0.0-7.28": {
        feedback:
          "test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1",
        transcript:
          " So first, we start off with the spinal cord, which leads up toward the brain.",
      },
      "7.28-15.32": {
        feedback:
          "test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1",
        transcript:
          " As it goes closer to the brain, it expands and swells and becomes the brain stem.",
      },
      "15.32-25.44": {
        feedback:
          "test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1",
        transcript:
          " At the top of the brain stem sits the thalamus, and right under the thalamus lies the hypothalamus,",
      },
      "25.44-43.88": {
        feedback:
          "test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1",
        transcript:
          " hypo meaning under or lower, and under the hypothalamus is the pituitary gland.",
      },
      "43.88-53.24": {
        feedback:
          "ilove2ilove2ilove2ilove2ilove2ilove2ilove2ilove2ilove2ilove2ilove2ilove2",
        transcript:
          " Going around from both sides of the thalamus is the hippocampus that extends out to the",
      },
      "53.24-62.4": {
        feedback:
          "ilove2ilove2ilove2ilove2ilove2ilove2ilove2ilove2ilove2ilove2ilove2ilove2",
        transcript:
          " front of the brain, and at the front ends of the brain is the amygdala, and on the other",
      },
      "62.4-72.56": {
        feedback:
          "3issocool 3issocool 3issocool 3issocool 3issocool 3issocool 3issocool 3issocool 3issocool",
        transcript:
          " side inside the temporal lobe lies the other hippocampus and amygdala pair.",
      },
      "72.56-80.04": {
        feedback:
          "3issocool 3issocool 3issocool 3issocool 3issocool 3issocool 3issocool 3issocool 3issocool",
        transcript:
          " So for the lobes, at the front you have the frontal lobe, and at the top the parietal",
      },
      "80.04-82.32": {
        feedback:
          "3issocool 3issocool 3issocool 3issocool 3issocool 3issocool 3issocool 3issocool 3issocool",
        transcript: " lobe, and at the back the occipital lobe.",
      },
      "82.32-86.36": {
        feedback:
          "3issocool 3issocool 3issocool 3issocool 3issocool 3issocool 3issocool 3issocool 3issocool",
        transcript: " The bottom, the yellow, is the temporal lobe.",
      },
      "86.36-97.2": {
        feedback:
          "3issocool 3issocool 3issocool 3issocool 3issocool 3issocool 3issocool 3issocool 3issocool",
        transcript:
          " For the cortexes, the cortex in the frontal lobe is the motor cortex, and that sits at",
      },
      "97.2-101.52": {
        feedback:
          "imsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedoz imsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedoz imsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedoz",
        transcript: " the end of the frontal lobe.",
      },
      "101.52-109.12": {
        feedback:
          "imsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedoz imsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedoz imsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedoz",
        transcript:
          " At the front of the parietal lobe sits the sensory cortex, and these two cortexes border",
      },
      "109.12-112.56": {
        feedback:
          "imsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedoz imsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedoz imsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedoz",
        transcript: " each other.",
      },
      "112.56-122.28": {
        feedback:
          "imsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedoz imsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedoz imsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedozimsogloedoz",
        transcript:
          " Lastly we have the cerebellum, which is under all the lobes and sits behind the brain stem.",
      },
    },
    summary: "summary",
    score: { score: 1 },
  };
  const timestamps = data.timestamps;
  console.log(timestamps);
  const [currKey, setCurrKey] = useState(Object.keys(timestamps)[0]);
  const videoRef = useRef(null);

  const feedbackSet = new Set();
  for (const key in data.timestamps) {
    const feedback = data.timestamps[key].feedback;

    feedbackSet.add(feedback);
  }
  const feedbackList = Array.from(feedbackSet);
  console.log(feedbackList);

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

  return (
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
          className="ml-4 w-11/12 px-4 py-4 text-left bg-slate-300 text-slate-700 rounded-lg h-fit"
          style={{ alignSelf: "center" }}
        >
          <ScrollableComponent
            data={feedbackList.map((e) => (
              <div
                className={` mb-6${
                  currKey && timestamps[currKey].feedback === e
                    ? "text-slate-950 font-bold"
                    : "text-slate-700"
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
          <p className="font-semibold">Summary stuff blegh</p>
        </div>
      </div>
    </div>
  );
}
