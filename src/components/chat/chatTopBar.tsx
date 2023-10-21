/**
 * Chat top Bar 
 * 
 */

import { SetStateAction, useContext } from "react";
import Avatar from "../user/avatar";
import { UserContext } from "@/app/chat/page";
import { LoggedInUser } from "@/misc/types";

interface ChatTopBarProps {
  onClick: React.Dispatch<SetStateAction<boolean>>;
}

export default function ChatTopBar({ onClick}: ChatTopBarProps) {

    const {user } = useContext(UserContext) as LoggedInUser;

     const { photoURL, displayName } = user?.providerData[0];

    return (
      <div className="w-full p-2 bg-transparent border-b">
        <div className="flex items-center gap-3">
          <Avatar onProfileClick={()=>onClick(true)} displayName={displayName} photoURL={photoURL} />

          <div className="flex flex-col ">
            <span className="text-slate-800"> Your name</span>
            <span className="text-gray-500 text-[13px]">Last seen </span>
          </div>
        </div>
      </div>
    );
}