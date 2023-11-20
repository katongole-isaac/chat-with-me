/**
 * UI shown when Browser looses connection.
 *
 */
import React, { useContext } from "react";
import { BiWifiOff } from "react-icons/bi";

import { WebSocketContext } from "@/app/chat/page";
import { ReadyState } from "@/misc/types";

const LostConnectivity = () => {

  const { readyState  } = useContext(WebSocketContext)!;

  const renderReadyState = () => {
    switch (readyState) {
      case 0:
        return <p> Connecting...</p>;

      default:
       return <React.Fragment>
            <p className="font-medium">Computer not connected</p>
            <p className="text-gray-300">
              Make sure your computer has an active internet connection.
            </p>
          </React.Fragment>
    }
  }

  if(readyState === WebSocket.OPEN as ReadyState) return null;

  return (
    <div className="w-full flex items-center gap-2 py-2 bg-slate-700 my-2">
      <div className="basis-16 text-center flex justify-center ">
        <div className="bg-yellow-500 rounded-full p-2">
          <BiWifiOff size={30} className="dark:gray-400" />
        </div>
      </div>

      <div className="flex-1 text-gray-100 text-[14px]">
       {renderReadyState()}
      </div>
    </div>
  );
};

export default LostConnectivity;
