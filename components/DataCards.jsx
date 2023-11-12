import Link from "next/link";
import React from "react";

export const DataCards = ({
  serial,
  uploadTime,
  filename,
  score,
  description,
  fid,
}) => {
  return (
    <div className = "flex justify-center place-items-center mb-14">
    <div className="card w-96 bg-base-100 shadow-xl mb-7 align-center">
      <figure>
        <img src="/bg.jpg" alt="video thumbnail" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{filename}</h2>
        <p className="font-bold">{uploadTime}</p>
        <p className="font-light">{description}</p>
        <div className="grid grid-cols-2 relative">
          <div className="justify-start">
            <span className="absolute bottom-0 left-0 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              {score}/100
            </span>
          </div>
          <div className="card-actions justify-end">
            <Link className="btn btn-accent" href={`/recordings/${fid}`}>
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
