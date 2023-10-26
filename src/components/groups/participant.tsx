/**
 * Group participant
 *
 */

import React, { useContext } from "react";

import Avatar from "../user/avatar";
import { UserContext } from "@/app/chat/page";
import { LoggedInUser } from "@/misc/types";

interface ParticipantProps {
    onClick?: React.MouseEventHandler<HTMLDivElement>
    id? : any
}

const Participant = ({onClick, id}:ParticipantProps) => {

  const { user } = useContext(UserContext) as LoggedInUser;

  const { photoURL, displayName } = user?.providerData[0];

  return (
    <div
      role="button"
      onClick={() => (onClick ? onClick(id) : null)}
      className=" py-1 flex items-center w-full gap-3 hover:bg-[#f2f4ff]"
    >
      <Avatar
        displayName={displayName}
        photoURL={photoURL}
        imageClassName="max-w-[50px]"
      />
      <span className="text-gray-700 text-[14px]"> Isaac katongole </span>
    </div>
  );
};

export default Participant;
