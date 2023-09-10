/**
 * SignOut
 *
 */

import { useRouter } from "next/navigation";
import { BiLogOutCircle } from "react-icons/bi";

import { logout, removeAuthUser } from "@/helpers/user";
import { firebaseAuth } from "@/lib/firebaseApp";


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
        size={25}
        className="cursor-pointer text-slate-600"
      />
    </div>
  );
}
