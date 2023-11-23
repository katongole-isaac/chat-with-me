import React from "react";
import { MdTurnLeft } from "react-icons/md";

import GeneralLayout from "../common/generalLayout";
import { GeneralListItemProps } from "@/misc/types";
import GeneralListItem from "../common/generalListItem";

interface IPrivacyProps {
  onBackClick: any;
}

const Privacy = ({ onBackClick }: IPrivacyProps) => {
    
  const privacyOptions: GeneralListItemProps[] = [
    {
      label: "Last Seen",
      description: "Everyone",
      rightIcon: MdTurnLeft,
    },
    {
      label: "Profile Photo",
      description: "Everyone",
    },
    {
      label: "About",
      description: "Everyone",
    },
    {
      label: "Read receipts",
      description:
        "If turned off, you won't send or recieve read receipts. Read receipts are always sent for the group chats",
      rightIcon: MdTurnLeft,
    },
    {
      label: "Groups",
      description: "Everyone",
    },
    {
      label: "Blocked Contacts",
      description: "9",
    },
  ];

  return (
    <GeneralLayout title="Privacy" onBackClick={onBackClick}>
      <div className="flex flex-col divide-y dark:divide-[#343434]">
        {privacyOptions.map((option) => (
          <GeneralListItem key={option.label} {...option} />
        ))}
      </div>
    </GeneralLayout>
  );
};

export default Privacy;
