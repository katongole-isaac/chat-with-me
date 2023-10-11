/**
 * Used to set token
 *
 */

import { Auth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { firebaseAuth } from "@/lib/firebaseApp";
import NotifyToast from "@/components/toasts/notify";
import { toast } from "react-hot-toast";

const useCurrentUser = () => {
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


const useUpdateToken = ({ onToken }: {onToken:Function}) => {

const genToken = () => {

  firebaseAuth.onAuthStateChanged(async (_user) => {
    try {
      const _token = (await _user?.getIdToken(true)) as string;
 
      onToken(_token);
 
      const user = getCurrentUser();
      user.stsTokenManager.accessToken = _token;
 
      setAuthUser(user); // saving new token
 
    } catch (err) {
 
      // here something went wrong when fetching firebase user token
      toast.custom(
        NotifyToast({
          message: "Token update failed",
          ErrorIcon: true,
        })
      );
    }
  });

}


  useEffect(()=>{
    // run on the first render
    genToken();
    
    // get a new token every after 30 mins
    setInterval(() => {
      console.log('getting new token.... timer')
      genToken();
    }, 1000 * 60 * 30);

  }, [])

 

}


//used on login and signup
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
  useRedirectToChat,
  useCurrentUser,
  useUpdateToken,
  getStoredOnlineStatus,
  getCurrentUser,
  setAuthUser,
  setStoredOnlineStatus,
  removeAuthUser,
  logout,
};
