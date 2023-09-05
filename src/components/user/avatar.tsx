/**
 * User Avatar
 *
 */
import React from "react";

import { RiAccountCircleFill } from "react-icons/ri";
import Image from "next/image";

type Props = {
  photoURL: string | null;
  displayName: string | null;
  avatarSize?: number;
  avatarClassName?: string;
};

const UserAvatar = ({
  photoURL,
  displayName,
  avatarSize = 40,
  avatarClassName,
}: Props) => {
  return (
    <React.Fragment>
      {photoURL ? (
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
  );
};

export default UserAvatar;
