/**
 * Chats - Displays chat top menu, Search and chat list
 * 
 */

import ChatLists from "./chatLists";
import ChatMenu from "./menu/chatMenu";
import Search from "@/components/common/search";
import { ChatMenuProps, ChatsProps } from "@/misc/types/chat";

const Chats = ({ onOptionClick, onProfileClick }: ChatsProps) => {
  return (
    <div className="w-full h-full flex flex-col ">
      <div>
        <ChatMenu
          onOptionClick={onOptionClick}
          onProfileClick={onProfileClick}
        />
        <Search />
      </div>

      <div className="w-full flex-1 h-full overflow-y-auto  custom-scrollbar ">
        <ChatLists />
      </div>
    </div>
  );
};

export default Chats;
