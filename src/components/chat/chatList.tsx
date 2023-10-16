/**
 * Single Room
 *
 */

import { useContext } from "react";

import Tooltip from "../common/tootltip";
import Avatar from "../user/avatar";
import { UserContext } from "@/app/chat/page";
import { type LoggedInUser } from "@/misc/types";

type ChatProps = {
  activeChat: number;
  index: number;
  onActiveChat: React.Dispatch<number>;
};

export default function Chat({ activeChat, index, onActiveChat }: ChatProps) {
  const { user, wss } = useContext(UserContext) as LoggedInUser;

  const { photoURL, displayName } = user?.providerData[0];

  const label =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident unde maiores laboriosam similique, nobis exercitationem praesentium enim architecto aperiam rerum?";
  return (
    <div
      role="button"
      onClick={() => onActiveChat(index)}
      className={` ${
        activeChat === index ? "bg-neutral-200" : ""
      } w-full px-2 py-3 cursor-pointer hover:bg-zinc-100 `}
    >
      <div className="flex gap-2">
        {/* avatar  */}
        <div className=" rounded-full ">
          <Avatar photoURL={photoURL} displayName={displayName} />
        </div>

        {/* chat title */}
        <div className="flex-1 flex-col space-y-[3px] overflow-x-clip">
          <h1
            className="text-slate-800 max-w-full whitespace-nowrap text-ellipsis overflow-hidden"
            data-tooltip-id="room_title"
          >
            {label}
          </h1>
          <p className="text-[13px] text-gray-500"> Room Description </p>
        </div>

        {/* time  */}

        <div className="basis-14 min-w-max  text-[12px] justify-end flex flex-col gap-2 items-end ">
          <span className="text-gray-400 items-center "> Yesterday </span>
          <div className="text-white w-6 h-6 max-w-sm max-h-sm p-1 bg-blue-500 rounded-full flex justify-center items-center ">
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