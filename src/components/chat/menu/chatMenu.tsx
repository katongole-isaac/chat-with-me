/**
 * Chat Menu
 *
 */

import { IoCall } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import React, { useContext, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";

import Avatar from "../../user/avatar";
import MenuOptions from "./menuOptions";
import { UserContext } from "@/app/chat/page";
import type { LoggedInUser } from "@/misc/types";
import { ChatMenuProps } from "@/misc/types/chat";
import { IPopupOptions } from "@/misc/types/popupOptions";
import { IModalLabel } from "@/misc/types/modals";


const ChatMenu = ({
  onProfileClick,
  onOptionClick,
  onCallClick,
  onShowModals,
}: ChatMenuProps) => {
  const { user, wss } = useContext(UserContext) as LoggedInUser;
  const [showMenu, setShowMenu] = useState<IPopupOptions>({
    id: "",
    isOpen: false,
  });

  const handleShowModal = (label: IModalLabel) => {
    onShowModals((prev) => ({ label, open: true }));
  };

  const { photoURL, displayName } = user?.providerData[0];
  const iconSize = 20;

  return (
    <div className="w-full bg-[#fafafa] dark:bg-[#232323] p-2">
      <div className="flex gap-3 px-3 py-1 justify-end items-center">
        <div className="w-full flex-1 ">
          <Avatar
            photoURL={photoURL}
            displayName={displayName}
            onProfileClick={onProfileClick}
            imageClassName="max-w-[50px]"
          />
        </div>
        <div className="flex items-center  text-slate-800 dark:text-[#fafafac7] justify-center gap-4 ">
          {/* friends icon */}
          <FaUserFriends
            size={iconSize}
            className="right-1"
            role="button"
            onClick={() => handleShowModal("friends")}
          />

          <IoCall
            size={iconSize}
            role="button"
            onClick={(e: React.MouseEvent<HTMLElement>) =>
              onCallClick ? onCallClick(e) : null
            }
          />
          <div className="relative">
            <div
              //  w-5 h-5
              className={`rounded-full transition duration-300 ${
                showMenu.isOpen ? " bg-zinc-200 dark:bg-[#525252ad] " : ""
              } flex items-center justify-center`}
            >
              <SlOptionsVertical
                size={iconSize}
                role="button"
                className="text-slate-800 dark:text-[#fafafac7]"
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
