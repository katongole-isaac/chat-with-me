/**
 * Chating page
 *
 */
"use client";

import {  useMemo, useRef, useState } from "react";

import config from "@/config/defaults.json";
import ChatDisplay from "@/components/chatDisplay";
import MessageInput from "@/components/messageInput";
import ChatMenu from "@/components/chatMenu";
import Profile from "@/components/user/profile";
import withAuth from "@/lib/auth/withAuth";


type ChatMessage = {
  from: string;
  to: string;
  message: string;
  sentAt: Date;
  seen?: Boolean;
};

const Chat = () => {

  const wss = useMemo(() => new WebSocket(config.websocketUrl, ["json"]), []);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showProfile, setShowProfile] = useState(false);

  const chatRef = useRef<HTMLDivElement>(null);

  wss.onopen = function (ev) {
    wss.send("hi");
    console.log("Connected");
  };

  wss.onmessage = function (event) {
    console.log(event.data);
    setMessages((prev) => [...prev, event.data]);
  };

  const handleSubmitMsg = (msg: string) => {
    console.log(msg);
    // setMessages((prev) => [...prev, msg]);
    wss.send(msg);
  };


  return (
    <div className="w-screen h-screen bg-zinc-200">
      <div className="py-8 w-full h-full ">
        <div className="max-w-[1200px] bg-zinc-100 h-full shadow-lg  m-auto border ">
          <div className="grid grid-cols-[1.5fr_3fr]">
            {/* fist grid */}
            <div className="w-full min-w-0 min-h-0 relative">
              <ChatMenu onProfileClick={setShowProfile} />
              {showProfile && (
                <Profile onClose={setShowProfile} showProfile={showProfile} />
              )}
            </div>

            {/* second grid */}
            <div className="border-l min-w-0 min-h-0 relative">
              <div className="h-full flex flex-col">
                <div className="flex-1">
                  <div className="max-h-[810px] h-full min-h-[810px] relative custom-scrollbar overflow-y-auto ">
                    <ChatDisplay ref={chatRef} messages={messages} />
                  </div>
                </div>
                <div className="">
                  <MessageInput onSubmit={handleSubmitMsg} ref={chatRef} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Chat);