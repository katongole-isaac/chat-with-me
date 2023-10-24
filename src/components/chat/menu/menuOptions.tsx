/**
 * MenuOptions displayed when the three dot in the chat top Header are cicked.
 * 
 */

import React from "react";

import PopupOptions from "@/components/common/popupOptions";
import { IOption, IPopupOptions } from "@/misc/types/popupOptions";
import { IShowComponent } from "@/misc/types/renderComponent";

interface IMenuOptions {
  onShowMenu: React.Dispatch<React.SetStateAction<IPopupOptions>>;
  onOptionClick: Function;
  showModal: IShowComponent;
}
const MenuOptions = ({ onShowMenu, onOptionClick }: IMenuOptions) => {
  
  const options: IOption[] = [
    {
      title: "New Chat",
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
