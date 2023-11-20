/**
 * User Avatar
 *
 */
import React from "react";
import { RiAccountCircleFill } from "react-icons/ri";

import Image from "next/image";

interface Props {
  photoURL: string | null;
  displayName: string | null;
  avatarSize?: number;
  avatarClassName?: string;
  imageClassName?: string;
  onProfileClick?: Function;
}

const Avatar = ({
  onProfileClick,
  photoURL,
  displayName,
  avatarSize = 50,
  avatarClassName,
  imageClassName,
}: Props) => {
  return (
    <div
      role="button"
      onClick={() => (!!onProfileClick ? onProfileClick() : null)}
      className="w-max h-max  flex justify-center items-center rounded-full overflow-hidden p-0 relative"
    >
      {photoURL !== null && !!photoURL ? (
        <div className={`  ${imageClassName ? imageClassName :"max-w-[50px]" }`}>
          <Image
            width={100}
            height={100}
            src={photoURL!}
            className={`"text-[12px]"`}
            alt={displayName ?? "Avatar"}
          />
        </div>
      ) : (
        <RiAccountCircleFill
          size={avatarSize}
          className={`text-slate-400 bg-gradient-to-t from-cyan cursor-pointer ${avatarClassName}`}
        />
      )}
    
    </div>
  );
};

export default Avatar;
