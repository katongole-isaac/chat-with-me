/**
 * Used to set token
 *
 */

import { Auth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useCurrentUser = () => {
  const [ user , setUser ]  = useState<null | any >(null);

  useEffect(()=> {

    const checkUser = ()=> {

      const storedUser = localStorage.getItem("user");;
      
      if (!storedUser) return ;

      const result = JSON.parse(storedUser) as object

      setUser(result);

    }

    checkUser();
    
  } , []);
  
  return { user };

  
};

const useRedirectToChat = ( ) => {

  const { user } = useCurrentUser();
  
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/chat");
  }, [user]);

}

 async function logout(auth : Auth){

    await auth.signOut();

     setTimeout(() => {
       removeAuthUser();
     });
   
}

function setAuthUser(user: object) {
  if (!(typeof window !== "undefined" && window.localStorage)) return;

  localStorage.setItem("user", JSON.stringify(user));
}

function removeAuthUser() {
  if (!(typeof window !== "undefined" && window.localStorage)) return;

  localStorage.removeItem("user");
}

function getCurrentUser() {
  
  if (!(typeof window !== "undefined" && window.localStorage)) return null;

  const user = localStorage.getItem("user");

  if (!user) return null;

  return JSON.parse(user);
}

export { useCurrentUser, setAuthUser, getCurrentUser, removeAuthUser, useRedirectToChat, logout };
