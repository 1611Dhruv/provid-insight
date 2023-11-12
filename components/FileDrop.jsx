"use client";

import { useRef, useEffect } from "react";

const FileDrop = ({ processFile }) => {
  const fileInput = useRef(null);
  const dropzone = useRef(null);

  const handleSelection = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.target.files[0];
    console.log(file);
    processFile(file);
  };

  useEffect(() => {
    // Prevents the default behavior of the dropzone click event
    const preventDefaultClick = (e) => {
      if (e.target !== fileInput.current) {
        e.preventDefault();
        fileInput.current.click();
      }
    };

    dropzone.current.addEventListener("click", preventDefaultClick);

    return () => {};
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