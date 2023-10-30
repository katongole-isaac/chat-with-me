/**
 * SignOut
 *
 */

import { useRouter } from "next/navigation";
import { BiLogOutCircle } from "react-icons/bi";

import { logout, removeAuthUser } from "@/helpers/user";
import { firebaseAuth } from "@/lib/firebaseApp";
import Tooltip from "./common/tootltip";


export default function SignOut() {

  const router = useRouter();

  const handleSignOutClick = async () => {

     await logout(firebaseAuth);
    
    router.replace("/login");

  };

  return (
    <div>
      <BiLogOutCircle
        onClick={handleSignOutClick}
        size={20}
        data-tooltip-id="logout"
        className="cursor-pointer text-slate-600 dark:text-[#fafafac7]"
      />
      <Tooltip id="logout">
        <span>logout</span>
      </Tooltip>
    </div>
  );
}
