// DataTable.jsx
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { DataCards } from "./DataCards";

const DataTable = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-14">
      {data.map((item) => (
        <DataCards key={item.fid} {...item} />
      ))}
    </div>
  );
};

export default DataTable;
