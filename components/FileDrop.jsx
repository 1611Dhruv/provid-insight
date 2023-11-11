"use client";

import { useState, useRef, useEffect } from "react";

const FileDrop = ({ processFile }) => {
  const fileInput = useRef(null);
  const dropzone = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { files } = e.dataTransfer;
    console.log(files);
    processFile(files);
  };

  const handleSelection = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.target.files[0];
    console.log(file);
    processFile(file);
  };

  // Adds event handlers for the used references
  useEffect(() => {
    // event handler for drop
    dropzone.current.addEventListener("drop", handleDrop);
    // simulates clicking the file
    dropzone.current.addEventListener("click", () => fileInput.current.click());
  }, []);

  return (
    <div
      className="w-[1000px] h-[500px] rounded-3xl hover:bg-[#F9F9F9] transition-colors border-[2px] border-dashed flex justify-center items-center align-middle"
      ref={dropzone}
    >
      <input
        type="file"
        id="fileInput"
        hidden
        ref={fileInput}
        onChange={handleSelection}
      />
      <p>A place for you to insert your files</p>
    </div>
  );
};

export default FileDrop;
