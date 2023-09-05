/**
 *
 */

import { useEffect } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

export default function Profile({
  onClose,
  showProfile,
}: {
  onClose: Function;
  showProfile: boolean;
}) {
  const handleCloseProfile = (e: KeyboardEvent) => {
    console.log(e);
    if (e.code === "Escape" && showProfile) onClose(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleCloseProfile);

    return () => {
      window.removeEventListener("keydown", handleCloseProfile);
    };
  });

  return (
    <div className=" absolute top-0 z-10 w-full h-full bg-slate-300">
      <div className="w-full p-3 bg-gray-400  ">
        <MdOutlineKeyboardBackspace size={30} onClick={() => onClose(false)} />
      </div>
    </div>
  );
}
