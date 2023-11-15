/**
 * Displays a list of individual chat conservations
 *
 */
import React, { useState } from "react";

import ChatList from "./chatList";

interface Props {
  onShowChatPanel: React.Dispatch<boolean>;
}

export default function ChatLists({onShowChatPanel}: Props) {
  const [activeChat, setActiveChat] = useState(0);

  const chats = Array(10).fill(null);

  return (
    <div className="w-full divide-y divide-slate-300 dark:divide-[#343434] space-y-2 ">
      {chats.map((chat, idx) => (
        <ChatList
          key={idx}
          activeChat={activeChat}
          index={idx}
          onActiveChat={setActiveChat}
          onShowChatPanel={onShowChatPanel}
        />
      ))}
    </div>
  );
}
