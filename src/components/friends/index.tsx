/**
 * Friend explore modal
 *
 */

import React, { useState } from "react";
import { GrClose } from "react-icons/gr";

import Tabs from "../common/tabs";
import Backdrop from "../common/backdrop";
import { ITab } from "@/misc/types/tabs";

const FriendExplore = ({ onClose }: {onClose : React.MouseEventHandler<HTMLButtonElement>}) => {

  const [activeTab, setActiveTab] = useState("explore");

  const tabs: ITab[] = [
    { id: 1, label: "Explore" },
    { id: 2, label: "Friends" },
    { id: 3, label: "Friend Requests" },
  ];

  const renderActiveTab = () => {
    switch (activeTab.toLowerCase().trim()) {
      case "friends":
        return <> "Friends" </>;

      case "friend requests":
        return <> Friends Request </>;

      default:
        return <>"Explore"</>;
    }
  };

  return (
    <Backdrop>
      <div className="bg-white w-1/2 p-4 relative -top-40 rounded-md">
        {/* close */}
        <div className="py-2 flex w-full justify-end">
          <GrClose size={20} onClick={onClose} className="dark:text-gray-800" role="button" />
        </div>
       
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* content of the active tab */}
        <div className="dark:text-gray-800">
          <div className="py-4">{renderActiveTab()}</div>
        </div>
      </div>
    </Backdrop>
  );
};

export default FriendExplore;
