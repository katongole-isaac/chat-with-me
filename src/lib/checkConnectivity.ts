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
  
    if (!navigator.onLine) {
    
        startTransition(()=> {

          setIsBrowserConnected(false);

        })
  

    } else {
     
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

}, [isBrowserConnected, navigator.onLine]);

  return { isBrowserConnected };
};

export default useCheckBrowserConnectivity;
