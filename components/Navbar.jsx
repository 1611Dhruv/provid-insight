import Link from "next/link";
import Image from "next/image";
import React from "react";

export const Navbar = () => {
  return (
    <div className="navbar bg-gray-800">
      <div className="navbar-start">
          <Link href={"/landing"}>
            <Image src={"/smileBuckyWhite.png"} width={50} height={50}></Image>
          </Link>
      </div>
      <div className="navbar-center flex-none">
        <Link className="btn btn-neutral mx-4" href="/">
          Home
        </Link>
        <Link className="btn btn-neutral mx-4" href="/record">
          Upload/Record
        </Link>
        <Link className="btn btn-neutral mx-4" href="/recordings">
          View My Videos
        </Link>
        <Link className="btn btn-neutral mx-4" href="/summary">
          Summary
        </Link>
        <Link href={"/login"}></Link>
      </div>
      <div className="navbar-end">

      </div>
    </div>
  );
};
