"use client";

import { useRef, useEffect } from "react";
import Dropzone from "react-dropzone";

const FileDrop = ({ processFile }) => {
  return (
    <div
      className="w-[1000px] h-[500px] rounded-3xl hover:bg-[#F9F9F9] transition-colors border-[2px] border-dashed flex justify-center items-center align-middle"
      // onClick={(e) => e.stopPropagation()}
    >
      <Dropzone onDrop={(acceptedFiles) => processFile(acceptedFiles[0])}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="w-full h-full flex justify-center items-center"
          >
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        )}
      </Dropzone>
    </div>
  );
};
export default FileDrop;
