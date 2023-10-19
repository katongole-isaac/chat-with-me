/**
 * Options for each particular message
 *
 */

import React, { useContext, useEffect, useRef } from "react";
import { PiCaretDown } from "react-icons/pi";
import { MessageOptionContext } from "./message";
import { MessageOptionContextProps } from "@/misc/types";
import useClickOutside from "@/helpers/useOutClick";

interface OptionsIconProps {
  onClick?: React.MouseEventHandler;
  incoming?: boolean;
  id: string | number;
}
interface MessageOptsProps {
  classes?: string;
}
// message options
const messageOpts = [
  { title: "Reply" },
  { title: "React" },
  { title: "Star" },
  { title: "Report" },
  { title: "Delete" },
];

// options for a message
const MessageOptions = ({ classes }: MessageOptsProps) => {
  const { setShowMessageOption } = useContext(
    MessageOptionContext
  ) as MessageOptionContextProps;

  const msgOptRef = useRef<HTMLDivElement>(null);

  const handleClickOutSide = (e: MouseEvent) => {
    
    if (!msgOptRef.current?.contains(e.target as HTMLDivElement))
      setShowMessageOption((prev) => ({ ...prev, isOpen: false }));
  };

  const handleEscapePress = (e: KeyboardEvent) => {
    if (e.code === "Escape") 
      setShowMessageOption((prev) => ({ ...prev, isOpen: false }));
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide);
    document.addEventListener("keydown", handleEscapePress);

    return () => {
      document.removeEventListener("click", handleClickOutSide);
      document.removeEventListener("keydown", handleEscapePress);
    };
  });

  return (
    <div
      className={`min-w-[120px] h-max  flex gap-2 flex-col  shadow-md rounded-md absolute  bg-[#fafafa] text-gray-700 z-50 ${
        classes ? classes : ""
      }`}
      ref={msgOptRef}
    >
      {messageOpts.map((opt) => (
        <div
          key={opt.title}
          role="button"
          className=" px-4 py-1 hover:bg-gray-200 text-left"
        >
          <span>{opt.title}</span>
        </div>
      ))}
    </div>
  );
};

// option icon for a message
export const OptionsIcon = ({ onClick, incoming, id }: OptionsIconProps) => {
  const { setShowMessageOption } = useContext(
    MessageOptionContext
  ) as MessageOptionContextProps;

  const handleClick = (id: string | number) => {
    setShowMessageOption((prev) => {
      if (prev.id === id)
        return prev.isOpen
          ? { ...prev, isOpen: !prev.isOpen }
          : { id, isOpen: true };

      return { id, isOpen: true };
    });
  };

  return (
    <div
      className={`self-start hidden group-hover:flex absolute w-5 h-5  justify-center items-center right-0 top-0 ${
        incoming ? "text-gray-700 bg-gray-50" : "text-gray-700 bg-gray-50"
      } `}
      role="button"
      onClick={() => handleClick(id)}
    >
      <PiCaretDown
        size={15}
        onClick={onClick ? (e: React.MouseEvent) => onClick!(e) : null}
      />
    </div>
  );
};

export default MessageOptions;
