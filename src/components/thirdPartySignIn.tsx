/**
 * This hook provide returns a function
 * that is used to invoke the specified provider
 *
 */
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";

import firebaseApp from "@/lib/firebaseApp";
import { setAuthUser } from "@/helpers/user";

const auth = getAuth(firebaseApp);

const useThirdPartyAuthSignIn = ({
  onError,
  onSuccess,
  Provider,
}: {
  onError: Function;
  onSuccess?: Function;
  Provider: typeof GoogleAuthProvider | typeof FacebookAuthProvider;
}) => {
  const handleClick = async () => {
    onError("");
    const provider = new Provider();

    try {
      const result = await signInWithPopup(auth, provider);
      const credential = Provider.credentialFromResult(result);

      // token used to access other info for Google APIs
      const token = credential?.accessToken;

      setAuthUser(result.user);

      if (onSuccess) onSuccess();


    } catch (error: any) {
      const errorMessage = error?.message
        .match(/\b(?!Firebase:)\w+\b/g)
        .join(" ");

      onError(errorMessage);
    }
  };

  return { handleClick };
};

export default useThirdPartyAuthSignIn;
