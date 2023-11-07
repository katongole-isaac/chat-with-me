/**
 * Authentication Service
 *
 */

import { toast } from "react-hot-toast";
import { SetStateAction } from "react";
import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { removeAuthUser, setAuthUser } from "@/helpers/user";
import { firebaseAuth } from "@/lib/firebaseApp";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import ErrorToast from "@/components/toasts/error";

interface SignIn {
  email: string;
  password: string;
  router: AppRouterInstance;
  url: string;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
}

type SignInOperation = "login" | "signup";

class AuthenticationService {

  constructor(private readonly auth: Auth) {}

  private async _signInWithEmail(
    { email, router, password, url, setLoading }: SignIn ,
    operation = "login" as SignInOperation
  ) {

    try {
      setLoading(true);

      const sigInOperation = operation === "login" ? signInWithEmailAndPassword :  createUserWithEmailAndPassword;

      const credentials = await sigInOperation(this.auth, email, password);

      // send verify email link to user
      if (operation === "signup") sendEmailVerification(credentials.user);

      // store user in the localstorage
      setAuthUser(credentials.user);

      // on success, redirect to url
      router.replace(url);

    } catch (error:any) {

        const message = error?.message
           .match(/\b(?!Firebase:)\w+\b/g)
           .join(" ");

           // notification toast
      toast.custom( t => ErrorToast({toastId: t.id, message}));

    } finally {
      setLoading(false);
    }
  }

  // logging in the user
  async login(args: SignIn) {
    this._signInWithEmail(args);
  }

  // signing up user
  async signup(args: SignIn) {
    this._signInWithEmail(args, "signup");
  }

  // logging out
  async logout(router: AppRouterInstance, url:string) {

    this.auth.signOut(); // firebase sign out

    removeAuthUser(); // remove user object from localstorage

    router.replace(url); // redirect to url
    
  }

  // reset password -> sends password reset links
  async resetPassword(email: string) {
    try {

      await sendPasswordResetEmail(firebaseAuth, email);
      toast.success("Password reset link sent");

    } catch (e: any) {

      if (e?.code === "auth/user-not-found")
        return toast.error("User with this email not found");

      toast.error(e!.message as string);

    }
  }
}

export default new AuthenticationService(firebaseAuth);
