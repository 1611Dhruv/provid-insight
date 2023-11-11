import React from "react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
      <h1 className="text-black text-8xl font-bold text-center mb-8 justify-center">
      ProVid Insight
      </h1>
      <p className="text-black text-lg text-center mb-7">
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      </p>
      <Link href={"/"} className="btn btn-primary w-60 mb-7">
        Get Started
      </Link>

      <div className = "flex">
      <div className="card w-96 bg-base-100 shadow-xl mx-4">
        <div className="card-body">
          <h2 className="card-title">Upload a video and let us analyze your presentation skills</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
        </div>
      </div>
      <div className="card w-96 bg-base-100 shadow-xl mx-4">
        <div className="card-body">
          <h2 className="card-title">Get fast feedback in many categories, with timestamps</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
        </div>
      </div>
      </div>

    </div>
  );
}
