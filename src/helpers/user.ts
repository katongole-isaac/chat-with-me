/**
 * Used to set token
 *
 */

import { Auth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const _checkForLocalStorage = () => {
  if (!(typeof window !== "undefined" && window.localStorage)) return false;

  return true;
}

export const useCurrentUser = () => {
  const [user, setUser] = useState<null | any>(null);

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) return;

      const result = JSON.parse(storedUser) as object;

      setUser(result);
    };

    checkUser();
  }, []);

  return { user };
};

//used on login and signup
export const useRedirectToChat = ( ) => {

  const { user } = useCurrentUser();
  
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/chat");
  }, [user]);

}

 export  const logout =  async(auth : Auth) => {

    await auth.signOut();

     setTimeout(() => {
       removeAuthUser();
     });
   
}

export const setAuthUser =  (user: object) =>  {
  if (!_checkForLocalStorage()) return;

  localStorage.setItem("user", JSON.stringify(user));
}

export const removeAuthUser = () => {
  if (!_checkForLocalStorage()) return;

  localStorage.removeItem("user");
}

export const getCurrentUser = () => {
  if (!_checkForLocalStorage()) return null;

  const user = localStorage.getItem("user");

  if (!user) return null;

  return JSON.parse(user);
}

