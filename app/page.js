import ProgressChart from "@/components/ProgressChart";
import Link from "next/link";

export default function Home() {
  const userName = "Josh";
  return (
    <div className="bg-white w-[85%] rounded-2xl relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  py-10">
      <h1 className="text-6xl text-center font-bold mb-10">
        {" "}
        Welcome Back {userName}
      </h1>
      <div className="flex justify-between">
        <div className="mx-24">
          <ProgressChart />
        </div>
        <div className="flex flex-row mx-32">
          <div className="flex justify-evenly">
            <Link href={"/record"}>Record</Link>
            <Link href={"/recordings"}>Full Log</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
