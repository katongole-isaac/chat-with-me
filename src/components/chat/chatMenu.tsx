/**
 * Chat Menu
 *
 */

import { useContext } from "react";

import SignOut from "../signOut";
import UserAvatar from "../user/avatar";
import {  UserContext } from "@/app/chat/page";
import type { LoggedInUser } from "@/misc/types"; 

type ChatMenuProps = {
  onProfileClick: Function;
};

const ChatMenu = ({ onProfileClick }: ChatMenuProps) => {
  
  const { user } = useContext(UserContext) as LoggedInUser;
console.log("HERERE ", user);
  const { photoURL, displayName } = user?.providerData[0];

  return (
    <div className="w-full bg-zinc-300 p-2">
      <div className="flex gap-3 px-3 py-1 justify-end items-center">
        <div className="w-full flex-1">
          <div
            className=" max-w-[40px] max-h-[40px] border rounded-full overflow-hidden "
            role="button"
            onClick={() => onProfileClick()}
          >
            <UserAvatar photoURL={photoURL} displayName={displayName} />
          </div>
        </div>
        {/* logout */}
        <SignOut />
      </div>
    </div>
  );
};

export default ChatMenu;
