/**
 * Button that supports signInWithGoogle
 *
 */
import { MdOutlineFacebook } from "react-icons/md";

import { FacebookAuthProvider } from "firebase/auth";
import useThirdPartyAuthSignIn from "./thirdPartySignIn";

const SignInWithFacebook = ({
  onError,
  onSuccess,
}: {
  onError: Function;
  onSuccess?: Function;
}) => {
  const { handleClick } = useThirdPartyAuthSignIn({
    onError,
    onSuccess,
    Provider: FacebookAuthProvider,
  });

  return (
    <div className="w-full">
      <button
        onClick={() => handleClick()}
        className="flex items-center justify-center gap-2 border p-1 px-2 w-full hover:bg-slate-100 rounded-md"
      >
        <MdOutlineFacebook size={20} />
        <span>SignIn with Facebook</span>
      </button>
    </div>
  );
};

export default SignInWithFacebook;
