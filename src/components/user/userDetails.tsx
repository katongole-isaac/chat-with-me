/**
 * Showing User Details
 *
 */

import Image from "next/image";
import { useContext } from "react";
import  {MdDriveFileRenameOutline}  from 'react-icons/md'

import { MyContext, UserContext } from "@/app/chat/page";
import UserAvatar from "./avatar";

export default function UserDetails() {
  const { user } = useContext(UserContext) as MyContext;

  if (!user) return null;

  console.log(user);

  const { photoURL, displayName } = user?.providerData[0];

  return (
    <div className="w-full ">
      <div className="w-full flex p-3 pb-8 items-center justify-center bg-zinc-300 ">
        <div className="max-w-[100px] max-h-[100px] rounded-full overflow-hidden ">
          <UserAvatar
            displayName={displayName}
            photoURL={photoURL}
            avatarSize={100}
            avatarClassName="w-20  h-20"
          />
        </div>
      </div>

      <div className="w-full py-4 text-[16px] flex gap-2 justify-center items-center">
        <MdDriveFileRenameOutline size={20} />
        <p className=" font-semibold tracking-wide">
          {" "}
          {displayName ?? "Anonymous"}{" "}
        </p>
      </div>
    </div>
  );
}
