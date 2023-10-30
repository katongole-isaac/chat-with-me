/**
 * Group Compoent
 *
 */

import React, { useContext, useState } from "react";

import Chip from "../common/chip";
import GeneralLayout from "../common/generalLayout";
import Avatar from "../user/avatar";
import { UserContext } from "@/app/chat/page";
import { LoggedInUser } from "@/misc/types";
import Participant from "./participant";

interface GroupProps {
  onBackClick: any;
}

const Group = ({ onBackClick }: GroupProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const { user } = useContext(UserContext) as LoggedInUser;

  const { photoURL, displayName } = user?.providerData[0];

  const ChipImage = () => (
    <Avatar
      displayName={displayName}
      photoURL={photoURL}
      avatarSize={25}
      imageClassName="max-w-[25px]"
    />
  );

  return (
    <GeneralLayout title="Groups" onBackClick={onBackClick}>
      <div className="flex flex-col h-full ">
        {/* added participants and search container */}
        <div className="w-ful  min-h-[9%] max-h-[24%] custom-scrollbar overflow-y-auto flex flex-col">
          {/* chips */}
          <div className="flex-1  flex gap-3 flex-wrap pb-2 ">
            <Chip icon={ChipImage} />
          </div>

          {/* input */}
          <div className="justify-self-end pb-2">
            <input
              type="text"
              autoCapitalize="off"
              autoComplete="off"
              name="search"
              value={searchTerm}
              className="text-gray-600 dark:text-gray-300 px-1 border-b dark:border-[#343434] focus:border-gray-600 bg-transparent w-full focus:outline-none  transition duration-300"
              placeholder="Type friend name ..."
              onChange={(e) => handleOnChange(e)}
            />
          </div>
        </div>

        {/*  */}
        <div className="flex-1 flex flex-col gap-2 custom-scrollbar overflow-y-auto py-3 ">
          <Participant />
        </div>

        {/* bottom action */}
        <div className="basis-16  "></div>
      </div>
    </GeneralLayout>
  );
};

export default Group;
