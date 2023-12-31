/**
 * Component used to display varous links in the media section of the contact.
 *
 */
import React from "react";
import { AiOutlineLink } from "react-icons/ai";

const MediaLink = () => {
  return (
    <div
      role="button"
      className="w-full flex  items-center  gap-4 shadow-md bg-zinc-100 dark:bg-neutral-800  py-2 px-2 rounded-md"
    >
      {/* link icon */}
      <div className=" w-10 h-10 p-1 bg-slate-300 dark:bg-neutral-700 dark:text-sky-600 flex text-slate-700 gap-2 justify-center items-center rounded-md ">
        <AiOutlineLink size={25} />
      </div>

      {/*  */}
      <div className="flex flex-col gap-2 [&>span]:inline-block flex-1 text-[12px]">
        <span className="text-slate-700 dark:text-gray-300">
          {" "}
          https://github.com/katongole-isaac/chat-with-me{" "}
        </span>
        <span className="text-sky-600 dark:text-sky-500 "> Github.com</span>
      </div>
    </div>
  );
};

export default MediaLink;
