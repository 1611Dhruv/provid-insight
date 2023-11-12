import React from "react";
import { Element } from "react-scroll";

const ScrollableComponent = ({ data, containerId }) => {
  return (
    <div style={{ overflowY: "scroll", height: "400px" }} id={containerId}>

      {data.map((item, index) => {
        return <Element className="break-words py-4" name={`feedback_${index}`}>{item}</Element>
      })}
    </div>
  );
};

export default ScrollableComponent;
