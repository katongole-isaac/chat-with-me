/**
 * Chat Menu
 *
 */

import { useState } from "react";

import { RiAccountCircleFill } from "react-icons/ri";

type ChatMenuProps = {
  onProfileClick: Function;
};

const ChatMenu = ({ onProfileClick }: ChatMenuProps) => {
  return (
    <div className="w-full bg-zinc-300 p-2">
      <div className="flex gap-3 px-3 py-1">
        <RiAccountCircleFill
          onClick={() => onProfileClick((prev: boolean) => !prev)}
          size={40}
          className="text-slate-500 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ChatMenu;
