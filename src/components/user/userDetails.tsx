/**
 * Showing User Details
 *
 */

import Image from "next/image";
import { useContext } from "react";
import  {MdDriveFileRenameOutline}  from 'react-icons/md'

import { LoginedUser, UserContext } from "@/app/chat/page";
import Avatar from "./avatar";

export default function UserDetails() {
  const { user } = useContext(UserContext) as LoginedUser;

  if (!user) return null;

  console.log(user);

  const { photoURL, displayName } = user?.providerData[0];

  return (
    <div className="w-full ">
      <div className="w-full flex p-3 pb-8 items-center justify-center bg-zinc-300 ">
        <div className="max-w-[100px] max-h-[100px] border border-rose-700 rounded-full flex justify-center items-center p-2 overflow-hidden">
          <Avatar
            displayName={displayName}
            photoURL={photoURL}
            avatarSize={70}
           
          />
        </div>
      </div>

      <div className="w-full py-4 text-[16px] flex gap-2 justify-center items-center">
        <MdDriveFileRenameOutline size={20} />
        <p className=" font-semibold tracking-wide">
          {" "}
          {displayName ?? "Anonymous"}
        </p>
      </div>
    </div>
  );
}
