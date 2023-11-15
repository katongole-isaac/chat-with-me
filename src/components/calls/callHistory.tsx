/**
 * Call History
 *
 */

import React from "react";
import { IoCall } from "react-icons/io5";
import { MdCallMissedOutgoing } from "react-icons/md";

import CallListItem from "./callListItem";

const CallHistory = () => {

  const Description = () => (
    <div className="flex gap-2">
      <MdCallMissedOutgoing size={20} className="text-rose-700" />
      <span className="text-[13px] text-gray-600 dark:text-gray-300"> Yesterday at 12:45pm </span>
    </div>
  );

  const icons = [IoCall];

  return (
    <div className="px-3 py-4 flex flex-col gap-3 divide-y dark:divide-[#343434]">
      <CallListItem icons={icons} description={Description} />
    </div>
  );
};

export default CallHistory;
