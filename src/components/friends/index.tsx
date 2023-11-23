/**
 * Friend explore modal
 *
 */

import React, { useEffect, useState } from "react";
import { BsChatLeft } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";

import Tabs from "../common/tabs";
import Backdrop from "../common/backdrop";
import { ITab } from "@/misc/types";
import UserListItem from "../common/userListItem";
import apiClient from "@/services/apiClient";

const FriendExplore = ({
  onClose,
}: {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const [activeTab, setActiveTab] = useState("explore");
  const [ res, setRes ] = useState([]);

  const tabs: ITab[] = [
    { id: 1, label: "Explore" },
    { id: 2, label: "Friends" },
    { id: 3, label: "Friend Requests" },
  ];

  const FriendActionButton = () => <BsChatLeft role="button" size={20} />;

  const RequestActionBtn = () => (
    <div className="">
      <button className="text-blue-600 text-[12px] font-semibold">
        Accept Request
      </button>
    </div>

  );

  
  useEffect(()=>{

    const controller = new AbortController();

    const getFriends = async () => {
      try{

        const res = await apiClient.get('/users', { signal : controller.signal });
        console.log('Res: ', res);

      }catch(err){

      }
    }

    getFriends();

    return () => controller.abort();
    
    
  }, [])


  const renderActiveTab = () => {
    switch (activeTab.toLowerCase().trim()) {
      case "friends":
        return <UserListItem action={<FriendActionButton />} />;

      case "friend requests":
        return <UserListItem action={<RequestActionBtn />} />;

      default:
        return <UserListItem action={<RequestActionBtn />} />;
    }
  };

  return (
    <Backdrop>
      <div className="bg-white flex flex-col  dark:bg-neutral-800 w-[30%] min-h-[650px] h-[650px] max-h-[650px] p-4 relative  rounded-md">
        {/* close */}
        <div className="">
          <div className="py-2 flex w-full justify-end">
            <VscChromeClose
              size={20}
              onClick={onClose}
              className="dark:text-white"
              role="button"
            />
          </div>

          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            classes="dark:text-gray-200"
          />
        </div>

        {/* content of the active tab */}
        <div className="dark:text-gray-200 flex-1 overflow-y-auto custom-scrollbar p-2 ">
          {renderActiveTab()}
        </div>
      </div>
    </Backdrop>
  );
};

export default FriendExplore;
