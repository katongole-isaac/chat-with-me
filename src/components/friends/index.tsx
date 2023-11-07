/**
 * Friend explore modal
 *
 */

import React, { useState } from "react";

import Backdrop from "../common/backdrop";
import Tabs from "../common/tabs";
import { ITab } from "@/misc/types/tabs";

const FriendExplore = () => {
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
      <div className="bg-white w-1/2 p-4  rounded-md">
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
