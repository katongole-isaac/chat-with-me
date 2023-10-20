/**
 * Media Doc used in contact info component
 *
 */

import React from "react";
import { LiaDownloadSolid } from "react-icons/lia";
import { ImFilePdf } from "react-icons/im";

const MediaDoc = () => {
  return (
    <div
      role="button"
      className="w-full flex gap-2 flex-col shadow-md bg-zinc-100 py-2 px-2 rounded-md"
    >
      {/* preview image */}
      <div className="min-w-full min-h-[120px] max-h-[130px] bg-slate-400"></div>

      <div className="flex gap-2 justify-between items-center w-full ">
        <div className="flex gap-2 items-center flex-1">
          <ImFilePdf size={25} className="text-rose-600" />
          <span className="text-slate-700 text-[12px]">
            Web development Handbook pdf
          </span>
        </div>

        {/* Download button */}
        <div
          role="button"
          className=" self-end flex justify-center items-center w-6 h-6 border border-slate-400 rounded-full "
        >
          <LiaDownloadSolid size={18} className=" text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default MediaDoc;
