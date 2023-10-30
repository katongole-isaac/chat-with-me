/**
 * Setting Notification panel
 *
 */

import React from "react";
import { BiLock } from "react-icons/bi";
import { SiCircle as StatusIcon } from "react-icons/si";
import { IoCallOutline as CallIcon } from "react-icons/io5";
import { AiOutlineComment as TextIcon } from "react-icons/ai";
import { PiLinkSimpleBreakBold as PhotoIcon } from "react-icons/pi";
import { IoLocationOutline  as LocationIcon} from "react-icons/io5";

import GeneralLayout from "../common/generalLayout";
import GeneralListItem from "../common/generalListItem";
import { GeneralListItemProps } from "@/misc/types/generalLayout";

interface ISecurityProps {
  onBackClick: any;
}

const Security = ({ onBackClick }: ISecurityProps) => {

   
  const options: GeneralListItemProps[] = [
    {
      description: "Text and voice messages",
      leftIcon: TextIcon,
      id: "text",
    },
    {
      description: "Audio & Video calls",
      leftIcon: CallIcon,
      id: "calls"
    },
    {
      description: "Photos, Videos & Documents",
      leftIcon: PhotoIcon,
      id: "photos"
    },
    {
      description: "Location Sharing",
      leftIcon: LocationIcon,
      id: "location"
    },
    {
      description: "Status Updates",
      leftIcon: StatusIcon,
      id: "status"
    },
  ];

  return (
    <GeneralLayout title="Security" onBackClick={onBackClick}>
      
      {/* icon */}
      <div className=" min-h-[15%] w-full flex justify-center items-center  ">
        <div className="w-32 h-32 bg-[#5B96F7] rounded-full flex justify-center items-center ">
          <BiLock size={40} className="text-gray-50" />
        </div>
      </div>

      {/* content */}
      <div className="w-full py-6 px-4">
        <p className="text-lg text-gray-800 dark:text-gray-300 font-medium ">
          Your Chat and Calls are private{" "}
        </p>
        <p className="text-[12px] text-gray-600 dark:text-gray-400">
          End-to-end encryption keeps your personal messages & call between you
          and person you choose to communicate with. Not even talk can read or
          listen to them. This includes your
        </p>
      </div>

      <div className="flex flex-col">
        {options.map((option) => (
          <GeneralListItem key={option.id} hover={false}  {...option} />
        ))}
      </div>
    </GeneralLayout>
  );
};

export default Security;
