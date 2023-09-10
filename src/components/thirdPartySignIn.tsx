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

import { firebaseAuth } from "@/lib/firebaseApp";
import { setAuthUser } from "@/helpers/user";


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
      const result = await signInWithPopup(firebaseAuth, provider);
      const credential = Provider.credentialFromResult(result);

      // apiToken used to access other info for Google APIs
      const apiToken = credential?.accessToken;

      const token = await result.user.getIdToken(true);

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
