/**
 * Chat Menu
 *
 */

import { MdOutlineCall } from "react-icons/md";
import React, { useContext, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LiaUserFriendsSolid } from "react-icons/lia";

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
        <div className="flex items-center text-slate-800 dark:text-[#fafafac7] justify-center gap-3 ">
          {/* friends icon */}
          <LiaUserFriendsSolid
            size={20}
            className="right-1"
            role="button"
            onClick={() => handleShowModal("friends")}
          />

          <MdOutlineCall
            size={18}
            role="button"
            onClick={(e: React.MouseEvent<HTMLElement>) =>
              onCallClick ? onCallClick(e) : null
            }
          />
          <div className="relative">
            <div
              className={`rounded-full w-5 h-5 transition duration-300 ${
                showMenu.isOpen ? " bg-zinc-200 dark:bg-[#525252ad] " : ""
              } flex items-center justify-center`}
            >
              <BsThreeDotsVertical
                size={20}
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
