/**
 * Options for each particular message
 *
 */

import React from "react";
import { PiDotsThreeVerticalBold } from "react-icons/pi";

interface OptionsIconProps {
  onClick?: React.MouseEventHandler;
  incoming?: boolean;
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
const MessageOptions = () => {
  return (
    <div className="hover">
      <div className="w-max h-max px-2 py-1 flex gap-2 flex-col items-center shadow-md rounded-md absolute ">
        {messageOpts.map((opt) => (
          <span key={opt.title}> {opt.title} </span>
        ))}
      </div>
    </div>
  );
};

// option icon for a message
export const OptionsIcon = ({ onClick, incoming }: OptionsIconProps) => {
  return (
    <div
      className={`self-start hidden group-hover:flex absolute w-5 h-5  justify-center items-center right-0 top-0 ${
        incoming ? "text-gray-400 bg-gray-100" : "text-white"
      } `}
      role="button"
    >
      <PiDotsThreeVerticalBold
        size={15}
        onClick={(e: React.MouseEvent) => onClick!(e)}
      />
    </div>
  );
};

export default MessageOptions;
