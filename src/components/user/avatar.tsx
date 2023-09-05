/**
 * User Avatar
 *
 */

import Image from "next/image";

type Props = {
  photoURL: string | null;
  displayName: string | null;
};

const UserAvatar = ({ photoURL, displayName }: Props) => {
  return (
    <Image
      width={100}
      height={100}
      src={photoURL!}
      alt={displayName ?? "Avatar"}
    />
  );
};

export default UserAvatar;
