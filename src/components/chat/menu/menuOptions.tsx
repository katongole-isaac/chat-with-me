/**
 * MenuOptions displayed when the three dot in the chat top Header are cicked.
 * 
 */

import React from "react";

import PopupOptions from "@/components/common/popupOptions";
import { IOption, IPopupOptions } from "@/misc/types/popupOptions";

const MenuOptions = ({
  onShowMenu,
}: {
  onShowMenu: React.Dispatch<React.SetStateAction<IPopupOptions>>;
}) => {
  const options: IOption[] = [
    {
      title: "New Chat",
    },
    {
      title: "Settings",
    },
    {
      title: "Logout",
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
