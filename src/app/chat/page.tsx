/**
 * Chating page
 *
 */
"use client";

import { useMemo, useState } from "react";

import config from "@/config/defaults.json";
import ChatDisplay from "@/components/chatDisplay";
import MessageInput from "@/components/messageInput";

export default function Chat() {
  const wss = useMemo(() => new WebSocket(config.websocketUrl, ["json"]), []);
  const [messages, setMessages] = useState<string[]>([]);

  console.log(wss);

  wss.onopen = function (ev) {
    wss.send("hi");
    console.log("Connected");
  };

  wss.onmessage = function (event) {
    console.log(event.data);
  };

  const handleSubmitMsg = (msg: string) => {
    console.log(msg);
    setMessages((prev) => [...prev, msg]);
    wss.send(msg);
  };

  return (
    <div className="w-screen h-screen bg-zinc-200">
      <div className="py-8 w-full h-full ">
        <div className="max-w-[1000px] bg-zinc-100 h-full shadow-lg  m-auto border  ">
          <div className="grid grid-cols-[1.5fr_3fr]">
            {/* fist grid */}
            <div className="w-full min-w-0 min-h-0"></div>

            {/* second grid */}
            <div className="border-l min-w-0 min-h-0 relative">
              <div className="h-full flex flex-col">
                <div className="flex-1">
                  <div className=" custom-scrollbar overflow-y-auto max-h-[810px] min-h-[810px] py-1 pb-8">
                    <ChatDisplay messages={messages} />
                  </div>
                </div>
                <div className="">
                  <MessageInput onSubmit={handleSubmitMsg} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
