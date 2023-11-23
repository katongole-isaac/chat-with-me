/**
 * Setting Notification panel
 *
 */

import React from "react";
import GeneralLayout from "../common/generalLayout";
import { GeneralListItemProps } from "@/misc/types";
import {  IoFingerPrint } from "react-icons/io5";

import GeneralListItem from "../common/generalListItem";

interface IHelpProps {
  onBackClick: any;
}

const Help = ({ onBackClick }: IHelpProps) => {
  const options: GeneralListItemProps[] = [
    {
      label: "Help Center",
    },
    {
      label: "Contact Us",
    },
    {
      label: "Licenses",
    },
    {
      label: "Terms and Privacy Policy",
    },
  ];

  return (
    <GeneralLayout title="Help" onBackClick={onBackClick}>
      {/* icon */}
      <div className=" min-h-[15%] w-full flex justify-center items-center  ">
        <div className="w-28 h-28 bg-[#5B96F7] rounded-full flex justify-center items-center ">
          <IoFingerPrint size={40} className="text-gray-50" />
        </div>
      </div>

      <div className="flex flex-col divide-y dark:divide-[#343434]">
        {options.map((option) => (
          <GeneralListItem hover={false} key={option.label} {...option} />
        ))}
      </div>
    </GeneralLayout>
  );
};

export default Help;
