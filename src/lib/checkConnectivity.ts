/**
 * Checking whether the user is online
 * (whether Browser can access internet)
 *
 *
 */

import { useEffect, useState, startTransition } from "react";

const useCheckBrowserConnectivity = () => {

  const [isBrowserConnected, setIsBrowserConnected] = useState(navigator.onLine);  

  const handleBrowserStatusChanges = (e: Event) => {
    let timerId;
    
    if (!navigator.onLine) {
      // wait for some few seconds (2 seconds) to see if the connection comes back
      // if not update the state variable
      timerId = setTimeout(() => {
        startTransition(()=> {

          setIsBrowserConnected(false);

        })
      }, 2000);

    } else {

      if (timerId) clearTimeout(timerId);
      startTransition(
        () => {

          setIsBrowserConnected(true);

        }
      )
    }

  };

 
  useEffect(() => {
    if (typeof window !== "undefined" && navigator) {
        
      window.addEventListener("online", handleBrowserStatusChanges);
      window.addEventListener("offline",handleBrowserStatusChanges );

      return () => {
        window.removeEventListener("online", handleBrowserStatusChanges);
        window.removeEventListener("offline", handleBrowserStatusChanges);
      };
    }

}, [isBrowserConnected]);

  return { isBrowserConnected };
};

export default useCheckBrowserConnectivity;
