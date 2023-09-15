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

function _checkForLocalStorage() {
  if (!(typeof window !== "undefined" && window.localStorage)) return false;

  return true;
}

function setAuthUser(user: object) {
  if (!_checkForLocalStorage()) return;

  localStorage.setItem("user", JSON.stringify(user));
}

function removeAuthUser() {
  if (!_checkForLocalStorage()) return;

  localStorage.removeItem("user");
}

// store online status in localstorage
function setStoredOnlineStatus(status: boolean) {
  if (!_checkForLocalStorage()) return;

  localStorage.setItem("online", `${status}`);
}

function getStoredOnlineStatus() {
  if (!_checkForLocalStorage()) return null;

   const status  = localStorage.getItem("online");

   return status ? JSON.parse(status) : null
}


function getCurrentUser() {
  if (!_checkForLocalStorage()) return null;

  const user = localStorage.getItem("user");

  if (!user) return null;

  return JSON.parse(user);
}

export {
  useCurrentUser,
  setAuthUser,
  setStoredOnlineStatus,
  getStoredOnlineStatus,
  getCurrentUser,
  removeAuthUser,
  useRedirectToChat,
  logout,
};
