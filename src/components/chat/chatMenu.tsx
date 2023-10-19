/**
 * Chat Menu
 *
 */

import { useContext } from "react";
import { MdGroupAdd } from "react-icons/md";

import SignOut from "../signOut";
import Avatar from "../user/avatar";
import OnlineStatus from "./onlineStatus";
import Tooltip from "../common/tootltip";

import type { LoggedInUser } from "@/misc/types";
import { UserContext } from "@/app/chat/page";
import useClickOutside from "@/helpers/useOutClick";
import CreateRoom from "../rooms/createRoom";

type ChatMenuProps = {
  onProfileClick: Function;
  onShowModal: React.Dispatch<boolean>;
};

const ChatMenu = ({ onProfileClick, onShowModal }: ChatMenuProps) => {
  const { user, wss } = useContext(UserContext) as LoggedInUser;

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
        <div className="flex items-center justify-center gap-8 ">
          <div className="">
            <MdGroupAdd
              size={20}
              onClick={() => onShowModal(true)}
              className="cursor-pointer"
              disabled={wss && wss.readyState === WebSocket.CLOSED}
              data-tooltip-id="group_icon"
            />
            <Tooltip id="group_icon">
              <span> create room</span>
            </Tooltip>
          </div>
          <SignOut />
        </div>
      </div>
    </div>
  );
};

export default ChatMenu;



