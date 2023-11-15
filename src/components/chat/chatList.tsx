/**
 * Single Room
 *
 */

import { useContext } from "react";

import Tooltip from "../common/tootltip";
import Avatar from "../user/avatar";
import { UserContext } from "@/app/chat/page";
import { type LoggedInUser } from "@/misc/types";

interface ChatProps  {
  activeChat: number;
  index: number;
  onActiveChat: React.Dispatch<number>;
  onShowChatPanel: React.Dispatch<boolean>
};

export default function Chat({ activeChat, index, onActiveChat, onShowChatPanel }: ChatProps) {
  const { user, wss } = useContext(UserContext) as LoggedInUser;

  const { photoURL, displayName } = user?.providerData[0];

  const label =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident unde maiores laboriosam similique, nobis edark:text-gray-300xercitationem praesentium enim architecto aperiam rerum?";
  const handleClick = (index: number) => {
    onShowChatPanel(true);
    onActiveChat(index);
  };

  return (
    <div
      role="button"
      onClick={() => handleClick(index)}
      className={` ${
        activeChat === index ? "bg-neutral-200   dark:bg-[#343434]" : ""
      } w-full px-2 py-3 cursor-pointer hover:bg-zinc-100 dark:hover:dark:bg-[#343434]`}
    >
      <div className="flex gap-2">
        {/* avatar  */}
        <div className=" rounded-full ">
          <Avatar photoURL={photoURL} displayName={displayName} />
        </div>

        {/* chat title */}
        <div className="flex-1 flex-col space-y-[3px] overflow-hidden ">
          <h1
            className="text-slate-800 dark:text-gray-300 max-w-full whitespace-nowrap text-ellipsis overflow-hidden"
            data-tooltip-id="room_title"
          >
            {label}
          </h1>
          <p className="text-[13px] text-gray-500 dark:text-gray-400">
            Room Description
          </p>
        </div>

        {/* time  */}

        <div className="basis-14 min-w-max  text-[12px] justify-end flex flex-col gap-2 items-end ">
          <span className="text-gray-400 items-center "> Yesterday </span>
          <div className="text-white w-6 h-6 max-w-sm max-h-sm p-1 bg-blue-500 dark:bg-rose-600 dark:font-semibold rounded-full flex justify-center items-center ">
            <span> 2 </span>
          </div>
        </div>
      </div>

      <Tooltip
        id="room_title"
        style={{
          fontSize: "13px",
          padding: "5px",
        }}
      >
        {label}
      </Tooltip>
    </div>
  );
}
