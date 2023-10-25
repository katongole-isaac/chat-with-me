/**
 * Settings
 *
 */

<<<<<<< HEAD
=======
import React, { SetStateAction } from "react";
>>>>>>> 012e10213823c026ecee0f5859b015bdae8ab046
import { IoMdHelp } from "react-icons/io";
import { LuKeyboard } from "react-icons/lu";
import { LuFileText } from "react-icons/lu";
import { LuWallpaper } from "react-icons/lu";
import { LuKey as SecurityIcon } from "react-icons/lu";
import { IoIosNotificationsOutline } from "react-icons/io";
import { PiPencilCircleBold as ThemeIcon } from "react-icons/pi";
import { MdOutlineSecurity as PrivacyIcon } from "react-icons/md";

import Avatar from "../user/avatar";
import GeneralLayout from "../common/generalLayout";
import GeneralListItem from "../common/generalListItem";
import { GeneralListItemProps } from "@/misc/types/generalLayout";
<<<<<<< HEAD
import { IModalLabel } from "@/misc/types/modals";
import { ISettings } from "@/misc/types/settings";

=======
import { IModal, IModalLabel } from "@/misc/types/modals";

interface ISettings {
  onBackClick: any;
  onShowModals: React.Dispatch<SetStateAction<IModal>>;
  onClickSettingItem: Function;
}
>>>>>>> 012e10213823c026ecee0f5859b015bdae8ab046

const Settings = ({
  onBackClick,
  onClickSettingItem,
  onShowModals,
}: ISettings) => {
  const handleShowModal = (label: IModalLabel) => {
    onShowModals((prev) => ({ label, open: true }));
  };

  const menu: GeneralListItemProps[] = [
    {
      label: "Notifications",
      leftIcon: IoIosNotificationsOutline,
      id: "notifications",
      onClick: onClickSettingItem,
    },
    {
      label: "Privacy",
      leftIcon: PrivacyIcon,
      id: "privacy",
      onClick: onClickSettingItem,
    },
    {
      label: "Security",
      leftIcon: SecurityIcon,
      id: "security",
      onClick: onClickSettingItem,
    },
    {
      label: "Theme",
      leftIcon: ThemeIcon,
      id: "theme",
      onClick: handleShowModal,
    },
    { label: "Chat Wallpaper", leftIcon: LuWallpaper },
    {
      label: "Request Account Info",
      leftIcon: LuFileText,
      onClick: onClickSettingItem,
      id: "request_info",
    },
    {
      label: "Keyboard Shortcuts",
      leftIcon: LuKeyboard,
      onClick: handleShowModal,
      id: "keyboard_shortcuts",
    },
    {
      label: "Help",
      leftIcon: IoMdHelp,
      onClick: onClickSettingItem,
      id: "help",
    },
  ];

  return (
    <GeneralLayout title="Settings" onBackClick={onBackClick}>
      {/* bio info */}
      <div className="w-full  flex items-center justify-center gap-6 min-h-[15%]">
        {/* avatar section */}
        <div className="basis-24 rounded-full ">
          <Avatar photoURL={""} displayName="" />
        </div>

        {/* bio content section */}
        <div className="flex flex-col gap-1">
          <p className=""> Isaac Katongole </p>
          <p className="text-[12px] text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non,
            numquam?
          </p>
        </div>
      </div>

      {/* menu options */}
      <div className="divide-y">
        {menu.map((item) => (
          <GeneralListItem
            key={item.label}
            leftIcon={IoIosNotificationsOutline}
            {...item}
          />
        ))}
      </div>
    </GeneralLayout>
  );
};

export default Settings;
