/**
 * Chats - Displays chat top menu, Search and chat list
 * 
 */

import { useState } from "react";
import { AiOutlineHistory } from "react-icons/ai";

import Calls from "../calls";
import ChatLists from "./chatLists";
import ChatMenu from "./menu/chatMenu";
import Search from "@/components/common/search";
import { ChatsProps } from "@/misc/types/chat";
import CallHistory from "../calls/callHistory";

type ActiveComponentOptions = "calls" | "call_history" | "";

const Chats = ({ onOptionClick, onProfileClick, onShowModals, onShowChatPanel }: ChatsProps) => {
  const [activeComponent, setActiveComponent] =
    useState<ActiveComponentOptions>("");

  const handleCallClick = (e: React.MouseEvent<HTMLElement>) => {
    setActiveComponent((prev) => (prev !== "calls" ? "calls" : ""));
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "calls":
        return <Calls />;

      case "call_history":
        return <CallHistory />;

      default:
        return <ChatLists onShowChatPanel={onShowChatPanel} />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col ">
      <div>
        <div className="">
          <ChatMenu
            onShowModals={onShowModals}
            onOptionClick={onOptionClick}
            onProfileClick={onProfileClick}
            onCallClick={handleCallClick}
          />
        </div>
        <div className="flex w-full gap-1 items-center  ">
          <div className="flex-1">
            <Search />
          </div>

          <div className="px-1 relative right-1">
            {/* showing call history icon */}
            {(activeComponent === "calls" ||
              activeComponent === "call_history") && (
              <AiOutlineHistory
                size={20}
                role="button"
                className="text-slate-800 dark:text-gray-300"
                onClick={() =>
                  setActiveComponent((prev) =>
                    prev !== "call_history" ? "call_history" : "calls"
                  )
                }
              />
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex-1 h-full overflow-y-auto  custom-scrollbar ">
        {renderActiveComponent()}
      </div>
    </div>
  );
};

export default Chats;
