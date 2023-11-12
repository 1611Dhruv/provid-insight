"use client";

import { faFileLines, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
export default function Home() {
  const { user, isLoading } = useUser();
  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <div className="mt-20 flex flex-col items-center">
        <h1 className="text-6xl text-center font-bold mb-10 backdrop:blur-lg">
          Welcome Back, {user.given_name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 flex mb-14">
          <div className="card flex w-96 bg-base-100 shadow-xl mx-4 mb-5">
            <div className="card-body">
              <Link href={"/record"}>
                <div className=" rounded-full border-[1px] p-5 items-center border-black">
                  <div className="grid grid-cols-3">
                    <div>
                      <FontAwesomeIcon width={30} height={30} icon={faPlay} />
                    </div>
                    <div className="col-span-2 align-middle">
                      <h2 className="card-title">Upload/Record</h2>
                    </div>
                  </div>
                </div>
              </Link>
              <p>
                Whether it's a prepared speech or a demonstration, this is your
                space to shine.
              </p>
            </div>
          </div>
          <div className="card flex w-96 bg-base-100 shadow-xl mx-4 mb-5">
            <div className="card-body">
              <Link href={"/recordings"}>
                <div className=" rounded-full border-[1px] p-5 items-center border-black">
                  <div className="grid grid-cols-3">
                    <div>
                      <FontAwesomeIcon
                        width={30}
                        height={30}
                        icon={faFileLines}
                      />
                    </div>
                    <div className="col-span-2 align-middle">
                      <h2 className="card-title">View My Videos</h2>
                    </div>
                  </div>
                </div>
              </Link>
              <p>Review and learn from your previous recordings.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="w-3/5 p-4 mx-auto text-center">
        <div className="chat chat-start">
          <div className="chat-bubble">
            It's a highlight reel of my speaking career.
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble">
            Feeling exposed, <br />
            but in a good way!
          </div>
        </div>
      </div>
    </div>
  );
}
