/**
 * User Avatar
 *
 */
import React from "react";

import { RiAccountCircleFill } from "react-icons/ri";
import Image from "next/image";
import OnlineStatus from "../chat/onlineStatus";

type Props = {
  photoURL: string | null;
  displayName: string | null;
  avatarSize?: number;
  avatarClassName?: string;
  onProfileClick?: Function;
};

const Avatar = ({
  onProfileClick,
  photoURL,
  displayName,
  avatarSize = 50,
  avatarClassName,
}: Props) => {
  return (
    <div className="relative w-max">
      <div
        role="button"
        onClick={onProfileClick ? () => onProfileClick() : () => {}}
        className="w-max max-w-[50px] max-h-[50px] flex justify-center items-center rounded-full overflow-hidden"
      >
        <React.Fragment>
          {photoURL !== null ? (
            <Image
              width={100}
              height={100}
              src={photoURL!}
              alt={displayName ?? "Avatar"}
            />
          ) : (
            <RiAccountCircleFill
              size={avatarSize}
              className={`text-slate-500 cursor-pointer ${avatarClassName}`}
            />
          )}
        </React.Fragment>
      </div>

      {/* Re-positioning the online based based on whether photo is not null or not */}
      {!photoURL ? (
        <div className="relative bottom-1 right-[2px]">
          <OnlineStatus />
        </div>
      ) : (
        <OnlineStatus />
      )}
    </div>
  );
};

export default Avatar;
