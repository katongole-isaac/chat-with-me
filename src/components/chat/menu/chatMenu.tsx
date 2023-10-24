/**
 * Chat Menu
 *
 */

import React, { SetStateAction, useContext, useState } from "react";
import { MdGroupAdd } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

import SignOut from "../../signOut";
import Avatar from "../../user/avatar";
import OnlineStatus from "../onlineStatus";
import Tooltip from "../../common/tootltip";

import type { LoggedInUser } from "@/misc/types";
import { UserContext } from "@/app/chat/page";
import useClickOutside from "@/helpers/useOutClick";
import CreateRoom from "../../rooms/createRoom";
import MenuOptions from "./menuOptions";
import { IPopupOptions } from "@/misc/types/popupOptions";
import { IShowComponent } from "@/misc/types/renderComponent";

type ChatMenuProps = {
  onProfileClick: Function;
  onShowModal:Function;
  showModal: IShowComponent;
};

const ChatMenu = ({
  onProfileClick,
  onShowModal,
  showModal,
}: ChatMenuProps) => {
  const { user, wss } = useContext(UserContext) as LoggedInUser;
  const [showMenu, setShowMenu] = useState<IPopupOptions>({
    id: "",
    isOpen: false,
  });
  const { photoURL, displayName } = user?.providerData[0];

  return (
    <div className="w-full bg-zinc-300 p-2">
      <div className="flex gap-3 px-3 py-1 justify-end items-center">
        <div className="w-full flex-1 ">
          <Avatar
            photoURL={photoURL}
            displayName={displayName}
            onProfileClick={onProfileClick}
            avatarClassName="w-20 h-20"
          />
        </div>
        <div className="flex items-center justify-center gap-4 ">
          <div className="">
            <MdGroupAdd
              size={20}
              // onClick={() => onShowModal(true)}
              className="cursor-pointer"
              disabled={wss && wss.readyState === WebSocket.CLOSED}
              data-tooltip-id="group_icon"
            />
            <Tooltip id="group_icon">
              <span> create room</span>
            </Tooltip>
          </div>
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
                onOptionClick={onShowModal}
                showModal={showModal}
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
