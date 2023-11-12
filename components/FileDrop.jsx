"use client";

import { useRef, useEffect } from "react";
import Dropzone from "react-dropzone";

const FileDrop = ({ processFile }) => {
  return (
    <div
      className="w-[1000px] h-[500px] rounded-3xl hover:bg-[#F9F9F9] transition-colors border-[2px] border-dashed flex justify-center items-center align-middle"
      // onClick={(e) => e.stopPropagation()}
    >
      <Dropzone onDrop={(acceptedFiles) => processFile(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="w-full h-full flex justify-center items-center">
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
        )}
      </Dropzone>
    </div>
  );
};

// const FileDrop = ({ processFile }) => {
//   const fileInput = useRef(null);
//   const dropzone = useRef(null);
//   console.log('test');
//   const handleSelection = (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     const file = e.target.files[0];
//     console.log(file);
//     processFile(file);
//   };

//   useEffect(() => {
//     // Prevents the default behavior of the dropzone click event
//     const preventDefaultClick = (e) => {
//       if (e.target !== fileInput.current) {
//         e.preventDefault();
//         e.stopPropagation();
//         fileInput.current.click();
//       }
//     };

//     dropzone.current.addEventListener("click", preventDefaultClick);

//     return () => {};
//   }, []);

//   return (
//     <div
//       className="w-[1000px] h-[500px] rounded-3xl hover:bg-[#F9F9F9] transition-colors border-[2px] border-dashed flex justify-center items-center align-middle"
//       ref={dropzone}
//       onClick={e => e.stopPropagation()}
//     >
//       <input
//         type="file"
//         id="fileInput"
//         hidden
//         ref={fileInput}
//         onChange={handleSelection}
//       />
//       <p>A place for you to insert your files</p>
//     </div>
//   );
// };

export default FileDrop;
