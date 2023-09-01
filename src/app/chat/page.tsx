/**
 * Chating page
 *
 */
"use client";

import MessageInput from "@/components/messageInput";
import config from "@/config/defaults.json";
import { useMemo } from "react";

export default function Chat() {
  const wss = useMemo(() => new WebSocket(config.websocketUrl, ["json"]), []);

  console.log(wss);

  wss.onopen = function (ev) {
    wss.send("hi");
    console.log("Connected");
  };

  wss.onmessage = function (event) {
    console.log(event.data);


  };

  const handleSubmitMsg = (message: string) => {
    console.log(message);
  }


  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex justify-center items-center">
        <MessageInput onSubmit={handleSubmitMsg} />
      </div>
    </div>
  );
}
