/**
 * SignOut
 *
 */

import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { BiLogOutCircle } from "react-icons/bi";

import firebaseApp from "@/lib/firebaseApp";
import { removeAuthUser } from "@/helpers/user";

const auth = getAuth(firebaseApp);

export default function SignOut() {

  const router = useRouter();

  const handleSignOutClick = async () => {
    
    await auth.signOut();

    removeAuthUser();
    router.replace('/login');

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
