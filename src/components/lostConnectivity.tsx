/**
 * UI shown when Browser looses connection.
 *
 */
import React from "react";
import { BiWifiOff } from "react-icons/bi";

import useCheckBrowserConnectivity from "@/lib/checkConnectivity";

const LostConnectivity = () => {

  const { isBrowserConnected } = useCheckBrowserConnectivity();

  if (isBrowserConnected ) return null;

  return (
    <div className="w-full flex items-center gap-2 py-2 bg-slate-700">
      <div className="basis-16 text-center flex justify-center ">
        <div className="bg-yellow-500 rounded-full p-2">
          <BiWifiOff size={30} className="" />
        </div>
      </div>

      <div className="flex-1 text-gray-100 text-[14px]">
        {isBrowserConnected ? (
          <p> Connecting...</p>
        ) : (
          <React.Fragment>
            <p className="font-medium">Computer not connected</p>
            <p className="text-gray-300">
              Make sure your computer has an active internet connection.
            </p>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default LostConnectivity;
