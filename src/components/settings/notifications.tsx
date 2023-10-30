/**
 * Setting Notification panel
 *
 */

import React from "react";
import GeneralLayout from "../common/generalLayout";
import { GeneralListItemProps } from "@/misc/types/generalLayout";
import { AiOutlineCheckSquare } from "react-icons/ai";
import GeneralListItem from "../common/generalListItem";

interface ISettingNotificationsProps {
  onBackClick: any;
}

const SettingNotifications = ({ onBackClick }: ISettingNotificationsProps) => {
  const options: GeneralListItemProps[] = [
    {
      label: "Notifications",
      description: "Show notifications for new users",
      rightIcon: AiOutlineCheckSquare,
    },
    {
      label: "Show Previws",
    },
    {
      label: "Show Reactive Notifications",
    },
    {
      label: "Incoming call rigntone",
    },
    {
      label: "Sounds",
      description: "Play sounds for incoming messages",
    },
  ];

  return (
    <GeneralLayout title="Notifications" onBackClick={onBackClick}>
      <div className="flex flex-col divide-y dark:divide-[#343434]">
        {options.map((option) => (
          <GeneralListItem key={option.label} {...option} />
        ))}
      </div>
    </GeneralLayout>
  );
};

export default SettingNotifications;
