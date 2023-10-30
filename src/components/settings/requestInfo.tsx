/**
 * Setting Notification panel
 *
 */

import React from "react";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

import GeneralLayout from "../common/generalLayout";
import { GeneralListItemProps } from "@/misc/types/generalLayout";

import GeneralListItem from "../common/generalListItem";

interface IRequestInfoProps {
  onBackClick: any;
}

const RequestInfo = ({ onBackClick }: IRequestInfoProps) => {
  const options: GeneralListItemProps[] = [
    {
      label: "Request Report",
      leftIcon: HiOutlineClipboardDocumentList,
    },
  ];

  return (
    <GeneralLayout title="Request Info" onBackClick={onBackClick}>
      {/* icon */}
      <div className=" min-h-[15%] w-full flex justify-center items-center  ">
        <div className="w-32 h-32 bg-[#5B96F7] rounded-full flex justify-center items-center ">
          <HiOutlineClipboardDocumentList size={40} className="text-gray-50" />
        </div>
      </div>

      <div className="flex flex-col divide-y">
        {options.map((option) => (
          <GeneralListItem hover={false} key={option.label} {...option} />
        ))}
      </div>

      {/* content */}
      <div className="w-full py-6 px-4">
        <p className="text-[12px] text-gray-600 dark:text-gray-400">
          End-to-end encryption keeps your personal messages & call between you
          and person you choose to communicate with. Not even talk can read or
          listen to them. This includes your
        </p>
      </div>
    </GeneralLayout>
  );
};

export default RequestInfo;
