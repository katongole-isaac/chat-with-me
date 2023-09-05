/**
 *
 */

import { useEffect } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

import UserDetails from "./userDetails";

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
    <div className=" w-full h-full max-h-full bg-stone-100 relative ">
      <div className="w-full z-10 px-3 bg-zinc-300 py-4 sticky top-0 ">
        <MdOutlineKeyboardBackspace
          size={30}
          onClick={() => onClose(false)}
          className="cursor-pointer text-slate-800"
        />
      </div>

      <UserDetails />
    </div>
  );
}
