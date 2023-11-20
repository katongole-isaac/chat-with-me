import { WebSocketContext } from "@/app/chat/page";
import React, { useContext } from "react";


const OnlineStatus = () => {

  const { readyState } = useContext(WebSocketContext)!;

  const online = readyState === WebSocket.OPEN;
  const classes = online
    ? " dark:animate-pulse bg-lime-400"
    : "dark:bg-neutral-600 bg-gray-300";

  return (
    <span className="relative flex h-3 w-3 ">
      <span
        className={`${classes} ${
          online ? "animate-ping" : ""
        } absolute inline-flex h-full w-full rounded-full opacity-75`}
      ></span>
      <span  className={` ${classes} relative inline-flex rounded-full h-3 w-3 `}></span>
    </span>
  );
};

export default OnlineStatus;
