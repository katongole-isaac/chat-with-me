/**
 * Options for each particular message
 *
 */

import React, {  useEffect, useRef } from "react";

import { PopupOptionsProps } from "@/misc/types/popupOptions";

const PopupOptions = ({ classes, options, onShowPopup }: PopupOptionsProps) => {

  const optionsDivRef = useRef<HTMLDivElement>(null);

  const handleClickOutSide = (e: MouseEvent) => {
    if (!optionsDivRef.current?.contains(e.target as HTMLDivElement))
      onShowPopup((prev) => ({ ...prev, isOpen: false }));
  };

  const handleEscapePress = (e: KeyboardEvent) => {
    if (e.code === "Escape")
      onShowPopup((prev) => ({ ...prev, isOpen: false }));
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
      className={`min-w-[120px] h-max  flex gap-2 flex-col  shadow-md rounded-md absolute  bg-[#fafafa] dark:bg-neutral-700 dark:text-gray-100 text-gray-700 z-50 ${
        classes ? classes : ""
      }`}
      ref={optionsDivRef}
    >
      {options.map((option) => (
        <div
          key={option.title}
          onClick={() => (option.onClick ? option.onClick(option.id) : null)}
          role="button"
          className=" px-4 py-1 hover:bg-gray-200 dark:hover:bg-[#52525241] text-left"
        >
          <span>{option.title}</span>
        </div>
      ))}
    </div>
  );
};

export default PopupOptions;
