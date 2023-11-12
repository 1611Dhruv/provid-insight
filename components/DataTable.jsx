// DataTable.jsx
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const DataTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">#</th>
            <th className="py-2 px-4 border-b text-center">Upload Time</th>
            <th className="py-2 px-4 border-b text-center">Filename</th>
            <th className="py-2 px-4 border-b text-center">Score</th>
            <th className="py-2 px-4 border-b text-center">Description</th>
            <th className="py-2 px-4 border-b text-center"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.serial}
              className="hover:bg-gray-100 cursor-pointer transition-all duration-200"
            >
              <td className="py-2 px-4 border-b text-center">{item.serial}</td>
              <td className="py-2 px-4 border-b text-center">
                {item.uploadTime}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {item.filename}
              </td>
              <td className="py-2 px-4 border-b text-center">{item.score}</td>
              <td className="py-2 px-4 border-b text-center">
                {item.description.length > 50
                  ? `${item.description.slice(0, 50)}...`
                  : item.description}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <Link
                  href={`/recordings/${item.fid}`}
                  className="text-blue-500 hover:underline"
                >
                  Learn More
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
