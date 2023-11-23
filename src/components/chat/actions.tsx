import React, { useRef } from "react";
import { RiAddFill } from "react-icons/ri";
import { BsCamera } from "react-icons/bs";
import { BiImage } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { HiOutlineDocument } from "react-icons/hi";

import { useShowHideModal } from "@/hooks/useShowHideModal";
import useClickOutside from "@/hooks/useOutClick";

const iconSize = 24;
const actionButtons = [
  {
    label: "Image",
    icon: BsCamera,
    color: "bg-blue-600",
    size: iconSize,
  },
  {
    label: "Document",
    icon: HiOutlineDocument,
    color: "bg-rose-700",
    size: iconSize,
  },
  {
    label: "Photo/Video",
    icon: BiImage,
    color: "bg-indigo-500",
    size: iconSize,
  },
];

const ChatActions = () => {
  const { showModal: showAction, setShowModal: setShowAction } =
    useShowHideModal();

  const actionRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    popupRef: actionRef,
    onSetShowModal: setShowAction,
    showModal: showAction,
    originRef: null,
  });

  return (
    <div>
      {showAction ? (
        <div className=" text-gray-500  w-6 h-6 rounded-md flex items-center justify-center ">
          <IoClose
            role="button"
            size={25}
            onClick={() => setShowAction(false)}
          />
        </div>
      ) : (
        <RiAddFill
          onClick={() => setShowAction(true)}
          size={25}
          className="text-gray-500"
          role="button"
        />
      )}

      {showAction && (
        <div
          ref={actionRef}
          className="absolute w-max h-max -top-40 flex flex-col gap-4"
        >
          {actionButtons.map((button) => (
            <FloatingButton key={button.label} {...button} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatActions;

const FloatingButton = ({
  classes,
  label,
  color,
  size,
  icon,
}: {
  classes?: string;
  label: string;
  color: string;
  size: number;
  icon: (props: any) => JSX.Element;
}) => {
  return (
    <div className="group relative flex gap-4">
      <div
        role="button"
        className={`flex w-max h-max justify-center items-center rounded-full hover:opacity-75 text-gray-200 p-2 ${color} ${classes}`}
      >
        {icon({ size })}
      </div>
      <div className="self-center hidden group-hover:block -right-24 top-2 bg-slate-800 text-gray-200 px-2 py-1 rounded-md text-[12px] w-max ">
        <span> {label} </span>
      </div>
    </div>
  );
};
