/**
 * Chat Menu
 *
 */

import React, { useContext, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import SignOut from "../../signOut";
import Avatar from "../../user/avatar";
import MenuOptions from "./menuOptions";
import { UserContext } from "@/app/chat/page";
import type { LoggedInUser } from "@/misc/types";
import { ChatMenuProps } from "@/misc/types/chat";
import { IPopupOptions } from "@/misc/types/popupOptions";

const ChatMenu = ({ onProfileClick, onOptionClick }: ChatMenuProps) => {
  const { user, wss } = useContext(UserContext) as LoggedInUser;
  const [showMenu, setShowMenu] = useState<IPopupOptions>({
    id: "",
    isOpen: false,
  });
  const { photoURL, displayName } = user?.providerData[0];

  return (
    <div className="w-full bg-[#fafafa] p-2">
      <div className="flex gap-3 px-3 py-1 justify-end items-center">
        <div className="w-full flex-1 ">
          <Avatar
            photoURL={photoURL}
            displayName={displayName}
            onProfileClick={onProfileClick}
            imageClassName="max-w-[50px]"
          />
        </div>
        <div className="flex items-center justify-center gap-4 ">
          <SignOut />

          <div className="relative">
            <div
              className={`rounded-full w-8 h-8 transition duration-300 ${
                showMenu.isOpen ? " bg-zinc-200 " : ""
              } flex items-center justify-center`}
            >
              <BsThreeDotsVertical
                size={20}
                role="button"
                className="text-slate-800"
                onClick={() =>
                  setShowMenu((prev) => ({ ...prev, isOpen: !prev.isOpen }))
                }
              />
            </div>
            {showMenu.isOpen && (
              <MenuOptions
                onOptionClick={onOptionClick}
                onShowMenu={setShowMenu}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMenu;
