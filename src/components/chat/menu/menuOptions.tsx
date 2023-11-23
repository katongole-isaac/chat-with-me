/**
 * MenuOptions displayed when the three dot in the chat top Header are cicked.
 * 
 */

import React from "react";
import { useRouter } from 'next/navigation';

import PopupOptions from "@/components/common/popupOptions";
import { IOption, IPopupOptions } from "@/misc/types";
import authService from "@/services/authService";

interface IMenuOptions {
  onShowMenu: React.Dispatch<React.SetStateAction<IPopupOptions>>;
  onOptionClick: Function;
}
const MenuOptions = ({ onShowMenu, onOptionClick }: IMenuOptions) => {

   const router = useRouter();

  const options: IOption[] = [
    {
      title: "New Chat",
      onClick: onOptionClick,
    },
    {
      title: "New Group",
      id: "group",
      onClick: onOptionClick,
    },
    {
      title: "Settings",
      id: "settings",
      onClick: onOptionClick,
    },
    {
      title: "Logout",
      onClick: () =>  authService.logout(router, "/login"),
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
