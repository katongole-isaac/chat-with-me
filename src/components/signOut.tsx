/**
 * SignOut
 *
 */

import { useRouter } from "next/navigation";
import { BiLogOutCircle } from "react-icons/bi";

import Tooltip from "./common/tootltip";
import authService from "@/services/authService";


export default function SignOut() {

  const router = useRouter();

  const handleSignOutClick =  () =>  authService.logout(router, "/login");

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
