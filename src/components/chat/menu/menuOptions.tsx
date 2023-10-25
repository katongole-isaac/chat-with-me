/**
 * MenuOptions displayed when the three dot in the chat top Header are cicked.
 * 
 */

import React from "react";

import PopupOptions from "@/components/common/popupOptions";
import { IOption, IPopupOptions } from "@/misc/types/popupOptions";

interface IMenuOptions {
  onShowMenu: React.Dispatch<React.SetStateAction<IPopupOptions>>;
  onOptionClick: Function;
}
const MenuOptions = ({ onShowMenu, onOptionClick }: IMenuOptions) => {
  
  const options: IOption[] = [
    {
      title: "New Chat",
      onClick: onOptionClick,
    },
    {
      title: "New Group",
      onClick: onOptionClick,
    },
    {
      title: "Settings",
      id: "settings",
      onClick: onOptionClick,
    },
    {
      title: "Logout",
      onClick: onOptionClick,
    },
  ];

  return (
    <PopupOptions
      onShowPopup={onShowMenu}
      options={options}
      classes="text-[14px]"
    />
  );
};

export default MenuOptions;
