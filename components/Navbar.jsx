import Link from "next/link";
import Image from "next/image";
import React from "react";

export const Navbar = () => {
  return (
    <div className=" navbar bg-base-300 flex">
      <div className="navbar-start">
        <Link href={"/landing"}>
          <Image src={"/logoTransparent.png"} width={50} height={50}></Image>
        </Link>
      </div>
      <div className="navbar-center">
        <Link className="btn btn-ghost mx-4" href="/">
          Home
        </Link>
        <Link className="btn btn-ghost mx-4" href="/record">
          Record
        </Link>
        <Link className="btn btn-ghost mx-4" href="/recordings">
          View Recordings
        </Link>
        <Link className="btn btn-ghost mx-4" href="/summary">
          Summary
        </Link>
        <Link href={"/login"}></Link>
      </div>
    </div>
  );
};
