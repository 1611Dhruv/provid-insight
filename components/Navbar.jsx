"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export const Navbar = () => {
  const { user } = useUser();
  return (
    <div className="navbar">
      <div className="navbar-start">
        <Link href={"/landing"}>
          <Image src={"/smileBuckyWhite.png"} width={50} height={50}></Image>
        </Link>
      </div>
      {user ? (
        <div className="navbar-center flex-none">
          <Link className="btn btn-ghost mx-4" href="/">
            Home
          </Link>
          <Link className="btn btn-ghost mx-4" href="/record">
            Upload/Record
          </Link>
          <Link className="btn btn-ghost mx-4" href="/recordings">
            View My Videos
          </Link>
          <Link className="btn btn-ghost mx-4" href="/summary">
            Summary
          </Link>
          <Link href={"/login"}></Link>
        </div>
      ) : null}
      <div className="navbar-end">
        {user ? (
          <Link className="btn btn-ghost mx-4" href={"/api/auth/logout"}>
            Logout
          </Link>
        ) : (
          <Link className="btn btn-ghost mx-4" href={"/api/auth/login"}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
};
