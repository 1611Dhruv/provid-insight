import React from "react";
import { Element } from "react-scroll";

const ScrollableComponent = ({ data, containerId }) => {
  return (
    <div style={{ overflowY: "scroll", height: "400px" }} id={containerId}>
      <Element name={`feedback_${0}`}>test</Element>

      {data.map((item, index) => {
        return (
          <Element className="break-words" name={`feedback_${index}`}>
            {item}
          </Element>
        );
      })}
    </div>
  );
};

export default ScrollableComponent;
