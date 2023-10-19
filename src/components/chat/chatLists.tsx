/**
 * Displays a list of individual chat conservations
 *
 */
import React, { useState } from "react";

import ChatList from "./chatList";

export default function ChatLists() {
  const [activeChat, setActiveChat] = useState(0);

  const chats = Array(10).fill(null);

  return (
    <div className="w-full divide-y divide-slate-300 space-y-2 ">
      {chats.map((chat, idx) => (
        <ChatList
          key={idx}
          activeChat={activeChat}
          index={idx}
          onActiveChat={setActiveChat}
        />
      ))}
    </div>
  );
}
