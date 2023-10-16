/**
 * Chat top Bar 
 * 
 */

import { useContext } from "react";
import Avatar from "../user/avatar";
import { UserContext } from "@/app/chat/page";
import { LoggedInUser } from "@/misc/types";

export default function ChatTopBar() {

    const {user } = useContext(UserContext) as LoggedInUser;

     const { photoURL, displayName } = user?.providerData[0];

    return (
      <div className="w-full p-2 bg-transparent border-b">
        <div className="flex items-center gap-3">
          <Avatar displayName={displayName} photoURL={photoURL} />

          <div className="flex flex-col ">
            <span className="text-slate-800"> Your name</span>
            <span className="text-gray-500 text-[13px]">Last seen </span>
          </div>
        </div>
      </div>
    );
}