import React from "react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
      <h1 className="text-black text-8xl font-bold text-center mb-8 justify-center">
        Lorem ipsum
      </h1>
      <p className="text-black text-lg text-center mb-7">
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      </p>
      <Link href={"/"} className="btn btn-primary w-60">
        Get Started
      </Link>
    </div>
  );
}
