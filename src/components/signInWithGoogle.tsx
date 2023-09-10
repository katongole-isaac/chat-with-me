/**
 * Button that supports signInWithGoogle
 *
 */
import { FcGoogle } from "react-icons/fc";

import { GoogleAuthProvider } from "firebase/auth";
import useThirdPartyAuthSignIn from "./thirdPartySignIn";

const SignInWithGoogle = ({
  onError,
  onSuccess,
}: {
  onError: Function;
  onSuccess?: Function;
}) => {
  const { handleClick } = useThirdPartyAuthSignIn({
    onError,
    onSuccess,
    Provider: GoogleAuthProvider,
  });

  return (
    <div className="w-full">
      <button
        onClick={ () => handleClick()}
        className="flex items-center justify-center gap-2 border p-1 px-2 w-full hover:bg-slate-100 rounded-md"
      >
        <FcGoogle size={20} className="text-blue-700" color="blue" />
        <span>SignIn with Google</span>
      </button>
    </div>
  );
};

export default SignInWithGoogle;
