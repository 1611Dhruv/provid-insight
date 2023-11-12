"use client";
import Link from "next/link";
import React from "react";
import moment from "moment"; // Import Moment.js

export const DataCards = ({
  uploadTime,
  filename,
  score,
  description,
  fid,
  img,
}) => {
  // Format the uploadTime using Moment.js
  const formattedUploadTime = moment(uploadTime).format(
    "MMMM Do YYYY, h:mm:ss a"
  );
  console.log(img);
  return (
    <div className="flex justify-center place-items-center mb-14 mt-10">
      <div className="card w-96 bg-base-100 shadow-xl mb-7 align-center">
        <figure>
          <img src={`data:image/jpeg;base64,${img}`} alt="video thumbnail" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{filename}</h2>
          <p className="font-bold">{formattedUploadTime}</p>
          <p className="font-light">{description}</p>
          <div className="grid grid-cols-2 relative">
            <div className="card-actions">
              <Link className="btn btn-accent w-[250px]" href={`/recordings/${fid}`}>
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
